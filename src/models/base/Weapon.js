var Weapon = cc.Class.extend({
	ctor: function(parent) {
		this._parent = parent;
		this._step = 0;
	},
	
	update: function() {
		++this._step;
	}
});

Weapon.create = function(type, parent) {
	switch(type) {
		case SH.Weapon.Characters.Rifle:
			return new WeaponRifle(parent);
		case SH.Weapon.Characters.Rocket:
			return new WeaponRocket(parent);
	}
}