import { Button, View, Text, Image, Slider } from "@tarojs/components";
import { useMount, useToggle, useUnmount } from "ahooks";
import classNames from "classnames";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import styles from './index.module.scss'
import useData from "./useData";
import pauseImg from '@/assets/play_tool/play_pause.png';
import playImg from '@/assets/play_tool/play_play.png';
import prevImg from '@/assets/play_tool/play_prev.png';
import nextImg from '@/assets/play_tool/play_next.png';
import playTool from '@/assets/images/song/play_tool.png';
import playPanel from '@/assets/images/song/play_panel.png';
import Taro from "@tarojs/taro";
import { useToast } from "taro-hooks";
const Index = () => {
  const { details, paused, bgAudioContext, setPaused, show, coverImgUrl } = useData()

  const [currentTime, setCurrentTime] = useState(0)
  const [precent, setPrecent] = useState(0)

  const handlePlay = () => {
    if (paused) {
      bgAudioContext.play()
    } else {
      bgAudioContext.pause()
    }
  }
  const handleLongPress = (url: string) => {
    Taro.previewImage({
      current: url, // 当前显示图片的http链接
      urls: [url] // 需要预览的图片http链接列表
    })

  }
  const handleChange = (e) => {
    bgAudioContext.pause()

    const value = e.detail.value
    const dt = details?.dt || 0
    const currentTime = Math.floor(((dt / 1000) * value) / 100);
    setCurrentTime(currentTime)
    setPrecent(value)
    bgAudioContext.seek(currentTime);
    bgAudioContext.play();
  }
  const handleChanging = (e) => {
    if (!bgAudioContext.paused) {
      bgAudioContext.pause()
    }
  }
  useEffect(() => {
    bgAudioContext.onTimeUpdate(() => {
      const currentTime = Math.floor(bgAudioContext.currentTime)
      const precent = Math.floor((bgAudioContext.currentTime * 1000) / (details?.dt || 0))
      setCurrentTime(currentTime)
      setPrecent(precent)
      console.log('onTimeUpdate', bgAudioContext.currentTime);
    })
    bgAudioContext.onError(() => {
      show({ title: '播放失败' })
      console.log('====================================');
      console.log('error');
      console.log('====================================');
    })
    bgAudioContext.onPlay(() => {
      setPaused(false);
      console.log('====================================');
      console.log('onPlay',precent);
      console.log('====================================');
    })
    bgAudioContext.onPause(() => {
      setPaused(true);
      console.log('====================================');
      console.log('onPause',precent);
      console.log('====================================');
    })
  }, [details?.dt])
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
  return (
    <View className={styles.song}>
      <View className={styles.main}>
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

      <View className={styles.custom_audio}>
        <View className={styles.time_line}>
          <View className={styles.time}>{fmtSecond(currentTime)}</View>
          <Slider
            blockSize={15}
            activeColor="#d43c33"
            value={precent}
            className={styles.slider}
            onChange={handleChange}
            onChanging={handleChanging}
          />
          <View className={styles.time}>{fmtSecond((details?.dt || 0) / 1000 || 0)}</View>
        </View>

        <View className={styles.play_tool} >
          <View className={styles.play_prev}>
            <Image src={prevImg} className={styles.icon} />
          </View>
          <View className={classNames(styles.play_pause)} onClick={handlePlay}>
            <Image src={paused ? pauseImg : playImg} className={classNames(styles.icon, styles.play)} />
          </View>
          <View className={styles.play_next}>
            <Image src={nextImg} className={styles.icon} />
          </View>
        </View>
      </View>

    </View>
  )
};

export default Index;
