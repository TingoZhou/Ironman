var WeaponRocket = Weapon.extend({
    _viewObj: null,

    ctor: function (parent) {
        this._super(parent);
        this._initView();

    },

    _initView: function () {

    },

    /**
     * 需要显示图片的，增加武器显示
     * @param user {cc.Sprite}
     */
    addDisplayWeapon: function (user) {

        if (this._viewObj) {

        } else {
            this._viewObj = new cc.Sprite(WeaponConfig.Rocket.res);
            this._viewObj.setScale(user.getScale());
            this._viewObj.x = 105;
            this._viewObj.y = 100;
            this._viewObj.setAnchorPoint(cc.p(0, 0));
            this._viewObj.setRotation(-90);
            this._user = user;
            this._user.addChild(this._viewObj, -1);
        }
    },

    update: function () {
        this._super();
        if (this._step % WeaponConfig.Rocket.shootStep == 0) {
            this._shoot();
        }
    },

    _shoot: function () {
        this._super();
        //播放动画
        if (this._viewObj) {
            this._viewObj.runAction(
                cc.sequence(
                    cc.rotateTo(.1, 0),
                    cc.callFunc(function () {
                        var p = this._viewObj.convertToWorldSpace(this._viewObj.getPosition());
                        Bullet.create(this._parent, SH.Bullet.Characters.Rocket,p);
                    }, this)
                )
            )
        }
    },

    removeDisplayWeapon: function () {
        if (this._viewObj) {
            this._viewObj.runAction(
                cc.sequence(
                    cc.rotateTo(.1, -90),
                    cc.callFunc(function () {
                        this._user.removeChild(this._viewObj);
                    }, this)
                )
            )
        }

    }


});

/*
 cc.delayTime(0.3),
 cc.callFunc(function () {
 this._viewObj.runAction(
 cc.sequence(
 cc.rotateTo(.1, -90),
 cc.callFunc(function () {
 this._user.removeChild(this._viewObj);
 }, this)
 )
 )
 }, this)*/
