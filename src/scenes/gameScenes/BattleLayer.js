var BattleLayer = cc.Layer.extend({
    ctor: function() {
    	this._super();
    	this.init();
    },

    init: function() {
        var character = Character.create(SH.Character.Ironman, this);
        character.setPosition(cc.p(cc.winSize.width / 2, cc.winSize.height / 2));
    },

    update: function(dt) {
        Character.current.update && Character.current.update(dt);
        Bullet.updateAll();
    }
})