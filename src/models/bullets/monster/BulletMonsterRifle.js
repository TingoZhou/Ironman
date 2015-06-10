var BulletMonsterRifle = Bullet.extend({
    ctor: function () {
        this._super();
        this._viewObj = cc.Sprite.create(WeaponConfig.MonsterRifle.bullets.res);
        this._velocity = {x: 0, y: 0};
    },

    initData: function (parent) {
        this._super(parent);

    },

    /**
     * 碰撞
     */
    _characterCollide: function () {
        var character = Character.current;    //当前角色
        var targetBox = character.getCollideBoundingBox();
        var selfBox = this._viewObj.getBoundingBox();
        if (cc.rectIntersectsRect(selfBox, targetBox)) {
            character.doHitByMonster(WeaponConfig.MonsterRifle.bullets.dps, this);
            cc.eventManager.dispatchCustomEvent(SC.MONSTER_HIT_CHARACTER);
            this._disable();
        }
    },


    /**
     * @param monster
     */
    trigger: function (monster) {

        this._viewObj.setPosition(monster.getPosition());
        this._viewObj.setScale(WeaponConfig.MonsterRifle.bullets.scale);
        var speed = WeaponConfig.MonsterRifle.bullets.speed;

        var scaleX = monster.getScaleX();
        var isFlippedY = monster.isFlippedY();
        if (isFlippedY) {
        } else {

        }

        var rotation = monster.getRotation() + 90;

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

    update: function () {
        this._super();
        this._move();
        this._characterCollide();
    }
});

BulletMonsterRifle.bullets = [];

BulletMonsterRifle.preset = function (parent) {
    for (var i = 0; i < WeaponConfig.MonsterRifle.bullets.presetAmount; ++i) {
        var bullet = new BulletMonsterRifle(parent);
        bullet.unuse();
        BulletMonsterRifle.bullets.push(bullet);
    }
}

BulletMonsterRifle.create = function (parent, createOnly) {

    var bulletRifle = null;
    for (var i = 0, len = BulletMonsterRifle.bullets.length; i < len; ++i) {
        var bullet = BulletMonsterRifle.bullets[i];
        if (!bullet.active) {
            bulletRifle = bullet;
        }
    }
    if (!bulletRifle) {
        bulletRifle = new BulletMonsterRifle();
        bulletRifle.unuse();
    }
    bulletRifle.reuse(parent);
    return bulletRifle;
}