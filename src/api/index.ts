import axios, { AxiosInstance, AxiosResponse } from 'axios'

export interface WApiResponse {
  ret: number | undefined
  msg?: string
  data?: object
}

export interface ApiRequestFeedbackHandlers {
  onSuccess: (message: string) => void,
  onError: (message: string) => void,
  onInfo: (message: string) => void,
  onWarning: (message: string) => void,
  onUnAuthorized: (message: string) => void
}

export default class ApiUtils {
  private readonly _instance: AxiosInstance
  private readonly _feedbackHandlers: ApiRequestFeedbackHandlers

  constructor (feedbackHandlers: ApiRequestFeedbackHandlers) {
    this._feedbackHandlers = feedbackHandlers
    this._instance = axios.create({
      timeout: 0,
      withCredentials: true,
      headers: {
        'Accept': 'application/json'
      }
    })
    this._instance.interceptors.response.use(this.responseInterceptorOnSuccess, (error) => this.responseInterceptorOnError(error, this._feedbackHandlers))
  }

  public get currentAxiosInstance (): AxiosInstance {
    return this._instance
  }

  public newAxiosInstance (): AxiosInstance {
    return axios.create({
      timeout: 0,
      withCredentials: true,
      headers: {
        'Accept': 'application/json'
      }
    })
  }

  public setHeader (key: string, value: string): void {
    this._instance.defaults.headers.common[key] = value
  }

  public async get (url: string, data?: any): Promise<AxiosResponse<any, any> | any> {
    return await this._instance.get(url, {
      params: data
    })
  }

  public async post (url: string, data?: object): Promise<AxiosResponse<any, any> | any> {
    return await this._instance.post(url, data)
  }

  public async put (url: string, data?: object): Promise<AxiosResponse<any, any> | any> {
    return await this._instance.put(url, data)
  }

  public async del (url: string, data?: object): Promise<AxiosResponse<any, any> | any> {
    return await this._instance.delete(url, {
      data: data
    })
  }

  public async patch (url: string, data?: object): Promise<AxiosResponse<any, any> | any> {
    return await this._instance.patch(url, data)
  }

  // 当请求状态码在 2xx 范围内时，将调用此函数
  private responseInterceptorOnSuccess (response: AxiosResponse<any, any>): Promise<AxiosResponse<any, any>> {
    return Promise.resolve(response)
  }

  // 当请求状态码不在 2xx 范围内时或发生客户端错误时，将调用此函数
  private responseInterceptorOnError (error: any, fbh: ApiRequestFeedbackHandlers): any {
    if (error.message.includes('timeout')) {
      fbh.onError('request timeout, please try again later.')
      return Promise.reject(error)
    }
    if (error.response === undefined || error.response === null) {
      fbh.onError('request failed, please try again later.')
      return Promise.reject(error)
    }
    if (error.response.status !== null || error.response.status !== undefined) {
      switch (error.response.status) {
        // 401: 未登录
        case 401:
          fbh.onUnAuthorized(error.response.data.message)
          break
        // 403 token过期
        case 403:
          fbh.onUnAuthorized(error.response.data.message)
          break
        // 404 请求不存在
        case 404:
          fbh.onError(error.response.data.message)
          break
        // 其他错误，直接根据业务错误码进行处理
        case 400:
          if (error.response.data.ret === -1) {
            // 如果是参数验证错误则展示警告
            fbh.onWarning(error.response.data.message)
          } else {
            fbh.onError(error.response.data.message)
          }
          break
        case 500:
          fbh.onError(error.response.data.message)
          break
        default:
          fbh.onError(error.response.data.message)
          break
      }
      return Promise.resolve(null)
    }
    fbh.onError('system error, please try again later.')
    return Promise.reject(error)
  }
}