var Bullet = cc.Class.extend({
	ctor: function() {
        this._id = uuid();
		this._step = 0;
		this._viewObj = null;
	},

	initData: function(parent) {
		this._parent = parent;
	},

	reuse: function(parent) {
		this.initData(parent);
        Bullet.bulletsOnStage.push(this);
	},

	unuse: function() {
        this._viewObj.unscheduleAllCallbacks();
        this._viewObj.stopAllActions();
        this._viewObj.retain(); //if in jsb
        this._viewObj.removeFromParent(true);
        for (var i = 0, len = Bullet.bulletsOnStage.length; i < len; ++i) {
            var bullet = Bullet.bulletsOnStage[i];
            if (bullet.getId() == this._id) {
                Bullet.bulletsOnStage.splice(i , 1);
                break ;
            }
        }
	},

	release: function() {
		this._viewObj.release();
	},

    getId: function() {
        return this._id;
    },

	update: function() {
		++this._step;
        this._checkOverBorder();
	},

    _checkOverBorder: function() {
        var x = this._viewObj.x;
        var y = this._viewObj.y;
        if (x < 0 || x > cc.winSize.width || y < 0 || y > cc.winSize.height) {
            this._destroy();
            this._disable();
        }
    },

    _destroy: function() {

    },

    _disable: function() {
        cc.pool.putInPool(this);
    }
});

Bullet.bulletsOnStage = [];
Bullet.mShootableOnStage = [];

Bullet.create = function (parent, type) {
    switch (type) {
        case SH.Bullet.Characters.Rifle:
            return BulletRifle.create(parent);
    }
};

Bullet.updateAll = function (dt) {
    for (var i = 0; i < Bullet.bulletsOnStage.length; i++) {
        var bullet = Bullet.bulletsOnStage[i];
        bullet.update(dt);
    }
};

Bullet.preset = function (parent, type, data) {
    switch (type) {
        case SH.Bullet.Characters.Rifle:
            BulletRifle.preset(parent, data);
            break;
    }
};

Bullet.resetAll = function () {
    for (var i = 0; i < Bullet.bulletsOnStage.length; ++i) {
        cc.pool.putInPool(Bullet.bulletsOnStage[i]);
    }
    Bullet.bulletsOnStage = [];
    for (var i = 0; i < Bullet.mShootableOnStage.length; ++i) {
        cc.pool.putInPool(Bullet.mShootableOnStage[i]);
    }
    Bullet.mShootableOnStage = [];
}