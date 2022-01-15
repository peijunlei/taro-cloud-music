

import * as React from 'react';
import { Input, View } from '@tarojs/components';
import { noop } from '@/globalType';
import cn from 'classnames'
import styles from './index.module.scss'

type Props = {
  placeholder?: string;
  disabled?: boolean;
  onClick?: noop;
  autoFocus?: boolean;
  onChange?: (value: string) => void;
  value?: string;
  onBlur?: noop;
  fixed?: boolean;
};
/**
 * 头部搜索
 */
const HeaderSearch = (props: Props) => {
  const { value, fixed = true, placeholder = '搜索歌曲', onBlur, onClick, disabled = false, autoFocus = false, onChange } = props;
  return (
    <View
      className={cn(styles.searchWrapper, { [styles.fixed]: fixed })}
      onClick={disabled ? onClick : undefined}
    >
      <View className='at-icon at-icon-search'></View>
      <Input
        value={value}
        className={styles.ipt}
        type='text'
        disabled={disabled}
        onBlur={onBlur}
        placeholder={placeholder}
        focus={autoFocus}
        onInput={onChange ? (e) => onChange(e.detail.value) : undefined}
      />
    </View>
  );
};
export default HeaderSearch;