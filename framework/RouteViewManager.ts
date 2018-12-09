//= require Object

export default class RouteViewManager {

  _routeViews = [];

  constructor() {
    this._registerEventHandler();
  }

  protected _CurrentPath;

  get CurrentPath() {
    return this._CurrentPath;
  }

  set CurrentPath(path) {
    var activated = [];
    var toDeactivate = [];
    var idx;
    var i;
    this._CurrentPath = path;
    for (i = 0; i < this._routeViews.length; i++) {
      if (activated.indexOf(this._routeViews[i].control) == -1) {
        if (this._routeViews[i].regexp.test(path)) {

          var params = this.processParams(this._routeViews[i], path);
          this._routeViews[i].control.activate(params);
          activated.push(this._routeViews[i].control);

          while ((idx = toDeactivate.indexOf(this._routeViews[i].control)) >= 0) {
            toDeactivate.splice(idx, 1);
          }

        } else {
          if (this._routeViews[i].control.IsActive) {
            toDeactivate.push(this._routeViews[i].control);
          }
        }
      }
    }

    for (i = 0; i < toDeactivate.length; i++) {
      toDeactivate[i].deactivate();
    }
  }

  _registerEventHandler() {
    window.addEventListener('hashchange', this._hashChanged.bind(this));
    if (window.document.readyState === 'complete') {
      this._hashChanged();
    } else {
      window.addEventListener('load', this._hashChanged.bind(this));
    }
  }

  _hashChanged() {
    var newHash = window.location.hash;
    if (newHash.substring(0, 1) === '#') {
      newHash = newHash.substring(1);
    }
    this.CurrentPath = newHash;
  }

  checkControlForCurrentPath(control) {
    var path = this.CurrentPath;
    for (var i = 0; i < this._routeViews.length; i++) {
      if (this._routeViews[i].control === control) {
        if (this._routeViews[i].regexp.test(path)) {
          var params = this.processParams(this._routeViews[i], path);
          this._routeViews[i].control.activate(params);
        } else {
          if (this._routeViews[i].control.IsActive) {
            this._routeViews[i].control.deactivate();
          }
        }
      }
    }
  }

  processParams(routeView, path) {
    var paramList = routeView.regexp.exec(path);
    if (paramList === null) {
      paramList = [];
    } else {
      paramList.splice(0, 1);
    }
    var params = {
      "_list": paramList
    };
    for (var i = 0; i < routeView.params.length; i++) {
      params[routeView.params[i]] = params._list[i]
        ? params._list[i]
        : null;
    }
    return params;
  }

  registerRouteView(routeView) {
    var regexps = this.getProcessedRegExps(routeView);
    for (var i = 0; i < regexps.length; i++) {
      var regexp = new RegExp("^" + regexps[i].regexp + "$");
      var routeViewListItem = {
        "control": routeView,
        "regexp": regexp,
        "params": regexps[i].params
      };

      this._routeViews.push(routeViewListItem);
    }
  }

  deregisterRouteView(routeView) {
    var newList = [];
    for (var i = 0; i < this._routeViews.length; i++) {
      if (this._routeViews[i].control !== routeView) {
        newList.push(this._routeViews[i]);
      }
    }
    this._routeViews = newList;
  }

  getProcessedRegExps(control) {
    var i;
    var regexps = [];
    if (control.RegExp !== null && control.RegExp.length > 0) {
      regexps.push({
        "regexp": control.RegExp,
        "params": []
      });
    }
    for (i = 0; i < control.ComputedPaths.length; i++) {
      regexps.push(this.convertPathToRegexp(control.ComputedPaths[i]));
    }
    return regexps;
  }

  convertPathToRegexp(path) {
    var re = new RegExp("{[a-zA-Z0-9]+}", "g");
    var params = [];
    var callback = function(m) {
      params.push(m.substr(1, m.length - 2));
      return "([^/]+)";
    };
    var regexpPath = path.replace(re, callback);
    if (regexpPath.substr(regexpPath.length - 2) === '/*') {
      regexpPath = regexpPath.substr(0, regexpPath.length - 2);
      regexpPath += "/.*";
    }
    return {
      "regexp": regexpPath,
      "params": params
    };
  }

  static _Instance = null;

  static getInstance() {
    if (RouteViewManager._Instance === null) {
      RouteViewManager._Instance = new RouteViewManager();
    }
    return RouteViewManager._Instance;
  }
}
