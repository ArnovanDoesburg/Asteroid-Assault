class Asteroid extends GameObject implements Observer{
    private _speed  : number = 2;
    private _speedX : number = Math.random() < 0.5 ? Math.random() - 1 * 1.5 : Math.random() * 1.5;
    private _speedY : number = Math.random() < 0.5 ? Math.random() - 1 * 1.5 : Math.random() * 1.5;
    
    private _rotationSpeed : number = Math.random()*2;

    private _subject : Subject;
    private _asteroidList : Array<Asteroid>;

    constructor(s:Subject, l:Array<Asteroid>) {
        super(
            Math.floor((Math.random() * window.innerWidth) + window.innerWidth / 2),
            Math.floor((Math.random() * window.innerHeight) + 1), 
            0, 
            'asteroid');

            this._subject = s;
            this._asteroidList = l;

            s.subscribe(this);
    }

    public update() : void {
        this.x += this._speedX;
        this.y += this._speedY;
        this.rotation += this._rotationSpeed;
        this.outsideWindow();
    }

    private outsideWindow() {
        if (this.x + this.div.clientWidth < 0) {
            this.x = window.innerWidth;
        }

        if (this.x > window.innerWidth) {
            this.x = 0 - this.div.clientWidth;
        }
        
        if (this.y + this.div.clientHeight < 0) {
            this.y = window.innerHeight;
        }

        if (this.y > window.innerHeight) {
            this.y = 0 - this.div.clientHeight;
        }
    }

    public notify() {
        this.remove(this, this._asteroidList);
        console.log('notify');
    }

    public remove(obj:GameObject, arr:Array<any>) {
        obj.div.remove();
        this._subject.unsubscribe(this);

        let i:number = arr.indexOf(obj);
        if(i != -1) {
            arr.splice(i, 1);
        }
    }
}