import { useRouterParams } from "@/hooks";
import { useToggle } from "ahooks";
import { useRequest } from "taro-hooks";
import { songListDetails } from "./web-api";


const useData = () => {


  const { id } = useRouterParams<{ id: string }>()
  const { data: details, loading, error } = useRequest(() => songListDetails(id), {
    ready: !!id,
    formatResult: (r) => ({
      data: r.res?.playlist
    })
  });
  return {
    data: details?.data,
    loading,
    error
  }
}

export default useData;



