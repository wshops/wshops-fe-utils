import { FormValidationFeedbackHandlers } from './validation/types'
import ApiUtils, { ApiRequestFeedbackHandlers } from './api'
import Message from './message'
import Validation from './validation'
import { Md5 } from 'ts-md5'
import CryptoJS from 'crypto-js'
import { Base64 } from 'js-base64'

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
          this.msg().success(msg)
        },
        onError: (msg) => {
          this.msg().error(msg)
        },
        onWarning: (msg) => {
          this.msg().warn(msg)
        },
        onInfo: (msg) => {
          this.msg().info(msg)
        },
        onUnAuthorized: (msg) => {
          console.log('[Api Request]: UnAuthorized ' + msg)
          this.msg().warn('UnAuthorized')
        }
      },
      formValidationFeedbacks: {
        onValid: (result) => {console.log(`[Form Validation]: (${result.inputElement.id}) (${result.isValid}) ${result.message}`)},
        onInvalid: (result) => {console.log(`[Form Validation]: (${result.inputElement.id}) (${result.isValid}) ${result.message}`)}
      }
    }
  }

  private readonly _message: Message
  private readonly _api: ApiUtils
  private readonly _validator: Validation

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
    this._message = new Message()
    this._api = new ApiUtils(this._config.feedbacks!.apiFeedbacks!, `/api/${config?.apiVersion === undefined || config?.apiVersion === '' ? 'v1' : config?.apiVersion}`)
    this._validator = new Validation(this._config.feedbacks!.formValidationFeedbacks!)
    console.debug('wshop frontend utils loaded.')
  }

  public setApiFeedbacks (fb: ApiRequestFeedbackHandlers) {
    this._config.feedbacks!.apiFeedbacks = fb
  }

  public setFormValidationFeedbacks (fb: FormValidationFeedbackHandlers) {
    this._config.feedbacks!.formValidationFeedbacks = fb
  }

  public msg (): Message {
    return this._message
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

  public base64Encode (str: string): string {
    return Base64.encode(str)
  }

  public base64Decode (str: string): string {
    return Base64.decode(str)
  }
}

window.$wshop = new WshopUtils()