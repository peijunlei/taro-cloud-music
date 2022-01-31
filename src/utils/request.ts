import Taro from '@tarojs/taro';
import { CloudCache } from '@/constants';

class HttpRequest {
  /**baseUrl */
  private baseUrl = 'http://192.168.0.103:3001';
  /** token */
  private token?: string;
  /** 请求地址 */
  private host: string;
  /** 重定向到登录页面计数器,用于屏蔽多次重定向 */
  private redirectCount = 0;
  /** 公共headers */
  private commonHeaders: TaroGeneral.IAnyObject = {
    'Content-Type': 'application/json',
  };

  constructor(options?: HttpRequestOptions) {
    this.token = Taro.getStorageSync(CloudCache.TOKEN) || '';
    this.host = options?.host || this.baseUrl;
  }

  /**
   * core request
   * @param options
   */
  private async baseRequest<T>(
    options: RequestBaseOptions,
  ): Promise<ErrorWrap<T>> {
    const { hideError } = options;
    const ReqOptions = this.generateOptions(options);

    try {
      console.log('Request');
      const res = await Taro.request<T>(ReqOptions);
      // 处理错误状态码
      this.analyzeStatusCode(res.statusCode);
      // 处理响应码
      return { res: res.data };
    } catch (error) {
      if (!hideError) {
        console.log('Request options ===> ', ReqOptions);
        console.log('Response Error ===> ', error);
      }
      // 处理微信api报错情况
      error.message = error.message || error.errMsg;
      return { err: error };
    }
  }

  /**
   * 处理错误状态码
   * @param statusCode
   */
  private analyzeStatusCode(statusCode: number) {
    switch (statusCode) {
      case 500:
        throw new Error('服务器遇到错误，无法完成请求');
      case 501:
        throw new Error('服务器不具备完成请求的功能');
      case 502:
        throw new Error('网关错误');
      case 503:
        throw new Error('服务器维护，暂时无法使用');
      case 504:
        throw new Error('网关超时');
      case 505:
        throw new Error('HTTP 版本不受支持');
      case 404:
        throw new Error('请求接口不存在');
    }
  }

  /**
   * get请求
   * @param url
   * @param data
   * @param options
   * @returns
   */
  public get<T>(
    url: string,
    data?: Record<string, any>,
    options?: Omit<RequestBaseOptions, 'method' | 'url' | 'data'>,
  ) {
    return this.baseRequest<T>({
      url: data ? `${url}?${this.toQueryString(data)}` : url,
      method: 'GET',
      ...options,
    });
  }

  /**
   * post请求
   * @param url
   * @param data
   * @param options
   * @returns
   */
  public post<T>(
    url: string,
    data?: Record<string, any>,
    options?: Omit<RequestBaseOptions, 'method' | 'url' | 'data'>,
  ) {
    return this.baseRequest<T>({
      url,
      data: data ?? {},
      method: 'POST',
      ...options,
    });
  }

  /**
   * 设置token
   * @param token
   */
  public setToken(token: string) {
    this.token = token;
    Taro.setStorageSync(CloudCache.TOKEN, token);
  }

  /**
   * 移除token
   */
  public removeToken() {
    this.token = '';
    Taro.removeStorageSync(CloudCache.TOKEN);
  }

  /**
   * params 转 query
   * @param [object] data
   * @returns string
   */
  private toQueryString = (data: Record<string, any>) => {
    if (Object.keys(data).length === 0) {
      return '';
    }
    let url = '';

    Object.keys(data).forEach((key) => {
      url += `&${key}=${data[key]}`;
    });

    return url && url.substring(1);
  };

  /**
   * 拼接options
   * @param options
   * @returns
   */
  private generateOptions(options: RequestBaseOptions) {
    const { header, mock, hideError, ...rest } = options;
    const host =
      mock && process.env.NODE_ENV === 'development'
        ? this.host
        : this.host;

    return {
      ...rest,
      header: {
        ...this.commonHeaders,
        ...header,
      },
      url: options.url.includes('http') ? options.url : host + options.url,
    };
  }
}

interface HttpRequestOptions {
  /** token缓存 */
  token?: string;
  /** 请求host */
  host: string;
  /** 超时时间，单位秒 */
  timeout?: number;
}

export interface RequestBaseOptions extends Taro.request.Option {
  /** 是否隐藏错误提示，默认提示 */
  hideError?: boolean;
  /** 是否取消重定向 */
  cancelRedirect?: boolean;
  /** 是否启用mock, 默认不启用 */
  mock?: boolean;
}

/**
 * 分页通用参数
 */
export interface PageRequest {
  /** 第几页 */
  pageNum?: number;
  /** 分页大小 */
  pageSize?: number;
  /** 排序字段 */
  sortColumn?: string;
  /** 排序规则 */
  sortRole?: 'desc' | 'asc';
  /** 排序类型 */
  sortType?: string;
}

export interface PageResponseData<T> {
  content: T[];
  /** 总数据大小 */
  total: number;
  /** 页码 */
  number: number;
  /** 每页条数 */
  size: number;
  /** 是否是第一页 */
  first: boolean;
  /** 是否是最后一页 */
  last: boolean;
  /** 总页数 */
  totalPages: number;
  /** 是否为空 */
  empty: boolean;
}

export interface PageResponse<T> {
  pageData: PageResponseData<T>;
}

export type ErrorWrap<T> = { res?: T; err?: Error };




export default new HttpRequest();
