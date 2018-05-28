abstract class Upgrade extends GameObject{
    constructor(tag:string) {
        super(Math.floor((Math.random() * window.innerWidth) + 1),
        Math.floor((Math.random() * window.innerHeight) + 1), 
        0, tag);
    }

    abstract activate(s:Ship) : iShootBehaviour;
}