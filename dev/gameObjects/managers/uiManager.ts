class UIManager {

    private _message : Message;

    constructor() {
        new Message('author', 'made by arno van doesburg');
    }

    public createRestartMessage(content:string) {
        if (!document.querySelector('message')) {
            this._message = new Message('message', content);
            document.body.appendChild(this._message.div);
        }
    }

    public createPauseMessage(content:string) {
        if (!document.querySelector('message')) {
            this._message = new Message('message', content);
            document.body.appendChild(this._message.div);
        }
    }

    public clearMessages() {
        let message = document.querySelector('message');
        
        if (message) {
            message.remove();
        }
    }
}