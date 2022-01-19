

import { noop } from '@/globalType';
import { View, Text, Image } from '@tarojs/components';
import classNames from 'classnames';
import React from 'react';
import styles from './index.module.scss';
type Props = {
  searchVal: string
  list: SearchSuggestion.AllMatch[];
  onSearch: (value: string) => void;
};
const SuggestionList = ({ list, onSearch, searchVal }: Props) => {

  return (
    <View className={styles.searchSuggestion}>
      <Text className={styles.searchVal} onClick={()=>onSearch(searchVal)}>搜索 "{searchVal}"</Text>
      <View className={styles.list}>
        {
          list.length > 0 && list.map((item, index) =>
            <View
              key={index}
              className={styles.listItem}
              onClick={()=>onSearch(item.keyword)}
            >
              <View className='at-icon at-icon-search'></View>
              <Text className={styles.keyword}>{item.keyword}</Text>
            </View>
          )
        }
      </View>
    </View>
  );
};

export default SuggestionList;