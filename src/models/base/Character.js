var Character = Creature.extend({
    isDead: null,
    ctor: function (parent) {
        this._super();

        this._step = 0;
        this._parent = parent;

        this._viewObj = null;
        this._speed = 0;
        this._weapon = null;
        this._velocity = {x: 0, y: 0};
        this._TotalHP = 100
        this._HP = this._TotalHP;

        this._moveBuffer = {x: 0, y: 0};
        this._shadowObjs = [];
        this._isShowBegin = false;
        this.isDead = false;
    },

    init: function () {
        this._HP = CharacterConfig[this.name].HP;
        this._speed = CharacterConfig[this.name].speed;

        for (var i = 0; i < 20; ++i) {
            var shadow = cc.Sprite.create(CharacterConfig[this.name].res);
            shadow.visible = false;
            shadow.setOpacity(255);
            this._parent.addChild(shadow);
            this._shadowObjs.push(shadow);
        }
    },

    addListeners: function () {
        cc.eventManager.addCustomListener(SC.CHARACTER_SET_WEAPON, _.bind(function (e) {
            this._setWeapon(e.getUserData().weaponName);
        }, this));
        cc.eventManager.addCustomListener(SC.CHARACTER_RESET_WEAPON, _.bind(function (e) {
            this._resetWeapon();
        }, this));
    },

    setVelocity: function (velocity) {
        this._velocity.x = this._speed * velocity.vX;
        this._velocity.y = this._speed * velocity.vY;
    },

    setPosition: function (pos) {
        this._viewObj.setPosition(pos);
    },

    getPosition: function () {
        return this._viewObj.getPosition();
    },

    getScaleX: function () {
        return this._viewObj.scaleX;
    },

    doHitByMonster: function (dps, bullet) {

        if (this._isShiel) return;
        if (this.isDead) return;
        this._HP -= dps;
        this.strike();

        //扣血
        cc.eventManager.dispatchCustomEvent(SC.HP_UPDATE, {
            HP: Math.max(this._HP, 0), TotalHP: this._TotalHP
        });

        //死亡
        if (this._HP <= 0) {
            this._doDie();
        }
    },

    _doDie: function () {
        this.isDead = true;
        cc.eventManager.dispatchCustomEvent(SC.IRONMAN_DIE);

        this._viewObj.runAction(
            cc.spawn(
                cc.moveBy(.5, cc.p(cc.randomMinus1To1() * 50, -100)),
                cc.rotateBy(.5, 220)
            ).repeat(5)
        )
    },

    getCollideBoundingBox: function () {
        return this._viewObj.getBoundingBox();
    },

    getRotation: function () {
        return this._viewObj.getRotation();
    },

    showShoot: function () {
    },

    update: function () {
        ++this._step;
        this._move();
        this._changeDirection();
        this._weapon && this._weapon.update();
    },

    _move: function () {
        if (this.isDead) return;
        if (this._velocity.x != 0 || this._velocity.y != 0) {
            this._viewObj.x += this._velocity.x;
            this._viewObj.y += this._velocity.y;

            for (var i = 0, len = this._shadowObjs.length; i < len; ++i) {
                if (!this._shadowObjs[i].visible) {
                    shadow = this._shadowObjs[i];
                    shadow.visible = true;
                    break;
                }
            }

            if (!shadow) {
                shadow = cc.Sprite.create(CharacterConfig[this.name].res);
                this.parent.addChild(shadow);
                this._shadowObjs.push(shadow);
            }

            shadow.setOpacity(50);
            shadow.setScaleX(this._viewObj.scaleX);
            shadow.setScaleY(this._viewObj.scaleY);
            shadow.setPosition(this._viewObj.getPosition());
            shadow.setRotation(this._viewObj.getRotation());
            shadow.runAction(cc.sequence(
                cc.fadeOut(0.05),
                cc.callFunc((function (shadow) {
                    return function () {
                        shadow.visible = false;
                    }
                })(shadow), this)
            ));
        } else {
            if (this._step % 10 == 0) {
                this._moveBuffer = {
                    x: (Math.random() > 0.5 ? -1 : 1) * Math.random() / 5,
                    y: (Math.random() > 0.5 ? -1 : 1) * Math.random() / 5
                }
            }
            this._viewObj.x += this._moveBuffer.x;
            this._viewObj.y += this._moveBuffer.y;
        }

        this._viewObj.x = Math.min(cc.winSize.width, Math.max(0, this._viewObj.x));
        this._viewObj.y = Math.min(cc.winSize.height, Math.max(0, this._viewObj.y));
    },

    _setWeapon: function (weaponName) {
        this._weapon = Weapon.create(weaponName, this._parent);
        this._weaponFire.setPosition(CharacterConfig[this.name].weaponFire.buffer);

        if (weaponName == "Rocket") {     //导弹位置改变
            this._weaponFire.setPosition(cc.p(CharacterConfig[this.name].weaponFire.buffer.x + 25, CharacterConfig[this.name].weaponFire.buffer.y + 40));
        }

        this._weapon.addDisplayWeapon(this._viewObj);
    },

    _resetWeapon: function () {
        if (this._weapon)
            this._weapon.removeDisplayWeapon();
        this._weapon = null;
    },

    _changeDirection: function () {
        var vX = this._velocity.x;
        var vY = this._velocity.y;

        var rotation = this._viewObj.getRotation();

        if (vX == 0) {
            if (vY > 0) {
                rotation = 0;
            } else if (vY < 0) {
                rotation = 180;
            }
        } else if (vY == 0) {
            if (vX > 0) {
                rotation = 90;
            } else if (vX < 0) {
                rotation = 270;
            }
        } else {
            rotation = Math.atan(vY / vX) * 180 / Math.PI;
            this._viewObj.setScaleX((vX < 0 ? -1 : 1) * Math.abs(this._viewObj.scaleX));
            rotation = -rotation;
        }

        this._viewObj.setRotation(rotation);
    }
});

Character.current = null;

Character.create = function (type, parent) {
    switch (type) {
        case SH.Character.Ironman:
            Character.current = new Ironman(parent);
            break;
    }
    return Character.current;
}
