var BulletRocket = Bullet.extend({
    ctor: function () {
        this._super();
        this._viewObj = cc.Sprite.create(WeaponConfig.Rocket.bullets.res);
        this._velocity = {x: 0, y: 0};
        this.name = "BulletRocket";
    },

    initData: function (parent) {
        this._super(parent);
        this.dps = 30;
        this._viewObj.setPosition(this._weaponPosition);
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
        //爆炸
        this._explodeObj = new cc.Sprite('#' + WeaponConfig.Rocket.bullets.explode.frames[0]);
        this._explodeObj.visible = false;
        this._parent.addChild(this._explodeObj);
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
                this._explode();
                this._viewObj.visible = false;
            }
        }
    },

    //爆开
    _explode: function () {

        this._explodeObj.visible = true;
        var pos = cc.p(this._viewObj.getPosition().x, this._viewObj.getPosition().y);
        this._explodeObj.setPosition(pos);
        var explodeAnimate = this._getAnimation("BulletRocketEffect");          //播放动画
        this._explodeObj.runAction(
            cc.sequence(
                explodeAnimate,
                cc.callFunc(
                    function () {
                        this._disable();
                    }
                    , this)
            )
        );
    },

    _getAnimation: function (name) {

        var animationCache = cc.animationCache;
        var spriteFrameCache = cc.spriteFrameCache;
        var moreFrames = [];
        var delay = 0;

        var animation = animationCache.getAnimation(name);
        if (animation) {
            return cc.animate(animation);
        }

        switch (name) {
            case "BulletRocketEffect":
                delay = 1 / (WeaponConfig.Rocket.bullets.explode.frames.length * WeaponConfig.Rocket.bullets.explode.speed);
                for (var i = 0, m = WeaponConfig.Rocket.bullets.explode.frames.length; i < m; i++) {
                    var frame = cc.spriteFrameCache.getSpriteFrame(WeaponConfig.Rocket.bullets.explode.frames[i]);
                    moreFrames.push(frame);
                }
                break;
        }

        var animMixed = new cc.Animation(moreFrames, delay);
        cc.animationCache.addAnimation(animMixed, name);
        return cc.animate(animMixed);

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
        var bullet = new BulletRocket(parent);
        bullet.unuse();
        BulletRocket.bullets.push(bullet);
    }
}

BulletRocket.create = function (parent, weaponPosition, createOnly) {
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
    bulletRocket.reuse(parent, weaponPosition);
    return bulletRocket;
}