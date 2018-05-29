class Bomb extends GameObject implements Subject {
    observers : Array<Observer>;
    
    constructor() {
        super(Math.floor((Math.random() * window.innerWidth) + 1),
        Math.floor((Math.random() * window.innerHeight) + 1), 
        0, 'bomb');
        this.observers = new Array<Observer>();
    }

    subscribe(o: Observer): void {
        this.observers.push(o);
    }

    unsubscribe(o: Observer): void {
        let i:number = this.observers.indexOf(o);
        if(i != -1) {
            this.observers.splice(i, 1);
        }
    }

    notifyObs() {
        AudioManager.playSound('./../sfx/sfx_bomb.wav');
        
        for( var i = this.observers.length-1; i >= 0; i-- ) {
            this.observers[i].notify();
            }
    }
}