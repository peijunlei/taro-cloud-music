

// @flow 
import * as React from 'react';
import styles from './index.module.scss'
import { Empty } from '@taroify/core';
const EmptyError = () => {
  return (
    <Empty className={styles.error}>
      <Empty.Image src="error" />
      <Empty.Description>加载失败!</Empty.Description>
    </Empty>
  );
};

export default EmptyError;