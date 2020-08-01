<template>
  <div :class="{'v-checkbox-group': checkboxGroup}" v-if="show" class="easy-checkbox">
    <label v-if="labelOnLeft && text" :style="computedStyle">{{ text }}</label>
    <input
      type="checkbox"
      class="custom"
      :value="value"
      @change="handleOnChange"
      :checked="checked"
    />
    <label v-if="!labelOnLeft && text" :style="computedStyle">{{ text }}</label>
  </div>
</template>

<script>
export default {
  name: 'Checkbox',

  watch: {},

  methods: {
    handleOnChange (event) {
      console.log('changed', event.target.checked)
      const { checked } = event.target

      if (Array.isArray(this.modelValue)) {
        const modelArr = [...this.modelValue]

        console.log('VALUE', this.value, modelArr)
        if (checked) {
          modelArr.push(this.value)
        } else {
          modelArr.splice(modelArr.indexOf(this.value), 1)
        }
        this.$emit('change', modelArr)
      } else if (typeof this.modelValue === 'boolean') {
        console.log('VAL', checked)
        this.$emit('change', checked)
      } else if (typeof this.modelValue === 'object') {
        console.log('object', this.value)
        this.$emit('change', this.value)
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

    text: {
      type: String
    },

    checkboxGroup: {
      type: Boolean
    },

    customStyle: {
      type: Object,
      default () {
        return {}
      }
    },

    labelOnLeft: {
      type: Boolean,
      default () {
        return false
      }
    },

    show: {
      type: Boolean,
      default () {
        return true
      }
    }
  },

  computed: {
    computedStyle () {
      const { customStyle } = this
      return {
        color: customStyle.color || '#3D4066',
        fontSize: customStyle.fontSize || '14px',
        marginLeft: customStyle.marginLeft || '8px',
        marginRight: customStyle.marginRight || '8px'
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@supports(-webkit-appearance: none) or (-moz-appearance: none) {
  input[type='checkbox'],
  input[type='radio'] {
    --active: #275EFE;
    --active-inner: #fff;
    --focus: 2px rgba(74, 87, 128, 0.3);
    --border: #BBC1E1;
    --border-hover: #275EFE;
    --background: #fff;
    --disabled: #F6F8FF;
    --disabled-inner: #E1E6F9;
    -webkit-appearance: none;
    -moz-appearance: none;
    height: 21px;
    outline: none;
    display: inline-block;
    vertical-align: top;
    position: relative;
    margin: 0;
    cursor: pointer;
    border: 1px solid var(--bc, var(--border));
    background: var(--b, var(--background));
    transition: background .3s, border-color .3s, box-shadow .2s;
    &:after {
      content: '';
      display: block;
      left: 6px!important;
      top: 3px!important;
      position: absolute;
      transition: transform var(--d-t, .3s) var(--d-t-e, ease), opacity var(--d-o, .2s);
    }
    &:checked {
      --b: var(--active);
      --bc: var(--active);
      --d-o: .3s;
      --d-t: .6s;
      --d-t-e: cubic-bezier(.2, .85, .32, 1.2);
    }
    &:disabled {
      --b: var(--disabled);
      cursor: not-allowed;
      opacity: .9;
      &:checked {
        --b: var(--disabled-inner);
        --bc: var(--border);
      }
      & + label {
        cursor: not-allowed;
      }
    }
    &:hover {
      &:not(:checked) {
        &:not(:disabled) {
          --bc: var(--border-hover);
        }
      }
    }
    &:focus {
      box-shadow: 0 0 0 var(--focus);
    }
    &:not(.switch) {
      width: 21px;
      &:after {
        opacity: var(--o, 0);
      }
      &:checked {
        --o: 1;
      }
    }
    & + label {
      font-size: 14px;
      line-height: 21px;
      display: inline-block;
      vertical-align: top;
      cursor: pointer;
      margin-left: 4px;
    }
  }
  input[type='checkbox'] {
    &:not(.switch) {
      border-radius: 7px;
      &:after {
        width: 5px;
        height: 9px;
        border: 2px solid var(--active-inner);
        border-top: 0;
        border-left: 0;
        left: 7px;
        top: 4px;
        transform: rotate(var(--r, 20deg));
      }
      &:checked {
        --r: 43deg;
      }
    }
    &.switch {
      width: 38px;
      border-radius: 11px;
      &:after {
        left: 2px;
        top: 2px;
        border-radius: 50%;
        width: 15px;
        height: 15px;
        background: var(--ab, var(--border));
        transform: translateX(var(--x, 0));
      }
      &:checked {
        --ab: var(--active-inner);
        --x: 17px;
      }
      &:disabled {
        &:not(:checked) {
          &:after {
            opacity: .6;
          }
        }
      }
    }
  }
  input[type='radio'] {
    border-radius: 50%;
    &:after {
      width: 19px;
      height: 19px;
      border-radius: 50%;
      background: var(--active-inner);
      opacity: 0;
      transform: scale(var(--s, .7));
    }
    &:checked {
      --s: .5;
    }
  }
}

</style>
