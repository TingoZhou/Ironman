var Ironman = Character.extend({
	ctor: function(parent) {
		this._super(parent);

		this.name = SH.Character.Ironman;

		this._viewObj = cc.Sprite.create(CharacterConfig[this.name].res);
		this._parent.addChild(this._viewObj, 10000);

		this.init();
		this.addListeners();
	},

	init: function() {
		this._super();
		this._showBegin();
	},

	addListeners: function() {
		this._super();
	},

	update: function() {
		this._super();
	},

	_showBegin: function() {
		this._isShowBegin = true;

		this._viewObj.setScale(0.1);
		this._viewObj.setPosition(cc.p(cc.winSize.width / 2, cc.winSize.height / 3));

		this._viewObj.runAction(cc.scaleTo(0.5, CharacterConfig[this.name].scale));
		this._viewObj.runAction(cc.sequence(
			cc.moveTo(0.5, cc.p(cc.winSize.width / 2, cc.winSize.height / 2)),
			cc.callFunc(function() {
				this._isShowBegin = false;
				cc.eventManager.dispatchCustomEvent(SC.GAME_START);
			}, this)
		));
	}
});