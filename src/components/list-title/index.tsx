

import * as React from 'react';
import { Input, View } from '@tarojs/components';
import { Arrow } from "@taroify/icons"
import { noop } from '@/globalType';
import styles from './index.module.scss'
import { FC } from 'react';
import CButton from '../c-button';

type Props = {
  title: string;
  /**更多点击 */
  moreLink?: noop;
};
/**
 * 头部搜索
 */
const ListTitle: FC<Props> = (props) => {
  const { title, moreLink } = props;
  return (
    <View
      className={styles.listTitle}
    >
      <View className={styles.title}>{title}</View>
      <CButton
        title='更多'
        suffix={<Arrow />}
        moreLink={moreLink}
      />
    </View>
  );
};
export default ListTitle;