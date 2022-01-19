

import * as React from 'react';
import { CommonEventFunction, Input, InputProps, View } from '@tarojs/components';
import { noop } from '@/globalType';
import cn from 'classnames'
import styles from './index.module.scss'
import { Search } from '@taroify/icons';

type Props = {
  placeholder?: string;
  disabled?: boolean;
  onClick?: noop;
  autoFocus?: boolean;
  onChange?: (value: string) => void;
  value?: string;
  onConfirm?: (value: string) => void;
  fixed?: boolean;
  onFocus?: (value: string) => void;
};
/**
 * 头部搜索
 */
const HeaderSearch = (props: Props) => {
  const { value, fixed = true, placeholder = '搜索歌曲', onConfirm, onClick, disabled = false, autoFocus = false, onChange, onFocus } = props;
  return (
    <View
      className={cn(styles.searchWrapper, { [styles.fixed]: fixed })}
      onClick={disabled ? onClick : undefined}
    >
      <View className={styles.main}>
        <Search />
        <Input
          value={value}
          className={styles.ipt}
          type='text'
          disabled={disabled}
          onConfirm={onConfirm ? (e) => onConfirm(e.detail.value) : undefined}
          placeholder={placeholder}
          focus={autoFocus}
          onInput={onChange ? (e) => onChange(e.detail.value) : undefined}
          onFocus={onFocus ? (e) => onFocus(e.detail.value) : undefined}
        />
      </View>

    </View>
  );
};
export default HeaderSearch;