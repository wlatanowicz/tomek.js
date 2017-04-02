export default class GreetingsProvider
{
    constructor(greetings: string) {
        this._greetings = greetings;
    }

    private _greetings: string;

    get Greetings(): string {
        return this._greetings;
    }
}