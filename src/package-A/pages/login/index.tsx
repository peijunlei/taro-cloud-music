import { Button, View, Text } from "@tarojs/components";
import React, { useCallback } from "react";
import styles from './index.module.scss'

const Index = () => {

  return (
    <View className={styles.wrapper}>
      <Text>搜索歌曲</Text>
    </View>
  );
};

export default Index;
