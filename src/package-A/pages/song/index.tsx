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
import { useStores } from "@/hooks";
import { PlayMode } from "@/store/global";
import { Popup } from "@taroify/core";
import { CloudCache } from "@/constants";
const PlayModeImg = {
  Loop: loopImg,
  One: oneImg,
  Shuffle: shuffleImg
}
const Index = () => {
  const { global } = useStores()
  const { details, paused, bgAudioContext, setPaused, show, coverImgUrl } = useData()
  const [currentTime, setCurrentTime] = useState(0)
  const [precent, setPrecent] = useState(0)
  const [lrcVisible, { toggle: toggleLrcVisible }] = useToggle(false)
  const [open, { toggle: toggleOpen }] = useToggle(false)

  const handlePlay = () => {
    console.log('====================================');
    console.log(paused);
    console.log('====================================');
    if (paused) {
      bgAudioContext.play()
    } else {
      bgAudioContext.pause()
    }
  }
  /**长按预览 */
  const handleLongPress = (url: string) => {
    Taro.previewImage({
      current: url, // 当前显示图片的http链接
      urls: [url] // 需要预览的图片http链接列表
    })

  }
  const handleChange = (e) => {
    bgAudioContext.pause()
    const value = e.detail.value
    setPrecent(value)
    const currentTime = Math.floor((bgAudioContext.duration * value) / 100);
    setCurrentTime(currentTime)
    console.log('====================================');
    console.log('进度', value);
    console.log('====================================');
    bgAudioContext.seek(currentTime);

    setTimeout(() => {
      bgAudioContext.play();
    }, 500);
  }
  const handleChanging = () => {
    if (!bgAudioContext.paused) {
      bgAudioContext.pause()
    }
  }
  useEffect(() => {
    bgAudioContext.onTimeUpdate(() => {
      const currentTime = Math.floor(bgAudioContext.currentTime)
      const precent = Math.floor((bgAudioContext.currentTime * 100 / bgAudioContext.duration) || 0)
      setCurrentTime(currentTime)
      setPrecent(precent)
      console.log('precent', precent + '%');
    })
    bgAudioContext.onError(() => {
      show({ title: '播放失败' })
      console.log('====================================');
      console.log('error');
      console.log('====================================');
    })
    bgAudioContext.onPlay(() => {
      setPaused(false);
    })
    bgAudioContext.onPause(() => {
      setPaused(true);
    })
    bgAudioContext.onEnded(() => {
      bgAudioContext.pause()
      setPaused(true);
    })
  }, [])
  const fmtSecond = (time: number) => {
    let min = 0
    let second = 0
    if (typeof time !== 'number') {
      throw new TypeError('必须是数字类型')
    } else {
      min = Math.floor(time % 3600 / 60) >= 0 ? Math.floor(time % 3600 / 60) : 0;
      second = Math.floor(time % 3600 % 60) >= 0 ? Math.floor(time % 3600 % 60) : 0;
    }
    return `${min}:${second}`
  }
  const handleChangePlayMode = () => {
    switch (global.playMode) {
      case PlayMode.Loop:
        global.setPlayMode(PlayMode.One)
        show({ title: '单曲循环' })
        break;
      case PlayMode.One:
        global.setPlayMode(PlayMode.Shuffle)
        show({ title: '随机播放' })
        break;
      case PlayMode.Shuffle:
        global.setPlayMode(PlayMode.Loop)
        show({ title: '循环播放' })
        break;
      default:
        break;
    }
    /**缓存本地播放模式 */
    Taro.setStorageSync(CloudCache.SEARCH_HISTORY,global.playMode)
  }
  return (
    <View className={styles.song}>
      <Image
        mode='aspectFill'
        src={coverImgUrl}
        className={classNames(styles.bg_img)}
      />
      {
        lrcVisible ? (
          <View className={styles.lrc_wrapper} onClick={toggleLrcVisible}>
            geci
          </View>
        ) : (
          <View className={styles.main} onClick={toggleLrcVisible}>
            <Image src={playTool} className={styles.play_point}
              style={{ transform: `rotate(${paused ? '-20' : 0}deg)` }}
            />
            <View className={classNames(styles.play_panel, { [styles.pause]: paused })}>
              <Image src={playPanel} className={styles.bg_img} />
              <Image
                src={coverImgUrl}
                className={classNames(styles.coverImgUrl)}
                onLongPress={() => handleLongPress(coverImgUrl)}
              />
            </View>
          </View>
        )
      }

      <View className={styles.custom_audio}>
        <View className={styles.time_line}>
          <View className={styles.time}>{fmtSecond(currentTime)}</View>
          <Slider
            blockSize={12}
            blockColor='rgba(255,255,255,0.3)'
            activeColor="#d43c33"
            value={precent}
            className={styles.slider}
            onChange={handleChange}
            onChanging={handleChanging}
          />
          <View className={styles.time}>{fmtSecond((details?.dt || 0) / 1000 || 0)}</View>
        </View>

        <View className={styles.play_tool} >
          <Image src={PlayModeImg[global.playMode]} className={styles.icon} onClick={handleChangePlayMode} />
          <Image src={prevImg} className={styles.icon} />
          <Image src={paused ? pauseImg : playImg} onClick={handlePlay} className={classNames(styles.icon, styles.play)} />
          <Image src={nextImg} className={styles.icon} />
          <Image src={listImg} className={styles.icon} onClick={toggleOpen} />
        </View>
      </View>
      <Popup
        open={open}
        rounded
        placement="bottom"
        style={{ height: '50%' }}
        onClose={toggleOpen}

      >
        <View>1</View>
      </Popup>
    </View>
  )
};

export default observer(Index);
