'use strict';Object.defineProperty(exports,'__esModule',{value:true});function _typeof(obj) {
  "@babel/helpers - typeof";

  if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
    _typeof = function (obj) {
      return typeof obj;
    };
  } else {
    _typeof = function (obj) {
      return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    };
  }

  return _typeof(obj);
}

function _slicedToArray(arr, i) {
  return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
}

function _toConsumableArray(arr) {
  return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();
}

function _arrayWithoutHoles(arr) {
  if (Array.isArray(arr)) return _arrayLikeToArray(arr);
}

function _arrayWithHoles(arr) {
  if (Array.isArray(arr)) return arr;
}

function _iterableToArray(iter) {
  if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter);
}

function _iterableToArrayLimit(arr, i) {
  if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return;
  var _arr = [];
  var _n = true;
  var _d = false;
  var _e = undefined;

  try {
    for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
      _arr.push(_s.value);

      if (i && _arr.length === i) break;
    }
  } catch (err) {
    _d = true;
    _e = err;
  } finally {
    try {
      if (!_n && _i["return"] != null) _i["return"]();
    } finally {
      if (_d) throw _e;
    }
  }

  return _arr;
}

function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}

function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;

  for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];

  return arr2;
}

function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
var script = {
  name: 'EasyCheckbox',
  methods: {
    handleOnChange: function handleOnChange(event) {
      var checked = event.target.checked;

      if (Array.isArray(this.modelValue)) {
        var modelArr = _toConsumableArray(this.modelValue);

        if (checked) {
          modelArr.push(this.value);
        } else {
          modelArr.splice(modelArr.indexOf(this.value), 1);
        }

        this.$emit('change', modelArr);
      } else if (typeof this.modelValue === 'boolean') {
        this.$emit('change', checked);
      } else if (_typeof(this.modelValue) === 'object') {
        this.$emit('change', this.value);
      }
    }
  },
  model: {
    prop: 'modelValue',
    event: 'change'
  },
  props: {
    modelValue: {
      type: [Boolean, Array, Object, String]
    },
    value: {
      type: [Boolean, Array, Object, String]
    },
    required: {
      type: Boolean,
      default: function _default() {
        return false;
      }
    },
    checked: {
      type: Boolean,
      default: function _default() {
        return false;
      }
    },
    disabled: {
      type: Boolean,
      default: function _default() {
        return false;
      }
    },
    text: {
      type: String
    },
    labelStyle: {
      type: Object,
      default: function _default() {}
    },
    labelOnLeft: {
      type: Boolean,
      default: function _default() {
        return false;
      }
    },
    show: {
      type: Boolean,
      default: function _default() {
        return true;
      }
    }
  },
  computed: {
    computedLabelStyle: function computedLabelStyle() {
      var labelStyle = this.labelStyle;
      return {
        color: labelStyle.color || '#3D4066',
        fontSize: labelStyle.fontSize || '16px',
        marginLeft: labelStyle.marginLeft || '8px',
        marginRight: labelStyle.marginRight || '8px'
      };
    }
  }
};function normalizeComponent(template, style, script, scopeId, isFunctionalTemplate, moduleIdentifier /* server only */, shadowMode, createInjector, createInjectorSSR, createInjectorShadow) {
    if (typeof shadowMode !== 'boolean') {
        createInjectorSSR = createInjector;
        createInjector = shadowMode;
        shadowMode = false;
    }
    // Vue.extend constructor export interop.
    const options = typeof script === 'function' ? script.options : script;
    // render functions
    if (template && template.render) {
        options.render = template.render;
        options.staticRenderFns = template.staticRenderFns;
        options._compiled = true;
        // functional template
        if (isFunctionalTemplate) {
            options.functional = true;
        }
    }
    // scopedId
    if (scopeId) {
        options._scopeId = scopeId;
    }
    let hook;
    if (moduleIdentifier) {
        // server build
        hook = function (context) {
            // 2.3 injection
            context =
                context || // cached call
                    (this.$vnode && this.$vnode.ssrContext) || // stateful
                    (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext); // functional
            // 2.2 with runInNewContext: true
            if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
                context = __VUE_SSR_CONTEXT__;
            }
            // inject component styles
            if (style) {
                style.call(this, createInjectorSSR(context));
            }
            // register component module identifier for async chunk inference
            if (context && context._registeredComponents) {
                context._registeredComponents.add(moduleIdentifier);
            }
        };
        // used by ssr in case component is cached and beforeCreate
        // never gets called
        options._ssrRegister = hook;
    }
    else if (style) {
        hook = shadowMode
            ? function (context) {
                style.call(this, createInjectorShadow(context, this.$root.$options.shadowRoot));
            }
            : function (context) {
                style.call(this, createInjector(context));
            };
    }
    if (hook) {
        if (options.functional) {
            // register for functional component in vue file
            const originalRender = options.render;
            options.render = function renderWithStyleInjection(h, context) {
                hook.call(context);
                return originalRender(h, context);
            };
        }
        else {
            // inject component registration as beforeCreate hook
            const existing = options.beforeCreate;
            options.beforeCreate = existing ? [].concat(existing, hook) : [hook];
        }
    }
    return script;
}function createInjectorSSR(context) {
    if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
        context = __VUE_SSR_CONTEXT__;
    }
    if (!context)
        return () => { };
    if (!('styles' in context)) {
        context._styles = context._styles || {};
        Object.defineProperty(context, 'styles', {
            enumerable: true,
            get: () => context._renderStyles(context._styles)
        });
        context._renderStyles = context._renderStyles || renderStyles;
    }
    return (id, style) => addStyle(id, style, context);
}
function addStyle(id, css, context) {
    const group =  css.media || 'default' ;
    const style = context._styles[group] || (context._styles[group] = { ids: [], css: '' });
    if (!style.ids.includes(id)) {
        style.media = css.media;
        style.ids.push(id);
        let code = css.source;
        style.css += code + '\n';
    }
}
function renderStyles(styles) {
    let css = '';
    for (const key in styles) {
        const style = styles[key];
        css +=
            '<style data-vue-ssr-id="' +
                Array.from(style.ids).join(' ') +
                '"' +
                (style.media ? ' media="' + style.media + '"' : '') +
                '>' +
                style.css +
                '</style>';
    }
    return css;
}/* script */
var __vue_script__ = script;
/* template */

var __vue_render__ = function __vue_render__() {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _vm.show ? _c('div', {
    staticClass: "easy-checkbox"
  }, [_vm._ssrNode((_vm.labelOnLeft && _vm.text ? "<label" + _vm._ssrStyle(null, _vm.computedLabelStyle, null) + " data-v-357e382e>" + _vm._ssrEscape(_vm._s(_vm.text)) + "</label>" : "<!---->") + " <input type=\"checkbox\"" + _vm._ssrAttr("disabled", _vm.disabled) + _vm._ssrAttr("required", _vm.required) + _vm._ssrAttr("value", _vm.value) + _vm._ssrAttr("checked", _vm.checked) + " class=\"custom\" data-v-357e382e> " + (!_vm.labelOnLeft && _vm.text ? "<label" + _vm._ssrStyle(null, _vm.computedLabelStyle, null) + " data-v-357e382e>" + _vm._ssrEscape(_vm._s(_vm.text)) + "</label>" : "<!---->"))]) : _vm._e();
};

var __vue_staticRenderFns__ = [];
/* style */

var __vue_inject_styles__ = function __vue_inject_styles__(inject) {
  if (!inject) return;
  inject("data-v-357e382e_0", {
    source: "@supports (-webkit-appearance:none) or (-moz-appearance:none){.easy-checkbox[data-v-357e382e],.easy-radio[data-v-357e382e]{display:inline-block}input[type=checkbox][data-v-357e382e],input[type=radio][data-v-357e382e]{--active:#275EFE;--active-inner:#fff;--focus:2px rgba(39, 94, 254, .3);--border:#BBC1E1;--border-hover:#275EFE;--background:#fff;--disabled:#F6F8FF;--disabled-inner:#E1E6F9;-webkit-appearance:none;-moz-appearance:none;height:21px;outline:0;display:inline-block;vertical-align:top;position:relative;margin:0;cursor:pointer;border:1px solid var(--border);background:var(--b,var(--background));transition:background .3s,border-color .3s,box-shadow .2s}input[type=checkbox][data-v-357e382e]:after,input[type=radio][data-v-357e382e]:after{content:\"\";display:block;left:0;top:0;position:absolute;transition:transform var(--d-t,.3s) var(--d-t-e,ease),opacity var(--d-o,.2s)}input[type=checkbox][data-v-357e382e]:checked,input[type=radio][data-v-357e382e]:checked{--b:var(--active);--bc:var(--active);--d-o:.3s;--d-t:.6s;--d-t-e:cubic-bezier(.2, .85, .32, 1.2)}input[type=checkbox][data-v-357e382e]:disabled,input[type=radio][data-v-357e382e]:disabled{--b:var(--disabled);cursor:not-allowed;opacity:.9}input[type=checkbox][data-v-357e382e]:disabled:checked,input[type=radio][data-v-357e382e]:disabled:checked{--b:var(--disabled-inner);--bc:var(--border)}input[type=checkbox]:disabled+label[data-v-357e382e],input[type=radio]:disabled+label[data-v-357e382e]{cursor:not-allowed}input[type=checkbox][data-v-357e382e]:hover:not(:checked):not(:disabled),input[type=radio][data-v-357e382e]:hover:not(:checked):not(:disabled){--bc:var(--border-hover)}input[type=checkbox][data-v-357e382e]:focus,input[type=radio][data-v-357e382e]:focus{box-shadow:0 0 0 var(--focus)}input[type=checkbox][data-v-357e382e]:not(.switch),input[type=radio][data-v-357e382e]:not(.switch){width:21px}input[type=checkbox][data-v-357e382e]:not(.switch):after,input[type=radio][data-v-357e382e]:not(.switch):after{opacity:var(--o,0)}input[type=checkbox][data-v-357e382e]:not(.switch):checked,input[type=radio][data-v-357e382e]:not(.switch):checked{--o:1}input[type=checkbox]+label[data-v-357e382e],input[type=radio]+label[data-v-357e382e]{font-size:14px;line-height:21px;display:inline-block;vertical-align:top;cursor:auto;margin-left:4px}input[type=checkbox][data-v-357e382e]{border-radius:7px}input[type=checkbox][data-v-357e382e]:after{width:5px;height:9px;border:2px solid var(--active-inner);border-top:0;border-left:0;left:6px;top:3px;transform:rotate(45deg)}}",
    map: undefined,
    media: undefined
  });
};
/* scoped */


var __vue_scope_id__ = "data-v-357e382e";
/* module identifier */

var __vue_module_identifier__ = "data-v-357e382e";
/* functional template */

var __vue_is_functional_template__ = false;
/* style inject shadow dom */

var __vue_component__ = /*#__PURE__*/normalizeComponent({
  render: __vue_render__,
  staticRenderFns: __vue_staticRenderFns__
}, __vue_inject_styles__, __vue_script__, __vue_scope_id__, __vue_is_functional_template__, __vue_module_identifier__, false, undefined, createInjectorSSR, undefined);//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
var script$1 = {
  name: 'EasyRadio',
  methods: {
    handleOnChange: function handleOnChange(event) {
      var checked = event.target.checked;

      if (Array.isArray(this.modelValue)) {
        var modelArr = _toConsumableArray(this.modelValue);

        if (checked) {
          modelArr.push(this.value);
        } else {
          modelArr.splice(modelArr.indexOf(this.value), 1);
        }

        this.$emit('change', modelArr);
      } else if (typeof this.modelValue === 'boolean') {
        this.$emit('change', checked);
      } else if (_typeof(this.modelValue) === 'object') {
        this.$emit('change', this.value);
      }
    }
  },
  model: {
    prop: 'modelValue',
    event: 'change'
  },
  props: {
    modelValue: {
      type: [Boolean, Array, Object, String]
    },
    value: {
      type: [Boolean, Array, Object, String]
    },
    checked: {
      type: Boolean,
      default: function _default() {
        return false;
      }
    },
    required: {
      type: Boolean,
      default: function _default() {
        return false;
      }
    },
    disabled: {
      type: Boolean,
      default: function _default() {
        return false;
      }
    },
    text: {
      type: String
    },
    labelStyle: {
      type: Object,
      default: function _default() {
        return {};
      }
    },
    labelOnLeft: {
      type: Boolean,
      default: function _default() {
        return false;
      }
    },
    show: {
      type: Boolean,
      default: function _default() {
        return true;
      }
    }
  },
  computed: {
    computedLabelStyle: function computedLabelStyle() {
      var labelStyle = this.labelStyle;
      return {
        color: labelStyle.color || '#3D4066',
        fontSize: labelStyle.fontSize || '16px',
        marginLeft: labelStyle.marginLeft || '8px',
        marginRight: labelStyle.marginRight || '8px'
      };
    }
  }
};/* script */
var __vue_script__$1 = script$1;
/* template */

var __vue_render__$1 = function __vue_render__() {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _vm.show ? _c('div', {
    staticClass: "easy-radio"
  }, [_vm._ssrNode((_vm.labelOnLeft && _vm.text ? "<label" + _vm._ssrStyle(null, _vm.computedLabelStyle, null) + " data-v-41d03253>" + _vm._ssrEscape(_vm._s(_vm.text)) + "</label>" : "<!---->") + " <input type=\"radio\"" + _vm._ssrAttr("disabled", _vm.disabled) + _vm._ssrAttr("required", _vm.required) + _vm._ssrAttr("value", _vm.value) + _vm._ssrAttr("checked", _vm.checked) + " class=\"custom\" data-v-41d03253> " + (!_vm.labelOnLeft && _vm.text ? "<label" + _vm._ssrStyle(null, _vm.computedLabelStyle, null) + " data-v-41d03253>" + _vm._ssrEscape(_vm._s(_vm.text)) + "</label>" : "<!---->"))]) : _vm._e();
};

var __vue_staticRenderFns__$1 = [];
/* style */

var __vue_inject_styles__$1 = function __vue_inject_styles__(inject) {
  if (!inject) return;
  inject("data-v-41d03253_0", {
    source: "@supports (-webkit-appearance:none) or (-moz-appearance:none){.easy-checkbox[data-v-41d03253],.easy-radio[data-v-41d03253]{display:inline-block}input[type=checkbox][data-v-41d03253],input[type=radio][data-v-41d03253]{--active:#275EFE;--active-inner:#fff;--focus:2px rgba(39, 94, 254, .3);--border:#BBC1E1;--border-hover:#275EFE;--background:#fff;--disabled:#F6F8FF;--disabled-inner:#E1E6F9;-webkit-appearance:none;-moz-appearance:none;height:21px;outline:0;display:inline-block;vertical-align:top;position:relative;margin:0;cursor:pointer;border:1px solid var(--border);background:var(--b,var(--background));transition:background .3s,border-color .3s,box-shadow .2s}input[type=checkbox][data-v-41d03253]:after,input[type=radio][data-v-41d03253]:after{content:\"\";display:block;left:0;top:0;position:absolute;transition:transform var(--d-t,.3s) var(--d-t-e,ease),opacity var(--d-o,.2s)}input[type=checkbox][data-v-41d03253]:checked,input[type=radio][data-v-41d03253]:checked{--b:var(--active);--bc:var(--active);--d-o:.3s;--d-t:.6s;--d-t-e:cubic-bezier(.2, .85, .32, 1.2)}input[type=checkbox][data-v-41d03253]:disabled,input[type=radio][data-v-41d03253]:disabled{--b:var(--disabled);cursor:not-allowed;opacity:.9}input[type=checkbox][data-v-41d03253]:disabled:checked,input[type=radio][data-v-41d03253]:disabled:checked{--b:var(--disabled-inner);--bc:var(--border)}input[type=checkbox]:disabled+label[data-v-41d03253],input[type=radio]:disabled+label[data-v-41d03253]{cursor:not-allowed}input[type=checkbox][data-v-41d03253]:hover:not(:checked):not(:disabled),input[type=radio][data-v-41d03253]:hover:not(:checked):not(:disabled){--bc:var(--border-hover)}input[type=checkbox][data-v-41d03253]:focus,input[type=radio][data-v-41d03253]:focus{box-shadow:0 0 0 var(--focus)}input[type=checkbox][data-v-41d03253]:not(.switch),input[type=radio][data-v-41d03253]:not(.switch){width:21px}input[type=checkbox][data-v-41d03253]:not(.switch):after,input[type=radio][data-v-41d03253]:not(.switch):after{opacity:var(--o,0)}input[type=checkbox][data-v-41d03253]:not(.switch):checked,input[type=radio][data-v-41d03253]:not(.switch):checked{--o:1}input[type=checkbox]+label[data-v-41d03253],input[type=radio]+label[data-v-41d03253]{font-size:14px;line-height:21px;display:inline-block;vertical-align:top;cursor:auto;margin-left:4px}input[type=radio][data-v-41d03253]{border-radius:50%}input[type=radio][data-v-41d03253]:after{width:19px;height:19px;border-radius:50%;background:var(--active-inner);opacity:0;transform:scale(var(--s,.7))}input[type=radio][data-v-41d03253]:checked{--s:.5}}",
    map: undefined,
    media: undefined
  });
};
/* scoped */


var __vue_scope_id__$1 = "data-v-41d03253";
/* module identifier */

var __vue_module_identifier__$1 = "data-v-41d03253";
/* functional template */

var __vue_is_functional_template__$1 = false;
/* style inject shadow dom */

var __vue_component__$1 = /*#__PURE__*/normalizeComponent({
  render: __vue_render__$1,
  staticRenderFns: __vue_staticRenderFns__$1
}, __vue_inject_styles__$1, __vue_script__$1, __vue_scope_id__$1, __vue_is_functional_template__$1, __vue_module_identifier__$1, false, undefined, createInjectorSSR, undefined);var components=/*#__PURE__*/Object.freeze({__proto__:null,EasyCheckbox: __vue_component__,EasyRadio: __vue_component__$1});var install = function installVueEasyControls(Vue) {
  if (install.installed) return;
  install.installed = true;
  Object.entries(components).forEach(function (_ref) {
    var _ref2 = _slicedToArray(_ref, 2),
        componentName = _ref2[0],
        component = _ref2[1];

    Vue.component(componentName, component);
  });
}; // Create module definition for Vue.use()


var plugin = {
  install: install
}; // To auto-install on non-es builds, when vue is found
// eslint-disable-next-line no-redeclare

/* global window, global */

{
  var GlobalVue = null;

  if (typeof window !== 'undefined') {
    GlobalVue = window.Vue;
  } else if (typeof global !== 'undefined') {
    GlobalVue = global.Vue;
  }

  if (GlobalVue) {
    GlobalVue.use(plugin);
  }
} // Default export is library as a whole, registered via Vue.use()
exports.EasyCheckbox=__vue_component__;exports.EasyRadio=__vue_component__$1;exports.default=plugin;