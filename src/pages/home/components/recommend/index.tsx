

// @flow 
import CButton from '@/components/c-button';
import { playCountAddUnit } from '@/utils/common';
import { View, Image, Text } from '@tarojs/components';
import classNames from 'classnames';
import React, { FC } from 'react';
import styles from './index.module.scss'

type Props = {
  list: Personalized.Result[]
};
const Recommend = ({ list }: Props) => {
  return (
    <View className={styles.wrapper}>
      <View className='at-row at-row--wrap'>
        {
          list.length > 0 && list.map((item, index) =>
            <View className='at-col at-col-4' key={index}>
              <View className={styles.imgWrapper}>
                <CButton
                  type='play'
                  title={playCountAddUnit(item.playCount)}
                  className={styles.playCount}
                  prefix={<View className='at-icon at-icon-play'></View>}
                />
                <Image src={item.picUrl} className={styles.img} />
              </View>
              <View className={styles.name}>{item.name}</View>
            </View>
          )
        }
      </View>
    </View>
  );
};

export default Recommend