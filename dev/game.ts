class Game {
    private _gameIsOver     : boolean;
    private _bomb           : Bomb;
    
    constructor() {
        this.createLevel(UIManager.getInstance().level);
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
        new FastShotUpgrade();
        this._bomb = new Bomb();

        // LEVEL BASED ENEMY AMOUNT
        for (let i = 0; i < m * 3; i++) {
            this._bomb.subscribe(new Asteroid(this._bomb));

        };
    };

    private newLevel() {
        setTimeout(() => {      
            GameManager.getInstance().resetLevel();
            this.createLevel(UIManager.getInstance().level);
        }, 4000);
    };

    private gameLoop() {   

        GameManager.getInstance().loop();

        if (GameManager.getInstance().lose) {

            if (!this._gameIsOver) {

                setTimeout(() => {
                    UIManager.getInstance().createRestartMessage('YOU LOSE!');
                    AudioManager.playSound('./../sfx/ui/sfx_lose.wav');
                }, 1000);
                this._gameIsOver = true;
                UIManager.getInstance().level = 1;
                this.newLevel();

            }
        } else if (GameManager.getInstance().win) {

            

            if (!this._gameIsOver) {

                setTimeout(() => {
                    UIManager.getInstance().createRestartMessage('YOU WIN!');
                    AudioManager.playSound('./../sfx/ui/sfx_win.wav');
                }, 1000);
                
                this._gameIsOver = true;
                UIManager.getInstance().level += 1;
                this.newLevel();

            }
        } else if (GameManager.getInstance().pause) {
            UIManager.getInstance().createPauseMessage('PRESS "ESCAPE" TO UNPAUSE');
        } else {
            UIManager.getInstance().clearMessages();
            this._gameIsOver = false;
        }
        requestAnimationFrame(() => this.gameLoop());
    }
}