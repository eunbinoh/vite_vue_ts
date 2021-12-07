<template>
<!--   <teleport to="#app" v-if="showYearPicker"> -->
    <div v-if="showYearPicker"
      class="VmYearMenu"
      :style="{
        top: position.y ,
        left: position.x 
      }"
      v-bind="modelValue"
    >
      <div class="menuStart"></div> <!-- 윗방향 삼각형 태그 -->
      <div class="menu_wrapper">
        <div class="menu_overay">
          <div class="menu_column">
            <div class="menu_row">
              <div class="year_overlay" v-for="i in years()">
                <div class="year_cell" @click="onYearUpdate(i)" @update:modelValue="onYearUpdate(i)">{{ i }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div> 
<!--   </teleport> -->
  
  <label class="form-label" :class="{require: isRequire}">{{ label }}</label>
  <span class="VmYearLine" ref="yearRef">
    <input type="text" class="form-control inputYear" v-model="modelValue" @keypress.enter="onYearUpdate(modelValue)">
    <VmIcon name="program-close" @click="clearCalendar" class="vm-icon clear_icon" />
    <VmIcon name="calendar" @click="clickCalendar" class="vm-icon calendar_icon" />
  </span>

</template>


<script setup lang="ts">
import { ref, reactive, onMounted, onUnmounted, onUpdated } from 'vue'
import { useEventListener } from '@/core'

const modelValue = ref()
const yearRef = ref<HTMLDivElement>()
let showYearPicker = ref(false)
let dpInput : HTMLInputElement
// const yearPickerRef = ref<HTMLDivElement>()
// let yearPicker : HTMLDivElement

defineProps <{
  label?: string 
  isRequire? : boolean 
  modelValue?: string | number | null | undefined
  years?: []
  mask?: Mask
}>()

const position = reactive<{
  x: number
  y: number
}>({
  x: 0,
  y: 0
})

const years = () => {
  const list = []
  for(var i = 1996 ; i <= 2100 ; i++) list.push(i);
  return list
}

const emit = defineEmits<{
  (e:'update:modelValue', value: string | null ) :void
}>()

//연도 달력 열기
function clickCalendar(event: MouseEvent) {
  if (!showYearPicker.value){
    showYearPicker.value = true;
    position.x = event.pageX ;
    position.y = event.pageY ;
    console.log('position>>>>', position.x, position.y)

  } else if(showYearPicker.value) {
    showYearPicker.value = false;
  }
}

// yearPicker = yearPickerRef.value?.querySelector('.VmYearMenu') as HTMLDivElement
// useEventListener(yearPickerRef, 'blur', displayBlock )

function clearCalendar(event: MouseEvent) {
  dpInput.value = ''
  emit('update:modelValue', null)
}

function onYearUpdate (year: string | number | null ) {
  if( year !== null ){
    if( year > 2100 || year < 1996 ){
      alert('연도를 확인해주세요') //input Validation
    }else{
      modelValue.value = `${year}`
      emit('update:modelValue', modelValue.value)
    }
  }else if (year == null){
    emit('update:modelValue', null)
  }
 
  if(showYearPicker.value) showYearPicker.value = false

};

onMounted(() => {
  dpInput = yearRef.value?.querySelector('.inputYear') as HTMLInputElement
  useEventListener(dpInput, 'focus', handleFocus)

  Inputmask('year', {
    onincomplete: () => onYearUpdate(null),
  }).mask(dpInput)
})

onUpdated(() => {

})


onUnmounted(() => {
  Inputmask.remove(dpInput)
})

function handleFocus (e: Event){
    const target = e.target as HTMLInputElement
    target.select()
}

</script>


<style scoped >
.VmYearLine {
  position: relative;
}
.clear_icon {
  position: absolute; 
  right: 20%;
  transform: translateY(75%);
  cursor: pointer;
  width: 15px; 
  height: 15px;
}
.calendar_icon {
  position: absolute;  
  right: 5%; 
  transform: translateY(40%);
  width: 20px; 
  height: 20px;
}
.form-control {
  display: inline-block;
  width:100%;
  height:36px;
  border:1px solid #dadce0;
  border-radius:4px;
  font-weight:300;
  font-size:13px;
}
.VmYearMenu {
  position: fixed;
  background: white;
  border-radius: 5px;
  width: 260px;
  height: 240px;
  font-size: 15px;
  user-select: none;
  border:1px solid #dadce0;
  box-sizing: border-box;
  z-index: 10;
  top: 35%;
}
.menuStart{
  left: 50%;
  top: -1px;
  height: 12px;
  width: 12px;

  background-color: white;
  position: absolute;
  border-left: 1px solid #dadce0;
  border-top: 1px solid #dadce0;
  transform: translate(-50%, -50%) rotate(45deg);
}
.menu_wrapper{
  position: relative;
  height: 240px;
}
.menu_overay{
  position: absolute;
  overflow-y: auto;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  transition: opacity 1s ease-out;
  z-index: 99999;
  box-sizing: border-box;
}
.menu_column{
  display: flex;
  height: 100%;
  flex-direction: column;
}
.menu_row{
  padding: 0;
  box-sizing: border-box;
  display: flex;
  margin-left: auto;
  margin-right: auto;
  flex-wrap: wrap;
  max-width: 100%;
  width: 100%;
  align-items: center;
}
.year_overlay{
  box-sizing: border-box;
  width: 33%;
  padding: 3px;
  white-space: nowrap;
}
.year_cell{
  padding: 10px 0;
  border-radius: 4px;
  text-align: center;
}
.year_cell:hover{
  cursor: pointer;
  border-radius: 4px;
  background: #f3f3f3;;
  text-align: center;
}
.year_cell:active {
  cursor: pointer;
  border-radius: 4px;
  text-align: center;
  background: #1976d2;
  color: #f8f5f5;
}
</style>