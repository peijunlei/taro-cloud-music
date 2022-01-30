import React, { CSSProperties } from "react";
import { View, Text, Image } from "@tarojs/components";
import { Play, ShareOutlined, PlayCircleOutlined } from '@taroify/icons';
import styles from './index.module.scss'
import classnames from "classnames";
import useData from "./useData";
import CButton from "@/components/c-button";
import { playCountAddUnit } from "@/utils/common";
import { useToggle, useVirtualList } from "ahooks";
import CScrollvView from "@/components/c-scroll-view";
import ListItem from "./components/list-item/list-item";
import Taro, { pxTransform, navigateTo } from "@tarojs/taro";
import { ShareSheet } from "@taroify/core";
import Loading from "@/components/loading";
import EmptyError from "@/components/empty";
import { checkMusic } from "@/web-api";
import { useToast } from "taro-hooks";


const BasicShareSheet = ({ open, toggle }) => {
  const handleSelect = (e) => {
    toggle()
    console.log(e);

  }
  return (
    <ShareSheet open={open} onSelect={handleSelect} onClose={toggle} onCancel={toggle}>
      <ShareSheet.Header title="立即分享给好友" />
      <ShareSheet.Options>
        <ShareSheet.Option icon="wechat" name="微信" openType="share" />
        <ShareSheet.Option icon="wechat-moments" name="朋友圈" />
        <ShareSheet.Option icon="poster" name="分享海报" />
        <ShareSheet.Option icon="weapp-qrcode" name="小程序码" />
      </ShareSheet.Options>
      <ShareSheet.Button type="cancel">取消</ShareSheet.Button>
    </ShareSheet>
  )
}

const SongListDetail = () => {
  const { data, loading, error } = useData()
  const [open, { toggle }] = useToggle(false)
  const [show] = useToast({
    mask: true,
    icon: 'none',
  });
  const handlePlay = async (id: number) => {

    const { err, res } = await checkMusic(id)
    if (!err && !!res) {
      if (res.success) {
        navigateTo({ url: `/package-A/pages/song/index?id=${id}` })
      } else {
        show({ title: res.message })
        return
      }
    }
  }
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
                <View className={classnames(styles.name, 'taroify-ellipsis')}> {data.name}</View>
                <View className={styles.creator}>
                  <Image src={data.creator.avatarUrl} className={styles.avatarUrl} />
                  <View className={classnames(styles.nickname, 'taroify-ellipsis')}> {data.creator.nickname}</View>
                </View>
                <View className={classnames(styles.description, 'taroify-ellipsis--l3')}> {data.description}</View>
              </View>
            </View>
            <View className={styles.share} onClick={toggle}>
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
            <Text className={styles.grey}>{`(共${data.tracks.length}首)`}</Text>
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
                onPlay={() => handlePlay(track.id)}
              />)
            }
          </View>
        </View>
        < BasicShareSheet open={open} toggle={toggle} />
      </View>
  )
};
export default SongListDetail;
