varying vec4 v_fragmentColor;    
varying vec2 v_texCoord;    
uniform sampler2D CC_Texture_2;    

void main()            
{
    vec4 v_orColor = v_fragmentColor * texture2D(CC_Texture_2, v_texCoord);
    gl_FragColor = vec4(v_orColor.r, v_orColor.g, v_orColor.b, v_orColor.a);
}