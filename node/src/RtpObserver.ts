import { Logger } from './Logger';
import { EnhancedEventEmitter } from './EnhancedEventEmitter';
import { Channel } from './Channel';
import { RouterInternal } from './Router';
import { Producer } from './Producer';
import * as FbsRequest from './fbs/request_generated';
import * as FbsRouter from './fbs/router_generated';
import * as FbsRtpObserver from './fbs/rtpObserver_generated';

export type RtpObserverEvents =
{
	routerclose: [];
	// Private events.
	'@close': [];
};

export type RtpObserverObserverEvents =
{
	close: [];
	pause: [];
	resume: [];
	addproducer: [Producer];
	removeproducer: [Producer];
};

export type RtpObserverConstructorOptions =
{
	internal: RtpObserverObserverInternal;
	channel: Channel;
	appData?: Record<string, unknown>;
	getProducerById: (producerId: string) => Producer | undefined;
};

export type RtpObserverObserverInternal = RouterInternal &
{
	rtpObserverId: string;
};

const logger = new Logger('RtpObserver');

export type RtpObserverAddRemoveProducerOptions =
{
	/**
	 * The id of the Producer to be added or removed.
	 */
	producerId: string;
};

export class RtpObserver<E extends RtpObserverEvents = RtpObserverEvents>
	extends EnhancedEventEmitter<E>
{
	// Internal data.
	protected readonly internal: RtpObserverObserverInternal;

	// Channel instance.
	protected readonly channel: Channel;

	// Closed flag.
	#closed = false;

	// Paused flag.
	#paused = false;

	// Custom app data.
	readonly #appData: Record<string, unknown>;

	// Method to retrieve a Producer.
	protected readonly getProducerById: (producerId: string) => Producer | undefined;

	// Observer instance.
	readonly #observer = new EnhancedEventEmitter<RtpObserverObserverEvents>();

	/**
	 * @private
	 * @interface
	 */
	constructor(
		{
			internal,
			channel,
			appData,
			getProducerById
		}: RtpObserverConstructorOptions
	)
	{
		super();

		logger.debug('constructor()');

		this.internal = internal;
		this.channel = channel;
		this.#appData = appData || {};
		this.getProducerById = getProducerById;
	}

	/**
	 * RtpObserver id.
	 */
	get id(): string
	{
		return this.internal.rtpObserverId;
	}

	/**
	 * Whether the RtpObserver is closed.
	 */
	get closed(): boolean
	{
		return this.#closed;
	}

	/**
	 * Whether the RtpObserver is paused.
	 */
	get paused(): boolean
	{
		return this.#paused;
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
	get observer(): EnhancedEventEmitter<RtpObserverObserverEvents>
	{
		return this.#observer;
	}

	/**
	 * Close the RtpObserver.
	 */
	close(): void
	{
		if (this.#closed)
			return;

		logger.debug('close()');

		this.#closed = true;

		// Remove notification subscriptions.
		this.channel.removeAllListeners(this.internal.rtpObserverId);

		/* Build Request. */

		const requestOffset = new FbsRouter.CloseRtpObserverRequestT(
			this.internal.rtpObserverId
		).pack(this.channel.bufferBuilder);

		this.channel.request(
			FbsRequest.Method.ROUTER_CLOSE_RTP_OBSERVER,
			FbsRequest.Body.FBS_Router_CloseRtpObserverRequest,
			requestOffset,
			this.internal.routerId
		).catch(() => {});

		this.emit('@close');

		// Emit observer event.
		this.#observer.safeEmit('close');
	}

	/**
	 * Router was closed.
	 *
	 * @private
	 */
	routerClosed(): void
	{
		if (this.#closed)
			return;

		logger.debug('routerClosed()');

		this.#closed = true;

		// Remove notification subscriptions.
		this.channel.removeAllListeners(this.internal.rtpObserverId);

		this.safeEmit('routerclose');

		// Emit observer event.
		this.#observer.safeEmit('close');
	}

	/**
	 * Pause the RtpObserver.
	 */
	async pause(): Promise<void>
	{
		logger.debug('pause()');

		const wasPaused = this.#paused;

		await this.channel.request(
			FbsRequest.Method.RTP_OBSERVER_PAUSE,
			undefined,
			undefined,
			this.internal.rtpObserverId
		);

		this.#paused = true;

		// Emit observer event.
		if (!wasPaused)
			this.#observer.safeEmit('pause');
	}

	/**
	 * Resume the RtpObserver.
	 */
	async resume(): Promise<void>
	{
		logger.debug('resume()');

		const wasPaused = this.#paused;

		await this.channel.request(
			FbsRequest.Method.RTP_OBSERVER_RESUME,
			undefined,
			undefined,
			this.internal.rtpObserverId
		);

		this.#paused = false;

		// Emit observer event.
		if (wasPaused)
			this.#observer.safeEmit('resume');
	}

	/**
	 * Add a Producer to the RtpObserver.
	 */
	async addProducer({ producerId }: RtpObserverAddRemoveProducerOptions): Promise<void>
	{
		logger.debug('addProducer()');

		const producer = this.getProducerById(producerId);

		if (!producer)
			throw Error(`Producer with id "${producerId}" not found`);

		const requestOffset = new FbsRtpObserver.AddProducerRequestT(
			producerId
		).pack(this.channel.bufferBuilder);

		await this.channel.request(
			FbsRequest.Method.RTP_OBSERVER_ADD_PRODUCER,
			FbsRequest.Body.FBS_RtpObserver_AddProducerRequest,
			requestOffset,
			this.internal.rtpObserverId
		);

		// Emit observer event.
		this.#observer.safeEmit('addproducer', producer);
	}

	/**
	 * Remove a Producer from the RtpObserver.
	 */
	async removeProducer({ producerId }: RtpObserverAddRemoveProducerOptions): Promise<void>
	{
		logger.debug('removeProducer()');

		const producer = this.getProducerById(producerId);

		if (!producer)
			throw Error(`Producer with id "${producerId}" not found`);

		const requestOffset = new FbsRtpObserver.RemoveProducerRequestT(
			producerId
		).pack(this.channel.bufferBuilder);

		await this.channel.request(
			FbsRequest.Method.RTP_OBSERVER_REMOVE_PRODUCER,
			FbsRequest.Body.FBS_RtpObserver_RemoveProducerRequest,
			requestOffset,
			this.internal.rtpObserverId
		);

		// Emit observer event.
		this.#observer.safeEmit('removeproducer', producer);
	}
}
