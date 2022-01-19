declare namespace SearchHot {
  export interface Response {
    code: number;
    data: Datum[];
    message: string;
  }

  export interface Datum {
    searchWord: string;
    score: number;
    content: string;
    source: number;
    iconType: number;
    iconUrl: null | string;
    url: string;
    alg: Alg;
  }

  export enum Alg {
    AlgSearchRecHotqueryBaseHotquery = "alg_search_rec_hotquery_base_hotquery",
    Featured = "featured",
  }

}