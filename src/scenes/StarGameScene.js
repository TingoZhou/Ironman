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
        this.init();
    },

    init:function(){
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
      //  this.addListeners();
    },
    init:function() {
        this.initImages();
        this._initStar();
        this.initButtons();
    },

    initImages:function(){
        var size = cc.winSize;
        var bg = new cc.Sprite("#bg.png");
        this.addChild(bg);
        bg.attr({
                x:size.width*0.50,
                y:size.height*0.50
        });

        //---------------------------------------------------------------需要删除的代码 by Caesar
      /*  var starBg = new cc.Sprite("#starBg.png");
        this.addChild(starBg);
        starBg.attr({
            x:size.width*0.21,
            y:size.height*0.90
        });

        var star = new cc.Sprite("#star.png");
        this.addChild(star);
        star.attr({
            x:size.width*0.07,
            y:size.height*0.91
        });*/
        //-------------------------------------------------------------------------删除结束------------



    },
    //+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++需要添加的代码++++by Caesar
    _initStar: function () {
        var size = cc.winSize;
        var starBg = new cc.Sprite("#starBg.png");
        this.addChild(starBg);
        starBg.attr({
            x: size.width * 0.21,
            y: size.height * 0.92,
            scaleY: 0.9
        });

        var star = new cc.Sprite("#star.png");
        this.addChild(star);
        star.attr({
            x: size.width * 0.07,
            y: size.height * 0.93
        });

        var str = ULS.get(USK.PlayInfo).score;

        var starnumber = new cc.LabelBMFont(str.toString(), MainRes.customFont.customBMFont_2_fnt);
        starnumber.setScale(.9);
        starnumber.setPosition(cc.p(star.x + 85, star.y+5));
        this.addChild(starnumber);

    },
    //++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
    initButtons:function(){
        this.initBackBt();
        this.initBoxHomeBt();
        this.initMusicBt();
        this.initStarFightingBt();
        this.initUserFilesBt();
    },

    initBackBt:function(){
        var size = cc.winSize;
        var button = new ButtonNoEdg("backBt.png");
        button.attr({
            x:size.width*0.10,
            y:size.height*0.12
        });
        this.addChild(button);

        button.onTouchBegan = function (touch, type) {
            cc.director.runScene(new cc.TransitionFade(0.1,new MainMenuScene()));
        }

        button.onTouchEnded = function (touch, type) {
            //cc.eventManager.dispatchCustomEvent(SC.CHARACTER_RESET_WEAPON);
        }
    },

    initMusicBt:function(){
        var size = cc.winSize;
        var button = new ButtonNoEdg("musicBt.png");
        button.attr({
            x:size.width*0.90,
            y:size.height*0.12
        });
        this.addChild(button);
    },

    initStarFightingBt:function(){
        var size = cc.winSize;
        var button = new ButtonNoEdg("starFightingBt.png");
        button.attr({
            x:size.width*0.75,
            y:size.height*0.50
        });
        this.addChild(button);

        button.onTouchBegan = function (touch, type) {
            cc.director.runScene(new cc.TransitionFade(0.1,new GameScene()));
        }

        button.onTouchEnded = function (touch, type) {
            //cc.eventManager.dispatchCustomEvent(SC.CHARACTER_RESET_WEAPON);
        }
    },

    initUserFilesBt:function(){
        var size = cc.winSize;
        var button = new ButtonNoEdg("userFilesBt.png");
        button.attr({
            x:size.width*0.25,
            y:size.height*0.50
        });
        this.addChild(button);

        button.onTouchBegan = function (touch, type) {
            cc.director.runScene(new cc.TransitionFade(0.1,new UserFilesScene()));
        }

        button.onTouchEnded = function (touch, type) {
            //cc.eventManager.dispatchCustomEvent(SC.CHARACTER_RESET_WEAPON);
        }
    },

    initBoxHomeBt:function(){
        var size = cc.winSize;
        var button = new ButtonNoEdg("boxHomeBt.png");
        button.attr({
            x:size.width*0.90,
            y:size.height*0.85
        });
        this.addChild(button);

        var redPoint = new cc.Sprite("#boxRedPoint.png");
        this.addChild(redPoint);
        redPoint.attr({
            x:size.width*0.93,
            y:size.height*0.90
        });
    }
});




