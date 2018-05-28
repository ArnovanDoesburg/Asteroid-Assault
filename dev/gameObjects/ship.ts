class Ship extends GameObject {
    private _speed          : number = 7;
    private _angle          : number = 5;
    private _lives          : number = 3;
    private _invincible     : boolean = false;

    // Ship met eigen bulletlist?

    private _bulletList     : Array<Bullet> = new Array();
    private _shootBehaviour : iShootBehaviour;

    public set shootBehaviour(value : iShootBehaviour) {this._shootBehaviour = value};
    public get bulletList() : Array<Bullet> {return this._bulletList};
    public get invincable() : boolean {return this._invincible};

    constructor() {
        super(window.innerWidth / 5, window.innerHeight / 2, 0, 'ship');

        this._shootBehaviour = new SingleShot(this);

        KeyboardInput.getInstance().addKeycodeCallback(37, () => {this.rotate(-this._angle);});
        KeyboardInput.getInstance().addKeycodeCallback(39, () => {this.rotate(+this._angle);});
        KeyboardInput.getInstance().addKeycodeCallback(38, () => {this.accelerate();});
        KeyboardInput.getInstance().addKeycodeCallback(32, () => {this._shootBehaviour.shoot()});
    }

    public die(l:Array<Ship>) {
        if (this._lives < 1) {
            super.remove(this, l);
        } else {
            this.respawn();
            this._lives -= 1;
        }
    }

    private respawn() {
        this._invincible = true;
        this.div.classList.add('invincible');
        setTimeout(() => {
            this._invincible = false;
            this.div.classList.remove('invincible');
        }, 2000);
    }

    private accelerate() {
        this.x += this._speed * Math.cos(this.rotation * Math.PI / 180);
        this.y += this._speed * Math.sin(this.rotation * Math.PI / 180);
    }

    private rotate(angle:number) {
        this.rotation += angle;
    }

    public update() {
        this._shootBehaviour.updateCooldown();
        super.outsideWindow();
    }

}