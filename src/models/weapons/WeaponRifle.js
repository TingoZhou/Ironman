var WeaponRifle = Weapon.extend({
	ctor: function(parent) {
		this._super(parent);
	},

	update: function() {
		this._super();
		if (this._step % WeaponConfig.Rifle.shootStep == 0) {
			this._shoot();
		}
	},

	_shoot: function() {
        var playInfo=ULS.get(USK.PlayInfo);
        if(playInfo.rifle>0){
		this._super();
        playInfo.rifle--;
        ULS.set(USK.PlayInfo, playInfo);
        cc.eventManager.dispatchCustomEvent(SC.CHARACTER_WEAPON,{weaponName: SH.Weapon.Characters.Rifle,Num:playInfo.rifle});
		Bullet.create(this._parent, SH.Bullet.Characters.Rifle);
        }
	}
});