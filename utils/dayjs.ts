import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import isoWeek from "dayjs/plugin/isoWeek";
import relativeTime from "dayjs/plugin/relativeTime";
import weekOfYear from "dayjs/plugin/weekOfYear";
import "dayjs/locale/ko";

dayjs.extend(relativeTime);
dayjs.extend(isoWeek);
dayjs.extend(weekOfYear);
dayjs.extend(customParseFormat)
dayjs.locale("ko");

export const Dayjs = dayjs;
