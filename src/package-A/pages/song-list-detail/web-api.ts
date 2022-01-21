import fetch from '@/utils/request';

/**歌单详情 */
export const songListDetails = (id: string) => {
  return fetch.get<SongListDetails.Response>(`/playlist/detail?id=${id}`)
}

