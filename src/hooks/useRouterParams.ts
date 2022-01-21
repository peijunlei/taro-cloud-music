import { useRouter } from "@tarojs/taro"

function useRouterParams<T>(): T {
  return useRouter().params as T
}
export default useRouterParams;