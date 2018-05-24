class Button {
    protected _div : HTMLElement;

    constructor(tag:string) {
        this._div = document.createElement(tag);
        document.body.appendChild(this._div);
        this._div.addEventListener("click", (e:MouseEvent) => this.handleClick(e));
    }

    protected handleClick(event: MouseEvent) : void {
        
    }
}