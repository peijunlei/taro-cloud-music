declare namespace HomeBanner {
  export interface Response {
    banners: Banner[];
    code: number;
  }

  export interface Banner {
    pic: string;
    targetId: number;
    adid: null;
    targetType: number;
    titleColor: TitleColor;
    typeTitle: string;
    url: null | string;
    adurlV2: null;
    exclusive: boolean;
    monitorImpress: null;
    monitorClick: null;
    monitorType: null;
    monitorImpressList: any[];
    monitorClickList: any[];
    monitorBlackList: null;
    extMonitor: null;
    extMonitorInfo: null;
    adSource: null;
    adLocation: null;
    encodeId: string;
    program: null;
    event: null;
    video: null;
    dynamicVideoData: null;
    song: Song | null;
    bannerId: string;
    alg: null;
    scm: string;
    requestId: string;
    showAdTag: boolean;
    pid: null;
    showContext: null;
    adDispatchJson: null;
  }

  export interface Song {
    name: string;
    id: number;
    pst: number;
    t: number;
    ar: Ar[];
    alia: string[];
    pop: number;
    st: number;
    rt: string;
    fee: number;
    v: number;
    crbt: null;
    cf: string;
    al: Al;
    dt: number;
    h: H;
    m: H;
    l: H;
    a: null;
    cd: string;
    no: number;
    rtUrl: null;
    ftype: number;
    rtUrls: any[];
    djId: number;
    copyright: number;
    s_id: number;
    mark: number;
    originCoverType: number;
    originSongSimpleData: null;
    single: number;
    noCopyrightRcmd: null;
    mst: number;
    cp: number;
    mv: number;
    rtype: number;
    rurl: null;
    publishTime: number;
    privilege: Privilege;
  }

  export interface Al {
    id: number;
    name: string;
    picUrl: string;
    tns: any[];
    pic_str: string;
    pic: number;
  }

  export interface Ar {
    id: number;
    name: string;
    tns: any[];
    alias: any[];
  }

  export interface H {
    br: number;
    fid: number;
    size: number;
    vd: number;
  }

  export interface Privilege {
    id: number;
    fee: number;
    payed: number;
    st: number;
    pl: number;
    dl: number;
    sp: number;
    cp: number;
    subp: number;
    cs: boolean;
    maxbr: number;
    fl: number;
    toast: boolean;
    flag: number;
    preSell: boolean;
    playMaxbr: number;
    downloadMaxbr: number;
    rscl: null;
    freeTrialPrivilege: FreeTrialPrivilege;
    chargeInfoList: ChargeInfoList[];
  }

  export interface ChargeInfoList {
    rate: number;
    chargeUrl: null;
    chargeMessage: null;
    chargeType: number;
  }

  export interface FreeTrialPrivilege {
    resConsumable: boolean;
    userConsumable: boolean;
  }

  export enum TitleColor {
    Blue = "blue",
    Red = "red",
  }


}

