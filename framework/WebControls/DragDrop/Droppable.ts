import WebControl from "@framework/WebControls/WebControl";
import EventResponderInterface from "@framework/EventResponderInterface";
import EventResponder from "@framework/EventResponder";
import Draggable from "@framework/WebControls/DragDrop/Draggable";

/** section: WebControls_DragDrop
 * class Droppable < WebControl
 * includes EventResponderMixin
 * 
 * Control creates a droppable container
 * 
 **/
export default class Droppable extends WebControl implements EventResponderInterface {

  //@Override
  _tagName = 'span';

  private _event = null;

  get event(): EventResponder {
    if (this._event === null) {
      this._event = new EventResponder(this, ['DragOver', 'DragLeave', 'DragEnter', 'Drop']);
    }
    return this._event;
  }

  private _Groups = ['*'];

  set Groups(value: any) {
    if (typeof value == "string") {
      value = value.split(",").map(function(s: string) { return s.trim(); });
    }
    this._Groups = value;
  }

  get Groups() {
    return this.converters.object(this._Groups);
  }

  private _AllowFiles = false;

  set AllowFiles(value: boolean) {
    this._AllowFiles = value;
  }

  get AllowFiles(): boolean {
    return this.converters.boolean(this._AllowFiles);
  }

  createMainElement() {
    var d = super.createMainElement();

    this.event.addEventListener(d, 'dragover', this._onEvent.bind(this));
    this.event.addEventListener(d, 'dragleave', this._onEvent.bind(this));
    this.event.addEventListener(d, 'dragenter', this._onEvent.bind(this));
    this.event.addEventListener(d, 'drop', this._onEvent.bind(this));

    return d;
  }

  _onEvent(ev) {
    var hasFiles = false;
    var hasDraggable = false;
    var hasMatchingDraggable = false;

    var currentDraggable = Draggable.currentDraggable
      ? Draggable.currentDraggable
      : null;

    if (this.AllowFiles && this._dataTransferHasFiles(ev.dataTransfer)) {
      hasFiles = true;
    }

    if (this._dataTransferHasDraggable(ev, currentDraggable)) {
      hasDraggable = true;
      if (this.Groups.indexOf('*') > -1 || this.Groups.indexOf(currentDraggable.Group) > -1) {
        hasMatchingDraggable = true;
      }
    }

    if (hasFiles || hasDraggable) {
      if (hasFiles || hasMatchingDraggable) {
        ev.preventDefault();
      }

      var dragParam = {
        domEvent: ev,
        hasMatchingDroppable: hasMatchingDraggable,
        droppable: this
      };

      var dropParam = {
        domEvent: ev,
        hasFiles: hasFiles,
        hasMatchingDraggable: hasMatchingDraggable,
        draggable: null,
        files: null
      };

      if (hasFiles && ev.type == 'drop') {
        dropParam.files = ev.dataTransfer.files;
      }

      if (hasDraggable) {
        dropParam.draggable = currentDraggable;
      }

      var eventName;

      switch (ev.type) {
        case 'drop': eventName = 'Drop';
          break;
        case 'dragover': eventName = 'DragOver';
          break;
        case 'dragenter': eventName = 'DragEnter';
          break;
        case 'dragleave': eventName = 'DragLeave';
          break;
      }

      this.event.trigger(eventName, dropParam);
      if (hasDraggable) {
        currentDraggable.event.trigger(eventName, dragParam);
      }
    }
  }

  _dataTransferHasDraggable(ev, currentDraggable) {
    var dt = ev.dataTransfer;
    var ctrl_id = dt.getData('draggable_id');

    if (currentDraggable
      && ((ctrl_id && ctrl_id.length > 0 && currentDraggable.HtmlID == ctrl_id)
        || (!ctrl_id && ev.type != 'drop'))
    ) {
      return true;
    }
    return false;
  }

  _dataTransferHasFiles(dt) {
    if (dt.types) {
      for (var i = 0; i < dt.types.length; i++) {
        if (dt.types[i] == "Files") {
          return true;
        }
      }
    }
    return false;
  }
}
