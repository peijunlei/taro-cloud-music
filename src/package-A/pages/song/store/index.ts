

import { makeAutoObservable } from 'mobx';
// import { observable, action, computed } from 'mobx';
class SearchStore {

  constructor() {
    makeAutoObservable(this);
  }
  /**热搜列表 */
  hotSearchList = [];
  setHotSearch(list) {
    this.hotSearchList = list
  }

  /**搜索建议 */
  searchSuggestionList = [];
  setSearchSuggestionList(list) {
    this.searchSuggestionList = list
  }
  /**搜索结果 */
  searchList = [];
  setSearchList(list) {
    this.searchList = list
  }



}
export default SearchStore;
