/**
 * 自定义事件  事件名 支持以数组的方式 对应多个事件
 */
export class EventHelper {
  public handlers: any
  constructor() {
    this.handlers = {}
  }
  create() {
    return new EventHelper()
  }
  /**
   * 判断事件是否存在
   * @param name
   */
  has(name) {
    return this.handlers[name] && this.handlers[name].length > 0
  }
  /**
   * 监听事件
   * @param name
   * @param action
   */
  on(name: string | string[], action: Function) {
    //初始化对应事件名的队列
    //支持多事件名绑定
    const names = [].concat(name)
    names.forEach(name => {
      const actions = this.handlers[name] = this.handlers[name] || []
      actions.push(action)
      //在事件被绑定的时候进行触发 事件绑定时事件
      this.emit('__event-on-' + name, action)
    })
    return this
  }
  /**
   * 删除此事件的历史队列，重新绑定事件
   * @param name
   * @param action
   */
  first(name: string | string[], action: Function) {
    //支持多事件名
    const names = [].concat(name)
    names.forEach(name => {
      this.off(name).on(name, action)
    })
    return this
  }
  /**
   * 一次性绑定事件触发后自动删除
   * @param name
   * @param action
   */
  once(name: string | string[], action: Function) {
    //支持多事件名
    const names = [].concat(name)
    names.forEach(name => {
      //初始化对应事件名的队列
      const actions = this.handlers[name] = this.handlers[name] || []
      const _action = (...params) => {
        action.apply(null, params)
        this.off(name, _action)
      }
      actions.push(_action)
    })
    return this
  }
  /**
   *
   * @param name
   * @param params
   */
  emit(name: string | string[], ...params) {
    //初始化对应事件名的队列
    //支持多事件名
    const names = [].concat(name)
    let result
    names.forEach(name => {
      const actions = this.handlers[name]
      if (this._checkActions(actions)) {
        for (let action of actions) {
          result = action.apply(null, params)
        }
      } else {
        //在事件被绑定的时候进行触发
        this.once('__event-on-' + name, (_action) => {
          _action.apply(null, params)
        })
      }
    })
    return result
  }
  /**
   * 挂载事件 不传action则删除对应事件名的整个队列
   * @param name
   * @param action
   */
  off(name: string | string[], action?: Function) {
    //支持多事件名
    const names = [].concat(name)
    names.forEach(name => {
      const actions = this.handlers[name]
      if (this._checkActions(actions)) {
        if (!action) {
          //删除对应事件名的全部事件
          actions.splice(0, actions.length)
        } else {
          //删除单个事件
          let index = 0
          for (let _action of actions) {
            if (action === _action) {
              break
            }
            index++
          }
          actions.splice(index, 1)
        }
      }
    })
    return this
  }
  /**
   * 检测事件队列
   * @param actions
   */
  private _checkActions(actions) {
    return actions && Array.isArray(actions)
  }
}
