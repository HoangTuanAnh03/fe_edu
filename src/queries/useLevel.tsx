import levelApiRequest from "@/apiRequests/level";
import { keepPreviousData, useMutation, useQuery } from "@tanstack/react-query";

export const useCreateLevelMutation = () => {
  return useMutation({
    mutationFn: levelApiRequest.sCreate,
  });
};

export const useGetAllLevelQuery = (spec: IModelSpecificationRequest, page: IModelPaginateRequest) => {
    return useQuery({
        queryKey: ["levels", spec, page],
        queryFn: () => levelApiRequest.sGetAll(spec, page),
        placeholderData: keepPreviousData,
        staleTime: 10 * 1000
    })
};

export const useGetByIdQuery = (id: number) => {
  return useQuery({
      queryKey: ["levelById", id],
      queryFn: () => levelApiRequest.sGetById(id),
      staleTime: 10 * 1000
  })
};


