export default class Greeter {
    private greeting: string;

    constructor(message: string) {
        this.greeting = message;
    }

    private greet = () => {
        return "Hello there, " + this.greeting;
    }
}