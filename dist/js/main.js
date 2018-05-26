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
        this._gameManager = new GameManager();
        this._uiManager = new UIManager();
        requestAnimationFrame(function () { return _this.gameLoop(); });
    }
    Game.prototype.resetGame = function () {
        setTimeout(function () {
            location.reload();
        }, 3000);
    };
    Game.prototype.gameLoop = function () {
        var _this = this;
        this._gameManager.loop();
        if (this._gameManager.lose) {
            this._uiManager.createRestartMessage('YOU LOSE!');
            this.resetGame();
        }
        else if (this._gameManager.win) {
            this._uiManager.createRestartMessage('YOU WIN!');
            this.resetGame();
        }
        else if (this._gameManager.pause) {
            this._uiManager.createPauseMessage('PRESS "ESCAPE" TO UNPAUSE');
        }
        else {
            this._uiManager.clearMessages();
        }
        requestAnimationFrame(function () { return _this.gameLoop(); });
    };
    return Game;
}());
var GameManager = (function () {
    function GameManager() {
        var _this = this;
        this._ships = new Array();
        this._asteroids = new Array();
        this._bullets = new Array();
        this._powerUps = new Array();
        this._bombs = new Array();
        this.lose = false;
        this.win = false;
        this.pause = false;
        new Message('author', 'made by arno van doesburg');
        this._ships.push(new Ship());
        this._powerUps.push(new MultiShotUpgrade);
        this._bombs.push(new Bomb());
        for (var i = 0; i < 20; i++) {
            var asteroid = new Asteroid(this._bombs, this._asteroids);
            this._asteroids.push(asteroid);
        }
        document.addEventListener('keydown', function (event) {
            if (event.key === 'Escape' || event.keyCode === 27) {
                _this.togglePause();
            }
        });
    }
    GameManager.prototype.togglePause = function () {
        if (!this.win && !this.lose) {
            this.pause = !this.pause;
            var audio = new Audio('./../sfx/sfx_twotone.ogg');
            audio.play();
        }
    };
    GameManager.prototype.loop = function () {
        var _this = this;
        if (!this.pause) {
            if (this._asteroids.length > 0) {
                if (this._ships.length > 0) {
                    for (var _i = 0, _a = this._ships; _i < _a.length; _i++) {
                        var ship = _a[_i];
                        var _loop_1 = function (bomb) {
                            if (ship.hasCollision(bomb)) {
                                bomb.activate();
                                setTimeout(function () {
                                    bomb.remove(bomb, _this._bombs);
                                }, 100);
                            }
                        };
                        for (var _b = 0, _c = this._bombs; _b < _c.length; _b++) {
                            var bomb = _c[_b];
                            _loop_1(bomb);
                        }
                        for (var _d = 0, _e = this._powerUps; _d < _e.length; _d++) {
                            var powerup = _e[_d];
                            if (ship.hasCollision(powerup)) {
                                ship.shootBehaviour = new MultiShot(ship);
                                powerup.remove(powerup, this._powerUps);
                            }
                        }
                        for (var _f = 0, _g = ship.bulletList; _f < _g.length; _f++) {
                            var bullet = _g[_f];
                            bullet.update();
                            bullet.draw();
                        }
                        for (var _h = 0, _j = this._asteroids; _h < _j.length; _h++) {
                            var asteroid = _j[_h];
                            for (var _k = 0, _l = ship.bulletList; _k < _l.length; _k++) {
                                var bullet = _l[_k];
                                if (bullet.hasCollision(asteroid)) {
                                    asteroid.remove(asteroid, this._asteroids);
                                    bullet.remove(bullet, ship.bulletList);
                                }
                            }
                            if (ship.hasCollision(asteroid)) {
                                ship.remove(ship, this._ships);
                            }
                            asteroid.update();
                            asteroid.draw();
                        }
                        ship.update();
                        ship.draw();
                    }
                    KeyboardInput.getInstance().inputLoop();
                }
                else {
                    if (!this.lose) {
                        this.lose = true;
                        var audio = new Audio('./../sfx/sfx_lose.ogg');
                        audio.play();
                    }
                }
            }
            else {
                if (!this.win) {
                    this.win = true;
                    var audio = new Audio('./../sfx/sfx_win.ogg');
                    audio.play();
                }
            }
        }
    };
    return GameManager;
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
    GameObject.prototype.remove = function (obj, arr) {
        obj.div.remove();
        var i = arr.indexOf(obj);
        if (i != -1) {
            arr.splice(i, 1);
        }
    };
    return GameObject;
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
window.addEventListener("load", function () {
    var game = new Game();
});
var UIManager = (function () {
    function UIManager() {
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
    function Asteroid(s, l) {
        var _this = _super.call(this, Math.floor((Math.random() * window.innerWidth) + window.innerWidth / 2), Math.floor((Math.random() * window.innerHeight) + 1), 0, 'asteroid') || this;
        _this._speed = 2;
        _this._speedX = Math.random() < 0.5 ? Math.random() - 1 * 1.5 : Math.random() * 1.5;
        _this._speedY = Math.random() < 0.5 ? Math.random() - 1 * 1.5 : Math.random() * 1.5;
        _this._rotationSpeed = Math.random() * 2;
        if (s.length > 0) {
            for (var _i = 0, s_1 = s; _i < s_1.length; _i++) {
                var bomb = s_1[_i];
                bomb.subscribe(_this);
            }
        }
        _this._bombs = s;
        _this._asteroidList = l;
        return _this;
    }
    Asteroid.prototype.update = function () {
        this.x += this._speedX;
        this.y += this._speedY;
        this.rotation += this._rotationSpeed;
        this.outsideWindow();
    };
    Asteroid.prototype.outsideWindow = function () {
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
    Asteroid.prototype.notify = function () {
        this.remove(this, this._asteroidList);
        console.log('notify');
    };
    Asteroid.prototype.remove = function (obj, arr) {
        obj.div.remove();
        for (var _i = 0, _a = this._bombs; _i < _a.length; _i++) {
            var bomb = _a[_i];
            bomb.unsubscribe(this);
        }
        var i = arr.indexOf(obj);
        if (i != -1) {
            arr.splice(i, 1);
        }
    };
    return Asteroid;
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
        console.log('subscribed');
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
    function Bullet(x, y, rotation, rotationspeed, bulletList, tag) {
        var _this = _super.call(this, x, y, rotation, tag) || this;
        _this._speed = 10;
        _this._speedX = 0;
        _this._speedY = 0;
        _this._rotationSpeed = rotationspeed;
        _this._bulletList = bulletList;
        _this._speedX = _this._speed * Math.cos(rotation / 180 * Math.PI);
        _this._speedY = _this._speed * Math.sin(rotation / 180 * Math.PI);
        return _this;
    }
    Bullet.prototype.update = function () {
        this.x += this._speedX;
        this.y += this._speedY;
        this.rotation += this._rotationSpeed;
        if (this.outsideWindow()) {
            this.remove(this, this._bulletList);
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
        _this._bulletList = new Array();
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
    Object.defineProperty(Ship.prototype, "bulletList", {
        get: function () { return this._bulletList; },
        enumerable: true,
        configurable: true
    });
    ;
    Ship.prototype.accelerate = function () {
        this.x += this._speed * Math.cos(this.rotation * Math.PI / 180);
        this.y += this._speed * Math.sin(this.rotation * Math.PI / 180);
    };
    Ship.prototype.rotate = function (angle) {
        this.rotation += angle;
    };
    Ship.prototype.outsideWindow = function () {
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
    Ship.prototype.update = function () {
        this._shootBehaviour.updateCooldown();
        this.outsideWindow();
    };
    return Ship;
}(GameObject));
var MultiShotUpgrade = (function (_super) {
    __extends(MultiShotUpgrade, _super);
    function MultiShotUpgrade() {
        return _super.call(this, Math.floor((Math.random() * window.innerWidth) + 1), Math.floor((Math.random() * window.innerHeight) + 1), 0, 'weaponupgrade') || this;
    }
    MultiShotUpgrade.prototype.activate = function (s) {
        return new MultiShot(s);
    };
    return MultiShotUpgrade;
}(GameObject));
var MultiShot = (function () {
    function MultiShot(s) {
        this._cooldown = 0;
        this._ammo = 3;
        this._ship = s;
        var audio = new Audio('./../sfx/sfx_shieldUp.ogg');
        audio.play();
    }
    MultiShot.prototype.shoot = function () {
        if (this._cooldown > 0) {
            return;
        }
        if (this._ammo > 0) {
            this._ship.bulletList.push(new Bullet(this._ship.x + 20, this._ship.y + 25, this._ship.rotation, 0, this._ship.bulletList, 'bulletmulti'));
            this._ship.bulletList.push(new Bullet(this._ship.x + 20, this._ship.y + 25, this._ship.rotation + 25, 0, this._ship.bulletList, 'bulletmulti'));
            this._ship.bulletList.push(new Bullet(this._ship.x + 20, this._ship.y + 25, this._ship.rotation + 50, 0, this._ship.bulletList, 'bulletmulti'));
            this._ship.bulletList.push(new Bullet(this._ship.x + 20, this._ship.y + 25, this._ship.rotation - 50, 0, this._ship.bulletList, 'bulletmulti'));
            this._ship.bulletList.push(new Bullet(this._ship.x + 20, this._ship.y + 25, this._ship.rotation - 25, 0, this._ship.bulletList, 'bulletmulti'));
            this._ammo -= 1;
            this._cooldown = 15;
            var audio = new Audio('./../sfx/sfx_laser2.ogg');
            audio.play();
        }
        else {
            this._ship.shootBehaviour = new SingleShot(this._ship);
        }
    };
    MultiShot.prototype.updateCooldown = function () {
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
        this._ship.bulletList.push(new Bullet(this._ship.x + 20, this._ship.y + 25, this._ship.rotation, 10, this._ship.bulletList, 'bulletsingle'));
        this._cooldown = 11;
        var audio = new Audio('./../sfx/sfx_laser1.ogg');
        audio.play();
    };
    SingleShot.prototype.updateCooldown = function () {
        if (this._cooldown > 0) {
            this._cooldown -= 0.5;
        }
    };
    return SingleShot;
}());
//# sourceMappingURL=main.js.map