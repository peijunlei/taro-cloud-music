

// @flow 
import { noop } from '@/globalType';
import { ScrollView, ScrollViewProps, Image, View, Text } from '@tarojs/components';
import React, { FC, forwardRef } from 'react'
import loadingImg from '@/assets/loading/loading.gif'
import styles from './index.module.scss'
import classNames from 'classnames';
import empty from '@/assets/images/empty.png'
import { pxTransform } from '@tarojs/taro';
interface CScrollViewProps extends ScrollViewProps {
  /**加载更多中... */
  loadingMore?: boolean;
  list: any[],
  renderItem: (item: any, index: number) => React.ReactElement;
  /** 是否还有数据? */
  noMore?: boolean;
  /**初始化加载中 */
  loading?: boolean;
  /**高度 */
  height?: number;
};
const CScrollvView: FC<CScrollViewProps> = forwardRef((props, ref) => {
  const { noMore, renderItem, loading, list, height = 100,className, ...rest } = props;
  const renderLoading = () => {
    return loading && <Image src={loadingImg} className={styles.loading} />
  }
  const renderEmpty = () => {
    return !loading && list.length === 0 && <Image src={empty} className={styles.empty} />
  }
  const renderLoadMore = () => {
    if (loading || list.length === 0) return null;
    return <View className={styles.load_more}>  {noMore ? "我是有底线的" : " Loading more..."} </View>
  }
  return (
    <ScrollView
      {...rest}
      ref={ref}
      scrollY
      showScrollbar={false}
      enhanced
      className={classNames(styles.scroll_view,className)}
      style={{ height: `calc(100vh - ${pxTransform(height)})` }}
    >
      {renderLoading()}
      {renderEmpty()}
      {
        !loading && list.map((item, index) => renderItem(item, index))
      }
      {renderLoadMore()}
    </ScrollView>
  );
})

export default CScrollvView;