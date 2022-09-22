//! DO NOT CHANGE, won't work anymore if you do
import * as core from "../bin/bindings";
import * as log from "./log";

interface Tracer {
    log(m: any): void
}
let TRACER: Tracer;
let INITIALIZED: boolean = false;
let LEVEL: log.Level = log.Level.Trace;
export const __setLevel = function(level: log.Level): void { LEVEL = level }
export const __getLevel = function(): log.Level { return LEVEL }




/**
 * Initializes CORELOG
 * @function
 * @returns {void}
*/
export function __init(): void {
    core.init();
    TRACER = new core.CoreLog();
    INITIALIZED = true;
}

/**
 * @function
 * @param {any} m what to log, 'string' prefered
 * @returns {void}
*/
export function _log(m: any): void {
    if(INITIALIZED){
        TRACER.log(m);
    }
}