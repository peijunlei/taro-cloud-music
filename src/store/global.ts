

import { CloudCache } from '@/constants';
import Taro from '@tarojs/taro';
import { makeAutoObservable } from 'mobx';
export enum PlayMode {
  Loop = 'Loop',
  One = "One",
  Shuffle = "Shuffle",
}
class Global {
  constructor() {
    makeAutoObservable(this);
  }
  /**播放模式 */
  playMode = Taro.getStorageSync(CloudCache.SEARCH_HISTORY) as PlayMode || PlayMode.One
  setPlayMode(mode: PlayMode) {
    this.playMode = mode;
  }


}
export default Global;
