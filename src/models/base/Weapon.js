var Weapon = cc.Class.extend({
    ctor: function (parent) {
        this._parent = parent;
        this._step = -1;
    },

    update: function () {
        ++this._step;
    },

    _shoot: function () {
        Character.current.showShoot();
    },

    addDisplayWeapon: function (user) {

    },

    removeDisplayWeapon: function () {
        if (this._weaponFire)
            this._weaponFire.removeFromParent(true);
    }


});

Weapon.create = function (type, parent) {
    switch (type) {
        case SH.Weapon.Characters.Rifle:            //步枪
            return new WeaponRifle(parent);
        case SH.Weapon.Characters.Rocket:           //火箭炮
            return new WeaponRocket(parent);
        case SH.Weapon.Characters.Electric:         //闪电
            return new WeaponElectric(parent);
        case SH.Weapon.Monster.Rifle:               //怪物步枪
            return new WeaponMonsterRifle(parent);
    }
}