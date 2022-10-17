"use strict";
// automatically generated by the FlatBuffers compiler, do not modify
Object.defineProperty(exports, "__esModule", { value: true });
exports.unionListToBody = exports.unionToBody = exports.Body = void 0;
const consume_request_1 = require("../../f-b-s/transport/consume-request");
const updateable_settings_1 = require("../../f-b-s/worker/updateable-settings");
var Body;
(function (Body) {
    Body[Body["NONE"] = 0] = "NONE";
    Body[Body["FBS_Transport_ConsumeRequest"] = 1] = "FBS_Transport_ConsumeRequest";
    Body[Body["FBS_Worker_UpdateableSettings"] = 2] = "FBS_Worker_UpdateableSettings";
})(Body = exports.Body || (exports.Body = {}));
function unionToBody(type, accessor) {
    switch (Body[type]) {
        case 'NONE': return null;
        case 'FBS_Transport_ConsumeRequest': return accessor(new consume_request_1.ConsumeRequest());
        case 'FBS_Worker_UpdateableSettings': return accessor(new updateable_settings_1.UpdateableSettings());
        default: return null;
    }
}
exports.unionToBody = unionToBody;
function unionListToBody(type, accessor, index) {
    switch (Body[type]) {
        case 'NONE': return null;
        case 'FBS_Transport_ConsumeRequest': return accessor(index, new consume_request_1.ConsumeRequest());
        case 'FBS_Worker_UpdateableSettings': return accessor(index, new updateable_settings_1.UpdateableSettings());
        default: return null;
    }
}
exports.unionListToBody = unionListToBody;