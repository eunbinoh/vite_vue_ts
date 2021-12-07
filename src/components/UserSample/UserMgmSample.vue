<template>
    <VmContainer>
        <VmRow>
            <VmCell> <!--class="searchBtn"-->
                <VmButtonQuery class="searchBtn" @click="searchCondData" />
            </VmCell>
        </VmRow>
        <VmRow>
            <!-- <VmCell> --> <!-- class="inline" -->
                <VmSearch v-model="condData.userNm" @keyup.enter="searchCondData"/> <!-- placeholder="이름 검색"-->
                <VmButton class="addBtn" @click="openUserRegPopUp">사용자추가</VmButton>
           <!--  </VmCell> -->
        </VmRow>
        <VmRow>
            <VmGrid 
                @initialized="flexInitialized"
                :dbl-click="openUserModifyPopup"
                :columns="[
                    {
                        binding: 'userNm',
                        header: '사용자명',
                        width: 150,
                    },
                    {
                        binding: 'telNo',
                        header: '휴대폰번호',
                        width: '1.5*',
                        vmMask: 'tel'
                    },
                    {
                        binding: 'emailId',
                        header: '이메일주소',
                        width: '1.5*',
                    },
                    {
                        binding: 'userTp',
                        header: '사용자구분',
                        width: 150,
                        vmDataMap: {
                            tableId: 'SYS_CODE',
                            code: 'SYS001',
                        }
                    },

                    {
                        binding: 'workArea',
                        header: '근무지',
                        width: '*',
                    },
                    {
                        binding: 'userConect',
                        header: '사원연결',
                        width: 150,
                    },
                    {
                        binding: 'remarkTxt',
                        header: '비고',
                        width: '*',
                    },

                ]"
            >
            </VmGrid>
        </VmRow>
    </VmContainer>

    <UserRegPopup ref="userRegPopupRef" />
    <UserModifyPopup ref="userModifyPopupRef" />
</template>

<script setup lang="ts">
import VmButton from "@/core/components/button/VmButton.vue";
import VmButtonQuery from "@/core/components/button/VmButtonQuery.vue";
import { http, VmFlexGrid, VmModalInterface } from "@/core";
import { ref, reactive } from "@vue/reactivity";
import UserRegPopup from "@/views/env/member-mgm/user-reg-popup/UserRegPopup.vue";
import UserModifyPopup from "@/views/env/member-mgm/user-modify-popup/UserModifyPopup.vue";

const condData = reactive({
    userNm : '',
    userTp: '',
    telNo: '',
    emailId: '',
    emailChk: '',
    bizplcCd: '',
    workArea: '',
    userConnect: '',
    statFg: '',
    remarkTxt: '',
    userId: ''
})

const userRegPopupRef = ref<VmModalInterface>();
const userModifyPopupRef = ref<VmModalInterface>();

let flex: VmFlexGrid;
function flexInitialized(grid: VmFlexGrid) {
    flex = grid;
}

//사용자 조회 그리드
async function searchCondData(){
    const userReqList = await http.post('/userMgm/searchCondData', condData)
    flex.setData(userReqList)
}

//사용자 추가 팝업
async function openUserRegPopUp(){
    await userRegPopupRef.value?.open(); 
    //팝업닫으면 다시 조회
    await searchCondData();
}

//조회후 더블클릭시 사용자 정보 팝업
async function openUserModifyPopup(){
    await userModifyPopupRef.value?.open(flex.ci)

    // //팝업닫으면 다시 조회
    // await searchCondData();
}

</script>

<style scoped lang="scss">
@import "@/styles/common.scss";
.searchBtn{
    padding: px(1) px(5) px(1) px(5);
    margin-left: 76rem;
    margin-top: 1rem;
    border:px(1) solid #c5cfdb;
    border-radius:px(15);
    font-weight:bold;
    font-size:px(16);
    color: #000;
    text-align: center;
    cursor: pointer;
    align-items:center;
    justify-content:center;
    width: px(70);
    height: px(30);
}
.addBtn{
    border:px(1) solid #c5cfdb;
    border-radius:px(20);
    font-weight:bold;
    font-size:px(16);
    color: #000;
    width: px(100);
    height: px(35);
    /* VmSearch 조정시 위치 삭제 ( inline block 임의 위치)*/
    margin-top: px(10);
    margin-left: px(10);
    display: flex;
}
</style>
