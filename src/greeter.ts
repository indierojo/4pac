export default class Greeter {
    greeting:string;

    constructor(message:string) {
        this.greeting = message;
    }

    greet = () => {
        return "Hello there, " + this.greeting;
    }
}