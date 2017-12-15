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
if(a1==="q"){processStatics(init.statics[b2]=b3.q,b4)
delete b3.q}else if(a2===43){w[g]=a1.substring(1)
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
e.$callName=null}}function tearOffGetter(d,e,f,g){return g?new Function("funcs","reflectionInfo","name","H","c","return function tearOff_"+f+y+++"(x) {"+"if (c === null) c = "+"H.cu"+"("+"this, funcs, reflectionInfo, false, [x], name);"+"return new c(this, funcs[0], x, name);"+"}")(d,e,f,H,null):new Function("funcs","reflectionInfo","name","H","c","return function tearOff_"+f+y+++"() {"+"if (c === null) c = "+"H.cu"+"("+"this, funcs, reflectionInfo, false, [], name);"+"return new c(this, funcs[0], null, name);"+"}")(d,e,f,H,null)}function tearOff(d,e,f,a0,a1){var g
return f?function(){if(g===void 0)g=H.cu(this,d,e,true,[],a0).prototype
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
x.push([p,o,i,h,n,j,k,m])}finishClasses(s)}I.G=function(){}
var dart=[["","",,H,{"^":"",k3:{"^":"c;a"}}],["","",,J,{"^":"",
p:function(a){return void 0},
bE:function(a,b,c,d){return{i:a,p:b,e:c,x:d}},
bB:function(a){var z,y,x,w,v
z=a[init.dispatchPropertyName]
if(z==null)if($.cy==null){H.jc()
z=a[init.dispatchPropertyName]}if(z!=null){y=z.p
if(!1===y)return z.i
if(!0===y)return a
x=Object.getPrototypeOf(a)
if(y===x)return z.i
if(z.e===x)throw H.e(new P.e3("Return interceptor for "+H.d(y(a,z))))}w=a.constructor
v=w==null?null:w[$.$get$bX()]
if(v!=null)return v
v=H.jk(a)
if(v!=null)return v
if(typeof a=="function")return C.U
y=Object.getPrototypeOf(a)
if(y==null)return C.I
if(y===Object.prototype)return C.I
if(typeof w=="function"){Object.defineProperty(w,$.$get$bX(),{value:C.B,enumerable:false,writable:true,configurable:true})
return C.B}return C.B},
h:{"^":"c;",
K:function(a,b){return a===b},
gI:function(a){return H.aa(a)},
k:["dP",function(a){return H.bq(a)}],
"%":"AnimationEvent|AnimationPlayerEvent|ApplicationCacheErrorEvent|AudioProcessingEvent|AutocompleteErrorEvent|BeforeInstallPromptEvent|BeforeUnloadEvent|Blob|BlobEvent|CanvasGradient|CanvasPattern|CanvasRenderingContext2D|ClipboardEvent|CloseEvent|CompositionEvent|CustomEvent|DOMError|DOMImplementation|DeviceLightEvent|DeviceMotionEvent|DeviceOrientationEvent|DragEvent|ErrorEvent|Event|ExtendableEvent|ExtendableMessageEvent|FetchEvent|File|FileError|FocusEvent|FontFaceSetLoadEvent|GamepadEvent|GeofencingEvent|HashChangeEvent|IDBVersionChangeEvent|InputEvent|InstallEvent|KeyboardEvent|MIDIConnectionEvent|MIDIMessageEvent|MediaEncryptedEvent|MediaError|MediaKeyMessageEvent|MediaQueryListEvent|MediaStreamEvent|MediaStreamTrackEvent|MessageEvent|MouseEvent|NavigatorUserMediaError|NotificationEvent|OfflineAudioCompletionEvent|PageTransitionEvent|PointerEvent|PopStateEvent|PositionError|PresentationConnectionAvailableEvent|PresentationConnectionCloseEvent|ProgressEvent|PromiseRejectionEvent|PushEvent|PushMessageData|RTCDTMFToneChangeEvent|RTCDataChannelEvent|RTCIceCandidateEvent|RTCPeerConnectionIceEvent|Range|RelatedEvent|ResourceProgressEvent|SQLError|SVGAnimatedEnumeration|SVGAnimatedLength|SVGAnimatedLengthList|SVGAnimatedNumber|SVGAnimatedNumberList|SVGAnimatedString|SVGAnimatedTransformList|SVGZoomEvent|SecurityPolicyViolationEvent|ServicePortConnectEvent|ServiceWorkerMessageEvent|SpeechRecognitionError|SpeechRecognitionEvent|SpeechSynthesisEvent|StorageEvent|StorageManager|SyncEvent|TextEvent|TouchEvent|TrackEvent|TransitionEvent|UIEvent|USBConnectionEvent|WebGLContextEvent|WebKitTransitionEvent|WheelEvent"},
fK:{"^":"h;",
k:function(a){return String(a)},
gI:function(a){return a?519018:218159},
$iscs:1},
db:{"^":"h;",
K:function(a,b){return null==b},
k:function(a){return"null"},
gI:function(a){return 0}},
bY:{"^":"h;",
gI:function(a){return 0},
k:["dR",function(a){return String(a)}],
$isfL:1},
hn:{"^":"bY;"},
b2:{"^":"bY;"},
aU:{"^":"bY;",
k:function(a){var z=a[$.$get$cR()]
return z==null?this.dR(a):J.a2(z)},
$S:function(){return{func:1,opt:[,,,,,,,,,,,,,,,,]}}},
aR:{"^":"h;$ti",
bF:function(a,b){if(!!a.immutable$list)throw H.e(new P.H(b))},
eI:function(a,b){if(!!a.fixed$length)throw H.e(new P.H(b))},
cV:function(a,b){return new H.c3(a,b,[H.ac(a,0),null])},
Z:function(a,b){return a[b]},
gfc:function(a){if(a.length>0)return a[0]
throw H.e(H.bW())},
V:function(a,b,c,d,e){var z,y,x,w
this.bF(a,"setRange")
P.cb(b,c,a.length,null,null,null)
z=c-b
if(z===0)return
if(e<0)H.t(P.Z(e,0,null,"skipCount",null))
if(!!J.p(d).$isj){y=e
x=d}else{d.toString
x=H.dD(d,e,null,H.ac(d,0)).bU(0,!1)
y=0}if(y+z>x.length)throw H.e(H.fH())
if(y<b)for(w=z-1;w>=0;--w)a[b+w]=x[y+w]
else for(w=0;w<z;++w)a[b+w]=x[y+w]},
dl:function(a,b,c,d){return this.V(a,b,c,d,0)},
cE:function(a,b){var z,y
z=a.length
for(y=0;y<z;++y){if(b.$1(a[y]))return!0
if(a.length!==z)throw H.e(new P.V(a))}return!1},
P:function(a,b){var z
for(z=0;z<a.length;++z)if(J.a5(a[z],b))return!0
return!1},
k:function(a){return P.bl(a,"[","]")},
gO:function(a){return new J.eO(a,a.length,0,null)},
gI:function(a){return H.aa(a)},
gt:function(a){return a.length},
st:function(a,b){this.eI(a,"set length")
if(b<0)throw H.e(P.Z(b,0,null,"newLength",null))
a.length=b},
h:function(a,b){if(typeof b!=="number"||Math.floor(b)!==b)throw H.e(H.y(a,b))
if(b>=a.length||b<0)throw H.e(H.y(a,b))
return a[b]},
l:function(a,b,c){this.bF(a,"indexed set")
if(typeof b!=="number"||Math.floor(b)!==b)throw H.e(H.y(a,b))
if(b>=a.length||b<0)throw H.e(H.y(a,b))
a[b]=c},
$isD:1,
$asD:I.G,
$isi:1,
$asi:null,
$isj:1,
$asj:null,
q:{
fJ:function(a,b){var z
if(typeof a!=="number"||Math.floor(a)!==a)throw H.e(P.cI(a,"length","is not an integer"))
if(a<0||a>4294967295)throw H.e(P.Z(a,0,4294967295,"length",null))
z=H.f(new Array(a),[b])
z.fixed$length=Array
return z}}},
k2:{"^":"aR;$ti"},
eO:{"^":"c;a,b,c,d",
gG:function(){return this.d},
D:function(){var z,y,x
z=this.a
y=z.length
if(this.b!==y)throw H.e(H.eA(z))
x=this.c
if(x>=y){this.d=null
return!1}this.d=z[x]
this.c=x+1
return!0}},
aS:{"^":"h;",
aF:function(a,b){var z
if(typeof b!=="number")throw H.e(H.a0(b))
if(a<b)return-1
else if(a>b)return 1
else if(a===b){if(a===0){z=this.gbR(b)
if(this.gbR(a)===z)return 0
if(this.gbR(a))return-1
return 1}return 0}else if(isNaN(a)){if(isNaN(b))return 0
return 1}else return-1},
gbR:function(a){return a===0?1/a<0:a<0},
U:function(a){var z
if(a>=-2147483648&&a<=2147483647)return a|0
if(isFinite(a)){z=a<0?Math.ceil(a):Math.floor(a)
return z+0}throw H.e(new P.H(""+a+".toInt()"))},
al:function(a){var z,y
if(a>=0){if(a<=2147483647)return a|0}else if(a>=-2147483648){z=a|0
return a===z?z:z-1}y=Math.floor(a)
if(isFinite(y))return y
throw H.e(new P.H(""+a+".floor()"))},
k:function(a){if(a===0&&1/a<0)return"-0.0"
else return""+a},
gI:function(a){return a&0x1FFFFFFF},
p:function(a,b){return a+b},
u:function(a,b){if(typeof b!=="number")throw H.e(H.a0(b))
return a-b},
d5:function(a,b){return a/b},
j:function(a,b){return a*b},
ad:function(a,b){if(typeof b!=="number")throw H.e(H.a0(b))
if((a|0)===a)if(b>=1||!1)return a/b|0
return this.cB(a,b)},
ah:function(a,b){return(a|0)===a?a/b|0:this.cB(a,b)},
cB:function(a,b){var z=a/b
if(z>=-2147483648&&z<=2147483647)return z|0
if(z>0){if(z!==1/0)return Math.floor(z)}else if(z>-1/0)return Math.ceil(z)
throw H.e(new P.H("Result of truncating division is "+H.d(z)+": "+H.d(a)+" ~/ "+b))},
aC:function(a,b){var z
if(a>0)z=b>31?0:a>>>b
else{z=b>31?31:b
z=a>>z>>>0}return z},
bm:function(a,b){return(a|b)>>>0},
C:function(a,b){if(typeof b!=="number")throw H.e(H.a0(b))
return a<b},
a_:function(a,b){if(typeof b!=="number")throw H.e(H.a0(b))
return a>b},
da:function(a,b){if(typeof b!=="number")throw H.e(H.a0(b))
return a<=b},
$isP:1},
da:{"^":"aS;",$isl:1,$isP:1},
d9:{"^":"aS;",$isP:1},
aT:{"^":"h;",
eh:function(a,b){if(b>=a.length)throw H.e(H.y(a,b))
return a.charCodeAt(b)},
p:function(a,b){return a+b},
dL:function(a,b,c){var z
if(c>a.length)throw H.e(P.Z(c,0,a.length,null,null))
z=c+b.length
if(z>a.length)return!1
return b===a.substring(c,z)},
dK:function(a,b){return this.dL(a,b,0)},
cb:function(a,b,c){if(c==null)c=a.length
if(b<0)throw H.e(P.br(b,null,null))
if(b>c)throw H.e(P.br(b,null,null))
if(c>a.length)throw H.e(P.br(c,null,null))
return a.substring(b,c)},
dO:function(a,b){return this.cb(a,b,null)},
fQ:function(a){return a.toLowerCase()},
aF:function(a,b){var z
if(typeof b!=="string")throw H.e(H.a0(b))
if(a===b)z=0
else z=a<b?-1:1
return z},
k:function(a){return a},
gI:function(a){var z,y,x
for(z=a.length,y=0,x=0;x<z;++x){y=536870911&y+a.charCodeAt(x)
y=536870911&y+((524287&y)<<10)
y^=y>>6}y=536870911&y+((67108863&y)<<3)
y^=y>>11
return 536870911&y+((16383&y)<<15)},
gt:function(a){return a.length},
h:function(a,b){if(b>=a.length||!1)throw H.e(H.y(a,b))
return a[b]},
$isD:1,
$asD:I.G,
$isw:1}}],["","",,H,{"^":"",
bW:function(){return new P.b0("No element")},
fI:function(){return new P.b0("Too many elements")},
fH:function(){return new P.b0("Too few elements")},
b_:function(a,b,c,d){if(c-b<=32)H.hB(a,b,c,d)
else H.hA(a,b,c,d)},
hB:function(a,b,c,d){var z,y,x,w,v
for(z=b+1,y=J.A(a);z<=c;++z){x=y.h(a,z)
w=z
while(!0){if(!(w>b&&J.T(d.$2(y.h(a,w-1),x),0)))break
v=w-1
y.l(a,w,y.h(a,v))
w=v}y.l(a,w,x)}},
hA:function(a,b,c,d){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e
z=C.b.ah(c-b+1,6)
y=b+z
x=c-z
w=C.b.ah(b+c,2)
v=w-z
u=w+z
t=J.A(a)
s=t.h(a,y)
r=t.h(a,v)
q=t.h(a,w)
p=t.h(a,u)
o=t.h(a,x)
if(J.T(d.$2(s,r),0)){n=r
r=s
s=n}if(J.T(d.$2(p,o),0)){n=o
o=p
p=n}if(J.T(d.$2(s,q),0)){n=q
q=s
s=n}if(J.T(d.$2(r,q),0)){n=q
q=r
r=n}if(J.T(d.$2(s,p),0)){n=p
p=s
s=n}if(J.T(d.$2(q,p),0)){n=p
p=q
q=n}if(J.T(d.$2(r,o),0)){n=o
o=r
r=n}if(J.T(d.$2(r,q),0)){n=q
q=r
r=n}if(J.T(d.$2(p,o),0)){n=o
o=p
p=n}t.l(a,y,s)
t.l(a,w,q)
t.l(a,x,o)
t.l(a,v,t.h(a,b))
t.l(a,u,t.h(a,c))
m=b+1
l=c-1
if(J.a5(d.$2(r,p),0)){for(k=m;k<=l;++k){j=t.h(a,k)
i=d.$2(j,r)
if(i===0)continue
if(i<0){if(k!==m){t.l(a,k,t.h(a,m))
t.l(a,m,j)}++m}else for(;!0;){i=d.$2(t.h(a,l),r)
if(i>0){--l
continue}else{h=l-1
if(i<0){t.l(a,k,t.h(a,m))
g=m+1
t.l(a,m,t.h(a,l))
t.l(a,l,j)
l=h
m=g
break}else{t.l(a,k,t.h(a,l))
t.l(a,l,j)
l=h
break}}}}f=!0}else{for(k=m;k<=l;++k){j=t.h(a,k)
if(d.$2(j,r)<0){if(k!==m){t.l(a,k,t.h(a,m))
t.l(a,m,j)}++m}else if(d.$2(j,p)>0)for(;!0;)if(d.$2(t.h(a,l),p)>0){--l
if(l<k)break
continue}else{h=l-1
if(d.$2(t.h(a,l),r)<0){t.l(a,k,t.h(a,m))
g=m+1
t.l(a,m,t.h(a,l))
t.l(a,l,j)
m=g}else{t.l(a,k,t.h(a,l))
t.l(a,l,j)}l=h
break}}f=!1}e=m-1
t.l(a,b,t.h(a,e))
t.l(a,e,r)
e=l+1
t.l(a,c,t.h(a,e))
t.l(a,e,p)
H.b_(a,b,m-2,d)
H.b_(a,l+2,c,d)
if(f)return
if(m<y&&l>x){for(;J.a5(d.$2(t.h(a,m),r),0);)++m
for(;J.a5(d.$2(t.h(a,l),p),0);)--l
for(k=m;k<=l;++k){j=t.h(a,k)
if(d.$2(j,r)===0){if(k!==m){t.l(a,k,t.h(a,m))
t.l(a,m,j)}++m}else if(d.$2(j,p)===0)for(;!0;)if(d.$2(t.h(a,l),p)===0){--l
if(l<k)break
continue}else{h=l-1
if(d.$2(t.h(a,l),r)<0){t.l(a,k,t.h(a,m))
g=m+1
t.l(a,m,t.h(a,l))
t.l(a,l,j)
m=g}else{t.l(a,k,t.h(a,l))
t.l(a,l,j)}l=h
break}}H.b_(a,m,l,d)}else H.b_(a,m,l,d)},
i:{"^":"W;$ti",$asi:null},
aW:{"^":"i;$ti",
gO:function(a){return new H.df(this,this.gt(this),0,null)},
bX:function(a,b){return this.dQ(0,b)},
bU:function(a,b){var z,y
z=H.f([],[H.ab(this,"aW",0)])
C.d.st(z,this.gt(this))
for(y=0;y<this.gt(this);++y)z[y]=this.Z(0,y)
return z},
fP:function(a){return this.bU(a,!0)}},
hD:{"^":"aW;a,b,c,$ti",
geo:function(){var z,y
z=J.ad(this.a)
y=this.c
if(y==null||y>z)return z
return y},
gez:function(){var z,y
z=J.ad(this.a)
y=this.b
if(y>z)return z
return y},
gt:function(a){var z,y,x
z=J.ad(this.a)
y=this.b
if(y>=z)return 0
x=this.c
if(x==null||x>=z)return z-y
return x-y},
Z:function(a,b){var z=this.gez()+b
if(b<0||z>=this.geo())throw H.e(P.aB(b,this,"index",null,null))
return J.cD(this.a,z)},
bU:function(a,b){var z,y,x,w,v,u,t,s
z=this.b
y=this.a
x=J.A(y)
w=x.gt(y)
v=this.c
if(v!=null&&v<w)w=v
u=w-z
if(u<0)u=0
t=H.f(new Array(u),this.$ti)
for(s=0;s<u;++s){t[s]=x.Z(y,z+s)
if(x.gt(y)<w)throw H.e(new P.V(this))}return t},
e7:function(a,b,c,d){var z,y
z=this.b
if(z<0)H.t(P.Z(z,0,null,"start",null))
y=this.c
if(y!=null){if(y<0)H.t(P.Z(y,0,null,"end",null))
if(z>y)throw H.e(P.Z(z,0,y,"start",null))}},
q:{
dD:function(a,b,c,d){var z=new H.hD(a,b,c,[d])
z.e7(a,b,c,d)
return z}}},
df:{"^":"c;a,b,c,d",
gG:function(){return this.d},
D:function(){var z,y,x,w
z=this.a
y=J.A(z)
x=y.gt(z)
if(this.b!==x)throw H.e(new P.V(z))
w=this.c
if(w>=x){this.d=null
return!1}this.d=y.Z(z,w);++this.c
return!0}},
dh:{"^":"W;a,b,$ti",
gO:function(a){return new H.fU(null,J.aM(this.a),this.b,this.$ti)},
gt:function(a){return J.ad(this.a)},
$asW:function(a,b){return[b]},
q:{
c2:function(a,b,c,d){if(!!a.$isi)return new H.fm(a,b,[c,d])
return new H.dh(a,b,[c,d])}}},
fm:{"^":"dh;a,b,$ti",$isi:1,
$asi:function(a,b){return[b]}},
fU:{"^":"d8;a,b,c,$ti",
D:function(){var z=this.b
if(z.D()){this.a=this.c.$1(z.gG())
return!0}this.a=null
return!1},
gG:function(){return this.a}},
c3:{"^":"aW;a,b,$ti",
gt:function(a){return J.ad(this.a)},
Z:function(a,b){return this.b.$1(J.cD(this.a,b))},
$asi:function(a,b){return[b]},
$asaW:function(a,b){return[b]},
$asW:function(a,b){return[b]}},
e7:{"^":"W;a,b,$ti",
gO:function(a){return new H.hW(J.aM(this.a),this.b,this.$ti)}},
hW:{"^":"d8;a,b,$ti",
D:function(){var z,y
for(z=this.a,y=this.b;z.D();)if(y.$1(z.gG()))return!0
return!1},
gG:function(){return this.a.gG()}},
d2:{"^":"c;$ti"}}],["","",,H,{"^":"",
b4:function(a,b){var z=a.aQ(b)
if(!init.globalState.d.cy)init.globalState.f.aZ()
return z},
ey:function(a,b){var z,y,x,w,v,u
z={}
z.a=b
if(b==null){b=[]
z.a=b
y=b}else y=b
if(!J.p(y).$isj)throw H.e(P.cH("Arguments to main must be a List: "+H.d(y)))
init.globalState=new H.ip(0,0,1,null,null,null,null,null,null,null,null,null,a)
y=init.globalState
x=self.window==null
w=self.Worker
v=x&&!!self.postMessage
y.x=v
v=!v
if(v)w=w!=null&&$.$get$d6()!=null
else w=!0
y.y=w
y.r=x&&v
y.f=new H.ic(P.c_(null,H.b3),0)
x=P.l
y.z=new H.ai(0,null,null,null,null,null,0,[x,H.co])
y.ch=new H.ai(0,null,null,null,null,null,0,[x,null])
if(y.x){w=new H.io()
y.Q=w
self.onmessage=function(c,d){return function(e){c(d,e)}}(H.fA,w)
self.dartPrint=self.dartPrint||function(c){return function(d){if(self.console&&self.console.log)self.console.log(d)
else self.postMessage(c(d))}}(H.iq)}if(init.globalState.x)return
y=init.globalState.a++
w=P.X(null,null,null,x)
v=new H.bs(0,null,!1)
u=new H.co(y,new H.ai(0,null,null,null,null,null,0,[x,H.bs]),w,init.createNewIsolate(),v,new H.ae(H.bF()),new H.ae(H.bF()),!1,!1,[],P.X(null,null,null,null),null,null,!1,!0,P.X(null,null,null,null))
w.F(0,0)
u.ce(0,v)
init.globalState.e=u
init.globalState.z.l(0,y,u)
init.globalState.d=u
if(H.bA(a,{func:1,args:[P.al]}))u.aQ(new H.jp(z,a))
else if(H.bA(a,{func:1,args:[P.al,P.al]}))u.aQ(new H.jq(z,a))
else u.aQ(a)
init.globalState.f.aZ()},
fE:function(){var z=init.currentScript
if(z!=null)return String(z.src)
if(init.globalState.x)return H.fF()
return},
fF:function(){var z,y
z=new Error().stack
if(z==null){z=function(){try{throw new Error()}catch(x){return x.stack}}()
if(z==null)throw H.e(new P.H("No stack trace"))}y=z.match(new RegExp("^ *at [^(]*\\((.*):[0-9]*:[0-9]*\\)$","m"))
if(y!=null)return y[1]
y=z.match(new RegExp("^[^@]*@(.*):[0-9]*$","m"))
if(y!=null)return y[1]
throw H.e(new P.H('Cannot extract URI from "'+z+'"'))},
fA:function(a,b){var z,y,x,w,v,u,t,s,r,q,p,o,n
z=new H.bw(!0,[]).at(b.data)
y=J.A(z)
switch(y.h(z,"command")){case"start":init.globalState.b=y.h(z,"id")
x=y.h(z,"functionName")
w=x==null?init.globalState.cx:init.globalFunctions[x]()
v=y.h(z,"args")
u=new H.bw(!0,[]).at(y.h(z,"msg"))
t=y.h(z,"isSpawnUri")
s=y.h(z,"startPaused")
r=new H.bw(!0,[]).at(y.h(z,"replyTo"))
y=init.globalState.a++
q=P.l
p=P.X(null,null,null,q)
o=new H.bs(0,null,!1)
n=new H.co(y,new H.ai(0,null,null,null,null,null,0,[q,H.bs]),p,init.createNewIsolate(),o,new H.ae(H.bF()),new H.ae(H.bF()),!1,!1,[],P.X(null,null,null,null),null,null,!1,!0,P.X(null,null,null,null))
p.F(0,0)
n.ce(0,o)
init.globalState.f.a.ae(new H.b3(n,new H.fB(w,v,u,t,s,r),"worker-start"))
init.globalState.d=n
init.globalState.f.aZ()
break
case"spawn-worker":break
case"message":if(y.h(z,"port")!=null)J.eL(y.h(z,"port"),y.h(z,"msg"))
init.globalState.f.aZ()
break
case"close":init.globalState.ch.aY(0,$.$get$d7().h(0,a))
a.terminate()
init.globalState.f.aZ()
break
case"log":H.fz(y.h(z,"msg"))
break
case"print":if(init.globalState.x){y=init.globalState.Q
q=P.aC(["command","print","msg",z])
q=new H.ap(!0,P.aH(null,P.l)).a0(q)
y.toString
self.postMessage(q)}else P.cA(y.h(z,"msg"))
break
case"error":throw H.e(y.h(z,"msg"))}},
fz:function(a){var z,y,x,w
if(init.globalState.x){y=init.globalState.Q
x=P.aC(["command","log","msg",a])
x=new H.ap(!0,P.aH(null,P.l)).a0(x)
y.toString
self.postMessage(x)}else try{self.console.log(a)}catch(w){H.S(w)
z=H.b6(w)
y=P.bi(z)
throw H.e(y)}},
fC:function(a,b,c,d,e,f){var z,y,x,w
z=init.globalState.d
y=z.a
$.ds=$.ds+("_"+y)
$.dt=$.dt+("_"+y)
y=z.e
x=init.globalState.d.a
w=z.f
f.ac(0,["spawned",new H.bx(y,x),w,z.r])
x=new H.fD(a,b,c,d,z)
if(e){z.cD(w,w)
init.globalState.f.a.ae(new H.b3(z,x,"start isolate"))}else x.$0()},
iG:function(a){return new H.bw(!0,[]).at(new H.ap(!1,P.aH(null,P.l)).a0(a))},
jp:{"^":"k:0;a,b",
$0:function(){this.b.$1(this.a.a)}},
jq:{"^":"k:0;a,b",
$0:function(){this.b.$2(this.a.a,null)}},
ip:{"^":"c;a,b,c,d,e,f,r,x,y,z,Q,ch,cx",q:{
iq:function(a){var z=P.aC(["command","print","msg",a])
return new H.ap(!0,P.aH(null,P.l)).a0(z)}}},
co:{"^":"c;a,b,c,fq:d<,eQ:e<,f,r,x,y,z,Q,ch,cx,cy,db,dx",
cD:function(a,b){if(!this.f.K(0,a))return
if(this.Q.F(0,b)&&!this.y)this.y=!0
this.bC()},
fH:function(a){var z,y,x,w,v
if(!this.y)return
z=this.Q
z.aY(0,a)
if(z.a===0){for(z=this.z;z.length!==0;){y=z.pop()
x=init.globalState.f.a
w=x.b
v=x.a
w=(w-1&v.length-1)>>>0
x.b=w
v[w]=y
if(w===x.c)x.cs();++x.d}this.y=!1}this.bC()},
eD:function(a,b){var z,y,x
if(this.ch==null)this.ch=[]
for(z=J.p(a),y=0;x=this.ch,y<x.length;y+=2)if(z.K(a,x[y])){this.ch[y+1]=b
return}x.push(a)
this.ch.push(b)},
fG:function(a){var z,y,x
if(this.ch==null)return
for(z=J.p(a),y=0;x=this.ch,y<x.length;y+=2)if(z.K(a,x[y])){z=this.ch
x=y+2
z.toString
if(typeof z!=="object"||z===null||!!z.fixed$length)H.t(new P.H("removeRange"))
P.cb(y,x,z.length,null,null,null)
z.splice(y,x-y)
return}},
dk:function(a,b){if(!this.r.K(0,a))return
this.db=b},
fg:function(a,b,c){var z
if(b!==0)z=b===1&&!this.cy
else z=!0
if(z){a.ac(0,c)
return}z=this.cx
if(z==null){z=P.c_(null,null)
this.cx=z}z.ae(new H.ii(a,c))},
ff:function(a,b){var z
if(!this.r.K(0,a))return
if(b!==0)z=b===1&&!this.cy
else z=!0
if(z){this.bS()
return}z=this.cx
if(z==null){z=P.c_(null,null)
this.cx=z}z.ae(this.gfs())},
fh:function(a,b){var z,y,x
z=this.dx
if(z.a===0){if(this.db&&this===init.globalState.e)return
if(self.console&&self.console.error)self.console.error(a,b)
else{P.cA(a)
if(b!=null)P.cA(b)}return}y=new Array(2)
y.fixed$length=Array
y[0]=J.a2(a)
y[1]=b==null?null:b.k(0)
for(x=new P.ee(z,z.r,null,null),x.c=z.e;x.D();)x.d.ac(0,y)},
aQ:function(a){var z,y,x,w,v,u,t
z=init.globalState.d
init.globalState.d=this
$=this.d
y=null
x=this.cy
this.cy=!0
try{y=a.$0()}catch(u){w=H.S(u)
v=H.b6(u)
this.fh(w,v)
if(this.db){this.bS()
if(this===init.globalState.e)throw u}}finally{this.cy=x
init.globalState.d=z
if(z!=null)$=z.gfq()
if(this.cx!=null)for(;t=this.cx,!t.gaV(t);)this.cx.cZ().$0()}return y},
cU:function(a){return this.b.h(0,a)},
ce:function(a,b){var z=this.b
if(z.aL(a))throw H.e(P.bi("Registry: ports must be registered only once."))
z.l(0,a,b)},
bC:function(){var z=this.b
if(z.gt(z)-this.c.a>0||this.y||!this.x)init.globalState.z.l(0,this.a,this)
else this.bS()},
bS:[function(){var z,y,x
z=this.cx
if(z!=null)z.aE(0)
for(z=this.b,y=z.gd3(z),y=y.gO(y);y.D();)y.gG().eg()
z.aE(0)
this.c.aE(0)
init.globalState.z.aY(0,this.a)
this.dx.aE(0)
if(this.ch!=null){for(x=0;z=this.ch,x<z.length;x+=2)z[x].ac(0,z[x+1])
this.ch=null}},"$0","gfs",0,0,2]},
ii:{"^":"k:2;a,b",
$0:function(){this.a.ac(0,this.b)}},
ic:{"^":"c;a,b",
eU:function(){var z=this.a
if(z.b===z.c)return
return z.cZ()},
d0:function(){var z,y,x
z=this.eU()
if(z==null){if(init.globalState.e!=null)if(init.globalState.z.aL(init.globalState.e.a))if(init.globalState.r){y=init.globalState.e.b
y=y.gaV(y)}else y=!1
else y=!1
else y=!1
if(y)H.t(P.bi("Program exited with open ReceivePorts."))
y=init.globalState
if(y.x){x=y.z
x=x.gaV(x)&&y.f.b===0}else x=!1
if(x){y=y.Q
x=P.aC(["command","close"])
x=new H.ap(!0,new P.ef(0,null,null,null,null,null,0,[null,P.l])).a0(x)
y.toString
self.postMessage(x)}return!1}z.fA()
return!0},
cz:function(){if(self.window!=null)new H.id(this).$0()
else for(;this.d0(););},
aZ:function(){var z,y,x,w,v
if(!init.globalState.x)this.cz()
else try{this.cz()}catch(x){z=H.S(x)
y=H.b6(x)
w=init.globalState.Q
v=P.aC(["command","error","msg",H.d(z)+"\n"+H.d(y)])
v=new H.ap(!0,P.aH(null,P.l)).a0(v)
w.toString
self.postMessage(v)}}},
id:{"^":"k:2;a",
$0:function(){if(!this.a.d0())return
P.hP(C.E,this)}},
b3:{"^":"c;a,b,c",
fA:function(){var z=this.a
if(z.y){z.z.push(this)
return}z.aQ(this.b)}},
io:{"^":"c;"},
fB:{"^":"k:0;a,b,c,d,e,f",
$0:function(){H.fC(this.a,this.b,this.c,this.d,this.e,this.f)}},
fD:{"^":"k:2;a,b,c,d,e",
$0:function(){var z,y
z=this.e
z.x=!0
if(!this.d)this.a.$1(this.c)
else{y=this.a
if(H.bA(y,{func:1,args:[P.al,P.al]}))y.$2(this.b,this.c)
else if(H.bA(y,{func:1,args:[P.al]}))y.$1(this.b)
else y.$0()}z.bC()}},
e9:{"^":"c;"},
bx:{"^":"e9;b,a",
ac:function(a,b){var z,y,x
z=init.globalState.z.h(0,this.a)
if(z==null)return
y=this.b
if(y.c)return
x=H.iG(b)
if(z.geQ()===y){y=J.A(x)
switch(y.h(x,0)){case"pause":z.cD(y.h(x,1),y.h(x,2))
break
case"resume":z.fH(y.h(x,1))
break
case"add-ondone":z.eD(y.h(x,1),y.h(x,2))
break
case"remove-ondone":z.fG(y.h(x,1))
break
case"set-errors-fatal":z.dk(y.h(x,1),y.h(x,2))
break
case"ping":z.fg(y.h(x,1),y.h(x,2),y.h(x,3))
break
case"kill":z.ff(y.h(x,1),y.h(x,2))
break
case"getErrors":y=y.h(x,1)
z.dx.F(0,y)
break
case"stopErrors":y=y.h(x,1)
z.dx.aY(0,y)
break}return}init.globalState.f.a.ae(new H.b3(z,new H.ir(this,x),"receive"))},
K:function(a,b){var z,y
if(b==null)return!1
if(b instanceof H.bx){z=this.b
y=b.b
y=z==null?y==null:z===y
z=y}else z=!1
return z},
gI:function(a){return this.b.a}},
ir:{"^":"k:0;a,b",
$0:function(){var z=this.a.b
if(!z.c)z.ee(this.b)}},
cp:{"^":"e9;b,c,a",
ac:function(a,b){var z,y,x
z=P.aC(["command","message","port",this,"msg",b])
y=new H.ap(!0,P.aH(null,P.l)).a0(z)
if(init.globalState.x){init.globalState.Q.toString
self.postMessage(y)}else{x=init.globalState.ch.h(0,this.b)
if(x!=null)x.postMessage(y)}},
K:function(a,b){var z,y
if(b==null)return!1
if(b instanceof H.cp){z=this.b
y=b.b
if(z==null?y==null:z===y){z=this.a
y=b.a
if(z==null?y==null:z===y){z=this.c
y=b.c
y=z==null?y==null:z===y
z=y}else z=!1}else z=!1}else z=!1
return z},
gI:function(a){return(this.b<<16^this.a<<8^this.c)>>>0}},
bs:{"^":"c;a,b,c",
eg:function(){this.c=!0
this.b=null},
ee:function(a){if(this.c)return
this.b.$1(a)},
$ishr:1},
dO:{"^":"c;a,b,c",
e9:function(a,b){var z,y
if(a===0)z=self.setTimeout==null||init.globalState.x
else z=!1
if(z){this.c=1
z=init.globalState.f
y=init.globalState.d
z.a.ae(new H.b3(y,new H.hN(this,b),"timer"))
this.b=!0}else if(self.setTimeout!=null){++init.globalState.f.b
this.c=self.setTimeout(H.aL(new H.hO(this,b),0),a)}else throw H.e(new P.H("Timer greater than 0."))},
ea:function(a,b){if(self.setTimeout!=null){++init.globalState.f.b
this.c=self.setInterval(H.aL(new H.hM(this,b),0),a)}else throw H.e(new P.H("Periodic timer."))},
q:{
hK:function(a,b){var z=new H.dO(!0,!1,null)
z.e9(a,b)
return z},
hL:function(a,b){var z=new H.dO(!1,!1,null)
z.ea(a,b)
return z}}},
hN:{"^":"k:2;a,b",
$0:function(){this.a.c=null
this.b.$0()}},
hO:{"^":"k:2;a,b",
$0:function(){this.a.c=null;--init.globalState.f.b
this.b.$0()}},
hM:{"^":"k:0;a,b",
$0:function(){this.b.$1(this.a)}},
ae:{"^":"c;a",
gI:function(a){var z=this.a
z=C.b.aC(z,0)^C.b.ah(z,4294967296)
z=(~z>>>0)+(z<<15>>>0)&4294967295
z=((z^z>>>12)>>>0)*5&4294967295
z=((z^z>>>4)>>>0)*2057&4294967295
return(z^z>>>16)>>>0},
K:function(a,b){var z,y
if(b==null)return!1
if(b===this)return!0
if(b instanceof H.ae){z=this.a
y=b.a
return z==null?y==null:z===y}return!1}},
ap:{"^":"c;a,b",
a0:[function(a){var z,y,x,w,v
if(a==null||typeof a==="string"||typeof a==="number"||typeof a==="boolean")return a
z=this.b
y=z.h(0,a)
if(y!=null)return["ref",y]
z.l(0,a,z.gt(z))
z=J.p(a)
if(!!z.$isdi)return["buffer",a]
if(!!z.$isc6)return["typed",a]
if(!!z.$isD)return this.dg(a)
if(!!z.$isfy){x=this.gdd()
w=a.gaH()
w=H.c2(w,x,H.ab(w,"W",0),null)
w=P.c0(w,!0,H.ab(w,"W",0))
z=z.gd3(a)
z=H.c2(z,x,H.ab(z,"W",0),null)
return["map",w,P.c0(z,!0,H.ab(z,"W",0))]}if(!!z.$isfL)return this.dh(a)
if(!!z.$ish)this.d2(a)
if(!!z.$ishr)this.b_(a,"RawReceivePorts can't be transmitted:")
if(!!z.$isbx)return this.di(a)
if(!!z.$iscp)return this.dj(a)
if(!!z.$isk){v=a.$static_name
if(v==null)this.b_(a,"Closures can't be transmitted:")
return["function",v]}if(!!z.$isae)return["capability",a.a]
if(!(a instanceof P.c))this.d2(a)
return["dart",init.classIdExtractor(a),this.df(init.classFieldsExtractor(a))]},"$1","gdd",2,0,1],
b_:function(a,b){throw H.e(new P.H((b==null?"Can't transmit:":b)+" "+H.d(a)))},
d2:function(a){return this.b_(a,null)},
dg:function(a){var z=this.de(a)
if(!!a.fixed$length)return["fixed",z]
if(!a.fixed$length)return["extendable",z]
if(!a.immutable$list)return["mutable",z]
if(a.constructor===Array)return["const",z]
this.b_(a,"Can't serialize indexable: ")},
de:function(a){var z,y
z=[]
C.d.st(z,a.length)
for(y=0;y<a.length;++y)z[y]=this.a0(a[y])
return z},
df:function(a){var z
for(z=0;z<a.length;++z)C.d.l(a,z,this.a0(a[z]))
return a},
dh:function(a){var z,y,x
if(!!a.constructor&&a.constructor!==Object)this.b_(a,"Only plain JS Objects are supported:")
z=Object.keys(a)
y=[]
C.d.st(y,z.length)
for(x=0;x<z.length;++x)y[x]=this.a0(a[z[x]])
return["js-object",z,y]},
dj:function(a){if(this.a)return["sendport",a.b,a.a,a.c]
return["raw sendport",a]},
di:function(a){if(this.a)return["sendport",init.globalState.b,a.a,a.b.a]
return["raw sendport",a]}},
bw:{"^":"c;a,b",
at:[function(a){var z,y,x,w,v
if(a==null||typeof a==="string"||typeof a==="number"||typeof a==="boolean")return a
if(typeof a!=="object"||a===null||a.constructor!==Array)throw H.e(P.cH("Bad serialized message: "+H.d(a)))
switch(C.d.gfc(a)){case"ref":return this.b[a[1]]
case"buffer":z=a[1]
this.b.push(z)
return z
case"typed":z=a[1]
this.b.push(z)
return z
case"fixed":z=a[1]
this.b.push(z)
y=H.f(this.aO(z),[null])
y.fixed$length=Array
return y
case"extendable":z=a[1]
this.b.push(z)
return H.f(this.aO(z),[null])
case"mutable":z=a[1]
this.b.push(z)
return this.aO(z)
case"const":z=a[1]
this.b.push(z)
y=H.f(this.aO(z),[null])
y.fixed$length=Array
return y
case"map":return this.eX(a)
case"sendport":return this.eY(a)
case"raw sendport":z=a[1]
this.b.push(z)
return z
case"js-object":return this.eW(a)
case"function":z=init.globalFunctions[a[1]]()
this.b.push(z)
return z
case"capability":return new H.ae(a[1])
case"dart":x=a[1]
w=a[2]
v=init.instanceFromClassId(x)
this.b.push(v)
this.aO(w)
return init.initializeEmptyInstance(x,v,w)
default:throw H.e("couldn't deserialize: "+H.d(a))}},"$1","geV",2,0,1],
aO:function(a){var z
for(z=0;z<a.length;++z)C.d.l(a,z,this.at(a[z]))
return a},
eX:function(a){var z,y,x,w,v
z=a[1]
y=a[2]
x=P.dc()
this.b.push(x)
z=J.eJ(z,this.geV()).fP(0)
for(w=J.A(y),v=0;v<z.length;++v)x.l(0,z[v],this.at(w.h(y,v)))
return x},
eY:function(a){var z,y,x,w,v,u,t
z=a[1]
y=a[2]
x=a[3]
w=init.globalState.b
if(z==null?w==null:z===w){v=init.globalState.z.h(0,y)
if(v==null)return
u=v.cU(x)
if(u==null)return
t=new H.bx(u,y)}else t=new H.cp(z,x,y)
this.b.push(t)
return t},
eW:function(a){var z,y,x,w,v,u
z=a[1]
y=a[2]
x={}
this.b.push(x)
for(w=J.A(z),v=J.A(y),u=0;u<w.gt(z);++u)x[w.h(z,u)]=this.at(v.h(y,u))
return x}}}],["","",,H,{"^":"",
j4:function(a){return init.types[a]},
et:function(a,b){var z
if(b!=null){z=b.x
if(z!=null)return z}return!!J.p(a).$isK},
d:function(a){var z
if(typeof a==="string")return a
if(typeof a==="number"){if(a!==0)return""+a}else if(!0===a)return"true"
else if(!1===a)return"false"
else if(a==null)return"null"
z=J.a2(a)
if(typeof z!=="string")throw H.e(H.a0(a))
return z},
aa:function(a){var z=a.$identityHash
if(z==null){z=Math.random()*0x3fffffff|0
a.$identityHash=z}return z},
ca:function(a){var z,y,x,w,v,u,t,s
z=J.p(a)
y=z.constructor
if(typeof y=="function"){x=y.name
w=typeof x==="string"?x:null}else w=null
if(w==null||z===C.N||!!J.p(a).$isb2){v=C.H(a)
if(v==="Object"){u=a.constructor
if(typeof u=="function"){t=String(u).match(/^\s*function\s*([\w$]*)\s*\(/)
s=t==null?null:t[1]
if(typeof s==="string"&&/^\w+$/.test(s))w=s}if(w==null)w=v}else w=v}w=w
if(w.length>1&&C.u.eh(w,0)===36)w=C.u.dO(w,1)
return function(b,c){return b.replace(/[^<,> ]+/g,function(d){return c[d]||d})}(w+H.eu(H.cw(a),0,null),init.mangledGlobalNames)},
bq:function(a){return"Instance of '"+H.ca(a)+"'"},
ko:[function(){return Date.now()},"$0","iK",0,0,14],
bp:function(){var z,y
if($.am!=null)return
$.am=1000
$.r=H.iK()
if(typeof window=="undefined")return
z=window
if(z==null)return
y=z.performance
if(y==null)return
if(typeof y.now!="function")return
$.am=1e6
$.r=new H.hp(y)},
c9:function(a,b){if(a==null||typeof a==="boolean"||typeof a==="number"||typeof a==="string")throw H.e(H.a0(a))
return a[b]},
du:function(a,b,c){if(a==null||typeof a==="boolean"||typeof a==="number"||typeof a==="string")throw H.e(H.a0(a))
a[b]=c},
y:function(a,b){var z
if(typeof b!=="number"||Math.floor(b)!==b)return new P.a7(!0,b,"index",null)
z=J.ad(a)
if(b<0||b>=z)return P.aB(b,a,"index",null,z)
return P.br(b,"index",null)},
a0:function(a){return new P.a7(!0,a,null,null)},
iX:function(a){return a},
e:function(a){var z
if(a==null)a=new P.dr()
z=new Error()
z.dartException=a
if("defineProperty" in Object){Object.defineProperty(z,"message",{get:H.eB})
z.name=""}else z.toString=H.eB
return z},
eB:function(){return J.a2(this.dartException)},
t:function(a){throw H.e(a)},
eA:function(a){throw H.e(new P.V(a))},
S:function(a){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l
z=new H.js(a)
if(a==null)return
if(typeof a!=="object")return a
if("dartException" in a)return z.$1(a.dartException)
else if(!("message" in a))return a
y=a.message
if("number" in a&&typeof a.number=="number"){x=a.number
w=x&65535
if((C.b.aC(x,16)&8191)===10)switch(w){case 438:return z.$1(H.bZ(H.d(y)+" (Error "+w+")",null))
case 445:case 5007:v=H.d(y)+" (Error "+w+")"
return z.$1(new H.dq(v,null))}}if(a instanceof TypeError){u=$.$get$dT()
t=$.$get$dU()
s=$.$get$dV()
r=$.$get$dW()
q=$.$get$e_()
p=$.$get$e0()
o=$.$get$dY()
$.$get$dX()
n=$.$get$e2()
m=$.$get$e1()
l=u.a3(y)
if(l!=null)return z.$1(H.bZ(y,l))
else{l=t.a3(y)
if(l!=null){l.method="call"
return z.$1(H.bZ(y,l))}else{l=s.a3(y)
if(l==null){l=r.a3(y)
if(l==null){l=q.a3(y)
if(l==null){l=p.a3(y)
if(l==null){l=o.a3(y)
if(l==null){l=r.a3(y)
if(l==null){l=n.a3(y)
if(l==null){l=m.a3(y)
v=l!=null}else v=!0}else v=!0}else v=!0}else v=!0}else v=!0}else v=!0}else v=!0
if(v)return z.$1(new H.dq(y,l==null?null:l.method))}}return z.$1(new H.hS(typeof y==="string"?y:""))}if(a instanceof RangeError){if(typeof y==="string"&&y.indexOf("call stack")!==-1)return new P.dB()
y=function(b){try{return String(b)}catch(k){}return null}(a)
return z.$1(new P.a7(!1,null,null,typeof y==="string"?y.replace(/^RangeError:\s*/,""):y))}if(typeof InternalError=="function"&&a instanceof InternalError)if(typeof y==="string"&&y==="too much recursion")return new P.dB()
return a},
b6:function(a){var z
if(a==null)return new H.eg(a,null)
z=a.$cachedTrace
if(z!=null)return z
return a.$cachedTrace=new H.eg(a,null)},
jm:function(a){if(a==null||typeof a!='object')return J.au(a)
else return H.aa(a)},
j1:function(a,b){var z,y,x,w
z=a.length
for(y=0;y<z;y=w){x=y+1
w=x+1
b.l(0,a[y],a[x])}return b},
je:function(a,b,c,d,e,f,g){switch(c){case 0:return H.b4(b,new H.jf(a))
case 1:return H.b4(b,new H.jg(a,d))
case 2:return H.b4(b,new H.jh(a,d,e))
case 3:return H.b4(b,new H.ji(a,d,e,f))
case 4:return H.b4(b,new H.jj(a,d,e,f,g))}throw H.e(P.bi("Unsupported number of arguments for wrapped closure"))},
aL:function(a,b){var z
if(a==null)return
z=a.$identity
if(!!z)return z
z=function(c,d,e,f){return function(g,h,i,j){return f(c,e,d,g,h,i,j)}}(a,b,init.globalState.d,H.je)
a.$identity=z
return z},
eY:function(a,b,c,d,e,f){var z,y,x,w,v,u,t,s,r,q,p,o,n,m
z=b[0]
y=z.$callName
if(!!J.p(c).$isj){z.$reflectionInfo=c
x=H.ht(z).r}else x=c
w=d?Object.create(new H.hC().constructor.prototype):Object.create(new H.bL(null,null,null,null).constructor.prototype)
w.$initialize=w.constructor
if(d)v=function(){this.$initialize()}
else{u=$.U
$.U=u+1
u=new Function("a,b,c,d"+u,"this.$initialize(a,b,c,d"+u+")")
v=u}w.constructor=v
v.prototype=w
if(!d){t=e.length==1&&!0
s=H.cN(a,z,t)
s.$reflectionInfo=c}else{w.$static_name=f
s=z
t=!1}if(typeof x=="number")r=function(g,h){return function(){return g(h)}}(H.j4,x)
else if(typeof x=="function")if(d)r=x
else{q=t?H.cL:H.bM
r=function(g,h){return function(){return g.apply({$receiver:h(this)},arguments)}}(x,q)}else throw H.e("Error in reflectionInfo.")
w.$S=r
w[y]=s
for(u=b.length,p=1;p<u;++p){o=b[p]
n=o.$callName
if(n!=null){m=d?o:H.cN(a,o,t)
w[n]=m}}w["call*"]=s
w.$R=z.$R
w.$D=z.$D
return v},
eV:function(a,b,c,d){var z=H.bM
switch(b?-1:a){case 0:return function(e,f){return function(){return f(this)[e]()}}(c,z)
case 1:return function(e,f){return function(g){return f(this)[e](g)}}(c,z)
case 2:return function(e,f){return function(g,h){return f(this)[e](g,h)}}(c,z)
case 3:return function(e,f){return function(g,h,i){return f(this)[e](g,h,i)}}(c,z)
case 4:return function(e,f){return function(g,h,i,j){return f(this)[e](g,h,i,j)}}(c,z)
case 5:return function(e,f){return function(g,h,i,j,k){return f(this)[e](g,h,i,j,k)}}(c,z)
default:return function(e,f){return function(){return e.apply(f(this),arguments)}}(d,z)}},
cN:function(a,b,c){var z,y,x,w,v,u,t
if(c)return H.eX(a,b)
z=b.$stubName
y=b.length
x=a[z]
w=b==null?x==null:b===x
v=!w||y>=27
if(v)return H.eV(y,!w,z,b)
if(y===0){w=$.U
$.U=w+1
u="self"+H.d(w)
w="return function(){var "+u+" = this."
v=$.aw
if(v==null){v=H.b8("self")
$.aw=v}return new Function(w+H.d(v)+";return "+u+"."+H.d(z)+"();}")()}t="abcdefghijklmnopqrstuvwxyz".split("").splice(0,y).join(",")
w=$.U
$.U=w+1
t+=H.d(w)
w="return function("+t+"){return this."
v=$.aw
if(v==null){v=H.b8("self")
$.aw=v}return new Function(w+H.d(v)+"."+H.d(z)+"("+t+");}")()},
eW:function(a,b,c,d){var z,y
z=H.bM
y=H.cL
switch(b?-1:a){case 0:throw H.e(new H.hu("Intercepted function with no arguments."))
case 1:return function(e,f,g){return function(){return f(this)[e](g(this))}}(c,z,y)
case 2:return function(e,f,g){return function(h){return f(this)[e](g(this),h)}}(c,z,y)
case 3:return function(e,f,g){return function(h,i){return f(this)[e](g(this),h,i)}}(c,z,y)
case 4:return function(e,f,g){return function(h,i,j){return f(this)[e](g(this),h,i,j)}}(c,z,y)
case 5:return function(e,f,g){return function(h,i,j,k){return f(this)[e](g(this),h,i,j,k)}}(c,z,y)
case 6:return function(e,f,g){return function(h,i,j,k,l){return f(this)[e](g(this),h,i,j,k,l)}}(c,z,y)
default:return function(e,f,g,h){return function(){h=[g(this)]
Array.prototype.push.apply(h,arguments)
return e.apply(f(this),h)}}(d,z,y)}},
eX:function(a,b){var z,y,x,w,v,u,t,s
z=H.eQ()
y=$.cK
if(y==null){y=H.b8("receiver")
$.cK=y}x=b.$stubName
w=b.length
v=a[x]
u=b==null?v==null:b===v
t=!u||w>=28
if(t)return H.eW(w,!u,x,b)
if(w===1){y="return function(){return this."+H.d(z)+"."+H.d(x)+"(this."+H.d(y)+");"
u=$.U
$.U=u+1
return new Function(y+H.d(u)+"}")()}s="abcdefghijklmnopqrstuvwxyz".split("").splice(0,w-1).join(",")
y="return function("+s+"){return this."+H.d(z)+"."+H.d(x)+"(this."+H.d(y)+", "+s+");"
u=$.U
$.U=u+1
return new Function(y+H.d(u)+"}")()},
cu:function(a,b,c,d,e,f){var z
b.fixed$length=Array
if(!!J.p(c).$isj){c.fixed$length=Array
z=c}else z=c
return H.eY(a,b,z,!!d,e,f)},
jo:function(a,b){var z=J.A(b)
throw H.e(H.eU(H.ca(a),z.cb(b,3,z.gt(b))))},
z:function(a,b){var z
if(a!=null)z=(typeof a==="object"||typeof a==="function")&&J.p(a)[b]
else z=!0
if(z)return a
H.jo(a,b)},
j_:function(a){var z=J.p(a)
return"$S" in z?z.$S():null},
bA:function(a,b){var z
if(a==null)return!1
z=H.j_(a)
return z==null?!1:H.es(z,b)},
jr:function(a){throw H.e(new P.f4(a))},
bF:function(){return(Math.random()*0x100000000>>>0)+(Math.random()*0x100000000>>>0)*4294967296},
er:function(a){return init.getIsolateTag(a)},
f:function(a,b){a.$ti=b
return a},
cw:function(a){if(a==null)return
return a.$ti},
j3:function(a,b){return H.ez(a["$as"+H.d(b)],H.cw(a))},
ab:function(a,b,c){var z=H.j3(a,b)
return z==null?null:z[c]},
ac:function(a,b){var z=H.cw(a)
return z==null?null:z[b]},
at:function(a,b){var z
if(a==null)return"dynamic"
if(typeof a==="object"&&a!==null&&a.constructor===Array)return a[0].builtin$cls+H.eu(a,1,b)
if(typeof a=="function")return a.builtin$cls
if(typeof a==="number"&&Math.floor(a)===a)return H.d(a)
if(typeof a.func!="undefined"){z=a.typedef
if(z!=null)return H.at(z,b)
return H.iI(a,b)}return"unknown-reified-type"},
iI:function(a,b){var z,y,x,w,v,u,t,s,r,q,p
z=!!a.v?"void":H.at(a.ret,b)
if("args" in a){y=a.args
for(x=y.length,w="",v="",u=0;u<x;++u,v=", "){t=y[u]
w=w+v+H.at(t,b)}}else{w=""
v=""}if("opt" in a){s=a.opt
w+=v+"["
for(x=s.length,v="",u=0;u<x;++u,v=", "){t=s[u]
w=w+v+H.at(t,b)}w+="]"}if("named" in a){r=a.named
w+=v+"{"
for(x=H.j0(r),q=x.length,v="",u=0;u<q;++u,v=", "){p=x[u]
w=w+v+H.at(r[p],b)+(" "+H.d(p))}w+="}"}return"("+w+") => "+z},
eu:function(a,b,c){var z,y,x,w,v,u
if(a==null)return""
z=new P.ce("")
for(y=b,x=!0,w=!0,v="";y<a.length;++y){if(x)x=!1
else z.a=v+", "
u=a[y]
if(u!=null)w=!1
v=z.a+=H.at(u,c)}return w?"":"<"+z.k(0)+">"},
ez:function(a,b){if(a==null)return b
a=a.apply(null,b)
if(a==null)return
if(typeof a==="object"&&a!==null&&a.constructor===Array)return a
if(typeof a=="function")return a.apply(null,b)
return b},
iS:function(a,b){var z,y
if(a==null||b==null)return!0
z=a.length
for(y=0;y<z;++y)if(!H.I(a[y],b[y]))return!1
return!0},
I:function(a,b){var z,y,x,w,v,u
if(a===b)return!0
if(a==null||b==null)return!0
if(a.builtin$cls==="al")return!0
if('func' in b)return H.es(a,b)
if('func' in a)return b.builtin$cls==="jY"||b.builtin$cls==="c"
z=typeof a==="object"&&a!==null&&a.constructor===Array
y=z?a[0]:a
x=typeof b==="object"&&b!==null&&b.constructor===Array
w=x?b[0]:b
if(w!==y){v=H.at(w,null)
if(!('$is'+v in y.prototype))return!1
u=y.prototype["$as"+v]}else u=null
if(!z&&u==null||!x)return!0
z=z?a.slice(1):null
x=x?b.slice(1):null
return H.iS(H.ez(u,z),x)},
em:function(a,b,c){var z,y,x,w,v
z=b==null
if(z&&a==null)return!0
if(z)return c
if(a==null)return!1
y=a.length
x=b.length
if(c){if(y<x)return!1}else if(y!==x)return!1
for(w=0;w<x;++w){z=a[w]
v=b[w]
if(!(H.I(z,v)||H.I(v,z)))return!1}return!0},
iR:function(a,b){var z,y,x,w,v,u
if(b==null)return!0
if(a==null)return!1
z=Object.getOwnPropertyNames(b)
z.fixed$length=Array
y=z
for(z=y.length,x=0;x<z;++x){w=y[x]
if(!Object.hasOwnProperty.call(a,w))return!1
v=b[w]
u=a[w]
if(!(H.I(v,u)||H.I(u,v)))return!1}return!0},
es:function(a,b){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l
if(!('func' in a))return!1
if("v" in a){if(!("v" in b)&&"ret" in b)return!1}else if(!("v" in b)){z=a.ret
y=b.ret
if(!(H.I(z,y)||H.I(y,z)))return!1}x=a.args
w=b.args
v=a.opt
u=b.opt
t=x!=null?x.length:0
s=w!=null?w.length:0
r=v!=null?v.length:0
q=u!=null?u.length:0
if(t>s)return!1
if(t+r<s+q)return!1
if(t===s){if(!H.em(x,w,!1))return!1
if(!H.em(v,u,!0))return!1}else{for(p=0;p<t;++p){o=x[p]
n=w[p]
if(!(H.I(o,n)||H.I(n,o)))return!1}for(m=p,l=0;m<s;++l,++m){o=v[l]
n=w[m]
if(!(H.I(o,n)||H.I(n,o)))return!1}for(m=0;m<q;++l,++m){o=v[l]
n=u[m]
if(!(H.I(o,n)||H.I(n,o)))return!1}}return H.iR(a.named,b.named)},
kR:function(a){var z=$.cx
return"Instance of "+(z==null?"<Unknown>":z.$1(a))},
kP:function(a){return H.aa(a)},
kO:function(a,b,c){Object.defineProperty(a,b,{value:c,enumerable:false,writable:true,configurable:true})},
jk:function(a){var z,y,x,w,v,u
z=$.cx.$1(a)
y=$.bz[z]
if(y!=null){Object.defineProperty(a,init.dispatchPropertyName,{value:y,enumerable:false,writable:true,configurable:true})
return y.i}x=$.bD[z]
if(x!=null)return x
w=init.interceptorsByTag[z]
if(w==null){z=$.el.$2(a,z)
if(z!=null){y=$.bz[z]
if(y!=null){Object.defineProperty(a,init.dispatchPropertyName,{value:y,enumerable:false,writable:true,configurable:true})
return y.i}x=$.bD[z]
if(x!=null)return x
w=init.interceptorsByTag[z]}}if(w==null)return
x=w.prototype
v=z[0]
if(v==="!"){y=H.cz(x)
$.bz[z]=y
Object.defineProperty(a,init.dispatchPropertyName,{value:y,enumerable:false,writable:true,configurable:true})
return y.i}if(v==="~"){$.bD[z]=x
return x}if(v==="-"){u=H.cz(x)
Object.defineProperty(Object.getPrototypeOf(a),init.dispatchPropertyName,{value:u,enumerable:false,writable:true,configurable:true})
return u.i}if(v==="+")return H.ev(a,x)
if(v==="*")throw H.e(new P.e3(z))
if(init.leafTags[z]===true){u=H.cz(x)
Object.defineProperty(Object.getPrototypeOf(a),init.dispatchPropertyName,{value:u,enumerable:false,writable:true,configurable:true})
return u.i}else return H.ev(a,x)},
ev:function(a,b){var z=Object.getPrototypeOf(a)
Object.defineProperty(z,init.dispatchPropertyName,{value:J.bE(b,z,null,null),enumerable:false,writable:true,configurable:true})
return b},
cz:function(a){return J.bE(a,!1,null,!!a.$isK)},
jl:function(a,b,c){var z=b.prototype
if(init.leafTags[a]===true)return J.bE(z,!1,null,!!z.$isK)
else return J.bE(z,c,null,null)},
jc:function(){if(!0===$.cy)return
$.cy=!0
H.jd()},
jd:function(){var z,y,x,w,v,u,t,s
$.bz=Object.create(null)
$.bD=Object.create(null)
H.j8()
z=init.interceptorsByTag
y=Object.getOwnPropertyNames(z)
if(typeof window!="undefined"){window
x=function(){}
for(w=0;w<y.length;++w){v=y[w]
u=$.ew.$1(v)
if(u!=null){t=H.jl(v,z[v],u)
if(t!=null){Object.defineProperty(u,init.dispatchPropertyName,{value:t,enumerable:false,writable:true,configurable:true})
x.prototype=u}}}}for(w=0;w<y.length;++w){v=y[w]
if(/^[A-Za-z_]/.test(v)){s=z[v]
z["!"+v]=s
z["~"+v]=s
z["-"+v]=s
z["+"+v]=s
z["*"+v]=s}}},
j8:function(){var z,y,x,w,v,u,t
z=C.R()
z=H.ar(C.O,H.ar(C.T,H.ar(C.G,H.ar(C.G,H.ar(C.S,H.ar(C.P,H.ar(C.Q(C.H),z)))))))
if(typeof dartNativeDispatchHooksTransformer!="undefined"){y=dartNativeDispatchHooksTransformer
if(typeof y=="function")y=[y]
if(y.constructor==Array)for(x=0;x<y.length;++x){w=y[x]
if(typeof w=="function")z=w(z)||z}}v=z.getTag
u=z.getUnknownTag
t=z.prototypeForTag
$.cx=new H.j9(v)
$.el=new H.ja(u)
$.ew=new H.jb(t)},
ar:function(a,b){return a(b)||b},
hs:{"^":"c;a,b,c,d,e,f,r,x",q:{
ht:function(a){var z,y,x
z=a.$reflectionInfo
if(z==null)return
z.fixed$length=Array
z=z
y=z[0]
x=z[1]
return new H.hs(a,z,(y&1)===1,y>>1,x>>1,(x&1)===1,z[2],null)}}},
hp:{"^":"k:0;a",
$0:function(){return C.a.al(1000*this.a.now())}},
hR:{"^":"c;a,b,c,d,e,f",
a3:function(a){var z,y,x
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
q:{
a_:function(a){var z,y,x,w,v,u
a=a.replace(String({}),'$receiver$').replace(/[[\]{}()*+?.\\^$|]/g,"\\$&")
z=a.match(/\\\$[a-zA-Z]+\\\$/g)
if(z==null)z=[]
y=z.indexOf("\\$arguments\\$")
x=z.indexOf("\\$argumentsExpr\\$")
w=z.indexOf("\\$expr\\$")
v=z.indexOf("\\$method\\$")
u=z.indexOf("\\$receiver\\$")
return new H.hR(a.replace(new RegExp('\\\\\\$arguments\\\\\\$','g'),'((?:x|[^x])*)').replace(new RegExp('\\\\\\$argumentsExpr\\\\\\$','g'),'((?:x|[^x])*)').replace(new RegExp('\\\\\\$expr\\\\\\$','g'),'((?:x|[^x])*)').replace(new RegExp('\\\\\\$method\\\\\\$','g'),'((?:x|[^x])*)').replace(new RegExp('\\\\\\$receiver\\\\\\$','g'),'((?:x|[^x])*)'),y,x,w,v,u)},
bv:function(a){return function($expr$){var $argumentsExpr$='$arguments$'
try{$expr$.$method$($argumentsExpr$)}catch(z){return z.message}}(a)},
dZ:function(a){return function($expr$){try{$expr$.$method$}catch(z){return z.message}}(a)}}},
dq:{"^":"C;a,b",
k:function(a){var z=this.b
if(z==null)return"NullError: "+H.d(this.a)
return"NullError: method not found: '"+z+"' on null"}},
fO:{"^":"C;a,b,c",
k:function(a){var z,y
z=this.b
if(z==null)return"NoSuchMethodError: "+H.d(this.a)
y=this.c
if(y==null)return"NoSuchMethodError: method not found: '"+z+"' ("+H.d(this.a)+")"
return"NoSuchMethodError: method not found: '"+z+"' on '"+y+"' ("+H.d(this.a)+")"},
q:{
bZ:function(a,b){var z,y
z=b==null
y=z?null:b.method
return new H.fO(a,y,z?null:b.receiver)}}},
hS:{"^":"C;a",
k:function(a){var z=this.a
return z.length===0?"Error":"Error: "+z}},
js:{"^":"k:1;a",
$1:function(a){if(!!J.p(a).$isC)if(a.$thrownJsError==null)a.$thrownJsError=this.a
return a}},
eg:{"^":"c;a,b",
k:function(a){var z,y
z=this.b
if(z!=null)return z
z=this.a
y=z!==null&&typeof z==="object"?z.stack:null
z=y==null?"":y
this.b=z
return z}},
jf:{"^":"k:0;a",
$0:function(){return this.a.$0()}},
jg:{"^":"k:0;a,b",
$0:function(){return this.a.$1(this.b)}},
jh:{"^":"k:0;a,b,c",
$0:function(){return this.a.$2(this.b,this.c)}},
ji:{"^":"k:0;a,b,c,d",
$0:function(){return this.a.$3(this.b,this.c,this.d)}},
jj:{"^":"k:0;a,b,c,d,e",
$0:function(){return this.a.$4(this.b,this.c,this.d,this.e)}},
k:{"^":"c;",
k:function(a){return"Closure '"+H.ca(this).trim()+"'"},
gd4:function(){return this},
gd4:function(){return this}},
dE:{"^":"k;"},
hC:{"^":"dE;",
k:function(a){var z=this.$static_name
if(z==null)return"Closure of unknown static method"
return"Closure '"+z+"'"}},
bL:{"^":"dE;a,b,c,d",
K:function(a,b){if(b==null)return!1
if(this===b)return!0
if(!(b instanceof H.bL))return!1
return this.a===b.a&&this.b===b.b&&this.c===b.c},
gI:function(a){var z,y
z=this.c
if(z==null)y=H.aa(this.a)
else y=typeof z!=="object"?J.au(z):H.aa(z)
return(y^H.aa(this.b))>>>0},
k:function(a){var z=this.c
if(z==null)z=this.a
return"Closure '"+H.d(this.d)+"' of "+H.bq(z)},
q:{
bM:function(a){return a.a},
cL:function(a){return a.c},
eQ:function(){var z=$.aw
if(z==null){z=H.b8("self")
$.aw=z}return z},
b8:function(a){var z,y,x,w,v
z=new H.bL("self","target","receiver","name")
y=Object.getOwnPropertyNames(z)
y.fixed$length=Array
x=y
for(y=x.length,w=0;w<y;++w){v=x[w]
if(z[v]===a)return v}}}},
eT:{"^":"C;a",
k:function(a){return this.a},
q:{
eU:function(a,b){return new H.eT("CastError: Casting value of type '"+a+"' to incompatible type '"+b+"'")}}},
hu:{"^":"C;a",
k:function(a){return"RuntimeError: "+H.d(this.a)}},
ai:{"^":"c;a,b,c,d,e,f,r,$ti",
gt:function(a){return this.a},
gaV:function(a){return this.a===0},
gaH:function(){return new H.fQ(this,[H.ac(this,0)])},
gd3:function(a){return H.c2(this.gaH(),new H.fN(this),H.ac(this,0),H.ac(this,1))},
aL:function(a){var z
if((a&0x3ffffff)===a){z=this.c
if(z==null)return!1
return this.el(z,a)}else return this.fm(a)},
fm:function(a){var z=this.d
if(z==null)return!1
return this.aU(this.b7(z,this.aT(a)),a)>=0},
h:function(a,b){var z,y,x
if(typeof b==="string"){z=this.b
if(z==null)return
y=this.aK(z,b)
return y==null?null:y.b}else if(typeof b==="number"&&(b&0x3ffffff)===b){x=this.c
if(x==null)return
y=this.aK(x,b)
return y==null?null:y.b}else return this.fn(b)},
fn:function(a){var z,y,x
z=this.d
if(z==null)return
y=this.b7(z,this.aT(a))
x=this.aU(y,a)
if(x<0)return
return y[x].b},
l:function(a,b,c){var z,y,x,w,v,u
if(typeof b==="string"){z=this.b
if(z==null){z=this.bw()
this.b=z}this.cd(z,b,c)}else if(typeof b==="number"&&(b&0x3ffffff)===b){y=this.c
if(y==null){y=this.bw()
this.c=y}this.cd(y,b,c)}else{x=this.d
if(x==null){x=this.bw()
this.d=x}w=this.aT(b)
v=this.b7(x,w)
if(v==null)this.bz(x,w,[this.bx(b,c)])
else{u=this.aU(v,b)
if(u>=0)v[u].b=c
else v.push(this.bx(b,c))}}},
aY:function(a,b){if(typeof b==="string")return this.cv(this.b,b)
else if(typeof b==="number"&&(b&0x3ffffff)===b)return this.cv(this.c,b)
else return this.fo(b)},
fo:function(a){var z,y,x,w
z=this.d
if(z==null)return
y=this.b7(z,this.aT(a))
x=this.aU(y,a)
if(x<0)return
w=y.splice(x,1)[0]
this.cC(w)
return w.b},
aE:function(a){if(this.a>0){this.f=null
this.e=null
this.d=null
this.c=null
this.b=null
this.a=0
this.r=this.r+1&67108863}},
cO:function(a,b){var z,y
z=this.e
y=this.r
for(;z!=null;){b.$2(z.a,z.b)
if(y!==this.r)throw H.e(new P.V(this))
z=z.c}},
cd:function(a,b,c){var z=this.aK(a,b)
if(z==null)this.bz(a,b,this.bx(b,c))
else z.b=c},
cv:function(a,b){var z
if(a==null)return
z=this.aK(a,b)
if(z==null)return
this.cC(z)
this.cm(a,b)
return z.b},
bx:function(a,b){var z,y
z=new H.fP(a,b,null,null)
if(this.e==null){this.f=z
this.e=z}else{y=this.f
z.d=y
y.c=z
this.f=z}++this.a
this.r=this.r+1&67108863
return z},
cC:function(a){var z,y
z=a.d
y=a.c
if(z==null)this.e=y
else z.c=y
if(y==null)this.f=z
else y.d=z;--this.a
this.r=this.r+1&67108863},
aT:function(a){return J.au(a)&0x3ffffff},
aU:function(a,b){var z,y
if(a==null)return-1
z=a.length
for(y=0;y<z;++y)if(J.a5(a[y].a,b))return y
return-1},
k:function(a){return P.fV(this)},
aK:function(a,b){return a[b]},
b7:function(a,b){return a[b]},
bz:function(a,b,c){a[b]=c},
cm:function(a,b){delete a[b]},
el:function(a,b){return this.aK(a,b)!=null},
bw:function(){var z=Object.create(null)
this.bz(z,"<non-identifier-key>",z)
this.cm(z,"<non-identifier-key>")
return z},
$isfy:1},
fN:{"^":"k:1;a",
$1:function(a){return this.a.h(0,a)}},
fP:{"^":"c;a,b,c,d"},
fQ:{"^":"i;a,$ti",
gt:function(a){return this.a.a},
gO:function(a){var z,y
z=this.a
y=new H.fR(z,z.r,null,null)
y.c=z.e
return y}},
fR:{"^":"c;a,b,c,d",
gG:function(){return this.d},
D:function(){var z=this.a
if(this.b!==z.r)throw H.e(new P.V(z))
else{z=this.c
if(z==null){this.d=null
return!1}else{this.d=z.a
this.c=z.c
return!0}}}},
j9:{"^":"k:1;a",
$1:function(a){return this.a(a)}},
ja:{"^":"k:7;a",
$2:function(a,b){return this.a(a,b)}},
jb:{"^":"k:8;a",
$1:function(a){return this.a(a)}}}],["","",,H,{"^":"",
j0:function(a){var z=H.f(a?Object.keys(a):[],[null])
z.fixed$length=Array
return z}}],["","",,H,{"^":"",
jn:function(a){if(typeof dartPrint=="function"){dartPrint(a)
return}if(typeof console=="object"&&typeof console.log!="undefined"){console.log(a)
return}if(typeof window=="object")return
if(typeof print=="function"){print(a)
return}throw"Unable to print message: "+String(a)}}],["","",,H,{"^":"",
b:function(a){return a},
di:{"^":"h;",$isdi:1,"%":"ArrayBuffer"},
c6:{"^":"h;",$isc6:1,"%":"DataView;ArrayBufferView;c4|dk|dm|c5|dj|dl|a9"},
c4:{"^":"c6;",
gt:function(a){return a.length},
$isD:1,
$asD:I.G,
$isK:1,
$asK:I.G},
c5:{"^":"dm;",
h:function(a,b){if(b>>>0!==b||b>=a.length)H.t(H.y(a,b))
return a[b]},
l:function(a,b,c){if(b>>>0!==b||b>=a.length)H.t(H.y(a,b))
a[b]=c}},
a9:{"^":"dl;",
l:function(a,b,c){if(b>>>0!==b||b>=a.length)H.t(H.y(a,b))
a[b]=c},
$isi:1,
$asi:function(){return[P.l]},
$isj:1,
$asj:function(){return[P.l]}},
k8:{"^":"c5;",$isi:1,
$asi:function(){return[P.a1]},
$isj:1,
$asj:function(){return[P.a1]},
"%":"Float32Array"},
h6:{"^":"c5;",$isi:1,
$asi:function(){return[P.a1]},
$isj:1,
$asj:function(){return[P.a1]},
"%":"Float64Array"},
k9:{"^":"a9;",
h:function(a,b){if(b>>>0!==b||b>=a.length)H.t(H.y(a,b))
return a[b]},
$isi:1,
$asi:function(){return[P.l]},
$isj:1,
$asj:function(){return[P.l]},
"%":"Int16Array"},
ka:{"^":"a9;",
h:function(a,b){if(b>>>0!==b||b>=a.length)H.t(H.y(a,b))
return a[b]},
$isi:1,
$asi:function(){return[P.l]},
$isj:1,
$asj:function(){return[P.l]},
"%":"Int32Array"},
kb:{"^":"a9;",
h:function(a,b){if(b>>>0!==b||b>=a.length)H.t(H.y(a,b))
return a[b]},
$isi:1,
$asi:function(){return[P.l]},
$isj:1,
$asj:function(){return[P.l]},
"%":"Int8Array"},
kc:{"^":"a9;",
h:function(a,b){if(b>>>0!==b||b>=a.length)H.t(H.y(a,b))
return a[b]},
$isi:1,
$asi:function(){return[P.l]},
$isj:1,
$asj:function(){return[P.l]},
"%":"Uint16Array"},
kd:{"^":"a9;",
h:function(a,b){if(b>>>0!==b||b>=a.length)H.t(H.y(a,b))
return a[b]},
$isi:1,
$asi:function(){return[P.l]},
$isj:1,
$asj:function(){return[P.l]},
"%":"Uint32Array"},
ke:{"^":"a9;",
gt:function(a){return a.length},
h:function(a,b){if(b>>>0!==b||b>=a.length)H.t(H.y(a,b))
return a[b]},
$isi:1,
$asi:function(){return[P.l]},
$isj:1,
$asj:function(){return[P.l]},
"%":"CanvasPixelArray|Uint8ClampedArray"},
kf:{"^":"a9;",
gt:function(a){return a.length},
h:function(a,b){if(b>>>0!==b||b>=a.length)H.t(H.y(a,b))
return a[b]},
$isi:1,
$asi:function(){return[P.l]},
$isj:1,
$asj:function(){return[P.l]},
"%":";Uint8Array"},
dj:{"^":"c4+aD;",$asD:I.G,$isi:1,
$asi:function(){return[P.l]},
$asK:I.G,
$isj:1,
$asj:function(){return[P.l]}},
dk:{"^":"c4+aD;",$asD:I.G,$isi:1,
$asi:function(){return[P.a1]},
$asK:I.G,
$isj:1,
$asj:function(){return[P.a1]}},
dl:{"^":"dj+d2;",$asD:I.G,
$asi:function(){return[P.l]},
$asK:I.G,
$asj:function(){return[P.l]}},
dm:{"^":"dk+d2;",$asD:I.G,
$asi:function(){return[P.a1]},
$asK:I.G,
$asj:function(){return[P.a1]}}}],["","",,P,{"^":"",
i3:function(){var z,y,x
z={}
if(self.scheduleImmediate!=null)return P.iT()
if(self.MutationObserver!=null&&self.document!=null){y=self.document.createElement("div")
x=self.document.createElement("span")
z.a=null
new self.MutationObserver(H.aL(new P.i5(z),1)).observe(y,{childList:true})
return new P.i4(z,y,x)}else if(self.setImmediate!=null)return P.iU()
return P.iV()},
kB:[function(a){++init.globalState.f.b
self.scheduleImmediate(H.aL(new P.i6(a),0))},"$1","iT",2,0,3],
kC:[function(a){++init.globalState.f.b
self.setImmediate(H.aL(new P.i7(a),0))},"$1","iU",2,0,3],
kD:[function(a){P.cg(C.E,a)},"$1","iV",2,0,3],
iL:function(){var z,y
for(;z=$.aq,z!=null;){$.aJ=null
y=z.b
$.aq=y
if(y==null)$.aI=null
z.a.$0()}},
kN:[function(){$.cq=!0
try{P.iL()}finally{$.aJ=null
$.cq=!1
if($.aq!=null)$.$get$cj().$1(P.en())}},"$0","en",0,0,2],
iP:function(a){var z=new P.e8(a,null)
if($.aq==null){$.aI=z
$.aq=z
if(!$.cq)$.$get$cj().$1(P.en())}else{$.aI.b=z
$.aI=z}},
iQ:function(a){var z,y,x
z=$.aq
if(z==null){P.iP(a)
$.aJ=$.aI
return}y=new P.e8(a,null)
x=$.aJ
if(x==null){y.b=z
$.aJ=y
$.aq=y}else{y.b=x.b
x.b=y
$.aJ=y
if(y.b==null)$.aI=y}},
hP:function(a,b){var z=$.N
if(z===C.l){z.toString
return P.cg(a,b)}return P.cg(a,z.eH(b))},
dP:function(a,b){var z,y
z=$.N
if(z===C.l){z.toString
return P.dQ(a,b)}y=z.cF(b)
$.N.toString
return P.dQ(a,y)},
cg:function(a,b){var z=C.b.ah(a.a,1000)
return H.hK(z<0?0:z,b)},
dQ:function(a,b){var z=C.b.ah(a.a,1000)
return H.hL(z<0?0:z,b)},
ej:function(a,b,c,d,e){var z={}
z.a=d
P.iQ(new P.iM(z,e))},
iN:function(a,b,c,d){var z,y
y=$.N
if(y===c)return d.$0()
$.N=c
z=y
try{y=d.$0()
return y}finally{$.N=z}},
iO:function(a,b,c,d,e){var z,y
y=$.N
if(y===c)return d.$1(e)
$.N=c
z=y
try{y=d.$1(e)
return y}finally{$.N=z}},
i5:{"^":"k:1;a",
$1:function(a){var z,y;--init.globalState.f.b
z=this.a
y=z.a
z.a=null
y.$0()}},
i4:{"^":"k:9;a,b,c",
$1:function(a){var z,y;++init.globalState.f.b
this.a.a=a
z=this.b
y=this.c
z.firstChild?z.removeChild(y):z.appendChild(y)}},
i6:{"^":"k:0;a",
$0:function(){--init.globalState.f.b
this.a.$0()}},
i7:{"^":"k:0;a",
$0:function(){--init.globalState.f.b
this.a.$0()}},
e8:{"^":"c;a,b"},
dN:{"^":"c;"},
iF:{"^":"c;"},
iM:{"^":"k:0;a,b",
$0:function(){var z,y,x
z=this.a
y=z.a
if(y==null){x=new P.dr()
z.a=x
z=x}else z=y
y=this.b
if(y==null)throw H.e(z)
x=H.e(z)
x.stack=y.k(0)
throw x}},
it:{"^":"iF;",
gaI:function(a){return},
fJ:function(a){var z,y,x
try{if(C.l===$.N){a.$0()
return}P.iN(null,null,this,a)}catch(x){z=H.S(x)
y=H.b6(x)
P.ej(null,null,this,z,y)}},
fK:function(a,b){var z,y,x
try{if(C.l===$.N){a.$1(b)
return}P.iO(null,null,this,a,b)}catch(x){z=H.S(x)
y=H.b6(x)
P.ej(null,null,this,z,y)}},
eH:function(a){return new P.iu(this,a)},
cF:function(a){return new P.iv(this,a)},
h:function(a,b){return}},
iu:{"^":"k:0;a,b",
$0:function(){return this.a.fJ(this.b)}},
iv:{"^":"k:1;a,b",
$1:function(a){return this.a.fK(this.b,a)}}}],["","",,P,{"^":"",
dc:function(){return new H.ai(0,null,null,null,null,null,0,[null,null])},
aC:function(a){return H.j1(a,new H.ai(0,null,null,null,null,null,0,[null,null]))},
aQ:function(a,b,c,d,e){return new P.ig(0,null,null,null,null,[d,e])},
fG:function(a,b,c){var z,y
if(P.cr(a)){if(b==="("&&c===")")return"(...)"
return b+"..."+c}z=[]
y=$.$get$aK()
y.push(a)
try{P.iJ(a,z)}finally{y.pop()}y=P.dC(b,z,", ")+c
return y.charCodeAt(0)==0?y:y},
bl:function(a,b,c){var z,y,x
if(P.cr(a))return b+"..."+c
z=new P.ce(b)
y=$.$get$aK()
y.push(a)
try{x=z
x.a=P.dC(x.gaB(),a,", ")}finally{y.pop()}y=z
y.a=y.gaB()+c
y=z.gaB()
return y.charCodeAt(0)==0?y:y},
cr:function(a){var z,y
for(z=0;y=$.$get$aK(),z<y.length;++z)if(a===y[z])return!0
return!1},
iJ:function(a,b){var z,y,x,w,v,u,t,s,r,q
z=a.gO(a)
y=0
x=0
while(!0){if(!(y<80||x<3))break
if(!z.D())return
w=H.d(z.gG())
b.push(w)
y+=w.length+2;++x}if(!z.D()){if(x<=5)return
v=b.pop()
u=b.pop()}else{t=z.gG();++x
if(!z.D()){if(x<=4){b.push(H.d(t))
return}v=H.d(t)
u=b.pop()
y+=v.length+2}else{s=z.gG();++x
for(;z.D();t=s,s=r){r=z.gG();++x
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
X:function(a,b,c,d){return new P.ij(0,null,null,null,null,null,0,[d])},
dd:function(a,b){var z,y,x
z=P.X(null,null,null,b)
for(y=a.length,x=0;x<a.length;a.length===y||(0,H.eA)(a),++x)z.F(0,a[x])
return z},
fV:function(a){var z,y,x
z={}
if(P.cr(a))return"{...}"
y=new P.ce("")
try{$.$get$aK().push(a)
x=y
x.a=x.gaB()+"{"
z.a=!0
a.cO(0,new P.fW(z,y))
z=y
z.a=z.gaB()+"}"}finally{$.$get$aK().pop()}z=y.gaB()
return z.charCodeAt(0)==0?z:z},
ig:{"^":"c;a,b,c,d,e,$ti",
gt:function(a){return this.a},
aL:function(a){var z
if((a&0x3ffffff)===a){z=this.c
return z==null?!1:z[a]!=null}else return this.ek(a)},
ek:function(a){var z=this.d
if(z==null)return!1
return this.ag(z[this.af(a)],a)>=0},
h:function(a,b){var z,y,x,w
if(typeof b==="string"&&b!=="__proto__"){z=this.b
if(z==null)y=null
else{x=z[b]
y=x===z?null:x}return y}else if(typeof b==="number"&&(b&0x3ffffff)===b){w=this.c
if(w==null)y=null
else{x=w[b]
y=x===w?null:x}return y}else return this.ep(b)},
ep:function(a){var z,y,x
z=this.d
if(z==null)return
y=z[this.af(a)]
x=this.ag(y,a)
return x<0?null:y[x+1]},
l:function(a,b,c){var z,y
if(typeof b==="string"&&b!=="__proto__"){z=this.b
if(z==null){z=P.ck()
this.b=z}this.cj(z,b,c)}else if(typeof b==="number"&&(b&0x3ffffff)===b){y=this.c
if(y==null){y=P.ck()
this.c=y}this.cj(y,b,c)}else this.ey(b,c)},
ey:function(a,b){var z,y,x,w
z=this.d
if(z==null){z=P.ck()
this.d=z}y=this.af(a)
x=z[y]
if(x==null){P.cl(z,y,[a,b]);++this.a
this.e=null}else{w=this.ag(x,a)
if(w>=0)x[w+1]=b
else{x.push(a,b);++this.a
this.e=null}}},
cO:function(a,b){var z,y,x,w
z=this.ei()
for(y=z.length,x=0;x<y;++x){w=z[x]
b.$2(w,this.h(0,w))
if(z!==this.e)throw H.e(new P.V(this))}},
ei:function(){var z,y,x,w,v,u,t,s,r,q,p,o
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
cj:function(a,b,c){if(a[b]==null){++this.a
this.e=null}P.cl(a,b,c)},
af:function(a){return J.au(a)&0x3ffffff},
ag:function(a,b){var z,y
if(a==null)return-1
z=a.length
for(y=0;y<z;y+=2)if(J.a5(a[y],b))return y
return-1},
q:{
cl:function(a,b,c){if(c==null)a[b]=a
else a[b]=c},
ck:function(){var z=Object.create(null)
P.cl(z,"<non-identifier-key>",z)
delete z["<non-identifier-key>"]
return z}}},
ef:{"^":"ai;a,b,c,d,e,f,r,$ti",
aT:function(a){return H.jm(a)&0x3ffffff},
aU:function(a,b){var z,y,x
if(a==null)return-1
z=a.length
for(y=0;y<z;++y){x=a[y].a
if(x==null?b==null:x===b)return y}return-1},
q:{
aH:function(a,b){return new P.ef(0,null,null,null,null,null,0,[a,b])}}},
ij:{"^":"ih;a,b,c,d,e,f,r,$ti",
gO:function(a){var z=new P.ee(this,this.r,null,null)
z.c=this.e
return z},
gt:function(a){return this.a},
P:function(a,b){var z,y
if(typeof b==="string"&&b!=="__proto__"){z=this.b
if(z==null)return!1
return z[b]!=null}else if(typeof b==="number"&&(b&0x3ffffff)===b){y=this.c
if(y==null)return!1
return y[b]!=null}else return this.ej(b)},
ej:function(a){var z=this.d
if(z==null)return!1
return this.ag(z[this.af(a)],a)>=0},
cU:function(a){var z=typeof a==="number"&&(a&0x3ffffff)===a
if(z)return this.P(0,a)?a:null
else return this.es(a)},
es:function(a){var z,y,x
z=this.d
if(z==null)return
y=z[this.af(a)]
x=this.ag(y,a)
if(x<0)return
return J.cC(y,x).gen()},
F:function(a,b){var z,y,x
if(typeof b==="string"&&b!=="__proto__"){z=this.b
if(z==null){y=Object.create(null)
y["<non-identifier-key>"]=y
delete y["<non-identifier-key>"]
this.b=y
z=y}return this.ci(z,b)}else if(typeof b==="number"&&(b&0x3ffffff)===b){x=this.c
if(x==null){y=Object.create(null)
y["<non-identifier-key>"]=y
delete y["<non-identifier-key>"]
this.c=y
x=y}return this.ci(x,b)}else return this.ae(b)},
ae:function(a){var z,y,x
z=this.d
if(z==null){z=P.il()
this.d=z}y=this.af(a)
x=z[y]
if(x==null)z[y]=[this.bs(a)]
else{if(this.ag(x,a)>=0)return!1
x.push(this.bs(a))}return!0},
aY:function(a,b){if(typeof b==="string"&&b!=="__proto__")return this.ck(this.b,b)
else if(typeof b==="number"&&(b&0x3ffffff)===b)return this.ck(this.c,b)
else return this.eu(b)},
eu:function(a){var z,y,x
z=this.d
if(z==null)return!1
y=z[this.af(a)]
x=this.ag(y,a)
if(x<0)return!1
this.cl(y.splice(x,1)[0])
return!0},
aE:function(a){if(this.a>0){this.f=null
this.e=null
this.d=null
this.c=null
this.b=null
this.a=0
this.r=this.r+1&67108863}},
ci:function(a,b){if(a[b]!=null)return!1
a[b]=this.bs(b)
return!0},
ck:function(a,b){var z
if(a==null)return!1
z=a[b]
if(z==null)return!1
this.cl(z)
delete a[b]
return!0},
bs:function(a){var z,y
z=new P.ik(a,null,null)
if(this.e==null){this.f=z
this.e=z}else{y=this.f
z.c=y
y.b=z
this.f=z}++this.a
this.r=this.r+1&67108863
return z},
cl:function(a){var z,y
z=a.c
y=a.b
if(z==null)this.e=y
else z.b=y
if(y==null)this.f=z
else y.c=z;--this.a
this.r=this.r+1&67108863},
af:function(a){return J.au(a)&0x3ffffff},
ag:function(a,b){var z,y
if(a==null)return-1
z=a.length
for(y=0;y<z;++y)if(J.a5(a[y].a,b))return y
return-1},
$isi:1,
$asi:null,
q:{
il:function(){var z=Object.create(null)
z["<non-identifier-key>"]=z
delete z["<non-identifier-key>"]
return z}}},
ik:{"^":"c;en:a<,b,c"},
ee:{"^":"c;a,b,c,d",
gG:function(){return this.d},
D:function(){var z=this.a
if(this.b!==z.r)throw H.e(new P.V(z))
else{z=this.c
if(z==null){this.d=null
return!1}else{this.d=z.a
this.c=z.b
return!0}}}},
ih:{"^":"hw;$ti"},
de:{"^":"ha;$ti"},
aD:{"^":"c;$ti",
gO:function(a){return new H.df(a,this.gt(a),0,null)},
Z:function(a,b){return this.h(a,b)},
cV:function(a,b){return new H.c3(a,b,[H.ab(a,"aD",0),null])},
fe:function(a,b,c){var z,y,x
z=this.gt(a)
for(y=b,x=0;x<z;++x){y=c.$2(y,this.h(a,x))
if(z!==this.gt(a))throw H.e(new P.V(a))}return y},
k:function(a){return P.bl(a,"[","]")},
$isi:1,
$asi:null,
$isj:1,
$asj:null},
fW:{"^":"k:10;a,b",
$2:function(a,b){var z,y
z=this.a
if(!z.a)this.b.a+=", "
z.a=!1
z=this.b
y=z.a+=H.d(a)
z.a=y+": "
z.a+=H.d(b)}},
fS:{"^":"aW;a,b,c,d,$ti",
gO:function(a){return new P.im(this,this.c,this.d,this.b,null)},
gaV:function(a){return this.b===this.c},
gt:function(a){return(this.c-this.b&this.a.length-1)>>>0},
Z:function(a,b){var z,y
z=(this.c-this.b&this.a.length-1)>>>0
if(0>b||b>=z)H.t(P.aB(b,this,"index",null,z))
y=this.a
return y[(this.b+b&y.length-1)>>>0]},
aE:function(a){var z,y,x,w
z=this.b
y=this.c
if(z!==y){for(x=this.a,w=x.length-1;z!==y;z=(z+1&w)>>>0)x[z]=null
this.c=0
this.b=0;++this.d}},
k:function(a){return P.bl(this,"{","}")},
cZ:function(){var z,y,x
z=this.b
if(z===this.c)throw H.e(H.bW());++this.d
y=this.a
x=y[z]
y[z]=null
this.b=(z+1&y.length-1)>>>0
return x},
ae:function(a){var z,y
z=this.a
y=this.c
z[y]=a
z=(y+1&z.length-1)>>>0
this.c=z
if(this.b===z)this.cs();++this.d},
cs:function(){var z,y,x,w
z=new Array(this.a.length*2)
z.fixed$length=Array
y=H.f(z,this.$ti)
z=this.a
x=this.b
w=z.length-x
C.d.V(y,0,w,z,x)
C.d.V(y,w,w+this.b,this.a,0)
this.b=0
this.c=this.a.length
this.a=y},
e3:function(a,b){var z=new Array(8)
z.fixed$length=Array
this.a=H.f(z,[b])},
$asi:null,
q:{
c_:function(a,b){var z=new P.fS(null,0,0,0,[b])
z.e3(a,b)
return z}}},
im:{"^":"c;a,b,c,d,e",
gG:function(){return this.e},
D:function(){var z,y
z=this.a
if(this.c!==z.d)H.t(new P.V(z))
y=this.d
if(y===this.b){this.e=null
return!1}z=z.a
this.e=z[y]
this.d=(y+1&z.length-1)>>>0
return!0}},
hx:{"^":"c;$ti",
ai:function(a,b){var z
for(z=J.aM(b);z.D();)this.F(0,z.gG())},
k:function(a){return P.bl(this,"{","}")},
$isi:1,
$asi:null},
hw:{"^":"hx;$ti"},
ha:{"^":"c+aD;",$isi:1,$asi:null,$isj:1,$asj:null}}],["","",,P,{"^":"",
jz:[function(a,b){return J.eE(a,b)},"$2","iZ",4,0,15],
d0:function(a){if(typeof a==="number"||typeof a==="boolean"||null==a)return J.a2(a)
if(typeof a==="string")return JSON.stringify(a)
return P.fo(a)},
fo:function(a){var z=J.p(a)
if(!!z.$isk)return z.k(a)
return H.bq(a)},
bi:function(a){return new P.ie(a)},
aj:function(a,b,c,d){var z,y,x
z=J.fJ(a,d)
if(a!==0&&!0)for(y=z.length,x=0;x<y;++x)z[x]=b
return z},
c0:function(a,b,c){var z,y
z=H.f([],[c])
for(y=J.aM(a);y.D();)z.push(y.gG())
return z},
cA:function(a){H.jn(H.d(a))},
cs:{"^":"c;"},
"+bool":0,
u:{"^":"c;"},
a1:{"^":"P;",$isu:1,
$asu:function(){return[P.P]}},
"+double":0,
ay:{"^":"c;a",
p:function(a,b){return new P.ay(C.b.p(this.a,b.gcn()))},
C:function(a,b){return C.b.C(this.a,b.gcn())},
a_:function(a,b){return C.b.a_(this.a,b.gcn())},
K:function(a,b){if(b==null)return!1
if(!(b instanceof P.ay))return!1
return this.a===b.a},
gI:function(a){return this.a&0x1FFFFFFF},
aF:function(a,b){return C.b.aF(this.a,b.a)},
k:function(a){var z,y,x,w,v
z=new P.fh()
y=this.a
if(y<0)return"-"+new P.ay(0-y).k(0)
x=z.$1(C.b.ah(y,6e7)%60)
w=z.$1(C.b.ah(y,1e6)%60)
v=new P.fg().$1(y%1e6)
return""+C.b.ah(y,36e8)+":"+H.d(x)+":"+H.d(w)+"."+H.d(v)},
$isu:1,
$asu:function(){return[P.ay]},
q:{
cX:function(a,b,c,d,e,f){return new P.ay(864e8*a+36e8*b+6e7*e+1e6*f+1000*d+c)}}},
fg:{"^":"k:4;",
$1:function(a){if(a>=1e5)return""+a
if(a>=1e4)return"0"+a
if(a>=1000)return"00"+a
if(a>=100)return"000"+a
if(a>=10)return"0000"+a
return"00000"+a}},
fh:{"^":"k:4;",
$1:function(a){if(a>=10)return""+a
return"0"+a}},
C:{"^":"c;"},
dr:{"^":"C;",
k:function(a){return"Throw of null."}},
a7:{"^":"C;a,b,c,d",
gbv:function(){return"Invalid argument"+(!this.a?"(s)":"")},
gbu:function(){return""},
k:function(a){var z,y,x,w,v,u
z=this.c
y=z!=null?" ("+z+")":""
z=this.d
x=z==null?"":": "+z
w=this.gbv()+y+x
if(!this.a)return w
v=this.gbu()
u=P.d0(this.b)
return w+v+": "+H.d(u)},
q:{
cH:function(a){return new P.a7(!1,null,null,a)},
cI:function(a,b,c){return new P.a7(!0,a,b,c)}}},
dv:{"^":"a7;e,f,a,b,c,d",
gbv:function(){return"RangeError"},
gbu:function(){var z,y,x
z=this.e
if(z==null){z=this.f
y=z!=null?": Not less than or equal to "+H.d(z):""}else{x=this.f
if(x==null)y=": Not greater than or equal to "+H.d(z)
else if(x>z)y=": Not in range "+H.d(z)+".."+H.d(x)+", inclusive"
else y=x<z?": Valid value range is empty":": Only valid value is "+H.d(z)}return y},
q:{
br:function(a,b,c){return new P.dv(null,null,!0,a,b,"Value not in range")},
Z:function(a,b,c,d,e){return new P.dv(b,c,!0,a,d,"Invalid value")},
cb:function(a,b,c,d,e,f){if(0>a||a>c)throw H.e(P.Z(a,0,c,"start",f))
if(a>b||b>c)throw H.e(P.Z(b,a,c,"end",f))
return b}}},
ft:{"^":"a7;e,t:f>,a,b,c,d",
gbv:function(){return"RangeError"},
gbu:function(){if(J.cB(this.b,0))return": index must not be negative"
var z=this.f
if(z===0)return": no indices are valid"
return": index should be less than "+H.d(z)},
q:{
aB:function(a,b,c,d,e){var z=e!=null?e:J.ad(b)
return new P.ft(b,z,!0,a,c,"Index out of range")}}},
H:{"^":"C;a",
k:function(a){return"Unsupported operation: "+this.a}},
e3:{"^":"C;a",
k:function(a){var z=this.a
return z!=null?"UnimplementedError: "+z:"UnimplementedError"}},
b0:{"^":"C;a",
k:function(a){return"Bad state: "+this.a}},
V:{"^":"C;a",
k:function(a){var z=this.a
if(z==null)return"Concurrent modification during iteration."
return"Concurrent modification during iteration: "+H.d(P.d0(z))+"."}},
dB:{"^":"c;",
k:function(a){return"Stack Overflow"},
$isC:1},
f4:{"^":"C;a",
k:function(a){var z=this.a
return z==null?"Reading static variable during its initialization":"Reading static variable '"+z+"' during its initialization"}},
ie:{"^":"c;a",
k:function(a){var z=this.a
if(z==null)return"Exception"
return"Exception: "+H.d(z)}},
fp:{"^":"c;a,b",
k:function(a){return"Expando:"+H.d(this.a)},
h:function(a,b){var z,y
z=this.b
if(typeof z!=="string"){if(b==null||typeof b==="boolean"||typeof b==="number"||typeof b==="string")H.t(P.cI(b,"Expandos are not allowed on strings, numbers, booleans or null",null))
return z.get(b)}y=H.c9(b,"expando$values")
return y==null?null:H.c9(y,z)},
l:function(a,b,c){var z,y
z=this.b
if(typeof z!=="string")z.set(b,c)
else{y=H.c9(b,"expando$values")
if(y==null){y=new P.c()
H.du(b,"expando$values",y)}H.du(y,z,c)}}},
l:{"^":"P;",$isu:1,
$asu:function(){return[P.P]}},
"+int":0,
W:{"^":"c;$ti",
bX:["dQ",function(a,b){return new H.e7(this,b,[H.ab(this,"W",0)])}],
gt:function(a){var z,y
z=this.gO(this)
for(y=0;z.D();)++y
return y},
gay:function(a){var z,y
z=this.gO(this)
if(!z.D())throw H.e(H.bW())
y=z.gG()
if(z.D())throw H.e(H.fI())
return y},
Z:function(a,b){var z,y,x
if(b<0)H.t(P.Z(b,0,null,"index",null))
for(z=this.gO(this),y=0;z.D();){x=z.gG()
if(b===y)return x;++y}throw H.e(P.aB(b,this,"index",null,y))},
k:function(a){return P.fG(this,"(",")")}},
d8:{"^":"c;"},
j:{"^":"c;$ti",$isi:1,$asi:null,$asj:null},
"+List":0,
al:{"^":"c;",
gI:function(a){return P.c.prototype.gI.call(this,this)},
k:function(a){return"null"}},
"+Null":0,
P:{"^":"c;",$isu:1,
$asu:function(){return[P.P]}},
"+num":0,
c:{"^":";",
K:function(a,b){return this===b},
gI:function(a){return H.aa(this)},
k:function(a){return H.bq(this)},
toString:function(){return this.k(this)}},
bu:{"^":"c;a,b",
b3:function(a){if(this.b!=null){this.a=this.a+($.r.$0()-this.b)
this.b=null}}},
w:{"^":"c;",$isu:1,
$asu:function(){return[P.w]}},
"+String":0,
ce:{"^":"c;aB:a<",
gt:function(a){return this.a.length},
k:function(a){var z=this.a
return z.charCodeAt(0)==0?z:z},
q:{
dC:function(a,b,c){var z=J.aM(b)
if(!z.D())return a
if(c.length===0){do a+=H.d(z.gG())
while(z.D())}else{a+=H.d(z.gG())
for(;z.D();)a=a+c+H.d(z.gG())}return a}}}}],["","",,W,{"^":"",
fn:function(a,b,c){var z,y
z=document.body
y=(z&&C.C).a1(z,a,b,c)
y.toString
z=new H.e7(new W.R(y),new W.iY(),[W.o])
return z.gay(z)},
aA:function(a){var z,y,x
z="element tag unavailable"
try{y=J.eI(a)
if(typeof y==="string")z=a.tagName}catch(x){H.S(x)}return z},
ib:function(a,b){return document.createElement(a)},
iH:function(a){if(a==null)return
return W.ea(a)},
ek:function(a){var z=$.N
if(z===C.l)return a
return z.cF(a)},
v:{"^":"ag;","%":"HTMLBRElement|HTMLBaseElement|HTMLButtonElement|HTMLContentElement|HTMLDListElement|HTMLDataListElement|HTMLDetailsElement|HTMLDialogElement|HTMLDirectoryElement|HTMLDivElement|HTMLFieldSetElement|HTMLFontElement|HTMLFrameElement|HTMLHRElement|HTMLHeadElement|HTMLHeadingElement|HTMLHtmlElement|HTMLKeygenElement|HTMLLIElement|HTMLLabelElement|HTMLLegendElement|HTMLLinkElement|HTMLMapElement|HTMLMarqueeElement|HTMLMenuElement|HTMLMenuItemElement|HTMLMetaElement|HTMLMeterElement|HTMLModElement|HTMLOListElement|HTMLOptGroupElement|HTMLOptionElement|HTMLOutputElement|HTMLParagraphElement|HTMLParamElement|HTMLPictureElement|HTMLPreElement|HTMLProgressElement|HTMLQuoteElement|HTMLScriptElement|HTMLShadowElement|HTMLSlotElement|HTMLSourceElement|HTMLSpanElement|HTMLStyleElement|HTMLTableCaptionElement|HTMLTableCellElement|HTMLTableColElement|HTMLTableDataCellElement|HTMLTableHeaderCellElement|HTMLTextAreaElement|HTMLTitleElement|HTMLTrackElement|HTMLUListElement|HTMLUnknownElement;HTMLElement"},
jv:{"^":"v;",
k:function(a){return String(a)},
$ish:1,
"%":"HTMLAnchorElement"},
jx:{"^":"v;",
k:function(a){return String(a)},
$ish:1,
"%":"HTMLAreaElement"},
bJ:{"^":"v;",$ish:1,$isbJ:1,"%":"HTMLBodyElement"},
cM:{"^":"v;a8:height}",$iscM:1,"%":"HTMLCanvasElement"},
jy:{"^":"o;t:length=",$ish:1,"%":"CDATASection|CharacterData|Comment|ProcessingInstruction|Text"},
jA:{"^":"o;",$ish:1,"%":"DocumentFragment|ShadowRoot"},
jB:{"^":"h;",
k:function(a){return String(a)},
"%":"DOMException"},
ag:{"^":"o;fM:tagName=",
geG:function(a){return new W.ia(a)},
k:function(a){return a.localName},
a1:["br",function(a,b,c,d){var z,y,x,w,v
if(c==null){z=$.d_
if(z==null){z=H.f([],[W.dn])
y=new W.dp(z)
z.push(W.ec(null))
z.push(W.eh())
$.d_=y
d=y}else d=z
z=$.cZ
if(z==null){z=new W.ei(d)
$.cZ=z
c=z}else{z.a=d
c=z}}if($.a3==null){z=document
y=z.implementation.createHTMLDocument("")
$.a3=y
$.bT=y.createRange()
y=$.a3
y.toString
x=y.createElement("base")
x.href=z.baseURI
$.a3.head.appendChild(x)}z=$.a3
if(z.body==null){z.toString
y=z.createElement("body")
z.body=y}z=$.a3
if(!!this.$isbJ)w=z.body
else{y=a.tagName
z.toString
w=z.createElement(y)
$.a3.body.appendChild(w)}if("createContextualFragment" in window.Range.prototype&&!C.d.P(C.a0,a.tagName)){$.bT.selectNodeContents(w)
v=$.bT.createContextualFragment(b)}else{w.innerHTML=b
v=$.a3.createDocumentFragment()
for(;z=w.firstChild,z!=null;)v.appendChild(z)}z=$.a3.body
if(w==null?z!=null:w!==z)J.eK(w)
c.c5(v)
document.adoptNode(v)
return v},function(a,b,c){return this.a1(a,b,c,null)},"eS",null,null,"ghc",2,5,null],
scS:function(a,b){this.bo(a,b)},
bp:function(a,b,c,d){a.textContent=null
a.appendChild(this.a1(a,b,c,d))},
bo:function(a,b){return this.bp(a,b,null,null)},
$ish:1,
$isc:1,
$isag:1,
$iso:1,
"%":";Element"},
iY:{"^":"k:1;",
$1:function(a){return!!J.p(a).$isag}},
jC:{"^":"v;a8:height}","%":"HTMLEmbedElement"},
bU:{"^":"h;","%":"MediaStream;EventTarget"},
jX:{"^":"v;t:length=","%":"HTMLFormElement"},
jZ:{"^":"v;a8:height}","%":"HTMLIFrameElement"},
k_:{"^":"v;a8:height}","%":"HTMLImageElement"},
k1:{"^":"v;a8:height}",$ish:1,$isag:1,"%":"HTMLInputElement"},
k4:{"^":"h;",
k:function(a){return String(a)},
"%":"Location"},
fY:{"^":"v;","%":"HTMLAudioElement;HTMLMediaElement"},
k7:{"^":"fZ;",
h3:function(a,b,c){return a.send(b,c)},
ac:function(a,b){return a.send(b)},
"%":"MIDIOutput"},
fZ:{"^":"bU;","%":"MIDIInput;MIDIPort"},
kg:{"^":"h;",$ish:1,"%":"Navigator"},
R:{"^":"de;a",
gay:function(a){var z,y
z=this.a
y=z.childNodes.length
if(y===0)throw H.e(new P.b0("No elements"))
if(y>1)throw H.e(new P.b0("More than one element"))
return z.firstChild},
ai:function(a,b){var z,y,x,w
z=b.a
y=this.a
if(z!==y)for(x=z.childNodes.length,w=0;w<x;++w)y.appendChild(z.firstChild)
return},
l:function(a,b,c){var z=this.a
z.replaceChild(c,z.childNodes[b])},
gO:function(a){var z=this.a.childNodes
return new W.d3(z,z.length,-1,null)},
gt:function(a){return this.a.childNodes.length},
h:function(a,b){return this.a.childNodes[b]},
$asi:function(){return[W.o]},
$asde:function(){return[W.o]},
$asj:function(){return[W.o]}},
o:{"^":"bU;aI:parentElement=,fz:previousSibling=",
fF:function(a){var z=a.parentNode
if(z!=null)z.removeChild(a)},
k:function(a){var z=a.nodeValue
return z==null?this.dP(a):z},
$isc:1,
$iso:1,
"%":"Attr|Document|HTMLDocument|XMLDocument;Node"},
kh:{"^":"fx;",
gt:function(a){return a.length},
h:function(a,b){if(b>>>0!==b||b>=a.length)throw H.e(P.aB(b,a,null,null,null))
return a[b]},
l:function(a,b,c){throw H.e(new P.H("Cannot assign element of immutable List."))},
Z:function(a,b){return a[b]},
$isD:1,
$asD:function(){return[W.o]},
$isi:1,
$asi:function(){return[W.o]},
$isK:1,
$asK:function(){return[W.o]},
$isj:1,
$asj:function(){return[W.o]},
"%":"NodeList|RadioNodeList"},
ki:{"^":"v;a8:height}","%":"HTMLObjectElement"},
kr:{"^":"v;t:length=","%":"HTMLSelectElement"},
hG:{"^":"v;",
a1:function(a,b,c,d){var z,y
if("createContextualFragment" in window.Range.prototype)return this.br(a,b,c,d)
z=W.fn("<table>"+b+"</table>",c,d)
y=document.createDocumentFragment()
y.toString
z.toString
new W.R(y).ai(0,new W.R(z))
return y},
"%":"HTMLTableElement"},
ku:{"^":"v;",
a1:function(a,b,c,d){var z,y,x,w
if("createContextualFragment" in window.Range.prototype)return this.br(a,b,c,d)
z=document
y=z.createDocumentFragment()
z=C.L.a1(z.createElement("table"),b,c,d)
z.toString
z=new W.R(z)
x=z.gay(z)
x.toString
z=new W.R(x)
w=z.gay(z)
y.toString
w.toString
new W.R(y).ai(0,new W.R(w))
return y},
"%":"HTMLTableRowElement"},
kv:{"^":"v;",
a1:function(a,b,c,d){var z,y,x
if("createContextualFragment" in window.Range.prototype)return this.br(a,b,c,d)
z=document
y=z.createDocumentFragment()
z=C.L.a1(z.createElement("table"),b,c,d)
z.toString
z=new W.R(z)
x=z.gay(z)
y.toString
x.toString
new W.R(y).ai(0,new W.R(x))
return y},
"%":"HTMLTableSectionElement"},
dF:{"^":"v;",
bp:function(a,b,c,d){var z
a.textContent=null
z=this.a1(a,b,c,d)
a.content.appendChild(z)},
bo:function(a,b){return this.bp(a,b,null,null)},
$isdF:1,
"%":"HTMLTemplateElement"},
kz:{"^":"fY;a8:height}","%":"HTMLVideoElement"},
hX:{"^":"bU;",
cw:function(a,b){return a.requestAnimationFrame(H.aL(b,1))},
co:function(a){if(!!(a.requestAnimationFrame&&a.cancelAnimationFrame))return;(function(b){var z=['ms','moz','webkit','o']
for(var y=0;y<z.length&&!b.requestAnimationFrame;++y){b.requestAnimationFrame=b[z[y]+'RequestAnimationFrame']
b.cancelAnimationFrame=b[z[y]+'CancelAnimationFrame']||b[z[y]+'CancelRequestAnimationFrame']}if(b.requestAnimationFrame&&b.cancelAnimationFrame)return
b.requestAnimationFrame=function(c){return window.setTimeout(function(){c(Date.now())},16)}
b.cancelAnimationFrame=function(c){clearTimeout(c)}})(a)},
gaI:function(a){return W.iH(a.parent)},
$ish:1,
"%":"DOMWindow|Window"},
kE:{"^":"o;",$ish:1,"%":"DocumentType"},
kG:{"^":"v;",$ish:1,"%":"HTMLFrameSetElement"},
kJ:{"^":"fw;",
gt:function(a){return a.length},
h:function(a,b){if(b>>>0!==b||b>=a.length)throw H.e(P.aB(b,a,null,null,null))
return a[b]},
l:function(a,b,c){throw H.e(new P.H("Cannot assign element of immutable List."))},
Z:function(a,b){return a[b]},
$isD:1,
$asD:function(){return[W.o]},
$isi:1,
$asi:function(){return[W.o]},
$isK:1,
$asK:function(){return[W.o]},
$isj:1,
$asj:function(){return[W.o]},
"%":"MozNamedAttrMap|NamedNodeMap"},
i8:{"^":"c;eq:a<",
gaH:function(){var z,y,x,w,v
z=this.a.attributes
y=H.f([],[P.w])
for(x=z.length,w=0;w<x;++w){v=z[w]
if(v.namespaceURI==null)y.push(v.name)}return y}},
ia:{"^":"i8;a",
h:function(a,b){return this.a.getAttribute(b)},
l:function(a,b,c){this.a.setAttribute(b,c)},
gt:function(a){return this.gaH().length}},
cm:{"^":"c;a",
aD:function(a){return $.$get$ed().P(0,W.aA(a))},
as:function(a,b,c){var z,y,x
z=W.aA(a)
y=$.$get$cn()
x=y.h(0,H.d(z)+"::"+b)
if(x==null)x=y.h(0,"*::"+b)
if(x==null)return!1
return x.$4(a,b,c,this)},
ec:function(a){var z,y
z=$.$get$cn()
if(z.gaV(z)){for(y=0;y<262;++y)z.l(0,C.a_[y],W.j6())
for(y=0;y<12;++y)z.l(0,C.w[y],W.j7())}},
q:{
ec:function(a){var z,y
z=document.createElement("a")
y=new W.iw(z,window.location)
y=new W.cm(y)
y.ec(a)
return y},
kH:[function(a,b,c,d){return!0},"$4","j6",8,0,6],
kI:[function(a,b,c,d){var z,y,x,w,v
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
return z},"$4","j7",8,0,6]}},
d4:{"^":"c;$ti",
gO:function(a){return new W.d3(a,this.gt(a),-1,null)},
$isi:1,
$asi:null,
$isj:1,
$asj:null},
dp:{"^":"c;a",
aD:function(a){return C.d.cE(this.a,new W.h9(a))},
as:function(a,b,c){return C.d.cE(this.a,new W.h8(a,b,c))}},
h9:{"^":"k:1;a",
$1:function(a){return a.aD(this.a)}},
h8:{"^":"k:1;a,b,c",
$1:function(a){return a.as(this.a,this.b,this.c)}},
ix:{"^":"c;",
aD:function(a){return this.a.P(0,W.aA(a))},
as:["dS",function(a,b,c){var z,y
z=W.aA(a)
y=this.c
if(y.P(0,H.d(z)+"::"+b))return this.d.eF(c)
else if(y.P(0,"*::"+b))return this.d.eF(c)
else{y=this.b
if(y.P(0,H.d(z)+"::"+b))return!0
else if(y.P(0,"*::"+b))return!0
else if(y.P(0,H.d(z)+"::*"))return!0
else if(y.P(0,"*::*"))return!0}return!1}],
ed:function(a,b,c,d){var z,y,x
this.a.ai(0,c)
z=b.bX(0,new W.iy())
y=b.bX(0,new W.iz())
this.b.ai(0,z)
x=this.c
x.ai(0,C.a1)
x.ai(0,y)}},
iy:{"^":"k:1;",
$1:function(a){return!C.d.P(C.w,a)}},
iz:{"^":"k:1;",
$1:function(a){return C.d.P(C.w,a)}},
iC:{"^":"ix;e,a,b,c,d",
as:function(a,b,c){if(this.dS(a,b,c))return!0
if(b==="template"&&c==="")return!0
if(a.getAttribute("template")==="")return this.e.P(0,b)
return!1},
q:{
eh:function(){var z=P.w
z=new W.iC(P.dd(C.v,z),P.X(null,null,null,z),P.X(null,null,null,z),P.X(null,null,null,z),null)
z.ed(null,new H.c3(C.v,new W.iD(),[H.ac(C.v,0),null]),["TEMPLATE"],null)
return z}}},
iD:{"^":"k:1;",
$1:function(a){return"TEMPLATE::"+H.d(a)}},
iB:{"^":"c;",
aD:function(a){var z=J.p(a)
if(!!z.$isdx)return!1
z=!!z.$isn
if(z&&W.aA(a)==="foreignObject")return!1
if(z)return!0
return!1},
as:function(a,b,c){if(b==="is"||C.u.dK(b,"on"))return!1
return this.aD(a)}},
d3:{"^":"c;a,b,c,d",
D:function(){var z,y
z=this.c+1
y=this.b
if(z<y){this.d=J.cC(this.a,z)
this.c=z
return!0}this.d=null
this.c=y
return!1},
gG:function(){return this.d}},
i9:{"^":"c;a",
gaI:function(a){return W.ea(this.a.parent)},
$ish:1,
q:{
ea:function(a){if(a===window)return a
else return new W.i9(a)}}},
dn:{"^":"c;"},
iw:{"^":"c;a,b"},
ei:{"^":"c;a",
c5:function(a){new W.iE(this).$2(a,null)},
bc:function(a,b){var z
if(b==null){z=a.parentNode
if(z!=null)z.removeChild(a)}else b.removeChild(a)},
ex:function(a,b){var z,y,x,w,v,u,t,s
z=!0
y=null
x=null
try{y=J.eF(a)
x=y.geq().getAttribute("is")
w=function(c){if(!(c.attributes instanceof NamedNodeMap))return true
var r=c.childNodes
if(c.lastChild&&c.lastChild!==r[r.length-1])return true
if(c.children)if(!(c.children instanceof HTMLCollection||c.children instanceof NodeList))return true
var q=0
if(c.children)q=c.children.length
for(var p=0;p<q;p++){var o=c.children[p]
if(o.id=='attributes'||o.name=='attributes'||o.id=='lastChild'||o.name=='lastChild'||o.id=='children'||o.name=='children')return true}return false}(a)
z=w?!0:!(a.attributes instanceof NamedNodeMap)}catch(t){H.S(t)}v="element unprintable"
try{v=J.a2(a)}catch(t){H.S(t)}try{u=W.aA(a)
this.ew(a,b,z,v,u,y,x)}catch(t){if(H.S(t) instanceof P.a7)throw t
else{this.bc(a,b)
window
s="Removing corrupted element "+H.d(v)
if(typeof console!="undefined")console.warn(s)}}},
ew:function(a,b,c,d,e,f,g){var z,y,x,w,v
if(c){this.bc(a,b)
window
z="Removing element due to corrupted attributes on <"+d+">"
if(typeof console!="undefined")console.warn(z)
return}if(!this.a.aD(a)){this.bc(a,b)
window
z="Removing disallowed element <"+H.d(e)+"> from "+J.a2(b)
if(typeof console!="undefined")console.warn(z)
return}if(g!=null)if(!this.a.as(a,"is",g)){this.bc(a,b)
window
z="Removing disallowed type extension <"+H.d(e)+' is="'+g+'">'
if(typeof console!="undefined")console.warn(z)
return}z=f.gaH()
y=H.f(z.slice(0),[H.ac(z,0)])
for(x=f.gaH().length-1,z=f.a;x>=0;--x){w=y[x]
if(!this.a.as(a,J.eM(w),z.getAttribute(w))){window
v="Removing disallowed attribute <"+H.d(e)+" "+w+'="'+H.d(z.getAttribute(w))+'">'
if(typeof console!="undefined")console.warn(v)
z.getAttribute(w)
z.removeAttribute(w)}}if(!!J.p(a).$isdF)this.c5(a.content)}},
iE:{"^":"k:11;a",
$2:function(a,b){var z,y,x,w
switch(a.nodeType){case 1:this.a.ex(a,b)
break
case 8:case 11:case 3:case 4:break
default:if(b==null){x=a.parentNode
if(x!=null)x.removeChild(a)}else b.removeChild(a)}z=a.lastChild
for(;null!=z;){y=null
try{y=J.eH(z)}catch(w){H.S(w)
x=z
a.removeChild(x)
z=null
y=a.lastChild}if(z!=null)this.$2(z,a)
z=y}}},
fu:{"^":"h+aD;",$isi:1,
$asi:function(){return[W.o]},
$isj:1,
$asj:function(){return[W.o]}},
fv:{"^":"h+aD;",$isi:1,
$asi:function(){return[W.o]},
$isj:1,
$asj:function(){return[W.o]}},
fw:{"^":"fu+d4;",$isi:1,
$asi:function(){return[W.o]},
$isj:1,
$asj:function(){return[W.o]}},
fx:{"^":"fv+d4;",$isi:1,
$asi:function(){return[W.o]},
$isj:1,
$asj:function(){return[W.o]}}}],["","",,P,{"^":""}],["","",,P,{"^":"",ju:{"^":"ah;",$ish:1,"%":"SVGAElement"},jw:{"^":"n;",$ish:1,"%":"SVGAnimateElement|SVGAnimateMotionElement|SVGAnimateTransformElement|SVGAnimationElement|SVGSetElement"},jD:{"^":"n;m:x=,n:y=",$ish:1,"%":"SVGFEBlendElement"},jE:{"^":"n;m:x=,n:y=",$ish:1,"%":"SVGFEColorMatrixElement"},jF:{"^":"n;m:x=,n:y=",$ish:1,"%":"SVGFEComponentTransferElement"},jG:{"^":"n;m:x=,n:y=",$ish:1,"%":"SVGFECompositeElement"},jH:{"^":"n;m:x=,n:y=",$ish:1,"%":"SVGFEConvolveMatrixElement"},jI:{"^":"n;m:x=,n:y=",$ish:1,"%":"SVGFEDiffuseLightingElement"},jJ:{"^":"n;m:x=,n:y=",$ish:1,"%":"SVGFEDisplacementMapElement"},jK:{"^":"n;m:x=,n:y=",$ish:1,"%":"SVGFEFloodElement"},jL:{"^":"n;m:x=,n:y=",$ish:1,"%":"SVGFEGaussianBlurElement"},jM:{"^":"n;m:x=,n:y=",$ish:1,"%":"SVGFEImageElement"},jN:{"^":"n;m:x=,n:y=",$ish:1,"%":"SVGFEMergeElement"},jO:{"^":"n;m:x=,n:y=",$ish:1,"%":"SVGFEMorphologyElement"},jP:{"^":"n;m:x=,n:y=",$ish:1,"%":"SVGFEOffsetElement"},jQ:{"^":"n;m:x=,n:y=","%":"SVGFEPointLightElement"},jR:{"^":"n;m:x=,n:y=",$ish:1,"%":"SVGFESpecularLightingElement"},jS:{"^":"n;m:x=,n:y=","%":"SVGFESpotLightElement"},jT:{"^":"n;m:x=,n:y=",$ish:1,"%":"SVGFETileElement"},jU:{"^":"n;m:x=,n:y=",$ish:1,"%":"SVGFETurbulenceElement"},jV:{"^":"n;m:x=,n:y=",$ish:1,"%":"SVGFilterElement"},jW:{"^":"ah;m:x=,n:y=","%":"SVGForeignObjectElement"},fs:{"^":"ah;","%":"SVGCircleElement|SVGEllipseElement|SVGLineElement|SVGPathElement|SVGPolygonElement|SVGPolylineElement;SVGGeometryElement"},ah:{"^":"n;",$ish:1,"%":"SVGClipPathElement|SVGDefsElement|SVGGElement|SVGSwitchElement;SVGGraphicsElement"},k0:{"^":"ah;m:x=,n:y=",$ish:1,"%":"SVGImageElement"},k5:{"^":"n;",$ish:1,"%":"SVGMarkerElement"},k6:{"^":"n;m:x=,n:y=",$ish:1,"%":"SVGMaskElement"},km:{"^":"n;m:x=,n:y=",$ish:1,"%":"SVGPatternElement"},kn:{"^":"h;t:length=","%":"SVGPointList"},kp:{"^":"h;a8:height},m:x=,n:y=","%":"SVGRect"},kq:{"^":"fs;m:x=,n:y=","%":"SVGRectElement"},dx:{"^":"n;",$ish:1,$isdx:1,"%":"SVGScriptElement"},n:{"^":"ag;",
scS:function(a,b){this.bo(a,b)},
a1:function(a,b,c,d){var z,y,x,w,v,u
z=H.f([],[W.dn])
z.push(W.ec(null))
z.push(W.eh())
z.push(new W.iB())
c=new W.ei(new W.dp(z))
y='<svg version="1.1">'+b+"</svg>"
z=document
x=z.body
w=(x&&C.C).eS(x,y,c)
v=z.createDocumentFragment()
w.toString
z=new W.R(w)
u=z.gay(z)
for(;z=u.firstChild,z!=null;)v.appendChild(z)
return v},
$ish:1,
$isn:1,
"%":"SVGComponentTransferFunctionElement|SVGDescElement|SVGDiscardElement|SVGFEDistantLightElement|SVGFEFuncAElement|SVGFEFuncBElement|SVGFEFuncGElement|SVGFEFuncRElement|SVGFEMergeNodeElement|SVGMetadataElement|SVGStopElement|SVGStyleElement|SVGTitleElement;SVGElement"},ks:{"^":"ah;m:x=,n:y=",$ish:1,"%":"SVGSVGElement"},kt:{"^":"n;",$ish:1,"%":"SVGSymbolElement"},dG:{"^":"ah;","%":";SVGTextContentElement"},kw:{"^":"dG;",$ish:1,"%":"SVGTextPathElement"},kx:{"^":"dG;m:x=,n:y=","%":"SVGTSpanElement|SVGTextElement|SVGTextPositioningElement"},ky:{"^":"ah;m:x=,n:y=",$ish:1,"%":"SVGUseElement"},kA:{"^":"n;",$ish:1,"%":"SVGViewElement"},kF:{"^":"n;",$ish:1,"%":"SVGGradientElement|SVGLinearGradientElement|SVGRadialGradientElement"},kK:{"^":"n;",$ish:1,"%":"SVGCursorElement"},kL:{"^":"n;",$ish:1,"%":"SVGFEDropShadowElement"},kM:{"^":"n;",$ish:1,"%":"SVGMPathElement"}}],["","",,P,{"^":"",fr:{"^":"c;",$isi:1,
$asi:function(){return[P.a1]},
$isj:1,
$asj:function(){return[P.a1]}}}],["","",,P,{"^":""}],["","",,P,{"^":""}],["","",,P,{"^":""}],["","",,V,{"^":"",
hl:function(a){return a.gbP(a).C(0,0)},
f_:{"^":"c;",
c8:function(a,b){var z,y,x
z=a.y
y=b.y
x=z.c
if(x===y.c&&x!==0)return x>0
return(z.b&y.a)!==0&&(z.a&y.b)!==0}},
cO:{"^":"c;a,b,c"},
f5:{"^":"c;"},
a6:{"^":"c;a,b",
bY:function(a){var z,y,x
z=this.a.a
y=this.b.a
x=a.a
x[0]=(z[0]+y[0])*0.5
x[1]=(z[1]+y[1])*0.5},
N:function(a,b){var z,y,x,w
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
k:function(a){return"AABB["+this.a.k(0)+" . "+this.b.k(0)+"]"},
q:{
av:function(){return new V.a6(new E.a(new Float64Array(H.b(2))),new E.a(new Float64Array(H.b(2))))},
eN:function(a,b){var z,y
z=b.a.a
y=a.b.a
if(z[0]-y[0]>0||z[1]-y[1]>0)return!1
z=a.a.a
y=b.b.a
if(z[0]-y[0]>0||z[1]-y[1]>0)return!1
return!0}}},
f6:{"^":"c;a,b,c,d,e,f,r,x,y",
fN:function(a,b){var z,y,x,w
z=this.a
y=z.b[a].gaq()
x=z.b[b].gaq()
z=x.a.a
w=y.b.a
if(z[0]-w[0]>0||z[1]-w[1]>0)return!1
z=y.a.a
w=x.b.a
if(z[0]-w[0]>0||z[1]-w[1]>0)return!1
return!0},
bW:function(a){var z,y,x,w,v,u,t,s,r
this.x=0
for(z=this.a,y=0;y<this.e;++y){x=this.c[y]
this.y=x
if(x===-1)continue
z.fC(0,this,z.b[x].gaq())}this.e=0
F.ex(this.f,0,this.x)
for(y=0;y<this.x;){w=this.f[y]
x=w.a
v=z.b[x].gam()
x=w.b
a.eE(v,z.b[x].gam());++y
for(x=this.x,u=this.f;y<x;){t=u[y]
s=t.a
r=w.a
if(s==null?r==null:s===r){s=t.b
r=w.b
r=s==null?r!=null:s!==r
s=r}else s=!0
if(s)break;++y}}},
cG:function(a){var z,y,x
z=this.e
y=this.d
if(z===y){x=this.c
z=y*2
this.d=z
z=new Array(z)
z.fixed$length=Array
z=H.f(z,[P.l])
this.c=z
C.d.V(z,0,x.length,x,0)}z=this.c
y=this.e
z[y]=a
this.e=y+1},
d1:function(a){var z,y,x,w,v
if(a===this.y)return!0
z=this.x
y=this.r
if(z===y){x=this.f
z=y*2
this.r=z
z=new Array(z)
z.fixed$length=Array
z=H.f(z,[V.aY])
this.f=z
w=x.length
C.d.V(z,0,w,x,0)
for(z=this.r,y=this.f;w<z;++w)y[w]=new V.aY(0,0)}z=this.y
y=this.f
v=this.x
if(a<z){y[v].scX(a)
this.f[this.x].scY(this.y)}else{y[v].scX(z)
this.f[this.x].scY(a)}++this.x
return!0},
dY:function(a){var z,y,x
z=new Array(this.r)
z.fixed$length=Array
z=H.f(z,[V.aY])
this.f=z
for(y=this.r,x=0;x<y;++x)z[x]=new V.aY(0,0)
this.c=P.aj(this.d,0,!1,P.l)},
q:{
f7:function(a){var z=new V.f6(a,0,null,16,0,null,16,0,-1)
z.dY(a)
return z}}},
fi:{"^":"c;a,b,c,d,e,f,r,x,y,z,Q,ch,cx,cy",
ft:function(a,b,c){var z,y,x,w,v,u,t,s
z=this.b[a]
y=z.a
x=y.a.a
w=b.a.a
if(x[0]<=w[0])if(x[1]<=w[1]){v=b.b.a
u=y.b.a
v=v[0]<=u[0]&&v[1]<=u[1]}else v=!1
else v=!1
if(v)return!1
this.ev(z)
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
this.ct(a)
return!0},
fC:function(a,b,c){var z,y,x,w,v,u
this.x=0
z=this.r
this.x=1
z[0]=this.a
for(z=[V.aP];y=this.x,y>0;){x=this.r;--y
this.x=y
w=x[y]
if(w==null)continue
if(V.eN(w.a,c))if(w.d==null)b.d1(w.f)
else{y=this.r
x=y.length
if(x-this.x-2<=0){y=new Array(x*2)
y.fixed$length=Array
v=H.f(y,z)
y=this.r
C.d.V(v,0,y.length,y,0)
this.r=v
y=v}x=this.x
u=x+1
this.x=u
y[x]=w.d
this.x=u+1
y[u]=w.e}}},
bt:function(a){var z=a.d
if(z==null)return 0
return 1+Math.max(this.bt(z),this.bt(a.e))},
cf:function(){var z,y,x,w,v
z=this.e
if(z===-1){y=this.b
z=this.d*=2
z=new Array(z)
z.fixed$length=Array
z=H.f(z,[V.aP])
this.b=z
C.d.V(z,0,y.length,y,0)
for(x=this.d-1;z=this.c,x>=z;--x){z=this.b
w=new Float64Array(2)
z[x]=new V.aP(new V.a6(new E.a(w),new E.a(new Float64Array(2))),null,null,null,null,x,0)
z=this.b
w=z[x]
J.cF(w,x===this.d-1?null:z[x+1])
J.cE(this.b[x],-1)}this.e=z}v=this.b[z]
z=v.c
this.e=z!=null?z.f:-1
v.c=null
v.d=null
v.e=null
v.r=0
v.b=null;++this.c
return v},
cq:function(a){var z=this.e
a.c=z!==-1?this.b[z]:null
a.r=-1
this.e=a.f;--this.c},
ct:function(a){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g
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
w.N(r,x)
r=2*(v[0]-u[0]+v[1]-u[1])
m=2*r
l=2*(r-2*(p-n+q-o))
if(t.d==null){w.N(x,t.a)
k=2*(v[0]-u[0]+v[1]-u[1])+l}else{r=t.a
w.N(x,r)
q=r.b.a
p=q[0]
r=r.a.a
o=r[0]
q=q[1]
r=r[1]
k=2*(v[0]-u[0]+v[1]-u[1])-2*(p-o+q-r)+l}if(s.d==null){w.N(x,s.a)
j=2*(v[0]-u[0]+v[1]-u[1])+l}else{r=s.a
w.N(x,r)
q=r.b.a
p=q[0]
r=r.a.a
o=r[0]
q=q[1]
r=r[1]
j=2*(v[0]-u[0]+v[1]-u[1])-2*(p-o+q-r)+l}if(m<k&&m<j)break
y=k<j?t:s}i=J.eG(this.b[y.f])
h=this.cf()
h.c=i
h.b=null
h.a.N(x,y.a)
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
this.a=h}for(y=h;y!=null;){y=this.cg(y)
g=y.d
s=y.e
y.r=1+Math.max(g.r,s.r)
y.a.N(g.a,s.a)
y=y.c}},
ev:function(a){var z,y,x,w,v,u,t
if(a===this.a){this.a=null
return}z=a.c
y=z.c
x=z.d
if(x===a)x=z.e
if(y!=null){w=y.d
if(w==null?z==null:w===z)y.d=x
else y.e=x
x.c=y
this.cq(z)
for(v=y;v!=null;){v=this.cg(v)
u=v.d
t=v.e
v.a.N(u.a,t.a)
v.r=1+Math.max(u.r,t.r)
v=v.c}}else{this.a=x
x.c=null
this.cq(z)}},
cg:function(a){var z,y,x,w,v,u,t,s
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
u.N(z.a,v.a)
y.a.N(u,w.a)
z=1+Math.max(z.r,v.r)
a.r=z
y.r=1+Math.max(z,w.r)}else{y.e=v
a.e=w
w.c=a
u.N(z.a,w.a)
y.a.N(u,v.a)
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
u.N(y.a,s.a)
z.a.N(u,t.a)
u=1+Math.max(y.r,s.r)
a.r=u
z.r=1+Math.max(u,t.r)}else{z.e=s
a.d=t
t.c=a
u.N(y.a,t.a)
z.a.N(u,s.a)
u=1+Math.max(y.r,t.r)
a.r=u
z.r=1+Math.max(u,s.r)}return z}return a},
f3:function(a){var z,y
z=this.a
if(z==null)return
y=this.bt(z)
this.bJ(a,this.a,0,y)},
bJ:function(a,b,c,d){var z,y,x,w,v,u
z=b.a
y=this.f
x=z.a
y[0].i(x)
y[1].i(x)
w=y[1].a
z=z.b
v=z.a
x=x.a
w[0]=w[0]+(v[0]-x[0])
y[2].i(z)
y[3].i(z)
w=y[3].a
w[0]=w[0]-(v[0]-x[0])
x=this.cx
v=(d-c)/d
x.a5(1,v,v)
a.bb(y,4,x)
y=a.c
y.stroke()
v=this.cy
a.b.ab(z,v)
v=v.a
z=v[0]
v=v[1]
w=c+1
u=J.a2(b)+".id-"+w+"/"+d
a.cA(x)
y.strokeText(u,z,v)
z=b.d
if(z!=null)this.bJ(a,z,w,d)
z=b.e
if(z!=null)this.bJ(a,z,w,d)},
e1:function(){var z,y,x
for(z=this.d-1;z>=0;--z){y=this.b
x=new Float64Array(2)
y[z]=new V.aP(new V.a6(new E.a(x),new E.a(new Float64Array(2))),null,null,null,null,z,0)
y=this.b
x=y[z]
J.cF(x,z===this.d-1?null:y[z+1])
J.cE(this.b[z],-1)}for(y=this.f,z=0;z<4;++z)y[z]=new E.a(new Float64Array(2))},
q:{
fj:function(){var z,y
z=new Array(16)
z.fixed$length=Array
y=[V.aP]
y=new V.fi(null,H.f(z,y),0,16,0,H.f(new Array(4),[E.a]),H.f(new Array(20),y),0,new E.a(new Float64Array(H.b(2))),V.av(),new V.cc(new E.a(new Float64Array(H.b(2))),new E.a(new Float64Array(H.b(2))),0),V.av(),new G.bP(0,0,0),new E.a(new Float64Array(H.b(2))))
y.e1()
return y}}},
aP:{"^":"c;aq:a<,am:b<,aI:c*,d,e,f,a8:r'"},
aY:{"^":"c;cX:a?,cY:b?",
aF:function(a,b){var z,y
z=this.a
y=b.a
if(z<y)return-1
if(z===y){z=this.b
y=b.b
if(z<y)z=-1
else z=z===y?0:1
return z}return 1},
$isu:1,
$asu:function(){return[V.aY]}},
eb:{"^":"c;a,b"},
Q:{"^":"c;M:a<,b",
B:function(a){var z,y
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
bS:{"^":"c;a,b",
k:function(a){return this.b}},
cY:{"^":"c;a,b,c"},
hH:{"^":"c;a,b,c",
e8:function(){var z,y,x
for(z=this.b,y=this.a,x=0;x<8;++x){y[x]=new E.a(new Float64Array(2))
z[x]=new E.a(new Float64Array(2))}},
q:{
hI:function(){var z=[E.a]
z=new V.hH(H.f(new Array(8),z),H.f(new Array(8),z),0)
z.e8()
return z}}},
is:{"^":"c;a,b,c,d,e,f,r,x,y"},
eZ:{"^":"c;a,b,c,d,e,f,r,x,y,z,Q,ch,cx,cy,db,dx,dy,fr,fx,fy,go,id,k1,k2,k3",
eL:function(a,b,c,d,e){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k
a.e=0
z=b.c
y=d.c
x=c.b
w=x.b
v=z.a
u=v[0]
x=x.a
v=v[1]
t=c.a.a
s=t[0]
t=t[1]
r=e.b
q=r.b
p=y.a
o=p[0]
r=r.a
p=p[1]
n=e.a.a
m=q*o-r*p+n[0]-(w*u-x*v+s)
l=r*o+q*p+n[1]-(x*u+w*v+t)
k=b.b+d.b
if(m*m+l*l>k*k)return
a.d=C.m
a.c.i(z)
a.b.L()
a.e=1
x=a.a
x[0].a.i(y)
x[0].d.b0()},
eM:function(b9,c0,c1,c2,c3){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2,a3,a4,a5,a6,a7,a8,a9,b0,b1,b2,b3,b4,b5,b6,b7,b8
b9.e=0
z=c2.c
y=c3.b
x=c1.b
w=y.b
v=z.a
u=v[0]
t=y.a
s=v[1]
r=c3.a.a
q=r[0]
r=r[1]
p=c1.a.a
o=w*u-t*s+q-p[0]
n=t*u+w*s+r-p[1]
p=x.b
r=x.a
m=p*o+r*n
l=-r*o+p*n
k=c0.gbl().p(0,c2.b)
j=c0.ga6()
i=c0.gan()
h=c0.gaX()
for(g=0,f=-17976931348623157e292,e=0;C.b.C(e,j);++e){d=i.h(0,e)
c=C.a.u(m,d.gm(d))
b=C.a.u(l,d.gn(d))
w=h.h(0,e)
w=w.gm(w).j(0,c)
u=h.h(0,e)
a=w.p(0,u.gn(u).j(0,b))
if(a.a_(0,k))return
if(a.a_(0,f)){f=a
g=e}}a0=g+1
a0=C.b.C(a0,j)?a0:0
a1=i.h(0,g)
a2=i.h(0,a0)
if(f<11920928955078125e-23){b9.e=1
b9.d=C.i
a3=h.h(0,g)
w=b9.b.a
w[0]=a3.gm(a3)
w[1]=a3.gn(a3)
w=b9.c.a
w[0]=a1.gm(a1).p(0,a2.gm(a2)).j(0,0.5)
w[1]=a1.gn(a1).p(0,a2.gn(a2)).j(0,0.5)
a4=b9.a[0]
w=a4.a.a
w[0]=v[0]
w[1]=v[1]
a4.d.b0()
return}a5=C.a.u(m,a1.gm(a1))
a6=C.a.u(l,a1.gn(a1))
a7=a2.gm(a2).u(0,a1.gm(a1))
a8=a2.gn(a2).u(0,a1.gn(a1))
w=C.a.j(a5,a7)
v=C.a.j(a6,a8)
a9=C.a.u(m,a2.gm(a2))
b0=C.a.u(l,a2.gn(a2))
b1=a1.gm(a1).u(0,a2.gm(a2))
b2=a1.gn(a1).u(0,a2.gn(a2))
u=C.a.j(a9,b1)
t=C.a.j(b0,b2)
if(w+v<=0){b3=C.a.u(m,a1.gm(a1))
b4=C.a.u(l,a1.gn(a1))
if(C.a.a_(b3*b3+b4*b4,k.j(0,k)))return
b9.e=1
b9.d=C.i
w=b9.b
v=w.a
v[0]=C.a.u(m,a1.gm(a1))
v[1]=C.a.u(l,a1.gn(a1))
w.T()
b9.c.i(a1)
w=b9.a
w[0].a.i(z)
w[0].d.b0()}else if(u+t<=0){b3=C.a.u(m,a2.gm(a2))
b4=C.a.u(l,a2.gn(a2))
if(C.a.a_(b3*b3+b4*b4,k.j(0,k)))return
b9.e=1
b9.d=C.i
w=b9.b
v=w.a
v[0]=C.a.u(m,a2.gm(a2))
v[1]=C.a.u(l,a2.gn(a2))
w.T()
b9.c.i(a2)
w=b9.a
w[0].a.i(z)
w[0].d.b0()}else{b5=a1.gm(a1).p(0,a2.gm(a2)).j(0,0.5)
b6=a1.gn(a1).p(0,a2.gn(a2)).j(0,0.5)
b7=C.a.u(m,b5)
b8=C.a.u(l,b6)
a3=h.h(0,g)
if(C.a.a_(C.a.j(b7,a3.gm(a3))+C.a.j(b8,a3.gn(a3)),k))return
b9.e=1
b9.d=C.i
b9.b.i(h.h(0,g))
w=b9.c.a
w[0]=b5
w[1]=b6
w=b9.a
w[0].a.i(z)
w[0].d.b0()}},
cM:function(a,b,c,d,e){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i
z=b.ga6()
y=d.ga6()
x=b.gaX()
w=b.gan()
v=d.gan()
u=this.f
G.dR(e,c,u)
t=u.b
for(s=this.r,r=s.a,q=this.x,p=q.a,o=0,n=-17976931348623157e292,m=0;C.b.C(m,z);++m){G.M(t,x.h(0,m),s)
G.m(u,w.h(0,m),q)
for(l=17976931348623157e292,k=0;C.b.C(k,y);++k){j=v.h(0,k)
i=C.a.j(r[0],j.gm(j).u(0,p[0]))+C.a.j(r[1],j.gn(j).u(0,p[1]))
if(i<l)l=i}if(l>n){n=l
o=m}}a.b=o
a.a=n},
fa:function(a,b,a0,a1,a2,a3){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c
b.ga6()
z=b.gaX()
y=a2.ga6()
x=a2.gan()
w=a2.gaX()
v=a[0]
u=a[1]
t=a0.b
s=a3.b
r=z.h(0,a1)
q=C.a.j(t.b,r.gm(r))-C.a.j(t.a,r.gn(r))
p=C.a.j(t.a,r.gm(r))+C.a.j(t.b,r.gn(r))
o=s.b
n=s.a
m=o*q+n*p
l=-n*q+o*p
for(k=0,j=17976931348623157e292,i=0;C.b.C(i,y);++i){h=w.h(0,i)
g=C.a.j(m,h.gm(h))+C.a.j(l,h.gn(h))
if(g<j){j=g
k=i}}f=k+1
f=C.b.C(f,y)?f:0
e=x.h(0,k)
o=a3.a.a
n=v.a.a
n[0]=C.a.j(s.b,e.gm(e))-C.a.j(s.a,e.gn(e))+o[0]
n[1]=C.a.j(s.a,e.gm(e))+C.a.j(s.b,e.gn(e))+o[1]
n=a1&255
d=v.b.a
d[0]=n
d[1]=k&255
d[2]=1
d[3]=0
c=x.h(0,f)
d=u.a.a
d[0]=C.a.j(s.b,c.gm(c))-C.a.j(s.a,c.gn(c))+o[0]
d[1]=C.a.j(s.a,c.gm(c))+C.a.j(s.b,c.gn(c))+o[1]
o=u.b.a
o[0]=n
o[1]=f&255
o[2]=1
o[3]=0},
eN:function(b0,b1,b2,b3,b4){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2,a3,a4,a5,a6,a7,a8,a9
b0.e=0
z=b1.gbl().p(0,b3.gbl())
y=this.y
this.cM(y,b1,b2,b3,b4)
if(C.a.a_(y.a,z))return
x=this.z
this.cM(x,b3,b4,b1,b2)
if(C.a.a_(x.a,z))return
if(x.a>y.a+0.0005){w=x.b
b0.d=C.q
v=b2
u=b4
t=b1
s=b3
r=!0}else{w=y.b
b0.d=C.i
v=b4
u=b2
t=b3
s=b1
r=!1}q=u.b
y=this.Q
this.fa(y,s,u,w,t,v)
p=s.ga6()
o=s.gan()
n=w+1
n=C.b.C(n,p)?n:0
x=this.dx
x.i(o.h(0,w))
m=this.dy
m.i(o.h(0,n))
l=this.ch
k=m.a
j=x.a
i=l.a
i[0]=k[0]-j[0]
i[1]=k[1]-j[1]
l.T()
l=this.cx
h=l.a
h[0]=i[1]
h[1]=-1*i[0]
h=this.cy
g=h.a
g[0]=(j[0]+k[0])*0.5
g[1]=(j[1]+k[1])*0.5
g=this.db
f=q.b
e=i[0]
d=q.a
c=g.a
c[0]=f*e-d*i[1]
c[1]=d*i[0]+f*i[1]
i=c[1]
b=-1*c[0]
G.aF(u,x,x)
G.aF(u,m,m)
m=j[0]
j=j[1]
a=i*m+b*j
a0=C.a.p(-(c[0]*m+c[1]*j),z)
a1=C.a.p(c[0]*k[0]+c[1]*k[1],z)
g.R()
k=this.fr
a2=V.bc(k,y,g,a0,w)
g.R()
if(a2<2)return
y=this.fx
if(V.bc(y,k,g,a1,n)<2)return
b0.b.i(l)
b0.c.i(h)
for(x=b0.a,m=v.a.a,l=v.b,a3=0,a4=0;a4<2;++a4){k=y[a4].a.a
if(C.a.da(i*k[0]+b*k[1]-a,z)){a5=x[a3]
a6=a5.a
k=y[a4]
j=k.a.a
a7=j[0]-m[0]
a8=j[1]-m[1]
j=l.b
h=l.a
g=a6.a
g[0]=j*a7+h*a8
g[1]=-h*a7+j*a8
j=a5.d
k=k.b.a
j=j.a
j[0]=k[0]
j[1]=k[1]
j[2]=k[2]
j[3]=k[3]
if(r){a9=j[0]
j[0]=j[1]
j[1]=a9
a9=j[2]
j[2]=j[3]
j[3]=a9}++a3}}b0.e=a3},
cI:function(a,b,c,d,e){var z,y,x,w,v,u,t,s,r,q,p,o,n,m
a.e=0
z=d.c
y=this.e
G.m(e,z,y)
x=this.fy
G.dS(c,y,x)
w=b.c
v=b.d
u=this.go
u.i(v)
u.w(w)
y.i(v)
y.w(x)
t=u.v(y)
y.i(x)
y.w(w)
s=u.v(y)
r=b.b+d.b
q=this.id
p=q.a
p[1]=0
p[3]=0
if(s<=0){y=$.$get$af()
y.i(x)
y.w(w)
y=$.$get$af()
if(y.v(y)>r*r)return
b.r
p[0]=0
p[2]=0
a.e=1
a.d=C.m
a.b.L()
a.c.i(w)
y=a.a
y[0].d.B(q)
y[0].a.i(z)
return}if(t<=0){y=$.$get$af()
y.i(x)
y.w(v)
y=$.$get$af()
if(y.v(y)>r*r)return
b.x
p[0]=1
p[2]=0
a.e=1
a.d=C.m
a.b.L()
a.c.i(v)
y=a.a
y[0].d.B(q)
y[0].a.i(z)
return}o=u.v(u)
n=this.k2
n.i(w)
n.H(0,t)
y.i(v)
y.H(0,s)
n.F(0,y)
n.H(0,1/o)
m=$.$get$af()
m.i(x)
m.w(n)
n=$.$get$af()
if(n.v(n)>r*r)return
n=this.r
u=u.a
m=n.a
m[0]=-u[1]
m[1]=u[0]
y.i(x)
y.w(w)
if(n.v(y)<0){y=m[0]
x=m[1]
m[0]=-y
m[1]=-x}n.T()
p[0]=0
p[2]=1
a.e=1
a.d=C.i
a.b.i(n)
a.c.i(w)
y=a.a
y[0].d.B(q)
y[0].a.i(z)},
q:{
bc:function(a,b,c,d,e){var z,y,x,w,v,u,t,s,r,q,p,o,n,m
z=b[0]
y=b[1]
x=z.a
w=y.a
v=c.v(x)-d
u=c.v(w)-d
if(v<=0){a[0].B(z)
t=1}else t=0
if(u<=0){s=t+1
a[t].B(y)
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
hU:{"^":"c;a,b",
k:function(a){return this.b}},
fk:{"^":"c;a,b,c,d,e,f,r,x,y,z,Q,ch,cx,cy,db,dx,dy,fr,fx,fy,go,id,k1,k2,k3,k4,r1,r2,rx",
cH:function(a,b,c,d,a0){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e
z=this.b
G.dR(c,a0,z)
y=this.c
G.m(z,d.ghb(),y)
this.d=b.e
this.e=b.c
x=b.d
this.f=x
this.r=b.f
b.x
w=this.fr
w.i(x)
w.w(this.e)
w.T()
x=this.y
w=w.a
v=w[1]
w=w[0]
u=x.a
u[0]=v
u[1]=-w
w=this.fx
w.i(y)
w.w(this.e)
t=x.v(w)
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
y.c=d.ga6()
for(v=y.a,u=z.b,s=y.b,q=0;C.b.C(q,d.ga6());++q){G.m(z,d.gan().h(0,q),v[q])
G.M(u,d.gaX().h(0,q),s[q])}this.dx=0.02
a.e=0
p=this.k4
this.eO(p)
if(p.a===C.o)return
if(p.c>this.dx)return
o=this.r1
this.eP(o)
u=o.a===C.o
if(!u&&o.c>this.dx)return
if(!u)if(o.c>0.98*p.c+0.001)p=o
u=this.id
n=u[0]
m=u[1]
if(p.a===C.p){a.d=C.i
r=this.Q
l=r.v(s[0])
for(k=0,q=1;j=y.c,q<j;++q){i=r.v(s[q])
if(i<l){l=i
k=q}}h=k+1
h=h<j?h:0
n.a.i(v[k])
y=n.b.a
y[0]=0
y[1]=k&255
y[2]=1
y[3]=0
m.a.i(v[h])
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
v.i(this.e)
s.i(this.f)
r.i(x)}else{y.a=1
y.b=0
v.i(this.f)
s.i(this.e)
r.i(x)
r.R()}}else{a.d=C.q
n.a.i(this.e)
x=n.b.a
x[0]=0
x[1]=p.b&255
x[2]=0
x[3]=1
m.a.i(this.f)
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
x.c.i(v[r])
x.d.i(v[x.b])
x.e.i(s[x.a])
y=x}x=y.f
v=y.e
s=v.a
r=s[1]
s=s[0]
j=x.a
j[0]=r
j[1]=-s
s=y.x
s.i(x)
s.R()
j=y.c
y.r=x.v(j)
y.y=s.v(y.d)
r=this.k1
if(V.bc(r,u,x,y.r,y.a)<2)return
x=this.k2
if(V.bc(x,r,s,y.y,y.b)<2)return
u=a.b
s=a.c
if(p.a===C.p){u.i(v)
s.i(j)}else{u.i(d.gaX().h(0,y.a))
s.i(d.gan().h(0,y.a))}for(y=w.a,u=a.a,g=0,q=0;q<2;++q){f=x[q].a.a
y[1]=f[1]
y[0]=f[0]
w.w(j)
if(v.v(w)<=this.dx){e=u[g]
if(p.a===C.p){G.dS(z,x[q].a,e.a)
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
eO:function(a){var z,y,x,w,v,u,t,s,r,q
a.a=C.p
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
eP:function(a){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f
a.a=C.o
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
if(f>this.dx){a.a=C.F
a.b=p
a.c=f
return}if(i*x[0]+h*x[1]>=0){u[1]=h
u[0]=v[0]
w.w(q)
if(w.v(z)<-0.03490658503988659)continue}else{u[1]=h
u[0]=v[0]
w.w(t)
if(w.v(z)<-0.03490658503988659)continue}if(f>a.c){a.a=C.F
a.b=p
a.c=f}}},
e2:function(){var z,y,x,w,v
for(z=this.k2,y=this.k1,x=this.id,w=0;w<2;++w){v=new Float64Array(2)
x[w]=new V.Q(new E.a(v),new V.J(new Int8Array(4)))
v=new Float64Array(2)
y[w]=new V.Q(new E.a(v),new V.J(new Int8Array(4)))
v=new Float64Array(2)
z[w]=new V.Q(new E.a(v),new V.J(new Int8Array(4)))}},
q:{
fl:function(){var z=[V.Q]
z=new V.fk(V.hI(),G.q(),new E.a(new Float64Array(H.b(2))),new E.a(new Float64Array(H.b(2))),new E.a(new Float64Array(H.b(2))),new E.a(new Float64Array(H.b(2))),new E.a(new Float64Array(H.b(2))),new E.a(new Float64Array(H.b(2))),new E.a(new Float64Array(H.b(2))),new E.a(new Float64Array(H.b(2))),new E.a(new Float64Array(H.b(2))),C.M,C.M,new E.a(new Float64Array(H.b(2))),new E.a(new Float64Array(H.b(2))),0,!1,new E.a(new Float64Array(H.b(2))),new E.a(new Float64Array(H.b(2))),new E.a(new Float64Array(H.b(2))),new E.a(new Float64Array(H.b(2))),H.f(new Array(2),z),H.f(new Array(2),z),H.f(new Array(2),z),new V.is(0,0,new E.a(new Float64Array(H.b(2))),new E.a(new Float64Array(H.b(2))),new E.a(new Float64Array(H.b(2))),new E.a(new Float64Array(H.b(2))),0,new E.a(new Float64Array(H.b(2))),0),new V.cY(C.o,0,0),new V.cY(C.o,0,0),new E.a(new Float64Array(H.b(2))),new E.a(new Float64Array(H.b(2))))
z.e2()
return z}}},
J:{"^":"c;a",
c1:function(){var z=this.a
return(z[0]<<24|z[1]<<16|z[2]<<8|z[3])>>>0},
B:function(a){var z,y
z=a.a
y=this.a
y[0]=z[0]
y[1]=z[1]
y[2]=z[2]
y[3]=z[3]},
b0:function(){var z=this.a
z[0]=0
z[1]=0
z[2]=0
z[3]=0},
aF:function(a,b){return this.c1()-b.c1()},
$isu:1,
$asu:function(){return[V.J]}},
by:{"^":"c;a,b,J:c<,E:d@,e,f",
B:function(a){this.a.i(a.a)
this.b.i(a.b)
this.c.i(a.c)
this.d=a.d
this.e=a.e
this.f=a.f}},
hy:{"^":"c;a,b,c,d",
e6:function(){var z=this.c
z[0]=1073741823
z[1]=1073741823
z[2]=1073741823
z=this.d
z[0]=1073741823
z[1]=1073741823
z[2]=1073741823},
q:{
dz:function(){var z=P.l
z=new V.hy(0,0,P.aj(3,0,!1,z),P.aj(3,0,!1,z))
z.e6()
return z}}},
iA:{"^":"c;a,b,c,d,e,f,r,x,y,z,Q,ch,cx,cy,db",
fE:function(a,b,c,d,e){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l
this.e=a.b
for(z=this.d,y=a.c,x=a.d,w=b.a,v=d.a,u=0;t=this.e,u<t;++u){s=z[u]
t=y[u]
s.e=t
r=x[u]
s.f=r
q=w[t]
p=v[r]
r=s.a
G.m(c,q,r)
t=s.b
G.m(e,p,t)
o=s.c
n=t.a
t=o.a
t[1]=n[1]
t[0]=n[0]
o.w(r)
s.d=0}if(t>1){m=a.a
l=this.c2()
if(l<0.5*m||2*m<l||l<11920928955078125e-23)this.e=0}if(this.e===0){s=z[0]
s.e=0
s.f=0
q=w[0]
p=v[0]
z=s.a
G.m(c,q,z)
y=s.b
G.m(e,p,y)
x=s.c
x.i(y)
x.w(z)
this.e=1}},
fU:function(a){var z,y,x,w
a.a=this.c2()
a.b=this.e
for(z=a.c,y=this.d,x=a.d,w=0;w<this.e;++w){z[w]=J.cG(y[w].e)
x[w]=J.cG(y[w].f)}},
d9:function(a){var z,y
switch(this.e){case 1:a.i(this.a.c)
a.R()
return
case 2:z=this.f
z.i(this.b.c)
y=this.a.c
z.w(y)
a.i(y)
a.R()
if(z.a7(a)>0)z.aJ(1,a)
else z.aJ(-1,a)
return
default:a.L()
return}},
bZ:function(a){var z,y,x
switch(this.e){case 0:a.L()
return
case 1:a.i(this.a.c)
return
case 2:z=this.x
y=this.b
z.i(y.c)
z.H(0,y.d)
y=this.r
x=this.a
y.i(x.c)
y.H(0,x.d)
y.F(0,z)
a.i(y)
return
case 3:a.L()
return
default:a.L()
return}},
c2:function(){var z,y,x
switch(this.e){case 0:return 0
case 1:return 0
case 2:return Math.sqrt(this.a.c.bI(this.b.c))
case 3:z=this.y
z.i(this.b.c)
y=this.a.c
z.w(y)
x=this.z
x.i(this.c.c)
x.w(y)
return z.a7(x)
default:return 0}},
dn:function(){var z,y,x,w,v,u,t,s
z=this.a
y=z.c
x=this.b
w=x.c
v=this.f
v.i(w)
v.w(y)
u=-y.v(v)
if(u<=0){z.d=1
this.e=1
return}t=w.v(v)
if(t<=0){x.d=1
this.e=1
z.B(x)
return}s=1/(t+u)
z.d=t*s
x.d=u*s
this.e=2},
dq:function(){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a
z=this.cx
y=this.a
z.i(y.c)
x=this.cy
w=this.b
x.i(w.c)
v=this.db
u=this.c
v.i(u.c)
t=this.f
t.i(x)
t.w(z)
s=z.v(t)
r=x.v(t)
q=-s
p=this.Q
p.i(v)
p.w(z)
o=z.v(p)
n=v.v(p)
m=-o
l=this.ch
l.i(v)
l.w(x)
k=x.v(l)
j=v.v(l)
i=-k
h=t.a7(p)
g=h*x.a7(v)
f=h*v.a7(z)
e=h*z.a7(x)
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
w.B(u)
return}if(r<=0&&i<=0){w.d=1
this.e=1
y.B(w)
return}if(n<=0&&j<=0){u.d=1
this.e=1
y.B(u)
return}if(j>0&&i>0&&g<=0){b=1/(j+i)
w.d=j*b
u.d=i*b
this.e=2
y.B(u)
return}a=1/(g+f+e)
y.d=g*a
w.d=f*a
u.d=e*a
this.e=3}},
ff:{"^":"c;a,b,c,d",
c6:function(a,b){var z,y,x,w,v
switch(a.a){case C.h:this.a[0].i(a.c)
this.b=1
this.c=a.b
break
case C.k:H.z(a,"$isaE")
this.b=a.ga6()
this.c=a.gbl()
for(z=this.a,y=0;y<this.b;++y){x=z[y]
w=a.gan().h(0,y)
x.toString
v=w.geC()
x=x.a
x[1]=v[1]
x[0]=v[0]}break
case C.r:H.z(a,"$isbN")
z=this.d
z[0]=a.gbD().h(0,b)
x=b+1
if(C.b.C(x,a.gem()))z[1]=a.gbD().h(0,x)
else z[1]=a.gbD().h(0,0)
x=this.a
x[0].i(z[0])
x[1].i(z[1])
this.b=2
this.c=a.gbl()
break
case C.n:H.z(a,"$isaz")
z=this.a
z[0].i(a.c)
z[1].i(a.d)
this.b=2
this.c=a.b
break}},
ax:function(a){var z,y,x,w,v
z=this.a
y=z[0].v(a)
for(x=0,w=1;w<this.b;++w){v=z[w].v(a)
if(v>y){y=v
x=w}}return x},
e0:function(){var z,y
for(z=this.a,y=0;y<8;++y)z[y]=new E.a(new Float64Array(2))
this.b=0
this.c=0},
q:{
ax:function(){var z=[E.a]
z=new V.ff(H.f(new Array(8),z),null,null,H.f(new Array(2),z))
z.e0()
return z}}},
fe:{"^":"c;a,b,c,d,e,f,r",
f_:function(a3,a4,a5){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2
$.cU=$.cU+1
z=a5.a
y=a5.b
x=a5.c
w=a5.d
v=this.a
v.fE(a4,z,x,y,w)
u=v.d
t=this.d
v.bZ(t)
t.gaW()
for(s=this.b,r=this.c,q=x.b,p=this.e,o=p.a,n=this.f,m=z.a,l=w.b,k=y.a,j=0;j<20;){i=v.e
for(h=0;h<i;++h){s[h]=u[h].e
r[h]=u[h].f}switch(i){case 1:break
case 2:v.dn()
break
case 3:v.dq()
break}if(v.e===3)break
v.bZ(t)
t.gaW()
v.d9(p)
if(p.gaW()<14210854715202004e-30)break
g=u[v.e]
o[1]=-o[1]
o[0]=-o[0]
G.an(q,p,n)
f=z.ax(n)
g.e=f
f=m[f]
e=g.a
G.m(x,f,e)
o[1]=-o[1]
o[0]=-o[0]
G.an(l,p,n)
f=y.ax(n)
g.f=f
f=k[f]
d=g.b
G.m(w,f,d)
f=g.c
c=d.a
d=f.a
d[1]=c[1]
d[0]=c[0]
f.w(e);++j
$.cV=$.cV+1
h=0
while(!0){if(!(h<i)){b=!1
break}f=g.e
e=s[h]
if(f==null?e==null:f===e){f=g.f
e=r[h]
e=f==null?e==null:f===e
f=e}else f=!1
if(f){b=!0
break}++h}if(b)break;++v.e}$.cW=Math.max($.cW,j)
a=a3.a
a0=a3.b
switch(v.e){case 0:break
case 1:t=v.a
a.i(t.a)
a0.i(t.b)
break
case 2:t=v.r
s=v.a
t.i(s.a)
t.H(0,s.d)
r=v.b
a.i(r.a)
a.H(0,r.d)
a.F(0,t)
t.i(s.b)
t.H(0,s.d)
a0.i(r.b)
a0.H(0,r.d)
a0.F(0,t)
break
case 3:t=v.a
a.i(t.a)
a.H(0,t.d)
t=v.y
s=v.b
t.i(s.a)
t.H(0,s.d)
s=v.z
r=v.c
s.i(r.a)
s.H(0,r.d)
a.F(0,t)
a.F(0,s)
a0.i(a)
break
default:break}a3.c=Math.sqrt(a.bI(a0))
a3.d=j
v.fU(a4)
if(a5.e){a1=z.c
a2=y.c
v=a3.c
t=a1+a2
if(v>t&&v>11920928955078125e-23){a3.c=v-t
v=this.r
v.i(a0)
v.w(a)
v.T()
n.i(v)
n.H(0,a1)
a.F(0,n)
n.i(v)
n.H(0,a2)
a0.w(n)}else{a.F(0,a0)
a.H(0,0.5)
a0.i(a)
a3.c=0}}}},
cS:{"^":"c;a,b,c,d,e"},
cT:{"^":"c;a,b,c,d"},
c1:{"^":"c;a,b",
k:function(a){return this.b}},
fT:{"^":"c;a,b,c,d,e",
B:function(a){var z,y,x,w,v,u,t
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
this.b.i(a.b)
this.c.i(a.c)
this.e=a.e},
e4:function(){var z,y,x
for(z=this.a,y=0;y<2;++y){x=new Float64Array(2)
z[y]=new V.dg(new E.a(x),0,0,new V.J(new Int8Array(4)))}},
q:{
E:function(){var z=new V.fT(H.f(new Array(2),[V.dg]),new E.a(new Float64Array(H.b(2))),new E.a(new Float64Array(H.b(2))),C.m,0)
z.e4()
return z}}},
dg:{"^":"c;a,b,c,d"},
cc:{"^":"c;a,b,c"},
dw:{"^":"c;a,b"},
bO:{"^":"dy;c,a,b",
bG:function(a,b,c){var z,y,x,w,v,u,t,s
z=b.b
y=z.b
x=this.c.a
w=x[0]
v=z.a
x=x[1]
u=b.a.a
t=y*w-v*x+u[0]
s=v*w+y*x+u[1]
u=this.b
x=a.a.a
x[0]=t-u
x[1]=s-u
x=a.b.a
x[0]=t+u
x[1]=s+u}},
az:{"^":"dy;c,d,e,f,r,x,y,a,b"},
fX:{"^":"c;a,b,c"},
dy:{"^":"c;"},
bt:{"^":"c;a,b",
k:function(a){return this.b}},
hE:{"^":"c;a,b,c,d,e"},
b1:{"^":"c;a,b",
k:function(a){return this.b}},
hF:{"^":"c;a,b"},
hJ:{"^":"c;a,b,c,d,e,f,r,x,y,z",
fO:function(a3,a4){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2
$.dH=$.dH+1
a3.a=C.J
a3.b=a4.e
z=a4.a
y=a4.b
x=this.x
x.B(a4.c)
w=this.y
w.B(a4.d)
x.T()
w.T()
v=a4.e
u=Math.max(0.005,z.c+y.c-0.015)
t=this.a
t.b=0
s=this.b
s.a=z
s.b=y
s.e=!1
for(r=this.f,q=this.r,p=u+0.00125,o=u-0.00125,n=this.e,m=this.c,l=this.d,k=this.z.fy,j=0,i=0;!0;){x.aa(m,j)
w.aa(l,j)
s.c=m
s.d=l
k.f_(n,t,s)
h=n.c
if(h<=0){a3.a=C.a3
a3.b=0
break}if(h<p){a3.a=C.A
a3.b=j
break}r.fk(0,t,z,x,y,w,j)
f=v
e=0
while(!0){if(!!0){g=!1
break}d=r.fb(q,f)
if(d>p){a3.a=C.a4
a3.b=v
g=!0
break}if(d>o){j=f
g=!1
break}c=r.a2(q[0],q[1],j)
if(c<o){a3.a=C.K
a3.b=j
g=!0
break}if(c<=p){a3.a=C.A
a3.b=j
g=!0
break}for(b=f,a=j,a0=0;!0;){a1=(a0&1)===1?a+(u-c)*(b-a)/(d-c):0.5*(a+b);++a0
$.dL=$.dL+1
a2=r.a2(q[0],q[1],a1)
if(Math.abs(a2-u)<0.00125){f=a1
break}if(a2>u){a=a1
c=a2}else{b=a1
d=a2}if(a0===50)break}$.dK=Math.max($.dK,a0);++e
if(e===8||a0===50){g=!1
break}}++i
$.dI=$.dI+1
if(g)break
if(i===20){a3.a=C.K
a3.b=j
break}}$.dJ=Math.max($.dJ,i)}},
cd:{"^":"c;a,b",
k:function(a){return this.b}},
hv:{"^":"c;a,b,c,d,e,f,r,x,y,z,Q,ch,cx,cy,db,dx,dy,fr,fx,fy,go",
fk:function(a,b,c,d,e,f,g){var z,y,x,w,v,u,t,s,r,q,p,o,n,m
this.a=c
this.b=e
z=b.b
this.f=d
this.r=f
y=this.fr
d.aa(y,g)
x=this.fx
this.r.aa(x,g)
if(z===1){this.c=C.x
g=this.x
w=this.a
v=b.c[0]
g.i(w.a[v])
v=this.y
w=this.b
u=b.d[0]
v.i(w.a[u])
u=this.z
G.m(y,g,u)
g=this.Q
G.m(x,v,g)
v=this.e
v.i(g)
v.w(u)
return v.T()}else{g=b.c
w=b.d
v=this.z
u=this.d
t=this.cy
s=this.e
r=this.Q
q=this.dy
if(J.a5(g[0],g[1])){this.c=C.z
p=this.db
o=this.b
n=w[0]
p.i(o.a[n])
n=this.dx
o=this.b
w=w[1]
n.i(o.a[w])
q.i(n)
q.w(p)
q.aJ(-1,s)
s.T()
G.M(x.b,s,t)
u.i(p)
u.F(0,n)
u.H(0,0.5)
G.m(x,u,r)
u=this.x
x=this.a
g=g[0]
u.i(x.a[g])
G.m(y,u,v)
q.i(v)
q.w(r)
m=q.v(t)
if(m<0){s.R()
m=-m}return m}else{this.c=C.y
p=this.ch
o=this.a
n=g[0]
p.i(o.a[n])
n=this.cx
o=this.a
g=g[1]
n.i(o.a[g])
q.i(n)
q.w(p)
q.aJ(-1,s)
s.T()
G.M(y.b,s,t)
u.i(p)
u.F(0,n)
u.H(0,0.5)
G.m(y,u,v)
u=this.y
y=this.b
w=w[0]
u.i(y.a[w])
G.m(x,u,r)
q.i(r)
q.w(v)
m=q.v(t)
if(m<0){s.R()
m=-m}return m}}},
fb:function(a,b){var z,y,x,w,v,u,t
z=this.fr
this.f.aa(z,b)
y=this.fx
this.r.aa(y,b)
switch(this.c){case C.x:x=this.e
w=this.fy
G.an(z.b,x,w)
x.R()
v=this.go
G.an(y.b,x,v)
x.R()
a[0]=this.a.ax(w)
a[1]=this.b.ax(v)
v=this.x
w=this.a
u=a[0]
v.i(w.a[u])
u=this.y
w=this.b
t=a[1]
u.i(w.a[t])
t=this.z
G.m(z,v,t)
v=this.Q
G.m(y,u,v)
v.w(t)
return v.v(x)
case C.y:x=this.cy
G.M(z.b,this.e,x)
w=this.z
G.m(z,this.d,w)
x.R()
z=this.go
G.an(y.b,x,z)
x.R()
a[0]=-1
z=this.b.ax(z)
a[1]=z
v=this.y
v.i(this.b.a[z])
z=this.Q
G.m(y,v,z)
z.w(w)
return z.v(x)
case C.z:x=this.cy
G.M(y.b,this.e,x)
w=this.Q
G.m(y,this.d,w)
x.R()
y=this.fy
G.an(z.b,x,y)
x.R()
a[1]=-1
y=this.a.ax(y)
a[0]=y
v=this.x
v.i(this.a.a[y])
y=this.z
G.m(z,v,y)
y.w(w)
return y.v(x)
default:a[0]=-1
a[1]=-1
return 0}},
a2:function(a,b,c){var z,y,x,w,v
z=this.fr
this.f.aa(z,c)
y=this.fx
this.r.aa(y,c)
switch(this.c){case C.x:x=this.x
x.i(this.a.a[a])
w=this.y
w.i(this.b.a[b])
v=this.z
G.m(z,x,v)
x=this.Q
G.m(y,w,x)
x.w(v)
return x.v(this.e)
case C.y:x=this.cy
G.M(z.b,this.e,x)
w=this.z
G.m(z,this.d,w)
z=this.y
z.i(this.b.a[b])
v=this.Q
G.m(y,z,v)
v.w(w)
return v.v(x)
case C.z:x=this.cy
G.M(y.b,this.e,x)
w=this.Q
G.m(y,this.d,w)
y=this.x
y.i(this.a.a[a])
v=this.z
G.m(z,y,v)
v.w(w)
return v.v(x)
default:return 0}}},
hZ:{"^":"c;a,b,c,d,e",
fj:function(a,b,c,a0,a1,a2){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d
if(b.e===0)return
switch(b.d){case C.m:z=this.d
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
if(z.bI(y)>14210854715202004e-30){w[0]=o[0]-q[0]
w[1]=o[1]-q[1]
x.T()}x=w[0]
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
case C.i:j=this.d
x=this.a
G.M(c.b,b.b,x)
G.aF(c,b.c,j)
i=this.e
for(w=b.a,v=i.a,u=j.a,x=x.a,t=this.b,s=this.c,h=0;h<b.e;++h){G.aF(a1,w[h].a,i)
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
case C.q:j=this.d
x=this.a
G.M(a1.b,b.b,x)
G.aF(a1,b.c,j)
i=this.e
for(w=b.a,v=i.a,u=j.a,x=x.a,t=this.b,s=this.c,h=0;h<b.e;++h){G.aF(c,w[h].a,i)
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
eb:function(){var z,y
for(z=this.b,y=0;y<2;++y)z[y]=new E.a(new Float64Array(2))},
q:{
i_:function(){var z=new V.hZ(new E.a(new Float64Array(H.b(2))),H.f(new Array(2),[E.a]),new Float64Array(H.b(2)),new E.a(new Float64Array(H.b(2))),new E.a(new Float64Array(H.b(2))))
z.eb()
return z}}},
b7:{"^":"c;a,b,c,d,e,f,r,x,y,z,Q,ch,cx,cy,db,dx,dy,fr,fx,fy,go,id,k1,k2,k3,am:k4<,r1,r2,rx",
aN:function(a){var z,y
z=this.Q
if((z.a&2)===2)return
y=new V.fq(0,null,null,null,0,0,null,0,new V.bj(1,65535,0),!1,null,V.av(),V.av(),new E.a(new Float64Array(H.b(2))))
y.eR(this,a)
if((this.b&32)===32)y.eT(z.b.a,this.d)
y.b=this.cy
this.cy=y;++this.db
y.c=this
if(y.a>0)this.fI()
z.a|=1
return y},
fI:function(){var z,y,x,w,v,u,t,s,r,q,p,o,n
this.fr=0
this.fx=0
this.fy=0
this.go=0
z=this.f
y=z.a
y.L()
x=this.a
if(x===C.e||x===C.D){y=this.d.a
z.b.i(y)
z.c.i(y)
z.d=z.e
return}x=this.Q.ch.a
w=x.a
v=w[x.b++]
v.L()
u=w[x.b++]
t=this.r2
for(s=this.cy,r=t.b.a;s!=null;s=s.b){q=s.a
if(q===0)continue
p=s.d
o=p.b
q=q*3.141592653589793*o*o
t.a=q
p=p.c.a
r[0]=p[0]
r[1]=p[1]
n=p[0]
p=p[1]
t.c=q*(0.5*o*o+(n*n+p*p))
this.fr+=q
p=u.a
p[1]=r[1]
p[0]=r[0]
p[1]=p[1]*q
p[0]=p[0]*q
v.F(0,u)
this.fy=this.fy+t.c}r=this.fr
if(r>0){r=1/r
this.fx=r
v.H(0,r)}else{this.fr=1
this.fx=1}r=this.fy
if(r>0&&(this.b&16)===0){r-=this.fr*v.v(v)
this.fy=r
this.go=1/r}else{this.fy=0
this.go=0}w=w[x.b++]
r=z.c
w.i(r)
y.i(v)
z=z.b
G.m(this.d,y,z)
r.i(z)
u.i(r)
u.w(w)
u.aJ(this.x,w)
this.r.F(0,w)
x.b-=3},
X:function(a){var z
if(a){z=this.b
if((z&2)===0){this.b=z|2
this.k3=0}}else{this.b&=4294967293
this.k3=0
this.r.L()
this.x=0
this.y.L()
this.z=0}},
cc:function(){var z,y,x,w,v,u,t,s,r
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
for(r=this.cy,y=this.Q,x=this.d;r!=null;r=r.b)r.dT(y.b.a,z,x)},
az:function(){var z,y,x,w,v,u,t
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
c7:function(a){var z
if(this.a!==C.f&&a.a!==C.f)return!1
for(z=this.dx;!1;z=z.gfu())z.gfv()
return!0},
ar:function(a){var z,y,x,w,v
z=this.f
z.ar(a)
y=z.c
y.i(z.b)
x=z.d
z.e=x
w=this.d
v=w.b
v.bn(x)
w=w.a
G.M(v,z.a,w)
w.H(0,-1)
w.F(0,y)},
k:function(a){return"Body[pos: "+this.d.a.k(0)+" linVel: "+this.r.k(0)+" angVel: "+H.d(this.x)+"]"}},
cJ:{"^":"c;a,am:b<,c,d,e,f,r,x,y,z,Q,ch,cx,cy"},
bK:{"^":"c;a,b",
k:function(a){return this.b}},
f0:{"^":"c;a,b,c,d,e,f",
eE:function(a,b){var z,y,x,w,v,u,t,s,r,q,p,o,n,m
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
if((r==null?y==null:r===y)&&p===w&&(q==null?z==null:q===z)&&o===x)return}t=t.d}if(!u.c7(v))return
s=this.d.c8(z,y)
if(!s)return
n=this.f.fw(z,x,y,w)
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
v.X(!0)
u.X(!0);++this.c},
bH:function(a){var z,y,x,w,v,u,t,s,r,q
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
if(v){z.c.X(!0)
y.c.X(!0)}s=z.d.a
r=y.d.a
q=this.f.fy[s.a][r.a].a
q.a[--q.b]=a;--this.c},
eK:function(){var z,y,x,w,v,u,t,s,r,q,p,o,n
z=this.b
for(;z!=null;){y=z.f
x=z.r
w=z.x
v=z.y
u=y.c
t=x.c
if((z.a&8)===8){if(!t.c7(u)){s=z.c
this.bH(z)
z=s
continue}r=this.d.c8(y,x)
if(!r){s=z.c
this.bH(z)
z=s
continue}z.a&=4294967287}q=(u.b&2)===2&&u.a!==C.e
p=(t.b&2)===2&&t.a!==C.e
if(!q&&!p){z=z.c
continue}o=y.r[w].gbk()
n=x.r[v].gbk()
if(!this.a.fN(o,n)){s=z.c
this.bH(z)
z=s
continue}z.bV(this.e)
z=z.c}},
dU:function(a,b){this.b=null
this.d=new V.f_()
this.e=null
this.a=b},
q:{
f1:function(a,b){var z=new V.f0(null,null,0,null,null,a)
z.dU(a,b)
return z}}},
b9:{"^":"a8;fr,a,b,c,d,e,f,r,x,y,z,Q,ch,cx,cy,db,dx,dy",
a9:function(a,b,c,d){this.b4(a,b,c,d)},
a2:function(a,b,c){var z=this.fr
H.z(this.f.d,"$isbN").d6(z,this.x)
this.dx.fr.cI(a,z,b,this.r.d,c)}},
ba:{"^":"a8;fr,a,b,c,d,e,f,r,x,y,z,Q,ch,cx,cy,db,dx,dy",
a9:function(a,b,c,d){this.b4(a,b,c,d)},
a2:function(a,b,c){var z,y,x
z=this.fr
H.z(this.f.d,"$isbN").d6(z,this.x)
y=this.dx.fr
x=H.z(this.r.d,"$isaE")
y.k3.cH(a,z,b,x,c)}},
bb:{"^":"a8;a,b,c,d,e,f,r,x,y,z,Q,ch,cx,cy,db,dx,dy",
a2:function(a,b,c){this.dx.fr.eL(a,this.f.d,b,this.r.d,c)}},
a8:{"^":"c;",
a9:["b4",function(a,b,c,d){var z,y
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
bV:function(a){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k
z=this.dy
y=this.z
z.B(y)
x=this.a|=4
w=this.f
w.z
v=this.r
v.z
u=w.c
t=v.c
this.a2(y,u.d,t.d)
s=y.e>0
for(w=z.a,v=y.a,r=0;r<y.e;++r){q=v[r]
q.b=0
q.c=0
p=q.d
for(o=z.e,n=p.a,m=0;m<o;++m){l=w[m]
k=l.d.a
if((k[0]<<24|k[1]<<16|k[2]<<8|k[3])>>>0===(n[0]<<24|n[1]<<16|n[2]<<8|n[3])>>>0){q.b=l.b
q.c=l.c
break}}}if(s!==((x&2)===2)){u.X(!0)
t.X(!0)}z=this.a
if(s)this.a=z|2
else this.a=z&4294967293
return}},
B:{"^":"c;a,b,c,d"},
bQ:{"^":"c;a,b,c,d,e,f,r,x,y,z,Q,ch,cx,cy,db",
dV:function(){var z,y
for(z=this.a,y=0;y<2;++y)z[y]=new E.a(new Float64Array(2))},
q:{
cP:function(){var z=new V.bQ(H.f(new Array(2),[E.a]),new E.a(new Float64Array(H.b(2))),new E.a(new Float64Array(H.b(2))),0,0,0,0,new E.a(new Float64Array(H.b(2))),new E.a(new Float64Array(H.b(2))),0,0,null,0,0,0)
z.dV()
return z}}},
bd:{"^":"c;a,b"},
bf:{"^":"c;a,b,c,d,e"},
f2:{"^":"c;a,b,c,d,e,f,r,x,y,z,Q",
cP:function(a){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b
this.a=a.a
z=a.c
this.r=z
y=this.d
x=y.length
if(x<z){z=new Array(Math.max(x*2,z))
z.fixed$length=Array
z=H.f(z,[V.bQ])
this.d=z
C.d.V(z,0,x,y,0)
for(;z=this.d,x<z.length;++x)z[x]=V.cP()}z=this.e
x=z.length
y=this.r
if(x<y){y=new Array(Math.max(x*2,y))
y.fixed$length=Array
y=H.f(y,[V.bR])
this.e=y
C.d.V(y,0,x,z,0)
for(;z=this.e,x<z.length;++x)z[x]=V.cQ()}this.b=a.d
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
fT:function(){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b
for(z=0;z<this.r;++z){y=this.e[z]
x=y.e
w=y.f
v=y.r
u=y.y
t=y.x
s=y.z
r=y.cy
q=this.c[x].gM()
p=this.c[x].gJ()
o=this.c[w].gM()
n=this.c[w].gJ()
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
i[1]=i[1]+b*t}this.c[x].sJ(p)
this.c[w].sJ(n)}},
cR:function(){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2,a3,a4,a5,a6,a7,a8,a9,b0,b1,b2,b3,b4,b5,b6,b7,b8,b9,c0,c1,c2,c3,c4,c5,c6,c7,c8,c9,d0,d1,d2,d3,d4,d5,d6,d7,d8,d9,e0,e1,e2
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
c=this.b[k].gA()
b=this.b[k].gE()
a=this.c[k].gM()
a0=this.c[k].gJ()
a1=this.b[j].gA()
a2=this.b[j].gE()
a3=this.c[j].gM()
a4=this.c[j].gJ()
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
z.fj(0,l,x,n,v,m)
b1=p.b.a
b1[0]=r[0]
b1[1]=r[1]
b2=p.cy
for(a5=-$.jt,a7=a3.a,a8=-a4,b0=a.a,b3=-a0,b4=i+h,b5=0;b5<b2;++b5){b6=p.a[b5]
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
a6.i(a5)
a6.fp()}else p.cy=1}}},
c9:function(){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2,a3,a4,a5,a6,a7,a8,a9,b0,b1,b2,b3,b4,b5,b6,b7,b8,b9,c0,c1,c2,c3,c4,c5,c6,c7,c8,c9,d0,d1,d2,d3,d4,d5,d6,d7,d8,d9,e0
for(z=0;z<this.r;++z){y=this.e[z]
x=y.e
w=y.f
v=y.r
u=y.x
t=y.y
s=y.z
r=y.cy
q=this.c[x].gM()
p=this.c[x].gJ()
o=this.c[w].gM()
n=this.c[w].gJ()
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
break $loop$1}break $loop$1}}this.c[x].sJ(p)
this.c[w].sJ(n)}},
dM:function(){var z,y,x,w,v,u
for(z=0;z<this.r;++z){y=this.e[z]
for(x=this.f[y.db].z.a,w=0;w<y.cy;++w){v=x[w]
u=y.a[w]
v.b=u.c
v.c=u.d}}},
dv:function(){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2,a3,a4,a5,a6,a7,a8,a9,b0,b1,b2,b3,b4,b5,b6,b7,b8,b9,c0
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
c=this.b[n].gA()
b=this.b[n].gE()
a=this.b[m].gA()
a0=this.b[m].gE()
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
t.cQ(0,o,z,x,a4)
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
a0+=g*(b2*c0-b3*b9)}this.b[n].sE(b)
this.b[m].sE(a0)}return q>=-0.015},
dF:function(c3,c4){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2,a3,a4,a5,a6,a7,a8,a9,b0,b1,b2,b3,b4,b5,b6,b7,b8,b9,c0,c1,c2
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
b=0}a=this.b[n].gA()
a0=this.b[n].gE()
a1=this.b[m].gA()
a2=this.b[m].gE()
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
t.cQ(0,o,z,x,a6)
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
a2+=b*(b4*c2-b5*c1)}this.b[n].sE(a0)
this.b[m].sE(a2)}return q>=-0.0075},
dW:function(){var z,y
z=new Array(256)
z.fixed$length=Array
this.d=H.f(z,[V.bQ])
z=new Array(256)
z.fixed$length=Array
this.e=H.f(z,[V.bR])
for(y=0;y<256;++y){this.d[y]=V.cP()
this.e[y]=V.cQ()}},
q:{
be:function(){var z=new V.f2(null,null,null,null,null,null,0,G.q(),G.q(),V.i_(),new V.ho(new E.a(new Float64Array(H.b(2))),new E.a(new Float64Array(H.b(2))),0))
z.dW()
return z}}},
ho:{"^":"c;a,b,c",
cQ:function(a,b,c,d,a0){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e
z=c.b
y=d.b
x=b.a
w=x[a0]
switch(b.ch){case C.m:v=x[0]
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
s.T()
s=this.b.a
s[0]=(q+o)*0.5
s[1]=(p+n)*0.5
this.c=u*r[0]+x*r[1]-b.cx-b.cy
break
case C.i:x=z.b
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
case C.q:x=y.b
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
e6:{"^":"c;a,b,c,d,e,f,r"},
bR:{"^":"c;a,b,c,d,e,f,r,x,y,z,Q,ch,cx,cy,db",
dX:function(){var z,y,x
for(z=this.a,y=0;y<2;++y){x=new Float64Array(2)
z[y]=new V.e6(new E.a(x),new E.a(new Float64Array(2)),0,0,0,0,0)}},
q:{
cQ:function(){var z=new V.bR(H.f(new Array(2),[V.e6]),new E.a(new Float64Array(H.b(2))),new E.ak(new Float64Array(H.b(4))),new E.ak(new Float64Array(H.b(4))),0,0,0,0,0,0,0,0,0,0,0)
z.dX()
return z}}},
bg:{"^":"a8;a,b,c,d,e,f,r,x,y,z,Q,ch,cx,cy,db,dx,dy",
a9:function(a,b,c,d){this.b4(a,b,c,d)},
a2:function(a,b,c){this.dx.fr.cI(a,H.z(this.f.d,"$isaz"),b,this.r.d,c)}},
bh:{"^":"a8;a,b,c,d,e,f,r,x,y,z,Q,ch,cx,cy,db,dx,dy",
a9:function(a,b,c,d){this.b4(a,b,c,d)},
a2:function(a,b,c){var z,y,x
z=this.dx.fr
y=H.z(this.f.d,"$isaz")
x=H.z(this.r.d,"$isaE")
z.k3.cH(a,y,b,x,c)}},
bn:{"^":"a8;a,b,c,d,e,f,r,x,y,z,Q,ch,cx,cy,db,dx,dy",
a2:function(a,b,c){this.dx.fr.eM(a,H.z(this.f.d,"$isaE"),b,this.r.d,c)}},
bo:{"^":"a8;a,b,c,d,e,f,r,x,y,z,Q,ch,cx,cy,db,dx,dy",
a2:function(a,b,c){this.dx.fr.eN(a,H.z(this.f.d,"$isaE"),b,H.z(this.r.d,"$isaE"),c)}},
c8:{"^":"c;A:a<,E:b@"},
ci:{"^":"c;M:a<,J:b@"},
bj:{"^":"c;a,b,c"},
fq:{"^":"c;a,b,c,d,e,f,r,x,y,z,am:Q<,ch,cx,cy",
eR:function(a,b){var z,y,x,w,v,u
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
this.z=!1
y=b.a
y.toString
z=new Float64Array(H.b(2))
x=new V.bO(new E.a(z),C.h,0)
w=y.c.a
z[0]=w[0]
z[1]=w[1]
x.b=y.b
this.d=x
if(this.r==null){z=new Array(1)
z.fixed$length=Array
this.r=H.f(z,[V.bk])
for(v=0;v<1;++v){z=this.r
y=new Float64Array(2)
z[v]=new V.bk(new V.a6(new E.a(y),new E.a(new Float64Array(2))),null,0,0)
this.r[v].scN(null)
this.r[v].sbk(-1)}}z=this.r
y=z.length
if(y<1){u=Math.max(y*2,1)
w=new Array(u)
w.fixed$length=Array
w=H.f(w,[V.bk])
this.r=w
C.d.V(w,0,y,z,0)
for(v=0;v<u;++v){z=this.r
y=new Float64Array(2)
z[v]=new V.bk(new V.a6(new E.a(y),new E.a(new Float64Array(2))),null,0,0)
this.r[v].scN(null)
this.r[v].sbk(-1)}}this.x=0
this.a=b.e},
eT:function(a,b){var z,y,x,w,v,u,t,s,r
this.d.toString
this.x=1
for(z=a.a,y=0;y<this.x;++y){x=this.r[y]
w=this.d
v=x.a
w.bG(v,b,y)
u=z.cf()
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
z.ct(t);++a.b
a.cG(t)
x.d=t
x.b=this
x.c=y}},
dT:function(a,b,c){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l
if(this.x===0)return
for(z=this.cy,y=c.a.a,x=b.a.a,w=z.a,v=a.a,u=this.ch,t=this.cx,s=u.a.a,r=u.b.a,q=0;q<this.x;++q){p=this.r[q]
this.d.bG(u,b,p.c)
this.d.bG(t,c,p.c)
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
if(v.ft(n,o,z))a.cG(n)}}},
bV:{"^":"c;a,am:b<,c,d,e,f,r"},
bk:{"^":"c;aq:a<,cN:b?,c,bk:d@"},
d5:{"^":"c;a,b,c,d,e,f,r,x,y,z,Q,ch,cx,cy,db,dx,dy,fr",
a9:function(a,b,c,d){var z,y,x
this.z=a
this.Q=b
this.ch=c
this.r=0
this.y=0
this.x=0
this.a=d
z=this.b
if(z==null||a>z.length)this.b=H.f(new Array(a),[V.b7])
z=this.d
if(z==null||this.ch>z.length)this.d=H.f(new Array(this.ch),[V.fM])
z=this.c
if(z==null||this.Q>z.length)this.c=H.f(new Array(this.Q),[V.a8])
y=this.f
z=y==null
if(z||this.z>y.length){if(z)y=H.f(new Array(0),[V.ci])
z=new Array(this.z)
z.fixed$length=Array
z=H.f(z,[V.ci])
this.f=z
x=y.length
C.d.V(z,0,x,y,0)
for(;z=this.f,x<z.length;++x)z[x]=new V.ci(new E.a(new Float64Array(2)),0)}y=this.e
z=y==null
if(z||this.z>y.length){if(z)y=H.f(new Array(0),[V.c8])
z=new Array(this.z)
z.fixed$length=Array
z=H.f(z,[V.c8])
this.e=z
x=y.length
C.d.V(z,0,x,y,0)
for(;z=this.e,x<z.length;++x)z[x]=new V.c8(new E.a(new Float64Array(2)),0)}},
dm:function(a1,a2,a3,a4){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0
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
s=(s+z*l*m)*(1/(1+z*w.k1))}J.bH(this.e[x].gA(),r[0])
J.bI(this.e[x].gA(),r[1])
this.e[x].sE(u)
q=t.a
this.f[x].gM().a[0]=q[0]
this.f[x].gM().a[1]=q[1]
this.f[x].sJ(s)}y=this.cy
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
p.cP(o)
p.cR()
if(a2.f)p.fT()
for(x=0;x<this.x;++x)this.d[x].hk(y)
for(x=0;x<a2.d;++x){for(k=0;k<this.x;++k)this.d[k].h5(y)
p.c9()}p.dM()
for(x=0;x<this.r;++x){j=this.e[x].gA()
u=this.e[x].gE()
t=this.f[x].gM()
s=this.f[x].gJ()
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
this.e[x].sE(u+z*s)
this.f[x].sJ(s)}x=0
while(!0){if(!(x<a2.e)){e=!1
break}d=p.dv()
for(c=!0,k=0;k<this.x;++k){b=this.d[k].h4(y)
c=c&&b}if(d&&c){e=!0
break}++x}for(x=0;x<this.r;++x){a=this.b[x]
y=a.f
q=y.c.a
q[0]=J.aN(this.e[x].gA())
q[1]=J.aO(this.e[x].gA())
y.e=this.e[x].gE()
y=a.r.a
y[0]=this.f[x].gM().a[0]
y[1]=this.f[x].gM().a[1]
a.x=this.f[x].gJ()
a.az()}this.d_(p.e)
if(a4){for(a0=17976931348623157e292,x=0;x<this.r;++x){w=this.b[x]
if(w.a===C.e)continue
if((w.b&4)!==0){y=w.x
if(!(y*y>0.0012184696791468343)){y=w.r
y=y.v(y)>0.0001}else y=!0}else y=!0
if(y){w.k3=0
a0=0}else{y=w.k3+=z
a0=Math.min(a0,y)}}if(a0>=0.5&&e)for(x=0;x<this.r;++x)this.b[x].X(!1)}},
dE:function(a,b,c){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k
for(z=0;z<this.r;++z){J.bH(this.e[z].gA(),this.b[z].f.c.a[0])
J.bI(this.e[z].gA(),this.b[z].f.c.a[1])
this.e[z].sE(this.b[z].f.e)
this.f[z].gM().a[0]=this.b[z].r.a[0]
y=this.f[z].gM()
x=this.b
y.a[1]=x[z].r.a[1]
this.f[z].sJ(x[z].x)}y=this.dy
y.b=this.c
y.c=this.y
y.a=a
y.d=this.e
y.e=this.f
x=this.dx
x.cP(y)
for(z=0;z<a.e;++z)if(x.dF(b,c))break
this.b[b].f.b.a[0]=J.aN(this.e[b].gA())
this.b[b].f.b.a[1]=J.aO(this.e[b].gA())
this.b[b].f.d=this.e[b].gE()
this.b[c].f.b.i(this.e[c].gA())
this.b[c].f.d=this.e[c].gE()
x.cR()
for(z=0;z<a.d;++z)x.c9()
w=a.a
for(z=0;z<this.r;++z){v=this.e[z].gA()
u=this.e[z].gE()
t=this.f[z].gM()
s=this.f[z].gJ()
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
J.bH(this.e[z].gA(),p[0])
J.bI(this.e[z].gA(),p[1])
this.e[z].sE(u)
this.f[z].gM().a[0]=y[0]
this.f[z].gM().a[1]=y[1]
this.f[z].sJ(s)
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
m.az()}this.d_(x.e)},
d_:function(a){return}},
fM:{"^":"c;"},
aV:{"^":"c;a,b",
k:function(a){return this.b}},
Y:{"^":"c;a,b,c,d,e",
a4:function(a){this.a=this.a*0.95+a*0.05
this.b=this.b*0.8+a*0.2
this.c=Math.min(a,this.c)
this.d=Math.max(a,this.d)},
k:function(a){return H.d(this.b)+" ("+H.d(this.a)+") ["+H.d(this.c)+","+H.d(this.d)+"]"}},
hq:{"^":"c;a,b,c,d,e,f,r,x,y,z"},
dA:{"^":"c;a,b,c"},
dM:{"^":"c;a,b,c,d,e,f"},
hY:{"^":"c;a,b,c,d,e,f,r,x,y,z,Q,ch,cx,cy,db,dx,dy,fr,fx,fy,go,id,k1,k2,k3,k4,r1,r2,rx,ry,x1,x2,y1,y2,cK,aj,bK,aG,bd,be,bf,bL,bM,bN,bO,bg,bh,bi,ak,aR,cL",
ap:function(a,b,c){var z,y,x,w,v
z=new V.bd(null,!1)
z.a=a
z.b=!0
y=this.fy
x=b.a
w=c.a
y[x][w]=z
if(b!==c){v=new V.bd(null,!1)
v.a=a
y[w][x]=v}},
er:function(){var z=this.ch
this.ap(z.ch,C.h,C.h)
this.ap(z.cx,C.k,C.h)
this.ap(z.Q,C.k,C.k)
this.ap(z.cy,C.n,C.h)
this.ap(z.db,C.n,C.k)
this.ap(z.dx,C.r,C.h)
this.ap(z.dy,C.r,C.k)},
fw:function(a,b,c,d){var z,y,x,w,v,u
z=a.d.a
y=c.d.a
x=this.fy[z.a][y.a]
if(x!=null){w=x.b
v=x.a
if(w){u=v.cW()
u.a9(a,b,c,d)
return u}else{u=v.cW()
u.a9(c,d,a,b)
return u}}else return},
aM:function(a){var z,y,x,w,v,u,t,s,r
if((this.a&2)===2)return
z=G.q()
y=G.q()
x=new E.a(new Float64Array(H.b(2)))
w=new E.a(new Float64Array(H.b(2)))
v=new E.a(new Float64Array(H.b(2)))
u=new G.ao(x,w,v,0,0,0)
t=new E.a(new Float64Array(H.b(2)))
s=new E.a(new Float64Array(H.b(2)))
r=new V.b7(C.e,0,0,z,y,u,t,0,s,0,this,null,null,null,0,null,null,0,0,0,0,0,0,0,0,null,new V.bV(null,null,0.2,0,0,!1,new V.bj(1,65535,0)),new V.fX(0,new E.a(new Float64Array(H.b(2))),0),G.q())
if(a.ch){r.b=8
y=8}else y=0
y|=4
r.b=y
y|=2
r.b=y
r.b=y|32
y=z.a
y.i(a.c)
z.b.bn(a.d)
x.L()
w.i(y)
v.i(y)
y=a.d
u.d=y
u.e=y
u.f=0
t.i(a.e)
r.x=a.f
r.id=a.r
r.k1=a.x
r.k2=a.cy
s.L()
s=a.a
r.a=s
if(s===C.f){r.fr=1
r.fx=1}r.k4=a.b
z=this.c
r.cx=z
if(z!=null)z.ch=r
this.c=r;++this.e
return r},
eJ:function(){var z,y
for(z=this.c;z!=null;z=z.cx){y=z.y.a
y[0]=0
y[1]=0
z.z=0}},
f0:function(){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2,a3,a4
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
if((s&32)!==32){z.a5(0.5,0.5,0.3)
this.aP(q,v,z,x)}else{p=w.a
if(p===C.e){z.a5(0.5,0.9,0.3)
this.aP(q,v,z,x)}else if(p===C.D){z.a5(0.5,0.5,0.9)
this.aP(q,v,z,x)}else if((s&2)!==2){z.a5(0.5,0.5,0.5)
this.aP(q,v,z,x)}else{z.a5(0.9,0.7,0.7)
this.aP(q,v,z,x)}}}}z=this.fx
v=this.Q.a
o=z.z
if(o!==0){n=z.r/2
m=z.cy.a
l=z.fx.a!=null?z.d8():null
z=this.Q
if((v&128)!==0)z.f2(m,n,l,o)
else z.f1(m,n,l,o)}}if((y&4)!==0)for(k=this.d,z=this.ch.a,v=this.k2,u=z.a;!1;k=k.b1()){j=k.fX()
i=k.fY()
h=j.gbB()
g=i.gbB()
f=h.gbj()
e=g.gbj()
t=z.b
s=t+1
z.b=s
t=u[t]
z.b=s+1
s=u[s]
k.fV(t)
k.fW(s)
v.a5(0.5,0.8,0.8)
switch(k.h0()){case C.W:this.Q.Y(t,s,v)
break
case C.X:d=k.fZ()
c=k.h_()
this.Q.Y(d,t,v)
this.Q.Y(c,s,v)
this.Q.Y(d,c,v)
break
case C.Z:this.Q.Y(f,e,v)
break
case C.V:case C.Y:break
default:this.Q.Y(f,t,v)
this.Q.Y(t,s,v)
this.Q.Y(e,s,v)}z.b-=2}if((y&16)!==0){z=this.k2
z.a5(0.3,0.9,0.9)
for(b=this.b.b,v=this.k4,u=this.r1;b!=null;b=b.c){a=b.f
a0=b.r
t=b.x
a.r[t].gaq().bY(v)
t=b.y
a0.r[t].gaq().bY(u)
this.Q.Y(v,u,z)}}if((y&8)!==0){z=this.k2
z.a5(0.9,0.3,0.9)
for(w=this.c,v=this.r2,u=v.a;w!=null;w=w.cx){if((w.b&32)!==32)continue
for(q=w.cy;q!=null;q=q.b)for(a1=0;a1<q.x;++a1){a2=q.r[a1]
t=this.b.a
s=a2.d
a3=t.a.b[s].gaq()
if(!u.aL(4))u.l(0,4,v.c0(4))
t=u.h(0,4)
s=J.A(t)
p=a3.a.a
s.h(t,0).b2(p[0],p[1])
a4=a3.b.a
s.h(t,1).b2(a4[0],p[1])
s.h(t,2).b2(a4[0],a4[1])
s.h(t,3).b2(p[0],a4[1])
a4=this.Q
a4.bb(t,4,z)
a4.c.stroke()}}}if((y&32)!==0)for(w=this.c,z=this.k3,v=z.a,u=v.a,z=z.b;w!=null;w=w.cx){t=w.d
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
s.ab(v,v)
t.beginPath()
t.arc(u[0],u[1],0.1*p,0,6.283185307179586,!0)
t.closePath()
t.stroke()}if((y&64)!==0)this.b.a.a.f3(this.Q)
this.Q.toString},
bq:function(a){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k
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
z.a9(x,v.c,this.f,v.e)
for(y=this.c;y!=null;y=y.cx)y.b&=4294967294
for(u=this.b.b;u!=null;u=u.c)u.a&=4294967294
for(t=this.d;!1;t=t.gba())t.scu(!1)
s=this.e
if(this.y1.length<s)this.y1=H.f(new Array(s),[V.b7])
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
y.X(!0)
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
q=m}for(l=y.dx;!1;l=l.gfu()){l.gcT().gcu()
n=l.gfv()
n.hl()
v=l.gcT()
z.d[z.x++]=v
l.gcT().scu(!0)
n.gcp().W(0,1)
m=q+1
this.y1[q]=n
n.scp(n.gcp().bm(0,1))
q=m}}z.dm(this.fr,a,x,this.x)
for(k=0;k<z.r;++k){y=z.b[k]
if(y.a===C.e)y.b&=4294967294}}z=this.fr.f
z.a4(z.e)
z=this.fr.r
z.a4(z.e)
z=this.fr.x
z.a4(z.e)
z=this.y2.a
x=z.b
z.a=x==null?$.r.$0():x
for(y=this.c;y!=null;y=y.cx){if((y.b&1)===0)continue
if(y.a===C.e)continue
y.cc()}x=this.b
x.a.bW(x)
x=this.fr.y
v=z.b
if(v==null)v=$.r.$0()
x.a4(C.b.ad((v-z.a)*1000,$.x))},
dD:function(b4){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2,a3,a4,a5,a6,a7,a8,a9,b0,b1,b2,b3
z=this.cK
z.a9(64,32,0,this.b.e)
if(this.dy){for(y=this.c;y!=null;y=y.cx){y.b&=4294967294
y.f.f=0}for(x=this.b.b;x!=null;x=x.c){x.a&=4294967262
x.Q=0
x.ch=1}}for(w=this.aG,v=this.bd,u=this.be,t=this.bf,s=this.bK,r=this.aj,q=r.a,p=r.b,o=r.c,n=r.d,m=this.ch;!0;){for(x=this.b.b,l=null,k=1;x!=null;x=x.c){j=x.a
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
if(a3<a4){j.ar(a4)
a3=a4}else if(a4<a3)a.ar(a3)
a5=x.x
a6=x.y
q.c6(h.d,a5)
p.c6(g.d,a6)
o.B(j)
n.B(a)
r.e=1
m.fx.fO(s,r)
a7=s.b
i=s.a===C.A?Math.min(a3+(1-a3)*a7,1):1
x.ch=i
x.a|=32}if(i<k){k=i
l=x}}if(l==null||0.9999988079071045<k){this.dy=!0
break}h=l.f
g=l.r
f=h.c
e=g.c
j=f.f
u.B(j)
a=e.f
t.B(a)
f.ar(k)
e.ar(k)
l.bV(this.b.e)
a8=l.a&=4294967263;++l.Q
if((a8&4)!==4||(a8&2)!==2){l.a=a8&4294967291
j.B(u)
a.B(t)
f.az()
e.az()
continue}f.X(!0)
e.X(!0)
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
u.B(j)
if((b3.b&1)===0)b3.ar(k)
b2.bV(this.b.e)
a=b2.a
if((a&4)!==4){j.B(u)
b3.az()
continue}if((a&2)!==2){j.B(u)
b3.az()
continue}b2.a=a|1
z.c[z.y++]=b2
j=b3.b
if((j&1)!==0)continue
b3.b=j|1
if(b3.a!==C.e)b3.X(!0)
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
z.dE(w,f.c,e.c)
for(a9=0;a9<z.r;++a9){b0=z.b[a9]
b0.b&=4294967294
if(b0.a!==C.f)continue
b0.cc()
for(b1=b0.dy;b1!=null;b1=b1.d)b1.b.a&=4294967262}j=this.b
j.a.bW(j)}},
aP:function(a,b,c,d){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l
z=a.d
switch(z.a){case C.h:y=this.bh
G.m(b,z.c,y)
x=z.b
z=b.b
w=z.b
z=z.a
v=this.bi.a
v[0]=w
v[1]=z
z=c.a
w=this.Q
v=y.a
u=c.c
t=c.b
if(d){s=w.b
r=s.c
w=w.c
w.toString
w.strokeStyle="rgba("+z+", "+t+", "+u+", 0.9)"
u=c.a
t=c.b
z=c.c
w.fillStyle="rgba("+u+", "+t+", "+z+", 0.8)"
s.ab(y,y)
w.beginPath()
w.arc(v[0],v[1],x*r,0,6.283185307179586,!0)
w.closePath()
w.stroke()}else{s=w.b
r=s.c
w=w.c
w.toString
w.strokeStyle="rgba("+z+", "+t+", "+u+", 0.9)"
u=c.a
t=c.b
z=c.c
w.fillStyle="rgba("+u+", "+t+", "+z+", 0.8)"
s.ab(y,y)
w.beginPath()
w.arc(v[0],v[1],x*r,0,6.283185307179586,!0)
w.closePath()
w.fill("nonzero")}break
case C.k:H.z(z,"$isaE")
q=z.ga6()
y=this.cL
w=y.a
if(!w.aL(8))w.l(0,8,y.c0(8))
y=w.h(0,8)
for(w=J.A(y),p=0;C.b.C(p,q);++p)G.m(b,z.gan().h(0,p),w.h(y,p))
z=this.Q
if(d){z.bb(y,q,c)
z.c.stroke()}else{z.bb(y,q,c)
z=z.c
z.toString
z.fill("nonzero")}break
case C.n:H.z(z,"$isaz")
y=this.ak
G.m(b,z.c,y)
w=this.aR
G.m(b,z.d,w)
this.Q.Y(y,w,c)
break
case C.r:H.z(z,"$isbN")
o=z.gem()
n=z.gbD()
z=this.ak
G.m(b,n.h(0,0),z)
for(y=this.aR,w=z.a,m=y.a,p=1;C.b.C(p,o);++p){G.m(b,n.h(0,p),y)
this.Q.Y(z,y,c)
v=this.Q
u=v.b
t=u.c
v=v.c
s=c.a
r=c.b
l=c.c
v.toString
v.strokeStyle="rgba("+s+", "+r+", "+l+", 0.9)"
l=c.a
r=c.b
s=c.c
v.fillStyle="rgba("+l+", "+r+", "+s+", 0.8)"
u.ab(z,z)
v.beginPath()
v.arc(w[0],w[1],0.05*t,0,6.283185307179586,!0)
v.closePath()
v.stroke()
w[1]=m[1]
w[0]=m[0]}break
default:break}},
q:{
i2:function(a,b){var z,y,x
z=H.f(new Array(a),[[P.j,V.bd]])
for(y=[V.bd],x=0;x<a;++x)z[x]=H.f(new Array(b),y)
return z}}},
i0:{"^":"c;a,b",
d1:function(a){var z=this.a.a.b[a].gam()
return this.b.hp(z.b)}},
i1:{"^":"c;a,b,c,d,e"},
c7:{"^":"c;a",
sE:function(a){this.a[3]=a},
gE:function(){return this.a[3]}},
hi:{"^":"c;a,b,c,d,am:e<"},
bm:{"^":"c;a,b,c"},
hh:{"^":"c;a,b"},
h7:{"^":"c;a,b,c"},
fd:{"^":"c;a,b,c,d,e"},
hT:{"^":"c;a,b"},
f3:{"^":"c;a,b,c"},
hz:{"^":"c;a,b,c,d,e,f"},
hj:{"^":"c;a,b,c,d,e,f,r,x,y,z,Q,ch,cx,cy,db,dx,dy,fr,fx,fy,go,id,k1,k2,k3,k4,r1,r2,rx,ry,x1,x2,y1,y2,cK,aj,bK,aG,bd,be,bf,bL,bM,bN,bO,bg,bh,bi,ak,aR,cL,he,aS,hf,hg,hh,hi,f4,f5,f6,f7,f8,f9,hj",
bT:function(a,b){var z,y,x,w,v
if(a==null){x=this.Q
w=new Array(x)
w.fixed$length=Array
a=w
for(z=0;J.cB(z,x);z=J.eC(z,1))try{J.eD(a,z,b.$0())}catch(v){y=H.S(v)
x="Exception "+H.d(y)
throw H.e(x)}}return a},
eZ:function(a){var z,y
z=this.ak
z.c3()
z.c3().h2(a)
for(y=a.gb6(),z=this.fy;y.C(0,a.gb8());y=y.p(0,1))C.c.l(z,y,null)
a.gby()
a.gby().sba(a.gba())
a.gba()
a.gba().sby(a.gby());--this.bK},
fS:function(a){var z,y,x,w,v,u,t,s
for(z=this.k2,y=this.x,x=0;w=this.id,x<w;++x){v=C.c.h(z,x)
u=v.gbP(v)
w=this.cy.a[u].a
t=w[0]
v.sfL(0,(C.a.U(y*w[1]+2048)<<19>>>0)+(C.a.U(128*(y*t))+262144))}F.ex(z,0,w)
this.k3=0
for(u=0;u<this.id;++u){s=C.c.h(z,u)
V.hm(s.gfL(s),1,0)}},
fR:function(){var z,y,x,w,v,u,t,s,r
z=this.aR
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
w=this.f4
w.a=this
this.ak.fD(w,z)},
dr:function(a){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k
z=this.aR
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
x[1]=q>o?q:o}y=this.f5
y.b=a
y.a=this
this.ak.fD(y,z)},
bq:function(a){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k;++this.a
if(this.z===0)return
this.b=0
for(z=0,y=0;z<this.z;++z){y=C.b.bm(y,C.c.h(this.cx.a,z))
this.b=y}if((y&2)!==0)this.dJ()
if(this.z===0)return
this.c=0
for(x=this.aG;!1;x=x.b1())this.c=C.b.bm(this.c,x.gcr())
y=a.a
w=this.f
v=this.ak
u=v.d7()
t=C.a.j(y*w,u.gm(u))
u=a.a
v=v.d7()
s=C.a.j(u*w,v.gn(v))
r=this.c_(a)
for(z=0;z<this.z;++z){y=this.db.a[z].a
y[0]=y[0]+t
y[1]=y[1]+s
w=y[0]
v=y[1]
q=w*w+v*v
if(q>r){p=q===0?17976931348623157e292:Math.sqrt(r/q)
y[0]=y[0]*p
y[1]=y[1]*p}}this.dr(a)
if((this.c&2)!==0)this.dA(a)
if((this.b&4)!==0)this.dI(a)
for(y=this.z,w=this.cy.a,v=this.db.a,u=a.a,z=0;z<y;++z){o=w[z]
n=v[z]
m=o.a
l=m[0]
k=n.a
m[0]=l+u*k[0]
m[1]=m[1]+u*k[1]}this.fR()
this.fS(!1)
if((this.b&32)!==0)this.dH(a)
if((this.b&64)!==0)this.dw(a)
if((this.b&128)!==0)this.dG(a)
if((this.b&16)!==0)this.du(a)
if((this.b&8)!==0)this.dC(a)
if((this.c&1)!==0)this.dB(a)
if((this.b&256)!==0)this.ds(a)
this.dz(a)
this.dt(a)},
dz:function(a){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e
for(z=this.dx,y=0;y<this.z;++y)C.c.l(z,y,0)
for(x=0;x<this.r2;++x){w=this.ry[x]
v=w.a
u=w.c
C.c.l(z,v,C.c.h(z,v).p(0,u))}for(x=0;x<this.k3;++x){w=this.r1[x]
v=w.a
t=w.b
u=w.d
C.c.l(z,v,C.c.h(z,v).p(0,u))
C.c.l(z,t,C.c.h(z,t).p(0,u))}if((this.b&64)!==0)for(y=0;y<this.z;++y){C.c.h(this.cx.a,y).W(0,64)
C.c.l(z,y,0)}s=this.bd*(this.d*this.c_(a))
for(y=0;y<this.z;++y)C.c.l(z,y,s*Math.max(0,Math.min(H.iX(C.c.h(z,y)),5)-1))
r=a.a/(this.d*this.r)
for(q=this.aS,p=q.a,o=this.x,n=1.777777*this.e*o*o,x=0;x<this.r2;++x){w=this.ry[x]
v=w.a
t=w.b
u=w.c
m=w.e
l=w.d
k=this.cy.a[v]
j=C.j.j(r*u*m,C.c.h(z,v).p(0,s*u))
o=l.a
p[0]=j*o[0]
p[1]=j*o[1]
o=this.db.a[v].a
o[0]=o[0]-n*p[0]
o[1]=o[1]-n*p[1]
t.bE(q,k,!0)}for(x=0;x<this.k3;++x){w=this.r1[x]
v=w.a
t=w.b
u=w.d
l=w.e
i=C.c.h(z,v).p(0,C.c.h(z,t))
p=r*u
o=l.a
h=C.j.j(p,i)*o[0]
g=C.j.j(p,i)*o[1]
o=this.db.a
f=o[v]
e=o[t]
o=f.a
o[0]=o[0]-h
o[1]=o[1]-g
o=e.a
o[0]=o[0]+h
o[1]=o[1]+g}},
dt:function(a4){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2,a3
z=this.be
for(y=this.aS,x=y.a,w=this.x,v=1.777777*this.e*w*w,u=0;u<this.r2;++u){t=this.ry[u]
s=t.a
r=t.b
q=t.c
p=t.e
o=t.d
n=this.cy.a[s]
w=n.a
m=w[0]
l=r.gbA().gA()
k=C.a.u(m,l.gm(l))
w=w[1]
l=r.gbA().gA()
j=C.a.u(w,l.gn(l))
i=this.db.a[s]
l=r.gb5().dc(0).j(0,j)
w=r.gb9()
w=l.p(0,w.gm(w))
l=i.a
h=w.u(0,l[0])
w=r.gb5().j(0,k)
m=r.gb9()
g=w.p(0,m.gn(m)).u(0,l[1])
m=o.a
f=h.j(0,m[0]).p(0,g.j(0,m[1]))
if(f.C(0,0)){w=z*q*p
x[0]=C.a.j(w,f)*m[0]
x[1]=C.a.j(w,f)*m[1]
l[0]=l[0]+v*x[0]
l[1]=l[1]+v*x[1]
x[0]=-x[0]
x[1]=-x[1]
r.bE(y,n,!0)}}for(x=this.k3,w=this.r1,m=this.db.a,u=0;u<x;++u){t=w[u]
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
dI:function(a){var z,y,x
for(z=0;z<this.z;++z){C.c.h(this.cx.a,z).W(0,4)
y=this.db.a[z]
x=y.a
x[0]=0
x[1]=0}},
dA:function(a){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h
for(z=this.aG,y=this.aS,x=this.f6,w=this.f7,v=y.a,u=this.f8,t=u.a,s=t.a,u=u.b,r=this.f9,q=r.a.a,p=r.b;!1;z=z.b1()){z.gcr().W(0,2)
z.hq()
o=C.a.j(a.a,z.gb5())
w.a=Math.sin(o)
w.b=Math.cos(o)
G.M(w,z.gef(),x)
n=z.gb9().geC()
v[1]=n[1]
v[0]=n[0]
o=a.a
v[1]=v[1]*o
v[0]=v[0]*o
y.F(0,z.gef())
y.w(x)
s[1]=v[1]
s[0]=v[0]
u.a=w.a
u.b=w.b
o=z.gbB()
m=z.gbB()
l=o.gfB()
k=m.gfB()
j=C.a.j(u.b,l.gA())
i=C.a.j(u.a,l.gc4())
k.sc4(C.a.j(u.a,l.gA())+C.a.j(u.b,l.gc4()))
k.sA(j-i)
o=o.gbj()
i=m.gbj()
j=C.a.j(u.a,o.gm(o))
k=C.a.j(u.b,o.gn(o))
i.sm(0,C.a.j(u.b,o.gm(o))-C.a.j(u.a,o.gn(o)))
i.sn(0,j+k)
m.gbj().F(0,t)
m=a.b
q[0]=m*s[0]
q[1]=m*s[1]
p.a=m*u.a
p.b=m*(u.b-1)
for(h=z.gb6();h.C(0,z.gb8());h=h.p(0,1))G.m(r,this.cy.a[h],this.db.a[h])}},
du:function(a6){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2,a3,a4,a5
z=a6.b*this.bf
for(y=0;y<this.y2;++y){x=C.c.h(this.aj,y)
x.gfd().W(0,16)
w=x.gau()
v=x.gav()
u=x.gbQ()
t=x.ghm()
s=x.ghn()
r=x.gho()
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
g=t.a7(p).p(0,s.a7(o)).p(0,r.a7(n))
f=t.v(p).p(0,s.v(o)).p(0,r.v(n))
e=Math.sqrt(C.b.d5(1,g.j(0,g).p(0,f.j(0,f))))
g=g.j(0,e)
f=f.j(0,e)
d=C.a.j(z,x.gdN())
c=f.j(0,t.gm(t)).u(0,g.j(0,t.gn(t)))
b=g.j(0,t.gm(t)).p(0,f.j(0,t.gn(t)))
a=f.j(0,s.gm(s)).u(0,g.j(0,s.gn(s)))
a0=g.j(0,s.gm(s)).p(0,f.j(0,s.gn(s)))
a1=f.j(0,r.gm(r)).u(0,g.j(0,r.gn(r)))
a2=g.j(0,r.gm(r)).p(0,f.j(0,r.gn(r)))
m=this.db.a
a3=m[w]
a4=m[v]
a5=m[u]
m=a3.a
m[0]=m[0]+C.a.j(d,c.u(0,q[0]-i))
m[1]=m[1]+C.a.j(d,b.u(0,q[1]-h))
q=a4.a
q[0]=q[0]+C.a.j(d,a.u(0,l[0]-i))
q[1]=q[1]+C.a.j(d,a0.u(0,l[1]-h))
l=a5.a
l[0]=l[0]+C.a.j(d,a1.u(0,j[0]-i))
l[1]=l[1]+C.a.j(d,a2.u(0,j[1]-h))}},
dC:function(a){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h
z=a.b*this.bL
for(y=this.y1,x=0;x<this.x1;++x){w=C.c.h(y,x)
w.gfd().W(0,8)
v=w.gau()
u=w.gav()
t=this.cy.a
s=t[v]
t=t[u].a
r=t[0]
q=s.a
p=r-q[0]
o=t[1]-q[1]
n=w.ghd()
m=Math.sqrt(p*p+o*o)
if(m===0)m=17976931348623157e292
l=C.a.j(z,w.gdN())
k=C.a.j(l,n.u(0,m))/m*p
j=C.a.j(l,n.u(0,m))/m*o
t=this.db.a
i=t[v]
h=t[u]
t=i.a
t[0]=t[0]-k
t[1]=t[1]-j
t=h.a
t[0]=t[0]+k
t[1]=t[1]+j}},
dG:function(a0){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a
this.dy=this.bT(this.dy,V.ct())
for(z=this.dx,y=0;y<this.z;++y){C.c.l(z,y,0)
this.dy[y].L()}for(x=0;x<this.k3;++x){w=this.r1[x]
if((w.c&128)!==0){v=w.a
u=w.b
t=w.d
s=w.e
C.c.l(z,v,C.c.h(z,v).p(0,t))
C.c.l(z,u,C.c.h(z,u).p(0,t))
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
r[1]=r[1]+o*n[1]}}r=this.bN
n=this.r*a0.b
m=r*n
l=this.bO*n
for(x=0;x<this.k3;++x){w=this.r1[x]
if((w.c&128)!==0){v=w.a
u=w.b
t=w.d
s=w.e
r=this.dy
q=r[v]
p=r[u]
k=C.c.h(z,v).p(0,C.c.h(z,u))
r=p.a
n=r[0]
j=q.a
i=j[0]
r=r[1]
j=j[1]
h=C.j.j(m,k.u(0,2))
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
dH:function(a1){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0
z=this.bM
for(y=this.aS,x=this.x,w=1.777777*this.e*x*x,x=y.a,v=0;v<this.r2;++v){u=this.ry[v]
t=u.a
C.c.h(this.cx.a,t).W(0,32)
s=u.b
r=u.c
q=u.e
p=this.cy.a[t]
o=this.db.a[t]
n=p.a
m=n[0]
l=s.gbA().gA()
k=C.a.u(m,l.gm(l))
n=n[1]
l=s.gbA().gA()
j=C.a.u(n,l.gn(l))
l=s.gb5().dc(0).j(0,j)
n=s.gb9()
n=l.p(0,n.gm(n))
l=o.a
i=n.u(0,l[0])
n=s.gb5().j(0,k)
m=s.gb9()
h=n.p(0,m.gn(m)).u(0,l[1])
m=z*q*r
x[0]=C.j.j(m,i)
x[1]=C.j.j(m,h)
l[0]=l[0]+w*x[0]
l[1]=l[1]+w*x[1]
x[0]=-x[0]
x[1]=-x[1]
s.bE(y,p,!0)}for(x=this.k3,n=this.r1,m=this.db.a,v=0;v<x;++v){u=n[v]
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
dw:function(a){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f
z=this.bg*(this.r*a.b)
for(y=this.aS,x=this.x,w=1.777777*this.e*x*x,x=y.a,v=0;v<this.r2;++v){u=this.ry[v]
t=u.a
C.c.h(this.cx.a,t).W(0,64)
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
r.bE(y,p,!0)}}for(x=this.k3,l=this.r1,k=this.db.a,j=this.bg,v=0;v<x;++v){u=l[v]
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
dB:function(a){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j
z=this.fr
this.fr=z==null?new Float64Array(H.b(this.Q)):z
y=a.b*this.bh
for(x=this.fy,w=0;w<this.k3;++w){v=this.r1[w]
u=v.a
t=v.b
C.c.h(x,u)
C.c.h(x,t)
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
ds:function(a){var z,y,x,w,v,u,t,s,r,q,p,o,n
z=this.fx
z.a=this.bT(z.a,V.ep())
y=C.a.U(256*this.bi)
for(x=0;x<this.k3;++x){w=this.r1[x]
v=w.a
u=w.b
C.c.h(this.cx.a,v).W(0,C.c.h(this.cx.a,u)).W(0,256)
z=this.fx.a
t=z[v]
z=z[u].a
s=z[0]
r=t.a
q=C.b.aC(C.b.U(y*(s-r[0])),8)
p=C.b.aC(C.b.U(y*(z[1]-r[1])),8)
o=C.b.aC(C.b.U(y*(z[2]-r[2])),8)
n=C.b.aC(C.b.U(y*(z[3]-r[3])),8)
r[0]=r[0]+q
r[1]=r[1]+p
r[2]=r[2]+o
r[3]=r[3]+n
z[0]=z[0]-q
z[1]=z[1]-p
z[2]=z[2]-o
z[3]=z[3]-n}},
dJ:function(){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i
z=P.aj(this.z,0,!1,P.l)
for(y=this.ak,x=0;x<this.z;++x){w=C.c.h(this.cx.a,x)
w.W(0,2)
v=y.c3()
w.W(0,512)
v.h1(x)
z[x]=-1}for(y=this.k2,u=0;t=this.id,u<t;++u){s=C.c.h(y,u)
s.sbP(0,z[s.gbP(s)])}for(x=0;x<t;++x)if(V.hl(C.c.h(y,x))){--t
r=C.c.h(y,t)
C.c.l(y,t,C.c.h(y,x))
C.c.l(y,x,r);--x}this.id=t
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
for(y=this.y1,u=0;t=this.x1,u<t;++u){o=C.c.h(y,u)
o.sau(z[o.gau()])
o.sav(z[o.gav()])}for(x=0;x<t;++x){p=C.c.h(y,x)
if(p.gau().C(0,0)||p.gav().C(0,0)){--t
r=C.c.h(y,t)
C.c.l(y,t,C.c.h(y,x))
C.c.l(y,x,r);--x}}this.x1=t
for(u=0;t=this.y2,u<t;++u){n=C.c.h(this.aj,u)
n.sau(z[n.gau()])
n.sav(z[n.gav()])
n.sbQ(z[n.gbQ()])}for(x=0;x<t;++x){y=C.c.h(this.aj,x)
if(y.gau().C(0,0)||y.gav().C(0,0)||y.gbQ().C(0,0)){--t
r=C.c.h(this.aj,t)
y=this.aj
C.c.l(y,t,C.c.h(y,x))
C.c.l(this.aj,x,r);--x}}this.y2=t
for(m=this.aG;!1;m=m.b1()){for(x=m.gb6(),l=0,k=0,j=!1;x.C(0,m.gb8());x=x.p(0,1)){t=z[x]
if(t>=0){l=Math.min(l,t)
k=Math.max(k,t+1)}else j=!0}if(l<k){m.sb6(l)
m.sb8(k)
if(j){m.gcr().W(0,2)
m.seB(!0)}}else{m.sb6(0)
m.sb8(0)
if(m.gh7())m.seA(!0)}}this.z=0
for(m=this.aG;!1;m=i){i=m.b1()
if(m.geA())this.eZ(m)
else m.geB()}},
c_:function(a){var z=this.r*a.b
return z*z},
d8:function(){var z=this.fx
z.a=this.bT(z.a,z.b)
return this.fx.a},
e5:function(a){this.bd=0.05
this.be=1
this.bf=0.25
this.bL=0.25
this.bM=0.25
this.bN=0.1
this.bO=0.2
this.bg=0.5
this.bh=0.5
this.bi=0.5
this.cx=new V.hh(null,null)
this.cy=new V.bm(null,V.ct(),0)
this.db=new V.bm(null,V.ct(),0)
this.fx=new V.bm(null,V.ep(),0)
this.go=new V.bm(null,V.iW(),0)},
q:{
hm:function(a,b,c){return a.p(0,c<<19>>>0).p(0,b<<7>>>0)},
kl:[function(){return new E.a(new Float64Array(H.b(2)))},"$0","ct",0,0,16],
kj:[function(){return new P.c()},"$0","iW",0,0,17],
kk:[function(){var z=new Int8Array(H.b(4))
z[0]=127
z[1]=127
z[2]=127
z[3]=50
return new V.c7(z)},"$0","ep",0,0,18],
hk:function(a){var z=new V.hj(0,0,0,1,1,1,1,1,1,0,0,0,null,null,null,null,null,null,null,null,null,0,0,null,0,0,null,0,0,null,0,0,null,0,0,null,0,null,null,null,null,null,null,null,null,null,null,null,null,V.av(),new V.fd(null,null,null,!1,0),V.av(),new E.a(new Float64Array(H.b(2))),G.q(),G.q(),new V.f3(null,null,null),new V.hi(0,new E.a(new Float64Array(H.b(2))),new E.a(new Float64Array(H.b(2))),null,null),new V.hT(null,new E.a(new Float64Array(H.b(2)))),new V.hz(null,null,new V.cc(new E.a(new Float64Array(H.b(2))),new E.a(new Float64Array(H.b(2))),0),new V.dw(new E.a(new Float64Array(H.b(2))),0),new E.a(new Float64Array(H.b(2))),new E.a(new Float64Array(H.b(2)))),new E.a(new Float64Array(H.b(2))),new G.aZ(0,1),G.q(),G.q(),new V.h7(0,0,0))
z.e5(a)
return z}}},
e4:{"^":"c;a",
c0:function(a){var z,y,x
z=new Array(a)
z.fixed$length=Array
y=H.f(z,[E.a])
for(z=y.length,x=0;x<z;++x)y[x]=new E.a(new Float64Array(2))
return y}},
hf:{"^":"L;a,b,c,d",
S:function(){return new E.a(new Float64Array(2))},
$asL:function(){return[E.a]}},
hg:{"^":"L;a,b,c,d",
S:function(){return new E.aG(new Float64Array(3))},
$asL:function(){return[E.aG]}},
hc:{"^":"L;a,b,c,d",
S:function(){return new E.ak(new Float64Array(4))},
$asL:function(){return[E.ak]}},
hd:{"^":"L;a,b,c,d",
S:function(){return new E.aX(new Float64Array(9))},
$asL:function(){return[E.aX]}},
hb:{"^":"L;a,b,c,d",
S:function(){var z=new Float64Array(2)
return new V.a6(new E.a(z),new E.a(new Float64Array(2)))},
$asL:function(){return[V.a6]}},
he:{"^":"L;a,b,c,d",
S:function(){return new G.aZ(0,1)},
$asL:function(){return[G.aZ]}},
F:{"^":"a4;$ti"},
h5:{"^":"F;d,a,b,c",
S:function(){return new V.bo(0,null,null,new V.B(null,null,null,null),new V.B(null,null,null,null),null,null,0,0,V.E(),0,0,0,0,0,this.d,V.E())},
$asF:function(){return[V.bo]},
$asa4:function(){return[V.bo]}},
h1:{"^":"F;d,a,b,c",
S:function(){return new V.bb(0,null,null,new V.B(null,null,null,null),new V.B(null,null,null,null),null,null,0,0,V.E(),0,0,0,0,0,this.d,V.E())},
$asF:function(){return[V.bb]},
$asa4:function(){return[V.bb]}},
h4:{"^":"F;d,a,b,c",
S:function(){return new V.bn(0,null,null,new V.B(null,null,null,null),new V.B(null,null,null,null),null,null,0,0,V.E(),0,0,0,0,0,this.d,V.E())},
$asF:function(){return[V.bn]},
$asa4:function(){return[V.bn]}},
h2:{"^":"F;d,a,b,c",
S:function(){return new V.bg(0,null,null,new V.B(null,null,null,null),new V.B(null,null,null,null),null,null,0,0,V.E(),0,0,0,0,0,this.d,V.E())},
$asF:function(){return[V.bg]},
$asa4:function(){return[V.bg]}},
h3:{"^":"F;d,a,b,c",
S:function(){return new V.bh(0,null,null,new V.B(null,null,null,null),new V.B(null,null,null,null),null,null,0,0,V.E(),0,0,0,0,0,this.d,V.E())},
$asF:function(){return[V.bh]},
$asa4:function(){return[V.bh]}},
h_:{"^":"F;d,a,b,c",
S:function(){var z,y,x,w
z=new Float64Array(2)
y=new Float64Array(2)
x=new Float64Array(2)
w=new Float64Array(2)
z=new V.az(new E.a(z),new E.a(y),new E.a(x),new E.a(w),!1,!1,new E.a(new Float64Array(2)),C.n,0)
z.b=0.01
return new V.b9(z,0,null,null,new V.B(null,null,null,null),new V.B(null,null,null,null),null,null,0,0,V.E(),0,0,0,0,0,this.d,V.E())},
$asF:function(){return[V.b9]},
$asa4:function(){return[V.b9]}},
h0:{"^":"F;d,a,b,c",
S:function(){var z,y,x,w
z=new Float64Array(2)
y=new Float64Array(2)
x=new Float64Array(2)
w=new Float64Array(2)
z=new V.az(new E.a(z),new E.a(y),new E.a(x),new E.a(w),!1,!1,new E.a(new Float64Array(2)),C.n,0)
z.b=0.01
return new V.ba(z,0,null,null,new V.B(null,null,null,null),new V.B(null,null,null,null),null,null,0,0,V.E(),0,0,0,0,0,this.d,V.E())},
$asF:function(){return[V.ba]},
$asa4:function(){return[V.ba]}},
f8:{"^":"c;a,b,c,d,e,f,r,x,y,z,Q,ch,cx,cy,db,dx,dy,fr,fx,fy",
dZ:function(a0,a1){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a
z=new V.h5(this,null,null,null)
z.ao(10,V.bo)
this.Q=z
z=new V.h1(this,null,null,null)
z.ao(10,V.bb)
this.ch=z
z=new V.h4(this,null,null,null)
z.ao(10,V.bn)
this.cx=z
z=new V.h2(this,null,null,null)
z.ao(10,V.bg)
this.cy=z
z=new V.h3(this,null,null,null)
z.ao(10,V.bh)
this.db=z
z=new V.h_(this,null,null,null)
z.ao(10,V.b9)
this.dx=z
z=new V.h0(this,null,null,null)
z.ao(10,V.ba)
this.dy=z
z=V.ax()
y=V.ax()
x=G.q()
w=G.q()
v=V.dz()
u=new Float64Array(H.b(2))
t=new Float64Array(H.b(2))
s=new Float64Array(H.b(2))
r=G.q()
q=new Float64Array(H.b(2))
p=new Float64Array(H.b(2))
o=[V.Q]
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
a=V.fl()
n[0]=new V.Q(new E.a(new Float64Array(H.b(2))),new V.J(new Int8Array(H.b(4))))
n[1]=new V.Q(new E.a(new Float64Array(H.b(2))),new V.J(new Int8Array(H.b(4))))
g[0]=new V.Q(new E.a(new Float64Array(H.b(2))),new V.J(new Int8Array(H.b(4))))
g[1]=new V.Q(new E.a(new Float64Array(H.b(2))),new V.J(new Int8Array(H.b(4))))
o[0]=new V.Q(new E.a(new Float64Array(H.b(2))),new V.J(new Int8Array(H.b(4))))
o[1]=new V.Q(new E.a(new Float64Array(H.b(2))),new V.J(new Int8Array(H.b(4))))
this.fr=new V.eZ(this,new V.cS(z,y,x,w,!1),v,new V.cT(new E.a(u),new E.a(t),0,0),new E.a(s),r,new E.a(q),new E.a(p),new V.eb(0,0),new V.eb(0,0),n,new E.a(m),new E.a(l),new E.a(k),new E.a(j),new E.a(i),new E.a(h),g,o,new E.a(f),new E.a(e),new V.J(d),new E.a(c),new E.a(b),a)
this.fx=new V.hJ(V.dz(),new V.cS(V.ax(),V.ax(),G.q(),G.q(),!1),G.q(),G.q(),new V.cT(new E.a(new Float64Array(H.b(2))),new E.a(new Float64Array(H.b(2))),0,0),new V.hv(null,null,null,new E.a(new Float64Array(H.b(2))),new E.a(new Float64Array(H.b(2))),null,null,new E.a(new Float64Array(H.b(2))),new E.a(new Float64Array(H.b(2))),new E.a(new Float64Array(H.b(2))),new E.a(new Float64Array(H.b(2))),new E.a(new Float64Array(H.b(2))),new E.a(new Float64Array(H.b(2))),new E.a(new Float64Array(H.b(2))),new E.a(new Float64Array(H.b(2))),new E.a(new Float64Array(H.b(2))),new E.a(new Float64Array(H.b(2))),G.q(),G.q(),new E.a(new Float64Array(H.b(2))),new E.a(new Float64Array(H.b(2)))),P.aj(2,0,!1,P.l),new G.ao(new E.a(new Float64Array(H.b(2))),new E.a(new Float64Array(H.b(2))),new E.a(new Float64Array(H.b(2))),0,0,0),new G.ao(new E.a(new Float64Array(H.b(2))),new E.a(new Float64Array(H.b(2))),new E.a(new Float64Array(H.b(2))),0,0,0),this)
this.z=this},
q:{
f9:function(a,b){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c
z=P.l
y=P.aQ(null,null,null,z,P.fr)
x=P.aQ(null,null,null,z,[P.j,P.l])
w=P.aQ(null,null,null,z,[P.j,E.a])
v=E.a
u=[v]
u=new V.hf(H.f(new Array(a),u),0,a,H.f(new Array(b),u))
u.aA(a,b,v)
v=E.aG
t=[v]
t=new V.hg(H.f(new Array(a),t),0,a,H.f(new Array(b),t))
t.aA(a,b,v)
v=E.ak
s=[v]
s=new V.hc(H.f(new Array(a),s),0,a,H.f(new Array(b),s))
s.aA(a,b,v)
v=V.a6
r=[v]
r=new V.hb(H.f(new Array(a),r),0,a,H.f(new Array(b),r))
r.aA(a,b,v)
v=G.aZ
q=[v]
q=new V.he(H.f(new Array(a),q),0,a,H.f(new Array(b),q))
q.aA(a,b,v)
v=E.aX
p=[v]
p=new V.hd(H.f(new Array(a),p),0,a,H.f(new Array(b),p))
p.aA(a,b,v)
v=new V.by(new E.a(new Float64Array(H.b(2))),new E.a(new Float64Array(H.b(2))),new E.a(new Float64Array(H.b(2))),0,0,0)
o=new V.by(new E.a(new Float64Array(H.b(2))),new E.a(new Float64Array(H.b(2))),new E.a(new Float64Array(H.b(2))),0,0,0)
n=new V.by(new E.a(new Float64Array(H.b(2))),new E.a(new Float64Array(H.b(2))),new E.a(new Float64Array(H.b(2))),0,0,0)
m=H.f(new Array(3),[V.by])
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
z=new V.f8(u,t,s,p,r,q,y,x,w,null,null,null,null,null,null,null,null,null,null,new V.fe(new V.iA(v,o,n,m,0,new E.a(l),new E.a(k),new E.a(j),new E.a(i),new E.a(h),new E.a(g),new E.a(f),new E.a(e),new E.a(d),new E.a(c)),P.aj(3,0,!1,z),P.aj(3,0,!1,z),new E.a(new Float64Array(H.b(2))),new E.a(new Float64Array(H.b(2))),new E.a(new Float64Array(H.b(2))),new E.a(new Float64Array(H.b(2)))))
z.dZ(a,b)
return z}}},
a4:{"^":"c;$ti",
cJ:function(a){var z,y,x
z=new Array(a)
z.fixed$length=Array
y=H.f(z,[H.ab(this,"a4",0)])
z=this.a
if(z!=null)C.d.V(y,0,this.c,z,0)
for(z=y.length,x=0;x<z;++x)y[x]=this.S()
this.a=y
this.c=z},
cW:function(){var z,y
z=this.b
y=this.c
if(z>=y)this.cJ(y*2)
return this.a[this.b++]},
ao:function(a,b){this.b=0
this.a=null
this.c=0
this.cJ(a)}},
L:{"^":"c;$ti",
aA:function(a,b,c){var z,y
for(z=this.a,y=0;y<a;++y)z[y]=this.S()}}}],["","",,F,{"^":"",
ex:function(a,b,c){var z
P.cb(b,c,a.length,null,null,null)
z=P.c0(H.dD(a,b,c,H.ac(a,0)),!0,null)
C.d.bF(z,"sort")
H.b_(z,0,z.length-1,P.iZ());(a&&C.d).dl(a,b,c,z)}}],["","",,N,{"^":"",eR:{"^":"f5;c,a,b",
bb:function(a,b,c){var z,y,x
this.cA(c)
for(z=J.A(a),y=this.b,x=0;x<b;++x)y.ab(z.h(a,x),z.h(a,x))
y=this.c
y.beginPath()
y.moveTo(J.aN(z.h(a,0)),J.aO(z.h(a,0)))
for(x=1;x<b;++x)y.lineTo(J.aN(z.h(a,x)),J.aO(z.h(a,x)))
y.lineTo(J.aN(z.h(a,0)),J.aO(z.h(a,0)))
y.closePath()},
Y:function(a,b,c){var z,y,x,w
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
y.ab(a,a)
y.ab(b,b)
z.beginPath()
y=a.a
z.moveTo(y[0],y[1])
y=b.a
z.lineTo(y[0],y[1])
z.closePath()
z.stroke()},
cA:function(a){var z,y,x,w
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
f1:function(a,b,c,d){throw H.e("Unimplemented")},
f2:function(a,b,c,d){throw H.e("Unimplemented")}}}],["","",,G,{"^":"",bP:{"^":"c;m:a>,n:b>,c",
a5:function(a,b,c){this.a=C.b.U(C.a.al(a*255))
this.b=C.b.U(C.a.al(b*255))
this.c=C.b.U(C.a.al(c*255))}},aZ:{"^":"c;a,A:b<",
bn:function(a){this.a=Math.sin(a)
this.b=Math.cos(a)
return this},
k:function(a){return"Rot(s:"+H.d(this.a)+", c:"+H.d(this.b)+")"},
q:{
M:function(a,b,c){var z,y,x,w,v,u
z=a.b
y=b.a
x=y[0]
w=a.a
v=y[1]
u=c.a
u[0]=z*x-w*v
u[1]=w*y[0]+z*y[1]},
an:function(a,b,c){var z,y,x,w,v
z=a.b
y=b.a
x=y[0]
w=a.a
v=c.a
v[0]=z*x+w*y[1]
v[1]=-w*y[0]+z*y[1]}}},ao:{"^":"c;a,b,A:c<,d,E:e@,f",
k:function(a){return"Sweep:\nlocalCenter: "+this.a.k(0)+"\n"+("c0: "+this.b.k(0)+", c: "+this.c.k(0)+"\n")+("a0: "+H.d(this.d)+", a: "+H.d(this.e)+"\n")+("alpha0: "+H.d(this.f))},
T:function(){var z=6.283185307179586*C.j.al(this.d/6.283185307179586)
this.d-=z
this.e-=z},
B:function(a){this.a.i(a.a)
this.b.i(a.b)
this.c.i(a.c)
this.d=a.d
this.e=a.e
this.f=a.f
return this},
aa:function(a,b){var z,y,x,w,v,u
z=1-b
y=this.b.a
x=this.c.a
w=a.a.a
w[0]=z*y[0]+b*x[0]
w[1]=z*y[1]+b*x[1]
x=a.b
x.bn(z*this.d+b*this.e)
z=w[0]
y=x.b
v=this.a.a
u=v[0]
x=x.a
w[0]=z-(y*u-x*v[1])
w[1]=w[1]-(x*v[0]+y*v[1])},
ar:function(a){var z,y,x,w
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
this.f=a}},cf:{"^":"c;a"},hQ:{"^":"c;a,b",
k:function(a){var z=this.b
return"XForm:\n"+("Position: "+this.a.k(0)+"\n")+("R: \t"+("Rot(s:"+H.d(z.a)+", c:"+H.d(z.b)+")")+"\n")},
q:{
q:function(){return new G.hQ(new E.a(new Float64Array(H.b(2))),new G.aZ(0,1))},
aF:function(a,b,c){var z,y,x,w,v,u,t
z=a.b
y=z.a
x=b.a
w=x[0]
z=z.b
x=x[1]
v=a.a.a
u=v[1]
t=c.a
t[0]=z*w-y*x+v[0]
t[1]=y*w+z*x+u},
m:function(a,b,c){var z,y,x,w,v,u,t,s
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
dS:function(a,b,c){var z,y,x,w,v
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
dR:function(a,b,c){var z,y,x,w,v,u,t
z=a.b
y=b.b
x=c.b
w=z.b
v=y.a
u=z.a
t=y.b
x.a=w*v-u*t
x.b=w*t+z.a*y.a
y=$.$get$ch()
y.i(b.a)
y.w(a.a)
G.an(z,$.$get$ch(),c.a)}}},hV:{"^":"c;",
ab:function(a,b){var z,y,x,w,v,u,t,s,r
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
s.i(w)
s.w(this.d)
w=t[0]
t=t[1]
r=b.a
r[0]=y*x+u+w
r[1]=v-z*x+-t}}}],["","",,X,{"^":"",eS:{"^":"hV;a,b,c,d"}}],["","",,A,{"^":"",
bC:function(a){var z,y
z=C.a2.fe(a,0,new A.j5())
y=536870911&z+((67108863&z)<<3)
y^=y>>>11
return 536870911&y+((16383&y)<<15)},
j5:{"^":"k:12;",
$2:function(a,b){var z=536870911&a+J.au(b)
z=536870911&z+((524287&z)<<10)
return z^z>>>6}}}],["","",,E,{"^":"",ak:{"^":"c;a",
i:function(a){var z,y
z=a.a
y=this.a
y[3]=z[3]
y[2]=z[2]
y[1]=z[1]
y[0]=z[0]},
k:function(a){return"[0] "+this.aw(0).k(0)+"\n[1] "+this.aw(1).k(0)+"\n"},
h:function(a,b){return this.a[b]},
l:function(a,b,c){this.a[b]=c},
K:function(a,b){var z,y,x
if(b==null)return!1
if(b instanceof E.ak){z=this.a
y=z[0]
x=b.a
z=y===x[0]&&z[1]===x[1]&&z[2]===x[2]&&z[3]===x[3]}else z=!1
return z},
gI:function(a){return A.bC(this.a)},
aw:function(a){var z,y
z=new Float64Array(H.b(2))
y=this.a
z[0]=y[a]
z[1]=y[2+a]
return new E.a(z)},
p:function(a,b){var z,y,x
z=new Float64Array(H.b(4))
y=new E.ak(z)
y.i(this)
x=b.gh8()
z[0]=C.a.p(z[0],x.h(0,0))
z[1]=C.a.p(z[1],x.h(0,1))
z[2]=C.a.p(z[2],x.h(0,2))
z[3]=C.a.p(z[3],x.h(0,3))
return y},
L:function(){var z=this.a
z[0]=0
z[1]=0
z[2]=0
z[3]=0},
fp:function(){var z,y,x,w,v,u,t
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
return u}},aX:{"^":"c;a",
i:function(a){var z,y
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
k:function(a){return"[0] "+this.aw(0).k(0)+"\n[1] "+this.aw(1).k(0)+"\n[2] "+this.aw(2).k(0)+"\n"},
h:function(a,b){return this.a[b]},
l:function(a,b,c){this.a[b]=c},
K:function(a,b){var z,y,x
if(b==null)return!1
if(b instanceof E.aX){z=this.a
y=z[0]
x=b.a
z=y===x[0]&&z[1]===x[1]&&z[2]===x[2]&&z[3]===x[3]&&z[4]===x[4]&&z[5]===x[5]&&z[6]===x[6]&&z[7]===x[7]&&z[8]===x[8]}else z=!1
return z},
gI:function(a){return A.bC(this.a)},
aw:function(a){var z,y
z=new Float64Array(H.b(3))
y=this.a
z[0]=y[a]
z[1]=y[3+a]
z[2]=y[6+a]
return new E.aG(z)},
p:function(a,b){var z,y,x
z=new Float64Array(H.b(9))
y=new E.aX(z)
y.i(this)
x=b.gh9()
z[0]=C.a.p(z[0],x.h(0,0))
z[1]=C.a.p(z[1],x.h(0,1))
z[2]=C.a.p(z[2],x.h(0,2))
z[3]=C.a.p(z[3],x.h(0,3))
z[4]=C.a.p(z[4],x.h(0,4))
z[5]=C.a.p(z[5],x.h(0,5))
z[6]=C.a.p(z[6],x.h(0,6))
z[7]=C.a.p(z[7],x.h(0,7))
z[8]=C.a.p(z[8],x.h(0,8))
return y},
L:function(){var z=this.a
z[0]=0
z[1]=0
z[2]=0
z[3]=0
z[4]=0
z[5]=0
z[6]=0
z[7]=0
z[8]=0}},a:{"^":"c;a",
b2:function(a,b){var z=this.a
z[0]=a
z[1]=b},
L:function(){var z=this.a
z[0]=0
z[1]=0},
i:function(a){var z,y
z=a.a
y=this.a
y[1]=z[1]
y[0]=z[0]},
k:function(a){var z=this.a
return"["+H.d(z[0])+","+H.d(z[1])+"]"},
K:function(a,b){var z,y,x
if(b==null)return!1
if(b instanceof E.a){z=this.a
y=z[0]
x=b.a
z=y===x[0]&&z[1]===x[1]}else z=!1
return z},
gI:function(a){return A.bC(this.a)},
p:function(a,b){var z=new E.a(new Float64Array(H.b(2)))
z.i(this)
z.F(0,b)
return z},
h:function(a,b){return this.a[b]},
l:function(a,b,c){this.a[b]=c},
gt:function(a){return Math.sqrt(this.gaW())},
gaW:function(){var z,y
z=this.a
y=z[0]
z=z[1]
return y*y+z*z},
T:function(){var z,y,x
z=Math.sqrt(this.gaW())
if(z===0)return 0
y=1/z
x=this.a
x[0]=x[0]*y
x[1]=x[1]*y
return z},
bI:function(a){var z,y,x,w
z=this.a
y=a.a
x=z[0]-y[0]
w=z[1]-y[1]
return x*x+w*w},
v:function(a){var z,y
z=a.a
y=this.a
return y[0]*z[0]+y[1]*z[1]},
a7:function(a){var z,y
z=a.a
y=this.a
return y[0]*z[1]-y[1]*z[0]},
aJ:function(a,b){var z,y,x
z=this.a
y=z[1]
z=z[0]
x=b.a
x[0]=-a*y
x[1]=a*z
return b},
F:function(a,b){var z,y
z=b.a
y=this.a
y[0]=y[0]+z[0]
y[1]=y[1]+z[1]},
w:function(a){var z,y
z=a.a
y=this.a
y[0]=y[0]-z[0]
y[1]=y[1]-z[1]},
H:function(a,b){var z=this.a
z[1]=z[1]*b
z[0]=z[0]*b},
R:function(){var z=this.a
z[1]=-z[1]
z[0]=-z[0]},
sm:function(a,b){this.a[0]=b
return b},
sn:function(a,b){this.a[1]=b
return b},
gm:function(a){return this.a[0]},
gn:function(a){return this.a[1]},
q:{
e5:function(){return new E.a(new Float64Array(H.b(2)))}}},aG:{"^":"c;a",
L:function(){var z=this.a
z[2]=0
z[1]=0
z[0]=0},
i:function(a){var z,y
z=a.a
y=this.a
y[0]=z[0]
y[1]=z[1]
y[2]=z[2]},
k:function(a){var z=this.a
return"["+H.d(z[0])+","+H.d(z[1])+","+H.d(z[2])+"]"},
K:function(a,b){var z,y,x
if(b==null)return!1
if(b instanceof E.aG){z=this.a
y=z[0]
x=b.a
z=y===x[0]&&z[1]===x[1]&&z[2]===x[2]}else z=!1
return z},
gI:function(a){return A.bC(this.a)},
p:function(a,b){var z,y,x
z=new Float64Array(H.b(3))
y=new E.aG(z)
y.i(this)
x=b.gha()
z[0]=C.a.p(z[0],x.h(0,0))
z[1]=C.a.p(z[1],x.h(0,1))
z[2]=C.a.p(z[2],x.h(0,2))
return y},
h:function(a,b){return this.a[b]},
l:function(a,b,c){this.a[b]=c},
gt:function(a){var z,y,x
z=this.a
y=z[0]
x=z[1]
z=z[2]
return Math.sqrt(y*y+x*x+z*z)},
gm:function(a){return this.a[0]},
gn:function(a){return this.a[1]}}}],["","",,D,{"^":"",
kQ:[function(){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2,a3,a4,a5,a6,a7,a8,a9,b0,b1,b2,b3,b4,b5,b6,b7,b8,b9,c0,c1,c2,c3,c4,c5,c6,c7
z=[V.b7]
y=H.f([],z)
x=new Float64Array(H.b(2))
x[0]=0
x[1]=-10
w=V.f9(100,10)
v=V.f7(V.fj())
u=V.i2(4,4)
t=new P.bu(0,0)
if($.x==null){H.bp()
$.x=$.am}t.b3(0)
s=new P.bu(0,0)
if($.x==null){H.bp()
$.x=$.am}s.b3(0)
r=G.q()
q=new Float64Array(H.b(2))
p=new Float64Array(H.b(2))
o=P.l
n=[P.j,E.a]
m=P.aQ(null,null,null,o,n)
l=new Float64Array(H.b(2))
k=new Float64Array(H.b(2))
j=new Float64Array(H.b(2))
i=new Float64Array(H.b(2))
h=new Float64Array(H.b(2))
g=V.be()
f=V.be()
e=new Float64Array(H.b(2))
d=new Float64Array(H.b(2))
c=H.f(new Array(10),z)
b=new P.bu(0,0)
if($.x==null){H.bp()
$.x=$.am}b.b3(0)
a=V.be()
a0=V.be()
a1=new Float64Array(H.b(2))
a2=new Float64Array(H.b(2))
a3=V.ax()
a4=V.ax()
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
b9=C.b.U(C.b.al(102))
c0=C.b.U(C.b.al(102))
c1=C.b.U(C.b.al(255))
c2=new Float64Array(H.b(2))
c3=new Float64Array(H.b(2))
c4=new Float64Array(H.b(2))
c5=new Float64Array(H.b(2))
n=P.aQ(null,null,null,o,n)
o=new E.a(new Float64Array(H.b(2)))
o.i(new E.a(x))
c6=new V.hY(0,null,null,null,0,0,o,!1,null,null,null,w,0,!1,!1,!1,!1,null,null,u,new V.dM(0,0,0,0,0,!1),new G.cf(t),new G.cf(s),new G.bP(0,0,0),r,new E.a(q),new E.a(p),new V.e4(m),new V.i0(null,null),new V.i1(new V.dw(new E.a(l),0),new E.a(k),new E.a(j),null,null),new V.cc(new E.a(i),new E.a(h),0),new V.d5(null,null,null,null,null,null,0,0,0,0,0,0,g,new V.dA(null,null,null),new V.bf(null,null,0,null,null),f,new V.bf(null,null,0,null,null),new V.cO(e,d,0)),c,new G.cf(b),new V.d5(null,null,null,null,null,null,0,0,0,0,0,0,a,new V.dA(null,null,null),new V.bf(null,null,0,null,null),a0,new V.bf(null,null,0,null,null),new V.cO(a1,a2,0)),new V.hE(a3,a4,new G.ao(new E.a(a5),new E.a(a6),new E.a(a7),0,0,0),new G.ao(new E.a(a8),new E.a(a9),new E.a(b0),0,0,0),0),new V.hF(C.J,0),new V.dM(0,0,0,0,0,!1),z,new G.ao(new E.a(b1),new E.a(b2),new E.a(b3),0,0,0),new G.ao(new E.a(b4),new E.a(b5),new E.a(b6),0,0,0),0.12,-1,new E.a(b7),new E.a(b8),new G.bP(b9,c0,c1),new E.a(c2),new E.a(c3),new E.a(c4),new E.a(c5),new V.e4(n))
c6.cy=!0
c6.db=!0
c6.dy=!0
c6.x=!0
c6.a=4
c6.b=V.f1(c6,v)
c6.fr=new V.hq(new V.Y(0,0,17976931348623157e292,-17976931348623157e292,0),new V.Y(0,0,17976931348623157e292,-17976931348623157e292,0),new V.Y(0,0,17976931348623157e292,-17976931348623157e292,0),new V.Y(0,0,17976931348623157e292,-17976931348623157e292,0),new V.Y(0,0,17976931348623157e292,-17976931348623157e292,0),new V.Y(0,0,17976931348623157e292,-17976931348623157e292,0),new V.Y(0,0,17976931348623157e292,-17976931348623157e292,0),new V.Y(0,0,17976931348623157e292,-17976931348623157e292,0),new V.Y(0,0,17976931348623157e292,-17976931348623157e292,0),new V.Y(0,0,17976931348623157e292,-17976931348623157e292,0))
c6.fx=V.hk(c6)
c6.er()
v=new P.bu(0,0)
if($.x==null){H.bp()
$.x=$.am}v.b3(0)
c7=new D.eP(y,c6,v,10,null,null,null,null,null,null,null,null)
c7.e_("Ball cage",null,10)
c7.fi(0)
c7.fl()
z=window
C.t.co(z)
C.t.cw(z,W.ek(c7.gca(c7)))},"$0","eo",0,0,2],
eP:{"^":"fa;a,b,c,d,e,f,r,x,y,z,Q,ch",
fi:function(a){var z,y,x,w,v,u,t,s,r,q,p,o,n,m
z=new V.bO(new E.a(new Float64Array(H.b(2))),C.h,0)
z.b=2
y=new V.bV(null,null,0.2,0,0,!1,new V.bj(1,65535,0))
y.a=z
y.c=0.9
y.d=1
x=new V.cJ(C.e,null,new E.a(new Float64Array(H.b(2))),0,new E.a(new Float64Array(H.b(2))),0,0,0,!0,!0,!1,!1,!0,1)
w=-20+20*z.b
for(v=this.b,u=this.a,t=0;t<10;++t){s=-20+z.b*2*t
r=new Float64Array(2)
r[0]=s
r[1]=-20
x.c=new E.a(r)
q=v.aM(x)
u.push(q)
q.aN(y)
r=new Float64Array(2)
r[0]=s
r[1]=w
x.c=new E.a(r)
q=v.aM(x)
u.push(q)
q.aN(y)
r=new Float64Array(2)
r[0]=-20
r[1]=s
x.c=new E.a(r)
q=v.aM(x)
u.push(q)
q.aN(y)
r=new Float64Array(2)
r[0]=w
r[1]=s
x.c=new E.a(r)
q=v.aM(x)
u.push(q)
q.aN(y)}p=new V.bO(new E.a(new Float64Array(H.b(2))),C.h,0)
p.b=1
o=new V.bV(null,null,0.2,0,0,!1,new V.bj(1,65535,0))
o.d=1
o.e=0.05
o.a=p
n=new V.cJ(C.e,null,new E.a(new Float64Array(H.b(2))),0,new E.a(new Float64Array(H.b(2))),0,0,0,!0,!0,!1,!1,!0,1)
r=new Float64Array(H.b(2))
r[0]=0
r[1]=-20
n.e=new E.a(r)
r=new Float64Array(H.b(2))
r[0]=15
r[1]=15
n.c=new E.a(r)
n.a=C.f
n.ch=!0
m=v.aM(n)
u.push(m)
m.aN(o)}}},1],["","",,Q,{"^":"",fa:{"^":"c;",
h6:[function(a,b){var z,y,x,w,v,u,t
z=this.c
y=z.b
z.a=y==null?$.r.$0():y
y=this.b
x=y.id.a
w=x.b
x.a=w==null?$.r.$0():w
w=y.k1.a
v=w.b
w.a=v==null?$.r.$0():v
v=y.a
if((v&1)===1){v=y.b
v.a.bW(v)
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
if(t==null)t=$.r.$0()
u.a4(C.b.ad((t-w.a)*1000,$.x))
u=w.b
w.a=u==null?$.r.$0():u
y.b.eK()
u=y.fr.c
t=w.b
if(t==null)t=$.r.$0()
u.a4(C.b.ad((t-w.a)*1000,$.x))
if(y.dy&&v.a>0){u=w.b
w.a=u==null?$.r.$0():u
y.fx.bq(v)
u=y.fr.d
t=w.b
if(t==null)t=$.r.$0()
u.a4(C.b.ad((t-w.a)*1000,$.x))
u=w.b
w.a=u==null?$.r.$0():u
y.bq(v)
u=y.fr.e
t=w.b
if(t==null)t=$.r.$0()
u.a4(C.b.ad((t-w.a)*1000,$.x))}if(y.db&&v.a>0){u=w.b
w.a=u==null?$.r.$0():u
y.dD(v)
u=y.fr.z
t=w.b
if(t==null)t=$.r.$0()
u.a4(C.b.ad((t-w.a)*1000,$.x))}if(v.a>0)y.cx=v.b
if((y.a&4)===4)y.eJ()
y.a&=4294967293
w=y.fr.a
v=x.b
if(v==null)v=$.r.$0()
w.a4(C.b.ad((v-x.a)*1000,$.x))
x=z.b
if(x==null)x=$.r.$0()
this.Q=C.b.ad((x-z.a)*1e6,$.x)
this.f.clearRect(0,0,900,600)
y.f0()
this.y=this.y+1
y=window
C.t.co(y)
C.t.cw(y,W.ek(this.gca(this)))},"$1","gca",2,0,13],
fl:function(){var z,y,x,w
z=H.z(W.ib("canvas",null),"$iscM")
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
z.i(x)
w=new E.a(new Float64Array(H.b(2)))
w.i(x)
w=new X.eS(null,z,20,w)
w.a=!0
w.c=this.d
this.r=w
w=new N.eR(this.f,2,w)
this.x=w
this.b.Q=w
this.y=0
this.z=y.querySelector("#fps-counter")
this.ch=y.querySelector("#world-step-time")
P.dP(P.cX(0,0,0,0,0,1),new Q.fb(this))
P.dP(P.cX(0,0,0,200,0,0),new Q.fc(this))},
e_:function(a,b,c){J.bG(document.querySelector("#title"),a)}},fb:{"^":"k:5;a",
$1:function(a){var z=this.a
J.bG(z.z,J.a2(z.y))
z.y=0}},fc:{"^":"k:5;a",
$1:function(a){var z,y
z=this.a
y=z.Q
if(y==null)return
J.bG(z.ch,H.d(y/1000)+" ms")}}}],["","",,O,{"^":""}]]
setupProgram(dart,0,0)
J.p=function(a){if(typeof a=="number"){if(Math.floor(a)==a)return J.da.prototype
return J.d9.prototype}if(typeof a=="string")return J.aT.prototype
if(a==null)return J.db.prototype
if(typeof a=="boolean")return J.fK.prototype
if(a.constructor==Array)return J.aR.prototype
if(typeof a!="object"){if(typeof a=="function")return J.aU.prototype
return a}if(a instanceof P.c)return a
return J.bB(a)}
J.A=function(a){if(typeof a=="string")return J.aT.prototype
if(a==null)return a
if(a.constructor==Array)return J.aR.prototype
if(typeof a!="object"){if(typeof a=="function")return J.aU.prototype
return a}if(a instanceof P.c)return a
return J.bB(a)}
J.b5=function(a){if(a==null)return a
if(a.constructor==Array)return J.aR.prototype
if(typeof a!="object"){if(typeof a=="function")return J.aU.prototype
return a}if(a instanceof P.c)return a
return J.bB(a)}
J.cv=function(a){if(typeof a=="number")return J.aS.prototype
if(a==null)return a
if(!(a instanceof P.c))return J.b2.prototype
return a}
J.eq=function(a){if(typeof a=="number")return J.aS.prototype
if(typeof a=="string")return J.aT.prototype
if(a==null)return a
if(!(a instanceof P.c))return J.b2.prototype
return a}
J.j2=function(a){if(typeof a=="string")return J.aT.prototype
if(a==null)return a
if(!(a instanceof P.c))return J.b2.prototype
return a}
J.O=function(a){if(a==null)return a
if(typeof a!="object"){if(typeof a=="function")return J.aU.prototype
return a}if(a instanceof P.c)return a
return J.bB(a)}
J.eC=function(a,b){if(typeof a=="number"&&typeof b=="number")return a+b
return J.eq(a).p(a,b)}
J.a5=function(a,b){if(a==null)return b==null
if(typeof a!="object")return b!=null&&a===b
return J.p(a).K(a,b)}
J.T=function(a,b){if(typeof a=="number"&&typeof b=="number")return a>b
return J.cv(a).a_(a,b)}
J.cB=function(a,b){if(typeof a=="number"&&typeof b=="number")return a<b
return J.cv(a).C(a,b)}
J.cC=function(a,b){if(typeof b==="number")if(a.constructor==Array||typeof a=="string"||H.et(a,a[init.dispatchPropertyName]))if(b>>>0===b&&b<a.length)return a[b]
return J.A(a).h(a,b)}
J.eD=function(a,b,c){if(typeof b==="number")if((a.constructor==Array||H.et(a,a[init.dispatchPropertyName]))&&!a.immutable$list&&b>>>0===b&&b<a.length)return a[b]=c
return J.b5(a).l(a,b,c)}
J.eE=function(a,b){return J.eq(a).aF(a,b)}
J.cD=function(a,b){return J.b5(a).Z(a,b)}
J.eF=function(a){return J.O(a).geG(a)}
J.au=function(a){return J.p(a).gI(a)}
J.aM=function(a){return J.b5(a).gO(a)}
J.ad=function(a){return J.A(a).gt(a)}
J.eG=function(a){return J.O(a).gaI(a)}
J.eH=function(a){return J.O(a).gfz(a)}
J.eI=function(a){return J.O(a).gfM(a)}
J.aN=function(a){return J.O(a).gm(a)}
J.aO=function(a){return J.O(a).gn(a)}
J.eJ=function(a,b){return J.b5(a).cV(a,b)}
J.eK=function(a){return J.b5(a).fF(a)}
J.eL=function(a,b){return J.O(a).ac(a,b)}
J.cE=function(a,b){return J.O(a).sa8(a,b)}
J.bG=function(a,b){return J.O(a).scS(a,b)}
J.cF=function(a,b){return J.O(a).saI(a,b)}
J.bH=function(a,b){return J.O(a).sm(a,b)}
J.bI=function(a,b){return J.O(a).sn(a,b)}
J.cG=function(a){return J.cv(a).U(a)}
J.eM=function(a){return J.j2(a).fQ(a)}
J.a2=function(a){return J.p(a).k(a)}
I.as=function(a){a.immutable$list=Array
a.fixed$length=Array
return a}
var $=I.p
C.C=W.bJ.prototype
C.N=J.h.prototype
C.d=J.aR.prototype
C.j=J.d9.prototype
C.b=J.da.prototype
C.c=J.db.prototype
C.a=J.aS.prototype
C.u=J.aT.prototype
C.U=J.aU.prototype
C.a2=H.h6.prototype
C.I=J.hn.prototype
C.L=W.hG.prototype
C.B=J.b2.prototype
C.t=W.hX.prototype
C.e=new V.bK(0,"BodyType.STATIC")
C.D=new V.bK(1,"BodyType.KINEMATIC")
C.f=new V.bK(2,"BodyType.DYNAMIC")
C.l=new P.it()
C.E=new P.ay(0)
C.o=new V.bS(0,"EPAxisType.UNKNOWN")
C.p=new V.bS(1,"EPAxisType.EDGE_A")
C.F=new V.bS(2,"EPAxisType.EDGE_B")
C.O=function(hooks) {
  if (typeof dartExperimentalFixupGetTag != "function") return hooks;
  hooks.getTag = dartExperimentalFixupGetTag(hooks.getTag);
}
C.P=function(hooks) {
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
C.G=function(hooks) { return hooks; }

C.Q=function(getTagFallback) {
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
C.R=function() {
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
C.S=function(hooks) {
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
C.T=function(hooks) {
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
C.H=function getTagFallback(o) {
  var s = Object.prototype.toString.call(o);
  return s.substring(8, s.length - 1);
}
C.V=new V.aV(11,"JointType.CONSTANT_VOLUME")
C.W=new V.aV(3,"JointType.DISTANCE")
C.X=new V.aV(4,"JointType.PULLEY")
C.Y=new V.aV(5,"JointType.MOUSE")
C.Z=new V.aV(9,"JointType.FRICTION")
C.a_=H.f(I.as(["*::class","*::dir","*::draggable","*::hidden","*::id","*::inert","*::itemprop","*::itemref","*::itemscope","*::lang","*::spellcheck","*::title","*::translate","A::accesskey","A::coords","A::hreflang","A::name","A::shape","A::tabindex","A::target","A::type","AREA::accesskey","AREA::alt","AREA::coords","AREA::nohref","AREA::shape","AREA::tabindex","AREA::target","AUDIO::controls","AUDIO::loop","AUDIO::mediagroup","AUDIO::muted","AUDIO::preload","BDO::dir","BODY::alink","BODY::bgcolor","BODY::link","BODY::text","BODY::vlink","BR::clear","BUTTON::accesskey","BUTTON::disabled","BUTTON::name","BUTTON::tabindex","BUTTON::type","BUTTON::value","CANVAS::height","CANVAS::width","CAPTION::align","COL::align","COL::char","COL::charoff","COL::span","COL::valign","COL::width","COLGROUP::align","COLGROUP::char","COLGROUP::charoff","COLGROUP::span","COLGROUP::valign","COLGROUP::width","COMMAND::checked","COMMAND::command","COMMAND::disabled","COMMAND::label","COMMAND::radiogroup","COMMAND::type","DATA::value","DEL::datetime","DETAILS::open","DIR::compact","DIV::align","DL::compact","FIELDSET::disabled","FONT::color","FONT::face","FONT::size","FORM::accept","FORM::autocomplete","FORM::enctype","FORM::method","FORM::name","FORM::novalidate","FORM::target","FRAME::name","H1::align","H2::align","H3::align","H4::align","H5::align","H6::align","HR::align","HR::noshade","HR::size","HR::width","HTML::version","IFRAME::align","IFRAME::frameborder","IFRAME::height","IFRAME::marginheight","IFRAME::marginwidth","IFRAME::width","IMG::align","IMG::alt","IMG::border","IMG::height","IMG::hspace","IMG::ismap","IMG::name","IMG::usemap","IMG::vspace","IMG::width","INPUT::accept","INPUT::accesskey","INPUT::align","INPUT::alt","INPUT::autocomplete","INPUT::autofocus","INPUT::checked","INPUT::disabled","INPUT::inputmode","INPUT::ismap","INPUT::list","INPUT::max","INPUT::maxlength","INPUT::min","INPUT::multiple","INPUT::name","INPUT::placeholder","INPUT::readonly","INPUT::required","INPUT::size","INPUT::step","INPUT::tabindex","INPUT::type","INPUT::usemap","INPUT::value","INS::datetime","KEYGEN::disabled","KEYGEN::keytype","KEYGEN::name","LABEL::accesskey","LABEL::for","LEGEND::accesskey","LEGEND::align","LI::type","LI::value","LINK::sizes","MAP::name","MENU::compact","MENU::label","MENU::type","METER::high","METER::low","METER::max","METER::min","METER::value","OBJECT::typemustmatch","OL::compact","OL::reversed","OL::start","OL::type","OPTGROUP::disabled","OPTGROUP::label","OPTION::disabled","OPTION::label","OPTION::selected","OPTION::value","OUTPUT::for","OUTPUT::name","P::align","PRE::width","PROGRESS::max","PROGRESS::min","PROGRESS::value","SELECT::autocomplete","SELECT::disabled","SELECT::multiple","SELECT::name","SELECT::required","SELECT::size","SELECT::tabindex","SOURCE::type","TABLE::align","TABLE::bgcolor","TABLE::border","TABLE::cellpadding","TABLE::cellspacing","TABLE::frame","TABLE::rules","TABLE::summary","TABLE::width","TBODY::align","TBODY::char","TBODY::charoff","TBODY::valign","TD::abbr","TD::align","TD::axis","TD::bgcolor","TD::char","TD::charoff","TD::colspan","TD::headers","TD::height","TD::nowrap","TD::rowspan","TD::scope","TD::valign","TD::width","TEXTAREA::accesskey","TEXTAREA::autocomplete","TEXTAREA::cols","TEXTAREA::disabled","TEXTAREA::inputmode","TEXTAREA::name","TEXTAREA::placeholder","TEXTAREA::readonly","TEXTAREA::required","TEXTAREA::rows","TEXTAREA::tabindex","TEXTAREA::wrap","TFOOT::align","TFOOT::char","TFOOT::charoff","TFOOT::valign","TH::abbr","TH::align","TH::axis","TH::bgcolor","TH::char","TH::charoff","TH::colspan","TH::headers","TH::height","TH::nowrap","TH::rowspan","TH::scope","TH::valign","TH::width","THEAD::align","THEAD::char","THEAD::charoff","THEAD::valign","TR::align","TR::bgcolor","TR::char","TR::charoff","TR::valign","TRACK::default","TRACK::kind","TRACK::label","TRACK::srclang","UL::compact","UL::type","VIDEO::controls","VIDEO::height","VIDEO::loop","VIDEO::mediagroup","VIDEO::muted","VIDEO::preload","VIDEO::width"]),[P.w])
C.a0=I.as(["HEAD","AREA","BASE","BASEFONT","BR","COL","COLGROUP","EMBED","FRAME","FRAMESET","HR","IMAGE","IMG","INPUT","ISINDEX","LINK","META","PARAM","SOURCE","STYLE","TITLE","WBR"])
C.a1=I.as([])
C.v=H.f(I.as(["bind","if","ref","repeat","syntax"]),[P.w])
C.w=H.f(I.as(["A::href","AREA::href","BLOCKQUOTE::cite","BODY::background","COMMAND::icon","DEL::cite","FORM::action","IMG::src","INPUT::src","INS::cite","Q::cite","VIDEO::poster"]),[P.w])
C.m=new V.c1(0,"ManifoldType.CIRCLES")
C.i=new V.c1(1,"ManifoldType.FACE_A")
C.q=new V.c1(2,"ManifoldType.FACE_B")
C.x=new V.cd(0,"SeparationFunctionType.POINTS")
C.y=new V.cd(1,"SeparationFunctionType.FACE_A")
C.z=new V.cd(2,"SeparationFunctionType.FACE_B")
C.h=new V.bt(0,"ShapeType.CIRCLE")
C.n=new V.bt(1,"ShapeType.EDGE")
C.k=new V.bt(2,"ShapeType.POLYGON")
C.r=new V.bt(3,"ShapeType.CHAIN")
C.J=new V.b1(0,"TOIOutputState.UNKNOWN")
C.K=new V.b1(1,"TOIOutputState.FAILED")
C.a3=new V.b1(2,"TOIOutputState.OVERLAPPED")
C.A=new V.b1(3,"TOIOutputState.TOUCHING")
C.a4=new V.b1(4,"TOIOutputState.SEPARATED")
C.M=new V.hU(0,"VertexType.ISOLATED")
$.ds="$cachedFunction"
$.dt="$cachedInvocation"
$.am=null
$.r=null
$.U=0
$.aw=null
$.cK=null
$.cx=null
$.el=null
$.ew=null
$.bz=null
$.bD=null
$.cy=null
$.aq=null
$.aI=null
$.aJ=null
$.cq=!1
$.N=C.l
$.d1=0
$.x=null
$.a3=null
$.bT=null
$.d_=null
$.cZ=null
$.cU=0
$.cV=0
$.cW=20
$.dH=0
$.dI=0
$.dJ=0
$.dL=0
$.dK=0
$.jt=1
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
I.$lazy(y,x,w)}})(["cR","$get$cR",function(){return H.er("_$dart_dartClosure")},"bX","$get$bX",function(){return H.er("_$dart_js")},"d6","$get$d6",function(){return H.fE()},"d7","$get$d7",function(){if(typeof WeakMap=="function")var z=new WeakMap()
else{z=$.d1
$.d1=z+1
z="expando$key$"+z}return new P.fp(null,z)},"dT","$get$dT",function(){return H.a_(H.bv({
toString:function(){return"$receiver$"}}))},"dU","$get$dU",function(){return H.a_(H.bv({$method$:null,
toString:function(){return"$receiver$"}}))},"dV","$get$dV",function(){return H.a_(H.bv(null))},"dW","$get$dW",function(){return H.a_(function(){var $argumentsExpr$='$arguments$'
try{null.$method$($argumentsExpr$)}catch(z){return z.message}}())},"e_","$get$e_",function(){return H.a_(H.bv(void 0))},"e0","$get$e0",function(){return H.a_(function(){var $argumentsExpr$='$arguments$'
try{(void 0).$method$($argumentsExpr$)}catch(z){return z.message}}())},"dY","$get$dY",function(){return H.a_(H.dZ(null))},"dX","$get$dX",function(){return H.a_(function(){try{null.$method$}catch(z){return z.message}}())},"e2","$get$e2",function(){return H.a_(H.dZ(void 0))},"e1","$get$e1",function(){return H.a_(function(){try{(void 0).$method$}catch(z){return z.message}}())},"cj","$get$cj",function(){return P.i3()},"aK","$get$aK",function(){return[]},"ed","$get$ed",function(){return P.dd(["A","ABBR","ACRONYM","ADDRESS","AREA","ARTICLE","ASIDE","AUDIO","B","BDI","BDO","BIG","BLOCKQUOTE","BR","BUTTON","CANVAS","CAPTION","CENTER","CITE","CODE","COL","COLGROUP","COMMAND","DATA","DATALIST","DD","DEL","DETAILS","DFN","DIR","DIV","DL","DT","EM","FIELDSET","FIGCAPTION","FIGURE","FONT","FOOTER","FORM","H1","H2","H3","H4","H5","H6","HEADER","HGROUP","HR","I","IFRAME","IMG","INPUT","INS","KBD","LABEL","LEGEND","LI","MAP","MARK","MENU","METER","NAV","NOBR","OL","OPTGROUP","OPTION","OUTPUT","P","PRE","PROGRESS","Q","S","SAMP","SECTION","SELECT","SMALL","SOURCE","SPAN","STRIKE","STRONG","SUB","SUMMARY","SUP","TABLE","TBODY","TD","TEXTAREA","TFOOT","TH","THEAD","TIME","TR","TRACK","TT","U","UL","VAR","VIDEO","WBR"],null)},"cn","$get$cn",function(){return P.dc()},"af","$get$af",function(){return E.e5()},"ch","$get$ch",function(){return E.e5()}])
I=I.$finishIsolateConstructor(I)
$=new I()
init.metadata=[]
init.types=[{func:1},{func:1,args:[,]},{func:1,v:true},{func:1,v:true,args:[{func:1,v:true}]},{func:1,ret:P.w,args:[P.l]},{func:1,args:[P.dN]},{func:1,ret:P.cs,args:[W.ag,P.w,P.w,W.cm]},{func:1,args:[,P.w]},{func:1,args:[P.w]},{func:1,args:[{func:1,v:true}]},{func:1,args:[,,]},{func:1,v:true,args:[W.o,W.o]},{func:1,args:[P.l,P.c]},{func:1,v:true,args:[P.P]},{func:1,ret:P.P},{func:1,ret:P.l,args:[P.u,P.u]},{func:1,ret:E.a},{func:1,ret:P.c},{func:1,ret:V.c7}]
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
if(x==y)H.jr(d||a)
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
Isolate.as=a.as
Isolate.G=a.G
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
if(typeof dartMainRunner==="function")dartMainRunner(function(b){H.ey(D.eo(),b)},[])
else (function(b){H.ey(D.eo(),b)})([])})})()