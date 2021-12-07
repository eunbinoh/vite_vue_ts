<template>
    <label class="form-label" :class="{require: isRequire}" > {{ label }}</label>
    <div style="display: flex" >
    <VmMonth v-model="stt" :hideInputIcon="false" @update:modelValue="updateTwoValue"/>
        <span class="rangePosition">~</span>
    <VmMonth v-model="end" :hideInputIcon="false" @update:modelValue="updateTwoValue"/>
    <!-- <Datepicker
      v-model="innerModelValue"
      @update:modelValue="updateModelValue"
    >
    </Datepicker> -->
  </div>
</template>

<script setup lang="ts">
//import Datepicker from 'vue3-date-time-picker'
import { ref } from "vue"

const props = defineProps<{
  stt: string | null |undefined
  end: string | null |undefined
  label?: string
  isRequire?: boolean
}>()

const innerModelValue = ref<Date[]|string[]|null>([])
const stt = ref(props.stt)
const end = ref(props.end)

const emit = defineEmits<{
  (e: 'update:stt', value:string | null ): void,
  (e: 'update:end', value:string | null ): void,
}>()

function updateTwoValue (value: string | {month:string | number, year:string | number} | null | undefined) {
  if(stt.value !== null) innerModelValue.value![0] = stt.value!
  if(end.value !== null) innerModelValue.value![1] = end.value!

  emit('update:stt', stt.value!)
  emit('update:end', end.value!)
  
  if(stt.value! > end.value! && end.value !== ''){
    alert('시작일과 종료일을 확인해주세요.')
  }

}
</script>