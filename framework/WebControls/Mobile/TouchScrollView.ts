import TouchView from "@framework/WebControls/Mobile/TouchView";
import EventResponderInterface from "@framework/EventResponderInterface";
import Content from "@framework/PlaceHolder";
import Stencil from "@framework/Stencil";
import TouchScrollViewEventResponder from "@framework/WebControls/Mobile/TouchScrollViewEventResponder";
import EventResponder from "@framework/EventResponder";

/** section: WebControls_Mobile
 * class TouchScrollView < Panel
 * includes EventResponderMixin
 *
 * Control creates a scrollable container with pull-to-refresh function
 *
 **/
export default class TouchScrollView extends TouchView implements EventResponderInterface {
  _refreshBoxHeight = 0;
  _refreshBox = null;
  _headerHeight = 44;
  _RefreshPuller: Stencil = null;
  _boundTouchEnd = null;
  _renderedScrollElement = null;
  _willRefresh: boolean = false;


  private _event = null;

  get event(): EventResponder {
    if (this._event === null) {
      this._event = new TouchScrollViewEventResponder(this, ['Scroll', 'Refresh']);
    }
    return this._event;
  }

  private _RefreshPullerHeight: any = 80;

  get RefreshPullerHeight(): any {
    return this.converters.int(this._RefreshPullerHeight);
  }

  set RefreshPullerHeight(value: any) {
    this._RefreshPullerHeight = value;
  }

  private _EnableRefresh: any = true;

  get EnableRefresh(): any {
    return this.converters.boolean(this._EnableRefresh);
  }

  set EnableRefresh(value: any) {
    this._EnableRefresh = value;
  }

  private _ForceScroll: any = true;

  get ForceScroll(): any {
    return this.converters.boolean(this._ForceScroll);
  }

  set ForceScroll(value: any) {
    this._ForceScroll = value;
  }

  private _RefreshPullerLabel: any = "Pull down to refresh";

  get RefreshPullerLabel(): any {
    return this.converters.string(this._RefreshPullerLabel);
  }

  set RefreshPullerLabel(value: any) {
    this._RefreshPullerLabel = value;
  }

  private _RefreshPullerTemplate: any = null;

  get RefreshPullerTemplate(): any {
    return this._RefreshPullerTemplate;
  }

  set RefreshPullerTemplate(value: any) {
    this._RefreshPullerTemplate = value;
  }

  scrolled(sender, param) {
    var scroll = -param.domEvent.target.scrollTop;
    var pullerHeight = this.RefreshPullerHeight;
    var headerHeight = this.HasHeader ? this._headerHeight : 0;
    var enabled = this.EnableRefresh;
    if (enabled && scroll > pullerHeight) {
      if (!this._willRefresh) {
        this._willRefresh = true;
        if (this._boundTouchEnd == null) {
          this._boundTouchEnd = this.touchended.bind(this);
        }
        this.event.addEventListener(this._renderedMainElement, 'touchend', this._boundTouchEnd);
      }
      this._refreshBox.style.top = (headerHeight) + "px";
      this._refreshBox.className = 'refresh-puller active' + (this.HasHeader ? ' has-header' : '');
    } else if (enabled && scroll > 0) {
      this._refreshBox.style.top = (headerHeight - pullerHeight + scroll) + "px";
    } else {
      this._willRefresh = false;
      this._refreshBox.style.top = (headerHeight - pullerHeight) + "px";
      this._refreshBox.className = 'refresh-puller inactive' + (this.HasHeader ? ' has-header' : '');
    }
  }

  touchended(event) {
    this.event.removeEventListener(this._renderedMainElement, 'touchend', this._boundTouchEnd);
    this.event.trigger('Refresh', {});
  }

  setAdditionalCssClasses(class_string) {
    class_string = super.setAdditionalCssClasses(class_string);
    var class_a = class_string.split(' ');

    class_a = class_a.filter(function(e) {
      return e != 'padding'
    });

    if (class_a.indexOf('content-with-scroll') == -1) {
      class_a.push('content-with-scroll');
    }

    return class_a.join(' ');
  }

  createMainElement() {
    var d = document.createElement('div');
    var c = super.createMainElement();
    var s = document.createElement('div');

    s.className = 'scroll-content' + (this.HasPadding ? ' padding' : '') + (this.ForceScroll ? ' force-scroll' : '');

    var r = document.createElement('div');
    r.className = 'refresh-puller inactive' + (this.HasHeader ? ' has-header' : '');

    d.appendChild(r);
    d.appendChild(c);
    c.appendChild(s);

    this._renderedContentPlaceholder = s;
    this._refreshBox = r;
    this._renderedScrollElement = c;
    this._willRefresh = false;

    var headerHeight = this.HasHeader ? this._headerHeight : 0;
    this._refreshBox.style.top = (headerHeight - this.RefreshPullerHeight) + "px";

    this.event.registerTriggerElement(c, 'scroll', 'Scroll');

    return d;
  }

  createChildControls() {
    if (this.EnableRefresh) {
      var puller = new Stencil();
      puller.Type = 'RefreshPuller';
      puller.useTemplate(this._RefreshPullerTemplate || this.getDefaultRefreshPuller());
      this._RefreshPuller = puller;
    }
  }

  getDefaultRefreshPuller() {
    var labelText = this.RefreshPullerLabel;
    return function(item) {
      var ExpressionContext = item;
      var content = new Content();
      item.addTemplateChildControl("c13", content);
      content.renderTemplateChildControls = function(placeholder) {
        var icon_wrapper = document.createElement("span");
        icon_wrapper.setAttribute("class", "icon");
        var icon = document.createElement("span");
        icon.setAttribute("class", "ion-arrow-down-c");
        icon_wrapper.appendChild(icon);
        placeholder.appendChild(icon_wrapper);
        var label_wrapper = document.createElement("span");
        label_wrapper.setAttribute("class", "label");
        var label_text = document.createTextNode(labelText);
        label_wrapper.appendChild(label_text);
        placeholder.appendChild(label_wrapper);
      };
    };
  }

  renderContents() {
    super.renderContents();
    if (this._RefreshPuller !== null) {
      this._RefreshPuller.renderContentsInPlaceholder(this._refreshBox);
    }
  }
}
