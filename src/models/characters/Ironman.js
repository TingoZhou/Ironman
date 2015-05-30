var Ironman = Character.extend({
	ctor: function(parent) {
		this._super(parent);

		this.name = SH.Character.Ironman;

		this._viewObj = cc.Sprite.create(CharacterConfig[this.name].res);
		this._parent.addChild(this._viewObj, 10000);

		this._weaponFire = cc.Sprite.create("#" + CharacterConfig[this.name].weaponFire.frames[0]);
		this._weaponFire.setRotation(90);
		this._weaponFire.setScale(CharacterConfig[this.name].weaponFire.scale);
		this._weaponFire.setPosition(CharacterConfig[this.name].weaponFire.buffer);
		this._weaponFire.visible = false;
		this._viewObj.addChild(this._weaponFire);

		this.init();
		this.addListeners();

		this._getAnimation("Ironman", "weaponFire");
	},

	init: function() {
		this._super();
		this._showBegin();
	},

	addListeners: function() {
		this._super();
	},

	showShoot: function() {
		
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
	},

	_getAnimation: function(ex, type) {
        var animationCache = cc.animationCache;
        var spriteFrameCache = cc.spriteFrameCache;
        var animation = animationCache.getAnimation(ex + type);
        if(animation) {
            return cc.animate(animation);
        } else {
            var frames = [];
            for (var i = 0, len = CharacterConfig[this.name][type].frames.length; i < len; ++i) {
                var frame = CharacterConfig[this.name][type].frames[i];
                frames.push(cc.spriteFrameCache.getSpriteFrame(frame));
            }
            var animMixed = new cc.Animation(frames, CharacterConfig[this.name][type].aniRate);
            animMixed.setRestoreOriginalFrame(true);
            animationCache.addAnimation(animMixed, ex + type);
            return cc.animate(animMixed);
        }      
    },

    _setWeapon: function(weaponName) {
    	this._super(weaponName);
    	this._weaponFire.visible = true;
    	this._weaponFire.runAction(cc.sequence(
            this._getAnimation("Ironman", "weaponFire")
        ).repeatForever());
    },

    _resetWeapon: function() {
    	this._super();
    	this._weaponFire.visible = false;
    	this._weaponFire.stopAllActions();
    }
});