import fetch from '@/utils/request';

/**获取搜索关键词 */
export const checkMusic = (id: number) => {
  return fetch.get<{ success: boolean, message: string }>(`/check/music?id=${id}`)
}

