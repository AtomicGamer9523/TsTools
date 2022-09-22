# TSTools

## Useful Tools for Typescript

### Examples: [./examples](./examples/)

### Tools Included:

* Logging
  * Default Built-in Loggers (`ConsoleLogger` and `IOLogger`)
    * [**CoreLog**](./doc/CoreLog.md)
    * SAFE function caller tracer
    * rust bindings for logging EVERYTHING (work in progress)
  * Fully Customizable Loggers
* Structs
  * Constructors
  * Property Constructors for easier development
  * Builders

### Examples:

```js
import * as tst from 'ts-tools';
const {_debug$,_error$,_info$,_trace$,_warn$} = tst.L;

_info$("Hello World!")
```
