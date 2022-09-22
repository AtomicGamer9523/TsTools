interface PropertyDescriptor<T> {
    configurable?: boolean;
    enumerable?: boolean;
    value?: T;
    writable?: boolean;
    get(): T;
    set?(v: T): void;
}
type Inject = "HEAD" | "TAIL";
interface Method {
    name: string,
    function: Function
}
interface IProperty {
    [name: string]: PropertyDescriptor<any> | any
}
interface IStructBuilder {
    name: string
    properties: IProperty
}
export class IPropertyBuilder<T> {
    private _configurable?: boolean;
    private _enumerable?: boolean;
    private _value?: T;
    private _writable?: boolean;
    constructor(v: T){
        this._value = v;
        this._configurable = true;
        this._enumerable = true;
        this._writable = true;
    }

    public setConfigurable(v: boolean): IPropertyBuilder<T> {
        this._configurable = v;
        return this;
    }
    public setEnumerable(v: boolean): IPropertyBuilder<T> {
        this._enumerable = v;
        return this;
    }
    public setWritable(v: boolean): IPropertyBuilder<T> {
        this._writable = v;
        return this;
    }
    
    public build(): IProperty {
        let res: IProperty = {
            configurable: this._configurable,
            enumerable: this._enumerable,
            value: this._value,
            writable: this._writable
        }
        return res;
    }
}
export class StructBuilder {
    private data: IStructBuilder
    
    constructor(name: string) {
        let name_obj = new IPropertyBuilder(name).build()
        this.data = {
            name: name,
            properties: {
                name: name_obj
            }
        }
    }

    public _<T>(name: string, data: IProperty | IPropertyBuilder<T> ): StructBuilder {
        if(typeof data == typeof IPropertyBuilder) {
            data = data.build()
        }
        this.data.properties[name] = data;
        return this
    }

    public build(): Struct {
        return new Struct(this.data.properties,this.data.properties.name);
    }
}
class BaseStruct {
    protected _self: IProperty;

    constructor(data: IProperty, name: IProperty) {
        this._self = data;
        this._self.name = name;
    }

    private __proto(name: string, property: IProperty ) {
        this._self[name] = property
    }
}
class Struct extends BaseStruct {
    constructor(data: IProperty, name: IProperty) {
        super(data, name);
    }

    public get name() : string {
        return this._self.name.get();
    }

    public get self(): IProperty {
        return this._self;
    } 
}