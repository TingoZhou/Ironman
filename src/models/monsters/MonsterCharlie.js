/**
 * Created with JetBrains WebStorm.
 * @author : Ethan
 * Date: 15-6-2
 * Time: 下午2:10
 * @version 1.0
 * @description 怪物Charlie
 */

var MonsterCharlie = Monsters.extend({

    ctor: function (parent, data) {
        this._super(parent, data);
    },

    initData: function (parent, data) {

    },

    start: function () {
        this.doMoveToTarget();
    },

    //往目标移动
    doMoveToTarget: function () {
        this._super();
        this._currentStatus = MonsterAlphaStatus.MOVE_TO_TARGET;
    },


    getAnimation: function (name) {
        /* var animationCache = cc.animationCache;
         var spriteFrameCache = cc.spriteFrameCache;
         switch (name) {
         case 'move':
         var animation = animationCache.getAnimation('AlphaMove');
         if (animation) {
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
         }*/
    },

    update: function (dt) {

    }












});


MonsterCharlie.monsters = [];

MonsterCharlie.preset = function (parent, data) {
    for (var i = 0; i < MonsterConfig.Charlie.presetAmount; i++) {
        MonsterCharlie.monsters.push(new MonsterCharlie(parent, data))
    }
};

MonsterCharlie.create = function (parent, data, createOnly) {
    var monstercharlie = null;
    for (var i = 0, len = MonsterCharlie.monsters.length; i < len; ++i) {
        var monster = MonsterCharlie.monsters[i];
        if (!monster.active) {
            monstercharlie = monster;
        }
    }
    if (!monstercharlie) {
        monstercharlie = new MonsterCharlie(parent, data);
    }
    monstercharlie.reuse(parent, data);
    return monstercharlie;
};



