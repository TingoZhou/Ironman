var GameOverLayer = cc.Layer.extend({
    ctor: function () {
        this._super();
        this.init();
    },

    init: function () {
        this.initImages();
        this.initButtons();
    },

    initImages: function () {

        var color   = new cc.Color(0, 0, 0, 105);
        var colorbg = new cc.LayerColor(color, 960, 540);
        this.addChild(colorbg);

        var gameOverTitle = new cc.Sprite("#gameOverTitle.png");
        this.addChild(gameOverTitle);
        gameOverTitle.attr({
            x: cc.winSize.width / 2,
            y: cc.winSize.height / 7 * 5
        });

        var bigStar = new cc.Sprite("#bigStar.png");
        this.addChild(bigStar);
        bigStar.attr({
            x: cc.winSize.width / 8 * 3,
            y: cc.winSize.height / 2
        });
    },

    initButtons: function () {
        var ResumeBt = new ButtonNoEdg("gameOvewBackBt.png");
        this.addChild(ResumeBt);
        ResumeBt.attr({
            x: cc.winSize.width / 2,
            y: cc.winSize.height / 7 * 2
        });

        ResumeBt.onTouchBegan = function () {
            cc.director.runScene(new cc.TransitionFade(0.1, new StarGameScene()));
        }
    },

    //*****************************************************添加代码6.13星期六下午 by Caesar
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
    //********************************************************************防止游戏结束时的触摸穿透
});
