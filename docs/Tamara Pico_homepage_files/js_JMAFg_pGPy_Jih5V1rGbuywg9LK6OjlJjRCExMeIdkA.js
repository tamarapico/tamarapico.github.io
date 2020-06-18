/*! jQuery UI - v1.10.2 - 2013-03-14
* http://jqueryui.com
* Copyright 2013 jQuery Foundation and other contributors; Licensed MIT */
(function(e,t){function i(t,i){var a,n,r,o=t.nodeName.toLowerCase();return"area"===o?(a=t.parentNode,n=a.name,t.href&&n&&"map"===a.nodeName.toLowerCase()?(r=e("img[usemap=#"+n+"]")[0],!!r&&s(r)):!1):(/input|select|textarea|button|object/.test(o)?!t.disabled:"a"===o?t.href||i:i)&&s(t)}function s(t){return e.expr.filters.visible(t)&&!e(t).parents().addBack().filter(function(){return"hidden"===e.css(this,"visibility")}).length}var a=0,n=/^ui-id-\d+$/;e.ui=e.ui||{},e.extend(e.ui,{version:"1.10.2",keyCode:{BACKSPACE:8,COMMA:188,DELETE:46,DOWN:40,END:35,ENTER:13,ESCAPE:27,HOME:36,LEFT:37,NUMPAD_ADD:107,NUMPAD_DECIMAL:110,NUMPAD_DIVIDE:111,NUMPAD_ENTER:108,NUMPAD_MULTIPLY:106,NUMPAD_SUBTRACT:109,PAGE_DOWN:34,PAGE_UP:33,PERIOD:190,RIGHT:39,SPACE:32,TAB:9,UP:38}}),e.fn.extend({focus:function(t){return function(i,s){return"number"==typeof i?this.each(function(){var t=this;setTimeout(function(){e(t).focus(),s&&s.call(t)},i)}):t.apply(this,arguments)}}(e.fn.focus),scrollParent:function(){var t;return t=e.ui.ie&&/(static|relative)/.test(this.css("position"))||/absolute/.test(this.css("position"))?this.parents().filter(function(){return/(relative|absolute|fixed)/.test(e.css(this,"position"))&&/(auto|scroll)/.test(e.css(this,"overflow")+e.css(this,"overflow-y")+e.css(this,"overflow-x"))}).eq(0):this.parents().filter(function(){return/(auto|scroll)/.test(e.css(this,"overflow")+e.css(this,"overflow-y")+e.css(this,"overflow-x"))}).eq(0),/fixed/.test(this.css("position"))||!t.length?e(document):t},zIndex:function(i){if(i!==t)return this.css("zIndex",i);if(this.length)for(var s,a,n=e(this[0]);n.length&&n[0]!==document;){if(s=n.css("position"),("absolute"===s||"relative"===s||"fixed"===s)&&(a=parseInt(n.css("zIndex"),10),!isNaN(a)&&0!==a))return a;n=n.parent()}return 0},uniqueId:function(){return this.each(function(){this.id||(this.id="ui-id-"+ ++a)})},removeUniqueId:function(){return this.each(function(){n.test(this.id)&&e(this).removeAttr("id")})}}),e.extend(e.expr[":"],{data:e.expr.createPseudo?e.expr.createPseudo(function(t){return function(i){return!!e.data(i,t)}}):function(t,i,s){return!!e.data(t,s[3])},focusable:function(t){return i(t,!isNaN(e.attr(t,"tabindex")))},tabbable:function(t){var s=e.attr(t,"tabindex"),a=isNaN(s);return(a||s>=0)&&i(t,!a)}}),e("<a>").outerWidth(1).jquery||e.each(["Width","Height"],function(i,s){function a(t,i,s,a){return e.each(n,function(){i-=parseFloat(e.css(t,"padding"+this))||0,s&&(i-=parseFloat(e.css(t,"border"+this+"Width"))||0),a&&(i-=parseFloat(e.css(t,"margin"+this))||0)}),i}var n="Width"===s?["Left","Right"]:["Top","Bottom"],r=s.toLowerCase(),o={innerWidth:e.fn.innerWidth,innerHeight:e.fn.innerHeight,outerWidth:e.fn.outerWidth,outerHeight:e.fn.outerHeight};e.fn["inner"+s]=function(i){return i===t?o["inner"+s].call(this):this.each(function(){e(this).css(r,a(this,i)+"px")})},e.fn["outer"+s]=function(t,i){return"number"!=typeof t?o["outer"+s].call(this,t):this.each(function(){e(this).css(r,a(this,t,!0,i)+"px")})}}),e.fn.addBack||(e.fn.addBack=function(e){return this.add(null==e?this.prevObject:this.prevObject.filter(e))}),e("<a>").data("a-b","a").removeData("a-b").data("a-b")&&(e.fn.removeData=function(t){return function(i){return arguments.length?t.call(this,e.camelCase(i)):t.call(this)}}(e.fn.removeData)),e.ui.ie=!!/msie [\w.]+/.exec(navigator.userAgent.toLowerCase()),e.support.selectstart="onselectstart"in document.createElement("div"),e.fn.extend({disableSelection:function(){return this.bind((e.support.selectstart?"selectstart":"mousedown")+".ui-disableSelection",function(e){e.preventDefault()})},enableSelection:function(){return this.unbind(".ui-disableSelection")}}),e.extend(e.ui,{plugin:{add:function(t,i,s){var a,n=e.ui[t].prototype;for(a in s)n.plugins[a]=n.plugins[a]||[],n.plugins[a].push([i,s[a]])},call:function(e,t,i){var s,a=e.plugins[t];if(a&&e.element[0].parentNode&&11!==e.element[0].parentNode.nodeType)for(s=0;a.length>s;s++)e.options[a[s][0]]&&a[s][1].apply(e.element,i)}},hasScroll:function(t,i){if("hidden"===e(t).css("overflow"))return!1;var s=i&&"left"===i?"scrollLeft":"scrollTop",a=!1;return t[s]>0?!0:(t[s]=1,a=t[s]>0,t[s]=0,a)}})})(jQuery);;
/**
 * Handles the XSRF token for all write operations to the REST API
 */

(function () {
  var token = '';

  angular.module('os-auth', [])
    .service('authenticate-token', ['$http', function ($http) {
      this.fetch = function () {
        return $http.get(Drupal.settings.paths.api+'/session/token').success(setToken);
      }
    }])
    .factory('authenticate', ['$q', function ($q) {
      return {
        request: function (config) {
          if (token) {
            switch (config.method) {
              case 'PUT':
              case 'POST':
              case 'PATCH':
              case 'DELETE':
                config.headers['X-CSRF-Token'] = token;
                break;
              default:
                break;
            }

          }
          return config;
        }
      }
    }])
    .config(['$httpProvider', function ($httpProvider) {
        $httpProvider.interceptors.push('authenticate');
    }])
    .run(['authenticate-token', function (at) {
      at.fetch();
    }]);

  function setToken(resp) {
    token = resp['X-CSRF-Token'];
  }
})();
;
/**
 * Generic helper functions that more than one module will need.
 * Usually to make up for some idiosyncrasy of the platform.
 */
(function (w) {

  w.osCommonHelpers = {
    findLibraryPath: findLibraryPath,
    findDomain: findDomain,
    addDependency: addDependency
  };

  /**
   * Finds the root path of the library.
   * Some libraries include other assets that are not necessarily js files. Images, templates, etc.
   * This will find the root path of the library so those assets can be referenced.
   */
  function findLibraryPath(name) {
    var s = window.document.scripts,
      i = 0;

    for (;i < s.length; i++) {
      if (s[i].src.indexOf(name) !== -1) {
        var path = s[i].src,
          pos = path.lastIndexOf('/');

        return path.slice(0, pos);
      }
    }
  }

  /**
   *  Given a path, finds the root domain of it.
   *  Needed to whitelist external asset domains
   */
  function findDomain(path) {
    var parser = document.createElement('a');
    parser.href = path;

    return parser.protocol+'//'+parser.hostname;
  }

  /**
   * Adds a dependency for a module. Use this to allow other modules to hook themselves into other modules without
   * constantly updating the target module.
   */
  var deps = {};
  function addDependency(module, dependency) {
    if (typeof dependency != 'undefined') {
      deps[module] = deps[module] || [];
      deps[module].push(dependency);
    }

    return deps[module];
  }



  var m = angular.module('osHelpers', []);


  /**
   * Takes a string and cleans it for use in an id attribute.
   */
  m.filter('idClean', function () {
    return function (input, prefix) {
      if (input) {
        input = input.replace(/_/g, '-');
        input = input.replace(/\s/g, '-');
        input = input.replace(/--/g, '-');

        if (prefix) {
          return prefix + '-' + input;
        }
        else {
          return input;
        }
      }
    };
  });

})(window);;
(function () {

  angular.module('locationFix', [])
    .config(['$provide', function ($provide) {
      $provide.decorator('$browser', ['$delegate', function ($delegate) {
        $delegate.onUrlChange = function () {
        };
        $delegate.url = function () {
          return ""
        };
        return $delegate;
      }]);
    }]);
})();;
/*! jQuery UI - v1.10.2 - 2013-03-14
* http://jqueryui.com
* Copyright 2013 jQuery Foundation and other contributors; Licensed MIT */
(function(e,t){var i=0,s=Array.prototype.slice,n=e.cleanData;e.cleanData=function(t){for(var i,s=0;null!=(i=t[s]);s++)try{e(i).triggerHandler("remove")}catch(a){}n(t)},e.widget=function(i,s,n){var a,r,o,h,l={},u=i.split(".")[0];i=i.split(".")[1],a=u+"-"+i,n||(n=s,s=e.Widget),e.expr[":"][a.toLowerCase()]=function(t){return!!e.data(t,a)},e[u]=e[u]||{},r=e[u][i],o=e[u][i]=function(e,i){return this._createWidget?(arguments.length&&this._createWidget(e,i),t):new o(e,i)},e.extend(o,r,{version:n.version,_proto:e.extend({},n),_childConstructors:[]}),h=new s,h.options=e.widget.extend({},h.options),e.each(n,function(i,n){return e.isFunction(n)?(l[i]=function(){var e=function(){return s.prototype[i].apply(this,arguments)},t=function(e){return s.prototype[i].apply(this,e)};return function(){var i,s=this._super,a=this._superApply;return this._super=e,this._superApply=t,i=n.apply(this,arguments),this._super=s,this._superApply=a,i}}(),t):(l[i]=n,t)}),o.prototype=e.widget.extend(h,{widgetEventPrefix:r?h.widgetEventPrefix:i},l,{constructor:o,namespace:u,widgetName:i,widgetFullName:a}),r?(e.each(r._childConstructors,function(t,i){var s=i.prototype;e.widget(s.namespace+"."+s.widgetName,o,i._proto)}),delete r._childConstructors):s._childConstructors.push(o),e.widget.bridge(i,o)},e.widget.extend=function(i){for(var n,a,r=s.call(arguments,1),o=0,h=r.length;h>o;o++)for(n in r[o])a=r[o][n],r[o].hasOwnProperty(n)&&a!==t&&(i[n]=e.isPlainObject(a)?e.isPlainObject(i[n])?e.widget.extend({},i[n],a):e.widget.extend({},a):a);return i},e.widget.bridge=function(i,n){var a=n.prototype.widgetFullName||i;e.fn[i]=function(r){var o="string"==typeof r,h=s.call(arguments,1),l=this;return r=!o&&h.length?e.widget.extend.apply(null,[r].concat(h)):r,o?this.each(function(){var s,n=e.data(this,a);return n?e.isFunction(n[r])&&"_"!==r.charAt(0)?(s=n[r].apply(n,h),s!==n&&s!==t?(l=s&&s.jquery?l.pushStack(s.get()):s,!1):t):e.error("no such method '"+r+"' for "+i+" widget instance"):e.error("cannot call methods on "+i+" prior to initialization; "+"attempted to call method '"+r+"'")}):this.each(function(){var t=e.data(this,a);t?t.option(r||{})._init():e.data(this,a,new n(r,this))}),l}},e.Widget=function(){},e.Widget._childConstructors=[],e.Widget.prototype={widgetName:"widget",widgetEventPrefix:"",defaultElement:"<div>",options:{disabled:!1,create:null},_createWidget:function(t,s){s=e(s||this.defaultElement||this)[0],this.element=e(s),this.uuid=i++,this.eventNamespace="."+this.widgetName+this.uuid,this.options=e.widget.extend({},this.options,this._getCreateOptions(),t),this.bindings=e(),this.hoverable=e(),this.focusable=e(),s!==this&&(e.data(s,this.widgetFullName,this),this._on(!0,this.element,{remove:function(e){e.target===s&&this.destroy()}}),this.document=e(s.style?s.ownerDocument:s.document||s),this.window=e(this.document[0].defaultView||this.document[0].parentWindow)),this._create(),this._trigger("create",null,this._getCreateEventData()),this._init()},_getCreateOptions:e.noop,_getCreateEventData:e.noop,_create:e.noop,_init:e.noop,destroy:function(){this._destroy(),this.element.unbind(this.eventNamespace).removeData(this.widgetName).removeData(this.widgetFullName).removeData(e.camelCase(this.widgetFullName)),this.widget().unbind(this.eventNamespace).removeAttr("aria-disabled").removeClass(this.widgetFullName+"-disabled "+"ui-state-disabled"),this.bindings.unbind(this.eventNamespace),this.hoverable.removeClass("ui-state-hover"),this.focusable.removeClass("ui-state-focus")},_destroy:e.noop,widget:function(){return this.element},option:function(i,s){var n,a,r,o=i;if(0===arguments.length)return e.widget.extend({},this.options);if("string"==typeof i)if(o={},n=i.split("."),i=n.shift(),n.length){for(a=o[i]=e.widget.extend({},this.options[i]),r=0;n.length-1>r;r++)a[n[r]]=a[n[r]]||{},a=a[n[r]];if(i=n.pop(),s===t)return a[i]===t?null:a[i];a[i]=s}else{if(s===t)return this.options[i]===t?null:this.options[i];o[i]=s}return this._setOptions(o),this},_setOptions:function(e){var t;for(t in e)this._setOption(t,e[t]);return this},_setOption:function(e,t){return this.options[e]=t,"disabled"===e&&(this.widget().toggleClass(this.widgetFullName+"-disabled ui-state-disabled",!!t).attr("aria-disabled",t),this.hoverable.removeClass("ui-state-hover"),this.focusable.removeClass("ui-state-focus")),this},enable:function(){return this._setOption("disabled",!1)},disable:function(){return this._setOption("disabled",!0)},_on:function(i,s,n){var a,r=this;"boolean"!=typeof i&&(n=s,s=i,i=!1),n?(s=a=e(s),this.bindings=this.bindings.add(s)):(n=s,s=this.element,a=this.widget()),e.each(n,function(n,o){function h(){return i||r.options.disabled!==!0&&!e(this).hasClass("ui-state-disabled")?("string"==typeof o?r[o]:o).apply(r,arguments):t}"string"!=typeof o&&(h.guid=o.guid=o.guid||h.guid||e.guid++);var l=n.match(/^(\w+)\s*(.*)$/),u=l[1]+r.eventNamespace,c=l[2];c?a.delegate(c,u,h):s.bind(u,h)})},_off:function(e,t){t=(t||"").split(" ").join(this.eventNamespace+" ")+this.eventNamespace,e.unbind(t).undelegate(t)},_delay:function(e,t){function i(){return("string"==typeof e?s[e]:e).apply(s,arguments)}var s=this;return setTimeout(i,t||0)},_hoverable:function(t){this.hoverable=this.hoverable.add(t),this._on(t,{mouseenter:function(t){e(t.currentTarget).addClass("ui-state-hover")},mouseleave:function(t){e(t.currentTarget).removeClass("ui-state-hover")}})},_focusable:function(t){this.focusable=this.focusable.add(t),this._on(t,{focusin:function(t){e(t.currentTarget).addClass("ui-state-focus")},focusout:function(t){e(t.currentTarget).removeClass("ui-state-focus")}})},_trigger:function(t,i,s){var n,a,r=this.options[t];if(s=s||{},i=e.Event(i),i.type=(t===this.widgetEventPrefix?t:this.widgetEventPrefix+t).toLowerCase(),i.target=this.element[0],a=i.originalEvent)for(n in a)n in i||(i[n]=a[n]);return this.element.trigger(i,s),!(e.isFunction(r)&&r.apply(this.element[0],[i].concat(s))===!1||i.isDefaultPrevented())}},e.each({show:"fadeIn",hide:"fadeOut"},function(t,i){e.Widget.prototype["_"+t]=function(s,n,a){"string"==typeof n&&(n={effect:n});var r,o=n?n===!0||"number"==typeof n?i:n.effect||i:t;n=n||{},"number"==typeof n&&(n={duration:n}),r=!e.isEmptyObject(n),n.complete=a,n.delay&&s.delay(n.delay),r&&e.effects&&e.effects.effect[o]?s[t](n):o!==t&&s[o]?s[o](n.duration,n.easing,a):s.queue(function(i){e(this)[t](),a&&a.call(s[0]),i()})}})})(jQuery);;

/**
 * Creates a namespace.
 *
 * @return
 *   The created namespace object.
 */
function namespace () {
  var a=arguments, o=null, i, j, d;
  for (i=0; i<a.length; i=i+1) {
    d=a[i].split(".");
    o=window;
    for (j=0; j<d.length; j=j+1) {
      o[d[j]]=o[d[j]] || {};
      o=o[d[j]];
    }
  }
  return o;
};
;
/**!
 * AngularJS file upload/drop directive and service with progress and abort
 * @author  Danial  <danial.farid@gmail.com>
 * @version 3.2.4
 */
(function () {

var key, i;
function patchXHR(fnName, newFn) {
    window.XMLHttpRequest.prototype[fnName] = newFn(window.XMLHttpRequest.prototype[fnName]);
}

if (window.XMLHttpRequest && !window.XMLHttpRequest.__isFileAPIShim) {
    patchXHR('setRequestHeader', function (orig) {
        return function (header, value) {
            if (header === '__setXHR_') {
                var val = value(this);
                // fix for angular < 1.2.0
                if (val instanceof Function) {
                    val(this);
                }
            } else {
                orig.apply(this, arguments);
            }
        }
    });
}

var angularFileUpload = angular.module('angularFileUpload', []);

angularFileUpload.version = '3.2.4';
angularFileUpload.service('$upload', ['$http', '$q', '$timeout', function ($http, $q, $timeout) {
    function sendHttp(config) {
        config.method = config.method || 'POST';
        config.headers = config.headers || {};
        config.transformRequest = config.transformRequest || function (data, headersGetter) {
            if (window.ArrayBuffer && data instanceof window.ArrayBuffer) {
                return data;
            }
            return $http.defaults.transformRequest[0](data, headersGetter);
        };
        var deferred = $q.defer();
        var promise = deferred.promise;

        config.headers['__setXHR_'] = function () {
            return function (xhr) {
                if (!xhr) return;
                config.__XHR = xhr;
                config.xhrFn && config.xhrFn(xhr);
                xhr.upload.addEventListener('progress', function (e) {
                    e.config = config;
                    deferred.notify ? deferred.notify(e) : promise.progress_fn && $timeout(function () {
                        promise.progress_fn(e)
                    });
                }, false);
                //fix for firefox not firing upload progress end, also IE8-9
                xhr.upload.addEventListener('load', function (e) {
                    if (e.lengthComputable) {
                        e.config = config;
                        deferred.notify ? deferred.notify(e) : promise.progress_fn && $timeout(function () {
                            promise.progress_fn(e)
                        });
                    }
                }, false);
            };
        };

        $http(config).then(function (r) {
            deferred.resolve(r)
        }, function (e) {
            deferred.reject(e)
        }, function (n) {
            deferred.notify(n)
        });

        promise.success = function (fn) {
            promise.then(function (response) {
                fn(response.data, response.status, response.headers, config);
            });
            return promise;
        };

        promise.error = function (fn) {
            promise.then(null, function (response) {
                fn(response.data, response.status, response.headers, config);
            });
            return promise;
        };

        promise.progress = function (fn) {
            promise.progress_fn = fn;
            promise.then(null, null, function (update) {
                fn(update);
            });
            return promise;
        };
        promise.abort = function () {
            if (config.__XHR) {
                $timeout(function () {
                    config.__XHR.abort();
                });
            }
            return promise;
        };
        promise.xhr = function (fn) {
            config.xhrFn = (function (origXhrFn) {
                return function () {
                    origXhrFn && origXhrFn.apply(promise, arguments);
                    fn.apply(promise, arguments);
                }
            })(config.xhrFn);
            return promise;
        };

        return promise;
    }

    this.upload = function (config) {
        config.headers = config.headers || {};
        config.headers['Content-Type'] = undefined;
        config.transformRequest = config.transformRequest ?
            (Object.prototype.toString.call(config.transformRequest) === '[object Array]' ?
                config.transformRequest : [config.transformRequest]) : [];
        config.transformRequest.push(function (data) {
            var formData = new FormData();
            var allFields = {};
            for (key in config.fields) {
                if (config.fields.hasOwnProperty(key)) {
                    allFields[key] = config.fields[key];
                }
            }
            if (data) allFields['data'] = data;

            if (config.formDataAppender) {
                for (key in allFields) {
                    if (allFields.hasOwnProperty(key)) {
                        config.formDataAppender(formData, key, allFields[key]);
                    }
                }
            } else {
                for (key in allFields) {
                    if (allFields.hasOwnProperty(key)) {
                        var val = allFields[key];
                        if (val !== undefined) {
                            if (Object.prototype.toString.call(val) === '[object String]') {
                                formData.append(key, val);
                            } else {
                                if (config.sendObjectsAsJsonBlob && typeof val === 'object') {
                                    formData.append(key, new Blob([val], {type: 'application/json'}));
                                } else {
                                    formData.append(key, JSON.stringify(val));
                                }
                            }

                        }
                    }
                }
            }

            if (config.file != null) {
                var fileFormName = config.fileFormDataName || 'file';

                if (Object.prototype.toString.call(config.file) === '[object Array]') {
                    var isFileFormNameString = Object.prototype.toString.call(fileFormName) === '[object String]';
                    for (i = 0; i < config.file.length; i++) {
                        formData.append(isFileFormNameString ? fileFormName : fileFormName[i], config.file[i],
                            (config.fileName && config.fileName[i]) || config.file[i].name);
                    }
                } else {
                    formData.append(fileFormName, config.file, config.fileName || config.file.name);
                }
            }
            return formData;
        });

        return sendHttp(config);
    };

    this.http = function (config) {
        return sendHttp(config);
    };
}]);

angularFileUpload.directive('ngFileSelect', ['$parse', '$timeout', '$compile',
    function ($parse, $timeout, $compile) {
        return {
            restrict: 'AEC',
            require: '?ngModel',
            link: function (scope, elem, attr, ngModel) {
                linkFileSelect(scope, elem, attr, ngModel, $parse, $timeout, $compile);
            }
        }
    }]);

function linkFileSelect(scope, elem, attr, ngModel, $parse, $timeout, $compile) {
    function isInputTypeFile() {
        return elem[0].tagName.toLowerCase() === 'input' && elem.attr('type') && elem.attr('type').toLowerCase() === 'file';
    }

    var isUpdating = false;
    function changeFn(evt) {
        if (!isUpdating) {
            isUpdating = true;
            try {
                var fileList = evt.__files_ || (evt.target && evt.target.files);
                var files = [], rejFiles = [];

                var accept = $parse(attr.ngAccept);
                for (i = 0; i < fileList.length; i++) {
                    var file = fileList.item(i);
                    if (isAccepted(scope, accept, file, evt)) {
                        files.push(file);
                    } else {
                        rejFiles.push(file);
                    }
                }
                updateModel($parse, $timeout, scope, ngModel, attr,
                    attr.ngFileChange || attr.ngFileSelect, files, rejFiles, evt);
                if (files.length == 0) evt.target.value = files;
                if (evt.target && evt.target.getAttribute('__ngf_gen__')) {
                    angular.element(evt.target).remove();
                }
            } finally {
                isUpdating = false;
            }
        }
    }

    function bindAttrToFileInput(fileElem) {
        if (attr.ngMultiple) fileElem.attr('multiple', $parse(attr.ngMultiple)(scope));
        if (attr['accept']) fileElem.attr('accept', attr['accept']);
        if (attr.ngCapture) fileElem.attr('capture', $parse(attr.ngCapture)(scope));
        if (attr.ngDisabled) fileElem.attr('disabled', $parse(attr.ngDisabled)(scope));

        fileElem.bind('change', changeFn);
    }

    function createFileInput(evt) {
        if (elem.attr('disabled')) {
            return;
        }
        var fileElem = angular.element('<input type="file">');

        for (var i = 0; i < elem[0].attributes.length; i++) {
            var attribute = elem[0].attributes[i];
            fileElem.attr(attribute.name, attribute.value);
        }

        if (isInputTypeFile()) {
            elem.replaceWith(fileElem);
            elem = fileElem;
        } else {
            fileElem.css('width', '0px').css('height', '0px').css('position', 'absolute')
                .css('padding', 0).css('margin', 0).css('overflow', 'hidden')
                .attr('tabindex', '-1').css('opacity', 0).attr('__ngf_gen__', true);
            if (elem.__ngf_ref_elem__) elem.__ngf_ref_elem__.remove();
            elem.__ngf_ref_elem__ = fileElem;
            elem.parent()[0].insertBefore(fileElem[0], elem[0]);
            elem.css('overflow', 'hidden');
        }

        bindAttrToFileInput(fileElem);

        return fileElem;
    }

    function resetModel(evt) {
        updateModel($parse, $timeout, scope, ngModel, attr,
            attr.ngFileChange || attr.ngFileSelect, [], [], evt, true);
    }

    function clickHandler(evt) {
        var fileElem = createFileInput(evt);
        if (fileElem) {
            resetModel(evt);

            fileElem[0].click();
        }
        if (isInputTypeFile()) {
            elem.bind('click', clickHandler);
            evt.preventDefault()
        }
    }

    if (window.FileAPI && window.FileAPI.ngfFixIE) {
        window.FileAPI.ngfFixIE(elem, createFileInput, changeFn, resetModel);
    } else {
        elem.bind('click', clickHandler);
    }
}

angularFileUpload.directive('ngFileDrop', ['$parse', '$timeout', '$location', function ($parse, $timeout, $location) {
    return {
        restrict: 'AEC',
        require: '?ngModel',
        link: function (scope, elem, attr, ngModel) {
            linkDrop(scope, elem, attr, ngModel, $parse, $timeout, $location);
        }
    }
}]);

angularFileUpload.directive('ngNoFileDrop', function () {
    return function (scope, elem) {
        if (dropAvailable()) elem.css('display', 'none')
    }
});

//for backward compatibility
angularFileUpload.directive('ngFileDropAvailable', ['$parse', '$timeout', function ($parse, $timeout) {
    return function (scope, elem, attr) {
        if (dropAvailable()) {
            var fn = $parse(attr['ngFileDropAvailable']);
            $timeout(function () {
                fn(scope);
            });
        }
    }
}]);

function linkDrop(scope, elem, attr, ngModel, $parse, $timeout, $location) {
    var available = dropAvailable();
    if (attr['dropAvailable']) {
        $timeout(function () {
            scope.dropAvailable ? scope.dropAvailable.value = available :
                scope.dropAvailable = available;
        });
    }
    if (!available) {
        if ($parse(attr.hideOnDropNotAvailable)(scope) == true) {
            elem.css('display', 'none');
        }
        return;
    }
    var leaveTimeout = null;
    var stopPropagation = $parse(attr.stopPropagation);
    var dragOverDelay = 1;
    var accept = $parse(attr.ngAccept);
    var disabled = $parse(attr.ngDisabled);
    var actualDragOverClass;

    elem[0].addEventListener('dragover', function (evt) {
        if (disabled(scope)) return;
        evt.preventDefault();
        if (stopPropagation(scope)) evt.stopPropagation();
        // handling dragover events from the Chrome download bar
        if (navigator.userAgent.indexOf("Chrome") > -1) {
            var b = evt.dataTransfer.effectAllowed;
            evt.dataTransfer.dropEffect = ('move' === b || 'linkMove' === b) ? 'move' : 'copy';
        }
        $timeout.cancel(leaveTimeout);
        if (!scope.actualDragOverClass) {
            actualDragOverClass = calculateDragOverClass(scope, attr, evt);
        }
        elem.addClass(actualDragOverClass);
    }, false);
    elem[0].addEventListener('dragenter', function (evt) {
        if (disabled(scope)) return;
        evt.preventDefault();
        if (stopPropagation(scope)) evt.stopPropagation();
    }, false);
    elem[0].addEventListener('dragleave', function () {
        if (disabled(scope)) return;
        leaveTimeout = $timeout(function () {
            elem.removeClass(actualDragOverClass);
            actualDragOverClass = null;
        }, dragOverDelay || 1);
    }, false);
    elem[0].addEventListener('drop', function (evt) {
        if (disabled(scope)) return;
        evt.preventDefault();
        if (stopPropagation(scope)) evt.stopPropagation();
        elem.removeClass(actualDragOverClass);
        actualDragOverClass = null;
        extractFiles(evt, function (files, rejFiles) {
            updateModel($parse, $timeout, scope, ngModel, attr,
                attr.ngFileChange || attr.ngFileDrop, files, rejFiles, evt)
        }, $parse(attr.allowDir)(scope) != false, attr.multiple || $parse(attr.ngMultiple)(scope));
    }, false);

    function calculateDragOverClass(scope, attr, evt) {
        var accepted = true;
        var items = evt.dataTransfer.items;
        if (items != null) {
            for (i = 0; i < items.length && accepted; i++) {
                accepted = accepted
                    && (items[i].kind == 'file' || items[i].kind == '')
                    && isAccepted(scope, accept, items[i], evt);
            }
        }
        var clazz = $parse(attr.dragOverClass)(scope, {$event: evt});
        if (clazz) {
            if (clazz.delay) dragOverDelay = clazz.delay;
            if (clazz.accept) clazz = accepted ? clazz.accept : clazz.reject;
        }
        return clazz || attr['dragOverClass'] || 'dragover';
    }

    function extractFiles(evt, callback, allowDir, multiple) {
        var files = [], rejFiles = [], items = evt.dataTransfer.items, processing = 0;

        function addFile(file) {
            if (isAccepted(scope, accept, file, evt)) {
                files.push(file);
            } else {
                rejFiles.push(file);
            }
        }

        if (items && items.length > 0 && $location.protocol() != 'file') {
            for (i = 0; i < items.length; i++) {
                if (items[i].webkitGetAsEntry && items[i].webkitGetAsEntry() && items[i].webkitGetAsEntry().isDirectory) {
                    var entry = items[i].webkitGetAsEntry();
                    if (entry.isDirectory && !allowDir) {
                        continue;
                    }
                    if (entry != null) {
                        traverseFileTree(files, entry);
                    }
                } else {
                    var f = items[i].getAsFile();
                    if (f != null) addFile(f);
                }
                if (!multiple && files.length > 0) break;
            }
        } else {
            var fileList = evt.dataTransfer.files;
            if (fileList != null) {
                for (i = 0; i < fileList.length; i++) {
                    addFile(fileList.item(i));
                    if (!multiple && files.length > 0) break;
                }
            }
        }
        var delays = 0;
        (function waitForProcess(delay) {
            $timeout(function () {
                if (!processing) {
                    if (!multiple && files.length > 1) {
                        i = 0;
                        while (files[i].type == 'directory') i++;
                        files = [files[i]];
                    }
                    callback(files, rejFiles);
                } else {
                    if (delays++ * 10 < 20 * 1000) {
                        waitForProcess(10);
                    }
                }
            }, delay || 0)
        })();

        function traverseFileTree(files, entry, path) {
            if (entry != null) {
                if (entry.isDirectory) {
                    var filePath = (path || '') + entry.name;
                    addFile({name: entry.name, type: 'directory', path: filePath});
                    var dirReader = entry.createReader();
                    var entries = [];
                    processing++;
                    var readEntries = function () {
                        dirReader.readEntries(function (results) {
                            try {
                                if (!results.length) {
                                    for (i = 0; i < entries.length; i++) {
                                        traverseFileTree(files, entries[i], (path ? path : '') + entry.name + '/');
                                    }
                                    processing--;
                                } else {
                                    entries = entries.concat(Array.prototype.slice.call(results || [], 0));
                                    readEntries();
                                }
                            } catch (e) {
                                processing--;
                                console.error(e);
                            }
                        }, function () {
                            processing--;
                        });
                    };
                    readEntries();
                } else {
                    processing++;
                    entry.file(function (file) {
                        try {
                            processing--;
                            file.path = (path ? path : '') + file.name;
                            addFile(file);
                        } catch (e) {
                            processing--;
                            console.error(e);
                        }
                    }, function () {
                        processing--;
                    });
                }
            }
        }
    }
}

function dropAvailable() {
    var div = document.createElement('div');
    return ('draggable' in div) && ('ondrop' in div);
}

function updateModel($parse, $timeout, scope, ngModel, attr, fileChange, files, rejFiles, evt, noDelay) {
    function update() {
        if (ngModel) {
            $parse(attr.ngModel).assign(scope, files);
            $timeout(function () {
                ngModel && ngModel.$setViewValue(files != null && files.length == 0 ? null : files);
            });
        }
        if (attr.ngModelRejected) {
            $parse(attr.ngModelRejected).assign(scope, rejFiles);
        }
        if (fileChange) {
            $parse(fileChange)(scope, {
                $files: files,
                $rejectedFiles: rejFiles,
                $event: evt
            });

        }
    }
    if (noDelay) {
        update();
    } else {
        $timeout(function () {
            update();
        });
    }
}

function isAccepted(scope, accept, file, evt) {
    var val = accept(scope, {$file: file, $event: evt});
    if (val == null) {
        return true;
    }
    if (angular.isString(val)) {
        var regexp = new RegExp(globStringToRegex(val), 'gi')
        val = (file.type != null && file.type.match(regexp)) ||
        (file.name != null && file.name.match(regexp));
    }
    return val;
}

function globStringToRegex(str) {
    if (str.length > 2 && str[0] === '/' && str[str.length - 1] === '/') {
        return str.substring(1, str.length - 1);
    }
    var split = str.split(','), result = '';
    if (split.length > 1) {
        for (i = 0; i < split.length; i++) {
            result += '(' + globStringToRegex(split[i]) + ')';
            if (i < split.length - 1) {
                result += '|'
            }
        }
    } else {
        if (str.indexOf('.') == 0) {
            str = '*' + str;
        }
        result = '^' + str.replace(new RegExp('[.\\\\+*?\\[\\^\\]$(){}=!<>|:\\' + '-]', 'g'), '\\$&') + '$';
        result = result.replace(/\\\*/g, '.*').replace(/\\\?/g, '.');
    }
    return result;
}

var ngFileUpload = angular.module('ngFileUpload', []);

for (key in angularFileUpload) {
    if (angularFileUpload.hasOwnProperty(key)) {
        ngFileUpload[key] = angularFileUpload[key];
    }
}

})();
;
/**!
 * AngularJS file upload/drop directive and service with progress and abort
 * FileAPI Flash shim for old browsers not supporting FormData 
 * @author  Danial  <danial.farid@gmail.com>
 * @version 3.2.4
 */

(function() {

var hasFlash = function() {
	try {
	  var fo = new ActiveXObject('ShockwaveFlash.ShockwaveFlash');
	  if (fo) return true;
	} catch(e) {
	  if (navigator.mimeTypes['application/x-shockwave-flash'] != undefined) return true;
	}
	return false;
}

function patchXHR(fnName, newFn) {
	window.XMLHttpRequest.prototype[fnName] = newFn(window.XMLHttpRequest.prototype[fnName]);
};

if ((window.XMLHttpRequest && !window.FormData) || (window.FileAPI && FileAPI.forceLoad)) {
	var initializeUploadListener = function(xhr) {
		if (!xhr.__listeners) {
			if (!xhr.upload) xhr.upload = {};
			xhr.__listeners = [];
			var origAddEventListener = xhr.upload.addEventListener;
			xhr.upload.addEventListener = function(t, fn, b) {
				xhr.__listeners[t] = fn;
				origAddEventListener && origAddEventListener.apply(this, arguments);
			};
		}
	}
	
	patchXHR('open', function(orig) {
		return function(m, url, b) {
			initializeUploadListener(this);
			this.__url = url;
			try {
				orig.apply(this, [m, url, b]);
			} catch (e) {
				if (e.message.indexOf('Access is denied') > -1) {
					this.__origError = e;
					orig.apply(this, [m, '_fix_for_ie_crossdomain__', b]);
				}
			}
		}
	});

	patchXHR('getResponseHeader', function(orig) {
		return function(h) {
			return this.__fileApiXHR && this.__fileApiXHR.getResponseHeader ? this.__fileApiXHR.getResponseHeader(h) : (orig == null ? null : orig.apply(this, [h]));
		};
	});

	patchXHR('getAllResponseHeaders', function(orig) {
		return function() {
			return this.__fileApiXHR && this.__fileApiXHR.getAllResponseHeaders ? this.__fileApiXHR.getAllResponseHeaders() : (orig == null ? null : orig.apply(this));
		}
	});

	patchXHR('abort', function(orig) {
		return function() {
			return this.__fileApiXHR && this.__fileApiXHR.abort ? this.__fileApiXHR.abort() : (orig == null ? null : orig.apply(this));
		}
	});

	patchXHR('setRequestHeader', function(orig) {
		return function(header, value) {
			if (header === '__setXHR_') {
				initializeUploadListener(this);
				var val = value(this);
				// fix for angular < 1.2.0
				if (val instanceof Function) {
					val(this);
				}
			} else {
				this.__requestHeaders = this.__requestHeaders || {};
				this.__requestHeaders[header] = value;
				orig.apply(this, arguments);
			}
		}
	});
	
	function redefineProp(xhr, prop, fn) {
		try {
			Object.defineProperty(xhr, prop, {get: fn});
		} catch (e) {/*ignore*/}
	}

	patchXHR('send', function(orig) {
		return function() {
			var xhr = this;
			if (arguments[0] && arguments[0].__isFileAPIShim) {
				var formData = arguments[0];
				var config = {
					url: xhr.__url,
					jsonp: false, //removes the callback form param
					cache: true, //removes the ?fileapiXXX in the url
					complete: function(err, fileApiXHR) {
						xhr.__completed = true;
						if (!err && xhr.__listeners['load']) 
							xhr.__listeners['load']({type: 'load', loaded: xhr.__loaded, total: xhr.__total, target: xhr, lengthComputable: true});
						if (!err && xhr.__listeners['loadend']) 
							xhr.__listeners['loadend']({type: 'loadend', loaded: xhr.__loaded, total: xhr.__total, target: xhr, lengthComputable: true});
						if (err === 'abort' && xhr.__listeners['abort']) 
							xhr.__listeners['abort']({type: 'abort', loaded: xhr.__loaded, total: xhr.__total, target: xhr, lengthComputable: true});
						if (fileApiXHR.status !== undefined) redefineProp(xhr, 'status', function() {return (fileApiXHR.status == 0 && err && err !== 'abort') ? 500 : fileApiXHR.status});
						if (fileApiXHR.statusText !== undefined) redefineProp(xhr, 'statusText', function() {return fileApiXHR.statusText});
						redefineProp(xhr, 'readyState', function() {return 4});
						if (fileApiXHR.response !== undefined) redefineProp(xhr, 'response', function() {return fileApiXHR.response});
						var resp = fileApiXHR.responseText || (err && fileApiXHR.status == 0 && err !== 'abort' ? err : undefined);
						redefineProp(xhr, 'responseText', function() {return resp});
						redefineProp(xhr, 'response', function() {return resp});
						if (err) redefineProp(xhr, 'err', function() {return err});
						xhr.__fileApiXHR = fileApiXHR;
						if (xhr.onreadystatechange) xhr.onreadystatechange();
						if (xhr.onload) xhr.onload();
					},
					fileprogress: function(e) {
						e.target = xhr;
						xhr.__listeners['progress'] && xhr.__listeners['progress'](e);
						xhr.__total = e.total;
						xhr.__loaded = e.loaded;
						if (e.total === e.loaded) {
							// fix flash issue that doesn't call complete if there is no response text from the server  
							var _this = this
							setTimeout(function() {
								if (!xhr.__completed) {
									xhr.getAllResponseHeaders = function(){};
									_this.complete(null, {status: 204, statusText: 'No Content'});
								}
							}, FileAPI.noContentTimeout || 10000);
						}
					},
					headers: xhr.__requestHeaders
				}
				config.data = {};
				config.files = {}
				for (var i = 0; i < formData.data.length; i++) {
					var item = formData.data[i];
					if (item.val != null && item.val.name != null && item.val.size != null && item.val.type != null) {
						config.files[item.key] = item.val;
					} else {
						config.data[item.key] = item.val;
					}
				}

				setTimeout(function() {
					if (!hasFlash()) {
						throw 'Adode Flash Player need to be installed. To check ahead use "FileAPI.hasFlash"';
					}
					xhr.__fileApiXHR = FileAPI.upload(config);
				}, 1);
			} else {
				if (this.__origError) {
					throw this.__origError;
				}
				orig.apply(xhr, arguments);
			}
		}
	});
	window.XMLHttpRequest.__isFileAPIShim = true;

	function isInputTypeFile(elem) {
		return elem[0].tagName.toLowerCase() === 'input' && elem.attr('type') && elem.attr('type').toLowerCase() === 'file';
	}

	FileAPI.ngfFixIE = function(elem, createFileElemFn, changeFn, resetModel) {
		if (!hasFlash()) {
			throw 'Adode Flash Player need to be installed. To check ahead use "FileAPI.hasFlash"';
		}
		var makeFlashInput = function(evt) {
			if (elem.attr('disabled')) {
				elem.__ngf_elem__.removeClass('js-fileapi-wrapper');
			} else {
				var fileElem = elem.__ngf_elem__ = createFileElemFn();
				fileElem.addClass('js-fileapi-wrapper');
				if (!isInputTypeFile(elem)) {
					if (fileElem.parent().css('position') === '' || fileElem.parent().css('position') === 'static') {
						fileElem.parent().css('position', 'relative');
					}
					fileElem.css('position', 'absolute').css('top', elem[0].offsetTop + 'px')
						.css('left', elem[0].offsetLeft + 'px')
						.css('width', elem[0].offsetWidth + 'px')
						.css('height', elem[0].offsetHeight + 'px')
						.css('padding', elem.css('padding')).css('margin', elem.css('margin'))
						.css('filter', 'alpha(opacity=0)');
					fileElem.css('z-index', '1000');
				} else {
				}
				setTimeout(function() {
					fileElem.bind('mouseenter', makeFlashInput);
				}, 10);
				fileElem.unbind('change');
				fileElem.bind('change', function(evt) {
					fileApiChangeFn.apply(this, [evt]);
					changeFn.apply(this, [evt]);
				});
			}
		};

		elem.bind('mouseenter', makeFlashInput);

		var fileApiChangeFn = function(evt) {
			var files = FileAPI.getFiles(evt);
			//just a double check for #233
			for (var i = 0; i < files.length; i++) {
				if (files[i].size === undefined) files[i].size = 0;
				if (files[i].name === undefined) files[i].name = 'file';
				if (files[i].type === undefined) files[i].type = 'undefined';
			}
			if (!evt.target) {
				evt.target = {};
			}
			evt.target.files = files;
			// if evt.target.files is not writable use helper field
			if (evt.target.files != files) {
				evt.__files_ = files;
			}
			(evt.__files_ || evt.target.files).item = function(i) {
				return (evt.__files_ || evt.target.files)[i] || null;
			};
		};
	};

	window.FormData = FormData = function() {
		return {
			append: function(key, val, name) {
				if (val.__isFileAPIBlobShim) {
					val = val.data[0];
				}
				this.data.push({
					key: key,
					val: val,
					name: name
				});
			},
			data: [],
			__isFileAPIShim: true
		};
	};

	window.Blob = Blob = function(b) {
		return {
			data: b,
			__isFileAPIBlobShim: true
		};
	};

	(function () {
		//load FileAPI
		if (!window.FileAPI) {
			window.FileAPI = {};
		}
		if (FileAPI.forceLoad) {
			FileAPI.html5 = false;
		}
		
		if (!FileAPI.upload) {
			var jsUrl, basePath, script = document.createElement('script'), allScripts = document.getElementsByTagName('script'), i, index, src;
			if (window.FileAPI.jsUrl) {
				jsUrl = window.FileAPI.jsUrl;
			} else if (window.FileAPI.jsPath) {
				basePath = window.FileAPI.jsPath;
			} else {
				for (i = 0; i < allScripts.length; i++) {
					src = allScripts[i].src;
					index = src.search(/\/angular\-file\-upload[\-a-zA-z0-9\.]*\.js/)
					if (index > -1) {
						basePath = src.substring(0, index + 1);
						break;
					}
				}
			}

			if (FileAPI.staticPath == null) FileAPI.staticPath = basePath;
			script.setAttribute('src', jsUrl || basePath + 'FileAPI.min.js');
			document.getElementsByTagName('head')[0].appendChild(script);
			FileAPI.hasFlash = hasFlash();
		}
	})();
	FileAPI.disableFileInput = function(elem, disable) {
		if (disable) {
			elem.removeClass('js-fileapi-wrapper')
		} else {
			elem.addClass('js-fileapi-wrapper');
		}
	}
}


if (!window.FileReader) {
	window.FileReader = function() {
		var _this = this, loadStarted = false;
		this.listeners = {};
		this.addEventListener = function(type, fn) {
			_this.listeners[type] = _this.listeners[type] || [];
			_this.listeners[type].push(fn);
		};
		this.removeEventListener = function(type, fn) {
			_this.listeners[type] && _this.listeners[type].splice(_this.listeners[type].indexOf(fn), 1);
		};
		this.dispatchEvent = function(evt) {
			var list = _this.listeners[evt.type];
			if (list) {
				for (var i = 0; i < list.length; i++) {
					list[i].call(_this, evt);
				}
			}
		};
		this.onabort = this.onerror = this.onload = this.onloadstart = this.onloadend = this.onprogress = null;

		var constructEvent = function(type, evt) {
			var e = {type: type, target: _this, loaded: evt.loaded, total: evt.total, error: evt.error};
			if (evt.result != null) e.target.result = evt.result;
			return e;
		};
		var listener = function(evt) {
			if (!loadStarted) {
				loadStarted = true;
				_this.onloadstart && _this.onloadstart(constructEvent('loadstart', evt));
			}
			if (evt.type === 'load') {
				_this.onloadend && _this.onloadend(constructEvent('loadend', evt));
				var e = constructEvent('load', evt);
				_this.onload && _this.onload(e);
				_this.dispatchEvent(e);
			} else if (evt.type === 'progress') {
				var e = constructEvent('progress', evt);
				_this.onprogress && _this.onprogress(e);
				_this.dispatchEvent(e);
			} else {
				var e = constructEvent('error', evt);
				_this.onerror && _this.onerror(e);
				_this.dispatchEvent(e);
			}
		};
		this.readAsArrayBuffer = function(file) {
			FileAPI.readAsBinaryString(file, listener);
		}
		this.readAsBinaryString = function(file) {
			FileAPI.readAsBinaryString(file, listener);
		}
		this.readAsDataURL = function(file) {
			FileAPI.readAsDataURL(file, listener);
		}
		this.readAsText = function(file) {
			FileAPI.readAsText(file, listener);
		}
	}
}
})();
;

/**
 @license $indexedDBProvider
 (c) 2014 Bram Whillock (bramski)
 Forked from original work by clements Capitan (webcss)
 License: MIT
 */

(function() {
  'use strict';
  var __slice = [].slice;

  angular.module('indexedDB', []).provider('$indexedDB', function() {
    var IDBKeyRange, allTransactions, apiDirection, appendResultsToPromise, applyNeededUpgrades, cursorDirection, db, dbMode, dbName, dbPromise, dbVersion, defaultQueryOptions, errorMessageFor, indexedDB, readyState, upgradesByVersion;
    indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB || window.shimIndexedDB;
    IDBKeyRange = window.IDBKeyRange || window.mozIDBKeyRange || window.webkitIDBKeyRange || window.msIDBKeyRange;
    dbMode = {
      readonly: "readonly",
      readwrite: "readwrite"
    };
    readyState = {
      pending: "pending"
    };
    cursorDirection = {
      next: "next",
      nextunique: "nextunique",
      prev: "prev",
      prevunique: "prevunique"
    };
    apiDirection = {
      ascending: cursorDirection.next,
      descending: cursorDirection.prev
    };
    dbName = '';
    dbVersion = 1;
    db = null;
    upgradesByVersion = {};
    dbPromise = null;
    allTransactions = [];
    defaultQueryOptions = {
      useIndex: void 0,
      keyRange: null,
      direction: cursorDirection.next
    };
    applyNeededUpgrades = function(oldVersion, event, db, tx, $log) {
      var version;
      for (version in upgradesByVersion) {
        if (!upgradesByVersion.hasOwnProperty(version) || version <= oldVersion) {
          continue;
        }
        $log.log("$indexedDB: Running upgrade : " + version + " from " + oldVersion);
        upgradesByVersion[version](event, db, tx);
      }
    };
    errorMessageFor = function(e) {
      if (e.target.readyState === readyState.pending) {
        return "Error: Operation pending";
      } else {
        return e.target.webkitErrorMessage || e.target.error.message || e.target.errorCode;
      }
    };
    appendResultsToPromise = function(promise, results) {
      if (results !== void 0) {
        return promise.then(function() {
          return results;
        });
      } else {
        return promise;
      }
    };

    /**
    @ngdoc function
    @name $indexedDBProvider.connection
    @function
    
    @description
    sets the name of the database to use
    
    @param {string} databaseName database name.
    @returns {object} this
     */
    this.connection = function(databaseName) {
      dbName = databaseName;
      return this;
    };

    /**
    @ngdoc function
    @name $indexedDBProvider.upgradeDatabase
    @function
    
    @description provides version number and steps to upgrade the database wrapped in a
    callback function
    
    @param {number} newVersion new version number for the database.
    @param {function} callback the callback which proceeds the upgrade
    @returns {object} this
     */
    this.upgradeDatabase = function(newVersion, callback) {
      upgradesByVersion[newVersion] = callback;
      dbVersion = Math.max.apply(null, Object.keys(upgradesByVersion));
      return this;
    };
    this.$get = [
      '$q', '$rootScope', '$log', function($q, $rootScope, $log) {
        var DbQ, ObjectStore, Query, Transaction, addTransaction, closeDatabase, createDatabaseConnection, keyRangeForOptions, openDatabase, openTransaction, rejectWithError, validateStoreNames;
        rejectWithError = function(deferred) {
          return function(error) {
            return $rootScope.$apply(function() {
              return deferred.reject(errorMessageFor(error));
            });
          };
        };
        createDatabaseConnection = function() {
          var dbReq, deferred;
          deferred = $q.defer();
          dbReq = indexedDB.open(dbName, parseInt(dbVersion) || 1);
          dbReq.onsuccess = function() {
            db = dbReq.result;
            $rootScope.$apply(function() {
              deferred.resolve(db);
            });
          };
          dbReq.onblocked = dbReq.onerror = rejectWithError(deferred);
          dbReq.onupgradeneeded = function(event) {
            var tx;
            db = event.target.result;
            tx = event.target.transaction;
            $log.log("$indexedDB: Upgrading database '" + db.name + "' from version " + event.oldVersion + " to version " + event.newVersion + " ...");
            applyNeededUpgrades(event.oldVersion, event, db, tx, $log);
          };
          return deferred.promise;
        };
        openDatabase = function() {
          return dbPromise || (dbPromise = createDatabaseConnection());
        };
        closeDatabase = function() {
          return openDatabase().then(function() {
            db.close();
            db = null;
            return dbPromise = null;
          });
        };
        validateStoreNames = function(storeNames) {
          var found, storeName, _i, _len;
          found = true;
          for (_i = 0, _len = storeNames.length; _i < _len; _i++) {
            storeName = storeNames[_i];
            found = found & db.objectStoreNames.contains(storeName);
          }
          return found;
        };
        openTransaction = function(storeNames, mode) {
          if (mode == null) {
            mode = dbMode.readonly;
          }
          return openDatabase().then(function() {
            if (!validateStoreNames(storeNames)) {
              return $q.reject("Object stores " + storeNames + " do not exist.");
            }
            return new Transaction(storeNames, mode);
          });
        };
        keyRangeForOptions = function(options) {
          if (options.beginKey && options.endKey) {
            return IDBKeyRange.bound(options.beginKey, options.endKey);
          }
        };
        addTransaction = function(transaction) {
          allTransactions.push(transaction.promise);
          return transaction.promise["finally"](function() {
            var index;
            index = allTransactions.indexOf(transaction.promise);
            if (index > -1) {
              return allTransactions.splice(index, 1);
            }
          });
        };
        Transaction = (function() {
          function Transaction(storeNames, mode) {
            if (mode == null) {
              mode = dbMode.readonly;
            }
            this.transaction = db.transaction(storeNames, mode);
            this.defer = $q.defer();
            this.promise = this.defer.promise;
            this.setupCallbacks();
          }

          Transaction.prototype.setupCallbacks = function() {
            this.transaction.oncomplete = (function(_this) {
              return function() {
                return $rootScope.$apply(function() {
                  return _this.defer.resolve("Transaction Completed");
                });
              };
            })(this);
            this.transaction.onabort = (function(_this) {
              return function(error) {
                return $rootScope.$apply(function() {
                  return _this.defer.reject("Transaction Aborted", error);
                });
              };
            })(this);
            this.transaction.onerror = (function(_this) {
              return function(error) {
                return $rootScope.$apply(function() {
                  return _this.defer.reject("Transaction Error", error);
                });
              };
            })(this);
            return addTransaction(this);
          };

          Transaction.prototype.objectStore = function(storeName) {
            return this.transaction.objectStore(storeName);
          };

          Transaction.prototype.abort = function() {
            return this.transaction.abort();
          };

          return Transaction;

        })();
        DbQ = (function() {
          function DbQ() {
            this.q = $q.defer();
            this.promise = this.q.promise;
          }

          DbQ.prototype.reject = function() {
            var args;
            args = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
            return $rootScope.$apply((function(_this) {
              return function() {
                var _ref;
                return (_ref = _this.q).reject.apply(_ref, args);
              };
            })(this));
          };

          DbQ.prototype.rejectWith = function(req) {
            return req.onerror = req.onblocked = (function(_this) {
              return function(e) {
                return _this.reject(errorMessageFor(e));
              };
            })(this);
          };

          DbQ.prototype.resolve = function() {
            var args;
            args = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
            return $rootScope.$apply((function(_this) {
              return function() {
                var _ref;
                return (_ref = _this.q).resolve.apply(_ref, args);
              };
            })(this));
          };

          DbQ.prototype.notify = function() {
            var args;
            args = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
            return $rootScope.$apply((function(_this) {
              return function() {
                var _ref;
                return (_ref = _this.q).notify.apply(_ref, args);
              };
            })(this));
          };

          DbQ.prototype.dbErrorFunction = function() {
            return (function(_this) {
              return function(error) {
                return $rootScope.$apply(function() {
                  return _this.q.reject(errorMessageFor(error));
                });
              };
            })(this);
          };

          DbQ.prototype.resolveWith = function(req) {
            this.rejectWith(req);
            return req.onsuccess = (function(_this) {
              return function(e) {
                return _this.resolve(e.target.result);
              };
            })(this);
          };

          return DbQ;

        })();
        ObjectStore = (function() {
          function ObjectStore(storeName, transaction) {
            this.storeName = storeName;
            this.store = transaction.objectStore(storeName);
            this.transaction = transaction;
          }

          ObjectStore.prototype.defer = function() {
            return new DbQ();
          };

          ObjectStore.prototype._mapCursor = function(defer, mapFunc, req) {
            var results;
            if (req == null) {
              req = this.store.openCursor();
            }
            results = [];
            defer.rejectWith(req);
            return req.onsuccess = function(e) {
              var cursor;
              if (cursor = e.target.result) {
                results.push(mapFunc(cursor));
                defer.notify(mapFunc(cursor));
                return cursor["continue"]();
              } else {
                return defer.resolve(results);
              }
            };
          };

          ObjectStore.prototype._arrayOperation = function(data, mapFunc) {
            var defer, item, req, results, _i, _len;
            defer = this.defer();
            if (!angular.isArray(data)) {
              data = [data];
            }
            for (_i = 0, _len = data.length; _i < _len; _i++) {
              item = data[_i];
              req = mapFunc(item);
              results = [];
              defer.rejectWith(req);
              req.onsuccess = function(e) {
                results.push(e.target.result);
                defer.notify(e.target.result);
                if (results.length >= data.length) {
                  return defer.resolve(results);
                }
              };
            }
            if (data.length === 0) {
              return $q.when([]);
            }
            return defer.promise;
          };


          /**
            @ngdoc function
            @name $indexedDBProvider.store.getAllKeys
            @function
          
            @description
            gets all the keys
          
            @returns {Q} A promise which will result with all the keys
           */

          ObjectStore.prototype.getAllKeys = function() {
            var defer, req;
            defer = this.defer();
            if (this.store.getAllKeys) {
              req = this.store.getAllKeys();
              defer.resolveWith(req);
            } else {
              this._mapCursor(defer, function(cursor) {
                return cursor.key;
              });
            }
            return defer.promise;
          };


          /**
            @ngdoc function
            @name $indexedDBProvider.store.clear
            @function
          
            @description
            clears all objects from this store
          
            @returns {Q} A promise that this can be done successfully.
           */

          ObjectStore.prototype.clear = function() {
            var defer, req;
            defer = this.defer();
            req = this.store.clear();
            defer.resolveWith(req);
            return defer.promise;
          };


          /**
            @ngdoc function
            @name $indexedDBProvider.store.delete
            @function
          
            @description
            Deletes the item at the key.  The operation is ignored if the item does not exist.
          
            @param {key} The key of the object to delete.
            @returns {Q} A promise that this can be done successfully.
           */

          ObjectStore.prototype["delete"] = function(key) {
            var defer;
            defer = this.defer();
            defer.resolveWith(this.store["delete"](key));
            return defer.promise;
          };


          /**
            @ngdoc function
            @name $indexedDBProvider.store.upsert
            @function
          
            @description
            Updates the given item
          
            @param {data} Details of the item or items to update or insert
            @returns {Q} A promise that this can be done successfully.
           */

          ObjectStore.prototype.upsert = function(data) {
            return this._arrayOperation(data, (function(_this) {
              return function(item) {
                return _this.store.put(item);
              };
            })(this));
          };


          /**
            @ngdoc function
            @name $indexedDBProvider.store.insert
            @function
          
            @description
            Updates the given item
          
            @param {data} Details of the item or items to insert
            @returns {Q} A promise that this can be done successfully.
           */

          ObjectStore.prototype.insert = function(data) {
            return this._arrayOperation(data, (function(_this) {
              return function(item) {
                return _this.store.add(item);
              };
            })(this));
          };


          /**
            @ngdoc function
            @name $indexedDBProvider.store.getAll
            @function
          
            @description
            Fetches all items from the store
          
            @returns {Q} A promise which resolves with copies of all items in the store
           */

          ObjectStore.prototype.getAll = function() {
            var defer;
            defer = this.defer();
            if (this.store.getAll) {
              defer.resolveWith(this.store.getAll());
            } else {
              this._mapCursor(defer, function(cursor) {
                return cursor.value;
              });
            }
            return defer.promise;
          };

          ObjectStore.prototype.eachWhere = function(query) {
            var defer, direction, indexName, keyRange, req;
            defer = this.defer();
            indexName = query.indexName;
            keyRange = query.keyRange;
            direction = query.direction;
            req = indexName ? this.store.index(indexName).openCursor(keyRange, direction) : this.store.openCursor(keyRange, direction);
            this._mapCursor(defer, (function(cursor) {
              return cursor.value;
            }), req);
            return defer.promise;
          };

          ObjectStore.prototype.findWhere = function(query) {
            return this.eachWhere(query);
          };


          /**
            @ngdoc function
            @name $indexedDBProvider.store.each
            @function
          
            @description
            Iterates through the items in the store
          
            @param {options.beginKey} the key to start iterating from
            @param {options.endKey} the key to stop iterating at
            @param {options.direction} Direction to iterate in
            @returns {Q} A promise which notifies with each individual item and resolves with all of them.
           */

          ObjectStore.prototype.each = function(options) {
            if (options == null) {
              options = {};
            }
            return this.eachBy(void 0, options);
          };


          /**
            @ngdoc function
            @name $indexedDBProvider.store.eachBy
            @function
          
            @description
            Iterates through the items in the store using an index
          
            @param {indexName} name of the index to use instead of the primary
            @param {options.beginKey} the key to start iterating from
            @param {options.endKey} the key to stop iterating at
            @param {options.direction} Direction to iterate in
            @returns {Q} A promise which notifies with each individual item and resolves with all of them.
           */

          ObjectStore.prototype.eachBy = function(indexName, options) {
            var q;
            if (indexName == null) {
              indexName = void 0;
            }
            if (options == null) {
              options = {};
            }
            q = new Query();
            q.indexName = indexName;
            q.keyRange = keyRangeForOptions(options);
            q.direction = options.direction || defaultQueryOptions.direction;
            return this.eachWhere(q);
          };


          /**
            @ngdoc function
            @name $indexedDBProvider.store.count
            @function
          
            @description
            Returns a count of the items in the store
          
            @returns {Q} A promise which resolves with the count of all the items in the store.
           */

          ObjectStore.prototype.count = function() {
            var defer;
            defer = this.defer();
            defer.resolveWith(this.store.count());
            return defer.promise;
          };


          /**
            @ngdoc function
            @name $indexedDBProvider.store.find
            @function
          
            @description
            Fetches an item from the store
          
            @returns {Q} A promise which resolves with the item from the store
           */

          ObjectStore.prototype.find = function(key) {
            var defer, req;
            defer = this.defer();
            req = this.store.get(key);
            defer.rejectWith(req);
            req.onsuccess = (function(_this) {
              return function(e) {
                if (e.target.result) {
                  return defer.resolve(e.target.result);
                } else {
                  return defer.reject("" + _this.storeName + ":" + key + " not found.");
                }
              };
            })(this);
            return defer.promise;
          };


          /**
            @ngdoc function
            @name $indexedDBProvider.store.findBy
            @function
          
            @description
            Fetches an item from the store using a named index.
          
            @returns {Q} A promise which resolves with the item from the store.
           */

          ObjectStore.prototype.findBy = function(index, key) {
            var defer;
            defer = this.defer();
            defer.resolveWith(this.store.index(index).get(key));
            return defer.promise;
          };

          ObjectStore.prototype.query = function() {
            return new Query();
          };

          return ObjectStore;

        })();
        Query = (function() {
          function Query() {
            this.indexName = void 0;
            this.keyRange = void 0;
            this.direction = cursorDirection.next;
          }

          Query.prototype.$lt = function(value) {
            this.keyRange = IDBKeyRange.upperBound(value, true);
            return this;
          };

          Query.prototype.$gt = function(value) {
            this.keyRange = IDBKeyRange.lowerBound(value, true);
            return this;
          };

          Query.prototype.$lte = function(value) {
            this.keyRange = IDBKeyRange.upperBound(value);
            return this;
          };

          Query.prototype.$gte = function(value) {
            this.keyRange = IDBKeyRange.lowerBound(value);
            return this;
          };

          Query.prototype.$eq = function(value) {
            this.keyRange = IDBKeyRange.only(value);
            return this;
          };

          Query.prototype.$between = function(low, hi, exLow, exHi) {
            if (exLow == null) {
              exLow = false;
            }
            if (exHi == null) {
              exHi = false;
            }
            this.keyRange = IDBKeyRange.bound(low, hi, exLow, exHi);
            return this;
          };

          Query.prototype.$desc = function(unique) {
            this.direction = unique ? cursorDirection.prevunique : cursorDirection.prev;
            return this;
          };

          Query.prototype.$asc = function(unique) {
            this.direction = unique ? cursorDirection.nextunique : cursorDirection.next;
            return this;
          };

          Query.prototype.$index = function(indexName) {
            this.indexName = indexName;
            return this;
          };

          return Query;

        })();
        return {

          /**
          @ngdoc method
          @name $indexedDB.objectStore
          @function
          
          @description an IDBObjectStore to use
          
          @params {string} storeName the name of the objectstore to use
          @returns {object} ObjectStore
           */
          openStore: function(storeName, callBack, mode) {
            if (mode == null) {
              mode = dbMode.readwrite;
            }
            return openTransaction([storeName], mode).then(function(transaction) {
              var results;
              results = callBack(new ObjectStore(storeName, transaction));
              return appendResultsToPromise(transaction.promise, results);
            });
          },
          openStores: function(storeNames, callback, mode) {
            if (mode == null) {
              mode = dbMode.readwrite;
            }
            return openTransaction(storeNames, mode).then(function(transaction) {
              var objectStores, results, storeName;
              objectStores = (function() {
                var _i, _len, _results;
                _results = [];
                for (_i = 0, _len = storeNames.length; _i < _len; _i++) {
                  storeName = storeNames[_i];
                  _results.push(new ObjectStore(storeName, transaction));
                }
                return _results;
              })();
              results = callback.apply(null, objectStores);
              return appendResultsToPromise(transaction.promise, results);
            });
          },
          openAllStores: function(callback, mode) {
            if (mode == null) {
              mode = dbMode.readwrite;
            }
            return openDatabase().then((function(_this) {
              return function() {
                var objectStores, results, storeName, storeNames, transaction;
                storeNames = Array.prototype.slice.apply(db.objectStoreNames);
                transaction = new Transaction(storeNames, mode);
                objectStores = (function() {
                  var _i, _len, _results;
                  _results = [];
                  for (_i = 0, _len = storeNames.length; _i < _len; _i++) {
                    storeName = storeNames[_i];
                    _results.push(new ObjectStore(storeName, transaction));
                  }
                  return _results;
                })();
                results = callback.apply(null, objectStores);
                return appendResultsToPromise(transaction.promise, results);
              };
            })(this));
          },

          /**
            @ngdoc method
            @name $indexedDB.closeDatabase
            @function
          
            @description Closes the database for use and completes all transactions.
           */
          closeDatabase: function() {
            return closeDatabase();
          },

          /**
            @ngdoc method
            @name $indexedDB.deleteDatabase
            @function
          
            @description Closes and then destroys the current database.  Returns a promise that resolves when this is persisted.
           */
          deleteDatabase: function() {
            return closeDatabase().then(function() {
              var defer;
              defer = new DbQ();
              defer.resolveWith(indexedDB.deleteDatabase(dbName));
              return defer.promise;
            })["finally"](function() {
              return $log.log("$indexedDB: " + dbName + " database deleted.");
            });
          },
          queryDirection: apiDirection,
          flush: function() {
            if (allTransactions.length > 0) {
              return $q.all(allTransactions);
            } else {
              return $q.when([]);
            }
          },

          /**
            @ngdoc method
            @name $indexedDB.databaseInfo
            @function
          
            @description Returns information about this database.
           */
          databaseInfo: function() {
            return openDatabase().then(function() {
              var storeNames, transaction;
              transaction = null;
              storeNames = Array.prototype.slice.apply(db.objectStoreNames);
              return openTransaction(storeNames, dbMode.readonly).then(function(transaction) {
                var store, storeName, stores;
                stores = (function() {
                  var _i, _len, _results;
                  _results = [];
                  for (_i = 0, _len = storeNames.length; _i < _len; _i++) {
                    storeName = storeNames[_i];
                    store = transaction.objectStore(storeName);
                    _results.push({
                      name: storeName,
                      keyPath: store.keyPath,
                      autoIncrement: store.autoIncrement,
                      indices: Array.prototype.slice.apply(store.indexNames)
                    });
                  }
                  return _results;
                })();
                return transaction.promise.then(function() {
                  return {
                    name: db.name,
                    version: db.version,
                    objectStores: stores
                  };
                });
              });
            });
          }
        };
      }
    ];
  });

}).call(this);

//# sourceMappingURL=angular-indexed-db.js.map
;

/*
 * jQuery BBQ: Back Button & Query Library - v1.2.1 - 2/17/2010
 * http://benalman.com/projects/jquery-bbq-plugin/
 *
 * Copyright (c) 2010 "Cowboy" Ben Alman
 * Dual licensed under the MIT and GPL licenses.
 * http://benalman.com/about/license/
 */
(function($,p){var i,m=Array.prototype.slice,r=decodeURIComponent,a=$.param,c,l,v,b=$.bbq=$.bbq||{},q,u,j,e=$.event.special,d="hashchange",A="querystring",D="fragment",y="elemUrlAttr",g="location",k="href",t="src",x=/^.*\?|#.*$/g,w=/^.*\#/,h,C={};function E(F){return typeof F==="string"}function B(G){var F=m.call(arguments,1);return function(){return G.apply(this,F.concat(m.call(arguments)))}}function n(F){return F.replace(/^[^#]*#?(.*)$/,"$1")}function o(F){return F.replace(/(?:^[^?#]*\?([^#]*).*$)?.*/,"$1")}function f(H,M,F,I,G){var O,L,K,N,J;if(I!==i){K=F.match(H?/^([^#]*)\#?(.*)$/:/^([^#?]*)\??([^#]*)(#?.*)/);J=K[3]||"";if(G===2&&E(I)){L=I.replace(H?w:x,"")}else{N=l(K[2]);I=E(I)?l[H?D:A](I):I;L=G===2?I:G===1?$.extend({},I,N):$.extend({},N,I);L=a(L);if(H){L=L.replace(h,r)}}O=K[1]+(H?"#":L||!K[1]?"?":"")+L+J}else{O=M(F!==i?F:p[g][k])}return O}a[A]=B(f,0,o);a[D]=c=B(f,1,n);c.noEscape=function(G){G=G||"";var F=$.map(G.split(""),encodeURIComponent);h=new RegExp(F.join("|"),"g")};c.noEscape(",/");$.deparam=l=function(I,F){var H={},G={"true":!0,"false":!1,"null":null};$.each(I.replace(/\+/g," ").split("&"),function(L,Q){var K=Q.split("="),P=r(K[0]),J,O=H,M=0,R=P.split("]["),N=R.length-1;if(/\[/.test(R[0])&&/\]$/.test(R[N])){R[N]=R[N].replace(/\]$/,"");R=R.shift().split("[").concat(R);N=R.length-1}else{N=0}if(K.length===2){J=r(K[1]);if(F){J=J&&!isNaN(J)?+J:J==="undefined"?i:G[J]!==i?G[J]:J}if(N){for(;M<=N;M++){P=R[M]===""?O.length:R[M];O=O[P]=M<N?O[P]||(R[M+1]&&isNaN(R[M+1])?{}:[]):J}}else{if($.isArray(H[P])){H[P].push(J)}else{if(H[P]!==i){H[P]=[H[P],J]}else{H[P]=J}}}}else{if(P){H[P]=F?i:""}}});return H};function z(H,F,G){if(F===i||typeof F==="boolean"){G=F;F=a[H?D:A]()}else{F=E(F)?F.replace(H?w:x,""):F}return l(F,G)}l[A]=B(z,0);l[D]=v=B(z,1);$[y]||($[y]=function(F){return $.extend(C,F)})({a:k,base:k,iframe:t,img:t,input:t,form:"action",link:k,script:t});j=$[y];function s(I,G,H,F){if(!E(H)&&typeof H!=="object"){F=H;H=G;G=i}return this.each(function(){var L=$(this),J=G||j()[(this.nodeName||"").toLowerCase()]||"",K=J&&L.attr(J)||"";L.attr(J,a[I](K,H,F))})}$.fn[A]=B(s,A);$.fn[D]=B(s,D);b.pushState=q=function(I,F){if(E(I)&&/^#/.test(I)&&F===i){F=2}var H=I!==i,G=c(p[g][k],H?I:{},H?F:2);p[g][k]=G+(/#/.test(G)?"":"#")};b.getState=u=function(F,G){return F===i||typeof F==="boolean"?v(F):v(G)[F]};b.removeState=function(F){var G={};if(F!==i){G=u();$.each($.isArray(F)?F:arguments,function(I,H){delete G[H]})}q(G,2)};e[d]=$.extend(e[d],{add:function(F){var H;function G(J){var I=J[D]=c();J.getState=function(K,L){return K===i||typeof K==="boolean"?l(I,K):l(I,L)[K]};H.apply(this,arguments)}if($.isFunction(F)){H=F;return G}else{H=F.handler;F.handler=G}}})})(jQuery,this);
/*
 * jQuery hashchange event - v1.2 - 2/11/2010
 * http://benalman.com/projects/jquery-hashchange-plugin/
 *
 * Copyright (c) 2010 "Cowboy" Ben Alman
 * Dual licensed under the MIT and GPL licenses.
 * http://benalman.com/about/license/
 */
(function($,i,b){var j,k=$.event.special,c="location",d="hashchange",l="href",f=$.browser,g=document.documentMode,h=f.msie&&(g===b||g<8),e="on"+d in i&&!h;function a(m){m=m||i[c][l];return m.replace(/^[^#]*#?(.*)$/,"$1")}$[d+"Delay"]=100;k[d]=$.extend(k[d],{setup:function(){if(e){return false}$(j.start)},teardown:function(){if(e){return false}$(j.stop)}});j=(function(){var m={},r,n,o,q;function p(){o=q=function(s){return s};if(h){n=$('<iframe src="javascript:0"/>').hide().insertAfter("body")[0].contentWindow;q=function(){return a(n.document[c][l])};o=function(u,s){if(u!==s){var t=n.document;t.open().close();t[c].hash="#"+u}};o(a())}}m.start=function(){if(r){return}var t=a();o||p();(function s(){var v=a(),u=q(t);if(v!==t){o(t=v,u);$(i).trigger(d)}else{if(u!==t){i[c][l]=i[c][l].replace(/#.*/,"")+"#"+u}}r=setTimeout(s,$[d+"Delay"])})()};m.stop=function(){if(!n){r&&clearTimeout(r);r=0}};return m})()})(jQuery,this);
;
/**
 * Provides a generic module for interacting with entities via our REST API
 */
(function () {

  var restPath = '',
    entities = {},
    fetched = {},
    defers = {},
    cache = {},
    weSaved = {},
    lockPromise;

  angular.module('EntityService', ['indexedDB'])
    .config(function () {
      restPath = Drupal.settings.paths.api;
    })
  /**
   * Provider to manage configuration options for EntityService
   */
    .provider('EntityConfig', [function () {
      var config = {};

      function initType(type) {
        config[type] = config[type] || {
          fields: {}
        };
      }

      return {
        $get: [function () {
          return angular.copy(config);
        }],
        addField: function (type, field, value) {
          initType(type);

          config[type].fields[field] = value;
        }
      }
    }])
  /**
   * Service to maintain the list of files on a user's site
   */
    .factory('EntityService', ['$rootScope', '$http', '$q', 'EntityConfig', '$indexedDB', 'EntityCacheUpdater', function ($rootScope, $http, $q, config, $idb, ECU) {
      var factory = function (entityType, idProp) {
        var type = entityType;
        var ents;
        entities[entityType] = ents = entities[entityType] || {};
        var entityCount = 0;
        var eventName = 'EntityService.' + type;
        var errorAttempts = 0;
        var vsite = null;
        var fetchDefer;

        if (Drupal.settings.spaces) {
          vsite = Drupal.settings.spaces.id;
        }

        var success = function(resp, status, headers, config) {
          var key = config.pKey;
          recursiveFetch(resp, status, headers, config);
        }

        function recursiveFetch(resp, status, headers, config) {
          var key = config.pKey;
          // convert the key into a params array
          for (var i=0; i<resp.data.length; i++) {
            cache[key].data.push(resp.data[i]);
          }

          if (resp.next) {
            var max = Math.ceil(resp.count/resp.data.length),
              curr = resp.next.href.match(/page=([\d]+)/)[1];
            defers[key].notify(("Loading $p% complete.").replace('$p', Math.round(((curr-1)/max)*100)));
            $http.get(resp.next.href, {pKey: key}).success(recursiveFetch);
          }
          else {
            saveCache(key);
            defers[key].resolve(angular.copy(cache[key].data));
            $rootScope.$broadcast(eventName+'.fetch', angular.copy(cache[key].data), key);
          }
        }

        var errorFunc = function(resp, status, headers, config) {
          errorAttempts++;
          if (errorAttempts < 3) {
            $http.get(restPath + '/' + entityType, config).
              success(success).
              error(errorFunc);
          }
          else {
            defers[config.pKey].reject('Error getting files. Aborting after 3 attempts.');
          }
        };

        function findByProp(prop, value) {
          for (var i in ents) {
            if (ents[i][prop] && ents[i][prop] == value) {
              return i;
            }
          }
        }

        this.fetchOne = function (id) {
          var cKey = entityType + ':' + id;

          if (!defers[cKey]) {
            var url = restPath + '/' + entityType + '/' + id;
            defers[cKey] = $q.defer();
            $http.get(url, {pKey: cKey})
              .then(function (response) {
                ents[id] = response.data.data[0];
                defers[cKey].resolve(angular.copy(response.data.data[0]));
              },
              function (response) {
                defers[cKey].reject(response);
              });
          }
          return defers[cKey].promise;
        };

        this.fetchImageStyle = function(id, imageStyle) {
          var url = restPath + '/' + entityType + '/' + id + '/image_style/' + imageStyle;
          var cKey = entityType + ':' + id;

          return $http.get(url, {pKey: cKey});
        };

        this.fetch = function (params) {
          if (!params) {
            params = {};
          }

          if (vsite) {
            params.vsite = vsite;
          }

          if (config[entityType]) {
            for (var k in config[entityType].fields) {
              params[k] = config[entityType].fields[k];
            }
          }

          var key = entityType + ':' + JSON.stringify(params);
          if (!defers[key]) {
            defers[key] = $q.defer();

            lockPromise.then(function (keys) {
              if (keys.indexOf(key) === -1) {
                var url = restPath + '/' + entityType;
                $http.get(url, {params: params, pKey: key})
                  .success(success)
                  .error(errorFunc);
                setTimeout(function () {
                  defers[key].notify("Loading 0% complete.");
                }, 1);
                cache[key] = {
                  key: key,
                  lastUpdated: parseInt(Date.now()/1000),
                  data: [],
                  entityType: entityType,
                  idProperty: idProp,
                  params: params,
                  matches: function(entity, entityType) {
                    if (entityType != this.entityType) {
                      return false;
                    }
                    return testEntity.call(this, entity);
                  }
                }
              }

              return keys;
            });

            defers[key].promise.then(function(data) {
              for (var i = 0; i < data.length; i++) {
                ents[data[i][idProp]] = data[i];
              }

              return data;
            });
          }
          return defers[key].promise;
        }

        this.get = function (id) {
          var keys = getCacheKeysForId(entityType, idProp, id);
          for (var k in keys) {
            return cache[k].data[keys[k]];
          }
        };

        this.getCount = function () {
          return entityCount;
        };

        this.add = function (entity) {
          var k = findByProp(idProp, entity[idProp]);
          if (entities[k]) {
            throw new Exception('Cannot add entity of type ' + type + ' that already exists.');
          }

          if (vsite) {
            entity.vsite = vsite;
          }

          if (config[entityType]) {
            for (var k in config[entityType].fields) {
              params[k] = config[entityType].fields[k];
            }
          }

          // rest API call to add entity to server
          return $http.post(restPath + '/' + entityType, entity)
            .success(function (resp) {
              var entity = resp.data[0];

              weSaved[entity[idProp]] = entity.changed;
              addToCaches(entityType, idProp, entity);

              if (typeof ents[entity[idProp]] == 'undefined') {
                $rootScope.$broadcast(eventName + '.add', entity);
              }
              // this file already existed on the server
              else {
                $rootScope.$broadcast(eventName + '.update', entity);
              }
              ents[entity[idProp]] = entity;
            })
        };

        this.edit = function (entity, ignore) {
          if (!entity[idProp]) {
            this.add(entity);
            return;
          }
          ignore = ignore || [];
          ignore.push(idProp);

          var keys = getCacheKeysForEntity(type, idProp, entity),
            data = {};
          for (var k in keys) {
            data = getDiff(cache[k].data[keys[k]], entity, ignore);
            break;
          }
          var url = [restPath, entityType, entity[idProp]];

          if (data.length) {
            delete data.length;

            var config = {
              headers: {}
            };

            var updated = 0;
            if (weSaved[entity[idProp]] == undefined) {

              for (var k in keys) {
                updated = Math.max(updated, cache[k].lastUpdated);
              }
            }
            else {
              updated = weSaved[entity[idProp]];
            }
            config.headers['If-Unmodified-Since'] = (new Date(updated*1000)).toString().replace(/ \([^)]*\)/, '');

            return $http.patch(url.join('/'), data, config)
              .success(function (resp) {
                var entity = resp.data[0],
                  k = findByProp(idProp, entity[idProp]);
                ents[k] = entity;

                weSaved[entity[idProp]] = entity.changed;
                $rootScope.$broadcast(eventName + '.update', angular.copy(entity));
                var keys = getCacheKeysForEntity(type, idProp, entity);
                for (var k in keys) {
                  cache[k].data[keys[k]] = entity;
                  saveCache(k);
                }
              })
              .then(angular.noOp, function (resp) {
                switch (resp.status) {
                  case 409:
                    console.log('conflict');
                    ECU.update(entityType);
                    break;
                  case 410:
                    console.log('resource gone');
                    ECU.update(entityType);
                }
                return $q.reject(resp);
              });
          }
          else {
            var defer = $q.defer();
            defer.resolve({detail: "No data sent with request."});
            return defer.promise;
          }
        };

        this.delete = function (entity) {

          var config = {
            headers: {}
          };

          var keys = getCacheKeysForEntity(type, idProp, entity);
          var updated = 0;
          if (weSaved[entity[idProp]] == undefined) {

            for (var k in keys) {
              updated = Math.max(updated, cache[k].lastUpdated);
            }
          }
          else {
            updated = weSaved[entity[idProp]];
          }
          config.headers['If-Unmodified-Since'] = (new Date(updated*1000)).toString().replace(/ \([^)]*\)/, '');

          //rest API call to delete entity from server
          return $http.delete(restPath+'/'+entityType+'/'+entity[idProp], config).success(function (resp) {
            var k = findByProp(idProp, entity[idProp]);
            delete ents[k];

            $rootScope.$broadcast(eventName+'.delete', entity[idProp]);
            var keys = getCacheKeysForEntity(type, idProp, entity);
            for (var k in keys) {
              cache[k].data.splice(keys[k], 1);
              saveCache(k);
            }
          });
        }

        // registers an entity with this service
        // used for entities that are added outside of this service
        this.register = function (entity) {
          entity = angular.copy(entity);
          ents[entity[idProp]] = entity;

          weSaved[entity[idProp]] = entity.changed;
          addToCaches(entityType, idProp, entity);
        };
      }

      function getDiff(oEntity, nEntity, ignore) {
        var diff = {},
          numProps = 0;

        // Skip the property "$$hashKey" that's been generated by angular core
        // code - It's not relevant data thus should be skipped.
        ignore.push('$$hashKey');

        for (var k in oEntity) {
          if (ignore.indexOf(k) == -1 && !compareProps(oEntity[k], nEntity[k])) {
            diff[k] = nEntity[k];
            numProps++;
          }
        }
        diff.length = numProps;

        return diff;
      }

      function saveCache(key) {
        $idb.openStore('entities', function (store) {
          cache[key].matches = cache[key].matches.toString();
          store.upsert(cache[key]);
          cache[key].matches = eval('(' + cache[key].matches + ')');
        });
      }

      /**
       * Add an entity to all caches it matches
       */
      function addToCaches(type, idProp, entity) {
        var keys = getCacheKeysForEntity(type, idProp, entity);

        for (var k in cache) {
          if (keys[k] != undefined) {
            cache[k].data[keys[k]] = entity;
            continue;
          }

          if (cache[k].matches(entity, type)) {
            cache[k].data.push(entity);
            saveCache(k);
          }
        }
      }

      return factory;
    }])
  .run(['EntityCacheUpdater', '$q', '$indexedDB', function (ECU, $q, $idb) {
      var entityTypes = {},
        lock = $q.defer();
      lockPromise = lock.promise;

      $idb.openStore('entities', function (store) {
        var results;
        // if we're in a vsite, only get a subset of the entityservice
        // we really don't need to loop through everything
        if (Drupal.settings.spaces && Drupal.settings.spaces.id) {
          var query = store.query()
              .$index('vsite')
              .$eq(Drupal.settings.spaces.id);

          results = store.eachWhere(query);
        }
        else {
          results = store.getAll();
        }
        results.then (function (caches) {
          var keys = {};
          for (var i = 0; i < caches.length; i++) {
            var key = caches[i].key,
              type = caches[i].entityType;
            keys[key] = key;
            cache[key] = caches[i];
            cache[key].matches = eval('(' + cache[key].matches + ')');
            if (!defers[key]) {
              defers[key] = $q.defer();
            }
            entityTypes[type] = true;
          }

          var promises = [];
          for (var t in entityTypes) {
            promises = promises.concat(ECU.update(t));
          }

          $q.all(promises).then(function (args) {
            var keys = args;
            while (Array.isArray(keys[0])) {
              var t = [];
              keys = keys.concat.apply(t, keys);
            }
            console.log(keys);

            lock.resolve(keys);
          });

        }, function (error) {
          console.log(error);
          lock.resolve([]);
          return error;
        });
      }).then(angular.noOp, function (results) {  // openStore returns a promise. We can call .then() on it to attach handlers
        console.log(results);
        if (results.indexOf('Operation pending') != -1) {
          alert('There is a problem accessing your site\'s data. Please restart your browser.');
        }
        else {
          indexedDB.deleteDatabase("EntityService");
        }
        lock.resolve([]);
        return results;
      });

      window.EntityServiceDebug = {
        setTimestamps: function (newTimestamp) {
          $idb.openStore('entities', function (store) {
            store.getAll().then(function (caches) {
              var counter = 0;
              for (var i = 0; i < caches.length; i++) {
                caches[i].lastUpdated = newTimestamp;
                store.upsert(caches[i]).then(function (e) {
                  console.log((++counter) + " of " + caches.length + " caches completed.");
                });
              }
            });
          });
        },
        delete: function () {
          var r = indexedDB.deleteDatabase("EntityService");
          r.onerror = r.onsuccess = function (e) {
            console.log(e);
          }
        }
      };
    }])
    .config(['$indexedDBProvider', function ($idbp) {
      $idbp
        .connection('EntityService')
        .upgradeDatabase(2, function (event, db, tx) {
           var store = db.createObjectStore('entities', { keyPath: "key" });
           store.createIndex('key_idx', 'key', {unique: true});
        })
        .upgradeDatabase(3, function (event, db, tx) {
            var store = tx.objectStore('entities');
            store.createIndex('vsite', 'vsite', { unique: false });
        })
        .upgradeDatabase(4, function (event, db, tx) {
          var store = tx.objectStore('entities');
          store.deleteIndex('vsite');
          store.createIndex('vsite', 'params.vsite', { unique: false });
        });
    }])
  .service('EntityCacheUpdater', ['$http', '$q', '$indexedDB', '$rootScope', 'EntityConfig', function ($http, $q, $idb, $rs, EntityConfig) {
      var urlBase = restPath + '/:type/updates/:time';

      function update(updateType) {
        var keys = {},
          timestamps = {};
        for (var key in cache) {
          var type = cache[key].entityType;
          if (updateType == undefined) {
            keys[type] = keys[type] || [];
            keys[type].push(key);
          }
          else if (updateType == type) {
            keys[type] = keys[type] || [];
            keys[type].push(key);
          }
          timestamps[type] = timestamps[type] || cache[key].lastUpdated;
        }
        var promises = [];
        for (var t in keys) {
          promises.push(fetchUpdates(t, keys[t], timestamps[t]));
        }
        return $q.all(promises);
      }

      function fetchUpdates(type, keys, timestamp, nextUrl) {
        if (Drupal.settings.spaces == undefined) {
          // We are not in a vsite context so we need to return early.
          return;
        }

        var url;
        if (nextUrl == undefined) {
          url = urlBase.replace(':type', type).replace(':time', timestamp)
        }
        else {
          url = nextUrl;
        }

        if (Drupal.settings.spaces && Drupal.settings.spaces.id) {
          if (url.indexOf('?') == -1) {
            url += '?vsite=' + Drupal.settings.spaces.id;
          }
          else {
            url += '&vsite=' + Drupal.settings.spaces.id;
          }
        }

        if (EntityConfig[type]) {
          if (type == 'files' && EntityConfig[type].fields.private == 'only') {
            if (url.indexOf('?') == -1) {
              url += '?private=' + EntityConfig[type].fields.private;
            }
            else {
              url += '&private=' + EntityConfig[type].fields.private;
            }
          }
        }

        var defer = $q.defer();

        $http.get(url).then(function (resp) {
          var isUpdates = typeof resp.data.updatesAsOf != 'undefined';
          for (var i = 0; i < keys.length; i++) {
            if (nextUrl == undefined) {
              if (resp.data.allEntitiesAsOf) {
                cache[keys[i]].data = [];
                cache[keys[i]].lastUpdated = resp.data.allEntitiesAsOf;
              }
              else if (resp.data.updatesAsOf) {
                cache[keys[i]].lastUpdated = resp.data.updatesAsOf;
              }
            }
          }

          for (var i = 0; i < resp.data.data.length; i++) {
            // get all caches this entity exists in
            var cacheKeys = getCacheKeysForEntity(type, cache[keys[0]].idProperty, resp.data.data[i])
            // handle this entity for all caches it exists in
            for (var k in cacheKeys) {
              if (resp.data.data[i].status == 'deleted') {
                cache[k].data.splice(cacheKeys[k], 1);
              }
              else {
                cache[k].data.splice(cacheKeys[k], 1, resp.data.data[i]);
              }
            }
            if (resp.data.data[i].status != 'deleted') {
              // add new entities to the caches
              for (var k in cache) {
                if (cacheKeys[k] == undefined && cache[k].matches(resp.data.data[i], type)) {
                  cache[k].data.push(resp.data.data[i]);
                }
              }
            }
          }

          if (resp.data.next) {
            var next = resp.data.next.href,
              max = Math.ceil(resp.count/resp.data.data.length),
              curr = next.match(/page=([\d]+)/)[1];
            for (var i = 0; i < keys.length; i++) {
              var k = keys[i];
              defers[k].notify(("Loading updates: $p% complete.").replace('$p', Math.round(((curr - 1) / max) * 100)));
            }
            fetchUpdates(type, keys, timestamp, next).then(function (keys) {
              defer.resolve(keys);
            });
          }
          else {
            // construct 'everything' key
            var k = {};
            if (Drupal.settings.spaces.id) {
              k.vsite = Drupal.settings.spaces.id;
            }
            for (var p in EntityConfig[type]) {
              k[p] = EntityConfig[type][p];
            }

            k = type + ":" + JSON.stringify(k);
            var serverCount = resp.data.totalEntities || resp.data.count;
            // check the count against what the server reported. If it's wrong, we need to fetch everything from scratch
            if (cache[k] && serverCount != cache[k].data.length) {
              // wipe db
              for (var i = 0; i < keys.length; i++) {
                var key = keys[i];
                cache[key].data = [];
              }
              defer.resolve([]);
            }
            else {
              defer.resolve(keys);

              // we're good, so let's update the cache with what we had.
              for (var i = 0; i < keys.length; i++) {
                var key = keys[i];
                defers[key].resolve(angular.copy(cache[key].data));
                $rs.$broadcast('EntityCacheUpdater.cacheUpdated');
                $idb.openStore('entities', function (store) {
                  cache[key].matches = cache[key].matches.toString();
                  store.upsert(cache[key]);
                  cache[key].matches = eval('(' + cache[key].matches + ')');
                });
              }
            }
          }
        }, function (response) {
          // there was an error. Probably an access thing
          for (var i = 0; i < keys.length; i++) {
            defers[keys[i]].resolve(angular.copy(cache[keys[i]].data));
          }
        });

        return defer.promise;
      }

      this.update = update;
    }]);

  /**
   * Test entity fetched with a set of params to see if it matches a cache
   *
   * Proper usage:
   *  this function should use the cache object as it's 'this', by using the call() method.
   *  Ex. testEntity.call(this, entity, params);
   */
  function testEntity(entity) {
    // params is the search query we return
    var params = this.params,
      type = this.entityType;

    // if this cache isn't for private files, and the entity is private, drop it.
    //if (!params.private && entity.schema == 'private') {
    //  return false;
    //}

    for (var k in params) {
      if ((k == 'entity_type' || k == 'bundle') && typeof entity.bundles == 'object') {
        // this thing refers to other entities, like vocabs do. It can accept multiple types of entity type / file combinations

        if (entity.bundles[params.entity_type]) {
          var found = false;
          for (var l in entity.bundles[params.entity_type]) {
            if ( entity.bundles[params.entity_type][l] == params.bundle) {
              found = true;
              break;
            }
          }
          if (!found) {
            return false;
          }
        }
        else {
          // this does not accept the entity type we are looking for
          return false;
        }
      }
      // allow for a property on the entity to be a container that we only need to match one of to pass
      else if (entity[k] instanceof Object && (typeof params[k] == 'string' || typeof params[k] == 'number')) {
        var found = false;
        for (var l in entity[k]) {
          if (entity[k][l] == params[k]) {
            found = true;
            break;
          }
        }
        if (!found) {
          return false;
        }
      }
      else if (entity[k] == undefined) {
        // this is not something that comes returned on the object
        // try other things
        switch (k) {
          case 'vsite':
            if (params[k] != Drupal.settings.spaces.id) {
              return false;
            }
            break;
          case 'private': {
            if (params[k] == 'only' && entity.schema != 'private') {
              return false;
            }
          }
        }
      }
      else if (entity[k] != params[k]) {
        return false;
      }
    }
    return true;
  }

  /**
   * Collect the keys an entity exists in for every cache available
   * TODO: Generate comparator functions on cache creation to test whether entities fit in cache or not
   *
   * @param type - entity type we're searching for
   * @param entity - The entity we're looking for in the caches
   */
  function getCacheKeysForEntity(type, idProp, entity) {
    var keys = {};
    for (var k in cache) {
      // Wrong type.
      if (k.indexOf(type) == -1) {
        continue;
      }

      // TODO: Replace this for loop with comparator function invocation. Should be much faster once those work.
      for (var i = 0; i < cache[k].data.length; i++) {
        if (cache[k].data[i][idProp] == entity[idProp]) {
          keys[k] = i;
          break;
        }
      }
    }
    return keys;
  }

  /**
   * Collect the keys an id exists in for every cache available
   */
  function getCacheKeysForId(type, idProp, id) {
    var keys = {};
    for (var k in cache) {
      // Wrong type.
      if (k.indexOf(type) == -1) {
        continue;
      }

      for (var i = 0; i < cache[k].data.length; i++) {
        if (cache[k].data[i][idProp] == id) {
          keys[k] = i;
          break;
        }
      }
    }
    return keys;
  }

  /*
   * Buncha helper functions for getting comparisons
   */

  /**
   * Compares two properties by value.
   * If property is an array or object, recurses into them.
   * @param prop1
   * @param prop2
   * @returns {boolean}
   */
  function compareProps(prop1, prop2) {
    if (typeof prop1 == 'object') {
      if (prop1 instanceof Array && prop2 instanceof Array) {
        return arrayEquals(prop1, prop2);
      }
      else if (prop1 == null && prop2 == null) {
        return true;
      }
      // rest apis return 'null' instead of an empty array
      // some widgets convert that into an empty array, and thus we need to check here
      else if (prop1 == null && prop2 instanceof Array && prop2.length == 0) {
        return true;
      }
      else if (prop2 == null && prop1 instanceof Array && prop1.length == 0) {
        return true;
      }
      // if neither property is an array, return false as usual
      else if (prop1 == null || prop2 == null) {
        return false;
      }
      else {
        return objectEquals(prop1, prop2);
      }
    }
    else if (typeof(prop1) == typeof(prop2)) {
      return prop1 == prop2;
    }
    // if one property is undefined, its usually a meta property the client uses
    // it shouldn't be used at all
    else if (typeof(prop1) == 'undefined' || typeof(prop2) == 'undefined') {
      return true;
    }
    else {
      return prop1.toString() == prop2.toString();
    }
  }

  /**
   * Recursively compares 2 arrays by value
   * @param arr1
   * @param arr2
   * @returns {boolean}
   */
  function arrayEquals(arr1, arr2) {
    if (arr1.length != arr2.length) {
      return false;
    }
    else {
      var diff = false;
      for (var i = 0; i < arr1.length; i++) {
        diff = diff || compareProps(arr1[i], arr2[i]);
      }

      return diff;
    }
  }

  /**
   * Recursively compares 2 objects by value
   * @param obj1
   * @param obj2
   * @returns {boolean}
   */
  function objectEquals(obj1, obj2) {
    var keys1 = objectKeys(obj1),
      keys2 = objectKeys(obj2),
      diff = false;

    if (arrayEquals(keys1, keys2)) {
      for (var k in obj1) {
        diff = diff || compareProps(obj1[k], obj2[k]);
      }

      return diff;
    }
    // objects have different keys
    return false;
  }

  /**
   * Returns an array of all keys on the object
   * @param obj
   * @returns {Array}
   */
  function objectKeys(obj) {
    var keys = [];
    for (var k in obj) {
      keys.push(k);
    }
    return keys;
  }
})();
;
/**
 * @file
 * Attaches the behaviors for the Overlay parent pages.
 */

(function ($) {

/**
 * Open the overlay, or load content into it, when an admin link is clicked.
 */
Drupal.behaviors.overlayParent = {
  attach: function (context, settings) {
    if (Drupal.overlay.isOpen) {
      Drupal.overlay.makeDocumentUntabbable(context);
    }

    if (this.processed) {
      return;
    }
    this.processed = true;

    $(window)
      // When the hash (URL fragment) changes, open the overlay if needed.
      .bind('hashchange.drupal-overlay', $.proxy(Drupal.overlay, 'eventhandlerOperateByURLFragment'))
      // Trigger the hashchange handler once, after the page is loaded, so that
      // permalinks open the overlay.
      .triggerHandler('hashchange.drupal-overlay');

    $(document)
      // Instead of binding a click event handler to every link we bind one to
      // the document and only handle events that bubble up. This allows other
      // scripts to bind their own handlers to links and also to prevent
      // overlay's handling.
      .bind('click.drupal-overlay mouseup.drupal-overlay', $.proxy(Drupal.overlay, 'eventhandlerOverrideLink'));
  }
};

/**
 * Overlay object for parent windows.
 *
 * Events
 * Overlay triggers a number of events that can be used by other scripts.
 * - drupalOverlayOpen: This event is triggered when the overlay is opened.
 * - drupalOverlayBeforeClose: This event is triggered when the overlay attempts
 *   to close. If an event handler returns false, the close will be prevented.
 * - drupalOverlayClose: This event is triggered when the overlay is closed.
 * - drupalOverlayBeforeLoad: This event is triggered right before a new URL
 *   is loaded into the overlay.
 * - drupalOverlayReady: This event is triggered when the DOM of the overlay
 *   child document is fully loaded.
 * - drupalOverlayLoad: This event is triggered when the overlay is finished
 *   loading.
 * - drupalOverlayResize: This event is triggered when the overlay is being
 *   resized to match the parent window.
 */
Drupal.overlay = Drupal.overlay || {
  isOpen: false,
  isOpening: false,
  isClosing: false,
  isLoading: false
};

Drupal.overlay.prototype = {};

/**
 * Open the overlay.
 *
 * @param url
 *   The URL of the page to open in the overlay.
 *
 * @return
 *   TRUE if the overlay was opened, FALSE otherwise.
 */
Drupal.overlay.open = function (url) {
  // Just one overlay is allowed.
  if (this.isOpen || this.isOpening) {
    return this.load(url);
  }
  this.isOpening = true;
  // Store the original document title.
  this.originalTitle = document.title;

  // Create the dialog and related DOM elements.
  this.create();

  this.isOpening = false;
  this.isOpen = true;
  $(document.documentElement).addClass('overlay-open');
  this.makeDocumentUntabbable();

  // Allow other scripts to respond to this event.
  $(document).trigger('drupalOverlayOpen');

  return this.load(url);
};

/**
 * Create the underlying markup and behaviors for the overlay.
 */
Drupal.overlay.create = function () {
  this.$container = $(Drupal.theme('overlayContainer'))
    .appendTo(document.body);

  // Overlay uses transparent iframes that cover the full parent window.
  // When the overlay is open the scrollbar of the parent window is hidden.
  // Because some browsers show a white iframe background for a short moment
  // while loading a page into an iframe, overlay uses two iframes. By loading
  // the page in a hidden (inactive) iframe the user doesn't see the white
  // background. When the page is loaded the active and inactive iframes
  // are switched.
  this.activeFrame = this.$iframeA = $(Drupal.theme('overlayElement'))
    .appendTo(this.$container);

  this.inactiveFrame = this.$iframeB = $(Drupal.theme('overlayElement'))
    .appendTo(this.$container);

  this.$iframeA.bind('load.drupal-overlay', { self: this.$iframeA[0], sibling: this.$iframeB }, $.proxy(this, 'loadChild'));
  this.$iframeB.bind('load.drupal-overlay', { self: this.$iframeB[0], sibling: this.$iframeA }, $.proxy(this, 'loadChild'));

  // Add a second class "drupal-overlay-open" to indicate these event handlers
  // should only be bound when the overlay is open.
  var eventClass = '.drupal-overlay.drupal-overlay-open';
  $(window)
    .bind('resize' + eventClass, $.proxy(this, 'eventhandlerOuterResize'));
  $(document)
    .bind('drupalOverlayLoad' + eventClass, $.proxy(this, 'eventhandlerOuterResize'))
    .bind('drupalOverlayReady' + eventClass +
          ' drupalOverlayClose' + eventClass, $.proxy(this, 'eventhandlerSyncURLFragment'))
    .bind('drupalOverlayClose' + eventClass, $.proxy(this, 'eventhandlerRefreshPage'))
    .bind('drupalOverlayBeforeClose' + eventClass +
          ' drupalOverlayBeforeLoad' + eventClass +
          ' drupalOverlayResize' + eventClass, $.proxy(this, 'eventhandlerDispatchEvent'));

  if ($('.overlay-displace-top, .overlay-displace-bottom').length) {
    $(document)
      .bind('drupalOverlayResize' + eventClass, $.proxy(this, 'eventhandlerAlterDisplacedElements'))
      .bind('drupalOverlayClose' + eventClass, $.proxy(this, 'eventhandlerRestoreDisplacedElements'));
  }
};

/**
 * Load the given URL into the overlay iframe.
 *
 * Use this method to change the URL being loaded in the overlay if it is
 * already open.
 *
 * @return
 *   TRUE if URL is loaded into the overlay, FALSE otherwise.
 */
Drupal.overlay.load = function (url) {
  if (!this.isOpen) {
    return false;
  }

  // Allow other scripts to respond to this event.
  $(document).trigger('drupalOverlayBeforeLoad');

  $(document.documentElement).addClass('overlay-loading');

  // The contentDocument property is not supported in IE until IE8.
  var iframeDocument = this.inactiveFrame[0].contentDocument || this.inactiveFrame[0].contentWindow.document;

  // location.replace doesn't create a history entry. location.href does.
  // In this case, we want location.replace, as we're creating the history
  // entry using URL fragments.
  iframeDocument.location.replace(url);

  return true;
};

/**
 * Close the overlay and remove markup related to it from the document.
 *
 * @return
 *   TRUE if the overlay was closed, FALSE otherwise.
 */
Drupal.overlay.close = function () {
  // Prevent double execution when close is requested more than once.
  if (!this.isOpen || this.isClosing) {
    return false;
  }

  // Allow other scripts to respond to this event.
  var event = $.Event('drupalOverlayBeforeClose');
  $(document).trigger(event);
  // If a handler returned false, the close will be prevented.
  if (event.isDefaultPrevented()) {
    return false;
  }

  this.isClosing = true;
  this.isOpen = false;
  $(document.documentElement).removeClass('overlay-open');
  // Restore the original document title.
  document.title = this.originalTitle;
  this.makeDocumentTabbable();

  // Allow other scripts to respond to this event.
  $(document).trigger('drupalOverlayClose');

  // When the iframe is still loading don't destroy it immediately but after
  // the content is loaded (see Drupal.overlay.loadChild).
  if (!this.isLoading) {
    this.destroy();
    this.isClosing = false;
  }
  return true;
};

/**
 * Destroy the overlay.
 */
Drupal.overlay.destroy = function () {
  $([document, window]).unbind('.drupal-overlay-open');
  this.$container.remove();

  this.$container = null;
  this.$iframeA = null;
  this.$iframeB = null;

  this.iframeWindow = null;
};

/**
 * Redirect the overlay parent window to the given URL.
 *
 * @param url
 *   Can be an absolute URL or a relative link to the domain root.
 */
Drupal.overlay.redirect = function (url) {
  // Create a native Link object, so we can use its object methods.
  var link = $(url.link(url)).get(0);

  // If the link is already open, force the hashchange event to simulate reload.
  if (window.location.href == link.href) {
    $(window).triggerHandler('hashchange.drupal-overlay');
  }

  window.location.href = link.href;
  return true;
};

/**
 * Bind the child window.
 *
 * Note that this function is fired earlier than Drupal.overlay.loadChild.
 */
Drupal.overlay.bindChild = function (iframeWindow, isClosing) {
  this.iframeWindow = iframeWindow;

  // We are done if the child window is closing.
  if (isClosing || this.isClosing || !this.isOpen) {
    return;
  }

  // Allow other scripts to respond to this event.
  $(document).trigger('drupalOverlayReady');
};

/**
 * Event handler: load event handler for the overlay iframe.
 *
 * @param event
 *   Event being triggered, with the following restrictions:
 *   - event.type: load
 *   - event.currentTarget: iframe
 */
Drupal.overlay.loadChild = function (event) {
  var iframe = event.data.self;
  var iframeDocument = iframe.contentDocument || iframe.contentWindow.document;
  var iframeWindow = iframeDocument.defaultView || iframeDocument.parentWindow;
  if (iframeWindow.location == 'about:blank') {
    return;
  }

  this.isLoading = false;
  $(document.documentElement).removeClass('overlay-loading');
  event.data.sibling.removeClass('overlay-active').attr({ 'tabindex': -1 });

  // Only continue when overlay is still open and not closing.
  if (this.isOpen && !this.isClosing) {
    // And child document is an actual overlayChild.
    if (iframeWindow.Drupal && iframeWindow.Drupal.overlayChild) {
      // Replace the document title with title of iframe.
      document.title = iframeWindow.document.title;

      this.activeFrame = $(iframe)
        .addClass('overlay-active')
        // Add a title attribute to the iframe for accessibility.
        .attr('title', Drupal.t('@title dialog', { '@title': iframeWindow.jQuery('#overlay-title').text() })).removeAttr('tabindex');
      this.inactiveFrame = event.data.sibling;

      // Load an empty document into the inactive iframe.
      (this.inactiveFrame[0].contentDocument || this.inactiveFrame[0].contentWindow.document).location.replace('about:blank');

      // Move the focus to just before the "skip to main content" link inside
      // the overlay.
      this.activeFrame.focus();
      var skipLink = iframeWindow.jQuery('a:first');
      Drupal.overlay.setFocusBefore(skipLink, iframeWindow.document);

      // Allow other scripts to respond to this event.
      $(document).trigger('drupalOverlayLoad');
    }
    else {
      window.location = iframeWindow.location.href.replace(/([?&]?)render=overlay&?/g, '$1').replace(/\?$/, '');
    }
  }
  else {
    this.destroy();
  }
};

/**
 * Creates a placeholder element to receive document focus.
 *
 * Setting the document focus to a link will make it visible, even if it's a
 * "skip to main content" link that should normally be visible only when the
 * user tabs to it. This function can be used to set the document focus to
 * just before such an invisible link.
 *
 * @param $element
 *   The jQuery element that should receive focus on the next tab press.
 * @param document
 *   The iframe window element to which the placeholder should be added. The
 *   placeholder element has to be created inside the same iframe as the element
 *   it precedes, to keep IE happy. (http://bugs.jquery.com/ticket/4059)
 */
Drupal.overlay.setFocusBefore = function ($element, document) {
  // Create an anchor inside the placeholder document.
  var placeholder = document.createElement('a');
  var $placeholder = $(placeholder).addClass('element-invisible').attr('href', '#');
  // Put the placeholder where it belongs, and set the document focus to it.
  $placeholder.insertBefore($element);
  $placeholder.focus();
  // Make the placeholder disappear as soon as it loses focus, so that it
  // doesn't appear in the tab order again.
  $placeholder.one('blur', function () {
    $(this).remove();
  });
};

/**
 * Check if the given link is in the administrative section of the site.
 *
 * @param url
 *   The URL to be tested.
 *
 * @return boolean
 *   TRUE if the URL represents an administrative link, FALSE otherwise.
 */
Drupal.overlay.isAdminLink = function (url) {
  if (!Drupal.urlIsLocal(url)) {
    return false;
  }

  var path = this.getPath(url);

  // Turn the list of administrative paths into a regular expression.
  if (!this.adminPathRegExp) {
    var prefix = '';
    if (Drupal.settings.overlay.pathPrefixes.length) {
      // Allow path prefixes used for language negatiation followed by slash,
      // and the empty string.
      prefix = '(' + Drupal.settings.overlay.pathPrefixes.join('/|') + '/|)';
    }
    var adminPaths = '^' + prefix + '(' + Drupal.settings.overlay.paths.admin.replace(/\s+/g, '|') + ')$';
    var nonAdminPaths = '^' + prefix + '(' + Drupal.settings.overlay.paths.non_admin.replace(/\s+/g, '|') + ')$';
    adminPaths = adminPaths.replace(/\*/g, '.*');
    nonAdminPaths = nonAdminPaths.replace(/\*/g, '.*');
    this.adminPathRegExp = new RegExp(adminPaths);
    this.nonAdminPathRegExp = new RegExp(nonAdminPaths);
  }

  return this.adminPathRegExp.exec(path) && !this.nonAdminPathRegExp.exec(path);
};

/**
 * Determine whether a link is external to the site.
 *
 * Deprecated. Use Drupal.urlIsLocal() instead.
 *
 * @param url
 *   The URL to be tested.
 *
 * @return boolean
 *   TRUE if the URL is external to the site, FALSE otherwise.
 */
Drupal.overlay.isExternalLink = function (url) {
  return !Drupal.urlIsLocal(url);
};

/**
 * Constructs an internal URL (relative to this site) from the provided path.
 *
 * For example, if the provided path is 'admin' and the site is installed at
 * http://example.com/drupal, this function will return '/drupal/admin'.
 *
 * @param path
 *   The internal path, without any leading slash.
 *
 * @return
 *   The internal URL derived from the provided path, or null if a valid
 *   internal path cannot be constructed (for example, if an attempt to create
 *   an external link is detected).
 */
Drupal.overlay.getInternalUrl = function (path) {
  var url = Drupal.settings.basePath + path;
  if (Drupal.urlIsLocal(url)) {
    return url;
  }
};

/**
 * Event handler: resizes overlay according to the size of the parent window.
 *
 * @param event
 *   Event being triggered, with the following restrictions:
 *   - event.type: any
 *   - event.currentTarget: any
 */
Drupal.overlay.eventhandlerOuterResize = function (event) {
  // Proceed only if the overlay still exists.
  if (!(this.isOpen || this.isOpening) || this.isClosing || !this.iframeWindow) {
    return;
  }

  // IE6 uses position:absolute instead of position:fixed.
  if (typeof document.body.style.maxHeight != 'string') {
    this.activeFrame.height($(window).height());
  }

  // Allow other scripts to respond to this event.
  $(document).trigger('drupalOverlayResize');
};

/**
 * Event handler: resizes displaced elements so they won't overlap the scrollbar
 * of overlay's iframe.
 *
 * @param event
 *   Event being triggered, with the following restrictions:
 *   - event.type: any
 *   - event.currentTarget: any
 */
Drupal.overlay.eventhandlerAlterDisplacedElements = function (event) {
  // Proceed only if the overlay still exists.
  if (!(this.isOpen || this.isOpening) || this.isClosing || !this.iframeWindow) {
    return;
  }

  $(this.iframeWindow.document.body).css({
    marginTop: Drupal.overlay.getDisplacement('top'),
    marginBottom: Drupal.overlay.getDisplacement('bottom')
  })
  // IE7 isn't reflowing the document immediately.
  // @todo This might be fixed in a cleaner way.
  .addClass('overlay-trigger-reflow').removeClass('overlay-trigger-reflow');

  var documentHeight = this.iframeWindow.document.body.clientHeight;
  var documentWidth = this.iframeWindow.document.body.clientWidth;
  // IE6 doesn't support maxWidth, use width instead.
  var maxWidthName = (typeof document.body.style.maxWidth == 'string') ? 'maxWidth' : 'width';

  if (Drupal.overlay.leftSidedScrollbarOffset === undefined && $(document.documentElement).attr('dir') === 'rtl') {
    // We can't use element.clientLeft to detect whether scrollbars are placed
    // on the left side of the element when direction is set to "rtl" as most
    // browsers dont't support it correctly.
    // http://www.gtalbot.org/BugzillaSection/DocumentAllDHTMLproperties.html
    // There seems to be absolutely no way to detect whether the scrollbar
    // is on the left side in Opera; always expect scrollbar to be on the left.
    if ($.browser.opera) {
      Drupal.overlay.leftSidedScrollbarOffset = document.documentElement.clientWidth - this.iframeWindow.document.documentElement.clientWidth + this.iframeWindow.document.documentElement.clientLeft;
    }
    else if (this.iframeWindow.document.documentElement.clientLeft) {
      Drupal.overlay.leftSidedScrollbarOffset = this.iframeWindow.document.documentElement.clientLeft;
    }
    else {
      var el1 = $('<div style="direction: rtl; overflow: scroll;"></div>').appendTo(document.body);
      var el2 = $('<div></div>').appendTo(el1);
      Drupal.overlay.leftSidedScrollbarOffset = parseInt(el2[0].offsetLeft - el1[0].offsetLeft);
      el1.remove();
    }
  }

  // Consider any element that should be visible above the overlay (such as
  // a toolbar).
  $('.overlay-displace-top, .overlay-displace-bottom').each(function () {
    var data = $(this).data();
    var maxWidth = documentWidth;
    // In IE, Shadow filter makes element to overlap the scrollbar with 1px.
    if (this.filters && this.filters.length && this.filters.item('DXImageTransform.Microsoft.Shadow')) {
      maxWidth -= 1;
    }

    if (Drupal.overlay.leftSidedScrollbarOffset) {
      $(this).css('left', Drupal.overlay.leftSidedScrollbarOffset);
    }

    // Prevent displaced elements overlapping window's scrollbar.
    var currentMaxWidth = parseInt($(this).css(maxWidthName));
    if ((data.drupalOverlay && data.drupalOverlay.maxWidth) || isNaN(currentMaxWidth) || currentMaxWidth > maxWidth || currentMaxWidth <= 0) {
      $(this).css(maxWidthName, maxWidth);
      (data.drupalOverlay = data.drupalOverlay || {}).maxWidth = true;
    }

    // Use a more rigorous approach if the displaced element still overlaps
    // window's scrollbar; clip the element on the right.
    var offset = $(this).offset();
    var offsetRight = offset.left + $(this).outerWidth();
    if ((data.drupalOverlay && data.drupalOverlay.clip) || offsetRight > maxWidth) {
      if (Drupal.overlay.leftSidedScrollbarOffset) {
        $(this).css('clip', 'rect(auto, auto, ' + (documentHeight - offset.top) + 'px, ' + (Drupal.overlay.leftSidedScrollbarOffset + 2) + 'px)');
      }
      else {
        $(this).css('clip', 'rect(auto, ' + (maxWidth - offset.left) + 'px, ' + (documentHeight - offset.top) + 'px, auto)');
      }
      (data.drupalOverlay = data.drupalOverlay || {}).clip = true;
    }
  });
};

/**
 * Event handler: restores size of displaced elements as they were before
 * overlay was opened.
 *
 * @param event
 *   Event being triggered, with the following restrictions:
 *   - event.type: any
 *   - event.currentTarget: any
 */
Drupal.overlay.eventhandlerRestoreDisplacedElements = function (event) {
  var $displacedElements = $('.overlay-displace-top, .overlay-displace-bottom');
  try {
    $displacedElements.css({ maxWidth: '', clip: '' });
  }
  // IE bug that doesn't allow unsetting style.clip (http://dev.jquery.com/ticket/6512).
  catch (err) {
    $displacedElements.attr('style', function (index, attr) {
      return attr.replace(/clip\s*:\s*rect\([^)]+\);?/i, '');
    });
  }
};

/**
 * Event handler: overrides href of administrative links to be opened in
 * the overlay.
 *
 * This click event handler should be bound to any document (for example the
 * overlay iframe) of which you want links to open in the overlay.
 *
 * @param event
 *   Event being triggered, with the following restrictions:
 *   - event.type: click, mouseup
 *   - event.currentTarget: document
 *
 * @see Drupal.overlayChild.behaviors.addClickHandler
 */
Drupal.overlay.eventhandlerOverrideLink = function (event) {
  // In some browsers the click event isn't fired for right-clicks. Use the
  // mouseup event for right-clicks and the click event for everything else.
  if ((event.type == 'click' && event.button == 2) || (event.type == 'mouseup' && event.button != 2)) {
    return;
  }

  var $target = $(event.target);

  // Only continue if clicked target (or one of its parents) is a link.
  if (!$target.is('a')) {
    $target = $target.closest('a');
    if (!$target.length) {
      return;
    }
  }

  // Never open links in the overlay that contain the overlay-exclude class.
  if ($target.hasClass('overlay-exclude')) {
    return;
  }

  // Close the overlay when the link contains the overlay-close class.
  if ($target.hasClass('overlay-close')) {
    // Clearing the overlay URL fragment will close the overlay.
    $.bbq.removeState('overlay');
    return;
  }

  var target = $target[0];
  var href = target.href;
  // Only handle links that have an href attribute and use the HTTP(S) protocol.
  if (href != undefined && href != '' && target.protocol.match(/^https?\:/)) {
    var anchor = href.replace(target.ownerDocument.location.href, '');
    // Skip anchor links.
    if (anchor.length == 0 || anchor.charAt(0) == '#') {
      return;
    }
    // Open admin links in the overlay.
    else if (this.isAdminLink(href)) {
      // If the link contains the overlay-restore class and the overlay-context
      // state is set, also update the parent window's location.
      var parentLocation = ($target.hasClass('overlay-restore') && typeof $.bbq.getState('overlay-context') == 'string')
        ? this.getInternalUrl($.bbq.getState('overlay-context'))
        : null;
      href = this.fragmentizeLink($target.get(0), parentLocation);
      // Only override default behavior when left-clicking and user is not
      // pressing the ALT, CTRL, META (Command key on the Macintosh keyboard)
      // or SHIFT key.
      if (event.button == 0 && !event.altKey && !event.ctrlKey && !event.metaKey && !event.shiftKey) {
        // Redirect to a fragmentized href. This will trigger a hashchange event.
        this.redirect(href);
        // Prevent default action and further propagation of the event.
        return false;
      }
      // Otherwise alter clicked link's href. This is being picked up by
      // the default action handler.
      else {
        $target
          // Restore link's href attribute on blur or next click.
          .one('blur mousedown', { target: target, href: target.href }, function (event) { $(event.data.target).attr('href', event.data.href); })
          .attr('href', href);
      }
    }
    // Non-admin links should close the overlay and open in the main window,
    // which is the default action for a link. We only need to handle them
    // if the overlay is open and the clicked link is inside the overlay iframe.
    else if (this.isOpen && target.ownerDocument === this.iframeWindow.document) {
      // Open external links in the immediate parent of the frame, unless the
      // link already has a different target.
      if (target.hostname != window.location.hostname) {
        if (!$target.attr('target')) {
          $target.attr('target', '_parent');
        }
      }
      else {
        // Add the overlay-context state to the link, so "overlay-restore" links
        // can restore the context.
        if ($target[0].hash) {
          // Leave links with an existing fragment alone. Adding an extra
          // parameter to a link like "node/1#section-1" breaks the link.
        }
        else {
          // For links with no existing fragment, add the overlay context.
          $target.attr('href', $.param.fragment(href, { 'overlay-context': this.getPath(window.location) + window.location.search }));
        }

        // When the link has a destination query parameter and that destination
        // is an admin link we need to fragmentize it. This will make it reopen
        // in the overlay.
        var params = $.deparam.querystring(href);
        if (params.destination && this.isAdminLink(params.destination)) {
          var fragmentizedDestination = $.param.fragment(this.getPath(window.location), { overlay: params.destination });
          $target.attr('href', $.param.querystring(href, { destination: fragmentizedDestination }));
        }

        // Make the link open in the immediate parent of the frame, unless the
        // link already has a different target.
        if (!$target.attr('target')) {
          $target.attr('target', '_parent');
        }
      }
    }
  }
};

/**
 * Event handler: opens or closes the overlay based on the current URL fragment.
 *
 * @param event
 *   Event being triggered, with the following restrictions:
 *   - event.type: hashchange
 *   - event.currentTarget: document
 */
Drupal.overlay.eventhandlerOperateByURLFragment = function (event) {
  // If we changed the hash to reflect an internal redirect in the overlay,
  // its location has already been changed, so don't do anything.
  if ($.data(window.location, window.location.href) === 'redirect') {
    $.data(window.location, window.location.href, null);
    return;
  }

  // Get the overlay URL from the current URL fragment.
  var internalUrl = null;
  var state = $.bbq.getState('overlay');
  if (state) {
    internalUrl = this.getInternalUrl(state);
  }
  if (internalUrl) {
    // Append render variable, so the server side can choose the right
    // rendering and add child frame code to the page if needed.
    var url = $.param.querystring(internalUrl, { render: 'overlay' });

    this.open(url);
    this.resetActiveClass(this.getPath(Drupal.settings.basePath + state));
  }
  // If there is no overlay URL in the fragment and the overlay is (still)
  // open, close the overlay.
  else if (this.isOpen && !this.isClosing) {
    this.close();
    this.resetActiveClass(this.getPath(window.location));
  }
};

/**
 * Event handler: makes sure the internal overlay URL is reflected in the parent
 * URL fragment.
 *
 * Normally the parent URL fragment determines the overlay location. However, if
 * the overlay redirects internally, the parent doesn't get informed, and the
 * parent URL fragment will be out of date. This is a sanity check to make
 * sure we're in the right place.
 *
 * The parent URL fragment is also not updated automatically when overlay's
 * open, close or load functions are used directly (instead of through
 * eventhandlerOperateByURLFragment).
 *
 * @param event
 *   Event being triggered, with the following restrictions:
 *   - event.type: drupalOverlayReady, drupalOverlayClose
 *   - event.currentTarget: document
 */
Drupal.overlay.eventhandlerSyncURLFragment = function (event) {
  if (this.isOpen) {
    var expected = $.bbq.getState('overlay');
    // This is just a sanity check, so we're comparing paths, not query strings.
    if (this.getPath(Drupal.settings.basePath + expected) != this.getPath(this.iframeWindow.document.location)) {
      // There may have been a redirect inside the child overlay window that the
      // parent wasn't aware of. Update the parent URL fragment appropriately.
      var newLocation = Drupal.overlay.fragmentizeLink(this.iframeWindow.document.location);
      // Set a 'redirect' flag on the new location so the hashchange event handler
      // knows not to change the overlay's content.
      $.data(window.location, newLocation, 'redirect');
      // Use location.replace() so we don't create an extra history entry.
      window.location.replace(newLocation);
    }
  }
  else {
    $.bbq.removeState('overlay');
  }
};

/**
 * Event handler: if the child window suggested that the parent refresh on
 * close, force a page refresh.
 *
 * @param event
 *   Event being triggered, with the following restrictions:
 *   - event.type: drupalOverlayClose
 *   - event.currentTarget: document
 */
Drupal.overlay.eventhandlerRefreshPage = function (event) {
  if (Drupal.overlay.refreshPage) {
    window.location.reload(true);
  }
};

/**
 * Event handler: dispatches events to the overlay document.
 *
 * @param event
 *   Event being triggered, with the following restrictions:
 *   - event.type: any
 *   - event.currentTarget: any
 */
Drupal.overlay.eventhandlerDispatchEvent = function (event) {
  if (this.iframeWindow && this.iframeWindow.document) {
    this.iframeWindow.jQuery(this.iframeWindow.document).trigger(event);
  }
};

/**
 * Make a regular admin link into a URL that will trigger the overlay to open.
 *
 * @param link
 *   A JavaScript Link object (i.e. an <a> element).
 * @param parentLocation
 *   (optional) URL to override the parent window's location with.
 *
 * @return
 *   A URL that will trigger the overlay (in the form
 *   /node/1#overlay=admin/config).
 */
Drupal.overlay.fragmentizeLink = function (link, parentLocation) {
  // Don't operate on links that are already overlay-ready.
  var params = $.deparam.fragment(link.href);
  if (params.overlay) {
    return link.href;
  }

  // Determine the link's original destination. Set ignorePathFromQueryString to
  // true to prevent transforming this link into a clean URL while clean URLs
  // may be disabled.
  var path = this.getPath(link, true);
  // Preserve existing query and fragment parameters in the URL, except for
  // "render=overlay" which is re-added in Drupal.overlay.eventhandlerOperateByURLFragment.
  var destination = path + link.search.replace(/&?render=overlay/, '').replace(/\?$/, '') + link.hash;

  // Assemble and return the overlay-ready link.
  return $.param.fragment(parentLocation || window.location.href, { overlay: destination });
};

/**
 * Refresh any regions of the page that are displayed outside the overlay.
 *
 * @param data
 *   An array of objects with information on the page regions to be refreshed.
 *   For each object, the key is a CSS class identifying the region to be
 *   refreshed, and the value represents the section of the Drupal $page array
 *   corresponding to this region.
 */
Drupal.overlay.refreshRegions = function (data) {
  $.each(data, function () {
    var region_info = this;
    $.each(region_info, function (regionClass) {
      var regionName = region_info[regionClass];
      var regionSelector = '.' + regionClass;
      // Allow special behaviors to detach.
      Drupal.detachBehaviors($(regionSelector));
      $.get(Drupal.settings.basePath + Drupal.settings.overlay.ajaxCallback + '/' + regionName, function (newElement) {
        $(regionSelector).replaceWith($(newElement));
        Drupal.attachBehaviors($(regionSelector), Drupal.settings);
      });
    });
  });
};

/**
 * Reset the active class on links in displaced elements according to
 * given path.
 *
 * @param activePath
 *   Path to match links against.
 */
Drupal.overlay.resetActiveClass = function(activePath) {
  var self = this;
  var windowDomain = window.location.protocol + window.location.hostname;

  $('.overlay-displace-top, .overlay-displace-bottom')
  .find('a[href]')
  // Remove active class from all links in displaced elements.
  .removeClass('active')
  // Add active class to links that match activePath.
  .each(function () {
    var linkDomain = this.protocol + this.hostname;
    var linkPath = self.getPath(this);

    // A link matches if it is part of the active trail of activePath, except
    // for frontpage links.
    if (linkDomain == windowDomain && (activePath + '/').indexOf(linkPath + '/') === 0 && (linkPath !== '' || activePath === '')) {
      $(this).addClass('active');
    }
  });
};

/**
 * Helper function to get the (corrected) Drupal path of a link.
 *
 * @param link
 *   Link object or string to get the Drupal path from.
 * @param ignorePathFromQueryString
 *   Boolean whether to ignore path from query string if path appears empty.
 *
 * @return
 *   The Drupal path.
 */
Drupal.overlay.getPath = function (link, ignorePathFromQueryString) {
  if (typeof link == 'string') {
    // Create a native Link object, so we can use its object methods.
    link = $(link.link(link)).get(0);
  }

  var path = link.pathname;
  // Ensure a leading slash on the path, omitted in some browsers.
  if (path.charAt(0) != '/') {
    path = '/' + path;
  }
  path = path.replace(new RegExp(Drupal.settings.basePath + '(?:index.php)?'), '');
  if (path == '' && !ignorePathFromQueryString) {
    // If the path appears empty, it might mean the path is represented in the
    // query string (clean URLs are not used).
    var match = new RegExp('([?&])q=(.+)([&#]|$)').exec(link.search);
    if (match && match.length == 4) {
      path = match[2];
    }
  }

  return path;
};

/**
 * Get the total displacement of given region.
 *
 * @param region
 *   Region name. Either "top" or "bottom".
 *
 * @return
 *   The total displacement of given region in pixels.
 */
Drupal.overlay.getDisplacement = function (region) {
  var displacement = 0;
  var lastDisplaced = $('.overlay-displace-' + region + ':last');
  if (lastDisplaced.length) {
    displacement = lastDisplaced.offset().top + lastDisplaced.outerHeight();

    // In modern browsers (including IE9), when box-shadow is defined, use the
    // normal height.
    var cssBoxShadowValue = lastDisplaced.css('box-shadow');
    var boxShadow = (typeof cssBoxShadowValue !== 'undefined' && cssBoxShadowValue !== 'none');
    // In IE8 and below, we use the shadow filter to apply box-shadow styles to
    // the toolbar. It adds some extra height that we need to remove.
    if (!boxShadow && /DXImageTransform\.Microsoft\.Shadow/.test(lastDisplaced.css('filter'))) {
      displacement -= lastDisplaced[0].filters.item('DXImageTransform.Microsoft.Shadow').strength;
      displacement = Math.max(0, displacement);
    }
  }
  return displacement;
};

/**
 * Makes elements outside the overlay unreachable via the tab key.
 *
 * @param context
 *   The part of the DOM that should have its tabindexes changed. Defaults to
 *   the entire page.
 */
Drupal.overlay.makeDocumentUntabbable = function (context) {
  // Manipulating tabindexes for the entire document is unacceptably slow in IE6
  // and IE7, so in those browsers, the underlying page will still be reachable
  // via the tab key. However, we still make the links within the Disable
  // message unreachable, because the same message also exists within the
  // child document. The duplicate copy in the underlying document is only for
  // assisting screen-reader users navigating the document with reading commands
  // that follow markup order rather than tab order.
  if (jQuery.browser.msie && parseInt(jQuery.browser.version, 10) < 8) {
    $('#overlay-disable-message a', context).attr('tabindex', -1);
    return;
  }

  context = context || document.body;
  var $overlay, $tabbable, $hasTabindex;

  // Determine which elements on the page already have a tabindex.
  $hasTabindex = $('[tabindex] :not(.overlay-element)', context);
  // Record the tabindex for each element, so we can restore it later.
  $hasTabindex.each(Drupal.overlay._recordTabindex);
  // Add the tabbable elements from the current context to any that we might
  // have previously recorded.
  Drupal.overlay._hasTabindex = $hasTabindex.add(Drupal.overlay._hasTabindex);

  // Set tabindex to -1 on everything outside the overlay and toolbars, so that
  // the underlying page is unreachable.

  // By default, browsers make a, area, button, input, object, select, textarea,
  // and iframe elements reachable via the tab key.
  $tabbable = $('a, area, button, input, object, select, textarea, iframe');
  // If another element (like a div) has a tabindex, it's also tabbable.
  $tabbable = $tabbable.add($hasTabindex);
  // Leave links inside the overlay and toolbars alone.
  $overlay = $('.overlay-element, #overlay-container, .overlay-displace-top, .overlay-displace-bottom').find('*');
  $tabbable = $tabbable.not($overlay);
  // We now have a list of everything in the underlying document that could
  // possibly be reachable via the tab key. Make it all unreachable.
  $tabbable.attr('tabindex', -1);
};

/**
 * Restores the original tabindex value of a group of elements.
 *
 * @param context
 *   The part of the DOM that should have its tabindexes restored. Defaults to
 *   the entire page.
 */
Drupal.overlay.makeDocumentTabbable = function (context) {
  // Manipulating tabindexes is unacceptably slow in IE6 and IE7. In those
  // browsers, the underlying page was never made unreachable via tab, so
  // there is no work to be done here.
  if (jQuery.browser.msie && parseInt(jQuery.browser.version, 10) < 8) {
    return;
  }

  var $needsTabindex;
  context = context || document.body;

  // Make the underlying document tabbable again by removing all existing
  // tabindex attributes.
  var $tabindex = $('[tabindex]', context);
  if (jQuery.browser.msie && parseInt(jQuery.browser.version, 10) < 8) {
    // removeAttr('tabindex') is broken in IE6-7, but the DOM function
    // removeAttribute works.
    var i;
    var length = $tabindex.length;
    for (i = 0; i < length; i++) {
      $tabindex[i].removeAttribute('tabIndex');
    }
  }
  else {
    $tabindex.removeAttr('tabindex');
  }

  // Restore the tabindex attributes that existed before the overlay was opened.
  $needsTabindex = $(Drupal.overlay._hasTabindex, context);
  $needsTabindex.each(Drupal.overlay._restoreTabindex);
  Drupal.overlay._hasTabindex = Drupal.overlay._hasTabindex.not($needsTabindex);
};

/**
 * Record the tabindex for an element, using $.data.
 *
 * Meant to be used as a jQuery.fn.each callback.
 */
Drupal.overlay._recordTabindex = function () {
  var $element = $(this);
  var tabindex = $(this).attr('tabindex');
  $element.data('drupalOverlayOriginalTabIndex', tabindex);
};

/**
 * Restore an element's original tabindex.
 *
 * Meant to be used as a jQuery.fn.each callback.
 */
Drupal.overlay._restoreTabindex = function () {
  var $element = $(this);
  var tabindex = $element.data('drupalOverlayOriginalTabIndex');
  $element.attr('tabindex', tabindex);
};

/**
 * Theme function to create the overlay iframe element.
 */
Drupal.theme.prototype.overlayContainer = function () {
  return '<div id="overlay-container"><div class="overlay-modal-background"></div></div>';
};

/**
 * Theme function to create an overlay iframe element.
 */
Drupal.theme.prototype.overlayElement = function (url) {
  return '<iframe class="overlay-element" frameborder="0" scrolling="auto" allowtransparency="true"></iframe>';
};

})(jQuery);
;
/*
Copyright 2012 Igor Vaynberg

Version: 3.4.3 Timestamp: Tue Sep 17 06:47:14 PDT 2013

This software is licensed under the Apache License, Version 2.0 (the "Apache License") or the GNU
General Public License version 2 (the "GPL License"). You may choose either license to govern your
use of this software only upon the condition that you accept all of the terms of either the Apache
License or the GPL License.

You may obtain a copy of the Apache License and the GPL License at:

    http://www.apache.org/licenses/LICENSE-2.0
    http://www.gnu.org/licenses/gpl-2.0.html

Unless required by applicable law or agreed to in writing, software distributed under the
Apache License or the GPL Licesnse is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR
CONDITIONS OF ANY KIND, either express or implied. See the Apache License and the GPL License for
the specific language governing permissions and limitations under the Apache License and the GPL License.
*/
(function ($) {
    if(typeof $.fn.each2 == "undefined") {
        $.extend($.fn, {
            /*
            * 4-10 times faster .each replacement
            * use it carefully, as it overrides jQuery context of element on each iteration
            */
            each2 : function (c) {
                var j = $([0]), i = -1, l = this.length;
                while (
                    ++i < l
                    && (j.context = j[0] = this[i])
                    && c.call(j[0], i, j) !== false //"this"=DOM, i=index, j=jQuery object
                );
                return this;
            }
        });
    }
})(jQuery);

(function ($, undefined) {
    "use strict";
    /*global document, window, jQuery, console */

    if (window.Select2 !== undefined) {
        return;
    }

    var KEY, AbstractSelect2, SingleSelect2, MultiSelect2, nextUid, sizer,
        lastMousePosition={x:0,y:0}, $document, scrollBarDimensions,

    KEY = {
        TAB: 9,
        ENTER: 13,
        ESC: 27,
        SPACE: 32,
        LEFT: 37,
        UP: 38,
        RIGHT: 39,
        DOWN: 40,
        SHIFT: 16,
        CTRL: 17,
        ALT: 18,
        PAGE_UP: 33,
        PAGE_DOWN: 34,
        HOME: 36,
        END: 35,
        BACKSPACE: 8,
        DELETE: 46,
        isArrow: function (k) {
            k = k.which ? k.which : k;
            switch (k) {
            case KEY.LEFT:
            case KEY.RIGHT:
            case KEY.UP:
            case KEY.DOWN:
                return true;
            }
            return false;
        },
        isControl: function (e) {
            var k = e.which;
            switch (k) {
            case KEY.SHIFT:
            case KEY.CTRL:
            case KEY.ALT:
                return true;
            }

            if (e.metaKey) return true;

            return false;
        },
        isFunctionKey: function (k) {
            k = k.which ? k.which : k;
            return k >= 112 && k <= 123;
        }
    },
    MEASURE_SCROLLBAR_TEMPLATE = "<div class='select2-measure-scrollbar'></div>",

    DIACRITICS = {"\u24B6":"A","\uFF21":"A","\u00C0":"A","\u00C1":"A","\u00C2":"A","\u1EA6":"A","\u1EA4":"A","\u1EAA":"A","\u1EA8":"A","\u00C3":"A","\u0100":"A","\u0102":"A","\u1EB0":"A","\u1EAE":"A","\u1EB4":"A","\u1EB2":"A","\u0226":"A","\u01E0":"A","\u00C4":"A","\u01DE":"A","\u1EA2":"A","\u00C5":"A","\u01FA":"A","\u01CD":"A","\u0200":"A","\u0202":"A","\u1EA0":"A","\u1EAC":"A","\u1EB6":"A","\u1E00":"A","\u0104":"A","\u023A":"A","\u2C6F":"A","\uA732":"AA","\u00C6":"AE","\u01FC":"AE","\u01E2":"AE","\uA734":"AO","\uA736":"AU","\uA738":"AV","\uA73A":"AV","\uA73C":"AY","\u24B7":"B","\uFF22":"B","\u1E02":"B","\u1E04":"B","\u1E06":"B","\u0243":"B","\u0182":"B","\u0181":"B","\u24B8":"C","\uFF23":"C","\u0106":"C","\u0108":"C","\u010A":"C","\u010C":"C","\u00C7":"C","\u1E08":"C","\u0187":"C","\u023B":"C","\uA73E":"C","\u24B9":"D","\uFF24":"D","\u1E0A":"D","\u010E":"D","\u1E0C":"D","\u1E10":"D","\u1E12":"D","\u1E0E":"D","\u0110":"D","\u018B":"D","\u018A":"D","\u0189":"D","\uA779":"D","\u01F1":"DZ","\u01C4":"DZ","\u01F2":"Dz","\u01C5":"Dz","\u24BA":"E","\uFF25":"E","\u00C8":"E","\u00C9":"E","\u00CA":"E","\u1EC0":"E","\u1EBE":"E","\u1EC4":"E","\u1EC2":"E","\u1EBC":"E","\u0112":"E","\u1E14":"E","\u1E16":"E","\u0114":"E","\u0116":"E","\u00CB":"E","\u1EBA":"E","\u011A":"E","\u0204":"E","\u0206":"E","\u1EB8":"E","\u1EC6":"E","\u0228":"E","\u1E1C":"E","\u0118":"E","\u1E18":"E","\u1E1A":"E","\u0190":"E","\u018E":"E","\u24BB":"F","\uFF26":"F","\u1E1E":"F","\u0191":"F","\uA77B":"F","\u24BC":"G","\uFF27":"G","\u01F4":"G","\u011C":"G","\u1E20":"G","\u011E":"G","\u0120":"G","\u01E6":"G","\u0122":"G","\u01E4":"G","\u0193":"G","\uA7A0":"G","\uA77D":"G","\uA77E":"G","\u24BD":"H","\uFF28":"H","\u0124":"H","\u1E22":"H","\u1E26":"H","\u021E":"H","\u1E24":"H","\u1E28":"H","\u1E2A":"H","\u0126":"H","\u2C67":"H","\u2C75":"H","\uA78D":"H","\u24BE":"I","\uFF29":"I","\u00CC":"I","\u00CD":"I","\u00CE":"I","\u0128":"I","\u012A":"I","\u012C":"I","\u0130":"I","\u00CF":"I","\u1E2E":"I","\u1EC8":"I","\u01CF":"I","\u0208":"I","\u020A":"I","\u1ECA":"I","\u012E":"I","\u1E2C":"I","\u0197":"I","\u24BF":"J","\uFF2A":"J","\u0134":"J","\u0248":"J","\u24C0":"K","\uFF2B":"K","\u1E30":"K","\u01E8":"K","\u1E32":"K","\u0136":"K","\u1E34":"K","\u0198":"K","\u2C69":"K","\uA740":"K","\uA742":"K","\uA744":"K","\uA7A2":"K","\u24C1":"L","\uFF2C":"L","\u013F":"L","\u0139":"L","\u013D":"L","\u1E36":"L","\u1E38":"L","\u013B":"L","\u1E3C":"L","\u1E3A":"L","\u0141":"L","\u023D":"L","\u2C62":"L","\u2C60":"L","\uA748":"L","\uA746":"L","\uA780":"L","\u01C7":"LJ","\u01C8":"Lj","\u24C2":"M","\uFF2D":"M","\u1E3E":"M","\u1E40":"M","\u1E42":"M","\u2C6E":"M","\u019C":"M","\u24C3":"N","\uFF2E":"N","\u01F8":"N","\u0143":"N","\u00D1":"N","\u1E44":"N","\u0147":"N","\u1E46":"N","\u0145":"N","\u1E4A":"N","\u1E48":"N","\u0220":"N","\u019D":"N","\uA790":"N","\uA7A4":"N","\u01CA":"NJ","\u01CB":"Nj","\u24C4":"O","\uFF2F":"O","\u00D2":"O","\u00D3":"O","\u00D4":"O","\u1ED2":"O","\u1ED0":"O","\u1ED6":"O","\u1ED4":"O","\u00D5":"O","\u1E4C":"O","\u022C":"O","\u1E4E":"O","\u014C":"O","\u1E50":"O","\u1E52":"O","\u014E":"O","\u022E":"O","\u0230":"O","\u00D6":"O","\u022A":"O","\u1ECE":"O","\u0150":"O","\u01D1":"O","\u020C":"O","\u020E":"O","\u01A0":"O","\u1EDC":"O","\u1EDA":"O","\u1EE0":"O","\u1EDE":"O","\u1EE2":"O","\u1ECC":"O","\u1ED8":"O","\u01EA":"O","\u01EC":"O","\u00D8":"O","\u01FE":"O","\u0186":"O","\u019F":"O","\uA74A":"O","\uA74C":"O","\u01A2":"OI","\uA74E":"OO","\u0222":"OU","\u24C5":"P","\uFF30":"P","\u1E54":"P","\u1E56":"P","\u01A4":"P","\u2C63":"P","\uA750":"P","\uA752":"P","\uA754":"P","\u24C6":"Q","\uFF31":"Q","\uA756":"Q","\uA758":"Q","\u024A":"Q","\u24C7":"R","\uFF32":"R","\u0154":"R","\u1E58":"R","\u0158":"R","\u0210":"R","\u0212":"R","\u1E5A":"R","\u1E5C":"R","\u0156":"R","\u1E5E":"R","\u024C":"R","\u2C64":"R","\uA75A":"R","\uA7A6":"R","\uA782":"R","\u24C8":"S","\uFF33":"S","\u1E9E":"S","\u015A":"S","\u1E64":"S","\u015C":"S","\u1E60":"S","\u0160":"S","\u1E66":"S","\u1E62":"S","\u1E68":"S","\u0218":"S","\u015E":"S","\u2C7E":"S","\uA7A8":"S","\uA784":"S","\u24C9":"T","\uFF34":"T","\u1E6A":"T","\u0164":"T","\u1E6C":"T","\u021A":"T","\u0162":"T","\u1E70":"T","\u1E6E":"T","\u0166":"T","\u01AC":"T","\u01AE":"T","\u023E":"T","\uA786":"T","\uA728":"TZ","\u24CA":"U","\uFF35":"U","\u00D9":"U","\u00DA":"U","\u00DB":"U","\u0168":"U","\u1E78":"U","\u016A":"U","\u1E7A":"U","\u016C":"U","\u00DC":"U","\u01DB":"U","\u01D7":"U","\u01D5":"U","\u01D9":"U","\u1EE6":"U","\u016E":"U","\u0170":"U","\u01D3":"U","\u0214":"U","\u0216":"U","\u01AF":"U","\u1EEA":"U","\u1EE8":"U","\u1EEE":"U","\u1EEC":"U","\u1EF0":"U","\u1EE4":"U","\u1E72":"U","\u0172":"U","\u1E76":"U","\u1E74":"U","\u0244":"U","\u24CB":"V","\uFF36":"V","\u1E7C":"V","\u1E7E":"V","\u01B2":"V","\uA75E":"V","\u0245":"V","\uA760":"VY","\u24CC":"W","\uFF37":"W","\u1E80":"W","\u1E82":"W","\u0174":"W","\u1E86":"W","\u1E84":"W","\u1E88":"W","\u2C72":"W","\u24CD":"X","\uFF38":"X","\u1E8A":"X","\u1E8C":"X","\u24CE":"Y","\uFF39":"Y","\u1EF2":"Y","\u00DD":"Y","\u0176":"Y","\u1EF8":"Y","\u0232":"Y","\u1E8E":"Y","\u0178":"Y","\u1EF6":"Y","\u1EF4":"Y","\u01B3":"Y","\u024E":"Y","\u1EFE":"Y","\u24CF":"Z","\uFF3A":"Z","\u0179":"Z","\u1E90":"Z","\u017B":"Z","\u017D":"Z","\u1E92":"Z","\u1E94":"Z","\u01B5":"Z","\u0224":"Z","\u2C7F":"Z","\u2C6B":"Z","\uA762":"Z","\u24D0":"a","\uFF41":"a","\u1E9A":"a","\u00E0":"a","\u00E1":"a","\u00E2":"a","\u1EA7":"a","\u1EA5":"a","\u1EAB":"a","\u1EA9":"a","\u00E3":"a","\u0101":"a","\u0103":"a","\u1EB1":"a","\u1EAF":"a","\u1EB5":"a","\u1EB3":"a","\u0227":"a","\u01E1":"a","\u00E4":"a","\u01DF":"a","\u1EA3":"a","\u00E5":"a","\u01FB":"a","\u01CE":"a","\u0201":"a","\u0203":"a","\u1EA1":"a","\u1EAD":"a","\u1EB7":"a","\u1E01":"a","\u0105":"a","\u2C65":"a","\u0250":"a","\uA733":"aa","\u00E6":"ae","\u01FD":"ae","\u01E3":"ae","\uA735":"ao","\uA737":"au","\uA739":"av","\uA73B":"av","\uA73D":"ay","\u24D1":"b","\uFF42":"b","\u1E03":"b","\u1E05":"b","\u1E07":"b","\u0180":"b","\u0183":"b","\u0253":"b","\u24D2":"c","\uFF43":"c","\u0107":"c","\u0109":"c","\u010B":"c","\u010D":"c","\u00E7":"c","\u1E09":"c","\u0188":"c","\u023C":"c","\uA73F":"c","\u2184":"c","\u24D3":"d","\uFF44":"d","\u1E0B":"d","\u010F":"d","\u1E0D":"d","\u1E11":"d","\u1E13":"d","\u1E0F":"d","\u0111":"d","\u018C":"d","\u0256":"d","\u0257":"d","\uA77A":"d","\u01F3":"dz","\u01C6":"dz","\u24D4":"e","\uFF45":"e","\u00E8":"e","\u00E9":"e","\u00EA":"e","\u1EC1":"e","\u1EBF":"e","\u1EC5":"e","\u1EC3":"e","\u1EBD":"e","\u0113":"e","\u1E15":"e","\u1E17":"e","\u0115":"e","\u0117":"e","\u00EB":"e","\u1EBB":"e","\u011B":"e","\u0205":"e","\u0207":"e","\u1EB9":"e","\u1EC7":"e","\u0229":"e","\u1E1D":"e","\u0119":"e","\u1E19":"e","\u1E1B":"e","\u0247":"e","\u025B":"e","\u01DD":"e","\u24D5":"f","\uFF46":"f","\u1E1F":"f","\u0192":"f","\uA77C":"f","\u24D6":"g","\uFF47":"g","\u01F5":"g","\u011D":"g","\u1E21":"g","\u011F":"g","\u0121":"g","\u01E7":"g","\u0123":"g","\u01E5":"g","\u0260":"g","\uA7A1":"g","\u1D79":"g","\uA77F":"g","\u24D7":"h","\uFF48":"h","\u0125":"h","\u1E23":"h","\u1E27":"h","\u021F":"h","\u1E25":"h","\u1E29":"h","\u1E2B":"h","\u1E96":"h","\u0127":"h","\u2C68":"h","\u2C76":"h","\u0265":"h","\u0195":"hv","\u24D8":"i","\uFF49":"i","\u00EC":"i","\u00ED":"i","\u00EE":"i","\u0129":"i","\u012B":"i","\u012D":"i","\u00EF":"i","\u1E2F":"i","\u1EC9":"i","\u01D0":"i","\u0209":"i","\u020B":"i","\u1ECB":"i","\u012F":"i","\u1E2D":"i","\u0268":"i","\u0131":"i","\u24D9":"j","\uFF4A":"j","\u0135":"j","\u01F0":"j","\u0249":"j","\u24DA":"k","\uFF4B":"k","\u1E31":"k","\u01E9":"k","\u1E33":"k","\u0137":"k","\u1E35":"k","\u0199":"k","\u2C6A":"k","\uA741":"k","\uA743":"k","\uA745":"k","\uA7A3":"k","\u24DB":"l","\uFF4C":"l","\u0140":"l","\u013A":"l","\u013E":"l","\u1E37":"l","\u1E39":"l","\u013C":"l","\u1E3D":"l","\u1E3B":"l","\u017F":"l","\u0142":"l","\u019A":"l","\u026B":"l","\u2C61":"l","\uA749":"l","\uA781":"l","\uA747":"l","\u01C9":"lj","\u24DC":"m","\uFF4D":"m","\u1E3F":"m","\u1E41":"m","\u1E43":"m","\u0271":"m","\u026F":"m","\u24DD":"n","\uFF4E":"n","\u01F9":"n","\u0144":"n","\u00F1":"n","\u1E45":"n","\u0148":"n","\u1E47":"n","\u0146":"n","\u1E4B":"n","\u1E49":"n","\u019E":"n","\u0272":"n","\u0149":"n","\uA791":"n","\uA7A5":"n","\u01CC":"nj","\u24DE":"o","\uFF4F":"o","\u00F2":"o","\u00F3":"o","\u00F4":"o","\u1ED3":"o","\u1ED1":"o","\u1ED7":"o","\u1ED5":"o","\u00F5":"o","\u1E4D":"o","\u022D":"o","\u1E4F":"o","\u014D":"o","\u1E51":"o","\u1E53":"o","\u014F":"o","\u022F":"o","\u0231":"o","\u00F6":"o","\u022B":"o","\u1ECF":"o","\u0151":"o","\u01D2":"o","\u020D":"o","\u020F":"o","\u01A1":"o","\u1EDD":"o","\u1EDB":"o","\u1EE1":"o","\u1EDF":"o","\u1EE3":"o","\u1ECD":"o","\u1ED9":"o","\u01EB":"o","\u01ED":"o","\u00F8":"o","\u01FF":"o","\u0254":"o","\uA74B":"o","\uA74D":"o","\u0275":"o","\u01A3":"oi","\u0223":"ou","\uA74F":"oo","\u24DF":"p","\uFF50":"p","\u1E55":"p","\u1E57":"p","\u01A5":"p","\u1D7D":"p","\uA751":"p","\uA753":"p","\uA755":"p","\u24E0":"q","\uFF51":"q","\u024B":"q","\uA757":"q","\uA759":"q","\u24E1":"r","\uFF52":"r","\u0155":"r","\u1E59":"r","\u0159":"r","\u0211":"r","\u0213":"r","\u1E5B":"r","\u1E5D":"r","\u0157":"r","\u1E5F":"r","\u024D":"r","\u027D":"r","\uA75B":"r","\uA7A7":"r","\uA783":"r","\u24E2":"s","\uFF53":"s","\u00DF":"s","\u015B":"s","\u1E65":"s","\u015D":"s","\u1E61":"s","\u0161":"s","\u1E67":"s","\u1E63":"s","\u1E69":"s","\u0219":"s","\u015F":"s","\u023F":"s","\uA7A9":"s","\uA785":"s","\u1E9B":"s","\u24E3":"t","\uFF54":"t","\u1E6B":"t","\u1E97":"t","\u0165":"t","\u1E6D":"t","\u021B":"t","\u0163":"t","\u1E71":"t","\u1E6F":"t","\u0167":"t","\u01AD":"t","\u0288":"t","\u2C66":"t","\uA787":"t","\uA729":"tz","\u24E4":"u","\uFF55":"u","\u00F9":"u","\u00FA":"u","\u00FB":"u","\u0169":"u","\u1E79":"u","\u016B":"u","\u1E7B":"u","\u016D":"u","\u00FC":"u","\u01DC":"u","\u01D8":"u","\u01D6":"u","\u01DA":"u","\u1EE7":"u","\u016F":"u","\u0171":"u","\u01D4":"u","\u0215":"u","\u0217":"u","\u01B0":"u","\u1EEB":"u","\u1EE9":"u","\u1EEF":"u","\u1EED":"u","\u1EF1":"u","\u1EE5":"u","\u1E73":"u","\u0173":"u","\u1E77":"u","\u1E75":"u","\u0289":"u","\u24E5":"v","\uFF56":"v","\u1E7D":"v","\u1E7F":"v","\u028B":"v","\uA75F":"v","\u028C":"v","\uA761":"vy","\u24E6":"w","\uFF57":"w","\u1E81":"w","\u1E83":"w","\u0175":"w","\u1E87":"w","\u1E85":"w","\u1E98":"w","\u1E89":"w","\u2C73":"w","\u24E7":"x","\uFF58":"x","\u1E8B":"x","\u1E8D":"x","\u24E8":"y","\uFF59":"y","\u1EF3":"y","\u00FD":"y","\u0177":"y","\u1EF9":"y","\u0233":"y","\u1E8F":"y","\u00FF":"y","\u1EF7":"y","\u1E99":"y","\u1EF5":"y","\u01B4":"y","\u024F":"y","\u1EFF":"y","\u24E9":"z","\uFF5A":"z","\u017A":"z","\u1E91":"z","\u017C":"z","\u017E":"z","\u1E93":"z","\u1E95":"z","\u01B6":"z","\u0225":"z","\u0240":"z","\u2C6C":"z","\uA763":"z"};

    $document = $(document);

    nextUid=(function() { var counter=1; return function() { return counter++; }; }());


    function stripDiacritics(str) {
        var ret, i, l, c;

        if (!str || str.length < 1) return str;

        ret = "";
        for (i = 0, l = str.length; i < l; i++) {
            c = str.charAt(i);
            ret += DIACRITICS[c] || c;
        }
        return ret;
    }

    function indexOf(value, array) {
        var i = 0, l = array.length;
        for (; i < l; i = i + 1) {
            if (equal(value, array[i])) return i;
        }
        return -1;
    }

    function measureScrollbar () {
        var $template = $( MEASURE_SCROLLBAR_TEMPLATE );
        $template.appendTo('body');

        var dim = {
            width: $template.width() - $template[0].clientWidth,
            height: $template.height() - $template[0].clientHeight
        };
        $template.remove();

        return dim;
    }

    /**
     * Compares equality of a and b
     * @param a
     * @param b
     */
    function equal(a, b) {
        if (a === b) return true;
        if (a === undefined || b === undefined) return false;
        if (a === null || b === null) return false;
        // Check whether 'a' or 'b' is a string (primitive or object).
        // The concatenation of an empty string (+'') converts its argument to a string's primitive.
        if (a.constructor === String) return a+'' === b+''; // a+'' - in case 'a' is a String object
        if (b.constructor === String) return b+'' === a+''; // b+'' - in case 'b' is a String object
        return false;
    }

    /**
     * Splits the string into an array of values, trimming each value. An empty array is returned for nulls or empty
     * strings
     * @param string
     * @param separator
     */
    function splitVal(string, separator) {
        var val, i, l;
        if (string === null || string.length < 1) return [];
        val = string.split(separator);
        for (i = 0, l = val.length; i < l; i = i + 1) val[i] = $.trim(val[i]);
        return val;
    }

    function getSideBorderPadding(element) {
        return element.outerWidth(false) - element.width();
    }

    function installKeyUpChangeEvent(element) {
        var key="keyup-change-value";
        element.on("keydown", function () {
            if ($.data(element, key) === undefined) {
                $.data(element, key, element.val());
            }
        });
        element.on("keyup", function () {
            var val= $.data(element, key);
            if (val !== undefined && element.val() !== val) {
                $.removeData(element, key);
                element.trigger("keyup-change");
            }
        });
    }

    $document.on("mousemove", function (e) {
        lastMousePosition.x = e.pageX;
        lastMousePosition.y = e.pageY;
    });

    /**
     * filters mouse events so an event is fired only if the mouse moved.
     *
     * filters out mouse events that occur when mouse is stationary but
     * the elements under the pointer are scrolled.
     */
    function installFilteredMouseMove(element) {
        element.on("mousemove", function (e) {
            var lastpos = lastMousePosition;
            if (lastpos === undefined || lastpos.x !== e.pageX || lastpos.y !== e.pageY) {
                $(e.target).trigger("mousemove-filtered", e);
            }
        });
    }

    /**
     * Debounces a function. Returns a function that calls the original fn function only if no invocations have been made
     * within the last quietMillis milliseconds.
     *
     * @param quietMillis number of milliseconds to wait before invoking fn
     * @param fn function to be debounced
     * @param ctx object to be used as this reference within fn
     * @return debounced version of fn
     */
    function debounce(quietMillis, fn, ctx) {
        ctx = ctx || undefined;
        var timeout;
        return function () {
            var args = arguments;
            window.clearTimeout(timeout);
            timeout = window.setTimeout(function() {
                fn.apply(ctx, args);
            }, quietMillis);
        };
    }

    /**
     * A simple implementation of a thunk
     * @param formula function used to lazily initialize the thunk
     * @return {Function}
     */
    function thunk(formula) {
        var evaluated = false,
            value;
        return function() {
            if (evaluated === false) { value = formula(); evaluated = true; }
            return value;
        };
    };

    function installDebouncedScroll(threshold, element) {
        var notify = debounce(threshold, function (e) { element.trigger("scroll-debounced", e);});
        element.on("scroll", function (e) {
            if (indexOf(e.target, element.get()) >= 0) notify(e);
        });
    }

    function focus($el) {
        if ($el[0] === document.activeElement) return;

        /* set the focus in a 0 timeout - that way the focus is set after the processing
            of the current event has finished - which seems like the only reliable way
            to set focus */
        window.setTimeout(function() {
            var el=$el[0], pos=$el.val().length, range;

            $el.focus();

            /* make sure el received focus so we do not error out when trying to manipulate the caret.
                sometimes modals or others listeners may steal it after its set */
            if ($el.is(":visible") && el === document.activeElement) {

                /* after the focus is set move the caret to the end, necessary when we val()
                    just before setting focus */
                if(el.setSelectionRange)
                {
                    el.setSelectionRange(pos, pos);
                }
                else if (el.createTextRange) {
                    range = el.createTextRange();
                    range.collapse(false);
                    range.select();
                }
            }
        }, 0);
    }

    function getCursorInfo(el) {
        el = $(el)[0];
        var offset = 0;
        var length = 0;
        if ('selectionStart' in el) {
            offset = el.selectionStart;
            length = el.selectionEnd - offset;
        } else if ('selection' in document) {
            el.focus();
            var sel = document.selection.createRange();
            length = document.selection.createRange().text.length;
            sel.moveStart('character', -el.value.length);
            offset = sel.text.length - length;
        }
        return { offset: offset, length: length };
    }

    function killEvent(event) {
        event.preventDefault();
        event.stopPropagation();
    }
    function killEventImmediately(event) {
        event.preventDefault();
        event.stopImmediatePropagation();
    }

    function measureTextWidth(e) {
        if (!sizer){
            var style = e[0].currentStyle || window.getComputedStyle(e[0], null);
            sizer = $(document.createElement("div")).css({
                position: "absolute",
                left: "-10000px",
                top: "-10000px",
                display: "none",
                fontSize: style.fontSize,
                fontFamily: style.fontFamily,
                fontStyle: style.fontStyle,
                fontWeight: style.fontWeight,
                letterSpacing: style.letterSpacing,
                textTransform: style.textTransform,
                whiteSpace: "nowrap"
            });
            sizer.attr("class","select2-sizer");
            $("body").append(sizer);
        }
        sizer.text(e.val());
        return sizer.width();
    }

    function syncCssClasses(dest, src, adapter) {
        var classes, replacements = [], adapted;

        classes = dest.attr("class");
        if (classes) {
            classes = '' + classes; // for IE which returns object
            $(classes.split(" ")).each2(function() {
                if (this.indexOf("select2-") === 0) {
                    replacements.push(this);
                }
            });
        }
        classes = src.attr("class");
        if (classes) {
            classes = '' + classes; // for IE which returns object
            $(classes.split(" ")).each2(function() {
                if (this.indexOf("select2-") !== 0) {
                    adapted = adapter(this);
                    if (adapted) {
                        replacements.push(this);
                    }
                }
            });
        }
        dest.attr("class", replacements.join(" "));
    }


    function markMatch(text, term, markup, escapeMarkup) {
        var match=stripDiacritics(text.toUpperCase()).indexOf(stripDiacritics(term.toUpperCase())),
            tl=term.length;

        if (match<0) {
            markup.push(escapeMarkup(text));
            return;
        }

        markup.push(escapeMarkup(text.substring(0, match)));
        markup.push("<span class='select2-match'>");
        markup.push(escapeMarkup(text.substring(match, match + tl)));
        markup.push("</span>");
        markup.push(escapeMarkup(text.substring(match + tl, text.length)));
    }

    function defaultEscapeMarkup(markup) {
        var replace_map = {
            '\\': '&#92;',
            '&': '&amp;',
            '<': '&lt;',
            '>': '&gt;',
            '"': '&quot;',
            "'": '&#39;',
            "/": '&#47;'
        };

        return String(markup).replace(/[&<>"'\/\\]/g, function (match) {
            return replace_map[match];
        });
    }

    /**
     * Produces an ajax-based query function
     *
     * @param options object containing configuration paramters
     * @param options.params parameter map for the transport ajax call, can contain such options as cache, jsonpCallback, etc. see $.ajax
     * @param options.transport function that will be used to execute the ajax request. must be compatible with parameters supported by $.ajax
     * @param options.url url for the data
     * @param options.data a function(searchTerm, pageNumber, context) that should return an object containing query string parameters for the above url.
     * @param options.dataType request data type: ajax, jsonp, other datatatypes supported by jQuery's $.ajax function or the transport function if specified
     * @param options.quietMillis (optional) milliseconds to wait before making the ajaxRequest, helps debounce the ajax function if invoked too often
     * @param options.results a function(remoteData, pageNumber) that converts data returned form the remote request to the format expected by Select2.
     *      The expected format is an object containing the following keys:
     *      results array of objects that will be used as choices
     *      more (optional) boolean indicating whether there are more results available
     *      Example: {results:[{id:1, text:'Red'},{id:2, text:'Blue'}], more:true}
     */
    function ajax(options) {
        var timeout, // current scheduled but not yet executed request
            handler = null,
            quietMillis = options.quietMillis || 100,
            ajaxUrl = options.url,
            self = this;

        return function (query) {
            window.clearTimeout(timeout);
            timeout = window.setTimeout(function () {
                var data = options.data, // ajax data function
                    url = ajaxUrl, // ajax url string or function
                    transport = options.transport || $.fn.select2.ajaxDefaults.transport,
                    // deprecated - to be removed in 4.0  - use params instead
                    deprecated = {
                        type: options.type || 'GET', // set type of request (GET or POST)
                        cache: options.cache || false,
                        jsonpCallback: options.jsonpCallback||undefined,
                        dataType: options.dataType||"json"
                    },
                    params = $.extend({}, $.fn.select2.ajaxDefaults.params, deprecated);

                data = data ? data.call(self, query.term, query.page, query.context) : null;
                url = (typeof url === 'function') ? url.call(self, query.term, query.page, query.context) : url;

                if (handler) { handler.abort(); }

                if (options.params) {
                    if ($.isFunction(options.params)) {
                        $.extend(params, options.params.call(self));
                    } else {
                        $.extend(params, options.params);
                    }
                }

                $.extend(params, {
                    url: url,
                    dataType: options.dataType,
                    data: data,
                    success: function (data) {
                        // TODO - replace query.page with query so users have access to term, page, etc.
                        var results = options.results(data, query.page);
                        query.callback(results);
                    }
                });
                handler = transport.call(self, params);
            }, quietMillis);
        };
    }

    /**
     * Produces a query function that works with a local array
     *
     * @param options object containing configuration parameters. The options parameter can either be an array or an
     * object.
     *
     * If the array form is used it is assumed that it contains objects with 'id' and 'text' keys.
     *
     * If the object form is used ti is assumed that it contains 'data' and 'text' keys. The 'data' key should contain
     * an array of objects that will be used as choices. These objects must contain at least an 'id' key. The 'text'
     * key can either be a String in which case it is expected that each element in the 'data' array has a key with the
     * value of 'text' which will be used to match choices. Alternatively, text can be a function(item) that can extract
     * the text.
     */
    function local(options) {
        var data = options, // data elements
            dataText,
            tmp,
            text = function (item) { return ""+item.text; }; // function used to retrieve the text portion of a data item that is matched against the search

         if ($.isArray(data)) {
            tmp = data;
            data = { results: tmp };
        }

         if ($.isFunction(data) === false) {
            tmp = data;
            data = function() { return tmp; };
        }

        var dataItem = data();
        if (dataItem.text) {
            text = dataItem.text;
            // if text is not a function we assume it to be a key name
            if (!$.isFunction(text)) {
                dataText = dataItem.text; // we need to store this in a separate variable because in the next step data gets reset and data.text is no longer available
                text = function (item) { return item[dataText]; };
            }
        }

        return function (query) {
            var t = query.term, filtered = { results: [] }, process;
            if (t === "") {
                query.callback(data());
                return;
            }

            process = function(datum, collection) {
                var group, attr;
                datum = datum[0];
                if (datum.children) {
                    group = {};
                    for (attr in datum) {
                        if (datum.hasOwnProperty(attr)) group[attr]=datum[attr];
                    }
                    group.children=[];
                    $(datum.children).each2(function(i, childDatum) { process(childDatum, group.children); });
                    if (group.children.length || query.matcher(t, text(group), datum)) {
                        collection.push(group);
                    }
                } else {
                    if (query.matcher(t, text(datum), datum)) {
                        collection.push(datum);
                    }
                }
            };

            $(data().results).each2(function(i, datum) { process(datum, filtered.results); });
            query.callback(filtered);
        };
    }

    // TODO javadoc
    function tags(data) {
        var isFunc = $.isFunction(data);
        return function (query) {
            var t = query.term, filtered = {results: []};
            $(isFunc ? data() : data).each(function () {
                var isObject = this.text !== undefined,
                    text = isObject ? this.text : this;
                if (t === "" || query.matcher(t, text)) {
                    filtered.results.push(isObject ? this : {id: this, text: this});
                }
            });
            query.callback(filtered);
        };
    }

    /**
     * Checks if the formatter function should be used.
     *
     * Throws an error if it is not a function. Returns true if it should be used,
     * false if no formatting should be performed.
     *
     * @param formatter
     */
    function checkFormatter(formatter, formatterName) {
        if ($.isFunction(formatter)) return true;
        if (!formatter) return false;
        throw new Error(formatterName +" must be a function or a falsy value");
    }

    function evaluate(val) {
        return $.isFunction(val) ? val() : val;
    }

    function countResults(results) {
        var count = 0;
        $.each(results, function(i, item) {
            if (item.children) {
                count += countResults(item.children);
            } else {
                count++;
            }
        });
        return count;
    }

    /**
     * Default tokenizer. This function uses breaks the input on substring match of any string from the
     * opts.tokenSeparators array and uses opts.createSearchChoice to create the choice object. Both of those
     * two options have to be defined in order for the tokenizer to work.
     *
     * @param input text user has typed so far or pasted into the search field
     * @param selection currently selected choices
     * @param selectCallback function(choice) callback tho add the choice to selection
     * @param opts select2's opts
     * @return undefined/null to leave the current input unchanged, or a string to change the input to the returned value
     */
    function defaultTokenizer(input, selection, selectCallback, opts) {
        var original = input, // store the original so we can compare and know if we need to tell the search to update its text
            dupe = false, // check for whether a token we extracted represents a duplicate selected choice
            token, // token
            index, // position at which the separator was found
            i, l, // looping variables
            separator; // the matched separator

        if (!opts.createSearchChoice || !opts.tokenSeparators || opts.tokenSeparators.length < 1) return undefined;

        while (true) {
            index = -1;

            for (i = 0, l = opts.tokenSeparators.length; i < l; i++) {
                separator = opts.tokenSeparators[i];
                index = input.indexOf(separator);
                if (index >= 0) break;
            }

            if (index < 0) break; // did not find any token separator in the input string, bail

            token = input.substring(0, index);
            input = input.substring(index + separator.length);

            if (token.length > 0) {
                token = opts.createSearchChoice.call(this, token, selection);
                if (token !== undefined && token !== null && opts.id(token) !== undefined && opts.id(token) !== null) {
                    dupe = false;
                    for (i = 0, l = selection.length; i < l; i++) {
                        if (equal(opts.id(token), opts.id(selection[i]))) {
                            dupe = true; break;
                        }
                    }

                    if (!dupe) selectCallback(token);
                }
            }
        }

        if (original!==input) return input;
    }

    /**
     * Creates a new class
     *
     * @param superClass
     * @param methods
     */
    function clazz(SuperClass, methods) {
        var constructor = function () {};
        constructor.prototype = new SuperClass;
        constructor.prototype.constructor = constructor;
        constructor.prototype.parent = SuperClass.prototype;
        constructor.prototype = $.extend(constructor.prototype, methods);
        return constructor;
    }

    AbstractSelect2 = clazz(Object, {

        // abstract
        bind: function (func) {
            var self = this;
            return function () {
                func.apply(self, arguments);
            };
        },

        // abstract
        init: function (opts) {
            var results, search, resultsSelector = ".select2-results", disabled, readonly;

            // prepare options
            this.opts = opts = this.prepareOpts(opts);

            this.id=opts.id;

            // destroy if called on an existing component
            if (opts.element.data("select2") !== undefined &&
                opts.element.data("select2") !== null) {
                opts.element.data("select2").destroy();
            }

            this.container = this.createContainer();

            this.containerId="s2id_"+(opts.element.attr("id") || "autogen"+nextUid());
            this.containerSelector="#"+this.containerId.replace(/([;&,\.\+\*\~':"\!\^#$%@\[\]\(\)=>\|])/g, '\\$1');
            this.container.attr("id", this.containerId);

            // cache the body so future lookups are cheap
            this.body = thunk(function() { return opts.element.closest("body"); });

            syncCssClasses(this.container, this.opts.element, this.opts.adaptContainerCssClass);

            this.container.attr("style", opts.element.attr("style"));
            this.container.css(evaluate(opts.containerCss));
            this.container.addClass(evaluate(opts.containerCssClass));

            this.elementTabIndex = this.opts.element.attr("tabindex");

            // swap container for the element
            this.opts.element
                .data("select2", this)
                .attr("tabindex", "-1")
                .before(this.container)
                .on("click.select2", killEvent); // do not leak click events

            this.container.data("select2", this);

            this.dropdown = this.container.find(".select2-drop");

            syncCssClasses(this.dropdown, this.opts.element, this.opts.adaptDropdownCssClass);

            this.dropdown.addClass(evaluate(opts.dropdownCssClass));
            this.dropdown.data("select2", this);
            this.dropdown.on("click", killEvent);

            this.results = results = this.container.find(resultsSelector);
            this.search = search = this.container.find("input.select2-input");

            this.queryCount = 0;
            this.resultsPage = 0;
            this.context = null;

            // initialize the container
            this.initContainer();

            this.container.on("click", killEvent);

            installFilteredMouseMove(this.results);
            this.dropdown.on("mousemove-filtered touchstart touchmove touchend", resultsSelector, this.bind(this.highlightUnderEvent));

            installDebouncedScroll(80, this.results);
            this.dropdown.on("scroll-debounced", resultsSelector, this.bind(this.loadMoreIfNeeded));

            // do not propagate change event from the search field out of the component
            $(this.container).on("change", ".select2-input", function(e) {e.stopPropagation();});
            $(this.dropdown).on("change", ".select2-input", function(e) {e.stopPropagation();});

            // if jquery.mousewheel plugin is installed we can prevent out-of-bounds scrolling of results via mousewheel
            if ($.fn.mousewheel) {
                results.mousewheel(function (e, delta, deltaX, deltaY) {
                    var top = results.scrollTop(), height;
                    if (deltaY > 0 && top - deltaY <= 0) {
                        results.scrollTop(0);
                        killEvent(e);
                    } else if (deltaY < 0 && results.get(0).scrollHeight - results.scrollTop() + deltaY <= results.height()) {
                        results.scrollTop(results.get(0).scrollHeight - results.height());
                        killEvent(e);
                    }
                });
            }

            installKeyUpChangeEvent(search);
            search.on("keyup-change input paste", this.bind(this.updateResults));
            search.on("focus", function () { search.addClass("select2-focused"); });
            search.on("blur", function () { search.removeClass("select2-focused");});

            this.dropdown.on("mouseup", resultsSelector, this.bind(function (e) {
                if ($(e.target).closest(".select2-result-selectable").length > 0) {
                    this.highlightUnderEvent(e);
                    this.selectHighlighted(e);
                }
            }));

            // trap all mouse events from leaving the dropdown. sometimes there may be a modal that is listening
            // for mouse events outside of itself so it can close itself. since the dropdown is now outside the select2's
            // dom it will trigger the popup close, which is not what we want
            this.dropdown.on("click mouseup mousedown", function (e) { e.stopPropagation(); });

            if ($.isFunction(this.opts.initSelection)) {
                // initialize selection based on the current value of the source element
                this.initSelection();

                // if the user has provided a function that can set selection based on the value of the source element
                // we monitor the change event on the element and trigger it, allowing for two way synchronization
                this.monitorSource();
            }

            if (opts.maximumInputLength !== null) {
                this.search.attr("maxlength", opts.maximumInputLength);
            }

            var disabled = opts.element.prop("disabled");
            if (disabled === undefined) disabled = false;
            this.enable(!disabled);

            var readonly = opts.element.prop("readonly");
            if (readonly === undefined) readonly = false;
            this.readonly(readonly);

            // Calculate size of scrollbar
            scrollBarDimensions = scrollBarDimensions || measureScrollbar();

            this.autofocus = opts.element.prop("autofocus");
            opts.element.prop("autofocus", false);
            if (this.autofocus) this.focus();

            this.nextSearchTerm = undefined;
        },

        // abstract
        destroy: function () {
            var element=this.opts.element, select2 = element.data("select2");

            this.close();

            if (this.propertyObserver) { delete this.propertyObserver; this.propertyObserver = null; }

            if (select2 !== undefined) {
                select2.container.remove();
                select2.dropdown.remove();
                element
                    .removeClass("select2-offscreen")
                    .removeData("select2")
                    .off(".select2")
                    .prop("autofocus", this.autofocus || false);
                if (this.elementTabIndex) {
                    element.attr({tabindex: this.elementTabIndex});
                } else {
                    element.removeAttr("tabindex");
                }
                element.show();
            }
        },

        // abstract
        optionToData: function(element) {
            if (element.is("option")) {
                return {
                    id:element.prop("value"),
                    text:element.text(),
                    element: element.get(),
                    css: element.attr("class"),
                    disabled: element.prop("disabled"),
                    locked: equal(element.attr("locked"), "locked") || equal(element.data("locked"), true)
                };
            } else if (element.is("optgroup")) {
                return {
                    text:element.attr("label"),
                    children:[],
                    element: element.get(),
                    css: element.attr("class")
                };
            }
        },

        // abstract
        prepareOpts: function (opts) {
            var element, select, idKey, ajaxUrl, self = this;

            element = opts.element;

            if (element.get(0).tagName.toLowerCase() === "select") {
                this.select = select = opts.element;
            }

            if (select) {
                // these options are not allowed when attached to a select because they are picked up off the element itself
                $.each(["id", "multiple", "ajax", "query", "createSearchChoice", "initSelection", "data", "tags"], function () {
                    if (this in opts) {
                        throw new Error("Option '" + this + "' is not allowed for Select2 when attached to a <select> element.");
                    }
                });
            }

            opts = $.extend({}, {
                populateResults: function(container, results, query) {
                    var populate,  data, result, children, id=this.opts.id;

                    populate=function(results, container, depth) {

                        var i, l, result, selectable, disabled, compound, node, label, innerContainer, formatted;

                        results = opts.sortResults(results, container, query);

                        for (i = 0, l = results.length; i < l; i = i + 1) {

                            result=results[i];

                            disabled = (result.disabled === true);
                            selectable = (!disabled) && (id(result) !== undefined);

                            compound=result.children && result.children.length > 0;

                            node=$("<li></li>");
                            node.addClass("select2-results-dept-"+depth);
                            node.addClass("select2-result");
                            node.addClass(selectable ? "select2-result-selectable" : "select2-result-unselectable");
                            if (disabled) { node.addClass("select2-disabled"); }
                            if (compound) { node.addClass("select2-result-with-children"); }
                            node.addClass(self.opts.formatResultCssClass(result));

                            label=$(document.createElement("div"));
                            label.addClass("select2-result-label");

                            formatted=opts.formatResult(result, label, query, self.opts.escapeMarkup);
                            if (formatted!==undefined) {
                                label.html(formatted);
                            }

                            node.append(label);

                            if (compound) {

                                innerContainer=$("<ul></ul>");
                                innerContainer.addClass("select2-result-sub");
                                populate(result.children, innerContainer, depth+1);
                                node.append(innerContainer);
                            }

                            node.data("select2-data", result);
                            container.append(node);
                        }
                    };

                    populate(results, container, 0);
                }
            }, $.fn.select2.defaults, opts);

            if (typeof(opts.id) !== "function") {
                idKey = opts.id;
                opts.id = function (e) { return e[idKey]; };
            }

            if ($.isArray(opts.element.data("select2Tags"))) {
                if ("tags" in opts) {
                    throw "tags specified as both an attribute 'data-select2-tags' and in options of Select2 " + opts.element.attr("id");
                }
                opts.tags=opts.element.data("select2Tags");
            }

            if (select) {
                opts.query = this.bind(function (query) {
                    var data = { results: [], more: false },
                        term = query.term,
                        children, placeholderOption, process;

                    process=function(element, collection) {
                        var group;
                        if (element.is("option")) {
                            if (query.matcher(term, element.text(), element)) {
                                collection.push(self.optionToData(element));
                            }
                        } else if (element.is("optgroup")) {
                            group=self.optionToData(element);
                            element.children().each2(function(i, elm) { process(elm, group.children); });
                            if (group.children.length>0) {
                                collection.push(group);
                            }
                        }
                    };

                    children=element.children();

                    // ignore the placeholder option if there is one
                    if (this.getPlaceholder() !== undefined && children.length > 0) {
                        placeholderOption = this.getPlaceholderOption();
                        if (placeholderOption) {
                            children=children.not(placeholderOption);
                        }
                    }

                    children.each2(function(i, elm) { process(elm, data.results); });

                    query.callback(data);
                });
                // this is needed because inside val() we construct choices from options and there id is hardcoded
                opts.id=function(e) { return e.id; };
                opts.formatResultCssClass = function(data) { return data.css; };
            } else {
                if (!("query" in opts)) {

                    if ("ajax" in opts) {
                        ajaxUrl = opts.element.data("ajax-url");
                        if (ajaxUrl && ajaxUrl.length > 0) {
                            opts.ajax.url = ajaxUrl;
                        }
                        opts.query = ajax.call(opts.element, opts.ajax);
                    } else if ("data" in opts) {
                        opts.query = local(opts.data);
                    } else if ("tags" in opts) {
                        opts.query = tags(opts.tags);
                        if (opts.createSearchChoice === undefined) {
                            opts.createSearchChoice = function (term) { return {id: $.trim(term), text: $.trim(term)}; };
                        }
                        if (opts.initSelection === undefined) {
                            opts.initSelection = function (element, callback) {
                                var data = [];
                                $(splitVal(element.val(), opts.separator)).each(function () {
                                    var obj = { id: this, text: this },
                                        tags = opts.tags;
                                    if ($.isFunction(tags)) tags=tags();
                                    $(tags).each(function() { if (equal(this.id, obj.id)) { obj = this; return false; } });
                                    data.push(obj);
                                });

                                callback(data);
                            };
                        }
                    }
                }
            }
            if (typeof(opts.query) !== "function") {
                throw "query function not defined for Select2 " + opts.element.attr("id");
            }

            return opts;
        },

        /**
         * Monitor the original element for changes and update select2 accordingly
         */
        // abstract
        monitorSource: function () {
            var el = this.opts.element, sync;

            el.on("change.select2", this.bind(function (e) {
                if (this.opts.element.data("select2-change-triggered") !== true) {
                    this.initSelection();
                }
            }));

            sync = this.bind(function () {

                var enabled, readonly, self = this;

                // sync enabled state
                var disabled = el.prop("disabled");
                if (disabled === undefined) disabled = false;
                this.enable(!disabled);

                var readonly = el.prop("readonly");
                if (readonly === undefined) readonly = false;
                this.readonly(readonly);

                syncCssClasses(this.container, this.opts.element, this.opts.adaptContainerCssClass);
                this.container.addClass(evaluate(this.opts.containerCssClass));

                syncCssClasses(this.dropdown, this.opts.element, this.opts.adaptDropdownCssClass);
                this.dropdown.addClass(evaluate(this.opts.dropdownCssClass));

            });

            // mozilla and IE
            el.on("propertychange.select2 DOMAttrModified.select2", sync);


            // hold onto a reference of the callback to work around a chromium bug
            if (this.mutationCallback === undefined) {
                this.mutationCallback = function (mutations) {
                    mutations.forEach(sync);
                }
            }

            // safari and chrome
            if (typeof WebKitMutationObserver !== "undefined") {
                if (this.propertyObserver) { delete this.propertyObserver; this.propertyObserver = null; }
                this.propertyObserver = new WebKitMutationObserver(this.mutationCallback);
                this.propertyObserver.observe(el.get(0), { attributes:true, subtree:false });
            }
        },

        // abstract
        triggerSelect: function(data) {
            var evt = $.Event("select2-selecting", { val: this.id(data), object: data });
            this.opts.element.trigger(evt);
            return !evt.isDefaultPrevented();
        },

        /**
         * Triggers the change event on the source element
         */
        // abstract
        triggerChange: function (details) {

            details = details || {};
            details= $.extend({}, details, { type: "change", val: this.val() });
            // prevents recursive triggering
            this.opts.element.data("select2-change-triggered", true);
            this.opts.element.trigger(details);
            this.opts.element.data("select2-change-triggered", false);

            // some validation frameworks ignore the change event and listen instead to keyup, click for selects
            // so here we trigger the click event manually
            this.opts.element.click();

            // ValidationEngine ignorea the change event and listens instead to blur
            // so here we trigger the blur event manually if so desired
            if (this.opts.blurOnChange)
                this.opts.element.blur();
        },

        //abstract
        isInterfaceEnabled: function()
        {
            return this.enabledInterface === true;
        },

        // abstract
        enableInterface: function() {
            var enabled = this._enabled && !this._readonly,
                disabled = !enabled;

            if (enabled === this.enabledInterface) return false;

            this.container.toggleClass("select2-container-disabled", disabled);
            this.close();
            this.enabledInterface = enabled;

            return true;
        },

        // abstract
        enable: function(enabled) {
            if (enabled === undefined) enabled = true;
            if (this._enabled === enabled) return;
            this._enabled = enabled;

            this.opts.element.prop("disabled", !enabled);
            this.enableInterface();
        },

        // abstract
        disable: function() {
            this.enable(false);
        },

        // abstract
        readonly: function(enabled) {
            if (enabled === undefined) enabled = false;
            if (this._readonly === enabled) return false;
            this._readonly = enabled;

            this.opts.element.prop("readonly", enabled);
            this.enableInterface();
            return true;
        },

        // abstract
        opened: function () {
            return this.container.hasClass("select2-dropdown-open");
        },

        // abstract
        positionDropdown: function() {
            var $dropdown = this.dropdown,
                offset = this.container.offset(),
                height = this.container.outerHeight(false),
                width = this.container.outerWidth(false),
                dropHeight = $dropdown.outerHeight(false),
                viewPortRight = $(window).scrollLeft() + $(window).width(),
                viewportBottom = $(window).scrollTop() + $(window).height(),
                dropTop = offset.top + height,
                dropLeft = offset.left,
                enoughRoomBelow = dropTop + dropHeight <= viewportBottom,
                enoughRoomAbove = (offset.top - dropHeight) >= this.body().scrollTop(),
                dropWidth = $dropdown.outerWidth(false),
                enoughRoomOnRight = dropLeft + dropWidth <= viewPortRight,
                aboveNow = $dropdown.hasClass("select2-drop-above"),
                bodyOffset,
                above,
                css,
                resultsListNode;

            if (this.opts.dropdownAutoWidth) {
                resultsListNode = $('.select2-results', $dropdown)[0];
                $dropdown.addClass('select2-drop-auto-width');
                $dropdown.css('width', '');
                // Add scrollbar width to dropdown if vertical scrollbar is present
                dropWidth = $dropdown.outerWidth(false) + (resultsListNode.scrollHeight === resultsListNode.clientHeight ? 0 : scrollBarDimensions.width);
                dropWidth > width ? width = dropWidth : dropWidth = width;
                enoughRoomOnRight = dropLeft + dropWidth <= viewPortRight;
            }
            else {
                this.container.removeClass('select2-drop-auto-width');
            }

            //console.log("below/ droptop:", dropTop, "dropHeight", dropHeight, "sum", (dropTop+dropHeight)+" viewport bottom", viewportBottom, "enough?", enoughRoomBelow);
            //console.log("above/ offset.top", offset.top, "dropHeight", dropHeight, "top", (offset.top-dropHeight), "scrollTop", this.body().scrollTop(), "enough?", enoughRoomAbove);

            // fix positioning when body has an offset and is not position: static
            if (this.body().css('position') !== 'static') {
                bodyOffset = this.body().offset();
                dropTop -= bodyOffset.top;
                dropLeft -= bodyOffset.left;
            }

            // always prefer the current above/below alignment, unless there is not enough room
            if (aboveNow) {
                above = true;
                if (!enoughRoomAbove && enoughRoomBelow) above = false;
            } else {
                above = false;
                if (!enoughRoomBelow && enoughRoomAbove) above = true;
            }

            if (!enoughRoomOnRight) {
               dropLeft = offset.left + width - dropWidth;
            }

            if (above) {
                dropTop = offset.top - dropHeight;
                this.container.addClass("select2-drop-above");
                $dropdown.addClass("select2-drop-above");
            }
            else {
                this.container.removeClass("select2-drop-above");
                $dropdown.removeClass("select2-drop-above");
            }

            css = $.extend({
                top: dropTop,
                left: dropLeft,
                width: width
            }, evaluate(this.opts.dropdownCss));

            $dropdown.css(css);
        },

        // abstract
        shouldOpen: function() {
            var event;

            if (this.opened()) return false;

            if (this._enabled === false || this._readonly === true) return false;

            event = $.Event("select2-opening");
            this.opts.element.trigger(event);
            return !event.isDefaultPrevented();
        },

        // abstract
        clearDropdownAlignmentPreference: function() {
            // clear the classes used to figure out the preference of where the dropdown should be opened
            this.container.removeClass("select2-drop-above");
            this.dropdown.removeClass("select2-drop-above");
        },

        /**
         * Opens the dropdown
         *
         * @return {Boolean} whether or not dropdown was opened. This method will return false if, for example,
         * the dropdown is already open, or if the 'open' event listener on the element called preventDefault().
         */
        // abstract
        open: function () {

            if (!this.shouldOpen()) return false;

            this.opening();

            return true;
        },

        /**
         * Performs the opening of the dropdown
         */
        // abstract
        opening: function() {
            var cid = this.containerId,
                scroll = "scroll." + cid,
                resize = "resize."+cid,
                orient = "orientationchange."+cid,
                mask, maskCss;

            this.container.addClass("select2-dropdown-open").addClass("select2-container-active");

            this.clearDropdownAlignmentPreference();

            if(this.dropdown[0] !== this.body().children().last()[0]) {
                this.dropdown.detach().appendTo(this.body());
            }

            // create the dropdown mask if doesnt already exist
            mask = $("#select2-drop-mask");
            if (mask.length == 0) {
                mask = $(document.createElement("div"));
                mask.attr("id","select2-drop-mask").attr("class","select2-drop-mask");
                mask.hide();
                mask.appendTo(this.body());
                mask.on("mousedown touchstart click", function (e) {
                    var dropdown = $("#select2-drop"), self;
                    if (dropdown.length > 0) {
                        self=dropdown.data("select2");
                        if (self.opts.selectOnBlur) {
                            self.selectHighlighted({noFocus: true});
                        }
                        self.close({focus:false});
                        e.preventDefault();
                        e.stopPropagation();
                    }
                });
            }

            // ensure the mask is always right before the dropdown
            if (this.dropdown.prev()[0] !== mask[0]) {
                this.dropdown.before(mask);
            }

            // move the global id to the correct dropdown
            $("#select2-drop").removeAttr("id");
            this.dropdown.attr("id", "select2-drop");

            // show the elements
            mask.show();

            this.positionDropdown();
            this.dropdown.show();
            this.positionDropdown();

            this.dropdown.addClass("select2-drop-active");

            // attach listeners to events that can change the position of the container and thus require
            // the position of the dropdown to be updated as well so it does not come unglued from the container
            var that = this;
            this.container.parents().add(window).each(function () {
                $(this).on(resize+" "+scroll+" "+orient, function (e) {
                    that.positionDropdown();
                });
            });


        },

        // abstract
        close: function () {
            if (!this.opened()) return;

            var cid = this.containerId,
                scroll = "scroll." + cid,
                resize = "resize."+cid,
                orient = "orientationchange."+cid;

            // unbind event listeners
            this.container.parents().add(window).each(function () { $(this).off(scroll).off(resize).off(orient); });

            this.clearDropdownAlignmentPreference();

            $("#select2-drop-mask").hide();
            this.dropdown.removeAttr("id"); // only the active dropdown has the select2-drop id
            this.dropdown.hide();
            this.container.removeClass("select2-dropdown-open").removeClass("select2-container-active");
            this.results.empty();


            this.clearSearch();
            this.search.removeClass("select2-active");
            this.opts.element.trigger($.Event("select2-close"));
        },

        /**
         * Opens control, sets input value, and updates results.
         */
        // abstract
        externalSearch: function (term) {
            this.open();
            this.search.val(term);
            this.updateResults(false);
        },

        // abstract
        clearSearch: function () {

        },

        //abstract
        getMaximumSelectionSize: function() {
            return evaluate(this.opts.maximumSelectionSize);
        },

        // abstract
        ensureHighlightVisible: function () {
            var results = this.results, children, index, child, hb, rb, y, more;

            index = this.highlight();

            if (index < 0) return;

            if (index == 0) {

                // if the first element is highlighted scroll all the way to the top,
                // that way any unselectable headers above it will also be scrolled
                // into view

                results.scrollTop(0);
                return;
            }

            children = this.findHighlightableChoices().find('.select2-result-label');

            child = $(children[index]);

            hb = child.offset().top + child.outerHeight(true);

            // if this is the last child lets also make sure select2-more-results is visible
            if (index === children.length - 1) {
                more = results.find("li.select2-more-results");
                if (more.length > 0) {
                    hb = more.offset().top + more.outerHeight(true);
                }
            }

            rb = results.offset().top + results.outerHeight(true);
            if (hb > rb) {
                results.scrollTop(results.scrollTop() + (hb - rb));
            }
            y = child.offset().top - results.offset().top;

            // make sure the top of the element is visible
            if (y < 0 && child.css('display') != 'none' ) {
                results.scrollTop(results.scrollTop() + y); // y is negative
            }
        },

        // abstract
        findHighlightableChoices: function() {
            return this.results.find(".select2-result-selectable:not(.select2-disabled)");
        },

        // abstract
        moveHighlight: function (delta) {
            var choices = this.findHighlightableChoices(),
                index = this.highlight();

            while (index > -1 && index < choices.length) {
                index += delta;
                var choice = $(choices[index]);
                if (choice.hasClass("select2-result-selectable") && !choice.hasClass("select2-disabled") && !choice.hasClass("select2-selected")) {
                    this.highlight(index);
                    break;
                }
            }
        },

        // abstract
        highlight: function (index) {
            var choices = this.findHighlightableChoices(),
                choice,
                data;

            if (arguments.length === 0) {
                return indexOf(choices.filter(".select2-highlighted")[0], choices.get());
            }

            if (index >= choices.length) index = choices.length - 1;
            if (index < 0) index = 0;

            this.removeHighlight();

            choice = $(choices[index]);
            choice.addClass("select2-highlighted");

            this.ensureHighlightVisible();

            data = choice.data("select2-data");
            if (data) {
                this.opts.element.trigger({ type: "select2-highlight", val: this.id(data), choice: data });
            }
        },

        removeHighlight: function() {
            this.results.find(".select2-highlighted").removeClass("select2-highlighted");
        },

        // abstract
        countSelectableResults: function() {
            return this.findHighlightableChoices().length;
        },

        // abstract
        highlightUnderEvent: function (event) {
            var el = $(event.target).closest(".select2-result-selectable");
            if (el.length > 0 && !el.is(".select2-highlighted")) {
                var choices = this.findHighlightableChoices();
                this.highlight(choices.index(el));
            } else if (el.length == 0) {
                // if we are over an unselectable item remove all highlights
                this.removeHighlight();
            }
        },

        // abstract
        loadMoreIfNeeded: function () {
            var results = this.results,
                more = results.find("li.select2-more-results"),
                below, // pixels the element is below the scroll fold, below==0 is when the element is starting to be visible
                offset = -1, // index of first element without data
                page = this.resultsPage + 1,
                self=this,
                term=this.search.val(),
                context=this.context;

            if (more.length === 0) return;
            below = more.offset().top - results.offset().top - results.height();

            if (below <= this.opts.loadMorePadding) {
                more.addClass("select2-active");
                this.opts.query({
                        element: this.opts.element,
                        term: term,
                        page: page,
                        context: context,
                        matcher: this.opts.matcher,
                        callback: this.bind(function (data) {

                    // ignore a response if the select2 has been closed before it was received
                    if (!self.opened()) return;


                    self.opts.populateResults.call(this, results, data.results, {term: term, page: page, context:context});
                    self.postprocessResults(data, false, false);

                    if (data.more===true) {
                        more.detach().appendTo(results).text(self.opts.formatLoadMore(page+1));
                        window.setTimeout(function() { self.loadMoreIfNeeded(); }, 10);
                    } else {
                        more.remove();
                    }
                    self.positionDropdown();
                    self.resultsPage = page;
                    self.context = data.context;
                    this.opts.element.trigger({ type: "select2-loaded", items: data });
                })});
            }
        },

        /**
         * Default tokenizer function which does nothing
         */
        tokenize: function() {

        },

        /**
         * @param initial whether or not this is the call to this method right after the dropdown has been opened
         */
        // abstract
        updateResults: function (initial) {
            var search = this.search,
                results = this.results,
                opts = this.opts,
                data,
                self = this,
                input,
                term = search.val(),
                lastTerm = $.data(this.container, "select2-last-term"),
                // sequence number used to drop out-of-order responses
                queryNumber;

            // prevent duplicate queries against the same term
            if (initial !== true && lastTerm && equal(term, lastTerm)) return;

            $.data(this.container, "select2-last-term", term);

            // if the search is currently hidden we do not alter the results
            if (initial !== true && (this.showSearchInput === false || !this.opened())) {
                return;
            }

            function postRender() {
                search.removeClass("select2-active");
                self.positionDropdown();
            }

            function render(html) {
                results.html(html);
                postRender();
            }

            queryNumber = ++this.queryCount;

            var maxSelSize = this.getMaximumSelectionSize();
            if (maxSelSize >=1) {
                data = this.data();
                if ($.isArray(data) && data.length >= maxSelSize && checkFormatter(opts.formatSelectionTooBig, "formatSelectionTooBig")) {
                    render("<li class='select2-selection-limit'>" + opts.formatSelectionTooBig(maxSelSize) + "</li>");
                    return;
                }
            }

            if (search.val().length < opts.minimumInputLength) {
                if (checkFormatter(opts.formatInputTooShort, "formatInputTooShort")) {
                    render("<li class='select2-no-results'>" + opts.formatInputTooShort(search.val(), opts.minimumInputLength) + "</li>");
                } else {
                    render("");
                }
                if (initial && this.showSearch) this.showSearch(true);
                return;
            }

            if (opts.maximumInputLength && search.val().length > opts.maximumInputLength) {
                if (checkFormatter(opts.formatInputTooLong, "formatInputTooLong")) {
                    render("<li class='select2-no-results'>" + opts.formatInputTooLong(search.val(), opts.maximumInputLength) + "</li>");
                } else {
                    render("");
                }
                return;
            }

            if (opts.formatSearching && this.findHighlightableChoices().length === 0) {
                render("<li class='select2-searching'>" + opts.formatSearching() + "</li>");
            }

            search.addClass("select2-active");

            this.removeHighlight();

            // give the tokenizer a chance to pre-process the input
            input = this.tokenize();
            if (input != undefined && input != null) {
                search.val(input);
            }

            this.resultsPage = 1;

            opts.query({
                element: opts.element,
                    term: search.val(),
                    page: this.resultsPage,
                    context: null,
                    matcher: opts.matcher,
                    callback: this.bind(function (data) {
                var def; // default choice

                // ignore old responses
                if (queryNumber != this.queryCount) {
                  return;
                }

                // ignore a response if the select2 has been closed before it was received
                if (!this.opened()) {
                    this.search.removeClass("select2-active");
                    return;
                }

                // save context, if any
                this.context = (data.context===undefined) ? null : data.context;
                // create a default choice and prepend it to the list
                if (this.opts.createSearchChoice && search.val() !== "") {
                    def = this.opts.createSearchChoice.call(self, search.val(), data.results);
                    if (def !== undefined && def !== null && self.id(def) !== undefined && self.id(def) !== null) {
                        if ($(data.results).filter(
                            function () {
                                return equal(self.id(this), self.id(def));
                            }).length === 0) {
                            data.results.unshift(def);
                        }
                    }
                }

                if (data.results.length === 0 && checkFormatter(opts.formatNoMatches, "formatNoMatches")) {
                    render("<li class='select2-no-results'>" + opts.formatNoMatches(search.val()) + "</li>");
                    return;
                }

                results.empty();
                self.opts.populateResults.call(this, results, data.results, {term: search.val(), page: this.resultsPage, context:null});

                if (data.more === true && checkFormatter(opts.formatLoadMore, "formatLoadMore")) {
                    results.append("<li class='select2-more-results'>" + self.opts.escapeMarkup(opts.formatLoadMore(this.resultsPage)) + "</li>");
                    window.setTimeout(function() { self.loadMoreIfNeeded(); }, 10);
                }

                this.postprocessResults(data, initial);

                postRender();

                this.opts.element.trigger({ type: "select2-loaded", items: data });
            })});
        },

        // abstract
        cancel: function () {
            this.close();
        },

        // abstract
        blur: function () {
            // if selectOnBlur == true, select the currently highlighted option
            if (this.opts.selectOnBlur)
                this.selectHighlighted({noFocus: true});

            this.close();
            this.container.removeClass("select2-container-active");
            // synonymous to .is(':focus'), which is available in jquery >= 1.6
            if (this.search[0] === document.activeElement) { this.search.blur(); }
            this.clearSearch();
            this.selection.find(".select2-search-choice-focus").removeClass("select2-search-choice-focus");
        },

        // abstract
        focusSearch: function () {
            focus(this.search);
        },

        // abstract
        selectHighlighted: function (options) {
            var index=this.highlight(),
                highlighted=this.results.find(".select2-highlighted"),
                data = highlighted.closest('.select2-result').data("select2-data");

            if (data) {
                this.highlight(index);
                this.onSelect(data, options);
            } else if (options && options.noFocus) {
                this.close();
            }
        },

        // abstract
        getPlaceholder: function () {
            var placeholderOption;
            return this.opts.element.attr("placeholder") ||
                this.opts.element.attr("data-placeholder") || // jquery 1.4 compat
                this.opts.element.data("placeholder") ||
                this.opts.placeholder ||
                ((placeholderOption = this.getPlaceholderOption()) !== undefined ? placeholderOption.text() : undefined);
        },

        // abstract
        getPlaceholderOption: function() {
            if (this.select) {
                var firstOption = this.select.children().first();
                if (this.opts.placeholderOption !== undefined ) {
                    //Determine the placeholder option based on the specified placeholderOption setting
                    return (this.opts.placeholderOption === "first" && firstOption) ||
                           (typeof this.opts.placeholderOption === "function" && this.opts.placeholderOption(this.select));
                } else if (firstOption.text() === "" && firstOption.val() === "") {
                    //No explicit placeholder option specified, use the first if it's blank
                    return firstOption;
                }
            }
        },

        /**
         * Get the desired width for the container element.  This is
         * derived first from option `width` passed to select2, then
         * the inline 'style' on the original element, and finally
         * falls back to the jQuery calculated element width.
         */
        // abstract
        initContainerWidth: function () {
            function resolveContainerWidth() {
                var style, attrs, matches, i, l;

                if (this.opts.width === "off") {
                    return null;
                } else if (this.opts.width === "element"){
                    return this.opts.element.outerWidth(false) === 0 ? 'auto' : this.opts.element.outerWidth(false) + 'px';
                } else if (this.opts.width === "copy" || this.opts.width === "resolve") {
                    // check if there is inline style on the element that contains width
                    style = this.opts.element.attr('style');
                    if (style !== undefined) {
                        attrs = style.split(';');
                        for (i = 0, l = attrs.length; i < l; i = i + 1) {
                            matches = attrs[i].replace(/\s/g, '')
                                .match(/[^-]width:(([-+]?([0-9]*\.)?[0-9]+)(px|em|ex|%|in|cm|mm|pt|pc))/i);
                            if (matches !== null && matches.length >= 1)
                                return matches[1];
                        }
                    }

                    if (this.opts.width === "resolve") {
                        // next check if css('width') can resolve a width that is percent based, this is sometimes possible
                        // when attached to input type=hidden or elements hidden via css
                        style = this.opts.element.css('width');
                        if (style.indexOf("%") > 0) return style;

                        // finally, fallback on the calculated width of the element
                        return (this.opts.element.outerWidth(false) === 0 ? 'auto' : this.opts.element.outerWidth(false) + 'px');
                    }

                    return null;
                } else if ($.isFunction(this.opts.width)) {
                    return this.opts.width();
                } else {
                    return this.opts.width;
               }
            };

            var width = resolveContainerWidth.call(this);
            if (width !== null) {
                this.container.css("width", width);
            }
        }
    });

    SingleSelect2 = clazz(AbstractSelect2, {

        // single

        createContainer: function () {
            var container = $(document.createElement("div")).attr({
                "class": "select2-container"
            }).html([
                "<a href='javascript:void(0)' onclick='return false;' class='select2-choice' tabindex='-1'>",
                "   <span class='select2-chosen'>&nbsp;</span><abbr class='select2-search-choice-close'></abbr>",
                "   <span class='select2-arrow'><b></b></span>",
                "</a>",
                "<input class='select2-focusser select2-offscreen' type='text'/>",
                "<div class='select2-drop select2-display-none'>",
                "   <div class='select2-search'>",
                "       <input type='text' autocomplete='off' autocorrect='off' autocapitalize='off' spellcheck='false' class='select2-input'/>",
                "   </div>",
                "   <ul class='select2-results'>",
                "   </ul>",
                "</div>"].join(""));
            return container;
        },

        // single
        enableInterface: function() {
            if (this.parent.enableInterface.apply(this, arguments)) {
                this.focusser.prop("disabled", !this.isInterfaceEnabled());
            }
        },

        // single
        opening: function () {
            var el, range, len;

            if (this.opts.minimumResultsForSearch >= 0) {
                this.showSearch(true);
            }

            this.parent.opening.apply(this, arguments);

            if (this.showSearchInput !== false) {
                // IE appends focusser.val() at the end of field :/ so we manually insert it at the beginning using a range
                // all other browsers handle this just fine

                this.search.val(this.focusser.val());
            }
            this.search.focus();
            // move the cursor to the end after focussing, otherwise it will be at the beginning and
            // new text will appear *before* focusser.val()
            el = this.search.get(0);
            if (el.createTextRange) {
                range = el.createTextRange();
                range.collapse(false);
                range.select();
            } else if (el.setSelectionRange) {
                len = this.search.val().length;
                el.setSelectionRange(len, len);
            }

            // initializes search's value with nextSearchTerm (if defined by user)
            // ignore nextSearchTerm if the dropdown is opened by the user pressing a letter
            if(this.search.val() === "") {
                if(this.nextSearchTerm != undefined){
                    this.search.val(this.nextSearchTerm);
                    this.search.select();
                }
            }

            this.focusser.prop("disabled", true).val("");
            this.updateResults(true);
            this.opts.element.trigger($.Event("select2-open"));
        },

        // single
        close: function (params) {
            if (!this.opened()) return;
            this.parent.close.apply(this, arguments);

            params = params || {focus: true};
            this.focusser.removeAttr("disabled");

            if (params.focus) {
                this.focusser.focus();
            }
        },

        // single
        focus: function () {
            if (this.opened()) {
                this.close();
            } else {
                this.focusser.removeAttr("disabled");
                this.focusser.focus();
            }
        },

        // single
        isFocused: function () {
            return this.container.hasClass("select2-container-active");
        },

        // single
        cancel: function () {
            this.parent.cancel.apply(this, arguments);
            this.focusser.removeAttr("disabled");
            this.focusser.focus();
        },

        // single
        destroy: function() {
            $("label[for='" + this.focusser.attr('id') + "']")
                .attr('for', this.opts.element.attr("id"));
            this.parent.destroy.apply(this, arguments);
        },

        // single
        initContainer: function () {

            var selection,
                container = this.container,
                dropdown = this.dropdown;

            if (this.opts.minimumResultsForSearch < 0) {
                this.showSearch(false);
            } else {
                this.showSearch(true);
            }

            this.selection = selection = container.find(".select2-choice");

            this.focusser = container.find(".select2-focusser");

            // rewrite labels from original element to focusser
            this.focusser.attr("id", "s2id_autogen"+nextUid());

            $("label[for='" + this.opts.element.attr("id") + "']")
                .attr('for', this.focusser.attr('id'));

            this.focusser.attr("tabindex", this.elementTabIndex);

            this.search.on("keydown", this.bind(function (e) {
                if (!this.isInterfaceEnabled()) return;

                if (e.which === KEY.PAGE_UP || e.which === KEY.PAGE_DOWN) {
                    // prevent the page from scrolling
                    killEvent(e);
                    return;
                }

                switch (e.which) {
                    case KEY.UP:
                    case KEY.DOWN:
                        this.moveHighlight((e.which === KEY.UP) ? -1 : 1);
                        killEvent(e);
                        return;
                    case KEY.ENTER:
                        this.selectHighlighted();
                        killEvent(e);
                        return;
                    case KEY.TAB:
                        this.selectHighlighted({noFocus: true});
                        return;
                    case KEY.ESC:
                        this.cancel(e);
                        killEvent(e);
                        return;
                }
            }));

            this.search.on("blur", this.bind(function(e) {
                // a workaround for chrome to keep the search field focussed when the scroll bar is used to scroll the dropdown.
                // without this the search field loses focus which is annoying
                if (document.activeElement === this.body().get(0)) {
                    window.setTimeout(this.bind(function() {
                        this.search.focus();
                    }), 0);
                }
            }));

            this.focusser.on("keydown", this.bind(function (e) {
                if (!this.isInterfaceEnabled()) return;

                if (e.which === KEY.TAB || KEY.isControl(e) || KEY.isFunctionKey(e) || e.which === KEY.ESC) {
                    return;
                }

                if (this.opts.openOnEnter === false && e.which === KEY.ENTER) {
                    killEvent(e);
                    return;
                }

                if (e.which == KEY.DOWN || e.which == KEY.UP
                    || (e.which == KEY.ENTER && this.opts.openOnEnter)) {

                    if (e.altKey || e.ctrlKey || e.shiftKey || e.metaKey) return;

                    this.open();
                    killEvent(e);
                    return;
                }

                if (e.which == KEY.DELETE || e.which == KEY.BACKSPACE) {
                    if (this.opts.allowClear) {
                        this.clear();
                    }
                    killEvent(e);
                    return;
                }
            }));


            installKeyUpChangeEvent(this.focusser);
            this.focusser.on("keyup-change input", this.bind(function(e) {
                if (this.opts.minimumResultsForSearch >= 0) {
                    e.stopPropagation();
                    if (this.opened()) return;
                    this.open();
                }
            }));

            selection.on("mousedown", "abbr", this.bind(function (e) {
                if (!this.isInterfaceEnabled()) return;
                this.clear();
                killEventImmediately(e);
                this.close();
                this.selection.focus();
            }));

            selection.on("mousedown", this.bind(function (e) {

                if (!this.container.hasClass("select2-container-active")) {
                    this.opts.element.trigger($.Event("select2-focus"));
                }

                if (this.opened()) {
                    this.close();
                } else if (this.isInterfaceEnabled()) {
                    this.open();
                }

                killEvent(e);
            }));

            dropdown.on("mousedown", this.bind(function() { this.search.focus(); }));

            selection.on("focus", this.bind(function(e) {
                killEvent(e);
            }));

            this.focusser.on("focus", this.bind(function(){
                if (!this.container.hasClass("select2-container-active")) {
                    this.opts.element.trigger($.Event("select2-focus"));
                }
                this.container.addClass("select2-container-active");
            })).on("blur", this.bind(function() {
                if (!this.opened()) {
                    this.container.removeClass("select2-container-active");
                    this.opts.element.trigger($.Event("select2-blur"));
                }
            }));
            this.search.on("focus", this.bind(function(){
                if (!this.container.hasClass("select2-container-active")) {
                    this.opts.element.trigger($.Event("select2-focus"));
                }
                this.container.addClass("select2-container-active");
            }));

            this.initContainerWidth();
            this.opts.element.addClass("select2-offscreen");
            this.setPlaceholder();

        },

        // single
        clear: function(triggerChange) {
            var data=this.selection.data("select2-data");
            if (data) { // guard against queued quick consecutive clicks
                var evt = $.Event("select2-clearing");
                this.opts.element.trigger(evt);
                if (evt.isDefaultPrevented()) {
                    return;
                }
                var placeholderOption = this.getPlaceholderOption();
                this.opts.element.val(placeholderOption ? placeholderOption.val() : "");
                this.selection.find(".select2-chosen").empty();
                this.selection.removeData("select2-data");
                this.setPlaceholder();

                if (triggerChange !== false){
                    this.opts.element.trigger({ type: "select2-removed", val: this.id(data), choice: data });
                    this.triggerChange({removed:data});
                }
            }
        },

        /**
         * Sets selection based on source element's value
         */
        // single
        initSelection: function () {
            var selected;
            if (this.isPlaceholderOptionSelected()) {
                this.updateSelection(null);
                this.close();
                this.setPlaceholder();
            } else {
                var self = this;
                this.opts.initSelection.call(null, this.opts.element, function(selected){
                    if (selected !== undefined && selected !== null) {
                        self.updateSelection(selected);
                        self.close();
                        self.setPlaceholder();
                    }
                });
            }
        },

        isPlaceholderOptionSelected: function() {
            var placeholderOption;
            if (!this.getPlaceholder()) return false; // no placeholder specified so no option should be considered
            return ((placeholderOption = this.getPlaceholderOption()) !== undefined && placeholderOption.is(':selected'))
                || (this.opts.element.val() === "")
                || (this.opts.element.val() === undefined)
                || (this.opts.element.val() === null);
        },

        // single
        prepareOpts: function () {
            var opts = this.parent.prepareOpts.apply(this, arguments),
                self=this;

            if (opts.element.get(0).tagName.toLowerCase() === "select") {
                // install the selection initializer
                opts.initSelection = function (element, callback) {
                    var selected = element.find(":selected");
                    // a single select box always has a value, no need to null check 'selected'
                    callback(self.optionToData(selected));
                };
            } else if ("data" in opts) {
                // install default initSelection when applied to hidden input and data is local
                opts.initSelection = opts.initSelection || function (element, callback) {
                    var id = element.val();
                    //search in data by id, storing the actual matching item
                    var match = null;
                    opts.query({
                        matcher: function(term, text, el){
                            var is_match = equal(id, opts.id(el));
                            if (is_match) {
                                match = el;
                            }
                            return is_match;
                        },
                        callback: !$.isFunction(callback) ? $.noop : function() {
                            callback(match);
                        }
                    });
                };
            }

            return opts;
        },

        // single
        getPlaceholder: function() {
            // if a placeholder is specified on a single select without a valid placeholder option ignore it
            if (this.select) {
                if (this.getPlaceholderOption() === undefined) {
                    return undefined;
                }
            }

            return this.parent.getPlaceholder.apply(this, arguments);
        },

        // single
        setPlaceholder: function () {
            var placeholder = this.getPlaceholder();

            if (this.isPlaceholderOptionSelected() && placeholder !== undefined) {

                // check for a placeholder option if attached to a select
                if (this.select && this.getPlaceholderOption() === undefined) return;

                this.selection.find(".select2-chosen").html(this.opts.escapeMarkup(placeholder));

                this.selection.addClass("select2-default");

                this.container.removeClass("select2-allowclear");
            }
        },

        // single
        postprocessResults: function (data, initial, noHighlightUpdate) {
            var selected = 0, self = this, showSearchInput = true;

            // find the selected element in the result list

            this.findHighlightableChoices().each2(function (i, elm) {
                if (equal(self.id(elm.data("select2-data")), self.opts.element.val())) {
                    selected = i;
                    return false;
                }
            });

            // and highlight it
            if (noHighlightUpdate !== false) {
                if (initial === true && selected >= 0) {
                    this.highlight(selected);
                } else {
                    this.highlight(0);
                }
            }

            // hide the search box if this is the first we got the results and there are enough of them for search

            if (initial === true) {
                var min = this.opts.minimumResultsForSearch;
                if (min >= 0) {
                    this.showSearch(countResults(data.results) >= min);
                }
            }
        },

        // single
        showSearch: function(showSearchInput) {
            if (this.showSearchInput === showSearchInput) return;

            this.showSearchInput = showSearchInput;

            this.dropdown.find(".select2-search").toggleClass("select2-search-hidden", !showSearchInput);
            this.dropdown.find(".select2-search").toggleClass("select2-offscreen", !showSearchInput);
            //add "select2-with-searchbox" to the container if search box is shown
            $(this.dropdown, this.container).toggleClass("select2-with-searchbox", showSearchInput);
        },

        // single
        onSelect: function (data, options) {

            if (!this.triggerSelect(data)) { return; }

            var old = this.opts.element.val(),
                oldData = this.data();

            this.opts.element.val(this.id(data));
            this.updateSelection(data);

            this.opts.element.trigger({ type: "select2-selected", val: this.id(data), choice: data });

            this.nextSearchTerm = this.opts.nextSearchTerm(data, this.search.val());
            this.close();

            if (!options || !options.noFocus)
                this.focusser.focus();

            if (!equal(old, this.id(data))) { this.triggerChange({added:data,removed:oldData}); }
        },

        // single
        updateSelection: function (data) {

            var container=this.selection.find(".select2-chosen"), formatted, cssClass;

            this.selection.data("select2-data", data);

            container.empty();
            if (data !== null) {
                formatted=this.opts.formatSelection(data, container, this.opts.escapeMarkup);
            }
            if (formatted !== undefined) {
                container.append(formatted);
            }
            cssClass=this.opts.formatSelectionCssClass(data, container);
            if (cssClass !== undefined) {
                container.addClass(cssClass);
            }

            this.selection.removeClass("select2-default");

            if (this.opts.allowClear && this.getPlaceholder() !== undefined) {
                this.container.addClass("select2-allowclear");
            }
        },

        // single
        val: function () {
            var val,
                triggerChange = false,
                data = null,
                self = this,
                oldData = this.data();

            if (arguments.length === 0) {
                return this.opts.element.val();
            }

            val = arguments[0];

            if (arguments.length > 1) {
                triggerChange = arguments[1];
            }

            if (this.select) {
                this.select
                    .val(val)
                    .find(":selected").each2(function (i, elm) {
                        data = self.optionToData(elm);
                        return false;
                    });
                this.updateSelection(data);
                this.setPlaceholder();
                if (triggerChange) {
                    this.triggerChange({added: data, removed:oldData});
                }
            } else {
                // val is an id. !val is true for [undefined,null,'',0] - 0 is legal
                if (!val && val !== 0) {
                    this.clear(triggerChange);
                    return;
                }
                if (this.opts.initSelection === undefined) {
                    throw new Error("cannot call val() if initSelection() is not defined");
                }
                this.opts.element.val(val);
                this.opts.initSelection(this.opts.element, function(data){
                    self.opts.element.val(!data ? "" : self.id(data));
                    self.updateSelection(data);
                    self.setPlaceholder();
                    if (triggerChange) {
                        self.triggerChange({added: data, removed:oldData});
                    }
                });
            }
        },

        // single
        clearSearch: function () {
            this.search.val("");
            this.focusser.val("");
        },

        // single
        data: function(value) {
            var data,
                triggerChange = false;

            if (arguments.length === 0) {
                data = this.selection.data("select2-data");
                if (data == undefined) data = null;
                return data;
            } else {
                if (arguments.length > 1) {
                    triggerChange = arguments[1];
                }
                if (!value) {
                    this.clear(triggerChange);
                } else {
                    data = this.data();
                    this.opts.element.val(!value ? "" : this.id(value));
                    this.updateSelection(value);
                    if (triggerChange) {
                        this.triggerChange({added: value, removed:data});
                    }
                }
            }
        }
    });

    MultiSelect2 = clazz(AbstractSelect2, {

        // multi
        createContainer: function () {
            var container = $(document.createElement("div")).attr({
                "class": "select2-container select2-container-multi"
            }).html([
                "<ul class='select2-choices'>",
                "  <li class='select2-search-field'>",
                "    <input type='text' autocomplete='off' autocorrect='off' autocapitalize='off' spellcheck='false' class='select2-input'>",
                "  </li>",
                "</ul>",
                "<div class='select2-drop select2-drop-multi select2-display-none'>",
                "   <ul class='select2-results'>",
                "   </ul>",
                "</div>"].join(""));
            return container;
        },

        // multi
        prepareOpts: function () {
            var opts = this.parent.prepareOpts.apply(this, arguments),
                self=this;

            // TODO validate placeholder is a string if specified

            if (opts.element.get(0).tagName.toLowerCase() === "select") {
                // install sthe selection initializer
                opts.initSelection = function (element, callback) {

                    var data = [];

                    element.find(":selected").each2(function (i, elm) {
                        data.push(self.optionToData(elm));
                    });
                    callback(data);
                };
            } else if ("data" in opts) {
                // install default initSelection when applied to hidden input and data is local
                opts.initSelection = opts.initSelection || function (element, callback) {
                    var ids = splitVal(element.val(), opts.separator);
                    //search in data by array of ids, storing matching items in a list
                    var matches = [];
                    opts.query({
                        matcher: function(term, text, el){
                            var is_match = $.grep(ids, function(id) {
                                return equal(id, opts.id(el));
                            }).length;
                            if (is_match) {
                                matches.push(el);
                            }
                            return is_match;
                        },
                        callback: !$.isFunction(callback) ? $.noop : function() {
                            // reorder matches based on the order they appear in the ids array because right now
                            // they are in the order in which they appear in data array
                            var ordered = [];
                            for (var i = 0; i < ids.length; i++) {
                                var id = ids[i];
                                for (var j = 0; j < matches.length; j++) {
                                    var match = matches[j];
                                    if (equal(id, opts.id(match))) {
                                        ordered.push(match);
                                        matches.splice(j, 1);
                                        break;
                                    }
                                }
                            }
                            callback(ordered);
                        }
                    });
                };
            }

            return opts;
        },

        selectChoice: function (choice) {

            var selected = this.container.find(".select2-search-choice-focus");
            if (selected.length && choice && choice[0] == selected[0]) {

            } else {
                if (selected.length) {
                    this.opts.element.trigger("choice-deselected", selected);
                }
                selected.removeClass("select2-search-choice-focus");
                if (choice && choice.length) {
                    this.close();
                    choice.addClass("select2-search-choice-focus");
                    this.opts.element.trigger("choice-selected", choice);
                }
            }
        },

        // multi
        destroy: function() {
            $("label[for='" + this.search.attr('id') + "']")
                .attr('for', this.opts.element.attr("id"));
            this.parent.destroy.apply(this, arguments);
        },

        // multi
        initContainer: function () {

            var selector = ".select2-choices", selection;

            this.searchContainer = this.container.find(".select2-search-field");
            this.selection = selection = this.container.find(selector);

            var _this = this;
            this.selection.on("click", ".select2-search-choice:not(.select2-locked)", function (e) {
                //killEvent(e);
                _this.search[0].focus();
                _this.selectChoice($(this));
            });

            // rewrite labels from original element to focusser
            this.search.attr("id", "s2id_autogen"+nextUid());
            $("label[for='" + this.opts.element.attr("id") + "']")
                .attr('for', this.search.attr('id'));

            this.search.on("input paste", this.bind(function() {
                if (!this.isInterfaceEnabled()) return;
                if (!this.opened()) {
                    this.open();
                }
            }));

            this.search.attr("tabindex", this.elementTabIndex);

            this.keydowns = 0;
            this.search.on("keydown", this.bind(function (e) {
                if (!this.isInterfaceEnabled()) return;

                ++this.keydowns;
                var selected = selection.find(".select2-search-choice-focus");
                var prev = selected.prev(".select2-search-choice:not(.select2-locked)");
                var next = selected.next(".select2-search-choice:not(.select2-locked)");
                var pos = getCursorInfo(this.search);

                if (selected.length &&
                    (e.which == KEY.LEFT || e.which == KEY.RIGHT || e.which == KEY.BACKSPACE || e.which == KEY.DELETE || e.which == KEY.ENTER)) {
                    var selectedChoice = selected;
                    if (e.which == KEY.LEFT && prev.length) {
                        selectedChoice = prev;
                    }
                    else if (e.which == KEY.RIGHT) {
                        selectedChoice = next.length ? next : null;
                    }
                    else if (e.which === KEY.BACKSPACE) {
                        this.unselect(selected.first());
                        this.search.width(10);
                        selectedChoice = prev.length ? prev : next;
                    } else if (e.which == KEY.DELETE) {
                        this.unselect(selected.first());
                        this.search.width(10);
                        selectedChoice = next.length ? next : null;
                    } else if (e.which == KEY.ENTER) {
                        selectedChoice = null;
                    }

                    this.selectChoice(selectedChoice);
                    killEvent(e);
                    if (!selectedChoice || !selectedChoice.length) {
                        this.open();
                    }
                    return;
                } else if (((e.which === KEY.BACKSPACE && this.keydowns == 1)
                    || e.which == KEY.LEFT) && (pos.offset == 0 && !pos.length)) {

                    this.selectChoice(selection.find(".select2-search-choice:not(.select2-locked)").last());
                    killEvent(e);
                    return;
                } else {
                    this.selectChoice(null);
                }

                if (this.opened()) {
                    switch (e.which) {
                    case KEY.UP:
                    case KEY.DOWN:
                        this.moveHighlight((e.which === KEY.UP) ? -1 : 1);
                        killEvent(e);
                        return;
                    case KEY.ENTER:
                        this.selectHighlighted();
                        killEvent(e);
                        return;
                    case KEY.TAB:
                        this.selectHighlighted({noFocus:true});
                        this.close();
                        return;
                    case KEY.ESC:
                        this.cancel(e);
                        killEvent(e);
                        return;
                    }
                }

                if (e.which === KEY.TAB || KEY.isControl(e) || KEY.isFunctionKey(e)
                 || e.which === KEY.BACKSPACE || e.which === KEY.ESC) {
                    return;
                }

                if (e.which === KEY.ENTER) {
                    if (this.opts.openOnEnter === false) {
                        return;
                    } else if (e.altKey || e.ctrlKey || e.shiftKey || e.metaKey) {
                        return;
                    }
                }

                this.open();

                if (e.which === KEY.PAGE_UP || e.which === KEY.PAGE_DOWN) {
                    // prevent the page from scrolling
                    killEvent(e);
                }

                if (e.which === KEY.ENTER) {
                    // prevent form from being submitted
                    killEvent(e);
                }

            }));

            this.search.on("keyup", this.bind(function (e) {
                this.keydowns = 0;
                this.resizeSearch();
            })
            );

            this.search.on("blur", this.bind(function(e) {
                this.container.removeClass("select2-container-active");
                this.search.removeClass("select2-focused");
                this.selectChoice(null);
                if (!this.opened()) this.clearSearch();
                e.stopImmediatePropagation();
                this.opts.element.trigger($.Event("select2-blur"));
            }));

            this.container.on("click", selector, this.bind(function (e) {
                if (!this.isInterfaceEnabled()) return;
                if ($(e.target).closest(".select2-search-choice").length > 0) {
                    // clicked inside a select2 search choice, do not open
                    return;
                }
                this.selectChoice(null);
                this.clearPlaceholder();
                if (!this.container.hasClass("select2-container-active")) {
                    this.opts.element.trigger($.Event("select2-focus"));
                }
                this.open();
                this.focusSearch();
                e.preventDefault();
            }));

            this.container.on("focus", selector, this.bind(function () {
                if (!this.isInterfaceEnabled()) return;
                if (!this.container.hasClass("select2-container-active")) {
                    this.opts.element.trigger($.Event("select2-focus"));
                }
                this.container.addClass("select2-container-active");
                this.dropdown.addClass("select2-drop-active");
                this.clearPlaceholder();
            }));

            this.initContainerWidth();
            this.opts.element.addClass("select2-offscreen");

            // set the placeholder if necessary
            this.clearSearch();
        },

        // multi
        enableInterface: function() {
            if (this.parent.enableInterface.apply(this, arguments)) {
                this.search.prop("disabled", !this.isInterfaceEnabled());
            }
        },

        // multi
        initSelection: function () {
            var data;
            if (this.opts.element.val() === "" && this.opts.element.text() === "") {
                this.updateSelection([]);
                this.close();
                // set the placeholder if necessary
                this.clearSearch();
            }
            if (this.select || this.opts.element.val() !== "") {
                var self = this;
                this.opts.initSelection.call(null, this.opts.element, function(data){
                    if (data !== undefined && data !== null) {
                        self.updateSelection(data);
                        self.close();
                        // set the placeholder if necessary
                        self.clearSearch();
                    }
                });
            }
        },

        // multi
        clearSearch: function () {
            var placeholder = this.getPlaceholder(),
                maxWidth = this.getMaxSearchWidth();

            if (placeholder !== undefined  && this.getVal().length === 0 && this.search.hasClass("select2-focused") === false) {
                this.search.val(placeholder).addClass("select2-default");
                // stretch the search box to full width of the container so as much of the placeholder is visible as possible
                // we could call this.resizeSearch(), but we do not because that requires a sizer and we do not want to create one so early because of a firefox bug, see #944
                this.search.width(maxWidth > 0 ? maxWidth : this.container.css("width"));
            } else {
                this.search.val("").width(10);
            }
        },

        // multi
        clearPlaceholder: function () {
            if (this.search.hasClass("select2-default")) {
                this.search.val("").removeClass("select2-default");
            }
        },

        // multi
        opening: function () {
            this.clearPlaceholder(); // should be done before super so placeholder is not used to search
            this.resizeSearch();

            this.parent.opening.apply(this, arguments);

            this.focusSearch();

            this.updateResults(true);
            this.search.focus();
            this.opts.element.trigger($.Event("select2-open"));
        },

        // multi
        close: function () {
            if (!this.opened()) return;
            this.parent.close.apply(this, arguments);
        },

        // multi
        focus: function () {
            this.close();
            this.search.focus();
        },

        // multi
        isFocused: function () {
            return this.search.hasClass("select2-focused");
        },

        // multi
        updateSelection: function (data) {
            var ids = [], filtered = [], self = this;

            // filter out duplicates
            $(data).each(function () {
                if (indexOf(self.id(this), ids) < 0) {
                    ids.push(self.id(this));
                    filtered.push(this);
                }
            });
            data = filtered;

            this.selection.find(".select2-search-choice").remove();
            $(data).each(function () {
                self.addSelectedChoice(this);
            });
            self.postprocessResults();
        },

        // multi
        tokenize: function() {
            var input = this.search.val();
            input = this.opts.tokenizer.call(this, input, this.data(), this.bind(this.onSelect), this.opts);
            if (input != null && input != undefined) {
                this.search.val(input);
                if (input.length > 0) {
                    this.open();
                }
            }

        },

        // multi
        onSelect: function (data, options) {

            if (!this.triggerSelect(data)) { return; }

            this.addSelectedChoice(data);

            this.opts.element.trigger({ type: "selected", val: this.id(data), choice: data });

            if (this.select || !this.opts.closeOnSelect) this.postprocessResults(data, false, this.opts.closeOnSelect===true);

            if (this.opts.closeOnSelect) {
                this.close();
                this.search.width(10);
            } else {
                if (this.countSelectableResults()>0) {
                    this.search.width(10);
                    this.resizeSearch();
                    if (this.getMaximumSelectionSize() > 0 && this.val().length >= this.getMaximumSelectionSize()) {
                        // if we reached max selection size repaint the results so choices
                        // are replaced with the max selection reached message
                        this.updateResults(true);
                    }
                    this.positionDropdown();
                } else {
                    // if nothing left to select close
                    this.close();
                    this.search.width(10);
                }
            }

            // since its not possible to select an element that has already been
            // added we do not need to check if this is a new element before firing change
            this.triggerChange({ added: data });

            if (!options || !options.noFocus)
                this.focusSearch();
        },

        // multi
        cancel: function () {
            this.close();
            this.focusSearch();
        },

        addSelectedChoice: function (data) {
            var enableChoice = !data.locked,
                enabledItem = $(
                    "<li class='select2-search-choice'>" +
                    "    <div></div>" +
                    "    <a href='#' onclick='return false;' class='select2-search-choice-close' tabindex='-1'></a>" +
                    "</li>"),
                disabledItem = $(
                    "<li class='select2-search-choice select2-locked'>" +
                    "<div></div>" +
                    "</li>");
            var choice = enableChoice ? enabledItem : disabledItem,
                id = this.id(data),
                val = this.getVal(),
                formatted,
                cssClass;

            formatted=this.opts.formatSelection(data, choice.find("div"), this.opts.escapeMarkup);
            if (formatted != undefined) {
                choice.find("div").replaceWith("<div>"+formatted+"</div>");
            }
            cssClass=this.opts.formatSelectionCssClass(data, choice.find("div"));
            if (cssClass != undefined) {
                choice.addClass(cssClass);
            }

            if(enableChoice){
              choice.find(".select2-search-choice-close")
                  .on("mousedown", killEvent)
                  .on("click dblclick", this.bind(function (e) {
                  if (!this.isInterfaceEnabled()) return;

                  $(e.target).closest(".select2-search-choice").fadeOut('fast', this.bind(function(){
                      this.unselect($(e.target));
                      this.selection.find(".select2-search-choice-focus").removeClass("select2-search-choice-focus");
                      this.close();
                      this.focusSearch();
                  })).dequeue();
                  killEvent(e);
              })).on("focus", this.bind(function () {
                  if (!this.isInterfaceEnabled()) return;
                  this.container.addClass("select2-container-active");
                  this.dropdown.addClass("select2-drop-active");
              }));
            }

            choice.data("select2-data", data);
            choice.insertBefore(this.searchContainer);

            val.push(id);
            this.setVal(val);
        },

        // multi
        unselect: function (selected) {
            var val = this.getVal(),
                data,
                index;

            selected = selected.closest(".select2-search-choice");

            if (selected.length === 0) {
                throw "Invalid argument: " + selected + ". Must be .select2-search-choice";
            }

            data = selected.data("select2-data");

            if (!data) {
                // prevent a race condition when the 'x' is clicked really fast repeatedly the event can be queued
                // and invoked on an element already removed
                return;
            }

            while((index = indexOf(this.id(data), val)) >= 0) {
                val.splice(index, 1);
                this.setVal(val);
                if (this.select) this.postprocessResults();
            }
            selected.remove();

            this.opts.element.trigger({ type: "removed", val: this.id(data), choice: data });
            this.triggerChange({ removed: data });
        },

        // multi
        postprocessResults: function (data, initial, noHighlightUpdate) {
            var val = this.getVal(),
                choices = this.results.find(".select2-result"),
                compound = this.results.find(".select2-result-with-children"),
                self = this;

            choices.each2(function (i, choice) {
                var id = self.id(choice.data("select2-data"));
                if (indexOf(id, val) >= 0) {
                    choice.addClass("select2-selected");
                    // mark all children of the selected parent as selected
                    choice.find(".select2-result-selectable").addClass("select2-selected");
                }
            });

            compound.each2(function(i, choice) {
                // hide an optgroup if it doesnt have any selectable children
                if (!choice.is('.select2-result-selectable')
                    && choice.find(".select2-result-selectable:not(.select2-selected)").length === 0) {
                    choice.addClass("select2-selected");
                }
            });

            if (this.highlight() == -1 && noHighlightUpdate !== false){
                self.highlight(0);
            }

            //If all results are chosen render formatNoMAtches
            if(!this.opts.createSearchChoice && !choices.filter('.select2-result:not(.select2-selected)').length > 0){
                if(!data || data && !data.more && this.results.find(".select2-no-results").length === 0) {
                    if (checkFormatter(self.opts.formatNoMatches, "formatNoMatches")) {
                        this.results.append("<li class='select2-no-results'>" + self.opts.formatNoMatches(self.search.val()) + "</li>");
                    }
                }
            }

        },

        // multi
        getMaxSearchWidth: function() {
            return this.selection.width() - getSideBorderPadding(this.search);
        },

        // multi
        resizeSearch: function () {
            var minimumWidth, left, maxWidth, containerLeft, searchWidth,
                sideBorderPadding = getSideBorderPadding(this.search);

            minimumWidth = measureTextWidth(this.search) + 10;

            left = this.search.offset().left;

            maxWidth = this.selection.width();
            containerLeft = this.selection.offset().left;

            searchWidth = maxWidth - (left - containerLeft) - sideBorderPadding;

            if (searchWidth < minimumWidth) {
                searchWidth = maxWidth - sideBorderPadding;
            }

            if (searchWidth < 40) {
                searchWidth = maxWidth - sideBorderPadding;
            }

            if (searchWidth <= 0) {
              searchWidth = minimumWidth;
            }

            this.search.width(Math.floor(searchWidth));
        },

        // multi
        getVal: function () {
            var val;
            if (this.select) {
                val = this.select.val();
                return val === null ? [] : val;
            } else {
                val = this.opts.element.val();
                return splitVal(val, this.opts.separator);
            }
        },

        // multi
        setVal: function (val) {
            var unique;
            if (this.select) {
                this.select.val(val);
            } else {
                unique = [];
                // filter out duplicates
                $(val).each(function () {
                    if (indexOf(this, unique) < 0) unique.push(this);
                });
                this.opts.element.val(unique.length === 0 ? "" : unique.join(this.opts.separator));
            }
        },

        // multi
        buildChangeDetails: function (old, current) {
            var current = current.slice(0),
                old = old.slice(0);

            // remove intersection from each array
            for (var i = 0; i < current.length; i++) {
                for (var j = 0; j < old.length; j++) {
                    if (equal(this.opts.id(current[i]), this.opts.id(old[j]))) {
                        current.splice(i, 1);
                        i--;
                        old.splice(j, 1);
                        j--;
                    }
                }
            }

            return {added: current, removed: old};
        },


        // multi
        val: function (val, triggerChange) {
            var oldData, self=this, changeDetails;

            if (arguments.length === 0) {
                return this.getVal();
            }

            oldData=this.data();
            if (!oldData.length) oldData=[];

            // val is an id. !val is true for [undefined,null,'',0] - 0 is legal
            if (!val && val !== 0) {
                this.opts.element.val("");
                this.updateSelection([]);
                this.clearSearch();
                if (triggerChange) {
                    this.triggerChange({added: this.data(), removed: oldData});
                }
                return;
            }

            // val is a list of ids
            this.setVal(val);

            if (this.select) {
                this.opts.initSelection(this.select, this.bind(this.updateSelection));
                if (triggerChange) {
                    this.triggerChange(this.buildChangeDetails(oldData, this.data()));
                }
            } else {
                if (this.opts.initSelection === undefined) {
                    throw new Error("val() cannot be called if initSelection() is not defined");
                }

                this.opts.initSelection(this.opts.element, function(data){
                    var ids=$.map(data, self.id);
                    self.setVal(ids);
                    self.updateSelection(data);
                    self.clearSearch();
                    if (triggerChange) {
                        self.triggerChange(self.buildChangeDetails(oldData, this.data()));
                    }
                });
            }
            this.clearSearch();
        },

        // multi
        onSortStart: function() {
            if (this.select) {
                throw new Error("Sorting of elements is not supported when attached to <select>. Attach to <input type='hidden'/> instead.");
            }

            // collapse search field into 0 width so its container can be collapsed as well
            this.search.width(0);
            // hide the container
            this.searchContainer.hide();
        },

        // multi
        onSortEnd:function() {

            var val=[], self=this;

            // show search and move it to the end of the list
            this.searchContainer.show();
            // make sure the search container is the last item in the list
            this.searchContainer.appendTo(this.searchContainer.parent());
            // since we collapsed the width in dragStarted, we resize it here
            this.resizeSearch();

            // update selection
            this.selection.find(".select2-search-choice").each(function() {
                val.push(self.opts.id($(this).data("select2-data")));
            });
            this.setVal(val);
            this.triggerChange();
        },

        // multi
        data: function(values, triggerChange) {
            var self=this, ids, old;
            if (arguments.length === 0) {
                 return this.selection
                     .find(".select2-search-choice")
                     .map(function() { return $(this).data("select2-data"); })
                     .get();
            } else {
                old = this.data();
                if (!values) { values = []; }
                ids = $.map(values, function(e) { return self.opts.id(e); });
                this.setVal(ids);
                this.updateSelection(values);
                this.clearSearch();
                if (triggerChange) {
                    this.triggerChange(this.buildChangeDetails(old, this.data()));
                }
            }
        }
    });

    $.fn.select2 = function () {

        var args = Array.prototype.slice.call(arguments, 0),
            opts,
            select2,
            method, value, multiple,
            allowedMethods = ["val", "destroy", "opened", "open", "close", "focus", "isFocused", "container", "dropdown", "onSortStart", "onSortEnd", "enable", "disable", "readonly", "positionDropdown", "data", "search"],
            valueMethods = ["opened", "isFocused", "container", "dropdown"],
            propertyMethods = ["val", "data"],
            methodsMap = { search: "externalSearch" };

        this.each(function () {
            if (args.length === 0 || typeof(args[0]) === "object") {
                opts = args.length === 0 ? {} : $.extend({}, args[0]);
                opts.element = $(this);

                if (opts.element.get(0).tagName.toLowerCase() === "select") {
                    multiple = opts.element.prop("multiple");
                } else {
                    multiple = opts.multiple || false;
                    if ("tags" in opts) {opts.multiple = multiple = true;}
                }

                select2 = multiple ? new MultiSelect2() : new SingleSelect2();
                select2.init(opts);
            } else if (typeof(args[0]) === "string") {

                if (indexOf(args[0], allowedMethods) < 0) {
                    throw "Unknown method: " + args[0];
                }

                value = undefined;
                select2 = $(this).data("select2");
                if (select2 === undefined) return;

                method=args[0];

                if (method === "container") {
                    value = select2.container;
                } else if (method === "dropdown") {
                    value = select2.dropdown;
                } else {
                    if (methodsMap[method]) method = methodsMap[method];

                    value = select2[method].apply(select2, args.slice(1));
                }
                if (indexOf(args[0], valueMethods) >= 0
                    || (indexOf(args[0], propertyMethods) && args.length == 1)) {
                    return false; // abort the iteration, ready to return first matched value
                }
            } else {
                throw "Invalid arguments to select2 plugin: " + args;
            }
        });
        return (value === undefined) ? this : value;
    };

    // plugin defaults, accessible to users
    $.fn.select2.defaults = {
        width: "copy",
        loadMorePadding: 0,
        closeOnSelect: true,
        openOnEnter: true,
        containerCss: {},
        dropdownCss: {},
        containerCssClass: "",
        dropdownCssClass: "",
        formatResult: function(result, container, query, escapeMarkup) {
            var markup=[];
            markMatch(result.text, query.term, markup, escapeMarkup);
            return markup.join("");
        },
        formatSelection: function (data, container, escapeMarkup) {
            return data ? escapeMarkup(data.text) : undefined;
        },
        sortResults: function (results, container, query) {
            return results;
        },
        formatResultCssClass: function(data) {return undefined;},
        formatSelectionCssClass: function(data, container) {return undefined;},
        formatNoMatches: function () { return "No matches found"; },
        formatInputTooShort: function (input, min) { var n = min - input.length; return "Please enter " + n + " more character" + (n == 1? "" : "s"); },
        formatInputTooLong: function (input, max) { var n = input.length - max; return "Please delete " + n + " character" + (n == 1? "" : "s"); },
        formatSelectionTooBig: function (limit) { return "You can only select " + limit + " item" + (limit == 1 ? "" : "s"); },
        formatLoadMore: function (pageNumber) { return "Loading more results..."; },
        formatSearching: function () { return "Searching..."; },
        minimumResultsForSearch: 0,
        minimumInputLength: 0,
        maximumInputLength: null,
        maximumSelectionSize: 0,
        id: function (e) { return e.id; },
        matcher: function(term, text) {
            return stripDiacritics(''+text).toUpperCase().indexOf(stripDiacritics(''+term).toUpperCase()) >= 0;
        },
        separator: ",",
        tokenSeparators: [],
        tokenizer: defaultTokenizer,
        escapeMarkup: defaultEscapeMarkup,
        blurOnChange: false,
        selectOnBlur: false,
        adaptContainerCssClass: function(c) { return c; },
        adaptDropdownCssClass: function(c) { return null; },
        nextSearchTerm: function(selectedObject, currentSearchTerm) { return undefined; }
    };

    $.fn.select2.ajaxDefaults = {
        transport: $.ajax,
        params: {
            type: "GET",
            cache: false,
            dataType: "json"
        }
    };

    // exports
    window.Select2 = {
        query: {
            ajax: ajax,
            local: local,
            tags: tags
        }, util: {
            debounce: debounce,
            markMatch: markMatch,
            escapeMarkup: defaultEscapeMarkup,
            stripDiacritics: stripDiacritics
        }, "class": {
            "abstract": AbstractSelect2,
            "single": SingleSelect2,
            "multi": MultiSelect2
        }
    };

}(jQuery));
;
/**
 * @file
 * Override Overlay's module Drupal.overlay.refreshRegions().
 */

(function ($) {

/**
 * Refresh any regions of the page that are displayed outside the overlay.
 *
 * The original "Drupal.settings.basePath + Drupal.settings.overlay.ajaxCallback"
 * However that doesn't take PURL into account.
 *
 * @param data
 *   An array of objects with information on the page regions to be refreshed.
 *   For each object, the key is a CSS class identifying the region to be
 *   refreshed, and the value represents the section of the Drupal $page array
 *   corresponding to this region.
 */
  function refreshRegions(data) {
    $.each(data, function () {
      var region_info = this;
      $.each(region_info, function (regionClass) {
        var regionName = region_info[regionClass];
        var regionSelector = '.' + regionClass;
        // Allow special behaviors to detach.
        Drupal.detachBehaviors($(regionSelector));

        // This is where we override Overlay, and use our PURLified ajax callback
        // URL.
        $.get(Drupal.settings.overlay.ajaxCallback + '/' + regionName, function (newElement) {
          $(regionSelector).replaceWith($(newElement));
          Drupal.attachBehaviors($(regionSelector), Drupal.settings);
        });
      });
    });
  };

  function swap() {
    if (Drupal.overlay) {
      Drupal.overlay.refreshRegions = refreshRegions;
    }
    else {
      setTimeout(swap, 10)
    }
  }

  swap();

})(jQuery);
;
(function ($) {
  Drupal.behaviors.osSelect2Widget = {
    // Add Select2 functionality to select fields.

    attach: function (context, settings) {

      // Get needed data about all select elements that should be using Select2.
      var elements = Drupal.settings.select2_widget;
      var element;

      // Run through elements and add Select2 functionality to each of them.
      for (var key in elements) {
        element = elements[key];

        var selector = element.selector;
        var cardinality = element.cardinality;

        $(selector).select2({
          maximumSelectionSize: cardinality
        });
      }

    }
  }
})(jQuery);

;
/*!
 * ui-select
 * http://github.com/angular-ui/ui-select
 * Version: 0.12.0 - 2015-06-17T17:45:36.175Z
 * License: MIT
 */


(function () { 
"use strict";

var KEY = {
    TAB: 9,
    ENTER: 13,
    ESC: 27,
    SPACE: 32,
    LEFT: 37,
    UP: 38,
    RIGHT: 39,
    DOWN: 40,
    SHIFT: 16,
    CTRL: 17,
    ALT: 18,
    PAGE_UP: 33,
    PAGE_DOWN: 34,
    HOME: 36,
    END: 35,
    BACKSPACE: 8,
    DELETE: 46,
    COMMAND: 91,

    MAP: { 91 : "COMMAND", 8 : "BACKSPACE" , 9 : "TAB" , 13 : "ENTER" , 16 : "SHIFT" , 17 : "CTRL" , 18 : "ALT" , 19 : "PAUSEBREAK" , 20 : "CAPSLOCK" , 27 : "ESC" , 32 : "SPACE" , 33 : "PAGE_UP", 34 : "PAGE_DOWN" , 35 : "END" , 36 : "HOME" , 37 : "LEFT" , 38 : "UP" , 39 : "RIGHT" , 40 : "DOWN" , 43 : "+" , 44 : "PRINTSCREEN" , 45 : "INSERT" , 46 : "DELETE", 48 : "0" , 49 : "1" , 50 : "2" , 51 : "3" , 52 : "4" , 53 : "5" , 54 : "6" , 55 : "7" , 56 : "8" , 57 : "9" , 59 : ";", 61 : "=" , 65 : "A" , 66 : "B" , 67 : "C" , 68 : "D" , 69 : "E" , 70 : "F" , 71 : "G" , 72 : "H" , 73 : "I" , 74 : "J" , 75 : "K" , 76 : "L", 77 : "M" , 78 : "N" , 79 : "O" , 80 : "P" , 81 : "Q" , 82 : "R" , 83 : "S" , 84 : "T" , 85 : "U" , 86 : "V" , 87 : "W" , 88 : "X" , 89 : "Y" , 90 : "Z", 96 : "0" , 97 : "1" , 98 : "2" , 99 : "3" , 100 : "4" , 101 : "5" , 102 : "6" , 103 : "7" , 104 : "8" , 105 : "9", 106 : "*" , 107 : "+" , 109 : "-" , 110 : "." , 111 : "/", 112 : "F1" , 113 : "F2" , 114 : "F3" , 115 : "F4" , 116 : "F5" , 117 : "F6" , 118 : "F7" , 119 : "F8" , 120 : "F9" , 121 : "F10" , 122 : "F11" , 123 : "F12", 144 : "NUMLOCK" , 145 : "SCROLLLOCK" , 186 : ";" , 187 : "=" , 188 : "," , 189 : "-" , 190 : "." , 191 : "/" , 192 : "`" , 219 : "[" , 220 : "\\" , 221 : "]" , 222 : "'"
    },

    isControl: function (e) {
        var k = e.which;
        switch (k) {
        case KEY.COMMAND:
        case KEY.SHIFT:
        case KEY.CTRL:
        case KEY.ALT:
            return true;
        }

        if (e.metaKey) return true;

        return false;
    },
    isFunctionKey: function (k) {
        k = k.which ? k.which : k;
        return k >= 112 && k <= 123;
    },
    isVerticalMovement: function (k){
      return ~[KEY.UP, KEY.DOWN].indexOf(k);
    },
    isHorizontalMovement: function (k){
      return ~[KEY.LEFT,KEY.RIGHT,KEY.BACKSPACE,KEY.DELETE].indexOf(k);
    }
  };

/**
 * Add querySelectorAll() to jqLite.
 *
 * jqLite find() is limited to lookups by tag name.
 * TODO This will change with future versions of AngularJS, to be removed when this happens
 *
 * See jqLite.find - why not use querySelectorAll? https://github.com/angular/angular.js/issues/3586
 * See feat(jqLite): use querySelectorAll instead of getElementsByTagName in jqLite.find https://github.com/angular/angular.js/pull/3598
 */
if (angular.element.prototype.querySelectorAll === undefined) {
  angular.element.prototype.querySelectorAll = function(selector) {
    return angular.element(this[0].querySelectorAll(selector));
  };
}

/**
 * Add closest() to jqLite.
 */
if (angular.element.prototype.closest === undefined) {
  angular.element.prototype.closest = function( selector) {
    var elem = this[0];
    var matchesSelector = elem.matches || elem.webkitMatchesSelector || elem.mozMatchesSelector || elem.msMatchesSelector;

    while (elem) {
      if (matchesSelector.bind(elem)(selector)) {
        return elem;
      } else {
        elem = elem.parentElement;
      }
    }
    return false;
  };
}

var latestId = 0;

var uis = angular.module('ui.select', [])

.constant('uiSelectConfig', {
  theme: 'bootstrap',
  searchEnabled: true,
  sortable: false,
  placeholder: '', // Empty by default, like HTML tag <select>
  refreshDelay: 1000, // In milliseconds
  closeOnSelect: true,
  generateId: function() {
    return latestId++;
  },
  appendToBody: false
})

// See Rename minErr and make it accessible from outside https://github.com/angular/angular.js/issues/6913
.service('uiSelectMinErr', function() {
  var minErr = angular.$$minErr('ui.select');
  return function() {
    var error = minErr.apply(this, arguments);
    var message = error.message.replace(new RegExp('\nhttp://errors.angularjs.org/.*'), '');
    return new Error(message);
  };
})

// Recreates old behavior of ng-transclude. Used internally.
.directive('uisTranscludeAppend', function () {
  return {
    link: function (scope, element, attrs, ctrl, transclude) {
        transclude(scope, function (clone) {
          element.append(clone);
        });
      }
    };
})

/**
 * Highlights text that matches $select.search.
 *
 * Taken from AngularUI Bootstrap Typeahead
 * See https://github.com/angular-ui/bootstrap/blob/0.10.0/src/typeahead/typeahead.js#L340
 */
.filter('highlight', function() {
  function escapeRegexp(queryToEscape) {
    return queryToEscape.replace(/([.?*+^$[\]\\(){}|-])/g, '\\$1');
  }

  return function(matchItem, query) {
    return query && matchItem ? matchItem.replace(new RegExp(escapeRegexp(query), 'gi'), '<span class="ui-select-highlight">$&</span>') : matchItem;
  };
})

/**
 * A read-only equivalent of jQuery's offset function: http://api.jquery.com/offset/
 *
 * Taken from AngularUI Bootstrap Position:
 * See https://github.com/angular-ui/bootstrap/blob/master/src/position/position.js#L70
 */
.factory('uisOffset',
  ['$document', '$window',
  function ($document, $window) {

  return function(element) {
    var boundingClientRect = element[0].getBoundingClientRect();
    return {
      width: boundingClientRect.width || element.prop('offsetWidth'),
      height: boundingClientRect.height || element.prop('offsetHeight'),
      top: boundingClientRect.top + ($window.pageYOffset || $document[0].documentElement.scrollTop),
      left: boundingClientRect.left + ($window.pageXOffset || $document[0].documentElement.scrollLeft)
    };
  };
}]);

uis.directive('uiSelectChoices',
  ['uiSelectConfig', 'uisRepeatParser', 'uiSelectMinErr', '$compile',
  function(uiSelectConfig, RepeatParser, uiSelectMinErr, $compile) {

  return {
    restrict: 'EA',
    require: '^uiSelect',
    replace: true,
    transclude: true,
    templateUrl: function(tElement) {
      // Gets theme attribute from parent (ui-select)
      var theme = tElement.parent().attr('theme') || uiSelectConfig.theme;
      return theme + '/choices.tpl.html';
    },

    compile: function(tElement, tAttrs) {

      if (!tAttrs.repeat) throw uiSelectMinErr('repeat', "Expected 'repeat' expression.");

      return function link(scope, element, attrs, $select, transcludeFn) {

        // var repeat = RepeatParser.parse(attrs.repeat);
        var groupByExp = attrs.groupBy;
        var groupFilterExp = attrs.groupFilter;

        $select.parseRepeatAttr(attrs.repeat, groupByExp, groupFilterExp); //Result ready at $select.parserResult

        $select.disableChoiceExpression = attrs.uiDisableChoice;
        $select.onHighlightCallback = attrs.onHighlight;

        if(groupByExp) {
          var groups = element.querySelectorAll('.ui-select-choices-group');
          if (groups.length !== 1) throw uiSelectMinErr('rows', "Expected 1 .ui-select-choices-group but got '{0}'.", groups.length);
          groups.attr('ng-repeat', RepeatParser.getGroupNgRepeatExpression());
        }

        var choices = element.querySelectorAll('.ui-select-choices-row');
        if (choices.length !== 1) {
          throw uiSelectMinErr('rows', "Expected 1 .ui-select-choices-row but got '{0}'.", choices.length);
        }

        choices.attr('ng-repeat', RepeatParser.getNgRepeatExpression($select.parserResult.itemName, '$select.items', $select.parserResult.trackByExp, groupByExp))
            .attr('ng-if', '$select.open') //Prevent unnecessary watches when dropdown is closed
            .attr('ng-mouseenter', '$select.setActiveItem('+$select.parserResult.itemName +')')
            .attr('ng-click', '$select.select(' + $select.parserResult.itemName + ',false,$event)');

        var rowsInner = element.querySelectorAll('.ui-select-choices-row-inner');
        if (rowsInner.length !== 1) throw uiSelectMinErr('rows', "Expected 1 .ui-select-choices-row-inner but got '{0}'.", rowsInner.length);
        rowsInner.attr('uis-transclude-append', ''); //Adding uisTranscludeAppend directive to row element after choices element has ngRepeat

        $compile(element, transcludeFn)(scope); //Passing current transcludeFn to be able to append elements correctly from uisTranscludeAppend

        scope.$watch('$select.search', function(newValue) {
          if(newValue && !$select.open && $select.multiple) $select.activate(false, true);
          $select.activeIndex = $select.tagging.isActivated ? -1 : 0;
          $select.refresh(attrs.refresh);
        });

        attrs.$observe('refreshDelay', function() {
          // $eval() is needed otherwise we get a string instead of a number
          var refreshDelay = scope.$eval(attrs.refreshDelay);
          $select.refreshDelay = refreshDelay !== undefined ? refreshDelay : uiSelectConfig.refreshDelay;
        });
      };
    }
  };
}]);

/**
 * Contains ui-select "intelligence".
 *
 * The goal is to limit dependency on the DOM whenever possible and
 * put as much logic in the controller (instead of the link functions) as possible so it can be easily tested.
 */
uis.controller('uiSelectCtrl',
  ['$scope', '$element', '$timeout', '$filter', 'uisRepeatParser', 'uiSelectMinErr', 'uiSelectConfig',
  function($scope, $element, $timeout, $filter, RepeatParser, uiSelectMinErr, uiSelectConfig) {

  var ctrl = this;

  var EMPTY_SEARCH = '';

  ctrl.placeholder = uiSelectConfig.placeholder;
  ctrl.searchEnabled = uiSelectConfig.searchEnabled;
  ctrl.sortable = uiSelectConfig.sortable;
  ctrl.refreshDelay = uiSelectConfig.refreshDelay;

  ctrl.removeSelected = false; //If selected item(s) should be removed from dropdown list
  ctrl.closeOnSelect = true; //Initialized inside uiSelect directive link function
  ctrl.search = EMPTY_SEARCH;

  ctrl.activeIndex = 0; //Dropdown of choices
  ctrl.items = []; //All available choices

  ctrl.open = false;
  ctrl.focus = false;
  ctrl.disabled = false;
  ctrl.selected = undefined;

  ctrl.focusser = undefined; //Reference to input element used to handle focus events
  ctrl.resetSearchInput = true;
  ctrl.multiple = undefined; // Initialized inside uiSelect directive link function
  ctrl.disableChoiceExpression = undefined; // Initialized inside uiSelectChoices directive link function
  ctrl.tagging = {isActivated: false, fct: undefined};
  ctrl.taggingTokens = {isActivated: false, tokens: undefined};
  ctrl.lockChoiceExpression = undefined; // Initialized inside uiSelectMatch directive link function
  ctrl.clickTriggeredSelect = false;
  ctrl.$filter = $filter;

  ctrl.searchInput = $element.querySelectorAll('input.ui-select-search');
  if (ctrl.searchInput.length !== 1) {
    throw uiSelectMinErr('searchInput', "Expected 1 input.ui-select-search but got '{0}'.", ctrl.searchInput.length);
  }
  
  ctrl.isEmpty = function() {
    return angular.isUndefined(ctrl.selected) || ctrl.selected === null || ctrl.selected === '';
  };

  // Most of the time the user does not want to empty the search input when in typeahead mode
  function _resetSearchInput() {
    if (ctrl.resetSearchInput || (ctrl.resetSearchInput === undefined && uiSelectConfig.resetSearchInput)) {
      ctrl.search = EMPTY_SEARCH;
      //reset activeIndex
      if (ctrl.selected && ctrl.items.length && !ctrl.multiple) {
        ctrl.activeIndex = ctrl.items.indexOf(ctrl.selected);
      }
    }
  }

    function _groupsFilter(groups, groupNames) {
      var i, j, result = [];
      for(i = 0; i < groupNames.length ;i++){
        for(j = 0; j < groups.length ;j++){
          if(groups[j].name == [groupNames[i]]){
            result.push(groups[j]);
          }
        }
      }
      return result;
    }

  // When the user clicks on ui-select, displays the dropdown list
  ctrl.activate = function(initSearchValue, avoidReset) {
    if (!ctrl.disabled  && !ctrl.open) {
      if(!avoidReset) _resetSearchInput();

      $scope.$broadcast('uis:activate');

      ctrl.open = true;

      ctrl.activeIndex = ctrl.activeIndex >= ctrl.items.length ? 0 : ctrl.activeIndex;

      // ensure that the index is set to zero for tagging variants
      // that where first option is auto-selected
      if ( ctrl.activeIndex === -1 && ctrl.taggingLabel !== false ) {
        ctrl.activeIndex = 0;
      }

      // Give it time to appear before focus
      $timeout(function() {
        ctrl.search = initSearchValue || ctrl.search;
        ctrl.searchInput[0].focus();
      });
    }
  };

  ctrl.findGroupByName = function(name) {
    return ctrl.groups && ctrl.groups.filter(function(group) {
      return group.name === name;
    })[0];
  };

  ctrl.parseRepeatAttr = function(repeatAttr, groupByExp, groupFilterExp) {
    function updateGroups(items) {
      var groupFn = $scope.$eval(groupByExp);
      ctrl.groups = [];
      angular.forEach(items, function(item) {
        var groupName = angular.isFunction(groupFn) ? groupFn(item) : item[groupFn];
        var group = ctrl.findGroupByName(groupName);
        if(group) {
          group.items.push(item);
        }
        else {
          ctrl.groups.push({name: groupName, items: [item]});
        }
      });
      if(groupFilterExp){
        var groupFilterFn = $scope.$eval(groupFilterExp);
        if( angular.isFunction(groupFilterFn)){
          ctrl.groups = groupFilterFn(ctrl.groups);
        } else if(angular.isArray(groupFilterFn)){
          ctrl.groups = _groupsFilter(ctrl.groups, groupFilterFn);
        }
      }
      ctrl.items = [];
      ctrl.groups.forEach(function(group) {
        ctrl.items = ctrl.items.concat(group.items);
      });
    }

    function setPlainItems(items) {
      ctrl.items = items;
    }

    ctrl.setItemsFn = groupByExp ? updateGroups : setPlainItems;

    ctrl.parserResult = RepeatParser.parse(repeatAttr);

    ctrl.isGrouped = !!groupByExp;
    ctrl.itemProperty = ctrl.parserResult.itemName;

    ctrl.refreshItems = function (data){
      data = data || ctrl.parserResult.source($scope);
      var selectedItems = ctrl.selected;
      //TODO should implement for single mode removeSelected
      if ((angular.isArray(selectedItems) && !selectedItems.length) || !ctrl.removeSelected) {
        ctrl.setItemsFn(data);
      }else{
        if ( data !== undefined ) {
          var filteredItems = data.filter(function(i) {return selectedItems.indexOf(i) < 0;});
          ctrl.setItemsFn(filteredItems);
        }
      }
    };

    // See https://github.com/angular/angular.js/blob/v1.2.15/src/ng/directive/ngRepeat.js#L259
    $scope.$watchCollection(ctrl.parserResult.source, function(items) {
      if (items === undefined || items === null) {
        // If the user specifies undefined or null => reset the collection
        // Special case: items can be undefined if the user did not initialized the collection on the scope
        // i.e $scope.addresses = [] is missing
        ctrl.items = [];
      } else {
        if (!angular.isArray(items)) {
          throw uiSelectMinErr('items', "Expected an array but got '{0}'.", items);
        } else {
          //Remove already selected items (ex: while searching)
          //TODO Should add a test
          ctrl.refreshItems(items);
          ctrl.ngModel.$modelValue = null; //Force scope model value and ngModel value to be out of sync to re-run formatters
        }
      }
    });

  };

  var _refreshDelayPromise;

  /**
   * Typeahead mode: lets the user refresh the collection using his own function.
   *
   * See Expose $select.search for external / remote filtering https://github.com/angular-ui/ui-select/pull/31
   */
  ctrl.refresh = function(refreshAttr) {
    if (refreshAttr !== undefined) {

      // Debounce
      // See https://github.com/angular-ui/bootstrap/blob/0.10.0/src/typeahead/typeahead.js#L155
      // FYI AngularStrap typeahead does not have debouncing: https://github.com/mgcrea/angular-strap/blob/v2.0.0-rc.4/src/typeahead/typeahead.js#L177
      if (_refreshDelayPromise) {
        $timeout.cancel(_refreshDelayPromise);
      }
      _refreshDelayPromise = $timeout(function() {
        $scope.$eval(refreshAttr);
      }, ctrl.refreshDelay);
    }
  };

  ctrl.setActiveItem = function(item) {
    ctrl.activeIndex = ctrl.items.indexOf(item);
  };

  ctrl.isActive = function(itemScope) {
    if ( !ctrl.open ) {
      return false;
    }
    var itemIndex = ctrl.items.indexOf(itemScope[ctrl.itemProperty]);
    var isActive =  itemIndex === ctrl.activeIndex;

    if ( !isActive || ( itemIndex < 0 && ctrl.taggingLabel !== false ) ||( itemIndex < 0 && ctrl.taggingLabel === false) ) {
      return false;
    }

    if (isActive && !angular.isUndefined(ctrl.onHighlightCallback)) {
      itemScope.$eval(ctrl.onHighlightCallback);
    }

    return isActive;
  };

  ctrl.isDisabled = function(itemScope) {

    if (!ctrl.open) return;

    var itemIndex = ctrl.items.indexOf(itemScope[ctrl.itemProperty]);
    var isDisabled = false;
    var item;

    if (itemIndex >= 0 && !angular.isUndefined(ctrl.disableChoiceExpression)) {
      item = ctrl.items[itemIndex];
      isDisabled = !!(itemScope.$eval(ctrl.disableChoiceExpression)); // force the boolean value
      item._uiSelectChoiceDisabled = isDisabled; // store this for later reference
    }

    return isDisabled;
  };


  // When the user selects an item with ENTER or clicks the dropdown
  ctrl.select = function(item, skipFocusser, $event) {
    if (item === undefined || !item._uiSelectChoiceDisabled) {

      if ( ! ctrl.items && ! ctrl.search ) return;

      if (!item || !item._uiSelectChoiceDisabled) {
        if(ctrl.tagging.isActivated) {
          // if taggingLabel is disabled, we pull from ctrl.search val
          if ( ctrl.taggingLabel === false ) {
            if ( ctrl.activeIndex < 0 ) {
              item = ctrl.tagging.fct !== undefined ? ctrl.tagging.fct(ctrl.search) : ctrl.search;
              if (!item || angular.equals( ctrl.items[0], item ) ) {
                return;
              }
            } else {
              // keyboard nav happened first, user selected from dropdown
              item = ctrl.items[ctrl.activeIndex];
            }
          } else {
            // tagging always operates at index zero, taggingLabel === false pushes
            // the ctrl.search value without having it injected
            if ( ctrl.activeIndex === 0 ) {
              // ctrl.tagging pushes items to ctrl.items, so we only have empty val
              // for `item` if it is a detected duplicate
              if ( item === undefined ) return;

              // create new item on the fly if we don't already have one;
              // use tagging function if we have one
              if ( ctrl.tagging.fct !== undefined && typeof item === 'string' ) {
                item = ctrl.tagging.fct(ctrl.search);
                if (!item) return;
              // if item type is 'string', apply the tagging label
              } else if ( typeof item === 'string' ) {
                // trim the trailing space
                item = item.replace(ctrl.taggingLabel,'').trim();
              }
            }
          }
          // search ctrl.selected for dupes potentially caused by tagging and return early if found
          if ( ctrl.selected && angular.isArray(ctrl.selected) && ctrl.selected.filter( function (selection) { return angular.equals(selection, item); }).length > 0 ) {
            ctrl.close(skipFocusser);
            return;
          }
        }

        $scope.$broadcast('uis:select', item);

        var locals = {};
        locals[ctrl.parserResult.itemName] = item;

        $timeout(function(){
          ctrl.onSelectCallback($scope, {
            $item: item,
            $model: ctrl.parserResult.modelMapper($scope, locals)
          });
        });

        if (ctrl.closeOnSelect) {
          ctrl.close(skipFocusser);
        }
        if ($event && $event.type === 'click') {
          ctrl.clickTriggeredSelect = true;
        }
      }
    }
  };

  // Closes the dropdown
  ctrl.close = function(skipFocusser) {
    if (!ctrl.open) return;
    if (ctrl.ngModel && ctrl.ngModel.$setTouched) ctrl.ngModel.$setTouched();
    _resetSearchInput();
    ctrl.open = false;

    $scope.$broadcast('uis:close', skipFocusser);

  };

  ctrl.setFocus = function(){
    if (!ctrl.focus) ctrl.focusInput[0].focus();
  };

  ctrl.clear = function($event) {
    ctrl.select(undefined);
    $event.stopPropagation();
    $timeout(function() {
      ctrl.focusser[0].focus();
    }, 0, false);
  };

  // Toggle dropdown
  ctrl.toggle = function(e) {
    if (ctrl.open) {
      ctrl.close();
      e.preventDefault();
      e.stopPropagation();
    } else {
      ctrl.activate();
    }
  };

  ctrl.isLocked = function(itemScope, itemIndex) {
      var isLocked, item = ctrl.selected[itemIndex];

      if (item && !angular.isUndefined(ctrl.lockChoiceExpression)) {
          isLocked = !!(itemScope.$eval(ctrl.lockChoiceExpression)); // force the boolean value
          item._uiSelectChoiceLocked = isLocked; // store this for later reference
      }

      return isLocked;
  };

  var sizeWatch = null;
  ctrl.sizeSearchInput = function() {

    var input = ctrl.searchInput[0],
        container = ctrl.searchInput.parent().parent()[0],
        calculateContainerWidth = function() {
          // Return the container width only if the search input is visible
          return container.clientWidth * !!input.offsetParent;
        },
        updateIfVisible = function(containerWidth) {
          if (containerWidth === 0) {
            return false;
          }
          var inputWidth = containerWidth - input.offsetLeft - 10;
          if (inputWidth < 50) inputWidth = containerWidth;
          ctrl.searchInput.css('width', inputWidth+'px');
          return true;
        };

    ctrl.searchInput.css('width', '10px');
    $timeout(function() { //Give tags time to render correctly
      if (sizeWatch === null && !updateIfVisible(calculateContainerWidth())) {
        sizeWatch = $scope.$watch(calculateContainerWidth, function(containerWidth) {
          if (updateIfVisible(containerWidth)) {
            sizeWatch();
            sizeWatch = null;
          }
        });
      }
    });
  };

  function _handleDropDownSelection(key) {
    var processed = true;
    switch (key) {
      case KEY.DOWN:
        if (!ctrl.open && ctrl.multiple) ctrl.activate(false, true); //In case its the search input in 'multiple' mode
        else if (ctrl.activeIndex < ctrl.items.length - 1) { ctrl.activeIndex++; }
        break;
      case KEY.UP:
        if (!ctrl.open && ctrl.multiple) ctrl.activate(false, true); //In case its the search input in 'multiple' mode
        else if (ctrl.activeIndex > 0 || (ctrl.search.length === 0 && ctrl.tagging.isActivated && ctrl.activeIndex > -1)) { ctrl.activeIndex--; }
        break;
      case KEY.TAB:
        if (!ctrl.multiple || ctrl.open) ctrl.select(ctrl.items[ctrl.activeIndex], true);
        break;
      case KEY.ENTER:
        if(ctrl.open && (ctrl.tagging.isActivated || ctrl.activeIndex >= 0)){
          ctrl.select(ctrl.items[ctrl.activeIndex]); // Make sure at least one dropdown item is highlighted before adding if not in tagging mode
        } else {
          ctrl.activate(false, true); //In case its the search input in 'multiple' mode
        }
        break;
      case KEY.ESC:
        ctrl.close();
        break;
      default:
        processed = false;
    }
    return processed;
  }

  // Bind to keyboard shortcuts
  ctrl.searchInput.on('keydown', function(e) {

    var key = e.which;

    // if(~[KEY.ESC,KEY.TAB].indexOf(key)){
    //   //TODO: SEGURO?
    //   ctrl.close();
    // }

    $scope.$apply(function() {

      var tagged = false;

      if (ctrl.items.length > 0 || ctrl.tagging.isActivated) {
        _handleDropDownSelection(key);
        if ( ctrl.taggingTokens.isActivated ) {
          for (var i = 0; i < ctrl.taggingTokens.tokens.length; i++) {
            if ( ctrl.taggingTokens.tokens[i] === KEY.MAP[e.keyCode] ) {
              // make sure there is a new value to push via tagging
              if ( ctrl.search.length > 0 ) {
                tagged = true;
              }
            }
          }
          if ( tagged ) {
            $timeout(function() {
              ctrl.searchInput.triggerHandler('tagged');
              var newItem = ctrl.search.replace(KEY.MAP[e.keyCode],'').trim();
              if ( ctrl.tagging.fct ) {
                newItem = ctrl.tagging.fct( newItem );
              }
              if (newItem) ctrl.select(newItem, true);
            });
          }
        }
      }

    });

    if(KEY.isVerticalMovement(key) && ctrl.items.length > 0){
      _ensureHighlightVisible();
    }

    if (key === KEY.ENTER || key === KEY.ESC) {
      e.preventDefault();
      e.stopPropagation();
    }

  });

  // If tagging try to split by tokens and add items
  ctrl.searchInput.on('paste', function (e) {
    var data = e.originalEvent.clipboardData.getData('text/plain');
    if (data && data.length > 0 && ctrl.taggingTokens.isActivated && ctrl.tagging.fct) {
      var items = data.split(ctrl.taggingTokens.tokens[0]); // split by first token only
      if (items && items.length > 0) {
        angular.forEach(items, function (item) {
          var newItem = ctrl.tagging.fct(item);
          if (newItem) {
            ctrl.select(newItem, true);
          }
        });
        e.preventDefault();
        e.stopPropagation();
      }
    }
  });

  ctrl.searchInput.on('tagged', function() {
    $timeout(function() {
      _resetSearchInput();
    });
  });

  // See https://github.com/ivaynberg/select2/blob/3.4.6/select2.js#L1431
  function _ensureHighlightVisible() {
    var container = $element.querySelectorAll('.ui-select-choices-content');
    var choices = container.querySelectorAll('.ui-select-choices-row');
    if (choices.length < 1) {
      throw uiSelectMinErr('choices', "Expected multiple .ui-select-choices-row but got '{0}'.", choices.length);
    }

    if (ctrl.activeIndex < 0) {
      return;
    }

    var highlighted = choices[ctrl.activeIndex];
    var posY = highlighted.offsetTop + highlighted.clientHeight - container[0].scrollTop;
    var height = container[0].offsetHeight;

    if (posY > height) {
      container[0].scrollTop += posY - height;
    } else if (posY < highlighted.clientHeight) {
      if (ctrl.isGrouped && ctrl.activeIndex === 0)
        container[0].scrollTop = 0; //To make group header visible when going all the way up
      else
        container[0].scrollTop -= highlighted.clientHeight - posY;
    }
  }

  $scope.$on('$destroy', function() {
    ctrl.searchInput.off('keyup keydown tagged blur paste');
  });

}]);

uis.directive('uiSelect',
  ['$document', 'uiSelectConfig', 'uiSelectMinErr', 'uisOffset', '$compile', '$parse', '$timeout',
  function($document, uiSelectConfig, uiSelectMinErr, uisOffset, $compile, $parse, $timeout) {

  return {
    restrict: 'EA',
    templateUrl: function(tElement, tAttrs) {
      var theme = tAttrs.theme || uiSelectConfig.theme;
      return theme + (angular.isDefined(tAttrs.multiple) ? '/select-multiple.tpl.html' : '/select.tpl.html');
    },
    replace: true,
    transclude: true,
    require: ['uiSelect', '^ngModel'],
    scope: true,

    controller: 'uiSelectCtrl',
    controllerAs: '$select',
    compile: function(tElement, tAttrs) {

      //Multiple or Single depending if multiple attribute presence
      if (angular.isDefined(tAttrs.multiple))
        tElement.append("<ui-select-multiple/>").removeAttr('multiple');
      else
        tElement.append("<ui-select-single/>");       

      return function(scope, element, attrs, ctrls, transcludeFn) {

        var $select = ctrls[0];
        var ngModel = ctrls[1];

        $select.generatedId = uiSelectConfig.generateId();
        $select.baseTitle = attrs.title || 'Select box';
        $select.focusserTitle = $select.baseTitle + ' focus';
        $select.focusserId = 'focusser-' + $select.generatedId;

        $select.closeOnSelect = function() {
          if (angular.isDefined(attrs.closeOnSelect)) {
            return $parse(attrs.closeOnSelect)();
          } else {
            return uiSelectConfig.closeOnSelect;
          }
        }();

        $select.onSelectCallback = $parse(attrs.onSelect);
        $select.onRemoveCallback = $parse(attrs.onRemove);
        
        //Set reference to ngModel from uiSelectCtrl
        $select.ngModel = ngModel;

        $select.choiceGrouped = function(group){
          return $select.isGrouped && group && group.name;
        };

        if(attrs.tabindex){
          attrs.$observe('tabindex', function(value) {
            $select.focusInput.attr("tabindex", value);
            element.removeAttr("tabindex");
          });
        }

        scope.$watch('searchEnabled', function() {
            var searchEnabled = scope.$eval(attrs.searchEnabled);
            $select.searchEnabled = searchEnabled !== undefined ? searchEnabled : uiSelectConfig.searchEnabled;
        });

        scope.$watch('sortable', function() {
            var sortable = scope.$eval(attrs.sortable);
            $select.sortable = sortable !== undefined ? sortable : uiSelectConfig.sortable;
        });

        attrs.$observe('disabled', function() {
          // No need to use $eval() (thanks to ng-disabled) since we already get a boolean instead of a string
          $select.disabled = attrs.disabled !== undefined ? attrs.disabled : false;
        });

        attrs.$observe('resetSearchInput', function() {
          // $eval() is needed otherwise we get a string instead of a boolean
          var resetSearchInput = scope.$eval(attrs.resetSearchInput);
          $select.resetSearchInput = resetSearchInput !== undefined ? resetSearchInput : true;
        });

        attrs.$observe('tagging', function() {
          if(attrs.tagging !== undefined)
          {
            // $eval() is needed otherwise we get a string instead of a boolean
            var taggingEval = scope.$eval(attrs.tagging);
            $select.tagging = {isActivated: true, fct: taggingEval !== true ? taggingEval : undefined};
          }
          else
          {
            $select.tagging = {isActivated: false, fct: undefined};
          }
        });

        attrs.$observe('taggingLabel', function() {
          if(attrs.tagging !== undefined )
          {
            // check eval for FALSE, in this case, we disable the labels
            // associated with tagging
            if ( attrs.taggingLabel === 'false' ) {
              $select.taggingLabel = false;
            }
            else
            {
              $select.taggingLabel = attrs.taggingLabel !== undefined ? attrs.taggingLabel : '(new)';
            }
          }
        });

        attrs.$observe('taggingTokens', function() {
          if (attrs.tagging !== undefined) {
            var tokens = attrs.taggingTokens !== undefined ? attrs.taggingTokens.split('|') : [',','ENTER'];
            $select.taggingTokens = {isActivated: true, tokens: tokens };
          }
        });

        //Automatically gets focus when loaded
        if (angular.isDefined(attrs.autofocus)){
          $timeout(function(){
            $select.setFocus();
          });
        }

        //Gets focus based on scope event name (e.g. focus-on='SomeEventName')
        if (angular.isDefined(attrs.focusOn)){
          scope.$on(attrs.focusOn, function() {
              $timeout(function(){
                $select.setFocus();
              });
          });
        }

        function onDocumentClick(e) {
          if (!$select.open) return; //Skip it if dropdown is close

          var contains = false;

          if (window.jQuery) {
            // Firefox 3.6 does not support element.contains()
            // See Node.contains https://developer.mozilla.org/en-US/docs/Web/API/Node.contains
            contains = window.jQuery.contains(element[0], e.target);
          } else {
            contains = element[0].contains(e.target);
          }

          if (!contains && !$select.clickTriggeredSelect) {
            //Will lose focus only with certain targets
            var focusableControls = ['input','button','textarea'];
            var targetScope = angular.element(e.target).scope(); //To check if target is other ui-select
            var skipFocusser = targetScope && targetScope.$select && targetScope.$select !== $select; //To check if target is other ui-select
            if (!skipFocusser) skipFocusser =  ~focusableControls.indexOf(e.target.tagName.toLowerCase()); //Check if target is input, button or textarea
            $select.close(skipFocusser);
            scope.$digest();
          }
          $select.clickTriggeredSelect = false;
        }

        // See Click everywhere but here event http://stackoverflow.com/questions/12931369
        $document.on('click', onDocumentClick);

        scope.$on('$destroy', function() {
          $document.off('click', onDocumentClick);
        });

        // Move transcluded elements to their correct position in main template
        transcludeFn(scope, function(clone) {
          // See Transclude in AngularJS http://blog.omkarpatil.com/2012/11/transclude-in-angularjs.html

          // One day jqLite will be replaced by jQuery and we will be able to write:
          // var transcludedElement = clone.filter('.my-class')
          // instead of creating a hackish DOM element:
          var transcluded = angular.element('<div>').append(clone);

          var transcludedMatch = transcluded.querySelectorAll('.ui-select-match');
          transcludedMatch.removeAttr('ui-select-match'); //To avoid loop in case directive as attr
          transcludedMatch.removeAttr('data-ui-select-match'); // Properly handle HTML5 data-attributes
          if (transcludedMatch.length !== 1) {
            throw uiSelectMinErr('transcluded', "Expected 1 .ui-select-match but got '{0}'.", transcludedMatch.length);
          }
          element.querySelectorAll('.ui-select-match').replaceWith(transcludedMatch);

          var transcludedChoices = transcluded.querySelectorAll('.ui-select-choices');
          transcludedChoices.removeAttr('ui-select-choices'); //To avoid loop in case directive as attr
          transcludedChoices.removeAttr('data-ui-select-choices'); // Properly handle HTML5 data-attributes
          if (transcludedChoices.length !== 1) {
            throw uiSelectMinErr('transcluded', "Expected 1 .ui-select-choices but got '{0}'.", transcludedChoices.length);
          }
          element.querySelectorAll('.ui-select-choices').replaceWith(transcludedChoices);
        });

        // Support for appending the select field to the body when its open
        var appendToBody = scope.$eval(attrs.appendToBody);
        if (appendToBody !== undefined ? appendToBody : uiSelectConfig.appendToBody) {
          scope.$watch('$select.open', function(isOpen) {
            if (isOpen) {
              positionDropdown();
            } else {
              resetDropdown();
            }
          });

          // Move the dropdown back to its original location when the scope is destroyed. Otherwise
          // it might stick around when the user routes away or the select field is otherwise removed
          scope.$on('$destroy', function() {
            resetDropdown();
          });
        }

        // Hold on to a reference to the .ui-select-container element for appendToBody support
        var placeholder = null,
            originalWidth = '';

        function positionDropdown() {
          // Remember the absolute position of the element
          var offset = uisOffset(element);

          // Clone the element into a placeholder element to take its original place in the DOM
          placeholder = angular.element('<div class="ui-select-placeholder"></div>');
          placeholder[0].style.width = offset.width + 'px';
          placeholder[0].style.height = offset.height + 'px';
          element.after(placeholder);

          // Remember the original value of the element width inline style, so it can be restored
          // when the dropdown is closed
          originalWidth = element[0].style.width;

          // Now move the actual dropdown element to the end of the body
          $document.find('body').append(element);

          element[0].style.position = 'absolute';
          element[0].style.left = offset.left + 'px';
          element[0].style.top = offset.top + 'px';
          element[0].style.width = offset.width + 'px';
        }

        function resetDropdown() {
          if (placeholder === null) {
            // The dropdown has not actually been display yet, so there's nothing to reset
            return;
          }

          // Move the dropdown element back to its original location in the DOM
          placeholder.replaceWith(element);
          placeholder = null;

          element[0].style.position = '';
          element[0].style.left = '';
          element[0].style.top = '';
          element[0].style.width = originalWidth;
        }

        // Hold on to a reference to the .ui-select-dropdown element for direction support.
        var dropdown = null,
            directionUpClassName = 'direction-up';

        // Support changing the direction of the dropdown if there isn't enough space to render it.
        scope.$watch('$select.open', function(isOpen) {
          if (isOpen) {
            dropdown = angular.element(element).querySelectorAll('.ui-select-dropdown');
            if (dropdown === null) {
              return;
            }

            // Hide the dropdown so there is no flicker until $timeout is done executing.
            dropdown[0].style.visibility = 'hidden';

            // Delay positioning the dropdown until all choices have been added so its height is correct.
            $timeout(function(){
              var offset = uisOffset(element);
              var offsetDropdown = uisOffset(dropdown);

              // Determine if the direction of the dropdown needs to be changed.
              if (offset.top + offset.height + offsetDropdown.height > $document[0].documentElement.scrollTop + $document[0].documentElement.clientHeight) {
                dropdown[0].style.position = 'absolute';
                dropdown[0].style.top = (offsetDropdown.height * -1) + 'px';
                element.addClass(directionUpClassName);
              }

              // Display the dropdown once it has been positioned.
              dropdown[0].style.visibility = '';
            });
          } else {
              if (dropdown === null) {
                return;
              }

              // Reset the position of the dropdown.
              dropdown[0].style.position = '';
              dropdown[0].style.top = '';
              element.removeClass(directionUpClassName);
          }
        });
      };
    }
  };
}]);

uis.directive('uiSelectMatch', ['uiSelectConfig', function(uiSelectConfig) {
  return {
    restrict: 'EA',
    require: '^uiSelect',
    replace: true,
    transclude: true,
    templateUrl: function(tElement) {
      // Gets theme attribute from parent (ui-select)
      var theme = tElement.parent().attr('theme') || uiSelectConfig.theme;
      var multi = tElement.parent().attr('multiple');
      return theme + (multi ? '/match-multiple.tpl.html' : '/match.tpl.html');
    },
    link: function(scope, element, attrs, $select) {
      $select.lockChoiceExpression = attrs.uiLockChoice;
      attrs.$observe('placeholder', function(placeholder) {
        $select.placeholder = placeholder !== undefined ? placeholder : uiSelectConfig.placeholder;
      });

      function setAllowClear(allow) {
        $select.allowClear = (angular.isDefined(allow)) ? (allow === '') ? true : (allow.toLowerCase() === 'true') : false;
      }

      attrs.$observe('allowClear', setAllowClear);
      setAllowClear(attrs.allowClear);

      if($select.multiple){
        $select.sizeSearchInput();
      }

    }
  };
}]);

uis.directive('uiSelectMultiple', ['uiSelectMinErr','$timeout', function(uiSelectMinErr, $timeout) {
  return {
    restrict: 'EA',
    require: ['^uiSelect', '^ngModel'],

    controller: ['$scope','$timeout', function($scope, $timeout){

      var ctrl = this,
          $select = $scope.$select,
          ngModel;

      //Wait for link fn to inject it 
      $scope.$evalAsync(function(){ ngModel = $scope.ngModel; });

      ctrl.activeMatchIndex = -1;

      ctrl.updateModel = function(){
        ngModel.$setViewValue(Date.now()); //Set timestamp as a unique string to force changes
        ctrl.refreshComponent();
      };

      ctrl.refreshComponent = function(){
        //Remove already selected items
        //e.g. When user clicks on a selection, the selected array changes and 
        //the dropdown should remove that item
        $select.refreshItems();
        $select.sizeSearchInput();
      };

      // Remove item from multiple select
      ctrl.removeChoice = function(index){

        var removedChoice = $select.selected[index];

        // if the choice is locked, can't remove it
        if(removedChoice._uiSelectChoiceLocked) return;

        var locals = {};
        locals[$select.parserResult.itemName] = removedChoice;

        $select.selected.splice(index, 1);
        ctrl.activeMatchIndex = -1;
        $select.sizeSearchInput();

        // Give some time for scope propagation.
        $timeout(function(){
          $select.onRemoveCallback($scope, {
            $item: removedChoice,
            $model: $select.parserResult.modelMapper($scope, locals)
          });
        });

        ctrl.updateModel();

      };

      ctrl.getPlaceholder = function(){
        //Refactor single?
        if($select.selected.length) return;
        return $select.placeholder;
      };


    }],
    controllerAs: '$selectMultiple',

    link: function(scope, element, attrs, ctrls) {

      var $select = ctrls[0];
      var ngModel = scope.ngModel = ctrls[1];
      var $selectMultiple = scope.$selectMultiple;

      //$select.selected = raw selected objects (ignoring any property binding)

      $select.multiple = true;
      $select.removeSelected = true;

      //Input that will handle focus
      $select.focusInput = $select.searchInput;

      //From view --> model
      ngModel.$parsers.unshift(function () {
        var locals = {},
            result,
            resultMultiple = [];
        for (var j = $select.selected.length - 1; j >= 0; j--) {
          locals = {};
          locals[$select.parserResult.itemName] = $select.selected[j];
          result = $select.parserResult.modelMapper(scope, locals);
          resultMultiple.unshift(result);
        }
        return resultMultiple;
      });

      // From model --> view
      ngModel.$formatters.unshift(function (inputValue) {
        var data = $select.parserResult.source (scope, { $select : {search:''}}), //Overwrite $search
            locals = {},
            result;
        if (!data) return inputValue;
        var resultMultiple = [];
        var checkFnMultiple = function(list, value){
          if (!list || !list.length) return;
          for (var p = list.length - 1; p >= 0; p--) {
            locals[$select.parserResult.itemName] = list[p];
            result = $select.parserResult.modelMapper(scope, locals);
            if($select.parserResult.trackByExp){
                var matches = /\.(.+)/.exec($select.parserResult.trackByExp);
                if(matches.length>0 && result[matches[1]] == value[matches[1]]){
                    resultMultiple.unshift(list[p]);
                    return true;
                }
            }
            if (angular.equals(result,value)){
              resultMultiple.unshift(list[p]);
              return true;
            }
          }
          return false;
        };
        if (!inputValue) return resultMultiple; //If ngModel was undefined
        for (var k = inputValue.length - 1; k >= 0; k--) {
          //Check model array of currently selected items 
          if (!checkFnMultiple($select.selected, inputValue[k])){
            //Check model array of all items available
            if (!checkFnMultiple(data, inputValue[k])){
              //If not found on previous lists, just add it directly to resultMultiple
              resultMultiple.unshift(inputValue[k]);
            }
          }
        }
        return resultMultiple;
      });
      
      //Watch for external model changes 
      scope.$watchCollection(function(){ return ngModel.$modelValue; }, function(newValue, oldValue) {
        if (oldValue != newValue){
          ngModel.$modelValue = null; //Force scope model value and ngModel value to be out of sync to re-run formatters
          $selectMultiple.refreshComponent();
        }
      });

      ngModel.$render = function() {
        // Make sure that model value is array
        if(!angular.isArray(ngModel.$viewValue)){
          // Have tolerance for null or undefined values
          if(angular.isUndefined(ngModel.$viewValue) || ngModel.$viewValue === null){
            $select.selected = [];
          } else {
            throw uiSelectMinErr('multiarr', "Expected model value to be array but got '{0}'", ngModel.$viewValue);
          }
        }
        $select.selected = ngModel.$viewValue;
        $selectMultiple.refreshComponent();
        scope.$evalAsync(); //To force $digest
      };

      scope.$on('uis:select', function (event, item) {
        $select.selected.push(item);
        $selectMultiple.updateModel();
      });

      scope.$on('uis:activate', function () {
        $selectMultiple.activeMatchIndex = -1;
      });

      scope.$watch('$select.disabled', function(newValue, oldValue) {
        // As the search input field may now become visible, it may be necessary to recompute its size
        if (oldValue && !newValue) $select.sizeSearchInput();
      });

      $select.searchInput.on('keydown', function(e) {
        var key = e.which;
        scope.$apply(function() {
          var processed = false;
          // var tagged = false; //Checkme
          if(KEY.isHorizontalMovement(key)){
            processed = _handleMatchSelection(key);
          }
          if (processed  && key != KEY.TAB) {
            //TODO Check si el tab selecciona aun correctamente
            //Crear test
            e.preventDefault();
            e.stopPropagation();
          }
        });
      });
      function _getCaretPosition(el) {
        if(angular.isNumber(el.selectionStart)) return el.selectionStart;
        // selectionStart is not supported in IE8 and we don't want hacky workarounds so we compromise
        else return el.value.length;
      }
      // Handles selected options in "multiple" mode
      function _handleMatchSelection(key){
        var caretPosition = _getCaretPosition($select.searchInput[0]),
            length = $select.selected.length,
            // none  = -1,
            first = 0,
            last  = length-1,
            curr  = $selectMultiple.activeMatchIndex,
            next  = $selectMultiple.activeMatchIndex+1,
            prev  = $selectMultiple.activeMatchIndex-1,
            newIndex = curr;

        if(caretPosition > 0 || ($select.search.length && key == KEY.RIGHT)) return false;

        $select.close();

        function getNewActiveMatchIndex(){
          switch(key){
            case KEY.LEFT:
              // Select previous/first item
              if(~$selectMultiple.activeMatchIndex) return prev;
              // Select last item
              else return last;
              break;
            case KEY.RIGHT:
              // Open drop-down
              if(!~$selectMultiple.activeMatchIndex || curr === last){
                $select.activate();
                return false;
              }
              // Select next/last item
              else return next;
              break;
            case KEY.BACKSPACE:
              // Remove selected item and select previous/first
              if(~$selectMultiple.activeMatchIndex){
                $selectMultiple.removeChoice(curr);
                return prev;
              }
              // Select last item
              else return last;
              break;
            case KEY.DELETE:
              // Remove selected item and select next item
              if(~$selectMultiple.activeMatchIndex){
                $selectMultiple.removeChoice($selectMultiple.activeMatchIndex);
                return curr;
              }
              else return false;
          }
        }

        newIndex = getNewActiveMatchIndex();

        if(!$select.selected.length || newIndex === false) $selectMultiple.activeMatchIndex = -1;
        else $selectMultiple.activeMatchIndex = Math.min(last,Math.max(first,newIndex));

        return true;
      }

      $select.searchInput.on('keyup', function(e) {

        if ( ! KEY.isVerticalMovement(e.which) ) {
          scope.$evalAsync( function () {
            $select.activeIndex = $select.taggingLabel === false ? -1 : 0;
          });
        }
        // Push a "create new" item into array if there is a search string
        if ( $select.tagging.isActivated && $select.search.length > 0 ) {

          // return early with these keys
          if (e.which === KEY.TAB || KEY.isControl(e) || KEY.isFunctionKey(e) || e.which === KEY.ESC || KEY.isVerticalMovement(e.which) ) {
            return;
          }
          // always reset the activeIndex to the first item when tagging
          $select.activeIndex = $select.taggingLabel === false ? -1 : 0;
          // taggingLabel === false bypasses all of this
          if ($select.taggingLabel === false) return;

          var items = angular.copy( $select.items );
          var stashArr = angular.copy( $select.items );
          var newItem;
          var item;
          var hasTag = false;
          var dupeIndex = -1;
          var tagItems;
          var tagItem;

          // case for object tagging via transform `$select.tagging.fct` function
          if ( $select.tagging.fct !== undefined) {
            tagItems = $select.$filter('filter')(items,{'isTag': true});
            if ( tagItems.length > 0 ) {
              tagItem = tagItems[0];
            }
            // remove the first element, if it has the `isTag` prop we generate a new one with each keyup, shaving the previous
            if ( items.length > 0 && tagItem ) {
              hasTag = true;
              items = items.slice(1,items.length);
              stashArr = stashArr.slice(1,stashArr.length);
            }
            newItem = $select.tagging.fct($select.search);
            newItem.isTag = true;
            // verify the the tag doesn't match the value of an existing item
            if ( stashArr.filter( function (origItem) { return angular.equals( origItem, $select.tagging.fct($select.search) ); } ).length > 0 ) {
              return;
            }
            newItem.isTag = true;
          // handle newItem string and stripping dupes in tagging string context
          } else {
            // find any tagging items already in the $select.items array and store them
            tagItems = $select.$filter('filter')(items,function (item) {
              return item.match($select.taggingLabel);
            });
            if ( tagItems.length > 0 ) {
              tagItem = tagItems[0];
            }
            item = items[0];
            // remove existing tag item if found (should only ever be one tag item)
            if ( item !== undefined && items.length > 0 && tagItem ) {
              hasTag = true;
              items = items.slice(1,items.length);
              stashArr = stashArr.slice(1,stashArr.length);
            }
            newItem = $select.search+' '+$select.taggingLabel;
            if ( _findApproxDupe($select.selected, $select.search) > -1 ) {
              return;
            }
            // verify the the tag doesn't match the value of an existing item from
            // the searched data set or the items already selected
            if ( _findCaseInsensitiveDupe(stashArr.concat($select.selected)) ) {
              // if there is a tag from prev iteration, strip it / queue the change
              // and return early
              if ( hasTag ) {
                items = stashArr;
                scope.$evalAsync( function () {
                  $select.activeIndex = 0;
                  $select.items = items;
                });
              }
              return;
            }
            if ( _findCaseInsensitiveDupe(stashArr) ) {
              // if there is a tag from prev iteration, strip it
              if ( hasTag ) {
                $select.items = stashArr.slice(1,stashArr.length);
              }
              return;
            }
          }
          if ( hasTag ) dupeIndex = _findApproxDupe($select.selected, newItem);
          // dupe found, shave the first item
          if ( dupeIndex > -1 ) {
            items = items.slice(dupeIndex+1,items.length-1);
          } else {
            items = [];
            items.push(newItem);
            items = items.concat(stashArr);
          }
          scope.$evalAsync( function () {
            $select.activeIndex = 0;
            $select.items = items;
          });
        }
      });
      function _findCaseInsensitiveDupe(arr) {
        if ( arr === undefined || $select.search === undefined ) {
          return false;
        }
        var hasDupe = arr.filter( function (origItem) {
          if ( $select.search.toUpperCase() === undefined || origItem === undefined ) {
            return false;
          }
          return origItem.toUpperCase() === $select.search.toUpperCase();
        }).length > 0;

        return hasDupe;
      }
      function _findApproxDupe(haystack, needle) {
        var dupeIndex = -1;
        if(angular.isArray(haystack)) {
          var tempArr = angular.copy(haystack);
          for (var i = 0; i <tempArr.length; i++) {
            // handle the simple string version of tagging
            if ( $select.tagging.fct === undefined ) {
              // search the array for the match
              if ( tempArr[i]+' '+$select.taggingLabel === needle ) {
              dupeIndex = i;
              }
            // handle the object tagging implementation
            } else {
              var mockObj = tempArr[i];
              mockObj.isTag = true;
              if ( angular.equals(mockObj, needle) ) {
              dupeIndex = i;
              }
            }
          }
        }
        return dupeIndex;
      }

      $select.searchInput.on('blur', function() {
        $timeout(function() {
          $selectMultiple.activeMatchIndex = -1;
        });
      });

    }
  };
}]);
uis.directive('uiSelectSingle', ['$timeout','$compile', function($timeout, $compile) {
  return {
    restrict: 'EA',
    require: ['^uiSelect', '^ngModel'],
    link: function(scope, element, attrs, ctrls) {

      var $select = ctrls[0];
      var ngModel = ctrls[1];

      //From view --> model
      ngModel.$parsers.unshift(function (inputValue) {
        var locals = {},
            result;
        locals[$select.parserResult.itemName] = inputValue;
        result = $select.parserResult.modelMapper(scope, locals);
        return result;
      });

      //From model --> view
      ngModel.$formatters.unshift(function (inputValue) {
        var data = $select.parserResult.source (scope, { $select : {search:''}}), //Overwrite $search
            locals = {},
            result;
        if (data){
          var checkFnSingle = function(d){
            locals[$select.parserResult.itemName] = d;
            result = $select.parserResult.modelMapper(scope, locals);
            return result == inputValue;
          };
          //If possible pass same object stored in $select.selected
          if ($select.selected && checkFnSingle($select.selected)) {
            return $select.selected;
          }
          for (var i = data.length - 1; i >= 0; i--) {
            if (checkFnSingle(data[i])) return data[i];
          }
        }
        return inputValue;
      });

      //Update viewValue if model change
      scope.$watch('$select.selected', function(newValue) {
        if (ngModel.$viewValue !== newValue) {
          ngModel.$setViewValue(newValue);
        }
      });

      ngModel.$render = function() {
        $select.selected = ngModel.$viewValue;
      };

      scope.$on('uis:select', function (event, item) {
        $select.selected = item;
      });

      scope.$on('uis:close', function (event, skipFocusser) {
        $timeout(function(){
          $select.focusser.prop('disabled', false);
          if (!skipFocusser) $select.focusser[0].focus();
        },0,false);
      });

      scope.$on('uis:activate', function () {
        focusser.prop('disabled', true); //Will reactivate it on .close()
      });

      //Idea from: https://github.com/ivaynberg/select2/blob/79b5bf6db918d7560bdd959109b7bcfb47edaf43/select2.js#L1954
      var focusser = angular.element("<input ng-disabled='$select.disabled' class='ui-select-focusser ui-select-offscreen' type='text' id='{{ $select.focusserId }}' aria-label='{{ $select.focusserTitle }}' aria-haspopup='true' role='button' />");
      $compile(focusser)(scope);
      $select.focusser = focusser;

      //Input that will handle focus
      $select.focusInput = focusser;

      element.parent().append(focusser);
      focusser.bind("focus", function(){
        scope.$evalAsync(function(){
          $select.focus = true;
        });
      });
      focusser.bind("blur", function(){
        scope.$evalAsync(function(){
          $select.focus = false;
        });
      });
      focusser.bind("keydown", function(e){

        if (e.which === KEY.BACKSPACE) {
          e.preventDefault();
          e.stopPropagation();
          $select.select(undefined);
          scope.$apply();
          return;
        }

        if (e.which === KEY.TAB || KEY.isControl(e) || KEY.isFunctionKey(e) || e.which === KEY.ESC) {
          return;
        }

        if (e.which == KEY.DOWN  || e.which == KEY.UP || e.which == KEY.ENTER || e.which == KEY.SPACE){
          e.preventDefault();
          e.stopPropagation();
          $select.activate();
        }

        scope.$digest();
      });

      focusser.bind("keyup input", function(e){

        if (e.which === KEY.TAB || KEY.isControl(e) || KEY.isFunctionKey(e) || e.which === KEY.ESC || e.which == KEY.ENTER || e.which === KEY.BACKSPACE) {
          return;
        }

        $select.activate(focusser.val()); //User pressed some regular key, so we pass it to the search input
        focusser.val('');
        scope.$digest();

      });


    }
  };
}]);
// Make multiple matches sortable
uis.directive('uiSelectSort', ['$timeout', 'uiSelectConfig', 'uiSelectMinErr', function($timeout, uiSelectConfig, uiSelectMinErr) {
  return {
    require: '^uiSelect',
    link: function(scope, element, attrs, $select) {
      if (scope[attrs.uiSelectSort] === null) {
        throw uiSelectMinErr('sort', "Expected a list to sort");
      }

      var options = angular.extend({
          axis: 'horizontal'
        },
        scope.$eval(attrs.uiSelectSortOptions));

      var axis = options.axis,
        draggingClassName = 'dragging',
        droppingClassName = 'dropping',
        droppingBeforeClassName = 'dropping-before',
        droppingAfterClassName = 'dropping-after';

      scope.$watch(function(){
        return $select.sortable;
      }, function(n){
        if (n) {
          element.attr('draggable', true);
        } else {
          element.removeAttr('draggable');
        }
      });

      element.on('dragstart', function(e) {
        element.addClass(draggingClassName);

        (e.dataTransfer || e.originalEvent.dataTransfer).setData('text/plain', scope.$index);
      });

      element.on('dragend', function() {
        element.removeClass(draggingClassName);
      });

      var move = function(from, to) {
        /*jshint validthis: true */
        this.splice(to, 0, this.splice(from, 1)[0]);
      };

      var dragOverHandler = function(e) {
        e.preventDefault();

        var offset = axis === 'vertical' ? e.offsetY || e.layerY || (e.originalEvent ? e.originalEvent.offsetY : 0) : e.offsetX || e.layerX || (e.originalEvent ? e.originalEvent.offsetX : 0);

        if (offset < (this[axis === 'vertical' ? 'offsetHeight' : 'offsetWidth'] / 2)) {
          element.removeClass(droppingAfterClassName);
          element.addClass(droppingBeforeClassName);

        } else {
          element.removeClass(droppingBeforeClassName);
          element.addClass(droppingAfterClassName);
        }
      };

      var dropTimeout;

      var dropHandler = function(e) {
        e.preventDefault();

        var droppedItemIndex = parseInt((e.dataTransfer || e.originalEvent.dataTransfer).getData('text/plain'), 10);

        // prevent event firing multiple times in firefox
        $timeout.cancel(dropTimeout);
        dropTimeout = $timeout(function() {
          _dropHandler(droppedItemIndex);
        }, 20);
      };

      var _dropHandler = function(droppedItemIndex) {
        var theList = scope.$eval(attrs.uiSelectSort),
          itemToMove = theList[droppedItemIndex],
          newIndex = null;

        if (element.hasClass(droppingBeforeClassName)) {
          if (droppedItemIndex < scope.$index) {
            newIndex = scope.$index - 1;
          } else {
            newIndex = scope.$index;
          }
        } else {
          if (droppedItemIndex < scope.$index) {
            newIndex = scope.$index;
          } else {
            newIndex = scope.$index + 1;
          }
        }

        move.apply(theList, [droppedItemIndex, newIndex]);

        scope.$apply(function() {
          scope.$emit('uiSelectSort:change', {
            array: theList,
            item: itemToMove,
            from: droppedItemIndex,
            to: newIndex
          });
        });

        element.removeClass(droppingClassName);
        element.removeClass(droppingBeforeClassName);
        element.removeClass(droppingAfterClassName);

        element.off('drop', dropHandler);
      };

      element.on('dragenter', function() {
        if (element.hasClass(draggingClassName)) {
          return;
        }

        element.addClass(droppingClassName);

        element.on('dragover', dragOverHandler);
        element.on('drop', dropHandler);
      });

      element.on('dragleave', function(e) {
        if (e.target != element) {
          return;
        }
        element.removeClass(droppingClassName);
        element.removeClass(droppingBeforeClassName);
        element.removeClass(droppingAfterClassName);

        element.off('dragover', dragOverHandler);
        element.off('drop', dropHandler);
      });
    }
  };
}]);

/**
 * Parses "repeat" attribute.
 *
 * Taken from AngularJS ngRepeat source code
 * See https://github.com/angular/angular.js/blob/v1.2.15/src/ng/directive/ngRepeat.js#L211
 *
 * Original discussion about parsing "repeat" attribute instead of fully relying on ng-repeat:
 * https://github.com/angular-ui/ui-select/commit/5dd63ad#commitcomment-5504697
 */

uis.service('uisRepeatParser', ['uiSelectMinErr','$parse', function(uiSelectMinErr, $parse) {
  var self = this;

  /**
   * Example:
   * expression = "address in addresses | filter: {street: $select.search} track by $index"
   * itemName = "address",
   * source = "addresses | filter: {street: $select.search}",
   * trackByExp = "$index",
   */
  self.parse = function(expression) {

    var match = expression.match(/^\s*(?:([\s\S]+?)\s+as\s+)?([\S]+?)\s+in\s+([\s\S]+?)(?:\s+track\s+by\s+([\s\S]+?))?\s*$/);

    if (!match) {
      throw uiSelectMinErr('iexp', "Expected expression in form of '_item_ in _collection_[ track by _id_]' but got '{0}'.",
              expression);
    }

    return {
      itemName: match[2], // (lhs) Left-hand side,
      source: $parse(match[3]),
      trackByExp: match[4],
      modelMapper: $parse(match[1] || match[2])
    };

  };

  self.getGroupNgRepeatExpression = function() {
    return '$group in $select.groups';
  };

  self.getNgRepeatExpression = function(itemName, source, trackByExp, grouped) {
    var expression = itemName + ' in ' + (grouped ? '$group.items' : source);
    if (trackByExp) {
      expression += ' track by ' + trackByExp;
    }
    return expression;
  };
}]);

}());
angular.module("ui.select").run(["$templateCache", function($templateCache) {$templateCache.put("bootstrap/choices.tpl.html","<ul class=\"ui-select-choices ui-select-choices-content ui-select-dropdown dropdown-menu\" role=\"listbox\" ng-show=\"$select.items.length > 0\"><li class=\"ui-select-choices-group\" id=\"ui-select-choices-{{ $select.generatedId }}\"><div class=\"divider\" ng-show=\"$select.isGrouped && $index > 0\"></div><div ng-show=\"$select.isGrouped\" class=\"ui-select-choices-group-label dropdown-header\" ng-bind=\"$group.name\"></div><div id=\"ui-select-choices-row-{{ $select.generatedId }}-{{$index}}\" class=\"ui-select-choices-row\" ng-class=\"{active: $select.isActive(this), disabled: $select.isDisabled(this)}\" role=\"option\"><a href=\"javascript:void(0)\" class=\"ui-select-choices-row-inner\"></a></div></li></ul>");
$templateCache.put("bootstrap/match-multiple.tpl.html","<span class=\"ui-select-match\"><span ng-repeat=\"$item in $select.selected\"><span class=\"ui-select-match-item btn btn-default btn-xs\" tabindex=\"-1\" type=\"button\" ng-disabled=\"$select.disabled\" ng-click=\"$selectMultiple.activeMatchIndex = $index;\" ng-class=\"{\'btn-primary\':$selectMultiple.activeMatchIndex === $index, \'select-locked\':$select.isLocked(this, $index)}\" ui-select-sort=\"$select.selected\"><span class=\"close ui-select-match-close\" ng-hide=\"$select.disabled\" ng-click=\"$selectMultiple.removeChoice($index)\">&nbsp;&times;</span> <span uis-transclude-append=\"\"></span></span></span></span>");
$templateCache.put("bootstrap/match.tpl.html","<div class=\"ui-select-match\" ng-hide=\"$select.open\" ng-disabled=\"$select.disabled\" ng-class=\"{\'btn-default-focus\':$select.focus}\"><span tabindex=\"-1\" class=\"btn btn-default form-control ui-select-toggle\" aria-label=\"{{ $select.baseTitle }} activate\" ng-disabled=\"$select.disabled\" ng-click=\"$select.activate()\" style=\"outline: 0;\"><span ng-show=\"$select.isEmpty()\" class=\"ui-select-placeholder text-muted\">{{$select.placeholder}}</span> <span ng-hide=\"$select.isEmpty()\" class=\"ui-select-match-text pull-left\" ng-class=\"{\'ui-select-allow-clear\': $select.allowClear && !$select.isEmpty()}\" ng-transclude=\"\"></span> <i class=\"caret pull-right\" ng-click=\"$select.toggle($event)\"></i> <a ng-show=\"$select.allowClear && !$select.isEmpty()\" aria-label=\"{{ $select.baseTitle }} clear\" style=\"margin-right: 10px\" ng-click=\"$select.clear($event)\" class=\"btn btn-xs btn-link pull-right\"><i class=\"glyphicon glyphicon-remove\" aria-hidden=\"true\"></i></a></span></div>");
$templateCache.put("bootstrap/select-multiple.tpl.html","<div class=\"ui-select-container ui-select-multiple ui-select-bootstrap dropdown form-control\" ng-class=\"{open: $select.open}\"><div><div class=\"ui-select-match\"></div><input type=\"text\" autocomplete=\"off\" autocorrect=\"off\" autocapitalize=\"off\" spellcheck=\"false\" class=\"ui-select-search input-xs\" placeholder=\"{{$selectMultiple.getPlaceholder()}}\" ng-disabled=\"$select.disabled\" ng-hide=\"$select.disabled\" ng-click=\"$select.activate()\" ng-model=\"$select.search\" role=\"combobox\" aria-label=\"{{ $select.baseTitle }}\" ondrop=\"return false;\"></div><div class=\"ui-select-choices\"></div></div>");
$templateCache.put("bootstrap/select.tpl.html","<div class=\"ui-select-container ui-select-bootstrap dropdown\" ng-class=\"{open: $select.open}\"><div class=\"ui-select-match\"></div><input type=\"text\" autocomplete=\"off\" tabindex=\"-1\" aria-expanded=\"true\" aria-label=\"{{ $select.baseTitle }}\" aria-owns=\"ui-select-choices-{{ $select.generatedId }}\" aria-activedescendant=\"ui-select-choices-row-{{ $select.generatedId }}-{{ $select.activeIndex }}\" class=\"form-control ui-select-search\" placeholder=\"{{$select.placeholder}}\" ng-model=\"$select.search\" ng-show=\"$select.searchEnabled && $select.open\"><div class=\"ui-select-choices\"></div></div>");
$templateCache.put("select2/choices.tpl.html","<ul class=\"ui-select-choices ui-select-choices-content select2-results\"><li class=\"ui-select-choices-group\" ng-class=\"{\'select2-result-with-children\': $select.choiceGrouped($group) }\"><div ng-show=\"$select.choiceGrouped($group)\" class=\"ui-select-choices-group-label select2-result-label\" ng-bind=\"$group.name\"></div><ul role=\"listbox\" id=\"ui-select-choices-{{ $select.generatedId }}\" ng-class=\"{\'select2-result-sub\': $select.choiceGrouped($group), \'select2-result-single\': !$select.choiceGrouped($group) }\"><li role=\"option\" id=\"ui-select-choices-row-{{ $select.generatedId }}-{{$index}}\" class=\"ui-select-choices-row\" ng-class=\"{\'select2-highlighted\': $select.isActive(this), \'select2-disabled\': $select.isDisabled(this)}\"><div class=\"select2-result-label ui-select-choices-row-inner\"></div></li></ul></li></ul>");
$templateCache.put("select2/match-multiple.tpl.html","<span class=\"ui-select-match\"><li class=\"ui-select-match-item select2-search-choice\" ng-repeat=\"$item in $select.selected\" ng-class=\"{\'select2-search-choice-focus\':$selectMultiple.activeMatchIndex === $index, \'select2-locked\':$select.isLocked(this, $index)}\" ui-select-sort=\"$select.selected\"><span uis-transclude-append=\"\"></span> <a href=\"javascript:;\" class=\"ui-select-match-close select2-search-choice-close\" ng-click=\"$selectMultiple.removeChoice($index)\" tabindex=\"-1\"></a></li></span>");
$templateCache.put("select2/match.tpl.html","<a class=\"select2-choice ui-select-match\" ng-class=\"{\'select2-default\': $select.isEmpty()}\" ng-click=\"$select.toggle($event)\" aria-label=\"{{ $select.baseTitle }} select\"><span ng-show=\"$select.isEmpty()\" class=\"select2-chosen\">{{$select.placeholder}}</span> <span ng-hide=\"$select.isEmpty()\" class=\"select2-chosen\" ng-transclude=\"\"></span> <abbr ng-if=\"$select.allowClear && !$select.isEmpty()\" class=\"select2-search-choice-close\" ng-click=\"$select.clear($event)\"></abbr> <span class=\"select2-arrow ui-select-toggle\"><b></b></span></a>");
$templateCache.put("select2/select-multiple.tpl.html","<div class=\"ui-select-container ui-select-multiple select2 select2-container select2-container-multi\" ng-class=\"{\'select2-container-active select2-dropdown-open open\': $select.open, \'select2-container-disabled\': $select.disabled}\"><ul class=\"select2-choices\"><span class=\"ui-select-match\"></span><li class=\"select2-search-field\"><input type=\"text\" autocomplete=\"off\" autocorrect=\"off\" autocapitalize=\"off\" spellcheck=\"false\" role=\"combobox\" aria-expanded=\"true\" aria-owns=\"ui-select-choices-{{ $select.generatedId }}\" aria-label=\"{{ $select.baseTitle }}\" aria-activedescendant=\"ui-select-choices-row-{{ $select.generatedId }}-{{ $select.activeIndex }}\" class=\"select2-input ui-select-search\" placeholder=\"{{$selectMultiple.getPlaceholder()}}\" ng-disabled=\"$select.disabled\" ng-hide=\"$select.disabled\" ng-model=\"$select.search\" ng-click=\"$select.activate()\" style=\"width: 34px;\" ondrop=\"return false;\"></li></ul><div class=\"ui-select-dropdown select2-drop select2-with-searchbox select2-drop-active\" ng-class=\"{\'select2-display-none\': !$select.open}\"><div class=\"ui-select-choices\"></div></div></div>");
$templateCache.put("select2/select.tpl.html","<div class=\"ui-select-container select2 select2-container\" ng-class=\"{\'select2-container-active select2-dropdown-open open\': $select.open, \'select2-container-disabled\': $select.disabled, \'select2-container-active\': $select.focus, \'select2-allowclear\': $select.allowClear && !$select.isEmpty()}\"><div class=\"ui-select-match\"></div><div class=\"ui-select-dropdown select2-drop select2-with-searchbox select2-drop-active\" ng-class=\"{\'select2-display-none\': !$select.open}\"><div class=\"select2-search\" ng-show=\"$select.searchEnabled\"><input type=\"text\" autocomplete=\"off\" autocorrect=\"off\" autocapitalize=\"off\" spellcheck=\"false\" role=\"combobox\" aria-expanded=\"true\" aria-owns=\"ui-select-choices-{{ $select.generatedId }}\" aria-label=\"{{ $select.baseTitle }}\" aria-activedescendant=\"ui-select-choices-row-{{ $select.generatedId }}-{{ $select.activeIndex }}\" class=\"ui-select-search select2-input\" ng-model=\"$select.search\"></div><div class=\"ui-select-choices\"></div></div></div>");
$templateCache.put("selectize/choices.tpl.html","<div ng-show=\"$select.open\" class=\"ui-select-choices ui-select-dropdown selectize-dropdown single\"><div class=\"ui-select-choices-content selectize-dropdown-content\"><div class=\"ui-select-choices-group optgroup\" role=\"listbox\"><div ng-show=\"$select.isGrouped\" class=\"ui-select-choices-group-label optgroup-header\" ng-bind=\"$group.name\"></div><div role=\"option\" class=\"ui-select-choices-row\" ng-class=\"{active: $select.isActive(this), disabled: $select.isDisabled(this)}\"><div class=\"option ui-select-choices-row-inner\" data-selectable=\"\"></div></div></div></div></div>");
$templateCache.put("selectize/match.tpl.html","<div ng-hide=\"($select.open || $select.isEmpty())\" class=\"ui-select-match\" ng-transclude=\"\"></div>");
$templateCache.put("selectize/select.tpl.html","<div class=\"ui-select-container selectize-control single\" ng-class=\"{\'open\': $select.open}\"><div class=\"selectize-input\" ng-class=\"{\'focus\': $select.open, \'disabled\': $select.disabled, \'selectize-focus\' : $select.focus}\" ng-click=\"$select.activate()\"><div class=\"ui-select-match\"></div><input type=\"text\" autocomplete=\"off\" tabindex=\"-1\" class=\"ui-select-search ui-select-toggle\" ng-click=\"$select.toggle($event)\" placeholder=\"{{$select.placeholder}}\" ng-model=\"$select.search\" ng-hide=\"!$select.searchEnabled || ($select.selected && !$select.open)\" ng-disabled=\"$select.disabled\" aria-label=\"{{ $select.baseTitle }}\"></div><div class=\"ui-select-choices\"></div></div>");}]);;
/*
 * angular-ui-bootstrap
 * http://angular-ui.github.io/bootstrap/

 * Version: 0.12.1 - 2015-02-20
 * License: MIT
 */
angular.module("ui.bootstrap",["ui.bootstrap.typeahead","ui.bootstrap.position","ui.bootstrap.bindHtml"]),angular.module("ui.bootstrap.typeahead",["ui.bootstrap.position","ui.bootstrap.bindHtml"]).factory("typeaheadParser",["$parse",function(e){var t=/^\s*([\s\S]+?)(?:\s+as\s+([\s\S]+?))?\s+for\s+(?:([\$\w][\$\w\d]*))\s+in\s+([\s\S]+?)$/;return{parse:function(n){var a=n.match(t);if(!a)throw new Error('Expected typeahead specification in form of "_modelValue_ (as _label_)? for _item_ in _collection_" but got "'+n+'".');return{itemName:a[3],source:e(a[4]),viewMapper:e(a[2]||a[1]),modelMapper:e(a[1])}}}}]).directive("typeahead",["$compile","$parse","$q","$timeout","$document","$position","typeaheadParser",function(e,t,n,a,i,r,o){var l=[9,13,27,38,40];return{require:"ngModel",link:function(s,c,u,p){var d,f=s.$eval(u.typeaheadMinLength)||1,g=s.$eval(u.typeaheadWaitMs)||0,m=s.$eval(u.typeaheadEditable)!==!1,h=t(u.typeaheadLoading).assign||angular.noop,v=t(u.typeaheadOnSelect),b=u.typeaheadInputFormatter?t(u.typeaheadInputFormatter):void 0,$=u.typeaheadAppendToBody?s.$eval(u.typeaheadAppendToBody):!1,y=s.$eval(u.typeaheadFocusFirst)!==!1,w=t(u.ngModel).assign,k=o.parse(u.typeahead),D=s.$new();s.$on("$destroy",function(){D.$destroy()});var x="typeahead-"+D.$id+"-"+Math.floor(1e4*Math.random());c.attr({"aria-autocomplete":"list","aria-expanded":!1,"aria-owns":x});var M=angular.element("<div typeahead-popup></div>");M.attr({id:x,matches:"matches",active:"activeIdx",select:"select(activeIdx)",query:"query",position:"position"}),angular.isDefined(u.typeaheadTemplateUrl)&&M.attr("template-url",u.typeaheadTemplateUrl);var T=function(){D.matches=[],D.activeIdx=-1,c.attr("aria-expanded",!1)},E=function(e){return x+"-option-"+e};D.$watch("activeIdx",function(e){0>e?c.removeAttr("aria-activedescendant"):c.attr("aria-activedescendant",E(e))});var C=function(e){var t={$viewValue:e};h(s,!0),n.when(k.source(s,t)).then(function(n){var a=e===p.$viewValue;if(a&&d)if(n.length>0){D.activeIdx=y?0:-1,D.matches.length=0;for(var i=0;i<n.length;i++)t[k.itemName]=n[i],D.matches.push({id:E(i),label:k.viewMapper(D,t),model:n[i]});D.query=e,D.position=$?r.offset(c):r.position(c),D.position.top=D.position.top+c.prop("offsetHeight"),c.attr("aria-expanded",!0)}else T();a&&h(s,!1)},function(){T(),h(s,!1)})};T(),D.query=void 0;var O,A=function(e){O=a(function(){C(e)},g)},S=function(){O&&a.cancel(O)};p.$parsers.unshift(function(e){return d=!0,e&&e.length>=f?g>0?(S(),A(e)):C(e):(h(s,!1),S(),T()),m?e:e?void p.$setValidity("editable",!1):(p.$setValidity("editable",!0),e)}),p.$formatters.push(function(e){var t,n,a={};return b?(a.$model=e,b(s,a)):(a[k.itemName]=e,t=k.viewMapper(s,a),a[k.itemName]=void 0,n=k.viewMapper(s,a),t!==n?t:e)}),D.select=function(e){var t,n,i={};i[k.itemName]=n=D.matches[e].model,t=k.modelMapper(s,i),w(s,t),p.$setValidity("editable",!0),v(s,{$item:n,$model:t,$label:k.viewMapper(s,i)}),T(),a(function(){c[0].focus()},0,!1)},c.bind("keydown",function(e){0!==D.matches.length&&-1!==l.indexOf(e.which)&&(-1!=D.activeIdx||13!==e.which&&9!==e.which)&&(e.preventDefault(),40===e.which?(D.activeIdx=(D.activeIdx+1)%D.matches.length,D.$digest()):38===e.which?(D.activeIdx=(D.activeIdx>0?D.activeIdx:D.matches.length)-1,D.$digest()):13===e.which||9===e.which?D.$apply(function(){D.select(D.activeIdx)}):27===e.which&&(e.stopPropagation(),T(),D.$digest()))}),c.bind("blur",function(){d=!1});var P=function(e){c[0]!==e.target&&(T(),D.$digest())};i.bind("click",P),s.$on("$destroy",function(){i.unbind("click",P),$&&V.remove()});var V=e(M)(D);$?i.find("body").append(V):c.after(V)}}}]).directive("typeaheadPopup",function(){return{restrict:"EA",scope:{matches:"=",query:"=",active:"=",position:"=",select:"&"},replace:!0,templateUrl:"template/typeahead/typeahead-popup.html",link:function(e,t,n){e.templateUrl=n.templateUrl,e.isOpen=function(){return e.matches.length>0},e.isActive=function(t){return e.active==t},e.selectActive=function(t){e.active=t},e.selectMatch=function(t){e.select({activeIdx:t})}}}}).directive("typeaheadMatch",["$http","$templateCache","$compile","$parse",function(e,t,n,a){return{restrict:"EA",scope:{index:"=",match:"=",query:"="},link:function(i,r,o){var l=a(o.templateUrl)(i.$parent)||"template/typeahead/typeahead-match.html";e.get(l,{cache:t}).success(function(e){r.replaceWith(n(e.trim())(i))})}}}]).filter("typeaheadHighlight",function(){function e(e){return e.replace(/([.?*+^$[\]\\(){}|-])/g,"\\$1")}return function(t,n){return n?(""+t).replace(new RegExp(e(n),"gi"),"<strong>$&</strong>"):t}}),angular.module("ui.bootstrap.position",[]).factory("$position",["$document","$window",function(e,t){function n(e,n){return e.currentStyle?e.currentStyle[n]:t.getComputedStyle?t.getComputedStyle(e)[n]:e.style[n]}function a(e){return"static"===(n(e,"position")||"static")}var i=function(t){for(var n=e[0],i=t.offsetParent||n;i&&i!==n&&a(i);)i=i.offsetParent;return i||n};return{position:function(t){var n=this.offset(t),a={top:0,left:0},r=i(t[0]);r!=e[0]&&(a=this.offset(angular.element(r)),a.top+=r.clientTop-r.scrollTop,a.left+=r.clientLeft-r.scrollLeft);var o=t[0].getBoundingClientRect();return{width:o.width||t.prop("offsetWidth"),height:o.height||t.prop("offsetHeight"),top:n.top-a.top,left:n.left-a.left}},offset:function(n){var a=n[0].getBoundingClientRect();return{width:a.width||n.prop("offsetWidth"),height:a.height||n.prop("offsetHeight"),top:a.top+(t.pageYOffset||e[0].documentElement.scrollTop),left:a.left+(t.pageXOffset||e[0].documentElement.scrollLeft)}},positionElements:function(e,t,n,a){var i,r,o,l,s=n.split("-"),c=s[0],u=s[1]||"center";i=a?this.offset(e):this.position(e),r=t.prop("offsetWidth"),o=t.prop("offsetHeight");var p={center:function(){return i.left+i.width/2-r/2},left:function(){return i.left},right:function(){return i.left+i.width}},d={center:function(){return i.top+i.height/2-o/2},top:function(){return i.top},bottom:function(){return i.top+i.height}};switch(c){case"right":l={top:d[u](),left:p[c]()};break;case"left":l={top:d[u](),left:i.left-r};break;case"bottom":l={top:d[c](),left:p[u]()};break;default:l={top:i.top-o,left:p[u]()}}return l}}}]),angular.module("ui.bootstrap.bindHtml",[]).directive("bindHtmlUnsafe",function(){return function(e,t,n){t.addClass("ng-binding").data("$binding",n.bindHtmlUnsafe),e.$watch(n.bindHtmlUnsafe,function(e){t.html(e||"")})}});;
/*
 * angular-ui-bootstrap
 * http://angular-ui.github.io/bootstrap/

 * Version: 0.12.1 - 2015-02-20
 * License: MIT
 */
angular.module("ui.bootstrap",["ui.bootstrap.tpls","ui.bootstrap.typeahead","ui.bootstrap.position","ui.bootstrap.bindHtml"]),angular.module("ui.bootstrap.tpls",["template/typeahead/typeahead-match.html","template/typeahead/typeahead-popup.html"]),angular.module("ui.bootstrap.typeahead",["ui.bootstrap.position","ui.bootstrap.bindHtml"]).factory("typeaheadParser",["$parse",function(e){var t=/^\s*([\s\S]+?)(?:\s+as\s+([\s\S]+?))?\s+for\s+(?:([\$\w][\$\w\d]*))\s+in\s+([\s\S]+?)$/;return{parse:function(n){var a=n.match(t);if(!a)throw new Error('Expected typeahead specification in form of "_modelValue_ (as _label_)? for _item_ in _collection_" but got "'+n+'".');return{itemName:a[3],source:e(a[4]),viewMapper:e(a[2]||a[1]),modelMapper:e(a[1])}}}}]).directive("typeahead",["$compile","$parse","$q","$timeout","$document","$position","typeaheadParser",function(e,t,n,a,i,r,o){var l=[9,13,27,38,40];return{require:"ngModel",link:function(s,c,u,p){var d,f=s.$eval(u.typeaheadMinLength)||1,h=s.$eval(u.typeaheadWaitMs)||0,m=s.$eval(u.typeaheadEditable)!==!1,g=t(u.typeaheadLoading).assign||angular.noop,v=t(u.typeaheadOnSelect),$=u.typeaheadInputFormatter?t(u.typeaheadInputFormatter):void 0,b=u.typeaheadAppendToBody?s.$eval(u.typeaheadAppendToBody):!1,y=s.$eval(u.typeaheadFocusFirst)!==!1,w=t(u.ngModel).assign,k=o.parse(u.typeahead),x=s.$new();s.$on("$destroy",function(){x.$destroy()});var D="typeahead-"+x.$id+"-"+Math.floor(1e4*Math.random());c.attr({"aria-autocomplete":"list","aria-expanded":!1,"aria-owns":D});var M=angular.element("<div typeahead-popup></div>");M.attr({id:D,matches:"matches",active:"activeIdx",select:"select(activeIdx)",query:"query",position:"position"}),angular.isDefined(u.typeaheadTemplateUrl)&&M.attr("template-url",u.typeaheadTemplateUrl);var T=function(){x.matches=[],x.activeIdx=-1,c.attr("aria-expanded",!1)},E=function(e){return D+"-option-"+e};x.$watch("activeIdx",function(e){0>e?c.removeAttr("aria-activedescendant"):c.attr("aria-activedescendant",E(e))});var C=function(e){var t={$viewValue:e};g(s,!0),n.when(k.source(s,t)).then(function(n){var a=e===p.$viewValue;if(a&&d)if(n.length>0){x.activeIdx=y?0:-1,x.matches.length=0;for(var i=0;i<n.length;i++)t[k.itemName]=n[i],x.matches.push({id:E(i),label:k.viewMapper(x,t),model:n[i]});x.query=e,x.position=b?r.offset(c):r.position(c),x.position.top=x.position.top+c.prop("offsetHeight"),c.attr("aria-expanded",!0)}else T();a&&g(s,!1)},function(){T(),g(s,!1)})};T(),x.query=void 0;var O,A=function(e){O=a(function(){C(e)},h)},S=function(){O&&a.cancel(O)};p.$parsers.unshift(function(e){return d=!0,e&&e.length>=f?h>0?(S(),A(e)):C(e):(g(s,!1),S(),T()),m?e:e?void p.$setValidity("editable",!1):(p.$setValidity("editable",!0),e)}),p.$formatters.push(function(e){var t,n,a={};return $?(a.$model=e,$(s,a)):(a[k.itemName]=e,t=k.viewMapper(s,a),a[k.itemName]=void 0,n=k.viewMapper(s,a),t!==n?t:e)}),x.select=function(e){var t,n,i={};i[k.itemName]=n=x.matches[e].model,t=k.modelMapper(s,i),w(s,t),p.$setValidity("editable",!0),v(s,{$item:n,$model:t,$label:k.viewMapper(s,i)}),T(),a(function(){c[0].focus()},0,!1)},c.bind("keydown",function(e){0!==x.matches.length&&-1!==l.indexOf(e.which)&&(-1!=x.activeIdx||13!==e.which&&9!==e.which)&&(e.preventDefault(),40===e.which?(x.activeIdx=(x.activeIdx+1)%x.matches.length,x.$digest()):38===e.which?(x.activeIdx=(x.activeIdx>0?x.activeIdx:x.matches.length)-1,x.$digest()):13===e.which||9===e.which?x.$apply(function(){x.select(x.activeIdx)}):27===e.which&&(e.stopPropagation(),T(),x.$digest()))}),c.bind("blur",function(){d=!1});var P=function(e){c[0]!==e.target&&(T(),x.$digest())};i.bind("click",P),s.$on("$destroy",function(){i.unbind("click",P),b&&V.remove()});var V=e(M)(x);b?i.find("body").append(V):c.after(V)}}}]).directive("typeaheadPopup",function(){return{restrict:"EA",scope:{matches:"=",query:"=",active:"=",position:"=",select:"&"},replace:!0,templateUrl:"template/typeahead/typeahead-popup.html",link:function(e,t,n){e.templateUrl=n.templateUrl,e.isOpen=function(){return e.matches.length>0},e.isActive=function(t){return e.active==t},e.selectActive=function(t){e.active=t},e.selectMatch=function(t){e.select({activeIdx:t})}}}}).directive("typeaheadMatch",["$http","$templateCache","$compile","$parse",function(e,t,n,a){return{restrict:"EA",scope:{index:"=",match:"=",query:"="},link:function(i,r,o){var l=a(o.templateUrl)(i.$parent)||"template/typeahead/typeahead-match.html";e.get(l,{cache:t}).success(function(e){r.replaceWith(n(e.trim())(i))})}}}]).filter("typeaheadHighlight",function(){function e(e){return e.replace(/([.?*+^$[\]\\(){}|-])/g,"\\$1")}return function(t,n){return n?(""+t).replace(new RegExp(e(n),"gi"),"<strong>$&</strong>"):t}}),angular.module("ui.bootstrap.position",[]).factory("$position",["$document","$window",function(e,t){function n(e,n){return e.currentStyle?e.currentStyle[n]:t.getComputedStyle?t.getComputedStyle(e)[n]:e.style[n]}function a(e){return"static"===(n(e,"position")||"static")}var i=function(t){for(var n=e[0],i=t.offsetParent||n;i&&i!==n&&a(i);)i=i.offsetParent;return i||n};return{position:function(t){var n=this.offset(t),a={top:0,left:0},r=i(t[0]);r!=e[0]&&(a=this.offset(angular.element(r)),a.top+=r.clientTop-r.scrollTop,a.left+=r.clientLeft-r.scrollLeft);var o=t[0].getBoundingClientRect();return{width:o.width||t.prop("offsetWidth"),height:o.height||t.prop("offsetHeight"),top:n.top-a.top,left:n.left-a.left}},offset:function(n){var a=n[0].getBoundingClientRect();return{width:a.width||n.prop("offsetWidth"),height:a.height||n.prop("offsetHeight"),top:a.top+(t.pageYOffset||e[0].documentElement.scrollTop),left:a.left+(t.pageXOffset||e[0].documentElement.scrollLeft)}},positionElements:function(e,t,n,a){var i,r,o,l,s=n.split("-"),c=s[0],u=s[1]||"center";i=a?this.offset(e):this.position(e),r=t.prop("offsetWidth"),o=t.prop("offsetHeight");var p={center:function(){return i.left+i.width/2-r/2},left:function(){return i.left},right:function(){return i.left+i.width}},d={center:function(){return i.top+i.height/2-o/2},top:function(){return i.top},bottom:function(){return i.top+i.height}};switch(c){case"right":l={top:d[u](),left:p[c]()};break;case"left":l={top:d[u](),left:i.left-r};break;case"bottom":l={top:d[c](),left:p[u]()};break;default:l={top:i.top-o,left:p[u]()}}return l}}}]),angular.module("ui.bootstrap.bindHtml",[]).directive("bindHtmlUnsafe",function(){return function(e,t,n){t.addClass("ng-binding").data("$binding",n.bindHtmlUnsafe),e.$watch(n.bindHtmlUnsafe,function(e){t.html(e||"")})}}),angular.module("template/typeahead/typeahead-match.html",[]).run(["$templateCache",function(e){e.put("template/typeahead/typeahead-match.html",'<a tabindex="-1" bind-html-unsafe="match.label | typeaheadHighlight:query"></a>')}]),angular.module("template/typeahead/typeahead-popup.html",[]).run(["$templateCache",function(e){e.put("template/typeahead/typeahead-popup.html",'<ul class="dropdown-menu" ng-show="isOpen()" ng-style="{top: position.top+\'px\', left: position.left+\'px\'}" style="display: block;" role="listbox" aria-hidden="{{!isOpen()}}">\n    <li ng-repeat="match in matches track by $index" ng-class="{active: isActive($index) }" ng-mouseenter="selectActive($index)" ng-click="selectMatch($index)" role="option" id="{{match.id}}">\n        <div typeahead-match index="$index" match="match" query="query" template-url="templateUrl"></div>\n    </li>\n</ul>\n')}]);;
(function () {

  /**
   * Behavioral spec:
   * Selecting parent does NOT affect selection state of children
   * Selecting children does NOT affect selection state of parent
   * Completely unselected ree should begin completely collapsed
   * All selected nodes must be visible to start
   */

  var m = angular.module('TreeSelector', []);

  m.directive('treeSelectorWidget', [function () {

    function treeLinker(scope, elem, attr, contr, transFn) {

      scope.range = function(n) {
        return new Array(n);
      }

      scope.$watch('tree', function (newTree) {
        var result = [];
        for (var i = 0; i < scope.tree.length; i++) {
          result = result.concat(flattenTree(scope.tree[i]));
        }
        scope.flatTree = result;
      });

      var selected = [];
      scope.$watchCollection('selected', function (newItems) {
        selected = [];

        for (var i = 0; i < newItems.length; i++) {
          var id = 0;
          if (typeof newItems[i] == 'object') {
            id = newItems[i].value || newItems[i].id || 0;
          }
          else if (typeof newItems[i] == 'Number') {
            id = newItems[i];
          }
          selected.push(id);
        }

        if (selected.length) {
          openAncestors();
        }
      });

      attr.$observe('filter', function (value) {
        scope.filterString = value;
      })

      /**
       * Loop backwards through the flat tree, looking for children that have been selected
       * then setting the ancestors of any selected children to be expanded
       */
      function openAncestors() {
        var parent = 0;
        for (var i = scope.flatTree.length - 1; i >= 0; i--) {
          if (scope.flatTree[i].depth && scope.isChecked(scope.flatTree[i].value)) {
            parent = scope.flatTree[i].parent;
          }

          if (scope.flatTree[i].value == parent) {
            scope.flatTree[i].collapsed = false;
            if (scope.flatTree[i].depth) {
              parent = scope.flatTree[i].parent;
            }
          }
        }
      }

      scope.parentCollapsed = function (parent) {
        var node = findNode(parent);
        if (node) {
          return node.collapsed;
        }
        return true;
      }

      function findNode(id) {
        var i = 0,
          l = scope.flatTree.length;

        for(;i<l;i++) {
          if (scope.flatTree[i].value == id) {
            return scope.flatTree[i];
          }
        }
      }

      scope.isChecked = function (id) {
        var i = 0,
          l = selected.length;

        for(;i<l;i++) {
          if (selected[i] == id) {
            return true;
          }
        }

        return false;
      }

      scope.toggleNode = function (node) {
        scope.onChange({$node: node})
      }

    }

    /**
     * Given a node, returns an array with the node and all its descendants on the same level
     * @param node
     */
    function flattenTree(node) {
      var output = [],
        depth = (node.depth !== undefined) ? node.depth : 0;
      node.collapsed = true;

      if (node.depth === undefined) {
        node.depth = depth;
      }
      output.push(node);
      if (Array.isArray(node.children)) {
        node.hasChildren = true;
        node.isLeaf = false;
        for (var i = 0; i < node.children.length; i++) {
          node.children[i].parent = node.value
          node.children[i].depth = depth + 1;
          output = output.concat(flattenTree(node.children[i]));
        }
      }
      else {
        node.isLeaf = true;
        node.hasChildren = false;
      }

      return output;
    }

    return {
      restrict: 'AE',
      scope: {
        tree: '=',  // proper tree
        selected: '=', // flat array of selected ids
        onChange: '&' // event handler to invoke when a node is changed
      },
      link: treeLinker,
      template: '<ul><li ng-repeat="node in flatTree | filter:{label:filterString}" ng-show="node.depth == 0 || !parentCollapsed(node.parent)">' +
        '<span class="spacer" ng-repeat="i in range(node.depth)"></span>' +
        '<span class="expander" ng-class="{collapsed: node.collapsed, empty: !node.hasChildren}" ng-click="node.collapsed = !node.collapsed">&nbsp;</span>' +
        '<input type="checkbox" value="node.value" ng-click="toggleNode(node)" ng-checked="isChecked(node.value)"> {{node.label}}' +
      '</li></ul>'
    };

  }]);
})();;
(function () {
/**
 * Provides mechanisms for choosing a taxonomy term for a given entity.
 */
var taxonomy = angular.module('TaxonomyWidget', ['EntityService', 'os-auth', 'ui.select', 'ngSanitize', 'ui.bootstrap', 'ui.bootstrap.typeahead', 'TreeSelector']);

taxonomy.directive('taxonomyWidget', ['EntityService', function (EntityService) {
  var path = Drupal.settings.paths.TaxonomyWidget;
  return {
    restrict: 'E',
    scope: {
      terms: "=",
      bundle: "@"
    },
    templateUrl: path + '/TaxonomyWidget.html?vers='+Drupal.settings.version.TaxonomyWidget,
    link: function (scope, elem, attrs) {
      var entityType = attrs.entityType;
      var vocabService = new EntityService('vocabulary', 'id');
      var termService = new EntityService('taxonomy', 'id');
      var termChange = false;
      var selectChange = false;
      scope.allTerms = {};
      scope.termsTree = [];
      scope.selectedTerms = {};
      scope.disabled = true;

      // Any change in the selected term scope will affect the file terms.
      // This can be done thanks to a "Two way binding" implements using the
      // = operator which defined in the isolated scope.
      scope.$watch('terms', function(newTerms, oldTerms) {
        if (!selectChange) {
          termChange = true;
          var bundle = attrs.bundle;
          if (newTerms instanceof Array) {
            vocabService.fetch({entity_type: entityType, bundle: bundle}).then(function (result) {

              scope.vocabs = result;
              for (var i = 0; i < scope.vocabs.length; i++) {
                var vocab = scope.vocabs[i];

                scope.termsTree[vocab.id] = vocab.tree;
                scope.allTerms[vocab.id] = [];

                scope.selectedTerms[vocab.id] = scope.selectedTerms[vocab.id] || [];

                termService.fetch({vid: vocab.id}).then(function (result) {
                  // If this vocab has no terms, bail out.
                  if (result.length == 0) return;

                  // Get the vocab so we can check it later
                  // We can't use the vocab var in the parent closure, because it changes before this code is executed
                  // and will always be set to the last vocab processed.
                  var vocab;
                  for (var i = 0; i < scope.vocabs.length; i++) {
                    if (scope.vocabs[i].id == result[0].vid) {
                      vocab = scope.vocabs[i];
                      break;
                    }
                  }

                  // Loop over the terms we just fetched.
                  for (var j = 0; j < result.length; j++) {
                    // Create a new object so we can ensure it passes equality tests
                    var t = result[j],
                      term = {
                        id: t.id,
                        label: t.label,
                        vid: t.vid
                      };
                    scope.allTerms[t.vid].push(term);

                    // Build scope.selectedTerms using the same object in allTerms
                    for (var i = 0; i < newTerms.length; i++) {
                      if (newTerms[i].id == t.id) {
                        scope.selectedTerms[t.vid].push(term);
                        break;
                      }
                    }
                  }

                  scope.disabled = false;
                });
              }
            });
          }
        }
        selectChange = false;
      }, true);

      /**
       * Converts our multi-tiered selectedTerms array into a flat array like what was passed to us earlier.
       */
      scope.$watch('selectedTerms', function(newTerms, oldTerms) {
        if (!termChange) {
          selectChange = true;
          scope.terms = [];
          for (var k in newTerms) {
            for (var i = 0; i < newTerms[k].length; i++) {
              if (newTerms[k][i] && newTerms[k][i].id) {
                scope.terms.push(newTerms[k][i]);
              }
            }
          }
        }
        termChange = false;
      }, true);

      /**
       * Add another term to the selected terms object.
       */
      scope.onSelect = function ($item, $model, $label) {
        scope.selectedTerms[$item.vid].splice(0, 0, $item);
        this.autocompleteTerm = null;
      };

      /**
       * Remove term from the selected terms object
       * @param vid
       * @param $index
       */
      scope.removeTerm = function (vid, $index) {
        scope.selectedTerms[vid].splice($index, 1);
      }

      /**
       * Add and remove a term when checking/un-checking the checkbox.
       */
      scope.termsSelected = function(term, object) {
        if (!scope.selectedTerms[term.vid]) {
          scope.selectedTerms[term.vid] = [];
        }

        var found = false;
        for (var i = 0; i < scope.selectedTerms[term.vid].length; i++) {
          if (scope.selectedTerms[term.vid][i].id == term.id) {
            scope.selectedTerms[term.vid].splice(i, 1);
            found = true;
            break;
          }
        }

        if (!found) {
          scope.selectedTerms[term.vid].push(term);
        }
      };

      scope.termSet = function(term) {
        for (var i = 0; i < scope.selectedTerms[term.vid].length; i++) {
          if (scope.selectedTerms[term.vid][i].id == term.id) {
            return true;
          }
        }

        return false;
      }

      scope.termTreeChangeCallback = function(node, tree) {

        /*if (Object.keys(node).indexOf('children') != -1) {
          // Iterating over the children's of the term.
          angular.forEach(node.children, function(value, key) {
            scope.termTreeChangeCallback(value);
          });
        }*/

        scope.termsSelected(termService.get(node.value));
      };

      scope.alreadySelected = function ($item) {
        if ($item && scope.selectedTerms[$item.vid].indexOf($item) == -1) {
          return $item;
        }
      }
    }
  }
}]);
})();;
(function ($) {
  var libraryPath = '';

  angular.module('FileEditor', ['EntityService', 'os-auth', 'TaxonomyWidget']).
    config(function () {
      libraryPath = Drupal.settings.paths.FileEditor;
    }).
    constant("FILEEDITOR_RESPONSES", {
      SAVED: "saved",
      REPLACED: "replaced",
      NO_CHANGES: "no changes",
      CANCELED: "canceled"
    }).
    directive('fileEdit', ['EntityService', '$http', '$timeout', '$filter', 'FILEEDITOR_RESPONSES', function (EntityService, $http, $timeout, $filter, FER) {
      return {
        scope: {
          file :  '=',
          onClose : '&'
        },
        templateUrl: libraryPath + '/file_edit_base.html?vers='+Drupal.settings.version.FileEditor,
        link: function (scope, elem, attr, c, trans) {
          var fileService = new EntityService('files', 'id'),
              files = [],
              file_replaced = false;

          fileService.fetch().then(function (data) {
            files = data;
            return data;
          });

          scope.fileEditAddt = '';
          scope.date = '';
          scope.description_label = 'Descriptive Text - will display under the filename';
          scope.schema = '';
          scope.$watch('file', function (f) {

            if (!f) {
              return;
            }

            scope.schema = f.schema;
            scope.fileEditAddt = libraryPath+'/file_edit_'+f.type+'.html?vers='+Drupal.settings.version.FileEditor;
            scope.date = $filter('date')(f.timestamp+'000', 'short');
            scope.file.terms = scope.file.terms || [];

            scope.fullPath = f.url.slice(0, f.url.lastIndexOf('/')+1);
            scope.extension = '.' + getExtension(f.url);
            if (scope.file.type == 'image') {
              scope.description_label = 'Image Caption';
            }
          });

          var dateTimeout;
          scope.$watch('date', function (value, old) {
            if (value == old ) return;
            scope.invalidDate = false;
            var d = new Date(value);
            if (isNaN(d.getTime())) {
              scope.invalidDate = true;
              return;
            }
            if (d) {
              scope.file.timestamp = parseInt(d.getTime() / 1000);
              if (dateTimeout) {
                $timeout.cancel(dateTimeout);
              }
              dateTimeout = $timeout(function () {
                scope.date = $filter('date')(scope.file.timestamp+'000', 'short');
              }, 3000);
            }
          });

          scope.invalidFileName = false;
          scope.$watch('file.filename', function (filename, old) {
            if (typeof filename != 'string' || !scope.file) {
              return;
            }
            if (scope.file.schema == 'oembed') {
              scope.invalidFileName = false;
              return;
            }
            scope.invalidFileName = false;
            if (filename == "") {
              scope.invalidFileName = true;
              return;
            }
            if (!filename.match(/^([a-zA-Z0-9_\.-]*)$/)) {
              scope.invalidFileName = true;
              return;
            }
            var lower = filename.toLowerCase();
            if (lower != old) {
              for (var i in files) {
                if (lower == files[i].filename && scope.file.id != files[i].id) {
                  scope.invalidFileName = true;
                  return;
                }
              }
            }
          });

          scope.invalidName = true;
          scope.$watch('file.name', function (name, old) {
            if (!name) {
              scope.invalidName = true;
            }
            else {
              scope.invalidName = false;
            }
          });

          scope.invalidAlt = true;
          scope.$watch('file.image_alt', function (alt, old) {
            scope.invalidAlt = !alt;
          });

          scope.showWarning = false;
          scope.showSuccess = false;
          scope.replaceReject = false;
          scope.validate = function ($file) {
            if (!$file) return true;

            if (getExtension(scope.file.url) == getExtension($file.name)) {
              return true;
            }

            return false;
          };

          scope.displayWarning = function() {
            scope.showWarning = true;
          };

          scope.prepForReplace = function ($files, $event, $rejectedFiles) {
            if ($event.type != 'change') return;
            if ($files.length) {
              var file = $files[0],
                fields = {};

              if (typeof Drupal.settings.spaces != 'undefined') {
                fields.vsite = Drupal.settings.spaces.id
              }

              var config = {
                headers: {
                  'Content-Type': (getExtension(file.name) == 'csv') ? 'text/csv' : file.type
                }
              };

              $http.put(Drupal.settings.paths.api + '/files/' + scope.file.id, file, config)
                .success(function (result) {
                  scope.showWarning = false;
                  scope.replaceSuccess = true;
                  file_replaced = true;

                  fileService.register(result.data[0]);

                  $timeout(function () {
                    scope.replaceSuccess = false;
                  }, 5000);
                })
              .error(function (error) {
                  scope.errorMessages = error.title;
                  scope.showErrorMessages = true;
              });
            }
            else {
              scope.replaceReject = true;
              $timeout(function () {
                scope.replaceReject = false;
              }, 5000);
            }
          };

          scope.canSave = function () {
            var can_save = scope.invalidFileName || scope.invalidName;

            if (scope.file.type == 'image') {
              // If decorative checked, no need to validate Alt field.
              if (scope.file.is_decorative) {
                return can_save;
              }
              return can_save || scope.invalidAlt;
            }

            return can_save;
          };

          scope.save = function () {
            fileService.edit(scope.file, ['preview', 'url', 'size', 'changed', 'mimetype']).then(function(result) {
                if (result.data || typeof scope.file.new != 'undefined') {
                  scope.onClose({saved: FER.SAVED});
                }
                else if (file_replaced) {
                  scope.onClose({saved: FER.REPLACED});
                }
                else if (result.detail) {
                  scope.onClose({saved: FER.NO_CHANGES});
                }
                else {
                  scope.onClose({saved: FER.CANCELED});
                }
            },
            function(result) {
              switch (result.status) {
                case 409:
                  scope.errorMessages = 'Please wait. Another member of your website has updated this file since you last updated it, and we\'re retrieving an updated version. Once this message disappears, you\'ll need re-enter any changes you had made.<br><img src="'+Drupal.settings.paths.FileEditor+'/large-spin_loader.gif" class="file-retrieve-spinner">';
                  scope.showErrorMessages = true;
                  break;
                case 410:
                  scope.errorMessages = 'This file has been deleted. It will be removed from your listing shortly.';
                  scope.showErrorMessages = true;
                  scope.deletedRedirect = true;
                  break;
                default:
                  scope.errorMessages = result.data.title.replace(/[^\s:]*: /, '');
                  scope.showErrorMessages = true;
              }
            });
          }

          scope.$on('EntityCacheUpdater.cacheUpdated', function () {
            if (scope.showErrorMessages) {
              $timeout(function () {
                scope.showErrorMessages = false;
              }, 5000);
              scope.file = angular.copy(fileService.get(scope.file.id));
            }
          });

          scope.cancel = function () {
            scope.onClose({saved: file_replaced ? FER.REPLACED : FER.CANCELED});
          }

          scope.closeErrors = function () {
            scope.showErrorMessages = false;
            if (scope.deletedRedirect) {
              scope.deletedRedirect = false;
              scope.cancel();
            }
          }
        }
      }
    }]);

  /**
   * The regex contained within was tested against the following strings:
   *
   * #derp.txt?mtime=garbage
   * derp.txt
   * de?rp.txt
   * de?rp.txt?mtime=garbage
   * de#rp.txt
   * de#4p.txt#herp
   * de.rp.txt
   * derp.txt?mtime=garbage#herp
   * http://customdomain.com/sites/default/files/department/files/accordion_widget.png?m=1432822855
   * http://hwpi.harvard.edu/os_fast/files/able/t-bill_rates.pdf  ((private files path))
   * derp.txt?mtime=gar.bage
   * de rp.txt
   * de rp.txt?mtime=gar.bage
   *
   * Tested with regexr.com
   */
  function getExtension(url) {
    // patterns
    // .?= (file with query params at the end) /\.([a-zA-Z0-9])*\?/
    // ?. (file with ? in the middle for some reason) /$([a-zA-Z0-9?]
    // .?. (file with multiple . and ? before the last one
    // .?=. (file with . in query param

    // ([a-z]+:\/\/[a-zA-Z0-9.\/-]+\/)? matches against http://something.com/a/b/ or nothing at all
    // [a-zA-Z0-9.?#_-]+ matches against the filename without extension
    // ([a-zA-Z0-9]+) matches the extension itself
    // ($|[?#]) matches end of the string or a URL filename terminator (? or #)
    var r = /^([a-z]+:\/\/[a-zA-Z0-9.\/_-]+\/)?[a-zA-Z0-9.?#_ -]+\.([a-zA-Z0-9]+)($|[?#])/,
      result = r.exec(url);

    if (result) {
      return result[2].toLowerCase();
    }
  }

})(jQuery);
;
//  angularModalService.js
//
//  Service for showing modal dialogs.

/***** JSLint Config *****/
/*global angular  */
(function() {

  'use strict';

  var module = angular.module('angularModalService', []);

  module.factory('ModalService', ['$document', '$compile', '$controller', '$http', '$rootScope', '$q', '$templateCache',
    function($document, $compile, $controller, $http, $rootScope, $q, $templateCache) {

    //  Get the body of the document, we'll add the modal to this.
    var body = $document.find('body');

    function ModalService() {

      var self = this;

      //  Returns a promise which gets the template, either
      //  from the template parameter or via a request to the
      //  template url parameter.
      var getTemplate = function(template, templateUrl) {
        var deferred = $q.defer();
        if(template) {
          deferred.resolve(template);
        } else if(templateUrl) {
          // check to see if the template has already been loaded
          var cachedTemplate = $templateCache.get(templateUrl);
          if(cachedTemplate !== undefined) {
            deferred.resolve(cachedTemplate);
          }
          // if not, let's grab the template for the first time
          else {
            $http({method: 'GET', url: templateUrl, cache: true})
              .then(function(result) {
                // save template into the cache and return the template
                $templateCache.put(templateUrl, result.data);
                deferred.resolve(result.data);
              }, function(error) {
                deferred.reject(error);
              });
          }
        } else {
          deferred.reject("No template or templateUrl has been specified.");
        }
        return deferred.promise;
      };

      self.showModal = function(options) {

        //  Create a deferred we'll resolve when the modal is ready.
        var deferred = $q.defer();

        //  Validate the input parameters.
        var controllerName = options.controller;
        if(!controllerName) {
          deferred.reject("No controller has been specified.");
          return deferred.promise;
        }

        //  If a 'controllerAs' option has been provided, we change the controller
        //  name to use 'as' syntax. $controller will automatically handle this.
        if(options.controllerAs) {
          controllerName = controllerName + " as " + options.controllerAs;
        }

        //  Get the actual html of the template.
        getTemplate(options.template, options.templateUrl)
          .then(function(template) {

            //  Create a new scope for the modal.
            var modalScope = $rootScope.$new();

            //  Create the inputs object to the controller - this will include
            //  the scope, as well as all inputs provided.
            //  We will also create a deferred that is resolved with a provided
            //  close function. The controller can then call 'close(result)'.
            //  The controller can also provide a delay for closing - this is
            //  helpful if there are closing animations which must finish first.
            var closeDeferred = $q.defer();
            var inputs = {
              $scope: modalScope,
              close: function(result, delay) {
                if(delay === undefined || delay === null) delay = 0;
                window.setTimeout(function() {
                  //  Resolve the 'close' promise.
                  closeDeferred.resolve(result);

                  //  We can now clean up the scope and remove the element from the DOM.
                  modalScope.$destroy();
                  modalElement.remove();
                  
                  //  Unless we null out all of these objects we seem to suffer
                  //  from memory leaks, if anyone can explain why then I'd 
                  //  be very interested to know.
                  inputs.close = null;
                  deferred = null;
                  closeDeferred = null;
                  modal = null;
                  inputs = null;
                  modalElement = null;
                  modalScope = null;
                }, delay);
              }
            };

            //  If we have provided any inputs, pass them to the controller.
            if(options.inputs) {
              for(var inputName in options.inputs) {
                inputs[inputName] = options.inputs[inputName];
              }
            }

            //  Parse the modal HTML into a DOM element (in template form).
            var modalElementTemplate = angular.element(template);

            //  Compile then link the template element, building the actual element.
            //  Set the $element on the inputs so that it can be injected if required.
            var linkFn = $compile(modalElementTemplate);
            var modalElement = linkFn(modalScope);
            inputs.$element = modalElement;

            //  Create the controller, explicitly specifying the scope to use.
            var modalController = $controller(controllerName, inputs);

            //  Finally, append the modal to the dom.
            if (options.appendElement) {
              // append to custom append element
              options.appendElement.append(modalElement);
            } else {
              // append to body when no custom append element is specified
              body.append(modalElement);
            }

            //  We now have a modal object...
            var modal = {
              controller: modalController,
              scope: modalScope,
              element: modalElement,
              close: closeDeferred.promise
            };

            //  ...which is passed to the caller via the promise.
            deferred.resolve(modal);

          })
          .then(null, function(error) { // 'catch' doesn't work in IE8.
            deferred.reject(error);
          });

        return deferred.promise;
      };

    }

    return new ModalService();
  }]);

}());
;
(function () {
  var service,
    dialogParams = {
      minWidth: 800,
      minHeight: 650,
      modal: true,
      position: 'center',
      dialogClass: 'file-editor'
    },
    loading,
    fetchPromise;


  angular.module('FileEditorModal', ['EntityService', 'FileEditor', 'angularModalService', 'angularFileUpload', 'locationFix'])
    .run(['EntityService', function (EntityService) {
      service = new EntityService('files', 'id');
      loading = true;
      fetchPromise = service.fetch().then(function() {
        loading = false;
      });
    }])
    .service('FileEditorOpenModal', ['ModalService', function (ModalService) {

      return {
        open: function (fid, close) {
          ModalService.showModal({
            template: '<div><div class="file-entity-loading" ng-show="loading"><div class="file-entity-loading-message">Loading files...<br />' +
                '<div class="progress-bar progress-striped"><div class="progress-bar-completed" style="width: 100%"></div></div></div></div>' +
                '<div file-edit file="file" on-close="closeModal(saved)"></div></div>',
            controller: 'FileEditorModalController',
            inputs: {
              fid: fid
            }
          })
          .then (function (modal) {
            modal.element.dialog(dialogParams);
            modal.close.then(function(result) {
              if (angular.isFunction(close)) {
                close({result: result});
              }
            });
          })
        }
      }

    }])
    .directive('fileEditorModal', ['FileEditorOpenModal', function(feom) {

      function link(scope, elem, attr) {
        var data = {
          scope: scope
        }
        elem.bind('click', data, clickHandler);
        scope.runViews = false;
        if (!attr.onClose && attr.viewsClose) {
          scope.runViews = true;
        }

        elem.parent().find('.fid').change(function (e) {
          // Media removes all click events on the edit button, so we have to add the handler again if we want
          // this to continue working.
          elem.bind('click', data, clickHandler);
          elem.attr('fid', e.target.value);
        })
      }

      function clickHandler(event) {
        event.preventDefault();
        event.stopPropagation();
        var fid = event.currentTarget.attributes.fid.value,
          scope = event.data.scope,
          closer = scope.runViews ? scope.viewsClose : scope.onClose;

        feom.open(fid, closer);

        return false;
      }

      return {
        link: link,
        scope: {
          onClose: '&',
          viewsClose: '&'
        }
      }
    }])
    .controller('FileEditorModalController', ['$scope', 'EntityService', 'fid', 'close', function ($scope, EntityService, fid, close) {
      $scope.loading = loading;
      $scope.asset_path = Drupal.settings.paths.FileEditor;
      if (loading) {
        fetchPromise.then(function () {
          $scope.file = angular.copy(service.get(fid));
          $scope.loading = loading;
        });
      }
      else {
        $scope.file = angular.copy(service.get(fid));
      }

      $scope.closeModal = function (saved) {
        close(saved);
      }
    }]);
})();
;
/**
 * @file
 * Attaches behaviors for the Contextual module.
 */

(function ($) {

Drupal.contextualLinks = Drupal.contextualLinks || {};

/**
 * Attaches outline behavior for regions associated with contextual links.
 */
Drupal.behaviors.contextualLinks = {
  attach: function (context) {
    $('div.contextual-links-wrapper', context).once('contextual-links', function () {
      var $wrapper = $(this);
      var $region = $wrapper.closest('.contextual-links-region');
      var $links = $wrapper.find('ul.contextual-links');
      var $trigger = $('<a class="contextual-links-trigger" href="#" />').text(Drupal.t('Configure')).click(
        function () {
          $links.stop(true, true).slideToggle(100);
          $wrapper.toggleClass('contextual-links-active');
          return false;
        }
      );
      // Attach hover behavior to trigger and ul.contextual-links.
      $trigger.add($links).hover(
        function () { $region.addClass('contextual-links-region-active'); },
        function () { $region.removeClass('contextual-links-region-active'); }
      );
      // Hide the contextual links when user clicks a link or rolls out of the .contextual-links-region.
      $region.bind('mouseleave click', Drupal.contextualLinks.mouseleave);
      $region.hover(
        function() { $trigger.addClass('contextual-links-trigger-active'); },
        function() { $trigger.removeClass('contextual-links-trigger-active'); }
      );
      // Prepend the trigger.
      $wrapper.prepend($trigger);
    });
  }
};

/**
 * Disables outline for the region contextual links are associated with.
 */
Drupal.contextualLinks.mouseleave = function () {
  $(this)
    .find('.contextual-links-active').removeClass('contextual-links-active')
    .find('ul.contextual-links').hide();
};

})(jQuery);
;
/*! jQuery UI - v1.10.2 - 2013-03-14
* http://jqueryui.com
* Copyright 2013 jQuery Foundation and other contributors; Licensed MIT */
(function(t){var e,i,s,n,a="ui-button ui-widget ui-state-default ui-corner-all",o="ui-state-hover ui-state-active ",r="ui-button-icons-only ui-button-icon-only ui-button-text-icons ui-button-text-icon-primary ui-button-text-icon-secondary ui-button-text-only",h=function(){var e=t(this).find(":ui-button");setTimeout(function(){e.button("refresh")},1)},l=function(e){var i=e.name,s=e.form,n=t([]);return i&&(i=i.replace(/'/g,"\\'"),n=s?t(s).find("[name='"+i+"']"):t("[name='"+i+"']",e.ownerDocument).filter(function(){return!this.form})),n};t.widget("ui.button",{version:"1.10.2",defaultElement:"<button>",options:{disabled:null,text:!0,label:null,icons:{primary:null,secondary:null}},_create:function(){this.element.closest("form").unbind("reset"+this.eventNamespace).bind("reset"+this.eventNamespace,h),"boolean"!=typeof this.options.disabled?this.options.disabled=!!this.element.prop("disabled"):this.element.prop("disabled",this.options.disabled),this._determineButtonType(),this.hasTitle=!!this.buttonElement.attr("title");var o=this,r=this.options,c="checkbox"===this.type||"radio"===this.type,u=c?"":"ui-state-active",d="ui-state-focus";null===r.label&&(r.label="input"===this.type?this.buttonElement.val():this.buttonElement.html()),this._hoverable(this.buttonElement),this.buttonElement.addClass(a).attr("role","button").bind("mouseenter"+this.eventNamespace,function(){r.disabled||this===e&&t(this).addClass("ui-state-active")}).bind("mouseleave"+this.eventNamespace,function(){r.disabled||t(this).removeClass(u)}).bind("click"+this.eventNamespace,function(t){r.disabled&&(t.preventDefault(),t.stopImmediatePropagation())}),this.element.bind("focus"+this.eventNamespace,function(){o.buttonElement.addClass(d)}).bind("blur"+this.eventNamespace,function(){o.buttonElement.removeClass(d)}),c&&(this.element.bind("change"+this.eventNamespace,function(){n||o.refresh()}),this.buttonElement.bind("mousedown"+this.eventNamespace,function(t){r.disabled||(n=!1,i=t.pageX,s=t.pageY)}).bind("mouseup"+this.eventNamespace,function(t){r.disabled||(i!==t.pageX||s!==t.pageY)&&(n=!0)})),"checkbox"===this.type?this.buttonElement.bind("click"+this.eventNamespace,function(){return r.disabled||n?!1:undefined}):"radio"===this.type?this.buttonElement.bind("click"+this.eventNamespace,function(){if(r.disabled||n)return!1;t(this).addClass("ui-state-active"),o.buttonElement.attr("aria-pressed","true");var e=o.element[0];l(e).not(e).map(function(){return t(this).button("widget")[0]}).removeClass("ui-state-active").attr("aria-pressed","false")}):(this.buttonElement.bind("mousedown"+this.eventNamespace,function(){return r.disabled?!1:(t(this).addClass("ui-state-active"),e=this,o.document.one("mouseup",function(){e=null}),undefined)}).bind("mouseup"+this.eventNamespace,function(){return r.disabled?!1:(t(this).removeClass("ui-state-active"),undefined)}).bind("keydown"+this.eventNamespace,function(e){return r.disabled?!1:((e.keyCode===t.ui.keyCode.SPACE||e.keyCode===t.ui.keyCode.ENTER)&&t(this).addClass("ui-state-active"),undefined)}).bind("keyup"+this.eventNamespace+" blur"+this.eventNamespace,function(){t(this).removeClass("ui-state-active")}),this.buttonElement.is("a")&&this.buttonElement.keyup(function(e){e.keyCode===t.ui.keyCode.SPACE&&t(this).click()})),this._setOption("disabled",r.disabled),this._resetButton()},_determineButtonType:function(){var t,e,i;this.type=this.element.is("[type=checkbox]")?"checkbox":this.element.is("[type=radio]")?"radio":this.element.is("input")?"input":"button","checkbox"===this.type||"radio"===this.type?(t=this.element.parents().last(),e="label[for='"+this.element.attr("id")+"']",this.buttonElement=t.find(e),this.buttonElement.length||(t=t.length?t.siblings():this.element.siblings(),this.buttonElement=t.filter(e),this.buttonElement.length||(this.buttonElement=t.find(e))),this.element.addClass("ui-helper-hidden-accessible"),i=this.element.is(":checked"),i&&this.buttonElement.addClass("ui-state-active"),this.buttonElement.prop("aria-pressed",i)):this.buttonElement=this.element},widget:function(){return this.buttonElement},_destroy:function(){this.element.removeClass("ui-helper-hidden-accessible"),this.buttonElement.removeClass(a+" "+o+" "+r).removeAttr("role").removeAttr("aria-pressed").html(this.buttonElement.find(".ui-button-text").html()),this.hasTitle||this.buttonElement.removeAttr("title")},_setOption:function(t,e){return this._super(t,e),"disabled"===t?(e?this.element.prop("disabled",!0):this.element.prop("disabled",!1),undefined):(this._resetButton(),undefined)},refresh:function(){var e=this.element.is("input, button")?this.element.is(":disabled"):this.element.hasClass("ui-button-disabled");e!==this.options.disabled&&this._setOption("disabled",e),"radio"===this.type?l(this.element[0]).each(function(){t(this).is(":checked")?t(this).button("widget").addClass("ui-state-active").attr("aria-pressed","true"):t(this).button("widget").removeClass("ui-state-active").attr("aria-pressed","false")}):"checkbox"===this.type&&(this.element.is(":checked")?this.buttonElement.addClass("ui-state-active").attr("aria-pressed","true"):this.buttonElement.removeClass("ui-state-active").attr("aria-pressed","false"))},_resetButton:function(){if("input"===this.type)return this.options.label&&this.element.val(this.options.label),undefined;var e=this.buttonElement.removeClass(r),i=t("<span></span>",this.document[0]).addClass("ui-button-text").html(this.options.label).appendTo(e.empty()).text(),s=this.options.icons,n=s.primary&&s.secondary,a=[];s.primary||s.secondary?(this.options.text&&a.push("ui-button-text-icon"+(n?"s":s.primary?"-primary":"-secondary")),s.primary&&e.prepend("<span class='ui-button-icon-primary ui-icon "+s.primary+"'></span>"),s.secondary&&e.append("<span class='ui-button-icon-secondary ui-icon "+s.secondary+"'></span>"),this.options.text||(a.push(n?"ui-button-icons-only":"ui-button-icon-only"),this.hasTitle||e.attr("title",t.trim(i)))):a.push("ui-button-text-only"),e.addClass(a.join(" "))}}),t.widget("ui.buttonset",{version:"1.10.2",options:{items:"button, input[type=button], input[type=submit], input[type=reset], input[type=checkbox], input[type=radio], a, :data(ui-button)"},_create:function(){this.element.addClass("ui-buttonset")},_init:function(){this.refresh()},_setOption:function(t,e){"disabled"===t&&this.buttons.button("option",t,e),this._super(t,e)},refresh:function(){var e="rtl"===this.element.css("direction");this.buttons=this.element.find(this.options.items).filter(":ui-button").button("refresh").end().not(":ui-button").button().end().map(function(){return t(this).button("widget")[0]}).removeClass("ui-corner-all ui-corner-left ui-corner-right").filter(":first").addClass(e?"ui-corner-right":"ui-corner-left").end().filter(":last").addClass(e?"ui-corner-left":"ui-corner-right").end().end()},_destroy:function(){this.element.removeClass("ui-buttonset"),this.buttons.map(function(){return t(this).button("widget")[0]}).removeClass("ui-corner-left ui-corner-right").end().button("destroy")}})})(jQuery);;
/*! jQuery UI - v1.10.2 - 2013-03-14
* http://jqueryui.com
* Copyright 2013 jQuery Foundation and other contributors; Licensed MIT */
(function(e){var t=!1;e(document).mouseup(function(){t=!1}),e.widget("ui.mouse",{version:"1.10.2",options:{cancel:"input,textarea,button,select,option",distance:1,delay:0},_mouseInit:function(){var t=this;this.element.bind("mousedown."+this.widgetName,function(e){return t._mouseDown(e)}).bind("click."+this.widgetName,function(i){return!0===e.data(i.target,t.widgetName+".preventClickEvent")?(e.removeData(i.target,t.widgetName+".preventClickEvent"),i.stopImmediatePropagation(),!1):undefined}),this.started=!1},_mouseDestroy:function(){this.element.unbind("."+this.widgetName),this._mouseMoveDelegate&&e(document).unbind("mousemove."+this.widgetName,this._mouseMoveDelegate).unbind("mouseup."+this.widgetName,this._mouseUpDelegate)},_mouseDown:function(i){if(!t){this._mouseStarted&&this._mouseUp(i),this._mouseDownEvent=i;var s=this,n=1===i.which,a="string"==typeof this.options.cancel&&i.target.nodeName?e(i.target).closest(this.options.cancel).length:!1;return n&&!a&&this._mouseCapture(i)?(this.mouseDelayMet=!this.options.delay,this.mouseDelayMet||(this._mouseDelayTimer=setTimeout(function(){s.mouseDelayMet=!0},this.options.delay)),this._mouseDistanceMet(i)&&this._mouseDelayMet(i)&&(this._mouseStarted=this._mouseStart(i)!==!1,!this._mouseStarted)?(i.preventDefault(),!0):(!0===e.data(i.target,this.widgetName+".preventClickEvent")&&e.removeData(i.target,this.widgetName+".preventClickEvent"),this._mouseMoveDelegate=function(e){return s._mouseMove(e)},this._mouseUpDelegate=function(e){return s._mouseUp(e)},e(document).bind("mousemove."+this.widgetName,this._mouseMoveDelegate).bind("mouseup."+this.widgetName,this._mouseUpDelegate),i.preventDefault(),t=!0,!0)):!0}},_mouseMove:function(t){return e.ui.ie&&(!document.documentMode||9>document.documentMode)&&!t.button?this._mouseUp(t):this._mouseStarted?(this._mouseDrag(t),t.preventDefault()):(this._mouseDistanceMet(t)&&this._mouseDelayMet(t)&&(this._mouseStarted=this._mouseStart(this._mouseDownEvent,t)!==!1,this._mouseStarted?this._mouseDrag(t):this._mouseUp(t)),!this._mouseStarted)},_mouseUp:function(t){return e(document).unbind("mousemove."+this.widgetName,this._mouseMoveDelegate).unbind("mouseup."+this.widgetName,this._mouseUpDelegate),this._mouseStarted&&(this._mouseStarted=!1,t.target===this._mouseDownEvent.target&&e.data(t.target,this.widgetName+".preventClickEvent",!0),this._mouseStop(t)),!1},_mouseDistanceMet:function(e){return Math.max(Math.abs(this._mouseDownEvent.pageX-e.pageX),Math.abs(this._mouseDownEvent.pageY-e.pageY))>=this.options.distance},_mouseDelayMet:function(){return this.mouseDelayMet},_mouseStart:function(){},_mouseDrag:function(){},_mouseStop:function(){},_mouseCapture:function(){return!0}})})(jQuery);;
/*! jQuery UI - v1.10.2 - 2013-03-14
* http://jqueryui.com
* Copyright 2013 jQuery Foundation and other contributors; Licensed MIT */
(function(e){e.widget("ui.draggable",e.ui.mouse,{version:"1.10.2",widgetEventPrefix:"drag",options:{addClasses:!0,appendTo:"parent",axis:!1,connectToSortable:!1,containment:!1,cursor:"auto",cursorAt:!1,grid:!1,handle:!1,helper:"original",iframeFix:!1,opacity:!1,refreshPositions:!1,revert:!1,revertDuration:500,scope:"default",scroll:!0,scrollSensitivity:20,scrollSpeed:20,snap:!1,snapMode:"both",snapTolerance:20,stack:!1,zIndex:!1,drag:null,start:null,stop:null},_create:function(){"original"!==this.options.helper||/^(?:r|a|f)/.test(this.element.css("position"))||(this.element[0].style.position="relative"),this.options.addClasses&&this.element.addClass("ui-draggable"),this.options.disabled&&this.element.addClass("ui-draggable-disabled"),this._mouseInit()},_destroy:function(){this.element.removeClass("ui-draggable ui-draggable-dragging ui-draggable-disabled"),this._mouseDestroy()},_mouseCapture:function(t){var i=this.options;return this.helper||i.disabled||e(t.target).closest(".ui-resizable-handle").length>0?!1:(this.handle=this._getHandle(t),this.handle?(e(i.iframeFix===!0?"iframe":i.iframeFix).each(function(){e("<div class='ui-draggable-iframeFix' style='background: #fff;'></div>").css({width:this.offsetWidth+"px",height:this.offsetHeight+"px",position:"absolute",opacity:"0.001",zIndex:1e3}).css(e(this).offset()).appendTo("body")}),!0):!1)},_mouseStart:function(t){var i=this.options;return this.helper=this._createHelper(t),this.helper.addClass("ui-draggable-dragging"),this._cacheHelperProportions(),e.ui.ddmanager&&(e.ui.ddmanager.current=this),this._cacheMargins(),this.cssPosition=this.helper.css("position"),this.scrollParent=this.helper.scrollParent(),this.offset=this.positionAbs=this.element.offset(),this.offset={top:this.offset.top-this.margins.top,left:this.offset.left-this.margins.left},e.extend(this.offset,{click:{left:t.pageX-this.offset.left,top:t.pageY-this.offset.top},parent:this._getParentOffset(),relative:this._getRelativeOffset()}),this.originalPosition=this.position=this._generatePosition(t),this.originalPageX=t.pageX,this.originalPageY=t.pageY,i.cursorAt&&this._adjustOffsetFromHelper(i.cursorAt),i.containment&&this._setContainment(),this._trigger("start",t)===!1?(this._clear(),!1):(this._cacheHelperProportions(),e.ui.ddmanager&&!i.dropBehaviour&&e.ui.ddmanager.prepareOffsets(this,t),this._mouseDrag(t,!0),e.ui.ddmanager&&e.ui.ddmanager.dragStart(this,t),!0)},_mouseDrag:function(t,i){if(this.position=this._generatePosition(t),this.positionAbs=this._convertPositionTo("absolute"),!i){var s=this._uiHash();if(this._trigger("drag",t,s)===!1)return this._mouseUp({}),!1;this.position=s.position}return this.options.axis&&"y"===this.options.axis||(this.helper[0].style.left=this.position.left+"px"),this.options.axis&&"x"===this.options.axis||(this.helper[0].style.top=this.position.top+"px"),e.ui.ddmanager&&e.ui.ddmanager.drag(this,t),!1},_mouseStop:function(t){var i,s=this,n=!1,a=!1;for(e.ui.ddmanager&&!this.options.dropBehaviour&&(a=e.ui.ddmanager.drop(this,t)),this.dropped&&(a=this.dropped,this.dropped=!1),i=this.element[0];i&&(i=i.parentNode);)i===document&&(n=!0);return n||"original"!==this.options.helper?("invalid"===this.options.revert&&!a||"valid"===this.options.revert&&a||this.options.revert===!0||e.isFunction(this.options.revert)&&this.options.revert.call(this.element,a)?e(this.helper).animate(this.originalPosition,parseInt(this.options.revertDuration,10),function(){s._trigger("stop",t)!==!1&&s._clear()}):this._trigger("stop",t)!==!1&&this._clear(),!1):!1},_mouseUp:function(t){return e("div.ui-draggable-iframeFix").each(function(){this.parentNode.removeChild(this)}),e.ui.ddmanager&&e.ui.ddmanager.dragStop(this,t),e.ui.mouse.prototype._mouseUp.call(this,t)},cancel:function(){return this.helper.is(".ui-draggable-dragging")?this._mouseUp({}):this._clear(),this},_getHandle:function(t){return this.options.handle?!!e(t.target).closest(this.element.find(this.options.handle)).length:!0},_createHelper:function(t){var i=this.options,s=e.isFunction(i.helper)?e(i.helper.apply(this.element[0],[t])):"clone"===i.helper?this.element.clone().removeAttr("id"):this.element;return s.parents("body").length||s.appendTo("parent"===i.appendTo?this.element[0].parentNode:i.appendTo),s[0]===this.element[0]||/(fixed|absolute)/.test(s.css("position"))||s.css("position","absolute"),s},_adjustOffsetFromHelper:function(t){"string"==typeof t&&(t=t.split(" ")),e.isArray(t)&&(t={left:+t[0],top:+t[1]||0}),"left"in t&&(this.offset.click.left=t.left+this.margins.left),"right"in t&&(this.offset.click.left=this.helperProportions.width-t.right+this.margins.left),"top"in t&&(this.offset.click.top=t.top+this.margins.top),"bottom"in t&&(this.offset.click.top=this.helperProportions.height-t.bottom+this.margins.top)},_getParentOffset:function(){this.offsetParent=this.helper.offsetParent();var t=this.offsetParent.offset();return"absolute"===this.cssPosition&&this.scrollParent[0]!==document&&e.contains(this.scrollParent[0],this.offsetParent[0])&&(t.left+=this.scrollParent.scrollLeft(),t.top+=this.scrollParent.scrollTop()),(this.offsetParent[0]===document.body||this.offsetParent[0].tagName&&"html"===this.offsetParent[0].tagName.toLowerCase()&&e.ui.ie)&&(t={top:0,left:0}),{top:t.top+(parseInt(this.offsetParent.css("borderTopWidth"),10)||0),left:t.left+(parseInt(this.offsetParent.css("borderLeftWidth"),10)||0)}},_getRelativeOffset:function(){if("relative"===this.cssPosition){var e=this.element.position();return{top:e.top-(parseInt(this.helper.css("top"),10)||0)+this.scrollParent.scrollTop(),left:e.left-(parseInt(this.helper.css("left"),10)||0)+this.scrollParent.scrollLeft()}}return{top:0,left:0}},_cacheMargins:function(){this.margins={left:parseInt(this.element.css("marginLeft"),10)||0,top:parseInt(this.element.css("marginTop"),10)||0,right:parseInt(this.element.css("marginRight"),10)||0,bottom:parseInt(this.element.css("marginBottom"),10)||0}},_cacheHelperProportions:function(){this.helperProportions={width:this.helper.outerWidth(),height:this.helper.outerHeight()}},_setContainment:function(){var t,i,s,n=this.options;if("parent"===n.containment&&(n.containment=this.helper[0].parentNode),("document"===n.containment||"window"===n.containment)&&(this.containment=["document"===n.containment?0:e(window).scrollLeft()-this.offset.relative.left-this.offset.parent.left,"document"===n.containment?0:e(window).scrollTop()-this.offset.relative.top-this.offset.parent.top,("document"===n.containment?0:e(window).scrollLeft())+e("document"===n.containment?document:window).width()-this.helperProportions.width-this.margins.left,("document"===n.containment?0:e(window).scrollTop())+(e("document"===n.containment?document:window).height()||document.body.parentNode.scrollHeight)-this.helperProportions.height-this.margins.top]),/^(document|window|parent)$/.test(n.containment)||n.containment.constructor===Array)n.containment.constructor===Array&&(this.containment=n.containment);else{if(i=e(n.containment),s=i[0],!s)return;t="hidden"!==e(s).css("overflow"),this.containment=[(parseInt(e(s).css("borderLeftWidth"),10)||0)+(parseInt(e(s).css("paddingLeft"),10)||0),(parseInt(e(s).css("borderTopWidth"),10)||0)+(parseInt(e(s).css("paddingTop"),10)||0),(t?Math.max(s.scrollWidth,s.offsetWidth):s.offsetWidth)-(parseInt(e(s).css("borderRightWidth"),10)||0)-(parseInt(e(s).css("paddingRight"),10)||0)-this.helperProportions.width-this.margins.left-this.margins.right,(t?Math.max(s.scrollHeight,s.offsetHeight):s.offsetHeight)-(parseInt(e(s).css("borderBottomWidth"),10)||0)-(parseInt(e(s).css("paddingBottom"),10)||0)-this.helperProportions.height-this.margins.top-this.margins.bottom],this.relative_container=i}},_convertPositionTo:function(t,i){i||(i=this.position);var s="absolute"===t?1:-1,n="absolute"!==this.cssPosition||this.scrollParent[0]!==document&&e.contains(this.scrollParent[0],this.offsetParent[0])?this.scrollParent:this.offsetParent,a=/(html|body)/i.test(n[0].tagName);return{top:i.top+this.offset.relative.top*s+this.offset.parent.top*s-("fixed"===this.cssPosition?-this.scrollParent.scrollTop():a?0:n.scrollTop())*s,left:i.left+this.offset.relative.left*s+this.offset.parent.left*s-("fixed"===this.cssPosition?-this.scrollParent.scrollLeft():a?0:n.scrollLeft())*s}},_generatePosition:function(t){var i,s,n,a,o=this.options,r="absolute"!==this.cssPosition||this.scrollParent[0]!==document&&e.contains(this.scrollParent[0],this.offsetParent[0])?this.scrollParent:this.offsetParent,h=/(html|body)/i.test(r[0].tagName),l=t.pageX,u=t.pageY;return this.originalPosition&&(this.containment&&(this.relative_container?(s=this.relative_container.offset(),i=[this.containment[0]+s.left,this.containment[1]+s.top,this.containment[2]+s.left,this.containment[3]+s.top]):i=this.containment,t.pageX-this.offset.click.left<i[0]&&(l=i[0]+this.offset.click.left),t.pageY-this.offset.click.top<i[1]&&(u=i[1]+this.offset.click.top),t.pageX-this.offset.click.left>i[2]&&(l=i[2]+this.offset.click.left),t.pageY-this.offset.click.top>i[3]&&(u=i[3]+this.offset.click.top)),o.grid&&(n=o.grid[1]?this.originalPageY+Math.round((u-this.originalPageY)/o.grid[1])*o.grid[1]:this.originalPageY,u=i?n-this.offset.click.top>=i[1]||n-this.offset.click.top>i[3]?n:n-this.offset.click.top>=i[1]?n-o.grid[1]:n+o.grid[1]:n,a=o.grid[0]?this.originalPageX+Math.round((l-this.originalPageX)/o.grid[0])*o.grid[0]:this.originalPageX,l=i?a-this.offset.click.left>=i[0]||a-this.offset.click.left>i[2]?a:a-this.offset.click.left>=i[0]?a-o.grid[0]:a+o.grid[0]:a)),{top:u-this.offset.click.top-this.offset.relative.top-this.offset.parent.top+("fixed"===this.cssPosition?-this.scrollParent.scrollTop():h?0:r.scrollTop()),left:l-this.offset.click.left-this.offset.relative.left-this.offset.parent.left+("fixed"===this.cssPosition?-this.scrollParent.scrollLeft():h?0:r.scrollLeft())}},_clear:function(){this.helper.removeClass("ui-draggable-dragging"),this.helper[0]===this.element[0]||this.cancelHelperRemoval||this.helper.remove(),this.helper=null,this.cancelHelperRemoval=!1},_trigger:function(t,i,s){return s=s||this._uiHash(),e.ui.plugin.call(this,t,[i,s]),"drag"===t&&(this.positionAbs=this._convertPositionTo("absolute")),e.Widget.prototype._trigger.call(this,t,i,s)},plugins:{},_uiHash:function(){return{helper:this.helper,position:this.position,originalPosition:this.originalPosition,offset:this.positionAbs}}}),e.ui.plugin.add("draggable","connectToSortable",{start:function(t,i){var s=e(this).data("ui-draggable"),n=s.options,a=e.extend({},i,{item:s.element});s.sortables=[],e(n.connectToSortable).each(function(){var i=e.data(this,"ui-sortable");i&&!i.options.disabled&&(s.sortables.push({instance:i,shouldRevert:i.options.revert}),i.refreshPositions(),i._trigger("activate",t,a))})},stop:function(t,i){var s=e(this).data("ui-draggable"),n=e.extend({},i,{item:s.element});e.each(s.sortables,function(){this.instance.isOver?(this.instance.isOver=0,s.cancelHelperRemoval=!0,this.instance.cancelHelperRemoval=!1,this.shouldRevert&&(this.instance.options.revert=this.shouldRevert),this.instance._mouseStop(t),this.instance.options.helper=this.instance.options._helper,"original"===s.options.helper&&this.instance.currentItem.css({top:"auto",left:"auto"})):(this.instance.cancelHelperRemoval=!1,this.instance._trigger("deactivate",t,n))})},drag:function(t,i){var s=e(this).data("ui-draggable"),n=this;e.each(s.sortables,function(){var a=!1,o=this;this.instance.positionAbs=s.positionAbs,this.instance.helperProportions=s.helperProportions,this.instance.offset.click=s.offset.click,this.instance._intersectsWith(this.instance.containerCache)&&(a=!0,e.each(s.sortables,function(){return this.instance.positionAbs=s.positionAbs,this.instance.helperProportions=s.helperProportions,this.instance.offset.click=s.offset.click,this!==o&&this.instance._intersectsWith(this.instance.containerCache)&&e.contains(o.instance.element[0],this.instance.element[0])&&(a=!1),a})),a?(this.instance.isOver||(this.instance.isOver=1,this.instance.currentItem=e(n).clone().removeAttr("id").appendTo(this.instance.element).data("ui-sortable-item",!0),this.instance.options._helper=this.instance.options.helper,this.instance.options.helper=function(){return i.helper[0]},t.target=this.instance.currentItem[0],this.instance._mouseCapture(t,!0),this.instance._mouseStart(t,!0,!0),this.instance.offset.click.top=s.offset.click.top,this.instance.offset.click.left=s.offset.click.left,this.instance.offset.parent.left-=s.offset.parent.left-this.instance.offset.parent.left,this.instance.offset.parent.top-=s.offset.parent.top-this.instance.offset.parent.top,s._trigger("toSortable",t),s.dropped=this.instance.element,s.currentItem=s.element,this.instance.fromOutside=s),this.instance.currentItem&&this.instance._mouseDrag(t)):this.instance.isOver&&(this.instance.isOver=0,this.instance.cancelHelperRemoval=!0,this.instance.options.revert=!1,this.instance._trigger("out",t,this.instance._uiHash(this.instance)),this.instance._mouseStop(t,!0),this.instance.options.helper=this.instance.options._helper,this.instance.currentItem.remove(),this.instance.placeholder&&this.instance.placeholder.remove(),s._trigger("fromSortable",t),s.dropped=!1)})}}),e.ui.plugin.add("draggable","cursor",{start:function(){var t=e("body"),i=e(this).data("ui-draggable").options;t.css("cursor")&&(i._cursor=t.css("cursor")),t.css("cursor",i.cursor)},stop:function(){var t=e(this).data("ui-draggable").options;t._cursor&&e("body").css("cursor",t._cursor)}}),e.ui.plugin.add("draggable","opacity",{start:function(t,i){var s=e(i.helper),n=e(this).data("ui-draggable").options;s.css("opacity")&&(n._opacity=s.css("opacity")),s.css("opacity",n.opacity)},stop:function(t,i){var s=e(this).data("ui-draggable").options;s._opacity&&e(i.helper).css("opacity",s._opacity)}}),e.ui.plugin.add("draggable","scroll",{start:function(){var t=e(this).data("ui-draggable");t.scrollParent[0]!==document&&"HTML"!==t.scrollParent[0].tagName&&(t.overflowOffset=t.scrollParent.offset())},drag:function(t){var i=e(this).data("ui-draggable"),s=i.options,n=!1;i.scrollParent[0]!==document&&"HTML"!==i.scrollParent[0].tagName?(s.axis&&"x"===s.axis||(i.overflowOffset.top+i.scrollParent[0].offsetHeight-t.pageY<s.scrollSensitivity?i.scrollParent[0].scrollTop=n=i.scrollParent[0].scrollTop+s.scrollSpeed:t.pageY-i.overflowOffset.top<s.scrollSensitivity&&(i.scrollParent[0].scrollTop=n=i.scrollParent[0].scrollTop-s.scrollSpeed)),s.axis&&"y"===s.axis||(i.overflowOffset.left+i.scrollParent[0].offsetWidth-t.pageX<s.scrollSensitivity?i.scrollParent[0].scrollLeft=n=i.scrollParent[0].scrollLeft+s.scrollSpeed:t.pageX-i.overflowOffset.left<s.scrollSensitivity&&(i.scrollParent[0].scrollLeft=n=i.scrollParent[0].scrollLeft-s.scrollSpeed))):(s.axis&&"x"===s.axis||(t.pageY-e(document).scrollTop()<s.scrollSensitivity?n=e(document).scrollTop(e(document).scrollTop()-s.scrollSpeed):e(window).height()-(t.pageY-e(document).scrollTop())<s.scrollSensitivity&&(n=e(document).scrollTop(e(document).scrollTop()+s.scrollSpeed))),s.axis&&"y"===s.axis||(t.pageX-e(document).scrollLeft()<s.scrollSensitivity?n=e(document).scrollLeft(e(document).scrollLeft()-s.scrollSpeed):e(window).width()-(t.pageX-e(document).scrollLeft())<s.scrollSensitivity&&(n=e(document).scrollLeft(e(document).scrollLeft()+s.scrollSpeed)))),n!==!1&&e.ui.ddmanager&&!s.dropBehaviour&&e.ui.ddmanager.prepareOffsets(i,t)}}),e.ui.plugin.add("draggable","snap",{start:function(){var t=e(this).data("ui-draggable"),i=t.options;t.snapElements=[],e(i.snap.constructor!==String?i.snap.items||":data(ui-draggable)":i.snap).each(function(){var i=e(this),s=i.offset();this!==t.element[0]&&t.snapElements.push({item:this,width:i.outerWidth(),height:i.outerHeight(),top:s.top,left:s.left})})},drag:function(t,i){var s,n,a,o,r,h,l,u,c,d,p=e(this).data("ui-draggable"),f=p.options,m=f.snapTolerance,g=i.offset.left,v=g+p.helperProportions.width,y=i.offset.top,b=y+p.helperProportions.height;for(c=p.snapElements.length-1;c>=0;c--)r=p.snapElements[c].left,h=r+p.snapElements[c].width,l=p.snapElements[c].top,u=l+p.snapElements[c].height,g>r-m&&h+m>g&&y>l-m&&u+m>y||g>r-m&&h+m>g&&b>l-m&&u+m>b||v>r-m&&h+m>v&&y>l-m&&u+m>y||v>r-m&&h+m>v&&b>l-m&&u+m>b?("inner"!==f.snapMode&&(s=m>=Math.abs(l-b),n=m>=Math.abs(u-y),a=m>=Math.abs(r-v),o=m>=Math.abs(h-g),s&&(i.position.top=p._convertPositionTo("relative",{top:l-p.helperProportions.height,left:0}).top-p.margins.top),n&&(i.position.top=p._convertPositionTo("relative",{top:u,left:0}).top-p.margins.top),a&&(i.position.left=p._convertPositionTo("relative",{top:0,left:r-p.helperProportions.width}).left-p.margins.left),o&&(i.position.left=p._convertPositionTo("relative",{top:0,left:h}).left-p.margins.left)),d=s||n||a||o,"outer"!==f.snapMode&&(s=m>=Math.abs(l-y),n=m>=Math.abs(u-b),a=m>=Math.abs(r-g),o=m>=Math.abs(h-v),s&&(i.position.top=p._convertPositionTo("relative",{top:l,left:0}).top-p.margins.top),n&&(i.position.top=p._convertPositionTo("relative",{top:u-p.helperProportions.height,left:0}).top-p.margins.top),a&&(i.position.left=p._convertPositionTo("relative",{top:0,left:r}).left-p.margins.left),o&&(i.position.left=p._convertPositionTo("relative",{top:0,left:h-p.helperProportions.width}).left-p.margins.left)),!p.snapElements[c].snapping&&(s||n||a||o||d)&&p.options.snap.snap&&p.options.snap.snap.call(p.element,t,e.extend(p._uiHash(),{snapItem:p.snapElements[c].item})),p.snapElements[c].snapping=s||n||a||o||d):(p.snapElements[c].snapping&&p.options.snap.release&&p.options.snap.release.call(p.element,t,e.extend(p._uiHash(),{snapItem:p.snapElements[c].item})),p.snapElements[c].snapping=!1)}}),e.ui.plugin.add("draggable","stack",{start:function(){var t,i=this.data("ui-draggable").options,s=e.makeArray(e(i.stack)).sort(function(t,i){return(parseInt(e(t).css("zIndex"),10)||0)-(parseInt(e(i).css("zIndex"),10)||0)});s.length&&(t=parseInt(e(s[0]).css("zIndex"),10)||0,e(s).each(function(i){e(this).css("zIndex",t+i)}),this.css("zIndex",t+s.length))}}),e.ui.plugin.add("draggable","zIndex",{start:function(t,i){var s=e(i.helper),n=e(this).data("ui-draggable").options;s.css("zIndex")&&(n._zIndex=s.css("zIndex")),s.css("zIndex",n.zIndex)},stop:function(t,i){var s=e(this).data("ui-draggable").options;s._zIndex&&e(i.helper).css("zIndex",s._zIndex)}})})(jQuery);;
/*! jQuery UI - v1.10.2 - 2013-03-14
* http://jqueryui.com
* Copyright 2013 jQuery Foundation and other contributors; Licensed MIT */
(function(t,e){function i(t,e,i){return[parseFloat(t[0])*(p.test(t[0])?e/100:1),parseFloat(t[1])*(p.test(t[1])?i/100:1)]}function s(e,i){return parseInt(t.css(e,i),10)||0}function n(e){var i=e[0];return 9===i.nodeType?{width:e.width(),height:e.height(),offset:{top:0,left:0}}:t.isWindow(i)?{width:e.width(),height:e.height(),offset:{top:e.scrollTop(),left:e.scrollLeft()}}:i.preventDefault?{width:0,height:0,offset:{top:i.pageY,left:i.pageX}}:{width:e.outerWidth(),height:e.outerHeight(),offset:e.offset()}}t.ui=t.ui||{};var a,o=Math.max,r=Math.abs,h=Math.round,l=/left|center|right/,c=/top|center|bottom/,u=/[\+\-]\d+(\.[\d]+)?%?/,d=/^\w+/,p=/%$/,f=t.fn.position;t.position={scrollbarWidth:function(){if(a!==e)return a;var i,s,n=t("<div style='display:block;width:50px;height:50px;overflow:hidden;'><div style='height:100px;width:auto;'></div></div>"),o=n.children()[0];return t("body").append(n),i=o.offsetWidth,n.css("overflow","scroll"),s=o.offsetWidth,i===s&&(s=n[0].clientWidth),n.remove(),a=i-s},getScrollInfo:function(e){var i=e.isWindow?"":e.element.css("overflow-x"),s=e.isWindow?"":e.element.css("overflow-y"),n="scroll"===i||"auto"===i&&e.width<e.element[0].scrollWidth,a="scroll"===s||"auto"===s&&e.height<e.element[0].scrollHeight;return{width:a?t.position.scrollbarWidth():0,height:n?t.position.scrollbarWidth():0}},getWithinInfo:function(e){var i=t(e||window),s=t.isWindow(i[0]);return{element:i,isWindow:s,offset:i.offset()||{left:0,top:0},scrollLeft:i.scrollLeft(),scrollTop:i.scrollTop(),width:s?i.width():i.outerWidth(),height:s?i.height():i.outerHeight()}}},t.fn.position=function(e){if(!e||!e.of)return f.apply(this,arguments);e=t.extend({},e);var a,p,m,g,v,_,b=t(e.of),y=t.position.getWithinInfo(e.within),w=t.position.getScrollInfo(y),x=(e.collision||"flip").split(" "),k={};return _=n(b),b[0].preventDefault&&(e.at="left top"),p=_.width,m=_.height,g=_.offset,v=t.extend({},g),t.each(["my","at"],function(){var t,i,s=(e[this]||"").split(" ");1===s.length&&(s=l.test(s[0])?s.concat(["center"]):c.test(s[0])?["center"].concat(s):["center","center"]),s[0]=l.test(s[0])?s[0]:"center",s[1]=c.test(s[1])?s[1]:"center",t=u.exec(s[0]),i=u.exec(s[1]),k[this]=[t?t[0]:0,i?i[0]:0],e[this]=[d.exec(s[0])[0],d.exec(s[1])[0]]}),1===x.length&&(x[1]=x[0]),"right"===e.at[0]?v.left+=p:"center"===e.at[0]&&(v.left+=p/2),"bottom"===e.at[1]?v.top+=m:"center"===e.at[1]&&(v.top+=m/2),a=i(k.at,p,m),v.left+=a[0],v.top+=a[1],this.each(function(){var n,l,c=t(this),u=c.outerWidth(),d=c.outerHeight(),f=s(this,"marginLeft"),_=s(this,"marginTop"),D=u+f+s(this,"marginRight")+w.width,T=d+_+s(this,"marginBottom")+w.height,C=t.extend({},v),M=i(k.my,c.outerWidth(),c.outerHeight());"right"===e.my[0]?C.left-=u:"center"===e.my[0]&&(C.left-=u/2),"bottom"===e.my[1]?C.top-=d:"center"===e.my[1]&&(C.top-=d/2),C.left+=M[0],C.top+=M[1],t.support.offsetFractions||(C.left=h(C.left),C.top=h(C.top)),n={marginLeft:f,marginTop:_},t.each(["left","top"],function(i,s){t.ui.position[x[i]]&&t.ui.position[x[i]][s](C,{targetWidth:p,targetHeight:m,elemWidth:u,elemHeight:d,collisionPosition:n,collisionWidth:D,collisionHeight:T,offset:[a[0]+M[0],a[1]+M[1]],my:e.my,at:e.at,within:y,elem:c})}),e.using&&(l=function(t){var i=g.left-C.left,s=i+p-u,n=g.top-C.top,a=n+m-d,h={target:{element:b,left:g.left,top:g.top,width:p,height:m},element:{element:c,left:C.left,top:C.top,width:u,height:d},horizontal:0>s?"left":i>0?"right":"center",vertical:0>a?"top":n>0?"bottom":"middle"};u>p&&p>r(i+s)&&(h.horizontal="center"),d>m&&m>r(n+a)&&(h.vertical="middle"),h.important=o(r(i),r(s))>o(r(n),r(a))?"horizontal":"vertical",e.using.call(this,t,h)}),c.offset(t.extend(C,{using:l}))})},t.ui.position={fit:{left:function(t,e){var i,s=e.within,n=s.isWindow?s.scrollLeft:s.offset.left,a=s.width,r=t.left-e.collisionPosition.marginLeft,h=n-r,l=r+e.collisionWidth-a-n;e.collisionWidth>a?h>0&&0>=l?(i=t.left+h+e.collisionWidth-a-n,t.left+=h-i):t.left=l>0&&0>=h?n:h>l?n+a-e.collisionWidth:n:h>0?t.left+=h:l>0?t.left-=l:t.left=o(t.left-r,t.left)},top:function(t,e){var i,s=e.within,n=s.isWindow?s.scrollTop:s.offset.top,a=e.within.height,r=t.top-e.collisionPosition.marginTop,h=n-r,l=r+e.collisionHeight-a-n;e.collisionHeight>a?h>0&&0>=l?(i=t.top+h+e.collisionHeight-a-n,t.top+=h-i):t.top=l>0&&0>=h?n:h>l?n+a-e.collisionHeight:n:h>0?t.top+=h:l>0?t.top-=l:t.top=o(t.top-r,t.top)}},flip:{left:function(t,e){var i,s,n=e.within,a=n.offset.left+n.scrollLeft,o=n.width,h=n.isWindow?n.scrollLeft:n.offset.left,l=t.left-e.collisionPosition.marginLeft,c=l-h,u=l+e.collisionWidth-o-h,d="left"===e.my[0]?-e.elemWidth:"right"===e.my[0]?e.elemWidth:0,p="left"===e.at[0]?e.targetWidth:"right"===e.at[0]?-e.targetWidth:0,f=-2*e.offset[0];0>c?(i=t.left+d+p+f+e.collisionWidth-o-a,(0>i||r(c)>i)&&(t.left+=d+p+f)):u>0&&(s=t.left-e.collisionPosition.marginLeft+d+p+f-h,(s>0||u>r(s))&&(t.left+=d+p+f))},top:function(t,e){var i,s,n=e.within,a=n.offset.top+n.scrollTop,o=n.height,h=n.isWindow?n.scrollTop:n.offset.top,l=t.top-e.collisionPosition.marginTop,c=l-h,u=l+e.collisionHeight-o-h,d="top"===e.my[1],p=d?-e.elemHeight:"bottom"===e.my[1]?e.elemHeight:0,f="top"===e.at[1]?e.targetHeight:"bottom"===e.at[1]?-e.targetHeight:0,m=-2*e.offset[1];0>c?(s=t.top+p+f+m+e.collisionHeight-o-a,t.top+p+f+m>c&&(0>s||r(c)>s)&&(t.top+=p+f+m)):u>0&&(i=t.top-e.collisionPosition.marginTop+p+f+m-h,t.top+p+f+m>u&&(i>0||u>r(i))&&(t.top+=p+f+m))}},flipfit:{left:function(){t.ui.position.flip.left.apply(this,arguments),t.ui.position.fit.left.apply(this,arguments)},top:function(){t.ui.position.flip.top.apply(this,arguments),t.ui.position.fit.top.apply(this,arguments)}}},function(){var e,i,s,n,a,o=document.getElementsByTagName("body")[0],r=document.createElement("div");e=document.createElement(o?"div":"body"),s={visibility:"hidden",width:0,height:0,border:0,margin:0,background:"none"},o&&t.extend(s,{position:"absolute",left:"-1000px",top:"-1000px"});for(a in s)e.style[a]=s[a];e.appendChild(r),i=o||document.documentElement,i.insertBefore(e,i.firstChild),r.style.cssText="position: absolute; left: 10.7432222px;",n=t(r).offset().left,t.support.offsetFractions=n>10&&11>n,e.innerHTML="",i.removeChild(e)}()})(jQuery);;
/*! jQuery UI - v1.10.2 - 2013-03-14
* http://jqueryui.com
* Copyright 2013 jQuery Foundation and other contributors; Licensed MIT */
(function(e){function t(e){return parseInt(e,10)||0}function i(e){return!isNaN(parseInt(e,10))}e.widget("ui.resizable",e.ui.mouse,{version:"1.10.2",widgetEventPrefix:"resize",options:{alsoResize:!1,animate:!1,animateDuration:"slow",animateEasing:"swing",aspectRatio:!1,autoHide:!1,containment:!1,ghost:!1,grid:!1,handles:"e,s,se",helper:!1,maxHeight:null,maxWidth:null,minHeight:10,minWidth:10,zIndex:90,resize:null,start:null,stop:null},_create:function(){var t,i,s,n,a,o=this,r=this.options;if(this.element.addClass("ui-resizable"),e.extend(this,{_aspectRatio:!!r.aspectRatio,aspectRatio:r.aspectRatio,originalElement:this.element,_proportionallyResizeElements:[],_helper:r.helper||r.ghost||r.animate?r.helper||"ui-resizable-helper":null}),this.element[0].nodeName.match(/canvas|textarea|input|select|button|img/i)&&(this.element.wrap(e("<div class='ui-wrapper' style='overflow: hidden;'></div>").css({position:this.element.css("position"),width:this.element.outerWidth(),height:this.element.outerHeight(),top:this.element.css("top"),left:this.element.css("left")})),this.element=this.element.parent().data("ui-resizable",this.element.data("ui-resizable")),this.elementIsWrapper=!0,this.element.css({marginLeft:this.originalElement.css("marginLeft"),marginTop:this.originalElement.css("marginTop"),marginRight:this.originalElement.css("marginRight"),marginBottom:this.originalElement.css("marginBottom")}),this.originalElement.css({marginLeft:0,marginTop:0,marginRight:0,marginBottom:0}),this.originalResizeStyle=this.originalElement.css("resize"),this.originalElement.css("resize","none"),this._proportionallyResizeElements.push(this.originalElement.css({position:"static",zoom:1,display:"block"})),this.originalElement.css({margin:this.originalElement.css("margin")}),this._proportionallyResize()),this.handles=r.handles||(e(".ui-resizable-handle",this.element).length?{n:".ui-resizable-n",e:".ui-resizable-e",s:".ui-resizable-s",w:".ui-resizable-w",se:".ui-resizable-se",sw:".ui-resizable-sw",ne:".ui-resizable-ne",nw:".ui-resizable-nw"}:"e,s,se"),this.handles.constructor===String)for("all"===this.handles&&(this.handles="n,e,s,w,se,sw,ne,nw"),t=this.handles.split(","),this.handles={},i=0;t.length>i;i++)s=e.trim(t[i]),a="ui-resizable-"+s,n=e("<div class='ui-resizable-handle "+a+"'></div>"),n.css({zIndex:r.zIndex}),"se"===s&&n.addClass("ui-icon ui-icon-gripsmall-diagonal-se"),this.handles[s]=".ui-resizable-"+s,this.element.append(n);this._renderAxis=function(t){var i,s,n,a;t=t||this.element;for(i in this.handles)this.handles[i].constructor===String&&(this.handles[i]=e(this.handles[i],this.element).show()),this.elementIsWrapper&&this.originalElement[0].nodeName.match(/textarea|input|select|button/i)&&(s=e(this.handles[i],this.element),a=/sw|ne|nw|se|n|s/.test(i)?s.outerHeight():s.outerWidth(),n=["padding",/ne|nw|n/.test(i)?"Top":/se|sw|s/.test(i)?"Bottom":/^e$/.test(i)?"Right":"Left"].join(""),t.css(n,a),this._proportionallyResize()),e(this.handles[i]).length},this._renderAxis(this.element),this._handles=e(".ui-resizable-handle",this.element).disableSelection(),this._handles.mouseover(function(){o.resizing||(this.className&&(n=this.className.match(/ui-resizable-(se|sw|ne|nw|n|e|s|w)/i)),o.axis=n&&n[1]?n[1]:"se")}),r.autoHide&&(this._handles.hide(),e(this.element).addClass("ui-resizable-autohide").mouseenter(function(){r.disabled||(e(this).removeClass("ui-resizable-autohide"),o._handles.show())}).mouseleave(function(){r.disabled||o.resizing||(e(this).addClass("ui-resizable-autohide"),o._handles.hide())})),this._mouseInit()},_destroy:function(){this._mouseDestroy();var t,i=function(t){e(t).removeClass("ui-resizable ui-resizable-disabled ui-resizable-resizing").removeData("resizable").removeData("ui-resizable").unbind(".resizable").find(".ui-resizable-handle").remove()};return this.elementIsWrapper&&(i(this.element),t=this.element,this.originalElement.css({position:t.css("position"),width:t.outerWidth(),height:t.outerHeight(),top:t.css("top"),left:t.css("left")}).insertAfter(t),t.remove()),this.originalElement.css("resize",this.originalResizeStyle),i(this.originalElement),this},_mouseCapture:function(t){var i,s,n=!1;for(i in this.handles)s=e(this.handles[i])[0],(s===t.target||e.contains(s,t.target))&&(n=!0);return!this.options.disabled&&n},_mouseStart:function(i){var s,n,a,o=this.options,r=this.element.position(),h=this.element;return this.resizing=!0,/absolute/.test(h.css("position"))?h.css({position:"absolute",top:h.css("top"),left:h.css("left")}):h.is(".ui-draggable")&&h.css({position:"absolute",top:r.top,left:r.left}),this._renderProxy(),s=t(this.helper.css("left")),n=t(this.helper.css("top")),o.containment&&(s+=e(o.containment).scrollLeft()||0,n+=e(o.containment).scrollTop()||0),this.offset=this.helper.offset(),this.position={left:s,top:n},this.size=this._helper?{width:h.outerWidth(),height:h.outerHeight()}:{width:h.width(),height:h.height()},this.originalSize=this._helper?{width:h.outerWidth(),height:h.outerHeight()}:{width:h.width(),height:h.height()},this.originalPosition={left:s,top:n},this.sizeDiff={width:h.outerWidth()-h.width(),height:h.outerHeight()-h.height()},this.originalMousePosition={left:i.pageX,top:i.pageY},this.aspectRatio="number"==typeof o.aspectRatio?o.aspectRatio:this.originalSize.width/this.originalSize.height||1,a=e(".ui-resizable-"+this.axis).css("cursor"),e("body").css("cursor","auto"===a?this.axis+"-resize":a),h.addClass("ui-resizable-resizing"),this._propagate("start",i),!0},_mouseDrag:function(t){var i,s=this.helper,n={},a=this.originalMousePosition,o=this.axis,r=this.position.top,h=this.position.left,l=this.size.width,u=this.size.height,c=t.pageX-a.left||0,d=t.pageY-a.top||0,p=this._change[o];return p?(i=p.apply(this,[t,c,d]),this._updateVirtualBoundaries(t.shiftKey),(this._aspectRatio||t.shiftKey)&&(i=this._updateRatio(i,t)),i=this._respectSize(i,t),this._updateCache(i),this._propagate("resize",t),this.position.top!==r&&(n.top=this.position.top+"px"),this.position.left!==h&&(n.left=this.position.left+"px"),this.size.width!==l&&(n.width=this.size.width+"px"),this.size.height!==u&&(n.height=this.size.height+"px"),s.css(n),!this._helper&&this._proportionallyResizeElements.length&&this._proportionallyResize(),e.isEmptyObject(n)||this._trigger("resize",t,this.ui()),!1):!1},_mouseStop:function(t){this.resizing=!1;var i,s,n,a,o,r,h,l=this.options,u=this;return this._helper&&(i=this._proportionallyResizeElements,s=i.length&&/textarea/i.test(i[0].nodeName),n=s&&e.ui.hasScroll(i[0],"left")?0:u.sizeDiff.height,a=s?0:u.sizeDiff.width,o={width:u.helper.width()-a,height:u.helper.height()-n},r=parseInt(u.element.css("left"),10)+(u.position.left-u.originalPosition.left)||null,h=parseInt(u.element.css("top"),10)+(u.position.top-u.originalPosition.top)||null,l.animate||this.element.css(e.extend(o,{top:h,left:r})),u.helper.height(u.size.height),u.helper.width(u.size.width),this._helper&&!l.animate&&this._proportionallyResize()),e("body").css("cursor","auto"),this.element.removeClass("ui-resizable-resizing"),this._propagate("stop",t),this._helper&&this.helper.remove(),!1},_updateVirtualBoundaries:function(e){var t,s,n,a,o,r=this.options;o={minWidth:i(r.minWidth)?r.minWidth:0,maxWidth:i(r.maxWidth)?r.maxWidth:1/0,minHeight:i(r.minHeight)?r.minHeight:0,maxHeight:i(r.maxHeight)?r.maxHeight:1/0},(this._aspectRatio||e)&&(t=o.minHeight*this.aspectRatio,n=o.minWidth/this.aspectRatio,s=o.maxHeight*this.aspectRatio,a=o.maxWidth/this.aspectRatio,t>o.minWidth&&(o.minWidth=t),n>o.minHeight&&(o.minHeight=n),o.maxWidth>s&&(o.maxWidth=s),o.maxHeight>a&&(o.maxHeight=a)),this._vBoundaries=o},_updateCache:function(e){this.offset=this.helper.offset(),i(e.left)&&(this.position.left=e.left),i(e.top)&&(this.position.top=e.top),i(e.height)&&(this.size.height=e.height),i(e.width)&&(this.size.width=e.width)},_updateRatio:function(e){var t=this.position,s=this.size,n=this.axis;return i(e.height)?e.width=e.height*this.aspectRatio:i(e.width)&&(e.height=e.width/this.aspectRatio),"sw"===n&&(e.left=t.left+(s.width-e.width),e.top=null),"nw"===n&&(e.top=t.top+(s.height-e.height),e.left=t.left+(s.width-e.width)),e},_respectSize:function(e){var t=this._vBoundaries,s=this.axis,n=i(e.width)&&t.maxWidth&&t.maxWidth<e.width,a=i(e.height)&&t.maxHeight&&t.maxHeight<e.height,o=i(e.width)&&t.minWidth&&t.minWidth>e.width,r=i(e.height)&&t.minHeight&&t.minHeight>e.height,h=this.originalPosition.left+this.originalSize.width,l=this.position.top+this.size.height,u=/sw|nw|w/.test(s),c=/nw|ne|n/.test(s);return o&&(e.width=t.minWidth),r&&(e.height=t.minHeight),n&&(e.width=t.maxWidth),a&&(e.height=t.maxHeight),o&&u&&(e.left=h-t.minWidth),n&&u&&(e.left=h-t.maxWidth),r&&c&&(e.top=l-t.minHeight),a&&c&&(e.top=l-t.maxHeight),e.width||e.height||e.left||!e.top?e.width||e.height||e.top||!e.left||(e.left=null):e.top=null,e},_proportionallyResize:function(){if(this._proportionallyResizeElements.length){var e,t,i,s,n,a=this.helper||this.element;for(e=0;this._proportionallyResizeElements.length>e;e++){if(n=this._proportionallyResizeElements[e],!this.borderDif)for(this.borderDif=[],i=[n.css("borderTopWidth"),n.css("borderRightWidth"),n.css("borderBottomWidth"),n.css("borderLeftWidth")],s=[n.css("paddingTop"),n.css("paddingRight"),n.css("paddingBottom"),n.css("paddingLeft")],t=0;i.length>t;t++)this.borderDif[t]=(parseInt(i[t],10)||0)+(parseInt(s[t],10)||0);n.css({height:a.height()-this.borderDif[0]-this.borderDif[2]||0,width:a.width()-this.borderDif[1]-this.borderDif[3]||0})}}},_renderProxy:function(){var t=this.element,i=this.options;this.elementOffset=t.offset(),this._helper?(this.helper=this.helper||e("<div style='overflow:hidden;'></div>"),this.helper.addClass(this._helper).css({width:this.element.outerWidth()-1,height:this.element.outerHeight()-1,position:"absolute",left:this.elementOffset.left+"px",top:this.elementOffset.top+"px",zIndex:++i.zIndex}),this.helper.appendTo("body").disableSelection()):this.helper=this.element},_change:{e:function(e,t){return{width:this.originalSize.width+t}},w:function(e,t){var i=this.originalSize,s=this.originalPosition;return{left:s.left+t,width:i.width-t}},n:function(e,t,i){var s=this.originalSize,n=this.originalPosition;return{top:n.top+i,height:s.height-i}},s:function(e,t,i){return{height:this.originalSize.height+i}},se:function(t,i,s){return e.extend(this._change.s.apply(this,arguments),this._change.e.apply(this,[t,i,s]))},sw:function(t,i,s){return e.extend(this._change.s.apply(this,arguments),this._change.w.apply(this,[t,i,s]))},ne:function(t,i,s){return e.extend(this._change.n.apply(this,arguments),this._change.e.apply(this,[t,i,s]))},nw:function(t,i,s){return e.extend(this._change.n.apply(this,arguments),this._change.w.apply(this,[t,i,s]))}},_propagate:function(t,i){e.ui.plugin.call(this,t,[i,this.ui()]),"resize"!==t&&this._trigger(t,i,this.ui())},plugins:{},ui:function(){return{originalElement:this.originalElement,element:this.element,helper:this.helper,position:this.position,size:this.size,originalSize:this.originalSize,originalPosition:this.originalPosition}}}),e.ui.plugin.add("resizable","animate",{stop:function(t){var i=e(this).data("ui-resizable"),s=i.options,n=i._proportionallyResizeElements,a=n.length&&/textarea/i.test(n[0].nodeName),o=a&&e.ui.hasScroll(n[0],"left")?0:i.sizeDiff.height,r=a?0:i.sizeDiff.width,h={width:i.size.width-r,height:i.size.height-o},l=parseInt(i.element.css("left"),10)+(i.position.left-i.originalPosition.left)||null,u=parseInt(i.element.css("top"),10)+(i.position.top-i.originalPosition.top)||null;i.element.animate(e.extend(h,u&&l?{top:u,left:l}:{}),{duration:s.animateDuration,easing:s.animateEasing,step:function(){var s={width:parseInt(i.element.css("width"),10),height:parseInt(i.element.css("height"),10),top:parseInt(i.element.css("top"),10),left:parseInt(i.element.css("left"),10)};n&&n.length&&e(n[0]).css({width:s.width,height:s.height}),i._updateCache(s),i._propagate("resize",t)}})}}),e.ui.plugin.add("resizable","containment",{start:function(){var i,s,n,a,o,r,h,l=e(this).data("ui-resizable"),u=l.options,c=l.element,d=u.containment,p=d instanceof e?d.get(0):/parent/.test(d)?c.parent().get(0):d;p&&(l.containerElement=e(p),/document/.test(d)||d===document?(l.containerOffset={left:0,top:0},l.containerPosition={left:0,top:0},l.parentData={element:e(document),left:0,top:0,width:e(document).width(),height:e(document).height()||document.body.parentNode.scrollHeight}):(i=e(p),s=[],e(["Top","Right","Left","Bottom"]).each(function(e,n){s[e]=t(i.css("padding"+n))}),l.containerOffset=i.offset(),l.containerPosition=i.position(),l.containerSize={height:i.innerHeight()-s[3],width:i.innerWidth()-s[1]},n=l.containerOffset,a=l.containerSize.height,o=l.containerSize.width,r=e.ui.hasScroll(p,"left")?p.scrollWidth:o,h=e.ui.hasScroll(p)?p.scrollHeight:a,l.parentData={element:p,left:n.left,top:n.top,width:r,height:h}))},resize:function(t){var i,s,n,a,o=e(this).data("ui-resizable"),r=o.options,h=o.containerOffset,l=o.position,u=o._aspectRatio||t.shiftKey,c={top:0,left:0},d=o.containerElement;d[0]!==document&&/static/.test(d.css("position"))&&(c=h),l.left<(o._helper?h.left:0)&&(o.size.width=o.size.width+(o._helper?o.position.left-h.left:o.position.left-c.left),u&&(o.size.height=o.size.width/o.aspectRatio),o.position.left=r.helper?h.left:0),l.top<(o._helper?h.top:0)&&(o.size.height=o.size.height+(o._helper?o.position.top-h.top:o.position.top),u&&(o.size.width=o.size.height*o.aspectRatio),o.position.top=o._helper?h.top:0),o.offset.left=o.parentData.left+o.position.left,o.offset.top=o.parentData.top+o.position.top,i=Math.abs((o._helper?o.offset.left-c.left:o.offset.left-c.left)+o.sizeDiff.width),s=Math.abs((o._helper?o.offset.top-c.top:o.offset.top-h.top)+o.sizeDiff.height),n=o.containerElement.get(0)===o.element.parent().get(0),a=/relative|absolute/.test(o.containerElement.css("position")),n&&a&&(i-=o.parentData.left),i+o.size.width>=o.parentData.width&&(o.size.width=o.parentData.width-i,u&&(o.size.height=o.size.width/o.aspectRatio)),s+o.size.height>=o.parentData.height&&(o.size.height=o.parentData.height-s,u&&(o.size.width=o.size.height*o.aspectRatio))},stop:function(){var t=e(this).data("ui-resizable"),i=t.options,s=t.containerOffset,n=t.containerPosition,a=t.containerElement,o=e(t.helper),r=o.offset(),h=o.outerWidth()-t.sizeDiff.width,l=o.outerHeight()-t.sizeDiff.height;t._helper&&!i.animate&&/relative/.test(a.css("position"))&&e(this).css({left:r.left-n.left-s.left,width:h,height:l}),t._helper&&!i.animate&&/static/.test(a.css("position"))&&e(this).css({left:r.left-n.left-s.left,width:h,height:l})}}),e.ui.plugin.add("resizable","alsoResize",{start:function(){var t=e(this).data("ui-resizable"),i=t.options,s=function(t){e(t).each(function(){var t=e(this);t.data("ui-resizable-alsoresize",{width:parseInt(t.width(),10),height:parseInt(t.height(),10),left:parseInt(t.css("left"),10),top:parseInt(t.css("top"),10)})})};"object"!=typeof i.alsoResize||i.alsoResize.parentNode?s(i.alsoResize):i.alsoResize.length?(i.alsoResize=i.alsoResize[0],s(i.alsoResize)):e.each(i.alsoResize,function(e){s(e)})},resize:function(t,i){var s=e(this).data("ui-resizable"),n=s.options,a=s.originalSize,o=s.originalPosition,r={height:s.size.height-a.height||0,width:s.size.width-a.width||0,top:s.position.top-o.top||0,left:s.position.left-o.left||0},h=function(t,s){e(t).each(function(){var t=e(this),n=e(this).data("ui-resizable-alsoresize"),a={},o=s&&s.length?s:t.parents(i.originalElement[0]).length?["width","height"]:["width","height","top","left"];e.each(o,function(e,t){var i=(n[t]||0)+(r[t]||0);i&&i>=0&&(a[t]=i||null)}),t.css(a)})};"object"!=typeof n.alsoResize||n.alsoResize.nodeType?h(n.alsoResize):e.each(n.alsoResize,function(e,t){h(e,t)})},stop:function(){e(this).removeData("resizable-alsoresize")}}),e.ui.plugin.add("resizable","ghost",{start:function(){var t=e(this).data("ui-resizable"),i=t.options,s=t.size;t.ghost=t.originalElement.clone(),t.ghost.css({opacity:.25,display:"block",position:"relative",height:s.height,width:s.width,margin:0,left:0,top:0}).addClass("ui-resizable-ghost").addClass("string"==typeof i.ghost?i.ghost:""),t.ghost.appendTo(t.helper)},resize:function(){var t=e(this).data("ui-resizable");t.ghost&&t.ghost.css({position:"relative",height:t.size.height,width:t.size.width})},stop:function(){var t=e(this).data("ui-resizable");t.ghost&&t.helper&&t.helper.get(0).removeChild(t.ghost.get(0))}}),e.ui.plugin.add("resizable","grid",{resize:function(){var t=e(this).data("ui-resizable"),i=t.options,s=t.size,n=t.originalSize,a=t.originalPosition,o=t.axis,r="number"==typeof i.grid?[i.grid,i.grid]:i.grid,h=r[0]||1,l=r[1]||1,u=Math.round((s.width-n.width)/h)*h,c=Math.round((s.height-n.height)/l)*l,d=n.width+u,p=n.height+c,f=i.maxWidth&&d>i.maxWidth,m=i.maxHeight&&p>i.maxHeight,g=i.minWidth&&i.minWidth>d,v=i.minHeight&&i.minHeight>p;i.grid=r,g&&(d+=h),v&&(p+=l),f&&(d-=h),m&&(p-=l),/^(se|s|e)$/.test(o)?(t.size.width=d,t.size.height=p):/^(ne)$/.test(o)?(t.size.width=d,t.size.height=p,t.position.top=a.top-c):/^(sw)$/.test(o)?(t.size.width=d,t.size.height=p,t.position.left=a.left-u):(t.size.width=d,t.size.height=p,t.position.top=a.top-c,t.position.left=a.left-u)}})})(jQuery);;
/*! jQuery UI - v1.10.2 - 2013-03-14
* http://jqueryui.com
* Copyright 2013 jQuery Foundation and other contributors; Licensed MIT */
(function(t){var e={buttons:!0,height:!0,maxHeight:!0,maxWidth:!0,minHeight:!0,minWidth:!0,width:!0},i={maxHeight:!0,maxWidth:!0,minHeight:!0,minWidth:!0};t.widget("ui.dialog",{version:"1.10.2",options:{appendTo:"body",autoOpen:!0,buttons:[],closeOnEscape:!0,closeText:"close",dialogClass:"",draggable:!0,hide:null,height:"auto",maxHeight:null,maxWidth:null,minHeight:150,minWidth:150,modal:!1,position:{my:"center",at:"center",of:window,collision:"fit",using:function(e){var i=t(this).css(e).offset().top;0>i&&t(this).css("top",e.top-i)}},resizable:!0,show:null,title:null,width:300,beforeClose:null,close:null,drag:null,dragStart:null,dragStop:null,focus:null,open:null,resize:null,resizeStart:null,resizeStop:null},_create:function(){this.originalCss={display:this.element[0].style.display,width:this.element[0].style.width,minHeight:this.element[0].style.minHeight,maxHeight:this.element[0].style.maxHeight,height:this.element[0].style.height},this.originalPosition={parent:this.element.parent(),index:this.element.parent().children().index(this.element)},this.originalTitle=this.element.attr("title"),this.options.title=this.options.title||this.originalTitle,this._createWrapper(),this.element.show().removeAttr("title").addClass("ui-dialog-content ui-widget-content").appendTo(this.uiDialog),this._createTitlebar(),this._createButtonPane(),this.options.draggable&&t.fn.draggable&&this._makeDraggable(),this.options.resizable&&t.fn.resizable&&this._makeResizable(),this._isOpen=!1},_init:function(){this.options.autoOpen&&this.open()},_appendTo:function(){var e=this.options.appendTo;return e&&(e.jquery||e.nodeType)?t(e):this.document.find(e||"body").eq(0)},_destroy:function(){var t,e=this.originalPosition;this._destroyOverlay(),this.element.removeUniqueId().removeClass("ui-dialog-content ui-widget-content").css(this.originalCss).detach(),this.uiDialog.stop(!0,!0).remove(),this.originalTitle&&this.element.attr("title",this.originalTitle),t=e.parent.children().eq(e.index),t.length&&t[0]!==this.element[0]?t.before(this.element):e.parent.append(this.element)},widget:function(){return this.uiDialog},disable:t.noop,enable:t.noop,close:function(e){var i=this;this._isOpen&&this._trigger("beforeClose",e)!==!1&&(this._isOpen=!1,this._destroyOverlay(),this.opener.filter(":focusable").focus().length||t(this.document[0].activeElement).blur(),this._hide(this.uiDialog,this.options.hide,function(){i._trigger("close",e)}))},isOpen:function(){return this._isOpen},moveToTop:function(){this._moveToTop()},_moveToTop:function(t,e){var i=!!this.uiDialog.nextAll(":visible").insertBefore(this.uiDialog).length;return i&&!e&&this._trigger("focus",t),i},open:function(){var e=this;return this._isOpen?(this._moveToTop()&&this._focusTabbable(),undefined):(this._isOpen=!0,this.opener=t(this.document[0].activeElement),this._size(),this._position(),this._createOverlay(),this._moveToTop(null,!0),this._show(this.uiDialog,this.options.show,function(){e._focusTabbable(),e._trigger("focus")}),this._trigger("open"),undefined)},_focusTabbable:function(){var t=this.element.find("[autofocus]");t.length||(t=this.element.find(":tabbable")),t.length||(t=this.uiDialogButtonPane.find(":tabbable")),t.length||(t=this.uiDialogTitlebarClose.filter(":tabbable")),t.length||(t=this.uiDialog),t.eq(0).focus()},_keepFocus:function(e){function i(){var e=this.document[0].activeElement,i=this.uiDialog[0]===e||t.contains(this.uiDialog[0],e);i||this._focusTabbable()}e.preventDefault(),i.call(this),this._delay(i)},_createWrapper:function(){this.uiDialog=t("<div>").addClass("ui-dialog ui-widget ui-widget-content ui-corner-all ui-front "+this.options.dialogClass).hide().attr({tabIndex:-1,role:"dialog"}).appendTo(this._appendTo()),this._on(this.uiDialog,{keydown:function(e){if(this.options.closeOnEscape&&!e.isDefaultPrevented()&&e.keyCode&&e.keyCode===t.ui.keyCode.ESCAPE)return e.preventDefault(),this.close(e),undefined;if(e.keyCode===t.ui.keyCode.TAB){var i=this.uiDialog.find(":tabbable"),s=i.filter(":first"),n=i.filter(":last");e.target!==n[0]&&e.target!==this.uiDialog[0]||e.shiftKey?e.target!==s[0]&&e.target!==this.uiDialog[0]||!e.shiftKey||(n.focus(1),e.preventDefault()):(s.focus(1),e.preventDefault())}},mousedown:function(t){this._moveToTop(t)&&this._focusTabbable()}}),this.element.find("[aria-describedby]").length||this.uiDialog.attr({"aria-describedby":this.element.uniqueId().attr("id")})},_createTitlebar:function(){var e;this.uiDialogTitlebar=t("<div>").addClass("ui-dialog-titlebar ui-widget-header ui-corner-all ui-helper-clearfix").prependTo(this.uiDialog),this._on(this.uiDialogTitlebar,{mousedown:function(e){t(e.target).closest(".ui-dialog-titlebar-close")||this.uiDialog.focus()}}),this.uiDialogTitlebarClose=t("<button></button>").button({label:this.options.closeText,icons:{primary:"ui-icon-closethick"},text:!1}).addClass("ui-dialog-titlebar-close").appendTo(this.uiDialogTitlebar),this._on(this.uiDialogTitlebarClose,{click:function(t){t.preventDefault(),this.close(t)}}),e=t("<span>").uniqueId().addClass("ui-dialog-title").prependTo(this.uiDialogTitlebar),this._title(e),this.uiDialog.attr({"aria-labelledby":e.attr("id")})},_title:function(t){this.options.title||t.html("&#160;"),t.text(this.options.title)},_createButtonPane:function(){this.uiDialogButtonPane=t("<div>").addClass("ui-dialog-buttonpane ui-widget-content ui-helper-clearfix"),this.uiButtonSet=t("<div>").addClass("ui-dialog-buttonset").appendTo(this.uiDialogButtonPane),this._createButtons()},_createButtons:function(){var e=this,i=this.options.buttons;return this.uiDialogButtonPane.remove(),this.uiButtonSet.empty(),t.isEmptyObject(i)||t.isArray(i)&&!i.length?(this.uiDialog.removeClass("ui-dialog-buttons"),undefined):(t.each(i,function(i,s){var n,a;s=t.isFunction(s)?{click:s,text:i}:s,s=t.extend({type:"button"},s),n=s.click,s.click=function(){n.apply(e.element[0],arguments)},a={icons:s.icons,text:s.showText},delete s.icons,delete s.showText,t("<button></button>",s).button(a).appendTo(e.uiButtonSet)}),this.uiDialog.addClass("ui-dialog-buttons"),this.uiDialogButtonPane.appendTo(this.uiDialog),undefined)},_makeDraggable:function(){function e(t){return{position:t.position,offset:t.offset}}var i=this,s=this.options;this.uiDialog.draggable({cancel:".ui-dialog-content, .ui-dialog-titlebar-close",handle:".ui-dialog-titlebar",containment:"document",start:function(s,n){t(this).addClass("ui-dialog-dragging"),i._blockFrames(),i._trigger("dragStart",s,e(n))},drag:function(t,s){i._trigger("drag",t,e(s))},stop:function(n,a){s.position=[a.position.left-i.document.scrollLeft(),a.position.top-i.document.scrollTop()],t(this).removeClass("ui-dialog-dragging"),i._unblockFrames(),i._trigger("dragStop",n,e(a))}})},_makeResizable:function(){function e(t){return{originalPosition:t.originalPosition,originalSize:t.originalSize,position:t.position,size:t.size}}var i=this,s=this.options,n=s.resizable,a=this.uiDialog.css("position"),o="string"==typeof n?n:"n,e,s,w,se,sw,ne,nw";this.uiDialog.resizable({cancel:".ui-dialog-content",containment:"document",alsoResize:this.element,maxWidth:s.maxWidth,maxHeight:s.maxHeight,minWidth:s.minWidth,minHeight:this._minHeight(),handles:o,start:function(s,n){t(this).addClass("ui-dialog-resizing"),i._blockFrames(),i._trigger("resizeStart",s,e(n))},resize:function(t,s){i._trigger("resize",t,e(s))},stop:function(n,a){s.height=t(this).height(),s.width=t(this).width(),t(this).removeClass("ui-dialog-resizing"),i._unblockFrames(),i._trigger("resizeStop",n,e(a))}}).css("position",a)},_minHeight:function(){var t=this.options;return"auto"===t.height?t.minHeight:Math.min(t.minHeight,t.height)},_position:function(){var t=this.uiDialog.is(":visible");t||this.uiDialog.show(),this.uiDialog.position(this.options.position),t||this.uiDialog.hide()},_setOptions:function(s){var n=this,a=!1,o={};t.each(s,function(t,s){n._setOption(t,s),t in e&&(a=!0),t in i&&(o[t]=s)}),a&&(this._size(),this._position()),this.uiDialog.is(":data(ui-resizable)")&&this.uiDialog.resizable("option",o)},_setOption:function(t,e){var i,s,n=this.uiDialog;"dialogClass"===t&&n.removeClass(this.options.dialogClass).addClass(e),"disabled"!==t&&(this._super(t,e),"appendTo"===t&&this.uiDialog.appendTo(this._appendTo()),"buttons"===t&&this._createButtons(),"closeText"===t&&this.uiDialogTitlebarClose.button({label:""+e}),"draggable"===t&&(i=n.is(":data(ui-draggable)"),i&&!e&&n.draggable("destroy"),!i&&e&&this._makeDraggable()),"position"===t&&this._position(),"resizable"===t&&(s=n.is(":data(ui-resizable)"),s&&!e&&n.resizable("destroy"),s&&"string"==typeof e&&n.resizable("option","handles",e),s||e===!1||this._makeResizable()),"title"===t&&this._title(this.uiDialogTitlebar.find(".ui-dialog-title")))},_size:function(){var t,e,i,s=this.options;this.element.show().css({width:"auto",minHeight:0,maxHeight:"none",height:0}),s.minWidth>s.width&&(s.width=s.minWidth),t=this.uiDialog.css({height:"auto",width:s.width}).outerHeight(),e=Math.max(0,s.minHeight-t),i="number"==typeof s.maxHeight?Math.max(0,s.maxHeight-t):"none","auto"===s.height?this.element.css({minHeight:e,maxHeight:i,height:"auto"}):this.element.height(Math.max(0,s.height-t)),this.uiDialog.is(":data(ui-resizable)")&&this.uiDialog.resizable("option","minHeight",this._minHeight())},_blockFrames:function(){this.iframeBlocks=this.document.find("iframe").map(function(){var e=t(this);return t("<div>").css({position:"absolute",width:e.outerWidth(),height:e.outerHeight()}).appendTo(e.parent()).offset(e.offset())[0]})},_unblockFrames:function(){this.iframeBlocks&&(this.iframeBlocks.remove(),delete this.iframeBlocks)},_allowInteraction:function(e){return t(e.target).closest(".ui-dialog").length?!0:!!t(e.target).closest(".ui-datepicker").length},_createOverlay:function(){if(this.options.modal){var e=this,i=this.widgetFullName;t.ui.dialog.overlayInstances||this._delay(function(){t.ui.dialog.overlayInstances&&this.document.bind("focusin.dialog",function(s){e._allowInteraction(s)||(s.preventDefault(),t(".ui-dialog:visible:last .ui-dialog-content").data(i)._focusTabbable())})}),this.overlay=t("<div>").addClass("ui-widget-overlay ui-front").appendTo(this._appendTo()),this._on(this.overlay,{mousedown:"_keepFocus"}),t.ui.dialog.overlayInstances++}},_destroyOverlay:function(){this.options.modal&&this.overlay&&(t.ui.dialog.overlayInstances--,t.ui.dialog.overlayInstances||this.document.unbind("focusin.dialog"),this.overlay.remove(),this.overlay=null)}}),t.ui.dialog.overlayInstances=0,t.uiBackCompat!==!1&&t.widget("ui.dialog",t.ui.dialog,{_position:function(){var e,i=this.options.position,s=[],n=[0,0];i?(("string"==typeof i||"object"==typeof i&&"0"in i)&&(s=i.split?i.split(" "):[i[0],i[1]],1===s.length&&(s[1]=s[0]),t.each(["left","top"],function(t,e){+s[t]===s[t]&&(n[t]=s[t],s[t]=e)}),i={my:s[0]+(0>n[0]?n[0]:"+"+n[0])+" "+s[1]+(0>n[1]?n[1]:"+"+n[1]),at:s.join(" ")}),i=t.extend({},t.ui.dialog.prototype.options.position,i)):i=t.ui.dialog.prototype.options.position,e=this.uiDialog.is(":visible"),e||this.uiDialog.show(),this.uiDialog.position(i),e||this.uiDialog.hide()}})})(jQuery);;
(function () {
  var m = angular.module('Messages', ['ngStorage']);

  m.config(['$httpProvider', function ($httpProvider) {
    $httpProvider.interceptors.push('messageFetcher')
  }]);

  m.factory('messageFetcher', ['$sessionStorage', function ($ss) {
    return {
      response: function (response) {
        if (response.data && response.data.messages) {
          $ss.messages = response.data.messages;
        }
        return response;
      }
    };

  }]);

  m.controller('messageController', ['$scope', '$sessionStorage', function ($s, $ss) {
    $s.messages = $ss.messages;
    console.log($s.messages);

    this.close = function () {
      delete $s.messages;
    }
  }]);
})();
;
(function() {

  var m = angular.module('RecursionHelper', []);

  m.factory('RecursionHelper', ['$compile', function($compile) {
    return {
      /**
       * Manually compiles the element, fixing the recursion loop.
       * @param element
       * @param [link] A post-link function, or an object with function(s) registered via pre and post properties.
       * @returns An object containing the linking functions.
       */
      compile: function(element, link){
        // Normalize the link parameter
        if(angular.isFunction(link)){
          link = { post: link };
        }

        // Break the recursion loop by removing the contents
        var contents = element.contents().remove();
        var compiledContents;
        return {
          pre: (link && link.pre) ? link.pre : null,
          /**
           * Compiles and re-adds the contents
           */
          post: function(scope, element){
            // Compile the contents
            if(!compiledContents){
              compiledContents = $compile(contents);
            }
            // Re-add the compiled contents to the element
            compiledContents(scope, function(clone){
              element.append(clone);
            });

            // Call the post-linking function, if any
            if(link && link.post){
              link.post.apply(null, arguments);
            }
          }
        };
      }
    };
  }]);

})();
;
/**
 * Adds a spinner to buttons, that can be enabled and disabled with the buttonSpinnerStatus service.
 * Does not support <input> elements. Use <button> instead.
 *
 * Usage:
 *  <input type="submit" value="Save" ng-click="save()" button-spinner="uniqueId" [spinningText="Saving..."]>
 *
 *  function save() {
 *    buttonSpinnerStatus.SetState('uniqueId', true);
 *    businessLogic().then(function() {
 *      buttonSpinnerStatus.SetState('uniqueId', false);
 *    });
 *  }
 */
(function () {
  var m = angular.module('os-buttonSpinner', []);

  m.service('buttonSpinnerStatus', [function () {

    var states = {},
      handlers = {};

    this.SetState = function(id, state) {
      states[id] = !!state;
      if (handlers[id]) {
        for (var i = 0; i < handlers[id].length; i++) {
          handlers[id][i](states[id]);
        }
      }
    }

    this.GetState = function(id) {
      return typeof states[id] != undefined ? states[id] : false;
    }

    this.$observe = function(id, func) {
      if (angular.isFunction(func)) {
        handlers[id] = handlers[id] || [];
        handlers[id].push(func);

        func(states[id]);
      }
    }
  }]);

  m.directive('buttonSpinner', ['buttonSpinnerStatus', function ($bss) {
    return {
      restrict: 'A',
      scope: {
        spinnerID: '@buttonSpinner',
        spinningText: '@?'
      },
      transclude: true,
      template:
        "<ng-transclude></ng-transclude>" +
        '<span ng-show="spinning" class="spinner">',
      link: function (scope, elem, attr) {
        var textElem = elem.find('ng-transclude').find('span')[0],
          original = '';

        $bss.$observe(scope.spinnerID, function (state) {
          if (original == '') {
            original = elem.text();
          }
          scope.spinning = state;
          if (scope.spinningText) {
            textElem.innerHTML = state ? scope.spinningText : original;
          }
        })
      }
    }
  }])
})();;
(function () {

  var m = angular.module('AppForm', ['angularModalService', 'os-buttonSpinner']);

  m.directive('appFormModal', ['ModalService', function (ModalService) {
    var dialogOptions = {
      minWidth: 850,
      minHeight: 100,
      modal: true,
      position: 'top+100px',
      dialogClass: 'app-form'
    };

    function clickHandler(e) {
      e.preventDefault();
      e.stopPropagation();

      ModalService.showModal({
        controller: 'appFormController',
        templateUrl: Drupal.settings.paths.app_form + '/app_form.template.html',
      })
      .then(function (modal) {
        dialogOptions.close = function (event, ui) {
          modal.element.remove();
        }
        modal.element.dialog(dialogOptions);
        modal.close.then(function (result) {
          if (result == 'reload') {
            window.location.reload();
          }
        });
      });
    }
    return {
      link: function (scope, elem, attr) {
        elem.bind('click', clickHandler);
      }
    }
  }]);

  m.controller('appFormController', ['$scope', 'appFormService', 'buttonSpinnerStatus', 'close', function ($s, afs, bfs, close) {
    $s.apps = [];
    afs.fetch().then(function (r) {
      for (var k in r.data) {
        $s.apps.push(r.data[k]);
      };
    });

    $s.submit = function () {
      bfs.SetState('app-form', true);
      for (var i = 0; i < $s.apps.length; i++) {
        if ($s.apps[i].disable) {
          $s.apps[i].enabled = false;
        }
        else if ($s.apps[i].enable) {
          $s.apps[i].enabled = true;
        }
      }

      afs.save($s.apps).then(function (status) {
        if (status == 'success') {
          close('reload');
        }
        else {
          close();
        }
        bfs.SetState('app-form', false);
      })
    }

    $s.close = function () {
      close();
    }
  }]);

  m.directive('appPrivacySelector', [function () {
    function mainClickHandler(e) {
      this.show = true;
      document.body.addEventListener('click', this.cancelClickHandler, true);
      this.$digest();
    }

    function subClickHandler(e) {
      this.val = angular.element(e.currentTarget).attr('data-value');
      this.show = false;
      this.$apply();
      e.stopPropagation();
      e.preventDefault();
    }

    function cancelClickHandler(e) {
      this.show = false;
      this.$digest();
    }

    return {
      template: '{{ val == "1" ? "Site Members Only" : "The Public" }}<div class="privacy-popup" ng-show="show"><div class="privacy-popup-selector private" data-value="1" ng-class="{selected: val == 1}">Site Members Only</div><div class="privacy-popup-selector everyone" data-value="0" ng-class="{selected: val == 0}">The Public</div></div>',
      scope: {
        val: '=ngModel',
      },
      link: function (scope, elem, attr) {
        scope.show = false;
        elem.bind('click', angular.bind(scope, mainClickHandler));
        angular.element(elem[0].querySelectorAll('.privacy-popup-selector')).bind('click', angular.bind(scope, subClickHandler));
        scope.cancelClickHandler = angular.bind(scope, cancelClickHandler);
      }
    }
  }]);

  m.service('appFormService', ['$http', '$q', '$timeout', function ($http, $q, $t) {
    var pristine = [];
    var map = {};
    var fetchDefered;
    function fetch() {
      if (!fetchDefered) {
        fetchDefered = $q.defer();
        var queryArgs = {};
        if (Drupal.settings.spaces && Drupal.settings.spaces.id) {
          queryArgs.vsite = Drupal.settings.spaces.id;
        }

        var baseUrl = Drupal.settings.paths.api;
        var config = {
          params: queryArgs
        };

        $http.get(baseUrl + '/apps', config).then(function (r) {
          pristine = angular.copy(r.data.data);
          fetchDefered.resolve(r.data);

          for (var i = 0; i < r.data.data.length; i++) {
            map[r.data.data[i].machine_name] = i;
          }
        },
        function (e) {
          fetchDefered.reject(e);
        });
      }

      return fetchDefered.promise;
    }

    var saveDefer;
    function save(values) {
      if (saveDefer) {
        var cancel = $q.defer();
        $t(function () {
          cancel.reject('progress');
        });
        return cancel.promise;
      }

      var queryArgs = {};
      if (Drupal.settings.spaces && Drupal.settings.spaces.id) {
        queryArgs.vsite = Drupal.settings.spaces.id;
      }

      var baseUrl = Drupal.settings.paths.api;
      var config = {
        params: queryArgs
      };

      saveDefer = $q.defer();
      var dirty = [];
      for (var i = 0; i < values.length; i++) {
        var machineName = values[i].machine_name,
          key = map[machineName],
          pris = pristine[key];

        for (var k in pris) {
          if (pris[k] != values[i][k]) {
            dirty.push(values[i]);
            break;
          }
        }
      }

      if (dirty.length == 0) {
        $t(function () {
          saveDefer.resolve('no changes');
        });
      }
      else {
        $http.patch(baseUrl + '/apps', dirty, config).then(function (r) {
          // success
          saveDefer.resolve('success');
        }, function (e) {
          console.log(e);
          saveDefer.reject('error');
        });
      }

      return saveDefer.promise;
    }

    return {
      fetch: fetch,
      save: save
    }
  }]);

  m.run(['appFormService', function (afs) {
    afs.fetch();
  }]);

})()
;
(function () {

  var m = angular.module("DependencyManager", []);

  m.provider("Dependencies", function () {
    var dependencies = {};

    this.AddDependency = function (mod, dep) {
      dependencies[mod] = dependencies[mod] || [];

      dependencies[mod].push(dep);
    };

    this.$get = [function () {
      return {
        GetDependencies: function(mod) {
          if (!dependencies[mod]) {
            return [];
          }
          return dependencies[mod].slice(0);
        }
      }
    }];
  })

})();;
/*
    http://www.JSON.org/json2.js
    2009-09-29

    Public Domain.

    NO WARRANTY EXPRESSED OR IMPLIED. USE AT YOUR OWN RISK.

    See http://www.JSON.org/js.html


    This code should be minified before deployment.
    See http://javascript.crockford.com/jsmin.html

    USE YOUR OWN COPY. IT IS EXTREMELY UNWISE TO LOAD CODE FROM SERVERS YOU DO
    NOT CONTROL.


    This file creates a global JSON object containing two methods: stringify
    and parse.

        JSON.stringify(value, replacer, space)
            value       any JavaScript value, usually an object or array.

            replacer    an optional parameter that determines how object
                        values are stringified for objects. It can be a
                        function or an array of strings.

            space       an optional parameter that specifies the indentation
                        of nested structures. If it is omitted, the text will
                        be packed without extra whitespace. If it is a number,
                        it will specify the number of spaces to indent at each
                        level. If it is a string (such as '\t' or '&nbsp;'),
                        it contains the characters used to indent at each level.

            This method produces a JSON text from a JavaScript value.

            When an object value is found, if the object contains a toJSON
            method, its toJSON method will be called and the result will be
            stringified. A toJSON method does not serialize: it returns the
            value represented by the name/value pair that should be serialized,
            or undefined if nothing should be serialized. The toJSON method
            will be passed the key associated with the value, and this will be
            bound to the value

            For example, this would serialize Dates as ISO strings.

                Date.prototype.toJSON = function (key) {
                    function f(n) {
                        // Format integers to have at least two digits.
                        return n < 10 ? '0' + n : n;
                    }

                    return this.getUTCFullYear()   + '-' +
                         f(this.getUTCMonth() + 1) + '-' +
                         f(this.getUTCDate())      + 'T' +
                         f(this.getUTCHours())     + ':' +
                         f(this.getUTCMinutes())   + ':' +
                         f(this.getUTCSeconds())   + 'Z';
                };

            You can provide an optional replacer method. It will be passed the
            key and value of each member, with this bound to the containing
            object. The value that is returned from your method will be
            serialized. If your method returns undefined, then the member will
            be excluded from the serialization.

            If the replacer parameter is an array of strings, then it will be
            used to select the members to be serialized. It filters the results
            such that only members with keys listed in the replacer array are
            stringified.

            Values that do not have JSON representations, such as undefined or
            functions, will not be serialized. Such values in objects will be
            dropped; in arrays they will be replaced with null. You can use
            a replacer function to replace those with JSON values.
            JSON.stringify(undefined) returns undefined.

            The optional space parameter produces a stringification of the
            value that is filled with line breaks and indentation to make it
            easier to read.

            If the space parameter is a non-empty string, then that string will
            be used for indentation. If the space parameter is a number, then
            the indentation will be that many spaces.

            Example:

            text = JSON.stringify(['e', {pluribus: 'unum'}]);
            // text is '["e",{"pluribus":"unum"}]'


            text = JSON.stringify(['e', {pluribus: 'unum'}], null, '\t');
            // text is '[\n\t"e",\n\t{\n\t\t"pluribus": "unum"\n\t}\n]'

            text = JSON.stringify([new Date()], function (key, value) {
                return this[key] instanceof Date ?
                    'Date(' + this[key] + ')' : value;
            });
            // text is '["Date(---current time---)"]'


        JSON.parse(text, reviver)
            This method parses a JSON text to produce an object or array.
            It can throw a SyntaxError exception.

            The optional reviver parameter is a function that can filter and
            transform the results. It receives each of the keys and values,
            and its return value is used instead of the original value.
            If it returns what it received, then the structure is not modified.
            If it returns undefined then the member is deleted.

            Example:

            // Parse the text. Values that look like ISO date strings will
            // be converted to Date objects.

            myData = JSON.parse(text, function (key, value) {
                var a;
                if (typeof value === 'string') {
                    a =
/^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2}(?:\.\d*)?)Z$/.exec(value);
                    if (a) {
                        return new Date(Date.UTC(+a[1], +a[2] - 1, +a[3], +a[4],
                            +a[5], +a[6]));
                    }
                }
                return value;
            });

            myData = JSON.parse('["Date(09/09/2001)"]', function (key, value) {
                var d;
                if (typeof value === 'string' &&
                        value.slice(0, 5) === 'Date(' &&
                        value.slice(-1) === ')') {
                    d = new Date(value.slice(5, -1));
                    if (d) {
                        return d;
                    }
                }
                return value;
            });


    This is a reference implementation. You are free to copy, modify, or
    redistribute.
*/

/*jslint evil: true, strict: false */

/*members "", "\b", "\t", "\n", "\f", "\r", "\"", JSON, "\\", apply,
    call, charCodeAt, getUTCDate, getUTCFullYear, getUTCHours,
    getUTCMinutes, getUTCMonth, getUTCSeconds, hasOwnProperty, join,
    lastIndex, length, parse, prototype, push, replace, slice, stringify,
    test, toJSON, toString, valueOf
*/


// Create a JSON object only if one does not already exist. We create the
// methods in a closure to avoid creating global variables.

if (!this.JSON) {
    this.JSON = {};
}

(function () {

    function f(n) {
        // Format integers to have at least two digits.
        return n < 10 ? '0' + n : n;
    }

    if (typeof Date.prototype.toJSON !== 'function') {

        Date.prototype.toJSON = function (key) {

            return isFinite(this.valueOf()) ?
                   this.getUTCFullYear()   + '-' +
                 f(this.getUTCMonth() + 1) + '-' +
                 f(this.getUTCDate())      + 'T' +
                 f(this.getUTCHours())     + ':' +
                 f(this.getUTCMinutes())   + ':' +
                 f(this.getUTCSeconds())   + 'Z' : null;
        };

        String.prototype.toJSON =
        Number.prototype.toJSON =
        Boolean.prototype.toJSON = function (key) {
            return this.valueOf();
        };
    }

    var cx = /[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
        escapable = /[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
        gap,
        indent,
        meta = {    // table of character substitutions
            '\b': '\\b',
            '\t': '\\t',
            '\n': '\\n',
            '\f': '\\f',
            '\r': '\\r',
            '"' : '\\"',
            '\\': '\\\\'
        },
        rep;


    function quote(string) {

// If the string contains no control characters, no quote characters, and no
// backslash characters, then we can safely slap some quotes around it.
// Otherwise we must also replace the offending characters with safe escape
// sequences.

        escapable.lastIndex = 0;
        return escapable.test(string) ?
            '"' + string.replace(escapable, function (a) {
                var c = meta[a];
                return typeof c === 'string' ? c :
                    '\\u' + ('0000' + a.charCodeAt(0).toString(16)).slice(-4);
            }) + '"' :
            '"' + string + '"';
    }


    function str(key, holder) {

// Produce a string from holder[key].

        var i,          // The loop counter.
            k,          // The member key.
            v,          // The member value.
            length,
            mind = gap,
            partial,
            value = holder[key];

// If the value has a toJSON method, call it to obtain a replacement value.

        if (value && typeof value === 'object' &&
                typeof value.toJSON === 'function') {
            value = value.toJSON(key);
        }

// If we were called with a replacer function, then call the replacer to
// obtain a replacement value.

        if (typeof rep === 'function') {
            value = rep.call(holder, key, value);
        }

// What happens next depends on the value's type.

        switch (typeof value) {
        case 'string':
            return quote(value);

        case 'number':

// JSON numbers must be finite. Encode non-finite numbers as null.

            return isFinite(value) ? String(value) : 'null';

        case 'boolean':
        case 'null':

// If the value is a boolean or null, convert it to a string. Note:
// typeof null does not produce 'null'. The case is included here in
// the remote chance that this gets fixed someday.

            return String(value);

// If the type is 'object', we might be dealing with an object or an array or
// null.

        case 'object':

// Due to a specification blunder in ECMAScript, typeof null is 'object',
// so watch out for that case.

            if (!value) {
                return 'null';
            }

// Make an array to hold the partial results of stringifying this object value.

            gap += indent;
            partial = [];

// Is the value an array?

            if (Object.prototype.toString.apply(value) === '[object Array]') {

// The value is an array. Stringify every element. Use null as a placeholder
// for non-JSON values.

                length = value.length;
                for (i = 0; i < length; i += 1) {
                    partial[i] = str(i, value) || 'null';
                }

// Join all of the elements together, separated with commas, and wrap them in
// brackets.

                v = partial.length === 0 ? '[]' :
                    gap ? '[\n' + gap +
                            partial.join(',\n' + gap) + '\n' +
                                mind + ']' :
                          '[' + partial.join(',') + ']';
                gap = mind;
                return v;
            }

// If the replacer is an array, use it to select the members to be stringified.

            if (rep && typeof rep === 'object') {
                length = rep.length;
                for (i = 0; i < length; i += 1) {
                    k = rep[i];
                    if (typeof k === 'string') {
                        v = str(k, value);
                        if (v) {
                            partial.push(quote(k) + (gap ? ': ' : ':') + v);
                        }
                    }
                }
            } else {

// Otherwise, iterate through all of the keys in the object.

                for (k in value) {
                    if (Object.hasOwnProperty.call(value, k)) {
                        v = str(k, value);
                        if (v) {
                            partial.push(quote(k) + (gap ? ': ' : ':') + v);
                        }
                    }
                }
            }

// Join all of the member texts together, separated with commas,
// and wrap them in braces.

            v = partial.length === 0 ? '{}' :
                gap ? '{\n' + gap + partial.join(',\n' + gap) + '\n' +
                        mind + '}' : '{' + partial.join(',') + '}';
            gap = mind;
            return v;
        }
    }

// If the JSON object does not yet have a stringify method, give it one.

    if (typeof JSON.stringify !== 'function') {
        JSON.stringify = function (value, replacer, space) {

// The stringify method takes a value and an optional replacer, and an optional
// space parameter, and returns a JSON text. The replacer can be a function
// that can replace values, or an array of strings that will select the keys.
// A default replacer method can be provided. Use of the space parameter can
// produce text that is more easily readable.

            var i;
            gap = '';
            indent = '';

// If the space parameter is a number, make an indent string containing that
// many spaces.

            if (typeof space === 'number') {
                for (i = 0; i < space; i += 1) {
                    indent += ' ';
                }

// If the space parameter is a string, it will be used as the indent string.

            } else if (typeof space === 'string') {
                indent = space;
            }

// If there is a replacer, it must be a function or an array.
// Otherwise, throw an error.

            rep = replacer;
            if (replacer && typeof replacer !== 'function' &&
                    (typeof replacer !== 'object' ||
                     typeof replacer.length !== 'number')) {
                throw new Error('JSON.stringify');
            }

// Make a fake root object containing our value under the key of ''.
// Return the result of stringifying the value.

            return str('', {'': value});
        };
    }


// If the JSON object does not yet have a parse method, give it one.

    if (typeof JSON.parse !== 'function') {
        JSON.parse = function (text, reviver) {

// The parse method takes a text and an optional reviver function, and returns
// a JavaScript value if the text is a valid JSON text.

            var j;

            function walk(holder, key) {

// The walk method is used to recursively walk the resulting structure so
// that modifications can be made.

                var k, v, value = holder[key];
                if (value && typeof value === 'object') {
                    for (k in value) {
                        if (Object.hasOwnProperty.call(value, k)) {
                            v = walk(value, k);
                            if (v !== undefined) {
                                value[k] = v;
                            } else {
                                delete value[k];
                            }
                        }
                    }
                }
                return reviver.call(holder, key, value);
            }


// Parsing happens in four stages. In the first stage, we replace certain
// Unicode characters with escape sequences. JavaScript handles many characters
// incorrectly, either silently deleting them, or treating them as line endings.

            cx.lastIndex = 0;
            if (cx.test(text)) {
                text = text.replace(cx, function (a) {
                    return '\\u' +
                        ('0000' + a.charCodeAt(0).toString(16)).slice(-4);
                });
            }

// In the second stage, we run the text against regular expressions that look
// for non-JSON patterns. We are especially concerned with '()' and 'new'
// because they can cause invocation, and '=' because it can cause mutation.
// But just to be safe, we want to reject all unexpected forms.

// We split the second stage into 4 regexp operations in order to work around
// crippling inefficiencies in IE's and Safari's regexp engines. First we
// replace the JSON backslash pairs with '@' (a non-JSON character). Second, we
// replace all simple value tokens with ']' characters. Third, we delete all
// open brackets that follow a colon or comma or that begin the text. Finally,
// we look to see that the remaining characters are only whitespace or ']' or
// ',' or ':' or '{' or '}'. If that is so, then the text is safe for eval.

            if (/^[\],:{}\s]*$/.
test(text.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g, '@').
replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, ']').
replace(/(?:^|:|,)(?:\s*\[)+/g, ''))) {

// In the third stage we use the eval function to compile the text into a
// JavaScript structure. The '{' operator is subject to a syntactic ambiguity
// in JavaScript: it can begin a block or an object literal. We wrap the text
// in parens to eliminate the ambiguity.

                j = eval('(' + text + ')');

// In the optional fourth stage, we recursively walk the new structure, passing
// each name/value pair to a reviver function for possible transformation.

                return typeof reviver === 'function' ?
                    walk({'': j}, '') : j;
            }

// If the text is not JSON parseable, then a SyntaxError is thrown.

            throw new SyntaxError('JSON.parse');
        };
    }
}());
;
/*
 * debug - v0.3 - 6/8/2009
 * http://benalman.com/projects/javascript-debug-console-log/
 *
 * Copyright (c) 2009 "Cowboy" Ben Alman
 * Licensed under the MIT license
 * http://benalman.com/about/license/
 *
 * With lots of help from Paul Irish!
 * http://paulirish.com/
 */
window.debug=(function(){var c=this,e=Array.prototype.slice,b=c.console,i={},f,g,j=9,d=["error","warn","info","debug","log"],m="assert clear count dir dirxml group groupEnd profile profileEnd time timeEnd trace".split(" "),k=m.length,a=[];while(--k>=0){(function(n){i[n]=function(){j!==0&&b&&b[n]&&b[n].apply(b,arguments)}})(m[k])}k=d.length;while(--k>=0){(function(n,o){i[o]=function(){var q=e.call(arguments),p=[o].concat(q);a.push(p);h(p);if(!b||!l(n)){return}b.firebug?b[o].apply(c,q):b[o]?b[o](q):b.log(q)}})(k,d[k])}function h(n){if(f&&(g||!b||!b.log)){f.apply(c,n)}}i.setLevel=function(n){j=typeof n==="number"?n:9};function l(n){return j>0?j>n:d.length+j<=n}i.setCallback=function(){var o=e.call(arguments),n=a.length,p=n;f=o.shift()||null;g=typeof o[0]==="boolean"?o.shift():false;p-=typeof o[0]==="number"?o.shift():n;while(p<n){h(a[p++])}};return i})();;
/**
 * A pager for a set of content that can be filtered.
 * The number of pages updates as the filters get more or less precise.
 *
 * Other modules implement the actual filtering. This module handles all interactions the filter has with the pager.
 */

(function () {
  var rootPath = '';

  angular.module('JSPager', [])
    .config(function($sceDelegateProvider) {
      var whitelist = $sceDelegateProvider.resourceUrlWhitelist(),
          domain = osCommonHelpers.findDomain(rootPath);

      domain = domain+'/**';
      whitelist.push(domain);

      $sceDelegateProvider.resourceUrlWhitelist(whitelist);

      if (typeof Drupal != 'undefined' && typeof Drupal.settings != 'undefined') {
        rootPath = Drupal.settings.paths.JSPager;
      }
    })
    .filter('PagerCurrentPage', function () {
      function currentPage(input, pager) {
        if (input) {
          var start = (pager.currentPage() - 1) * pager.pageSize;
          if (Array.isArray(input)) {
            return input.slice(start, start + pager.pageSize);
          }
          else if (typeof input == "object") {
            var i = 0,
              output = {};
            for (var key in input) {
              if (i >= start && i < start + pager.pageSize) {
                output[key] = input[key]
              }
              i++
            }
            return output;
          }
        }
        return '';
      }
      return currentPage;
    })
    .directive('jsPager', ['$parse', function($parse) {
      var currentPages = [],
        idMap = {};
      return {
        templateUrl: rootPath+'/pager.html',
        transclude: true,
        controller: [function () {

          this.getJSPagerId = function (string) {
            if (idMap[string] == undefined) {
              currentPages.push(1);
              idMap[string] = currentPages.length - 1;
            }

            return idMap[string];
          }

          this.page = function (id, page) {
            if (typeof page != 'undefined') {
              currentPages[id] = page;
            }

            return currentPages[id];
          }
        }],
        compile: function pagerCompile(element, attr) {
          var loop = attr.jsPager,
          /* this regex matches the following patterns:
           * var in collection | filter:item1 | filter:item2 track by var.property
           * if you try to do 'var in collection track by var.property | filters' it won't work properly
           */
            match = attr.jsPager.match(/^\s*([\s\S]+?)\s+in\s+([\s\S]+?)(?:\s+as\s+([\s\S]+?))?(?:\s+track\s+by\s+([\s\S]+?))?\s*$/),
            index = match[1],
            collection = match[2],
            trackExp = match[4],
            elements = [],
            pageSize = attr.pageSize || 10,
            //allElements = {$id: hashKey},
            trackExpGetter, trackByArray;

          /*  come back to this later
          if (trackExp) {
            trackExpGetter = $parse(trackExp);
          }
          else {
            trackByArray = function(key, value) {
              return hashKey(value);
            }
          }*/

          return function($scope, $element, $attr, _c, linker) {
            /* come back to this later. It's all performance optimization and I'm going cross-eyed.
            if (trackByExpGetter) {
              trackByIdExpFn = function(key, value, index) {
                // assign key, value, and $index to the locals so that they can be used in hash functions
                if (keyIdentifier) allElements[keyIdentifier] = key;
                allElements[valueIdentifier] = value;
                allElements.$index = index;
                return trackByExpGetter($scope, allElements);
              };
            }*/

            var $transclude = jQuery('ng-transclude, .ng-transclude, [ng-transclude]', $element),
              $target = $element;

            if ($transclude.length) {
              $target = $transclude.parent();
              $transclude.remove();
            }

            pagerLink($scope, $element, $attr, _c);
            $scope.$watchCollection(collection, function(collection) {
              $scope.collectionLength = 0;
              if (Array.isArray(collection)) {
                $scope.collectionLength = collection.length;
              }
              else {
                for (var key in collection) {
                  $scope.collectionLength++;
                }
              }
            });

            $scope.$watchCollection(collection + ' | PagerCurrentPage:pager', function(collection) {
              var i, block, childScope;

              // check if elements have already been rendered
              if (elements.length > 0){
                // if so remove them from DOM, and destroy their scope
                for (i = 0; i < elements.length; i++) {
                  elements[i].el.remove();
                  elements[i].scope.$destroy();
                };
                elements = [];
              }

              i = 0;
              for (var key in collection) {
                // create a new scope for every element in the collection.
                childScope = $scope.$new();
                // pass the current element of the collection into that scope
                childScope[index] = collection[key];

                linker(childScope, function(clone){
                  // clone the transcluded element, passing in the new scope.
                  $target.append(clone); // add to DOM
                  block = {};
                  block.el = clone;
                  block.scope = childScope;
                  elements.push(block);
                });
              };

            });
          }
        }
      };
    }]);


  function pagerLink(scope, iElement, iAttrs, controller) {
    var JSPagerId = controller.getJSPagerId(iAttrs.jsPager),
      current = controller.page(JSPagerId);

    scope.pager = {
      currentPage: currentPage,
      numPages: numPages,
      canPage: canPage,
      changePage: changePage,
      pageSize: parseInt(iAttrs.pageSize) || 10
    };

    function currentPage() {
      var pages = numPages();
      if (pages === 0) {
        return 0;
      }
      else if (Number.isInteger(pages) && current > pages) {
        current = pages;
      }
      return current;
    }

    function numPages() {
      return Math.ceil(scope.collectionLength/scope.pager.pageSize);
    }

    function canPage(dir) {
      dir = parseInt(dir);
      var newPage = currentPage() + dir;

      return (1 <= newPage && newPage <= numPages());
    }

    function changePage(dir) {
      if (canPage(dir)) {
        dir = parseInt(dir);
        current += dir;
        controller.page(JSPagerId, current);
      }
    }
  }
})();

// Number.isInteger is not supported by IE11, below Polyfill enables IE 11 support with backward compatibility.
Number.isInteger = Number.isInteger || function(value) {
  return typeof value === "number" && isFinite(value) && Math.floor(value) === value;
};;
(function ($) {

angular.module('angularSlideables', [])
.directive('slideable', function () {
    return {
        restrict:'C',
        compile: function (element, attr) {
            // wrap tag
            var contents = element.html();
            element.html('<div class="slideable_content" style="margin:0 !important; padding:0 !important" >' + contents + '</div>');

            return function postLink(scope, element, attrs) {
                // default properties
                attrs.duration = (!attrs.duration) ? '1s' : attrs.duration;
                attrs.easing = (!attrs.easing) ? 'ease-in-out' : attrs.easing;
                element.css({
                    'overflow': 'hidden',
                    'height': '0px',
                    'transitionProperty': 'height',
                    'transitionDuration': attrs.duration,
                    'transitionTimingFunction': attrs.easing
                });
            };
        }
    };
})
.directive('slideToggle', function() {
    return {
        restrict: 'A',
        link: function(scope, element, attrs) {
            var target, content;
            
            attrs.expanded = false;
            
            element.bind('click', function() {
                if (!target) target = document.querySelector(attrs.slideToggle);
                if (!content) content = target.querySelector('.slideable_content');
                
                if(!attrs.expanded) {
                    content.style.border = '1px solid rgba(0,0,0,0)';
                    var y = content.clientHeight;
                    content.style.border = 0;
                    target.style.height = y + 'px';
                } else {
                    target.style.height = '0px';
                }
                attrs.expanded = !attrs.expanded;
            });
        }
    }
});

})(jQuery);
;
(function() {

angular.module('mediaBrowser.filters', [])
  .filter('mbFilename', function () {
    return function (input, search) {
      if (input && search) {
        var results;
        search = search.toLowerCase();

        if (Array.isArray(input)) {
          results = [];
          for (var i=0; i<input.length; i++) {
            if (input[i].name.toLowerCase().indexOf(search) !== -1) {
              results.push(input[i]);
            }
          }
        }
        else if (typeof input == 'object') {
          results = {};
          for (var key in input) {
            if (input[key].name.toLowerCase().indexOf(search) !== -1) {
              results[key] = input[key];
            }
          }
        }
        else {
          return input;
        }

        return results;
      }
      return input;
    }
  })
  .filter('mbExtensions', function () {
    function testFile(file, extensions) {
      var filename = file.filename,
        ext = filename.slice(filename.lastIndexOf('.')+1);

      return !(file.schema == 'public' || file.schema == 'private') || (extensions.indexOf(ext) !== -1);
    }
    return function (input, extensions) {
      if (!extensions.length) {
        return input;
      }

      if (Array.isArray(input)) {
        results = [];
        for (var i=0;i<input.length;i++) {
          if (testFile(input[i], extensions)) {
            results.push(input[i]);
          }
        }
        return results;
      }
      else if (typeof input == 'object') {
        results = {};
        for (var k in input) {
          if (testFile(input[k], extensions)) {
            results[k] = input[k];
          }
        }
        return results;
      }
      return input;
    }
  })
  .filter('mbType', function () {
    function testFile(file, types) {
      return types.indexOf(file.type) != -1;
    }

    return function (input, types) {
      if (types == undefined || types.length == 0) {
        return input;
      }

      if (Array.isArray(input)) {
        results = [];
        for (var i=0; i<input.length; i++) {
          if (testFile(input[i], types)) {
            results.push(input[i]);
          }
        }
        return results;
      }
      else if (typeof input == 'object') {
        results = {};
        for (var k in input) {
          if (testFile(input[k], types)) {
            results[k] = input[k];
          }
        }
        return results;
      }
      return input;
    }
  });

})();;
(function ($) {
  var rootPath,
    open = angular.noop;

  angular.module('mediaBrowser', ['JSPager', 'EntityService', 'os-auth', 'ngSanitize', 'angularFileUpload', 'angularModalService', 'FileEditor', 'mediaBrowser.filters', 'locationFix', 'angularSlideables'])
    .config(function (){
       rootPath = Drupal.settings.paths.moduleRoot;
    })
    .run(['mbModal', 'FileEditorOpenModal', function (mbModal, feom) {
      // Disable drag and drop behaviors on the window object, to prevent files
      // from.
      angular.element(window).on('dragover drop', function(e) {
        e = e || event;
        e.preventDefault();
      });

      // if the File object is not supported by this browser, fallback to the
      // original media browser.
      if (mbModal.requirementsMet()) {
        Drupal = Drupal || {};
        Drupal.media = Drupal.media || {};
        Drupal.media.popups = Drupal.media.popups || {};
        var oldPopup = Drupal.media.popups.mediaBrowser;
        Drupal.media.popups.mediaBrowserOld = oldPopup;
        Drupal.media.popups.mediaBrowser = function (onSelect, globalOptions, pluginOptions, widgetOptions) {
          var options = Drupal.media.popups.mediaBrowser.getDefaults();
          options.global = $.extend({}, options.global, globalOptions);
          options.plugins = pluginOptions;
          options.widget = $.extend({}, options.widget, widgetOptions);


          // Params to send along to the iframe. WIP.
          var params = {};
          $.extend(params, options.global);
          params.plugins = options.plugins;
          params.onSelect = onSelect;

          mbModal.open(params);
        };

        for (var k in oldPopup) {
          if (!Drupal.media.popups.mediaBrowser[k]) {
            Drupal.media.popups.mediaBrowser[k] = oldPopup[k];
          }
        }

        var oldStyleSelector = Drupal.media.popups.mediaStyleSelector;
        Drupal.media.popups.mediaStyleSelector = function (file, onSelect, options) {
          if (file.type == 'media') {
            feom.open(file.fid, function () {
              onSelect();
            });
          }
          else {
            oldStyleSelector(file, onSelect, options);
          }
        };

        for (var k in oldStyleSelector) {
          Drupal.media.popups.mediaStyleSelector[k] = oldStyleSelector[k];
        }
      }
    }])
  .controller('BrowserCtrl', ['$scope', '$filter', '$http', 'EntityService', 'EntityConfig', '$sce', '$q', '$upload', '$timeout', 'FILEEDITOR_RESPONSES', 'params', 'close', '$location',
      function ($scope, $filter, $http, EntityService, config, $sce, $q, $upload, $timeout, FER, params, close, $location) {

    // Initialization
    var service = new EntityService('files', 'id'),
      toEditForm = false,
      directInsert = true;
    $scope.files = [];
    $scope.numFiles = 0;
    $scope.templatePath = rootPath;
    $scope.selection = 0;
    $scope.form = '';
    $scope.pane = 'upload';
    $scope.toBeUploaded = [];
    $scope.dupes = [];
    $scope.showButtons = false;
    $scope.params = params.browser;
    $scope.editing = false;
    $scope.deleting = false;
    $scope.activePanes = params.browser.panes;
    $scope.activePanes.edit = true;
    $scope.activePanes.delete = true;
    $scope.loading = true;
    $scope.loadingMessage = '';
    $scope.sortType = 'timestamp';
    $scope.sortReverse = true;
    $scope.button_text = params.replace ? 'Select Replacement File' : 'Select files to Add';

    $scope.toInsert = [];

    var allTypes = [
      {label: 'Image', value: 'image'},
      {label: 'Document', value: 'document'},
      {label: 'Video', value: 'video'},
      {label: 'HTML', value: 'html'},
      {label: 'Executable', value: 'executable'},
      {label: 'Audio', value: 'audio'},
      {label: 'Icon', value: 'icon'}
    ];

    var defaultFilteredTypes = params.types;
    $scope.availTypes = [];
    $scope.availFilter = [];
    for (var j in defaultFilteredTypes) {
      for (var k=0; k<allTypes.length; k++) {
        if (defaultFilteredTypes[j] == allTypes[k].value) {
          $scope.availTypes.push(allTypes[k]);
          $scope.availFilter.push(allTypes[k].value);
        }
      }
    }

    $scope.extensions = [];
    if (params.file_extensions) {
      $scope.extensions = params.file_extensions.split(' ');
    }
    if (!params.override_extensions) {
      var types = params.types;
      for (var t in types) {
        var ext = Drupal.settings.extensionMap[types[t]],
          i = 0, l = ext ? ext.length : false;

        if (!ext) {
          $scope.extensions.push(types[t]);
        } else {
          for (var i=0; i<l; i++) {
            if ($scope.extensions.indexOf(ext[i]) === -1) {
              $scope.extensions.push(ext[i]);
            }
          }
        }
      }
    }
    $scope.extensions.sort();
    $scope.whitelist = Drupal.settings.embedWhitelist;

    if (params.max_filesize) {
      $scope.maxFilesize = params.max_filesize;
    }
    else {
      $scope.maxFilesize = Drupal.settings.maximumFileSize;
    }

    $scope.filteredTypes = [];
    $scope.isFiltered = function () {
      return $scope.filteredTypes.length || $scope.search;
    }

    $scope.clearFilters = function () {
      $scope.filteredTypes = defaultFilteredTypes;
      $scope.search = '';
    }

    $scope.showHelp = false;

    if (close) {
      $scope.showButtons = true;
    }

    $scope.messages = {
      next: 0
    };

    // Watch for changes in file list
    $scope.$on('EntityService.files.add', function (event, file) {
      if (file.changed == file.timestamp) {
        $scope.files.push(file);
      }
    });

    $scope.$on('EntityService.files.update', function (event, file) {
      var t = $scope.selected_file;
      for (var i=0; i < $scope.files.length; i++) {
        if ($scope.files[i].id == file.id) {
          if ($scope.files[i].replaced) {
            file.replaced = $scope.files[i].replaced;
          }
          if ($scope.files[i].new) {
            file.new = $scope.files[i].new;
          }
          $scope.files[i] = file;
          break;
        }
      }

      for (i=0; i<$scope.toInsert.length; i++) {
        if ($scope.toInsert[i].id == file.id) {
          $scope.toInsert[i] = file;
        }
      }

      if ($scope.selected_file.id == file.id) {
        $scope.selected_file = angular.copy(file);
      }
    });

    $scope.$on('EntityService.files.delete', function (event, id) {
      // Don't want to worry about what happens when you modify an array you're
      // looping over.
      if ($scope.selected_file.id == id) {
        $scope.selected_file = null;
      }
      var deleteMe = false;
      for (var i=0; i<$scope.files.length; i++) {
        if ($scope.files[i].id == id) {
          deleteMe = i;
          break;
        }
      }

      if (deleteMe !== false) {
        $scope.files.splice(deleteMe, 1);
      }
    })

    var fetching = service.fetch({})
      .then(function (result) {
        console.log(result);

        $scope.files = result;
        $scope.numFiles = $scope.files.length;
        $scope.loading = false;
      }, function (error) {
        // there was an error getting results. We should tell the user and
        // advise them.
      }, function (message) {
        // notification received.
        $scope.loadingMessage = message;
      });


    $scope.changePanes = function (pane, result) {
      if ($scope.activePanes[pane]) {
        $scope.pane = pane;
        return true;
      }
      else {
        close(result != undefined ? result : true);
      }
    }

    $scope.validate = function($file) {
      // Deleting previous error messages
      $scope.removeMsg();
      var file = $file;
      if (file && file instanceof File) {
        // TODO: Get validating properties from somewhere and check the file against them

        var maxFilesize = params.max_filesize_raw || Drupal.settings.maximumFileSizeRaw;
        var size = maxFilesize > file.size,   // file is smaller than max
          ext = file.name.slice(file.name.lastIndexOf('.')+1).toLowerCase(),
          extension = $scope.extensions.indexOf(ext) !== -1,    // extension is found
          id;

        if (!size) {
          addMessage(file.name + ' is larger than the maximum filesize of ' + (params.max_filesize || Drupal.settings.maximumFileSize));
        }
        if (!extension) {
          addMessage(file.name + ' is not an accepted file type.');
        }
        // if file is image and params specify max dimensions
        if (file.type.indexOf('image/') !== -1) {
        }

        return size && extension;
      }
    }

    $scope.removeMsg = function() {
      angular.forEach($scope.messages, function(value, id){
        if (!isNaN(id)) {
          delete $scope.messages[id];
        }
      });
    }

    function addMessage(message) {
      var id = $scope.messages.next++;
      $scope.messages[id] = {
        text: message
      };
      //$timeout(angular.bind($scope, removeMessage, id), 5000);
    }

    function removeMessage(id) {
      delete this.messages[id];
    }


    // filter out weird characters that look like normal characters, like –, which gets converted to â€“
    function cleanPaths(text) {
      var s = text;
      // smart single quotes and apostrophe
      s = s.replace(/[\u2018\u2019\u201A]/g, "\'");
      // smart double quotes
      s = s.replace(/[\u201C\u201D\u201E]/g, "\"");
      // ellipsis
      s = s.replace(/\u2026/g, "...");
      // dashes
      s = s.replace(/[\u2013\u2014]/g, "-");
      // circumflex
      s = s.replace(/\u02C6/g, "^");
      // open angle bracket
      s = s.replace(/\u2039/g, "<");
      // close angle bracket
      s = s.replace(/\u203A/g, ">");
      // spaces
      s = s.replace(/[\u02DC\u00A0]/g, " ");

      return s;
    }

    // looks for any files with a similar basename and extension to this file
    // if it finds any, it adds it to a list of dupes, then scans every file to find what the new name should be
    $scope.checkForDupes = function($files, $event, $rejected) {
      if ($files.length == 1) {
        toEditForm = true;
      }
      var toBeUploaded = [];
      $scope.dupes = [];
      $scope.toInsert = [];
      var promises = [];
      $scope.checkingFilenames = true;
      for (var i = 0; i < $files.length; i++) {
        if (params.replace) {
          if (params.replace.filename == $files[i].name) {
            // the fact that replace is set means we're trying to Replace a certain file
            // If the file in question has the same name as the new one, just skip all the duplicate
            // processing and upload it immediately.
            $files[i].replacing = params.replace;
            toEditForm = false;
            directInsert = true;
            $scope.upload([$files[i]]);
            continue;
          }
        }

        // replace # in filenames cause they will break filename detection
        var newName = $files[i].name.replace(/[#|\?]/g, '_').replace(/__/g, '_').replace(/_\./g, '.');
        var hadHashtag = newName != $files[i].name;
        $files[i].sanitized = newName;

        var url = Drupal.settings.paths.api + '/files/filename/' + $files[i].sanitized;

        if (Drupal.settings.spaces) {
          url += '?vsite=' + Drupal.settings.spaces.id;
        }
        var config = {
          originalFile: $files[i]
        };
        promises.push($http.get(url, config).then(function (response) {
            var file = response.config.originalFile;
            var data = response.data.data;
            file.filename = file.sanitized;
            if (data.collision) {
              file.newName = data.expectedFileName;
              $scope.dupes.push(file);
            }
            else {
              if (data.invalidChars || hadHashtag) {
                addMessage("This file was renamed from \"" + file.name + "\" due to having invalid characters in its name. The new file will replace any file with the same name.");
              }
              toBeUploaded.push(file);
            }
          },
          function (errorResponse) {
            console.log(errorResponse);
          }));
      }

      var promise = $q.all(promises).then(function () {
          $scope.checkingFilenames = false;
          $scope.upload(toBeUploaded);
        },
        function () {
          $scope.checkingFilenames = false;
          console.log('Error happened with all promises');
        })
    }

/*
        var similar = [],
            basename = $files[i].name.replace(/\.[a-zA-Z0-9]*$/, ''),   // remove extension from filename
            extension = $files[i].name.replace(basename, ''),           // remove filename from filename to get extension
            dupeFound = false;

        // rewrite the filename the same way PHP will
        basename = cleanPaths(basename);
        basename = basename.toLowerCase().replace(/ /g, '_').replace(/[^a-zA-Z0-9-_.~]/g, '');
        $files[i].filename = basename + extension;

        for (var j=0; j<$scope.files.length; j++) {
          // find any file with a name that matches "basename{_dd}.ext" and add it to list of similar files
          if ($scope.files[j].filename.indexOf(basename) !== -1 && $scope.files[j].filename.indexOf(extension) !== -1) {
            similar.push($scope.files[j]);
            // also check if there is a file with the full filename and save this fact for later
            // this allows file.jpg to be uploaded when file_01.jpg already exists
            if ($scope.files[j].filename == $files[i].filename) {
              dupeFound = true;
            }
          }
        }

        if (dupeFound) {
          // only one similar file found, drop _01 at the end
          if (similar.length == 1) {
            $files[i].newName = basename + '_01' + extension;
          }
          else {
            // lots of them found, look through all of them, find the highest number at the end, and add it
            // to the end of the original file name
            var max = 0;
            for (j=0; j<similar.length; j++) {
              var rem = similar[j].filename.replace(basename, '').replace(extension, '').replace('_', ''),
                num = rem ? parseInt(rem) : 0;

              if (num > max) {
                max = num;
              };
            }
            var num = max + 1;
            // convert num to a 2 digit string
            num = num < 10 ? '0'+num : num
            // and make the new file name
            $files[i].newName = basename+'_'+num+extension;
          }
          // with the new name complete, we can push this onto the list of dupes
          $scope.dupes.push($files[i]);
        }
        else {
          if ($files[i].filename != $files[i].name) {
            addMessage("This file was renamed from \"" + $files[i].name + "\" due to having invalid characters in its name.")
          }
          // not a dupe, just upload it silently
          toBeUploaded.push($files[i]);
        }
      }

      $scope.upload(toBeUploaded);
    }*/

    // renames the file before uploading
    $scope.rename = function ($index, $last) {
      $scope.dupes[$index].processed = true;

      if ($last) {
        finalizeDupes();
      }
    }

    // tells the server to replace the old file on disk with this new one
    // (just performs a swap on the hard drive)
    $scope.replace = function ($index, $last) {
      $scope.dupes[$index].processed = true;
      delete $scope.dupes[$index].newName;

      if ($last) {
        finalizeDupes();
      }
    }

    // cancels the upload process for this file
    $scope.cancelUpload = function ($index, $last) {
      $scope.dupes[$index].doNotUpload = true;
      $scope.dupes[$index].processed = true;

      if ($last) {
        finalizeDupes();
      }
    }

    function finalizeDupes() {
      var toBeUploaded = [];
      for (var i in $scope.dupes) {
        if (!$scope.dupes[i].doNotUpload) {
          toBeUploaded.push($scope.dupes[i]);
        }
      }

      $scope.upload(toBeUploaded);
      $scope.dupes = [];
    }

    (function () {
      var toBeUploaded = [],
        uploading = false,
        progress = null,
        currentlyUploading = 0;

      $scope.upload = function ($files) {
        for (var i=0; i<$files.length; i++) {
          toBeUploaded.push($files[i]);
        }

        if (!uploading && toBeUploaded.length) {
          uploading = true;
          $file = toBeUploaded[currentlyUploading];
          uploadOne($file);
        }
      }

      function uploadNext(firstId) {
        currentlyUploading++;
        if (currentlyUploading < toBeUploaded.length) {
          $file = toBeUploaded[currentlyUploading];
          uploadOne($file);
        }
        else {
          toBeUploaded = [];
          uploading = false;
          progress = null;
          currentlyUploading = 0;
          if ($scope.dupes.length == 0) {
            if (toEditForm && firstId) {
              // there's only one file, we can assume it's this one
              $scope.setSelection(firstId);
              $scope.changePanes('edit');
            }
            //else if (typeof $scope.messages[$scope.messages.next-1] != 'undefined') {
            //  // do nothing. This usually means there was an error during upload.
            //}
            else {
              if (directInsert) {
                $scope.insert();
              }
              else {
                $scope.changePanes('library');
              }
            }
          }
        }
      }

      function uploadOne($file) {
        var fields = {};
        if (Drupal.settings.spaces) {
          fields.vsite = Drupal.settings.spaces.id;
        }
        if (config.files) {
          for (var k in config.files.fields) {
            fields[k] = config.files.fields[k];
          }
        }
        $upload.upload({
          url: Drupal.settings.paths.api+'/files',
          file: $file,
          data: $file,
          fileFormDataName: 'files[upload]',
          headers: {'Content-Type': $file.type},
          method: 'POST',
          fields: fields,
          fileName: $file.newName || null
        }).progress(function (e) {
          progress = e;
        }).success(function (e) {
          for (var i = 0; i< e.data.length; i++) {
            service.register(e.data[i]);
            var found = false;
            // check to see if this file exists
            for (var j = 0; j < $scope.files.length; j++) {
              if ($scope.files[j].id == e.data[i].id) {
                // we just replaced an existing file.
                e.data[i].replaced = true;
                $scope.files[j] = e.data[i];
                found = true;
              }
            }
            if (!found) {
              // This is a brand-new file. Set the true flag and add it to the list.
              e.data[i].new = true;
              $scope.files.push(e.data[i]);
            }
            $scope.toInsert.push(e.data[i]);
          }
          uploadNext(e.data[0].id);
        }).error(function (e) {
          addMessage(e.title);
          uploadNext();
        });
      }

      $scope.uploadProgress = function () {
        return {
          uploading: uploading,
          filename: uploading ? toBeUploaded[currentlyUploading].filename : '',
          progressBar: (uploading && progress) ? parseInt(100.0 * progress.loaded / progress.total) : 0,
          index: currentlyUploading+1,
          numFiles: toBeUploaded.length
        }
      }
    })();

    function getKeyForFile(fid) {
      for (var i=0; i<$scope.files.length; i++) {
        if ($scope.files[i].id == fid) {
          return i;
        }
      }
      return FALSE;
    }

    // selected file
    $scope.setSelection = function (fid) {
      var key = getKeyForFile(fid);
      if (key !== false) {
        $scope.selection = fid;
        $scope.selected_file = $scope.files[key];
      }
    };

    $scope.deleteConfirmed = function() {
      service.delete($scope.selected_file)
        .then(function (resp) {
        });
      for (var j = 0; j < $scope.files.length; j++) {
        if ($scope.files[j].id == $scope.selected_file.id) {
          $scope.files[j].status = 'deleting';
        }
      }
      $scope.changePanes('library');
    };


    $scope.embed = '';
    $scope.embedSubmit = function () {
      // construct the entity
      var data = {
        embed: this.embed,
      }

      service.add(data).success(function (e) {
        if (e.data.length) {
          $scope.embed = '';
          e.data[0].new = e.data[0].changed == e.data[0].timestamp;
          $scope.setSelection(e.data[0].id);
          service.register(e.data[0]);

          $scope.changePanes('edit')
        }
      })
      .error(function (e) {
        if ($location.protocol() == 'https') {
          $scope.embedFailureHttps = true;
          $timeout(function () {
            $scope.embedFailureHttps = false;
          }, 5000);
        } else {
          $scope.embedFailure = true;
          $timeout(function () {
            $scope.embedFailure = false;
          }, 5000);
        }
      });
    }

    $scope.closeFileEdit = function (result) {
      if (result == FER.CANCELED && $scope.selected_file.new) {
        service.delete($scope.selected_file);
        for (var j = 0; j < $scope.files.length; j++) {
          if ($scope.files[j].id == $scope.selected_file.id) {
            $scope.files[j].status = 'deleting';
          }
        }
        $scope.selected_file = null;
      }
      else if ((result == FER.NO_CHANGES || result == FER.SAVED) && ($scope.selected_file.new || $scope.selected_file.replaced)) {
        if (directInsert) {
          $scope.insert();
        }
        else {
          $scope.changePanes('library', result);
        }
        return;
      }
      $scope.changePanes('library', result);
    }

    $scope.insert = function () {
      var results = [];
      if ($scope.toInsert.length) {
        for (var i = 0; i < $scope.toInsert.length; i++) {
          $scope.toInsert[i].fid = $scope.toInsert[i].id;
          results.push($scope.toInsert[i]);
        }
      }
      else {
        $scope.selected_file.fid = $scope.selected_file.id; // hack to prevent rewriting a lot of Media's code.
        results.push($scope.selected_file);
      }

      close(results);
    }

    $scope.cancel = function () {
      close([]);
    }

    // when a set of files are passed to the Media Browser, they were handled by some other service and then passed
    // to the Media Browser to handle
    if (params.files) {
      fetching.then(function () {
        var accepted = [], rejected = [];
        for (var i=0; i<params.files.length; i++) {
          if ($scope.validate(params.files[i])) {
            accepted.push(params.files[i]);
          }
          else {
            rejected.push(params.files[i]);
          }
        }
        $scope.checkForDupes(accepted, {}, rejected);
      });
    }
  }])
  .directive('mbOpenModal', ['$parse', 'mbModal', function($parse, mbModal) {

    function link(scope, elem, attr, contr) {
      elem.bind('click', function (event) {
        event.preventDefault();
        event.stopPropagation();
        // get stuff from the element we clicked on and Drupal.settings
        var elem = event.currentTarget,
          params = mbModal.defaultParams(),
          panes = elem.attributes['panes'].value,
          types = elem.attributes['types'].value.split(',');

        if (attr['replace']) {
          var prop = attr['replace'];
          params.replace = scope[prop];
        }

        for (var i in params.browser.panes) {
          params.browser.panes[i] = (panes.indexOf(i) !== -1);
        }

        params.types = {}
        for (i=0; i<types.length;i++) {
          params.types[types[i]] = types[i];
        }

        params.onSelect = function (inserted) {
          if (elem.attributes['on-select'].value) {
            $parse(elem.attributes['on-select'].value)(scope, {
              $inserted: inserted
            });
          }
          else {
            window.location.reload();
          }
        }

        mbModal.open(params);
      });
    }

    return {
      template: '<ng-transclude></ng-transclude>',
      link: link,
      transclude: true
    }
  }])
  .service('mbModal', ['ModalService', function (ModalService) {
      this.defaultParams = function () {
        var params = {
          dialog: {
            buttons: {},
            dialogClass: 'media-wrapper',
            modal: true,
            draggable: false,
            resizable: false,
            minWidth: 600,
            width: 800,
            height: 650,
            position: 'center',
            title: undefined,
            overlay: {
              backgroundColor: '#000000',
              opacity: 0.4
            },
            zIndex: 10000,
            close: function (event, ui) {
              $(event.target).remove();
            }
          },
          browser: {
            panes: {
              web: true,
              upload: true,
              library: true
            }
          },
          onSelect: angular.noop,
          types: {
            image: 'image',
            video: 'video',
            audio: 'audio',
            executable: 'executable',
            document: 'document',
            html: 'html'
          },
          replace: false
        };

        return params;
      }

      this.requirementsMet = function() {
        return (window.File && window.FormData);
      }

      this.open = function (params) {
        var defaults = this.defaultParams(),
          nparams = {
            dialog: angular.extend([], defaults.dialog, params.dialog),
            browser: angular.extend({}, defaults.browser, params.browser),
            onSelect: params.onSelect || defaults.onSelect,
            types: params.types || defaults.types,
            max_filesize: params.max_filesize || null,
            max_filesize_raw: params.max_filesize_raw || null,
            replace: params.replace || defaults.replace
        };

        if (params.files) {
          nparams.files = params.files;
        }

        ModalService.showModal({
          templateUrl: rootPath+'/templates/browser.html?vers='+Drupal.settings.version.mediaBrowser,
          controller: 'BrowserCtrl',
          inputs: {
            params: nparams
          }
        }).then(function (modal) {
          modal.element.dialog(nparams.dialog);
          modal.close.then(function (result) {
            // run the function passed to us
            if (Array.isArray(result)) {
              if (result.length) {
                nparams.onSelect(result);
              }
            }
            else if (result) {
              nparams.onSelect(result);
            }
          });
        });
      }
  }]);
})(jQuery);
;
/*! jQuery UI - v1.10.2 - 2013-03-14
* http://jqueryui.com
* Copyright 2013 jQuery Foundation and other contributors; Licensed MIT */
(function(t){function e(t,e,i){return t>e&&e+i>t}function i(t){return/left|right/.test(t.css("float"))||/inline|table-cell/.test(t.css("display"))}t.widget("ui.sortable",t.ui.mouse,{version:"1.10.2",widgetEventPrefix:"sort",ready:!1,options:{appendTo:"parent",axis:!1,connectWith:!1,containment:!1,cursor:"auto",cursorAt:!1,dropOnEmpty:!0,forcePlaceholderSize:!1,forceHelperSize:!1,grid:!1,handle:!1,helper:"original",items:"> *",opacity:!1,placeholder:!1,revert:!1,scroll:!0,scrollSensitivity:20,scrollSpeed:20,scope:"default",tolerance:"intersect",zIndex:1e3,activate:null,beforeStop:null,change:null,deactivate:null,out:null,over:null,receive:null,remove:null,sort:null,start:null,stop:null,update:null},_create:function(){var t=this.options;this.containerCache={},this.element.addClass("ui-sortable"),this.refresh(),this.floating=this.items.length?"x"===t.axis||i(this.items[0].item):!1,this.offset=this.element.offset(),this._mouseInit(),this.ready=!0},_destroy:function(){this.element.removeClass("ui-sortable ui-sortable-disabled"),this._mouseDestroy();for(var t=this.items.length-1;t>=0;t--)this.items[t].item.removeData(this.widgetName+"-item");return this},_setOption:function(e,i){"disabled"===e?(this.options[e]=i,this.widget().toggleClass("ui-sortable-disabled",!!i)):t.Widget.prototype._setOption.apply(this,arguments)},_mouseCapture:function(e,i){var s=null,n=!1,a=this;return this.reverting?!1:this.options.disabled||"static"===this.options.type?!1:(this._refreshItems(e),t(e.target).parents().each(function(){return t.data(this,a.widgetName+"-item")===a?(s=t(this),!1):undefined}),t.data(e.target,a.widgetName+"-item")===a&&(s=t(e.target)),s?!this.options.handle||i||(t(this.options.handle,s).find("*").addBack().each(function(){this===e.target&&(n=!0)}),n)?(this.currentItem=s,this._removeCurrentsFromItems(),!0):!1:!1)},_mouseStart:function(e,i,s){var n,a,o=this.options;if(this.currentContainer=this,this.refreshPositions(),this.helper=this._createHelper(e),this._cacheHelperProportions(),this._cacheMargins(),this.scrollParent=this.helper.scrollParent(),this.offset=this.currentItem.offset(),this.offset={top:this.offset.top-this.margins.top,left:this.offset.left-this.margins.left},t.extend(this.offset,{click:{left:e.pageX-this.offset.left,top:e.pageY-this.offset.top},parent:this._getParentOffset(),relative:this._getRelativeOffset()}),this.helper.css("position","absolute"),this.cssPosition=this.helper.css("position"),this.originalPosition=this._generatePosition(e),this.originalPageX=e.pageX,this.originalPageY=e.pageY,o.cursorAt&&this._adjustOffsetFromHelper(o.cursorAt),this.domPosition={prev:this.currentItem.prev()[0],parent:this.currentItem.parent()[0]},this.helper[0]!==this.currentItem[0]&&this.currentItem.hide(),this._createPlaceholder(),o.containment&&this._setContainment(),o.cursor&&"auto"!==o.cursor&&(a=this.document.find("body"),this.storedCursor=a.css("cursor"),a.css("cursor",o.cursor),this.storedStylesheet=t("<style>*{ cursor: "+o.cursor+" !important; }</style>").appendTo(a)),o.opacity&&(this.helper.css("opacity")&&(this._storedOpacity=this.helper.css("opacity")),this.helper.css("opacity",o.opacity)),o.zIndex&&(this.helper.css("zIndex")&&(this._storedZIndex=this.helper.css("zIndex")),this.helper.css("zIndex",o.zIndex)),this.scrollParent[0]!==document&&"HTML"!==this.scrollParent[0].tagName&&(this.overflowOffset=this.scrollParent.offset()),this._trigger("start",e,this._uiHash()),this._preserveHelperProportions||this._cacheHelperProportions(),!s)for(n=this.containers.length-1;n>=0;n--)this.containers[n]._trigger("activate",e,this._uiHash(this));return t.ui.ddmanager&&(t.ui.ddmanager.current=this),t.ui.ddmanager&&!o.dropBehaviour&&t.ui.ddmanager.prepareOffsets(this,e),this.dragging=!0,this.helper.addClass("ui-sortable-helper"),this._mouseDrag(e),!0},_mouseDrag:function(e){var i,s,n,a,o=this.options,r=!1;for(this.position=this._generatePosition(e),this.positionAbs=this._convertPositionTo("absolute"),this.lastPositionAbs||(this.lastPositionAbs=this.positionAbs),this.options.scroll&&(this.scrollParent[0]!==document&&"HTML"!==this.scrollParent[0].tagName?(this.overflowOffset.top+this.scrollParent[0].offsetHeight-e.pageY<o.scrollSensitivity?this.scrollParent[0].scrollTop=r=this.scrollParent[0].scrollTop+o.scrollSpeed:e.pageY-this.overflowOffset.top<o.scrollSensitivity&&(this.scrollParent[0].scrollTop=r=this.scrollParent[0].scrollTop-o.scrollSpeed),this.overflowOffset.left+this.scrollParent[0].offsetWidth-e.pageX<o.scrollSensitivity?this.scrollParent[0].scrollLeft=r=this.scrollParent[0].scrollLeft+o.scrollSpeed:e.pageX-this.overflowOffset.left<o.scrollSensitivity&&(this.scrollParent[0].scrollLeft=r=this.scrollParent[0].scrollLeft-o.scrollSpeed)):(e.pageY-t(document).scrollTop()<o.scrollSensitivity?r=t(document).scrollTop(t(document).scrollTop()-o.scrollSpeed):t(window).height()-(e.pageY-t(document).scrollTop())<o.scrollSensitivity&&(r=t(document).scrollTop(t(document).scrollTop()+o.scrollSpeed)),e.pageX-t(document).scrollLeft()<o.scrollSensitivity?r=t(document).scrollLeft(t(document).scrollLeft()-o.scrollSpeed):t(window).width()-(e.pageX-t(document).scrollLeft())<o.scrollSensitivity&&(r=t(document).scrollLeft(t(document).scrollLeft()+o.scrollSpeed))),r!==!1&&t.ui.ddmanager&&!o.dropBehaviour&&t.ui.ddmanager.prepareOffsets(this,e)),this.positionAbs=this._convertPositionTo("absolute"),this.options.axis&&"y"===this.options.axis||(this.helper[0].style.left=this.position.left+"px"),this.options.axis&&"x"===this.options.axis||(this.helper[0].style.top=this.position.top+"px"),i=this.items.length-1;i>=0;i--)if(s=this.items[i],n=s.item[0],a=this._intersectsWithPointer(s),a&&s.instance===this.currentContainer&&n!==this.currentItem[0]&&this.placeholder[1===a?"next":"prev"]()[0]!==n&&!t.contains(this.placeholder[0],n)&&("semi-dynamic"===this.options.type?!t.contains(this.element[0],n):!0)){if(this.direction=1===a?"down":"up","pointer"!==this.options.tolerance&&!this._intersectsWithSides(s))break;this._rearrange(e,s),this._trigger("change",e,this._uiHash());break}return this._contactContainers(e),t.ui.ddmanager&&t.ui.ddmanager.drag(this,e),this._trigger("sort",e,this._uiHash()),this.lastPositionAbs=this.positionAbs,!1},_mouseStop:function(e,i){if(e){if(t.ui.ddmanager&&!this.options.dropBehaviour&&t.ui.ddmanager.drop(this,e),this.options.revert){var s=this,n=this.placeholder.offset(),a=this.options.axis,o={};a&&"x"!==a||(o.left=n.left-this.offset.parent.left-this.margins.left+(this.offsetParent[0]===document.body?0:this.offsetParent[0].scrollLeft)),a&&"y"!==a||(o.top=n.top-this.offset.parent.top-this.margins.top+(this.offsetParent[0]===document.body?0:this.offsetParent[0].scrollTop)),this.reverting=!0,t(this.helper).animate(o,parseInt(this.options.revert,10)||500,function(){s._clear(e)})}else this._clear(e,i);return!1}},cancel:function(){if(this.dragging){this._mouseUp({target:null}),"original"===this.options.helper?this.currentItem.css(this._storedCSS).removeClass("ui-sortable-helper"):this.currentItem.show();for(var e=this.containers.length-1;e>=0;e--)this.containers[e]._trigger("deactivate",null,this._uiHash(this)),this.containers[e].containerCache.over&&(this.containers[e]._trigger("out",null,this._uiHash(this)),this.containers[e].containerCache.over=0)}return this.placeholder&&(this.placeholder[0].parentNode&&this.placeholder[0].parentNode.removeChild(this.placeholder[0]),"original"!==this.options.helper&&this.helper&&this.helper[0].parentNode&&this.helper.remove(),t.extend(this,{helper:null,dragging:!1,reverting:!1,_noFinalSort:null}),this.domPosition.prev?t(this.domPosition.prev).after(this.currentItem):t(this.domPosition.parent).prepend(this.currentItem)),this},serialize:function(e){var i=this._getItemsAsjQuery(e&&e.connected),s=[];return e=e||{},t(i).each(function(){var i=(t(e.item||this).attr(e.attribute||"id")||"").match(e.expression||/(.+)[\-=_](.+)/);i&&s.push((e.key||i[1]+"[]")+"="+(e.key&&e.expression?i[1]:i[2]))}),!s.length&&e.key&&s.push(e.key+"="),s.join("&")},toArray:function(e){var i=this._getItemsAsjQuery(e&&e.connected),s=[];return e=e||{},i.each(function(){s.push(t(e.item||this).attr(e.attribute||"id")||"")}),s},_intersectsWith:function(t){var e=this.positionAbs.left,i=e+this.helperProportions.width,s=this.positionAbs.top,n=s+this.helperProportions.height,a=t.left,o=a+t.width,r=t.top,h=r+t.height,l=this.offset.click.top,c=this.offset.click.left,u=s+l>r&&h>s+l&&e+c>a&&o>e+c;return"pointer"===this.options.tolerance||this.options.forcePointerForContainers||"pointer"!==this.options.tolerance&&this.helperProportions[this.floating?"width":"height"]>t[this.floating?"width":"height"]?u:e+this.helperProportions.width/2>a&&o>i-this.helperProportions.width/2&&s+this.helperProportions.height/2>r&&h>n-this.helperProportions.height/2},_intersectsWithPointer:function(t){var i="x"===this.options.axis||e(this.positionAbs.top+this.offset.click.top,t.top,t.height),s="y"===this.options.axis||e(this.positionAbs.left+this.offset.click.left,t.left,t.width),n=i&&s,a=this._getDragVerticalDirection(),o=this._getDragHorizontalDirection();return n?this.floating?o&&"right"===o||"down"===a?2:1:a&&("down"===a?2:1):!1},_intersectsWithSides:function(t){var i=e(this.positionAbs.top+this.offset.click.top,t.top+t.height/2,t.height),s=e(this.positionAbs.left+this.offset.click.left,t.left+t.width/2,t.width),n=this._getDragVerticalDirection(),a=this._getDragHorizontalDirection();return this.floating&&a?"right"===a&&s||"left"===a&&!s:n&&("down"===n&&i||"up"===n&&!i)},_getDragVerticalDirection:function(){var t=this.positionAbs.top-this.lastPositionAbs.top;return 0!==t&&(t>0?"down":"up")},_getDragHorizontalDirection:function(){var t=this.positionAbs.left-this.lastPositionAbs.left;return 0!==t&&(t>0?"right":"left")},refresh:function(t){return this._refreshItems(t),this.refreshPositions(),this},_connectWith:function(){var t=this.options;return t.connectWith.constructor===String?[t.connectWith]:t.connectWith},_getItemsAsjQuery:function(e){var i,s,n,a,o=[],r=[],h=this._connectWith();if(h&&e)for(i=h.length-1;i>=0;i--)for(n=t(h[i]),s=n.length-1;s>=0;s--)a=t.data(n[s],this.widgetFullName),a&&a!==this&&!a.options.disabled&&r.push([t.isFunction(a.options.items)?a.options.items.call(a.element):t(a.options.items,a.element).not(".ui-sortable-helper").not(".ui-sortable-placeholder"),a]);for(r.push([t.isFunction(this.options.items)?this.options.items.call(this.element,null,{options:this.options,item:this.currentItem}):t(this.options.items,this.element).not(".ui-sortable-helper").not(".ui-sortable-placeholder"),this]),i=r.length-1;i>=0;i--)r[i][0].each(function(){o.push(this)});return t(o)},_removeCurrentsFromItems:function(){var e=this.currentItem.find(":data("+this.widgetName+"-item)");this.items=t.grep(this.items,function(t){for(var i=0;e.length>i;i++)if(e[i]===t.item[0])return!1;return!0})},_refreshItems:function(e){this.items=[],this.containers=[this];var i,s,n,a,o,r,h,l,c=this.items,u=[[t.isFunction(this.options.items)?this.options.items.call(this.element[0],e,{item:this.currentItem}):t(this.options.items,this.element),this]],d=this._connectWith();if(d&&this.ready)for(i=d.length-1;i>=0;i--)for(n=t(d[i]),s=n.length-1;s>=0;s--)a=t.data(n[s],this.widgetFullName),a&&a!==this&&!a.options.disabled&&(u.push([t.isFunction(a.options.items)?a.options.items.call(a.element[0],e,{item:this.currentItem}):t(a.options.items,a.element),a]),this.containers.push(a));for(i=u.length-1;i>=0;i--)for(o=u[i][1],r=u[i][0],s=0,l=r.length;l>s;s++)h=t(r[s]),h.data(this.widgetName+"-item",o),c.push({item:h,instance:o,width:0,height:0,left:0,top:0})},refreshPositions:function(e){this.offsetParent&&this.helper&&(this.offset.parent=this._getParentOffset());var i,s,n,a;for(i=this.items.length-1;i>=0;i--)s=this.items[i],s.instance!==this.currentContainer&&this.currentContainer&&s.item[0]!==this.currentItem[0]||(n=this.options.toleranceElement?t(this.options.toleranceElement,s.item):s.item,e||(s.width=n.outerWidth(),s.height=n.outerHeight()),a=n.offset(),s.left=a.left,s.top=a.top);if(this.options.custom&&this.options.custom.refreshContainers)this.options.custom.refreshContainers.call(this);else for(i=this.containers.length-1;i>=0;i--)a=this.containers[i].element.offset(),this.containers[i].containerCache.left=a.left,this.containers[i].containerCache.top=a.top,this.containers[i].containerCache.width=this.containers[i].element.outerWidth(),this.containers[i].containerCache.height=this.containers[i].element.outerHeight();return this},_createPlaceholder:function(e){e=e||this;var i,s=e.options;s.placeholder&&s.placeholder.constructor!==String||(i=s.placeholder,s.placeholder={element:function(){var s=e.currentItem[0].nodeName.toLowerCase(),n=t(e.document[0].createElement(s)).addClass(i||e.currentItem[0].className+" ui-sortable-placeholder").removeClass("ui-sortable-helper");return"tr"===s?n.append("<td colspan='99'>&#160;</td>"):"img"===s&&n.attr("src",e.currentItem.attr("src")),i||n.css("visibility","hidden"),n},update:function(t,n){(!i||s.forcePlaceholderSize)&&(n.height()||n.height(e.currentItem.innerHeight()-parseInt(e.currentItem.css("paddingTop")||0,10)-parseInt(e.currentItem.css("paddingBottom")||0,10)),n.width()||n.width(e.currentItem.innerWidth()-parseInt(e.currentItem.css("paddingLeft")||0,10)-parseInt(e.currentItem.css("paddingRight")||0,10)))}}),e.placeholder=t(s.placeholder.element.call(e.element,e.currentItem)),e.currentItem.after(e.placeholder),s.placeholder.update(e,e.placeholder)},_contactContainers:function(s){var n,a,o,r,h,l,c,u,d,p,f=null,m=null;for(n=this.containers.length-1;n>=0;n--)if(!t.contains(this.currentItem[0],this.containers[n].element[0]))if(this._intersectsWith(this.containers[n].containerCache)){if(f&&t.contains(this.containers[n].element[0],f.element[0]))continue;f=this.containers[n],m=n}else this.containers[n].containerCache.over&&(this.containers[n]._trigger("out",s,this._uiHash(this)),this.containers[n].containerCache.over=0);if(f)if(1===this.containers.length)this.containers[m].containerCache.over||(this.containers[m]._trigger("over",s,this._uiHash(this)),this.containers[m].containerCache.over=1);else{for(o=1e4,r=null,p=f.floating||i(this.currentItem),h=p?"left":"top",l=p?"width":"height",c=this.positionAbs[h]+this.offset.click[h],a=this.items.length-1;a>=0;a--)t.contains(this.containers[m].element[0],this.items[a].item[0])&&this.items[a].item[0]!==this.currentItem[0]&&(!p||e(this.positionAbs.top+this.offset.click.top,this.items[a].top,this.items[a].height))&&(u=this.items[a].item.offset()[h],d=!1,Math.abs(u-c)>Math.abs(u+this.items[a][l]-c)&&(d=!0,u+=this.items[a][l]),o>Math.abs(u-c)&&(o=Math.abs(u-c),r=this.items[a],this.direction=d?"up":"down"));if(!r&&!this.options.dropOnEmpty)return;if(this.currentContainer===this.containers[m])return;r?this._rearrange(s,r,null,!0):this._rearrange(s,null,this.containers[m].element,!0),this._trigger("change",s,this._uiHash()),this.containers[m]._trigger("change",s,this._uiHash(this)),this.currentContainer=this.containers[m],this.options.placeholder.update(this.currentContainer,this.placeholder),this.containers[m]._trigger("over",s,this._uiHash(this)),this.containers[m].containerCache.over=1}},_createHelper:function(e){var i=this.options,s=t.isFunction(i.helper)?t(i.helper.apply(this.element[0],[e,this.currentItem])):"clone"===i.helper?this.currentItem.clone():this.currentItem;return s.parents("body").length||t("parent"!==i.appendTo?i.appendTo:this.currentItem[0].parentNode)[0].appendChild(s[0]),s[0]===this.currentItem[0]&&(this._storedCSS={width:this.currentItem[0].style.width,height:this.currentItem[0].style.height,position:this.currentItem.css("position"),top:this.currentItem.css("top"),left:this.currentItem.css("left")}),(!s[0].style.width||i.forceHelperSize)&&s.width(this.currentItem.width()),(!s[0].style.height||i.forceHelperSize)&&s.height(this.currentItem.height()),s},_adjustOffsetFromHelper:function(e){"string"==typeof e&&(e=e.split(" ")),t.isArray(e)&&(e={left:+e[0],top:+e[1]||0}),"left"in e&&(this.offset.click.left=e.left+this.margins.left),"right"in e&&(this.offset.click.left=this.helperProportions.width-e.right+this.margins.left),"top"in e&&(this.offset.click.top=e.top+this.margins.top),"bottom"in e&&(this.offset.click.top=this.helperProportions.height-e.bottom+this.margins.top)},_getParentOffset:function(){this.offsetParent=this.helper.offsetParent();var e=this.offsetParent.offset();return"absolute"===this.cssPosition&&this.scrollParent[0]!==document&&t.contains(this.scrollParent[0],this.offsetParent[0])&&(e.left+=this.scrollParent.scrollLeft(),e.top+=this.scrollParent.scrollTop()),(this.offsetParent[0]===document.body||this.offsetParent[0].tagName&&"html"===this.offsetParent[0].tagName.toLowerCase()&&t.ui.ie)&&(e={top:0,left:0}),{top:e.top+(parseInt(this.offsetParent.css("borderTopWidth"),10)||0),left:e.left+(parseInt(this.offsetParent.css("borderLeftWidth"),10)||0)}},_getRelativeOffset:function(){if("relative"===this.cssPosition){var t=this.currentItem.position();return{top:t.top-(parseInt(this.helper.css("top"),10)||0)+this.scrollParent.scrollTop(),left:t.left-(parseInt(this.helper.css("left"),10)||0)+this.scrollParent.scrollLeft()}}return{top:0,left:0}},_cacheMargins:function(){this.margins={left:parseInt(this.currentItem.css("marginLeft"),10)||0,top:parseInt(this.currentItem.css("marginTop"),10)||0}},_cacheHelperProportions:function(){this.helperProportions={width:this.helper.outerWidth(),height:this.helper.outerHeight()}},_setContainment:function(){var e,i,s,n=this.options;"parent"===n.containment&&(n.containment=this.helper[0].parentNode),("document"===n.containment||"window"===n.containment)&&(this.containment=[0-this.offset.relative.left-this.offset.parent.left,0-this.offset.relative.top-this.offset.parent.top,t("document"===n.containment?document:window).width()-this.helperProportions.width-this.margins.left,(t("document"===n.containment?document:window).height()||document.body.parentNode.scrollHeight)-this.helperProportions.height-this.margins.top]),/^(document|window|parent)$/.test(n.containment)||(e=t(n.containment)[0],i=t(n.containment).offset(),s="hidden"!==t(e).css("overflow"),this.containment=[i.left+(parseInt(t(e).css("borderLeftWidth"),10)||0)+(parseInt(t(e).css("paddingLeft"),10)||0)-this.margins.left,i.top+(parseInt(t(e).css("borderTopWidth"),10)||0)+(parseInt(t(e).css("paddingTop"),10)||0)-this.margins.top,i.left+(s?Math.max(e.scrollWidth,e.offsetWidth):e.offsetWidth)-(parseInt(t(e).css("borderLeftWidth"),10)||0)-(parseInt(t(e).css("paddingRight"),10)||0)-this.helperProportions.width-this.margins.left,i.top+(s?Math.max(e.scrollHeight,e.offsetHeight):e.offsetHeight)-(parseInt(t(e).css("borderTopWidth"),10)||0)-(parseInt(t(e).css("paddingBottom"),10)||0)-this.helperProportions.height-this.margins.top])},_convertPositionTo:function(e,i){i||(i=this.position);var s="absolute"===e?1:-1,n="absolute"!==this.cssPosition||this.scrollParent[0]!==document&&t.contains(this.scrollParent[0],this.offsetParent[0])?this.scrollParent:this.offsetParent,a=/(html|body)/i.test(n[0].tagName);return{top:i.top+this.offset.relative.top*s+this.offset.parent.top*s-("fixed"===this.cssPosition?-this.scrollParent.scrollTop():a?0:n.scrollTop())*s,left:i.left+this.offset.relative.left*s+this.offset.parent.left*s-("fixed"===this.cssPosition?-this.scrollParent.scrollLeft():a?0:n.scrollLeft())*s}},_generatePosition:function(e){var i,s,n=this.options,a=e.pageX,o=e.pageY,r="absolute"!==this.cssPosition||this.scrollParent[0]!==document&&t.contains(this.scrollParent[0],this.offsetParent[0])?this.scrollParent:this.offsetParent,h=/(html|body)/i.test(r[0].tagName);return"relative"!==this.cssPosition||this.scrollParent[0]!==document&&this.scrollParent[0]!==this.offsetParent[0]||(this.offset.relative=this._getRelativeOffset()),this.originalPosition&&(this.containment&&(e.pageX-this.offset.click.left<this.containment[0]&&(a=this.containment[0]+this.offset.click.left),e.pageY-this.offset.click.top<this.containment[1]&&(o=this.containment[1]+this.offset.click.top),e.pageX-this.offset.click.left>this.containment[2]&&(a=this.containment[2]+this.offset.click.left),e.pageY-this.offset.click.top>this.containment[3]&&(o=this.containment[3]+this.offset.click.top)),n.grid&&(i=this.originalPageY+Math.round((o-this.originalPageY)/n.grid[1])*n.grid[1],o=this.containment?i-this.offset.click.top>=this.containment[1]&&i-this.offset.click.top<=this.containment[3]?i:i-this.offset.click.top>=this.containment[1]?i-n.grid[1]:i+n.grid[1]:i,s=this.originalPageX+Math.round((a-this.originalPageX)/n.grid[0])*n.grid[0],a=this.containment?s-this.offset.click.left>=this.containment[0]&&s-this.offset.click.left<=this.containment[2]?s:s-this.offset.click.left>=this.containment[0]?s-n.grid[0]:s+n.grid[0]:s)),{top:o-this.offset.click.top-this.offset.relative.top-this.offset.parent.top+("fixed"===this.cssPosition?-this.scrollParent.scrollTop():h?0:r.scrollTop()),left:a-this.offset.click.left-this.offset.relative.left-this.offset.parent.left+("fixed"===this.cssPosition?-this.scrollParent.scrollLeft():h?0:r.scrollLeft())}},_rearrange:function(t,e,i,s){i?i[0].appendChild(this.placeholder[0]):e.item[0].parentNode.insertBefore(this.placeholder[0],"down"===this.direction?e.item[0]:e.item[0].nextSibling),this.counter=this.counter?++this.counter:1;var n=this.counter;this._delay(function(){n===this.counter&&this.refreshPositions(!s)})},_clear:function(t,e){this.reverting=!1;var i,s=[];if(!this._noFinalSort&&this.currentItem.parent().length&&this.placeholder.before(this.currentItem),this._noFinalSort=null,this.helper[0]===this.currentItem[0]){for(i in this._storedCSS)("auto"===this._storedCSS[i]||"static"===this._storedCSS[i])&&(this._storedCSS[i]="");this.currentItem.css(this._storedCSS).removeClass("ui-sortable-helper")}else this.currentItem.show();for(this.fromOutside&&!e&&s.push(function(t){this._trigger("receive",t,this._uiHash(this.fromOutside))}),!this.fromOutside&&this.domPosition.prev===this.currentItem.prev().not(".ui-sortable-helper")[0]&&this.domPosition.parent===this.currentItem.parent()[0]||e||s.push(function(t){this._trigger("update",t,this._uiHash())}),this!==this.currentContainer&&(e||(s.push(function(t){this._trigger("remove",t,this._uiHash())}),s.push(function(t){return function(e){t._trigger("receive",e,this._uiHash(this))}}.call(this,this.currentContainer)),s.push(function(t){return function(e){t._trigger("update",e,this._uiHash(this))}}.call(this,this.currentContainer)))),i=this.containers.length-1;i>=0;i--)e||s.push(function(t){return function(e){t._trigger("deactivate",e,this._uiHash(this))}}.call(this,this.containers[i])),this.containers[i].containerCache.over&&(s.push(function(t){return function(e){t._trigger("out",e,this._uiHash(this))}}.call(this,this.containers[i])),this.containers[i].containerCache.over=0);if(this.storedCursor&&(this.document.find("body").css("cursor",this.storedCursor),this.storedStylesheet.remove()),this._storedOpacity&&this.helper.css("opacity",this._storedOpacity),this._storedZIndex&&this.helper.css("zIndex","auto"===this._storedZIndex?"":this._storedZIndex),this.dragging=!1,this.cancelHelperRemoval){if(!e){for(this._trigger("beforeStop",t,this._uiHash()),i=0;s.length>i;i++)s[i].call(this,t);this._trigger("stop",t,this._uiHash())}return this.fromOutside=!1,!1}if(e||this._trigger("beforeStop",t,this._uiHash()),this.placeholder[0].parentNode.removeChild(this.placeholder[0]),this.helper[0]!==this.currentItem[0]&&this.helper.remove(),this.helper=null,!e){for(i=0;s.length>i;i++)s[i].call(this,t);this._trigger("stop",t,this._uiHash())}return this.fromOutside=!1,!0},_trigger:function(){t.Widget.prototype._trigger.apply(this,arguments)===!1&&this.cancel()},_uiHash:function(e){var i=e||this;return{helper:i.helper,placeholder:i.placeholder||t([]),position:i.position,originalPosition:i.originalPosition,offset:i.positionAbs,item:i.currentItem,sender:e?e.element:null}}})})(jQuery);;
/**
 * angular-ui-sortable - This directive allows you to jQueryUI Sortable.
 * @version v0.13.4 - 2015-06-07
 * @link http://angular-ui.github.com
 * @license MIT
 */

(function(window, angular, undefined) {
'use strict';
/*
 jQuery UI Sortable plugin wrapper

 @param [ui-sortable] {object} Options to pass to $.fn.sortable() merged onto ui.config
 */
angular.module('ui.sortable', [])
  .value('uiSortableConfig',{})
  .directive('uiSortable', [
    'uiSortableConfig', '$timeout', '$log',
    function(uiSortableConfig, $timeout, $log) {
      return {
        require: '?ngModel',
        scope: {
          ngModel: '=',
          uiSortable: '='
        },
        link: function(scope, element, attrs, ngModel) {
          var savedNodes;

          function combineCallbacks(first,second){
            if(second && (typeof second === 'function')) {
              return function() {
                first.apply(this, arguments);
                second.apply(this, arguments);
              };
            }
            return first;
          }

          function getSortableWidgetInstance(element) {
            // this is a fix to support jquery-ui prior to v1.11.x
            // otherwise we should be using `element.sortable('instance')`
            var data = element.data('ui-sortable');
            if (data && typeof data === 'object' && data.widgetFullName === 'ui-sortable') {
              return data;
            }
            return null;
          }

          function hasSortingHelper (element, ui) {
            var helperOption = element.sortable('option','helper');
            return helperOption === 'clone' || (typeof helperOption === 'function' && ui.item.sortable.isCustomHelperUsed());
          }

          // thanks jquery-ui
          function isFloating (item) {
            return (/left|right/).test(item.css('float')) || (/inline|table-cell/).test(item.css('display'));
          }

          function getElementScope(elementScopes, element) {
            var result = null;
            for (var i = 0; i < elementScopes.length; i++) {
              var x = elementScopes[i];
              if (x.element[0] === element[0]) {
                result = x.scope;
                break;
              }
            }
            return result;
          }

          function afterStop(e, ui) {
            ui.item.sortable._destroy();
          }

          var opts = {};

          // directive specific options
          var directiveOpts = {
            'ui-floating': undefined
          };

          var callbacks = {
            receive: null,
            remove:null,
            start:null,
            stop:null,
            update:null
          };

          var wrappers = {
            helper: null
          };

          angular.extend(opts, directiveOpts, uiSortableConfig, scope.uiSortable);

          if (!angular.element.fn || !angular.element.fn.jquery) {
            $log.error('ui.sortable: jQuery should be included before AngularJS!');
            return;
          }

          if (ngModel) {

            // When we add or remove elements, we need the sortable to 'refresh'
            // so it can find the new/removed elements.
            scope.$watch('ngModel.length', function() {
              // Timeout to let ng-repeat modify the DOM
              $timeout(function() {
                // ensure that the jquery-ui-sortable widget instance
                // is still bound to the directive's element
                if (!!getSortableWidgetInstance(element)) {
                  element.sortable('refresh');
                }
              }, 0, false);
            });

            callbacks.start = function(e, ui) {
              if (opts['ui-floating'] === 'auto') {
                // since the drag has started, the element will be
                // absolutely positioned, so we check its siblings
                var siblings = ui.item.siblings();
                var sortableWidgetInstance = getSortableWidgetInstance(angular.element(e.target));
                sortableWidgetInstance.floating = isFloating(siblings);
              }

              // Save the starting position of dragged item
              ui.item.sortable = {
                model: ngModel.$modelValue[ui.item.index()],
                index: ui.item.index(),
                source: ui.item.parent(),
                sourceModel: ngModel.$modelValue,
                cancel: function () {
                  ui.item.sortable._isCanceled = true;
                },
                isCanceled: function () {
                  return ui.item.sortable._isCanceled;
                },
                isCustomHelperUsed: function () {
                  return !!ui.item.sortable._isCustomHelperUsed;
                },
                _isCanceled: false,
                _isCustomHelperUsed: ui.item.sortable._isCustomHelperUsed,
                _destroy: function () {
                  angular.forEach(ui.item.sortable, function(value, key) {
                    ui.item.sortable[key] = undefined;
                  });
                }
              };
            };

            callbacks.activate = function(e, ui) {
              // We need to make a copy of the current element's contents so
              // we can restore it after sortable has messed it up.
              // This is inside activate (instead of start) in order to save
              // both lists when dragging between connected lists.
              savedNodes = element.contents();

              // If this list has a placeholder (the connected lists won't),
              // don't inlcude it in saved nodes.
              var placeholder = element.sortable('option','placeholder');

              // placeholder.element will be a function if the placeholder, has
              // been created (placeholder will be an object).  If it hasn't
              // been created, either placeholder will be false if no
              // placeholder class was given or placeholder.element will be
              // undefined if a class was given (placeholder will be a string)
              if (placeholder && placeholder.element && typeof placeholder.element === 'function') {
                var phElement = placeholder.element();
                // workaround for jquery ui 1.9.x,
                // not returning jquery collection
                phElement = angular.element(phElement);

                // exact match with the placeholder's class attribute to handle
                // the case that multiple connected sortables exist and
                // the placehoilder option equals the class of sortable items
                var excludes = element.find('[class="' + phElement.attr('class') + '"]:not([ng-repeat], [data-ng-repeat])');

                savedNodes = savedNodes.not(excludes);
              }

              // save the directive's scope so that it is accessible from ui.item.sortable
              var connectedSortables = ui.item.sortable._connectedSortables || [];

              connectedSortables.push({
                element: element,
                scope: scope
              });

              ui.item.sortable._connectedSortables = connectedSortables;
            };

            callbacks.update = function(e, ui) {
              // Save current drop position but only if this is not a second
              // update that happens when moving between lists because then
              // the value will be overwritten with the old value
              if(!ui.item.sortable.received) {
                ui.item.sortable.dropindex = ui.item.index();
                var droptarget = ui.item.parent();
                ui.item.sortable.droptarget = droptarget;

                var droptargetScope = getElementScope(ui.item.sortable._connectedSortables, droptarget);
                ui.item.sortable.droptargetModel = droptargetScope.ngModel;

                // Cancel the sort (let ng-repeat do the sort for us)
                // Don't cancel if this is the received list because it has
                // already been canceled in the other list, and trying to cancel
                // here will mess up the DOM.
                element.sortable('cancel');
              }

              // Put the nodes back exactly the way they started (this is very
              // important because ng-repeat uses comment elements to delineate
              // the start and stop of repeat sections and sortable doesn't
              // respect their order (even if we cancel, the order of the
              // comments are still messed up).
              if (hasSortingHelper(element, ui) && !ui.item.sortable.received &&
                  element.sortable( 'option', 'appendTo' ) === 'parent') {
                // restore all the savedNodes except .ui-sortable-helper element
                // (which is placed last). That way it will be garbage collected.
                savedNodes = savedNodes.not(savedNodes.last());
              }
              savedNodes.appendTo(element);

              // If this is the target connected list then
              // it's safe to clear the restored nodes since:
              // update is currently running and
              // stop is not called for the target list.
              if(ui.item.sortable.received) {
                savedNodes = null;
              }

              // If received is true (an item was dropped in from another list)
              // then we add the new item to this list otherwise wait until the
              // stop event where we will know if it was a sort or item was
              // moved here from another list
              if(ui.item.sortable.received && !ui.item.sortable.isCanceled()) {
                scope.$apply(function () {
                  ngModel.$modelValue.splice(ui.item.sortable.dropindex, 0,
                                             ui.item.sortable.moved);
                });
              }
            };

            callbacks.stop = function(e, ui) {
              // If the received flag hasn't be set on the item, this is a
              // normal sort, if dropindex is set, the item was moved, so move
              // the items in the list.
              if(!ui.item.sortable.received &&
                 ('dropindex' in ui.item.sortable) &&
                 !ui.item.sortable.isCanceled()) {

                scope.$apply(function () {
                  ngModel.$modelValue.splice(
                    ui.item.sortable.dropindex, 0,
                    ngModel.$modelValue.splice(ui.item.sortable.index, 1)[0]);
                });
              } else {
                // if the item was not moved, then restore the elements
                // so that the ngRepeat's comment are correct.
                if ((!('dropindex' in ui.item.sortable) || ui.item.sortable.isCanceled()) &&
                    !hasSortingHelper(element, ui)) {
                  savedNodes.appendTo(element);
                }
              }

              // It's now safe to clear the savedNodes
              // since stop is the last callback.
              savedNodes = null;
            };

            callbacks.receive = function(e, ui) {
              // An item was dropped here from another list, set a flag on the
              // item.
              ui.item.sortable.received = true;
            };

            callbacks.remove = function(e, ui) {
              // Workaround for a problem observed in nested connected lists.
              // There should be an 'update' event before 'remove' when moving
              // elements. If the event did not fire, cancel sorting.
              if (!('dropindex' in ui.item.sortable)) {
                element.sortable('cancel');
                ui.item.sortable.cancel();
              }

              // Remove the item from this list's model and copy data into item,
              // so the next list can retrive it
              if (!ui.item.sortable.isCanceled()) {
                scope.$apply(function () {
                  ui.item.sortable.moved = ngModel.$modelValue.splice(
                    ui.item.sortable.index, 1)[0];
                });
              }
            };

            wrappers.helper = function (inner) {
              if (inner && typeof inner === 'function') {
                return function (e, item) {
                  var innerResult = inner.apply(this, arguments);
                  item.sortable._isCustomHelperUsed = item !== innerResult;
                  return innerResult;
                };
              }
              return inner;
            };

            scope.$watch('uiSortable', function(newVal /*, oldVal*/) {
              // ensure that the jquery-ui-sortable widget instance
              // is still bound to the directive's element
              var sortableWidgetInstance = getSortableWidgetInstance(element);
              if (!!sortableWidgetInstance) {
                angular.forEach(newVal, function(value, key) {
                  // if it's a custom option of the directive,
                  // handle it approprietly
                  if (key in directiveOpts) {
                    if (key === 'ui-floating' && (value === false || value === true)) {
                      sortableWidgetInstance.floating = value;
                    }

                    opts[key] = value;
                    return;
                  }

                  if (callbacks[key]) {
                    if( key === 'stop' ){
                      // call apply after stop
                      value = combineCallbacks(
                        value, function() { scope.$apply(); });

                      value = combineCallbacks(value, afterStop);
                    }
                    // wrap the callback
                    value = combineCallbacks(callbacks[key], value);
                  } else if (wrappers[key]) {
                    value = wrappers[key](value);
                  }

                  opts[key] = value;
                  element.sortable('option', key, value);
                });
              }
            }, true);

            angular.forEach(callbacks, function(value, key) {
              opts[key] = combineCallbacks(value, opts[key]);
              if( key === 'stop' ){
                opts[key] = combineCallbacks(opts[key], afterStop);
              }
            });

          } else {
            $log.info('ui.sortable: ngModel not provided!', element);
          }

          // Create sortable
          element.sortable(opts);
        }
      };
    }
  ]);

})(window, window.angular);
;
(function () {

  angular.module('MediaBrowserField', ['mediaBrowser', 'FileEditorModal', 'EntityService', 'ui.sortable'])
    .config(['$injector', function ($injector) {
      try {
        depManager = $injector.get('DependenciesProvider');
        depManager.AddDependency('formElement', 'mediaBrowserField');
      }
      catch (err) {
      }
    }])
    .directive('mediaBrowserField', ['mbModal', 'EntityService', function (mbModal, EntityService) {

      function link(scope, elem, attr, ngModelController) {
        // everything to define
        var service = new EntityService('files', 'id');
        var field_root_id = "";
        if (scope.$parent.element) {
          field_root_id = scope.$parent.element.id;
          scope.title = scope.$parent.element.title;
          scope.description = scope.$parent.description;
        }
        else {
          var field_root = elem.parent();
          while (!field_root.attr('id')) {
            field_root = field_root.parent();
          }
          field_root_id = field_root.attr('id');
        }

        scope.field_name = field_root_id.match(/edit-([\w-]*)/)[1].replace(/-/g, '_');
        scope.field_id = field_root_id;
        scope.showHelp = false;
        if (scope.$parent.element && scope.$parent.element.custom_directive_parameters.hide_helpicon) {
          scope.hideHelpicon = scope.$parent.element.custom_directive_parameters.hide_helpicon;
        } else {
          scope.hideHelpicon = false;
        }
        if (attr['panes']) {
          scope.panes = attr['panes'].split(',');
        }
        else {
          scope.panes = ['upload', 'web', 'library'];
        }
        scope.required = attr['required'] == "";

        var types = {};
        scope.allowedTypes = scope.types.split(',');
        scope.extensionsFull = [];
        for (var i = 0; i < scope.allowedTypes.length; i++) {
          var type = scope.allowedTypes[i];
          types[type] = type;
          if (Drupal.settings.extensionMap[type] && Drupal.settings.extensionMap[type].length) {
            scope.extensionsFull = scope.extensionsFull.concat(Drupal.settings.extensionMap[type]);
          }
        }
        scope.extensionsFull.sort();

        scope.sortableOptions = {
          axis: 'y',
          handle: '.tabledrag-handle'
        };

        var generateFunc = function (i) {
          return function(file) {
            scope.selectedFiles[i] = angular.copy(file);
            return file;
          }
        };

        if (!store.isNew()) {
          scope.selectedFiles = store.fetchData(scope.field_name);
        }
        else if (!Array.isArray(scope.selectedFiles)) {
          scope.selectedFiles = [];
        }

        if (Array.isArray(scope.$parent.value)) {
          for (i = 0; i < scope.$parent.value.length; i++) {
            service.fetchOne(scope.$parent.value[i]).then(generateFunc(i));
          }
        }
        else if (scope.$parent.value) {
          service.fetchOne(scope.$parent.value).then(generateFunc(0));
        }

        if (scope.selectedFiles.length == 0 && Drupal.settings.mediaBrowserField != undefined) {
          var fids = Drupal.settings.mediaBrowserField[scope.field_id].selectedFiles;

          for (var i = 0; i < fids.length; i++) {
            var fid = fids[i];
            service.fetchOne(fid).then(generateFunc(i));
          }
          store.setData(scope.field_name, scope.selectedFiles);
        }

        // prefetch the files now so user can open Media Browser later
        service.fetch();

        scope.$on('EntityService.files.update', function (e, file) {
          for (var i = 0; i<scope.selectedFiles.length; i++) {
            if (file.id == scope.selectedFiles[i].id) {
              scope.selectedFiles[i] = angular.copy(file);
            }
          }
          store.setData(scope.field_name, scope.selectedFiles);
        });

        scope.sendToBrowser = function($files) {
          var params = {
            files: $files,
            onSelect: scope.addFile,
            types: types
          };
          mbModal.open(params);
          for (var i = 0; i < scope.selectedFiles; i++) {
            highlightDupe(scope.selectedFiles[i], false);
          }
        }

        scope.addFile = function ($files) {
          for (var i = 0; i < $files.length; i++) {
            var found = false;
            for (var j = 0; j < scope.selectedFiles.length; j++) {
              highlightDupe(scope.selectedFiles[j], false);
              if ($files[i].id == scope.selectedFiles[j].id) {
                scope.selectedFiles[j] = angular.copy($files[i]);
                highlightDupe(scope.selectedFiles[j], true);
                found = true;
                break;
              }
            }
            if (!found) {
              scope.selectedFiles.push($files[i]);
              if (scope.cardinality == 1) {
                scope.$parent.value = $files[i].id;
              }
              else {
                scope.$parent.value = scope.$parent.value || [];
                scope.$parent.value.push($files[i].id);
              }
            }
          }
          store.setData(scope.field_name, scope.selectedFiles);
          if (ngModelController) {
            ngModelController.$setDirty();
            ngModelController.$setTouched();
          }
        }

        scope.removeFile = function ($index) {
          scope.selectedFiles.splice($index, 1);
          if (scope.cardinality == 1) {
            scope.$parent.value = 0;
          }
          else {
            scope.$parent.value.splice($index, 1);
          }
          store.setData(scope.field_name, scope.selectedFiles);
          if (ngModelController) {
            ngModelController.$setDirty();
            ngModelController.$setTouched();
          }
        }

        scope.replaceFile = function ($inserted, $index) {
          scope.selectedFiles.splice($index, 1, $inserted[0]);
          if (scope.cardinality == 1) {
            scope.$parent.value = $inserted[0].id;
          }
          else {
            scope.$parent.value.splice($index, 1, $inserted[0]);
          }
          store.setData(scope.field_name, scope.selectedFiles);
          if (ngModelController) {
            ngModelController.$setDirty();
            ngModelController.$setTouched();
          }
        }

        function highlightDupe(file, toHighlight) {
          file.highlight = toHighlight;
        }

        scope.fieldIsFull = function () {
          if (scope.cardinality == -1) {
            return false;
          }

          return scope.selectedFiles.length >= scope.cardinality;
        }

        var label = elem.parent().find(' label');
        elem.parent().find(' > *').not(elem).remove();
        elem.before(label);
      }

      if (mbModal.requirementsMet()) {
        return {
          link: link,
          require: '?ngModel',
          templateUrl: function () {
            return Drupal.settings.paths.moduleRoot + '/templates/field.html?vers=' + Drupal.settings.version.mediaBrowser
          },
          scope: {
            selectedFiles: '=files',
            maxFilesize: '@maxFilesize',
            types: '@',
            extensions: '@',
            upload_text: '@uploadText',
            droppable_text: '@droppableText',
            cardinality: '@'
          }
        }
      }
      else {
        // remove this element. It won't work right anyway
        return {
          link: function (elem, attr) {
            elem.remove();
          }
        }
      }
    }])
    .run(function () {
      angular.element(window).on('dragover drop', function(e) {
        e = e || event;
        e.preventDefault();
      });
    });

  var store;
  (function () {
    var form_id,
      new_form,
      data = {},
      inited = false;
    store = {
      init: function () {
        if (inited) {
          return;
        }

        inited = true;
        var old_id = sessionStorage['last_form'];
        form_id_input = document.querySelector('form input[name="form_build_id"]'),
        form_id = form_id_input != null ? form_id_input.value: "";

        if (!form_id) {
          new_form = true;
          return;
        }

        if (form_id != old_id) {
          delete sessionStorage[old_id];
          new_form = true;
          sessionStorage['last_form'] = form_id;
        }
        else {
          data = JSON.parse(sessionStorage[form_id]);
          new_form = false;
        }
      },
      fetchData: function (field_name) {
        this.init();
        return data[field_name];
      },
      setData: function (field_name, newData) {
        this.init();
        data[field_name] = newData;
        sessionStorage[form_id] = JSON.stringify(data);
      },
      isNew: function () {
        this.init();
        return new_form;
      }
    };
  })();
})();;
(function () {

  var m = angular.module('formElement', ['basicFormElements', 'osHelpers', 'ngSanitize', 'DependencyManager']);

  m.run(['Dependencies', function (dm) {
    var deps = dm.GetDependencies('formElement');
    Array.prototype.push.apply(m.requires, deps);
  }]);

  m.directive('formElement', ['$compile', '$filter', '$sce', '$timeout', function ($compile, $filter, $sce, $t) {
    return {
      scope: {
        element: '=',
        value: '='
      },
      template: '<div class="form-wrapper" ng-class="classname">' +
        '<span ng-if="element.prefix" ng-bind-html="to_trusted(element.prefix)"></span>' +
        '<span>Placeholder</span>' +
        '<div class="description" ng-bind-html="description"></div>' +
      '</div>',
      link: function (scope, elem, attr) {
        scope.id = $filter('idClean')(scope.element.name, 'edit');
        scope.description = $sce.trustAsHtml(scope.element.description);
        scope.label = scope.element.title;
        scope.access = scope.element.access;
        scope.classname = '';
        scope.to_trusted = function(html_code) {
          return $sce.trustAsHtml(html_code);
        }
        angular.forEach(scope.element.class, function(classname, key) {
          scope.classname += ' ' + classname;
        });

        if (scope.access == undefined) {
          scope.access = true;
        }

        if (scope.access) {
          var copy = elem.find('span').clone();
          for (var k in scope.element) {
            if (k == 'type') {
              copy.attr('fe-'+scope.element[k], '');
            }
            else if (k == 'custom_directive') {
              copy.attr(scope.element[k], '');
            }
            else if (k == 'name') {
              copy.attr('name', scope.element[k]);
            }
            else if (k == 'custom_directive_parameters') {
              for (var l in scope.element[k]) {
                copy.attr(l, scope.element[k][l]);
              }
            }
          }

          copy.attr('element', 'element');

          copy.attr('input-id', scope.id);
          copy.attr('ng-model', 'value');
          elem.find('span').replaceWith(copy);
          copy = $compile(copy)(scope);
          if (scope.element.attached && scope.element.attached.js) {
            $t(function () {
              for (var i in scope.element.attached.js) {
                if (angular.isObject(scope.element.attached.js[i])) {
                  Drupal.behaviors.states.attach(jQuery(elem), scope.element.attached.js[i].data);
                }
              }
            });
          }
        }
        else {
          elem.remove();
        }
      }
    }
  }]);

  m.filter('weight', [function () {
    return function (input) {
      if (angular.isArray(input)) {
        throw new Exception('weight filter does not support arrays. Please use an object instead');
      }
      var keys = Object.keys(input),
        basics = [],
        defaultWeight = 0,
        weightIncrement = 0.001;
      for (var i = 0; i < keys.length; i++) {
        var w = defaultWeight;
        if (input[keys[i]].weight != undefined) {
          w = input[keys[i]].weight;
        }
        else {
          defaultWeight += weightIncrement;
        }
        basics.push({key: keys[i], weight: w})
      }

      basics.sort(function (a,b) {
        return a.weight - b.weight;
      });

      var output = {};
      for (i = 0; i < basics.length; i++) {
        var key = basics[i].key;
        output[key] = input[key];
      }

      return output;
    }
  }]);

})();
;
(function () {

  var m = angular.module('basicFormElements', ['osHelpers', 'ngSanitize']);

  /**
   * SelectOptGroup directive.
   */
  m.directive('feOptgroup', ['$sce', function ($sce) {
    return {
      scope: {
        name: '@',
        value: '=ngModel',
        element: '='
      },
      template: '<label for="{{id}}">{{title}}</label>' +
        '<div class="form-item form-type-select">' +
        '<select class="form-select" id="{{id}}" name="{{name}}" ng-model="value">' +
        '<option ng-repeat="category in categories | filterWithItems:false" value="{{category.id}}">{{category.name}}</option>' +
        '<optgroup ng-repeat="category in categories | filterWithItems:true" label="{{category.name}}">' +
        '<option ng-repeat="subCat in category.items" value="{{subCat.id}}">{{subCat.name}}</option>' +
        '</optgroup>' +
        '</select>' +
        '</div>',
      link: function (scope, elem, attr) {
        scope.id = attr['inputId'];
        scope.title = scope.element.title;
        var items = [];
        angular.forEach(scope.element.options, function(value, key) {
          if (angular.isObject(value)) {
            var data = {};        
            data.id = key;
            data.name = key;
            data.items = [];
            angular.forEach(value, function(childOption, childKey) {
              var subcat = {};
              subcat.id = childKey;
              subcat.name = childOption;
              data.items.push(subcat);
            });
            items.push(data);
          } else {
            var data = {};
            data.id = key;
            data.name = value;
            items.push(data);
          }
        });
        scope.categories = items;
      }
    }
  }]);

  /**
   * Select directive.
   */
  m.directive('feSelect', ['$sce', function ($sce) {
    return {
      scope: {
        name: '@',
        value: '=ngModel',
        element: '='
      },
      template: '<label for="{{id}}">{{title}}</label>' +
        '<div class="form-item form-type-select"><select class="form-select" id="{{id}}" name="{{name}}" ng-model="value">' +
          '<option value="">Select</option>' +
          '<option ng-repeat="(val, label) in options" value="{{val}}" ng-bind-html="label"></option>' +
        '</select></div>',
      link: function (scope, elem, attr) {
        scope.id = attr['inputId'];
        scope.options = scope.element.options;
        scope.title = scope.element.title;
      }
    }
  }]);

  /**
   * Checkboxes directive.
   */
  m.directive('feCheckboxes', ['$sce', function ($sce) {
    return {
      require: 'ngModel',
      scope: {
        name: '@',
        value: '=ngModel',
        element: '='
      },
      template: '<label for="{{id}}">{{title}}</label>' +
      '<div id="{{id}}" class="form-checkboxes">' +
        '<div ng-show="element.select_all">' +          
          '<input ng-model="selectAll" type="checkbox" class="form-checkbox" ng-disabled="element.disabled" ng-change="masterChange()">' + 
          '&nbsp;<label class="option bold">Select All</label>' +
        '</div>' +
        '<div ng-if="element.sorted_options" class="form-item form-type-checkbox" ng-repeat="option in options | orderBy: \'label\'">' +
          '<input ng-model="value[option.key]" ng-checked="value[option.key]" type="checkbox" id="{{id}}-{{option.key}}" name="{{name}}" value="{{option.key}}" class="form-checkbox" ng-disabled="element.disabled">' + 
          '&nbsp;<label class="option" for="{{id}}-{{option.key}}" ng-bind-html="option.label"></label>' +
        '</div>' +
        '<div ng-if="!element.sorted_options" class="form-item form-type-checkbox" ng-repeat="option in options">' +
          '<input ng-model="value[option.key]" ng-checked="value[option.key]" type="checkbox" id="{{id}}-{{option.key}}" name="{{name}}" value="{{option.key}}" class="form-checkbox" ng-disabled="element.disabled">' + 
          '&nbsp;<label class="option" for="{{id}}-{{option.key}}" ng-bind-html="option.label"></label>' +
        '</div>' +
      '</div> ',
      link: function (scope, elem, attr) {
        scope.id = attr['inputId'];
        scope.options = scope.element.options;       
        scope.title = scope.element.title;

        scope.masterChange = function () {
          if (scope.selectAll) {
            angular.forEach(scope.options, function (cb) {
              scope.value[cb.key] = true;
            });
          } else {   
            angular.forEach(scope.options, function (cb) {
              scope.value[cb.key] = false;
            });
          }
        };
      }
    }
  }]);

  /**
   * Checkbox directive.
   * Arguments:
   *   name - string - the name of the element as Drupal expects it
   *   value - property on parent scope
   */
  m.directive('feCheckbox', [function () {
    return {
      require: 'ngModel',
      scope: {
        name: '@',
        value: '=ngModel',
        element: '='
      },
      template: '<input type="checkbox" id="{{id}}" name="{{name}}" value="1" class="form-checkbox" ng-model="value" ng-disabled="element.disabled" ng-true-value="1" ng-false-value="0"/><label class="option" for="{{id}}">{{title}}</label>',
      link: function (scope, elem, attr, ngModelController) {
        scope.id = attr['inputId'];
        scope.title = scope.element.title;
      }
    }
  }]);

  /**
   * Textbox directive.
   */
  m.directive('feTextfield', [function () {
    return {
      scope: {
        name: '@',
        value: '=ngModel',
        element: '='
      },
      template: '<label for="{{id}}">{{title}}</label>' +
      '<input type="textfield" id="{{id}}" name="{{name}}" ng-model="value" class="form-text" ng-disabled="element.disabled">',
      link: function (scope, elem, attr) {
        scope.id = attr['inputId'];
        scope.title = scope.element.title;
      }
    }
  }]);

  /**
   * Textarea directive
   */
  m.directive('feTextarea', [function () {
    return {
      scope: {
        name: '@',
        value: '=ngModel',
        element: '='
      },
      template: '<label for="{{id}}">{{title}}</label>' +
      '<textarea id="{{id}}" name="{{name}}" ng-model="value" class="form-textarea" ng-disabled="element.disabled"></textarea>',
      link: function (scope, elem, attr) {
        scope.id = attr['inputId'];
        scope.title = scope.element.title;
      }
    }
  }]);

  /**
   * Radios directive.
   */
  m.directive('feRadios', ['$sce', function ($sce) {
    return {
      scope: {
        name: '@',
        value: '=ngModel',
        element: '='
      },
      template: '<label for="{{id}}">{{title}}</label>' +
      '<div id="{{id}}" class="form-radios">' +
        '<div class="form-item form-type-radio" ng-repeat="(val, label) in options">' +
          '<input type="radio" id="{{id}}-{{val}}" name="{{name}}" value="{{val}}" ng-model="$parent.value" class="form-radio" ng-disabled="element.disabled"><label class="option" for="{{id}}-{{val}}" ng-bind-html="label"></label>' +
        '</div>' +
      '</div> ',
      link: function (scope, elem, attr) {
        scope.id = attr['inputId'];
        scope.options = scope.element.options;
        scope.title = scope.element.title;
      }
    }
  }]);

  /**
   * Submit button directive
   *
   * This type of form element should always have some kind of handler on the server end to take care of whatever this needs to do.
   */
  m.directive('feSubmit', [function () {
    return {
      scope: {
        name: '@',
        value: '=ngModel',
        element: '='
      },
      template: '<label for="{{id}}">{{title}}<button type="submit" button-spinner="settings_form_{{name}}" spinning-text="Saving" id="{{id}}" name="{{name}}">Submit</button>',
      link: function (scope, elem, attr) {
        scope.id = attr['inputId'];
        scope.title = scope.element.title;
        if (scope.element.value) {
          scope.value = scope.element.value;
        } else {
          scope.value = 'Save';
        }
      }
    }
  }]);

  /**
   * Markup directive.
   *
   * Just markup that doesn't do anything.
   */
  m.directive('feMarkup', ['$sce', function ($sce) {
    return {
      scope: {
        name: '@',
        value: '=ngModel',
        element: '=',
      },
      template: '<div ng-bind-html="markup"></div>',
      link: function (scope, elem, attr) {
        scope.id = attr['inputId'];
        scope.markup = $sce.trustAsHtml(scope.element.markup);
        scope.title = scope.element.title;
      }
    }
  }]);

  /**
   * Container directive.
   *
   * Just markup along with a container id.
   */
  m.directive('feContainer', ['$sce', function ($sce) {
    return {
      scope: {
        name: '@',
        value: '=ngModel',
        element: '=',
      },
      template: '<div ng-bind-html="markup" id="{{cid}}"></div>',
      link: function (scope, elem, attr) {
        scope.markup = $sce.trustAsHtml(scope.element.markup);
        scope.cid = scope.element.cid;
      }
    }
  }]);

/**
   * Help directive.
   *
   * Just markup that doesn't do anything.
   */
  m.directive('feHelp', ['$timeout', '$sce', function ($timeout, $sce) {
    var gsfnCounter = 0;
    return {
      scope: {
        name: '@',
        value: '=ngModel',
        element: '=',
      },
      template: '<div class="getsat-widget" id="getsat-widget-{{counter}}-{{gsfnid}}"><span class="description"></span><span class="gsfn-loading">Loading...<img src="{{loading}}"></span></div>',
      link: function (scope, elem, attr) {
        scope.gsfnid = scope.element.gsfnId;
        scope.title = scope.element.title;
        scope.counter = gsfnCounter;
        scope.loading = scope.element.loading;
        gsfnCounter = gsfnCounter + 1;
        $timeout(function() {
          GSFN.loadWidget(scope.gsfnid, {"containerId":"getsat-widget-" + scope.counter + "-" + scope.gsfnid});
        }, 2000);
      }
    }
  }]);

  /**
   * Publication cititation js directive.
   *
   * .
   */
  m.directive('fePubjsevent', [function () {
    return {
      scope: {
        name: '@',
        value: '=ngModel',
        element: '=',
      },
      template: '<div ng-bind-html="markup"></div>',
      link: function (scope, elem, attr) {
        angular.element(document.querySelectorAll(scope.element.mouseover_element)).find('div').on(scope.element.mouseover_event, function (e) {
          e.stopPropagation();
          if (scope.element.hide_element) {
            angular.element(document.querySelectorAll(scope.element.hide_element)).hide();
          }
          if (scope.element.show_element) {
            if (scope.element.show_element == 'this.id') {
              var pop_id = angular.element(this).find('input').attr('value').replace('.','');
              angular.element(document.querySelectorAll('#' + pop_id)).show();
            } else {
              angular.element(document.querySelectorAll(scope.element.show_element)).show();
            }
          }
        });
      }
    }
  }])

})();
;
(function () {

  var m = angular.module('redirectForm', ['DependencyManager']);

  m.config(['DependenciesProvider', function ($depProvider) {
    $depProvider.AddDependency('formElement', 'redirectForm');
  }]);

  m.service('RedirectService', ['$http', 'buttonSpinnerStatus', function ($http, bss) {
    var redirects = {};

    var restApi = Drupal.settings.paths.api + '/redirect';
    var http_config = {
      params: {}
    };

    if (typeof Drupal.settings.spaces != 'undefined' && Drupal.settings.spaces.id) {
      http_config.params.vsite = Drupal.settings.spaces.id;
    }

    var self = this;

    this.Get = function () {
      return redirects;
    }

    this.Register = function (existing) {
      for (var i in existing) {
        var id = existing[i].id;
        if (typeof redirects[id] == 'undefined') {
          this.Count++;
        }
        redirects[id] = existing[i];
      }
    }

    this.Create = function (source, target) {
      var vals = {
        path: source,
        target: target
      };

      return $http.post(restApi, vals, http_config).then(function (r) {
        var newRedirect = r.data.data;
        if (newRedirect.id != null) {
          redirects[newRedirect.id] = newRedirect;
          self.Count++;
        }
        return r;
       },
       function (e) {

       });
    }

    this.Delete = function (id) {
      bss.SetState('redirect_delete_'+id, true);
      $http.delete(restApi+'/'+id, http_config).then(function (r) {
        if (typeof redirects[id] != 'undefined') {
          delete redirects[id];
          self.Count--;
          bss.SetState('redirect_delete_'+id, false);
        }
      },
      function (e) {
        bss.SetState('redirect_delete_'+id, false);
      });
    }

    this.Count = 0;
  }]);

  m.directive('redirects', ['$http', 'RedirectService', 'buttonSpinnerStatus', '$sce', function($http, rs, bss, $sce) {
    var hasRegistered = false;
    return {
      template: '<div class="messages" ng-show="status.length || errors.length"><div class="dismiss" ng-click="status.length = 0; errors.length = 0;">X</div>' +
      '<div class="status" ng-show="status.length > 0"><div ng-repeat="m in status track by $index"><span ng-bind-html="m"></span></div></div>' +
        '<div class="{{msgType}}" ng-show="errors.length > 0"><div ng-repeat="m in errors track by $index"><span ng-bind-html="m"></span></div></div></div>' +
      '</div>' +
      '<p>URL redirects allow you to send users from a URL on your site, to any other URL. You might want to use this to create a short link, or to transition users from an old URL to the new URL. Each site may only have a maximum of 15 of URL redirects.</p>' +
      '<ul class="table-list">' +
        '<li class="redirect-item" ng-repeat="r in redirects">' +
          '<span class="redirect-path">{{r.path}}</span> &#8594; <span class="redirect-target">{{r.target}}</span> <a class="redirect-delete" ng-click="deleteRedirect(r.id)" button-spinner="redirect_delete_{{r.id}}">delete</a>' +
        '</li>' +
      '</ul>' +
      '<a class="redirect-add" ng-show="showAddLink()" ng-click="toggleAddForm()">Add new redirect</a>' +
      '<div class="redirect-add-form" ng-show="showAddForm">' +
        '<div class="display-inline"><label for="redirect-path">Redirect From</label> {{siteBaseUrl}}/<input type="text" id="redirect-path" class="redirect-new-element" ng-model="newRedirectPath" placeholder="Local path"><span class="description">(Example: my-path). Fragment anchors (e.g. #anchor) Leading slash ( / ) are not allowed. To redirect from the homepage, enter the word home.</span></div>' +
        '<div class="display-inline"><label for="redirect-target">Redirect To</label> <input type="text" id="redirect-target" class="redirect-new-element" ng-model="newRedirectTarget" placeholder="Target URL (i.e. http://www.google.com)"><span class="description">Enter any existing destination URL (like http://example.com) to redirect to.</span></div>' +
        '<button type="button" value="Save" ng-click="addRedirect()"">Save</button>' +
      '</div>',
      scope: {
        value: '=',
        element: '='
      },
      link: function (scope, elem, attr) {
        var showAddLink = false;
        scope.showAddLink = function() {
          return cp_redirect_max > rs.Count;
        }

        scope.showAddForm = false;

        scope.toggleAddForm = function () {
          scope.showAddForm = !scope.showAddForm;
        }

        scope.siteBaseUrl = Drupal.settings.paths.vsite_home;

        var cp_redirect_max = scope.element.maximum_value_count;
        //scope.$watch('redirects', function (val) {
        //  var count = val.length || 0;
        //  if (count < cp_redirect_max) {
        //    showAddLink = true;
        //  }
        //  else {
        //    showAddLink = false;
        //  }
        //}, true);
        if (!hasRegistered) {
          rs.Register(scope.element.value);
          hasRegistered = true;
        }
        scope.redirects = rs.Get();

        scope.newRedirectPath = '';
        scope.newRedirectTarget = '';
        scope.errors = [];
        scope.msgType = 'warning';
        scope.addRedirect = function () {
          rs.Create(scope.newRedirectPath, scope.newRedirectTarget).then(function (r) {
            scope.newRedirectPath = '';
            scope.newRedirectTarget = '';
            scope.errors.length = 0;
            scope.msgType = 'warning';
            scope.showAddForm = false;
            if (Array.isArray(r.data.data.msg)) {
              for(var i = 0; i < r.data.data.msg.length; i++) {
                scope.errors.push($sce.trustAsHtml(r.data.data.msg[i]));
              }
              if (r.data.data.msg_type != null) {
                scope.msgType = r.data.data.msg_type;
              }
            }
          });
        }

        scope.deleteRedirect = function (id) {
          rs.Delete(id);
        }
      }
    };
  }]);
})();
;
(function () {

  var m = angular.module('ApSettingsForm', ['angularModalService', 'redirectForm', 'MediaBrowserField', 'formElement', 'os-buttonSpinner']);

  /**
   * Fetches the settings forms from the server and makes them available directives and controllers
   */
  m.service('apSettings', ['$http', '$q', function ($http, $q, $httpParamSerializer) {

    var settingsForms = {};
    var settings = {};
    var groupInfo = {};
    var promises = [];

    var queryArgs = {};

    if (Drupal.settings.spaces != undefined) {
      if (Drupal.settings.spaces.id) {
        queryArgs.vsite = Drupal.settings.spaces.id;
      }
    }

    var baseUrl = Drupal.settings.paths.api;
    var config = {
      params: queryArgs
    };

    // fetch all the form data from the server
    promises.push($http.get(baseUrl+'/settings', config).then(function (response) {
      var data = response.data;

      for (var varName in data.data) {
        var varForm = data.data[varName];
        var group = varForm.group['#id'];

        settingsForms[group] = settingsForms[group] || {};
        settingsForms[group][varName] = varForm.form;

        groupInfo[group] = varForm.group;

        settings[varName] = varForm.form['#default_value'];
      }
      return response;
    }));

    var allPromise = $q.all(promises);

    this.SettingsReady = function() {
      return allPromise;
    }

    this.GetFormDefinitions = function (group_id) {
      if (typeof settingsForms[group_id] != 'undefined') {
        return angular.copy(settingsForms[group_id]);
      }
      throw "No form group with id " + group_id + " exists.";
    }

    this.GetFormTitle = function (group_id) {
      if (typeof groupInfo[group_id] != 'undefined') {
        return groupInfo[group_id]['#title'];
      }
      throw "No form group with the id " + group_id + " exists.";
    }

    this.GetHelpLink = function (group_id) {
      if (typeof groupInfo[group_id] != 'undefined') {
        return groupInfo[group_id]['#help_link'];
      }
      throw "No form group with the id " + group_id + " exists.";
    }

    this.IsSetting = function (var_name) {
      return var_name in settings;
    }

    this.SaveSettings = function (settings, buttonName) {
      var counts = 0;
      angular.forEach(settings, function(val, key) {
        if (val == 'Submit') {
          counts++;
        }
      });
      if (counts > 1 && buttonName != '') {
        var settingsNew = {};
          angular.forEach(settings, function(val, key) {
          if (val != 'Submit' || key == buttonName) {
            settingsNew[key] = val;
          }
        });
        settings = settingsNew;
      }
      console.log(settings);

      return $http.put(baseUrl+'/settings', settings, config);
    }

  }]);

  /**
   * Open modals for the settings forms
   */
  m.directive('apSettingsForm', ['ModalService', 'apSettings', function (ModalService, apSettings) {
    var dialogOptions = {
      minWidth: 850,
      minHeight: 100,
      modal: true,
      position: 'center',
      dialogClass: 'ap-settings-form'
    };

    function link(scope, elem, attrs) {
      apSettings.SettingsReady().then(function () {
        scope.title = apSettings.GetFormTitle(scope.form);
      });

      elem.bind('click', function (e) {
        e.preventDefault();
        e.stopPropagation();

        ModalService.showModal({
          controller: 'apSettingsFormController',
          template: '<form id="{{formId}}" name="settingsForm" ng-submit="submitForm($event)">' +
            '<div class="messages" ng-show="status.length || errors.length"><div class="dismiss" ng-click="status.length = 0; errors.length = 0;">X</div>' +
              '<div class="status" ng-show="status.length > 0"><div ng-repeat="m in status track by $index"><span ng-bind-html="m"></span></div></div>' +
              '<div class="error" ng-show="errors.length > 0"><div ng-repeat="m in errors track by $index"><span ng-bind-html="m"></span></div></div></div>' +
            '</div>' +
            '<div class="form-column-wrapper column-count-{{columnCount}}" ng-if="columnCount > 1">' +
              '<div class="form-column column-{{column_key}}" ng-repeat="(column_key, elements) in columns">' +
                '<div class="form-item" ng-repeat="(key, field) in elements | weight">' +
                  '<div form-element element="field" value="formData[key]"><span>placeholder</span></div>' +
                '</div>' +
              '</div>' +
            '</div>' +
            '<div class="form-wrapper" ng-if="columnCount == 1">' +
              '<div class="form-item" ng-repeat="(key, field) in formElements | weight">' +
                '<div form-element element="field" value="formData[key]"><span>placeholder</span></div>' +
              '</div>' +
            '</div>' +
            '<div class="help-link" ng-bind-html="help_link"></div>' +
          '<div class="actions" ng-show="showSaveButton"><button type="submit" button-spinner="settings_form_save" name="save" spinning-text="Saving">Save</button><input type="button" value="Close" ng-click="close(false)"></div></form>',
          inputs: {
            form: scope.form
          }
        })
        .then(function (modal) {
          dialogOptions.title = scope.title;
          dialogOptions.close = function (event, ui) {
            modal.element.remove();
          }
          modal.element.dialog(dialogOptions);
          modal.close.then(function (result) {
            if (result) {
              window.location.reload();
            }
          });
        });
      });
    }

    return {
      link: link,
      scope: {
        form: '@'
      }
    };
  }]);
  
  /**
   * The filter for the optgroup select dropdowns.
   */
  m.filter("filterWithItems", function() {
    return function(categories, present) {
      return jQuery.grep(categories, function(category) {
        if (present) {
         return category.items != undefined
        } else {
            return category.items == undefined
        }
      });
    }
  });

  /**
   * The controller for the forms themselves
   */
  m.controller('apSettingsFormController', ['$scope', '$sce', 'apSettings', 'buttonSpinnerStatus', 'form', 'close', function ($s, $sce, apSettings, bss, form, close) {
    var formSettings = {};
    $s.formId = form;
    $s.formElements = {};
    $s.formData = {};

    $s.status = [];
    $s.errors = [];
    $s.columns = {};
    $s.columnCount = 0;
    $s.showSaveButton = true;

    apSettings.SettingsReady().then(function () {
      var settingsRaw = apSettings.GetFormDefinitions(form);
      console.log(settingsRaw);

      $s.help_link = $sce.trustAsHtml(apSettings.GetHelpLink(form));

      for (var k in settingsRaw) {
        $s.formData[k] = settingsRaw[k]['#default_value'] || null;
        var attributes = {
          name: k
        };

        var col = settingsRaw[k]['#column'] || 'default';
        if (typeof $s.columns[col] == 'undefined') {
          $s.columns[col] = {};
          $s.columnCount++;
        }
        for (var j in settingsRaw[k]) {
          if (j.indexOf('#') === 0 && (j != '#default_value' && j != '#column')) {
            var attr = j.substr(1, j.length);
            attributes[attr] = settingsRaw[k][j];
          }
        }

        if (attributes.value) {
          attributes.origValue = attributes.value;
        }

        $s.formElements[k] = $s.columns[col][k] = attributes;

        if ($s.formElements[k].type == 'submit') {
          $s.showSaveButton = false;
        }
      }
    });

    function submitForm($event) {
      var button = document.activeElement,
        triggered = false;
      var buttonId = document.activeElement.id;
      if (apSettings.IsSetting(button.getAttribute('name'))) {
        triggered = true;
      }

      var buttonName = '';
      if (button.getAttribute('name')) {
        buttonName = button.getAttribute('name');
      }
      if ($s.settingsForm.$dirty || triggered) {
        bss.SetState('settings_form_' + buttonName, true);
        apSettings.SaveSettings($s.formData, buttonName).then(function (response) {
          var body = response.data;
          sessionStorage['messages'] = JSON.stringify(body.data.messages);
          $s.status = [];
          $s.error = [];
          var close = true;
          var reload = true;
          bss.SetState('settings_form_' + buttonName, false);
          for (var i = 0; i < body.data.length; i++) {
            switch (body.data[i].type) {
              case 'no_close':
                close = false;
              case 'no_reload':
                reload = false;
                break;
              case 'message':
                $s[body.data[i].message_type].push(body.data[i].message)
            }
          }

          if (body.messages.status) {
            for (var i = 0; i < body.messages.status.length; i++) {
              if (body.messages.status[i] == 'Your updates will go live within the next 15 minutes.') {
                $s.close(reload);
              }
            }
          } else {
            if (close && !body.messages.error) {
              $s.close(reload);
            } else if (body.messages.error) {
              $s.errors = [];
              angular.forEach(body.messages.error, function(value , key) {
                $s.errors.push($sce.trustAsHtml(value));
              });
              bss.SetState('settings_form_' + buttonName, false);
            }
          }
        }, function (error) {
          $s.errors = [];
          $s.status = [];
          if (buttonId.indexOf('edit-os-importer-submit') < 0) {
            $s.errors.push("Sorry, something went wrong. Please try another time.");
          } else {
            $s.errors.push("The import failed. Please review import <a href='https://help.theopenscholar.com/importing-content' target='_blank'>best practices</a> for optimal results.");
          }
          bss.SetState('settings_form_' + buttonName, false);
        });
      }
      else {
        $s.close(false);
      }
    }
    $s.submitForm = submitForm;

    $s.close = function (arg) {
      close(arg);
    }
  }]);
})()
;
(function () {

  var m = angular.module('grouper', ['DependencyManager', 'os-buttonSpinner']);

  m.config(['DependenciesProvider', function ($depProvider) {
    $depProvider.AddDependency('formElement', 'grouper');
  }]);

  m.directive('grouper', ['$http', 'buttonSpinnerStatus', function ($http, bss) {
    var groups = [];

    var status = {
      loading: true,
    }
    bss.SetState('grouper_AllGroups', true);
    $http.get(Drupal.settings.paths.api + '/grouper').then(function (resp) {
      console.log(resp);
      status.loading = false;
      bss.SetState('grouper_AllGroups', false);
      Array.prototype.push.apply(groups, resp.data.data); // this adds group elements without creating a new array instance
    }, function (errorResp) {
      console.log(errorResp);
      status.loading = false;
      bss.SetState('grouper_AllGroups', false);
    });
    return {
      require: 'ngModel',
      scope: {
        selected: '=ngModel'
      },
      templateUrl: Drupal.settings.paths.grouper + '/grouper.template.html',
      link: function (scope, elem, attrs, ngModelController) {
        scope.status = status;
        scope.Groups = function () {
          return groups;
        }

        if (!angular.isArray(scope.selected)) {
          scope.selected = [];
        }

        scope.search = '';
        /**
         * Find a group by its unique path identifier
         * @param path
         * @returns {*}
         */
        function findGroupByPath(path) {
          for (var i = 0; i < groups.length; i++) {
            if (groups[i].name == path) {
              return groups[i];
            }
          }
        }

        /**
         * Gets or sets the panel's visibile status
         */
        var showPanel = false;
        scope.ShowPanel = function (toggle) {
          if (toggle != undefined) {
            showPanel = !showPanel;
          }

          return showPanel;
        }

        /**
         * @returns string - human-readable, comma-separated list of all selected groups, on a single line
         */
        scope.SelectedGroupNames = function () {
          var gs = groups.filter(function (g) {
            return (scope.selected.indexOf(g.name) > -1);
          });

          var names = gs.map(function (g) {
            return g.displayExtension;
          });

          return names.join(' | ');
        }

        /**
         * Returns the human readable label for a group
         */
        scope.GroupLabel = function (path) {
          var g = findGroupByPath(path);

          if (g) {
            return g.displayExtension;
          }
          return '';
        }

        /**
         *
         */
        scope.Remove = function (path) {
          var k = scope.selected.indexOf(path);
          if (k > -1) {
            scope.selected.splice(k, 1);
            ngModelController.$setDirty();
          }
        }

        /**
         *
         */
        scope.AddGroup = function (path) {
          if (scope.selected.length < 7) {
            var k = scope.selected.indexOf(path);
            if (k == -1) {
              scope.selected.push(path);
              ngModelController.$setDirty();
            }
          }
        }

        /**
         *
         */
        scope.IsGroupSelected = function (path) {
          var k = scope.selected.indexOf(path);
          return k > -1;
        }
      }
    }
  }]);
})();
;
(function(){if(!window.GSFN){window.GSFN={}}if(!GSFN.Widget){GSFN.Widget={}}if(!GSFN.WidgetConfigs){GSFN.WidgetConfigs={}}if(!GSFN.Util){GSFN.Util={}}if(!GSFN.IframeCount){GSFN.IframeCount=0}function trace(message){if(typeof window.console!=="undefined"&&window.console!==null){console.log(message)}}var XD,loader;loader=GSFN.Util.Loader={loadScript:function(src,callback){var script,body,done;script=document.createElement("script");script.setAttribute("type","text/javascript");script.setAttribute("src",src);done=false;script.onload=script.onreadystatechange=function(){if(!done&&(!this.readyState||this.readyState==="loaded"||this.readyState==="complete")){done=true;callback();script.onload=script.onreadystatechange=null}};body=document.getElementsByTagName("body")[0];if(typeof body!=="undefined"){body.appendChild(script)}return script}};var cachedOnload=window.onload,cachedJQuery=null,cached$=null,xdPath="https://d37h3y471q0lt2.cloudfront.net/assets/widget_common/lib/gsfnXD-39c450cffd67ae826846ba09ecea0c4a.js",jqueryPath="https://dv4uxy777adjt.cloudfront.net/assets/widget_common/vendor/jquery-2fb84f7357042b2d55977e7f2b008766.js",json2Path="https://dwxmyiyf7jg6.cloudfront.net/assets/widget_common/vendor/json2-a204230dc42448a09771dd71de059c67.js",jqModalPath="https://dwxmyiyf7jg6.cloudfront.net/assets/widget_common/lib/jqModal-d9bfcc8fcbecdbd4f4156f2ff4a717f3.js",isModalReady=false,cssPath="https://dv4uxy777adjt.cloudfront.net/assets/widget_common/getsat.loader-51218fd4c8c4a7c046ed1d6800cee8d5.css",tmpWidgets=[],widgetHost="https://widget.getsatisfaction.com",widgetLoaderHost="https://loader.engage.gsfn.us",widgetPathPrefix="";defaultHost="https://getsatisfaction.com";GSFN.loadWidget=function(widgetId,defaults,isPreview,completeCallback){var localWidget={};tmpWidgets.push({widgetId:widgetId,defaults:defaults,isPreview:isPreview,widgetReference:localWidget,completeCallback:completeCallback});return localWidget};GSFN.WidgetShell={destroy:function(){}};window.onload=function(){if(typeof(jQuery)!=="undefined"){cachedJQuery=jQuery;cached$=$}loader.loadScript(xdPath,function(){XD=GSFN.XD;loader.loadScript(jqueryPath,function(){jQuery.noConflict();(function($){$("<link>").appendTo("head").attr({rel:"stylesheet",type:"text/css",href:cssPath});loader.loadScript(jqModalPath,function(){GSFN.Util.jqmModalInit($);loader.loadScript(json2Path,function(){GSFN.loadWidget=function(widgetId,defaults,isPreview,completeCallback){var $container=null,$tab=null,$logo=null,defaultUrlSlug="/",pendingModalUrlSlug=defaultUrlSlug,isContainerSupplied=false,tabClass="gsfn-widget-tab",iframeInstances={};function notSupportedBrowser(){var $browser=$.browser,version=parseFloat($browser.version);return(($browser.msie&&version<=7)||($browser.mozilla&&version<2))}function showNotSupportedBrowserView($container){var ieCompatibilityHtml="",hostname=window.location.hostname;if(notSupportedBrowser()){if($.browser.msie){ieCompatibilityHtml="<p>If you are using Internet Explorer 8 or 9, you may need to disable Compatibility View.</p><p><a href='#' class='gsfn-compat-toggle'>How to disable Compatibility View</a></p><div class='gsfn-compat'>Note: if you're on a work computer, you may want to check with your network administrator first.<br><br><b>Instructions for IE8:</b><ol><li>Open the <b>Tools</b> menu at the top of your browser and select <b>Compatibility View Settings</b>.</li><li>Select <b>"+hostname+"</b> under &ldquo;Websites you've added to Compatibility View.&rdquo; If you don't see &ldquo;"+hostname+"&rdquo; listed, or if these steps don't help you resolve the problem, please make sure your computer has the latest Windows updates.</li><li>Click <b>Remove</b>.</li><li>At the bottom of the window, make sure that the box next to &ldquo;Display all websites in Compatibility View&rdquo; is <b>not checked</b>.</li><li>Click <b>Close</b>. The page you're on will refresh automatically.</li></ol><b>Instructions for IE9:</b><ol><li>Right-click on the <b>gear icon</b> in the upper right hand corner, next to the <b>&ldquo;favorites&rdquo;</b> star icon. (If you don’t see this gear icon or your &ldquo;File&rdquo; and &ldquo;Tools&rdquo; menus at the top of your window, press your F10 key to make them show.)</li><li>Select <b>Command bar</b>.</li><li>Open the <b>Tools</b> menu near the top of your browser and select <b>Compatibility View Settings</b>.</li><li>Select <b>"+hostname+"</b> under &ldquo;Websites you’ve added to Compatibility View.&rdquo; If you don’t see &ldquo;"+hostname+"&rdquo; listed, or if these steps don't help you resolve the problem, please make sure your computer has the latest Windows updates. </li><li>Click <b>Remove</b>.</li><li>At the bottom of the window, make sure that the box next to &ldquo;Display all websites in Compatibility View&rdquo; is <b>not checked</b>. </li><li>Click <b>Close</b>. The page you're on will refresh automatically.</li></ol></div>"}$container.html("<div class='gsfn-oldie-wrap'><div class='gsfn-oldie'><h1 class='gsfn-not-support-title'>Unsupported Browser</h1><p class='gsfn-not-support'>We were unable to load this content because you're using an unsupported browser. Please click on one of the links below to update your browser.</p><div class='gsfn-browsers'><a href='http://www.mozilla.org/' target='_blank' class='gsfn-browser gsfn-ff'><span class='gsfn-browser-r'><span class='gsfn-browser-lbl'>Update<br>Firefox<span class='gsfn-browser-icon gsfn-ff'></span></span></span></a><a href='http://ie.microsoft.com' target='_blank' class='gsfn-browser gsfn-ie'><span class='gsfn-browser-r'><span class='gsfn-browser-lbl'>Update<br>IE9+<span class='gsfn-browser-icon gsfn-ie'></span></span></span></a><a href='http://google.com/chrome' target='_blank' class='gsfn-browser gsfn-ch'><span class='gsfn-browser-r'><span class='gsfn-browser-lbl'>Update<br>Chrome<span class='gsfn-browser-icon gsfn-ch'></span></span></span></a></div>"+ieCompatibilityHtml+"</div></div>");$container.find(".gsfn-compat-toggle").click(function(e){e.preventDefault();$container.find(".gsfn-compat").toggle()});return true}return false}function initialize(){trace("[GSFN.Widget.initialize] "+widgetId+" -- jquery version: "+$().jquery);processDefaults();if(notSupportedBrowser()&&defaults.position!=="inline"){return}if(defaults.disabled===true){return}if(defaults.showModalOnLoad){api.showModal()}else{switch(defaults.position){case"link":addLink(defaults);break;case"inline":addIFrame($("#"+defaults.containerId),false);break;default:addTab(defaults)}}}function addIFrame($iframeContainer,isModal){isContainerSupplied=($iframeContainer!==undefined&&$iframeContainer.length>0);$container=isContainerSupplied?$iframeContainer:$('<div class="gsfn-widget-container">');if(!showNotSupportedBrowserView($container)){addIFrameToContainer($container,defaultUrlSlug,isModal)}if(!isContainerSupplied){$container.appendTo("body")}}var getIframeURL=function getIframeURL(urlSlug,iframeId,isModal){var urlParts=[];urlParts.push(widgetHost+"/widget/launch?90e376c#");if(isPreview===true){urlParts.push("/preview")}else{urlParts.push("/"+window.escape(encodeURIComponent(widgetLoaderHost+"/widgets/"+widgetId+".js")))}urlParts.push(urlSlug);if(isModal){urlParts.push("modal/")}urlParts.push("parent/"+window.escape(encodeURIComponent(document.location.href)));urlParts.push("/iframeId/"+iframeId);if(isPreview===true){urlParts.push("/defaults/postMessage")}else{urlParts.push("/defaults/"+window.escape(encodeURIComponent(JSON.stringify({}))))}return urlParts.join("")};function cacheIframeURL(iframeId,iframeUrl,isModal){iframeInstances[iframeId]={id:iframeId,src:iframeUrl}}function addIFrameToContainer($iframeContainer,urlSlug,isModal){var iframeId=("gsfn-iframe-"+GSFN.IframeCount),iframePath=getIframeURL(urlSlug,iframeId,isModal);GSFN.IframeCount=GSFN.IframeCount+1;cacheIframeURL(iframeId,iframePath,isModal);$('<iframe id="'+iframeId+'" height="425" width="'+$iframeContainer.css("width")+'" class="gsfn-iframe" src="'+iframePath+'" frameBorder="0">').appendTo($iframeContainer);if(isModal){if($logo===null){$logo=$('<a href="http://www.getsatisfaction.com/" target="_blank" id="getsat-widget-logo">Powered By Get Satisfaction</a>');if(defaults.logoColor!==undefined&&defaults.logoColor!==null){$logo.addClass(defaults.logoColor)}}if($iframeContainer.find("#getsat-widget-logo").length===0){$iframeContainer.append($logo)}}XD.receiveMessage(receivePostMessage)}function addTab(settings){var container=$("body"),timeout,ieAbsolutePositioning=($.browser.msie&&(parseInt($.browser.version,10)===8));if(ieAbsolutePositioning){tabClass+=" ie8"}$tab=$('<div class="'+tabClass+" gsfn-"+settings.position+'">'+settings.tabName+"</div>").appendTo(container);$tab.css({backgroundColor:settings.tabBackgroundColor,color:settings.tabFontColor,borderColor:settings.tabBorderColor,fontFamily:settings.tabFont});var position=function(){if(ieAbsolutePositioning){clearTimeout(timeout)}if(settings.position==="bottom"){$tab.css("marginLeft",-($tab.outerWidth()/2)+"px")}else{if(ieAbsolutePositioning){$tab.css("top",($(window).scrollTop()+$(window).height()/3)+"px");if(settings.position==="right"){$tab.css("right",-1*($tab.outerHeight()-$tab.outerWidth()))}}else{if(settings.position==="left"){$tab.css("top",(($(window).height()/2)+($tab.width()/2))+"px")}else{if(settings.position==="right"){$tab.css("top",(($(window).height()/2)+($tab.width()/2)-$tab.outerWidth()-$tab.outerHeight())+"px")}}}}};position();$(window).resize(position);if(ieAbsolutePositioning){$(window).scroll(function(){clearTimeout(timeout);timeout=setTimeout(position,100)})}$tab.bind("click",function(e){e.preventDefault();api.showModal()})}function addLink(settings){$link=$('<a href="#" class="widget-link">Support</a>');if(settings.containerId!==undefined&&settings.containerId!==null&&$("#"+settings.containerId).length>0){$link.appendTo("#"+settings.containerId)}else{$link.appendTo("body")}$link.bind("click",function(e){e.preventDefault();api.showModal()})}function processDefaults(){defaults=defaults||{position:"inline"};if(!/inline|bottom|right|link/.test(defaults.position)){defaults.position="left"}if(defaults.locale===undefined){defaults.locale="en"}}function sendMessageToIframe(iframeInstance,message){var iframe=document.getElementById(iframeInstance.id);XD.postMessage(JSON.stringify(message),iframeInstance.src,iframe.contentWindow)}function openAuthIframe(domain,iframeInstance){var parent_url=window.escape(window.postMessage?(window.location.protocol+"//"+window.location.host):window.location.href),$authOverlay,$authFrame,authHTML;$(".gsfn-auth-overlay").remove();$authOverlay=$("<div class='gsfn-auth-overlay'><iframe height='172' width='745' frameBorder='0'></iframe><a href='#' class='gsfn-jqmClose'></a></div>").appendTo("body");$authOverlay.jqm({modal:true,toTop:true,closeClass:"gsfn-jqmClose",overlayClass:"gsfn-jqmOverlay"});$authOverlay.find(".gsfn-jqmClose").unbind("click.postMessage").bind("click.postMessage",function(){sendMessageToIframe(iframeInstance,{type:"authentication",status:"Cancelled"})});$authFrame=$authOverlay.find("iframe");$authFrame.prop("src",defaultHost+"/auth/widget?locale="+defaults.locale+"&parent_url="+parent_url+"#"+domain+"/login");$authOverlay.jqmShow();XD.receiveMessage(function(e){var msg=JSON.parse(window.postMessage?e.data:e.data.match(/^\{.*\}/)[0]),newHeight,maxHeightForOverlay,overlayOffset;if(msg.status==="Accepted"){setTimeout(function(){$authOverlay.jqmHide()},1500);sendMessageToIframe(iframeInstance,msg)}else{if(msg.height){newHeight=parseInt(msg.height,10);overlayOffset=parseInt($authOverlay.css("top"),10);if($authOverlay.css("position")==="fixed"){maxHeightForOverlay=$(window).height()-overlayOffset-($authOverlay.outerHeight()-$authOverlay.height())-parseInt(overlayOffset/4);if(newHeight>maxHeightForOverlay){newHeight=maxHeightForOverlay}}$authFrame.height(newHeight)}}},defaultHost)}function receivePostMessage(messageEvent){var messageData=messageEvent.data,messageParts=messageData.split("/"),messageType=messageParts[2],incomingIframeId=messageParts.pop(),showIframe=false,iframeInstance=iframeInstances[incomingIframeId];if(!iframeInstance){return}messageData=messageParts[3];switch(messageType){case"topics":pendingModalUrlSlug="/topics/"+messageData+"/";if(messageParts[4]&&messageParts[4].indexOf("gsfn-iframe-")===-1){pendingModalUrlSlug+=messageParts[4]+"/"}showIframe=true;break;case"thread":pendingModalUrlSlug="/thread/"+messageData+"/";showIframe=true;break;case"scrollTo":$("#"+incomingIframeId).parents().each(function(index,elem){if(elem.clientHeight<elem.scrollHeight){var $elem=$(elem);if(elem.tagName=="body"){$elem=$elem.add("html")}$elem.animate({scrollTop:messageData},300);return false}});break;case"search":break;case"requestConfiguration":sendMessageToIframe(iframeInstance,{type:"sendConfiguration",data:defaults});break;case"navigate":switch(messageData){case"detail":$("a.gsfn-jqmClose").addClass("subView");break;case"thread":$("a.gsfn-jqmClose").addClass("subView");break;case"inline":$("a.gsfn-jqmClose").click();default:$("a.gsfn-jqmClose").removeClass("subView");break}break;case"auth":openAuthIframe(messageData,iframeInstance);break;case"resize":$("#"+incomingIframeId).css("height",parseInt(messageParts[3])+"px");break;case"loginFlowComplete":if($.browser.msie){$('<input type="text">').prependTo(document.body).focus().remove()}break}if(showIframe){api.showModal()}}var api={$modal:null,isModalShowing:false,showModal:function(){if(this.isModalShowing){return false}this.isModalShowing=true;if(this.$modal===null){this.$modal=$('<div class="gsfn-modal"><a class="gsfn-jqmClose">Close</a><div class="gsfn-jqmContent"></div></div>');this.$modal.appendTo("body");var that=this;this.$modal.jqm({modal:true,overlay:60,toTop:true,overlayClass:"gsfn-jqmOverlay",onShow:function(hash){hash.o.show();hash.o.bind("click",function(e){hash.w.jqmHide()});hash.w.show()},onHide:function(modal){if(that.isModalShowing){that.isModalShowing=false;that.$modal.find("iframe").remove();that.$modal.find("#getsat-widget-logo").remove();modal.w.hide();modal.o.unbind("click");modal.o.remove();return true}return false}}).jqmAddClose(".gsfn-jqmClose")}this.$modal.jqmShow();addIFrameToContainer(this.$modal.find(".gsfn-jqmContent"),pendingModalUrlSlug,true)},destroy:function(){trace("[GSFN.Widget.destroy] "+widgetId);if($tab!==null){$tab.unbind("click");$tab.remove()}if($container!==null&&isContainerSupplied){$container.html("")}else{if($container!==null&&!isContainerSupplied){$container.remove()}}if(this.$modal!==null){}}};function bootstrapConfig(widgetId){defaults=$.extend(GSFN.WidgetConfigs[widgetId],defaults);initialize();GSFN.WidgetShell.add(api);if(completeCallback!==undefined){completeCallback(api,$tab,$container)}return api}if(typeof widgetId!=="undefined"&&widgetId!==null){var url=widgetLoaderHost+"/widgets/"+widgetId+".js";$.ajax(url,{dataType:"jsonp",jsonpCallback:"startWidget"+widgetId,success:function(data){GSFN.WidgetConfigs[widgetId]=data;bootstrapConfig(widgetId)}})}else{GSFN.WidgetConfigs[defaults.containerId]=defaults;bootstrapConfig(widgetId)}};GSFN.WidgetShell=function(){var widgets=[],api={add:function(widget){widgets.push(widget);return this},initialize:function(){trace("[GSFN.Widget.Shell.initialize]")},destroy:function(){for(var i=0,max=widgets.length;i<max;i+=1){widgets[i].destroy()}widgets=[]}};return api}();for(var i=0,max=tmpWidgets.length;i<max;i+=1){var widget=tmpWidgets[i];widget.widgetReference=GSFN.loadWidget(widget.widgetId,widget.defaults,widget.isPreview)}GSFN.WidgetShell.initialize();if(cachedOnload){cachedOnload()}})})})(jQuery);if(cachedJQuery!==null){jQuery=cachedJQuery;$=cached$}})})}})();
;/* upload time: Thu Jul 26 13:01:26 +0000 2018 */;;
(function () {
  var m = angular.module('ActiveUser', []);

  m.service('ActiveUserService', ['$http', '$q', function ($http, $q) {
    var user = {
      uid: Drupal.settings.user.uid,
      name: Drupal.settings.user.name,
      permissions: {}
    };
    var restPath = Drupal.settings.paths.api;

    var deferred;
    this.init = function () {
      deferred = $q.defer();
      $http.get(restPath+'/users/'+user.uid).then(function (resp) {
        user = resp.data.data[0];
        deferred.resolve(angular.copy(user));
      });
    };

    this.getUser = function (callback) {
      deferred.promise.then(callback);
    };
    this.init();

  }]);
})();;
(function () {
  var rootPath, paths, defaultIndividualScholar, defaultProjectLabSmallGroup, defaultDepartmentSchool;

  var m = angular.module('SiteCreationForm', ['angularModalService', 'ngMessages', 'os-buttonSpinner', 'os-auth', 'ActiveUser', 'DependencyManager', 'ngSanitize'])
  .config(function (){
    rootPath = Drupal.settings.paths.siteCreationModuleRoot;
    paths = Drupal.settings.paths;
    defaultIndividualScholar = Drupal.settings.site_creation.default_individual_scholar;
    defaultProjectLabSmallGroup = Drupal.settings.site_creation.default_project_lab_small_group;
    defaultDepartmentSchool = Drupal.settings.site_creation.default_department_school;
  });

  m.run(['Dependencies', function (dm) {
    var deps = dm.GetDependencies('UserPanel');
    Array.prototype.push.apply(m.requires, deps);
  }]);

  m.service('passwordStrength', [function () {
    var tests = [/[0-9]/, /[a-z]/, /[A-Z]/, /[^A-Z-0-9]/i];
    this.checkStrength = function(pass) {
      if (pass == null) {
        return -1;
      }
      var s = 0;
      if (pass.length < 6) {
        return 0;
      }
      for (var i in tests) {
        if (tests[i].test(pass)) {
          s++;
        }
      }
      return s;
    }
  }]);

  m.controller('siteCreationCtrl', ['$scope', '$http', '$q', '$rootScope', 'buttonSpinnerStatus', '$filter', '$sce', '$timeout', 'passwordStrength', 'authenticate-token', 'ActiveUserService', 'parent', function($scope, $http, $q, $rootScope, bss, $filter, $sce, $timeout, ps, at, aus, parent) {

  //Set default value for vsite
  $scope.vsite_private = {
    value: '0'
  };
  $scope.privacyLevels = Drupal.settings.site_creation.privacy_levels;
  $scope.trustAsHtml = function (arg) {
    return $sce.trustAsHtml(arg);
  }

  var user;
  aus.getUser(function (u) {
    user = u;

    var types = {
        'create personal content': true,
        'create project content': true,
        'create department content': true
      },
      typecount = 0;
    for (var perm in user.permissions) {
      if (types[perm] != undefined) {
        if (user.permissions[perm]) {
          typecount++;
        }
        types[perm] = user.permissions[perm];
      }
    }
    if (typecount == 1) {
      for (perm in user.permissions) {
        if (types[perm]) {
          switch (perm) {
            case 'create personal content':
              $scope.display = 'individualScholar';
              break;
            case 'create project content':
              $scope.display = 'projectLabSmallGroup';
              break;
            case 'create department content':
              $scope.display = 'department';
              break;
          }
        }
      }
    }
  });

  // Set site creation status
  $scope.siteCreated = false;
  $scope.tos = Drupal.settings.site_creation.tos_url;
  $scope.tos_label = Drupal.settings.site_creation.tos_label;

  var presetList = Drupal.settings.site_creation.presets;
  $scope.presets = function (type) {
    var output = [];
    for (var i in presetList) {
      if (presetList[i].site_type == type) {
        output.push(presetList[i]);
      }
    }
    return output;
  };

  // Initialize the $timout var
  var timer;

  //Toggle open/close for 'who can view your site'
  $scope.showAll = false;
  $scope.toggleFunc = function() {
    $scope.showAll = !$scope.showAll;
  };

  //Reset value for other 'Type of site' based on selection
  $scope.clearRest = function(field) {
    if (field != 'individualScholar') {
      $scope.individualScholar = null;
    }
    if (field != 'projectLabSmallGroup') {
      $scope.projectLabSmallGroup = null;
    }
    if (field != 'departmentSchool') {
      $scope.departmentSchool = null;
    }
  };

  //Set status of next button to disabled initially
  $scope.btnDisable = true;
  $scope.vicariousUser = Drupal.settings.paths.hasOsId;
  $scope.siteNameValid = false;
  $scope.newUserResistrationEmail = false;
  $scope.newUserResistrationName = false;
  $scope.newUserResistrationPwd = false;
  $scope.newUserValidPwd = false;
  $scope.newUserResistrationPwdMatch = false;
  $scope.tosChecked = !$scope.tos;  // circumvent if no tos was provided by site

  //Navigate between screens
  $scope.page1 = true;
  $scope.navigatePage = function(pagefrom, pageto) {
    $scope[pagefrom] = false;
    $scope[pageto] = true;
    if (pagefrom == 'page1' && pageto == 'page2') {
      if ($scope.individualScholar != null) {
        $scope.contentOption = {
          value: defaultIndividualScholar
        };
      } else if ($scope.projectLabSmallGroup != null) {
         $scope.contentOption = {
          value: defaultProjectLabSmallGroup
        };
      } else {
        $scope.contentOption = {
          value: defaultDepartmentSchool
        };
      }
    } else if (pagefrom == 'page2' && pageto == 'page3') {
      var featuredThemeTop = angular.element(document.querySelectorAll('.featured-scrolltop')).position().top;
      featuredThemeTop = featuredThemeTop > 0 ? featuredThemeTop : 650;
      angular.element(document.querySelectorAll('#body-container-page3')).animate({ scrollTop: featuredThemeTop + 200}, 200);
    }
  };

  $scope.canBeCreated = function (type) {
    if (user && !user.permissions['create ' +type+' content']) {
      return false;
    }

    if (!parent) {
      return true;
    }

    return Drupal.settings.site_creation.subsite_types[type] != undefined;
  };

  var queryArgs = {};
  if (Drupal.settings.spaces != undefined) {
    if (Drupal.settings.spaces.id) {
      queryArgs.vsite = Drupal.settings.spaces.id;
    }
  }
  var config = {
    params: queryArgs
  };
  $http.get(paths.api+'/themes', config).then(function (response) {
    $scope.themes = response.data.data;
  });
  $scope.selected = false;
  $scope.selectedOption = {key: 'default'};
  $scope.setTheme = function(themeKey, flavorKey) {
    $scope.selected = themeKey + '-os_featured_flavor-' + flavorKey;
  };

  $scope.changeSubTheme = function(item, themeKey) {
    angular.forEach($scope.themes.others, function(value, key) {
      if (value.themeKey == themeKey) {
        $scope.themes.others[key].flavorKey = item.key;
        angular.forEach(value.flavorOptions, function(v, k) {
          if (v.key == item.key) {
            if (v.screenshot.indexOf('png') > -1) {
              $scope.themes.others[key].screenshot = v.screenshot;
            } else {
              $scope.themes.others[key].screenshot = $scope.themes.others[key].defaultscreenshot;
            }
          }
        });
      }
    });
  };

  $scope.navigateToSite = function() {
    window.location.href = $scope.vsiteUrl;
  };

  //Set default value for Content Option
  $scope.contentOption = {
    value: 'os_department_minimal'
  };
  $scope.selected = 'hwpi_classic-os_featured_flavor-default';
  //Site URL
  $scope.baseURL = Drupal.settings.admin_panel.purl_base_domain + '/';

  //Get all values and save them in localstorage for use
  $scope.saveAllValues = function() {
    bss.SetState('site_creation_form', true);
    $timeout.cancel(timer);

    $scope.btnDisable = true;
    var url = $scope.individualScholar ? $scope.individualScholar : ($scope.projectLabSmallGroup ? $scope.projectLabSmallGroup : $scope.departmentSchool),
      bundle = $scope.individualScholar ? 'personal' : ($scope.projectLabSmallGroup ? 'project' : 'department'),
      theme = $scope.selected;

    var user = {};
    if (Drupal.settings.user_panel != undefined) {
      // existing user who came to the page logged in
      user.uid = Drupal.settings.user_panel.user.uid;
    }
    else if ($scope.vicariousUser) {
      // brand new user
      user.first_name = $scope.fname;
      user.last_name = $scope.lname;
      user.mail = $scope.email;
      user.name = $scope.userName;
      user.password = $scope.confirmPwd;

      $scope.submitStateText = 'User Information...';
      $http.post(Drupal.settings.paths.api+'/users', user).then(function (response) {
        // we were just logged in. We need to fetch the RESTful authentication token
        at.fetch().then (function (resp) {
          submitGroup(response.data.data.id, url, bundle, $scope.contentOption.value, theme, $scope.vsite_private.value);
          return resp;
        });
      });
    }

    if (user.uid) {
      submitGroup(user.uid, url, bundle, $scope.contentOption.value, theme, $scope.vsite_private.value)
    }

    // var formdata = {
    //   individualScholar: $scope.individualScholar,
    //   projectLabSmallGroup: $scope.projectLabSmallGroup,
    //   departmentSchool: $scope.departmentSchool,
    //   vsite_private: $scope.vsite_private.value,
    //   contentOption: $scope.contentOption.value,
    //   vicarious_user: $scope.vicariousUser,
    //   name: $scope.userName,
    //   first_name: $scope.fname,
    //   last_name: $scope.lname,
    //   mail: $scope.email,
    //   password: $scope.confirmPwd,
    //  };
    //
    // // Send the theme key
    // if (typeof $scope.selected !== 'undefined') {
    //   formdata['themeKey'] = $scope.selected;
    // }
    // $http.post(paths.api + '/purl', formdata).then(function (response) {
    //   $scope.successData = response.data.data.data;
    //   $scope.vsiteUrl = response.data.data.data;
    //   $scope.siteCreated = true;
    //   bss.SetState('site_creation_form', false);
    // });
  };

  function submitGroup(owner, url, bundle, starter, theme, privacy) {
    var fields = {
      owner: owner,
      label: url,
      type: bundle,
      purl: url,
      preset: starter,
      theme: theme,
      privacy: privacy
    };
    if (parent) {
      fields.parent = parent;
    }
    $http.post(Drupal.settings.paths.api+'/group', fields).then(function (response) {
      if (response.data.data[0].id != undefined) {
        bss.SetState('site_creation_form', false);
        $scope.submitSuccess = true;
        $scope.submitting = false;
        $scope.submitted = true;
        $scope.siteCreated = true;
        if (response.data['batch-id']) {
          var link = document.createElement('a');
          link.href = response.data.data[0].url;

          document.cookie = 'has_js=1;domain='+link.hostname+'path=/';
          $scope.vsiteUrl = response.data.data[0].url + '/batch?id=' + response.data['batch-id'] + '&op=start';
        } else {
          $scope.vsiteUrl = response.data.data[0].url;
        }
      }
      // gotta figure out what an error looks like
    }, function (errorResponse) {
      bss.SetState('site_creation_form', false);
      $scope.submitError = errorResponse.data.title;
      $scope.submtitted = true;
      $scope.submitting = false;
    });
  }

  $scope.checkUserName = function() {
    $scope.newUserResistrationName = false;
    if (typeof $scope.userName !== 'undefined' && $scope.userName != '') {
      var formdata = {
        name: $scope.userName
      };
      $http.post(paths.api + '/purl/name', formdata).then(function (response) {
        if (response.data.data.length == 0) {
          $scope.showUserError = false;
          $scope.userErrorMsg = '';
          $scope.newUserResistrationName = true;
        } else {
          $scope.showUserError = true;
          $scope.userErrorMsg = $sce.trustAsHtml(response.data.data[0]);
        }
      });
    }
    $scope.isCompletedRes();
  };

  $scope.checkEmail = function() {
    $scope.newUserResistrationEmail = false;
    if (typeof $scope.email !== 'undefined' && $scope.email != '') {
      var formdata = {
        email: $scope.email
      };
      $http.post(paths.api + '/purl/email', formdata).then(function (response) {
        if (response.data.data.length == 0) {
          $scope.showEmailError = false;
          $scope.emailErrorMsg = '';
          $scope.newUserResistrationEmail = true;
        } else {
          $scope.showEmailError = true;
          $scope.emailErrorMsg = $sce.trustAsHtml(response.data.data[0]);
        }
      });
    }
    $scope.isCompletedRes();
  };

  $scope.checkPwd = function() {
    $scope.newUserResistrationPwd = false;
    if (typeof $scope.password !== 'undefined' && $scope.password != '') {
      var formdata = {
        password: $scope.password
      };
      $http.post(paths.api + '/purl/pwd', formdata).then(function (response) {
        if (response.data.data.length == 0) {
          $scope.showPwdError = false;
          $scope.pwdErrorMsg = '';
          $scope.newUserResistrationPwd = true;
        } else {
          $scope.showPwdError = true;
          $scope.pwdErrorMsg = $sce.trustAsHtml(response.data.data[0]);
        }
      });
    }
    $scope.isCompletedRes();
  };

  $scope.isCompletedRes = function() {
    timer = $timeout(function () {
      if ($scope.newUserResistrationEmail && $scope.newUserResistrationName && $scope.newUserValidPwd && $scope.newUserResistrationPwd && $scope.siteNameValid && $scope.newUserResistrationPwdMatch) {
        $scope.btnDisable = false;
      } else {
        $scope.btnDisable = true;
      }
    }, 2000);
  };

  $scope.validateForms = function() {
      return $scope.btnDisable || !$scope.tosChecked;
  };

  $scope.score = function() {
    $scope.newUserValidPwd = false;
    var pwdScore = ps.checkStrength($scope.password);
    if (pwdScore < 1 ) {
      $scope.strength = "At least 6 characters";
    } else if (pwdScore == 1) {
      $scope.strength = "Weak";
    } else if (pwdScore == 2) {
      $scope.strength = "Good";
    } else if (pwdScore == 3) {
      $scope.strength = "Fair";
    } else if (pwdScore > 3) {
      $scope.strength = "Strong";
    }
    if (pwdScore > 0) {
      $scope.newUserValidPwd = true;
    }
    return pwdScore;
  };

 $scope.pwdMatch = function() {
  $scope.newUserResistrationPwdMatch = false;
  if (typeof $scope.password !== 'undefined' && $scope.password != '') {
    if (angular.equals($scope.password, $scope.confirmPwd)) {
      $scope.newUserResistrationPwdMatch = true;
      $scope.isCompletedRes();
      return 'yes';
    } else {
      return 'no';
    }
  } else {
    return '';
  }
 }
}]);
  /**
   * Open modals for the site creation forms
   */
  m.directive('siteCreationForm', ['ModalService', '$rootScope', function (ModalService,$rootScope) {
    var dialogOptions = {
      minWidth: 900,
      minHeight: 300,
      modal: true,
      position: 'center',
      dialogClass: 'site-creation-form'
    };

    function link(scope, elem, attrs) {
      elem.bind('click', function (e) {
        e.preventDefault();
        e.stopPropagation();
        $rootScope.siteCreationFormId = attrs.id;

        openModal(scope);
      });

      if (scope.autoOpen) {
        openModal(scope);
      }

      function openModal(scope) {
        ModalService.showModal({
          controller: 'siteCreationCtrl',
          templateUrl: rootPath + '/templates/os_site_creation.html',
          inputs: {
            form: scope.form,
            parent: scope.parent
          }
        })
        .then(function (modal) {
          dialogOptions.title = scope.title;
          dialogOptions.close = function (event, ui) {
            modal.element.remove();
          };
          modal.element.dialog(dialogOptions);
          modal.close.then(function (result) {
            if (result) {
              window.location.reload();
            }
          });
        });
      }
    }

    return {
      link: link,
      scope: {
        form: '@',
        autoOpen: '@?',
        parent: '@'
      }
    };
  }]);

//Validate form for existing site names
  m.directive('formcheckDirective', ['$http', function($http) {
  var responseData;
  return {
    require: 'ngModel',
    link: function(scope, element, attr, siteCreationCtrl) {
      function formValidation(ngModelValue) {
        siteCreationCtrl.$setValidity('isinvalid', true);
        siteCreationCtrl.$setValidity('sitename', true);
        siteCreationCtrl.$setValidity('permission', true);
        scope.btnDisable = true;
        var baseUrl = Drupal.settings.paths.api;
        if(ngModelValue){
          //Ajax call to get all existing sites
          $http.get(baseUrl + '/purl/' + encodeURIComponent(ngModelValue)).then(function mySuccess(response) {
            responseData = response.data.data;
            if (responseData.msg == "Not-Permissible") {
              siteCreationCtrl.$setValidity('permission', false);
              siteCreationCtrl.$setValidity('isinvalid', true);
              siteCreationCtrl.$setValidity('sitename', true);
              scope.btnDisable = true;
              scope.siteNameValid = false;
            }
            else if (responseData.msg == "Invalid"){
              siteCreationCtrl.$setValidity('permission', true);
              siteCreationCtrl.$setValidity('isinvalid', false);
              siteCreationCtrl.$setValidity('sitename', true);
              scope.btnDisable = true;
              scope.siteNameValid = false;
            }
            else if (responseData.msg == "Not-Available") {
              siteCreationCtrl.$setValidity('permission', true);
              siteCreationCtrl.$setValidity('isinvalid', true);
              siteCreationCtrl.$setValidity('sitename', false);
              scope.btnDisable = true;
              scope.siteNameValid = false;
            }
            else{
              siteCreationCtrl.$setValidity('permission', true);
              siteCreationCtrl.$setValidity('isinvalid', true);
              siteCreationCtrl.$setValidity('sitename', true);
              scope.siteNameValid = true;
              if (scope.vicariousUser) {
                scope.isCompletedRes();
              } else {
                scope.btnDisable = false;
              }
            }
          }, function (response) {
            // this triggers if the entered URL has a slash or backslash in it
            if (response.status == 404 || response.status == -1) {
              siteCreationCtrl.$setValidity('permission', true);
              siteCreationCtrl.$setValidity('isinvalid', false);
              siteCreationCtrl.$setValidity('sitename', true);
              scope.btnDisable = true;
              scope.siteNameValid = false;
            }
            else {
              // error on server end
            }
          });
        }
        return ngModelValue;
      }
      siteCreationCtrl.$parsers.push(formValidation);
    }
  };
}]);
jQuery(document).ready(function(){
  var highestBox = 0;
  jQuery('.starter-content .form-item').each(function(){
    if (jQuery(this).height() > highestBox) {
      highestBox = jQuery(this).height();
    }
  });
  jQuery('.starter-content .form-item').height(highestBox);

});

})();


;
/*
 AngularJS v1.5.0-rc.0
 (c) 2010-2015 Google, Inc. http://angularjs.org
 License: MIT
*/
(function(A,d,B){'use strict';function l(){return["$animate",function(v){return{restrict:"AE",transclude:"element",priority:1,terminal:!0,require:"^^ngMessages",link:function(n,r,a,b,m){var k=r[0],f,p=a.ngMessage||a.when;a=a.ngMessageExp||a.whenExp;var d=function(a){f=a?w(a)?a:a.split(/[\s,]+/):null;b.reRender()};a?(d(n.$eval(a)),n.$watchCollection(a,d)):d(p);var e,q;b.register(k,q={test:function(a){var g=f;a=g?w(g)?0<=g.indexOf(a):g.hasOwnProperty(a):void 0;return a},attach:function(){e||m(n,function(a){v.enter(a,
null,r);e=a;var g=e.$$attachId=b.getAttachId();e.on("$destroy",function(){e&&e.$$attachId===g&&(b.deregister(k),q.detach())})})},detach:function(){if(e){var a=e;e=null;v.leave(a)}}})}}}]}var w=d.isArray,x=d.forEach,y=d.isString,z=d.element;d.module("ngMessages",[]).directive("ngMessages",["$animate",function(d){function n(a,b){return y(b)&&0===b.length||r(a.$eval(b))}function r(a){return y(a)?a.length:!!a}return{require:"ngMessages",restrict:"AE",controller:["$element","$scope","$attrs",function(a,
b,m){function k(a,b){for(var c=b,f=[];c&&c!==a;){var h=c.$$ngMessageNode;if(h&&h.length)return e[h];c.childNodes.length&&-1==f.indexOf(c)?(f.push(c),c=c.childNodes[c.childNodes.length-1]):c=c.previousSibling||c.parentNode}}var f=this,p=0,l=0;this.getAttachId=function(){return l++};var e=this.messages={},q,s;this.render=function(g){g=g||{};q=!1;s=g;for(var e=n(b,m.ngMessagesMultiple)||n(b,m.multiple),c=[],k={},h=f.head,p=!1,l=0;null!=h;){l++;var t=h.message,u=!1;p||x(g,function(a,c){!u&&r(a)&&t.test(c)&&
!k[c]&&(u=k[c]=!0,t.attach())});u?p=!e:c.push(t);h=h.next}x(c,function(a){a.detach()});c.length!==l?d.setClass(a,"ng-active","ng-inactive"):d.setClass(a,"ng-inactive","ng-active")};b.$watchCollection(m.ngMessages||m["for"],f.render);this.reRender=function(){q||(q=!0,b.$evalAsync(function(){q&&s&&f.render(s)}))};this.register=function(g,b){var c=p.toString();e[c]={message:b};var d=a[0],h=e[c];f.head?(d=k(d,g))?(h.next=d.next,d.next=h):(h.next=f.head,f.head=h):f.head=h;g.$$ngMessageNode=c;p++;f.reRender()};
this.deregister=function(b){var d=b.$$ngMessageNode;delete b.$$ngMessageNode;var c=e[d];(b=k(a[0],b))?b.next=c.next:f.head=c.next;delete e[d];f.reRender()}}]}}]).directive("ngMessagesInclude",["$templateRequest","$document","$compile",function(d,n,l){return{restrict:"AE",require:"^^ngMessages",link:function(a,b,m){var k=m.ngMessagesInclude||m.src;d(k).then(function(d){l(d)(a,function(a){b.after(a);a=z(n[0].createComment(" ngMessagesInclude: "+k+" "));b.after(a);b.remove()})})}}}]).directive("ngMessage",
l()).directive("ngMessageExp",l())})(window,window.angular);
//# sourceMappingURL=angular-messages.min.js.map;
/* Modernizr 2.8.1 (Custom Build) | MIT & BSD
 * Build: http://modernizr.com/download/#-csstransitions-shiv-cssclasses-prefixed-testprop-testallprops-domprefixes-load
 */
;window.Modernizr=function(a,b,c){function x(a){j.cssText=a}function y(a,b){return x(prefixes.join(a+";")+(b||""))}function z(a,b){return typeof a===b}function A(a,b){return!!~(""+a).indexOf(b)}function B(a,b){for(var d in a){var e=a[d];if(!A(e,"-")&&j[e]!==c)return b=="pfx"?e:!0}return!1}function C(a,b,d){for(var e in a){var f=b[a[e]];if(f!==c)return d===!1?a[e]:z(f,"function")?f.bind(d||b):f}return!1}function D(a,b,c){var d=a.charAt(0).toUpperCase()+a.slice(1),e=(a+" "+n.join(d+" ")+d).split(" ");return z(b,"string")||z(b,"undefined")?B(e,b):(e=(a+" "+o.join(d+" ")+d).split(" "),C(e,b,c))}var d="2.8.0",e={},f=!0,g=b.documentElement,h="modernizr",i=b.createElement(h),j=i.style,k,l={}.toString,m="Webkit Moz O ms",n=m.split(" "),o=m.toLowerCase().split(" "),p={},q={},r={},s=[],t=s.slice,u,v={}.hasOwnProperty,w;!z(v,"undefined")&&!z(v.call,"undefined")?w=function(a,b){return v.call(a,b)}:w=function(a,b){return b in a&&z(a.constructor.prototype[b],"undefined")},Function.prototype.bind||(Function.prototype.bind=function(b){var c=this;if(typeof c!="function")throw new TypeError;var d=t.call(arguments,1),e=function(){if(this instanceof e){var a=function(){};a.prototype=c.prototype;var f=new a,g=c.apply(f,d.concat(t.call(arguments)));return Object(g)===g?g:f}return c.apply(b,d.concat(t.call(arguments)))};return e}),p.csstransitions=function(){return D("transition")};for(var E in p)w(p,E)&&(u=E.toLowerCase(),e[u]=p[E](),s.push((e[u]?"":"no-")+u));return e.addTest=function(a,b){if(typeof a=="object")for(var d in a)w(a,d)&&e.addTest(d,a[d]);else{a=a.toLowerCase();if(e[a]!==c)return e;b=typeof b=="function"?b():b,typeof f!="undefined"&&f&&(g.className+=" "+(b?"":"no-")+a),e[a]=b}return e},x(""),i=k=null,function(a,b){function l(a,b){var c=a.createElement("p"),d=a.getElementsByTagName("head")[0]||a.documentElement;return c.innerHTML="x<style>"+b+"</style>",d.insertBefore(c.lastChild,d.firstChild)}function m(){var a=s.elements;return typeof a=="string"?a.split(" "):a}function n(a){var b=j[a[h]];return b||(b={},i++,a[h]=i,j[i]=b),b}function o(a,c,d){c||(c=b);if(k)return c.createElement(a);d||(d=n(c));var g;return d.cache[a]?g=d.cache[a].cloneNode():f.test(a)?g=(d.cache[a]=d.createElem(a)).cloneNode():g=d.createElem(a),g.canHaveChildren&&!e.test(a)&&!g.tagUrn?d.frag.appendChild(g):g}function p(a,c){a||(a=b);if(k)return a.createDocumentFragment();c=c||n(a);var d=c.frag.cloneNode(),e=0,f=m(),g=f.length;for(;e<g;e++)d.createElement(f[e]);return d}function q(a,b){b.cache||(b.cache={},b.createElem=a.createElement,b.createFrag=a.createDocumentFragment,b.frag=b.createFrag()),a.createElement=function(c){return s.shivMethods?o(c,a,b):b.createElem(c)},a.createDocumentFragment=Function("h,f","return function(){var n=f.cloneNode(),c=n.createElement;h.shivMethods&&("+m().join().replace(/[\w\-]+/g,function(a){return b.createElem(a),b.frag.createElement(a),'c("'+a+'")'})+");return n}")(s,b.frag)}function r(a){a||(a=b);var c=n(a);return s.shivCSS&&!g&&!c.hasCSS&&(c.hasCSS=!!l(a,"article,aside,dialog,figcaption,figure,footer,header,hgroup,main,nav,section{display:block}mark{background:#FF0;color:#000}template{display:none}")),k||q(a,c),a}var c="3.7.0",d=a.html5||{},e=/^<|^(?:button|map|select|textarea|object|iframe|option|optgroup)$/i,f=/^(?:a|b|code|div|fieldset|h1|h2|h3|h4|h5|h6|i|label|li|ol|p|q|span|strong|style|table|tbody|td|th|tr|ul)$/i,g,h="_html5shiv",i=0,j={},k;(function(){try{var a=b.createElement("a");a.innerHTML="<xyz></xyz>",g="hidden"in a,k=a.childNodes.length==1||function(){b.createElement("a");var a=b.createDocumentFragment();return typeof a.cloneNode=="undefined"||typeof a.createDocumentFragment=="undefined"||typeof a.createElement=="undefined"}()}catch(c){g=!0,k=!0}})();var s={elements:d.elements||"abbr article aside audio bdi canvas data datalist details dialog figcaption figure footer header hgroup main mark meter nav output progress section summary template time video",version:c,shivCSS:d.shivCSS!==!1,supportsUnknownElements:k,shivMethods:d.shivMethods!==!1,type:"default",shivDocument:r,createElement:o,createDocumentFragment:p};a.html5=s,r(b)}(this,b),e._version=d,e._domPrefixes=o,e._cssomPrefixes=n,e.testProp=function(a){return B([a])},e.testAllProps=D,e.prefixed=function(a,b,c){return b?D(a,b,c):D(a,"pfx")},g.className=g.className.replace(/(^|\s)no-js(\s|$)/,"$1$2")+(f?" js "+s.join(" "):""),e}(this,this.document),function(a,b,c){function d(a){return"[object Function]"==o.call(a)}function e(a){return"string"==typeof a}function f(){}function g(a){return!a||"loaded"==a||"complete"==a||"uninitialized"==a}function h(){var a=p.shift();q=1,a?a.t?m(function(){("c"==a.t?B.injectCss:B.injectJs)(a.s,0,a.a,a.x,a.e,1)},0):(a(),h()):q=0}function i(a,c,d,e,f,i,j){function k(b){if(!o&&g(l.readyState)&&(u.r=o=1,!q&&h(),l.onload=l.onreadystatechange=null,b)){"img"!=a&&m(function(){t.removeChild(l)},50);for(var d in y[c])y[c].hasOwnProperty(d)&&y[c][d].onload()}}var j=j||B.errorTimeout,l=b.createElement(a),o=0,r=0,u={t:d,s:c,e:f,a:i,x:j};1===y[c]&&(r=1,y[c]=[]),"object"==a?l.data=c:(l.src=c,l.type=a),l.width=l.height="0",l.onerror=l.onload=l.onreadystatechange=function(){k.call(this,r)},p.splice(e,0,u),"img"!=a&&(r||2===y[c]?(t.insertBefore(l,s?null:n),m(k,j)):y[c].push(l))}function j(a,b,c,d,f){return q=0,b=b||"j",e(a)?i("c"==b?v:u,a,b,this.i++,c,d,f):(p.splice(this.i++,0,a),1==p.length&&h()),this}function k(){var a=B;return a.loader={load:j,i:0},a}var l=b.documentElement,m=a.setTimeout,n=b.getElementsByTagName("script")[0],o={}.toString,p=[],q=0,r="MozAppearance"in l.style,s=r&&!!b.createRange().compareNode,t=s?l:n.parentNode,l=a.opera&&"[object Opera]"==o.call(a.opera),l=!!b.attachEvent&&!l,u=r?"object":l?"script":"img",v=l?"script":u,w=Array.isArray||function(a){return"[object Array]"==o.call(a)},x=[],y={},z={timeout:function(a,b){return b.length&&(a.timeout=b[0]),a}},A,B;B=function(a){function b(a){var a=a.split("!"),b=x.length,c=a.pop(),d=a.length,c={url:c,origUrl:c,prefixes:a},e,f,g;for(f=0;f<d;f++)g=a[f].split("="),(e=z[g.shift()])&&(c=e(c,g));for(f=0;f<b;f++)c=x[f](c);return c}function g(a,e,f,g,h){var i=b(a),j=i.autoCallback;i.url.split(".").pop().split("?").shift(),i.bypass||(e&&(e=d(e)?e:e[a]||e[g]||e[a.split("/").pop().split("?")[0]]),i.instead?i.instead(a,e,f,g,h):(y[i.url]?i.noexec=!0:y[i.url]=1,f.load(i.url,i.forceCSS||!i.forceJS&&"css"==i.url.split(".").pop().split("?").shift()?"c":c,i.noexec,i.attrs,i.timeout),(d(e)||d(j))&&f.load(function(){k(),e&&e(i.origUrl,h,g),j&&j(i.origUrl,h,g),y[i.url]=2})))}function h(a,b){function c(a,c){if(a){if(e(a))c||(j=function(){var a=[].slice.call(arguments);k.apply(this,a),l()}),g(a,j,b,0,h);else if(Object(a)===a)for(n in m=function(){var b=0,c;for(c in a)a.hasOwnProperty(c)&&b++;return b}(),a)a.hasOwnProperty(n)&&(!c&&!--m&&(d(j)?j=function(){var a=[].slice.call(arguments);k.apply(this,a),l()}:j[n]=function(a){return function(){var b=[].slice.call(arguments);a&&a.apply(this,b),l()}}(k[n])),g(a[n],j,b,n,h))}else!c&&l()}var h=!!a.test,i=a.load||a.both,j=a.callback||f,k=j,l=a.complete||f,m,n;c(h?a.yep:a.nope,!!i),i&&c(i)}var i,j,l=this.yepnope.loader;if(e(a))g(a,0,l,0);else if(w(a))for(i=0;i<a.length;i++)j=a[i],e(j)?g(j,0,l,0):w(j)?B(j):Object(j)===j&&h(j,l);else Object(a)===a&&h(a,l)},B.addPrefix=function(a,b){z[a]=b},B.addFilter=function(a){x.push(a)},B.errorTimeout=1e4,null==b.readyState&&b.addEventListener&&(b.readyState="loading",b.addEventListener("DOMContentLoaded",A=function(){b.removeEventListener("DOMContentLoaded",A,0),b.readyState="complete"},0)),a.yepnope=k(),a.yepnope.executeStack=h,a.yepnope.injectJs=function(a,c,d,e,i,j){var k=b.createElement("script"),l,o,e=e||B.errorTimeout;k.src=a;for(o in d)k.setAttribute(o,d[o]);c=j?h:c||f,k.onreadystatechange=k.onload=function(){!l&&g(k.readyState)&&(l=1,c(),k.onload=k.onreadystatechange=null)},m(function(){l||(l=1,c(1))},e),i?k.onload():n.parentNode.insertBefore(k,n)},a.yepnope.injectCss=function(a,c,d,e,g,i){var e=b.createElement("link"),j,c=i?h:c||f;e.href=a,e.rel="stylesheet",e.type="text/css";for(j in d)e.setAttribute(j,d[j]);g||(n.parentNode.insertBefore(e,n),m(c,0))}}(this,document),Modernizr.load=function(){yepnope.apply(window,[].slice.call(arguments,0))};;
;(function (factory) {
    if (typeof module === 'object' && typeof module.exports === 'object') {
        factory(require('jquery'), window, document);
    } else {
        factory(window.jQuery, window, document);
    }
}(function ( $, window, document, undefined ) {


    /**
     * Calculate scrollbar width
     *
     * Called only once as a constant variable: we assume that scrollbar width never change
     *
     * Original function by Jonathan Sharp:
     * http://jdsharp.us/jQuery/minute/calculate-scrollbar-width.php
     */
    var SCROLLBAR_WIDTH;

    function scrollbarWidth () {

        // OPENSCHOLAR PATCH:
        // We want the scrollbar width to always be 7px and not change based
        // on the users browser, in some cases a 0px overlayed scrollbar will
        // cause trouble otherwise.
        return 11;

        // Append a temporary scrolling element to the DOM, then measure
        // the difference between its outer and inner elements.
        var tempEl  = $('<div class="scrollbar-width-tester" style="width:150px;height:300px;overflow-y:scroll;top:-9999px;left:-9999px;"><div style="height:100px;"></div>'),
            width   = 0,
            widthMinusScrollbars = 0;

        $('body').append(tempEl);

        width = $(tempEl).innerWidth(),
        widthMinusScrollbars = $('div', tempEl).innerWidth();

        tempEl.remove();

        return (width - widthMinusScrollbars);
    }

    var IS_WEBKIT = 'WebkitAppearance' in document.documentElement.style;



    // SimpleBar Constructor
    function SimpleBar (element, options) {
        this.el = element,
        this.$el = $(element),
        this.$track,
        this.$scrollbar,
        this.dragOffset,
        this.flashTimeout,
        this.$contentEl         = this.$el,
        this.$scrollContentEl   = this.$el,
        this.scrollDirection    = 'vert',
        this.scrollOffsetAttr   = 'scrollTop',
        this.sizeAttr           = 'height',
        this.scrollSizeAttr     = 'scrollHeight',
        this.offsetAttr         = 'top';

        this.options = $.extend({}, SimpleBar.DEFAULTS, options);
        this.theme   = this.options.css;

        this.init();
    }

    SimpleBar.DEFAULTS = {
        wrapContent: true,
        autoHide: true,
        css: {
            container: 'simplebar',
            content: 'simplebar-content',
            scrollContent: 'simplebar-scroll-content',
            scrollbar: 'simplebar-scrollbar',
            scrollbarTrack: 'simplebar-track'
        }
    };

    SimpleBar.prototype.init = function () {
        // Measure scrollbar width
        if(typeof SCROLLBAR_WIDTH === 'undefined') {
            SCROLLBAR_WIDTH = scrollbarWidth();
        }

        // If scrollbar is a floating scrollbar, disable the plugin
        if(SCROLLBAR_WIDTH === 0) {
          this.$el.css('overflow', 'auto');

          return;
        }

        if (this.$el.data('simplebar-direction') === 'horizontal' || this.$el.hasClass(this.theme.container + ' horizontal')){
            this.scrollDirection    = 'horiz';
            this.scrollOffsetAttr   = 'scrollLeft';
            this.sizeAttr           = 'width';
            this.scrollSizeAttr     = 'scrollWidth';
            this.offsetAttr         = 'left';
        }

        if (this.options.wrapContent) {
            this.$el.wrapInner('<div class="' + this.theme.scrollContent + '"><div class="' + this.theme.content + '"></div></div>');
        }

        this.$contentEl = this.$el.find('.' + this.theme.content);

        this.$el.prepend('<div class="' + this.theme.scrollbarTrack + '"><div class="' + this.theme.scrollbar + '"></div></div>');
        this.$track = this.$el.find('.' + this.theme.scrollbarTrack);
        this.$scrollbar = this.$el.find('.' + this.theme.scrollbar);

        this.$scrollContentEl = this.$el.find('.' + this.theme.scrollContent);

        this.resizeScrollContent();

        if (this.options.autoHide) {
            this.$el.on('mouseenter', $.proxy(this.flashScrollbar, this));
        }

        this.$scrollbar.on('mousedown', $.proxy(this.startDrag, this));
        this.$scrollContentEl.on('scroll', $.proxy(this.startScroll, this));

        this.resizeScrollbar();

        if (!this.options.autoHide) {
            this.showScrollbar();
        }
    };


    /**
     * Start scrollbar handle drag
     */
    SimpleBar.prototype.startDrag = function (e) {
        // Preventing the event's default action stops text being
        // selectable during the drag.
        e.preventDefault();

        // Measure how far the user's mouse is from the top of the scrollbar drag handle.
        var eventOffset = e.pageY;
        if (this.scrollDirection === 'horiz') {
            eventOffset = e.pageX;
        }
        this.dragOffset = eventOffset - this.$scrollbar.offset()[this.offsetAttr];

        $(document).on('mousemove', $.proxy(this.drag, this));
        $(document).on('mouseup', $.proxy(this.endDrag, this));
    };


    /**
     * Drag scrollbar handle
     */
    SimpleBar.prototype.drag = function (e) {
        e.preventDefault();

        // Calculate how far the user's mouse is from the top/left of the scrollbar (minus the dragOffset).
        var eventOffset = e.pageY,
            dragPos     = null,
            dragPerc    = null,
            scrollPos   = null;

        if (this.scrollDirection === 'horiz') {
          eventOffset = e.pageX;
        }

        dragPos = eventOffset - this.$track.offset()[this.offsetAttr] - this.dragOffset;
        // Convert the mouse position into a percentage of the scrollbar height/width.
        dragPerc = dragPos / this.$track[this.sizeAttr]();
        // Scroll the content by the same percentage.
        scrollPos = dragPerc * this.$contentEl[0][this.scrollSizeAttr];

        this.$scrollContentEl[this.scrollOffsetAttr](scrollPos);
    };


    /**
     * End scroll handle drag
     */
    SimpleBar.prototype.endDrag = function () {
        $(document).off('mousemove', this.drag);
        $(document).off('mouseup', this.endDrag);
    };


    /**
     * Resize scrollbar
     */
    SimpleBar.prototype.resizeScrollbar = function () {
        if(SCROLLBAR_WIDTH === 0) {
            return;
        }

        var contentSize     = this.$contentEl[0][this.scrollSizeAttr],
            scrollOffset    = this.$scrollContentEl[this.scrollOffsetAttr](), // Either scrollTop() or scrollLeft().
            scrollbarSize   = this.$track[this.sizeAttr](),
            scrollbarRatio  = scrollbarSize / contentSize,
            // Calculate new height/position of drag handle.
            // Offset of 2px allows for a small top/bottom or left/right margin around handle.
            handleOffset    = Math.round(scrollbarRatio * scrollOffset) + 2,
            handleSize      = Math.floor(scrollbarRatio * (scrollbarSize - 2)) - 2;


        if (scrollbarSize < contentSize) {
            if (this.scrollDirection === 'vert'){
                this.$scrollbar.css({'top': handleOffset, 'height': handleSize});
            } else {
                this.$scrollbar.css({'left': handleOffset, 'width': handleSize});
            }
            this.$track.show();
        } else {
            this.$track.hide();
        }
    };


    /**
     * On scroll event handling
     */
    SimpleBar.prototype.startScroll = function(e) {
        // Simulate event bubbling to root element
        this.$el.trigger(e);

        this.flashScrollbar();
    };


    /**
     * Flash scrollbar visibility
     */
    SimpleBar.prototype.flashScrollbar = function () {
        this.resizeScrollbar();
        this.showScrollbar();
    };


    /**
     * Show scrollbar
     */
    SimpleBar.prototype.showScrollbar = function () {
        this.$scrollbar.addClass('visible');

        if (!this.options.autoHide) {
            return;
        }
        if(typeof this.flashTimeout === 'number') {
            window.clearTimeout(this.flashTimeout);
        }

        this.flashTimeout = window.setTimeout($.proxy(this.hideScrollbar, this), 1000);
    };


    /**
     * Hide Scrollbar
     */
    SimpleBar.prototype.hideScrollbar = function () {
        this.$scrollbar.removeClass('visible');
        if(typeof this.flashTimeout === 'number') {
            window.clearTimeout(this.flashTimeout);
        }
    };


    /**
     * Resize content element
     */
    SimpleBar.prototype.resizeScrollContent = function () {
        if (IS_WEBKIT) {
            return;
        }

        if (this.scrollDirection === 'vert'){
            this.$scrollContentEl.width(this.$el.width()+SCROLLBAR_WIDTH);
            this.$scrollContentEl.height(this.$el.height());
        } else {
            this.$scrollContentEl.width(this.$el.width());
            this.$scrollContentEl.height(this.$el.height()+SCROLLBAR_WIDTH);
        }
    };


    /**
     * Recalculate scrollbar
     */
    SimpleBar.prototype.recalculate = function () {
        this.resizeScrollContent();
        this.resizeScrollbar();
    };


    /**
     * Getter for original scrolling element
     */
    SimpleBar.prototype.getScrollElement = function () {
        return this.$scrollContentEl;
    };


    /**
     * Getter for content element
     */
    SimpleBar.prototype.getContentElement = function () {
        return this.$contentEl;
    };


    /**
     * Data API
     */
    $(window).on('load', function () {
        $('[data-simplebar-direction]').each(function () {
            $(this).simplebar();
        });
    });


    /**
     * Plugin definition
     */
    var old = $.fn.simplebar;

    $.fn.simplebar = function (options) {
        var args = arguments,
            returns;

        // If the first parameter is an object (options), or was omitted,
        // instantiate a new instance of the plugin.
        if (typeof options === 'undefined' || typeof options === 'object') {
            return this.each(function () {

                // Only allow the plugin to be instantiated once,
                // so we check that the element has no plugin instantiation yet
                if (!$.data(this, 'simplebar')) { $.data(this, 'simplebar', new SimpleBar(this, options)); }
            });

        // If the first parameter is a string
        // treat this as a call to a public method.
        } else if (typeof options === 'string') {
            this.each(function () {
                var instance = $.data(this, 'simplebar');

                // Tests that there's already a plugin-instance
                // and checks that the requested public method exists
                if (instance instanceof SimpleBar && typeof instance[options] === 'function') {

                    // Call the method of our plugin instance,
                    // and pass it the supplied arguments.
                    returns = instance[options].apply( instance, Array.prototype.slice.call( args, 1 ) );
                }

                // Allow instances to be destroyed via the 'destroy' method
                if (options === 'destroy') {
                  $.data(this, 'simplebar', null);
                }
            });

            // If the earlier cached method
            // gives a value back return the value,
            // otherwise return this to preserve chainability.
            return returns !== undefined ? returns : this;
        }
    };

    $.fn.simplebar.Constructor = SimpleBar;


    /**
     * No conflict
     */
    $.fn.simplebar.noConflict = function () {
        $.fn.simplebar = old;
        return this;
    };

}));
;
(function ($) {
  var paths;
  var vsite;
  var cid;
  var uid;
  var morphButton;

    angular.module('AdminPanel', [ 'os-auth', 'ngCookies','ngStorage', 'RecursionHelper', 'ApSettingsForm', 'AppForm'])
    .config(function (){
       paths = Drupal.settings.paths
       vsite = typeof Drupal.settings.spaces != 'undefined' ? Drupal.settings.spaces.id : 0;
       cid = Drupal.settings.admin_panel.cid + Drupal.settings.version.adminPanel;
       uid = Drupal.settings.admin_panel.user;

    }).service('adminMenuStateService', ['$sessionStorage', '$cookies', function ($ss, $cookies) {
      $ss['menuState'] = $ss['menuState'] || {};
      var cookieConfig = {
        path: Drupal.settings.basePath + Drupal.settings.pathPrefix
      };

      this.SetState = function (key, state) {
        $ss['menuState'][key] = state;
        if (key == 'main') {
          $cookies.put('AdminMenuState', state?1:0, cookieConfig)
        }
      }

      this.GetState = function (key) {
        return $ss['menuState'][key] === true;
      }

      this.ChkLocalStorage = function () {
        try {
          localStorage.setItem('testLocalStorage', 'test');
          localStorage.removeItem('testLocalStorage');
          return true;
        } catch(e) {
          return false;
        }
      }

    }])
    .controller("AdminMenuController",['$scope', '$http', 'adminMenuStateService', '$localStorage', function ($scope, $http, $menuState, $localStorage) {

      var menu = 'admin_panel';
      $scope.paths = paths;

      $scope.getListStyle = function(id) {
        if ($menuState.GetState(id)) {
          return {'display':'block'};
        }
        return {};
      };

      //Force menu open Special case
       if (window.location.search.indexOf('login=1') > -1) {
         $menuState.SetState('main', true);
       }
      //Init storage
      if ($menuState.ChkLocalStorage()) {
        $localStorage.admin_menu = $localStorage.admin_menu || {};
        $localStorage.admin_menu[uid] = $localStorage.admin_menu[uid] || {};
        $localStorage.admin_menu[uid][vsite] = $localStorage.admin_menu[uid][vsite] || {};

        // Check for the menu data in local storage.
        if ($localStorage.admin_menu[uid][vsite][cid]) {
          $scope.admin_panel = $localStorage.admin_menu[uid][vsite][cid];

          $scope.open = $menuState.GetState('main');
          return;
        }
      }

      //Go get the admin menu from the server.
      params = { cid: cid, uid: uid};
      if (vsite) {
        params.vsite = vsite;
      }

      var url = paths.api + '/cp_menu/' + menu;
      $http({method: 'get', url: url, params: params, cache: true}).
        then(function(response) {
          //Clear out old entries.
          if ($menuState.ChkLocalStorage()) {
            $localStorage.admin_menu[uid][vsite] = {};
            $localStorage.admin_menu[uid][vsite][cid] = response.data.data;
          }
          $scope.admin_panel = response.data.data;
          $scope.open = $menuState.GetState('main');
        });


    }]).directive('toggleOpen', ['$cookies', '$timeout', 'adminMenuStateService', function($cookies, $t, $menuState) {

      function openLink(elm) {
        elm.addClass('open');
        elm.children('ul').slideDown(200);
      }

      function closeLink(elm) {
        elm.removeClass('open');
        elm.children('ul').css('display', 'none');
        //elm.find('li').removeClass('open');
        //elm.find('ul').slideUp(200);
      }

      function getAncestor(elem, tagName) {
        tagName = tagName.toUpperCase();
        while (elem[0].tagName != tagName) {
          if (elem[0].tagName == 'BODY') {
            return false;
          }
          elem = elem.parent();
        }

        return elem;
      }

      return {
        link: function(scope, element, attrs) {
          var parent = getAncestor(element, 'li');

          if ($menuState.GetState(attrs.id)) {
            $t(function () {
              openLink(parent);
            });
          }

          element.bind('click', function() {
            // close all sibling links regardless of what type of link this is
            var isOpen = $menuState.GetState(attrs.id);

            if ( element.hasClass('close-siblings') ) {
              var li = element.parent().parent();
              var togglers = angular.element(li.parent()[0].querySelectorAll('li.open'));

              togglers.each(function() {
                var sibling = angular.element(this),
                  id = sibling.children().first().find("span").attr('id');
                $menuState.SetState(id, false);
                closeLink(sibling);
              });
            }

            // if this link has children, toggle their visibility.
            if (element.hasClass('toggleable')){
              element.removeAttr('href');

              if (!isOpen) {
                $menuState.SetState(attrs.id, true);
                openLink(parent);
              }
            }
          });
        },
      };

    }]).directive('leftMenu', ['$timeout', 'adminMenuStateService', function($t, $menuState) {

      return {
        templateUrl: paths.adminPanelModuleRoot+'/templates/admin_menu.html?vers='+Drupal.settings.version.adminPanel,
        controller: 'AdminMenuController',
        link: function(scope, element, attrs) {
          angular.element(element[0].querySelectorAll('.close-menu-panel')).click(function () {
            scope.open = !scope.open;
            $menuState.SetState('main', scope.open);
            setClass();
          });
          var body = angular.element(document).find('body');
          angular.element(element[0].querySelectorAll('#cssmenu')).simplebar();

          function setClass() {
            if (scope.open) {
              element.removeClass('closed');
              body.removeClass('admin-menu-closed');
            }
            else {
              element.addClass('closed');
              body.addClass('admin-menu-closed');
            }
          }

          scope.open = $menuState.GetState('main');
          setClass();
        }
      };
   }]).directive('addLocation', function() {
    //For Qualtrics URL Remove after beta
      return {
        link: function(scope, element, attrs) {
        element.attr('href', attrs.href + '?osurl=' + encodeURIComponent(location.href) + '&uid=' + uid);
        },
      }
    })
    .directive('adminPanelMenuRow', ['$compile', 'RecursionHelper', function ($compile, RecursionHelper) {

      function link(scope, elem, attrs) {
        scope.getListStyle = function (id) {
          if (typeof(menu_state) !== 'undefined' && typeof(menu_state[id]) !== 'undefined' && menu_state[id]) {
            return {'display':'block'};
          }
          return {};
        };

        scope.isActive = function (row) {
          if (row.children) {
            for (var k in row.children) {
              var c = row.children[k];
              if (scope.isActive(c)) {
                return true;
              }
            }
            return false;
          }
          else if (row.type == 'link' && row.href == location.href) {
            return true;
          }
          else {
            return false;
          }
        }
      }

      return {
        scope: {
          menuRow: '=',
          key: '@'
        },
        templateUrl: paths.adminPanelModuleRoot + '/templates/adminPanelMenuRow.template.html?vers=' + Drupal.settings.version.adminPanel,
        compile: function (element) {
          // workaround so directives can be nested
          return RecursionHelper.compile(element, link);
        }
      };
    }])
    /**
     * Allows directives to be added dynmically to this element at runtime
     */
    .directive('adminPanelDirectiveLink', ['$compile', function ($compile) {
        return {
          link: function (scope, elem, attrs) {
            var copy = elem.find('span').clone();
            var directives = scope.menuRow.directive;
            for (var k in directives) {
              if (!isNaN(parseFloat(k)) && isFinite(k)) {
                copy.attr(directives[k], '');
              }
              else {
                copy.attr(k, directives[k]);
              }
            }

            copy = $compile(copy)(scope);
            elem.find('span').replaceWith(copy);
          }
        }
    }]);


})(jQuery);
;
(function () {
  var m = angular.module('osHelp', []);

  m.directive('documentation', [function () {
    return {
      templateUrl: Drupal.settings.paths.documentation,
      link: function (scope) {
        scope.base_url = window.location.origin+Drupal.settings.basePath;
      }
    };
  }]);

  m.directive('support', [function () {
    return {
      templateUrl: Drupal.settings.paths.support,
      link: function (scope) {
        scope.base_url = window.location.origin+Drupal.settings.basePath;
        scope.os_support_mail_to = Drupal.settings.os_support_mail_to;
      }
    };
  }]);
})();
;
(function () {
	var rootPath;
  var restPath;
  var vsite;
  var notify_settings;
  var user_data;
  var paths;

  angular.module('UserPanel', ['AdminPanel', 'ActiveUser'])
  .config(function () {
    rootPath = Drupal.settings.paths.adminPanelModuleRoot;
    restPath = Drupal.settings.paths.api;

    if(typeof(Drupal.settings.spaces) == 'undefined') {
      vsite = false;
    } else {
      vsite = Drupal.settings.spaces.id;
    }

    user_data = Drupal.settings.user_panel.user;
    paths = Drupal.settings.paths;
  }).controller("UserMenuController",['$scope', '$http', '$timeout', function ($scope, $http, $timeout) {
    
      $scope.user = user_data;
      $scope.vsite = { id: vsite };
      $scope.paths = paths;
      $scope.close_others = function(id){
    	//Protect the current link
    	if(!jQuery("#rightMenuSlide .click-processing").length) {
          jQuery("#rightMenuSlide [data-id='"+id+"']").addClass('click-processing');
    	}
        // After closing the modal, setting the search text field as blank and resetting search results.
        $scope.searchString = '';
        $timeout(function() {
          jQuery('#rightMenuSlide .menu_modal_open').not("[data-id='"+id+"']").not('.click-processing').click();
          $timeout(function() {
            jQuery("#rightMenuSlide .click-processing").removeClass('click-processing');
          });
      	});
      };

  }]).controller("UserSitesController",['$scope', '$http', 'ActiveUserService', function ($scope, $http, aus) {
    $scope.baseUrl = Drupal.settings.basePath;
    $scope.purlBaseDomain = Drupal.settings.admin_panel.purl_base_domain + "/";
    $scope.baseDomain = Drupal.settings.admin_panel.base_domain + "/";

    aus.getUser(function (user) {
      $scope.site_data = user.og_user_node || [];
      $scope.create_access = user.create_access;
    });

    // var url = paths.api + '/users/' + user_data.uid;
    // $http({method: 'get', url: url}).then(function(response) {
    //   if(typeof(response.data.data[0].og_user_node) == 'undefined') {
    //     $scope.site_data = [];
    //   } else {
    //     $scope.site_data = response.data.data[0].og_user_node;
    //   }
    //   $scope.create_access = response.data.data[0].create_access;
    // });
    $scope.pageSize = 7;
    if (Drupal.settings.spaces) {
      $scope.spaceId = Drupal.settings.spaces.id;
      $scope.delete_destination_root = '?destination=<base_domain>';
      $scope.delete_req_destination_root = '?destination=?<base_domain>';
      $scope.delete_destination = '?'+encodeURIComponent('destination=node/' + Drupal.settings.spaces.id + encodeURIComponent('?destination=' + window.location.pathname.replace(/^\/|\/$/g, '')));
    } else {
      $scope.delete_destination = '';
    }
    $scope.numberOfPages=function(data){
      return Math.ceil(data.length/$scope.pageSize);
    }
  }]).directive('rightMenu', function() {
      return {
       templateUrl: rootPath+'/templates/user_menu.html?vers='+Drupal.settings.version.userPanel,
       controller: 'UserMenuController',
     };
  }).directive('addDestination', function() {
      //Add the destination to a URL
	  return {
	    link: function(scope, element, attrs) {
		  var url = (typeof(attrs.href) == 'undefined') ? attrs.ngHref : attrs.href;
	      element.attr('href', url + ((url.indexOf('?') == -1) ? '?' : '&') + 'destination=' + encodeURIComponent(location.href));
  	    },
	  }
  }).directive('loadMySites', function() {
    	 
    return {
        templateUrl: rootPath+'/templates/user_sites.html?vers='+Drupal.settings.version.userPanel,
        controller: 'UserSitesController',
      };
       
  }).directive('rightMenuToggle', function() {
        return {
            link: function(scope, element, attrs) {
        	  element.bind('click', function(e) {
        		  e.preventDefault();
        		  jQuery('div#rightMenuSlide').each( function () {
        	        if(this.style.display == 'none') {
        	          jQuery(this).fadeIn('fast');
        	          jQuery(this).addClass('open');
        	        } else {
        	          jQuery(this).fadeOut('fast');
        	          jQuery(this).removeClass('open');
        	        }
        	      });
              })  
            },
          }
        });
})();
;
(function ($) {

	if (typeof Drupal.overlay != 'undefined') {
	  /**
	   * OVERRIDE overlay Event handler: if the child window suggested that the parent refresh on
	   * close, force a page refresh.
	   *
	   * @param event
	   *   Event being triggered, with the following restrictions:
	   *   - event.type: drupalOverlayClose
	   *   - event.currentTarget: document
	   */
  	  Drupal.overlay.eventhandlerRefreshPage = function (event) {
	    if (Drupal.overlay.refreshPage) {
		  if (Drupal.settings.admin_panel.keep_open) {
		    urlQueryString = document.location.search;
		    if (urlQueryString) {
		  	  document.location.search = urlQueryString + '&admin_panel=1';
		    } else {
			  document.location.search = '?admin_panel=1';
		    }
		  } else {
	        window.location.reload(true);
		  }
	    }
  	  };
	}
	
	 /**
	   * URL processing for admin panel
	   */
	  Drupal.behaviors.AdminPanelProcessURL = {
	    attach: function() {
// Commenting this out till issues with tabs loading and seeing a different URL is fixed	    	
	      //Remove Admin panel param from URL
//		  var current_url = jQuery(location).attr('href');
//		  history.pushState(null, null, current_url.replace(/\?admin_panel=1&?(.*)/, '\?$1'));
	    }
	  };
	
	


})(jQuery);




	;
/*! Copyright (c) 2013 Brandon Aaron (http://brandon.aaron.sh)
 * Licensed under the MIT License (LICENSE.txt).
 *
 * Version 3.0.1
 *
 * Requires jQuery >= 1.2.6
 */

(function (factory) {
    if ( typeof define === 'function' && define.amd ) {
        // AMD. Register as an anonymous module.
        define(['jquery'], factory);
    } else if ( typeof exports === 'object' ) {
        // Node/CommonJS style for Browserify
        module.exports = factory;
    } else {
        // Browser globals
        factory(jQuery);
    }
}(function ($) {
    $.fn.bgiframe = function(s) {
        s = $.extend({
            top         : 'auto', // auto == borderTopWidth
            left        : 'auto', // auto == borderLeftWidth
            width       : 'auto', // auto == offsetWidth
            height      : 'auto', // auto == offsetHeight
            opacity     : true,
            src         : 'javascript:false;',
            conditional : /MSIE 6\.0/.test(navigator.userAgent) // expression or function. return false to prevent iframe insertion
        }, s);

        // wrap conditional in a function if it isn't already
        if ( !$.isFunction(s.conditional) ) {
            var condition = s.conditional;
            s.conditional = function() { return condition; };
        }

        var $iframe = $('<iframe class="bgiframe"frameborder="0"tabindex="-1"src="'+s.src+'"'+
                           'style="display:block;position:absolute;z-index:-1;"/>');

        return this.each(function() {
            var $this = $(this);
            if ( s.conditional(this) === false ) { return; }
            var existing = $this.children('iframe.bgiframe');
            var $el = existing.length === 0 ? $iframe.clone() : existing;
            $el.css({
                'top': s.top == 'auto' ?
                    ((parseInt($this.css('borderTopWidth'),10)||0)*-1)+'px' : prop(s.top),
                'left': s.left == 'auto' ?
                    ((parseInt($this.css('borderLeftWidth'),10)||0)*-1)+'px' : prop(s.left),
                'width': s.width == 'auto' ? (this.offsetWidth + 'px') : prop(s.width),
                'height': s.height == 'auto' ? (this.offsetHeight + 'px') : prop(s.height),
                'opacity': s.opacity === true ? 0 : undefined
            });

            if ( existing.length === 0 ) {
                $this.prepend($el);
            }
        });
    };

    // old alias
    $.fn.bgIframe = $.fn.bgiframe;

    function prop(n) {
        return n && n.constructor === Number ? n + 'px' : n;
    }

}));
;
/*!
* hoverIntent r5 // 2007.03.27 // jQuery 1.1.2+
* <http://cherne.net/brian/resources/jquery.hoverIntent.html>
* 
* @param  f  onMouseOver function || An object with configuration options
* @param  g  onMouseOut function  || Nothing (use configuration options object)
* @author    Brian Cherne <brian@cherne.net>
*/
(function($){$.fn.hoverIntent=function(f,g){var cfg={sensitivity:7,interval:100,timeout:0};cfg=$.extend(cfg,g?{over:f,out:g}:f);var cX,cY,pX,pY;var track=function(ev){cX=ev.pageX;cY=ev.pageY;};var compare=function(ev,ob){ob.hoverIntent_t=clearTimeout(ob.hoverIntent_t);if((Math.abs(pX-cX)+Math.abs(pY-cY))<cfg.sensitivity){$(ob).unbind("mousemove",track);ob.hoverIntent_s=1;return cfg.over.apply(ob,[ev]);}else{pX=cX;pY=cY;ob.hoverIntent_t=setTimeout(function(){compare(ev,ob);},cfg.interval);}};var delay=function(ev,ob){ob.hoverIntent_t=clearTimeout(ob.hoverIntent_t);ob.hoverIntent_s=0;return cfg.out.apply(ob,[ev]);};var handleHover=function(e){var p=(e.type=="mouseover"?e.fromElement:e.toElement)||e.relatedTarget;while(p&&p!=this){try{p=p.parentNode;}catch(e){p=this;}}if(p==this){return false;}var ev=jQuery.extend({},e);var ob=this;if(ob.hoverIntent_t){ob.hoverIntent_t=clearTimeout(ob.hoverIntent_t);}if(e.type=="mouseover"){pX=ev.pageX;pY=ev.pageY;$(ob).bind("mousemove",track);if(ob.hoverIntent_s!=1){ob.hoverIntent_t=setTimeout(function(){compare(ev,ob);},cfg.interval);}}else{$(ob).unbind("mousemove",track);if(ob.hoverIntent_s==1){ob.hoverIntent_t=setTimeout(function(){delay(ev,ob);},cfg.timeout);}}};return this.mouseover(handleHover).mouseout(handleHover);};})(jQuery);;
;
/*!
 * Superfish v1.4.8 - jQuery menu widget
 * Copyright (c) 2008 Joel Birch
 *
 * Dual licensed under the MIT and GPL licenses:
 * 	http://www.opensource.org/licenses/mit-license.php
 * 	http://www.gnu.org/licenses/gpl.html
 *
 * CHANGELOG: http://users.tpg.com.au/j_birch/plugins/superfish/changelog.txt
 */
(function($){
  $.fn.superfish = function(op){

    var sf = $.fn.superfish,
    c = sf.c,
    $arrow = $(['<span class="',c.arrowClass,'"> &#187;</span>'].join('')),
    over = function(){
      var $$ = $(this), menu = getMenu($$);
      clearTimeout(menu.sfTimer);
      $$.showSuperfishUl().siblings().hideSuperfishUl();
    },
    out = function(){
      var $$ = $(this), menu = getMenu($$), o = sf.op;
      clearTimeout(menu.sfTimer);
      menu.sfTimer = setTimeout(function(){
        o.retainPath = ($.inArray($$[0],o.$path) > -1);
        $$.hideSuperfishUl();
        if (o.$path.length && $$.parents(['li.', o.hoverClass].join('')).length < 1){
          over.call(o.$path);
        }
      }, o.delay);
    },
    getMenu = function($menu){
      var menu = $menu.parents(['ul.',c.menuClass,':first'].join(''))[0];
      sf.op = sf.o[menu.serial];
      return menu;
    },
    addArrow = function($a){
      $a.addClass(c.anchorClass).append($arrow.clone());
    };

    return this.each(function() {
      var s = this.serial = sf.o.length;
      var o = $.extend({},sf.defaults,op);
      o.$path = $('li.' + o.pathClass,this).slice(0, o.pathLevels).each(function(){
        $(this).addClass([o.hoverClass,c.bcClass].join(' '))
        .filter('li:has(ul)').removeClass(o.pathClass);
      });
      sf.o[s] = sf.op = o;

      $('li:has(ul)',this)[($.fn.hoverIntent && !o.disableHI) ? 'hoverIntent' : 'hover'](over,out).each(function() {
        if (o.autoArrows) {
          addArrow($('>a:first-child',this));
        }
      })
      .not('.' + c.bcClass)
      .hideSuperfishUl();

      var $a = $('a',this);
      $a.each(function(i){
        var $li = $a.eq(i).parents('li');
        $a.eq(i).focus(function(){
          over.call($li);
        }).blur(function(){
          out.call($li);
        });
      });
      o.onInit.call(this);

    }).each(function() {
      var menuClasses = [c.menuClass];
      if (sf.op.dropShadows  && !($.browser.msie && $.browser.version < 7)) {
        menuClasses.push(c.shadowClass);
      }
      $(this).addClass(menuClasses.join(' '));
    });
  };

  var sf = $.fn.superfish;
  sf.o = [];
  sf.op = {};
  sf.IE7fix = function(){
    var o = sf.op;
    if ($.browser.msie && $.browser.version > 6 && o.dropShadows && o.animation.opacity != undefined) {
      this.toggleClass(sf.c.shadowClass + '-off');
    }
  };
  sf.c = {
    bcClass     : 'sf-breadcrumb',
    menuClass   : 'sf-js-enabled',
    anchorClass : 'sf-with-ul',
    arrowClass  : 'sf-sub-indicator',
    shadowClass : 'sf-shadow'
  };
  sf.defaults = {
    hoverClass	: 'sfHover',
    pathClass	: 'overideThisToUse',
    pathLevels	: 1,
    delay		: 800,
    animation	: {
      opacity:'show'
    },
    speed               : 'normal',
    autoArrows	   : true,
    dropShadows : true,
    // true disables hoverIntent detection.
    disableHI     : false,
    onInit          : function(){}, // callback functions
    onBeforeShow: function(){},
    onShow          : function(){},
    onHide          : function(){}
  };
  $.fn.extend({
    hideSuperfishUl : function() {
      var o = sf.op,
      not = (o.retainPath === true) ? o.$path : '';
      o.retainPath = false;
      var $ul = $(['li.',o.hoverClass].join(''),this).add(this).not(not).removeClass(o.hoverClass)
      .find('>ul').hide().css('visibility','hidden');
      o.onHide.call($ul);
      return this;
    },
    showSuperfishUl : function(){
      var o = sf.op,
      sh = sf.c.shadowClass + '-off',
      $ul = this.addClass(o.hoverClass)
      .find('>ul:hidden').css('visibility','visible');
      sf.IE7fix.call($ul);
      o.onBeforeShow.call($ul);
      $ul.animate(o.animation,o.speed,function(){
        sf.IE7fix.call($ul);
        o.onShow.call($ul);
      });
      return this;
    }
  });

})(jQuery);
;
/**
 * @file
 * Behaviours for the Nice Menus module. This uses Superfish 1.4.8.
 *
 * @link http://users.tpg.com.au/j_birch/plugins/superfish
 */

(function ($) {

  /**
   * Add Superfish to all Nice Menus with some basic options.
   */
  Drupal.behaviors.niceMenus = {
    attach: function (context, settings) {
      $('ul.nice-menu:not(.nice-menus-processed)').addClass('nice-menus-processed').each(function () {
        $(this).superfish({
          // Apply a generic hover class.
          hoverClass: 'over',
          // Disable generation of arrow mark-up.
          autoArrows: false,
          // Disable drop shadows.
          dropShadows: false,
          // Mouse delay.
          delay: Drupal.settings.nice_menus_options.delay,
          // Animation speed.
          speed: Drupal.settings.nice_menus_options.speed
        });

        // Add in Brandon Aaron’s bgIframe plugin for IE select issues.
        // http://plugins.jquery.com/node/46/release
        $(this).find('ul').bgIframe({opacity:false});

        $('ul.nice-menu ul').css('display', 'none');
      });
    }
  };

})(jQuery);
;
(function ($) {

/**
 * The base States namespace.
 *
 * Having the local states variable allows us to use the States namespace
 * without having to always declare "Drupal.states".
 */
var states = Drupal.states = {
  // An array of functions that should be postponed.
  postponed: []
};

/**
 * Attaches the states.
 */
Drupal.behaviors.states = {
  attach: function (context, settings) {
    var $context = $(context);
    for (var selector in settings.states) {
      for (var state in settings.states[selector]) {
        new states.Dependent({
          element: $context.find(selector),
          state: states.State.sanitize(state),
          constraints: settings.states[selector][state]
        });
      }
    }

    // Execute all postponed functions now.
    while (states.postponed.length) {
      (states.postponed.shift())();
    }
  }
};

/**
 * Object representing an element that depends on other elements.
 *
 * @param args
 *   Object with the following keys (all of which are required):
 *   - element: A jQuery object of the dependent element
 *   - state: A State object describing the state that is dependent
 *   - constraints: An object with dependency specifications. Lists all elements
 *     that this element depends on. It can be nested and can contain arbitrary
 *     AND and OR clauses.
 */
states.Dependent = function (args) {
  $.extend(this, { values: {}, oldValue: null }, args);

  this.dependees = this.getDependees();
  for (var selector in this.dependees) {
    this.initializeDependee(selector, this.dependees[selector]);
  }
};

/**
 * Comparison functions for comparing the value of an element with the
 * specification from the dependency settings. If the object type can't be
 * found in this list, the === operator is used by default.
 */
states.Dependent.comparisons = {
  'RegExp': function (reference, value) {
    return reference.test(value);
  },
  'Function': function (reference, value) {
    // The "reference" variable is a comparison function.
    return reference(value);
  },
  'Number': function (reference, value) {
    // If "reference" is a number and "value" is a string, then cast reference
    // as a string before applying the strict comparison in compare(). Otherwise
    // numeric keys in the form's #states array fail to match string values
    // returned from jQuery's val().
    return (typeof value === 'string') ? compare(reference.toString(), value) : compare(reference, value);
  }
};

states.Dependent.prototype = {
  /**
   * Initializes one of the elements this dependent depends on.
   *
   * @param selector
   *   The CSS selector describing the dependee.
   * @param dependeeStates
   *   The list of states that have to be monitored for tracking the
   *   dependee's compliance status.
   */
  initializeDependee: function (selector, dependeeStates) {
    var state;

    // Cache for the states of this dependee.
    this.values[selector] = {};

    for (var i in dependeeStates) {
      if (dependeeStates.hasOwnProperty(i)) {
        state = dependeeStates[i];
        // Make sure we're not initializing this selector/state combination twice.
        if ($.inArray(state, dependeeStates) === -1) {
          continue;
        }

        state = states.State.sanitize(state);

        // Initialize the value of this state.
        this.values[selector][state.name] = null;

        // Monitor state changes of the specified state for this dependee.
        $(selector).bind('state:' + state, $.proxy(function (e) {
          this.update(selector, state, e.value);
        }, this));

        // Make sure the event we just bound ourselves to is actually fired.
        new states.Trigger({ selector: selector, state: state });
      }
    }
  },

  /**
   * Compares a value with a reference value.
   *
   * @param reference
   *   The value used for reference.
   * @param selector
   *   CSS selector describing the dependee.
   * @param state
   *   A State object describing the dependee's updated state.
   *
   * @return
   *   true or false.
   */
  compare: function (reference, selector, state) {
    var value = this.values[selector][state.name];
    if (reference.constructor.name in states.Dependent.comparisons) {
      // Use a custom compare function for certain reference value types.
      return states.Dependent.comparisons[reference.constructor.name](reference, value);
    }
    else {
      // Do a plain comparison otherwise.
      return compare(reference, value);
    }
  },

  /**
   * Update the value of a dependee's state.
   *
   * @param selector
   *   CSS selector describing the dependee.
   * @param state
   *   A State object describing the dependee's updated state.
   * @param value
   *   The new value for the dependee's updated state.
   */
  update: function (selector, state, value) {
    // Only act when the 'new' value is actually new.
    if (value !== this.values[selector][state.name]) {
      this.values[selector][state.name] = value;
      this.reevaluate();
    }
  },

  /**
   * Triggers change events in case a state changed.
   */
  reevaluate: function () {
    // Check whether any constraint for this dependent state is satisifed.
    var value = this.verifyConstraints(this.constraints);

    // Only invoke a state change event when the value actually changed.
    if (value !== this.oldValue) {
      // Store the new value so that we can compare later whether the value
      // actually changed.
      this.oldValue = value;

      // Normalize the value to match the normalized state name.
      value = invert(value, this.state.invert);

      // By adding "trigger: true", we ensure that state changes don't go into
      // infinite loops.
      this.element.trigger({ type: 'state:' + this.state, value: value, trigger: true });
    }
  },

  /**
   * Evaluates child constraints to determine if a constraint is satisfied.
   *
   * @param constraints
   *   A constraint object or an array of constraints.
   * @param selector
   *   The selector for these constraints. If undefined, there isn't yet a
   *   selector that these constraints apply to. In that case, the keys of the
   *   object are interpreted as the selector if encountered.
   *
   * @return
   *   true or false, depending on whether these constraints are satisfied.
   */
  verifyConstraints: function(constraints, selector) {
    var result;
    if ($.isArray(constraints)) {
      // This constraint is an array (OR or XOR).
      var hasXor = $.inArray('xor', constraints) === -1;
      for (var i = 0, len = constraints.length; i < len; i++) {
        if (constraints[i] != 'xor') {
          var constraint = this.checkConstraints(constraints[i], selector, i);
          // Return if this is OR and we have a satisfied constraint or if this
          // is XOR and we have a second satisfied constraint.
          if (constraint && (hasXor || result)) {
            return hasXor;
          }
          result = result || constraint;
        }
      }
    }
    // Make sure we don't try to iterate over things other than objects. This
    // shouldn't normally occur, but in case the condition definition is bogus,
    // we don't want to end up with an infinite loop.
    else if ($.isPlainObject(constraints)) {
      // This constraint is an object (AND).
      for (var n in constraints) {
        if (constraints.hasOwnProperty(n)) {
          result = ternary(result, this.checkConstraints(constraints[n], selector, n));
          // False and anything else will evaluate to false, so return when any
          // false condition is found.
          if (result === false) { return false; }
        }
      }
    }
    return result;
  },

  /**
   * Checks whether the value matches the requirements for this constraint.
   *
   * @param value
   *   Either the value of a state or an array/object of constraints. In the
   *   latter case, resolving the constraint continues.
   * @param selector
   *   The selector for this constraint. If undefined, there isn't yet a
   *   selector that this constraint applies to. In that case, the state key is
   *   propagates to a selector and resolving continues.
   * @param state
   *   The state to check for this constraint. If undefined, resolving
   *   continues.
   *   If both selector and state aren't undefined and valid non-numeric
   *   strings, a lookup for the actual value of that selector's state is
   *   performed. This parameter is not a State object but a pristine state
   *   string.
   *
   * @return
   *   true or false, depending on whether this constraint is satisfied.
   */
  checkConstraints: function(value, selector, state) {
    // Normalize the last parameter. If it's non-numeric, we treat it either as
    // a selector (in case there isn't one yet) or as a trigger/state.
    if (typeof state !== 'string' || (/[0-9]/).test(state[0])) {
      state = null;
    }
    else if (typeof selector === 'undefined') {
      // Propagate the state to the selector when there isn't one yet.
      selector = state;
      state = null;
    }

    if (state !== null) {
      // constraints is the actual constraints of an element to check for.
      state = states.State.sanitize(state);
      return invert(this.compare(value, selector, state), state.invert);
    }
    else {
      // Resolve this constraint as an AND/OR operator.
      return this.verifyConstraints(value, selector);
    }
  },

  /**
   * Gathers information about all required triggers.
   */
  getDependees: function() {
    var cache = {};
    // Swivel the lookup function so that we can record all available selector-
    // state combinations for initialization.
    var _compare = this.compare;
    this.compare = function(reference, selector, state) {
      (cache[selector] || (cache[selector] = [])).push(state.name);
      // Return nothing (=== undefined) so that the constraint loops are not
      // broken.
    };

    // This call doesn't actually verify anything but uses the resolving
    // mechanism to go through the constraints array, trying to look up each
    // value. Since we swivelled the compare function, this comparison returns
    // undefined and lookup continues until the very end. Instead of lookup up
    // the value, we record that combination of selector and state so that we
    // can initialize all triggers.
    this.verifyConstraints(this.constraints);
    // Restore the original function.
    this.compare = _compare;

    return cache;
  }
};

states.Trigger = function (args) {
  $.extend(this, args);

  if (this.state in states.Trigger.states) {
    this.element = $(this.selector);

    // Only call the trigger initializer when it wasn't yet attached to this
    // element. Otherwise we'd end up with duplicate events.
    if (!this.element.data('trigger:' + this.state)) {
      this.initialize();
    }
  }
};

states.Trigger.prototype = {
  initialize: function () {
    var trigger = states.Trigger.states[this.state];

    if (typeof trigger == 'function') {
      // We have a custom trigger initialization function.
      trigger.call(window, this.element);
    }
    else {
      for (var event in trigger) {
        if (trigger.hasOwnProperty(event)) {
          this.defaultTrigger(event, trigger[event]);
        }
      }
    }

    // Mark this trigger as initialized for this element.
    this.element.data('trigger:' + this.state, true);
  },

  defaultTrigger: function (event, valueFn) {
    var oldValue = valueFn.call(this.element);

    // Attach the event callback.
    this.element.bind(event, $.proxy(function (e) {
      var value = valueFn.call(this.element, e);
      // Only trigger the event if the value has actually changed.
      if (oldValue !== value) {
        this.element.trigger({ type: 'state:' + this.state, value: value, oldValue: oldValue });
        oldValue = value;
      }
    }, this));

    states.postponed.push($.proxy(function () {
      // Trigger the event once for initialization purposes.
      this.element.trigger({ type: 'state:' + this.state, value: oldValue, oldValue: null });
    }, this));
  }
};

/**
 * This list of states contains functions that are used to monitor the state
 * of an element. Whenever an element depends on the state of another element,
 * one of these trigger functions is added to the dependee so that the
 * dependent element can be updated.
 */
states.Trigger.states = {
  // 'empty' describes the state to be monitored
  empty: {
    // 'keyup' is the (native DOM) event that we watch for.
    'keyup': function () {
      // The function associated to that trigger returns the new value for the
      // state.
      return this.val() == '';
    }
  },

  checked: {
    'change': function () {
      return this.is(':checked');
    }
  },

  // For radio buttons, only return the value if the radio button is selected.
  value: {
    'keyup': function () {
      // Radio buttons share the same :input[name="key"] selector.
      if (this.length > 1) {
        // Initial checked value of radios is undefined, so we return false.
        return this.filter(':checked').val() || false;
      }
      return this.val();
    },
    'change': function () {
      // Radio buttons share the same :input[name="key"] selector.
      if (this.length > 1) {
        // Initial checked value of radios is undefined, so we return false.
        return this.filter(':checked').val() || false;
      }
      return this.val();
    }
  },

  collapsed: {
    'collapsed': function(e) {
      return (typeof e !== 'undefined' && 'value' in e) ? e.value : this.is('.collapsed');
    }
  }
};


/**
 * A state object is used for describing the state and performing aliasing.
 */
states.State = function(state) {
  // We may need the original unresolved name later.
  this.pristine = this.name = state;

  // Normalize the state name.
  while (true) {
    // Iteratively remove exclamation marks and invert the value.
    while (this.name.charAt(0) == '!') {
      this.name = this.name.substring(1);
      this.invert = !this.invert;
    }

    // Replace the state with its normalized name.
    if (this.name in states.State.aliases) {
      this.name = states.State.aliases[this.name];
    }
    else {
      break;
    }
  }
};

/**
 * Creates a new State object by sanitizing the passed value.
 */
states.State.sanitize = function (state) {
  if (state instanceof states.State) {
    return state;
  }
  else {
    return new states.State(state);
  }
};

/**
 * This list of aliases is used to normalize states and associates negated names
 * with their respective inverse state.
 */
states.State.aliases = {
  'enabled': '!disabled',
  'invisible': '!visible',
  'invalid': '!valid',
  'untouched': '!touched',
  'optional': '!required',
  'filled': '!empty',
  'unchecked': '!checked',
  'irrelevant': '!relevant',
  'expanded': '!collapsed',
  'readwrite': '!readonly'
};

states.State.prototype = {
  invert: false,

  /**
   * Ensures that just using the state object returns the name.
   */
  toString: function() {
    return this.name;
  }
};

/**
 * Global state change handlers. These are bound to "document" to cover all
 * elements whose state changes. Events sent to elements within the page
 * bubble up to these handlers. We use this system so that themes and modules
 * can override these state change handlers for particular parts of a page.
 */
$(document).bind('state:disabled', function(e) {
  // Only act when this change was triggered by a dependency and not by the
  // element monitoring itself.
  if (e.trigger) {
    $(e.target)
      .attr('disabled', e.value)
        .closest('.form-item, .form-submit, .form-wrapper').toggleClass('form-disabled', e.value)
        .find('select, input, textarea').attr('disabled', e.value);

    // Note: WebKit nightlies don't reflect that change correctly.
    // See https://bugs.webkit.org/show_bug.cgi?id=23789
  }
});

$(document).bind('state:required', function(e) {
  if (e.trigger) {
    if (e.value) {
      var $label = $(e.target).closest('.form-item, .form-wrapper').find('label');
      // Avoids duplicate required markers on initialization.
      if (!$label.find('.form-required').length) {
        $label.append('<span class="form-required">*</span>');
      }
    }
    else {
      $(e.target).closest('.form-item, .form-wrapper').find('label .form-required').remove();
    }
  }
});

$(document).bind('state:visible', function(e) {
  if (e.trigger) {
      $(e.target).closest('.form-item, .form-submit, .form-wrapper').toggle(e.value);
  }
});

$(document).bind('state:checked', function(e) {
  if (e.trigger) {
    $(e.target).attr('checked', e.value);
  }
});

$(document).bind('state:collapsed', function(e) {
  if (e.trigger) {
    if ($(e.target).is('.collapsed') !== e.value) {
      $('> legend a', e.target).click();
    }
  }
});

/**
 * These are helper functions implementing addition "operators" and don't
 * implement any logic that is particular to states.
 */

// Bitwise AND with a third undefined state.
function ternary (a, b) {
  return typeof a === 'undefined' ? b : (typeof b === 'undefined' ? a : a && b);
}

// Inverts a (if it's not undefined) when invert is true.
function invert (a, invert) {
  return (invert && typeof a !== 'undefined') ? !a : a;
}

// Compares two values while ignoring undefined values.
function compare (a, b) {
  return (a === b) ? (typeof a === 'undefined' ? a : true) : (typeof a === 'undefined' || typeof b === 'undefined');
}

})(jQuery);
;
