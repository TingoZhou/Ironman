/**
 * 文件加载场景
 * User: Tingo
 * Date: 15-2-26
 * Time: 下午5:06
 * To change this template use File | Settings | File Templates.
 */
var MainLoadingScene = cc.Scene.extend({
    onEnterTransitionDidFinish: function () {
        this._super();
        var layer = new MainLoadingLayer();
        this.addChild(layer);
    }
});

var MainLoadingLayer = (function () {
    var failCount = 0;
    var maxFailCount = 3;

    return cc.Layer.extend({
        ctor: function () {
            this._super();

            this._loadingWidget = null;
            this._loadingBg = null;
            this._loadingBar = null;
            this._loadingIcon = null;

            this._resourceIndex = 0;
            this._finishIndex = 0;

            this.init();
        },

        init: function () {
            this.playLoading();
        },

        playLoading: function () {
            if (!cc.sys.isNative) {
                this.loadGameConfig();
                return;
            }
            // 更新配置
            var storagePath = (jsb.fileUtils ? jsb.fileUtils.getWritablePath() : "./");
            var am = new jsb.AssetsManager("res/project.manifest", storagePath);
            am.retain();
            if (!am.getLocalManifest().isLoaded()) {
                this.loadGameConfig();
            } else {
                var self = this;
                var listener = new jsb.EventListenerAssetsManager(am, function (event) {
                    switch (event.getEventCode()) {
                        case jsb.EventAssetsManager.ERROR_NO_LOCAL_MANIFEST:
                            cc.log("No local manifest file found, skip assets update.");
                            self.loadGameConfig();
                            break;
                        case jsb.EventAssetsManager.UPDATE_PROGRESSION:
                            var percent = event.getPercent();
                            cc.log(percent + "%");
                            var msg = event.getMessage();
                            if (msg) {
                                cc.log(msg);
                            }
                            break;
                        case jsb.EventAssetsManager.ERROR_DOWNLOAD_MANIFEST:
                            cc.log("Fail to download manifest file, update skipped.");
                            self.loadGameConfig();
                            break;
                        case jsb.EventAssetsManager.ERROR_PARSE_MANIFEST:
                            cc.log("Fail to parse manifest file, update skipped.");
                            self.loadGameConfig();
                            break;
                        case jsb.EventAssetsManager.ALREADY_UP_TO_DATE:
                            cc.log("ALREADY_UP_TO_DATE.");
                            self.loadGameConfig();
                            break;
                        case jsb.EventAssetsManager.UPDATE_FINISHED:
                            cc.log("Update finished.");
                            self.loadGameConfig();
                            break;
                        case jsb.EventAssetsManager.UPDATE_FAILED:
                            cc.log("Update failed. " + event.getMessage());
                            failCount++;
                            if (failCount < maxFailCount) {
                                am.downloadFailedAssets();
                            }
                            else {
                                cc.log("Reach maximum fail count, exit update process");

                                failCount = 0;
                                self.loadGameConfig();
                            }
                            break;
                        case jsb.EventAssetsManager.ERROR_UPDATING:
                            cc.log("Asset update error: " + event.getAssetId() + ", " + event.getMessage());
                            self.loadGameConfig();
                            break;
                        case jsb.EventAssetsManager.ERROR_DECOMPRESS:
                            cc.log(event.getMessage());
                            self.loadGameConfig();
                            break;
                        default:
                            break;
                    }
                });
                cc.eventManager.addListener(listener, 1);
                am.update();
            }
        },

        loadGameConfig: function () {
            var self = this;

            var percent = 0;
            this.schedule(_.bind(function () {
                percent += 5;
                //this.loadingBar.setPercent(percent);
                //this.loadingIcon.setPositionX(this.loadingBg.getPosition().x - this.loadingBg.width / 2 + this.loadingBar.width * this.loadingBar.getPercent() / 100);
            }, this), 0.05, 7);
            self.schedule(function () {
                self.schedule(self.loadResource);
            }, 0.5, 0);
        },

        loadResource: function () {
            if (!main_resources[this._resourceIndex]) return;
            var self = this;


            cc.loader.load(main_resources[this._resourceIndex], function (result, count, loadedCount) {
                //self.loadingBar.setPercent(40 + Math.floor(50 * (self.resourceIndex / main_resources.length)));
                //self.loadingIcon.setPositionX(self.loadingBg.getPosition().x - self.loadingBg.width / 2 + self.loadingBar.width * self.loadingBar.getPercent() / 100);
            }, function () {
                self._finishIndex++;
                if (self._finishIndex >= main_resources.length) {
                    self.unschedule(self.loadResource);
                    self.initConfig();
                    self.addPlist();
                    //self.loadingBar.setPercent(100);
                    //self.loadingIcon.setPositionX(self.loadingBg.getPosition().x - self.loadingBg.width / 2 + self.loadingBar.width * self.loadingBar.getPercent() / 100);
                    self.schedule(self.finishedLoading, 0.1, 0);
                }
            });
            self._resourceIndex++;
        },

        initConfig: function () {

        },

        addPlist: function () {
            for (var i = 0, m = main_resources.length; i < m; i++) {
                if (main_resources[i].indexOf('.png') > 0) {
                    cc.textureCache.addImage(main_resources[i]);
                } else if (main_resources[i].indexOf('.plist') > 0) {
                    cc.spriteFrameCache.addSpriteFrames(main_resources[i]);
                }
            }
        },

        finishedLoading: function () {
            cc.log('On Preload Resources');

            var scene = new MainMenuScene();
            cc.director.runScene(new cc.TransitionFade(0.1, scene));
        }
    });
})();
