

import * as React from 'react';
import { Input, View, Text } from '@tarojs/components';
import { Image } from "@taroify/core"
import { PlayCircleOutlined, PauseCircleOutlined } from "@taroify/icons"

import { noop } from '@/globalType';
import styles from './index.module.scss'
import { FC } from 'react';
import CButton from '../c-button';
import { useToggle } from 'ahooks';

type Props = {
};
/**
 * 头部搜索
 */
const PlayTool: FC<Props> = (props) => {
  const [pause, { toggle }] = useToggle(true);
  return (
    <View
      className={styles.play_tool}
    >
      <Image
        className={styles.img}
        round
        src="https://img.yzcdn.cn/vant/cat.jpeg"
      />
      <View className={styles.song}>
        <Text className={styles.song_name}>雇佣者</Text>
        <Text className={styles.ar}> - {'裴俊磊'}</Text>
      </View>
      <View className={styles.play_btn} onClick={toggle}>
        {pause ? <PauseCircleOutlined size={30} /> : <PlayCircleOutlined size={30}/>}
      </View>
    </View>
  );
};
export default PlayTool;