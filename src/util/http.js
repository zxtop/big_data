import axios from 'axios';
import qs from 'qs';
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

axios.interceptors.request.use(config=>{
    return config
},error=>{
    return Promise.reject(error)
});

axios.interceptors.response.use(response=>{
    return response
},error=>{
    return Promise.resolve(error.response)
});


//网络状态检查
function checkStatus (response) {
    // loading
    // 如果http状态码正常，则直接返回数据
    if (response && (response.status === 200 || response.status === 304 || response.status === 400)) {
        return response
        // 如果不需要除了data之外的数据，可以直接 return response.data
    }
    if (response && (response.status === 201)) {
        return {
        status: 201,
        msg: '创建成功'
        }
    }
    if (response && (response.status === 204)) {
        return {
        status: 204,
        msg: '删除成功'
        }
    }
    // 异常状态下，把错误信息返回去
    return {
        status: -404,
        msg: '网络异常'
        
    }

}

//返回状态检查
function checkCode (res) {
    //console.log(res)
    // 如果code异常(这里已经包括网络错误，服务器错误，后端抛出的错误)，可以弹出一个错误提示，告诉用户
    if (res.status === -404) {
        //alert(res.msg)
    }
    if (res.data && (!res.data.success)) {
        //alert(res.data.error)
    }
    //console.log('返回带错误的')
    return res
}

export function fetch(url, params) {
    return new Promise((resolve, reject) => {
        axios.post(url, params)
        .then(response => {
            resolve(response.data);
        })
        .catch((error) => {
            reject(error);
        })
    })
}

export default{
    mockdata(url,params){
        return fetch(url,params);
    },

    fetchPost(url,params){
        return axios({
        method: 'post',
        baseURL: 'https://cnodejs.org/api/v1',
        url,
        data: qs.stringify(data),
        timeout: 10000,
        headers: {
            'X-Requested-With': 'XMLHttpRequest',
            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'        
        }
        }).then(
        (response) => {   
            //console.log(response)    
            return checkStatus(response)
        }
        ).then(
        (res) => {
            return checkCode(res)
        }
        )
    },

    fetchGet(url,params){
        return axios({
            method: 'get',
            baseURL: 'https://cnodejs.org/api/v1',
            url,
            params, // get请求时带的参数
            timeout: 10000,
            headers: {
                'X-Requested-With': 'XMLHttpRequest',
            }
        }).then(
            (response)=>{
                return checkStatus(response)
            }
        ).then(
            (res)=>{
                return checkCode(res)
            }
        )
    }
}
