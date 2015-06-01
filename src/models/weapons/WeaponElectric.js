var WeaponElectric = Weapon.extend({
	ctor: function(parent) {
		this._super(parent);
	},

	update: function() {
		this._super();
		if (this._step % WeaponConfig.Electric.shootStep == 0) {
			this._shoot();
		}
	},

	_shoot: function() {
		Bullet.create(this._parent, SH.Bullet.Characters.Electric);
	}
});