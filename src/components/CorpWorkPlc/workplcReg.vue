<template>
    <VmContainer class="body">
        <VmRow>
            <VmCell>
                <VmButtonQuery class="searchBtn" @click="searchWorkplc" />
            </VmCell>
        </VmRow>
        
        <VmRow>
            <div id="mapWorkPlcSample" class="map"></div>
        </VmRow>

        <VmRow>
            <div id="mapWorkPlcSample2" class="map"></div>
        </VmRow>	
        <VmRow>
            <div id="mapWorkPlcSample3" class="map"></div>
        </VmRow>

      <div class="ltComponent">
          <ul>
            <label class="worlplcNm"> {{ state.workplcNm }} </label>
            <WorkplcList class="workplcBox"/>
            <!-- <WorkplcList v-for="(workplc, i) in content.workplcList"
                            :key="i"
                            :index="i"
                            :workplc="workplc"/> -->
          </ul>

          <!-- 임시  추가팝업 대체-->
          <div class="workplcBox">
            <VmRow>
              <h1>근무지추가</h1>
              <VmButtonSave class="saveBtn" @click="saveWorkplc">저장</VmButtonSave>
            </VmRow>
            <VmCell class="inputAddCell">
              <VmSearch label="근무지명" v-model="condData.workplcNm" />
            </VmCell>

            <VmCell class="inputAddCell">
              <VmSearch label="주소" v-model="condData.addr"/>
               <span style="margin-left:-30px;"><VmIcon name="search" @click="addrSearch" class="vm-icon searchIcon"/></span>
            </VmCell>

            <VmCell class="inputAddCell">
              <VmSearch label="전화번호" v-model="condData.telNo" />
            </VmCell><br><br><br><br><br>

            <VmRow>
              <h1>사용</h1>
              <VmRow class="right_align">
                <VmData>
                  <input type="checkbox" id="toggle_workChk" v-model="condData.useYn" class="form-checkbox-input hidden">
                  <label for="toggle_workChk" class="form-checkbox toggle"></label>
                </VmData>
              </VmRow>
            </VmRow><br><br><br><br><br>

            <VmRow>
              <h1>출퇴근방법</h1>
              <VmRow class="right_align">
                <VmCheckbox
                  v-model="condData.workChkMedTpList"
                  table-id="SYS_CODE"
                  code="HRM245"
                />
              </VmRow>
            </VmRow><br><br><br><br>

            <ul v-if="condData.workChkMedTpList.includes('20')">
              <h1>WIFI</h1>
              <li v-for="(row, i) in rows" :key="row" :index="i">
                <VmRow >
                  <span class="reamrkInput"><VmSearch v-model="condData.wifiNmList[i]" /></span>
                  <VmSearch v-model="condData.wifiAddrList[i]"/>
                  <VmIcon class="vm-icon wifiIcon" name="wifi" @click="callWifi(i)"/>
                  <VmButton class="plmiBtn" v-if="i < 4" @click="addRow('wifiAddr_RowPlus', i)">+</VmButton>
                  <VmButton class="plmiBtn" v-if="i > 0" @click="removeRow('wifiAddr_RowMinus', i)">-</VmButton>
                </VmRow>
              </li>
            </ul><br><br><br><br><br>

            <ul v-if="condData.workChkMedTpList.includes('30')">
              <h1>BEACON</h1>
              <li v-for="(row2, i) in rows2" :key="row2" :index="i">
                <VmRow>
                  <span class="reamrkInput"><VmSearch v-model="condData.beaconNmList[i]" /></span>
                  <VmSearch v-model="condData.beaconIdList[i]" />
                  <VmButton class="plmiBtn" v-if="i < 4" @click="addRow('beaconId_RowPlus', i)">+</VmButton>
                  <VmButton class="plmiBtn" v-if="i > 0" @click="removeRow('beaconId_RowMinus', i)">-</VmButton>
                </VmRow>
              </li>
            </ul><br><br><br><br><br>



            <h1>좌표반경</h1>
            <VmRow>
              <div class="scopeBtn" :class="addCheckClass('50')" >
                <VmRadio 
                  style="display:none"           
                  item-label="50m"
                  value="50"
                  radio-name="lcRadio"
                  v-model="condData.gpsScope"
                />
              </div>
              <div class="scopeBtn" :class="addCheckClass('100')">
                <VmRadio 
                  style="display:none"           
                  item-label="100m"
                  value="100"
                  radio-name="lcRadio"
                  v-model="condData.gpsScope"
                />
              </div>
              <div class="scopeBtn" :class="addCheckClass('200')">
                <VmRadio 
                  style="display:none"           
                  item-label="200m"
                  value="200"
                  radio-name="lcRadio"
                  v-model="condData.gpsScope"
                />
              </div>
              <div class="scopeBtn" :class="addCheckClass('500')">
                <VmRadio 
                  style="display:none;"           
                  item-label="500m"
                  value="500"
                  radio-name="lcRadio"
                  v-model="condData.gpsScope"
                />
              </div>

              <div class="scopeBtn" :class="addCheckClass('0')">
                <VmRadio 
                  style="display: none;"           
                  item-label=" 입력"
                  value="0"
                  radio-name="lcRadio"
                  v-model="condData.gpsScope"
                />
              </div>
              <input class="scopeInput" type="number" v-model="condData.gpsScope"/>
              <!-- <VmSearch class="scopeInput" type="number"  v-model="condData.gpsScope"/> -->
            </VmRow><br><br><br><br><br>

            <ul>
              <h1>좌표</h1><span class="tip">( 지도에서 클릭하세요 )</span>
              <li v-for="(row3, i) in rows3" :key="row3" :index="i">
                <VmRow>
                  <!-- <span class="scopeInput"><VmSearch v-model="condData.gpsLat" /></span>
                  <span class="scopeInput"><VmSearch v-model="condData.gpsLong" /></span> -->
                  <input class="gpsInput" placeholder="(위도 °E)" v-model="condData.gpsLat"/>  &nbsp;
                  <input class="gpsInput" placeholder="(경도 °N)" v-model="condData.gpsLong"/>
                  <!-- <VmButton class="plmiBtn" id="gps_RowPlus" v-if="i < 4"  @click="addRow($event, i)">+</VmButton> -->
                  <!-- <VmButton class="plmiBtn" id="gps_RowMinus" v-if="i > 0" @click="removeRow($event, i)">-</VmButton> -->
                </VmRow>
              </li>
            </ul><br><br><br><br><br>

          </div>


          <VmRow>
            <VmButton class="workplcBox" @click="openWorkplcRegPopup">              
              <VmIcon name="plus-icon" class="vm-icon plus_icon" @click="openWorkplcRegPopup"/>
            </VmButton>
          </VmRow>
      </div>

    </VmContainer>

    <WorkplcRegPopup ref="workplcRegPopupRef" />

</template>

<script setup lang="ts">
import { ref, reactive } from "@vue/reactivity";
import { http } from "@/core";
import VmButtonQuery from "@/core/components/button/VmButtonQuery.vue";
import VmButton from "@/core/components/button/VmButton.vue";
import WorkplcRegPopup from "@/views/env/workplc-mgm/WorkplcRegPopup.vue";
import WorkplcList from "@/views/env/workplc-mgm/component/WorkplcList.vue";

interface CondData {
  [key:string] :string | number | boolean | string[] | null | undefined
  workplcNm: string
  addr: string
  telNo: string
  useYn: boolean

  workChkMedTpList: Array<string>

  workChkMedGps: number
  workChkMedWifi: number
  workChkMedBea: number

  wifiNmList: Array<string>  
  beaconNmList: Array<string>  

  wifiAddrList: Array<string>
  beaconIdList: Array<string>

  gpsLat: string
  gpsLong: string
  gpsScope: string
}

const condData = reactive<CondData>({
  workplcNm: '',                  
  addr: '',                       
  telNo: '',        
  useYn: true,                      
  //근무지주소 required -> gps 체크값 세팅
  workChkMedTpList: ['10'],        
  workChkMedGps: 0,      
  workChkMedWifi: 0,
  workChkMedBea: 0,   
  
  wifiNmList: [],  
  beaconNmList: [],  

	wifiAddrList: [],
	beaconIdList: [],

	gpsLat: '',
	gpsLong: '',
	gpsScope: '50',
})


declare const window: any;
const kakao = window.kakao;
let map :any = ref();
let map2 :any = ref();
//let map3 :any = ref();



function addrSearch(){
    new daum.Postcode({
    oncomplete: (data :any) => {
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
        // 우편번호
        //data.postcode = data.zonecode;

        condData.addr = data.address + " " + data.extraAddress;
    },
    }).open();
}

// 사용자 현위치 추적




function searchWorkplc(){ 
  
  kakao.maps.load(() => {
    //Map1
    const mapContainer = document.getElementById('mapWorkPlcSample') 
    const mapOption = {
      center: new kakao.maps.LatLng(37.48569, 127.01032), 
      level: 3, 
    }
     //첫번째 근무지 기준으로 중심좌표 이동
     //map2.setCenter(coords);

    map = new kakao.maps.Map(mapContainer, mapOption);
    //마커1
    const marker = new kakao.maps.Marker({
          position: mapOption.center
    })
    marker.setMap(map);
  


    //Map2

    //현위치 얻을수없을 때 기본 주소지로 시작
    let latitude = 37.48569;
    let longitude = 127.01032;
    //GeoLocation 현위치 얻어오기 (권한허용 필요)
    if (navigator.geolocation) { 
        navigator.geolocation.getCurrentPosition((position) =>{
          latitude  = position.coords.latitude
          longitude = position.coords.longitude
        }); 
    }else{
      alert('GPS 추적이 허용되지 않아, 기본 주소지로 시작합니다.')
    }

    const mapContainer2 = document.getElementById('mapWorkPlcSample2') 
    const mapOption2 = {
          center: new kakao.maps.LatLng(latitude, longitude), //중심좌표
          level: 3, //확대 레벨
    };
    map2 = new kakao.maps.Map(mapContainer2, mapOption2);
    // 확대축소 컨트롤
    const control2 = new kakao.maps.ZoomControl();
    map2.addControl(control2, kakao.maps.ControlPosition.TOPRIGHT); 
  
    // //마커2 클릭이벤트 등록
    // //let latlng :any;
    // kakao.maps.event.addListener(map2, 'click', function(mouseEvent: any){
    //   const latlng = mouseEvent.latLng;

    //   // 마커2 등록
    //   // const marker2 = new kakao.maps.Marker({
    //   //     position: latlng
    //   // })
    //   // marker2.setMap(map2)
    // })

  const geocoder2 = new kakao.maps.services.Geocoder();

        geocoder2.addressSearch(condData.addr, function(result: any, status: any){
          //정상적으로 검색이 완료됐으면 
          if (status === kakao.maps.services.Status.OK) {
              let coords = new kakao.maps.LatLng(result[0].y, result[0].x);
              condData.gpsLat = result[0].x;
              condData.gpsLong = result[0].y;

              // 결과값 위치를 마커로 표시
              const marker2 = new kakao.maps.Marker({
                  map: map2,
                  position: coords
              });

              // 반경 객체  
              const drawingCircle = new kakao.maps.Circle({ 
                  strokeWeight: 1, // 선의 두께
                  strokeColor: '#00a0e9', // 선의 색깔
                  strokeOpacity: 0.1, // 선 불투명도
                  strokeStyle: 'solid', // 선의 스타일
                  fillColor: '#00a0e9', // 채우기 색깔
                  fillOpacity: 0.2 // 채우기 불투명도
              });   
              const circleOptions = { 
                  center : coords, 
                  radius : condData.gpsScope,   
              }
              drawingCircle.setOptions(circleOptions)     
              drawingCircle.setMap(map2)  
    
              // 인포윈도우로 장소에 대한 설명
              var infowindow = new kakao.maps.InfoWindow({
                  content: '<div style="min-width:70px;text-align:center;padding:5px 0;">'+ condData.workplcNm+'</div>'
              });
              infowindow.open(map2, marker2);

              // 지도의 중심을 결과값 위치로 이동
              map2.setCenter(coords);
          } 

        })

    // const markers: any[] = [];
    // //마커 여러개 컨트롤
    // //addMarker(latlng);
    // function addMarker(position :any){
    //   const marker2 = new kakao.maps.Marker({
    //       position: position
    //   })
    //   const circleOptions = { 
    //       center : position, 
    //       radius : condData.gpsScope,   
    //   }
    //   drawingCircle.setOptions(circleOptions)     
    //   drawingCircle.setMap(map2)
    //   circles.push(drawingCircle)

    //   if(markers.length > 1){
    //     rows3.value.push(''); 
    //   }
      
    //   //마커 추가
    //   if (markers.length <= 5 ){
    //       marker2.setMap(map2)
    //       markers.push(marker2)
    //       //해당 마커의 좌표 인식(La:위도 Ma:경도)
    //       condData.gpsLatList.push(position.La)
    //       condData.gpsLongList.push(position.Ma)
      
    //       //마커 삭제
    //       kakao.maps.event.addListener(marker2, 'click', function(mouseEvent: any) {
    //         if(confirm('해당 좌표의 근무지를 삭제하시겠습니까?')){
    //             //배열에서 index값으로 삭제 (lastIndex = -1 제외)
    //             if(markers.indexOf(marker2) == -1 || markers.indexOf(marker2) == markers.length-1){
    //               condData.gpsLatList.splice(markers.length-1,1);        
    //               condData.gpsLongList.splice(markers.length-1,1);  
    //               drawingCircle.setMap(null)
    //             }else{
    //               condData.gpsLatList.splice(markers.indexOf(marker2)-1,1);        
    //               condData.gpsLongList.splice(markers.indexOf(marker2)-1,1);  
    //             }
    //             //삭제 적용
    //             marker2.setMap(null) 
    //             markers.splice(markers.indexOf(marker2)-1,1);

    //             //삭제 한도 (줄 초기화값)
    //             if(rows3.value.length > 1){
    //               rows3.value.splice(markers.length-1,1) 
    //             }else{
    //               condData.gpsLatList.splice(markers.length-1,1);        
    //               condData.gpsLongList.splice(markers.length-1,1);  
    //             } 
    //         } //confirm ok
    //       });

    //   //마커 추가 클릭 제한
    //   } else {
    //     alert('근무지 갯수가 초과되었습니다.'); 
    //     rows3.value.splice(markers.length-1,1); 
    //   }
    // }
    // //마커 추가한만큼 지도에 등록
    // setMarkers(map2)
    // function setMarkers(map2: any){
    //   for(var i=0; i<markers.length; i++){
    //     markers[i].setMap(map2)
    //   }
    // }


    // 초기화
    //centerPosition = null;
    //drawingCircle.setMap(null);

    // 모든 반경 배열 제거
    // function removeCircles() {         
    //     for (var i = 0; i < circles.length; i++) {
    //         circles[i].circle.setMap(null);    
    //     }         
    //     circles = [];
    // }
  
 }); // kakao.maps.load(()

} //  searchWorkplc  



const state = reactive({
  workplcNm: '',                  
	gpsLat: '',
	gpsLong: '',
	gpsScope: '',
	wifiAddr: '',
	beaconId: ''
})

interface WorkplcInfo {
  address :string,
  location :string,
  wifi : string
}

const content = reactive({
  workplcList : [] as WorkplcInfo[]
})
console.log(content)

const workplcRegPopupRef = ref<VmModalInterface>();



//근무지 추가 팝업
async function openWorkplcRegPopup(){
  await workplcRegPopupRef.value?.open(); 
}




//input줄 빈칸으로 추가
const row = ''
const row2 = ''
const row3 = ''
const rows = ref([row])
const rows2 = ref([row2])
const rows3 = ref([row3])

function addRow(eventNm :string, i:number){
  switch(eventNm){
    case 'wifiAddr_RowPlus' : 
          rows.value.push(''); 
        break;
    case 'beaconId_RowPlus' : 
          rows2.value.push(''); 
        break;
    // case 'gps_RowPlus' : 
    //       rows3.value.push(''); 
    //     break;
    default : break;
  }
}
function removeRow(eventNm :string, i :number){
  switch(eventNm){
    case 'wifiAddr_RowMinus' : 
          rows.value.splice(i,1); 
          condData.wifiAddrList.splice(i,1);
          condData.wifiNmList.splice(i,1)
          break;
    case 'beaconId_RowMinus' : 
          rows2.value.splice(i,1);
          condData.beaconIdList.splice(i,1);
          condData.beaconNmList.splice(i,1)
          break;
    // case 'gps_RowMinus' : 
    //       rows3.value.splice(i,1); 
    //       condData.gpsLatList.splice(i,1);      
    //       condData.gpsLongList.splice(i,1);
    //       //marker2.setMap(null)       
    //       break;
    default: break;
  }
}

async function callWifi(i :number){
  const clientIp :any = await http.post('/workplcRegPopup/getClientIp') ;
  condData.wifiAddrList[i] = clientIp;
}


async function saveWorkplc(){
  for(var i=0; i <condData.workChkMedTpList.length ; i++){
    switch(condData.workChkMedTpList[i]){
      case '10' : 
                condData.workChkMedGps = 1
                console.log('workChkMedGps:',condData.workChkMedGps)
                break;
      case '20' : 
                condData.workChkMedWifi = condData.wifiAddrList.length; 
                console.log('workChkMedWifi:',condData.workChkMedWifi)
                break;
      case '30' : 
                condData.workChkMedBea = condData.beaconIdList.length; 
                console.log('workChkMedBea:',condData.workChkMedBea)
                break;
      default : break;
    }
  }

 console.log('condData:',condData)
//근무지 저장
await http.post('/workplcRegPopup/addWorkplc', condData)
//저장 후 초기화
initCond(condData);

}

//입력창 초기화
function initCond (param :any){  
  Object.keys(condData).forEach((el) =>{
    if(typeof el == 'string') condData[el] = ''
    if(typeof el == 'number') condData[el] = 0
    if(typeof el == 'boolean') condData[el] = true
    if(el.constructor == Array) condData[el] = []
    else return;
  })
}


function addCheckClass(scope: string) {
  return {
    checked: condData.gpsScope === scope
  }
}


</script>

<style scoped lang="scss">
@import "@/styles/common.scss";
.searchBtn{
    padding: px(1) px(5) px(1) px(5);
    margin-left: 61rem;
    margin-top: 1rem;
    border:px(1) solid #c5cfdb;
    border-radius:px(15);
    font-weight:bold;
    font-size:px(16);
    color: #000;
    background-color: #fff;
    text-align: center;
    align-items:center;
    justify-content:center;
    width: px(70);
    height: px(30);
    cursor: pointer;
}
.workplcBox{
  overflow: hidden;
  position: relative;
  min-height: px(100);
  min-width: px(450);
  width: 50%;
  padding: px(30) px(20) px(20) px(20);
  margin: px(0) px(10) px(30) px(30);
  line-height: px(5);
  border-radius: px(8);
  background-color: #fff;
  border:px(1) solid #c5cfdb;
  box-shadow: 0 px(10) px(10) rgb(0 0 0 / 5%);
  cursor: pointer;
}
.worlplcNm{
  font-weight: 700;
  margin: px(0) px(10) px(5) px(35);
}
.map{
    z-index: 0;
    display: inline-block;
    margin: px(30) px(10) 0 px(550);
    position: relative;
    border:px(1) solid black;
    width: px(500);
    height: px(400);
}
.body {
  background-color: #F2F2F2;
  min-height: px(900);
}
.ltComponent{
  top:px(-1350);
  margin: px(10) px(300) px(10) px(10);
  position: relative;
  display: inline-block;
  width: 43%;
  padding: px(30) px(20) px(20) px(20);
}

.plmiBtn {
  padding: px(5) px(0) px(0) px(0);
  align-content: center;
  margin:  px(25) px(-10) px(5) px(15);
  width: px(25) ;
  height: px(25) ;
  font-size: px(25);
  border:px(1) solid #c5cfdb;
  border-radius: px(25) ;
  &.plmiBtn:hover {
    background-color: grey;
    color: whitesmoke;
    font-weight: bold;
    transition: all linear 0.2s;
  }

}
.scopeBtn {
  padding: px(11) px(10) px(10) px(10);
  margin:  px(1) px(5) px(5) px(0);
  width: px(60) ;
  height: px(30) ;
  font-size: px(15);
  border:px(2) solid grey;
  border-radius: px(15) ;

  &:hover{
    background-color: #0081FF;
    color: white;  
  }
  &.checked {
    background-color: #0081FF;
    color: white;
    font-weight: bold;
  }
}
.scopeInput{
  width: px(70);
  height: px(30) ;
  padding-left: px(10);
  margin-top: px(2);
  border-radius: px(10);
  border:px(1) solid grey;
  vertical-align: middle;
}
.saveBtn{
  margin: px(0) px(0) px(0) px(250);
}
.gpsInput{
  margin-top: px(17); 
  padding-left: px(7);
  width: px(85);
  height: px(30);
  border: px(1) solid #dadce0;
  border-radius: px(4);
  &.gpsInput::placeholder{
    text-align: right;
    padding-right: px(5);
  }
}
ul{
  list-style: none;
}
.wifiIcon{
  margin: px(10) px(10) px(0) px(-30);
}
.searchIcon{
  margin-top: px(-40);
  margin-left: px(340);
}
.tip{
  position: absolute;
  margin-top: px(30);
  margin-left: px(200);
}
.right_align {
  display: flex;
  justify-content: right;
}
.reamrkInput{
  width: px(100);
  margin-top: px(6);
  margin-right: px(3);
}
</style>
