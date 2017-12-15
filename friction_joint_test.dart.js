(function(){var supportsDirectProtoAccess=function(){var z=function(){}
z.prototype={p:{}}
var y=new z()
if(!(y.__proto__&&y.__proto__.p===z.prototype.p))return false
try{if(typeof navigator!="undefined"&&typeof navigator.userAgent=="string"&&navigator.userAgent.indexOf("Chrome/")>=0)return true
if(typeof version=="function"&&version.length==0){var x=version()
if(/^\d+\.\d+\.\d+\.\d+$/.test(x))return true}}catch(w){}return false}()
function map(a){a=Object.create(null)
a.x=0
delete a.x
return a}var A=map()
var B=map()
var C=map()
var D=map()
var E=map()
var F=map()
var G=map()
var H=map()
var J=map()
var K=map()
var L=map()
var M=map()
var N=map()
var O=map()
var P=map()
var Q=map()
var R=map()
var S=map()
var T=map()
var U=map()
var V=map()
var W=map()
var X=map()
var Y=map()
var Z=map()
function I(){}init()
function setupProgram(a,b,c){"use strict"
function generateAccessor(b0,b1,b2){var g=b0.split("-")
var f=g[0]
var e=f.length
var d=f.charCodeAt(e-1)
var a0
if(g.length>1)a0=true
else a0=false
d=d>=60&&d<=64?d-59:d>=123&&d<=126?d-117:d>=37&&d<=43?d-27:0
if(d){var a1=d&3
var a2=d>>2
var a3=f=f.substring(0,e-1)
var a4=f.indexOf(":")
if(a4>0){a3=f.substring(0,a4)
f=f.substring(a4+1)}if(a1){var a5=a1&2?"r":""
var a6=a1&1?"this":"r"
var a7="return "+a6+"."+f
var a8=b2+".prototype.g"+a3+"="
var a9="function("+a5+"){"+a7+"}"
if(a0)b1.push(a8+"$reflectable("+a9+");\n")
else b1.push(a8+a9+";\n")}if(a2){var a5=a2&2?"r,v":"v"
var a6=a2&1?"this":"r"
var a7=a6+"."+f+"=v"
var a8=b2+".prototype.s"+a3+"="
var a9="function("+a5+"){"+a7+"}"
if(a0)b1.push(a8+"$reflectable("+a9+");\n")
else b1.push(a8+a9+";\n")}}return f}function defineClass(a3,a4){var g=[]
var f="function "+a3+"("
var e=""
var d=""
for(var a0=0;a0<a4.length;a0++){if(a0!=0)f+=", "
var a1=generateAccessor(a4[a0],g,a3)
d+="'"+a1+"',"
var a2="p_"+a1
f+=a2
e+="this."+a1+" = "+a2+";\n"}if(supportsDirectProtoAccess)e+="this."+"$deferredAction"+"();"
f+=") {\n"+e+"}\n"
f+=a3+".builtin$cls=\""+a3+"\";\n"
f+="$desc=$collectedClasses."+a3+"[1];\n"
f+=a3+".prototype = $desc;\n"
if(typeof defineClass.name!="string")f+=a3+".name=\""+a3+"\";\n"
f+=a3+"."+"$__fields__"+"=["+d+"];\n"
f+=g.join("")
return f}init.createNewIsolate=function(){return new I()}
init.classIdExtractor=function(d){return d.constructor.name}
init.classFieldsExtractor=function(d){var g=d.constructor.$__fields__
if(!g)return[]
var f=[]
f.length=g.length
for(var e=0;e<g.length;e++)f[e]=d[g[e]]
return f}
init.instanceFromClassId=function(d){return new init.allClasses[d]()}
init.initializeEmptyInstance=function(d,e,f){init.allClasses[d].apply(e,f)
return e}
var z=supportsDirectProtoAccess?function(d,e){var g=d.prototype
g.__proto__=e.prototype
g.constructor=d
g["$is"+d.name]=d
return convertToFastObject(g)}:function(){function tmp(){}return function(a1,a2){tmp.prototype=a2.prototype
var g=new tmp()
convertToSlowObject(g)
var f=a1.prototype
var e=Object.keys(f)
for(var d=0;d<e.length;d++){var a0=e[d]
g[a0]=f[a0]}g["$is"+a1.name]=a1
g.constructor=a1
a1.prototype=g
return g}}()
function finishClasses(a5){var g=init.allClasses
a5.combinedConstructorFunction+="return [\n"+a5.constructorsList.join(",\n  ")+"\n]"
var f=new Function("$collectedClasses",a5.combinedConstructorFunction)(a5.collected)
a5.combinedConstructorFunction=null
for(var e=0;e<f.length;e++){var d=f[e]
var a0=d.name
var a1=a5.collected[a0]
var a2=a1[0]
a1=a1[1]
g[a0]=d
a2[a0]=d}f=null
var a3=init.finishedClasses
function finishClass(c2){if(a3[c2])return
a3[c2]=true
var a6=a5.pending[c2]
if(a6&&a6.indexOf("+")>0){var a7=a6.split("+")
a6=a7[0]
var a8=a7[1]
finishClass(a8)
var a9=g[a8]
var b0=a9.prototype
var b1=g[c2].prototype
var b2=Object.keys(b0)
for(var b3=0;b3<b2.length;b3++){var b4=b2[b3]
if(!u.call(b1,b4))b1[b4]=b0[b4]}}if(!a6||typeof a6!="string"){var b5=g[c2]
var b6=b5.prototype
b6.constructor=b5
b6.$isc=b5
b6.$deferredAction=function(){}
return}finishClass(a6)
var b7=g[a6]
if(!b7)b7=existingIsolateProperties[a6]
var b5=g[c2]
var b6=z(b5,b7)
if(b0)b6.$deferredAction=mixinDeferredActionHelper(b0,b6)
if(Object.prototype.hasOwnProperty.call(b6,"%")){var b8=b6["%"].split(";")
if(b8[0]){var b9=b8[0].split("|")
for(var b3=0;b3<b9.length;b3++){init.interceptorsByTag[b9[b3]]=b5
init.leafTags[b9[b3]]=true}}if(b8[1]){b9=b8[1].split("|")
if(b8[2]){var c0=b8[2].split("|")
for(var b3=0;b3<c0.length;b3++){var c1=g[c0[b3]]
c1.$nativeSuperclassTag=b9[0]}}for(b3=0;b3<b9.length;b3++){init.interceptorsByTag[b9[b3]]=b5
init.leafTags[b9[b3]]=false}}b6.$deferredAction()}if(b6.$ish)b6.$deferredAction()}var a4=Object.keys(a5.pending)
for(var e=0;e<a4.length;e++)finishClass(a4[e])}function finishAddStubsHelper(){var g=this
while(!g.hasOwnProperty("$deferredAction"))g=g.__proto__
delete g.$deferredAction
var f=Object.keys(g)
for(var e=0;e<f.length;e++){var d=f[e]
var a0=d.charCodeAt(0)
var a1
if(d!=="^"&&d!=="$reflectable"&&a0!==43&&a0!==42&&(a1=g[d])!=null&&a1.constructor===Array&&d!=="<>")addStubs(g,a1,d,false,[])}convertToFastObject(g)
g=g.__proto__
g.$deferredAction()}function mixinDeferredActionHelper(d,e){var g
if(e.hasOwnProperty("$deferredAction"))g=e.$deferredAction
return function foo(){if(!supportsDirectProtoAccess)return
var f=this
while(!f.hasOwnProperty("$deferredAction"))f=f.__proto__
if(g)f.$deferredAction=g
else{delete f.$deferredAction
convertToFastObject(f)}d.$deferredAction()
f.$deferredAction()}}function processClassData(b2,b3,b4){b3=convertToSlowObject(b3)
var g
var f=Object.keys(b3)
var e=false
var d=supportsDirectProtoAccess&&b2!="c"
for(var a0=0;a0<f.length;a0++){var a1=f[a0]
var a2=a1.charCodeAt(0)
if(a1==="F"){processStatics(init.statics[b2]=b3.F,b4)
delete b3.F}else if(a2===43){w[g]=a1.substring(1)
var a3=b3[a1]
if(a3>0)b3[g].$reflectable=a3}else if(a2===42){b3[g].$D=b3[a1]
var a4=b3.$methodsWithOptionalArguments
if(!a4)b3.$methodsWithOptionalArguments=a4={}
a4[a1]=g}else{var a5=b3[a1]
if(a1!=="^"&&a5!=null&&a5.constructor===Array&&a1!=="<>")if(d)e=true
else addStubs(b3,a5,a1,false,[])
else g=a1}}if(e)b3.$deferredAction=finishAddStubsHelper
var a6=b3["^"],a7,a8,a9=a6
var b0=a9.split(";")
a9=b0[1]?b0[1].split(","):[]
a8=b0[0]
a7=a8.split(":")
if(a7.length==2){a8=a7[0]
var b1=a7[1]
if(b1)b3.$S=function(b5){return function(){return init.types[b5]}}(b1)}if(a8)b4.pending[b2]=a8
b4.combinedConstructorFunction+=defineClass(b2,a9)
b4.constructorsList.push(b2)
b4.collected[b2]=[m,b3]
i.push(b2)}function processStatics(a4,a5){var g=Object.keys(a4)
for(var f=0;f<g.length;f++){var e=g[f]
if(e==="^")continue
var d=a4[e]
var a0=e.charCodeAt(0)
var a1
if(a0===43){v[a1]=e.substring(1)
var a2=a4[e]
if(a2>0)a4[a1].$reflectable=a2
if(d&&d.length)init.typeInformation[a1]=d}else if(a0===42){m[a1].$D=d
var a3=a4.$methodsWithOptionalArguments
if(!a3)a4.$methodsWithOptionalArguments=a3={}
a3[e]=a1}else if(typeof d==="function"){m[a1=e]=d
h.push(e)
init.globalFunctions[e]=d}else if(d.constructor===Array)addStubs(m,d,e,true,h)
else{a1=e
processClassData(e,d,a5)}}}function addStubs(b7,b8,b9,c0,c1){var g=0,f=b8[g],e
if(typeof f=="string")e=b8[++g]
else{e=f
f=b9}var d=[b7[b9]=b7[f]=e]
e.$stubName=b9
c1.push(b9)
for(g++;g<b8.length;g++){e=b8[g]
if(typeof e!="function")break
if(!c0)e.$stubName=b8[++g]
d.push(e)
if(e.$stubName){b7[e.$stubName]=e
c1.push(e.$stubName)}}for(var a0=0;a0<d.length;g++,a0++)d[a0].$callName=b8[g]
var a1=b8[g]
b8=b8.slice(++g)
var a2=b8[0]
var a3=a2>>1
var a4=(a2&1)===1
var a5=a2===3
var a6=a2===1
var a7=b8[1]
var a8=a7>>1
var a9=(a7&1)===1
var b0=a3+a8
var b1=b0!=d[0].length
var b2=b8[2]
if(typeof b2=="number")b8[2]=b2+c
if(b>0){var b3=3
for(var a0=0;a0<a8;a0++){if(typeof b8[b3]=="number")b8[b3]=b8[b3]+b
b3++}for(var a0=0;a0<b0;a0++){b8[b3]=b8[b3]+b
b3++
if(false){var b4=b8[b3]
for(var b5=0;b5<b4.length;b5++)b4[b5]=b4[b5]+b
b3++}}}var b6=2*a8+a3+3
if(a1){e=tearOff(d,b8,c0,b9,b1)
b7[b9].$getter=e
e.$getterStub=true
if(c0){init.globalFunctions[b9]=e
c1.push(a1)}b7[a1]=e
d.push(e)
e.$stubName=a1
e.$callName=null}}function tearOffGetter(d,e,f,g){return g?new Function("funcs","reflectionInfo","name","H","c","return function tearOff_"+f+y+++"(x) {"+"if (c === null) c = "+"H.cy"+"("+"this, funcs, reflectionInfo, false, [x], name);"+"return new c(this, funcs[0], x, name);"+"}")(d,e,f,H,null):new Function("funcs","reflectionInfo","name","H","c","return function tearOff_"+f+y+++"() {"+"if (c === null) c = "+"H.cy"+"("+"this, funcs, reflectionInfo, false, [], name);"+"return new c(this, funcs[0], null, name);"+"}")(d,e,f,H,null)}function tearOff(d,e,f,a0,a1){var g
return f?function(){if(g===void 0)g=H.cy(this,d,e,true,[],a0).prototype
return g}:tearOffGetter(d,e,a0,a1)}var y=0
if(!init.libraries)init.libraries=[]
if(!init.mangledNames)init.mangledNames=map()
if(!init.mangledGlobalNames)init.mangledGlobalNames=map()
if(!init.statics)init.statics=map()
if(!init.typeInformation)init.typeInformation=map()
if(!init.globalFunctions)init.globalFunctions=map()
var x=init.libraries
var w=init.mangledNames
var v=init.mangledGlobalNames
var u=Object.prototype.hasOwnProperty
var t=a.length
var s=map()
s.collected=map()
s.pending=map()
s.constructorsList=[]
s.combinedConstructorFunction="function $reflectable(fn){fn.$reflectable=1;return fn};\n"+"var $desc;\n"
for(var r=0;r<t;r++){var q=a[r]
var p=q[0]
var o=q[1]
var n=q[2]
var m=q[3]
var l=q[4]
var k=!!q[5]
var j=l&&l["^"]
if(j instanceof Array)j=j[0]
var i=[]
var h=[]
processStatics(l,s)
x.push([p,o,i,h,n,j,k,m])}finishClasses(s)}I.I=function(){}
var dart=[["","",,H,{"^":"",kt:{"^":"c;a"}}],["","",,J,{"^":"",
u:function(a){return void 0},
bF:function(a,b,c,d){return{i:a,p:b,e:c,x:d}},
bC:function(a){var z,y,x,w,v
z=a[init.dispatchPropertyName]
if(z==null)if($.cC==null){H.jz()
z=a[init.dispatchPropertyName]}if(z!=null){y=z.p
if(!1===y)return z.i
if(!0===y)return a
x=Object.getPrototypeOf(a)
if(y===x)return z.i
if(z.e===x)throw H.e(new P.eb("Return interceptor for "+H.d(y(a,z))))}w=a.constructor
v=w==null?null:w[$.$get$bY()]
if(v!=null)return v
v=H.jH(a)
if(v!=null)return v
if(typeof a=="function")return C.a_
y=Object.getPrototypeOf(a)
if(y==null)return C.O
if(y===Object.prototype)return C.O
if(typeof w=="function"){Object.defineProperty(w,$.$get$bY(),{value:C.D,enumerable:false,writable:true,configurable:true})
return C.D}return C.D},
h:{"^":"c;",
a_:function(a,b){return a===b},
gX:function(a){return H.aj(a)},
m:["eg",function(a){return H.br(a)}],
"%":"AnimationEvent|AnimationPlayerEvent|ApplicationCacheErrorEvent|AudioProcessingEvent|AutocompleteErrorEvent|BeforeInstallPromptEvent|BeforeUnloadEvent|Blob|BlobEvent|CanvasGradient|CanvasPattern|CanvasRenderingContext2D|ClipboardEvent|CloseEvent|CompositionEvent|CustomEvent|DOMError|DOMImplementation|DeviceLightEvent|DeviceMotionEvent|DeviceOrientationEvent|DragEvent|ErrorEvent|Event|ExtendableEvent|ExtendableMessageEvent|FetchEvent|File|FileError|FocusEvent|FontFaceSetLoadEvent|GamepadEvent|GeofencingEvent|HashChangeEvent|IDBVersionChangeEvent|InputEvent|InstallEvent|KeyboardEvent|MIDIConnectionEvent|MIDIMessageEvent|MediaEncryptedEvent|MediaError|MediaKeyMessageEvent|MediaQueryListEvent|MediaStreamEvent|MediaStreamTrackEvent|MessageEvent|MouseEvent|NavigatorUserMediaError|NotificationEvent|OfflineAudioCompletionEvent|PageTransitionEvent|PointerEvent|PopStateEvent|PositionError|PresentationConnectionAvailableEvent|PresentationConnectionCloseEvent|ProgressEvent|PromiseRejectionEvent|PushEvent|PushMessageData|RTCDTMFToneChangeEvent|RTCDataChannelEvent|RTCIceCandidateEvent|RTCPeerConnectionIceEvent|Range|RelatedEvent|ResourceProgressEvent|SQLError|SVGAnimatedEnumeration|SVGAnimatedLength|SVGAnimatedLengthList|SVGAnimatedNumber|SVGAnimatedNumberList|SVGAnimatedString|SVGAnimatedTransformList|SVGZoomEvent|SecurityPolicyViolationEvent|ServicePortConnectEvent|ServiceWorkerMessageEvent|SpeechRecognitionError|SpeechRecognitionEvent|SpeechSynthesisEvent|StorageEvent|StorageManager|SyncEvent|TextEvent|TouchEvent|TrackEvent|TransitionEvent|UIEvent|USBConnectionEvent|WebGLContextEvent|WebKitTransitionEvent|WheelEvent"},
fX:{"^":"h;",
m:function(a){return String(a)},
gX:function(a){return a?519018:218159},
$iscw:1},
dg:{"^":"h;",
a_:function(a,b){return null==b},
m:function(a){return"null"},
gX:function(a){return 0}},
bZ:{"^":"h;",
gX:function(a){return 0},
m:["ei",function(a){return String(a)}],
$isfY:1},
hE:{"^":"bZ;"},
b4:{"^":"bZ;"},
aY:{"^":"bZ;",
m:function(a){var z=a[$.$get$cU()]
return z==null?this.ei(a):J.a9(z)},
$S:function(){return{func:1,opt:[,,,,,,,,,,,,,,,,]}}},
aV:{"^":"h;$ti",
bX:function(a,b){if(!!a.immutable$list)throw H.e(new P.M(b))},
fi:function(a,b){if(!!a.fixed$length)throw H.e(new P.M(b))},
dh:function(a,b){return new H.c4(a,b,[H.al(a,0),null])},
am:function(a,b){return a[b]},
gfV:function(a){if(a.length>0)return a[0]
throw H.e(H.bX())},
a7:function(a,b,c,d,e){var z,y,x,w
this.bX(a,"setRange")
P.ce(b,c,a.length,null,null,null)
z=c-b
if(z===0)return
if(e<0)H.w(P.a6(e,0,null,"skipCount",null))
if(!!J.u(d).$isk){y=e
x=d}else{d.toString
x=H.dM(d,e,null,H.al(d,0)).bD(0,!1)
y=0}if(y+z>x.length)throw H.e(H.fU())
if(y<b)for(w=z-1;w>=0;--w)a[b+w]=x[y+w]
else for(w=0;w<z;++w)a[b+w]=x[y+w]},
dR:function(a,b,c,d){return this.a7(a,b,c,d,0)},
cZ:function(a,b){var z,y
z=a.length
for(y=0;y<z;++y){if(b.$1(a[y]))return!0
if(a.length!==z)throw H.e(new P.a1(a))}return!1},
a3:function(a,b){var z
for(z=0;z<a.length;++z)if(J.Z(a[z],b))return!0
return!1},
m:function(a){return P.bm(a,"[","]")},
ga2:function(a){return new J.eW(a,a.length,0,null)},
gX:function(a){return H.aj(a)},
gw:function(a){return a.length},
sw:function(a,b){this.fi(a,"set length")
if(b<0)throw H.e(P.a6(b,0,null,"newLength",null))
a.length=b},
i:function(a,b){if(typeof b!=="number"||Math.floor(b)!==b)throw H.e(H.C(a,b))
if(b>=a.length||b<0)throw H.e(H.C(a,b))
return a[b]},
p:function(a,b,c){this.bX(a,"indexed set")
if(typeof b!=="number"||Math.floor(b)!==b)throw H.e(H.C(a,b))
if(b>=a.length||b<0)throw H.e(H.C(a,b))
a[b]=c},
$isF:1,
$asF:I.I,
$isi:1,
$asi:null,
$isk:1,
$ask:null,
F:{
fW:function(a,b){var z
if(typeof a!=="number"||Math.floor(a)!==a)throw H.e(P.cM(a,"length","is not an integer"))
if(a<0||a>4294967295)throw H.e(P.a6(a,0,4294967295,"length",null))
z=H.f(new Array(a),[b])
z.fixed$length=Array
return z}}},
ks:{"^":"aV;$ti"},
eW:{"^":"c;a,b,c,d",
gP:function(){return this.d},
M:function(){var z,y,x
z=this.a
y=z.length
if(this.b!==y)throw H.e(H.eI(z))
x=this.c
if(x>=y){this.d=null
return!1}this.d=z[x]
this.c=x+1
return!0}},
aW:{"^":"h;",
b5:function(a,b){var z
if(typeof b!=="number")throw H.e(H.ad(b))
if(a<b)return-1
else if(a>b)return 1
else if(a===b){if(a===0){z=this.gc6(b)
if(this.gc6(a)===z)return 0
if(this.gc6(a))return-1
return 1}return 0}else if(isNaN(a)){if(isNaN(b))return 0
return 1}else return-1},
gc6:function(a){return a===0?1/a<0:a<0},
a6:function(a){var z
if(a>=-2147483648&&a<=2147483647)return a|0
if(isFinite(a)){z=a<0?Math.ceil(a):Math.floor(a)
return z+0}throw H.e(new P.M(""+a+".toInt()"))},
aM:function(a){var z,y
if(a>=0){if(a<=2147483647)return a|0}else if(a>=-2147483648){z=a|0
return a===z?z:z-1}y=Math.floor(a)
if(isFinite(y))return y
throw H.e(new P.M(""+a+".floor()"))},
m:function(a){if(a===0&&1/a<0)return"-0.0"
else return""+a},
gX:function(a){return a&0x1FFFFFFF},
B:function(a,b){return a+b},
H:function(a,b){if(typeof b!=="number")throw H.e(H.ad(b))
return a-b},
cg:function(a,b){return a/b},
n:function(a,b){return a*b},
aD:function(a,b){if(typeof b!=="number")throw H.e(H.ad(b))
if((a|0)===a)if(b>=1||!1)return a/b|0
return this.cW(a,b)},
aH:function(a,b){return(a|0)===a?a/b|0:this.cW(a,b)},
cW:function(a,b){var z=a/b
if(z>=-2147483648&&z<=2147483647)return z|0
if(z>0){if(z!==1/0)return Math.floor(z)}else if(z>-1/0)return Math.ceil(z)
throw H.e(new P.M("Result of truncating division is "+H.d(z)+": "+H.d(a)+" ~/ "+b))},
b2:function(a,b){var z
if(a>0)z=b>31?0:a>>>b
else{z=b>31?31:b
z=a>>z>>>0}return z},
cq:function(a,b){return(a|b)>>>0},
L:function(a,b){if(typeof b!=="number")throw H.e(H.ad(b))
return a<b},
br:function(a,b){if(typeof b!=="number")throw H.e(H.ad(b))
return a>b},
$isS:1},
df:{"^":"aW;",$ism:1,$isS:1},
de:{"^":"aW;",$isS:1},
aX:{"^":"h;",
eM:function(a,b){if(b>=a.length)throw H.e(H.C(a,b))
return a.charCodeAt(b)},
B:function(a,b){return a+b},
ec:function(a,b,c){var z
if(c>a.length)throw H.e(P.a6(c,0,a.length,null,null))
z=c+b.length
if(z>a.length)return!1
return b===a.substring(c,z)},
eb:function(a,b){return this.ec(a,b,0)},
cB:function(a,b,c){if(c==null)c=a.length
if(b<0)throw H.e(P.bs(b,null,null))
if(b>c)throw H.e(P.bs(b,null,null))
if(c>a.length)throw H.e(P.bs(c,null,null))
return a.substring(b,c)},
ef:function(a,b){return this.cB(a,b,null)},
hy:function(a){return a.toLowerCase()},
b5:function(a,b){var z
if(typeof b!=="string")throw H.e(H.ad(b))
if(a===b)z=0
else z=a<b?-1:1
return z},
m:function(a){return a},
gX:function(a){var z,y,x
for(z=a.length,y=0,x=0;x<z;++x){y=536870911&y+a.charCodeAt(x)
y=536870911&y+((524287&y)<<10)
y^=y>>6}y=536870911&y+((67108863&y)<<3)
y^=y>>11
return 536870911&y+((16383&y)<<15)},
gw:function(a){return a.length},
i:function(a,b){if(b>=a.length||!1)throw H.e(H.C(a,b))
return a[b]},
$isF:1,
$asF:I.I,
$isz:1}}],["","",,H,{"^":"",
bX:function(){return new P.b2("No element")},
fV:function(){return new P.b2("Too many elements")},
fU:function(){return new P.b2("Too few elements")},
b1:function(a,b,c,d){if(c-b<=32)H.hW(a,b,c,d)
else H.hV(a,b,c,d)},
hW:function(a,b,c,d){var z,y,x,w,v
for(z=b+1,y=J.A(a);z<=c;++z){x=y.i(a,z)
w=z
while(!0){if(!(w>b&&J.a_(d.$2(y.i(a,w-1),x),0)))break
v=w-1
y.p(a,w,y.i(a,v))
w=v}y.p(a,w,x)}},
hV:function(a,b,c,d){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e
z=C.b.aH(c-b+1,6)
y=b+z
x=c-z
w=C.b.aH(b+c,2)
v=w-z
u=w+z
t=J.A(a)
s=t.i(a,y)
r=t.i(a,v)
q=t.i(a,w)
p=t.i(a,u)
o=t.i(a,x)
if(J.a_(d.$2(s,r),0)){n=r
r=s
s=n}if(J.a_(d.$2(p,o),0)){n=o
o=p
p=n}if(J.a_(d.$2(s,q),0)){n=q
q=s
s=n}if(J.a_(d.$2(r,q),0)){n=q
q=r
r=n}if(J.a_(d.$2(s,p),0)){n=p
p=s
s=n}if(J.a_(d.$2(q,p),0)){n=p
p=q
q=n}if(J.a_(d.$2(r,o),0)){n=o
o=r
r=n}if(J.a_(d.$2(r,q),0)){n=q
q=r
r=n}if(J.a_(d.$2(p,o),0)){n=o
o=p
p=n}t.p(a,y,s)
t.p(a,w,q)
t.p(a,x,o)
t.p(a,v,t.i(a,b))
t.p(a,u,t.i(a,c))
m=b+1
l=c-1
if(J.Z(d.$2(r,p),0)){for(k=m;k<=l;++k){j=t.i(a,k)
i=d.$2(j,r)
if(i===0)continue
if(i<0){if(k!==m){t.p(a,k,t.i(a,m))
t.p(a,m,j)}++m}else for(;!0;){i=d.$2(t.i(a,l),r)
if(i>0){--l
continue}else{h=l-1
if(i<0){t.p(a,k,t.i(a,m))
g=m+1
t.p(a,m,t.i(a,l))
t.p(a,l,j)
l=h
m=g
break}else{t.p(a,k,t.i(a,l))
t.p(a,l,j)
l=h
break}}}}f=!0}else{for(k=m;k<=l;++k){j=t.i(a,k)
if(d.$2(j,r)<0){if(k!==m){t.p(a,k,t.i(a,m))
t.p(a,m,j)}++m}else if(d.$2(j,p)>0)for(;!0;)if(d.$2(t.i(a,l),p)>0){--l
if(l<k)break
continue}else{h=l-1
if(d.$2(t.i(a,l),r)<0){t.p(a,k,t.i(a,m))
g=m+1
t.p(a,m,t.i(a,l))
t.p(a,l,j)
m=g}else{t.p(a,k,t.i(a,l))
t.p(a,l,j)}l=h
break}}f=!1}e=m-1
t.p(a,b,t.i(a,e))
t.p(a,e,r)
e=l+1
t.p(a,c,t.i(a,e))
t.p(a,e,p)
H.b1(a,b,m-2,d)
H.b1(a,l+2,c,d)
if(f)return
if(m<y&&l>x){for(;J.Z(d.$2(t.i(a,m),r),0);)++m
for(;J.Z(d.$2(t.i(a,l),p),0);)--l
for(k=m;k<=l;++k){j=t.i(a,k)
if(d.$2(j,r)===0){if(k!==m){t.p(a,k,t.i(a,m))
t.p(a,m,j)}++m}else if(d.$2(j,p)===0)for(;!0;)if(d.$2(t.i(a,l),p)===0){--l
if(l<k)break
continue}else{h=l-1
if(d.$2(t.i(a,l),r)<0){t.p(a,k,t.i(a,m))
g=m+1
t.p(a,m,t.i(a,l))
t.p(a,l,j)
m=g}else{t.p(a,k,t.i(a,l))
t.p(a,l,j)}l=h
break}}H.b1(a,m,l,d)}else H.b1(a,m,l,d)},
i:{"^":"a2;$ti",$asi:null},
aZ:{"^":"i;$ti",
ga2:function(a){return new H.dm(this,this.gw(this),0,null)},
cf:function(a,b){return this.eh(0,b)},
bD:function(a,b){var z,y
z=H.f([],[H.ak(this,"aZ",0)])
C.d.sw(z,this.gw(this))
for(y=0;y<this.gw(this);++y)z[y]=this.am(0,y)
return z},
hx:function(a){return this.bD(a,!0)}},
hY:{"^":"aZ;a,b,c,$ti",
geU:function(){var z,y
z=J.am(this.a)
y=this.c
if(y==null||y>z)return z
return y},
gfa:function(){var z,y
z=J.am(this.a)
y=this.b
if(y>z)return z
return y},
gw:function(a){var z,y,x
z=J.am(this.a)
y=this.b
if(y>=z)return 0
x=this.c
if(x==null||x>=z)return z-y
return x-y},
am:function(a,b){var z=this.gfa()+b
if(b<0||z>=this.geU())throw H.e(P.aK(b,this,"index",null,null))
return J.cH(this.a,z)},
bD:function(a,b){var z,y,x,w,v,u,t,s
z=this.b
y=this.a
x=J.A(y)
w=x.gw(y)
v=this.c
if(v!=null&&v<w)w=v
u=w-z
if(u<0)u=0
t=H.f(new Array(u),this.$ti)
for(s=0;s<u;++s){t[s]=x.am(y,z+s)
if(x.gw(y)<w)throw H.e(new P.a1(this))}return t},
eC:function(a,b,c,d){var z,y
z=this.b
if(z<0)H.w(P.a6(z,0,null,"start",null))
y=this.c
if(y!=null){if(y<0)H.w(P.a6(y,0,null,"end",null))
if(z>y)throw H.e(P.a6(z,0,y,"start",null))}},
F:{
dM:function(a,b,c,d){var z=new H.hY(a,b,c,[d])
z.eC(a,b,c,d)
return z}}},
dm:{"^":"c;a,b,c,d",
gP:function(){return this.d},
M:function(){var z,y,x,w
z=this.a
y=J.A(z)
x=y.gw(z)
if(this.b!==x)throw H.e(new P.a1(z))
w=this.c
if(w>=x){this.d=null
return!1}this.d=y.am(z,w);++this.c
return!0}},
dp:{"^":"a2;a,b,$ti",
ga2:function(a){return new H.h7(null,J.aS(this.a),this.b,this.$ti)},
gw:function(a){return J.am(this.a)},
$asa2:function(a,b){return[b]},
F:{
c3:function(a,b,c,d){if(!!a.$isi)return new H.fw(a,b,[c,d])
return new H.dp(a,b,[c,d])}}},
fw:{"^":"dp;a,b,$ti",$isi:1,
$asi:function(a,b){return[b]}},
h7:{"^":"dd;a,b,c,$ti",
M:function(){var z=this.b
if(z.M()){this.a=this.c.$1(z.gP())
return!0}this.a=null
return!1},
gP:function(){return this.a}},
c4:{"^":"aZ;a,b,$ti",
gw:function(a){return J.am(this.a)},
am:function(a,b){return this.b.$1(J.cH(this.a,b))},
$asi:function(a,b){return[b]},
$asaZ:function(a,b){return[b]},
$asa2:function(a,b){return[b]}},
ef:{"^":"a2;a,b,$ti",
ga2:function(a){return new H.ij(J.aS(this.a),this.b,this.$ti)}},
ij:{"^":"dd;a,b,$ti",
M:function(){var z,y
for(z=this.a,y=this.b;z.M();)if(y.$1(z.gP()))return!0
return!1},
gP:function(){return this.a.gP()}},
d5:{"^":"c;$ti"}}],["","",,H,{"^":"",
b6:function(a,b){var z=a.bf(b)
if(!init.globalState.d.cy)init.globalState.f.bn()
return z},
eG:function(a,b){var z,y,x,w,v,u
z={}
z.a=b
if(b==null){b=[]
z.a=b
y=b}else y=b
if(!J.u(y).$isk)throw H.e(P.cL("Arguments to main must be a List: "+H.d(y)))
init.globalState=new H.iM(0,0,1,null,null,null,null,null,null,null,null,null,a)
y=init.globalState
x=self.window==null
w=self.Worker
v=x&&!!self.postMessage
y.x=v
v=!v
if(v)w=w!=null&&$.$get$db()!=null
else w=!0
y.y=w
y.r=x&&v
y.f=new H.iB(P.c0(null,H.b5),0)
x=P.m
y.z=new H.ar(0,null,null,null,null,null,0,[x,H.cs])
y.ch=new H.ar(0,null,null,null,null,null,0,[x,null])
if(y.x){w=new H.iL()
y.Q=w
self.onmessage=function(c,d){return function(e){c(d,e)}}(H.fN,w)
self.dartPrint=self.dartPrint||function(c){return function(d){if(self.console&&self.console.log)self.console.log(d)
else self.postMessage(c(d))}}(H.iN)}if(init.globalState.x)return
y=init.globalState.a++
w=P.a3(null,null,null,x)
v=new H.bt(0,null,!1)
u=new H.cs(y,new H.ar(0,null,null,null,null,null,0,[x,H.bt]),w,init.createNewIsolate(),v,new H.an(H.bG()),new H.an(H.bG()),!1,!1,[],P.a3(null,null,null,null),null,null,!1,!0,P.a3(null,null,null,null))
w.q(0,0)
u.cE(0,v)
init.globalState.e=u
init.globalState.z.p(0,y,u)
init.globalState.d=u
if(H.bB(a,{func:1,args:[P.at]}))u.bf(new H.jM(z,a))
else if(H.bB(a,{func:1,args:[P.at,P.at]}))u.bf(new H.jN(z,a))
else u.bf(a)
init.globalState.f.bn()},
fR:function(){var z=init.currentScript
if(z!=null)return String(z.src)
if(init.globalState.x)return H.fS()
return},
fS:function(){var z,y
z=new Error().stack
if(z==null){z=function(){try{throw new Error()}catch(x){return x.stack}}()
if(z==null)throw H.e(new P.M("No stack trace"))}y=z.match(new RegExp("^ *at [^(]*\\((.*):[0-9]*:[0-9]*\\)$","m"))
if(y!=null)return y[1]
y=z.match(new RegExp("^[^@]*@(.*):[0-9]*$","m"))
if(y!=null)return y[1]
throw H.e(new P.M('Cannot extract URI from "'+z+'"'))},
fN:function(a,b){var z,y,x,w,v,u,t,s,r,q,p,o,n
z=new H.bx(!0,[]).aT(b.data)
y=J.A(z)
switch(y.i(z,"command")){case"start":init.globalState.b=y.i(z,"id")
x=y.i(z,"functionName")
w=x==null?init.globalState.cx:init.globalFunctions[x]()
v=y.i(z,"args")
u=new H.bx(!0,[]).aT(y.i(z,"msg"))
t=y.i(z,"isSpawnUri")
s=y.i(z,"startPaused")
r=new H.bx(!0,[]).aT(y.i(z,"replyTo"))
y=init.globalState.a++
q=P.m
p=P.a3(null,null,null,q)
o=new H.bt(0,null,!1)
n=new H.cs(y,new H.ar(0,null,null,null,null,null,0,[q,H.bt]),p,init.createNewIsolate(),o,new H.an(H.bG()),new H.an(H.bG()),!1,!1,[],P.a3(null,null,null,null),null,null,!1,!0,P.a3(null,null,null,null))
p.q(0,0)
n.cE(0,o)
init.globalState.f.a.aE(new H.b5(n,new H.fO(w,v,u,t,s,r),"worker-start"))
init.globalState.d=n
init.globalState.f.bn()
break
case"spawn-worker":break
case"message":if(y.i(z,"port")!=null)J.eT(y.i(z,"port"),y.i(z,"msg"))
init.globalState.f.bn()
break
case"close":init.globalState.ch.bm(0,$.$get$dc().i(0,a))
a.terminate()
init.globalState.f.bn()
break
case"log":H.fM(y.i(z,"msg"))
break
case"print":if(init.globalState.x){y=init.globalState.Q
q=P.aL(["command","print","msg",z])
q=new H.ax(!0,P.aN(null,P.m)).an(q)
y.toString
self.postMessage(q)}else P.cE(y.i(z,"msg"))
break
case"error":throw H.e(y.i(z,"msg"))}},
fM:function(a){var z,y,x,w
if(init.globalState.x){y=init.globalState.Q
x=P.aL(["command","log","msg",a])
x=new H.ax(!0,P.aN(null,P.m)).an(x)
y.toString
self.postMessage(x)}else try{self.console.log(a)}catch(w){H.Y(w)
z=H.b8(w)
y=P.bk(z)
throw H.e(y)}},
fP:function(a,b,c,d,e,f){var z,y,x,w
z=init.globalState.d
y=z.a
$.dA=$.dA+("_"+y)
$.dB=$.dB+("_"+y)
y=z.e
x=init.globalState.d.a
w=z.f
f.aC(0,["spawned",new H.by(y,x),w,z.r])
x=new H.fQ(a,b,c,d,z)
if(e){z.cY(w,w)
init.globalState.f.a.aE(new H.b5(z,x,"start isolate"))}else x.$0()},
j2:function(a){return new H.bx(!0,[]).aT(new H.ax(!1,P.aN(null,P.m)).an(a))},
jM:{"^":"l:0;a,b",
$0:function(){this.b.$1(this.a.a)}},
jN:{"^":"l:0;a,b",
$0:function(){this.b.$2(this.a.a,null)}},
iM:{"^":"c;a,b,c,d,e,f,r,x,y,z,Q,ch,cx",F:{
iN:function(a){var z=P.aL(["command","print","msg",a])
return new H.ax(!0,P.aN(null,P.m)).an(z)}}},
cs:{"^":"c;a,b,c,h6:d<,ft:e<,f,r,x,y,z,Q,ch,cx,cy,db,dx",
cY:function(a,b){if(!this.f.a_(0,a))return
if(this.Q.q(0,b)&&!this.y)this.y=!0
this.bU()},
hp:function(a){var z,y,x,w,v
if(!this.y)return
z=this.Q
z.bm(0,a)
if(z.a===0){for(z=this.z;z.length!==0;){y=z.pop()
x=init.globalState.f.a
w=x.b
v=x.a
w=(w-1&v.length-1)>>>0
x.b=w
v[w]=y
if(w===x.c)x.cQ();++x.d}this.y=!1}this.bU()},
fd:function(a,b){var z,y,x
if(this.ch==null)this.ch=[]
for(z=J.u(a),y=0;x=this.ch,y<x.length;y+=2)if(z.a_(a,x[y])){this.ch[y+1]=b
return}x.push(a)
this.ch.push(b)},
ho:function(a){var z,y,x
if(this.ch==null)return
for(z=J.u(a),y=0;x=this.ch,y<x.length;y+=2)if(z.a_(a,x[y])){z=this.ch
x=y+2
z.toString
if(typeof z!=="object"||z===null||!!z.fixed$length)H.w(new P.M("removeRange"))
P.ce(y,x,z.length,null,null,null)
z.splice(y,x-y)
return}},
dQ:function(a,b){if(!this.r.a_(0,a))return
this.db=b},
fZ:function(a,b,c){var z
if(b!==0)z=b===1&&!this.cy
else z=!0
if(z){a.aC(0,c)
return}z=this.cx
if(z==null){z=P.c0(null,null)
this.cx=z}z.aE(new H.iG(a,c))},
fY:function(a,b){var z
if(!this.r.a_(0,a))return
if(b!==0)z=b===1&&!this.cy
else z=!0
if(z){this.c9()
return}z=this.cx
if(z==null){z=P.c0(null,null)
this.cx=z}z.aE(this.gh8())},
h_:function(a,b){var z,y,x
z=this.dx
if(z.a===0){if(this.db&&this===init.globalState.e)return
if(self.console&&self.console.error)self.console.error(a,b)
else{P.cE(a)
if(b!=null)P.cE(b)}return}y=new Array(2)
y.fixed$length=Array
y[0]=J.a9(a)
y[1]=b==null?null:b.m(0)
for(x=new P.em(z,z.r,null,null),x.c=z.e;x.M();)x.d.aC(0,y)},
bf:function(a){var z,y,x,w,v,u,t
z=init.globalState.d
init.globalState.d=this
$=this.d
y=null
x=this.cy
this.cy=!0
try{y=a.$0()}catch(u){w=H.Y(u)
v=H.b8(u)
this.h_(w,v)
if(this.db){this.c9()
if(this===init.globalState.e)throw u}}finally{this.cy=x
init.globalState.d=z
if(z!=null)$=z.gh6()
if(this.cx!=null)for(;t=this.cx,!t.gbj(t);)this.cx.dn().$0()}return y},
dg:function(a){return this.b.i(0,a)},
cE:function(a,b){var z=this.b
if(z.b6(a))throw H.e(P.bk("Registry: ports must be registered only once."))
z.p(0,a,b)},
bU:function(){var z=this.b
if(z.gw(z)-this.c.a>0||this.y||!this.x)init.globalState.z.p(0,this.a,this)
else this.c9()},
c9:[function(){var z,y,x
z=this.cx
if(z!=null)z.b4(0)
for(z=this.b,y=z.gdu(z),y=y.ga2(y);y.M();)y.gP().eL()
z.b4(0)
this.c.b4(0)
init.globalState.z.bm(0,this.a)
this.dx.b4(0)
if(this.ch!=null){for(x=0;z=this.ch,x<z.length;x+=2)z[x].aC(0,z[x+1])
this.ch=null}},"$0","gh8",0,0,2]},
iG:{"^":"l:2;a,b",
$0:function(){this.a.aC(0,this.b)}},
iB:{"^":"c;a,b",
fB:function(){var z=this.a
if(z.b===z.c)return
return z.dn()},
dr:function(){var z,y,x
z=this.fB()
if(z==null){if(init.globalState.e!=null)if(init.globalState.z.b6(init.globalState.e.a))if(init.globalState.r){y=init.globalState.e.b
y=y.gbj(y)}else y=!1
else y=!1
else y=!1
if(y)H.w(P.bk("Program exited with open ReceivePorts."))
y=init.globalState
if(y.x){x=y.z
x=x.gbj(x)&&y.f.b===0}else x=!1
if(x){y=y.Q
x=P.aL(["command","close"])
x=new H.ax(!0,new P.en(0,null,null,null,null,null,0,[null,P.m])).an(x)
y.toString
self.postMessage(x)}return!1}z.hi()
return!0},
cU:function(){if(self.window!=null)new H.iC(this).$0()
else for(;this.dr(););},
bn:function(){var z,y,x,w,v
if(!init.globalState.x)this.cU()
else try{this.cU()}catch(x){z=H.Y(x)
y=H.b8(x)
w=init.globalState.Q
v=P.aL(["command","error","msg",H.d(z)+"\n"+H.d(y)])
v=new H.ax(!0,P.aN(null,P.m)).an(v)
w.toString
self.postMessage(v)}}},
iC:{"^":"l:2;a",
$0:function(){if(!this.a.dr())return
P.i9(C.G,this)}},
b5:{"^":"c;a,b,c",
hi:function(){var z=this.a
if(z.y){z.z.push(this)
return}z.bf(this.b)}},
iL:{"^":"c;"},
fO:{"^":"l:0;a,b,c,d,e,f",
$0:function(){H.fP(this.a,this.b,this.c,this.d,this.e,this.f)}},
fQ:{"^":"l:2;a,b,c,d,e",
$0:function(){var z,y
z=this.e
z.x=!0
if(!this.d)this.a.$1(this.c)
else{y=this.a
if(H.bB(y,{func:1,args:[P.at,P.at]}))y.$2(this.b,this.c)
else if(H.bB(y,{func:1,args:[P.at]}))y.$1(this.b)
else y.$0()}z.bU()}},
eh:{"^":"c;"},
by:{"^":"eh;b,a",
aC:function(a,b){var z,y,x
z=init.globalState.z.i(0,this.a)
if(z==null)return
y=this.b
if(y.c)return
x=H.j2(b)
if(z.gft()===y){y=J.A(x)
switch(y.i(x,0)){case"pause":z.cY(y.i(x,1),y.i(x,2))
break
case"resume":z.hp(y.i(x,1))
break
case"add-ondone":z.fd(y.i(x,1),y.i(x,2))
break
case"remove-ondone":z.ho(y.i(x,1))
break
case"set-errors-fatal":z.dQ(y.i(x,1),y.i(x,2))
break
case"ping":z.fZ(y.i(x,1),y.i(x,2),y.i(x,3))
break
case"kill":z.fY(y.i(x,1),y.i(x,2))
break
case"getErrors":y=y.i(x,1)
z.dx.q(0,y)
break
case"stopErrors":y=y.i(x,1)
z.dx.bm(0,y)
break}return}init.globalState.f.a.aE(new H.b5(z,new H.iO(this,x),"receive"))},
a_:function(a,b){var z,y
if(b==null)return!1
if(b instanceof H.by){z=this.b
y=b.b
y=z==null?y==null:z===y
z=y}else z=!1
return z},
gX:function(a){return this.b.a}},
iO:{"^":"l:0;a,b",
$0:function(){var z=this.a.b
if(!z.c)z.eJ(this.b)}},
ct:{"^":"eh;b,c,a",
aC:function(a,b){var z,y,x
z=P.aL(["command","message","port",this,"msg",b])
y=new H.ax(!0,P.aN(null,P.m)).an(z)
if(init.globalState.x){init.globalState.Q.toString
self.postMessage(y)}else{x=init.globalState.ch.i(0,this.b)
if(x!=null)x.postMessage(y)}},
a_:function(a,b){var z,y
if(b==null)return!1
if(b instanceof H.ct){z=this.b
y=b.b
if(z==null?y==null:z===y){z=this.a
y=b.a
if(z==null?y==null:z===y){z=this.c
y=b.c
y=z==null?y==null:z===y
z=y}else z=!1}else z=!1}else z=!1
return z},
gX:function(a){return(this.b<<16^this.a<<8^this.c)>>>0}},
bt:{"^":"c;a,b,c",
eL:function(){this.c=!0
this.b=null},
eJ:function(a){if(this.c)return
this.b.$1(a)},
$ishK:1},
dX:{"^":"c;a,b,c",
eE:function(a,b){var z,y
if(a===0)z=self.setTimeout==null||init.globalState.x
else z=!1
if(z){this.c=1
z=init.globalState.f
y=init.globalState.d
z.a.aE(new H.b5(y,new H.i7(this,b),"timer"))
this.b=!0}else if(self.setTimeout!=null){++init.globalState.f.b
this.c=self.setTimeout(H.aR(new H.i8(this,b),0),a)}else throw H.e(new P.M("Timer greater than 0."))},
eF:function(a,b){if(self.setTimeout!=null){++init.globalState.f.b
this.c=self.setInterval(H.aR(new H.i6(this,b),0),a)}else throw H.e(new P.M("Periodic timer."))},
F:{
i4:function(a,b){var z=new H.dX(!0,!1,null)
z.eE(a,b)
return z},
i5:function(a,b){var z=new H.dX(!1,!1,null)
z.eF(a,b)
return z}}},
i7:{"^":"l:2;a,b",
$0:function(){this.a.c=null
this.b.$0()}},
i8:{"^":"l:2;a,b",
$0:function(){this.a.c=null;--init.globalState.f.b
this.b.$0()}},
i6:{"^":"l:0;a,b",
$0:function(){this.b.$1(this.a)}},
an:{"^":"c;a",
gX:function(a){var z=this.a
z=C.b.b2(z,0)^C.b.aH(z,4294967296)
z=(~z>>>0)+(z<<15>>>0)&4294967295
z=((z^z>>>12)>>>0)*5&4294967295
z=((z^z>>>4)>>>0)*2057&4294967295
return(z^z>>>16)>>>0},
a_:function(a,b){var z,y
if(b==null)return!1
if(b===this)return!0
if(b instanceof H.an){z=this.a
y=b.a
return z==null?y==null:z===y}return!1}},
ax:{"^":"c;a,b",
an:[function(a){var z,y,x,w,v
if(a==null||typeof a==="string"||typeof a==="number"||typeof a==="boolean")return a
z=this.b
y=z.i(0,a)
if(y!=null)return["ref",y]
z.p(0,a,z.gw(z))
z=J.u(a)
if(!!z.$isdr)return["buffer",a]
if(!!z.$isc8)return["typed",a]
if(!!z.$isF)return this.dL(a)
if(!!z.$isfL){x=this.gdI()
w=a.gb7()
w=H.c3(w,x,H.ak(w,"a2",0),null)
w=P.c1(w,!0,H.ak(w,"a2",0))
z=z.gdu(a)
z=H.c3(z,x,H.ak(z,"a2",0),null)
return["map",w,P.c1(z,!0,H.ak(z,"a2",0))]}if(!!z.$isfY)return this.dM(a)
if(!!z.$ish)this.dt(a)
if(!!z.$ishK)this.bo(a,"RawReceivePorts can't be transmitted:")
if(!!z.$isby)return this.dN(a)
if(!!z.$isct)return this.dO(a)
if(!!z.$isl){v=a.$static_name
if(v==null)this.bo(a,"Closures can't be transmitted:")
return["function",v]}if(!!z.$isan)return["capability",a.a]
if(!(a instanceof P.c))this.dt(a)
return["dart",init.classIdExtractor(a),this.dK(init.classFieldsExtractor(a))]},"$1","gdI",2,0,1],
bo:function(a,b){throw H.e(new P.M((b==null?"Can't transmit:":b)+" "+H.d(a)))},
dt:function(a){return this.bo(a,null)},
dL:function(a){var z=this.dJ(a)
if(!!a.fixed$length)return["fixed",z]
if(!a.fixed$length)return["extendable",z]
if(!a.immutable$list)return["mutable",z]
if(a.constructor===Array)return["const",z]
this.bo(a,"Can't serialize indexable: ")},
dJ:function(a){var z,y
z=[]
C.d.sw(z,a.length)
for(y=0;y<a.length;++y)z[y]=this.an(a[y])
return z},
dK:function(a){var z
for(z=0;z<a.length;++z)C.d.p(a,z,this.an(a[z]))
return a},
dM:function(a){var z,y,x
if(!!a.constructor&&a.constructor!==Object)this.bo(a,"Only plain JS Objects are supported:")
z=Object.keys(a)
y=[]
C.d.sw(y,z.length)
for(x=0;x<z.length;++x)y[x]=this.an(a[z[x]])
return["js-object",z,y]},
dO:function(a){if(this.a)return["sendport",a.b,a.a,a.c]
return["raw sendport",a]},
dN:function(a){if(this.a)return["sendport",init.globalState.b,a.a,a.b.a]
return["raw sendport",a]}},
bx:{"^":"c;a,b",
aT:[function(a){var z,y,x,w,v
if(a==null||typeof a==="string"||typeof a==="number"||typeof a==="boolean")return a
if(typeof a!=="object"||a===null||a.constructor!==Array)throw H.e(P.cL("Bad serialized message: "+H.d(a)))
switch(C.d.gfV(a)){case"ref":return this.b[a[1]]
case"buffer":z=a[1]
this.b.push(z)
return z
case"typed":z=a[1]
this.b.push(z)
return z
case"fixed":z=a[1]
this.b.push(z)
y=H.f(this.bd(z),[null])
y.fixed$length=Array
return y
case"extendable":z=a[1]
this.b.push(z)
return H.f(this.bd(z),[null])
case"mutable":z=a[1]
this.b.push(z)
return this.bd(z)
case"const":z=a[1]
this.b.push(z)
y=H.f(this.bd(z),[null])
y.fixed$length=Array
return y
case"map":return this.fE(a)
case"sendport":return this.fF(a)
case"raw sendport":z=a[1]
this.b.push(z)
return z
case"js-object":return this.fD(a)
case"function":z=init.globalFunctions[a[1]]()
this.b.push(z)
return z
case"capability":return new H.an(a[1])
case"dart":x=a[1]
w=a[2]
v=init.instanceFromClassId(x)
this.b.push(v)
this.bd(w)
return init.initializeEmptyInstance(x,v,w)
default:throw H.e("couldn't deserialize: "+H.d(a))}},"$1","gfC",2,0,1],
bd:function(a){var z
for(z=0;z<a.length;++z)C.d.p(a,z,this.aT(a[z]))
return a},
fE:function(a){var z,y,x,w,v
z=a[1]
y=a[2]
x=P.dj()
this.b.push(x)
z=J.eR(z,this.gfC()).hx(0)
for(w=J.A(y),v=0;v<z.length;++v)x.p(0,z[v],this.aT(w.i(y,v)))
return x},
fF:function(a){var z,y,x,w,v,u,t
z=a[1]
y=a[2]
x=a[3]
w=init.globalState.b
if(z==null?w==null:z===w){v=init.globalState.z.i(0,y)
if(v==null)return
u=v.dg(x)
if(u==null)return
t=new H.by(u,y)}else t=new H.ct(z,x,y)
this.b.push(t)
return t},
fD:function(a){var z,y,x,w,v,u
z=a[1]
y=a[2]
x={}
this.b.push(x)
for(w=J.A(z),v=J.A(y),u=0;u<w.gw(z);++u)x[w.i(z,u)]=this.aT(v.i(y,u))
return x}}}],["","",,H,{"^":"",
jr:function(a){return init.types[a]},
eB:function(a,b){var z
if(b!=null){z=b.x
if(z!=null)return z}return!!J.u(a).$isP},
d:function(a){var z
if(typeof a==="string")return a
if(typeof a==="number"){if(a!==0)return""+a}else if(!0===a)return"true"
else if(!1===a)return"false"
else if(a==null)return"null"
z=J.a9(a)
if(typeof z!=="string")throw H.e(H.ad(a))
return z},
aj:function(a){var z=a.$identityHash
if(z==null){z=Math.random()*0x3fffffff|0
a.$identityHash=z}return z},
cd:function(a){var z,y,x,w,v,u,t,s
z=J.u(a)
y=z.constructor
if(typeof y=="function"){x=y.name
w=typeof x==="string"?x:null}else w=null
if(w==null||z===C.T||!!J.u(a).$isb4){v=C.J(a)
if(v==="Object"){u=a.constructor
if(typeof u=="function"){t=String(u).match(/^\s*function\s*([\w$]*)\s*\(/)
s=t==null?null:t[1]
if(typeof s==="string"&&/^\w+$/.test(s))w=s}if(w==null)w=v}else w=v}w=w
if(w.length>1&&C.v.eM(w,0)===36)w=C.v.ef(w,1)
return function(b,c){return b.replace(/[^<,> ]+/g,function(d){return c[d]||d})}(w+H.eC(H.cA(a),0,null),init.mangledGlobalNames)},
br:function(a){return"Instance of '"+H.cd(a)+"'"},
kQ:[function(){return Date.now()},"$0","j6",0,0,14],
bq:function(){var z,y
if($.au!=null)return
$.au=1000
$.v=H.j6()
if(typeof window=="undefined")return
z=window
if(z==null)return
y=z.performance
if(y==null)return
if(typeof y.now!="function")return
$.au=1e6
$.v=new H.hH(y)},
cc:function(a,b){if(a==null||typeof a==="boolean"||typeof a==="number"||typeof a==="string")throw H.e(H.ad(a))
return a[b]},
dC:function(a,b,c){if(a==null||typeof a==="boolean"||typeof a==="number"||typeof a==="string")throw H.e(H.ad(a))
a[b]=c},
C:function(a,b){var z
if(typeof b!=="number"||Math.floor(b)!==b)return new P.af(!0,b,"index",null)
z=J.am(a)
if(b<0||b>=z)return P.aK(b,a,"index",null,z)
return P.bs(b,"index",null)},
ad:function(a){return new P.af(!0,a,null,null)},
jj:function(a){return a},
e:function(a){var z
if(a==null)a=new P.dz()
z=new Error()
z.dartException=a
if("defineProperty" in Object){Object.defineProperty(z,"message",{get:H.eJ})
z.name=""}else z.toString=H.eJ
return z},
eJ:function(){return J.a9(this.dartException)},
w:function(a){throw H.e(a)},
eI:function(a){throw H.e(new P.a1(a))},
Y:function(a){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l
z=new H.jP(a)
if(a==null)return
if(typeof a!=="object")return a
if("dartException" in a)return z.$1(a.dartException)
else if(!("message" in a))return a
y=a.message
if("number" in a&&typeof a.number=="number"){x=a.number
w=x&65535
if((C.b.b2(x,16)&8191)===10)switch(w){case 438:return z.$1(H.c_(H.d(y)+" (Error "+w+")",null))
case 445:case 5007:v=H.d(y)+" (Error "+w+")"
return z.$1(new H.dy(v,null))}}if(a instanceof TypeError){u=$.$get$e0()
t=$.$get$e1()
s=$.$get$e2()
r=$.$get$e3()
q=$.$get$e7()
p=$.$get$e8()
o=$.$get$e5()
$.$get$e4()
n=$.$get$ea()
m=$.$get$e9()
l=u.at(y)
if(l!=null)return z.$1(H.c_(y,l))
else{l=t.at(y)
if(l!=null){l.method="call"
return z.$1(H.c_(y,l))}else{l=s.at(y)
if(l==null){l=r.at(y)
if(l==null){l=q.at(y)
if(l==null){l=p.at(y)
if(l==null){l=o.at(y)
if(l==null){l=r.at(y)
if(l==null){l=n.at(y)
if(l==null){l=m.at(y)
v=l!=null}else v=!0}else v=!0}else v=!0}else v=!0}else v=!0}else v=!0}else v=!0
if(v)return z.$1(new H.dy(y,l==null?null:l.method))}}return z.$1(new H.ic(typeof y==="string"?y:""))}if(a instanceof RangeError){if(typeof y==="string"&&y.indexOf("call stack")!==-1)return new P.dK()
y=function(b){try{return String(b)}catch(k){}return null}(a)
return z.$1(new P.af(!1,null,null,typeof y==="string"?y.replace(/^RangeError:\s*/,""):y))}if(typeof InternalError=="function"&&a instanceof InternalError)if(typeof y==="string"&&y==="too much recursion")return new P.dK()
return a},
b8:function(a){var z
if(a==null)return new H.eo(a,null)
z=a.$cachedTrace
if(z!=null)return z
return a.$cachedTrace=new H.eo(a,null)},
jJ:function(a){if(a==null||typeof a!='object')return J.aC(a)
else return H.aj(a)},
jo:function(a,b){var z,y,x,w
z=a.length
for(y=0;y<z;y=w){x=y+1
w=x+1
b.p(0,a[y],a[x])}return b},
jB:function(a,b,c,d,e,f,g){switch(c){case 0:return H.b6(b,new H.jC(a))
case 1:return H.b6(b,new H.jD(a,d))
case 2:return H.b6(b,new H.jE(a,d,e))
case 3:return H.b6(b,new H.jF(a,d,e,f))
case 4:return H.b6(b,new H.jG(a,d,e,f,g))}throw H.e(P.bk("Unsupported number of arguments for wrapped closure"))},
aR:function(a,b){var z
if(a==null)return
z=a.$identity
if(!!z)return z
z=function(c,d,e,f){return function(g,h,i,j){return f(c,e,d,g,h,i,j)}}(a,b,init.globalState.d,H.jB)
a.$identity=z
return z},
f4:function(a,b,c,d,e,f){var z,y,x,w,v,u,t,s,r,q,p,o,n,m
z=b[0]
y=z.$callName
if(!!J.u(c).$isk){z.$reflectionInfo=c
x=H.hM(z).r}else x=c
w=d?Object.create(new H.hX().constructor.prototype):Object.create(new H.bN(null,null,null,null).constructor.prototype)
w.$initialize=w.constructor
if(d)v=function(){this.$initialize()}
else{u=$.a0
$.a0=u+1
u=new Function("a,b,c,d"+u,"this.$initialize(a,b,c,d"+u+")")
v=u}w.constructor=v
v.prototype=w
if(!d){t=e.length==1&&!0
s=H.cQ(a,z,t)
s.$reflectionInfo=c}else{w.$static_name=f
s=z
t=!1}if(typeof x=="number")r=function(g,h){return function(){return g(h)}}(H.jr,x)
else if(typeof x=="function")if(d)r=x
else{q=t?H.cO:H.bO
r=function(g,h){return function(){return g.apply({$receiver:h(this)},arguments)}}(x,q)}else throw H.e("Error in reflectionInfo.")
w.$S=r
w[y]=s
for(u=b.length,p=1;p<u;++p){o=b[p]
n=o.$callName
if(n!=null){m=d?o:H.cQ(a,o,t)
w[n]=m}}w["call*"]=s
w.$R=z.$R
w.$D=z.$D
return v},
f1:function(a,b,c,d){var z=H.bO
switch(b?-1:a){case 0:return function(e,f){return function(){return f(this)[e]()}}(c,z)
case 1:return function(e,f){return function(g){return f(this)[e](g)}}(c,z)
case 2:return function(e,f){return function(g,h){return f(this)[e](g,h)}}(c,z)
case 3:return function(e,f){return function(g,h,i){return f(this)[e](g,h,i)}}(c,z)
case 4:return function(e,f){return function(g,h,i,j){return f(this)[e](g,h,i,j)}}(c,z)
case 5:return function(e,f){return function(g,h,i,j,k){return f(this)[e](g,h,i,j,k)}}(c,z)
default:return function(e,f){return function(){return e.apply(f(this),arguments)}}(d,z)}},
cQ:function(a,b,c){var z,y,x,w,v,u,t
if(c)return H.f3(a,b)
z=b.$stubName
y=b.length
x=a[z]
w=b==null?x==null:b===x
v=!w||y>=27
if(v)return H.f1(y,!w,z,b)
if(y===0){w=$.a0
$.a0=w+1
u="self"+H.d(w)
w="return function(){var "+u+" = this."
v=$.aE
if(v==null){v=H.ba("self")
$.aE=v}return new Function(w+H.d(v)+";return "+u+"."+H.d(z)+"();}")()}t="abcdefghijklmnopqrstuvwxyz".split("").splice(0,y).join(",")
w=$.a0
$.a0=w+1
t+=H.d(w)
w="return function("+t+"){return this."
v=$.aE
if(v==null){v=H.ba("self")
$.aE=v}return new Function(w+H.d(v)+"."+H.d(z)+"("+t+");}")()},
f2:function(a,b,c,d){var z,y
z=H.bO
y=H.cO
switch(b?-1:a){case 0:throw H.e(new H.hP("Intercepted function with no arguments."))
case 1:return function(e,f,g){return function(){return f(this)[e](g(this))}}(c,z,y)
case 2:return function(e,f,g){return function(h){return f(this)[e](g(this),h)}}(c,z,y)
case 3:return function(e,f,g){return function(h,i){return f(this)[e](g(this),h,i)}}(c,z,y)
case 4:return function(e,f,g){return function(h,i,j){return f(this)[e](g(this),h,i,j)}}(c,z,y)
case 5:return function(e,f,g){return function(h,i,j,k){return f(this)[e](g(this),h,i,j,k)}}(c,z,y)
case 6:return function(e,f,g){return function(h,i,j,k,l){return f(this)[e](g(this),h,i,j,k,l)}}(c,z,y)
default:return function(e,f,g,h){return function(){h=[g(this)]
Array.prototype.push.apply(h,arguments)
return e.apply(f(this),h)}}(d,z,y)}},
f3:function(a,b){var z,y,x,w,v,u,t,s
z=H.eX()
y=$.cN
if(y==null){y=H.ba("receiver")
$.cN=y}x=b.$stubName
w=b.length
v=a[x]
u=b==null?v==null:b===v
t=!u||w>=28
if(t)return H.f2(w,!u,x,b)
if(w===1){y="return function(){return this."+H.d(z)+"."+H.d(x)+"(this."+H.d(y)+");"
u=$.a0
$.a0=u+1
return new Function(y+H.d(u)+"}")()}s="abcdefghijklmnopqrstuvwxyz".split("").splice(0,w-1).join(",")
y="return function("+s+"){return this."+H.d(z)+"."+H.d(x)+"(this."+H.d(y)+", "+s+");"
u=$.a0
$.a0=u+1
return new Function(y+H.d(u)+"}")()},
cy:function(a,b,c,d,e,f){var z
b.fixed$length=Array
if(!!J.u(c).$isk){c.fixed$length=Array
z=c}else z=c
return H.f4(a,b,z,!!d,e,f)},
jL:function(a,b){var z=J.A(b)
throw H.e(H.f0(H.cd(a),z.cB(b,3,z.gw(b))))},
q:function(a,b){var z
if(a!=null)z=(typeof a==="object"||typeof a==="function")&&J.u(a)[b]
else z=!0
if(z)return a
H.jL(a,b)},
jm:function(a){var z=J.u(a)
return"$S" in z?z.$S():null},
bB:function(a,b){var z
if(a==null)return!1
z=H.jm(a)
return z==null?!1:H.eA(z,b)},
jO:function(a){throw H.e(new P.fd(a))},
bG:function(){return(Math.random()*0x100000000>>>0)+(Math.random()*0x100000000>>>0)*4294967296},
ez:function(a){return init.getIsolateTag(a)},
f:function(a,b){a.$ti=b
return a},
cA:function(a){if(a==null)return
return a.$ti},
jq:function(a,b){return H.eH(a["$as"+H.d(b)],H.cA(a))},
ak:function(a,b,c){var z=H.jq(a,b)
return z==null?null:z[c]},
al:function(a,b){var z=H.cA(a)
return z==null?null:z[b]},
aB:function(a,b){var z
if(a==null)return"dynamic"
if(typeof a==="object"&&a!==null&&a.constructor===Array)return a[0].builtin$cls+H.eC(a,1,b)
if(typeof a=="function")return a.builtin$cls
if(typeof a==="number"&&Math.floor(a)===a)return H.d(a)
if(typeof a.func!="undefined"){z=a.typedef
if(z!=null)return H.aB(z,b)
return H.j4(a,b)}return"unknown-reified-type"},
j4:function(a,b){var z,y,x,w,v,u,t,s,r,q,p
z=!!a.v?"void":H.aB(a.ret,b)
if("args" in a){y=a.args
for(x=y.length,w="",v="",u=0;u<x;++u,v=", "){t=y[u]
w=w+v+H.aB(t,b)}}else{w=""
v=""}if("opt" in a){s=a.opt
w+=v+"["
for(x=s.length,v="",u=0;u<x;++u,v=", "){t=s[u]
w=w+v+H.aB(t,b)}w+="]"}if("named" in a){r=a.named
w+=v+"{"
for(x=H.jn(r),q=x.length,v="",u=0;u<q;++u,v=", "){p=x[u]
w=w+v+H.aB(r[p],b)+(" "+H.d(p))}w+="}"}return"("+w+") => "+z},
eC:function(a,b,c){var z,y,x,w,v,u
if(a==null)return""
z=new P.ch("")
for(y=b,x=!0,w=!0,v="";y<a.length;++y){if(x)x=!1
else z.a=v+", "
u=a[y]
if(u!=null)w=!1
v=z.a+=H.aB(u,c)}return w?"":"<"+z.m(0)+">"},
eH:function(a,b){if(a==null)return b
a=a.apply(null,b)
if(a==null)return
if(typeof a==="object"&&a!==null&&a.constructor===Array)return a
if(typeof a=="function")return a.apply(null,b)
return b},
je:function(a,b){var z,y
if(a==null||b==null)return!0
z=a.length
for(y=0;y<z;++y)if(!H.N(a[y],b[y]))return!1
return!0},
N:function(a,b){var z,y,x,w,v,u
if(a===b)return!0
if(a==null||b==null)return!0
if(a.builtin$cls==="at")return!0
if('func' in b)return H.eA(a,b)
if('func' in a)return b.builtin$cls==="km"||b.builtin$cls==="c"
z=typeof a==="object"&&a!==null&&a.constructor===Array
y=z?a[0]:a
x=typeof b==="object"&&b!==null&&b.constructor===Array
w=x?b[0]:b
if(w!==y){v=H.aB(w,null)
if(!('$is'+v in y.prototype))return!1
u=y.prototype["$as"+v]}else u=null
if(!z&&u==null||!x)return!0
z=z?a.slice(1):null
x=x?b.slice(1):null
return H.je(H.eH(u,z),x)},
eu:function(a,b,c){var z,y,x,w,v
z=b==null
if(z&&a==null)return!0
if(z)return c
if(a==null)return!1
y=a.length
x=b.length
if(c){if(y<x)return!1}else if(y!==x)return!1
for(w=0;w<x;++w){z=a[w]
v=b[w]
if(!(H.N(z,v)||H.N(v,z)))return!1}return!0},
jd:function(a,b){var z,y,x,w,v,u
if(b==null)return!0
if(a==null)return!1
z=Object.getOwnPropertyNames(b)
z.fixed$length=Array
y=z
for(z=y.length,x=0;x<z;++x){w=y[x]
if(!Object.hasOwnProperty.call(a,w))return!1
v=b[w]
u=a[w]
if(!(H.N(v,u)||H.N(u,v)))return!1}return!0},
eA:function(a,b){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l
if(!('func' in a))return!1
if("v" in a){if(!("v" in b)&&"ret" in b)return!1}else if(!("v" in b)){z=a.ret
y=b.ret
if(!(H.N(z,y)||H.N(y,z)))return!1}x=a.args
w=b.args
v=a.opt
u=b.opt
t=x!=null?x.length:0
s=w!=null?w.length:0
r=v!=null?v.length:0
q=u!=null?u.length:0
if(t>s)return!1
if(t+r<s+q)return!1
if(t===s){if(!H.eu(x,w,!1))return!1
if(!H.eu(v,u,!0))return!1}else{for(p=0;p<t;++p){o=x[p]
n=w[p]
if(!(H.N(o,n)||H.N(n,o)))return!1}for(m=p,l=0;m<s;++l,++m){o=v[l]
n=w[m]
if(!(H.N(o,n)||H.N(n,o)))return!1}for(m=0;m<q;++l,++m){o=v[l]
n=u[m]
if(!(H.N(o,n)||H.N(n,o)))return!1}}return H.jd(a.named,b.named)},
lo:function(a){var z=$.cB
return"Instance of "+(z==null?"<Unknown>":z.$1(a))},
lm:function(a){return H.aj(a)},
ll:function(a,b,c){Object.defineProperty(a,b,{value:c,enumerable:false,writable:true,configurable:true})},
jH:function(a){var z,y,x,w,v,u
z=$.cB.$1(a)
y=$.bA[z]
if(y!=null){Object.defineProperty(a,init.dispatchPropertyName,{value:y,enumerable:false,writable:true,configurable:true})
return y.i}x=$.bE[z]
if(x!=null)return x
w=init.interceptorsByTag[z]
if(w==null){z=$.et.$2(a,z)
if(z!=null){y=$.bA[z]
if(y!=null){Object.defineProperty(a,init.dispatchPropertyName,{value:y,enumerable:false,writable:true,configurable:true})
return y.i}x=$.bE[z]
if(x!=null)return x
w=init.interceptorsByTag[z]}}if(w==null)return
x=w.prototype
v=z[0]
if(v==="!"){y=H.cD(x)
$.bA[z]=y
Object.defineProperty(a,init.dispatchPropertyName,{value:y,enumerable:false,writable:true,configurable:true})
return y.i}if(v==="~"){$.bE[z]=x
return x}if(v==="-"){u=H.cD(x)
Object.defineProperty(Object.getPrototypeOf(a),init.dispatchPropertyName,{value:u,enumerable:false,writable:true,configurable:true})
return u.i}if(v==="+")return H.eD(a,x)
if(v==="*")throw H.e(new P.eb(z))
if(init.leafTags[z]===true){u=H.cD(x)
Object.defineProperty(Object.getPrototypeOf(a),init.dispatchPropertyName,{value:u,enumerable:false,writable:true,configurable:true})
return u.i}else return H.eD(a,x)},
eD:function(a,b){var z=Object.getPrototypeOf(a)
Object.defineProperty(z,init.dispatchPropertyName,{value:J.bF(b,z,null,null),enumerable:false,writable:true,configurable:true})
return b},
cD:function(a){return J.bF(a,!1,null,!!a.$isP)},
jI:function(a,b,c){var z=b.prototype
if(init.leafTags[a]===true)return J.bF(z,!1,null,!!z.$isP)
else return J.bF(z,c,null,null)},
jz:function(){if(!0===$.cC)return
$.cC=!0
H.jA()},
jA:function(){var z,y,x,w,v,u,t,s
$.bA=Object.create(null)
$.bE=Object.create(null)
H.jv()
z=init.interceptorsByTag
y=Object.getOwnPropertyNames(z)
if(typeof window!="undefined"){window
x=function(){}
for(w=0;w<y.length;++w){v=y[w]
u=$.eE.$1(v)
if(u!=null){t=H.jI(v,z[v],u)
if(t!=null){Object.defineProperty(u,init.dispatchPropertyName,{value:t,enumerable:false,writable:true,configurable:true})
x.prototype=u}}}}for(w=0;w<y.length;++w){v=y[w]
if(/^[A-Za-z_]/.test(v)){s=z[v]
z["!"+v]=s
z["~"+v]=s
z["-"+v]=s
z["+"+v]=s
z["*"+v]=s}}},
jv:function(){var z,y,x,w,v,u,t
z=C.X()
z=H.az(C.U,H.az(C.Z,H.az(C.I,H.az(C.I,H.az(C.Y,H.az(C.V,H.az(C.W(C.J),z)))))))
if(typeof dartNativeDispatchHooksTransformer!="undefined"){y=dartNativeDispatchHooksTransformer
if(typeof y=="function")y=[y]
if(y.constructor==Array)for(x=0;x<y.length;++x){w=y[x]
if(typeof w=="function")z=w(z)||z}}v=z.getTag
u=z.getUnknownTag
t=z.prototypeForTag
$.cB=new H.jw(v)
$.et=new H.jx(u)
$.eE=new H.jy(t)},
az:function(a,b){return a(b)||b},
hL:{"^":"c;a,b,c,d,e,f,r,x",F:{
hM:function(a){var z,y,x
z=a.$reflectionInfo
if(z==null)return
z.fixed$length=Array
z=z
y=z[0]
x=z[1]
return new H.hL(a,z,(y&1)===1,y>>1,x>>1,(x&1)===1,z[2],null)}}},
hH:{"^":"l:0;a",
$0:function(){return C.a.aM(1000*this.a.now())}},
ib:{"^":"c;a,b,c,d,e,f",
at:function(a){var z,y,x
z=new RegExp(this.a).exec(a)
if(z==null)return
y=Object.create(null)
x=this.b
if(x!==-1)y.arguments=z[x+1]
x=this.c
if(x!==-1)y.argumentsExpr=z[x+1]
x=this.d
if(x!==-1)y.expr=z[x+1]
x=this.e
if(x!==-1)y.method=z[x+1]
x=this.f
if(x!==-1)y.receiver=z[x+1]
return y},
F:{
a7:function(a){var z,y,x,w,v,u
a=a.replace(String({}),'$receiver$').replace(/[[\]{}()*+?.\\^$|]/g,"\\$&")
z=a.match(/\\\$[a-zA-Z]+\\\$/g)
if(z==null)z=[]
y=z.indexOf("\\$arguments\\$")
x=z.indexOf("\\$argumentsExpr\\$")
w=z.indexOf("\\$expr\\$")
v=z.indexOf("\\$method\\$")
u=z.indexOf("\\$receiver\\$")
return new H.ib(a.replace(new RegExp('\\\\\\$arguments\\\\\\$','g'),'((?:x|[^x])*)').replace(new RegExp('\\\\\\$argumentsExpr\\\\\\$','g'),'((?:x|[^x])*)').replace(new RegExp('\\\\\\$expr\\\\\\$','g'),'((?:x|[^x])*)').replace(new RegExp('\\\\\\$method\\\\\\$','g'),'((?:x|[^x])*)').replace(new RegExp('\\\\\\$receiver\\\\\\$','g'),'((?:x|[^x])*)'),y,x,w,v,u)},
bw:function(a){return function($expr$){var $argumentsExpr$='$arguments$'
try{$expr$.$method$($argumentsExpr$)}catch(z){return z.message}}(a)},
e6:function(a){return function($expr$){try{$expr$.$method$}catch(z){return z.message}}(a)}}},
dy:{"^":"E;a,b",
m:function(a){var z=this.b
if(z==null)return"NullError: "+H.d(this.a)
return"NullError: method not found: '"+z+"' on null"}},
h1:{"^":"E;a,b,c",
m:function(a){var z,y
z=this.b
if(z==null)return"NoSuchMethodError: "+H.d(this.a)
y=this.c
if(y==null)return"NoSuchMethodError: method not found: '"+z+"' ("+H.d(this.a)+")"
return"NoSuchMethodError: method not found: '"+z+"' on '"+y+"' ("+H.d(this.a)+")"},
F:{
c_:function(a,b){var z,y
z=b==null
y=z?null:b.method
return new H.h1(a,y,z?null:b.receiver)}}},
ic:{"^":"E;a",
m:function(a){var z=this.a
return z.length===0?"Error":"Error: "+z}},
jP:{"^":"l:1;a",
$1:function(a){if(!!J.u(a).$isE)if(a.$thrownJsError==null)a.$thrownJsError=this.a
return a}},
eo:{"^":"c;a,b",
m:function(a){var z,y
z=this.b
if(z!=null)return z
z=this.a
y=z!==null&&typeof z==="object"?z.stack:null
z=y==null?"":y
this.b=z
return z}},
jC:{"^":"l:0;a",
$0:function(){return this.a.$0()}},
jD:{"^":"l:0;a,b",
$0:function(){return this.a.$1(this.b)}},
jE:{"^":"l:0;a,b,c",
$0:function(){return this.a.$2(this.b,this.c)}},
jF:{"^":"l:0;a,b,c,d",
$0:function(){return this.a.$3(this.b,this.c,this.d)}},
jG:{"^":"l:0;a,b,c,d,e",
$0:function(){return this.a.$4(this.b,this.c,this.d,this.e)}},
l:{"^":"c;",
m:function(a){return"Closure '"+H.cd(this).trim()+"'"},
gdv:function(){return this},
gdv:function(){return this}},
dN:{"^":"l;"},
hX:{"^":"dN;",
m:function(a){var z=this.$static_name
if(z==null)return"Closure of unknown static method"
return"Closure '"+z+"'"}},
bN:{"^":"dN;a,b,c,d",
a_:function(a,b){if(b==null)return!1
if(this===b)return!0
if(!(b instanceof H.bN))return!1
return this.a===b.a&&this.b===b.b&&this.c===b.c},
gX:function(a){var z,y
z=this.c
if(z==null)y=H.aj(this.a)
else y=typeof z!=="object"?J.aC(z):H.aj(z)
return(y^H.aj(this.b))>>>0},
m:function(a){var z=this.c
if(z==null)z=this.a
return"Closure '"+H.d(this.d)+"' of "+H.br(z)},
F:{
bO:function(a){return a.a},
cO:function(a){return a.c},
eX:function(){var z=$.aE
if(z==null){z=H.ba("self")
$.aE=z}return z},
ba:function(a){var z,y,x,w,v
z=new H.bN("self","target","receiver","name")
y=Object.getOwnPropertyNames(z)
y.fixed$length=Array
x=y
for(y=x.length,w=0;w<y;++w){v=x[w]
if(z[v]===a)return v}}}},
f_:{"^":"E;a",
m:function(a){return this.a},
F:{
f0:function(a,b){return new H.f_("CastError: Casting value of type '"+a+"' to incompatible type '"+b+"'")}}},
hP:{"^":"E;a",
m:function(a){return"RuntimeError: "+H.d(this.a)}},
ar:{"^":"c;a,b,c,d,e,f,r,$ti",
gw:function(a){return this.a},
gbj:function(a){return this.a===0},
gb7:function(){return new H.h3(this,[H.al(this,0)])},
gdu:function(a){return H.c3(this.gb7(),new H.h0(this),H.al(this,0),H.al(this,1))},
b6:function(a){var z
if((a&0x3ffffff)===a){z=this.c
if(z==null)return!1
return this.eR(z,a)}else return this.h3(a)},
h3:function(a){var z=this.d
if(z==null)return!1
return this.bi(this.bw(z,this.bh(a)),a)>=0},
i:function(a,b){var z,y,x
if(typeof b==="string"){z=this.b
if(z==null)return
y=this.bb(z,b)
return y==null?null:y.b}else if(typeof b==="number"&&(b&0x3ffffff)===b){x=this.c
if(x==null)return
y=this.bb(x,b)
return y==null?null:y.b}else return this.h4(b)},
h4:function(a){var z,y,x
z=this.d
if(z==null)return
y=this.bw(z,this.bh(a))
x=this.bi(y,a)
if(x<0)return
return y[x].b},
p:function(a,b,c){var z,y,x,w,v,u
if(typeof b==="string"){z=this.b
if(z==null){z=this.bO()
this.b=z}this.cD(z,b,c)}else if(typeof b==="number"&&(b&0x3ffffff)===b){y=this.c
if(y==null){y=this.bO()
this.c=y}this.cD(y,b,c)}else{x=this.d
if(x==null){x=this.bO()
this.d=x}w=this.bh(b)
v=this.bw(x,w)
if(v==null)this.bS(x,w,[this.bP(b,c)])
else{u=this.bi(v,b)
if(u>=0)v[u].b=c
else v.push(this.bP(b,c))}}},
bm:function(a,b){if(typeof b==="string")return this.cS(this.b,b)
else if(typeof b==="number"&&(b&0x3ffffff)===b)return this.cS(this.c,b)
else return this.h5(b)},
h5:function(a){var z,y,x,w
z=this.d
if(z==null)return
y=this.bw(z,this.bh(a))
x=this.bi(y,a)
if(x<0)return
w=y.splice(x,1)[0]
this.cX(w)
return w.b},
b4:function(a){if(this.a>0){this.f=null
this.e=null
this.d=null
this.c=null
this.b=null
this.a=0
this.r=this.r+1&67108863}},
d9:function(a,b){var z,y
z=this.e
y=this.r
for(;z!=null;){b.$2(z.a,z.b)
if(y!==this.r)throw H.e(new P.a1(this))
z=z.c}},
cD:function(a,b,c){var z=this.bb(a,b)
if(z==null)this.bS(a,b,this.bP(b,c))
else z.b=c},
cS:function(a,b){var z
if(a==null)return
z=this.bb(a,b)
if(z==null)return
this.cX(z)
this.cL(a,b)
return z.b},
bP:function(a,b){var z,y
z=new H.h2(a,b,null,null)
if(this.e==null){this.f=z
this.e=z}else{y=this.f
z.d=y
y.c=z
this.f=z}++this.a
this.r=this.r+1&67108863
return z},
cX:function(a){var z,y
z=a.d
y=a.c
if(z==null)this.e=y
else z.c=y
if(y==null)this.f=z
else y.d=z;--this.a
this.r=this.r+1&67108863},
bh:function(a){return J.aC(a)&0x3ffffff},
bi:function(a,b){var z,y
if(a==null)return-1
z=a.length
for(y=0;y<z;++y)if(J.Z(a[y].a,b))return y
return-1},
m:function(a){return P.h8(this)},
bb:function(a,b){return a[b]},
bw:function(a,b){return a[b]},
bS:function(a,b,c){a[b]=c},
cL:function(a,b){delete a[b]},
eR:function(a,b){return this.bb(a,b)!=null},
bO:function(){var z=Object.create(null)
this.bS(z,"<non-identifier-key>",z)
this.cL(z,"<non-identifier-key>")
return z},
$isfL:1},
h0:{"^":"l:1;a",
$1:function(a){return this.a.i(0,a)}},
h2:{"^":"c;a,b,c,d"},
h3:{"^":"i;a,$ti",
gw:function(a){return this.a.a},
ga2:function(a){var z,y
z=this.a
y=new H.h4(z,z.r,null,null)
y.c=z.e
return y}},
h4:{"^":"c;a,b,c,d",
gP:function(){return this.d},
M:function(){var z=this.a
if(this.b!==z.r)throw H.e(new P.a1(z))
else{z=this.c
if(z==null){this.d=null
return!1}else{this.d=z.a
this.c=z.c
return!0}}}},
jw:{"^":"l:1;a",
$1:function(a){return this.a(a)}},
jx:{"^":"l:7;a",
$2:function(a,b){return this.a(a,b)}},
jy:{"^":"l:8;a",
$1:function(a){return this.a(a)}}}],["","",,H,{"^":"",
jn:function(a){var z=H.f(a?Object.keys(a):[],[null])
z.fixed$length=Array
return z}}],["","",,H,{"^":"",
jK:function(a){if(typeof dartPrint=="function"){dartPrint(a)
return}if(typeof console=="object"&&typeof console.log!="undefined"){console.log(a)
return}if(typeof window=="object")return
if(typeof print=="function"){print(a)
return}throw"Unable to print message: "+String(a)}}],["","",,H,{"^":"",
b:function(a){return a},
dr:{"^":"h;",$isdr:1,"%":"ArrayBuffer"},
c8:{"^":"h;",$isc8:1,"%":"DataView;ArrayBufferView;c6|dt|dv|c7|ds|du|ai"},
c6:{"^":"c8;",
gw:function(a){return a.length},
$isF:1,
$asF:I.I,
$isP:1,
$asP:I.I},
c7:{"^":"dv;",
i:function(a,b){if(b>>>0!==b||b>=a.length)H.w(H.C(a,b))
return a[b]},
p:function(a,b,c){if(b>>>0!==b||b>=a.length)H.w(H.C(a,b))
a[b]=c}},
ai:{"^":"du;",
p:function(a,b,c){if(b>>>0!==b||b>=a.length)H.w(H.C(a,b))
a[b]=c},
$isi:1,
$asi:function(){return[P.m]},
$isk:1,
$ask:function(){return[P.m]}},
kA:{"^":"c7;",$isi:1,
$asi:function(){return[P.a8]},
$isk:1,
$ask:function(){return[P.a8]},
"%":"Float32Array"},
hn:{"^":"c7;",$isi:1,
$asi:function(){return[P.a8]},
$isk:1,
$ask:function(){return[P.a8]},
"%":"Float64Array"},
kB:{"^":"ai;",
i:function(a,b){if(b>>>0!==b||b>=a.length)H.w(H.C(a,b))
return a[b]},
$isi:1,
$asi:function(){return[P.m]},
$isk:1,
$ask:function(){return[P.m]},
"%":"Int16Array"},
kC:{"^":"ai;",
i:function(a,b){if(b>>>0!==b||b>=a.length)H.w(H.C(a,b))
return a[b]},
$isi:1,
$asi:function(){return[P.m]},
$isk:1,
$ask:function(){return[P.m]},
"%":"Int32Array"},
kD:{"^":"ai;",
i:function(a,b){if(b>>>0!==b||b>=a.length)H.w(H.C(a,b))
return a[b]},
$isi:1,
$asi:function(){return[P.m]},
$isk:1,
$ask:function(){return[P.m]},
"%":"Int8Array"},
kE:{"^":"ai;",
i:function(a,b){if(b>>>0!==b||b>=a.length)H.w(H.C(a,b))
return a[b]},
$isi:1,
$asi:function(){return[P.m]},
$isk:1,
$ask:function(){return[P.m]},
"%":"Uint16Array"},
kF:{"^":"ai;",
i:function(a,b){if(b>>>0!==b||b>=a.length)H.w(H.C(a,b))
return a[b]},
$isi:1,
$asi:function(){return[P.m]},
$isk:1,
$ask:function(){return[P.m]},
"%":"Uint32Array"},
kG:{"^":"ai;",
gw:function(a){return a.length},
i:function(a,b){if(b>>>0!==b||b>=a.length)H.w(H.C(a,b))
return a[b]},
$isi:1,
$asi:function(){return[P.m]},
$isk:1,
$ask:function(){return[P.m]},
"%":"CanvasPixelArray|Uint8ClampedArray"},
kH:{"^":"ai;",
gw:function(a){return a.length},
i:function(a,b){if(b>>>0!==b||b>=a.length)H.w(H.C(a,b))
return a[b]},
$isi:1,
$asi:function(){return[P.m]},
$isk:1,
$ask:function(){return[P.m]},
"%":";Uint8Array"},
ds:{"^":"c6+aM;",$asF:I.I,$isi:1,
$asi:function(){return[P.m]},
$asP:I.I,
$isk:1,
$ask:function(){return[P.m]}},
dt:{"^":"c6+aM;",$asF:I.I,$isi:1,
$asi:function(){return[P.a8]},
$asP:I.I,
$isk:1,
$ask:function(){return[P.a8]}},
du:{"^":"ds+d5;",$asF:I.I,
$asi:function(){return[P.m]},
$asP:I.I,
$ask:function(){return[P.m]}},
dv:{"^":"dt+d5;",$asF:I.I,
$asi:function(){return[P.a8]},
$asP:I.I,
$ask:function(){return[P.a8]}}}],["","",,P,{"^":"",
is:function(){var z,y,x
z={}
if(self.scheduleImmediate!=null)return P.jf()
if(self.MutationObserver!=null&&self.document!=null){y=self.document.createElement("div")
x=self.document.createElement("span")
z.a=null
new self.MutationObserver(H.aR(new P.iu(z),1)).observe(y,{childList:true})
return new P.it(z,y,x)}else if(self.setImmediate!=null)return P.jg()
return P.jh()},
l8:[function(a){++init.globalState.f.b
self.scheduleImmediate(H.aR(new P.iv(a),0))},"$1","jf",2,0,3],
l9:[function(a){++init.globalState.f.b
self.setImmediate(H.aR(new P.iw(a),0))},"$1","jg",2,0,3],
la:[function(a){P.cj(C.G,a)},"$1","jh",2,0,3],
j7:function(){var z,y
for(;z=$.ay,z!=null;){$.aP=null
y=z.b
$.ay=y
if(y==null)$.aO=null
z.a.$0()}},
lk:[function(){$.cu=!0
try{P.j7()}finally{$.aP=null
$.cu=!1
if($.ay!=null)$.$get$cn().$1(P.ev())}},"$0","ev",0,0,2],
jb:function(a){var z=new P.eg(a,null)
if($.ay==null){$.aO=z
$.ay=z
if(!$.cu)$.$get$cn().$1(P.ev())}else{$.aO.b=z
$.aO=z}},
jc:function(a){var z,y,x
z=$.ay
if(z==null){P.jb(a)
$.aP=$.aO
return}y=new P.eg(a,null)
x=$.aP
if(x==null){y.b=z
$.aP=y
$.ay=y}else{y.b=x.b
x.b=y
$.aP=y
if(y.b==null)$.aO=y}},
i9:function(a,b){var z=$.R
if(z===C.l){z.toString
return P.cj(a,b)}return P.cj(a,z.fh(b))},
dY:function(a,b){var z,y
z=$.R
if(z===C.l){z.toString
return P.dZ(a,b)}y=z.d_(b)
$.R.toString
return P.dZ(a,y)},
cj:function(a,b){var z=C.b.aH(a.a,1000)
return H.i4(z<0?0:z,b)},
dZ:function(a,b){var z=C.b.aH(a.a,1000)
return H.i5(z<0?0:z,b)},
er:function(a,b,c,d,e){var z={}
z.a=d
P.jc(new P.j8(z,e))},
j9:function(a,b,c,d){var z,y
y=$.R
if(y===c)return d.$0()
$.R=c
z=y
try{y=d.$0()
return y}finally{$.R=z}},
ja:function(a,b,c,d,e){var z,y
y=$.R
if(y===c)return d.$1(e)
$.R=c
z=y
try{y=d.$1(e)
return y}finally{$.R=z}},
iu:{"^":"l:1;a",
$1:function(a){var z,y;--init.globalState.f.b
z=this.a
y=z.a
z.a=null
y.$0()}},
it:{"^":"l:9;a,b,c",
$1:function(a){var z,y;++init.globalState.f.b
this.a.a=a
z=this.b
y=this.c
z.firstChild?z.removeChild(y):z.appendChild(y)}},
iv:{"^":"l:0;a",
$0:function(){--init.globalState.f.b
this.a.$0()}},
iw:{"^":"l:0;a",
$0:function(){--init.globalState.f.b
this.a.$0()}},
eg:{"^":"c;a,b"},
dW:{"^":"c;"},
j1:{"^":"c;"},
j8:{"^":"l:0;a,b",
$0:function(){var z,y,x
z=this.a
y=z.a
if(y==null){x=new P.dz()
z.a=x
z=x}else z=y
y=this.b
if(y==null)throw H.e(z)
x=H.e(z)
x.stack=y.m(0)
throw x}},
iQ:{"^":"j1;",
gb8:function(a){return},
hr:function(a){var z,y,x
try{if(C.l===$.R){a.$0()
return}P.j9(null,null,this,a)}catch(x){z=H.Y(x)
y=H.b8(x)
P.er(null,null,this,z,y)}},
hs:function(a,b){var z,y,x
try{if(C.l===$.R){a.$1(b)
return}P.ja(null,null,this,a,b)}catch(x){z=H.Y(x)
y=H.b8(x)
P.er(null,null,this,z,y)}},
fh:function(a){return new P.iR(this,a)},
d_:function(a){return new P.iS(this,a)},
i:function(a,b){return}},
iR:{"^":"l:0;a,b",
$0:function(){return this.a.hr(this.b)}},
iS:{"^":"l:1;a,b",
$1:function(a){return this.a.hs(this.b,a)}}}],["","",,P,{"^":"",
dj:function(){return new H.ar(0,null,null,null,null,null,0,[null,null])},
aL:function(a){return H.jo(a,new H.ar(0,null,null,null,null,null,0,[null,null]))},
aU:function(a,b,c,d,e){return new P.iE(0,null,null,null,null,[d,e])},
fT:function(a,b,c){var z,y
if(P.cv(a)){if(b==="("&&c===")")return"(...)"
return b+"..."+c}z=[]
y=$.$get$aQ()
y.push(a)
try{P.j5(a,z)}finally{y.pop()}y=P.dL(b,z,", ")+c
return y.charCodeAt(0)==0?y:y},
bm:function(a,b,c){var z,y,x
if(P.cv(a))return b+"..."+c
z=new P.ch(b)
y=$.$get$aQ()
y.push(a)
try{x=z
x.a=P.dL(x.gb1(),a,", ")}finally{y.pop()}y=z
y.a=y.gb1()+c
y=z.gb1()
return y.charCodeAt(0)==0?y:y},
cv:function(a){var z,y
for(z=0;y=$.$get$aQ(),z<y.length;++z)if(a===y[z])return!0
return!1},
j5:function(a,b){var z,y,x,w,v,u,t,s,r,q
z=a.ga2(a)
y=0
x=0
while(!0){if(!(y<80||x<3))break
if(!z.M())return
w=H.d(z.gP())
b.push(w)
y+=w.length+2;++x}if(!z.M()){if(x<=5)return
v=b.pop()
u=b.pop()}else{t=z.gP();++x
if(!z.M()){if(x<=4){b.push(H.d(t))
return}v=H.d(t)
u=b.pop()
y+=v.length+2}else{s=z.gP();++x
for(;z.M();t=s,s=r){r=z.gP();++x
if(x>100){while(!0){if(!(y>75&&x>3))break
y-=b.pop().length+2;--x}b.push("...")
return}}u=H.d(t)
v=H.d(s)
y+=v.length+u.length+4}}if(x>b.length+2){y+=5
q="..."}else q=null
while(!0){if(!(y>80&&b.length>3))break
y-=b.pop().length+2
if(q==null){y+=5
q="..."}}if(q!=null)b.push(q)
b.push(u)
b.push(v)},
a3:function(a,b,c,d){return new P.iH(0,null,null,null,null,null,0,[d])},
dk:function(a,b){var z,y,x
z=P.a3(null,null,null,b)
for(y=a.length,x=0;x<a.length;a.length===y||(0,H.eI)(a),++x)z.q(0,a[x])
return z},
h8:function(a){var z,y,x
z={}
if(P.cv(a))return"{...}"
y=new P.ch("")
try{$.$get$aQ().push(a)
x=y
x.a=x.gb1()+"{"
z.a=!0
a.d9(0,new P.h9(z,y))
z=y
z.a=z.gb1()+"}"}finally{$.$get$aQ().pop()}z=y.gb1()
return z.charCodeAt(0)==0?z:z},
iE:{"^":"c;a,b,c,d,e,$ti",
gw:function(a){return this.a},
b6:function(a){var z
if((a&0x3ffffff)===a){z=this.c
return z==null?!1:z[a]!=null}else return this.eQ(a)},
eQ:function(a){var z=this.d
if(z==null)return!1
return this.aG(z[this.aF(a)],a)>=0},
i:function(a,b){var z,y,x,w
if(typeof b==="string"&&b!=="__proto__"){z=this.b
if(z==null)y=null
else{x=z[b]
y=x===z?null:x}return y}else if(typeof b==="number"&&(b&0x3ffffff)===b){w=this.c
if(w==null)y=null
else{x=w[b]
y=x===w?null:x}return y}else return this.eV(b)},
eV:function(a){var z,y,x
z=this.d
if(z==null)return
y=z[this.aF(a)]
x=this.aG(y,a)
return x<0?null:y[x+1]},
p:function(a,b,c){var z,y
if(typeof b==="string"&&b!=="__proto__"){z=this.b
if(z==null){z=P.co()
this.b=z}this.cI(z,b,c)}else if(typeof b==="number"&&(b&0x3ffffff)===b){y=this.c
if(y==null){y=P.co()
this.c=y}this.cI(y,b,c)}else this.f9(b,c)},
f9:function(a,b){var z,y,x,w
z=this.d
if(z==null){z=P.co()
this.d=z}y=this.aF(a)
x=z[y]
if(x==null){P.cp(z,y,[a,b]);++this.a
this.e=null}else{w=this.aG(x,a)
if(w>=0)x[w+1]=b
else{x.push(a,b);++this.a
this.e=null}}},
d9:function(a,b){var z,y,x,w
z=this.eN()
for(y=z.length,x=0;x<y;++x){w=z[x]
b.$2(w,this.i(0,w))
if(z!==this.e)throw H.e(new P.a1(this))}},
eN:function(){var z,y,x,w,v,u,t,s,r,q,p,o
z=this.e
if(z!=null)return z
y=new Array(this.a)
y.fixed$length=Array
x=this.b
if(x!=null){w=Object.getOwnPropertyNames(x)
v=w.length
for(u=0,t=0;t<v;++t){y[u]=w[t];++u}}else u=0
s=this.c
if(s!=null){w=Object.getOwnPropertyNames(s)
v=w.length
for(t=0;t<v;++t){y[u]=+w[t];++u}}r=this.d
if(r!=null){w=Object.getOwnPropertyNames(r)
v=w.length
for(t=0;t<v;++t){q=r[w[t]]
p=q.length
for(o=0;o<p;o+=2){y[u]=q[o];++u}}}this.e=y
return y},
cI:function(a,b,c){if(a[b]==null){++this.a
this.e=null}P.cp(a,b,c)},
aF:function(a){return J.aC(a)&0x3ffffff},
aG:function(a,b){var z,y
if(a==null)return-1
z=a.length
for(y=0;y<z;y+=2)if(J.Z(a[y],b))return y
return-1},
F:{
cp:function(a,b,c){if(c==null)a[b]=a
else a[b]=c},
co:function(){var z=Object.create(null)
P.cp(z,"<non-identifier-key>",z)
delete z["<non-identifier-key>"]
return z}}},
en:{"^":"ar;a,b,c,d,e,f,r,$ti",
bh:function(a){return H.jJ(a)&0x3ffffff},
bi:function(a,b){var z,y,x
if(a==null)return-1
z=a.length
for(y=0;y<z;++y){x=a[y].a
if(x==null?b==null:x===b)return y}return-1},
F:{
aN:function(a,b){return new P.en(0,null,null,null,null,null,0,[a,b])}}},
iH:{"^":"iF;a,b,c,d,e,f,r,$ti",
ga2:function(a){var z=new P.em(this,this.r,null,null)
z.c=this.e
return z},
gw:function(a){return this.a},
a3:function(a,b){var z,y
if(typeof b==="string"&&b!=="__proto__"){z=this.b
if(z==null)return!1
return z[b]!=null}else if(typeof b==="number"&&(b&0x3ffffff)===b){y=this.c
if(y==null)return!1
return y[b]!=null}else return this.eP(b)},
eP:function(a){var z=this.d
if(z==null)return!1
return this.aG(z[this.aF(a)],a)>=0},
dg:function(a){var z=typeof a==="number"&&(a&0x3ffffff)===a
if(z)return this.a3(0,a)?a:null
else return this.f1(a)},
f1:function(a){var z,y,x
z=this.d
if(z==null)return
y=z[this.aF(a)]
x=this.aG(y,a)
if(x<0)return
return J.cG(y,x).geT()},
q:function(a,b){var z,y,x
if(typeof b==="string"&&b!=="__proto__"){z=this.b
if(z==null){y=Object.create(null)
y["<non-identifier-key>"]=y
delete y["<non-identifier-key>"]
this.b=y
z=y}return this.cH(z,b)}else if(typeof b==="number"&&(b&0x3ffffff)===b){x=this.c
if(x==null){y=Object.create(null)
y["<non-identifier-key>"]=y
delete y["<non-identifier-key>"]
this.c=y
x=y}return this.cH(x,b)}else return this.aE(b)},
aE:function(a){var z,y,x
z=this.d
if(z==null){z=P.iJ()
this.d=z}y=this.aF(a)
x=z[y]
if(x==null)z[y]=[this.bK(a)]
else{if(this.aG(x,a)>=0)return!1
x.push(this.bK(a))}return!0},
bm:function(a,b){if(typeof b==="string"&&b!=="__proto__")return this.cJ(this.b,b)
else if(typeof b==="number"&&(b&0x3ffffff)===b)return this.cJ(this.c,b)
else return this.f5(b)},
f5:function(a){var z,y,x
z=this.d
if(z==null)return!1
y=z[this.aF(a)]
x=this.aG(y,a)
if(x<0)return!1
this.cK(y.splice(x,1)[0])
return!0},
b4:function(a){if(this.a>0){this.f=null
this.e=null
this.d=null
this.c=null
this.b=null
this.a=0
this.r=this.r+1&67108863}},
cH:function(a,b){if(a[b]!=null)return!1
a[b]=this.bK(b)
return!0},
cJ:function(a,b){var z
if(a==null)return!1
z=a[b]
if(z==null)return!1
this.cK(z)
delete a[b]
return!0},
bK:function(a){var z,y
z=new P.iI(a,null,null)
if(this.e==null){this.f=z
this.e=z}else{y=this.f
z.c=y
y.b=z
this.f=z}++this.a
this.r=this.r+1&67108863
return z},
cK:function(a){var z,y
z=a.c
y=a.b
if(z==null)this.e=y
else z.b=y
if(y==null)this.f=z
else y.c=z;--this.a
this.r=this.r+1&67108863},
aF:function(a){return J.aC(a)&0x3ffffff},
aG:function(a,b){var z,y
if(a==null)return-1
z=a.length
for(y=0;y<z;++y)if(J.Z(a[y].a,b))return y
return-1},
$isi:1,
$asi:null,
F:{
iJ:function(){var z=Object.create(null)
z["<non-identifier-key>"]=z
delete z["<non-identifier-key>"]
return z}}},
iI:{"^":"c;eT:a<,b,c"},
em:{"^":"c;a,b,c,d",
gP:function(){return this.d},
M:function(){var z=this.a
if(this.b!==z.r)throw H.e(new P.a1(z))
else{z=this.c
if(z==null){this.d=null
return!1}else{this.d=z.a
this.c=z.b
return!0}}}},
iF:{"^":"hR;$ti"},
dl:{"^":"hr;$ti"},
aM:{"^":"c;$ti",
ga2:function(a){return new H.dm(a,this.gw(a),0,null)},
am:function(a,b){return this.i(a,b)},
dh:function(a,b){return new H.c4(a,b,[H.ak(a,"aM",0),null])},
fX:function(a,b,c){var z,y,x
z=this.gw(a)
for(y=b,x=0;x<z;++x){y=c.$2(y,this.i(a,x))
if(z!==this.gw(a))throw H.e(new P.a1(a))}return y},
m:function(a){return P.bm(a,"[","]")},
$isi:1,
$asi:null,
$isk:1,
$ask:null},
h9:{"^":"l:10;a,b",
$2:function(a,b){var z,y
z=this.a
if(!z.a)this.b.a+=", "
z.a=!1
z=this.b
y=z.a+=H.d(a)
z.a=y+": "
z.a+=H.d(b)}},
h5:{"^":"aZ;a,b,c,d,$ti",
ga2:function(a){return new P.iK(this,this.c,this.d,this.b,null)},
gbj:function(a){return this.b===this.c},
gw:function(a){return(this.c-this.b&this.a.length-1)>>>0},
am:function(a,b){var z,y
z=(this.c-this.b&this.a.length-1)>>>0
if(0>b||b>=z)H.w(P.aK(b,this,"index",null,z))
y=this.a
return y[(this.b+b&y.length-1)>>>0]},
b4:function(a){var z,y,x,w
z=this.b
y=this.c
if(z!==y){for(x=this.a,w=x.length-1;z!==y;z=(z+1&w)>>>0)x[z]=null
this.c=0
this.b=0;++this.d}},
m:function(a){return P.bm(this,"{","}")},
dn:function(){var z,y,x
z=this.b
if(z===this.c)throw H.e(H.bX());++this.d
y=this.a
x=y[z]
y[z]=null
this.b=(z+1&y.length-1)>>>0
return x},
aE:function(a){var z,y
z=this.a
y=this.c
z[y]=a
z=(y+1&z.length-1)>>>0
this.c=z
if(this.b===z)this.cQ();++this.d},
cQ:function(){var z,y,x,w
z=new Array(this.a.length*2)
z.fixed$length=Array
y=H.f(z,this.$ti)
z=this.a
x=this.b
w=z.length-x
C.d.a7(y,0,w,z,x)
C.d.a7(y,w,w+this.b,this.a,0)
this.b=0
this.c=this.a.length
this.a=y},
ex:function(a,b){var z=new Array(8)
z.fixed$length=Array
this.a=H.f(z,[b])},
$asi:null,
F:{
c0:function(a,b){var z=new P.h5(null,0,0,0,[b])
z.ex(a,b)
return z}}},
iK:{"^":"c;a,b,c,d,e",
gP:function(){return this.e},
M:function(){var z,y
z=this.a
if(this.c!==z.d)H.w(new P.a1(z))
y=this.d
if(y===this.b){this.e=null
return!1}z=z.a
this.e=z[y]
this.d=(y+1&z.length-1)>>>0
return!0}},
hS:{"^":"c;$ti",
aI:function(a,b){var z
for(z=J.aS(b);z.M();)this.q(0,z.gP())},
m:function(a){return P.bm(this,"{","}")},
$isi:1,
$asi:null},
hR:{"^":"hS;$ti"},
hr:{"^":"c+aM;",$isi:1,$asi:null,$isk:1,$ask:null}}],["","",,P,{"^":"",
jW:[function(a,b){return J.eM(a,b)},"$2","jl",4,0,15],
d3:function(a){if(typeof a==="number"||typeof a==="boolean"||null==a)return J.a9(a)
if(typeof a==="string")return JSON.stringify(a)
return P.fy(a)},
fy:function(a){var z=J.u(a)
if(!!z.$isl)return z.m(a)
return H.br(a)},
bk:function(a){return new P.iD(a)},
as:function(a,b,c,d){var z,y,x
z=J.fW(a,d)
if(a!==0&&!0)for(y=z.length,x=0;x<y;++x)z[x]=b
return z},
c1:function(a,b,c){var z,y
z=H.f([],[c])
for(y=J.aS(a);y.M();)z.push(y.gP())
return z},
cE:function(a){H.jK(H.d(a))},
cw:{"^":"c;"},
"+bool":0,
x:{"^":"c;"},
a8:{"^":"S;",$isx:1,
$asx:function(){return[P.S]}},
"+double":0,
aH:{"^":"c;a",
B:function(a,b){return new P.aH(C.b.B(this.a,b.gcM()))},
L:function(a,b){return C.b.L(this.a,b.gcM())},
br:function(a,b){return C.b.br(this.a,b.gcM())},
a_:function(a,b){if(b==null)return!1
if(!(b instanceof P.aH))return!1
return this.a===b.a},
gX:function(a){return this.a&0x1FFFFFFF},
b5:function(a,b){return C.b.b5(this.a,b.a)},
m:function(a){var z,y,x,w,v
z=new P.fr()
y=this.a
if(y<0)return"-"+new P.aH(0-y).m(0)
x=z.$1(C.b.aH(y,6e7)%60)
w=z.$1(C.b.aH(y,1e6)%60)
v=new P.fq().$1(y%1e6)
return""+C.b.aH(y,36e8)+":"+H.d(x)+":"+H.d(w)+"."+H.d(v)},
$isx:1,
$asx:function(){return[P.aH]},
F:{
d_:function(a,b,c,d,e,f){return new P.aH(864e8*a+36e8*b+6e7*e+1e6*f+1000*d+c)}}},
fq:{"^":"l:4;",
$1:function(a){if(a>=1e5)return""+a
if(a>=1e4)return"0"+a
if(a>=1000)return"00"+a
if(a>=100)return"000"+a
if(a>=10)return"0000"+a
return"00000"+a}},
fr:{"^":"l:4;",
$1:function(a){if(a>=10)return""+a
return"0"+a}},
E:{"^":"c;"},
dz:{"^":"E;",
m:function(a){return"Throw of null."}},
af:{"^":"E;a,b,c,d",
gbN:function(){return"Invalid argument"+(!this.a?"(s)":"")},
gbM:function(){return""},
m:function(a){var z,y,x,w,v,u
z=this.c
y=z!=null?" ("+z+")":""
z=this.d
x=z==null?"":": "+z
w=this.gbN()+y+x
if(!this.a)return w
v=this.gbM()
u=P.d3(this.b)
return w+v+": "+H.d(u)},
F:{
cL:function(a){return new P.af(!1,null,null,a)},
cM:function(a,b,c){return new P.af(!0,a,b,c)}}},
dE:{"^":"af;e,f,a,b,c,d",
gbN:function(){return"RangeError"},
gbM:function(){var z,y,x
z=this.e
if(z==null){z=this.f
y=z!=null?": Not less than or equal to "+H.d(z):""}else{x=this.f
if(x==null)y=": Not greater than or equal to "+H.d(z)
else if(x>z)y=": Not in range "+H.d(z)+".."+H.d(x)+", inclusive"
else y=x<z?": Valid value range is empty":": Only valid value is "+H.d(z)}return y},
F:{
bs:function(a,b,c){return new P.dE(null,null,!0,a,b,"Value not in range")},
a6:function(a,b,c,d,e){return new P.dE(b,c,!0,a,d,"Invalid value")},
ce:function(a,b,c,d,e,f){if(0>a||a>c)throw H.e(P.a6(a,0,c,"start",f))
if(a>b||b>c)throw H.e(P.a6(b,a,c,"end",f))
return b}}},
fG:{"^":"af;e,w:f>,a,b,c,d",
gbN:function(){return"RangeError"},
gbM:function(){if(J.cF(this.b,0))return": index must not be negative"
var z=this.f
if(z===0)return": no indices are valid"
return": index should be less than "+H.d(z)},
F:{
aK:function(a,b,c,d,e){var z=e!=null?e:J.am(b)
return new P.fG(b,z,!0,a,c,"Index out of range")}}},
M:{"^":"E;a",
m:function(a){return"Unsupported operation: "+this.a}},
eb:{"^":"E;a",
m:function(a){var z=this.a
return z!=null?"UnimplementedError: "+z:"UnimplementedError"}},
b2:{"^":"E;a",
m:function(a){return"Bad state: "+this.a}},
a1:{"^":"E;a",
m:function(a){var z=this.a
if(z==null)return"Concurrent modification during iteration."
return"Concurrent modification during iteration: "+H.d(P.d3(z))+"."}},
dK:{"^":"c;",
m:function(a){return"Stack Overflow"},
$isE:1},
fd:{"^":"E;a",
m:function(a){var z=this.a
return z==null?"Reading static variable during its initialization":"Reading static variable '"+z+"' during its initialization"}},
iD:{"^":"c;a",
m:function(a){var z=this.a
if(z==null)return"Exception"
return"Exception: "+H.d(z)}},
fz:{"^":"c;a,b",
m:function(a){return"Expando:"+H.d(this.a)},
i:function(a,b){var z,y
z=this.b
if(typeof z!=="string"){if(b==null||typeof b==="boolean"||typeof b==="number"||typeof b==="string")H.w(P.cM(b,"Expandos are not allowed on strings, numbers, booleans or null",null))
return z.get(b)}y=H.cc(b,"expando$values")
return y==null?null:H.cc(y,z)},
p:function(a,b,c){var z,y
z=this.b
if(typeof z!=="string")z.set(b,c)
else{y=H.cc(b,"expando$values")
if(y==null){y=new P.c()
H.dC(b,"expando$values",y)}H.dC(y,z,c)}}},
m:{"^":"S;",$isx:1,
$asx:function(){return[P.S]}},
"+int":0,
a2:{"^":"c;$ti",
cf:["eh",function(a,b){return new H.ef(this,b,[H.ak(this,"a2",0)])}],
gw:function(a){var z,y
z=this.ga2(this)
for(y=0;z.M();)++y
return y},
gaZ:function(a){var z,y
z=this.ga2(this)
if(!z.M())throw H.e(H.bX())
y=z.gP()
if(z.M())throw H.e(H.fV())
return y},
am:function(a,b){var z,y,x
if(b<0)H.w(P.a6(b,0,null,"index",null))
for(z=this.ga2(this),y=0;z.M();){x=z.gP()
if(b===y)return x;++y}throw H.e(P.aK(b,this,"index",null,y))},
m:function(a){return P.fT(this,"(",")")}},
dd:{"^":"c;"},
k:{"^":"c;$ti",$isi:1,$asi:null,$ask:null},
"+List":0,
at:{"^":"c;",
gX:function(a){return P.c.prototype.gX.call(this,this)},
m:function(a){return"null"}},
"+Null":0,
S:{"^":"c;",$isx:1,
$asx:function(){return[P.S]}},
"+num":0,
c:{"^":";",
a_:function(a,b){return this===b},
gX:function(a){return H.aj(this)},
m:function(a){return H.br(this)},
toString:function(){return this.m(this)}},
bv:{"^":"c;a,b",
bs:function(a){if(this.b!=null){this.a=this.a+($.v.$0()-this.b)
this.b=null}}},
z:{"^":"c;",$isx:1,
$asx:function(){return[P.z]}},
"+String":0,
ch:{"^":"c;b1:a<",
gw:function(a){return this.a.length},
m:function(a){var z=this.a
return z.charCodeAt(0)==0?z:z},
F:{
dL:function(a,b,c){var z=J.aS(b)
if(!z.M())return a
if(c.length===0){do a+=H.d(z.gP())
while(z.M())}else{a+=H.d(z.gP())
for(;z.M();)a=a+c+H.d(z.gP())}return a}}}}],["","",,W,{"^":"",
fx:function(a,b,c){var z,y
z=document.body
y=(z&&C.E).ao(z,a,b,c)
y.toString
z=new H.ef(new W.X(y),new W.jk(),[W.p])
return z.gaZ(z)},
aJ:function(a){var z,y,x
z="element tag unavailable"
try{y=J.eQ(a)
if(typeof y==="string")z=a.tagName}catch(x){H.Y(x)}return z},
iA:function(a,b){return document.createElement(a)},
j3:function(a){if(a==null)return
return W.ei(a)},
es:function(a){var z=$.R
if(z===C.l)return a
return z.d_(a)},
y:{"^":"ap;","%":"HTMLBRElement|HTMLBaseElement|HTMLButtonElement|HTMLContentElement|HTMLDListElement|HTMLDataListElement|HTMLDetailsElement|HTMLDialogElement|HTMLDirectoryElement|HTMLDivElement|HTMLFieldSetElement|HTMLFontElement|HTMLFrameElement|HTMLHRElement|HTMLHeadElement|HTMLHeadingElement|HTMLHtmlElement|HTMLKeygenElement|HTMLLIElement|HTMLLabelElement|HTMLLegendElement|HTMLLinkElement|HTMLMapElement|HTMLMarqueeElement|HTMLMenuElement|HTMLMenuItemElement|HTMLMetaElement|HTMLMeterElement|HTMLModElement|HTMLOListElement|HTMLOptGroupElement|HTMLOptionElement|HTMLOutputElement|HTMLParagraphElement|HTMLParamElement|HTMLPictureElement|HTMLPreElement|HTMLProgressElement|HTMLQuoteElement|HTMLScriptElement|HTMLShadowElement|HTMLSlotElement|HTMLSourceElement|HTMLSpanElement|HTMLStyleElement|HTMLTableCaptionElement|HTMLTableCellElement|HTMLTableColElement|HTMLTableDataCellElement|HTMLTableHeaderCellElement|HTMLTextAreaElement|HTMLTitleElement|HTMLTrackElement|HTMLUListElement|HTMLUnknownElement;HTMLElement"},
jS:{"^":"y;",
m:function(a){return String(a)},
$ish:1,
"%":"HTMLAnchorElement"},
jU:{"^":"y;",
m:function(a){return String(a)},
$ish:1,
"%":"HTMLAreaElement"},
bL:{"^":"y;",$ish:1,$isbL:1,"%":"HTMLBodyElement"},
cP:{"^":"y;aw:height}",$iscP:1,"%":"HTMLCanvasElement"},
jV:{"^":"p;w:length=",$ish:1,"%":"CDATASection|CharacterData|Comment|ProcessingInstruction|Text"},
jZ:{"^":"p;",$ish:1,"%":"DocumentFragment|ShadowRoot"},
k_:{"^":"h;",
m:function(a){return String(a)},
"%":"DOMException"},
ap:{"^":"p;hu:tagName=",
gfg:function(a){return new W.iz(a)},
m:function(a){return a.localName},
ao:["bJ",function(a,b,c,d){var z,y,x,w,v
if(c==null){z=$.d2
if(z==null){z=H.f([],[W.dw])
y=new W.dx(z)
z.push(W.ek(null))
z.push(W.ep())
$.d2=y
d=y}else d=z
z=$.d1
if(z==null){z=new W.eq(d)
$.d1=z
c=z}else{z.a=d
c=z}}if($.aa==null){z=document
y=z.implementation.createHTMLDocument("")
$.aa=y
$.bU=y.createRange()
y=$.aa
y.toString
x=y.createElement("base")
x.href=z.baseURI
$.aa.head.appendChild(x)}z=$.aa
if(z.body==null){z.toString
y=z.createElement("body")
z.body=y}z=$.aa
if(!!this.$isbL)w=z.body
else{y=a.tagName
z.toString
w=z.createElement(y)
$.aa.body.appendChild(w)}if("createContextualFragment" in window.Range.prototype&&!C.d.a3(C.aa,a.tagName)){$.bU.selectNodeContents(w)
v=$.bU.createContextualFragment(b)}else{w.innerHTML=b
v=$.aa.createDocumentFragment()
for(;z=w.firstChild,z!=null;)v.appendChild(z)}z=$.aa.body
if(w==null?z!=null:w!==z)J.eS(w)
c.cs(v)
document.adoptNode(v)
return v},function(a,b,c){return this.ao(a,b,c,null)},"fw",null,null,"ghO",2,5,null],
sdf:function(a,b){this.bG(a,b)},
bH:function(a,b,c,d){a.textContent=null
a.appendChild(this.ao(a,b,c,d))},
bG:function(a,b){return this.bH(a,b,null,null)},
$ish:1,
$isc:1,
$isap:1,
$isp:1,
"%":";Element"},
jk:{"^":"l:1;",
$1:function(a){return!!J.u(a).$isap}},
k0:{"^":"y;aw:height}","%":"HTMLEmbedElement"},
bV:{"^":"h;","%":"MediaStream;EventTarget"},
kl:{"^":"y;w:length=","%":"HTMLFormElement"},
ko:{"^":"y;aw:height}","%":"HTMLIFrameElement"},
kp:{"^":"y;aw:height}","%":"HTMLImageElement"},
kr:{"^":"y;aw:height}",$ish:1,$isap:1,"%":"HTMLInputElement"},
ku:{"^":"h;",
m:function(a){return String(a)},
"%":"Location"},
hc:{"^":"y;","%":"HTMLAudioElement;HTMLMediaElement"},
kx:{"^":"hd;",
hI:function(a,b,c){return a.send(b,c)},
aC:function(a,b){return a.send(b)},
"%":"MIDIOutput"},
hd:{"^":"bV;","%":"MIDIInput;MIDIPort"},
kI:{"^":"h;",$ish:1,"%":"Navigator"},
X:{"^":"dl;a",
gaZ:function(a){var z,y
z=this.a
y=z.childNodes.length
if(y===0)throw H.e(new P.b2("No elements"))
if(y>1)throw H.e(new P.b2("More than one element"))
return z.firstChild},
aI:function(a,b){var z,y,x,w
z=b.a
y=this.a
if(z!==y)for(x=z.childNodes.length,w=0;w<x;++w)y.appendChild(z.firstChild)
return},
p:function(a,b,c){var z=this.a
z.replaceChild(c,z.childNodes[b])},
ga2:function(a){var z=this.a.childNodes
return new W.d6(z,z.length,-1,null)},
gw:function(a){return this.a.childNodes.length},
i:function(a,b){return this.a.childNodes[b]},
$asi:function(){return[W.p]},
$asdl:function(){return[W.p]},
$ask:function(){return[W.p]}},
p:{"^":"bV;b8:parentElement=,hh:previousSibling=",
hn:function(a){var z=a.parentNode
if(z!=null)z.removeChild(a)},
m:function(a){var z=a.nodeValue
return z==null?this.eg(a):z},
$isc:1,
$isp:1,
"%":"Attr|Document|HTMLDocument|XMLDocument;Node"},
kJ:{"^":"fK;",
gw:function(a){return a.length},
i:function(a,b){if(b>>>0!==b||b>=a.length)throw H.e(P.aK(b,a,null,null,null))
return a[b]},
p:function(a,b,c){throw H.e(new P.M("Cannot assign element of immutable List."))},
am:function(a,b){return a[b]},
$isF:1,
$asF:function(){return[W.p]},
$isi:1,
$asi:function(){return[W.p]},
$isP:1,
$asP:function(){return[W.p]},
$isk:1,
$ask:function(){return[W.p]},
"%":"NodeList|RadioNodeList"},
kK:{"^":"y;aw:height}","%":"HTMLObjectElement"},
kX:{"^":"y;w:length=","%":"HTMLSelectElement"},
i0:{"^":"y;",
ao:function(a,b,c,d){var z,y
if("createContextualFragment" in window.Range.prototype)return this.bJ(a,b,c,d)
z=W.fx("<table>"+b+"</table>",c,d)
y=document.createDocumentFragment()
y.toString
z.toString
new W.X(y).aI(0,new W.X(z))
return y},
"%":"HTMLTableElement"},
l_:{"^":"y;",
ao:function(a,b,c,d){var z,y,x,w
if("createContextualFragment" in window.Range.prototype)return this.bJ(a,b,c,d)
z=document
y=z.createDocumentFragment()
z=C.R.ao(z.createElement("table"),b,c,d)
z.toString
z=new W.X(z)
x=z.gaZ(z)
x.toString
z=new W.X(x)
w=z.gaZ(z)
y.toString
w.toString
new W.X(y).aI(0,new W.X(w))
return y},
"%":"HTMLTableRowElement"},
l0:{"^":"y;",
ao:function(a,b,c,d){var z,y,x
if("createContextualFragment" in window.Range.prototype)return this.bJ(a,b,c,d)
z=document
y=z.createDocumentFragment()
z=C.R.ao(z.createElement("table"),b,c,d)
z.toString
z=new W.X(z)
x=z.gaZ(z)
y.toString
x.toString
new W.X(y).aI(0,new W.X(x))
return y},
"%":"HTMLTableSectionElement"},
dO:{"^":"y;",
bH:function(a,b,c,d){var z
a.textContent=null
z=this.ao(a,b,c,d)
a.content.appendChild(z)},
bG:function(a,b){return this.bH(a,b,null,null)},
$isdO:1,
"%":"HTMLTemplateElement"},
l4:{"^":"hc;aw:height}","%":"HTMLVideoElement"},
ik:{"^":"bV;",
cT:function(a,b){return a.requestAnimationFrame(H.aR(b,1))},
cN:function(a){if(!!(a.requestAnimationFrame&&a.cancelAnimationFrame))return;(function(b){var z=['ms','moz','webkit','o']
for(var y=0;y<z.length&&!b.requestAnimationFrame;++y){b.requestAnimationFrame=b[z[y]+'RequestAnimationFrame']
b.cancelAnimationFrame=b[z[y]+'CancelAnimationFrame']||b[z[y]+'CancelRequestAnimationFrame']}if(b.requestAnimationFrame&&b.cancelAnimationFrame)return
b.requestAnimationFrame=function(c){return window.setTimeout(function(){c(Date.now())},16)}
b.cancelAnimationFrame=function(c){clearTimeout(c)}})(a)},
gb8:function(a){return W.j3(a.parent)},
$ish:1,
"%":"DOMWindow|Window"},
lb:{"^":"p;",$ish:1,"%":"DocumentType"},
ld:{"^":"y;",$ish:1,"%":"HTMLFrameSetElement"},
lg:{"^":"fJ;",
gw:function(a){return a.length},
i:function(a,b){if(b>>>0!==b||b>=a.length)throw H.e(P.aK(b,a,null,null,null))
return a[b]},
p:function(a,b,c){throw H.e(new P.M("Cannot assign element of immutable List."))},
am:function(a,b){return a[b]},
$isF:1,
$asF:function(){return[W.p]},
$isi:1,
$asi:function(){return[W.p]},
$isP:1,
$asP:function(){return[W.p]},
$isk:1,
$ask:function(){return[W.p]},
"%":"MozNamedAttrMap|NamedNodeMap"},
ix:{"^":"c;eW:a<",
gb7:function(){var z,y,x,w,v
z=this.a.attributes
y=H.f([],[P.z])
for(x=z.length,w=0;w<x;++w){v=z[w]
if(v.namespaceURI==null)y.push(v.name)}return y}},
iz:{"^":"ix;a",
i:function(a,b){return this.a.getAttribute(b)},
p:function(a,b,c){this.a.setAttribute(b,c)},
gw:function(a){return this.gb7().length}},
cq:{"^":"c;a",
b3:function(a){return $.$get$el().a3(0,W.aJ(a))},
aS:function(a,b,c){var z,y,x
z=W.aJ(a)
y=$.$get$cr()
x=y.i(0,H.d(z)+"::"+b)
if(x==null)x=y.i(0,"*::"+b)
if(x==null)return!1
return x.$4(a,b,c,this)},
eH:function(a){var z,y
z=$.$get$cr()
if(z.gbj(z)){for(y=0;y<262;++y)z.p(0,C.a9[y],W.jt())
for(y=0;y<12;++y)z.p(0,C.y[y],W.ju())}},
F:{
ek:function(a){var z,y
z=document.createElement("a")
y=new W.iT(z,window.location)
y=new W.cq(y)
y.eH(a)
return y},
le:[function(a,b,c,d){return!0},"$4","jt",8,0,6],
lf:[function(a,b,c,d){var z,y,x,w,v
z=d.a
y=z.a
y.href=c
x=y.hostname
z=z.b
w=z.hostname
if(x==null?w==null:x===w){w=y.port
v=z.port
if(w==null?v==null:w===v){w=y.protocol
z=z.protocol
z=w==null?z==null:w===z}else z=!1}else z=!1
if(!z)if(x==="")if(y.port===""){z=y.protocol
z=z===":"||z===""}else z=!1
else z=!1
else z=!0
return z},"$4","ju",8,0,6]}},
d9:{"^":"c;$ti",
ga2:function(a){return new W.d6(a,this.gw(a),-1,null)},
$isi:1,
$asi:null,
$isk:1,
$ask:null},
dx:{"^":"c;a",
b3:function(a){return C.d.cZ(this.a,new W.hq(a))},
aS:function(a,b,c){return C.d.cZ(this.a,new W.hp(a,b,c))}},
hq:{"^":"l:1;a",
$1:function(a){return a.b3(this.a)}},
hp:{"^":"l:1;a,b,c",
$1:function(a){return a.aS(this.a,this.b,this.c)}},
iU:{"^":"c;",
b3:function(a){return this.a.a3(0,W.aJ(a))},
aS:["ej",function(a,b,c){var z,y
z=W.aJ(a)
y=this.c
if(y.a3(0,H.d(z)+"::"+b))return this.d.ff(c)
else if(y.a3(0,"*::"+b))return this.d.ff(c)
else{y=this.b
if(y.a3(0,H.d(z)+"::"+b))return!0
else if(y.a3(0,"*::"+b))return!0
else if(y.a3(0,H.d(z)+"::*"))return!0
else if(y.a3(0,"*::*"))return!0}return!1}],
eI:function(a,b,c,d){var z,y,x
this.a.aI(0,c)
z=b.cf(0,new W.iV())
y=b.cf(0,new W.iW())
this.b.aI(0,z)
x=this.c
x.aI(0,C.ab)
x.aI(0,y)}},
iV:{"^":"l:1;",
$1:function(a){return!C.d.a3(C.y,a)}},
iW:{"^":"l:1;",
$1:function(a){return C.d.a3(C.y,a)}},
iZ:{"^":"iU;e,a,b,c,d",
aS:function(a,b,c){if(this.ej(a,b,c))return!0
if(b==="template"&&c==="")return!0
if(a.getAttribute("template")==="")return this.e.a3(0,b)
return!1},
F:{
ep:function(){var z=P.z
z=new W.iZ(P.dk(C.x,z),P.a3(null,null,null,z),P.a3(null,null,null,z),P.a3(null,null,null,z),null)
z.eI(null,new H.c4(C.x,new W.j_(),[H.al(C.x,0),null]),["TEMPLATE"],null)
return z}}},
j_:{"^":"l:1;",
$1:function(a){return"TEMPLATE::"+H.d(a)}},
iY:{"^":"c;",
b3:function(a){var z=J.u(a)
if(!!z.$isdG)return!1
z=!!z.$iso
if(z&&W.aJ(a)==="foreignObject")return!1
if(z)return!0
return!1},
aS:function(a,b,c){if(b==="is"||C.v.eb(b,"on"))return!1
return this.b3(a)}},
d6:{"^":"c;a,b,c,d",
M:function(){var z,y
z=this.c+1
y=this.b
if(z<y){this.d=J.cG(this.a,z)
this.c=z
return!0}this.d=null
this.c=y
return!1},
gP:function(){return this.d}},
iy:{"^":"c;a",
gb8:function(a){return W.ei(this.a.parent)},
$ish:1,
F:{
ei:function(a){if(a===window)return a
else return new W.iy(a)}}},
dw:{"^":"c;"},
iT:{"^":"c;a,b"},
eq:{"^":"c;a",
cs:function(a){new W.j0(this).$2(a,null)},
bA:function(a,b){var z
if(b==null){z=a.parentNode
if(z!=null)z.removeChild(a)}else b.removeChild(a)},
f8:function(a,b){var z,y,x,w,v,u,t,s
z=!0
y=null
x=null
try{y=J.eN(a)
x=y.geW().getAttribute("is")
w=function(c){if(!(c.attributes instanceof NamedNodeMap))return true
var r=c.childNodes
if(c.lastChild&&c.lastChild!==r[r.length-1])return true
if(c.children)if(!(c.children instanceof HTMLCollection||c.children instanceof NodeList))return true
var q=0
if(c.children)q=c.children.length
for(var p=0;p<q;p++){var o=c.children[p]
if(o.id=='attributes'||o.name=='attributes'||o.id=='lastChild'||o.name=='lastChild'||o.id=='children'||o.name=='children')return true}return false}(a)
z=w?!0:!(a.attributes instanceof NamedNodeMap)}catch(t){H.Y(t)}v="element unprintable"
try{v=J.a9(a)}catch(t){H.Y(t)}try{u=W.aJ(a)
this.f7(a,b,z,v,u,y,x)}catch(t){if(H.Y(t) instanceof P.af)throw t
else{this.bA(a,b)
window
s="Removing corrupted element "+H.d(v)
if(typeof console!="undefined")console.warn(s)}}},
f7:function(a,b,c,d,e,f,g){var z,y,x,w,v
if(c){this.bA(a,b)
window
z="Removing element due to corrupted attributes on <"+d+">"
if(typeof console!="undefined")console.warn(z)
return}if(!this.a.b3(a)){this.bA(a,b)
window
z="Removing disallowed element <"+H.d(e)+"> from "+J.a9(b)
if(typeof console!="undefined")console.warn(z)
return}if(g!=null)if(!this.a.aS(a,"is",g)){this.bA(a,b)
window
z="Removing disallowed type extension <"+H.d(e)+' is="'+g+'">'
if(typeof console!="undefined")console.warn(z)
return}z=f.gb7()
y=H.f(z.slice(0),[H.al(z,0)])
for(x=f.gb7().length-1,z=f.a;x>=0;--x){w=y[x]
if(!this.a.aS(a,J.eU(w),z.getAttribute(w))){window
v="Removing disallowed attribute <"+H.d(e)+" "+w+'="'+H.d(z.getAttribute(w))+'">'
if(typeof console!="undefined")console.warn(v)
z.getAttribute(w)
z.removeAttribute(w)}}if(!!J.u(a).$isdO)this.cs(a.content)}},
j0:{"^":"l:11;a",
$2:function(a,b){var z,y,x,w
switch(a.nodeType){case 1:this.a.f8(a,b)
break
case 8:case 11:case 3:case 4:break
default:if(b==null){x=a.parentNode
if(x!=null)x.removeChild(a)}else b.removeChild(a)}z=a.lastChild
for(;null!=z;){y=null
try{y=J.eP(z)}catch(w){H.Y(w)
x=z
a.removeChild(x)
z=null
y=a.lastChild}if(z!=null)this.$2(z,a)
z=y}}},
fH:{"^":"h+aM;",$isi:1,
$asi:function(){return[W.p]},
$isk:1,
$ask:function(){return[W.p]}},
fI:{"^":"h+aM;",$isi:1,
$asi:function(){return[W.p]},
$isk:1,
$ask:function(){return[W.p]}},
fJ:{"^":"fH+d9;",$isi:1,
$asi:function(){return[W.p]},
$isk:1,
$ask:function(){return[W.p]}},
fK:{"^":"fI+d9;",$isi:1,
$asi:function(){return[W.p]},
$isk:1,
$ask:function(){return[W.p]}}}],["","",,P,{"^":""}],["","",,P,{"^":"",jR:{"^":"aq;",$ish:1,"%":"SVGAElement"},jT:{"^":"o;",$ish:1,"%":"SVGAnimateElement|SVGAnimateMotionElement|SVGAnimateTransformElement|SVGAnimationElement|SVGSetElement"},k1:{"^":"o;C:x=,D:y=",$ish:1,"%":"SVGFEBlendElement"},k2:{"^":"o;C:x=,D:y=",$ish:1,"%":"SVGFEColorMatrixElement"},k3:{"^":"o;C:x=,D:y=",$ish:1,"%":"SVGFEComponentTransferElement"},k4:{"^":"o;C:x=,D:y=",$ish:1,"%":"SVGFECompositeElement"},k5:{"^":"o;C:x=,D:y=",$ish:1,"%":"SVGFEConvolveMatrixElement"},k6:{"^":"o;C:x=,D:y=",$ish:1,"%":"SVGFEDiffuseLightingElement"},k7:{"^":"o;C:x=,D:y=",$ish:1,"%":"SVGFEDisplacementMapElement"},k8:{"^":"o;C:x=,D:y=",$ish:1,"%":"SVGFEFloodElement"},k9:{"^":"o;C:x=,D:y=",$ish:1,"%":"SVGFEGaussianBlurElement"},ka:{"^":"o;C:x=,D:y=",$ish:1,"%":"SVGFEImageElement"},kb:{"^":"o;C:x=,D:y=",$ish:1,"%":"SVGFEMergeElement"},kc:{"^":"o;C:x=,D:y=",$ish:1,"%":"SVGFEMorphologyElement"},kd:{"^":"o;C:x=,D:y=",$ish:1,"%":"SVGFEOffsetElement"},ke:{"^":"o;C:x=,D:y=","%":"SVGFEPointLightElement"},kf:{"^":"o;C:x=,D:y=",$ish:1,"%":"SVGFESpecularLightingElement"},kg:{"^":"o;C:x=,D:y=","%":"SVGFESpotLightElement"},kh:{"^":"o;C:x=,D:y=",$ish:1,"%":"SVGFETileElement"},ki:{"^":"o;C:x=,D:y=",$ish:1,"%":"SVGFETurbulenceElement"},kj:{"^":"o;C:x=,D:y=",$ish:1,"%":"SVGFilterElement"},kk:{"^":"aq;C:x=,D:y=","%":"SVGForeignObjectElement"},fF:{"^":"aq;","%":"SVGCircleElement|SVGEllipseElement|SVGLineElement|SVGPathElement|SVGPolygonElement|SVGPolylineElement;SVGGeometryElement"},aq:{"^":"o;",$ish:1,"%":"SVGClipPathElement|SVGDefsElement|SVGGElement|SVGSwitchElement;SVGGraphicsElement"},kq:{"^":"aq;C:x=,D:y=",$ish:1,"%":"SVGImageElement"},kv:{"^":"o;",$ish:1,"%":"SVGMarkerElement"},kw:{"^":"o;C:x=,D:y=",$ish:1,"%":"SVGMaskElement"},kO:{"^":"o;C:x=,D:y=",$ish:1,"%":"SVGPatternElement"},kP:{"^":"h;w:length=","%":"SVGPointList"},kT:{"^":"h;aw:height},C:x=,D:y=","%":"SVGRect"},kU:{"^":"fF;C:x=,D:y=","%":"SVGRectElement"},dG:{"^":"o;",$ish:1,$isdG:1,"%":"SVGScriptElement"},o:{"^":"ap;",
sdf:function(a,b){this.bG(a,b)},
ao:function(a,b,c,d){var z,y,x,w,v,u
z=H.f([],[W.dw])
z.push(W.ek(null))
z.push(W.ep())
z.push(new W.iY())
c=new W.eq(new W.dx(z))
y='<svg version="1.1">'+b+"</svg>"
z=document
x=z.body
w=(x&&C.E).fw(x,y,c)
v=z.createDocumentFragment()
w.toString
z=new W.X(w)
u=z.gaZ(z)
for(;z=u.firstChild,z!=null;)v.appendChild(z)
return v},
$ish:1,
$iso:1,
"%":"SVGComponentTransferFunctionElement|SVGDescElement|SVGDiscardElement|SVGFEDistantLightElement|SVGFEFuncAElement|SVGFEFuncBElement|SVGFEFuncGElement|SVGFEFuncRElement|SVGFEMergeNodeElement|SVGMetadataElement|SVGStopElement|SVGStyleElement|SVGTitleElement;SVGElement"},kY:{"^":"aq;C:x=,D:y=",$ish:1,"%":"SVGSVGElement"},kZ:{"^":"o;",$ish:1,"%":"SVGSymbolElement"},dP:{"^":"aq;","%":";SVGTextContentElement"},l1:{"^":"dP;",$ish:1,"%":"SVGTextPathElement"},l2:{"^":"dP;C:x=,D:y=","%":"SVGTSpanElement|SVGTextElement|SVGTextPositioningElement"},l3:{"^":"aq;C:x=,D:y=",$ish:1,"%":"SVGUseElement"},l5:{"^":"o;",$ish:1,"%":"SVGViewElement"},lc:{"^":"o;",$ish:1,"%":"SVGGradientElement|SVGLinearGradientElement|SVGRadialGradientElement"},lh:{"^":"o;",$ish:1,"%":"SVGCursorElement"},li:{"^":"o;",$ish:1,"%":"SVGFEDropShadowElement"},lj:{"^":"o;",$ish:1,"%":"SVGMPathElement"}}],["","",,P,{"^":"",fB:{"^":"c;",$isi:1,
$asi:function(){return[P.a8]},
$isk:1,
$ask:function(){return[P.a8]}}}],["","",,P,{"^":""}],["","",,P,{"^":""}],["","",,P,{"^":""}],["","",,V,{"^":"",
h_:function(a,a0){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b
switch(a0.a){case C.N:H.q(a0,"$iskz")
z=new E.a(new Float64Array(H.b(2)))
y=new E.a(new Float64Array(H.b(2)))
x=new E.a(new Float64Array(H.b(2)))
w=new V.hf(z,y,0,0,0,x,0,0,0,new E.a(new Float64Array(H.b(2))),new E.a(new Float64Array(H.b(2))),0,0,new E.a4(new Float64Array(H.b(4))),new E.a(new Float64Array(H.b(2))),a0.gay(a0),null,null,null,null,null,null,!1,!1,null,null)
w.ah(a.ch,a0)
y.h(a0.gi6(a0))
G.cl(w.r.d,y,z)
w.fr=a0.ghd()
x.I()
w.cy=a0.gda()
w.db=a0.gd4()
return w
case C.L:H.q(a0,"$isjY")
z=new Float64Array(H.b(2))
y=new Float64Array(H.b(2))
x=new Float64Array(H.b(2))
w=new Float64Array(H.b(2))
v=new Float64Array(H.b(2))
u=new E.a(new Float64Array(H.b(2)))
u.h(a0.f)
t=new E.a(new Float64Array(H.b(2)))
t.h(a0.r)
v=new V.fo(0,0,0,u,t,0,0,0,0,0,new E.a(z),new E.a(y),new E.a(x),new E.a(w),new E.a(v),0,0,0,0,0,a0.a,null,null,null,null,null,null,!1,!1,null,null)
v.ah(a.ch,a0)
v.fx=a0.x
v.ch=a0.y
v.cx=a0.z
return v
case C.a4:H.q(a0,"$iskR")
z=new Float64Array(H.b(3))
y=new Float64Array(H.b(2))
x=new Float64Array(H.b(2))
w=new Float64Array(H.b(2))
v=new Float64Array(H.b(2))
u=new Float64Array(H.b(9))
t=a0.gbk()
s=new E.a(new Float64Array(H.b(2)))
s.h(t)
t=a0.gbl()
r=new E.a(new Float64Array(H.b(2)))
r.h(t)
t=a0.ghb()
q=new E.a(new Float64Array(H.b(2)))
q.h(t)
q.Y()
t=new E.a(new Float64Array(H.b(2)))
u=new V.hI(s,r,q,t,null,new E.ac(z),0,0,0,0,0,!1,!1,null,0,0,new E.a(y),new E.a(x),0,0,0,0,new E.a(w),new E.a(v),0,0,0,0,new E.ah(u),0,a0.gay(a0),null,null,null,null,null,null,!1,!1,null,null)
u.ah(a.ch,a0)
q.O(1,t)
u.dx=a0.gdm()
u.fx=a0.ghY()
u.fy=a0.gi9()
u.go=a0.gi0()
u.id=a0.gdi()
u.k1=a0.gfM()
u.k2=a0.gd5()
u.k3=C.m
return u
case C.a1:H.q(a0,"$iskV")
z=new E.a(new Float64Array(H.b(2)))
y=new E.a(new Float64Array(H.b(2)))
x=new V.hN(z,y,new E.ac(new Float64Array(H.b(3))),0,!1,0,0,!1,0,0,0,0,0,new E.a(new Float64Array(H.b(2))),new E.a(new Float64Array(H.b(2))),new E.a(new Float64Array(H.b(2))),new E.a(new Float64Array(H.b(2))),0,0,0,0,new E.ah(new Float64Array(H.b(9))),0,C.m,a0.gay(a0),null,null,null,null,null,null,!1,!1,null,null)
x.ah(a.ch,a0)
z.h(a0.gbk())
y.h(a0.gbl())
x.fy=a0.gdm()
x.go=a0.ghX()
x.id=a0.gi8()
x.dy=a0.ghe()
x.fr=a0.gdi()
x.fx=a0.gfM()
x.dx=a0.gd5()
return x
case C.a7:H.q(a0,"$isl6")
z=new Float64Array(H.b(2))
y=new Float64Array(H.b(2))
x=new Float64Array(H.b(2))
w=new Float64Array(H.b(2))
v=new Float64Array(H.b(9))
u=a0.gbk()
t=new E.a(new Float64Array(H.b(2)))
t.h(u)
u=a0.gbl()
s=new E.a(new Float64Array(H.b(2)))
s.h(u)
v=new V.ih(0,0,0,t,s,0,0,new E.ac(new Float64Array(H.b(3))),0,0,new E.a(z),new E.a(y),new E.a(x),new E.a(w),0,0,0,0,new E.ah(v),a0.gay(a0),null,null,null,null,null,null,!1,!1,null,null)
v.ah(a.ch,a0)
v.dy=a0.gdm()
v.ch=a0.gda()
v.cx=a0.gd4()
return v
case C.w:H.q(a0,"$isd8")
z=new Float64Array(H.b(2))
y=new Float64Array(H.b(2))
x=new Float64Array(H.b(2))
w=new Float64Array(H.b(2))
v=new Float64Array(H.b(4))
u=new E.a(new Float64Array(H.b(2)))
u.h(a0.f)
t=new E.a(new Float64Array(H.b(2)))
t.h(a0.r)
v=new V.fC(u,t,new E.a(new Float64Array(H.b(2))),0,0,0,0,0,new E.a(z),new E.a(y),new E.a(x),new E.a(w),0,0,0,0,new E.a4(v),0,a0.a,null,null,null,null,null,null,!1,!1,null,null)
v.ah(a.ch,a0)
v.dx=a0.x
v.dy=a0.y
return v
case C.a6:H.q(a0,"$isl7")
z=new E.a(new Float64Array(H.b(2)))
y=new E.a(new Float64Array(H.b(2)))
x=new E.a(new Float64Array(H.b(2)))
w=new E.a(new Float64Array(H.b(2)))
v=new V.ii(0,0,z,y,x,w,0,0,0,0,0,!1,0,0,new E.a(new Float64Array(H.b(2))),new E.a(new Float64Array(H.b(2))),0,0,0,0,new E.a(new Float64Array(H.b(2))),new E.a(new Float64Array(H.b(2))),0,0,0,0,0,0,0,0,0,new E.a(new Float64Array(H.b(2))),new E.a(new Float64Array(H.b(2))),new E.a(new Float64Array(H.b(2))),a0.gay(a0),null,null,null,null,null,null,!1,!1,null,null)
v.ah(a.ch,a0)
z.h(a0.gbk())
y.h(a0.gbl())
x.h(a0.ghb())
x.O(1,w)
v.W=0
v.fx=0
v.go=a0.ghe()
v.id=a0.gdi()
v.k1=a0.gd5()
v.ch=a0.gda()
v.cx=a0.gd4()
return v
case C.a5:H.q(a0,"$iskn")
z=new E.a(new Float64Array(H.b(2)))
y=new E.a(new Float64Array(H.b(2)))
x=new E.a(new Float64Array(H.b(2)))
w=new E.a(new Float64Array(H.b(2)))
v=new E.a(new Float64Array(H.b(2)))
u=new E.a(new Float64Array(H.b(2)))
t=new Float64Array(H.b(2))
s=new Float64Array(H.b(2))
r=new Float64Array(H.b(2))
q=new Float64Array(H.b(2))
p=new Float64Array(H.b(2))
o=new Float64Array(H.b(2))
n=a0.gc7()
m=a0.gc8()
l=a0.gc7().dG()
k=a0.gc8().dG()
j=a0.gc7().dw()
i=a0.gc8().dw()
o=new V.fE(n,m,l,k,j,i,z,y,x,w,v,u,0,0,0,0,0,0,0,0,0,new E.a(t),new E.a(s),new E.a(r),new E.a(q),0,0,0,0,0,0,0,0,new E.a(p),new E.a(o),0,0,0,0,0,a0.gay(a0),null,null,null,null,null,null,!1,!1,null,null)
o.ah(a.ch,a0)
n=n.dA()
o.f=n
h=n.d
g=j.gbT()
j.gaP().gl()
t=o.Q.a
s=t.a
r=t.b
q=r+1
t.b=q
r=s[r]
t.b=q+1
t=s[q]
f=a0.gc7()
x.h(f.geZ())
z.h(f.gf_())
o.k2=f.gf4()
v.h(f.gf0())
G.j(h.b,z,t)
t.q(0,h.a)
t.j(g.gab())
G.W(g.gca(),t,r)
r.j(x)
e=r.A(v)
o.Q.a.b-=2
z=m.dA()
o.r=z
d=z.d
c=i.gbT()
i.gaP().gl()
z=o.Q.a
x=z.a
v=z.b
t=v+1
z.b=t
v=x[v]
z.b=t+1
z=x[t]
f=a0.gc8()
w.h(f.geZ())
y.h(f.gf_())
o.k3=f.gf4()
u.h(f.gf0())
G.j(d.b,y,z)
z.q(0,d.a)
z.j(c.gab())
G.W(c.gca(),z,v)
v.j(w)
b=v.A(u)
o.Q.a.b-=2
z=a0.ghl()
o.r1=z
o.k4=e+z*b
o.r2=0
return o
case C.M:H.q(a0,"$iskS")
z=new E.a(new Float64Array(H.b(2)))
y=new E.a(new Float64Array(H.b(2)))
x=new E.a(new Float64Array(H.b(2)))
w=new E.a(new Float64Array(H.b(2)))
v=new V.dD(z,y,0,0,x,w,0,0,0,0,0,new E.a(new Float64Array(H.b(2))),new E.a(new Float64Array(H.b(2))),new E.a(new Float64Array(H.b(2))),new E.a(new Float64Array(H.b(2))),new E.a(new Float64Array(H.b(2))),new E.a(new Float64Array(H.b(2))),0,0,0,0,0,a0.gay(a0),null,null,null,null,null,null,!1,!1,null,null)
v.ah(a.ch,a0)
z.h(a0.ghD())
y.h(a0.ghE())
x.h(a0.gbk())
w.h(a0.gbl())
v.fx=a0.ghl()
v.cy=a0.gh9()
v.db=a0.gha()
v.fr=a0.gh9().B(0,C.b.n(v.fx,a0.gha()))
v.fy=0
return v
case C.K:return V.f7(a,H.q(a0,"$isjX"))
case C.a2:H.q(a0,"$iskW")
z=new E.a(new Float64Array(H.b(2)))
y=new E.a(new Float64Array(H.b(2)))
x=new V.hO(z,y,0,0,0,0,0,new E.a(new Float64Array(H.b(2))),new E.a(new Float64Array(H.b(2))),new E.a(new Float64Array(H.b(2))),new E.a(new Float64Array(H.b(2))),new E.a(new Float64Array(H.b(2))),0,0,0,0,0,C.m,a0.gay(a0),null,null,null,null,null,null,!1,!1,null,null)
x.ah(a.ch,a0)
z.h(a0.gbk())
y.h(a0.gbl())
x.cy=a0.gi_(a0)
return x
case C.a3:H.q(a0,"$isky")
z=new E.a(new Float64Array(H.b(2)))
y=new V.he(z,0,new E.a(new Float64Array(H.b(2))),0,0,0,0,0,0,new E.a(new Float64Array(H.b(2))),new E.a(new Float64Array(H.b(2))),new E.a(new Float64Array(H.b(2))),new E.a(new Float64Array(H.b(2))),new E.a(new Float64Array(H.b(2))),0,0,0,0,0,new E.a4(new Float64Array(H.b(4))),0,a0.gay(a0),null,null,null,null,null,null,!1,!1,null,null)
y.ah(a.ch,a0)
z.h(a0.ghW())
y.cx=a0.ghM()
y.db=0
y.dx=a0.ghd()
y.dy=a0.gi1()
y.fr=a0.ghN()
return y
case C.a0:default:return}},
hC:function(a){return a.gc4(a).L(0,0)},
f8:{"^":"c;",
cw:function(a,b){var z,y,x
z=a.y
y=b.y
x=z.c
if(x===y.c&&x!==0)return x>0
return(z.b&y.a)!==0&&(z.a&y.b)!==0}},
cR:{"^":"c;a,b,c"},
fe:{"^":"c;"},
ae:{"^":"c;a,b",
ci:function(a){var z,y,x
z=this.a.a
y=this.b.a
x=a.a
x[0]=(z[0]+y[0])*0.5
x[1]=(z[1]+y[1])*0.5},
a0:function(a,b){var z,y,x,w
z=a.a.a
y=z[0]
x=b.a.a
w=x[0]
y=y<w?y:w
w=this.a.a
w[0]=y
z=z[1]
x=x[1]
w[1]=z<x?z:x
z=a.b.a
y=z[0]
x=b.b.a
w=x[0]
y=y>w?y:w
w=this.b.a
w[0]=y
z=z[1]
x=x[1]
w[1]=z>x?z:x},
m:function(a){return"AABB["+this.a.m(0)+" . "+this.b.m(0)+"]"},
F:{
aD:function(){return new V.ae(new E.a(new Float64Array(H.b(2))),new E.a(new Float64Array(H.b(2))))},
eV:function(a,b){var z,y
z=b.a.a
y=a.b.a
if(z[0]-y[0]>0||z[1]-y[1]>0)return!1
z=a.a.a
y=b.b.a
if(z[0]-y[0]>0||z[1]-y[1]>0)return!1
return!0}}},
ff:{"^":"c;a,b,c,d,e,f,r,x,y",
hv:function(a,b){var z,y,x,w
z=this.a
y=z.b[a].gaQ()
x=z.b[b].gaQ()
z=x.a.a
w=y.b.a
if(z[0]-w[0]>0||z[1]-w[1]>0)return!1
z=y.a.a
w=x.b.a
if(z[0]-w[0]>0||z[1]-w[1]>0)return!1
return!0},
ce:function(a){var z,y,x,w,v,u,t,s,r
this.x=0
for(z=this.a,y=0;y<this.e;++y){x=this.c[y]
this.y=x
if(x===-1)continue
z.hj(0,this,z.b[x].gaQ())}this.e=0
F.eF(this.f,0,this.x)
for(y=0;y<this.x;){w=this.f[y]
x=w.a
v=z.b[x].gaz()
x=w.b
a.fe(v,z.b[x].gaz());++y
for(x=this.x,u=this.f;y<x;){t=u[y]
s=t.a
r=w.a
if(s==null?r==null:s===r){s=t.b
r=w.b
r=s==null?r!=null:s!==r
s=r}else s=!0
if(s)break;++y}}},
d1:function(a){var z,y,x
z=this.e
y=this.d
if(z===y){x=this.c
z=y*2
this.d=z
z=new Array(z)
z.fixed$length=Array
z=H.f(z,[P.m])
this.c=z
C.d.a7(z,0,x.length,x,0)}z=this.c
y=this.e
z[y]=a
this.e=y+1},
ds:function(a){var z,y,x,w,v
if(a===this.y)return!0
z=this.x
y=this.r
if(z===y){x=this.f
z=y*2
this.r=z
z=new Array(z)
z.fixed$length=Array
z=H.f(z,[V.b_])
this.f=z
w=x.length
C.d.a7(z,0,w,x,0)
for(z=this.r,y=this.f;w<z;++w)y[w]=new V.b_(0,0)}z=this.y
y=this.f
v=this.x
if(a<z){y[v].sdk(a)
this.f[this.x].sdl(this.y)}else{y[v].sdk(z)
this.f[this.x].sdl(a)}++this.x
return!0},
eq:function(a){var z,y,x
z=new Array(this.r)
z.fixed$length=Array
z=H.f(z,[V.b_])
this.f=z
for(y=this.r,x=0;x<y;++x)z[x]=new V.b_(0,0)
this.c=P.as(this.d,0,!1,P.m)},
F:{
fg:function(a){var z=new V.ff(a,0,null,16,0,null,16,0,-1)
z.eq(a)
return z}}},
fs:{"^":"c;a,b,c,d,e,f,r,x,y,z,Q,ch,cx,cy",
hf:function(a,b,c){var z,y,x,w,v,u,t,s
z=this.b[a]
y=z.a
x=y.a.a
w=b.a.a
if(x[0]<=w[0])if(x[1]<=w[1]){v=b.b.a
u=y.b.a
v=v[0]<=u[0]&&v[1]<=u[1]}else v=!1
else v=!1
if(v)return!1
this.f6(z)
x[0]=w[0]-0.1
x[1]=w[1]-0.1
w=b.b.a
v=y.b.a
v[0]=w[0]+0.1
v[1]=w[1]+0.1
w=c.a
t=w[0]*2
s=w[1]*2
if(t<0)x[0]=x[0]+t
else v[0]=v[0]+t
if(s<0)x[1]=x[1]+s
else v[1]=v[1]+s
this.cR(a)
return!0},
hj:function(a,b,c){var z,y,x,w,v,u
this.x=0
z=this.r
this.x=1
z[0]=this.a
for(z=[V.aT];y=this.x,y>0;){x=this.r;--y
this.x=y
w=x[y]
if(w==null)continue
if(V.eV(w.a,c))if(w.d==null)b.ds(w.f)
else{y=this.r
x=y.length
if(x-this.x-2<=0){y=new Array(x*2)
y.fixed$length=Array
v=H.f(y,z)
y=this.r
C.d.a7(v,0,y.length,y,0)
this.r=v
y=v}x=this.x
u=x+1
this.x=u
y[x]=w.d
this.x=u+1
y[u]=w.e}}},
bL:function(a){var z=a.d
if(z==null)return 0
return 1+Math.max(this.bL(z),this.bL(a.e))},
cF:function(){var z,y,x,w,v
z=this.e
if(z===-1){y=this.b
z=this.d*=2
z=new Array(z)
z.fixed$length=Array
z=H.f(z,[V.aT])
this.b=z
C.d.a7(z,0,y.length,y,0)
for(x=this.d-1;z=this.c,x>=z;--x){z=this.b
w=new Float64Array(2)
z[x]=new V.aT(new V.ae(new E.a(w),new E.a(new Float64Array(2))),null,null,null,null,x,0)
z=this.b
w=z[x]
J.cJ(w,x===this.d-1?null:z[x+1])
J.cI(this.b[x],-1)}this.e=z}v=this.b[z]
z=v.c
this.e=z!=null?z.f:-1
v.c=null
v.d=null
v.e=null
v.r=0
v.b=null;++this.c
return v},
cO:function(a){var z=this.e
a.c=z!==-1?this.b[z]:null
a.r=-1
this.e=a.f;--this.c},
cR:function(a){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g
z=this.b[a]
y=this.a
if(y==null){this.a=z
z.c=null
return}x=z.a
for(w=this.ch,v=w.b.a,u=w.a.a;t=y.d,t!=null;){s=y.e
r=y.a
q=r.b.a
p=q[0]
o=r.a.a
n=o[0]
q=q[1]
o=o[1]
w.a0(r,x)
r=2*(v[0]-u[0]+v[1]-u[1])
m=2*r
l=2*(r-2*(p-n+q-o))
if(t.d==null){w.a0(x,t.a)
k=2*(v[0]-u[0]+v[1]-u[1])+l}else{r=t.a
w.a0(x,r)
q=r.b.a
p=q[0]
r=r.a.a
o=r[0]
q=q[1]
r=r[1]
k=2*(v[0]-u[0]+v[1]-u[1])-2*(p-o+q-r)+l}if(s.d==null){w.a0(x,s.a)
j=2*(v[0]-u[0]+v[1]-u[1])+l}else{r=s.a
w.a0(x,r)
q=r.b.a
p=q[0]
r=r.a.a
o=r[0]
q=q[1]
r=r[1]
j=2*(v[0]-u[0]+v[1]-u[1])-2*(p-o+q-r)+l}if(m<k&&m<j)break
y=k<j?t:s}i=J.eO(this.b[y.f])
h=this.cF()
h.c=i
h.b=null
h.a.a0(x,y.a)
h.r=y.r+1
if(i!=null){if(i.d===y)i.d=h
else i.e=h
h.d=y
h.e=z
y.c=h
z.c=h}else{h.d=y
h.e=z
y.c=h
z.c=h
this.a=h}for(y=h;y!=null;){y=this.cG(y)
g=y.d
s=y.e
y.r=1+Math.max(g.r,s.r)
y.a.a0(g.a,s.a)
y=y.c}},
f6:function(a){var z,y,x,w,v,u,t
if(a===this.a){this.a=null
return}z=a.c
y=z.c
x=z.d
if(x===a)x=z.e
if(y!=null){w=y.d
if(w==null?z==null:w===z)y.d=x
else y.e=x
x.c=y
this.cO(z)
for(v=y;v!=null;){v=this.cG(v)
u=v.d
t=v.e
v.a.a0(u.a,t.a)
v.r=1+Math.max(u.r,t.r)
v=v.c}}else{this.a=x
x.c=null
this.cO(z)}},
cG:function(a){var z,y,x,w,v,u,t,s
z=a.d
if(z==null||a.r<2)return a
y=a.e
x=y.r-z.r
if(x>1){w=y.d
v=y.e
y.d=a
y.c=a.c
a.c=y
u=y.c
if(u!=null)if(u.d===a)u.d=y
else u.e=y
else this.a=y
u=a.a
if(w.r>v.r){y.e=w
a.e=v
v.c=a
u.a0(z.a,v.a)
y.a.a0(u,w.a)
z=1+Math.max(z.r,v.r)
a.r=z
y.r=1+Math.max(z,w.r)}else{y.e=v
a.e=w
w.c=a
u.a0(z.a,w.a)
y.a.a0(u,v.a)
z=1+Math.max(z.r,w.r)
a.r=z
y.r=1+Math.max(z,v.r)}return y}if(x<-1){t=z.d
s=z.e
z.d=a
z.c=a.c
a.c=z
u=z.c
if(u!=null)if(u.d===a)u.d=z
else u.e=z
else this.a=z
u=a.a
if(t.r>s.r){z.e=t
a.d=s
s.c=a
u.a0(y.a,s.a)
z.a.a0(u,t.a)
u=1+Math.max(y.r,s.r)
a.r=u
z.r=1+Math.max(u,t.r)}else{z.e=s
a.d=t
t.c=a
u.a0(y.a,t.a)
z.a.a0(u,s.a)
u=1+Math.max(y.r,t.r)
a.r=u
z.r=1+Math.max(u,s.r)}return z}return a},
fL:function(a){var z,y
z=this.a
if(z==null)return
y=this.bL(z)
this.c3(a,this.a,0,y)},
c3:function(a,b,c,d){var z,y,x,w,v,u
z=b.a
y=this.f
x=z.a
y[0].h(x)
y[1].h(x)
w=y[1].a
z=z.b
v=z.a
x=x.a
w[0]=w[0]+(v[0]-x[0])
y[2].h(z)
y[3].h(z)
w=y[3].a
w[0]=w[0]-(v[0]-x[0])
x=this.cx
v=(d-c)/d
x.av(1,v,v)
a.bz(y,4,x)
y=a.c
y.stroke()
v=this.cy
a.b.aB(z,v)
v=v.a
z=v[0]
v=v[1]
w=c+1
u=J.a9(b)+".id-"+w+"/"+d
a.cV(x)
y.strokeText(u,z,v)
z=b.d
if(z!=null)this.c3(a,z,w,d)
z=b.e
if(z!=null)this.c3(a,z,w,d)},
ev:function(){var z,y,x
for(z=this.d-1;z>=0;--z){y=this.b
x=new Float64Array(2)
y[z]=new V.aT(new V.ae(new E.a(x),new E.a(new Float64Array(2))),null,null,null,null,z,0)
y=this.b
x=y[z]
J.cJ(x,z===this.d-1?null:y[z+1])
J.cI(this.b[z],-1)}for(y=this.f,z=0;z<4;++z)y[z]=new E.a(new Float64Array(2))},
F:{
ft:function(){var z,y
z=new Array(16)
z.fixed$length=Array
y=[V.aT]
y=new V.fs(null,H.f(z,y),0,16,0,H.f(new Array(4),[E.a]),H.f(new Array(20),y),0,new E.a(new Float64Array(H.b(2))),V.aD(),new V.cf(new E.a(new Float64Array(H.b(2))),new E.a(new Float64Array(H.b(2))),0),V.aD(),new G.bQ(0,0,0),new E.a(new Float64Array(H.b(2))))
y.ev()
return y}}},
aT:{"^":"c;aQ:a<,az:b<,b8:c*,d,e,f,aw:r'"},
b_:{"^":"c;dk:a?,dl:b?",
b5:function(a,b){var z,y
z=this.a
y=b.a
if(z<y)return-1
if(z===y){z=this.b
y=b.b
if(z<y)z=-1
else z=z===y?0:1
return z}return 1},
$isx:1,
$asx:function(){return[V.b_]}},
ej:{"^":"c;a,b"},
V:{"^":"c;v:a<,b",
K:function(a){var z,y
z=a.a.a
y=this.a.a
y[0]=z[0]
y[1]=z[1]
z=a.b.a
y=this.b.a
y[0]=z[0]
y[1]=z[1]
y[2]=z[2]
y[3]=z[3]}},
bT:{"^":"c;a,b",
m:function(a){return this.b}},
d0:{"^":"c;a,b,c"},
i1:{"^":"c;a,b,c",
eD:function(){var z,y,x
for(z=this.b,y=this.a,x=0;x<8;++x){y[x]=new E.a(new Float64Array(2))
z[x]=new E.a(new Float64Array(2))}},
F:{
i2:function(){var z=[E.a]
z=new V.i1(H.f(new Array(8),z),H.f(new Array(8),z),0)
z.eD()
return z}}},
iP:{"^":"c;a,b,c,d,e,f,r,x,y"},
f5:{"^":"c;a,b,c,d,e,f,r,x,y,z,Q,ch,cx,cy,db,dx,dy,fr,fx,fy,go,id,k1,k2,k3",
fm:function(a,b,c,d,e){var z,y,x,w,v,u,t,s,r,q,p,o,n
a.e=0
z=b.gab()
y=d.gab()
x=c.b
w=C.a.n(x.b,z.gC(z))
v=C.a.n(x.a,z.gD(z))
u=c.a.a
t=u[0]
s=C.a.n(x.a,z.gC(z))
x=C.a.n(x.b,z.gD(z))
u=u[1]
r=e.b
q=e.a.a
p=C.a.n(r.b,y.gC(y))-C.a.n(r.a,y.gD(y))+q[0]-(w-v+t)
o=C.a.n(r.a,y.gC(y))+C.a.n(r.b,y.gD(y))+q[1]-(s+x+u)
n=b.gb9().B(0,d.gb9())
if(C.a.br(p*p+o*o,n.n(0,n)))return
a.d=C.n
a.c.h(z)
a.b.I()
a.e=1
x=a.a
x[0].a.h(y)
x[0].d.bq()},
fn:function(a7,a8,a9,b0,b1){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2,a3,a4,a5,a6
a7.e=0
z=b0.gab()
y=b1.b
x=a9.b
w=C.a.n(y.b,z.gC(z))
v=C.a.n(y.a,z.gD(z))
u=b1.a.a
t=u[0]
s=C.a.n(y.a,z.gC(z))
r=C.a.n(y.b,z.gD(z))
u=u[1]
q=a9.a.a
p=w-v+t-q[0]
o=s+r+u-q[1]
q=x.b
u=x.a
n=q*p+u*o
m=-u*p+q*o
l=C.a.B(a8.b,b0.gb9())
k=a8.f
j=a8.d
i=a8.e
for(h=0,g=-17976931348623157e292,f=0;f<k;++f){w=j[f].a
v=w[0]
w=w[1]
u=i[f].a
e=u[0]*(n-v)+u[1]*(m-w)
if(e>l)return
if(e>g){g=e
h=f}}d=h+1
d=d<k?d:0
c=j[h]
b=j[d]
if(g<11920928955078125e-23){a7.e=1
a7.d=C.h
w=i[h].a
v=a7.b.a
v[0]=w[0]
v[1]=w[1]
w=c.a
v=w[0]
u=b.a
t=a7.c.a
t[0]=(v+u[0])*0.5
t[1]=(w[1]+u[1])*0.5
a=a7.a[0]
u=a.a.a
u[0]=z.gC(z)
u[1]=z.gD(z)
a.d.bq()
return}w=c.a
v=w[0]
a0=n-v
u=w[1]
a1=m-u
t=b.a
s=t[0]
r=t[1]
a2=n-s
a3=m-r
if(a0*(s-v)+a1*(r-u)<=0){if(a0*a0+a1*a1>l*l)return
a7.e=1
a7.d=C.h
v=a7.b
u=v.a
u[0]=a0
u[1]=m-w[1]
v.Y()
a7.c.h(c)
v=a7.a
v[0].a.h(z)
v[0].d.bq()}else if(a2*(v-s)+a3*(u-r)<=0){if(a2*a2+a3*a3>l*l)return
a7.e=1
a7.d=C.h
w=a7.b
v=w.a
v[0]=a2
v[1]=m-t[1]
w.Y()
a7.c.h(b)
w=a7.a
w[0].a.h(z)
w[0].d.bq()}else{a4=(v+s)*0.5
a5=(u+r)*0.5
a6=i[h]
w=a6.a
if((n-a4)*w[0]+(m-a5)*w[1]>l)return
a7.e=1
a7.d=C.h
a7.b.h(a6)
w=a7.c.a
w[0]=a4
w[1]=a5
w=a7.a
w[0].a.h(z)
w[0].d.bq()}},
d7:function(a,b,c,d,e){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g
z=b.f
y=d.f
x=b.e
w=b.d
v=d.d
u=this.f
G.e_(e,c,u)
t=u.b
for(s=this.r,r=s.a,q=this.x,p=q.a,o=0,n=-17976931348623157e292,m=0;m<z;++m){G.j(t,x[m],s)
G.n(u,w[m],q)
for(l=17976931348623157e292,k=0;k<y;++k){j=v[k]
i=r[0]
h=j.a
g=i*(h[0]-p[0])+r[1]*(h[1]-p[1])
if(g<l)l=g}if(l>n){n=l
o=m}}a.b=o
a.a=n},
fT:function(a0,a1,a2,a3,a4,a5){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a
z=a4.f
y=a4.d
x=a4.e
w=a0[0]
v=a0[1]
u=a2.b
t=a5.b
s=a1.e[a3]
r=u.b
q=s.a
p=q[0]
o=u.a
q=q[1]
n=r*p-o*q
m=o*p+r*q
q=t.b
r=t.a
l=q*n+r*m
k=-r*n+q*m
for(j=0,i=17976931348623157e292,h=0;h<z;++h){p=x[h].a
g=l*p[0]+k*p[1]
if(g<i){i=g
j=h}}f=j+1
f=f<z?f:0
e=y[j]
d=w.a
p=e.a
o=a5.a.a
c=d.a
c[0]=q*p[0]-r*p[1]+o[0]
c[1]=r*p[0]+q*p[1]+o[1]
p=a3&255
c=w.b.a
c[0]=p
c[1]=j&255
c[2]=1
c[3]=0
b=y[f]
a=v.a
c=b.a
a=a.a
a[0]=q*c[0]-r*c[1]+o[0]
a[1]=r*c[0]+q*c[1]+o[1]
o=v.b.a
o[0]=p
o[1]=f&255
o[2]=1
o[3]=0},
fo:function(a8,a9,b0,b1,b2){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2,a3,a4,a5,a6,a7
a8.e=0
z=a9.b+b1.b
y=this.y
this.d7(y,a9,b0,b1,b2)
if(y.a>z)return
x=this.z
this.d7(x,b1,b2,a9,b0)
w=x.a
if(w>z)return
if(w>y.a+0.0005){v=x.b
a8.d=C.r
u=b0
t=b2
s=a9
r=b1
q=!0}else{v=y.b
a8.d=C.h
u=b2
t=b0
s=b1
r=a9
q=!1}p=t.b
y=this.Q
this.fT(y,r,t,v,s,u)
o=r.f
n=r.d
m=v+1
m=m<o?m:0
x=this.dx
x.h(n[v])
w=this.dy
w.h(n[m])
l=this.ch
k=w.a
j=x.a
i=l.a
i[0]=k[0]-j[0]
i[1]=k[1]-j[1]
l.Y()
l=this.cx
h=l.a
h[0]=i[1]
h[1]=-1*i[0]
h=this.cy
g=h.a
g[0]=(j[0]+k[0])*0.5
g[1]=(j[1]+k[1])*0.5
g=this.db
f=p.b
e=i[0]
d=p.a
c=g.a
c[0]=f*e-d*i[1]
c[1]=d*i[0]+f*i[1]
i=c[1]
b=-1*c[0]
G.r(t,x,x)
G.r(t,w,w)
w=j[0]
j=j[1]
a=i*w+b*j
x=c[0]
c=c[1]
f=k[0]
k=k[1]
g.J()
d=this.fr
a0=V.be(d,y,g,-(x*w+c*j)+z,v)
g.J()
if(a0<2)return
y=this.fx
if(V.be(y,d,g,x*f+c*k+z,m)<2)return
a8.b.h(l)
a8.c.h(h)
for(x=a8.a,w=u.a.a,l=u.b,k=l.b,l=l.a,j=-l,a1=0,a2=0;a2<2;++a2){h=y[a2]
g=h.a.a
f=g[0]
g=g[1]
if(i*f+b*g-a<=z){a3=x[a1]
a4=a3.a
a5=f-w[0]
a6=g-w[1]
g=a4.a
g[0]=k*a5+l*a6
g[1]=j*a5+k*a6
g=a3.d
h=h.b.a
g=g.a
g[0]=h[0]
g[1]=h[1]
g[2]=h[2]
g[3]=h[3]
if(q){a7=g[0]
g[0]=g[1]
g[1]=a7
a7=g[2]
g[2]=g[3]
g[3]=a7}++a1}}a8.e=a1},
d3:function(a,b,c,d,e){var z,y,x,w,v,u,t,s,r,q,p,o,n
a.e=0
z=this.e
G.n(e,d.gab(),z)
y=this.fy
G.cl(c,z,y)
x=b.c
w=b.d
v=this.go
v.h(w)
v.j(x)
z.h(w)
z.j(y)
u=v.A(z)
z.h(y)
z.j(x)
t=v.A(z)
s=C.a.B(b.b,d.gb9())
r=this.id
q=r.a
q[1]=0
q[3]=0
if(t<=0){z=$.$get$ao()
z.h(y)
z.j(x)
z=$.$get$ao()
if(z.A(z)>s*s)return
b.r
q[0]=0
q[2]=0
a.e=1
a.d=C.n
a.b.I()
a.c.h(x)
z=a.a
z[0].d.K(r)
z[0].a.h(d.gab())
return}if(u<=0){z=$.$get$ao()
z.h(y)
z.j(w)
z=$.$get$ao()
if(z.A(z)>s*s)return
b.x
q[0]=1
q[2]=0
a.e=1
a.d=C.n
a.b.I()
a.c.h(w)
z=a.a
z[0].d.K(r)
z[0].a.h(d.gab())
return}p=v.A(v)
o=this.k2
o.h(x)
o.E(0,u)
z.h(w)
z.E(0,t)
o.q(0,z)
o.E(0,1/p)
n=$.$get$ao()
n.h(y)
n.j(o)
o=$.$get$ao()
if(o.A(o)>s*s)return
o=this.r
v=v.a
n=o.a
n[0]=-v[1]
n[1]=v[0]
z.h(y)
z.j(x)
if(o.A(z)<0){z=n[0]
y=n[1]
n[0]=-z
n[1]=-y}o.Y()
q[0]=0
q[2]=1
a.e=1
a.d=C.h
a.b.h(o)
a.c.h(x)
z=a.a
z[0].d.K(r)
z[0].a.h(d.gab())},
F:{
be:function(a,b,c,d,e){var z,y,x,w,v,u,t,s,r,q,p,o,n,m
z=b[0]
y=b[1]
x=z.a
w=y.a
v=c.A(x)-d
u=c.A(w)-d
if(v<=0){a[0].K(z)
t=1}else t=0
if(u<=0){s=t+1
a[t].K(y)
t=s}if(v*u<0){r=v/(v-u)
q=a[t]
p=q.a
o=x.a
n=o[0]
m=w.a
p=p.a
p[0]=n+r*(m[0]-n)
o=o[1]
p[1]=o+r*(m[1]-o)
o=q.b.a
o[0]=e&255
o[1]=z.b.a[1]
o[2]=0
o[3]=1;++t}return t}}},
ie:{"^":"c;a,b",
m:function(a){return this.b}},
fu:{"^":"c;a,b,c,d,e,f,r,x,y,z,Q,ch,cx,cy,db,dx,dy,fr,fx,fy,go,id,k1,k2,k3,k4,r1,r2,rx",
d2:function(a,b,c,d,a0){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e
z=this.b
G.e_(c,a0,z)
y=this.c
G.n(z,d.c,y)
this.d=b.e
this.e=b.c
x=b.d
this.f=x
this.r=b.f
b.x
w=this.fr
w.h(x)
w.j(this.e)
w.Y()
x=this.y
w=w.a
v=w[1]
w=w[0]
u=x.a
u[0]=v
u[1]=-w
w=this.fx
w.h(y)
w.j(this.e)
t=x.A(w)
y=t>=0
this.dy=y
v=this.Q.a
s=this.cy.a
r=this.db.a
if(y){v[0]=u[0]
v[1]=u[1]
s[0]=-u[0]
s[1]=-u[1]
r[0]=-u[0]
r[1]=-u[1]}else{v[0]=-u[0]
v[1]=-u[1]
s[0]=u[0]
s[1]=u[1]
r[0]=u[0]
r[1]=u[1]}y=this.a
y.c=d.f
for(v=y.a,u=z.b,s=y.b,q=0;q<d.f;++q){G.n(z,d.d[q],v[q])
G.j(u,d.e[q],s[q])}this.dx=0.02
a.e=0
p=this.k4
this.fp(p)
if(p.a===C.p)return
if(p.c>this.dx)return
o=this.r1
this.fs(o)
u=o.a===C.p
if(!u&&o.c>this.dx)return
if(!u)if(o.c>0.98*p.c+0.001)p=o
u=this.id
n=u[0]
m=u[1]
if(p.a===C.q){a.d=C.h
r=this.Q
l=r.A(s[0])
for(k=0,q=1;j=y.c,q<j;++q){i=r.A(s[q])
if(i<l){l=i
k=q}}h=k+1
h=h<j?h:0
n.a.h(v[k])
y=n.b.a
y[0]=0
y[1]=k&255
y[2]=1
y[3]=0
m.a.h(v[h])
v=m.b.a
v[0]=0
v[1]=h&255
v[2]=1
v[3]=0
y=this.k3
v=y.c
s=y.d
r=y.e
if(this.dy){y.a=0
y.b=1
v.h(this.e)
s.h(this.f)
r.h(x)}else{y.a=1
y.b=0
v.h(this.f)
s.h(this.e)
r.h(x)
r.J()}}else{a.d=C.r
n.a.h(this.e)
x=n.b.a
x[0]=0
x[1]=p.b&255
x[2]=0
x[3]=1
m.a.h(this.f)
x=m.b.a
x[0]=0
r=p.b
x[1]=r&255
x[2]=0
x[3]=1
x=this.k3
x.a=r
j=r+1
x.b=j<y.c?j:0
x.c.h(v[r])
x.d.h(v[x.b])
x.e.h(s[x.a])
y=x}x=y.f
v=y.e
s=v.a
r=s[1]
s=s[0]
j=x.a
j[0]=r
j[1]=-s
s=y.x
s.h(x)
s.J()
j=y.c
y.r=x.A(j)
y.y=s.A(y.d)
r=this.k1
if(V.be(r,u,x,y.r,y.a)<2)return
x=this.k2
if(V.be(x,r,s,y.y,y.b)<2)return
u=a.b
s=a.c
if(p.a===C.q){u.h(v)
s.h(j)}else{u.h(d.e[y.a])
s.h(d.d[y.a])}for(y=w.a,u=a.a,g=0,q=0;q<2;++q){f=x[q].a.a
y[1]=f[1]
y[0]=f[0]
w.j(j)
if(v.A(w)<=this.dx){e=u[g]
if(p.a===C.q){G.cl(z,x[q].a,e.a)
s=e.d
r=x[q].b.a
s=s.a
s[0]=r[0]
s[1]=r[1]
s[2]=r[2]
s[3]=r[3]}else{s=e.a
r=x[q]
f=r.a.a
s=s.a
s[1]=f[1]
s[0]=f[0]
s=e.d
r=r.b.a
s=s.a
s[2]=r[3]
s[3]=r[2]
s[0]=r[1]
s[1]=r[0]}++g}}a.e=g},
fp:function(a){var z,y,x,w,v,u,t,s,r,q
a.a=C.q
a.b=this.dy?0:1
a.c=17976931348623157e292
z=this.Q.a
y=z[0]
z=z[1]
for(x=this.a,w=x.a,v=0,u=17976931348623157e292;v<x.c;++v){t=w[v].a
s=t[0]
r=this.e.a
q=y*(s-r[0])+z*(t[1]-r[1])
if(q<u){a.c=q
u=q}}},
fs:function(a){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f
a.a=C.p
a.b=-1
a.c=-17976931348623157e292
z=this.Q
y=z.a
x=this.r2.a
x[0]=-y[1]
x[1]=y[0]
for(y=this.a,w=this.fx,v=this.rx.a,u=w.a,t=this.cy,s=y.b,r=y.a,q=this.db,p=0;p<y.c;++p){o=s[p]
n=r[p]
m=o.a
v[0]=-m[0]
v[1]=-m[1]
m=n.a
l=m[0]
k=this.e.a
j=k[0]
m=m[1]
k=k[1]
i=v[0]
h=v[1]
g=this.f.a
f=Math.min(i*(l-j)+h*(m-k),i*(l-g[0])+h*(m-g[1]))
if(f>this.dx){a.a=C.H
a.b=p
a.c=f
return}if(i*x[0]+h*x[1]>=0){u[1]=h
u[0]=v[0]
w.j(q)
if(w.A(z)<-0.03490658503988659)continue}else{u[1]=h
u[0]=v[0]
w.j(t)
if(w.A(z)<-0.03490658503988659)continue}if(f>a.c){a.a=C.H
a.b=p
a.c=f}}},
ew:function(){var z,y,x,w,v
for(z=this.k2,y=this.k1,x=this.id,w=0;w<2;++w){v=new Float64Array(2)
x[w]=new V.V(new E.a(v),new V.O(new Int8Array(4)))
v=new Float64Array(2)
y[w]=new V.V(new E.a(v),new V.O(new Int8Array(4)))
v=new Float64Array(2)
z[w]=new V.V(new E.a(v),new V.O(new Int8Array(4)))}},
F:{
fv:function(){var z=[V.V]
z=new V.fu(V.i2(),G.t(),new E.a(new Float64Array(H.b(2))),new E.a(new Float64Array(H.b(2))),new E.a(new Float64Array(H.b(2))),new E.a(new Float64Array(H.b(2))),new E.a(new Float64Array(H.b(2))),new E.a(new Float64Array(H.b(2))),new E.a(new Float64Array(H.b(2))),new E.a(new Float64Array(H.b(2))),new E.a(new Float64Array(H.b(2))),C.S,C.S,new E.a(new Float64Array(H.b(2))),new E.a(new Float64Array(H.b(2))),0,!1,new E.a(new Float64Array(H.b(2))),new E.a(new Float64Array(H.b(2))),new E.a(new Float64Array(H.b(2))),new E.a(new Float64Array(H.b(2))),H.f(new Array(2),z),H.f(new Array(2),z),H.f(new Array(2),z),new V.iP(0,0,new E.a(new Float64Array(H.b(2))),new E.a(new Float64Array(H.b(2))),new E.a(new Float64Array(H.b(2))),new E.a(new Float64Array(H.b(2))),0,new E.a(new Float64Array(H.b(2))),0),new V.d0(C.p,0,0),new V.d0(C.p,0,0),new E.a(new Float64Array(H.b(2))),new E.a(new Float64Array(H.b(2))))
z.ew()
return z}}},
O:{"^":"c;a",
cm:function(){var z=this.a
return(z[0]<<24|z[1]<<16|z[2]<<8|z[3])>>>0},
K:function(a){var z,y
z=a.a
y=this.a
y[0]=z[0]
y[1]=z[1]
y[2]=z[2]
y[3]=z[3]},
bq:function(){var z=this.a
z[0]=0
z[1]=0
z[2]=0
z[3]=0},
b5:function(a,b){return this.cm()-b.cm()},
$isx:1,
$asx:function(){return[V.O]}},
bz:{"^":"c;a,b,k:c<,l:d@,e,f",
K:function(a){this.a.h(a.a)
this.b.h(a.b)
this.c.h(a.c)
this.d=a.d
this.e=a.e
this.f=a.f}},
hT:{"^":"c;a,b,c,d",
eB:function(){var z=this.c
z[0]=1073741823
z[1]=1073741823
z[2]=1073741823
z=this.d
z[0]=1073741823
z[1]=1073741823
z[2]=1073741823},
F:{
dI:function(){var z=P.m
z=new V.hT(0,0,P.as(3,0,!1,z),P.as(3,0,!1,z))
z.eB()
return z}}},
iX:{"^":"c;a,b,c,d,e,f,r,x,y,z,Q,ch,cx,cy,db",
hm:function(a,b,c,d,e){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l
this.e=a.b
for(z=this.d,y=a.c,x=a.d,w=b.a,v=d.a,u=0;t=this.e,u<t;++u){s=z[u]
t=y[u]
s.e=t
r=x[u]
s.f=r
q=w[t]
p=v[r]
r=s.a
G.n(c,q,r)
t=s.b
G.n(e,p,t)
o=s.c
n=t.a
t=o.a
t[1]=n[1]
t[0]=n[0]
o.j(r)
s.d=0}if(t>1){m=a.a
l=this.cn()
if(l<0.5*m||2*m<l||l<11920928955078125e-23)this.e=0}if(this.e===0){s=z[0]
s.e=0
s.f=0
q=w[0]
p=v[0]
z=s.a
G.n(c,q,z)
y=s.b
G.n(e,p,y)
x=s.c
x.h(y)
x.j(z)
this.e=1}},
hC:function(a){var z,y,x,w
a.a=this.cn()
a.b=this.e
for(z=a.c,y=this.d,x=a.d,w=0;w<this.e;++w){z[w]=J.cK(y[w].e)
x[w]=J.cK(y[w].f)}},
dE:function(a){var z,y
switch(this.e){case 1:a.h(this.a.c)
a.J()
return
case 2:z=this.f
z.h(this.b.c)
y=this.a.c
z.j(y)
a.h(y)
a.J()
if(z.u(a)>0)z.O(1,a)
else z.O(-1,a)
return
default:a.I()
return}},
cj:function(a){var z,y,x
switch(this.e){case 0:a.I()
return
case 1:a.h(this.a.c)
return
case 2:z=this.x
y=this.b
z.h(y.c)
z.E(0,y.d)
y=this.r
x=this.a
y.h(x.c)
y.E(0,x.d)
y.q(0,z)
a.h(y)
return
case 3:a.I()
return
default:a.I()
return}},
cn:function(){var z,y,x
switch(this.e){case 0:return 0
case 1:return 0
case 2:return Math.sqrt(this.a.c.c2(this.b.c))
case 3:z=this.y
z.h(this.b.c)
y=this.a.c
z.j(y)
x=this.z
x.h(this.c.c)
x.j(y)
return z.u(x)
default:return 0}},
dT:function(){var z,y,x,w,v,u,t,s
z=this.a
y=z.c
x=this.b
w=x.c
v=this.f
v.h(w)
v.j(y)
u=-y.A(v)
if(u<=0){z.d=1
this.e=1
return}t=w.A(v)
if(t<=0){x.d=1
this.e=1
z.K(x)
return}s=1/(t+u)
z.d=t*s
x.d=u*s
this.e=2},
dU:function(){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a
z=this.cx
y=this.a
z.h(y.c)
x=this.cy
w=this.b
x.h(w.c)
v=this.db
u=this.c
v.h(u.c)
t=this.f
t.h(x)
t.j(z)
s=z.A(t)
r=x.A(t)
q=-s
p=this.Q
p.h(v)
p.j(z)
o=z.A(p)
n=v.A(p)
m=-o
l=this.ch
l.h(v)
l.j(x)
k=x.A(l)
j=v.A(l)
i=-k
h=t.u(p)
g=h*x.u(v)
f=h*v.u(z)
e=h*z.u(x)
if(q<=0&&m<=0){y.d=1
this.e=1
return}if(r>0&&q>0&&e<=0){d=1/(r+q)
y.d=r*d
w.d=q*d
this.e=2
return}if(n>0&&m>0&&f<=0){c=1/(n+m)
y.d=n*c
u.d=m*c
this.e=2
w.K(u)
return}if(r<=0&&i<=0){w.d=1
this.e=1
y.K(w)
return}if(n<=0&&j<=0){u.d=1
this.e=1
y.K(u)
return}if(j>0&&i>0&&g<=0){b=1/(j+i)
w.d=j*b
u.d=i*b
this.e=2
y.K(u)
return}a=1/(g+f+e)
y.d=g*a
w.d=f*a
u.d=e*a
this.e=3}},
fp:{"^":"c;a,b,c,d",
ct:function(a,b){var z,y,x,w,v,u
switch(a.a){case C.k:H.q(a,"$isaF")
this.a[0].h(a.gab())
this.b=1
this.c=a.gb9()
break
case C.i:z=a.f
this.b=z
this.c=a.b
for(y=this.a,x=0;x<z;++x){w=y[x]
v=a.d[x]
w.toString
u=v.a
w=w.a
w[1]=u[1]
w[0]=u[0]}break
case C.t:H.q(a,"$isbP")
z=this.d
z[0]=a.gbV().i(0,b)
y=b+1
if(C.b.L(y,a.geS()))z[1]=a.gbV().i(0,y)
else z[1]=a.gbV().i(0,0)
y=this.a
y[0].h(z[0])
y[1].h(z[1])
this.b=2
this.c=a.gb9()
break
case C.o:H.q(a,"$isaI")
z=this.a
z[0].h(a.c)
z[1].h(a.d)
this.b=2
this.c=a.b
break}},
aX:function(a){var z,y,x,w,v
z=this.a
y=z[0].A(a)
for(x=0,w=1;w<this.b;++w){v=z[w].A(a)
if(v>y){y=v
x=w}}return x},
eu:function(){var z,y
for(z=this.a,y=0;y<8;++y)z[y]=new E.a(new Float64Array(2))
this.b=0
this.c=0},
F:{
aG:function(){var z=[E.a]
z=new V.fp(H.f(new Array(8),z),null,null,H.f(new Array(2),z))
z.eu()
return z}}},
fn:{"^":"c;a,b,c,d,e,f,r",
fH:function(a3,a4,a5){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2
$.cX=$.cX+1
z=a5.a
y=a5.b
x=a5.c
w=a5.d
v=this.a
v.hm(a4,z,x,y,w)
u=v.d
t=this.d
v.cj(t)
t.gS()
for(s=this.b,r=this.c,q=x.b,p=this.e,o=p.a,n=this.f,m=z.a,l=w.b,k=y.a,j=0;j<20;){i=v.e
for(h=0;h<i;++h){s[h]=u[h].e
r[h]=u[h].f}switch(i){case 1:break
case 2:v.dT()
break
case 3:v.dU()
break}if(v.e===3)break
v.cj(t)
t.gS()
v.dE(p)
if(p.gS()<14210854715202004e-30)break
g=u[v.e]
o[1]=-o[1]
o[0]=-o[0]
G.W(q,p,n)
f=z.aX(n)
g.e=f
f=m[f]
e=g.a
G.n(x,f,e)
o[1]=-o[1]
o[0]=-o[0]
G.W(l,p,n)
f=y.aX(n)
g.f=f
f=k[f]
d=g.b
G.n(w,f,d)
f=g.c
c=d.a
d=f.a
d[1]=c[1]
d[0]=c[0]
f.j(e);++j
$.cY=$.cY+1
h=0
while(!0){if(!(h<i)){b=!1
break}f=g.e
e=s[h]
if(f==null?e==null:f===e){f=g.f
e=r[h]
e=f==null?e==null:f===e
f=e}else f=!1
if(f){b=!0
break}++h}if(b)break;++v.e}$.cZ=Math.max($.cZ,j)
a=a3.a
a0=a3.b
switch(v.e){case 0:break
case 1:t=v.a
a.h(t.a)
a0.h(t.b)
break
case 2:t=v.r
s=v.a
t.h(s.a)
t.E(0,s.d)
r=v.b
a.h(r.a)
a.E(0,r.d)
a.q(0,t)
t.h(s.b)
t.E(0,s.d)
a0.h(r.b)
a0.E(0,r.d)
a0.q(0,t)
break
case 3:t=v.a
a.h(t.a)
a.E(0,t.d)
t=v.y
s=v.b
t.h(s.a)
t.E(0,s.d)
s=v.z
r=v.c
s.h(r.a)
s.E(0,r.d)
a.q(0,t)
a.q(0,s)
a0.h(a)
break
default:break}a3.c=Math.sqrt(a.c2(a0))
a3.d=j
v.hC(a4)
if(a5.e){a1=z.c
a2=y.c
v=a3.c
t=a1+a2
if(v>t&&v>11920928955078125e-23){a3.c=v-t
v=this.r
v.h(a0)
v.j(a)
v.Y()
n.h(v)
n.E(0,a1)
a.q(0,n)
n.h(v)
n.E(0,a2)
a0.j(n)}else{a.q(0,a0)
a.E(0,0.5)
a0.h(a)
a3.c=0}}}},
cV:{"^":"c;a,b,c,d,e"},
cW:{"^":"c;a,b,c,d"},
c2:{"^":"c;a,b",
m:function(a){return this.b}},
h6:{"^":"c;a,b,c,d,e",
K:function(a){var z,y,x,w,v,u,t
for(z=this.a,y=a.a,x=0;x<a.e;++x){w=z[x]
v=y[x]
u=w.a
t=v.a.a
u=u.a
u[1]=t[1]
u[0]=t[0]
w.b=v.b
w.c=v.c
w=w.d
v=v.d.a
w=w.a
w[0]=v[0]
w[1]=v[1]
w[2]=v[2]
w[3]=v[3]}this.d=a.d
this.b.h(a.b)
this.c.h(a.c)
this.e=a.e},
ey:function(){var z,y,x
for(z=this.a,y=0;y<2;++y){x=new Float64Array(2)
z[y]=new V.dn(new E.a(x),0,0,new V.O(new Int8Array(4)))}},
F:{
G:function(){var z=new V.h6(H.f(new Array(2),[V.dn]),new E.a(new Float64Array(H.b(2))),new E.a(new Float64Array(H.b(2))),C.n,0)
z.ey()
return z}}},
dn:{"^":"c;a,b,c,d"},
cf:{"^":"c;a,b,c"},
dF:{"^":"c;a,b"},
aI:{"^":"dH;c,d,e,f,r,x,y,a,b"},
ha:{"^":"c;a,b,c"},
hF:{"^":"dH;c,d,e,f,r,x,y,z,Q,a,b",
fk:function(a){var z,y,x,w,v,u,t,s,r
z=V.ca()
z.c.h(this.c)
for(y=z.e,x=this.e,w=z.d,v=this.d,u=0;u<8;++u){t=y[u]
s=x[u]
t.toString
r=s.a
t=t.a
t[1]=r[1]
t[0]=r[0]
w[u].h(v[u])}z.b=this.b
z.f=this.f
return z},
dP:function(a,b){var z,y,x
this.f=4
z=this.d
y=-a
x=-b
z[0].ae(y,x)
z[1].ae(a,x)
z[2].ae(a,b)
z[3].ae(y,b)
y=this.e
z=y[0].a
z[0]=0
z[1]=-1
z=y[1].a
z[0]=1
z[1]=0
z=y[2].a
z[0]=0
z[1]=1
y=y[3].a
y[0]=-1
y[1]=0
this.c.I()},
bF:function(a,b,c,d){var z,y,x,w,v,u
this.f=4
z=this.d
y=-a
x=-b
z[0].ae(y,x)
z[1].ae(a,x)
z[2].ae(a,b)
z[3].ae(y,b)
y=this.e
x=y[0].a
x[0]=0
x[1]=-1
x=y[1].a
x[0]=1
x[1]=0
x=y[2].a
x[0]=0
x[1]=1
x=y[3].a
x[0]=-1
x[1]=0
this.c.h(c)
w=this.Q
w.a.h(c)
x=w.b
x.G(d)
for(v=0;v<this.f;++v){u=z[v]
G.r(w,u,u)
u=y[v]
G.av(x,u,u)}},
bY:function(a,b,c){var z,y,x,w,v,u,t,s,r,q,p,o,n,m
z=this.d
y=z[0]
x=b.b
w=x.b
v=x.a
x=b.a.a
u=x[0]
x=x[1]
t=y.a
s=a.a.a
s[0]=w*t[0]-v*t[1]+u
s[1]=v*t[0]+w*t[1]+x
t=a.b.a
t[0]=s[0]
t[1]=s[1]
for(r=this.f,q=1;q<r;++q){p=z[q].a
o=p[0]
p=p[1]
n=w*o-v*p+u
m=v*o+w*p+x
p=s[0]
s[0]=p<n?p:n
p=s[1]
s[1]=p<m?p:m
p=t[0]
t[0]=p>n?p:n
p=t[1]
t[1]=p>m?p:m}z=s[0]
x=this.b
s[0]=z-x
s[1]=s[1]-x
t[0]=t[0]+x
t[1]=t[1]+x},
fq:function(a,b){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h
z=this.r
z.I()
y=this.x
y.I()
for(x=this.d,w=0;v=this.f,w<v;++w)y.q(0,x[w])
y.E(0,1/v)
u=this.y
t=this.z
for(v=z.a,s=u.a,r=t.a,q=y.a,p=0,o=0,w=0;w<this.f;){n=x[w].a
s[1]=n[1]
s[0]=n[0]
u.j(y)
r[1]=q[1]
r[0]=q[0]
r[1]=-r[1]
r[0]=-r[0];++w
t.q(0,w<this.f?x[w]:x[0])
m=u.u(t)
l=0.5*m
p+=l
k=l*0.3333333333333333
v[0]=v[0]+k*(s[0]+r[0])
v[1]=v[1]+k*(s[1]+r[1])
k=s[0]
j=s[1]
i=r[0]
h=r[1]
o+=0.08333333333333333*m*(k*k+i*k+i*i+(j*j+h*j+h*h))}a.a=b*p
z.E(0,1/p)
x=a.b
x.h(z)
x.q(0,y)
v=o*b
a.c=v
a.c=v+a.a*x.A(x)},
eA:function(){var z,y
for(z=this.d,y=0;y<8;++y)z[y]=new E.a(new Float64Array(2))
for(z=this.e,y=0;y<8;++y)z[y]=new E.a(new Float64Array(2))
this.b=0.01},
F:{
ca:function(){var z,y,x
z=new Float64Array(H.b(2))
y=new Array(8)
y.fixed$length=Array
x=[E.a]
x=new V.hF(new E.a(z),H.f(y,x),H.f(new Array(8),x),0,new E.a(new Float64Array(H.b(2))),new E.a(new Float64Array(H.b(2))),new E.a(new Float64Array(H.b(2))),new E.a(new Float64Array(H.b(2))),G.t(),C.i,0)
x.eA()
return x}}},
dH:{"^":"c;"},
bu:{"^":"c;a,b",
m:function(a){return this.b}},
hZ:{"^":"c;a,b,c,d,e"},
b3:{"^":"c;a,b",
m:function(a){return this.b}},
i_:{"^":"c;a,b"},
i3:{"^":"c;a,b,c,d,e,f,r,x,y,z",
hw:function(a3,a4){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2
$.dQ=$.dQ+1
a3.a=C.P
a3.b=a4.e
z=a4.a
y=a4.b
x=this.x
x.K(a4.c)
w=this.y
w.K(a4.d)
x.Y()
w.Y()
v=a4.e
u=Math.max(0.005,z.c+y.c-0.015)
t=this.a
t.b=0
s=this.b
s.a=z
s.b=y
s.e=!1
for(r=this.f,q=this.r,p=u+0.00125,o=u-0.00125,n=this.e,m=this.c,l=this.d,k=this.z.fy,j=0,i=0;!0;){x.aA(m,j)
w.aA(l,j)
s.c=m
s.d=l
k.fH(n,t,s)
h=n.c
if(h<=0){a3.a=C.ad
a3.b=0
break}if(h<p){a3.a=C.C
a3.b=j
break}r.h1(0,t,z,x,y,w,j)
f=v
e=0
while(!0){if(!!0){g=!1
break}d=r.fU(q,f)
if(d>p){a3.a=C.ae
a3.b=v
g=!0
break}if(d>o){j=f
g=!1
break}c=r.ap(q[0],q[1],j)
if(c<o){a3.a=C.Q
a3.b=j
g=!0
break}if(c<=p){a3.a=C.C
a3.b=j
g=!0
break}for(b=f,a=j,a0=0;!0;){a1=(a0&1)===1?a+(u-c)*(b-a)/(d-c):0.5*(a+b);++a0
$.dU=$.dU+1
a2=r.ap(q[0],q[1],a1)
if(Math.abs(a2-u)<0.00125){f=a1
break}if(a2>u){a=a1
c=a2}else{b=a1
d=a2}if(a0===50)break}$.dT=Math.max($.dT,a0);++e
if(e===8||a0===50){g=!1
break}}++i
$.dR=$.dR+1
if(g)break
if(i===20){a3.a=C.Q
a3.b=j
break}}$.dS=Math.max($.dS,i)}},
cg:{"^":"c;a,b",
m:function(a){return this.b}},
hQ:{"^":"c;a,b,c,d,e,f,r,x,y,z,Q,ch,cx,cy,db,dx,dy,fr,fx,fy,go",
h1:function(a,b,c,d,e,f,g){var z,y,x,w,v,u,t,s,r,q,p,o,n,m
this.a=c
this.b=e
z=b.b
this.f=d
this.r=f
y=this.fr
d.aA(y,g)
x=this.fx
this.r.aA(x,g)
if(z===1){this.c=C.z
g=this.x
w=this.a
v=b.c[0]
g.h(w.a[v])
v=this.y
w=this.b
u=b.d[0]
v.h(w.a[u])
u=this.z
G.n(y,g,u)
g=this.Q
G.n(x,v,g)
v=this.e
v.h(g)
v.j(u)
return v.Y()}else{g=b.c
w=b.d
v=this.z
u=this.d
t=this.cy
s=this.e
r=this.Q
q=this.dy
if(J.Z(g[0],g[1])){this.c=C.B
p=this.db
o=this.b
n=w[0]
p.h(o.a[n])
n=this.dx
o=this.b
w=w[1]
n.h(o.a[w])
q.h(n)
q.j(p)
q.O(-1,s)
s.Y()
G.j(x.b,s,t)
u.h(p)
u.q(0,n)
u.E(0,0.5)
G.n(x,u,r)
u=this.x
x=this.a
g=g[0]
u.h(x.a[g])
G.n(y,u,v)
q.h(v)
q.j(r)
m=q.A(t)
if(m<0){s.J()
m=-m}return m}else{this.c=C.A
p=this.ch
o=this.a
n=g[0]
p.h(o.a[n])
n=this.cx
o=this.a
g=g[1]
n.h(o.a[g])
q.h(n)
q.j(p)
q.O(-1,s)
s.Y()
G.j(y.b,s,t)
u.h(p)
u.q(0,n)
u.E(0,0.5)
G.n(y,u,v)
u=this.y
y=this.b
w=w[0]
u.h(y.a[w])
G.n(x,u,r)
q.h(r)
q.j(v)
m=q.A(t)
if(m<0){s.J()
m=-m}return m}}},
fU:function(a,b){var z,y,x,w,v,u,t
z=this.fr
this.f.aA(z,b)
y=this.fx
this.r.aA(y,b)
switch(this.c){case C.z:x=this.e
w=this.fy
G.W(z.b,x,w)
x.J()
v=this.go
G.W(y.b,x,v)
x.J()
a[0]=this.a.aX(w)
a[1]=this.b.aX(v)
v=this.x
w=this.a
u=a[0]
v.h(w.a[u])
u=this.y
w=this.b
t=a[1]
u.h(w.a[t])
t=this.z
G.n(z,v,t)
v=this.Q
G.n(y,u,v)
v.j(t)
return v.A(x)
case C.A:x=this.cy
G.j(z.b,this.e,x)
w=this.z
G.n(z,this.d,w)
x.J()
z=this.go
G.W(y.b,x,z)
x.J()
a[0]=-1
z=this.b.aX(z)
a[1]=z
v=this.y
v.h(this.b.a[z])
z=this.Q
G.n(y,v,z)
z.j(w)
return z.A(x)
case C.B:x=this.cy
G.j(y.b,this.e,x)
w=this.Q
G.n(y,this.d,w)
x.J()
y=this.fy
G.W(z.b,x,y)
x.J()
a[1]=-1
y=this.a.aX(y)
a[0]=y
v=this.x
v.h(this.a.a[y])
y=this.z
G.n(z,v,y)
y.j(w)
return y.A(x)
default:a[0]=-1
a[1]=-1
return 0}},
ap:function(a,b,c){var z,y,x,w,v
z=this.fr
this.f.aA(z,c)
y=this.fx
this.r.aA(y,c)
switch(this.c){case C.z:x=this.x
x.h(this.a.a[a])
w=this.y
w.h(this.b.a[b])
v=this.z
G.n(z,x,v)
x=this.Q
G.n(y,w,x)
x.j(v)
return x.A(this.e)
case C.A:x=this.cy
G.j(z.b,this.e,x)
w=this.z
G.n(z,this.d,w)
z=this.y
z.h(this.b.a[b])
v=this.Q
G.n(y,z,v)
v.j(w)
return v.A(x)
case C.B:x=this.cy
G.j(y.b,this.e,x)
w=this.Q
G.n(y,this.d,w)
y=this.x
y.h(this.a.a[a])
v=this.z
G.n(z,y,v)
v.j(w)
return v.A(x)
default:return 0}}},
im:{"^":"c;a,b,c,d,e",
h0:function(a,b,c,a0,a1,a2){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d
if(b.e===0)return
switch(b.d){case C.n:z=this.d
y=this.e
x=this.a
w=x.a
w[0]=1
w[1]=0
v=c.b
u=v.b
t=b.c.a
s=t[0]
v=v.a
r=c.a.a
q=z.a
q[0]=u*s-v*t[1]+r[0]
q[1]=v*t[0]+u*t[1]+r[1]
p=b.a[0].a
r=a1.b
t=r.b
u=p.a
v=u[0]
r=r.a
s=a1.a.a
o=y.a
o[0]=t*v-r*u[1]+s[0]
o[1]=r*u[0]+t*u[1]+s[1]
if(z.c2(y)>14210854715202004e-30){w[0]=o[0]-q[0]
w[1]=o[1]-q[1]
x.Y()}x=w[0]
n=x*a0+q[0]
v=w[1]
m=v*a0+q[1]
l=-x*a2+o[0]
k=-v*a2+o[1]
o=this.b[0].a
o[0]=(n+l)*0.5
o[1]=(m+k)*0.5
this.c[0]=(l-n)*w[0]+(k-m)*w[1]
break
case C.h:j=this.d
x=this.a
G.j(c.b,b.b,x)
G.r(c,b.c,j)
i=this.e
for(w=b.a,v=i.a,u=j.a,x=x.a,t=this.b,s=this.c,h=0;h<b.e;++h){G.r(a1,w[h].a,i)
r=v[0]
q=u[0]
o=x[0]
g=v[1]
f=u[1]
e=x[1]
d=a0-((r-q)*o+(g-f)*e)
n=o*d+r
m=e*d+g
l=-o*a2+r
k=-e*a2+g
g=t[h].a
g[0]=(n+l)*0.5
g[1]=(m+k)*0.5
s[h]=(l-n)*x[0]+(k-m)*x[1]}break
case C.r:j=this.d
x=this.a
G.j(a1.b,b.b,x)
G.r(a1,b.c,j)
i=this.e
for(w=b.a,v=i.a,u=j.a,x=x.a,t=this.b,s=this.c,h=0;h<b.e;++h){G.r(c,w[h].a,i)
r=v[0]
q=u[0]
o=x[0]
g=v[1]
f=u[1]
e=x[1]
d=a2-((r-q)*o+(g-f)*e)
l=o*d+r
k=e*d+g
n=-o*a0+r
m=-e*a0+g
g=t[h].a
g[0]=(n+l)*0.5
g[1]=(m+k)*0.5
s[h]=(n-l)*x[0]+(m-k)*x[1]}x[0]=-x[0]
x[1]=-x[1]
break}},
eG:function(){var z,y
for(z=this.b,y=0;y<2;++y)z[y]=new E.a(new Float64Array(2))},
F:{
io:function(){var z=new V.im(new E.a(new Float64Array(H.b(2))),H.f(new Array(2),[E.a]),new Float64Array(H.b(2)),new E.a(new Float64Array(H.b(2))),new E.a(new Float64Array(H.b(2))))
z.eG()
return z}}},
b9:{"^":"c;a,b,c,d,e,f,r,x,y,z,Q,ch,cx,cy,db,dx,dy,fr,fx,fy,go,id,k1,k2,k3,az:k4<,r1,r2,rx",
c_:function(a){var z,y
z=this.Q
if((z.a&2)===2)return
y=new V.fA(0,null,null,null,0,0,null,0,new V.bW(1,65535,0),!1,null,V.aD(),V.aD(),new E.a(new Float64Array(H.b(2))))
y.fu(this,a)
if((this.b&32)===32)y.fA(z.b.a,this.d)
y.b=this.cy
this.cy=y;++this.db
y.c=this
if(y.a>0)this.hq()
z.a|=1
return y},
fv:function(a,b){var z=this.r1
z.a=a
z.e=b
return this.c_(z)},
c0:function(a){return this.fv(a,0)},
hq:function(){var z,y,x,w,v,u,t,s,r,q,p
this.fr=0
this.fx=0
this.fy=0
this.go=0
z=this.f
y=z.a
y.I()
x=this.a
if(x===C.e||x===C.F){y=this.d.a
z.b.h(y)
z.c.h(y)
z.d=z.e
return}x=this.Q.ch.a
w=x.a
v=w[x.b++]
v.I()
u=w[x.b++]
t=this.r2
for(s=this.cy,r=t.b.a;s!=null;s=s.b){q=s.a
if(q===0)continue
s.d.fq(t,q)
q=this.fr
p=t.a
this.fr=q+p
q=u.a
q[1]=r[1]
q[0]=r[0]
q[1]=q[1]*p
q[0]=q[0]*p
v.q(0,u)
this.fy=this.fy+t.c}q=this.fr
if(q>0){q=1/q
this.fx=q
v.E(0,q)}else{this.fr=1
this.fx=1}q=this.fy
if(q>0&&(this.b&16)===0){q-=this.fr*v.A(v)
this.fy=q
this.go=1/q}else{this.fy=0
this.go=0}w=w[x.b++]
q=z.c
w.h(q)
y.h(v)
z=z.b
G.n(this.d,y,z)
q.h(z)
u.h(q)
u.j(w)
u.O(this.x,w)
this.r.q(0,w)
x.b-=3},
ak:function(a){var z
if(a){z=this.b
if((z&2)===0){this.b=z|2
this.k3=0}}else{this.b&=4294967293
this.k3=0
this.r.I()
this.x=0
this.y.I()
this.z=0}},
cC:function(){var z,y,x,w,v,u,t,s,r
z=this.rx
y=z.b
x=this.f
y.a=Math.sin(x.d)
w=Math.cos(x.d)
y.b=w
v=x.b.a
u=v[0]
x=x.a.a
t=x[0]
y=y.a
s=z.a.a
s[0]=u-w*t+y*x[1]
s[1]=v[1]-y*x[0]-w*x[1]
for(r=this.cy,y=this.Q,x=this.d;r!=null;r=r.b)r.ek(y.b.a,z,x)},
b_:function(){var z,y,x,w,v,u,t
z=this.d
y=z.b
x=this.f
y.a=Math.sin(x.e)
w=Math.cos(x.e)
y.b=w
v=x.c.a
u=v[0]
x=x.a.a
t=x[0]
y=y.a
z=z.a.a
z[0]=u-w*t+y*x[1]
z[1]=v[1]-y*x[0]-w*x[1]},
cv:function(a){var z,y
if(this.a!==C.f&&a.a!==C.f)return!1
for(z=this.dx;z!=null;z=z.d){y=z.a
if(y==null?a==null:y===a)if(!z.b.y)return!1}return!0},
aR:function(a){var z,y,x,w,v
z=this.f
z.aR(a)
y=z.c
y.h(z.b)
x=z.d
z.e=x
w=this.d
v=w.b
v.G(x)
w=w.a
G.j(v,z.a,w)
w.E(0,-1)
w.q(0,y)},
m:function(a){return"Body[pos: "+this.d.a.m(0)+" linVel: "+this.r.m(0)+" angVel: "+H.d(this.x)+"]"}},
bK:{"^":"c;a,az:b<,c,d,e,f,r,x,y,z,Q,ch,cx,cy"},
bM:{"^":"c;a,b",
m:function(a){return this.b}},
f9:{"^":"c;a,b,c,d,e,f",
fe:function(a,b){var z,y,x,w,v,u,t,s,r,q,p,o,n,m
z=a.b
y=b.b
x=a.c
w=b.c
v=z.c
u=y.c
if(v==null?u==null:v===u)return
t=u.dy
for(;t!=null;){s=t.a
if(s==null?v==null:s===v){s=t.b
r=s.f
q=s.r
p=s.x
o=s.y
if((r==null?z==null:r===z)&&p===x&&(q==null?y==null:q===y)&&o===w)return
if((r==null?y==null:r===y)&&p===w&&(q==null?z==null:q===z)&&o===x)return}t=t.d}if(!u.cv(v))return
s=this.d.cw(z,y)
if(!s)return
n=this.f.hg(z,x,y,w)
if(n==null)return
z=n.f
y=n.r
v=z.c
u=y.c
n.b=null
s=this.b
n.c=s
if(s!=null)s.b=n
this.b=n
s=n.d
s.b=n
s.a=u
s.c=null
m=v.dy
s.d=m
if(m!=null)m.c=s
v.dy=s
s=n.e
s.b=n
s.a=v
s.c=null
m=u.dy
s.d=m
if(m!=null)m.c=s
u.dy=s
z.z
y.z
v.ak(!0)
u.ak(!0);++this.c},
c1:function(a){var z,y,x,w,v,u,t,s,r,q
z=a.f
y=a.r
x=z.c
w=y.c
v=a.b
if(v!=null)v.c=a.c
u=a.c
if(u!=null)u.b=v
if(a===this.b)this.b=u
v=a.d
u=v.c
if(u!=null)u.d=v.d
t=v.d
if(t!=null)t.c=u
if(v===x.dy)x.dy=t
v=a.e
u=v.c
if(u!=null)u.d=v.d
t=v.d
if(t!=null)t.c=u
if(v===w.dy)w.dy=t
z=a.f
y=a.r
if(a.z.e>0){z.z
y.z
v=!0}else v=!1
if(v){z.c.ak(!0)
y.c.ak(!0)}s=z.d.a
r=y.d.a
q=this.f.fy[s.a][r.a].a
q.a[--q.b]=a;--this.c},
fl:function(){var z,y,x,w,v,u,t,s,r,q,p,o,n
z=this.b
for(;z!=null;){y=z.f
x=z.r
w=z.x
v=z.y
u=y.c
t=x.c
if((z.a&8)===8){if(!t.cv(u)){s=z.c
this.c1(z)
z=s
continue}r=this.d.cw(y,x)
if(!r){s=z.c
this.c1(z)
z=s
continue}z.a&=4294967287}q=(u.b&2)===2&&u.a!==C.e
p=(t.b&2)===2&&t.a!==C.e
if(!q&&!p){z=z.c
continue}o=y.r[w].gbC()
n=x.r[v].gbC()
if(!this.a.hv(o,n)){s=z.c
this.c1(z)
z=s
continue}z.cd(this.e)
z=z.c}},
em:function(a,b){this.b=null
this.d=new V.f8()
this.e=null
this.a=b},
F:{
fa:function(a,b){var z=new V.f9(null,null,0,null,null,a)
z.em(a,b)
return z}}},
bb:{"^":"ag;fr,a,b,c,d,e,f,r,x,y,z,Q,ch,cx,cy,db,dx,dy",
ax:function(a,b,c,d){this.bt(a,b,c,d)},
ap:function(a,b,c){var z=this.fr
H.q(this.f.d,"$isbP").dB(z,this.x)
this.dx.fr.d3(a,z,b,H.q(this.r.d,"$isaF"),c)}},
bc:{"^":"ag;fr,a,b,c,d,e,f,r,x,y,z,Q,ch,cx,cy,db,dx,dy",
ax:function(a,b,c,d){this.bt(a,b,c,d)},
ap:function(a,b,c){var z,y,x
z=this.fr
H.q(this.f.d,"$isbP").dB(z,this.x)
y=this.dx.fr
x=this.r.d
y.k3.d2(a,z,b,x,c)}},
bd:{"^":"ag;a,b,c,d,e,f,r,x,y,z,Q,ch,cx,cy,db,dx,dy",
ap:function(a,b,c){this.dx.fr.fm(a,H.q(this.f.d,"$isaF"),b,H.q(this.r.d,"$isaF"),c)}},
ag:{"^":"c;",
ax:["bt",function(a,b,c,d){var z,y
this.a=4
this.f=a
this.r=c
this.x=b
this.y=d
this.z.e=0
this.b=null
this.c=null
z=this.d
z.b=null
z.c=null
z.d=null
z.a=null
z=this.e
z.b=null
z.c=null
z.d=null
z.a=null
this.Q=0
this.cx=Math.sqrt(a.e*c.e)
z=a.f
y=c.f
this.cy=z>y?z:y
this.db=0}],
cd:function(a){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k
z=this.dy
y=this.z
z.K(y)
x=this.a|=4
w=this.f
w.z
v=this.r
v.z
u=w.c
t=v.c
this.ap(y,u.d,t.d)
s=y.e>0
for(w=z.a,v=y.a,r=0;r<y.e;++r){q=v[r]
q.b=0
q.c=0
p=q.d
for(o=z.e,n=p.a,m=0;m<o;++m){l=w[m]
k=l.d.a
if((k[0]<<24|k[1]<<16|k[2]<<8|k[3])>>>0===(n[0]<<24|n[1]<<16|n[2]<<8|n[3])>>>0){q.b=l.b
q.c=l.c
break}}}if(s!==((x&2)===2)){u.ak(!0)
t.ak(!0)}z=this.a
if(s)this.a=z|2
else this.a=z&4294967293
return}},
D:{"^":"c;a,b,c,d"},
bR:{"^":"c;a,b,c,d,e,f,r,x,y,z,Q,ch,cx,cy,db",
en:function(){var z,y
for(z=this.a,y=0;y<2;++y)z[y]=new E.a(new Float64Array(2))},
F:{
cS:function(){var z=new V.bR(H.f(new Array(2),[E.a]),new E.a(new Float64Array(H.b(2))),new E.a(new Float64Array(H.b(2))),0,0,0,0,new E.a(new Float64Array(H.b(2))),new E.a(new Float64Array(H.b(2))),0,0,null,0,0,0)
z.en()
return z}}},
bf:{"^":"c;a,b"},
bh:{"^":"c;a,b,c,d,e"},
fb:{"^":"c;a,b,c,d,e,f,r,x,y,z,Q",
dc:function(a){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b
this.a=a.a
z=a.c
this.r=z
y=this.d
x=y.length
if(x<z){z=new Array(Math.max(x*2,z))
z.fixed$length=Array
z=H.f(z,[V.bR])
this.d=z
C.d.a7(z,0,x,y,0)
for(;z=this.d,x<z.length;++x)z[x]=V.cS()}z=this.e
x=z.length
y=this.r
if(x<y){y=new Array(Math.max(x*2,y))
y.fixed$length=Array
y=H.f(y,[V.bS])
this.e=y
C.d.a7(y,0,x,z,0)
for(;z=this.e,x<z.length;++x)z[x]=V.cT()}this.b=a.d
this.c=a.e
this.f=a.b
for(x=0;x<this.r;++x){w=this.f[x]
v=w.f
u=w.r
t=v.d
s=u.d
r=t.b
q=s.b
p=v.c
o=u.c
n=w.z
m=n.e
l=this.e[x]
l.Q=w.cx
l.ch=w.cy
l.cx=w.db
z=p.c
l.e=z
y=o.c
l.f=y
k=p.fx
l.r=k
j=o.fx
l.x=j
i=p.go
l.y=i
h=o.go
l.z=h
l.db=x
l.cy=m
g=l.d.a
g[0]=0
g[1]=0
g[2]=0
g[3]=0
g=l.c.a
g[0]=0
g[1]=0
g[2]=0
g[3]=0
f=this.d[x]
f.d=z
f.e=y
f.f=k
f.r=j
j=f.x
e=p.f.a.a
j=j.a
j[1]=e[1]
j[0]=e[0]
j=f.y
e=o.f.a.a
j=j.a
j[1]=e[1]
j[0]=e[0]
f.z=i
f.Q=h
e=n.b.a
h=f.b.a
h[1]=e[1]
h[0]=e[0]
e=n.c.a
h=f.c.a
h[1]=e[1]
h[0]=e[0]
f.db=m
f.cx=r
f.cy=q
f.ch=n.d
for(z=n.a,d=0;d<m;++d){c=z[d]
b=l.a[d]
y=this.a
if(y.f){y=y.c
b.c=y*c.b
b.d=y*c.c}else{b.c=0
b.d=0}y=b.a.a
y[0]=0
y[1]=0
y=b.b.a
y[0]=0
y[1]=0
b.e=0
b.f=0
b.r=0
y=f.a[d]
k=c.a.a
j=k[0]
y=y.a
y[0]=j
y[1]=k[1]}}},
hB:function(){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b
for(z=0;z<this.r;++z){y=this.e[z]
x=y.e
w=y.f
v=y.r
u=y.y
t=y.x
s=y.z
r=y.cy
q=this.c[x].gv()
p=this.c[x].gk()
o=this.c[w].gv()
n=this.c[w].gk()
m=y.b.a
l=m[1]
k=-1*m[0]
for(j=q.a,i=o.a,h=0;h<r;++h){g=y.a[h]
f=g.d
e=m[0]
d=g.c
c=l*f+e*d
b=k*f+m[1]*d
d=g.a.a
p-=u*(d[0]*b-d[1]*c)
j[0]=j[0]-c*v
j[1]=j[1]-b*v
d=g.b.a
n+=s*(d[0]*b-d[1]*c)
i[0]=i[0]+c*t
i[1]=i[1]+b*t}this.c[x].sk(p)
this.c[w].sk(n)}},
de:function(){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2,a3,a4,a5,a6,a7,a8,a9,b0,b1,b2,b3,b4,b5,b6,b7,b8,b9,c0,c1,c2,c3,c4,c5,c6,c7,c8,c9,d0,d1,d2,d3,d4,d5,d6,d7,d8,d9,e0,e1,e2
for(z=this.z,y=z.b,x=this.x,w=x.b,v=this.y,u=v.b,t=x.a.a,s=v.a.a,r=z.a.a,q=0;q<this.r;++q){p=this.e[q]
o=this.d[q]
n=o.cx
m=o.cy
l=this.f[p.db].z
k=p.e
j=p.f
i=p.r
h=p.x
g=p.y
f=p.z
e=o.x
d=o.y
c=this.b[k].gt()
b=this.b[k].gl()
a=this.c[k].gv()
a0=this.c[k].gk()
a1=this.b[j].gt()
a2=this.b[j].gl()
a3=this.c[j].gv()
a4=this.c[j].gk()
w.a=Math.sin(b)
w.b=Math.cos(b)
u.a=Math.sin(a2)
a5=Math.cos(a2)
u.b=a5
a6=c.a
a7=a6[0]
a8=w.b
a9=e.a
b0=a9[0]
b1=w.a
t[0]=a7-(a8*b0-b1*a9[1])
t[1]=a6[1]-(b1*a9[0]+a8*a9[1])
a9=a1.a
a8=a9[0]
b1=d.a
b0=b1[0]
a7=u.a
s[0]=a8-(a5*b0-a7*b1[1])
s[1]=a9[1]-(a7*b1[0]+a5*b1[1])
z.h0(0,l,x,n,v,m)
b1=p.b.a
b1[0]=r[0]
b1[1]=r[1]
b2=p.cy
for(a5=-$.jQ,a7=a3.a,a8=-a4,b0=a.a,b3=-a0,b4=i+h,b5=0;b5<b2;++b5){b6=p.a[b5]
b7=y[b5]
b8=b6.a
b9=b6.b
c0=b7.a
c1=b8.a
c1[0]=c0[0]-a6[0]
c1[1]=c0[1]-a6[1]
c2=b9.a
c2[0]=c0[0]-a9[0]
c2[1]=c0[1]-a9[1]
c0=c1[0]
c3=b1[1]
c1=c1[1]
c4=b1[0]
c5=c0*c3-c1*c4
c6=c2[0]
c2=c2[1]
c7=c6*c3-c2*c4
c8=b4+g*c5*c5+f*c7*c7
b6.e=c8>0?1/c8:0
c9=-1*c4
d0=c0*c9-c1*c3
d1=c6*c9-c2*c3
d2=b4+g*d0*d0+f*d1*d1
b6.f=d2>0?1/d2:0
b6.r=0
d3=c4*(a7[0]+a8*c2-b0[0]-b3*c1)+c3*(a7[1]+a4*c6-b0[1]-a0*c0)
if(d3<a5)b6.r=-p.ch*d3}if(p.cy===2){a5=p.a
d4=a5[0]
d5=a5[1]
a5=d4.a.a
a6=a5[0]
a7=b1[1]
a5=a5[1]
b1=b1[0]
d6=a6*a7-a5*b1
a5=d4.b.a
d7=a5[0]*a7-a5[1]*b1
a5=d5.a.a
d8=a5[0]*a7-a5[1]*b1
a5=d5.b.a
d9=a5[0]*a7-a5[1]*b1
b1=g*d6
a5=f*d7
e0=b4+b1*d6+a5*d7
e1=b4+g*d8*d8+f*d9*d9
e2=b4+b1*d8+a5*d9
if(e0*e0<100*(e0*e1-e2*e2)){a5=p.d
a6=a5.a
a6[3]=e1
a6[2]=e2
a6[1]=e2
a6[0]=e0
a6=p.c
a6.h(a5)
a6.bB()}else p.cy=1}}},
cz:function(){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2,a3,a4,a5,a6,a7,a8,a9,b0,b1,b2,b3,b4,b5,b6,b7,b8,b9,c0,c1,c2,c3,c4,c5,c6,c7,c8,c9,d0,d1,d2,d3,d4,d5,d6,d7,d8,d9,e0
for(z=0;z<this.r;++z){y=this.e[z]
x=y.e
w=y.f
v=y.r
u=y.x
t=y.y
s=y.z
r=y.cy
q=this.c[x].gv()
p=this.c[x].gk()
o=this.c[w].gv()
n=this.c[w].gk()
m=y.b.a
l=m[0]
m=m[1]
k=-1*l
j=y.Q
for(i=o.a,h=q.a,g=0;g<r;++g){f=y.a[g]
e=f.a
d=f.b.a
c=d[1]
b=i[0]
a=h[0]
a0=e.a
a1=a0[1]
a2=d[0]
a3=i[1]
a4=h[1]
a5=a0[0]
a6=y.cx
a7=f.f
a8=j*f.c
a9=f.d
a6=Math.max(-a8,Math.min(a9+a7*-((-n*c+b-a+p*a1)*m+(n*a2+a3-a4-p*a5)*k-a6),a8))
b0=a6-a9
f.d=a6
b1=m*b0
b2=k*b0
h[0]=a-b1*v
h[1]=a4-b2*v
p-=t*(a0[0]*b2-a0[1]*b1)
i[0]=i[0]+b1*u
i[1]=i[1]+b2*u
n+=s*(d[0]*b2-d[1]*b1)}d=y.cy
c=y.a
b=-n
if(d===1){f=c[0]
d=f.b.a
c=d[1]
a=i[0]
a0=h[0]
a1=f.a.a
a2=a1[1]
a3=d[0]
a4=i[1]
a5=h[1]
a6=a1[0]
a7=f.e
a9=f.r
b3=f.c
e=b3+-a7*((b*c+a-a0+p*a2)*l+(n*a3+a4-a5-p*a6)*m-a9)
b4=e>0?e:0
b0=b4-b3
f.c=b4
b1=l*b0
b2=m*b0
h[0]=a0-b1*v
h[1]=a5-b2*v
p-=t*(a1[0]*b2-a1[1]*b1)
i[0]=i[0]+b1*u
i[1]=i[1]+b2*u
n+=s*(d[0]*b2-d[1]*b1)}else{b5=c[0]
b6=c[1]
b7=b5.a
b8=b5.b
b9=b6.a
c0=b6.b
c1=b5.c
c2=b6.c
d=b8.a
c=d[1]
a=i[0]
a0=h[0]
a1=b7.a
a2=a1[1]
a3=d[0]
a4=i[1]
a5=h[1]
a6=a1[0]
a7=c0.a
a9=a7[1]
b3=b9.a
c3=b3[1]
c4=a7[0]
c5=b3[0]
c6=b5.r
c7=b6.r
c8=y.d.a
c9=c8[0]
d0=c8[2]
d1=(b*c+a-a0+p*a2)*l+(n*a3+a4-a5-p*a6)*m-c6-(c9*c1+d0*c2)
c9=c8[1]
d2=(b*a9+a-a0+p*c3)*l+(n*c4+a4-a5-p*c5)*m-c7-(c9*c1+c8[3]*c2)
$loop$1:{c=y.c.a
b=c[0]
d3=(b*d1+c[2]*d2)*-1
d4=(c[1]*d1+c[3]*d2)*-1
if(d3>=0&&d4>=0){d5=d3-c1
d6=d4-c2
d7=d5*l
d8=d5*m
d9=d6*l
e0=d6*m
m=d7+d9
h[0]=a0-v*m
a0=d8+e0
h[1]=a5-v*a0
i[0]=i[0]+u*m
i[1]=i[1]+u*a0
p-=t*(a1[0]*d8-a1[1]*d7+(b3[0]*e0-b3[1]*d9))
n+=s*(d[0]*d8-d[1]*d7+(a7[0]*e0-a7[1]*d9))
b5.c=d3
b6.c=d4
break $loop$1}d3=-b5.e*d1
if(d3>=0&&c9*d3+d2>=0){d5=d3-c1
d6=0-c2
d7=l*d5
d8=m*d5
d9=l*d6
e0=m*d6
m=d7+d9
h[0]=a0-v*m
a0=d8+e0
h[1]=a5-v*a0
i[0]=i[0]+u*m
i[1]=i[1]+u*a0
p-=t*(a1[0]*d8-a1[1]*d7+(b3[0]*e0-b3[1]*d9))
n+=s*(d[0]*d8-d[1]*d7+(a7[0]*e0-a7[1]*d9))
b5.c=d3
b6.c=0
break $loop$1}d4=-b6.e*d2
if(d4>=0&&d0*d4+d1>=0){d5=0-c1
d6=d4-c2
d7=l*d5
d8=m*d5
d9=l*d6
e0=m*d6
m=d7+d9
h[0]=a0-v*m
a0=d8+e0
h[1]=a5-v*a0
i[0]=i[0]+u*m
i[1]=i[1]+u*a0
p-=t*(a1[0]*d8-a1[1]*d7+(b3[0]*e0-b3[1]*d9))
n+=s*(d[0]*d8-d[1]*d7+(a7[0]*e0-a7[1]*d9))
b5.c=0
b6.c=d4
break $loop$1}if(d1>=0&&d2>=0){d5=0-c1
d6=0-c2
d7=l*d5
d8=m*d5
d9=l*d6
e0=m*d6
m=d7+d9
h[0]=a0-v*m
a0=d8+e0
h[1]=a5-v*a0
i[0]=i[0]+u*m
i[1]=i[1]+u*a0
p-=t*(a1[0]*d8-a1[1]*d7+(b3[0]*e0-b3[1]*d9))
n+=s*(d[0]*d8-d[1]*d7+(a7[0]*e0-a7[1]*d9))
b5.c=0
b6.c=0
break $loop$1}break $loop$1}}this.c[x].sk(p)
this.c[w].sk(n)}},
ed:function(){var z,y,x,w,v,u
for(z=0;z<this.r;++z){y=this.e[z]
for(x=this.f[y.db].z.a,w=0;w<y.cy;++w){v=x[w]
u=y.a[w]
v.b=u.c
v.c=u.d}}},
dZ:function(){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2,a3,a4,a5,a6,a7,a8,a9,b0,b1,b2,b3,b4,b5,b6,b7,b8,b9,c0
for(z=this.x,y=z.b,x=this.y,w=x.b,v=z.a.a,u=x.a.a,t=this.Q,s=t.b.a,r=t.a.a,q=0,p=0;p<this.r;++p){o=this.d[p]
n=o.d
m=o.e
l=o.f
k=o.z
j=o.x.a
i=j[0]
j=j[1]
h=o.r
g=o.Q
f=o.y.a
e=f[0]
f=f[1]
d=o.db
c=this.b[n].gt()
b=this.b[n].gl()
a=this.b[m].gt()
a0=this.b[m].gl()
for(a1=c.a,a2=a.a,a3=l+h,a4=0;a4<d;++a4){y.a=Math.sin(b)
y.b=Math.cos(b)
w.a=Math.sin(a0)
a5=Math.cos(a0)
w.b=a5
a6=a1[0]
a7=y.b
a8=y.a
v[0]=a6-a7*i+a8*j
v[1]=a1[1]-a8*i-a7*j
a7=a2[0]
a8=w.a
u[0]=a7-a5*e+a8*f
u[1]=a2[1]-a8*e-a5*f
t.dd(0,o,z,x,a4)
a9=t.c
a5=s[0]
a8=a1[0]
b0=a5-a8
a7=s[1]
a6=a1[1]
b1=a7-a6
b2=a5-a2[0]
b3=a7-a2[1]
q=Math.min(q,a9)
a7=Math.max(-0.2,Math.min(0.2*(a9+0.005),0))
a5=r[1]
b4=r[0]
b5=b0*a5-b1*b4
b6=b2*a5-b3*b4
b7=a3+k*b5*b5+g*b6*b6
b8=b7>0?-a7/b7:0
b9=b4*b8
c0=a5*b8
a1[0]=a8-b9*l
a1[1]=a6-c0*l
b-=k*(b0*c0-b1*b9)
a2[0]=a2[0]+b9*h
a2[1]=a2[1]+c0*h
a0+=g*(b2*c0-b3*b9)}this.b[n].sl(b)
this.b[m].sl(a0)}return q>=-0.015},
e6:function(c3,c4){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2,a3,a4,a5,a6,a7,a8,a9,b0,b1,b2,b3,b4,b5,b6,b7,b8,b9,c0,c1,c2
for(z=this.x,y=z.b,x=this.y,w=x.b,v=z.a.a,u=x.a.a,t=this.Q,s=t.b.a,r=t.a.a,q=0,p=0;p<this.r;++p){o=this.d[p]
n=o.d
m=o.e
l=o.x
k=o.y
j=l.a
i=j[0]
j=j[1]
h=k.a
g=h[0]
h=h[1]
f=o.db
if(n===c3||n===c4){e=o.f
d=o.z}else{e=0
d=0}if(m===c3||m===c4){c=o.r
b=o.Q}else{c=0
b=0}a=this.b[n].gt()
a0=this.b[n].gl()
a1=this.b[m].gt()
a2=this.b[m].gl()
for(a3=a.a,a4=a1.a,a5=e+c,a6=0;a6<f;++a6){y.a=Math.sin(a0)
y.b=Math.cos(a0)
w.a=Math.sin(a2)
a7=Math.cos(a2)
w.b=a7
a8=a3[0]
a9=y.b
b0=y.a
v[0]=a8-a9*i+b0*j
v[1]=a3[1]-b0*i-a9*j
a9=a4[0]
b0=w.a
u[0]=a9-a7*g+b0*h
u[1]=a4[1]-b0*g-a7*h
t.dd(0,o,z,x,a6)
b1=t.c
a7=s[0]
b0=a3[0]
b2=a7-b0
a9=s[1]
a8=a3[1]
b3=a9-a8
b4=a7-a4[0]
b5=a9-a4[1]
q=Math.min(q,b1)
a9=Math.max(-0.2,Math.min(0.75*(b1+0.005),0))
a7=r[1]
b6=r[0]
b7=b2*a7-b3*b6
b8=b4*a7-b5*b6
b9=a5+d*b7*b7+b*b8*b8
c0=b9>0?-a9/b9:0
c1=b6*c0
c2=a7*c0
a3[0]=b0-c1*e
a3[1]=a8-c2*e
a0-=d*(b2*c2-b3*c1)
a4[0]=a4[0]+c1*c
a4[1]=a4[1]+c2*c
a2+=b*(b4*c2-b5*c1)}this.b[n].sl(a0)
this.b[m].sl(a2)}return q>=-0.0075},
eo:function(){var z,y
z=new Array(256)
z.fixed$length=Array
this.d=H.f(z,[V.bR])
z=new Array(256)
z.fixed$length=Array
this.e=H.f(z,[V.bS])
for(y=0;y<256;++y){this.d[y]=V.cS()
this.e[y]=V.cT()}},
F:{
bg:function(){var z=new V.fb(null,null,null,null,null,null,0,G.t(),G.t(),V.io(),new V.hG(new E.a(new Float64Array(H.b(2))),new E.a(new Float64Array(H.b(2))),0))
z.eo()
return z}}},
hG:{"^":"c;a,b,c",
dd:function(a,b,c,d,a0){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e
z=c.b
y=d.b
x=b.a
w=x[a0]
switch(b.ch){case C.n:v=x[0]
x=z.b
u=b.c.a
t=u[0]
s=z.a
u=u[1]
r=c.a.a
q=x*t-s*u+r[0]
p=s*t+x*u+r[1]
r=y.b
u=v.a
x=u[0]
t=y.a
u=u[1]
s=d.a.a
o=r*x-t*u+s[0]
n=t*x+r*u+s[1]
s=this.a
u=o-q
r=s.a
r[0]=u
x=n-p
r[1]=x
s.Y()
s=this.b.a
s[0]=(q+o)*0.5
s[1]=(p+n)*0.5
this.c=u*r[0]+x*r[1]-b.cx-b.cy
break
case C.h:x=z.b
u=b.b.a
t=u[0]
s=z.a
r=this.a.a
r[0]=x*t-s*u[1]
r[1]=s*u[0]+x*u[1]
u=b.c.a
t=u[0]
u=u[1]
m=c.a.a
l=m[0]
m=m[1]
k=y.b
j=w.a
i=j[0]
h=y.a
j=j[1]
g=d.a.a
f=k*i-h*j+g[0]
e=h*i+k*j+g[1]
this.c=(f-(x*t-s*u+l))*r[0]+(e-(s*t+x*u+m))*r[1]-b.cx-b.cy
r=this.b.a
r[0]=f
r[1]=e
break
case C.r:x=y.b
u=b.b.a
t=u[0]
s=y.a
r=this.a.a
r[0]=x*t-s*u[1]
r[1]=s*u[0]+x*u[1]
u=b.c.a
t=u[0]
u=u[1]
m=d.a.a
l=m[0]
m=m[1]
k=z.b
j=w.a
i=j[0]
h=z.a
j=j[1]
g=c.a.a
f=k*i-h*j+g[0]
e=h*i+k*j+g[1]
this.c=(f-(x*t-s*u+l))*r[0]+(e-(s*t+x*u+m))*r[1]-b.cx-b.cy
m=this.b.a
m[0]=f
m[1]=e
r[0]=r[0]*-1
r[1]=r[1]*-1
break}}},
ee:{"^":"c;a,b,c,d,e,f,r"},
bS:{"^":"c;a,b,c,d,e,f,r,x,y,z,Q,ch,cx,cy,db",
ep:function(){var z,y,x
for(z=this.a,y=0;y<2;++y){x=new Float64Array(2)
z[y]=new V.ee(new E.a(x),new E.a(new Float64Array(2)),0,0,0,0,0)}},
F:{
cT:function(){var z=new V.bS(H.f(new Array(2),[V.ee]),new E.a(new Float64Array(H.b(2))),new E.a4(new Float64Array(H.b(4))),new E.a4(new Float64Array(H.b(4))),0,0,0,0,0,0,0,0,0,0,0)
z.ep()
return z}}},
bi:{"^":"ag;a,b,c,d,e,f,r,x,y,z,Q,ch,cx,cy,db,dx,dy",
ax:function(a,b,c,d){this.bt(a,b,c,d)},
ap:function(a,b,c){this.dx.fr.d3(a,H.q(this.f.d,"$isaI"),b,H.q(this.r.d,"$isaF"),c)}},
bj:{"^":"ag;a,b,c,d,e,f,r,x,y,z,Q,ch,cx,cy,db,dx,dy",
ax:function(a,b,c,d){this.bt(a,b,c,d)},
ap:function(a,b,c){var z,y,x
z=this.dx.fr
y=H.q(this.f.d,"$isaI")
x=this.r.d
z.k3.d2(a,y,b,x,c)}},
bo:{"^":"ag;a,b,c,d,e,f,r,x,y,z,Q,ch,cx,cy,db,dx,dy",
ap:function(a,b,c){this.dx.fr.fn(a,this.f.d,b,H.q(this.r.d,"$isaF"),c)}},
bp:{"^":"ag;a,b,c,d,e,f,r,x,y,z,Q,ch,cx,cy,db,dx,dy",
ap:function(a,b,c){this.dx.fr.fo(a,this.f.d,b,this.r.d,c)}},
cb:{"^":"c;t:a<,l:b@"},
cm:{"^":"c;v:a<,k:b@"},
bW:{"^":"c;a,b,c"},
fA:{"^":"c;a,b,c,d,e,f,r,x,y,z,az:Q<,ch,cx,cy",
fu:function(a,b){var z,y,x,w,v
this.Q=b.b
this.e=b.c
this.f=b.d
this.c=a
this.b=null
z=this.y
y=b.r
z.a=y.a
z.b=y.b
z.c=y.c
b.f
this.z=!1
this.d=b.a.fk(0)
if(this.r==null){z=new Array(1)
z.fixed$length=Array
this.r=H.f(z,[V.bl])
for(x=0;x<1;++x){z=this.r
y=new Float64Array(2)
z[x]=new V.bl(new V.ae(new E.a(y),new E.a(new Float64Array(2))),null,0,0)
this.r[x].sd8(null)
this.r[x].sbC(-1)}}z=this.r
y=z.length
if(y<1){w=Math.max(y*2,1)
v=new Array(w)
v.fixed$length=Array
v=H.f(v,[V.bl])
this.r=v
C.d.a7(v,0,y,z,0)
for(x=0;x<w;++x){z=this.r
y=new Float64Array(2)
z[x]=new V.bl(new V.ae(new E.a(y),new E.a(new Float64Array(2))),null,0,0)
this.r[x].sd8(null)
this.r[x].sbC(-1)}}this.x=0
this.a=b.e},
fA:function(a,b){var z,y,x,w,v,u,t,s,r
this.d.toString
this.x=1
for(z=a.a,y=0;y<this.x;++y){x=this.r[y]
w=this.d
v=x.a
w.bY(v,b,y)
u=z.cF()
t=u.f
s=u.a
w=v.a.a
r=s.a.a
r[0]=w[0]-0.1
r[1]=w[1]-0.1
v=v.b.a
w=s.b.a
w[0]=v[0]+0.1
w[1]=v[1]+0.1
u.b=x
z.cR(t);++a.b
a.d1(t)
x.d=t
x.b=this
x.c=y}},
ek:function(a,b,c){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l
if(this.x===0)return
for(z=this.cy,y=c.a.a,x=b.a.a,w=z.a,v=a.a,u=this.ch,t=this.cx,s=u.a.a,r=u.b.a,q=0;q<this.x;++q){p=this.r[q]
this.d.bY(u,b,p.c)
this.d.bY(t,c,p.c)
o=p.a
n=s[0]
m=t.a.a
l=m[0]
n=n<l?n:l
l=o.a.a
l[0]=n
n=s[1]
m=m[1]
l[1]=n<m?n:m
n=r[0]
m=t.b.a
l=m[0]
n=n>l?n:l
l=o.b.a
l[0]=n
n=r[1]
m=m[1]
l[1]=n>m?n:m
w[0]=y[0]-x[0]
w[1]=y[1]-x[1]
n=p.d
if(v.hf(n,o,z))a.d1(n)}}},
d7:{"^":"c;a,az:b<,c,d,e,f,r"},
bl:{"^":"c;aQ:a<,d8:b?,c,bC:d@"},
da:{"^":"c;a,b,c,d,e,f,r,x,y,z,Q,ch,cx,cy,db,dx,dy,fr",
ax:function(a,b,c,d){var z,y,x
this.z=a
this.Q=b
this.ch=c
this.r=0
this.y=0
this.x=0
this.a=d
z=this.b
if(z==null||a>z.length)this.b=H.f(new Array(a),[V.b9])
z=this.d
if(z==null||this.ch>z.length)this.d=H.f(new Array(this.ch),[V.K])
z=this.c
if(z==null||this.Q>z.length)this.c=H.f(new Array(this.Q),[V.ag])
y=this.f
z=y==null
if(z||this.z>y.length){if(z)y=H.f(new Array(0),[V.cm])
z=new Array(this.z)
z.fixed$length=Array
z=H.f(z,[V.cm])
this.f=z
x=y.length
C.d.a7(z,0,x,y,0)
for(;z=this.f,x<z.length;++x)z[x]=new V.cm(new E.a(new Float64Array(2)),0)}y=this.e
z=y==null
if(z||this.z>y.length){if(z)y=H.f(new Array(0),[V.cb])
z=new Array(this.z)
z.fixed$length=Array
z=H.f(z,[V.cb])
this.e=z
x=y.length
C.d.a7(z,0,x,y,0)
for(;z=this.e,x<z.length;++x)z[x]=new V.cb(new E.a(new Float64Array(2)),0)}},
dS:function(a1,a2,a3,a4){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0
z=a2.a
for(y=a3.a,x=0;x<this.r;++x){w=this.b[x]
v=w.f
u=v.e
t=w.r
s=w.x
r=v.c.a
q=v.b.a
q[1]=r[1]
q[0]=r[0]
v.d=u
if(w.a===C.f){q=t.a
p=q[0]
o=w.k2
n=y[0]
m=w.fx
l=w.y.a
q[0]=p+z*(o*n+m*l[0])
q[1]=q[1]+z*(o*y[1]+m*l[1])
l=w.go
m=w.z
o=q[0]
n=1/(1+z*w.id)
q[0]=o*n
q[1]=q[1]*n
s=(s+z*l*m)*(1/(1+z*w.k1))}J.bI(this.e[x].gt(),r[0])
J.bJ(this.e[x].gt(),r[1])
this.e[x].sl(u)
q=t.a
this.f[x].gv().a[0]=q[0]
this.f[x].gv().a[1]=q[1]
this.f[x].sk(s)}y=this.cy
y.a=a2
q=this.e
y.b=q
p=this.f
y.c=p
o=this.db
o.a=a2
o.b=this.c
o.c=this.y
o.d=q
o.e=p
p=this.cx
p.dc(o)
p.de()
if(a2.f)p.hB()
for(x=0;x<this.x;++x)this.d[x].ai(y)
for(x=0;x<a2.d;++x){for(k=0;k<this.x;++k)this.d[k].ag(y)
p.cz()}p.ed()
for(x=0;x<this.r;++x){j=this.e[x].gt()
u=this.e[x].gl()
t=this.f[x].gv()
s=this.f[x].gk()
q=t.a
i=q[0]*z
h=q[1]*z
o=i*i+h*h
if(o>4){g=2/Math.sqrt(o)
q[0]=q[0]*g
q[1]=q[1]*g}f=z*s
if(f*f>2.4674011002723395)s*=1.5707963267948966/Math.abs(f)
o=j.a
o[0]=o[0]+z*q[0]
o[1]=o[1]+z*q[1]
this.e[x].sl(u+z*s)
this.f[x].sk(s)}x=0
while(!0){if(!(x<a2.e)){e=!1
break}d=p.dZ()
for(c=!0,k=0;k<this.x;++k){b=this.d[k].af(y)
c=c&&b}if(d&&c){e=!0
break}++x}for(x=0;x<this.r;++x){a=this.b[x]
y=a.f
q=y.c.a
q[0]=J.T(this.e[x].gt())
q[1]=J.U(this.e[x].gt())
y.e=this.e[x].gl()
y=a.r.a
y[0]=this.f[x].gv().a[0]
y[1]=this.f[x].gv().a[1]
a.x=this.f[x].gk()
a.b_()}this.dq(p.e)
if(a4){for(a0=17976931348623157e292,x=0;x<this.r;++x){w=this.b[x]
if(w.a===C.e)continue
if((w.b&4)!==0){y=w.x
if(!(y*y>0.0012184696791468343)){y=w.r
y=y.A(y)>0.0001}else y=!0}else y=!0
if(y){w.k3=0
a0=0}else{y=w.k3+=z
a0=Math.min(a0,y)}}if(a0>=0.5&&e)for(x=0;x<this.r;++x)this.b[x].ak(!1)}},
e5:function(a,b,c){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k
for(z=0;z<this.r;++z){J.bI(this.e[z].gt(),this.b[z].f.c.a[0])
J.bJ(this.e[z].gt(),this.b[z].f.c.a[1])
this.e[z].sl(this.b[z].f.e)
this.f[z].gv().a[0]=this.b[z].r.a[0]
y=this.f[z].gv()
x=this.b
y.a[1]=x[z].r.a[1]
this.f[z].sk(x[z].x)}y=this.dy
y.b=this.c
y.c=this.y
y.a=a
y.d=this.e
y.e=this.f
x=this.dx
x.dc(y)
for(z=0;z<a.e;++z)if(x.e6(b,c))break
this.b[b].f.b.a[0]=J.T(this.e[b].gt())
this.b[b].f.b.a[1]=J.U(this.e[b].gt())
this.b[b].f.d=this.e[b].gl()
this.b[c].f.b.h(this.e[c].gt())
this.b[c].f.d=this.e[c].gl()
x.de()
for(z=0;z<a.d;++z)x.cz()
w=a.a
for(z=0;z<this.r;++z){v=this.e[z].gt()
u=this.e[z].gl()
t=this.f[z].gv()
s=this.f[z].gk()
y=t.a
r=y[0]*w
q=y[1]*w
p=r*r+q*q
if(p>4){o=2/Math.sqrt(p)
y[1]=y[1]*o
y[0]=y[0]*o}n=w*s
if(n*n>2.4674011002723395)s*=1.5707963267948966/Math.abs(n)
p=v.a
p[0]=p[0]+y[0]*w
p[1]=p[1]+y[1]*w
u+=w*s
J.bI(this.e[z].gt(),p[0])
J.bJ(this.e[z].gt(),p[1])
this.e[z].sl(u)
this.f[z].gv().a[0]=y[0]
this.f[z].gv().a[1]=y[1]
this.f[z].sk(s)
m=this.b[z]
l=m.f
k=l.c.a
k[0]=p[0]
k[1]=p[1]
l.e=u
l=m.r.a
l[0]=y[0]
l[1]=y[1]
m.x=s
m.b_()}this.dq(x.e)},
dq:function(a){return}},
f6:{"^":"K;ch,cx,cy,db,dx,dy,fr,a,b,c,d,e,f,r,x,y,z,Q",
dz:function(){var z,y,x,w,v,u,t
for(z=this.ch,y=0,x=0;C.b.L(x,z.gw(z));x=w){z.gw(z).H(0,1)
w=x+1
v=z.i(0,x).gbp()
v=v.gC(v)
u=z.i(0,w).gbp()
u=v.n(0,u.gD(u))
v=z.i(0,w).gbp()
v=v.gC(v)
t=z.i(0,x).gbp()
y=C.a.B(y,u.H(0,v.n(0,t.gD(t))))}return y*0.5},
dF:function(a){var z,y,x,w
for(z=this.ch,y=0,x=0;C.b.L(x,z.gw(z));x=w){z.gw(z).H(0,1)
w=x+1
y+=J.T(a[z.i(0,x).gU()].gt())*J.U(a[z.i(0,w).gU()].gt())-J.T(a[z.i(0,w).gU()].gt())*J.U(a[z.i(0,x).gU()].gt())}return y*0.5},
eO:function(a){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k
for(z=this.ch,y=0,x=0;C.b.L(x,z.gw(z));x=w){z.gw(z).H(0,1)
w=x+1
v=J.T(a[z.i(0,w).gU()].gt())-J.T(a[z.i(0,x).gU()].gt())
u=J.U(a[z.i(0,w).gU()].gt())-J.U(a[z.i(0,x).gU()].gt())
t=Math.sqrt(v*v+u*u)
if(t<11920928955078125e-23)t=1
s=this.db
s[x].a[0]=u/t
s[x].a[1]=-v/t
y+=t}s=this.Q.a
s=s.a[s.b++]
r=0.5*(this.cy-this.dF(a))/y
for(q=!0,x=0;C.b.L(x,z.gw(z));x=w){z.gw(z).H(0,1)
w=x+1
p=this.db
o=p[x].a
n=o[0]
p=p[w].a
m=p[0]
o=o[1]
p=p[1]
l=s.a
l[0]=r*(n+m)
l[1]=r*(o+p)
k=s.gS()
if(k>0.04000000000000001){p=0.2/Math.sqrt(k)
l[1]=l[1]*p
l[0]=l[0]*p}if(k>0.000025)q=!1
p=a[z.i(0,w).gU()].gt()
o=J.J(p)
o.sC(p,o.gC(p)+l[0])
p=a[z.i(0,w).gU()].gt()
o=J.J(p)
o.sD(p,o.gD(p)+l[1])}--this.Q.a.b
return q},
ai:function(a){var z,y,x,w,v,u,t,s,r
z=a.c
y=a.b
x=this.ch
w=this.Q.cp(x.gw(x))
for(v=J.A(w),u=0;C.b.L(u,x.gw(x));u=s){t=u===0?x.gw(x).H(0,1):u-1
x.gw(x).H(0,1)
s=u+1
v.i(w,u).h(y[x.i(0,s).gU()].gt())
v.i(w,u).j(y[x.i(0,t).gU()].gt())}r=a.a
if(r.f){this.dx=this.dx*r.c
for(u=0;C.b.L(u,x.gw(x));++u){r=z[x.i(0,u).gU()].gv().a
r[0]=C.a.B(r[0],x.i(0,u).gbc().n(0,J.U(v.i(w,u))).n(0,0.5).n(0,this.dx))
r=z[x.i(0,u).gU()].gv().a
r[1]=C.a.B(r[1],x.i(0,u).gbc().n(0,-J.T(v.i(w,u))).n(0,0.5).n(0,this.dx))}}else this.dx=0},
af:function(a){return this.eO(a.b)},
ag:function(a){var z,y,x,w,v,u,t,s,r,q,p,o
z=a.c
y=a.b
x=this.ch
w=this.Q.cp(x.gw(x))
for(v=J.A(w),u=0,t=0,s=0;C.b.L(s,x.gw(x));s=q){r=s===0?x.gw(x).H(0,1):s-1
x.gw(x).H(0,1)
q=s+1
v.i(w,s).h(y[x.i(0,q).gU()].gt())
v.i(w,s).j(y[x.i(0,r).gU()].gt())
t+=C.a.cg(v.i(w,s).gS(),x.i(0,s).ghZ())
u+=z[x.i(0,s).gU()].gv().u(v.i(w,s))}p=-2*u/t
this.dx+=p
for(s=0;C.b.L(s,x.gw(x));++s){o=z[x.i(0,s).gU()].gv().a
o[0]=C.a.B(o[0],x.i(0,s).gbc().n(0,J.U(v.i(w,s))).n(0,0.5).n(0,p))
o=z[x.i(0,s).gU()].gv().a
o[1]=C.a.B(o[1],x.i(0,s).gbc().n(0,-J.T(v.i(w,s))).n(0,0.5).n(0,p))}},
ac:function(a){},
ad:function(a){},
el:function(a,b){var z,y,x,w,v
this.dy=a
z=b.gd0()
if(z.gw(z).hF(0,2))throw H.e("You cannot create a constant volume joint with less than three _bodies.")
z=this.ch
y=new Float64Array(H.b(z.gw(z)))
this.cx=y
for(x=0;y=y.length,x<y;++x){w=x===y-1?0:x+1
y=z.i(0,x).gbp().H(0,z.i(0,w).gbp())
v=y.gw(y)
y=this.cx
y[x]=v}this.cy=this.dz()
b.gh7()
z=b.gh7()
z.gw(z)
z=b.gd0()
z.gw(z)
throw H.e("Incorrect joint definition.  Joints have to correspond to the _bodies")},
F:{
f7:function(a,b){var z=new V.f6(b.gd0().bD(0,!1),null,0,null,0,null,null,b.gay(b),null,null,null,null,null,null,!1,!1,null,null)
z.ah(a.ch,b)
z.el(a,b)
return z}}},
fo:{"^":"K;ch,cx,cy,db,dx,dy,fr,fx,fy,go,id,k1,k2,k3,k4,r1,r2,rx,ry,x1,a,b,c,d,e,f,r,x,y,z,Q",
ac:function(a){G.r(this.f.d,this.db,a)},
ad:function(a){G.r(this.r.d,this.dx,a)},
ai:function(a){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f
z=this.f
this.fy=z.c
this.go=this.r.c
y=this.k3
y.h(z.f.a)
z=this.k4
z.h(this.r.f.a)
x=this.f
this.r1=x.fx
w=this.r
this.r2=w.fx
this.rx=x.go
this.ry=w.go
v=a.b[this.fy].gt()
u=a.b[this.fy].gl()
t=a.c[this.fy].gv()
s=a.c[this.fy].gk()
r=a.b[this.go].gt()
q=a.b[this.go].gl()
p=a.c[this.go].gv()
o=a.c[this.go].gk()
w=this.Q.f
x=w.a
n=w.b
m=n+1
w.b=m
n=x[n]
w.b=m+1
m=x[m]
n.G(u)
m.G(q)
x=this.id
x.h(this.db)
x.j(y)
y=this.k1
G.j(n,x,y)
x.h(this.dx)
x.j(z)
z=this.k2
G.j(m,x,z)
x.h(r)
x.q(0,z)
x.j(v)
x.j(y)
this.Q.f.b-=2
m=Math.sqrt(x.gS())
w=x.a
if(m>0.005){n=1/m
w[0]=w[0]*n
w[1]=w[1]*n}else{w[0]=0
w[1]=0}l=y.u(x)
k=z.u(x)
j=this.r1+this.rx*l*l+this.r2+this.ry*k*k
w=j!==0?1/j:0
this.x1=w
n=this.ch
if(n>0){i=this.fx
h=6.283185307179586*n
n=this.cx
g=w*h*h
f=a.a.a
n=f*(2*w*n*h+f*g)
this.dy=n
w=n!==0?1/n:0
this.dy=w
this.cy=(m-i)*f*g*w
j+=w
this.x1=j!==0?1/j:0}else{this.dy=0
this.cy=0}w=a.a
if(w.f){this.fr=this.fr*w.c
w=this.Q.a
w=w.a[w.b++]
w.h(x)
w.E(0,this.fr)
x=t.a
n=x[0]
m=this.r1
i=w.a
x[0]=n-m*i[0]
x[1]=x[1]-m*i[1]
s-=this.rx*y.u(w)
y=p.a
m=y[0]
x=this.r2
y[0]=m+x*i[0]
y[1]=y[1]+x*i[1]
o+=this.ry*z.u(w);--this.Q.a.b}else this.fr=0
a.c[this.fy].sk(s)
a.c[this.go].sk(o)},
ag:function(a){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l
z=a.c[this.fy].gv()
y=a.c[this.fy].gk()
x=a.c[this.go].gv()
w=a.c[this.go].gk()
v=this.Q.a
u=v.a
t=v.b
s=t+1
v.b=s
t=u[t]
v.b=s+1
s=u[s]
u=this.k1
u.O(y,t)
t.q(0,z)
v=this.k2
v.O(w,s)
s.q(0,x)
r=this.id
s.j(t)
q=r.A(s)
s=this.x1
t=this.cy
p=this.dy
o=this.fr
n=-s*(q+t+p*o)
this.fr=o+n
r=r.a
m=n*r[0]
l=n*r[1]
r=z.a
o=r[0]
p=this.r1
r[0]=o-p*m
r[1]=r[1]-p*l
p=this.rx
u=u.a
r=u[0]
u=u[1]
o=x.a
t=o[0]
s=this.r2
o[0]=t+s*m
o[1]=o[1]+s*l
s=this.ry
v=v.a
o=v[0]
v=v[1]
a.c[this.fy].sk(y-p*(r*l-u*m))
a.c[this.go].sk(w+s*(o*l-v*m))
this.Q.a.b-=2},
af:function(a){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l
if(this.ch>0)return!0
z=this.Q
y=z.f
x=y.a
w=y.b
v=w+1
y.b=v
w=x[w]
y.b=v+1
v=x[v]
z=z.a
x=z.a
y=z.b
u=y+1
z.b=u
y=x[y]
t=u+1
z.b=t
u=x[u]
z.b=t+1
t=x[t]
s=a.b[this.fy].gt()
r=a.b[this.fy].gl()
q=a.b[this.go].gt()
p=a.b[this.go].gl()
w.G(r)
v.G(p)
t.h(this.db)
t.j(this.k3)
G.j(w,t,y)
t.h(this.dx)
t.j(this.k4)
G.j(v,t,u)
t.h(q)
t.q(0,u)
t.j(s)
t.j(y)
v=Math.max(-0.2,Math.min(t.Y()-this.fx,0.2))
o=-this.x1*v
t=t.a
n=o*t[0]
m=o*t[1]
t=s.a
w=t[0]
x=this.r1
t[0]=w-x*n
t[1]=t[1]-x*m
x=this.rx
y=y.a
t=y[0]
y=y[1]
w=q.a
z=w[0]
l=this.r2
w[0]=z+l*n
w[1]=w[1]+l*m
l=this.ry
u=u.a
w=u[0]
u=u[1]
a.b[this.fy].sl(r-x*(t*m-y*n))
a.b[this.go].sl(p+l*(w*m-u*n))
u=this.Q
u.a.b-=3
u.f.b-=2
return Math.abs(v)<0.005}},
fC:{"^":"K;ch,cx,cy,db,dx,dy,fr,fx,fy,go,id,k1,k2,k3,k4,r1,r2,rx,a,b,c,d,e,f,r,x,y,z,Q",
ac:function(a){G.r(this.f.d,this.ch,a)},
ad:function(a){G.r(this.r.d,this.cx,a)},
ai:function(a){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f
z=this.f
this.fr=z.c
this.fx=this.r.c
y=this.id
y.h(z.f.a)
z=this.k1
z.h(this.r.f.a)
x=this.f
this.k2=x.fx
w=this.r
this.k3=w.fx
this.k4=x.go
this.r1=w.go
v=a.b[this.fr].gl()
u=a.c[this.fr].gv()
t=a.c[this.fr].gk()
s=a.b[this.fx].gl()
r=a.c[this.fx].gv()
q=a.c[this.fx].gk()
w=this.Q
x=w.a
x=x.a[x.b++]
w=w.f
p=w.a
o=w.b
n=o+1
w.b=n
o=p[o]
w.b=n+1
n=p[n]
o.G(v)
n.G(s)
x.h(this.ch)
x.j(y)
y=this.fy
G.j(o,x,y)
x.h(this.cx)
x.j(z)
z=this.go
G.j(n,x,z)
m=this.k2
l=this.k3
k=this.k4
j=this.r1
n=this.Q.c
n=n.a[n.b++]
o=m+l
p=y.a
w=p[1]
i=z.a
h=i[1]
p=p[0]
i=i[0]
g=j*i
f=-k*p*w-g*h
n.ba(o+k*w*w+j*h*h,f,f,o+k*p*p+g*i)
i=this.r2
i.h(n)
i.bB()
i=k+j
this.rx=i
if(i>0)this.rx=1/i
w=a.a
p=this.cy
if(w.f){p.E(0,w.c)
this.db=this.db*a.a.c
w=this.Q.a
w=w.a[w.b++]
w.h(p)
x.h(w)
x.E(0,m)
u.j(x)
t-=k*(y.u(w)+this.db)
x.h(w)
x.E(0,l)
r.q(0,x)
q+=j*(z.u(w)+this.db);--this.Q.a.b}else{p.I()
this.db=0}J.Z(a.c[this.fr].gk(),t)
a.c[this.fr].sk(t)
a.c[this.fx].sk(q)
z=this.Q
z.f.b-=2;--z.a.b;--z.c.b},
ag:function(a){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i
z=a.c[this.fr].gv()
y=a.c[this.fr].gk()
x=a.c[this.fx].gv()
w=a.c[this.fx].gk()
v=this.k2
u=this.k3
t=this.k4
s=this.r1
r=a.a.a
q=this.rx
p=this.db
o=r*this.dy
q=Math.max(-o,Math.min(p+-q*(w-y),o))
this.db=q
n=q-p
y-=t*n
w+=s*n
q=this.Q.a
m=q.a
l=q.b
k=l+1
q.b=k
l=m[l]
q.b=k+1
k=m[k]
m=this.fy
m.O(y,k)
q=this.go
q.O(w,l)
l.q(0,x)
l.j(z)
l.j(k)
j=this.Q.a
j=j.a[j.b++]
this.r2.cc(l,j)
j.J()
l=this.Q.a
l=l.a[l.b++]
i=this.cy
l.h(i)
i.q(0,j)
o=r*this.dx
if(i.gS()>o*o){i.Y()
i.E(0,o)}j.h(i)
j.j(l)
k.h(j)
k.E(0,v)
z.j(k)
y-=t*m.u(j)
k.h(j)
k.E(0,u)
x.q(0,k)
q=q.u(j)
J.Z(a.c[this.fr].gk(),y)
a.c[this.fr].sk(y)
a.c[this.fx].sk(w+s*q)
this.Q.a.b-=4},
af:function(a){return!0}},
d8:{"^":"fZ;f,r,x,y,a,b,c,d,e"},
fE:{"^":"K;ch,cx,cy,db,dx,dy,fr,fx,fy,go,id,k1,k2,k3,k4,r1,r2,rx,ry,x1,x2,y1,y2,a4,N,V,R,W,T,Z,a1,a8,a9,aq,aJ,aK,aL,aa,ar,as,a,b,c,d,e,f,r,x,y,z,Q",
ac:function(a){G.r(this.f.d,this.fr,a)},
ad:function(a){G.r(this.r.d,this.fx,a)},
ai:function(a){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b
this.rx=this.f.c
this.ry=this.r.c
z=this.dx
this.x1=z.gU()
y=this.dy
this.x2=y.gU()
x=this.y1
x.h(this.f.f.a)
w=this.y2
w.h(this.r.f.a)
v=this.a4
v.h(z.gaP().ghc())
u=this.N
u.h(y.gaP().ghc())
this.V=this.f.fx
this.R=this.r.fx
this.W=z.gbc()
this.T=y.gbc()
this.Z=this.f.go
this.a1=this.r.go
this.a8=z.geY()
this.a9=y.geY()
t=a.b[this.rx].gl()
s=a.c[this.rx].gv()
r=a.c[this.rx].gk()
q=a.b[this.ry].gl()
p=a.c[this.ry].gv()
o=a.c[this.ry].gk()
n=a.b[this.x1].gl()
m=a.c[this.x1].gv()
l=a.c[this.x1].gk()
k=a.b[this.x2].gl()
j=a.c[this.x2].gv()
i=a.c[this.x2].gk()
y=this.Q.f
z=y.a
h=y.b
g=h+1
y.b=g
h=z[h]
f=g+1
y.b=f
g=z[g]
e=f+1
y.b=e
f=z[f]
y.b=e+1
e=z[e]
h.G(t)
g.G(q)
f.G(n)
e.G(k)
this.as=0
z=this.Q.a
y=z.a
d=z.b
c=d+1
z.b=c
d=y[d]
b=c+1
z.b=b
c=y[c]
z.b=b+1
z=y[b]
y=this.aq
G.j(f,this.id,y)
d.h(this.fy)
d.j(v)
G.j(f,d,c)
d.h(this.fr)
d.j(x)
G.j(h,d,z)
this.aa=c.u(y)
y=z.u(y)
this.aK=y
z=this.as
c=this.W
h=this.V
x=this.a8
f=this.aa
y=z+(c+h+x*f*f+this.Z*y*y)
this.as=y
f=this.Q
f.a.b-=2
z=f
z=z.a
y=z.a
x=z.b
v=x+1
z.b=v
x=y[x]
h=v+1
z.b=h
v=y[v]
z.b=h+1
h=y[h]
G.j(e,this.k1,x)
d.h(this.go)
d.j(u)
G.j(e,d,v)
d.h(this.fx)
d.j(w)
G.j(g,d,h)
d=this.aJ
d.h(x)
d.E(0,this.r1)
this.ar=this.r1*v.u(x)
x=this.r1*h.u(x)
this.aL=x
h=this.as
v=this.r1
d=this.T
g=this.R
w=this.a9
e=this.ar
x=h+(v*v*(d+g)+w*e*e+this.a1*x*x)
this.as=x
e=this.Q
e.a.b-=3
y=e
z=x
this.as=z>0?1/z:0
if(a.a.f){z=s.a
x=z[0]
w=this.V
v=this.r2
w*=v
u=this.aq.a
z[0]=x+w*u[0]
z[1]=z[1]+w*u[1]
r+=this.Z*v*this.aK
w=p.a
z=w[0]
x=this.R*v
h=this.aJ.a
w[0]=z+x*h[0]
w[1]=w[1]+x*h[1]
o+=this.a1*v*this.aL
x=m.a
w=x[0]
z=this.W*v
x[0]=w-z*u[0]
x[1]=x[1]-z*u[1]
l-=this.a8*v*this.aa
u=j.a
z=u[0]
x=this.T*v
u[0]=z-x*h[0]
u[1]=u[1]-x*h[1]
i-=this.a9*v*this.ar}else this.r2=0;--y.a.b
y.f.b-=4
a.c[this.rx].sk(r)
a.c[this.ry].sk(o)
a.c[this.x1].sk(l)
a.c[this.x2].sk(i)},
ag:function(a){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g
z=a.c[this.rx].gv()
y=a.c[this.rx].gk()
x=a.c[this.ry].gv()
w=a.c[this.ry].gk()
v=a.c[this.x1].gv()
u=a.c[this.x1].gk()
t=a.c[this.x2].gv()
s=a.c[this.x2].gk()
r=this.Q.a
q=r.a
p=r.b
o=p+1
r.b=o
p=q[p]
r.b=o+1
o=q[o]
q=this.aq
p.h(z)
p.j(v)
p=q.A(p)
r=this.aJ
o.h(x)
o.j(t)
o=r.A(o)
n=this.aK
m=this.aa
l=this.aL
k=this.ar
this.Q.a.b-=2
j=-this.as*(p+o+(n*y-m*u+(l*w-k*s)))
this.r2+=j
o=z.a
p=o[0]
i=this.V*j
q=q.a
o[0]=p+i*q[0]
o[1]=o[1]+i*q[1]
i=this.Z
o=x.a
p=o[0]
h=this.R*j
r=r.a
o[0]=p+h*r[0]
o[1]=o[1]+h*r[1]
h=this.a1
o=v.a
p=o[0]
g=this.W*j
o[0]=p-g*q[0]
o[1]=o[1]-g*q[1]
q=this.a8
g=t.a
o=g[0]
p=this.T*j
g[0]=o-p*r[0]
g[1]=g[1]-p*r[1]
r=this.a9
a.c[this.rx].sk(y+i*j*n)
a.c[this.ry].sk(w+h*j*l)
a.c[this.x1].sk(u-q*j*m)
a.c[this.x2].sk(s-r*j*k)},
af:function(a4){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2,a3
z=a4.b[this.rx].gt()
y=a4.b[this.rx].gl()
x=a4.b[this.ry].gt()
w=a4.b[this.ry].gl()
v=a4.b[this.x1].gt()
u=a4.b[this.x1].gl()
t=a4.b[this.x2].gt()
s=a4.b[this.x2].gl()
r=this.Q.f
q=r.a
p=r.b
o=p+1
r.b=o
p=q[p]
n=o+1
r.b=n
o=q[o]
m=n+1
r.b=m
n=q[n]
r.b=m+1
m=q[m]
p.G(y)
o.G(w)
n.G(u)
m.G(s)
q=this.Q.a
r=q.a
l=q.b
k=l+1
q.b=k
l=r[l]
j=k+1
q.b=j
k=r[k]
i=j+1
q.b=i
j=r[j]
h=i+1
q.b=h
i=r[i]
g=h+1
q.b=g
h=r[h]
f=g+1
q.b=f
g=r[g]
q.b=f+1
f=r[f]
r=this.id
G.j(n,r,k)
q=this.fy
l.h(q)
e=this.a4
l.j(e)
G.j(n,l,i)
l.h(this.fr)
l.j(this.y1)
G.j(p,l,h)
d=i.u(k)
c=h.u(k)
b=0+(this.W+this.V+this.a8*d*d+this.Z*c*c)
g.h(q)
g.j(e)
l.h(h)
l.q(0,z)
l.j(v)
G.W(n,l,f)
f.j(g)
a=f.A(r)
r=this.Q
r.a.b-=4
r=r.a
q=r.a
p=r.b
n=p+1
r.b=n
p=q[p]
i=n+1
r.b=i
n=q[n]
h=i+1
r.b=h
i=q[i]
g=h+1
r.b=g
h=q[h]
r.b=g+1
g=q[g]
q=this.k1
G.j(m,q,p)
r=this.go
l.h(r)
f=this.N
l.j(f)
G.j(m,l,n)
l.h(this.fx)
l.j(this.y2)
G.j(o,l,i)
j.h(p)
j.E(0,this.r1)
a0=n.u(p)
a1=i.u(p)
p=this.r1
b+=p*p*(this.T+this.R)+this.a9*a0*a0+this.a1*a1*a1
h.h(r)
h.j(f)
l.h(i)
l.q(0,x)
l.j(t)
G.W(m,l,g)
g.j(h)
a2=g.A(q)
q=this.Q
q.a.b-=5
r=q
q=this.r1
p=this.k4
a3=b>0?-(a+q*a2-p)/b:0
r.a.b-=3
r.f.b-=4
r=z.a
q=r[0]
p=this.V*a3
k=k.a
r[0]=q+p*k[0]
r[1]=r[1]+p*k[1]
p=this.Z
r=x.a
q=r[0]
o=this.R*a3
j=j.a
r[0]=q+o*j[0]
r[1]=r[1]+o*j[1]
o=this.a1
r=v.a
q=r[0]
n=this.W*a3
r[0]=q-n*k[0]
r[1]=r[1]-n*k[1]
k=this.a8
n=t.a
r=n[0]
q=this.T*a3
n[0]=r-q*j[0]
n[1]=n[1]-q*j[1]
j=this.a9
a4.b[this.rx].sl(y+p*a3*c)
a4.b[this.ry].sl(w+o*a3*a1)
a4.b[this.x1].sl(u-k*a3*d)
a4.b[this.x2].sl(s-j*a3*a0)
return!0}},
K:{"^":"c;",
ah:function(a,b){this.Q=a
this.b=null
this.c=null
this.f=b.c
this.r=b.d
this.y=b.e
this.x=!1
this.z=b.b
this.d=new V.dh(null,null,null,null)
this.e=new V.dh(null,null,null,null)}},
fZ:{"^":"c;az:b<"},
dh:{"^":"c;a,b,c,d"},
L:{"^":"c;a,b",
m:function(a){return this.b}},
di:{"^":"c;a,b",
m:function(a){return this.b}},
he:{"^":"K;ch,cx,cy,db,dx,dy,fr,fx,fy,go,id,k1,k2,k3,k4,r1,r2,rx,ry,x1,x2,a,b,c,d,e,f,r,x,y,z,Q",
ac:function(a){a.h(this.f.d.a)},
ad:function(a){a.h(this.r.d.a)},
ai:function(a){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c
z=this.f
this.fx=z.c
this.fy=this.r.c
y=this.k1
y.h(z.f.a)
z=this.k2
z.h(this.r.f.a)
x=this.f
this.r1=x.fx
w=this.r
this.r2=w.fx
this.rx=x.go
this.ry=w.go
v=a.b[this.fx].gt()
u=a.b[this.fx].gl()
t=a.c[this.fx].gv()
s=a.c[this.fx].gk()
r=a.b[this.fy].gt()
q=a.b[this.fy].gl()
p=a.c[this.fy].gv()
o=a.c[this.fy].gk()
w=this.Q
x=w.f
n=x.a
m=x.b
l=m+1
x.b=l
m=n[m]
x.b=l+1
l=n[l]
n=w.a
n=n.a[n.b++]
w=w.c
w=w.a[w.b++]
m.G(u)
l.G(q)
x=m.b
y=y.a
k=y[0]
j=m.a
i=this.go.a
i[0]=x*-k-j*-y[1]
i[1]=j*-y[0]+x*-y[1]
y=l.b
z=z.a
x=z[0]
l=l.a
j=this.id.a
j[0]=y*-x-l*-z[1]
j[1]=l*-z[0]+y*-z[1]
h=this.r1
g=this.r2
f=this.rx
e=this.ry
z=h+g
y=i[1]
l=j[1]
x=i[0]
k=j[0]
d=e*k
c=-f*x*y-d*l
w.ba(z+f*y*y+e*l*l,c,c,z+f*x*x+d*k)
k=this.x1
k.h(w)
k.bB()
k=f+e
this.x2=k
if(k>0)this.x2=1/k
G.j(m,this.ch,n)
z=r.a
y=z[0]
x=j[0]
w=v.a
m=w[0]
l=i[0]
n=n.a
k=this.k3.a
k[0]=y+x-m-l-n[0]
k[1]=z[1]+j[1]-w[1]-i[1]-n[1]
this.k4=q-u-this.cx
z=a.a
y=this.cy
if(z.f){y=y.a
x=y[0]
z=z.c
y[0]=x*z
y[1]=y[1]*z
z=this.db*=z
x=t.a
x[0]=x[0]-h*y[0]
x[1]=x[1]-h*y[1]
x=i[0]
w=y[1]
i=i[1]
n=y[0]
s-=f*(x*w-i*n+z)
i=p.a
i[0]=i[0]+g*n
i[1]=i[1]+g*y[1]
o+=e*(j[0]*y[1]-j[1]*y[0]+z)}else{y.I()
this.db=0}z=this.Q;--z.a.b;--z.c.b
z.f.b-=2
a.c[this.fx].sk(s)
a.c[this.fy].sk(o)},
ag:function(a1){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0
z=a1.c[this.fx].gv()
y=a1.c[this.fx].gk()
x=a1.c[this.fy].gv()
w=a1.c[this.fy].gk()
v=this.r1
u=this.r2
t=this.rx
s=this.ry
r=a1.a
q=r.a
p=r.b
r=this.Q.a
o=r.a
n=r.b
m=n+1
r.b=m
n=o[n]
l=p*this.fr
k=this.k4
j=this.x2
i=this.db
h=q*this.dy
k=Math.max(-h,Math.min(i+-j*(w-y+l*k),h))
this.db=k
g=k-i
y-=t*g
w+=s*g
r.b=m+1
m=o[m]
o=x.a
r=o[0]
k=this.id.a
j=k[1]
f=z.a
e=f[0]
d=this.go.a
c=d[1]
b=this.k3.a
a=b[0]
a0=m.a
a0[0]=r+-w*j-e- -y*c+l*a
a0[1]=o[1]+w*k[0]-f[1]-y*d[0]+l*b[1]
this.x1.cc(m,n)
n.J()
m=this.Q.a
m=m.a[m.b++]
b=this.cy
m.h(b)
b.q(0,n)
h=q*this.dx
if(b.gS()>h*h){b.Y()
b.E(0,h)}r=b.a
l=r[0]
m=m.a
j=m[0]
n=n.a
n[0]=l-j
n[1]=r[1]-m[1]
f[0]=f[0]-v*n[0]
f[1]=f[1]-v*n[1]
f=d[0]
m=n[1]
d=d[1]
r=n[0]
o[0]=o[0]+u*r
o[1]=o[1]+u*n[1]
o=k[0]
j=n[1]
k=k[1]
n=n[0]
this.Q.a.b-=3
a1.c[this.fx].sk(y-t*(f*m-d*r))
a1.c[this.fy].sk(w+s*(o*j-k*n))},
af:function(a){return!0}},
hf:{"^":"K;ch,cx,cy,db,dx,dy,fr,fx,fy,go,id,k1,k2,k3,k4,a,b,c,d,e,f,r,x,y,z,Q",
ac:function(a){a.h(this.cx)},
ad:function(a){G.r(this.r.d,this.ch,a)},
ai:function(a){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l
z=this.r
this.fy=z.c
y=this.id
y.h(z.f.a)
z=this.r
this.k1=z.fx
this.k2=z.go
x=a.b[this.fy].gt()
w=a.b[this.fy].gl()
v=a.c[this.fy].gv()
u=a.c[this.fy].gk()
z=this.Q.f
z=z.a[z.b++]
z.G(w)
t=this.r.fr
s=6.283185307179586*this.cy
r=this.db
q=a.a.a
p=q*(t*(s*s))
r=q*(2*t*r*s+p)
this.fx=r
if(r!==0){r=1/r
this.fx=r}this.dx=p*r
r=this.Q.a
r=r.a[r.b++]
r.h(this.ch)
r.j(y)
y=this.go
G.j(z,r,y)
r=this.Q.c
r=r.a[r.b++]
z=this.k1
p=this.k2
o=y.a
n=o[1]
m=this.fx
o=o[0]
l=-p*o*n
r.ba(z+p*n*n+m,l,l,z+p*o*o+m)
m=this.k3
m.h(r)
m.bB()
m=this.k4
m.h(x)
m.q(0,y)
m.j(this.cx)
m.E(0,this.dx)
u*=0.98
z=a.a
r=this.dy
if(z.f){r.E(0,z.c)
z=v.a
p=z[0]
o=this.k1
n=r.a
z[0]=p+o*n[0]
z[1]=z[1]+o*n[1]
u+=this.k2*y.u(r)}else r.I()
a.c[this.fy].sk(u)
z=this.Q;--z.a.b;--z.c.b;--z.f.b},
af:function(a){return!0},
ag:function(a){var z,y,x,w,v,u,t,s,r
z=a.c[this.fy].gv()
y=a.c[this.fy].gk()
x=this.Q.a
x=x.a[x.b++]
w=this.go
w.O(y,x)
x.q(0,z)
v=this.Q.a
u=v.a
t=v.b
s=t+1
v.b=s
t=u[t]
v.b=s+1
s=u[s]
u=this.dy
s.h(u)
s.E(0,this.fx)
s.q(0,this.k4)
s.q(0,x)
s.J()
this.k3.cc(s,t)
s.h(u)
u.q(0,t)
r=a.a.a*this.fr
if(u.gS()>r*r)u.E(0,r/Math.sqrt(u.gS()))
t.h(u)
t.j(s)
x=z.a
v=x[0]
u=this.k1
s=t.a
x[0]=v+u*s[0]
x[1]=x[1]+u*s[1]
s=this.k2
t=w.u(t)
a.c[this.fy].sk(y+s*t)
this.Q.a.b-=3}},
hI:{"^":"K;ch,cx,cy,db,dx,dy,fr,fx,fy,go,id,k1,k2,k3,k4,r1,r2,rx,ry,x1,x2,y1,y2,a4,N,V,R,W,T,Z,a,b,c,d,e,f,r,x,y,z,Q",
ac:function(a){G.r(this.f.d,this.ch,a)},
ad:function(a){G.r(this.r.d,this.cx,a)},
ai:function(a2){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1
z=this.f
this.k4=z.c
this.r1=this.r.c
y=this.r2
y.h(z.f.a)
z=this.rx
z.h(this.r.f.a)
x=this.f
this.ry=x.fx
w=this.r
this.x1=w.fx
this.x2=x.go
this.y1=w.go
v=a2.b[this.k4].gt()
u=a2.b[this.k4].gl()
t=a2.c[this.k4].gv()
s=a2.c[this.k4].gk()
r=a2.b[this.r1].gt()
q=a2.b[this.r1].gl()
p=a2.c[this.r1].gv()
o=a2.c[this.r1].gk()
w=this.Q
x=w.f
n=x.a
m=x.b
l=m+1
x.b=l
m=n[m]
x.b=l+1
l=n[l]
w=w.a
n=w.a
x=w.b
k=x+1
w.b=k
x=n[x]
j=k+1
w.b=j
k=n[k]
i=j+1
w.b=i
j=n[j]
w.b=i+1
i=n[i]
m.G(u)
l.G(q)
x.h(this.ch)
x.j(y)
G.j(m,x,j)
x.h(this.cx)
x.j(z)
G.j(l,x,i)
x.h(r)
x.j(v)
x.q(0,i)
x.j(j)
h=this.ry
g=this.x1
f=this.x2
e=this.y1
l=this.y2
G.j(m,this.cy,l)
k.h(x)
k.q(0,j)
this.R=k.u(l)
z=i.u(l)
this.W=z
y=h+g
n=this.R
z=y+f*n*n+e*z*z
this.Z=z
if(z>0)this.Z=1/z
z=this.a4
G.j(m,this.db,z)
k.h(x)
k.q(0,j)
this.N=k.u(z)
i=i.u(z)
this.V=i
j=this.N
x=f*j
m=e*i
d=x+m
w=this.R
n=this.W
c=x*w+m*n
b=f+e
if(b===0)b=1
a=f*w
a0=e*n
a1=a+a0
this.T.aY(y+x*j+m*i,d,c,d,b,a1,c,a1,y+a*w+a0*n)
this.k3=C.m
y=this.dy
x=y.a
x[2]=0
this.fr=0
w=a2.a
if(w.f){y.E(0,w.c)
this.fr=this.fr*a2.a.c
y=this.Q.a
y=y.a[y.b++]
k.h(l)
k.E(0,this.fr+x[2])
y.h(z)
y.E(0,x[0])
y.q(0,k)
k=x[0]
z=this.N
l=x[1]
x=this.fr+x[2]
w=this.R
n=this.V
m=this.W
j=t.a
i=j[0]
y=y.a
j[0]=i-h*y[0]
j[1]=j[1]-h*y[1]
s-=f*(k*z+l+x*w)
w=p.a
w[0]=w[0]+g*y[0]
w[1]=w[1]+g*y[1]
o+=e*(k*n+l+x*m);--this.Q.a.b}else{y.I()
this.fr=0}a2.c[this.k4].sk(s)
a2.c[this.r1].sk(o)
z=this.Q
z.f.b-=2
z.a.b-=4},
ag:function(a){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l
z=a.c[this.k4].gv()
y=a.c[this.k4].gk()
x=a.c[this.r1].gv()
w=a.c[this.r1].gk()
v=this.ry
u=this.x1
t=this.x2
s=this.y1
r=this.Q.a
q=r.a
p=q[r.b++]
r=q[r.b++]
p.h(x)
p.j(z)
q=this.a4
p=q.A(p)
o=this.V
n=this.N
m=r.a
m[0]=p+o*w-n*y
m[1]=w-y
p=this.Q.a
p=p.a[p.b++]
r.J()
E.c5(this.T,p,r)
r.J()
r=this.dy.a
o=r[0]
p=p.a
r[0]=o+p[0]
r[1]=r[1]+p[1]
r=this.Q.a
r=r.a[r.b++]
r.h(q)
r.E(0,p[0])
q=p[0]
o=this.N
p=p[1]
n=this.V
m=z.a
l=m[0]
r=r.a
m[0]=l-v*r[0]
m[1]=m[1]-v*r[1]
y-=t*(q*o+p)
o=x.a
o[0]=o[0]+u*r[0]
o[1]=o[1]+u*r[1]
w+=s*(q*n+p)
this.Q.a.b-=2
a.c[this.k4].sk(y)
a.c[this.r1].sk(w)
this.Q.a.b-=2},
af:function(a2){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1
z=this.Q
y=z.f
x=y.a
w=y.b
v=w+1
y.b=v
w=x[w]
y.b=v+1
v=x[v]
x=z.a
y=x.a
u=x.b
t=u+1
x.b=t
u=y[u]
s=t+1
x.b=s
t=y[t]
r=s+1
x.b=r
s=y[s]
q=r+1
x.b=q
r=y[r]
p=q+1
x.b=p
q=y[q]
o=p+1
x.b=o
p=y[p]
x.b=o+1
o=y[o]
z=z.b
z=z.a[z.b++]
n=a2.b[this.k4].gt()
m=a2.b[this.k4].gl()
l=a2.b[this.r1].gt()
k=a2.b[this.r1].gl()
w.G(m)
v.G(k)
j=this.ry
i=this.x1
h=this.x2
g=this.y1
p.h(this.ch)
p.j(this.r2)
G.j(w,p,u)
p.h(this.cx)
p.j(this.rx)
G.j(v,p,t)
s.h(l)
s.q(0,t)
s.j(n)
s.j(u)
G.j(w,this.cy,r)
p.h(s)
p.q(0,u)
f=p.u(r)
e=t.u(r)
G.j(w,this.db,q)
p.h(s)
p.q(0,u)
d=p.u(q)
c=t.u(q)
s=q.A(s)
t=o.a
t[0]=s
t[1]=C.a.H(k-m,this.dx)
s=t[0]
t=t[1]
y=g*c
x=h*d
b=h+g
a=x+y
if(b===0)b=1
w=this.Q.c
w=w.a[w.b++]
w.ba(j+i+x*d+y*c,a,a,b)
o.J()
E.dq(w,p,o)
o.J()
p=p.a
o=p[0]
w=z.a
w[0]=o
w[1]=p[1]
w[2]=0;--this.Q.c.b
z=z.a
y=z[0]
q=q.a
x=q[0]
w=z[2]
r=r.a
a0=y*x+w*r[0]
a1=y*q[1]+w*r[1]
z=z[1]
r=n.a
r[0]=r[0]-j*a0
r[1]=r[1]-j*a1
r=l.a
r[0]=r[0]+i*a0
r[1]=r[1]+i*a1
a2.b[this.k4].sl(m-h*(y*d+z+w*f))
a2.b[this.r1].sl(k+g*(y*c+z+w*e))
w=this.Q
w.a.b-=7;--w.b.b
w.f.b-=2
return Math.abs(s)<=0.005&&Math.abs(t)<=0.03490658503988659}},
dD:{"^":"K;ch,cx,cy,db,dx,dy,fr,fx,fy,go,id,k1,k2,k3,k4,r1,r2,rx,ry,x1,x2,y1,a,b,c,d,e,f,r,x,y,z,Q",
ac:function(a){G.r(this.f.d,this.dx,a)},
ad:function(a){G.r(this.r.d,this.dy,a)},
ai:function(a){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h
z=this.f
this.go=z.c
this.id=this.r.c
y=this.r1
y.h(z.f.a)
z=this.r2
z.h(this.r.f.a)
x=this.f
this.rx=x.fx
w=this.r
this.ry=w.fx
this.x1=x.go
this.x2=w.go
v=a.b[this.go].gt()
u=a.b[this.go].gl()
t=a.c[this.go].gv()
s=a.c[this.go].gk()
r=a.b[this.id].gt()
q=a.b[this.id].gl()
p=a.c[this.id].gv()
o=a.c[this.id].gk()
w=this.Q
x=w.f
n=x.a
m=x.b
l=m+1
x.b=l
m=n[m]
x.b=l+1
l=n[l]
w=w.a
w=w.a[w.b++]
m.G(u)
l.G(q)
w.h(this.dx)
w.j(y)
y=this.k3
G.j(m,w,y)
w.h(this.dy)
w.j(z)
z=this.k4
G.j(l,w,z)
w=this.k1
w.h(v)
w.q(0,y)
w.j(this.ch)
l=this.k2
l.h(r)
l.q(0,z)
l.j(this.cx)
m=Math.sqrt(w.gS())
n=Math.sqrt(l.gS())
if(m>0.05)w.E(0,1/m)
else w.I()
if(n>0.05)l.E(0,1/n)
else l.I()
k=y.u(w)
j=z.u(l)
x=this.rx
n=this.x1
m=this.ry
i=this.x2
h=this.fx
i=x+n*k*k+h*h*(m+i*j*j)
this.y1=i
if(i>0)this.y1=1/i
x=a.a
if(x.f){this.fy=this.fy*x.c
x=this.Q.a
n=x.a
m=x.b
i=m+1
x.b=i
m=n[m]
x.b=i+1
i=n[i]
m.h(w)
m.E(0,-this.fy)
i.h(l)
i.E(0,-this.fx*this.fy)
l=t.a
w=l[0]
n=this.rx
x=m.a
l[0]=w+n*x[0]
l[1]=l[1]+n*x[1]
s+=this.x1*y.u(m)
m=p.a
y=m[0]
x=this.ry
n=i.a
m[0]=y+x*n[0]
m[1]=m[1]+x*n[1]
o+=this.x2*z.u(i)
this.Q.a.b-=2}else this.fy=0
a.c[this.go].sk(s)
a.c[this.id].sk(o)
z=this.Q;--z.a.b
z.f.b-=2},
ag:function(a){var z,y,x,w,v,u,t,s,r,q,p,o,n,m
z=a.c[this.go].gv()
y=a.c[this.go].gk()
x=a.c[this.id].gv()
w=a.c[this.id].gk()
v=this.Q.a
u=v.a
t=v.b
s=t+1
v.b=s
t=u[t]
r=s+1
v.b=r
s=u[s]
q=r+1
v.b=q
r=u[r]
v.b=q+1
q=u[q]
u=this.k3
u.O(y,t)
t.q(0,z)
v=this.k4
v.O(w,s)
s.q(0,x)
p=this.k1
t=p.A(t)
o=this.fx
n=this.k2
s=n.A(s)
m=-this.y1*(-t-o*s)
this.fy+=m
r.h(p)
r.E(0,-m)
q.h(n)
q.E(0,-this.fx*m)
n=z.a
p=n[0]
s=this.rx
o=r.a
n[0]=p+s*o[0]
n[1]=n[1]+s*o[1]
o=this.x1
r=u.u(r)
u=x.a
s=u[0]
n=this.ry
p=q.a
u[0]=s+n*p[0]
u[1]=u[1]+n*p[1]
p=this.x2
q=v.u(q)
a.c[this.go].sk(y+o*r)
a.c[this.id].sk(w+p*q)
this.Q.a.b-=4},
af:function(a){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e
z=this.Q
y=z.f
x=y.a
w=y.b
v=w+1
y.b=v
w=x[w]
y.b=v+1
v=x[v]
z=z.a
x=z.a
y=z.b
u=y+1
z.b=u
y=x[y]
t=u+1
z.b=t
u=x[u]
s=t+1
z.b=s
t=x[t]
r=s+1
z.b=r
s=x[s]
q=r+1
z.b=q
r=x[r]
p=q+1
z.b=p
q=x[q]
z.b=p+1
p=x[p]
o=a.b[this.go].gt()
n=a.b[this.go].gl()
m=a.b[this.id].gt()
l=a.b[this.id].gl()
w.G(n)
v.G(l)
r.h(this.dx)
r.j(this.r1)
G.j(w,r,y)
r.h(this.dy)
r.j(this.r2)
G.j(v,r,u)
t.h(o)
t.q(0,y)
t.j(this.ch)
s.h(m)
s.q(0,u)
s.j(this.cx)
r=Math.sqrt(t.gS())
v=Math.sqrt(s.gS())
if(r>0.05)t.E(0,1/r)
else t.I()
if(v>0.05)s.E(0,1/v)
else s.I()
k=y.u(t)
j=u.u(s)
z=this.rx
x=this.x1
w=this.ry
i=this.x2
h=this.fx
g=z+x*k*k+h*h*(w+i*j*j)
if(g>0)g=1/g
f=this.fr-r-h*v
e=-g*f
q.h(t)
q.E(0,-e)
p.h(s)
p.E(0,-this.fx*e)
z=o.a
x=z[0]
w=this.rx
v=q.a
z[0]=x+w*v[0]
z[1]=z[1]+w*v[1]
v=this.x1
q=y.u(q)
y=m.a
w=y[0]
z=this.ry
x=p.a
y[0]=w+z*x[0]
y[1]=y[1]+z*x[1]
x=this.x2
p=u.u(p)
a.b[this.go].sl(n+v*q)
a.b[this.id].sl(l+x*p)
p=this.Q
p.f.b-=2
p.a.b-=7
return Math.abs(f)<0.005}},
hN:{"^":"K;ch,cx,cy,db,dx,dy,fr,fx,fy,go,id,k1,k2,k3,k4,r1,r2,rx,ry,x1,x2,y1,y2,a4,a,b,c,d,e,f,r,x,y,z,Q",
ai:function(a){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f
z=this.f
this.k1=z.c
this.k2=this.r.c
y=this.r1
y.h(z.f.a)
z=this.r2
z.h(this.r.f.a)
x=this.f
this.rx=x.fx
w=this.r
this.ry=w.fx
this.x1=x.go
this.x2=w.go
v=a.b[this.k1].gl()
u=a.c[this.k1].gv()
t=a.c[this.k1].gk()
s=a.b[this.k2].gl()
r=a.c[this.k2].gv()
q=a.c[this.k2].gk()
w=this.Q
x=w.f
p=x.a
o=x.b
n=o+1
x.b=n
o=p[o]
x.b=n+1
n=p[n]
w=w.a
w=w.a[w.b++]
o.G(v)
n.G(s)
w.h(this.ch)
w.j(y)
y=this.k3
G.j(o,w,y)
w.h(this.cx)
w.j(z)
z=this.k4
G.j(n,w,z)
m=this.rx
l=this.ry
k=this.x1
j=this.x2
w=k+j
n=m+l
o=y.a
p=o[1]
x=z.a
i=x[1]
h=-p
o=o[0]
x=x[0]
g=this.y1
f=g.a
g.aY(n+p*p*k+i*i*j,f[3],f[6],h*o*k-i*x*j,n+o*o*k+x*x*j,f[7],h*k-i*j,o*k+x*j,w)
this.y2=w
if(w>0)this.y2=1/w
this.db=0
this.a4=C.m
x=a.a
w=this.cy
if(x.f){p=this.Q.a
p=p.a[p.b++]
w=w.a
o=w[0]
x=x.c
w[0]=o*x
w[1]=w[1]*x
this.db*=x
x=w[0]
o=p.a
o[0]=x
o[1]=w[1]
x=u.a
x[0]=x[0]-m*o[0]
x[1]=x[1]-m*o[1]
t-=k*(y.u(p)+this.db+w[2])
y=r.a
y[0]=y[0]+l*o[0]
y[1]=y[1]+l*o[1]
q+=j*(z.u(p)+this.db+w[2]);--this.Q.a.b}else{w.I()
this.db=0}a.c[this.k1].sk(t)
a.c[this.k2].sk(q)
z=this.Q;--z.a.b
z.f.b-=2},
ag:function(a){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l
z=a.c[this.k1].gv()
y=a.c[this.k1].gk()
x=a.c[this.k2].gv()
w=a.c[this.k2].gk()
v=this.rx
u=this.ry
t=this.x1
s=this.x2
r=this.Q.a
q=r.a
p=r.b
o=p+1
r.b=o
p=q[p]
n=this.k4
m=this.k3
l=o+1
r.b=l
o=q[o]
r.b=l+1
r=q[l]
m.O(y,p)
n.O(w,o)
o.q(0,x)
o.j(z)
o.j(p)
o.J()
E.c5(this.y1,r,o)
o=this.cy.a
p=o[0]
q=r.a
o[0]=p+q[0]
o[1]=o[1]+q[1]
o=z.a
o[0]=o[0]-v*q[0]
o[1]=o[1]-v*q[1]
y-=t*m.u(r)
m=x.a
m[0]=m[0]+u*q[0]
m[1]=m[1]+u*q[1]
w+=s*n.u(r)
this.Q.a.b-=2
a.c[this.k1].sk(y)
a.c[this.k2].sk(w);--this.Q.a.b},
af:function(a){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f
z=this.Q.f
y=z.a
x=z.b
w=x+1
z.b=w
x=y[x]
z.b=w+1
w=y[w]
v=a.b[this.k1].gt()
u=a.b[this.k1].gl()
t=a.b[this.k2].gt()
s=a.b[this.k2].gl()
x.G(u)
w.G(s)
x.G(u)
w.G(s)
z=this.Q.a
y=z.a
r=z.b
q=r+1
z.b=q
r=y[r]
p=q+1
z.b=p
q=y[q]
o=p+1
z.b=o
p=y[p]
z.b=o+1
o=y[o]
p.h(this.ch)
p.j(this.r1)
G.j(x,p,r)
p.h(this.cx)
p.j(this.r2)
G.j(w,p,q)
p.h(t)
p.q(0,q)
p.j(v)
p.j(r)
w=Math.sqrt(p.gS())
n=this.rx
m=this.ry
l=this.x1
k=this.x2
x=this.Q.c
x=x.a[x.b++]
y=n+m
z=r.a
j=z[1]
i=q.a
h=i[1]
z=z[0]
i=i[0]
g=k*i
f=-l*z*j-g*h
x.ba(y+l*j*j+k*h*h,f,f,y+l*z*z+g*i)
E.dq(x,o,p)
o.J()
p=v.a
x=p[0]
i=o.a
p[0]=x-n*i[0]
p[1]=p[1]-n*i[1]
r=r.u(o)
p=t.a
p[0]=p[0]+m*i[0]
p[1]=p[1]+m*i[1]
o=q.u(o)
q=this.Q
q.a.b-=4;--q.c.b
a.b[this.k1].sl(u-l*r)
a.b[this.k2].sl(s+k*o)
this.Q.f.b-=2
return w<=0.005&&!0},
ac:function(a){G.r(this.f.d,this.ch,a)},
ad:function(a){G.r(this.r.d,this.cx,a)}},
hO:{"^":"K;ch,cx,cy,db,dx,dy,fr,fx,fy,go,id,k1,k2,k3,k4,r1,r2,rx,a,b,c,d,e,f,r,x,y,z,Q",
ai:function(a){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f
z=this.f
this.dy=z.c
this.fr=this.r.c
y=this.id
y.h(z.f.a)
z=this.k1
z.h(this.r.f.a)
x=this.f
this.k2=x.fx
w=this.r
this.k3=w.fx
this.k4=x.go
this.r1=w.go
v=a.b[this.dy].gt()
u=a.b[this.dy].gl()
t=a.c[this.dy].gv()
s=a.c[this.dy].gk()
r=a.b[this.fr].gt()
q=a.b[this.fr].gl()
p=a.c[this.fr].gv()
o=a.c[this.fr].gk()
w=this.Q
x=w.f
n=x.a
m=x.b
l=m+1
x.b=l
m=n[m]
x.b=l+1
l=n[l]
w=w.a
w=w.a[w.b++]
m.G(u)
l.G(q)
w.h(this.ch)
w.j(y)
y=this.fy
G.j(m,w,y)
w.h(this.cx)
w.j(z)
z=this.go
G.j(l,w,z)
w=this.fx
w.h(r)
w.q(0,z)
w.j(v)
w.j(y)
l=Math.sqrt(w.gS())
this.db=l
if(l-this.cy>0)this.rx=C.a8
else this.rx=C.m
if(l>0.005)w.E(0,1/l)
else{w.I()
this.r2=0
this.dx=0
z=this.Q
z.f.b-=2;--z.a.b
return}k=y.u(w)
j=z.u(w)
x=this.k2
n=this.k4
m=this.k3
l=this.r1
i=x+n*k*k+m+l*j*j
this.r2=i!==0?1/i:0
h=a.a
if(h.f){h=this.dx*h.c
this.dx=h
w=w.a
g=h*w[0]
f=h*w[1]
w=t.a
w[0]=w[0]-x*g
w[1]=w[1]-x*f
y=y.a
s-=n*(y[0]*f-y[1]*g)
y=p.a
y[0]=y[0]+m*g
y[1]=y[1]+m*f
z=z.a
o+=l*(z[0]*f-z[1]*g)}else this.dx=0
z=this.Q
z.f.b-=2;--z.a.b
a.c[this.dy].sk(s)
a.c[this.fr].sk(o)},
ag:function(a){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j
z=a.c[this.dy].gv()
y=a.c[this.dy].gk()
x=a.c[this.fr].gv()
w=a.c[this.fr].gk()
v=this.Q.a
u=v.a
t=v.b
s=t+1
v.b=s
t=u[t]
r=s+1
v.b=r
s=u[s]
v.b=r+1
r=u[r]
u=this.fy
u.O(y,t)
t.q(0,z)
v=this.go
v.O(w,s)
s.q(0,x)
q=this.db-this.cy
p=this.fx
r.h(s)
r.j(t)
o=p.A(r)
if(q<0)o+=a.a.b*q
t=this.r2
n=this.dx
t=Math.min(0,n+-t*o)
this.dx=t
m=t-n
p=p.a
l=m*p[0]
k=m*p[1]
p=z.a
t=p[0]
s=this.k2
p[0]=t-s*l
p[1]=p[1]-s*k
s=this.k4
u=u.a
p=u[0]
u=u[1]
t=x.a
r=t[0]
j=this.k3
t[0]=r+j*l
t[1]=t[1]+j*k
j=this.r1
v=v.a
t=v[0]
v=v[1]
this.Q.a.b-=3
a.c[this.dy].sk(y-s*(p*k-u*l))
a.c[this.fr].sk(w+j*(t*k-v*l))},
af:function(a){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k
z=a.b[this.dy].gt()
y=a.b[this.dy].gl()
x=a.b[this.fr].gt()
w=a.b[this.fr].gl()
v=this.Q
u=v.f
t=u.a
s=u.b
r=s+1
u.b=r
s=t[s]
u.b=r+1
r=t[r]
v=v.a
t=v.a
u=v.b
q=u+1
v.b=q
u=t[u]
p=q+1
v.b=p
q=t[q]
o=p+1
v.b=o
p=t[p]
v.b=o+1
o=t[o]
s.G(y)
r.G(w)
o.h(this.ch)
o.j(this.id)
G.j(s,o,q)
o.h(this.cx)
o.j(this.k1)
G.j(r,o,p)
u.h(x)
u.q(0,p)
u.j(z)
u.j(q)
n=u.Y()
o=Math.max(0,Math.min(n-this.cy,0.2))
m=-this.r2*o
u=u.a
l=m*u[0]
k=m*u[1]
u=z.a
o=u[0]
r=this.k2
u[0]=o-r*l
u[1]=u[1]-r*k
r=this.k4
q=q.a
u=q[0]
q=q[1]
o=x.a
s=o[0]
t=this.k3
o[0]=s+t*l
o[1]=o[1]+t*k
t=this.r1
p=p.a
o=p[0]
p=p[1]
s=this.Q
s.f.b-=2
s.a.b-=4
a.b[this.dy].sl(y-r*(u*k-q*l))
a.b[this.fr].sl(w+t*(o*k-p*l))
return n-this.cy<0.005},
ac:function(a){G.r(this.f.d,this.ch,a)},
ad:function(a){G.r(this.r.d,this.cx,a)}},
ih:{"^":"K;ch,cx,cy,db,dx,dy,fr,fx,fy,go,id,k1,k2,k3,k4,r1,r2,rx,ry,a,b,c,d,e,f,r,x,y,z,Q",
ac:function(a){G.r(this.f.d,this.db,a)},
ad:function(a){G.r(this.r.d,this.dx,a)},
ai:function(a5){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2,a3,a4
z=this.f
this.fy=z.c
this.go=this.r.c
y=this.k2
y.h(z.f.a)
z=this.k3
z.h(this.r.f.a)
x=this.f
this.k4=x.fx
w=this.r
this.r1=w.fx
this.r2=x.go
this.rx=w.go
v=a5.b[this.fy].gl()
u=a5.c[this.fy].gv()
t=a5.c[this.fy].gk()
s=a5.b[this.go].gl()
r=a5.c[this.go].gv()
q=a5.c[this.go].gk()
w=this.Q
x=w.f
p=x.a
o=x.b
n=o+1
x.b=n
o=p[o]
x.b=n+1
n=p[n]
w=w.a
w=w.a[w.b++]
o.G(v)
n.G(s)
w.h(this.db)
w.j(y)
y=this.id
G.j(o,w,y)
w.h(this.dx)
w.j(z)
z=this.k1
G.j(n,w,z)
m=this.k4
l=this.r1
k=this.r2
j=this.rx
w=this.Q.d
w=w.a[w.b++]
n=m+l
o=y.a
p=o[1]
x=z.a
i=x[1]
h=-p
o=o[0]
x=x[0]
g=w.a
f=k+j
w.aY(n+p*p*k+i*i*j,g[3],g[6],h*o*k-i*x*j,n+o*o*k+x*x*j,g[7],h*k-i*j,o*k+x*j,f)
x=this.ry
if(this.ch>0){w=g[0]
p=g[3]
o=g[1]
g=g[4]
e=w*g-p*o
if(e!==0)e=1/e
n=-e
x.aY(e*g,n*o,0,n*p,e*w,0,0,0,0)
d=f>0?1/f:0
w=this.dy
c=6.283185307179586*this.ch
p=this.cx
b=d*c*c
a=a5.a.a
p=a*(2*d*p*c+a*b)
this.fr=p
p=p!==0?1/p:0
this.fr=p
this.cy=(s-v-w)*a*b*p
a0=f+p
w=a0!==0?1/a0:0
x.a[8]=w}else{w=g[4]
p=g[8]
o=w*p
n=g[5]
i=g[7]
h=g[6]
a1=g[3]
a2=a1*p
a3=a1*i
a4=g[0]
e=a4*(o-n*i)+g[1]*(n*h-a2)+g[2]*(a3-w*h)
if(e!==0)e=1/e
n=x.a
x.aY(e*(o-i*i),e*(h*i-a2),e*(a3-h*w),n[1],e*(a4*p-h*h),e*(h*a1-a4*i),n[2],n[5],e*(a4*w-a1*a1))
this.fr=0
this.cy=0}x=a5.a
w=this.fx
if(x.f){p=this.Q.a
p=p.a[p.b++]
w.E(0,x.c)
w=w.a
x=w[0]
o=w[1]
n=p.a
n[0]=x
n[1]=o
o=u.a
o[0]=o[0]-m*n[0]
o[1]=o[1]-m*n[1]
t-=k*(y.u(p)+w[2])
y=r.a
y[0]=y[0]+l*n[0]
y[1]=y[1]+l*n[1]
q+=j*(z.u(p)+w[2]);--this.Q.a.b}else w.I()
a5.c[this.fy].sk(t)
a5.c[this.go].sk(q)
z=this.Q;--z.a.b
z.f.b-=2;--z.d.b},
ag:function(a){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b
z=a.c[this.fy].gv()
y=a.c[this.fy].gk()
x=a.c[this.go].gv()
w=a.c[this.go].gk()
v=this.k4
u=this.r1
t=this.r2
s=this.rx
r=this.Q.a
q=r.a
p=r.b
o=p+1
r.b=o
p=q[p]
n=o+1
r.b=n
o=q[o]
r.b=n+1
n=q[n]
m=w-y
r=this.id
q=z.a
l=this.k1
k=this.fx
j=x.a
i=this.ry.a
if(this.ch>0){h=i[8]
g=this.cy
f=this.fr
k=k.a
e=k[2]
d=-h*(m+g+f*e)
k[2]=e+d
y-=t*d
w+=s*d
l.O(w,p)
r.O(y,n)
p.q(0,x)
p.j(z)
p.j(n)
n=i[1]
p=p.a
e=p[0]
f=i[4]
g=p[1]
m=o.a
m[1]=n*e+f*g
m[0]=i[0]*p[0]+i[3]*p[1]
o.J()
k[0]=k[0]+m[0]
k[1]=k[1]+m[1]
q[0]=q[0]-v*m[0]
q[1]=q[1]-v*m[1]
y-=t*r.u(o)
j[0]=j[0]+u*m[0]
j[1]=j[1]+u*m[1]
w+=s*l.u(o)}else{r.O(y,n)
l.O(w,p)
p.q(0,x)
p.j(z)
p.j(n)
n=this.Q.b
n=n.a[n.b++]
p=p.a
n.cu(p[0],p[1],m)
m=this.Q.b
m=m.a[m.b++]
n=n.a
p=n[0]
h=i[0]
g=n[1]
f=i[3]
e=n[2]
c=i[6]
b=m.a
b[0]=p*h+g*f+e*c
b[1]=n[0]*i[1]+n[1]*i[4]+n[2]*i[7]
b[2]=n[0]*i[2]+n[1]*i[5]+n[2]*i[8]
m.J()
k.q(0,m)
m=b[0]
k=b[1]
i=o.a
i[0]=m
i[1]=k
q[0]=q[0]-v*i[0]
q[1]=q[1]-v*i[1]
y-=t*(r.u(o)+b[2])
j[0]=j[0]+u*i[0]
j[1]=j[1]+u*i[1]
w+=s*(l.u(o)+b[2])
this.Q.b.b-=2}a.c[this.fy].sk(y)
a.c[this.go].sk(w)
this.Q.a.b-=3},
af:function(a){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d
z=a.b[this.fy].gt()
y=a.b[this.fy].gl()
x=a.b[this.go].gt()
w=a.b[this.go].gl()
v=this.Q
u=v.f
t=u.a
s=u.b
r=s+1
u.b=r
s=t[s]
u.b=r+1
r=t[r]
v=v.a
t=v.a
u=v.b
q=u+1
v.b=q
u=t[u]
p=q+1
v.b=p
q=t[q]
v.b=p+1
p=t[p]
s.G(y)
r.G(w)
o=this.k4
n=this.r1
m=this.r2
l=this.rx
u.h(this.db)
u.j(this.k2)
G.j(s,u,q)
u.h(this.dx)
u.j(this.k3)
G.j(r,u,p)
u=this.Q
r=u.d
r=r.a[r.b++]
u=u.a
s=u.a
t=u.b
v=t+1
u.b=v
t=s[t]
u.b=v+1
v=s[v]
s=o+n
u=q.a
k=u[1]
j=p.a
i=j[1]
h=-k
u=u[0]
j=j[0]
g=r.a
r.aY(s+k*k*m+i*i*l,g[3],g[6],h*u*m-i*j*l,s+u*u*m+j*j*l,g[7],h*m-i*l,u*m+j*l,m+l)
u=z.a
s=x.a
if(this.ch>0){t.h(x)
t.q(0,p)
t.j(z)
t.j(q)
f=Math.sqrt(t.gS())
E.c5(r,v,t)
v.J()
t=u[0]
r=v.a
u[0]=t-o*r[0]
u[1]=u[1]-o*r[1]
y-=m*q.u(v)
s[0]=s[0]+n*r[0]
s[1]=s[1]+n*r[1]
w+=l*p.u(v)
e=0}else{t.h(x)
t.q(0,p)
t.j(z)
t.j(q)
d=w-y-this.dy
f=Math.sqrt(t.gS())
e=Math.abs(d)
k=this.Q.b
j=k.a
i=k.b
h=i+1
k.b=h
i=j[i]
k.b=h+1
h=j[h]
t=t.a
i.cu(t[0],t[1],d)
E.hb(r,h,i)
h.J()
h=h.a
i=h[0]
r=h[1]
t=v.a
t[0]=i
t[1]=r
u[0]=u[0]-o*t[0]
u[1]=u[1]-o*t[1]
y-=m*(q.u(v)+h[2])
s[0]=s[0]+n*t[0]
s[1]=s[1]+n*t[1]
w+=l*(p.u(v)+h[2])
this.Q.b.b-=2}a.b[this.fy].sl(y)
a.b[this.go].sl(w)
v=this.Q
v.a.b-=5
v.f.b-=2;--v.d.b
return f<=0.005&&e<=0.03490658503988659}},
ii:{"^":"K;ch,cx,cy,db,dx,dy,fr,fx,fy,go,id,k1,k2,k3,k4,r1,r2,rx,ry,x1,x2,y1,y2,a4,N,V,R,W,T,Z,a1,a8,a9,aq,a,b,c,d,e,f,r,x,y,z,Q",
ac:function(a){G.r(this.f.d,this.cy,a)},
ad:function(a){G.r(this.r.d,this.db,a)},
ai:function(a0){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a
z=this.f
this.k2=z.c
this.k3=this.r.c
y=this.k4
y.h(z.f.a)
z=this.r1
z.h(this.r.f.a)
x=this.f
w=x.fx
this.r2=w
v=this.r
u=v.fx
this.rx=u
x=x.go
this.ry=x
v=v.go
this.x1=v
t=a0.b[this.k2].gt()
s=a0.b[this.k2].gl()
r=a0.c[this.k2].gv()
q=a0.c[this.k2].gk()
p=a0.b[this.k3].gt()
o=a0.b[this.k3].gl()
n=a0.c[this.k3].gv()
m=a0.c[this.k3].gk()
l=this.Q
k=l.f
j=k.a
i=k.b
h=i+1
k.b=h
i=j[i]
k.b=h+1
h=j[h]
l=l.a
l=l.a[l.b++]
i.G(s)
h.G(o)
l.h(this.cy)
l.j(y)
y=this.a8
G.j(i,l,y)
l.h(this.db)
l.j(z)
z=this.a9
G.j(h,l,z)
h=this.aq
h.h(p)
h.q(0,z)
h.j(t)
h.j(y)
j=this.y1
G.av(i,this.dy,j)
l.h(h)
l.q(0,y)
this.N=l.u(j)
k=z.u(j)
this.V=k
u=w+u
w=this.N
k=u+x*w*w+v*k*k
this.R=k
if(k>0)this.R=1/k
this.T=0
this.Z=0
this.a1=0
if(this.ch>0){w=this.x2
G.av(i,this.dx,w)
l.h(h)
l.q(0,y)
this.y2=l.u(w)
z=z.u(w)
this.a4=z
l=this.y2
g=u+x*l*l+v*z*z
if(g>0){this.T=1/g
f=h.A(w)
e=6.283185307179586*this.ch
z=this.T
y=this.cx
d=z*e*e
c=a0.a.a
y=c*(2*z*y*e+c*d)
this.a1=y
if(y>0){z=1/y
this.a1=z}else z=y
this.Z=f*c*d*z
z=g+z
this.T=z
if(z>0)this.T=1/z}}else this.fy=0
this.W=0
this.fx=0
z=a0.a
if(z.f){y=this.Q.a
x=y.b
w=x+1
y.b=w
x=y.a[x]
v=this.fr
z=z.c
v*=z
this.fr=v
u=this.fy*=z
z=0*z
this.fx=z
j=j.a
l=j[0]
k=this.x2.a
i=k[0]
x=x.a
x[0]=v*l+u*i
x[1]=v*j[1]+u*k[1]
k=this.N
j=this.y2
i=this.V
l=this.a4
h=r.a
b=h[0]
a=this.r2
h[0]=b-a*x[0]
h[1]=h[1]-a*x[1]
q-=this.ry*(v*k+u*j+z)
j=n.a
k=j[0]
a=this.rx
j[0]=k+a*x[0]
j[1]=j[1]+a*x[1]
m+=this.x1*(v*i+u*l+z)
y.b=w-1}else{this.fr=0
this.fy=0}z=this.Q
z.f.b-=2;--z.a.b
a0.c[this.k2].sk(q)
a0.c[this.k3].sk(m)},
ag:function(a){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f
z=this.r2
y=this.rx
x=this.ry
w=this.x1
v=a.c[this.k2].gv()
u=a.c[this.k2].gk()
t=a.c[this.k3].gv()
s=a.c[this.k3].gk()
r=this.Q.a
q=r.a
p=r.b
o=p+1
r.b=o
p=q[p]
r.b=o+1
o=q[o]
q=this.x2
p.h(t)
p.j(v)
r=q.A(p)
n=this.a4
m=this.y2
l=this.T
k=this.Z
j=this.a1
i=this.fy
h=-l*(r+n*s-m*u+k+j*i)
this.fy=i+h
q=q.a
i=q[0]
o=o.a
o[0]=h*i
o[1]=h*q[1]
q=v.a
q[0]=q[0]-z*o[0]
q[1]=q[1]-z*o[1]
u-=x*(h*m)
m=t.a
m[0]=m[0]+y*o[0]
m[1]=m[1]+y*o[1]
s+=w*(h*n)
n=this.id
i=this.W
g=this.fx
f=a.a.a*this.go
n=Math.max(-f,Math.min(g+-i*(s-u-n),f))
this.fx=n
h=n-g
u-=x*h
s+=w*h
n=this.y1
p.h(t)
p.j(v)
p=n.A(p)
i=this.V
j=this.N
h=-this.R*(p+i*s-j*u)
this.fr+=h
n=n.a
o[0]=h*n[0]
o[1]=h*n[1]
q[0]=q[0]-z*o[0]
q[1]=q[1]-z*o[1]
m[0]=m[0]+y*o[0]
m[1]=m[1]+y*o[1]
this.Q.a.b-=2
a.c[this.k2].sk(u-x*(h*j))
a.c[this.k3].sk(s+w*(h*i))},
af:function(a){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h
z=a.b[this.k2].gt()
y=a.b[this.k2].gl()
x=a.b[this.k3].gt()
w=a.b[this.k3].gl()
v=this.Q
u=v.f
t=u.a
s=u.b
r=s+1
u.b=r
s=t[s]
u.b=r+1
r=t[r]
v=v.a
v=v.a[v.b++]
s.G(y)
r.G(w)
v.h(this.cy)
v.j(this.k4)
t=this.a8
G.av(s,v,t)
v.h(this.db)
v.j(this.r1)
u=this.a9
G.av(r,v,u)
r=this.aq
r.h(x)
r.j(z)
r.q(0,u)
r.j(t)
q=this.Q.a
q=q.a[q.b++]
G.av(s,this.dy,q)
v.h(r)
v.q(0,t)
p=v.u(q)
o=u.u(q)
n=r.A(q)
r=this.r2
u=this.rx
v=this.ry
t=this.N
s=this.x1
m=this.V
l=r+u+v*t*t+s*m*m
k=l!==0?-n/l:0
t=this.Q
m=t.a
j=m.b
i=j+1
m.b=i
j=m.a[j]
q=q.a
h=q[0]
j=j.a
j[0]=k*h
j[1]=k*q[1]
q=z.a
q[0]=q[0]-r*j[0]
q[1]=q[1]-r*j[1]
r=x.a
r[0]=r[0]+u*j[0]
r[1]=r[1]+u*j[1]
m.b=i-3
t.f.b-=2
a.b[this.k2].sl(y-v*(k*p))
a.b[this.k3].sl(w+s*(k*o))
return Math.abs(n)<=0.005}},
a5:{"^":"c;a,b,c,d,e",
au:function(a){this.a=this.a*0.95+a*0.05
this.b=this.b*0.8+a*0.2
this.c=Math.min(a,this.c)
this.d=Math.max(a,this.d)},
m:function(a){return H.d(this.b)+" ("+H.d(this.a)+") ["+H.d(this.c)+","+H.d(this.d)+"]"}},
hJ:{"^":"c;a,b,c,d,e,f,r,x,y,z"},
dJ:{"^":"c;a,b,c"},
dV:{"^":"c;a,b,c,d,e,f"},
il:{"^":"c;a,b,c,d,e,f,r,x,y,z,Q,ch,cx,cy,db,dx,dy,fr,fx,fy,go,id,k1,k2,k3,k4,r1,r2,rx,ry,x1,x2,y1,y2,a4,N,V,R,W,T,Z,a1,a8,a9,aq,aJ,aK,aL,aa,ar,as",
aO:function(a,b,c){var z,y,x,w,v
z=new V.bf(null,!1)
z.a=a
z.b=!0
y=this.fy
x=b.a
w=c.a
y[x][w]=z
if(b!==c){v=new V.bf(null,!1)
v.a=a
y[w][x]=v}},
eX:function(){var z=this.ch
this.aO(z.ch,C.k,C.k)
this.aO(z.cx,C.i,C.k)
this.aO(z.Q,C.i,C.i)
this.aO(z.cy,C.o,C.k)
this.aO(z.db,C.o,C.i)
this.aO(z.dx,C.t,C.k)
this.aO(z.dy,C.t,C.i)},
hg:function(a,b,c,d){var z,y,x,w,v,u
z=a.d.a
y=c.d.a
x=this.fy[z.a][y.a]
if(x!=null){w=x.b
v=x.a
if(w){u=v.dj()
u.ax(a,b,c,d)
return u}else{u=v.dj()
u.ax(c,d,a,b)
return u}}else return},
bZ:function(a){var z,y,x,w,v,u,t,s,r
if((this.a&2)===2)return
z=G.t()
y=G.t()
x=new E.a(new Float64Array(H.b(2)))
w=new E.a(new Float64Array(H.b(2)))
v=new E.a(new Float64Array(H.b(2)))
u=new G.aw(x,w,v,0,0,0)
t=new E.a(new Float64Array(H.b(2)))
s=new E.a(new Float64Array(H.b(2)))
r=new V.b9(C.e,0,0,z,y,u,t,0,s,0,this,null,null,null,0,null,null,0,0,0,0,0,0,0,0,null,new V.d7(null,null,0.2,0,0,!1,new V.bW(1,65535,0)),new V.ha(0,new E.a(new Float64Array(H.b(2))),0),G.t())
r.b=4
r.b=6
r.b=38
y=z.a
y.h(a.c)
z.b.G(a.d)
x.I()
w.h(y)
v.h(y)
y=a.d
u.d=y
u.e=y
u.f=0
t.h(a.e)
r.x=a.f
r.id=a.r
r.k1=a.x
r.k2=a.cy
s.I()
s=a.a
r.a=s
if(s===C.f){r.fr=1
r.fx=1}r.k4=a.b
z=this.c
r.cx=z
if(z!=null)z.ch=r
this.c=r;++this.e
return r},
fz:function(a){var z,y,x,w,v,u,t,s
if((this.a&2)===2)return
z=V.h_(this,a)
z.b=null
y=this.d
z.c=y
if(y!=null)y.b=z
this.d=z;++this.f
y=z.d
y.b=z
x=z.r
y.a=x
y.c=null
w=z.f
v=w.dx
y.d=v
if(v!=null)v.c=y
w.dx=y
y=z.e
y.b=z
y.a=w
y.c=null
w=x.dx
y.d=w
if(w!=null)w.c=y
x.dx=y
u=a.c
t=a.d
if(!a.e){s=t.dy
for(;s!=null;){y=s.a
if(y==null?u==null:y===u)s.b.a|=8
s=s.d}}return z},
fj:function(){var z,y
for(z=this.c;z!=null;z=z.cx){y=z.y.a
y[0]=0
y[1]=0
z.z=0}},
fI:function(){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2
z=this.Q
if(z==null)return
y=z.a
x=(y&128)!==0
if((y&2)!==0){for(w=this.c,z=this.k2,v=this.k3,u=v.a.a,t=v.b;w!=null;w=w.cx){s=w.d
r=s.a.a
u[1]=r[1]
u[0]=r[0]
s=s.b
t.a=s.a
t.b=s.b
for(q=w.cy;q!=null;q=q.b){s=w.b
if((s&32)!==32){z.av(0.5,0.5,0.3)
this.be(q,v,z,x)}else{p=w.a
if(p===C.e){z.av(0.5,0.9,0.3)
this.be(q,v,z,x)}else if(p===C.F){z.av(0.5,0.5,0.9)
this.be(q,v,z,x)}else if((s&2)!==2){z.av(0.5,0.5,0.5)
this.be(q,v,z,x)}else{z.av(0.9,0.7,0.7)
this.be(q,v,z,x)}}}}z=this.fx
v=this.Q.a
o=z.z
if(o!==0){n=z.r/2
m=z.cy.a
l=z.fx.a!=null?z.dD():null
z=this.Q
if((v&128)!==0)z.fK(m,n,l,o)
else z.fJ(m,n,l,o)}}if((y&4)!==0)for(k=this.d,z=this.ch.a,v=this.k2,u=z.a;k!=null;k=k.c){j=k.f
i=k.r
h=j.d.a
g=i.d.a
t=z.b
s=t+1
z.b=s
t=u[t]
z.b=s+1
s=u[s]
k.ac(t)
k.ad(s)
v.av(0.5,0.8,0.8)
switch(k.a){case C.L:this.Q.al(t,s,v)
break
case C.M:H.q(k,"$isdD")
f=k.ch
e=k.cx
this.Q.al(f,t,v)
this.Q.al(e,s,v)
this.Q.al(f,e,v)
break
case C.w:this.Q.al(h,g,v)
break
case C.K:case C.N:break
default:this.Q.al(h,t,v)
this.Q.al(t,s,v)
this.Q.al(g,s,v)}z.b-=2}if((y&16)!==0){z=this.k2
z.av(0.3,0.9,0.9)
for(d=this.b.b,v=this.k4,u=this.r1;d!=null;d=d.c){c=d.f
b=d.r
t=d.x
c.r[t].gaQ().ci(v)
t=d.y
b.r[t].gaQ().ci(u)
this.Q.al(v,u,z)}}if((y&8)!==0){z=this.k2
z.av(0.9,0.3,0.9)
for(w=this.c,v=this.r2,u=v.a;w!=null;w=w.cx){if((w.b&32)!==32)continue
for(q=w.cy;q!=null;q=q.b)for(a=0;a<q.x;++a){a0=q.r[a]
t=this.b.a
s=a0.d
a1=t.a.b[s].gaQ()
if(!u.b6(4))u.p(0,4,v.cl(4))
t=u.i(0,4)
s=J.A(t)
p=a1.a.a
s.i(t,0).ae(p[0],p[1])
a2=a1.b.a
s.i(t,1).ae(a2[0],p[1])
s.i(t,2).ae(a2[0],a2[1])
s.i(t,3).ae(p[0],a2[1])
a2=this.Q
a2.bz(t,4,z)
a2.c.stroke()}}}if((y&32)!==0)for(w=this.c,z=this.k3,v=z.a,u=v.a,z=z.b;w!=null;w=w.cx){t=w.d
r=t.a.a
u[1]=r[1]
u[0]=r[0]
t=t.b
z.a=t.a
z.b=t.b
r=w.f.c.a
u[1]=r[1]
u[0]=r[0]
t=this.Q
s=t.b
p=s.c
t=t.c
t.strokeStyle="rgba(255, 0, 0, 0.9)"
t.fillStyle="rgba(255, 0, 0, 0.8)"
s.aB(v,v)
t.beginPath()
t.arc(u[0],u[1],0.1*p,0,6.283185307179586,!0)
t.closePath()
t.stroke()}if((y&64)!==0)this.b.a.a.fL(this.Q)
this.Q.toString},
bI:function(a){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j
z=this.fr
z.f.e=0
z.r.e=0
z.x.e=0
for(y=this.c;y!=null;y=y.cx){z=y.e
x=y.d
w=x.a.a
v=z.a.a
v[1]=w[1]
v[0]=w[0]
z=z.b
x=x.b
z.a=x.a
z.b=x.b}z=this.x2
x=this.e
v=this.b
z.ax(x,v.c,this.f,v.e)
for(y=this.c;y!=null;y=y.cx)y.b&=4294967294
for(u=this.b.b;u!=null;u=u.c)u.a&=4294967294
for(t=this.d;t!=null;t=t.c)t.x=!1
s=this.e
if(this.y1.length<s)this.y1=H.f(new Array(s),[V.b9])
for(r=this.c,x=this.r;r!=null;r=r.cx){v=r.b
if((v&1)===1)continue
if((v&2)!==2||(v&32)!==32)continue
if(r.a===C.e)continue
z.r=0
z.y=0
z.x=0
this.y1[0]=r
r.b=v|1
for(q=1;q>0;){--q
y=this.y1[q]
v=z.r
y.c=v
z.b[v]=y
z.r=v+1
y.ak(!0)
if(y.a===C.e)continue
for(p=y.dy;p!=null;p=p.d){o=p.b
v=o.a
if((v&1)===1)continue
if((v&4)!==4||(v&2)!==2)continue
o.f.z
o.r.z
z.c[z.y++]=o
o.a=v|1
n=p.a
v=n.b
if((v&1)===1)continue
m=q+1
this.y1[q]=n
n.b=v|1
q=m}for(l=y.dx;l!=null;l=l.d){v=l.b
if(v.x)continue
n=l.a
k=n.b
if((k&32)!==32)continue
z.d[z.x++]=v
v.x=!0
if((k&1)===1)continue
m=q+1
this.y1[q]=n
n.b=k|1
q=m}}z.dS(this.fr,a,x,this.x)
for(j=0;j<z.r;++j){y=z.b[j]
if(y.a===C.e)y.b&=4294967294}}z=this.fr.f
z.au(z.e)
z=this.fr.r
z.au(z.e)
z=this.fr.x
z.au(z.e)
z=this.y2.a
x=z.b
z.a=x==null?$.v.$0():x
for(y=this.c;y!=null;y=y.cx){if((y.b&1)===0)continue
if(y.a===C.e)continue
y.cC()}x=this.b
x.a.ce(x)
x=this.fr.y
v=z.b
if(v==null)v=$.v.$0()
x.au(C.b.aD((v-z.a)*1000,$.B))},
e4:function(b4){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2,a3,a4,a5,a6,a7,a8,a9,b0,b1,b2,b3
z=this.a4
z.ax(64,32,0,this.b.e)
if(this.dy){for(y=this.c;y!=null;y=y.cx){y.b&=4294967294
y.f.f=0}for(x=this.b.b;x!=null;x=x.c){x.a&=4294967262
x.Q=0
x.ch=1}}for(w=this.R,v=this.W,u=this.T,t=this.Z,s=this.V,r=this.N,q=r.a,p=r.b,o=r.c,n=r.d,m=this.ch;!0;){for(x=this.b.b,l=null,k=1;x!=null;x=x.c){j=x.a
if((j&4)!==4)continue
if(x.Q>8)continue
if((j&32)!==0)i=x.ch
else{h=x.f
g=x.r
h.z
g.z
f=h.c
e=g.c
d=f.a
c=e.a
j=f.b
b=(j&2)===2&&d!==C.e
a=e.b
a0=(a&2)===2&&c!==C.e
if(!b&&!a0)continue
a1=(j&8)===8||d!==C.f
a2=(a&8)===8||c!==C.f
if(!a1&&!a2)continue
j=f.f
a3=j.f
a=e.f
a4=a.f
if(a3<a4){j.aR(a4)
a3=a4}else if(a4<a3)a.aR(a3)
a5=x.x
a6=x.y
q.ct(h.d,a5)
p.ct(g.d,a6)
o.K(j)
n.K(a)
r.e=1
m.fx.hw(s,r)
a7=s.b
i=s.a===C.C?Math.min(a3+(1-a3)*a7,1):1
x.ch=i
x.a|=32}if(i<k){k=i
l=x}}if(l==null||0.9999988079071045<k){this.dy=!0
break}h=l.f
g=l.r
f=h.c
e=g.c
j=f.f
u.K(j)
a=e.f
t.K(a)
f.aR(k)
e.aR(k)
l.cd(this.b.e)
a8=l.a&=4294967263;++l.Q
if((a8&4)!==4||(a8&2)!==2){l.a=a8&4294967291
j.K(u)
a.K(t)
f.b_()
e.b_()
continue}f.ak(!0)
e.ak(!0)
z.r=0
z.y=0
z.x=0
f.c=0
j=z.b
j[0]=f
z.r=1
e.c=1
j[1]=e
z.r=2
j=z.c
z.y=1
j[0]=l
f.b|=1
e.b|=1
l.a|=1
v[0]=f
v[1]=e
for(a9=0;a9<2;++a9){b0=v[a9]
if(b0.a===C.f)for(b1=b0.dy;b1!=null;b1=b1.d){if(z.r===z.z)break
if(z.y===z.Q)break
b2=b1.b
if((b2.a&1)!==0)continue
b3=b1.a
if(b3.a===C.f&&(b0.b&8)!==8&&(b3.b&8)!==8)continue
b2.f.z
b2.r.z
j=b3.f
u.K(j)
if((b3.b&1)===0)b3.aR(k)
b2.cd(this.b.e)
a=b2.a
if((a&4)!==4){j.K(u)
b3.b_()
continue}if((a&2)!==2){j.K(u)
b3.b_()
continue}b2.a=a|1
z.c[z.y++]=b2
j=b3.b
if((j&1)!==0)continue
b3.b=j|1
if(b3.a!==C.e)b3.ak(!0)
j=z.r
b3.c=j
z.b[j]=b3
z.r=j+1}}j=(1-k)*b4.a
w.a=j
w.b=1/j
w.c=1
w.e=20
w.d=b4.d
w.f=!1
z.e5(w,f.c,e.c)
for(a9=0;a9<z.r;++a9){b0=z.b[a9]
b0.b&=4294967294
if(b0.a!==C.f)continue
b0.cC()
for(b1=b0.dy;b1!=null;b1=b1.d)b1.b.a&=4294967262}j=this.b
j.a.ce(j)}},
be:function(a,b,c,d){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l
z=a.d
switch(z.a){case C.k:H.q(z,"$isaF")
y=this.aK
G.n(b,z.gab(),y)
x=z.gb9()
z=b.b
w=z.b
z=z.a
v=this.aL.a
v[0]=w
v[1]=z
z=this.Q
w=y.a
if(d){v=z.b
x=x.n(0,v.c)
z=z.c
u=c.a
t=c.b
s=c.c
z.toString
z.strokeStyle="rgba("+u+", "+t+", "+s+", 0.9)"
s=c.a
t=c.b
u=c.c
z.fillStyle="rgba("+s+", "+t+", "+u+", 0.8)"
v.aB(y,y)
z.beginPath()
z.arc(w[0],w[1],x,0,6.283185307179586,!0)
z.closePath()
z.stroke()}else{v=z.b
x=x.n(0,v.c)
z=z.c
u=c.a
t=c.b
s=c.c
z.toString
z.strokeStyle="rgba("+u+", "+t+", "+s+", 0.9)"
s=c.a
t=c.b
u=c.c
z.fillStyle="rgba("+s+", "+t+", "+u+", 0.8)"
v.aB(y,y)
z.beginPath()
z.arc(w[0],w[1],x,0,6.283185307179586,!0)
z.closePath()
z.fill("nonzero")}break
case C.i:r=z.f
y=this.as
w=y.a
if(!w.b6(8))w.p(0,8,y.cl(8))
y=w.i(0,8)
for(w=J.A(y),q=0;q<r;++q)G.n(b,z.d[q],w.i(y,q))
z=this.Q
if(d){z.bz(y,r,c)
z.c.stroke()}else{z.bz(y,r,c)
z=z.c
z.toString
z.fill("nonzero")}break
case C.o:H.q(z,"$isaI")
y=this.aa
G.n(b,z.c,y)
w=this.ar
G.n(b,z.d,w)
this.Q.al(y,w,c)
break
case C.t:H.q(z,"$isbP")
p=z.geS()
o=z.gbV()
z=this.aa
G.n(b,o.i(0,0),z)
for(y=this.ar,w=z.a,n=y.a,q=1;C.b.L(q,p);++q){G.n(b,o.i(0,q),y)
this.Q.al(z,y,c)
v=this.Q
u=v.b
t=u.c
v=v.c
s=c.a
m=c.b
l=c.c
v.toString
v.strokeStyle="rgba("+s+", "+m+", "+l+", 0.9)"
l=c.a
m=c.b
s=c.c
v.fillStyle="rgba("+l+", "+m+", "+s+", 0.8)"
u.aB(z,z)
v.beginPath()
v.arc(w[0],w[1],0.05*t,0,6.283185307179586,!0)
v.closePath()
v.stroke()
w[1]=n[1]
w[0]=n[0]}break
default:break}},
F:{
ir:function(a,b){var z,y,x
z=H.f(new Array(a),[[P.k,V.bf]])
for(y=[V.bf],x=0;x<a;++x)z[x]=H.f(new Array(b),y)
return z}}},
ip:{"^":"c;a,b",
ds:function(a){var z=this.a.a.b[a].gaz()
return this.b.i5(z.b)}},
iq:{"^":"c;a,b,c,d,e"},
c9:{"^":"c;a",
sl:function(a){this.a[3]=a},
gl:function(){return this.a[3]}},
hz:{"^":"c;a,b,c,d,az:e<"},
bn:{"^":"c;a,b,c"},
hy:{"^":"c;a,b"},
ho:{"^":"c;a,b,c"},
fm:{"^":"c;a,b,c,d,e"},
id:{"^":"c;a,b"},
fc:{"^":"c;a,b,c"},
hU:{"^":"c;a,b,c,d,e,f"},
hA:{"^":"c;a,b,c,d,e,f,r,x,y,z,Q,ch,cx,cy,db,dx,dy,fr,fx,fy,go,id,k1,k2,k3,k4,r1,r2,rx,ry,x1,x2,y1,y2,a4,N,V,R,W,T,Z,a1,a8,a9,aq,aJ,aK,aL,aa,ar,as,hQ,bg,hR,hS,hT,hU,fN,fO,fP,fQ,fR,fS,hV",
cb:function(a,b){var z,y,x,w,v
if(a==null){x=this.Q
w=new Array(x)
w.fixed$length=Array
a=w
for(z=0;J.cF(z,x);z=J.eK(z,1))try{J.eL(a,z,b.$0())}catch(v){y=H.Y(v)
x="Exception "+H.d(y)
throw H.e(x)}}return a},
fG:function(a){var z,y
z=this.aa
z.co()
z.co().hH(a)
for(y=a.gbv(),z=this.fy;y.L(0,a.gbx());y=y.B(0,1))C.c.p(z,y,null)
a.gbR()
a.gbR().sbQ(a.gbQ())
a.gbQ()
a.gbQ().sbR(a.gbR());--this.V},
hA:function(a){var z,y,x,w,v,u,t,s
for(z=this.k2,y=this.x,x=0;w=this.id,x<w;++x){v=C.c.i(z,x)
u=v.gc4(v)
w=this.cy.a[u].a
t=w[0]
v.sht(0,(C.a.a6(y*w[1]+2048)<<19>>>0)+(C.a.a6(128*(y*t))+262144))}F.eF(z,0,w)
this.k3=0
for(u=0;u<this.id;++u){s=C.c.i(z,u)
V.hD(s.ght(s),1,0)}},
hz:function(){var z,y,x,w,v,u,t,s,r
z=this.ar
y=z.a.a
y[0]=17976931348623157e292
y[1]=17976931348623157e292
x=z.b.a
x[0]=-17976931348623157e292
x[1]=-17976931348623157e292
for(w=this.z,v=this.cy.a,u=0;u<w;++u){t=v[u]
s=y[0]
r=t.a
y[0]=Math.min(s,r[0])
y[1]=Math.min(y[1],r[1])
x[0]=Math.max(x[0],r[0])
x[1]=Math.max(x[1],r[1])}w=this.r
y[0]=y[0]-w
y[1]=y[1]-w
x[0]=x[0]+w
x[1]=x[1]+w
this.r2=0
w=this.fN
w.a=this
this.aa.hk(w,z)},
dV:function(a){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k
z=this.ar
y=z.a.a
y[0]=17976931348623157e292
y[1]=17976931348623157e292
x=z.b.a
x[0]=-17976931348623157e292
x[1]=-17976931348623157e292
for(w=this.z,v=this.db.a,u=this.cy.a,t=a.a,s=0;s<w;++s){r=v[s]
q=u[s].a
p=q[0]
o=q[1]
q=r.a
n=p+t*q[0]
m=o+t*q[1]
l=p<n?p:n
k=o<m?o:m
q=y[0]
y[0]=q<l?q:l
q=y[1]
y[1]=q<k?q:k
p=p>n?p:n
o=o>m?o:m
q=x[0]
x[0]=q>p?q:p
q=x[1]
x[1]=q>o?q:o}y=this.fO
y.b=a
y.a=this
this.aa.hk(y,z)},
bI:function(a){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k;++this.a
if(this.z===0)return
this.b=0
for(z=0,y=0;z<this.z;++z){y=C.b.cq(y,C.c.i(this.cx.a,z))
this.b=y}if((y&2)!==0)this.ea()
if(this.z===0)return
this.c=0
for(x=this.R;!1;x=x.bE())this.c=C.b.cq(this.c,x.gcP())
y=a.a
w=this.f
v=this.aa
u=v.dC()
t=C.a.n(y*w,u.gC(u))
u=a.a
v=v.dC()
s=C.a.n(u*w,v.gD(v))
r=this.ck(a)
for(z=0;z<this.z;++z){y=this.db.a[z].a
y[0]=y[0]+t
y[1]=y[1]+s
w=y[0]
v=y[1]
q=w*w+v*v
if(q>r){p=q===0?17976931348623157e292:Math.sqrt(r/q)
y[0]=y[0]*p
y[1]=y[1]*p}}this.dV(a)
if((this.c&2)!==0)this.e1(a)
if((this.b&4)!==0)this.e9(a)
for(y=this.z,w=this.cy.a,v=this.db.a,u=a.a,z=0;z<y;++z){o=w[z]
n=v[z]
m=o.a
l=m[0]
k=n.a
m[0]=l+u*k[0]
m[1]=m[1]+u*k[1]}this.hz()
this.hA(!1)
if((this.b&32)!==0)this.e8(a)
if((this.b&64)!==0)this.e_(a)
if((this.b&128)!==0)this.e7(a)
if((this.b&16)!==0)this.dY(a)
if((this.b&8)!==0)this.e3(a)
if((this.c&1)!==0)this.e2(a)
if((this.b&256)!==0)this.dW(a)
this.e0(a)
this.dX(a)},
e0:function(a){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e
for(z=this.dx,y=0;y<this.z;++y)C.c.p(z,y,0)
for(x=0;x<this.r2;++x){w=this.ry[x]
v=w.a
u=w.c
C.c.p(z,v,C.c.i(z,v).B(0,u))}for(x=0;x<this.k3;++x){w=this.r1[x]
v=w.a
t=w.b
u=w.d
C.c.p(z,v,C.c.i(z,v).B(0,u))
C.c.p(z,t,C.c.i(z,t).B(0,u))}if((this.b&64)!==0)for(y=0;y<this.z;++y){C.c.i(this.cx.a,y).aj(0,64)
C.c.p(z,y,0)}s=this.W*(this.d*this.ck(a))
for(y=0;y<this.z;++y)C.c.p(z,y,s*Math.max(0,Math.min(H.jj(C.c.i(z,y)),5)-1))
r=a.a/(this.d*this.r)
for(q=this.bg,p=q.a,o=this.x,n=1.777777*this.e*o*o,x=0;x<this.r2;++x){w=this.ry[x]
v=w.a
t=w.b
u=w.c
m=w.e
l=w.d
k=this.cy.a[v]
j=C.j.n(r*u*m,C.c.i(z,v).B(0,s*u))
o=l.a
p[0]=j*o[0]
p[1]=j*o[1]
o=this.db.a[v].a
o[0]=o[0]-n*p[0]
o[1]=o[1]-n*p[1]
t.bW(q,k,!0)}for(x=0;x<this.k3;++x){w=this.r1[x]
v=w.a
t=w.b
u=w.d
l=w.e
i=C.c.i(z,v).B(0,C.c.i(z,t))
p=r*u
o=l.a
h=C.j.n(p,i)*o[0]
g=C.j.n(p,i)*o[1]
o=this.db.a
f=o[v]
e=o[t]
o=f.a
o[0]=o[0]-h
o[1]=o[1]-g
o=e.a
o[0]=o[0]+h
o[1]=o[1]+g}},
dX:function(a4){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2,a3
z=this.T
for(y=this.bg,x=y.a,w=this.x,v=1.777777*this.e*w*w,u=0;u<this.r2;++u){t=this.ry[u]
s=t.a
r=t.b
q=t.c
p=t.e
o=t.d
n=this.cy.a[s]
w=n.a
m=w[0]
l=r.gaP().gt()
k=C.a.H(m,l.gC(l))
w=w[1]
l=r.gaP().gt()
j=C.a.H(w,l.gD(l))
i=this.db.a[s]
l=r.gbu().dH(0).n(0,j)
w=r.gby()
w=l.B(0,w.gC(w))
l=i.a
h=w.H(0,l[0])
w=r.gbu().n(0,k)
m=r.gby()
g=w.B(0,m.gD(m)).H(0,l[1])
m=o.a
f=h.n(0,m[0]).B(0,g.n(0,m[1]))
if(f.L(0,0)){w=z*q*p
x[0]=C.a.n(w,f)*m[0]
x[1]=C.a.n(w,f)*m[1]
l[0]=l[0]+v*x[0]
l[1]=l[1]+v*x[1]
x[0]=-x[0]
x[1]=-x[1]
r.bW(y,n,!0)}}for(x=this.k3,w=this.r1,m=this.db.a,u=0;u<x;++u){t=w[u]
s=t.a
r=t.b
q=t.d
o=t.e
i=m[s]
l=m[r].a
e=l[0]
d=i.a
c=d[0]
b=l[1]
a=d[1]
a0=o.a
a1=a0[0]
a0=a0[1]
f=(e-c)*a1+(b-a)*a0
if(f<0){e=z*q*f
a2=e*a1
a3=e*a0
d[0]=c+a2
d[1]=a+a3
l[0]=l[0]-a2
l[1]=l[1]-a3}}},
e9:function(a){var z,y,x
for(z=0;z<this.z;++z){C.c.i(this.cx.a,z).aj(0,4)
y=this.db.a[z]
x=y.a
x[0]=0
x[1]=0}},
e1:function(a){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h
for(z=this.R,y=this.bg,x=this.fP,w=this.fQ,v=y.a,u=this.fR,t=u.a,s=t.a,u=u.b,r=this.fS,q=r.a.a,p=r.b;!1;z=z.bE()){z.gcP().aj(0,2)
z.i7()
o=C.a.n(a.a,z.gbu())
w.a=Math.sin(o)
w.b=Math.cos(o)
G.j(w,z.geK(),x)
n=z.gby().ghL()
v[1]=n[1]
v[0]=n[0]
o=a.a
v[1]=v[1]*o
v[0]=v[0]*o
y.q(0,z.geK())
y.j(x)
s[1]=v[1]
s[0]=v[0]
u.a=w.a
u.b=w.b
o=z.gbT()
m=z.gbT()
l=o.gca()
k=m.gca()
j=C.a.n(u.b,l.gt())
i=C.a.n(u.a,l.gcr())
k.scr(C.a.n(u.a,l.gt())+C.a.n(u.b,l.gcr()))
k.st(j-i)
G.av(u,o.gab(),m.gab())
m.gab().q(0,t)
m=a.b
q[0]=m*s[0]
q[1]=m*s[1]
p.a=m*u.a
p.b=m*(u.b-1)
for(h=z.gbv();h.L(0,z.gbx());h=h.B(0,1))G.n(r,this.cy.a[h],this.db.a[h])}},
dY:function(a6){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2,a3,a4,a5
z=a6.b*this.Z
for(y=0;y<this.y2;++y){x=C.c.i(this.N,y)
x.gfW().aj(0,16)
w=x.gaU()
v=x.gaV()
u=x.gc5()
t=x.gi2()
s=x.gi3()
r=x.gi4()
q=this.cy.a
p=q[w]
o=q[v]
n=q[u]
q=p.a
m=q[0]
l=o.a
k=l[0]
j=n.a
i=0.3333333333333333*(m+k+j[0])
h=0.3333333333333333*(q[1]+l[1]+j[1])
g=t.u(p).B(0,s.u(o)).B(0,r.u(n))
f=t.A(p).B(0,s.A(o)).B(0,r.A(n))
e=Math.sqrt(C.b.cg(1,g.n(0,g).B(0,f.n(0,f))))
g=g.n(0,e)
f=f.n(0,e)
d=C.a.n(z,x.gee())
c=f.n(0,t.gC(t)).H(0,g.n(0,t.gD(t)))
b=g.n(0,t.gC(t)).B(0,f.n(0,t.gD(t)))
a=f.n(0,s.gC(s)).H(0,g.n(0,s.gD(s)))
a0=g.n(0,s.gC(s)).B(0,f.n(0,s.gD(s)))
a1=f.n(0,r.gC(r)).H(0,g.n(0,r.gD(r)))
a2=g.n(0,r.gC(r)).B(0,f.n(0,r.gD(r)))
m=this.db.a
a3=m[w]
a4=m[v]
a5=m[u]
m=a3.a
m[0]=m[0]+C.a.n(d,c.H(0,q[0]-i))
m[1]=m[1]+C.a.n(d,b.H(0,q[1]-h))
q=a4.a
q[0]=q[0]+C.a.n(d,a.H(0,l[0]-i))
q[1]=q[1]+C.a.n(d,a0.H(0,l[1]-h))
l=a5.a
l[0]=l[0]+C.a.n(d,a1.H(0,j[0]-i))
l[1]=l[1]+C.a.n(d,a2.H(0,j[1]-h))}},
e3:function(a){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h
z=a.b*this.a1
for(y=this.y1,x=0;x<this.x1;++x){w=C.c.i(y,x)
w.gfW().aj(0,8)
v=w.gaU()
u=w.gaV()
t=this.cy.a
s=t[v]
t=t[u].a
r=t[0]
q=s.a
p=r-q[0]
o=t[1]-q[1]
n=w.ghP()
m=Math.sqrt(p*p+o*o)
if(m===0)m=17976931348623157e292
l=C.a.n(z,w.gee())
k=C.a.n(l,n.H(0,m))/m*p
j=C.a.n(l,n.H(0,m))/m*o
t=this.db.a
i=t[v]
h=t[u]
t=i.a
t[0]=t[0]-k
t[1]=t[1]-j
t=h.a
t[0]=t[0]+k
t[1]=t[1]+j}},
e7:function(a0){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a
this.dy=this.cb(this.dy,V.cx())
for(z=this.dx,y=0;y<this.z;++y){C.c.p(z,y,0)
this.dy[y].I()}for(x=0;x<this.k3;++x){w=this.r1[x]
if((w.c&128)!==0){v=w.a
u=w.b
t=w.d
s=w.e
C.c.p(z,v,C.c.i(z,v).B(0,t))
C.c.p(z,u,C.c.i(z,u).B(0,t))
r=this.dy
q=r[v]
p=r[u]
o=(1-t)*t
r=q.a
n=s.a
r[0]=r[0]-o*n[0]
r[1]=r[1]-o*n[1]
r=p.a
r[0]=r[0]+o*n[0]
r[1]=r[1]+o*n[1]}}r=this.a9
n=this.r*a0.b
m=r*n
l=this.aq*n
for(x=0;x<this.k3;++x){w=this.r1[x]
if((w.c&128)!==0){v=w.a
u=w.b
t=w.d
s=w.e
r=this.dy
q=r[v]
p=r[u]
k=C.c.i(z,v).B(0,C.c.i(z,u))
r=p.a
n=r[0]
j=q.a
i=j[0]
r=r[1]
j=j[1]
h=C.j.n(m,k.H(0,2))
g=s.a
f=g[0]
g=g[1]
e=(h+l*((n-i)*f+(r-j)*g))*t
d=e*f
c=e*g
g=this.db.a
b=g[v]
a=g[u]
g=b.a
g[0]=g[0]-d
g[1]=g[1]-c
g=a.a
g[0]=g[0]+d
g[1]=g[1]+c}}},
e8:function(a1){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0
z=this.a8
for(y=this.bg,x=this.x,w=1.777777*this.e*x*x,x=y.a,v=0;v<this.r2;++v){u=this.ry[v]
t=u.a
C.c.i(this.cx.a,t).aj(0,32)
s=u.b
r=u.c
q=u.e
p=this.cy.a[t]
o=this.db.a[t]
n=p.a
m=n[0]
l=s.gaP().gt()
k=C.a.H(m,l.gC(l))
n=n[1]
l=s.gaP().gt()
j=C.a.H(n,l.gD(l))
l=s.gbu().dH(0).n(0,j)
n=s.gby()
n=l.B(0,n.gC(n))
l=o.a
i=n.H(0,l[0])
n=s.gbu().n(0,k)
m=s.gby()
h=n.B(0,m.gD(m)).H(0,l[1])
m=z*q*r
x[0]=C.j.n(m,i)
x[1]=C.j.n(m,h)
l[0]=l[0]+w*x[0]
l[1]=l[1]+w*x[1]
x[0]=-x[0]
x[1]=-x[1]
s.bW(y,p,!0)}for(x=this.k3,n=this.r1,m=this.db.a,v=0;v<x;++v){u=n[v]
if((u.c&32)!==0){t=u.a
s=u.b
r=u.d
o=m[t]
l=m[s].a
g=l[0]
f=o.a
e=f[0]
d=l[1]
c=f[1]
b=z*r
a=b*(g-e)
a0=b*(d-c)
f[0]=e+a
f[1]=c+a0
l[0]=l[0]-a
l[1]=l[1]-a0}}},
e_:function(a){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f
z=this.aJ*(this.r*a.b)
for(y=this.bg,x=this.x,w=1.777777*this.e*x*x,x=y.a,v=0;v<this.r2;++v){u=this.ry[v]
t=u.a
C.c.i(this.cx.a,t).aj(0,64)
s=u.c
if(s>0.25){r=u.b
q=u.e
p=this.cy.a[t]
o=u.d
n=this.db.a[t]
m=z*q*(s-0.25)
l=o.a
x[0]=m*l[0]
x[1]=m*l[1]
l=n.a
l[0]=l[0]-w*x[0]
l[1]=l[1]-w*x[1]
r.bW(y,p,!0)}}for(x=this.k3,l=this.r1,k=this.db.a,j=this.aJ,v=0;v<x;++v){u=l[v]
if((u.c&64)!==0){s=u.d
if(s>0.25){t=u.a
r=u.b
o=u.e
n=k[t]
i=k[r]
m=j*(s-0.25)
h=o.a
g=m*h[0]
f=m*h[1]
h=n.a
h[0]=h[0]-g
h[1]=h[1]-f
h=i.a
h[0]=h[0]+g
h[1]=h[1]+f}}}},
e2:function(a){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j
z=this.fr
this.fr=z==null?new Float64Array(H.b(this.Q)):z
y=a.b*this.aK
for(x=this.fy,w=0;w<this.k3;++w){v=this.r1[w]
u=v.a
t=v.b
C.c.i(x,u)
C.c.i(x,t)
s=v.d
r=v.e
q=this.fr
p=q[u]
q=q[t]
o=this.db.a
n=o[u]
m=o[t]
l=y*(p+q)*s
q=r.a
k=l*q[0]
j=l*q[1]
q=n.a
q[0]=q[0]-k
q[1]=q[1]-j
q=m.a
q[0]=q[0]+k
q[1]=q[1]+j}},
dW:function(a){var z,y,x,w,v,u,t,s,r,q,p,o,n
z=this.fx
z.a=this.cb(z.a,V.ew())
y=C.a.a6(256*this.aL)
for(x=0;x<this.k3;++x){w=this.r1[x]
v=w.a
u=w.b
C.c.i(this.cx.a,v).aj(0,C.c.i(this.cx.a,u)).aj(0,256)
z=this.fx.a
t=z[v]
z=z[u].a
s=z[0]
r=t.a
q=C.b.b2(C.b.a6(y*(s-r[0])),8)
p=C.b.b2(C.b.a6(y*(z[1]-r[1])),8)
o=C.b.b2(C.b.a6(y*(z[2]-r[2])),8)
n=C.b.b2(C.b.a6(y*(z[3]-r[3])),8)
r[0]=r[0]+q
r[1]=r[1]+p
r[2]=r[2]+o
r[3]=r[3]+n
z[0]=z[0]-q
z[1]=z[1]-p
z[2]=z[2]-o
z[3]=z[3]-n}},
ea:function(){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i
z=P.as(this.z,0,!1,P.m)
for(y=this.aa,x=0;x<this.z;++x){w=C.c.i(this.cx.a,x)
w.aj(0,2)
v=y.co()
w.aj(0,512)
v.hG(x)
z[x]=-1}for(y=this.k2,u=0;t=this.id,u<t;++u){s=C.c.i(y,u)
s.sc4(0,z[s.gc4(s)])}for(x=0;x<t;++x)if(V.hC(C.c.i(y,x))){--t
r=C.c.i(y,t)
C.c.p(y,t,C.c.i(y,x))
C.c.p(y,x,r);--x}this.id=t
for(u=0;t=this.k3,u<t;++u){q=this.r1[u]
q.a=z[q.a]
q.b=z[q.b]}for(y=this.r1,x=0;x<t;++x){p=y[x]
if(p.a<0||p.b<0){--t
r=y[t]
y[t]=p
y[x]=r;--x}}this.k3=t
for(u=0;t=this.r2,u<t;++u){q=this.ry[u]
q.a=z[q.a]}for(y=this.ry,x=0;x<t;++x){p=y[x]
if(p.a<0){--t
r=y[t]
y[t]=p
y[x]=r;--x}}this.r2=t
for(y=this.y1,u=0;t=this.x1,u<t;++u){o=C.c.i(y,u)
o.saU(z[o.gaU()])
o.saV(z[o.gaV()])}for(x=0;x<t;++x){p=C.c.i(y,x)
if(p.gaU().L(0,0)||p.gaV().L(0,0)){--t
r=C.c.i(y,t)
C.c.p(y,t,C.c.i(y,x))
C.c.p(y,x,r);--x}}this.x1=t
for(u=0;t=this.y2,u<t;++u){n=C.c.i(this.N,u)
n.saU(z[n.gaU()])
n.saV(z[n.gaV()])
n.sc5(z[n.gc5()])}for(x=0;x<t;++x){y=C.c.i(this.N,x)
if(y.gaU().L(0,0)||y.gaV().L(0,0)||y.gc5().L(0,0)){--t
r=C.c.i(this.N,t)
y=this.N
C.c.p(y,t,C.c.i(y,x))
C.c.p(this.N,x,r);--x}}this.y2=t
for(m=this.R;!1;m=m.bE()){for(x=m.gbv(),l=0,k=0,j=!1;x.L(0,m.gbx());x=x.B(0,1)){t=z[x]
if(t>=0){l=Math.min(l,t)
k=Math.max(k,t+1)}else j=!0}if(l<k){m.sbv(l)
m.sbx(k)
if(j){m.gcP().aj(0,2)
m.sfc(!0)}}else{m.sbv(0)
m.sbx(0)
if(m.ghK())m.sfb(!0)}}this.z=0
for(m=this.R;!1;m=i){i=m.bE()
if(m.gfb())this.fG(m)
else m.gfc()}},
ck:function(a){var z=this.r*a.b
return z*z},
dD:function(){var z=this.fx
z.a=this.cb(z.a,z.b)
return this.fx.a},
ez:function(a){this.W=0.05
this.T=1
this.Z=0.25
this.a1=0.25
this.a8=0.25
this.a9=0.1
this.aq=0.2
this.aJ=0.5
this.aK=0.5
this.aL=0.5
this.cx=new V.hy(null,null)
this.cy=new V.bn(null,V.cx(),0)
this.db=new V.bn(null,V.cx(),0)
this.fx=new V.bn(null,V.ew(),0)
this.go=new V.bn(null,V.ji(),0)},
F:{
hD:function(a,b,c){return a.B(0,c<<19>>>0).B(0,b<<7>>>0)},
kN:[function(){return new E.a(new Float64Array(H.b(2)))},"$0","cx",0,0,16],
kL:[function(){return new P.c()},"$0","ji",0,0,17],
kM:[function(){var z=new Int8Array(H.b(4))
z[0]=127
z[1]=127
z[2]=127
z[3]=50
return new V.c9(z)},"$0","ew",0,0,18],
hB:function(a){var z=new V.hA(0,0,0,1,1,1,1,1,1,0,0,0,null,null,null,null,null,null,null,null,null,0,0,null,0,0,null,0,0,null,0,0,null,0,0,null,0,null,null,null,null,null,null,null,null,null,null,null,null,V.aD(),new V.fm(null,null,null,!1,0),V.aD(),new E.a(new Float64Array(H.b(2))),G.t(),G.t(),new V.fc(null,null,null),new V.hz(0,new E.a(new Float64Array(H.b(2))),new E.a(new Float64Array(H.b(2))),null,null),new V.id(null,new E.a(new Float64Array(H.b(2)))),new V.hU(null,null,new V.cf(new E.a(new Float64Array(H.b(2))),new E.a(new Float64Array(H.b(2))),0),new V.dF(new E.a(new Float64Array(H.b(2))),0),new E.a(new Float64Array(H.b(2))),new E.a(new Float64Array(H.b(2)))),new E.a(new Float64Array(H.b(2))),new G.b0(0,1),G.t(),G.t(),new V.ho(0,0,0))
z.ez(a)
return z}}},
ec:{"^":"c;a",
cl:function(a){var z,y,x
z=new Array(a)
z.fixed$length=Array
y=H.f(z,[E.a])
for(z=y.length,x=0;x<z;++x)y[x]=new E.a(new Float64Array(2))
return y}},
hw:{"^":"Q;a,b,c,d",
a5:function(){return new E.a(new Float64Array(2))},
$asQ:function(){return[E.a]}},
hx:{"^":"Q;a,b,c,d",
a5:function(){return new E.ac(new Float64Array(3))},
$asQ:function(){return[E.ac]}},
ht:{"^":"Q;a,b,c,d",
a5:function(){return new E.a4(new Float64Array(4))},
$asQ:function(){return[E.a4]}},
hu:{"^":"Q;a,b,c,d",
a5:function(){return new E.ah(new Float64Array(9))},
$asQ:function(){return[E.ah]}},
hs:{"^":"Q;a,b,c,d",
a5:function(){var z=new Float64Array(2)
return new V.ae(new E.a(z),new E.a(new Float64Array(2)))},
$asQ:function(){return[V.ae]}},
hv:{"^":"Q;a,b,c,d",
a5:function(){return new G.b0(0,1)},
$asQ:function(){return[G.b0]}},
H:{"^":"ab;$ti"},
hm:{"^":"H;d,a,b,c",
a5:function(){return new V.bp(0,null,null,new V.D(null,null,null,null),new V.D(null,null,null,null),null,null,0,0,V.G(),0,0,0,0,0,this.d,V.G())},
$asH:function(){return[V.bp]},
$asab:function(){return[V.bp]}},
hi:{"^":"H;d,a,b,c",
a5:function(){return new V.bd(0,null,null,new V.D(null,null,null,null),new V.D(null,null,null,null),null,null,0,0,V.G(),0,0,0,0,0,this.d,V.G())},
$asH:function(){return[V.bd]},
$asab:function(){return[V.bd]}},
hl:{"^":"H;d,a,b,c",
a5:function(){return new V.bo(0,null,null,new V.D(null,null,null,null),new V.D(null,null,null,null),null,null,0,0,V.G(),0,0,0,0,0,this.d,V.G())},
$asH:function(){return[V.bo]},
$asab:function(){return[V.bo]}},
hj:{"^":"H;d,a,b,c",
a5:function(){return new V.bi(0,null,null,new V.D(null,null,null,null),new V.D(null,null,null,null),null,null,0,0,V.G(),0,0,0,0,0,this.d,V.G())},
$asH:function(){return[V.bi]},
$asab:function(){return[V.bi]}},
hk:{"^":"H;d,a,b,c",
a5:function(){return new V.bj(0,null,null,new V.D(null,null,null,null),new V.D(null,null,null,null),null,null,0,0,V.G(),0,0,0,0,0,this.d,V.G())},
$asH:function(){return[V.bj]},
$asab:function(){return[V.bj]}},
hg:{"^":"H;d,a,b,c",
a5:function(){var z,y,x,w
z=new Float64Array(2)
y=new Float64Array(2)
x=new Float64Array(2)
w=new Float64Array(2)
z=new V.aI(new E.a(z),new E.a(y),new E.a(x),new E.a(w),!1,!1,new E.a(new Float64Array(2)),C.o,0)
z.b=0.01
return new V.bb(z,0,null,null,new V.D(null,null,null,null),new V.D(null,null,null,null),null,null,0,0,V.G(),0,0,0,0,0,this.d,V.G())},
$asH:function(){return[V.bb]},
$asab:function(){return[V.bb]}},
hh:{"^":"H;d,a,b,c",
a5:function(){var z,y,x,w
z=new Float64Array(2)
y=new Float64Array(2)
x=new Float64Array(2)
w=new Float64Array(2)
z=new V.aI(new E.a(z),new E.a(y),new E.a(x),new E.a(w),!1,!1,new E.a(new Float64Array(2)),C.o,0)
z.b=0.01
return new V.bc(z,0,null,null,new V.D(null,null,null,null),new V.D(null,null,null,null),null,null,0,0,V.G(),0,0,0,0,0,this.d,V.G())},
$asH:function(){return[V.bc]},
$asab:function(){return[V.bc]}},
fh:{"^":"c;a,b,c,d,e,f,r,x,y,z,Q,ch,cx,cy,db,dx,dy,fr,fx,fy",
cp:function(a){var z,y,x,w
z=this.y
if(!z.b6(a)){y=new Array(a)
y.fixed$length=Array
x=H.f(y,[E.a])
for(w=0;C.b.L(w,a);++w)x[w]=new E.a(new Float64Array(2))
z.p(0,a,x)}return z.i(0,a)},
er:function(a0,a1){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a
z=new V.hm(this,null,null,null)
z.aN(10,V.bp)
this.Q=z
z=new V.hi(this,null,null,null)
z.aN(10,V.bd)
this.ch=z
z=new V.hl(this,null,null,null)
z.aN(10,V.bo)
this.cx=z
z=new V.hj(this,null,null,null)
z.aN(10,V.bi)
this.cy=z
z=new V.hk(this,null,null,null)
z.aN(10,V.bj)
this.db=z
z=new V.hg(this,null,null,null)
z.aN(10,V.bb)
this.dx=z
z=new V.hh(this,null,null,null)
z.aN(10,V.bc)
this.dy=z
z=V.aG()
y=V.aG()
x=G.t()
w=G.t()
v=V.dI()
u=new Float64Array(H.b(2))
t=new Float64Array(H.b(2))
s=new Float64Array(H.b(2))
r=G.t()
q=new Float64Array(H.b(2))
p=new Float64Array(H.b(2))
o=[V.V]
n=H.f(new Array(2),o)
m=new Float64Array(H.b(2))
l=new Float64Array(H.b(2))
k=new Float64Array(H.b(2))
j=new Float64Array(H.b(2))
i=new Float64Array(H.b(2))
h=new Float64Array(H.b(2))
g=H.f(new Array(2),o)
o=H.f(new Array(2),o)
f=new Float64Array(H.b(2))
e=new Float64Array(H.b(2))
d=new Int8Array(H.b(4))
c=new Float64Array(H.b(2))
b=new Float64Array(H.b(2))
a=V.fv()
n[0]=new V.V(new E.a(new Float64Array(H.b(2))),new V.O(new Int8Array(H.b(4))))
n[1]=new V.V(new E.a(new Float64Array(H.b(2))),new V.O(new Int8Array(H.b(4))))
g[0]=new V.V(new E.a(new Float64Array(H.b(2))),new V.O(new Int8Array(H.b(4))))
g[1]=new V.V(new E.a(new Float64Array(H.b(2))),new V.O(new Int8Array(H.b(4))))
o[0]=new V.V(new E.a(new Float64Array(H.b(2))),new V.O(new Int8Array(H.b(4))))
o[1]=new V.V(new E.a(new Float64Array(H.b(2))),new V.O(new Int8Array(H.b(4))))
this.fr=new V.f5(this,new V.cV(z,y,x,w,!1),v,new V.cW(new E.a(u),new E.a(t),0,0),new E.a(s),r,new E.a(q),new E.a(p),new V.ej(0,0),new V.ej(0,0),n,new E.a(m),new E.a(l),new E.a(k),new E.a(j),new E.a(i),new E.a(h),g,o,new E.a(f),new E.a(e),new V.O(d),new E.a(c),new E.a(b),a)
this.fx=new V.i3(V.dI(),new V.cV(V.aG(),V.aG(),G.t(),G.t(),!1),G.t(),G.t(),new V.cW(new E.a(new Float64Array(H.b(2))),new E.a(new Float64Array(H.b(2))),0,0),new V.hQ(null,null,null,new E.a(new Float64Array(H.b(2))),new E.a(new Float64Array(H.b(2))),null,null,new E.a(new Float64Array(H.b(2))),new E.a(new Float64Array(H.b(2))),new E.a(new Float64Array(H.b(2))),new E.a(new Float64Array(H.b(2))),new E.a(new Float64Array(H.b(2))),new E.a(new Float64Array(H.b(2))),new E.a(new Float64Array(H.b(2))),new E.a(new Float64Array(H.b(2))),new E.a(new Float64Array(H.b(2))),new E.a(new Float64Array(H.b(2))),G.t(),G.t(),new E.a(new Float64Array(H.b(2))),new E.a(new Float64Array(H.b(2)))),P.as(2,0,!1,P.m),new G.aw(new E.a(new Float64Array(H.b(2))),new E.a(new Float64Array(H.b(2))),new E.a(new Float64Array(H.b(2))),0,0,0),new G.aw(new E.a(new Float64Array(H.b(2))),new E.a(new Float64Array(H.b(2))),new E.a(new Float64Array(H.b(2))),0,0,0),this)
this.z=this},
F:{
fi:function(a,b){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c
z=P.m
y=P.aU(null,null,null,z,P.fB)
x=P.aU(null,null,null,z,[P.k,P.m])
w=P.aU(null,null,null,z,[P.k,E.a])
v=E.a
u=[v]
u=new V.hw(H.f(new Array(a),u),0,a,H.f(new Array(b),u))
u.b0(a,b,v)
v=E.ac
t=[v]
t=new V.hx(H.f(new Array(a),t),0,a,H.f(new Array(b),t))
t.b0(a,b,v)
v=E.a4
s=[v]
s=new V.ht(H.f(new Array(a),s),0,a,H.f(new Array(b),s))
s.b0(a,b,v)
v=V.ae
r=[v]
r=new V.hs(H.f(new Array(a),r),0,a,H.f(new Array(b),r))
r.b0(a,b,v)
v=G.b0
q=[v]
q=new V.hv(H.f(new Array(a),q),0,a,H.f(new Array(b),q))
q.b0(a,b,v)
v=E.ah
p=[v]
p=new V.hu(H.f(new Array(a),p),0,a,H.f(new Array(b),p))
p.b0(a,b,v)
v=new V.bz(new E.a(new Float64Array(H.b(2))),new E.a(new Float64Array(H.b(2))),new E.a(new Float64Array(H.b(2))),0,0,0)
o=new V.bz(new E.a(new Float64Array(H.b(2))),new E.a(new Float64Array(H.b(2))),new E.a(new Float64Array(H.b(2))),0,0,0)
n=new V.bz(new E.a(new Float64Array(H.b(2))),new E.a(new Float64Array(H.b(2))),new E.a(new Float64Array(H.b(2))),0,0,0)
m=H.f(new Array(3),[V.bz])
l=new Float64Array(H.b(2))
k=new Float64Array(H.b(2))
j=new Float64Array(H.b(2))
i=new Float64Array(H.b(2))
h=new Float64Array(H.b(2))
g=new Float64Array(H.b(2))
f=new Float64Array(H.b(2))
e=new Float64Array(H.b(2))
d=new Float64Array(H.b(2))
c=new Float64Array(H.b(2))
m[0]=v
m[1]=o
m[2]=n
z=new V.fh(u,t,s,p,r,q,y,x,w,null,null,null,null,null,null,null,null,null,null,new V.fn(new V.iX(v,o,n,m,0,new E.a(l),new E.a(k),new E.a(j),new E.a(i),new E.a(h),new E.a(g),new E.a(f),new E.a(e),new E.a(d),new E.a(c)),P.as(3,0,!1,z),P.as(3,0,!1,z),new E.a(new Float64Array(H.b(2))),new E.a(new Float64Array(H.b(2))),new E.a(new Float64Array(H.b(2))),new E.a(new Float64Array(H.b(2)))))
z.er(a,b)
return z}}},
ab:{"^":"c;$ti",
d6:function(a){var z,y,x
z=new Array(a)
z.fixed$length=Array
y=H.f(z,[H.ak(this,"ab",0)])
z=this.a
if(z!=null)C.d.a7(y,0,this.c,z,0)
for(z=y.length,x=0;x<z;++x)y[x]=this.a5()
this.a=y
this.c=z},
dj:function(){var z,y
z=this.b
y=this.c
if(z>=y)this.d6(y*2)
return this.a[this.b++]},
aN:function(a,b){this.b=0
this.a=null
this.c=0
this.d6(a)}},
Q:{"^":"c;$ti",
b0:function(a,b,c){var z,y
for(z=this.a,y=0;y<a;++y)z[y]=this.a5()}}}],["","",,F,{"^":"",
eF:function(a,b,c){var z
P.ce(b,c,a.length,null,null,null)
z=P.c1(H.dM(a,b,c,H.al(a,0)),!0,null)
C.d.bX(z,"sort")
H.b1(z,0,z.length-1,P.jl());(a&&C.d).dR(a,b,c,z)}}],["","",,N,{"^":"",eY:{"^":"fe;c,a,b",
bz:function(a,b,c){var z,y,x
this.cV(c)
for(z=J.A(a),y=this.b,x=0;x<b;++x)y.aB(z.i(a,x),z.i(a,x))
y=this.c
y.beginPath()
y.moveTo(J.T(z.i(a,0)),J.U(z.i(a,0)))
for(x=1;x<b;++x)y.lineTo(J.T(z.i(a,x)),J.U(z.i(a,x)))
y.lineTo(J.T(z.i(a,0)),J.U(z.i(a,0)))
y.closePath()},
al:function(a,b,c){var z,y,x,w
z=this.c
y=c.a
x=c.b
w=c.c
z.toString
z.strokeStyle="rgba("+y+", "+x+", "+w+", 0.9)"
w=c.a
x=c.b
y=c.c
z.fillStyle="rgba("+w+", "+x+", "+y+", 0.8)"
y=this.b
y.aB(a,a)
y.aB(b,b)
z.beginPath()
y=a.a
z.moveTo(y[0],y[1])
y=b.a
z.lineTo(y[0],y[1])
z.closePath()
z.stroke()},
cV:function(a){var z,y,x,w
z=this.c
y=a.a
x=a.b
w=a.c
z.toString
z.strokeStyle="rgba("+y+", "+x+", "+w+", 0.9)"
w=a.a
x=a.b
y=a.c
z.fillStyle="rgba("+w+", "+x+", "+y+", 0.8)"},
fJ:function(a,b,c,d){throw H.e("Unimplemented")},
fK:function(a,b,c,d){throw H.e("Unimplemented")}}}],["","",,G,{"^":"",bQ:{"^":"c;C:a>,D:b>,c",
av:function(a,b,c){this.a=C.b.a6(C.a.aM(a*255))
this.b=C.b.a6(C.a.aM(b*255))
this.c=C.b.a6(C.a.aM(c*255))}},b0:{"^":"c;a,t:b<",
G:function(a){this.a=Math.sin(a)
this.b=Math.cos(a)
return this},
m:function(a){return"Rot(s:"+H.d(this.a)+", c:"+H.d(this.b)+")"},
F:{
av:function(a,b,c){var z,y,x,w,v
z=a.a
y=b.a
x=y[0]
w=a.b
y=y[1]
v=c.a
v[0]=w*x-z*y
v[1]=z*x+w*y},
j:function(a,b,c){var z,y,x,w,v,u
z=a.b
y=b.a
x=y[0]
w=a.a
v=y[1]
u=c.a
u[0]=z*x-w*v
u[1]=w*y[0]+z*y[1]},
W:function(a,b,c){var z,y,x,w,v,u
z=a.b
y=b.a
x=y[0]
w=a.a
v=y[1]
u=c.a
u[0]=z*x+w*v
u[1]=-w*y[0]+z*y[1]}}},aw:{"^":"c;a,b,t:c<,d,l:e@,f",
m:function(a){return"Sweep:\nlocalCenter: "+this.a.m(0)+"\n"+("c0: "+this.b.m(0)+", c: "+this.c.m(0)+"\n")+("a0: "+H.d(this.d)+", a: "+H.d(this.e)+"\n")+("alpha0: "+H.d(this.f))},
Y:function(){var z=6.283185307179586*C.j.aM(this.d/6.283185307179586)
this.d-=z
this.e-=z},
K:function(a){this.a.h(a.a)
this.b.h(a.b)
this.c.h(a.c)
this.d=a.d
this.e=a.e
this.f=a.f
return this},
aA:function(a,b){var z,y,x,w,v,u
z=1-b
y=this.b.a
x=this.c.a
w=a.a.a
w[0]=z*y[0]+b*x[0]
w[1]=z*y[1]+b*x[1]
x=a.b
x.G(z*this.d+b*this.e)
z=w[0]
y=x.b
v=this.a.a
u=v[0]
x=x.a
w[0]=z-(y*u-x*v[1])
w[1]=w[1]-(x*v[0]+y*v[1])},
aR:function(a){var z,y,x,w
z=this.f
y=(a-z)/(1-z)
z=this.b.a
x=z[0]
w=this.c.a
z[0]=x+y*(w[0]-x)
x=z[1]
z[1]=x+y*(w[1]-x)
x=this.d
this.d=x+y*(this.e-x)
this.f=a}},ci:{"^":"c;a"},ia:{"^":"c;a,b",
m:function(a){var z=this.b
return"XForm:\n"+("Position: "+this.a.m(0)+"\n")+("R: \t"+("Rot(s:"+H.d(z.a)+", c:"+H.d(z.b)+")")+"\n")},
F:{
t:function(){return new G.ia(new E.a(new Float64Array(H.b(2))),new G.b0(0,1))},
r:function(a,b,c){var z,y,x,w,v,u,t
z=a.b
y=z.a
x=b.a
w=x[0]
z=z.b
x=x[1]
v=a.a.a
u=v[1]
v=v[0]
t=c.a
t[0]=z*w-y*x+v
t[1]=y*w+z*x+u},
n:function(a,b,c){var z,y,x,w,v,u,t,s
z=a.b
y=z.b
x=b.a
w=x[0]
z=z.a
v=x[1]
u=a.a.a
t=u[0]
s=c.a
s[0]=y*w-z*v+t
s[1]=z*x[0]+y*x[1]+u[1]},
cl:function(a,b,c){var z,y,x,w,v
z=b.a
y=a.a.a
x=z[0]-y[0]
w=z[1]-y[1]
y=a.b
z=y.b
y=y.a
v=c.a
v[0]=z*x+y*w
v[1]=-y*x+z*w},
e_:function(a,b,c){var z,y,x,w,v,u,t
z=a.b
y=b.b
x=c.b
w=z.b
v=y.a
u=z.a
t=y.b
x.a=w*v-u*t
x.b=w*t+z.a*y.a
y=$.$get$ck()
y.h(b.a)
y.j(a.a)
G.W(z,$.$get$ck(),c.a)}}},ig:{"^":"c;",
aB:function(a,b){var z,y,x,w,v,u,t,s,r
z=a.a
y=z[0]
x=this.c
w=this.b
v=w.a
u=v[0]
v=v[1]
z=z[1]
t=new Float64Array(H.b(2))
s=new E.a(t)
s.h(w)
s.j(this.d)
w=t[0]
t=t[1]
r=b.a
r[0]=y*x+u+w
r[1]=v-z*x+-t}}}],["","",,X,{"^":"",eZ:{"^":"ig;a,b,c,d"}}],["","",,A,{"^":"",
bD:function(a){var z,y
z=C.ac.fX(a,0,new A.js())
y=536870911&z+((67108863&z)<<3)
y^=y>>>11
return 536870911&y+((16383&y)<<15)},
js:{"^":"l:12;",
$2:function(a,b){var z=536870911&a+J.aC(b)
z=536870911&z+((524287&z)<<10)
return z^z>>>6}}}],["","",,E,{"^":"",a4:{"^":"c;a",
ba:function(a,b,c,d){var z=this.a
z[3]=d
z[2]=c
z[1]=b
z[0]=a},
h:function(a){var z,y
z=a.a
y=this.a
y[3]=z[3]
y[2]=z[2]
y[1]=z[1]
y[0]=z[0]},
m:function(a){return"[0] "+this.aW(0).m(0)+"\n[1] "+this.aW(1).m(0)+"\n"},
i:function(a,b){return this.a[b]},
p:function(a,b,c){this.a[b]=c},
a_:function(a,b){var z,y,x
if(b==null)return!1
if(b instanceof E.a4){z=this.a
y=z[0]
x=b.a
z=y===x[0]&&z[1]===x[1]&&z[2]===x[2]&&z[3]===x[3]}else z=!1
return z},
gX:function(a){return A.bD(this.a)},
aW:function(a){var z,y
z=new Float64Array(H.b(2))
y=this.a
z[0]=y[a]
z[1]=y[2+a]
return new E.a(z)},
B:function(a,b){var z,y,x
z=new Float64Array(H.b(4))
y=new E.a4(z)
y.h(this)
x=b.gf2()
z[0]=C.a.B(z[0],x.i(0,0))
z[1]=C.a.B(z[1],x.i(0,1))
z[2]=C.a.B(z[2],x.i(0,2))
z[3]=C.a.B(z[3],x.i(0,3))
return y},
I:function(){var z=this.a
z[0]=0
z[1]=0
z[2]=0
z[3]=0},
bB:function(){var z,y,x,w,v,u,t
z=this.a
y=z[0]
x=z[3]
w=z[1]
v=z[2]
u=y*x-w*v
if(u===0)return 0
t=1/u
z[0]=x*t
z[1]=-w*t
z[2]=-v*t
z[3]=y*t
return u},
j:function(a){var z,y
z=a.gf2()
y=this.a
y[0]=C.a.H(y[0],z.i(0,0))
y[1]=C.a.H(y[1],z.i(0,1))
y[2]=C.a.H(y[2],z.i(0,2))
y[3]=C.a.H(y[3],z.i(0,3))},
cc:function(a,b){var z,y,x,w,v,u,t
if(b==null){b=new E.a(new Float64Array(H.b(2)))
b.h(a)}else b.h(a)
z=b.a
y=this.a
x=y[0]
w=z[0]
v=y[2]
u=z[1]
t=y[1]
y=y[3]
z[0]=x*w+v*u
z[1]=t*w+y*u
return b},
F:{
dq:function(a,b,c){var z,y,x,w,v,u,t,s
z=a.a
y=z[0]
x=z[2]
w=z[1]
z=z[3]
v=c.a
u=v[0]
v=v[1]
t=y*z-x*w
if(t!==0)t=1/t
s=b.a
s[0]=t*(z*u-x*v)
s[1]=t*(y*v-w*u)}}},ah:{"^":"c;a",
aY:function(a,b,c,d,e,f,g,h,i){var z=this.a
z[8]=i
z[7]=h
z[6]=g
z[5]=f
z[4]=e
z[3]=d
z[2]=c
z[1]=b
z[0]=a},
h:function(a){var z,y
z=a.a
y=this.a
y[8]=z[8]
y[7]=z[7]
y[6]=z[6]
y[5]=z[5]
y[4]=z[4]
y[3]=z[3]
y[2]=z[2]
y[1]=z[1]
y[0]=z[0]},
m:function(a){return"[0] "+this.aW(0).m(0)+"\n[1] "+this.aW(1).m(0)+"\n[2] "+this.aW(2).m(0)+"\n"},
i:function(a,b){return this.a[b]},
p:function(a,b,c){this.a[b]=c},
a_:function(a,b){var z,y,x
if(b==null)return!1
if(b instanceof E.ah){z=this.a
y=z[0]
x=b.a
z=y===x[0]&&z[1]===x[1]&&z[2]===x[2]&&z[3]===x[3]&&z[4]===x[4]&&z[5]===x[5]&&z[6]===x[6]&&z[7]===x[7]&&z[8]===x[8]}else z=!1
return z},
gX:function(a){return A.bD(this.a)},
aW:function(a){var z,y
z=new Float64Array(H.b(3))
y=this.a
z[0]=y[a]
z[1]=y[3+a]
z[2]=y[6+a]
return new E.ac(z)},
B:function(a,b){var z,y,x
z=new Float64Array(H.b(9))
y=new E.ah(z)
y.h(this)
x=b.gf3()
z[0]=C.a.B(z[0],x.i(0,0))
z[1]=C.a.B(z[1],x.i(0,1))
z[2]=C.a.B(z[2],x.i(0,2))
z[3]=C.a.B(z[3],x.i(0,3))
z[4]=C.a.B(z[4],x.i(0,4))
z[5]=C.a.B(z[5],x.i(0,5))
z[6]=C.a.B(z[6],x.i(0,6))
z[7]=C.a.B(z[7],x.i(0,7))
z[8]=C.a.B(z[8],x.i(0,8))
return y},
I:function(){var z=this.a
z[0]=0
z[1]=0
z[2]=0
z[3]=0
z[4]=0
z[5]=0
z[6]=0
z[7]=0
z[8]=0},
j:function(a){var z,y
z=a.gf3()
y=this.a
y[0]=C.a.H(y[0],z.i(0,0))
y[1]=C.a.H(y[1],z.i(0,1))
y[2]=C.a.H(y[2],z.i(0,2))
y[3]=C.a.H(y[3],z.i(0,3))
y[4]=C.a.H(y[4],z.i(0,4))
y[5]=C.a.H(y[5],z.i(0,5))
y[6]=C.a.H(y[6],z.i(0,6))
y[7]=C.a.H(y[7],z.i(0,7))
y[8]=C.a.H(y[8],z.i(0,8))},
F:{
c5:function(a,b,c){var z,y,x,w,v,u,t,s,r
z=a.a
y=z[0]
x=z[3]
w=z[1]
v=z[4]
u=c.a
t=u[0]-z[6]
s=u[1]-z[7]
r=y*v-x*w
if(r!==0)r=1/r
z=b.a
z[0]=r*(v*t-x*s)
z[1]=r*(y*s-w*t)},
hb:function(a,b,c){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j
z=a.a
y=z[0]
x=z[1]
w=z[2]
v=z[3]
u=z[4]
t=z[5]
s=z[6]
r=z[7]
z=z[8]
q=u*z-t*r
p=t*s-v*z
o=v*r-u*s
n=y*q+x*p+w*o
if(n!==0)n=1/n
m=c.a
l=m[0]
k=m[1]
m=m[2]
j=b.a
j[0]=n*(l*q+k*p+m*o)
j[1]=n*(y*-(r*m-z*k)+x*-(z*l-s*m)+w*-(s*k-r*l))
j[2]=n*(y*-(k*t-m*u)+x*-(m*v-l*t)+w*-(l*u-k*v))}}},a:{"^":"c;a",
ae:function(a,b){var z=this.a
z[0]=a
z[1]=b},
I:function(){var z=this.a
z[0]=0
z[1]=0},
h:function(a){var z,y
z=a.a
y=this.a
y[1]=z[1]
y[0]=z[0]},
m:function(a){var z=this.a
return"["+H.d(z[0])+","+H.d(z[1])+"]"},
a_:function(a,b){var z,y,x
if(b==null)return!1
if(b instanceof E.a){z=this.a
y=z[0]
x=b.a
z=y===x[0]&&z[1]===x[1]}else z=!1
return z},
gX:function(a){return A.bD(this.a)},
B:function(a,b){var z=new E.a(new Float64Array(H.b(2)))
z.h(this)
z.q(0,b)
return z},
i:function(a,b){return this.a[b]},
p:function(a,b,c){this.a[b]=c},
gw:function(a){return Math.sqrt(this.gS())},
gS:function(){var z,y
z=this.a
y=z[0]
z=z[1]
return y*y+z*z},
Y:function(){var z,y,x
z=Math.sqrt(this.gS())
if(z===0)return 0
y=1/z
x=this.a
x[0]=x[0]*y
x[1]=x[1]*y
return z},
c2:function(a){var z,y,x,w,v
z=this.a
y=z[0]
x=a.a
w=y-x[0]
v=z[1]-x[1]
return w*w+v*v},
A:function(a){var z,y
z=a.a
y=this.a
return y[0]*z[0]+y[1]*z[1]},
u:function(a){var z,y
z=a.a
y=this.a
return y[0]*z[1]-y[1]*z[0]},
O:function(a,b){var z,y,x
z=this.a
y=z[1]
z=z[0]
x=b.a
x[0]=-a*y
x[1]=a*z
return b},
q:function(a,b){var z,y
z=b.a
y=this.a
y[0]=y[0]+z[0]
y[1]=y[1]+z[1]},
j:function(a){var z,y
z=a.a
y=this.a
y[0]=y[0]-z[0]
y[1]=y[1]-z[1]},
E:function(a,b){var z=this.a
z[1]=z[1]*b
z[0]=z[0]*b},
J:function(){var z=this.a
z[1]=-z[1]
z[0]=-z[0]},
sC:function(a,b){this.a[0]=b
return b},
sD:function(a,b){this.a[1]=b
return b},
gC:function(a){return this.a[0]},
gD:function(a){return this.a[1]},
F:{
ed:function(){return new E.a(new Float64Array(H.b(2)))}}},ac:{"^":"c;a",
cu:function(a,b,c){var z=this.a
z[0]=a
z[1]=b
z[2]=c},
I:function(){var z=this.a
z[2]=0
z[1]=0
z[0]=0},
h:function(a){var z,y
z=a.a
y=this.a
y[0]=z[0]
y[1]=z[1]
y[2]=z[2]},
m:function(a){var z=this.a
return"["+H.d(z[0])+","+H.d(z[1])+","+H.d(z[2])+"]"},
a_:function(a,b){var z,y,x
if(b==null)return!1
if(b instanceof E.ac){z=this.a
y=z[0]
x=b.a
z=y===x[0]&&z[1]===x[1]&&z[2]===x[2]}else z=!1
return z},
gX:function(a){return A.bD(this.a)},
B:function(a,b){var z=new E.ac(new Float64Array(H.b(3)))
z.h(this)
z.q(0,b)
return z},
i:function(a,b){return this.a[b]},
p:function(a,b,c){this.a[b]=c},
gw:function(a){return Math.sqrt(this.gS())},
gS:function(){var z,y,x
z=this.a
y=z[0]
x=z[1]
z=z[2]
return y*y+x*x+z*z},
q:function(a,b){var z,y
z=b.a
y=this.a
y[0]=y[0]+z[0]
y[1]=y[1]+z[1]
y[2]=y[2]+z[2]},
j:function(a){var z,y
z=a.a
y=this.a
y[0]=y[0]-z[0]
y[1]=y[1]-z[1]
y[2]=y[2]-z[2]},
E:function(a,b){var z=this.a
z[2]=z[2]*b
z[1]=z[1]*b
z[0]=z[0]*b},
J:function(){var z=this.a
z[2]=-z[2]
z[1]=-z[1]
z[0]=-z[0]},
gC:function(a){return this.a[0]},
gD:function(a){return this.a[1]}}}],["","",,Q,{"^":"",fj:{"^":"c;",
hJ:[function(a,b){var z,y,x,w,v,u,t
z=this.c
y=z.b
z.a=y==null?$.v.$0():y
y=this.b
x=y.id.a
w=x.b
x.a=w==null?$.v.$0():w
w=y.k1.a
v=w.b
w.a=v==null?$.v.$0():v
v=y.a
if((v&1)===1){v=y.b
v.a.ce(v)
v=y.a&=4294967294}y.a=v|2
v=y.go
v.a=0.016666666666666666
v.d=10
v.e=10
v.b=60
v.c=y.cx*0.016666666666666666
v.f=y.cy
u=y.fr.b
t=w.b
if(t==null)t=$.v.$0()
u.au(C.b.aD((t-w.a)*1000,$.B))
u=w.b
w.a=u==null?$.v.$0():u
y.b.fl()
u=y.fr.c
t=w.b
if(t==null)t=$.v.$0()
u.au(C.b.aD((t-w.a)*1000,$.B))
if(y.dy&&v.a>0){u=w.b
w.a=u==null?$.v.$0():u
y.fx.bI(v)
u=y.fr.d
t=w.b
if(t==null)t=$.v.$0()
u.au(C.b.aD((t-w.a)*1000,$.B))
u=w.b
w.a=u==null?$.v.$0():u
y.bI(v)
u=y.fr.e
t=w.b
if(t==null)t=$.v.$0()
u.au(C.b.aD((t-w.a)*1000,$.B))}if(y.db&&v.a>0){u=w.b
w.a=u==null?$.v.$0():u
y.e4(v)
u=y.fr.z
t=w.b
if(t==null)t=$.v.$0()
u.au(C.b.aD((t-w.a)*1000,$.B))}if(v.a>0)y.cx=v.b
if((y.a&4)===4)y.fj()
y.a&=4294967293
w=y.fr.a
v=x.b
if(v==null)v=$.v.$0()
w.au(C.b.aD((v-x.a)*1000,$.B))
x=z.b
if(x==null)x=$.v.$0()
this.Q=C.b.aD((x-z.a)*1e6,$.B)
this.f.clearRect(0,0,900,600)
y.fI()
this.y=this.y+1
y=window
C.u.cN(y)
C.u.cT(y,W.es(this.gcA(this)))},"$1","gcA",2,0,13],
h2:function(){var z,y,x,w
z=H.q(W.iA("canvas",null),"$iscP")
z.width=900
z.height=600
this.e=z
y=document
y.body.appendChild(z)
z=this.e
z.toString
this.f=z.getContext("2d")
z=new Float64Array(H.b(2))
x=new E.a(z)
z[0]=450
z[1]=300
z=new E.a(new Float64Array(H.b(2)))
z.h(x)
w=new E.a(new Float64Array(H.b(2)))
w.h(x)
w=new X.eZ(null,z,20,w)
w.a=!0
w.c=this.d
this.r=w
w=new N.eY(this.f,2,w)
this.x=w
this.b.Q=w
this.y=0
this.z=y.querySelector("#fps-counter")
this.ch=y.querySelector("#world-step-time")
P.dY(P.d_(0,0,0,0,0,1),new Q.fk(this))
P.dY(P.d_(0,0,0,200,0,0),new Q.fl(this))},
es:function(a,b,c){J.bH(document.querySelector("#title"),a)}},fk:{"^":"l:5;a",
$1:function(a){var z=this.a
J.bH(z.z,J.a9(z.y))
z.y=0}},fl:{"^":"l:5;a",
$1:function(a){var z,y
z=this.a
y=z.Q
if(y==null)return
J.bH(z.ch,H.d(y/1000)+" ms")}}}],["","",,Y,{"^":"",
ln:[function(){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2,a3,a4,a5,a6,a7,a8,a9,b0,b1,b2,b3,b4,b5,b6,b7,b8,b9,c0,c1,c2,c3,c4,c5,c6,c7,c8,c9,d0,d1,d2
z=[V.b9]
y=H.f([],z)
x=new Float64Array(H.b(2))
x[0]=0
x[1]=-10
w=V.fi(100,10)
v=V.fg(V.ft())
u=V.ir(4,4)
t=new P.bv(0,0)
if($.B==null){H.bq()
$.B=$.au}t.bs(0)
s=new P.bv(0,0)
if($.B==null){H.bq()
$.B=$.au}s.bs(0)
r=G.t()
q=new Float64Array(H.b(2))
p=new Float64Array(H.b(2))
o=P.m
n=[P.k,E.a]
m=P.aU(null,null,null,o,n)
l=new Float64Array(H.b(2))
k=new Float64Array(H.b(2))
j=new Float64Array(H.b(2))
i=new Float64Array(H.b(2))
h=new Float64Array(H.b(2))
g=V.bg()
f=V.bg()
e=new Float64Array(H.b(2))
d=new Float64Array(H.b(2))
c=H.f(new Array(10),z)
b=new P.bv(0,0)
if($.B==null){H.bq()
$.B=$.au}b.bs(0)
a=V.bg()
a0=V.bg()
a1=new Float64Array(H.b(2))
a2=new Float64Array(H.b(2))
a3=V.aG()
a4=V.aG()
a5=new Float64Array(H.b(2))
a6=new Float64Array(H.b(2))
a7=new Float64Array(H.b(2))
a8=new Float64Array(H.b(2))
a9=new Float64Array(H.b(2))
b0=new Float64Array(H.b(2))
z=H.f(new Array(2),z)
b1=new Float64Array(H.b(2))
b2=new Float64Array(H.b(2))
b3=new Float64Array(H.b(2))
b4=new Float64Array(H.b(2))
b5=new Float64Array(H.b(2))
b6=new Float64Array(H.b(2))
b7=new Float64Array(H.b(2))
b8=new Float64Array(H.b(2))
b9=C.b.a6(C.b.aM(102))
c0=C.b.a6(C.b.aM(102))
c1=C.b.a6(C.b.aM(255))
c2=new Float64Array(H.b(2))
c3=new Float64Array(H.b(2))
c4=new Float64Array(H.b(2))
c5=new Float64Array(H.b(2))
n=P.aU(null,null,null,o,n)
o=new E.a(new Float64Array(H.b(2)))
o.h(new E.a(x))
c6=new V.il(0,null,null,null,0,0,o,!1,null,null,null,w,0,!1,!1,!1,!1,null,null,u,new V.dV(0,0,0,0,0,!1),new G.ci(t),new G.ci(s),new G.bQ(0,0,0),r,new E.a(q),new E.a(p),new V.ec(m),new V.ip(null,null),new V.iq(new V.dF(new E.a(l),0),new E.a(k),new E.a(j),null,null),new V.cf(new E.a(i),new E.a(h),0),new V.da(null,null,null,null,null,null,0,0,0,0,0,0,g,new V.dJ(null,null,null),new V.bh(null,null,0,null,null),f,new V.bh(null,null,0,null,null),new V.cR(e,d,0)),c,new G.ci(b),new V.da(null,null,null,null,null,null,0,0,0,0,0,0,a,new V.dJ(null,null,null),new V.bh(null,null,0,null,null),a0,new V.bh(null,null,0,null,null),new V.cR(a1,a2,0)),new V.hZ(a3,a4,new G.aw(new E.a(a5),new E.a(a6),new E.a(a7),0,0,0),new G.aw(new E.a(a8),new E.a(a9),new E.a(b0),0,0,0),0),new V.i_(C.P,0),new V.dV(0,0,0,0,0,!1),z,new G.aw(new E.a(b1),new E.a(b2),new E.a(b3),0,0,0),new G.aw(new E.a(b4),new E.a(b5),new E.a(b6),0,0,0),0.12,-1,new E.a(b7),new E.a(b8),new G.bQ(b9,c0,c1),new E.a(c2),new E.a(c3),new E.a(c4),new E.a(c5),new V.ec(n))
c6.cy=!0
c6.db=!0
c6.dy=!0
c6.x=!0
c6.a=4
c6.b=V.fa(c6,v)
c6.fr=new V.hJ(new V.a5(0,0,17976931348623157e292,-17976931348623157e292,0),new V.a5(0,0,17976931348623157e292,-17976931348623157e292,0),new V.a5(0,0,17976931348623157e292,-17976931348623157e292,0),new V.a5(0,0,17976931348623157e292,-17976931348623157e292,0),new V.a5(0,0,17976931348623157e292,-17976931348623157e292,0),new V.a5(0,0,17976931348623157e292,-17976931348623157e292,0),new V.a5(0,0,17976931348623157e292,-17976931348623157e292,0),new V.a5(0,0,17976931348623157e292,-17976931348623157e292,0),new V.a5(0,0,17976931348623157e292,-17976931348623157e292,0),new V.a5(0,0,17976931348623157e292,-17976931348623157e292,0))
c6.fx=V.hB(c6)
c6.eX()
v=new P.bv(0,0)
if($.B==null){H.bq()
$.B=$.au}v.bs(0)
c7=new Y.fD(null,null,y,c6,v,10,null,null,null,null,null,null,null,null)
c7.es("FrictionJoint test",null,10)
c8=V.ca()
z=new Float64Array(H.b(2))
x=new Float64Array(H.b(2))
z[0]=0
z[1]=0
c7.cx=c6.bZ(new V.bK(C.e,null,new E.a(z),0,new E.a(x),0,0,0,!0,!0,!1,!1,!0,1))
c8.dP(50,0.4)
c7.cx.c0(c8)
x=new Float64Array(H.b(2))
x[0]=-20
x[1]=0
c8.bF(0.4,50,new E.a(x),0)
c7.cx.c0(c8)
x=new Float64Array(H.b(2))
x[0]=20
x[1]=0
c8.bF(0.4,50,new E.a(x),0)
c7.cx.c0(c8)
y.push(c7.cx)
c9=V.ca()
c9.bF(3,1.5,new E.a(new Float64Array(H.b(2))),1.5707963267948966)
x=new V.d7(null,null,0.2,0,0,!1,new V.bW(1,65535,0))
c7.cy=x
x.d=0.5
x.e=0.1
x.a=c9
d0=new V.bK(C.e,null,new E.a(new Float64Array(H.b(2))),0,new E.a(new Float64Array(H.b(2))),0,0,0,!0,!0,!1,!1,!0,1)
d0.a=C.f
x=new Float64Array(H.b(2))
x[0]=-10
x[1]=30
d0.c=new E.a(x)
d1=c6.bZ(d0)
d1.c_(c7.cy)
y.push(d1)
d0=new V.bK(C.e,null,new E.a(new Float64Array(H.b(2))),0,new E.a(new Float64Array(H.b(2))),0,0,0,!0,!0,!1,!1,!0,1)
d0.a=C.f
x=new Float64Array(H.b(2))
x[0]=10
x[1]=30
d0.c=new E.a(x)
d1=c6.bZ(d0)
d1.c_(c7.cy)
d2=new V.d8(new E.a(new Float64Array(H.b(2))),new E.a(new Float64Array(H.b(2))),0,0,null,null,null,null,!1)
d2.a=C.w
d2.c=d1
d2.d=c7.cx
d2.x=3
d2.y=5
d2.e=!0
c6.fz(d2)
y.push(d1)
c7.h2()
c7.x.a|=4
y=window
C.u.cN(y)
C.u.cT(y,W.es(c7.gcA(c7)))},"$0","ex",0,0,2],
fD:{"^":"fj;cx,cy,a,b,c,d,e,f,r,x,y,z,Q,ch"}},1],["","",,O,{"^":""}]]
setupProgram(dart,0,0)
J.u=function(a){if(typeof a=="number"){if(Math.floor(a)==a)return J.df.prototype
return J.de.prototype}if(typeof a=="string")return J.aX.prototype
if(a==null)return J.dg.prototype
if(typeof a=="boolean")return J.fX.prototype
if(a.constructor==Array)return J.aV.prototype
if(typeof a!="object"){if(typeof a=="function")return J.aY.prototype
return a}if(a instanceof P.c)return a
return J.bC(a)}
J.A=function(a){if(typeof a=="string")return J.aX.prototype
if(a==null)return a
if(a.constructor==Array)return J.aV.prototype
if(typeof a!="object"){if(typeof a=="function")return J.aY.prototype
return a}if(a instanceof P.c)return a
return J.bC(a)}
J.b7=function(a){if(a==null)return a
if(a.constructor==Array)return J.aV.prototype
if(typeof a!="object"){if(typeof a=="function")return J.aY.prototype
return a}if(a instanceof P.c)return a
return J.bC(a)}
J.cz=function(a){if(typeof a=="number")return J.aW.prototype
if(a==null)return a
if(!(a instanceof P.c))return J.b4.prototype
return a}
J.ey=function(a){if(typeof a=="number")return J.aW.prototype
if(typeof a=="string")return J.aX.prototype
if(a==null)return a
if(!(a instanceof P.c))return J.b4.prototype
return a}
J.jp=function(a){if(typeof a=="string")return J.aX.prototype
if(a==null)return a
if(!(a instanceof P.c))return J.b4.prototype
return a}
J.J=function(a){if(a==null)return a
if(typeof a!="object"){if(typeof a=="function")return J.aY.prototype
return a}if(a instanceof P.c)return a
return J.bC(a)}
J.eK=function(a,b){if(typeof a=="number"&&typeof b=="number")return a+b
return J.ey(a).B(a,b)}
J.Z=function(a,b){if(a==null)return b==null
if(typeof a!="object")return b!=null&&a===b
return J.u(a).a_(a,b)}
J.a_=function(a,b){if(typeof a=="number"&&typeof b=="number")return a>b
return J.cz(a).br(a,b)}
J.cF=function(a,b){if(typeof a=="number"&&typeof b=="number")return a<b
return J.cz(a).L(a,b)}
J.cG=function(a,b){if(typeof b==="number")if(a.constructor==Array||typeof a=="string"||H.eB(a,a[init.dispatchPropertyName]))if(b>>>0===b&&b<a.length)return a[b]
return J.A(a).i(a,b)}
J.eL=function(a,b,c){if(typeof b==="number")if((a.constructor==Array||H.eB(a,a[init.dispatchPropertyName]))&&!a.immutable$list&&b>>>0===b&&b<a.length)return a[b]=c
return J.b7(a).p(a,b,c)}
J.eM=function(a,b){return J.ey(a).b5(a,b)}
J.cH=function(a,b){return J.b7(a).am(a,b)}
J.eN=function(a){return J.J(a).gfg(a)}
J.aC=function(a){return J.u(a).gX(a)}
J.aS=function(a){return J.b7(a).ga2(a)}
J.am=function(a){return J.A(a).gw(a)}
J.eO=function(a){return J.J(a).gb8(a)}
J.eP=function(a){return J.J(a).ghh(a)}
J.eQ=function(a){return J.J(a).ghu(a)}
J.T=function(a){return J.J(a).gC(a)}
J.U=function(a){return J.J(a).gD(a)}
J.eR=function(a,b){return J.b7(a).dh(a,b)}
J.eS=function(a){return J.b7(a).hn(a)}
J.eT=function(a,b){return J.J(a).aC(a,b)}
J.cI=function(a,b){return J.J(a).saw(a,b)}
J.bH=function(a,b){return J.J(a).sdf(a,b)}
J.cJ=function(a,b){return J.J(a).sb8(a,b)}
J.bI=function(a,b){return J.J(a).sC(a,b)}
J.bJ=function(a,b){return J.J(a).sD(a,b)}
J.cK=function(a){return J.cz(a).a6(a)}
J.eU=function(a){return J.jp(a).hy(a)}
J.a9=function(a){return J.u(a).m(a)}
I.aA=function(a){a.immutable$list=Array
a.fixed$length=Array
return a}
var $=I.p
C.E=W.bL.prototype
C.T=J.h.prototype
C.d=J.aV.prototype
C.j=J.de.prototype
C.b=J.df.prototype
C.c=J.dg.prototype
C.a=J.aW.prototype
C.v=J.aX.prototype
C.a_=J.aY.prototype
C.ac=H.hn.prototype
C.O=J.hE.prototype
C.R=W.i0.prototype
C.D=J.b4.prototype
C.u=W.ik.prototype
C.e=new V.bM(0,"BodyType.STATIC")
C.F=new V.bM(1,"BodyType.KINEMATIC")
C.f=new V.bM(2,"BodyType.DYNAMIC")
C.l=new P.iQ()
C.G=new P.aH(0)
C.p=new V.bT(0,"EPAxisType.UNKNOWN")
C.q=new V.bT(1,"EPAxisType.EDGE_A")
C.H=new V.bT(2,"EPAxisType.EDGE_B")
C.U=function(hooks) {
  if (typeof dartExperimentalFixupGetTag != "function") return hooks;
  hooks.getTag = dartExperimentalFixupGetTag(hooks.getTag);
}
C.V=function(hooks) {
  var userAgent = typeof navigator == "object" ? navigator.userAgent : "";
  if (userAgent.indexOf("Firefox") == -1) return hooks;
  var getTag = hooks.getTag;
  var quickMap = {
    "BeforeUnloadEvent": "Event",
    "DataTransfer": "Clipboard",
    "GeoGeolocation": "Geolocation",
    "Location": "!Location",
    "WorkerMessageEvent": "MessageEvent",
    "XMLDocument": "!Document"};
  function getTagFirefox(o) {
    var tag = getTag(o);
    return quickMap[tag] || tag;
  }
  hooks.getTag = getTagFirefox;
}
C.I=function(hooks) { return hooks; }

C.W=function(getTagFallback) {
  return function(hooks) {
    if (typeof navigator != "object") return hooks;
    var ua = navigator.userAgent;
    if (ua.indexOf("DumpRenderTree") >= 0) return hooks;
    if (ua.indexOf("Chrome") >= 0) {
      function confirm(p) {
        return typeof window == "object" && window[p] && window[p].name == p;
      }
      if (confirm("Window") && confirm("HTMLElement")) return hooks;
    }
    hooks.getTag = getTagFallback;
  };
}
C.X=function() {
  var toStringFunction = Object.prototype.toString;
  function getTag(o) {
    var s = toStringFunction.call(o);
    return s.substring(8, s.length - 1);
  }
  function getUnknownTag(object, tag) {
    if (/^HTML[A-Z].*Element$/.test(tag)) {
      var name = toStringFunction.call(object);
      if (name == "[object Object]") return null;
      return "HTMLElement";
    }
  }
  function getUnknownTagGenericBrowser(object, tag) {
    if (self.HTMLElement && object instanceof HTMLElement) return "HTMLElement";
    return getUnknownTag(object, tag);
  }
  function prototypeForTag(tag) {
    if (typeof window == "undefined") return null;
    if (typeof window[tag] == "undefined") return null;
    var constructor = window[tag];
    if (typeof constructor != "function") return null;
    return constructor.prototype;
  }
  function discriminator(tag) { return null; }
  var isBrowser = typeof navigator == "object";
  return {
    getTag: getTag,
    getUnknownTag: isBrowser ? getUnknownTagGenericBrowser : getUnknownTag,
    prototypeForTag: prototypeForTag,
    discriminator: discriminator };
}
C.Y=function(hooks) {
  var userAgent = typeof navigator == "object" ? navigator.userAgent : "";
  if (userAgent.indexOf("Trident/") == -1) return hooks;
  var getTag = hooks.getTag;
  var quickMap = {
    "BeforeUnloadEvent": "Event",
    "DataTransfer": "Clipboard",
    "HTMLDDElement": "HTMLElement",
    "HTMLDTElement": "HTMLElement",
    "HTMLPhraseElement": "HTMLElement",
    "Position": "Geoposition"
  };
  function getTagIE(o) {
    var tag = getTag(o);
    var newTag = quickMap[tag];
    if (newTag) return newTag;
    if (tag == "Object") {
      if (window.DataView && (o instanceof window.DataView)) return "DataView";
    }
    return tag;
  }
  function prototypeForTagIE(tag) {
    var constructor = window[tag];
    if (constructor == null) return null;
    return constructor.prototype;
  }
  hooks.getTag = getTagIE;
  hooks.prototypeForTag = prototypeForTagIE;
}
C.Z=function(hooks) {
  var getTag = hooks.getTag;
  var prototypeForTag = hooks.prototypeForTag;
  function getTagFixed(o) {
    var tag = getTag(o);
    if (tag == "Document") {
      if (!!o.xmlVersion) return "!Document";
      return "!HTMLDocument";
    }
    return tag;
  }
  function prototypeForTagFixed(tag) {
    if (tag == "Document") return null;
    return prototypeForTag(tag);
  }
  hooks.getTag = getTagFixed;
  hooks.prototypeForTag = prototypeForTagFixed;
}
C.J=function getTagFallback(o) {
  var s = Object.prototype.toString.call(o);
  return s.substring(8, s.length - 1);
}
C.a0=new V.L(0,"JointType.UNKNOWN")
C.a1=new V.L(1,"JointType.REVOLUTE")
C.a2=new V.L(10,"JointType.ROPE")
C.K=new V.L(11,"JointType.CONSTANT_VOLUME")
C.a3=new V.L(12,"JointType.MOTOR")
C.a4=new V.L(2,"JointType.PRISMATIC")
C.L=new V.L(3,"JointType.DISTANCE")
C.M=new V.L(4,"JointType.PULLEY")
C.N=new V.L(5,"JointType.MOUSE")
C.a5=new V.L(6,"JointType.GEAR")
C.a6=new V.L(7,"JointType.WHEEL")
C.a7=new V.L(8,"JointType.WELD")
C.w=new V.L(9,"JointType.FRICTION")
C.m=new V.di(0,"LimitState.INACTIVE")
C.a8=new V.di(2,"LimitState.AT_UPPER")
C.a9=H.f(I.aA(["*::class","*::dir","*::draggable","*::hidden","*::id","*::inert","*::itemprop","*::itemref","*::itemscope","*::lang","*::spellcheck","*::title","*::translate","A::accesskey","A::coords","A::hreflang","A::name","A::shape","A::tabindex","A::target","A::type","AREA::accesskey","AREA::alt","AREA::coords","AREA::nohref","AREA::shape","AREA::tabindex","AREA::target","AUDIO::controls","AUDIO::loop","AUDIO::mediagroup","AUDIO::muted","AUDIO::preload","BDO::dir","BODY::alink","BODY::bgcolor","BODY::link","BODY::text","BODY::vlink","BR::clear","BUTTON::accesskey","BUTTON::disabled","BUTTON::name","BUTTON::tabindex","BUTTON::type","BUTTON::value","CANVAS::height","CANVAS::width","CAPTION::align","COL::align","COL::char","COL::charoff","COL::span","COL::valign","COL::width","COLGROUP::align","COLGROUP::char","COLGROUP::charoff","COLGROUP::span","COLGROUP::valign","COLGROUP::width","COMMAND::checked","COMMAND::command","COMMAND::disabled","COMMAND::label","COMMAND::radiogroup","COMMAND::type","DATA::value","DEL::datetime","DETAILS::open","DIR::compact","DIV::align","DL::compact","FIELDSET::disabled","FONT::color","FONT::face","FONT::size","FORM::accept","FORM::autocomplete","FORM::enctype","FORM::method","FORM::name","FORM::novalidate","FORM::target","FRAME::name","H1::align","H2::align","H3::align","H4::align","H5::align","H6::align","HR::align","HR::noshade","HR::size","HR::width","HTML::version","IFRAME::align","IFRAME::frameborder","IFRAME::height","IFRAME::marginheight","IFRAME::marginwidth","IFRAME::width","IMG::align","IMG::alt","IMG::border","IMG::height","IMG::hspace","IMG::ismap","IMG::name","IMG::usemap","IMG::vspace","IMG::width","INPUT::accept","INPUT::accesskey","INPUT::align","INPUT::alt","INPUT::autocomplete","INPUT::autofocus","INPUT::checked","INPUT::disabled","INPUT::inputmode","INPUT::ismap","INPUT::list","INPUT::max","INPUT::maxlength","INPUT::min","INPUT::multiple","INPUT::name","INPUT::placeholder","INPUT::readonly","INPUT::required","INPUT::size","INPUT::step","INPUT::tabindex","INPUT::type","INPUT::usemap","INPUT::value","INS::datetime","KEYGEN::disabled","KEYGEN::keytype","KEYGEN::name","LABEL::accesskey","LABEL::for","LEGEND::accesskey","LEGEND::align","LI::type","LI::value","LINK::sizes","MAP::name","MENU::compact","MENU::label","MENU::type","METER::high","METER::low","METER::max","METER::min","METER::value","OBJECT::typemustmatch","OL::compact","OL::reversed","OL::start","OL::type","OPTGROUP::disabled","OPTGROUP::label","OPTION::disabled","OPTION::label","OPTION::selected","OPTION::value","OUTPUT::for","OUTPUT::name","P::align","PRE::width","PROGRESS::max","PROGRESS::min","PROGRESS::value","SELECT::autocomplete","SELECT::disabled","SELECT::multiple","SELECT::name","SELECT::required","SELECT::size","SELECT::tabindex","SOURCE::type","TABLE::align","TABLE::bgcolor","TABLE::border","TABLE::cellpadding","TABLE::cellspacing","TABLE::frame","TABLE::rules","TABLE::summary","TABLE::width","TBODY::align","TBODY::char","TBODY::charoff","TBODY::valign","TD::abbr","TD::align","TD::axis","TD::bgcolor","TD::char","TD::charoff","TD::colspan","TD::headers","TD::height","TD::nowrap","TD::rowspan","TD::scope","TD::valign","TD::width","TEXTAREA::accesskey","TEXTAREA::autocomplete","TEXTAREA::cols","TEXTAREA::disabled","TEXTAREA::inputmode","TEXTAREA::name","TEXTAREA::placeholder","TEXTAREA::readonly","TEXTAREA::required","TEXTAREA::rows","TEXTAREA::tabindex","TEXTAREA::wrap","TFOOT::align","TFOOT::char","TFOOT::charoff","TFOOT::valign","TH::abbr","TH::align","TH::axis","TH::bgcolor","TH::char","TH::charoff","TH::colspan","TH::headers","TH::height","TH::nowrap","TH::rowspan","TH::scope","TH::valign","TH::width","THEAD::align","THEAD::char","THEAD::charoff","THEAD::valign","TR::align","TR::bgcolor","TR::char","TR::charoff","TR::valign","TRACK::default","TRACK::kind","TRACK::label","TRACK::srclang","UL::compact","UL::type","VIDEO::controls","VIDEO::height","VIDEO::loop","VIDEO::mediagroup","VIDEO::muted","VIDEO::preload","VIDEO::width"]),[P.z])
C.aa=I.aA(["HEAD","AREA","BASE","BASEFONT","BR","COL","COLGROUP","EMBED","FRAME","FRAMESET","HR","IMAGE","IMG","INPUT","ISINDEX","LINK","META","PARAM","SOURCE","STYLE","TITLE","WBR"])
C.ab=I.aA([])
C.x=H.f(I.aA(["bind","if","ref","repeat","syntax"]),[P.z])
C.y=H.f(I.aA(["A::href","AREA::href","BLOCKQUOTE::cite","BODY::background","COMMAND::icon","DEL::cite","FORM::action","IMG::src","INPUT::src","INS::cite","Q::cite","VIDEO::poster"]),[P.z])
C.n=new V.c2(0,"ManifoldType.CIRCLES")
C.h=new V.c2(1,"ManifoldType.FACE_A")
C.r=new V.c2(2,"ManifoldType.FACE_B")
C.z=new V.cg(0,"SeparationFunctionType.POINTS")
C.A=new V.cg(1,"SeparationFunctionType.FACE_A")
C.B=new V.cg(2,"SeparationFunctionType.FACE_B")
C.k=new V.bu(0,"ShapeType.CIRCLE")
C.o=new V.bu(1,"ShapeType.EDGE")
C.i=new V.bu(2,"ShapeType.POLYGON")
C.t=new V.bu(3,"ShapeType.CHAIN")
C.P=new V.b3(0,"TOIOutputState.UNKNOWN")
C.Q=new V.b3(1,"TOIOutputState.FAILED")
C.ad=new V.b3(2,"TOIOutputState.OVERLAPPED")
C.C=new V.b3(3,"TOIOutputState.TOUCHING")
C.ae=new V.b3(4,"TOIOutputState.SEPARATED")
C.S=new V.ie(0,"VertexType.ISOLATED")
$.dA="$cachedFunction"
$.dB="$cachedInvocation"
$.au=null
$.v=null
$.a0=0
$.aE=null
$.cN=null
$.cB=null
$.et=null
$.eE=null
$.bA=null
$.bE=null
$.cC=null
$.ay=null
$.aO=null
$.aP=null
$.cu=!1
$.R=C.l
$.d4=0
$.B=null
$.aa=null
$.bU=null
$.d2=null
$.d1=null
$.cX=0
$.cY=0
$.cZ=20
$.dQ=0
$.dR=0
$.dS=0
$.dU=0
$.dT=0
$.jQ=1
$=null
init.isHunkLoaded=function(a){return!!$dart_deferred_initializers$[a]}
init.deferredInitialized=new Object(null)
init.isHunkInitialized=function(a){return init.deferredInitialized[a]}
init.initializeLoadedHunk=function(a){var z=$dart_deferred_initializers$[a]
if(z==null)throw"DeferredLoading state error: code with hash '"+a+"' was not loaded"
z($globals$,$)
init.deferredInitialized[a]=true}
init.deferredLibraryUris={}
init.deferredLibraryHashes={};(function(a){for(var z=0;z<a.length;){var y=a[z++]
var x=a[z++]
var w=a[z++]
I.$lazy(y,x,w)}})(["cU","$get$cU",function(){return H.ez("_$dart_dartClosure")},"bY","$get$bY",function(){return H.ez("_$dart_js")},"db","$get$db",function(){return H.fR()},"dc","$get$dc",function(){if(typeof WeakMap=="function")var z=new WeakMap()
else{z=$.d4
$.d4=z+1
z="expando$key$"+z}return new P.fz(null,z)},"e0","$get$e0",function(){return H.a7(H.bw({
toString:function(){return"$receiver$"}}))},"e1","$get$e1",function(){return H.a7(H.bw({$method$:null,
toString:function(){return"$receiver$"}}))},"e2","$get$e2",function(){return H.a7(H.bw(null))},"e3","$get$e3",function(){return H.a7(function(){var $argumentsExpr$='$arguments$'
try{null.$method$($argumentsExpr$)}catch(z){return z.message}}())},"e7","$get$e7",function(){return H.a7(H.bw(void 0))},"e8","$get$e8",function(){return H.a7(function(){var $argumentsExpr$='$arguments$'
try{(void 0).$method$($argumentsExpr$)}catch(z){return z.message}}())},"e5","$get$e5",function(){return H.a7(H.e6(null))},"e4","$get$e4",function(){return H.a7(function(){try{null.$method$}catch(z){return z.message}}())},"ea","$get$ea",function(){return H.a7(H.e6(void 0))},"e9","$get$e9",function(){return H.a7(function(){try{(void 0).$method$}catch(z){return z.message}}())},"cn","$get$cn",function(){return P.is()},"aQ","$get$aQ",function(){return[]},"el","$get$el",function(){return P.dk(["A","ABBR","ACRONYM","ADDRESS","AREA","ARTICLE","ASIDE","AUDIO","B","BDI","BDO","BIG","BLOCKQUOTE","BR","BUTTON","CANVAS","CAPTION","CENTER","CITE","CODE","COL","COLGROUP","COMMAND","DATA","DATALIST","DD","DEL","DETAILS","DFN","DIR","DIV","DL","DT","EM","FIELDSET","FIGCAPTION","FIGURE","FONT","FOOTER","FORM","H1","H2","H3","H4","H5","H6","HEADER","HGROUP","HR","I","IFRAME","IMG","INPUT","INS","KBD","LABEL","LEGEND","LI","MAP","MARK","MENU","METER","NAV","NOBR","OL","OPTGROUP","OPTION","OUTPUT","P","PRE","PROGRESS","Q","S","SAMP","SECTION","SELECT","SMALL","SOURCE","SPAN","STRIKE","STRONG","SUB","SUMMARY","SUP","TABLE","TBODY","TD","TEXTAREA","TFOOT","TH","THEAD","TIME","TR","TRACK","TT","U","UL","VAR","VIDEO","WBR"],null)},"cr","$get$cr",function(){return P.dj()},"ao","$get$ao",function(){return E.ed()},"ck","$get$ck",function(){return E.ed()}])
I=I.$finishIsolateConstructor(I)
$=new I()
init.metadata=[]
init.types=[{func:1},{func:1,args:[,]},{func:1,v:true},{func:1,v:true,args:[{func:1,v:true}]},{func:1,ret:P.z,args:[P.m]},{func:1,args:[P.dW]},{func:1,ret:P.cw,args:[W.ap,P.z,P.z,W.cq]},{func:1,args:[,P.z]},{func:1,args:[P.z]},{func:1,args:[{func:1,v:true}]},{func:1,args:[,,]},{func:1,v:true,args:[W.p,W.p]},{func:1,args:[P.m,P.c]},{func:1,v:true,args:[P.S]},{func:1,ret:P.S},{func:1,ret:P.m,args:[P.x,P.x]},{func:1,ret:E.a},{func:1,ret:P.c},{func:1,ret:V.c9}]
function convertToFastObject(a){function MyClass(){}MyClass.prototype=a
new MyClass()
return a}function convertToSlowObject(a){a.__MAGIC_SLOW_PROPERTY=1
delete a.__MAGIC_SLOW_PROPERTY
return a}A=convertToFastObject(A)
B=convertToFastObject(B)
C=convertToFastObject(C)
D=convertToFastObject(D)
E=convertToFastObject(E)
F=convertToFastObject(F)
G=convertToFastObject(G)
H=convertToFastObject(H)
J=convertToFastObject(J)
K=convertToFastObject(K)
L=convertToFastObject(L)
M=convertToFastObject(M)
N=convertToFastObject(N)
O=convertToFastObject(O)
P=convertToFastObject(P)
Q=convertToFastObject(Q)
R=convertToFastObject(R)
S=convertToFastObject(S)
T=convertToFastObject(T)
U=convertToFastObject(U)
V=convertToFastObject(V)
W=convertToFastObject(W)
X=convertToFastObject(X)
Y=convertToFastObject(Y)
Z=convertToFastObject(Z)
function init(){I.p=Object.create(null)
init.allClasses=map()
init.getTypeFromName=function(a){return init.allClasses[a]}
init.interceptorsByTag=map()
init.leafTags=map()
init.finishedClasses=map()
I.$lazy=function(a,b,c,d,e){if(!init.lazies)init.lazies=Object.create(null)
init.lazies[a]=b
e=e||I.p
var z={}
var y={}
e[a]=z
e[b]=function(){var x=this[a]
if(x==y)H.jO(d||a)
try{if(x===z){this[a]=y
try{x=this[a]=c()}finally{if(x===z)this[a]=null}}return x}finally{this[b]=function(){return this[a]}}}}
I.$finishIsolateConstructor=function(a){var z=a.p
function Isolate(){var y=Object.keys(z)
for(var x=0;x<y.length;x++){var w=y[x]
this[w]=z[w]}var v=init.lazies
var u=v?Object.keys(v):[]
for(var x=0;x<u.length;x++)this[v[u[x]]]=null
function ForceEfficientMap(){}ForceEfficientMap.prototype=this
new ForceEfficientMap()
for(var x=0;x<u.length;x++){var t=v[u[x]]
this[t]=z[t]}}Isolate.prototype=a.prototype
Isolate.prototype.constructor=Isolate
Isolate.p=z
Isolate.aA=a.aA
Isolate.I=a.I
return Isolate}}!function(){var z=function(a){var t={}
t[a]=1
return Object.keys(convertToFastObject(t))[0]}
init.getIsolateTag=function(a){return z("___dart_"+a+init.isolateTag)}
var y="___dart_isolate_tags_"
var x=Object[y]||(Object[y]=Object.create(null))
var w="_ZxYxX"
for(var v=0;;v++){var u=z(w+"_"+v+"_")
if(!(u in x)){x[u]=1
init.isolateTag=u
break}}init.dispatchPropertyName=init.getIsolateTag("dispatch_record")}();(function(a){if(typeof document==="undefined"){a(null)
return}if(typeof document.currentScript!='undefined'){a(document.currentScript)
return}var z=document.scripts
function onLoad(b){for(var x=0;x<z.length;++x)z[x].removeEventListener("load",onLoad,false)
a(b.target)}for(var y=0;y<z.length;++y)z[y].addEventListener("load",onLoad,false)})(function(a){init.currentScript=a
if(typeof dartMainRunner==="function")dartMainRunner(function(b){H.eG(Y.ex(),b)},[])
else (function(b){H.eG(Y.ex(),b)})([])})})()