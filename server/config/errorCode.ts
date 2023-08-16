/*
 * @Descripttion: 接口错误码
 * @Author: HYH
 * @LastEditors: HYH
 * @LastEditTime: 2021-12-28 15:18:50
 */

/**成功 */
const CODE_SUCCESS = 200
/**服务器发生错误，用户将无法判断发出的请求是否成功 */
const CODE_ERROR = 500
/**SQL语句错误 */
const CODE_ERROR_SQL = 220
/**未认证 */
const CODE_NEED_LOGIN = 4001
/**用户名或密码错误 */
const CODE_ERROR_LOGIN = 4002
/**资源未找到 用户发出的请求针对的是不存在的记录，服务器没有进行操作 */
const CODE_NOT_FOUND = 4004
/**没有权限 */
const CODE_FORBIDDEN = 4003
/**token已失效 */
const CODE_LOSE_TOKEN = 4006
/**内部错误 */
const CODE_NET_ERROR = 5001
/**token解析错误 */
const CODE_TOKEN_PARSING_ERROR = 4007
/**参数错误 */
const PARAMETER_NOT_LEGAL = 4444

const code = {
  /**成功 */
  CODE_SUCCESS,
  /**服务器发生错误，用户将无法判断发出的请求是否成功 */
  CODE_ERROR,
  /**SQL语句错误 */
  CODE_ERROR_SQL,
  /**未认证 */
  CODE_ERROR_LOGIN,
  /**未认证 */
  CODE_NEED_LOGIN,
  /**资源未找到 用户发出的请求针对的是不存在的记录，服务器没有进行操作 */
  CODE_NOT_FOUND,
  /**没有权限 */
  CODE_FORBIDDEN,
  /**token已失效 */
  CODE_LOSE_TOKEN,
  /**内部错误 */
  CODE_NET_ERROR,
  /**token解析错误 */
  CODE_TOKEN_PARSING_ERROR,
  /**参数错误 */
  PARAMETER_NOT_LEGAL
}
export default code
