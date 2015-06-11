/**
 * Created with JetBrains WebStorm.
 * @author : Ethan
 * Date: 15-6-2
 * Time: 上午11:02
 * @version 1.0
 * @description 怪物Bate
 */


var MonsterBeta = Monsters.extend({
    _ATTACK_COOLDOWN: 1.5,
    _ATTACKBEFORE_COOLDOWN: .5,

    ctor: function (parent, data) {
        this._super(parent, data);
    },

    initData: function (parent, data) {

        this._parent = parent;
        this._monsterId = data.monsterId;
        if (!this._monsterId) return;
        var config = MonsterConfig.Beta.values[this._monsterId];
        this._properties.currentHP = config.HP + (this._level - 1) * config.levelEnhance.HP;
        this._properties.dps = config.dps + (this._level - 1) * config.levelEnhance.dps;
        this._speed = config.speed + (this._level - 1) * config.levelEnhance.speed;
        this._score = config.score + (this._level - 1) * config.levelEnhance.score;
        this._scale = config.scale;
        this._viewObj.setScale(this._scale);
        this._parent.addChild(this._viewObj);
        this._viewObj.setPosition(data.bornPlace);
        this._viewObj.visible = true;
        this._hurtable = true;
        this._movable = true;
        this._target = Character.current;

        //
        this._attackCD = this._ATTACK_COOLDOWN;   //攻击CD
        this._attackBeforeCD = this._ATTACKBEFORE_COOLDOWN;  //攻击前储气
        this._saveTargetPosition = null;    //攻击前保存
        this._backPosition = null;
        this._super(parent, data);
    },

    start: function () {
        this.doMoveToTarget();
    },

    //往目标移动
    doMoveToTarget: function () {
        this._super();
        this._currentStatus = MonsterStatus.MOVE_TO_TARGET;
        this._viewObj.setSpriteFrame(this._framesData.Move[0]);
    },

    getAnimation: function (name) {

    },

    //移动
    _move: function () {
        this._super();
        if (this._currentStatus == MonsterStatus.ATTACK)return;
        if (this._currentStatus == MonsterStatus.BEFORE_ATTACK)return;
        if (this._currentStatus == MonsterStatus.BACK_ATTACK)return;
        var d = cc.pDistance(cc.p(this.getPosition().x, this.getPosition().y), cc.p(this._target.getPosition().x, this._target.getPosition().y));
        if (d >= 220) {
            this._viewObj.x += this._stepX;
            this._viewObj.y += this._stepY;
        } else {
            this._viewObj.x += cc.randomMinus1To1() * .6;
            this._viewObj.y += cc.randomMinus1To1() * .6;

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

    //攻击前准备 倒数
    _doAttackBefore: function (dt) {

        if (!this._backPosition && !this._saveTargetPosition) {

            this._viewObj.setSpriteFrame(this._framesData.Attack[0]);
            this._backPosition = this.getPosition();
            this._saveTargetPosition = this._target.getPosition();  //记录玩家位置；

            var d = cc.pDistance(cc.p(this._backPosition.x, this._backPosition.y), cc.p(this._saveTargetPosition.x, this._saveTargetPosition.y));
            if (d <= 120) {
                var winSize = cc.director.getWinSize();
                this._backPosition = cc.p(
                    cc.random0To1() * winSize.width
                    , cc.random0To1() * winSize.height
                )
            }
        }

        this._stepX = cc.randomMinus1To1();
        this._stepY = cc.randomMinus1To1();
        this._viewObj.x += this._stepX;
        this._viewObj.y += this._stepY;

        this._attackBeforeCD -= dt;
        if (this._attackBeforeCD <= 0) {
            this._doAttack();
        }
    },

    //攻击
    _doAttack: function () {
        if (this._currentStatus == MonsterStatus.ATTACK) return;
        this._currentStatus = MonsterStatus.ATTACK;
        this._viewObj.runAction(
            cc.sequence(
                cc.moveTo(0.05, cc.p(this._saveTargetPosition.x, this._saveTargetPosition.y)),
                cc.callFunc(function () {
                    this._doAttackBack();
                }, this)
            )
        )


    },

    //回退
    _doAttackBack: function () {
        if (this._currentStatus == MonsterStatus.BACK_ATTACK) return;
        this._currentStatus = MonsterStatus.BACK_ATTACK;

        this._viewObj.runAction(
            cc.sequence(
                cc.moveTo(0.2, cc.p(this._backPosition.x, this._backPosition.y)),
                cc.callFunc(function () {
                    this._attackCD = this._ATTACK_COOLDOWN;   //攻击CD
                    this.doMoveToTarget();
                }, this)
            )
        )
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
        this.isDie();
        if (this._isFreezing)return;
        switch (this._currentStatus) {
            case MonsterStatus.MOVE_TO_TARGET:

                if (this._movable) {
                    var targetPos = this._target.getPosition();
                    var normalVect = cc.pNormalize(cc.pSub(targetPos, this.getPosition()));
                    this._stepX = normalVect.x * this._speed;
                    this._stepY = normalVect.y * this._speed;

                    var d = cc.pDistance(cc.p(this._viewObj.x, this._viewObj.y), cc.p(targetPos.x, targetPos.y));
                    this._attackCD -= dt;
                    if (this._attackCD <= 0 && d <= 400 && !this._target._isShiel) {
                        this._attackBeforeCD = this._ATTACKBEFORE_COOLDOWN;
                        this._backPosition = null;
                        this._saveTargetPosition = null;
                        this._currentStatus = MonsterStatus.BEFORE_ATTACK;       //攻击前存气
                    }
                }
                break;
            case MonsterStatus.ATTACK:
                this._doAttack(); //攻击
                break;
            case MonsterStatus.BACK_ATTACK:
                this._doAttackBack(); //攻击后
                break;
            case MonsterStatus.BEFORE_ATTACK:     //攻击前准备
                this._doAttackBefore(dt); //攻击
                break;

        }

        this._checkCollideTarget();
        this._move();     //移动
        this._direction();  //方向

    }

})

MonsterBeta.monsters = [];

MonsterBeta.preset = function (parent, data) {
    for (var i = 0; i < MonsterConfig.Beta.presetAmount; i++) {
        MonsterBeta.monsters.push(new MonsterBeta(parent, data))
    }
};

MonsterBeta.create = function (parent, data, createOnly) {
    var monsterBeta = null;
    for (var i = 0, len = MonsterBeta.monsters.length; i < len; ++i) {
        var monster = MonsterBeta.monsters[i];
        if (!monster.active) {
            monsterBeta = monster;
        }
    }
    if (!monsterBeta) {
        monsterBeta = new MonsterBeta(parent, data);
    }
    monsterBeta.reuse(parent, data);
    return monsterBeta;
};