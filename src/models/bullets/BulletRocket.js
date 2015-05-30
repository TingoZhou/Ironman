var BulletRocket = Bullet.extend({
	ctor: function() {
		this._super();
		this._viewObj = cc.Sprite.create(WeaponConfig.Rocket.bullets.res);
		this._velocity = {x: 0, y: 0};
	},

	initData: function(parent) {
		this._super(parent);
		this._viewObj.setPosition(Character.current.getPosition());
		var rotation = Character.current.getRotation() + 90;
        this._viewObj.setRotation(rotation);
        var speed = WeaponConfig.Rocket.bullets.speed;
		var scaleX = Character.current.getScaleX();
        this._velocity = {
        	x: speed * Math.sin(rotation * Math.PI / 180) * (Math.abs(scaleX) / scaleX),
        	y: speed * Math.cos(rotation * Math.PI / 180) * (Math.abs(scaleX) / scaleX)
        }
		this._parent.addChild(this._viewObj);
	},

	_move: function() {
		this._viewObj.x += this._velocity.x;
		this._viewObj.y += this._velocity.y;
	},

	update: function() {
		this._super();
		this._move();
	}
});

BulletRocket.bullets = [];

BulletRocket.preset = function(parent) {
	for(var i = 0; i < WeaponConfig.Rocket.bullets.presetAmount; ++i) {
        BulletRocket.bullets.push(new BulletRocket(parent));
    }
}

BulletRocket.create = function(parent, createOnly) {
    var bulletRocket = null;
    for (var i = 0, len = BulletRocket.bullets.length; i < len; ++i) {
    	var bullet = BulletRocket.bullets[i];
    	if (!bullet.active) {
    		bulletRocket = bullet;
    	}
    }
    if (!bulletRocket) {
    	bulletRocket = new BulletRocket();
    }
    bulletRocket.reuse(parent);
    return bulletRocket;
}