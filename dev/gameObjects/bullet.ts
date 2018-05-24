/// <reference path="./../gameobject.ts" />

class Bullet extends GameObject {
    constructor(obj:GameObject) {
        super(obj.x, obj.y, 'bullet');
    }
}