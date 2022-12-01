import * as process from 'process';
import * as path from 'path';
import { spawn, ChildProcess } from 'child_process';
import { v4 as uuidv4 } from 'uuid';
import { Logger } from './Logger';
import { EnhancedEventEmitter } from './EnhancedEventEmitter';
import * as ortc from './ortc';
import { Channel } from './Channel';
import { PayloadChannel } from './PayloadChannel';
import { Router, RouterOptions } from './Router';
import { WebRtcServer, WebRtcServerOptions } from './WebRtcServer';
import { Event } from './fbs/notification_generated';
import * as FbsRequest from './fbs/request_generated';
import * as FbsWorker from './fbs/worker_generated';
import * as FbsWebRtcServer from './fbs/webRtcServer_generated';
import { TransportProtocol as FbsTransportProtocol } from './fbs/fbs/transport/transport-protocol';

export type WorkerLogLevel = 'debug' | 'warn' | 'error' | 'none';

export type WorkerLogTag =
  | 'info'
  | 'ice'
  | 'dtls'
  | 'rtp'
  | 'srtp'
  | 'rtcp'
  | 'rtx'
  | 'bwe'
  | 'score'
  | 'simulcast'
  | 'svc'
  | 'sctp'
  | 'message';

export type WorkerSettings =
{
	/**
	 * Logging level for logs generated by the media worker subprocesses (check
	 * the Debugging documentation). Valid values are 'debug', 'warn', 'error' and
	 * 'none'. Default 'error'.
	 */
	logLevel?: WorkerLogLevel;

	/**
	 * Log tags for debugging. Check the meaning of each available tag in the
	 * Debugging documentation.
	 */
	logTags?: WorkerLogTag[];

	/**
	 * Minimun RTC port for ICE, DTLS, RTP, etc. Default 10000.
	 */
	rtcMinPort?: number;

	/**
	 * Maximum RTC port for ICE, DTLS, RTP, etc. Default 59999.
	 */
	rtcMaxPort?: number;

	/**
	 * Path to the DTLS public certificate file in PEM format. If unset, a
	 * certificate is dynamically created.
	 */
	dtlsCertificateFile?: string;

	/**
	 * Path to the DTLS certificate private key file in PEM format. If unset, a
	 * certificate is dynamically created.
	 */
	dtlsPrivateKeyFile?: string;

	/**
	 * Custom application data.
	 */
	appData?: Record<string, unknown>;
};

export type WorkerUpdateableSettings = Pick<WorkerSettings, 'logLevel' | 'logTags'>;

/**
 * An object with the fields of the uv_rusage_t struct.
 *
 * - http://docs.libuv.org/en/v1.x/misc.html#c.uv_rusage_t
 * - https://linux.die.net/man/2/getrusage
 */
export type WorkerResourceUsage =
{
	/* eslint-disable camelcase */

	/**
	 * User CPU time used (in ms).
	 */
	ru_utime: BigInt;

	/**
	 * System CPU time used (in ms).
	 */
	ru_stime: BigInt;

	/**
	 * Maximum resident set size.
	 */
	ru_maxrss: BigInt;

	/**
	 * Integral shared memory size.
	 */
	ru_ixrss: BigInt;

	/**
	 * Integral unshared data size.
	 */
	ru_idrss: BigInt;

	/**
	 * Integral unshared stack size.
	 */
	ru_isrss: BigInt;

	/**
	 * Page reclaims (soft page faults).
	 */
	ru_minflt: BigInt;

	/**
	 * Page faults (hard page faults).
	 */
	ru_majflt: BigInt;

	/**
	 * Swaps.
	 */
	ru_nswap: BigInt;

	/**
	 * Block input operations.
	 */
	ru_inblock: BigInt;

	/**
	 * Block output operations.
	 */
	ru_oublock: BigInt;

	/**
	 * IPC messages sent.
	 */
	ru_msgsnd: BigInt;

	/**
	 * IPC messages received.
	 */
	ru_msgrcv: BigInt;

	/**
	 * Signals received.
	 */
	ru_nsignals: BigInt;

	/**
	 * Voluntary context switches.
	 */
	ru_nvcsw: BigInt;

	/**
	 * Involuntary context switches.
	 */
	ru_nivcsw: BigInt;

	/* eslint-enable camelcase */
};

export type WorkerDump =
{
	pid : number;
	webrtcServerIds : string[];
	routerIds : string[];
	channelMessageHandlers : {
		channelRequestHandlers : string[];
		payloadChannelRequestHandlers : string[];
		payloadNotificationHandlers : string[];
	};
};

export type WorkerEvents = 
{ 
	died: [Error];
	// Private events.
	'@success': [];
	'@failure': [Error];
};

export type WorkerObserverEvents = 
{
	close: [];
	newwebrtcserver: [WebRtcServer];
	newrouter: [Router];
};

// If env MEDIASOUP_WORKER_BIN is given, use it as worker binary.
// Otherwise if env MEDIASOUP_BUILDTYPE is 'Debug' use the Debug binary.
// Otherwise use the Release binary.
const workerBin = process.env.MEDIASOUP_WORKER_BIN
	? process.env.MEDIASOUP_WORKER_BIN
	: process.env.MEDIASOUP_BUILDTYPE === 'Debug'
		? path.join(__dirname, '..', '..', 'worker', 'out', 'Debug', 'mediasoup-worker')
		: path.join(__dirname, '..', '..', 'worker', 'out', 'Release', 'mediasoup-worker');

const logger = new Logger('Worker');
const workerLogger = new Logger('Worker');

export class Worker extends EnhancedEventEmitter<WorkerEvents>
{
	// mediasoup-worker child process.
	#child?: ChildProcess;

	// Worker process PID.
	readonly #pid: number;

	// Channel instance.
	readonly #channel: Channel;

	// PayloadChannel instance.
	readonly #payloadChannel: PayloadChannel;

	// Closed flag.
	#closed = false;

	// Died dlag.
	#died = false;

	// Custom app data.
	readonly #appData: Record<string, unknown>;

	// WebRtcServers set.
	readonly #webRtcServers: Set<WebRtcServer> = new Set();

	// Routers set.
	readonly #routers: Set<Router> = new Set();

	// Observer instance.
	readonly #observer = new EnhancedEventEmitter<WorkerObserverEvents>();

	/**
	 * @private
	 */
	constructor(
		{
			logLevel,
			logTags,
			rtcMinPort,
			rtcMaxPort,
			dtlsCertificateFile,
			dtlsPrivateKeyFile,
			appData
		}: WorkerSettings)
	{
		super();

		logger.debug('constructor()');

		let spawnBin = workerBin;
		let spawnArgs: string[] = [];

		if (process.env.MEDIASOUP_USE_VALGRIND === 'true')
		{
			spawnBin = process.env.MEDIASOUP_VALGRIND_BIN || 'valgrind';

			if (process.env.MEDIASOUP_VALGRIND_OPTIONS)
			{
				spawnArgs = spawnArgs.concat(process.env.MEDIASOUP_VALGRIND_OPTIONS.split(/\s+/));
			}

			spawnArgs.push(workerBin);
		}

		if (typeof logLevel === 'string' && logLevel)
			spawnArgs.push(`--logLevel=${logLevel}`);

		for (const logTag of (Array.isArray(logTags) ? logTags : []))
		{
			if (typeof logTag === 'string' && logTag)
				spawnArgs.push(`--logTag=${logTag}`);
		}

		if (typeof rtcMinPort === 'number' && !Number.isNaN(rtcMinPort))
			spawnArgs.push(`--rtcMinPort=${rtcMinPort}`);

		if (typeof rtcMaxPort === 'number' && !Number.isNaN(rtcMaxPort))
			spawnArgs.push(`--rtcMaxPort=${rtcMaxPort}`);

		if (typeof dtlsCertificateFile === 'string' && dtlsCertificateFile)
			spawnArgs.push(`--dtlsCertificateFile=${dtlsCertificateFile}`);

		if (typeof dtlsPrivateKeyFile === 'string' && dtlsPrivateKeyFile)
			spawnArgs.push(`--dtlsPrivateKeyFile=${dtlsPrivateKeyFile}`);

		logger.debug(
			'spawning worker process: %s %s', spawnBin, spawnArgs.join(' '));

		this.#child = spawn(
			// command
			spawnBin,
			// args
			spawnArgs,
			// options
			{
				env :
				{
					MEDIASOUP_VERSION : '__MEDIASOUP_VERSION__',
					// Let the worker process inherit all environment variables, useful
					// if a custom and not in the path GCC is used so the user can set
					// LD_LIBRARY_PATH environment variable for runtime.
					...process.env
				},

				detached : false,

				// fd 0 (stdin)   : Just ignore it.
				// fd 1 (stdout)  : Pipe it for 3rd libraries that log their own stuff.
				// fd 2 (stderr)  : Same as stdout.
				// fd 3 (channel) : Producer Channel fd.
				// fd 4 (channel) : Consumer Channel fd.
				// fd 5 (channel) : Producer PayloadChannel fd.
				// fd 6 (channel) : Consumer PayloadChannel fd.
				stdio       : [ 'ignore', 'pipe', 'pipe', 'pipe', 'pipe', 'pipe', 'pipe' ],
				windowsHide : true
			});

		this.#pid = this.#child.pid!;

		this.#channel = new Channel(
			{
				producerSocket : this.#child.stdio[3],
				consumerSocket : this.#child.stdio[4],
				pid            : this.#pid
			});

		this.#payloadChannel = new PayloadChannel(
			{
				// NOTE: TypeScript does not like more than 5 fds.
				// @ts-ignore
				producerSocket : this.#child.stdio[5],
				// @ts-ignore
				consumerSocket : this.#child.stdio[6]
			});

		this.#appData = appData || {};

		let spawnDone = false;

		// Listen for 'running' notification.
		this.#channel.once(String(this.#pid), (event: Event) =>
		{
			if (!spawnDone && event === Event.WORKER_RUNNING)
			{
				spawnDone = true;

				logger.debug('worker process running [pid:%s]', this.#pid);

				this.emit('@success');
			}
		});

		this.#child.on('exit', (code, signal) =>
		{
			this.#child = undefined;

			if (!spawnDone)
			{
				spawnDone = true;

				if (code === 42)
				{
					logger.error(
						'worker process failed due to wrong settings [pid:%s]', this.#pid);

					this.close();
					this.emit('@failure', new TypeError('wrong settings'));
				}
				else
				{
					logger.error(
						'worker process failed unexpectedly [pid:%s, code:%s, signal:%s]',
						this.#pid, code, signal);

					this.close();
					this.emit(
						'@failure',
						new Error(`[pid:${this.#pid}, code:${code}, signal:${signal}]`));
				}
			}
			else
			{
				logger.error(
					'worker process died unexpectedly [pid:%s, code:%s, signal:%s]',
					this.#pid, code, signal);

				this.workerDied(
					new Error(`[pid:${this.#pid}, code:${code}, signal:${signal}]`));
			}
		});

		this.#child.on('error', (error) =>
		{
			this.#child = undefined;

			if (!spawnDone)
			{
				spawnDone = true;

				logger.error(
					'worker process failed [pid:%s]: %s', this.#pid, error.message);

				this.close();
				this.emit('@failure', error);
			}
			else
			{
				logger.error(
					'worker process error [pid:%s]: %s', this.#pid, error.message);

				this.workerDied(error);
			}
		});

		// Be ready for 3rd party worker libraries logging to stdout.
		this.#child.stdout!.on('data', (buffer) =>
		{
			for (const line of buffer.toString('utf8').split('\n'))
			{
				if (line)
					workerLogger.debug(`(stdout) ${line}`);
			}
		});

		// In case of a worker bug, mediasoup will log to stderr.
		this.#child.stderr!.on('data', (buffer) =>
		{
			for (const line of buffer.toString('utf8').split('\n'))
			{
				if (line)
					workerLogger.error(`(stderr) ${line}`);
			}
		});
	}

	/**
	 * Worker process identifier (PID).
	 */
	get pid(): number
	{
		return this.#pid;
	}

	/**
	 * Whether the Worker is closed.
	 */
	get closed(): boolean
	{
		return this.#closed;
	}

	/**
	 * Whether the Worker died.
	 */
	get died(): boolean
	{
		return this.#died;
	}

	/**
	 * App custom data.
	 */
	get appData(): Record<string, unknown>
	{
		return this.#appData;
	}

	/**
	 * Invalid setter.
	 */
	set appData(appData: Record<string, unknown>) // eslint-disable-line no-unused-vars
	{
		throw new Error('cannot override appData object');
	}

	/**
	 * Observer.
	 */
	get observer(): EnhancedEventEmitter<WorkerObserverEvents>
	{
		return this.#observer;
	}

	/**
	 * @private
	 * Just for testing purposes.
	 */
	get webRtcServersForTesting(): Set<WebRtcServer>
	{
		return this.#webRtcServers;
	}

	/**
	 * @private
	 * Just for testing purposes.
	 */
	get routersForTesting(): Set<Router>
	{
		return this.#routers;
	}

	/**
	 * Close the Worker.
	 */
	close(): void
	{
		if (this.#closed)
			return;

		logger.debug('close()');

		this.#closed = true;

		// Kill the worker process.
		if (this.#child)
		{
			// Remove event listeners but leave a fake 'error' hander to avoid
			// propagation.
			this.#child.removeAllListeners('exit');
			this.#child.removeAllListeners('error');
			this.#child.on('error', () => {});
			this.#child.kill('SIGTERM');
			this.#child = undefined;
		}

		// Close the Channel instance.
		this.#channel.close();

		// Close the PayloadChannel instance.
		this.#payloadChannel.close();

		// Close every Router.
		for (const router of this.#routers)
		{
			router.workerClosed();
		}
		this.#routers.clear();

		// Close every WebRtcServer.
		for (const webRtcServer of this.#webRtcServers)
		{
			webRtcServer.workerClosed();
		}
		this.#webRtcServers.clear();

		// Emit observer event.
		this.#observer.safeEmit('close');
	}

	/**
	 * Dump Worker.
	 */
	async dump(): Promise<any>
	{
		logger.debug('dump()');

		// Send the request and wait for the response.
		const response = await this.#channel.request(
			FbsRequest.Method.WORKER_DUMP
		);

		/* Decode the response. */
		const dump = new FbsWorker.DumpResponse();

		response.body(dump);

		return dump.unpack();
	}

	/**
	 * Get mediasoup-worker process resource usage.
	 */
	async getResourceUsage(): Promise<WorkerResourceUsage>
	{
		logger.debug('getResourceUsage()');

		const response = await this.#channel.request(
			FbsRequest.Method.WORKER_GET_RESOURCE_USAGE
		);

		/* Decode the response. */
		const resourceUsage = new FbsWorker.ResourceUsageResponse();

		response.body(resourceUsage);

		const ru = resourceUsage.unpack();

		/* eslint-disable camelcase */
		return {
			ru_utime    : ru.ruUtime,
			ru_stime    : ru.ruStime,
			ru_maxrss   : ru.ruMaxrss,
			ru_ixrss    : ru.ruIxrss,
			ru_idrss    : ru.ruIdrss,
			ru_isrss    : ru.ruIsrss,
			ru_minflt   : ru.ruMinflt,
			ru_majflt   : ru.ruMajflt,
			ru_nswap    : ru.ruNswap,
			ru_inblock  : ru.ruInblock,
			ru_oublock  : ru.ruOublock,
			ru_msgsnd   : ru.ruMsgsnd,
			ru_msgrcv   : ru.ruMsgrcv,
			ru_nsignals : ru.ruNsignals,
			ru_nvcsw    : ru.ruNvcsw,
			ru_nivcsw   : ru.ruNivcsw
		};
		/* eslint-enable camelcase */
	}

	/**
	 * Update settings.
	 */
	async updateSettings(
		{
			logLevel,
			logTags
		}: WorkerUpdateableSettings = {}
	): Promise<void>
	{
		logger.debug('updateSettings()');

		// Build the request.
		const builder = this.#channel.bufferBuilder;

		const updateaSettingsRequestOffset =
			new FbsWorker.UpdateSettingsRequestT(logLevel, logTags).pack(builder);

		await this.#channel.request(
			FbsRequest.Method.WORKER_UPDATE_SETTINGS,
			FbsRequest.Body.FBS_Worker_UpdateSettingsRequest,
			updateaSettingsRequestOffset
		);
	}

	/**
	 * Create a WebRtcServer.
	 */
	async createWebRtcServer(
		{
			listenInfos,
			appData
		}: WebRtcServerOptions): Promise<WebRtcServer>
	{
		logger.debug('createWebRtcServer()');

		if (appData && typeof appData !== 'object')
			throw new TypeError('if given, appData must be an object');

		// Build the request.
		const builder = this.#channel.bufferBuilder;
		const fbsListenInfos:FbsWebRtcServer.WebRtcServerListenInfoT[] = [];

		for (const listenInfo of listenInfos)
		{
			fbsListenInfos.push(new FbsWebRtcServer.WebRtcServerListenInfoT(
				listenInfo.protocol === 'udp' ? FbsTransportProtocol.UDP : FbsTransportProtocol.TCP,
				listenInfo.ip,
				listenInfo.announcedIp,
				listenInfo.port)
			);
		}

		const webRtcServerId = uuidv4();
		const createWebRtcServerRequestOffset = new FbsRequest.CreateWebRtcServerRequestT(
			webRtcServerId, fbsListenInfos).pack(builder);

		await this.#channel.request(
			FbsRequest.Method.WORKER_CREATE_WEBRTC_SERVER,
			FbsRequest.Body.FBS_Worker_CreateWebRtcServerRequest,
			createWebRtcServerRequestOffset
		);

		const webRtcServer = new WebRtcServer(
			{
				internal : { webRtcServerId },
				channel  : this.#channel,
				appData
			});

		this.#webRtcServers.add(webRtcServer);
		webRtcServer.on('@close', () => this.#webRtcServers.delete(webRtcServer));

		// Emit observer event.
		this.#observer.safeEmit('newwebrtcserver', webRtcServer);

		return webRtcServer;
	}

	/**
	 * Create a Router.
	 */
	async createRouter(
		{
			mediaCodecs,
			appData
		}: RouterOptions = {}): Promise<Router>
	{
		logger.debug('createRouter()');

		if (appData && typeof appData !== 'object')
			throw new TypeError('if given, appData must be an object');

		// This may throw.
		const rtpCapabilities = ortc.generateRouterRtpCapabilities(mediaCodecs);

		const routerId = uuidv4();

		// Get flatbuffer builder.
		const builder = this.#channel.bufferBuilder;
		const createRouterRequestOffset =
			new FbsRequest.CreateRouterRequestT(routerId).pack(builder);

		await this.#channel.request(FbsRequest.Method.WORKER_CREATE_ROUTER,
			FbsRequest.Body.FBS_Worker_CreateRouterRequest, createRouterRequestOffset);

		const data = { rtpCapabilities };
		const router = new Router(
			{
				internal :
				{
					routerId
				},
				data,
				channel        : this.#channel,
				payloadChannel : this.#payloadChannel,
				appData
			});

		this.#routers.add(router);
		router.on('@close', () => this.#routers.delete(router));

		// Emit observer event.
		this.#observer.safeEmit('newrouter', router);

		return router;
	}

	private workerDied(error: Error): void
	{
		if (this.#closed)
			return;

		logger.debug(`died() [error:${error}]`);

		this.#closed = true;
		this.#died = true;

		// Close the Channel instance.
		this.#channel.close();

		// Close the PayloadChannel instance.
		this.#payloadChannel.close();

		// Close every Router.
		for (const router of this.#routers)
		{
			router.workerClosed();
		}
		this.#routers.clear();

		// Close every WebRtcServer.
		for (const webRtcServer of this.#webRtcServers)
		{
			webRtcServer.workerClosed();
		}
		this.#webRtcServers.clear();

		this.safeEmit('died', error);

		// Emit observer event.
		this.#observer.safeEmit('close');
	}
}
