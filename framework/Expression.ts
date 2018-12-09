/** section: Controls
 * class Expression
 *
 * Stores an expriession to be rendered
 *
 **/
export default class Expression {

  /**
   * Expression#_expressionFunction -> Function
   **/
  _expressionFunction = function() { return null; };

  constructor(fun) {
    this._expressionFunction = fun;
  }

  valueOf() {
    var exp = this._expressionFunction();
    if (exp == null) {
      return null;
    }
    return exp.valueOf();
  }

  toString() {
    var exp = this._expressionFunction();
    if (exp == null) {
      return '!NULL!';
    }
    return exp.toString();
  }

}
