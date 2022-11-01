# vue2

### 一、项目构建
```
1.局部安装脚手架，创建vue2项目
cmd
npm init -y # 初始化项目依赖文件
cnpm i -D @vue/cli@4.5.15 # 安装脚手架
npx vue -V # 查看vue-cli版本号
npx vue create vue2 # 创建项目(项目名称为vue2)
```

#### 二、项目配置

1. 设置每次npm run serve 自动打开浏览器
手动创建vue.config.js文件,并写入以下代码
```js
//vue.config.js
module.exports = {
    devServer:{
        open: true
    }
}
```

2. 下载element-ui(版本号为2.15.8)
```cmd
npm i element-ui@2.15.8 -S

```

3. 将element-ui引入main.js
```js
  //main.js
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);
官网查询有完整引入和按需引入，具体用法，查看官网 
[https://element.eleme.cn/#/zh-CN]
此项目中，直接使用的完整引入
```

4. 创建Home.vue，并删除所有原有的不需要的代码

5. 在项目中使用CSS预处理器Scss
  官网：[https://www.sass.hk/]
- 5.1 安装
```cmd
npm i sass-loader@7 node-sass@4 -S
```
- 5.2 使用
```html
<style lang="scss"></style>
```

6. 在项目中使用CSS预处理器Less
  官网：[https://www.sass.hk/]
- 6.1 安装
```cmd
npm i less@3 less-loader@7 -S
```
- 6.2 使用
```html
<style lang="less"></style>
```

7. 使用reset.css
  任何一个项目都需要做样式重置,这里我们使用官方的样式重置内容，如果需要补充可以自己手动添加。
  官网: [https://meyerweb.com/eric/tools/css/reset/]
  我们把代码复制下来放在项目中新建的reset.css文件,然后在app.vue的style中进行引入使用:
```scss
@import url('./assets/css/reset.css');
```

8. font-awesome图标库的使用
  官网：[https://fontawesome.dashgame.com/]
- 8.1 安装
```cmd
npm i font-awesome -D
```
- 8.2 在main.js中引入
```js
// main.js
import 'font-awesome/css/font-awesome.min.css'
```
- 8.3 使用
```html
<i class='fa fa-users'></i>
```



### axios和路由的安装使用
1. 使用axios
  官网:[http://www.axios-js.com/]
- 1.1 下载axios
```cmd
npm i -S axios
```
- 1.2 使用axios
```js
// main.js
import axios from 'axios'

Vue.prototype.axios = axios // 挂载到原型,可在全局使用
```

2. 配置路由
- 2.1 下载vue-router
```cmd
npm i vue-router@3.5.3 -S  (vue2项目要用3.5.3版本，不然会报错)
```
- 2.2 配置路由(新建router文件夹和index.js文件)
```js
// index.js
import Vue from 'vue'
import Router from 'vue-router'
import Home from '../components/Home.vue'

Vue.use(Router)

export default new Router({
    routes: [
        {
            path: '/',
            component: Home
        }
    ],
    mode: 'history'
})
```
- 2.3 挂载使用
```js
// main.js
import router from './router'

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
```
```html
<!-- 在App.vue设置路由出口 -->
<router-view></router-view>
```
- 2.4 路由懒加载
    - 2.4.1 官方推荐的方法,使用ES中的import
      component: () => import('@/components/Login')
    - 2.4.2 使用Vue异步组件
      component: resolve => require(['@/components/Home'], resolve)
    - , 

### 登录页简单验证
1. 去element-ui官网找一个登录表单,再根据要求做相应改动
```js
//    index.js 设置登陆页面的路由，以及一访问8080就重定向登陆页面
        {
            path: '/',
            redirect:'/login',//重定向
            component: () => import('@/components/Login'),
        },
        {
            path: '/login',
            name:'Login',
            component: () => import('@/components/Login'),
        },
```
2. 用户名和密码验证
LoginOne.vue是简单用户名和密码的验证

LoginTwo.vue是将存有用户名和密码的表单利用axios写入给某个接口，如果校验成功，不仅将数据提交到接口，还实现进入主页的功能

LoginThird.vue将用户名和密码的更严谨验证方式写入

- 2.1  在src新建文件夹utils，validate.js进行登录校验的封装
      将密码和用户名校验方法模块化
```js
//  validate.js
//用户名匹配
export function nameRule(rule,value,callback){
     //请输入4-10位的昵称，正则表达式(vscode插件any-rule 使用方法：输入@zz)
        //  小写大写或0-9，一共4-10位
        let reg =  /(^[a-zA-Z0-9]{4,10}$)/ 
        if(value === ''){
           //如果输入框为空
           callback(new Error('请输入用户名'))
        }else if(!reg.test(value)){
           //如果没有满足reg的条件
           callback(new Error('请输入4-10位用户名'))
        }else {
           callback()
        }
}

//密码匹配
export function passRule(rule,value,callback){
    //请输入6-12位的密码，正则表达式(vscode插件any-rule 使用方法：输入@zz触发)
        //  大小写字母和数字及特殊符号组成额6-12位密码
        let pass =  /^\S*(?=\S{6,12})(?=\S*\d)(?=\S*[A-Z])(?=\S*[a-z])(?=\S*[!@#$%^&*? ])\S*$/;
        if(value === ''){
           //如果输入框为空
           callback(new Error('请输入密码'))
        }else if(!pass.test(value)){
           //如果没有满足reg的条件
           callback(new Error('请输入6-12位密码'))
        }else {
           callback()
        }
}
```
- 2.2 将模块化校验方法导入Login.vue

- 2.3 utils文件夹下的setToken.js对token进行存储、读取、移除的封装，将这个js文件导入Login.vue，将原来的本地存储方式，用封装后的setToken替代
```js
// setToken.js
export function setToken(tokenKey,token){
    return localStorage.setItem(tokenKey,token)
}

export function getToken(tokenKey){
    return localStorage.getItem(tokenKey)
}

export function removeToken(tokenKey){
    return localStorage.removeItem(tokenKey)
}
```



### 接口地址
地址：[https://www.showdoc.com.cn/jinducasey/8321036098744323]
密码：jinduVIP
登录的用户名和密码符合校验规则即可(用户名:admin,密码1qaz!QAZ)
接口说明及Postman对接口进行验证访问必须携带token

### axios二次封装
原始axios写法
```vue
            if(valid){
                console.log(this.form);
                // 对表单的内容进行校验，如果通过校验就打印表单，并将表单提交到下面的接口
                this.axios.post('https://rapserver.sunmi.com/app/mock/340/login',this.form)
                //这个接口无效了，代码无错
                .then(res =>{
                    console.log(res);
                    //这个res会返回一个data，其中包含了token 和username，status,message
                    if(res.data.status === 200){
                        localStorage.setItem('username',res.data.username)
                    //当状态码为200时，登陆成功，就把用户名保存到本地存储中,并进入主页
                        this.$message({message: res.data.message,type: 'success'})
                        this.$router.push('/home')
                    }
                })
                .catch(err =>{
                    //如果状态码不是200，就捕捉一下提交失败
                    console.log(err);
                })
            }else{
                console.err(this.form);
            }
 ```


 一次封装axios
1. 先将Login.vue里面的axios内容进行注释
2. 在src下创建一个service.js
```js
// service.js
import axios from 'axios'
import {getToken} from '@/utils/setToken.js'
//message提示
import {Message} from 'element-ui'


const service = axios.create({
    //有对应的baseURL，基础路径，去vue.config.js配置对应的代理
    baseURL: '/api',//baseURL会自动加在请求地址上（目标地址）
    timeout: 3000,//指定请求超时毫秒数，如果请求超过这个时间，就请求中断

})

//添加请求拦截器
service.interceptors.request.use((config)=>{
    //在请求之前做些什么（获取并设置token）
    //在每次请求之前，将我们的token携带上去，只有携带了token，才拿得到相应的学生信息数据等
    config.headers['token'] = getToken('token')
    return config
},(error) =>{
    //错误捕捉
    return Promise.reject(error)
})

//添加响应拦截器
service.interceptors.response.use((response)=>{
    //对响应数据做些什么
    //比如对响应的不同的状态码，给出不同的提示
     let {status,message} = response.data
     if(status !== 200){
           Message({message: message || 'error', type: 'warning'})
     }
     return response
},(error) =>{
    return Promise.reject(error)
})

export default service

```
3. 在vue.config.js中配置路径代理
```js
 devServer:{
        open: true,//运行自动打开浏览器
        //路径代理
        proxy:{
            '/api':{
                //目标地址
                target:'http://1.116.64.64:5004/api2/',
                //允许跨域
                changeOrigin: true,
                pathRewrite: {
                    '^/api':''
                }
            }
        }
    }
```

4. 在到main.js里进行配置，将原来导入的axios注释
```js
// import axios from 'axios'
import service from './service'


// Vue.prototype.axios = axios //挂载到原型，可以全局使用
Vue.prototype.service = service //挂载到原型，可以全局使用
```

5. 将之前的Login.vue的axios方法替换成封装后的接口方法（第一次封装）
```vue
        if(valid){
                console.log(this.form);
                this.service.post('/login',this.form)
                .then(res =>{
                  if(res.data.status === 200){
                    setToken('username',res.data.username)
                    setToken('token',res.data.token)
                    this.$message({message:res.data.message, type: 'success'})
                    this.$router.push('/home')
                  }
                  console.log(res);
                })
            }else{
                console.err(this.form);
            }
```

6. （第二次封装）
把这个登录接口方法（5.中的内容）封装成api进行调用（因为有很多vue页面都要用到接口调用，
一旦要改变接口，找到要改的地方会很繁琐，所以所有接口请求的方法都放到同一个文件中，有利于后期修改）

- 6.1 在src下建api文件夹，在api文件夹下新建api.js文件
```js
// api.js
//项目中我们大多数都会把对应的接口请求封装成api来调用
import service from '../service.js'


//登录接口
export function login(data) {
    return service({
        method: 'post',
        url: '/login',
        data
    })
}
```
- 6.2 将login导入Login.vue中，将原来的一次封装换成二次封装
```vue
        if(valid){
                console.log(this.form);
                login(this.form).then(res =>{
                    if(res.data.status === 200){
                    setToken('username',res.data.username)
                    setToken('token',res.data.token)
                    this.$message({message:res.data.message, type: 'success'})
                    this.$router.push('/home')
                  }
                  console.log(res);
                })
            }else{
                console.err(this.form);
            }
```

### 404页面编写
编写好vue页面后，去router的index.js配置404路由

### 主页编写
1. 在components文件夹下面建一个common文件夹，放公共文件（Header.vue,Footer.vue,Menu.vue）
 
2. 把Header,Footer,Menu页面全部导入Home.vue 页面中

3. 在Home页面编写布局容器（Element-ui）,包含头部，菜单，底部，内容，要对样式进行一些修改

4. 借助element-ui编写Header,Footer,Menu

### 编写所有页面的路由
1. 编写全部页面路由

2. 在菜单栏页面（Menu.vue ）使得菜单栏与路由名匹配

3. 编写面包屑（面包屑路径名与路由名相匹配）

### 编写学生列表
1. 使用element-ui ，编写表格布局

2. 封装学生列表查询接口到api.js中，封装一个getData方法来调用封装的接口，并在created中调用getData(即页面一创建就调用查询学生信息的接口)

3. 添加分页

4. 根据接口文档封装删除学生列表接口到api.js中，在studentList.vue中编写删除方法

5. 编写查询和重置行内表单，这里调用的接口仍是之前封装的学生列表查询接口

### 编写信息列表
1. 基本布局（大致和学生列表一致）
2. 操作栏有修改和删除事件
3. 新增和修改事件（点击新增或修改按钮，会弹出同一个对话框，实现信息列表的数据新增或修改）
4. 信息列表查询接口封装，再放入getData方法里，并在created中调用，封装到getData里是因为后期修改、删除、新增后都要再次调用查询接口，便于后期调用，只需写getData()
5. 新增和修改封装在同一个接口（请求方法做判断 post还是put）
6. 信息列表删除接口封装

### 编写信息管理
1. 表格方法的封装
2. 新增修改的封装
3. 删除方法的封装
4. 一行代码实现增删改查
5. 重点：对表格进行了增删改查封装复用，使得在.vue页面中一行代码就可以实现增删改查
 
### 后续页面编写与上个页面编写雷同
### 地图页面编写
主要用到了可视化数据（echarts）
