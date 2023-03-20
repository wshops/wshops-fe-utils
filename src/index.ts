import { FormValidationFeedbackHandlers } from './validation/types'
import ApiUtils, { ApiRequestFeedbackHandlers } from './api'
import Validation from './validation'
import { Md5 } from 'ts-md5'
import CryptoJS from 'crypto-js'
import { Base64 } from 'js-base64'
import Dsync from './dsync'

interface FeedbackHandlers {
  apiFeedbacks?: ApiRequestFeedbackHandlers,
  formValidationFeedbacks?: FormValidationFeedbackHandlers
}

interface WshopUtilsConfiguration {
  feedbacks?: FeedbackHandlers
  apiVersion?: string
}

declare global {
  interface Window {$wshop: WshopUtils;}
}

export default class WshopUtils {
  private _config: WshopUtilsConfiguration = {
    feedbacks: {
      apiFeedbacks: {
        onSuccess: (msg) => {
          console.log(`[API REQUEST] [SUCCESS]: ${msg}`)
        },
        onError: (msg) => {
          console.log(`[API REQUEST] [ERROR]: ${msg}`)
        },
        onWarning: (msg) => {
          console.log(`[API REQUEST] [WARNING]: ${msg}`)
        },
        onInfo: (msg) => {
          console.log(`[API REQUEST] [INFO]: ${msg}`)
        },
        onUnAuthorized: (msg) => {
          console.log(`[API REQUEST] [UnAuthorized]: ${msg}`)
        }
      },
      formValidationFeedbacks: {
        onValid: (result) => {console.log(`[FORM VALIDATION] [VALID]: ${result.inputElement.id} | ${result.message}`)},
        onInvalid: (result) => {console.log(`[FORM VALIDATION] [INVALID]: ${result.inputElement.id} | ${result.message}`)}
      }
    }
  }
  private readonly _api: ApiUtils
  private readonly _validator: Validation

  private readonly _dsync: Dsync

  constructor (config?: WshopUtilsConfiguration) {
    if (config !== undefined) {
      if (config.feedbacks !== undefined) {
        if (config.feedbacks.apiFeedbacks !== undefined) {
          this._config.feedbacks!.apiFeedbacks = config.feedbacks.apiFeedbacks
        }
        if (config.feedbacks.formValidationFeedbacks !== undefined) {
          this._config.feedbacks!.formValidationFeedbacks = config.feedbacks.formValidationFeedbacks
        }
      }
    }
    this._api = new ApiUtils(this._config.feedbacks!.apiFeedbacks!)
    this._validator = new Validation(this._config.feedbacks!.formValidationFeedbacks!)
    this._dsync = new Dsync()
    console.debug('wshop frontend utils loaded.')
  }

  public setApiFeedbacks (fb: ApiRequestFeedbackHandlers) {
    this._config.feedbacks!.apiFeedbacks = fb
  }

  public setFormValidationFeedbacks (fb: FormValidationFeedbackHandlers) {
    this._config.feedbacks!.formValidationFeedbacks = fb
  }

  public api (): ApiUtils {
    return this._api
  }

  public vd (withAsync?: boolean): Validation {
    return withAsync === undefined || withAsync ? this._validator.withAsync() : this._validator.noAsync()
  }

  public md5 (str: string): string {
    return Md5.hashStr(str).toString()
  }

  public sha256 (str: string): string {
    return CryptoJS.SHA256(str).toString()
  }

  public formDataToObject (formId: string): any {
    const form = document.getElementById(formId) as HTMLFormElement
    const data = new FormData(form)
    const obj: any = {}
    data.forEach((value, key) => {
      obj[key] = value
    })
    return obj
  }

  public base64Encode (str: string): string {
    return Base64.encode(str)
  }

  public base64Decode (str: string): string {
    return Base64.decode(str)
  }

  public dsync (): Dsync {
    return this._dsync
  }

  public newFormValidation (withAsync?: boolean): Validation {
    return withAsync === undefined || withAsync ? new Validation(this._config.feedbacks!.formValidationFeedbacks!).withAsync() : new Validation(this._config.feedbacks!.formValidationFeedbacks!).noAsync()
  }

}

window.$wshop = new WshopUtils()