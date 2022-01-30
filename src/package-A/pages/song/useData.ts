import { useRouterParams } from "@/hooks";
import Taro from "@tarojs/taro";
import { useState } from "react";
import { useRequest, useToast } from "taro-hooks";
import { songDetails, songUrl } from "./web-api";

const bgAudioContext = Taro.createInnerAudioContext()
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
      console.log('====================================');
      console.log( bgAudioContext.src);
      console.log('====================================');
      if (bgAudioContext.src) {
        bgAudioContext.autoplay = true
      } else {
        show({ title:'自动播放失败'})
      }
    }
  });
  const { data: details } = useRequest(() => songDetails(id), {
    ready: !!id,
    formatResult: (r) => ({
      data: r.res?.songs[0]
    }),
    onSuccess: (res) => {
      Taro.setNavigationBarTitle({ title: res.data.name || '' })
      setCoverImgUrl(res.data.al.picUrl)
    }
  });

  return {
    show,
    paused,
    setPaused,
    details: details?.data,
    url: urlData?.url,
    bgAudioContext,
    coverImgUrl
  }
}


export default useData;



