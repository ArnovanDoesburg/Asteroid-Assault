class Game {
    private _uiManager      : UIManager;
    private _restarting     : Boolean;
    private _gameManager    : GameManager;
    private _gameIsOver     : boolean;
    private _level          : number = 1;
    
    constructor() {

        this._gameManager = GameManager.getInstance();
        this._uiManager = new UIManager();

        this.createLevel(this._level);

        document.addEventListener('keydown', event => {
            if (event.key === 'Escape' || event.keyCode === 27) {
                GameManager.getInstance().togglePause();
            }
        })

        requestAnimationFrame(() => this.gameLoop());
    }

    private createLevel (m:number) {
        new Ship();

        for (let i = 0; i < m * 3; i++) {
            new Asteroid();
        }

        new MultiShotUpgrade();
    }

    private newLevel() {
        setTimeout(() => {
                    
            GameManager.getInstance().resetLevel();
            this.createLevel(this._level);
        }, 2000);
    }

    private gameLoop() {   

        this._gameManager.loop();

        if (this._gameManager.lose) {

            
            this._uiManager.createRestartMessage('YOU LOSE!');

            if (!this._gameIsOver) {

                this._level = 1;
                AudioManager.playSound('./../sfx/ui/sfx_lose.wav');
                this.newLevel();
                this._gameIsOver = true;

            }
        } else if (this._gameManager.win) {

            this._uiManager.createRestartMessage('YOU WIN!');

            if (!this._gameIsOver) {

                this._level += 1;
                AudioManager.playSound('./../sfx/ui/sfx_win.wav');
                this.newLevel();
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