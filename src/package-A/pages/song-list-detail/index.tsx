import React, { CSSProperties, FC, useEffect, useRef } from "react";
import { Button, View, Text, Image } from "@tarojs/components";
import { Play, ShareOutlined, PlayCircleOutlined } from '@taroify/icons';
import VirtualList from '@tarojs/components/virtual-list'
import styles from './index.module.scss'
import classnames from "classnames";
import useData from "./useData";
import CButton from "@/components/c-button";
import { playCountAddUnit } from "@/utils/common";
import SizeBox from "@/components/size-box";
import { useVirtualList } from "ahooks";
import CScrollvView from "@/components/c-scroll-view";
import ListItem from "./components/list-item/list-item";
import { pxTransform } from "@tarojs/taro";
import { Empty } from "@taroify/core";
import Loading from "@/components/loading";
import EmptyError from "@/components/empty";


const BgColor = {
  "S": 'pink'
}

const SongListDetail = () => {
  const { data, loading, error } = useData()
  if (!loading && !data) {
    return (
      <EmptyError />
    )
  }
  return (
    loading ? <Loading /> :
      data && <View
        className={styles.song_list__detail}
        style={{
          backgroundImage: `url(${data.coverImgUrl})`,
        }}
      >
        <View className={styles.info_wrapper}>
          <View className={styles.container}>
            <View className={styles.info}>
              <View className={styles.info_left}>
                <Image src={data.coverImgUrl} className={styles.coverImg} />
                <CButton
                  className={styles.playCount}
                  type='play'
                  title={playCountAddUnit(data.playCount)}
                  prefix={<Play />}
                />
              </View>
              <View className={styles.info_right}>
                <View className={classnames(styles.name,'taroify-ellipsis')}> {data.name}</View>
                <View className={styles.creator}>
                  <Image src={data.creator.avatarUrl} className={styles.avatarUrl} />
                  <View className={classnames(styles.nickname,'taroify-ellipsis')}> {data.creator.nickname}</View>
                </View>
                <View className={classnames(styles.description, 'taroify-ellipsis--l3')}> {data.description}</View>
              </View>
            </View>
            <View className={styles.share}>
              <ShareOutlined />
              <Text>分享给微信好友</Text>
            </View>
          </View>
        </View>
        <View className={styles.list}>
          <View className={styles.header}>
            <PlayCircleOutlined size={20} style={{ width: pxTransform(60) }} />
            {/* <SizeBox width={20} /> */}
            <Text>播放全部</Text>
            <Text className={styles.grey}>{`(共${data.trackCount}首)`}</Text>
          </View>
          {/* <CScrollvView
            className={styles.virtual_list}
            list={data.tracks}
            renderItem={(item, index) => <ListItem
              key={index}
              data={item}
              index={index}
              onPlay={() => { }}
            />}
          /> */}
          <View className={styles.virtual_list}>
            {
              data.tracks.map((track, index) => <ListItem
                key={index}
                data={track}
                index={index}
                onPlay={() => { }}
              />)
            }
          </View>
        </View>
      </View>
  )
};
interface IRow {
  /** 组件 ID */
  id: string;
  /** 单项的样式，样式必须传入组件的 style 中 */
  style?: CSSProperties;
  /** 组件渲染的数据 */
  data: SongListDetails.Track;
  /** 组件渲染数据的索引 */
  index: number;
  /** 组件是否正在滚动，当 useIsScrolling 值为 true 时返回布尔值，否则返回 undefined */
  isScrolling?: boolean;
}

const Row = React.memo<IRow>(({ id, index, style, data }) => {
  return (
    <View id={id} className={styles.list_item} style={style}>
      Row {index} : {data.name}
    </View>
  );
})
export default SongListDetail;
