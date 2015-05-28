/**
 * 热更新
 * User: Tingo
 * Date: 15-4-24
 * Time: 下午1:42
 * To change this template use File | Settings | File Templates.
 */
/**
 * 自动更新js和资源
 */
var AssetsManagerLoaderScene = (function() {
    var failCount = 0;
    var maxFailCount = 3;
    /**
     * 私有属性的处理
     * @private
     */
    var _privateProperties = function() {
        var _am = null;
        var _progress = null;
        var _percent = 0;

        this.setAm = function(am) {
            _am = am;
        }
        this.getAm = function() {
            return _am;
        }
        this.setProgress = function(progress) {
            _progress = progress;
        }
        this.getProgress = function() {
            return _progress;
        }
        this.setPercent = function(percent) {
            _percent = percent;
        }
        this.getPercent = function() {
            return _percent;
        }
    };

    return cc.Scene.extend({
        ctor: function() {
            this._super();
            this._properties = new _privateProperties();
        },
        onEnterTransitionDidFinish: function(){
            if (!cc.sys.isNative) {
                this.loadGame();
                return;
            }
            var layer = new cc.Layer();
            this.addChild(layer);
            var progress = new cc.LabelTTF.create("update 0%", "Arial", 12);
            this._properties.setProgress(progress);
            progress.x = cc.winSize.width / 2;
            progress.y = cc.winSize.height / 2 + 50;
            layer.addChild(progress);
            var storagePath = (jsb.fileUtils ? jsb.fileUtils.getWritablePath() : "./");
            cc.log("storagePath is " + storagePath);
            var am = new jsb.AssetsManager("res/project.manifest", storagePath);
            this._properties.setAm(am);
            am.retain();
            if (!am.getLocalManifest().isLoaded())
//if (true)
            {
                cc.log("Fail to update assets, step skipped.");
                this.loadGame();
            }
            else
            {
                var that = this;
                var listener = new jsb.EventListenerAssetsManager(am, function(event) {
                    switch (event.getEventCode()){
                        case jsb.EventAssetsManager.ERROR_NO_LOCAL_MANIFEST:
                            cc.log("No local manifest file found, skip assets update.");
                            that.loadGame();
                            break;
                        case jsb.EventAssetsManager.UPDATE_PROGRESSION:
                            var percent = event.getPercent();
                            that._properties.setPercent(percent);
                            cc.log(percent + "%");
                            var msg = event.getMessage();
                            if (msg) {
                                cc.log(msg);
                            }
                            break;
                        case jsb.EventAssetsManager.ERROR_DOWNLOAD_MANIFEST:
                            cc.log("Fail to download manifest file, update skipped.");
                            that.loadGame();
                            break;
                        case jsb.EventAssetsManager.ERROR_PARSE_MANIFEST:
                            cc.log("Fail to parse manifest file, update skipped.");
                            that.loadGame();
                            break;
                        case jsb.EventAssetsManager.ALREADY_UP_TO_DATE:
                            cc.log("ALREADY_UP_TO_DATE.");
                            that.loadGame();
                            break;
                        case jsb.EventAssetsManager.UPDATE_FINISHED:
                            cc.log("Update finished.");
                            that.loadGame();
                            break;
                        case jsb.EventAssetsManager.UPDATE_FAILED:
                            cc.log("Update failed. " + event.getMessage());
                            failCount++;
                            if (failCount < maxFailCount)
                            {
                                am.downloadFailedAssets();
                            }
                            else
                            {
                                cc.log("Reach maximum fail count, exit update process");
                                failCount = 0;
                                that.loadGame();
                            }
                            break;
                        case jsb.EventAssetsManager.ERROR_UPDATING:
                            cc.log("Asset update error: " + event.getAssetId() + ", " + event.getMessage());
                            that.loadGame();
                            break;
                        case jsb.EventAssetsManager.ERROR_DECOMPRESS:
                            cc.log(event.getMessage());
                            that.loadGame();
                            break;
                        default:
                            break;
                    }
                });
                cc.eventManager.addListener(listener, 1);
                am.update();
                cc.director.runScene(this);
            }
            this.schedule(this.updateProgress, 0.5);
        },
        loadGame:function(){
//jsList是jsList.js的变量，记录全部js。
            cc.loader.loadJs(["src/common/config/businessConfig/BusinessConfigJsList.js"], function(){
                cc.loader.loadJs(BusinessConfigJsList, function() {
                    cc.director.runScene(new MainLoadingScene());
                });
            });
        },
        updateProgress:function(dt){
            var progress = this._properties.getProgress();
            var percent = this._properties.getPercent();
            progress.string = "update" + percent + "%";
        },
        onExit:function(){
            cc.log("AssetsManager::onExit");
            var am = this._properties.getAm();
            am && am.release();
            this._super();
        }
    });
})();