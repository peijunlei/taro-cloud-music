declare namespace SearchDefault {
  interface Response {
    code: number;
    message: null;
    data: Data;
  }

  interface Data {
    showKeyword: string;
    realkeyword: string;
    searchType: number;
    action: number;
    alg: string;
    gap: number;
    source: null;
    bizQueryInfo: string;
  }

}