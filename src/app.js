var AppScene = cc.Scene.extend({
    onEnterTransitionDidFinish: function () {
        this._super();
        var layer = new AppLayer();
        this.addChild(layer);
    }
});

var AppLayer = cc.Layer.extend({
    ctor: function () {
        this._super();
        this.initStorage();

        cc.loader.load(game_resources, function(result, count, loadedCount) {
        }, _.bind(function() {
            this.schedule(function() {
                cc.director.runScene(new cc.TransitionFade(0.1, new GameScene()));
            }, 0.1, 0);
        }, this));
    },

    initStorage: function() {
        // 初始化游戏信息
        if (null == ULS.get(USK.GameInfo)) {
            ULS.set(USK.GameInfo, {
                soundVolume: 100,
                musicVolume: 100
            });
        }

        Audio.setMusicVolume(ULS.get(USK.GameInfo).musicVolume);
        Audio.setEffectsVolume(ULS.get(USK.GameInfo).soundVolume);
    }
});
