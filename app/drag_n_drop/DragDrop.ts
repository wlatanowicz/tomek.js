import TemplateControl from "@framework/TemplateControl";

import template from "./DragDrop.tpl";
import Repeater from "@framework/Repeater";

export default class DragDrop extends TemplateControl
{

    template = template;

	items1 = [];
	items2 = [];
	items3 = [];
	items4 = [];
	
	constructor()
    {
        super();
		this.loadDefaults();
	}
	
	loadDefaults(){
		this.items2 = [];
		this.items3 = [];
		this.items4 = [];
		this.items1 = [
			{
				id: 1,
				color: 'red'
			},
			{
				id: 2,
				color: 'green'
			},
			{
				id: 3,
				color: 'blue'
			},
			{
				id: 4,
				color: 'red'
			},
			{
				id: 5,
				color: 'green'
			},
			{
				id: 6,
				color: 'blue'
			}
		];
		
		this.$('Repeater1').DataSource = this.items1;
		this.$('Repeater2').DataSource = this.items2;
		this.$('Repeater3').DataSource = this.items3;
		this.$('Repeater4').DataSource = this.items4;
	}
	
	onDrop(sender, param)
    {
		if (param.hasMatchingDraggable) {
		
			var obj = param.draggable.CustomData.obj;

			var rpt = sender.findChildControlsByKind(Repeater)[0];
			rpt.DataSource.push(obj);
			rpt.cleanup();

			var src = this.$(param.draggable.CustomData.source);
			var i = src.DataSource.indexOf(obj)
			if ( i >= 0 ){
				src.DataSource.splice( i, 1 );
				src.cleanup();
				src.render();
			}

			sender.render();
		}
	}
}
