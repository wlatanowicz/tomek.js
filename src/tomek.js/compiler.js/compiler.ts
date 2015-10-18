
import Parser from "./parser/Parser";
import Renderer from "./renderer/Renderer";


var parser = new Parser();
var control = parser.parseFile( "../app/TMyControl.tpl" );

var renderer = new Renderer("TMyControl" );
renderer.render(control);

