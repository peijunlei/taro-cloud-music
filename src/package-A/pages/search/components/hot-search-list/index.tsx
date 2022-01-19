

import { noop } from '@/globalType';
import { View, Text, Image, ScrollView } from '@tarojs/components';
import classNames from 'classnames';
import React from 'react';
import styles from './index.module.scss';
type Props = {
  list: SearchHot.Datum[];
  onSearch: (value: string) => void;
};
const HotSearchList = ({ list, onSearch }: Props) => {
  return (
    <View className={styles.hotSearchList}>
      <View>

      </View>
      <Text className={styles.title}>热搜榜</Text>
      <ScrollView className={styles.list} scrollY>
        {
          list.length > 0 && list.map((item, index) =>
            <View
              key={index}
              className={styles.listItem}
              onClick={()=>onSearch(item.searchWord)}
            >
              <Text className={styles.num}>{index + 1}</Text>
              <View className={styles.info}>
                <View className={styles.searchWord}>
                  <Text className={styles.name}>{item.searchWord}</Text>
                  {item.iconUrl && <Image src={item.iconUrl} className={classNames(styles[`icon-${item.iconType}`], styles.icon)} />}
                </View>
                <Text className={styles.content}>{item.content}</Text>
              </View>
              <View className={styles.score}>{item.score}</View>
            </View>
          )
        }
      </ScrollView>
    </View>
  );
};

export default HotSearchList;