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
    ctor: function (parent, data) {
        this._super(parent, data);

        this.active = false;

        this._framesData = data.framesData;
        this._viewObj = new cc.Sprite('#' + this._framesData.Move[0]);
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
        this._parent = parent;
        this._parent.addChild(this._viewObj);
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

    hurt: function (dps, bullet) {
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
    },

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
        this.unuse();
    },

    unuse: function () {
        var viewObj = this._viewObj;
        viewObj.stopAllActions();
        viewObj.visible = false;
        viewObj.retain();
        viewObj.removeFromParent(true);

        this.active = false;

        for (var i = 0, len = Monsters.monstersOnStage.length; i < len; ++i) {
            var monster = Monsters.monstersOnStage[i];
            if (monster.getMonsterId() == this._id) {
                Monsters.monstersOnStage.splice(i, 1);
                break;
            }
        }
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
    }
});


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
