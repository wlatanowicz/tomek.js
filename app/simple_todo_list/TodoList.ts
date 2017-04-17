import TTemplateControl from "@framework/TTemplateControl";
import template from "./TodoList.tpl";

export default class TodoList extends TTemplateControl
{
    template = template;

    items = [];

    buttonClicked( sender, param )
    {
        var repeaterItems = this.$('ListRepeater').Items;
        for (var i=0; i<repeaterItems.length; i++) {
            this.items[i].done = repeaterItems[i].$('DoneCheckBox').Checked;
        }

        this.items.push({
            "done" : false,
            "description" : this.$('NewItemTextBox').Text
        });
        this.$('ListRepeater').DataSource = this.items;
        this.$('ListRepeater').render();
    }

}
