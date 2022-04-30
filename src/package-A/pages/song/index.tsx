import Taro from "@tarojs/taro";
import { Button, View, Text, Image, Slider } from "@tarojs/components";
import { useMount, useToggle, useUnmount } from "ahooks";
import classNames from "classnames";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import styles from './index.module.scss'
import useData from "./useData";
//暂停播放
import pauseImg from '@/assets/play_tool/play_pause.png';
import playImg from '@/assets/play_tool/play_play.png';
//上下首切换  播放模式
import prevImg from '@/assets/play_tool/play_prev.png';
import nextImg from '@/assets/play_tool/play_next.png';
import loopImg from '@/assets/play_tool/play_loop.png';
import oneImg from '@/assets/play_tool/play_one.png';
import shuffleImg from '@/assets/play_tool/play_shuffle.png';
import listImg from '@/assets/play_tool/play_list.png';

//磁盘背景
import playTool from '@/assets/images/song/play_tool.png';
import playPanel from '@/assets/images/song/play_panel.png';
import { observer } from "mobx-react";
import { useRouterParams, useStores } from "@/hooks";
import { PlayMode } from "@/store/global";
import { Popup } from "@taroify/core";
import { CloudCache } from "@/constants";
import { useToast } from "taro-hooks";
import { songDetails, songlyric, songUrl } from "./web-api";
import { Toast } from "@/utils/ui";
import { fmtTime } from "@/utils/common";
const PlayModeImg = {
  Loop: loopImg,
  One: oneImg,
  Shuffle: shuffleImg
}

interface ISongInfo {
  /**音乐url */
  musicUrl?: string;
  /**音乐 name */
  musicName?: string;
  /**歌手 name */
  singerName?: string;
  /**歌手 name */
  singerImg?: string;
  /**歌曲 标题 */
  musicTitle?: string;
  /**歌曲时长 */
  durationTime?: number;
  /**歌词 */
  lrc?: string
}
const Index = () => {
  const { global } = useStores()
  const { id } = useRouterParams<{ id: string }>()
  const [isPlay, setPlay] = useState(false)
  const [wait, setWaiting] = useState(false)
  const [songInfo, setSongInfo] = useState<ISongInfo>()


  const [innerAudioContext] = useState(() => Taro.createInnerAudioContext())
  innerAudioContext.autoplay = true
  innerAudioContext.onPlay(() => {
    Toast(`${songInfo?.musicName}`)
    setPlay(true)
  })
  innerAudioContext.onError((res) => {
    console.log(res.errMsg)
    Toast(res.errMsg)
  })
  innerAudioContext.onTimeUpdate(() => {
    console.log('当前', innerAudioContext.currentTime);
    setWaiting(false)
    !drag && setCurrentTime(innerAudioContext.currentTime)
  })
  innerAudioContext.onSeeked(() => {
  })
  innerAudioContext.onEnded(() => {
    console.log('结束');
    setCurrentTime(0)
    innerAudioContext.pause()
    setPlay(false)
    // if(global.playMode===PlayMode.One){
    //   Toast('单曲循环');
    //   innerAudioContext.play()
    //   setPlay(true)
    // }
  })
  innerAudioContext.onWaiting(() => {
    console.log('onWaiting');
    setWaiting(true)
  })

  const seekPlay = (time) => {
    innerAudioContext.pause()
    innerAudioContext.seek(time)
    setTimeout(() => {
      isPlay && innerAudioContext.play()
    }, 100);
  }
  const [currentTime, setCurrentTime] = useState(0)
  const [lrcVisible, { toggle: toggleLrcVisible }] = useToggle(false)
  const [drag, setIsDrag] = useState(false)

  const handlePlay = () => {
    isPlay ? innerAudioContext.pause() : innerAudioContext.play()
    setPlay(!isPlay)
    setTimeout(() => {
      console.log(innerAudioContext.duration)
    }, 100)
  }
  /**长按预览 */
  const handleLongPress = (url?: string) => {
    Taro.previewImage({
      current: url, // 当前显示图片的http链接
      urls: [url!] // 需要预览的图片http链接列表
    })

  }
  const handleChange = (e) => {
    setCurrentTime(e.detail.value)
    setIsDrag(false)
    seekPlay(e.detail.value)
  }
  const handleChanging = (e) => {
    setIsDrag(true)
    setCurrentTime(e.detail.value)
  }
  const handleChangePlayMode = () => {
    switch (global.playMode) {
      case PlayMode.Loop:
        global.setPlayMode(PlayMode.One)
        Toast('单曲循环')
        break;
      case PlayMode.One:
        global.setPlayMode(PlayMode.Shuffle)
        Toast('随机播放')
        break;
      case PlayMode.Shuffle:
        global.setPlayMode(PlayMode.Loop)
        Toast('循环播放')
        break;
      default:
        break;
    }
    Taro.setStorageSync(CloudCache.SEARCH_HISTORY, global.playMode)
  }


  useEffect(() => {
    if (songInfo?.musicUrl) {
      innerAudioContext.src = songInfo?.musicUrl
      Taro.setNavigationBarTitle({ title: songInfo?.musicName || '' })
    }
  }, [songInfo])

  useEffect(() => {
    return () => innerAudioContext.destroy()
  }, [])
  const getSongInfo = async (id: string) => {
    const [res1, res2, res3] = await Promise.all([songDetails(id), songUrl(id), songlyric(id)])
    if (res1.err || res2.err || res3.err) return Toast('播放失败！')
    const durationTime = (res1.res?.songs[0].dt || 0) / 1000
    const singerName = res1.res?.songs[0].al.name
    const singerImg = res1.res?.songs[0].al.picUrl
    const musicTitle = res1.res?.songs[0].alia[0]
    const musicName = res1.res?.songs[0].name
    const musicUrl = res2.res?.data[0].url
    const lrc = res3.res?.lrc.lyric
    setSongInfo({
      musicName,
      musicUrl,
      musicTitle,
      singerImg,
      singerName,
      durationTime,
      lrc
    })
  }
  useEffect(() => {
    getSongInfo(id)
  }, [])

  return (
    <View className={styles.song}>
      <Image
        mode='aspectFill'
        src={songInfo?.singerImg!}
        className={classNames(styles.bg_img)}
      />
      {
        lrcVisible ? (
          <View className={styles.lrc_wrapper} onClick={toggleLrcVisible}>
            222
          </View>
        ) : (
          <View className={styles.main} onClick={toggleLrcVisible}>
            <Image src={playTool} className={styles.play_point}
              style={{ transform: `rotate(${!isPlay ? '-20' : 0}deg)` }}
            />
            <View className={classNames(styles.play_panel, { [styles.pause]: !isPlay })}>
              <Image src={playPanel} className={styles.bg_img} />
              <Image
                src={songInfo?.singerImg!}
                className={classNames(styles.coverImgUrl)}
                onLongPress={() => handleLongPress(songInfo?.singerImg)}
              />
            </View>
          </View>
        )
      }

      <View className={styles.custom_audio}>
        <View className={styles.time_line}>
          <View className={styles.time}>{fmtTime(currentTime)}</View>
          <Slider
            blockSize={12}
            max={songInfo?.durationTime}
            blockColor='rgba(255,255,255,0.3)'
            activeColor="#d43c33"
            value={Math.ceil(currentTime)}
            className={styles.slider}
            onChange={handleChange}
            onChanging={handleChanging}
          />
          <View className={styles.time}>{fmtTime(songInfo?.durationTime)}</View>
        </View>

        <View className={styles.play_tool} >
          <Image src={PlayModeImg[global.playMode]} className={styles.icon} onClick={handleChangePlayMode} />
          <Image src={prevImg} className={styles.icon} />
          <Image src={isPlay ? playImg : pauseImg} onClick={handlePlay} className={classNames(styles.icon, styles.play)} />
          <Image src={nextImg} className={styles.icon} />
          <Image src={listImg} className={styles.icon} onClick={undefined} />
        </View>
      </View>
      {/* <Popup
        open={open}
        rounded
        placement="bottom"
        style={{ height: '50%' }}
        onClose={toggleOpen}

      >
        <View>1</View>
      </Popup> */}
    </View>
  )
};

export default observer(Index);
