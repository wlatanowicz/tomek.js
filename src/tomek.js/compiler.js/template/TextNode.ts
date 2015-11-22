import TemplateNode from "./TemplateNode";
import TextExpression from "./TextExpression";

export default class TextNode extends TemplateNode {

	raw: string;
	expression: TextExpression;

	constructor(text: string) {
		super();
		this.raw = text;
		this.expression = new TextExpression(text);
	}

	detailedDescription(){
		return this.expression.getDescription();
	}

}