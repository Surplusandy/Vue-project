//获取表格数据
export function getData(root,url,params){
    root.service.get(url,{params: params || {}})
    .then(res =>{
        if(res.data.status === 200){
            root.tableData = res.data.data
            root.total = res.data.total
        }
    })
    .catch(err =>{
        throw err
    })
}

//新增和修改方法的封装
import qs from 'qs'
export function changeInfo(root, method, url, form, callback) {
    let data = qs.stringify(form)
    root.service[method](url, data)
        .then(res => {
            if (res.data.status === 200) {
                callback(root, url)
                root.dialogFormVisible = false
                root.$refs['form'].resetFields()
                root.$message({ type: 'success', message: res.data.message })
            }
        })
        .catch(err => {
            throw err
        })
}

// 删除封装
export function delData(root,url,id,callFun){
    root.$alert('你确定要删除吗?','提示',{
        confirmButtonText:'确定',
        callback:()=>{
          this.service.delete(`${url}/${id}}`).then(res =>{
            if(res.status === 200){
                callFun(root,url)
                root.$message({message:res.data.message,type:'success'})
              }
          })
          .catch(err =>{
            throw err
          })
        }
       })

}


//作业列表获取表格数据方法的封装
//arr是要转换的字段
export function getTableData(root,url,params,arr){
    root.service.get(url,{params: params || {}})
    .then(res =>{
        if(res.data.status === 200){
            root.tableData = res.data.data
            root.total = res.data.total
            //遍历
            root.tableData.map(item =>{
                arr.map(aItem =>[
                    item[aItem] ? item[aItem + '_text'] = '是' : item[aItem + '_text'] = '否'
                ])
            })
            root.loading = false
        }
    })
    .catch(err =>{
        throw err
    })
}