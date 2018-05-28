///<reference path="./upgrade" />

class MultiShotUpgrade extends Upgrade {

    constructor() {
        super('weaponupgrade');
    }

    public activate(s:Ship) : iShootBehaviour {
        return new MultiShot(s);
    }
}