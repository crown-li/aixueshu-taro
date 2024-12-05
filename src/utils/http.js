import Taro from "@tarojs/taro";

// 从环境变量获取基础URL
const TARO_APP_API = process.env.TARO_APP_API

// 拦截器配置
const interceptor = function (chain) {
  const requestParams = chain.requestParams
  const { method, data, url } = requestParams
  
  requestParams.url = `${TARO_APP_API}${url}`

  console.log(`http ${method || 'GET'} --> ${requestParams.url} data: `, data)

  return chain.proceed(requestParams)
    .then(res => {
      console.log(`http <-- ${requestParams.url} result:`, res)
      return res
    })
}

Taro.addInterceptor(interceptor)

/**
 * 通用请求函数
 * @param {string} url - 请求路径
 * @param {object} options - 请求配置项
 * @param {string} options.method - 请求方法，默认 'GET'
 * @param {object} options.data - 请求数据
 * @param {object} options.header - 请求头
 * @returns {Promise} 请求响应结果
 */
export const request = (url, options = {}) => {
    const { method = 'GET' } = options;
    
    
    return Taro.request({
        url,
        method,
        ...options
    }).then(res => {
      // 这里可以对响应数据做统一处理
      if (res.statusCode === 200) {
        return res.data;
      }
      return Promise.reject(res);
    }).catch(error => {
      // 统一的错误处理
      console.error('请求错误：', error);
      return Promise.reject(error);
    });
  }

// 导出便捷的请求方法
export const get = (url, options = {}) => request(url, { ...options, method: 'GET' });
export const post = (url, data, options = {}) => request(url, { ...options, method: 'POST', data });
export const put = (url, data, options = {}) => request(url, { ...options, method: 'PUT', data });
export const del = (url, options = {}) => request(url, { ...options, method: 'DELETE' });