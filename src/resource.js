var MainRes = {
    customFont: {
        customBMFont_1_fnt: "res/font/f1.fnt",
        customBMFont_1_png: "res/font/f1_0.png",
        customBMFont_2_fnt: "res/font/f2.fnt",
        customBMFont_2_png: "res/font/f2_0.png",
        customBMFont_3_fnt: "res/font/f3.fnt",
        customBMFont_3_png: "res/font/f3_0.png"
    },
    mainMenu: {
        i_mainMenu: "res/gameUI/MainMenuUI.png",
        p_mainMenu: "res/gameUI/MainMenuUI.plist",
        mainMenu_Bg_jpg: "res/gameUI/mainMenu_Bg.jpg"
    }
};
var LoadingRes = {};
var GameRes = {

    skills: {
        png: "res/skills/Shield.png"
    },
    drowItem: {
        png: "res/gameUI/treasure_icon.png"
    },

    monsterFreezeExplode: {
        plist: "res/monsters/freeze.plist",
        png: "res/monsters/freeze.png"
    },
    monsterBombExplode: {
        plist: "res/monsters/BombEffect.plist",
        png: "res/monsters/BombEffect.png"
    },
    monsterExplode: {
        plist: "res/monsters/weaponEffect.plist",
        png: "res/monsters/weaponEffect.png"
    },
    test: {
        i_bg: "res/bg.jpg",
        i_character: "res/characters/character.png",
        p_character: "res/characters/character.plist",

    },
    starGameUILayer: {
        i_starGameUILayer: "res/StarGameUI/StarGameUI.png",
        p_starGameUILayer: "res/StarGameUI/StarGameUI.plist",
        StarGameUIbg_jpg: "res/StarGameUI/StarGameUIbg.jpg"
    },
    userFiles: {
        i_userfiles: "res/userFilesScene/userFilesScene.png",
        p_userfiles: "res/userFilesScene/userFilesScene.plist"
    },
    controlLayerUI: {
        i_controlLayerUI: "res/controlLayerUI/controlLayerUI.png",
        p_controlLayerUI: "res/controlLayerUI/controlLayerUI.plist"
    },
    pauseSceneUI: {
        i_pauseSceneUI: "res/PauseSceneUI/PauseSceneUI.png",
        p_pauseSceneUI: "res/PauseSceneUI/PauseSceneUI.plist"
    },
    gameOverLayerUI: {
        i_gameOverLayerUI: "res/gameOverLayerUI/gameOverLayer.png",
        p_gameOverLayerUI: "res/gameOverLayerUI/gameOverLayer.plist"
    },
    gameLayerUI: {
        i_gameLayerUI: "res/gameLayerUI/gameLayerUI.png",
        p_gameLayerUI: "res/gameLayerUI/gameLayerUI.plist"
    },
    characterRifleWeapon: {
        plist: "res/characters/CharacterWeapon.png",
        png: "res/characters/CharacterWeapon.plist",
        rocketExplodePng: "res/characters/RocketEffect.png",
        rocketExplodePlist: "res/characters/RocketEffect.plist"
    },
    characterElectricWeapon: {
        plist: "res/characters/electric.png",
        png: "res/characters/electric.plist"
    },
    shaders: {
        whiteHit: {
            fsh: "res/shaders/whiteHit.fsh",
            vsh: "res/shaders/whiteHit.vsh",
            vsh_noMVP: "res/shaders/whiteHit_noMVP.vsh"
        },
        whiteHitRecover: {
            fsh: "res/shaders/whiteHitRecover.fsh",
            vsh: "res/shaders/whiteHitRecover.vsh",
            vsh_noMVP: "res/shaders/whiteHitRecover_noMVP.vsh"
        }
    },
    monsterAlpha: {
        plist: 'res/monsters/Alpha.plist',
        png: 'res/monsters/Alpha.png'
    },
    monsterBeta: {
        plist: 'res/monsters/Beta.plist',
        png: 'res/monsters/Beta.png'
    },
    monsterCharlie: {
        plist: 'res/monsters/Charlie.plist',
        png: 'res/monsters/Charlie.png'
    },

    testExtenProp:{
        png   :"res/testExternProp.png",
        plist :"res/testExternProp.plist"
    },

    GiftBoxLayerUI:{
        png  :"res/GiftBoxLayerUI/GiftBoxLayerRes.png",
        plist:"res/GiftBoxLayerUI/GiftBoxLayerRes.plist",
        bg_png:"res/GiftBoxLayerUI/GiftBoxBg.jpg"
    }

}

var main_resources = [];
var game_resources = [];
var loading_resource = [];

var loopRes = function (data, k, resource) {
    if (_.isObject(data[k])) {
        for (var j in data[k]) {
            loopRes(data[k], j, resource);
        }
    } else {
        if (_.indexOf(resource, data[k]) < 0) resource.push(data[k]);
    }
};

(function () {
    for (var i in LoadingRes) {
        loopRes(LoadingRes, i, loading_resource);
    }
    for (var i in MainRes) {
        loopRes(MainRes, i, main_resources);
    }
    for (var i in GameRes) {
        loopRes(GameRes, i, game_resources);
    }
})();