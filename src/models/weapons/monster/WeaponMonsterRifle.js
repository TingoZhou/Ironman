var WeaponMonsterRifle = Weapon.extend({

    _user: null, //武器使用者
    ctor: function (parent) {
        this._super(parent);

    },

    setUser: function (user) {
        this._user = user;
    },

    update: function () {
        this._super();
        if (this._step % WeaponConfig.MonsterRifle.shootStep == 0) {
            this._shoot();
        }
    },

    _shoot: function () {
        this._super();
        var bullet = Bullet.create(this._parent, SH.Bullet.Monster.Rifle);
        bullet.trigger(this._user);
    }
});