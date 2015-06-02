/**
 * Created with JetBrains WebStorm.
 * @author : Ethan
 * Date: 15-6-2
 * Time: 上午11:02
 * @version 1.0
 * @description 怪物Bate
 */


var MonsterBeta = Monsters.extend({
        _ATTACK_COOLDOWN: 3,
        _ATTACKBEFORE_COOLDOWN: 1,

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
            this._backPosition = null;
        },

        start: function () {
            this.doMoveToTarget();
        },

        //往目标移动
        doMoveToTarget: function () {
            this._super();
            this._currentStatus = MonsterStatus.MOVE_TO_TARGET;
        },

        getAnimation: function (name) {

        },

        //移动
        _move: function () {

            if (this._currentStatus == MonsterStatus.ATTACK)return;
            if (this._currentStatus == MonsterStatus.BEFORE_ATTACK)return;
            if (this._currentStatus == MonsterStatus.BACK_ATTACK)return;
            this._viewObj.x += this._stepX;
            this._viewObj.y += this._stepY;
        },
        //方向
        _direction: function () {
            /*  var targetPos = this._target.getPosition();
             var angle = Math.atan2((targetPos.y - this.getPosition().y), (targetPos.x - this.getPosition().x)) * 180 / Math.PI;
             if (angle < 0) angle += 360;
             */

            //只有2个方向，左右
            if (this._viewObj && this._stepX >= 0) {   //左
                this._viewObj.setFlippedX(false);
            } else {
                this._viewObj.setFlippedX(true);
            }
        },

        //攻击前准备 倒数1秒
        _doAttackBefore: function (dt) {
            this._backPosition = this.getPosition();
            this._attackBeforeCD -= dt;
            if (this._attackBeforeCD <= 0) {
                this._doAttack();
            }
        },

        //攻击
        _doAttack: function () {
            if (this._currentStatus == MonsterStatus.ATTACK) return;
            this._currentStatus = MonsterStatus.ATTACK;
            this._stepX = this._stepX * 22;
            this._stepY = this._stepY * 22;
            this._viewObj.x += this._stepX;
            this._viewObj.y += this._stepY;
            this._currentStatus = MonsterStatus.BACK_ATTACK;
        },

        _doAttackBack: function () {
            cc.log(this._backPosition);
            this._viewObj.x = this._backPosition.x;
            this._viewObj.y = this._backPosition.y;
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

                        this._attackCD -= dt;
                        if (this._attackCD <= 0) {
                            this._attackBeforeCD = this._ATTACKBEFORE_COOLDOWN;
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
    ;


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