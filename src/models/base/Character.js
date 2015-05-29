var Character = cc.Class.extend({
	ctor: function(parent) {
		this._parent = parent;

		this._viewObj = null;
		this._speed = 0;
		this._weapon = null;
		this._velocity = {x: 0, y: 0};
		this._HP = 0;
	},

	init: function() {
		this._HP = CharacterConfig[this.name].HP;
		this._speed = CharacterConfig[this.name].speed;
	},

	addListeners: function() {
		cc.eventManager.addCustomListener(SC.CHARACTER_SET_WEAPON, _.bind(function(e) {
            this._setWeapon(e.getUserData().weaponName);
        }, this));
        cc.eventManager.addCustomListener(SC.CHARACTER_RESET_WEAPON, _.bind(function(e) {
            this._resetWeapon();
        }, this));
	},

	setVelocity: function(velocity) {
		this._velocity.x = this._speed * velocity.vX;
		this._velocity.y = this._speed * velocity.vY;
	},

	setPosition: function(pos) {
		this._viewObj.setPosition(pos);
	},

	getPosition: function() {
		return this._viewObj.getPosition();
	},

	getScaleX: function() {
		return this._viewObj.scaleX;
	},

	doHitByMonster: function(dps) {
		this._HP -= dps;
	},

	getCollideBoundingBox: function() {
		return this._viewObj.getBoundingBox();
	},

	getRotation: function() {
		return this._viewObj.getRotation();
	},

	update: function() {
		this._move();
		this._changeDirection();
		this._weapon && this._weapon.update();
	},

	_move: function() {
		this._viewObj.x += this._velocity.x;
		this._viewObj.y += this._velocity.y;

		this._viewObj.x = Math.min(cc.winSize.width, Math.max(0, this._viewObj.x));
		this._viewObj.y = Math.min(cc.winSize.height, Math.max(0, this._viewObj.y));
	},

	_setWeapon: function(weaponName) {
		this._weapon = Weapon.create(weaponName, this._parent);
	},

	_resetWeapon: function() {
		this._weapon = null;
	},

	_changeDirection: function() {
		var vX = this._velocity.x;
		var vY = this._velocity.y;

		var rotation = this._viewObj.getRotation();

		if (vX == 0) {
			if (vY > 0) {
				rotation = 0;
			} else if (vY < 0) {
				rotation = 180;
			}
		} else if (vY == 0) {
			if (vX > 0) {
				rotation = 90;
			} else if (vX < 0) {
				rotation = 270;
			}
		} else {
			rotation = Math.atan(vY / vX) * 180 / Math.PI;
			this._viewObj.setScaleX((vX < 0? -1 : 1) * Math.abs(this._viewObj.scaleX));
		}

		this._viewObj.setRotation(360 - rotation);
	}
});

Character.current = null;

Character.create = function(type, parent) {
	switch(type) {
		case SH.Character.Ironman:
			Character.current = new Ironman(parent);
			break ;
	}
	return Character.current;
}
