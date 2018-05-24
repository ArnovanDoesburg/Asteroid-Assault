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
    }

    unsubscribe(o: Observer): void {
        
    }

    public activate(): void {
        for (let o of this.observers) {
            o.notify();
        }
    }
}