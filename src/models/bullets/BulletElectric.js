var BulletElectric = Bullet.extend({
    ctor: function () {
        this._super();
        this._viewObj = cc.Sprite.create("#" + WeaponConfig.Electric.bullets.frames[0]);
        this.name = "BulletElectric";
    },

    initData: function (parent) {
        this._super(parent);
        var rotation = Character.current.getRotation() + 90;
        var scaleX = Character.current.getScaleX();
        var speed = WeaponConfig.Electric.bullets.speed;
        var p = cc.p(Character.current.getPosition().x, Character.current.getPosition().y);
        this.dps = 15;
        this._viewObj.setAnchorPoint(cc.p(0.5, 0));
        this._viewObj.setPosition(p);
        this._viewObj.setRotation(rotation);
        this._viewObj.setScale(scaleX / 4);

        this._parent.addChild(this._viewObj);
        this._velocity = {
            x: speed * Math.sin(rotation * Math.PI / 180) * (Math.abs(scaleX) / scaleX),
            y: speed * Math.cos(rotation * Math.PI / 180) * (Math.abs(scaleX) / scaleX)
        }
    },

    _move: function () {
        this._viewObj.x += this._velocity.x;
        this._viewObj.y += this._velocity.y;
    },

    /**
     * 碰撞
     */
    _characterCollide: function () {
        var monsters = Monsters.monstersOnStage;
        for (var i = 0, len = monsters.length; i < len; ++i) {
            var monster = monsters[i];
            if (monster.active && cc.rectIntersectsRect(this._viewObj.getBoundingBox(), monster.getCollideBoundingBox())) {
                monster.hitMonstersByBullet(this);
//                this._disable();
//                return;
            }
        }
    },

    update: function () {
        this._super();
        this._move();
        this._characterCollide();
    }
});

BulletElectric.bullets = [];

BulletElectric.preset = function (parent) {
    for (var i = 0; i < WeaponConfig.Electric.bullets.presetAmount; ++i) {
        var bullet = new BulletElectric(parent);
        bullet.unuse();
        BulletElectric.bullets.push(bullet);
    }
}

BulletElectric.create = function (parent, createOnly) {
    var bulletElectric = null;
    for (var i = 0, len = BulletElectric.bullets.length; i < len; ++i) {
        var bullet = BulletElectric.bullets[i];
        if (!bullet.active) {
            bulletElectric = bullet;
        }
    }
    if (!bulletElectric) {
        bulletElectric = new BulletElectric();
    }
    bulletElectric.reuse(parent);
    return bulletElectric;
}