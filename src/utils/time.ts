import { TIME_FORMAT } from './../constants/global';
import dayjs from 'dayjs';

export default class TimeUtils {
  private constructor() {}

  static nowUtc() {
    return dayjs.utc();
  }

  /**
   *
   * @param datetime UTC datetime
   * @param timeFormat
   * @returns Formated datetime in local timezone
   */
  static toLocalTime(datetime: string, timeFormat: string = TIME_FORMAT) {
    return dayjs(datetime).utc(true).local().format(timeFormat);
  }
}
