var Audio = {
    currentMusic                 : '',
    forever                      : false,
    enabled                      : true,
    isPlayingMusic               : false,

    playEffect: function (url, loop) {
        if (this.enabled) {
            return cc.audioEngine.playEffect(url, loop);
        } else {
            return null;
        }
    },

    playMusic: function (url, forever) {
        this.stopMusic();
        if (this.enabled && (this.currentMusic != url || !this.isPlayingMusic)) {
            this.isPlayingMusic = true;
            cc.audioEngine.playMusic(url, forever);
        }
        this.forever = forever;
        this.currentMusic = url;
    },

    stopMusic: function () {
        if (this.enabled) {
            cc.audioEngine.stopMusic();
            this.isPlayingMusic = false;
        }
        this.currentMusic = '';
    },

    stopAllEffects: function () {
        if (this.enabled) {
            cc.audioEngine.stopAllEffects();
        }
    },

    stopEffect: function (effectId) {
        cc.audioEngine.stopEffect(effectId);
    },

    soundEnable: function () {
        var gameInfo = ULS.get(USK.GameInfo);
        gameInfo.SoundEnable = UM.Sound.Enable;
        ULS.set(USK.GameInfo, gameInfo);
        this.enabled = true;
        if (this.currentMusic && this.forever) {
            this.playMusic(this.currentMusic, this.forever);
        }
    },

    soundDisable: function () {
        var gameInfo = ULS.get(USK.GameInfo);
        gameInfo.SoundEnable = UM.Sound.Disable;
        ULS.set(USK.GameInfo, gameInfo);
        this.enabled = false;
        this.isPlayingMusic = false;
        cc.audioEngine.stopMusic();
        cc.audioEngine.stopAllEffects();
    },

    setMusicVolume: function(percent) {
        cc.audioEngine.setMusicVolume(percent);
        var gameInfo = ULS.get(USK.GameInfo);
        gameInfo.musicVolume = percent;
        ULS.set(USK.GameInfo, gameInfo);
    },

    getMusicVolume: function() {
        return cc.audioEngine.getMusicVolume();
    },

    setEffectsVolume: function(percent) {
        cc.audioEngine.setEffectsVolume(percent);
        var gameInfo = ULS.get(USK.GameInfo);
        gameInfo.soundVolume = percent;
        ULS.set(USK.GameInfo, gameInfo);
    },

    getEffectsVolume: function() {
        return cc.audioEngine.getEffectsVolume();
    }
};