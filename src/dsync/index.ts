export default class Dsync {
  private _data: Map<string, string | number | object>

  constructor () {
    this._data = new Map<string, string | number | object>()
  }

  public set (key: string, value: string | number | object): void {
    this._data.set(key, value)
  }

  public get (key: string): string | number | object | undefined {
    return this._data.get(key)
  }

  public remove (key: string): void {
    this._data.delete(key)
  }

  public has (key: string): boolean {
    return this._data.has(key)
  }

}