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

    onExitTransitionDidStart: function() {

/*
        this.removeListeners();
        this.layer.unscheduleUpdate();
//      Creature.resetAll();
        Bullet.resetAll();
//      Weapon.resetAll();


*/

    },

    removeListeners: function() {
        for (var evtKey in SH.CUSTOMEVENTS) {
            cc.eventManager.removeCustomListeners(SH.CUSTOMEVENTS[evtKey]);
        }
    }
});

var GameLayer = cc.Layer.extend({
    ctor: function() {
    	this._super();
        this.bgLayer        = null;
    	this.battleLayer    = null;
        this.dropItemLayer = null;
    	this.controllLayer = null;
        this.gameUILayer   = null;
        this.initBgLayer();
    	this.initBattleLayer();
        this.initDropItemLayer();
    	this.initControllLayer();
        this.initGameUIlayer();

        this.scheduleUpdate();
    },

    initBgLayer: function() {
        var bgLayer = new BgLayer();
        this.addChild(bgLayer);
        this.bgLayer = bgLayer;
    },

    initGameUIlayer:function(){
        var gameUILayer = new GameUILayer();
        this.addChild(gameUILayer);
        this.gameUILayer= gameUILayer;
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

    initDropItemLayer: function() {
        var dropItemLayer = new DropItemLayer();
        this.addChild(dropItemLayer);
        this.dropItemLayer = dropItemLayer;
    },

	update: function(dt) {
        this.bgLayer.update && this.battleLayer.update();
		this.battleLayer.update && this.battleLayer.update();
        this.dropItemLayer.update && this.dropItemLayer.update();
		this.controllLayer.update && this.controllLayer.update(dt);
        this.gameUILayer.update&&this.gameUILayer.update();
        Monsters.updateAll(dt);
	}
});


