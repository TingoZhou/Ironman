/**
 * Created with JetBrains WebStorm.
 * @author : 润荣
 * Date: 15-6-10
 * Time: 下午7:37
 * @version 1.0
 * @description  冰
 */

var MonsterFreezeEffect = cc.Sprite.extend({
    _target: null,
    ctor: function (target) {
        this._super("#freeze000.png");
        this._target = target;
        this.active = true;
    },

    start: function () {
        this._target._viewObj.addChild(this);

        this.setScale(cc.random0To1() +.5);
        this.setPosition(cc.p(this._target._viewObj.width / 2, this._target._viewObj.height / 2));

        this.scheduleOnce(
            function () {
                var animation = this.getAnimation("Freeze");
                this.runAction(
                    cc.sequence(
                        //动画
                        animation,
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

    getAnimation: function (type) {
        var animFrames = [];
        var str = "";
        var animation = cc.animationCache.getAnimation(type);
        if (animation)
            return cc.animate(animation);
        switch (type) {
            case "Freeze":
                for (var i = 1; i <= 7; i++) {

                    str = "freeze_0000" + i + ".png";
                    var frame = cc.spriteFrameCache.getSpriteFrame(str);
                    animFrames.push(frame);
                }
                break;
        }

        var animation = new cc.Animation(animFrames, 1 / 9);
        cc.animationCache.addAnimation(animation, type);
        return cc.animate(animation);
    },

    _destroy: function () {
        this._target._viewObj.removeChild(this);
    }

});


