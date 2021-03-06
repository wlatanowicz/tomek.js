/** section: Utilities
 * class Promise
 *
 * Multi-state promise implementation
 *
 **/
export default class Promise {
  _stateHistory = [];
  _callbacks = {};
  _terminated = false;

  constructor() {
    this._stateHistory = [];
    this._callbacks = {};
    this._terminated = false;
  }

  /**
   * Promise#getCurrentState( e ) -> Object
   *
   * Returns current state object
   *
   **/
  getCurrentState() {
    if (this._stateHistory.length > 0) {
      return this._stateHistory[this._stateHistory.length - 1];
    }
    return null;
  }

  /**
   * Promise#getPreviousStateByName( state_name ) -> Object
   * - state_name (String): state name
   *
   * Finds most recent occurance of a state by name
   *
   **/
  getPreviousStateByName(state_name) {
    for (var i = (this._stateHistory.length - 1); i >= 0; i--) {
      if (this._stateHistory[i].state === state_name) {
        return this._stateHistory[i];
      }
    }
    return null;
  }

  /**
   * Promise#terminate() -> void
   *
   * Stops promise. No futher state changes will be effective.
   *
   **/
  terminate() {
    this._terminated = true;
  }

  /**
   * Promise#on( state, callback ) -> Promise
   * - state (String): state name
   * - callback (Function): callback function
   *
   * Binds callback function to state. Can be chained.
   *
   **/
  on(state, callback) {

    var previousState = this.getPreviousStateByName(state);
    if (previousState !== null && !this._terminated) {
      var promise = this;
      setTimeout(function(promise, callback) { if (!promise._terminated) callback(previousState.param, promise); }.bind(this, promise, callback), 0);
    }

    if (this._callbacks[state] == undefined) {
      this._callbacks[state] = [];
    }

    this._callbacks[state].push(callback);

    return this;
  }

  /**
   * Promise#setState( state, param )
   * - state (String): state name
   * - param (Object): parameter associated with state
   *
   * Sets new state
   *
   **/
  setState(state, param) {
    if (this._terminated) {
      return false;
    }
    this._stateHistory.push({
      'state': state,
      'param': param
    });

    if (this._callbacks[state]) {
      for (var i = 0; i < this._callbacks[state].length; i++) {
        var callback = this._callbacks[state][i];
        var promise = this;
        setTimeout(function(promise, callback) { if (!promise._terminated) callback(param, promise); }.bind(this, promise, callback), 0);
      }
    }
    return true;
  }
}
