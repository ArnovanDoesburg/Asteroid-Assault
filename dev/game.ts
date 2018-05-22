class Game {

    private level : Level;
    
    constructor() {
        this.level = new Level(1);
        requestAnimationFrame(() => this.update());
    }

    private update(){
        KeyboardInput.getInstance().inputLoop();
        this.level.update();
        this.draw();
    }

    private draw() {
        this.level.draw();
        requestAnimationFrame(() => this.update());
    }

}