<template>
<div style="margin-top:5%">
    <el-button @click="DeleteSelection" >删除</el-button>
    <el-button @click="SubmitSelection">执行</el-button>
  <el-table :data="tableData" style="width: 100%" border :row-class-name="tableRowClassName" element-loading-text="拼命加载中"
  show-overflow-tooltip  @selection-change="handleSelectionChange" slot="empty" @row-dblclick="dataGotoDetail">
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
  import { deleteTaskList } from '../api/api';
  import { ChangeStatusSubmit } from '../api/api'
  export default {
    data() {
      return {
        tableData: [
        //   {'file_name':'name', 'read_table':'read_table', 'status':'upload', "id":1},
        //   {'file_name':'name', 'read_table':'read_table', 'status':'success', "id":2},
        //   {'file_name':'name', 'read_table':'read_table', 'status':'execting', "id":3},
        //   {'file_name':'name', 'read_table':'read_table', 'status':'submit', "id":4},
        //   {'file_name':'name', 'read_table':'read_table', 'status':'fail', "id":5}

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
                    this.tableData = result.task_list;
                  }
                      });
                })
            },
    methods: {
      filterTag(value, row) {
        return row.status === value;
      },
      indexMethod(index) {
		  
        return index + 1;
    
      },
      tableRowClassName({row, rowIndex}) {
        if (row.status === 'fail') {
          return 'fail-row';
        } else if (row.status === 'success') {
          return 'success-row';
        } else if (row.status === 'execting') {
          return 'warning-row';
        } else if (row.status === 'submit') {
          return 'info-row';
        }
        return '';
      },
       handleSelectionChange(val) {
        this.multipleSelection = val;
        console.log(this.multipleSelection);
      },
      DeleteSelection() {
		var dele_data_list = this.multipleSelection;
		var request_delete_list = [];
		for (var i=0; i<dele_data_list.length;i++){
			request_delete_list.push(dele_data_list[i].id)
			for (var j=0;j<this.tableData.length;j++){
				if (this.tableData[j] ===dele_data_list[i]){
					console.log(j);
					this.tableData.splice(j,1);
				}
			}

		}
		let formData = new FormData();
		formData.append('request_delete_list',JSON.stringify(request_delete_list));
		deleteTaskList(formData).then(data => {
                  let { msg, code, result } = data;
                  if (code !== 200) {
                    this.$message({
                    message: msg,
                    type: 'error',
                    });
                  } else {
                    this.$message({
					message: msg,
					type: 'success',
					});
                  }
            });
      },
      SubmitSelection() {
        var submit_data_list = this.multipleSelection;
		var request_submit_list = [];
		for (var i=0; i<submit_data_list.length;i++){
			request_submit_list.push(submit_data_list[i].id)
			for (var j=0;j<this.tableData.length;j++){
				if (this.tableData[j] ===submit_data_list[i]){
					this.tableData[j].status = 'submit';
				}
			}
		}
		let formData = new FormData();
		formData.append('request_submit_list',JSON.stringify(request_submit_list));
		ChangeStatusSubmit(formData).then(data => {
                  let { msg, code, result } = data;
                  if (code !== 200) {
                    this.$message({
                    message: msg,
                    type: 'error',
                    });
                  } else {
                    this.$message({
					message: msg,
					type: 'success',
					});
                  }
            });
	  },
	  dataGotoDetail(row){
          function contains(arr, obj) {
          var i = arr.length;
          while (i--) {
            if (arr[i] === obj) {
              return true;
            }
          }
          return false;
          }
          var task_id = row.id;
          var task_status = row.status;
          var status_arry = ['execting', 'success', 'fail'];
          var router_string = "/task_detail?id=" +task_id;
          if (contains(status_arry, task_status)){
			this.$router.push(router_string);
          } else {
			this.$message({
				message:"执行中的,执行过的任务才有任务详情!",
				type:"error",
			});
          }
	  },
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