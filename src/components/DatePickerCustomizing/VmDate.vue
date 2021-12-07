<template>
  <div ref="vmDateRef">
    <label class="form-label" :class="{ require: isRequire }">{{ label }}</label>
    <Datepicker
      ref="datepickerRef"
      v-model="modelValue"
      locale="ko"
      autoApply
      autoPosition
      :enableTimePicker="false"
      :clearable="true"
      format="yyyy-MM-dd"
      :hideInputIcon="hideInputIcon"
      textInput
      :textInputOptions="{
        openMenu: false,
        openMenuOnFocus: false,
        enterSubmit: true,
        tabSubmit: true
      }"
      
      @update:modelValue="updateModelValue"
    >
      <template #input-icon>
        <span class="dp__input_icon">
          <VmIcon name="calendar" @click="clickCalendar" class="vm-icon" />
        </span>
      </template>
    </Datepicker>
  </div>
</template>

<script setup lang="ts">
import Datepicker from 'vue3-date-time-picker'
import { dateUtil, useEventListener } from "@/core"
import { onMounted, onUnmounted, ref } from 'vue'

defineProps<{
  modelValue: Date | string | null |undefined
  label?: string
  isRequire?: boolean
  hideInputIcon?: boolean
}>()

const vmDateRef = ref<HTMLDivElement>()
const datepickerRef = ref()

const emit = defineEmits<{
  (e: 'update:modelValue', value: string | null): void
}>()

function clickCalendar() {
  datepickerRef.value?.openMenu()
}

let dpInput :HTMLInputElement
onMounted(() => {
  dpInput = vmDateRef.value?.querySelector('.dp__input') as HTMLInputElement
  useEventListener(dpInput, 'focus', handleFocus)
  Inputmask('dateShort', {
    onincomplete: () => updateModelValue(null),
  }).mask(dpInput)

})
onUnmounted(()=>{
  Inputmask.remove(dpInput)
})

function updateModelValue(selectedDate: string | Date | null) {
  emit('update:modelValue', dateUtil.format(selectedDate))
}

function handleFocus(e: Event) {
  const target = e.target as HTMLInputElement
  target.select()
}

</script>
