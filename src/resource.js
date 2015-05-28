var gameRes = {
	test: {
		i_test: "res/test.png",
		p_test: "res/test.plist",
		i_textureTransparentPack: "res/textureTransparentPack.png",
		p_textureTransparentPack: "res/textureTransparentPack.plist"
	}
};

var g_resources = [];
for (var i in res) {
    g_resources.push(gameRes[i]);
}

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
    for (var i in GameRes) {
        loopRes(GameRes, i, game_resources);
    }
})();