var ControllLayer = cc.Layer.extend({
    ctor: function() {
    	this._super();

    	this._moveJoyStickPannel = null;
    	this._moveJoyStick = null;

    	this.init();
    },

    init: function() {
    	this.initJoyStick();
    	this.bindJoyStickEvent();
    	this.initRifleShootBtn();
        this.initRocketShootBtn();
    },

	initJoyStick: function() {
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

    initRifleShootBtn: function() {
    	var button = new ccui.Button();
        button.setTouchEnabled(true);
        button.setPressedActionEnabled(true);
        button.loadTextures("weaponABtn.png", "weaponABtn.png", "", ccui.Widget.PLIST_TEXTURE);
        button.setPosition(cc.p(cc.winSize.width * 7 / 8, 100));
        button.addTouchEventListener(function(sender, type) {
        	if (type == ccui.Widget.TOUCH_BEGAN) {
                cc.eventManager.dispatchCustomEvent(SC.CHARACTER_SET_WEAPON, {
                    weaponName: SH.Weapon.Characters.Rifle
                });
            } else if (type == ccui.Widget.TOUCH_ENDED) {
                cc.eventManager.dispatchCustomEvent(SC.CHARACTER_RESET_WEAPON);
            } else if (type == ccui.Widget.TOUCH_CANCELED) {
                cc.eventManager.dispatchCustomEvent(SC.CHARACTER_RESET_WEAPON);
            }
        }, this);
        this.addChild(button);
    },

    initRocketShootBtn: function() {
        var button = new ccui.Button();
        button.setTouchEnabled(true);
        button.setPressedActionEnabled(true);
        button.loadTextures("weaponBBtn.png", "weaponBBtn.png", "", ccui.Widget.PLIST_TEXTURE);
        button.setPosition(cc.p(cc.winSize.width * 6 / 8, 100));
        button.addTouchEventListener(function(sender, type) {
            if (type == ccui.Widget.TOUCH_BEGAN) {
                cc.eventManager.dispatchCustomEvent(SC.CHARACTER_SET_WEAPON, {
                    weaponName: SH.Weapon.Characters.Rocket
                });
            } else if (type == ccui.Widget.TOUCH_ENDED) {
                cc.eventManager.dispatchCustomEvent(SC.CHARACTER_RESET_WEAPON);
            } else if (type == ccui.Widget.TOUCH_CANCELED) {
                cc.eventManager.dispatchCustomEvent(SC.CHARACTER_RESET_WEAPON);
            }
        }, this);
        this.addChild(button);
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
            moveJoyStickPannel.setStickPos(touch.getLocation());
            var dPos = moveJoyStick.getDpos(touch.getLocation());
            if (dPos) {
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

    getMoveJoyStick: function() {
    	return this._moveJoyStick;
    },

    getMoveJoyStickPannel: function() {
    	return this._moveJoyStickPannel;
    },

    update: function(dt) {
    	this._moveJoyStickPannel.update(dt);
    }
})