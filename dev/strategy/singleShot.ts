class SingleShot implements iShootBehaviour {
    private _cooldown   : number = 0;
    private _ship       : Ship;

    constructor(s:Ship) {
        this._ship = s;
    }

    public shoot() : void {
        if (this._cooldown > 0) {
            return;
        }
        this._ship.bulletList.push(new Bullet(this._ship.x + 20, this._ship.y + 25, this._ship.rotation, 10, this._ship.bulletList, 'bulletsingle'));
        
        this._cooldown = 11;

        AudioManager.playSound('./../sfx/sfx_laser1.ogg');

    }

    public updateCooldown() : void {
        if (this._cooldown > 0) {
            this._cooldown -= 0.5;
        }
    }
}