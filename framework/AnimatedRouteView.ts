import RouteView from "@framework/RouteView";
import Panel from "@framework/WebControls/Panel";

/** section: Controls
 * class AnimatedRouteView < RouteView
 * 
 * 
 * Control is visible only when matching hash is present in url
 * 
 **/
export default class AnimatedRouteView extends RouteView {
  _deactivateRenderDelay = 300;
  _reactivateSecondStageDelay = 50;
  _reactivateSecondStageAnimationDelay = "0.1s";

  _panel = null;
  _div = null;

  private _ActiveCssClass: any = 'fade-in';

  get ActiveCssClass(): any {
    return this.converters.string(this._ActiveCssClass);
  }

  set ActiveCssClass(value: any) {
    this._ActiveCssClass = value;
  }

  private _InactiveCssClass: any = 'fade-out';

  get InactiveCssClass(): any {
    return this.converters.string(this._InactiveCssClass);
  }

  set InactiveCssClass(value: any) {
    this._InactiveCssClass = value;
  }

  createChildControls() {
    this._panel = new Panel();
    this._panel.Parent = this;
  }

  renderChildControls(placeholder) {
    this._panel.renderContentsInPlaceholder(placeholder);
    super.renderChildControls(this._panel._renderedMainElement);
  }

  activate(params) {
    var wasActive = this._IsActive;
    if (wasActive) {
      var oldParams = this._Params;
      this._Params = params;
      this._IsActive = true;
      this.ShouldRender = this.AutoRender && !wasActive;
      this.event.trigger('BecameActive', {
        "oldParams": oldParams,
        "newParams": this._Params,
        "wasActive": wasActive,
        "isActive": true
      });

      var div = this._panel._renderedMainElement.cloneNode(true);
      this._panel._renderedMainElement.parentNode.insertBefore(div, this._panel._renderedMainElement);
      div.style.animationDelay = this._reactivateSecondStageAnimationDelay;
      div.className = this.InactiveCssClass;

      setTimeout(this.reactivateSecondStage.bind(this, params, div), this._reactivateSecondStageDelay);
    } else {
      super.activate(params);
      this.ensureChildControls();
      this._panel.CssClass = this.ActiveCssClass;
    }
  }

  reactivateSecondStage(params, div) {
    var wasActive = this._IsActive;
    this.ensureChildControls();

    if (this.ShouldRender) {
      this.render();
    }

    this._panel.CssClass = this.ActiveCssClass;

    setTimeout(this.reactivateThirdStage.bind(this, div), this._deactivateRenderDelay);
  }

  reactivateThirdStage(div) {
    if (div) {
      var el = document.createElement('div');
      el.appendChild(div);
      el = null;
    }
  }

  deactivate() {
    var wasActive = this._IsActive;
    var oldParams = this._Params;
    this._Params = {};
    this._IsActive = false;
    this.ShouldRender = this.AutoRender;
    this.event.trigger('BecameInactive', {
      "oldParams": oldParams,
      "newParams": this._Params,
      "wasActive": wasActive,
      "isActive": false
    });

    this._panel.CssClass = this.InactiveCssClass;

    if (this.ShouldRender) {
      setTimeout(this.render.bind(this), this._deactivateRenderDelay);
    }
  }

  removeRenderedNodes() {
    super.removeRenderedNodes();
    if (this._panel) {
      this._panel.removeRenderedNodes();
    }
  }

  destroy() {
    super.destroy();
    if (this._panel) {
      this._panel.destroy();
    }
  }
}
