import HeaderSearch from "@/components/header-search";
import useStores from "@/hooks/useStores";
import { Button, View, Text } from "@tarojs/components";
import { observer } from "mobx-react";
import React, { useCallback, useState } from "react";
import { AtSearchBar } from "taro-ui";
import styles from './index.module.scss'

const Index = () => {
  const { home } = useStores()

  const [value, setValue] = useState(home.defaultSearch)

  const handleSearch=() => {
    console.log(value);
    
  }
  return (
    <View className={styles.wrapper}>
      <HeaderSearch
        placeholder={home.defaultSearch}
        autoFocus
        value={value}
        onChange={(value) =>setValue(value)}
        onBlur={handleSearch}
      />
    </View>
  );
};

export default observer(Index);
