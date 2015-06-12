var UserFilesScene = cc.Scene.extend({
    onEnterTransitionDidFinish: function () {
        this._super();
        this.init();

    },
    onExitTransitionDidStart: function () {
        cc.eventManager.removeCustomListeners(cc.game.EVENT_HIDE);
        cc.eventManager.removeCustomListeners(cc.game.EVENT_SHOW);
    },
    init: function () {
        var userfileslayer = new UserfilesLayer();
        this.addChild(userfileslayer);
    }
});

var UserfilesLayer = cc.Layer.extend({
    ctor: function () {
        this._super();
        this.init();
    },
    init: function () {
        this.initImages();
        this.initButtons();

        this._initBulletRifle();
        this._initBulletElectric();
        this._initBulletRocket();
        this._initBomb();
        this._initFreeze();
        this._initShield();


    },

    //
    _initBulletRifle: function () {
        var size = cc.winSize;
        var buttle_1 = new cc.Sprite("#bullet_1.png");
        this.addChild(buttle_1);
        buttle_1.attr({
            x: size.width * 0.11,
            y: size.height * 0.66
        });

        var str = ULS.get(USK.PlayInfo).rifle;

        var rifle = new cc.LabelBMFont(str, MainRes.customFont.customBMFont_1_fnt);
        rifle.setScale(.9);
        rifle.setPosition(cc.p(buttle_1.x + 50, buttle_1.y - 11));
        this.addChild(rifle);

    },

    _initBulletElectric: function () {
        var size = cc.winSize;
        var buttle_2 = new cc.Sprite("#bullet_2.png");
        this.addChild(buttle_2);
        buttle_2.attr({
            x: size.width * 0.11,
            y: size.height * 0.52
        });

        var str = ULS.get(USK.PlayInfo).rocket;

        var rifle = new cc.LabelBMFont(str, MainRes.customFont.customBMFont_1_fnt);
        rifle.setScale(.9);
        rifle.setPosition(cc.p(buttle_2.x + 50, buttle_2.y - 15));
        this.addChild(rifle);

    },

    _initBulletRocket: function () {


    },

    _initBomb: function () {


    },

    _initFreeze: function () {


    },

    _initShield: function () {


    },

    initImages: function () {
        var size = cc.winSize;
        var bgImage = new cc.Sprite("#bg.png");
        this.addChild(bgImage);
        bgImage.attr({
            x: size.width * 0.5,
            y: size.height * 0.5
        });

        var bgContent_1 = new cc.Sprite("#bgContent_1.png");
        this.addChild(bgContent_1);
        bgContent_1.attr({
            x: size.width * 0.5,
            y: size.height * 0.5
        });

        var bgContent_2_1 = new cc.Sprite("#bgContent_2.png");
        this.addChild(bgContent_2_1);
        bgContent_2_1.attr({
            x: size.width * 0.25,
            y: size.height * 0.50
        });

        var bgContent_2_2 = new cc.Sprite("#bgContent_2.png");
        this.addChild(bgContent_2_2);
        bgContent_2_2.attr({
            x: size.width * 0.75,
            y: size.height * 0.50
        });

        var bulletTitle = new cc.Sprite("#bulletTitle.png");
        this.addChild(bulletTitle);
        bulletTitle.attr({
            x: size.width * 0.25,
            y: size.height * 0.83
        });

        var skillTitle = new cc.Sprite("#skillTitle.png");
        this.addChild(skillTitle);
        skillTitle.attr({
            x: size.width * 0.75,
            y: size.height * 0.83
        });

        var bulletBg_1 = new cc.Sprite("#bgContent_3.png");
        this.addChild(bulletBg_1);
        bulletBg_1.attr({
            x: size.width * 0.15,
            y: size.height * 0.65,
            scaleX: 1.1,
            scaleY: 1.1

        });

        var bulletBg_2 = new cc.Sprite("#bgContent_3.png");
        this.addChild(bulletBg_2);
        bulletBg_2.attr({
            x: size.width * 0.15,
            y: size.height * 0.50,
            scaleX: 1.1,
            scaleY: 1.1
        });

        var bulletBg_3 = new cc.Sprite("#bgContent_3.png");
        this.addChild(bulletBg_3);
        bulletBg_3.attr({
            x: size.width * 0.15,
            y: size.height * 0.35,
            scaleX: 1.1,
            scaleY: 1.1
        });

        var skillBg_1 = new cc.Sprite("#bgContent_3.png");
        this.addChild(skillBg_1);
        skillBg_1.attr({
            x: size.width * 0.65,
            y: size.height * 0.65,
            scaleX: 1.1,
            scaleY: 1.1
        });

        var skillBg_2 = new cc.Sprite("#bgContent_3.png");
        this.addChild(skillBg_2);
        skillBg_2.attr({
            x: size.width * 0.65,
            y: size.height * 0.50,
            scaleX: 1.1,
            scaleY: 1.1
        });

        var skillBg_3 = new cc.Sprite("#bgContent_3.png");
        this.addChild(skillBg_3);
        skillBg_3.attr({
            x: size.width * 0.65,
            y: size.height * 0.35,
            scaleX: 1.1,
            scaleY: 1.1
        });


        var buttle_3 = new cc.Sprite("#bullet_3.png");
        this.addChild(buttle_3);
        buttle_3.attr({
            x: size.width * 0.11,
            y: size.height * 0.39
        });

        var skill_1 = new cc.Sprite("#skill_1.png");
        this.addChild(skill_1);
        skill_1.attr({
            x: size.width * 0.60,
            y: size.height * 0.67
        });

        var skill_2 = new cc.Sprite("#skill_2.png");
        this.addChild(skill_2);
        skill_2.attr({
            x: size.width * 0.60,
            y: size.height * 0.52
        });

        var skill_3 = new cc.Sprite("#skill_3.png");
        this.addChild(skill_3);
        skill_3.attr({
            x: size.width * 0.60,
            y: size.height * 0.36
        });

        var starBg = new cc.Sprite("#starBg.png");
        this.addChild(starBg);
        starBg.attr({
            x: size.width * 0.21,
            y: size.height * 0.92,
            scaleY: 0.9
        });

        var star = new cc.Sprite("#star.png");
        this.addChild(star);
        star.attr({
            x: size.width * 0.07,
            y: size.height * 0.93
        });

        var boxRedPoint = new cc.Sprite("#boxRedPoint.png");
        this.addChild(boxRedPoint, 1);
        boxRedPoint.attr({
            x: size.width * 0.93,
            y: size.height * 0.95
        });

    },

    initButtons: function () {
        this.initSkillPlusBt_1();
        this.initSkillPlusBt_2();
        this.initSkillPlusBt_3();
        this.initBulletPlusBt_1();
        this.initBulletPlusBt_2();
        this.initBulletPlusBt_3();
        this.initBoxHomeBt();
        this.initBackBt();
    },

    initSkillPlusBt_1: function () {
        var size = cc.winSize;
        var button = new ButtonNoEdg("plusBt.png");
        button.attr({
            x: size.width * 0.84,
            y: size.height * 0.65
        });
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

    initSkillPlusBt_2: function () {
        var size = cc.winSize;
        var button = new ButtonNoEdg("plusBt.png");
        button.attr({
            x: size.width * 0.84,
            y: size.height * 0.51
        });
        this.addChild(button);
    },

    initSkillPlusBt_3: function () {
        var size = cc.winSize;
        var button = new ButtonNoEdg("plusBt.png");
        button.attr({
            x: size.width * 0.84,
            y: size.height * 0.35
        });
        this.addChild(button);
    },

    initBulletPlusBt_1: function () {
        var size = cc.winSize;
        var button = new ButtonNoEdg("plusBt.png");
        button.attr({
            x: size.width * 0.35,
            y: size.height * 0.65
        });
        this.addChild(button);
    },

    initBulletPlusBt_2: function () {
        var size = cc.winSize;
        var button = new ButtonNoEdg("plusBt.png");
        button.attr({
            x: size.width * 0.35,
            y: size.height * 0.51
        });
        this.addChild(button);
    },

    initBulletPlusBt_3: function () {
        var size = cc.winSize;
        var button = new ButtonNoEdg("plusBt.png");
        button.attr({
            x: size.width * 0.35,
            y: size.height * 0.35
        });
        this.addChild(button);
    },

    initBoxHomeBt: function () {
        var size = cc.winSize;
        var button = new ButtonNoEdg("boxBt.png");
        button.attr({
            x: size.width * 0.90,
            y: size.height * 0.90
        });
        this.addChild(button);
    },

    initBackBt: function () {
        var size = cc.winSize;
        var button = new ButtonNoEdg("backBt.png");
        button.attr({
            x: size.width * 0.10,
            y: size.height * 0.10
        });
        this.addChild(button);

        button.onTouchBegan = function (touch, type) {
            cc.director.runScene(new cc.TransitionFade(0.1, new StarGameScene()));
        }

        button.onTouchEnded = function (touch, type) {
            //cc.eventManager.dispatchCustomEvent(SC.CHARACTER_RESET_WEAPON);
        }
    }
});