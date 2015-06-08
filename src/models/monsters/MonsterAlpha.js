/**
 * Created with JetBrains WebStorm.
 * User: Tingo
 * Date: 15-5-28
 * Time: 下午8:21
 * To change this template use File | Settings | File Templates.
 */

var MonsterAlpha = Monsters.extend({

        ctor: function (parent, data) {
            this._super(parent, data);
        },

        initData: function (parent, data) {

            this._parent = parent;
            this._monsterId = data.monsterId;
            if (!this._monsterId) return;
            var config = MonsterConfig.Alpha.values[this._monsterId];
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
            this._super(parent, data);
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
            var animationCache = cc.animationCache;
            var spriteFrameCache = cc.spriteFrameCache;

            var animation = animationCache.getAnimation(name);
            if (animation) {
                return cc.animate(animation);
            }

            var moreFrames = [];
            var delay = 0;
            switch (name) {
                case MonsterStatus.MOVE_TO_TARGET:

                    break;
                case MonsterStatus.ATTACK:
                    var vo = MonsterConfig.Alpha.framesData;
                    var array = vo.Attack;
                    delay = 1 / (array.length * vo.speed);
                    for (var i = 0, m = array.length; i < m; i++) {
                        var frame = spriteFrameCache.getSpriteFrame(array[i]);
                        moreFrames.push(frame);
                    }
                    break;
            }

            var animMixed = new cc.Animation(moreFrames, delay);
            cc.animationCache.addAnimation(animMixed, name);
            return cc.animate(animMixed);
        },

        //移动
        _move: function () {

            if (this._currentStatus == MonsterStatus.ATTACK) {
                var a = this._viewObj.isFlippedX() ? -1 : 1;
                this._stepX = cc.random0To1() * a;
                this._stepY = cc.random0To1() * a;
            }

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

        //攻击
        _doAttack: function () {

            if (this._currentStatus == MonsterStatus.ATTACK) return;
            this._currentStatus = MonsterStatus.ATTACK;
            var attackAnimate = this.getAnimation(MonsterStatus.ATTACK);          //播放动画
            this._viewObj.runAction(
                cc.sequence(
                    attackAnimate,
                    cc.callFunc(
                        function () {

                            this.doMoveToTarget();

                        }.bind(this)
                    )
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
                this._doAttack(); //攻击
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
            this.isDie();

        }
    })
    ;

MonsterAlpha.monsters = [];

MonsterAlpha.preset = function (parent, data) {
    for (var i = 0; i < MonsterConfig.Alpha.presetAmount; i++) {
        MonsterAlpha.monsters.push(new MonsterAlpha(parent, data))
    }
};

MonsterAlpha.create = function (parent, data, createOnly) {
    var monsterAlpha = null;
    for (var i = 0, len = MonsterAlpha.monsters.length; i < len; ++i) {
        var monster = MonsterAlpha.monsters[i];
        if (!monster.active) {
            monsterAlpha = monster;
        }
    }
    if (!monsterAlpha) {
        monsterAlpha = new MonsterAlpha(parent, data);
    }
    monsterAlpha.reuse(parent, data);
    return monsterAlpha;
};
