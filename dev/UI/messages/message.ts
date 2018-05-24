class Message {
    protected _div : HTMLElement;

    constructor(tag:string, content:string) {
        this._div = document.createElement(tag);
        document.body.appendChild(this._div);

        this._div.innerHTML = content;
    }
}