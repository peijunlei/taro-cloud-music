declare namespace ToplistDetail {
  export interface Response {
    code: number;
    list: List[];
    artistToplist: ArtistToplist;
    rewardToplist: RewardToplist;
  }

  export interface ArtistToplist {
    coverUrl: string;
    artists: ArtistToplistArtist[];
    name: string;
    upateFrequency: string;
    position: number;
    updateFrequency: string;
  }

  export interface ArtistToplistArtist {
    first: string;
    second: string;
    third: number;
  }

  export interface List {
    subscribers: any[];
    subscribed: null;
    creator: null;
    artists: null;
    tracks: Track[];
    updateFrequency: string;
    backgroundCoverId: number;
    backgroundCoverUrl: null;
    titleImage: number;
    titleImageUrl: null;
    englishTitle: null;
    opRecommend: boolean;
    recommendInfo: null;
    trackNumberUpdateTime: number;
    adType: number;
    subscribedCount: number;
    cloudTrackCount: number;
    userId: number;
    createTime: number;
    highQuality: boolean;
    specialType: number;
    updateTime: number;
    coverImgId: number;
    newImported: boolean;
    anonimous: boolean;
    totalDuration: number;
    trackCount: number;
    coverImgUrl: string;
    commentThreadId: string;
    trackUpdateTime: number;
    privacy: number;
    playCount: number;
    ordered: boolean;
    tags: string[];
    description: null | string;
    status: number;
    name: string;
    id: number;
    coverImgId_str: string;
    ToplistType?: string;
  }

  export interface Track {
    first: string;
    second: string;
  }

  export interface RewardToplist {
    coverUrl: string;
    songs: Song[];
    name: string;
    position: number;
  }

  export interface Song {
    name: string;
    id: number;
    position: number;
    alias: any[];
    status: number;
    fee: number;
    copyrightId: number;
    disc: string;
    no: number;
    artists: AlbumArtist[];
    album: Album;
    starred: boolean;
    popularity: number;
    score: number;
    starredNum: number;
    duration: number;
    playedNum: number;
    dayPlays: number;
    hearTime: number;
    ringtone: null | string;
    crbt: null;
    audition: null;
    copyFrom: string;
    commentThreadId: string;
    rtUrl: null;
    ftype: number;
    rtUrls: any[];
    copyright: number;
    transName: null;
    sign: null;
    mark: number;
    originCoverType: number;
    originSongSimpleData: null;
    single: number;
    noCopyrightRcmd: null;
    mvid: number;
    bMusic: Music;
    mp3Url: null;
    rtype: number;
    rurl: null;
    hMusic: Music;
    mMusic: Music;
    lMusic: Music;
  }

  export interface Album {
    name: string;
    id: number;
    type: string;
    size: number;
    picId: number;
    blurPicUrl: string;
    companyId: number;
    pic: number;
    picUrl: string;
    publishTime: number;
    description: string;
    tags: string;
    company: null | string;
    briefDesc: string;
    artist: AlbumArtist;
    songs: any[];
    alias: any[];
    status: number;
    copyrightId: number;
    commentThreadId: string;
    artists: AlbumArtist[];
    subType: string;
    transName: null;
    onSale: boolean;
    mark: number;
    picId_str: string;
  }

  export interface AlbumArtist {
    name: string;
    id: number;
    picId: number;
    img1v1Id: number;
    briefDesc: string;
    picUrl: string;
    img1v1Url: string;
    albumSize: number;
    alias: any[];
    trans: string;
    musicSize: number;
    topicPerson: number;
  }

  export interface Music {
    name: null;
    id: number;
    size: number;
    extension: Extension;
    sr: number;
    dfsId: number;
    bitrate: number;
    playTime: number;
    volumeDelta: number;
  }

  export enum Extension {
    Mp3 = "mp3",
  }

}