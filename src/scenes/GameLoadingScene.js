/**
 * 游戏Loading场景
 * User: Tingo
 * Date: 15-2-26
 * Time: 下午5:29
 * To change this template use File | Settings | File Templates.
 */

var GameLoadingScene = (function () {
    return cc.Scene.extend({
        onEnterTransitionDidFinish: function () {
            this._super();

            var layer = new GameLoadingLayer();
            this.addChild(layer);
        }
    });
})();

var GameLoadingLayer = (function () {
    return cc.Layer.extend({
        ctor: function () {
            this._super();

            /*this.loadingWidget = null;
             this.loadingBg = null;
             this.loadingBar = null;
             this.loadingIcon = null;*/

            this._resourceIndex = 0;
            this._finishIndex = 0;

            this.init();
        },

        init: function () {
            this.playLoading();
        },

        initConfig: function () {
            for (var mKey in MonsterConfig) {
                var mConfig = MonsterConfig[mKey];
                for (var k in MonstersBusinessConfig) {
                    if (MonstersBusinessConfig[k].resId == mConfig.resId) {
                        var mBusinessConfig = MonstersBusinessConfig[k];
                        mConfig['values'][k] = mBusinessConfig;
                    }
                }
            }
        },

        playLoading: function () {
            var percent = 0;
            /*this.schedule(_.bind(function () {
                percent += 5;
                //this.loadingBar.setPercent(percent);
                //this.loadingIcon.setPositionX(this.loadingBg.getPosition().x - this.loadingBg.width / 2 + this.loadingBar.width * this.loadingBar.getPercent() / 100);
            }, this), 0.05, 7);*/

            this._resourceIndex = 0;
            this._finishIndex = 0;
            var self = this;
            cc.loader.loadJs(["src/common/config/businessConfig/BusinessConfigJsList.js"], function () {
                cc.loader.loadJs(BusinessConfigJsList, function () {
                    self._resourceIndex = 0;
                    self._finishIndex = 0;
                    self.schedule(function () {
//                        self.schedule(self.loadResource);
                        self.loadResource();
                    }, 0.1, 0);
                });
            });
        },

        loadResource: function () {
//            if (!game_resources[this._resourceIndex]) return;

            var self = this;
            var finishIndex = 0;

//            cc.loader.load(game_resources[this._resourceIndex], function (result, count, loadedCount) {
            cc.loader.load(game_resources,
                function (result, count, loadedCount) {
                //self.loadingBar.setPercent(40 + Math.floor(50 * (self._resourceIndex / game_resources.length)));
                //self.loadingIcon.setPositionX(
                //self.loadingBg.getPosition().x - self.loadingBg.width / 2 + self.loadingBar.width * self.loadingBar.getPercent() / 100);
            }, _.bind(function () {
               // self._finishIndex++;
               // if (self._finishIndex >= game_resources.length) {
//                    self.unschedule(self.loadResource);
                    self.initConfig();
                    self.addPlist();
                    Monsters.preset(self);

                    Bullet.preset(self, SH.Bullet.Characters.Rifle);
                    Bullet.preset(self, SH.Bullet.Characters.Rocket);
                    Bullet.preset(self, SH.Bullet.Characters.Electric);

                    //self.loadingBar.setPercent(100);
                    //self.loadingIcon.setPositionX(
                    //self.loadingBg.getPosition().x - self.loadingBg.width / 2 + self.loadingBar.width * self.loadingBar.getPercent() / 100);
                    self.schedule(self.finishedLoading, 0.1, 0);
               // }
            }, this));

           // this._resourceIndex++;
        },

        finishedLoading: function () {
            //var scene = new GameScene();
            var scene = new StarGameScene();
            cc.director.runScene(new cc.TransitionFade(0.1, scene));
        },

        addPlist: function () {
            for (var i = 0, m = game_resources.length; i < m; i++) {
                if (game_resources[i].indexOf('.png') > 0) {
                    cc.textureCache.addImage(game_resources[i]);
                } else if (game_resources[i].indexOf('.plist') > 0) {
                    cc.spriteFrameCache.addSpriteFrames(game_resources[i]);
                }
            }
        }
    });
})();