var Ironman = Character.extend({
	ctor: function(parent) {
		this._super(parent);

		this.name = SH.Character.Ironman;

		this.init();
		this.addListeners();
	},

	init: function() {
		this._super();
		this._viewObj = cc.Sprite.create(CharacterConfig.Ironman.res);
		this._viewObj.setScale(CharacterConfig.Ironman.scale);
		this._parent.addChild(this._viewObj, 10000);
	},

	addListeners: function() {
		this._super();
	},

	update: function() {
		this._super();
	}
});