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

<script setup lang="ts">
const props = defineProps({
    item: String
})

const emit = defineEmits(['input','add'])

function handleInput(event: InputEvent){
    const eventTarget = event.target as HTMLInputElement;
    emit('input', eventTarget.value);
}

function addTodo() {
    emit('add', props.item)
}

</script>

<style scoped lang="scss">
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