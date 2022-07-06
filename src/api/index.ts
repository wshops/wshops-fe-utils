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

  public async get (url: string, data?: object): Promise<ApiRequestCallback> {
    const res = await this._apisauceInstance.get<AscApiResponse>(url, data)
    return this._processResponse(res)
  }

  public async post (url: string, data?: object): Promise<ApiRequestCallback> {
    const res = await this._apisauceInstance.post<AscApiResponse>(url, data)
    return this._processResponse(res)
  }

  private _processResponse (r: ApiResponse<AscApiResponse>): ApiRequestCallback {
    if (r === undefined) {
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

    if (r.data.ret === -5) {
      this._feedbackHandlers.onUnAuthorized('please login.')
      return {
        isRequestSucceed: true,
        feedbackShowed: true,
        resultData: r.data
      }
    }

    if (r.data.ret === -4) {
      this._feedbackHandlers.onUnAuthorized('please login.')
      return {
        isRequestSucceed: true,
        feedbackShowed: true,
        resultData: r.data
      }
    }

    if (r.data.ret === -1) {
      this._feedbackHandlers.onWarning(r.data.msg !== undefined ? r.data.msg : '')
      return {
        isRequestSucceed: true,
        feedbackShowed: true,
        resultData: r.data
      }
    }

    if (r.data.ret === -10) {
      this._feedbackHandlers.onError(r.data.msg !== undefined ? r.data.msg : '')
      return {
        isRequestSucceed: true,
        feedbackShowed: true,
        resultData: r.data
      }
    }

    if (r.data.ret === -50) {
      this._feedbackHandlers.onError('system busy, please try again later.')
      console.error(r.problem)
      return {
        isRequestSucceed: true,
        feedbackShowed: true
      }
    }

    return {
      isRequestSucceed: true,
      feedbackShowed: false,
      resultData: r.data
    }
  }
}