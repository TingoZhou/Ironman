var g_gamelayer = null;

var GameScene = cc.Scene.extend({
    onEnterTransitionDidFinish: function() {
        this._super();

        var layer = new GameLayer();
        this.addChild(layer);
        this.layer = layer;
        g_gamelayer = this.layer;

        cc.sys.dumpRoot();
        cc.sys.garbageCollect();
    },

    onExitTransitionDidStart: function() {},

    removeListeners: function() {}
});

var GameLayer = (function() {
	var PrivateProperties = function(layer) {
		var battleLayer = null;

		this.getBattleLayer = function() {
			return this.battleLayer;
		}
	}

	return cc.Layer.extend({
	    ctor: function() {
	    	this._super();
	    	this.privateProperties = new PrivateProperties(this);
	    }
	});
})()