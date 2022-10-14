"use strict";
// automatically generated by the FlatBuffers compiler, do not modify
Object.defineProperty(exports, "__esModule", { value: true });
exports.unionListToBody = exports.unionToBody = exports.Body = void 0;
const consume_response_1 = require("../../f-b-s/transport/consume-response");
const dump_response_1 = require("../../f-b-s/worker/dump-response");
var Body;
(function (Body) {
    Body[Body["NONE"] = 0] = "NONE";
    Body[Body["FBS_Worker_DumpResponse"] = 1] = "FBS_Worker_DumpResponse";
    Body[Body["FBS_Transport_ConsumeResponse"] = 2] = "FBS_Transport_ConsumeResponse";
})(Body = exports.Body || (exports.Body = {}));
function unionToBody(type, accessor) {
    switch (Body[type]) {
        case 'NONE': return null;
        case 'FBS_Worker_DumpResponse': return accessor(new dump_response_1.DumpResponse());
        case 'FBS_Transport_ConsumeResponse': return accessor(new consume_response_1.ConsumeResponse());
        default: return null;
    }
}
exports.unionToBody = unionToBody;
function unionListToBody(type, accessor, index) {
    switch (Body[type]) {
        case 'NONE': return null;
        case 'FBS_Worker_DumpResponse': return accessor(index, new dump_response_1.DumpResponse());
        case 'FBS_Transport_ConsumeResponse': return accessor(index, new consume_response_1.ConsumeResponse());
        default: return null;
    }
}
exports.unionListToBody = unionListToBody;
