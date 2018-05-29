class UIManager {
    private _score              : number;
    private _message            : Message;
    private static _instance    : UIManager;

    public level                : number = 1;

    public static getInstance() {
        if (!UIManager._instance) {
            UIManager._instance = new UIManager()
            }
        return UIManager._instance
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