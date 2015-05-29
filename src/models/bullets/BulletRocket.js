var BulletRocket = Bullet.extend({
	ctor: function() {
		this._super();
		this._viewObj = cc.Sprite.create(WeaponConfig.Rocket.bullets.res);
		this._velocity = {x: 0, y: 0};
	},

	initData: function(parent) {
		this._super(parent);
		this._viewObj.setPosition(Character.current.getPosition());
		var rotation = Character.current.getRotation();
        this._viewObj.setRotation(rotation);
        var speed = WeaponConfig.Rifle.bullets.speed;
        this._velocity = {
        	x: speed * Math.sin(rotation * Math.PI / 180),
        	y: speed * Math.cos(rotation * Math.PI / 180)
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

BulletRocket.create = function(parent, createOnly) {
	var pool = cc.pool;
    createOnly = !_.isUndefined(createOnly) ? createOnly : false;
    if (!createOnly && pool.hasObject(BulletRocket)) {
        var bullet = pool.getFromPool(BulletRocket, parent);
        return bullet;
    } else if(createOnly) {
        var bullet = new BulletRocket(parent);
        pool.putInPool(bullet);
    } else {
        var bullet = new BulletRocket(parent);
        cc.pool.putInPool(bullet);
        return pool.getFromPool(BulletRocket, parent);
    }
}