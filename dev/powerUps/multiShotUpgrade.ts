class MultiShotUpgrade extends GameObject implements iUpgrade {

    constructor() {
        super(
            Math.floor((Math.random() * window.innerWidth) + 1),
            Math.floor((Math.random() * window.innerHeight) + 1), 
            0, 
            'weaponupgrade');
    }

    public activate(s:Ship) : iShootBehaviour {
        return new MultiShot(s);
    }
}