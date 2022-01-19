declare namespace SearchList{
  export interface Response {
    result: Result;
    code:   number;
}

export interface Result {
    songs:     Song[];
    songCount: number;
}

export interface Song {
    name:                 string;
    id:                   number;
    pst:                  number;
    t:                    number;
    ar:                   Ar[];
    alia:                 string[];
    pop:                  number;
    st:                   number;
    rt:                   Rt | null;
    fee:                  number;
    v:                    number;
    crbt:                 null;
    cf:                   string;
    al:                   Al;
    dt:                   number;
    h:                    L | null;
    m:                    L | null;
    l:                    L;
    a:                    null;
    cd:                   string;
    no:                   number;
    rtUrl:                null;
    ftype:                number;
    rtUrls:               any[];
    djId:                 number;
    copyright:            number;
    s_id:                 number;
    mark:                 number;
    originCoverType:      number;
    originSongSimpleData: OriginSongSimpleData | null;
    resourceState:        boolean;
    version:              number;
    single:               number;
    noCopyrightRcmd:      null;
    mst:                  number;
    cp:                   number;
    mv:                   number;
    rtype:                number;
    rurl:                 null;
    publishTime:          number;
    tns?:                 string[];
    privilege:            Privilege;
}

export interface Al {
    id:       number;
    name:     string;
    picUrl:   string;
    tns:      any[];
    pic_str?: string;
    pic:      number;
}

export interface Ar {
    id:    number;
    name:  string;
    tns:   any[];
    alias: string[];
    alia?: string[];
}

export interface L {
    br:   number;
    fid:  number;
    size: number;
    vd:   number;
}

export interface OriginSongSimpleData {
    songId:    number;
    name:      string;
    artists:   AlbumMeta[];
    albumMeta: AlbumMeta;
}

export interface AlbumMeta {
    id:   number;
    name: string;
}

export interface Privilege {
    id:                 number;
    fee:                number;
    payed:              number;
    st:                 number;
    pl:                 number;
    dl:                 number;
    sp:                 number;
    cp:                 number;
    subp:               number;
    cs:                 boolean;
    maxbr:              number;
    fl:                 number;
    toast:              boolean;
    flag:               number;
    preSell:            boolean;
    playMaxbr:          number;
    downloadMaxbr:      number;
    rscl:               null;
    freeTrialPrivilege: FreeTrialPrivilege;
    chargeInfoList:     ChargeInfoList[];
}

export interface ChargeInfoList {
    rate:          number;
    chargeUrl:     null;
    chargeMessage: null;
    chargeType:    number;
}

export interface FreeTrialPrivilege {
    resConsumable:  boolean;
    userConsumable: boolean;
}

export enum Rt {
    Empty = "",
    The600902000004240302 = "600902000004240302",
    The600902000009573033 = "600902000009573033",
}

}