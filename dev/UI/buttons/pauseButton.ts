class PauseButton extends Button {
    private _game : Game;

    constructor(g:Game) {
        super('pausebutton');
        this._game = g;
        this._div.innerHTML = "Pause game";
    }

    protected handleClick(event: MouseEvent) : void {
        this._game.togglePause();
    }
}