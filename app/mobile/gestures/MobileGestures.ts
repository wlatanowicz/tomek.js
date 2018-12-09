import TemplateControl from "@framework/TemplateControl";
import template from "./MobileGestures.tpl";

export default class MobileGestures extends TemplateControl {
  template = template;

  _direction: string = 'up';

  get Direction(): string {
    return this._direction;
  }

  swipe(sender, param) {
    if (param.domEvent.direction === Hammer.DIRECTION_UP) {
      this._direction = 'up';
    }
    if (param.domEvent.direction === Hammer.DIRECTION_DOWN) {
      this._direction = 'down';
    }
    if (param.domEvent.direction === Hammer.DIRECTION_LEFT) {
      this._direction = 'left';
    }
    if (param.domEvent.direction === Hammer.DIRECTION_RIGHT) {
      this._direction = 'right';
    }
    sender.render();
  }
}
