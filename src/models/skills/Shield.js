/**
 * Created with JetBrains WebStorm.
 * @author : 润荣
 * Date: 15-6-10
 * Time: 下午7:37
 * @version 1.0
 * @description  盾牌技能
 */

var Shield = cc.Sprite.extend({
    _target: null,
    ctor: function (target) {
        this._super(GameRes.skills.png);
        this._target = target;
        this.active = true;
    },

    start: function () {
        this._target._viewObj.addChild(this);

        this.setScale(1.2);
        this.setPosition(cc.p(this._target._viewObj.width / 2, this._target._viewObj.height / 2));
        this.runAction(
            cc.spawn(
                cc.sequence(
                    cc.scaleTo(.2, 1.22),
                    cc.scaleTo(.2, 1.20)
                ),
                cc.sequence(
                    cc.fadeTo(.2, 250),
                    cc.fadeTo(.2, 180)
                ),
                cc.rotateBy(.4, 20)
            ).repeatForever()
        )


        this.scheduleOnce(
            function () {

                this.stopAction();
                this.runAction(
                    cc.sequence(

                        cc.sequence(
                            cc.fadeTo(.2, 30),
                            cc.fadeTo(.1, 200)
                        ).repeat(3),

                        cc.callFunc(
                            function () {
                                this._destroy();
                            }
                            , this)
                    ))
            }.bind(this),
            6
        );


    },


    _destroy: function () {
        this._target._isShiel = false;
        this._target._viewObj.removeChild(this);
    },

    update: function () {
    }
});


