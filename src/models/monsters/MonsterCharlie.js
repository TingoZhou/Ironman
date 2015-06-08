/**
 * Created with JetBrains WebStorm.
 * @author : Ethan
 * Date: 15-6-2
 * Time: 下午2:10
 * @version 1.0
 * @description 怪物Charlie
 */

var MonsterCharlie = Monsters.extend({
    _weapon: null,    //武器
    ctor: function (parent, data) {
        this._super(parent, data);
    },

    initData: function (parent, data) {

        this._parent = parent;
        this._monsterId = data.monsterId;
        if (!this._monsterId) return;
        var config = MonsterConfig.Charlie.values[this._monsterId];
        this._properties.currentHP = config.HP + (this._level - 1) * config.levelEnhance.HP;
        this._properties.dps = config.dps + (this._level - 1) * config.levelEnhance.dps;
        this._speed = config.speed + (this._level - 1) * config.levelEnhance.speed;
        this._score = config.score + (this._level - 1) * config.levelEnhance.score;
        this._scale = config.scale;
        this._viewObj.setScale(this._scale);
        this._parent.addChild(this._viewObj, 1);
        this._viewObj.setPosition(data.bornPlace);
        this._viewObj.visible = true;
        this._hurtable = true;
        this._movable = true;
        this._target = Character.current;

        this._initWeapon();
        this._super(parent, data);
    },

    start: function () {
        this.doMoveToTarget();
    },


    //设置武器
    _initWeapon: function () {
        this._weapon = Weapon.create(SH.Weapon.Monster.Rifle, this._parent);
        this._weapon.setUser(this._viewObj);
    },

    /**
     * 被子弹碰撞时调用
     * @param bullet {Bullet}
     */
    hitMonstersByBullet: function (bullet) {
        this._super(bullet);
    },

    //往目标移动
    doMoveToTarget: function () {
        this._super();
        this._currentStatus = MonsterStatus.MOVE_TO_TARGET;
    },

    getAnimation: function (name) {

    },

    //开火
    _shoot: function (dt) {
        this._weapon && this._weapon.update(dt);
    },

    //移动
    _move: function () {
        if (this._currentStatus == MonsterStatus.ATTACK)return;
        var d = cc.pDistance(cc.p(this.getPosition().x, this.getPosition().y), cc.p(this._target.getPosition().x, this._target.getPosition().y));
        if (d >= 220) {
            this._viewObj.x += this._stepX + cc.randomMinus1To1() * .3;
            this._viewObj.y += this._stepY + cc.randomMinus1To1() * .3;
        } else {
            this._viewObj.x += cc.randomMinus1To1() * .3;
            this._viewObj.y += cc.randomMinus1To1() * .3;
        }
    },

    //方向
    _direction: function () {
        var targetPos = this._target.getPosition();
        var angle = Math.atan2((targetPos.y - this.getPosition().y), (targetPos.x - this.getPosition().x)) * 180 / Math.PI;
        if (angle < 0) angle += 360;
        this._viewObj.setRotation(-angle);
        if (-angle <= -90 && -angle >= -270) {
            this._viewObj.setFlippedY(true);
        } else {
            this._viewObj.setFlippedY(false);
        }
    },

    //override
    doDie: function () {

        if (!this._isDead) {
            this._isDead = true;
            this._hurtable = false;
            this._doExplode();
        }
    },

    //碰撞目标
    _checkCollideTarget: function () {
        if (cc.rectIntersectsRect(this.getDamageBoundingBox(), this._target.getCollideBoundingBox())) {

        }
    },

    update: function (dt) {
        switch (this._currentStatus) {
            case MonsterStatus.MOVE_TO_TARGET:
                if (this._movable) {
                    var targetPos = this._target.getPosition();
                    var normalVect = cc.pNormalize(cc.pSub(targetPos, this.getPosition()));
                    this._stepX = normalVect.x * this._speed;
                    this._stepY = normalVect.y * this._speed;
                }
                break;
            case MonsterStatus.ATTACK:
                break;
        }
        this._checkCollideTarget();
        this._move();     //移动
        this._direction();  //方向
        this._shoot(dt);  //射击
        this.isDie();


    }
});

MonsterCharlie.monsters = [];

MonsterCharlie.preset = function (parent, data) {
    for (var i = 0; i < MonsterConfig.Charlie.presetAmount; i++) {
        MonsterCharlie.monsters.push(new MonsterCharlie(parent, data))
    }
};

MonsterCharlie.create = function (parent, data, createOnly) {
    var monstercharlie = null;
    for (var i = 0, len = MonsterCharlie.monsters.length; i < len; ++i) {
        var monster = MonsterCharlie.monsters[i];

        if (!monster.active) {
            monstercharlie = monster;
        }

    }
    if (!monstercharlie) {
        monstercharlie = new MonsterCharlie(parent, data);
    }
    monstercharlie.reuse(parent, data);
    return monstercharlie;
};



