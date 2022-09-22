import { L } from "../../lib";
const {_debug$,_error$,_info$,_trace$,_warn$} = L;

// Initializes CoreLog, default log level is "Debug"
L.$initCORELOG("Trace")

// Sets the log level, defaults to "Info"
L.$setLogLevel("Warn")


_error$("Some random Error Message");// will be visible in console and file
_warn$ ("Some random Error Message");// will be visible in console and file
_info$ ("Some random Error Message");// will be visible only in file
_debug$("Some random Error Message");// will be visible only in file
_trace$("Some random Error Message");// will be visible only in file