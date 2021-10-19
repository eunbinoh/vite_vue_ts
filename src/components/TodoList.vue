<template>
    <li>
        <div>
            <span class="item" :class="todoItem.done? 'complete':'item' " @click="toggleItem">
                {{ todoItem.title }}
            </span>
            <button id="rmBtn" @click="removeItem">삭제</button>
        </div>
    </li>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { Todo } from "../App.vue";

export default defineComponent({
    name: 'TodoList',
    props: {
        todoItem: Object as PropType<Todo>,
        index: Number
    },
    methods: {
        toggleItem() {
            this.$emit('toggle', this.todoItem, this.index);
        },
        removeItem() {
            this.$emit('remove', this.index);
        }
    }
})
</script>

<style scoped>
li {
   list-style: none;
   margin-top: 10px;
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
}
</style>
