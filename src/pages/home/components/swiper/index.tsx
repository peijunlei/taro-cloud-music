

// @flow 
import { View, Swiper, SwiperItem, Image } from '@tarojs/components';
import * as React from 'react';
import styles from './index.module.scss'

import banner1 from '@/assets/images/banner1.jpg';
import banner2 from '@/assets/images/banner2.jpg';

type Props = {
  /**banner 数据 */
  list: HomeBanner.Banner[]
  autoplay?: boolean;

};
const CSwiper = (props: Props) => {
  const { list, autoplay } = props;
  return (
    <View>
      <Swiper
        indicatorColor='#fff'
        indicatorActiveColor='#09c'
        circular
        indicatorDots
        autoplay={autoplay}
        skipHiddenItemLayout
        className={styles.swiper}
      >
        {
          list.length > 0 ? list.map((item, index) =>
            <SwiperItem key={index}>
              <View className={styles.imgWraper}>
                <Image src={item.pic} className={styles.img} />
              </View>
            </SwiperItem>
          ) : <SwiperItem>
            <View className={styles.imgWraper} >
              <Image src={banner2} className={styles.img} />
            </View>
          </SwiperItem>
        }
      </Swiper>
    </View>
  );
}
export default CSwiper;