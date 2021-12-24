/** program name : Sample Test1
*/
<template>
  <div class='modalContainer'>
    <h1>아이디 찾기</h1>
      <br><br>
    <div>
      <label>이메일 주소</label>
      <input v-model='emailId' @keyup.enter='searchId' type='text' class='searchInput'>
      <button @click='searchId' class='searchBtn' >찾기</button>
    </div>
    <div>
      <span>{{ result }}</span>
    </div>
  </div>

  <br><br>

  <div class='modalContainer'>
    <h1>비밀번호 찾기</h1>
      <br><br>
    <div>
      <label>이름</label>
      <input v-model='userNm' type='text' class='searchInput'>
    </div>
    <div>
      <label>이메일</label>
      <input v-model='emailId' type='text' class='searchInput'>
      <button @click='sendMail' class='searchBtn' >인증</button>
    </div>
    <div>
      <label>인증번호</label>
        <input v-model='configNo' type='text' class='searchInput'>
        <button @click='configMail' class='searchBtn' >확인</button>
      </div>
  </div>

  <br><br>

  <div class='modalContainer'>
    <h1>비밀번호 변경</h1>
      <br><br>
    <div>
      <label>새 비밀번호 입력</label>
      <input v-model='newPwd' type='text' class='searchInput'>
    </div>
    <div>
      <label>비밀번호 재확인</label>
      <input v-model='newPwdRe' @keyup='chkPwd' type='text' class='searchInput'>
      <span v-bind:style='{color:pwdChk.rgb}' class='chkMsg'>{{ pwdChk.msg }}</span>
    </div>
      <button @click='modifyPw' class='searchBtn' >저장</button>
  </div>

</template>

<script setup lang='ts'>
import { ref, reactive } from '@vue/reactivity';
import axios from 'axios'

const emailId = ref('');
const result = ref('');

const userNm = ref('');
const configNo = ref('');
const newPwd = ref('');
const newPwdRe = ref('');
const pwdChk = reactive({
  msg: '', //비밀번호 체크 메세지
  rgb: '', //비밀번호 체크 메세지 색깔
  same: 0 // 비밀번호와 비밀번호 확인 (같으면 1, 다르면 0)
})

async function searchId(){
  const headers = {
    'Content-Type': 'application/json'
  }
  try {
    const response = await axios.post('http://localhost:8585/itgMember/searchId', { emailId: emailId.value }, { headers });
    emailId.value = '';
    if(response.data !== null) result.value =  'ID : ' + response.data ;
    
  } catch(e) {
    alert(e.response.data.message);
    result.value = '';
  }
}

async function sendMail(){
  const headers = {
    'Content-Type' : 'application/json'
  }

  try{
    const res = await axios.post('http://localhost:8585/itgMember/sendMail'
                                  , JSON.stringify({ emailId: emailId.value, memberNm: userNm.value })
                                  , { headers });
    if(res.data.data !== null){
      alert('메일이 전송되었습니다. 인증번호를 확인해주세요.')
    }else{
      alert('인증메일 발송에 실패했습니다.1')
    }  

  } catch(e) {
    alert('인증메일 발송에 실패했습니다.22')
    //alert(e.response.data.message);
  }
}

function chkPwd(){
  if(newPwd.value !== newPwdRe.value){
    pwdChk.msg = '비밀번호가 일치하지 않습니다.'
    pwdChk.rgb = 'rgba(190, 78, 37, 0.897)'
    pwdChk.same = 0
  }else{
    pwdChk.msg = '비밀번호가 정확합니다.'
    pwdChk.rgb = 'blue'
    pwdChk.same = 1
  } 
}

function modifyPw(){
  if(pwdChk.same == 0){
    alert('비밀번호를 확인해 주세요.')
    return;
  }else{
    alert('비밀번호가 변경되었습니다.')
    newPwd.value = ''
    newPwdRe.value = ''
    pwdChk.msg = ''
  }
}



</script>


<style scoped lang='scss'>

.modalContainer{
  display: flex;
  overflow: hidden;
  position: relative;
  z-index: 1;
  max-height: calc(100vh - 60px);
  max-width: calc(100vh - 40px);
  padding: 30px;
  border: 1px solid rgb(194, 194, 194);
  border-radius: 8px;
  background-color: #fff;
  box-shadow: 0 32px 32px rgb(0 0 0 / 8%);
  flex-direction: column;
}
.searchInput{
  width: 250px;
  height: 30px;
  margin : 10px;
}
.searchBtn{
  padding: 0.0625rem 0.3125rem 0.0625rem 0.3125rem;
  right: 0;
  margin-top: 1rem;
  border: 0.0625rem solid #c5cfdb;
  border-radius: 0.9375rem;
  font-weight: bold;
  font-size: 1rem;
  color: #000;
  text-align: center;
  cursor: pointer;
  align-items: center;
  justify-content: center;
  width: 4.375rem;
  height: 1.875rem;
}
.chkMsg{
  display: block;
  margin-left: 115px;
  margin-top: -3px;
}
</style>
