class Game {
    private _gameManager    : GameManager;
    private _uiManager      : UIManager;
    private _restarting     : Boolean;
    
    constructor() {

        this._gameManager = new GameManager();
        this._uiManager = new UIManager();

        requestAnimationFrame(() => this.gameLoop());
    }

    private resetGame() {
        if (!this._restarting) {
            this._restarting = true;
            setTimeout(() => {
                location.reload();
            }, 3000);
        }
    }

    private gameLoop() {   

        this._gameManager.loop();

        if (this._gameManager.lose) {
            this._uiManager.createRestartMessage('YOU LOSE!');
            this.resetGame();
        } else if (this._gameManager.win) {
            this._uiManager.createRestartMessage('YOU WIN!');
            this.resetGame();
        } else if (this._gameManager.pause) {
            this._uiManager.createPauseMessage('PRESS "ESCAPE" TO UNPAUSE');
        } else {
            this._uiManager.clearMessages();
        }

        requestAnimationFrame(() => this.gameLoop());
    }

}