
<template>
  <VmContainer>
    <VmRow> <!-- space = justify-content -->
      <VmCell>
      <VmYear label="날짜(년도)" v-model="condData.yearText"></VmYear>
      </VmCell>
      <VmCell>
      <VmMonth label="날짜(연월)" v-model="condData.monthText"></VmMonth>
      </VmCell>
      <VmCell>
      <VmDate label="날짜(연월일)" v-model="condData.dateDate"></VmDate>
      </VmCell>
    </VmRow>
    <VmRow>
      <VmCell>
      <VmMonthRange
          label="날짜범위(연월)"
          v-model:stt="condData.monthText1"
          v-model:end="condData.monthText2"
        ></VmMonthRange>
      </VmCell>
      <VmCell>
        <VmDateRange
          label="날짜범위(연월일)"
          v-model:stt="condData.dateDate1"
          v-model:end="condData.dateDate2"
        is-require
        ></VmDateRange>
      </VmCell>
      </VmRow>
      <VmRow>
        <VmCell>
          <VmData>
            <VmButtonQuery @click="query" />
          </VmData>
        </VmCell>
     </VmRow>
  </VmContainer>

  <div class="local-debug-box">
    <b>condData :</b>
    {{ condData }}
  </div>

  <VmGrid
    @initialized="flexInitialized"
    label="그리드 타이틀"
    :isReadOnly="false"
    :columns="[
      {
        binding: 'dateDate',
        width: 120,
        header: '6 날짜데이트',
        cssClass: 'center',
        vmMask: 'dateShort',
      },
      {
        binding: 'dateDate1',
        header: '날짜기간1',
        width: 140,
        cssClass: 'center',
        vmMask: 'dateShort',
        rangeEndBinding: 'dateDate2'
      },
      {
        binding: 'dateDate2',
        header: '날짜기간2',
        width: 140,
        cssClass: 'center',
        vmMask: 'dateShort',
        rangeSttBinding: 'dateDate1'
      },
      {
        binding: 'dateYear',
        header: '년도',
        width: 120,
        vmMask: 'year',
      },
      {
        binding: 'dateMonth',
        header: '년-월',
        width: 120,
        vmMask: 'yearMonth',
      },
  
    ]"
  />
</template>

<script setup lang="ts">
import { http, useAutoseq, vmAlert, vmConfirm, VmFlexGrid } from '@/core'
import { reactive } from '@vue/reactivity'
import { DataType } from 'wijmo/wijmo'
import { FlexItem } from '../form-grid-use/types'
import { dateUtil } from '@/core'

interface CondData {
  [index: string]: any
  comCodePopupId: string  
  comCodePopupName: string | undefined
  searchUserId: string 
  searchUserNm: string | undefined
}
const condData = reactive<CondData>({
  normalText: '',
  requireText: '',
  yearText: '',
  monthText: '',
  dateDate: dateUtil.dateString(),
  yearText1: '',
  yearText2: '',
  monthText1: '',
  monthText2: '',
  dateDate1:'',// dateUtil.dateString(1),
  dateDate2: '',//dateUtil.lastDateString(),
  codeNumber: '',
  decimalNumber: '',
  amtNumber: '',
  tel: '',
  bizJumin: '',
  useYnCheck: '',
  multiCheck: [],
  serverMultiCheck: [],
  comCodeRadio: '',
  comCodeRadioItem: '',
  comCodeCombo: '',
  systemCd: '',
  moduleCd: '',
  comCodePopupId: '',
  comCodePopupName: '',
  searchUserId: '',
  searchUserNm: '',
})

let flex: VmFlexGrid

function flexInitialized(s: VmFlexGrid) {
  flex = s
}

async function query() {
  try {
    // 또는 http로 그리드 이외의 데이터도 함께 조회
    const { data, other } = await http.post('/formGrid/query', condData)
    flex.setData(data)
    // vm.other = other
    console.log('http.post response data, other', data, other)
  } catch (e) {
    console.error(e)
  }
}


function readonlyDhkDisabled(r: number, c: string | number, item: FlexItem) {
  console.log('readonlyDhkDisabled', r, c, item)
}
</script>


