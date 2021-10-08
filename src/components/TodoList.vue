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
.item{
    cursor: pointer;
}
 .complete{
     text-decoration: line-through;
 }
 #rmBtn {
  margin-left: auto;
  padding-right: 20px !important;
  color: grey;
}
</style>
