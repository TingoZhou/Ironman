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
            this._doExplosion();
        }, this));

        cc.eventManager.addCustomListener(SC.CHARACTER_FREEZE, _.bind(function (e) {
            this._doFreeze();
        }, this));
    },


    _doFreeze: function () {
        this.setColor(cc.color(118, 233, 241, 255));
        this.visible = true;
        var time = 0.03;
        this.runAction(
            cc.sequence(
                cc.sequence(
                    cc.fadeIn(time),
                    cc.delayTime(time),
                    cc.fadeOut(time),
                    cc.delayTime(time)
                ).repeat(2),
                cc.callFunc(function () {
                    this.visible = false;
                    this._FreezeMonster();
                }, this)
            )
        )
    },
    /**
     * 爆炸,爆炸后回调
     * @param callBackFun {Function}
     */
    _doExplosion: function () {
        this.setColor(cc.color(255, 255, 255, 255));
        this.visible = true;
        var time = 0.03;
        this.runAction(
            cc.sequence(
                cc.sequence(
                    cc.fadeIn(time),
                    cc.delayTime(time),
                    cc.fadeOut(time),
                    cc.delayTime(time)
                ).repeat(8),
                cc.callFunc(function () {
                    this.visible = false;
                    this._killMonster();
                }, this)
            )
        )
    },

    _FreezeMonster: function () {

        var monsters = Monsters.monstersOnStage;
        for (var i = 0, len = monsters.length; i < len; ++i) {
            var monster = monsters[i];
            // if (monster.active) {
            monster.freezeMonstersByBomb();
            //  }
        }

        this.scheduleOnce(
            function () {
                for (var i = 0, len = monsters.length; i < len; ++i) {
                    var monster = monsters[i];
                    monster.freezeRelease();
                }
            },
            5
        );


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