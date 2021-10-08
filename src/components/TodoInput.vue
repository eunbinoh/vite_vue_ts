<template>
    <div>
        <label for="todo-input">오늘 업무 : </label>
        <input id="todo-input" 
                type="text"
                :value="item"
                @input="handleInput" 
                @keypress.enter="addTodo"/>
        <button id="addBtn" @click="addTodo">추가</button>
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

</style>