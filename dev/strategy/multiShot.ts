class MultiShot implements iShootBehaviour {
    private _cooldown   : number = 0;
    private _ship       : Ship;
    private _ammo       : number = 3;

    constructor(s:Ship) {
        this._ship = s;
        AudioManager.playSound('./../sfx/sfx_pickup.wav');
    }

    public shoot() : void {
        if (this._cooldown > 0) {
            return;
        }
        if (this._ammo > 0) {
            new Bullet(this._ship.x + 20, this._ship.y + 25, this._ship.rotation, 0, 'bulletmulti');
            new Bullet(this._ship.x + 20, this._ship.y + 25, this._ship.rotation + 25, 0, 'bulletmulti');
            new Bullet(this._ship.x + 20, this._ship.y + 25, this._ship.rotation + 50, 0, 'bulletmulti');
            new Bullet(this._ship.x + 20, this._ship.y + 25, this._ship.rotation - 50, 0, 'bulletmulti');
            new Bullet(this._ship.x + 20, this._ship.y + 25, this._ship.rotation - 25, 0, 'bulletmulti');
            
            this._ammo -= 1;    
            this._cooldown = 15;

            AudioManager.playSound('./../sfx/lasers/sfx_laser2.wav');
        } else {
            this._ship.shootBehaviour = new SingleShot(this._ship);
        }

    }

    public update() : void {
        if (this._cooldown > 0) {
            this._cooldown -= 0.5;
        }
    }
}