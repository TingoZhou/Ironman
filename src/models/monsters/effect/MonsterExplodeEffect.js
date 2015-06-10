/**
 * Created with JetBrains WebStorm.
 * @author : 润荣
 * Date: 15-6-8
 * Time: 下午4:34
 * @version 1.0
 * @description 怪物爆炸
 */
var MonsterExplodeEffect = cc.Sprite.extend({
    ctor: function () {


        this.tmpWidth = 0;
        this.tmpHeight = 0;
        this.active = true;

        var pFrame = cc.spriteFrameCache.getSpriteFrame("monsterExplode1.png");
        this._super(pFrame);
        this.setBlendFunc(cc.SRC_ALPHA, cc.ONE);

        this.tmpWidth = this.width;
        this.tmpHeight = this.height;
        this.scale = 0.5;
        this.animation = cc.animationCache.getAnimation("Explosion");
    },

    getAnimation: function (type) {
        var animFrames = [];
        var str = "";
        var animation =  cc.animationCache.getAnimation(type);
        if (animation)
            return cc.animate(animation);
        switch (type) {

            case "Bomb":
                for (var i = 0; i <= 6; i++) {
                    str = "BombEffect" + i + ".png";
                    var frame = cc.spriteFrameCache.getSpriteFrame(str);
                    animFrames.push(frame);
                }
                break;
            case "BulletRifle":
                for (var i = 1; i <= 8; i++) {
                    str = "weaponEffect" + i + ".png";
                    var frame = cc.spriteFrameCache.getSpriteFrame(str);
                    animFrames.push(frame);
                }
                break;
            case "BulletRocket":
                for (var i = 1; i <= 8; i++) {
                    str = "weaponEffect" + i + ".png";
                    var frame = cc.spriteFrameCache.getSpriteFrame(str);
                    animFrames.push(frame);
                }
                break;
            case "BulletElectric":
                for (var i = 1; i <= 8; i++) {
                    str = "weaponEffect" + i + ".png";
                    var frame = cc.spriteFrameCache.getSpriteFrame(str);
                    animFrames.push(frame);
                }
                break;

        }

        var animation = new cc.Animation(animFrames, 1 / 18);
        cc.animationCache.addAnimation(animation, type);
        return cc.animate(animation);
    },


    /**
     * 爆炸类型
     * @param type {String} 爆炸类型
     */
    play: function (type) {

        var animation = this.getAnimation(type);
        this.runAction(cc.sequence(
            animation,
            cc.callFunc(this.destroy, this)
        ));
    },
    destroy: function () {
        this.visible = false;
        this.active = false;
        this.removeFromParent(true);
    }
});

/*MonsterExplosion.sharedExplosion = function () {
 var animFrames = [];
 var str = "";
 for (var i = 1; i <= 18; i++) {
 str = "monsterExplode" + i + ".png";
 var frame = cc.spriteFrameCache.getSpriteFrame(str);
 animFrames.push(frame);
 }
 var animation = new cc.Animation(animFrames, 1 / 18);
 cc.animationCache.addAnimation(animation, "Explosion");
 };

 MonsterExplosion.getOrCreateExplosion = function () {
 var selChild = null;
 for (var j = 0, m = UM.CONTAINER.EXPLOSIONS.length; j < m; j++) {
 var selChild = UM.CONTAINER.EXPLOSIONS[j];
 if (selChild.active == false) {
 selChild.visible = true;
 selChild.active = true;
 selChild.play();
 return selChild;
 }
 }
 selChild = MonsterExplosion.create();
 selChild.play();
 return selChild;
 };*/

