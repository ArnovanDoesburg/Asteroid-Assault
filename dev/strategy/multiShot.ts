class MultiShot implements iShootBehaviour {
    private _cooldown   : number = 0;
    private _ship       : Ship;
    private _ammo       : number = 3;

    constructor(s:Ship) {
        this._ship = s;
        var audio = new Audio('./../sfx/sfx_shieldUp.ogg');
        audio.play();
    }

    public shoot() : void {
        if (this._cooldown > 0) {
            return;
        }
        if (this._ammo > 0) {
            this._ship.bulletList.push(new Bullet(this._ship.x + 20, this._ship.y + 25, this._ship.rotation, 0, this._ship.bulletList, 'bulletmulti'));
            this._ship.bulletList.push(new Bullet(this._ship.x + 20, this._ship.y + 25, this._ship.rotation + 25, 0, this._ship.bulletList, 'bulletmulti'));
            this._ship.bulletList.push(new Bullet(this._ship.x + 20, this._ship.y + 25, this._ship.rotation + 50, 0, this._ship.bulletList, 'bulletmulti'));
            this._ship.bulletList.push(new Bullet(this._ship.x + 20, this._ship.y + 25, this._ship.rotation - 50, 0, this._ship.bulletList, 'bulletmulti'));
            this._ship.bulletList.push(new Bullet(this._ship.x + 20, this._ship.y + 25, this._ship.rotation - 25, 0, this._ship.bulletList, 'bulletmulti'));
            this._ammo -= 1;    
            this._cooldown = 15;
            var audio = new Audio('./../sfx/sfx_laser2.ogg');
            audio.play();
        } else {
            this._ship.shootBehaviour = new SingleShot(this._ship);
        }

    }

    public updateCooldown() : void {
        if (this._cooldown > 0) {
            this._cooldown -= 0.5;
        }
    }
}