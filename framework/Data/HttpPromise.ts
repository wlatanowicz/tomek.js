import Promise from "@framework/Promise";

/** section: Data
 * class HttpPromise
 * 
 * 
 **/
export default class HttpPromise extends Promise {
  constructor() {
    super();
    this.wrapPromise();
  }

  getErrorStatuses() {
    return [
      400, 401, 402, 403, 404, 406, 409, 412, 415,
      500, 503
    ];
  }

  wrapPromise() {
    var promise = this;
    var statuses = this.getErrorStatuses();
    for (var i = 0; i < statuses.length; i++) {
      var status = statuses[i];
      promise['http' + status] = function(status, fn) {
        return promise.on(status, function(param) {
          fn(param.response, param.xhttp, param);
        });
      }.bind(this, status);
    }
  }

  done(fn) {
    return this.on('done', function(param) {
      fn(param.response, param.xhttp, param);
    });
  }

  error(fn) {
    return this.on('error', function(param) {
      fn(param.response, param.xhttp, param);
    });
  }

  start(fn) {
    return this.on('start', function(param) {
      fn(param.code, param.xhttp, param);
    });
  }

  invalidPayload(fn) {
    return this.on('invalid-payload', function(param) {
      fn(param.xhttp, param);
    });
  }
}
