class Game {
    private _gameManager    : GameManager;
    private _uiManager      : UIManager;
    private _gameIsOver     : boolean;
    private _bomb           : Bomb;
    
    constructor() {

        this._gameManager   = GameManager.getInstance();
        this._uiManager     = UIManager.getInstance();

        this.createLevel(this._uiManager.level);
        this.addPauseListener();

        new AuthorMessage();

        requestAnimationFrame(() => this.gameLoop());
    };

    private addPauseListener() {
        document.addEventListener('keydown', event => {
            if (event.key === 'Escape' || event.keyCode === 27) {
                GameManager.getInstance().togglePause();
            }
        })
    };

    private createLevel (m:number) {
        new Ship();
        new MultiShotUpgrade();
        this._bomb = new Bomb();

        // LEVEL BASED ENEMY AMOUNT
        for (let i = 0; i < m * 3; i++) {
            this._bomb.subscribe(new Asteroid(this._bomb));

        };
    };

    private newLevel() {
        setTimeout(() => {      
            GameManager.getInstance().resetLevel();
            this.createLevel(this._uiManager.level);
        }, 3000);
    };

    private gameLoop() {   

        this._gameManager.loop();

        if (this._gameManager.lose) {

            this._uiManager.createRestartMessage('YOU LOSE!');

            if (!this._gameIsOver) {

                AudioManager.playSound('./../sfx/ui/sfx_lose.wav');
                this._gameIsOver = true;
                this._uiManager.level = 1;
                this.newLevel();

            }
        } else if (this._gameManager.win) {

            this._uiManager.createRestartMessage('YOU WIN!');

            if (!this._gameIsOver) {

                AudioManager.playSound('./../sfx/ui/sfx_win.wav');
                this._gameIsOver = true;
                this._uiManager.level += 1;
                this.newLevel();

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