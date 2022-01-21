import fetch from '@/utils/request';
import { ISearch } from './type';

/**热搜列表 */
export const searchHot = () => {
  return fetch.get<SearchHot.Response>('/search/hot/detail')
}

/**搜索建议列表 */
export const searchSuggestion = (keywords: string, { type = 'mobile' } = {}) => {
  return fetch.get<SearchSuggestion.Response>('/search/suggest', { keywords, type })
}

/**搜索结果列表 */
export const searchList =async ({ keywords, offset, limit}: ISearch) => {
  await new Promise((resolve, reject) => {setTimeout(resolve,500)})
  return (fetch.get<SearchList.Response>('/cloudsearch', { keywords, limit, offset }));

}