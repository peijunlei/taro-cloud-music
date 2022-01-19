declare namespace SearchSuggestion {
  export interface Response {
    result: Result;
    code: number;
  }

  export interface Result {
    allMatch?: AllMatch[];
  }

  export interface AllMatch {
    keyword: string;
    type: number;
    alg: string;
    lastKeyword: string;
    feature: string;
  }

}