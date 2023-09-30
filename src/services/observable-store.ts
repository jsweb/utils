/**
 * ObservableStore is a simple key-value store that allows listeners subscribe to changes.
 * It can be used to store states of an application in singletons.
 * Framework agnostic, no dependencies, just pure JavaScript/TypeScript.
 *
 * @class ObservableStore
 */
export class ObservableStore {
  private state = new Map()
  private listeners = new Map()

  /**
   * Get the value of a key in the store
   *
   * @param {string} key
   * @return {*} {any}
   * @memberof ObservableStore
   */
  public get(key: string): any {
    return this.state.get(key)
  }

  /**
   * Set the value of a key in the store and notify listeners
   *
   * @param {string} key
   * @param {*} value
   * @return {*} {any}
   * @memberof ObservableStore
   */
  public set(key: string, value: any): any {
    if (value !== this.get(key)) {
      this.state.set(key, value)
      this.listeners.forEach(
        (listener) => listener.key === key && listener.callback(key, value)
      )
    }
    return value
  }

  /**
   * Subscribe a listener to a key in the store to be notified when the value changes
   *
   * @param {string} key
   * @param {Function} listener
   * @memberof ObservableStore
   */
  public subscribe(key: string, listener: Function) {
    const callback = (change: string, value: any) =>
      change === key && listener(value)
    this.listeners.set(listener, { key, callback })
  }

  /**
   * Unsubscribe a listener from a key in the store
   *
   * @param {string} key
   * @param {Function} listener
   * @memberof ObservableStore
   */
  public unsubscribe(key: string, listener: Function) {
    const target = this.listeners.get(listener)
    if (target?.key === key) this.listeners.delete(listener)
  }
}
