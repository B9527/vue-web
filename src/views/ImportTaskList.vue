<template>
<div style="margin-top:5%">
    <el-button @click="DeleteSelection" >删除</el-button>
    <el-button @click="SubmitSelection">执行</el-button>
  <el-table :data="tableData" style="width: 100%" border :row-class-name="tableRowClassName"
  show-overflow-tooltip  @selection-change="handleSelectionChange">
    <el-table-column
      type="selection"
      width="55">
    </el-table-column>
    <el-table-column type="index" :index="indexMethod" label="index" width="60">
    </el-table-column>
    <el-table-column prop="file_name" label="file_name" width="100">
    </el-table-column>
    <el-table-column prop="read_table" label="read_table">
    </el-table-column>
	 <el-table-column prop="write_table" label="write_table">
    </el-table-column>
	<el-table-column prop="start_time" label="start_time">
    </el-table-column>
	<el-table-column prop="finish_time" label="finish_time">
    </el-table-column>
	<!-- <el-table-column prop="status" label="status">
    </el-table-column> -->





    <el-table-column prop="tag" label="status" width="100"
      :filters="[
          { text: 'upload', value: 'upload' }, 
          { text: 'submit', value: 'submit' },
          { text: 'execting', value: 'execting' },
          { text: 'fail', value: 'fail' },
          { text: 'success', value: 'success' },
      
      ]"
      :filter-method="filterTag"
      filter-placement="bottom-end">
      <template slot-scope="scope">
        <el-tag
          type=""
          close-transition>{{scope.row.status}}</el-tag>
      </template>
    </el-table-column>  
  </el-table>
</div>
</template>

<script>
  import { getTaskList } from '../api/api';
  export default {
    data() {
      return {
        tableData: [
          {'file_name':'name', 'read_table':'read_table', 'status':'upload', "id":1},
          {'file_name':'name', 'read_table':'read_table', 'status':'success', "id":2},
          {'file_name':'name', 'read_table':'read_table', 'status':'execting', "id":3},
          {'file_name':'name', 'read_table':'read_table', 'status':'submit', "id":4},
          {'file_name':'name', 'read_table':'read_table', 'status':'fail', "id":5}

        ],
         multipleSelection: []
      }
	},
	mounted: function() {
            this.$nextTick(function () {
                getTaskList().then(data => {
						      //NProgress.done();
                  let { msg, code, result } = data;
                  if (code !== 200) {
                    this.$message({
                    message: msg,
                    type: 'error',
                    });
                  } else {
                    this.tableData = result.task_list
                  }
                      });
                })
            },
    methods: {
      filterTag(value, row) {
        return row.status === value;
      },
      indexMethod(index) {
          function contains(arr, obj) {
          var i = arr.length;
          while (i--) {
            if (arr[i] === obj) {
              return true;
            }
          }
          return false;
          }
          var task_id = this.tableData[index].id
          var task_status = this.tableData[index].status
          var status_arry = ['execting', 'success', 'fail']
          var string = "/task_detail?id=" +task_id
          if (contains(status_arry, task_status)){
          return  <router-link to = {string}>{index + 1}</router-link>
          } else {
             return index + 1
          }
      },
      tableRowClassName({row, rowIndex}) {
        if (row.status === 'fail') {
          return 'fail-row';
        } else if (row.status === 'success') {
          return 'success-row';
        } else if (row.status === 'execting') {
          return 'warning-row'
        } else if (row.status === 'submit') {
          return 'info-row'
        }
        return '';
      },
       handleSelectionChange(val) {
        this.multipleSelection = val;
        // console.log(this.multipleSelection)
      },
      DeleteSelection() {
        console.log(this.multipleSelection)
      },
      SubmitSelection() {
        console.log(this.multipleSelection)
      }

    }
  }
</script>

<style>
  .el-table .warning-row {
    background: oldlace;
  }

  .el-table .success-row {
    background: #f0f9eb;
  }
  .el-table .info-row {
    background: #ECF5FF;
  }
  .el-table .fail-row {
    background: #FEF0F0;
  }
  .el-button {
    float: left;
  }
</style>