<template>
  <div v-if="show" class="easy-radio">
    <label v-if="labelOnLeft && text" :style="computedLabelStyle">{{ text }}</label>
    <input
      type="radio"
      class="custom"
      :value="value"
      @change="handleOnChange"
      :checked="checked"
      :disabled="disabled"
      :required="required"
    />
    <label v-if="!labelOnLeft && text" :style="computedLabelStyle">{{ text }}</label>
  </div>
</template>

<script>
export default {
  name: 'EasyRadio',

  methods: {
    handleOnChange (event) {
      const { checked } = event.target

      if (Array.isArray(this.modelValue)) {
        const modelArr = [...this.modelValue]

        if (checked) {
          modelArr.push(this.value)
        } else {
          modelArr.splice(modelArr.indexOf(this.value), 1)
        }
        this.$emit('change', modelArr)
      } else if (typeof this.modelValue === 'boolean') {
        this.$emit('change', checked)
      } else if (typeof this.modelValue === 'object') {
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
      default () {
        return {}
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
    computedLabelStyle () {
      const { labelStyle } = this
      return {
        color: labelStyle.color || '#3D4066',
        fontSize: labelStyle.fontSize || '16px',
        marginLeft: labelStyle.marginLeft || '8px',
        marginRight: labelStyle.marginRight || '8px'
      }
    },
  }
}
</script>

<style lang="scss" scoped>
@supports(-webkit-appearance: none) or (-moz-appearance: none) {
  @import '../styles.scss';
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
