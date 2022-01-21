

import { noop } from '@/globalType';
import { View, Text } from '@tarojs/components';
import classnames from 'classnames';
import React, { FC } from 'react';
import { PlayCircleOutlined } from "@taroify/icons"

import styles from './index.module.scss';
/**文字高亮 */
const getHighlightValue = (value: string, highlightValue?: string) => {
  if (!value || !highlightValue || !value.includes(highlightValue))
    return <Text className={styles.name} >{value}</Text>
  const arr = value.replace(new RegExp(highlightValue, 'g'), `%%${highlightValue}%%`).split('%%');
  return arr.filter(v => v).map((v, i) => {
    return <Text className={classnames(styles.name, { [styles.highlight]: v === highlightValue })} key={i}>{v}</Text>
  })
}

interface IItem {
  data: SearchList.Song,
  onPlay: noop,
  searchVal?: string;
}
const ListItem: FC<IItem> = ({ data: item, onPlay, searchVal }) => {
  return (
    <View
      className={styles.listItem}
      onClick={() => onPlay && onPlay()}
    >
      <View className={styles.info}>
        <View className={styles.wraperName}>
          {getHighlightValue(item.name, searchVal)}
        </View>
        <View className={styles.ar}>
          <View className='icon icon-sq'></View>
          <View className={styles.arName}>
            <Text>  {item.ar[0].name} - </Text>
            {getHighlightValue(item.al.name, searchVal)}
          </View>
        </View>
      </View>
      <PlayCircleOutlined size={30} style={{ color: "#ccc" }} />
    </View>
  )
}

export default ListItem;