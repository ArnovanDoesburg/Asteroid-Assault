class FastShot implements iShootBehaviour {
    private _cooldown   : number = 0;
    private _ship       : Ship;

    constructor(s:Ship) {
        this._ship = s;
    }

    public shoot() : void {
        if (this._cooldown > 0) {
            return;
        }
        new Bullet(this._ship.x + 20, this._ship.y + 25, this._ship.rotation, 10, 'bulletsingle');
        
        this._cooldown = 11;

        AudioManager.playSound('./../sfx/lasers/sfx_laser1.wav');
    }

    public update() : void {
        if (this._cooldown > 0) {
            this._cooldown -= 1;
        }
    }
}