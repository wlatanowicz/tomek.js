import Builder from  './Builder';

export default class TestBuilder extends Builder {

	constructor(  base_dir:string, config ){		
		super(base_dir, config);
		this.app = 'test';
		this.build = 'testbuild';
	}

}