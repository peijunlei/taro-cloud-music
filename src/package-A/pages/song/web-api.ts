import fetch from '@/utils/request';

/**歌曲详情*/
export const songDetails = (id: string) => {
  return fetch.get<SongDetails.Response>(`/song/detail?ids=${id}`)
}

/**歌曲url*/
export const songUrl = (id: string) => {
  return fetch.get<SongUrl.Response>(`/song/url?id=${id}`)
}

