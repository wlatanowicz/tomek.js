import TPanel from "@framework/WebControls/TPanel";

export default class TTouchSideMenu extends TPanel
{
    private _IsActive;

    set IsActive(value: any)
    {
        this._IsActive = value;
        if (this.converters.boolean(this.IsActive)) {
            this.addCssClass('active');
            this.removeCssClass('inactive');
        } else {
            this.addCssClass('inactive');
            this.removeCssClass('active');
        }
    }

    get IsActive()
    {
        return this.converters.boolean(this._IsActive);
    }

    setAdditionalCssClasses(class_string)
    {
        var class_a = class_string.split(' ');

        if (class_a.indexOf('menu') == -1) {
            class_a.push('menu');
        }
        if (class_a.indexOf('menu-left') == -1) {
            class_a.push('menu-left');
        }

        if (this.IsActive) {
            class_a = class_a.filter(function (e) {
                return e != 'inactive'
            });
            if (class_a.indexOf('active') == -1) {
                class_a.push('active');
            }
        } else {
            class_a = class_a.filter(function (e) {
                return e != 'active'
            });
            if (class_a.indexOf('inactive') == -1) {
                class_a.push('inactive');
            }
        }

        return class_a.join(' ');
    }

    get CssClass()
    {
        var cssClass = this.converters.string(this._CssClass);
        return this.setAdditionalCssClasses(cssClass);
    }

    set CssClass(value: any)
    {
        this._CssClass = value;
        this.applyProperty(this._renderedMainElement, 'CssClass');
    }
}
