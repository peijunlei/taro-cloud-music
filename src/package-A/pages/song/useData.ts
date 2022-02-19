import { useRouterParams } from "@/hooks";
import Taro from "@tarojs/taro";
import { useState } from "react";
import { useRequest, useToast } from "taro-hooks";
import { songDetails, songlyric, songUrl } from "./web-api";

const bgAudioContext = Taro.getBackgroundAudioManager()


interface SongDetails {
  url?: string;
  lrc?: string;
}
const useData = () => {

  const [show] = useToast({ mask: true, icon: 'none' });
  const { id } = useRouterParams<{ id: string }>()
  const [paused, setPaused] = useState(true)
  const [coverImgUrl, setCoverImgUrl] = useState('')
  const { data: urlData } = useRequest(() => songUrl(id), {
    ready: !!id,
    formatResult: (r) => ({
      url: r.res?.data[0].url
    }),
    onSuccess: res => {
      bgAudioContext.src = res.url;
    }
  });
  // const { data: details } = useRequest(() => getSongInfo(id), {
  //   ready: !!id,
  //   onSuccess: (res) => {
  //     // Taro.setNavigationBarTitle({ title: res.data.name || '' })
  //     // bgAudioContext.title = res.data.name;
  //     // bgAudioContext.coverImgUrl = res.data.al.picUrl;
  //     // setCoverImgUrl(res.data.al.picUrl)
  //   }
  // });
  // async function getSongInfo(id: string) {
  //   const { res } = await songDetails(id)
  //   if (res) {
  //     const { res: res1 } = await songUrl(id)
  //     if (res1) {
  //       const { res: res2 } = await songlyric(id)
  //       if (res2) {
  //         return {
  //           ...res.songs[0],
  //           url: res2.data[0].url,
            
  //         }
  //       }
  //     }
  //   } else {
  //     show({ title: '获取歌曲详情失败' })
  //   }
  // }
  return {
    show,
    paused,
    setPaused,
    details: {},
    // url: urlData?.url,
    bgAudioContext,
    coverImgUrl
  }
}


export default useData;



