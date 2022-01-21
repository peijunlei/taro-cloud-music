import useStores from "@/hooks/useStores"
import { useInfiniteScroll } from "ahooks";
import { useRef, useState } from "react";
import { useRequest } from "taro-hooks";
import { searchHot, searchList, searchSuggestion } from "./web-api";


const useData = () => {


  // const { home, search } = useStores()
  const [value, setValue] = useState<string>()
  const [keywords, setKeywords] = useState<string>()

  const containerRef = useRef(null);
  const [offset, setOffset] = useState(0);
  // const [hotSearchList, setHotSearch] = useState([])
  // const [searchSuggestionList, setSearchSuggestionList] = useState([])
  // const [searchList, setSearchList] = useState([])
  const { data: _hotSearchList } = useRequest(searchHot, {
    formatResult: (r) => r.res?.data,
  });
  const { data: _searchSuggestionList, run: runSearchSuggestionList } = useRequest(searchSuggestion, {
    manual: true,
    debounceInterval: 300,
    formatResult: (r) => r.res?.result?.allMatch || [],
  });



  /**分页  搜索 */
  const { data, loading, reload: runSearchList, loadingMore, noMore, loadMore } = useInfiniteScroll((d) => {
    console.log('=================dddd===================');
    console.log(d?.offset, d?.list);
    console.log('====================================');
    setOffset(offset + 1)
    return querySearchList(keywords, offset*30,30)
  }
    , {
      manual: true,
      target: containerRef,
      reloadDeps: [keywords],
      isNoMore: (d) => (d ? d.list.length >= d.total : false),
    });
  const querySearchList = async (keywords, offset,limit) => {
    const { res, err } = await searchList({ keywords, offset,limit })
    if (!err && !!res) {
      return {
        list: res.result.songs,
        total: res.result.songCount,
      }
    }
    return {
      list: [],
      total: 0,
    }
  }

  return {
    value,
    setValue,
    loading,
    loadingMore,
    setOffset,
    noMore,
    keywords,
    setKeywords,
    hotSearchList: _hotSearchList || [],
    searchSuggestionList: _searchSuggestionList || [],
    searchList: data?.list || [],
    runSearchSuggestionList,
    runSearchList,
    loadMore
  }
}


export default useData;



