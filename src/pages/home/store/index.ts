

import { makeAutoObservable } from 'mobx';
// import { observable, action, computed } from 'mobx';
class HomeStore {

  constructor() {
    makeAutoObservable(this);
  }
  /**搜索关键词 */
  defaultSearch = '搜索歌曲';
  /**banner 数据 */
  banners = []
  /**推荐歌单 */
  personalizedList = [];
  /**排行榜 */
  toplist=[]
  setBanners(list) {
    this.banners = list
  }
  setDefaultSearch(value: string) {
    this.defaultSearch = value;
  }
  setPersonalizedList(list) {
    this.personalizedList = list
  }
  setToplist(list) {
    this.toplist = list
  }



}
export default HomeStore;
