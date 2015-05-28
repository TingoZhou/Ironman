var Bullet = cc.Class.extend({
	ctor: function() {
		this._step = 0;
		this._viewObj = null;
	},

	initData: function(parent) {
		this._parent = parent;
	},

	reuse: function(parent) {
		this.initData(parent);
        this._viewObj.visible = true;
        this.active = true;
        Bullet.bulletsOnStage.push(this);
	},

	unuse: function() {
        // this._viewObj.unscheduleAllCallbacks();
        // this._viewObj.stopAllActions();
        // this._viewObj.retain(); //if in jsb
        // this._viewObj.removeFromParent(true);
        // this._viewObj.visible = false;
        // this.active = false;
        // for (var i = 0, len = Bullet.bulletsOnStage.length; i < len; ++i) {
        //     var bullet = Bullet.bulletsOnStage[i];
        //     if (bullet.id == this.id) {
        //         Bullet.bulletsOnStage.splice(i , 1);
        //         break ;
        //     }
        // }
	},

	release: function() {
		this._viewObj.release();
	},

	update: function() {
		++this._step;
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