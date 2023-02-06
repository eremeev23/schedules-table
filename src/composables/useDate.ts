import moment from "moment";

export const useDate = (UtcDate: string): string =>
  moment(UtcDate).format('MMMM Do YYYY ') + 'at' +  moment(UtcDate).format(' h:mm a')
