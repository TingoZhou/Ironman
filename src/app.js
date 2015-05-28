
var AppLayer = cc.Layer.extend({
    sprite:null,
    ctor:function () {
        //////////////////////////////
        // 1. super init first
        this._super();

        cc.director.runScene(new cc.TransitionFade(0.1, new GameScene()));
    }
});

var AppScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        var layer = new AppLayer();
        this.addChild(layer);
    }
});

