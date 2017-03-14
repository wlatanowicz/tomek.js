import TControl from "@framework/TControl";
import TEventResponderInterface from "@framework/TEventResponderInterface";
import TEventResponder from "@framework/TEventResponder";
import TRouteViewManager from "@framework/TRouteViewManager";

/** section: Controls
 * class TRouteView < TControl
 * 
 * 
 * Control is visible only when matching hash is present in url
 * 
 **/
export default class TRouteView extends TControl implements TEventResponderInterface
{

    private _event = null;

    get event():TEventResponder
    {
        if (this._event === null) {
            this._event = new TEventResponder(this, ['BecameActive', 'BecameInactive']);
        }
        return this._event;
    }

	_ComputedPaths = null;
    _Params:any = {_list: []};
	
	destroy()
    {
		TRouteViewManager.getInstance().deregisterRouteView( this );
		super.destroy();
	}
	
	/**
	 * TRouteView#RegExp -> string
	 **/
	
	/**
	 * TRouteView#Path -> string
	 **/
	
	/**
	 * TRouteView#AutoRender -> bool
	 **/
	
	/**
	 * TRouteView#IsActive -> bool
	 **/
	
	//@Override
	getPublicProperties(){
		var arr = [];//this.base();
		arr.push( 'RegExp' );
		arr.push( 'Path' );
		arr.push( { name: 'AutoRender', type: 'bool', default: true } );
		arr.push( { name: 'ShouldRender', type: 'bool', default: true } );
		arr.push( { name: 'IsActive', type: 'bool', default: false } );
		return arr;
	}



	get CurrentPath()
	{
		return TRouteViewManager.getInstance().CurrentPath;
	}

	protected _RegExp;

	set RegExp(regexp)
	{
		this._RegExp = regexp;
		TRouteViewManager.getInstance().deregisterRouteView(this);
		TRouteViewManager.getInstance().registerRouteView(this);
	}

	get RegExp()
    {
        return this.converters.string(this._RegExp);
    }

    protected _Path;

	set Path(path)
	{
		this._ComputedPaths = null;
		this._Path = path.split("\n").map(function(e){
			return e.trim()
		});;
		TRouteViewManager.getInstance().deregisterRouteView( this );
		TRouteViewManager.getInstance().registerRouteView( this );
	}

	get Path()
    {
        return this._Path;
    }

    protected _AutoRender = true;

	set AutoRender(v)
    {
        this._AutoRender = v;
    }

    get AutoRender()
    {
        return this.converters.boolean(this._AutoRender);
    }

    protected _ShouldRender = true;

	set ShouldRender(v)
    {
        this._ShouldRender = v;
    }

    get ShouldRender()
    {
        return this.converters.boolean(this._ShouldRender);
    }

    protected _IsActive = false;

	get IsActive()
    {
        return this._IsActive;
    }

 	get ComputedPaths()
    {
		if ( this._ComputedPaths === null ){
			if ( this._Path !== null ){
				this._ComputedPaths = [];
				for ( var k=0; k<this._Path.length; k++ ){
					if ( this._Path[k].trim().length > 0 ){
						this._ComputedPaths.push( this._Path[k].trim() );
					}
				}
			}else{
				this._ComputedPaths = [];
			}
		}
		return this._ComputedPaths;
	}
	
	get Visible()
	{
        return this.converters.boolean(this._Visible)
            && (this.Parent === null || this.Parent.Visible)
            && this.IsActive;
	}
	
	/**
	 * TRouteView#getParam( name ) -> string
	 * - name (String|Integer): param name or index
	 * 
	 **/
	getParam(name)
	{
		if (/[0-9]+/.test( name )) {
			return this._Params._list[name] ? this._Params._list[name] : null;
		}
		return this._Params[name] ? this._Params[name] : null;
	}
	
	activate(params)
	{
		var wasActive = this._IsActive;
		var oldParams = this._Params;
		this._Params = params;
		this._IsActive = true;
		this.ShouldRender = (this.AutoRender && ! wasActive);
		this.event.trigger('BecameActive', {
				"oldParams" : oldParams,
				"newParams" : this._Params,
				"wasActive" : wasActive,
				"isActive" : true
				});
		if (this.ShouldRender) {
			this.render();
		}
	}
	
	deactivate()
	{
		var wasActive = this._IsActive;
		var oldParams = this._Params;
		this._Params = {};
		this._IsActive = false;
		this.ShouldRender = this.AutoRender;
		this.event.trigger('BecameInactive', {
			"oldParams" : oldParams,
			"newParams" : this._Params,
			"wasActive" : wasActive,
			"isActive" : false
		});
		if (this.ShouldRender){
			this.render();
		}
	}
	
	checkForCurrentPath ()
	{
		TRouteViewManager.getInstance().checkControlForCurrentPath(this);
	}
}
