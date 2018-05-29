class AsteroidPart extends GameObject {
    private _speedX : number = Math.random() < 0.5 ? Math.random() - 1 * 1.5 : Math.random() * 1.5;
    private _speedY : number = Math.random() < 0.5 ? Math.random() - 1 * 1.5 : Math.random() * 1.5;

    private _rotationSpeed : number = Math.random()*7;

    constructor(x:number, y:number) {
        super(x, y, 1, 'asteroidpart'+Math.floor(Math.random() * 2 + 1));
    }

    public outsideWindow() : boolean {
        return(
            this.x > window.innerWidth ||
            this.x + this.width < 0 ||
            this.y > window.innerHeight ||
            this.y + this.height < 0);
    }

    public update() {
        this.x += this._speedX;
        this.y += this._speedY;
        this.rotation += this._rotationSpeed;
        
        if (this.outsideWindow()) {
            super.remove();
        }
    }
}