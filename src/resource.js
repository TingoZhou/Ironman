var MainRes = {
    mainMenu: {
        i_mainMenu: "res/gameUI/mainMenuUI.png",
        p_mainMenu: "res/gameUI/mainMenuUI.plist"
    }

};
var LoadingRes = {};
var GameRes = {
    monsterExplode: {
        plist: "res/monsters/weaponEffect.png",
        png: "res/monsters/weaponEffect.plist"
    },
    test: {
        i_bg: "res/bg.jpg",
        i_character: "res/characters/character.png",
        p_character: "res/characters/character.plist",

        i_test: "res/test.png",
        p_test: "res/test.plist"
    },

    starGameUILayer:{
        i_starGameUILayer:"res/StarGameUI/StarGameUI.png",
        p_starGameUILayer:"res/StarGameUI/StarGameUI.plist"
    },

    userFiles:{
        i_userfiles:"res/userFilesScene/userFilesScene.png",
        p_userfiles:"res/userFilesScene/userFilesScene.plist"
    },

    controlLayerUI:{
       i_controlLayerUI:"res/controlLayerUI/controlLayerUI.png",
       p_controlLayerUI:"res/controlLayerUI/controlLayerUI.plist"
    },

    pauseSceneUI:{
        i_pauseSceneUI:"res/PauseSceneUI/PauseSceneUI.png",
        p_pauseSceneUI:"res/PauseSceneUI/PauseSceneUI.plist"
    },

    gameOverLayerUI:{
        i_gameOverLayerUI:"res/gameOverLayerUI/gameOverLayer.png",
        p_gameOverLayerUI:"res/gameOverLayerUI/gameOverLayer.plist"
    },
    gameLayerUI:{
        i_gameLayerUI:"res/gameLayerUI/gameLayerUI.png",
        p_gameLayerUI:"res/gameLayerUI/gameLayerUI.plist"
       // j_gameLayerUI:"res/gameLayerUI/gameLayer_UI.json"
    },

    characterRifleWeapon: {
        plist: "res/characters/CharacterWeapon.png",
        png: "res/characters/CharacterWeapon.plist",
        rocketExplodePng: "res/characters/MatchGirlDie.png",
        rocketExplodePlist: "res/characters/MatchGirlDie.plist"

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
        plist: 'res/monsters/monsters.plist',
        png: 'res/monsters/monsters.png'
    }
};

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