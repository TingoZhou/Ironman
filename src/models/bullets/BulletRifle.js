var BulletRifle = Bullet.extend({
    ctor: function () {
        this._super();
        this._viewObj = cc.Sprite.create(WeaponConfig.Rifle.bullets.res);
        this._velocity = {x: 0, y: 0};
    },

    initData: function (parent) {
        this._super(parent);
        this._viewObj.setPosition(Character.current.getPosition());
        var speed = WeaponConfig.Rifle.bullets.speed;
        var scaleX = Character.current.getScaleX();
        var rotation = Character.current.getRotation() + 90;
        this._viewObj.setRotation(rotation + (scaleX > 0 ? 0 : 180));
        this._velocity = {
            x: speed * Math.sin(rotation * Math.PI / 180) * (Math.abs(scaleX) / scaleX),
            y: speed * Math.cos(rotation * Math.PI / 180) * (Math.abs(scaleX) / scaleX)
        }
        this._parent.addChild(this._viewObj);
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
                this._disable();
                return;
            }
        }
    },

    update: function () {
        this._super();
        this._move();
        this._characterCollide();
    }
})

BulletRifle.bullets = [];

BulletRifle.preset = function (parent) {
    for (var i = 0; i < WeaponConfig.Rifle.bullets.presetAmount; ++i) {
        BulletRifle.bullets.push(new BulletRifle(parent));
    }
}

BulletRifle.create = function (parent, createOnly) {
    var bulletRifle = null;
    for (var i = 0, len = BulletRifle.bullets.length; i < len; ++i) {
        var bullet = BulletRifle.bullets[i];
        if (!bullet.active) {
            bulletRifle = bullet;
        }
    }
    if (!bulletRifle) {
        bulletRifle = new BulletRifle();
    }
    bulletRifle.reuse(parent);
    return bulletRifle;
}