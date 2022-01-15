import fetch from '@/utils/request';

/**获取搜索关键词 */
export const searchDefault = () => {
  return fetch.get<SearchDefault.Response>('/search/default')
}

/**获取首页banner */
export const homeBanner = (type = 2) => {
  return fetch.get<HomeBanner.Response>(`/banner?type=${type}`)
}
/**获取推荐歌单 */
export const personalized = () => {
  return fetch.get<Personalized.Response>('/personalized',{limit:6})
}
/**榜单列表 */
export const toplistDetail = () => {
  return fetch.get<ToplistDetail.Response>('/toplist/detail')
}