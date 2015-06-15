var DropItemLayer = cc.Layer.extend({
    ctor: function () {
        this._super();
        this.init();
        this.addListeners();
    },

    init: function () {

    },

    addListeners: function () {
        cc.eventManager.addCustomListener(SC.MONSTER_DIE, _.bind(function (e) {
            this._doDrowItem(e);
        }, this));
    },

    _doDrowItem: function (e) {

        var monster = e.getUserData().monster;
        var dropitem = new DropItem(monster);

    },

    update: function (dt) {
    }
})