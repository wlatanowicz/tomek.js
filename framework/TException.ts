
/** section: Utilities
 * class TException
 * 
 **/
export default class TException
{

    message = null;
    date = null;
    stack = [];

    constructor( message: string ){
        this.message = message;
        this.date = new Date();

        //var err = new Error();
        //var stack = err.stack.split("\n");
        //this.stack = stack.splice( stack[0] == 'Error' ? 3 : 2 );
    }

    getMessage(){
        return this.message;
    }

    toString(){
        return 'TException: '+this.getMessage()+"\n\n<errorDescription>"+this.toJSON()+"</errorDescription>";
    }

    toDescriptionObject(){
        return { 'klass' : '//@TODO', 'message' : this.getMessage(), stack:this.stack, 'timestamp' : this.date.getTime() };
    }

    toJSON(){
        return JSON.stringify( this.toDescriptionObject() );
    }

}