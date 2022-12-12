import { ApiResponse, ApisauceInstance, create } from 'apisauce'

export interface AscApiResponse {
  ret: number | undefined
  msg?: string
  data?: object
}

export interface ApiRequestCallback {
  isRequestSucceed: boolean
  feedbackShowed: boolean
  errorMessage?: string
  resultData?: AscApiResponse
}

export interface ApiRequestFeedbackHandlers {
  onSuccess: (message: string) => void,
  onError: (message: string) => void,
  onInfo: (message: string) => void,
  onWarning: (message: string) => void,
  onUnAuthorized: (message: string) => void
}

export default class ApiUtils {
  private readonly _apisauceInstance: ApisauceInstance
  private readonly _feedbackHandlers: ApiRequestFeedbackHandlers

  constructor (feedbackHandlers: ApiRequestFeedbackHandlers, baseUrl?: string) {
    this._feedbackHandlers = feedbackHandlers
    this._apisauceInstance = create({
      baseURL: baseUrl,
      withCredentials: true,
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    })
  }

  public get apisauceInstance (): ApisauceInstance {
    return this._apisauceInstance
  }

  public setHeader (key: string, value: string): void {
    this._apisauceInstance.setHeader(key, value)
  }

  public async get (url: string, data?: object): Promise<ApiRequestCallback> {
    const res = await this._apisauceInstance.get<AscApiResponse>(url, data)
    return this._processResponse(res)
  }

  public async post (url: string, data?: object): Promise<ApiRequestCallback> {
    const res = await this._apisauceInstance.post<AscApiResponse>(url, data)
    return this._processResponse(res)
  }

  public async put (url: string, data?: object): Promise<ApiRequestCallback> {
    const res = await this._apisauceInstance.put<AscApiResponse>(url, data)
    return this._processResponse(res)
  }

  public async del (url: string, data?: object): Promise<ApiRequestCallback> {
    const res = await this._apisauceInstance.delete<AscApiResponse>(url, data)
    return this._processResponse(res)
  }

  public async patch (url: string, data?: object): Promise<ApiRequestCallback> {
    const res = await this._apisauceInstance.patch<AscApiResponse>(url, data)
    return this._processResponse(res)
  }

  private _processResponse (r: ApiResponse<AscApiResponse>): ApiRequestCallback {
    if (r === undefined || r.status === undefined || r.status === null) {
      this._feedbackHandlers.onError('an unknown error occurred，please contact support.')
      return {
        isRequestSucceed: false,
        feedbackShowed: true
      }
    }

    if (!r.ok) {
      this._feedbackHandlers.onError('system busy, please try again later.')
      console.error(r.problem)
      return {
        isRequestSucceed: false,
        feedbackShowed: true
      }
    }

    if (r.data?.ret === undefined || r.data?.ret === null) {
      this._feedbackHandlers.onError('system busy, please try again later.')
      console.error(r.problem)
      return {
        isRequestSucceed: false,
        feedbackShowed: true
      }
    }

    if (r.status === 200) {
      return {
        isRequestSucceed: true,
        feedbackShowed: false,
        resultData: r.data
      }
    }

    if (r.status === 401) {
      this._feedbackHandlers.onUnAuthorized('please login.')
      return {
        isRequestSucceed: true,
        feedbackShowed: true,
        resultData: r.data
      }
    }

    if (r.status === 400) {
      if (r.data.ret === -1) {
        this._feedbackHandlers.onWarning(r.data.msg !== undefined ? r.data.msg : '')
        return {
          isRequestSucceed: true,
          feedbackShowed: true,
          resultData: r.data
        }
      }
      this._feedbackHandlers.onError(r.data.msg !== undefined ? r.data.msg : '')
      return {
        isRequestSucceed: true,
        feedbackShowed: true,
        resultData: r.data
      }
    }

    if (r.status === 500) {
      this._feedbackHandlers.onError('system busy, please try again later.')
      console.error(r.problem)
      return {
        isRequestSucceed: true,
        feedbackShowed: true
      }
    }

    return {
      isRequestSucceed: false,
      feedbackShowed: false,
      resultData: r.data
    }
  }
}