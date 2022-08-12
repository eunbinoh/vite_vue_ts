<template>
    <li>
        <div class="todoList">
            <span class="item" :class="todoItem?.done? 'complete':'item' " @click="toggleItem">
                {{ todoItem?.title }}
            </span>
            <button id="rmBtn" @click="removeItem">삭제</button>
        </div>
    </li>
</template>

<script setup lang="ts">
import { PropType } from 'vue'

const props = defineProps({
    todoItem: Object as PropType<Todo>,
    index: Number
})

const emit = defineEmits(['toggle', 'remove']);


function toggleItem() {
    emit('toggle', props.todoItem, props.index)
}

function removeItem() {
    emit('remove', props.index)
}

</script>

<style scoped lang="scss">
li {
   list-style: none;
   margin-top: 10px;
}
.todoList {
    margin-left: 30px;
    text-align: left;
}
.item {
    cursor: pointer;
}
.complete {
   text-decoration: line-through;
   color: #9270a3;
 }
#rmBtn {
  margin-left: 20px !important;
  color: grey;
  background-color: white;
  border-radius: 5px;
  border: 1px solid grey;
}
#rmBtn:hover{
  color: white;
  background-color: grey;
  cursor: pointer;
}
</style>
