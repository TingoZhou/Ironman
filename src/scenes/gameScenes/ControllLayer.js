var ControllLayer = cc.Layer.extend({
    ctor: function () {
        this._super();

        this._moveJoyStickPannel = null;
        this._moveJoyStick = null;

        this.init();
    },

    init: function () {
        this.initJoyStick();
        this.bindJoyStickEvent();
        this.initRifleShootBtn();
        this.initRocketShootBtn();
        this.initElectricShootBtn();
        this.initBombBtn();

    },

    initBombBtn: function () {
        var button = new Button("bomb.png");
        button.setPosition(cc.p(cc.winSize.width * 7 / 8, 180));
        this.addChild(button);

        button.onTouchBegan = function (touch, type) {
            cc.eventManager.dispatchCustomEvent(SC.CHARACTER_BOMB);
        }

        /*  button.onTouchEnded = function (touch, type) {
         cc.eventManager.dispatchCustomEvent(SC.CHARACTER_RESET_WEAPON);
         }*/


    },

    initJoyStick: function () {
        var moveJoyStickPannel = new JoyStickPannel("#joystickleft.png", "#joystickmove.png");
        moveJoyStickPannel.setPosition(100, 100);
        this.addChild(moveJoyStickPannel);
        this._moveJoyStickPannel = moveJoyStickPannel;

        var moveJoyStick = new JoyStick(cc.rect(
            moveJoyStickPannel.x - moveJoyStickPannel.buttomStick.width / 2,
            moveJoyStickPannel.y - moveJoyStickPannel.buttomStick.height / 2,
            moveJoyStickPannel.buttomStick.width,
            moveJoyStickPannel.buttomStick.height
        ));
        this._moveJoyStick = moveJoyStick;
    },

    bindJoyStickEvent: function () {
        cc.eventManager.addListener({
            event: cc.EventListener.TOUCH_ALL_AT_ONCE,
            swallowTouches: true,
            onTouchesBegan: _.bind(this.onTouchesBegan, this),
            onTouchesMoved: _.bind(this.onTouchesMoved, this),
            onTouchesEnded: _.bind(this.onTouchesEnded, this)
        }, this);
    },

    initRifleShootBtn: function () {
        var button = new Button("rifle.png");
        button.setPosition(cc.p(cc.winSize.width * 7 / 8, 80));
        this.addChild(button);

        button.onTouchBegan = function (touch, type) {
            cc.eventManager.dispatchCustomEvent(SC.CHARACTER_SET_WEAPON, {
                weaponName: SH.Weapon.Characters.Rifle
            });
        }

        button.onTouchEnded = function (touch, type) {
            cc.eventManager.dispatchCustomEvent(SC.CHARACTER_RESET_WEAPON);
        }
    },
    initRocketShootBtn: function () {
        var button = new Button("rocket.png");
        button.setPosition(cc.p(cc.winSize.width * 6 / 8, 80));
        this.addChild(button);

        button.onTouchBegan = function (touch, type) {
            cc.eventManager.dispatchCustomEvent(SC.CHARACTER_SET_WEAPON, {
                weaponName: SH.Weapon.Characters.Rocket
            });
        }

        button.onTouchEnded = function (touch, type) {
            cc.eventManager.dispatchCustomEvent(SC.CHARACTER_RESET_WEAPON);
        }
    },

    initElectricShootBtn: function () {
        var button = new Button("electric.png");
        button.setPosition(cc.p(cc.winSize.width * 5 / 8, 80));
        this.addChild(button);

        button.onTouchBegan = function (touch, type) {
            cc.eventManager.dispatchCustomEvent(SC.CHARACTER_SET_WEAPON, {
                weaponName: SH.Weapon.Characters.Electric
            });
        }

        button.onTouchEnded = function (touch, type) {
            cc.eventManager.dispatchCustomEvent(SC.CHARACTER_RESET_WEAPON);
        }

    },

    onTouchesBegan: function (touches, event) {
        var target = event.getCurrentTarget();
        for (var i = 0, len = touches.length; i < len; ++i) {
            var touch = touches[i];
            var moveJoyStick = target.getMoveJoyStick();
            var moveJoyStickPannel = target.getMoveJoyStickPannel();
            if (!moveJoyStick.getBasePos() && moveJoyStick.setBasePos(touch.getLocation())) {
                Character.current.setVelocity({vX: 0, vY: 0});
                moveJoyStickPannel.isTouchesBegan();
            }
        }
    },

    onTouchesMoved: function (touches, event) {
        var target = event.getCurrentTarget();
        for (var i = 0, len = touches.length; i < len; ++i) {
            var touch = touches[i];
            var moveJoyStick = target.getMoveJoyStick();
            var moveJoyStickPannel = target.getMoveJoyStickPannel();
            var dPos = moveJoyStick.getDpos(touch.getLocation());
            if (dPos) {
                moveJoyStickPannel.setStickPos(touch.getLocation());
                Character.current.setVelocity(dPos.target);
            }
        }
    },

    onTouchesEnded: function (touches, event) {
        var target = event.getCurrentTarget();
        for (var i = 0, len = touches.length; i < len; ++i) {
            var touch = touches[i];
            var moveJoyStick = target.getMoveJoyStick();
            var moveJoyStickPannel = target.getMoveJoyStickPannel();
            Character.current.setVelocity({vX: 0, vY: 0});
            moveJoyStickPannel.setStickPos(moveJoyStickPannel.getPosition());
            moveJoyStick.resetPos();
            moveJoyStickPannel.isTouchesEnded()
        }
    },

    getMoveJoyStick: function () {
        return this._moveJoyStick;
    },

    getMoveJoyStickPannel: function () {
        return this._moveJoyStickPannel;
    },

    update: function (dt) {
        this._moveJoyStickPannel.update(dt);
    }
})