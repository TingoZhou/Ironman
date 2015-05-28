/**
 * Created with JetBrains WebStorm.
 * User: Tingo
 * Date: 15-5-28
 * Time: 下午2:31
 * To change this template use File | Settings | File Templates.
 */
var MainMenuScene = (function() {
    /**
     * 私有属性的处理
     * @private
     */
    var _privateProperties = function() {

    };

    return cc.Scene.extend({
        ctor: function() {
            this._super();
            this._properties = new _privateProperties();
        },

        onEnterTransitionDidFinish: function() {
            this._super();
            var layer = new MainMenuLayer();
            this.addChild(layer);
        },

        onExitTransitionDidStart: function() {
            cc.eventManager.removeCustomListeners(cc.game.EVENT_HIDE);
            cc.eventManager.removeCustomListeners(cc.game.EVENT_SHOW);
        }
    });
})();

var MainMenuLayer = (function() {
    /**
     * 私有属性的处理
     * @private
     */
    var _privateProperties = function() {

    };

    return cc.Layer.extend({
        
    });
})();
