import SizeBox from "@/components/size-box";
import useStores from "@/hooks/useStores";
import { Button, View, Text, Input } from "@tarojs/components";
import Taro from "@tarojs/taro";
import { observer } from "mobx-react";
import React, { useEffect } from "react";
import styles from './index.module.scss'
import { homeBanner, personalized, searchDefault, toplistDetail } from "./web-api";
import CSwiper from "./components/swiper";
import Recommend from "./components/recommend";
import HeaderSearch from "@/components/header-search";
import ListTitle from "@/components/list-title";
import TopList from "./components/top-list";
import { useToast } from "taro-hooks";

const Index = () => {
  const { home } = useStores()
  const [show, hide] = useToast({icon:'none',mask:true});
  const init = async () => {
    const result = await Promise.all([searchDefault(), homeBanner(), personalized(), toplistDetail()])
    console.log(result);
    result[0].res && home.setDefaultSearch(result[0].res.data.showKeyword)
    result[1].res && home.setBanners(result[1].res.banners)
    result[2].res && home.setPersonalizedList(result[2].res.result)
    result[3].res && home.setToplist(result[3].res.list)
  }
  useEffect(() => {
    init()

  }, [])
  return (
    <View className={styles.wrapper}>
      <HeaderSearch
        disabled
        placeholder={home.defaultSearch}
        onClick={() => Taro.navigateTo({ url: '/package-A/pages/search/index' })}
      />
      <SizeBox height={20} />
      <View className={styles.con}>
        <CSwiper
          // autoplay
          list={home.banners}
        />
        <SizeBox height={20} />
        <ListTitle title='推荐歌单' moreLink={() => show({title:'推荐歌单'})} />
        <Recommend list={home.personalizedList} />
        <ListTitle title='网抑云热歌榜' moreLink={() => show({title:'网抑云热歌榜'})} />
        <TopList list={home.toplist} />

      </View>
    </View>
  );
};

export default observer(Index);
