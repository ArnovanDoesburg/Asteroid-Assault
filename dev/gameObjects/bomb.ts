class Bomb extends GameObject implements Subject {
    public observers : Array<Observer> = new Array<Observer>();

    constructor() {
        super(
            Math.floor((Math.random() * window.innerWidth) + 1),
            Math.floor((Math.random() * window.innerHeight) + 1), 
            0, 
            'bomb');
    }

    subscribe(o: Observer): void {
        this.observers.push(o);
        console.log('subscribed');
    }

    unsubscribe(o: Observer): void {
        let i:number = this.observers.indexOf(o);
        if(i != -1) {
            this.observers.splice(i, 1);
        }
    }

    public activate(): void {
        for (let o of this.observers) {
            o.notify();
        }
    }
}