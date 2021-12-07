<template >
  <label class="form-label" :class="{ require: isRequire }">{{ label }}</label>
  <div style="display: flex" >
    <VmDate v-model="stt" :hideInputIcon="true" @update:modelValue="updateTwoValue"/>
      <span class="rangePosition">~</span>
    <VmDate v-model="end" :hideInputIcon="true" @update:modelValue="updateTwoValue"/>
    <Datepicker
      ref="datepickerRef"
      v-model="innerModelValue"
      autoPosition
      altPosition
      range
      twoCalendars
      twoCalendarsSolo
      locale="ko"
      textInput
      format="yyyy-MM-dd"
      :enableTimePicker="false"
      :clearable="true"
      @update:modelValue="updateModelValue"
    >
      <template #trigger>
        <VmIcon name="calendar" @click="clickCalendar" class="vm-icon rangePosition"/>
      </template>
    </Datepicker>
  </div>
  <pre v-if="d">props = {{ props }}, innerModelValue={{ innerModelValue }}</pre>
</template>

<script setup lang="ts">
import Datepicker from 'vue3-date-time-picker'
import { dateUtil } from "@/core"
import { ref } from "vue"

const props = defineProps<{
  stt: string | null | undefined
  end: string | null | undefined
  label?: string
  isRequire?: boolean
  d?: boolean
}>()

const emit = defineEmits<{
  (e: 'update:stt', value: string | null | undefined): void,
  (e: 'update:end', value: string | null | undefined): void,
}>()

const datepickerRef = ref()
const innerModelValue = ref<string[]>([])
const stt = ref(props.stt)
const end = ref(props.end)

function clickCalendar() {
  // 공백(null)입력하고 클릭시 최근 날짜 기점으로(default) 달력 오픈.
  if(stt.value == null){
    innerModelValue.value[0] = dateUtil.dateString(1)!
  }else if(end.value == null ){
    innerModelValue.value[1] = dateUtil.lastDateString()!
  } else if(stt.value && end.value == null ){
    innerModelValue.value[0] = dateUtil.dateString(1)!
    innerModelValue.value[1] = dateUtil.lastDateString()!
  }
  datepickerRef.value?.openMenu()
}

function updateModelValue(value: string | string[] | Date[] | null) {
  const [sttDate, endDate] = value ?? []
  stt.value = dateUtil.format(sttDate)
  end.value = dateUtil.format(endDate)

  emit('update:stt', stt.value)
  emit('update:end', end.value)
}

function updateTwoValue(value: string | null | undefined){ 
  if(stt.value !== null) innerModelValue.value[0] = stt.value!
  if(end.value !== null) innerModelValue.value[1] = end.value!

  emit('update:stt', stt.value)
  emit('update:end', end.value)
  
  if(innerModelValue.value[0] > innerModelValue.value[1] && innerModelValue.value[1] !== ''){
    alert('시작일과 종료일을 확인해주세요.')
  }
}

//twocalendar 값연결
if(stt.value !== null) innerModelValue.value[0] = props.stt!
if(end.value !== null) innerModelValue.value[1] = props.end!

</script>
