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

BulletRifle.create = function(parent, createOnly) {
	var pool = cc.pool;
    createOnly = !_.isUndefined(createOnly) ? createOnly : false;
    if (!createOnly && pool.hasObject(BulletRifle)) {
        var bullet = pool.getFromPool(BulletRifle, parent);
        return bullet;
    } else if(createOnly) {
        var bullet = new BulletRifle(parent);
        pool.putInPool(bullet);
    } else {
        var bullet = new BulletRifle(parent);
        cc.pool.putInPool(bullet);
        return pool.getFromPool(BulletRifle, parent);
    }
}