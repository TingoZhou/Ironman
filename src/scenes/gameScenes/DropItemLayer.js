var DropItemLayer = cc.Layer.extend({
    DropItems:null,
    ctor: function () {
        this._super();
        this.init();
        this.addListeners();
    },

    init: function () {
        DropItem.preset(this);
        this.DropItems=DropItem.Items;
    },

    addListeners: function () {
        cc.eventManager.addCustomListener(SC.MONSTER_DIE, _.bind(function (e) {
            this._doDrowItem(e);
        }, this));
    },

    _doDrowItem: function (e) {

        var monster = e.getUserData().monster;
       //var dropitem = new DropItem(monster);
        var dropitem=DropItem.create(monster);
    },

    update: function (dt) {
        for(var i=0;i<this.DropItems.length;i++){
            this.DropItems[i].update();
        }
    }
})