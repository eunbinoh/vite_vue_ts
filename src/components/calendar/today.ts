export const weekends = ['SUN', 'MON', 'TUE','WED','THU','FRI','SAT'];

export const today = new Date()
export const todayYr = today.getFullYear()
export const todayMonth = today.getMonth()+1

export function getDate(year: number, month: number) {
  const firstDay = new Date(year, month, -1, 1).getDay(); //월 시작 요일
  const lastDate = new Date(year, month, 0).getDate();    //월 마지막 일자
  let lastYr = year;   //전년도
  let lastMon = month -1;  //전달
  if(month === 1) {
      lastYr = year-1; 
      lastMon = 12;
  }
  const preLastDate = new Date(lastYr, lastMon, 0).getDate(); // 전달 마지막 일자

  return [firstDay,lastDate,preLastDate] ;
}