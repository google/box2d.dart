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
e.$callName=null}}function tearOffGetter(d,e,f,g){return g?new Function("funcs","reflectionInfo","name","H","c","return function tearOff_"+f+y+++"(x) {"+"if (c === null) c = "+"H.cv"+"("+"this, funcs, reflectionInfo, false, [x], name);"+"return new c(this, funcs[0], x, name);"+"}")(d,e,f,H,null):new Function("funcs","reflectionInfo","name","H","c","return function tearOff_"+f+y+++"() {"+"if (c === null) c = "+"H.cv"+"("+"this, funcs, reflectionInfo, false, [], name);"+"return new c(this, funcs[0], null, name);"+"}")(d,e,f,H,null)}function tearOff(d,e,f,a0,a1){var g
return f?function(){if(g===void 0)g=H.cv(this,d,e,true,[],a0).prototype
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
var dart=[["","",,H,{"^":"",k4:{"^":"c;a"}}],["","",,J,{"^":"",
q:function(a){return void 0},
bF:function(a,b,c,d){return{i:a,p:b,e:c,x:d}},
bC:function(a){var z,y,x,w,v
z=a[init.dispatchPropertyName]
if(z==null)if($.cz==null){H.jd()
z=a[init.dispatchPropertyName]}if(z!=null){y=z.p
if(!1===y)return z.i
if(!0===y)return a
x=Object.getPrototypeOf(a)
if(y===x)return z.i
if(z.e===x)throw H.e(new P.e3("Return interceptor for "+H.d(y(a,z))))}w=a.constructor
v=w==null?null:w[$.$get$bY()]
if(v!=null)return v
v=H.jl(a)
if(v!=null)return v
if(typeof a=="function")return C.U
y=Object.getPrototypeOf(a)
if(y==null)return C.I
if(y===Object.prototype)return C.I
if(typeof w=="function"){Object.defineProperty(w,$.$get$bY(),{value:C.B,enumerable:false,writable:true,configurable:true})
return C.B}return C.B},
h:{"^":"c;",
K:function(a,b){return a===b},
gI:function(a){return H.aa(a)},
j:["dP",function(a){return H.br(a)}],
"%":"AnimationEvent|AnimationPlayerEvent|ApplicationCacheErrorEvent|AudioProcessingEvent|AutocompleteErrorEvent|BeforeInstallPromptEvent|BeforeUnloadEvent|Blob|BlobEvent|CanvasGradient|CanvasPattern|CanvasRenderingContext2D|ClipboardEvent|CloseEvent|CompositionEvent|CustomEvent|DOMError|DOMImplementation|DeviceLightEvent|DeviceMotionEvent|DeviceOrientationEvent|DragEvent|ErrorEvent|Event|ExtendableEvent|ExtendableMessageEvent|FetchEvent|File|FileError|FocusEvent|FontFaceSetLoadEvent|GamepadEvent|GeofencingEvent|HashChangeEvent|IDBVersionChangeEvent|InputEvent|InstallEvent|KeyboardEvent|MIDIConnectionEvent|MIDIMessageEvent|MediaEncryptedEvent|MediaError|MediaKeyMessageEvent|MediaQueryListEvent|MediaStreamEvent|MediaStreamTrackEvent|MessageEvent|MouseEvent|NavigatorUserMediaError|NotificationEvent|OfflineAudioCompletionEvent|PageTransitionEvent|PointerEvent|PopStateEvent|PositionError|PresentationConnectionAvailableEvent|PresentationConnectionCloseEvent|ProgressEvent|PromiseRejectionEvent|PushEvent|PushMessageData|RTCDTMFToneChangeEvent|RTCDataChannelEvent|RTCIceCandidateEvent|RTCPeerConnectionIceEvent|Range|RelatedEvent|ResourceProgressEvent|SQLError|SVGAnimatedEnumeration|SVGAnimatedLength|SVGAnimatedLengthList|SVGAnimatedNumber|SVGAnimatedNumberList|SVGAnimatedString|SVGAnimatedTransformList|SVGZoomEvent|SecurityPolicyViolationEvent|ServicePortConnectEvent|ServiceWorkerMessageEvent|SpeechRecognitionError|SpeechRecognitionEvent|SpeechSynthesisEvent|StorageEvent|StorageManager|SyncEvent|TextEvent|TouchEvent|TrackEvent|TransitionEvent|UIEvent|USBConnectionEvent|WebGLContextEvent|WebKitTransitionEvent|WheelEvent"},
fK:{"^":"h;",
j:function(a){return String(a)},
gI:function(a){return a?519018:218159},
$isct:1},
db:{"^":"h;",
K:function(a,b){return null==b},
j:function(a){return"null"},
gI:function(a){return 0}},
bZ:{"^":"h;",
gI:function(a){return 0},
j:["dR",function(a){return String(a)}],
$isfL:1},
hn:{"^":"bZ;"},
b2:{"^":"bZ;"},
aU:{"^":"bZ;",
j:function(a){var z=a[$.$get$cR()]
return z==null?this.dR(a):J.a1(z)},
$S:function(){return{func:1,opt:[,,,,,,,,,,,,,,,,]}}},
aR:{"^":"h;$ti",
bE:function(a,b){if(!!a.immutable$list)throw H.e(new P.H(b))},
eI:function(a,b){if(!!a.fixed$length)throw H.e(new P.H(b))},
cW:function(a,b){return new H.c4(a,b,[H.ac(a,0),null])},
a_:function(a,b){return a[b]},
gfe:function(a){if(a.length>0)return a[0]
throw H.e(H.bX())},
W:function(a,b,c,d,e){var z,y,x,w
this.bE(a,"setRange")
P.cc(b,c,a.length,null,null,null)
z=c-b
if(z===0)return
if(e<0)H.t(P.Z(e,0,null,"skipCount",null))
if(!!J.q(d).$isj){y=e
x=d}else{d.toString
x=H.dD(d,e,null,H.ac(d,0)).bT(0,!1)
y=0}if(y+z>x.length)throw H.e(H.fH())
if(y<b)for(w=z-1;w>=0;--w)a[b+w]=x[y+w]
else for(w=0;w<z;++w)a[b+w]=x[y+w]},
dl:function(a,b,c,d){return this.W(a,b,c,d,0)},
cE:function(a,b){var z,y
z=a.length
for(y=0;y<z;++y){if(b.$1(a[y]))return!0
if(a.length!==z)throw H.e(new P.V(a))}return!1},
P:function(a,b){var z
for(z=0;z<a.length;++z)if(J.a5(a[z],b))return!0
return!1},
j:function(a){return P.bl(a,"[","]")},
gO:function(a){return new J.eO(a,a.length,0,null)},
gI:function(a){return H.aa(a)},
gt:function(a){return a.length},
st:function(a,b){this.eI(a,"set length")
if(b<0)throw H.e(P.Z(b,0,null,"newLength",null))
a.length=b},
h:function(a,b){if(typeof b!=="number"||Math.floor(b)!==b)throw H.e(H.y(a,b))
if(b>=a.length||b<0)throw H.e(H.y(a,b))
return a[b]},
k:function(a,b,c){this.bE(a,"indexed set")
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
if(typeof a!=="number"||Math.floor(a)!==a)throw H.e(P.cJ(a,"length","is not an integer"))
if(a<0||a>4294967295)throw H.e(P.Z(a,0,4294967295,"length",null))
z=H.f(new Array(a),[b])
z.fixed$length=Array
return z}}},
k3:{"^":"aR;$ti"},
eO:{"^":"c;a,b,c,d",
gE:function(){return this.d},
C:function(){var z,y,x
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
if(typeof b!=="number")throw H.e(H.a4(b))
if(a<b)return-1
else if(a>b)return 1
else if(a===b){if(a===0){z=this.gbQ(b)
if(this.gbQ(a)===z)return 0
if(this.gbQ(a))return-1
return 1}return 0}else if(isNaN(a)){if(isNaN(b))return 0
return 1}else return-1},
gbQ:function(a){return a===0?1/a<0:a<0},
U:function(a){var z
if(a>=-2147483648&&a<=2147483647)return a|0
if(isFinite(a)){z=a<0?Math.ceil(a):Math.floor(a)
return z+0}throw H.e(new P.H(""+a+".toInt()"))},
al:function(a){var z,y
if(a>=0){if(a<=2147483647)return a|0}else if(a>=-2147483648){z=a|0
return a===z?z:z-1}y=Math.floor(a)
if(isFinite(y))return y
throw H.e(new P.H(""+a+".floor()"))},
j:function(a){if(a===0&&1/a<0)return"-0.0"
else return""+a},
gI:function(a){return a&0x1FFFFFFF},
p:function(a,b){return a+b},
H:function(a,b){if(typeof b!=="number")throw H.e(H.a4(b))
return a-b},
d6:function(a,b){return a/b},
l:function(a,b){return a*b},
ad:function(a,b){if(typeof b!=="number")throw H.e(H.a4(b))
if((a|0)===a)if(b>=1||!1)return a/b|0
return this.cA(a,b)},
ah:function(a,b){return(a|0)===a?a/b|0:this.cA(a,b)},
cA:function(a,b){var z=a/b
if(z>=-2147483648&&z<=2147483647)return z|0
if(z>0){if(z!==1/0)return Math.floor(z)}else if(z>-1/0)return Math.ceil(z)
throw H.e(new P.H("Result of truncating division is "+H.d(z)+": "+H.d(a)+" ~/ "+b))},
aC:function(a,b){var z
if(a>0)z=b>31?0:a>>>b
else{z=b>31?31:b
z=a>>z>>>0}return z},
bk:function(a,b){return(a|b)>>>0},
N:function(a,b){if(typeof b!=="number")throw H.e(H.a4(b))
return a<b},
b0:function(a,b){if(typeof b!=="number")throw H.e(H.a4(b))
return a>b},
$isP:1},
da:{"^":"aS;",$isl:1,$isP:1},
d9:{"^":"aS;",$isP:1},
aT:{"^":"h;",
ei:function(a,b){if(b>=a.length)throw H.e(H.y(a,b))
return a.charCodeAt(b)},
p:function(a,b){return a+b},
dL:function(a,b,c){var z
if(c>a.length)throw H.e(P.Z(c,0,a.length,null,null))
z=c+b.length
if(z>a.length)return!1
return b===a.substring(c,z)},
dK:function(a,b){return this.dL(a,b,0)},
ca:function(a,b,c){if(c==null)c=a.length
if(b<0)throw H.e(P.bs(b,null,null))
if(b>c)throw H.e(P.bs(b,null,null))
if(c>a.length)throw H.e(P.bs(c,null,null))
return a.substring(b,c)},
dO:function(a,b){return this.ca(a,b,null)},
fS:function(a){return a.toLowerCase()},
aF:function(a,b){var z
if(typeof b!=="string")throw H.e(H.a4(b))
if(a===b)z=0
else z=a<b?-1:1
return z},
j:function(a){return a},
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
bX:function(){return new P.b0("No element")},
fI:function(){return new P.b0("Too many elements")},
fH:function(){return new P.b0("Too few elements")},
b_:function(a,b,c,d){if(c-b<=32)H.hC(a,b,c,d)
else H.hB(a,b,c,d)},
hC:function(a,b,c,d){var z,y,x,w,v
for(z=b+1,y=J.A(a);z<=c;++z){x=y.h(a,z)
w=z
while(!0){if(!(w>b&&J.T(d.$2(y.h(a,w-1),x),0)))break
v=w-1
y.k(a,w,y.h(a,v))
w=v}y.k(a,w,x)}},
hB:function(a,b,c,d){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e
z=C.c.ah(c-b+1,6)
y=b+z
x=c-z
w=C.c.ah(b+c,2)
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
p=n}t.k(a,y,s)
t.k(a,w,q)
t.k(a,x,o)
t.k(a,v,t.h(a,b))
t.k(a,u,t.h(a,c))
m=b+1
l=c-1
if(J.a5(d.$2(r,p),0)){for(k=m;k<=l;++k){j=t.h(a,k)
i=d.$2(j,r)
if(i===0)continue
if(i<0){if(k!==m){t.k(a,k,t.h(a,m))
t.k(a,m,j)}++m}else for(;!0;){i=d.$2(t.h(a,l),r)
if(i>0){--l
continue}else{h=l-1
if(i<0){t.k(a,k,t.h(a,m))
g=m+1
t.k(a,m,t.h(a,l))
t.k(a,l,j)
l=h
m=g
break}else{t.k(a,k,t.h(a,l))
t.k(a,l,j)
l=h
break}}}}f=!0}else{for(k=m;k<=l;++k){j=t.h(a,k)
if(d.$2(j,r)<0){if(k!==m){t.k(a,k,t.h(a,m))
t.k(a,m,j)}++m}else if(d.$2(j,p)>0)for(;!0;)if(d.$2(t.h(a,l),p)>0){--l
if(l<k)break
continue}else{h=l-1
if(d.$2(t.h(a,l),r)<0){t.k(a,k,t.h(a,m))
g=m+1
t.k(a,m,t.h(a,l))
t.k(a,l,j)
m=g}else{t.k(a,k,t.h(a,l))
t.k(a,l,j)}l=h
break}}f=!1}e=m-1
t.k(a,b,t.h(a,e))
t.k(a,e,r)
e=l+1
t.k(a,c,t.h(a,e))
t.k(a,e,p)
H.b_(a,b,m-2,d)
H.b_(a,l+2,c,d)
if(f)return
if(m<y&&l>x){for(;J.a5(d.$2(t.h(a,m),r),0);)++m
for(;J.a5(d.$2(t.h(a,l),p),0);)--l
for(k=m;k<=l;++k){j=t.h(a,k)
if(d.$2(j,r)===0){if(k!==m){t.k(a,k,t.h(a,m))
t.k(a,m,j)}++m}else if(d.$2(j,p)===0)for(;!0;)if(d.$2(t.h(a,l),p)===0){--l
if(l<k)break
continue}else{h=l-1
if(d.$2(t.h(a,l),r)<0){t.k(a,k,t.h(a,m))
g=m+1
t.k(a,m,t.h(a,l))
t.k(a,l,j)
m=g}else{t.k(a,k,t.h(a,l))
t.k(a,l,j)}l=h
break}}H.b_(a,m,l,d)}else H.b_(a,m,l,d)},
i:{"^":"W;$ti",$asi:null},
aW:{"^":"i;$ti",
gO:function(a){return new H.df(this,this.gt(this),0,null)},
bW:function(a,b){return this.dQ(0,b)},
bT:function(a,b){var z,y
z=H.f([],[H.ab(this,"aW",0)])
C.d.st(z,this.gt(this))
for(y=0;y<this.gt(this);++y)z[y]=this.a_(0,y)
return z},
fR:function(a){return this.bT(a,!0)}},
hE:{"^":"aW;a,b,c,$ti",
gep:function(){var z,y
z=J.ad(this.a)
y=this.c
if(y==null||y>z)return z
return y},
geA:function(){var z,y
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
a_:function(a,b){var z=this.geA()+b
if(b<0||z>=this.gep())throw H.e(P.aC(b,this,"index",null,null))
return J.cE(this.a,z)},
bT:function(a,b){var z,y,x,w,v,u,t,s
z=this.b
y=this.a
x=J.A(y)
w=x.gt(y)
v=this.c
if(v!=null&&v<w)w=v
u=w-z
if(u<0)u=0
t=H.f(new Array(u),this.$ti)
for(s=0;s<u;++s){t[s]=x.a_(y,z+s)
if(x.gt(y)<w)throw H.e(new P.V(this))}return t},
e8:function(a,b,c,d){var z,y
z=this.b
if(z<0)H.t(P.Z(z,0,null,"start",null))
y=this.c
if(y!=null){if(y<0)H.t(P.Z(y,0,null,"end",null))
if(z>y)throw H.e(P.Z(z,0,y,"start",null))}},
q:{
dD:function(a,b,c,d){var z=new H.hE(a,b,c,[d])
z.e8(a,b,c,d)
return z}}},
df:{"^":"c;a,b,c,d",
gE:function(){return this.d},
C:function(){var z,y,x,w
z=this.a
y=J.A(z)
x=y.gt(z)
if(this.b!==x)throw H.e(new P.V(z))
w=this.c
if(w>=x){this.d=null
return!1}this.d=y.a_(z,w);++this.c
return!0}},
dh:{"^":"W;a,b,$ti",
gO:function(a){return new H.fU(null,J.aM(this.a),this.b,this.$ti)},
gt:function(a){return J.ad(this.a)},
$asW:function(a,b){return[b]},
q:{
c3:function(a,b,c,d){if(!!a.$isi)return new H.fm(a,b,[c,d])
return new H.dh(a,b,[c,d])}}},
fm:{"^":"dh;a,b,$ti",$isi:1,
$asi:function(a,b){return[b]}},
fU:{"^":"d8;a,b,c,$ti",
C:function(){var z=this.b
if(z.C()){this.a=this.c.$1(z.gE())
return!0}this.a=null
return!1},
gE:function(){return this.a}},
c4:{"^":"aW;a,b,$ti",
gt:function(a){return J.ad(this.a)},
a_:function(a,b){return this.b.$1(J.cE(this.a,b))},
$asi:function(a,b){return[b]},
$asaW:function(a,b){return[b]},
$asW:function(a,b){return[b]}},
e7:{"^":"W;a,b,$ti",
gO:function(a){return new H.hX(J.aM(this.a),this.b,this.$ti)}},
hX:{"^":"d8;a,b,$ti",
C:function(){var z,y
for(z=this.a,y=this.b;z.C();)if(y.$1(z.gE()))return!0
return!1},
gE:function(){return this.a.gE()}},
d2:{"^":"c;$ti"}}],["","",,H,{"^":"",
b4:function(a,b){var z=a.aP(b)
if(!init.globalState.d.cy)init.globalState.f.aX()
return z},
ey:function(a,b){var z,y,x,w,v,u
z={}
z.a=b
if(b==null){b=[]
z.a=b
y=b}else y=b
if(!J.q(y).$isj)throw H.e(P.cI("Arguments to main must be a List: "+H.d(y)))
init.globalState=new H.iq(0,0,1,null,null,null,null,null,null,null,null,null,a)
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
y.f=new H.id(P.c0(null,H.b3),0)
x=P.l
y.z=new H.ai(0,null,null,null,null,null,0,[x,H.cp])
y.ch=new H.ai(0,null,null,null,null,null,0,[x,null])
if(y.x){w=new H.ip()
y.Q=w
self.onmessage=function(c,d){return function(e){c(d,e)}}(H.fA,w)
self.dartPrint=self.dartPrint||function(c){return function(d){if(self.console&&self.console.log)self.console.log(d)
else self.postMessage(c(d))}}(H.ir)}if(init.globalState.x)return
y=init.globalState.a++
w=P.X(null,null,null,x)
v=new H.bt(0,null,!1)
u=new H.cp(y,new H.ai(0,null,null,null,null,null,0,[x,H.bt]),w,init.createNewIsolate(),v,new H.ae(H.bG()),new H.ae(H.bG()),!1,!1,[],P.X(null,null,null,null),null,null,!1,!0,P.X(null,null,null,null))
w.B(0,0)
u.cd(0,v)
init.globalState.e=u
init.globalState.z.k(0,y,u)
init.globalState.d=u
if(H.bB(a,{func:1,args:[P.al]}))u.aP(new H.jq(z,a))
else if(H.bB(a,{func:1,args:[P.al,P.al]}))u.aP(new H.jr(z,a))
else u.aP(a)
init.globalState.f.aX()},
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
z=new H.bx(!0,[]).as(b.data)
y=J.A(z)
switch(y.h(z,"command")){case"start":init.globalState.b=y.h(z,"id")
x=y.h(z,"functionName")
w=x==null?init.globalState.cx:init.globalFunctions[x]()
v=y.h(z,"args")
u=new H.bx(!0,[]).as(y.h(z,"msg"))
t=y.h(z,"isSpawnUri")
s=y.h(z,"startPaused")
r=new H.bx(!0,[]).as(y.h(z,"replyTo"))
y=init.globalState.a++
q=P.l
p=P.X(null,null,null,q)
o=new H.bt(0,null,!1)
n=new H.cp(y,new H.ai(0,null,null,null,null,null,0,[q,H.bt]),p,init.createNewIsolate(),o,new H.ae(H.bG()),new H.ae(H.bG()),!1,!1,[],P.X(null,null,null,null),null,null,!1,!0,P.X(null,null,null,null))
p.B(0,0)
n.cd(0,o)
init.globalState.f.a.ae(new H.b3(n,new H.fB(w,v,u,t,s,r),"worker-start"))
init.globalState.d=n
init.globalState.f.aX()
break
case"spawn-worker":break
case"message":if(y.h(z,"port")!=null)J.eL(y.h(z,"port"),y.h(z,"msg"))
init.globalState.f.aX()
break
case"close":init.globalState.ch.aW(0,$.$get$d7().h(0,a))
a.terminate()
init.globalState.f.aX()
break
case"log":H.fz(y.h(z,"msg"))
break
case"print":if(init.globalState.x){y=init.globalState.Q
q=P.aD(["command","print","msg",z])
q=new H.ap(!0,P.aH(null,P.l)).a0(q)
y.toString
self.postMessage(q)}else P.cB(y.h(z,"msg"))
break
case"error":throw H.e(y.h(z,"msg"))}},
fz:function(a){var z,y,x,w
if(init.globalState.x){y=init.globalState.Q
x=P.aD(["command","log","msg",a])
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
f.ab(0,["spawned",new H.by(y,x),w,z.r])
x=new H.fD(a,b,c,d,z)
if(e){z.cC(w,w)
init.globalState.f.a.ae(new H.b3(z,x,"start isolate"))}else x.$0()},
iH:function(a){return new H.bx(!0,[]).as(new H.ap(!1,P.aH(null,P.l)).a0(a))},
jq:{"^":"k:0;a,b",
$0:function(){this.b.$1(this.a.a)}},
jr:{"^":"k:0;a,b",
$0:function(){this.b.$2(this.a.a,null)}},
iq:{"^":"c;a,b,c,d,e,f,r,x,y,z,Q,ch,cx",q:{
ir:function(a){var z=P.aD(["command","print","msg",a])
return new H.ap(!0,P.aH(null,P.l)).a0(z)}}},
cp:{"^":"c;a,b,c,ft:d<,eS:e<,f,r,x,y,z,Q,ch,cx,cy,db,dx",
cC:function(a,b){if(!this.f.K(0,a))return
if(this.Q.B(0,b)&&!this.y)this.y=!0
this.bB()},
fJ:function(a){var z,y,x,w,v
if(!this.y)return
z=this.Q
z.aW(0,a)
if(z.a===0){for(z=this.z;z.length!==0;){y=z.pop()
x=init.globalState.f.a
w=x.b
v=x.a
w=(w-1&v.length-1)>>>0
x.b=w
v[w]=y
if(w===x.c)x.cr();++x.d}this.y=!1}this.bB()},
eD:function(a,b){var z,y,x
if(this.ch==null)this.ch=[]
for(z=J.q(a),y=0;x=this.ch,y<x.length;y+=2)if(z.K(a,x[y])){this.ch[y+1]=b
return}x.push(a)
this.ch.push(b)},
fI:function(a){var z,y,x
if(this.ch==null)return
for(z=J.q(a),y=0;x=this.ch,y<x.length;y+=2)if(z.K(a,x[y])){z=this.ch
x=y+2
z.toString
if(typeof z!=="object"||z===null||!!z.fixed$length)H.t(new P.H("removeRange"))
P.cc(y,x,z.length,null,null,null)
z.splice(y,x-y)
return}},
dk:function(a,b){if(!this.r.K(0,a))return
this.db=b},
fi:function(a,b,c){var z
if(b!==0)z=b===1&&!this.cy
else z=!0
if(z){a.ab(0,c)
return}z=this.cx
if(z==null){z=P.c0(null,null)
this.cx=z}z.ae(new H.ij(a,c))},
fh:function(a,b){var z
if(!this.r.K(0,a))return
if(b!==0)z=b===1&&!this.cy
else z=!0
if(z){this.bR()
return}z=this.cx
if(z==null){z=P.c0(null,null)
this.cx=z}z.ae(this.gfu())},
fj:function(a,b){var z,y,x
z=this.dx
if(z.a===0){if(this.db&&this===init.globalState.e)return
if(self.console&&self.console.error)self.console.error(a,b)
else{P.cB(a)
if(b!=null)P.cB(b)}return}y=new Array(2)
y.fixed$length=Array
y[0]=J.a1(a)
y[1]=b==null?null:b.j(0)
for(x=new P.ee(z,z.r,null,null),x.c=z.e;x.C();)x.d.ab(0,y)},
aP:function(a){var z,y,x,w,v,u,t
z=init.globalState.d
init.globalState.d=this
$=this.d
y=null
x=this.cy
this.cy=!0
try{y=a.$0()}catch(u){w=H.S(u)
v=H.b6(u)
this.fj(w,v)
if(this.db){this.bR()
if(this===init.globalState.e)throw u}}finally{this.cy=x
init.globalState.d=z
if(z!=null)$=z.gft()
if(this.cx!=null)for(;t=this.cx,!t.gaU(t);)this.cx.d_().$0()}return y},
cV:function(a){return this.b.h(0,a)},
cd:function(a,b){var z=this.b
if(z.aM(a))throw H.e(P.bi("Registry: ports must be registered only once."))
z.k(0,a,b)},
bB:function(){var z=this.b
if(z.gt(z)-this.c.a>0||this.y||!this.x)init.globalState.z.k(0,this.a,this)
else this.bR()},
bR:[function(){var z,y,x
z=this.cx
if(z!=null)z.aE(0)
for(z=this.b,y=z.gd4(z),y=y.gO(y);y.C();)y.gE().eh()
z.aE(0)
this.c.aE(0)
init.globalState.z.aW(0,this.a)
this.dx.aE(0)
if(this.ch!=null){for(x=0;z=this.ch,x<z.length;x+=2)z[x].ab(0,z[x+1])
this.ch=null}},"$0","gfu",0,0,2]},
ij:{"^":"k:2;a,b",
$0:function(){this.a.ab(0,this.b)}},
id:{"^":"c;a,b",
eW:function(){var z=this.a
if(z.b===z.c)return
return z.d_()},
d1:function(){var z,y,x
z=this.eW()
if(z==null){if(init.globalState.e!=null)if(init.globalState.z.aM(init.globalState.e.a))if(init.globalState.r){y=init.globalState.e.b
y=y.gaU(y)}else y=!1
else y=!1
else y=!1
if(y)H.t(P.bi("Program exited with open ReceivePorts."))
y=init.globalState
if(y.x){x=y.z
x=x.gaU(x)&&y.f.b===0}else x=!1
if(x){y=y.Q
x=P.aD(["command","close"])
x=new H.ap(!0,new P.ef(0,null,null,null,null,null,0,[null,P.l])).a0(x)
y.toString
self.postMessage(x)}return!1}z.fC()
return!0},
cw:function(){if(self.window!=null)new H.ie(this).$0()
else for(;this.d1(););},
aX:function(){var z,y,x,w,v
if(!init.globalState.x)this.cw()
else try{this.cw()}catch(x){z=H.S(x)
y=H.b6(x)
w=init.globalState.Q
v=P.aD(["command","error","msg",H.d(z)+"\n"+H.d(y)])
v=new H.ap(!0,P.aH(null,P.l)).a0(v)
w.toString
self.postMessage(v)}}},
ie:{"^":"k:2;a",
$0:function(){if(!this.a.d1())return
P.hQ(C.E,this)}},
b3:{"^":"c;a,b,c",
fC:function(){var z=this.a
if(z.y){z.z.push(this)
return}z.aP(this.b)}},
ip:{"^":"c;"},
fB:{"^":"k:0;a,b,c,d,e,f",
$0:function(){H.fC(this.a,this.b,this.c,this.d,this.e,this.f)}},
fD:{"^":"k:2;a,b,c,d,e",
$0:function(){var z,y
z=this.e
z.x=!0
if(!this.d)this.a.$1(this.c)
else{y=this.a
if(H.bB(y,{func:1,args:[P.al,P.al]}))y.$2(this.b,this.c)
else if(H.bB(y,{func:1,args:[P.al]}))y.$1(this.b)
else y.$0()}z.bB()}},
e9:{"^":"c;"},
by:{"^":"e9;b,a",
ab:function(a,b){var z,y,x
z=init.globalState.z.h(0,this.a)
if(z==null)return
y=this.b
if(y.c)return
x=H.iH(b)
if(z.geS()===y){y=J.A(x)
switch(y.h(x,0)){case"pause":z.cC(y.h(x,1),y.h(x,2))
break
case"resume":z.fJ(y.h(x,1))
break
case"add-ondone":z.eD(y.h(x,1),y.h(x,2))
break
case"remove-ondone":z.fI(y.h(x,1))
break
case"set-errors-fatal":z.dk(y.h(x,1),y.h(x,2))
break
case"ping":z.fi(y.h(x,1),y.h(x,2),y.h(x,3))
break
case"kill":z.fh(y.h(x,1),y.h(x,2))
break
case"getErrors":y=y.h(x,1)
z.dx.B(0,y)
break
case"stopErrors":y=y.h(x,1)
z.dx.aW(0,y)
break}return}init.globalState.f.a.ae(new H.b3(z,new H.is(this,x),"receive"))},
K:function(a,b){var z,y
if(b==null)return!1
if(b instanceof H.by){z=this.b
y=b.b
y=z==null?y==null:z===y
z=y}else z=!1
return z},
gI:function(a){return this.b.a}},
is:{"^":"k:0;a,b",
$0:function(){var z=this.a.b
if(!z.c)z.ef(this.b)}},
cq:{"^":"e9;b,c,a",
ab:function(a,b){var z,y,x
z=P.aD(["command","message","port",this,"msg",b])
y=new H.ap(!0,P.aH(null,P.l)).a0(z)
if(init.globalState.x){init.globalState.Q.toString
self.postMessage(y)}else{x=init.globalState.ch.h(0,this.b)
if(x!=null)x.postMessage(y)}},
K:function(a,b){var z,y
if(b==null)return!1
if(b instanceof H.cq){z=this.b
y=b.b
if(z==null?y==null:z===y){z=this.a
y=b.a
if(z==null?y==null:z===y){z=this.c
y=b.c
y=z==null?y==null:z===y
z=y}else z=!1}else z=!1}else z=!1
return z},
gI:function(a){return(this.b<<16^this.a<<8^this.c)>>>0}},
bt:{"^":"c;a,b,c",
eh:function(){this.c=!0
this.b=null},
ef:function(a){if(this.c)return
this.b.$1(a)},
$ishs:1},
dO:{"^":"c;a,b,c",
ea:function(a,b){var z,y
if(a===0)z=self.setTimeout==null||init.globalState.x
else z=!1
if(z){this.c=1
z=init.globalState.f
y=init.globalState.d
z.a.ae(new H.b3(y,new H.hO(this,b),"timer"))
this.b=!0}else if(self.setTimeout!=null){++init.globalState.f.b
this.c=self.setTimeout(H.aL(new H.hP(this,b),0),a)}else throw H.e(new P.H("Timer greater than 0."))},
eb:function(a,b){if(self.setTimeout!=null){++init.globalState.f.b
this.c=self.setInterval(H.aL(new H.hN(this,b),0),a)}else throw H.e(new P.H("Periodic timer."))},
q:{
hL:function(a,b){var z=new H.dO(!0,!1,null)
z.ea(a,b)
return z},
hM:function(a,b){var z=new H.dO(!1,!1,null)
z.eb(a,b)
return z}}},
hO:{"^":"k:2;a,b",
$0:function(){this.a.c=null
this.b.$0()}},
hP:{"^":"k:2;a,b",
$0:function(){this.a.c=null;--init.globalState.f.b
this.b.$0()}},
hN:{"^":"k:0;a,b",
$0:function(){this.b.$1(this.a)}},
ae:{"^":"c;a",
gI:function(a){var z=this.a
z=C.c.aC(z,0)^C.c.ah(z,4294967296)
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
z.k(0,a,z.gt(z))
z=J.q(a)
if(!!z.$isdi)return["buffer",a]
if(!!z.$isc7)return["typed",a]
if(!!z.$isD)return this.dg(a)
if(!!z.$isfy){x=this.gdd()
w=a.gaH()
w=H.c3(w,x,H.ab(w,"W",0),null)
w=P.c1(w,!0,H.ab(w,"W",0))
z=z.gd4(a)
z=H.c3(z,x,H.ab(z,"W",0),null)
return["map",w,P.c1(z,!0,H.ab(z,"W",0))]}if(!!z.$isfL)return this.dh(a)
if(!!z.$ish)this.d3(a)
if(!!z.$ishs)this.aY(a,"RawReceivePorts can't be transmitted:")
if(!!z.$isby)return this.di(a)
if(!!z.$iscq)return this.dj(a)
if(!!z.$isk){v=a.$static_name
if(v==null)this.aY(a,"Closures can't be transmitted:")
return["function",v]}if(!!z.$isae)return["capability",a.a]
if(!(a instanceof P.c))this.d3(a)
return["dart",init.classIdExtractor(a),this.df(init.classFieldsExtractor(a))]},"$1","gdd",2,0,1],
aY:function(a,b){throw H.e(new P.H((b==null?"Can't transmit:":b)+" "+H.d(a)))},
d3:function(a){return this.aY(a,null)},
dg:function(a){var z=this.de(a)
if(!!a.fixed$length)return["fixed",z]
if(!a.fixed$length)return["extendable",z]
if(!a.immutable$list)return["mutable",z]
if(a.constructor===Array)return["const",z]
this.aY(a,"Can't serialize indexable: ")},
de:function(a){var z,y
z=[]
C.d.st(z,a.length)
for(y=0;y<a.length;++y)z[y]=this.a0(a[y])
return z},
df:function(a){var z
for(z=0;z<a.length;++z)C.d.k(a,z,this.a0(a[z]))
return a},
dh:function(a){var z,y,x
if(!!a.constructor&&a.constructor!==Object)this.aY(a,"Only plain JS Objects are supported:")
z=Object.keys(a)
y=[]
C.d.st(y,z.length)
for(x=0;x<z.length;++x)y[x]=this.a0(a[z[x]])
return["js-object",z,y]},
dj:function(a){if(this.a)return["sendport",a.b,a.a,a.c]
return["raw sendport",a]},
di:function(a){if(this.a)return["sendport",init.globalState.b,a.a,a.b.a]
return["raw sendport",a]}},
bx:{"^":"c;a,b",
as:[function(a){var z,y,x,w,v
if(a==null||typeof a==="string"||typeof a==="number"||typeof a==="boolean")return a
if(typeof a!=="object"||a===null||a.constructor!==Array)throw H.e(P.cI("Bad serialized message: "+H.d(a)))
switch(C.d.gfe(a)){case"ref":return this.b[a[1]]
case"buffer":z=a[1]
this.b.push(z)
return z
case"typed":z=a[1]
this.b.push(z)
return z
case"fixed":z=a[1]
this.b.push(z)
y=H.f(this.aN(z),[null])
y.fixed$length=Array
return y
case"extendable":z=a[1]
this.b.push(z)
return H.f(this.aN(z),[null])
case"mutable":z=a[1]
this.b.push(z)
return this.aN(z)
case"const":z=a[1]
this.b.push(z)
y=H.f(this.aN(z),[null])
y.fixed$length=Array
return y
case"map":return this.eZ(a)
case"sendport":return this.f_(a)
case"raw sendport":z=a[1]
this.b.push(z)
return z
case"js-object":return this.eY(a)
case"function":z=init.globalFunctions[a[1]]()
this.b.push(z)
return z
case"capability":return new H.ae(a[1])
case"dart":x=a[1]
w=a[2]
v=init.instanceFromClassId(x)
this.b.push(v)
this.aN(w)
return init.initializeEmptyInstance(x,v,w)
default:throw H.e("couldn't deserialize: "+H.d(a))}},"$1","geX",2,0,1],
aN:function(a){var z
for(z=0;z<a.length;++z)C.d.k(a,z,this.as(a[z]))
return a},
eZ:function(a){var z,y,x,w,v
z=a[1]
y=a[2]
x=P.dc()
this.b.push(x)
z=J.eJ(z,this.geX()).fR(0)
for(w=J.A(y),v=0;v<z.length;++v)x.k(0,z[v],this.as(w.h(y,v)))
return x},
f_:function(a){var z,y,x,w,v,u,t
z=a[1]
y=a[2]
x=a[3]
w=init.globalState.b
if(z==null?w==null:z===w){v=init.globalState.z.h(0,y)
if(v==null)return
u=v.cV(x)
if(u==null)return
t=new H.by(u,y)}else t=new H.cq(z,x,y)
this.b.push(t)
return t},
eY:function(a){var z,y,x,w,v,u
z=a[1]
y=a[2]
x={}
this.b.push(x)
for(w=J.A(z),v=J.A(y),u=0;u<w.gt(z);++u)x[w.h(z,u)]=this.as(v.h(y,u))
return x}}}],["","",,H,{"^":"",
j5:function(a){return init.types[a]},
et:function(a,b){var z
if(b!=null){z=b.x
if(z!=null)return z}return!!J.q(a).$isK},
d:function(a){var z
if(typeof a==="string")return a
if(typeof a==="number"){if(a!==0)return""+a}else if(!0===a)return"true"
else if(!1===a)return"false"
else if(a==null)return"null"
z=J.a1(a)
if(typeof z!=="string")throw H.e(H.a4(a))
return z},
aa:function(a){var z=a.$identityHash
if(z==null){z=Math.random()*0x3fffffff|0
a.$identityHash=z}return z},
cb:function(a){var z,y,x,w,v,u,t,s
z=J.q(a)
y=z.constructor
if(typeof y=="function"){x=y.name
w=typeof x==="string"?x:null}else w=null
if(w==null||z===C.N||!!J.q(a).$isb2){v=C.H(a)
if(v==="Object"){u=a.constructor
if(typeof u=="function"){t=String(u).match(/^\s*function\s*([\w$]*)\s*\(/)
s=t==null?null:t[1]
if(typeof s==="string"&&/^\w+$/.test(s))w=s}if(w==null)w=v}else w=v}w=w
if(w.length>1&&C.u.ei(w,0)===36)w=C.u.dO(w,1)
return function(b,c){return b.replace(/[^<,> ]+/g,function(d){return c[d]||d})}(w+H.eu(H.cx(a),0,null),init.mangledGlobalNames)},
br:function(a){return"Instance of '"+H.cb(a)+"'"},
kp:[function(){return Date.now()},"$0","iL",0,0,14],
bq:function(){var z,y
if($.am!=null)return
$.am=1000
$.r=H.iL()
if(typeof window=="undefined")return
z=window
if(z==null)return
y=z.performance
if(y==null)return
if(typeof y.now!="function")return
$.am=1e6
$.r=new H.hq(y)},
ca:function(a,b){if(a==null||typeof a==="boolean"||typeof a==="number"||typeof a==="string")throw H.e(H.a4(a))
return a[b]},
du:function(a,b,c){if(a==null||typeof a==="boolean"||typeof a==="number"||typeof a==="string")throw H.e(H.a4(a))
a[b]=c},
y:function(a,b){var z
if(typeof b!=="number"||Math.floor(b)!==b)return new P.a7(!0,b,"index",null)
z=J.ad(a)
if(b<0||b>=z)return P.aC(b,a,"index",null,z)
return P.bs(b,"index",null)},
a4:function(a){return new P.a7(!0,a,null,null)},
iY:function(a){return a},
e:function(a){var z
if(a==null)a=new P.dr()
z=new Error()
z.dartException=a
if("defineProperty" in Object){Object.defineProperty(z,"message",{get:H.eB})
z.name=""}else z.toString=H.eB
return z},
eB:function(){return J.a1(this.dartException)},
t:function(a){throw H.e(a)},
eA:function(a){throw H.e(new P.V(a))},
S:function(a){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l
z=new H.jt(a)
if(a==null)return
if(typeof a!=="object")return a
if("dartException" in a)return z.$1(a.dartException)
else if(!("message" in a))return a
y=a.message
if("number" in a&&typeof a.number=="number"){x=a.number
w=x&65535
if((C.c.aC(x,16)&8191)===10)switch(w){case 438:return z.$1(H.c_(H.d(y)+" (Error "+w+")",null))
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
l=u.a4(y)
if(l!=null)return z.$1(H.c_(y,l))
else{l=t.a4(y)
if(l!=null){l.method="call"
return z.$1(H.c_(y,l))}else{l=s.a4(y)
if(l==null){l=r.a4(y)
if(l==null){l=q.a4(y)
if(l==null){l=p.a4(y)
if(l==null){l=o.a4(y)
if(l==null){l=r.a4(y)
if(l==null){l=n.a4(y)
if(l==null){l=m.a4(y)
v=l!=null}else v=!0}else v=!0}else v=!0}else v=!0}else v=!0}else v=!0}else v=!0
if(v)return z.$1(new H.dq(y,l==null?null:l.method))}}return z.$1(new H.hT(typeof y==="string"?y:""))}if(a instanceof RangeError){if(typeof y==="string"&&y.indexOf("call stack")!==-1)return new P.dB()
y=function(b){try{return String(b)}catch(k){}return null}(a)
return z.$1(new P.a7(!1,null,null,typeof y==="string"?y.replace(/^RangeError:\s*/,""):y))}if(typeof InternalError=="function"&&a instanceof InternalError)if(typeof y==="string"&&y==="too much recursion")return new P.dB()
return a},
b6:function(a){var z
if(a==null)return new H.eg(a,null)
z=a.$cachedTrace
if(z!=null)return z
return a.$cachedTrace=new H.eg(a,null)},
jn:function(a){if(a==null||typeof a!='object')return J.au(a)
else return H.aa(a)},
j2:function(a,b){var z,y,x,w
z=a.length
for(y=0;y<z;y=w){x=y+1
w=x+1
b.k(0,a[y],a[x])}return b},
jf:function(a,b,c,d,e,f,g){switch(c){case 0:return H.b4(b,new H.jg(a))
case 1:return H.b4(b,new H.jh(a,d))
case 2:return H.b4(b,new H.ji(a,d,e))
case 3:return H.b4(b,new H.jj(a,d,e,f))
case 4:return H.b4(b,new H.jk(a,d,e,f,g))}throw H.e(P.bi("Unsupported number of arguments for wrapped closure"))},
aL:function(a,b){var z
if(a==null)return
z=a.$identity
if(!!z)return z
z=function(c,d,e,f){return function(g,h,i,j){return f(c,e,d,g,h,i,j)}}(a,b,init.globalState.d,H.jf)
a.$identity=z
return z},
eX:function(a,b,c,d,e,f){var z,y,x,w,v,u,t,s,r,q,p,o,n,m
z=b[0]
y=z.$callName
if(!!J.q(c).$isj){z.$reflectionInfo=c
x=H.hu(z).r}else x=c
w=d?Object.create(new H.hD().constructor.prototype):Object.create(new H.bN(null,null,null,null).constructor.prototype)
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
t=!1}if(typeof x=="number")r=function(g,h){return function(){return g(h)}}(H.j5,x)
else if(typeof x=="function")if(d)r=x
else{q=t?H.cL:H.bO
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
eU:function(a,b,c,d){var z=H.bO
switch(b?-1:a){case 0:return function(e,f){return function(){return f(this)[e]()}}(c,z)
case 1:return function(e,f){return function(g){return f(this)[e](g)}}(c,z)
case 2:return function(e,f){return function(g,h){return f(this)[e](g,h)}}(c,z)
case 3:return function(e,f){return function(g,h,i){return f(this)[e](g,h,i)}}(c,z)
case 4:return function(e,f){return function(g,h,i,j){return f(this)[e](g,h,i,j)}}(c,z)
case 5:return function(e,f){return function(g,h,i,j,k){return f(this)[e](g,h,i,j,k)}}(c,z)
default:return function(e,f){return function(){return e.apply(f(this),arguments)}}(d,z)}},
cN:function(a,b,c){var z,y,x,w,v,u,t
if(c)return H.eW(a,b)
z=b.$stubName
y=b.length
x=a[z]
w=b==null?x==null:b===x
v=!w||y>=27
if(v)return H.eU(y,!w,z,b)
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
eV:function(a,b,c,d){var z,y
z=H.bO
y=H.cL
switch(b?-1:a){case 0:throw H.e(new H.hv("Intercepted function with no arguments."))
case 1:return function(e,f,g){return function(){return f(this)[e](g(this))}}(c,z,y)
case 2:return function(e,f,g){return function(h){return f(this)[e](g(this),h)}}(c,z,y)
case 3:return function(e,f,g){return function(h,i){return f(this)[e](g(this),h,i)}}(c,z,y)
case 4:return function(e,f,g){return function(h,i,j){return f(this)[e](g(this),h,i,j)}}(c,z,y)
case 5:return function(e,f,g){return function(h,i,j,k){return f(this)[e](g(this),h,i,j,k)}}(c,z,y)
case 6:return function(e,f,g){return function(h,i,j,k,l){return f(this)[e](g(this),h,i,j,k,l)}}(c,z,y)
default:return function(e,f,g,h){return function(){h=[g(this)]
Array.prototype.push.apply(h,arguments)
return e.apply(f(this),h)}}(d,z,y)}},
eW:function(a,b){var z,y,x,w,v,u,t,s
z=H.eP()
y=$.cK
if(y==null){y=H.b8("receiver")
$.cK=y}x=b.$stubName
w=b.length
v=a[x]
u=b==null?v==null:b===v
t=!u||w>=28
if(t)return H.eV(w,!u,x,b)
if(w===1){y="return function(){return this."+H.d(z)+"."+H.d(x)+"(this."+H.d(y)+");"
u=$.U
$.U=u+1
return new Function(y+H.d(u)+"}")()}s="abcdefghijklmnopqrstuvwxyz".split("").splice(0,w-1).join(",")
y="return function("+s+"){return this."+H.d(z)+"."+H.d(x)+"(this."+H.d(y)+", "+s+");"
u=$.U
$.U=u+1
return new Function(y+H.d(u)+"}")()},
cv:function(a,b,c,d,e,f){var z
b.fixed$length=Array
if(!!J.q(c).$isj){c.fixed$length=Array
z=c}else z=c
return H.eX(a,b,z,!!d,e,f)},
jp:function(a,b){var z=J.A(b)
throw H.e(H.eT(H.cb(a),z.ca(b,3,z.gt(b))))},
z:function(a,b){var z
if(a!=null)z=(typeof a==="object"||typeof a==="function")&&J.q(a)[b]
else z=!0
if(z)return a
H.jp(a,b)},
j0:function(a){var z=J.q(a)
return"$S" in z?z.$S():null},
bB:function(a,b){var z
if(a==null)return!1
z=H.j0(a)
return z==null?!1:H.es(z,b)},
js:function(a){throw H.e(new P.f3(a))},
bG:function(){return(Math.random()*0x100000000>>>0)+(Math.random()*0x100000000>>>0)*4294967296},
er:function(a){return init.getIsolateTag(a)},
f:function(a,b){a.$ti=b
return a},
cx:function(a){if(a==null)return
return a.$ti},
j4:function(a,b){return H.ez(a["$as"+H.d(b)],H.cx(a))},
ab:function(a,b,c){var z=H.j4(a,b)
return z==null?null:z[c]},
ac:function(a,b){var z=H.cx(a)
return z==null?null:z[b]},
at:function(a,b){var z
if(a==null)return"dynamic"
if(typeof a==="object"&&a!==null&&a.constructor===Array)return a[0].builtin$cls+H.eu(a,1,b)
if(typeof a=="function")return a.builtin$cls
if(typeof a==="number"&&Math.floor(a)===a)return H.d(a)
if(typeof a.func!="undefined"){z=a.typedef
if(z!=null)return H.at(z,b)
return H.iJ(a,b)}return"unknown-reified-type"},
iJ:function(a,b){var z,y,x,w,v,u,t,s,r,q,p
z=!!a.v?"void":H.at(a.ret,b)
if("args" in a){y=a.args
for(x=y.length,w="",v="",u=0;u<x;++u,v=", "){t=y[u]
w=w+v+H.at(t,b)}}else{w=""
v=""}if("opt" in a){s=a.opt
w+=v+"["
for(x=s.length,v="",u=0;u<x;++u,v=", "){t=s[u]
w=w+v+H.at(t,b)}w+="]"}if("named" in a){r=a.named
w+=v+"{"
for(x=H.j1(r),q=x.length,v="",u=0;u<q;++u,v=", "){p=x[u]
w=w+v+H.at(r[p],b)+(" "+H.d(p))}w+="}"}return"("+w+") => "+z},
eu:function(a,b,c){var z,y,x,w,v,u
if(a==null)return""
z=new P.cf("")
for(y=b,x=!0,w=!0,v="";y<a.length;++y){if(x)x=!1
else z.a=v+", "
u=a[y]
if(u!=null)w=!1
v=z.a+=H.at(u,c)}return w?"":"<"+z.j(0)+">"},
ez:function(a,b){if(a==null)return b
a=a.apply(null,b)
if(a==null)return
if(typeof a==="object"&&a!==null&&a.constructor===Array)return a
if(typeof a=="function")return a.apply(null,b)
return b},
iT:function(a,b){var z,y
if(a==null||b==null)return!0
z=a.length
for(y=0;y<z;++y)if(!H.I(a[y],b[y]))return!1
return!0},
I:function(a,b){var z,y,x,w,v,u
if(a===b)return!0
if(a==null||b==null)return!0
if(a.builtin$cls==="al")return!0
if('func' in b)return H.es(a,b)
if('func' in a)return b.builtin$cls==="jZ"||b.builtin$cls==="c"
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
return H.iT(H.ez(u,z),x)},
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
iS:function(a,b){var z,y,x,w,v,u
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
if(!(H.I(o,n)||H.I(n,o)))return!1}}return H.iS(a.named,b.named)},
kS:function(a){var z=$.cy
return"Instance of "+(z==null?"<Unknown>":z.$1(a))},
kQ:function(a){return H.aa(a)},
kP:function(a,b,c){Object.defineProperty(a,b,{value:c,enumerable:false,writable:true,configurable:true})},
jl:function(a){var z,y,x,w,v,u
z=$.cy.$1(a)
y=$.bA[z]
if(y!=null){Object.defineProperty(a,init.dispatchPropertyName,{value:y,enumerable:false,writable:true,configurable:true})
return y.i}x=$.bE[z]
if(x!=null)return x
w=init.interceptorsByTag[z]
if(w==null){z=$.el.$2(a,z)
if(z!=null){y=$.bA[z]
if(y!=null){Object.defineProperty(a,init.dispatchPropertyName,{value:y,enumerable:false,writable:true,configurable:true})
return y.i}x=$.bE[z]
if(x!=null)return x
w=init.interceptorsByTag[z]}}if(w==null)return
x=w.prototype
v=z[0]
if(v==="!"){y=H.cA(x)
$.bA[z]=y
Object.defineProperty(a,init.dispatchPropertyName,{value:y,enumerable:false,writable:true,configurable:true})
return y.i}if(v==="~"){$.bE[z]=x
return x}if(v==="-"){u=H.cA(x)
Object.defineProperty(Object.getPrototypeOf(a),init.dispatchPropertyName,{value:u,enumerable:false,writable:true,configurable:true})
return u.i}if(v==="+")return H.ev(a,x)
if(v==="*")throw H.e(new P.e3(z))
if(init.leafTags[z]===true){u=H.cA(x)
Object.defineProperty(Object.getPrototypeOf(a),init.dispatchPropertyName,{value:u,enumerable:false,writable:true,configurable:true})
return u.i}else return H.ev(a,x)},
ev:function(a,b){var z=Object.getPrototypeOf(a)
Object.defineProperty(z,init.dispatchPropertyName,{value:J.bF(b,z,null,null),enumerable:false,writable:true,configurable:true})
return b},
cA:function(a){return J.bF(a,!1,null,!!a.$isK)},
jm:function(a,b,c){var z=b.prototype
if(init.leafTags[a]===true)return J.bF(z,!1,null,!!z.$isK)
else return J.bF(z,c,null,null)},
jd:function(){if(!0===$.cz)return
$.cz=!0
H.je()},
je:function(){var z,y,x,w,v,u,t,s
$.bA=Object.create(null)
$.bE=Object.create(null)
H.j9()
z=init.interceptorsByTag
y=Object.getOwnPropertyNames(z)
if(typeof window!="undefined"){window
x=function(){}
for(w=0;w<y.length;++w){v=y[w]
u=$.ew.$1(v)
if(u!=null){t=H.jm(v,z[v],u)
if(t!=null){Object.defineProperty(u,init.dispatchPropertyName,{value:t,enumerable:false,writable:true,configurable:true})
x.prototype=u}}}}for(w=0;w<y.length;++w){v=y[w]
if(/^[A-Za-z_]/.test(v)){s=z[v]
z["!"+v]=s
z["~"+v]=s
z["-"+v]=s
z["+"+v]=s
z["*"+v]=s}}},
j9:function(){var z,y,x,w,v,u,t
z=C.R()
z=H.ar(C.O,H.ar(C.T,H.ar(C.G,H.ar(C.G,H.ar(C.S,H.ar(C.P,H.ar(C.Q(C.H),z)))))))
if(typeof dartNativeDispatchHooksTransformer!="undefined"){y=dartNativeDispatchHooksTransformer
if(typeof y=="function")y=[y]
if(y.constructor==Array)for(x=0;x<y.length;++x){w=y[x]
if(typeof w=="function")z=w(z)||z}}v=z.getTag
u=z.getUnknownTag
t=z.prototypeForTag
$.cy=new H.ja(v)
$.el=new H.jb(u)
$.ew=new H.jc(t)},
ar:function(a,b){return a(b)||b},
ht:{"^":"c;a,b,c,d,e,f,r,x",q:{
hu:function(a){var z,y,x
z=a.$reflectionInfo
if(z==null)return
z.fixed$length=Array
z=z
y=z[0]
x=z[1]
return new H.ht(a,z,(y&1)===1,y>>1,x>>1,(x&1)===1,z[2],null)}}},
hq:{"^":"k:0;a",
$0:function(){return C.a.al(1000*this.a.now())}},
hS:{"^":"c;a,b,c,d,e,f",
a4:function(a){var z,y,x
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
return new H.hS(a.replace(new RegExp('\\\\\\$arguments\\\\\\$','g'),'((?:x|[^x])*)').replace(new RegExp('\\\\\\$argumentsExpr\\\\\\$','g'),'((?:x|[^x])*)').replace(new RegExp('\\\\\\$expr\\\\\\$','g'),'((?:x|[^x])*)').replace(new RegExp('\\\\\\$method\\\\\\$','g'),'((?:x|[^x])*)').replace(new RegExp('\\\\\\$receiver\\\\\\$','g'),'((?:x|[^x])*)'),y,x,w,v,u)},
bw:function(a){return function($expr$){var $argumentsExpr$='$arguments$'
try{$expr$.$method$($argumentsExpr$)}catch(z){return z.message}}(a)},
dZ:function(a){return function($expr$){try{$expr$.$method$}catch(z){return z.message}}(a)}}},
dq:{"^":"C;a,b",
j:function(a){var z=this.b
if(z==null)return"NullError: "+H.d(this.a)
return"NullError: method not found: '"+z+"' on null"}},
fO:{"^":"C;a,b,c",
j:function(a){var z,y
z=this.b
if(z==null)return"NoSuchMethodError: "+H.d(this.a)
y=this.c
if(y==null)return"NoSuchMethodError: method not found: '"+z+"' ("+H.d(this.a)+")"
return"NoSuchMethodError: method not found: '"+z+"' on '"+y+"' ("+H.d(this.a)+")"},
q:{
c_:function(a,b){var z,y
z=b==null
y=z?null:b.method
return new H.fO(a,y,z?null:b.receiver)}}},
hT:{"^":"C;a",
j:function(a){var z=this.a
return z.length===0?"Error":"Error: "+z}},
jt:{"^":"k:1;a",
$1:function(a){if(!!J.q(a).$isC)if(a.$thrownJsError==null)a.$thrownJsError=this.a
return a}},
eg:{"^":"c;a,b",
j:function(a){var z,y
z=this.b
if(z!=null)return z
z=this.a
y=z!==null&&typeof z==="object"?z.stack:null
z=y==null?"":y
this.b=z
return z}},
jg:{"^":"k:0;a",
$0:function(){return this.a.$0()}},
jh:{"^":"k:0;a,b",
$0:function(){return this.a.$1(this.b)}},
ji:{"^":"k:0;a,b,c",
$0:function(){return this.a.$2(this.b,this.c)}},
jj:{"^":"k:0;a,b,c,d",
$0:function(){return this.a.$3(this.b,this.c,this.d)}},
jk:{"^":"k:0;a,b,c,d,e",
$0:function(){return this.a.$4(this.b,this.c,this.d,this.e)}},
k:{"^":"c;",
j:function(a){return"Closure '"+H.cb(this).trim()+"'"},
gd5:function(){return this},
gd5:function(){return this}},
dE:{"^":"k;"},
hD:{"^":"dE;",
j:function(a){var z=this.$static_name
if(z==null)return"Closure of unknown static method"
return"Closure '"+z+"'"}},
bN:{"^":"dE;a,b,c,d",
K:function(a,b){if(b==null)return!1
if(this===b)return!0
if(!(b instanceof H.bN))return!1
return this.a===b.a&&this.b===b.b&&this.c===b.c},
gI:function(a){var z,y
z=this.c
if(z==null)y=H.aa(this.a)
else y=typeof z!=="object"?J.au(z):H.aa(z)
return(y^H.aa(this.b))>>>0},
j:function(a){var z=this.c
if(z==null)z=this.a
return"Closure '"+H.d(this.d)+"' of "+H.br(z)},
q:{
bO:function(a){return a.a},
cL:function(a){return a.c},
eP:function(){var z=$.aw
if(z==null){z=H.b8("self")
$.aw=z}return z},
b8:function(a){var z,y,x,w,v
z=new H.bN("self","target","receiver","name")
y=Object.getOwnPropertyNames(z)
y.fixed$length=Array
x=y
for(y=x.length,w=0;w<y;++w){v=x[w]
if(z[v]===a)return v}}}},
eS:{"^":"C;a",
j:function(a){return this.a},
q:{
eT:function(a,b){return new H.eS("CastError: Casting value of type '"+a+"' to incompatible type '"+b+"'")}}},
hv:{"^":"C;a",
j:function(a){return"RuntimeError: "+H.d(this.a)}},
ai:{"^":"c;a,b,c,d,e,f,r,$ti",
gt:function(a){return this.a},
gaU:function(a){return this.a===0},
gaH:function(){return new H.fQ(this,[H.ac(this,0)])},
gd4:function(a){return H.c3(this.gaH(),new H.fN(this),H.ac(this,0),H.ac(this,1))},
aM:function(a){var z
if((a&0x3ffffff)===a){z=this.c
if(z==null)return!1
return this.em(z,a)}else return this.fo(a)},
fo:function(a){var z=this.d
if(z==null)return!1
return this.aT(this.b5(z,this.aS(a)),a)>=0},
h:function(a,b){var z,y,x
if(typeof b==="string"){z=this.b
if(z==null)return
y=this.aL(z,b)
return y==null?null:y.b}else if(typeof b==="number"&&(b&0x3ffffff)===b){x=this.c
if(x==null)return
y=this.aL(x,b)
return y==null?null:y.b}else return this.fp(b)},
fp:function(a){var z,y,x
z=this.d
if(z==null)return
y=this.b5(z,this.aS(a))
x=this.aT(y,a)
if(x<0)return
return y[x].b},
k:function(a,b,c){var z,y,x,w,v,u
if(typeof b==="string"){z=this.b
if(z==null){z=this.bv()
this.b=z}this.cc(z,b,c)}else if(typeof b==="number"&&(b&0x3ffffff)===b){y=this.c
if(y==null){y=this.bv()
this.c=y}this.cc(y,b,c)}else{x=this.d
if(x==null){x=this.bv()
this.d=x}w=this.aS(b)
v=this.b5(x,w)
if(v==null)this.by(x,w,[this.bw(b,c)])
else{u=this.aT(v,b)
if(u>=0)v[u].b=c
else v.push(this.bw(b,c))}}},
aW:function(a,b){if(typeof b==="string")return this.cu(this.b,b)
else if(typeof b==="number"&&(b&0x3ffffff)===b)return this.cu(this.c,b)
else return this.fq(b)},
fq:function(a){var z,y,x,w
z=this.d
if(z==null)return
y=this.b5(z,this.aS(a))
x=this.aT(y,a)
if(x<0)return
w=y.splice(x,1)[0]
this.cB(w)
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
cc:function(a,b,c){var z=this.aL(a,b)
if(z==null)this.by(a,b,this.bw(b,c))
else z.b=c},
cu:function(a,b){var z
if(a==null)return
z=this.aL(a,b)
if(z==null)return
this.cB(z)
this.cl(a,b)
return z.b},
bw:function(a,b){var z,y
z=new H.fP(a,b,null,null)
if(this.e==null){this.f=z
this.e=z}else{y=this.f
z.d=y
y.c=z
this.f=z}++this.a
this.r=this.r+1&67108863
return z},
cB:function(a){var z,y
z=a.d
y=a.c
if(z==null)this.e=y
else z.c=y
if(y==null)this.f=z
else y.d=z;--this.a
this.r=this.r+1&67108863},
aS:function(a){return J.au(a)&0x3ffffff},
aT:function(a,b){var z,y
if(a==null)return-1
z=a.length
for(y=0;y<z;++y)if(J.a5(a[y].a,b))return y
return-1},
j:function(a){return P.fV(this)},
aL:function(a,b){return a[b]},
b5:function(a,b){return a[b]},
by:function(a,b,c){a[b]=c},
cl:function(a,b){delete a[b]},
em:function(a,b){return this.aL(a,b)!=null},
bv:function(){var z=Object.create(null)
this.by(z,"<non-identifier-key>",z)
this.cl(z,"<non-identifier-key>")
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
gE:function(){return this.d},
C:function(){var z=this.a
if(this.b!==z.r)throw H.e(new P.V(z))
else{z=this.c
if(z==null){this.d=null
return!1}else{this.d=z.a
this.c=z.c
return!0}}}},
ja:{"^":"k:1;a",
$1:function(a){return this.a(a)}},
jb:{"^":"k:7;a",
$2:function(a,b){return this.a(a,b)}},
jc:{"^":"k:8;a",
$1:function(a){return this.a(a)}}}],["","",,H,{"^":"",
j1:function(a){var z=H.f(a?Object.keys(a):[],[null])
z.fixed$length=Array
return z}}],["","",,H,{"^":"",
jo:function(a){if(typeof dartPrint=="function"){dartPrint(a)
return}if(typeof console=="object"&&typeof console.log!="undefined"){console.log(a)
return}if(typeof window=="object")return
if(typeof print=="function"){print(a)
return}throw"Unable to print message: "+String(a)}}],["","",,H,{"^":"",
b:function(a){return a},
di:{"^":"h;",$isdi:1,"%":"ArrayBuffer"},
c7:{"^":"h;",$isc7:1,"%":"DataView;ArrayBufferView;c5|dk|dm|c6|dj|dl|a9"},
c5:{"^":"c7;",
gt:function(a){return a.length},
$isD:1,
$asD:I.G,
$isK:1,
$asK:I.G},
c6:{"^":"dm;",
h:function(a,b){if(b>>>0!==b||b>=a.length)H.t(H.y(a,b))
return a[b]},
k:function(a,b,c){if(b>>>0!==b||b>=a.length)H.t(H.y(a,b))
a[b]=c}},
a9:{"^":"dl;",
k:function(a,b,c){if(b>>>0!==b||b>=a.length)H.t(H.y(a,b))
a[b]=c},
$isi:1,
$asi:function(){return[P.l]},
$isj:1,
$asj:function(){return[P.l]}},
k9:{"^":"c6;",$isi:1,
$asi:function(){return[P.a0]},
$isj:1,
$asj:function(){return[P.a0]},
"%":"Float32Array"},
h6:{"^":"c6;",$isi:1,
$asi:function(){return[P.a0]},
$isj:1,
$asj:function(){return[P.a0]},
"%":"Float64Array"},
ka:{"^":"a9;",
h:function(a,b){if(b>>>0!==b||b>=a.length)H.t(H.y(a,b))
return a[b]},
$isi:1,
$asi:function(){return[P.l]},
$isj:1,
$asj:function(){return[P.l]},
"%":"Int16Array"},
kb:{"^":"a9;",
h:function(a,b){if(b>>>0!==b||b>=a.length)H.t(H.y(a,b))
return a[b]},
$isi:1,
$asi:function(){return[P.l]},
$isj:1,
$asj:function(){return[P.l]},
"%":"Int32Array"},
kc:{"^":"a9;",
h:function(a,b){if(b>>>0!==b||b>=a.length)H.t(H.y(a,b))
return a[b]},
$isi:1,
$asi:function(){return[P.l]},
$isj:1,
$asj:function(){return[P.l]},
"%":"Int8Array"},
kd:{"^":"a9;",
h:function(a,b){if(b>>>0!==b||b>=a.length)H.t(H.y(a,b))
return a[b]},
$isi:1,
$asi:function(){return[P.l]},
$isj:1,
$asj:function(){return[P.l]},
"%":"Uint16Array"},
ke:{"^":"a9;",
h:function(a,b){if(b>>>0!==b||b>=a.length)H.t(H.y(a,b))
return a[b]},
$isi:1,
$asi:function(){return[P.l]},
$isj:1,
$asj:function(){return[P.l]},
"%":"Uint32Array"},
kf:{"^":"a9;",
gt:function(a){return a.length},
h:function(a,b){if(b>>>0!==b||b>=a.length)H.t(H.y(a,b))
return a[b]},
$isi:1,
$asi:function(){return[P.l]},
$isj:1,
$asj:function(){return[P.l]},
"%":"CanvasPixelArray|Uint8ClampedArray"},
kg:{"^":"a9;",
gt:function(a){return a.length},
h:function(a,b){if(b>>>0!==b||b>=a.length)H.t(H.y(a,b))
return a[b]},
$isi:1,
$asi:function(){return[P.l]},
$isj:1,
$asj:function(){return[P.l]},
"%":";Uint8Array"},
dj:{"^":"c5+aE;",$asD:I.G,$isi:1,
$asi:function(){return[P.l]},
$asK:I.G,
$isj:1,
$asj:function(){return[P.l]}},
dk:{"^":"c5+aE;",$asD:I.G,$isi:1,
$asi:function(){return[P.a0]},
$asK:I.G,
$isj:1,
$asj:function(){return[P.a0]}},
dl:{"^":"dj+d2;",$asD:I.G,
$asi:function(){return[P.l]},
$asK:I.G,
$asj:function(){return[P.l]}},
dm:{"^":"dk+d2;",$asD:I.G,
$asi:function(){return[P.a0]},
$asK:I.G,
$asj:function(){return[P.a0]}}}],["","",,P,{"^":"",
i4:function(){var z,y,x
z={}
if(self.scheduleImmediate!=null)return P.iU()
if(self.MutationObserver!=null&&self.document!=null){y=self.document.createElement("div")
x=self.document.createElement("span")
z.a=null
new self.MutationObserver(H.aL(new P.i6(z),1)).observe(y,{childList:true})
return new P.i5(z,y,x)}else if(self.setImmediate!=null)return P.iV()
return P.iW()},
kC:[function(a){++init.globalState.f.b
self.scheduleImmediate(H.aL(new P.i7(a),0))},"$1","iU",2,0,3],
kD:[function(a){++init.globalState.f.b
self.setImmediate(H.aL(new P.i8(a),0))},"$1","iV",2,0,3],
kE:[function(a){P.ch(C.E,a)},"$1","iW",2,0,3],
iM:function(){var z,y
for(;z=$.aq,z!=null;){$.aJ=null
y=z.b
$.aq=y
if(y==null)$.aI=null
z.a.$0()}},
kO:[function(){$.cr=!0
try{P.iM()}finally{$.aJ=null
$.cr=!1
if($.aq!=null)$.$get$ck().$1(P.en())}},"$0","en",0,0,2],
iQ:function(a){var z=new P.e8(a,null)
if($.aq==null){$.aI=z
$.aq=z
if(!$.cr)$.$get$ck().$1(P.en())}else{$.aI.b=z
$.aI=z}},
iR:function(a){var z,y,x
z=$.aq
if(z==null){P.iQ(a)
$.aJ=$.aI
return}y=new P.e8(a,null)
x=$.aJ
if(x==null){y.b=z
$.aJ=y
$.aq=y}else{y.b=x.b
x.b=y
$.aJ=y
if(y.b==null)$.aI=y}},
hQ:function(a,b){var z=$.N
if(z===C.l){z.toString
return P.ch(a,b)}return P.ch(a,z.eH(b))},
dP:function(a,b){var z,y
z=$.N
if(z===C.l){z.toString
return P.dQ(a,b)}y=z.cF(b)
$.N.toString
return P.dQ(a,y)},
ch:function(a,b){var z=C.c.ah(a.a,1000)
return H.hL(z<0?0:z,b)},
dQ:function(a,b){var z=C.c.ah(a.a,1000)
return H.hM(z<0?0:z,b)},
ej:function(a,b,c,d,e){var z={}
z.a=d
P.iR(new P.iN(z,e))},
iO:function(a,b,c,d){var z,y
y=$.N
if(y===c)return d.$0()
$.N=c
z=y
try{y=d.$0()
return y}finally{$.N=z}},
iP:function(a,b,c,d,e){var z,y
y=$.N
if(y===c)return d.$1(e)
$.N=c
z=y
try{y=d.$1(e)
return y}finally{$.N=z}},
i6:{"^":"k:1;a",
$1:function(a){var z,y;--init.globalState.f.b
z=this.a
y=z.a
z.a=null
y.$0()}},
i5:{"^":"k:9;a,b,c",
$1:function(a){var z,y;++init.globalState.f.b
this.a.a=a
z=this.b
y=this.c
z.firstChild?z.removeChild(y):z.appendChild(y)}},
i7:{"^":"k:0;a",
$0:function(){--init.globalState.f.b
this.a.$0()}},
i8:{"^":"k:0;a",
$0:function(){--init.globalState.f.b
this.a.$0()}},
e8:{"^":"c;a,b"},
dN:{"^":"c;"},
iG:{"^":"c;"},
iN:{"^":"k:0;a,b",
$0:function(){var z,y,x
z=this.a
y=z.a
if(y==null){x=new P.dr()
z.a=x
z=x}else z=y
y=this.b
if(y==null)throw H.e(z)
x=H.e(z)
x.stack=y.j(0)
throw x}},
iu:{"^":"iG;",
gaI:function(a){return},
fL:function(a){var z,y,x
try{if(C.l===$.N){a.$0()
return}P.iO(null,null,this,a)}catch(x){z=H.S(x)
y=H.b6(x)
P.ej(null,null,this,z,y)}},
fM:function(a,b){var z,y,x
try{if(C.l===$.N){a.$1(b)
return}P.iP(null,null,this,a,b)}catch(x){z=H.S(x)
y=H.b6(x)
P.ej(null,null,this,z,y)}},
eH:function(a){return new P.iv(this,a)},
cF:function(a){return new P.iw(this,a)},
h:function(a,b){return}},
iv:{"^":"k:0;a,b",
$0:function(){return this.a.fL(this.b)}},
iw:{"^":"k:1;a,b",
$1:function(a){return this.a.fM(this.b,a)}}}],["","",,P,{"^":"",
dc:function(){return new H.ai(0,null,null,null,null,null,0,[null,null])},
aD:function(a){return H.j2(a,new H.ai(0,null,null,null,null,null,0,[null,null]))},
aQ:function(a,b,c,d,e){return new P.ih(0,null,null,null,null,[d,e])},
fG:function(a,b,c){var z,y
if(P.cs(a)){if(b==="("&&c===")")return"(...)"
return b+"..."+c}z=[]
y=$.$get$aK()
y.push(a)
try{P.iK(a,z)}finally{y.pop()}y=P.dC(b,z,", ")+c
return y.charCodeAt(0)==0?y:y},
bl:function(a,b,c){var z,y,x
if(P.cs(a))return b+"..."+c
z=new P.cf(b)
y=$.$get$aK()
y.push(a)
try{x=z
x.a=P.dC(x.gaB(),a,", ")}finally{y.pop()}y=z
y.a=y.gaB()+c
y=z.gaB()
return y.charCodeAt(0)==0?y:y},
cs:function(a){var z,y
for(z=0;y=$.$get$aK(),z<y.length;++z)if(a===y[z])return!0
return!1},
iK:function(a,b){var z,y,x,w,v,u,t,s,r,q
z=a.gO(a)
y=0
x=0
while(!0){if(!(y<80||x<3))break
if(!z.C())return
w=H.d(z.gE())
b.push(w)
y+=w.length+2;++x}if(!z.C()){if(x<=5)return
v=b.pop()
u=b.pop()}else{t=z.gE();++x
if(!z.C()){if(x<=4){b.push(H.d(t))
return}v=H.d(t)
u=b.pop()
y+=v.length+2}else{s=z.gE();++x
for(;z.C();t=s,s=r){r=z.gE();++x
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
X:function(a,b,c,d){return new P.ik(0,null,null,null,null,null,0,[d])},
dd:function(a,b){var z,y,x
z=P.X(null,null,null,b)
for(y=a.length,x=0;x<a.length;a.length===y||(0,H.eA)(a),++x)z.B(0,a[x])
return z},
fV:function(a){var z,y,x
z={}
if(P.cs(a))return"{...}"
y=new P.cf("")
try{$.$get$aK().push(a)
x=y
x.a=x.gaB()+"{"
z.a=!0
a.cO(0,new P.fW(z,y))
z=y
z.a=z.gaB()+"}"}finally{$.$get$aK().pop()}z=y.gaB()
return z.charCodeAt(0)==0?z:z},
ih:{"^":"c;a,b,c,d,e,$ti",
gt:function(a){return this.a},
aM:function(a){var z
if((a&0x3ffffff)===a){z=this.c
return z==null?!1:z[a]!=null}else return this.el(a)},
el:function(a){var z=this.d
if(z==null)return!1
return this.ag(z[this.af(a)],a)>=0},
h:function(a,b){var z,y,x,w
if(typeof b==="string"&&b!=="__proto__"){z=this.b
if(z==null)y=null
else{x=z[b]
y=x===z?null:x}return y}else if(typeof b==="number"&&(b&0x3ffffff)===b){w=this.c
if(w==null)y=null
else{x=w[b]
y=x===w?null:x}return y}else return this.eq(b)},
eq:function(a){var z,y,x
z=this.d
if(z==null)return
y=z[this.af(a)]
x=this.ag(y,a)
return x<0?null:y[x+1]},
k:function(a,b,c){var z,y
if(typeof b==="string"&&b!=="__proto__"){z=this.b
if(z==null){z=P.cl()
this.b=z}this.ci(z,b,c)}else if(typeof b==="number"&&(b&0x3ffffff)===b){y=this.c
if(y==null){y=P.cl()
this.c=y}this.ci(y,b,c)}else this.ez(b,c)},
ez:function(a,b){var z,y,x,w
z=this.d
if(z==null){z=P.cl()
this.d=z}y=this.af(a)
x=z[y]
if(x==null){P.cm(z,y,[a,b]);++this.a
this.e=null}else{w=this.ag(x,a)
if(w>=0)x[w+1]=b
else{x.push(a,b);++this.a
this.e=null}}},
cO:function(a,b){var z,y,x,w
z=this.ej()
for(y=z.length,x=0;x<y;++x){w=z[x]
b.$2(w,this.h(0,w))
if(z!==this.e)throw H.e(new P.V(this))}},
ej:function(){var z,y,x,w,v,u,t,s,r,q,p,o
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
ci:function(a,b,c){if(a[b]==null){++this.a
this.e=null}P.cm(a,b,c)},
af:function(a){return J.au(a)&0x3ffffff},
ag:function(a,b){var z,y
if(a==null)return-1
z=a.length
for(y=0;y<z;y+=2)if(J.a5(a[y],b))return y
return-1},
q:{
cm:function(a,b,c){if(c==null)a[b]=a
else a[b]=c},
cl:function(){var z=Object.create(null)
P.cm(z,"<non-identifier-key>",z)
delete z["<non-identifier-key>"]
return z}}},
ef:{"^":"ai;a,b,c,d,e,f,r,$ti",
aS:function(a){return H.jn(a)&0x3ffffff},
aT:function(a,b){var z,y,x
if(a==null)return-1
z=a.length
for(y=0;y<z;++y){x=a[y].a
if(x==null?b==null:x===b)return y}return-1},
q:{
aH:function(a,b){return new P.ef(0,null,null,null,null,null,0,[a,b])}}},
ik:{"^":"ii;a,b,c,d,e,f,r,$ti",
gO:function(a){var z=new P.ee(this,this.r,null,null)
z.c=this.e
return z},
gt:function(a){return this.a},
P:function(a,b){var z,y
if(typeof b==="string"&&b!=="__proto__"){z=this.b
if(z==null)return!1
return z[b]!=null}else if(typeof b==="number"&&(b&0x3ffffff)===b){y=this.c
if(y==null)return!1
return y[b]!=null}else return this.ek(b)},
ek:function(a){var z=this.d
if(z==null)return!1
return this.ag(z[this.af(a)],a)>=0},
cV:function(a){var z=typeof a==="number"&&(a&0x3ffffff)===a
if(z)return this.P(0,a)?a:null
else return this.eu(a)},
eu:function(a){var z,y,x
z=this.d
if(z==null)return
y=z[this.af(a)]
x=this.ag(y,a)
if(x<0)return
return J.cD(y,x).geo()},
B:function(a,b){var z,y,x
if(typeof b==="string"&&b!=="__proto__"){z=this.b
if(z==null){y=Object.create(null)
y["<non-identifier-key>"]=y
delete y["<non-identifier-key>"]
this.b=y
z=y}return this.cg(z,b)}else if(typeof b==="number"&&(b&0x3ffffff)===b){x=this.c
if(x==null){y=Object.create(null)
y["<non-identifier-key>"]=y
delete y["<non-identifier-key>"]
this.c=y
x=y}return this.cg(x,b)}else return this.ae(b)},
ae:function(a){var z,y,x
z=this.d
if(z==null){z=P.im()
this.d=z}y=this.af(a)
x=z[y]
if(x==null)z[y]=[this.br(a)]
else{if(this.ag(x,a)>=0)return!1
x.push(this.br(a))}return!0},
aW:function(a,b){if(typeof b==="string"&&b!=="__proto__")return this.cj(this.b,b)
else if(typeof b==="number"&&(b&0x3ffffff)===b)return this.cj(this.c,b)
else return this.ev(b)},
ev:function(a){var z,y,x
z=this.d
if(z==null)return!1
y=z[this.af(a)]
x=this.ag(y,a)
if(x<0)return!1
this.ck(y.splice(x,1)[0])
return!0},
aE:function(a){if(this.a>0){this.f=null
this.e=null
this.d=null
this.c=null
this.b=null
this.a=0
this.r=this.r+1&67108863}},
cg:function(a,b){if(a[b]!=null)return!1
a[b]=this.br(b)
return!0},
cj:function(a,b){var z
if(a==null)return!1
z=a[b]
if(z==null)return!1
this.ck(z)
delete a[b]
return!0},
br:function(a){var z,y
z=new P.il(a,null,null)
if(this.e==null){this.f=z
this.e=z}else{y=this.f
z.c=y
y.b=z
this.f=z}++this.a
this.r=this.r+1&67108863
return z},
ck:function(a){var z,y
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
im:function(){var z=Object.create(null)
z["<non-identifier-key>"]=z
delete z["<non-identifier-key>"]
return z}}},
il:{"^":"c;eo:a<,b,c"},
ee:{"^":"c;a,b,c,d",
gE:function(){return this.d},
C:function(){var z=this.a
if(this.b!==z.r)throw H.e(new P.V(z))
else{z=this.c
if(z==null){this.d=null
return!1}else{this.d=z.a
this.c=z.b
return!0}}}},
ii:{"^":"hx;$ti"},
de:{"^":"ha;$ti"},
aE:{"^":"c;$ti",
gO:function(a){return new H.df(a,this.gt(a),0,null)},
a_:function(a,b){return this.h(a,b)},
cW:function(a,b){return new H.c4(a,b,[H.ab(a,"aE",0),null])},
fg:function(a,b,c){var z,y,x
z=this.gt(a)
for(y=b,x=0;x<z;++x){y=c.$2(y,this.h(a,x))
if(z!==this.gt(a))throw H.e(new P.V(a))}return y},
j:function(a){return P.bl(a,"[","]")},
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
gO:function(a){return new P.io(this,this.c,this.d,this.b,null)},
gaU:function(a){return this.b===this.c},
gt:function(a){return(this.c-this.b&this.a.length-1)>>>0},
a_:function(a,b){var z,y
z=(this.c-this.b&this.a.length-1)>>>0
if(0>b||b>=z)H.t(P.aC(b,this,"index",null,z))
y=this.a
return y[(this.b+b&y.length-1)>>>0]},
aE:function(a){var z,y,x,w
z=this.b
y=this.c
if(z!==y){for(x=this.a,w=x.length-1;z!==y;z=(z+1&w)>>>0)x[z]=null
this.c=0
this.b=0;++this.d}},
j:function(a){return P.bl(this,"{","}")},
d_:function(){var z,y,x
z=this.b
if(z===this.c)throw H.e(H.bX());++this.d
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
if(this.b===z)this.cr();++this.d},
cr:function(){var z,y,x,w
z=new Array(this.a.length*2)
z.fixed$length=Array
y=H.f(z,this.$ti)
z=this.a
x=this.b
w=z.length-x
C.d.W(y,0,w,z,x)
C.d.W(y,w,w+this.b,this.a,0)
this.b=0
this.c=this.a.length
this.a=y},
e3:function(a,b){var z=new Array(8)
z.fixed$length=Array
this.a=H.f(z,[b])},
$asi:null,
q:{
c0:function(a,b){var z=new P.fS(null,0,0,0,[b])
z.e3(a,b)
return z}}},
io:{"^":"c;a,b,c,d,e",
gE:function(){return this.e},
C:function(){var z,y
z=this.a
if(this.c!==z.d)H.t(new P.V(z))
y=this.d
if(y===this.b){this.e=null
return!1}z=z.a
this.e=z[y]
this.d=(y+1&z.length-1)>>>0
return!0}},
hy:{"^":"c;$ti",
ai:function(a,b){var z
for(z=J.aM(b);z.C();)this.B(0,z.gE())},
j:function(a){return P.bl(this,"{","}")},
$isi:1,
$asi:null},
hx:{"^":"hy;$ti"},
ha:{"^":"c+aE;",$isi:1,$asi:null,$isj:1,$asj:null}}],["","",,P,{"^":"",
jA:[function(a,b){return J.eE(a,b)},"$2","j_",4,0,15],
d0:function(a){if(typeof a==="number"||typeof a==="boolean"||null==a)return J.a1(a)
if(typeof a==="string")return JSON.stringify(a)
return P.fo(a)},
fo:function(a){var z=J.q(a)
if(!!z.$isk)return z.j(a)
return H.br(a)},
bi:function(a){return new P.ig(a)},
aj:function(a,b,c,d){var z,y,x
z=J.fJ(a,d)
if(a!==0&&!0)for(y=z.length,x=0;x<y;++x)z[x]=b
return z},
c1:function(a,b,c){var z,y
z=H.f([],[c])
for(y=J.aM(a);y.C();)z.push(y.gE())
return z},
cB:function(a){H.jo(H.d(a))},
ct:{"^":"c;"},
"+bool":0,
u:{"^":"c;"},
a0:{"^":"P;",$isu:1,
$asu:function(){return[P.P]}},
"+double":0,
az:{"^":"c;a",
p:function(a,b){return new P.az(C.c.p(this.a,b.gcm()))},
N:function(a,b){return C.c.N(this.a,b.gcm())},
b0:function(a,b){return C.c.b0(this.a,b.gcm())},
K:function(a,b){if(b==null)return!1
if(!(b instanceof P.az))return!1
return this.a===b.a},
gI:function(a){return this.a&0x1FFFFFFF},
aF:function(a,b){return C.c.aF(this.a,b.a)},
j:function(a){var z,y,x,w,v
z=new P.fh()
y=this.a
if(y<0)return"-"+new P.az(0-y).j(0)
x=z.$1(C.c.ah(y,6e7)%60)
w=z.$1(C.c.ah(y,1e6)%60)
v=new P.fg().$1(y%1e6)
return""+C.c.ah(y,36e8)+":"+H.d(x)+":"+H.d(w)+"."+H.d(v)},
$isu:1,
$asu:function(){return[P.az]},
q:{
cX:function(a,b,c,d,e,f){return new P.az(864e8*a+36e8*b+6e7*e+1e6*f+1000*d+c)}}},
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
j:function(a){return"Throw of null."}},
a7:{"^":"C;a,b,c,d",
gbu:function(){return"Invalid argument"+(!this.a?"(s)":"")},
gbt:function(){return""},
j:function(a){var z,y,x,w,v,u
z=this.c
y=z!=null?" ("+z+")":""
z=this.d
x=z==null?"":": "+z
w=this.gbu()+y+x
if(!this.a)return w
v=this.gbt()
u=P.d0(this.b)
return w+v+": "+H.d(u)},
q:{
cI:function(a){return new P.a7(!1,null,null,a)},
cJ:function(a,b,c){return new P.a7(!0,a,b,c)}}},
dv:{"^":"a7;e,f,a,b,c,d",
gbu:function(){return"RangeError"},
gbt:function(){var z,y,x
z=this.e
if(z==null){z=this.f
y=z!=null?": Not less than or equal to "+H.d(z):""}else{x=this.f
if(x==null)y=": Not greater than or equal to "+H.d(z)
else if(x>z)y=": Not in range "+H.d(z)+".."+H.d(x)+", inclusive"
else y=x<z?": Valid value range is empty":": Only valid value is "+H.d(z)}return y},
q:{
bs:function(a,b,c){return new P.dv(null,null,!0,a,b,"Value not in range")},
Z:function(a,b,c,d,e){return new P.dv(b,c,!0,a,d,"Invalid value")},
cc:function(a,b,c,d,e,f){if(0>a||a>c)throw H.e(P.Z(a,0,c,"start",f))
if(a>b||b>c)throw H.e(P.Z(b,a,c,"end",f))
return b}}},
ft:{"^":"a7;e,t:f>,a,b,c,d",
gbu:function(){return"RangeError"},
gbt:function(){if(J.cC(this.b,0))return": index must not be negative"
var z=this.f
if(z===0)return": no indices are valid"
return": index should be less than "+H.d(z)},
q:{
aC:function(a,b,c,d,e){var z=e!=null?e:J.ad(b)
return new P.ft(b,z,!0,a,c,"Index out of range")}}},
H:{"^":"C;a",
j:function(a){return"Unsupported operation: "+this.a}},
e3:{"^":"C;a",
j:function(a){var z=this.a
return z!=null?"UnimplementedError: "+z:"UnimplementedError"}},
b0:{"^":"C;a",
j:function(a){return"Bad state: "+this.a}},
V:{"^":"C;a",
j:function(a){var z=this.a
if(z==null)return"Concurrent modification during iteration."
return"Concurrent modification during iteration: "+H.d(P.d0(z))+"."}},
dB:{"^":"c;",
j:function(a){return"Stack Overflow"},
$isC:1},
f3:{"^":"C;a",
j:function(a){var z=this.a
return z==null?"Reading static variable during its initialization":"Reading static variable '"+z+"' during its initialization"}},
ig:{"^":"c;a",
j:function(a){var z=this.a
if(z==null)return"Exception"
return"Exception: "+H.d(z)}},
fp:{"^":"c;a,b",
j:function(a){return"Expando:"+H.d(this.a)},
h:function(a,b){var z,y
z=this.b
if(typeof z!=="string"){if(b==null||typeof b==="boolean"||typeof b==="number"||typeof b==="string")H.t(P.cJ(b,"Expandos are not allowed on strings, numbers, booleans or null",null))
return z.get(b)}y=H.ca(b,"expando$values")
return y==null?null:H.ca(y,z)},
k:function(a,b,c){var z,y
z=this.b
if(typeof z!=="string")z.set(b,c)
else{y=H.ca(b,"expando$values")
if(y==null){y=new P.c()
H.du(b,"expando$values",y)}H.du(y,z,c)}}},
l:{"^":"P;",$isu:1,
$asu:function(){return[P.P]}},
"+int":0,
W:{"^":"c;$ti",
bW:["dQ",function(a,b){return new H.e7(this,b,[H.ab(this,"W",0)])}],
gt:function(a){var z,y
z=this.gO(this)
for(y=0;z.C();)++y
return y},
gay:function(a){var z,y
z=this.gO(this)
if(!z.C())throw H.e(H.bX())
y=z.gE()
if(z.C())throw H.e(H.fI())
return y},
a_:function(a,b){var z,y,x
if(b<0)H.t(P.Z(b,0,null,"index",null))
for(z=this.gO(this),y=0;z.C();){x=z.gE()
if(b===y)return x;++y}throw H.e(P.aC(b,this,"index",null,y))},
j:function(a){return P.fG(this,"(",")")}},
d8:{"^":"c;"},
j:{"^":"c;$ti",$isi:1,$asi:null,$asj:null},
"+List":0,
al:{"^":"c;",
gI:function(a){return P.c.prototype.gI.call(this,this)},
j:function(a){return"null"}},
"+Null":0,
P:{"^":"c;",$isu:1,
$asu:function(){return[P.P]}},
"+num":0,
c:{"^":";",
K:function(a,b){return this===b},
gI:function(a){return H.aa(this)},
j:function(a){return H.br(this)},
toString:function(){return this.j(this)}},
bv:{"^":"c;a,b",
b1:function(a){if(this.b!=null){this.a=this.a+($.r.$0()-this.b)
this.b=null}}},
w:{"^":"c;",$isu:1,
$asu:function(){return[P.w]}},
"+String":0,
cf:{"^":"c;aB:a<",
gt:function(a){return this.a.length},
j:function(a){var z=this.a
return z.charCodeAt(0)==0?z:z},
q:{
dC:function(a,b,c){var z=J.aM(b)
if(!z.C())return a
if(c.length===0){do a+=H.d(z.gE())
while(z.C())}else{a+=H.d(z.gE())
for(;z.C();)a=a+c+H.d(z.gE())}return a}}}}],["","",,W,{"^":"",
fn:function(a,b,c){var z,y
z=document.body
y=(z&&C.C).a1(z,a,b,c)
y.toString
z=new H.e7(new W.R(y),new W.iZ(),[W.o])
return z.gay(z)},
aB:function(a){var z,y,x
z="element tag unavailable"
try{y=J.eI(a)
if(typeof y==="string")z=a.tagName}catch(x){H.S(x)}return z},
ic:function(a,b){return document.createElement(a)},
iI:function(a){if(a==null)return
return W.ea(a)},
ek:function(a){var z=$.N
if(z===C.l)return a
return z.cF(a)},
v:{"^":"ag;","%":"HTMLBRElement|HTMLBaseElement|HTMLButtonElement|HTMLContentElement|HTMLDListElement|HTMLDataListElement|HTMLDetailsElement|HTMLDialogElement|HTMLDirectoryElement|HTMLDivElement|HTMLFieldSetElement|HTMLFontElement|HTMLFrameElement|HTMLHRElement|HTMLHeadElement|HTMLHeadingElement|HTMLHtmlElement|HTMLKeygenElement|HTMLLIElement|HTMLLabelElement|HTMLLegendElement|HTMLLinkElement|HTMLMapElement|HTMLMarqueeElement|HTMLMenuElement|HTMLMenuItemElement|HTMLMetaElement|HTMLMeterElement|HTMLModElement|HTMLOListElement|HTMLOptGroupElement|HTMLOptionElement|HTMLOutputElement|HTMLParagraphElement|HTMLParamElement|HTMLPictureElement|HTMLPreElement|HTMLProgressElement|HTMLQuoteElement|HTMLScriptElement|HTMLShadowElement|HTMLSlotElement|HTMLSourceElement|HTMLSpanElement|HTMLStyleElement|HTMLTableCaptionElement|HTMLTableCellElement|HTMLTableColElement|HTMLTableDataCellElement|HTMLTableHeaderCellElement|HTMLTextAreaElement|HTMLTitleElement|HTMLTrackElement|HTMLUListElement|HTMLUnknownElement;HTMLElement"},
jw:{"^":"v;",
j:function(a){return String(a)},
$ish:1,
"%":"HTMLAnchorElement"},
jy:{"^":"v;",
j:function(a){return String(a)},
$ish:1,
"%":"HTMLAreaElement"},
bL:{"^":"v;",$ish:1,$isbL:1,"%":"HTMLBodyElement"},
cM:{"^":"v;a7:height}",$iscM:1,"%":"HTMLCanvasElement"},
jz:{"^":"o;t:length=",$ish:1,"%":"CDATASection|CharacterData|Comment|ProcessingInstruction|Text"},
jB:{"^":"o;",$ish:1,"%":"DocumentFragment|ShadowRoot"},
jC:{"^":"h;",
j:function(a){return String(a)},
"%":"DOMException"},
ag:{"^":"o;fO:tagName=",
geG:function(a){return new W.ib(a)},
j:function(a){return a.localName},
a1:["bq",function(a,b,c,d){var z,y,x,w,v
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
c=z}}if($.a2==null){z=document
y=z.implementation.createHTMLDocument("")
$.a2=y
$.bU=y.createRange()
y=$.a2
y.toString
x=y.createElement("base")
x.href=z.baseURI
$.a2.head.appendChild(x)}z=$.a2
if(z.body==null){z.toString
y=z.createElement("body")
z.body=y}z=$.a2
if(!!this.$isbL)w=z.body
else{y=a.tagName
z.toString
w=z.createElement(y)
$.a2.body.appendChild(w)}if("createContextualFragment" in window.Range.prototype&&!C.d.P(C.a0,a.tagName)){$.bU.selectNodeContents(w)
v=$.bU.createContextualFragment(b)}else{w.innerHTML=b
v=$.a2.createDocumentFragment()
for(;z=w.firstChild,z!=null;)v.appendChild(z)}z=$.a2.body
if(w==null?z!=null:w!==z)J.eK(w)
c.c4(v)
document.adoptNode(v)
return v},function(a,b,c){return this.a1(a,b,c,null)},"eU",null,null,"ghe",2,5,null],
scS:function(a,b){this.bn(a,b)},
bo:function(a,b,c,d){a.textContent=null
a.appendChild(this.a1(a,b,c,d))},
bn:function(a,b){return this.bo(a,b,null,null)},
$ish:1,
$isc:1,
$isag:1,
$iso:1,
"%":";Element"},
iZ:{"^":"k:1;",
$1:function(a){return!!J.q(a).$isag}},
jD:{"^":"v;a7:height}","%":"HTMLEmbedElement"},
bV:{"^":"h;","%":"MediaStream;EventTarget"},
jY:{"^":"v;t:length=","%":"HTMLFormElement"},
k_:{"^":"v;a7:height}","%":"HTMLIFrameElement"},
k0:{"^":"v;a7:height}","%":"HTMLImageElement"},
k2:{"^":"v;a7:height}",$ish:1,$isag:1,"%":"HTMLInputElement"},
k5:{"^":"h;",
j:function(a){return String(a)},
"%":"Location"},
fY:{"^":"v;","%":"HTMLAudioElement;HTMLMediaElement"},
k8:{"^":"fZ;",
h5:function(a,b,c){return a.send(b,c)},
ab:function(a,b){return a.send(b)},
"%":"MIDIOutput"},
fZ:{"^":"bV;","%":"MIDIInput;MIDIPort"},
kh:{"^":"h;",$ish:1,"%":"Navigator"},
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
k:function(a,b,c){var z=this.a
z.replaceChild(c,z.childNodes[b])},
gO:function(a){var z=this.a.childNodes
return new W.d3(z,z.length,-1,null)},
gt:function(a){return this.a.childNodes.length},
h:function(a,b){return this.a.childNodes[b]},
$asi:function(){return[W.o]},
$asde:function(){return[W.o]},
$asj:function(){return[W.o]}},
o:{"^":"bV;aI:parentElement=,fB:previousSibling=",
fH:function(a){var z=a.parentNode
if(z!=null)z.removeChild(a)},
j:function(a){var z=a.nodeValue
return z==null?this.dP(a):z},
$isc:1,
$iso:1,
"%":"Attr|Document|HTMLDocument|XMLDocument;Node"},
ki:{"^":"fx;",
gt:function(a){return a.length},
h:function(a,b){if(b>>>0!==b||b>=a.length)throw H.e(P.aC(b,a,null,null,null))
return a[b]},
k:function(a,b,c){throw H.e(new P.H("Cannot assign element of immutable List."))},
a_:function(a,b){return a[b]},
$isD:1,
$asD:function(){return[W.o]},
$isi:1,
$asi:function(){return[W.o]},
$isK:1,
$asK:function(){return[W.o]},
$isj:1,
$asj:function(){return[W.o]},
"%":"NodeList|RadioNodeList"},
kj:{"^":"v;a7:height}","%":"HTMLObjectElement"},
ks:{"^":"v;t:length=","%":"HTMLSelectElement"},
hH:{"^":"v;",
a1:function(a,b,c,d){var z,y
if("createContextualFragment" in window.Range.prototype)return this.bq(a,b,c,d)
z=W.fn("<table>"+b+"</table>",c,d)
y=document.createDocumentFragment()
y.toString
z.toString
new W.R(y).ai(0,new W.R(z))
return y},
"%":"HTMLTableElement"},
kv:{"^":"v;",
a1:function(a,b,c,d){var z,y,x,w
if("createContextualFragment" in window.Range.prototype)return this.bq(a,b,c,d)
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
kw:{"^":"v;",
a1:function(a,b,c,d){var z,y,x
if("createContextualFragment" in window.Range.prototype)return this.bq(a,b,c,d)
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
bo:function(a,b,c,d){var z
a.textContent=null
z=this.a1(a,b,c,d)
a.content.appendChild(z)},
bn:function(a,b){return this.bo(a,b,null,null)},
$isdF:1,
"%":"HTMLTemplateElement"},
kA:{"^":"fY;a7:height}","%":"HTMLVideoElement"},
hY:{"^":"bV;",
cv:function(a,b){return a.requestAnimationFrame(H.aL(b,1))},
cn:function(a){if(!!(a.requestAnimationFrame&&a.cancelAnimationFrame))return;(function(b){var z=['ms','moz','webkit','o']
for(var y=0;y<z.length&&!b.requestAnimationFrame;++y){b.requestAnimationFrame=b[z[y]+'RequestAnimationFrame']
b.cancelAnimationFrame=b[z[y]+'CancelAnimationFrame']||b[z[y]+'CancelRequestAnimationFrame']}if(b.requestAnimationFrame&&b.cancelAnimationFrame)return
b.requestAnimationFrame=function(c){return window.setTimeout(function(){c(Date.now())},16)}
b.cancelAnimationFrame=function(c){clearTimeout(c)}})(a)},
gaI:function(a){return W.iI(a.parent)},
$ish:1,
"%":"DOMWindow|Window"},
kF:{"^":"o;",$ish:1,"%":"DocumentType"},
kH:{"^":"v;",$ish:1,"%":"HTMLFrameSetElement"},
kK:{"^":"fw;",
gt:function(a){return a.length},
h:function(a,b){if(b>>>0!==b||b>=a.length)throw H.e(P.aC(b,a,null,null,null))
return a[b]},
k:function(a,b,c){throw H.e(new P.H("Cannot assign element of immutable List."))},
a_:function(a,b){return a[b]},
$isD:1,
$asD:function(){return[W.o]},
$isi:1,
$asi:function(){return[W.o]},
$isK:1,
$asK:function(){return[W.o]},
$isj:1,
$asj:function(){return[W.o]},
"%":"MozNamedAttrMap|NamedNodeMap"},
i9:{"^":"c;er:a<",
gaH:function(){var z,y,x,w,v
z=this.a.attributes
y=H.f([],[P.w])
for(x=z.length,w=0;w<x;++w){v=z[w]
if(v.namespaceURI==null)y.push(v.name)}return y}},
ib:{"^":"i9;a",
h:function(a,b){return this.a.getAttribute(b)},
k:function(a,b,c){this.a.setAttribute(b,c)},
gt:function(a){return this.gaH().length}},
cn:{"^":"c;a",
aD:function(a){return $.$get$ed().P(0,W.aB(a))},
ar:function(a,b,c){var z,y,x
z=W.aB(a)
y=$.$get$co()
x=y.h(0,H.d(z)+"::"+b)
if(x==null)x=y.h(0,"*::"+b)
if(x==null)return!1
return x.$4(a,b,c,this)},
ed:function(a){var z,y
z=$.$get$co()
if(z.gaU(z)){for(y=0;y<262;++y)z.k(0,C.a_[y],W.j7())
for(y=0;y<12;++y)z.k(0,C.w[y],W.j8())}},
q:{
ec:function(a){var z,y
z=document.createElement("a")
y=new W.ix(z,window.location)
y=new W.cn(y)
y.ed(a)
return y},
kI:[function(a,b,c,d){return!0},"$4","j7",8,0,6],
kJ:[function(a,b,c,d){var z,y,x,w,v
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
return z},"$4","j8",8,0,6]}},
d4:{"^":"c;$ti",
gO:function(a){return new W.d3(a,this.gt(a),-1,null)},
$isi:1,
$asi:null,
$isj:1,
$asj:null},
dp:{"^":"c;a",
aD:function(a){return C.d.cE(this.a,new W.h9(a))},
ar:function(a,b,c){return C.d.cE(this.a,new W.h8(a,b,c))}},
h9:{"^":"k:1;a",
$1:function(a){return a.aD(this.a)}},
h8:{"^":"k:1;a,b,c",
$1:function(a){return a.ar(this.a,this.b,this.c)}},
iy:{"^":"c;",
aD:function(a){return this.a.P(0,W.aB(a))},
ar:["dS",function(a,b,c){var z,y
z=W.aB(a)
y=this.c
if(y.P(0,H.d(z)+"::"+b))return this.d.eF(c)
else if(y.P(0,"*::"+b))return this.d.eF(c)
else{y=this.b
if(y.P(0,H.d(z)+"::"+b))return!0
else if(y.P(0,"*::"+b))return!0
else if(y.P(0,H.d(z)+"::*"))return!0
else if(y.P(0,"*::*"))return!0}return!1}],
ee:function(a,b,c,d){var z,y,x
this.a.ai(0,c)
z=b.bW(0,new W.iz())
y=b.bW(0,new W.iA())
this.b.ai(0,z)
x=this.c
x.ai(0,C.a1)
x.ai(0,y)}},
iz:{"^":"k:1;",
$1:function(a){return!C.d.P(C.w,a)}},
iA:{"^":"k:1;",
$1:function(a){return C.d.P(C.w,a)}},
iD:{"^":"iy;e,a,b,c,d",
ar:function(a,b,c){if(this.dS(a,b,c))return!0
if(b==="template"&&c==="")return!0
if(a.getAttribute("template")==="")return this.e.P(0,b)
return!1},
q:{
eh:function(){var z=P.w
z=new W.iD(P.dd(C.v,z),P.X(null,null,null,z),P.X(null,null,null,z),P.X(null,null,null,z),null)
z.ee(null,new H.c4(C.v,new W.iE(),[H.ac(C.v,0),null]),["TEMPLATE"],null)
return z}}},
iE:{"^":"k:1;",
$1:function(a){return"TEMPLATE::"+H.d(a)}},
iC:{"^":"c;",
aD:function(a){var z=J.q(a)
if(!!z.$isdx)return!1
z=!!z.$isn
if(z&&W.aB(a)==="foreignObject")return!1
if(z)return!0
return!1},
ar:function(a,b,c){if(b==="is"||C.u.dK(b,"on"))return!1
return this.aD(a)}},
d3:{"^":"c;a,b,c,d",
C:function(){var z,y
z=this.c+1
y=this.b
if(z<y){this.d=J.cD(this.a,z)
this.c=z
return!0}this.d=null
this.c=y
return!1},
gE:function(){return this.d}},
ia:{"^":"c;a",
gaI:function(a){return W.ea(this.a.parent)},
$ish:1,
q:{
ea:function(a){if(a===window)return a
else return new W.ia(a)}}},
dn:{"^":"c;"},
ix:{"^":"c;a,b"},
ei:{"^":"c;a",
c4:function(a){new W.iF(this).$2(a,null)},
ba:function(a,b){var z
if(b==null){z=a.parentNode
if(z!=null)z.removeChild(a)}else b.removeChild(a)},
ey:function(a,b){var z,y,x,w,v,u,t,s
z=!0
y=null
x=null
try{y=J.eF(a)
x=y.ger().getAttribute("is")
w=function(c){if(!(c.attributes instanceof NamedNodeMap))return true
var r=c.childNodes
if(c.lastChild&&c.lastChild!==r[r.length-1])return true
if(c.children)if(!(c.children instanceof HTMLCollection||c.children instanceof NodeList))return true
var q=0
if(c.children)q=c.children.length
for(var p=0;p<q;p++){var o=c.children[p]
if(o.id=='attributes'||o.name=='attributes'||o.id=='lastChild'||o.name=='lastChild'||o.id=='children'||o.name=='children')return true}return false}(a)
z=w?!0:!(a.attributes instanceof NamedNodeMap)}catch(t){H.S(t)}v="element unprintable"
try{v=J.a1(a)}catch(t){H.S(t)}try{u=W.aB(a)
this.ex(a,b,z,v,u,y,x)}catch(t){if(H.S(t) instanceof P.a7)throw t
else{this.ba(a,b)
window
s="Removing corrupted element "+H.d(v)
if(typeof console!="undefined")console.warn(s)}}},
ex:function(a,b,c,d,e,f,g){var z,y,x,w,v
if(c){this.ba(a,b)
window
z="Removing element due to corrupted attributes on <"+d+">"
if(typeof console!="undefined")console.warn(z)
return}if(!this.a.aD(a)){this.ba(a,b)
window
z="Removing disallowed element <"+H.d(e)+"> from "+J.a1(b)
if(typeof console!="undefined")console.warn(z)
return}if(g!=null)if(!this.a.ar(a,"is",g)){this.ba(a,b)
window
z="Removing disallowed type extension <"+H.d(e)+' is="'+g+'">'
if(typeof console!="undefined")console.warn(z)
return}z=f.gaH()
y=H.f(z.slice(0),[H.ac(z,0)])
for(x=f.gaH().length-1,z=f.a;x>=0;--x){w=y[x]
if(!this.a.ar(a,J.eM(w),z.getAttribute(w))){window
v="Removing disallowed attribute <"+H.d(e)+" "+w+'="'+H.d(z.getAttribute(w))+'">'
if(typeof console!="undefined")console.warn(v)
z.getAttribute(w)
z.removeAttribute(w)}}if(!!J.q(a).$isdF)this.c4(a.content)}},
iF:{"^":"k:11;a",
$2:function(a,b){var z,y,x,w
switch(a.nodeType){case 1:this.a.ey(a,b)
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
fu:{"^":"h+aE;",$isi:1,
$asi:function(){return[W.o]},
$isj:1,
$asj:function(){return[W.o]}},
fv:{"^":"h+aE;",$isi:1,
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
$asj:function(){return[W.o]}}}],["","",,P,{"^":""}],["","",,P,{"^":"",jv:{"^":"ah;",$ish:1,"%":"SVGAElement"},jx:{"^":"n;",$ish:1,"%":"SVGAnimateElement|SVGAnimateMotionElement|SVGAnimateTransformElement|SVGAnimationElement|SVGSetElement"},jE:{"^":"n;m:x=,n:y=",$ish:1,"%":"SVGFEBlendElement"},jF:{"^":"n;m:x=,n:y=",$ish:1,"%":"SVGFEColorMatrixElement"},jG:{"^":"n;m:x=,n:y=",$ish:1,"%":"SVGFEComponentTransferElement"},jH:{"^":"n;m:x=,n:y=",$ish:1,"%":"SVGFECompositeElement"},jI:{"^":"n;m:x=,n:y=",$ish:1,"%":"SVGFEConvolveMatrixElement"},jJ:{"^":"n;m:x=,n:y=",$ish:1,"%":"SVGFEDiffuseLightingElement"},jK:{"^":"n;m:x=,n:y=",$ish:1,"%":"SVGFEDisplacementMapElement"},jL:{"^":"n;m:x=,n:y=",$ish:1,"%":"SVGFEFloodElement"},jM:{"^":"n;m:x=,n:y=",$ish:1,"%":"SVGFEGaussianBlurElement"},jN:{"^":"n;m:x=,n:y=",$ish:1,"%":"SVGFEImageElement"},jO:{"^":"n;m:x=,n:y=",$ish:1,"%":"SVGFEMergeElement"},jP:{"^":"n;m:x=,n:y=",$ish:1,"%":"SVGFEMorphologyElement"},jQ:{"^":"n;m:x=,n:y=",$ish:1,"%":"SVGFEOffsetElement"},jR:{"^":"n;m:x=,n:y=","%":"SVGFEPointLightElement"},jS:{"^":"n;m:x=,n:y=",$ish:1,"%":"SVGFESpecularLightingElement"},jT:{"^":"n;m:x=,n:y=","%":"SVGFESpotLightElement"},jU:{"^":"n;m:x=,n:y=",$ish:1,"%":"SVGFETileElement"},jV:{"^":"n;m:x=,n:y=",$ish:1,"%":"SVGFETurbulenceElement"},jW:{"^":"n;m:x=,n:y=",$ish:1,"%":"SVGFilterElement"},jX:{"^":"ah;m:x=,n:y=","%":"SVGForeignObjectElement"},fs:{"^":"ah;","%":"SVGCircleElement|SVGEllipseElement|SVGLineElement|SVGPathElement|SVGPolygonElement|SVGPolylineElement;SVGGeometryElement"},ah:{"^":"n;",$ish:1,"%":"SVGClipPathElement|SVGDefsElement|SVGGElement|SVGSwitchElement;SVGGraphicsElement"},k1:{"^":"ah;m:x=,n:y=",$ish:1,"%":"SVGImageElement"},k6:{"^":"n;",$ish:1,"%":"SVGMarkerElement"},k7:{"^":"n;m:x=,n:y=",$ish:1,"%":"SVGMaskElement"},kn:{"^":"n;m:x=,n:y=",$ish:1,"%":"SVGPatternElement"},ko:{"^":"h;t:length=","%":"SVGPointList"},kq:{"^":"h;a7:height},m:x=,n:y=","%":"SVGRect"},kr:{"^":"fs;m:x=,n:y=","%":"SVGRectElement"},dx:{"^":"n;",$ish:1,$isdx:1,"%":"SVGScriptElement"},n:{"^":"ag;",
scS:function(a,b){this.bn(a,b)},
a1:function(a,b,c,d){var z,y,x,w,v,u
z=H.f([],[W.dn])
z.push(W.ec(null))
z.push(W.eh())
z.push(new W.iC())
c=new W.ei(new W.dp(z))
y='<svg version="1.1">'+b+"</svg>"
z=document
x=z.body
w=(x&&C.C).eU(x,y,c)
v=z.createDocumentFragment()
w.toString
z=new W.R(w)
u=z.gay(z)
for(;z=u.firstChild,z!=null;)v.appendChild(z)
return v},
$ish:1,
$isn:1,
"%":"SVGComponentTransferFunctionElement|SVGDescElement|SVGDiscardElement|SVGFEDistantLightElement|SVGFEFuncAElement|SVGFEFuncBElement|SVGFEFuncGElement|SVGFEFuncRElement|SVGFEMergeNodeElement|SVGMetadataElement|SVGStopElement|SVGStyleElement|SVGTitleElement;SVGElement"},kt:{"^":"ah;m:x=,n:y=",$ish:1,"%":"SVGSVGElement"},ku:{"^":"n;",$ish:1,"%":"SVGSymbolElement"},dG:{"^":"ah;","%":";SVGTextContentElement"},kx:{"^":"dG;",$ish:1,"%":"SVGTextPathElement"},ky:{"^":"dG;m:x=,n:y=","%":"SVGTSpanElement|SVGTextElement|SVGTextPositioningElement"},kz:{"^":"ah;m:x=,n:y=",$ish:1,"%":"SVGUseElement"},kB:{"^":"n;",$ish:1,"%":"SVGViewElement"},kG:{"^":"n;",$ish:1,"%":"SVGGradientElement|SVGLinearGradientElement|SVGRadialGradientElement"},kL:{"^":"n;",$ish:1,"%":"SVGCursorElement"},kM:{"^":"n;",$ish:1,"%":"SVGFEDropShadowElement"},kN:{"^":"n;",$ish:1,"%":"SVGMPathElement"}}],["","",,P,{"^":"",fr:{"^":"c;",$isi:1,
$asi:function(){return[P.a0]},
$isj:1,
$asj:function(){return[P.a0]}}}],["","",,P,{"^":""}],["","",,P,{"^":""}],["","",,P,{"^":""}],["","",,V,{"^":"",
hl:function(a){return a.gbO(a).N(0,0)},
eZ:{"^":"c;",
c7:function(a,b){var z,y,x
z=a.y
y=b.y
x=z.c
if(x===y.c&&x!==0)return x>0
return(z.b&y.a)!==0&&(z.a&y.b)!==0}},
cO:{"^":"c;a,b,c"},
f4:{"^":"c;"},
a6:{"^":"c;a,b",
bX:function(a){var z,y,x
z=this.a.a
y=this.b.a
x=a.a
x[0]=(z[0]+y[0])*0.5
x[1]=(z[1]+y[1])*0.5},
M:function(a,b){var z,y,x,w
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
j:function(a){return"AABB["+this.a.j(0)+" . "+this.b.j(0)+"]"},
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
f5:{"^":"c;a,b,c,d,e,f,r,x,y",
fP:function(a,b){var z,y,x,w
z=this.a
y=z.b[a].gap()
x=z.b[b].gap()
z=x.a.a
w=y.b.a
if(z[0]-w[0]>0||z[1]-w[1]>0)return!1
z=y.a.a
w=x.b.a
if(z[0]-w[0]>0||z[1]-w[1]>0)return!1
return!0},
bV:function(a){var z,y,x,w,v,u,t,s,r
this.x=0
for(z=this.a,y=0;y<this.e;++y){x=this.c[y]
this.y=x
if(x===-1)continue
z.fE(0,this,z.b[x].gap())}this.e=0
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
C.d.W(z,0,x.length,x,0)}z=this.c
y=this.e
z[y]=a
this.e=y+1},
d2:function(a){var z,y,x,w,v
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
C.d.W(z,0,w,x,0)
for(z=this.r,y=this.f;w<z;++w)y[w]=new V.aY(0,0)}z=this.y
y=this.f
v=this.x
if(a<z){y[v].scY(a)
this.f[this.x].scZ(this.y)}else{y[v].scY(z)
this.f[this.x].scZ(a)}++this.x
return!0},
dY:function(a){var z,y,x
z=new Array(this.r)
z.fixed$length=Array
z=H.f(z,[V.aY])
this.f=z
for(y=this.r,x=0;x<y;++x)z[x]=new V.aY(0,0)
this.c=P.aj(this.d,0,!1,P.l)},
q:{
f6:function(a){var z=new V.f5(a,0,null,16,0,null,16,0,-1)
z.dY(a)
return z}}},
fi:{"^":"c;a,b,c,d,e,f,r,x,y,z,Q,ch,cx,cy",
fv:function(a,b,c){var z,y,x,w,v,u,t,s
z=this.b[a]
y=z.a
x=y.a.a
w=b.a.a
if(x[0]<=w[0])if(x[1]<=w[1]){v=b.b.a
u=y.b.a
v=v[0]<=u[0]&&v[1]<=u[1]}else v=!1
else v=!1
if(v)return!1
this.ew(z)
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
this.cs(a)
return!0},
fE:function(a,b,c){var z,y,x,w,v,u
this.x=0
z=this.r
this.x=1
z[0]=this.a
for(z=[V.aP];y=this.x,y>0;){x=this.r;--y
this.x=y
w=x[y]
if(w==null)continue
if(V.eN(w.a,c))if(w.d==null)b.d2(w.f)
else{y=this.r
x=y.length
if(x-this.x-2<=0){y=new Array(x*2)
y.fixed$length=Array
v=H.f(y,z)
y=this.r
C.d.W(v,0,y.length,y,0)
this.r=v
y=v}x=this.x
u=x+1
this.x=u
y[x]=w.d
this.x=u+1
y[u]=w.e}}},
bs:function(a){var z=a.d
if(z==null)return 0
return 1+Math.max(this.bs(z),this.bs(a.e))},
ce:function(){var z,y,x,w,v
z=this.e
if(z===-1){y=this.b
z=this.d*=2
z=new Array(z)
z.fixed$length=Array
z=H.f(z,[V.aP])
this.b=z
C.d.W(z,0,y.length,y,0)
for(x=this.d-1;z=this.c,x>=z;--x){z=this.b
w=new Float64Array(2)
z[x]=new V.aP(new V.a6(new E.a(w),new E.a(new Float64Array(2))),null,null,null,null,x,0)
z=this.b
w=z[x]
J.cG(w,x===this.d-1?null:z[x+1])
J.cF(this.b[x],-1)}this.e=z}v=this.b[z]
z=v.c
this.e=z!=null?z.f:-1
v.c=null
v.d=null
v.e=null
v.r=0
v.b=null;++this.c
return v},
cp:function(a){var z=this.e
a.c=z!==-1?this.b[z]:null
a.r=-1
this.e=a.f;--this.c},
cs:function(a){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g
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
w.M(r,x)
r=2*(v[0]-u[0]+v[1]-u[1])
m=2*r
l=2*(r-2*(p-n+q-o))
if(t.d==null){w.M(x,t.a)
k=2*(v[0]-u[0]+v[1]-u[1])+l}else{r=t.a
w.M(x,r)
q=r.b.a
p=q[0]
r=r.a.a
o=r[0]
q=q[1]
r=r[1]
k=2*(v[0]-u[0]+v[1]-u[1])-2*(p-o+q-r)+l}if(s.d==null){w.M(x,s.a)
j=2*(v[0]-u[0]+v[1]-u[1])+l}else{r=s.a
w.M(x,r)
q=r.b.a
p=q[0]
r=r.a.a
o=r[0]
q=q[1]
r=r[1]
j=2*(v[0]-u[0]+v[1]-u[1])-2*(p-o+q-r)+l}if(m<k&&m<j)break
y=k<j?t:s}i=J.eG(this.b[y.f])
h=this.ce()
h.c=i
h.b=null
h.a.M(x,y.a)
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
this.a=h}for(y=h;y!=null;){y=this.cf(y)
g=y.d
s=y.e
y.r=1+Math.max(g.r,s.r)
y.a.M(g.a,s.a)
y=y.c}},
ew:function(a){var z,y,x,w,v,u,t
if(a===this.a){this.a=null
return}z=a.c
y=z.c
x=z.d
if(x===a)x=z.e
if(y!=null){w=y.d
if(w==null?z==null:w===z)y.d=x
else y.e=x
x.c=y
this.cp(z)
for(v=y;v!=null;){v=this.cf(v)
u=v.d
t=v.e
v.a.M(u.a,t.a)
v.r=1+Math.max(u.r,t.r)
v=v.c}}else{this.a=x
x.c=null
this.cp(z)}},
cf:function(a){var z,y,x,w,v,u,t,s
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
u.M(z.a,v.a)
y.a.M(u,w.a)
z=1+Math.max(z.r,v.r)
a.r=z
y.r=1+Math.max(z,w.r)}else{y.e=v
a.e=w
w.c=a
u.M(z.a,w.a)
y.a.M(u,v.a)
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
u.M(y.a,s.a)
z.a.M(u,t.a)
u=1+Math.max(y.r,s.r)
a.r=u
z.r=1+Math.max(u,t.r)}else{z.e=s
a.d=t
t.c=a
u.M(y.a,t.a)
z.a.M(u,s.a)
u=1+Math.max(y.r,t.r)
a.r=u
z.r=1+Math.max(u,s.r)}return z}return a},
f5:function(a){var z,y
z=this.a
if(z==null)return
y=this.bs(z)
this.bI(a,this.a,0,y)},
bI:function(a,b,c,d){var z,y,x,w,v,u
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
x.a6(1,v,v)
a.b9(y,4,x)
y=a.c
y.stroke()
v=this.cy
a.b.aa(z,v)
v=v.a
z=v[0]
v=v[1]
w=c+1
u=J.a1(b)+".id-"+w+"/"+d
a.cz(x)
y.strokeText(u,z,v)
z=b.d
if(z!=null)this.bI(a,z,w,d)
z=b.e
if(z!=null)this.bI(a,z,w,d)},
e1:function(){var z,y,x
for(z=this.d-1;z>=0;--z){y=this.b
x=new Float64Array(2)
y[z]=new V.aP(new V.a6(new E.a(x),new E.a(new Float64Array(2))),null,null,null,null,z,0)
y=this.b
x=y[z]
J.cG(x,z===this.d-1?null:y[z+1])
J.cF(this.b[z],-1)}for(y=this.f,z=0;z<4;++z)y[z]=new E.a(new Float64Array(2))},
q:{
fj:function(){var z,y
z=new Array(16)
z.fixed$length=Array
y=[V.aP]
y=new V.fi(null,H.f(z,y),0,16,0,H.f(new Array(4),[E.a]),H.f(new Array(20),y),0,new E.a(new Float64Array(H.b(2))),V.av(),new V.cd(new E.a(new Float64Array(H.b(2))),new E.a(new Float64Array(H.b(2))),0),V.av(),new G.bQ(0,0,0),new E.a(new Float64Array(H.b(2))))
y.e1()
return y}}},
aP:{"^":"c;ap:a<,am:b<,aI:c*,d,e,f,a7:r'"},
aY:{"^":"c;cY:a?,cZ:b?",
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
Q:{"^":"c;L:a<,b",
A:function(a){var z,y
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
j:function(a){return this.b}},
cY:{"^":"c;a,b,c"},
hI:{"^":"c;a,b,c",
e9:function(){var z,y,x
for(z=this.b,y=this.a,x=0;x<8;++x){y[x]=new E.a(new Float64Array(2))
z[x]=new E.a(new Float64Array(2))}},
q:{
hJ:function(){var z=[E.a]
z=new V.hI(H.f(new Array(8),z),H.f(new Array(8),z),0)
z.e9()
return z}}},
it:{"^":"c;a,b,c,d,e,f,r,x,y"},
eY:{"^":"c;a,b,c,d,e,f,r,x,y,z,Q,ch,cx,cy,db,dx,dy,fr,fx,fy,go,id,k1,k2,k3",
eM:function(a,b,c,d,e){var z,y,x,w,v,u,t,s,r,q,p,o,n
a.e=0
z=b.gX()
y=d.gX()
x=c.b
w=C.a.l(x.b,z.gm(z))
v=C.a.l(x.a,z.gn(z))
u=c.a.a
t=u[0]
s=C.a.l(x.a,z.gm(z))
x=C.a.l(x.b,z.gn(z))
u=u[1]
r=e.b
q=e.a.a
p=C.a.l(r.b,y.gm(y))-C.a.l(r.a,y.gn(y))+q[0]-(w-v+t)
o=C.a.l(r.a,y.gm(y))+C.a.l(r.b,y.gn(y))+q[1]-(s+x+u)
n=b.gaJ().p(0,d.gaJ())
if(C.a.b0(p*p+o*o,n.l(0,n)))return
a.d=C.m
a.c.i(z)
a.b.G()
a.e=1
x=a.a
x[0].a.i(y)
x[0].d.aZ()},
eN:function(a7,a8,a9,b0,b1){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2,a3,a4,a5,a6
a7.e=0
z=b0.gX()
y=b1.b
x=a9.b
w=C.a.l(y.b,z.gm(z))
v=C.a.l(y.a,z.gn(z))
u=b1.a.a
t=u[0]
s=C.a.l(y.a,z.gm(z))
r=C.a.l(y.b,z.gn(z))
u=u[1]
q=a9.a.a
p=w-v+t-q[0]
o=s+r+u-q[1]
q=x.b
u=x.a
n=q*p+u*o
m=-u*p+q*o
l=C.a.p(a8.b,b0.gaJ())
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
u[0]=z.gm(z)
u[1]=z.gn(z)
a.d.aZ()
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
v.T()
a7.c.i(c)
v=a7.a
v[0].a.i(z)
v[0].d.aZ()}else if(a2*(v-s)+a3*(u-r)<=0){if(a2*a2+a3*a3>l*l)return
a7.e=1
a7.d=C.h
w=a7.b
v=w.a
v[0]=a2
v[1]=m-t[1]
w.T()
a7.c.i(b)
w=a7.a
w[0].a.i(z)
w[0].d.aZ()}else{a4=(v+s)*0.5
a5=(u+r)*0.5
a6=i[h]
w=a6.a
if((n-a4)*w[0]+(m-a5)*w[1]>l)return
a7.e=1
a7.d=C.h
a7.b.i(a6)
w=a7.c.a
w[0]=a4
w[1]=a5
w=a7.a
w[0].a.i(z)
w[0].d.aZ()}},
cM:function(a,b,c,d,e){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g
z=b.f
y=d.f
x=b.e
w=b.d
v=d.d
u=this.f
G.dR(e,c,u)
t=u.b
for(s=this.r,r=s.a,q=this.x,p=q.a,o=0,n=-17976931348623157e292,m=0;m<z;++m){G.M(t,x[m],s)
G.m(u,w[m],q)
for(l=17976931348623157e292,k=0;k<y;++k){j=v[k]
i=r[0]
h=j.a
g=i*(h[0]-p[0])+r[1]*(h[1]-p[1])
if(g<l)l=g}if(l>n){n=l
o=m}}a.b=o
a.a=n},
fc:function(a0,a1,a2,a3,a4,a5){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a
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
eO:function(a8,a9,b0,b1,b2){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2,a3,a4,a5,a6,a7
a8.e=0
z=a9.b+b1.b
y=this.y
this.cM(y,a9,b0,b1,b2)
if(y.a>z)return
x=this.z
this.cM(x,b1,b2,a9,b0)
w=x.a
if(w>z)return
if(w>y.a+0.0005){v=x.b
a8.d=C.q
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
this.fc(y,r,t,v,s,u)
o=r.f
n=r.d
m=v+1
m=m<o?m:0
x=this.dx
x.i(n[v])
w=this.dy
w.i(n[m])
l=this.ch
k=w.a
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
f=p.b
e=i[0]
d=p.a
c=g.a
c[0]=f*e-d*i[1]
c[1]=d*i[0]+f*i[1]
i=c[1]
b=-1*c[0]
G.aF(t,x,x)
G.aF(t,w,w)
w=j[0]
j=j[1]
a=i*w+b*j
x=c[0]
c=c[1]
f=k[0]
k=k[1]
g.R()
d=this.fr
a0=V.bc(d,y,g,-(x*w+c*j)+z,v)
g.R()
if(a0<2)return
y=this.fx
if(V.bc(y,d,g,x*f+c*k+z,m)<2)return
a8.b.i(l)
a8.c.i(h)
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
cI:function(a,b,c,d,e){var z,y,x,w,v,u,t,s,r,q,p,o,n
a.e=0
z=this.e
G.m(e,d.gX(),z)
y=this.fy
G.dS(c,z,y)
x=b.c
w=b.d
v=this.go
v.i(w)
v.v(x)
z.i(w)
z.v(y)
u=v.u(z)
z.i(y)
z.v(x)
t=v.u(z)
s=C.a.p(b.b,d.gaJ())
r=this.id
q=r.a
q[1]=0
q[3]=0
if(t<=0){z=$.$get$af()
z.i(y)
z.v(x)
z=$.$get$af()
if(z.u(z)>s*s)return
b.r
q[0]=0
q[2]=0
a.e=1
a.d=C.m
a.b.G()
a.c.i(x)
z=a.a
z[0].d.A(r)
z[0].a.i(d.gX())
return}if(u<=0){z=$.$get$af()
z.i(y)
z.v(w)
z=$.$get$af()
if(z.u(z)>s*s)return
b.x
q[0]=1
q[2]=0
a.e=1
a.d=C.m
a.b.G()
a.c.i(w)
z=a.a
z[0].d.A(r)
z[0].a.i(d.gX())
return}p=v.u(v)
o=this.k2
o.i(x)
o.F(0,u)
z.i(w)
z.F(0,t)
o.B(0,z)
o.F(0,1/p)
n=$.$get$af()
n.i(y)
n.v(o)
o=$.$get$af()
if(o.u(o)>s*s)return
o=this.r
v=v.a
n=o.a
n[0]=-v[1]
n[1]=v[0]
z.i(y)
z.v(x)
if(o.u(z)<0){z=n[0]
y=n[1]
n[0]=-z
n[1]=-y}o.T()
q[0]=0
q[2]=1
a.e=1
a.d=C.h
a.b.i(o)
a.c.i(x)
z=a.a
z[0].d.A(r)
z[0].a.i(d.gX())},
q:{
bc:function(a,b,c,d,e){var z,y,x,w,v,u,t,s,r,q,p,o,n,m
z=b[0]
y=b[1]
x=z.a
w=y.a
v=c.u(x)-d
u=c.u(w)-d
if(v<=0){a[0].A(z)
t=1}else t=0
if(u<=0){s=t+1
a[t].A(y)
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
hV:{"^":"c;a,b",
j:function(a){return this.b}},
fk:{"^":"c;a,b,c,d,e,f,r,x,y,z,Q,ch,cx,cy,db,dx,dy,fr,fx,fy,go,id,k1,k2,k3,k4,r1,r2,rx",
cH:function(a,b,c,d,a0){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e
z=this.b
G.dR(c,a0,z)
y=this.c
G.m(z,d.c,y)
this.d=b.e
this.e=b.c
x=b.d
this.f=x
this.r=b.f
b.x
w=this.fr
w.i(x)
w.v(this.e)
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
w.v(this.e)
t=x.u(w)
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
for(v=y.a,u=z.b,s=y.b,q=0;q<d.f;++q){G.m(z,d.d[q],v[q])
G.M(u,d.e[q],s[q])}this.dx=0.02
a.e=0
p=this.k4
this.eP(p)
if(p.a===C.o)return
if(p.c>this.dx)return
o=this.r1
this.eR(o)
u=o.a===C.o
if(!u&&o.c>this.dx)return
if(!u)if(o.c>0.98*p.c+0.001)p=o
u=this.id
n=u[0]
m=u[1]
if(p.a===C.p){a.d=C.h
r=this.Q
l=r.u(s[0])
for(k=0,q=1;j=y.c,q<j;++q){i=r.u(s[q])
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
y.r=x.u(j)
y.y=s.u(y.d)
r=this.k1
if(V.bc(r,u,x,y.r,y.a)<2)return
x=this.k2
if(V.bc(x,r,s,y.y,y.b)<2)return
u=a.b
s=a.c
if(p.a===C.p){u.i(v)
s.i(j)}else{u.i(d.e[y.a])
s.i(d.d[y.a])}for(y=w.a,u=a.a,g=0,q=0;q<2;++q){f=x[q].a.a
y[1]=f[1]
y[0]=f[0]
w.v(j)
if(v.u(w)<=this.dx){e=u[g]
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
eP:function(a){var z,y,x,w,v,u,t,s,r,q
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
eR:function(a){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f
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
w.v(q)
if(w.u(z)<-0.03490658503988659)continue}else{u[1]=h
u[0]=v[0]
w.v(t)
if(w.u(z)<-0.03490658503988659)continue}if(f>a.c){a.a=C.F
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
z=new V.fk(V.hJ(),G.p(),new E.a(new Float64Array(H.b(2))),new E.a(new Float64Array(H.b(2))),new E.a(new Float64Array(H.b(2))),new E.a(new Float64Array(H.b(2))),new E.a(new Float64Array(H.b(2))),new E.a(new Float64Array(H.b(2))),new E.a(new Float64Array(H.b(2))),new E.a(new Float64Array(H.b(2))),new E.a(new Float64Array(H.b(2))),C.M,C.M,new E.a(new Float64Array(H.b(2))),new E.a(new Float64Array(H.b(2))),0,!1,new E.a(new Float64Array(H.b(2))),new E.a(new Float64Array(H.b(2))),new E.a(new Float64Array(H.b(2))),new E.a(new Float64Array(H.b(2))),H.f(new Array(2),z),H.f(new Array(2),z),H.f(new Array(2),z),new V.it(0,0,new E.a(new Float64Array(H.b(2))),new E.a(new Float64Array(H.b(2))),new E.a(new Float64Array(H.b(2))),new E.a(new Float64Array(H.b(2))),0,new E.a(new Float64Array(H.b(2))),0),new V.cY(C.o,0,0),new V.cY(C.o,0,0),new E.a(new Float64Array(H.b(2))),new E.a(new Float64Array(H.b(2))))
z.e2()
return z}}},
J:{"^":"c;a",
c0:function(){var z=this.a
return(z[0]<<24|z[1]<<16|z[2]<<8|z[3])>>>0},
A:function(a){var z,y
z=a.a
y=this.a
y[0]=z[0]
y[1]=z[1]
y[2]=z[2]
y[3]=z[3]},
aZ:function(){var z=this.a
z[0]=0
z[1]=0
z[2]=0
z[3]=0},
aF:function(a,b){return this.c0()-b.c0()},
$isu:1,
$asu:function(){return[V.J]}},
bz:{"^":"c;a,b,J:c<,D:d@,e,f",
A:function(a){this.a.i(a.a)
this.b.i(a.b)
this.c.i(a.c)
this.d=a.d
this.e=a.e
this.f=a.f}},
hz:{"^":"c;a,b,c,d",
e7:function(){var z=this.c
z[0]=1073741823
z[1]=1073741823
z[2]=1073741823
z=this.d
z[0]=1073741823
z[1]=1073741823
z[2]=1073741823},
q:{
dz:function(){var z=P.l
z=new V.hz(0,0,P.aj(3,0,!1,z),P.aj(3,0,!1,z))
z.e7()
return z}}},
iB:{"^":"c;a,b,c,d,e,f,r,x,y,z,Q,ch,cx,cy,db",
fG:function(a,b,c,d,e){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l
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
o.v(r)
s.d=0}if(t>1){m=a.a
l=this.c1()
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
x.v(z)
this.e=1}},
fW:function(a){var z,y,x,w
a.a=this.c1()
a.b=this.e
for(z=a.c,y=this.d,x=a.d,w=0;w<this.e;++w){z[w]=J.cH(y[w].e)
x[w]=J.cH(y[w].f)}},
da:function(a){var z,y
switch(this.e){case 1:a.i(this.a.c)
a.R()
return
case 2:z=this.f
z.i(this.b.c)
y=this.a.c
z.v(y)
a.i(y)
a.R()
if(z.a2(a)>0)z.aK(1,a)
else z.aK(-1,a)
return
default:a.G()
return}},
bY:function(a){var z,y,x
switch(this.e){case 0:a.G()
return
case 1:a.i(this.a.c)
return
case 2:z=this.x
y=this.b
z.i(y.c)
z.F(0,y.d)
y=this.r
x=this.a
y.i(x.c)
y.F(0,x.d)
y.B(0,z)
a.i(y)
return
case 3:a.G()
return
default:a.G()
return}},
c1:function(){var z,y,x
switch(this.e){case 0:return 0
case 1:return 0
case 2:return Math.sqrt(this.a.c.bH(this.b.c))
case 3:z=this.y
z.i(this.b.c)
y=this.a.c
z.v(y)
x=this.z
x.i(this.c.c)
x.v(y)
return z.a2(x)
default:return 0}},
dn:function(){var z,y,x,w,v,u,t,s
z=this.a
y=z.c
x=this.b
w=x.c
v=this.f
v.i(w)
v.v(y)
u=-y.u(v)
if(u<=0){z.d=1
this.e=1
return}t=w.u(v)
if(t<=0){x.d=1
this.e=1
z.A(x)
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
t.v(z)
s=z.u(t)
r=x.u(t)
q=-s
p=this.Q
p.i(v)
p.v(z)
o=z.u(p)
n=v.u(p)
m=-o
l=this.ch
l.i(v)
l.v(x)
k=x.u(l)
j=v.u(l)
i=-k
h=t.a2(p)
g=h*x.a2(v)
f=h*v.a2(z)
e=h*z.a2(x)
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
w.A(u)
return}if(r<=0&&i<=0){w.d=1
this.e=1
y.A(w)
return}if(n<=0&&j<=0){u.d=1
this.e=1
y.A(u)
return}if(j>0&&i>0&&g<=0){b=1/(j+i)
w.d=j*b
u.d=i*b
this.e=2
y.A(u)
return}a=1/(g+f+e)
y.d=g*a
w.d=f*a
u.d=e*a
this.e=3}},
fe:{"^":"c;a,b,c,d",
c5:function(a,b){var z,y,x,w,v,u
switch(a.a){case C.k:H.z(a,"$isax")
this.a[0].i(a.gX())
this.b=1
this.c=a.gaJ()
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
case C.r:H.z(a,"$isbP")
z=this.d
z[0]=a.gbC().h(0,b)
y=b+1
if(C.c.N(y,a.gen()))z[1]=a.gbC().h(0,y)
else z[1]=a.gbC().h(0,0)
y=this.a
y[0].i(z[0])
y[1].i(z[1])
this.b=2
this.c=a.gaJ()
break
case C.n:H.z(a,"$isaA")
z=this.a
z[0].i(a.c)
z[1].i(a.d)
this.b=2
this.c=a.b
break}},
ax:function(a){var z,y,x,w,v
z=this.a
y=z[0].u(a)
for(x=0,w=1;w<this.b;++w){v=z[w].u(a)
if(v>y){y=v
x=w}}return x},
e0:function(){var z,y
for(z=this.a,y=0;y<8;++y)z[y]=new E.a(new Float64Array(2))
this.b=0
this.c=0},
q:{
ay:function(){var z=[E.a]
z=new V.fe(H.f(new Array(8),z),null,null,H.f(new Array(2),z))
z.e0()
return z}}},
fd:{"^":"c;a,b,c,d,e,f,r",
f1:function(a3,a4,a5){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2
$.cU=$.cU+1
z=a5.a
y=a5.b
x=a5.c
w=a5.d
v=this.a
v.fG(a4,z,x,y,w)
u=v.d
t=this.d
v.bY(t)
t.gaV()
for(s=this.b,r=this.c,q=x.b,p=this.e,o=p.a,n=this.f,m=z.a,l=w.b,k=y.a,j=0;j<20;){i=v.e
for(h=0;h<i;++h){s[h]=u[h].e
r[h]=u[h].f}switch(i){case 1:break
case 2:v.dn()
break
case 3:v.dq()
break}if(v.e===3)break
v.bY(t)
t.gaV()
v.da(p)
if(p.gaV()<14210854715202004e-30)break
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
f.v(e);++j
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
t.F(0,s.d)
r=v.b
a.i(r.a)
a.F(0,r.d)
a.B(0,t)
t.i(s.b)
t.F(0,s.d)
a0.i(r.b)
a0.F(0,r.d)
a0.B(0,t)
break
case 3:t=v.a
a.i(t.a)
a.F(0,t.d)
t=v.y
s=v.b
t.i(s.a)
t.F(0,s.d)
s=v.z
r=v.c
s.i(r.a)
s.F(0,r.d)
a.B(0,t)
a.B(0,s)
a0.i(a)
break
default:break}a3.c=Math.sqrt(a.bH(a0))
a3.d=j
v.fW(a4)
if(a5.e){a1=z.c
a2=y.c
v=a3.c
t=a1+a2
if(v>t&&v>11920928955078125e-23){a3.c=v-t
v=this.r
v.i(a0)
v.v(a)
v.T()
n.i(v)
n.F(0,a1)
a.B(0,n)
n.i(v)
n.F(0,a2)
a0.v(n)}else{a.B(0,a0)
a.F(0,0.5)
a0.i(a)
a3.c=0}}}},
cS:{"^":"c;a,b,c,d,e"},
cT:{"^":"c;a,b,c,d"},
c2:{"^":"c;a,b",
j:function(a){return this.b}},
fT:{"^":"c;a,b,c,d,e",
A:function(a){var z,y,x,w,v,u,t
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
cd:{"^":"c;a,b,c"},
dw:{"^":"c;a,b"},
aA:{"^":"dy;c,d,e,f,r,x,y,a,b"},
fX:{"^":"c;a,b,c"},
ho:{"^":"dy;c,d,e,f,r,x,y,z,Q,a,b",
eK:function(a){var z,y,x,w,v,u,t,s,r
z=V.bp()
z.c.i(this.c)
for(y=z.e,x=this.e,w=z.d,v=this.d,u=0;u<8;++u){t=y[u]
s=x[u]
t.toString
r=s.a
t=t.a
t[1]=r[1]
t[0]=r[0]
w[u].i(v[u])}z.b=this.b
z.f=this.f
return z},
bm:function(a,b){var z,y,x
this.f=4
z=this.d
y=-a
x=-b
z[0].ac(y,x)
z[1].ac(a,x)
z[2].ac(a,b)
z[3].ac(y,b)
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
this.c.G()},
bF:function(a,b,c){var z,y,x,w,v,u,t,s,r,q,p,o,n,m
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
eQ:function(a,b){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h
z=this.r
z.G()
y=this.x
y.G()
for(x=this.d,w=0;v=this.f,w<v;++w)y.B(0,x[w])
y.F(0,1/v)
u=this.y
t=this.z
for(v=z.a,s=u.a,r=t.a,q=y.a,p=0,o=0,w=0;w<this.f;){n=x[w].a
s[1]=n[1]
s[0]=n[0]
u.v(y)
r[1]=q[1]
r[0]=q[0]
r[1]=-r[1]
r[0]=-r[0];++w
t.B(0,w<this.f?x[w]:x[0])
m=u.a2(t)
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
z.F(0,1/p)
x=a.b
x.i(z)
x.B(0,y)
v=o*b
a.c=v
a.c=v+a.a*x.u(x)},
e6:function(){var z,y
for(z=this.d,y=0;y<8;++y)z[y]=new E.a(new Float64Array(2))
for(z=this.e,y=0;y<8;++y)z[y]=new E.a(new Float64Array(2))
this.b=0.01},
q:{
bp:function(){var z,y,x
z=new Float64Array(H.b(2))
y=new Array(8)
y.fixed$length=Array
x=[E.a]
x=new V.ho(new E.a(z),H.f(y,x),H.f(new Array(8),x),0,new E.a(new Float64Array(H.b(2))),new E.a(new Float64Array(H.b(2))),new E.a(new Float64Array(H.b(2))),new E.a(new Float64Array(H.b(2))),G.p(),C.i,0)
x.e6()
return x}}},
dy:{"^":"c;"},
bu:{"^":"c;a,b",
j:function(a){return this.b}},
hF:{"^":"c;a,b,c,d,e"},
b1:{"^":"c;a,b",
j:function(a){return this.b}},
hG:{"^":"c;a,b"},
hK:{"^":"c;a,b,c,d,e,f,r,x,y,z",
fQ:function(a3,a4){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2
$.dH=$.dH+1
a3.a=C.J
a3.b=a4.e
z=a4.a
y=a4.b
x=this.x
x.A(a4.c)
w=this.y
w.A(a4.d)
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
for(r=this.f,q=this.r,p=u+0.00125,o=u-0.00125,n=this.e,m=this.c,l=this.d,k=this.z.fy,j=0,i=0;!0;){x.a9(m,j)
w.a9(l,j)
s.c=m
s.d=l
k.f1(n,t,s)
h=n.c
if(h<=0){a3.a=C.a3
a3.b=0
break}if(h<p){a3.a=C.A
a3.b=j
break}r.fm(0,t,z,x,y,w,j)
f=v
e=0
while(!0){if(!!0){g=!1
break}d=r.fd(q,f)
if(d>p){a3.a=C.a4
a3.b=v
g=!0
break}if(d>o){j=f
g=!1
break}c=r.a3(q[0],q[1],j)
if(c<o){a3.a=C.K
a3.b=j
g=!0
break}if(c<=p){a3.a=C.A
a3.b=j
g=!0
break}for(b=f,a=j,a0=0;!0;){a1=(a0&1)===1?a+(u-c)*(b-a)/(d-c):0.5*(a+b);++a0
$.dL=$.dL+1
a2=r.a3(q[0],q[1],a1)
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
ce:{"^":"c;a,b",
j:function(a){return this.b}},
hw:{"^":"c;a,b,c,d,e,f,r,x,y,z,Q,ch,cx,cy,db,dx,dy,fr,fx,fy,go",
fm:function(a,b,c,d,e,f,g){var z,y,x,w,v,u,t,s,r,q,p,o,n,m
this.a=c
this.b=e
z=b.b
this.f=d
this.r=f
y=this.fr
d.a9(y,g)
x=this.fx
this.r.a9(x,g)
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
v.v(u)
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
q.v(p)
q.aK(-1,s)
s.T()
G.M(x.b,s,t)
u.i(p)
u.B(0,n)
u.F(0,0.5)
G.m(x,u,r)
u=this.x
x=this.a
g=g[0]
u.i(x.a[g])
G.m(y,u,v)
q.i(v)
q.v(r)
m=q.u(t)
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
q.v(p)
q.aK(-1,s)
s.T()
G.M(y.b,s,t)
u.i(p)
u.B(0,n)
u.F(0,0.5)
G.m(y,u,v)
u=this.y
y=this.b
w=w[0]
u.i(y.a[w])
G.m(x,u,r)
q.i(r)
q.v(v)
m=q.u(t)
if(m<0){s.R()
m=-m}return m}}},
fd:function(a,b){var z,y,x,w,v,u,t
z=this.fr
this.f.a9(z,b)
y=this.fx
this.r.a9(y,b)
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
v.v(t)
return v.u(x)
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
z.v(w)
return z.u(x)
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
y.v(w)
return y.u(x)
default:a[0]=-1
a[1]=-1
return 0}},
a3:function(a,b,c){var z,y,x,w,v
z=this.fr
this.f.a9(z,c)
y=this.fx
this.r.a9(y,c)
switch(this.c){case C.x:x=this.x
x.i(this.a.a[a])
w=this.y
w.i(this.b.a[b])
v=this.z
G.m(z,x,v)
x=this.Q
G.m(y,w,x)
x.v(v)
return x.u(this.e)
case C.y:x=this.cy
G.M(z.b,this.e,x)
w=this.z
G.m(z,this.d,w)
z=this.y
z.i(this.b.a[b])
v=this.Q
G.m(y,z,v)
v.v(w)
return v.u(x)
case C.z:x=this.cy
G.M(y.b,this.e,x)
w=this.Q
G.m(y,this.d,w)
y=this.x
y.i(this.a.a[a])
v=this.z
G.m(z,y,v)
v.v(w)
return v.u(x)
default:return 0}}},
i_:{"^":"c;a,b,c,d,e",
fl:function(a,b,c,a0,a1,a2){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d
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
if(z.bH(y)>14210854715202004e-30){w[0]=o[0]-q[0]
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
case C.h:j=this.d
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
ec:function(){var z,y
for(z=this.b,y=0;y<2;++y)z[y]=new E.a(new Float64Array(2))},
q:{
i0:function(){var z=new V.i_(new E.a(new Float64Array(H.b(2))),H.f(new Array(2),[E.a]),new Float64Array(H.b(2)),new E.a(new Float64Array(H.b(2))),new E.a(new Float64Array(H.b(2))))
z.ec()
return z}}},
b7:{"^":"c;a,b,c,d,e,f,r,x,y,z,Q,ch,cx,cy,db,dx,dy,fr,fx,fy,go,id,k1,k2,k3,am:k4<,r1,r2,rx",
bc:function(a){var z,y
z=this.Q
if((z.a&2)===2)return
y=new V.fq(0,null,null,null,0,0,null,0,new V.bj(1,65535,0),!1,null,V.av(),V.av(),new E.a(new Float64Array(H.b(2))))
y.eT(this,a)
if((this.b&32)===32)y.eV(z.b.a,this.d)
y.b=this.cy
this.cy=y;++this.db
y.c=this
if(y.a>0)this.fK()
z.a|=1
return y},
scU:function(a){if(this.a===C.e)return
if(a.u(a)>0)this.V(!0)
this.r.i(a)},
scD:function(a){if(this.a===C.e)return
if(a*a>0)this.V(!0)
this.x=a},
fK:function(){var z,y,x,w,v,u,t,s,r,q,p
this.fr=0
this.fx=0
this.fy=0
this.go=0
z=this.f
y=z.a
y.G()
x=this.a
if(x===C.e||x===C.D){y=this.d.a
z.b.i(y)
z.c.i(y)
z.d=z.e
return}x=this.Q.ch.a
w=x.a
v=w[x.b++]
v.G()
u=w[x.b++]
t=this.r2
for(s=this.cy,r=t.b.a;s!=null;s=s.b){q=s.a
if(q===0)continue
s.d.eQ(t,q)
q=this.fr
p=t.a
this.fr=q+p
q=u.a
q[1]=r[1]
q[0]=r[0]
q[1]=q[1]*p
q[0]=q[0]*p
v.B(0,u)
this.fy=this.fy+t.c}q=this.fr
if(q>0){q=1/q
this.fx=q
v.F(0,q)}else{this.fr=1
this.fx=1}q=this.fy
if(q>0&&(this.b&16)===0){q-=this.fr*v.u(v)
this.fy=q
this.go=1/q}else{this.fy=0
this.go=0}w=w[x.b++]
q=z.c
w.i(q)
y.i(v)
z=z.b
G.m(this.d,y,z)
q.i(z)
u.i(q)
u.v(w)
u.aK(this.x,w)
this.r.B(0,w)
x.b-=3},
V:function(a){var z
if(a){z=this.b
if((z&2)===0){this.b=z|2
this.k3=0}}else{this.b&=4294967293
this.k3=0
this.r.G()
this.x=0
this.y.G()
this.z=0}},
cb:function(){var z,y,x,w,v,u,t,s,r
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
c6:function(a){var z
if(this.a!==C.f&&a.a!==C.f)return!1
for(z=this.dx;!1;z=z.gfw())z.gfz()
return!0},
aq:function(a){var z,y,x,w,v
z=this.f
z.aq(a)
y=z.c
y.i(z.b)
x=z.d
z.e=x
w=this.d
v=w.b
v.bl(x)
w=w.a
G.M(v,z.a,w)
w.F(0,-1)
w.B(0,y)},
j:function(a){return"Body[pos: "+this.d.a.j(0)+" linVel: "+this.r.j(0)+" angVel: "+H.d(this.x)+"]"}},
bK:{"^":"c;a,am:b<,c,d,e,f,r,x,y,z,Q,ch,cx,cy"},
bM:{"^":"c;a,b",
j:function(a){return this.b}},
f_:{"^":"c;a,b,c,d,e,f",
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
if((r==null?y==null:r===y)&&p===w&&(q==null?z==null:q===z)&&o===x)return}t=t.d}if(!u.c6(v))return
s=this.d.c7(z,y)
if(!s)return
n=this.f.fA(z,x,y,w)
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
v.V(!0)
u.V(!0);++this.c},
bG:function(a){var z,y,x,w,v,u,t,s,r,q
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
if(v){z.c.V(!0)
y.c.V(!0)}s=z.d.a
r=y.d.a
q=this.f.fy[s.a][r.a].a
q.a[--q.b]=a;--this.c},
eL:function(){var z,y,x,w,v,u,t,s,r,q,p,o,n
z=this.b
for(;z!=null;){y=z.f
x=z.r
w=z.x
v=z.y
u=y.c
t=x.c
if((z.a&8)===8){if(!t.c6(u)){s=z.c
this.bG(z)
z=s
continue}r=this.d.c7(y,x)
if(!r){s=z.c
this.bG(z)
z=s
continue}z.a&=4294967287}q=(u.b&2)===2&&u.a!==C.e
p=(t.b&2)===2&&t.a!==C.e
if(!q&&!p){z=z.c
continue}o=y.r[w].gbj()
n=x.r[v].gbj()
if(!this.a.fP(o,n)){s=z.c
this.bG(z)
z=s
continue}z.bU(this.e)
z=z.c}},
dU:function(a,b){this.b=null
this.d=new V.eZ()
this.e=null
this.a=b},
q:{
f0:function(a,b){var z=new V.f_(null,null,0,null,null,a)
z.dU(a,b)
return z}}},
b9:{"^":"a8;fr,a,b,c,d,e,f,r,x,y,z,Q,ch,cx,cy,db,dx,dy",
a8:function(a,b,c,d){this.b2(a,b,c,d)},
a3:function(a,b,c){var z=this.fr
H.z(this.f.d,"$isbP").d7(z,this.x)
this.dx.fr.cI(a,z,b,H.z(this.r.d,"$isax"),c)}},
ba:{"^":"a8;fr,a,b,c,d,e,f,r,x,y,z,Q,ch,cx,cy,db,dx,dy",
a8:function(a,b,c,d){this.b2(a,b,c,d)},
a3:function(a,b,c){var z,y,x
z=this.fr
H.z(this.f.d,"$isbP").d7(z,this.x)
y=this.dx.fr
x=this.r.d
y.k3.cH(a,z,b,x,c)}},
bb:{"^":"a8;a,b,c,d,e,f,r,x,y,z,Q,ch,cx,cy,db,dx,dy",
a3:function(a,b,c){this.dx.fr.eM(a,H.z(this.f.d,"$isax"),b,H.z(this.r.d,"$isax"),c)}},
a8:{"^":"c;",
a8:["b2",function(a,b,c,d){var z,y
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
bU:function(a){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k
z=this.dy
y=this.z
z.A(y)
x=this.a|=4
w=this.f
w.z
v=this.r
v.z
u=w.c
t=v.c
this.a3(y,u.d,t.d)
s=y.e>0
for(w=z.a,v=y.a,r=0;r<y.e;++r){q=v[r]
q.b=0
q.c=0
p=q.d
for(o=z.e,n=p.a,m=0;m<o;++m){l=w[m]
k=l.d.a
if((k[0]<<24|k[1]<<16|k[2]<<8|k[3])>>>0===(n[0]<<24|n[1]<<16|n[2]<<8|n[3])>>>0){q.b=l.b
q.c=l.c
break}}}if(s!==((x&2)===2)){u.V(!0)
t.V(!0)}z=this.a
if(s)this.a=z|2
else this.a=z&4294967293
return}},
B:{"^":"c;a,b,c,d"},
bR:{"^":"c;a,b,c,d,e,f,r,x,y,z,Q,ch,cx,cy,db",
dV:function(){var z,y
for(z=this.a,y=0;y<2;++y)z[y]=new E.a(new Float64Array(2))},
q:{
cP:function(){var z=new V.bR(H.f(new Array(2),[E.a]),new E.a(new Float64Array(H.b(2))),new E.a(new Float64Array(H.b(2))),0,0,0,0,new E.a(new Float64Array(H.b(2))),new E.a(new Float64Array(H.b(2))),0,0,null,0,0,0)
z.dV()
return z}}},
bd:{"^":"c;a,b"},
bf:{"^":"c;a,b,c,d,e"},
f1:{"^":"c;a,b,c,d,e,f,r,x,y,z,Q",
cP:function(a){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b
this.a=a.a
z=a.c
this.r=z
y=this.d
x=y.length
if(x<z){z=new Array(Math.max(x*2,z))
z.fixed$length=Array
z=H.f(z,[V.bR])
this.d=z
C.d.W(z,0,x,y,0)
for(;z=this.d,x<z.length;++x)z[x]=V.cP()}z=this.e
x=z.length
y=this.r
if(x<y){y=new Array(Math.max(x*2,y))
y.fixed$length=Array
y=H.f(y,[V.bS])
this.e=y
C.d.W(y,0,x,z,0)
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
fV:function(){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b
for(z=0;z<this.r;++z){y=this.e[z]
x=y.e
w=y.f
v=y.r
u=y.y
t=y.x
s=y.z
r=y.cy
q=this.c[x].gL()
p=this.c[x].gJ()
o=this.c[w].gL()
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
c=this.b[k].gw()
b=this.b[k].gD()
a=this.c[k].gL()
a0=this.c[k].gJ()
a1=this.b[j].gw()
a2=this.b[j].gD()
a3=this.c[j].gL()
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
z.fl(0,l,x,n,v,m)
b1=p.b.a
b1[0]=r[0]
b1[1]=r[1]
b2=p.cy
for(a5=-$.ju,a7=a3.a,a8=-a4,b0=a.a,b3=-a0,b4=i+h,b5=0;b5<b2;++b5){b6=p.a[b5]
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
a6.fs()}else p.cy=1}}},
c8:function(){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2,a3,a4,a5,a6,a7,a8,a9,b0,b1,b2,b3,b4,b5,b6,b7,b8,b9,c0,c1,c2,c3,c4,c5,c6,c7,c8,c9,d0,d1,d2,d3,d4,d5,d6,d7,d8,d9,e0
for(z=0;z<this.r;++z){y=this.e[z]
x=y.e
w=y.f
v=y.r
u=y.x
t=y.y
s=y.z
r=y.cy
q=this.c[x].gL()
p=this.c[x].gJ()
o=this.c[w].gL()
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
c=this.b[n].gw()
b=this.b[n].gD()
a=this.b[m].gw()
a0=this.b[m].gD()
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
a0+=g*(b2*c0-b3*b9)}this.b[n].sD(b)
this.b[m].sD(a0)}return q>=-0.015},
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
b=0}a=this.b[n].gw()
a0=this.b[n].gD()
a1=this.b[m].gw()
a2=this.b[m].gD()
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
a2+=b*(b4*c2-b5*c1)}this.b[n].sD(a0)
this.b[m].sD(a2)}return q>=-0.0075},
dW:function(){var z,y
z=new Array(256)
z.fixed$length=Array
this.d=H.f(z,[V.bR])
z=new Array(256)
z.fixed$length=Array
this.e=H.f(z,[V.bS])
for(y=0;y<256;++y){this.d[y]=V.cP()
this.e[y]=V.cQ()}},
q:{
be:function(){var z=new V.f1(null,null,null,null,null,null,0,G.p(),G.p(),V.i0(),new V.hp(new E.a(new Float64Array(H.b(2))),new E.a(new Float64Array(H.b(2))),0))
z.dW()
return z}}},
hp:{"^":"c;a,b,c",
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
bS:{"^":"c;a,b,c,d,e,f,r,x,y,z,Q,ch,cx,cy,db",
dX:function(){var z,y,x
for(z=this.a,y=0;y<2;++y){x=new Float64Array(2)
z[y]=new V.e6(new E.a(x),new E.a(new Float64Array(2)),0,0,0,0,0)}},
q:{
cQ:function(){var z=new V.bS(H.f(new Array(2),[V.e6]),new E.a(new Float64Array(H.b(2))),new E.ak(new Float64Array(H.b(4))),new E.ak(new Float64Array(H.b(4))),0,0,0,0,0,0,0,0,0,0,0)
z.dX()
return z}}},
bg:{"^":"a8;a,b,c,d,e,f,r,x,y,z,Q,ch,cx,cy,db,dx,dy",
a8:function(a,b,c,d){this.b2(a,b,c,d)},
a3:function(a,b,c){this.dx.fr.cI(a,H.z(this.f.d,"$isaA"),b,H.z(this.r.d,"$isax"),c)}},
bh:{"^":"a8;a,b,c,d,e,f,r,x,y,z,Q,ch,cx,cy,db,dx,dy",
a8:function(a,b,c,d){this.b2(a,b,c,d)},
a3:function(a,b,c){var z,y,x
z=this.dx.fr
y=H.z(this.f.d,"$isaA")
x=this.r.d
z.k3.cH(a,y,b,x,c)}},
bn:{"^":"a8;a,b,c,d,e,f,r,x,y,z,Q,ch,cx,cy,db,dx,dy",
a3:function(a,b,c){this.dx.fr.eN(a,this.f.d,b,H.z(this.r.d,"$isax"),c)}},
bo:{"^":"a8;a,b,c,d,e,f,r,x,y,z,Q,ch,cx,cy,db,dx,dy",
a3:function(a,b,c){this.dx.fr.eO(a,this.f.d,b,this.r.d,c)}},
c9:{"^":"c;w:a<,D:b@"},
cj:{"^":"c;L:a<,J:b@"},
bj:{"^":"c;a,b,c"},
fq:{"^":"c;a,b,c,d,e,f,r,x,y,z,am:Q<,ch,cx,cy",
eT:function(a,b){var z,y,x,w,v
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
this.d=b.a.eK(0)
if(this.r==null){z=new Array(1)
z.fixed$length=Array
this.r=H.f(z,[V.bk])
for(x=0;x<1;++x){z=this.r
y=new Float64Array(2)
z[x]=new V.bk(new V.a6(new E.a(y),new E.a(new Float64Array(2))),null,0,0)
this.r[x].scN(null)
this.r[x].sbj(-1)}}z=this.r
y=z.length
if(y<1){w=Math.max(y*2,1)
v=new Array(w)
v.fixed$length=Array
v=H.f(v,[V.bk])
this.r=v
C.d.W(v,0,y,z,0)
for(x=0;x<w;++x){z=this.r
y=new Float64Array(2)
z[x]=new V.bk(new V.a6(new E.a(y),new E.a(new Float64Array(2))),null,0,0)
this.r[x].scN(null)
this.r[x].sbj(-1)}}this.x=0
this.a=b.e},
eV:function(a,b){var z,y,x,w,v,u,t,s,r
this.d.toString
this.x=1
for(z=a.a,y=0;y<this.x;++y){x=this.r[y]
w=this.d
v=x.a
w.bF(v,b,y)
u=z.ce()
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
z.cs(t);++a.b
a.cG(t)
x.d=t
x.b=this
x.c=y}},
dT:function(a,b,c){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l
if(this.x===0)return
for(z=this.cy,y=c.a.a,x=b.a.a,w=z.a,v=a.a,u=this.ch,t=this.cx,s=u.a.a,r=u.b.a,q=0;q<this.x;++q){p=this.r[q]
this.d.bF(u,b,p.c)
this.d.bF(t,c,p.c)
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
if(v.fv(n,o,z))a.cG(n)}}},
bW:{"^":"c;a,am:b<,c,d,e,f,r"},
bk:{"^":"c;ap:a<,cN:b?,c,bj:d@"},
d5:{"^":"c;a,b,c,d,e,f,r,x,y,z,Q,ch,cx,cy,db,dx,dy,fr",
a8:function(a,b,c,d){var z,y,x
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
if(z||this.z>y.length){if(z)y=H.f(new Array(0),[V.cj])
z=new Array(this.z)
z.fixed$length=Array
z=H.f(z,[V.cj])
this.f=z
x=y.length
C.d.W(z,0,x,y,0)
for(;z=this.f,x<z.length;++x)z[x]=new V.cj(new E.a(new Float64Array(2)),0)}y=this.e
z=y==null
if(z||this.z>y.length){if(z)y=H.f(new Array(0),[V.c9])
z=new Array(this.z)
z.fixed$length=Array
z=H.f(z,[V.c9])
this.e=z
x=y.length
C.d.W(z,0,x,y,0)
for(;z=this.e,x<z.length;++x)z[x]=new V.c9(new E.a(new Float64Array(2)),0)}},
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
s=(s+z*l*m)*(1/(1+z*w.k1))}J.bI(this.e[x].gw(),r[0])
J.bJ(this.e[x].gw(),r[1])
this.e[x].sD(u)
q=t.a
this.f[x].gL().a[0]=q[0]
this.f[x].gL().a[1]=q[1]
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
if(a2.f)p.fV()
for(x=0;x<this.x;++x)this.d[x].hm(y)
for(x=0;x<a2.d;++x){for(k=0;k<this.x;++k)this.d[k].h7(y)
p.c8()}p.dM()
for(x=0;x<this.r;++x){j=this.e[x].gw()
u=this.e[x].gD()
t=this.f[x].gL()
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
this.e[x].sD(u+z*s)
this.f[x].sJ(s)}x=0
while(!0){if(!(x<a2.e)){e=!1
break}d=p.dv()
for(c=!0,k=0;k<this.x;++k){b=this.d[k].h6(y)
c=c&&b}if(d&&c){e=!0
break}++x}for(x=0;x<this.r;++x){a=this.b[x]
y=a.f
q=y.c.a
q[0]=J.aN(this.e[x].gw())
q[1]=J.aO(this.e[x].gw())
y.e=this.e[x].gD()
y=a.r.a
y[0]=this.f[x].gL().a[0]
y[1]=this.f[x].gL().a[1]
a.x=this.f[x].gJ()
a.az()}this.d0(p.e)
if(a4){for(a0=17976931348623157e292,x=0;x<this.r;++x){w=this.b[x]
if(w.a===C.e)continue
if((w.b&4)!==0){y=w.x
if(!(y*y>0.0012184696791468343)){y=w.r
y=y.u(y)>0.0001}else y=!0}else y=!0
if(y){w.k3=0
a0=0}else{y=w.k3+=z
a0=Math.min(a0,y)}}if(a0>=0.5&&e)for(x=0;x<this.r;++x)this.b[x].V(!1)}},
dE:function(a,b,c){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k
for(z=0;z<this.r;++z){J.bI(this.e[z].gw(),this.b[z].f.c.a[0])
J.bJ(this.e[z].gw(),this.b[z].f.c.a[1])
this.e[z].sD(this.b[z].f.e)
this.f[z].gL().a[0]=this.b[z].r.a[0]
y=this.f[z].gL()
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
this.b[b].f.b.a[0]=J.aN(this.e[b].gw())
this.b[b].f.b.a[1]=J.aO(this.e[b].gw())
this.b[b].f.d=this.e[b].gD()
this.b[c].f.b.i(this.e[c].gw())
this.b[c].f.d=this.e[c].gD()
x.cR()
for(z=0;z<a.d;++z)x.c8()
w=a.a
for(z=0;z<this.r;++z){v=this.e[z].gw()
u=this.e[z].gD()
t=this.f[z].gL()
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
J.bI(this.e[z].gw(),p[0])
J.bJ(this.e[z].gw(),p[1])
this.e[z].sD(u)
this.f[z].gL().a[0]=y[0]
this.f[z].gL().a[1]=y[1]
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
m.az()}this.d0(x.e)},
d0:function(a){return}},
fM:{"^":"c;"},
aV:{"^":"c;a,b",
j:function(a){return this.b}},
Y:{"^":"c;a,b,c,d,e",
a5:function(a){this.a=this.a*0.95+a*0.05
this.b=this.b*0.8+a*0.2
this.c=Math.min(a,this.c)
this.d=Math.max(a,this.d)},
j:function(a){return H.d(this.b)+" ("+H.d(this.a)+") ["+H.d(this.c)+","+H.d(this.d)+"]"}},
hr:{"^":"c;a,b,c,d,e,f,r,x,y,z"},
dA:{"^":"c;a,b,c"},
dM:{"^":"c;a,b,c,d,e,f"},
hZ:{"^":"c;a,b,c,d,e,f,r,x,y,z,Q,ch,cx,cy,db,dx,dy,fr,fx,fy,go,id,k1,k2,k3,k4,r1,r2,rx,ry,x1,x2,y1,y2,cK,aj,bJ,aG,bd,be,bf,bK,bL,bM,bN,bg,bh,bi,ak,aQ,cL",
ao:function(a,b,c){var z,y,x,w,v
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
es:function(){var z=this.ch
this.ao(z.ch,C.k,C.k)
this.ao(z.cx,C.i,C.k)
this.ao(z.Q,C.i,C.i)
this.ao(z.cy,C.n,C.k)
this.ao(z.db,C.n,C.i)
this.ao(z.dx,C.r,C.k)
this.ao(z.dy,C.r,C.i)},
fA:function(a,b,c,d){var z,y,x,w,v,u
z=a.d.a
y=c.d.a
x=this.fy[z.a][y.a]
if(x!=null){w=x.b
v=x.a
if(w){u=v.cX()
u.a8(a,b,c,d)
return u}else{u=v.cX()
u.a8(c,d,a,b)
return u}}else return},
bb:function(a){var z,y,x,w,v,u,t,s,r
if((this.a&2)===2)return
z=G.p()
y=G.p()
x=new E.a(new Float64Array(H.b(2)))
w=new E.a(new Float64Array(H.b(2)))
v=new E.a(new Float64Array(H.b(2)))
u=new G.ao(x,w,v,0,0,0)
t=new E.a(new Float64Array(H.b(2)))
s=new E.a(new Float64Array(H.b(2)))
r=new V.b7(C.e,0,0,z,y,u,t,0,s,0,this,null,null,null,0,null,null,0,0,0,0,0,0,0,0,null,new V.bW(null,null,0.2,0,0,!1,new V.bj(1,65535,0)),new V.fX(0,new E.a(new Float64Array(H.b(2))),0),G.p())
if(a.ch){r.b=8
y=8}else y=0
y|=4
r.b=y
y|=2
r.b=y
r.b=y|32
y=z.a
y.i(a.c)
z.b.bl(a.d)
x.G()
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
s.G()
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
f2:function(){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2,a3,a4
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
if((s&32)!==32){z.a6(0.5,0.5,0.3)
this.aO(q,v,z,x)}else{p=w.a
if(p===C.e){z.a6(0.5,0.9,0.3)
this.aO(q,v,z,x)}else if(p===C.D){z.a6(0.5,0.5,0.9)
this.aO(q,v,z,x)}else if((s&2)!==2){z.a6(0.5,0.5,0.5)
this.aO(q,v,z,x)}else{z.a6(0.9,0.7,0.7)
this.aO(q,v,z,x)}}}}z=this.fx
v=this.Q.a
o=z.z
if(o!==0){n=z.r/2
m=z.cy.a
l=z.fx.a!=null?z.d9():null
z=this.Q
if((v&128)!==0)z.f4(m,n,l,o)
else z.f3(m,n,l,o)}}if((y&4)!==0)for(k=this.d,z=this.ch.a,v=this.k2,u=z.a;!1;k=k.b_()){j=k.fZ()
i=k.h_()
h=j.gbA()
g=i.gbA()
f=h.gX()
e=g.gX()
t=z.b
s=t+1
z.b=s
t=u[t]
z.b=s+1
s=u[s]
k.fX(t)
k.fY(s)
v.a6(0.5,0.8,0.8)
switch(k.h2()){case C.W:this.Q.Z(t,s,v)
break
case C.X:d=k.h0()
c=k.h1()
this.Q.Z(d,t,v)
this.Q.Z(c,s,v)
this.Q.Z(d,c,v)
break
case C.Z:this.Q.Z(f,e,v)
break
case C.V:case C.Y:break
default:this.Q.Z(f,t,v)
this.Q.Z(t,s,v)
this.Q.Z(e,s,v)}z.b-=2}if((y&16)!==0){z=this.k2
z.a6(0.3,0.9,0.9)
for(b=this.b.b,v=this.k4,u=this.r1;b!=null;b=b.c){a=b.f
a0=b.r
t=b.x
a.r[t].gap().bX(v)
t=b.y
a0.r[t].gap().bX(u)
this.Q.Z(v,u,z)}}if((y&8)!==0){z=this.k2
z.a6(0.9,0.3,0.9)
for(w=this.c,v=this.r2,u=v.a;w!=null;w=w.cx){if((w.b&32)!==32)continue
for(q=w.cy;q!=null;q=q.b)for(a1=0;a1<q.x;++a1){a2=q.r[a1]
t=this.b.a
s=a2.d
a3=t.a.b[s].gap()
if(!u.aM(4))u.k(0,4,v.c_(4))
t=u.h(0,4)
s=J.A(t)
p=a3.a.a
s.h(t,0).ac(p[0],p[1])
a4=a3.b.a
s.h(t,1).ac(a4[0],p[1])
s.h(t,2).ac(a4[0],a4[1])
s.h(t,3).ac(p[0],a4[1])
a4=this.Q
a4.b9(t,4,z)
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
s.aa(v,v)
t.beginPath()
t.arc(u[0],u[1],0.1*p,0,6.283185307179586,!0)
t.closePath()
t.stroke()}if((y&64)!==0)this.b.a.a.f5(this.Q)
this.Q.toString},
bp:function(a){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k
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
z.a8(x,v.c,this.f,v.e)
for(y=this.c;y!=null;y=y.cx)y.b&=4294967294
for(u=this.b.b;u!=null;u=u.c)u.a&=4294967294
for(t=this.d;!1;t=t.gb8())t.sct(!1)
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
y.V(!0)
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
q=m}for(l=y.dx;!1;l=l.gfw()){l.gcT().gct()
n=l.gfz()
n.hn()
v=l.gcT()
z.d[z.x++]=v
l.gcT().sct(!0)
n.gco().Y(0,1)
m=q+1
this.y1[q]=n
n.sco(n.gco().bk(0,1))
q=m}}z.dm(this.fr,a,x,this.x)
for(k=0;k<z.r;++k){y=z.b[k]
if(y.a===C.e)y.b&=4294967294}}z=this.fr.f
z.a5(z.e)
z=this.fr.r
z.a5(z.e)
z=this.fr.x
z.a5(z.e)
z=this.y2.a
x=z.b
z.a=x==null?$.r.$0():x
for(y=this.c;y!=null;y=y.cx){if((y.b&1)===0)continue
if(y.a===C.e)continue
y.cb()}x=this.b
x.a.bV(x)
x=this.fr.y
v=z.b
if(v==null)v=$.r.$0()
x.a5(C.c.ad((v-z.a)*1000,$.x))},
dD:function(b4){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2,a3,a4,a5,a6,a7,a8,a9,b0,b1,b2,b3
z=this.cK
z.a8(64,32,0,this.b.e)
if(this.dy){for(y=this.c;y!=null;y=y.cx){y.b&=4294967294
y.f.f=0}for(x=this.b.b;x!=null;x=x.c){x.a&=4294967262
x.Q=0
x.ch=1}}for(w=this.aG,v=this.bd,u=this.be,t=this.bf,s=this.bJ,r=this.aj,q=r.a,p=r.b,o=r.c,n=r.d,m=this.ch;!0;){for(x=this.b.b,l=null,k=1;x!=null;x=x.c){j=x.a
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
if(a3<a4){j.aq(a4)
a3=a4}else if(a4<a3)a.aq(a3)
a5=x.x
a6=x.y
q.c5(h.d,a5)
p.c5(g.d,a6)
o.A(j)
n.A(a)
r.e=1
m.fx.fQ(s,r)
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
u.A(j)
a=e.f
t.A(a)
f.aq(k)
e.aq(k)
l.bU(this.b.e)
a8=l.a&=4294967263;++l.Q
if((a8&4)!==4||(a8&2)!==2){l.a=a8&4294967291
j.A(u)
a.A(t)
f.az()
e.az()
continue}f.V(!0)
e.V(!0)
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
u.A(j)
if((b3.b&1)===0)b3.aq(k)
b2.bU(this.b.e)
a=b2.a
if((a&4)!==4){j.A(u)
b3.az()
continue}if((a&2)!==2){j.A(u)
b3.az()
continue}b2.a=a|1
z.c[z.y++]=b2
j=b3.b
if((j&1)!==0)continue
b3.b=j|1
if(b3.a!==C.e)b3.V(!0)
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
b0.cb()
for(b1=b0.dy;b1!=null;b1=b1.d)b1.b.a&=4294967262}j=this.b
j.a.bV(j)}},
aO:function(a,b,c,d){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l
z=a.d
switch(z.a){case C.k:H.z(z,"$isax")
y=this.bh
G.m(b,z.gX(),y)
x=z.gaJ()
z=b.b
w=z.b
z=z.a
v=this.bi.a
v[0]=w
v[1]=z
z=this.Q
w=y.a
if(d){v=z.b
x=x.l(0,v.c)
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
v.aa(y,y)
z.beginPath()
z.arc(w[0],w[1],x,0,6.283185307179586,!0)
z.closePath()
z.stroke()}else{v=z.b
x=x.l(0,v.c)
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
v.aa(y,y)
z.beginPath()
z.arc(w[0],w[1],x,0,6.283185307179586,!0)
z.closePath()
z.fill("nonzero")}break
case C.i:r=z.f
y=this.cL
w=y.a
if(!w.aM(8))w.k(0,8,y.c_(8))
y=w.h(0,8)
for(w=J.A(y),q=0;q<r;++q)G.m(b,z.d[q],w.h(y,q))
z=this.Q
if(d){z.b9(y,r,c)
z.c.stroke()}else{z.b9(y,r,c)
z=z.c
z.toString
z.fill("nonzero")}break
case C.n:H.z(z,"$isaA")
y=this.ak
G.m(b,z.c,y)
w=this.aQ
G.m(b,z.d,w)
this.Q.Z(y,w,c)
break
case C.r:H.z(z,"$isbP")
p=z.gen()
o=z.gbC()
z=this.ak
G.m(b,o.h(0,0),z)
for(y=this.aQ,w=z.a,n=y.a,q=1;C.c.N(q,p);++q){G.m(b,o.h(0,q),y)
this.Q.Z(z,y,c)
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
u.aa(z,z)
v.beginPath()
v.arc(w[0],w[1],0.05*t,0,6.283185307179586,!0)
v.closePath()
v.stroke()
w[1]=n[1]
w[0]=n[0]}break
default:break}},
q:{
i3:function(a,b){var z,y,x
z=H.f(new Array(a),[[P.j,V.bd]])
for(y=[V.bd],x=0;x<a;++x)z[x]=H.f(new Array(b),y)
return z}}},
i1:{"^":"c;a,b",
d2:function(a){var z=this.a.a.b[a].gam()
return this.b.hr(z.b)}},
i2:{"^":"c;a,b,c,d,e"},
c8:{"^":"c;a",
sD:function(a){this.a[3]=a},
gD:function(){return this.a[3]}},
hi:{"^":"c;a,b,c,d,am:e<"},
bm:{"^":"c;a,b,c"},
hh:{"^":"c;a,b"},
h7:{"^":"c;a,b,c"},
fc:{"^":"c;a,b,c,d,e"},
hU:{"^":"c;a,b"},
f2:{"^":"c;a,b,c"},
hA:{"^":"c;a,b,c,d,e,f"},
hj:{"^":"c;a,b,c,d,e,f,r,x,y,z,Q,ch,cx,cy,db,dx,dy,fr,fx,fy,go,id,k1,k2,k3,k4,r1,r2,rx,ry,x1,x2,y1,y2,cK,aj,bJ,aG,bd,be,bf,bK,bL,bM,bN,bg,bh,bi,ak,aQ,cL,hg,aR,hh,hi,hj,hk,f6,f7,f8,f9,fa,fb,hl",
bS:function(a,b){var z,y,x,w,v
if(a==null){x=this.Q
w=new Array(x)
w.fixed$length=Array
a=w
for(z=0;J.cC(z,x);z=J.eC(z,1))try{J.eD(a,z,b.$0())}catch(v){y=H.S(v)
x="Exception "+H.d(y)
throw H.e(x)}}return a},
f0:function(a){var z,y
z=this.ak
z.c2()
z.c2().h4(a)
for(y=a.gb4(),z=this.fy;y.N(0,a.gb6());y=y.p(0,1))C.b.k(z,y,null)
a.gbx()
a.gbx().sb8(a.gb8())
a.gb8()
a.gb8().sbx(a.gbx());--this.bJ},
fU:function(a){var z,y,x,w,v,u,t,s
for(z=this.k2,y=this.x,x=0;w=this.id,x<w;++x){v=C.b.h(z,x)
u=v.gbO(v)
w=this.cy.a[u].a
t=w[0]
v.sfN(0,(C.a.U(y*w[1]+2048)<<19>>>0)+(C.a.U(128*(y*t))+262144))}F.ex(z,0,w)
this.k3=0
for(u=0;u<this.id;++u){s=C.b.h(z,u)
V.hm(s.gfN(s),1,0)}},
fT:function(){var z,y,x,w,v,u,t,s,r
z=this.aQ
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
w=this.f6
w.a=this
this.ak.fF(w,z)},
dr:function(a){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k
z=this.aQ
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
x[1]=q>o?q:o}y=this.f7
y.b=a
y.a=this
this.ak.fF(y,z)},
bp:function(a){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k;++this.a
if(this.z===0)return
this.b=0
for(z=0,y=0;z<this.z;++z){y=C.c.bk(y,C.b.h(this.cx.a,z))
this.b=y}if((y&2)!==0)this.dJ()
if(this.z===0)return
this.c=0
for(x=this.aG;!1;x=x.b_())this.c=C.c.bk(this.c,x.gcq())
y=a.a
w=this.f
v=this.ak
u=v.d8()
t=C.a.l(y*w,u.gm(u))
u=a.a
v=v.d8()
s=C.a.l(u*w,v.gn(v))
r=this.bZ(a)
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
m[1]=m[1]+u*k[1]}this.fT()
this.fU(!1)
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
for(z=this.dx,y=0;y<this.z;++y)C.b.k(z,y,0)
for(x=0;x<this.r2;++x){w=this.ry[x]
v=w.a
u=w.c
C.b.k(z,v,C.b.h(z,v).p(0,u))}for(x=0;x<this.k3;++x){w=this.r1[x]
v=w.a
t=w.b
u=w.d
C.b.k(z,v,C.b.h(z,v).p(0,u))
C.b.k(z,t,C.b.h(z,t).p(0,u))}if((this.b&64)!==0)for(y=0;y<this.z;++y){C.b.h(this.cx.a,y).Y(0,64)
C.b.k(z,y,0)}s=this.bd*(this.d*this.bZ(a))
for(y=0;y<this.z;++y)C.b.k(z,y,s*Math.max(0,Math.min(H.iY(C.b.h(z,y)),5)-1))
r=a.a/(this.d*this.r)
for(q=this.aR,p=q.a,o=this.x,n=1.777777*this.e*o*o,x=0;x<this.r2;++x){w=this.ry[x]
v=w.a
t=w.b
u=w.c
m=w.e
l=w.d
k=this.cy.a[v]
j=C.j.l(r*u*m,C.b.h(z,v).p(0,s*u))
o=l.a
p[0]=j*o[0]
p[1]=j*o[1]
o=this.db.a[v].a
o[0]=o[0]-n*p[0]
o[1]=o[1]-n*p[1]
t.bD(q,k,!0)}for(x=0;x<this.k3;++x){w=this.r1[x]
v=w.a
t=w.b
u=w.d
l=w.e
i=C.b.h(z,v).p(0,C.b.h(z,t))
p=r*u
o=l.a
h=C.j.l(p,i)*o[0]
g=C.j.l(p,i)*o[1]
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
for(y=this.aR,x=y.a,w=this.x,v=1.777777*this.e*w*w,u=0;u<this.r2;++u){t=this.ry[u]
s=t.a
r=t.b
q=t.c
p=t.e
o=t.d
n=this.cy.a[s]
w=n.a
m=w[0]
l=r.gbz().gw()
k=C.a.H(m,l.gm(l))
w=w[1]
l=r.gbz().gw()
j=C.a.H(w,l.gn(l))
i=this.db.a[s]
l=r.gb3().dc(0).l(0,j)
w=r.gb7()
w=l.p(0,w.gm(w))
l=i.a
h=w.H(0,l[0])
w=r.gb3().l(0,k)
m=r.gb7()
g=w.p(0,m.gn(m)).H(0,l[1])
m=o.a
f=h.l(0,m[0]).p(0,g.l(0,m[1]))
if(f.N(0,0)){w=z*q*p
x[0]=C.a.l(w,f)*m[0]
x[1]=C.a.l(w,f)*m[1]
l[0]=l[0]+v*x[0]
l[1]=l[1]+v*x[1]
x[0]=-x[0]
x[1]=-x[1]
r.bD(y,n,!0)}}for(x=this.k3,w=this.r1,m=this.db.a,u=0;u<x;++u){t=w[u]
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
for(z=0;z<this.z;++z){C.b.h(this.cx.a,z).Y(0,4)
y=this.db.a[z]
x=y.a
x[0]=0
x[1]=0}},
dA:function(a){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h
for(z=this.aG,y=this.aR,x=this.f8,w=this.f9,v=y.a,u=this.fa,t=u.a,s=t.a,u=u.b,r=this.fb,q=r.a.a,p=r.b;!1;z=z.b_()){z.gcq().Y(0,2)
z.hs()
o=C.a.l(a.a,z.gb3())
w.a=Math.sin(o)
w.b=Math.cos(o)
G.M(w,z.geg(),x)
n=z.gb7().ghc()
v[1]=n[1]
v[0]=n[0]
o=a.a
v[1]=v[1]*o
v[0]=v[0]*o
y.B(0,z.geg())
y.v(x)
s[1]=v[1]
s[0]=v[0]
u.a=w.a
u.b=w.b
o=z.gbA()
m=z.gbA()
l=o.gfD()
k=m.gfD()
j=C.a.l(u.b,l.gw())
i=C.a.l(u.a,l.gc3())
k.sc3(C.a.l(u.a,l.gw())+C.a.l(u.b,l.gc3()))
k.sw(j-i)
o=o.gX()
i=m.gX()
j=C.a.l(u.a,o.gm(o))
k=C.a.l(u.b,o.gn(o))
i.sm(0,C.a.l(u.b,o.gm(o))-C.a.l(u.a,o.gn(o)))
i.sn(0,j+k)
m.gX().B(0,t)
m=a.b
q[0]=m*s[0]
q[1]=m*s[1]
p.a=m*u.a
p.b=m*(u.b-1)
for(h=z.gb4();h.N(0,z.gb6());h=h.p(0,1))G.m(r,this.cy.a[h],this.db.a[h])}},
du:function(a6){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2,a3,a4,a5
z=a6.b*this.bf
for(y=0;y<this.y2;++y){x=C.b.h(this.aj,y)
x.gff().Y(0,16)
w=x.gat()
v=x.gau()
u=x.gbP()
t=x.gho()
s=x.ghp()
r=x.ghq()
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
g=t.a2(p).p(0,s.a2(o)).p(0,r.a2(n))
f=t.u(p).p(0,s.u(o)).p(0,r.u(n))
e=Math.sqrt(C.c.d6(1,g.l(0,g).p(0,f.l(0,f))))
g=g.l(0,e)
f=f.l(0,e)
d=C.a.l(z,x.gdN())
c=f.l(0,t.gm(t)).H(0,g.l(0,t.gn(t)))
b=g.l(0,t.gm(t)).p(0,f.l(0,t.gn(t)))
a=f.l(0,s.gm(s)).H(0,g.l(0,s.gn(s)))
a0=g.l(0,s.gm(s)).p(0,f.l(0,s.gn(s)))
a1=f.l(0,r.gm(r)).H(0,g.l(0,r.gn(r)))
a2=g.l(0,r.gm(r)).p(0,f.l(0,r.gn(r)))
m=this.db.a
a3=m[w]
a4=m[v]
a5=m[u]
m=a3.a
m[0]=m[0]+C.a.l(d,c.H(0,q[0]-i))
m[1]=m[1]+C.a.l(d,b.H(0,q[1]-h))
q=a4.a
q[0]=q[0]+C.a.l(d,a.H(0,l[0]-i))
q[1]=q[1]+C.a.l(d,a0.H(0,l[1]-h))
l=a5.a
l[0]=l[0]+C.a.l(d,a1.H(0,j[0]-i))
l[1]=l[1]+C.a.l(d,a2.H(0,j[1]-h))}},
dC:function(a){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h
z=a.b*this.bK
for(y=this.y1,x=0;x<this.x1;++x){w=C.b.h(y,x)
w.gff().Y(0,8)
v=w.gat()
u=w.gau()
t=this.cy.a
s=t[v]
t=t[u].a
r=t[0]
q=s.a
p=r-q[0]
o=t[1]-q[1]
n=w.ghf()
m=Math.sqrt(p*p+o*o)
if(m===0)m=17976931348623157e292
l=C.a.l(z,w.gdN())
k=C.a.l(l,n.H(0,m))/m*p
j=C.a.l(l,n.H(0,m))/m*o
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
this.dy=this.bS(this.dy,V.cu())
for(z=this.dx,y=0;y<this.z;++y){C.b.k(z,y,0)
this.dy[y].G()}for(x=0;x<this.k3;++x){w=this.r1[x]
if((w.c&128)!==0){v=w.a
u=w.b
t=w.d
s=w.e
C.b.k(z,v,C.b.h(z,v).p(0,t))
C.b.k(z,u,C.b.h(z,u).p(0,t))
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
r[1]=r[1]+o*n[1]}}r=this.bM
n=this.r*a0.b
m=r*n
l=this.bN*n
for(x=0;x<this.k3;++x){w=this.r1[x]
if((w.c&128)!==0){v=w.a
u=w.b
t=w.d
s=w.e
r=this.dy
q=r[v]
p=r[u]
k=C.b.h(z,v).p(0,C.b.h(z,u))
r=p.a
n=r[0]
j=q.a
i=j[0]
r=r[1]
j=j[1]
h=C.j.l(m,k.H(0,2))
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
z=this.bL
for(y=this.aR,x=this.x,w=1.777777*this.e*x*x,x=y.a,v=0;v<this.r2;++v){u=this.ry[v]
t=u.a
C.b.h(this.cx.a,t).Y(0,32)
s=u.b
r=u.c
q=u.e
p=this.cy.a[t]
o=this.db.a[t]
n=p.a
m=n[0]
l=s.gbz().gw()
k=C.a.H(m,l.gm(l))
n=n[1]
l=s.gbz().gw()
j=C.a.H(n,l.gn(l))
l=s.gb3().dc(0).l(0,j)
n=s.gb7()
n=l.p(0,n.gm(n))
l=o.a
i=n.H(0,l[0])
n=s.gb3().l(0,k)
m=s.gb7()
h=n.p(0,m.gn(m)).H(0,l[1])
m=z*q*r
x[0]=C.j.l(m,i)
x[1]=C.j.l(m,h)
l[0]=l[0]+w*x[0]
l[1]=l[1]+w*x[1]
x[0]=-x[0]
x[1]=-x[1]
s.bD(y,p,!0)}for(x=this.k3,n=this.r1,m=this.db.a,v=0;v<x;++v){u=n[v]
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
for(y=this.aR,x=this.x,w=1.777777*this.e*x*x,x=y.a,v=0;v<this.r2;++v){u=this.ry[v]
t=u.a
C.b.h(this.cx.a,t).Y(0,64)
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
r.bD(y,p,!0)}}for(x=this.k3,l=this.r1,k=this.db.a,j=this.bg,v=0;v<x;++v){u=l[v]
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
C.b.h(x,u)
C.b.h(x,t)
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
z.a=this.bS(z.a,V.eo())
y=C.a.U(256*this.bi)
for(x=0;x<this.k3;++x){w=this.r1[x]
v=w.a
u=w.b
C.b.h(this.cx.a,v).Y(0,C.b.h(this.cx.a,u)).Y(0,256)
z=this.fx.a
t=z[v]
z=z[u].a
s=z[0]
r=t.a
q=C.c.aC(C.c.U(y*(s-r[0])),8)
p=C.c.aC(C.c.U(y*(z[1]-r[1])),8)
o=C.c.aC(C.c.U(y*(z[2]-r[2])),8)
n=C.c.aC(C.c.U(y*(z[3]-r[3])),8)
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
for(y=this.ak,x=0;x<this.z;++x){w=C.b.h(this.cx.a,x)
w.Y(0,2)
v=y.c2()
w.Y(0,512)
v.h3(x)
z[x]=-1}for(y=this.k2,u=0;t=this.id,u<t;++u){s=C.b.h(y,u)
s.sbO(0,z[s.gbO(s)])}for(x=0;x<t;++x)if(V.hl(C.b.h(y,x))){--t
r=C.b.h(y,t)
C.b.k(y,t,C.b.h(y,x))
C.b.k(y,x,r);--x}this.id=t
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
for(y=this.y1,u=0;t=this.x1,u<t;++u){o=C.b.h(y,u)
o.sat(z[o.gat()])
o.sau(z[o.gau()])}for(x=0;x<t;++x){p=C.b.h(y,x)
if(p.gat().N(0,0)||p.gau().N(0,0)){--t
r=C.b.h(y,t)
C.b.k(y,t,C.b.h(y,x))
C.b.k(y,x,r);--x}}this.x1=t
for(u=0;t=this.y2,u<t;++u){n=C.b.h(this.aj,u)
n.sat(z[n.gat()])
n.sau(z[n.gau()])
n.sbP(z[n.gbP()])}for(x=0;x<t;++x){y=C.b.h(this.aj,x)
if(y.gat().N(0,0)||y.gau().N(0,0)||y.gbP().N(0,0)){--t
r=C.b.h(this.aj,t)
y=this.aj
C.b.k(y,t,C.b.h(y,x))
C.b.k(this.aj,x,r);--x}}this.y2=t
for(m=this.aG;!1;m=m.b_()){for(x=m.gb4(),l=0,k=0,j=!1;x.N(0,m.gb6());x=x.p(0,1)){t=z[x]
if(t>=0){l=Math.min(l,t)
k=Math.max(k,t+1)}else j=!0}if(l<k){m.sb4(l)
m.sb6(k)
if(j){m.gcq().Y(0,2)
m.seC(!0)}}else{m.sb4(0)
m.sb6(0)
if(m.gh9())m.seB(!0)}}this.z=0
for(m=this.aG;!1;m=i){i=m.b_()
if(m.geB())this.f0(m)
else m.geC()}},
bZ:function(a){var z=this.r*a.b
return z*z},
d9:function(){var z=this.fx
z.a=this.bS(z.a,z.b)
return this.fx.a},
e5:function(a){this.bd=0.05
this.be=1
this.bf=0.25
this.bK=0.25
this.bL=0.25
this.bM=0.1
this.bN=0.2
this.bg=0.5
this.bh=0.5
this.bi=0.5
this.cx=new V.hh(null,null)
this.cy=new V.bm(null,V.cu(),0)
this.db=new V.bm(null,V.cu(),0)
this.fx=new V.bm(null,V.eo(),0)
this.go=new V.bm(null,V.iX(),0)},
q:{
hm:function(a,b,c){return a.p(0,c<<19>>>0).p(0,b<<7>>>0)},
km:[function(){return new E.a(new Float64Array(H.b(2)))},"$0","cu",0,0,16],
kk:[function(){return new P.c()},"$0","iX",0,0,17],
kl:[function(){var z=new Int8Array(H.b(4))
z[0]=127
z[1]=127
z[2]=127
z[3]=50
return new V.c8(z)},"$0","eo",0,0,18],
hk:function(a){var z=new V.hj(0,0,0,1,1,1,1,1,1,0,0,0,null,null,null,null,null,null,null,null,null,0,0,null,0,0,null,0,0,null,0,0,null,0,0,null,0,null,null,null,null,null,null,null,null,null,null,null,null,V.av(),new V.fc(null,null,null,!1,0),V.av(),new E.a(new Float64Array(H.b(2))),G.p(),G.p(),new V.f2(null,null,null),new V.hi(0,new E.a(new Float64Array(H.b(2))),new E.a(new Float64Array(H.b(2))),null,null),new V.hU(null,new E.a(new Float64Array(H.b(2)))),new V.hA(null,null,new V.cd(new E.a(new Float64Array(H.b(2))),new E.a(new Float64Array(H.b(2))),0),new V.dw(new E.a(new Float64Array(H.b(2))),0),new E.a(new Float64Array(H.b(2))),new E.a(new Float64Array(H.b(2)))),new E.a(new Float64Array(H.b(2))),new G.aZ(0,1),G.p(),G.p(),new V.h7(0,0,0))
z.e5(a)
return z}}},
e4:{"^":"c;a",
c_:function(a){var z,y,x
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
F:{"^":"a3;$ti"},
h5:{"^":"F;d,a,b,c",
S:function(){return new V.bo(0,null,null,new V.B(null,null,null,null),new V.B(null,null,null,null),null,null,0,0,V.E(),0,0,0,0,0,this.d,V.E())},
$asF:function(){return[V.bo]},
$asa3:function(){return[V.bo]}},
h1:{"^":"F;d,a,b,c",
S:function(){return new V.bb(0,null,null,new V.B(null,null,null,null),new V.B(null,null,null,null),null,null,0,0,V.E(),0,0,0,0,0,this.d,V.E())},
$asF:function(){return[V.bb]},
$asa3:function(){return[V.bb]}},
h4:{"^":"F;d,a,b,c",
S:function(){return new V.bn(0,null,null,new V.B(null,null,null,null),new V.B(null,null,null,null),null,null,0,0,V.E(),0,0,0,0,0,this.d,V.E())},
$asF:function(){return[V.bn]},
$asa3:function(){return[V.bn]}},
h2:{"^":"F;d,a,b,c",
S:function(){return new V.bg(0,null,null,new V.B(null,null,null,null),new V.B(null,null,null,null),null,null,0,0,V.E(),0,0,0,0,0,this.d,V.E())},
$asF:function(){return[V.bg]},
$asa3:function(){return[V.bg]}},
h3:{"^":"F;d,a,b,c",
S:function(){return new V.bh(0,null,null,new V.B(null,null,null,null),new V.B(null,null,null,null),null,null,0,0,V.E(),0,0,0,0,0,this.d,V.E())},
$asF:function(){return[V.bh]},
$asa3:function(){return[V.bh]}},
h_:{"^":"F;d,a,b,c",
S:function(){var z,y,x,w
z=new Float64Array(2)
y=new Float64Array(2)
x=new Float64Array(2)
w=new Float64Array(2)
z=new V.aA(new E.a(z),new E.a(y),new E.a(x),new E.a(w),!1,!1,new E.a(new Float64Array(2)),C.n,0)
z.b=0.01
return new V.b9(z,0,null,null,new V.B(null,null,null,null),new V.B(null,null,null,null),null,null,0,0,V.E(),0,0,0,0,0,this.d,V.E())},
$asF:function(){return[V.b9]},
$asa3:function(){return[V.b9]}},
h0:{"^":"F;d,a,b,c",
S:function(){var z,y,x,w
z=new Float64Array(2)
y=new Float64Array(2)
x=new Float64Array(2)
w=new Float64Array(2)
z=new V.aA(new E.a(z),new E.a(y),new E.a(x),new E.a(w),!1,!1,new E.a(new Float64Array(2)),C.n,0)
z.b=0.01
return new V.ba(z,0,null,null,new V.B(null,null,null,null),new V.B(null,null,null,null),null,null,0,0,V.E(),0,0,0,0,0,this.d,V.E())},
$asF:function(){return[V.ba]},
$asa3:function(){return[V.ba]}},
f7:{"^":"c;a,b,c,d,e,f,r,x,y,z,Q,ch,cx,cy,db,dx,dy,fr,fx,fy",
dZ:function(a0,a1){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a
z=new V.h5(this,null,null,null)
z.an(10,V.bo)
this.Q=z
z=new V.h1(this,null,null,null)
z.an(10,V.bb)
this.ch=z
z=new V.h4(this,null,null,null)
z.an(10,V.bn)
this.cx=z
z=new V.h2(this,null,null,null)
z.an(10,V.bg)
this.cy=z
z=new V.h3(this,null,null,null)
z.an(10,V.bh)
this.db=z
z=new V.h_(this,null,null,null)
z.an(10,V.b9)
this.dx=z
z=new V.h0(this,null,null,null)
z.an(10,V.ba)
this.dy=z
z=V.ay()
y=V.ay()
x=G.p()
w=G.p()
v=V.dz()
u=new Float64Array(H.b(2))
t=new Float64Array(H.b(2))
s=new Float64Array(H.b(2))
r=G.p()
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
this.fr=new V.eY(this,new V.cS(z,y,x,w,!1),v,new V.cT(new E.a(u),new E.a(t),0,0),new E.a(s),r,new E.a(q),new E.a(p),new V.eb(0,0),new V.eb(0,0),n,new E.a(m),new E.a(l),new E.a(k),new E.a(j),new E.a(i),new E.a(h),g,o,new E.a(f),new E.a(e),new V.J(d),new E.a(c),new E.a(b),a)
this.fx=new V.hK(V.dz(),new V.cS(V.ay(),V.ay(),G.p(),G.p(),!1),G.p(),G.p(),new V.cT(new E.a(new Float64Array(H.b(2))),new E.a(new Float64Array(H.b(2))),0,0),new V.hw(null,null,null,new E.a(new Float64Array(H.b(2))),new E.a(new Float64Array(H.b(2))),null,null,new E.a(new Float64Array(H.b(2))),new E.a(new Float64Array(H.b(2))),new E.a(new Float64Array(H.b(2))),new E.a(new Float64Array(H.b(2))),new E.a(new Float64Array(H.b(2))),new E.a(new Float64Array(H.b(2))),new E.a(new Float64Array(H.b(2))),new E.a(new Float64Array(H.b(2))),new E.a(new Float64Array(H.b(2))),new E.a(new Float64Array(H.b(2))),G.p(),G.p(),new E.a(new Float64Array(H.b(2))),new E.a(new Float64Array(H.b(2)))),P.aj(2,0,!1,P.l),new G.ao(new E.a(new Float64Array(H.b(2))),new E.a(new Float64Array(H.b(2))),new E.a(new Float64Array(H.b(2))),0,0,0),new G.ao(new E.a(new Float64Array(H.b(2))),new E.a(new Float64Array(H.b(2))),new E.a(new Float64Array(H.b(2))),0,0,0),this)
this.z=this},
q:{
f8:function(a,b){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c
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
z=new V.f7(u,t,s,p,r,q,y,x,w,null,null,null,null,null,null,null,null,null,null,new V.fd(new V.iB(v,o,n,m,0,new E.a(l),new E.a(k),new E.a(j),new E.a(i),new E.a(h),new E.a(g),new E.a(f),new E.a(e),new E.a(d),new E.a(c)),P.aj(3,0,!1,z),P.aj(3,0,!1,z),new E.a(new Float64Array(H.b(2))),new E.a(new Float64Array(H.b(2))),new E.a(new Float64Array(H.b(2))),new E.a(new Float64Array(H.b(2)))))
z.dZ(a,b)
return z}}},
a3:{"^":"c;$ti",
cJ:function(a){var z,y,x
z=new Array(a)
z.fixed$length=Array
y=H.f(z,[H.ab(this,"a3",0)])
z=this.a
if(z!=null)C.d.W(y,0,this.c,z,0)
for(z=y.length,x=0;x<z;++x)y[x]=this.S()
this.a=y
this.c=z},
cX:function(){var z,y
z=this.b
y=this.c
if(z>=y)this.cJ(y*2)
return this.a[this.b++]},
an:function(a,b){this.b=0
this.a=null
this.c=0
this.cJ(a)}},
L:{"^":"c;$ti",
aA:function(a,b,c){var z,y
for(z=this.a,y=0;y<a;++y)z[y]=this.S()}}}],["","",,F,{"^":"",
ex:function(a,b,c){var z
P.cc(b,c,a.length,null,null,null)
z=P.c1(H.dD(a,b,c,H.ac(a,0)),!0,null)
C.d.bE(z,"sort")
H.b_(z,0,z.length-1,P.j_());(a&&C.d).dl(a,b,c,z)}}],["","",,N,{"^":"",eQ:{"^":"f4;c,a,b",
b9:function(a,b,c){var z,y,x
this.cz(c)
for(z=J.A(a),y=this.b,x=0;x<b;++x)y.aa(z.h(a,x),z.h(a,x))
y=this.c
y.beginPath()
y.moveTo(J.aN(z.h(a,0)),J.aO(z.h(a,0)))
for(x=1;x<b;++x)y.lineTo(J.aN(z.h(a,x)),J.aO(z.h(a,x)))
y.lineTo(J.aN(z.h(a,0)),J.aO(z.h(a,0)))
y.closePath()},
Z:function(a,b,c){var z,y,x,w
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
y.aa(a,a)
y.aa(b,b)
z.beginPath()
y=a.a
z.moveTo(y[0],y[1])
y=b.a
z.lineTo(y[0],y[1])
z.closePath()
z.stroke()},
cz:function(a){var z,y,x,w
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
f3:function(a,b,c,d){throw H.e("Unimplemented")},
f4:function(a,b,c,d){throw H.e("Unimplemented")}}}],["","",,G,{"^":"",bQ:{"^":"c;m:a>,n:b>,c",
a6:function(a,b,c){this.a=C.c.U(C.a.al(a*255))
this.b=C.c.U(C.a.al(b*255))
this.c=C.c.U(C.a.al(c*255))}},aZ:{"^":"c;a,w:b<",
bl:function(a){this.a=Math.sin(a)
this.b=Math.cos(a)
return this},
j:function(a){return"Rot(s:"+H.d(this.a)+", c:"+H.d(this.b)+")"},
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
v[1]=-w*y[0]+z*y[1]}}},ao:{"^":"c;a,b,w:c<,d,D:e@,f",
j:function(a){return"Sweep:\nlocalCenter: "+this.a.j(0)+"\n"+("c0: "+this.b.j(0)+", c: "+this.c.j(0)+"\n")+("a0: "+H.d(this.d)+", a: "+H.d(this.e)+"\n")+("alpha0: "+H.d(this.f))},
T:function(){var z=6.283185307179586*C.j.al(this.d/6.283185307179586)
this.d-=z
this.e-=z},
A:function(a){this.a.i(a.a)
this.b.i(a.b)
this.c.i(a.c)
this.d=a.d
this.e=a.e
this.f=a.f
return this},
a9:function(a,b){var z,y,x,w,v,u
z=1-b
y=this.b.a
x=this.c.a
w=a.a.a
w[0]=z*y[0]+b*x[0]
w[1]=z*y[1]+b*x[1]
x=a.b
x.bl(z*this.d+b*this.e)
z=w[0]
y=x.b
v=this.a.a
u=v[0]
x=x.a
w[0]=z-(y*u-x*v[1])
w[1]=w[1]-(x*v[0]+y*v[1])},
aq:function(a){var z,y,x,w
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
this.f=a}},cg:{"^":"c;a"},hR:{"^":"c;a,b",
j:function(a){var z=this.b
return"XForm:\n"+("Position: "+this.a.j(0)+"\n")+("R: \t"+("Rot(s:"+H.d(z.a)+", c:"+H.d(z.b)+")")+"\n")},
q:{
p:function(){return new G.hR(new E.a(new Float64Array(H.b(2))),new G.aZ(0,1))},
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
y=$.$get$ci()
y.i(b.a)
y.v(a.a)
G.an(z,$.$get$ci(),c.a)}}},hW:{"^":"c;",
aa:function(a,b){var z,y,x,w,v,u,t,s,r
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
s.v(this.d)
w=t[0]
t=t[1]
r=b.a
r[0]=y*x+u+w
r[1]=v-z*x+-t}}}],["","",,X,{"^":"",eR:{"^":"hW;a,b,c,d"}}],["","",,A,{"^":"",
bD:function(a){var z,y
z=C.a2.fg(a,0,new A.j6())
y=536870911&z+((67108863&z)<<3)
y^=y>>>11
return 536870911&y+((16383&y)<<15)},
j6:{"^":"k:12;",
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
j:function(a){return"[0] "+this.aw(0).j(0)+"\n[1] "+this.aw(1).j(0)+"\n"},
h:function(a,b){return this.a[b]},
k:function(a,b,c){this.a[b]=c},
K:function(a,b){var z,y,x
if(b==null)return!1
if(b instanceof E.ak){z=this.a
y=z[0]
x=b.a
z=y===x[0]&&z[1]===x[1]&&z[2]===x[2]&&z[3]===x[3]}else z=!1
return z},
gI:function(a){return A.bD(this.a)},
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
x=b.gha()
z[0]=C.a.p(z[0],x.h(0,0))
z[1]=C.a.p(z[1],x.h(0,1))
z[2]=C.a.p(z[2],x.h(0,2))
z[3]=C.a.p(z[3],x.h(0,3))
return y},
G:function(){var z=this.a
z[0]=0
z[1]=0
z[2]=0
z[3]=0},
fs:function(){var z,y,x,w,v,u,t
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
j:function(a){return"[0] "+this.aw(0).j(0)+"\n[1] "+this.aw(1).j(0)+"\n[2] "+this.aw(2).j(0)+"\n"},
h:function(a,b){return this.a[b]},
k:function(a,b,c){this.a[b]=c},
K:function(a,b){var z,y,x
if(b==null)return!1
if(b instanceof E.aX){z=this.a
y=z[0]
x=b.a
z=y===x[0]&&z[1]===x[1]&&z[2]===x[2]&&z[3]===x[3]&&z[4]===x[4]&&z[5]===x[5]&&z[6]===x[6]&&z[7]===x[7]&&z[8]===x[8]}else z=!1
return z},
gI:function(a){return A.bD(this.a)},
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
x=b.ghb()
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
G:function(){var z=this.a
z[0]=0
z[1]=0
z[2]=0
z[3]=0
z[4]=0
z[5]=0
z[6]=0
z[7]=0
z[8]=0}},a:{"^":"c;a",
ac:function(a,b){var z=this.a
z[0]=a
z[1]=b},
G:function(){var z=this.a
z[0]=0
z[1]=0},
i:function(a){var z,y
z=a.a
y=this.a
y[1]=z[1]
y[0]=z[0]},
j:function(a){var z=this.a
return"["+H.d(z[0])+","+H.d(z[1])+"]"},
K:function(a,b){var z,y,x
if(b==null)return!1
if(b instanceof E.a){z=this.a
y=z[0]
x=b.a
z=y===x[0]&&z[1]===x[1]}else z=!1
return z},
gI:function(a){return A.bD(this.a)},
p:function(a,b){var z=new E.a(new Float64Array(H.b(2)))
z.i(this)
z.B(0,b)
return z},
h:function(a,b){return this.a[b]},
k:function(a,b,c){this.a[b]=c},
gt:function(a){return Math.sqrt(this.gaV())},
gaV:function(){var z,y
z=this.a
y=z[0]
z=z[1]
return y*y+z*z},
T:function(){var z,y,x
z=Math.sqrt(this.gaV())
if(z===0)return 0
y=1/z
x=this.a
x[0]=x[0]*y
x[1]=x[1]*y
return z},
bH:function(a){var z,y,x,w,v
z=this.a
y=z[0]
x=a.a
w=y-x[0]
v=z[1]-x[1]
return w*w+v*v},
u:function(a){var z,y
z=a.a
y=this.a
return y[0]*z[0]+y[1]*z[1]},
a2:function(a){var z,y
z=a.a
y=this.a
return y[0]*z[1]-y[1]*z[0]},
aK:function(a,b){var z,y,x
z=this.a
y=z[1]
z=z[0]
x=b.a
x[0]=-a*y
x[1]=a*z
return b},
B:function(a,b){var z,y
z=b.a
y=this.a
y[0]=y[0]+z[0]
y[1]=y[1]+z[1]},
v:function(a){var z,y
z=a.a
y=this.a
y[0]=y[0]-z[0]
y[1]=y[1]-z[1]},
F:function(a,b){var z=this.a
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
G:function(){var z=this.a
z[2]=0
z[1]=0
z[0]=0},
i:function(a){var z,y
z=a.a
y=this.a
y[0]=z[0]
y[1]=z[1]
y[2]=z[2]},
j:function(a){var z=this.a
return"["+H.d(z[0])+","+H.d(z[1])+","+H.d(z[2])+"]"},
K:function(a,b){var z,y,x
if(b==null)return!1
if(b instanceof E.aG){z=this.a
y=z[0]
x=b.a
z=y===x[0]&&z[1]===x[1]&&z[2]===x[2]}else z=!1
return z},
gI:function(a){return A.bD(this.a)},
p:function(a,b){var z,y,x
z=new Float64Array(H.b(3))
y=new E.aG(z)
y.i(this)
x=b.ghd()
z[0]=C.a.p(z[0],x.h(0,0))
z[1]=C.a.p(z[1],x.h(0,1))
z[2]=C.a.p(z[2],x.h(0,2))
return y},
h:function(a,b){return this.a[b]},
k:function(a,b,c){this.a[b]=c},
gt:function(a){var z,y,x
z=this.a
y=z[0]
x=z[1]
z=z[2]
return Math.sqrt(y*y+x*x+z*z)},
gm:function(a){return this.a[0]},
gn:function(a){return this.a[1]}}}],["","",,Q,{"^":"",f9:{"^":"c;",
h8:[function(a,b){var z,y,x,w,v,u,t
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
v.a.bV(v)
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
u.a5(C.c.ad((t-w.a)*1000,$.x))
u=w.b
w.a=u==null?$.r.$0():u
y.b.eL()
u=y.fr.c
t=w.b
if(t==null)t=$.r.$0()
u.a5(C.c.ad((t-w.a)*1000,$.x))
if(y.dy&&v.a>0){u=w.b
w.a=u==null?$.r.$0():u
y.fx.bp(v)
u=y.fr.d
t=w.b
if(t==null)t=$.r.$0()
u.a5(C.c.ad((t-w.a)*1000,$.x))
u=w.b
w.a=u==null?$.r.$0():u
y.bp(v)
u=y.fr.e
t=w.b
if(t==null)t=$.r.$0()
u.a5(C.c.ad((t-w.a)*1000,$.x))}if(y.db&&v.a>0){u=w.b
w.a=u==null?$.r.$0():u
y.dD(v)
u=y.fr.z
t=w.b
if(t==null)t=$.r.$0()
u.a5(C.c.ad((t-w.a)*1000,$.x))}if(v.a>0)y.cx=v.b
if((y.a&4)===4)y.eJ()
y.a&=4294967293
w=y.fr.a
v=x.b
if(v==null)v=$.r.$0()
w.a5(C.c.ad((v-x.a)*1000,$.x))
x=z.b
if(x==null)x=$.r.$0()
this.Q=C.c.ad((x-z.a)*1e6,$.x)
this.f.clearRect(0,0,900,600)
y.f2()
this.y=this.y+1
y=window
C.t.cn(y)
C.t.cv(y,W.ek(this.gc9(this)))},"$1","gc9",2,0,13],
fn:function(){var z,y,x,w
z=H.z(W.ic("canvas",null),"$iscM")
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
w=new X.eR(null,z,20,w)
w.a=!0
w.c=this.d
this.r=w
w=new N.eQ(this.f,2,w)
this.x=w
this.b.Q=w
this.y=0
this.z=y.querySelector("#fps-counter")
this.ch=y.querySelector("#world-step-time")
P.dP(P.cX(0,0,0,0,0,1),new Q.fa(this))
P.dP(P.cX(0,0,0,200,0,0),new Q.fb(this))},
e_:function(a,b,c){J.bH(document.querySelector("#title"),a)}},fa:{"^":"k:5;a",
$1:function(a){var z=this.a
J.bH(z.z,J.a1(z.y))
z.y=0}},fb:{"^":"k:5;a",
$1:function(a){var z,y
z=this.a
y=z.Q
if(y==null)return
J.bH(z.ch,H.d(y/1000)+" ms")}}}],["","",,T,{"^":"",
kR:[function(){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2,a3,a4,a5,a6,a7,a8,a9,b0,b1,b2,b3,b4,b5,b6,b7,b8,b9,c0,c1,c2,c3,c4,c5,c6,c7
z=[V.b7]
y=H.f([],z)
x=new Float64Array(H.b(2))
x[0]=0
x[1]=-10
w=V.f8(100,10)
v=V.f6(V.fj())
u=V.i3(4,4)
t=new P.bv(0,0)
if($.x==null){H.bq()
$.x=$.am}t.b1(0)
s=new P.bv(0,0)
if($.x==null){H.bq()
$.x=$.am}s.b1(0)
r=G.p()
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
b=new P.bv(0,0)
if($.x==null){H.bq()
$.x=$.am}b.b1(0)
a=V.be()
a0=V.be()
a1=new Float64Array(H.b(2))
a2=new Float64Array(H.b(2))
a3=V.ay()
a4=V.ay()
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
b9=C.c.U(C.c.al(102))
c0=C.c.U(C.c.al(102))
c1=C.c.U(C.c.al(255))
c2=new Float64Array(H.b(2))
c3=new Float64Array(H.b(2))
c4=new Float64Array(H.b(2))
c5=new Float64Array(H.b(2))
n=P.aQ(null,null,null,o,n)
o=new E.a(new Float64Array(H.b(2)))
o.i(new E.a(x))
c6=new V.hZ(0,null,null,null,0,0,o,!1,null,null,null,w,0,!1,!1,!1,!1,null,null,u,new V.dM(0,0,0,0,0,!1),new G.cg(t),new G.cg(s),new G.bQ(0,0,0),r,new E.a(q),new E.a(p),new V.e4(m),new V.i1(null,null),new V.i2(new V.dw(new E.a(l),0),new E.a(k),new E.a(j),null,null),new V.cd(new E.a(i),new E.a(h),0),new V.d5(null,null,null,null,null,null,0,0,0,0,0,0,g,new V.dA(null,null,null),new V.bf(null,null,0,null,null),f,new V.bf(null,null,0,null,null),new V.cO(e,d,0)),c,new G.cg(b),new V.d5(null,null,null,null,null,null,0,0,0,0,0,0,a,new V.dA(null,null,null),new V.bf(null,null,0,null,null),a0,new V.bf(null,null,0,null,null),new V.cO(a1,a2,0)),new V.hF(a3,a4,new G.ao(new E.a(a5),new E.a(a6),new E.a(a7),0,0,0),new G.ao(new E.a(a8),new E.a(a9),new E.a(b0),0,0,0),0),new V.hG(C.J,0),new V.dM(0,0,0,0,0,!1),z,new G.ao(new E.a(b1),new E.a(b2),new E.a(b3),0,0,0),new G.ao(new E.a(b4),new E.a(b5),new E.a(b6),0,0,0),0.12,-1,new E.a(b7),new E.a(b8),new G.bQ(b9,c0,c1),new E.a(c2),new E.a(c3),new E.a(c4),new E.a(c5),new V.e4(n))
c6.cy=!0
c6.db=!0
c6.dy=!0
c6.x=!0
c6.a=4
c6.b=V.f0(c6,v)
c6.fr=new V.hr(new V.Y(0,0,17976931348623157e292,-17976931348623157e292,0),new V.Y(0,0,17976931348623157e292,-17976931348623157e292,0),new V.Y(0,0,17976931348623157e292,-17976931348623157e292,0),new V.Y(0,0,17976931348623157e292,-17976931348623157e292,0),new V.Y(0,0,17976931348623157e292,-17976931348623157e292,0),new V.Y(0,0,17976931348623157e292,-17976931348623157e292,0),new V.Y(0,0,17976931348623157e292,-17976931348623157e292,0),new V.Y(0,0,17976931348623157e292,-17976931348623157e292,0),new V.Y(0,0,17976931348623157e292,-17976931348623157e292,0),new V.Y(0,0,17976931348623157e292,-17976931348623157e292,0))
c6.fx=V.hk(c6)
c6.es()
v=new P.bv(0,0)
if($.x==null){H.bq()
$.x=$.am}v.b1(0)
c7=new T.ff(null,y,c6,v,10,null,null,null,null,null,null,null,null)
c7.e_("Domino tower",null,10)
c7.fk(0)
c7.fn()
z=window
C.t.cn(z)
C.t.cv(z,W.ek(c7.gc9(c7)))},"$0","ep",0,0,2],
ff:{"^":"f9;cx,a,b,c,d,e,f,r,x,y,z,Q,ch",
av:function(a,b,c){var z,y,x,w,v
z=V.bp()
z.bm(0.1,0.5)
y=new V.bW(null,null,0.2,0,0,!1,new V.bj(1,65535,0))
y.a=z
y.e=this.cx
x=new Float64Array(2)
w=new V.bK(C.e,null,new E.a(x),0,new E.a(new Float64Array(2)),0,0,0,!0,!0,!1,!1,!0,1)
w.a=C.f
y.c=0.1
y.d=0.65
x=new Float64Array(2)
x[0]=a
x[1]=b
w.c=new E.a(x)
w.d=c?1.5707963267948966:0
v=this.b.bb(w)
v.bc(y)
this.a.push(v)},
fk:function(a){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l
z=V.bp()
z.bm(50,10)
y=new V.bK(C.e,null,new E.a(new Float64Array(H.b(2))),0,new E.a(new Float64Array(H.b(2))),0,0,0,!0,!0,!1,!1,!0,1)
x=new Float64Array(H.b(2))
x[0]=0
x[1]=-10
y.c=new E.a(x)
x=this.b
w=x.bb(y)
v=w.r1
v.a=z
v.e=0
w.bc(v)
v=this.a
v.push(w)
this.cx=10
z=V.bp()
z.bm(0.7,0.7)
u=new V.bW(null,null,0.2,0,0,!1,new V.bj(1,65535,0))
u.e=35
y=new V.bK(C.e,null,new E.a(new Float64Array(H.b(2))),0,new E.a(new Float64Array(H.b(2))),0,0,0,!0,!0,!1,!1,!0,1)
y.a=C.f
u.a=z
u.c=0
u.d=0.85
y.ch=!0
t=new Float64Array(H.b(2))
t[0]=30
t[1]=5
y.c=new E.a(t)
s=x.bb(y)
v.push(s)
s.bc(u)
t=new Float64Array(H.b(2))
t[0]=-25
t[1]=-25
s.scU(new E.a(t))
s.scD(6.7)
u.e=25
t=new Float64Array(H.b(2))
t[0]=-30
t[1]=25
y.c=new E.a(t)
s=x.bb(y)
v.push(s)
s.bc(u)
v=new Float64Array(H.b(2))
v[0]=35
v[1]=-10
s.scU(new E.a(v))
s.scD(-8.3)
for(r=0;r<25;++r){q=r*1.5-18.75
this.av(q,0.5,!1)
this.av(q,1.1,!0)}for(q=18.75,p=1;p<25;++p){if(p>3)this.cx=this.cx*0.8
o=0.5+1.386*p
for(x=25-p,v=o+0.6,t=o-0.6,n=x-1,m=1.5*x/2,l=o-0.2,r=0;r<x;++r){q=r*1.5-m
this.cx=this.cx*2.5
if(r===0)this.av(q-1.25+0.1,l,!1)
if(r===n)this.av(q+1.25-0.1,l,!1)
this.cx=this.cx/2.5
this.av(q,o,!1)
this.av(q,v,!0)
this.av(q,t,!0)}}}}},1],["","",,O,{"^":""}]]
setupProgram(dart,0,0)
J.q=function(a){if(typeof a=="number"){if(Math.floor(a)==a)return J.da.prototype
return J.d9.prototype}if(typeof a=="string")return J.aT.prototype
if(a==null)return J.db.prototype
if(typeof a=="boolean")return J.fK.prototype
if(a.constructor==Array)return J.aR.prototype
if(typeof a!="object"){if(typeof a=="function")return J.aU.prototype
return a}if(a instanceof P.c)return a
return J.bC(a)}
J.A=function(a){if(typeof a=="string")return J.aT.prototype
if(a==null)return a
if(a.constructor==Array)return J.aR.prototype
if(typeof a!="object"){if(typeof a=="function")return J.aU.prototype
return a}if(a instanceof P.c)return a
return J.bC(a)}
J.b5=function(a){if(a==null)return a
if(a.constructor==Array)return J.aR.prototype
if(typeof a!="object"){if(typeof a=="function")return J.aU.prototype
return a}if(a instanceof P.c)return a
return J.bC(a)}
J.cw=function(a){if(typeof a=="number")return J.aS.prototype
if(a==null)return a
if(!(a instanceof P.c))return J.b2.prototype
return a}
J.eq=function(a){if(typeof a=="number")return J.aS.prototype
if(typeof a=="string")return J.aT.prototype
if(a==null)return a
if(!(a instanceof P.c))return J.b2.prototype
return a}
J.j3=function(a){if(typeof a=="string")return J.aT.prototype
if(a==null)return a
if(!(a instanceof P.c))return J.b2.prototype
return a}
J.O=function(a){if(a==null)return a
if(typeof a!="object"){if(typeof a=="function")return J.aU.prototype
return a}if(a instanceof P.c)return a
return J.bC(a)}
J.eC=function(a,b){if(typeof a=="number"&&typeof b=="number")return a+b
return J.eq(a).p(a,b)}
J.a5=function(a,b){if(a==null)return b==null
if(typeof a!="object")return b!=null&&a===b
return J.q(a).K(a,b)}
J.T=function(a,b){if(typeof a=="number"&&typeof b=="number")return a>b
return J.cw(a).b0(a,b)}
J.cC=function(a,b){if(typeof a=="number"&&typeof b=="number")return a<b
return J.cw(a).N(a,b)}
J.cD=function(a,b){if(typeof b==="number")if(a.constructor==Array||typeof a=="string"||H.et(a,a[init.dispatchPropertyName]))if(b>>>0===b&&b<a.length)return a[b]
return J.A(a).h(a,b)}
J.eD=function(a,b,c){if(typeof b==="number")if((a.constructor==Array||H.et(a,a[init.dispatchPropertyName]))&&!a.immutable$list&&b>>>0===b&&b<a.length)return a[b]=c
return J.b5(a).k(a,b,c)}
J.eE=function(a,b){return J.eq(a).aF(a,b)}
J.cE=function(a,b){return J.b5(a).a_(a,b)}
J.eF=function(a){return J.O(a).geG(a)}
J.au=function(a){return J.q(a).gI(a)}
J.aM=function(a){return J.b5(a).gO(a)}
J.ad=function(a){return J.A(a).gt(a)}
J.eG=function(a){return J.O(a).gaI(a)}
J.eH=function(a){return J.O(a).gfB(a)}
J.eI=function(a){return J.O(a).gfO(a)}
J.aN=function(a){return J.O(a).gm(a)}
J.aO=function(a){return J.O(a).gn(a)}
J.eJ=function(a,b){return J.b5(a).cW(a,b)}
J.eK=function(a){return J.b5(a).fH(a)}
J.eL=function(a,b){return J.O(a).ab(a,b)}
J.cF=function(a,b){return J.O(a).sa7(a,b)}
J.bH=function(a,b){return J.O(a).scS(a,b)}
J.cG=function(a,b){return J.O(a).saI(a,b)}
J.bI=function(a,b){return J.O(a).sm(a,b)}
J.bJ=function(a,b){return J.O(a).sn(a,b)}
J.cH=function(a){return J.cw(a).U(a)}
J.eM=function(a){return J.j3(a).fS(a)}
J.a1=function(a){return J.q(a).j(a)}
I.as=function(a){a.immutable$list=Array
a.fixed$length=Array
return a}
var $=I.p
C.C=W.bL.prototype
C.N=J.h.prototype
C.d=J.aR.prototype
C.j=J.d9.prototype
C.c=J.da.prototype
C.b=J.db.prototype
C.a=J.aS.prototype
C.u=J.aT.prototype
C.U=J.aU.prototype
C.a2=H.h6.prototype
C.I=J.hn.prototype
C.L=W.hH.prototype
C.B=J.b2.prototype
C.t=W.hY.prototype
C.e=new V.bM(0,"BodyType.STATIC")
C.D=new V.bM(1,"BodyType.KINEMATIC")
C.f=new V.bM(2,"BodyType.DYNAMIC")
C.l=new P.iu()
C.E=new P.az(0)
C.o=new V.bT(0,"EPAxisType.UNKNOWN")
C.p=new V.bT(1,"EPAxisType.EDGE_A")
C.F=new V.bT(2,"EPAxisType.EDGE_B")
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
C.m=new V.c2(0,"ManifoldType.CIRCLES")
C.h=new V.c2(1,"ManifoldType.FACE_A")
C.q=new V.c2(2,"ManifoldType.FACE_B")
C.x=new V.ce(0,"SeparationFunctionType.POINTS")
C.y=new V.ce(1,"SeparationFunctionType.FACE_A")
C.z=new V.ce(2,"SeparationFunctionType.FACE_B")
C.k=new V.bu(0,"ShapeType.CIRCLE")
C.n=new V.bu(1,"ShapeType.EDGE")
C.i=new V.bu(2,"ShapeType.POLYGON")
C.r=new V.bu(3,"ShapeType.CHAIN")
C.J=new V.b1(0,"TOIOutputState.UNKNOWN")
C.K=new V.b1(1,"TOIOutputState.FAILED")
C.a3=new V.b1(2,"TOIOutputState.OVERLAPPED")
C.A=new V.b1(3,"TOIOutputState.TOUCHING")
C.a4=new V.b1(4,"TOIOutputState.SEPARATED")
C.M=new V.hV(0,"VertexType.ISOLATED")
$.ds="$cachedFunction"
$.dt="$cachedInvocation"
$.am=null
$.r=null
$.U=0
$.aw=null
$.cK=null
$.cy=null
$.el=null
$.ew=null
$.bA=null
$.bE=null
$.cz=null
$.aq=null
$.aI=null
$.aJ=null
$.cr=!1
$.N=C.l
$.d1=0
$.x=null
$.a2=null
$.bU=null
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
$.ju=1
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
I.$lazy(y,x,w)}})(["cR","$get$cR",function(){return H.er("_$dart_dartClosure")},"bY","$get$bY",function(){return H.er("_$dart_js")},"d6","$get$d6",function(){return H.fE()},"d7","$get$d7",function(){if(typeof WeakMap=="function")var z=new WeakMap()
else{z=$.d1
$.d1=z+1
z="expando$key$"+z}return new P.fp(null,z)},"dT","$get$dT",function(){return H.a_(H.bw({
toString:function(){return"$receiver$"}}))},"dU","$get$dU",function(){return H.a_(H.bw({$method$:null,
toString:function(){return"$receiver$"}}))},"dV","$get$dV",function(){return H.a_(H.bw(null))},"dW","$get$dW",function(){return H.a_(function(){var $argumentsExpr$='$arguments$'
try{null.$method$($argumentsExpr$)}catch(z){return z.message}}())},"e_","$get$e_",function(){return H.a_(H.bw(void 0))},"e0","$get$e0",function(){return H.a_(function(){var $argumentsExpr$='$arguments$'
try{(void 0).$method$($argumentsExpr$)}catch(z){return z.message}}())},"dY","$get$dY",function(){return H.a_(H.dZ(null))},"dX","$get$dX",function(){return H.a_(function(){try{null.$method$}catch(z){return z.message}}())},"e2","$get$e2",function(){return H.a_(H.dZ(void 0))},"e1","$get$e1",function(){return H.a_(function(){try{(void 0).$method$}catch(z){return z.message}}())},"ck","$get$ck",function(){return P.i4()},"aK","$get$aK",function(){return[]},"ed","$get$ed",function(){return P.dd(["A","ABBR","ACRONYM","ADDRESS","AREA","ARTICLE","ASIDE","AUDIO","B","BDI","BDO","BIG","BLOCKQUOTE","BR","BUTTON","CANVAS","CAPTION","CENTER","CITE","CODE","COL","COLGROUP","COMMAND","DATA","DATALIST","DD","DEL","DETAILS","DFN","DIR","DIV","DL","DT","EM","FIELDSET","FIGCAPTION","FIGURE","FONT","FOOTER","FORM","H1","H2","H3","H4","H5","H6","HEADER","HGROUP","HR","I","IFRAME","IMG","INPUT","INS","KBD","LABEL","LEGEND","LI","MAP","MARK","MENU","METER","NAV","NOBR","OL","OPTGROUP","OPTION","OUTPUT","P","PRE","PROGRESS","Q","S","SAMP","SECTION","SELECT","SMALL","SOURCE","SPAN","STRIKE","STRONG","SUB","SUMMARY","SUP","TABLE","TBODY","TD","TEXTAREA","TFOOT","TH","THEAD","TIME","TR","TRACK","TT","U","UL","VAR","VIDEO","WBR"],null)},"co","$get$co",function(){return P.dc()},"af","$get$af",function(){return E.e5()},"ci","$get$ci",function(){return E.e5()}])
I=I.$finishIsolateConstructor(I)
$=new I()
init.metadata=[]
init.types=[{func:1},{func:1,args:[,]},{func:1,v:true},{func:1,v:true,args:[{func:1,v:true}]},{func:1,ret:P.w,args:[P.l]},{func:1,args:[P.dN]},{func:1,ret:P.ct,args:[W.ag,P.w,P.w,W.cn]},{func:1,args:[,P.w]},{func:1,args:[P.w]},{func:1,args:[{func:1,v:true}]},{func:1,args:[,,]},{func:1,v:true,args:[W.o,W.o]},{func:1,args:[P.l,P.c]},{func:1,v:true,args:[P.P]},{func:1,ret:P.P},{func:1,ret:P.l,args:[P.u,P.u]},{func:1,ret:E.a},{func:1,ret:P.c},{func:1,ret:V.c8}]
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
if(x==y)H.js(d||a)
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
if(typeof dartMainRunner==="function")dartMainRunner(function(b){H.ey(T.ep(),b)},[])
else (function(b){H.ey(T.ep(),b)})([])})})()