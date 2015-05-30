var BulletElectric = Bullet.extend({
	ctor: function() {
		this._super();
		this._viewObj = cc.Sprite.create("#" + WeaponConfig.Electric.bullets.frames[0]);
	},

	initData: function(parent) {
		this._super(parent);
		this._viewObj.setPosition(Character.current.getPosition());
		var rotation = Character.current.getRotation() + 90;
        this._viewObj.setRotation(rotation);
		var scaleX = Character.current.getScaleX();
		this._parent.addChild(this._viewObj);
	},

	update: function() {
		this._super();
	}
});

BulletElectric.bullets = [];

BulletElectric.preset = function(parent) {
	for(var i = 0; i < WeaponConfig.Electric.bullets.presetAmount; ++i) {
        BulletElectric.bullets.push(new BulletElectric(parent));
    }
}

BulletElectric.create = function(parent, createOnly) {
    var bulletElectric = null;
    for (var i = 0, len = BulletElectric.bullets.length; i < len; ++i) {
    	var bullet = BulletElectric.bullets[i];
    	if (!bullet.active) {
    		bulletElectric = bullet;
    	}
    }
    if (!bulletElectric) {
    	bulletElectric = new BulletElectric();
    }
    bulletElectric.reuse(parent);
    return bulletElectric;
}