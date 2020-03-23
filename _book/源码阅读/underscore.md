# underscore

## 主体思想

* 可以匹配任何环境的使用
* 在无 new 的情况下进行使用
* 两种使用方式
  + _.each([], function)
  + _([]).each(function)
* 实现函数的链式调用

## 封装针对不同环境和导出方式进行匹配

``` JS
// 不同环境的 window 对象
var root = typeof self == 'object' && self.self === self && self ||
  typeof global == 'object' && global.global === global && global ||
  this || {};
// 导出方式匹配
// 针对es6和webpack的引入方式
if (typeof exports != 'undefined' && !exports.nodeType) {
  if (typeof module != 'undefined' && !module.nodeType && module.exports) {
    exports = module.exports = _;
  }
  exports._ = _;
} else {
  root._ = _;
}
// 针对 AMD 的引入方式
if (typeof define == 'function' && define.amd) {
  define('underscore', [], function() {
    return _;
  });
}
```

## 进行初始化

``` JS
// 声明构造函数
var _ = function(obj) {
  if (obj instanceof _) return obj;
  if (!(this instanceof _)) return new _(obj);
  this._wrapped = obj;
};
// 执行了 minxin 函数 将上方声明的所有在 _ 对象下的函数防止到 prototype 对象下
_.mixin = function(obj) {
  // 通过循环的方式将对象上的属性方法转换到原型链上
  _.each(_.functions(obj), function(name) {
    var func = _[name] = obj[name];
    _.prototype[name] = function() {
      var args = [this._wrapped]; // 声明执行函数的参数
      push.apply(args, arguments); // 将函数执行传入的参数合并
      return chainResult(this, func.apply(_, args)); // chainResult 为了实现链式调用
    };
  });
  return _;
};
```

## 开启链式调用

``` JS
/*
 * 开启链式调用
 * 首先声明了一个新的 underscore 对象并添加一个 _chain 的属性，用来作为链式调用的内容（为什么声明一个新的对象？）
 */
_.chain = function(obj) {
  var instance = _(obj);
  instance._chain = true;
  return instance;
};
// 当实例拥有 _chain 对象的时候，表明是链式调用，则要返回一个可以链式调用的对象
var chainResult = function(instance, obj) {
  return instance._chain ? _(obj).chain() : obj;
};
```

## template

``` JS
 var escapes = {
   "'": "'",
   '\\': '\\',
   '\r': 'r',
   '\n': 'n',
   '\u2028': 'u2028',
   '\u2029': 'u2029'
 };
 // 匹配换行符和回车符
 var escapeRegExp = /\\|'|\r|\n|\u2028|\u2029/g;

 var escapeChar = function(match) {
   return '\\' + escapes[match];
 };
 var noMatch = /(.)^/;
 _.templateSettings = {
   evaluate: /<%([\s\S]+?)%>/g, //<%%>
   interpolate: /<%=([\s\S]+?)%>/g, //<%=%>
   escape: /<%-([\s\S]+?)%>/g //<%-%>
 };
 _.template = function(text, settings, oldSettings) {
   // 设置默认配置项
   if (!settings && oldSettings) settings = oldSettings;
   settings = _.defaults({}, settings, _.templateSettings);
   // 生成匹配字符串的正则对象
   var matcher = RegExp([(settings.escape || noMatch).source, (settings.interpolate || noMatch).source, (settings.evaluate || noMatch).source].join('|'), 'g');

   // Compile the template source, escaping string literals appropriately.
   var index = 0;
   var source = "__p+='";
   // 开始替换字符串
   /**

    - match 匹配的子符串
    - escape 使用 escape 匹配到的字符串
    - interpolate 使用 interpolate 匹配到的字符串
    - evaluate 使用 evaluate 匹配到的字符串
    - offset 正在检查的整个字符串中匹配子字符串的偏移量。（例如，如果整个字符串为“abcd”，而匹配的子字符串为“bc”，则此参数将为1。）
    - */

   text.replace(matcher, function(match, escape, interpolate, evaluate, offset) {
     // 获取从开始到匹配到字符串中间的无用字符 并拼接，并且做了字符串转义
     source += text.slice(index, offset).replace(escapeRegExp, escapeChar);
     index = offset + match.length;
     // 将匹配到的字符串进行封装后返回到 source 字符串
     if (escape) {
       source += "'+\n((__t=(" + escape + "))==null?'':_.escape(__t))+\n'";
     } else if (interpolate) {
       // 这样写就不用排除 undefined 了
       source += "'+\n((__t=(" + interpolate + "))==null?'':__t)+\n'";
     } else if (evaluate) {
       source += "';\n" + evaluate + "\n__p+='";
     }

     // Adobe VMs need the match returned to produce the correct offset.
     return match;
   });
   source += "';\n";

   // If a variable is not specified, place data values in local scope.
   if (!settings.variable) source = 'with(obj||{}){\n' + source + '}\n';

   source = "var __t,__p='',__j=Array.prototype.join," +
     "print=function(){__p+=__j.call(arguments,'');};\n" +
     source + 'return __p;\n';

   var render;
   try {
     // 声明一个带有两个参数为 obj、_ 的函数，函数体为 source 
     render = new Function(settings.variable || 'obj', '_', source);
   } catch (e) {
     e.source = source;
     throw e;
   }

   var template = function(data) {
     return render.call(this, data, _);
   };

   // Provide the compiled source as a convenience for precompilation.
   var argument = settings.variable || 'obj';
   template.source = 'function(' + argument + '){\n' + source + '}';

   return template;
 };
```

