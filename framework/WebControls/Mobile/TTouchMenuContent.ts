import TPanel from "@framework/WebControls/TPanel";
import TWebControlProperty from "@framework/WebControls/TWebControlProperty";

export default class TTouchMenuContent extends TPanel
{
    setAdditionalCssClasses(class_string: string): string
    {
        var class_a = class_string.split(' ');

        if (class_a.indexOf('content') == -1) {
            class_a.push('content');
        }

        if (class_a.indexOf('menu-content') == -1) {
            class_a.push('menu-content');
        }

        if (class_a.indexOf('menu-animated') == -1) {
            class_a.push('menu-animated');
        }

        return class_a.join(' ');
    }

    get CssClass()
    {
        var cssClass = this.converters.string(this._CssClass);
        return this.setAdditionalCssClasses(cssClass);
    }
}