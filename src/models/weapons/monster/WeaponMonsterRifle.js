var WeaponMonsterRifle = Weapon.extend({

    _user: null, //武器使用者
    ctor: function (parent) {
        this._super(parent);

    },

    setUser: function (user) {
        this._user = user;
        this._initWeaponFire();
    },

    update: function () {
        this._super();

        if (this._step % WeaponConfig.MonsterRifle.shootStep == 0) {
            this._shoot();
            this._weaponFire.visible = true;
            this._weaponFire.runAction(
                cc.sequence(
                    this._getAnimation("Ironman", "weaponFire"),
                    cc.callFunc(
                        function () {
                                  this._weaponFire.visible = false;
                        }, this)
                )
            )

        }
    },

    _initWeaponFire: function () {
        this._weaponFire = cc.Sprite.create("#" + MonsterConfig.Charlie.weaponFire.frames[0]);
        this._weaponFire.setRotation(90);
        this._weaponFire.setScale(MonsterConfig.Charlie.weaponFire.scale);
        this._weaponFire.setPosition(MonsterConfig.Charlie.weaponFire.buffer);

        this._user.addChild(this._weaponFire);


    },

    _getAnimation: function (ex, type) {
        var animationCache = cc.animationCache;
        var spriteFrameCache = cc.spriteFrameCache;
        var animation = animationCache.getAnimation(ex + type);
        if (animation) {
            return cc.animate(animation);
        } else {
            var frames = [];
            for (var i = 0, len = MonsterConfig.Charlie.weaponFire.frames.length; i < len; ++i) {
                var frame = MonsterConfig.Charlie.weaponFire.frames[i];
                frames.push(cc.spriteFrameCache.getSpriteFrame(frame));
            }
            var animMixed = new cc.Animation(frames, CharacterConfig[this.name][type].aniRate);
            animMixed.setRestoreOriginalFrame(true);
            animationCache.addAnimation(animMixed, ex + type);
            return cc.animate(animMixed);
        }
    },

    _shoot: function () {
        this._super();
        var bullet = Bullet.create(this._parent, SH.Bullet.Monster.Rifle);
        bullet.trigger(this._user);
    }
});