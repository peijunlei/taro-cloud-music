
declare namespace Personalized {
  interface Response {
    hasTaste: boolean;
    code: number;
    category: number;
    result: Result[];
  }
  interface Result {
    id: number;
    type: number;
    name: string;
    copywriter: string;
    picUrl: string;
    canDislike: boolean;
    trackNumberUpdateTime: number;
    playCount: number;
    trackCount: number;
    highQuality: boolean;
    alg: string;
  }
}

