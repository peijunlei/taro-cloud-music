// @flow 
import * as React from 'react';
import { View } from '@tarojs/components';
import { pxTransform } from '@tarojs/taro';

type Props = {
  width?: number;
  height?: number;
};
const SizeBox: React.FC<Props> = ({ width = 0, height = 0 }) => {
  return (
    <View style={{ width: pxTransform(width), height: pxTransform(height) }}>
    </View>
  );
};
export default SizeBox; 