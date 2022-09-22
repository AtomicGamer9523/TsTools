import * as tracing from "./tracing";
export { tracing };

export enum Level {
    Info = 2,
    Debug = 3,
    Trace = 4,
    Warn = 1,
    Error = 0
};
export function LevelToString(level: Level): string {
    switch (level) {
        case Level.Info:
            return "Info"
        case Level.Debug:
                return "Debug"
        case Level.Trace:
            return "Trace"
        case Level.Warn:
                return "Warn"
        case Level.Error:
            return "Error"
    }
}
export function StringToLevel(dfault: Level,level?: string): Level {
    let lvl: Level;
    switch (level) {
        case "Error":
            lvl = Level.Error;
            break;
        case "Warn":
            lvl = Level.Warn;
            break;
        case "Info":
            lvl = Level.Info;
            break;
        case "Debug":
            lvl = Level.Debug;
            break;
        case "Trace":
            lvl = Level.Trace;
            break;
        default:
            lvl = dfault;
            break;
    }
    return lvl;
}
export interface BaseLogger {
    info(m: any, file: string): void;
    debug(m: any, file: string): void;
    trace(m: any, file: string): void;
    warn(m: any, file: string): void;
    error(m: any, file: string): void;
}
export class CoreLogger implements BaseLogger {
    private logs: BaseLogger = {
        info (m: any, file: string): void {},
        debug(m: any, file: string): void {},
        trace(m: any, file: string): void {},
        warn (m: any, file: string): void {},
        error(m: any, file: string): void {}
    }
    constructor(logger: BaseLogger){
        this.logs = logger;
    }
    public info(m: any, file: string): void {
        this.logs.info(m,file)
    }
    public debug(m: any, file: string): void {
        this.logs.debug(m,file)
    }
    public trace(m: any, file: string): void {
        this.logs.trace(m,file)
    }
    public warn(m: any, file: string): void {
        this.logs.warn(m,file)
    }
    public error(m: any, file: string): void {
        this.logs.error(m,file)
    }
}
class ConsoleLogger {
    public static init(): CoreLogger {
        return new CoreLogger({
            info(m, file) {
                ConsoleLogger.log(m,file,Level.Info);
            },
            debug(m, file) {
                ConsoleLogger.log(m,file,Level.Debug);
            },
            trace(m, file) {
                ConsoleLogger.log(m,file,Level.Trace);
            },
            warn(m, file) {
                ConsoleLogger.log(m,file,Level.Warn);
            },
            error(m, file) {
                ConsoleLogger.log(m,file,Level.Error);
            }
        })
    }
    private static __format(m: any, level: Level, color: string, colorend: string, file: string, rn: Date){
        return tracing.__format(m,LevelToString(level),color,colorend,file,rn);
    }
    private static __log(m: string): void { console.log(m) }
    private static __cog(m: string): void { tracing.__corelog(m) }
    public static log(m: any, file: string, level: Level){
        let res = this.__format(m,level,"","",file,new Date());
        if(level.valueOf() <= getLogLevel().valueOf()){this.__log(res[0])}
        if(level.valueOf() <= tracing.corelogger.__getLevel().valueOf()){this.__cog(res[1])}
    }
}
class IOLogger {
    public static init(): CoreLogger {
        return new CoreLogger({
            info(m, file) {
                ConsoleLogger.log(m,file,Level.Info);
            },
            debug(m, file) {
                ConsoleLogger.log(m,file,Level.Debug);
            },
            trace(m, file) {
                ConsoleLogger.log(m,file,Level.Trace);
            },
            warn(m, file) {
                ConsoleLogger.log(m,file,Level.Warn);
            },
            error(m, file) {
                ConsoleLogger.log(m,file,Level.Error);
            }
        })
    }
}


let LOGLEVEL: Level = Level.Info;
let LOGGER: CoreLogger;


/**
 * @function
 * @param {Level} level level to set the logging to
 * @returns {void}
 */
export const setLogLevel = function(level: Level): void {
    LOGLEVEL = level;
}

/**
 * @function
 * @param {"Console" | "IO" | "Custom"} type
 * @param {extends logger | undefined} logger
 * @returns {void}
*/
export const setLogger = function<T extends BaseLogger>(type: "Console" | "IO" | "Custom", logger?: T ): void {
    if(type == "Console") {
        LOGGER = ConsoleLogger.init();
    } else if(type == "IO"){
        LOGGER = IOLogger.init();//todo: replace with IOLogger
    } else if(type == "Custom" && logger){
        LOGGER = new CoreLogger(logger)
    } else {
        LOGGER = ConsoleLogger.init();
    }
}

/**
 * @function
 * @returns {Level}
*/
export const getLogLevel = function():Level{return LOGLEVEL;}

/**
 * @function
 * @returns {logger<any>}
*/
export const getLogger = function(): CoreLogger {
    if(LOGGER == undefined){setLogger("Console")}
    return LOGGER;
}
