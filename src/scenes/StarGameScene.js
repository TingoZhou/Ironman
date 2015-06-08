/**
 * Created with JetBrains WebStorm.
 * User: Caesar
 * Date: 15-6-6
 * Time: 下午3.34
 * To change this template use File | Settings | File Templates.
 */
var StarGameScene = cc.Scene.extend({
    onEnterTransitionDidFinish:function(){
        this._super();
        var layer = new StarGameLayer();
        this.addChild(layer);
    },
    onExitTransitionDidStart:function(){
        cc.eventManager.removeCustomListeners(cc.game.EVENT_HIDE);
        cc.eventManager.removeCustomListeners(cc.game.EVENT_SHOW);
    }
});

var StarGameLayer = cc. Layer.extend({
    ctor:function(){
        this._super();
        this.init();
        this.addListeners();
    },
    init:function(){
        this.widget = ccs.uiReader.widgetFromJsonFile(GameRes.starGameUILayer.j_starGameUILayer);
        this.addChild(this.widget);
        var starGameBtn = ccui.helper.seekWidgetByName(this.widget,"star_bt");
        starGameBtn.addTouchEventListener(function(sender,type){
            if(type == ccui.Widget.TOUCH_ENDED){
                cc.director.runScene(new cc.TransitionFade(0.1,new GameScene()));
            }
            },this
        );

        var backMainScene = ccui.helper.seekWidgetByName(this.widget,"back_bt");
        backMainScene.addTouchEventListener(function(sender,type){
                if(type == ccui.Widget.TOUCH_ENDED){
                    cc.director.runScene(new cc.TransitionFade(0.1,new MainMenuScene()));
                }
            },this
        );
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




