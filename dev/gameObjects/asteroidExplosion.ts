class AsteroidExplosion {
    constructor(x:number, y:number) {
        for (let i = 0; i < 3; i++) {
            new AsteroidPart(x, y);
        }
    }
}