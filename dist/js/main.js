var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var Game = (function () {
    function Game() {
        var _this = this;
        this._level = 1;
        this._gameManager = GameManager.getInstance();
        this._uiManager = new UIManager();
        this.createLevel(this._level);
        document.addEventListener('keydown', function (event) {
            if (event.key === 'Escape' || event.keyCode === 27) {
                GameManager.getInstance().togglePause();
            }
        });
        requestAnimationFrame(function () { return _this.gameLoop(); });
    }
    Game.prototype.createLevel = function (m) {
        new Ship();
        for (var i = 0; i < m * 3; i++) {
            new Asteroid();
        }
        new MultiShotUpgrade();
    };
    Game.prototype.newLevel = function () {
        var _this = this;
        setTimeout(function () {
            GameManager.getInstance().resetLevel();
            _this.createLevel(_this._level);
        }, 2000);
    };
    Game.prototype.gameLoop = function () {
        var _this = this;
        this._gameManager.loop();
        if (this._gameManager.lose) {
            this._uiManager.createRestartMessage('YOU LOSE!');
            if (!this._gameIsOver) {
                this._level = 1;
                AudioManager.playSound('./../sfx/ui/sfx_lose.wav');
                this.newLevel();
                this._gameIsOver = true;
            }
        }
        else if (this._gameManager.win) {
            this._uiManager.createRestartMessage('YOU WIN!');
            if (!this._gameIsOver) {
                this._level += 1;
                AudioManager.playSound('./../sfx/ui/sfx_win.wav');
                this.newLevel();
                this._gameIsOver = true;
            }
        }
        else if (this._gameManager.pause) {
            this._uiManager.createPauseMessage('PRESS "ESCAPE" TO UNPAUSE');
        }
        else {
            this._uiManager.clearMessages();
            this._gameIsOver = false;
        }
        requestAnimationFrame(function () { return _this.gameLoop(); });
    };
    return Game;
}());
var GameObject = (function () {
    function GameObject(x, y, rotation, tag) {
        this._x = 0;
        this._y = 0;
        this._rotation = 0;
        this._width = 0;
        this._height = 0;
        this._x = x;
        this._y = y;
        this._rotation = rotation;
        this._div = document.createElement(tag);
        document.body.appendChild(this._div);
        this._width = this._div.clientWidth;
        this._height = this._div.clientHeight;
        GameManager.getInstance().addGameObject(this);
        this.draw();
    }
    Object.defineProperty(GameObject.prototype, "x", {
        get: function () { return this._x; },
        set: function (value) { this._x = value; },
        enumerable: true,
        configurable: true
    });
    ;
    ;
    Object.defineProperty(GameObject.prototype, "y", {
        get: function () { return this._y; },
        set: function (value) { this._y = value; },
        enumerable: true,
        configurable: true
    });
    ;
    ;
    Object.defineProperty(GameObject.prototype, "rotation", {
        get: function () { return this._rotation; },
        set: function (value) { this._rotation = value; },
        enumerable: true,
        configurable: true
    });
    ;
    ;
    Object.defineProperty(GameObject.prototype, "width", {
        get: function () { return this._width; },
        set: function (value) { this._width = value; },
        enumerable: true,
        configurable: true
    });
    ;
    ;
    Object.defineProperty(GameObject.prototype, "height", {
        get: function () { return this._height; },
        set: function (value) { this._height = value; },
        enumerable: true,
        configurable: true
    });
    ;
    ;
    Object.defineProperty(GameObject.prototype, "div", {
        get: function () { return this._div; },
        set: function (value) { this._div = value; },
        enumerable: true,
        configurable: true
    });
    ;
    ;
    GameObject.prototype.update = function () {
    };
    GameObject.prototype.draw = function () {
        this._div.style.transform = "translate(" + this.x + "px, " + this.y + "px) rotate(" + this.rotation + "deg)";
    };
    GameObject.prototype.hasCollision = function (obj) {
        return (this.x < obj.x + obj.width &&
            this.x + this.width > obj.x &&
            this.y < obj.y + obj.height &&
            this.y + this.height > obj.y);
    };
    GameObject.prototype.outsideWindow = function () {
        if (this.x + this.div.clientWidth < 0) {
            this.x = window.innerWidth;
        }
        if (this.x > window.innerWidth) {
            this.x = 0 - this.div.clientWidth;
        }
        if (this.y + this.div.clientHeight < 0) {
            this.y = window.innerHeight;
        }
        if (this.y > window.innerHeight) {
            this.y = 0 - this.div.clientHeight;
        }
    };
    GameObject.prototype.remove = function () {
        GameManager.getInstance().removeGameObject(this);
        this.div.remove();
    };
    return GameObject;
}());
window.addEventListener("load", function () {
    var game = new Game();
});
var Message = (function () {
    function Message(tag, content) {
        this._div = document.createElement(tag);
        document.body.appendChild(this._div);
        this._div.innerHTML = content;
    }
    Object.defineProperty(Message.prototype, "div", {
        get: function () { return this._div; },
        enumerable: true,
        configurable: true
    });
    return Message;
}());
var Asteroid = (function (_super) {
    __extends(Asteroid, _super);
    function Asteroid() {
        var _this = _super.call(this, Math.floor((Math.random() * window.innerWidth) + window.innerWidth / 2), Math.floor((Math.random() * window.innerHeight) + 1), 0, 'asteroid') || this;
        _this._speedX = Math.random() < 0.5 ? Math.random() - 1 * 1.5 : Math.random() * 1.5;
        _this._speedY = Math.random() < 0.5 ? Math.random() - 1 * 1.5 : Math.random() * 1.5;
        _this._rotationSpeed = Math.random() * 2;
        return _this;
    }
    Asteroid.prototype.update = function () {
        this.x += this._speedX;
        this.y += this._speedY;
        this.rotation += this._rotationSpeed;
        _super.prototype.outsideWindow.call(this);
    };
    Asteroid.prototype.notify = function () {
    };
    Asteroid.prototype.explode = function () {
        new AsteroidExplosion(this.x, this.y);
    };
    return Asteroid;
}(GameObject));
var AsteroidExplosion = (function () {
    function AsteroidExplosion(x, y) {
        for (var i = 0; i < 3; i++) {
            new AsteroidPart(x, y);
        }
    }
    return AsteroidExplosion;
}());
var AsteroidPart = (function (_super) {
    __extends(AsteroidPart, _super);
    function AsteroidPart(x, y) {
        var _this = _super.call(this, x, y, 1, 'asteroidpart') || this;
        _this._speedX = Math.random() < 0.5 ? Math.random() - 1 * 1.5 : Math.random() * 1.5;
        _this._speedY = Math.random() < 0.5 ? Math.random() - 1 * 1.5 : Math.random() * 1.5;
        _this._rotationSpeed = Math.random() * 7;
        return _this;
    }
    AsteroidPart.prototype.outsideWindow = function () {
        return (this.x > window.innerWidth ||
            this.x + this.width < 0 ||
            this.y > window.innerHeight ||
            this.y + this.height < 0);
    };
    AsteroidPart.prototype.update = function () {
        this.x += this._speedX;
        this.y += this._speedY;
        this.rotation += this._rotationSpeed;
        if (this.outsideWindow()) {
            _super.prototype.remove.call(this);
        }
    };
    return AsteroidPart;
}(GameObject));
var Bomb = (function (_super) {
    __extends(Bomb, _super);
    function Bomb() {
        var _this = _super.call(this, Math.floor((Math.random() * window.innerWidth) + 1), Math.floor((Math.random() * window.innerHeight) + 1), 0, 'bomb') || this;
        _this.observers = new Array();
        return _this;
    }
    Bomb.prototype.subscribe = function (o) {
        this.observers.push(o);
    };
    Bomb.prototype.unsubscribe = function (o) {
        var i = this.observers.indexOf(o);
        if (i != -1) {
            this.observers.splice(i, 1);
        }
    };
    Bomb.prototype.activate = function () {
        for (var _i = 0, _a = this.observers; _i < _a.length; _i++) {
            var o = _a[_i];
            o.notify();
        }
    };
    return Bomb;
}(GameObject));
var Bullet = (function (_super) {
    __extends(Bullet, _super);
    function Bullet(x, y, rotation, rotationspeed, tag) {
        var _this = _super.call(this, x, y, rotation, tag) || this;
        _this._speed = 10;
        _this._speedX = 0;
        _this._speedY = 0;
        _this._rotationSpeed = rotationspeed;
        _this._speedX = _this._speed * Math.cos(rotation / 180 * Math.PI);
        _this._speedY = _this._speed * Math.sin(rotation / 180 * Math.PI);
        return _this;
    }
    Bullet.prototype.update = function () {
        this.x += this._speedX;
        this.y += this._speedY;
        this.rotation += this._rotationSpeed;
        if (this.outsideWindow()) {
            _super.prototype.remove.call(this);
        }
    };
    Bullet.prototype.outsideWindow = function () {
        return (this.x > window.innerWidth ||
            this.x + this.width < 0 ||
            this.y > window.innerHeight ||
            this.y + this.height < 0);
    };
    return Bullet;
}(GameObject));
var Ship = (function (_super) {
    __extends(Ship, _super);
    function Ship() {
        var _this = _super.call(this, window.innerWidth / 5, window.innerHeight / 2, 0, 'ship') || this;
        _this._speed = 7;
        _this._angle = 5;
        _this._lives = 2;
        _this._invincible = false;
        _this._shootBehaviour = new SingleShot(_this);
        KeyboardInput.getInstance().addKeycodeCallback(37, function () { _this.rotate(-_this._angle); });
        KeyboardInput.getInstance().addKeycodeCallback(39, function () { _this.rotate(+_this._angle); });
        KeyboardInput.getInstance().addKeycodeCallback(38, function () { _this.accelerate(); });
        KeyboardInput.getInstance().addKeycodeCallback(32, function () { _this._shootBehaviour.shoot(); });
        return _this;
    }
    Object.defineProperty(Ship.prototype, "shootBehaviour", {
        set: function (value) { this._shootBehaviour = value; },
        enumerable: true,
        configurable: true
    });
    ;
    Object.defineProperty(Ship.prototype, "invincable", {
        get: function () { return this._invincible; },
        enumerable: true,
        configurable: true
    });
    ;
    Ship.prototype.hit = function () {
        if (this._lives < 1) {
            AudioManager.playRandomExplosionSound();
            GameManager.getInstance().removeGameObject(this);
            _super.prototype.remove.call(this);
        }
        else {
            this.respawn();
            this._lives -= 1;
            AudioManager.playRandomPlayerHitSound();
        }
    };
    Ship.prototype.respawn = function () {
        var _this = this;
        this._invincible = true;
        this.div.classList.add('invincible');
        setTimeout(function () {
            _this._invincible = false;
            _this.div.classList.remove('invincible');
        }, 2000);
    };
    Ship.prototype.accelerate = function () {
        this.x += this._speed * Math.cos(this.rotation * Math.PI / 180);
        this.y += this._speed * Math.sin(this.rotation * Math.PI / 180);
    };
    Ship.prototype.rotate = function (angle) {
        this.rotation += angle;
    };
    Ship.prototype.update = function () {
        this._shootBehaviour.update();
        _super.prototype.outsideWindow.call(this);
    };
    return Ship;
}(GameObject));
var AudioManager = (function () {
    function AudioManager() {
    }
    AudioManager.playSound = function (s) {
        var audio = new Audio(s);
        audio.volume = 0.5;
        audio.play();
    };
    AudioManager.playRandomExplosionSound = function () {
        var rand = Math.floor(Math.random() * this.explosionSounds.length);
        this.playSound(this.explosionFilePath + this.explosionSounds[rand]);
    };
    AudioManager.playRandomPlayerHitSound = function () {
        var rand = Math.floor(Math.random() * this.playerHitSounds.length);
        this.playSound(this.playerFilePath + this.playerHitSounds[rand]);
    };
    AudioManager.playPauseSound = function (b) {
        if (b) {
            this.playSound('./../sfx/ui/sfx_pause_in.wav');
        }
        else {
            this.playSound('./../sfx/ui/sfx_pause_out.wav');
        }
    };
    AudioManager.explosionFilePath = './../sfx/explosions/';
    AudioManager.playerFilePath = './../sfx/player/';
    AudioManager.explosionSounds = ['sfx_explosion1.wav', 'sfx_explosion2.wav', 'sfx_explosion3.wav', 'sfx_explosion4.wav'];
    AudioManager.playerHitSounds = ['sfx_player_hit1.wav', 'sfx_player_hit2.wav', 'sfx_player_hit3.wav', 'sfx_player_hit4.wav'];
    return AudioManager;
}());
var GameManager = (function () {
    function GameManager() {
        this._gameObjects = new Array();
        this.lose = false;
        this.win = false;
        this.pause = false;
    }
    GameManager.getInstance = function () {
        if (!GameManager._instance) {
            GameManager._instance = new GameManager();
        }
        return GameManager._instance;
    };
    GameManager.prototype.addGameObject = function (obj) {
        GameManager._instance._gameObjects.push(obj);
    };
    GameManager.prototype.removeGameObject = function (obj) {
        var i = this._gameObjects.indexOf(obj);
        if (i != -1) {
            this._gameObjects.splice(i, 1);
        }
    };
    GameManager.prototype.resetLevel = function () {
        this.lose = false;
        this.win = false;
        for (var i = this._gameObjects.length - 1; i >= 0; i--) {
            this._gameObjects[i].remove();
        }
    };
    GameManager.prototype.togglePause = function () {
        if (!this.win && !this.lose) {
            AudioManager.playPauseSound(this.pause);
            this.pause = !this.pause;
        }
    };
    GameManager.prototype.checkGameStatus = function () {
        if (!this._gameObjects.some(function (ship) { return ship instanceof Ship; })) {
            this.lose = true;
        }
        else if (!this._gameObjects.some(function (asteroid) { return asteroid instanceof Asteroid; })) {
            this.win = true;
        }
    };
    GameManager.prototype.loop = function () {
        if (!this.pause) {
            this.checkGameStatus();
            for (var _i = 0, _a = this._gameObjects; _i < _a.length; _i++) {
                var obj = _a[_i];
                for (var _b = 0, _c = this._gameObjects; _b < _c.length; _b++) {
                    var otherobj = _c[_b];
                    if (obj instanceof Ship) {
                        if (otherobj instanceof Asteroid) {
                            if (obj.hasCollision(otherobj) && !obj.invincable) {
                                obj.hit();
                            }
                        }
                        else if (otherobj instanceof Upgrade) {
                            if (obj.hasCollision(otherobj)) {
                                obj.shootBehaviour = otherobj.activate(obj);
                                otherobj.remove();
                            }
                        }
                    }
                    if (obj instanceof Bullet) {
                        if (otherobj instanceof Asteroid) {
                            if (obj.hasCollision(otherobj)) {
                                AudioManager.playRandomExplosionSound();
                                otherobj.explode();
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
    };
    return GameManager;
}());
var KeyboardInput = (function () {
    function KeyboardInput() {
        var _this = this;
        this.keyCallback = {};
        this.keyDown = {};
        this.keyboardDown = function (event) {
            event.preventDefault();
            _this.keyDown[event.keyCode] = true;
        };
        this.keyboardUp = function (event) {
            _this.keyDown[event.keyCode] = false;
        };
        this.addKeycodeCallback = function (keycode, f) {
            _this.keyCallback[keycode] = f;
            _this.keyDown[keycode] = false;
        };
        this.inputLoop = function () {
            for (var key in _this.keyDown) {
                var is_down = _this.keyDown[key];
                if (is_down) {
                    var callback = _this.keyCallback[key];
                    if (callback != null) {
                        callback();
                    }
                }
            }
        };
        document.addEventListener('keydown', this.keyboardDown);
        document.addEventListener('keyup', this.keyboardUp);
    }
    KeyboardInput.getInstance = function () {
        if (!KeyboardInput._instance) {
            KeyboardInput._instance = new KeyboardInput();
        }
        return KeyboardInput._instance;
    };
    return KeyboardInput;
}());
var UIManager = (function () {
    function UIManager() {
        new Message('author', 'made by arno van doesburg');
    }
    UIManager.prototype.createRestartMessage = function (content) {
        if (!document.querySelector('message')) {
            this._message = new Message('message', content);
            document.body.appendChild(this._message.div);
        }
    };
    UIManager.prototype.createPauseMessage = function (content) {
        if (!document.querySelector('message')) {
            this._message = new Message('message', content);
            document.body.appendChild(this._message.div);
        }
    };
    UIManager.prototype.clearMessages = function () {
        var message = document.querySelector('message');
        if (message) {
            message.remove();
        }
    };
    return UIManager;
}());
var Upgrade = (function (_super) {
    __extends(Upgrade, _super);
    function Upgrade(tag) {
        return _super.call(this, Math.floor((Math.random() * window.innerWidth) + 1), Math.floor((Math.random() * window.innerHeight) + 1), 0, tag) || this;
    }
    return Upgrade;
}(GameObject));
var MultiShotUpgrade = (function (_super) {
    __extends(MultiShotUpgrade, _super);
    function MultiShotUpgrade() {
        return _super.call(this, 'weaponupgrade') || this;
    }
    MultiShotUpgrade.prototype.activate = function (s) {
        return new MultiShot(s);
    };
    return MultiShotUpgrade;
}(Upgrade));
var MultiShot = (function () {
    function MultiShot(s) {
        this._cooldown = 0;
        this._ammo = 3;
        this._ship = s;
        AudioManager.playSound('./../sfx/sfx_shieldUp.ogg');
    }
    MultiShot.prototype.shoot = function () {
        if (this._cooldown > 0) {
            return;
        }
        if (this._ammo > 0) {
            new Bullet(this._ship.x + 20, this._ship.y + 25, this._ship.rotation, 0, 'bulletmulti');
            new Bullet(this._ship.x + 20, this._ship.y + 25, this._ship.rotation + 25, 0, 'bulletmulti');
            new Bullet(this._ship.x + 20, this._ship.y + 25, this._ship.rotation + 50, 0, 'bulletmulti');
            new Bullet(this._ship.x + 20, this._ship.y + 25, this._ship.rotation - 50, 0, 'bulletmulti');
            new Bullet(this._ship.x + 20, this._ship.y + 25, this._ship.rotation - 25, 0, 'bulletmulti');
            this._ammo -= 1;
            this._cooldown = 15;
            AudioManager.playSound('./../sfx/lasers/sfx_laser2.wav');
        }
        else {
            this._ship.shootBehaviour = new SingleShot(this._ship);
        }
    };
    MultiShot.prototype.update = function () {
        if (this._cooldown > 0) {
            this._cooldown -= 0.5;
        }
    };
    return MultiShot;
}());
var SingleShot = (function () {
    function SingleShot(s) {
        this._cooldown = 0;
        this._ship = s;
    }
    SingleShot.prototype.shoot = function () {
        if (this._cooldown > 0) {
            return;
        }
        new Bullet(this._ship.x + 20, this._ship.y + 25, this._ship.rotation, 10, 'bulletsingle');
        this._cooldown = 11;
        AudioManager.playSound('./../sfx/lasers/sfx_laser1.wav');
    };
    SingleShot.prototype.update = function () {
        if (this._cooldown > 0) {
            this._cooldown -= 0.5;
        }
    };
    return SingleShot;
}());
//# sourceMappingURL=main.js.map