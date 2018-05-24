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
        this._ship.bulletList.push(new Bullet(this._ship.x + 20, this._ship.y + 25, this._ship.rotation, this._ship.bulletList, 'bulletsingle'));
        
        this._cooldown = 10;
    }

    public updateCooldown() : void {
        if (this._cooldown > 0) {
            this._cooldown -= 0.5;
        }
    }
}