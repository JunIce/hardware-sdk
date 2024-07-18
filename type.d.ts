export interface RPC {
  realm: string;
  /**
   *
   * RPC.login 登录
   * @param {string} $user.value 用户名
   * @param {string} $password.value 密码
   * @param {boolean} false 是否httpOnly,默认false
   */
  login: (username: string, password: string, bool: boolean) => Promise<any>;

  logout: () => void;

  /**
   *
   * @param timeout
   * @param t
   * @param value
   * @param target
   * @returns
   */
  keepAlive: (
    timeout: number,
    t: number,
    value: string,
    target: string
  ) => void;

  MediaFileFind: MediaFileFind;

  getMediaFile: () => Promise<any>;
  getDeviceAllInfo: (name: string) => Promise<any>;

  LogicDeviceManager: LogicDeviceManager;
  MagicBox: MagicBox;
}

interface LogicDeviceManager {
  getCameraAll: () => Promise<any>;
}

interface MagicBox {
  instance: () => Promise<any>;
  getProductDefinition: (name: string) => Promise<any>;
}

interface MediaFileFind {
  instance: () => Promise<any>;
  /**
   * RPC.MediaFileFind.findFile 设置查找条件，并判断是否存在文件
   * @param {number} queryId 实例id
   * @param {object} params condition参数
   * @returns {Promise}
   */
  findFile: (queryId: string, params: Record<string, any>) => Promise<any>;

  findNextFile: (queryId: string, params: Record<string, any>) => Promise<any>;

  getCount: (queryId: string, params: Record<string, any>) => Promise<any>;

  setQueryResultOptions: (
    queryId: string,
    params: Record<string, any>
  ) => Promise<any>;
  /**
   * PC.MediaFileFind.close 结束查询
   * @param {number} object 媒体文件查找实例ID
   * @returns {Promise}
   */
  close: (object: Record<string, any>) => Promise<any>;
  /**
   * PC.MediaFileFind.destroy 销毁媒体文件查找实例
   * @param {number} object 媒体文件查找实例ID
   */
  destroy: (object: Record<string, any>) => Promise<any>;
}

export interface PlayerControl {
  new (...args: any[]): PlayerControl;
  play: () => Promise<any>;
  playByTime: (t: number) => void;
  pause: () => Promise<any>;
  stop: () => Promise<any>;
  close: () => Promise<any>;
  connect: () => void;
  init: (canvas: HTMLCanvasElement, video: HTMLVideoElement) => void;

  on(event: string, callback: (...args: any[]) => void);
}

export interface Pubsub {
  publish: (t, e) => void;
  subscribe: (t, e) => void;
  unsubscribe: (t, e) => void;
  getTopicFunc: (t, e) => void;
}
