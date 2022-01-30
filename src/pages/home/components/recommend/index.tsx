

// @flow 
import Taro, { navigateTo } from '@tarojs/taro';

import CButton from '@/components/c-button';
import { playCountAddUnit } from '@/utils/common';
import { Flex, Image } from '@taroify/core';
import { Play } from '@taroify/icons';
import { Photo, PhotoFail } from "@taroify/icons"

import { View, Text } from '@tarojs/components';
import classNames from 'classnames';
import React, { FC } from 'react';
import styles from './index.module.scss'

type Props = {
  list: Personalized.Result[]
};
const Recommend = ({ list }: Props) => {
  return (
    <View className={styles.wrapper}>
      <Flex wrap="wrap" gutter={10}>
        {
          list.length > 0 && list.map((item, index) =>
            <Flex.Item
              span={8}
              key={index}
              onClick={() => navigateTo({ url: `/package-A/pages/song-list-detail/index?id=${item.id}` })}
            >
              <View className={styles.imgWrapper}>
                <CButton
                  type='play'
                  title={playCountAddUnit(item.playCount)}
                  className={styles.playCount}
                  prefix={<Play />}
                />
                <Image src={item.picUrl}
                  className={styles.img}
                  lazyLoad
                  placeholder={<Photo />}
                  fallback={<PhotoFail />}
                />
              </View>
              <View className={classNames('taroify-ellipsis--l2')}>{item.name}</View>
            </Flex.Item>
          )
        }
      </Flex>
    </View>
  );
};

export default Recommend