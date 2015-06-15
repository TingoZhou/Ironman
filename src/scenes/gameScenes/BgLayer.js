var BgLayer = cc.Layer.extend({
    ctor: function () {
        this._super();
        this.init();
        this.addListeners();
    },

    addListeners: function () {
        cc.eventManager.addCustomListener(SC.CHARACTER_BOMB, _.bind(function (e) {
            this._shock();
        }, this));
    },

    _shock: function () {

        var time = .02;
        this.runAction(
            cc.sequence(
                cc.sequence(
                        cc.moveBy(time, cc.p(5, 5)),
                        cc.delayTime(time),
                        cc.moveBy(time, cc.p(-5, -5)),
                        cc.delayTime(time)
                    ).
                    repeat(15),
                cc.callFunc(function () {
                    this.x = 0;
                    this.y = 0;
                }, this)
            )
        )

    },

    init: function () {
        var bg = cc.Sprite.create("res/bg.jpg");
        bg.setPosition(cc.p(cc.winSize.width / 2, cc.winSize.height / 2));
        this.addChild(bg);
    },

    update: function (dt) {
    }
});