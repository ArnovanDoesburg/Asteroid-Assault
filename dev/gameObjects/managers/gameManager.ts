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

    private togglePause() {
        if (!this.win && !this.lose) {

            AudioManager.playPauseSound(this.pause);

            this.pause = !this.pause;
        }
    }

    public loop() {

        if (!this.pause) {
            for (let obj of this._gameObjects) {
                for (let otherobj of this._gameObjects){

                    // SHIP COLLISION
                    if (obj instanceof Ship) {
                        if (otherobj instanceof Asteroid) {
                            if (obj.hasCollision(otherobj) && !obj.invincable) {
                                obj.hit();
                            }
                        }
                    }

                    // BULLET COLLISION
                    if(obj instanceof Bullet) {
                        if (otherobj instanceof Asteroid) {
                            if (obj.hasCollision(otherobj)) {
                                obj.remove();
                                otherobj.remove();
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