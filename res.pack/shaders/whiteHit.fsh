varying vec4 v_fragmentColor;    
varying vec2 v_texCoord;    
uniform sampler2D CC_Texture_1;    

void main()            
{
    vec4 v_orColor = v_fragmentColor * texture2D(CC_Texture_1, v_texCoord);
    float gray = dot(v_orColor.rgb, vec3(600, 600, 600));
    gl_FragColor = vec4(gray, gray, gray, v_orColor.a);
}