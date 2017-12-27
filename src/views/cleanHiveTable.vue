<template>
<div>
    <div style="">
        <span style="float:left; margin-left:5%"><b>database: </b><el-input style="width:160px;" v-model="search_database"></el-input></span>
        <span style="float: left;margin-left:5%"><b>table: </b><el-input style="width:160px;" v-model="search_table"></el-input></span>
        <el-button type="primary" icon="el-icon-search" style="float: left;margin-left:7%" @click="GoSearch">搜索</el-button>
        <br/>
    </div>
    <div style="margin:50px;text-align:center ">
        <h3>Hive Table Info List</h3>
        <el-table
            :data="tableData" border  stripe
            style="width: 100%;" >
            <el-table-column type="index" :index="indexMethod" label="index" width="60" >
            </el-table-column>
            <el-table-column prop="database" label="database">
            </el-table-column>
            <el-table-column label="table" >
                <template slot-scope="scope">
                    <el-popover trigger="hover" placement="top">
                        
                        <el-table :data="scope.row.fields" border  stripe style="width: 800px;">
                            <el-table-column prop="column_index" label="column_index">
                            </el-table-column>
                            <el-table-column prop="column" label="column">
                            </el-table-column>
                            <el-table-column prop="column_type" label="column_type">
                            </el-table-column>
                            <el-table-column prop="column_comment" label="column_comment">
                            </el-table-column>
                        </el-table>
                        
                    <div slot="reference" class="name-wrapper">
                        <el-tag size="medium">{{ scope.row.table }}</el-tag>
                    </div>
                    </el-popover>
                </template>
            </el-table-column>
            <el-table-column prop="table_comment" label="table_comment" >
            </el-table-column>
            <el-table-column label="操作">
                <template slot-scope="scope">
                    <el-button
                    size="mini"
                    @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                    <el-button
                    size="mini"
                    type="danger"
                    @click="handleDelete(scope.$index, scope.row)">清洗</el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
     <div class="block" style="margin-top:20px;margin-bottom:10px;">
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="[10, 20, 50, 100]"
      :page-size="pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total">
    </el-pagination>
  </div>
  </div>
</template>

<script>
 import { HiveTableList } from '../api/api';
 import { HiveTableToCleanTask } from '../api/api';
  export default {
    data() {
      return {
        tableData: [
            //  {
            //     "table": "Person_AAA_Info_policeman9",
            //     "table_comment": "警员信息9",
            //     "database": "raw",
            //      "fields": [
            //         {
            //             "column": "nation",
            //             "time_format": null,
            //             "column_index": 24,
            //             "column_type": "string",
            //             "column_comment": "国籍"
            //         },
            //         {
            //             "column": "order_time",
            //             "time_format": null,
            //             "column_index": 23,
            //             "column_type": "string",
            //             "column_comment": "订票时间"
            //         }]
            // },
            // {
            //     "table": "Person_AAA_Info_policeman9",
            //     "table_comment": "警员信息9",
            //     "database": "raw",
            //      "fields": [
            //         {
            //             "column": "nation",
            //             "time_format": null,
            //             "column_index": 24,
            //             "column_type": "string",
            //             "column_comment": "国籍"
            //         },
            //         {
            //             "column": "order_time",
            //             "time_format": null,
            //             "column_index": 23,
            //             "column_type": "string",
            //             "column_comment": "订票时间"
            //         }]
            // },
        ],
        currentPage: 1,
        pageSize: 20,
        total:4,
        search_database: "",
        search_table: ""
      }
    },
    mounted: function() {
            this.$nextTick(function () {
               this.loadData();
                })
            },
    methods: {
        loadData(){
            HiveTableList({params:{pageNum:this.currentPage, pageSize:this.pageSize,search_database:this.search_database,search_table:this.search_table}}).then(data => {
						      //NProgress.done();
                  let { msg, code, result } = data;
                  if (code !== 200) {
                    this.$message({
                    message: msg,
                    type: 'error',
                    });
                  } else {
                    this.tableData = result.table_list;
                    this.total = result.total

                  }
                      });
        },
        indexMethod(index) {
            var base_bum = (this.currentPage-1)*(this.pageSize);
            return index + 1 + base_bum;
    
        },
        handleEdit(index, row) {
            let database = row.database;
            let table = row.table;
            let url_path = "/editeditHiveTable?database="+database+"&table="+table;
            this.$router.push(url_path);
        },
        handleDelete(index, row) {
            let database = row.database;
            let table = row.table;
            let formData = new FormData();
            formData.append('database', database);
            formData.append('table', table);
            let postParams = formData

            HiveTableToCleanTask(postParams).then(data => {
						      //NProgress.done();
                  let { msg, code, result } = data;
                  if (code !== 200) {
                    this.$message({
                    message: msg,
                    type: 'error',
                    });
                  } else {
                    let clean_task_id = result.id
                    let url_path = "/settingCleanReader?id=" + clean_task_id;
                    this.$router.push(url_path);
                  }
                      });
        },
        handleSizeChange(val) {
            this.pageSize = val;
            this.loadData();
        },
        handleCurrentChange(val) {
            this.currentPage = val;
            this.loadData();
        },
        GoSearch(){
            this.pageNum = 1;
            this.loadData();
        },
    }
  }
</script>