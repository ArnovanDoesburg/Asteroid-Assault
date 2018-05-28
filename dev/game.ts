class Game {
    private _uiManager      : UIManager;
    private _restarting     : Boolean;
    private _gameManager    : GameManager;
    private _gameIsOver     : boolean;
    
    constructor() {

        this._gameManager = GameManager.getInstance();
        this._uiManager = new UIManager();

        this.createLevel(1);

        document.addEventListener('keydown', event => {
            if (event.key === 'Escape' || event.keyCode === 27) {
                GameManager.getInstance().togglePause();
            }
        })

        requestAnimationFrame(() => this.gameLoop());
    }

    private createLevel (m:number) {
        new Ship();
        new Asteroid();
        new MultiShotUpgrade();
    }

    private gameLoop() {   

        this._gameManager.loop();

        if (this._gameManager.lose) {
            this._uiManager.createRestartMessage('YOU LOSE!');

            if (!this._gameIsOver) {
                setTimeout(() => {
                    GameManager.getInstance().resetLevel();
                    this.createLevel(1);
                }, 3000);
                this._gameIsOver = true;
            }
        } else if (this._gameManager.win) {
            this._uiManager.createRestartMessage('YOU WIN!');
            if (!this._gameIsOver) {

                
                setTimeout(() => {
                    GameManager.getInstance().resetLevel();
                    this.createLevel(1);
                }, 3000);
                this._gameIsOver = true;
            }
        } else if (this._gameManager.pause) {
            this._uiManager.createPauseMessage('PRESS "ESCAPE" TO UNPAUSE');
        } else {
            this._uiManager.clearMessages();
            this._gameIsOver = false;
        }

        requestAnimationFrame(() => this.gameLoop());
    }

}