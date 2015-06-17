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
        var playInfo=ULS.get(USK.PlayInfo);
        if(playInfo.electric>0){
        this._super();
        playInfo.electric--;
        ULS.set(USK.PlayInfo, playInfo);
        cc.eventManager.dispatchCustomEvent(SC.CHARACTER_WEAPON,{weaponName: SH.Weapon.Characters.Electric,Num:playInfo.electric});
		Bullet.create(this._parent, SH.Bullet.Characters.Electric);
        }
	}


});