var Character = cc.Class.extend({
	ctor: function(parent) {
		this._parent = parent;

		this._viewObj = null;
		this._speed = 0;
		this._weapon = null;
		this._velocity = {x: 0, y: 0};
	},

	init: function() {
		this._speed = CharacterConfig[this.name].speed;
	},

	addListeners: function() {
		cc.eventManager.addCustomListener(SC.CHRACTER_SET_WEAPON, _.bind(function(e) {
            this._setWeapon(e.getUserData().weaponName);
        }, this));
        cc.eventManager.addCustomListener(SC.CHRACTER_RESET_WEAPON, _.bind(function(e) {
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

	update: function() {
		this._move();
		this._changeDirection();
		this._weapon && this._weapon.update();
	},

	_move: function() {
		this._viewObj.x += this._velocity.x;
		this._viewObj.y += this._velocity.y;
	},

	_setWeapon: function(weapon) {
		this._weapon = Weapon.create(SH.Weapon.Characters.Rifle, this._parent);
	},

	_resetWeapon: function() {
		this._weapon = null;
	},

	_changeDirection: function() {

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
