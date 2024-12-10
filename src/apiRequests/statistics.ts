import { WeeklyAnswerByLevelResponse, WeeklyAnswerRateResponse } from "@/types/statistics";
import http from "@/utils/api";

const statisticsApiRequest = {
  sGetWeeklyAnswerByLevel: () =>
    http.get<IBackendRes<WeeklyAnswerByLevelResponse[]>>(`statistics/weeklyAnswerByLevel`),

  sGetWeeklyAnswerRate: () =>
    http.get<IBackendRes<WeeklyAnswerRateResponse>>(`statistics/weeklyAnswerRate`),

};

export default statisticsApiRequest;
