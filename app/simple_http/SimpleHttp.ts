import TemplateControl from "@framework/TemplateControl";
import Http from "@framework/Data/Http";

import template from "./SimpleHttp.tpl";

export default class SimpleHttp extends TemplateControl {
  template = template;

  buttonClicked(sender, param) {

    var http = new Http('http://api.openweathermap.org/data/2.5/');

    http.get('weather', {
      'lat': '35',
      'lon': '139',
      'appid': '2de143494c0b295cca9337e1e96b00e0'
    })
      .start(function() {
        this.$('TemperatureL').Text = '...';
        this.render();
      }.bind(this))
      .done(function(response) {
        this.$('TemperatureL').Text = response.main.temp;
        this.render();
      }.bind(this))
      .error(function(req) {
        alert('Error :-(');
      }.bind(this));

  }
}
