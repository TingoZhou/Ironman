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