var Bullet = cc.Class.extend({
    ctor: function () {
        this.active = false;

        this._id = uuid();
        this._step = 0;
        this._viewObj = null;
    },

    initData: function (parent) {
        this._parent = parent;
    },

    reuse: function (parent, weaponPosition) {
        this._weaponPosition = weaponPosition;
        this.active = true;
        this._viewObj.visible = true;
        this.initData(parent);
        Bullet.bulletsOnStage.push(this);
    },

    unuse: function () {
        this.active = false;
        this._viewObj.unscheduleAllCallbacks();
        this._viewObj.stopAllActions();
        this._viewObj.retain(); //if in jsb
        this._viewObj.removeFromParent(true);
            this._explodeObj &&  this._explodeObj.removeFromParent(true);
        for (var i = 0, len = Bullet.bulletsOnStage.length; i < len; ++i) {
            var bullet = Bullet.bulletsOnStage[i];
            if (bullet.getId() == this._id) {
                Bullet.bulletsOnStage.splice(i, 1);
                break;
            }
        }
    },

    release: function () {
        this._viewObj.release();
    },

    getId: function () {
        return this._id;
    },

    update: function () {
        ++this._step;
        this._checkOverBorder();
    },

    _checkOverBorder: function () {
        var x = this._viewObj.x;
        var y = this._viewObj.y;
        if (x < 0 || x > cc.winSize.width || y < 0 || y > cc.winSize.height) {
            this._destroy();
            this._disable();
        }
    },


    _destroy: function () {

    },
    //销毁
    _disable: function () {
        this.unuse();
    }
});

Bullet.bulletsOnStage = [];
Bullet.mShootableOnStage = [];

Bullet.create = function (parent, type, weaponPosition) {
    switch (type) {
        case SH.Bullet.Characters.Rifle:
            return BulletRifle.create(parent);
        case SH.Bullet.Characters.Rocket:
            return BulletRocket.create(parent, weaponPosition);
        case SH.Bullet.Characters.Electric:
            return BulletElectric.create(parent);
        case SH.Bullet.Monster.Rifle:
            return BulletMonsterRifle.create(parent);
    }
};

Bullet.updateAll = function (dt) {
    for (var i = 0; i < Bullet.bulletsOnStage.length; i++) {
        var bullet = Bullet.bulletsOnStage[i];
        bullet.update(dt);
    }
};

Bullet.preset = function (parent, type) {
    switch (type) {
        case SH.Bullet.Characters.Rifle:
            BulletRifle.preset(parent);
            break;
        case SH.Bullet.Characters.Rocket:
            BulletRocket.preset(parent);
            break;
        case SH.Bullet.Characters.Electric:
            BulletElectric.preset(parent);
            break;
        case SH.Bullet.Monster.Rifle:
            BulletMonsterRifle.preset(parent);
            break
    }
};

Bullet.resetAll = function () {
    for (var i = 0; i < Bullet.bulletsOnStage.length; ++i) {
        Bullet.bulletsOnStage[i].unuse();
        Bullet.bulletsOnStage[i].release();
    }
    Bullet.bulletsOnStage = [];
    for (var i = 0; i < Bullet.mShootableOnStage.length; ++i) {
        Bullet.mShootableOnStage[i].unuse();
        Bullet.mShootableOnStage[i].release();
    }
    Bullet.mShootableOnStage = [];
}