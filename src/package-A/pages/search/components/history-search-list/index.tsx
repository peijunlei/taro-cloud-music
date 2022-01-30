

import { noop } from '@/globalType';
import { View, Text, Image, ScrollView } from '@tarojs/components';
import classNames from 'classnames';
import React, { memo } from 'react';
import { DeleteOutlined } from '@taroify/icons'
import styles from './index.module.scss';
import { Flex } from '@taroify/core';
import { useStorage } from 'taro-hooks';
import { CloudCache } from '@/constants';
type Props = {
  onSearch: (value: string) => void;
};
const HistorySearchList = ({ onSearch }: Props) => {
  const [storageInfo, { set, get, remove }] = useStorage();
  const historyList = storageInfo.storage[CloudCache.SEARCH_HISTORY] || []
  console.log('render', historyList);

  return (
    historyList.length > 0 ?<View className={styles.historySearchList}>
      <View className={styles.header}>
        <Text className={styles.title}>历史记录</Text>
        <DeleteOutlined size={16} style={{ color: '#999' }} onClick={() => remove(CloudCache.SEARCH_HISTORY)} />
      </View>
      <Flex gutter={10} className={styles.list} wrap="wrap">
        {
            historyList.reverse().map((item, index) =>
          <Flex.Item >
            <View
              key={index}
              className={styles.listItem}
              onClick={() => onSearch(item)}
            >
              {item}
            </View>
          </Flex.Item>

        )
        }
      </Flex>
    </View>:null
  );
};

export default memo(HistorySearchList);