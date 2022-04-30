import fetch from '@/utils/request';

/**歌曲详情*/
export const songDetails = (id: string) => {
  return fetch.get<SongDetails.Response>(`/song/detail?ids=${id}`)
}

/**歌曲url*/
export const songUrl = (id: string) => {
  return fetch.get<SongUrl.Response>(`/song/url?id=${id}`)
}
/**歌词lyric*/
export const songlyric = (id: string) => {
  return fetch.get<SongLrc.Response>(`/lyric?id=${id}`)
}

