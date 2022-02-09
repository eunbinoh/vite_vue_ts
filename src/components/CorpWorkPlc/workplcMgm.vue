<template>
  <VmContainer class="body">
    <VmRow>
      <VmCell>
        <VmButtonQuery class="searchBtn" @click="searchWorkplcList" />
      </VmCell>
    </VmRow>
    <div class="ltComponent">
      <ul>
        <li  
            v-for="(state, i) in states" 
            :key="state.addr"
            :state="state" 
            :index="i"
        >  
            <!-- @mouseover  = "markerHover = true"
            @mouseleave = "markerHover = false" -->
          <VmCell 
            v-if="state != null"  
            class="workplcBox" 
            @click="openWorkplcModifyPopup(i)"
          >           
              <VmRow> 
                <label class="workplcNm"> {{ state.workplcNm }} </label> 
              </VmRow>
              <VmRow>
                <div>
                  <strong>주소 : &nbsp;</strong>  
                  <span>{{ state.addr }} </span>
                </div>
              </VmRow>
              <VmRow v-if="state.workChkMedGps == '1'">
                <strong>좌표 : &nbsp; </strong>
                <span >{{ (state.workplcGps.gpsLat)?.substring(0, (state.workplcGps.gpsLat).indexOf(".")+4 ) }} , </span>
                <span >{{ (state.workplcGps.gpsLong)?.substring(0, (state.workplcGps.gpsLong).indexOf(".")+4 )}} </span>
                <span >&nbsp; ({{state.workplcGps.gpsScope}} m) </span>
              </VmRow>
              <VmRow v-if="state.workChkMedWifi == '1'">
                <div>
                  <strong>Wifi : &nbsp; </strong> 
                  <span> {{ state.wifiList[0].wifiAddr }} </span>
                  <span v-if="state.wifiList.length> 1 || state.workChkMedBea == '1'" > &nbsp; 외 + {{ state.wifiList.length + state.beaconList.length -1 }}개</span>
                </div>
              </VmRow>
              <VmRow v-if="state.workChkMedWifi != '1' && state.workChkMedBea == '1'">
                <div>
                  <strong>Beacon : &nbsp;</strong> 
                  <span>{{ state.beaconList[0].beaconId }} </span> 
                  <span v-if="state.beaconList.length > 1" > &nbsp; 외 + {{ state.beaconList.length -1}}개</span> 
                </div>
              </VmRow>
          </VmCell>
        </li>
      </ul>
      <VmRow>
        <VmButton class="workplcBox_btn" @click="openWorkplcRegPopup">
          <VmIcon name="plus-icon" class="vm-icon plus_icon" @click="openWorkplcRegPopup" />
        </VmButton>
      </VmRow>
    </div>

    <div class="rtComponent">
      <VmRow>
        <div ref="mapRefA" class="map"></div>
      </VmRow>
    </div>

  </VmContainer>

  <WorkplcRegPopup ref="workplcRegPopupRef" class="popup"/>
  <WorkplcModifyPopup ref="workplcModifyPopupRef" class="popup"/>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { http } from "@/core";
import VmButtonQuery from "@/core/components/button/VmButtonQuery.vue";
import VmButton from "@/core/components/button/VmButton.vue";
import WorkplcRegPopup from "@/views/env/workplc-mgm/WorkplcRegPopup.vue";
import WorkplcModifyPopup from "@/views/env/workplc-mgm/WorkplcModifyPopup.vue";

const workplcRegPopupRef = ref<VmModalInterface>();
const workplcModifyPopupRef = ref<VmModalInterface>();
//const markerHover = false; 

type WorkplcGps = {
  gpsLat: string | null
  gpsLong: string | null
  gpsScope: string | null
}
type WifiList = {
  wifiNm: string | null
  wifiAddr: string | null
  seq: string | number | null
}
type BeaconList = {
  beaconNm: string | null
  beaconId: string | null
  seq: string | number | null
}

interface State {
[key: string]: string | boolean | Object | Array<Object> | null | undefined
  workplcNm: string
  addr: string
  workplcCd: string
  workChkMedGps : string 
  workChkMedWifi : string 
  workChkMedBea : string 
  workplcGps: WorkplcGps
  wifiList: Array<WifiList>
  beaconList: Array<BeaconList>
}
let states = ref< Array<State> | []>([]);

const kakaoA :any = (window as any).kakao;
const mapRefA = ref<HTMLDivElement>();

//근무지 리스트 조회
async function searchWorkplcList(){

  interface Position {
    title: string
    latlng: string
  }
 
  //리스트 추출
  const workplclist = await http.post('/corpWorkplc/findListWorkplc')
  if(!workplclist) return;
  // 초기화 후 결과값 로딩
  const tempList: Array<State> = [];
  workplclist.forEach((el: any) => {
    const s :State = {...el};
    tempList.push(s);
  });

  states.value = tempList;

    //근무지 맵 생성
    kakaoA.maps.load(() => {
      //지도영역
      const mapContainer = mapRefA.value
      const mapOption = {
        //중심좌표 : 조회한 근무지 첫번째 좌표로 기본 설정
        center: new kakaoA.maps.LatLng(workplclist[0].workplcGps.gpsLat,workplclist[0].workplcGps.gpsLong), 
        level: 3, //확대 레벨
      };
      const mapA = new kakaoA.maps.Map(mapContainer, mapOption);

      //근무지 각각의 좌표, 이름을 지도 아이템으로 가져옴
      
      const positions: Position[] = [];
      for(let i=0; i < workplclist.length ; i++){
        const item: Position = {
          title : workplclist[i].workplcNm,
          latlng: new kakaoA.maps.LatLng(workplclist[i].workplcGps.gpsLat,workplclist[i].workplcGps.gpsLong)
        }
        positions.push(item);
      }

      //근무지 수만큼 마커 생성
      positions.forEach((item :Position) => {        
        const markerA = new kakaoA.maps.Marker({
            map: mapA, // 마커를 표시할 지도
            position: item.latlng, // 마커를 표시할 위치
            title : item.title, // 마커의 타이틀, 마우스 올리면 타이틀 표시
        });
        markerA.setMap(mapA);
        
        // 마커 클릭이벤트 등록
        kakaoA.maps.event.addListener(markerA, 'click', function() {
          states.value.forEach((s :State, i :number) => {
            positions.forEach((item :Position) => { 
              if(states.value[i].workplcNm === item.title ) return i 
              openWorkplcModifyPopup(i); 
            })
          })
        });
        // kakaoA.maps.event.addListener(markerA, 'click', function() {
        //   console.log(markerA);
        //   positions.forEach((item :Position, i :number, list :any ) => {
        //     // positions.find( (i: number) =>{
        //     //   for(let i=0; i < workplclist.length ; i++){
        //     //     if(workplclist[i].workplcNm == item.title) return i;
        //     //     console.log('find i:',i); 
        //     //     break;
        //     //   } 
        //     // }) 

        //     positions.find(({title}, i) => { return title === workplclist[i].workplcNm });
        //     console.log('i',i);
        //     openWorkplcModifyPopup(i); 
        //   })
        // });
      
      })
     

    // 확대축소 컨트롤
    const control2 = new kakaoA.maps.ZoomControl();
    mapA.addControl(control2, kakaoA.maps.ControlPosition.TOPRIGHT); 
    // 맵 컨테이너 세팅값
    // mapContainer!.style.width = '800px';
    // mapContainer!.style.height = '700px';
    // mapA.relayout();

  })
}

//근무지 추가 팝업
async function openWorkplcRegPopup() {
  await workplcRegPopupRef.value?.open();
  // 저장후 자동조회
  searchWorkplcList();
}
//근무지 수정 팝업
async function openWorkplcModifyPopup(i :number) {
  await workplcModifyPopupRef.value?.open(states.value[i]);
  // 수정후 자동조회
  searchWorkplcList();
}

</script>

<style scoped lang="scss">
@import "@/styles/common.scss";
.body {
  position: relative;
  background-color: #f2f2f2;
  min-width: px(1200);
  min-height: px(900);
}
.ltComponent {
  display: inline-block;
  position: absolute;
  margin-top: px(110);
}
.rtComponent{
  display: inline-block;
  position: absolute;
  margin-top: px(80);
  margin-left: px(450);
}
.map {
  z-index: 0;
  margin: px(30) px(10) 0 px(0);
  border: px(1) solid black;
  width: px(800);
  height: px(700);
}
.workplcBox {
  overflow: hidden;
  min-width: px(350);
  min-height: px(110);
  padding: px(30) px(20) px(30) px(20);
  margin: px(0) px(10) px(30) px(30);
  line-height: px(5);
  border-radius: px(8);
  background-color: #fff;
  border: px(1) solid #c5cfdb;
  box-shadow: 0 px(10) px(10) rgb(0 0 0 / 5%);
  cursor: pointer;
}
.workplcBox_btn{
  min-width: px(350);
  height: px(80);
  padding: px(30) px(20) px(30) px(20);
  margin: px(0) px(10) px(30) px(30);
  line-height: px(5);
  border-radius: px(8);
  background-color: #fff;
  border: px(1) solid #c5cfdb;
  box-shadow: 0 px(10) px(10) rgb(0 0 0 / 5%);
  cursor: pointer;
}
.workplcNm{
  font-size: px(18);
  font-weight: 600;
  line-height: 100%;
}
.searchBtn {
  padding: px(1) px(5) px(1) px(5);
  margin-left: 73rem;
  margin-top: 2rem;
  border: px(1) solid #c5cfdb;
  border-radius: px(15);
  font-weight: bold;
  font-size: px(16);
  color: #000;
  background-color: #fff;
  text-align: center;
  justify-content: center;
  width: px(70);
  height: px(30);
  cursor: pointer;
}
.popup{
  z-index: 99999;
}
</style>
