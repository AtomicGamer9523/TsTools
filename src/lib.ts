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
    export const _Struct$ = function(name?: string): struct.StructBuilder {
        return new struct.StructBuilder(name ? "" : "Struct");
    }

    /**
     * @function
     * @param {any} v 
     * @returns {struct.IPropertyBuilder}
    */
    export const $P = function<T >( v: T ): struct.IPropertyBuilder<T> {
        return new struct.IPropertyBuilder(v);
    }
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
    export const $setLogLevel = function(level?: "Error" | "Warn" | "Info" | "Debug" | "Trace"): void {
        log.setLogLevel(log.StringToLevel(log.Level.Info,level))
    }

    /**
     * Initializes CORELOG
     * @function
     * @returns {void}
    */
    export const $initCORELOG = function(level?: "Default" | "Error" | "Warn" | "Info" | "Debug" | "Trace" ): void {
        log.tracing.corelogger.__init();
        log.tracing.corelogger.__setLevel(log.StringToLevel(log.Level.Debug, level));
    }

    /**
     * Logs information
     * @function
     * @param {any} m
     * @returns {void}
    */
    export const _info$ = function(m: any): void{
        log.getLogger().info(m,log.tracing.__trace());
    }

    /**
     * Logs a debug message
     * @function
     * @param {any} m
     * @returns {void}
    */
    export const _debug$ = function(m: any): void {
        log.getLogger().debug(m,log.tracing.__trace());
    }

    /**
     * Logs a trace
     * @function
     * @param {any} m
     * @returns {void}
    */
    export const _trace$ = function(m: any): void {
        log.getLogger().trace(m,log.tracing.__trace());
    }

    /**
     * Logs a warning
     * @function
     * @param {any} m
     * @returns {void}
    */
    export const _warn$ = function(m: any): void {
        log.getLogger().warn(m,log.tracing.__trace());
    }

    /**
     * Logs an error
     * @function
     * @param {any} m
     * @returns {void}
    */
    export const _error$ = function(m: any): void {
        log.getLogger().error(m,log.tracing.__trace());
    }

    /**
     * ## **REVEALS THE GUTS, USE WITH CAUTION** 
     * *No docs
     *@namespace
    */
    export namespace _ {
        export const _CustomLogger = function(logger: log.BaseLogger): void {
            log.setLogger("Custom",new log.CoreLogger(logger));
        }
        export const $LEVEL = log.Level;
    }
}

// /**
//  *## Namespace with tools for Macros
//  *
//  *@namespace 
// */
// export namespace M {
//     export const _New$ = function(name: string, f: Function) {

//     }
// }
