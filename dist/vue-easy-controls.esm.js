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
//
var script = {
  name: 'EasyCheckbox',
  methods: {
    handleOnChange(event) {
      const {
        checked
      } = event.target;

      if (Array.isArray(this.modelValue)) {
        const modelArr = [...this.modelValue];

        if (checked) {
          modelArr.push(this.value);
        } else {
          modelArr.splice(modelArr.indexOf(this.value), 1);
        }

        this.$emit('change', modelArr);
      } else if (typeof this.modelValue === 'boolean') {
        this.$emit('change', checked);
      } else if (typeof this.modelValue === 'object') {
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
      default: () => false
    },
    checked: {
      type: Boolean,
      default: () => false
    },
    disabled: {
      type: Boolean,
      default: () => false
    },
    text: {
      type: String
    },
    labelStyle: {
      type: Object,
      default: () => {}
    },
    labelOnLeft: {
      type: Boolean,
      default: () => false
    },
    show: {
      type: Boolean,
      default: () => true
    }
  },
  computed: {
    computedLabelStyle() {
      const {
        labelStyle
      } = this;
      return {
        color: labelStyle.color || '#3D4066',
        fontSize: labelStyle.fontSize || '16px',
        marginLeft: labelStyle.marginLeft || '8px',
        marginRight: labelStyle.marginRight || '8px'
      };
    }

  }
};

function normalizeComponent(template, style, script, scopeId, isFunctionalTemplate, moduleIdentifier /* server only */, shadowMode, createInjector, createInjectorSSR, createInjectorShadow) {
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
}

const isOldIE = typeof navigator !== 'undefined' &&
    /msie [6-9]\\b/.test(navigator.userAgent.toLowerCase());
function createInjector(context) {
    return (id, style) => addStyle(id, style);
}
let HEAD;
const styles = {};
function addStyle(id, css) {
    const group = isOldIE ? css.media || 'default' : id;
    const style = styles[group] || (styles[group] = { ids: new Set(), styles: [] });
    if (!style.ids.has(id)) {
        style.ids.add(id);
        let code = css.source;
        if (css.map) {
            // https://developer.chrome.com/devtools/docs/javascript-debugging
            // this makes source maps inside style tags work properly in Chrome
            code += '\n/*# sourceURL=' + css.map.sources[0] + ' */';
            // http://stackoverflow.com/a/26603875
            code +=
                '\n/*# sourceMappingURL=data:application/json;base64,' +
                    btoa(unescape(encodeURIComponent(JSON.stringify(css.map)))) +
                    ' */';
        }
        if (!style.element) {
            style.element = document.createElement('style');
            style.element.type = 'text/css';
            if (css.media)
                style.element.setAttribute('media', css.media);
            if (HEAD === undefined) {
                HEAD = document.head || document.getElementsByTagName('head')[0];
            }
            HEAD.appendChild(style.element);
        }
        if ('styleSheet' in style.element) {
            style.styles.push(code);
            style.element.styleSheet.cssText = style.styles
                .filter(Boolean)
                .join('\n');
        }
        else {
            const index = style.ids.size - 1;
            const textNode = document.createTextNode(code);
            const nodes = style.element.childNodes;
            if (nodes[index])
                style.element.removeChild(nodes[index]);
            if (nodes.length)
                style.element.insertBefore(textNode, nodes[index]);
            else
                style.element.appendChild(textNode);
        }
    }
}

/* script */
const __vue_script__ = script;
/* template */

var __vue_render__ = function () {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _vm.show ? _c('div', {
    staticClass: "easy-checkbox"
  }, [_vm.labelOnLeft && _vm.text ? _c('label', {
    style: _vm.computedLabelStyle
  }, [_vm._v(_vm._s(_vm.text))]) : _vm._e(), _vm._v(" "), _c('input', {
    staticClass: "custom",
    attrs: {
      "type": "checkbox",
      "disabled": _vm.disabled,
      "required": _vm.required
    },
    domProps: {
      "value": _vm.value,
      "checked": _vm.checked
    },
    on: {
      "change": _vm.handleOnChange
    }
  }), _vm._v(" "), !_vm.labelOnLeft && _vm.text ? _c('label', {
    style: _vm.computedLabelStyle
  }, [_vm._v(_vm._s(_vm.text))]) : _vm._e()]) : _vm._e();
};

var __vue_staticRenderFns__ = [];
/* style */

const __vue_inject_styles__ = function (inject) {
  if (!inject) return;
  inject("data-v-357e382e_0", {
    source: "@supports (-webkit-appearance:none) or (-moz-appearance:none){.easy-checkbox[data-v-357e382e],.easy-radio[data-v-357e382e]{display:inline-block}input[type=checkbox][data-v-357e382e],input[type=radio][data-v-357e382e]{--active:#275EFE;--active-inner:#fff;--focus:2px rgba(39, 94, 254, .3);--border:#BBC1E1;--border-hover:#275EFE;--background:#fff;--disabled:#F6F8FF;--disabled-inner:#E1E6F9;-webkit-appearance:none;-moz-appearance:none;height:21px;outline:0;display:inline-block;vertical-align:top;position:relative;margin:0;cursor:pointer;border:1px solid var(--border);background:var(--b,var(--background));transition:background .3s,border-color .3s,box-shadow .2s}input[type=checkbox][data-v-357e382e]:after,input[type=radio][data-v-357e382e]:after{content:\"\";display:block;left:0;top:0;position:absolute;transition:transform var(--d-t,.3s) var(--d-t-e,ease),opacity var(--d-o,.2s)}input[type=checkbox][data-v-357e382e]:checked,input[type=radio][data-v-357e382e]:checked{--b:var(--active);--bc:var(--active);--d-o:.3s;--d-t:.6s;--d-t-e:cubic-bezier(.2, .85, .32, 1.2)}input[type=checkbox][data-v-357e382e]:disabled,input[type=radio][data-v-357e382e]:disabled{--b:var(--disabled);cursor:not-allowed;opacity:.9}input[type=checkbox][data-v-357e382e]:disabled:checked,input[type=radio][data-v-357e382e]:disabled:checked{--b:var(--disabled-inner);--bc:var(--border)}input[type=checkbox]:disabled+label[data-v-357e382e],input[type=radio]:disabled+label[data-v-357e382e]{cursor:not-allowed}input[type=checkbox][data-v-357e382e]:hover:not(:checked):not(:disabled),input[type=radio][data-v-357e382e]:hover:not(:checked):not(:disabled){--bc:var(--border-hover)}input[type=checkbox][data-v-357e382e]:focus,input[type=radio][data-v-357e382e]:focus{box-shadow:0 0 0 var(--focus)}input[type=checkbox][data-v-357e382e]:not(.switch),input[type=radio][data-v-357e382e]:not(.switch){width:21px}input[type=checkbox][data-v-357e382e]:not(.switch):after,input[type=radio][data-v-357e382e]:not(.switch):after{opacity:var(--o,0)}input[type=checkbox][data-v-357e382e]:not(.switch):checked,input[type=radio][data-v-357e382e]:not(.switch):checked{--o:1}input[type=checkbox]+label[data-v-357e382e],input[type=radio]+label[data-v-357e382e]{font-size:14px;line-height:21px;display:inline-block;vertical-align:top;cursor:auto;margin-left:4px}input[type=checkbox][data-v-357e382e]{border-radius:7px}input[type=checkbox][data-v-357e382e]:after{width:5px;height:9px;border:2px solid var(--active-inner);border-top:0;border-left:0;left:6px;top:3px;transform:rotate(45deg)}}",
    map: undefined,
    media: undefined
  });
};
/* scoped */


const __vue_scope_id__ = "data-v-357e382e";
/* module identifier */

const __vue_module_identifier__ = undefined;
/* functional template */

const __vue_is_functional_template__ = false;
/* style inject SSR */

/* style inject shadow dom */

const __vue_component__ = /*#__PURE__*/normalizeComponent({
  render: __vue_render__,
  staticRenderFns: __vue_staticRenderFns__
}, __vue_inject_styles__, __vue_script__, __vue_scope_id__, __vue_is_functional_template__, __vue_module_identifier__, false, createInjector, undefined, undefined);

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
//
var script$1 = {
  name: 'EasyRadio',
  methods: {
    handleOnChange(event) {
      const {
        checked
      } = event.target;

      if (Array.isArray(this.modelValue)) {
        const modelArr = [...this.modelValue];

        if (checked) {
          modelArr.push(this.value);
        } else {
          modelArr.splice(modelArr.indexOf(this.value), 1);
        }

        this.$emit('change', modelArr);
      } else if (typeof this.modelValue === 'boolean') {
        this.$emit('change', checked);
      } else if (typeof this.modelValue === 'object') {
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
      default: () => false
    },
    required: {
      type: Boolean,
      default: () => false
    },
    disabled: {
      type: Boolean,
      default: () => false
    },
    text: {
      type: String
    },
    labelStyle: {
      type: Object,

      default() {
        return {};
      }

    },
    labelOnLeft: {
      type: Boolean,
      default: () => false
    },
    show: {
      type: Boolean,
      default: () => true
    }
  },
  computed: {
    computedLabelStyle() {
      const {
        labelStyle
      } = this;
      return {
        color: labelStyle.color || '#3D4066',
        fontSize: labelStyle.fontSize || '16px',
        marginLeft: labelStyle.marginLeft || '8px',
        marginRight: labelStyle.marginRight || '8px'
      };
    }

  }
};

/* script */
const __vue_script__$1 = script$1;
/* template */

var __vue_render__$1 = function () {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _vm.show ? _c('div', {
    staticClass: "easy-radio"
  }, [_vm.labelOnLeft && _vm.text ? _c('label', {
    style: _vm.computedLabelStyle
  }, [_vm._v(_vm._s(_vm.text))]) : _vm._e(), _vm._v(" "), _c('input', {
    staticClass: "custom",
    attrs: {
      "type": "radio",
      "disabled": _vm.disabled,
      "required": _vm.required
    },
    domProps: {
      "value": _vm.value,
      "checked": _vm.checked
    },
    on: {
      "change": _vm.handleOnChange
    }
  }), _vm._v(" "), !_vm.labelOnLeft && _vm.text ? _c('label', {
    style: _vm.computedLabelStyle
  }, [_vm._v(_vm._s(_vm.text))]) : _vm._e()]) : _vm._e();
};

var __vue_staticRenderFns__$1 = [];
/* style */

const __vue_inject_styles__$1 = function (inject) {
  if (!inject) return;
  inject("data-v-41d03253_0", {
    source: "@supports (-webkit-appearance:none) or (-moz-appearance:none){.easy-checkbox[data-v-41d03253],.easy-radio[data-v-41d03253]{display:inline-block}input[type=checkbox][data-v-41d03253],input[type=radio][data-v-41d03253]{--active:#275EFE;--active-inner:#fff;--focus:2px rgba(39, 94, 254, .3);--border:#BBC1E1;--border-hover:#275EFE;--background:#fff;--disabled:#F6F8FF;--disabled-inner:#E1E6F9;-webkit-appearance:none;-moz-appearance:none;height:21px;outline:0;display:inline-block;vertical-align:top;position:relative;margin:0;cursor:pointer;border:1px solid var(--border);background:var(--b,var(--background));transition:background .3s,border-color .3s,box-shadow .2s}input[type=checkbox][data-v-41d03253]:after,input[type=radio][data-v-41d03253]:after{content:\"\";display:block;left:0;top:0;position:absolute;transition:transform var(--d-t,.3s) var(--d-t-e,ease),opacity var(--d-o,.2s)}input[type=checkbox][data-v-41d03253]:checked,input[type=radio][data-v-41d03253]:checked{--b:var(--active);--bc:var(--active);--d-o:.3s;--d-t:.6s;--d-t-e:cubic-bezier(.2, .85, .32, 1.2)}input[type=checkbox][data-v-41d03253]:disabled,input[type=radio][data-v-41d03253]:disabled{--b:var(--disabled);cursor:not-allowed;opacity:.9}input[type=checkbox][data-v-41d03253]:disabled:checked,input[type=radio][data-v-41d03253]:disabled:checked{--b:var(--disabled-inner);--bc:var(--border)}input[type=checkbox]:disabled+label[data-v-41d03253],input[type=radio]:disabled+label[data-v-41d03253]{cursor:not-allowed}input[type=checkbox][data-v-41d03253]:hover:not(:checked):not(:disabled),input[type=radio][data-v-41d03253]:hover:not(:checked):not(:disabled){--bc:var(--border-hover)}input[type=checkbox][data-v-41d03253]:focus,input[type=radio][data-v-41d03253]:focus{box-shadow:0 0 0 var(--focus)}input[type=checkbox][data-v-41d03253]:not(.switch),input[type=radio][data-v-41d03253]:not(.switch){width:21px}input[type=checkbox][data-v-41d03253]:not(.switch):after,input[type=radio][data-v-41d03253]:not(.switch):after{opacity:var(--o,0)}input[type=checkbox][data-v-41d03253]:not(.switch):checked,input[type=radio][data-v-41d03253]:not(.switch):checked{--o:1}input[type=checkbox]+label[data-v-41d03253],input[type=radio]+label[data-v-41d03253]{font-size:14px;line-height:21px;display:inline-block;vertical-align:top;cursor:auto;margin-left:4px}input[type=radio][data-v-41d03253]{border-radius:50%}input[type=radio][data-v-41d03253]:after{width:19px;height:19px;border-radius:50%;background:var(--active-inner);opacity:0;transform:scale(var(--s,.7))}input[type=radio][data-v-41d03253]:checked{--s:.5}}",
    map: undefined,
    media: undefined
  });
};
/* scoped */


const __vue_scope_id__$1 = "data-v-41d03253";
/* module identifier */

const __vue_module_identifier__$1 = undefined;
/* functional template */

const __vue_is_functional_template__$1 = false;
/* style inject SSR */

/* style inject shadow dom */

const __vue_component__$1 = /*#__PURE__*/normalizeComponent({
  render: __vue_render__$1,
  staticRenderFns: __vue_staticRenderFns__$1
}, __vue_inject_styles__$1, __vue_script__$1, __vue_scope_id__$1, __vue_is_functional_template__$1, __vue_module_identifier__$1, false, createInjector, undefined, undefined);

var components = /*#__PURE__*/Object.freeze({
  __proto__: null,
  EasyCheckbox: __vue_component__,
  EasyRadio: __vue_component__$1
});

// Import vue components

const install = function installVue2EasyControls(Vue) {
  if (install.installed) return;
  install.installed = true;
  Object.entries(components).forEach(([componentName, component]) => {
    Vue.component(componentName, component);
  });
}; // Create module definition for Vue.use()


const plugin = {
  install
}; // To auto-install on non-es builds, when vue is found

export default plugin;
export { __vue_component__ as EasyCheckbox, __vue_component__$1 as EasyRadio };
