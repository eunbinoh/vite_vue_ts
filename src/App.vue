<template>
  <header>
      <h1> Todo by Vue.Ts</h1>
  </header>
  <main>
      <TodoInput :item="content.todoText" @input="updateTodoText" @add="addTodoItem"/>
      <div>
          <ul>

          </ul>
      </div>
  </main>
</template>
<script setup lang="ts">
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup
import TodoInput from "./components/TodoInput.vue"
import { reactive } from 'vue';

export interface Todo {
  title: string,
  done: boolean;
}

const content = reactive({
  todoText:'',
  todoItems: [] as Todo[]
})

const addTodoItem = () => {
  const value = content.todoText;
  const todo: Todo = {
    title: value,
    done: false
  }

  content.todoItems.push(todo);
  storage.save(content.todoItems);
  initTodoText();
}

const initTodoText = () => {
  content.todoText ='';
}

const updateTodoText = (value: string) => {
  if(typeof value === 'string'){
    content.todoText = value;
  }
}
const STORAGE_KEY = "vue-ts-storage1";
const storage = {
      save(TodoItem: Todo[]){
        const parsed = JSON.stringify(TodoItem);
        localStorage.setItem(STORAGE_KEY, parsed);
      },
      fetch(): Todo[]{
        const todoItems = localStorage.getItem(STORAGE_KEY)||'[]';
        return JSON.parse(todoItems);
      }      
}

</script>

