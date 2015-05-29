var BattleLayer = cc.Layer.extend({
    ctor: function() {
    	this._super();
        this._scriptLayer = null;
    	this.init();
    },

    init: function() {
        var character = Character.create(SH.Character.Ironman, this);
        character.setPosition(cc.p(cc.winSize.width / 2, cc.winSize.height / 2));

        this.initScriptLayer();
    },

    initScriptLayer: function() {
        var scriptLayer = new ScriptLayer();
        this.addChild(scriptLayer);
        this._scriptLayer = scriptLayer;
        this._scriptLayer.start('1000');
    },

    update: function(dt) {
        Character.current.update && Character.current.update(dt);
        Bullet.updateAll();
        this._scriptLayer.update(dt);
    }
})