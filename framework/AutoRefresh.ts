import Control from "@framework/Control";

/** section: Controls
 * class AutoRefresh < Control
 * 
 * 
 * Control rerenders itself periodically
 * 
 **/
export default class AutoRefresh extends Control {

  /**
   * AutoRefresh#Interval -> float
   **/

  /**
   * AutoRefresh#Running -> bool
   **/

  private _Interval = 1.0;

  set Interval(value: any) {
    this._Interval = value;
  }

  get Interval() {
    return this.converters.float(this._Interval);
  }

  private _Running = true;

  set Running(value) {
    this._Running = value;
  }

  get Running() {
    return this.converters.boolean(this._Running);
  }

  renderContents() {
    super.renderContents();
    this.setupRefresh();
  }

  refresh() {
    this.render();
  }

  setupRefresh() {
    if (this.Running) {
      setTimeout(this.refresh.bind(this), this.Interval * 1000.0);
    }
  }

}