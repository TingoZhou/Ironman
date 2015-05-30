var WeaponRocket = Weapon.extend({
	ctor: function(parent) {
		this._super(parent);
	},

	update: function() {
		this._super();
		if (this._step % WeaponConfig.Rocket.shootStep == 0) {
			this._shoot();
		}
	},

	_shoot: function() {
		this._super();
		Bullet.create(this._parent, SH.Bullet.Characters.Rocket);
	}
});