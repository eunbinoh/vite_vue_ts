<template>
  <VmModal ref="vmModalRef">
    <template #header-title>근무지추가</template>
    <template #header-button>
      <VmButtonSave class="saveBtn" @click="saveWorkplc">저장</VmButtonSave>
    </template>

    <VmContainer>
      <div>
        <VmCell>
          <div class="input_width250"><VmSearch label="근무지명" v-model="condData.workplcNm" /></div>
        </VmCell>
      </div><br/>

      <VmCell>
        <div class="input_width250"><VmSearch label="주소" v-model="condData.addr" /></div>
        <VmIcon name="search" @click="addrSearch" class="vm-icon searchIcon" />
      </VmCell><br/><br/>

      <div>
        <VmCell >
          <div class="input_width250"><VmSearch label="전화번호" v-model="condData.telNo" /></div>
        </VmCell>
      </div><br/><br/>

      <VmRow>
        <h1>사용</h1>
        <VmRow class="right_align">
          <VmData>
            <input
              type="checkbox"
              id="toggle_workChk"
              v-model="condData.useYn"
              class="form-checkbox-input hidden"
            />
            <label for="toggle_workChk" class="form-checkbox toggle"></label>
          </VmData>
        </VmRow>
      </VmRow><br />


      <VmRow>
        <h1>출퇴근방법</h1>
        <VmRow class="right_align">
          <VmCheckbox v-model="condData.workChkMedGps" item-label="GPS" />
          <VmCheckbox v-model="condData.workChkMedWifi" item-label="WiFi"/>
          <VmCheckbox v-model="condData.workChkMedBea" item-label="Beacon" />
        </VmRow>
      </VmRow>
      <br />
      <ul v-if="condData.workChkMedWifi == '1'">
        <h1>WIFI</h1>
          <li
             v-for="(wifiContent, i) in condData.wifiList"
             :wifiContent = "wifiContent"
             :key = "wifiContent.wifiNm"
             :index = "i"
          >
            <VmRow>
              <div class="reamrkInput"><VmSearch v-model="wifiContent.wifiNm" /></div>
              <VmSearch v-model=" wifiContent.wifiAddr" />
              <VmIcon class="vm-icon wifiIcon" name="wifi" @click="callWifi(i)" />
              <VmButton class="plmiBtn" v-if="i < 4 && condData.wifiList.length == i+1" @click="addRow('addWifi', i)">+</VmButton>
              <VmButton class="plmiBtn" v-if="i >= 0" @click="removeRow('rmWifi',i)">-</VmButton>
            </VmRow>
          </li>
      </ul>
      <br />

      <ul v-if="condData.workChkMedBea == '1'">
        <h1>BEACON</h1>
          <li
             v-for="(beaconContent, j) in condData.beaconList"
             :beaconContent = "beaconContent"
             :key = "beaconContent.beaconNm"
             :index = "j"
          >
            <VmRow>
              <div class="reamrkInput"><VmSearch v-model="beaconContent.beaconNm" /></div>
              <VmSearch v-model=" beaconContent.beaconId" />
              <VmButton class="plmiBtn" v-if="j < 4 && condData.beaconList.length == j+1"  @click="addRow('addBea', j)">+</VmButton>
              <VmButton class="plmiBtn" v-if="j >= 0" @click="removeRow('rmBea',j)">-</VmButton>
            </VmRow>
          </li>
      </ul>
      <br />

      <h1>좌표반경</h1>
      <VmRow>
        <div class="scopeBtn" :class="addCheckClass('50')">
          <VmRadio
            style="display:none"
            item-label="50m"
            value="50"
            radio-name="lcRadio"
            v-model="condData.workplcGps.gpsScope"
          />
        </div>
        <div class="scopeBtn" :class="addCheckClass('100')">
          <VmRadio
            style="display:none"
            item-label="100m"
            value="100"
            radio-name="lcRadio"
            v-model="condData.workplcGps.gpsScope"
          />
        </div>
        <div class="scopeBtn" :class="addCheckClass('200')">
          <VmRadio
            style="display:none"
            item-label="200m"
            value="200"
            radio-name="lcRadio"
            v-model="condData.workplcGps.gpsScope"
          />
        </div>
        <div class="scopeBtn" :class="addCheckClass('500')">
          <VmRadio
            style="display:none;"
            item-label="500m"
            value="500"
            radio-name="lcRadio"
            v-model="condData.workplcGps.gpsScope"
          />
        </div>

        <div class="scopeBtn" :class="addCheckClass('0')">
          <VmRadio
            style="display: none;"
            item-label=" 입력값"
            value = "0"
            radio-name="lcRadio"
            v-model="condData.workplcGps.gpsScope"
          />
        </div>
        <input class="scopeInput" type="number" v-model="condData.workplcGps.gpsScope"/>
        <!-- <VmSearch class="scopeInput" type="number"  v-model="workplcGps.gpsScope"/> -->
      </VmRow>
      <br />

      <ul>
        <h1>좌표</h1>
        <li>
          <VmRow>
            <input class="gpsInput" placeholder="(위도 °E)" v-model="condData.workplcGps.gpsLat" /> &nbsp;
            <input class="gpsInput" placeholder="(경도 °N)" v-model="condData.workplcGps.gpsLong" />
          </VmRow>
        </li>
      </ul>

      <VmRow>
        <div ref="mapRef" class="map"></div>
      </VmRow>
    </VmContainer>
  </VmModal>
</template>


<script setup lang="ts">
import { ref, reactive, nextTick } from "vue";
import { http } from "../../../core";
import { vmConfirm } from '@/core';
import VmButton from "@/core/components/button/VmButton.vue";

const vmModalRef = ref<VmModalInterface>()
const POPUP_URL = '/corpWorkplc/addWorkplc'

type WorkplcGps = {
  gpsLat: string | undefined
  gpsLong: string | undefined
  gpsScope: string | undefined
}

type WifiContents = {
  wifiNm: string | undefined
  wifiAddr:  string | undefined
}

type BeaconContents = {
  beaconNm: string | undefined 
  beaconId: string | undefined 
}

interface CondData {
  [key: string]: string | boolean | Object | Array<Object> | null | undefined
  workplcNm: string
  addr: string
  telNo: string
  useYn: boolean
  workChkMedGps :string
  workChkMedWifi :string 
  workChkMedBea :string

  wifiList: Array<WifiContents>
  beaconList: Array<BeaconContents>
  workplcGps: WorkplcGps
}

const condData = reactive<CondData>({
  workplcNm: '',
  addr: '',
  telNo: '',
  useYn: true,
  workChkMedGps : '0',
  workChkMedWifi : '0',
  workChkMedBea : '0',
  workplcGps: {
    gpsLat: '',
    gpsLong: '',
    gpsScope: '50'
  },
  wifiList: [],
  beaconList: []
})

const kakaoB = (window as any).kakao;
const mapRef = ref<HTMLDivElement>()

async function open() {
  initCond();
  const modal = vmModalRef.value?.open()
  await nextTick()
  initKakao()
  return modal
}

function initKakao() {
  kakaoB.maps.load(() => {

    // 지도영역 설정
    const mapContainer2 = mapRef.value 
    const mapOption2 = {
      center: new kakaoB.maps.LatLng(37.48569, 127.01032), //Default 중심좌표 : 본사
      level: 3, //확대 레벨
    };

    //지도 초기옵션 세팅
    let mapB = new kakaoB.maps.Map(mapContainer2, mapOption2);

    // 확대축소 컨트롤 세팅 
    const control2 = new kakaoB.maps.ZoomControl();
    mapB.addControl(control2, kakaoB.maps.ControlPosition.TOPRIGHT);

    //초기 중심좌표 찾기 (GeoLocation 현위치 검색)
    if ('geolocation' in navigator && condData.addr == '') {
        const options = {
          enableHighAccuracy : true, // 높은 정확도(GPS:true/false)
          timeout : 5000 //timeout
        };
      navigator.geolocation.getCurrentPosition(success, error, options); 
    }
    function success(position :any){
      let geoLat =  position.coords.latitude;
      let geoLong =  position.coords.longitude;

      const moveCenter = new kakaoB.maps.LatLng(geoLat, geoLong);
      mapB.setCenter(moveCenter);
    }
    function error(e :any) {
      alert("Geolocation error [" + e.code + "] : " + e.message);
    };

    //주소검색 후 중심좌표 설정 (주소지 결과 반영)
    const geocoder2 = new kakaoB.maps.services.Geocoder();
    geocoder2.addressSearch(condData.addr, function (result: any, status: any) {
      if (status === kakaoB.maps.services.Status.OK) {
        let coords = new kakaoB.maps.LatLng(result[0].y, result[0].x);
        mapB.setCenter(coords);
        condData.workplcGps.gpsLat = result[0].y;
        condData.workplcGps.gpsLong = result[0].x;

        // 마커 등록
        const marker2 = new kakaoB.maps.Marker({
          map: mapB,
          position: coords
        })
        marker2.setMap(mapB);

        // 반경(원) 객체 등록
        const drawingCircle = new kakaoB.maps.Circle({
          strokeWeight: 1, // 선의 두께
          strokeColor: '#00a0e9', // 선의 색깔
          strokeOpacity: 0.1, // 선 불투명도
          strokeStyle: 'solid', // 선의 스타일
          fillColor: '#00a0e9', // 채우기 색깔
          fillOpacity: 0.2 // 채우기 불투명도
        });
        const circleOptions = {
          center: coords,
          radius: condData.workplcGps.gpsScope,
        }
        drawingCircle.setOptions(circleOptions)
        drawingCircle.setMap(mapB)

        // 인포윈도우 등록
        const infowindow = new kakaoB.maps.InfoWindow({
          map: mapB,
          position: coords,
          content: 
          '<div style="width:80px;padding:2px 1px; margin-left:50%">' + condData.workplcNm + '</div>'
        });
        infowindow.open(mapB, marker2);
      }
    })
  })
}

//주소지 검색창 open
const daum = (window as any).daum;
function addrSearch() {
  new daum.Postcode({
    oncomplete: (data: any) => {
      if (data.extraAddress !== "") {
        data.extraAddress = "";
      }
      if (data.userSelectedType === "R") {
        //도로명 주소 선택
        data.address = data.roadAddress;
      } else {
        //지번 주소 선택
        data.address = data.jibunAddress;
      }
      // 도로명 주소 선택일때 참고항목 조합
      if (data.userSelectedType === "R") {
        // 법정동명이 있을 경우 추가 "동/로/가"
        if (data.bname !== "" && /[동|로|가]$/g.test(data.bname)) {
          data.extraAddress += data.bname;
        }
        // 건물명이 있고, 공동주택일 경우 추가
        if (data.buildingName !== "" && data.apartment === "Y") {
          data.extraAddress += `, ${data.buildingName}`
        }
        // 표시할 참고항목 있을때, 괄호까지 최종 문자열추가
        if (data.extraAddress !== "") {
          data.extraAddress = `(${data.extraAddress})`;
        }
      } else {
        data.extraAddress = "";
      }
      condData.addr = data.address + " " + data.extraAddress;
      initKakao();
    }   
  }).open();

}

function addRow(eventNm: string, i: number) {
  switch (eventNm) {
    case 'addWifi':
          condData.wifiList.push({
            wifiNm: '',
            wifiAddr: ''
          });
          break;
    case 'addBea':
          condData.beaconList.push({
            beaconNm: '',
            beaconId: ''
          });
          break;
    default: break;
  }
}
function removeRow(eventNm: string, i: number) {
  switch (eventNm) {
    case 'rmWifi':
      if(i == 0 && condData.wifiList.length == 1) condData.wifiList.push({wifiAddr:'',wifiNm:''});
      condData.wifiList.splice(i, 1);
      break;
    case 'rmBea':
      if(i == 0 && condData.beaconList.length == 1) condData.beaconList.push({beaconId:'',beaconNm:''});
      condData.beaconList.splice(i, 1);
      break;
    default: break;
  }
}

async function callWifi(i: number) {
  const clientIp = await http.post('/corpWorkplc/getClientIp');
  if(typeof clientIp == 'string') condData.wifiList[i].wifiAddr = clientIp;
}

async function saveWorkplc() {
  console.log('condData',condData)
  useChk();

  //근무지 저장
  await http.post('/corpWorkplc/addWorkplc', condData)

  //저장후 auto close
  vmModalRef.value?.close()
}

async function useChk(){
  //useYn 체크
  console.log(condData.useYn );
  if(condData.useYn == false){
      if (await vmConfirm('사용체크 하지않을 경우, 조회되지 않습니다.\n 이대로 저장하시겠습니까?'))
           return true;
      else return false;
  }
}


//입력창 초기화
function initCond() {
  //wifi,beacon 입력창(열려있던줄숫자) 초기화
  condData.wifiList.splice(0, condData.wifiList.length-1);
  condData.beaconList.splice(0, condData.beaconList.length-1);
  //초기값 설정
  Object.keys(condData).forEach((el:string) => {
      if (typeof el == 'string') condData[el] = '' 
      if (el.includes('workChkMed')) condData[el] = '0' 
      if (el === 'useYn') condData[el] = true  // 사용여부 디폴트(true)
      if (el === 'wifiList') condData[el] = [{wifiAddr:'',wifiNm:''}]
      if (el === 'beaconList') condData[el] = [{beaconId:'',beaconNm:''}]
      if (el === 'workplcGps') condData[el] = {gpsLat:'',gpsLong:'',gpsScope:'50'}
  })
}

function addCheckClass(scope: string) {
  return { checked: condData.workplcGps.gpsScope === scope }
}


defineExpose({
  POPUP_URL,
  open
})

</script>


<style scoped lang="scss">
@import "@/styles/common.scss";
.map {
  margin: px(0) px(10) 0 px(0);
  border: px(1) solid black;
  width: px(420);
  height: px(280);
}
.plmiBtn {
  padding: px(5) px(0) px(0) px(0);
  align-content: center;
  margin: px(18) px(0) px(5) px(15);
  width: px(25);
  height: px(25);
  font-size: px(25);
  border: px(1) solid #c5cfdb;
  border-radius: px(25);
  &.plmiBtn:hover {
    background-color: grey;
    color: whitesmoke;
    font-weight: bold;
    transition: all linear 0.2s;
  }
}
.input_width250{
  width: px(420);
  overflow: hidden;
}
.scopeBtn {
  padding: px(5) px(10) px(10) px(9);
  margin: px(1) px(5) px(5) px(0);
  min-width: px(60);
  height: px(30);
  font-size: px(15);
  border: px(2) solid grey;
  border-radius: px(15);

  &:hover {
    background-color: #0081ff;
    color: white;
  }
  &.checked {
    background-color: #0081ff;
    color: white;
    font-weight: bold;
  }
}
.scopeInput {
  width: px(70);
  height: px(30);
  padding-left: px(10);
  margin-top: px(2);
  border-radius: px(10);
  border: px(1) solid grey;
  vertical-align: middle;
}
.saveBtn {
  margin: px(0) px(0) px(0) px(250);
}
.gpsInput {
  margin-top: px(17);
  padding-left: px(7);
  width: px(150);
  height: px(30);
  border: px(1) solid #dadce0;
  border-radius: px(4);
  &.gpsInput::placeholder {
    text-align: right;
    padding-right: px(5);
  }
}
ul {
  list-style: none;
}
.wifiIcon {
  margin: px(10) px(10) px(0) px(-30);
  cursor: pointer;
}
.searchIcon {
  width: px(20);
  margin: px(-28) px(0) px(0) 90%;
  cursor: pointer;
}
.right_align {
  display: flex;
  justify-content: right;
  margin-right: px(20);
}
.reamrkInput {
  width: px(100);
  margin-top: px(6);
  margin-right: px(3);
}
.saveBtn {
  width: px(70);
  height: px(30);
  padding: px(1) px(5) px(1) px(5);
  margin: px(0) px(0) px(0) px(250);
  border: px(1) solid #c5cfdb;
  border-radius: px(15);
  font-weight: bold;
  font-size: px(16);
  color: #000;
  background-color: #fff;
}
</style>