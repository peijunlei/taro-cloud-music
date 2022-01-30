

import { noop } from '@/globalType';
import { View, Text } from '@tarojs/components';
import classnames from 'classnames';
import React, { FC } from 'react';
import { PlayCircleOutlined } from "@taroify/icons"
import styles from './index.module.scss';
import { Image } from "@taroify/core"
import { Photo, PhotoFail } from "@taroify/icons"
interface IItem {
  data: SongListDetails.Track,
  onPlay: noop,
  index: number
}

const getArName = (ars: SongListDetails.Ar[]) => {
  return ars && ars.map(v => v.name).join('/')
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

        <Image
          src={item.al.picUrl}
          className={styles.al_img}
          lazyLoad
          placeholder={<Photo />}
          fallback={<PhotoFail />}
        />
        <View className={styles.info_info}>
          <View className={styles.wraperName}>
            {item.name}
          </View>
          <View className={styles.ar}>
            <View className='icon icon-sq'></View>
            <View className={styles.arName}>
              <Text>  {getArName(item.ar)} - {item.al.name}</Text>
            </View>
          </View>
        </View>

      </View>
      <PlayCircleOutlined size={30} style={{ color: "#ccc" }} />
    </View>
  )
}

export default ListItem;