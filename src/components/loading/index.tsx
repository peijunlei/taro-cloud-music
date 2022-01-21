

// @flow 
import { View, Image } from '@tarojs/components';
import * as React from 'react';
import loadingImg from '@/assets/loading/circle.gif'

import './index.scss'
import classNames from 'classnames';
type Props = {
  className?: string
};
const Loading = ({ className }: Props) => {
  return (
    <View className="loadingio-spinner-ripple-9w69co50nt8">
      <View className="ldio-fwmb30ibqie">
        <View></View>
        <View></View>
      </View>
    </View>
  );
};
export default Loading;