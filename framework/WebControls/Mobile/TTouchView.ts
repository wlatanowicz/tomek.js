import TPanel from "@framework/WebControls/TPanel";
import TWebControlProperty from "@framework/WebControls/TWebControlProperty";

export default class TTouchView extends TPanel
{
    private _HasHeader: any;

    get HasHeader()
    {
        return this.converters.boolean(this._HasHeader);
    }

    set HasHeader(value: any)
    {
        this._HasHeader = value;
    }

    private _HasFooter: any;

    get HasFooter()
    {
        return this.converters.boolean(this._HasFooter);
    }

    set HasFooter(value: any)
    {
        this._HasFooter = value;
    }

    private _HasPadding: any;

    get HasPadding()
    {
        return this.converters.boolean(this._HasPadding);
    }

    set HasPadding(value: any)
    {
        this._HasPadding = value;
    }

    setAdditionalCssClasses(class_string: string): string
    {
        var class_a = class_string.split(' ');

        class_a = class_a.filter(function (e)
        {
            return e != 'padding'
        });

        if (class_a.indexOf('content') == -1) {
            class_a.push('content');
        }

        if (this.HasHeader) {
            if (class_a.indexOf('has-header') == -1) {
                class_a.push('has-header');
            }
        } else {
            class_a = class_a.filter(function (e)
            {
                return e != 'has-header'
            });
        }

        if (this.HasFooter) {
            if (class_a.indexOf('has-footer') == -1) {
                class_a.push('has-footer');
            }
        } else {
            class_a = class_a.filter(function (e)
            {
                return e != 'has-footer'
            });
        }

        if (this.HasPadding) {
            if (class_a.indexOf('padding') == -1) {
                class_a.push('padding');
            }
        } else {
            class_a = class_a.filter(function (e)
            {
                return e != 'padding'
            });
        }

        return class_a.join(' ');
    }

    get CssClass()
    {
        var cssClass = this.converters.string(this._CssClass);
        return this.setAdditionalCssClasses(cssClass);
    }
}
