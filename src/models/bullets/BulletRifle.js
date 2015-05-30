var BulletRifle = Bullet.extend({
	ctor: function() {
		this._super();
		this._viewObj = cc.Sprite.create(WeaponConfig.Rifle.bullets.res);
		this._velocity = {x: 0, y: 0};
	},

	initData: function(parent) {
		this._super(parent);
		this._viewObj.setPosition(Character.current.getPosition());
		var rotation = Character.current.getRotation() + 90;
        this._viewObj.setRotation(rotation);
        var speed = WeaponConfig.Rifle.bullets.speed;
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

BulletRifle.bullets = [];

BulletRifle.preset = function(parent) {
	for(var i = 0; i < WeaponConfig.Rifle.bullets.presetAmount; ++i) {
        BulletRifle.bullets.push(new BulletRifle(parent));
    }
}

BulletRifle.create = function(parent, createOnly) {
    var bulletRifle = null;
    for (var i = 0, len = BulletRifle.bullets.length; i < len; ++i) {
    	var bullet = BulletRifle.bullets[i];
    	if (!bullet.active) {
    		bulletRifle = bullet;
    	}
    }
    if (!bulletRifle) {
    	bulletRifle = new BulletRifle();
    }
    bulletRifle.reuse(parent);
    return bulletRifle;
}