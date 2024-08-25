import { differenceInCalendarDays, parseISO } from "date-fns";
import { ko } from "date-fns/locale";
import { formatInTimeZone } from "date-fns-tz";

export enum DateFnsFormat {
  /** 2023.04.18 08:23 */
  YYYYMMDDHHmm = "yyyy.MM.dd HH:mm",
  /** 2023.04.18*/
  YYYYMMDD = `yyyy.MM.dd`,
  /** 2023.04.18*/
  yyyymmdd = `yyyy. MM. dd`,
  /** 2023년 05월 31일*/
  YYYYMMDD_KR = `yyyy년 MM월 dd일`,
  /** 2023/05/31*/
  YYYYMMDD_PARAMS = `yyyy/MM/dd`,
  /** 2023년 04월 18일 (목)) */
  YYYYMMDDHHmmEEEEE = "yyyy년 MM월 dd일 (EEEEE)",
  /** 23.04.18 08:23 */
  YYMMDDHHmm = "yy.MM.dd HH:mm",
  /** 23.04.18 08:23 */
  YYMMDD = "yy.MM.dd",
  /** 2023년 04월*/
  YYYYMM_KR = `yyyy년 MM월`,
  /** 2023-1-8*/
  YYYYMD = `yyyy-M-d`,
  /** 04월 18일 */
  MMDD_KR = `MM월 dd일`,
  /** 04월 25일 (목)) */
  MMDDEEEEE = `MM월 dd일 (EEEEE)`,
  /** 04.18 18:20*/
  MMDDHHmm = `MM.dd HH:mm`,
  /** 04.18*/
  MMDD = `MM.dd`,
  /** 18:28*/
  HHmm = "HH:mm",
  /** 목*/
  EEEEE = `EEEEE`,

  // input datetime-local
  YYYY_MM_DDhhmm = `yyyy-MM-dd\'T\'HH:mm`,
  // input datetime
  YYYY_MM_DD = `yyyy-MM-dd`,
  YYYY_MM_DD_HH_mm = `yyyy-MM-dd HH:mm`,
}

export function getUtcToDateFormat(utcDate: string, format: DateFnsFormat) {
  return formatInTimeZone(
    new Date(utcDate.toLocaleString()),
    "Asia/Seoul",
    format,
    { locale: ko }
  );
}

export function getUtcOrUndefinedToDateFormat(
  utcDate: string | undefined,
  format: DateFnsFormat
) {
  if (!utcDate) {
    return "-";
  }
  return getUtcToDateFormat(utcDate, format);
}

export function getUtcToStartEndDateText(
  utcStartDate: string | undefined,
  utcEndDate: string | undefined
) {
  if (!utcStartDate || !utcEndDate) {
    return "-";
  }
  return `${getUtcToDateFormat(
    utcStartDate,
    DateFnsFormat.YYYYMMDD
  )} - ${getUtcToDateFormat(utcEndDate, DateFnsFormat.YYYYMMDD)}`;
}

export function getDateToFormat(date: Date, format: DateFnsFormat) {
  return formatInTimeZone(date, "Asia/Seoul", format);
}

export function getDdayString(utcDate: string) {
  const date = parseISO(utcDate);
  const today = new Date();
  const diff = differenceInCalendarDays(date, today);

  if (diff === 0) {
    return "D-day";
  } else if (diff > 0) {
    return `D-${diff}`;
  } else {
    return `D+${Math.abs(diff)}`;
  }
}
