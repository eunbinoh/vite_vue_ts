<template>
  <VmModal ref="vmModalRef" class="vmmodal">
    <template #header-title>사용자추가</template>
    <template #header-button>
      <VmButtonSave @click="addUserData">저장</VmButtonSave>
    </template>

    <VmContainer>
      <VmRow>
        <VmCell class="inputAddCell">
          <VmSearch label="사용자ID" v-model="condData.userId" /> 
        </VmCell>
      </VmRow>
        <VmRow>
          <VmCell class="inputAddCell">
            <VmSearch label="사용자명" v-model="condData.userNm" />  
          </VmCell>
        </VmRow>
        <VmRow>
          <VmCell class="inputAddCell"> 
            <VmSelect
              label="사용자구분" 
              v-model="condData.userTp" 
              table-id="***_CODE"
              code="***01"
              option-first="CHOOSE"
            />
          </VmCell>
        </VmRow>
       <VmRow>
          <VmCell class="inputAddCell">
            <VmSearch label="휴대폰번호" v-model="condData.telNo" /> 
          </VmCell>
        </VmRow>
        <VmRow>
          <VmCell class="inputAddCell">
            <VmSearch label="이메일주소" v-model="condData.emailId" />
            <span class="inline rightSide">
              <VmCheckbox v-model="condData.emailChk" />
              <h2> &nbsp; 합류메일 보내기 </h2>
            </span>
          </VmCell>
        </VmRow>
        <VmRow>
          <VmCell class="inputAddCell">
            <VmSelect 
              label="사업장" 
              v-model="condData.bizplcCd" 
              table-id= "***_CODE"
              option-first="CHOOSE"
            />
          </VmCell>
        </VmRow>
        <VmRow>
          <VmCell class="inputAddCell">
            <VmSelect 
              label="근무지" 
              v-model="condData.workArea" 
              table-id= "***_CODE"
              option-first="CHOOSE"
            />
          </VmCell>
        </VmRow>
        <VmRow>
          <VmCell class="inputAddCell">
            <VmSearch label="사원" v-model="condData.userConnect" />
              <VmIcon name="search" @click="" class="vm-icon search_icon"/>
          </VmCell>
        </VmRow>
        <VmRow>
          <VmCell>
            <span class="inline">
              <h1>사용 &nbsp;</h1>
              <VmCheckbox v-model="condData.statFg" />
            </span>
          </VmCell>
        </VmRow>
        <VmRow>
          <VmCell class="remarkCell">
            <VmSearch label="비고" v-model="condData.remarkTxt" class="reamarkTxt"/>
          </VmCell>
      </VmRow>
    </VmContainer>
</VmModal>

</template>

<script setup lang="ts">
import { ref, reactive } from "@vue/reactivity";
import { http, VmModalInterface } from "@/core";

type Data = ({
  [key : string ] :string | number | undefined | string[] | null

  userId : string | number | undefined
  userNm : string | number | undefined
  userTp : string | undefined
  telNo : string | number | undefined
  emailId : string | number | undefined
  emailChk : string | string[] | null
  bizplcCd : string | undefined
  workArea : string | undefined
  userConnect : string | number | undefined
  remarkTxt : string | number | undefined
  statFg : string | string[] | null
})

const condData = reactive<Data>({
  userId: '' ,
  userNm: '',
  userTp: '',
  telNo: '',
  emailId: '',
  emailChk: '',
  bizplcCd: '',
  workArea: '',
  userConnect:'',
  remarkTxt: '',
  statFg: '1'
})

const vmModalRef = ref<VmModalInterface>()
const POPUP_URL = '/userRegPopup/addUser'

async function addUserData() {
  await http.post('/userRegPopup/addUser', condData)
  vmModalRef.value?.close()
}

// 입력창 초기화
function initCond() {
  Object.keys(condData).forEach((k) => {
    if(k === 'statFg') return; // 사용 체크박스는 스킵
    else condData[k] = '';    // condData props = ''
  })
}

function open() {
  initCond();
  return vmModalRef.value?.open()
}

defineExpose({
  POPUP_URL,
  open,
})
</script>

<style lang="scss" scoped>
.inputAddCell {
  width : 250px;
}
.remarkCell {
  width : 500px;
  margin-right : 50px;
}
.search_icon {
  width: 25px;
  height: 25px;
  margin-top: -30px;
  margin-left: 85%;
  cursor: pointer;
}
.rightSide{
  margin-left: 120px;
  margin-top: 5px;
}
</style>