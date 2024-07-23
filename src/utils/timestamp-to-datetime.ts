import { dayjs } from "../lib/dayjs";

const timestampToDatetime = (timestamp: number): string => {
  return dayjs
    .unix(timestamp)
    .tz("America/Sao_Paulo")
    .format("YYYY-MM-DD HH:mm:ss");
};

export default timestampToDatetime;
