
import React from 'react';

import Taro, { Component, ComponentClass } from '@tarojs/taro'

import { View, Image, Text } from "@tarojs/components";


import './index.scss'

import iconPaused from '@/assets/play_tool/play_pause.png';

import iconPlaying from '@/assets/play_tool/play_play.png'

import iconLoading from '@/assets/loading/circle.gif'
import { Slider } from '@taroify/core';

type PageStateProps = {

}

type PageDispatchProps = {

}

type PageOwnProps = {

  audioSrc: string

}

type PageState = {}

type IProps = PageStateProps & PageDispatchProps & PageOwnProps

interface CustomAudio {

  props: IProps

}

interface StateInterface {

  audioCtx: Taro.InnerAudioContext

  audioImg: string

  currentTime: number

  duration: number
  progress: number

}

class CustomAudio extends React.Component<{}, StateInterface> {

  constructor(props) {
    super(props)
    this.fmtSecond = this.fmtSecond.bind(this)
    this.state = {
      audioCtx: Taro.createInnerAudioContext(),
      audioImg: iconLoading,
      currentTime: 0,
      duration: 0,
      progress: 0
    }

  }

  componentWillMount() {

    const {
      audioCtx,
      audioImg
    } = this.state
    audioCtx.src = this.props.audioSrc
    // 当播放的时候通过TimeUpdate的回调去更改当前播放时长和总时长（总时长更新放到onCanplay回调中会出错）
    audioCtx.onTimeUpdate(() => {
      const currentTime = Math.floor(audioCtx.currentTime)
      const tempDuration = Math.ceil(audioCtx.duration)


      const progress = parseFloat(((currentTime / tempDuration) * 100).toFixed(1))
      console.log('====================================');
      console.log(currentTime, tempDuration, (progress));
      console.log('====================================');
      this.setState({
        currentTime,
        progress
      })



    })

    // 当音频可以播放就将状态从loading变为可播放
    audioCtx.onCanplay(() => {
      const tempDuration = Math.ceil(audioCtx.duration)
      this.setState({
        duration: tempDuration
      })
      if (audioImg === iconLoading) {
        this.setAudioImg(iconPaused)
      }
    })

    // 当音频在缓冲时改变状态为加载中
    audioCtx.onWaiting(() => {

      if (audioImg !== iconLoading) {
        this.setAudioImg(iconLoading)
      }
    })

    audioCtx.onPlay(() => {
      console.log('onPlay')
      this.setAudioImg(iconPlaying)
    })
    // 暂停后更改图标状态为暂停
    audioCtx.onPause(() => {
      console.log('onPause')
      this.setAudioImg(iconPaused)
    })
    // 播放结束后更改图标状态
    audioCtx.onEnded(() => {
      console.log('onEnded')
      this.setAudioImg(iconPaused)
    })
    // 音频加载失败时 抛出异常
    audioCtx.onError((e) => {
      Taro.showToast({
        title: '音频加载失败',
        icon: 'none'
      })
    })

  }
  componentWillReceiveProps(nextProps) {
    //新的值进来
    const newSrc = nextProps.audioSrc || ''
    if (this.props.audioSrc !== newSrc && newSrc !== '') {
      const audioCtx = this.state.audioCtx
      if (!audioCtx.paused) { // 如果还在播放中，先进行停止播放操作
        audioCtx.stop()
      }
      audioCtx.src = nextProps.audioSrc
      // 重置当前播放时间和总时长
      this.setState({
        currentTime: 0,
        duration: 0,
      })
    }
  }

  componentWillUnmount() {
    this.state.audioCtx.stop()
    this.state.audioCtx.destroy()
  }
  setAudioImg(newImg: string) {
    this.setState({
      audioImg: newImg
    })
  }

  playOrStopAudio() {
    const audioCtx = this.state.audioCtx
    audioCtx.paused ? audioCtx.play() : audioCtx.pause()
  }
  fmtSecond(time: number) {
    let hour = 0
    let min = 0
    let second = 0
    if (typeof time !== 'number') {
      throw new TypeError('必须是数字类型')
    } else {
      hour = Math.floor(time / 3600) >= 0 ? Math.floor(time / 3600) : 0;
      min = Math.floor(time % 3600 / 60) >= 0 ? Math.floor(time % 3600 / 60) : 0;
      second = Math.floor(time % 3600 % 60) >= 0 ? Math.floor(time % 3600 % 60) : 0;
    }
    return `${hour}:${min}:${second}`
  }
  handleChange = (e) => {
    // console.log(e);
    // this.state.audioCtx.stop()
    // const currentTime = (e / 100) * this.state.duration
    // console.log(currentTime);
    // this.setState({ progress: e, currentTime }, () => {
    //   this.state.audioCtx.startTime = currentTime
    //   this.state.audioCtx.play()
    //   console.log('====================================');
    //   console.log('====================================');
    // })
  }
  render() {
    const {
      audioImg,
      currentTime,
      duration,
      progress
    } = this.state
    return (
      <View className='custom-audio'>
        <Image onClick={() => this.playOrStopAudio()} src={audioImg} className='audio-btn' />
        <Slider value={progress} className="slider" onChange={this.handleChange} step={0.1}>
          <Slider.Thumb>
            <View className="custom-thumb" />
          </Slider.Thumb>
        </Slider>
        <Text>{this.fmtSecond(Math.floor(currentTime))}/{this.fmtSecond(Math.floor(duration))}</Text>
      </View>
    )

  }

}

export default CustomAudio 
