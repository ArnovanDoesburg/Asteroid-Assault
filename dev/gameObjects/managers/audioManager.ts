class AudioManager {
    
    static explosionFilePath : string = './../sfx/explosions/';
    static playerFilePath : string = './../sfx/player/';

    static explosionSounds : Array<string> = ['sfx_explosion1.wav', 'sfx_explosion2.wav', 'sfx_explosion3.wav', 'sfx_explosion4.wav']
    static playerHitSounds : Array<string> = ['sfx_player_hit1.wav', 'sfx_player_hit2.wav', 'sfx_player_hit3.wav', 'sfx_player_hit4.wav']

    static playSound(s:string) {
        let audio = new Audio(s);
        audio.volume = 0.5;
        audio.play();
    }

    static playRandomExplosionSound() {
        let rand = Math.floor(Math.random() * this.explosionSounds.length);
        this.playSound(this.explosionFilePath+this.explosionSounds[rand]);
    }

    static playRandomPlayerHitSound() {
        let rand = Math.floor(Math.random() * this.playerHitSounds.length);
        this.playSound(this.playerFilePath+this.playerHitSounds[rand]);
    }

    static playPauseSound(b:boolean) {
        if (b) {
            this.playSound('./../sfx/ui/sfx_pause_in.wav');
        } else {
            this.playSound('./../sfx/ui/sfx_pause_out.wav');
        }
    }
}