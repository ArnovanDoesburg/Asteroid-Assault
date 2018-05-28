class Asteroid extends GameObject implements Observer{
    private _speed  : number = 2;
    private _speedX : number = Math.random() < 0.5 ? Math.random() - 1 * 1.5 : Math.random() * 1.5;
    private _speedY : number = Math.random() < 0.5 ? Math.random() - 1 * 1.5 : Math.random() * 1.5;
    
    private _rotationSpeed : number = Math.random()*2;

    private _bombs        : Array<Bomb>;
    private _asteroidList : Array<Asteroid>;

    constructor(s:Array<Bomb>, l:Array<Asteroid>) {
        super(
            Math.floor((Math.random() * window.innerWidth) + window.innerWidth / 2),
            Math.floor((Math.random() * window.innerHeight) + 1), 
            0, 
            'asteroid');

            if (s.length > 0) {
                for (let bomb of s) {
                    bomb.subscribe(this);
                }
            }
           
            this._bombs = s;
            this._asteroidList = l;
    }

    public update() : void {
        this.x += this._speedX;
        this.y += this._speedY;
        this.rotation += this._rotationSpeed;
        super.outsideWindow();
    }

    public notify() {
        this.remove(this, this._asteroidList);
    }

    public remove(obj:GameObject, arr:Array<any>) {
        obj.div.remove();

        for (let bomb of this._bombs) {
            bomb.unsubscribe(this);
        }

        let i:number = arr.indexOf(obj);
        if(i != -1) {
            arr.splice(i, 1);
        }
    }
}