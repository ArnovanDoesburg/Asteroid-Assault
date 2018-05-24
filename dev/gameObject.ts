class GameObject {
    private _x          : number = 0;
    private _y          : number = 0;
    private _rotation   : number = 0;
    private _width      : number = 0;
    private _height     : number = 0;
    private _div        : HTMLElement;

    public get x() : number             {return this._x};
    public set x(value : number)        {this._x = value};

    public get y() : number             {return this._y};
    public set y(value : number)        {this._y = value};

    public get rotation() : number             {return this._rotation};
    public set rotation(value : number)        {this._rotation = value};

    public get width() : number         {return this._width};
    public set width(value : number)    {this._width = value};

    public get height() : number        {return this._height};
    public set height(value : number)   {this._height = value};

    public get div() : HTMLElement      {return this._div};
    public set div(value : HTMLElement) {this._div = value};

    constructor(x:number, y:number, rotation:number, tag:string) {
        this._x = x;
        this._y = y;
        this._rotation = rotation;

        this._div = document.createElement(tag);
        document.body.appendChild(this._div);

        this._width  = this._div.clientWidth;
        this._height = this._div.clientHeight;

        this.draw();
    }

    public update() : void {

    }

    public draw() : void {
        this._div.style.transform = "translate("+this.x+"px, "+this.y+"px) rotate("+this.rotation+"deg)";
    }

    public hasCollision(obj:GameObject) : boolean {
        return (this.x < obj.x + obj.width &&
                this.x + this.width > obj.x &&
                this.y < obj.y + obj.height &&
                this.y + this.height > obj.y);
    }

    public remove(obj:GameObject, arr:Array<any>) {
        obj.div.remove();
        
        let i:number = arr.indexOf(obj);
        if(i != -1) {
            arr.splice(i, 1);
        }
    }
}