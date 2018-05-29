class Asteroid extends GameObject implements Observer{
    private _speedX : number = Math.random() < 0.5 ? Math.random() - 1 * 1.5 : Math.random() * 1.5;
    private _speedY : number = Math.random() < 0.5 ? Math.random() - 1 * 1.5 : Math.random() * 1.5;
    
    private _rotationSpeed : number = Math.random()*2;

    private _asteroidList : Array<Asteroid>;

    constructor() {
        super(Math.floor((Math.random() * window.innerWidth) + window.innerWidth / 2), Math.floor((Math.random() * window.innerHeight) + 1), 0, 'asteroid');
    }

    public update() : void {
        this.x += this._speedX;
        this.y += this._speedY;
        this.rotation += this._rotationSpeed;
        super.outsideWindow();
    }

    public notify() {
        this.explode();
    }

    public explode() {
        new AsteroidExplosion(this.x, this.y);
    }
}