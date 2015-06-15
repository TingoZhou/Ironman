/**
 * 怪物掉落道具
 */
var DropItem = cc.Sprite.extend({

    ctor: function (monster) {
        this._super(GameRes.drowItem.png);
        g_gamelayer.dropItemLayer.addChild(this);
        this.x = monster.getPosition().x;
        this.y = monster.getPosition().y;

        this.setScale(0);
        this.runAction(
            cc.sequence(
                cc.spawn(
                    cc.scaleTo(.3, .8),
                    cc.moveBy(.3, cc.p(10, 40))
                ).easing(cc.easeBackOut(.3)),
                cc.callFunc(
                    function () {

                    }
                    , this)
            )
        )


    },

    _move: function () {
        this._viewObj.x += this._velocity.x;
        this._viewObj.y += this._velocity.y;
    },

    update: function () {
        this._checkOverBorder();
    },

    _checkOverBorder: function () {
        var x = this._viewObj.x;
        var y = this._viewObj.y;
        if (x < 0 || x > cc.winSize.width || y < 0 || y > cc.winSize.height) {
            this._destroy();
            this._disable();
        }
    },

    //销毁
    _disable: function () {

    }


});