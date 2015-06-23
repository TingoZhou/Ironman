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

        cc.loader.load(game_resources, function (result, count, loadedCount) {
        }, _.bind(function () {
            this.schedule(_.bind(function () {
                this.addPlist();
//                cc.director.runScene(new cc.TransitionFade(0.1, new GameLoadingScene()));
                cc.director.runScene(new cc.TransitionFade(0.1, new MainLoadingScene()));

            }, this), 0.1, 0);
        }, this));
    },

    initStorage: function () {

        /* 注意 debug 用 ，清除所有localStorage */
        // cc.sys.localStorage.clear();
        // 初始化玩家信息
        /**
         *    score: "score",
         *    electric: "electric",  // 激光
         *    rocket: "rocket",// 导弹
         *    rifle: "rifle",          // 子弹数
         *    bombNum: "bombNum", // 大招数量
         *    freezeNum: "freezeNum", // 冰冻数量
         *    shieldNum: "shieldNum", // 护盾数
         */
        if (ULS.get(USK.PlayInfo) == null) {
            ULS.set(USK.PlayInfo, {
                score: 0,
                electric: 100,    // 激光
                rocket: 100,      // 导弹
                rifle: 100,        // 子弹数
                bombNum: 5,        // 大招数量
                freezeNum: 5,         // 冰冻数量
                shieldNum: 3          // 护盾数
            });
        }


        // 初始化游戏信息
        if (null == ULS.get(USK.GameInfo)) {
            ULS.set(USK.GameInfo, {
                soundVolume: 100,
                musicVolume: 100
            });
        }

        Audio.setMusicVolume(ULS.get(USK.GameInfo).musicVolume);
        Audio.setEffectsVolume(ULS.get(USK.GameInfo).soundVolume);
    },

    addPlist: function () {
        for (var i = 0, m = game_resources.length; i < m; i++) {
            if (game_resources[i].indexOf('.png') > 0) {
                cc.textureCache.addImage(game_resources[i]);
            } else if (game_resources[i].indexOf('.plist') > 0) {
                cc.spriteFrameCache.addSpriteFrames(game_resources[i]);
            }
        }
    }
});
