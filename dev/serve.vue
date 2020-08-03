<script>
import Vue from 'vue';
import { EasyCheckbox, EasyRadio } from '@/entry';

export default {
  name: 'Examples',
  components: {
    EasyCheckbox,
    EasyRadio
  },
  data() {
    return {
      todos: [{
        id: 0,
        text: 'Todo 1'
      },
      {
        id: 1,
        text: 'Todo 2'
      },
      {
        id: 2,
        text: 'Todo 3'
      }],
      completedTodos: [],
      selectedTodo: {},
      radioLabelStyle: {
        fontSize: '24px',
        marginRight: '24px'
      },
      isChecked: false,
      allTodosCompleted: false
    }
  }
}
</script>

<template>
  <div id="app">
    <div class="examples">
      <div id="example-checkbox">
        <button @click="completedTodos = [...todos]">Complete all todos</button>
        
        <easy-checkbox :labelStyle="{fontSize: '18px', color: 'brown'}" 
                  v-for="todo in todos" :value="todo" 
                  v-model="completedTodos" :key="`${todo.id}_checkbox`"
                  :checked="completedTodos.findIndex(x => x.id === todo.id) > -1" :text="todo.text" labelOnLeft />
        
        <template v-if="completedTodos.length > 0">
          <h3>Completed Todos:</h3>
          <p v-for="completedTodo in completedTodos" :key="`${completedTodo.id}_done`">{{ completedTodo.text }}</p>
          <button @click="completedTodos = []">Uncomplete all todos</button>
        </template>
      </div>

      <div id="example-radio">
        <easy-radio :labelStyle="radioLabelStyle" v-for="todo in todos" :value="todo"
                v-model="selectedTodo" :key="`${todo.id}_radio`" :text="todo.text" 
               :checked="selectedTodo.id === todo.id" />
        <template v-if="Object.keys(selectedTodo).length > 0">
          <h3>Selected Todo:</h3>

          <p :key="`${selectedTodo.id}`">{{ selectedTodo.id + 1 }}- {{ selectedTodo.text }}</p>
          <button @click="selectedTodo = {}">Clear selected todo</button>
        </template>
      </div>

      <div id="example-radio-2">
        <easy-radio v-model="isChecked" text="Check me!" :disabled="isChecked" />
      </div>

    </div>
  </div>
</template>

<style lang="scss">
  body {
    margin: 0;
  }
  .examples {
     height: 100vh;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    justify-items: center;
    align-items: center;
  }
</style>