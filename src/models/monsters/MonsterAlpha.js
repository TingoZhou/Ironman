/**
 * Created with JetBrains WebStorm.
 * User: Tingo
 * Date: 15-5-28
 * Time: 下午8:21
 * To change this template use File | Settings | File Templates.
 */
var MonsterAlpha = (function() {
    var selfStatus = {
        MOVE_TO_TARGET: 'MoveToTarget'
    };

    return Monsters.extend({
        ctor: function(parent, data) {
            this._super(parent, data);
        },

        initData: function(parent, data) {
            this._parent = parent;
            this._monsterId = data.monsterId;
            if(!this._monsterId) return;
            var config = MonsterConfig.Alpha.values[this._monsterId];
            var bornPlace = data.bornPlace;
            this._properties.currentHP = config.HP + (this._level - 1) * config.levelEnhance.HP;
            this._properties.dps = config.dps + (this._level - 1) * config.levelEnhance.dps;
            this._speed = config.speed + (this._level - 1) * config.levelEnhance.speed;
            this._score = config.score + (this._level - 1) * config.levelEnhance.score;
            this._scale = config.scale;
            this._viewObj.setScale(this._scale);
            this._parent.addChild(this._viewObj);
            this._viewObj.setPosition(bornPlace);
            this._viewObj.visible = true;
            this._hurtable = true;
            this._movable = true;
        },

        start: function() {
            this.doMoveToTarget();
        },

        doMoveToTarget: function() {
            this._super();
            this._currentStatus = selfStatus.MOVE_TO_TARGET;
        },

        getAnimation: function(name) {
            var animationCache = cc.animationCache;
            var spriteFrameCache = cc.spriteFrameCache;
            switch(name) {
                case 'move':
                    var animation = animationCache.getAnimation('AlphaMove');
                    if(animation) {
                        return cc.animate(animation);
                    } else {
                        var moreFrames = [];
                        for (var i = 0, m = this.framesData.Move.length; i < m; i++) {
                            var frame = spriteFrameCache.getSpriteFrame(this.framesData.Move[i]);
                            moreFrames.push(frame);
                        }
                        var animMixed = new cc.Animation(moreFrames, 1 / (this.framesData.Move.length * this.framesData.speed));
                        animationCache.addAnimation(animMixed, 'AlphaMove');
                        return cc.animate(animMixed);
                    }
                    break;
            }
        },

        update: function(dt) {
            switch(this._currentStatus) {
                case selfStatus.MOVE_TO_TARGET:
                    if(this._movable) {
                        this._viewObj.x += this._stepX;
                        this._viewObj.y += this._stepY;
                    }
                    break;
            }

            if(!this._isDead && cc.rectIntersectsRect(this.getDamageBoundingBox(), this._target.getCollideBoundingBox())) {
                this._target.doHitByMonster(this._properties.dps);
            }

            if (!this._isDead && this.isDie()) {
                this.doDie(dt);
            }
        }
    });
})();

MonsterAlpha.preset = function(parent, data) {
    for(var i = 0; i < MonsterConfig.Alpha.presetAmount; i++) {
        MonsterAlpha.create(parent, data, true);
    }
};

MonsterAlpha.create = function(parent, data, createOnly) {
    var pool = cc.pool;
    createOnly = !_.isUndefined(createOnly) ? createOnly : false;
    if (!createOnly && pool.hasObject(MonsterAlpha)) {
        return pool.getFromPool(MonsterAlpha, parent, data);
    } else if(createOnly) {
        var monster = new MonsterAlpha(parent, data);
        cc.pool.putInPool(monster);
    } else {
        var monster = new MonsterAlpha(parent, data);
        cc.pool.putInPool(monster);
        return pool.getFromPool(MonsterAlpha, parent, data);
    }
};
