class GameManager {
    private _gameObjects : Array<GameObject> = new Array();
    private static _instance    : GameManager;

    public lose        : boolean = false;
    public win         : boolean = false;
    public pause       : boolean = false;

    public static getInstance() {
        if (!GameManager._instance) {
            GameManager._instance = new GameManager()
            }
        return GameManager._instance
    }

    public addGameObject(obj:GameObject) {
        GameManager._instance._gameObjects.push(obj);
    }

    public removeGameObject(obj:GameObject) {
        let i:number = this._gameObjects.indexOf(obj);
        if(i != -1) {
            this._gameObjects.splice(i, 1);
        }
    }

    public resetLevel() {
        this.lose = false;
        this.win = false;

        for( var i = this._gameObjects.length-1; i >= 0; i-- ) {
            this._gameObjects[i].remove();
            }
    }

    public togglePause() {
        if (!this.win && !this.lose) {

            AudioManager.playPauseSound(this.pause);

            this.pause = !this.pause;
        }
    }

    private checkGameStatus() {

            if (!this._gameObjects.some((ship) => ship instanceof Ship)) {
                this.lose = true;
            } else if (!this._gameObjects.some((asteroid) => asteroid instanceof Asteroid)) {
                this.win = true;
            }
    }

    public loop() {

        if (!this.pause) {

            this.checkGameStatus();

            for (let obj of this._gameObjects) {
                for (let otherobj of this._gameObjects){

                    // SHIP COLLISION
                    if (obj instanceof Ship) {
                        if (otherobj instanceof Asteroid) {
                            if (obj.hasCollision(otherobj) && !obj.invincable) {
                                obj.hit();
                            }
                        } else if (otherobj instanceof Upgrade) {
                            if (obj.hasCollision(otherobj)) {
                                obj.shootBehaviour = otherobj.activate(obj);
                                otherobj.remove();
                            }
                        } else if (otherobj instanceof Bomb) {
                            if (obj.hasCollision(otherobj)) {
                                otherobj.notifyObs();
                                otherobj.remove();
                            }
                        }
                    }

                    // BULLET COLLISION
                    if(obj instanceof Bullet) {
                        if (otherobj instanceof Asteroid) {
                            if (obj.hasCollision(otherobj)) {
                                AudioManager.playRandomExplosionSound();
                                otherobj.explode();
                                obj.remove();
                            }
                        }
                    }
                }

                obj.update();
                obj.draw();
            }
            KeyboardInput.getInstance().inputLoop();
        }
    }
}