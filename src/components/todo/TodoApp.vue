<template>
  <header>
    <h1><router-link to="/"> My Work Diary ( {{ dayjs().format('MM/DD') }} ) </router-link> </h1>
    <p>Author_ nonbi</p>
  </header>
  
  <main>
    <TodoInput :item="content.todoText" @input="updateTodoText" @add="addTodoItem" />
    <div class="todoList">
      <ul>
        <TodoItems
          v-for="(todoItem, index) in content.todoItems"
          :key="index"
          :index="index"
          :todoItem="todoItem"
          @toggle="toggleComplete"
          @remove="removeItem"
        />
      </ul>
    </div>
  </main>
</template>

<script setup lang='ts'>
import TodoInput from '@/components/todo/TodoInput.vue'
import TodoItems from './TodoItems.vue'
import Header from '@/components/home/header.vue'
import dayjs from 'dayjs'
import { reactive } from 'vue'

const content = reactive({
  todoText: '',
  todoItems: [] as Todo[],
})

const addTodoItem = () => {
  content.todoItems.push({
    title: content.todoText,
    done: false,
    date: dayjs().format('YY/MM/DD')
  })

  storage.save(content.todoItems)
  clearTodoText()
}

const clearTodoText = () => {
  content.todoText = ''
}

const updateTodoText = (value: string) => {
  if (typeof value === 'string') {
    content.todoText = value
  }
}
const STORAGE_KEY = 'vue-ts-storage1'
const storage = {
  save(todoItem: Todo[]) {
    const parsed = JSON.stringify(todoItem)
    localStorage.setItem(STORAGE_KEY, parsed)
  },
  fetch(): Todo[] {
    const todoItems = localStorage.getItem(STORAGE_KEY) || '[]'
    return JSON.parse(todoItems)
  },
}

const fetchTodoItems = () => {
  // 윗줄에 있는 const storage = { fetch():{} 에서 가져온 storage.fetch() }
  content.todoItems = storage.fetch().sort((a, b) => {
    if (a.title > b.title) {
      return 1
    } else if (a.title < b.title) {
      return -1
    } else {
      return 0
    }
  })
}

const toggleComplete = (todoItem: Todo, index: number) => {
  content.todoItems.splice(index, 1, { ...todoItem, done: !todoItem.done })
}

const removeItem = (index: number) => {
  content.todoItems.splice(index, 1)
  storage.save(content.todoItems)
}

fetchTodoItems()


</script>

<style scoped lang="scss">
@import "@/assets/style/main_style.scss";
main {
  text-align: center;
  margin-top: 20px;
  & .todoList {
    display: flex;
    justify-content: center;
  }
}
</style>