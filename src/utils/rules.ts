import moment from "moment";
import { TDateFormat } from "../models/Date";

export const rules = {
  required: (message: string = 'Обязательное поле') => ({
    required: true,
    message
  }),
  more: (message: string, startTime: string, endTime: string) => () => ({
    validator() {
      if (moment(endTime, TDateFormat.HoursMinSec).isSameOrAfter(moment(startTime, TDateFormat.HoursMinSec))) {
        return Promise.resolve()
      }
      if(endTime){
        return Promise.reject(new Error(message));
      }else{
        return Promise.reject(new Error());
      }
    }
  })
}
