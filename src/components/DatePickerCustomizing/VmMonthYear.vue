<template>
    <div ref="vmDateRef">
    <label class="form-label" :class="{require: isRequire}" > {{ label }}</label>
        <Datepicker
            ref="datepickerRef"
            v-model="innerModelValue"
            monthPicker
            autoPosition
            autoApply
            locale="ko"
            format="yyyy-MM"
            :clearable="true"
            textInput
            :textInputOptions="{
                // @ts-ignore
                format : 'yyyy-MM',
                openMenu : false,
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
import { ref, onMounted, onUnmounted } from "vue"
import { useEventListener } from "@/core"

const props = defineProps<{
    modelValue?: string | { month: number, year: number } | null | undefined
    label?: string
    isRequire?: boolean
    mask?: Mask
}>()

const datepickerRef = ref()
const innerModelValue = ref(props.modelValue)
const vmDateRef = ref<HTMLDivElement>()
let dpInput :HTMLInputElement

const emit = defineEmits<{
    (e:'update:modelValue', value: string | null ) :void
}>()

function clickCalendar() {
  datepickerRef.value?.openMenu()
}

function updateModelValue(modelValue: { month: number,  year: number } | null | undefined) {  
    let year : number = modelValue?.year!  
    let month : number = modelValue?.month! +1
    if(isNaN(year) || isNaN(month)){
        innerModelValue.value = null
        emit('update:modelValue', null)
    }else{
        if(month < 10){
            emit('update:modelValue', `${year}-0${month}`)
        }else if(month >= 10){
            emit('update:modelValue', `${year}-${month}`)
        }
    }
}

onMounted(() => {
  dpInput = vmDateRef.value?.querySelector('.dp__input') as HTMLInputElement
  useEventListener(dpInput, 'focus', handleFocus)
  Inputmask('yearMonth', {
      onincomplete: () => updateModelValue(null), 
  }).mask(dpInput)
})
onUnmounted(()=>{
  Inputmask.remove(dpInput)
})

function handleFocus (e: Event){
  const target = e.target as HTMLInputElement
  target.select()
}

if(props.modelValue) innerModelValue.value = props.modelValue

</script>

