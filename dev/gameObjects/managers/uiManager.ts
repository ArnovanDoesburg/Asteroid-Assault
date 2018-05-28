class UIManager {

    private _message : Message;

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