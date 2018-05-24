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
        this._ships = new Array();
        this._asteroids = new Array();
        this._bullets = new Array();
        this._powerUps = new Array();
        this._bombs = new Array();
        this._pause = false;
        var ship = new Ship();
        this._ships.push(ship);
        var upgrade = new MultiShotUpgrade();
        this._powerUps.push(upgrade);
        this._bomb = new Bomb();
        this._bombs.push(this._bomb);
        for (var i = 0; i < 10; i++) {
            var asteroid = new Asteroid(this._bomb);
            this._asteroids.push(asteroid);
        }
        requestAnimationFrame(function () { return _this.gameLoop(); });
    }
    Game.prototype.togglePause = function () {
        this._pause != this._pause;
    };
    Game.prototype.gameLoop = function () {
        var _this = this;
        if (!this._pause) {
            for (var _i = 0, _a = this._ships; _i < _a.length; _i++) {
                var ship = _a[_i];
                for (var _b = 0, _c = this._asteroids; _b < _c.length; _b++) {
                    var asteroid = _c[_b];
                    var isColliding = ship.hasCollision(asteroid);
                    if (isColliding) {
                        ship.remove(ship, this._ships);
                    }
                }
                for (var _d = 0, _e = this._powerUps; _d < _e.length; _d++) {
                    var powerup = _e[_d];
                    var isColliding = ship.hasCollision(powerup);
                    if (isColliding) {
                        ship.shootBehaviour = new MultiShot(ship);
                        powerup.remove(powerup, this._powerUps);
                    }
                }
                for (var _f = 0, _g = this._bombs; _f < _g.length; _f++) {
                    var bomb = _g[_f];
                    var isColliding = ship.hasCollision(bomb);
                    if (isColliding) {
                        bomb.activate();
                        bomb.remove(bomb, this._bombs);
                    }
                }
                for (var _h = 0, _j = ship.bulletList; _h < _j.length; _h++) {
                    var bullet = _j[_h];
                    for (var _k = 0, _l = this._asteroids; _k < _l.length; _k++) {
                        var asteroid = _l[_k];
                        var isColliding = bullet.hasCollision(asteroid);
                        if (isColliding) {
                            asteroid.remove(asteroid, this._asteroids);
                            bullet.remove(bullet, ship.bulletList);
                        }
                    }
                    bullet.draw();
                    bullet.update();
                }
                ship.update();
                ship.draw();
            }
            for (var _m = 0, _o = this._asteroids; _m < _o.length; _m++) {
                var asteroid = _o[_m];
                asteroid.draw();
                asteroid.update();
            }
            KeyboardInput.getInstance().inputLoop();
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
    new Game();
});
var Asteroid = (function (_super) {
    __extends(Asteroid, _super);
    function Asteroid(s) {
        var _this = _super.call(this, Math.floor((Math.random() * window.innerWidth) + 1), Math.floor((Math.random() * window.innerHeight) + 1), 0, 'asteroid') || this;
        _this._speed = 2;
        _this._speedX = Math.random() < 0.5 ? Math.random() - 1 * 1.5 : Math.random() * 1.5;
        _this._speedY = Math.random() < 0.5 ? Math.random() - 1 * 1.5 : Math.random() * 1.5;
        _this._rotationSpeed = Math.random() * 2;
        s.subscribe(_this);
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
        console.log('biem');
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
    };
    Bomb.prototype.unsubscribe = function (o) {
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
    function Bullet(x, y, rotation, bulletList, tag) {
        var _this = _super.call(this, x, y, rotation, tag) || this;
        _this._speed = 10;
        _this._speedX = 0;
        _this._speedY = 0;
        _this._bulletList = bulletList;
        _this._speedX = _this._speed * Math.cos(rotation / 180 * Math.PI);
        _this._speedY = _this._speed * Math.sin(rotation / 180 * Math.PI);
        return _this;
    }
    Bullet.prototype.update = function () {
        this.x += this._speedX;
        this.y += this._speedY;
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
        this._ship = s;
    }
    MultiShot.prototype.shoot = function () {
        if (this._cooldown > 0) {
            return;
        }
        this._ship.bulletList.push(new Bullet(this._ship.x + 20, this._ship.y + 25, this._ship.rotation, this._ship.bulletList, 'bulletmulti'));
        this._ship.bulletList.push(new Bullet(this._ship.x + 20, this._ship.y + 25, this._ship.rotation + 25, this._ship.bulletList, 'bulletmulti'));
        this._ship.bulletList.push(new Bullet(this._ship.x + 20, this._ship.y + 25, this._ship.rotation - 25, this._ship.bulletList, 'bulletmulti'));
        this._cooldown = 20;
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
        this._ship.bulletList.push(new Bullet(this._ship.x + 20, this._ship.y + 25, this._ship.rotation, this._ship.bulletList, 'bulletsingle'));
        this._cooldown = 10;
    };
    SingleShot.prototype.updateCooldown = function () {
        if (this._cooldown > 0) {
            this._cooldown -= 0.5;
        }
    };
    return SingleShot;
}());
//# sourceMappingURL=main.js.map