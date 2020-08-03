# Vue Easy Controls

> An easy to use Checkbox and Radio components for Vue 2

## Installing

`npm i vue2-easy-controls`

### <center>OR<center/>

`yarn add vue2-easy-controls`


## Usage

### Registering components globally

```js
import { EasyCheckbox, EasyRadio } from 'vue2-easy-controls'

Vue.use(EasyCheckbox)
Vue.use(EasyRadio)
```

### Registering components locally

```js
import { EasyCheckbox, EasyRadio } from 'vue2-easy-controls'

export default {
  name: 'MyLocalComponent'
  components: {
    EasyCheckbox,
    EasyRadio
  }
}
```


```js
data () {
  return {
    isChecked: false
  }
}
```
```html
  <easy-checkbox text="Checkbox component" v-model="isChecked" />
```

### <center>OR<center/>

```html
  <easy-radio text="Radio component" v-model="isChecked" />
```

## For more examples check [here]([here](https://github.com/umutbozdag/vue-easy-controls/blob/master/dev/serve.vue))


> NOTE: Props for both of the components are the same

### Props
Prop | Type | Default
------------ | ------------- | -------------
value | Any | 
checked | Boolean | `false`
disabled | Boolean | `false`
required | Boolean | `false`
text | String |
labelStyle | Object | {  `color` (default: #3D4066), `fontSize` (default: '16px'), `marginLeft` (default: '8px'), `marginRight`: (default: '8px') }
labelOnLeft | Boolean | `false`
show | Boolean | `true`

#### TODO:
  - [ ] Make components more customizable (custom style, custom icons etc.)
  - [ ] Make components more accessible
  - [ ] Improve documentation by adding live examples
  - [ ] Add switch component