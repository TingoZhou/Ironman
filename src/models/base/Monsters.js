/**
 * 怪物
 * User: Tingo
 * Date: 15-5-28
 * Time: 下午4:33
 * To change this template use File | Settings | File Templates.
 */
var Monsters = (function() {
    return cc.Class.extend({
        ctor: function(parent, data) {

            this._framesData = data.framesData;
            this._viewObj = new cc.Sprite('#' + this._framesData[0]);
            this._active = false;
            this._id = uuid();
            this._monsterId = '';
            this._level = 0;
            this._hasEvent = false;
            this._parent = null;
            this._isDead = false;
            this._hurtable = false;
            this._movable = true;
            this._isStriking = false;
            this._target = Character.current;
            this._currentStatus = '';
            this._whiteShader = null;
            this._whiteRecoeverShader = null;
            this._properties = {
                dps: 0,
                currentHP: 0
            };
            this._speed = 0;
            this._scale = 1;
            this._score = 0;
            this._stepX = 0;
            this._stepY = 0;

            this.initShader();
            this.initData(parent, data);
        },

        initShader: function() {
            if(cc.sys.isNative) {
                this._whiteShader = new cc.GLProgram(GameRes.shaders.whiteHit.vsh_noMVP, GameRes.shaders.whiteHit.fsh);
                this._whiteShader.link();
                this._whiteShader.updateUniforms();
                this._whiteShader.retain();

                this._whiteRecoeverShader = new cc.GLProgram(GameRes.shaders.whiteHitRecover.vsh_noMVP, GameRes.shaders.whiteHitRecover.fsh);
                this._whiteRecoeverShader.link();
                this._whiteRecoeverShader.updateUniforms();
                this._whiteRecoeverShader.retain();
            } else {
                this._whiteShader = new cc.GLProgram(GameRes.shaders.whiteHit.vsh, GameRes.shaders.whiteHit.fsh);
                this._whiteShader.addAttribute(cc.ATTRIBUTE_NAME_POSITION, cc.VERTEX_ATTRIB_POSITION);
                this._whiteShader.addAttribute(cc.ATTRIBUTE_NAME_TEX_COORD, cc.VERTEX_ATTRIB_TEX_COORDS);
                this._whiteShader.addAttribute(cc.ATTRIBUTE_NAME_COLOR, cc.VERTEX_ATTRIB_COLOR);

                this._whiteShader.link();
                this._whiteShader.updateUniforms();
                this._whiteShader.use();

                this._whiteRecoeverShader = new cc.GLProgram(GameRes.shaders.whiteHitRecover.vsh, GameRes.shaders.whiteHitRecover.fsh);
                this._whiteRecoeverShader.addAttribute(cc.ATTRIBUTE_NAME_POSITION, cc.VERTEX_ATTRIB_POSITION);
                this._whiteRecoeverShader.addAttribute(cc.ATTRIBUTE_NAME_TEX_COORD, cc.VERTEX_ATTRIB_TEX_COORDS);
                this._whiteRecoeverShader.addAttribute(cc.ATTRIBUTE_NAME_COLOR, cc.VERTEX_ATTRIB_COLOR);

                this._whiteRecoeverShader.link();
                this._whiteRecoeverShader.updateUniforms();
                this._whiteRecoeverShader.use();
            }
        },

        initData: function(parent, data) {
            this._parent = parent;
            this._parent.addChild(this._viewObj);
            if(data.bornPlace) {
                this._viewObj.setPosition(cc.p(data.bornPlace.x, data.bornPlace.y));
            }
        },

        start: function() {

        },

        doMoveToTarget: function() {
            var targetPos = this._target.getPosition();
            var normalVect = cc.pNormalize(cc.pSub(targetPos, this.getPosition()));
            this._stepX = normalVect.x * this._speed;
            this._stepY = normalVect.y * this._speed;
        },

        getMonsterId: function() {
            return this._id;
        },

        getPosition: function() {
            return this._viewObj.getPosition();
        },

        getDamageBoundingBox: function() {
            return this._viewObj.getBoundingBox();
        },

        getCollideBoundingBox: function() {
            return this._viewObj.getBoundingBox();
        },

        hurt: function(dps, bullet) {
            if(!this._hurtable || this._isDead) return;
            this._properties.currentHP -= dps;
            this._movable = false;
            var bulletPos = bullet.getPosition();
            var normalVect = cc.pNormalize(cc.pSub(this.getPosition(), bulletPos));
            var targetPlace = cc.pMult(normalVect, 50);
            var moveAction = cc.moveTo(0.25, targetPlace);
            var moveReverse = moveAction.reverse();
            this._viewObj.runAction(cc.sequence(moveAction, moveReverse, cc.callFunc(function() {
                this._movable = true;
            }, this)));
        },

        strike: function(callback) {
            if(!this._isStriking) {
                this._isStriking = true;
                var whiteHit = cc.callFunc(function() {
                    this._whiteHit();
                }, this);
                var whiteHitRecover = cc.callFunc(function() {
                    this._whiteHitRecover();
                }, this);
                this._viewObj.runAction(cc.sequence(whiteHit, cc.delayTime(0.05), whiteHitRecover, cc.delayTime(0.05),
                    whiteHit, cc.delayTime(0.05), whiteHitRecover, cc.delayTime(0.05),
                    cc.callFunc(function() {
                        this._isStriking = false;
                        callback && callback();
                    }, this)
                ));
            }
        },

        isDie: function() {
            if(this._properties.currentHP <= 0) {
                this.doDie();
            }
        },

        doDie: function() {
            this._isDead = true;
            this._hurtable = false;
        },

        disable: function() {
            if(!this._active) return;
            this._viewObj.visible = false;
            this._active = false;
            cc.pool.putInPool(this);
        },

        unuse: function() {
            var viewObj = this._viewObj;
            viewObj.stopAllActions();
            viewObj.visible = false;
            viewObj.retain();
            viewObj.removeFromParent(true);

            this._active = false;

            for (var i = 0, len = Monsters.monstersOnStage.length; i < len; ++i) {
                var monster = Monsters.monstersOnStage[i];
                if (monster.getMonsterId() == this._id) {
                    Monsters.monstersOnStage.splice(i , 1);
                    break ;
                }
            }
        },

        reuse: function(parent, data) {
            this.initData(parent, data);
            this._active = true;
            this._viewObj.visible = false;
            Monsters.monstersOnStage.push(this);

            if (!this._hasEvent) {
                this._hasEvent = true;
                this.addListeners();
            }
        },

        release: function() {
            this._hasEvent = false;
            this._viewObj.release();
        },

        // 白闪
        _whiteHit: function() {
            if(cc.sys.isNative) {
                var glProgram_state = cc.GLProgramState.getOrCreateWithGLProgram(this._whiteShader);
                this._viewObj.setGLProgramState(glProgram_state);
            } else {
                this._viewObj.shaderProgram = this._whiteShader;
            }
        },

        // 白闪恢复
        _whiteHitRecover: function() {
            if(cc.sys.isNative) {
                var glProgram_state = cc.GLProgramState.getOrCreateWithGLProgram(this._whiteRecoeverShader);
                this._viewObj.setGLProgramState(glProgram_state);
            } else {
                this._viewObj.shaderProgram = this._whiteRecoeverShader;
            }
        },

        _hitStatusRecover: function() {
            this._isStriking = false;
            this._whiteHitRecover();
        }
    });
})();

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
    }
    return monster;
};

// 预设
Monsters.preset = function (parent, data) {
    MonsterAlpha.preset(parent, data);
};

Monsters.resetAll = function () {
    for (var i = 0; i < Monsters.monstersOnStage.length; ++i) {
        Monsters.monstersOnStage[i].disable();
    }
    Monsters.monstersOnStage = [];
};
