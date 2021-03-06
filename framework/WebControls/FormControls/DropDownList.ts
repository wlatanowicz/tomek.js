import WebControl from "@framework/WebControls/WebControl";
import EventResponderInterface from "@framework/EventResponderInterface";
import EventResponder from "@framework/EventResponder";
import ValidatableInterface from "@framework/WebControls/ValidationControls/ValidatableInterface";
import Option from "@framework/WebControls/FormControls/Option";
import WebControlProperty from "@framework/WebControls/WebControlProperty";

/** section: WebControls_FormControls
 * class DropDownList <  WebControl
 * includes EventResponderMixin
 * 
 * Control renders a select
 * 
 * ##### Triggered events
 * 
 * `on:Change`
 * 
 **/
export default class DropDownList extends WebControl implements EventResponderInterface, ValidatableInterface {

  //@Override
  _tagName = 'select';

  //@Override
  _rendersChildControls = true;

  public IsValid;

  //@Override
  _triggersEvents = ['Change'];

  private _event = null;

  get event(): EventResponder {
    if (this._event === null) {
      this._event = new EventResponder(this, this._triggersEvents);
    }
    return this._event;
  }

  /**
   * DropDownList#DataSource -> Array
   **/

  set Value(v) {
    this.SelectedValue = v;
  }

  get Value() {
    return this.SelectedValue;
  }

  set SelectedValue(v) {
    var indexToSet = -1;
    var j;
    var stringValue = this.converters.string(v);
    for (j = 0; j < this.Options.length; j++) {
      var i = this.Options[j];
      if (i.Value == stringValue) {
        indexToSet = j;
      }
    }
    if (indexToSet >= 0) {
      this.SelectedIndex = indexToSet;
    } else {
      this._ValueToSet = v;
    }
  }

  get SelectedValue() {
    if (this._ValueToSet !== null) {
      return this._ValueToSet.toString();
    }
    var idx = this.SelectedIndex;
    if (this.Options[idx] && this.Options[idx].Value) {
      return this.Options[idx].Value;
    } else {
      return null;
    }
  }

  private _SelectedIndex;

  set SelectedIndex(value: any) {
    this._ValueToSet = null;
    this._SelectedIndex = value;
    this.applyProperty(this._renderedMainElement, 'SelectedIndex');
  }

  get SelectedIndex() {
    this.fetchProperty(this._renderedMainElement, 'SelectedIndex');
    return this.converters.int(this._SelectedIndex);
  }

  private _Disabled;

  set Disabled(v) {
    this._Disabled = v;
    this.applyProperty(this._renderedMainElement, 'Disabled');
  }

  get Disabled() {
    return this.converters.boolean(this._Disabled);
  }

  private _DataSource = [];

  set DataSource(ds) {
    this._DataSource = ds;

    for (var i = 0; i < this._childControls.length; i++) {
      this._childControls[i].destroy();
    }

    this.removeRenderedNodes();

    this._childControlsCreated = false;
    this._childControls = [];
    this._childControlsHash = {};
  }

  get DataSource() {
    return this.converters.object(this._DataSource);
  }

  get Options() {
    return this.findChildControlsByKind(Option);
  }

  private _TextFieldName = "text";

  set TextFieldName(v) {
    this._TextFieldName = v;
  }

  get TextFieldName() {
    return this.converters.string(this._TextFieldName);
  }

  private _ValueFieldName = "value";

  set ValueFieldName(v) {
    this._ValueFieldName = v;
  }

  get ValueFieldName() {
    return this.converters.string(this._ValueFieldName);
  }

  private _DisabledFieldName = "disabled";

  set DisabledFieldName(v) {
    this._DisabledFieldName = v;
  }

  get DisabledFieldName() {
    return this.converters.string(this._DisabledFieldName);
  }

  getElementProperites() {
    var props = super.getElementProperites();
    props['SelectedIndex'] = new WebControlProperty("selectedIndex", "_SelectedIndex", this.converters.int, true);
    return props;
  }

  //@Override
  createMainElement() {
    var d = super.createMainElement();

    this.event.registerTriggerElement(d, 'change', 'Change');

    return d;
  }

  /**
   * DropDownList#createChildControls() -> void
   *
   * Creates child controls based on contents of DataSource
   *
   **/
  //@Override
  createChildControls() {
    var data_source = this.DataSource;
    for (var i = 0; i < data_source.length; i++) {
      var data_item = data_source[i];
      var opt = new Option();
      opt.Text = data_item[this.TextFieldName];
      opt.Value = data_item[this.ValueFieldName];
      if (this.DisabledFieldName) {
        opt.Disabled = data_item[this.DisabledFieldName];
      }
      this.addChildControl(opt);
    }
  }

  protected _ValueToSet = null;

  preRender() {
    var selected_index = this.SelectedIndex;
    var somethingSelected = false;
    var options = this.$$kind(Option);
    for (var i = 0; i < options.length && !somethingSelected; i++) {
      var selected = false;

      if (!somethingSelected) {

        if (this._ValueToSet !== null
          && this._ValueToSet.toString() == options[i].Value) {
          selected = true;
          this._SelectedIndex = i;
        } else
          if (this._ValueToSet === null
            && selected_index === i) {
            selected = true;
          }

        if (selected) {
          options[i].Selected = true;
        }

        somethingSelected = selected || somethingSelected;
      }

    }

  }

  renderContents() {
    var si = this.SelectedIndex;
    super.renderContents();
    this.SelectedIndex = si;
  }
}
