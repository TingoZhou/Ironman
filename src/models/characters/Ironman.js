var Ironman = Character.extend({
    ctor: function (parent) {
        this._super(parent);
        this.name = SH.Character.Ironman;

        this._viewObj = cc.Sprite.create(CharacterConfig[this.name].res);
        this._parent.addChild(this._viewObj, 100);

        this._weaponFire = cc.Sprite.create("#" + CharacterConfig[this.name].weaponFire.frames[0]);
        this._weaponFire.setRotation(90);
        this._weaponFire.setScale(CharacterConfig[this.name].weaponFire.scale);
        this._weaponFire.setPosition(CharacterConfig[this.name].weaponFire.buffer);
        this._weaponFire.visible = false;
        this._viewObj.addChild(this._weaponFire);


        this.init();
        this.addListeners();

        this._getAnimation("Ironman", "weaponFire");
    },

    init: function () {
        this._super();
        this._showBegin();
    },

    addListeners: function () {
        this._super();
        cc.eventManager.addCustomListener(SC.CHARACTER_SHIEL, _.bind(function (e) {

            this._doShiel();

        }, this));

    },

    showShoot: function () {

    },

    update: function () {
        this._super();
//        this._emitter.setPosition(cc.p(this._viewObj.x, this._viewObj.y-30))
    },

    //护盾
    _doShiel: function () {
        var shiel = new Shield(this);
        shiel.start();
        this._isShiel = true;
    },

    //OVERRIDE
    _changeDirection: function () {
        this._automaticAiming();
    },

    //自动瞄准
    _automaticAiming: function () {
        if (this.isDead) return;
        var closeMonster = this._getClosestMonster();
        if (closeMonster) {
            var dx = closeMonster.x - this._viewObj.x;
            var dy = closeMonster.y - this._viewObj.y;
            var angleToTarget = Math.atan2(dy, dx) * 180 / Math.PI;
            angleToTarget < 0 ? angleToTarget += 360 : "";

            this._viewObj.setRotation(-angleToTarget);
            if (-angleToTarget <= -90 && -angleToTarget >= -270) {
                this._viewObj.setScaleY(-this._viewObj.getScaleX());
            } else {
                this._viewObj.setScaleY(this._viewObj.getScaleX());
            }
        }
    },

    //获取最近的怪
    _getClosestMonster: function () {
        var closeMonster = null;
        var monsters = this._parent.getAllMosterInBattleLayer();
        var min = 999999;
        for (var i = 0, m = monsters.length; i < m; i++) {
            var monster = monsters[i];
            var temp = cc.pDistance(cc.p(monsters[i].x, monsters[i].y), cc.p(this._viewObj.x, this._viewObj.y));
            if (temp < min) {
                min = temp;
                closeMonster = monster;
            }
        }
        if (closeMonster)
            closeMonster.minl = min;
        return closeMonster;
    },

    _showBegin: function () {
        this._isShowBegin = true;

        this._viewObj.setScale(0.1);
        this._viewObj.setPosition(cc.p(cc.winSize.width / 2, cc.winSize.height / 3));

        this._viewObj.runAction(cc.scaleTo(0.5, CharacterConfig[this.name].scale));
        this._viewObj.runAction(cc.sequence(
            cc.moveTo(0.5, cc.p(cc.winSize.width / 2, cc.winSize.height / 2)),
            cc.callFunc(function () {
                this._isShowBegin = false;
                cc.eventManager.dispatchCustomEvent(SC.GAME_START);
            }, this)
        ));
    },

    _getAnimation: function (ex, type) {
        var animationCache = cc.animationCache;
        var spriteFrameCache = cc.spriteFrameCache;
        var animation = animationCache.getAnimation(ex + type);
        if (animation) {
            return cc.animate(animation);
        } else {
            var frames = [];
            for (var i = 0, len = CharacterConfig[this.name][type].frames.length; i < len; ++i) {
                var frame = CharacterConfig[this.name][type].frames[i];
                frames.push(cc.spriteFrameCache.getSpriteFrame(frame));
            }
            var animMixed = new cc.Animation(frames, CharacterConfig[this.name][type].aniRate);
            animMixed.setRestoreOriginalFrame(true);
            animationCache.addAnimation(animMixed, ex + type);
            return cc.animate(animMixed);
        }
    },

    _setWeapon: function (weaponName) {
        this._super(weaponName);
        this._weaponFire.visible = true;
        this._weaponFire.runAction(cc.sequence(
            this._getAnimation("Ironman", "weaponFire")
        ).repeatForever());
    },

    _resetWeapon: function () {
        this._super();
        this._weaponFire.visible = false;
        this._weaponFire.stopAllActions();
    }
});

/*
 var DemoFire = ParticleDemo.extend({
 onEnter: function () {
 this._super();
 this._emitter = new cc.ParticleFire();
 this._emitter.texture = cc.textureCache.addImage("res/characters/fire.png");
 if (this._emitter.setShapeType)
 this._emitter.setShapeType(cc.ParticleSystem.BALL_SHAPE);

 },
 title: function () {
 return "ParticleFire";
 }
 });*/
