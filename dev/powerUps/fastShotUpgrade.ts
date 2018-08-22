///<reference path="./upgrade" />

class FastShotUpgrade extends Upgrade {

    constructor() {
        super('weaponspeedupgrade');
    }

    public activate(s:Ship) : iShootBehaviour {
        return new FastShot(s);
    }
}