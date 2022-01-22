

// @flow 
import { View, Image } from '@tarojs/components';
import * as React from 'react';
import styles from './index.module.scss'
import banner2 from '@/assets/images/banner2.jpg';
import { Swiper } from '@taroify/core';

type Props = {
  /**banner 数据 */
  list: HomeBanner.Banner[]
  autoplay?: boolean;

};
const CSwiper = (props: Props) => {
  const { list, autoplay } = props;
  const [value, setValue] = React.useState(0)
  return (
    <View>
      {/* <Swiper
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
      </Swiper> */}
      <Swiper  className={styles.swiper} autoplay={2000} >
        {
          list.length > 0 ? list.map((item, index) =>
            <Swiper.Item key={index}>
              <View className={styles.imgWraper}>
                <Image src={item.pic} className={styles.img} />
              </View>
            </Swiper.Item>
          ) : <Swiper.Item>
            <View className={styles.imgWraper} >
              <Image src={banner2} className={styles.img} />
            </View>
          </Swiper.Item>
        }
        {/* <Swiper.Indicator className="custom-indicator">{value + 1}/4</Swiper.Indicator> */}
      </Swiper>
    </View>
  );
}
export default CSwiper;