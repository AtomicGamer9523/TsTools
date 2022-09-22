import { S } from "../../lib";

let klazz = S._Struct$("StructName")    /* Contructor                                                           **/
    ._(                                 /* Declare AND Define new property                                      **/
        "PropertyName",                 /* Name of Property                                                     **/
        S.$P("Property_value")          /* Value of the property                                                **/
        // .setConfigurable(true)       /* Allows Configuration of value from outside, defaults to true         **/
        // .setEnumerable(true)         /* Allows Enumeration of value, defaults to true                        **/
        // .setWritable(true)           /* Allows Writability of value from outside, defaults to true           **/
        // .build()                     /* Builds the Property value, used to be required, isn't anymore        **/
    )                                   /* End of property definition, you may chain multiple after each other  **/
.build()                                /* Builds the Struct, required if you would like to use it              **/

console.log(klazz)