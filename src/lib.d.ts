import * as struct from "./structs/struct";
import * as log from "./log/log";

/**
 *## Namesapce wit Struct related tools
 *
 *@namespace 
*/
export namespace S {

    /**
     * @function
     * @param {string | undefined} name Name of the structure
     * @returns {struct.StructBuilder}
     */
    export function _Struct$(name?: string): struct.StructBuilder;

    /**
     * @function
     * @param {any} v 
     * @returns {struct.IPropertyBuilder}
    */
    export function $P<T >( v: T ): struct.IPropertyBuilder<T>;
}

/**
 *# Namespace with Logging tools
 *
 *@namespace 
*/
export namespace L {
    
    /**
     * @function
     * @param {log.Level} level
     * @returns {void}
    */
    export function $setLogLevel(level?: "Error" | "Warn" | "Info" | "Debug" | "Trace"): void;

    /**
     * Initializes CORELOG
     * @function
     * @returns {void}
    */
    export function $initCORELOG(level?: "Default" | "Error" | "Warn" | "Info" | "Debug" | "Trace" ): void;

    /**
     * Logs information
     * @function
     * @param {any} m
     * @returns {void}
    */
    export function _info$(m: any): void;

    /**
     * Logs a debug message
     * @function
     * @param {any} m
     * @returns {void}
    */
    export function _debug$(m: any): void;

    /**
     * Logs a trace
     * @function
     * @param {any} m
     * @returns {void}
    */
    export function _trace$(m: any): void;

    /**
     * Logs a warning
     * @function
     * @param {any} m
     * @returns {void}
    */
    export function _warn$(m: any): void;

    /**
     * Logs an error
     * @function
     * @param {any} m
     * @returns {void}
    */
    export function _error$(m: any): void;

    /**
     * ## **REVEALS THE GUTS, USE WITH CAUTION** 
     * *No docs
     *@namespace
    */
    export namespace _ {
        export function _CustomLogger(logger: log.BaseLogger): void;
    }
}