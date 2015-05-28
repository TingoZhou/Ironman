var ULS = UMLocalStorage = {
    key: 'ultraman_fight_2015',
	set: function(key, value) {
		var cValue = "";

		switch (key["type"]) {
			case "json": {
				cValue = JSON.stringify(value);
				break ;
			}
			case "string": {
				cValue = value;
				break ;
			}
			case "number": {
				cValue = value.toString();
			}
		}

        var random = _.random(100000, 999999);
        var cMd5 = hex_md5(this.key + '|' + SH.STUDIO_NAME + '|' + cValue + '|' + random);
		// cc.log('_________________________________' + key.name + '|' + cValue + '|' + cMd5 + '|' + random);
		cc.sys.localStorage.setItem(key.name, cValue + '|' + cMd5 + '|' + random);
	},

	get: function(key) {
        // cc.log('_________________________________' + key.name);
		var value = cc.sys.localStorage.getItem(key.name);
        // cc.log('_________________1________________' + key.name + '|' + value);
        if(!value && value == null) return null;
        // cc.log('_________________12________________' + key.name + '|' + value);
        var temp = value.split('|');
        // cc.log('_________________13________________' + key.name + '|' + value);
        var cValue = temp[0];
        // cc.log('_________________14_______________' + key.name + '|' + value);
        if(!temp[1] || !temp[2]) {
            return null;
        } else {
            // cc.log('_________________15________________' + key.name + '|' + value);
            if(hex_md5(this.key + '|' + SH.STUDIO_NAME + '|' + cValue + '|' + temp[2]) != temp[1]) return null;
            else value = cValue;
            // cc.log('_________________16________________' + key.name + '|' + value);
        }

		var oValue = null;
        // cc.log('_________________2________________' + key.name + '|' + value);
		if (value != null && typeof value != "undefined" && value != "" && value != []) {
			switch (key["type"]) {
				case "json": {
					oValue = JSON.parse(value);
					break ;
				}
				case "string": {
					oValue = value;
					break ;
				}
				case "number": {
					oValue = Number(value);
				}
			}
		}

		return oValue;
	}
}