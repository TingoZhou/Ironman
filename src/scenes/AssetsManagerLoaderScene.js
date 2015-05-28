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
var AssetsManagerLoaderScene = cc.Scene.extend({
    _am:null,
    _progress:null,
    _percent:0,
    onEnterTransitionDidFinish: function(){
        if (!cc.sys.isNative) {
            this.loadGame();
            return;
        }
        var layer = new cc.Layer();
        this.addChild(layer);
        this._progress = new cc.LabelTTF.create("update 0%", "Arial", 12);
        this._progress.x = cc.winSize.width / 2;
        this._progress.y = cc.winSize.height / 2 + 50;
        layer.addChild(this._progress);
        var storagePath = (jsb.fileUtils ? jsb.fileUtils.getWritablePath() : "./");
        cc.log("storagePath is " + storagePath);
        this._am = new jsb.AssetsManager("res/project.manifest", storagePath);
        this._am.retain();
        if (!this._am.getLocalManifest().isLoaded())
//if (true)
        {
            cc.log("Fail to update assets, step skipped.");
            this.loadGame();
        }
        else
        {
            var that = this;
            var listener = new jsb.EventListenerAssetsManager(this._am, function(event) {
                switch (event.getEventCode()){
                    case jsb.EventAssetsManager.ERROR_NO_LOCAL_MANIFEST:
                        cc.log("No local manifest file found, skip assets update.");
                        that.loadGame();
                        break;
                    case jsb.EventAssetsManager.UPDATE_PROGRESSION:
                        that._percent = event.getPercent();
                        cc.log(that._percent + "%");
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
                        AssetsManagerLoaderScene.failCount++;
                        if (AssetsManagerLoaderScene.failCount < AssetsManagerLoaderScene.maxFailCount)
                        {
                            that._am.downloadFailedAssets();
                        }
                        else
                        {
                            cc.log("Reach maximum fail count, exit update process");
                            AssetsManagerLoaderScene.failCount = 0;
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
            this._am.update();
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
        this._progress.string = "update" + this._percent + "%";
    },
    onExit:function(){
        cc.log("AssetsManager::onExit");
        this._am && this._am.release();
        this._super();
    }
});

AssetsManagerLoaderScene.failCount = 0;
//最大错误重试次数
AssetsManagerLoaderScene.maxFailCount = 3;