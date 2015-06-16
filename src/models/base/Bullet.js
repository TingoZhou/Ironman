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
        this._explodeObj && this._explodeObj.removeFromParent(true);

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
        if (!this.active) return;
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

    getCollideBoundingBox: function () {

        var box = this._viewObj.getBoundingBox();
        var rect = cc.rect(box.x + 30, box.y + 30, box.width - 60, box.height - 60);
        //
        /*
         if (this._drawNode) {
         this._drawNode.clear();
         this._drawNode.drawRect(cc.p(rect.x, rect.y), cc.p(rect.x + rect.width, rect.y + rect.height), cc.color(155, 255, 155, 60), 0);
         } else {
         this._drawNode = new cc.DrawNode();
         this._drawNode.drawRect(cc.p(rect.x, rect.y), cc.p(rect.x + rect.width, rect.y + rect.height), cc.color(155, 255, 155, 60), 0);
         this._parent.addChild(this._drawNode);
         }*/


        return rect;
    },

    _destroy: function () {

    },
    //销毁
    _disable: function () {
        this.unuse();
    }
});

Bullet.bulletsOnStage = [];

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
        var b = Bullet.bulletsOnStage[i];
        (function (bullet) {
            bullet.unuse();
            bullet.release();
        })(b);
    }
    Bullet.bulletsOnStage = [];


}