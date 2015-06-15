var BattleLayer = cc.Layer.extend({
    ctor: function () {
        this._super();
        this._scriptLayer = null;
        this.init();
        this.addListeners();
    },

    init: function () {
        var character = Character.create(SH.Character.Ironman, this);
        this.initScriptLayer();
    },

    addListeners: function () {
        cc.eventManager.addCustomListener(SC.GAME_START, _.bind(function (e) {
            this._scriptLayer.start('1000');
        }, this));

        cc.eventManager.addCustomListener(SC.CHARACTER_BOMB, _.bind(function (e) {
            this._shock();
        }, this));
    },

    _shock: function () {
        var time = .02;
        this.runAction(
            cc.sequence(
                cc.sequence(
                        cc.moveBy(time, cc.p(-10, -10)),
                        cc.delayTime(time),
                        cc.moveBy(time, cc.p(10, 10)),
                        cc.delayTime(time)
                    ).
                    repeat(14),
                cc.callFunc(function () {
                    this.x = 0;
                    this.y = 0;
                }, this)
            )
        )

    },

    initScriptLayer: function () {
        var scriptLayer = new ScriptLayer();
        this.addChild(scriptLayer);
        this._scriptLayer = scriptLayer;
        // cc.log("the number of Moster is"+getAllMosterInBattleLayer());
    },

    /**
     *   获取战斗中的所有怪物
     * @returns {Array}
     */
    getAllMosterInBattleLayer: function () {
        var monsters = [];
        var allChildren = this.getChildren();
        for (var i = 0; i < allChildren.length; i++) {

            var monster = allChildren[i];
            if (monster.getName() == "monster") {
                if (monster.visible) {
                    monsters.push(monster);
                }
            }
        }
        return monsters;
    },

    update: function (dt) {
        Character.current.update && Character.current.update(dt);
        Bullet.updateAll();
        this._scriptLayer.update(dt);
    }
})