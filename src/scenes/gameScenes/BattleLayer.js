var BattleLayer = cc.Layer.extend({
    ctor: function() {
    	this._super();
        this._scriptLayer = null;
    	this.init();
        this.addListeners();
    },

    init: function() {
        var character = Character.create(SH.Character.Ironman, this);
        this.initScriptLayer();
    },

    addListeners: function() {
        cc.eventManager.addCustomListener(SC.GAME_START, _.bind(function(e) {
            this._scriptLayer.start('1000');
        }, this));
    },

    initScriptLayer: function() {
        var scriptLayer = new ScriptLayer();
        this.addChild(scriptLayer);
        this._scriptLayer = scriptLayer;
    },

    update: function(dt) {
        Character.current.update && Character.current.update(dt);
        Bullet.updateAll();
        this._scriptLayer.update(dt);
    }
})