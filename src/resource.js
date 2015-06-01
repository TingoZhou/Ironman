var MainRes = {};
var LoadingRes = {};
var GameRes = {
	test: {
        i_bg: "res/bg.jpg",
        i_character: "res/characters/character.png",
        p_character: "res/characters/character.plist",
        
		i_test: "res/test.png",
		p_test: "res/test.plist"
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
    monsters: {
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