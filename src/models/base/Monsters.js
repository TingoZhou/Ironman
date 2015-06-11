/**
 * 怪物
 * User: Tingo
 * Date: 15-5-28
 * Time: 下午4:33
 * To change this template use File | Settings | File Templates.
 */
var MonsterStatus = {
    MOVE_TO_TARGET: 'moveToTarget',
    BEFORE_ATTACK: "beforeAttack",
    ATTACK: "attack",
    BACK_ATTACK: "backAttack"
}

var Monsters = Creature.extend({
    _DamageByType: null, //伤害类型，影响怪物爆炸类型

    ctor: function (parent, data) {
        this._super(parent, data);

        this.active = false;
        this._framesData = data.framesData;
        this._viewObj = new cc.Sprite('#' + this._framesData.Move[0]);
        this._viewObj.setName("monster");
        this._viewObj.visible = false;
        this._id = uuid();
        this._monsterId = '';
        this._level = 0;
        this._hasEvent = false;
        this._parent = null;
        this._isDead = false;
        this._hurtable = false;
        this._movable = true;
        this._target = null;
        this._currentStatus = '';
        this._hurtStep = 0;

        this._properties = {
            dps: 0,
            currentHP: 0
        };

        this._speed = 0;
        this._scale = 1;
        this._score = 0;
        this._stepX = 0;
        this._stepY = 0;
        this._targetPos = null;

        this.initData(parent, data);
    },

    initData: function (parent, data) {

//      this._parent = parent;
//      this._parent.addChild(this._viewObj);
        this._isDead = false;
        this._hurtable = true;
        this._isStriking = false;

        if (data.bornPlace) {
            this._viewObj.setPosition(cc.p(data.bornPlace.x, data.bornPlace.y));
        }

    },

    addListeners: function () {
    },

    start: function () {
    },

    doMoveToTarget: function () {

    },

    getMonsterId: function () {
        return this._id;
    },

    getPosition: function () {
        return this._viewObj.getPosition();
    },

    getDamageBoundingBox: function () {
        return this._viewObj.getBoundingBox();
    },

    getCollideBoundingBox: function () {
        return this._viewObj.getBoundingBox();
    },

    /* hurt: function (dps, bullet) {
     if (!this._hurtable || this._isDead) return;
     this._properties.currentHP -= dps;
     this._movable = false;
     var bulletPos = bullet.getPosition();
     var normalVect = cc.pNormalize(cc.pSub(this.getPosition(), bulletPos));
     var targetPlace = cc.pMult(normalVect, 50);
     var moveAction = cc.moveTo(0.25, targetPlace);
     var moveReverse = moveAction.reverse();
     this._viewObj.runAction(cc.sequence(moveAction, moveReverse, cc.callFunc(function () {
     this._movable = true;
     }, this)));
     },*/

    isDie: function () {
        if (this._properties.currentHP <= 0) {
            this.doDie();
        }
    },

    doDie: function () {
        this._isDead = true;
        this._hurtable = false;
    },

    disable: function () {
        if (!this.active) return;
        this._viewObj.visible = false;
        this.active = false;
        if (this._weapon) {
            this._weapon.removeDisplayWeapon();
        }

        this.unuse();
    },

    unuse: function () {
        var viewObj = this._viewObj;
        viewObj.stopAllActions();
        viewObj.visible = false;
        viewObj.retain();
        viewObj.removeFromParent(true);
        this._hitStatusRecover();
        this.active = false;

        for (var i = 0, len = Monsters.monstersOnStage.length; i < len; ++i) {
            var monster = Monsters.monstersOnStage[i];
            if (monster.getMonsterId() == this._id) {
                Monsters.monstersOnStage.splice(i, 1);
                break;
            }
        }
    },

    //移动
    _move: function () {

        if (this._target._isShiel) {
            //保护罩
            var d = cc.pDistance(cc.p(this.getPosition().x, this.getPosition().y), cc.p(this._target.getPosition().x, this._target.getPosition().y));
            if (d < 70) {
                this._viewObj.x -= this._stepX * 15;
                this._viewObj.y -= this._stepY * 15;
                return;
            }

            if (d < 85) {
                this._viewObj.x += this._target._velocity.x * this._target._speed;
                this._viewObj.y += this._target._velocity.y * this._target._speed;
                return;
            }
        }

    },


    /**
     * 冰冻恢复
     */
    freezeRelease: function () {


        this._viewObj.runAction(
            cc.sequence(
                cc.callFunc(function () {
                    this._viewObj.setColor(cc.color(255, 255, 255, 255));
                    this._viewObj.setBlendFunc(cc.SRC_ALPHA, cc.ONE_MINUS_SRC_ALPHA);
                }, this),
                cc.delayTime(.2),
                cc.callFunc(function () {
                    this._viewObj.setColor(cc.color(118, 233, 241, 255));
                    this._viewObj.setBlendFunc(cc.SRC_ALPHA, cc.ONE);
                }, this),
                cc.delayTime(.2),
                cc.callFunc(function () {
                    this._viewObj.setColor(cc.color(255, 255, 255, 255));
                    this._viewObj.setBlendFunc(cc.SRC_ALPHA, cc.ONE_MINUS_SRC_ALPHA);
                }, this),
                cc.delayTime(.2),
                cc.callFunc(function () {
                    this._viewObj.setColor(cc.color(118, 233, 241, 255));
                    this._viewObj.setBlendFunc(cc.SRC_ALPHA, cc.ONE);
                }, this),
                cc.delayTime(.2),
                cc.callFunc(function () {
                    this._viewObj.setColor(cc.color(255, 255, 255, 255));
                    this._viewObj.setBlendFunc(cc.SRC_ALPHA, cc.ONE_MINUS_SRC_ALPHA);
                }, this),
                cc.delayTime(.2),
                cc.callFunc(function () {
                    this._viewObj.setColor(cc.color(118, 233, 241, 255));
                    this._viewObj.setBlendFunc(cc.SRC_ALPHA, cc.ONE);
                }, this),
                cc.delayTime(.2),
                cc.callFunc(function () {
                    this._viewObj.setColor(cc.color(255, 255, 255, 255));
                    this._viewObj.setBlendFunc(cc.SRC_ALPHA, cc.ONE_MINUS_SRC_ALPHA);
                }, this),
                cc.delayTime(.2),
                cc.callFunc(function () {
                    this._viewObj.setColor(cc.color(118, 233, 241, 255));
                    this._viewObj.setBlendFunc(cc.SRC_ALPHA, cc.ONE);
                }, this),
                cc.delayTime(.2),
                cc.callFunc(function () {
                    this._viewObj.setColor(cc.color(255, 255, 255, 255));
                    this._viewObj.setBlendFunc(cc.SRC_ALPHA, cc.ONE_MINUS_SRC_ALPHA);
                }, this),
                cc.delayTime(.1),
                cc.callFunc(function () {
                    this._viewObj.setColor(cc.color(118, 233, 241, 255));
                    this._viewObj.setBlendFunc(cc.SRC_ALPHA, cc.ONE);
                }, this),
                cc.delayTime(.1),
                cc.callFunc(function () {
                    this._viewObj.setColor(cc.color(118, 233, 241, 255));
                    this._viewObj.setBlendFunc(cc.SRC_ALPHA, cc.ONE);
                }, this),
                cc.callFunc(function () {
                    this._viewObj.setColor(cc.color(255, 255, 255, 255));
                    this._viewObj.setBlendFunc(cc.SRC_ALPHA, cc.ONE_MINUS_SRC_ALPHA);
                }, this),
                cc.delayTime(.1),
                cc.callFunc(function () {
                    this._viewObj.setColor(cc.color(118, 233, 241, 255));
                    this._viewObj.setBlendFunc(cc.SRC_ALPHA, cc.ONE);
                }, this),
                cc.delayTime(.1),
                cc.callFunc(function () {
                    this._viewObj.setColor(cc.color(118, 233, 241, 255));
                    this._viewObj.setBlendFunc(cc.SRC_ALPHA, cc.ONE);
                }, this),
                cc.callFunc(function () {
                    this._isFreezing = false;
                    this._viewObj.setColor(cc.color(255, 255, 255, 255));
                    this._viewObj.setBlendFunc(cc.SRC_ALPHA, cc.ONE_MINUS_SRC_ALPHA);
                }, this)
            )
        )
    },

    /**
     * 冰冻
     */
    freezeMonstersByBomb: function () {

        this._viewObj.setColor(cc.color(118, 233, 241, 255));
        this._viewObj.setBlendFunc(cc.SRC_ALPHA, cc.ONE);
        this._isFreezing = true;

    },

    /**
     * 必杀爆炸
     * @param type {String}  //爆炸类型
     */
    hitMonstersByBomb: function (type) {
        this._properties.currentHP = 0;
        this._DamageByType = type;
    },

    /**
     * 被子弹碰撞时调用
     * @param bullet {Bullet}
     */
    hitMonstersByBullet: function (bullet) {
        if (!this._hurtable || this._isDead) return;
        //白闪
        this.strike();
        //减血
        this._properties.currentHP -= bullet.dps;
        //伤害类型
        this._DamageByType = bullet.name;
        //回退  //子弹类型
        if (bullet.name == "BulletRocket") {
            this._viewObj.x -= this._stepX * 8 * (4 * cc.random0To1());
            this._viewObj.y -= this._stepY * 8 * (4 * cc.random0To1());
        } else {
            this._viewObj.x -= this._stepX * 5;
            this._viewObj.y -= this._stepY * 5;
        }

    },

    // 死亡爆炸
    _doExplode: function () {

        //新建爆炸效果
        var explode = new MonsterExplodeEffect();
        explode.x = this._viewObj.x;
        explode.y = this._viewObj.y;
        this._parent.addChild(explode);
        explode.play(this._DamageByType);
        this.disable();
    },

    reuse: function (parent, data) {
        this.active = true;
        this.initData(parent, data);
        Monsters.monstersOnStage.push(this);

        if (!this._hasEvent) {
            this._hasEvent = true;
            this.addListeners();
        }
    },

    release: function () {
        this._hasEvent = false;
        this._viewObj.release();
    },

    update: function (dt) {


    }
});

Monsters.resetAll = function () {
    for (var i = 0; i < Monsters.monstersOnStage.length; ++i) {
        var b = Monsters.monstersOnStage[i];
        (function (m) {
            m.unuse();
            m.release();
        })(b);
    }
    Monsters.monstersOnStage = [];
}

// 场景里面的所有怪物
Monsters.monstersOnStage = [];

Monsters.updateAll = function (dt) {
    for (var i = 0; i < Monsters.monstersOnStage.length; i++) {
        var monster = Monsters.monstersOnStage[i];
        monster.update(dt);
    }
};

Monsters.create = function (parent, data) {
    var monstersName = SH.MONSTERSNAME;
    var monster = null;
    switch (data.name) {
        case monstersName.Alpha:
            monster = MonsterAlpha.create(parent, data);
            break;
        case monstersName.Beta:
            monster = MonsterBeta.create(parent, data);
            break;
        case monstersName.Charlie:
            monster = MonsterCharlie.create(parent, data);
            break;
    }
    return monster;
};

// 预设
Monsters.preset = function (parent) {
    MonsterAlpha.preset(parent, MonsterConfig.Alpha);
    MonsterBeta.preset(parent, MonsterConfig.Beta);
    MonsterCharlie.preset(parent, MonsterConfig.Charlie);
};

Monsters.resetAll = function () {
    for (var i = 0; i < Monsters.monstersOnStage.length; ++i) {
        Monsters.monstersOnStage[i].disable();
        Monsters.monstersOnStage[i].release();
    }
    Monsters.monstersOnStage = [];
};
