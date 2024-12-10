import levelApiRequest from "@/apiRequests/statistics";
import {
  keepPreviousData,
  useQuery,
} from "@tanstack/react-query";

export const useGetWeeklyAnswerByLevelQuery = () => {
  return useQuery({
    queryKey: ["statistics", "weeklyAnswerByLevel"],
    queryFn: () => levelApiRequest.sGetWeeklyAnswerByLevel(),
    placeholderData: keepPreviousData,
    staleTime: 60 * 1000,
  });
};


export const useGetWeeklyAnswerRateQuery = () => {
  return useQuery({
    queryKey: ["statistics", "weeklyAnswerRate"],
    queryFn: () => levelApiRequest.sGetWeeklyAnswerRate(),
    placeholderData: keepPreviousData,
    staleTime: 60 * 1000,
  });
};

