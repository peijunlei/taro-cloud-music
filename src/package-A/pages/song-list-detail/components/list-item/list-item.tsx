

import { noop } from '@/globalType';
import { View, Text } from '@tarojs/components';
import classnames from 'classnames';
import React, { FC } from 'react';
import { PlayCircleOutlined } from "@taroify/icons"
import styles from './index.module.scss';

interface IItem {
  data: SongListDetails.Track,
  onPlay: noop,
  index: number
}
const ListItem: FC<IItem> = ({ data: item, onPlay, index }) => {
  return (
    <View
      className={styles.listItem}
      onClick={() => onPlay && onPlay()}
    >
      <View className={styles.num}>
        {index + 1}
      </View>
      <View className={styles.info}>
        <View className={styles.wraperName}>
          {item.name}
        </View>
        <View className={styles.ar}>
          <View className='icon icon-sq'></View>
          <View className={styles.arName}>
            <Text>  {item.ar[0].name} - {item.al.name}</Text>
          </View>
        </View>
      </View>
      <View className={styles.icon}>
        <PlayCircleOutlined size={30} style={{ color: "#ccc" }} />
      </View>
    </View>
  )
}

export default ListItem;