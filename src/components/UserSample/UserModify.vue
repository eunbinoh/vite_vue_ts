<template>
  <VmModal ref="vmModalRef" class="vmmodal">
    <template #header-title>사용자정보</template>
    <template #header-button>
      <VmButtonSave @click="save" class="saveBtn">저장</VmButtonSave>
    </template>

    <VmContainer>
        <VmRow>
          <VmCell class="inputModifyCell">
            <VmSearch label="사용자명" v-model="condData.userNm" /> 
          </VmCell>
        </VmRow>
        <VmRow>
          <VmCell class="inputModifyCell">
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
          <VmCell class="inputModifyCell">
            <VmSearch label="휴대폰번호" v-model="condData.telNo" />
          </VmCell>
        </VmRow>
        <VmRow>
          <VmCell class="inputModifyCell">
            <VmSearch label="이메일주소" v-model="condData.emailId" />
             <VmButton class="inviteBtn" @click="sendMailConfirm"  >초대하기</VmButton>
          </VmCell>
        </VmRow>
        <VmRow>
          <VmCell class="inputModifyCell">
           <VmSelect 
              label="사업장" 
              v-model="condData.bizplcCd" 
              table-id= "***_CODE"
              option-first="CHOOSE"
            />
          </VmCell>
        </VmRow>
        <VmRow>
          <VmCell class="inputModifyCell">
           <VmSelect 
              label="근무지" 
              v-model="condData.bizplcCd" 
              table-id= "***_CODE"
              option-first="CHOOSE"
            />
          </VmCell>
        </VmRow>
        <VmRow>
          <VmCell class="inputModifyCell">
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
import { http , VmModalInterface} from "@/core";
import { ref, reactive } from "@vue/reactivity";

type CondData = {
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
}

const condData = reactive<CondData>({
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
const POPUP_URL = '/userModify/modifyUserData'

//팝업오픈 (부모창 open 연결)
async function open(param: any) {
  //입력창 값 연결
  initCond(param);
  return vmModalRef.value?.open()
}

function initCond(param :any){
  //부모창에서 가져온 파라미터값으로 Data 덮어씌우기
  Object.keys(condData).forEach((k) => {
    condData[k] = param[k] ;  
  })
    //초기화 하드코딩
    // selectUserData(param)
    // async function selectUserData(param? :any){
    //   await http.post('/userModify/selectUserData', param)
    //   .then(function(result){
    //     if (result) {
    //         condData.userNm = result[0].userNm 
    //         condData.userTp = result[0].userTp
    //         condData.telNo = result[0].telNo 
    //         condData.emailId = result[0].emailId 
    //         condData.bizplcCd = result[0].bizplcCd 
    //         // condData.workArea = result.data[0].workArea 
    //         // condData.userConnect = result.data[0].userConect 
    //         condData.statFg = result[0].statFg 
    //         condData.remarkTxt = result[0].remarkTxt 
    //         condData.userId = result[0].userId 
    //     }
}

//저장(정보수정)
async function save(){
  await http.post('/userModify/modifyUserData',condData)
  //저장시 닫음
  vmModalRef.value?.close()
}

function sendMailConfirm() {
  confirm(condData.userNm + "님을 초대하시겠습니까?"); 
}

defineExpose({
  POPUP_URL,
  open,
})

</script>

<style lang="scss" scoped>
.inputModifyCell {
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
.inviteBtn{
  border-color: #0081FF;
  border-radius: 20px;
  background-color: #0081FF;
  color: white;
  width: 80px;
  height: 28px;
  margin-left: 105%;
  margin-top: -12.5%;
}
.saveBtn {
  margin-top: -47px;
  margin-right: 10%;
  border-radius: 20px;
  width: 60px;
  height: 30px;

}
</style>
