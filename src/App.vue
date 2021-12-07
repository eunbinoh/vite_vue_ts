<template>
  <header>
      <h1> {{ today }} _TODO LIST </h1>
      <p> Author_ nonbi</p>
  </header>
  <main>
    <TodoInput :item="content.todoText" @input="updateTodoText" @add="addTodoItem"/>
    <div>
        <ul>
            <TodoList v-for="(todoItem, index) in content.todoItems"
                          :key="index"
                          :index="index"
                          :todoItem="todoItem"
                          @toggle="toggleComplete"
                          @remove="removeItem"/>
        </ul>
    </div>
  </main>
</template>


<script setup lang="ts">
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup
import TodoInput from "./components/TodoInput.vue"
import TodoList from "./components/TodoList.vue"
import dayjs from "dayjs"
import { reactive } from "vue"

export interface Todo {
  title: string,
  done: boolean;
}

const today = dayjs().format("MM/DD");

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
      save(todoItem: Todo[]){
        const parsed = JSON.stringify(todoItem);
        localStorage.setItem(STORAGE_KEY, parsed);
      },
      fetch(): Todo[]{
        const todoItems = localStorage.getItem(STORAGE_KEY)||'[]';
        return JSON.parse(todoItems);
      }     
}

const fetchTodoItems = () => {
  // 윗줄에 있는 const storage = { fetch():{} 에서 가져온 storage.fetch() }
  content.todoItems = storage.fetch().sort((a, b) => {
    if( a.title > b.title ) {
      return 1;
    } else if( a.title < b.title ) {
      return -1;
    } else {
      return 0;
    }
  });
}

const toggleComplete = (todoItem:Todo, index:number) => {
  content.todoItems.splice(index,1, { ...todoItem, done: !todoItem.done })
}

const removeItem = (index: number) => {
  content.todoItems.splice(index,1);
  storage.save(content.todoItems);
}

fetchTodoItems();

</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Stylish&display=swap');
 header {
  font-family: 'Stylish', cursive;
  text-align: center;
  background-color: #9c7bac85;
  color: aliceblue;
}
 main {
  font-family: 'Stylish', sans-serif;
  text-align: center;
}
 p {
  font-family: 'Stylish', sans-serif;
  text-align: right;
}
</style>

