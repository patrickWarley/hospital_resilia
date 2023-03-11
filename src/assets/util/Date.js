import moment from "moment";
export function FormatDate(date, format) {
  return moment(date).format(format);
}