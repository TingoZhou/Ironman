/**
 * Created with JetBrains WebStorm.
 * User: Tingo
 * Date: 14-11-15
 * Time: 下午3:53
 * To change this template use File | Settings | File Templates.
 */
var GameController = {};
(function() {
    var controllerInstance = null;
    var gController = cc.Class.extend({
        
    });

    GameController.getInstance = function() {
        if(controllerInstance == null) {
            controllerInstance = new gController();
        }
        return controllerInstance;
    }
})(GameController);
