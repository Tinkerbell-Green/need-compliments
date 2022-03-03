import dayjs from "dayjs";
import isoWeek from "dayjs/plugin/isoWeek";
import weekOfYear from "dayjs/plugin/weekOfYear";
import "dayjs/locale/ko";

dayjs.extend(isoWeek);
dayjs.extend(weekOfYear);
dayjs.locale("ko");

export const Dayjs = dayjs;
