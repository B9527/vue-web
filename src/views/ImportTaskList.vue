<template>
<div style="margin-top:5%">
  <el-table :data="tableData" style="width: 100%" border>
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
	<el-table-column prop="status" label="status">
    </el-table-column>





    <el-table-column prop="tag" label="标签" width="100"
      :filters="[{ text: '家', value: '家' }, { text: '公司', value: '公司' }]"
      :filter-method="filterTag"
      filter-placement="bottom-end">
      <template slot-scope="scope">
        <el-tag
          :type="scope.row.tag === '家' ? 'primary' : 'success'"
          close-transition>{{scope.row.tag}}</el-tag>
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
        tableData: []
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
      formatter(row, column) {
        return row.address;
      },
      filterTag(value, row) {
        return row.tag === value;
	  },
	  indexMethod(index) {
        return index + 1 ;
	  },
    }
  }
</script>