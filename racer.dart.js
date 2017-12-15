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
e.$callName=null}}function tearOffGetter(d,e,f,g){return g?new Function("funcs","reflectionInfo","name","H","c","return function tearOff_"+f+y+++"(x) {"+"if (c === null) c = "+"H.cQ"+"("+"this, funcs, reflectionInfo, false, [x], name);"+"return new c(this, funcs[0], x, name);"+"}")(d,e,f,H,null):new Function("funcs","reflectionInfo","name","H","c","return function tearOff_"+f+y+++"() {"+"if (c === null) c = "+"H.cQ"+"("+"this, funcs, reflectionInfo, false, [], name);"+"return new c(this, funcs[0], null, name);"+"}")(d,e,f,H,null)}function tearOff(d,e,f,a0,a1){var g
return f?function(){if(g===void 0)g=H.cQ(this,d,e,true,[],a0).prototype
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
x.push([p,o,i,h,n,j,k,m])}finishClasses(s)}I.L=function(){}
var dart=[["","",,H,{"^":"",l7:{"^":"c;a"}}],["","",,J,{"^":"",
t:function(a){return void 0},
bV:function(a,b,c,d){return{i:a,p:b,e:c,x:d}},
bR:function(a){var z,y,x,w,v
z=a[init.dispatchPropertyName]
if(z==null)if($.cT==null){H.kb()
z=a[init.dispatchPropertyName]}if(z!=null){y=z.p
if(!1===y)return z.i
if(!0===y)return a
x=Object.getPrototypeOf(a)
if(y===x)return z.i
if(z.e===x)throw H.e(new P.et("Return interceptor for "+H.d(y(a,z))))}w=a.constructor
v=w==null?null:w[$.$get$cc()]
if(v!=null)return v
v=H.kj(a)
if(v!=null)return v
if(typeof a=="function")return C.a3
y=Object.getPrototypeOf(a)
if(y==null)return C.S
if(y===Object.prototype)return C.S
if(typeof w=="function"){Object.defineProperty(w,$.$get$cc(),{value:C.F,enumerable:false,writable:true,configurable:true})
return C.F}return C.F},
h:{"^":"c;",
a1:function(a,b){return a===b},
gZ:function(a){return H.an(a)},
n:["eE",function(a){return H.bD(a)}],
"%":"Blob|CanvasGradient|CanvasPattern|CanvasRenderingContext2D|DOMError|DOMImplementation|File|FileError|MediaError|NavigatorUserMediaError|PositionError|PushMessageData|Range|SQLError|SVGAnimatedEnumeration|SVGAnimatedLength|SVGAnimatedLengthList|SVGAnimatedNumber|SVGAnimatedNumberList|SVGAnimatedString|SVGAnimatedTransformList|StorageManager"},
hj:{"^":"h;",
n:function(a){return String(a)},
gZ:function(a){return a?519018:218159},
$iscO:1},
dy:{"^":"h;",
a1:function(a,b){return null==b},
n:function(a){return"null"},
gZ:function(a){return 0}},
cd:{"^":"h;",
gZ:function(a){return 0},
n:["eG",function(a){return String(a)}],
$ishk:1},
i_:{"^":"cd;"},
bb:{"^":"cd;"},
b2:{"^":"cd;",
n:function(a){var z=a[$.$get$db()]
return z==null?this.eG(a):J.aa(z)},
$S:function(){return{func:1,opt:[,,,,,,,,,,,,,,,,]}}},
b_:{"^":"h;$ti",
cc:function(a,b){if(!!a.immutable$list)throw H.e(new P.O(b))},
fR:function(a,b){if(!!a.fixed$length)throw H.e(new P.O(b))},
dF:function(a,b){return new H.cj(a,b,[H.ag(a,0),null])},
am:function(a,b){return a[b]},
gho:function(a){if(a.length>0)return a[0]
throw H.e(H.cb())},
a9:function(a,b,c,d,e){var z,y,x,w
this.cc(a,"setRange")
P.cr(b,c,a.length,null,null,null)
z=c-b
if(z===0)return
if(e<0)H.x(P.a7(e,0,null,"skipCount",null))
if(!!J.t(d).$isl){y=e
x=d}else{d.toString
x=H.e3(d,e,null,H.ag(d,0)).bN(0,!1)
y=0}if(y+z>x.length)throw H.e(H.hg())
if(y<b)for(w=z-1;w>=0;--w)a[b+w]=x[y+w]
else for(w=0;w<z;++w)a[b+w]=x[y+w]},
ea:function(a,b,c,d){return this.a9(a,b,c,d,0)},
di:function(a,b){var z,y
z=a.length
for(y=0;y<z;++y){if(b.$1(a[y]))return!0
if(a.length!==z)throw H.e(new P.X(a))}return!1},
a6:function(a,b){var z
for(z=0;z<a.length;++z)if(J.a1(a[z],b))return!0
return!1},
n:function(a){return P.bw(a,"[","]")},
ga5:function(a){return new J.fi(a,a.length,0,null)},
gZ:function(a){return H.an(a)},
gv:function(a){return a.length},
sv:function(a,b){this.fR(a,"set length")
if(b<0)throw H.e(P.a7(b,0,null,"newLength",null))
a.length=b},
i:function(a,b){if(typeof b!=="number"||Math.floor(b)!==b)throw H.e(H.D(a,b))
if(b>=a.length||b<0)throw H.e(H.D(a,b))
return a[b]},
q:function(a,b,c){this.cc(a,"indexed set")
if(typeof b!=="number"||Math.floor(b)!==b)throw H.e(H.D(a,b))
if(b>=a.length||b<0)throw H.e(H.D(a,b))
a[b]=c},
$isI:1,
$asI:I.L,
$isi:1,
$asi:null,
$isl:1,
$asl:null,
F:{
hi:function(a,b){var z
if(typeof a!=="number"||Math.floor(a)!==a)throw H.e(P.d3(a,"length","is not an integer"))
if(a<0||a>4294967295)throw H.e(P.a7(a,0,4294967295,"length",null))
z=H.f(new Array(a),[b])
z.fixed$length=Array
return z}}},
l6:{"^":"b_;$ti"},
fi:{"^":"c;a,b,c,d",
gT:function(){return this.d},
P:function(){var z,y,x
z=this.a
y=z.length
if(this.b!==y)throw H.e(H.f3(z))
x=this.c
if(x>=y){this.d=null
return!1}this.d=z[x]
this.c=x+1
return!0}},
b0:{"^":"h;",
b7:function(a,b){var z
if(typeof b!=="number")throw H.e(H.a0(b))
if(a<b)return-1
else if(a>b)return 1
else if(a===b){if(a===0){z=this.gcj(b)
if(this.gcj(a)===z)return 0
if(this.gcj(a))return-1
return 1}return 0}else if(isNaN(a)){if(isNaN(b))return 0
return 1}else return-1},
gcj:function(a){return a===0?1/a<0:a<0},
a8:function(a){var z
if(a>=-2147483648&&a<=2147483647)return a|0
if(isFinite(a)){z=a<0?Math.ceil(a):Math.floor(a)
return z+0}throw H.e(new P.O(""+a+".toInt()"))},
aM:function(a){var z,y
if(a>=0){if(a<=2147483647)return a|0}else if(a>=-2147483648){z=a|0
return a===z?z:z-1}y=Math.floor(a)
if(isFinite(y))return y
throw H.e(new P.O(""+a+".floor()"))},
n:function(a){if(a===0&&1/a<0)return"-0.0"
else return""+a},
gZ:function(a){return a&0x1FFFFFFF},
C:function(a,b){return a+b},
H:function(a,b){if(typeof b!=="number")throw H.e(H.a0(b))
return a-b},
cu:function(a,b){return a/b},
p:function(a,b){if(typeof b!=="number")throw H.e(H.a0(b))
return a*b},
aD:function(a,b){if(typeof b!=="number")throw H.e(H.a0(b))
if((a|0)===a)if(b>=1||!1)return a/b|0
return this.df(a,b)},
aH:function(a,b){return(a|0)===a?a/b|0:this.df(a,b)},
df:function(a,b){var z=a/b
if(z>=-2147483648&&z<=2147483647)return z|0
if(z>0){if(z!==1/0)return Math.floor(z)}else if(z>-1/0)return Math.ceil(z)
throw H.e(new P.O("Result of truncating division is "+H.d(z)+": "+H.d(a)+" ~/ "+b))},
b4:function(a,b){var z
if(a>0)z=b>31?0:a>>>b
else{z=b>31?31:b
z=a>>z>>>0}return z},
cF:function(a,b){return(a|b)>>>0},
N:function(a,b){if(typeof b!=="number")throw H.e(H.a0(b))
return a<b},
bu:function(a,b){if(typeof b!=="number")throw H.e(H.a0(b))
return a>b},
$isV:1},
dx:{"^":"b0;",$ism:1,$isV:1},
dw:{"^":"b0;",$isV:1},
b1:{"^":"h;",
fb:function(a,b){if(b>=a.length)throw H.e(H.D(a,b))
return a.charCodeAt(b)},
C:function(a,b){return a+b},
ey:function(a,b,c){var z
if(c>a.length)throw H.e(P.a7(c,0,a.length,null,null))
z=c+b.length
if(z>a.length)return!1
return b===a.substring(c,z)},
ex:function(a,b){return this.ey(a,b,0)},
cO:function(a,b,c){if(c==null)c=a.length
if(b<0)throw H.e(P.bE(b,null,null))
if(b>c)throw H.e(P.bE(b,null,null))
if(c>a.length)throw H.e(P.bE(c,null,null))
return a.substring(b,c)},
eC:function(a,b){return this.cO(a,b,null)},
i8:function(a){return a.toLowerCase()},
b7:function(a,b){var z
if(typeof b!=="string")throw H.e(H.a0(b))
if(a===b)z=0
else z=a<b?-1:1
return z},
n:function(a){return a},
gZ:function(a){var z,y,x
for(z=a.length,y=0,x=0;x<z;++x){y=536870911&y+a.charCodeAt(x)
y=536870911&y+((524287&y)<<10)
y^=y>>6}y=536870911&y+((67108863&y)<<3)
y^=y>>11
return 536870911&y+((16383&y)<<15)},
gv:function(a){return a.length},
i:function(a,b){if(b>=a.length||!1)throw H.e(H.D(a,b))
return a[b]},
$isI:1,
$asI:I.L,
$isA:1}}],["","",,H,{"^":"",
cb:function(){return new P.b9("No element")},
hh:function(){return new P.b9("Too many elements")},
hg:function(){return new P.b9("Too few elements")},
b8:function(a,b,c,d){if(c-b<=32)H.ii(a,b,c,d)
else H.ih(a,b,c,d)},
ii:function(a,b,c,d){var z,y,x,w,v
for(z=b+1,y=J.B(a);z<=c;++z){x=y.i(a,z)
w=z
while(!0){if(!(w>b&&J.a2(d.$2(y.i(a,w-1),x),0)))break
v=w-1
y.q(a,w,y.i(a,v))
w=v}y.q(a,w,x)}},
ih:function(a,b,c,d){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e
z=C.b.aH(c-b+1,6)
y=b+z
x=c-z
w=C.b.aH(b+c,2)
v=w-z
u=w+z
t=J.B(a)
s=t.i(a,y)
r=t.i(a,v)
q=t.i(a,w)
p=t.i(a,u)
o=t.i(a,x)
if(J.a2(d.$2(s,r),0)){n=r
r=s
s=n}if(J.a2(d.$2(p,o),0)){n=o
o=p
p=n}if(J.a2(d.$2(s,q),0)){n=q
q=s
s=n}if(J.a2(d.$2(r,q),0)){n=q
q=r
r=n}if(J.a2(d.$2(s,p),0)){n=p
p=s
s=n}if(J.a2(d.$2(q,p),0)){n=p
p=q
q=n}if(J.a2(d.$2(r,o),0)){n=o
o=r
r=n}if(J.a2(d.$2(r,q),0)){n=q
q=r
r=n}if(J.a2(d.$2(p,o),0)){n=o
o=p
p=n}t.q(a,y,s)
t.q(a,w,q)
t.q(a,x,o)
t.q(a,v,t.i(a,b))
t.q(a,u,t.i(a,c))
m=b+1
l=c-1
if(J.a1(d.$2(r,p),0)){for(k=m;k<=l;++k){j=t.i(a,k)
i=d.$2(j,r)
if(i===0)continue
if(i<0){if(k!==m){t.q(a,k,t.i(a,m))
t.q(a,m,j)}++m}else for(;!0;){i=d.$2(t.i(a,l),r)
if(i>0){--l
continue}else{h=l-1
if(i<0){t.q(a,k,t.i(a,m))
g=m+1
t.q(a,m,t.i(a,l))
t.q(a,l,j)
l=h
m=g
break}else{t.q(a,k,t.i(a,l))
t.q(a,l,j)
l=h
break}}}}f=!0}else{for(k=m;k<=l;++k){j=t.i(a,k)
if(d.$2(j,r)<0){if(k!==m){t.q(a,k,t.i(a,m))
t.q(a,m,j)}++m}else if(d.$2(j,p)>0)for(;!0;)if(d.$2(t.i(a,l),p)>0){--l
if(l<k)break
continue}else{h=l-1
if(d.$2(t.i(a,l),r)<0){t.q(a,k,t.i(a,m))
g=m+1
t.q(a,m,t.i(a,l))
t.q(a,l,j)
m=g}else{t.q(a,k,t.i(a,l))
t.q(a,l,j)}l=h
break}}f=!1}e=m-1
t.q(a,b,t.i(a,e))
t.q(a,e,r)
e=l+1
t.q(a,c,t.i(a,e))
t.q(a,e,p)
H.b8(a,b,m-2,d)
H.b8(a,l+2,c,d)
if(f)return
if(m<y&&l>x){for(;J.a1(d.$2(t.i(a,m),r),0);)++m
for(;J.a1(d.$2(t.i(a,l),p),0);)--l
for(k=m;k<=l;++k){j=t.i(a,k)
if(d.$2(j,r)===0){if(k!==m){t.q(a,k,t.i(a,m))
t.q(a,m,j)}++m}else if(d.$2(j,p)===0)for(;!0;)if(d.$2(t.i(a,l),p)===0){--l
if(l<k)break
continue}else{h=l-1
if(d.$2(t.i(a,l),r)<0){t.q(a,k,t.i(a,m))
g=m+1
t.q(a,m,t.i(a,l))
t.q(a,l,j)
m=g}else{t.q(a,k,t.i(a,l))
t.q(a,l,j)}l=h
break}}H.b8(a,m,l,d)}else H.b8(a,m,l,d)},
i:{"^":"a4;$ti",$asi:null},
b3:{"^":"i;$ti",
ga5:function(a){return new H.dD(this,this.gv(this),0,null)},
ct:function(a,b){return this.eF(0,b)},
bN:function(a,b){var z,y
z=H.f([],[H.ap(this,"b3",0)])
C.d.sv(z,this.gv(this))
for(y=0;y<this.gv(this);++y)z[y]=this.am(0,y)
return z},
i7:function(a){return this.bN(a,!0)}},
ip:{"^":"b3;a,b,c,$ti",
gfk:function(){var z,y
z=J.aq(this.a)
y=this.c
if(y==null||y>z)return z
return y},
gfH:function(){var z,y
z=J.aq(this.a)
y=this.b
if(y>z)return z
return y},
gv:function(a){var z,y,x
z=J.aq(this.a)
y=this.b
if(y>=z)return 0
x=this.c
if(x==null||x>=z)return z-y
return x-y},
am:function(a,b){var z=this.gfH()+b
if(b<0||z>=this.gfk())throw H.e(P.aM(b,this,"index",null,null))
return J.cZ(this.a,z)},
bN:function(a,b){var z,y,x,w,v,u,t,s
z=this.b
y=this.a
x=J.B(y)
w=x.gv(y)
v=this.c
if(v!=null&&v<w)w=v
u=w-z
if(u<0)u=0
t=H.f(new Array(u),this.$ti)
for(s=0;s<u;++s){t[s]=x.am(y,z+s)
if(x.gv(y)<w)throw H.e(new P.X(this))}return t},
eZ:function(a,b,c,d){var z,y
z=this.b
if(z<0)H.x(P.a7(z,0,null,"start",null))
y=this.c
if(y!=null){if(y<0)H.x(P.a7(y,0,null,"end",null))
if(z>y)throw H.e(P.a7(z,0,y,"start",null))}},
F:{
e3:function(a,b,c,d){var z=new H.ip(a,b,c,[d])
z.eZ(a,b,c,d)
return z}}},
dD:{"^":"c;a,b,c,d",
gT:function(){return this.d},
P:function(){var z,y,x,w
z=this.a
y=J.B(z)
x=y.gv(z)
if(this.b!==x)throw H.e(new P.X(z))
w=this.c
if(w>=x){this.d=null
return!1}this.d=y.am(z,w);++this.c
return!0}},
dF:{"^":"a4;a,b,$ti",
ga5:function(a){return new H.hu(null,J.aV(this.a),this.b,this.$ti)},
gv:function(a){return J.aq(this.a)},
$asa4:function(a,b){return[b]},
F:{
ci:function(a,b,c,d){if(!!a.$isi)return new H.fU(a,b,[c,d])
return new H.dF(a,b,[c,d])}}},
fU:{"^":"dF;a,b,$ti",$isi:1,
$asi:function(a,b){return[b]}},
hu:{"^":"dv;a,b,c,$ti",
P:function(){var z=this.b
if(z.P()){this.a=this.c.$1(z.gT())
return!0}this.a=null
return!1},
gT:function(){return this.a}},
cj:{"^":"b3;a,b,$ti",
gv:function(a){return J.aq(this.a)},
am:function(a,b){return this.b.$1(J.cZ(this.a,b))},
$asi:function(a,b){return[b]},
$asb3:function(a,b){return[b]},
$asa4:function(a,b){return[b]}},
ex:{"^":"a4;a,b,$ti",
ga5:function(a){return new H.iM(J.aV(this.a),this.b,this.$ti)}},
iM:{"^":"dv;a,b,$ti",
P:function(){var z,y
for(z=this.a,y=this.b;z.P();)if(y.$1(z.gT()))return!0
return!1},
gT:function(){return this.a.gT()}},
dp:{"^":"c;$ti"}}],["","",,H,{"^":"",
bd:function(a,b){var z=a.bj(b)
if(!init.globalState.d.cy)init.globalState.f.bq()
return z},
f2:function(a,b){var z,y,x,w,v,u
z={}
z.a=b
if(b==null){b=[]
z.a=b
y=b}else y=b
if(!J.t(y).$isl)throw H.e(P.d2("Arguments to main must be a List: "+H.d(y)))
init.globalState=new H.jq(0,0,1,null,null,null,null,null,null,null,null,null,a)
y=init.globalState
x=self.window==null
w=self.Worker
v=x&&!!self.postMessage
y.x=v
v=!v
if(v)w=w!=null&&$.$get$dt()!=null
else w=!0
y.y=w
y.r=x&&v
y.f=new H.j2(P.cf(null,H.bc),0)
x=P.m
y.z=new H.av(0,null,null,null,null,null,0,[x,H.cJ])
y.ch=new H.av(0,null,null,null,null,null,0,[x,null])
if(y.x){w=new H.jp()
y.Q=w
self.onmessage=function(c,d){return function(e){c(d,e)}}(H.h9,w)
self.dartPrint=self.dartPrint||function(c){return function(d){if(self.console&&self.console.log)self.console.log(d)
else self.postMessage(c(d))}}(H.jr)}if(init.globalState.x)return
y=init.globalState.a++
w=P.Y(null,null,null,x)
v=new H.bF(0,null,!1)
u=new H.cJ(y,new H.av(0,null,null,null,null,null,0,[x,H.bF]),w,init.createNewIsolate(),v,new H.ar(H.bW()),new H.ar(H.bW()),!1,!1,[],P.Y(null,null,null,null),null,null,!1,!0,P.Y(null,null,null,null))
w.l(0,0)
u.cS(0,v)
init.globalState.e=u
init.globalState.z.q(0,y,u)
init.globalState.d=u
if(H.aU(a,{func:1,args:[P.ad]}))u.bj(new H.kp(z,a))
else if(H.aU(a,{func:1,args:[P.ad,P.ad]}))u.bj(new H.kq(z,a))
else u.bj(a)
init.globalState.f.bq()},
hd:function(){var z=init.currentScript
if(z!=null)return String(z.src)
if(init.globalState.x)return H.he()
return},
he:function(){var z,y
z=new Error().stack
if(z==null){z=function(){try{throw new Error()}catch(x){return x.stack}}()
if(z==null)throw H.e(new P.O("No stack trace"))}y=z.match(new RegExp("^ *at [^(]*\\((.*):[0-9]*:[0-9]*\\)$","m"))
if(y!=null)return y[1]
y=z.match(new RegExp("^[^@]*@(.*):[0-9]*$","m"))
if(y!=null)return y[1]
throw H.e(new P.O('Cannot extract URI from "'+z+'"'))},
h9:function(a,b){var z,y,x,w,v,u,t,s,r,q,p,o,n
z=new H.bK(!0,[]).aU(b.data)
y=J.B(z)
switch(y.i(z,"command")){case"start":init.globalState.b=y.i(z,"id")
x=y.i(z,"functionName")
w=x==null?init.globalState.cx:init.globalFunctions[x]()
v=y.i(z,"args")
u=new H.bK(!0,[]).aU(y.i(z,"msg"))
t=y.i(z,"isSpawnUri")
s=y.i(z,"startPaused")
r=new H.bK(!0,[]).aU(y.i(z,"replyTo"))
y=init.globalState.a++
q=P.m
p=P.Y(null,null,null,q)
o=new H.bF(0,null,!1)
n=new H.cJ(y,new H.av(0,null,null,null,null,null,0,[q,H.bF]),p,init.createNewIsolate(),o,new H.ar(H.bW()),new H.ar(H.bW()),!1,!1,[],P.Y(null,null,null,null),null,null,!1,!0,P.Y(null,null,null,null))
p.l(0,0)
n.cS(0,o)
init.globalState.f.a.aE(new H.bc(n,new H.ha(w,v,u,t,s,r),"worker-start"))
init.globalState.d=n
init.globalState.f.bq()
break
case"spawn-worker":break
case"message":if(y.i(z,"port")!=null)J.ff(y.i(z,"port"),y.i(z,"msg"))
init.globalState.f.bq()
break
case"close":init.globalState.ch.aX(0,$.$get$du().i(0,a))
a.terminate()
init.globalState.f.bq()
break
case"log":H.h8(y.i(z,"msg"))
break
case"print":if(init.globalState.x){y=init.globalState.Q
q=P.aN(["command","print","msg",z])
q=new H.ay(!0,P.aQ(null,P.m)).an(q)
y.toString
self.postMessage(q)}else P.cV(y.i(z,"msg"))
break
case"error":throw H.e(y.i(z,"msg"))}},
h8:function(a){var z,y,x,w
if(init.globalState.x){y=init.globalState.Q
x=P.aN(["command","log","msg",a])
x=new H.ay(!0,P.aQ(null,P.m)).an(x)
y.toString
self.postMessage(x)}else try{self.console.log(a)}catch(w){H.G(w)
z=H.af(w)
y=P.bs(z)
throw H.e(y)}},
hb:function(a,b,c,d,e,f){var z,y,x,w
z=init.globalState.d
y=z.a
$.dR=$.dR+("_"+y)
$.dS=$.dS+("_"+y)
y=z.e
x=init.globalState.d.a
w=z.f
f.aC(0,["spawned",new H.bM(y,x),w,z.r])
x=new H.hc(a,b,c,d,z)
if(e){z.dh(w,w)
init.globalState.f.a.aE(new H.bc(z,x,"start isolate"))}else x.$0()},
jI:function(a){return new H.bK(!0,[]).aU(new H.ay(!1,P.aQ(null,P.m)).an(a))},
kp:{"^":"k:0;a,b",
$0:function(){this.b.$1(this.a.a)}},
kq:{"^":"k:0;a,b",
$0:function(){this.b.$2(this.a.a,null)}},
jq:{"^":"c;a,b,c,d,e,f,r,x,y,z,Q,ch,cx",F:{
jr:function(a){var z=P.aN(["command","print","msg",a])
return new H.ay(!0,P.aQ(null,P.m)).an(z)}}},
cJ:{"^":"c;a,b,c,hC:d<,h1:e<,f,r,x,y,z,Q,ch,cx,cy,db,dx",
dh:function(a,b){if(!this.f.a1(0,a))return
if(this.Q.l(0,b)&&!this.y)this.y=!0
this.c9()},
hY:function(a){var z,y,x,w,v
if(!this.y)return
z=this.Q
z.aX(0,a)
if(z.a===0){for(z=this.z;z.length!==0;){y=z.pop()
x=init.globalState.f.a
w=x.b
v=x.a
w=(w-1&v.length-1)>>>0
x.b=w
v[w]=y
if(w===x.c)x.d5();++x.d}this.y=!1}this.c9()},
fL:function(a,b){var z,y,x
if(this.ch==null)this.ch=[]
for(z=J.t(a),y=0;x=this.ch,y<x.length;y+=2)if(z.a1(a,x[y])){this.ch[y+1]=b
return}x.push(a)
this.ch.push(b)},
hX:function(a){var z,y,x
if(this.ch==null)return
for(z=J.t(a),y=0;x=this.ch,y<x.length;y+=2)if(z.a1(a,x[y])){z=this.ch
x=y+2
z.toString
if(typeof z!=="object"||z===null||!!z.fixed$length)H.x(new P.O("removeRange"))
P.cr(y,x,z.length,null,null,null)
z.splice(y,x-y)
return}},
e9:function(a,b){if(!this.r.a1(0,a))return
this.db=b},
hu:function(a,b,c){var z
if(b!==0)z=b===1&&!this.cy
else z=!0
if(z){a.aC(0,c)
return}z=this.cx
if(z==null){z=P.cf(null,null)
this.cx=z}z.aE(new H.jk(a,c))},
ht:function(a,b){var z
if(!this.r.a1(0,a))return
if(b!==0)z=b===1&&!this.cy
else z=!0
if(z){this.cm()
return}z=this.cx
if(z==null){z=P.cf(null,null)
this.cx=z}z.aE(this.ghE())},
hv:function(a,b){var z,y,x
z=this.dx
if(z.a===0){if(this.db&&this===init.globalState.e)return
if(self.console&&self.console.error)self.console.error(a,b)
else{P.cV(a)
if(b!=null)P.cV(b)}return}y=new Array(2)
y.fixed$length=Array
y[0]=J.aa(a)
y[1]=b==null?null:b.n(0)
for(x=new P.eF(z,z.r,null,null),x.c=z.e;x.P();)x.d.aC(0,y)},
bj:function(a){var z,y,x,w,v,u,t
z=init.globalState.d
init.globalState.d=this
$=this.d
y=null
x=this.cy
this.cy=!0
try{y=a.$0()}catch(u){w=H.G(u)
v=H.af(u)
this.hv(w,v)
if(this.db){this.cm()
if(this===init.globalState.e)throw u}}finally{this.cy=x
init.globalState.d=z
if(z!=null)$=z.ghC()
if(this.cx!=null)for(;t=this.cx,!t.gbn(t);)this.cx.dK().$0()}return y},
dE:function(a){return this.b.i(0,a)},
cS:function(a,b){var z=this.b
if(z.b8(a))throw H.e(P.bs("Registry: ports must be registered only once."))
z.q(0,a,b)},
c9:function(){var z=this.b
if(z.gv(z)-this.c.a>0||this.y||!this.x)init.globalState.z.q(0,this.a,this)
else this.cm()},
cm:[function(){var z,y,x
z=this.cx
if(z!=null)z.b6(0)
for(z=this.b,y=z.gdR(z),y=y.ga5(y);y.P();)y.gT().fa()
z.b6(0)
this.c.b6(0)
init.globalState.z.aX(0,this.a)
this.dx.b6(0)
if(this.ch!=null){for(x=0;z=this.ch,x<z.length;x+=2)z[x].aC(0,z[x+1])
this.ch=null}},"$0","ghE",0,0,2]},
jk:{"^":"k:2;a,b",
$0:function(){this.a.aC(0,this.b)}},
j2:{"^":"c;a,b",
h5:function(){var z=this.a
if(z.b===z.c)return
return z.dK()},
dN:function(){var z,y,x
z=this.h5()
if(z==null){if(init.globalState.e!=null)if(init.globalState.z.b8(init.globalState.e.a))if(init.globalState.r){y=init.globalState.e.b
y=y.gbn(y)}else y=!1
else y=!1
else y=!1
if(y)H.x(P.bs("Program exited with open ReceivePorts."))
y=init.globalState
if(y.x){x=y.z
x=x.gbn(x)&&y.f.b===0}else x=!1
if(x){y=y.Q
x=P.aN(["command","close"])
x=new H.ay(!0,new P.eG(0,null,null,null,null,null,0,[null,P.m])).an(x)
y.toString
self.postMessage(x)}return!1}z.hQ()
return!0},
dc:function(){if(self.window!=null)new H.j3(this).$0()
else for(;this.dN(););},
bq:function(){var z,y,x,w,v
if(!init.globalState.x)this.dc()
else try{this.dc()}catch(x){z=H.G(x)
y=H.af(x)
w=init.globalState.Q
v=P.aN(["command","error","msg",H.d(z)+"\n"+H.d(y)])
v=new H.ay(!0,P.aQ(null,P.m)).an(v)
w.toString
self.postMessage(v)}}},
j3:{"^":"k:2;a",
$0:function(){if(!this.a.dN())return
P.iB(C.I,this)}},
bc:{"^":"c;a,b,c",
hQ:function(){var z=this.a
if(z.y){z.z.push(this)
return}z.bj(this.b)}},
jp:{"^":"c;"},
ha:{"^":"k:0;a,b,c,d,e,f",
$0:function(){H.hb(this.a,this.b,this.c,this.d,this.e,this.f)}},
hc:{"^":"k:2;a,b,c,d,e",
$0:function(){var z,y
z=this.e
z.x=!0
if(!this.d)this.a.$1(this.c)
else{y=this.a
if(H.aU(y,{func:1,args:[P.ad,P.ad]}))y.$2(this.b,this.c)
else if(H.aU(y,{func:1,args:[P.ad]}))y.$1(this.b)
else y.$0()}z.c9()}},
ez:{"^":"c;"},
bM:{"^":"ez;b,a",
aC:function(a,b){var z,y,x
z=init.globalState.z.i(0,this.a)
if(z==null)return
y=this.b
if(y.c)return
x=H.jI(b)
if(z.gh1()===y){y=J.B(x)
switch(y.i(x,0)){case"pause":z.dh(y.i(x,1),y.i(x,2))
break
case"resume":z.hY(y.i(x,1))
break
case"add-ondone":z.fL(y.i(x,1),y.i(x,2))
break
case"remove-ondone":z.hX(y.i(x,1))
break
case"set-errors-fatal":z.e9(y.i(x,1),y.i(x,2))
break
case"ping":z.hu(y.i(x,1),y.i(x,2),y.i(x,3))
break
case"kill":z.ht(y.i(x,1),y.i(x,2))
break
case"getErrors":y=y.i(x,1)
z.dx.l(0,y)
break
case"stopErrors":y=y.i(x,1)
z.dx.aX(0,y)
break}return}init.globalState.f.a.aE(new H.bc(z,new H.js(this,x),"receive"))},
a1:function(a,b){var z,y
if(b==null)return!1
if(b instanceof H.bM){z=this.b
y=b.b
y=z==null?y==null:z===y
z=y}else z=!1
return z},
gZ:function(a){return this.b.a}},
js:{"^":"k:0;a,b",
$0:function(){var z=this.a.b
if(!z.c)z.f7(this.b)}},
cK:{"^":"ez;b,c,a",
aC:function(a,b){var z,y,x
z=P.aN(["command","message","port",this,"msg",b])
y=new H.ay(!0,P.aQ(null,P.m)).an(z)
if(init.globalState.x){init.globalState.Q.toString
self.postMessage(y)}else{x=init.globalState.ch.i(0,this.b)
if(x!=null)x.postMessage(y)}},
a1:function(a,b){var z,y
if(b==null)return!1
if(b instanceof H.cK){z=this.b
y=b.b
if(z==null?y==null:z===y){z=this.a
y=b.a
if(z==null?y==null:z===y){z=this.c
y=b.c
y=z==null?y==null:z===y
z=y}else z=!1}else z=!1}else z=!1
return z},
gZ:function(a){return(this.b<<16^this.a<<8^this.c)>>>0}},
bF:{"^":"c;a,b,c",
fa:function(){this.c=!0
this.b=null},
f7:function(a){if(this.c)return
this.b.$1(a)},
$isi6:1},
ee:{"^":"c;a,b,c",
f0:function(a,b){var z,y
if(a===0)z=self.setTimeout==null||init.globalState.x
else z=!1
if(z){this.c=1
z=init.globalState.f
y=init.globalState.d
z.a.aE(new H.bc(y,new H.iz(this,b),"timer"))
this.b=!0}else if(self.setTimeout!=null){++init.globalState.f.b
this.c=self.setTimeout(H.aB(new H.iA(this,b),0),a)}else throw H.e(new P.O("Timer greater than 0."))},
f1:function(a,b){if(self.setTimeout!=null){++init.globalState.f.b
this.c=self.setInterval(H.aB(new H.iy(this,b),0),a)}else throw H.e(new P.O("Periodic timer."))},
F:{
iw:function(a,b){var z=new H.ee(!0,!1,null)
z.f0(a,b)
return z},
ix:function(a,b){var z=new H.ee(!1,!1,null)
z.f1(a,b)
return z}}},
iz:{"^":"k:2;a,b",
$0:function(){this.a.c=null
this.b.$0()}},
iA:{"^":"k:2;a,b",
$0:function(){this.a.c=null;--init.globalState.f.b
this.b.$0()}},
iy:{"^":"k:0;a,b",
$0:function(){this.b.$1(this.a)}},
ar:{"^":"c;a",
gZ:function(a){var z=this.a
z=C.b.b4(z,0)^C.b.aH(z,4294967296)
z=(~z>>>0)+(z<<15>>>0)&4294967295
z=((z^z>>>12)>>>0)*5&4294967295
z=((z^z>>>4)>>>0)*2057&4294967295
return(z^z>>>16)>>>0},
a1:function(a,b){var z,y
if(b==null)return!1
if(b===this)return!0
if(b instanceof H.ar){z=this.a
y=b.a
return z==null?y==null:z===y}return!1}},
ay:{"^":"c;a,b",
an:[function(a){var z,y,x,w,v
if(a==null||typeof a==="string"||typeof a==="number"||typeof a==="boolean")return a
z=this.b
y=z.i(0,a)
if(y!=null)return["ref",y]
z.q(0,a,z.gv(z))
z=J.t(a)
if(!!z.$isdI)return["buffer",a]
if(!!z.$iscm)return["typed",a]
if(!!z.$isI)return this.e5(a)
if(!!z.$ish7){x=this.ge2()
w=a.gb9()
w=H.ci(w,x,H.ap(w,"a4",0),null)
w=P.cg(w,!0,H.ap(w,"a4",0))
z=z.gdR(a)
z=H.ci(z,x,H.ap(z,"a4",0),null)
return["map",w,P.cg(z,!0,H.ap(z,"a4",0))]}if(!!z.$ishk)return this.e6(a)
if(!!z.$ish)this.dQ(a)
if(!!z.$isi6)this.br(a,"RawReceivePorts can't be transmitted:")
if(!!z.$isbM)return this.e7(a)
if(!!z.$iscK)return this.e8(a)
if(!!z.$isk){v=a.$static_name
if(v==null)this.br(a,"Closures can't be transmitted:")
return["function",v]}if(!!z.$isar)return["capability",a.a]
if(!(a instanceof P.c))this.dQ(a)
return["dart",init.classIdExtractor(a),this.e4(init.classFieldsExtractor(a))]},"$1","ge2",2,0,1],
br:function(a,b){throw H.e(new P.O((b==null?"Can't transmit:":b)+" "+H.d(a)))},
dQ:function(a){return this.br(a,null)},
e5:function(a){var z=this.e3(a)
if(!!a.fixed$length)return["fixed",z]
if(!a.fixed$length)return["extendable",z]
if(!a.immutable$list)return["mutable",z]
if(a.constructor===Array)return["const",z]
this.br(a,"Can't serialize indexable: ")},
e3:function(a){var z,y
z=[]
C.d.sv(z,a.length)
for(y=0;y<a.length;++y)z[y]=this.an(a[y])
return z},
e4:function(a){var z
for(z=0;z<a.length;++z)C.d.q(a,z,this.an(a[z]))
return a},
e6:function(a){var z,y,x
if(!!a.constructor&&a.constructor!==Object)this.br(a,"Only plain JS Objects are supported:")
z=Object.keys(a)
y=[]
C.d.sv(y,z.length)
for(x=0;x<z.length;++x)y[x]=this.an(a[z[x]])
return["js-object",z,y]},
e8:function(a){if(this.a)return["sendport",a.b,a.a,a.c]
return["raw sendport",a]},
e7:function(a){if(this.a)return["sendport",init.globalState.b,a.a,a.b.a]
return["raw sendport",a]}},
bK:{"^":"c;a,b",
aU:[function(a){var z,y,x,w,v
if(a==null||typeof a==="string"||typeof a==="number"||typeof a==="boolean")return a
if(typeof a!=="object"||a===null||a.constructor!==Array)throw H.e(P.d2("Bad serialized message: "+H.d(a)))
switch(C.d.gho(a)){case"ref":return this.b[a[1]]
case"buffer":z=a[1]
this.b.push(z)
return z
case"typed":z=a[1]
this.b.push(z)
return z
case"fixed":z=a[1]
this.b.push(z)
y=H.f(this.bh(z),[null])
y.fixed$length=Array
return y
case"extendable":z=a[1]
this.b.push(z)
return H.f(this.bh(z),[null])
case"mutable":z=a[1]
this.b.push(z)
return this.bh(z)
case"const":z=a[1]
this.b.push(z)
y=H.f(this.bh(z),[null])
y.fixed$length=Array
return y
case"map":return this.h8(a)
case"sendport":return this.h9(a)
case"raw sendport":z=a[1]
this.b.push(z)
return z
case"js-object":return this.h7(a)
case"function":z=init.globalFunctions[a[1]]()
this.b.push(z)
return z
case"capability":return new H.ar(a[1])
case"dart":x=a[1]
w=a[2]
v=init.instanceFromClassId(x)
this.b.push(v)
this.bh(w)
return init.initializeEmptyInstance(x,v,w)
default:throw H.e("couldn't deserialize: "+H.d(a))}},"$1","gh6",2,0,1],
bh:function(a){var z
for(z=0;z<a.length;++z)C.d.q(a,z,this.aU(a[z]))
return a},
h8:function(a){var z,y,x,w,v
z=a[1]
y=a[2]
x=P.dA()
this.b.push(x)
z=J.fd(z,this.gh6()).i7(0)
for(w=J.B(y),v=0;v<z.length;++v)x.q(0,z[v],this.aU(w.i(y,v)))
return x},
h9:function(a){var z,y,x,w,v,u,t
z=a[1]
y=a[2]
x=a[3]
w=init.globalState.b
if(z==null?w==null:z===w){v=init.globalState.z.i(0,y)
if(v==null)return
u=v.dE(x)
if(u==null)return
t=new H.bM(u,y)}else t=new H.cK(z,x,y)
this.b.push(t)
return t},
h7:function(a){var z,y,x,w,v,u
z=a[1]
y=a[2]
x={}
this.b.push(x)
for(w=J.B(z),v=J.B(y),u=0;u<w.gv(z);++u)x[w.i(z,u)]=this.aU(v.i(y,u))
return x}}}],["","",,H,{"^":"",
k3:function(a){return init.types[a]},
eX:function(a,b){var z
if(b!=null){z=b.x
if(z!=null)return z}return!!J.t(a).$isT},
d:function(a){var z
if(typeof a==="string")return a
if(typeof a==="number"){if(a!==0)return""+a}else if(!0===a)return"true"
else if(!1===a)return"false"
else if(a==null)return"null"
z=J.aa(a)
if(typeof z!=="string")throw H.e(H.a0(a))
return z},
an:function(a){var z=a.$identityHash
if(z==null){z=Math.random()*0x3fffffff|0
a.$identityHash=z}return z},
cq:function(a){var z,y,x,w,v,u,t,s
z=J.t(a)
y=z.constructor
if(typeof y=="function"){x=y.name
w=typeof x==="string"?x:null}else w=null
if(w==null||z===C.X||!!J.t(a).$isbb){v=C.L(a)
if(v==="Object"){u=a.constructor
if(typeof u=="function"){t=String(u).match(/^\s*function\s*([\w$]*)\s*\(/)
s=t==null?null:t[1]
if(typeof s==="string"&&/^\w+$/.test(s))w=s}if(w==null)w=v}else w=v}w=w
if(w.length>1&&C.x.fb(w,0)===36)w=C.x.eC(w,1)
return function(b,c){return b.replace(/[^<,> ]+/g,function(d){return c[d]||d})}(w+H.eY(H.bS(a),0,null),init.mangledGlobalNames)},
bD:function(a){return"Instance of '"+H.cq(a)+"'"},
lu:[function(){return Date.now()},"$0","jM",0,0,17],
bC:function(){var z,y
if($.aw!=null)return
$.aw=1000
$.w=H.jM()
if(typeof window=="undefined")return
z=window
if(z==null)return
y=z.performance
if(y==null)return
if(typeof y.now!="function")return
$.aw=1e6
$.w=new H.i2(y)},
cp:function(a,b){if(a==null||typeof a==="boolean"||typeof a==="number"||typeof a==="string")throw H.e(H.a0(a))
return a[b]},
dT:function(a,b,c){if(a==null||typeof a==="boolean"||typeof a==="number"||typeof a==="string")throw H.e(H.a0(a))
a[b]=c},
D:function(a,b){var z
if(typeof b!=="number"||Math.floor(b)!==b)return new P.ai(!0,b,"index",null)
z=J.aq(a)
if(b<0||b>=z)return P.aM(b,a,"index",null,z)
return P.bE(b,"index",null)},
a0:function(a){return new P.ai(!0,a,null,null)},
eS:function(a){if(typeof a!=="number")throw H.e(H.a0(a))
return a},
e:function(a){var z
if(a==null)a=new P.dQ()
z=new Error()
z.dartException=a
if("defineProperty" in Object){Object.defineProperty(z,"message",{get:H.f4})
z.name=""}else z.toString=H.f4
return z},
f4:function(){return J.aa(this.dartException)},
x:function(a){throw H.e(a)},
f3:function(a){throw H.e(new P.X(a))},
G:function(a){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l
z=new H.ks(a)
if(a==null)return
if(typeof a!=="object")return a
if("dartException" in a)return z.$1(a.dartException)
else if(!("message" in a))return a
y=a.message
if("number" in a&&typeof a.number=="number"){x=a.number
w=x&65535
if((C.b.b4(x,16)&8191)===10)switch(w){case 438:return z.$1(H.ce(H.d(y)+" (Error "+w+")",null))
case 445:case 5007:v=H.d(y)+" (Error "+w+")"
return z.$1(new H.dP(v,null))}}if(a instanceof TypeError){u=$.$get$ei()
t=$.$get$ej()
s=$.$get$ek()
r=$.$get$el()
q=$.$get$ep()
p=$.$get$eq()
o=$.$get$en()
$.$get$em()
n=$.$get$es()
m=$.$get$er()
l=u.at(y)
if(l!=null)return z.$1(H.ce(y,l))
else{l=t.at(y)
if(l!=null){l.method="call"
return z.$1(H.ce(y,l))}else{l=s.at(y)
if(l==null){l=r.at(y)
if(l==null){l=q.at(y)
if(l==null){l=p.at(y)
if(l==null){l=o.at(y)
if(l==null){l=r.at(y)
if(l==null){l=n.at(y)
if(l==null){l=m.at(y)
v=l!=null}else v=!0}else v=!0}else v=!0}else v=!0}else v=!0}else v=!0}else v=!0
if(v)return z.$1(new H.dP(y,l==null?null:l.method))}}return z.$1(new H.iG(typeof y==="string"?y:""))}if(a instanceof RangeError){if(typeof y==="string"&&y.indexOf("call stack")!==-1)return new P.e1()
y=function(b){try{return String(b)}catch(k){}return null}(a)
return z.$1(new P.ai(!1,null,null,typeof y==="string"?y.replace(/^RangeError:\s*/,""):y))}if(typeof InternalError=="function"&&a instanceof InternalError)if(typeof y==="string"&&y==="too much recursion")return new P.e1()
return a},
af:function(a){var z
if(a==null)return new H.eH(a,null)
z=a.$cachedTrace
if(z!=null)return z
return a.$cachedTrace=new H.eH(a,null)},
kl:function(a){if(a==null||typeof a!='object')return J.aE(a)
else return H.an(a)},
k0:function(a,b){var z,y,x,w
z=a.length
for(y=0;y<z;y=w){x=y+1
w=x+1
b.q(0,a[y],a[x])}return b},
kd:function(a,b,c,d,e,f,g){switch(c){case 0:return H.bd(b,new H.ke(a))
case 1:return H.bd(b,new H.kf(a,d))
case 2:return H.bd(b,new H.kg(a,d,e))
case 3:return H.bd(b,new H.kh(a,d,e,f))
case 4:return H.bd(b,new H.ki(a,d,e,f,g))}throw H.e(P.bs("Unsupported number of arguments for wrapped closure"))},
aB:function(a,b){var z
if(a==null)return
z=a.$identity
if(!!z)return z
z=function(c,d,e,f){return function(g,h,i,j){return f(c,e,d,g,h,i,j)}}(a,b,init.globalState.d,H.kd)
a.$identity=z
return z},
fs:function(a,b,c,d,e,f){var z,y,x,w,v,u,t,s,r,q,p,o,n,m
z=b[0]
y=z.$callName
if(!!J.t(c).$isl){z.$reflectionInfo=c
x=H.i8(z).r}else x=c
w=d?Object.create(new H.ij().constructor.prototype):Object.create(new H.c1(null,null,null,null).constructor.prototype)
w.$initialize=w.constructor
if(d)v=function(){this.$initialize()}
else{u=$.a3
$.a3=u+1
u=new Function("a,b,c,d"+u,"this.$initialize(a,b,c,d"+u+")")
v=u}w.constructor=v
v.prototype=w
if(!d){t=e.length==1&&!0
s=H.d7(a,z,t)
s.$reflectionInfo=c}else{w.$static_name=f
s=z
t=!1}if(typeof x=="number")r=function(g,h){return function(){return g(h)}}(H.k3,x)
else if(typeof x=="function")if(d)r=x
else{q=t?H.d5:H.c2
r=function(g,h){return function(){return g.apply({$receiver:h(this)},arguments)}}(x,q)}else throw H.e("Error in reflectionInfo.")
w.$S=r
w[y]=s
for(u=b.length,p=1;p<u;++p){o=b[p]
n=o.$callName
if(n!=null){m=d?o:H.d7(a,o,t)
w[n]=m}}w["call*"]=s
w.$R=z.$R
w.$D=z.$D
return v},
fp:function(a,b,c,d){var z=H.c2
switch(b?-1:a){case 0:return function(e,f){return function(){return f(this)[e]()}}(c,z)
case 1:return function(e,f){return function(g){return f(this)[e](g)}}(c,z)
case 2:return function(e,f){return function(g,h){return f(this)[e](g,h)}}(c,z)
case 3:return function(e,f){return function(g,h,i){return f(this)[e](g,h,i)}}(c,z)
case 4:return function(e,f){return function(g,h,i,j){return f(this)[e](g,h,i,j)}}(c,z)
case 5:return function(e,f){return function(g,h,i,j,k){return f(this)[e](g,h,i,j,k)}}(c,z)
default:return function(e,f){return function(){return e.apply(f(this),arguments)}}(d,z)}},
d7:function(a,b,c){var z,y,x,w,v,u,t
if(c)return H.fr(a,b)
z=b.$stubName
y=b.length
x=a[z]
w=b==null?x==null:b===x
v=!w||y>=27
if(v)return H.fp(y,!w,z,b)
if(y===0){w=$.a3
$.a3=w+1
u="self"+H.d(w)
w="return function(){var "+u+" = this."
v=$.aG
if(v==null){v=H.bi("self")
$.aG=v}return new Function(w+H.d(v)+";return "+u+"."+H.d(z)+"();}")()}t="abcdefghijklmnopqrstuvwxyz".split("").splice(0,y).join(",")
w=$.a3
$.a3=w+1
t+=H.d(w)
w="return function("+t+"){return this."
v=$.aG
if(v==null){v=H.bi("self")
$.aG=v}return new Function(w+H.d(v)+"."+H.d(z)+"("+t+");}")()},
fq:function(a,b,c,d){var z,y
z=H.c2
y=H.d5
switch(b?-1:a){case 0:throw H.e(new H.ia("Intercepted function with no arguments."))
case 1:return function(e,f,g){return function(){return f(this)[e](g(this))}}(c,z,y)
case 2:return function(e,f,g){return function(h){return f(this)[e](g(this),h)}}(c,z,y)
case 3:return function(e,f,g){return function(h,i){return f(this)[e](g(this),h,i)}}(c,z,y)
case 4:return function(e,f,g){return function(h,i,j){return f(this)[e](g(this),h,i,j)}}(c,z,y)
case 5:return function(e,f,g){return function(h,i,j,k){return f(this)[e](g(this),h,i,j,k)}}(c,z,y)
case 6:return function(e,f,g){return function(h,i,j,k,l){return f(this)[e](g(this),h,i,j,k,l)}}(c,z,y)
default:return function(e,f,g,h){return function(){h=[g(this)]
Array.prototype.push.apply(h,arguments)
return e.apply(f(this),h)}}(d,z,y)}},
fr:function(a,b){var z,y,x,w,v,u,t,s
z=H.fj()
y=$.d4
if(y==null){y=H.bi("receiver")
$.d4=y}x=b.$stubName
w=b.length
v=a[x]
u=b==null?v==null:b===v
t=!u||w>=28
if(t)return H.fq(w,!u,x,b)
if(w===1){y="return function(){return this."+H.d(z)+"."+H.d(x)+"(this."+H.d(y)+");"
u=$.a3
$.a3=u+1
return new Function(y+H.d(u)+"}")()}s="abcdefghijklmnopqrstuvwxyz".split("").splice(0,w-1).join(",")
y="return function("+s+"){return this."+H.d(z)+"."+H.d(x)+"(this."+H.d(y)+", "+s+");"
u=$.a3
$.a3=u+1
return new Function(y+H.d(u)+"}")()},
cQ:function(a,b,c,d,e,f){var z
b.fixed$length=Array
if(!!J.t(c).$isl){c.fixed$length=Array
z=c}else z=c
return H.fs(a,b,z,!!d,e,f)},
kn:function(a,b){var z=J.B(b)
throw H.e(H.fo(H.cq(a),z.cO(b,3,z.gv(b))))},
p:function(a,b){var z
if(a!=null)z=(typeof a==="object"||typeof a==="function")&&J.t(a)[b]
else z=!0
if(z)return a
H.kn(a,b)},
jZ:function(a){var z=J.t(a)
return"$S" in z?z.$S():null},
aU:function(a,b){var z
if(a==null)return!1
z=H.jZ(a)
return z==null?!1:H.eW(z,b)},
kr:function(a){throw H.e(new P.fB(a))},
bW:function(){return(Math.random()*0x100000000>>>0)+(Math.random()*0x100000000>>>0)*4294967296},
eV:function(a){return init.getIsolateTag(a)},
f:function(a,b){a.$ti=b
return a},
bS:function(a){if(a==null)return
return a.$ti},
k2:function(a,b){return H.cW(a["$as"+H.d(b)],H.bS(a))},
ap:function(a,b,c){var z=H.k2(a,b)
return z==null?null:z[c]},
ag:function(a,b){var z=H.bS(a)
return z==null?null:z[b]},
aD:function(a,b){var z
if(a==null)return"dynamic"
if(typeof a==="object"&&a!==null&&a.constructor===Array)return a[0].builtin$cls+H.eY(a,1,b)
if(typeof a=="function")return a.builtin$cls
if(typeof a==="number"&&Math.floor(a)===a)return H.d(a)
if(typeof a.func!="undefined"){z=a.typedef
if(z!=null)return H.aD(z,b)
return H.jK(a,b)}return"unknown-reified-type"},
jK:function(a,b){var z,y,x,w,v,u,t,s,r,q,p
z=!!a.v?"void":H.aD(a.ret,b)
if("args" in a){y=a.args
for(x=y.length,w="",v="",u=0;u<x;++u,v=", "){t=y[u]
w=w+v+H.aD(t,b)}}else{w=""
v=""}if("opt" in a){s=a.opt
w+=v+"["
for(x=s.length,v="",u=0;u<x;++u,v=", "){t=s[u]
w=w+v+H.aD(t,b)}w+="]"}if("named" in a){r=a.named
w+=v+"{"
for(x=H.k_(r),q=x.length,v="",u=0;u<q;++u,v=", "){p=x[u]
w=w+v+H.aD(r[p],b)+(" "+H.d(p))}w+="}"}return"("+w+") => "+z},
eY:function(a,b,c){var z,y,x,w,v,u
if(a==null)return""
z=new P.cw("")
for(y=b,x=!0,w=!0,v="";y<a.length;++y){if(x)x=!1
else z.a=v+", "
u=a[y]
if(u!=null)w=!1
v=z.a+=H.aD(u,c)}return w?"":"<"+z.n(0)+">"},
cW:function(a,b){if(a==null)return b
a=a.apply(null,b)
if(a==null)return
if(typeof a==="object"&&a!==null&&a.constructor===Array)return a
if(typeof a=="function")return a.apply(null,b)
return b},
eT:function(a,b,c,d){var z,y
if(a==null)return!1
z=H.bS(a)
y=J.t(a)
if(y[b]==null)return!1
return H.eP(H.cW(y[d],z),c)},
eP:function(a,b){var z,y
if(a==null||b==null)return!0
z=a.length
for(y=0;y<z;++y)if(!H.P(a[y],b[y]))return!1
return!0},
P:function(a,b){var z,y,x,w,v,u
if(a===b)return!0
if(a==null||b==null)return!0
if(a.builtin$cls==="ad")return!0
if('func' in b)return H.eW(a,b)
if('func' in a)return b.builtin$cls==="l0"||b.builtin$cls==="c"
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
return H.eP(H.cW(u,z),x)},
eO:function(a,b,c){var z,y,x,w,v
z=b==null
if(z&&a==null)return!0
if(z)return c
if(a==null)return!1
y=a.length
x=b.length
if(c){if(y<x)return!1}else if(y!==x)return!1
for(w=0;w<x;++w){z=a[w]
v=b[w]
if(!(H.P(z,v)||H.P(v,z)))return!1}return!0},
jS:function(a,b){var z,y,x,w,v,u
if(b==null)return!0
if(a==null)return!1
z=Object.getOwnPropertyNames(b)
z.fixed$length=Array
y=z
for(z=y.length,x=0;x<z;++x){w=y[x]
if(!Object.hasOwnProperty.call(a,w))return!1
v=b[w]
u=a[w]
if(!(H.P(v,u)||H.P(u,v)))return!1}return!0},
eW:function(a,b){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l
if(!('func' in a))return!1
if("v" in a){if(!("v" in b)&&"ret" in b)return!1}else if(!("v" in b)){z=a.ret
y=b.ret
if(!(H.P(z,y)||H.P(y,z)))return!1}x=a.args
w=b.args
v=a.opt
u=b.opt
t=x!=null?x.length:0
s=w!=null?w.length:0
r=v!=null?v.length:0
q=u!=null?u.length:0
if(t>s)return!1
if(t+r<s+q)return!1
if(t===s){if(!H.eO(x,w,!1))return!1
if(!H.eO(v,u,!0))return!1}else{for(p=0;p<t;++p){o=x[p]
n=w[p]
if(!(H.P(o,n)||H.P(n,o)))return!1}for(m=p,l=0;m<s;++l,++m){o=v[l]
n=w[m]
if(!(H.P(o,n)||H.P(n,o)))return!1}for(m=0;m<q;++l,++m){o=v[l]
n=u[m]
if(!(H.P(o,n)||H.P(n,o)))return!1}}return H.jS(a.named,b.named)},
m2:function(a){var z=$.cS
return"Instance of "+(z==null?"<Unknown>":z.$1(a))},
m0:function(a){return H.an(a)},
m_:function(a,b,c){Object.defineProperty(a,b,{value:c,enumerable:false,writable:true,configurable:true})},
kj:function(a){var z,y,x,w,v,u
z=$.cS.$1(a)
y=$.bQ[z]
if(y!=null){Object.defineProperty(a,init.dispatchPropertyName,{value:y,enumerable:false,writable:true,configurable:true})
return y.i}x=$.bU[z]
if(x!=null)return x
w=init.interceptorsByTag[z]
if(w==null){z=$.eN.$2(a,z)
if(z!=null){y=$.bQ[z]
if(y!=null){Object.defineProperty(a,init.dispatchPropertyName,{value:y,enumerable:false,writable:true,configurable:true})
return y.i}x=$.bU[z]
if(x!=null)return x
w=init.interceptorsByTag[z]}}if(w==null)return
x=w.prototype
v=z[0]
if(v==="!"){y=H.cU(x)
$.bQ[z]=y
Object.defineProperty(a,init.dispatchPropertyName,{value:y,enumerable:false,writable:true,configurable:true})
return y.i}if(v==="~"){$.bU[z]=x
return x}if(v==="-"){u=H.cU(x)
Object.defineProperty(Object.getPrototypeOf(a),init.dispatchPropertyName,{value:u,enumerable:false,writable:true,configurable:true})
return u.i}if(v==="+")return H.eZ(a,x)
if(v==="*")throw H.e(new P.et(z))
if(init.leafTags[z]===true){u=H.cU(x)
Object.defineProperty(Object.getPrototypeOf(a),init.dispatchPropertyName,{value:u,enumerable:false,writable:true,configurable:true})
return u.i}else return H.eZ(a,x)},
eZ:function(a,b){var z=Object.getPrototypeOf(a)
Object.defineProperty(z,init.dispatchPropertyName,{value:J.bV(b,z,null,null),enumerable:false,writable:true,configurable:true})
return b},
cU:function(a){return J.bV(a,!1,null,!!a.$isT)},
kk:function(a,b,c){var z=b.prototype
if(init.leafTags[a]===true)return J.bV(z,!1,null,!!z.$isT)
else return J.bV(z,c,null,null)},
kb:function(){if(!0===$.cT)return
$.cT=!0
H.kc()},
kc:function(){var z,y,x,w,v,u,t,s
$.bQ=Object.create(null)
$.bU=Object.create(null)
H.k7()
z=init.interceptorsByTag
y=Object.getOwnPropertyNames(z)
if(typeof window!="undefined"){window
x=function(){}
for(w=0;w<y.length;++w){v=y[w]
u=$.f_.$1(v)
if(u!=null){t=H.kk(v,z[v],u)
if(t!=null){Object.defineProperty(u,init.dispatchPropertyName,{value:t,enumerable:false,writable:true,configurable:true})
x.prototype=u}}}}for(w=0;w<y.length;++w){v=y[w]
if(/^[A-Za-z_]/.test(v)){s=z[v]
z["!"+v]=s
z["~"+v]=s
z["-"+v]=s
z["+"+v]=s
z["*"+v]=s}}},
k7:function(){var z,y,x,w,v,u,t
z=C.a0()
z=H.aA(C.Y,H.aA(C.a2,H.aA(C.K,H.aA(C.K,H.aA(C.a1,H.aA(C.Z,H.aA(C.a_(C.L),z)))))))
if(typeof dartNativeDispatchHooksTransformer!="undefined"){y=dartNativeDispatchHooksTransformer
if(typeof y=="function")y=[y]
if(y.constructor==Array)for(x=0;x<y.length;++x){w=y[x]
if(typeof w=="function")z=w(z)||z}}v=z.getTag
u=z.getUnknownTag
t=z.prototypeForTag
$.cS=new H.k8(v)
$.eN=new H.k9(u)
$.f_=new H.ka(t)},
aA:function(a,b){return a(b)||b},
i7:{"^":"c;a,b,c,d,e,f,r,x",F:{
i8:function(a){var z,y,x
z=a.$reflectionInfo
if(z==null)return
z.fixed$length=Array
z=z
y=z[0]
x=z[1]
return new H.i7(a,z,(y&1)===1,y>>1,x>>1,(x&1)===1,z[2],null)}}},
i2:{"^":"k:0;a",
$0:function(){return C.a.aM(1000*this.a.now())}},
iE:{"^":"c;a,b,c,d,e,f",
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
a8:function(a){var z,y,x,w,v,u
a=a.replace(String({}),'$receiver$').replace(/[[\]{}()*+?.\\^$|]/g,"\\$&")
z=a.match(/\\\$[a-zA-Z]+\\\$/g)
if(z==null)z=[]
y=z.indexOf("\\$arguments\\$")
x=z.indexOf("\\$argumentsExpr\\$")
w=z.indexOf("\\$expr\\$")
v=z.indexOf("\\$method\\$")
u=z.indexOf("\\$receiver\\$")
return new H.iE(a.replace(new RegExp('\\\\\\$arguments\\\\\\$','g'),'((?:x|[^x])*)').replace(new RegExp('\\\\\\$argumentsExpr\\\\\\$','g'),'((?:x|[^x])*)').replace(new RegExp('\\\\\\$expr\\\\\\$','g'),'((?:x|[^x])*)').replace(new RegExp('\\\\\\$method\\\\\\$','g'),'((?:x|[^x])*)').replace(new RegExp('\\\\\\$receiver\\\\\\$','g'),'((?:x|[^x])*)'),y,x,w,v,u)},
bJ:function(a){return function($expr$){var $argumentsExpr$='$arguments$'
try{$expr$.$method$($argumentsExpr$)}catch(z){return z.message}}(a)},
eo:function(a){return function($expr$){try{$expr$.$method$}catch(z){return z.message}}(a)}}},
dP:{"^":"E;a,b",
n:function(a){var z=this.b
if(z==null)return"NullError: "+H.d(this.a)
return"NullError: method not found: '"+z+"' on null"}},
ho:{"^":"E;a,b,c",
n:function(a){var z,y
z=this.b
if(z==null)return"NoSuchMethodError: "+H.d(this.a)
y=this.c
if(y==null)return"NoSuchMethodError: method not found: '"+z+"' ("+H.d(this.a)+")"
return"NoSuchMethodError: method not found: '"+z+"' on '"+y+"' ("+H.d(this.a)+")"},
F:{
ce:function(a,b){var z,y
z=b==null
y=z?null:b.method
return new H.ho(a,y,z?null:b.receiver)}}},
iG:{"^":"E;a",
n:function(a){var z=this.a
return z.length===0?"Error":"Error: "+z}},
ks:{"^":"k:1;a",
$1:function(a){if(!!J.t(a).$isE)if(a.$thrownJsError==null)a.$thrownJsError=this.a
return a}},
eH:{"^":"c;a,b",
n:function(a){var z,y
z=this.b
if(z!=null)return z
z=this.a
y=z!==null&&typeof z==="object"?z.stack:null
z=y==null?"":y
this.b=z
return z}},
ke:{"^":"k:0;a",
$0:function(){return this.a.$0()}},
kf:{"^":"k:0;a,b",
$0:function(){return this.a.$1(this.b)}},
kg:{"^":"k:0;a,b,c",
$0:function(){return this.a.$2(this.b,this.c)}},
kh:{"^":"k:0;a,b,c,d",
$0:function(){return this.a.$3(this.b,this.c,this.d)}},
ki:{"^":"k:0;a,b,c,d,e",
$0:function(){return this.a.$4(this.b,this.c,this.d,this.e)}},
k:{"^":"c;",
n:function(a){return"Closure '"+H.cq(this).trim()+"'"},
gdS:function(){return this},
gdS:function(){return this}},
e4:{"^":"k;"},
ij:{"^":"e4;",
n:function(a){var z=this.$static_name
if(z==null)return"Closure of unknown static method"
return"Closure '"+z+"'"}},
c1:{"^":"e4;a,b,c,d",
a1:function(a,b){if(b==null)return!1
if(this===b)return!0
if(!(b instanceof H.c1))return!1
return this.a===b.a&&this.b===b.b&&this.c===b.c},
gZ:function(a){var z,y
z=this.c
if(z==null)y=H.an(this.a)
else y=typeof z!=="object"?J.aE(z):H.an(z)
return(y^H.an(this.b))>>>0},
n:function(a){var z=this.c
if(z==null)z=this.a
return"Closure '"+H.d(this.d)+"' of "+H.bD(z)},
F:{
c2:function(a){return a.a},
d5:function(a){return a.c},
fj:function(){var z=$.aG
if(z==null){z=H.bi("self")
$.aG=z}return z},
bi:function(a){var z,y,x,w,v
z=new H.c1("self","target","receiver","name")
y=Object.getOwnPropertyNames(z)
y.fixed$length=Array
x=y
for(y=x.length,w=0;w<y;++w){v=x[w]
if(z[v]===a)return v}}}},
fn:{"^":"E;a",
n:function(a){return this.a},
F:{
fo:function(a,b){return new H.fn("CastError: Casting value of type '"+a+"' to incompatible type '"+b+"'")}}},
ia:{"^":"E;a",
n:function(a){return"RuntimeError: "+H.d(this.a)}},
av:{"^":"c;a,b,c,d,e,f,r,$ti",
gv:function(a){return this.a},
gbn:function(a){return this.a===0},
gb9:function(){return new H.hq(this,[H.ag(this,0)])},
gdR:function(a){return H.ci(this.gb9(),new H.hn(this),H.ag(this,0),H.ag(this,1))},
b8:function(a){var z
if((a&0x3ffffff)===a){z=this.c
if(z==null)return!1
return this.fh(z,a)}else return this.hz(a)},
hz:function(a){var z=this.d
if(z==null)return!1
return this.bm(this.bB(z,this.bl(a)),a)>=0},
i:function(a,b){var z,y,x
if(typeof b==="string"){z=this.b
if(z==null)return
y=this.bd(z,b)
return y==null?null:y.b}else if(typeof b==="number"&&(b&0x3ffffff)===b){x=this.c
if(x==null)return
y=this.bd(x,b)
return y==null?null:y.b}else return this.hA(b)},
hA:function(a){var z,y,x
z=this.d
if(z==null)return
y=this.bB(z,this.bl(a))
x=this.bm(y,a)
if(x<0)return
return y[x].b},
q:function(a,b,c){var z,y,x,w,v,u
if(typeof b==="string"){z=this.b
if(z==null){z=this.c3()
this.b=z}this.cQ(z,b,c)}else if(typeof b==="number"&&(b&0x3ffffff)===b){y=this.c
if(y==null){y=this.c3()
this.c=y}this.cQ(y,b,c)}else{x=this.d
if(x==null){x=this.c3()
this.d=x}w=this.bl(b)
v=this.bB(x,w)
if(v==null)this.c7(x,w,[this.c4(b,c)])
else{u=this.bm(v,b)
if(u>=0)v[u].b=c
else v.push(this.c4(b,c))}}},
aX:function(a,b){if(typeof b==="string")return this.d8(this.b,b)
else if(typeof b==="number"&&(b&0x3ffffff)===b)return this.d8(this.c,b)
else return this.hB(b)},
hB:function(a){var z,y,x,w
z=this.d
if(z==null)return
y=this.bB(z,this.bl(a))
x=this.bm(y,a)
if(x<0)return
w=y.splice(x,1)[0]
this.dg(w)
return w.b},
b6:function(a){if(this.a>0){this.f=null
this.e=null
this.d=null
this.c=null
this.b=null
this.a=0
this.r=this.r+1&67108863}},
bK:function(a,b){var z,y
z=this.e
y=this.r
for(;z!=null;){b.$2(z.a,z.b)
if(y!==this.r)throw H.e(new P.X(this))
z=z.c}},
cQ:function(a,b,c){var z=this.bd(a,b)
if(z==null)this.c7(a,b,this.c4(b,c))
else z.b=c},
d8:function(a,b){var z
if(a==null)return
z=this.bd(a,b)
if(z==null)return
this.dg(z)
this.d_(a,b)
return z.b},
c4:function(a,b){var z,y
z=new H.hp(a,b,null,null)
if(this.e==null){this.f=z
this.e=z}else{y=this.f
z.d=y
y.c=z
this.f=z}++this.a
this.r=this.r+1&67108863
return z},
dg:function(a){var z,y
z=a.d
y=a.c
if(z==null)this.e=y
else z.c=y
if(y==null)this.f=z
else y.d=z;--this.a
this.r=this.r+1&67108863},
bl:function(a){return J.aE(a)&0x3ffffff},
bm:function(a,b){var z,y
if(a==null)return-1
z=a.length
for(y=0;y<z;++y)if(J.a1(a[y].a,b))return y
return-1},
n:function(a){return P.hv(this)},
bd:function(a,b){return a[b]},
bB:function(a,b){return a[b]},
c7:function(a,b,c){a[b]=c},
d_:function(a,b){delete a[b]},
fh:function(a,b){return this.bd(a,b)!=null},
c3:function(){var z=Object.create(null)
this.c7(z,"<non-identifier-key>",z)
this.d_(z,"<non-identifier-key>")
return z},
$ish7:1},
hn:{"^":"k:1;a",
$1:function(a){return this.a.i(0,a)}},
hp:{"^":"c;a,b,c,d"},
hq:{"^":"i;a,$ti",
gv:function(a){return this.a.a},
ga5:function(a){var z,y
z=this.a
y=new H.hr(z,z.r,null,null)
y.c=z.e
return y}},
hr:{"^":"c;a,b,c,d",
gT:function(){return this.d},
P:function(){var z=this.a
if(this.b!==z.r)throw H.e(new P.X(z))
else{z=this.c
if(z==null){this.d=null
return!1}else{this.d=z.a
this.c=z.c
return!0}}}},
k8:{"^":"k:1;a",
$1:function(a){return this.a(a)}},
k9:{"^":"k:8;a",
$2:function(a,b){return this.a(a,b)}},
ka:{"^":"k:9;a",
$1:function(a){return this.a(a)}}}],["","",,H,{"^":"",
k_:function(a){var z=H.f(a?Object.keys(a):[],[null])
z.fixed$length=Array
return z}}],["","",,H,{"^":"",
km:function(a){if(typeof dartPrint=="function"){dartPrint(a)
return}if(typeof console=="object"&&typeof console.log!="undefined"){console.log(a)
return}if(typeof window=="object")return
if(typeof print=="function"){print(a)
return}throw"Unable to print message: "+String(a)}}],["","",,H,{"^":"",
b:function(a){return a},
dI:{"^":"h;",$isdI:1,"%":"ArrayBuffer"},
cm:{"^":"h;",$iscm:1,"%":"DataView;ArrayBufferView;ck|dK|dM|cl|dJ|dL|am"},
ck:{"^":"cm;",
gv:function(a){return a.length},
$isI:1,
$asI:I.L,
$isT:1,
$asT:I.L},
cl:{"^":"dM;",
i:function(a,b){if(b>>>0!==b||b>=a.length)H.x(H.D(a,b))
return a[b]},
q:function(a,b,c){if(b>>>0!==b||b>=a.length)H.x(H.D(a,b))
a[b]=c}},
am:{"^":"dL;",
q:function(a,b,c){if(b>>>0!==b||b>=a.length)H.x(H.D(a,b))
a[b]=c},
$isi:1,
$asi:function(){return[P.m]},
$isl:1,
$asl:function(){return[P.m]}},
le:{"^":"cl;",$isi:1,
$asi:function(){return[P.a9]},
$isl:1,
$asl:function(){return[P.a9]},
"%":"Float32Array"},
hJ:{"^":"cl;",$isi:1,
$asi:function(){return[P.a9]},
$isl:1,
$asl:function(){return[P.a9]},
"%":"Float64Array"},
lf:{"^":"am;",
i:function(a,b){if(b>>>0!==b||b>=a.length)H.x(H.D(a,b))
return a[b]},
$isi:1,
$asi:function(){return[P.m]},
$isl:1,
$asl:function(){return[P.m]},
"%":"Int16Array"},
lg:{"^":"am;",
i:function(a,b){if(b>>>0!==b||b>=a.length)H.x(H.D(a,b))
return a[b]},
$isi:1,
$asi:function(){return[P.m]},
$isl:1,
$asl:function(){return[P.m]},
"%":"Int32Array"},
lh:{"^":"am;",
i:function(a,b){if(b>>>0!==b||b>=a.length)H.x(H.D(a,b))
return a[b]},
$isi:1,
$asi:function(){return[P.m]},
$isl:1,
$asl:function(){return[P.m]},
"%":"Int8Array"},
li:{"^":"am;",
i:function(a,b){if(b>>>0!==b||b>=a.length)H.x(H.D(a,b))
return a[b]},
$isi:1,
$asi:function(){return[P.m]},
$isl:1,
$asl:function(){return[P.m]},
"%":"Uint16Array"},
lj:{"^":"am;",
i:function(a,b){if(b>>>0!==b||b>=a.length)H.x(H.D(a,b))
return a[b]},
$isi:1,
$asi:function(){return[P.m]},
$isl:1,
$asl:function(){return[P.m]},
"%":"Uint32Array"},
lk:{"^":"am;",
gv:function(a){return a.length},
i:function(a,b){if(b>>>0!==b||b>=a.length)H.x(H.D(a,b))
return a[b]},
$isi:1,
$asi:function(){return[P.m]},
$isl:1,
$asl:function(){return[P.m]},
"%":"CanvasPixelArray|Uint8ClampedArray"},
ll:{"^":"am;",
gv:function(a){return a.length},
i:function(a,b){if(b>>>0!==b||b>=a.length)H.x(H.D(a,b))
return a[b]},
$isi:1,
$asi:function(){return[P.m]},
$isl:1,
$asl:function(){return[P.m]},
"%":";Uint8Array"},
dJ:{"^":"ck+aO;",$asI:I.L,$isi:1,
$asi:function(){return[P.m]},
$asT:I.L,
$isl:1,
$asl:function(){return[P.m]}},
dK:{"^":"ck+aO;",$asI:I.L,$isi:1,
$asi:function(){return[P.a9]},
$asT:I.L,
$isl:1,
$asl:function(){return[P.a9]}},
dL:{"^":"dJ+dp;",$asI:I.L,
$asi:function(){return[P.m]},
$asT:I.L,
$asl:function(){return[P.m]}},
dM:{"^":"dK+dp;",$asI:I.L,
$asi:function(){return[P.a9]},
$asT:I.L,
$asl:function(){return[P.a9]}}}],["","",,P,{"^":"",
iU:function(){var z,y,x
z={}
if(self.scheduleImmediate!=null)return P.jT()
if(self.MutationObserver!=null&&self.document!=null){y=self.document.createElement("div")
x=self.document.createElement("span")
z.a=null
new self.MutationObserver(H.aB(new P.iW(z),1)).observe(y,{childList:true})
return new P.iV(z,y,x)}else if(self.setImmediate!=null)return P.jU()
return P.jV()},
lM:[function(a){++init.globalState.f.b
self.scheduleImmediate(H.aB(new P.iX(a),0))},"$1","jT",2,0,3],
lN:[function(a){++init.globalState.f.b
self.setImmediate(H.aB(new P.iY(a),0))},"$1","jU",2,0,3],
lO:[function(a){P.cy(C.I,a)},"$1","jV",2,0,3],
jO:function(a,b){if(H.aU(a,{func:1,args:[P.ad,P.ad]})){b.toString
return a}else{b.toString
return a}},
jN:function(){var z,y
for(;z=$.az,z!=null;){$.aS=null
y=z.b
$.az=y
if(y==null)$.aR=null
z.a.$0()}},
lZ:[function(){$.cL=!0
try{P.jN()}finally{$.aS=null
$.cL=!1
if($.az!=null)$.$get$cD().$1(P.eQ())}},"$0","eQ",0,0,2],
eM:function(a){var z=new P.ey(a,null)
if($.az==null){$.aR=z
$.az=z
if(!$.cL)$.$get$cD().$1(P.eQ())}else{$.aR.b=z
$.aR=z}},
jR:function(a){var z,y,x
z=$.az
if(z==null){P.eM(a)
$.aS=$.aR
return}y=new P.ey(a,null)
x=$.aS
if(x==null){y.b=z
$.aS=y
$.az=y}else{y.b=x.b
x.b=y
$.aS=y
if(y.b==null)$.aR=y}},
ko:function(a){var z=$.u
if(C.h===z){P.bP(null,null,C.h,a)
return}z.toString
P.bP(null,null,z,z.cb(a))},
iB:function(a,b){var z=$.u
if(z===C.h){z.toString
return P.cy(a,b)}return P.cy(a,z.cb(b))},
ef:function(a,b){var z,y
z=$.u
if(z===C.h){z.toString
return P.eg(a,b)}y=z.dk(b)
$.u.toString
return P.eg(a,y)},
cy:function(a,b){var z=C.b.aH(a.a,1000)
return H.iw(z<0?0:z,b)},
eg:function(a,b){var z=C.b.aH(a.a,1000)
return H.ix(z<0?0:z,b)},
bO:function(a,b,c,d,e){var z={}
z.a=d
P.jR(new P.jP(z,e))},
eK:function(a,b,c,d){var z,y
y=$.u
if(y===c)return d.$0()
$.u=c
z=y
try{y=d.$0()
return y}finally{$.u=z}},
eL:function(a,b,c,d,e){var z,y
y=$.u
if(y===c)return d.$1(e)
$.u=c
z=y
try{y=d.$1(e)
return y}finally{$.u=z}},
jQ:function(a,b,c,d,e,f){var z,y
y=$.u
if(y===c)return d.$2(e,f)
$.u=c
z=y
try{y=d.$2(e,f)
return y}finally{$.u=z}},
bP:function(a,b,c,d){var z=C.h!==c
if(z)d=!(!z||!1)?c.cb(d):c.fQ(d)
P.eM(d)},
iW:{"^":"k:1;a",
$1:function(a){var z,y;--init.globalState.f.b
z=this.a
y=z.a
z.a=null
y.$0()}},
iV:{"^":"k:10;a,b,c",
$1:function(a){var z,y;++init.globalState.f.b
this.a.a=a
z=this.b
y=this.c
z.firstChild?z.removeChild(y):z.appendChild(y)}},
iX:{"^":"k:0;a",
$0:function(){--init.globalState.f.b
this.a.$0()}},
iY:{"^":"k:0;a",
$0:function(){--init.globalState.f.b
this.a.$0()}},
j7:{"^":"c;a,b,c,d,e",
hK:function(a){if(this.c!==6)return!0
return this.b.b.cp(this.d,a.a)},
hs:function(a){var z,y
z=this.e
y=this.b.b
if(H.aU(z,{func:1,args:[P.c,P.cv]}))return y.i_(z,a.a,a.b)
else return y.cp(z,a.a)}},
bL:{"^":"c;de:a<,b,fD:c<,$ti",
dO:function(a,b){var z,y
z=$.u
if(z!==C.h){z.toString
if(b!=null)b=P.jO(b,z)}y=new P.bL(0,z,null,[null])
this.cR(new P.j7(null,y,b==null?1:3,a,b))
return y},
i5:function(a){return this.dO(a,null)},
cR:function(a){var z,y
z=this.a
if(z<=1){a.a=this.c
this.c=a}else{if(z===2){z=this.c
y=z.a
if(y<4){z.cR(a)
return}this.a=y
this.c=z.c}z=this.b
z.toString
P.bP(null,null,z,new P.j8(this,a))}},
d7:function(a){var z,y,x,w,v,u
z={}
z.a=a
if(a==null)return
y=this.a
if(y<=1){x=this.c
this.c=a
if(x!=null){for(w=a;v=w.a,v!=null;w=v);w.a=x}}else{if(y===2){y=this.c
u=y.a
if(u<4){y.d7(a)
return}this.a=u
this.c=y.c}z.a=this.bf(a)
y=this.b
y.toString
P.bP(null,null,y,new P.jd(z,this))}},
d9:function(){var z=this.c
this.c=null
return this.bf(z)},
bf:function(a){var z,y,x
for(z=a,y=null;z!=null;y=z,z=x){x=z.a
z.a=y}return y},
cZ:function(a){var z,y
z=this.$ti
if(H.eT(a,"$isbu",z,"$asbu"))if(H.eT(a,"$isbL",z,null))P.eC(a,this)
else P.j9(a,this)
else{y=this.d9()
this.a=4
this.c=a
P.aP(this,y)}},
bZ:[function(a,b){var z=this.d9()
this.a=8
this.c=new P.bf(a,b)
P.aP(this,z)},function(a){return this.bZ(a,null)},"il","$2","$1","gfc",2,2,11],
$isbu:1,
F:{
j9:function(a,b){var z,y,x
b.a=1
try{a.dO(new P.ja(b),new P.jb(b))}catch(x){z=H.G(x)
y=H.af(x)
P.ko(new P.jc(b,z,y))}},
eC:function(a,b){var z,y,x
for(;z=a.a,z===2;)a=a.c
y=b.c
if(z>=4){b.c=null
x=b.bf(y)
b.a=a.a
b.c=a.c
P.aP(b,x)}else{b.a=2
b.c=a
a.d7(y)}},
aP:function(a,b){var z,y,x,w,v,u,t,s,r,q,p,o,n
z={}
z.a=a
for(y=a;!0;){x={}
w=y.a===8
if(b==null){if(w){v=y.c
y=y.b
u=v.a
v=v.b
y.toString
P.bO(null,null,y,u,v)}return}for(;t=b.a,t!=null;b=t){b.a=null
P.aP(z.a,b)}y=z.a
s=y.c
x.a=w
x.b=s
v=!w
if(v){u=b.c
u=(u&1)!==0||u===8}else u=!0
if(u){u=b.b
r=u.b
if(w){q=y.b
q.toString
q=q==null?r==null:q===r
if(!q)r.toString
else q=!0
q=!q}else q=!1
if(q){y=y.b
v=s.a
u=s.b
y.toString
P.bO(null,null,y,v,u)
return}p=$.u
if(p==null?r!=null:p!==r)$.u=r
else p=null
y=b.c
if(y===8)new P.jg(z,x,w,b).$0()
else if(v){if((y&1)!==0)new P.jf(x,b,s).$0()}else if((y&2)!==0)new P.je(z,x,b).$0()
if(p!=null)$.u=p
y=x.b
if(!!J.t(y).$isbu){if(y.a>=4){o=u.c
u.c=null
b=u.bf(o)
u.a=y.a
u.c=y.c
z.a=y
continue}else P.eC(y,u)
return}}n=b.b
o=n.c
n.c=null
b=n.bf(o)
y=x.a
v=x.b
if(!y){n.a=4
n.c=v}else{n.a=8
n.c=v}z.a=n
y=n}}}},
j8:{"^":"k:0;a,b",
$0:function(){P.aP(this.a,this.b)}},
jd:{"^":"k:0;a,b",
$0:function(){P.aP(this.b,this.a.a)}},
ja:{"^":"k:1;a",
$1:function(a){var z=this.a
z.a=0
z.cZ(a)}},
jb:{"^":"k:12;a",
$2:function(a,b){this.a.bZ(a,b)},
$1:function(a){return this.$2(a,null)}},
jc:{"^":"k:0;a,b,c",
$0:function(){this.a.bZ(this.b,this.c)}},
jg:{"^":"k:2;a,b,c,d",
$0:function(){var z,y,x,w,v,u,t
z=null
try{w=this.d
z=w.b.b.dM(w.d)}catch(v){y=H.G(v)
x=H.af(v)
if(this.c){w=this.a.a.c.a
u=y
u=w==null?u==null:w===u
w=u}else w=!1
u=this.b
if(w)u.b=this.a.a.c
else u.b=new P.bf(y,x)
u.a=!0
return}if(!!J.t(z).$isbu){if(z instanceof P.bL&&z.gde()>=4){if(z.gde()===8){w=this.b
w.b=z.gfD()
w.a=!0}return}t=this.a.a
w=this.b
w.b=z.i5(new P.jh(t))
w.a=!1}}},
jh:{"^":"k:1;a",
$1:function(a){return this.a}},
jf:{"^":"k:2;a,b,c",
$0:function(){var z,y,x,w
try{x=this.b
this.a.b=x.b.b.cp(x.d,this.c)}catch(w){z=H.G(w)
y=H.af(w)
x=this.a
x.b=new P.bf(z,y)
x.a=!0}}},
je:{"^":"k:2;a,b,c",
$0:function(){var z,y,x,w,v,u,t,s
try{z=this.a.a.c
w=this.c
if(w.hK(z)&&w.e!=null){v=this.b
v.b=w.hs(z)
v.a=!1}}catch(u){y=H.G(u)
x=H.af(u)
w=this.a.a.c
v=w.a
t=y
s=this.b
if(v==null?t==null:v===t)s.b=w
else s.b=new P.bf(y,x)
s.a=!0}}},
ey:{"^":"c;a,b"},
ik:{"^":"c;$ti",
gv:function(a){var z,y
z={}
y=new P.bL(0,$.u,null,[P.m])
z.a=0
this.hH(new P.im(z),!0,new P.io(z,y),y.gfc())
return y}},
im:{"^":"k:1;a",
$1:function(a){++this.a.a}},
io:{"^":"k:0;a,b",
$0:function(){this.b.cZ(this.a.a)}},
il:{"^":"c;"},
ed:{"^":"c;"},
bf:{"^":"c;a,b",
n:function(a){return H.d(this.a)},
$isE:1},
jH:{"^":"c;"},
jP:{"^":"k:0;a,b",
$0:function(){var z,y,x
z=this.a
y=z.a
if(y==null){x=new P.dQ()
z.a=x
z=x}else z=y
y=this.b
if(y==null)throw H.e(z)
x=H.e(z)
x.stack=y.n(0)
throw x}},
ju:{"^":"jH;",
gba:function(a){return},
i0:function(a){var z,y,x
try{if(C.h===$.u){a.$0()
return}P.eK(null,null,this,a)}catch(x){z=H.G(x)
y=H.af(x)
P.bO(null,null,this,z,y)}},
i1:function(a,b){var z,y,x
try{if(C.h===$.u){a.$1(b)
return}P.eL(null,null,this,a,b)}catch(x){z=H.G(x)
y=H.af(x)
P.bO(null,null,this,z,y)}},
fQ:function(a){return new P.jw(this,a)},
cb:function(a){return new P.jv(this,a)},
dk:function(a){return new P.jx(this,a)},
i:function(a,b){return},
dM:function(a){if($.u===C.h)return a.$0()
return P.eK(null,null,this,a)},
cp:function(a,b){if($.u===C.h)return a.$1(b)
return P.eL(null,null,this,a,b)},
i_:function(a,b,c){if($.u===C.h)return a.$2(b,c)
return P.jQ(null,null,this,a,b,c)}},
jw:{"^":"k:0;a,b",
$0:function(){return this.a.dM(this.b)}},
jv:{"^":"k:0;a,b",
$0:function(){return this.a.i0(this.b)}},
jx:{"^":"k:1;a,b",
$1:function(a){return this.a.i1(this.b,a)}}}],["","",,P,{"^":"",
dA:function(){return new H.av(0,null,null,null,null,null,0,[null,null])},
aN:function(a){return H.k0(a,new H.av(0,null,null,null,null,null,0,[null,null]))},
aZ:function(a,b,c,d,e){return new P.ji(0,null,null,null,null,[d,e])},
hf:function(a,b,c){var z,y
if(P.cM(a)){if(b==="("&&c===")")return"(...)"
return b+"..."+c}z=[]
y=$.$get$aT()
y.push(a)
try{P.jL(a,z)}finally{y.pop()}y=P.e2(b,z,", ")+c
return y.charCodeAt(0)==0?y:y},
bw:function(a,b,c){var z,y,x
if(P.cM(a))return b+"..."+c
z=new P.cw(b)
y=$.$get$aT()
y.push(a)
try{x=z
x.a=P.e2(x.gb3(),a,", ")}finally{y.pop()}y=z
y.a=y.gb3()+c
y=z.gb3()
return y.charCodeAt(0)==0?y:y},
cM:function(a){var z,y
for(z=0;y=$.$get$aT(),z<y.length;++z)if(a===y[z])return!0
return!1},
jL:function(a,b){var z,y,x,w,v,u,t,s,r,q
z=a.ga5(a)
y=0
x=0
while(!0){if(!(y<80||x<3))break
if(!z.P())return
w=H.d(z.gT())
b.push(w)
y+=w.length+2;++x}if(!z.P()){if(x<=5)return
v=b.pop()
u=b.pop()}else{t=z.gT();++x
if(!z.P()){if(x<=4){b.push(H.d(t))
return}v=H.d(t)
u=b.pop()
y+=v.length+2}else{s=z.gT();++x
for(;z.P();t=s,s=r){r=z.gT();++x
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
Y:function(a,b,c,d){return new P.jl(0,null,null,null,null,null,0,[d])},
dB:function(a,b){var z,y,x
z=P.Y(null,null,null,b)
for(y=a.length,x=0;x<a.length;a.length===y||(0,H.f3)(a),++x)z.l(0,a[x])
return z},
hv:function(a){var z,y,x
z={}
if(P.cM(a))return"{...}"
y=new P.cw("")
try{$.$get$aT().push(a)
x=y
x.a=x.gb3()+"{"
z.a=!0
a.bK(0,new P.hw(z,y))
z=y
z.a=z.gb3()+"}"}finally{$.$get$aT().pop()}z=y.gb3()
return z.charCodeAt(0)==0?z:z},
ji:{"^":"c;a,b,c,d,e,$ti",
gv:function(a){return this.a},
b8:function(a){var z
if((a&0x3ffffff)===a){z=this.c
return z==null?!1:z[a]!=null}else return this.fg(a)},
fg:function(a){var z=this.d
if(z==null)return!1
return this.aG(z[this.aF(a)],a)>=0},
i:function(a,b){var z,y,x,w
if(typeof b==="string"&&b!=="__proto__"){z=this.b
if(z==null)y=null
else{x=z[b]
y=x===z?null:x}return y}else if(typeof b==="number"&&(b&0x3ffffff)===b){w=this.c
if(w==null)y=null
else{x=w[b]
y=x===w?null:x}return y}else return this.fl(b)},
fl:function(a){var z,y,x
z=this.d
if(z==null)return
y=z[this.aF(a)]
x=this.aG(y,a)
return x<0?null:y[x+1]},
q:function(a,b,c){var z,y
if(typeof b==="string"&&b!=="__proto__"){z=this.b
if(z==null){z=P.cF()
this.b=z}this.cW(z,b,c)}else if(typeof b==="number"&&(b&0x3ffffff)===b){y=this.c
if(y==null){y=P.cF()
this.c=y}this.cW(y,b,c)}else this.fG(b,c)},
fG:function(a,b){var z,y,x,w
z=this.d
if(z==null){z=P.cF()
this.d=z}y=this.aF(a)
x=z[y]
if(x==null){P.cG(z,y,[a,b]);++this.a
this.e=null}else{w=this.aG(x,a)
if(w>=0)x[w+1]=b
else{x.push(a,b);++this.a
this.e=null}}},
bK:function(a,b){var z,y,x,w
z=this.fd()
for(y=z.length,x=0;x<y;++x){w=z[x]
b.$2(w,this.i(0,w))
if(z!==this.e)throw H.e(new P.X(this))}},
fd:function(){var z,y,x,w,v,u,t,s,r,q,p,o
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
cW:function(a,b,c){if(a[b]==null){++this.a
this.e=null}P.cG(a,b,c)},
aF:function(a){return J.aE(a)&0x3ffffff},
aG:function(a,b){var z,y
if(a==null)return-1
z=a.length
for(y=0;y<z;y+=2)if(J.a1(a[y],b))return y
return-1},
F:{
cG:function(a,b,c){if(c==null)a[b]=a
else a[b]=c},
cF:function(){var z=Object.create(null)
P.cG(z,"<non-identifier-key>",z)
delete z["<non-identifier-key>"]
return z}}},
eG:{"^":"av;a,b,c,d,e,f,r,$ti",
bl:function(a){return H.kl(a)&0x3ffffff},
bm:function(a,b){var z,y,x
if(a==null)return-1
z=a.length
for(y=0;y<z;++y){x=a[y].a
if(x==null?b==null:x===b)return y}return-1},
F:{
aQ:function(a,b){return new P.eG(0,null,null,null,null,null,0,[a,b])}}},
jl:{"^":"jj;a,b,c,d,e,f,r,$ti",
ga5:function(a){var z=new P.eF(this,this.r,null,null)
z.c=this.e
return z},
gv:function(a){return this.a},
a6:function(a,b){var z,y
if(typeof b==="string"&&b!=="__proto__"){z=this.b
if(z==null)return!1
return z[b]!=null}else if(typeof b==="number"&&(b&0x3ffffff)===b){y=this.c
if(y==null)return!1
return y[b]!=null}else return this.ff(b)},
ff:function(a){var z=this.d
if(z==null)return!1
return this.aG(z[this.aF(a)],a)>=0},
dE:function(a){var z=typeof a==="number"&&(a&0x3ffffff)===a
if(z)return this.a6(0,a)?a:null
else return this.fv(a)},
fv:function(a){var z,y,x
z=this.d
if(z==null)return
y=z[this.aF(a)]
x=this.aG(y,a)
if(x<0)return
return J.cY(y,x).gfj()},
bK:function(a,b){var z,y
z=this.e
y=this.r
for(;z!=null;){b.$1(z.a)
if(y!==this.r)throw H.e(new P.X(this))
z=z.b}},
l:function(a,b){var z,y,x
if(typeof b==="string"&&b!=="__proto__"){z=this.b
if(z==null){y=Object.create(null)
y["<non-identifier-key>"]=y
delete y["<non-identifier-key>"]
this.b=y
z=y}return this.cV(z,b)}else if(typeof b==="number"&&(b&0x3ffffff)===b){x=this.c
if(x==null){y=Object.create(null)
y["<non-identifier-key>"]=y
delete y["<non-identifier-key>"]
this.c=y
x=y}return this.cV(x,b)}else return this.aE(b)},
aE:function(a){var z,y,x
z=this.d
if(z==null){z=P.jn()
this.d=z}y=this.aF(a)
x=z[y]
if(x==null)z[y]=[this.bY(a)]
else{if(this.aG(x,a)>=0)return!1
x.push(this.bY(a))}return!0},
aX:function(a,b){if(typeof b==="string"&&b!=="__proto__")return this.cX(this.b,b)
else if(typeof b==="number"&&(b&0x3ffffff)===b)return this.cX(this.c,b)
else return this.fB(b)},
fB:function(a){var z,y,x
z=this.d
if(z==null)return!1
y=z[this.aF(a)]
x=this.aG(y,a)
if(x<0)return!1
this.cY(y.splice(x,1)[0])
return!0},
b6:function(a){if(this.a>0){this.f=null
this.e=null
this.d=null
this.c=null
this.b=null
this.a=0
this.r=this.r+1&67108863}},
cV:function(a,b){if(a[b]!=null)return!1
a[b]=this.bY(b)
return!0},
cX:function(a,b){var z
if(a==null)return!1
z=a[b]
if(z==null)return!1
this.cY(z)
delete a[b]
return!0},
bY:function(a){var z,y
z=new P.jm(a,null,null)
if(this.e==null){this.f=z
this.e=z}else{y=this.f
z.c=y
y.b=z
this.f=z}++this.a
this.r=this.r+1&67108863
return z},
cY:function(a){var z,y
z=a.c
y=a.b
if(z==null)this.e=y
else z.b=y
if(y==null)this.f=z
else y.c=z;--this.a
this.r=this.r+1&67108863},
aF:function(a){return J.aE(a)&0x3ffffff},
aG:function(a,b){var z,y
if(a==null)return-1
z=a.length
for(y=0;y<z;++y)if(J.a1(a[y].a,b))return y
return-1},
$isi:1,
$asi:null,
F:{
jn:function(){var z=Object.create(null)
z["<non-identifier-key>"]=z
delete z["<non-identifier-key>"]
return z}}},
jm:{"^":"c;fj:a<,b,c"},
eF:{"^":"c;a,b,c,d",
gT:function(){return this.d},
P:function(){var z=this.a
if(this.b!==z.r)throw H.e(new P.X(z))
else{z=this.c
if(z==null){this.d=null
return!1}else{this.d=z.a
this.c=z.b
return!0}}}},
jj:{"^":"ic;$ti"},
dC:{"^":"hN;$ti"},
aO:{"^":"c;$ti",
ga5:function(a){return new H.dD(a,this.gv(a),0,null)},
am:function(a,b){return this.i(a,b)},
dF:function(a,b){return new H.cj(a,b,[H.ap(a,"aO",0),null])},
hq:function(a,b,c){var z,y,x
z=this.gv(a)
for(y=b,x=0;x<z;++x){y=c.$2(y,this.i(a,x))
if(z!==this.gv(a))throw H.e(new P.X(a))}return y},
n:function(a){return P.bw(a,"[","]")},
$isi:1,
$asi:null,
$isl:1,
$asl:null},
hw:{"^":"k:13;a,b",
$2:function(a,b){var z,y
z=this.a
if(!z.a)this.b.a+=", "
z.a=!1
z=this.b
y=z.a+=H.d(a)
z.a=y+": "
z.a+=H.d(b)}},
hs:{"^":"b3;a,b,c,d,$ti",
ga5:function(a){return new P.jo(this,this.c,this.d,this.b,null)},
gbn:function(a){return this.b===this.c},
gv:function(a){return(this.c-this.b&this.a.length-1)>>>0},
am:function(a,b){var z,y
z=(this.c-this.b&this.a.length-1)>>>0
if(0>b||b>=z)H.x(P.aM(b,this,"index",null,z))
y=this.a
return y[(this.b+b&y.length-1)>>>0]},
b6:function(a){var z,y,x,w
z=this.b
y=this.c
if(z!==y){for(x=this.a,w=x.length-1;z!==y;z=(z+1&w)>>>0)x[z]=null
this.c=0
this.b=0;++this.d}},
n:function(a){return P.bw(this,"{","}")},
dK:function(){var z,y,x
z=this.b
if(z===this.c)throw H.e(H.cb());++this.d
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
if(this.b===z)this.d5();++this.d},
d5:function(){var z,y,x,w
z=new Array(this.a.length*2)
z.fixed$length=Array
y=H.f(z,this.$ti)
z=this.a
x=this.b
w=z.length-x
C.d.a9(y,0,w,z,x)
C.d.a9(y,w,w+this.b,this.a,0)
this.b=0
this.c=this.a.length
this.a=y},
eU:function(a,b){var z=new Array(8)
z.fixed$length=Array
this.a=H.f(z,[b])},
$asi:null,
F:{
cf:function(a,b){var z=new P.hs(null,0,0,0,[b])
z.eU(a,b)
return z}}},
jo:{"^":"c;a,b,c,d,e",
gT:function(){return this.e},
P:function(){var z,y
z=this.a
if(this.c!==z.d)H.x(new P.X(z))
y=this.d
if(y===this.b){this.e=null
return!1}z=z.a
this.e=z[y]
this.d=(y+1&z.length-1)>>>0
return!0}},
id:{"^":"c;$ti",
aI:function(a,b){var z
for(z=J.aV(b);z.P();)this.l(0,z.gT())},
n:function(a){return P.bw(this,"{","}")},
$isi:1,
$asi:null},
ic:{"^":"id;$ti"},
hN:{"^":"c+aO;",$isi:1,$asi:null,$isl:1,$asl:null}}],["","",,P,{"^":"",
kz:[function(a,b){return J.f8(a,b)},"$2","jY",4,0,18],
dm:function(a){if(typeof a==="number"||typeof a==="boolean"||null==a)return J.aa(a)
if(typeof a==="string")return JSON.stringify(a)
return P.fV(a)},
fV:function(a){var z=J.t(a)
if(!!z.$isk)return z.n(a)
return H.bD(a)},
bs:function(a){return new P.j6(a)},
ak:function(a,b,c,d){var z,y,x
z=J.hi(a,d)
if(a!==0&&!0)for(y=z.length,x=0;x<y;++x)z[x]=b
return z},
cg:function(a,b,c){var z,y
z=H.f([],[c])
for(y=J.aV(a);y.P();)z.push(y.gT())
return z},
cV:function(a){H.km(H.d(a))},
cO:{"^":"c;"},
"+bool":0,
y:{"^":"c;"},
a9:{"^":"V;",$isy:1,
$asy:function(){return[P.V]}},
"+double":0,
aJ:{"^":"c;a",
C:function(a,b){return new P.aJ(C.b.C(this.a,b.gd0()))},
N:function(a,b){return C.b.N(this.a,b.gd0())},
bu:function(a,b){return C.b.bu(this.a,b.gd0())},
a1:function(a,b){if(b==null)return!1
if(!(b instanceof P.aJ))return!1
return this.a===b.a},
gZ:function(a){return this.a&0x1FFFFFFF},
b7:function(a,b){return C.b.b7(this.a,b.a)},
n:function(a){var z,y,x,w,v
z=new P.fP()
y=this.a
if(y<0)return"-"+new P.aJ(0-y).n(0)
x=z.$1(C.b.aH(y,6e7)%60)
w=z.$1(C.b.aH(y,1e6)%60)
v=new P.fO().$1(y%1e6)
return""+C.b.aH(y,36e8)+":"+H.d(x)+":"+H.d(w)+"."+H.d(v)},
$isy:1,
$asy:function(){return[P.aJ]},
F:{
dh:function(a,b,c,d,e,f){return new P.aJ(864e8*a+36e8*b+6e7*e+1e6*f+1000*d+c)}}},
fO:{"^":"k:4;",
$1:function(a){if(a>=1e5)return""+a
if(a>=1e4)return"0"+a
if(a>=1000)return"00"+a
if(a>=100)return"000"+a
if(a>=10)return"0000"+a
return"00000"+a}},
fP:{"^":"k:4;",
$1:function(a){if(a>=10)return""+a
return"0"+a}},
E:{"^":"c;"},
dQ:{"^":"E;",
n:function(a){return"Throw of null."}},
ai:{"^":"E;a,b,c,d",
gc1:function(){return"Invalid argument"+(!this.a?"(s)":"")},
gc0:function(){return""},
n:function(a){var z,y,x,w,v,u
z=this.c
y=z!=null?" ("+z+")":""
z=this.d
x=z==null?"":": "+z
w=this.gc1()+y+x
if(!this.a)return w
v=this.gc0()
u=P.dm(this.b)
return w+v+": "+H.d(u)},
F:{
d2:function(a){return new P.ai(!1,null,null,a)},
d3:function(a,b,c){return new P.ai(!0,a,b,c)}}},
dV:{"^":"ai;e,f,a,b,c,d",
gc1:function(){return"RangeError"},
gc0:function(){var z,y,x
z=this.e
if(z==null){z=this.f
y=z!=null?": Not less than or equal to "+H.d(z):""}else{x=this.f
if(x==null)y=": Not greater than or equal to "+H.d(z)
else if(x>z)y=": Not in range "+H.d(z)+".."+H.d(x)+", inclusive"
else y=x<z?": Valid value range is empty":": Only valid value is "+H.d(z)}return y},
F:{
bE:function(a,b,c){return new P.dV(null,null,!0,a,b,"Value not in range")},
a7:function(a,b,c,d,e){return new P.dV(b,c,!0,a,d,"Invalid value")},
cr:function(a,b,c,d,e,f){if(0>a||a>c)throw H.e(P.a7(a,0,c,"start",f))
if(a>b||b>c)throw H.e(P.a7(b,a,c,"end",f))
return b}}},
h2:{"^":"ai;e,v:f>,a,b,c,d",
gc1:function(){return"RangeError"},
gc0:function(){if(J.cX(this.b,0))return": index must not be negative"
var z=this.f
if(z===0)return": no indices are valid"
return": index should be less than "+H.d(z)},
F:{
aM:function(a,b,c,d,e){var z=e!=null?e:J.aq(b)
return new P.h2(b,z,!0,a,c,"Index out of range")}}},
O:{"^":"E;a",
n:function(a){return"Unsupported operation: "+this.a}},
et:{"^":"E;a",
n:function(a){var z=this.a
return z!=null?"UnimplementedError: "+z:"UnimplementedError"}},
b9:{"^":"E;a",
n:function(a){return"Bad state: "+this.a}},
X:{"^":"E;a",
n:function(a){var z=this.a
if(z==null)return"Concurrent modification during iteration."
return"Concurrent modification during iteration: "+H.d(P.dm(z))+"."}},
e1:{"^":"c;",
n:function(a){return"Stack Overflow"},
$isE:1},
fB:{"^":"E;a",
n:function(a){var z=this.a
return z==null?"Reading static variable during its initialization":"Reading static variable '"+z+"' during its initialization"}},
j6:{"^":"c;a",
n:function(a){var z=this.a
if(z==null)return"Exception"
return"Exception: "+H.d(z)}},
fX:{"^":"c;a,b",
n:function(a){return"Expando:"+H.d(this.a)},
i:function(a,b){var z,y
z=this.b
if(typeof z!=="string"){if(b==null||typeof b==="boolean"||typeof b==="number"||typeof b==="string")H.x(P.d3(b,"Expandos are not allowed on strings, numbers, booleans or null",null))
return z.get(b)}y=H.cp(b,"expando$values")
return y==null?null:H.cp(y,z)},
q:function(a,b,c){var z,y
z=this.b
if(typeof z!=="string")z.set(b,c)
else{y=H.cp(b,"expando$values")
if(y==null){y=new P.c()
H.dT(b,"expando$values",y)}H.dT(y,z,c)}}},
m:{"^":"V;",$isy:1,
$asy:function(){return[P.V]}},
"+int":0,
a4:{"^":"c;$ti",
ct:["eF",function(a,b){return new H.ex(this,b,[H.ap(this,"a4",0)])}],
gv:function(a){var z,y
z=this.ga5(this)
for(y=0;z.P();)++y
return y},
gb0:function(a){var z,y
z=this.ga5(this)
if(!z.P())throw H.e(H.cb())
y=z.gT()
if(z.P())throw H.e(H.hh())
return y},
am:function(a,b){var z,y,x
if(b<0)H.x(P.a7(b,0,null,"index",null))
for(z=this.ga5(this),y=0;z.P();){x=z.gT()
if(b===y)return x;++y}throw H.e(P.aM(b,this,"index",null,y))},
n:function(a){return P.hf(this,"(",")")}},
dv:{"^":"c;"},
l:{"^":"c;$ti",$isi:1,$asi:null,$asl:null},
"+List":0,
ad:{"^":"c;",
gZ:function(a){return P.c.prototype.gZ.call(this,this)},
n:function(a){return"null"}},
"+Null":0,
V:{"^":"c;",$isy:1,
$asy:function(){return[P.V]}},
"+num":0,
c:{"^":";",
a1:function(a,b){return this===b},
gZ:function(a){return H.an(this)},
n:function(a){return H.bD(this)},
toString:function(){return this.n(this)}},
cv:{"^":"c;"},
bH:{"^":"c;a,b",
bx:function(a){if(this.b!=null){this.a=this.a+($.w.$0()-this.b)
this.b=null}}},
A:{"^":"c;",$isy:1,
$asy:function(){return[P.A]}},
"+String":0,
cw:{"^":"c;b3:a<",
gv:function(a){return this.a.length},
n:function(a){var z=this.a
return z.charCodeAt(0)==0?z:z},
F:{
e2:function(a,b,c){var z=J.aV(b)
if(!z.P())return a
if(c.length===0){do a+=H.d(z.gT())
while(z.P())}else{a+=H.d(z.gT())
for(;z.P();)a=a+c+H.d(z.gT())}return a}}}}],["","",,W,{"^":"",
dj:function(a,b,c){var z,y
z=document.body
y=(z&&C.G).ao(z,a,b,c)
y.toString
z=new H.ex(new W.a_(y),new W.jX(),[W.q])
return z.gb0(z)},
aL:function(a){var z,y,x
z="element tag unavailable"
try{y=J.fc(a)
if(typeof y==="string")z=a.tagName}catch(x){H.G(x)}return z},
j1:function(a,b){return document.createElement(a)},
jJ:function(a){if(a==null)return
return W.eA(a)},
cN:function(a){var z=$.u
if(z===C.h)return a
return z.dk(a)},
z:{"^":"at;","%":"HTMLBRElement|HTMLBaseElement|HTMLButtonElement|HTMLContentElement|HTMLDListElement|HTMLDataListElement|HTMLDetailsElement|HTMLDialogElement|HTMLDirectoryElement|HTMLDivElement|HTMLFieldSetElement|HTMLFontElement|HTMLFrameElement|HTMLHRElement|HTMLHeadElement|HTMLHeadingElement|HTMLHtmlElement|HTMLKeygenElement|HTMLLIElement|HTMLLabelElement|HTMLLegendElement|HTMLLinkElement|HTMLMapElement|HTMLMarqueeElement|HTMLMenuElement|HTMLMenuItemElement|HTMLMetaElement|HTMLMeterElement|HTMLModElement|HTMLOListElement|HTMLOptGroupElement|HTMLOptionElement|HTMLOutputElement|HTMLParagraphElement|HTMLParamElement|HTMLPictureElement|HTMLPreElement|HTMLProgressElement|HTMLQuoteElement|HTMLScriptElement|HTMLShadowElement|HTMLSlotElement|HTMLSourceElement|HTMLSpanElement|HTMLStyleElement|HTMLTableCaptionElement|HTMLTableCellElement|HTMLTableColElement|HTMLTableDataCellElement|HTMLTableHeaderCellElement|HTMLTextAreaElement|HTMLTitleElement|HTMLTrackElement|HTMLUListElement|HTMLUnknownElement;HTMLElement"},
kv:{"^":"z;",
n:function(a){return String(a)},
$ish:1,
"%":"HTMLAnchorElement"},
kx:{"^":"z;",
n:function(a){return String(a)},
$ish:1,
"%":"HTMLAreaElement"},
c_:{"^":"z;",$ish:1,$isc_:1,"%":"HTMLBodyElement"},
d6:{"^":"z;aw:height}",$isd6:1,"%":"HTMLCanvasElement"},
ky:{"^":"q;v:length=",$ish:1,"%":"CDATASection|CharacterData|Comment|ProcessingInstruction|Text"},
kC:{"^":"q;",$ish:1,"%":"DocumentFragment|ShadowRoot"},
kD:{"^":"h;",
n:function(a){return String(a)},
"%":"DOMException"},
at:{"^":"q;i3:tagName=",
gfP:function(a){return new W.j0(a)},
n:function(a){return a.localName},
ao:["bX",function(a,b,c,d){var z,y,x,w,v
if(c==null){z=$.dl
if(z==null){z=H.f([],[W.dN])
y=new W.dO(z)
z.push(W.eD(null))
z.push(W.eI())
$.dl=y
d=y}else d=z
z=$.dk
if(z==null){z=new W.eJ(d)
$.dk=z
c=z}else{z.a=d
c=z}}if($.ab==null){z=document
y=z.implementation.createHTMLDocument("")
$.ab=y
$.c8=y.createRange()
y=$.ab
y.toString
x=y.createElement("base")
x.href=z.baseURI
$.ab.head.appendChild(x)}z=$.ab
if(z.body==null){z.toString
y=z.createElement("body")
z.body=y}z=$.ab
if(!!this.$isc_)w=z.body
else{y=a.tagName
z.toString
w=z.createElement(y)
$.ab.body.appendChild(w)}if("createContextualFragment" in window.Range.prototype&&!C.d.a6(C.ac,a.tagName)){$.c8.selectNodeContents(w)
v=$.c8.createContextualFragment(b)}else{w.innerHTML=b
v=$.ab.createDocumentFragment()
for(;z=w.firstChild,z!=null;)v.appendChild(z)}z=$.ab.body
if(w==null?z!=null:w!==z)J.fe(w)
c.cH(v)
document.adoptNode(v)
return v},function(a,b,c){return this.ao(a,b,c,null)},"h3",null,null,"git",2,5,null],
sdD:function(a,b){this.bT(a,b)},
bU:function(a,b,c,d){a.textContent=null
a.appendChild(this.ao(a,b,c,d))},
bT:function(a,b){return this.bU(a,b,null,null)},
$ish:1,
$isc:1,
$isat:1,
$isq:1,
"%":";Element"},
jX:{"^":"k:1;",
$1:function(a){return!!J.t(a).$isat}},
kE:{"^":"z;aw:height}","%":"HTMLEmbedElement"},
fW:{"^":"h;","%":"AnimationEvent|AnimationPlayerEvent|ApplicationCacheErrorEvent|AudioProcessingEvent|AutocompleteErrorEvent|BeforeInstallPromptEvent|BeforeUnloadEvent|BlobEvent|ClipboardEvent|CloseEvent|CustomEvent|DeviceLightEvent|DeviceMotionEvent|DeviceOrientationEvent|ErrorEvent|ExtendableEvent|ExtendableMessageEvent|FetchEvent|FontFaceSetLoadEvent|GamepadEvent|GeofencingEvent|HashChangeEvent|IDBVersionChangeEvent|InstallEvent|MIDIConnectionEvent|MIDIMessageEvent|MediaEncryptedEvent|MediaKeyMessageEvent|MediaQueryListEvent|MediaStreamEvent|MediaStreamTrackEvent|MessageEvent|NotificationEvent|OfflineAudioCompletionEvent|PageTransitionEvent|PopStateEvent|PresentationConnectionAvailableEvent|PresentationConnectionCloseEvent|ProgressEvent|PromiseRejectionEvent|PushEvent|RTCDTMFToneChangeEvent|RTCDataChannelEvent|RTCIceCandidateEvent|RTCPeerConnectionIceEvent|RelatedEvent|ResourceProgressEvent|SecurityPolicyViolationEvent|ServicePortConnectEvent|ServiceWorkerMessageEvent|SpeechRecognitionError|SpeechRecognitionEvent|SpeechSynthesisEvent|StorageEvent|SyncEvent|TrackEvent|TransitionEvent|USBConnectionEvent|WebGLContextEvent|WebKitTransitionEvent;Event|InputEvent"},
c9:{"^":"h;",
f8:function(a,b,c,d){return a.addEventListener(b,H.aB(c,1),!1)},
"%":"MediaStream;EventTarget"},
kZ:{"^":"z;v:length=","%":"HTMLFormElement"},
l2:{"^":"z;aw:height}","%":"HTMLIFrameElement"},
l3:{"^":"z;aw:height}","%":"HTMLImageElement"},
l5:{"^":"z;aw:height}",$ish:1,$isat:1,"%":"HTMLInputElement"},
bx:{"^":"iF;",$isc:1,$isbx:1,"%":"KeyboardEvent"},
l8:{"^":"h;",
n:function(a){return String(a)},
"%":"Location"},
hy:{"^":"z;","%":"HTMLAudioElement;HTMLMediaElement"},
lb:{"^":"hz;",
ik:function(a,b,c){return a.send(b,c)},
aC:function(a,b){return a.send(b)},
"%":"MIDIOutput"},
hz:{"^":"c9;","%":"MIDIInput;MIDIPort"},
lm:{"^":"h;",$ish:1,"%":"Navigator"},
a_:{"^":"dC;a",
gb0:function(a){var z,y
z=this.a
y=z.childNodes.length
if(y===0)throw H.e(new P.b9("No elements"))
if(y>1)throw H.e(new P.b9("More than one element"))
return z.firstChild},
aI:function(a,b){var z,y,x,w
z=b.a
y=this.a
if(z!==y)for(x=z.childNodes.length,w=0;w<x;++w)y.appendChild(z.firstChild)
return},
q:function(a,b,c){var z=this.a
z.replaceChild(c,z.childNodes[b])},
ga5:function(a){var z=this.a.childNodes
return new W.dq(z,z.length,-1,null)},
gv:function(a){return this.a.childNodes.length},
i:function(a,b){return this.a.childNodes[b]},
$asi:function(){return[W.q]},
$asdC:function(){return[W.q]},
$asl:function(){return[W.q]}},
q:{"^":"c9;ba:parentElement=,hP:previousSibling=",
hW:function(a){var z=a.parentNode
if(z!=null)z.removeChild(a)},
n:function(a){var z=a.nodeValue
return z==null?this.eE(a):z},
$isc:1,
$isq:1,
"%":"Attr|Document|HTMLDocument|XMLDocument;Node"},
ln:{"^":"h5;",
gv:function(a){return a.length},
i:function(a,b){if(b>>>0!==b||b>=a.length)throw H.e(P.aM(b,a,null,null,null))
return a[b]},
q:function(a,b,c){throw H.e(new P.O("Cannot assign element of immutable List."))},
am:function(a,b){return a[b]},
$isI:1,
$asI:function(){return[W.q]},
$isi:1,
$asi:function(){return[W.q]},
$isT:1,
$asT:function(){return[W.q]},
$isl:1,
$asl:function(){return[W.q]},
"%":"NodeList|RadioNodeList"},
lo:{"^":"z;aw:height}","%":"HTMLObjectElement"},
lA:{"^":"z;v:length=","%":"HTMLSelectElement"},
is:{"^":"z;",
ao:function(a,b,c,d){var z,y
if("createContextualFragment" in window.Range.prototype)return this.bX(a,b,c,d)
z=W.dj("<table>"+b+"</table>",c,d)
y=document.createDocumentFragment()
y.toString
z.toString
new W.a_(y).aI(0,new W.a_(z))
return y},
"%":"HTMLTableElement"},
lD:{"^":"z;",
ao:function(a,b,c,d){var z,y,x,w
if("createContextualFragment" in window.Range.prototype)return this.bX(a,b,c,d)
z=document
y=z.createDocumentFragment()
z=C.V.ao(z.createElement("table"),b,c,d)
z.toString
z=new W.a_(z)
x=z.gb0(z)
x.toString
z=new W.a_(x)
w=z.gb0(z)
y.toString
w.toString
new W.a_(y).aI(0,new W.a_(w))
return y},
"%":"HTMLTableRowElement"},
lE:{"^":"z;",
ao:function(a,b,c,d){var z,y,x
if("createContextualFragment" in window.Range.prototype)return this.bX(a,b,c,d)
z=document
y=z.createDocumentFragment()
z=C.V.ao(z.createElement("table"),b,c,d)
z.toString
z=new W.a_(z)
x=z.gb0(z)
y.toString
x.toString
new W.a_(y).aI(0,new W.a_(x))
return y},
"%":"HTMLTableSectionElement"},
e5:{"^":"z;",
bU:function(a,b,c,d){var z
a.textContent=null
z=this.ao(a,b,c,d)
a.content.appendChild(z)},
bT:function(a,b){return this.bU(a,b,null,null)},
$ise5:1,
"%":"HTMLTemplateElement"},
iF:{"^":"fW;","%":"CompositionEvent|DragEvent|FocusEvent|MouseEvent|PointerEvent|SVGZoomEvent|TextEvent|TouchEvent|WheelEvent;UIEvent"},
lI:{"^":"hy;aw:height}","%":"HTMLVideoElement"},
iN:{"^":"c9;",
da:function(a,b){return a.requestAnimationFrame(H.aB(b,1))},
d1:function(a){if(!!(a.requestAnimationFrame&&a.cancelAnimationFrame))return;(function(b){var z=['ms','moz','webkit','o']
for(var y=0;y<z.length&&!b.requestAnimationFrame;++y){b.requestAnimationFrame=b[z[y]+'RequestAnimationFrame']
b.cancelAnimationFrame=b[z[y]+'CancelAnimationFrame']||b[z[y]+'CancelRequestAnimationFrame']}if(b.requestAnimationFrame&&b.cancelAnimationFrame)return
b.requestAnimationFrame=function(c){return window.setTimeout(function(){c(Date.now())},16)}
b.cancelAnimationFrame=function(c){clearTimeout(c)}})(a)},
gba:function(a){return W.jJ(a.parent)},
$ish:1,
"%":"DOMWindow|Window"},
lP:{"^":"q;",$ish:1,"%":"DocumentType"},
lS:{"^":"z;",$ish:1,"%":"HTMLFrameSetElement"},
lV:{"^":"h6;",
gv:function(a){return a.length},
i:function(a,b){if(b>>>0!==b||b>=a.length)throw H.e(P.aM(b,a,null,null,null))
return a[b]},
q:function(a,b,c){throw H.e(new P.O("Cannot assign element of immutable List."))},
am:function(a,b){return a[b]},
$isI:1,
$asI:function(){return[W.q]},
$isi:1,
$asi:function(){return[W.q]},
$isT:1,
$asT:function(){return[W.q]},
$isl:1,
$asl:function(){return[W.q]},
"%":"MozNamedAttrMap|NamedNodeMap"},
iZ:{"^":"c;fo:a<",
gb9:function(){var z,y,x,w,v
z=this.a.attributes
y=H.f([],[P.A])
for(x=z.length,w=0;w<x;++w){v=z[w]
if(v.namespaceURI==null)y.push(v.name)}return y}},
j0:{"^":"iZ;a",
i:function(a,b){return this.a.getAttribute(b)},
q:function(a,b,c){this.a.setAttribute(b,c)},
gv:function(a){return this.gb9().length}},
lQ:{"^":"ik;a,b,c,$ti",
hH:function(a,b,c,d){return W.cE(this.a,this.b,a,!1,H.ag(this,0))}},
j4:{"^":"il;a,b,c,d,e,$ti",
fK:function(){var z,y,x
z=this.d
y=z!=null
if(y&&this.a<=0){x=this.b
x.toString
if(y)J.f7(x,this.c,z,!1)}},
f4:function(a,b,c,d,e){this.fK()},
F:{
cE:function(a,b,c,d,e){var z=W.cN(new W.j5(c))
z=new W.j4(0,a,b,z,!1,[e])
z.f4(a,b,c,!1,e)
return z}}},
j5:{"^":"k:1;a",
$1:function(a){return this.a.$1(a)}},
cH:{"^":"c;a",
b5:function(a){return $.$get$eE().a6(0,W.aL(a))},
aS:function(a,b,c){var z,y,x
z=W.aL(a)
y=$.$get$cI()
x=y.i(0,H.d(z)+"::"+b)
if(x==null)x=y.i(0,"*::"+b)
if(x==null)return!1
return x.$4(a,b,c,this)},
f5:function(a){var z,y
z=$.$get$cI()
if(z.gbn(z)){for(y=0;y<262;++y)z.q(0,C.ab[y],W.k5())
for(y=0;y<12;++y)z.q(0,C.A[y],W.k6())}},
F:{
eD:function(a){var z,y
z=document.createElement("a")
y=new W.jy(z,window.location)
y=new W.cH(y)
y.f5(a)
return y},
lT:[function(a,b,c,d){return!0},"$4","k5",8,0,7],
lU:[function(a,b,c,d){var z,y,x,w,v
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
return z},"$4","k6",8,0,7]}},
dr:{"^":"c;$ti",
ga5:function(a){return new W.dq(a,this.gv(a),-1,null)},
$isi:1,
$asi:null,
$isl:1,
$asl:null},
dO:{"^":"c;a",
b5:function(a){return C.d.di(this.a,new W.hM(a))},
aS:function(a,b,c){return C.d.di(this.a,new W.hL(a,b,c))}},
hM:{"^":"k:1;a",
$1:function(a){return a.b5(this.a)}},
hL:{"^":"k:1;a,b,c",
$1:function(a){return a.aS(this.a,this.b,this.c)}},
jz:{"^":"c;",
b5:function(a){return this.a.a6(0,W.aL(a))},
aS:["eH",function(a,b,c){var z,y
z=W.aL(a)
y=this.c
if(y.a6(0,H.d(z)+"::"+b))return this.d.fN(c)
else if(y.a6(0,"*::"+b))return this.d.fN(c)
else{y=this.b
if(y.a6(0,H.d(z)+"::"+b))return!0
else if(y.a6(0,"*::"+b))return!0
else if(y.a6(0,H.d(z)+"::*"))return!0
else if(y.a6(0,"*::*"))return!0}return!1}],
f6:function(a,b,c,d){var z,y,x
this.a.aI(0,c)
z=b.ct(0,new W.jA())
y=b.ct(0,new W.jB())
this.b.aI(0,z)
x=this.c
x.aI(0,C.ad)
x.aI(0,y)}},
jA:{"^":"k:1;",
$1:function(a){return!C.d.a6(C.A,a)}},
jB:{"^":"k:1;",
$1:function(a){return C.d.a6(C.A,a)}},
jE:{"^":"jz;e,a,b,c,d",
aS:function(a,b,c){if(this.eH(a,b,c))return!0
if(b==="template"&&c==="")return!0
if(a.getAttribute("template")==="")return this.e.a6(0,b)
return!1},
F:{
eI:function(){var z=P.A
z=new W.jE(P.dB(C.z,z),P.Y(null,null,null,z),P.Y(null,null,null,z),P.Y(null,null,null,z),null)
z.f6(null,new H.cj(C.z,new W.jF(),[H.ag(C.z,0),null]),["TEMPLATE"],null)
return z}}},
jF:{"^":"k:1;",
$1:function(a){return"TEMPLATE::"+H.d(a)}},
jD:{"^":"c;",
b5:function(a){var z=J.t(a)
if(!!z.$isdY)return!1
z=!!z.$iso
if(z&&W.aL(a)==="foreignObject")return!1
if(z)return!0
return!1},
aS:function(a,b,c){if(b==="is"||C.x.ex(b,"on"))return!1
return this.b5(a)}},
dq:{"^":"c;a,b,c,d",
P:function(){var z,y
z=this.c+1
y=this.b
if(z<y){this.d=J.cY(this.a,z)
this.c=z
return!0}this.d=null
this.c=y
return!1},
gT:function(){return this.d}},
j_:{"^":"c;a",
gba:function(a){return W.eA(this.a.parent)},
$ish:1,
F:{
eA:function(a){if(a===window)return a
else return new W.j_(a)}}},
dN:{"^":"c;"},
jy:{"^":"c;a,b"},
eJ:{"^":"c;a",
cH:function(a){new W.jG(this).$2(a,null)},
bF:function(a,b){var z
if(b==null){z=a.parentNode
if(z!=null)z.removeChild(a)}else b.removeChild(a)},
fF:function(a,b){var z,y,x,w,v,u,t,s
z=!0
y=null
x=null
try{y=J.f9(a)
x=y.gfo().getAttribute("is")
w=function(c){if(!(c.attributes instanceof NamedNodeMap))return true
var r=c.childNodes
if(c.lastChild&&c.lastChild!==r[r.length-1])return true
if(c.children)if(!(c.children instanceof HTMLCollection||c.children instanceof NodeList))return true
var q=0
if(c.children)q=c.children.length
for(var p=0;p<q;p++){var o=c.children[p]
if(o.id=='attributes'||o.name=='attributes'||o.id=='lastChild'||o.name=='lastChild'||o.id=='children'||o.name=='children')return true}return false}(a)
z=w?!0:!(a.attributes instanceof NamedNodeMap)}catch(t){H.G(t)}v="element unprintable"
try{v=J.aa(a)}catch(t){H.G(t)}try{u=W.aL(a)
this.fE(a,b,z,v,u,y,x)}catch(t){if(H.G(t) instanceof P.ai)throw t
else{this.bF(a,b)
window
s="Removing corrupted element "+H.d(v)
if(typeof console!="undefined")console.warn(s)}}},
fE:function(a,b,c,d,e,f,g){var z,y,x,w,v
if(c){this.bF(a,b)
window
z="Removing element due to corrupted attributes on <"+d+">"
if(typeof console!="undefined")console.warn(z)
return}if(!this.a.b5(a)){this.bF(a,b)
window
z="Removing disallowed element <"+H.d(e)+"> from "+J.aa(b)
if(typeof console!="undefined")console.warn(z)
return}if(g!=null)if(!this.a.aS(a,"is",g)){this.bF(a,b)
window
z="Removing disallowed type extension <"+H.d(e)+' is="'+g+'">'
if(typeof console!="undefined")console.warn(z)
return}z=f.gb9()
y=H.f(z.slice(0),[H.ag(z,0)])
for(x=f.gb9().length-1,z=f.a;x>=0;--x){w=y[x]
if(!this.a.aS(a,J.fg(w),z.getAttribute(w))){window
v="Removing disallowed attribute <"+H.d(e)+" "+w+'="'+H.d(z.getAttribute(w))+'">'
if(typeof console!="undefined")console.warn(v)
z.getAttribute(w)
z.removeAttribute(w)}}if(!!J.t(a).$ise5)this.cH(a.content)}},
jG:{"^":"k:14;a",
$2:function(a,b){var z,y,x,w
switch(a.nodeType){case 1:this.a.fF(a,b)
break
case 8:case 11:case 3:case 4:break
default:if(b==null){x=a.parentNode
if(x!=null)x.removeChild(a)}else b.removeChild(a)}z=a.lastChild
for(;null!=z;){y=null
try{y=J.fb(z)}catch(w){H.G(w)
x=z
a.removeChild(x)
z=null
y=a.lastChild}if(z!=null)this.$2(z,a)
z=y}}},
h3:{"^":"h+aO;",$isi:1,
$asi:function(){return[W.q]},
$isl:1,
$asl:function(){return[W.q]}},
h4:{"^":"h+aO;",$isi:1,
$asi:function(){return[W.q]},
$isl:1,
$asl:function(){return[W.q]}},
h5:{"^":"h3+dr;",$isi:1,
$asi:function(){return[W.q]},
$isl:1,
$asl:function(){return[W.q]}},
h6:{"^":"h4+dr;",$isi:1,
$asi:function(){return[W.q]},
$isl:1,
$asl:function(){return[W.q]}}}],["","",,P,{"^":""}],["","",,P,{"^":"",ku:{"^":"au;",$ish:1,"%":"SVGAElement"},kw:{"^":"o;",$ish:1,"%":"SVGAnimateElement|SVGAnimateMotionElement|SVGAnimateTransformElement|SVGAnimationElement|SVGSetElement"},kF:{"^":"o;D:x=,E:y=",$ish:1,"%":"SVGFEBlendElement"},kG:{"^":"o;D:x=,E:y=",$ish:1,"%":"SVGFEColorMatrixElement"},kH:{"^":"o;D:x=,E:y=",$ish:1,"%":"SVGFEComponentTransferElement"},kI:{"^":"o;D:x=,E:y=",$ish:1,"%":"SVGFECompositeElement"},kJ:{"^":"o;D:x=,E:y=",$ish:1,"%":"SVGFEConvolveMatrixElement"},kK:{"^":"o;D:x=,E:y=",$ish:1,"%":"SVGFEDiffuseLightingElement"},kL:{"^":"o;D:x=,E:y=",$ish:1,"%":"SVGFEDisplacementMapElement"},kM:{"^":"o;D:x=,E:y=",$ish:1,"%":"SVGFEFloodElement"},kN:{"^":"o;D:x=,E:y=",$ish:1,"%":"SVGFEGaussianBlurElement"},kO:{"^":"o;D:x=,E:y=",$ish:1,"%":"SVGFEImageElement"},kP:{"^":"o;D:x=,E:y=",$ish:1,"%":"SVGFEMergeElement"},kQ:{"^":"o;D:x=,E:y=",$ish:1,"%":"SVGFEMorphologyElement"},kR:{"^":"o;D:x=,E:y=",$ish:1,"%":"SVGFEOffsetElement"},kS:{"^":"o;D:x=,E:y=","%":"SVGFEPointLightElement"},kT:{"^":"o;D:x=,E:y=",$ish:1,"%":"SVGFESpecularLightingElement"},kU:{"^":"o;D:x=,E:y=","%":"SVGFESpotLightElement"},kV:{"^":"o;D:x=,E:y=",$ish:1,"%":"SVGFETileElement"},kW:{"^":"o;D:x=,E:y=",$ish:1,"%":"SVGFETurbulenceElement"},kX:{"^":"o;D:x=,E:y=",$ish:1,"%":"SVGFilterElement"},kY:{"^":"au;D:x=,E:y=","%":"SVGForeignObjectElement"},h1:{"^":"au;","%":"SVGCircleElement|SVGEllipseElement|SVGLineElement|SVGPathElement|SVGPolygonElement|SVGPolylineElement;SVGGeometryElement"},au:{"^":"o;",$ish:1,"%":"SVGClipPathElement|SVGDefsElement|SVGGElement|SVGSwitchElement;SVGGraphicsElement"},l4:{"^":"au;D:x=,E:y=",$ish:1,"%":"SVGImageElement"},l9:{"^":"o;",$ish:1,"%":"SVGMarkerElement"},la:{"^":"o;D:x=,E:y=",$ish:1,"%":"SVGMaskElement"},ls:{"^":"o;D:x=,E:y=",$ish:1,"%":"SVGPatternElement"},lt:{"^":"h;v:length=","%":"SVGPointList"},lx:{"^":"h;aw:height},D:x=,E:y=","%":"SVGRect"},ly:{"^":"h1;D:x=,E:y=","%":"SVGRectElement"},dY:{"^":"o;",$ish:1,$isdY:1,"%":"SVGScriptElement"},o:{"^":"at;",
sdD:function(a,b){this.bT(a,b)},
ao:function(a,b,c,d){var z,y,x,w,v,u
z=H.f([],[W.dN])
z.push(W.eD(null))
z.push(W.eI())
z.push(new W.jD())
c=new W.eJ(new W.dO(z))
y='<svg version="1.1">'+b+"</svg>"
z=document
x=z.body
w=(x&&C.G).h3(x,y,c)
v=z.createDocumentFragment()
w.toString
z=new W.a_(w)
u=z.gb0(z)
for(;z=u.firstChild,z!=null;)v.appendChild(z)
return v},
$ish:1,
$iso:1,
"%":"SVGComponentTransferFunctionElement|SVGDescElement|SVGDiscardElement|SVGFEDistantLightElement|SVGFEFuncAElement|SVGFEFuncBElement|SVGFEFuncGElement|SVGFEFuncRElement|SVGFEMergeNodeElement|SVGMetadataElement|SVGStopElement|SVGStyleElement|SVGTitleElement;SVGElement"},lB:{"^":"au;D:x=,E:y=",$ish:1,"%":"SVGSVGElement"},lC:{"^":"o;",$ish:1,"%":"SVGSymbolElement"},e6:{"^":"au;","%":";SVGTextContentElement"},lF:{"^":"e6;",$ish:1,"%":"SVGTextPathElement"},lG:{"^":"e6;D:x=,E:y=","%":"SVGTSpanElement|SVGTextElement|SVGTextPositioningElement"},lH:{"^":"au;D:x=,E:y=",$ish:1,"%":"SVGUseElement"},lJ:{"^":"o;",$ish:1,"%":"SVGViewElement"},lR:{"^":"o;",$ish:1,"%":"SVGGradientElement|SVGLinearGradientElement|SVGRadialGradientElement"},lW:{"^":"o;",$ish:1,"%":"SVGCursorElement"},lX:{"^":"o;",$ish:1,"%":"SVGFEDropShadowElement"},lY:{"^":"o;",$ish:1,"%":"SVGMPathElement"}}],["","",,P,{"^":"",fZ:{"^":"c;",$isi:1,
$asi:function(){return[P.a9]},
$isl:1,
$asl:function(){return[P.a9]}}}],["","",,P,{"^":""}],["","",,P,{"^":""}],["","",,P,{"^":""}],["","",,V,{"^":"",
hm:function(a,a0){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b
switch(a0.a){case C.Q:H.p(a0,"$isld")
z=new E.a(new Float64Array(H.b(2)))
y=new E.a(new Float64Array(H.b(2)))
x=new E.a(new Float64Array(H.b(2)))
w=new V.hB(z,y,0,0,0,x,0,0,0,new E.a(new Float64Array(H.b(2))),new E.a(new Float64Array(H.b(2))),0,0,new E.a5(new Float64Array(H.b(4))),new E.a(new Float64Array(H.b(2))),a0.gay(a0),null,null,null,null,null,null,!1,!1,null,null)
w.ai(a.ch,a0)
y.h(a0.giM(a0))
G.cB(w.r.d,y,z)
w.fr=a0.gdG()
x.I()
w.cy=a0.gdz()
w.db=a0.gds()
return w
case C.O:H.p(a0,"$iskB")
z=new Float64Array(H.b(2))
y=new Float64Array(H.b(2))
x=new Float64Array(H.b(2))
w=new Float64Array(H.b(2))
v=new Float64Array(H.b(2))
u=new E.a(new Float64Array(H.b(2)))
u.h(a0.f)
t=new E.a(new Float64Array(H.b(2)))
t.h(a0.r)
v=new V.fM(0,0,0,u,t,0,0,0,0,0,new E.a(z),new E.a(y),new E.a(x),new E.a(w),new E.a(v),0,0,0,0,0,a0.a,null,null,null,null,null,null,!1,!1,null,null)
v.ai(a.ch,a0)
v.fx=a0.x
v.ch=a0.y
v.cx=a0.z
return v
case C.a7:H.p(a0,"$islv")
z=new Float64Array(H.b(3))
y=new Float64Array(H.b(2))
x=new Float64Array(H.b(2))
w=new Float64Array(H.b(2))
v=new Float64Array(H.b(2))
u=new Float64Array(H.b(9))
t=a0.gbo()
s=new E.a(new Float64Array(H.b(2)))
s.h(t)
t=a0.gbp()
r=new E.a(new Float64Array(H.b(2)))
r.h(t)
t=a0.ghI()
q=new E.a(new Float64Array(H.b(2)))
q.h(t)
q.S()
t=new E.a(new Float64Array(H.b(2)))
u=new V.i3(s,r,q,t,null,new E.ae(z),0,0,0,0,0,!1,!1,null,0,0,new E.a(y),new E.a(x),0,0,0,0,new E.a(w),new E.a(v),0,0,0,0,new E.al(u),0,a0.gay(a0),null,null,null,null,null,null,!1,!1,null,null)
u.ai(a.ch,a0)
q.M(1,t)
u.dx=a0.ghV()
u.fx=a0.giD()
u.fy=a0.giO()
u.go=a0.giG()
u.id=a0.ghM()
u.k1=a0.giv()
u.k2=a0.ghf()
u.k3=C.i
return u
case C.M:H.p(a0,"$isdX")
z=new E.a(new Float64Array(H.b(2)))
y=new E.a(new Float64Array(H.b(2)))
x=new V.ct(z,y,new E.ae(new Float64Array(H.b(3))),0,!1,0,0,!1,0,0,0,0,0,new E.a(new Float64Array(H.b(2))),new E.a(new Float64Array(H.b(2))),new E.a(new Float64Array(H.b(2))),new E.a(new Float64Array(H.b(2))),0,0,0,0,new E.al(new Float64Array(H.b(9))),0,C.i,a0.a,null,null,null,null,null,null,!1,!1,null,null)
x.ai(a.ch,a0)
z.h(a0.f)
y.h(a0.r)
x.fy=a0.x
x.go=a0.z
x.id=a0.Q
x.dy=a0.cy
x.fr=a0.cx
x.fx=a0.y
x.dx=!1
return x
case C.aa:H.p(a0,"$islK")
z=new Float64Array(H.b(2))
y=new Float64Array(H.b(2))
x=new Float64Array(H.b(2))
w=new Float64Array(H.b(2))
v=new Float64Array(H.b(9))
u=a0.gbo()
t=new E.a(new Float64Array(H.b(2)))
t.h(u)
u=a0.gbp()
s=new E.a(new Float64Array(H.b(2)))
s.h(u)
v=new V.iK(0,0,0,t,s,0,0,new E.ae(new Float64Array(H.b(3))),0,0,new E.a(z),new E.a(y),new E.a(x),new E.a(w),0,0,0,0,new E.al(v),a0.gay(a0),null,null,null,null,null,null,!1,!1,null,null)
v.ai(a.ch,a0)
v.dy=a0.ghV()
v.ch=a0.gdz()
v.cx=a0.gds()
return v
case C.R:H.p(a0,"$isl_")
z=new Float64Array(H.b(2))
y=new Float64Array(H.b(2))
x=new Float64Array(H.b(2))
w=new Float64Array(H.b(2))
v=new Float64Array(H.b(4))
u=a0.gbo()
t=new E.a(new Float64Array(H.b(2)))
t.h(u)
u=a0.gbp()
s=new E.a(new Float64Array(H.b(2)))
s.h(u)
v=new V.h_(t,s,new E.a(new Float64Array(H.b(2))),0,0,0,0,0,new E.a(z),new E.a(y),new E.a(x),new E.a(w),0,0,0,0,new E.a5(v),0,a0.gay(a0),null,null,null,null,null,null,!1,!1,null,null)
v.ai(a.ch,a0)
v.dx=a0.gdG()
v.dy=a0.ghL()
return v
case C.a9:H.p(a0,"$islL")
z=new E.a(new Float64Array(H.b(2)))
y=new E.a(new Float64Array(H.b(2)))
x=new E.a(new Float64Array(H.b(2)))
w=new E.a(new Float64Array(H.b(2)))
v=new V.iL(0,0,z,y,x,w,0,0,0,0,0,!1,0,0,new E.a(new Float64Array(H.b(2))),new E.a(new Float64Array(H.b(2))),0,0,0,0,new E.a(new Float64Array(H.b(2))),new E.a(new Float64Array(H.b(2))),0,0,0,0,0,0,0,0,0,new E.a(new Float64Array(H.b(2))),new E.a(new Float64Array(H.b(2))),new E.a(new Float64Array(H.b(2))),a0.gay(a0),null,null,null,null,null,null,!1,!1,null,null)
v.ai(a.ch,a0)
z.h(a0.gbo())
y.h(a0.gbp())
x.h(a0.ghI())
x.M(1,w)
v.a_=0
v.fx=0
v.go=a0.giH()
v.id=a0.ghM()
v.k1=a0.ghf()
v.ch=a0.gdz()
v.cx=a0.gds()
return v
case C.a8:H.p(a0,"$isl1")
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
n=a0.gck()
m=a0.gcl()
l=a0.gck().e0()
k=a0.gcl().e0()
j=a0.gck().dT()
i=a0.gcl().dT()
o=new V.h0(n,m,l,k,j,i,z,y,x,w,v,u,0,0,0,0,0,0,0,0,0,new E.a(t),new E.a(s),new E.a(r),new E.a(q),0,0,0,0,0,0,0,0,new E.a(p),new E.a(o),0,0,0,0,0,a0.gay(a0),null,null,null,null,null,null,!1,!1,null,null)
o.ai(a.ch,a0)
n=n.dV()
o.f=n
h=n.d
g=j.gc8()
j.gaP().gm()
t=o.Q.a
s=t.a
r=t.b
q=r+1
t.b=q
r=s[r]
t.b=q+1
t=s[q]
f=a0.gck()
x.h(f.gfs())
z.h(f.gft())
o.k2=f.gfA()
v.h(f.gfu())
G.j(h.b,z,t)
t.l(0,h.a)
t.j(g.gad())
G.Z(g.gcn(),t,r)
r.j(x)
e=r.B(v)
o.Q.a.b-=2
z=m.dV()
o.r=z
d=z.d
c=i.gc8()
i.gaP().gm()
z=o.Q.a
x=z.a
v=z.b
t=v+1
z.b=t
v=x[v]
z.b=t+1
z=x[t]
f=a0.gcl()
w.h(f.gfs())
y.h(f.gft())
o.k3=f.gfA()
u.h(f.gfu())
G.j(d.b,y,z)
z.l(0,d.a)
z.j(c.gad())
G.Z(c.gcn(),z,v)
v.j(w)
b=v.B(u)
o.Q.a.b-=2
z=a0.ghT()
o.r1=z
o.k4=e+z*b
o.r2=0
return o
case C.P:H.p(a0,"$islw")
z=new E.a(new Float64Array(H.b(2)))
y=new E.a(new Float64Array(H.b(2)))
x=new E.a(new Float64Array(H.b(2)))
w=new E.a(new Float64Array(H.b(2)))
v=new V.dU(z,y,0,0,x,w,0,0,0,0,0,new E.a(new Float64Array(H.b(2))),new E.a(new Float64Array(H.b(2))),new E.a(new Float64Array(H.b(2))),new E.a(new Float64Array(H.b(2))),new E.a(new Float64Array(H.b(2))),new E.a(new Float64Array(H.b(2))),0,0,0,0,0,a0.gay(a0),null,null,null,null,null,null,!1,!1,null,null)
v.ai(a.ch,a0)
z.h(a0.gie())
y.h(a0.gig())
x.h(a0.gbo())
w.h(a0.gbp())
v.fx=a0.ghT()
v.cy=a0.ghF()
v.db=a0.ghG()
v.fr=a0.ghF().C(0,C.b.p(v.fx,a0.ghG()))
v.fy=0
return v
case C.N:return V.fv(a,H.p(a0,"$iskA"))
case C.a5:H.p(a0,"$islz")
z=new E.a(new Float64Array(H.b(2)))
y=new E.a(new Float64Array(H.b(2)))
x=new V.i9(z,y,0,0,0,0,0,new E.a(new Float64Array(H.b(2))),new E.a(new Float64Array(H.b(2))),new E.a(new Float64Array(H.b(2))),new E.a(new Float64Array(H.b(2))),new E.a(new Float64Array(H.b(2))),0,0,0,0,0,C.i,a0.gay(a0),null,null,null,null,null,null,!1,!1,null,null)
x.ai(a.ch,a0)
z.h(a0.gbo())
y.h(a0.gbp())
x.cy=a0.giF(a0)
return x
case C.a6:H.p(a0,"$islc")
z=new E.a(new Float64Array(H.b(2)))
y=new V.hA(z,0,new E.a(new Float64Array(H.b(2))),0,0,0,0,0,0,new E.a(new Float64Array(H.b(2))),new E.a(new Float64Array(H.b(2))),new E.a(new Float64Array(H.b(2))),new E.a(new Float64Array(H.b(2))),new E.a(new Float64Array(H.b(2))),0,0,0,0,0,new E.a5(new Float64Array(H.b(4))),0,a0.gay(a0),null,null,null,null,null,null,!1,!1,null,null)
y.ai(a.ch,a0)
z.h(a0.giC())
y.cx=a0.gir()
y.db=0
y.dx=a0.gdG()
y.dy=a0.ghL()
y.fr=a0.gis()
return y
case C.a4:default:return}},
hY:function(a){return a.gcg(a).N(0,0)},
fw:{"^":"c;",
cL:function(a,b){var z,y,x
z=a.y
y=b.y
x=z.c
if(x===y.c&&x!==0)return x>0
return(z.b&y.a)!==0&&(z.a&y.b)!==0}},
d8:{"^":"c;a,b,c"},
fC:{"^":"c;"},
ah:{"^":"c;a,b",
cv:function(a){var z,y,x
z=this.a.a
y=this.b.a
x=a.a
x[0]=(z[0]+y[0])*0.5
x[1]=(z[1]+y[1])*0.5},
a3:function(a,b){var z,y,x,w
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
n:function(a){return"AABB["+this.a.n(0)+" . "+this.b.n(0)+"]"},
F:{
aF:function(){return new V.ah(new E.a(new Float64Array(H.b(2))),new E.a(new Float64Array(H.b(2))))},
fh:function(a,b){var z,y
z=b.a.a
y=a.b.a
if(z[0]-y[0]>0||z[1]-y[1]>0)return!1
z=a.a.a
y=b.b.a
if(z[0]-y[0]>0||z[1]-y[1]>0)return!1
return!0}}},
fD:{"^":"c;a,b,c,d,e,f,r,x,y",
i4:function(a,b){var z,y,x,w
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
cs:function(a){var z,y,x,w,v,u,t,s,r
this.x=0
for(z=this.a,y=0;y<this.e;++y){x=this.c[y]
this.y=x
if(x===-1)continue
z.hR(0,this,z.b[x].gaQ())}this.e=0
F.f1(this.f,0,this.x)
for(y=0;y<this.x;){w=this.f[y]
x=w.a
v=z.b[x].gaz()
x=w.b
a.fM(v,z.b[x].gaz());++y
for(x=this.x,u=this.f;y<x;){t=u[y]
s=t.a
r=w.a
if(s==null?r==null:s===r){s=t.b
r=w.b
r=s==null?r!=null:s!==r
s=r}else s=!0
if(s)break;++y}}},
dm:function(a){var z,y,x
z=this.e
y=this.d
if(z===y){x=this.c
z=y*2
this.d=z
z=new Array(z)
z.fixed$length=Array
z=H.f(z,[P.m])
this.c=z
C.d.a9(z,0,x.length,x,0)}z=this.c
y=this.e
z[y]=a
this.e=y+1},
dP:function(a){var z,y,x,w,v
if(a===this.y)return!0
z=this.x
y=this.r
if(z===y){x=this.f
z=y*2
this.r=z
z=new Array(z)
z.fixed$length=Array
z=H.f(z,[V.b5])
this.f=z
w=x.length
C.d.a9(z,0,w,x,0)
for(z=this.r,y=this.f;w<z;++w)y[w]=new V.b5(0,0)}z=this.y
y=this.f
v=this.x
if(a<z){y[v].sdI(a)
this.f[this.x].sdJ(this.y)}else{y[v].sdI(z)
this.f[this.x].sdJ(a)}++this.x
return!0},
eO:function(a){var z,y,x
z=new Array(this.r)
z.fixed$length=Array
z=H.f(z,[V.b5])
this.f=z
for(y=this.r,x=0;x<y;++x)z[x]=new V.b5(0,0)
this.c=P.ak(this.d,0,!1,P.m)},
F:{
fE:function(a){var z=new V.fD(a,0,null,16,0,null,16,0,-1)
z.eO(a)
return z}}},
fQ:{"^":"c;a,b,c,d,e,f,r,x,y,z,Q,ch,cx,cy",
hN:function(a,b,c){var z,y,x,w,v,u,t,s
z=this.b[a]
y=z.a
x=y.a.a
w=b.a.a
if(x[0]<=w[0])if(x[1]<=w[1]){v=b.b.a
u=y.b.a
v=v[0]<=u[0]&&v[1]<=u[1]}else v=!1
else v=!1
if(v)return!1
this.fC(z)
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
this.d6(a)
return!0},
hR:function(a,b,c){var z,y,x,w,v,u
this.x=0
z=this.r
this.x=1
z[0]=this.a
for(z=[V.aW];y=this.x,y>0;){x=this.r;--y
this.x=y
w=x[y]
if(w==null)continue
if(V.fh(w.a,c))if(w.d==null)b.dP(w.f)
else{y=this.r
x=y.length
if(x-this.x-2<=0){y=new Array(x*2)
y.fixed$length=Array
v=H.f(y,z)
y=this.r
C.d.a9(v,0,y.length,y,0)
this.r=v
y=v}x=this.x
u=x+1
this.x=u
y[x]=w.d
this.x=u+1
y[u]=w.e}}},
c_:function(a){var z=a.d
if(z==null)return 0
return 1+Math.max(this.c_(z),this.c_(a.e))},
cT:function(){var z,y,x,w,v
z=this.e
if(z===-1){y=this.b
z=this.d*=2
z=new Array(z)
z.fixed$length=Array
z=H.f(z,[V.aW])
this.b=z
C.d.a9(z,0,y.length,y,0)
for(x=this.d-1;z=this.c,x>=z;--x){z=this.b
w=new Float64Array(2)
z[x]=new V.aW(new V.ah(new E.a(w),new E.a(new Float64Array(2))),null,null,null,null,x,0)
z=this.b
w=z[x]
J.d0(w,x===this.d-1?null:z[x+1])
J.d_(this.b[x],-1)}this.e=z}v=this.b[z]
z=v.c
this.e=z!=null?z.f:-1
v.c=null
v.d=null
v.e=null
v.r=0
v.b=null;++this.c
return v},
d3:function(a){var z=this.e
a.c=z!==-1?this.b[z]:null
a.r=-1
this.e=a.f;--this.c},
d6:function(a){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g
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
w.a3(r,x)
r=2*(v[0]-u[0]+v[1]-u[1])
m=2*r
l=2*(r-2*(p-n+q-o))
if(t.d==null){w.a3(x,t.a)
k=2*(v[0]-u[0]+v[1]-u[1])+l}else{r=t.a
w.a3(x,r)
q=r.b.a
p=q[0]
r=r.a.a
o=r[0]
q=q[1]
r=r[1]
k=2*(v[0]-u[0]+v[1]-u[1])-2*(p-o+q-r)+l}if(s.d==null){w.a3(x,s.a)
j=2*(v[0]-u[0]+v[1]-u[1])+l}else{r=s.a
w.a3(x,r)
q=r.b.a
p=q[0]
r=r.a.a
o=r[0]
q=q[1]
r=r[1]
j=2*(v[0]-u[0]+v[1]-u[1])-2*(p-o+q-r)+l}if(m<k&&m<j)break
y=k<j?t:s}i=J.fa(this.b[y.f])
h=this.cT()
h.c=i
h.b=null
h.a.a3(x,y.a)
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
this.a=h}for(y=h;y!=null;){y=this.cU(y)
g=y.d
s=y.e
y.r=1+Math.max(g.r,s.r)
y.a.a3(g.a,s.a)
y=y.c}},
fC:function(a){var z,y,x,w,v,u,t
if(a===this.a){this.a=null
return}z=a.c
y=z.c
x=z.d
if(x===a)x=z.e
if(y!=null){w=y.d
if(w==null?z==null:w===z)y.d=x
else y.e=x
x.c=y
this.d3(z)
for(v=y;v!=null;){v=this.cU(v)
u=v.d
t=v.e
v.a.a3(u.a,t.a)
v.r=1+Math.max(u.r,t.r)
v=v.c}}else{this.a=x
x.c=null
this.d3(z)}},
cU:function(a){var z,y,x,w,v,u,t,s
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
u.a3(z.a,v.a)
y.a.a3(u,w.a)
z=1+Math.max(z.r,v.r)
a.r=z
y.r=1+Math.max(z,w.r)}else{y.e=v
a.e=w
w.c=a
u.a3(z.a,w.a)
y.a.a3(u,v.a)
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
u.a3(y.a,s.a)
z.a.a3(u,t.a)
u=1+Math.max(y.r,s.r)
a.r=u
z.r=1+Math.max(u,t.r)}else{z.e=s
a.d=t
t.c=a
u.a3(y.a,t.a)
z.a.a3(u,s.a)
u=1+Math.max(y.r,t.r)
a.r=u
z.r=1+Math.max(u,s.r)}return z}return a},
he:function(a){var z,y
z=this.a
if(z==null)return
y=this.c_(z)
this.cf(a,this.a,0,y)},
cf:function(a,b,c,d){var z,y,x,w,v,u
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
a.bE(y,4,x)
y=a.c
y.stroke()
v=this.cy
a.b.aB(z,v)
v=v.a
z=v[0]
v=v[1]
w=c+1
u=J.aa(b)+".id-"+w+"/"+d
a.dd(x)
y.strokeText(u,z,v)
z=b.d
if(z!=null)this.cf(a,z,w,d)
z=b.e
if(z!=null)this.cf(a,z,w,d)},
eS:function(){var z,y,x
for(z=this.d-1;z>=0;--z){y=this.b
x=new Float64Array(2)
y[z]=new V.aW(new V.ah(new E.a(x),new E.a(new Float64Array(2))),null,null,null,null,z,0)
y=this.b
x=y[z]
J.d0(x,z===this.d-1?null:y[z+1])
J.d_(this.b[z],-1)}for(y=this.f,z=0;z<4;++z)y[z]=new E.a(new Float64Array(2))},
F:{
fR:function(){var z,y
z=new Array(16)
z.fixed$length=Array
y=[V.aW]
y=new V.fQ(null,H.f(z,y),0,16,0,H.f(new Array(4),[E.a]),H.f(new Array(20),y),0,new E.a(new Float64Array(H.b(2))),V.aF(),new V.cs(new E.a(new Float64Array(H.b(2))),new E.a(new Float64Array(H.b(2))),0),V.aF(),new G.c4(0,0,0),new E.a(new Float64Array(H.b(2))))
y.eS()
return y}}},
aW:{"^":"c;aQ:a<,az:b<,ba:c*,d,e,f,aw:r'"},
b5:{"^":"c;dI:a?,dJ:b?",
b7:function(a,b){var z,y
z=this.a
y=b.a
if(z<y)return-1
if(z===y){z=this.b
y=b.b
if(z<y)z=-1
else z=z===y?0:1
return z}return 1},
$isy:1,
$asy:function(){return[V.b5]}},
eB:{"^":"c;a,b"},
W:{"^":"c;w:a<,b",
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
c7:{"^":"c;a,b",
n:function(a){return this.b}},
di:{"^":"c;a,b,c"},
it:{"^":"c;a,b,c",
f_:function(){var z,y,x
for(z=this.b,y=this.a,x=0;x<8;++x){y[x]=new E.a(new Float64Array(2))
z[x]=new E.a(new Float64Array(2))}},
F:{
iu:function(){var z=[E.a]
z=new V.it(H.f(new Array(8),z),H.f(new Array(8),z),0)
z.f_()
return z}}},
jt:{"^":"c;a,b,c,d,e,f,r,x,y"},
ft:{"^":"c;a,b,c,d,e,f,r,x,y,z,Q,ch,cx,cy,db,dx,dy,fr,fx,fy,go,id,k1,k2,k3",
fV:function(a,b,c,d,e){var z,y,x,w,v,u,t,s,r,q,p,o,n
a.e=0
z=b.gad()
y=d.gad()
x=c.b
w=C.a.p(x.b,z.gD(z))
v=C.a.p(x.a,z.gE(z))
u=c.a.a
t=u[0]
s=C.a.p(x.a,z.gD(z))
x=C.a.p(x.b,z.gE(z))
u=u[1]
r=e.b
q=e.a.a
p=C.a.p(r.b,y.gD(y))-C.a.p(r.a,y.gE(y))+q[0]-(w-v+t)
o=C.a.p(r.a,y.gD(y))+C.a.p(r.b,y.gE(y))+q[1]-(s+x+u)
n=b.gbb().C(0,d.gbb())
if(C.a.bu(p*p+o*o,n.p(0,n)))return
a.d=C.n
a.c.h(z)
a.b.I()
a.e=1
x=a.a
x[0].a.h(y)
x[0].d.bt()},
fW:function(a7,a8,a9,b0,b1){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2,a3,a4,a5,a6
a7.e=0
z=b0.gad()
y=b1.b
x=a9.b
w=C.a.p(y.b,z.gD(z))
v=C.a.p(y.a,z.gE(z))
u=b1.a.a
t=u[0]
s=C.a.p(y.a,z.gD(z))
r=C.a.p(y.b,z.gE(z))
u=u[1]
q=a9.a.a
p=w-v+t-q[0]
o=s+r+u-q[1]
q=x.b
u=x.a
n=q*p+u*o
m=-u*p+q*o
l=C.a.C(a8.b,b0.gbb())
k=a8.f
j=a8.d
i=a8.e
for(h=0,g=-17976931348623157e292,f=0;f<k;++f){w=j[f].a
v=w[0]
w=w[1]
e=J.Q(i[f])*(n-v)+J.R(i[f])*(m-w)
if(e>l)return
if(e>g){g=e
h=f}}d=h+1
d=d<k?d:0
c=j[h]
b=j[d]
if(g<11920928955078125e-23){a7.e=1
a7.d=C.j
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
u[0]=z.gD(z)
u[1]=z.gE(z)
a.d.bt()
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
a7.d=C.j
v=a7.b
u=v.a
u[0]=a0
u[1]=m-w[1]
v.S()
a7.c.h(c)
v=a7.a
v[0].a.h(z)
v[0].d.bt()}else if(a2*(v-s)+a3*(u-r)<=0){if(a2*a2+a3*a3>l*l)return
a7.e=1
a7.d=C.j
w=a7.b
v=w.a
v[0]=a2
v[1]=m-t[1]
w.S()
a7.c.h(b)
w=a7.a
w[0].a.h(z)
w[0].d.bt()}else{a4=(v+s)*0.5
a5=(u+r)*0.5
a6=i[h]
w=a6.a
if((n-a4)*w[0]+(m-a5)*w[1]>l)return
a7.e=1
a7.d=C.j
a7.b.h(a6)
w=a7.c.a
w[0]=a4
w[1]=a5
w=a7.a
w[0].a.h(z)
w[0].d.bt()}},
dv:function(a,b,c,d,e){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g
z=b.f
y=d.f
x=b.e
w=b.d
v=d.d
u=this.f
G.eh(e,c,u)
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
hm:function(a0,a1,a2,a3,a4,a5){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a
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
fX:function(a8,a9,b0,b1,b2){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2,a3,a4,a5,a6,a7
a8.e=0
z=a9.b+b1.b
y=this.y
this.dv(y,a9,b0,b1,b2)
if(y.a>z)return
x=this.z
this.dv(x,b1,b2,a9,b0)
w=x.a
if(w>z)return
if(w>y.a+0.0005){v=x.b
a8.d=C.u
u=b0
t=b2
s=a9
r=b1
q=!0}else{v=y.b
a8.d=C.j
u=b2
t=b0
s=b1
r=a9
q=!1}p=t.b
y=this.Q
this.hm(y,r,t,v,s,u)
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
l.S()
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
a0=V.bm(d,y,g,-(x*w+c*j)+z,v)
g.J()
if(a0<2)return
y=this.fx
if(V.bm(y,d,g,x*f+c*k+z,m)<2)return
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
dq:function(a,b,c,d,e){var z,y,x,w,v,u,t,s,r,q,p,o,n
a.e=0
z=this.e
G.n(e,d.gad(),z)
y=this.fy
G.cB(c,z,y)
x=b.c
w=b.d
v=this.go
v.h(w)
v.j(x)
z.h(w)
z.j(y)
u=v.B(z)
z.h(y)
z.j(x)
t=v.B(z)
s=C.a.C(b.b,d.gbb())
r=this.id
q=r.a
q[1]=0
q[3]=0
if(t<=0){z=$.$get$as()
z.h(y)
z.j(x)
z=$.$get$as()
if(z.B(z)>s*s)return
b.r
q[0]=0
q[2]=0
a.e=1
a.d=C.n
a.b.I()
a.c.h(x)
z=a.a
z[0].d.K(r)
z[0].a.h(d.gad())
return}if(u<=0){z=$.$get$as()
z.h(y)
z.j(w)
z=$.$get$as()
if(z.B(z)>s*s)return
b.x
q[0]=1
q[2]=0
a.e=1
a.d=C.n
a.b.I()
a.c.h(w)
z=a.a
z[0].d.K(r)
z[0].a.h(d.gad())
return}p=v.B(v)
o=this.k2
o.h(x)
o.A(0,u)
z.h(w)
z.A(0,t)
o.l(0,z)
o.A(0,1/p)
n=$.$get$as()
n.h(y)
n.j(o)
o=$.$get$as()
if(o.B(o)>s*s)return
o=this.r
v=v.a
n=o.a
n[0]=-v[1]
n[1]=v[0]
z.h(y)
z.j(x)
if(o.B(z)<0){z=n[0]
y=n[1]
n[0]=-z
n[1]=-y}o.S()
q[0]=0
q[2]=1
a.e=1
a.d=C.j
a.b.h(o)
a.c.h(x)
z=a.a
z[0].d.K(r)
z[0].a.h(d.gad())},
F:{
bm:function(a,b,c,d,e){var z,y,x,w,v,u,t,s,r,q,p,o,n,m
z=b[0]
y=b[1]
x=z.a
w=y.a
v=c.B(x)-d
u=c.B(w)-d
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
iI:{"^":"c;a,b",
n:function(a){return this.b}},
fS:{"^":"c;a,b,c,d,e,f,r,x,y,z,Q,ch,cx,cy,db,dx,dy,fr,fx,fy,go,id,k1,k2,k3,k4,r1,r2,rx",
dn:function(a,b,c,d,a0){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e
z=this.b
G.eh(c,a0,z)
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
w.S()
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
t=x.B(w)
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
this.fZ(p)
if(p.a===C.p)return
if(p.c>this.dx)return
o=this.r1
this.h0(o)
u=o.a===C.p
if(!u&&o.c>this.dx)return
if(!u)if(o.c>0.98*p.c+0.001)p=o
u=this.id
n=u[0]
m=u[1]
if(p.a===C.r){a.d=C.j
r=this.Q
l=r.B(s[0])
for(k=0,q=1;j=y.c,q<j;++q){i=r.B(s[q])
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
r.J()}}else{a.d=C.u
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
y.r=x.B(j)
y.y=s.B(y.d)
r=this.k1
if(V.bm(r,u,x,y.r,y.a)<2)return
x=this.k2
if(V.bm(x,r,s,y.y,y.b)<2)return
u=a.b
s=a.c
if(p.a===C.r){u.h(v)
s.h(j)}else{u.h(d.e[y.a])
s.h(d.d[y.a])}for(y=w.a,u=a.a,g=0,q=0;q<2;++q){f=x[q].a.a
y[1]=f[1]
y[0]=f[0]
w.j(j)
if(v.B(w)<=this.dx){e=u[g]
if(p.a===C.r){G.cB(z,x[q].a,e.a)
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
fZ:function(a){var z,y,x,w,v,u,t,s,r,q
a.a=C.r
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
h0:function(a){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f
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
if(f>this.dx){a.a=C.J
a.b=p
a.c=f
return}if(i*x[0]+h*x[1]>=0){u[1]=h
u[0]=v[0]
w.j(q)
if(w.B(z)<-0.03490658503988659)continue}else{u[1]=h
u[0]=v[0]
w.j(t)
if(w.B(z)<-0.03490658503988659)continue}if(f>a.c){a.a=C.J
a.b=p
a.c=f}}},
eT:function(){var z,y,x,w,v
for(z=this.k2,y=this.k1,x=this.id,w=0;w<2;++w){v=new Float64Array(2)
x[w]=new V.W(new E.a(v),new V.S(new Int8Array(4)))
v=new Float64Array(2)
y[w]=new V.W(new E.a(v),new V.S(new Int8Array(4)))
v=new Float64Array(2)
z[w]=new V.W(new E.a(v),new V.S(new Int8Array(4)))}},
F:{
fT:function(){var z=[V.W]
z=new V.fS(V.iu(),G.v(),new E.a(new Float64Array(H.b(2))),new E.a(new Float64Array(H.b(2))),new E.a(new Float64Array(H.b(2))),new E.a(new Float64Array(H.b(2))),new E.a(new Float64Array(H.b(2))),new E.a(new Float64Array(H.b(2))),new E.a(new Float64Array(H.b(2))),new E.a(new Float64Array(H.b(2))),new E.a(new Float64Array(H.b(2))),C.W,C.W,new E.a(new Float64Array(H.b(2))),new E.a(new Float64Array(H.b(2))),0,!1,new E.a(new Float64Array(H.b(2))),new E.a(new Float64Array(H.b(2))),new E.a(new Float64Array(H.b(2))),new E.a(new Float64Array(H.b(2))),H.f(new Array(2),z),H.f(new Array(2),z),H.f(new Array(2),z),new V.jt(0,0,new E.a(new Float64Array(H.b(2))),new E.a(new Float64Array(H.b(2))),new E.a(new Float64Array(H.b(2))),new E.a(new Float64Array(H.b(2))),0,new E.a(new Float64Array(H.b(2))),0),new V.di(C.p,0,0),new V.di(C.p,0,0),new E.a(new Float64Array(H.b(2))),new E.a(new Float64Array(H.b(2))))
z.eT()
return z}}},
S:{"^":"c;a",
cB:function(){var z=this.a
return(z[0]<<24|z[1]<<16|z[2]<<8|z[3])>>>0},
K:function(a){var z,y
z=a.a
y=this.a
y[0]=z[0]
y[1]=z[1]
y[2]=z[2]
y[3]=z[3]},
bt:function(){var z=this.a
z[0]=0
z[1]=0
z[2]=0
z[3]=0},
b7:function(a,b){return this.cB()-b.cB()},
$isy:1,
$asy:function(){return[V.S]}},
bN:{"^":"c;a,b,k:c<,m:d@,e,f",
K:function(a){this.a.h(a.a)
this.b.h(a.b)
this.c.h(a.c)
this.d=a.d
this.e=a.e
this.f=a.f}},
ie:{"^":"c;a,b,c,d",
eY:function(){var z=this.c
z[0]=1073741823
z[1]=1073741823
z[2]=1073741823
z=this.d
z[0]=1073741823
z[1]=1073741823
z[2]=1073741823},
F:{
e_:function(){var z=P.m
z=new V.ie(0,0,P.ak(3,0,!1,z),P.ak(3,0,!1,z))
z.eY()
return z}}},
jC:{"^":"c;a,b,c,d,e,f,r,x,y,z,Q,ch,cx,cy,db",
hU:function(a,b,c,d,e){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l
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
l=this.cC()
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
ic:function(a){var z,y,x,w
a.a=this.cC()
a.b=this.e
for(z=a.c,y=this.d,x=a.d,w=0;w<this.e;++w){z[w]=J.d1(y[w].e)
x[w]=J.d1(y[w].f)}},
dZ:function(a){var z,y
switch(this.e){case 1:a.h(this.a.c)
a.J()
return
case 2:z=this.f
z.h(this.b.c)
y=this.a.c
z.j(y)
a.h(y)
a.J()
if(z.t(a)>0)z.M(1,a)
else z.M(-1,a)
return
default:a.I()
return}},
cw:function(a){var z,y,x
switch(this.e){case 0:a.I()
return
case 1:a.h(this.a.c)
return
case 2:z=this.x
y=this.b
z.h(y.c)
z.A(0,y.d)
y=this.r
x=this.a
y.h(x.c)
y.A(0,x.d)
y.l(0,z)
a.h(y)
return
case 3:a.I()
return
default:a.I()
return}},
cC:function(){var z,y,x
switch(this.e){case 0:return 0
case 1:return 0
case 2:return Math.sqrt(this.a.c.bJ(this.b.c))
case 3:z=this.y
z.h(this.b.c)
y=this.a.c
z.j(y)
x=this.z
x.h(this.c.c)
x.j(y)
return z.t(x)
default:return 0}},
ed:function(){var z,y,x,w,v,u,t,s
z=this.a
y=z.c
x=this.b
w=x.c
v=this.f
v.h(w)
v.j(y)
u=-y.B(v)
if(u<=0){z.d=1
this.e=1
return}t=w.B(v)
if(t<=0){x.d=1
this.e=1
z.K(x)
return}s=1/(t+u)
z.d=t*s
x.d=u*s
this.e=2},
ee:function(){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a
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
s=z.B(t)
r=x.B(t)
q=-s
p=this.Q
p.h(v)
p.j(z)
o=z.B(p)
n=v.B(p)
m=-o
l=this.ch
l.h(v)
l.j(x)
k=x.B(l)
j=v.B(l)
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
fN:{"^":"c;a,b,c,d",
bv:function(a,b){var z,y,x,w,v,u
switch(a.a){case C.m:H.p(a,"$isaH")
this.a[0].h(a.gad())
this.b=1
this.c=a.gbb()
break
case C.k:z=a.f
this.b=z
this.c=a.b
for(y=this.a,x=0;x<z;++x){w=y[x]
v=a.d[x]
w.toString
u=v.a
w=w.a
w[1]=u[1]
w[0]=u[0]}break
case C.v:H.p(a,"$isc3")
z=this.d
z[0]=a.gca().i(0,b)
y=b+1
if(C.b.N(y,a.gfi()))z[1]=a.gca().i(0,y)
else z[1]=a.gca().i(0,0)
y=this.a
y[0].h(z[0])
y[1].h(z[1])
this.b=2
this.c=a.gbb()
break
case C.o:H.p(a,"$isaK")
z=this.a
z[0].h(a.c)
z[1].h(a.d)
this.b=2
this.c=a.b
break}},
aZ:function(a){var z,y,x,w,v
z=this.a
y=z[0].B(a)
for(x=0,w=1;w<this.b;++w){v=z[w].B(a)
if(v>y){y=v
x=w}}return x},
eR:function(){var z,y
for(z=this.a,y=0;y<8;++y)z[y]=new E.a(new Float64Array(2))
this.b=0
this.c=0},
F:{
aI:function(){var z=[E.a]
z=new V.fN(H.f(new Array(8),z),null,null,H.f(new Array(2),z))
z.eR()
return z}}},
fL:{"^":"c;a,b,c,d,e,f,r",
dt:function(a3,a4,a5){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2
$.de=$.de+1
z=a5.a
y=a5.b
x=a5.c
w=a5.d
v=this.a
v.hU(a4,z,x,y,w)
u=v.d
t=this.d
v.cw(t)
t.gL()
for(s=this.b,r=this.c,q=x.b,p=this.e,o=p.a,n=this.f,m=z.a,l=w.b,k=y.a,j=0;j<20;){i=v.e
for(h=0;h<i;++h){s[h]=u[h].e
r[h]=u[h].f}switch(i){case 1:break
case 2:v.ed()
break
case 3:v.ee()
break}if(v.e===3)break
v.cw(t)
t.gL()
v.dZ(p)
if(p.gL()<14210854715202004e-30)break
g=u[v.e]
o[1]=-o[1]
o[0]=-o[0]
G.Z(q,p,n)
f=z.aZ(n)
g.e=f
f=m[f]
e=g.a
G.n(x,f,e)
o[1]=-o[1]
o[0]=-o[0]
G.Z(l,p,n)
f=y.aZ(n)
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
$.df=$.df+1
h=0
while(!0){if(!(h<i)){b=!1
break}f=g.e
e=s[h]
if(f==null?e==null:f===e){f=g.f
e=r[h]
e=f==null?e==null:f===e
f=e}else f=!1
if(f){b=!0
break}++h}if(b)break;++v.e}$.dg=Math.max($.dg,j)
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
t.A(0,s.d)
r=v.b
a.h(r.a)
a.A(0,r.d)
a.l(0,t)
t.h(s.b)
t.A(0,s.d)
a0.h(r.b)
a0.A(0,r.d)
a0.l(0,t)
break
case 3:t=v.a
a.h(t.a)
a.A(0,t.d)
t=v.y
s=v.b
t.h(s.a)
t.A(0,s.d)
s=v.z
r=v.c
s.h(r.a)
s.A(0,r.d)
a.l(0,t)
a.l(0,s)
a0.h(a)
break
default:break}a3.c=Math.sqrt(a.bJ(a0))
a3.d=j
v.ic(a4)
if(a5.e){a1=z.c
a2=y.c
v=a3.c
t=a1+a2
if(v>t&&v>11920928955078125e-23){a3.c=v-t
v=this.r
v.h(a0)
v.j(a)
v.S()
n.h(v)
n.A(0,a1)
a.l(0,n)
n.h(v)
n.A(0,a2)
a0.j(n)}else{a.l(0,a0)
a.A(0,0.5)
a0.h(a)
a3.c=0}}}},
dc:{"^":"c;a,b,c,d,e"},
dd:{"^":"c;a,b,c,d"},
ch:{"^":"c;a,b",
n:function(a){return this.b}},
ht:{"^":"c;a,b,c,d,e",
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
eV:function(){var z,y,x
for(z=this.a,y=0;y<2;++y){x=new Float64Array(2)
z[y]=new V.dE(new E.a(x),0,0,new V.S(new Int8Array(4)))}},
F:{
J:function(){var z=new V.ht(H.f(new Array(2),[V.dE]),new E.a(new Float64Array(H.b(2))),new E.a(new Float64Array(H.b(2))),C.n,0)
z.eV()
return z}}},
dE:{"^":"c;a,b,c,d"},
cs:{"^":"c;a,b,c"},
dW:{"^":"c;a,b"},
aK:{"^":"dZ;c,d,e,f,r,x,y,a,b"},
hx:{"^":"c;a,b,c"},
i0:{"^":"dZ;c,d,e,f,r,x,y,z,Q,a,b",
fT:function(a){var z,y,x,w,v,u
z=V.b6()
z.c.h(this.c)
for(y=z.e,x=this.e,w=z.d,v=this.d,u=0;u<8;++u){y[u].h(x[u])
w[u].h(v[u])}z.b=this.b
z.f=this.f
return z},
eb:function(a0,a1,a2,a3){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a
if(a1<3){this.bS(1,1)
return}z=Math.min(a1,8)
y=H.f(new Array(8),[E.a])
for(x=0,w=0;w<z;++w){v=a0[w]
t=0
while(!0){if(!(t<x)){u=!0
break}if(v.bJ(y[t])<0.0025){u=!1
break}++t}if(u){s=x+1
y[x]=v
x=s}}if(x<3){this.bS(1,1)
return}r=y[0].a[0]
for(q=0,w=1;w<x;++w){p=y[w].a
o=p[0]
if(!(o>r))p=o===r&&p[1]<y[q].a[1]
else p=!0
if(p){r=o
q=w}}n=P.ak(8,0,!1,P.m)
for(m=this.r,p=m.a,v=this.x,l=v.a,k=q,j=0;!0;k=i){n[j]=k
for(i=0,t=1;t<x;++t){if(i===k){i=t
continue}h=y[i].a
p[1]=h[1]
p[0]=h[0]
m.j(y[n[j]])
h=y[t].a
l[1]=h[1]
l[0]=h[0]
v.j(y[n[j]])
g=m.t(v)
if(g<0)i=t
if(g===0&&v.gL()>m.gL())i=t}++j
if(i===q)break}this.f=j
for(l=this.d,w=0;w<this.f;++w){f=l[w]
if(f==null){f=new E.a(new Float64Array(2))
l[w]=f}f.h(y[n[w]])}for(f=this.e,w=0;e=this.f,w<e;w=q){q=w+1
h=l[q<e?q:0].a
p[1]=h[1]
p[0]=h[0]
m.j(l[w])
d=f[w]
c=p[1]
b=p[0]
a=d.a
a[0]=c
a[1]=-1*b
d.S()}this.fY(l,e,this.c)},
bS:function(a,b){var z,y,x
this.f=4
z=this.d
y=-a
x=-b
z[0].W(y,x)
z[1].W(a,x)
z[2].W(a,b)
z[3].W(y,b)
y=this.e
y[0].W(0,-1)
y[1].W(1,0)
y[2].W(0,1)
y[3].W(-1,0)
this.c.I()},
cI:function(a,b,c,d){var z,y,x,w,v,u
this.f=4
z=this.d
y=-a
x=-b
z[0].W(y,x)
z[1].W(a,x)
z[2].W(a,b)
z[3].W(y,b)
y=this.e
y[0].W(0,-1)
y[1].W(1,0)
y[2].W(0,1)
y[3].W(-1,0)
this.c.h(c)
w=this.Q
w.a.h(c)
x=w.b
x.G(d)
for(v=0;v<this.f;++v){u=z[v]
G.r(w,u,u)
u=y[v]
G.ao(x,u,u)}},
bw:function(a,b){var z,y
this.f=2
z=this.d
z[0].h(a)
z[1].h(b)
z=this.c
z.h(a)
z.l(0,b)
z.A(0,0.5)
z=this.e
y=z[0]
y.h(b)
y.j(a)
y=z[0]
y.M(-1,y)
z[0].S()
y=z[1]
y.h(z[0])
y.J()},
cd:function(a,b,c){var z,y,x,w,v,u,t,s,r,q,p,o,n,m
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
fY:function(a,b,c){var z,y,x,w,v,u,t,s,r,q,p,o,n
z=c.a
z[0]=0
z[1]=0
y=this.r
y.I()
x=this.x
w=this.y
for(z=x.a,v=w.a,u=y.a,t=0,s=0;s<b;){r=a[s];++s
q=s<b?a[s]:a[0]
p=r.a
z[1]=p[1]
z[0]=p[0]
x.j(y)
p=q.a
v[1]=p[1]
v[0]=p[0]
w.j(y)
o=0.5*x.t(w)
t+=o
z[1]=u[1]
z[0]=u[0]
x.l(0,r)
x.l(0,q)
n=o*0.3333333333333333
z[1]=z[1]*n
z[0]=z[0]*n
c.l(0,x)}c.A(0,1/t)},
h_:function(a,b){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h
z=this.r
z.I()
y=this.x
y.I()
for(x=this.d,w=0;v=this.f,w<v;++w)y.l(0,x[w])
y.A(0,1/v)
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
t.l(0,w<this.f?x[w]:x[0])
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
z.A(0,1/p)
x=a.b
x.h(z)
x.l(0,y)
v=o*b
a.c=v
a.c=v+a.a*x.B(x)},
eX:function(){var z,y
for(z=this.d,y=0;y<8;++y)z[y]=new E.a(new Float64Array(2))
for(z=this.e,y=0;y<8;++y)z[y]=new E.a(new Float64Array(2))
this.b=0.01},
F:{
b6:function(){var z,y,x,w
z=new Float64Array(H.b(2))
y=new Array(8)
y.fixed$length=Array
x=[E.a]
y=H.f(y,x)
w=new Array(8)
w.fixed$length=Array
x=new V.i0(new E.a(z),y,H.f(w,x),0,new E.a(new Float64Array(H.b(2))),new E.a(new Float64Array(H.b(2))),new E.a(new Float64Array(H.b(2))),new E.a(new Float64Array(H.b(2))),G.v(),C.k,0)
x.eX()
return x}}},
dZ:{"^":"c;"},
bG:{"^":"c;a,b",
n:function(a){return this.b}},
iq:{"^":"c;a,b,c,d,e"},
ba:{"^":"c;a,b",
n:function(a){return this.b}},
ir:{"^":"c;a,b"},
iv:{"^":"c;a,b,c,d,e,f,r,x,y,z",
i6:function(a3,a4){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2
$.e7=$.e7+1
a3.a=C.T
a3.b=a4.e
z=a4.a
y=a4.b
x=this.x
x.K(a4.c)
w=this.y
w.K(a4.d)
x.S()
w.S()
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
k.dt(n,t,s)
h=n.c
if(h<=0){a3.a=C.af
a3.b=0
break}if(h<p){a3.a=C.E
a3.b=j
break}r.hx(0,t,z,x,y,w,j)
f=v
e=0
while(!0){if(!!0){g=!1
break}d=r.hn(q,f)
if(d>p){a3.a=C.ag
a3.b=v
g=!0
break}if(d>o){j=f
g=!1
break}c=r.ap(q[0],q[1],j)
if(c<o){a3.a=C.U
a3.b=j
g=!0
break}if(c<=p){a3.a=C.E
a3.b=j
g=!0
break}for(b=f,a=j,a0=0;!0;){a1=(a0&1)===1?a+(u-c)*(b-a)/(d-c):0.5*(a+b);++a0
$.eb=$.eb+1
a2=r.ap(q[0],q[1],a1)
if(Math.abs(a2-u)<0.00125){f=a1
break}if(a2>u){a=a1
c=a2}else{b=a1
d=a2}if(a0===50)break}$.ea=Math.max($.ea,a0);++e
if(e===8||a0===50){g=!1
break}}++i
$.e8=$.e8+1
if(g)break
if(i===20){a3.a=C.U
a3.b=j
break}}$.e9=Math.max($.e9,i)}},
cu:{"^":"c;a,b",
n:function(a){return this.b}},
ib:{"^":"c;a,b,c,d,e,f,r,x,y,z,Q,ch,cx,cy,db,dx,dy,fr,fx,fy,go",
hx:function(a,b,c,d,e,f,g){var z,y,x,w,v,u,t,s,r,q,p,o,n,m
this.a=c
this.b=e
z=b.b
this.f=d
this.r=f
y=this.fr
d.aA(y,g)
x=this.fx
this.r.aA(x,g)
if(z===1){this.c=C.B
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
return v.S()}else{g=b.c
w=b.d
v=this.z
u=this.d
t=this.cy
s=this.e
r=this.Q
q=this.dy
if(J.a1(g[0],g[1])){this.c=C.D
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
q.M(-1,s)
s.S()
G.j(x.b,s,t)
u.h(p)
u.l(0,n)
u.A(0,0.5)
G.n(x,u,r)
u=this.x
x=this.a
g=g[0]
u.h(x.a[g])
G.n(y,u,v)
q.h(v)
q.j(r)
m=q.B(t)
if(m<0){s.J()
m=-m}return m}else{this.c=C.C
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
q.M(-1,s)
s.S()
G.j(y.b,s,t)
u.h(p)
u.l(0,n)
u.A(0,0.5)
G.n(y,u,v)
u=this.y
y=this.b
w=w[0]
u.h(y.a[w])
G.n(x,u,r)
q.h(r)
q.j(v)
m=q.B(t)
if(m<0){s.J()
m=-m}return m}}},
hn:function(a,b){var z,y,x,w,v,u,t
z=this.fr
this.f.aA(z,b)
y=this.fx
this.r.aA(y,b)
switch(this.c){case C.B:x=this.e
w=this.fy
G.Z(z.b,x,w)
x.J()
v=this.go
G.Z(y.b,x,v)
x.J()
a[0]=this.a.aZ(w)
a[1]=this.b.aZ(v)
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
return v.B(x)
case C.C:x=this.cy
G.j(z.b,this.e,x)
w=this.z
G.n(z,this.d,w)
x.J()
z=this.go
G.Z(y.b,x,z)
x.J()
a[0]=-1
z=this.b.aZ(z)
a[1]=z
v=this.y
v.h(this.b.a[z])
z=this.Q
G.n(y,v,z)
z.j(w)
return z.B(x)
case C.D:x=this.cy
G.j(y.b,this.e,x)
w=this.Q
G.n(y,this.d,w)
x.J()
y=this.fy
G.Z(z.b,x,y)
x.J()
a[1]=-1
y=this.a.aZ(y)
a[0]=y
v=this.x
v.h(this.a.a[y])
y=this.z
G.n(z,v,y)
y.j(w)
return y.B(x)
default:a[0]=-1
a[1]=-1
return 0}},
ap:function(a,b,c){var z,y,x,w,v
z=this.fr
this.f.aA(z,c)
y=this.fx
this.r.aA(y,c)
switch(this.c){case C.B:x=this.x
x.h(this.a.a[a])
w=this.y
w.h(this.b.a[b])
v=this.z
G.n(z,x,v)
x=this.Q
G.n(y,w,x)
x.j(v)
return x.B(this.e)
case C.C:x=this.cy
G.j(z.b,this.e,x)
w=this.z
G.n(z,this.d,w)
z=this.y
z.h(this.b.a[b])
v=this.Q
G.n(y,z,v)
v.j(w)
return v.B(x)
case C.D:x=this.cy
G.j(y.b,this.e,x)
w=this.Q
G.n(y,this.d,w)
y=this.x
y.h(this.a.a[a])
v=this.z
G.n(z,y,v)
v.j(w)
return v.B(x)
default:return 0}}},
iP:{"^":"c;a,b,c,d,e",
hw:function(a,b,c,a0,a1,a2){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d
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
if(z.bJ(y)>14210854715202004e-30){w[0]=o[0]-q[0]
w[1]=o[1]-q[1]
x.S()}x=w[0]
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
case C.j:j=this.d
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
case C.u:j=this.d
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
f3:function(){var z,y
for(z=this.b,y=0;y<2;++y)z[y]=new E.a(new Float64Array(2))},
F:{
iQ:function(){var z=new V.iP(new E.a(new Float64Array(H.b(2))),H.f(new Array(2),[E.a]),new Float64Array(H.b(2)),new E.a(new Float64Array(H.b(2))),new E.a(new Float64Array(H.b(2))))
z.f3()
return z}}},
bg:{"^":"c;a,b,c,d,e,f,r,x,y,z,Q,ch,cx,cy,db,dx,dy,fr,fx,fy,go,id,k1,k2,k3,az:k4<,r1,r2,rx",
aT:function(a){var z,y
z=this.Q
if((z.a&2)===2)return
y=new V.fY(0,null,null,null,0,0,null,0,new V.bt(1,65535,0),!1,null,V.aF(),V.aF(),new E.a(new Float64Array(H.b(2))))
y.h2(this,a)
if((this.b&32)===32)y.h4(z.b.a,this.d)
y.b=this.cy
this.cy=y;++this.db
y.c=this
if(y.a>0)this.hZ()
z.a|=1
return y},
dr:function(a,b){var z=this.r1
z.a=a
z.e=b
return this.aT(z)},
dj:function(a,b){var z,y,x
if(this.a!==C.f)return
if((this.b&2)!==2)this.a2(!0)
z=this.y.a
y=a.a
z[0]=z[0]+y[0]
z[1]=z[1]+y[1]
z=b.a
x=this.f.c.a
this.z=this.z+((z[0]-x[0])*y[1]-(z[1]-x[1])*y[0])},
bg:function(a,b,c){var z,y,x,w,v
if(this.a!==C.f)return
if((this.b&2)!==2)this.a2(!0)
z=this.r.a
y=z[0]
x=a.a
w=x[0]
v=this.fx
z[0]=y+w*v
z[1]=z[1]+x[1]*v
v=b.a
z=this.f.c.a
this.x=this.x+this.go*((v[0]-z[0])*x[1]-(v[1]-z[1])*x[0])},
fO:function(a){if(this.a!==C.f)return
if((this.b&2)!==2)this.a2(!0)
this.x=this.x+this.go*a},
hZ:function(){var z,y,x,w,v,u,t,s,r,q,p
this.fr=0
this.fx=0
this.fy=0
this.go=0
z=this.f
y=z.a
y.I()
x=this.a
if(x===C.e||x===C.H){y=this.d.a
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
s.d.h_(t,q)
q=this.fr
p=t.a
this.fr=q+p
q=u.a
q[1]=r[1]
q[0]=r[0]
q[1]=q[1]*p
q[0]=q[0]*p
v.l(0,u)
this.fy=this.fy+t.c}q=this.fr
if(q>0){q=1/q
this.fx=q
v.A(0,q)}else{this.fr=1
this.fx=1}q=this.fy
if(q>0&&(this.b&16)===0){q-=this.fr*v.B(v)
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
u.M(this.x,w)
this.r.l(0,w)
x.b-=3},
bR:function(a){var z=new E.a(new Float64Array(H.b(2)))
G.ao(this.d.b,a,z)
return z},
a2:function(a){var z
if(a){z=this.b
if((z&2)===0){this.b=z|2
this.k3=0}}else{this.b&=4294967293
this.k3=0
this.r.I()
this.x=0
this.y.I()
this.z=0}},
cP:function(){var z,y,x,w,v,u,t,s,r
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
for(r=this.cy,y=this.Q,x=this.d;r!=null;r=r.b)r.eI(y.b.a,z,x)},
b1:function(){var z,y,x,w,v,u,t
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
cK:function(a){var z,y
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
v.G(x)
w=w.a
G.j(v,z.a,w)
w.A(0,-1)
w.l(0,y)},
n:function(a){return"Body[pos: "+this.d.a.n(0)+" linVel: "+this.r.n(0)+" angVel: "+H.d(this.x)+"]"}},
bh:{"^":"c;a,az:b<,c,d,e,f,r,x,y,z,Q,ch,cx,cy"},
c0:{"^":"c;a,b",
n:function(a){return this.b}},
fx:{"^":"c;a,b,c,d,e,f",
fM:function(a,b){var z,y,x,w,v,u,t,s,r,q,p,o,n,m
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
if((r==null?y==null:r===y)&&p===w&&(q==null?z==null:q===z)&&o===x)return}t=t.d}if(!u.cK(v))return
s=this.d.cL(z,y)
if(!s)return
n=this.f.hO(z,x,y,w)
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
if(!z.z&&!y.z){v.a2(!0)
u.a2(!0)}++this.c},
ce:function(a){var z,y,x,w,v,u,t,s,r,q
z=a.f
y=a.r
x=z.c
w=y.c
v=this.e
if(v!=null&&(a.a&2)===2)v.c2(a,!1)
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
if(a.z.e>0&&!z.z&&!y.z){z.c.a2(!0)
y.c.a2(!0)}s=z.d.a
r=y.d.a
q=this.f.fy[s.a][r.a].a
q.a[--q.b]=a;--this.c},
fU:function(){var z,y,x,w,v,u,t,s,r,q,p,o,n
z=this.b
for(;z!=null;){y=z.f
x=z.r
w=z.x
v=z.y
u=y.c
t=x.c
if((z.a&8)===8){if(!t.cK(u)){s=z.c
this.ce(z)
z=s
continue}r=this.d.cL(y,x)
if(!r){s=z.c
this.ce(z)
z=s
continue}z.a&=4294967287}q=(u.b&2)===2&&u.a!==C.e
p=(t.b&2)===2&&t.a!==C.e
if(!q&&!p){z=z.c
continue}o=y.r[w].gbM()
n=x.r[v].gbM()
if(!this.a.i4(o,n)){s=z.c
this.ce(z)
z=s
continue}z.cr(this.e)
z=z.c}},
eK:function(a,b){this.b=null
this.d=new V.fw()
this.e=null
this.a=b},
F:{
fy:function(a,b){var z=new V.fx(null,null,0,null,null,a)
z.eK(a,b)
return z}}},
bj:{"^":"aj;fr,a,b,c,d,e,f,r,x,y,z,Q,ch,cx,cy,db,dx,dy",
ax:function(a,b,c,d){this.by(a,b,c,d)},
ap:function(a,b,c){var z=this.fr
H.p(this.f.d,"$isc3").dW(z,this.x)
this.dx.fr.dq(a,z,b,H.p(this.r.d,"$isaH"),c)}},
bk:{"^":"aj;fr,a,b,c,d,e,f,r,x,y,z,Q,ch,cx,cy,db,dx,dy",
ax:function(a,b,c,d){this.by(a,b,c,d)},
ap:function(a,b,c){var z,y,x
z=this.fr
H.p(this.f.d,"$isc3").dW(z,this.x)
y=this.dx.fr
x=this.r.d
y.k3.dn(a,z,b,x,c)}},
bl:{"^":"aj;a,b,c,d,e,f,r,x,y,z,Q,ch,cx,cy,db,dx,dy",
ap:function(a,b,c){this.dx.fr.fV(a,H.p(this.f.d,"$isaH"),b,H.p(this.r.d,"$isaH"),c)}},
aj:{"^":"c;",
ax:["by",function(a,b,c,d){var z,y
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
cr:function(a){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d
z=this.dy
y=this.z
z.K(y)
x=this.a|=4
w=(x&2)===2
x=this.f
v=x.z
u=this.r
t=u.z
s=v||t
r=x.c
q=u.c
p=r.d
o=q.d
if(s){n=x.d
m=u.d
z=this.dx.fr
x=this.x
u=this.y
l=z.b
l.a.bv(n,x)
l.b.bv(m,u)
l.c.K(p)
l.d.K(o)
l.e=!0
u=z.c
u.b=0
x=z.a
z=z.d
x.fy.dt(z,u,l)
k=z.c<0.0000011920928955078125
y.e=0}else{this.ap(y,p,o)
k=y.e>0
for(x=z.a,u=y.a,j=0;j<y.e;++j){i=u[j]
i.b=0
i.c=0
h=i.d
for(l=z.e,g=h.a,f=0;f<l;++f){e=x[f]
d=e.d.a
if((d[0]<<24|d[1]<<16|d[2]<<8|d[3])>>>0===(g[0]<<24|g[1]<<16|g[2]<<8|g[3])>>>0){i.b=e.b
i.c=e.c
break}}}if(k!==w){r.a2(!0)
q.a2(!0)}}z=this.a
if(k)this.a=z|2
else this.a=z&4294967293
if(a==null)return
if(!w&&k)a.c2(this,!0)
if(w&&!k)a.c2(this,!1)}},
H:{"^":"c;a,b,c,d"},
c5:{"^":"c;a,b,c,d,e,f,r,x,y,z,Q,ch,cx,cy,db",
eL:function(){var z,y
for(z=this.a,y=0;y<2;++y)z[y]=new E.a(new Float64Array(2))},
F:{
d9:function(){var z=new V.c5(H.f(new Array(2),[E.a]),new E.a(new Float64Array(H.b(2))),new E.a(new Float64Array(H.b(2))),0,0,0,0,new E.a(new Float64Array(H.b(2))),new E.a(new Float64Array(H.b(2))),0,0,null,0,0,0)
z.eL()
return z}}},
bn:{"^":"c;a,b"},
bp:{"^":"c;a,b,c,d,e"},
fz:{"^":"c;a,b,c,d,e,f,r,x,y,z,Q",
dA:function(a){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b
this.a=a.a
z=a.c
this.r=z
y=this.d
x=y.length
if(x<z){z=new Array(Math.max(x*2,z))
z.fixed$length=Array
z=H.f(z,[V.c5])
this.d=z
C.d.a9(z,0,x,y,0)
for(;z=this.d,x<z.length;++x)z[x]=V.d9()}z=this.e
x=z.length
y=this.r
if(x<y){y=new Array(Math.max(x*2,y))
y.fixed$length=Array
y=H.f(y,[V.c6])
this.e=y
C.d.a9(y,0,x,z,0)
for(;z=this.e,x<z.length;++x)z[x]=V.da()}this.b=a.d
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
ib:function(){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b
for(z=0;z<this.r;++z){y=this.e[z]
x=y.e
w=y.f
v=y.r
u=y.y
t=y.x
s=y.z
r=y.cy
q=this.c[x].gw()
p=this.c[x].gk()
o=this.c[w].gw()
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
dC:function(){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2,a3,a4,a5,a6,a7,a8,a9,b0,b1,b2,b3,b4,b5,b6,b7,b8,b9,c0,c1,c2,c3,c4,c5,c6,c7,c8,c9,d0,d1,d2,d3,d4,d5,d6,d7,d8,d9,e0,e1,e2
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
c=this.b[k].gu()
b=this.b[k].gm()
a=this.c[k].gw()
a0=this.c[k].gk()
a1=this.b[j].gu()
a2=this.b[j].gm()
a3=this.c[j].gw()
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
z.hw(0,l,x,n,v,m)
b1=p.b.a
b1[0]=r[0]
b1[1]=r[1]
b2=p.cy
for(a5=-$.kt,a7=a3.a,a8=-a4,b0=a.a,b3=-a0,b4=i+h,b5=0;b5<b2;++b5){b6=p.a[b5]
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
a6.bL()}else p.cy=1}}},
cM:function(){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2,a3,a4,a5,a6,a7,a8,a9,b0,b1,b2,b3,b4,b5,b6,b7,b8,b9,c0,c1,c2,c3,c4,c5,c6,c7,c8,c9,d0,d1,d2,d3,d4,d5,d6,d7,d8,d9,e0
for(z=0;z<this.r;++z){y=this.e[z]
x=y.e
w=y.f
v=y.r
u=y.x
t=y.y
s=y.z
r=y.cy
q=this.c[x].gw()
p=this.c[x].gk()
o=this.c[w].gw()
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
eA:function(){var z,y,x,w,v,u
for(z=0;z<this.r;++z){y=this.e[z]
for(x=this.f[y.db].z.a,w=0;w<y.cy;++w){v=x[w]
u=y.a[w]
v.b=u.c
v.c=u.d}}},
ej:function(){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2,a3,a4,a5,a6,a7,a8,a9,b0,b1,b2,b3,b4,b5,b6,b7,b8,b9,c0
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
c=this.b[n].gu()
b=this.b[n].gm()
a=this.b[m].gu()
a0=this.b[m].gm()
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
t.dB(0,o,z,x,a4)
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
a0+=g*(b2*c0-b3*b9)}this.b[n].sm(b)
this.b[m].sm(a0)}return q>=-0.015},
er:function(c3,c4){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2,a3,a4,a5,a6,a7,a8,a9,b0,b1,b2,b3,b4,b5,b6,b7,b8,b9,c0,c1,c2
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
b=0}a=this.b[n].gu()
a0=this.b[n].gm()
a1=this.b[m].gu()
a2=this.b[m].gm()
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
t.dB(0,o,z,x,a6)
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
a2+=b*(b4*c2-b5*c1)}this.b[n].sm(a0)
this.b[m].sm(a2)}return q>=-0.0075},
eM:function(){var z,y
z=new Array(256)
z.fixed$length=Array
this.d=H.f(z,[V.c5])
z=new Array(256)
z.fixed$length=Array
this.e=H.f(z,[V.c6])
for(y=0;y<256;++y){this.d[y]=V.d9()
this.e[y]=V.da()}},
F:{
bo:function(){var z=new V.fz(null,null,null,null,null,null,0,G.v(),G.v(),V.iQ(),new V.i1(new E.a(new Float64Array(H.b(2))),new E.a(new Float64Array(H.b(2))),0))
z.eM()
return z}}},
i1:{"^":"c;a,b,c",
dB:function(a,b,c,d,a0){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e
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
s.S()
s=this.b.a
s[0]=(q+o)*0.5
s[1]=(p+n)*0.5
this.c=u*r[0]+x*r[1]-b.cx-b.cy
break
case C.j:x=z.b
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
case C.u:x=y.b
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
ew:{"^":"c;a,b,c,d,e,f,r"},
c6:{"^":"c;a,b,c,d,e,f,r,x,y,z,Q,ch,cx,cy,db",
eN:function(){var z,y,x
for(z=this.a,y=0;y<2;++y){x=new Float64Array(2)
z[y]=new V.ew(new E.a(x),new E.a(new Float64Array(2)),0,0,0,0,0)}},
F:{
da:function(){var z=new V.c6(H.f(new Array(2),[V.ew]),new E.a(new Float64Array(H.b(2))),new E.a5(new Float64Array(H.b(4))),new E.a5(new Float64Array(H.b(4))),0,0,0,0,0,0,0,0,0,0,0)
z.eN()
return z}}},
bq:{"^":"aj;a,b,c,d,e,f,r,x,y,z,Q,ch,cx,cy,db,dx,dy",
ax:function(a,b,c,d){this.by(a,b,c,d)},
ap:function(a,b,c){this.dx.fr.dq(a,H.p(this.f.d,"$isaK"),b,H.p(this.r.d,"$isaH"),c)}},
br:{"^":"aj;a,b,c,d,e,f,r,x,y,z,Q,ch,cx,cy,db,dx,dy",
ax:function(a,b,c,d){this.by(a,b,c,d)},
ap:function(a,b,c){var z,y,x
z=this.dx.fr
y=H.p(this.f.d,"$isaK")
x=this.r.d
z.k3.dn(a,y,b,x,c)}},
bA:{"^":"aj;a,b,c,d,e,f,r,x,y,z,Q,ch,cx,cy,db,dx,dy",
ap:function(a,b,c){this.dx.fr.fW(a,this.f.d,b,H.p(this.r.d,"$isaH"),c)}},
bB:{"^":"aj;a,b,c,d,e,f,r,x,y,z,Q,ch,cx,cy,db,dx,dy",
ap:function(a,b,c){this.dx.fr.fX(a,this.f.d,b,this.r.d,c)}},
co:{"^":"c;u:a<,m:b@"},
cC:{"^":"c;w:a<,k:b@"},
bt:{"^":"c;a,b,c"},
fY:{"^":"c;a,b,c,d,e,f,r,x,y,z,az:Q<,ch,cx,cy",
h2:function(a,b){var z,y,x,w,v
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
this.z=b.f
this.d=b.a.fT(0)
if(this.r==null){z=new Array(1)
z.fixed$length=Array
this.r=H.f(z,[V.aX])
for(x=0;x<1;++x){z=this.r
y=new Float64Array(2)
z[x]=new V.aX(new V.ah(new E.a(y),new E.a(new Float64Array(2))),null,0,0)
this.r[x].sdw(null)
this.r[x].sbM(-1)}}z=this.r
y=z.length
if(y<1){w=Math.max(y*2,1)
v=new Array(w)
v.fixed$length=Array
v=H.f(v,[V.aX])
this.r=v
C.d.a9(v,0,y,z,0)
for(x=0;x<w;++x){z=this.r
y=new Float64Array(2)
z[x]=new V.aX(new V.ah(new E.a(y),new E.a(new Float64Array(2))),null,0,0)
this.r[x].sdw(null)
this.r[x].sbM(-1)}}this.x=0
this.a=b.e},
h4:function(a,b){var z,y,x,w,v,u,t,s,r
this.d.toString
this.x=1
for(z=a.a,y=0;y<this.x;++y){x=this.r[y]
w=this.d
v=x.a
w.cd(v,b,y)
u=z.cT()
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
z.d6(t);++a.b
a.dm(t)
x.d=t
x.b=this
x.c=y}},
eI:function(a,b,c){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l
if(this.x===0)return
for(z=this.cy,y=c.a.a,x=b.a.a,w=z.a,v=a.a,u=this.ch,t=this.cx,s=u.a.a,r=u.b.a,q=0;q<this.x;++q){p=this.r[q]
this.d.cd(u,b,p.c)
this.d.cd(t,c,p.c)
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
if(v.hN(n,o,z))a.dm(n)}}},
ca:{"^":"c;a,az:b<,c,d,e,f,r"},
aX:{"^":"c;aQ:a<,dw:b?,c,bM:d@"},
ds:{"^":"c;a,b,c,d,e,f,r,x,y,z,Q,ch,cx,cy,db,dx,dy,fr",
ax:function(a,b,c,d){var z,y,x
this.z=a
this.Q=b
this.ch=c
this.r=0
this.y=0
this.x=0
this.a=d
z=this.b
if(z==null||a>z.length)this.b=H.f(new Array(a),[V.bg])
z=this.d
if(z==null||this.ch>z.length)this.d=H.f(new Array(this.ch),[V.M])
z=this.c
if(z==null||this.Q>z.length)this.c=H.f(new Array(this.Q),[V.aj])
y=this.f
z=y==null
if(z||this.z>y.length){if(z)y=H.f(new Array(0),[V.cC])
z=new Array(this.z)
z.fixed$length=Array
z=H.f(z,[V.cC])
this.f=z
x=y.length
C.d.a9(z,0,x,y,0)
for(;z=this.f,x<z.length;++x)z[x]=new V.cC(new E.a(new Float64Array(2)),0)}y=this.e
z=y==null
if(z||this.z>y.length){if(z)y=H.f(new Array(0),[V.co])
z=new Array(this.z)
z.fixed$length=Array
z=H.f(z,[V.co])
this.e=z
x=y.length
C.d.a9(z,0,x,y,0)
for(;z=this.e,x<z.length;++x)z[x]=new V.co(new E.a(new Float64Array(2)),0)}},
ec:function(a1,a2,a3,a4){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0
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
s=(s+z*l*m)*(1/(1+z*w.k1))}J.bY(this.e[x].gu(),r[0])
J.bZ(this.e[x].gu(),r[1])
this.e[x].sm(u)
q=t.a
this.f[x].gw().a[0]=q[0]
this.f[x].gw().a[1]=q[1]
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
p.dA(o)
p.dC()
if(a2.f)p.ib()
for(x=0;x<this.x;++x)this.d[x].aj(y)
for(x=0;x<a2.d;++x){for(k=0;k<this.x;++k)this.d[k].ah(y)
p.cM()}p.eA()
for(x=0;x<this.r;++x){j=this.e[x].gu()
u=this.e[x].gm()
t=this.f[x].gw()
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
this.e[x].sm(u+z*s)
this.f[x].sk(s)}x=0
while(!0){if(!(x<a2.e)){e=!1
break}d=p.ej()
for(c=!0,k=0;k<this.x;++k){b=this.d[k].ag(y)
c=c&&b}if(d&&c){e=!0
break}++x}for(x=0;x<this.r;++x){a=this.b[x]
y=a.f
q=y.c.a
q[0]=J.Q(this.e[x].gu())
q[1]=J.R(this.e[x].gu())
y.e=this.e[x].gm()
y=a.r.a
y[0]=this.f[x].gw().a[0]
y[1]=this.f[x].gw().a[1]
a.x=this.f[x].gk()
a.b1()}this.dL(p.e)
if(a4){for(a0=17976931348623157e292,x=0;x<this.r;++x){w=this.b[x]
if(w.a===C.e)continue
if((w.b&4)!==0){y=w.x
if(!(y*y>0.0012184696791468343)){y=w.r
y=y.B(y)>0.0001}else y=!0}else y=!0
if(y){w.k3=0
a0=0}else{y=w.k3+=z
a0=Math.min(a0,y)}}if(a0>=0.5&&e)for(x=0;x<this.r;++x)this.b[x].a2(!1)}},
eq:function(a,b,c){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k
for(z=0;z<this.r;++z){J.bY(this.e[z].gu(),this.b[z].f.c.a[0])
J.bZ(this.e[z].gu(),this.b[z].f.c.a[1])
this.e[z].sm(this.b[z].f.e)
this.f[z].gw().a[0]=this.b[z].r.a[0]
y=this.f[z].gw()
x=this.b
y.a[1]=x[z].r.a[1]
this.f[z].sk(x[z].x)}y=this.dy
y.b=this.c
y.c=this.y
y.a=a
y.d=this.e
y.e=this.f
x=this.dx
x.dA(y)
for(z=0;z<a.e;++z)if(x.er(b,c))break
this.b[b].f.b.a[0]=J.Q(this.e[b].gu())
this.b[b].f.b.a[1]=J.R(this.e[b].gu())
this.b[b].f.d=this.e[b].gm()
this.b[c].f.b.h(this.e[c].gu())
this.b[c].f.d=this.e[c].gm()
x.dC()
for(z=0;z<a.d;++z)x.cM()
w=a.a
for(z=0;z<this.r;++z){v=this.e[z].gu()
u=this.e[z].gm()
t=this.f[z].gw()
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
J.bY(this.e[z].gu(),p[0])
J.bZ(this.e[z].gu(),p[1])
this.e[z].sm(u)
this.f[z].gw().a[0]=y[0]
this.f[z].gw().a[1]=y[1]
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
m.b1()}this.dL(x.e)},
dL:function(a){var z,y,x,w,v,u,t,s,r
if(this.a==null)return
for(z=this.fr,y=z.a,x=z.b,w=0;w<this.y;++w){this.c[w]
v=a[w]
u=v.cy
z.c=u
for(t=v.a,s=0;s<u;++s){r=t[s]
y[s]=r.c
x[s]=r.d}this.a.toString}}},
fu:{"^":"M;ch,cx,cy,db,dx,dy,fr,a,b,c,d,e,f,r,x,y,z,Q",
dU:function(){var z,y,x,w,v,u,t
for(z=this.ch,y=0,x=0;C.b.N(x,z.gv(z));x=w){z.gv(z).H(0,1)
w=x+1
v=z.i(0,x).gbs()
v=v.gD(v)
u=z.i(0,w).gbs()
u=v.p(0,u.gE(u))
v=z.i(0,w).gbs()
v=v.gD(v)
t=z.i(0,x).gbs()
y=C.a.C(y,u.H(0,v.p(0,t.gE(t))))}return y*0.5},
e_:function(a){var z,y,x,w
for(z=this.ch,y=0,x=0;C.b.N(x,z.gv(z));x=w){z.gv(z).H(0,1)
w=x+1
y+=J.Q(a[z.i(0,x).gX()].gu())*J.R(a[z.i(0,w).gX()].gu())-J.Q(a[z.i(0,w).gX()].gu())*J.R(a[z.i(0,x).gX()].gu())}return y*0.5},
fe:function(a){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k
for(z=this.ch,y=0,x=0;C.b.N(x,z.gv(z));x=w){z.gv(z).H(0,1)
w=x+1
v=J.Q(a[z.i(0,w).gX()].gu())-J.Q(a[z.i(0,x).gX()].gu())
u=J.R(a[z.i(0,w).gX()].gu())-J.R(a[z.i(0,x).gX()].gu())
t=Math.sqrt(v*v+u*u)
if(t<11920928955078125e-23)t=1
s=this.db
s[x].a[0]=u/t
s[x].a[1]=-v/t
y+=t}s=this.Q.a
s=s.a[s.b++]
r=0.5*(this.cy-this.e_(a))/y
for(q=!0,x=0;C.b.N(x,z.gv(z));x=w){z.gv(z).H(0,1)
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
k=s.gL()
if(k>0.04000000000000001){p=0.2/Math.sqrt(k)
l[1]=l[1]*p
l[0]=l[0]*p}if(k>0.000025)q=!1
p=a[z.i(0,w).gX()].gu()
o=J.F(p)
o.sD(p,o.gD(p)+l[0])
p=a[z.i(0,w).gX()].gu()
o=J.F(p)
o.sE(p,o.gE(p)+l[1])}--this.Q.a.b
return q},
aj:function(a){var z,y,x,w,v,u,t,s,r
z=a.c
y=a.b
x=this.ch
w=this.Q.cE(x.gv(x))
for(v=J.B(w),u=0;C.b.N(u,x.gv(x));u=s){t=u===0?x.gv(x).H(0,1):u-1
x.gv(x).H(0,1)
s=u+1
v.i(w,u).h(y[x.i(0,s).gX()].gu())
v.i(w,u).j(y[x.i(0,t).gX()].gu())}r=a.a
if(r.f){this.dx=this.dx*r.c
for(u=0;C.b.N(u,x.gv(x));++u){r=z[x.i(0,u).gX()].gw().a
r[0]=C.a.C(r[0],x.i(0,u).gbe().p(0,J.R(v.i(w,u))).p(0,0.5).p(0,this.dx))
r=z[x.i(0,u).gX()].gw().a
r[1]=C.a.C(r[1],x.i(0,u).gbe().p(0,-J.Q(v.i(w,u))).p(0,0.5).p(0,this.dx))}}else this.dx=0},
ag:function(a){return this.fe(a.b)},
ah:function(a){var z,y,x,w,v,u,t,s,r,q,p,o
z=a.c
y=a.b
x=this.ch
w=this.Q.cE(x.gv(x))
for(v=J.B(w),u=0,t=0,s=0;C.b.N(s,x.gv(x));s=q){r=s===0?x.gv(x).H(0,1):s-1
x.gv(x).H(0,1)
q=s+1
v.i(w,s).h(y[x.i(0,q).gX()].gu())
v.i(w,s).j(y[x.i(0,r).gX()].gu())
t+=C.a.cu(v.i(w,s).gL(),x.i(0,s).giE())
u+=z[x.i(0,s).gX()].gw().t(v.i(w,s))}p=-2*u/t
this.dx+=p
for(s=0;C.b.N(s,x.gv(x));++s){o=z[x.i(0,s).gX()].gw().a
o[0]=C.a.C(o[0],x.i(0,s).gbe().p(0,J.R(v.i(w,s))).p(0,0.5).p(0,p))
o=z[x.i(0,s).gX()].gw().a
o[1]=C.a.C(o[1],x.i(0,s).gbe().p(0,-J.Q(v.i(w,s))).p(0,0.5).p(0,p))}},
ae:function(a){},
af:function(a){},
eJ:function(a,b){var z,y,x,w,v
this.dy=a
z=b.gdl()
if(z.gv(z).ih(0,2))throw H.e("You cannot create a constant volume joint with less than three _bodies.")
z=this.ch
y=new Float64Array(H.b(z.gv(z)))
this.cx=y
for(x=0;y=y.length,x<y;++x){w=x===y-1?0:x+1
y=z.i(0,x).gbs().H(0,z.i(0,w).gbs())
v=y.gv(y)
y=this.cx
y[x]=v}this.cy=this.dU()
b.ghD()
z=b.ghD()
z.gv(z)
z=b.gdl()
z.gv(z)
throw H.e("Incorrect joint definition.  Joints have to correspond to the _bodies")},
F:{
fv:function(a,b){var z=new V.fu(b.gdl().bN(0,!1),null,0,null,0,null,null,b.gay(b),null,null,null,null,null,null,!1,!1,null,null)
z.ai(a.ch,b)
z.eJ(a,b)
return z}}},
fM:{"^":"M;ch,cx,cy,db,dx,dy,fr,fx,fy,go,id,k1,k2,k3,k4,r1,r2,rx,ry,x1,a,b,c,d,e,f,r,x,y,z,Q",
ae:function(a){G.r(this.f.d,this.db,a)},
af:function(a){G.r(this.r.d,this.dx,a)},
aj:function(a){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f
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
v=a.b[this.fy].gu()
u=a.b[this.fy].gm()
t=a.c[this.fy].gw()
s=a.c[this.fy].gk()
r=a.b[this.go].gu()
q=a.b[this.go].gm()
p=a.c[this.go].gw()
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
x.l(0,z)
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
w.A(0,this.fr)
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
ah:function(a){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l
z=a.c[this.fy].gw()
y=a.c[this.fy].gk()
x=a.c[this.go].gw()
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
u.M(y,t)
t.l(0,z)
v=this.k2
v.M(w,s)
s.l(0,x)
r=this.id
s.j(t)
q=r.B(s)
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
ag:function(a){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l
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
s=a.b[this.fy].gu()
r=a.b[this.fy].gm()
q=a.b[this.go].gu()
p=a.b[this.go].gm()
w.G(r)
v.G(p)
t.h(this.db)
t.j(this.k3)
G.j(w,t,y)
t.h(this.dx)
t.j(this.k4)
G.j(v,t,u)
t.h(q)
t.l(0,u)
t.j(s)
t.j(y)
v=Math.max(-0.2,Math.min(t.S()-this.fx,0.2))
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
a.b[this.fy].sm(r-x*(t*m-y*n))
a.b[this.go].sm(p+l*(w*m-u*n))
u=this.Q
u.a.b-=3
u.f.b-=2
return Math.abs(v)<0.005}},
h_:{"^":"M;ch,cx,cy,db,dx,dy,fr,fx,fy,go,id,k1,k2,k3,k4,r1,r2,rx,a,b,c,d,e,f,r,x,y,z,Q",
ae:function(a){G.r(this.f.d,this.ch,a)},
af:function(a){G.r(this.r.d,this.cx,a)},
aj:function(a){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f
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
v=a.b[this.fr].gm()
u=a.c[this.fr].gw()
t=a.c[this.fr].gk()
s=a.b[this.fx].gm()
r=a.c[this.fx].gw()
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
n.bc(o+k*w*w+j*h*h,f,f,o+k*p*p+g*i)
i=this.r2
i.h(n)
i.bL()
i=k+j
this.rx=i
if(i>0)this.rx=1/i
w=a.a
p=this.cy
if(w.f){p.A(0,w.c)
this.db=this.db*a.a.c
w=this.Q.a
w=w.a[w.b++]
w.h(p)
x.h(w)
x.A(0,m)
u.j(x)
t-=k*(y.t(w)+this.db)
x.h(w)
x.A(0,l)
r.l(0,x)
q+=j*(z.t(w)+this.db);--this.Q.a.b}else{p.I()
this.db=0}J.a1(a.c[this.fr].gk(),t)
a.c[this.fr].sk(t)
a.c[this.fx].sk(q)
z=this.Q
z.f.b-=2;--z.a.b;--z.c.b},
ah:function(a){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i
z=a.c[this.fr].gw()
y=a.c[this.fr].gk()
x=a.c[this.fx].gw()
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
m.M(y,k)
q=this.go
q.M(w,l)
l.l(0,x)
l.j(z)
l.j(k)
j=this.Q.a
j=j.a[j.b++]
this.r2.cq(l,j)
j.J()
l=this.Q.a
l=l.a[l.b++]
i=this.cy
l.h(i)
i.l(0,j)
o=r*this.dx
if(i.gL()>o*o){i.S()
i.A(0,o)}j.h(i)
j.j(l)
k.h(j)
k.A(0,v)
z.j(k)
y-=t*m.t(j)
k.h(j)
k.A(0,u)
x.l(0,k)
q=q.t(j)
J.a1(a.c[this.fr].gk(),y)
a.c[this.fr].sk(y)
a.c[this.fx].sk(w+s*q)
this.Q.a.b-=4},
ag:function(a){return!0}},
h0:{"^":"M;ch,cx,cy,db,dx,dy,fr,fx,fy,go,id,k1,k2,k3,k4,r1,r2,rx,ry,x1,x2,y1,y2,O,R,Y,U,a_,V,a0,a4,aa,ab,aq,aJ,aK,aL,ac,ar,as,a,b,c,d,e,f,r,x,y,z,Q",
ae:function(a){G.r(this.f.d,this.fr,a)},
af:function(a){G.r(this.r.d,this.fx,a)},
aj:function(a){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b
this.rx=this.f.c
this.ry=this.r.c
z=this.dx
this.x1=z.gX()
y=this.dy
this.x2=y.gX()
x=this.y1
x.h(this.f.f.a)
w=this.y2
w.h(this.r.f.a)
v=this.O
v.h(z.gaP().ghJ())
u=this.R
u.h(y.gaP().ghJ())
this.Y=this.f.fx
this.U=this.r.fx
this.a_=z.gbe()
this.V=y.gbe()
this.a0=this.f.go
this.a4=this.r.go
this.aa=z.gfq()
this.ab=y.gfq()
t=a.b[this.rx].gm()
s=a.c[this.rx].gw()
r=a.c[this.rx].gk()
q=a.b[this.ry].gm()
p=a.c[this.ry].gw()
o=a.c[this.ry].gk()
n=a.b[this.x1].gm()
m=a.c[this.x1].gw()
l=a.c[this.x1].gk()
k=a.b[this.x2].gm()
j=a.c[this.x2].gw()
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
this.ac=c.t(y)
y=z.t(y)
this.aK=y
z=this.as
c=this.a_
h=this.Y
x=this.aa
f=this.ac
y=z+(c+h+x*f*f+this.a0*y*y)
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
d.A(0,this.r1)
this.ar=this.r1*v.t(x)
x=this.r1*h.t(x)
this.aL=x
h=this.as
v=this.r1
d=this.V
g=this.U
w=this.ab
e=this.ar
x=h+(v*v*(d+g)+w*e*e+this.a4*x*x)
this.as=x
e=this.Q
e.a.b-=3
y=e
z=x
this.as=z>0?1/z:0
if(a.a.f){z=s.a
x=z[0]
w=this.Y
v=this.r2
w*=v
u=this.aq.a
z[0]=x+w*u[0]
z[1]=z[1]+w*u[1]
r+=this.a0*v*this.aK
w=p.a
z=w[0]
x=this.U*v
h=this.aJ.a
w[0]=z+x*h[0]
w[1]=w[1]+x*h[1]
o+=this.a4*v*this.aL
x=m.a
w=x[0]
z=this.a_*v
x[0]=w-z*u[0]
x[1]=x[1]-z*u[1]
l-=this.aa*v*this.ac
u=j.a
z=u[0]
x=this.V*v
u[0]=z-x*h[0]
u[1]=u[1]-x*h[1]
i-=this.ab*v*this.ar}else this.r2=0;--y.a.b
y.f.b-=4
a.c[this.rx].sk(r)
a.c[this.ry].sk(o)
a.c[this.x1].sk(l)
a.c[this.x2].sk(i)},
ah:function(a){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g
z=a.c[this.rx].gw()
y=a.c[this.rx].gk()
x=a.c[this.ry].gw()
w=a.c[this.ry].gk()
v=a.c[this.x1].gw()
u=a.c[this.x1].gk()
t=a.c[this.x2].gw()
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
p=q.B(p)
r=this.aJ
o.h(x)
o.j(t)
o=r.B(o)
n=this.aK
m=this.ac
l=this.aL
k=this.ar
this.Q.a.b-=2
j=-this.as*(p+o+(n*y-m*u+(l*w-k*s)))
this.r2+=j
o=z.a
p=o[0]
i=this.Y*j
q=q.a
o[0]=p+i*q[0]
o[1]=o[1]+i*q[1]
i=this.a0
o=x.a
p=o[0]
h=this.U*j
r=r.a
o[0]=p+h*r[0]
o[1]=o[1]+h*r[1]
h=this.a4
o=v.a
p=o[0]
g=this.a_*j
o[0]=p-g*q[0]
o[1]=o[1]-g*q[1]
q=this.aa
g=t.a
o=g[0]
p=this.V*j
g[0]=o-p*r[0]
g[1]=g[1]-p*r[1]
r=this.ab
a.c[this.rx].sk(y+i*j*n)
a.c[this.ry].sk(w+h*j*l)
a.c[this.x1].sk(u-q*j*m)
a.c[this.x2].sk(s-r*j*k)},
ag:function(a4){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2,a3
z=a4.b[this.rx].gu()
y=a4.b[this.rx].gm()
x=a4.b[this.ry].gu()
w=a4.b[this.ry].gm()
v=a4.b[this.x1].gu()
u=a4.b[this.x1].gm()
t=a4.b[this.x2].gu()
s=a4.b[this.x2].gm()
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
e=this.O
l.j(e)
G.j(n,l,i)
l.h(this.fr)
l.j(this.y1)
G.j(p,l,h)
d=i.t(k)
c=h.t(k)
b=0+(this.a_+this.Y+this.aa*d*d+this.a0*c*c)
g.h(q)
g.j(e)
l.h(h)
l.l(0,z)
l.j(v)
G.Z(n,l,f)
f.j(g)
a=f.B(r)
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
f=this.R
l.j(f)
G.j(m,l,n)
l.h(this.fx)
l.j(this.y2)
G.j(o,l,i)
j.h(p)
j.A(0,this.r1)
a0=n.t(p)
a1=i.t(p)
p=this.r1
b+=p*p*(this.V+this.U)+this.ab*a0*a0+this.a4*a1*a1
h.h(r)
h.j(f)
l.h(i)
l.l(0,x)
l.j(t)
G.Z(m,l,g)
g.j(h)
a2=g.B(q)
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
p=this.Y*a3
k=k.a
r[0]=q+p*k[0]
r[1]=r[1]+p*k[1]
p=this.a0
r=x.a
q=r[0]
o=this.U*a3
j=j.a
r[0]=q+o*j[0]
r[1]=r[1]+o*j[1]
o=this.a4
r=v.a
q=r[0]
n=this.a_*a3
r[0]=q-n*k[0]
r[1]=r[1]-n*k[1]
k=this.aa
n=t.a
r=n[0]
q=this.V*a3
n[0]=r-q*j[0]
n[1]=n[1]-q*j[1]
j=this.ab
a4.b[this.rx].sm(y+p*a3*c)
a4.b[this.ry].sm(w+o*a3*a1)
a4.b[this.x1].sm(u-k*a3*d)
a4.b[this.x2].sm(s-j*a3*a0)
return!0}},
M:{"^":"c;",
ai:function(a,b){this.Q=a
this.b=null
this.c=null
this.f=b.c
this.r=b.d
this.y=!1
this.x=!1
this.z=b.b
this.d=new V.dz(null,null,null,null)
this.e=new V.dz(null,null,null,null)}},
hl:{"^":"c;az:b<"},
dz:{"^":"c;a,b,c,d"},
N:{"^":"c;a,b",
n:function(a){return this.b}},
by:{"^":"c;a,b",
n:function(a){return this.b}},
hA:{"^":"M;ch,cx,cy,db,dx,dy,fr,fx,fy,go,id,k1,k2,k3,k4,r1,r2,rx,ry,x1,x2,a,b,c,d,e,f,r,x,y,z,Q",
ae:function(a){a.h(this.f.d.a)},
af:function(a){a.h(this.r.d.a)},
aj:function(a){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c
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
v=a.b[this.fx].gu()
u=a.b[this.fx].gm()
t=a.c[this.fx].gw()
s=a.c[this.fx].gk()
r=a.b[this.fy].gu()
q=a.b[this.fy].gm()
p=a.c[this.fy].gw()
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
w.bc(z+f*y*y+e*l*l,c,c,z+f*x*x+d*k)
k=this.x1
k.h(w)
k.bL()
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
ah:function(a1){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0
z=a1.c[this.fx].gw()
y=a1.c[this.fx].gk()
x=a1.c[this.fy].gw()
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
this.x1.cq(m,n)
n.J()
m=this.Q.a
m=m.a[m.b++]
b=this.cy
m.h(b)
b.l(0,n)
h=q*this.dx
if(b.gL()>h*h){b.S()
b.A(0,h)}r=b.a
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
ag:function(a){return!0}},
hB:{"^":"M;ch,cx,cy,db,dx,dy,fr,fx,fy,go,id,k1,k2,k3,k4,a,b,c,d,e,f,r,x,y,z,Q",
ae:function(a){a.h(this.cx)},
af:function(a){G.r(this.r.d,this.ch,a)},
aj:function(a){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l
z=this.r
this.fy=z.c
y=this.id
y.h(z.f.a)
z=this.r
this.k1=z.fx
this.k2=z.go
x=a.b[this.fy].gu()
w=a.b[this.fy].gm()
v=a.c[this.fy].gw()
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
r.bc(z+p*n*n+m,l,l,z+p*o*o+m)
m=this.k3
m.h(r)
m.bL()
m=this.k4
m.h(x)
m.l(0,y)
m.j(this.cx)
m.A(0,this.dx)
u*=0.98
z=a.a
r=this.dy
if(z.f){r.A(0,z.c)
z=v.a
p=z[0]
o=this.k1
n=r.a
z[0]=p+o*n[0]
z[1]=z[1]+o*n[1]
u+=this.k2*y.t(r)}else r.I()
a.c[this.fy].sk(u)
z=this.Q;--z.a.b;--z.c.b;--z.f.b},
ag:function(a){return!0},
ah:function(a){var z,y,x,w,v,u,t,s,r
z=a.c[this.fy].gw()
y=a.c[this.fy].gk()
x=this.Q.a
x=x.a[x.b++]
w=this.go
w.M(y,x)
x.l(0,z)
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
s.A(0,this.fx)
s.l(0,this.k4)
s.l(0,x)
s.J()
this.k3.cq(s,t)
s.h(u)
u.l(0,t)
r=a.a.a*this.fr
if(u.gL()>r*r)u.A(0,r/Math.sqrt(u.gL()))
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
i3:{"^":"M;ch,cx,cy,db,dx,dy,fr,fx,fy,go,id,k1,k2,k3,k4,r1,r2,rx,ry,x1,x2,y1,y2,O,R,Y,U,a_,V,a0,a,b,c,d,e,f,r,x,y,z,Q",
ae:function(a){G.r(this.f.d,this.ch,a)},
af:function(a){G.r(this.r.d,this.cx,a)},
aj:function(a2){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1
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
v=a2.b[this.k4].gu()
u=a2.b[this.k4].gm()
t=a2.c[this.k4].gw()
s=a2.c[this.k4].gk()
r=a2.b[this.r1].gu()
q=a2.b[this.r1].gm()
p=a2.c[this.r1].gw()
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
x.l(0,i)
x.j(j)
h=this.ry
g=this.x1
f=this.x2
e=this.y1
l=this.y2
G.j(m,this.cy,l)
k.h(x)
k.l(0,j)
this.U=k.t(l)
z=i.t(l)
this.a_=z
y=h+g
n=this.U
z=y+f*n*n+e*z*z
this.a0=z
if(z>0)this.a0=1/z
z=this.O
G.j(m,this.db,z)
k.h(x)
k.l(0,j)
this.R=k.t(z)
i=i.t(z)
this.Y=i
j=this.R
x=f*j
m=e*i
d=x+m
w=this.U
n=this.a_
c=x*w+m*n
b=f+e
if(b===0)b=1
a=f*w
a0=e*n
a1=a+a0
this.V.b_(y+x*j+m*i,d,c,d,b,a1,c,a1,y+a*w+a0*n)
this.k3=C.i
y=this.dy
x=y.a
x[2]=0
this.fr=0
w=a2.a
if(w.f){y.A(0,w.c)
this.fr=this.fr*a2.a.c
y=this.Q.a
y=y.a[y.b++]
k.h(l)
k.A(0,this.fr+x[2])
y.h(z)
y.A(0,x[0])
y.l(0,k)
k=x[0]
z=this.R
l=x[1]
x=this.fr+x[2]
w=this.U
n=this.Y
m=this.a_
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
ah:function(a){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l
z=a.c[this.k4].gw()
y=a.c[this.k4].gk()
x=a.c[this.r1].gw()
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
q=this.O
p=q.B(p)
o=this.Y
n=this.R
m=r.a
m[0]=p+o*w-n*y
m[1]=w-y
p=this.Q.a
p=p.a[p.b++]
r.J()
E.b4(this.V,p,r)
r.J()
r=this.dy.a
o=r[0]
p=p.a
r[0]=o+p[0]
r[1]=r[1]+p[1]
r=this.Q.a
r=r.a[r.b++]
r.h(q)
r.A(0,p[0])
q=p[0]
o=this.R
p=p[1]
n=this.Y
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
ag:function(a2){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1
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
n=a2.b[this.k4].gu()
m=a2.b[this.k4].gm()
l=a2.b[this.r1].gu()
k=a2.b[this.r1].gm()
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
s.l(0,t)
s.j(n)
s.j(u)
G.j(w,this.cy,r)
p.h(s)
p.l(0,u)
f=p.t(r)
e=t.t(r)
G.j(w,this.db,q)
p.h(s)
p.l(0,u)
d=p.t(q)
c=t.t(q)
s=q.B(s)
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
E.dG(w,p,o)
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
a2.b[this.k4].sm(m-h*(y*d+z+w*f))
a2.b[this.r1].sm(k+g*(y*c+z+w*e))
w=this.Q
w.a.b-=7;--w.b.b
w.f.b-=2
return Math.abs(s)<=0.005&&Math.abs(t)<=0.03490658503988659}},
dU:{"^":"M;ch,cx,cy,db,dx,dy,fr,fx,fy,go,id,k1,k2,k3,k4,r1,r2,rx,ry,x1,x2,y1,a,b,c,d,e,f,r,x,y,z,Q",
ae:function(a){G.r(this.f.d,this.dx,a)},
af:function(a){G.r(this.r.d,this.dy,a)},
aj:function(a){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h
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
v=a.b[this.go].gu()
u=a.b[this.go].gm()
t=a.c[this.go].gw()
s=a.c[this.go].gk()
r=a.b[this.id].gu()
q=a.b[this.id].gm()
p=a.c[this.id].gw()
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
w.l(0,y)
w.j(this.ch)
l=this.k2
l.h(r)
l.l(0,z)
l.j(this.cx)
m=Math.sqrt(w.gL())
n=Math.sqrt(l.gL())
if(m>0.05)w.A(0,1/m)
else w.I()
if(n>0.05)l.A(0,1/n)
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
m.A(0,-this.fy)
i.h(l)
i.A(0,-this.fx*this.fy)
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
ah:function(a){var z,y,x,w,v,u,t,s,r,q,p,o,n,m
z=a.c[this.go].gw()
y=a.c[this.go].gk()
x=a.c[this.id].gw()
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
u.M(y,t)
t.l(0,z)
v=this.k4
v.M(w,s)
s.l(0,x)
p=this.k1
t=p.B(t)
o=this.fx
n=this.k2
s=n.B(s)
m=-this.y1*(-t-o*s)
this.fy+=m
r.h(p)
r.A(0,-m)
q.h(n)
q.A(0,-this.fx*m)
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
ag:function(a){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e
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
o=a.b[this.go].gu()
n=a.b[this.go].gm()
m=a.b[this.id].gu()
l=a.b[this.id].gm()
w.G(n)
v.G(l)
r.h(this.dx)
r.j(this.r1)
G.j(w,r,y)
r.h(this.dy)
r.j(this.r2)
G.j(v,r,u)
t.h(o)
t.l(0,y)
t.j(this.ch)
s.h(m)
s.l(0,u)
s.j(this.cx)
r=Math.sqrt(t.gL())
v=Math.sqrt(s.gL())
if(r>0.05)t.A(0,1/r)
else t.I()
if(v>0.05)s.A(0,1/v)
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
q.A(0,-e)
p.h(s)
p.A(0,-this.fx*e)
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
a.b[this.go].sm(n+v*q)
a.b[this.id].sm(l+x*p)
p=this.Q
p.f.b-=2
p.a.b-=7
return Math.abs(f)<0.005}},
ct:{"^":"M;ch,cx,cy,db,dx,dy,fr,fx,fy,go,id,k1,k2,k3,k4,r1,r2,rx,ry,x1,x2,y1,y2,O,a,b,c,d,e,f,r,x,y,z,Q",
aj:function(a){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e
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
v=a.b[this.k1].gm()
u=a.c[this.k1].gw()
t=a.c[this.k1].gk()
s=a.b[this.k2].gm()
r=a.c[this.k2].gw()
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
g.b_(n+p*p*k+i*i*j,f[3],f[6],h*o*k-i*x*j,n+o*o*k+x*x*j,f[7],h*k-i*j,o*k+x*j,w)
this.y2=w
if(w>0)this.y2=1/w
this.db=0
if(this.fx&&w!==0){e=s-v-this.fy
x=this.id
w=this.go
if(Math.abs(x-w)<0.06981317007977318)this.O=C.y
else if(e<=w){if(this.O!==C.t)this.cy.a[2]=0
this.O=C.t}else if(e>=x){if(this.O!==C.q)this.cy.a[2]=0
this.O=C.q}else{this.O=C.i
this.cy.a[2]=0}}else this.O=C.i
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
ah:function(a){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g
z=a.c[this.k1].gw()
y=a.c[this.k1].gk()
x=a.c[this.k2].gw()
w=a.c[this.k2].gk()
v=this.rx
u=this.ry
t=this.x1
s=this.x2
r=this.Q
q=r.a
p=q.a
o=q.b
n=o+1
q.b=n
o=p[o]
m=this.fx&&this.O!==C.i&&t+s!==0
l=this.k4
k=this.k3
j=this.y1
i=n+1
if(m){q.b=i
q=p[n]
r=r.b
r=r.a[r.b++]
k.M(y,o)
l.M(w,q)
q.l(0,x)
q.j(z)
q.j(o)
p=q.a
r.bV(p[0],p[1],w-y)
p=this.Q.b
p=p.a[p.b++]
E.dH(j,p,r)
p.J()
r=this.O
if(r===C.y)this.cy.l(0,p)
else if(r===C.t){r=this.cy
n=r.a
m=n[2]
i=p.a
if(m+i[2]<0){r=this.Q.a
r=r.a[r.b++]
m=j.a
h=m[6]
m=m[7]
g=r.a
g[0]=h
g[1]=m
r.A(0,n[2])
r.j(q)
E.b4(j,o,r)
o=o.a
i[0]=o[0]
i[1]=o[1]
i[2]=-n[2]
n[0]=n[0]+o[0]
n[1]=n[1]+o[1]
n[2]=0;--this.Q.a.b}else r.l(0,p)}else if(r===C.q){r=this.cy
n=r.a
m=n[2]
i=p.a
if(m+i[2]>0){r=this.Q.a
r=r.a[r.b++]
m=j.a
h=m[6]
m=m[7]
g=r.a
g[0]=h
g[1]=m
r.A(0,n[2])
r.j(q)
E.b4(j,o,r)
o=o.a
i[0]=o[0]
i[1]=o[1]
i[2]=-n[2]
n[0]=n[0]+o[0]
n[1]=n[1]+o[1]
n[2]=0;--this.Q.a.b}else r.l(0,p)}r=this.Q.a
r=r.a[r.b++]
p=p.a
q=p[0]
o=p[1]
n=r.a
n[0]=q
n[1]=o
o=z.a
o[0]=o[0]-v*n[0]
o[1]=o[1]-v*n[1]
y-=t*(k.t(r)+p[2])
k=x.a
k[0]=k[0]+u*n[0]
k[1]=k[1]+u*n[1]
w+=s*(l.t(r)+p[2])
p=this.Q
p.a.b-=2
p.b.b-=2}else{q.b=i
r=p[n]
q.b=i+1
i=p[i]
k.M(y,o)
l.M(w,r)
r.l(0,x)
r.j(z)
r.j(o)
r.J()
E.b4(j,i,r)
r=this.cy.a
j=r[0]
o=i.a
r[0]=j+o[0]
r[1]=r[1]+o[1]
r=z.a
r[0]=r[0]-v*o[0]
r[1]=r[1]-v*o[1]
y-=t*k.t(i)
k=x.a
k[0]=k[0]+u*o[0]
k[1]=k[1]+u*o[1]
w+=s*l.t(i)
this.Q.a.b-=2}a.c[this.k1].sk(y)
a.c[this.k2].sk(w);--this.Q.a.b},
ag:function(a){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b
z=this.Q.f
y=z.a
x=z.b
w=x+1
z.b=w
x=y[x]
z.b=w+1
w=y[w]
v=a.b[this.k1].gu()
u=a.b[this.k1].gm()
t=a.b[this.k2].gu()
s=a.b[this.k2].gm()
x.G(u)
w.G(s)
y=this.x1
z=this.x2
if(this.fx&&this.O!==C.i&&y+z!==0){r=s-u-this.fy
q=this.O
if(q===C.y){q=Math.max(-0.13962634015954636,Math.min(r-this.go,0.13962634015954636))
p=-this.y2*q
o=Math.abs(q)}else if(q===C.t){n=r-this.go
o=-n
q=Math.max(-0.13962634015954636,Math.min(n+0.03490658503988659,0))
p=-this.y2*q}else if(q===C.q){n=r-this.id
q=Math.max(0,Math.min(n-0.03490658503988659,0.13962634015954636))
p=-this.y2*q
o=n}else{o=0
p=0}u-=y*p
s+=z*p}else o=0
x.G(u)
w.G(s)
z=this.Q.a
y=z.a
q=z.b
m=q+1
z.b=m
q=y[q]
l=m+1
z.b=l
m=y[m]
k=l+1
z.b=k
l=y[l]
z.b=k+1
k=y[k]
l.h(this.ch)
l.j(this.r1)
G.j(x,l,q)
l.h(this.cx)
l.j(this.r2)
G.j(w,l,m)
l.h(t)
l.l(0,m)
l.j(v)
l.j(q)
w=Math.sqrt(l.gL())
j=this.rx
i=this.ry
h=this.x1
g=this.x2
x=this.Q.c
x=x.a[x.b++]
y=j+i
z=q.a
f=z[1]
e=m.a
d=e[1]
z=z[0]
e=e[0]
c=g*e
b=-h*z*f-c*d
x.bc(y+h*f*f+g*d*d,b,b,y+h*z*z+c*e)
E.dG(x,k,l)
k.J()
l=v.a
x=l[0]
e=k.a
l[0]=x-j*e[0]
l[1]=l[1]-j*e[1]
q=q.t(k)
l=t.a
l[0]=l[0]+i*e[0]
l[1]=l[1]+i*e[1]
k=m.t(k)
m=this.Q
m.a.b-=4;--m.c.b
a.b[this.k1].sm(u-h*q)
a.b[this.k2].sm(s+g*k)
this.Q.f.b-=2
return w<=0.005&&o<=0.03490658503988659},
ae:function(a){G.r(this.f.d,this.ch,a)},
af:function(a){G.r(this.r.d,this.cx,a)},
cJ:function(a,b){if(a!==this.go||b!==this.id){this.f.a2(!0)
this.r.a2(!0)
this.cy.a[2]=0
this.go=a
this.id=b}}},
dX:{"^":"hl;f,r,x,y,z,Q,ch,cx,cy,a,b,c,d,e"},
i9:{"^":"M;ch,cx,cy,db,dx,dy,fr,fx,fy,go,id,k1,k2,k3,k4,r1,r2,rx,a,b,c,d,e,f,r,x,y,z,Q",
aj:function(a){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f
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
v=a.b[this.dy].gu()
u=a.b[this.dy].gm()
t=a.c[this.dy].gw()
s=a.c[this.dy].gk()
r=a.b[this.fr].gu()
q=a.b[this.fr].gm()
p=a.c[this.fr].gw()
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
w.l(0,z)
w.j(v)
w.j(y)
l=Math.sqrt(w.gL())
this.db=l
if(l-this.cy>0)this.rx=C.q
else this.rx=C.i
if(l>0.005)w.A(0,1/l)
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
ah:function(a){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j
z=a.c[this.dy].gw()
y=a.c[this.dy].gk()
x=a.c[this.fr].gw()
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
u.M(y,t)
t.l(0,z)
v=this.go
v.M(w,s)
s.l(0,x)
q=this.db-this.cy
p=this.fx
r.h(s)
r.j(t)
o=p.B(r)
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
ag:function(a){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k
z=a.b[this.dy].gu()
y=a.b[this.dy].gm()
x=a.b[this.fr].gu()
w=a.b[this.fr].gm()
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
u.l(0,p)
u.j(z)
u.j(q)
n=u.S()
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
a.b[this.dy].sm(y-r*(u*k-q*l))
a.b[this.fr].sm(w+t*(o*k-p*l))
return n-this.cy<0.005},
ae:function(a){G.r(this.f.d,this.ch,a)},
af:function(a){G.r(this.r.d,this.cx,a)}},
iK:{"^":"M;ch,cx,cy,db,dx,dy,fr,fx,fy,go,id,k1,k2,k3,k4,r1,r2,rx,ry,a,b,c,d,e,f,r,x,y,z,Q",
ae:function(a){G.r(this.f.d,this.db,a)},
af:function(a){G.r(this.r.d,this.dx,a)},
aj:function(a5){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2,a3,a4
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
v=a5.b[this.fy].gm()
u=a5.c[this.fy].gw()
t=a5.c[this.fy].gk()
s=a5.b[this.go].gm()
r=a5.c[this.go].gw()
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
w.b_(n+p*p*k+i*i*j,g[3],g[6],h*o*k-i*x*j,n+o*o*k+x*x*j,g[7],h*k-i*j,o*k+x*j,f)
x=this.ry
if(this.ch>0){w=g[0]
p=g[3]
o=g[1]
g=g[4]
e=w*g-p*o
if(e!==0)e=1/e
n=-e
x.b_(e*g,n*o,0,n*p,e*w,0,0,0,0)
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
x.b_(e*(o-i*i),e*(h*i-a2),e*(a3-h*w),n[1],e*(a4*p-h*h),e*(h*a1-a4*i),n[2],n[5],e*(a4*w-a1*a1))
this.fr=0
this.cy=0}x=a5.a
w=this.fx
if(x.f){p=this.Q.a
p=p.a[p.b++]
w.A(0,x.c)
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
ah:function(a){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b
z=a.c[this.fy].gw()
y=a.c[this.fy].gk()
x=a.c[this.go].gw()
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
l.M(w,p)
r.M(y,n)
p.l(0,x)
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
w+=s*l.t(o)}else{r.M(y,n)
l.M(w,p)
p.l(0,x)
p.j(z)
p.j(n)
n=this.Q.b
n=n.a[n.b++]
p=p.a
n.bV(p[0],p[1],m)
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
k.l(0,m)
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
ag:function(a){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d
z=a.b[this.fy].gu()
y=a.b[this.fy].gm()
x=a.b[this.go].gu()
w=a.b[this.go].gm()
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
r.b_(s+k*k*m+i*i*l,g[3],g[6],h*u*m-i*j*l,s+u*u*m+j*j*l,g[7],h*m-i*l,u*m+j*l,m+l)
u=z.a
s=x.a
if(this.ch>0){t.h(x)
t.l(0,p)
t.j(z)
t.j(q)
f=Math.sqrt(t.gL())
E.b4(r,v,t)
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
t.l(0,p)
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
i.bV(t[0],t[1],d)
E.dH(r,h,i)
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
this.Q.b.b-=2}a.b[this.fy].sm(y)
a.b[this.go].sm(w)
v=this.Q
v.a.b-=5
v.f.b-=2;--v.d.b
return f<=0.005&&e<=0.03490658503988659}},
iL:{"^":"M;ch,cx,cy,db,dx,dy,fr,fx,fy,go,id,k1,k2,k3,k4,r1,r2,rx,ry,x1,x2,y1,y2,O,R,Y,U,a_,V,a0,a4,aa,ab,aq,a,b,c,d,e,f,r,x,y,z,Q",
ae:function(a){G.r(this.f.d,this.cy,a)},
af:function(a){G.r(this.r.d,this.db,a)},
aj:function(a0){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a
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
t=a0.b[this.k2].gu()
s=a0.b[this.k2].gm()
r=a0.c[this.k2].gw()
q=a0.c[this.k2].gk()
p=a0.b[this.k3].gu()
o=a0.b[this.k3].gm()
n=a0.c[this.k3].gw()
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
y=this.aa
G.j(i,l,y)
l.h(this.db)
l.j(z)
z=this.ab
G.j(h,l,z)
h=this.aq
h.h(p)
h.l(0,z)
h.j(t)
h.j(y)
j=this.y1
G.ao(i,this.dy,j)
l.h(h)
l.l(0,y)
this.R=l.t(j)
k=z.t(j)
this.Y=k
u=w+u
w=this.R
k=u+x*w*w+v*k*k
this.U=k
if(k>0)this.U=1/k
this.V=0
this.a0=0
this.a4=0
if(this.ch>0){w=this.x2
G.ao(i,this.dx,w)
l.h(h)
l.l(0,y)
this.y2=l.t(w)
z=z.t(w)
this.O=z
l=this.y2
g=u+x*l*l+v*z*z
if(g>0){this.V=1/g
f=h.B(w)
e=6.283185307179586*this.ch
z=this.V
y=this.cx
d=z*e*e
c=a0.a.a
y=c*(2*z*y*e+c*d)
this.a4=y
if(y>0){z=1/y
this.a4=z}else z=y
this.a0=f*c*d*z
z=g+z
this.V=z
if(z>0)this.V=1/z}}else this.fy=0
this.a_=0
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
k=this.R
j=this.y2
i=this.Y
l=this.O
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
ah:function(a){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f
z=this.r2
y=this.rx
x=this.ry
w=this.x1
v=a.c[this.k2].gw()
u=a.c[this.k2].gk()
t=a.c[this.k3].gw()
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
r=q.B(p)
n=this.O
m=this.y2
l=this.V
k=this.a0
j=this.a4
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
i=this.a_
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
p=n.B(p)
i=this.Y
j=this.R
h=-this.U*(p+i*s-j*u)
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
ag:function(a){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h
z=a.b[this.k2].gu()
y=a.b[this.k2].gm()
x=a.b[this.k3].gu()
w=a.b[this.k3].gm()
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
t=this.aa
G.ao(s,v,t)
v.h(this.db)
v.j(this.r1)
u=this.ab
G.ao(r,v,u)
r=this.aq
r.h(x)
r.j(z)
r.l(0,u)
r.j(t)
q=this.Q.a
q=q.a[q.b++]
G.ao(s,this.dy,q)
v.h(r)
v.l(0,t)
p=v.t(q)
o=u.t(q)
n=r.B(q)
r=this.r2
u=this.rx
v=this.ry
t=this.R
s=this.x1
m=this.Y
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
a.b[this.k2].sm(y-v*(k*p))
a.b[this.k3].sm(w+s*(k*o))
return Math.abs(n)<=0.005}},
a6:{"^":"c;a,b,c,d,e",
au:function(a){this.a=this.a*0.95+a*0.05
this.b=this.b*0.8+a*0.2
this.c=Math.min(a,this.c)
this.d=Math.max(a,this.d)},
n:function(a){return H.d(this.b)+" ("+H.d(this.a)+") ["+H.d(this.c)+","+H.d(this.d)+"]"}},
i4:{"^":"c;a,b,c,d,e,f,r,x,y,z"},
e0:{"^":"c;a,b,c"},
ec:{"^":"c;a,b,c,d,e,f"},
iO:{"^":"c;a,b,c,d,e,f,r,x,y,z,Q,ch,cx,cy,db,dx,dy,fr,fx,fy,go,id,k1,k2,k3,k4,r1,r2,rx,ry,x1,x2,y1,y2,O,R,Y,U,a_,V,a0,a4,aa,ab,aq,aJ,aK,aL,ac,ar,as",
aO:function(a,b,c){var z,y,x,w,v
z=new V.bn(null,!1)
z.a=a
z.b=!0
y=this.fy
x=b.a
w=c.a
y[x][w]=z
if(b!==c){v=new V.bn(null,!1)
v.a=a
y[w][x]=v}},
fp:function(){var z=this.ch
this.aO(z.ch,C.m,C.m)
this.aO(z.cx,C.k,C.m)
this.aO(z.Q,C.k,C.k)
this.aO(z.cy,C.o,C.m)
this.aO(z.db,C.o,C.k)
this.aO(z.dx,C.v,C.m)
this.aO(z.dy,C.v,C.k)},
hO:function(a,b,c,d){var z,y,x,w,v,u
z=a.d.a
y=c.d.a
x=this.fy[z.a][y.a]
if(x!=null){w=x.b
v=x.a
if(w){u=v.dH()
u.ax(a,b,c,d)
return u}else{u=v.dH()
u.ax(c,d,a,b)
return u}}else return},
bH:function(a){var z,y,x,w,v,u,t,s,r
if((this.a&2)===2)return
z=G.v()
y=G.v()
x=new E.a(new Float64Array(H.b(2)))
w=new E.a(new Float64Array(H.b(2)))
v=new E.a(new Float64Array(H.b(2)))
u=new G.ax(x,w,v,0,0,0)
t=new E.a(new Float64Array(H.b(2)))
s=new E.a(new Float64Array(H.b(2)))
r=new V.bg(C.e,0,0,z,y,u,t,0,s,0,this,null,null,null,0,null,null,0,0,0,0,0,0,0,0,null,new V.ca(null,null,0.2,0,0,!1,new V.bt(1,65535,0)),new V.hx(0,new E.a(new Float64Array(H.b(2))),0),G.v())
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
bI:function(a){var z,y,x,w,v,u,t
if((this.a&2)===2)return
z=V.hm(this,a)
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
fS:function(){var z,y
for(z=this.c;z!=null;z=z.cx){y=z.y.a
y[0]=0
y[1]=0
z.z=0}},
hb:function(){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2
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
this.bi(q,v,z,x)}else{p=w.a
if(p===C.e){z.av(0.5,0.9,0.3)
this.bi(q,v,z,x)}else if(p===C.H){z.av(0.5,0.5,0.9)
this.bi(q,v,z,x)}else if((s&2)!==2){z.av(0.5,0.5,0.5)
this.bi(q,v,z,x)}else{z.av(0.9,0.7,0.7)
this.bi(q,v,z,x)}}}}z=this.fx
v=this.Q.a
o=z.z
if(o!==0){n=z.r/2
m=z.cy.a
l=z.fx.a!=null?z.dY():null
z=this.Q
if((v&128)!==0)z.hd(m,n,l,o)
else z.hc(m,n,l,o)}}if((y&4)!==0)for(k=this.d,z=this.ch.a,v=this.k2,u=z.a;k!=null;k=k.c){j=k.f
i=k.r
h=j.d.a
g=i.d.a
t=z.b
s=t+1
z.b=s
t=u[t]
z.b=s+1
s=u[s]
k.ae(t)
k.af(s)
v.av(0.5,0.8,0.8)
switch(k.a){case C.O:this.Q.al(t,s,v)
break
case C.P:H.p(k,"$isdU")
f=k.ch
e=k.cx
this.Q.al(f,t,v)
this.Q.al(e,s,v)
this.Q.al(f,e,v)
break
case C.R:this.Q.al(h,g,v)
break
case C.N:case C.Q:break
default:this.Q.al(h,t,v)
this.Q.al(t,s,v)
this.Q.al(g,s,v)}z.b-=2}if((y&16)!==0){z=this.k2
z.av(0.3,0.9,0.9)
for(d=this.b.b,v=this.k4,u=this.r1;d!=null;d=d.c){c=d.f
b=d.r
t=d.x
c.r[t].gaQ().cv(v)
t=d.y
b.r[t].gaQ().cv(u)
this.Q.al(v,u,z)}}if((y&8)!==0){z=this.k2
z.av(0.9,0.3,0.9)
for(w=this.c,v=this.r2,u=v.a;w!=null;w=w.cx){if((w.b&32)!==32)continue
for(q=w.cy;q!=null;q=q.b)for(a=0;a<q.x;++a){a0=q.r[a]
t=this.b.a
s=a0.d
a1=t.a.b[s].gaQ()
if(!u.b8(4))u.q(0,4,v.cA(4))
t=u.i(0,4)
s=J.B(t)
p=a1.a.a
s.i(t,0).W(p[0],p[1])
a2=a1.b.a
s.i(t,1).W(a2[0],p[1])
s.i(t,2).W(a2[0],a2[1])
s.i(t,3).W(p[0],a2[1])
a2=this.Q
a2.bE(t,4,z)
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
t.stroke()}if((y&64)!==0)this.b.a.a.he(this.Q)
this.Q.toString},
bW:function(a){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h
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
if(this.y1.length<s)this.y1=H.f(new Array(s),[V.bg])
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
y.a2(!0)
if(y.a===C.e)continue
for(p=y.dy;p!=null;p=p.d){o=p.b
v=o.a
if((v&1)===1)continue
if((v&4)!==4||(v&2)!==2)continue
n=o.f.z
m=o.r.z
if(n||m)continue
z.c[z.y++]=o
o.a=v|1
l=p.a
v=l.b
if((v&1)===1)continue
k=q+1
this.y1[q]=l
l.b=v|1
q=k}for(j=y.dx;j!=null;j=j.d){v=j.b
if(v.x)continue
l=j.a
i=l.b
if((i&32)!==32)continue
z.d[z.x++]=v
v.x=!0
if((i&1)===1)continue
k=q+1
this.y1[q]=l
l.b=i|1
q=k}}z.ec(this.fr,a,x,this.x)
for(h=0;h<z.r;++h){y=z.b[h]
if(y.a===C.e)y.b&=4294967294}}z=this.fr.f
z.au(z.e)
z=this.fr.r
z.au(z.e)
z=this.fr.x
z.au(z.e)
z=this.y2.a
x=z.b
z.a=x==null?$.w.$0():x
for(y=this.c;y!=null;y=y.cx){if((y.b&1)===0)continue
if(y.a===C.e)continue
y.cP()}x=this.b
x.a.cs(x)
x=this.fr.y
v=z.b
if(v==null)v=$.w.$0()
x.au(C.b.aD((v-z.a)*1000,$.C))},
ep:function(b6){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2,a3,a4,a5,a6,a7,a8,a9,b0,b1,b2,b3,b4,b5
z=this.O
z.ax(64,32,0,this.b.e)
if(this.dy){for(y=this.c;y!=null;y=y.cx){y.b&=4294967294
y.f.f=0}for(x=this.b.b;x!=null;x=x.c){x.a&=4294967262
x.Q=0
x.ch=1}}for(w=this.U,v=this.a_,u=this.V,t=this.a0,s=this.Y,r=this.R,q=r.a,p=r.b,o=r.c,n=r.d,m=this.ch;!0;){for(x=this.b.b,l=null,k=1;x!=null;x=x.c){j=x.a
if((j&4)!==4)continue
if(x.Q>8)continue
if((j&32)!==0)i=x.ch
else{h=x.f
g=x.r
if(h.z||g.z)continue
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
q.bv(h.d,a5)
p.bv(g.d,a6)
o.K(j)
n.K(a)
r.e=1
m.fx.i6(s,r)
a7=s.b
i=s.a===C.E?Math.min(a3+(1-a3)*a7,1):1
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
l.cr(this.b.e)
a8=l.a&=4294967263;++l.Q
if((a8&4)!==4||(a8&2)!==2){l.a=a8&4294967291
j.K(u)
a.K(t)
f.b1()
e.b1()
continue}f.a2(!0)
e.a2(!0)
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
b4=b2.f.z
b5=b2.r.z
if(b4||b5)continue
j=b3.f
u.K(j)
if((b3.b&1)===0)b3.aR(k)
b2.cr(this.b.e)
a=b2.a
if((a&4)!==4){j.K(u)
b3.b1()
continue}if((a&2)!==2){j.K(u)
b3.b1()
continue}b2.a=a|1
z.c[z.y++]=b2
j=b3.b
if((j&1)!==0)continue
b3.b=j|1
if(b3.a!==C.e)b3.a2(!0)
j=z.r
b3.c=j
z.b[j]=b3
z.r=j+1}}j=(1-k)*b6.a
w.a=j
w.b=1/j
w.c=1
w.e=20
w.d=b6.d
w.f=!1
z.eq(w,f.c,e.c)
for(a9=0;a9<z.r;++a9){b0=z.b[a9]
b0.b&=4294967294
if(b0.a!==C.f)continue
b0.cP()
for(b1=b0.dy;b1!=null;b1=b1.d)b1.b.a&=4294967262}j=this.b
j.a.cs(j)}},
bi:function(a,b,c,d){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l
z=a.d
switch(z.a){case C.m:H.p(z,"$isaH")
y=this.aK
G.n(b,z.gad(),y)
x=z.gbb()
z=b.b
w=z.b
z=z.a
v=this.aL.a
v[0]=w
v[1]=z
z=this.Q
w=y.a
if(d){v=z.b
x=x.p(0,v.c)
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
x=x.p(0,v.c)
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
case C.k:r=z.f
y=this.as
w=y.a
if(!w.b8(8))w.q(0,8,y.cA(8))
y=w.i(0,8)
for(w=J.B(y),q=0;q<r;++q)G.n(b,z.d[q],w.i(y,q))
z=this.Q
if(d){z.bE(y,r,c)
z.c.stroke()}else{z.bE(y,r,c)
z=z.c
z.toString
z.fill("nonzero")}break
case C.o:H.p(z,"$isaK")
y=this.ac
G.n(b,z.c,y)
w=this.ar
G.n(b,z.d,w)
this.Q.al(y,w,c)
break
case C.v:H.p(z,"$isc3")
p=z.gfi()
o=z.gca()
z=this.ac
G.n(b,o.i(0,0),z)
for(y=this.ar,w=z.a,n=y.a,q=1;C.b.N(q,p);++q){G.n(b,o.i(0,q),y)
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
iT:function(a,b){var z,y,x
z=H.f(new Array(a),[[P.l,V.bn]])
for(y=[V.bn],x=0;x<a;++x)z[x]=H.f(new Array(b),y)
return z}}},
iR:{"^":"c;a,b",
dP:function(a){var z=H.p(this.a.a.b[a].gaz(),"$isaX")
return this.b.iL(z.b)}},
iS:{"^":"c;a,b,c,d,e"},
cn:{"^":"c;a",
sm:function(a){this.a[3]=a},
gm:function(){return this.a[3]}},
hV:{"^":"c;a,b,c,d,az:e<"},
bz:{"^":"c;a,b,c"},
hU:{"^":"c;a,b"},
hK:{"^":"c;a,b,c"},
fK:{"^":"c;a,b,c,d,e"},
iH:{"^":"c;a,b"},
fA:{"^":"c;a,b,c"},
ig:{"^":"c;a,b,c,d,e,f"},
hW:{"^":"c;a,b,c,d,e,f,r,x,y,z,Q,ch,cx,cy,db,dx,dy,fr,fx,fy,go,id,k1,k2,k3,k4,r1,r2,rx,ry,x1,x2,y1,y2,O,R,Y,U,a_,V,a0,a4,aa,ab,aq,aJ,aK,aL,ac,ar,as,iw,bk,ix,iy,iz,iA,hg,hh,hi,hj,hk,hl,iB",
co:function(a,b){var z,y,x,w,v
if(a==null){x=this.Q
w=new Array(x)
w.fixed$length=Array
a=w
for(z=0;J.cX(z,x);z=J.f5(z,1))try{J.f6(a,z,b.$0())}catch(v){y=H.G(v)
x="Exception "+H.d(y)
throw H.e(x)}}return a},
ha:function(a){var z,y
z=this.ac
z.cD()
z.cD().ij(a)
for(y=a.gbA(),z=this.fy;y.N(0,a.gbC());y=y.C(0,1))C.c.q(z,y,null)
a.gc6()
a.gc6().sc5(a.gc5())
a.gc5()
a.gc5().sc6(a.gc6());--this.Y},
ia:function(a){var z,y,x,w,v,u,t,s
for(z=this.k2,y=this.x,x=0;w=this.id,x<w;++x){v=C.c.i(z,x)
u=v.gcg(v)
w=this.cy.a[u].a
t=w[0]
v.si2(0,(C.a.a8(y*w[1]+2048)<<19>>>0)+(C.a.a8(128*(y*t))+262144))}F.f1(z,0,w)
this.k3=0
for(u=0;u<this.id;++u){s=C.c.i(z,u)
V.hZ(s.gi2(s),1,0)}},
i9:function(){var z,y,x,w,v,u,t,s,r
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
w=this.hg
w.a=this
this.ac.hS(w,z)},
ef:function(a){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k
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
x[1]=q>o?q:o}y=this.hh
y.b=a
y.a=this
this.ac.hS(y,z)},
bW:function(a){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k;++this.a
if(this.z===0)return
this.b=0
for(z=0,y=0;z<this.z;++z){y=C.b.cF(y,C.c.i(this.cx.a,z))
this.b=y}if((y&2)!==0)this.ew()
if(this.z===0)return
this.c=0
for(x=this.U;!1;x=x.bQ())this.c=C.b.cF(this.c,x.gd4())
y=a.a
w=this.f
v=this.ac
u=v.dX()
t=C.a.p(y*w,u.gD(u))
u=a.a
v=v.dX()
s=C.a.p(u*w,v.gE(v))
r=this.cz(a)
for(z=0;z<this.z;++z){y=this.db.a[z].a
y[0]=y[0]+t
y[1]=y[1]+s
w=y[0]
v=y[1]
q=w*w+v*v
if(q>r){p=q===0?17976931348623157e292:Math.sqrt(r/q)
y[0]=y[0]*p
y[1]=y[1]*p}}this.ef(a)
if((this.c&2)!==0)this.em(a)
if((this.b&4)!==0)this.ev(a)
for(y=this.z,w=this.cy.a,v=this.db.a,u=a.a,z=0;z<y;++z){o=w[z]
n=v[z]
m=o.a
l=m[0]
k=n.a
m[0]=l+u*k[0]
m[1]=m[1]+u*k[1]}this.i9()
this.ia(!1)
if((this.b&32)!==0)this.eu(a)
if((this.b&64)!==0)this.ek(a)
if((this.b&128)!==0)this.es(a)
if((this.b&16)!==0)this.ei(a)
if((this.b&8)!==0)this.eo(a)
if((this.c&1)!==0)this.en(a)
if((this.b&256)!==0)this.eg(a)
this.el(a)
this.eh(a)},
el:function(a){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e
for(z=this.dx,y=0;y<this.z;++y)C.c.q(z,y,0)
for(x=0;x<this.r2;++x){w=this.ry[x]
v=w.a
u=w.c
C.c.q(z,v,C.c.i(z,v).C(0,u))}for(x=0;x<this.k3;++x){w=this.r1[x]
v=w.a
t=w.b
u=w.d
C.c.q(z,v,C.c.i(z,v).C(0,u))
C.c.q(z,t,C.c.i(z,t).C(0,u))}if((this.b&64)!==0)for(y=0;y<this.z;++y){C.c.i(this.cx.a,y).ak(0,64)
C.c.q(z,y,0)}s=this.a_*(this.d*this.cz(a))
for(y=0;y<this.z;++y)C.c.q(z,y,s*Math.max(0,Math.min(H.eS(C.c.i(z,y)),5)-1))
r=a.a/(this.d*this.r)
for(q=this.bk,p=q.a,o=this.x,n=1.777777*this.e*o*o,x=0;x<this.r2;++x){w=this.ry[x]
v=w.a
t=w.b
u=w.c
m=w.e
l=w.d
k=this.cy.a[v]
j=C.l.p(r*u*m,C.c.i(z,v).C(0,s*u))
o=l.a
p[0]=j*o[0]
p[1]=j*o[1]
o=this.db.a[v].a
o[0]=o[0]-n*p[0]
o[1]=o[1]-n*p[1]
t.bg(q,k,!0)}for(x=0;x<this.k3;++x){w=this.r1[x]
v=w.a
t=w.b
u=w.d
l=w.e
i=C.c.i(z,v).C(0,C.c.i(z,t))
p=r*u
o=l.a
h=C.l.p(p,i)*o[0]
g=C.l.p(p,i)*o[1]
o=this.db.a
f=o[v]
e=o[t]
o=f.a
o[0]=o[0]-h
o[1]=o[1]-g
o=e.a
o[0]=o[0]+h
o[1]=o[1]+g}},
eh:function(a4){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2,a3
z=this.V
for(y=this.bk,x=y.a,w=this.x,v=1.777777*this.e*w*w,u=0;u<this.r2;++u){t=this.ry[u]
s=t.a
r=t.b
q=t.c
p=t.e
o=t.d
n=this.cy.a[s]
w=n.a
m=w[0]
l=r.gaP().gu()
k=C.a.H(m,l.gD(l))
w=w[1]
l=r.gaP().gu()
j=C.a.H(w,l.gE(l))
i=this.db.a[s]
l=r.gbz().e1(0).p(0,j)
w=r.gbD()
w=l.C(0,w.gD(w))
l=i.a
h=w.H(0,l[0])
w=r.gbz().p(0,k)
m=r.gbD()
g=w.C(0,m.gE(m)).H(0,l[1])
m=o.a
f=h.p(0,m[0]).C(0,g.p(0,m[1]))
if(f.N(0,0)){w=z*q*p
x[0]=C.a.p(w,f)*m[0]
x[1]=C.a.p(w,f)*m[1]
l[0]=l[0]+v*x[0]
l[1]=l[1]+v*x[1]
x[0]=-x[0]
x[1]=-x[1]
r.bg(y,n,!0)}}for(x=this.k3,w=this.r1,m=this.db.a,u=0;u<x;++u){t=w[u]
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
ev:function(a){var z,y,x
for(z=0;z<this.z;++z){C.c.i(this.cx.a,z).ak(0,4)
y=this.db.a[z]
x=y.a
x[0]=0
x[1]=0}},
em:function(a){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h
for(z=this.U,y=this.bk,x=this.hi,w=this.hj,v=y.a,u=this.hk,t=u.a,s=t.a,u=u.b,r=this.hl,q=r.a.a,p=r.b;!1;z=z.bQ()){z.gd4().ak(0,2)
z.iN()
o=C.a.p(a.a,z.gbz())
w.a=Math.sin(o)
w.b=Math.cos(o)
G.j(w,z.gf9(),x)
n=z.gbD().giq()
v[1]=n[1]
v[0]=n[0]
o=a.a
v[1]=v[1]*o
v[0]=v[0]*o
y.l(0,z.gf9())
y.j(x)
s[1]=v[1]
s[0]=v[0]
u.a=w.a
u.b=w.b
o=z.gc8()
m=z.gc8()
l=o.gcn()
k=m.gcn()
j=C.a.p(u.b,l.gu())
i=C.a.p(u.a,l.gcG())
k.scG(C.a.p(u.a,l.gu())+C.a.p(u.b,l.gcG()))
k.su(j-i)
G.ao(u,o.gad(),m.gad())
m.gad().l(0,t)
m=a.b
q[0]=m*s[0]
q[1]=m*s[1]
p.a=m*u.a
p.b=m*(u.b-1)
for(h=z.gbA();h.N(0,z.gbC());h=h.C(0,1))G.n(r,this.cy.a[h],this.db.a[h])}},
ei:function(a6){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2,a3,a4,a5
z=a6.b*this.a0
for(y=0;y<this.y2;++y){x=C.c.i(this.R,y)
x.ghp().ak(0,16)
w=x.gaV()
v=x.gaW()
u=x.gci()
t=x.giI()
s=x.giJ()
r=x.giK()
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
g=t.t(p).C(0,s.t(o)).C(0,r.t(n))
f=t.B(p).C(0,s.B(o)).C(0,r.B(n))
e=Math.sqrt(C.b.cu(1,g.p(0,g).C(0,f.p(0,f))))
g=g.p(0,e)
f=f.p(0,e)
d=C.a.p(z,x.geB())
c=f.p(0,t.gD(t)).H(0,g.p(0,t.gE(t)))
b=g.p(0,t.gD(t)).C(0,f.p(0,t.gE(t)))
a=f.p(0,s.gD(s)).H(0,g.p(0,s.gE(s)))
a0=g.p(0,s.gD(s)).C(0,f.p(0,s.gE(s)))
a1=f.p(0,r.gD(r)).H(0,g.p(0,r.gE(r)))
a2=g.p(0,r.gD(r)).C(0,f.p(0,r.gE(r)))
m=this.db.a
a3=m[w]
a4=m[v]
a5=m[u]
m=a3.a
m[0]=m[0]+C.a.p(d,c.H(0,q[0]-i))
m[1]=m[1]+C.a.p(d,b.H(0,q[1]-h))
q=a4.a
q[0]=q[0]+C.a.p(d,a.H(0,l[0]-i))
q[1]=q[1]+C.a.p(d,a0.H(0,l[1]-h))
l=a5.a
l[0]=l[0]+C.a.p(d,a1.H(0,j[0]-i))
l[1]=l[1]+C.a.p(d,a2.H(0,j[1]-h))}},
eo:function(a){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h
z=a.b*this.a4
for(y=this.y1,x=0;x<this.x1;++x){w=C.c.i(y,x)
w.ghp().ak(0,8)
v=w.gaV()
u=w.gaW()
t=this.cy.a
s=t[v]
t=t[u].a
r=t[0]
q=s.a
p=r-q[0]
o=t[1]-q[1]
n=w.giu()
m=Math.sqrt(p*p+o*o)
if(m===0)m=17976931348623157e292
l=C.a.p(z,w.geB())
k=C.a.p(l,n.H(0,m))/m*p
j=C.a.p(l,n.H(0,m))/m*o
t=this.db.a
i=t[v]
h=t[u]
t=i.a
t[0]=t[0]-k
t[1]=t[1]-j
t=h.a
t[0]=t[0]+k
t[1]=t[1]+j}},
es:function(a0){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a
this.dy=this.co(this.dy,V.cP())
for(z=this.dx,y=0;y<this.z;++y){C.c.q(z,y,0)
this.dy[y].I()}for(x=0;x<this.k3;++x){w=this.r1[x]
if((w.c&128)!==0){v=w.a
u=w.b
t=w.d
s=w.e
C.c.q(z,v,C.c.i(z,v).C(0,t))
C.c.q(z,u,C.c.i(z,u).C(0,t))
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
r[1]=r[1]+o*n[1]}}r=this.ab
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
k=C.c.i(z,v).C(0,C.c.i(z,u))
r=p.a
n=r[0]
j=q.a
i=j[0]
r=r[1]
j=j[1]
h=C.l.p(m,k.H(0,2))
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
eu:function(a1){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0
z=this.aa
for(y=this.bk,x=this.x,w=1.777777*this.e*x*x,x=y.a,v=0;v<this.r2;++v){u=this.ry[v]
t=u.a
C.c.i(this.cx.a,t).ak(0,32)
s=u.b
r=u.c
q=u.e
p=this.cy.a[t]
o=this.db.a[t]
n=p.a
m=n[0]
l=s.gaP().gu()
k=C.a.H(m,l.gD(l))
n=n[1]
l=s.gaP().gu()
j=C.a.H(n,l.gE(l))
l=s.gbz().e1(0).p(0,j)
n=s.gbD()
n=l.C(0,n.gD(n))
l=o.a
i=n.H(0,l[0])
n=s.gbz().p(0,k)
m=s.gbD()
h=n.C(0,m.gE(m)).H(0,l[1])
m=z*q*r
x[0]=C.l.p(m,i)
x[1]=C.l.p(m,h)
l[0]=l[0]+w*x[0]
l[1]=l[1]+w*x[1]
x[0]=-x[0]
x[1]=-x[1]
s.bg(y,p,!0)}for(x=this.k3,n=this.r1,m=this.db.a,v=0;v<x;++v){u=n[v]
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
ek:function(a){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f
z=this.aJ*(this.r*a.b)
for(y=this.bk,x=this.x,w=1.777777*this.e*x*x,x=y.a,v=0;v<this.r2;++v){u=this.ry[v]
t=u.a
C.c.i(this.cx.a,t).ak(0,64)
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
r.bg(y,p,!0)}}for(x=this.k3,l=this.r1,k=this.db.a,j=this.aJ,v=0;v<x;++v){u=l[v]
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
en:function(a){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j
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
eg:function(a){var z,y,x,w,v,u,t,s,r,q,p,o,n
z=this.fx
z.a=this.co(z.a,V.eR())
y=C.a.a8(256*this.aL)
for(x=0;x<this.k3;++x){w=this.r1[x]
v=w.a
u=w.b
C.c.i(this.cx.a,v).ak(0,C.c.i(this.cx.a,u)).ak(0,256)
z=this.fx.a
t=z[v]
z=z[u].a
s=z[0]
r=t.a
q=C.b.b4(C.b.a8(y*(s-r[0])),8)
p=C.b.b4(C.b.a8(y*(z[1]-r[1])),8)
o=C.b.b4(C.b.a8(y*(z[2]-r[2])),8)
n=C.b.b4(C.b.a8(y*(z[3]-r[3])),8)
r[0]=r[0]+q
r[1]=r[1]+p
r[2]=r[2]+o
r[3]=r[3]+n
z[0]=z[0]-q
z[1]=z[1]-p
z[2]=z[2]-o
z[3]=z[3]-n}},
ew:function(){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i
z=P.ak(this.z,0,!1,P.m)
for(y=this.ac,x=0;x<this.z;++x){w=C.c.i(this.cx.a,x)
w.ak(0,2)
v=y.cD()
w.ak(0,512)
v.ii(x)
z[x]=-1}for(y=this.k2,u=0;t=this.id,u<t;++u){s=C.c.i(y,u)
s.scg(0,z[s.gcg(s)])}for(x=0;x<t;++x)if(V.hY(C.c.i(y,x))){--t
r=C.c.i(y,t)
C.c.q(y,t,C.c.i(y,x))
C.c.q(y,x,r);--x}this.id=t
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
o.saV(z[o.gaV()])
o.saW(z[o.gaW()])}for(x=0;x<t;++x){p=C.c.i(y,x)
if(p.gaV().N(0,0)||p.gaW().N(0,0)){--t
r=C.c.i(y,t)
C.c.q(y,t,C.c.i(y,x))
C.c.q(y,x,r);--x}}this.x1=t
for(u=0;t=this.y2,u<t;++u){n=C.c.i(this.R,u)
n.saV(z[n.gaV()])
n.saW(z[n.gaW()])
n.sci(z[n.gci()])}for(x=0;x<t;++x){y=C.c.i(this.R,x)
if(y.gaV().N(0,0)||y.gaW().N(0,0)||y.gci().N(0,0)){--t
r=C.c.i(this.R,t)
y=this.R
C.c.q(y,t,C.c.i(y,x))
C.c.q(this.R,x,r);--x}}this.y2=t
for(m=this.U;!1;m=m.bQ()){for(x=m.gbA(),l=0,k=0,j=!1;x.N(0,m.gbC());x=x.C(0,1)){t=z[x]
if(t>=0){l=Math.min(l,t)
k=Math.max(k,t+1)}else j=!0}if(l<k){m.sbA(l)
m.sbC(k)
if(j){m.gd4().ak(0,2)
m.sfJ(!0)}}else{m.sbA(0)
m.sbC(0)
if(m.gim())m.sfI(!0)}}this.z=0
for(m=this.U;!1;m=i){i=m.bQ()
if(m.gfI())this.ha(m)
else m.gfJ()}},
cz:function(a){var z=this.r*a.b
return z*z},
dY:function(){var z=this.fx
z.a=this.co(z.a,z.b)
return this.fx.a},
eW:function(a){this.a_=0.05
this.V=1
this.a0=0.25
this.a4=0.25
this.aa=0.25
this.ab=0.1
this.aq=0.2
this.aJ=0.5
this.aK=0.5
this.aL=0.5
this.cx=new V.hU(null,null)
this.cy=new V.bz(null,V.cP(),0)
this.db=new V.bz(null,V.cP(),0)
this.fx=new V.bz(null,V.eR(),0)
this.go=new V.bz(null,V.jW(),0)},
F:{
hZ:function(a,b,c){return a.C(0,c<<19>>>0).C(0,b<<7>>>0)},
lr:[function(){return new E.a(new Float64Array(H.b(2)))},"$0","cP",0,0,19],
lp:[function(){return new P.c()},"$0","jW",0,0,20],
lq:[function(){var z=new Int8Array(H.b(4))
z[0]=127
z[1]=127
z[2]=127
z[3]=50
return new V.cn(z)},"$0","eR",0,0,21],
hX:function(a){var z=new V.hW(0,0,0,1,1,1,1,1,1,0,0,0,null,null,null,null,null,null,null,null,null,0,0,null,0,0,null,0,0,null,0,0,null,0,0,null,0,null,null,null,null,null,null,null,null,null,null,null,null,V.aF(),new V.fK(null,null,null,!1,0),V.aF(),new E.a(new Float64Array(H.b(2))),G.v(),G.v(),new V.fA(null,null,null),new V.hV(0,new E.a(new Float64Array(H.b(2))),new E.a(new Float64Array(H.b(2))),null,null),new V.iH(null,new E.a(new Float64Array(H.b(2)))),new V.ig(null,null,new V.cs(new E.a(new Float64Array(H.b(2))),new E.a(new Float64Array(H.b(2))),0),new V.dW(new E.a(new Float64Array(H.b(2))),0),new E.a(new Float64Array(H.b(2))),new E.a(new Float64Array(H.b(2)))),new E.a(new Float64Array(H.b(2))),new G.b7(0,1),G.v(),G.v(),new V.hK(0,0,0))
z.eW(a)
return z}}},
eu:{"^":"c;a",
cA:function(a){var z,y,x
z=new Array(a)
z.fixed$length=Array
y=H.f(z,[E.a])
for(z=y.length,x=0;x<z;++x)y[x]=new E.a(new Float64Array(2))
return y}},
hS:{"^":"U;a,b,c,d",
a7:function(){return new E.a(new Float64Array(2))},
$asU:function(){return[E.a]}},
hT:{"^":"U;a,b,c,d",
a7:function(){return new E.ae(new Float64Array(3))},
$asU:function(){return[E.ae]}},
hP:{"^":"U;a,b,c,d",
a7:function(){return new E.a5(new Float64Array(4))},
$asU:function(){return[E.a5]}},
hQ:{"^":"U;a,b,c,d",
a7:function(){return new E.al(new Float64Array(9))},
$asU:function(){return[E.al]}},
hO:{"^":"U;a,b,c,d",
a7:function(){var z=new Float64Array(2)
return new V.ah(new E.a(z),new E.a(new Float64Array(2)))},
$asU:function(){return[V.ah]}},
hR:{"^":"U;a,b,c,d",
a7:function(){return new G.b7(0,1)},
$asU:function(){return[G.b7]}},
K:{"^":"ac;$ti"},
hI:{"^":"K;d,a,b,c",
a7:function(){return new V.bB(0,null,null,new V.H(null,null,null,null),new V.H(null,null,null,null),null,null,0,0,V.J(),0,0,0,0,0,this.d,V.J())},
$asK:function(){return[V.bB]},
$asac:function(){return[V.bB]}},
hE:{"^":"K;d,a,b,c",
a7:function(){return new V.bl(0,null,null,new V.H(null,null,null,null),new V.H(null,null,null,null),null,null,0,0,V.J(),0,0,0,0,0,this.d,V.J())},
$asK:function(){return[V.bl]},
$asac:function(){return[V.bl]}},
hH:{"^":"K;d,a,b,c",
a7:function(){return new V.bA(0,null,null,new V.H(null,null,null,null),new V.H(null,null,null,null),null,null,0,0,V.J(),0,0,0,0,0,this.d,V.J())},
$asK:function(){return[V.bA]},
$asac:function(){return[V.bA]}},
hF:{"^":"K;d,a,b,c",
a7:function(){return new V.bq(0,null,null,new V.H(null,null,null,null),new V.H(null,null,null,null),null,null,0,0,V.J(),0,0,0,0,0,this.d,V.J())},
$asK:function(){return[V.bq]},
$asac:function(){return[V.bq]}},
hG:{"^":"K;d,a,b,c",
a7:function(){return new V.br(0,null,null,new V.H(null,null,null,null),new V.H(null,null,null,null),null,null,0,0,V.J(),0,0,0,0,0,this.d,V.J())},
$asK:function(){return[V.br]},
$asac:function(){return[V.br]}},
hC:{"^":"K;d,a,b,c",
a7:function(){var z,y,x,w
z=new Float64Array(2)
y=new Float64Array(2)
x=new Float64Array(2)
w=new Float64Array(2)
z=new V.aK(new E.a(z),new E.a(y),new E.a(x),new E.a(w),!1,!1,new E.a(new Float64Array(2)),C.o,0)
z.b=0.01
return new V.bj(z,0,null,null,new V.H(null,null,null,null),new V.H(null,null,null,null),null,null,0,0,V.J(),0,0,0,0,0,this.d,V.J())},
$asK:function(){return[V.bj]},
$asac:function(){return[V.bj]}},
hD:{"^":"K;d,a,b,c",
a7:function(){var z,y,x,w
z=new Float64Array(2)
y=new Float64Array(2)
x=new Float64Array(2)
w=new Float64Array(2)
z=new V.aK(new E.a(z),new E.a(y),new E.a(x),new E.a(w),!1,!1,new E.a(new Float64Array(2)),C.o,0)
z.b=0.01
return new V.bk(z,0,null,null,new V.H(null,null,null,null),new V.H(null,null,null,null),null,null,0,0,V.J(),0,0,0,0,0,this.d,V.J())},
$asK:function(){return[V.bk]},
$asac:function(){return[V.bk]}},
fF:{"^":"c;a,b,c,d,e,f,r,x,y,z,Q,ch,cx,cy,db,dx,dy,fr,fx,fy",
cE:function(a){var z,y,x,w
z=this.y
if(!z.b8(a)){y=new Array(a)
y.fixed$length=Array
x=H.f(y,[E.a])
for(w=0;C.b.N(w,a);++w)x[w]=new E.a(new Float64Array(2))
z.q(0,a,x)}return z.i(0,a)},
eP:function(a0,a1){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a
z=new V.hI(this,null,null,null)
z.aN(10,V.bB)
this.Q=z
z=new V.hE(this,null,null,null)
z.aN(10,V.bl)
this.ch=z
z=new V.hH(this,null,null,null)
z.aN(10,V.bA)
this.cx=z
z=new V.hF(this,null,null,null)
z.aN(10,V.bq)
this.cy=z
z=new V.hG(this,null,null,null)
z.aN(10,V.br)
this.db=z
z=new V.hC(this,null,null,null)
z.aN(10,V.bj)
this.dx=z
z=new V.hD(this,null,null,null)
z.aN(10,V.bk)
this.dy=z
z=V.aI()
y=V.aI()
x=G.v()
w=G.v()
v=V.e_()
u=new Float64Array(H.b(2))
t=new Float64Array(H.b(2))
s=new Float64Array(H.b(2))
r=G.v()
q=new Float64Array(H.b(2))
p=new Float64Array(H.b(2))
o=[V.W]
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
a=V.fT()
n[0]=new V.W(new E.a(new Float64Array(H.b(2))),new V.S(new Int8Array(H.b(4))))
n[1]=new V.W(new E.a(new Float64Array(H.b(2))),new V.S(new Int8Array(H.b(4))))
g[0]=new V.W(new E.a(new Float64Array(H.b(2))),new V.S(new Int8Array(H.b(4))))
g[1]=new V.W(new E.a(new Float64Array(H.b(2))),new V.S(new Int8Array(H.b(4))))
o[0]=new V.W(new E.a(new Float64Array(H.b(2))),new V.S(new Int8Array(H.b(4))))
o[1]=new V.W(new E.a(new Float64Array(H.b(2))),new V.S(new Int8Array(H.b(4))))
this.fr=new V.ft(this,new V.dc(z,y,x,w,!1),v,new V.dd(new E.a(u),new E.a(t),0,0),new E.a(s),r,new E.a(q),new E.a(p),new V.eB(0,0),new V.eB(0,0),n,new E.a(m),new E.a(l),new E.a(k),new E.a(j),new E.a(i),new E.a(h),g,o,new E.a(f),new E.a(e),new V.S(d),new E.a(c),new E.a(b),a)
this.fx=new V.iv(V.e_(),new V.dc(V.aI(),V.aI(),G.v(),G.v(),!1),G.v(),G.v(),new V.dd(new E.a(new Float64Array(H.b(2))),new E.a(new Float64Array(H.b(2))),0,0),new V.ib(null,null,null,new E.a(new Float64Array(H.b(2))),new E.a(new Float64Array(H.b(2))),null,null,new E.a(new Float64Array(H.b(2))),new E.a(new Float64Array(H.b(2))),new E.a(new Float64Array(H.b(2))),new E.a(new Float64Array(H.b(2))),new E.a(new Float64Array(H.b(2))),new E.a(new Float64Array(H.b(2))),new E.a(new Float64Array(H.b(2))),new E.a(new Float64Array(H.b(2))),new E.a(new Float64Array(H.b(2))),new E.a(new Float64Array(H.b(2))),G.v(),G.v(),new E.a(new Float64Array(H.b(2))),new E.a(new Float64Array(H.b(2)))),P.ak(2,0,!1,P.m),new G.ax(new E.a(new Float64Array(H.b(2))),new E.a(new Float64Array(H.b(2))),new E.a(new Float64Array(H.b(2))),0,0,0),new G.ax(new E.a(new Float64Array(H.b(2))),new E.a(new Float64Array(H.b(2))),new E.a(new Float64Array(H.b(2))),0,0,0),this)
this.z=this},
F:{
fG:function(a,b){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c
z=P.m
y=P.aZ(null,null,null,z,P.fZ)
x=P.aZ(null,null,null,z,[P.l,P.m])
w=P.aZ(null,null,null,z,[P.l,E.a])
v=E.a
u=[v]
u=new V.hS(H.f(new Array(a),u),0,a,H.f(new Array(b),u))
u.b2(a,b,v)
v=E.ae
t=[v]
t=new V.hT(H.f(new Array(a),t),0,a,H.f(new Array(b),t))
t.b2(a,b,v)
v=E.a5
s=[v]
s=new V.hP(H.f(new Array(a),s),0,a,H.f(new Array(b),s))
s.b2(a,b,v)
v=V.ah
r=[v]
r=new V.hO(H.f(new Array(a),r),0,a,H.f(new Array(b),r))
r.b2(a,b,v)
v=G.b7
q=[v]
q=new V.hR(H.f(new Array(a),q),0,a,H.f(new Array(b),q))
q.b2(a,b,v)
v=E.al
p=[v]
p=new V.hQ(H.f(new Array(a),p),0,a,H.f(new Array(b),p))
p.b2(a,b,v)
v=new V.bN(new E.a(new Float64Array(H.b(2))),new E.a(new Float64Array(H.b(2))),new E.a(new Float64Array(H.b(2))),0,0,0)
o=new V.bN(new E.a(new Float64Array(H.b(2))),new E.a(new Float64Array(H.b(2))),new E.a(new Float64Array(H.b(2))),0,0,0)
n=new V.bN(new E.a(new Float64Array(H.b(2))),new E.a(new Float64Array(H.b(2))),new E.a(new Float64Array(H.b(2))),0,0,0)
m=H.f(new Array(3),[V.bN])
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
z=new V.fF(u,t,s,p,r,q,y,x,w,null,null,null,null,null,null,null,null,null,null,new V.fL(new V.jC(v,o,n,m,0,new E.a(l),new E.a(k),new E.a(j),new E.a(i),new E.a(h),new E.a(g),new E.a(f),new E.a(e),new E.a(d),new E.a(c)),P.ak(3,0,!1,z),P.ak(3,0,!1,z),new E.a(new Float64Array(H.b(2))),new E.a(new Float64Array(H.b(2))),new E.a(new Float64Array(H.b(2))),new E.a(new Float64Array(H.b(2)))))
z.eP(a,b)
return z}}},
ac:{"^":"c;$ti",
du:function(a){var z,y,x
z=new Array(a)
z.fixed$length=Array
y=H.f(z,[H.ap(this,"ac",0)])
z=this.a
if(z!=null)C.d.a9(y,0,this.c,z,0)
for(z=y.length,x=0;x<z;++x)y[x]=this.a7()
this.a=y
this.c=z},
dH:function(){var z,y
z=this.b
y=this.c
if(z>=y)this.du(y*2)
return this.a[this.b++]},
aN:function(a,b){this.b=0
this.a=null
this.c=0
this.du(a)}},
U:{"^":"c;$ti",
b2:function(a,b,c){var z,y
for(z=this.a,y=0;y<a;++y)z[y]=this.a7()}}}],["","",,F,{"^":"",
f1:function(a,b,c){var z
P.cr(b,c,a.length,null,null,null)
z=P.cg(H.e3(a,b,c,H.ag(a,0)),!0,null)
C.d.cc(z,"sort")
H.b8(z,0,z.length-1,P.jY());(a&&C.d).ea(a,b,c,z)}}],["","",,N,{"^":"",fk:{"^":"fC;c,a,b",
bE:function(a,b,c){var z,y,x
this.dd(c)
for(z=J.B(a),y=this.b,x=0;x<b;++x)y.aB(z.i(a,x),z.i(a,x))
y=this.c
y.beginPath()
y.moveTo(J.Q(z.i(a,0)),J.R(z.i(a,0)))
for(x=1;x<b;++x)y.lineTo(J.Q(z.i(a,x)),J.R(z.i(a,x)))
y.lineTo(J.Q(z.i(a,0)),J.R(z.i(a,0)))
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
dd:function(a){var z,y,x,w
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
hc:function(a,b,c,d){throw H.e("Unimplemented")},
hd:function(a,b,c,d){throw H.e("Unimplemented")}}}],["","",,G,{"^":"",c4:{"^":"c;D:a>,E:b>,c",
av:function(a,b,c){this.a=C.b.a8(C.a.aM(a*255))
this.b=C.b.a8(C.a.aM(b*255))
this.c=C.b.a8(C.a.aM(c*255))}},b7:{"^":"c;a,u:b<",
G:function(a){this.a=Math.sin(a)
this.b=Math.cos(a)
return this},
n:function(a){return"Rot(s:"+H.d(this.a)+", c:"+H.d(this.b)+")"},
F:{
ao:function(a,b,c){var z,y,x,w,v
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
Z:function(a,b,c){var z,y,x,w,v,u
z=a.b
y=b.a
x=y[0]
w=a.a
v=y[1]
u=c.a
u[0]=z*x+w*v
u[1]=-w*y[0]+z*y[1]}}},ax:{"^":"c;a,b,u:c<,d,m:e@,f",
n:function(a){return"Sweep:\nlocalCenter: "+this.a.n(0)+"\n"+("c0: "+this.b.n(0)+", c: "+this.c.n(0)+"\n")+("a0: "+H.d(this.d)+", a: "+H.d(this.e)+"\n")+("alpha0: "+H.d(this.f))},
S:function(){var z=6.283185307179586*C.l.aM(this.d/6.283185307179586)
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
this.f=a}},cx:{"^":"c;a"},iD:{"^":"c;a,b",
K:function(a){var z,y
this.a.h(a.a)
z=this.b
y=a.b
z.a=y.a
z.b=y.b
return this},
n:function(a){var z=this.b
return"XForm:\n"+("Position: "+this.a.n(0)+"\n")+("R: \t"+("Rot(s:"+H.d(z.a)+", c:"+H.d(z.b)+")")+"\n")},
F:{
v:function(){return new G.iD(new E.a(new Float64Array(H.b(2))),new G.b7(0,1))},
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
cB:function(a,b,c){var z,y,x,w,v
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
eh:function(a,b,c){var z,y,x,w,v,u,t
z=a.b
y=b.b
x=c.b
w=z.b
v=y.a
u=z.a
t=y.b
x.a=w*v-u*t
x.b=w*t+z.a*y.a
y=$.$get$cA()
y.h(b.a)
y.j(a.a)
G.Z(z,$.$get$cA(),c.a)}}},iJ:{"^":"c;",
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
r[1]=v-z*x+-t}}}],["","",,X,{"^":"",fl:{"^":"iJ;a,b,c,d"}}],["","",,A,{"^":"",
bT:function(a){var z,y
z=C.ae.hq(a,0,new A.k4())
y=536870911&z+((67108863&z)<<3)
y^=y>>>11
return 536870911&y+((16383&y)<<15)},
k4:{"^":"k:15;",
$2:function(a,b){var z=536870911&a+J.aE(b)
z=536870911&z+((524287&z)<<10)
return z^z>>>6}}}],["","",,E,{"^":"",a5:{"^":"c;a",
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
n:function(a){return"[0] "+this.aY(0).n(0)+"\n[1] "+this.aY(1).n(0)+"\n"},
i:function(a,b){return this.a[b]},
q:function(a,b,c){this.a[b]=c},
a1:function(a,b){var z,y,x
if(b==null)return!1
if(b instanceof E.a5){z=this.a
y=z[0]
x=b.a
z=y===x[0]&&z[1]===x[1]&&z[2]===x[2]&&z[3]===x[3]}else z=!1
return z},
gZ:function(a){return A.bT(this.a)},
aY:function(a){var z,y
z=new Float64Array(H.b(2))
y=this.a
z[0]=y[a]
z[1]=y[2+a]
return new E.a(z)},
C:function(a,b){var z,y,x
z=new Float64Array(H.b(4))
y=new E.a5(z)
y.h(this)
x=b.gfw()
z[0]=C.a.C(z[0],x.i(0,0))
z[1]=C.a.C(z[1],x.i(0,1))
z[2]=C.a.C(z[2],x.i(0,2))
z[3]=C.a.C(z[3],x.i(0,3))
return y},
I:function(){var z=this.a
z[0]=0
z[1]=0
z[2]=0
z[3]=0},
bL:function(){var z,y,x,w,v,u,t
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
z=a.gfw()
y=this.a
y[0]=C.a.H(y[0],z.i(0,0))
y[1]=C.a.H(y[1],z.i(0,1))
y[2]=C.a.H(y[2],z.i(0,2))
y[3]=C.a.H(y[3],z.i(0,3))},
J:function(){var z=this.a
z[0]=-z[0]
z[1]=-z[1]
z[2]=-z[2]
z[3]=-z[3]},
cq:function(a,b){var z,y,x,w,v,u,t
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
dG:function(a,b,c){var z,y,x,w,v,u,t,s
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
s[1]=t*(y*v-w*u)}}},al:{"^":"c;a",
b_:function(a,b,c,d,e,f,g,h,i){var z=this.a
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
n:function(a){return"[0] "+this.aY(0).n(0)+"\n[1] "+this.aY(1).n(0)+"\n[2] "+this.aY(2).n(0)+"\n"},
i:function(a,b){return this.a[b]},
q:function(a,b,c){this.a[b]=c},
a1:function(a,b){var z,y,x
if(b==null)return!1
if(b instanceof E.al){z=this.a
y=z[0]
x=b.a
z=y===x[0]&&z[1]===x[1]&&z[2]===x[2]&&z[3]===x[3]&&z[4]===x[4]&&z[5]===x[5]&&z[6]===x[6]&&z[7]===x[7]&&z[8]===x[8]}else z=!1
return z},
gZ:function(a){return A.bT(this.a)},
aY:function(a){var z,y
z=new Float64Array(H.b(3))
y=this.a
z[0]=y[a]
z[1]=y[3+a]
z[2]=y[6+a]
return new E.ae(z)},
C:function(a,b){var z,y,x
z=new Float64Array(H.b(9))
y=new E.al(z)
y.h(this)
x=b.gfz()
z[0]=C.a.C(z[0],x.i(0,0))
z[1]=C.a.C(z[1],x.i(0,1))
z[2]=C.a.C(z[2],x.i(0,2))
z[3]=C.a.C(z[3],x.i(0,3))
z[4]=C.a.C(z[4],x.i(0,4))
z[5]=C.a.C(z[5],x.i(0,5))
z[6]=C.a.C(z[6],x.i(0,6))
z[7]=C.a.C(z[7],x.i(0,7))
z[8]=C.a.C(z[8],x.i(0,8))
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
z=a.gfz()
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
J:function(){var z=this.a
z[0]=-z[0]
z[1]=-z[1]
z[2]=-z[2]
z[3]=-z[3]
z[4]=-z[4]
z[5]=-z[5]
z[6]=-z[6]
z[7]=-z[7]
z[8]=-z[8]},
F:{
b4:function(a,b,c){var z,y,x,w,v,u,t,s,r
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
dH:function(a,b,c){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j
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
W:function(a,b){var z=this.a
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
n:function(a){var z=this.a
return"["+H.d(z[0])+","+H.d(z[1])+"]"},
a1:function(a,b){var z,y,x
if(b==null)return!1
if(b instanceof E.a){z=this.a
y=z[0]
x=b.a
z=y===x[0]&&z[1]===x[1]}else z=!1
return z},
gZ:function(a){return A.bT(this.a)},
C:function(a,b){var z=new E.a(new Float64Array(H.b(2)))
z.h(this)
z.l(0,b)
return z},
i:function(a,b){return this.a[b]},
q:function(a,b,c){this.a[b]=c},
gv:function(a){return Math.sqrt(this.gL())},
gL:function(){var z,y
z=this.a
y=z[0]
z=z[1]
return y*y+z*z},
S:function(){var z,y,x
z=Math.sqrt(this.gL())
if(z===0)return 0
y=1/z
x=this.a
x[0]=x[0]*y
x[1]=x[1]*y
return z},
bJ:function(a){var z,y,x,w,v
z=this.a
y=z[0]
x=a.a
w=y-x[0]
v=z[1]-x[1]
return w*w+v*v},
B:function(a){var z,y
z=a.a
y=this.a
return y[0]*z[0]+y[1]*z[1]},
t:function(a){var z,y
z=a.a
y=this.a
return y[0]*z[1]-y[1]*z[0]},
M:function(a,b){var z,y,x
z=this.a
y=z[1]
z=z[0]
x=b.a
x[0]=-a*y
x[1]=a*z
return b},
l:function(a,b){var z,y
z=b.a
y=this.a
y[0]=y[0]+z[0]
y[1]=y[1]+z[1]},
j:function(a){var z,y
z=a.a
y=this.a
y[0]=y[0]-z[0]
y[1]=y[1]-z[1]},
A:function(a,b){var z=this.a
z[1]=z[1]*b
z[0]=z[0]*b},
J:function(){var z=this.a
z[1]=-z[1]
z[0]=-z[0]},
sD:function(a,b){this.a[0]=b
return b},
sE:function(a,b){this.a[1]=b
return b},
gD:function(a){return this.a[0]},
gE:function(a){return this.a[1]},
F:{
ev:function(){return new E.a(new Float64Array(H.b(2)))}}},ae:{"^":"c;a",
bV:function(a,b,c){var z=this.a
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
n:function(a){var z=this.a
return"["+H.d(z[0])+","+H.d(z[1])+","+H.d(z[2])+"]"},
a1:function(a,b){var z,y,x
if(b==null)return!1
if(b instanceof E.ae){z=this.a
y=z[0]
x=b.a
z=y===x[0]&&z[1]===x[1]&&z[2]===x[2]}else z=!1
return z},
gZ:function(a){return A.bT(this.a)},
C:function(a,b){var z=new E.ae(new Float64Array(H.b(3)))
z.h(this)
z.l(0,b)
return z},
i:function(a,b){return this.a[b]},
q:function(a,b,c){this.a[b]=c},
gv:function(a){return Math.sqrt(this.gL())},
gL:function(){var z,y,x
z=this.a
y=z[0]
x=z[1]
z=z[2]
return y*y+x*x+z*z},
S:function(){var z,y,x
z=Math.sqrt(this.gL())
if(z===0)return 0
y=1/z
x=this.a
x[0]=x[0]*y
x[1]=x[1]*y
x[2]=x[2]*y
return z},
l:function(a,b){var z,y
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
A:function(a,b){var z=this.a
z[2]=z[2]*b
z[1]=z[1]*b
z[0]=z[0]*b},
J:function(){var z=this.a
z[2]=-z[2]
z[1]=-z[1]
z[0]=-z[0]},
gD:function(a){return this.a[0]},
gE:function(a){return this.a[1]}}}],["","",,Q,{"^":"",fH:{"^":"c;",
ez:["eD",function(a,b){var z,y,x,w,v,u,t
z=this.c
y=z.b
z.a=y==null?$.w.$0():y
y=this.b
x=y.id.a
w=x.b
x.a=w==null?$.w.$0():w
w=y.k1.a
v=w.b
w.a=v==null?$.w.$0():v
v=y.a
if((v&1)===1){v=y.b
v.a.cs(v)
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
if(t==null)t=$.w.$0()
u.au(C.b.aD((t-w.a)*1000,$.C))
u=w.b
w.a=u==null?$.w.$0():u
y.b.fU()
u=y.fr.c
t=w.b
if(t==null)t=$.w.$0()
u.au(C.b.aD((t-w.a)*1000,$.C))
if(y.dy&&v.a>0){u=w.b
w.a=u==null?$.w.$0():u
y.fx.bW(v)
u=y.fr.d
t=w.b
if(t==null)t=$.w.$0()
u.au(C.b.aD((t-w.a)*1000,$.C))
u=w.b
w.a=u==null?$.w.$0():u
y.bW(v)
u=y.fr.e
t=w.b
if(t==null)t=$.w.$0()
u.au(C.b.aD((t-w.a)*1000,$.C))}if(y.db&&v.a>0){u=w.b
w.a=u==null?$.w.$0():u
y.ep(v)
u=y.fr.z
t=w.b
if(t==null)t=$.w.$0()
u.au(C.b.aD((t-w.a)*1000,$.C))}if(v.a>0)y.cx=v.b
if((y.a&4)===4)y.fS()
y.a&=4294967293
w=y.fr.a
v=x.b
if(v==null)v=$.w.$0()
w.au(C.b.aD((v-x.a)*1000,$.C))
x=z.b
if(x==null)x=$.w.$0()
this.Q=C.b.aD((x-z.a)*1e6,$.C)
this.f.clearRect(0,0,900,600)
y.hb()
this.y=this.y+1
y=window
C.w.d1(y)
C.w.da(y,W.cN(this.gcN(this)))}],
hy:function(){var z,y,x,w
z=H.p(W.j1("canvas",null),"$isd6")
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
w=new X.fl(null,z,20,w)
w.a=!0
w.c=this.d
this.r=w
w=new N.fk(this.f,2,w)
this.x=w
this.b.Q=w
this.y=0
this.z=y.querySelector("#fps-counter")
this.ch=y.querySelector("#world-step-time")
P.ef(P.dh(0,0,0,0,0,1),new Q.fI(this))
P.ef(P.dh(0,0,0,200,0,0),new Q.fJ(this))},
eQ:function(a,b,c){J.bX(document.querySelector("#title"),a)}},fI:{"^":"k:5;a",
$1:function(a){var z=this.a
J.bX(z.z,J.aa(z.y))
z.y=0}},fJ:{"^":"k:5;a",
$1:function(a){var z,y
z=this.a
y=z.Q
if(y==null)return
J.bX(z.ch,H.d(y/1000)+" ms")}}}],["","",,T,{"^":"",
m1:[function(){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2,a3,a4,a5,a6,a7,a8,a9,b0,b1,b2,b3,b4,b5,b6,b7,b8,b9,c0,c1,c2,c3,c4,c5,c6,c7,c8,c9,d0,d1,d2,d3
z=new E.a(new Float64Array(H.b(2)))
y=[V.bg]
x=H.f([],y)
w=V.fG(100,10)
v=V.fE(V.fR())
u=V.iT(4,4)
t=new P.bH(0,0)
if($.C==null){H.bC()
$.C=$.aw}t.bx(0)
s=new P.bH(0,0)
if($.C==null){H.bC()
$.C=$.aw}s.bx(0)
r=G.v()
q=new Float64Array(H.b(2))
p=new Float64Array(H.b(2))
o=P.m
n=[P.l,E.a]
m=P.aZ(null,null,null,o,n)
l=new Float64Array(H.b(2))
k=new Float64Array(H.b(2))
j=new Float64Array(H.b(2))
i=new Float64Array(H.b(2))
h=new Float64Array(H.b(2))
g=V.bo()
f=V.bo()
e=new Float64Array(H.b(2))
d=new Float64Array(H.b(2))
c=H.f(new Array(10),y)
b=new P.bH(0,0)
if($.C==null){H.bC()
$.C=$.aw}b.bx(0)
a=V.bo()
a0=V.bo()
a1=new Float64Array(H.b(2))
a2=new Float64Array(H.b(2))
a3=V.aI()
a4=V.aI()
a5=new Float64Array(H.b(2))
a6=new Float64Array(H.b(2))
a7=new Float64Array(H.b(2))
a8=new Float64Array(H.b(2))
a9=new Float64Array(H.b(2))
b0=new Float64Array(H.b(2))
y=H.f(new Array(2),y)
b1=new Float64Array(H.b(2))
b2=new Float64Array(H.b(2))
b3=new Float64Array(H.b(2))
b4=new Float64Array(H.b(2))
b5=new Float64Array(H.b(2))
b6=new Float64Array(H.b(2))
b7=new Float64Array(H.b(2))
b8=new Float64Array(H.b(2))
b9=C.b.a8(C.b.aM(102))
c0=C.b.a8(C.b.aM(102))
c1=C.b.a8(C.b.aM(255))
c2=new Float64Array(H.b(2))
c3=new Float64Array(H.b(2))
c4=new Float64Array(H.b(2))
c5=new Float64Array(H.b(2))
n=P.aZ(null,null,null,o,n)
o=new E.a(new Float64Array(H.b(2)))
o.h(z)
c6=new V.iO(0,null,null,null,0,0,o,!1,null,null,null,w,0,!1,!1,!1,!1,null,null,u,new V.ec(0,0,0,0,0,!1),new G.cx(t),new G.cx(s),new G.c4(0,0,0),r,new E.a(q),new E.a(p),new V.eu(m),new V.iR(null,null),new V.iS(new V.dW(new E.a(l),0),new E.a(k),new E.a(j),null,null),new V.cs(new E.a(i),new E.a(h),0),new V.ds(null,null,null,null,null,null,0,0,0,0,0,0,g,new V.e0(null,null,null),new V.bp(null,null,0,null,null),f,new V.bp(null,null,0,null,null),new V.d8(e,d,0)),c,new G.cx(b),new V.ds(null,null,null,null,null,null,0,0,0,0,0,0,a,new V.e0(null,null,null),new V.bp(null,null,0,null,null),a0,new V.bp(null,null,0,null,null),new V.d8(a1,a2,0)),new V.iq(a3,a4,new G.ax(new E.a(a5),new E.a(a6),new E.a(a7),0,0,0),new G.ax(new E.a(a8),new E.a(a9),new E.a(b0),0,0,0),0),new V.ir(C.T,0),new V.ec(0,0,0,0,0,!1),y,new G.ax(new E.a(b1),new E.a(b2),new E.a(b3),0,0,0),new G.ax(new E.a(b4),new E.a(b5),new E.a(b6),0,0,0),0.12,-1,new E.a(b7),new E.a(b8),new G.c4(b9,c0,c1),new E.a(c2),new E.a(c3),new E.a(c4),new E.a(c5),new V.eu(n))
c6.cy=!0
c6.db=!0
c6.dy=!0
c6.x=!0
c6.a=4
c6.b=V.fy(c6,v)
c6.fr=new V.i4(new V.a6(0,0,17976931348623157e292,-17976931348623157e292,0),new V.a6(0,0,17976931348623157e292,-17976931348623157e292,0),new V.a6(0,0,17976931348623157e292,-17976931348623157e292,0),new V.a6(0,0,17976931348623157e292,-17976931348623157e292,0),new V.a6(0,0,17976931348623157e292,-17976931348623157e292,0),new V.a6(0,0,17976931348623157e292,-17976931348623157e292,0),new V.a6(0,0,17976931348623157e292,-17976931348623157e292,0),new V.a6(0,0,17976931348623157e292,-17976931348623157e292,0),new V.a6(0,0,17976931348623157e292,-17976931348623157e292,0),new V.a6(0,0,17976931348623157e292,-17976931348623157e292,0))
c6.fx=V.hX(c6)
c6.fp()
v=new P.bH(0,0)
if($.C==null){H.bC()
$.C=$.aw}v.bx(0)
c7=new T.i5(null,null,null,0,x,c6,v,2.5,null,null,null,null,null,null,null,null)
c7.eQ("Racer",z,2.5)
z=c6.bH(new V.bh(C.e,null,new E.a(new Float64Array(H.b(2))),0,new E.a(new Float64Array(H.b(2))),0,0,0,!0,!0,!1,!1,!0,1))
c7.cy=z
z.k4="Ground"
c8=V.b6()
c9=new V.ca(null,null,0.2,0,0,!1,new V.bt(1,65535,0))
c9.a=c8
c9.f=!0
z=$.bv
$.bv=z+1
c9.b=new T.aY(z,0.001,!1)
z=new Float64Array(H.b(2))
z[0]=-30
z[1]=30
c8.cI(27,21,new E.a(z),0.3490658503988659)
c7.cy.aT(c9)
z=$.bv
$.bv=z+1
c9.b=new T.aY(z,0.2,!1)
z=new Float64Array(H.b(2))
z[0]=20
z[1]=40
c8.cI(27,15,new E.a(z),-0.6981317007977318)
c7.cy.aT(c9)
d0=c6.bH(new V.bh(C.e,null,new E.a(new Float64Array(H.b(2))),0,new E.a(new Float64Array(H.b(2))),0,0,0,!0,!0,!1,!1,!0,1))
d0.k4="Boundary"
c8=V.b6()
c9=new V.ca(null,null,0.2,0,0,!1,new V.bt(1,65535,0))
c9.a=c8
z=new Float64Array(H.b(2))
z[0]=-150
z[1]=-100
y=new Float64Array(H.b(2))
y[0]=150
y[1]=-100
c8.bw(new E.a(z),new E.a(y))
d0.aT(c9)
y=new Float64Array(H.b(2))
y[0]=150
y[1]=-100
z=new Float64Array(H.b(2))
z[0]=150
z[1]=100
c8.bw(new E.a(y),new E.a(z))
d0.aT(c9)
z=new Float64Array(H.b(2))
z[0]=150
z[1]=100
y=new Float64Array(H.b(2))
y[0]=-150
y[1]=100
c8.bw(new E.a(z),new E.a(y))
d0.aT(c9)
y=new Float64Array(H.b(2))
y[0]=-150
y[1]=100
z=new Float64Array(H.b(2))
z[0]=-150
z[1]=-100
c8.bw(new E.a(y),new E.a(z))
d0.aT(c9)
z=new T.fm(250,-40,300,500,8.5,7.5,0.6108652381980153,2.792526803190927,null,null,null,null,null,null,null)
d1=new V.bh(C.e,null,new E.a(new Float64Array(H.b(2))),0,new E.a(new Float64Array(H.b(2))),0,0,0,!0,!0,!1,!1,!0,1)
d1.a=C.f
y=c6.bH(d1)
z.y=y
y.k4="Car"
y.k1=3
d2=H.f(new Array(8),[E.a])
x=new Float64Array(H.b(2))
x[0]=1.5
x[1]=0
d2[0]=new E.a(x)
x=new Float64Array(H.b(2))
x[0]=3
x[1]=2.5
d2[1]=new E.a(x)
x=new Float64Array(H.b(2))
x[0]=2.8
x[1]=5.5
d2[2]=new E.a(x)
x=new Float64Array(H.b(2))
x[0]=1
x[1]=10
d2[3]=new E.a(x)
x=new Float64Array(H.b(2))
x[0]=-1
x[1]=10
d2[4]=new E.a(x)
x=new Float64Array(H.b(2))
x[0]=-2.8
x[1]=5.5
d2[5]=new E.a(x)
x=new Float64Array(H.b(2))
x[0]=-3
x[1]=2.5
d2[6]=new E.a(x)
x=new Float64Array(H.b(2))
x[0]=-1.5
x[1]=0
d2[7]=new E.a(x)
c8=V.b6()
c8.eb(d2,8,null,null)
y.dr(c8,0.1)
x=new Float64Array(H.b(2))
w=new E.a(new Float64Array(H.b(2)))
d3=new V.dX(new E.a(x),w,0,!1,0,0,!1,0,0,null,null,null,null,!1)
d3.a=C.M
d3.c=y
d3.y=!0
w.I()
w=T.bI(c6,250,-40,300,8.5)
z.z=w
d3.d=w.a
x[0]=-3
x[1]=0.75
c6.bI(d3)
w=T.bI(c6,250,-40,300,8.5)
z.Q=w
d3.d=w.a
x[0]=3
x[1]=0.75
c6.bI(d3)
w=T.bI(c6,250,-40,500,7.5)
z.ch=w
d3.d=w.a
x[0]=-3
x[1]=8.5
z.cy=H.p(c6.bI(d3),"$isct")
w=T.bI(c6,250,-40,500,7.5)
z.cx=w
d3.d=w.a
x[0]=3
x[1]=8.5
z.db=H.p(c6.bI(d3),"$isct")
c7.db=z
c7.cx=0
z=document
x=W.bx
W.cE(z,"keydown",c7.gfm(),!1,x)
W.cE(z,"keyup",c7.gfn(),!1,x)
c6.b.e=c7
c7.hy()
z=z.body
z.toString
z.appendChild(W.dj("<p>Use the arrow keys to drive the car.</p>",null,null))
z=window
C.w.d1(z)
C.w.da(z,W.cN(c7.gcN(c7)))},"$0","f0",0,0,2],
i5:{"^":"fH;cx,cy,db,dx,a,b,c,d,e,f,r,x,y,z,Q,ch",
ez:[function(a,b){var z,y,x,w,v,u,t,s
z=this.db
y=this.dx
x=this.cx
z.z.bP()
z.Q.bP()
z.ch.bP()
z.cx.bP()
z.z.bO(x)
z.Q.bO(x)
z.ch.bO(x)
z.cx.bO(x)
switch(x&12){case 4:w=z.r
break
case 8:w=-z.r
break
default:w=0}v=z.x*1000/(b-y)
y=z.cy
u=y.f
t=y.r.f.e-u.f.e-y.fy
s=t+Math.max(-v,Math.min(w-t,v))
y.cJ(s,s)
z.db.cJ(s,s)
this.dx=b
this.eD(0,b)},"$1","gcN",2,0,16],
io:[function(a){switch(a.keyCode){case 37:this.cx=this.cx|4
break
case 38:this.cx=this.cx|1
break
case 39:this.cx=this.cx|8
break
case 40:this.cx=this.cx|2
break}},"$1","gfm",2,0,6],
ip:[function(a){switch(a.keyCode){case 37:this.cx=this.cx&4294967291
break
case 38:this.cx=this.cx&4294967294
break
case 39:this.cx=this.cx&4294967287
break
case 40:this.cx=this.cx&4294967293
break}},"$1","gfn",2,0,6],
c2:function(a,b){var z,y,x
z=a.f.Q
y=a.r.Q
x=J.t(z)
if(!!x.$iscz&&y instanceof T.aY){if(b){z.r.l(0,y)
z.bG()}else if(z.r.aX(0,y))z.bG()}else if(!!x.$isaY&&y instanceof T.cz)if(b){y.r.l(0,z)
y.bG()}else if(y.r.aX(0,z))y.bG()}},
fm:{"^":"c;a,b,c,d,e,f,r,x,y,z,Q,ch,cx,cy,db"},
aY:{"^":"c;Z:a>,hr:b<,c"},
cz:{"^":"c;a,b,c,d,e,f,r,x,y",
bP:function(){var z,y,x,w,v,u,t,s
z=this.a.bR(this.x)
z.A(0,z.B(this.a.r))
z.A(0,-this.a.fr)
y=this.e
if(Math.sqrt(z.gL())>y)z.A(0,y/Math.sqrt(z.gL()))
y=this.a
z.A(0,this.f)
y.bg(z,this.a.f.c,!0)
y=this.a
x=this.f
w=y.fy
v=y.fr
u=y.f.a.a
t=u[0]
u=u[1]
y.fO(0.1*x*(w+v*(t*t+u*u))*-y.x)
s=this.gd2()
y=Math.sqrt(s.gL())
s.S()
u=this.a
s.A(0,this.f*(-2*y))
u.dj(s,this.a.f.c)},
bO:function(a){var z,y,x,w,v,u
switch(a&3){case 1:z=this.b
break
case 2:z=this.c
break
default:return}y=this.a
x=new Float64Array(H.b(2))
x[0]=0
x[1]=1
w=y.bR(new E.a(x))
v=this.gd2().B(w)
if(z<v)u=-this.d
else u=z>v?this.d:0
if(Math.abs(u)>0){y=this.a
w.A(0,this.f*u)
y.dj(w,this.a.f.c)}},
bG:function(){var z=this.r
if(z.a===0)this.f=1
else{this.f=0
z.bK(0,new T.iC(this))}},
gd2:function(){var z=this.a.bR(this.y)
z.A(0,z.B(this.a.r))
return z},
f2:function(a,b,c,d,e){var z,y,x
z=new V.bh(C.e,null,new E.a(new Float64Array(H.b(2))),0,new E.a(new Float64Array(H.b(2))),0,0,0,!0,!0,!1,!1,!0,1)
z.a=C.f
y=a.bH(z)
this.a=y
y.k4="Tire"
x=V.b6()
x.bS(0.5,1.25)
this.a.dr(x,1).Q=this
this.f=1},
F:{
bI:function(a,b,c,d,e){var z,y,x
z=P.Y(null,null,null,T.aY)
y=new Float64Array(H.b(2))
y[0]=1
y[1]=0
x=new Float64Array(H.b(2))
x[0]=0
x[1]=1
x=new T.cz(null,b,c,d,e,null,z,new E.a(y),new E.a(x))
x.f2(a,b,c,d,e)
return x}}},
iC:{"^":"k:1;a",
$1:function(a){var z,y,x
z=this.a
y=z.f
x=a.ghr()
z.f=Math.max(H.eS(y),x)}}},1],["","",,O,{"^":""}]]
setupProgram(dart,0,0)
J.t=function(a){if(typeof a=="number"){if(Math.floor(a)==a)return J.dx.prototype
return J.dw.prototype}if(typeof a=="string")return J.b1.prototype
if(a==null)return J.dy.prototype
if(typeof a=="boolean")return J.hj.prototype
if(a.constructor==Array)return J.b_.prototype
if(typeof a!="object"){if(typeof a=="function")return J.b2.prototype
return a}if(a instanceof P.c)return a
return J.bR(a)}
J.B=function(a){if(typeof a=="string")return J.b1.prototype
if(a==null)return a
if(a.constructor==Array)return J.b_.prototype
if(typeof a!="object"){if(typeof a=="function")return J.b2.prototype
return a}if(a instanceof P.c)return a
return J.bR(a)}
J.be=function(a){if(a==null)return a
if(a.constructor==Array)return J.b_.prototype
if(typeof a!="object"){if(typeof a=="function")return J.b2.prototype
return a}if(a instanceof P.c)return a
return J.bR(a)}
J.cR=function(a){if(typeof a=="number")return J.b0.prototype
if(a==null)return a
if(!(a instanceof P.c))return J.bb.prototype
return a}
J.eU=function(a){if(typeof a=="number")return J.b0.prototype
if(typeof a=="string")return J.b1.prototype
if(a==null)return a
if(!(a instanceof P.c))return J.bb.prototype
return a}
J.k1=function(a){if(typeof a=="string")return J.b1.prototype
if(a==null)return a
if(!(a instanceof P.c))return J.bb.prototype
return a}
J.F=function(a){if(a==null)return a
if(typeof a!="object"){if(typeof a=="function")return J.b2.prototype
return a}if(a instanceof P.c)return a
return J.bR(a)}
J.f5=function(a,b){if(typeof a=="number"&&typeof b=="number")return a+b
return J.eU(a).C(a,b)}
J.a1=function(a,b){if(a==null)return b==null
if(typeof a!="object")return b!=null&&a===b
return J.t(a).a1(a,b)}
J.a2=function(a,b){if(typeof a=="number"&&typeof b=="number")return a>b
return J.cR(a).bu(a,b)}
J.cX=function(a,b){if(typeof a=="number"&&typeof b=="number")return a<b
return J.cR(a).N(a,b)}
J.cY=function(a,b){if(typeof b==="number")if(a.constructor==Array||typeof a=="string"||H.eX(a,a[init.dispatchPropertyName]))if(b>>>0===b&&b<a.length)return a[b]
return J.B(a).i(a,b)}
J.f6=function(a,b,c){if(typeof b==="number")if((a.constructor==Array||H.eX(a,a[init.dispatchPropertyName]))&&!a.immutable$list&&b>>>0===b&&b<a.length)return a[b]=c
return J.be(a).q(a,b,c)}
J.f7=function(a,b,c,d){return J.F(a).f8(a,b,c,d)}
J.f8=function(a,b){return J.eU(a).b7(a,b)}
J.cZ=function(a,b){return J.be(a).am(a,b)}
J.f9=function(a){return J.F(a).gfP(a)}
J.aE=function(a){return J.t(a).gZ(a)}
J.aV=function(a){return J.be(a).ga5(a)}
J.aq=function(a){return J.B(a).gv(a)}
J.fa=function(a){return J.F(a).gba(a)}
J.fb=function(a){return J.F(a).ghP(a)}
J.fc=function(a){return J.F(a).gi3(a)}
J.Q=function(a){return J.F(a).gD(a)}
J.R=function(a){return J.F(a).gE(a)}
J.fd=function(a,b){return J.be(a).dF(a,b)}
J.fe=function(a){return J.be(a).hW(a)}
J.ff=function(a,b){return J.F(a).aC(a,b)}
J.d_=function(a,b){return J.F(a).saw(a,b)}
J.bX=function(a,b){return J.F(a).sdD(a,b)}
J.d0=function(a,b){return J.F(a).sba(a,b)}
J.bY=function(a,b){return J.F(a).sD(a,b)}
J.bZ=function(a,b){return J.F(a).sE(a,b)}
J.d1=function(a){return J.cR(a).a8(a)}
J.fg=function(a){return J.k1(a).i8(a)}
J.aa=function(a){return J.t(a).n(a)}
I.aC=function(a){a.immutable$list=Array
a.fixed$length=Array
return a}
var $=I.p
C.G=W.c_.prototype
C.X=J.h.prototype
C.d=J.b_.prototype
C.l=J.dw.prototype
C.b=J.dx.prototype
C.c=J.dy.prototype
C.a=J.b0.prototype
C.x=J.b1.prototype
C.a3=J.b2.prototype
C.ae=H.hJ.prototype
C.S=J.i_.prototype
C.V=W.is.prototype
C.F=J.bb.prototype
C.w=W.iN.prototype
C.e=new V.c0(0,"BodyType.STATIC")
C.H=new V.c0(1,"BodyType.KINEMATIC")
C.f=new V.c0(2,"BodyType.DYNAMIC")
C.h=new P.ju()
C.I=new P.aJ(0)
C.p=new V.c7(0,"EPAxisType.UNKNOWN")
C.r=new V.c7(1,"EPAxisType.EDGE_A")
C.J=new V.c7(2,"EPAxisType.EDGE_B")
C.Y=function(hooks) {
  if (typeof dartExperimentalFixupGetTag != "function") return hooks;
  hooks.getTag = dartExperimentalFixupGetTag(hooks.getTag);
}
C.Z=function(hooks) {
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
C.K=function(hooks) { return hooks; }

C.a_=function(getTagFallback) {
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
C.a0=function() {
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
C.a1=function(hooks) {
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
C.a2=function(hooks) {
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
C.L=function getTagFallback(o) {
  var s = Object.prototype.toString.call(o);
  return s.substring(8, s.length - 1);
}
C.a4=new V.N(0,"JointType.UNKNOWN")
C.M=new V.N(1,"JointType.REVOLUTE")
C.a5=new V.N(10,"JointType.ROPE")
C.N=new V.N(11,"JointType.CONSTANT_VOLUME")
C.a6=new V.N(12,"JointType.MOTOR")
C.a7=new V.N(2,"JointType.PRISMATIC")
C.O=new V.N(3,"JointType.DISTANCE")
C.P=new V.N(4,"JointType.PULLEY")
C.Q=new V.N(5,"JointType.MOUSE")
C.a8=new V.N(6,"JointType.GEAR")
C.a9=new V.N(7,"JointType.WHEEL")
C.aa=new V.N(8,"JointType.WELD")
C.R=new V.N(9,"JointType.FRICTION")
C.i=new V.by(0,"LimitState.INACTIVE")
C.t=new V.by(1,"LimitState.AT_LOWER")
C.q=new V.by(2,"LimitState.AT_UPPER")
C.y=new V.by(3,"LimitState.EQUAL")
C.ab=H.f(I.aC(["*::class","*::dir","*::draggable","*::hidden","*::id","*::inert","*::itemprop","*::itemref","*::itemscope","*::lang","*::spellcheck","*::title","*::translate","A::accesskey","A::coords","A::hreflang","A::name","A::shape","A::tabindex","A::target","A::type","AREA::accesskey","AREA::alt","AREA::coords","AREA::nohref","AREA::shape","AREA::tabindex","AREA::target","AUDIO::controls","AUDIO::loop","AUDIO::mediagroup","AUDIO::muted","AUDIO::preload","BDO::dir","BODY::alink","BODY::bgcolor","BODY::link","BODY::text","BODY::vlink","BR::clear","BUTTON::accesskey","BUTTON::disabled","BUTTON::name","BUTTON::tabindex","BUTTON::type","BUTTON::value","CANVAS::height","CANVAS::width","CAPTION::align","COL::align","COL::char","COL::charoff","COL::span","COL::valign","COL::width","COLGROUP::align","COLGROUP::char","COLGROUP::charoff","COLGROUP::span","COLGROUP::valign","COLGROUP::width","COMMAND::checked","COMMAND::command","COMMAND::disabled","COMMAND::label","COMMAND::radiogroup","COMMAND::type","DATA::value","DEL::datetime","DETAILS::open","DIR::compact","DIV::align","DL::compact","FIELDSET::disabled","FONT::color","FONT::face","FONT::size","FORM::accept","FORM::autocomplete","FORM::enctype","FORM::method","FORM::name","FORM::novalidate","FORM::target","FRAME::name","H1::align","H2::align","H3::align","H4::align","H5::align","H6::align","HR::align","HR::noshade","HR::size","HR::width","HTML::version","IFRAME::align","IFRAME::frameborder","IFRAME::height","IFRAME::marginheight","IFRAME::marginwidth","IFRAME::width","IMG::align","IMG::alt","IMG::border","IMG::height","IMG::hspace","IMG::ismap","IMG::name","IMG::usemap","IMG::vspace","IMG::width","INPUT::accept","INPUT::accesskey","INPUT::align","INPUT::alt","INPUT::autocomplete","INPUT::autofocus","INPUT::checked","INPUT::disabled","INPUT::inputmode","INPUT::ismap","INPUT::list","INPUT::max","INPUT::maxlength","INPUT::min","INPUT::multiple","INPUT::name","INPUT::placeholder","INPUT::readonly","INPUT::required","INPUT::size","INPUT::step","INPUT::tabindex","INPUT::type","INPUT::usemap","INPUT::value","INS::datetime","KEYGEN::disabled","KEYGEN::keytype","KEYGEN::name","LABEL::accesskey","LABEL::for","LEGEND::accesskey","LEGEND::align","LI::type","LI::value","LINK::sizes","MAP::name","MENU::compact","MENU::label","MENU::type","METER::high","METER::low","METER::max","METER::min","METER::value","OBJECT::typemustmatch","OL::compact","OL::reversed","OL::start","OL::type","OPTGROUP::disabled","OPTGROUP::label","OPTION::disabled","OPTION::label","OPTION::selected","OPTION::value","OUTPUT::for","OUTPUT::name","P::align","PRE::width","PROGRESS::max","PROGRESS::min","PROGRESS::value","SELECT::autocomplete","SELECT::disabled","SELECT::multiple","SELECT::name","SELECT::required","SELECT::size","SELECT::tabindex","SOURCE::type","TABLE::align","TABLE::bgcolor","TABLE::border","TABLE::cellpadding","TABLE::cellspacing","TABLE::frame","TABLE::rules","TABLE::summary","TABLE::width","TBODY::align","TBODY::char","TBODY::charoff","TBODY::valign","TD::abbr","TD::align","TD::axis","TD::bgcolor","TD::char","TD::charoff","TD::colspan","TD::headers","TD::height","TD::nowrap","TD::rowspan","TD::scope","TD::valign","TD::width","TEXTAREA::accesskey","TEXTAREA::autocomplete","TEXTAREA::cols","TEXTAREA::disabled","TEXTAREA::inputmode","TEXTAREA::name","TEXTAREA::placeholder","TEXTAREA::readonly","TEXTAREA::required","TEXTAREA::rows","TEXTAREA::tabindex","TEXTAREA::wrap","TFOOT::align","TFOOT::char","TFOOT::charoff","TFOOT::valign","TH::abbr","TH::align","TH::axis","TH::bgcolor","TH::char","TH::charoff","TH::colspan","TH::headers","TH::height","TH::nowrap","TH::rowspan","TH::scope","TH::valign","TH::width","THEAD::align","THEAD::char","THEAD::charoff","THEAD::valign","TR::align","TR::bgcolor","TR::char","TR::charoff","TR::valign","TRACK::default","TRACK::kind","TRACK::label","TRACK::srclang","UL::compact","UL::type","VIDEO::controls","VIDEO::height","VIDEO::loop","VIDEO::mediagroup","VIDEO::muted","VIDEO::preload","VIDEO::width"]),[P.A])
C.ac=I.aC(["HEAD","AREA","BASE","BASEFONT","BR","COL","COLGROUP","EMBED","FRAME","FRAMESET","HR","IMAGE","IMG","INPUT","ISINDEX","LINK","META","PARAM","SOURCE","STYLE","TITLE","WBR"])
C.ad=I.aC([])
C.z=H.f(I.aC(["bind","if","ref","repeat","syntax"]),[P.A])
C.A=H.f(I.aC(["A::href","AREA::href","BLOCKQUOTE::cite","BODY::background","COMMAND::icon","DEL::cite","FORM::action","IMG::src","INPUT::src","INS::cite","Q::cite","VIDEO::poster"]),[P.A])
C.n=new V.ch(0,"ManifoldType.CIRCLES")
C.j=new V.ch(1,"ManifoldType.FACE_A")
C.u=new V.ch(2,"ManifoldType.FACE_B")
C.B=new V.cu(0,"SeparationFunctionType.POINTS")
C.C=new V.cu(1,"SeparationFunctionType.FACE_A")
C.D=new V.cu(2,"SeparationFunctionType.FACE_B")
C.m=new V.bG(0,"ShapeType.CIRCLE")
C.o=new V.bG(1,"ShapeType.EDGE")
C.k=new V.bG(2,"ShapeType.POLYGON")
C.v=new V.bG(3,"ShapeType.CHAIN")
C.T=new V.ba(0,"TOIOutputState.UNKNOWN")
C.U=new V.ba(1,"TOIOutputState.FAILED")
C.af=new V.ba(2,"TOIOutputState.OVERLAPPED")
C.E=new V.ba(3,"TOIOutputState.TOUCHING")
C.ag=new V.ba(4,"TOIOutputState.SEPARATED")
C.W=new V.iI(0,"VertexType.ISOLATED")
$.dR="$cachedFunction"
$.dS="$cachedInvocation"
$.aw=null
$.w=null
$.a3=0
$.aG=null
$.d4=null
$.cS=null
$.eN=null
$.f_=null
$.bQ=null
$.bU=null
$.cT=null
$.az=null
$.aR=null
$.aS=null
$.cL=!1
$.u=C.h
$.dn=0
$.C=null
$.ab=null
$.c8=null
$.dl=null
$.dk=null
$.de=0
$.df=0
$.dg=20
$.e7=0
$.e8=0
$.e9=0
$.eb=0
$.ea=0
$.kt=1
$.bv=0
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
I.$lazy(y,x,w)}})(["db","$get$db",function(){return H.eV("_$dart_dartClosure")},"cc","$get$cc",function(){return H.eV("_$dart_js")},"dt","$get$dt",function(){return H.hd()},"du","$get$du",function(){if(typeof WeakMap=="function")var z=new WeakMap()
else{z=$.dn
$.dn=z+1
z="expando$key$"+z}return new P.fX(null,z)},"ei","$get$ei",function(){return H.a8(H.bJ({
toString:function(){return"$receiver$"}}))},"ej","$get$ej",function(){return H.a8(H.bJ({$method$:null,
toString:function(){return"$receiver$"}}))},"ek","$get$ek",function(){return H.a8(H.bJ(null))},"el","$get$el",function(){return H.a8(function(){var $argumentsExpr$='$arguments$'
try{null.$method$($argumentsExpr$)}catch(z){return z.message}}())},"ep","$get$ep",function(){return H.a8(H.bJ(void 0))},"eq","$get$eq",function(){return H.a8(function(){var $argumentsExpr$='$arguments$'
try{(void 0).$method$($argumentsExpr$)}catch(z){return z.message}}())},"en","$get$en",function(){return H.a8(H.eo(null))},"em","$get$em",function(){return H.a8(function(){try{null.$method$}catch(z){return z.message}}())},"es","$get$es",function(){return H.a8(H.eo(void 0))},"er","$get$er",function(){return H.a8(function(){try{(void 0).$method$}catch(z){return z.message}}())},"cD","$get$cD",function(){return P.iU()},"aT","$get$aT",function(){return[]},"eE","$get$eE",function(){return P.dB(["A","ABBR","ACRONYM","ADDRESS","AREA","ARTICLE","ASIDE","AUDIO","B","BDI","BDO","BIG","BLOCKQUOTE","BR","BUTTON","CANVAS","CAPTION","CENTER","CITE","CODE","COL","COLGROUP","COMMAND","DATA","DATALIST","DD","DEL","DETAILS","DFN","DIR","DIV","DL","DT","EM","FIELDSET","FIGCAPTION","FIGURE","FONT","FOOTER","FORM","H1","H2","H3","H4","H5","H6","HEADER","HGROUP","HR","I","IFRAME","IMG","INPUT","INS","KBD","LABEL","LEGEND","LI","MAP","MARK","MENU","METER","NAV","NOBR","OL","OPTGROUP","OPTION","OUTPUT","P","PRE","PROGRESS","Q","S","SAMP","SECTION","SELECT","SMALL","SOURCE","SPAN","STRIKE","STRONG","SUB","SUMMARY","SUP","TABLE","TBODY","TD","TEXTAREA","TFOOT","TH","THEAD","TIME","TR","TRACK","TT","U","UL","VAR","VIDEO","WBR"],null)},"cI","$get$cI",function(){return P.dA()},"as","$get$as",function(){return E.ev()},"cA","$get$cA",function(){return E.ev()}])
I=I.$finishIsolateConstructor(I)
$=new I()
init.metadata=[]
init.types=[{func:1},{func:1,args:[,]},{func:1,v:true},{func:1,v:true,args:[{func:1,v:true}]},{func:1,ret:P.A,args:[P.m]},{func:1,args:[P.ed]},{func:1,v:true,args:[W.bx]},{func:1,ret:P.cO,args:[W.at,P.A,P.A,W.cH]},{func:1,args:[,P.A]},{func:1,args:[P.A]},{func:1,args:[{func:1,v:true}]},{func:1,v:true,args:[P.c],opt:[P.cv]},{func:1,args:[,],opt:[,]},{func:1,args:[,,]},{func:1,v:true,args:[W.q,W.q]},{func:1,args:[P.m,P.c]},{func:1,v:true,args:[P.V]},{func:1,ret:P.V},{func:1,ret:P.m,args:[P.y,P.y]},{func:1,ret:E.a},{func:1,ret:P.c},{func:1,ret:V.cn}]
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
if(x==y)H.kr(d||a)
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
Isolate.L=a.L
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
if(typeof dartMainRunner==="function")dartMainRunner(function(b){H.f2(T.f0(),b)},[])
else (function(b){H.f2(T.f0(),b)})([])})})()