import WebControl from "@framework/WebControls/WebControl";
import EventResponderInterface from "@framework/EventResponderInterface";
import EventResponder from "@framework/EventResponder";

/** section: WebControls_DragDrop
 * class Draggable < WebControl
 * includes EventResponderMixin
 * 
 * Control creates a draggable container
 * 
 **/
export default class Draggable extends WebControl implements EventResponderInterface {
  public static currentDraggable: Draggable = null;

  //@Override
  _tagName = 'span';

  //@Override
  _triggersEvents = ['DragStart', 'DragEnd', 'Drop', 'DragEnter', 'DragLeave', 'DragOver'];

  private _event = null;

  get event(): EventResponder {
    if (this._event === null) {
      this._event = new EventResponder(this, this._triggersEvents);
    }
    return this._event;
  }

  _uid = null;

  private _Group = "Default";

  set Group(v: any) {
    this._Group = v;
  }

  get Group() {
    return this.converters.string(this._Group);
  }

  createMainElement() {
    var d = super.createMainElement();

    d.setAttribute('draggable', "true");

    this.event.addEventListener(d, 'dragstart', this._onDragStart.bind(this));
    this.event.addEventListener(d, 'dragend', this._onDragEnd.bind(this));


    return d;
  }

  _onDragStart(ev) {
    // http://stackoverflow.com/questions/6186844/clear-a-selection-in-firefox/6187098#6187098
    if (window['selection'] && window['selection'].empty) {
      window['selection'].empty();
    } else {
      window.getSelection().removeAllRanges();
    }

    this.ensureHtmlID();
    Draggable.currentDraggable = this;
    ev.dataTransfer.dropEffect = 'move';
    ev.dataTransfer.setData("draggable_id", this.HtmlID);
    this.event.trigger(
      'DragStart',
      {
        domEvent: ev
      }
    );
  }

  _onDragEnd(ev) {
    Draggable.currentDraggable = null;
    this.event.trigger(
      'DragEnd',
      {
        domEvent: ev
      }
    );
  }

}
