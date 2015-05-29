var BgLayer = cc.Layer.extend({
    ctor: function() {
    	this._super();
    	this.init();
    },

    init: function() {
        var bg = cc.Sprite.create("res/bg.jpg");
        bg.setPosition(cc.p(cc.winSize.width / 2, cc.winSize.height / 2));
        this.addChild(bg);
    },

    update: function(dt) {}
})