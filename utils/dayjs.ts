import dayjs from "dayjs";
import isoWeek from "dayjs/plugin/isoWeek";
import weekOfYear from "dayjs/plugin/weekOfYear";
import "dayjs/locale/ko";

dayjs.extend(isoWeek);
dayjs.extend(weekOfYear);
dayjs.locale("ko");
//TODO: this.date를 만들어서 공유관리해서, 체이닝가능하도록 리팩터링하면 좋을듯
export default class Dayjs{
  format(date:Date,form:string):string{
    return dayjs(date).format(form);
  }

  moveToNextMonth(date:Date):Date{
    return dayjs(date).add(1,"month").toDate();
  }

  moveToPreviousMonth(date:Date):Date{
    return dayjs(date).subtract(1,"month").toDate();
  }

  getStartWeek(date:Date):number{
    return dayjs(date).startOf("month").week();
  }

  getEndWeek(date:Date):number{
    return dayjs(date).endOf("month").week();
  }

  getDate(date:Date, weekOfyear:number,dayOfweek:number):Date{
    if(this.format(date, "MM") === "12"){
      //TODO: 왜 52를 뺴줘야 정상작동하지, 안그러면 12월은 하루씩 뒤로가짐.
      return dayjs(date).startOf("week").week(weekOfyear-52).day(dayOfweek).toDate();
    }
    return dayjs(date).startOf("week").week(weekOfyear).day(dayOfweek).toDate();
  }

}