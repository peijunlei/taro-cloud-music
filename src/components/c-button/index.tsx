

import { noop } from '@/globalType';
import { View, Text } from '@tarojs/components';
import classNames from 'classnames';
import React, { FC } from 'react';
import styles from './index.module.scss'

type Props = {
  className?: string;
  prefix?: React.ReactElement;
  suffix?: React.ReactElement;
  title?: string | number;
  type?: 'more' | 'play';
  /**点击更多触发 */
  moreLink?: noop;
};
const CButton: FC<Props> = (
  {
    className = '',
    prefix,
    suffix,
    title = '更多',
    type = 'more',
    moreLink
  }
) => {
  return (
    <View
      className={classNames(styles.btn, styles[type], className)}
      onClick={type === 'more' ? moreLink : undefined}
    >
      {prefix}
      <Text className={styles.title}>{title}</Text>
      {suffix}

    </View>
  );
};

export default CButton;