/**
 * Created with JetBrains WebStorm.
 * User: Tingo
 * Date: 15-5-28
 * Time: 下午2:31
 * To change this template use File | Settings | File Templates.
 */
var MainMenuScene = cc.Scene.extend({
    onEnterTransitionDidFinish: function () {
        this._super();
        var layer = new MainMenuLayer();
        this.addChild(layer);
    },

    onExitTransitionDidStart: function () {
        cc.eventManager.removeCustomListeners(cc.game.EVENT_HIDE);
        cc.eventManager.removeCustomListeners(cc.game.EVENT_SHOW);
    }

});

var MainMenuLayer = cc.Layer.extend({
    ctor: function () {
        this._super();

        this.init();
        this.addListeners();
    },

    init: function () {

        this.initImages();
        this.initButtons();
    },

    initImages: function () {
        var size = cc.winSize;
        var mainMenuScenebg = new cc.Sprite("#mainMenu_Bg.png");
        this.addChild(mainMenuScenebg);
        mainMenuScenebg.attr({
            x: size.width * 0.5,
            y: size.height * 0.5
        });
    },

    initButtons: function () {
        this.initSoundBt();
        this.initStarGameBt();
    },

    initStarGameBt: function () {
        var size = cc.winSize;
        var button = new ButtonNoEdg("mainMenu_startBt.png");
        button.attr({
            x: size.width * 0.55,
            y: size.height * 0.15
        });
        this.addChild(button);

        button.onTouchBegan = function (touch, type) {
            cc.director.runScene(new cc.TransitionFade(0.1, new GameLoadingScene()));
        }

        button.onTouchEnded = function (touch, type) {
            cc.eventManager.dispatchCustomEvent(SC.CHARACTER_RESET_WEAPON);
        }
    },

    initSoundBt: function () {
        var size = cc.winSize;
        var button = new ButtonNoEdg("mainMenu_soundBt.png");
        button.attr({
            x: size.width * 0.90,
            y: size.height * 0.15
        });
        this.addChild(button);
    },

    addListeners: function () {
        // 进入后台
        cc.eventManager.addCustomListener(cc.game.EVENT_HIDE, _.bind(function () {
            if (!cc.director.isPaused()) {
                cc.director.pause();
            }
        }, this));
        // 返回
        cc.eventManager.addCustomListener(cc.game.EVENT_SHOW, _.bind(function () {
            if (cc.director.isPaused()) {
                cc.director.resume();
            }
        }, this));
    }
});