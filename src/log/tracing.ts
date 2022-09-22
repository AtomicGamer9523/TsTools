import * as corelogger from "./corelog";
export { corelogger }

export const __format = function(m: any, level: string, color: string, colorend: string, file: string, rn: Date): string[] {
    let res = `${__date(rn)} ${__file(file)} ${level} ${__message(m,color,colorend)}`;
    let corelog = `${__date(rn)} ${__file(file)} ${level} ${m}`;
    return [res,corelog];
}
export const __corelog = function(m: string): void {
    corelogger._log(m)
}
export const __trace = function(): string {
    try {
        throw new Error();
    } catch (e: any) {
        let arr: string[] = e.stack.replace("\n","").replace("\n","").split("at");
        return arr[arr.length - 10].replace(" ","").split(" ")[1].replace("(","").replace(")","").replace("\n","")
    }
}




function __file(file: string): string {
    return "[" + file + "]";
}

function __message(m:any, color: string, colorend: string): string {
    return ""+ color + m + colorend;
}
function __date(rn: Date): string {
    return rn.getDate()+"/"+(rn.getMonth()+1)+"/"+rn.getFullYear()+":"+rn.getHours()+":"+rn.getMinutes()+":"+rn.getSeconds()+"."+rn.getMilliseconds();
}