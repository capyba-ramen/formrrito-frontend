import { utcToZonedTime, format } from 'date-fns-tz';

export const utcToFormatUserDateTime = (
  utcDateTime: string = '',
  formatString: string | undefined = 'yyyy-MM-dd HH:mm:ss'
) => {
  const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  const zonedTime = utcToZonedTime(utcDateTime, timeZone);

  return format(zonedTime, formatString);
};
