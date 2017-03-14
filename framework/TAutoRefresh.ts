import TControl from "@framework/TControl";

/** section: Controls
 * class TAutoRefresh < TControl
 * 
 * 
 * Control rerenders itself periodically
 * 
 **/
export default class TAutoRefresh extends TControl {

	/**
	 * TAutoRefresh#Interval -> float
	 **/
	
	/**
	 * TAutoRefresh#Running -> bool
	 **/

	private _Interval = 1.0;

	set Interval(value:any)
	{
		this._Interval = value;
	}

	get Interval()
	{
		return this.converters.float(this._Interval);
	}

	private _Running = true;

	set Running(value)
	{
		this._Running = value;
	}

	get Running()
	{
		return this.converters.boolean(this._Running);
	}
	
	renderContents(){
		super.renderContents();
		this.setupRefresh();
	}
	
	refresh(){
		this.render();
	}
	
	setupRefresh(){
		if (this.Running){
			setTimeout(this.refresh.bind( this ), this.Interval * 1000.0);
		}
	}

}