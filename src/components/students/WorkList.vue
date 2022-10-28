<template>
  <div class="workList">
   <el-table
    :data="tableData"
    border
    v-loading="loading"
    style="width: 100%; font-size:12px" >
     <el-table-column prop="id" label="用户ID" align="center"></el-table-column>
     <el-table-column prop="userId" label="所属班级" align="center"></el-table-column>
     <el-table-column prop="title" label="作业名称" align="center"></el-table-column>
     <el-table-column prop="completed_text" label="完成情况" align="center"></el-table-column> 
  </el-table>
      <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="page"
            :page-sizes="[5, 10, 20,50,100]"
            :page-size="size"
            layout="total, sizes, prev, pager, next, jumper"
            :total="total">
      </el-pagination>
  </div>
</template>

<script>
import {getTableData} from "@/utils/table"
export default {
  data(){
    return {
      tableData:[],
      page:1,//当前页数
      size:10,//每页显示条数
      total:0,//总条数
      loading:true
    }
  },
  created(){
    getTableData(this,'/works',{page: this.page, size: this.size},['completed'])
  },
  methods: {
     handleSizeChange(val) {
        this.size = val
        this.page = 1
        getTableData(this,'/works',{page: this.page, size: val},['completed'])
        
      },
      handleCurrentChange(val) {
        this.page = val
        getTableData(this,'/works',{page: val, size: this.size},['completed'])
      },
  }
}
</script>

<style lang="scss">
  .workList{
    .el-pagination{
      text-align: left;
      margin-top: 20px;
    }
  }
</style>