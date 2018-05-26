class AudioManager {
    static playSound(s:string) {
        var audio = new Audio(s);
        audio.play();
    }
}