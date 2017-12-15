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
if(a1==="C"){processStatics(init.statics[b2]=b3.C,b4)
delete b3.C}else if(a2===43){w[g]=a1.substring(1)
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
e.$callName=null}}function tearOffGetter(d,e,f,g){return g?new Function("funcs","reflectionInfo","name","H","c","return function tearOff_"+f+y+++"(x) {"+"if (c === null) c = "+"H.cB"+"("+"this, funcs, reflectionInfo, false, [x], name);"+"return new c(this, funcs[0], x, name);"+"}")(d,e,f,H,null):new Function("funcs","reflectionInfo","name","H","c","return function tearOff_"+f+y+++"() {"+"if (c === null) c = "+"H.cB"+"("+"this, funcs, reflectionInfo, false, [], name);"+"return new c(this, funcs[0], null, name);"+"}")(d,e,f,H,null)}function tearOff(d,e,f,a0,a1){var g
return f?function(){if(g===void 0)g=H.cB(this,d,e,true,[],a0).prototype
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
var dart=[["","",,H,{"^":"",ku:{"^":"c;a"}}],["","",,J,{"^":"",
u:function(a){return void 0},
bG:function(a,b,c,d){return{i:a,p:b,e:c,x:d}},
bD:function(a){var z,y,x,w,v
z=a[init.dispatchPropertyName]
if(z==null)if($.cF==null){H.jB()
z=a[init.dispatchPropertyName]}if(z!=null){y=z.p
if(!1===y)return z.i
if(!0===y)return a
x=Object.getPrototypeOf(a)
if(y===x)return z.i
if(z.e===x)throw H.f(new P.eg("Return interceptor for "+H.d(y(a,z))))}w=a.constructor
v=w==null?null:w[$.$get$c_()]
if(v!=null)return v
v=H.jJ(a)
if(v!=null)return v
if(typeof a=="function")return C.a_
y=Object.getPrototypeOf(a)
if(y==null)return C.O
if(y===Object.prototype)return C.O
if(typeof w=="function"){Object.defineProperty(w,$.$get$c_(),{value:C.E,enumerable:false,writable:true,configurable:true})
return C.E}return C.E},
h:{"^":"c;",
Z:function(a,b){return a===b},
gW:function(a){return H.am(a)},
m:["el",function(a){return H.bs(a)}],
"%":"AnimationEvent|AnimationPlayerEvent|ApplicationCacheErrorEvent|AudioProcessingEvent|AutocompleteErrorEvent|BeforeInstallPromptEvent|BeforeUnloadEvent|Blob|BlobEvent|CanvasGradient|CanvasPattern|CanvasRenderingContext2D|ClipboardEvent|CloseEvent|CompositionEvent|CustomEvent|DOMError|DOMImplementation|DeviceLightEvent|DeviceMotionEvent|DeviceOrientationEvent|DragEvent|ErrorEvent|Event|ExtendableEvent|ExtendableMessageEvent|FetchEvent|File|FileError|FocusEvent|FontFaceSetLoadEvent|GamepadEvent|GeofencingEvent|HashChangeEvent|IDBVersionChangeEvent|InputEvent|InstallEvent|KeyboardEvent|MIDIConnectionEvent|MIDIMessageEvent|MediaEncryptedEvent|MediaError|MediaKeyMessageEvent|MediaQueryListEvent|MediaStreamEvent|MediaStreamTrackEvent|MessageEvent|MouseEvent|NavigatorUserMediaError|NotificationEvent|OfflineAudioCompletionEvent|PageTransitionEvent|PointerEvent|PopStateEvent|PositionError|PresentationConnectionAvailableEvent|PresentationConnectionCloseEvent|ProgressEvent|PromiseRejectionEvent|PushEvent|PushMessageData|RTCDTMFToneChangeEvent|RTCDataChannelEvent|RTCIceCandidateEvent|RTCPeerConnectionIceEvent|Range|RelatedEvent|ResourceProgressEvent|SQLError|SVGAnimatedEnumeration|SVGAnimatedLength|SVGAnimatedLengthList|SVGAnimatedNumber|SVGAnimatedNumberList|SVGAnimatedString|SVGAnimatedTransformList|SVGZoomEvent|SecurityPolicyViolationEvent|ServicePortConnectEvent|ServiceWorkerMessageEvent|SpeechRecognitionError|SpeechRecognitionEvent|SpeechSynthesisEvent|StorageEvent|StorageManager|SyncEvent|TextEvent|TouchEvent|TrackEvent|TransitionEvent|UIEvent|USBConnectionEvent|WebGLContextEvent|WebKitTransitionEvent|WheelEvent"},
h0:{"^":"h;",
m:function(a){return String(a)},
gW:function(a){return a?519018:218159},
$iscz:1},
dk:{"^":"h;",
Z:function(a,b){return null==b},
m:function(a){return"null"},
gW:function(a){return 0}},
c0:{"^":"h;",
gW:function(a){return 0},
m:["en",function(a){return String(a)}],
$ish1:1},
hH:{"^":"c0;"},
b6:{"^":"c0;"},
b_:{"^":"c0;",
m:function(a){var z=a[$.$get$cY()]
return z==null?this.en(a):J.aa(z)},
$S:function(){return{func:1,opt:[,,,,,,,,,,,,,,,,]}}},
aX:{"^":"h;$ti",
bX:function(a,b){if(!!a.immutable$list)throw H.f(new P.M(b))},
fn:function(a,b){if(!!a.fixed$length)throw H.f(new P.M(b))},
dj:function(a,b){return new H.c6(a,b,[H.af(a,0),null])},
al:function(a,b){return a[b]},
gfW:function(a){if(a.length>0)return a[0]
throw H.f(H.bZ())},
a7:function(a,b,c,d,e){var z,y,x,w
this.bX(a,"setRange")
P.cg(b,c,a.length,null,null,null)
z=c-b
if(z===0)return
if(e<0)H.w(P.a6(e,0,null,"skipCount",null))
if(!!J.u(d).$isk){y=e
x=d}else{d.toString
x=H.dQ(d,e,null,H.af(d,0)).ca(0,!1)
y=0}if(y+z>x.length)throw H.f(H.fY())
if(y<b)for(w=z-1;w>=0;--w)a[b+w]=x[y+w]
else for(w=0;w<z;++w)a[b+w]=x[y+w]},
dW:function(a,b,c,d){return this.a7(a,b,c,d,0)},
cX:function(a,b){var z,y
z=a.length
for(y=0;y<z;++y){if(b.$1(a[y]))return!0
if(a.length!==z)throw H.f(new P.a1(a))}return!1},
a3:function(a,b){var z
for(z=0;z<a.length;++z)if(J.Z(a[z],b))return!0
return!1},
m:function(a){return P.bn(a,"[","]")},
ga2:function(a){return new J.f0(a,a.length,0,null)},
gW:function(a){return H.am(a)},
gG:function(a){return a.length},
sG:function(a,b){this.fn(a,"set length")
if(b<0)throw H.f(P.a6(b,0,null,"newLength",null))
a.length=b},
i:function(a,b){if(typeof b!=="number"||Math.floor(b)!==b)throw H.f(H.C(a,b))
if(b>=a.length||b<0)throw H.f(H.C(a,b))
return a[b]},
n:function(a,b,c){this.bX(a,"indexed set")
if(typeof b!=="number"||Math.floor(b)!==b)throw H.f(H.C(a,b))
if(b>=a.length||b<0)throw H.f(H.C(a,b))
a[b]=c},
$isF:1,
$asF:I.I,
$isi:1,
$asi:null,
$isk:1,
$ask:null,
C:{
h_:function(a,b){var z
if(typeof a!=="number"||Math.floor(a)!==a)throw H.f(P.cP(a,"length","is not an integer"))
if(a<0||a>4294967295)throw H.f(P.a6(a,0,4294967295,"length",null))
z=H.e(new Array(a),[b])
z.fixed$length=Array
return z}}},
kt:{"^":"aX;$ti"},
f0:{"^":"c;a,b,c,d",
gP:function(){return this.d},
M:function(){var z,y,x
z=this.a
y=z.length
if(this.b!==y)throw H.f(H.eN(z))
x=this.c
if(x>=y){this.d=null
return!1}this.d=z[x]
this.c=x+1
return!0}},
aY:{"^":"h;",
b6:function(a,b){var z
if(typeof b!=="number")throw H.f(H.a8(b))
if(a<b)return-1
else if(a>b)return 1
else if(a===b){if(a===0){z=this.gc4(b)
if(this.gc4(a)===z)return 0
if(this.gc4(a))return-1
return 1}return 0}else if(isNaN(a)){if(isNaN(b))return 0
return 1}else return-1},
gc4:function(a){return a===0?1/a<0:a<0},
a6:function(a){var z
if(a>=-2147483648&&a<=2147483647)return a|0
if(isFinite(a)){z=a<0?Math.ceil(a):Math.floor(a)
return z+0}throw H.f(new P.M(""+a+".toInt()"))},
aL:function(a){var z,y
if(a>=0){if(a<=2147483647)return a|0}else if(a>=-2147483648){z=a|0
return a===z?z:z-1}y=Math.floor(a)
if(isFinite(y))return y
throw H.f(new P.M(""+a+".floor()"))},
m:function(a){if(a===0&&1/a<0)return"-0.0"
else return""+a},
gW:function(a){return a&0x1FFFFFFF},
A:function(a,b){return a+b},
H:function(a,b){if(typeof b!=="number")throw H.f(H.a8(b))
return a-b},
dC:function(a,b){return a/b},
B:function(a,b){if(typeof b!=="number")throw H.f(H.a8(b))
return a*b},
aC:function(a,b){if(typeof b!=="number")throw H.f(H.a8(b))
if((a|0)===a)if(b>=1||!1)return a/b|0
return this.cU(a,b)},
aG:function(a,b){return(a|0)===a?a/b|0:this.cU(a,b)},
cU:function(a,b){var z=a/b
if(z>=-2147483648&&z<=2147483647)return z|0
if(z>0){if(z!==1/0)return Math.floor(z)}else if(z>-1/0)return Math.ceil(z)
throw H.f(new P.M("Result of truncating division is "+H.d(z)+": "+H.d(a)+" ~/ "+b))},
b3:function(a,b){var z
if(a>0)z=b>31?0:a>>>b
else{z=b>31?31:b
z=a>>z>>>0}return z},
co:function(a,b){return(a|b)>>>0},
a0:function(a,b){if(typeof b!=="number")throw H.f(H.a8(b))
return a<b},
bE:function(a,b){if(typeof b!=="number")throw H.f(H.a8(b))
return a>b},
$isS:1},
dj:{"^":"aY;",$ism:1,$isS:1},
di:{"^":"aY;",$isS:1},
aZ:{"^":"h;",
eR:function(a,b){if(b>=a.length)throw H.f(H.C(a,b))
return a.charCodeAt(b)},
A:function(a,b){return a+b},
eh:function(a,b,c){var z
if(c>a.length)throw H.f(P.a6(c,0,a.length,null,null))
z=c+b.length
if(z>a.length)return!1
return b===a.substring(c,z)},
eg:function(a,b){return this.eh(a,b,0)},
cz:function(a,b,c){if(c==null)c=a.length
if(b<0)throw H.f(P.bt(b,null,null))
if(b>c)throw H.f(P.bt(b,null,null))
if(c>a.length)throw H.f(P.bt(c,null,null))
return a.substring(b,c)},
ek:function(a,b){return this.cz(a,b,null)},
hz:function(a){return a.toLowerCase()},
b6:function(a,b){var z
if(typeof b!=="string")throw H.f(H.a8(b))
if(a===b)z=0
else z=a<b?-1:1
return z},
m:function(a){return a},
gW:function(a){var z,y,x
for(z=a.length,y=0,x=0;x<z;++x){y=536870911&y+a.charCodeAt(x)
y=536870911&y+((524287&y)<<10)
y^=y>>6}y=536870911&y+((67108863&y)<<3)
y^=y>>11
return 536870911&y+((16383&y)<<15)},
gG:function(a){return a.length},
i:function(a,b){if(b>=a.length||!1)throw H.f(H.C(a,b))
return a[b]},
$isF:1,
$asF:I.I,
$isz:1}}],["","",,H,{"^":"",
bZ:function(){return new P.b4("No element")},
fZ:function(){return new P.b4("Too many elements")},
fY:function(){return new P.b4("Too few elements")},
b3:function(a,b,c,d){if(c-b<=32)H.hY(a,b,c,d)
else H.hX(a,b,c,d)},
hY:function(a,b,c,d){var z,y,x,w,v
for(z=b+1,y=J.A(a);z<=c;++z){x=y.i(a,z)
w=z
while(!0){if(!(w>b&&J.a_(d.$2(y.i(a,w-1),x),0)))break
v=w-1
y.n(a,w,y.i(a,v))
w=v}y.n(a,w,x)}},
hX:function(a,b,c,d){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e
z=C.c.aG(c-b+1,6)
y=b+z
x=c-z
w=C.c.aG(b+c,2)
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
p=n}t.n(a,y,s)
t.n(a,w,q)
t.n(a,x,o)
t.n(a,v,t.i(a,b))
t.n(a,u,t.i(a,c))
m=b+1
l=c-1
if(J.Z(d.$2(r,p),0)){for(k=m;k<=l;++k){j=t.i(a,k)
i=d.$2(j,r)
if(i===0)continue
if(i<0){if(k!==m){t.n(a,k,t.i(a,m))
t.n(a,m,j)}++m}else for(;!0;){i=d.$2(t.i(a,l),r)
if(i>0){--l
continue}else{h=l-1
if(i<0){t.n(a,k,t.i(a,m))
g=m+1
t.n(a,m,t.i(a,l))
t.n(a,l,j)
l=h
m=g
break}else{t.n(a,k,t.i(a,l))
t.n(a,l,j)
l=h
break}}}}f=!0}else{for(k=m;k<=l;++k){j=t.i(a,k)
if(d.$2(j,r)<0){if(k!==m){t.n(a,k,t.i(a,m))
t.n(a,m,j)}++m}else if(d.$2(j,p)>0)for(;!0;)if(d.$2(t.i(a,l),p)>0){--l
if(l<k)break
continue}else{h=l-1
if(d.$2(t.i(a,l),r)<0){t.n(a,k,t.i(a,m))
g=m+1
t.n(a,m,t.i(a,l))
t.n(a,l,j)
m=g}else{t.n(a,k,t.i(a,l))
t.n(a,l,j)}l=h
break}}f=!1}e=m-1
t.n(a,b,t.i(a,e))
t.n(a,e,r)
e=l+1
t.n(a,c,t.i(a,e))
t.n(a,e,p)
H.b3(a,b,m-2,d)
H.b3(a,l+2,c,d)
if(f)return
if(m<y&&l>x){for(;J.Z(d.$2(t.i(a,m),r),0);)++m
for(;J.Z(d.$2(t.i(a,l),p),0);)--l
for(k=m;k<=l;++k){j=t.i(a,k)
if(d.$2(j,r)===0){if(k!==m){t.n(a,k,t.i(a,m))
t.n(a,m,j)}++m}else if(d.$2(j,p)===0)for(;!0;)if(d.$2(t.i(a,l),p)===0){--l
if(l<k)break
continue}else{h=l-1
if(d.$2(t.i(a,l),r)<0){t.n(a,k,t.i(a,m))
g=m+1
t.n(a,m,t.i(a,l))
t.n(a,l,j)
m=g}else{t.n(a,k,t.i(a,l))
t.n(a,l,j)}l=h
break}}H.b3(a,m,l,d)}else H.b3(a,m,l,d)},
i:{"^":"a2;$ti",$asi:null},
b0:{"^":"i;$ti",
ga2:function(a){return new H.ds(this,this.gG(this),0,null)},
ce:function(a,b){return this.em(0,b)},
ca:function(a,b){var z,y
z=H.e([],[H.an(this,"b0",0)])
C.d.sG(z,this.gG(this))
for(y=0;y<this.gG(this);++y)z[y]=this.al(0,y)
return z},
hy:function(a){return this.ca(a,!0)}},
i_:{"^":"b0;a,b,c,$ti",
geZ:function(){var z,y
z=J.ao(this.a)
y=this.c
if(y==null||y>z)return z
return y},
gff:function(){var z,y
z=J.ao(this.a)
y=this.b
if(y>z)return z
return y},
gG:function(a){var z,y,x
z=J.ao(this.a)
y=this.b
if(y>=z)return 0
x=this.c
if(x==null||x>=z)return z-y
return x-y},
al:function(a,b){var z=this.gff()+b
if(b<0||z>=this.geZ())throw H.f(P.aL(b,this,"index",null,null))
return J.cK(this.a,z)},
ca:function(a,b){var z,y,x,w,v,u,t,s
z=this.b
y=this.a
x=J.A(y)
w=x.gG(y)
v=this.c
if(v!=null&&v<w)w=v
u=w-z
if(u<0)u=0
t=H.e(new Array(u),this.$ti)
for(s=0;s<u;++s){t[s]=x.al(y,z+s)
if(x.gG(y)<w)throw H.f(new P.a1(this))}return t},
eH:function(a,b,c,d){var z,y
z=this.b
if(z<0)H.w(P.a6(z,0,null,"start",null))
y=this.c
if(y!=null){if(y<0)H.w(P.a6(y,0,null,"end",null))
if(z>y)throw H.f(P.a6(z,0,y,"start",null))}},
C:{
dQ:function(a,b,c,d){var z=new H.i_(a,b,c,[d])
z.eH(a,b,c,d)
return z}}},
ds:{"^":"c;a,b,c,d",
gP:function(){return this.d},
M:function(){var z,y,x,w
z=this.a
y=J.A(z)
x=y.gG(z)
if(this.b!==x)throw H.f(new P.a1(z))
w=this.c
if(w>=x){this.d=null
return!1}this.d=y.al(z,w);++this.c
return!0}},
du:{"^":"a2;a,b,$ti",
ga2:function(a){return new H.ha(null,J.aT(this.a),this.b,this.$ti)},
gG:function(a){return J.ao(this.a)},
$asa2:function(a,b){return[b]},
C:{
c5:function(a,b,c,d){if(!!a.$isi)return new H.fB(a,b,[c,d])
return new H.du(a,b,[c,d])}}},
fB:{"^":"du;a,b,$ti",$isi:1,
$asi:function(a,b){return[b]}},
ha:{"^":"dh;a,b,c,$ti",
M:function(){var z=this.b
if(z.M()){this.a=this.c.$1(z.gP())
return!0}this.a=null
return!1},
gP:function(){return this.a}},
c6:{"^":"b0;a,b,$ti",
gG:function(a){return J.ao(this.a)},
al:function(a,b){return this.b.$1(J.cK(this.a,b))},
$asi:function(a,b){return[b]},
$asb0:function(a,b){return[b]},
$asa2:function(a,b){return[b]}},
ek:{"^":"a2;a,b,$ti",
ga2:function(a){return new H.il(J.aT(this.a),this.b,this.$ti)}},
il:{"^":"dh;a,b,$ti",
M:function(){var z,y
for(z=this.a,y=this.b;z.M();)if(y.$1(z.gP()))return!0
return!1},
gP:function(){return this.a.gP()}},
da:{"^":"c;$ti"}}],["","",,H,{"^":"",
b8:function(a,b){var z=a.bg(b)
if(!init.globalState.d.cy)init.globalState.f.bm()
return z},
eL:function(a,b){var z,y,x,w,v,u
z={}
z.a=b
if(b==null){b=[]
z.a=b
y=b}else y=b
if(!J.u(y).$isk)throw H.f(P.cO("Arguments to main must be a List: "+H.d(y)))
init.globalState=new H.iO(0,0,1,null,null,null,null,null,null,null,null,null,a)
y=init.globalState
x=self.window==null
w=self.Worker
v=x&&!!self.postMessage
y.x=v
v=!v
if(v)w=w!=null&&$.$get$df()!=null
else w=!0
y.y=w
y.r=x&&v
y.f=new H.iD(P.c2(null,H.b7),0)
x=P.m
y.z=new H.at(0,null,null,null,null,null,0,[x,H.cv])
y.ch=new H.at(0,null,null,null,null,null,0,[x,null])
if(y.x){w=new H.iN()
y.Q=w
self.onmessage=function(c,d){return function(e){c(d,e)}}(H.fR,w)
self.dartPrint=self.dartPrint||function(c){return function(d){if(self.console&&self.console.log)self.console.log(d)
else self.postMessage(c(d))}}(H.iP)}if(init.globalState.x)return
y=init.globalState.a++
w=P.a3(null,null,null,x)
v=new H.bu(0,null,!1)
u=new H.cv(y,new H.at(0,null,null,null,null,null,0,[x,H.bu]),w,init.createNewIsolate(),v,new H.ap(H.bH()),new H.ap(H.bH()),!1,!1,[],P.a3(null,null,null,null),null,null,!1,!0,P.a3(null,null,null,null))
w.p(0,0)
u.cC(0,v)
init.globalState.e=u
init.globalState.z.n(0,y,u)
init.globalState.d=u
if(H.bC(a,{func:1,args:[P.av]}))u.bg(new H.jO(z,a))
else if(H.bC(a,{func:1,args:[P.av,P.av]}))u.bg(new H.jP(z,a))
else u.bg(a)
init.globalState.f.bm()},
fV:function(){var z=init.currentScript
if(z!=null)return String(z.src)
if(init.globalState.x)return H.fW()
return},
fW:function(){var z,y
z=new Error().stack
if(z==null){z=function(){try{throw new Error()}catch(x){return x.stack}}()
if(z==null)throw H.f(new P.M("No stack trace"))}y=z.match(new RegExp("^ *at [^(]*\\((.*):[0-9]*:[0-9]*\\)$","m"))
if(y!=null)return y[1]
y=z.match(new RegExp("^[^@]*@(.*):[0-9]*$","m"))
if(y!=null)return y[1]
throw H.f(new P.M('Cannot extract URI from "'+z+'"'))},
fR:function(a,b){var z,y,x,w,v,u,t,s,r,q,p,o,n
z=new H.by(!0,[]).aT(b.data)
y=J.A(z)
switch(y.i(z,"command")){case"start":init.globalState.b=y.i(z,"id")
x=y.i(z,"functionName")
w=x==null?init.globalState.cx:init.globalFunctions[x]()
v=y.i(z,"args")
u=new H.by(!0,[]).aT(y.i(z,"msg"))
t=y.i(z,"isSpawnUri")
s=y.i(z,"startPaused")
r=new H.by(!0,[]).aT(y.i(z,"replyTo"))
y=init.globalState.a++
q=P.m
p=P.a3(null,null,null,q)
o=new H.bu(0,null,!1)
n=new H.cv(y,new H.at(0,null,null,null,null,null,0,[q,H.bu]),p,init.createNewIsolate(),o,new H.ap(H.bH()),new H.ap(H.bH()),!1,!1,[],P.a3(null,null,null,null),null,null,!1,!0,P.a3(null,null,null,null))
p.p(0,0)
n.cC(0,o)
init.globalState.f.a.aD(new H.b7(n,new H.fS(w,v,u,t,s,r),"worker-start"))
init.globalState.d=n
init.globalState.f.bm()
break
case"spawn-worker":break
case"message":if(y.i(z,"port")!=null)J.eY(y.i(z,"port"),y.i(z,"msg"))
init.globalState.f.bm()
break
case"close":init.globalState.ch.bl(0,$.$get$dg().i(0,a))
a.terminate()
init.globalState.f.bm()
break
case"log":H.fQ(y.i(z,"msg"))
break
case"print":if(init.globalState.x){y=init.globalState.Q
q=P.aM(["command","print","msg",z])
q=new H.az(!0,P.aO(null,P.m)).am(q)
y.toString
self.postMessage(q)}else P.cH(y.i(z,"msg"))
break
case"error":throw H.f(y.i(z,"msg"))}},
fQ:function(a){var z,y,x,w
if(init.globalState.x){y=init.globalState.Q
x=P.aM(["command","log","msg",a])
x=new H.az(!0,P.aO(null,P.m)).am(x)
y.toString
self.postMessage(x)}else try{self.console.log(a)}catch(w){H.Y(w)
z=H.ba(w)
y=P.bl(z)
throw H.f(y)}},
fT:function(a,b,c,d,e,f){var z,y,x,w
z=init.globalState.d
y=z.a
$.dF=$.dF+("_"+y)
$.dG=$.dG+("_"+y)
y=z.e
x=init.globalState.d.a
w=z.f
f.aB(0,["spawned",new H.bz(y,x),w,z.r])
x=new H.fU(a,b,c,d,z)
if(e){z.cW(w,w)
init.globalState.f.a.aD(new H.b7(z,x,"start isolate"))}else x.$0()},
j4:function(a){return new H.by(!0,[]).aT(new H.az(!1,P.aO(null,P.m)).am(a))},
jO:{"^":"l:0;a,b",
$0:function(){this.b.$1(this.a.a)}},
jP:{"^":"l:0;a,b",
$0:function(){this.b.$2(this.a.a,null)}},
iO:{"^":"c;a,b,c,d,e,f,r,x,y,z,Q,ch,cx",C:{
iP:function(a){var z=P.aM(["command","print","msg",a])
return new H.az(!0,P.aO(null,P.m)).am(z)}}},
cv:{"^":"c;a,b,c,h8:d<,fw:e<,f,r,x,y,z,Q,ch,cx,cy,db,dx",
cW:function(a,b){if(!this.f.Z(0,a))return
if(this.Q.p(0,b)&&!this.y)this.y=!0
this.bU()},
hq:function(a){var z,y,x,w,v
if(!this.y)return
z=this.Q
z.bl(0,a)
if(z.a===0){for(z=this.z;z.length!==0;){y=z.pop()
x=init.globalState.f.a
w=x.b
v=x.a
w=(w-1&v.length-1)>>>0
x.b=w
v[w]=y
if(w===x.c)x.cO();++x.d}this.y=!1}this.bU()},
fi:function(a,b){var z,y,x
if(this.ch==null)this.ch=[]
for(z=J.u(a),y=0;x=this.ch,y<x.length;y+=2)if(z.Z(a,x[y])){this.ch[y+1]=b
return}x.push(a)
this.ch.push(b)},
hp:function(a){var z,y,x
if(this.ch==null)return
for(z=J.u(a),y=0;x=this.ch,y<x.length;y+=2)if(z.Z(a,x[y])){z=this.ch
x=y+2
z.toString
if(typeof z!=="object"||z===null||!!z.fixed$length)H.w(new P.M("removeRange"))
P.cg(y,x,z.length,null,null,null)
z.splice(y,x-y)
return}},
dV:function(a,b){if(!this.r.Z(0,a))return
this.db=b},
h_:function(a,b,c){var z
if(b!==0)z=b===1&&!this.cy
else z=!0
if(z){a.aB(0,c)
return}z=this.cx
if(z==null){z=P.c2(null,null)
this.cx=z}z.aD(new H.iI(a,c))},
fZ:function(a,b){var z
if(!this.r.Z(0,a))return
if(b!==0)z=b===1&&!this.cy
else z=!0
if(z){this.c7()
return}z=this.cx
if(z==null){z=P.c2(null,null)
this.cx=z}z.aD(this.gh9())},
h0:function(a,b){var z,y,x
z=this.dx
if(z.a===0){if(this.db&&this===init.globalState.e)return
if(self.console&&self.console.error)self.console.error(a,b)
else{P.cH(a)
if(b!=null)P.cH(b)}return}y=new Array(2)
y.fixed$length=Array
y[0]=J.aa(a)
y[1]=b==null?null:b.m(0)
for(x=new P.er(z,z.r,null,null),x.c=z.e;x.M();)x.d.aB(0,y)},
bg:function(a){var z,y,x,w,v,u,t
z=init.globalState.d
init.globalState.d=this
$=this.d
y=null
x=this.cy
this.cy=!0
try{y=a.$0()}catch(u){w=H.Y(u)
v=H.ba(u)
this.h0(w,v)
if(this.db){this.c7()
if(this===init.globalState.e)throw u}}finally{this.cy=x
init.globalState.d=z
if(z!=null)$=z.gh8()
if(this.cx!=null)for(;t=this.cx,!t.gbk(t);)this.cx.dt().$0()}return y},
di:function(a){return this.b.i(0,a)},
cC:function(a,b){var z=this.b
if(z.b7(a))throw H.f(P.bl("Registry: ports must be registered only once."))
z.n(0,a,b)},
bU:function(){var z=this.b
if(z.gG(z)-this.c.a>0||this.y||!this.x)init.globalState.z.n(0,this.a,this)
else this.c7()},
c7:[function(){var z,y,x
z=this.cx
if(z!=null)z.b5(0)
for(z=this.b,y=z.gdA(z),y=y.ga2(y);y.M();)y.gP().eQ()
z.b5(0)
this.c.b5(0)
init.globalState.z.bl(0,this.a)
this.dx.b5(0)
if(this.ch!=null){for(x=0;z=this.ch,x<z.length;x+=2)z[x].aB(0,z[x+1])
this.ch=null}},"$0","gh9",0,0,2]},
iI:{"^":"l:2;a,b",
$0:function(){this.a.aB(0,this.b)}},
iD:{"^":"c;a,b",
fC:function(){var z=this.a
if(z.b===z.c)return
return z.dt()},
dv:function(){var z,y,x
z=this.fC()
if(z==null){if(init.globalState.e!=null)if(init.globalState.z.b7(init.globalState.e.a))if(init.globalState.r){y=init.globalState.e.b
y=y.gbk(y)}else y=!1
else y=!1
else y=!1
if(y)H.w(P.bl("Program exited with open ReceivePorts."))
y=init.globalState
if(y.x){x=y.z
x=x.gbk(x)&&y.f.b===0}else x=!1
if(x){y=y.Q
x=P.aM(["command","close"])
x=new H.az(!0,new P.es(0,null,null,null,null,null,0,[null,P.m])).am(x)
y.toString
self.postMessage(x)}return!1}z.hj()
return!0},
cS:function(){if(self.window!=null)new H.iE(this).$0()
else for(;this.dv(););},
bm:function(){var z,y,x,w,v
if(!init.globalState.x)this.cS()
else try{this.cS()}catch(x){z=H.Y(x)
y=H.ba(x)
w=init.globalState.Q
v=P.aM(["command","error","msg",H.d(z)+"\n"+H.d(y)])
v=new H.az(!0,P.aO(null,P.m)).am(v)
w.toString
self.postMessage(v)}}},
iE:{"^":"l:2;a",
$0:function(){if(!this.a.dv())return
P.ib(C.H,this)}},
b7:{"^":"c;a,b,c",
hj:function(){var z=this.a
if(z.y){z.z.push(this)
return}z.bg(this.b)}},
iN:{"^":"c;"},
fS:{"^":"l:0;a,b,c,d,e,f",
$0:function(){H.fT(this.a,this.b,this.c,this.d,this.e,this.f)}},
fU:{"^":"l:2;a,b,c,d,e",
$0:function(){var z,y
z=this.e
z.x=!0
if(!this.d)this.a.$1(this.c)
else{y=this.a
if(H.bC(y,{func:1,args:[P.av,P.av]}))y.$2(this.b,this.c)
else if(H.bC(y,{func:1,args:[P.av]}))y.$1(this.b)
else y.$0()}z.bU()}},
em:{"^":"c;"},
bz:{"^":"em;b,a",
aB:function(a,b){var z,y,x
z=init.globalState.z.i(0,this.a)
if(z==null)return
y=this.b
if(y.c)return
x=H.j4(b)
if(z.gfw()===y){y=J.A(x)
switch(y.i(x,0)){case"pause":z.cW(y.i(x,1),y.i(x,2))
break
case"resume":z.hq(y.i(x,1))
break
case"add-ondone":z.fi(y.i(x,1),y.i(x,2))
break
case"remove-ondone":z.hp(y.i(x,1))
break
case"set-errors-fatal":z.dV(y.i(x,1),y.i(x,2))
break
case"ping":z.h_(y.i(x,1),y.i(x,2),y.i(x,3))
break
case"kill":z.fZ(y.i(x,1),y.i(x,2))
break
case"getErrors":y=y.i(x,1)
z.dx.p(0,y)
break
case"stopErrors":y=y.i(x,1)
z.dx.bl(0,y)
break}return}init.globalState.f.a.aD(new H.b7(z,new H.iQ(this,x),"receive"))},
Z:function(a,b){var z,y
if(b==null)return!1
if(b instanceof H.bz){z=this.b
y=b.b
y=z==null?y==null:z===y
z=y}else z=!1
return z},
gW:function(a){return this.b.a}},
iQ:{"^":"l:0;a,b",
$0:function(){var z=this.a.b
if(!z.c)z.eO(this.b)}},
cw:{"^":"em;b,c,a",
aB:function(a,b){var z,y,x
z=P.aM(["command","message","port",this,"msg",b])
y=new H.az(!0,P.aO(null,P.m)).am(z)
if(init.globalState.x){init.globalState.Q.toString
self.postMessage(y)}else{x=init.globalState.ch.i(0,this.b)
if(x!=null)x.postMessage(y)}},
Z:function(a,b){var z,y
if(b==null)return!1
if(b instanceof H.cw){z=this.b
y=b.b
if(z==null?y==null:z===y){z=this.a
y=b.a
if(z==null?y==null:z===y){z=this.c
y=b.c
y=z==null?y==null:z===y
z=y}else z=!1}else z=!1}else z=!1
return z},
gW:function(a){return(this.b<<16^this.a<<8^this.c)>>>0}},
bu:{"^":"c;a,b,c",
eQ:function(){this.c=!0
this.b=null},
eO:function(a){if(this.c)return
this.b.$1(a)},
$ishM:1},
e0:{"^":"c;a,b,c",
eJ:function(a,b){var z,y
if(a===0)z=self.setTimeout==null||init.globalState.x
else z=!1
if(z){this.c=1
z=init.globalState.f
y=init.globalState.d
z.a.aD(new H.b7(y,new H.i9(this,b),"timer"))
this.b=!0}else if(self.setTimeout!=null){++init.globalState.f.b
this.c=self.setTimeout(H.aS(new H.ia(this,b),0),a)}else throw H.f(new P.M("Timer greater than 0."))},
eK:function(a,b){if(self.setTimeout!=null){++init.globalState.f.b
this.c=self.setInterval(H.aS(new H.i8(this,b),0),a)}else throw H.f(new P.M("Periodic timer."))},
C:{
i6:function(a,b){var z=new H.e0(!0,!1,null)
z.eJ(a,b)
return z},
i7:function(a,b){var z=new H.e0(!1,!1,null)
z.eK(a,b)
return z}}},
i9:{"^":"l:2;a,b",
$0:function(){this.a.c=null
this.b.$0()}},
ia:{"^":"l:2;a,b",
$0:function(){this.a.c=null;--init.globalState.f.b
this.b.$0()}},
i8:{"^":"l:0;a,b",
$0:function(){this.b.$1(this.a)}},
ap:{"^":"c;a",
gW:function(a){var z=this.a
z=C.c.b3(z,0)^C.c.aG(z,4294967296)
z=(~z>>>0)+(z<<15>>>0)&4294967295
z=((z^z>>>12)>>>0)*5&4294967295
z=((z^z>>>4)>>>0)*2057&4294967295
return(z^z>>>16)>>>0},
Z:function(a,b){var z,y
if(b==null)return!1
if(b===this)return!0
if(b instanceof H.ap){z=this.a
y=b.a
return z==null?y==null:z===y}return!1}},
az:{"^":"c;a,b",
am:[function(a){var z,y,x,w,v
if(a==null||typeof a==="string"||typeof a==="number"||typeof a==="boolean")return a
z=this.b
y=z.i(0,a)
if(y!=null)return["ref",y]
z.n(0,a,z.gG(z))
z=J.u(a)
if(!!z.$isdw)return["buffer",a]
if(!!z.$isca)return["typed",a]
if(!!z.$isF)return this.dQ(a)
if(!!z.$isfP){x=this.gdN()
w=a.gb8()
w=H.c5(w,x,H.an(w,"a2",0),null)
w=P.c3(w,!0,H.an(w,"a2",0))
z=z.gdA(a)
z=H.c5(z,x,H.an(z,"a2",0),null)
return["map",w,P.c3(z,!0,H.an(z,"a2",0))]}if(!!z.$ish1)return this.dR(a)
if(!!z.$ish)this.dz(a)
if(!!z.$ishM)this.bn(a,"RawReceivePorts can't be transmitted:")
if(!!z.$isbz)return this.dS(a)
if(!!z.$iscw)return this.dT(a)
if(!!z.$isl){v=a.$static_name
if(v==null)this.bn(a,"Closures can't be transmitted:")
return["function",v]}if(!!z.$isap)return["capability",a.a]
if(!(a instanceof P.c))this.dz(a)
return["dart",init.classIdExtractor(a),this.dP(init.classFieldsExtractor(a))]},"$1","gdN",2,0,1],
bn:function(a,b){throw H.f(new P.M((b==null?"Can't transmit:":b)+" "+H.d(a)))},
dz:function(a){return this.bn(a,null)},
dQ:function(a){var z=this.dO(a)
if(!!a.fixed$length)return["fixed",z]
if(!a.fixed$length)return["extendable",z]
if(!a.immutable$list)return["mutable",z]
if(a.constructor===Array)return["const",z]
this.bn(a,"Can't serialize indexable: ")},
dO:function(a){var z,y
z=[]
C.d.sG(z,a.length)
for(y=0;y<a.length;++y)z[y]=this.am(a[y])
return z},
dP:function(a){var z
for(z=0;z<a.length;++z)C.d.n(a,z,this.am(a[z]))
return a},
dR:function(a){var z,y,x
if(!!a.constructor&&a.constructor!==Object)this.bn(a,"Only plain JS Objects are supported:")
z=Object.keys(a)
y=[]
C.d.sG(y,z.length)
for(x=0;x<z.length;++x)y[x]=this.am(a[z[x]])
return["js-object",z,y]},
dT:function(a){if(this.a)return["sendport",a.b,a.a,a.c]
return["raw sendport",a]},
dS:function(a){if(this.a)return["sendport",init.globalState.b,a.a,a.b.a]
return["raw sendport",a]}},
by:{"^":"c;a,b",
aT:[function(a){var z,y,x,w,v
if(a==null||typeof a==="string"||typeof a==="number"||typeof a==="boolean")return a
if(typeof a!=="object"||a===null||a.constructor!==Array)throw H.f(P.cO("Bad serialized message: "+H.d(a)))
switch(C.d.gfW(a)){case"ref":return this.b[a[1]]
case"buffer":z=a[1]
this.b.push(z)
return z
case"typed":z=a[1]
this.b.push(z)
return z
case"fixed":z=a[1]
this.b.push(z)
y=H.e(this.be(z),[null])
y.fixed$length=Array
return y
case"extendable":z=a[1]
this.b.push(z)
return H.e(this.be(z),[null])
case"mutable":z=a[1]
this.b.push(z)
return this.be(z)
case"const":z=a[1]
this.b.push(z)
y=H.e(this.be(z),[null])
y.fixed$length=Array
return y
case"map":return this.fF(a)
case"sendport":return this.fG(a)
case"raw sendport":z=a[1]
this.b.push(z)
return z
case"js-object":return this.fE(a)
case"function":z=init.globalFunctions[a[1]]()
this.b.push(z)
return z
case"capability":return new H.ap(a[1])
case"dart":x=a[1]
w=a[2]
v=init.instanceFromClassId(x)
this.b.push(v)
this.be(w)
return init.initializeEmptyInstance(x,v,w)
default:throw H.f("couldn't deserialize: "+H.d(a))}},"$1","gfD",2,0,1],
be:function(a){var z
for(z=0;z<a.length;++z)C.d.n(a,z,this.aT(a[z]))
return a},
fF:function(a){var z,y,x,w,v
z=a[1]
y=a[2]
x=P.dp()
this.b.push(x)
z=J.eW(z,this.gfD()).hy(0)
for(w=J.A(y),v=0;v<z.length;++v)x.n(0,z[v],this.aT(w.i(y,v)))
return x},
fG:function(a){var z,y,x,w,v,u,t
z=a[1]
y=a[2]
x=a[3]
w=init.globalState.b
if(z==null?w==null:z===w){v=init.globalState.z.i(0,y)
if(v==null)return
u=v.di(x)
if(u==null)return
t=new H.bz(u,y)}else t=new H.cw(z,x,y)
this.b.push(t)
return t},
fE:function(a){var z,y,x,w,v,u
z=a[1]
y=a[2]
x={}
this.b.push(x)
for(w=J.A(z),v=J.A(y),u=0;u<w.gG(z);++u)x[w.i(z,u)]=this.aT(v.i(y,u))
return x}}}],["","",,H,{"^":"",
jt:function(a){return init.types[a]},
eG:function(a,b){var z
if(b!=null){z=b.x
if(z!=null)return z}return!!J.u(a).$isP},
d:function(a){var z
if(typeof a==="string")return a
if(typeof a==="number"){if(a!==0)return""+a}else if(!0===a)return"true"
else if(!1===a)return"false"
else if(a==null)return"null"
z=J.aa(a)
if(typeof z!=="string")throw H.f(H.a8(a))
return z},
am:function(a){var z=a.$identityHash
if(z==null){z=Math.random()*0x3fffffff|0
a.$identityHash=z}return z},
cf:function(a){var z,y,x,w,v,u,t,s
z=J.u(a)
y=z.constructor
if(typeof y=="function"){x=y.name
w=typeof x==="string"?x:null}else w=null
if(w==null||z===C.T||!!J.u(a).$isb6){v=C.K(a)
if(v==="Object"){u=a.constructor
if(typeof u=="function"){t=String(u).match(/^\s*function\s*([\w$]*)\s*\(/)
s=t==null?null:t[1]
if(typeof s==="string"&&/^\w+$/.test(s))w=s}if(w==null)w=v}else w=v}w=w
if(w.length>1&&C.v.eR(w,0)===36)w=C.v.ek(w,1)
return function(b,c){return b.replace(/[^<,> ]+/g,function(d){return c[d]||d})}(w+H.eH(H.cD(a),0,null),init.mangledGlobalNames)},
bs:function(a){return"Instance of '"+H.cf(a)+"'"},
kR:[function(){return Date.now()},"$0","j8",0,0,14],
br:function(){var z,y
if($.aw!=null)return
$.aw=1000
$.v=H.j8()
if(typeof window=="undefined")return
z=window
if(z==null)return
y=z.performance
if(y==null)return
if(typeof y.now!="function")return
$.aw=1e6
$.v=new H.hJ(y)},
ce:function(a,b){if(a==null||typeof a==="boolean"||typeof a==="number"||typeof a==="string")throw H.f(H.a8(a))
return a[b]},
dH:function(a,b,c){if(a==null||typeof a==="boolean"||typeof a==="number"||typeof a==="string")throw H.f(H.a8(a))
a[b]=c},
C:function(a,b){var z
if(typeof b!=="number"||Math.floor(b)!==b)return new P.ah(!0,b,"index",null)
z=J.ao(a)
if(b<0||b>=z)return P.aL(b,a,"index",null,z)
return P.bt(b,"index",null)},
a8:function(a){return new P.ah(!0,a,null,null)},
jl:function(a){return a},
f:function(a){var z
if(a==null)a=new P.dE()
z=new Error()
z.dartException=a
if("defineProperty" in Object){Object.defineProperty(z,"message",{get:H.eO})
z.name=""}else z.toString=H.eO
return z},
eO:function(){return J.aa(this.dartException)},
w:function(a){throw H.f(a)},
eN:function(a){throw H.f(new P.a1(a))},
Y:function(a){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l
z=new H.jR(a)
if(a==null)return
if(typeof a!=="object")return a
if("dartException" in a)return z.$1(a.dartException)
else if(!("message" in a))return a
y=a.message
if("number" in a&&typeof a.number=="number"){x=a.number
w=x&65535
if((C.c.b3(x,16)&8191)===10)switch(w){case 438:return z.$1(H.c1(H.d(y)+" (Error "+w+")",null))
case 445:case 5007:v=H.d(y)+" (Error "+w+")"
return z.$1(new H.dD(v,null))}}if(a instanceof TypeError){u=$.$get$e5()
t=$.$get$e6()
s=$.$get$e7()
r=$.$get$e8()
q=$.$get$ec()
p=$.$get$ed()
o=$.$get$ea()
$.$get$e9()
n=$.$get$ef()
m=$.$get$ee()
l=u.as(y)
if(l!=null)return z.$1(H.c1(y,l))
else{l=t.as(y)
if(l!=null){l.method="call"
return z.$1(H.c1(y,l))}else{l=s.as(y)
if(l==null){l=r.as(y)
if(l==null){l=q.as(y)
if(l==null){l=p.as(y)
if(l==null){l=o.as(y)
if(l==null){l=r.as(y)
if(l==null){l=n.as(y)
if(l==null){l=m.as(y)
v=l!=null}else v=!0}else v=!0}else v=!0}else v=!0}else v=!0}else v=!0}else v=!0
if(v)return z.$1(new H.dD(y,l==null?null:l.method))}}return z.$1(new H.ie(typeof y==="string"?y:""))}if(a instanceof RangeError){if(typeof y==="string"&&y.indexOf("call stack")!==-1)return new P.dO()
y=function(b){try{return String(b)}catch(k){}return null}(a)
return z.$1(new P.ah(!1,null,null,typeof y==="string"?y.replace(/^RangeError:\s*/,""):y))}if(typeof InternalError=="function"&&a instanceof InternalError)if(typeof y==="string"&&y==="too much recursion")return new P.dO()
return a},
ba:function(a){var z
if(a==null)return new H.et(a,null)
z=a.$cachedTrace
if(z!=null)return z
return a.$cachedTrace=new H.et(a,null)},
jL:function(a){if(a==null||typeof a!='object')return J.aE(a)
else return H.am(a)},
jq:function(a,b){var z,y,x,w
z=a.length
for(y=0;y<z;y=w){x=y+1
w=x+1
b.n(0,a[y],a[x])}return b},
jD:function(a,b,c,d,e,f,g){switch(c){case 0:return H.b8(b,new H.jE(a))
case 1:return H.b8(b,new H.jF(a,d))
case 2:return H.b8(b,new H.jG(a,d,e))
case 3:return H.b8(b,new H.jH(a,d,e,f))
case 4:return H.b8(b,new H.jI(a,d,e,f,g))}throw H.f(P.bl("Unsupported number of arguments for wrapped closure"))},
aS:function(a,b){var z
if(a==null)return
z=a.$identity
if(!!z)return z
z=function(c,d,e,f){return function(g,h,i,j){return f(c,e,d,g,h,i,j)}}(a,b,init.globalState.d,H.jD)
a.$identity=z
return z},
fa:function(a,b,c,d,e,f){var z,y,x,w,v,u,t,s,r,q,p,o,n,m
z=b[0]
y=z.$callName
if(!!J.u(c).$isk){z.$reflectionInfo=c
x=H.hO(z).r}else x=c
w=d?Object.create(new H.hZ().constructor.prototype):Object.create(new H.bO(null,null,null,null).constructor.prototype)
w.$initialize=w.constructor
if(d)v=function(){this.$initialize()}
else{u=$.a0
$.a0=u+1
u=new Function("a,b,c,d"+u,"this.$initialize(a,b,c,d"+u+")")
v=u}w.constructor=v
v.prototype=w
if(!d){t=e.length==1&&!0
s=H.cT(a,z,t)
s.$reflectionInfo=c}else{w.$static_name=f
s=z
t=!1}if(typeof x=="number")r=function(g,h){return function(){return g(h)}}(H.jt,x)
else if(typeof x=="function")if(d)r=x
else{q=t?H.cR:H.bP
r=function(g,h){return function(){return g.apply({$receiver:h(this)},arguments)}}(x,q)}else throw H.f("Error in reflectionInfo.")
w.$S=r
w[y]=s
for(u=b.length,p=1;p<u;++p){o=b[p]
n=o.$callName
if(n!=null){m=d?o:H.cT(a,o,t)
w[n]=m}}w["call*"]=s
w.$R=z.$R
w.$D=z.$D
return v},
f7:function(a,b,c,d){var z=H.bP
switch(b?-1:a){case 0:return function(e,f){return function(){return f(this)[e]()}}(c,z)
case 1:return function(e,f){return function(g){return f(this)[e](g)}}(c,z)
case 2:return function(e,f){return function(g,h){return f(this)[e](g,h)}}(c,z)
case 3:return function(e,f){return function(g,h,i){return f(this)[e](g,h,i)}}(c,z)
case 4:return function(e,f){return function(g,h,i,j){return f(this)[e](g,h,i,j)}}(c,z)
case 5:return function(e,f){return function(g,h,i,j,k){return f(this)[e](g,h,i,j,k)}}(c,z)
default:return function(e,f){return function(){return e.apply(f(this),arguments)}}(d,z)}},
cT:function(a,b,c){var z,y,x,w,v,u,t
if(c)return H.f9(a,b)
z=b.$stubName
y=b.length
x=a[z]
w=b==null?x==null:b===x
v=!w||y>=27
if(v)return H.f7(y,!w,z,b)
if(y===0){w=$.a0
$.a0=w+1
u="self"+H.d(w)
w="return function(){var "+u+" = this."
v=$.aG
if(v==null){v=H.bb("self")
$.aG=v}return new Function(w+H.d(v)+";return "+u+"."+H.d(z)+"();}")()}t="abcdefghijklmnopqrstuvwxyz".split("").splice(0,y).join(",")
w=$.a0
$.a0=w+1
t+=H.d(w)
w="return function("+t+"){return this."
v=$.aG
if(v==null){v=H.bb("self")
$.aG=v}return new Function(w+H.d(v)+"."+H.d(z)+"("+t+");}")()},
f8:function(a,b,c,d){var z,y
z=H.bP
y=H.cR
switch(b?-1:a){case 0:throw H.f(new H.hR("Intercepted function with no arguments."))
case 1:return function(e,f,g){return function(){return f(this)[e](g(this))}}(c,z,y)
case 2:return function(e,f,g){return function(h){return f(this)[e](g(this),h)}}(c,z,y)
case 3:return function(e,f,g){return function(h,i){return f(this)[e](g(this),h,i)}}(c,z,y)
case 4:return function(e,f,g){return function(h,i,j){return f(this)[e](g(this),h,i,j)}}(c,z,y)
case 5:return function(e,f,g){return function(h,i,j,k){return f(this)[e](g(this),h,i,j,k)}}(c,z,y)
case 6:return function(e,f,g){return function(h,i,j,k,l){return f(this)[e](g(this),h,i,j,k,l)}}(c,z,y)
default:return function(e,f,g,h){return function(){h=[g(this)]
Array.prototype.push.apply(h,arguments)
return e.apply(f(this),h)}}(d,z,y)}},
f9:function(a,b){var z,y,x,w,v,u,t,s
z=H.f2()
y=$.cQ
if(y==null){y=H.bb("receiver")
$.cQ=y}x=b.$stubName
w=b.length
v=a[x]
u=b==null?v==null:b===v
t=!u||w>=28
if(t)return H.f8(w,!u,x,b)
if(w===1){y="return function(){return this."+H.d(z)+"."+H.d(x)+"(this."+H.d(y)+");"
u=$.a0
$.a0=u+1
return new Function(y+H.d(u)+"}")()}s="abcdefghijklmnopqrstuvwxyz".split("").splice(0,w-1).join(",")
y="return function("+s+"){return this."+H.d(z)+"."+H.d(x)+"(this."+H.d(y)+", "+s+");"
u=$.a0
$.a0=u+1
return new Function(y+H.d(u)+"}")()},
cB:function(a,b,c,d,e,f){var z
b.fixed$length=Array
if(!!J.u(c).$isk){c.fixed$length=Array
z=c}else z=c
return H.fa(a,b,z,!!d,e,f)},
jN:function(a,b){var z=J.A(b)
throw H.f(H.f6(H.cf(a),z.cz(b,3,z.gG(b))))},
n:function(a,b){var z
if(a!=null)z=(typeof a==="object"||typeof a==="function")&&J.u(a)[b]
else z=!0
if(z)return a
H.jN(a,b)},
jo:function(a){var z=J.u(a)
return"$S" in z?z.$S():null},
bC:function(a,b){var z
if(a==null)return!1
z=H.jo(a)
return z==null?!1:H.eF(z,b)},
jQ:function(a){throw H.f(new P.fj(a))},
bH:function(){return(Math.random()*0x100000000>>>0)+(Math.random()*0x100000000>>>0)*4294967296},
eE:function(a){return init.getIsolateTag(a)},
e:function(a,b){a.$ti=b
return a},
cD:function(a){if(a==null)return
return a.$ti},
js:function(a,b){return H.eM(a["$as"+H.d(b)],H.cD(a))},
an:function(a,b,c){var z=H.js(a,b)
return z==null?null:z[c]},
af:function(a,b){var z=H.cD(a)
return z==null?null:z[b]},
aD:function(a,b){var z
if(a==null)return"dynamic"
if(typeof a==="object"&&a!==null&&a.constructor===Array)return a[0].builtin$cls+H.eH(a,1,b)
if(typeof a=="function")return a.builtin$cls
if(typeof a==="number"&&Math.floor(a)===a)return H.d(a)
if(typeof a.func!="undefined"){z=a.typedef
if(z!=null)return H.aD(z,b)
return H.j6(a,b)}return"unknown-reified-type"},
j6:function(a,b){var z,y,x,w,v,u,t,s,r,q,p
z=!!a.v?"void":H.aD(a.ret,b)
if("args" in a){y=a.args
for(x=y.length,w="",v="",u=0;u<x;++u,v=", "){t=y[u]
w=w+v+H.aD(t,b)}}else{w=""
v=""}if("opt" in a){s=a.opt
w+=v+"["
for(x=s.length,v="",u=0;u<x;++u,v=", "){t=s[u]
w=w+v+H.aD(t,b)}w+="]"}if("named" in a){r=a.named
w+=v+"{"
for(x=H.jp(r),q=x.length,v="",u=0;u<q;++u,v=", "){p=x[u]
w=w+v+H.aD(r[p],b)+(" "+H.d(p))}w+="}"}return"("+w+") => "+z},
eH:function(a,b,c){var z,y,x,w,v,u
if(a==null)return""
z=new P.ck("")
for(y=b,x=!0,w=!0,v="";y<a.length;++y){if(x)x=!1
else z.a=v+", "
u=a[y]
if(u!=null)w=!1
v=z.a+=H.aD(u,c)}return w?"":"<"+z.m(0)+">"},
eM:function(a,b){if(a==null)return b
a=a.apply(null,b)
if(a==null)return
if(typeof a==="object"&&a!==null&&a.constructor===Array)return a
if(typeof a=="function")return a.apply(null,b)
return b},
jg:function(a,b){var z,y
if(a==null||b==null)return!0
z=a.length
for(y=0;y<z;++y)if(!H.N(a[y],b[y]))return!1
return!0},
N:function(a,b){var z,y,x,w,v,u
if(a===b)return!0
if(a==null||b==null)return!0
if(a.builtin$cls==="av")return!0
if('func' in b)return H.eF(a,b)
if('func' in a)return b.builtin$cls==="kn"||b.builtin$cls==="c"
z=typeof a==="object"&&a!==null&&a.constructor===Array
y=z?a[0]:a
x=typeof b==="object"&&b!==null&&b.constructor===Array
w=x?b[0]:b
if(w!==y){v=H.aD(w,null)
if(!('$is'+v in y.prototype))return!1
u=y.prototype["$as"+v]}else u=null
if(!z&&u==null||!x)return!0
z=z?a.slice(1):null
x=x?b.slice(1):null
return H.jg(H.eM(u,z),x)},
ez:function(a,b,c){var z,y,x,w,v
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
jf:function(a,b){var z,y,x,w,v,u
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
eF:function(a,b){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l
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
if(t===s){if(!H.ez(x,w,!1))return!1
if(!H.ez(v,u,!0))return!1}else{for(p=0;p<t;++p){o=x[p]
n=w[p]
if(!(H.N(o,n)||H.N(n,o)))return!1}for(m=p,l=0;m<s;++l,++m){o=v[l]
n=w[m]
if(!(H.N(o,n)||H.N(n,o)))return!1}for(m=0;m<q;++l,++m){o=v[l]
n=u[m]
if(!(H.N(o,n)||H.N(n,o)))return!1}}return H.jf(a.named,b.named)},
lp:function(a){var z=$.cE
return"Instance of "+(z==null?"<Unknown>":z.$1(a))},
ln:function(a){return H.am(a)},
lm:function(a,b,c){Object.defineProperty(a,b,{value:c,enumerable:false,writable:true,configurable:true})},
jJ:function(a){var z,y,x,w,v,u
z=$.cE.$1(a)
y=$.bB[z]
if(y!=null){Object.defineProperty(a,init.dispatchPropertyName,{value:y,enumerable:false,writable:true,configurable:true})
return y.i}x=$.bF[z]
if(x!=null)return x
w=init.interceptorsByTag[z]
if(w==null){z=$.ey.$2(a,z)
if(z!=null){y=$.bB[z]
if(y!=null){Object.defineProperty(a,init.dispatchPropertyName,{value:y,enumerable:false,writable:true,configurable:true})
return y.i}x=$.bF[z]
if(x!=null)return x
w=init.interceptorsByTag[z]}}if(w==null)return
x=w.prototype
v=z[0]
if(v==="!"){y=H.cG(x)
$.bB[z]=y
Object.defineProperty(a,init.dispatchPropertyName,{value:y,enumerable:false,writable:true,configurable:true})
return y.i}if(v==="~"){$.bF[z]=x
return x}if(v==="-"){u=H.cG(x)
Object.defineProperty(Object.getPrototypeOf(a),init.dispatchPropertyName,{value:u,enumerable:false,writable:true,configurable:true})
return u.i}if(v==="+")return H.eI(a,x)
if(v==="*")throw H.f(new P.eg(z))
if(init.leafTags[z]===true){u=H.cG(x)
Object.defineProperty(Object.getPrototypeOf(a),init.dispatchPropertyName,{value:u,enumerable:false,writable:true,configurable:true})
return u.i}else return H.eI(a,x)},
eI:function(a,b){var z=Object.getPrototypeOf(a)
Object.defineProperty(z,init.dispatchPropertyName,{value:J.bG(b,z,null,null),enumerable:false,writable:true,configurable:true})
return b},
cG:function(a){return J.bG(a,!1,null,!!a.$isP)},
jK:function(a,b,c){var z=b.prototype
if(init.leafTags[a]===true)return J.bG(z,!1,null,!!z.$isP)
else return J.bG(z,c,null,null)},
jB:function(){if(!0===$.cF)return
$.cF=!0
H.jC()},
jC:function(){var z,y,x,w,v,u,t,s
$.bB=Object.create(null)
$.bF=Object.create(null)
H.jx()
z=init.interceptorsByTag
y=Object.getOwnPropertyNames(z)
if(typeof window!="undefined"){window
x=function(){}
for(w=0;w<y.length;++w){v=y[w]
u=$.eJ.$1(v)
if(u!=null){t=H.jK(v,z[v],u)
if(t!=null){Object.defineProperty(u,init.dispatchPropertyName,{value:t,enumerable:false,writable:true,configurable:true})
x.prototype=u}}}}for(w=0;w<y.length;++w){v=y[w]
if(/^[A-Za-z_]/.test(v)){s=z[v]
z["!"+v]=s
z["~"+v]=s
z["-"+v]=s
z["+"+v]=s
z["*"+v]=s}}},
jx:function(){var z,y,x,w,v,u,t
z=C.X()
z=H.aB(C.U,H.aB(C.Z,H.aB(C.J,H.aB(C.J,H.aB(C.Y,H.aB(C.V,H.aB(C.W(C.K),z)))))))
if(typeof dartNativeDispatchHooksTransformer!="undefined"){y=dartNativeDispatchHooksTransformer
if(typeof y=="function")y=[y]
if(y.constructor==Array)for(x=0;x<y.length;++x){w=y[x]
if(typeof w=="function")z=w(z)||z}}v=z.getTag
u=z.getUnknownTag
t=z.prototypeForTag
$.cE=new H.jy(v)
$.ey=new H.jz(u)
$.eJ=new H.jA(t)},
aB:function(a,b){return a(b)||b},
hN:{"^":"c;a,b,c,d,e,f,r,x",C:{
hO:function(a){var z,y,x
z=a.$reflectionInfo
if(z==null)return
z.fixed$length=Array
z=z
y=z[0]
x=z[1]
return new H.hN(a,z,(y&1)===1,y>>1,x>>1,(x&1)===1,z[2],null)}}},
hJ:{"^":"l:0;a",
$0:function(){return C.a.aL(1000*this.a.now())}},
id:{"^":"c;a,b,c,d,e,f",
as:function(a){var z,y,x
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
C:{
a7:function(a){var z,y,x,w,v,u
a=a.replace(String({}),'$receiver$').replace(/[[\]{}()*+?.\\^$|]/g,"\\$&")
z=a.match(/\\\$[a-zA-Z]+\\\$/g)
if(z==null)z=[]
y=z.indexOf("\\$arguments\\$")
x=z.indexOf("\\$argumentsExpr\\$")
w=z.indexOf("\\$expr\\$")
v=z.indexOf("\\$method\\$")
u=z.indexOf("\\$receiver\\$")
return new H.id(a.replace(new RegExp('\\\\\\$arguments\\\\\\$','g'),'((?:x|[^x])*)').replace(new RegExp('\\\\\\$argumentsExpr\\\\\\$','g'),'((?:x|[^x])*)').replace(new RegExp('\\\\\\$expr\\\\\\$','g'),'((?:x|[^x])*)').replace(new RegExp('\\\\\\$method\\\\\\$','g'),'((?:x|[^x])*)').replace(new RegExp('\\\\\\$receiver\\\\\\$','g'),'((?:x|[^x])*)'),y,x,w,v,u)},
bx:function(a){return function($expr$){var $argumentsExpr$='$arguments$'
try{$expr$.$method$($argumentsExpr$)}catch(z){return z.message}}(a)},
eb:function(a){return function($expr$){try{$expr$.$method$}catch(z){return z.message}}(a)}}},
dD:{"^":"E;a,b",
m:function(a){var z=this.b
if(z==null)return"NullError: "+H.d(this.a)
return"NullError: method not found: '"+z+"' on null"}},
h4:{"^":"E;a,b,c",
m:function(a){var z,y
z=this.b
if(z==null)return"NoSuchMethodError: "+H.d(this.a)
y=this.c
if(y==null)return"NoSuchMethodError: method not found: '"+z+"' ("+H.d(this.a)+")"
return"NoSuchMethodError: method not found: '"+z+"' on '"+y+"' ("+H.d(this.a)+")"},
C:{
c1:function(a,b){var z,y
z=b==null
y=z?null:b.method
return new H.h4(a,y,z?null:b.receiver)}}},
ie:{"^":"E;a",
m:function(a){var z=this.a
return z.length===0?"Error":"Error: "+z}},
jR:{"^":"l:1;a",
$1:function(a){if(!!J.u(a).$isE)if(a.$thrownJsError==null)a.$thrownJsError=this.a
return a}},
et:{"^":"c;a,b",
m:function(a){var z,y
z=this.b
if(z!=null)return z
z=this.a
y=z!==null&&typeof z==="object"?z.stack:null
z=y==null?"":y
this.b=z
return z}},
jE:{"^":"l:0;a",
$0:function(){return this.a.$0()}},
jF:{"^":"l:0;a,b",
$0:function(){return this.a.$1(this.b)}},
jG:{"^":"l:0;a,b,c",
$0:function(){return this.a.$2(this.b,this.c)}},
jH:{"^":"l:0;a,b,c,d",
$0:function(){return this.a.$3(this.b,this.c,this.d)}},
jI:{"^":"l:0;a,b,c,d,e",
$0:function(){return this.a.$4(this.b,this.c,this.d,this.e)}},
l:{"^":"c;",
m:function(a){return"Closure '"+H.cf(this).trim()+"'"},
gdB:function(){return this},
gdB:function(){return this}},
dR:{"^":"l;"},
hZ:{"^":"dR;",
m:function(a){var z=this.$static_name
if(z==null)return"Closure of unknown static method"
return"Closure '"+z+"'"}},
bO:{"^":"dR;a,b,c,d",
Z:function(a,b){if(b==null)return!1
if(this===b)return!0
if(!(b instanceof H.bO))return!1
return this.a===b.a&&this.b===b.b&&this.c===b.c},
gW:function(a){var z,y
z=this.c
if(z==null)y=H.am(this.a)
else y=typeof z!=="object"?J.aE(z):H.am(z)
return(y^H.am(this.b))>>>0},
m:function(a){var z=this.c
if(z==null)z=this.a
return"Closure '"+H.d(this.d)+"' of "+H.bs(z)},
C:{
bP:function(a){return a.a},
cR:function(a){return a.c},
f2:function(){var z=$.aG
if(z==null){z=H.bb("self")
$.aG=z}return z},
bb:function(a){var z,y,x,w,v
z=new H.bO("self","target","receiver","name")
y=Object.getOwnPropertyNames(z)
y.fixed$length=Array
x=y
for(y=x.length,w=0;w<y;++w){v=x[w]
if(z[v]===a)return v}}}},
f5:{"^":"E;a",
m:function(a){return this.a},
C:{
f6:function(a,b){return new H.f5("CastError: Casting value of type '"+a+"' to incompatible type '"+b+"'")}}},
hR:{"^":"E;a",
m:function(a){return"RuntimeError: "+H.d(this.a)}},
at:{"^":"c;a,b,c,d,e,f,r,$ti",
gG:function(a){return this.a},
gbk:function(a){return this.a===0},
gb8:function(){return new H.h6(this,[H.af(this,0)])},
gdA:function(a){return H.c5(this.gb8(),new H.h3(this),H.af(this,0),H.af(this,1))},
b7:function(a){var z
if((a&0x3ffffff)===a){z=this.c
if(z==null)return!1
return this.eW(z,a)}else return this.h5(a)},
h5:function(a){var z=this.d
if(z==null)return!1
return this.bj(this.bt(z,this.bi(a)),a)>=0},
i:function(a,b){var z,y,x
if(typeof b==="string"){z=this.b
if(z==null)return
y=this.bd(z,b)
return y==null?null:y.b}else if(typeof b==="number"&&(b&0x3ffffff)===b){x=this.c
if(x==null)return
y=this.bd(x,b)
return y==null?null:y.b}else return this.h6(b)},
h6:function(a){var z,y,x
z=this.d
if(z==null)return
y=this.bt(z,this.bi(a))
x=this.bj(y,a)
if(x<0)return
return y[x].b},
n:function(a,b,c){var z,y,x,w,v,u
if(typeof b==="string"){z=this.b
if(z==null){z=this.bO()
this.b=z}this.cB(z,b,c)}else if(typeof b==="number"&&(b&0x3ffffff)===b){y=this.c
if(y==null){y=this.bO()
this.c=y}this.cB(y,b,c)}else{x=this.d
if(x==null){x=this.bO()
this.d=x}w=this.bi(b)
v=this.bt(x,w)
if(v==null)this.bS(x,w,[this.bP(b,c)])
else{u=this.bj(v,b)
if(u>=0)v[u].b=c
else v.push(this.bP(b,c))}}},
bl:function(a,b){if(typeof b==="string")return this.cQ(this.b,b)
else if(typeof b==="number"&&(b&0x3ffffff)===b)return this.cQ(this.c,b)
else return this.h7(b)},
h7:function(a){var z,y,x,w
z=this.d
if(z==null)return
y=this.bt(z,this.bi(a))
x=this.bj(y,a)
if(x<0)return
w=y.splice(x,1)[0]
this.cV(w)
return w.b},
b5:function(a){if(this.a>0){this.f=null
this.e=null
this.d=null
this.c=null
this.b=null
this.a=0
this.r=this.r+1&67108863}},
dc:function(a,b){var z,y
z=this.e
y=this.r
for(;z!=null;){b.$2(z.a,z.b)
if(y!==this.r)throw H.f(new P.a1(this))
z=z.c}},
cB:function(a,b,c){var z=this.bd(a,b)
if(z==null)this.bS(a,b,this.bP(b,c))
else z.b=c},
cQ:function(a,b){var z
if(a==null)return
z=this.bd(a,b)
if(z==null)return
this.cV(z)
this.cJ(a,b)
return z.b},
bP:function(a,b){var z,y
z=new H.h5(a,b,null,null)
if(this.e==null){this.f=z
this.e=z}else{y=this.f
z.d=y
y.c=z
this.f=z}++this.a
this.r=this.r+1&67108863
return z},
cV:function(a){var z,y
z=a.d
y=a.c
if(z==null)this.e=y
else z.c=y
if(y==null)this.f=z
else y.d=z;--this.a
this.r=this.r+1&67108863},
bi:function(a){return J.aE(a)&0x3ffffff},
bj:function(a,b){var z,y
if(a==null)return-1
z=a.length
for(y=0;y<z;++y)if(J.Z(a[y].a,b))return y
return-1},
m:function(a){return P.hb(this)},
bd:function(a,b){return a[b]},
bt:function(a,b){return a[b]},
bS:function(a,b,c){a[b]=c},
cJ:function(a,b){delete a[b]},
eW:function(a,b){return this.bd(a,b)!=null},
bO:function(){var z=Object.create(null)
this.bS(z,"<non-identifier-key>",z)
this.cJ(z,"<non-identifier-key>")
return z},
$isfP:1},
h3:{"^":"l:1;a",
$1:function(a){return this.a.i(0,a)}},
h5:{"^":"c;a,b,c,d"},
h6:{"^":"i;a,$ti",
gG:function(a){return this.a.a},
ga2:function(a){var z,y
z=this.a
y=new H.h7(z,z.r,null,null)
y.c=z.e
return y}},
h7:{"^":"c;a,b,c,d",
gP:function(){return this.d},
M:function(){var z=this.a
if(this.b!==z.r)throw H.f(new P.a1(z))
else{z=this.c
if(z==null){this.d=null
return!1}else{this.d=z.a
this.c=z.c
return!0}}}},
jy:{"^":"l:1;a",
$1:function(a){return this.a(a)}},
jz:{"^":"l:7;a",
$2:function(a,b){return this.a(a,b)}},
jA:{"^":"l:8;a",
$1:function(a){return this.a(a)}}}],["","",,H,{"^":"",
jp:function(a){var z=H.e(a?Object.keys(a):[],[null])
z.fixed$length=Array
return z}}],["","",,H,{"^":"",
jM:function(a){if(typeof dartPrint=="function"){dartPrint(a)
return}if(typeof console=="object"&&typeof console.log!="undefined"){console.log(a)
return}if(typeof window=="object")return
if(typeof print=="function"){print(a)
return}throw"Unable to print message: "+String(a)}}],["","",,H,{"^":"",
b:function(a){return a},
dw:{"^":"h;",$isdw:1,"%":"ArrayBuffer"},
ca:{"^":"h;",$isca:1,"%":"DataView;ArrayBufferView;c8|dy|dA|c9|dx|dz|ak"},
c8:{"^":"ca;",
gG:function(a){return a.length},
$isF:1,
$asF:I.I,
$isP:1,
$asP:I.I},
c9:{"^":"dA;",
i:function(a,b){if(b>>>0!==b||b>=a.length)H.w(H.C(a,b))
return a[b]},
n:function(a,b,c){if(b>>>0!==b||b>=a.length)H.w(H.C(a,b))
a[b]=c}},
ak:{"^":"dz;",
n:function(a,b,c){if(b>>>0!==b||b>=a.length)H.w(H.C(a,b))
a[b]=c},
$isi:1,
$asi:function(){return[P.m]},
$isk:1,
$ask:function(){return[P.m]}},
kB:{"^":"c9;",$isi:1,
$asi:function(){return[P.a9]},
$isk:1,
$ask:function(){return[P.a9]},
"%":"Float32Array"},
hq:{"^":"c9;",$isi:1,
$asi:function(){return[P.a9]},
$isk:1,
$ask:function(){return[P.a9]},
"%":"Float64Array"},
kC:{"^":"ak;",
i:function(a,b){if(b>>>0!==b||b>=a.length)H.w(H.C(a,b))
return a[b]},
$isi:1,
$asi:function(){return[P.m]},
$isk:1,
$ask:function(){return[P.m]},
"%":"Int16Array"},
kD:{"^":"ak;",
i:function(a,b){if(b>>>0!==b||b>=a.length)H.w(H.C(a,b))
return a[b]},
$isi:1,
$asi:function(){return[P.m]},
$isk:1,
$ask:function(){return[P.m]},
"%":"Int32Array"},
kE:{"^":"ak;",
i:function(a,b){if(b>>>0!==b||b>=a.length)H.w(H.C(a,b))
return a[b]},
$isi:1,
$asi:function(){return[P.m]},
$isk:1,
$ask:function(){return[P.m]},
"%":"Int8Array"},
kF:{"^":"ak;",
i:function(a,b){if(b>>>0!==b||b>=a.length)H.w(H.C(a,b))
return a[b]},
$isi:1,
$asi:function(){return[P.m]},
$isk:1,
$ask:function(){return[P.m]},
"%":"Uint16Array"},
kG:{"^":"ak;",
i:function(a,b){if(b>>>0!==b||b>=a.length)H.w(H.C(a,b))
return a[b]},
$isi:1,
$asi:function(){return[P.m]},
$isk:1,
$ask:function(){return[P.m]},
"%":"Uint32Array"},
kH:{"^":"ak;",
gG:function(a){return a.length},
i:function(a,b){if(b>>>0!==b||b>=a.length)H.w(H.C(a,b))
return a[b]},
$isi:1,
$asi:function(){return[P.m]},
$isk:1,
$ask:function(){return[P.m]},
"%":"CanvasPixelArray|Uint8ClampedArray"},
kI:{"^":"ak;",
gG:function(a){return a.length},
i:function(a,b){if(b>>>0!==b||b>=a.length)H.w(H.C(a,b))
return a[b]},
$isi:1,
$asi:function(){return[P.m]},
$isk:1,
$ask:function(){return[P.m]},
"%":";Uint8Array"},
dx:{"^":"c8+aN;",$asF:I.I,$isi:1,
$asi:function(){return[P.m]},
$asP:I.I,
$isk:1,
$ask:function(){return[P.m]}},
dy:{"^":"c8+aN;",$asF:I.I,$isi:1,
$asi:function(){return[P.a9]},
$asP:I.I,
$isk:1,
$ask:function(){return[P.a9]}},
dz:{"^":"dx+da;",$asF:I.I,
$asi:function(){return[P.m]},
$asP:I.I,
$ask:function(){return[P.m]}},
dA:{"^":"dy+da;",$asF:I.I,
$asi:function(){return[P.a9]},
$asP:I.I,
$ask:function(){return[P.a9]}}}],["","",,P,{"^":"",
iu:function(){var z,y,x
z={}
if(self.scheduleImmediate!=null)return P.jh()
if(self.MutationObserver!=null&&self.document!=null){y=self.document.createElement("div")
x=self.document.createElement("span")
z.a=null
new self.MutationObserver(H.aS(new P.iw(z),1)).observe(y,{childList:true})
return new P.iv(z,y,x)}else if(self.setImmediate!=null)return P.ji()
return P.jj()},
l9:[function(a){++init.globalState.f.b
self.scheduleImmediate(H.aS(new P.ix(a),0))},"$1","jh",2,0,3],
la:[function(a){++init.globalState.f.b
self.setImmediate(H.aS(new P.iy(a),0))},"$1","ji",2,0,3],
lb:[function(a){P.cm(C.H,a)},"$1","jj",2,0,3],
j9:function(){var z,y
for(;z=$.aA,z!=null;){$.aQ=null
y=z.b
$.aA=y
if(y==null)$.aP=null
z.a.$0()}},
ll:[function(){$.cx=!0
try{P.j9()}finally{$.aQ=null
$.cx=!1
if($.aA!=null)$.$get$cq().$1(P.eA())}},"$0","eA",0,0,2],
jd:function(a){var z=new P.el(a,null)
if($.aA==null){$.aP=z
$.aA=z
if(!$.cx)$.$get$cq().$1(P.eA())}else{$.aP.b=z
$.aP=z}},
je:function(a){var z,y,x
z=$.aA
if(z==null){P.jd(a)
$.aQ=$.aP
return}y=new P.el(a,null)
x=$.aQ
if(x==null){y.b=z
$.aQ=y
$.aA=y}else{y.b=x.b
x.b=y
$.aQ=y
if(y.b==null)$.aP=y}},
ib:function(a,b){var z=$.R
if(z===C.l){z.toString
return P.cm(a,b)}return P.cm(a,z.fm(b))},
e1:function(a,b){var z,y
z=$.R
if(z===C.l){z.toString
return P.e2(a,b)}y=z.cY(b)
$.R.toString
return P.e2(a,y)},
cm:function(a,b){var z=C.c.aG(a.a,1000)
return H.i6(z<0?0:z,b)},
e2:function(a,b){var z=C.c.aG(a.a,1000)
return H.i7(z<0?0:z,b)},
ew:function(a,b,c,d,e){var z={}
z.a=d
P.je(new P.ja(z,e))},
jb:function(a,b,c,d){var z,y
y=$.R
if(y===c)return d.$0()
$.R=c
z=y
try{y=d.$0()
return y}finally{$.R=z}},
jc:function(a,b,c,d,e){var z,y
y=$.R
if(y===c)return d.$1(e)
$.R=c
z=y
try{y=d.$1(e)
return y}finally{$.R=z}},
iw:{"^":"l:1;a",
$1:function(a){var z,y;--init.globalState.f.b
z=this.a
y=z.a
z.a=null
y.$0()}},
iv:{"^":"l:9;a,b,c",
$1:function(a){var z,y;++init.globalState.f.b
this.a.a=a
z=this.b
y=this.c
z.firstChild?z.removeChild(y):z.appendChild(y)}},
ix:{"^":"l:0;a",
$0:function(){--init.globalState.f.b
this.a.$0()}},
iy:{"^":"l:0;a",
$0:function(){--init.globalState.f.b
this.a.$0()}},
el:{"^":"c;a,b"},
e_:{"^":"c;"},
j3:{"^":"c;"},
ja:{"^":"l:0;a,b",
$0:function(){var z,y,x
z=this.a
y=z.a
if(y==null){x=new P.dE()
z.a=x
z=x}else z=y
y=this.b
if(y==null)throw H.f(z)
x=H.f(z)
x.stack=y.m(0)
throw x}},
iS:{"^":"j3;",
gbb:function(a){return},
hs:function(a){var z,y,x
try{if(C.l===$.R){a.$0()
return}P.jb(null,null,this,a)}catch(x){z=H.Y(x)
y=H.ba(x)
P.ew(null,null,this,z,y)}},
ht:function(a,b){var z,y,x
try{if(C.l===$.R){a.$1(b)
return}P.jc(null,null,this,a,b)}catch(x){z=H.Y(x)
y=H.ba(x)
P.ew(null,null,this,z,y)}},
fm:function(a){return new P.iT(this,a)},
cY:function(a){return new P.iU(this,a)},
i:function(a,b){return}},
iT:{"^":"l:0;a,b",
$0:function(){return this.a.hs(this.b)}},
iU:{"^":"l:1;a,b",
$1:function(a){return this.a.ht(this.b,a)}}}],["","",,P,{"^":"",
dp:function(){return new H.at(0,null,null,null,null,null,0,[null,null])},
aM:function(a){return H.jq(a,new H.at(0,null,null,null,null,null,0,[null,null]))},
aW:function(a,b,c,d,e){return new P.iG(0,null,null,null,null,[d,e])},
fX:function(a,b,c){var z,y
if(P.cy(a)){if(b==="("&&c===")")return"(...)"
return b+"..."+c}z=[]
y=$.$get$aR()
y.push(a)
try{P.j7(a,z)}finally{y.pop()}y=P.dP(b,z,", ")+c
return y.charCodeAt(0)==0?y:y},
bn:function(a,b,c){var z,y,x
if(P.cy(a))return b+"..."+c
z=new P.ck(b)
y=$.$get$aR()
y.push(a)
try{x=z
x.a=P.dP(x.gb1(),a,", ")}finally{y.pop()}y=z
y.a=y.gb1()+c
y=z.gb1()
return y.charCodeAt(0)==0?y:y},
cy:function(a){var z,y
for(z=0;y=$.$get$aR(),z<y.length;++z)if(a===y[z])return!0
return!1},
j7:function(a,b){var z,y,x,w,v,u,t,s,r,q
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
a3:function(a,b,c,d){return new P.iJ(0,null,null,null,null,null,0,[d])},
dq:function(a,b){var z,y,x
z=P.a3(null,null,null,b)
for(y=a.length,x=0;x<a.length;a.length===y||(0,H.eN)(a),++x)z.p(0,a[x])
return z},
hb:function(a){var z,y,x
z={}
if(P.cy(a))return"{...}"
y=new P.ck("")
try{$.$get$aR().push(a)
x=y
x.a=x.gb1()+"{"
z.a=!0
a.dc(0,new P.hc(z,y))
z=y
z.a=z.gb1()+"}"}finally{$.$get$aR().pop()}z=y.gb1()
return z.charCodeAt(0)==0?z:z},
iG:{"^":"c;a,b,c,d,e,$ti",
gG:function(a){return this.a},
b7:function(a){var z
if((a&0x3ffffff)===a){z=this.c
return z==null?!1:z[a]!=null}else return this.eV(a)},
eV:function(a){var z=this.d
if(z==null)return!1
return this.aF(z[this.aE(a)],a)>=0},
i:function(a,b){var z,y,x,w
if(typeof b==="string"&&b!=="__proto__"){z=this.b
if(z==null)y=null
else{x=z[b]
y=x===z?null:x}return y}else if(typeof b==="number"&&(b&0x3ffffff)===b){w=this.c
if(w==null)y=null
else{x=w[b]
y=x===w?null:x}return y}else return this.f_(b)},
f_:function(a){var z,y,x
z=this.d
if(z==null)return
y=z[this.aE(a)]
x=this.aF(y,a)
return x<0?null:y[x+1]},
n:function(a,b,c){var z,y
if(typeof b==="string"&&b!=="__proto__"){z=this.b
if(z==null){z=P.cr()
this.b=z}this.cG(z,b,c)}else if(typeof b==="number"&&(b&0x3ffffff)===b){y=this.c
if(y==null){y=P.cr()
this.c=y}this.cG(y,b,c)}else this.fe(b,c)},
fe:function(a,b){var z,y,x,w
z=this.d
if(z==null){z=P.cr()
this.d=z}y=this.aE(a)
x=z[y]
if(x==null){P.cs(z,y,[a,b]);++this.a
this.e=null}else{w=this.aF(x,a)
if(w>=0)x[w+1]=b
else{x.push(a,b);++this.a
this.e=null}}},
dc:function(a,b){var z,y,x,w
z=this.eS()
for(y=z.length,x=0;x<y;++x){w=z[x]
b.$2(w,this.i(0,w))
if(z!==this.e)throw H.f(new P.a1(this))}},
eS:function(){var z,y,x,w,v,u,t,s,r,q,p,o
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
cG:function(a,b,c){if(a[b]==null){++this.a
this.e=null}P.cs(a,b,c)},
aE:function(a){return J.aE(a)&0x3ffffff},
aF:function(a,b){var z,y
if(a==null)return-1
z=a.length
for(y=0;y<z;y+=2)if(J.Z(a[y],b))return y
return-1},
C:{
cs:function(a,b,c){if(c==null)a[b]=a
else a[b]=c},
cr:function(){var z=Object.create(null)
P.cs(z,"<non-identifier-key>",z)
delete z["<non-identifier-key>"]
return z}}},
es:{"^":"at;a,b,c,d,e,f,r,$ti",
bi:function(a){return H.jL(a)&0x3ffffff},
bj:function(a,b){var z,y,x
if(a==null)return-1
z=a.length
for(y=0;y<z;++y){x=a[y].a
if(x==null?b==null:x===b)return y}return-1},
C:{
aO:function(a,b){return new P.es(0,null,null,null,null,null,0,[a,b])}}},
iJ:{"^":"iH;a,b,c,d,e,f,r,$ti",
ga2:function(a){var z=new P.er(this,this.r,null,null)
z.c=this.e
return z},
gG:function(a){return this.a},
a3:function(a,b){var z,y
if(typeof b==="string"&&b!=="__proto__"){z=this.b
if(z==null)return!1
return z[b]!=null}else if(typeof b==="number"&&(b&0x3ffffff)===b){y=this.c
if(y==null)return!1
return y[b]!=null}else return this.eU(b)},
eU:function(a){var z=this.d
if(z==null)return!1
return this.aF(z[this.aE(a)],a)>=0},
di:function(a){var z=typeof a==="number"&&(a&0x3ffffff)===a
if(z)return this.a3(0,a)?a:null
else return this.f6(a)},
f6:function(a){var z,y,x
z=this.d
if(z==null)return
y=z[this.aE(a)]
x=this.aF(y,a)
if(x<0)return
return J.cJ(y,x).geY()},
p:function(a,b){var z,y,x
if(typeof b==="string"&&b!=="__proto__"){z=this.b
if(z==null){y=Object.create(null)
y["<non-identifier-key>"]=y
delete y["<non-identifier-key>"]
this.b=y
z=y}return this.cF(z,b)}else if(typeof b==="number"&&(b&0x3ffffff)===b){x=this.c
if(x==null){y=Object.create(null)
y["<non-identifier-key>"]=y
delete y["<non-identifier-key>"]
this.c=y
x=y}return this.cF(x,b)}else return this.aD(b)},
aD:function(a){var z,y,x
z=this.d
if(z==null){z=P.iL()
this.d=z}y=this.aE(a)
x=z[y]
if(x==null)z[y]=[this.bK(a)]
else{if(this.aF(x,a)>=0)return!1
x.push(this.bK(a))}return!0},
bl:function(a,b){if(typeof b==="string"&&b!=="__proto__")return this.cH(this.b,b)
else if(typeof b==="number"&&(b&0x3ffffff)===b)return this.cH(this.c,b)
else return this.fa(b)},
fa:function(a){var z,y,x
z=this.d
if(z==null)return!1
y=z[this.aE(a)]
x=this.aF(y,a)
if(x<0)return!1
this.cI(y.splice(x,1)[0])
return!0},
b5:function(a){if(this.a>0){this.f=null
this.e=null
this.d=null
this.c=null
this.b=null
this.a=0
this.r=this.r+1&67108863}},
cF:function(a,b){if(a[b]!=null)return!1
a[b]=this.bK(b)
return!0},
cH:function(a,b){var z
if(a==null)return!1
z=a[b]
if(z==null)return!1
this.cI(z)
delete a[b]
return!0},
bK:function(a){var z,y
z=new P.iK(a,null,null)
if(this.e==null){this.f=z
this.e=z}else{y=this.f
z.c=y
y.b=z
this.f=z}++this.a
this.r=this.r+1&67108863
return z},
cI:function(a){var z,y
z=a.c
y=a.b
if(z==null)this.e=y
else z.b=y
if(y==null)this.f=z
else y.c=z;--this.a
this.r=this.r+1&67108863},
aE:function(a){return J.aE(a)&0x3ffffff},
aF:function(a,b){var z,y
if(a==null)return-1
z=a.length
for(y=0;y<z;++y)if(J.Z(a[y].a,b))return y
return-1},
$isi:1,
$asi:null,
C:{
iL:function(){var z=Object.create(null)
z["<non-identifier-key>"]=z
delete z["<non-identifier-key>"]
return z}}},
iK:{"^":"c;eY:a<,b,c"},
er:{"^":"c;a,b,c,d",
gP:function(){return this.d},
M:function(){var z=this.a
if(this.b!==z.r)throw H.f(new P.a1(z))
else{z=this.c
if(z==null){this.d=null
return!1}else{this.d=z.a
this.c=z.b
return!0}}}},
iH:{"^":"hT;$ti"},
dr:{"^":"hu;$ti"},
aN:{"^":"c;$ti",
ga2:function(a){return new H.ds(a,this.gG(a),0,null)},
al:function(a,b){return this.i(a,b)},
dj:function(a,b){return new H.c6(a,b,[H.an(a,"aN",0),null])},
fY:function(a,b,c){var z,y,x
z=this.gG(a)
for(y=b,x=0;x<z;++x){y=c.$2(y,this.i(a,x))
if(z!==this.gG(a))throw H.f(new P.a1(a))}return y},
m:function(a){return P.bn(a,"[","]")},
$isi:1,
$asi:null,
$isk:1,
$ask:null},
hc:{"^":"l:10;a,b",
$2:function(a,b){var z,y
z=this.a
if(!z.a)this.b.a+=", "
z.a=!1
z=this.b
y=z.a+=H.d(a)
z.a=y+": "
z.a+=H.d(b)}},
h8:{"^":"b0;a,b,c,d,$ti",
ga2:function(a){return new P.iM(this,this.c,this.d,this.b,null)},
gbk:function(a){return this.b===this.c},
gG:function(a){return(this.c-this.b&this.a.length-1)>>>0},
al:function(a,b){var z,y
z=(this.c-this.b&this.a.length-1)>>>0
if(0>b||b>=z)H.w(P.aL(b,this,"index",null,z))
y=this.a
return y[(this.b+b&y.length-1)>>>0]},
b5:function(a){var z,y,x,w
z=this.b
y=this.c
if(z!==y){for(x=this.a,w=x.length-1;z!==y;z=(z+1&w)>>>0)x[z]=null
this.c=0
this.b=0;++this.d}},
m:function(a){return P.bn(this,"{","}")},
dt:function(){var z,y,x
z=this.b
if(z===this.c)throw H.f(H.bZ());++this.d
y=this.a
x=y[z]
y[z]=null
this.b=(z+1&y.length-1)>>>0
return x},
aD:function(a){var z,y
z=this.a
y=this.c
z[y]=a
z=(y+1&z.length-1)>>>0
this.c=z
if(this.b===z)this.cO();++this.d},
cO:function(){var z,y,x,w
z=new Array(this.a.length*2)
z.fixed$length=Array
y=H.e(z,this.$ti)
z=this.a
x=this.b
w=z.length-x
C.d.a7(y,0,w,z,x)
C.d.a7(y,w,w+this.b,this.a,0)
this.b=0
this.c=this.a.length
this.a=y},
eC:function(a,b){var z=new Array(8)
z.fixed$length=Array
this.a=H.e(z,[b])},
$asi:null,
C:{
c2:function(a,b){var z=new P.h8(null,0,0,0,[b])
z.eC(a,b)
return z}}},
iM:{"^":"c;a,b,c,d,e",
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
hU:{"^":"c;$ti",
aH:function(a,b){var z
for(z=J.aT(b);z.M();)this.p(0,z.gP())},
m:function(a){return P.bn(this,"{","}")},
$isi:1,
$asi:null},
hT:{"^":"hU;$ti"},
hu:{"^":"c+aN;",$isi:1,$asi:null,$isk:1,$ask:null}}],["","",,P,{"^":"",
jY:[function(a,b){return J.eR(a,b)},"$2","jn",4,0,15],
d8:function(a){if(typeof a==="number"||typeof a==="boolean"||null==a)return J.aa(a)
if(typeof a==="string")return JSON.stringify(a)
return P.fD(a)},
fD:function(a){var z=J.u(a)
if(!!z.$isl)return z.m(a)
return H.bs(a)},
bl:function(a){return new P.iF(a)},
au:function(a,b,c,d){var z,y,x
z=J.h_(a,d)
if(a!==0&&!0)for(y=z.length,x=0;x<y;++x)z[x]=b
return z},
c3:function(a,b,c){var z,y
z=H.e([],[c])
for(y=J.aT(a);y.M();)z.push(y.gP())
return z},
cH:function(a){H.jM(H.d(a))},
cz:{"^":"c;"},
"+bool":0,
x:{"^":"c;"},
a9:{"^":"S;",$isx:1,
$asx:function(){return[P.S]}},
"+double":0,
aI:{"^":"c;a",
A:function(a,b){return new P.aI(C.c.A(this.a,b.gcK()))},
a0:function(a,b){return C.c.a0(this.a,b.gcK())},
bE:function(a,b){return C.c.bE(this.a,b.gcK())},
Z:function(a,b){if(b==null)return!1
if(!(b instanceof P.aI))return!1
return this.a===b.a},
gW:function(a){return this.a&0x1FFFFFFF},
b6:function(a,b){return C.c.b6(this.a,b.a)},
m:function(a){var z,y,x,w,v
z=new P.fw()
y=this.a
if(y<0)return"-"+new P.aI(0-y).m(0)
x=z.$1(C.c.aG(y,6e7)%60)
w=z.$1(C.c.aG(y,1e6)%60)
v=new P.fv().$1(y%1e6)
return""+C.c.aG(y,36e8)+":"+H.d(x)+":"+H.d(w)+"."+H.d(v)},
$isx:1,
$asx:function(){return[P.aI]},
C:{
d4:function(a,b,c,d,e,f){return new P.aI(864e8*a+36e8*b+6e7*e+1e6*f+1000*d+c)}}},
fv:{"^":"l:4;",
$1:function(a){if(a>=1e5)return""+a
if(a>=1e4)return"0"+a
if(a>=1000)return"00"+a
if(a>=100)return"000"+a
if(a>=10)return"0000"+a
return"00000"+a}},
fw:{"^":"l:4;",
$1:function(a){if(a>=10)return""+a
return"0"+a}},
E:{"^":"c;"},
dE:{"^":"E;",
m:function(a){return"Throw of null."}},
ah:{"^":"E;a,b,c,d",
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
u=P.d8(this.b)
return w+v+": "+H.d(u)},
C:{
cO:function(a){return new P.ah(!1,null,null,a)},
cP:function(a,b,c){return new P.ah(!0,a,b,c)}}},
dJ:{"^":"ah;e,f,a,b,c,d",
gbN:function(){return"RangeError"},
gbM:function(){var z,y,x
z=this.e
if(z==null){z=this.f
y=z!=null?": Not less than or equal to "+H.d(z):""}else{x=this.f
if(x==null)y=": Not greater than or equal to "+H.d(z)
else if(x>z)y=": Not in range "+H.d(z)+".."+H.d(x)+", inclusive"
else y=x<z?": Valid value range is empty":": Only valid value is "+H.d(z)}return y},
C:{
bt:function(a,b,c){return new P.dJ(null,null,!0,a,b,"Value not in range")},
a6:function(a,b,c,d,e){return new P.dJ(b,c,!0,a,d,"Invalid value")},
cg:function(a,b,c,d,e,f){if(0>a||a>c)throw H.f(P.a6(a,0,c,"start",f))
if(a>b||b>c)throw H.f(P.a6(b,a,c,"end",f))
return b}}},
fK:{"^":"ah;e,G:f>,a,b,c,d",
gbN:function(){return"RangeError"},
gbM:function(){if(J.cI(this.b,0))return": index must not be negative"
var z=this.f
if(z===0)return": no indices are valid"
return": index should be less than "+H.d(z)},
C:{
aL:function(a,b,c,d,e){var z=e!=null?e:J.ao(b)
return new P.fK(b,z,!0,a,c,"Index out of range")}}},
M:{"^":"E;a",
m:function(a){return"Unsupported operation: "+this.a}},
eg:{"^":"E;a",
m:function(a){var z=this.a
return z!=null?"UnimplementedError: "+z:"UnimplementedError"}},
b4:{"^":"E;a",
m:function(a){return"Bad state: "+this.a}},
a1:{"^":"E;a",
m:function(a){var z=this.a
if(z==null)return"Concurrent modification during iteration."
return"Concurrent modification during iteration: "+H.d(P.d8(z))+"."}},
dO:{"^":"c;",
m:function(a){return"Stack Overflow"},
$isE:1},
fj:{"^":"E;a",
m:function(a){var z=this.a
return z==null?"Reading static variable during its initialization":"Reading static variable '"+z+"' during its initialization"}},
iF:{"^":"c;a",
m:function(a){var z=this.a
if(z==null)return"Exception"
return"Exception: "+H.d(z)}},
fE:{"^":"c;a,b",
m:function(a){return"Expando:"+H.d(this.a)},
i:function(a,b){var z,y
z=this.b
if(typeof z!=="string"){if(b==null||typeof b==="boolean"||typeof b==="number"||typeof b==="string")H.w(P.cP(b,"Expandos are not allowed on strings, numbers, booleans or null",null))
return z.get(b)}y=H.ce(b,"expando$values")
return y==null?null:H.ce(y,z)},
n:function(a,b,c){var z,y
z=this.b
if(typeof z!=="string")z.set(b,c)
else{y=H.ce(b,"expando$values")
if(y==null){y=new P.c()
H.dH(b,"expando$values",y)}H.dH(y,z,c)}}},
m:{"^":"S;",$isx:1,
$asx:function(){return[P.S]}},
"+int":0,
a2:{"^":"c;$ti",
ce:["em",function(a,b){return new H.ek(this,b,[H.an(this,"a2",0)])}],
gG:function(a){var z,y
z=this.ga2(this)
for(y=0;z.M();)++y
return y},
gaZ:function(a){var z,y
z=this.ga2(this)
if(!z.M())throw H.f(H.bZ())
y=z.gP()
if(z.M())throw H.f(H.fZ())
return y},
al:function(a,b){var z,y,x
if(b<0)H.w(P.a6(b,0,null,"index",null))
for(z=this.ga2(this),y=0;z.M();){x=z.gP()
if(b===y)return x;++y}throw H.f(P.aL(b,this,"index",null,y))},
m:function(a){return P.fX(this,"(",")")}},
dh:{"^":"c;"},
k:{"^":"c;$ti",$isi:1,$asi:null,$ask:null},
"+List":0,
av:{"^":"c;",
gW:function(a){return P.c.prototype.gW.call(this,this)},
m:function(a){return"null"}},
"+Null":0,
S:{"^":"c;",$isx:1,
$asx:function(){return[P.S]}},
"+num":0,
c:{"^":";",
Z:function(a,b){return this===b},
gW:function(a){return H.am(this)},
m:function(a){return H.bs(this)},
toString:function(){return this.m(this)}},
bw:{"^":"c;a,b",
bp:function(a){if(this.b!=null){this.a=this.a+($.v.$0()-this.b)
this.b=null}}},
z:{"^":"c;",$isx:1,
$asx:function(){return[P.z]}},
"+String":0,
ck:{"^":"c;b1:a<",
gG:function(a){return this.a.length},
m:function(a){var z=this.a
return z.charCodeAt(0)==0?z:z},
C:{
dP:function(a,b,c){var z=J.aT(b)
if(!z.M())return a
if(c.length===0){do a+=H.d(z.gP())
while(z.M())}else{a+=H.d(z.gP())
for(;z.M();)a=a+c+H.d(z.gP())}return a}}}}],["","",,W,{"^":"",
fC:function(a,b,c){var z,y
z=document.body
y=(z&&C.F).an(z,a,b,c)
y.toString
z=new H.ek(new W.X(y),new W.jm(),[W.q])
return z.gaZ(z)},
aK:function(a){var z,y,x
z="element tag unavailable"
try{y=J.eV(a)
if(typeof y==="string")z=a.tagName}catch(x){H.Y(x)}return z},
iC:function(a,b){return document.createElement(a)},
j5:function(a){if(a==null)return
return W.en(a)},
ex:function(a){var z=$.R
if(z===C.l)return a
return z.cY(a)},
y:{"^":"ar;","%":"HTMLBRElement|HTMLBaseElement|HTMLButtonElement|HTMLContentElement|HTMLDListElement|HTMLDataListElement|HTMLDetailsElement|HTMLDialogElement|HTMLDirectoryElement|HTMLDivElement|HTMLFieldSetElement|HTMLFontElement|HTMLFrameElement|HTMLHRElement|HTMLHeadElement|HTMLHeadingElement|HTMLHtmlElement|HTMLKeygenElement|HTMLLIElement|HTMLLabelElement|HTMLLegendElement|HTMLLinkElement|HTMLMapElement|HTMLMarqueeElement|HTMLMenuElement|HTMLMenuItemElement|HTMLMetaElement|HTMLMeterElement|HTMLModElement|HTMLOListElement|HTMLOptGroupElement|HTMLOptionElement|HTMLOutputElement|HTMLParagraphElement|HTMLParamElement|HTMLPictureElement|HTMLPreElement|HTMLProgressElement|HTMLQuoteElement|HTMLScriptElement|HTMLShadowElement|HTMLSlotElement|HTMLSourceElement|HTMLSpanElement|HTMLStyleElement|HTMLTableCaptionElement|HTMLTableCellElement|HTMLTableColElement|HTMLTableDataCellElement|HTMLTableHeaderCellElement|HTMLTextAreaElement|HTMLTitleElement|HTMLTrackElement|HTMLUListElement|HTMLUnknownElement;HTMLElement"},
jU:{"^":"y;",
m:function(a){return String(a)},
$ish:1,
"%":"HTMLAnchorElement"},
jW:{"^":"y;",
m:function(a){return String(a)},
$ish:1,
"%":"HTMLAreaElement"},
bM:{"^":"y;",$ish:1,$isbM:1,"%":"HTMLBodyElement"},
cS:{"^":"y;av:height}",$iscS:1,"%":"HTMLCanvasElement"},
jX:{"^":"q;G:length=",$ish:1,"%":"CDATASection|CharacterData|Comment|ProcessingInstruction|Text"},
jZ:{"^":"q;",$ish:1,"%":"DocumentFragment|ShadowRoot"},
k_:{"^":"h;",
m:function(a){return String(a)},
"%":"DOMException"},
ar:{"^":"q;hv:tagName=",
gfl:function(a){return new W.iB(a)},
m:function(a){return a.localName},
an:["bJ",function(a,b,c,d){var z,y,x,w,v
if(c==null){z=$.d7
if(z==null){z=H.e([],[W.dB])
y=new W.dC(z)
z.push(W.ep(null))
z.push(W.eu())
$.d7=y
d=y}else d=z
z=$.d6
if(z==null){z=new W.ev(d)
$.d6=z
c=z}else{z.a=d
c=z}}if($.ac==null){z=document
y=z.implementation.createHTMLDocument("")
$.ac=y
$.bW=y.createRange()
y=$.ac
y.toString
x=y.createElement("base")
x.href=z.baseURI
$.ac.head.appendChild(x)}z=$.ac
if(z.body==null){z.toString
y=z.createElement("body")
z.body=y}z=$.ac
if(!!this.$isbM)w=z.body
else{y=a.tagName
z.toString
w=z.createElement(y)
$.ac.body.appendChild(w)}if("createContextualFragment" in window.Range.prototype&&!C.d.a3(C.aa,a.tagName)){$.bW.selectNodeContents(w)
v=$.bW.createContextualFragment(b)}else{w.innerHTML=b
v=$.ac.createDocumentFragment()
for(;z=w.firstChild,z!=null;)v.appendChild(z)}z=$.ac.body
if(w==null?z!=null:w!==z)J.eX(w)
c.cq(v)
document.adoptNode(v)
return v},function(a,b,c){return this.an(a,b,c,null)},"fA",null,null,"ghO",2,5,null],
sdh:function(a,b){this.bG(a,b)},
bH:function(a,b,c,d){a.textContent=null
a.appendChild(this.an(a,b,c,d))},
bG:function(a,b){return this.bH(a,b,null,null)},
$ish:1,
$isc:1,
$isar:1,
$isq:1,
"%":";Element"},
jm:{"^":"l:1;",
$1:function(a){return!!J.u(a).$isar}},
k0:{"^":"y;av:height}","%":"HTMLEmbedElement"},
bX:{"^":"h;","%":"MediaStream;EventTarget"},
kl:{"^":"y;G:length=","%":"HTMLFormElement"},
kp:{"^":"y;av:height}","%":"HTMLIFrameElement"},
kq:{"^":"y;av:height}","%":"HTMLImageElement"},
ks:{"^":"y;av:height}",$ish:1,$isar:1,"%":"HTMLInputElement"},
kv:{"^":"h;",
m:function(a){return String(a)},
"%":"Location"},
hf:{"^":"y;","%":"HTMLAudioElement;HTMLMediaElement"},
ky:{"^":"hg;",
hI:function(a,b,c){return a.send(b,c)},
aB:function(a,b){return a.send(b)},
"%":"MIDIOutput"},
hg:{"^":"bX;","%":"MIDIInput;MIDIPort"},
kJ:{"^":"h;",$ish:1,"%":"Navigator"},
X:{"^":"dr;a",
gaZ:function(a){var z,y
z=this.a
y=z.childNodes.length
if(y===0)throw H.f(new P.b4("No elements"))
if(y>1)throw H.f(new P.b4("More than one element"))
return z.firstChild},
aH:function(a,b){var z,y,x,w
z=b.a
y=this.a
if(z!==y)for(x=z.childNodes.length,w=0;w<x;++w)y.appendChild(z.firstChild)
return},
n:function(a,b,c){var z=this.a
z.replaceChild(c,z.childNodes[b])},
ga2:function(a){var z=this.a.childNodes
return new W.db(z,z.length,-1,null)},
gG:function(a){return this.a.childNodes.length},
i:function(a,b){return this.a.childNodes[b]},
$asi:function(){return[W.q]},
$asdr:function(){return[W.q]},
$ask:function(){return[W.q]}},
q:{"^":"bX;bb:parentElement=,hi:previousSibling=",
ho:function(a){var z=a.parentNode
if(z!=null)z.removeChild(a)},
m:function(a){var z=a.nodeValue
return z==null?this.el(a):z},
$isc:1,
$isq:1,
"%":"Attr|Document|HTMLDocument|XMLDocument;Node"},
kK:{"^":"fO;",
gG:function(a){return a.length},
i:function(a,b){if(b>>>0!==b||b>=a.length)throw H.f(P.aL(b,a,null,null,null))
return a[b]},
n:function(a,b,c){throw H.f(new P.M("Cannot assign element of immutable List."))},
al:function(a,b){return a[b]},
$isF:1,
$asF:function(){return[W.q]},
$isi:1,
$asi:function(){return[W.q]},
$isP:1,
$asP:function(){return[W.q]},
$isk:1,
$ask:function(){return[W.q]},
"%":"NodeList|RadioNodeList"},
kL:{"^":"y;av:height}","%":"HTMLObjectElement"},
kY:{"^":"y;G:length=","%":"HTMLSelectElement"},
i2:{"^":"y;",
an:function(a,b,c,d){var z,y
if("createContextualFragment" in window.Range.prototype)return this.bJ(a,b,c,d)
z=W.fC("<table>"+b+"</table>",c,d)
y=document.createDocumentFragment()
y.toString
z.toString
new W.X(y).aH(0,new W.X(z))
return y},
"%":"HTMLTableElement"},
l0:{"^":"y;",
an:function(a,b,c,d){var z,y,x,w
if("createContextualFragment" in window.Range.prototype)return this.bJ(a,b,c,d)
z=document
y=z.createDocumentFragment()
z=C.R.an(z.createElement("table"),b,c,d)
z.toString
z=new W.X(z)
x=z.gaZ(z)
x.toString
z=new W.X(x)
w=z.gaZ(z)
y.toString
w.toString
new W.X(y).aH(0,new W.X(w))
return y},
"%":"HTMLTableRowElement"},
l1:{"^":"y;",
an:function(a,b,c,d){var z,y,x
if("createContextualFragment" in window.Range.prototype)return this.bJ(a,b,c,d)
z=document
y=z.createDocumentFragment()
z=C.R.an(z.createElement("table"),b,c,d)
z.toString
z=new W.X(z)
x=z.gaZ(z)
y.toString
x.toString
new W.X(y).aH(0,new W.X(x))
return y},
"%":"HTMLTableSectionElement"},
dS:{"^":"y;",
bH:function(a,b,c,d){var z
a.textContent=null
z=this.an(a,b,c,d)
a.content.appendChild(z)},
bG:function(a,b){return this.bH(a,b,null,null)},
$isdS:1,
"%":"HTMLTemplateElement"},
l5:{"^":"hf;av:height}","%":"HTMLVideoElement"},
im:{"^":"bX;",
cR:function(a,b){return a.requestAnimationFrame(H.aS(b,1))},
cL:function(a){if(!!(a.requestAnimationFrame&&a.cancelAnimationFrame))return;(function(b){var z=['ms','moz','webkit','o']
for(var y=0;y<z.length&&!b.requestAnimationFrame;++y){b.requestAnimationFrame=b[z[y]+'RequestAnimationFrame']
b.cancelAnimationFrame=b[z[y]+'CancelAnimationFrame']||b[z[y]+'CancelRequestAnimationFrame']}if(b.requestAnimationFrame&&b.cancelAnimationFrame)return
b.requestAnimationFrame=function(c){return window.setTimeout(function(){c(Date.now())},16)}
b.cancelAnimationFrame=function(c){clearTimeout(c)}})(a)},
gbb:function(a){return W.j5(a.parent)},
$ish:1,
"%":"DOMWindow|Window"},
lc:{"^":"q;",$ish:1,"%":"DocumentType"},
le:{"^":"y;",$ish:1,"%":"HTMLFrameSetElement"},
lh:{"^":"fN;",
gG:function(a){return a.length},
i:function(a,b){if(b>>>0!==b||b>=a.length)throw H.f(P.aL(b,a,null,null,null))
return a[b]},
n:function(a,b,c){throw H.f(new P.M("Cannot assign element of immutable List."))},
al:function(a,b){return a[b]},
$isF:1,
$asF:function(){return[W.q]},
$isi:1,
$asi:function(){return[W.q]},
$isP:1,
$asP:function(){return[W.q]},
$isk:1,
$ask:function(){return[W.q]},
"%":"MozNamedAttrMap|NamedNodeMap"},
iz:{"^":"c;f0:a<",
gb8:function(){var z,y,x,w,v
z=this.a.attributes
y=H.e([],[P.z])
for(x=z.length,w=0;w<x;++w){v=z[w]
if(v.namespaceURI==null)y.push(v.name)}return y}},
iB:{"^":"iz;a",
i:function(a,b){return this.a.getAttribute(b)},
n:function(a,b,c){this.a.setAttribute(b,c)},
gG:function(a){return this.gb8().length}},
ct:{"^":"c;a",
b4:function(a){return $.$get$eq().a3(0,W.aK(a))},
aS:function(a,b,c){var z,y,x
z=W.aK(a)
y=$.$get$cu()
x=y.i(0,H.d(z)+"::"+b)
if(x==null)x=y.i(0,"*::"+b)
if(x==null)return!1
return x.$4(a,b,c,this)},
eM:function(a){var z,y
z=$.$get$cu()
if(z.gbk(z)){for(y=0;y<262;++y)z.n(0,C.a9[y],W.jv())
for(y=0;y<12;++y)z.n(0,C.z[y],W.jw())}},
C:{
ep:function(a){var z,y
z=document.createElement("a")
y=new W.iV(z,window.location)
y=new W.ct(y)
y.eM(a)
return y},
lf:[function(a,b,c,d){return!0},"$4","jv",8,0,6],
lg:[function(a,b,c,d){var z,y,x,w,v
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
return z},"$4","jw",8,0,6]}},
dd:{"^":"c;$ti",
ga2:function(a){return new W.db(a,this.gG(a),-1,null)},
$isi:1,
$asi:null,
$isk:1,
$ask:null},
dC:{"^":"c;a",
b4:function(a){return C.d.cX(this.a,new W.ht(a))},
aS:function(a,b,c){return C.d.cX(this.a,new W.hs(a,b,c))}},
ht:{"^":"l:1;a",
$1:function(a){return a.b4(this.a)}},
hs:{"^":"l:1;a,b,c",
$1:function(a){return a.aS(this.a,this.b,this.c)}},
iW:{"^":"c;",
b4:function(a){return this.a.a3(0,W.aK(a))},
aS:["eo",function(a,b,c){var z,y
z=W.aK(a)
y=this.c
if(y.a3(0,H.d(z)+"::"+b))return this.d.fk(c)
else if(y.a3(0,"*::"+b))return this.d.fk(c)
else{y=this.b
if(y.a3(0,H.d(z)+"::"+b))return!0
else if(y.a3(0,"*::"+b))return!0
else if(y.a3(0,H.d(z)+"::*"))return!0
else if(y.a3(0,"*::*"))return!0}return!1}],
eN:function(a,b,c,d){var z,y,x
this.a.aH(0,c)
z=b.ce(0,new W.iX())
y=b.ce(0,new W.iY())
this.b.aH(0,z)
x=this.c
x.aH(0,C.ab)
x.aH(0,y)}},
iX:{"^":"l:1;",
$1:function(a){return!C.d.a3(C.z,a)}},
iY:{"^":"l:1;",
$1:function(a){return C.d.a3(C.z,a)}},
j0:{"^":"iW;e,a,b,c,d",
aS:function(a,b,c){if(this.eo(a,b,c))return!0
if(b==="template"&&c==="")return!0
if(a.getAttribute("template")==="")return this.e.a3(0,b)
return!1},
C:{
eu:function(){var z=P.z
z=new W.j0(P.dq(C.y,z),P.a3(null,null,null,z),P.a3(null,null,null,z),P.a3(null,null,null,z),null)
z.eN(null,new H.c6(C.y,new W.j1(),[H.af(C.y,0),null]),["TEMPLATE"],null)
return z}}},
j1:{"^":"l:1;",
$1:function(a){return"TEMPLATE::"+H.d(a)}},
j_:{"^":"c;",
b4:function(a){var z=J.u(a)
if(!!z.$isdL)return!1
z=!!z.$isp
if(z&&W.aK(a)==="foreignObject")return!1
if(z)return!0
return!1},
aS:function(a,b,c){if(b==="is"||C.v.eg(b,"on"))return!1
return this.b4(a)}},
db:{"^":"c;a,b,c,d",
M:function(){var z,y
z=this.c+1
y=this.b
if(z<y){this.d=J.cJ(this.a,z)
this.c=z
return!0}this.d=null
this.c=y
return!1},
gP:function(){return this.d}},
iA:{"^":"c;a",
gbb:function(a){return W.en(this.a.parent)},
$ish:1,
C:{
en:function(a){if(a===window)return a
else return new W.iA(a)}}},
dB:{"^":"c;"},
iV:{"^":"c;a,b"},
ev:{"^":"c;a",
cq:function(a){new W.j2(this).$2(a,null)},
bx:function(a,b){var z
if(b==null){z=a.parentNode
if(z!=null)z.removeChild(a)}else b.removeChild(a)},
fd:function(a,b){var z,y,x,w,v,u,t,s
z=!0
y=null
x=null
try{y=J.eS(a)
x=y.gf0().getAttribute("is")
w=function(c){if(!(c.attributes instanceof NamedNodeMap))return true
var r=c.childNodes
if(c.lastChild&&c.lastChild!==r[r.length-1])return true
if(c.children)if(!(c.children instanceof HTMLCollection||c.children instanceof NodeList))return true
var q=0
if(c.children)q=c.children.length
for(var p=0;p<q;p++){var o=c.children[p]
if(o.id=='attributes'||o.name=='attributes'||o.id=='lastChild'||o.name=='lastChild'||o.id=='children'||o.name=='children')return true}return false}(a)
z=w?!0:!(a.attributes instanceof NamedNodeMap)}catch(t){H.Y(t)}v="element unprintable"
try{v=J.aa(a)}catch(t){H.Y(t)}try{u=W.aK(a)
this.fc(a,b,z,v,u,y,x)}catch(t){if(H.Y(t) instanceof P.ah)throw t
else{this.bx(a,b)
window
s="Removing corrupted element "+H.d(v)
if(typeof console!="undefined")console.warn(s)}}},
fc:function(a,b,c,d,e,f,g){var z,y,x,w,v
if(c){this.bx(a,b)
window
z="Removing element due to corrupted attributes on <"+d+">"
if(typeof console!="undefined")console.warn(z)
return}if(!this.a.b4(a)){this.bx(a,b)
window
z="Removing disallowed element <"+H.d(e)+"> from "+J.aa(b)
if(typeof console!="undefined")console.warn(z)
return}if(g!=null)if(!this.a.aS(a,"is",g)){this.bx(a,b)
window
z="Removing disallowed type extension <"+H.d(e)+' is="'+g+'">'
if(typeof console!="undefined")console.warn(z)
return}z=f.gb8()
y=H.e(z.slice(0),[H.af(z,0)])
for(x=f.gb8().length-1,z=f.a;x>=0;--x){w=y[x]
if(!this.a.aS(a,J.eZ(w),z.getAttribute(w))){window
v="Removing disallowed attribute <"+H.d(e)+" "+w+'="'+H.d(z.getAttribute(w))+'">'
if(typeof console!="undefined")console.warn(v)
z.getAttribute(w)
z.removeAttribute(w)}}if(!!J.u(a).$isdS)this.cq(a.content)}},
j2:{"^":"l:11;a",
$2:function(a,b){var z,y,x,w
switch(a.nodeType){case 1:this.a.fd(a,b)
break
case 8:case 11:case 3:case 4:break
default:if(b==null){x=a.parentNode
if(x!=null)x.removeChild(a)}else b.removeChild(a)}z=a.lastChild
for(;null!=z;){y=null
try{y=J.eU(z)}catch(w){H.Y(w)
x=z
a.removeChild(x)
z=null
y=a.lastChild}if(z!=null)this.$2(z,a)
z=y}}},
fL:{"^":"h+aN;",$isi:1,
$asi:function(){return[W.q]},
$isk:1,
$ask:function(){return[W.q]}},
fM:{"^":"h+aN;",$isi:1,
$asi:function(){return[W.q]},
$isk:1,
$ask:function(){return[W.q]}},
fN:{"^":"fL+dd;",$isi:1,
$asi:function(){return[W.q]},
$isk:1,
$ask:function(){return[W.q]}},
fO:{"^":"fM+dd;",$isi:1,
$asi:function(){return[W.q]},
$isk:1,
$ask:function(){return[W.q]}}}],["","",,P,{"^":""}],["","",,P,{"^":"",jT:{"^":"as;",$ish:1,"%":"SVGAElement"},jV:{"^":"p;",$ish:1,"%":"SVGAnimateElement|SVGAnimateMotionElement|SVGAnimateTransformElement|SVGAnimationElement|SVGSetElement"},k1:{"^":"p;E:x=,F:y=",$ish:1,"%":"SVGFEBlendElement"},k2:{"^":"p;E:x=,F:y=",$ish:1,"%":"SVGFEColorMatrixElement"},k3:{"^":"p;E:x=,F:y=",$ish:1,"%":"SVGFEComponentTransferElement"},k4:{"^":"p;E:x=,F:y=",$ish:1,"%":"SVGFECompositeElement"},k5:{"^":"p;E:x=,F:y=",$ish:1,"%":"SVGFEConvolveMatrixElement"},k6:{"^":"p;E:x=,F:y=",$ish:1,"%":"SVGFEDiffuseLightingElement"},k7:{"^":"p;E:x=,F:y=",$ish:1,"%":"SVGFEDisplacementMapElement"},k8:{"^":"p;E:x=,F:y=",$ish:1,"%":"SVGFEFloodElement"},k9:{"^":"p;E:x=,F:y=",$ish:1,"%":"SVGFEGaussianBlurElement"},ka:{"^":"p;E:x=,F:y=",$ish:1,"%":"SVGFEImageElement"},kb:{"^":"p;E:x=,F:y=",$ish:1,"%":"SVGFEMergeElement"},kc:{"^":"p;E:x=,F:y=",$ish:1,"%":"SVGFEMorphologyElement"},kd:{"^":"p;E:x=,F:y=",$ish:1,"%":"SVGFEOffsetElement"},ke:{"^":"p;E:x=,F:y=","%":"SVGFEPointLightElement"},kf:{"^":"p;E:x=,F:y=",$ish:1,"%":"SVGFESpecularLightingElement"},kg:{"^":"p;E:x=,F:y=","%":"SVGFESpotLightElement"},kh:{"^":"p;E:x=,F:y=",$ish:1,"%":"SVGFETileElement"},ki:{"^":"p;E:x=,F:y=",$ish:1,"%":"SVGFETurbulenceElement"},kj:{"^":"p;E:x=,F:y=",$ish:1,"%":"SVGFilterElement"},kk:{"^":"as;E:x=,F:y=","%":"SVGForeignObjectElement"},fJ:{"^":"as;","%":"SVGCircleElement|SVGEllipseElement|SVGLineElement|SVGPathElement|SVGPolygonElement|SVGPolylineElement;SVGGeometryElement"},as:{"^":"p;",$ish:1,"%":"SVGClipPathElement|SVGDefsElement|SVGGElement|SVGSwitchElement;SVGGraphicsElement"},kr:{"^":"as;E:x=,F:y=",$ish:1,"%":"SVGImageElement"},kw:{"^":"p;",$ish:1,"%":"SVGMarkerElement"},kx:{"^":"p;E:x=,F:y=",$ish:1,"%":"SVGMaskElement"},kP:{"^":"p;E:x=,F:y=",$ish:1,"%":"SVGPatternElement"},kQ:{"^":"h;G:length=","%":"SVGPointList"},kU:{"^":"h;av:height},E:x=,F:y=","%":"SVGRect"},kV:{"^":"fJ;E:x=,F:y=","%":"SVGRectElement"},dL:{"^":"p;",$ish:1,$isdL:1,"%":"SVGScriptElement"},p:{"^":"ar;",
sdh:function(a,b){this.bG(a,b)},
an:function(a,b,c,d){var z,y,x,w,v,u
z=H.e([],[W.dB])
z.push(W.ep(null))
z.push(W.eu())
z.push(new W.j_())
c=new W.ev(new W.dC(z))
y='<svg version="1.1">'+b+"</svg>"
z=document
x=z.body
w=(x&&C.F).fA(x,y,c)
v=z.createDocumentFragment()
w.toString
z=new W.X(w)
u=z.gaZ(z)
for(;z=u.firstChild,z!=null;)v.appendChild(z)
return v},
$ish:1,
$isp:1,
"%":"SVGComponentTransferFunctionElement|SVGDescElement|SVGDiscardElement|SVGFEDistantLightElement|SVGFEFuncAElement|SVGFEFuncBElement|SVGFEFuncGElement|SVGFEFuncRElement|SVGFEMergeNodeElement|SVGMetadataElement|SVGStopElement|SVGStyleElement|SVGTitleElement;SVGElement"},kZ:{"^":"as;E:x=,F:y=",$ish:1,"%":"SVGSVGElement"},l_:{"^":"p;",$ish:1,"%":"SVGSymbolElement"},dT:{"^":"as;","%":";SVGTextContentElement"},l2:{"^":"dT;",$ish:1,"%":"SVGTextPathElement"},l3:{"^":"dT;E:x=,F:y=","%":"SVGTSpanElement|SVGTextElement|SVGTextPositioningElement"},l4:{"^":"as;E:x=,F:y=",$ish:1,"%":"SVGUseElement"},l6:{"^":"p;",$ish:1,"%":"SVGViewElement"},ld:{"^":"p;",$ish:1,"%":"SVGGradientElement|SVGLinearGradientElement|SVGRadialGradientElement"},li:{"^":"p;",$ish:1,"%":"SVGCursorElement"},lj:{"^":"p;",$ish:1,"%":"SVGFEDropShadowElement"},lk:{"^":"p;",$ish:1,"%":"SVGMPathElement"}}],["","",,P,{"^":"",fG:{"^":"c;",$isi:1,
$asi:function(){return[P.a9]},
$isk:1,
$ask:function(){return[P.a9]}}}],["","",,P,{"^":""}],["","",,P,{"^":""}],["","",,P,{"^":""}],["","",,V,{"^":"",
h2:function(a,a0){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b
switch(a0.a){case C.M:H.n(a0,"$iskA")
z=new E.a(new Float64Array(H.b(2)))
y=new E.a(new Float64Array(H.b(2)))
x=new E.a(new Float64Array(H.b(2)))
w=new V.hi(z,y,0,0,0,x,0,0,0,new E.a(new Float64Array(H.b(2))),new E.a(new Float64Array(H.b(2))),0,0,new E.a4(new Float64Array(H.b(4))),new E.a(new Float64Array(H.b(2))),a0.gax(a0),null,null,null,null,null,null,!1,!1,null,null)
w.ag(a.ch,a0)
y.h(a0.gi5(a0))
G.co(w.r.d,y,z)
w.fr=a0.gdl()
x.I()
w.cy=a0.gdd()
w.db=a0.gd6()
return w
case C.x:H.n(a0,"$isd_")
z=new Float64Array(H.b(2))
y=new Float64Array(H.b(2))
x=new Float64Array(H.b(2))
w=new Float64Array(H.b(2))
v=new Float64Array(H.b(2))
u=new E.a(new Float64Array(H.b(2)))
u.h(a0.f)
t=new E.a(new Float64Array(H.b(2)))
t.h(a0.r)
v=new V.bU(0,0,0,u,t,0,0,0,0,0,new E.a(z),new E.a(y),new E.a(x),new E.a(w),new E.a(v),0,0,0,0,0,a0.a,null,null,null,null,null,null,!1,!1,null,null)
v.ag(a.ch,a0)
v.fx=a0.x
v.ch=a0.y
v.cx=a0.z
return v
case C.a4:H.n(a0,"$iskS")
z=new Float64Array(H.b(3))
y=new Float64Array(H.b(2))
x=new Float64Array(H.b(2))
w=new Float64Array(H.b(2))
v=new Float64Array(H.b(2))
u=new Float64Array(H.b(9))
t=a0.gb9()
s=new E.a(new Float64Array(H.b(2)))
s.h(t)
t=a0.gba()
r=new E.a(new Float64Array(H.b(2)))
r.h(t)
t=a0.ghc()
q=new E.a(new Float64Array(H.b(2)))
q.h(t)
q.X()
t=new E.a(new Float64Array(H.b(2)))
u=new V.hK(s,r,q,t,null,new E.ae(z),0,0,0,0,0,!1,!1,null,0,0,new E.a(y),new E.a(x),0,0,0,0,new E.a(w),new E.a(v),0,0,0,0,new E.aj(u),0,a0.gax(a0),null,null,null,null,null,null,!1,!1,null,null)
u.ag(a.ch,a0)
q.O(1,t)
u.dx=a0.gds()
u.fx=a0.ghY()
u.fy=a0.gi8()
u.go=a0.gi_()
u.id=a0.gdm()
u.k1=a0.gfN()
u.k2=a0.gd7()
u.k3=C.m
return u
case C.a1:H.n(a0,"$iskW")
z=new E.a(new Float64Array(H.b(2)))
y=new E.a(new Float64Array(H.b(2)))
x=new V.hP(z,y,new E.ae(new Float64Array(H.b(3))),0,!1,0,0,!1,0,0,0,0,0,new E.a(new Float64Array(H.b(2))),new E.a(new Float64Array(H.b(2))),new E.a(new Float64Array(H.b(2))),new E.a(new Float64Array(H.b(2))),0,0,0,0,new E.aj(new Float64Array(H.b(9))),0,C.m,a0.gax(a0),null,null,null,null,null,null,!1,!1,null,null)
x.ag(a.ch,a0)
z.h(a0.gb9())
y.h(a0.gba())
x.fy=a0.gds()
x.go=a0.ghX()
x.id=a0.gi7()
x.dy=a0.ghe()
x.fr=a0.gdm()
x.fx=a0.gfN()
x.dx=a0.gd7()
return x
case C.a7:H.n(a0,"$isl7")
z=new Float64Array(H.b(2))
y=new Float64Array(H.b(2))
x=new Float64Array(H.b(2))
w=new Float64Array(H.b(2))
v=new Float64Array(H.b(9))
u=a0.gb9()
t=new E.a(new Float64Array(H.b(2)))
t.h(u)
u=a0.gba()
s=new E.a(new Float64Array(H.b(2)))
s.h(u)
v=new V.ij(0,0,0,t,s,0,0,new E.ae(new Float64Array(H.b(3))),0,0,new E.a(z),new E.a(y),new E.a(x),new E.a(w),0,0,0,0,new E.aj(v),a0.gax(a0),null,null,null,null,null,null,!1,!1,null,null)
v.ag(a.ch,a0)
v.dy=a0.gds()
v.ch=a0.gdd()
v.cx=a0.gd6()
return v
case C.N:H.n(a0,"$iskm")
z=new Float64Array(H.b(2))
y=new Float64Array(H.b(2))
x=new Float64Array(H.b(2))
w=new Float64Array(H.b(2))
v=new Float64Array(H.b(4))
u=a0.gb9()
t=new E.a(new Float64Array(H.b(2)))
t.h(u)
u=a0.gba()
s=new E.a(new Float64Array(H.b(2)))
s.h(u)
v=new V.fH(t,s,new E.a(new Float64Array(H.b(2))),0,0,0,0,0,new E.a(z),new E.a(y),new E.a(x),new E.a(w),0,0,0,0,new E.a4(v),0,a0.gax(a0),null,null,null,null,null,null,!1,!1,null,null)
v.ag(a.ch,a0)
v.dx=a0.gdl()
v.dy=a0.ghf()
return v
case C.a6:H.n(a0,"$isl8")
z=new E.a(new Float64Array(H.b(2)))
y=new E.a(new Float64Array(H.b(2)))
x=new E.a(new Float64Array(H.b(2)))
w=new E.a(new Float64Array(H.b(2)))
v=new V.ik(0,0,z,y,x,w,0,0,0,0,0,!1,0,0,new E.a(new Float64Array(H.b(2))),new E.a(new Float64Array(H.b(2))),0,0,0,0,new E.a(new Float64Array(H.b(2))),new E.a(new Float64Array(H.b(2))),0,0,0,0,0,0,0,0,0,new E.a(new Float64Array(H.b(2))),new E.a(new Float64Array(H.b(2))),new E.a(new Float64Array(H.b(2))),a0.gax(a0),null,null,null,null,null,null,!1,!1,null,null)
v.ag(a.ch,a0)
z.h(a0.gb9())
y.h(a0.gba())
x.h(a0.ghc())
x.O(1,w)
v.V=0
v.fx=0
v.go=a0.ghe()
v.id=a0.gdm()
v.k1=a0.gd7()
v.ch=a0.gdd()
v.cx=a0.gd6()
return v
case C.a5:H.n(a0,"$isko")
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
n=a0.gc5()
m=a0.gc6()
l=a0.gc5().dL()
k=a0.gc6().dL()
j=a0.gc5().dD()
i=a0.gc6().dD()
o=new V.fI(n,m,l,k,j,i,z,y,x,w,v,u,0,0,0,0,0,0,0,0,0,new E.a(t),new E.a(s),new E.a(r),new E.a(q),0,0,0,0,0,0,0,0,new E.a(p),new E.a(o),0,0,0,0,0,a0.gax(a0),null,null,null,null,null,null,!1,!1,null,null)
o.ag(a.ch,a0)
n=n.dF()
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
f=a0.gc5()
x.h(f.gf3())
z.h(f.gf4())
o.k2=f.gf9()
v.h(f.gf5())
G.j(h.b,z,t)
t.p(0,h.a)
t.j(g.gbA())
G.W(g.gc8(),t,r)
r.j(x)
e=r.v(v)
o.Q.a.b-=2
z=m.dF()
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
f=a0.gc6()
w.h(f.gf3())
y.h(f.gf4())
o.k3=f.gf9()
u.h(f.gf5())
G.j(d.b,y,z)
z.p(0,d.a)
z.j(c.gbA())
G.W(c.gc8(),z,v)
v.j(w)
b=v.v(u)
o.Q.a.b-=2
z=a0.ghm()
o.r1=z
o.k4=e+z*b
o.r2=0
return o
case C.L:H.n(a0,"$iskT")
z=new E.a(new Float64Array(H.b(2)))
y=new E.a(new Float64Array(H.b(2)))
x=new E.a(new Float64Array(H.b(2)))
w=new E.a(new Float64Array(H.b(2)))
v=new V.dI(z,y,0,0,x,w,0,0,0,0,0,new E.a(new Float64Array(H.b(2))),new E.a(new Float64Array(H.b(2))),new E.a(new Float64Array(H.b(2))),new E.a(new Float64Array(H.b(2))),new E.a(new Float64Array(H.b(2))),new E.a(new Float64Array(H.b(2))),0,0,0,0,0,a0.gax(a0),null,null,null,null,null,null,!1,!1,null,null)
v.ag(a.ch,a0)
z.h(a0.ghE())
y.h(a0.ghF())
x.h(a0.gb9())
w.h(a0.gba())
v.fx=a0.ghm()
v.cy=a0.gha()
v.db=a0.ghb()
v.fr=a0.gha().A(0,C.c.B(v.fx,a0.ghb()))
v.fy=0
return v
case C.w:return V.fd(a,H.n(a0,"$iscU"))
case C.a2:H.n(a0,"$iskX")
z=new E.a(new Float64Array(H.b(2)))
y=new E.a(new Float64Array(H.b(2)))
x=new V.hQ(z,y,0,0,0,0,0,new E.a(new Float64Array(H.b(2))),new E.a(new Float64Array(H.b(2))),new E.a(new Float64Array(H.b(2))),new E.a(new Float64Array(H.b(2))),new E.a(new Float64Array(H.b(2))),0,0,0,0,0,C.m,a0.gax(a0),null,null,null,null,null,null,!1,!1,null,null)
x.ag(a.ch,a0)
z.h(a0.gb9())
y.h(a0.gba())
x.cy=a0.ghZ(a0)
return x
case C.a3:H.n(a0,"$iskz")
z=new E.a(new Float64Array(H.b(2)))
y=new V.hh(z,0,new E.a(new Float64Array(H.b(2))),0,0,0,0,0,0,new E.a(new Float64Array(H.b(2))),new E.a(new Float64Array(H.b(2))),new E.a(new Float64Array(H.b(2))),new E.a(new Float64Array(H.b(2))),new E.a(new Float64Array(H.b(2))),0,0,0,0,0,new E.a4(new Float64Array(H.b(4))),0,a0.gax(a0),null,null,null,null,null,null,!1,!1,null,null)
y.ag(a.ch,a0)
z.h(a0.ghW())
y.cx=a0.ghM()
y.db=0
y.dx=a0.gdl()
y.dy=a0.ghf()
y.fr=a0.ghN()
return y
case C.a0:default:return}},
hF:function(a){return a.gc2(a).a0(0,0)},
fe:{"^":"c;",
cu:function(a,b){var z,y,x
z=a.y
y=b.y
x=z.c
if(x===y.c&&x!==0)return x>0
return(z.b&y.a)!==0&&(z.a&y.b)!==0}},
cV:{"^":"c;a,b,c"},
fk:{"^":"c;"},
ag:{"^":"c;a,b",
cf:function(a){var z,y,x
z=this.a.a
y=this.b.a
x=a.a
x[0]=(z[0]+y[0])*0.5
x[1]=(z[1]+y[1])*0.5},
a_:function(a,b){var z,y,x,w
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
C:{
aF:function(){return new V.ag(new E.a(new Float64Array(H.b(2))),new E.a(new Float64Array(H.b(2))))},
f_:function(a,b){var z,y
z=b.a.a
y=a.b.a
if(z[0]-y[0]>0||z[1]-y[1]>0)return!1
z=a.a.a
y=b.b.a
if(z[0]-y[0]>0||z[1]-y[1]>0)return!1
return!0}}},
fl:{"^":"c;a,b,c,d,e,f,r,x,y",
hw:function(a,b){var z,y,x,w
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
cd:function(a){var z,y,x,w,v,u,t,s,r
this.x=0
for(z=this.a,y=0;y<this.e;++y){x=this.c[y]
this.y=x
if(x===-1)continue
z.hk(0,this,z.b[x].gaQ())}this.e=0
F.eK(this.f,0,this.x)
for(y=0;y<this.x;){w=this.f[y]
x=w.a
v=z.b[x].gay()
x=w.b
a.fj(v,z.b[x].gay());++y
for(x=this.x,u=this.f;y<x;){t=u[y]
s=t.a
r=w.a
if(s==null?r==null:s===r){s=t.b
r=w.b
r=s==null?r!=null:s!==r
s=r}else s=!0
if(s)break;++y}}},
cZ:function(a){var z,y,x
z=this.e
y=this.d
if(z===y){x=this.c
z=y*2
this.d=z
z=new Array(z)
z.fixed$length=Array
z=H.e(z,[P.m])
this.c=z
C.d.a7(z,0,x.length,x,0)}z=this.c
y=this.e
z[y]=a
this.e=y+1},
dw:function(a){var z,y,x,w,v
if(a===this.y)return!0
z=this.x
y=this.r
if(z===y){x=this.f
z=y*2
this.r=z
z=new Array(z)
z.fixed$length=Array
z=H.e(z,[V.b1])
this.f=z
w=x.length
C.d.a7(z,0,w,x,0)
for(z=this.r,y=this.f;w<z;++w)y[w]=new V.b1(0,0)}z=this.y
y=this.f
v=this.x
if(a<z){y[v].sdq(a)
this.f[this.x].sdr(this.y)}else{y[v].sdq(z)
this.f[this.x].sdr(a)}++this.x
return!0},
ew:function(a){var z,y,x
z=new Array(this.r)
z.fixed$length=Array
z=H.e(z,[V.b1])
this.f=z
for(y=this.r,x=0;x<y;++x)z[x]=new V.b1(0,0)
this.c=P.au(this.d,0,!1,P.m)},
C:{
fm:function(a){var z=new V.fl(a,0,null,16,0,null,16,0,-1)
z.ew(a)
return z}}},
fx:{"^":"c;a,b,c,d,e,f,r,x,y,z,Q,ch,cx,cy",
hg:function(a,b,c){var z,y,x,w,v,u,t,s
z=this.b[a]
y=z.a
x=y.a.a
w=b.a.a
if(x[0]<=w[0])if(x[1]<=w[1]){v=b.b.a
u=y.b.a
v=v[0]<=u[0]&&v[1]<=u[1]}else v=!1
else v=!1
if(v)return!1
this.fb(z)
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
this.cP(a)
return!0},
hk:function(a,b,c){var z,y,x,w,v,u
this.x=0
z=this.r
this.x=1
z[0]=this.a
for(z=[V.aV];y=this.x,y>0;){x=this.r;--y
this.x=y
w=x[y]
if(w==null)continue
if(V.f_(w.a,c))if(w.d==null)b.dw(w.f)
else{y=this.r
x=y.length
if(x-this.x-2<=0){y=new Array(x*2)
y.fixed$length=Array
v=H.e(y,z)
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
cD:function(){var z,y,x,w,v
z=this.e
if(z===-1){y=this.b
z=this.d*=2
z=new Array(z)
z.fixed$length=Array
z=H.e(z,[V.aV])
this.b=z
C.d.a7(z,0,y.length,y,0)
for(x=this.d-1;z=this.c,x>=z;--x){z=this.b
w=new Float64Array(2)
z[x]=new V.aV(new V.ag(new E.a(w),new E.a(new Float64Array(2))),null,null,null,null,x,0)
z=this.b
w=z[x]
J.cM(w,x===this.d-1?null:z[x+1])
J.cL(this.b[x],-1)}this.e=z}v=this.b[z]
z=v.c
this.e=z!=null?z.f:-1
v.c=null
v.d=null
v.e=null
v.r=0
v.b=null;++this.c
return v},
cM:function(a){var z=this.e
a.c=z!==-1?this.b[z]:null
a.r=-1
this.e=a.f;--this.c},
cP:function(a){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g
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
w.a_(r,x)
r=2*(v[0]-u[0]+v[1]-u[1])
m=2*r
l=2*(r-2*(p-n+q-o))
if(t.d==null){w.a_(x,t.a)
k=2*(v[0]-u[0]+v[1]-u[1])+l}else{r=t.a
w.a_(x,r)
q=r.b.a
p=q[0]
r=r.a.a
o=r[0]
q=q[1]
r=r[1]
k=2*(v[0]-u[0]+v[1]-u[1])-2*(p-o+q-r)+l}if(s.d==null){w.a_(x,s.a)
j=2*(v[0]-u[0]+v[1]-u[1])+l}else{r=s.a
w.a_(x,r)
q=r.b.a
p=q[0]
r=r.a.a
o=r[0]
q=q[1]
r=r[1]
j=2*(v[0]-u[0]+v[1]-u[1])-2*(p-o+q-r)+l}if(m<k&&m<j)break
y=k<j?t:s}i=J.eT(this.b[y.f])
h=this.cD()
h.c=i
h.b=null
h.a.a_(x,y.a)
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
this.a=h}for(y=h;y!=null;){y=this.cE(y)
g=y.d
s=y.e
y.r=1+Math.max(g.r,s.r)
y.a.a_(g.a,s.a)
y=y.c}},
fb:function(a){var z,y,x,w,v,u,t
if(a===this.a){this.a=null
return}z=a.c
y=z.c
x=z.d
if(x===a)x=z.e
if(y!=null){w=y.d
if(w==null?z==null:w===z)y.d=x
else y.e=x
x.c=y
this.cM(z)
for(v=y;v!=null;){v=this.cE(v)
u=v.d
t=v.e
v.a.a_(u.a,t.a)
v.r=1+Math.max(u.r,t.r)
v=v.c}}else{this.a=x
x.c=null
this.cM(z)}},
cE:function(a){var z,y,x,w,v,u,t,s
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
u.a_(z.a,v.a)
y.a.a_(u,w.a)
z=1+Math.max(z.r,v.r)
a.r=z
y.r=1+Math.max(z,w.r)}else{y.e=v
a.e=w
w.c=a
u.a_(z.a,w.a)
y.a.a_(u,v.a)
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
u.a_(y.a,s.a)
z.a.a_(u,t.a)
u=1+Math.max(y.r,s.r)
a.r=u
z.r=1+Math.max(u,t.r)}else{z.e=s
a.d=t
t.c=a
u.a_(y.a,t.a)
z.a.a_(u,s.a)
u=1+Math.max(y.r,t.r)
a.r=u
z.r=1+Math.max(u,s.r)}return z}return a},
fM:function(a){var z,y
z=this.a
if(z==null)return
y=this.bL(z)
this.c1(a,this.a,0,y)},
c1:function(a,b,c,d){var z,y,x,w,v,u
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
x.au(1,v,v)
a.bw(y,4,x)
y=a.c
y.stroke()
v=this.cy
a.b.aA(z,v)
v=v.a
z=v[0]
v=v[1]
w=c+1
u=J.aa(b)+".id-"+w+"/"+d
a.cT(x)
y.strokeText(u,z,v)
z=b.d
if(z!=null)this.c1(a,z,w,d)
z=b.e
if(z!=null)this.c1(a,z,w,d)},
eA:function(){var z,y,x
for(z=this.d-1;z>=0;--z){y=this.b
x=new Float64Array(2)
y[z]=new V.aV(new V.ag(new E.a(x),new E.a(new Float64Array(2))),null,null,null,null,z,0)
y=this.b
x=y[z]
J.cM(x,z===this.d-1?null:y[z+1])
J.cL(this.b[z],-1)}for(y=this.f,z=0;z<4;++z)y[z]=new E.a(new Float64Array(2))},
C:{
fy:function(){var z,y
z=new Array(16)
z.fixed$length=Array
y=[V.aV]
y=new V.fx(null,H.e(z,y),0,16,0,H.e(new Array(4),[E.a]),H.e(new Array(20),y),0,new E.a(new Float64Array(H.b(2))),V.aF(),new V.ch(new E.a(new Float64Array(H.b(2))),new E.a(new Float64Array(H.b(2))),0),V.aF(),new G.bR(0,0,0),new E.a(new Float64Array(H.b(2))))
y.eA()
return y}}},
aV:{"^":"c;aQ:a<,ay:b<,bb:c*,d,e,f,av:r'"},
b1:{"^":"c;dq:a?,dr:b?",
b6:function(a,b){var z,y
z=this.a
y=b.a
if(z<y)return-1
if(z===y){z=this.b
y=b.b
if(z<y)z=-1
else z=z===y?0:1
return z}return 1},
$isx:1,
$asx:function(){return[V.b1]}},
eo:{"^":"c;a,b"},
V:{"^":"c;u:a<,b",
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
bV:{"^":"c;a,b",
m:function(a){return this.b}},
d5:{"^":"c;a,b,c"},
i3:{"^":"c;a,b,c",
eI:function(){var z,y,x
for(z=this.b,y=this.a,x=0;x<8;++x){y[x]=new E.a(new Float64Array(2))
z[x]=new E.a(new Float64Array(2))}},
C:{
i4:function(){var z=[E.a]
z=new V.i3(H.e(new Array(8),z),H.e(new Array(8),z),0)
z.eI()
return z}}},
iR:{"^":"c;a,b,c,d,e,f,r,x,y"},
fb:{"^":"c;a,b,c,d,e,f,r,x,y,z,Q,ch,cx,cy,db,dx,dy,fr,fx,fy,go,id,k1,k2,k3",
fq:function(a,b,c,d,e){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k
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
a.d=C.n
a.c.h(z)
a.b.I()
a.e=1
x=a.a
x[0].a.h(y)
x[0].d.bo()},
fs:function(a8,a9,b0,b1,b2){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2,a3,a4,a5,a6,a7
a8.e=0
z=b1.c
y=b2.b
x=b0.b
w=y.b
v=z.a
u=v[0]
t=y.a
s=v[1]
r=b2.a.a
q=r[0]
r=r[1]
p=b0.a.a
o=w*u-t*s+q-p[0]
n=t*u+w*s+r-p[1]
p=x.b
r=x.a
m=p*o+r*n
l=-r*o+p*n
k=a9.b+b1.b
j=a9.f
i=a9.d
h=a9.e
for(g=0,f=-17976931348623157e292,e=0;e<j;++e){w=i[e].a
u=w[0]
w=w[1]
t=h[e].a
d=t[0]*(m-u)+t[1]*(l-w)
if(d>k)return
if(d>f){f=d
g=e}}c=g+1
c=c<j?c:0
b=i[g]
a=i[c]
if(f<11920928955078125e-23){a8.e=1
a8.d=C.h
w=h[g].a
u=a8.b.a
u[0]=w[0]
u[1]=w[1]
w=b.a
u=w[0]
t=a.a
s=a8.c.a
s[0]=(u+t[0])*0.5
s[1]=(w[1]+t[1])*0.5
a0=a8.a[0]
t=a0.a.a
t[0]=v[0]
t[1]=v[1]
a0.d.bo()
return}w=b.a
v=w[0]
a1=m-v
u=w[1]
a2=l-u
t=a.a
s=t[0]
r=t[1]
a3=m-s
a4=l-r
if(a1*(s-v)+a2*(r-u)<=0){if(a1*a1+a2*a2>k*k)return
a8.e=1
a8.d=C.h
v=a8.b
u=v.a
u[0]=a1
u[1]=l-w[1]
v.X()
a8.c.h(b)
v=a8.a
v[0].a.h(z)
v[0].d.bo()}else if(a3*(v-s)+a4*(u-r)<=0){if(a3*a3+a4*a4>k*k)return
a8.e=1
a8.d=C.h
w=a8.b
v=w.a
v[0]=a3
v[1]=l-t[1]
w.X()
a8.c.h(a)
w=a8.a
w[0].a.h(z)
w[0].d.bo()}else{a5=(v+s)*0.5
a6=(u+r)*0.5
a7=h[g]
w=a7.a
if((m-a5)*w[0]+(l-a6)*w[1]>k)return
a8.e=1
a8.d=C.h
a8.b.h(a7)
w=a8.c.a
w[0]=a5
w[1]=a6
w=a8.a
w[0].a.h(z)
w[0].d.bo()}},
d9:function(a,b,c,d,e){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g
z=b.f
y=d.f
x=b.e
w=b.d
v=d.d
u=this.f
G.e3(e,c,u)
t=u.b
for(s=this.r,r=s.a,q=this.x,p=q.a,o=0,n=-17976931348623157e292,m=0;m<z;++m){G.j(t,x[m],s)
G.o(u,w[m],q)
for(l=17976931348623157e292,k=0;k<y;++k){j=v[k]
i=r[0]
h=j.a
g=i*(h[0]-p[0])+r[1]*(h[1]-p[1])
if(g<l)l=g}if(l>n){n=l
o=m}}a.b=o
a.a=n},
fU:function(a0,a1,a2,a3,a4,a5){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a
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
ft:function(a8,a9,b0,b1,b2){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2,a3,a4,a5,a6,a7
a8.e=0
z=a9.b+b1.b
y=this.y
this.d9(y,a9,b0,b1,b2)
if(y.a>z)return
x=this.z
this.d9(x,b1,b2,a9,b0)
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
this.fU(y,r,t,v,s,u)
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
l.X()
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
a0=V.bf(d,y,g,-(x*w+c*j)+z,v)
g.J()
if(a0<2)return
y=this.fx
if(V.bf(y,d,g,x*f+c*k+z,m)<2)return
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
d1:function(a,b,c,d,e){var z,y,x,w,v,u,t,s,r,q,p,o,n,m
a.e=0
z=d.c
y=this.e
G.o(e,z,y)
x=this.fy
G.co(c,y,x)
w=b.c
v=b.d
u=this.go
u.h(v)
u.j(w)
y.h(v)
y.j(x)
t=u.v(y)
y.h(x)
y.j(w)
s=u.v(y)
r=b.b+d.b
q=this.id
p=q.a
p[1]=0
p[3]=0
if(s<=0){y=$.$get$aq()
y.h(x)
y.j(w)
y=$.$get$aq()
if(y.v(y)>r*r)return
b.r
p[0]=0
p[2]=0
a.e=1
a.d=C.n
a.b.I()
a.c.h(w)
y=a.a
y[0].d.K(q)
y[0].a.h(z)
return}if(t<=0){y=$.$get$aq()
y.h(x)
y.j(v)
y=$.$get$aq()
if(y.v(y)>r*r)return
b.x
p[0]=1
p[2]=0
a.e=1
a.d=C.n
a.b.I()
a.c.h(v)
y=a.a
y[0].d.K(q)
y[0].a.h(z)
return}o=u.v(u)
n=this.k2
n.h(w)
n.w(0,t)
y.h(v)
y.w(0,s)
n.p(0,y)
n.w(0,1/o)
m=$.$get$aq()
m.h(x)
m.j(n)
n=$.$get$aq()
if(n.v(n)>r*r)return
n=this.r
u=u.a
m=n.a
m[0]=-u[1]
m[1]=u[0]
y.h(x)
y.j(w)
if(n.v(y)<0){y=m[0]
x=m[1]
m[0]=-y
m[1]=-x}n.X()
p[0]=0
p[2]=1
a.e=1
a.d=C.h
a.b.h(n)
a.c.h(w)
y=a.a
y[0].d.K(q)
y[0].a.h(z)},
C:{
bf:function(a,b,c,d,e){var z,y,x,w,v,u,t,s,r,q,p,o,n,m
z=b[0]
y=b[1]
x=z.a
w=y.a
v=c.v(x)-d
u=c.v(w)-d
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
ih:{"^":"c;a,b",
m:function(a){return this.b}},
fz:{"^":"c;a,b,c,d,e,f,r,x,y,z,Q,ch,cx,cy,db,dx,dy,fr,fx,fy,go,id,k1,k2,k3,k4,r1,r2,rx",
d0:function(a,b,c,d,a0){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e
z=this.b
G.e3(c,a0,z)
y=this.c
G.o(z,d.c,y)
this.d=b.e
this.e=b.c
x=b.d
this.f=x
this.r=b.f
b.x
w=this.fr
w.h(x)
w.j(this.e)
w.X()
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
y.c=d.f
for(v=y.a,u=z.b,s=y.b,q=0;q<d.f;++q){G.o(z,d.d[q],v[q])
G.j(u,d.e[q],s[q])}this.dx=0.02
a.e=0
p=this.k4
this.fu(p)
if(p.a===C.p)return
if(p.c>this.dx)return
o=this.r1
this.fv(o)
u=o.a===C.p
if(!u&&o.c>this.dx)return
if(!u)if(o.c>0.98*p.c+0.001)p=o
u=this.id
n=u[0]
m=u[1]
if(p.a===C.q){a.d=C.h
r=this.Q
l=r.v(s[0])
for(k=0,q=1;j=y.c,q<j;++q){i=r.v(s[q])
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
y.r=x.v(j)
y.y=s.v(y.d)
r=this.k1
if(V.bf(r,u,x,y.r,y.a)<2)return
x=this.k2
if(V.bf(x,r,s,y.y,y.b)<2)return
u=a.b
s=a.c
if(p.a===C.q){u.h(v)
s.h(j)}else{u.h(d.e[y.a])
s.h(d.d[y.a])}for(y=w.a,u=a.a,g=0,q=0;q<2;++q){f=x[q].a.a
y[1]=f[1]
y[0]=f[0]
w.j(j)
if(v.v(w)<=this.dx){e=u[g]
if(p.a===C.q){G.co(z,x[q].a,e.a)
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
fu:function(a){var z,y,x,w,v,u,t,s,r,q
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
fv:function(a){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f
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
if(f>this.dx){a.a=C.I
a.b=p
a.c=f
return}if(i*x[0]+h*x[1]>=0){u[1]=h
u[0]=v[0]
w.j(q)
if(w.v(z)<-0.03490658503988659)continue}else{u[1]=h
u[0]=v[0]
w.j(t)
if(w.v(z)<-0.03490658503988659)continue}if(f>a.c){a.a=C.I
a.b=p
a.c=f}}},
eB:function(){var z,y,x,w,v
for(z=this.k2,y=this.k1,x=this.id,w=0;w<2;++w){v=new Float64Array(2)
x[w]=new V.V(new E.a(v),new V.O(new Int8Array(4)))
v=new Float64Array(2)
y[w]=new V.V(new E.a(v),new V.O(new Int8Array(4)))
v=new Float64Array(2)
z[w]=new V.V(new E.a(v),new V.O(new Int8Array(4)))}},
C:{
fA:function(){var z=[V.V]
z=new V.fz(V.i4(),G.t(),new E.a(new Float64Array(H.b(2))),new E.a(new Float64Array(H.b(2))),new E.a(new Float64Array(H.b(2))),new E.a(new Float64Array(H.b(2))),new E.a(new Float64Array(H.b(2))),new E.a(new Float64Array(H.b(2))),new E.a(new Float64Array(H.b(2))),new E.a(new Float64Array(H.b(2))),new E.a(new Float64Array(H.b(2))),C.S,C.S,new E.a(new Float64Array(H.b(2))),new E.a(new Float64Array(H.b(2))),0,!1,new E.a(new Float64Array(H.b(2))),new E.a(new Float64Array(H.b(2))),new E.a(new Float64Array(H.b(2))),new E.a(new Float64Array(H.b(2))),H.e(new Array(2),z),H.e(new Array(2),z),H.e(new Array(2),z),new V.iR(0,0,new E.a(new Float64Array(H.b(2))),new E.a(new Float64Array(H.b(2))),new E.a(new Float64Array(H.b(2))),new E.a(new Float64Array(H.b(2))),0,new E.a(new Float64Array(H.b(2))),0),new V.d5(C.p,0,0),new V.d5(C.p,0,0),new E.a(new Float64Array(H.b(2))),new E.a(new Float64Array(H.b(2))))
z.eB()
return z}}},
O:{"^":"c;a",
ck:function(){var z=this.a
return(z[0]<<24|z[1]<<16|z[2]<<8|z[3])>>>0},
K:function(a){var z,y
z=a.a
y=this.a
y[0]=z[0]
y[1]=z[1]
y[2]=z[2]
y[3]=z[3]},
bo:function(){var z=this.a
z[0]=0
z[1]=0
z[2]=0
z[3]=0},
b6:function(a,b){return this.ck()-b.ck()},
$isx:1,
$asx:function(){return[V.O]}},
bA:{"^":"c;a,b,k:c<,l:d@,e,f",
K:function(a){this.a.h(a.a)
this.b.h(a.b)
this.c.h(a.c)
this.d=a.d
this.e=a.e
this.f=a.f}},
hV:{"^":"c;a,b,c,d",
eG:function(){var z=this.c
z[0]=1073741823
z[1]=1073741823
z[2]=1073741823
z=this.d
z[0]=1073741823
z[1]=1073741823
z[2]=1073741823},
C:{
dM:function(){var z=P.m
z=new V.hV(0,0,P.au(3,0,!1,z),P.au(3,0,!1,z))
z.eG()
return z}}},
iZ:{"^":"c;a,b,c,d,e,f,r,x,y,z,Q,ch,cx,cy,db",
hn:function(a,b,c,d,e){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l
this.e=a.b
for(z=this.d,y=a.c,x=a.d,w=b.a,v=d.a,u=0;t=this.e,u<t;++u){s=z[u]
t=y[u]
s.e=t
r=x[u]
s.f=r
q=w[t]
p=v[r]
r=s.a
G.o(c,q,r)
t=s.b
G.o(e,p,t)
o=s.c
n=t.a
t=o.a
t[1]=n[1]
t[0]=n[0]
o.j(r)
s.d=0}if(t>1){m=a.a
l=this.cl()
if(l<0.5*m||2*m<l||l<11920928955078125e-23)this.e=0}if(this.e===0){s=z[0]
s.e=0
s.f=0
q=w[0]
p=v[0]
z=s.a
G.o(c,q,z)
y=s.b
G.o(e,p,y)
x=s.c
x.h(y)
x.j(z)
this.e=1}},
hD:function(a){var z,y,x,w
a.a=this.cl()
a.b=this.e
for(z=a.c,y=this.d,x=a.d,w=0;w<this.e;++w){z[w]=J.cN(y[w].e)
x[w]=J.cN(y[w].f)}},
dJ:function(a){var z,y
switch(this.e){case 1:a.h(this.a.c)
a.J()
return
case 2:z=this.f
z.h(this.b.c)
y=this.a.c
z.j(y)
a.h(y)
a.J()
if(z.t(a)>0)z.O(1,a)
else z.O(-1,a)
return
default:a.I()
return}},
cg:function(a){var z,y,x
switch(this.e){case 0:a.I()
return
case 1:a.h(this.a.c)
return
case 2:z=this.x
y=this.b
z.h(y.c)
z.w(0,y.d)
y=this.r
x=this.a
y.h(x.c)
y.w(0,x.d)
y.p(0,z)
a.h(y)
return
case 3:a.I()
return
default:a.I()
return}},
cl:function(){var z,y,x
switch(this.e){case 0:return 0
case 1:return 0
case 2:return Math.sqrt(this.a.c.c0(this.b.c))
case 3:z=this.y
z.h(this.b.c)
y=this.a.c
z.j(y)
x=this.z
x.h(this.c.c)
x.j(y)
return z.t(x)
default:return 0}},
dY:function(){var z,y,x,w,v,u,t,s
z=this.a
y=z.c
x=this.b
w=x.c
v=this.f
v.h(w)
v.j(y)
u=-y.v(v)
if(u<=0){z.d=1
this.e=1
return}t=w.v(v)
if(t<=0){x.d=1
this.e=1
z.K(x)
return}s=1/(t+u)
z.d=t*s
x.d=u*s
this.e=2},
dZ:function(){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a
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
s=z.v(t)
r=x.v(t)
q=-s
p=this.Q
p.h(v)
p.j(z)
o=z.v(p)
n=v.v(p)
m=-o
l=this.ch
l.h(v)
l.j(x)
k=x.v(l)
j=v.v(l)
i=-k
h=t.t(p)
g=h*x.t(v)
f=h*v.t(z)
e=h*z.t(x)
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
fu:{"^":"c;a,b,c,d",
cr:function(a,b){var z,y,x,w,v,u
switch(a.a){case C.i:H.n(a,"$isab")
this.a[0].h(a.c)
this.b=1
this.c=a.b
break
case C.j:H.n(a,"$isal")
z=a.f
this.b=z
this.c=a.b
for(y=this.a,x=0;x<z;++x){w=y[x]
v=a.d[x]
w.toString
u=v.a
w=w.a
w[1]=u[1]
w[0]=u[0]}break
case C.t:H.n(a,"$isbQ")
z=this.d
z[0]=a.gbV().i(0,b)
y=b+1
if(C.c.a0(y,a.geX()))z[1]=a.gbV().i(0,y)
else z[1]=a.gbV().i(0,0)
y=this.a
y[0].h(z[0])
y[1].h(z[1])
this.b=2
this.c=a.gi3()
break
case C.o:H.n(a,"$isaJ")
z=this.a
z[0].h(a.c)
z[1].h(a.d)
this.b=2
this.c=a.b
break}},
aX:function(a){var z,y,x,w,v
z=this.a
y=z[0].v(a)
for(x=0,w=1;w<this.b;++w){v=z[w].v(a)
if(v>y){y=v
x=w}}return x},
ez:function(){var z,y
for(z=this.a,y=0;y<8;++y)z[y]=new E.a(new Float64Array(2))
this.b=0
this.c=0},
C:{
aH:function(){var z=[E.a]
z=new V.fu(H.e(new Array(8),z),null,null,H.e(new Array(2),z))
z.ez()
return z}}},
ft:{"^":"c;a,b,c,d,e,f,r",
fI:function(a3,a4,a5){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2
$.d1=$.d1+1
z=a5.a
y=a5.b
x=a5.c
w=a5.d
v=this.a
v.hn(a4,z,x,y,w)
u=v.d
t=this.d
v.cg(t)
t.gL()
for(s=this.b,r=this.c,q=x.b,p=this.e,o=p.a,n=this.f,m=z.a,l=w.b,k=y.a,j=0;j<20;){i=v.e
for(h=0;h<i;++h){s[h]=u[h].e
r[h]=u[h].f}switch(i){case 1:break
case 2:v.dY()
break
case 3:v.dZ()
break}if(v.e===3)break
v.cg(t)
t.gL()
v.dJ(p)
if(p.gL()<14210854715202004e-30)break
g=u[v.e]
o[1]=-o[1]
o[0]=-o[0]
G.W(q,p,n)
f=z.aX(n)
g.e=f
f=m[f]
e=g.a
G.o(x,f,e)
o[1]=-o[1]
o[0]=-o[0]
G.W(l,p,n)
f=y.aX(n)
g.f=f
f=k[f]
d=g.b
G.o(w,f,d)
f=g.c
c=d.a
d=f.a
d[1]=c[1]
d[0]=c[0]
f.j(e);++j
$.d2=$.d2+1
h=0
while(!0){if(!(h<i)){b=!1
break}f=g.e
e=s[h]
if(f==null?e==null:f===e){f=g.f
e=r[h]
e=f==null?e==null:f===e
f=e}else f=!1
if(f){b=!0
break}++h}if(b)break;++v.e}$.d3=Math.max($.d3,j)
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
t.w(0,s.d)
r=v.b
a.h(r.a)
a.w(0,r.d)
a.p(0,t)
t.h(s.b)
t.w(0,s.d)
a0.h(r.b)
a0.w(0,r.d)
a0.p(0,t)
break
case 3:t=v.a
a.h(t.a)
a.w(0,t.d)
t=v.y
s=v.b
t.h(s.a)
t.w(0,s.d)
s=v.z
r=v.c
s.h(r.a)
s.w(0,r.d)
a.p(0,t)
a.p(0,s)
a0.h(a)
break
default:break}a3.c=Math.sqrt(a.c0(a0))
a3.d=j
v.hD(a4)
if(a5.e){a1=z.c
a2=y.c
v=a3.c
t=a1+a2
if(v>t&&v>11920928955078125e-23){a3.c=v-t
v=this.r
v.h(a0)
v.j(a)
v.X()
n.h(v)
n.w(0,a1)
a.p(0,n)
n.h(v)
n.w(0,a2)
a0.j(n)}else{a.p(0,a0)
a.w(0,0.5)
a0.h(a)
a3.c=0}}}},
cZ:{"^":"c;a,b,c,d,e"},
d0:{"^":"c;a,b,c,d"},
c4:{"^":"c;a,b",
m:function(a){return this.b}},
h9:{"^":"c;a,b,c,d,e",
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
eD:function(){var z,y,x
for(z=this.a,y=0;y<2;++y){x=new Float64Array(2)
z[y]=new V.dt(new E.a(x),0,0,new V.O(new Int8Array(4)))}},
C:{
G:function(){var z=new V.h9(H.e(new Array(2),[V.dt]),new E.a(new Float64Array(H.b(2))),new E.a(new Float64Array(H.b(2))),C.n,0)
z.eD()
return z}}},
dt:{"^":"c;a,b,c,d"},
ch:{"^":"c;a,b,c"},
dK:{"^":"c;a,b"},
ab:{"^":"cj;c,a,b",
d_:function(a){var z,y,x
z=new Float64Array(H.b(2))
y=new V.ab(new E.a(z),C.i,0)
x=this.c.a
z[0]=x[0]
z[1]=x[1]
y.b=this.b
return y},
bC:function(){return 1},
by:function(a,b,c){var z,y,x,w,v,u,t,s
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
x[1]=s+u},
d2:function(a,b){var z,y,x,w
z=this.b
y=b*3.141592653589793*z*z
a.a=y
x=this.c.a
w=a.b.a
w[0]=x[0]
w[1]=x[1]
w=x[0]
x=x[1]
a.c=y*(0.5*z*z+(w*w+x*x))}},
aJ:{"^":"cj;c,d,e,f,r,x,y,a,b"},
hd:{"^":"c;dk:a<,b,c"},
al:{"^":"cj;c,d,e,f,r,x,y,z,Q,a,b",
d_:function(a){var z,y,x,w,v,u,t,s,r
z=V.cc()
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
dU:function(a,b){var z,y,x
this.f=4
z=this.d
y=-a
x=-b
z[0].ad(y,x)
z[1].ad(a,x)
z[2].ad(a,b)
z[3].ad(y,b)
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
z[0].ad(y,x)
z[1].ad(a,x)
z[2].ad(a,b)
z[3].ad(y,b)
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
x.D(d)
for(v=0;v<this.f;++v){u=z[v]
G.r(w,u,u)
u=y[v]
G.ax(x,u,u)}},
bC:function(){return 1},
by:function(a,b,c){var z,y,x,w,v,u,t,s,r,q,p,o,n,m
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
d2:function(a,b){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h
z=this.r
z.I()
y=this.x
y.I()
for(x=this.d,w=0;v=this.f,w<v;++w)y.p(0,x[w])
y.w(0,1/v)
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
t.p(0,w<this.f?x[w]:x[0])
m=u.t(t)
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
z.w(0,1/p)
x=a.b
x.h(z)
x.p(0,y)
v=o*b
a.c=v
a.c=v+a.a*x.v(x)},
eF:function(){var z,y
for(z=this.d,y=0;y<8;++y)z[y]=new E.a(new Float64Array(2))
for(z=this.e,y=0;y<8;++y)z[y]=new E.a(new Float64Array(2))
this.b=0.01},
C:{
cc:function(){var z,y,x
z=new Float64Array(H.b(2))
y=new Array(8)
y.fixed$length=Array
x=[E.a]
x=new V.al(new E.a(z),H.e(y,x),H.e(new Array(8),x),0,new E.a(new Float64Array(H.b(2))),new E.a(new Float64Array(H.b(2))),new E.a(new Float64Array(H.b(2))),new E.a(new Float64Array(H.b(2))),G.t(),C.j,0)
x.eF()
return x}}},
cj:{"^":"c;"},
bv:{"^":"c;a,b",
m:function(a){return this.b}},
i0:{"^":"c;a,b,c,d,e"},
b5:{"^":"c;a,b",
m:function(a){return this.b}},
i1:{"^":"c;a,b"},
i5:{"^":"c;a,b,c,d,e,f,r,x,y,z",
hx:function(a3,a4){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2
$.dU=$.dU+1
a3.a=C.P
a3.b=a4.e
z=a4.a
y=a4.b
x=this.x
x.K(a4.c)
w=this.y
w.K(a4.d)
x.X()
w.X()
v=a4.e
u=Math.max(0.005,z.c+y.c-0.015)
t=this.a
t.b=0
s=this.b
s.a=z
s.b=y
s.e=!1
for(r=this.f,q=this.r,p=u+0.00125,o=u-0.00125,n=this.e,m=this.c,l=this.d,k=this.z.fy,j=0,i=0;!0;){x.az(m,j)
w.az(l,j)
s.c=m
s.d=l
k.fI(n,t,s)
h=n.c
if(h<=0){a3.a=C.ad
a3.b=0
break}if(h<p){a3.a=C.D
a3.b=j
break}r.h3(0,t,z,x,y,w,j)
f=v
e=0
while(!0){if(!!0){g=!1
break}d=r.fV(q,f)
if(d>p){a3.a=C.ae
a3.b=v
g=!0
break}if(d>o){j=f
g=!1
break}c=r.ao(q[0],q[1],j)
if(c<o){a3.a=C.Q
a3.b=j
g=!0
break}if(c<=p){a3.a=C.D
a3.b=j
g=!0
break}for(b=f,a=j,a0=0;!0;){a1=(a0&1)===1?a+(u-c)*(b-a)/(d-c):0.5*(a+b);++a0
$.dY=$.dY+1
a2=r.ao(q[0],q[1],a1)
if(Math.abs(a2-u)<0.00125){f=a1
break}if(a2>u){a=a1
c=a2}else{b=a1
d=a2}if(a0===50)break}$.dX=Math.max($.dX,a0);++e
if(e===8||a0===50){g=!1
break}}++i
$.dV=$.dV+1
if(g)break
if(i===20){a3.a=C.Q
a3.b=j
break}}$.dW=Math.max($.dW,i)}},
ci:{"^":"c;a,b",
m:function(a){return this.b}},
hS:{"^":"c;a,b,c,d,e,f,r,x,y,z,Q,ch,cx,cy,db,dx,dy,fr,fx,fy,go",
h3:function(a,b,c,d,e,f,g){var z,y,x,w,v,u,t,s,r,q,p,o,n,m
this.a=c
this.b=e
z=b.b
this.f=d
this.r=f
y=this.fr
d.az(y,g)
x=this.fx
this.r.az(x,g)
if(z===1){this.c=C.A
g=this.x
w=this.a
v=b.c[0]
g.h(w.a[v])
v=this.y
w=this.b
u=b.d[0]
v.h(w.a[u])
u=this.z
G.o(y,g,u)
g=this.Q
G.o(x,v,g)
v=this.e
v.h(g)
v.j(u)
return v.X()}else{g=b.c
w=b.d
v=this.z
u=this.d
t=this.cy
s=this.e
r=this.Q
q=this.dy
if(J.Z(g[0],g[1])){this.c=C.C
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
s.X()
G.j(x.b,s,t)
u.h(p)
u.p(0,n)
u.w(0,0.5)
G.o(x,u,r)
u=this.x
x=this.a
g=g[0]
u.h(x.a[g])
G.o(y,u,v)
q.h(v)
q.j(r)
m=q.v(t)
if(m<0){s.J()
m=-m}return m}else{this.c=C.B
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
s.X()
G.j(y.b,s,t)
u.h(p)
u.p(0,n)
u.w(0,0.5)
G.o(y,u,v)
u=this.y
y=this.b
w=w[0]
u.h(y.a[w])
G.o(x,u,r)
q.h(r)
q.j(v)
m=q.v(t)
if(m<0){s.J()
m=-m}return m}}},
fV:function(a,b){var z,y,x,w,v,u,t
z=this.fr
this.f.az(z,b)
y=this.fx
this.r.az(y,b)
switch(this.c){case C.A:x=this.e
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
G.o(z,v,t)
v=this.Q
G.o(y,u,v)
v.j(t)
return v.v(x)
case C.B:x=this.cy
G.j(z.b,this.e,x)
w=this.z
G.o(z,this.d,w)
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
G.o(y,v,z)
z.j(w)
return z.v(x)
case C.C:x=this.cy
G.j(y.b,this.e,x)
w=this.Q
G.o(y,this.d,w)
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
G.o(z,v,y)
y.j(w)
return y.v(x)
default:a[0]=-1
a[1]=-1
return 0}},
ao:function(a,b,c){var z,y,x,w,v
z=this.fr
this.f.az(z,c)
y=this.fx
this.r.az(y,c)
switch(this.c){case C.A:x=this.x
x.h(this.a.a[a])
w=this.y
w.h(this.b.a[b])
v=this.z
G.o(z,x,v)
x=this.Q
G.o(y,w,x)
x.j(v)
return x.v(this.e)
case C.B:x=this.cy
G.j(z.b,this.e,x)
w=this.z
G.o(z,this.d,w)
z=this.y
z.h(this.b.a[b])
v=this.Q
G.o(y,z,v)
v.j(w)
return v.v(x)
case C.C:x=this.cy
G.j(y.b,this.e,x)
w=this.Q
G.o(y,this.d,w)
y=this.x
y.h(this.a.a[a])
v=this.z
G.o(z,y,v)
v.j(w)
return v.v(x)
default:return 0}}},
ip:{"^":"c;a,b,c,d,e",
h2:function(a,b,c,a0,a1,a2){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d
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
if(z.c0(y)>14210854715202004e-30){w[0]=o[0]-q[0]
w[1]=o[1]-q[1]
x.X()}x=w[0]
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
eL:function(){var z,y
for(z=this.b,y=0;y<2;++y)z[y]=new E.a(new Float64Array(2))},
C:{
iq:function(){var z=new V.ip(new E.a(new Float64Array(H.b(2))),H.e(new Array(2),[E.a]),new Float64Array(H.b(2)),new E.a(new Float64Array(H.b(2))),new E.a(new Float64Array(H.b(2))))
z.eL()
return z}}},
aU:{"^":"c;a,b,S:c<,d,e,f,r,x,y,z,Q,ch,cx,cy,db,dx,dy,fr,b2:fx<,fy,go,id,k1,k2,k3,ay:k4<,r1,r2,rx",
d3:function(a){var z,y
z=this.Q
if((z.a&2)===2)return
y=new V.fF(0,null,null,null,0,0,null,0,new V.bY(1,65535,0),!1,null,V.aF(),V.aF(),new E.a(new Float64Array(H.b(2))))
y.fz(this,a)
if((this.b&32)===32)y.fB(z.b.a,this.d)
y.b=this.cy
this.cy=y;++this.db
y.c=this
if(y.a>0)this.hr()
z.a|=1
return y},
d4:function(a,b){var z=this.r1
z.a=a
z.e=b
return this.d3(z)},
bZ:function(a){return this.d4(a,0)},
gaM:function(){return this.f.c},
gdk:function(){return this.fr},
hr:function(){var z,y,x,w,v,u,t,s,r,q,p
this.fr=0
this.fx=0
this.fy=0
this.go=0
z=this.f
y=z.a
y.I()
x=this.a
if(x===C.e||x===C.G){y=this.d.a
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
s.d.d2(t,q)
q=this.fr
p=t.a
this.fr=q+p
q=u.a
q[1]=r[1]
q[0]=r[0]
q[1]=q[1]*p
q[0]=q[0]*p
v.p(0,u)
this.fy=this.fy+t.c}q=this.fr
if(q>0){q=1/q
this.fx=q
v.w(0,q)}else{this.fr=1
this.fx=1}q=this.fy
if(q>0&&(this.b&16)===0){q-=this.fr*v.v(v)
this.fy=q
this.go=1/q}else{this.fy=0
this.go=0}w=w[x.b++]
q=z.c
w.h(q)
y.h(v)
z=z.b
G.o(this.d,y,z)
q.h(z)
u.h(q)
u.j(w)
u.O(this.x,w)
this.r.p(0,w)
x.b-=3},
aj:function(a){var z
if(a){z=this.b
if((z&2)===0){this.b=z|2
this.k3=0}}else{this.b&=4294967293
this.k3=0
this.r.I()
this.x=0
this.y.I()
this.z=0}},
cA:function(){var z,y,x,w,v,u,t,s,r
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
for(r=this.cy,y=this.Q,x=this.d;r!=null;r=r.b)r.ep(y.b.a,z,x)},
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
ct:function(a){var z,y
if(this.a!==C.f&&a.a!==C.f)return!1
for(z=this.dx;z!=null;z=z.d){y=z.a
if(y==null?a==null:y===a){z.b.y
return!1}}return!0},
aR:function(a){var z,y,x,w,v
z=this.f
z.aR(a)
y=z.c
y.h(z.b)
x=z.d
z.e=x
w=this.d
v=w.b
v.D(x)
w=w.a
G.j(v,z.a,w)
w.w(0,-1)
w.p(0,y)},
m:function(a){return"Body[pos: "+this.d.a.m(0)+" linVel: "+this.r.m(0)+" angVel: "+H.d(this.x)+"]"}},
bL:{"^":"c;a,ay:b<,c,d,e,f,r,x,y,z,Q,ch,cx,cy"},
bN:{"^":"c;a,b",
m:function(a){return this.b}},
ff:{"^":"c;a,b,c,d,e,f",
fj:function(a,b){var z,y,x,w,v,u,t,s,r,q,p,o,n,m
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
if((r==null?y==null:r===y)&&p===w&&(q==null?z==null:q===z)&&o===x)return}t=t.d}if(!u.ct(v))return
s=this.d.cu(z,y)
if(!s)return
n=this.f.hh(z,x,y,w)
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
v.aj(!0)
u.aj(!0);++this.c},
c_:function(a){var z,y,x,w,v,u,t,s,r,q
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
if(v){z.c.aj(!0)
y.c.aj(!0)}s=z.d.a
r=y.d.a
q=this.f.fy[s.a][r.a].a
q.a[--q.b]=a;--this.c},
fp:function(){var z,y,x,w,v,u,t,s,r,q,p,o,n
z=this.b
for(;z!=null;){y=z.f
x=z.r
w=z.x
v=z.y
u=y.c
t=x.c
if((z.a&8)===8){if(!t.ct(u)){s=z.c
this.c_(z)
z=s
continue}r=this.d.cu(y,x)
if(!r){s=z.c
this.c_(z)
z=s
continue}z.a&=4294967287}q=(u.b&2)===2&&u.a!==C.e
p=(t.b&2)===2&&t.a!==C.e
if(!q&&!p){z=z.c
continue}o=y.r[w].gbB()
n=x.r[v].gbB()
if(!this.a.hw(o,n)){s=z.c
this.c_(z)
z=s
continue}z.cc(this.e)
z=z.c}},
er:function(a,b){this.b=null
this.d=new V.fe()
this.e=null
this.a=b},
C:{
fg:function(a,b){var z=new V.ff(null,null,0,null,null,a)
z.er(a,b)
return z}}},
bc:{"^":"ai;fr,a,b,c,d,e,f,r,x,y,z,Q,ch,cx,cy,db,dx,dy",
aw:function(a,b,c,d){this.bq(a,b,c,d)},
ao:function(a,b,c){var z=this.fr
H.n(this.f.d,"$isbQ").dG(z,this.x)
this.dx.fr.d1(a,z,b,H.n(this.r.d,"$isab"),c)}},
bd:{"^":"ai;fr,a,b,c,d,e,f,r,x,y,z,Q,ch,cx,cy,db,dx,dy",
aw:function(a,b,c,d){this.bq(a,b,c,d)},
ao:function(a,b,c){var z,y,x
z=this.fr
H.n(this.f.d,"$isbQ").dG(z,this.x)
y=this.dx.fr
x=H.n(this.r.d,"$isal")
y.k3.d0(a,z,b,x,c)}},
be:{"^":"ai;a,b,c,d,e,f,r,x,y,z,Q,ch,cx,cy,db,dx,dy",
ao:function(a,b,c){this.dx.fr.fq(a,H.n(this.f.d,"$isab"),b,H.n(this.r.d,"$isab"),c)}},
ai:{"^":"c;",
aw:["bq",function(a,b,c,d){var z,y
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
cc:function(a){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k
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
this.ao(y,u.d,t.d)
s=y.e>0
for(w=z.a,v=y.a,r=0;r<y.e;++r){q=v[r]
q.b=0
q.c=0
p=q.d
for(o=z.e,n=p.a,m=0;m<o;++m){l=w[m]
k=l.d.a
if((k[0]<<24|k[1]<<16|k[2]<<8|k[3])>>>0===(n[0]<<24|n[1]<<16|n[2]<<8|n[3])>>>0){q.b=l.b
q.c=l.c
break}}}if(s!==((x&2)===2)){u.aj(!0)
t.aj(!0)}z=this.a
if(s)this.a=z|2
else this.a=z&4294967293
return}},
D:{"^":"c;a,b,c,d"},
bS:{"^":"c;a,b,c,d,e,f,r,x,y,z,Q,ch,cx,cy,db",
es:function(){var z,y
for(z=this.a,y=0;y<2;++y)z[y]=new E.a(new Float64Array(2))},
C:{
cW:function(){var z=new V.bS(H.e(new Array(2),[E.a]),new E.a(new Float64Array(H.b(2))),new E.a(new Float64Array(H.b(2))),0,0,0,0,new E.a(new Float64Array(H.b(2))),new E.a(new Float64Array(H.b(2))),0,0,null,0,0,0)
z.es()
return z}}},
bg:{"^":"c;a,b"},
bi:{"^":"c;a,b,c,d,e"},
fh:{"^":"c;a,b,c,d,e,f,r,x,y,z,Q",
de:function(a){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b
this.a=a.a
z=a.c
this.r=z
y=this.d
x=y.length
if(x<z){z=new Array(Math.max(x*2,z))
z.fixed$length=Array
z=H.e(z,[V.bS])
this.d=z
C.d.a7(z,0,x,y,0)
for(;z=this.d,x<z.length;++x)z[x]=V.cW()}z=this.e
x=z.length
y=this.r
if(x<y){y=new Array(Math.max(x*2,y))
y.fixed$length=Array
y=H.e(y,[V.bT])
this.e=y
C.d.a7(y,0,x,z,0)
for(;z=this.e,x<z.length;++x)z[x]=V.cX()}this.b=a.d
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
hC:function(){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b
for(z=0;z<this.r;++z){y=this.e[z]
x=y.e
w=y.f
v=y.r
u=y.y
t=y.x
s=y.z
r=y.cy
q=this.c[x].gu()
p=this.c[x].gk()
o=this.c[w].gu()
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
dg:function(){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2,a3,a4,a5,a6,a7,a8,a9,b0,b1,b2,b3,b4,b5,b6,b7,b8,b9,c0,c1,c2,c3,c4,c5,c6,c7,c8,c9,d0,d1,d2,d3,d4,d5,d6,d7,d8,d9,e0,e1,e2
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
c=this.b[k].gq()
b=this.b[k].gl()
a=this.c[k].gu()
a0=this.c[k].gk()
a1=this.b[j].gq()
a2=this.b[j].gl()
a3=this.c[j].gu()
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
z.h2(0,l,x,n,v,m)
b1=p.b.a
b1[0]=r[0]
b1[1]=r[1]
b2=p.cy
for(a5=-$.jS,a7=a3.a,a8=-a4,b0=a.a,b3=-a0,b4=i+h,b5=0;b5<b2;++b5){b6=p.a[b5]
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
a6.bz()}else p.cy=1}}},
cv:function(){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2,a3,a4,a5,a6,a7,a8,a9,b0,b1,b2,b3,b4,b5,b6,b7,b8,b9,c0,c1,c2,c3,c4,c5,c6,c7,c8,c9,d0,d1,d2,d3,d4,d5,d6,d7,d8,d9,e0
for(z=0;z<this.r;++z){y=this.e[z]
x=y.e
w=y.f
v=y.r
u=y.x
t=y.y
s=y.z
r=y.cy
q=this.c[x].gu()
p=this.c[x].gk()
o=this.c[w].gu()
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
ei:function(){var z,y,x,w,v,u
for(z=0;z<this.r;++z){y=this.e[z]
for(x=this.f[y.db].z.a,w=0;w<y.cy;++w){v=x[w]
u=y.a[w]
v.b=u.c
v.c=u.d}}},
e3:function(){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2,a3,a4,a5,a6,a7,a8,a9,b0,b1,b2,b3,b4,b5,b6,b7,b8,b9,c0
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
c=this.b[n].gq()
b=this.b[n].gl()
a=this.b[m].gq()
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
t.df(0,o,z,x,a4)
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
eb:function(c3,c4){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2,a3,a4,a5,a6,a7,a8,a9,b0,b1,b2,b3,b4,b5,b6,b7,b8,b9,c0,c1,c2
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
b=0}a=this.b[n].gq()
a0=this.b[n].gl()
a1=this.b[m].gq()
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
t.df(0,o,z,x,a6)
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
eu:function(){var z,y
z=new Array(256)
z.fixed$length=Array
this.d=H.e(z,[V.bS])
z=new Array(256)
z.fixed$length=Array
this.e=H.e(z,[V.bT])
for(y=0;y<256;++y){this.d[y]=V.cW()
this.e[y]=V.cX()}},
C:{
bh:function(){var z=new V.fh(null,null,null,null,null,null,0,G.t(),G.t(),V.iq(),new V.hI(new E.a(new Float64Array(H.b(2))),new E.a(new Float64Array(H.b(2))),0))
z.eu()
return z}}},
hI:{"^":"c;a,b,c",
df:function(a,b,c,d,a0){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e
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
s.X()
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
ej:{"^":"c;a,b,c,d,e,f,r"},
bT:{"^":"c;a,b,c,d,e,f,r,x,y,z,Q,ch,cx,cy,db",
ev:function(){var z,y,x
for(z=this.a,y=0;y<2;++y){x=new Float64Array(2)
z[y]=new V.ej(new E.a(x),new E.a(new Float64Array(2)),0,0,0,0,0)}},
C:{
cX:function(){var z=new V.bT(H.e(new Array(2),[V.ej]),new E.a(new Float64Array(H.b(2))),new E.a4(new Float64Array(H.b(4))),new E.a4(new Float64Array(H.b(4))),0,0,0,0,0,0,0,0,0,0,0)
z.ev()
return z}}},
bj:{"^":"ai;a,b,c,d,e,f,r,x,y,z,Q,ch,cx,cy,db,dx,dy",
aw:function(a,b,c,d){this.bq(a,b,c,d)},
ao:function(a,b,c){this.dx.fr.d1(a,H.n(this.f.d,"$isaJ"),b,H.n(this.r.d,"$isab"),c)}},
bk:{"^":"ai;a,b,c,d,e,f,r,x,y,z,Q,ch,cx,cy,db,dx,dy",
aw:function(a,b,c,d){this.bq(a,b,c,d)},
ao:function(a,b,c){var z,y,x
z=this.dx.fr
y=H.n(this.f.d,"$isaJ")
x=H.n(this.r.d,"$isal")
z.k3.d0(a,y,b,x,c)}},
bp:{"^":"ai;a,b,c,d,e,f,r,x,y,z,Q,ch,cx,cy,db,dx,dy",
ao:function(a,b,c){this.dx.fr.fs(a,H.n(this.f.d,"$isal"),b,H.n(this.r.d,"$isab"),c)}},
bq:{"^":"ai;a,b,c,d,e,f,r,x,y,z,Q,ch,cx,cy,db,dx,dy",
ao:function(a,b,c){this.dx.fr.ft(a,H.n(this.f.d,"$isal"),b,H.n(this.r.d,"$isal"),c)}},
cd:{"^":"c;q:a<,l:b@"},
cp:{"^":"c;u:a<,k:b@"},
bY:{"^":"c;a,b,c"},
fF:{"^":"c;a,b,c,d,e,f,r,x,y,z,ay:Q<,ch,cx,cy",
fz:function(a,b){var z,y,x,w,v,u
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
y=b.a.d_(0)
this.d=y
x=y.bC()
if(this.r==null){z=new Array(x)
z.fixed$length=Array
this.r=H.e(z,[V.bm])
for(w=0;w<x;++w){z=this.r
y=new Float64Array(2)
z[w]=new V.bm(new V.ag(new E.a(y),new E.a(new Float64Array(2))),null,0,0)
this.r[w].sda(null)
this.r[w].sbB(-1)}}z=this.r
y=z.length
if(y<x){v=Math.max(y*2,x)
u=new Array(v)
u.fixed$length=Array
u=H.e(u,[V.bm])
this.r=u
C.d.a7(u,0,y,z,0)
for(w=0;w<v;++w){if(w>=y){z=this.r
u=new Float64Array(2)
z[w]=new V.bm(new V.ag(new E.a(u),new E.a(new Float64Array(2))),null,0,0)}this.r[w].sda(null)
this.r[w].sbB(-1)}}this.x=0
this.a=b.e},
fB:function(a,b){var z,y,x,w,v,u,t,s,r
this.x=this.d.bC()
for(z=a.a,y=0;y<this.x;++y){x=this.r[y]
w=this.d
v=x.a
w.by(v,b,y)
u=z.cD()
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
z.cP(t);++a.b
a.cZ(t)
x.d=t
x.b=this
x.c=y}},
ep:function(a,b,c){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l
if(this.x===0)return
for(z=this.cy,y=c.a.a,x=b.a.a,w=z.a,v=a.a,u=this.ch,t=this.cx,s=u.a.a,r=u.b.a,q=0;q<this.x;++q){p=this.r[q]
this.d.by(u,b,p.c)
this.d.by(t,c,p.c)
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
if(v.hg(n,o,z))a.cZ(n)}}},
dc:{"^":"c;a,ay:b<,c,d,e,f,r"},
bm:{"^":"c;aQ:a<,da:b?,c,bB:d@"},
de:{"^":"c;a,b,c,d,e,f,r,x,y,z,Q,ch,cx,cy,db,dx,dy,fr",
aw:function(a,b,c,d){var z,y,x
this.z=a
this.Q=b
this.ch=c
this.r=0
this.y=0
this.x=0
this.a=d
z=this.b
if(z==null||a>z.length)this.b=H.e(new Array(a),[V.aU])
z=this.d
if(z==null||this.ch>z.length)this.d=H.e(new Array(this.ch),[V.K])
z=this.c
if(z==null||this.Q>z.length)this.c=H.e(new Array(this.Q),[V.ai])
y=this.f
z=y==null
if(z||this.z>y.length){if(z)y=H.e(new Array(0),[V.cp])
z=new Array(this.z)
z.fixed$length=Array
z=H.e(z,[V.cp])
this.f=z
x=y.length
C.d.a7(z,0,x,y,0)
for(;z=this.f,x<z.length;++x)z[x]=new V.cp(new E.a(new Float64Array(2)),0)}y=this.e
z=y==null
if(z||this.z>y.length){if(z)y=H.e(new Array(0),[V.cd])
z=new Array(this.z)
z.fixed$length=Array
z=H.e(z,[V.cd])
this.e=z
x=y.length
C.d.a7(z,0,x,y,0)
for(;z=this.e,x<z.length;++x)z[x]=new V.cd(new E.a(new Float64Array(2)),0)}},
dX:function(a1,a2,a3,a4){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0
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
s=(s+z*l*m)*(1/(1+z*w.k1))}J.bJ(this.e[x].gq(),r[0])
J.bK(this.e[x].gq(),r[1])
this.e[x].sl(u)
q=t.a
this.f[x].gu().a[0]=q[0]
this.f[x].gu().a[1]=q[1]
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
p.de(o)
p.dg()
if(a2.f)p.hC()
for(x=0;x<this.x;++x)this.d[x].ah(y)
for(x=0;x<a2.d;++x){for(k=0;k<this.x;++k)this.d[k].af(y)
p.cv()}p.ei()
for(x=0;x<this.r;++x){j=this.e[x].gq()
u=this.e[x].gl()
t=this.f[x].gu()
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
break}d=p.e3()
for(c=!0,k=0;k<this.x;++k){b=this.d[k].ae(y)
c=c&&b}if(d&&c){e=!0
break}++x}for(x=0;x<this.r;++x){a=this.b[x]
y=a.f
q=y.c.a
q[0]=J.T(this.e[x].gq())
q[1]=J.U(this.e[x].gq())
y.e=this.e[x].gl()
y=a.r.a
y[0]=this.f[x].gu().a[0]
y[1]=this.f[x].gu().a[1]
a.x=this.f[x].gk()
a.b_()}this.du(p.e)
if(a4){for(a0=17976931348623157e292,x=0;x<this.r;++x){w=this.b[x]
if(w.a===C.e)continue
if((w.b&4)!==0){y=w.x
if(!(y*y>0.0012184696791468343)){y=w.r
y=y.v(y)>0.0001}else y=!0}else y=!0
if(y){w.k3=0
a0=0}else{y=w.k3+=z
a0=Math.min(a0,y)}}if(a0>=0.5&&e)for(x=0;x<this.r;++x)this.b[x].aj(!1)}},
ea:function(a,b,c){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k
for(z=0;z<this.r;++z){J.bJ(this.e[z].gq(),this.b[z].f.c.a[0])
J.bK(this.e[z].gq(),this.b[z].f.c.a[1])
this.e[z].sl(this.b[z].f.e)
this.f[z].gu().a[0]=this.b[z].r.a[0]
y=this.f[z].gu()
x=this.b
y.a[1]=x[z].r.a[1]
this.f[z].sk(x[z].x)}y=this.dy
y.b=this.c
y.c=this.y
y.a=a
y.d=this.e
y.e=this.f
x=this.dx
x.de(y)
for(z=0;z<a.e;++z)if(x.eb(b,c))break
this.b[b].f.b.a[0]=J.T(this.e[b].gq())
this.b[b].f.b.a[1]=J.U(this.e[b].gq())
this.b[b].f.d=this.e[b].gl()
this.b[c].f.b.h(this.e[c].gq())
this.b[c].f.d=this.e[c].gl()
x.dg()
for(z=0;z<a.d;++z)x.cv()
w=a.a
for(z=0;z<this.r;++z){v=this.e[z].gq()
u=this.e[z].gl()
t=this.f[z].gu()
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
J.bJ(this.e[z].gq(),p[0])
J.bK(this.e[z].gq(),p[1])
this.e[z].sl(u)
this.f[z].gu().a[0]=y[0]
this.f[z].gu().a[1]=y[1]
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
m.b_()}this.du(x.e)},
du:function(a){return}},
fc:{"^":"K;ch,cx,cy,db,dx,dy,fr,a,b,c,d,e,f,r,x,y,z,Q",
dE:function(){var z,y,x,w,v
for(z=this.ch,y=0,x=0;w=z.length,x<w;++x){v=x===w-1?0:x+1
y+=z[x].gaM().a[0]*z[v].gaM().a[1]-z[v].gaM().a[0]*z[x].gaM().a[1]}return y*0.5},
dK:function(a){var z,y,x,w,v
for(z=this.ch,y=0,x=0;w=z.length,x<w;++x){v=x===w-1?0:x+1
y+=J.T(a[z[x].gS()].gq())*J.U(a[z[v].gS()].gq())-J.T(a[z[v].gS()].gq())*J.U(a[z[x].gS()].gq())}return y*0.5},
eT:function(a){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k
for(z=this.ch,y=0,x=0;w=z.length,x<w;++x){v=x===w-1?0:x+1
u=J.T(a[z[v].gS()].gq())-J.T(a[z[x].gS()].gq())
t=J.U(a[z[v].gS()].gq())-J.U(a[z[x].gS()].gq())
s=Math.sqrt(u*u+t*t)
if(s<11920928955078125e-23)s=1
w=this.db
w[x].a[0]=t/s
w[x].a[1]=-u/s
y+=s}w=this.Q.a
w=w.a[w.b++]
r=0.5*(this.cy-this.dK(a))/y
for(q=!0,x=0;p=z.length,x<p;++x){v=x===p-1?0:x+1
p=this.db
o=p[x].a
n=o[0]
p=p[v].a
m=p[0]
o=o[1]
p=p[1]
l=w.a
l[0]=r*(n+m)
l[1]=r*(o+p)
k=w.gL()
if(k>0.04000000000000001){p=0.2/Math.sqrt(k)
l[1]=l[1]*p
l[0]=l[0]*p}if(k>0.000025)q=!1
p=a[z[v].gS()].gq()
o=J.J(p)
o.sE(p,o.gE(p)+l[0])
p=a[z[v].gS()].gq()
o=J.J(p)
o.sF(p,o.gF(p)+l[1])}--this.Q.a.b
return q},
ah:function(a){var z,y,x,w,v,u,t,s,r
z=a.c
y=a.b
x=this.ch
w=this.Q.cn(x.length)
for(v=J.A(w),u=0;t=x.length,u<t;++u){s=u===0?t-1:u-1
r=u===t-1?0:u+1
v.i(w,u).h(y[x[r].gS()].gq())
v.i(w,u).j(y[x[s].gS()].gq())}t=a.a
if(t.f){this.dx=this.dx*t.c
for(u=0;u<x.length;++u){t=z[x[u].gS()].gu().a
t[0]=t[0]+x[u].gb2()*J.U(v.i(w,u))*0.5*this.dx
t=z[x[u].gS()].gu().a
t[1]=t[1]+x[u].gb2()*-J.T(v.i(w,u))*0.5*this.dx}}else this.dx=0},
ae:function(a){return this.eT(a.b)},
af:function(a){var z,y,x,w,v,u,t,s,r,q,p,o
z=a.c
y=a.b
x=this.ch
w=this.Q.cn(x.length)
for(v=J.A(w),u=0,t=0,s=0;r=x.length,s<r;++s){q=s===0?r-1:s-1
p=s===r-1?0:s+1
v.i(w,s).h(y[x[p].gS()].gq())
v.i(w,s).j(y[x[q].gS()].gq())
t+=v.i(w,s).gL()/x[s].gdk()
u+=z[x[s].gS()].gu().t(v.i(w,s))}o=-2*u/t
this.dx+=o
for(s=0;s<x.length;++s){r=z[x[s].gS()].gu().a
r[0]=r[0]+x[s].gb2()*J.U(v.i(w,s))*0.5*o
r=z[x[s].gS()].gu().a
r[1]=r[1]+x[s].gb2()*-J.T(v.i(w,s))*0.5*o}},
ab:function(a){},
ac:function(a){},
eq:function(a,b){var z,y,x,w,v,u,t,s,r,q,p,o
this.dy=a
if(b.x.length<=2)throw H.f("You cannot create a constant volume joint with less than three _bodies.")
z=this.ch
y=new Float64Array(H.b(z.length))
this.cx=y
for(x=0;y=y.length,x<y;++x,y=v){w=x===y-1?0:x+1
y=z[x].gaM()
v=z[w].gaM()
u=new Float64Array(2)
t=new E.a(u)
s=y.a
u[1]=s[1]
u[0]=s[0]
t.j(v)
t=Math.sqrt(t.gL())
v=this.cx
v[x]=t}this.cy=this.dE()
y=new Float64Array(H.b(2))
v=new Float64Array(H.b(2))
r=new V.d_(new E.a(y),new E.a(v),1,0,0,null,null,null,null,!1)
r.a=C.x
this.fr=H.e(new Array(z.length),[V.bU])
for(x=0;u=this.cx.length,x<u;++x){w=x===u-1?0:x+1
r.y=b.f
r.z=b.r
r.e=!1
u=z[x]
t=z[w]
q=u.gaM()
p=z[w].gaM()
r.c=u
r.d=t
t=new Float64Array(2)
G.e4(u.d,q,new E.a(t))
y[1]=t[1]
y[0]=t[0]
t=r.d
t.toString
u=new Float64Array(2)
G.e4(t.d,p,new E.a(u))
v[1]=u[1]
v[0]=u[0]
u=new Float64Array(2)
o=new E.a(u)
s=p.a
u[1]=s[1]
u[0]=s[0]
o.j(q)
r.x=Math.sqrt(o.gL())
this.fr[x]=H.n(this.dy.d5(r),"$isbU")}this.db=H.e(new Array(z.length),[E.a])
for(x=0;z=this.db,x<z.length;++x)z[x]=new E.a(new Float64Array(2))},
C:{
fd:function(a,b){var z=b.x
z=H.e(z.slice(0),[H.af(z,0)])
z.fixed$length=Array
z=new V.fc(z,null,0,null,0,null,null,b.a,null,null,null,null,null,null,!1,!1,null,null)
z.ag(a.ch,b)
z.eq(a,b)
return z}}},
cU:{"^":"dl;f,r,x,y,a,b,c,d,e"},
bU:{"^":"K;ch,cx,cy,db,dx,dy,fr,fx,fy,go,id,k1,k2,k3,k4,r1,r2,rx,ry,x1,a,b,c,d,e,f,r,x,y,z,Q",
ab:function(a){G.r(this.f.d,this.db,a)},
ac:function(a){G.r(this.r.d,this.dx,a)},
ah:function(a){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f
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
v=a.b[this.fy].gq()
u=a.b[this.fy].gl()
t=a.c[this.fy].gu()
s=a.c[this.fy].gk()
r=a.b[this.go].gq()
q=a.b[this.go].gl()
p=a.c[this.go].gu()
o=a.c[this.go].gk()
w=this.Q.f
x=w.a
n=w.b
m=n+1
w.b=m
n=x[n]
w.b=m+1
m=x[m]
n.D(u)
m.D(q)
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
x.p(0,z)
x.j(v)
x.j(y)
this.Q.f.b-=2
m=Math.sqrt(x.gL())
w=x.a
if(m>0.005){n=1/m
w[0]=w[0]*n
w[1]=w[1]*n}else{w[0]=0
w[1]=0}l=y.t(x)
k=z.t(x)
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
w.w(0,this.fr)
x=t.a
n=x[0]
m=this.r1
i=w.a
x[0]=n-m*i[0]
x[1]=x[1]-m*i[1]
s-=this.rx*y.t(w)
y=p.a
m=y[0]
x=this.r2
y[0]=m+x*i[0]
y[1]=y[1]+x*i[1]
o+=this.ry*z.t(w);--this.Q.a.b}else this.fr=0
a.c[this.fy].sk(s)
a.c[this.go].sk(o)},
af:function(a){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l
z=a.c[this.fy].gu()
y=a.c[this.fy].gk()
x=a.c[this.go].gu()
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
t.p(0,z)
v=this.k2
v.O(w,s)
s.p(0,x)
r=this.id
s.j(t)
q=r.v(s)
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
ae:function(a){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l
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
s=a.b[this.fy].gq()
r=a.b[this.fy].gl()
q=a.b[this.go].gq()
p=a.b[this.go].gl()
w.D(r)
v.D(p)
t.h(this.db)
t.j(this.k3)
G.j(w,t,y)
t.h(this.dx)
t.j(this.k4)
G.j(v,t,u)
t.h(q)
t.p(0,u)
t.j(s)
t.j(y)
v=Math.max(-0.2,Math.min(t.X()-this.fx,0.2))
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
d_:{"^":"dl;f,r,G:x>,y,z,a,b,c,d,e"},
fH:{"^":"K;ch,cx,cy,db,dx,dy,fr,fx,fy,go,id,k1,k2,k3,k4,r1,r2,rx,a,b,c,d,e,f,r,x,y,z,Q",
ab:function(a){G.r(this.f.d,this.ch,a)},
ac:function(a){G.r(this.r.d,this.cx,a)},
ah:function(a){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f
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
u=a.c[this.fr].gu()
t=a.c[this.fr].gk()
s=a.b[this.fx].gl()
r=a.c[this.fx].gu()
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
o.D(v)
n.D(s)
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
n.bc(o+k*w*w+j*h*h,f,f,o+k*p*p+g*i)
i=this.r2
i.h(n)
i.bz()
i=k+j
this.rx=i
if(i>0)this.rx=1/i
w=a.a
p=this.cy
if(w.f){p.w(0,w.c)
this.db=this.db*a.a.c
w=this.Q.a
w=w.a[w.b++]
w.h(p)
x.h(w)
x.w(0,m)
u.j(x)
t-=k*(y.t(w)+this.db)
x.h(w)
x.w(0,l)
r.p(0,x)
q+=j*(z.t(w)+this.db);--this.Q.a.b}else{p.I()
this.db=0}J.Z(a.c[this.fr].gk(),t)
a.c[this.fr].sk(t)
a.c[this.fx].sk(q)
z=this.Q
z.f.b-=2;--z.a.b;--z.c.b},
af:function(a){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i
z=a.c[this.fr].gu()
y=a.c[this.fr].gk()
x=a.c[this.fx].gu()
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
l.p(0,x)
l.j(z)
l.j(k)
j=this.Q.a
j=j.a[j.b++]
this.r2.cb(l,j)
j.J()
l=this.Q.a
l=l.a[l.b++]
i=this.cy
l.h(i)
i.p(0,j)
o=r*this.dx
if(i.gL()>o*o){i.X()
i.w(0,o)}j.h(i)
j.j(l)
k.h(j)
k.w(0,v)
z.j(k)
y-=t*m.t(j)
k.h(j)
k.w(0,u)
x.p(0,k)
q=q.t(j)
J.Z(a.c[this.fr].gk(),y)
a.c[this.fr].sk(y)
a.c[this.fx].sk(w+s*q)
this.Q.a.b-=4},
ae:function(a){return!0}},
fI:{"^":"K;ch,cx,cy,db,dx,dy,fr,fx,fy,go,id,k1,k2,k3,k4,r1,r2,rx,ry,x1,x2,y1,y2,a4,N,U,R,V,T,Y,a1,a8,a9,ap,aI,aJ,aK,aa,aq,ar,a,b,c,d,e,f,r,x,y,z,Q",
ab:function(a){G.r(this.f.d,this.fr,a)},
ac:function(a){G.r(this.r.d,this.fx,a)},
ah:function(a){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b
this.rx=this.f.c
this.ry=this.r.c
z=this.dx
this.x1=z.gS()
y=this.dy
this.x2=y.gS()
x=this.y1
x.h(this.f.f.a)
w=this.y2
w.h(this.r.f.a)
v=this.a4
v.h(z.gaP().ghd())
u=this.N
u.h(y.gaP().ghd())
this.U=this.f.fx
this.R=this.r.fx
this.V=z.gb2()
this.T=y.gb2()
this.Y=this.f.go
this.a1=this.r.go
this.a8=z.gf2()
this.a9=y.gf2()
t=a.b[this.rx].gl()
s=a.c[this.rx].gu()
r=a.c[this.rx].gk()
q=a.b[this.ry].gl()
p=a.c[this.ry].gu()
o=a.c[this.ry].gk()
n=a.b[this.x1].gl()
m=a.c[this.x1].gu()
l=a.c[this.x1].gk()
k=a.b[this.x2].gl()
j=a.c[this.x2].gu()
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
h.D(t)
g.D(q)
f.D(n)
e.D(k)
this.ar=0
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
y=this.ap
G.j(f,this.id,y)
d.h(this.fy)
d.j(v)
G.j(f,d,c)
d.h(this.fr)
d.j(x)
G.j(h,d,z)
this.aa=c.t(y)
y=z.t(y)
this.aJ=y
z=this.ar
c=this.V
h=this.U
x=this.a8
f=this.aa
y=z+(c+h+x*f*f+this.Y*y*y)
this.ar=y
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
d=this.aI
d.h(x)
d.w(0,this.r1)
this.aq=this.r1*v.t(x)
x=this.r1*h.t(x)
this.aK=x
h=this.ar
v=this.r1
d=this.T
g=this.R
w=this.a9
e=this.aq
x=h+(v*v*(d+g)+w*e*e+this.a1*x*x)
this.ar=x
e=this.Q
e.a.b-=3
y=e
z=x
this.ar=z>0?1/z:0
if(a.a.f){z=s.a
x=z[0]
w=this.U
v=this.r2
w*=v
u=this.ap.a
z[0]=x+w*u[0]
z[1]=z[1]+w*u[1]
r+=this.Y*v*this.aJ
w=p.a
z=w[0]
x=this.R*v
h=this.aI.a
w[0]=z+x*h[0]
w[1]=w[1]+x*h[1]
o+=this.a1*v*this.aK
x=m.a
w=x[0]
z=this.V*v
x[0]=w-z*u[0]
x[1]=x[1]-z*u[1]
l-=this.a8*v*this.aa
u=j.a
z=u[0]
x=this.T*v
u[0]=z-x*h[0]
u[1]=u[1]-x*h[1]
i-=this.a9*v*this.aq}else this.r2=0;--y.a.b
y.f.b-=4
a.c[this.rx].sk(r)
a.c[this.ry].sk(o)
a.c[this.x1].sk(l)
a.c[this.x2].sk(i)},
af:function(a){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g
z=a.c[this.rx].gu()
y=a.c[this.rx].gk()
x=a.c[this.ry].gu()
w=a.c[this.ry].gk()
v=a.c[this.x1].gu()
u=a.c[this.x1].gk()
t=a.c[this.x2].gu()
s=a.c[this.x2].gk()
r=this.Q.a
q=r.a
p=r.b
o=p+1
r.b=o
p=q[p]
r.b=o+1
o=q[o]
q=this.ap
p.h(z)
p.j(v)
p=q.v(p)
r=this.aI
o.h(x)
o.j(t)
o=r.v(o)
n=this.aJ
m=this.aa
l=this.aK
k=this.aq
this.Q.a.b-=2
j=-this.ar*(p+o+(n*y-m*u+(l*w-k*s)))
this.r2+=j
o=z.a
p=o[0]
i=this.U*j
q=q.a
o[0]=p+i*q[0]
o[1]=o[1]+i*q[1]
i=this.Y
o=x.a
p=o[0]
h=this.R*j
r=r.a
o[0]=p+h*r[0]
o[1]=o[1]+h*r[1]
h=this.a1
o=v.a
p=o[0]
g=this.V*j
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
ae:function(a4){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2,a3
z=a4.b[this.rx].gq()
y=a4.b[this.rx].gl()
x=a4.b[this.ry].gq()
w=a4.b[this.ry].gl()
v=a4.b[this.x1].gq()
u=a4.b[this.x1].gl()
t=a4.b[this.x2].gq()
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
p.D(y)
o.D(w)
n.D(u)
m.D(s)
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
d=i.t(k)
c=h.t(k)
b=0+(this.V+this.U+this.a8*d*d+this.Y*c*c)
g.h(q)
g.j(e)
l.h(h)
l.p(0,z)
l.j(v)
G.W(n,l,f)
f.j(g)
a=f.v(r)
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
j.w(0,this.r1)
a0=n.t(p)
a1=i.t(p)
p=this.r1
b+=p*p*(this.T+this.R)+this.a9*a0*a0+this.a1*a1*a1
h.h(r)
h.j(f)
l.h(i)
l.p(0,x)
l.j(t)
G.W(m,l,g)
g.j(h)
a2=g.v(q)
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
p=this.U*a3
k=k.a
r[0]=q+p*k[0]
r[1]=r[1]+p*k[1]
p=this.Y
r=x.a
q=r[0]
o=this.R*a3
j=j.a
r[0]=q+o*j[0]
r[1]=r[1]+o*j[1]
o=this.a1
r=v.a
q=r[0]
n=this.V*a3
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
ag:function(a,b){this.Q=a
this.b=null
this.c=null
this.f=b.c
this.r=b.d
this.y=!1
this.x=!1
this.z=b.b
this.d=new V.dm(null,null,null,null)
this.e=new V.dm(null,null,null,null)}},
dl:{"^":"c;ay:b<"},
dm:{"^":"c;a,b,c,d"},
L:{"^":"c;a,b",
m:function(a){return this.b}},
dn:{"^":"c;a,b",
m:function(a){return this.b}},
hh:{"^":"K;ch,cx,cy,db,dx,dy,fr,fx,fy,go,id,k1,k2,k3,k4,r1,r2,rx,ry,x1,x2,a,b,c,d,e,f,r,x,y,z,Q",
ab:function(a){a.h(this.f.d.a)},
ac:function(a){a.h(this.r.d.a)},
ah:function(a){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c
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
v=a.b[this.fx].gq()
u=a.b[this.fx].gl()
t=a.c[this.fx].gu()
s=a.c[this.fx].gk()
r=a.b[this.fy].gq()
q=a.b[this.fy].gl()
p=a.c[this.fy].gu()
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
m.D(u)
l.D(q)
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
w.bc(z+f*y*y+e*l*l,c,c,z+f*x*x+d*k)
k=this.x1
k.h(w)
k.bz()
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
af:function(a1){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0
z=a1.c[this.fx].gu()
y=a1.c[this.fx].gk()
x=a1.c[this.fy].gu()
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
this.x1.cb(m,n)
n.J()
m=this.Q.a
m=m.a[m.b++]
b=this.cy
m.h(b)
b.p(0,n)
h=q*this.dx
if(b.gL()>h*h){b.X()
b.w(0,h)}r=b.a
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
ae:function(a){return!0}},
hi:{"^":"K;ch,cx,cy,db,dx,dy,fr,fx,fy,go,id,k1,k2,k3,k4,a,b,c,d,e,f,r,x,y,z,Q",
ab:function(a){a.h(this.cx)},
ac:function(a){G.r(this.r.d,this.ch,a)},
ah:function(a){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l
z=this.r
this.fy=z.c
y=this.id
y.h(z.f.a)
z=this.r
this.k1=z.fx
this.k2=z.go
x=a.b[this.fy].gq()
w=a.b[this.fy].gl()
v=a.c[this.fy].gu()
u=a.c[this.fy].gk()
z=this.Q.f
z=z.a[z.b++]
z.D(w)
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
r.bc(z+p*n*n+m,l,l,z+p*o*o+m)
m=this.k3
m.h(r)
m.bz()
m=this.k4
m.h(x)
m.p(0,y)
m.j(this.cx)
m.w(0,this.dx)
u*=0.98
z=a.a
r=this.dy
if(z.f){r.w(0,z.c)
z=v.a
p=z[0]
o=this.k1
n=r.a
z[0]=p+o*n[0]
z[1]=z[1]+o*n[1]
u+=this.k2*y.t(r)}else r.I()
a.c[this.fy].sk(u)
z=this.Q;--z.a.b;--z.c.b;--z.f.b},
ae:function(a){return!0},
af:function(a){var z,y,x,w,v,u,t,s,r
z=a.c[this.fy].gu()
y=a.c[this.fy].gk()
x=this.Q.a
x=x.a[x.b++]
w=this.go
w.O(y,x)
x.p(0,z)
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
s.w(0,this.fx)
s.p(0,this.k4)
s.p(0,x)
s.J()
this.k3.cb(s,t)
s.h(u)
u.p(0,t)
r=a.a.a*this.fr
if(u.gL()>r*r)u.w(0,r/Math.sqrt(u.gL()))
t.h(u)
t.j(s)
x=z.a
v=x[0]
u=this.k1
s=t.a
x[0]=v+u*s[0]
x[1]=x[1]+u*s[1]
s=this.k2
t=w.t(t)
a.c[this.fy].sk(y+s*t)
this.Q.a.b-=3}},
hK:{"^":"K;ch,cx,cy,db,dx,dy,fr,fx,fy,go,id,k1,k2,k3,k4,r1,r2,rx,ry,x1,x2,y1,y2,a4,N,U,R,V,T,Y,a,b,c,d,e,f,r,x,y,z,Q",
ab:function(a){G.r(this.f.d,this.ch,a)},
ac:function(a){G.r(this.r.d,this.cx,a)},
ah:function(a2){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1
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
v=a2.b[this.k4].gq()
u=a2.b[this.k4].gl()
t=a2.c[this.k4].gu()
s=a2.c[this.k4].gk()
r=a2.b[this.r1].gq()
q=a2.b[this.r1].gl()
p=a2.c[this.r1].gu()
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
m.D(u)
l.D(q)
x.h(this.ch)
x.j(y)
G.j(m,x,j)
x.h(this.cx)
x.j(z)
G.j(l,x,i)
x.h(r)
x.j(v)
x.p(0,i)
x.j(j)
h=this.ry
g=this.x1
f=this.x2
e=this.y1
l=this.y2
G.j(m,this.cy,l)
k.h(x)
k.p(0,j)
this.R=k.t(l)
z=i.t(l)
this.V=z
y=h+g
n=this.R
z=y+f*n*n+e*z*z
this.Y=z
if(z>0)this.Y=1/z
z=this.a4
G.j(m,this.db,z)
k.h(x)
k.p(0,j)
this.N=k.t(z)
i=i.t(z)
this.U=i
j=this.N
x=f*j
m=e*i
d=x+m
w=this.R
n=this.V
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
if(w.f){y.w(0,w.c)
this.fr=this.fr*a2.a.c
y=this.Q.a
y=y.a[y.b++]
k.h(l)
k.w(0,this.fr+x[2])
y.h(z)
y.w(0,x[0])
y.p(0,k)
k=x[0]
z=this.N
l=x[1]
x=this.fr+x[2]
w=this.R
n=this.U
m=this.V
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
af:function(a){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l
z=a.c[this.k4].gu()
y=a.c[this.k4].gk()
x=a.c[this.r1].gu()
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
p=q.v(p)
o=this.U
n=this.N
m=r.a
m[0]=p+o*w-n*y
m[1]=w-y
p=this.Q.a
p=p.a[p.b++]
r.J()
E.c7(this.T,p,r)
r.J()
r=this.dy.a
o=r[0]
p=p.a
r[0]=o+p[0]
r[1]=r[1]+p[1]
r=this.Q.a
r=r.a[r.b++]
r.h(q)
r.w(0,p[0])
q=p[0]
o=this.N
p=p[1]
n=this.U
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
ae:function(a2){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1
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
n=a2.b[this.k4].gq()
m=a2.b[this.k4].gl()
l=a2.b[this.r1].gq()
k=a2.b[this.r1].gl()
w.D(m)
v.D(k)
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
s.p(0,t)
s.j(n)
s.j(u)
G.j(w,this.cy,r)
p.h(s)
p.p(0,u)
f=p.t(r)
e=t.t(r)
G.j(w,this.db,q)
p.h(s)
p.p(0,u)
d=p.t(q)
c=t.t(q)
s=q.v(s)
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
w.bc(j+i+x*d+y*c,a,a,b)
o.J()
E.dv(w,p,o)
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
dI:{"^":"K;ch,cx,cy,db,dx,dy,fr,fx,fy,go,id,k1,k2,k3,k4,r1,r2,rx,ry,x1,x2,y1,a,b,c,d,e,f,r,x,y,z,Q",
ab:function(a){G.r(this.f.d,this.dx,a)},
ac:function(a){G.r(this.r.d,this.dy,a)},
ah:function(a){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h
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
v=a.b[this.go].gq()
u=a.b[this.go].gl()
t=a.c[this.go].gu()
s=a.c[this.go].gk()
r=a.b[this.id].gq()
q=a.b[this.id].gl()
p=a.c[this.id].gu()
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
m.D(u)
l.D(q)
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
w.p(0,y)
w.j(this.ch)
l=this.k2
l.h(r)
l.p(0,z)
l.j(this.cx)
m=Math.sqrt(w.gL())
n=Math.sqrt(l.gL())
if(m>0.05)w.w(0,1/m)
else w.I()
if(n>0.05)l.w(0,1/n)
else l.I()
k=y.t(w)
j=z.t(l)
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
m.w(0,-this.fy)
i.h(l)
i.w(0,-this.fx*this.fy)
l=t.a
w=l[0]
n=this.rx
x=m.a
l[0]=w+n*x[0]
l[1]=l[1]+n*x[1]
s+=this.x1*y.t(m)
m=p.a
y=m[0]
x=this.ry
n=i.a
m[0]=y+x*n[0]
m[1]=m[1]+x*n[1]
o+=this.x2*z.t(i)
this.Q.a.b-=2}else this.fy=0
a.c[this.go].sk(s)
a.c[this.id].sk(o)
z=this.Q;--z.a.b
z.f.b-=2},
af:function(a){var z,y,x,w,v,u,t,s,r,q,p,o,n,m
z=a.c[this.go].gu()
y=a.c[this.go].gk()
x=a.c[this.id].gu()
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
t.p(0,z)
v=this.k4
v.O(w,s)
s.p(0,x)
p=this.k1
t=p.v(t)
o=this.fx
n=this.k2
s=n.v(s)
m=-this.y1*(-t-o*s)
this.fy+=m
r.h(p)
r.w(0,-m)
q.h(n)
q.w(0,-this.fx*m)
n=z.a
p=n[0]
s=this.rx
o=r.a
n[0]=p+s*o[0]
n[1]=n[1]+s*o[1]
o=this.x1
r=u.t(r)
u=x.a
s=u[0]
n=this.ry
p=q.a
u[0]=s+n*p[0]
u[1]=u[1]+n*p[1]
p=this.x2
q=v.t(q)
a.c[this.go].sk(y+o*r)
a.c[this.id].sk(w+p*q)
this.Q.a.b-=4},
ae:function(a){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e
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
o=a.b[this.go].gq()
n=a.b[this.go].gl()
m=a.b[this.id].gq()
l=a.b[this.id].gl()
w.D(n)
v.D(l)
r.h(this.dx)
r.j(this.r1)
G.j(w,r,y)
r.h(this.dy)
r.j(this.r2)
G.j(v,r,u)
t.h(o)
t.p(0,y)
t.j(this.ch)
s.h(m)
s.p(0,u)
s.j(this.cx)
r=Math.sqrt(t.gL())
v=Math.sqrt(s.gL())
if(r>0.05)t.w(0,1/r)
else t.I()
if(v>0.05)s.w(0,1/v)
else s.I()
k=y.t(t)
j=u.t(s)
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
q.w(0,-e)
p.h(s)
p.w(0,-this.fx*e)
z=o.a
x=z[0]
w=this.rx
v=q.a
z[0]=x+w*v[0]
z[1]=z[1]+w*v[1]
v=this.x1
q=y.t(q)
y=m.a
w=y[0]
z=this.ry
x=p.a
y[0]=w+z*x[0]
y[1]=y[1]+z*x[1]
x=this.x2
p=u.t(p)
a.b[this.go].sl(n+v*q)
a.b[this.id].sl(l+x*p)
p=this.Q
p.f.b-=2
p.a.b-=7
return Math.abs(f)<0.005}},
hP:{"^":"K;ch,cx,cy,db,dx,dy,fr,fx,fy,go,id,k1,k2,k3,k4,r1,r2,rx,ry,x1,x2,y1,y2,a4,a,b,c,d,e,f,r,x,y,z,Q",
ah:function(a){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f
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
u=a.c[this.k1].gu()
t=a.c[this.k1].gk()
s=a.b[this.k2].gl()
r=a.c[this.k2].gu()
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
o.D(v)
n.D(s)
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
t-=k*(y.t(p)+this.db+w[2])
y=r.a
y[0]=y[0]+l*o[0]
y[1]=y[1]+l*o[1]
q+=j*(z.t(p)+this.db+w[2]);--this.Q.a.b}else{w.I()
this.db=0}a.c[this.k1].sk(t)
a.c[this.k2].sk(q)
z=this.Q;--z.a.b
z.f.b-=2},
af:function(a){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l
z=a.c[this.k1].gu()
y=a.c[this.k1].gk()
x=a.c[this.k2].gu()
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
o.p(0,x)
o.j(z)
o.j(p)
o.J()
E.c7(this.y1,r,o)
o=this.cy.a
p=o[0]
q=r.a
o[0]=p+q[0]
o[1]=o[1]+q[1]
o=z.a
o[0]=o[0]-v*q[0]
o[1]=o[1]-v*q[1]
y-=t*m.t(r)
m=x.a
m[0]=m[0]+u*q[0]
m[1]=m[1]+u*q[1]
w+=s*n.t(r)
this.Q.a.b-=2
a.c[this.k1].sk(y)
a.c[this.k2].sk(w);--this.Q.a.b},
ae:function(a){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f
z=this.Q.f
y=z.a
x=z.b
w=x+1
z.b=w
x=y[x]
z.b=w+1
w=y[w]
v=a.b[this.k1].gq()
u=a.b[this.k1].gl()
t=a.b[this.k2].gq()
s=a.b[this.k2].gl()
x.D(u)
w.D(s)
x.D(u)
w.D(s)
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
p.p(0,q)
p.j(v)
p.j(r)
w=Math.sqrt(p.gL())
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
x.bc(y+l*j*j+k*h*h,f,f,y+l*z*z+g*i)
E.dv(x,o,p)
o.J()
p=v.a
x=p[0]
i=o.a
p[0]=x-n*i[0]
p[1]=p[1]-n*i[1]
r=r.t(o)
p=t.a
p[0]=p[0]+m*i[0]
p[1]=p[1]+m*i[1]
o=q.t(o)
q=this.Q
q.a.b-=4;--q.c.b
a.b[this.k1].sl(u-l*r)
a.b[this.k2].sl(s+k*o)
this.Q.f.b-=2
return w<=0.005&&!0},
ab:function(a){G.r(this.f.d,this.ch,a)},
ac:function(a){G.r(this.r.d,this.cx,a)}},
hQ:{"^":"K;ch,cx,cy,db,dx,dy,fr,fx,fy,go,id,k1,k2,k3,k4,r1,r2,rx,a,b,c,d,e,f,r,x,y,z,Q",
ah:function(a){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f
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
v=a.b[this.dy].gq()
u=a.b[this.dy].gl()
t=a.c[this.dy].gu()
s=a.c[this.dy].gk()
r=a.b[this.fr].gq()
q=a.b[this.fr].gl()
p=a.c[this.fr].gu()
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
m.D(u)
l.D(q)
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
w.p(0,z)
w.j(v)
w.j(y)
l=Math.sqrt(w.gL())
this.db=l
if(l-this.cy>0)this.rx=C.a8
else this.rx=C.m
if(l>0.005)w.w(0,1/l)
else{w.I()
this.r2=0
this.dx=0
z=this.Q
z.f.b-=2;--z.a.b
return}k=y.t(w)
j=z.t(w)
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
af:function(a){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j
z=a.c[this.dy].gu()
y=a.c[this.dy].gk()
x=a.c[this.fr].gu()
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
t.p(0,z)
v=this.go
v.O(w,s)
s.p(0,x)
q=this.db-this.cy
p=this.fx
r.h(s)
r.j(t)
o=p.v(r)
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
ae:function(a){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k
z=a.b[this.dy].gq()
y=a.b[this.dy].gl()
x=a.b[this.fr].gq()
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
s.D(y)
r.D(w)
o.h(this.ch)
o.j(this.id)
G.j(s,o,q)
o.h(this.cx)
o.j(this.k1)
G.j(r,o,p)
u.h(x)
u.p(0,p)
u.j(z)
u.j(q)
n=u.X()
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
ab:function(a){G.r(this.f.d,this.ch,a)},
ac:function(a){G.r(this.r.d,this.cx,a)}},
ij:{"^":"K;ch,cx,cy,db,dx,dy,fr,fx,fy,go,id,k1,k2,k3,k4,r1,r2,rx,ry,a,b,c,d,e,f,r,x,y,z,Q",
ab:function(a){G.r(this.f.d,this.db,a)},
ac:function(a){G.r(this.r.d,this.dx,a)},
ah:function(a5){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2,a3,a4
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
u=a5.c[this.fy].gu()
t=a5.c[this.fy].gk()
s=a5.b[this.go].gl()
r=a5.c[this.go].gu()
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
o.D(v)
n.D(s)
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
w.w(0,x.c)
w=w.a
x=w[0]
o=w[1]
n=p.a
n[0]=x
n[1]=o
o=u.a
o[0]=o[0]-m*n[0]
o[1]=o[1]-m*n[1]
t-=k*(y.t(p)+w[2])
y=r.a
y[0]=y[0]+l*n[0]
y[1]=y[1]+l*n[1]
q+=j*(z.t(p)+w[2]);--this.Q.a.b}else w.I()
a5.c[this.fy].sk(t)
a5.c[this.go].sk(q)
z=this.Q;--z.a.b
z.f.b-=2;--z.d.b},
af:function(a){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b
z=a.c[this.fy].gu()
y=a.c[this.fy].gk()
x=a.c[this.go].gu()
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
p.p(0,x)
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
y-=t*r.t(o)
j[0]=j[0]+u*m[0]
j[1]=j[1]+u*m[1]
w+=s*l.t(o)}else{r.O(y,n)
l.O(w,p)
p.p(0,x)
p.j(z)
p.j(n)
n=this.Q.b
n=n.a[n.b++]
p=p.a
n.cs(p[0],p[1],m)
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
k.p(0,m)
m=b[0]
k=b[1]
i=o.a
i[0]=m
i[1]=k
q[0]=q[0]-v*i[0]
q[1]=q[1]-v*i[1]
y-=t*(r.t(o)+b[2])
j[0]=j[0]+u*i[0]
j[1]=j[1]+u*i[1]
w+=s*(l.t(o)+b[2])
this.Q.b.b-=2}a.c[this.fy].sk(y)
a.c[this.go].sk(w)
this.Q.a.b-=3},
ae:function(a){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d
z=a.b[this.fy].gq()
y=a.b[this.fy].gl()
x=a.b[this.go].gq()
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
s.D(y)
r.D(w)
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
t.p(0,p)
t.j(z)
t.j(q)
f=Math.sqrt(t.gL())
E.c7(r,v,t)
v.J()
t=u[0]
r=v.a
u[0]=t-o*r[0]
u[1]=u[1]-o*r[1]
y-=m*q.t(v)
s[0]=s[0]+n*r[0]
s[1]=s[1]+n*r[1]
w+=l*p.t(v)
e=0}else{t.h(x)
t.p(0,p)
t.j(z)
t.j(q)
d=w-y-this.dy
f=Math.sqrt(t.gL())
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
i.cs(t[0],t[1],d)
E.he(r,h,i)
h.J()
h=h.a
i=h[0]
r=h[1]
t=v.a
t[0]=i
t[1]=r
u[0]=u[0]-o*t[0]
u[1]=u[1]-o*t[1]
y-=m*(q.t(v)+h[2])
s[0]=s[0]+n*t[0]
s[1]=s[1]+n*t[1]
w+=l*(p.t(v)+h[2])
this.Q.b.b-=2}a.b[this.fy].sl(y)
a.b[this.go].sl(w)
v=this.Q
v.a.b-=5
v.f.b-=2;--v.d.b
return f<=0.005&&e<=0.03490658503988659}},
ik:{"^":"K;ch,cx,cy,db,dx,dy,fr,fx,fy,go,id,k1,k2,k3,k4,r1,r2,rx,ry,x1,x2,y1,y2,a4,N,U,R,V,T,Y,a1,a8,a9,ap,a,b,c,d,e,f,r,x,y,z,Q",
ab:function(a){G.r(this.f.d,this.cy,a)},
ac:function(a){G.r(this.r.d,this.db,a)},
ah:function(a0){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a
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
t=a0.b[this.k2].gq()
s=a0.b[this.k2].gl()
r=a0.c[this.k2].gu()
q=a0.c[this.k2].gk()
p=a0.b[this.k3].gq()
o=a0.b[this.k3].gl()
n=a0.c[this.k3].gu()
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
i.D(s)
h.D(o)
l.h(this.cy)
l.j(y)
y=this.a8
G.j(i,l,y)
l.h(this.db)
l.j(z)
z=this.a9
G.j(h,l,z)
h=this.ap
h.h(p)
h.p(0,z)
h.j(t)
h.j(y)
j=this.y1
G.ax(i,this.dy,j)
l.h(h)
l.p(0,y)
this.N=l.t(j)
k=z.t(j)
this.U=k
u=w+u
w=this.N
k=u+x*w*w+v*k*k
this.R=k
if(k>0)this.R=1/k
this.T=0
this.Y=0
this.a1=0
if(this.ch>0){w=this.x2
G.ax(i,this.dx,w)
l.h(h)
l.p(0,y)
this.y2=l.t(w)
z=z.t(w)
this.a4=z
l=this.y2
g=u+x*l*l+v*z*z
if(g>0){this.T=1/g
f=h.v(w)
e=6.283185307179586*this.ch
z=this.T
y=this.cx
d=z*e*e
c=a0.a.a
y=c*(2*z*y*e+c*d)
this.a1=y
if(y>0){z=1/y
this.a1=z}else z=y
this.Y=f*c*d*z
z=g+z
this.T=z
if(z>0)this.T=1/z}}else this.fy=0
this.V=0
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
i=this.U
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
af:function(a){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f
z=this.r2
y=this.rx
x=this.ry
w=this.x1
v=a.c[this.k2].gu()
u=a.c[this.k2].gk()
t=a.c[this.k3].gu()
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
r=q.v(p)
n=this.a4
m=this.y2
l=this.T
k=this.Y
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
i=this.V
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
p=n.v(p)
i=this.U
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
ae:function(a){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h
z=a.b[this.k2].gq()
y=a.b[this.k2].gl()
x=a.b[this.k3].gq()
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
s.D(y)
r.D(w)
v.h(this.cy)
v.j(this.k4)
t=this.a8
G.ax(s,v,t)
v.h(this.db)
v.j(this.r1)
u=this.a9
G.ax(r,v,u)
r=this.ap
r.h(x)
r.j(z)
r.p(0,u)
r.j(t)
q=this.Q.a
q=q.a[q.b++]
G.ax(s,this.dy,q)
v.h(r)
v.p(0,t)
p=v.t(q)
o=u.t(q)
n=r.v(q)
r=this.r2
u=this.rx
v=this.ry
t=this.N
s=this.x1
m=this.U
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
at:function(a){this.a=this.a*0.95+a*0.05
this.b=this.b*0.8+a*0.2
this.c=Math.min(a,this.c)
this.d=Math.max(a,this.d)},
m:function(a){return H.d(this.b)+" ("+H.d(this.a)+") ["+H.d(this.c)+","+H.d(this.d)+"]"}},
hL:{"^":"c;a,b,c,d,e,f,r,x,y,z"},
dN:{"^":"c;a,b,c"},
dZ:{"^":"c;a,b,c,d,e,f"},
io:{"^":"c;a,b,c,d,e,f,r,x,y,z,Q,ch,cx,cy,db,dx,dy,fr,fx,fy,go,id,k1,k2,k3,k4,r1,r2,rx,ry,x1,x2,y1,y2,a4,N,U,R,V,T,Y,a1,a8,a9,ap,aI,aJ,aK,aa,aq,ar",
aO:function(a,b,c){var z,y,x,w,v
z=new V.bg(null,!1)
z.a=a
z.b=!0
y=this.fy
x=b.a
w=c.a
y[x][w]=z
if(b!==c){v=new V.bg(null,!1)
v.a=a
y[w][x]=v}},
f1:function(){var z=this.ch
this.aO(z.ch,C.i,C.i)
this.aO(z.cx,C.j,C.i)
this.aO(z.Q,C.j,C.j)
this.aO(z.cy,C.o,C.i)
this.aO(z.db,C.o,C.j)
this.aO(z.dx,C.t,C.i)
this.aO(z.dy,C.t,C.j)},
hh:function(a,b,c,d){var z,y,x,w,v,u
z=a.d.a
y=c.d.a
x=this.fy[z.a][y.a]
if(x!=null){w=x.b
v=x.a
if(w){u=v.dn()
u.aw(a,b,c,d)
return u}else{u=v.dn()
u.aw(c,d,a,b)
return u}}else return},
bY:function(a){var z,y,x,w,v,u,t,s,r
if((this.a&2)===2)return
z=G.t()
y=G.t()
x=new E.a(new Float64Array(H.b(2)))
w=new E.a(new Float64Array(H.b(2)))
v=new E.a(new Float64Array(H.b(2)))
u=new G.ay(x,w,v,0,0,0)
t=new E.a(new Float64Array(H.b(2)))
s=new E.a(new Float64Array(H.b(2)))
r=new V.aU(C.e,0,0,z,y,u,t,0,s,0,this,null,null,null,0,null,null,0,0,0,0,0,0,0,0,null,new V.dc(null,null,0.2,0,0,!1,new V.bY(1,65535,0)),new V.hd(0,new E.a(new Float64Array(H.b(2))),0),G.t())
if(a.Q){r.b=16
y=16}else y=0
y|=4
r.b=y
y|=2
r.b=y
r.b=y|32
y=z.a
y.h(a.c)
z.b.D(a.d)
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
d5:function(a){var z,y,x,w,v,u,t
if((this.a&2)===2)return
z=V.h2(this,a)
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
t=a.d.dy
for(;t!=null;){y=t.a
if(y==null?u==null:y===u)t.b.a|=8
t=t.d}return z},
fo:function(){var z,y
for(z=this.c;z!=null;z=z.cx){y=z.y.a
y[0]=0
y[1]=0
z.z=0}},
fJ:function(){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2
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
if((s&32)!==32){z.au(0.5,0.5,0.3)
this.bf(q,v,z,x)}else{p=w.a
if(p===C.e){z.au(0.5,0.9,0.3)
this.bf(q,v,z,x)}else if(p===C.G){z.au(0.5,0.5,0.9)
this.bf(q,v,z,x)}else if((s&2)!==2){z.au(0.5,0.5,0.5)
this.bf(q,v,z,x)}else{z.au(0.9,0.7,0.7)
this.bf(q,v,z,x)}}}}z=this.fx
v=this.Q.a
o=z.z
if(o!==0){n=z.r/2
m=z.cy.a
l=z.fx.a!=null?z.dI():null
z=this.Q
if((v&128)!==0)z.fL(m,n,l,o)
else z.fK(m,n,l,o)}}if((y&4)!==0)for(k=this.d,z=this.ch.a,v=this.k2,u=z.a;k!=null;k=k.c){j=k.f
i=k.r
h=j.d.a
g=i.d.a
t=z.b
s=t+1
z.b=s
t=u[t]
z.b=s+1
s=u[s]
k.ab(t)
k.ac(s)
v.au(0.5,0.8,0.8)
switch(k.a){case C.x:this.Q.ak(t,s,v)
break
case C.L:H.n(k,"$isdI")
f=k.ch
e=k.cx
this.Q.ak(f,t,v)
this.Q.ak(e,s,v)
this.Q.ak(f,e,v)
break
case C.N:this.Q.ak(h,g,v)
break
case C.w:case C.M:break
default:this.Q.ak(h,t,v)
this.Q.ak(t,s,v)
this.Q.ak(g,s,v)}z.b-=2}if((y&16)!==0){z=this.k2
z.au(0.3,0.9,0.9)
for(d=this.b.b,v=this.k4,u=this.r1;d!=null;d=d.c){c=d.f
b=d.r
t=d.x
c.r[t].gaQ().cf(v)
t=d.y
b.r[t].gaQ().cf(u)
this.Q.ak(v,u,z)}}if((y&8)!==0){z=this.k2
z.au(0.9,0.3,0.9)
for(w=this.c,v=this.r2,u=v.a;w!=null;w=w.cx){if((w.b&32)!==32)continue
for(q=w.cy;q!=null;q=q.b)for(a=0;a<q.x;++a){a0=q.r[a]
t=this.b.a
s=a0.d
a1=t.a.b[s].gaQ()
if(!u.b7(4))u.n(0,4,v.cj(4))
t=u.i(0,4)
s=J.A(t)
p=a1.a.a
s.i(t,0).ad(p[0],p[1])
a2=a1.b.a
s.i(t,1).ad(a2[0],p[1])
s.i(t,2).ad(a2[0],a2[1])
s.i(t,3).ad(p[0],a2[1])
a2=this.Q
a2.bw(t,4,z)
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
s.aA(v,v)
t.beginPath()
t.arc(u[0],u[1],0.1*p,0,6.283185307179586,!0)
t.closePath()
t.stroke()}if((y&64)!==0)this.b.a.a.fM(this.Q)
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
z.aw(x,v.c,this.f,v.e)
for(y=this.c;y!=null;y=y.cx)y.b&=4294967294
for(u=this.b.b;u!=null;u=u.c)u.a&=4294967294
for(t=this.d;t!=null;t=t.c)t.x=!1
s=this.e
if(this.y1.length<s)this.y1=H.e(new Array(s),[V.aU])
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
y.aj(!0)
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
q=m}}z.dX(this.fr,a,x,this.x)
for(j=0;j<z.r;++j){y=z.b[j]
if(y.a===C.e)y.b&=4294967294}}z=this.fr.f
z.at(z.e)
z=this.fr.r
z.at(z.e)
z=this.fr.x
z.at(z.e)
z=this.y2.a
x=z.b
z.a=x==null?$.v.$0():x
for(y=this.c;y!=null;y=y.cx){if((y.b&1)===0)continue
if(y.a===C.e)continue
y.cA()}x=this.b
x.a.cd(x)
x=this.fr.y
v=z.b
if(v==null)v=$.v.$0()
x.at(C.c.aC((v-z.a)*1000,$.B))},
e9:function(b4){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2,a3,a4,a5,a6,a7,a8,a9,b0,b1,b2,b3
z=this.a4
z.aw(64,32,0,this.b.e)
if(this.dy){for(y=this.c;y!=null;y=y.cx){y.b&=4294967294
y.f.f=0}for(x=this.b.b;x!=null;x=x.c){x.a&=4294967262
x.Q=0
x.ch=1}}for(w=this.R,v=this.V,u=this.T,t=this.Y,s=this.U,r=this.N,q=r.a,p=r.b,o=r.c,n=r.d,m=this.ch;!0;){for(x=this.b.b,l=null,k=1;x!=null;x=x.c){j=x.a
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
q.cr(h.d,a5)
p.cr(g.d,a6)
o.K(j)
n.K(a)
r.e=1
m.fx.hx(s,r)
a7=s.b
i=s.a===C.D?Math.min(a3+(1-a3)*a7,1):1
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
l.cc(this.b.e)
a8=l.a&=4294967263;++l.Q
if((a8&4)!==4||(a8&2)!==2){l.a=a8&4294967291
j.K(u)
a.K(t)
f.b_()
e.b_()
continue}f.aj(!0)
e.aj(!0)
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
b2.cc(this.b.e)
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
if(b3.a!==C.e)b3.aj(!0)
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
z.ea(w,f.c,e.c)
for(a9=0;a9<z.r;++a9){b0=z.b[a9]
b0.b&=4294967294
if(b0.a!==C.f)continue
b0.cA()
for(b1=b0.dy;b1!=null;b1=b1.d)b1.b.a&=4294967262}j=this.b
j.a.cd(j)}},
bf:function(a,b,c,d){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l
z=a.d
switch(z.a){case C.i:H.n(z,"$isab")
y=this.aJ
G.o(b,z.c,y)
x=z.b
z=b.b
w=z.b
z=z.a
v=this.aK.a
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
s.aA(y,y)
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
s.aA(y,y)
w.beginPath()
w.arc(v[0],v[1],x*r,0,6.283185307179586,!0)
w.closePath()
w.fill("nonzero")}break
case C.j:H.n(z,"$isal")
q=z.f
y=this.ar
w=y.a
if(!w.b7(8))w.n(0,8,y.cj(8))
y=w.i(0,8)
for(w=J.A(y),p=0;p<q;++p)G.o(b,z.d[p],w.i(y,p))
z=this.Q
if(d){z.bw(y,q,c)
z.c.stroke()}else{z.bw(y,q,c)
z=z.c
z.toString
z.fill("nonzero")}break
case C.o:H.n(z,"$isaJ")
y=this.aa
G.o(b,z.c,y)
w=this.aq
G.o(b,z.d,w)
this.Q.ak(y,w,c)
break
case C.t:H.n(z,"$isbQ")
o=z.geX()
n=z.gbV()
z=this.aa
G.o(b,n.i(0,0),z)
for(y=this.aq,w=z.a,m=y.a,p=1;C.c.a0(p,o);++p){G.o(b,n.i(0,p),y)
this.Q.ak(z,y,c)
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
u.aA(z,z)
v.beginPath()
v.arc(w[0],w[1],0.05*t,0,6.283185307179586,!0)
v.closePath()
v.stroke()
w[1]=m[1]
w[0]=m[0]}break
default:break}},
C:{
it:function(a,b){var z,y,x
z=H.e(new Array(a),[[P.k,V.bg]])
for(y=[V.bg],x=0;x<a;++x)z[x]=H.e(new Array(b),y)
return z}}},
ir:{"^":"c;a,b",
dw:function(a){var z=this.a.a.b[a].gay()
return this.b.i4(z.b)}},
is:{"^":"c;a,b,c,d,e"},
cb:{"^":"c;a",
sl:function(a){this.a[3]=a},
gl:function(){return this.a[3]}},
hC:{"^":"c;a,b,c,d,ay:e<"},
bo:{"^":"c;a,b,c"},
hB:{"^":"c;a,b"},
hr:{"^":"c;a,b,c"},
fs:{"^":"c;a,b,c,d,e"},
ig:{"^":"c;a,b"},
fi:{"^":"c;a,b,c"},
hW:{"^":"c;a,b,c,d,e,f"},
hD:{"^":"c;a,b,c,d,e,f,r,x,y,z,Q,ch,cx,cy,db,dx,dy,fr,fx,fy,go,id,k1,k2,k3,k4,r1,r2,rx,ry,x1,x2,y1,y2,a4,N,U,R,V,T,Y,a1,a8,a9,ap,aI,aJ,aK,aa,aq,ar,hQ,bh,hR,hS,hT,hU,fO,fP,fQ,fR,fS,fT,hV",
c9:function(a,b){var z,y,x,w,v
if(a==null){x=this.Q
w=new Array(x)
w.fixed$length=Array
a=w
for(z=0;J.cI(z,x);z=J.eP(z,1))try{J.eQ(a,z,b.$0())}catch(v){y=H.Y(v)
x="Exception "+H.d(y)
throw H.f(x)}}return a},
fH:function(a){var z,y
z=this.aa
z.cm()
z.cm().hH(a)
for(y=a.gbs(),z=this.fy;y.a0(0,a.gbu());y=y.A(0,1))C.b.n(z,y,null)
a.gbR()
a.gbR().sbQ(a.gbQ())
a.gbQ()
a.gbQ().sbR(a.gbR());--this.U},
hB:function(a){var z,y,x,w,v,u,t,s
for(z=this.k2,y=this.x,x=0;w=this.id,x<w;++x){v=C.b.i(z,x)
u=v.gc2(v)
w=this.cy.a[u].a
t=w[0]
v.shu(0,(C.a.a6(y*w[1]+2048)<<19>>>0)+(C.a.a6(128*(y*t))+262144))}F.eK(z,0,w)
this.k3=0
for(u=0;u<this.id;++u){s=C.b.i(z,u)
V.hG(s.ghu(s),1,0)}},
hA:function(){var z,y,x,w,v,u,t,s,r
z=this.aq
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
w=this.fO
w.a=this
this.aa.hl(w,z)},
e_:function(a){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k
z=this.aq
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
x[1]=q>o?q:o}y=this.fP
y.b=a
y.a=this
this.aa.hl(y,z)},
bI:function(a){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k;++this.a
if(this.z===0)return
this.b=0
for(z=0,y=0;z<this.z;++z){y=C.c.co(y,C.b.i(this.cx.a,z))
this.b=y}if((y&2)!==0)this.ef()
if(this.z===0)return
this.c=0
for(x=this.R;!1;x=x.bD())this.c=C.c.co(this.c,x.gcN())
y=a.a
w=this.f
v=this.aa
u=v.dH()
t=C.a.B(y*w,u.gE(u))
u=a.a
v=v.dH()
s=C.a.B(u*w,v.gF(v))
r=this.ci(a)
for(z=0;z<this.z;++z){y=this.db.a[z].a
y[0]=y[0]+t
y[1]=y[1]+s
w=y[0]
v=y[1]
q=w*w+v*v
if(q>r){p=q===0?17976931348623157e292:Math.sqrt(r/q)
y[0]=y[0]*p
y[1]=y[1]*p}}this.e_(a)
if((this.c&2)!==0)this.e6(a)
if((this.b&4)!==0)this.ee(a)
for(y=this.z,w=this.cy.a,v=this.db.a,u=a.a,z=0;z<y;++z){o=w[z]
n=v[z]
m=o.a
l=m[0]
k=n.a
m[0]=l+u*k[0]
m[1]=m[1]+u*k[1]}this.hA()
this.hB(!1)
if((this.b&32)!==0)this.ed(a)
if((this.b&64)!==0)this.e4(a)
if((this.b&128)!==0)this.ec(a)
if((this.b&16)!==0)this.e2(a)
if((this.b&8)!==0)this.e8(a)
if((this.c&1)!==0)this.e7(a)
if((this.b&256)!==0)this.e0(a)
this.e5(a)
this.e1(a)},
e5:function(a){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e
for(z=this.dx,y=0;y<this.z;++y)C.b.n(z,y,0)
for(x=0;x<this.r2;++x){w=this.ry[x]
v=w.a
u=w.c
C.b.n(z,v,C.b.i(z,v).A(0,u))}for(x=0;x<this.k3;++x){w=this.r1[x]
v=w.a
t=w.b
u=w.d
C.b.n(z,v,C.b.i(z,v).A(0,u))
C.b.n(z,t,C.b.i(z,t).A(0,u))}if((this.b&64)!==0)for(y=0;y<this.z;++y){C.b.i(this.cx.a,y).ai(0,64)
C.b.n(z,y,0)}s=this.V*(this.d*this.ci(a))
for(y=0;y<this.z;++y)C.b.n(z,y,s*Math.max(0,Math.min(H.jl(C.b.i(z,y)),5)-1))
r=a.a/(this.d*this.r)
for(q=this.bh,p=q.a,o=this.x,n=1.777777*this.e*o*o,x=0;x<this.r2;++x){w=this.ry[x]
v=w.a
t=w.b
u=w.c
m=w.e
l=w.d
k=this.cy.a[v]
j=C.k.B(r*u*m,C.b.i(z,v).A(0,s*u))
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
i=C.b.i(z,v).A(0,C.b.i(z,t))
p=r*u
o=l.a
h=C.k.B(p,i)*o[0]
g=C.k.B(p,i)*o[1]
o=this.db.a
f=o[v]
e=o[t]
o=f.a
o[0]=o[0]-h
o[1]=o[1]-g
o=e.a
o[0]=o[0]+h
o[1]=o[1]+g}},
e1:function(a4){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2,a3
z=this.T
for(y=this.bh,x=y.a,w=this.x,v=1.777777*this.e*w*w,u=0;u<this.r2;++u){t=this.ry[u]
s=t.a
r=t.b
q=t.c
p=t.e
o=t.d
n=this.cy.a[s]
w=n.a
m=w[0]
l=r.gaP().gq()
k=C.a.H(m,l.gE(l))
w=w[1]
l=r.gaP().gq()
j=C.a.H(w,l.gF(l))
i=this.db.a[s]
l=r.gbr().dM(0).B(0,j)
w=r.gbv()
w=l.A(0,w.gE(w))
l=i.a
h=w.H(0,l[0])
w=r.gbr().B(0,k)
m=r.gbv()
g=w.A(0,m.gF(m)).H(0,l[1])
m=o.a
f=h.B(0,m[0]).A(0,g.B(0,m[1]))
if(f.a0(0,0)){w=z*q*p
x[0]=C.a.B(w,f)*m[0]
x[1]=C.a.B(w,f)*m[1]
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
ee:function(a){var z,y,x
for(z=0;z<this.z;++z){C.b.i(this.cx.a,z).ai(0,4)
y=this.db.a[z]
x=y.a
x[0]=0
x[1]=0}},
e6:function(a){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h
for(z=this.R,y=this.bh,x=this.fQ,w=this.fR,v=y.a,u=this.fS,t=u.a,s=t.a,u=u.b,r=this.fT,q=r.a.a,p=r.b;!1;z=z.bD()){z.gcN().ai(0,2)
z.i6()
o=C.a.B(a.a,z.gbr())
w.a=Math.sin(o)
w.b=Math.cos(o)
G.j(w,z.geP(),x)
n=z.gbv().ghL()
v[1]=n[1]
v[0]=n[0]
o=a.a
v[1]=v[1]*o
v[0]=v[0]*o
y.p(0,z.geP())
y.j(x)
s[1]=v[1]
s[0]=v[0]
u.a=w.a
u.b=w.b
o=z.gbT()
m=z.gbT()
l=o.gc8()
k=m.gc8()
j=C.a.B(u.b,l.gq())
i=C.a.B(u.a,l.gcp())
k.scp(C.a.B(u.a,l.gq())+C.a.B(u.b,l.gcp()))
k.sq(j-i)
G.ax(u,o.gbA(),m.gbA())
m.gbA().p(0,t)
m=a.b
q[0]=m*s[0]
q[1]=m*s[1]
p.a=m*u.a
p.b=m*(u.b-1)
for(h=z.gbs();h.a0(0,z.gbu());h=h.A(0,1))G.o(r,this.cy.a[h],this.db.a[h])}},
e2:function(a6){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2,a3,a4,a5
z=a6.b*this.Y
for(y=0;y<this.y2;++y){x=C.b.i(this.N,y)
x.gfX().ai(0,16)
w=x.gaU()
v=x.gaV()
u=x.gc3()
t=x.gi0()
s=x.gi1()
r=x.gi2()
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
g=t.t(p).A(0,s.t(o)).A(0,r.t(n))
f=t.v(p).A(0,s.v(o)).A(0,r.v(n))
e=Math.sqrt(C.c.dC(1,g.B(0,g).A(0,f.B(0,f))))
g=g.B(0,e)
f=f.B(0,e)
d=C.a.B(z,x.gej())
c=f.B(0,t.gE(t)).H(0,g.B(0,t.gF(t)))
b=g.B(0,t.gE(t)).A(0,f.B(0,t.gF(t)))
a=f.B(0,s.gE(s)).H(0,g.B(0,s.gF(s)))
a0=g.B(0,s.gE(s)).A(0,f.B(0,s.gF(s)))
a1=f.B(0,r.gE(r)).H(0,g.B(0,r.gF(r)))
a2=g.B(0,r.gE(r)).A(0,f.B(0,r.gF(r)))
m=this.db.a
a3=m[w]
a4=m[v]
a5=m[u]
m=a3.a
m[0]=m[0]+C.a.B(d,c.H(0,q[0]-i))
m[1]=m[1]+C.a.B(d,b.H(0,q[1]-h))
q=a4.a
q[0]=q[0]+C.a.B(d,a.H(0,l[0]-i))
q[1]=q[1]+C.a.B(d,a0.H(0,l[1]-h))
l=a5.a
l[0]=l[0]+C.a.B(d,a1.H(0,j[0]-i))
l[1]=l[1]+C.a.B(d,a2.H(0,j[1]-h))}},
e8:function(a){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h
z=a.b*this.a1
for(y=this.y1,x=0;x<this.x1;++x){w=C.b.i(y,x)
w.gfX().ai(0,8)
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
l=C.a.B(z,w.gej())
k=C.a.B(l,n.H(0,m))/m*p
j=C.a.B(l,n.H(0,m))/m*o
t=this.db.a
i=t[v]
h=t[u]
t=i.a
t[0]=t[0]-k
t[1]=t[1]-j
t=h.a
t[0]=t[0]+k
t[1]=t[1]+j}},
ec:function(a0){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a
this.dy=this.c9(this.dy,V.cA())
for(z=this.dx,y=0;y<this.z;++y){C.b.n(z,y,0)
this.dy[y].I()}for(x=0;x<this.k3;++x){w=this.r1[x]
if((w.c&128)!==0){v=w.a
u=w.b
t=w.d
s=w.e
C.b.n(z,v,C.b.i(z,v).A(0,t))
C.b.n(z,u,C.b.i(z,u).A(0,t))
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
l=this.ap*n
for(x=0;x<this.k3;++x){w=this.r1[x]
if((w.c&128)!==0){v=w.a
u=w.b
t=w.d
s=w.e
r=this.dy
q=r[v]
p=r[u]
k=C.b.i(z,v).A(0,C.b.i(z,u))
r=p.a
n=r[0]
j=q.a
i=j[0]
r=r[1]
j=j[1]
h=C.k.B(m,k.H(0,2))
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
ed:function(a1){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0
z=this.a8
for(y=this.bh,x=this.x,w=1.777777*this.e*x*x,x=y.a,v=0;v<this.r2;++v){u=this.ry[v]
t=u.a
C.b.i(this.cx.a,t).ai(0,32)
s=u.b
r=u.c
q=u.e
p=this.cy.a[t]
o=this.db.a[t]
n=p.a
m=n[0]
l=s.gaP().gq()
k=C.a.H(m,l.gE(l))
n=n[1]
l=s.gaP().gq()
j=C.a.H(n,l.gF(l))
l=s.gbr().dM(0).B(0,j)
n=s.gbv()
n=l.A(0,n.gE(n))
l=o.a
i=n.H(0,l[0])
n=s.gbr().B(0,k)
m=s.gbv()
h=n.A(0,m.gF(m)).H(0,l[1])
m=z*q*r
x[0]=C.k.B(m,i)
x[1]=C.k.B(m,h)
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
e4:function(a){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f
z=this.aI*(this.r*a.b)
for(y=this.bh,x=this.x,w=1.777777*this.e*x*x,x=y.a,v=0;v<this.r2;++v){u=this.ry[v]
t=u.a
C.b.i(this.cx.a,t).ai(0,64)
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
r.bW(y,p,!0)}}for(x=this.k3,l=this.r1,k=this.db.a,j=this.aI,v=0;v<x;++v){u=l[v]
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
e7:function(a){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j
z=this.fr
this.fr=z==null?new Float64Array(H.b(this.Q)):z
y=a.b*this.aJ
for(x=this.fy,w=0;w<this.k3;++w){v=this.r1[w]
u=v.a
t=v.b
C.b.i(x,u)
C.b.i(x,t)
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
e0:function(a){var z,y,x,w,v,u,t,s,r,q,p,o,n
z=this.fx
z.a=this.c9(z.a,V.eC())
y=C.a.a6(256*this.aK)
for(x=0;x<this.k3;++x){w=this.r1[x]
v=w.a
u=w.b
C.b.i(this.cx.a,v).ai(0,C.b.i(this.cx.a,u)).ai(0,256)
z=this.fx.a
t=z[v]
z=z[u].a
s=z[0]
r=t.a
q=C.c.b3(C.c.a6(y*(s-r[0])),8)
p=C.c.b3(C.c.a6(y*(z[1]-r[1])),8)
o=C.c.b3(C.c.a6(y*(z[2]-r[2])),8)
n=C.c.b3(C.c.a6(y*(z[3]-r[3])),8)
r[0]=r[0]+q
r[1]=r[1]+p
r[2]=r[2]+o
r[3]=r[3]+n
z[0]=z[0]-q
z[1]=z[1]-p
z[2]=z[2]-o
z[3]=z[3]-n}},
ef:function(){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i
z=P.au(this.z,0,!1,P.m)
for(y=this.aa,x=0;x<this.z;++x){w=C.b.i(this.cx.a,x)
w.ai(0,2)
v=y.cm()
w.ai(0,512)
v.hG(x)
z[x]=-1}for(y=this.k2,u=0;t=this.id,u<t;++u){s=C.b.i(y,u)
s.sc2(0,z[s.gc2(s)])}for(x=0;x<t;++x)if(V.hF(C.b.i(y,x))){--t
r=C.b.i(y,t)
C.b.n(y,t,C.b.i(y,x))
C.b.n(y,x,r);--x}this.id=t
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
for(y=this.y1,u=0;t=this.x1,u<t;++u){o=C.b.i(y,u)
o.saU(z[o.gaU()])
o.saV(z[o.gaV()])}for(x=0;x<t;++x){p=C.b.i(y,x)
if(p.gaU().a0(0,0)||p.gaV().a0(0,0)){--t
r=C.b.i(y,t)
C.b.n(y,t,C.b.i(y,x))
C.b.n(y,x,r);--x}}this.x1=t
for(u=0;t=this.y2,u<t;++u){n=C.b.i(this.N,u)
n.saU(z[n.gaU()])
n.saV(z[n.gaV()])
n.sc3(z[n.gc3()])}for(x=0;x<t;++x){y=C.b.i(this.N,x)
if(y.gaU().a0(0,0)||y.gaV().a0(0,0)||y.gc3().a0(0,0)){--t
r=C.b.i(this.N,t)
y=this.N
C.b.n(y,t,C.b.i(y,x))
C.b.n(this.N,x,r);--x}}this.y2=t
for(m=this.R;!1;m=m.bD()){for(x=m.gbs(),l=0,k=0,j=!1;x.a0(0,m.gbu());x=x.A(0,1)){t=z[x]
if(t>=0){l=Math.min(l,t)
k=Math.max(k,t+1)}else j=!0}if(l<k){m.sbs(l)
m.sbu(k)
if(j){m.gcN().ai(0,2)
m.sfh(!0)}}else{m.sbs(0)
m.sbu(0)
if(m.ghK())m.sfg(!0)}}this.z=0
for(m=this.R;!1;m=i){i=m.bD()
if(m.gfg())this.fH(m)
else m.gfh()}},
ci:function(a){var z=this.r*a.b
return z*z},
dI:function(){var z=this.fx
z.a=this.c9(z.a,z.b)
return this.fx.a},
eE:function(a){this.V=0.05
this.T=1
this.Y=0.25
this.a1=0.25
this.a8=0.25
this.a9=0.1
this.ap=0.2
this.aI=0.5
this.aJ=0.5
this.aK=0.5
this.cx=new V.hB(null,null)
this.cy=new V.bo(null,V.cA(),0)
this.db=new V.bo(null,V.cA(),0)
this.fx=new V.bo(null,V.eC(),0)
this.go=new V.bo(null,V.jk(),0)},
C:{
hG:function(a,b,c){return a.A(0,c<<19>>>0).A(0,b<<7>>>0)},
kO:[function(){return new E.a(new Float64Array(H.b(2)))},"$0","cA",0,0,16],
kM:[function(){return new P.c()},"$0","jk",0,0,17],
kN:[function(){var z=new Int8Array(H.b(4))
z[0]=127
z[1]=127
z[2]=127
z[3]=50
return new V.cb(z)},"$0","eC",0,0,18],
hE:function(a){var z=new V.hD(0,0,0,1,1,1,1,1,1,0,0,0,null,null,null,null,null,null,null,null,null,0,0,null,0,0,null,0,0,null,0,0,null,0,0,null,0,null,null,null,null,null,null,null,null,null,null,null,null,V.aF(),new V.fs(null,null,null,!1,0),V.aF(),new E.a(new Float64Array(H.b(2))),G.t(),G.t(),new V.fi(null,null,null),new V.hC(0,new E.a(new Float64Array(H.b(2))),new E.a(new Float64Array(H.b(2))),null,null),new V.ig(null,new E.a(new Float64Array(H.b(2)))),new V.hW(null,null,new V.ch(new E.a(new Float64Array(H.b(2))),new E.a(new Float64Array(H.b(2))),0),new V.dK(new E.a(new Float64Array(H.b(2))),0),new E.a(new Float64Array(H.b(2))),new E.a(new Float64Array(H.b(2)))),new E.a(new Float64Array(H.b(2))),new G.b2(0,1),G.t(),G.t(),new V.hr(0,0,0))
z.eE(a)
return z}}},
eh:{"^":"c;a",
cj:function(a){var z,y,x
z=new Array(a)
z.fixed$length=Array
y=H.e(z,[E.a])
for(z=y.length,x=0;x<z;++x)y[x]=new E.a(new Float64Array(2))
return y}},
hz:{"^":"Q;a,b,c,d",
a5:function(){return new E.a(new Float64Array(2))},
$asQ:function(){return[E.a]}},
hA:{"^":"Q;a,b,c,d",
a5:function(){return new E.ae(new Float64Array(3))},
$asQ:function(){return[E.ae]}},
hw:{"^":"Q;a,b,c,d",
a5:function(){return new E.a4(new Float64Array(4))},
$asQ:function(){return[E.a4]}},
hx:{"^":"Q;a,b,c,d",
a5:function(){return new E.aj(new Float64Array(9))},
$asQ:function(){return[E.aj]}},
hv:{"^":"Q;a,b,c,d",
a5:function(){var z=new Float64Array(2)
return new V.ag(new E.a(z),new E.a(new Float64Array(2)))},
$asQ:function(){return[V.ag]}},
hy:{"^":"Q;a,b,c,d",
a5:function(){return new G.b2(0,1)},
$asQ:function(){return[G.b2]}},
H:{"^":"ad;$ti"},
hp:{"^":"H;d,a,b,c",
a5:function(){return new V.bq(0,null,null,new V.D(null,null,null,null),new V.D(null,null,null,null),null,null,0,0,V.G(),0,0,0,0,0,this.d,V.G())},
$asH:function(){return[V.bq]},
$asad:function(){return[V.bq]}},
hl:{"^":"H;d,a,b,c",
a5:function(){return new V.be(0,null,null,new V.D(null,null,null,null),new V.D(null,null,null,null),null,null,0,0,V.G(),0,0,0,0,0,this.d,V.G())},
$asH:function(){return[V.be]},
$asad:function(){return[V.be]}},
ho:{"^":"H;d,a,b,c",
a5:function(){return new V.bp(0,null,null,new V.D(null,null,null,null),new V.D(null,null,null,null),null,null,0,0,V.G(),0,0,0,0,0,this.d,V.G())},
$asH:function(){return[V.bp]},
$asad:function(){return[V.bp]}},
hm:{"^":"H;d,a,b,c",
a5:function(){return new V.bj(0,null,null,new V.D(null,null,null,null),new V.D(null,null,null,null),null,null,0,0,V.G(),0,0,0,0,0,this.d,V.G())},
$asH:function(){return[V.bj]},
$asad:function(){return[V.bj]}},
hn:{"^":"H;d,a,b,c",
a5:function(){return new V.bk(0,null,null,new V.D(null,null,null,null),new V.D(null,null,null,null),null,null,0,0,V.G(),0,0,0,0,0,this.d,V.G())},
$asH:function(){return[V.bk]},
$asad:function(){return[V.bk]}},
hj:{"^":"H;d,a,b,c",
a5:function(){var z,y,x,w
z=new Float64Array(2)
y=new Float64Array(2)
x=new Float64Array(2)
w=new Float64Array(2)
z=new V.aJ(new E.a(z),new E.a(y),new E.a(x),new E.a(w),!1,!1,new E.a(new Float64Array(2)),C.o,0)
z.b=0.01
return new V.bc(z,0,null,null,new V.D(null,null,null,null),new V.D(null,null,null,null),null,null,0,0,V.G(),0,0,0,0,0,this.d,V.G())},
$asH:function(){return[V.bc]},
$asad:function(){return[V.bc]}},
hk:{"^":"H;d,a,b,c",
a5:function(){var z,y,x,w
z=new Float64Array(2)
y=new Float64Array(2)
x=new Float64Array(2)
w=new Float64Array(2)
z=new V.aJ(new E.a(z),new E.a(y),new E.a(x),new E.a(w),!1,!1,new E.a(new Float64Array(2)),C.o,0)
z.b=0.01
return new V.bd(z,0,null,null,new V.D(null,null,null,null),new V.D(null,null,null,null),null,null,0,0,V.G(),0,0,0,0,0,this.d,V.G())},
$asH:function(){return[V.bd]},
$asad:function(){return[V.bd]}},
fn:{"^":"c;a,b,c,d,e,f,r,x,y,z,Q,ch,cx,cy,db,dx,dy,fr,fx,fy",
cn:function(a){var z,y,x,w
z=this.y
if(!z.b7(a)){y=new Array(a)
y.fixed$length=Array
x=H.e(y,[E.a])
for(w=0;w<a;++w)x[w]=new E.a(new Float64Array(2))
z.n(0,a,x)}return z.i(0,a)},
ex:function(a0,a1){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a
z=new V.hp(this,null,null,null)
z.aN(10,V.bq)
this.Q=z
z=new V.hl(this,null,null,null)
z.aN(10,V.be)
this.ch=z
z=new V.ho(this,null,null,null)
z.aN(10,V.bp)
this.cx=z
z=new V.hm(this,null,null,null)
z.aN(10,V.bj)
this.cy=z
z=new V.hn(this,null,null,null)
z.aN(10,V.bk)
this.db=z
z=new V.hj(this,null,null,null)
z.aN(10,V.bc)
this.dx=z
z=new V.hk(this,null,null,null)
z.aN(10,V.bd)
this.dy=z
z=V.aH()
y=V.aH()
x=G.t()
w=G.t()
v=V.dM()
u=new Float64Array(H.b(2))
t=new Float64Array(H.b(2))
s=new Float64Array(H.b(2))
r=G.t()
q=new Float64Array(H.b(2))
p=new Float64Array(H.b(2))
o=[V.V]
n=H.e(new Array(2),o)
m=new Float64Array(H.b(2))
l=new Float64Array(H.b(2))
k=new Float64Array(H.b(2))
j=new Float64Array(H.b(2))
i=new Float64Array(H.b(2))
h=new Float64Array(H.b(2))
g=H.e(new Array(2),o)
o=H.e(new Array(2),o)
f=new Float64Array(H.b(2))
e=new Float64Array(H.b(2))
d=new Int8Array(H.b(4))
c=new Float64Array(H.b(2))
b=new Float64Array(H.b(2))
a=V.fA()
n[0]=new V.V(new E.a(new Float64Array(H.b(2))),new V.O(new Int8Array(H.b(4))))
n[1]=new V.V(new E.a(new Float64Array(H.b(2))),new V.O(new Int8Array(H.b(4))))
g[0]=new V.V(new E.a(new Float64Array(H.b(2))),new V.O(new Int8Array(H.b(4))))
g[1]=new V.V(new E.a(new Float64Array(H.b(2))),new V.O(new Int8Array(H.b(4))))
o[0]=new V.V(new E.a(new Float64Array(H.b(2))),new V.O(new Int8Array(H.b(4))))
o[1]=new V.V(new E.a(new Float64Array(H.b(2))),new V.O(new Int8Array(H.b(4))))
this.fr=new V.fb(this,new V.cZ(z,y,x,w,!1),v,new V.d0(new E.a(u),new E.a(t),0,0),new E.a(s),r,new E.a(q),new E.a(p),new V.eo(0,0),new V.eo(0,0),n,new E.a(m),new E.a(l),new E.a(k),new E.a(j),new E.a(i),new E.a(h),g,o,new E.a(f),new E.a(e),new V.O(d),new E.a(c),new E.a(b),a)
this.fx=new V.i5(V.dM(),new V.cZ(V.aH(),V.aH(),G.t(),G.t(),!1),G.t(),G.t(),new V.d0(new E.a(new Float64Array(H.b(2))),new E.a(new Float64Array(H.b(2))),0,0),new V.hS(null,null,null,new E.a(new Float64Array(H.b(2))),new E.a(new Float64Array(H.b(2))),null,null,new E.a(new Float64Array(H.b(2))),new E.a(new Float64Array(H.b(2))),new E.a(new Float64Array(H.b(2))),new E.a(new Float64Array(H.b(2))),new E.a(new Float64Array(H.b(2))),new E.a(new Float64Array(H.b(2))),new E.a(new Float64Array(H.b(2))),new E.a(new Float64Array(H.b(2))),new E.a(new Float64Array(H.b(2))),new E.a(new Float64Array(H.b(2))),G.t(),G.t(),new E.a(new Float64Array(H.b(2))),new E.a(new Float64Array(H.b(2)))),P.au(2,0,!1,P.m),new G.ay(new E.a(new Float64Array(H.b(2))),new E.a(new Float64Array(H.b(2))),new E.a(new Float64Array(H.b(2))),0,0,0),new G.ay(new E.a(new Float64Array(H.b(2))),new E.a(new Float64Array(H.b(2))),new E.a(new Float64Array(H.b(2))),0,0,0),this)
this.z=this},
C:{
fo:function(a,b){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c
z=P.m
y=P.aW(null,null,null,z,P.fG)
x=P.aW(null,null,null,z,[P.k,P.m])
w=P.aW(null,null,null,z,[P.k,E.a])
v=E.a
u=[v]
u=new V.hz(H.e(new Array(a),u),0,a,H.e(new Array(b),u))
u.b0(a,b,v)
v=E.ae
t=[v]
t=new V.hA(H.e(new Array(a),t),0,a,H.e(new Array(b),t))
t.b0(a,b,v)
v=E.a4
s=[v]
s=new V.hw(H.e(new Array(a),s),0,a,H.e(new Array(b),s))
s.b0(a,b,v)
v=V.ag
r=[v]
r=new V.hv(H.e(new Array(a),r),0,a,H.e(new Array(b),r))
r.b0(a,b,v)
v=G.b2
q=[v]
q=new V.hy(H.e(new Array(a),q),0,a,H.e(new Array(b),q))
q.b0(a,b,v)
v=E.aj
p=[v]
p=new V.hx(H.e(new Array(a),p),0,a,H.e(new Array(b),p))
p.b0(a,b,v)
v=new V.bA(new E.a(new Float64Array(H.b(2))),new E.a(new Float64Array(H.b(2))),new E.a(new Float64Array(H.b(2))),0,0,0)
o=new V.bA(new E.a(new Float64Array(H.b(2))),new E.a(new Float64Array(H.b(2))),new E.a(new Float64Array(H.b(2))),0,0,0)
n=new V.bA(new E.a(new Float64Array(H.b(2))),new E.a(new Float64Array(H.b(2))),new E.a(new Float64Array(H.b(2))),0,0,0)
m=H.e(new Array(3),[V.bA])
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
z=new V.fn(u,t,s,p,r,q,y,x,w,null,null,null,null,null,null,null,null,null,null,new V.ft(new V.iZ(v,o,n,m,0,new E.a(l),new E.a(k),new E.a(j),new E.a(i),new E.a(h),new E.a(g),new E.a(f),new E.a(e),new E.a(d),new E.a(c)),P.au(3,0,!1,z),P.au(3,0,!1,z),new E.a(new Float64Array(H.b(2))),new E.a(new Float64Array(H.b(2))),new E.a(new Float64Array(H.b(2))),new E.a(new Float64Array(H.b(2)))))
z.ex(a,b)
return z}}},
ad:{"^":"c;$ti",
d8:function(a){var z,y,x
z=new Array(a)
z.fixed$length=Array
y=H.e(z,[H.an(this,"ad",0)])
z=this.a
if(z!=null)C.d.a7(y,0,this.c,z,0)
for(z=y.length,x=0;x<z;++x)y[x]=this.a5()
this.a=y
this.c=z},
dn:function(){var z,y
z=this.b
y=this.c
if(z>=y)this.d8(y*2)
return this.a[this.b++]},
aN:function(a,b){this.b=0
this.a=null
this.c=0
this.d8(a)}},
Q:{"^":"c;$ti",
b0:function(a,b,c){var z,y
for(z=this.a,y=0;y<a;++y)z[y]=this.a5()}}}],["","",,F,{"^":"",
eK:function(a,b,c){var z
P.cg(b,c,a.length,null,null,null)
z=P.c3(H.dQ(a,b,c,H.af(a,0)),!0,null)
C.d.bX(z,"sort")
H.b3(z,0,z.length-1,P.jn());(a&&C.d).dW(a,b,c,z)}}],["","",,N,{"^":"",f3:{"^":"fk;c,a,b",
bw:function(a,b,c){var z,y,x
this.cT(c)
for(z=J.A(a),y=this.b,x=0;x<b;++x)y.aA(z.i(a,x),z.i(a,x))
y=this.c
y.beginPath()
y.moveTo(J.T(z.i(a,0)),J.U(z.i(a,0)))
for(x=1;x<b;++x)y.lineTo(J.T(z.i(a,x)),J.U(z.i(a,x)))
y.lineTo(J.T(z.i(a,0)),J.U(z.i(a,0)))
y.closePath()},
ak:function(a,b,c){var z,y,x,w
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
y.aA(a,a)
y.aA(b,b)
z.beginPath()
y=a.a
z.moveTo(y[0],y[1])
y=b.a
z.lineTo(y[0],y[1])
z.closePath()
z.stroke()},
cT:function(a){var z,y,x,w
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
fK:function(a,b,c,d){throw H.f("Unimplemented")},
fL:function(a,b,c,d){throw H.f("Unimplemented")}}}],["","",,G,{"^":"",bR:{"^":"c;E:a>,F:b>,c",
au:function(a,b,c){this.a=C.c.a6(C.a.aL(a*255))
this.b=C.c.a6(C.a.aL(b*255))
this.c=C.c.a6(C.a.aL(c*255))}},b2:{"^":"c;a,q:b<",
D:function(a){this.a=Math.sin(a)
this.b=Math.cos(a)
return this},
m:function(a){return"Rot(s:"+H.d(this.a)+", c:"+H.d(this.b)+")"},
C:{
ax:function(a,b,c){var z,y,x,w,v
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
u[1]=-w*y[0]+z*y[1]}}},ay:{"^":"c;a,b,q:c<,d,l:e@,f",
m:function(a){return"Sweep:\nlocalCenter: "+this.a.m(0)+"\n"+("c0: "+this.b.m(0)+", c: "+this.c.m(0)+"\n")+("a0: "+H.d(this.d)+", a: "+H.d(this.e)+"\n")+("alpha0: "+H.d(this.f))},
X:function(){var z=6.283185307179586*C.k.aL(this.d/6.283185307179586)
this.d-=z
this.e-=z},
K:function(a){this.a.h(a.a)
this.b.h(a.b)
this.c.h(a.c)
this.d=a.d
this.e=a.e
this.f=a.f
return this},
az:function(a,b){var z,y,x,w,v,u
z=1-b
y=this.b.a
x=this.c.a
w=a.a.a
w[0]=z*y[0]+b*x[0]
w[1]=z*y[1]+b*x[1]
x=a.b
x.D(z*this.d+b*this.e)
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
this.f=a}},cl:{"^":"c;a"},ic:{"^":"c;a,b",
m:function(a){var z=this.b
return"XForm:\n"+("Position: "+this.a.m(0)+"\n")+("R: \t"+("Rot(s:"+H.d(z.a)+", c:"+H.d(z.b)+")")+"\n")},
C:{
t:function(){return new G.ic(new E.a(new Float64Array(H.b(2))),new G.b2(0,1))},
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
o:function(a,b,c){var z,y,x,w,v,u,t,s
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
e4:function(a,b,c){var z,y,x,w,v
z=b.a
y=a.a.a
x=z[0]-y[0]
w=z[1]-y[1]
y=a.b
z=y.a
y=y.b
v=c.a
v[0]=y*x+z*w
v[1]=-z*x+y*w},
co:function(a,b,c){var z,y,x,w,v
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
e3:function(a,b,c){var z,y,x,w,v,u,t
z=a.b
y=b.b
x=c.b
w=z.b
v=y.a
u=z.a
t=y.b
x.a=w*v-u*t
x.b=w*t+z.a*y.a
y=$.$get$cn()
y.h(b.a)
y.j(a.a)
G.W(z,$.$get$cn(),c.a)}}},ii:{"^":"c;",
aA:function(a,b){var z,y,x,w,v,u,t,s,r
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
r[1]=v-z*x+-t}}}],["","",,X,{"^":"",f4:{"^":"ii;a,b,c,d"}}],["","",,A,{"^":"",
bE:function(a){var z,y
z=C.ac.fY(a,0,new A.ju())
y=536870911&z+((67108863&z)<<3)
y^=y>>>11
return 536870911&y+((16383&y)<<15)},
ju:{"^":"l:12;",
$2:function(a,b){var z=536870911&a+J.aE(b)
z=536870911&z+((524287&z)<<10)
return z^z>>>6}}}],["","",,E,{"^":"",a4:{"^":"c;a",
bc:function(a,b,c,d){var z=this.a
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
n:function(a,b,c){this.a[b]=c},
Z:function(a,b){var z,y,x
if(b==null)return!1
if(b instanceof E.a4){z=this.a
y=z[0]
x=b.a
z=y===x[0]&&z[1]===x[1]&&z[2]===x[2]&&z[3]===x[3]}else z=!1
return z},
gW:function(a){return A.bE(this.a)},
aW:function(a){var z,y
z=new Float64Array(H.b(2))
y=this.a
z[0]=y[a]
z[1]=y[2+a]
return new E.a(z)},
A:function(a,b){var z,y,x
z=new Float64Array(H.b(4))
y=new E.a4(z)
y.h(this)
x=b.gf7()
z[0]=C.a.A(z[0],x.i(0,0))
z[1]=C.a.A(z[1],x.i(0,1))
z[2]=C.a.A(z[2],x.i(0,2))
z[3]=C.a.A(z[3],x.i(0,3))
return y},
I:function(){var z=this.a
z[0]=0
z[1]=0
z[2]=0
z[3]=0},
bz:function(){var z,y,x,w,v,u,t
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
z=a.gf7()
y=this.a
y[0]=C.a.H(y[0],z.i(0,0))
y[1]=C.a.H(y[1],z.i(0,1))
y[2]=C.a.H(y[2],z.i(0,2))
y[3]=C.a.H(y[3],z.i(0,3))},
cb:function(a,b){var z,y,x,w,v,u,t
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
C:{
dv:function(a,b,c){var z,y,x,w,v,u,t,s
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
s[1]=t*(y*v-w*u)}}},aj:{"^":"c;a",
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
n:function(a,b,c){this.a[b]=c},
Z:function(a,b){var z,y,x
if(b==null)return!1
if(b instanceof E.aj){z=this.a
y=z[0]
x=b.a
z=y===x[0]&&z[1]===x[1]&&z[2]===x[2]&&z[3]===x[3]&&z[4]===x[4]&&z[5]===x[5]&&z[6]===x[6]&&z[7]===x[7]&&z[8]===x[8]}else z=!1
return z},
gW:function(a){return A.bE(this.a)},
aW:function(a){var z,y
z=new Float64Array(H.b(3))
y=this.a
z[0]=y[a]
z[1]=y[3+a]
z[2]=y[6+a]
return new E.ae(z)},
A:function(a,b){var z,y,x
z=new Float64Array(H.b(9))
y=new E.aj(z)
y.h(this)
x=b.gf8()
z[0]=C.a.A(z[0],x.i(0,0))
z[1]=C.a.A(z[1],x.i(0,1))
z[2]=C.a.A(z[2],x.i(0,2))
z[3]=C.a.A(z[3],x.i(0,3))
z[4]=C.a.A(z[4],x.i(0,4))
z[5]=C.a.A(z[5],x.i(0,5))
z[6]=C.a.A(z[6],x.i(0,6))
z[7]=C.a.A(z[7],x.i(0,7))
z[8]=C.a.A(z[8],x.i(0,8))
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
z=a.gf8()
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
C:{
c7:function(a,b,c){var z,y,x,w,v,u,t,s,r
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
he:function(a,b,c){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j
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
ad:function(a,b){var z=this.a
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
Z:function(a,b){var z,y,x
if(b==null)return!1
if(b instanceof E.a){z=this.a
y=z[0]
x=b.a
z=y===x[0]&&z[1]===x[1]}else z=!1
return z},
gW:function(a){return A.bE(this.a)},
A:function(a,b){var z=new E.a(new Float64Array(H.b(2)))
z.h(this)
z.p(0,b)
return z},
i:function(a,b){return this.a[b]},
n:function(a,b,c){this.a[b]=c},
gG:function(a){return Math.sqrt(this.gL())},
gL:function(){var z,y
z=this.a
y=z[0]
z=z[1]
return y*y+z*z},
X:function(){var z,y,x
z=Math.sqrt(this.gL())
if(z===0)return 0
y=1/z
x=this.a
x[0]=x[0]*y
x[1]=x[1]*y
return z},
c0:function(a){var z,y,x,w,v
z=this.a
y=z[0]
x=a.a
w=y-x[0]
v=z[1]-x[1]
return w*w+v*v},
v:function(a){var z,y
z=a.a
y=this.a
return y[0]*z[0]+y[1]*z[1]},
t:function(a){var z,y
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
p:function(a,b){var z,y
z=b.a
y=this.a
y[0]=y[0]+z[0]
y[1]=y[1]+z[1]},
j:function(a){var z,y
z=a.a
y=this.a
y[0]=y[0]-z[0]
y[1]=y[1]-z[1]},
w:function(a,b){var z=this.a
z[1]=z[1]*b
z[0]=z[0]*b},
J:function(){var z=this.a
z[1]=-z[1]
z[0]=-z[0]},
sE:function(a,b){this.a[0]=b
return b},
sF:function(a,b){this.a[1]=b
return b},
gE:function(a){return this.a[0]},
gF:function(a){return this.a[1]},
C:{
ei:function(){return new E.a(new Float64Array(H.b(2)))}}},ae:{"^":"c;a",
cs:function(a,b,c){var z=this.a
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
Z:function(a,b){var z,y,x
if(b==null)return!1
if(b instanceof E.ae){z=this.a
y=z[0]
x=b.a
z=y===x[0]&&z[1]===x[1]&&z[2]===x[2]}else z=!1
return z},
gW:function(a){return A.bE(this.a)},
A:function(a,b){var z=new E.ae(new Float64Array(H.b(3)))
z.h(this)
z.p(0,b)
return z},
i:function(a,b){return this.a[b]},
n:function(a,b,c){this.a[b]=c},
gG:function(a){return Math.sqrt(this.gL())},
gL:function(){var z,y,x
z=this.a
y=z[0]
x=z[1]
z=z[2]
return y*y+x*x+z*z},
p:function(a,b){var z,y
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
w:function(a,b){var z=this.a
z[2]=z[2]*b
z[1]=z[1]*b
z[0]=z[0]*b},
J:function(){var z=this.a
z[2]=-z[2]
z[1]=-z[1]
z[0]=-z[0]},
gE:function(a){return this.a[0]},
gF:function(a){return this.a[1]}}}],["","",,O,{"^":"",
lo:[function(){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2,a3,a4,a5,a6,a7,a8,a9,b0,b1,b2,b3,b4,b5,b6,b7,b8,b9,c0,c1,c2,c3,c4,c5,c6,c7
z=[V.aU]
y=H.e([],z)
x=new Float64Array(H.b(2))
x[0]=0
x[1]=-10
w=V.fo(100,10)
v=V.fm(V.fy())
u=V.it(4,4)
t=new P.bw(0,0)
if($.B==null){H.br()
$.B=$.aw}t.bp(0)
s=new P.bw(0,0)
if($.B==null){H.br()
$.B=$.aw}s.bp(0)
r=G.t()
q=new Float64Array(H.b(2))
p=new Float64Array(H.b(2))
o=P.m
n=[P.k,E.a]
m=P.aW(null,null,null,o,n)
l=new Float64Array(H.b(2))
k=new Float64Array(H.b(2))
j=new Float64Array(H.b(2))
i=new Float64Array(H.b(2))
h=new Float64Array(H.b(2))
g=V.bh()
f=V.bh()
e=new Float64Array(H.b(2))
d=new Float64Array(H.b(2))
c=H.e(new Array(10),z)
b=new P.bw(0,0)
if($.B==null){H.br()
$.B=$.aw}b.bp(0)
a=V.bh()
a0=V.bh()
a1=new Float64Array(H.b(2))
a2=new Float64Array(H.b(2))
a3=V.aH()
a4=V.aH()
a5=new Float64Array(H.b(2))
a6=new Float64Array(H.b(2))
a7=new Float64Array(H.b(2))
a8=new Float64Array(H.b(2))
a9=new Float64Array(H.b(2))
b0=new Float64Array(H.b(2))
z=H.e(new Array(2),z)
b1=new Float64Array(H.b(2))
b2=new Float64Array(H.b(2))
b3=new Float64Array(H.b(2))
b4=new Float64Array(H.b(2))
b5=new Float64Array(H.b(2))
b6=new Float64Array(H.b(2))
b7=new Float64Array(H.b(2))
b8=new Float64Array(H.b(2))
b9=C.c.a6(C.c.aL(102))
c0=C.c.a6(C.c.aL(102))
c1=C.c.a6(C.c.aL(255))
c2=new Float64Array(H.b(2))
c3=new Float64Array(H.b(2))
c4=new Float64Array(H.b(2))
c5=new Float64Array(H.b(2))
n=P.aW(null,null,null,o,n)
o=new E.a(new Float64Array(H.b(2)))
o.h(new E.a(x))
c6=new V.io(0,null,null,null,0,0,o,!1,null,null,null,w,0,!1,!1,!1,!1,null,null,u,new V.dZ(0,0,0,0,0,!1),new G.cl(t),new G.cl(s),new G.bR(0,0,0),r,new E.a(q),new E.a(p),new V.eh(m),new V.ir(null,null),new V.is(new V.dK(new E.a(l),0),new E.a(k),new E.a(j),null,null),new V.ch(new E.a(i),new E.a(h),0),new V.de(null,null,null,null,null,null,0,0,0,0,0,0,g,new V.dN(null,null,null),new V.bi(null,null,0,null,null),f,new V.bi(null,null,0,null,null),new V.cV(e,d,0)),c,new G.cl(b),new V.de(null,null,null,null,null,null,0,0,0,0,0,0,a,new V.dN(null,null,null),new V.bi(null,null,0,null,null),a0,new V.bi(null,null,0,null,null),new V.cV(a1,a2,0)),new V.i0(a3,a4,new G.ay(new E.a(a5),new E.a(a6),new E.a(a7),0,0,0),new G.ay(new E.a(a8),new E.a(a9),new E.a(b0),0,0,0),0),new V.i1(C.P,0),new V.dZ(0,0,0,0,0,!1),z,new G.ay(new E.a(b1),new E.a(b2),new E.a(b3),0,0,0),new G.ay(new E.a(b4),new E.a(b5),new E.a(b6),0,0,0),0.12,-1,new E.a(b7),new E.a(b8),new G.bR(b9,c0,c1),new E.a(c2),new E.a(c3),new E.a(c4),new E.a(c5),new V.eh(n))
c6.cy=!0
c6.db=!0
c6.dy=!0
c6.x=!0
c6.a=4
c6.b=V.fg(c6,v)
c6.fr=new V.hL(new V.a5(0,0,17976931348623157e292,-17976931348623157e292,0),new V.a5(0,0,17976931348623157e292,-17976931348623157e292,0),new V.a5(0,0,17976931348623157e292,-17976931348623157e292,0),new V.a5(0,0,17976931348623157e292,-17976931348623157e292,0),new V.a5(0,0,17976931348623157e292,-17976931348623157e292,0),new V.a5(0,0,17976931348623157e292,-17976931348623157e292,0),new V.a5(0,0,17976931348623157e292,-17976931348623157e292,0),new V.a5(0,0,17976931348623157e292,-17976931348623157e292,0),new V.a5(0,0,17976931348623157e292,-17976931348623157e292,0),new V.a5(0,0,17976931348623157e292,-17976931348623157e292,0))
c6.fx=V.hE(c6)
c6.f1()
v=new P.bw(0,0)
if($.B==null){H.br()
$.B=$.aw}v.bp(0)
c7=new O.f1(y,c6,v,10,null,null,null,null,null,null,null,null)
c7.ey("Blob test",null,10)
c7.h1(0)
c7.h4()
z=window
C.u.cL(z)
C.u.cR(z,W.ex(c7.gcw(c7)))},"$0","eB",0,0,2],
f1:{"^":"fp;a,b,c,d,e,f,r,x,y,z,Q,ch",
h1:function(a){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j
z=V.cc()
z.dU(50,0.4)
y=new Float64Array(H.b(2))
x=new Float64Array(H.b(2))
y[0]=0
y[1]=0
w=this.b
v=w.bY(new V.bL(C.e,null,new E.a(y),0,new E.a(x),0,0,0,!0,!0,!1,!1,!0,1))
v.bZ(z)
x=new Float64Array(H.b(2))
x[0]=-10
x[1]=0
z.bF(0.4,50,new E.a(x),0)
v.bZ(z)
x=new Float64Array(H.b(2))
x[0]=10
x[1]=0
z.bF(0.4,50,new E.a(x),0)
v.bZ(z)
x=H.e([],[V.aU])
u=new V.cU(0,0,x,null,null,null,null,null,!1)
u.a=C.w
for(t=0;t<20;++t){s=0+(t-0)/20*6.283185307179586
y=new Float64Array(2)
r=new V.bL(C.e,null,new E.a(y),0,new E.a(new Float64Array(2)),0,0,0,!0,!0,!1,!1,!0,1)
r.Q=!0
q=Math.sin(s)
p=Math.cos(s)
o=new Float64Array(2)
o[0]=0+5*q
o[1]=10+5*p
y[1]=o[1]
y[0]=o[0]
r.a=C.f
n=w.bY(r)
o=new V.bY(1,65535,0)
m=new V.dc(null,null,0.2,0,0,!1,o)
l=new V.ab(new E.a(new Float64Array(2)),C.i,0)
l.b=0.5
m.a=l
m.e=1
o.c=-2
n.d3(m)
x.push(n)
y=x.length
if(y===1)u.c=n
if(y===2)u.d=n}u.f=10
u.r=1
u.e=!1
w.d5(u)
k=new V.bL(C.e,null,new E.a(new Float64Array(H.b(2))),0,new E.a(new Float64Array(H.b(2))),0,0,0,!0,!0,!1,!1,!0,1)
k.a=C.f
j=V.cc()
y=new Float64Array(H.b(2))
y[0]=0
y[1]=25
j.bF(3,1.5,new E.a(y),0)
y=new Float64Array(H.b(2))
y[0]=0
y[1]=25
k.c=new E.a(y)
w.bY(k).d4(j,1)}}},1],["","",,Q,{"^":"",fp:{"^":"c;",
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
v.a.cd(v)
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
u.at(C.c.aC((t-w.a)*1000,$.B))
u=w.b
w.a=u==null?$.v.$0():u
y.b.fp()
u=y.fr.c
t=w.b
if(t==null)t=$.v.$0()
u.at(C.c.aC((t-w.a)*1000,$.B))
if(y.dy&&v.a>0){u=w.b
w.a=u==null?$.v.$0():u
y.fx.bI(v)
u=y.fr.d
t=w.b
if(t==null)t=$.v.$0()
u.at(C.c.aC((t-w.a)*1000,$.B))
u=w.b
w.a=u==null?$.v.$0():u
y.bI(v)
u=y.fr.e
t=w.b
if(t==null)t=$.v.$0()
u.at(C.c.aC((t-w.a)*1000,$.B))}if(y.db&&v.a>0){u=w.b
w.a=u==null?$.v.$0():u
y.e9(v)
u=y.fr.z
t=w.b
if(t==null)t=$.v.$0()
u.at(C.c.aC((t-w.a)*1000,$.B))}if(v.a>0)y.cx=v.b
if((y.a&4)===4)y.fo()
y.a&=4294967293
w=y.fr.a
v=x.b
if(v==null)v=$.v.$0()
w.at(C.c.aC((v-x.a)*1000,$.B))
x=z.b
if(x==null)x=$.v.$0()
this.Q=C.c.aC((x-z.a)*1e6,$.B)
this.f.clearRect(0,0,900,600)
y.fJ()
this.y=this.y+1
y=window
C.u.cL(y)
C.u.cR(y,W.ex(this.gcw(this)))},"$1","gcw",2,0,13],
h4:function(){var z,y,x,w
z=H.n(W.iC("canvas",null),"$iscS")
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
w=new X.f4(null,z,20,w)
w.a=!0
w.c=this.d
this.r=w
w=new N.f3(this.f,2,w)
this.x=w
this.b.Q=w
this.y=0
this.z=y.querySelector("#fps-counter")
this.ch=y.querySelector("#world-step-time")
P.e1(P.d4(0,0,0,0,0,1),new Q.fq(this))
P.e1(P.d4(0,0,0,200,0,0),new Q.fr(this))},
ey:function(a,b,c){J.bI(document.querySelector("#title"),a)}},fq:{"^":"l:5;a",
$1:function(a){var z=this.a
J.bI(z.z,J.aa(z.y))
z.y=0}},fr:{"^":"l:5;a",
$1:function(a){var z,y
z=this.a
y=z.Q
if(y==null)return
J.bI(z.ch,H.d(y/1000)+" ms")}}}],["","",,O,{"^":""}]]
setupProgram(dart,0,0)
J.u=function(a){if(typeof a=="number"){if(Math.floor(a)==a)return J.dj.prototype
return J.di.prototype}if(typeof a=="string")return J.aZ.prototype
if(a==null)return J.dk.prototype
if(typeof a=="boolean")return J.h0.prototype
if(a.constructor==Array)return J.aX.prototype
if(typeof a!="object"){if(typeof a=="function")return J.b_.prototype
return a}if(a instanceof P.c)return a
return J.bD(a)}
J.A=function(a){if(typeof a=="string")return J.aZ.prototype
if(a==null)return a
if(a.constructor==Array)return J.aX.prototype
if(typeof a!="object"){if(typeof a=="function")return J.b_.prototype
return a}if(a instanceof P.c)return a
return J.bD(a)}
J.b9=function(a){if(a==null)return a
if(a.constructor==Array)return J.aX.prototype
if(typeof a!="object"){if(typeof a=="function")return J.b_.prototype
return a}if(a instanceof P.c)return a
return J.bD(a)}
J.cC=function(a){if(typeof a=="number")return J.aY.prototype
if(a==null)return a
if(!(a instanceof P.c))return J.b6.prototype
return a}
J.eD=function(a){if(typeof a=="number")return J.aY.prototype
if(typeof a=="string")return J.aZ.prototype
if(a==null)return a
if(!(a instanceof P.c))return J.b6.prototype
return a}
J.jr=function(a){if(typeof a=="string")return J.aZ.prototype
if(a==null)return a
if(!(a instanceof P.c))return J.b6.prototype
return a}
J.J=function(a){if(a==null)return a
if(typeof a!="object"){if(typeof a=="function")return J.b_.prototype
return a}if(a instanceof P.c)return a
return J.bD(a)}
J.eP=function(a,b){if(typeof a=="number"&&typeof b=="number")return a+b
return J.eD(a).A(a,b)}
J.Z=function(a,b){if(a==null)return b==null
if(typeof a!="object")return b!=null&&a===b
return J.u(a).Z(a,b)}
J.a_=function(a,b){if(typeof a=="number"&&typeof b=="number")return a>b
return J.cC(a).bE(a,b)}
J.cI=function(a,b){if(typeof a=="number"&&typeof b=="number")return a<b
return J.cC(a).a0(a,b)}
J.cJ=function(a,b){if(typeof b==="number")if(a.constructor==Array||typeof a=="string"||H.eG(a,a[init.dispatchPropertyName]))if(b>>>0===b&&b<a.length)return a[b]
return J.A(a).i(a,b)}
J.eQ=function(a,b,c){if(typeof b==="number")if((a.constructor==Array||H.eG(a,a[init.dispatchPropertyName]))&&!a.immutable$list&&b>>>0===b&&b<a.length)return a[b]=c
return J.b9(a).n(a,b,c)}
J.eR=function(a,b){return J.eD(a).b6(a,b)}
J.cK=function(a,b){return J.b9(a).al(a,b)}
J.eS=function(a){return J.J(a).gfl(a)}
J.aE=function(a){return J.u(a).gW(a)}
J.aT=function(a){return J.b9(a).ga2(a)}
J.ao=function(a){return J.A(a).gG(a)}
J.eT=function(a){return J.J(a).gbb(a)}
J.eU=function(a){return J.J(a).ghi(a)}
J.eV=function(a){return J.J(a).ghv(a)}
J.T=function(a){return J.J(a).gE(a)}
J.U=function(a){return J.J(a).gF(a)}
J.eW=function(a,b){return J.b9(a).dj(a,b)}
J.eX=function(a){return J.b9(a).ho(a)}
J.eY=function(a,b){return J.J(a).aB(a,b)}
J.cL=function(a,b){return J.J(a).sav(a,b)}
J.bI=function(a,b){return J.J(a).sdh(a,b)}
J.cM=function(a,b){return J.J(a).sbb(a,b)}
J.bJ=function(a,b){return J.J(a).sE(a,b)}
J.bK=function(a,b){return J.J(a).sF(a,b)}
J.cN=function(a){return J.cC(a).a6(a)}
J.eZ=function(a){return J.jr(a).hz(a)}
J.aa=function(a){return J.u(a).m(a)}
I.aC=function(a){a.immutable$list=Array
a.fixed$length=Array
return a}
var $=I.p
C.F=W.bM.prototype
C.T=J.h.prototype
C.d=J.aX.prototype
C.k=J.di.prototype
C.c=J.dj.prototype
C.b=J.dk.prototype
C.a=J.aY.prototype
C.v=J.aZ.prototype
C.a_=J.b_.prototype
C.ac=H.hq.prototype
C.O=J.hH.prototype
C.R=W.i2.prototype
C.E=J.b6.prototype
C.u=W.im.prototype
C.e=new V.bN(0,"BodyType.STATIC")
C.G=new V.bN(1,"BodyType.KINEMATIC")
C.f=new V.bN(2,"BodyType.DYNAMIC")
C.l=new P.iS()
C.H=new P.aI(0)
C.p=new V.bV(0,"EPAxisType.UNKNOWN")
C.q=new V.bV(1,"EPAxisType.EDGE_A")
C.I=new V.bV(2,"EPAxisType.EDGE_B")
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
C.J=function(hooks) { return hooks; }

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
C.K=function getTagFallback(o) {
  var s = Object.prototype.toString.call(o);
  return s.substring(8, s.length - 1);
}
C.a0=new V.L(0,"JointType.UNKNOWN")
C.a1=new V.L(1,"JointType.REVOLUTE")
C.a2=new V.L(10,"JointType.ROPE")
C.w=new V.L(11,"JointType.CONSTANT_VOLUME")
C.a3=new V.L(12,"JointType.MOTOR")
C.a4=new V.L(2,"JointType.PRISMATIC")
C.x=new V.L(3,"JointType.DISTANCE")
C.L=new V.L(4,"JointType.PULLEY")
C.M=new V.L(5,"JointType.MOUSE")
C.a5=new V.L(6,"JointType.GEAR")
C.a6=new V.L(7,"JointType.WHEEL")
C.a7=new V.L(8,"JointType.WELD")
C.N=new V.L(9,"JointType.FRICTION")
C.m=new V.dn(0,"LimitState.INACTIVE")
C.a8=new V.dn(2,"LimitState.AT_UPPER")
C.a9=H.e(I.aC(["*::class","*::dir","*::draggable","*::hidden","*::id","*::inert","*::itemprop","*::itemref","*::itemscope","*::lang","*::spellcheck","*::title","*::translate","A::accesskey","A::coords","A::hreflang","A::name","A::shape","A::tabindex","A::target","A::type","AREA::accesskey","AREA::alt","AREA::coords","AREA::nohref","AREA::shape","AREA::tabindex","AREA::target","AUDIO::controls","AUDIO::loop","AUDIO::mediagroup","AUDIO::muted","AUDIO::preload","BDO::dir","BODY::alink","BODY::bgcolor","BODY::link","BODY::text","BODY::vlink","BR::clear","BUTTON::accesskey","BUTTON::disabled","BUTTON::name","BUTTON::tabindex","BUTTON::type","BUTTON::value","CANVAS::height","CANVAS::width","CAPTION::align","COL::align","COL::char","COL::charoff","COL::span","COL::valign","COL::width","COLGROUP::align","COLGROUP::char","COLGROUP::charoff","COLGROUP::span","COLGROUP::valign","COLGROUP::width","COMMAND::checked","COMMAND::command","COMMAND::disabled","COMMAND::label","COMMAND::radiogroup","COMMAND::type","DATA::value","DEL::datetime","DETAILS::open","DIR::compact","DIV::align","DL::compact","FIELDSET::disabled","FONT::color","FONT::face","FONT::size","FORM::accept","FORM::autocomplete","FORM::enctype","FORM::method","FORM::name","FORM::novalidate","FORM::target","FRAME::name","H1::align","H2::align","H3::align","H4::align","H5::align","H6::align","HR::align","HR::noshade","HR::size","HR::width","HTML::version","IFRAME::align","IFRAME::frameborder","IFRAME::height","IFRAME::marginheight","IFRAME::marginwidth","IFRAME::width","IMG::align","IMG::alt","IMG::border","IMG::height","IMG::hspace","IMG::ismap","IMG::name","IMG::usemap","IMG::vspace","IMG::width","INPUT::accept","INPUT::accesskey","INPUT::align","INPUT::alt","INPUT::autocomplete","INPUT::autofocus","INPUT::checked","INPUT::disabled","INPUT::inputmode","INPUT::ismap","INPUT::list","INPUT::max","INPUT::maxlength","INPUT::min","INPUT::multiple","INPUT::name","INPUT::placeholder","INPUT::readonly","INPUT::required","INPUT::size","INPUT::step","INPUT::tabindex","INPUT::type","INPUT::usemap","INPUT::value","INS::datetime","KEYGEN::disabled","KEYGEN::keytype","KEYGEN::name","LABEL::accesskey","LABEL::for","LEGEND::accesskey","LEGEND::align","LI::type","LI::value","LINK::sizes","MAP::name","MENU::compact","MENU::label","MENU::type","METER::high","METER::low","METER::max","METER::min","METER::value","OBJECT::typemustmatch","OL::compact","OL::reversed","OL::start","OL::type","OPTGROUP::disabled","OPTGROUP::label","OPTION::disabled","OPTION::label","OPTION::selected","OPTION::value","OUTPUT::for","OUTPUT::name","P::align","PRE::width","PROGRESS::max","PROGRESS::min","PROGRESS::value","SELECT::autocomplete","SELECT::disabled","SELECT::multiple","SELECT::name","SELECT::required","SELECT::size","SELECT::tabindex","SOURCE::type","TABLE::align","TABLE::bgcolor","TABLE::border","TABLE::cellpadding","TABLE::cellspacing","TABLE::frame","TABLE::rules","TABLE::summary","TABLE::width","TBODY::align","TBODY::char","TBODY::charoff","TBODY::valign","TD::abbr","TD::align","TD::axis","TD::bgcolor","TD::char","TD::charoff","TD::colspan","TD::headers","TD::height","TD::nowrap","TD::rowspan","TD::scope","TD::valign","TD::width","TEXTAREA::accesskey","TEXTAREA::autocomplete","TEXTAREA::cols","TEXTAREA::disabled","TEXTAREA::inputmode","TEXTAREA::name","TEXTAREA::placeholder","TEXTAREA::readonly","TEXTAREA::required","TEXTAREA::rows","TEXTAREA::tabindex","TEXTAREA::wrap","TFOOT::align","TFOOT::char","TFOOT::charoff","TFOOT::valign","TH::abbr","TH::align","TH::axis","TH::bgcolor","TH::char","TH::charoff","TH::colspan","TH::headers","TH::height","TH::nowrap","TH::rowspan","TH::scope","TH::valign","TH::width","THEAD::align","THEAD::char","THEAD::charoff","THEAD::valign","TR::align","TR::bgcolor","TR::char","TR::charoff","TR::valign","TRACK::default","TRACK::kind","TRACK::label","TRACK::srclang","UL::compact","UL::type","VIDEO::controls","VIDEO::height","VIDEO::loop","VIDEO::mediagroup","VIDEO::muted","VIDEO::preload","VIDEO::width"]),[P.z])
C.aa=I.aC(["HEAD","AREA","BASE","BASEFONT","BR","COL","COLGROUP","EMBED","FRAME","FRAMESET","HR","IMAGE","IMG","INPUT","ISINDEX","LINK","META","PARAM","SOURCE","STYLE","TITLE","WBR"])
C.ab=I.aC([])
C.y=H.e(I.aC(["bind","if","ref","repeat","syntax"]),[P.z])
C.z=H.e(I.aC(["A::href","AREA::href","BLOCKQUOTE::cite","BODY::background","COMMAND::icon","DEL::cite","FORM::action","IMG::src","INPUT::src","INS::cite","Q::cite","VIDEO::poster"]),[P.z])
C.n=new V.c4(0,"ManifoldType.CIRCLES")
C.h=new V.c4(1,"ManifoldType.FACE_A")
C.r=new V.c4(2,"ManifoldType.FACE_B")
C.A=new V.ci(0,"SeparationFunctionType.POINTS")
C.B=new V.ci(1,"SeparationFunctionType.FACE_A")
C.C=new V.ci(2,"SeparationFunctionType.FACE_B")
C.i=new V.bv(0,"ShapeType.CIRCLE")
C.o=new V.bv(1,"ShapeType.EDGE")
C.j=new V.bv(2,"ShapeType.POLYGON")
C.t=new V.bv(3,"ShapeType.CHAIN")
C.P=new V.b5(0,"TOIOutputState.UNKNOWN")
C.Q=new V.b5(1,"TOIOutputState.FAILED")
C.ad=new V.b5(2,"TOIOutputState.OVERLAPPED")
C.D=new V.b5(3,"TOIOutputState.TOUCHING")
C.ae=new V.b5(4,"TOIOutputState.SEPARATED")
C.S=new V.ih(0,"VertexType.ISOLATED")
$.dF="$cachedFunction"
$.dG="$cachedInvocation"
$.aw=null
$.v=null
$.a0=0
$.aG=null
$.cQ=null
$.cE=null
$.ey=null
$.eJ=null
$.bB=null
$.bF=null
$.cF=null
$.aA=null
$.aP=null
$.aQ=null
$.cx=!1
$.R=C.l
$.d9=0
$.B=null
$.ac=null
$.bW=null
$.d7=null
$.d6=null
$.d1=0
$.d2=0
$.d3=20
$.dU=0
$.dV=0
$.dW=0
$.dY=0
$.dX=0
$.jS=1
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
I.$lazy(y,x,w)}})(["cY","$get$cY",function(){return H.eE("_$dart_dartClosure")},"c_","$get$c_",function(){return H.eE("_$dart_js")},"df","$get$df",function(){return H.fV()},"dg","$get$dg",function(){if(typeof WeakMap=="function")var z=new WeakMap()
else{z=$.d9
$.d9=z+1
z="expando$key$"+z}return new P.fE(null,z)},"e5","$get$e5",function(){return H.a7(H.bx({
toString:function(){return"$receiver$"}}))},"e6","$get$e6",function(){return H.a7(H.bx({$method$:null,
toString:function(){return"$receiver$"}}))},"e7","$get$e7",function(){return H.a7(H.bx(null))},"e8","$get$e8",function(){return H.a7(function(){var $argumentsExpr$='$arguments$'
try{null.$method$($argumentsExpr$)}catch(z){return z.message}}())},"ec","$get$ec",function(){return H.a7(H.bx(void 0))},"ed","$get$ed",function(){return H.a7(function(){var $argumentsExpr$='$arguments$'
try{(void 0).$method$($argumentsExpr$)}catch(z){return z.message}}())},"ea","$get$ea",function(){return H.a7(H.eb(null))},"e9","$get$e9",function(){return H.a7(function(){try{null.$method$}catch(z){return z.message}}())},"ef","$get$ef",function(){return H.a7(H.eb(void 0))},"ee","$get$ee",function(){return H.a7(function(){try{(void 0).$method$}catch(z){return z.message}}())},"cq","$get$cq",function(){return P.iu()},"aR","$get$aR",function(){return[]},"eq","$get$eq",function(){return P.dq(["A","ABBR","ACRONYM","ADDRESS","AREA","ARTICLE","ASIDE","AUDIO","B","BDI","BDO","BIG","BLOCKQUOTE","BR","BUTTON","CANVAS","CAPTION","CENTER","CITE","CODE","COL","COLGROUP","COMMAND","DATA","DATALIST","DD","DEL","DETAILS","DFN","DIR","DIV","DL","DT","EM","FIELDSET","FIGCAPTION","FIGURE","FONT","FOOTER","FORM","H1","H2","H3","H4","H5","H6","HEADER","HGROUP","HR","I","IFRAME","IMG","INPUT","INS","KBD","LABEL","LEGEND","LI","MAP","MARK","MENU","METER","NAV","NOBR","OL","OPTGROUP","OPTION","OUTPUT","P","PRE","PROGRESS","Q","S","SAMP","SECTION","SELECT","SMALL","SOURCE","SPAN","STRIKE","STRONG","SUB","SUMMARY","SUP","TABLE","TBODY","TD","TEXTAREA","TFOOT","TH","THEAD","TIME","TR","TRACK","TT","U","UL","VAR","VIDEO","WBR"],null)},"cu","$get$cu",function(){return P.dp()},"aq","$get$aq",function(){return E.ei()},"cn","$get$cn",function(){return E.ei()}])
I=I.$finishIsolateConstructor(I)
$=new I()
init.metadata=[]
init.types=[{func:1},{func:1,args:[,]},{func:1,v:true},{func:1,v:true,args:[{func:1,v:true}]},{func:1,ret:P.z,args:[P.m]},{func:1,args:[P.e_]},{func:1,ret:P.cz,args:[W.ar,P.z,P.z,W.ct]},{func:1,args:[,P.z]},{func:1,args:[P.z]},{func:1,args:[{func:1,v:true}]},{func:1,args:[,,]},{func:1,v:true,args:[W.q,W.q]},{func:1,args:[P.m,P.c]},{func:1,v:true,args:[P.S]},{func:1,ret:P.S},{func:1,ret:P.m,args:[P.x,P.x]},{func:1,ret:E.a},{func:1,ret:P.c},{func:1,ret:V.cb}]
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
if(x==y)H.jQ(d||a)
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
Isolate.aC=a.aC
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
if(typeof dartMainRunner==="function")dartMainRunner(function(b){H.eL(O.eB(),b)},[])
else (function(b){H.eL(O.eB(),b)})([])})})()