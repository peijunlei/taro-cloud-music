import HeaderSearch from "@/components/header-search";
import useStores from "@/hooks/useStores";
import { useRequest } from 'taro-hooks';
import loadingImg from '@/assets/loading/loading.gif'
import { Button, View, Text, Image } from "@tarojs/components";
import { observer } from "mobx-react";
import React, { useCallback, useEffect, useState } from "react";
import HotSearchList from "./components/hot-search-list";
import SuggestionList from "./components/suggestion-list";
import SearchList from "./components/search-list/list-item";

import styles from './index.module.scss'
import useData from "./useData";
import CScrollvView from "@/components/c-scroll-view";
import classnames from "classnames";
import ListItem from "./components/search-list/list-item";
import { pxTransform } from "@tarojs/taro";
import { CloudCache } from "@/constants";
import HistorySearchList from "./components/history-search-list";

const Index = () => {
  const { home, search } = useStores()
  const [done, setDone] = useState<boolean>(false);

  const {
    loading,
    loadingMore,
    noMore,
    loadMore,
    hotSearchList,
    searchSuggestionList,
    searchList,
    runSearchSuggestionList,
    value,
    setValue,
    setOffset,
    setKeywords,
    historyList,
    set,
  } = useData()
  const handleChange = (val: string) => {
    setValue(val);
    runSearchSuggestionList(val);
  }
  const handleSearch = useCallback(async (keywords: string) => {
    console.log('====================================');
    console.log(keywords);
    console.log('====================================');
    if (keywords.trim() === '') {
      setValue('');
      setKeywords(home.defaultSearch)
      setDone(true)
      return;
    }
    setOffset(0)
    setKeywords(keywords)
    setValue(keywords)
    setDone(true)
    /**缓存 */
    historyList.push(keywords)
    const _historyList = Array.from(new Set(historyList));
    console.log('====================================');
    console.log(_historyList);
    console.log('====================================');
    await set(CloudCache.SEARCH_HISTORY, _historyList)
  }, [])
  return (
    <View className={styles.wrapper}>
      <HeaderSearch
        placeholder={home.defaultSearch}
        autoFocus
        value={value}
        onChange={(value) => handleChange(value)}
        onConfirm={(value) => handleSearch(value)}
        onFocus={(val) => {
          if (val.trim() === '') return
          setValue(val);
          setDone(false)
          runSearchSuggestionList(val)
        }}
      />
      <View className={styles.con}>
        {
          !done && (
            <HistorySearchList onSearch={handleSearch} />
          )
        }

        {
          done && (
            <CScrollvView
              onScrollToLower={() => {
                console.log('===============加载更多=====================');
                loadMore()
              }}
              loading={loading}
              noMore={noMore}
              loadingMore={loadingMore}
              className={classnames(styles.searchList)}
              list={searchList}
              renderItem={(item, index) => <ListItem key={index} data={item} onPlay={() => { }} searchVal={value} />
              }
            />
          )
        }
        {
          value && !done && (
            < SuggestionList
              searchVal={value}
              list={searchSuggestionList}
              onSearch={(value) => handleSearch(value)}
            />
          )
        }
        {
          !value && !done && (
            < HotSearchList
              list={hotSearchList}
              onSearch={(value) => handleSearch(value)}
            />
          )
        }

      </View>
    </View>
  );
};

export default observer(Index);
