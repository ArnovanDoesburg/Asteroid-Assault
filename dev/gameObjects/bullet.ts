class Bullet extends GameObject {
    private _speed : number = 10;
    private _speedX : number = 0;
    private _speedY : number = 0;

    private _rotationSpeed : number;
    private _bulletList : Array<Bullet>;

    constructor(x:number, y:number, rotation:number, rotationspeed:number, bulletList:Array<Bullet>, tag:string) {
        super(x, y, rotation, tag);

        this._rotationSpeed = rotationspeed;
        this._bulletList = bulletList;
        this._speedX = this._speed * Math.cos(rotation / 180 * Math.PI);
        this._speedY = this._speed * Math.sin(rotation / 180 * Math.PI);
    }

    public update() : void {
        this.x += this._speedX;
        this.y += this._speedY;
        this.rotation += this._rotationSpeed;

        if (this.outsideWindow()) {
            this.remove(this, this._bulletList);
        }
    }

    private outsideWindow() : boolean {
        return(
            this.x > window.innerWidth ||
            this.x + this.width < 0 ||
            this.y > window.innerHeight ||
            this.y + this.height < 0);
    }
}