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

    removeListeners: function() {
        for (var evtKey in SH.CUSTOMEVENTS) {
            cc.eventManager.removeCustomListeners(SH.CUSTOMEVENTS[evtKey]);
        }
    }
});

var GameLayer = cc.Layer.extend({
    ctor: function() {
    	this._super();

    	this.battleLayer = null;
    	this.controllLayer = null;

    	this.initBattleLayer();
    	this.initControllLayer();

    	this.scheduleUpdate();
    },

    initBattleLayer: function() {
		var battleLayer = new BattleLayer();
		this.addChild(battleLayer);
		this.battleLayer = battleLayer;
	},

	initControllLayer: function() {
		var controllLayer = new ControllLayer();
		this.addChild(controllLayer);
		this.controllLayer = controllLayer;
	},

	update: function(dt) {
		this.battleLayer.update && this.battleLayer.update();
		this.controllLayer.update && this.controllLayer.update(dt);
	}
});