class Ship extends GameObject {
    private _speed          : number = 7;
    private _angle          : number = 5

    private _bulletList     : Array<Bullet> = new Array();
    private _shootBehaviour : iShootBehaviour;

    public set shootBehaviour(value : iShootBehaviour) {this._shootBehaviour = value};
    public get bulletList() : Array<Bullet> {return this._bulletList};

    constructor() {
        super(window.innerWidth / 5, window.innerHeight / 2, 0, 'ship');

        this._shootBehaviour = new SingleShot(this);

        KeyboardInput.getInstance().addKeycodeCallback(37, () => {this.rotate(-this._angle);});
        KeyboardInput.getInstance().addKeycodeCallback(39, () => {this.rotate(+this._angle);});
        KeyboardInput.getInstance().addKeycodeCallback(38, () => {this.accelerate();});
        KeyboardInput.getInstance().addKeycodeCallback(32, () => {this._shootBehaviour.shoot()});
    }

    private accelerate() {
        this.x += this._speed * Math.cos(this.rotation * Math.PI / 180);
        this.y += this._speed * Math.sin(this.rotation * Math.PI / 180);
    }

    private rotate(angle:number) {
        this.rotation += angle;
    }

    private outsideWindow() {
        if (this.x + this.div.clientWidth < 0) {
            this.x = window.innerWidth;
        }

        if (this.x > window.innerWidth) {
            this.x = 0 - this.div.clientWidth;
        }
        
        if (this.y + this.div.clientHeight < 0) {
            this.y = window.innerHeight;
        }

        if (this.y > window.innerHeight) {
            this.y = 0 - this.div.clientHeight;
        }
    }

    public update() {
        this._shootBehaviour.updateCooldown();
        this.outsideWindow();
    }

}