interface MsgOptions {
  //消息类型
  type?: 'info' | 'success' | 'warn' | 'error' | 'loading'

  //消息内容
  content?: string

  //消息默认关闭时间
  duration?: number

  //消息关闭时触发
  onClose?: () => void

  //是否可被主动关闭
  closable?: boolean
}

export default class Message {
  private _options: MsgOptions

  private readonly _prefixClass: string = 'i-message-'

  private readonly _topLength: string = '16px'

  private readonly _containerId: string = 'fta-message-container'

  constructor (options?: MsgOptions) {
    this._options = {
      type: 'info',
      content: '',
      duration: 3,
      onClose: () => {
        console.debug('msg close')
      },
      closable: false
    }

    if (options !== undefined && options !== null) {
      if (options.type) {
        this._options.type = options.type
      }

      if (options.content) {
        this._options.content = options.content
      }

      if (options.duration) {
        this._options.duration = options.duration
      }

      if (options.onClose) {
        this._options.onClose = options.onClose
      }

      if (options.closable !== undefined || options.closable !== null) {
        this._options.closable = options.closable
      }
    }
    this._initMessageContainer()
    console.debug('message object created.')
    console.debug(this._options)
  }

  public async info (msg: string) {
    this._options.content = msg
    this._options.type = 'info'
    this._message()
  }

  public async warn (msg: string) {
    this._options.content = msg
    this._options.type = 'warn'
    this._message()
  }

  public async error (msg: string) {
    this._options.content = msg
    this._options.type = 'error'
    this._message()
  }

  public async success (msg: string) {
    this._options.content = msg
    this._options.type = 'success'
    this._message()
  }

  public loading (msg?: string): () => Promise<any> {
    this._options.type = 'loading'
    this._options.duration = -1
    if (msg == undefined) this._options.content = 'loading...'
    else this._options.content = msg
    const messageBlock = this._message()
    return async () => {
      this._closeMessage(messageBlock)
    }
  }

  public reset () {
    if (document.getElementById(this._containerId)) document.getElementById(this._containerId)!.remove()
    this._resetDefaultOptions()
    this._initMessageContainer()
  }

  private _message (): HTMLElement {
    const msg = this._showMessage()
    if (this._options.duration === -1) {
      return msg
    }
    if (!this._isClosable()) {
      setTimeout(() => {
        this._closeMessage(msg)
      }, this._getDurationMs())
    }
    return msg
  }

  private _showMessage (): HTMLElement {
    //生成消息块
    const msg = this._generateMessageElement()
    //获取主容器
    const container = this._getMessageContainer()
    //将消息插入到容器中
    container.appendChild(msg)

    if (this._isClosable()) this._addCloseButton(msg)

    return msg
  }

  private _closeMessage (msg: HTMLElement): void {
    msg.className = `${this._prefixClass}box animate__animated animate__fadeOutUp`
    msg.style.height = '0px'
    setTimeout(() => {this._getMessageContainer().removeChild(msg)}, 1300)
    this._options.onClose!()
  }

  private _getType (): 'info' | 'success' | 'warn' | 'error' | 'loading' {
    if (this._options.type === undefined) {
      console.error('must specify message type')
      this._options.content = 'must specify message type'
      return 'error'
    }
    return this._options.type!
  }

  private _getContent (): string {
    if (this._options.content === undefined) {
      console.error('must specify message content')
      this._options.content = 'must specify message content'
      return 'must specify message content'
    }
    return <string>this._options.content
  }

  private _getDurationMs (): number {
    if (this._options.duration === undefined) {
      console.error('must specify message duration')
      this._options.content = 'must specify message duration'
      return 2000
    }
    return <number>this._options.duration * 1000
  }

  private _isClosable (): boolean {
    if (this._options.content === undefined) {
      console.error('must specify closable')
      this._options.content = 'must specify closable'
      return false
    }
    return <boolean>this._options.closable
  }

  private _initMessageContainer (): void {
    const container: HTMLDivElement = document.createElement('div')
    container.id = this._containerId
    container.style.top = this._topLength
    document.body.appendChild(container)
  }

  private _getMessageContainer (): HTMLElement {
    if (document.getElementById(this._containerId) === undefined) {
      this._initMessageContainer()
    }
    return document.getElementById(this._containerId)!
  }

  private _generateMessageElement (): HTMLDivElement {
    const msg: HTMLDivElement = document.createElement('div')
    msg.className = `${this._prefixClass}box animate__animated animate__fadeInDown`
    msg.style.height = '36px'
    msg.innerHTML =
      `
        <div class="${this._prefixClass}message">
          ${this._getIcon()}
          <div class="${this._prefixClass}content-text">${this._getContent()}</div>
        </div>
      `
    return msg
  }

  private _addCloseButton (msg: HTMLElement): void {
    const svgStr = `<svg class="${this._prefixClass}btn" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" /></svg>`
    const closBtn = new DOMParser().parseFromString(svgStr, 'text/html').body.childNodes[0]
    closBtn.addEventListener('click', () => {
      this._closeMessage(msg)
    })
    msg.querySelector<HTMLElement>(`.${this._prefixClass}message`)!.appendChild(closBtn)
  }

  private _getIcon (): string {
    const map: { [key: string]: string } = {
      'info': `<svg style="color:#2db7f5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>`,
      'success': `<svg style="color:#19be6b"  xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" /></svg>`,
      'warn': `<svg style="color:#ff9900" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>`,
      'error': `<svg style="color:#ed4014" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd" /></svg>`,
      'loading': `<svg style="color:#2db7f5" xmlns="http://www.w3.org/2000/svg" class="loading" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M9.504 1.132a1 1 0 01.992 0l1.75 1a1 1 0 11-.992 1.736L10 3.152l-1.254.716a1 1 0 11-.992-1.736l1.75-1zM5.618 4.504a1 1 0 01-.372 1.364L5.016 6l.23.132a1 1 0 11-.992 1.736L4 7.723V8a1 1 0 01-2 0V6a.996.996 0 01.52-.878l1.734-.99a1 1 0 011.364.372zm8.764 0a1 1 0 011.364-.372l1.733.99A1.002 1.002 0 0118 6v2a1 1 0 11-2 0v-.277l-.254.145a1 1 0 11-.992-1.736l.23-.132-.23-.132a1 1 0 01-.372-1.364zm-7 4a1 1 0 011.364-.372L10 8.848l1.254-.716a1 1 0 11.992 1.736L11 10.58V12a1 1 0 11-2 0v-1.42l-1.246-.712a1 1 0 01-.372-1.364zM3 11a1 1 0 011 1v1.42l1.246.712a1 1 0 11-.992 1.736l-1.75-1A1 1 0 012 14v-2a1 1 0 011-1zm14 0a1 1 0 011 1v2a1 1 0 01-.504.868l-1.75 1a1 1 0 11-.992-1.736L16 13.42V12a1 1 0 011-1zm-9.618 5.504a1 1 0 011.364-.372l.254.145V16a1 1 0 112 0v.277l.254-.145a1 1 0 11.992 1.736l-1.735.992a.995.995 0 01-1.022 0l-1.735-.992a1 1 0 01-.372-1.364z" clip-rule="evenodd" /></svg>`
    }
    return map[this._getType()]
  }

  private _resetDefaultOptions () {
    this._options = {
      type: 'info',
      content: '',
      duration: 3,
      onClose: () => {
        console.debug('msg close')
      },
      closable: false
    }
  }

}
