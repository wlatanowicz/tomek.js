export default class TWebControlProperty
{
    constructor(elementPropertyName: string, objectFieldName: string, converter: Function, fetchable: boolean = false, applicable: boolean = true) {
        this._elementPropertyName = elementPropertyName;
        this._objectFieldName = objectFieldName;
        this._converter = converter;
        this._fetchable = fetchable;
        this._applicable = applicable;
    }

    get ElementPropertyName(): string {
        return this._elementPropertyName;
    }

    get ObjectFieldName(): string {
        return this._objectFieldName;
    }

    get Converter(): Function {
        return this._converter;
    }

    get Fetchable(): boolean {
        return this._fetchable;
    }

    get Applicable(): boolean {
        return this._applicable;
    }

    private _elementPropertyName: string;
    private _objectFieldName: string;
    private _converter: Function;
    private _fetchable: boolean;
    private _applicable: boolean;
}