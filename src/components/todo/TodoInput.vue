<template>
    <div>
        <label for="todo-input">오늘 업무 : </label>
        <input id="todo-input" 
                type="text"
                :value="item"
                @input="handleInput" 
                @keypress.enter="addTodo"/>
        <button id="addBtn" @click="addTodo">+</button>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
    name: 'TodoInput',
    props: {
        item: {
            type: String,
            required: true
        }
    },
    methods: {
        handleInput(event: InputEvent) {
            const eventTarget = event.target as HTMLInputElement;
            this.$emit('input', eventTarget.value);
        },
        addTodo() {
            this.$emit('add')
        },
    }
})
</script>

<style scoped>
#addBtn {
  margin-left: 10px !important;
  font-size: large;
  font-weight: bold;
  color: white;
  background-color: #9c7bac85;
  border-radius: 5px;
  border: 1px solid #9c7bac85;
}
#addBtn:hover{
  color: #9270a3;
  background-color: white;
  cursor: pointer;
}
</style>