<template>
  <VmModal ref="vmModalRef">
    <template #header-title>근무지수정</template>
    <template #header-button>
      <VmButtonQuery class="searchBtn" @click="open" />
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
          <VmCheckbox v-model="condData.workChkMedWifi" item-label="Wi-Fi"/>
          <VmCheckbox v-model="condData.workChkMedBea" item-label="비콘" />
          <VmCheckbox v-model="condData.workChkMedGps" item-label="GPS" />
        </VmRow>
      </VmRow>
      <br />
      <ul v-if="condData.workChkMedWifi == '1'">
        <h1>WIFI</h1>
          <li
             v-for="(wifi, i) in condData.wifiList"
             :wifi = "wifi"
             :key = "wifi.wifiNm"
             :index = "i"
          >
            <VmRow>
              <div class="reamrkInput"><VmSearch v-model="wifi.wifiNm" /></div>
              <VmSearch v-model=" wifi.wifiAddr" />
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
             v-for="(beacon, j) in condData.beaconList"
             :beacon = "beacon"
             :key = "beacon.beaconNm"
             :index = "j"
          >
            <VmRow>
              <div class="reamrkInput"><VmSearch v-model="beacon.beaconNm" /></div>
              <VmSearch v-model=" beacon.beaconId" />
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
        <div ref="mapCRef" class="map"></div>
      </VmRow>
    </VmContainer>
  </VmModal>
</template>


<script setup lang="ts">
import { ref, reactive, nextTick } from "vue";
import { http } from "../../../core";
import VmButton from "@/core/components/button/VmButton.vue";

const vmModalRef = ref<VmModalInterface>()
const POPUP_URL = '/corpWorkplc/updateWorkplc'

type WorkplcGps = {
  gpsLat: string | undefined
  gpsLong: string | undefined
  gpsScope: string | undefined
}

type Wifi = {
  wifiNm: string | undefined
  wifiAddr:  string | undefined
  seq: number | undefined
}

type Beacon = {
  beaconNm: string | undefined 
  beaconId: string | undefined 
  seq: number | undefined
}

interface CondData {
[key: string]: string | number | boolean | Array<string> | Object | null | undefined
  workplcNm: string
  addr: string
  telNo: string
  useYn: boolean
  workChkMedTpList: Array<string>
  workChkMedGps : string,
  workChkMedWifi : string,
  workChkMedBea : string,
  workplcGps: WorkplcGps
  wifiList: Array<Wifi>
  beaconList: Array<Beacon>
}

const condData = reactive<CondData>({
  workplcNm: '',
  addr: '',
  telNo: '',
  useYn: true,
  workChkMedTpList: [],
  workChkMedGps : '0',
  workChkMedWifi : '0',
  workChkMedBea : '0',
  workplcGps: {
    gpsLat: '',
    gpsLong: '',
    gpsScope: ''
  },
  wifiList: [],
  beaconList: []
});


const kakaoC = (window as any).kakao;
const mapCRef = ref<HTMLDivElement>()

async function open(param :any) {
  initCond(param);
  const modal = vmModalRef.value?.open()
  await nextTick()
  initKakao()
  return modal
}

function initKakao() {
  kakaoC.maps.load(() => {

    // 지도영역 설정
    const mapContainer3 = mapCRef.value 
    const mapOption3 = {
      center: new kakaoC.maps.LatLng(condData.workplcGps.gpsLat, condData.workplcGps.gpsLong), 
      level: 3, //확대 레벨
    };

    //지도 초기옵션 세팅
    let mapC = new kakaoC.maps.Map(mapContainer3, mapOption3);

    // 확대축소 컨트롤 세팅 
    const control3 = new kakaoC.maps.ZoomControl();
    mapC.addControl(control3, kakaoC.maps.ControlPosition.TOPRIGHT);

    //주소검색 후 중심좌표 설정 (주소지 결과 반영)
    const geocoder3 = new kakaoC.maps.services.Geocoder();
    geocoder3.addressSearch(condData.addr, function (result: any, status: any) {
      if (status === kakaoC.maps.services.Status.OK) {
        let coords = new kakaoC.maps.LatLng(result[0].y, result[0].x);
        mapC.setCenter(coords);
        condData.workplcGps.gpsLat = result[0].y;
        condData.workplcGps.gpsLong = result[0].x;

        // 마커 등록
        const marker3 = new kakaoC.maps.Marker({
          map: mapC,
          position: coords
        })
        marker3.setMap(mapC);

        // 반경(원) 객체 등록
        const drawingCircle = new kakaoC.maps.Circle({
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
        drawingCircle.setMap(mapC)

        // 인포윈도우 등록
        const infowindow = new kakaoC.maps.InfoWindow({
          map: mapC,
          position: coords,
          content: 
          '<div style="width:70px;padding:3px 3px; margin-left:50%">' + condData.workplcNm + '</div>'
        });
        infowindow.open(mapC, marker3);
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
            wifiAddr: '',
            seq:0
          });
          break;
    case 'addBea':
          condData.beaconList.push({
            beaconNm: '',
            beaconId: '',
            seq:0
          });
          break;
    default: break;
  }
}
function removeRow(eventNm: string, i: number) {
  switch (eventNm) {
    case 'rmWifi':
      if(i == 0 && condData.wifiList.length == 1) condData.wifiList.push({wifiAddr:'',wifiNm:'',seq:0});
      condData.wifiList.splice(i, 1);
      break;
    case 'rmBea':
      if(i == 0 && condData.beaconList.length == 1) condData.beaconList.push({beaconId:'',beaconNm:'',seq:0});
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
  //체크여부에 상관없이, 내용 여부에 따라 방법 저장
  if(condData.workplcGps.gpsLat != '') condData.workChkMedTpList.push('10')
  if(condData.wifiList.length >= 1 && condData.wifiList[0].wifiNm != '')
     condData.workChkMedTpList.push('20');
  if(condData.beaconList.length >= 1 && condData.beaconList[0].beaconNm != '')
     condData.workChkMedTpList.push('30');

  //근무지 저장
  await http.post('/corpWorkplc/updateWorkplc', condData)
  //저장후 auto close
  vmModalRef.value?.close()
}

//클릭한 데이터로 입력값 채워넣음
function initCond(param :any) {
  Object.keys(condData).forEach((el:string) => {   
    condData[el] = param[el]
  }) 
  condData.workChkMedTpList = []; //초기화(중복방지)
  //null 일 경우 추가 체크시 초기화
  if(!param.wifiList) param.wifiList = [{wifiNm:'', wifiAddr:'', seq:0}]
  if(!param.beaconList) param.beaconList = [{beaconNm:'', beaconAddr:'',seq:0}]

  //gps반경 파싱
  condData.workplcGps.gpsScope = "" + param.workplcGps.gpsScope;
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