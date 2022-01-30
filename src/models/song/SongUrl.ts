declare namespace SongUrl{
  export interface Response {
    data: Datum[];
    code: number;
}

export interface Datum {
    id:                     number;
    url:                    string;
    br:                     number;
    size:                   number;
    md5:                    string;
    code:                   number;
    expi:                   number;
    type:                   string;
    gain:                   number;
    fee:                    number;
    uf:                     null;
    payed:                  number;
    flag:                   number;
    canExtend:              boolean;
    freeTrialInfo:          null;
    level:                  string;
    encodeType:             string;
    freeTrialPrivilege:     FreeTrialPrivilege;
    freeTimeTrialPrivilege: FreeTimeTrialPrivilege;
    urlSource:              number;
}

export interface FreeTimeTrialPrivilege {
    resConsumable:  boolean;
    userConsumable: boolean;
    type:           number;
    remainTime:     number;
}

export interface FreeTrialPrivilege {
    resConsumable:  boolean;
    userConsumable: boolean;
    listenType:     null;
}

}