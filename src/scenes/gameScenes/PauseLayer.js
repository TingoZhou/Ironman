

var PauseLayer = cc.Layer.extend({
    ctor:function(){
        this._super();
        this.init();
    },

    init:function(){
        var color  = new cc.Color(0,0,0,105);
        var colorbg = new cc.LayerColor(color,960,540);
        this.addChild(colorbg);
         var BacktoMainMenu = new ButtonNoEdg("pauseScene_backBt.png");
        this.addChild(BacktoMainMenu);
        BacktoMainMenu.attr({
            x:cc.winSize.width/5*2,
            y:cc.winSize.height/5*3
        });
        BacktoMainMenu.onTouchEnded = function(){
            cc.director.resume();
            cc.director.runScene(new cc.TransitionFade(0.1,new StarGameScene()));
        }

        var ResumeBt = new  ButtonNoEdg("pauseScene_resumeBt.png");
        this.addChild(ResumeBt);
        ResumeBt.attr({
            x:cc.winSize.width/5*3,
            y:cc.winSize.height/5*3
        });
        ResumeBt.onTouchEnded = function(){
            cc.director.resume();
            g_gamelayer.removeChildByTag(1);
        };

        var SoundBt = new ButtonNoEdg("pauseScene_soundBt.png");
        this.addChild(SoundBt);
        SoundBt.attr({
            x:cc.winSize.width/2,
            y:cc.winSize.height/5*2
        });
    },

    onEnter: function () {
        this._super();
        var listener = cc.EventListener.create({
            event: cc.EventListener.TOUCH_ONE_BY_ONE,
            swallowTouches: true,
            onTouchBegan: function (touch, event) {
                return true;
            }
        });
        cc.eventManager.addListener(listener, this);
        this._listener = listener;
    },

    onExit: function () {
        cc.eventManager.removeListener(this._listener);
        this._super();
    }

});