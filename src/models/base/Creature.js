var Creature = cc.Class.extend({
	ctor: function(parent, data) {
		this._isStriking = false;
		this._whiteShader = null;
        this._whiteRecoeverShader = null;

        this.initShader();
	},

	initShader: function() {
        if(cc.sys.isNative) {
            this._whiteShader = new cc.GLProgram(GameRes.shaders.whiteHit.vsh_noMVP, GameRes.shaders.whiteHit.fsh);
            this._whiteShader.link();
            this._whiteShader.updateUniforms();
            this._whiteShader.retain();

            this._whiteRecoeverShader = new cc.GLProgram(GameRes.shaders.whiteHitRecover.vsh_noMVP, GameRes.shaders.whiteHitRecover.fsh);
            this._whiteRecoeverShader.link();
            this._whiteRecoeverShader.updateUniforms();
            this._whiteRecoeverShader.retain();

        } else {

            this._whiteShader = new cc.GLProgram(GameRes.shaders.whiteHit.vsh, GameRes.shaders.whiteHit.fsh);
            this._whiteShader.addAttribute(cc.ATTRIBUTE_NAME_POSITION, cc.VERTEX_ATTRIB_POSITION);
            this._whiteShader.addAttribute(cc.ATTRIBUTE_NAME_TEX_COORD, cc.VERTEX_ATTRIB_TEX_COORDS);
            this._whiteShader.addAttribute(cc.ATTRIBUTE_NAME_COLOR, cc.VERTEX_ATTRIB_COLOR);

            this._whiteShader.link();
            this._whiteShader.updateUniforms();
            this._whiteShader.use();

            this._whiteRecoeverShader = new cc.GLProgram(GameRes.shaders.whiteHitRecover.vsh, GameRes.shaders.whiteHitRecover.fsh);
            this._whiteRecoeverShader.addAttribute(cc.ATTRIBUTE_NAME_POSITION, cc.VERTEX_ATTRIB_POSITION);
            this._whiteRecoeverShader.addAttribute(cc.ATTRIBUTE_NAME_TEX_COORD, cc.VERTEX_ATTRIB_TEX_COORDS);
            this._whiteRecoeverShader.addAttribute(cc.ATTRIBUTE_NAME_COLOR, cc.VERTEX_ATTRIB_COLOR);

            this._whiteRecoeverShader.link();
            this._whiteRecoeverShader.updateUniforms();
            this._whiteRecoeverShader.use();
        }
    },

	strike: function(callback) {
        if(!this._isStriking) {
            this._isStriking = true;
            var whiteHit = cc.callFunc(function() {
                this._whiteHit();
            }, this);
            var whiteHitRecover = cc.callFunc(function() {
                this._whiteHitRecover();
            }, this);
            this._viewObj.runAction(cc.sequence(whiteHit, cc.delayTime(0.05), whiteHitRecover, cc.delayTime(0.05),
                whiteHit, cc.delayTime(0.05), whiteHitRecover, cc.delayTime(0.05),
                cc.callFunc(function() {
                    this._isStriking = false;
                    callback && callback();
                }, this)
            ));
        }
    },

    // 白闪
    _whiteHit: function() {
        if(cc.sys.isNative) {
            var glProgram_state = cc.GLProgramState.getOrCreateWithGLProgram(this._whiteShader);
            this._viewObj.setGLProgramState(glProgram_state);
        } else {
            this._viewObj.shaderProgram = this._whiteShader;
        }
    },

    // 白闪恢复
    _whiteHitRecover: function() {
        if(cc.sys.isNative) {
            var glProgram_state = cc.GLProgramState.getOrCreateWithGLProgram(this._whiteRecoeverShader);
            this._viewObj.setGLProgramState(glProgram_state);
        } else {
            this._viewObj.shaderProgram = this._whiteRecoeverShader;
        }
    },

    _hitStatusRecover: function() {
        this._isStriking = false;
        this._whiteHitRecover();
    }
})