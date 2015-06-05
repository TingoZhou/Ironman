var BulletRocket = Bullet.extend({
    ctor: function () {
        this._super();
        this._viewObj = cc.Sprite.create(WeaponConfig.Rocket.bullets.res);
        this._velocity = {x: 0, y: 0};
        this.name="BulletRocket";
    },

    initData: function (parent) {
        this._super(parent);

        this._viewObj.setPosition( this._weaponPosition);
        var speed = WeaponConfig.Rocket.bullets.speed;
        var scaleX = Character.current.getScaleX();
        var rotation = Character.current.getRotation() + 90;
        this._viewObj.setRotation(rotation + (scaleX > 0 ? -90 : -270));
        this._viewObj.setScale(scaleX / 2);
        this._velocity = {
            x: speed * Math.sin(rotation * Math.PI / 180) * (Math.abs(scaleX) / scaleX),
            y: speed * Math.cos(rotation * Math.PI / 180) * (Math.abs(scaleX) / scaleX)
        }
        this._parent.addChild(this._viewObj);
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

    _move: function () {
        this._viewObj.x += this._velocity.x;
        this._viewObj.y += this._velocity.y;
    },

    update: function () {
        this._super();
        this._move();
        this._characterCollide();
    }
});

BulletRocket.bullets = [];

BulletRocket.preset = function (parent) {
    for (var i = 0; i < WeaponConfig.Rocket.bullets.presetAmount; ++i) {
        BulletRocket.bullets.push(new BulletRocket(parent));
    }
}

BulletRocket.create = function (parent, weaponPosition,createOnly) {
    var bulletRocket = null;
    for (var i = 0, len = BulletRocket.bullets.length; i < len; ++i) {
        var bullet = BulletRocket.bullets[i];
        if (!bullet.active) {
            bulletRocket = bullet;
        }
    }
    if (!bulletRocket) {
        bulletRocket = new BulletRocket();
    }
    bulletRocket.reuse(parent,weaponPosition);
    return bulletRocket;
}