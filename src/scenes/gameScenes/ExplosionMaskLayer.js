/**
 * Created with JetBrains WebStorm.
 * @author : 润荣
 * Date: 15-6-10
 * Time: 上午11:06
 * @version 1.0
 * @description
 */
var ExplosionMaskLayer = cc.LayerColor.extend({
    ctor: function () {
        this._super(cc.color(255, 255, 255, 255));
        this.init();
    },

    init: function () {
        this.visible = false;
        this.addListeners();
    },

    addListeners: function () {
        cc.eventManager.addCustomListener(SC.CHARACTER_BOMB, _.bind(function (e) {
            this.doExplosion();
        }, this));

    },

    /**
     * 爆炸,爆炸后回调
     * @param callBackFun {Function}
     */
    doExplosion: function () {
        this.visible = true;
        var time = 0.04;
        this.runAction(
            cc.sequence(
                cc.fadeIn(time),
                cc.delayTime(time),
                cc.fadeOut(time),
                cc.delayTime(time),
                cc.fadeIn(time),
                cc.delayTime(time),
                cc.fadeOut(time),
                cc.delayTime(time),
                cc.fadeIn(time),
                cc.delayTime(time),
                cc.fadeOut(time),
                cc.delayTime(time),
                cc.fadeIn(time),
                cc.callFunc(function () {
                    this.visible = false;
                    this._killMonster();
                }, this))
        )
    },

    _killMonster: function () {

        var monsters = Monsters.monstersOnStage;
        for (var i = 0, len = monsters.length; i < len; ++i) {
            var monster = monsters[i];
            if (monster.active) {
                monster.hitMonstersByBomb("Bomb");
            }
        }

    },


    update: function (dt) {

    }
})