var BulletRifle = Bullet.extend({
    ctor: function () {
        this._super();
        this._viewObj = cc.Sprite.create(WeaponConfig.Rifle.bullets.res);
        this._velocity = {x: 0, y: 0};
        this.name = "BulletRifle";
    },

    initData: function (parent) {
        this._super(parent);
        this.dps = 5;
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

        this._emitter = new cc.ParticleMeteor();
        this._emitter.setStartColor(cc.color(31, 64, 194, 255));
        this._emitter.setStartColorVar(cc.color(0, 0, 0, 0));
        this._emitter.setEndColor(cc.color(0, 0, 0, 10));
        this._emitter.setEndColorVar(cc.color(0, 0, 0, 0));
        this._emitter.setSpeed(20);
        this._emitter.setSpeedVar(1);
        this._emitter.setScale(.7);
        this._emitter.setLife(.2);
        this._emitter.setLifeVar(.1);
        this._emitter.texture = cc.textureCache.addImage("res/characters/fire.png");
        if (this._emitter.setShapeType)
            this._emitter.setShapeType(cc.ParticleSystem.STAR_SHAPE);
        this._parent.addChild(this._emitter);
    },

    _move: function () {
        this._viewObj.x += this._velocity.x;
        this._viewObj.y += this._velocity.y;
        this._emitter.setPosition(cc.p(this._viewObj.x, this._viewObj.y));
    },

    /**
     * 碰撞
     */
    _characterCollide: function () {

        var monsters = Monsters.monstersOnStage;
        for (var i = 0, len = monsters.length; i < len; ++i) {
            var monster = monsters[i];
            if (monster.active && cc.rectIntersectsRect(this.getCollideBoundingBox(), monster.getCollideBoundingBox())) {
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
        var bullet = new BulletRifle(parent);
        bullet.unuse();
        BulletRifle.bullets.push(bullet);
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