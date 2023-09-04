import axios from "axios";

const request = axios.create({
  baseURL: "/api", // 注意！！ 这里是全局统一加上了 '/api' 前缀，也就是说所有接口都会加上'/api'前缀在，页面里面写接口的时候就不要加 '/api'了，否则会出现2个'/api'，类似 '/api/api/user'这样的报错，切记！！！
  timeout: 5000,
});
//有问题联系 q27-62-79-3236
// request 拦截器
// 可以自请求发送前对请求做一些处理
// 比如统一加token，对请求参数统一加密
request.interceptors.request.use(
  (config) => {
    config.headers["Content-Type"] = "application/json;charset=utf-8";

    config.headers["token"] = window.sessionStorage.getItem("token"); // 设置请求头
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// response 拦截器
// 可以在接口响应后统一处理结果
request.interceptors.response.use(
  (response) => {
    let res = response.data;
    // 如果是返回的文件
    if (response.config.responseType === "blob") {
      return res;
    }
    // 兼容服务端返回的字符串数据
    if (typeof res === "string") {
      res = res ? JSON.parse(res) : res;
    }
    return res;
  },
  (error) => {
    console.log("err" + error); // for debug
    return Promise.reject(error);
  }
);

//  export default request;
const httpRequest = {
  get(url, params = {}) {
    return new Promise((resolve, reject) => {
      request
        .get(url, {
          params: params,
        })
        .then((response) => {
          resolve(response);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },
  getByurl(url) {
    return new Promise((resolve, reject) => {
      request
        .get(url)
        .then((response) => {
          resolve(response);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },

  post(url, data = {}) {
    return new Promise((resolve, reject) => {
      request.post(url, data).then(
        (response) => {
          resolve(response);
        },
        (err) => {
          reject(err);
        }
      );
    });
  },
  postform(url, data = {}) {
    return new Promise((resolve, reject) => {
      request.post(url, data).then(
        (response) => {
          resolve(response);
        },
        (err) => {
          reject(err);
        }
      );
    });
  },
};
export default httpRequest;
// /**
//  * 封装get方法
//  * @param url
//  * @param data
//  * @returns {Promise}
//  */
// export function get(url, params = {}) {
//   return new Promise((resolve, reject) => {
//     request.get(url, {
//         params: params,
//       })
//       .then((response) => {
//         resolve(response.data);
//       })
//       .catch((err) => {
//         reject(err);
//       });
//   });
// }

// /**
//  * 封装post请求
//  * @param url
//  * @param data
//  * @returns {Promise}
//  */

// export function post(url, data = {}) {
//   return new Promise((resolve, reject) => {
//     request.post(url, data).then(
//       (response) => {
//         resolve(response.data);
//       },
//       (err) => {
//         reject(err);
//       }
//     );
//   });
// }

// /**
//  * 封装post请求 FormData方式
//  * @param url
//  * @param data
//  * @returns {Promise}
//  */

// export function postform(url, data = {}) {
//   return new Promise((resolve, reject) => {
//     request.post(url, data).then(
//       (response) => {
//         resolve(response.data);
//       },
//       (err) => {
//         reject(err);
//       }
//     );
//   });
// }
