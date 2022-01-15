

// @flow 
import CButton from '@/components/c-button';
import { playCountAddUnit } from '@/utils/common';
import { View, Image, Text } from '@tarojs/components';
import classNames from 'classnames';
import React, { FC } from 'react';
import styles from './index.module.scss'

type Props = {
  list: ToplistDetail.List[]
};
const TopList = ({ list }: Props) => {
  return (
    <View className={styles.list}>
      {
        list.length > 0 && list.map((item, index) =>
          
          item.tracks.length > 0 && <View className={styles.item} key={index}>
            <View className={styles.imgWrapper}>
              <Image src={item.coverImgUrl} className={styles.img} />
              <Text className={styles.updateFrequency}>{item.updateFrequency}</Text>
            </View>
            <View className={styles.track}>
              {
                item.tracks && item.tracks.map((track, index) =>
                  <Text className={styles.trackItem} key={index}>{index + 1 + '.' + track.first + '-' + track.second}</Text>
                )
              }
            </View>
          </View>
        )
      }
    </View>
  );
};

export default TopList