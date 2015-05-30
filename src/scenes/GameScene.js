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

        this.bgLayer = null;
    	this.battleLayer = null;
        this.dropItemLayer = null;
    	this.controllLayer = null;

        this.initBgLayer();
    	this.initBattleLayer();
        this.initDropItemLayer();
    	this.initControllLayer();

    	this.scheduleUpdate();
    },

    initBgLayer: function() {
        var bgLayer = new BgLayer();
        this.addChild(bgLayer);
        this.bgLayer = bgLayer;
    },

    initBattleLayer: function() {
		var battleLayer = new BattleLayer();
		this.addChild(battleLayer);
		this.battleLayer = battleLayer;
	},

    initDropItemLayer: function() {
        var dropItemLayer = new DropItemLayer();
        this.addChild(dropItemLayer);
        this.dropItemLayer = dropItemLayer;
    },

	initControllLayer: function() {
		var controllLayer = new ControllLayer();
		this.addChild(controllLayer);
		this.controllLayer = controllLayer;
	},

	update: function(dt) {
        this.bgLayer.update && this.battleLayer.update();
		this.battleLayer.update && this.battleLayer.update();
        this.dropItemLayer.update && this.dropItemLayer.update();
		this.controllLayer.update && this.controllLayer.update(dt);
        Monsters.updateAll(dt);
	}
});