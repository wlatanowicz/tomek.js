import Exception from "@framework/Exception";

/** section: Utilities
 * class BaseObject
 * 
 **/
export default class BaseObject {

  klass = null;
  mixins = [];

  converters = {
    "none": function(value: any): any {
      return value;
    },
    "string": function(value: any): string {
      return value !== null && value !== undefined
        ? value.toString()
        : '';
    },
    "boolean": function(value: any): boolean {
      return value === true
        || value == 1
        || value === 'true';
    },
    "int": function(value: any): number {
      return parseInt(value);
    },
    "float": function(value: any): number {
      return parseFloat(value);
    },
    "object": function(value: any): any {
      return value !== null && value !== undefined
        ? value.valueOf()
        : null;
    }
  };

  /**
   * BaseObject#isTypeOf( klass ) -> Boolean
   * - klass (BaseObject|String): class or class name
   *
   * Checks if the object is a particular type
   *
   **/
  isTypeOf(klass) {
    return this instanceof klass;
  }

  /** alias of: BaseObject#isTypeOf
   * BaseObject#isMemberOf( klass ) -> Boolean
   * - klass (BaseObject|String): class or class name
   *
   **/
  isMemberOf(klass) {
    return this instanceof klass;
  }

  /**
   * BaseObject#isKindOf( klass ) -> Boolean
   * - klass (BaseObject|String): class or class name
   *
   * Checks if the object is a particular type or
   * a subclass of if
   *
   **/
  isKindOf(klass) {
    return this instanceof klass;
  }

  /**
   * BaseObject#includesMixin( mixin ) -> Boolean
   * - mixin_name (BaseObject|String): mixin or mixin name
   *
   * Checks if the object includes a mixin
   *
   **/
  includesMixin(mixin) {
    return this instanceof mixin;
  }
}
