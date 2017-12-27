<<template>
  <div>
          <div class="col-lg-8" style="border:1px solid #DDDDDD;margin-bottom: 100px;margin-left:10%">
                <form id="reader_table_id">
                    <div class="" style="text-align: center">
                        <input name="database" class="form-control" id="input_database" v-model="tableData.table_comment">
                    </div>
                    <div class="form-group row" style="">
                        <label for="input_database" class="col-sm-2 col-form-label">Database:</label>
                        <div class="col-sm-10">
                            <input name="database" class="form-control" id="input_database" v-model="tableData.database">
                        </div>
                        <label for="input_table" class="col-sm-2 col-form-label">Table:</label>
                        <div class="col-sm-10">
                            <input name="table" class="form-control" id="input_table" v-model="tableData.table">
                        </div>
                        <table class="table table-striped" id="clean_config_reader_writer">
                            <thead class="thead">
                                <tr>
                                    <th>序列</th>
                                    <th>字段名</th>
                                    <th>类型</th>
                                    <th>option</th>
                                </tr>
                            </thead>
                            <tbody id="reader_content" v-for="(read_field, index) in tableData.fields" :key='read_field.order'> 
                                <tr >
                                    <td><p type="text" style="width: 60px">{{index + 1}}</p></td>
                                    <td><el-input  v-model="read_field.name" type="text" ></el-input></td>
                                    <td><el-select v-model="read_field.type" placeholder="请选择类型">
                                            <el-option
                                            v-for="item in formInline.options"
                                            :key="item.value"
                                            :label="item.label"
                                            :value="item.value">
                                            </el-option>
                                        </el-select>
                                    </td>
                                    <td><el-button type="danger" @click="ReaderDelete(index)">删除</el-button></td>
                                </tr>
                            </tbody>
                        </table>
                        <el-button type="primary" @click="ReaderAdd" style="margin-left:40%">新增</el-button>
                        <el-button type="success" @click="ReaderSave" style="margin-left:5%">保存</el-button>
                    </div>
                    
                </form>
          </div>
      </div>
</template>
<script>
 import { HiveTableList } from '../api/api';
  export default {
    data() {
      return {
        tableData: 
             {
                "table": "Person_AAA_Info_policeman9",
                "table_comment": "警员信息9",
                "database": "raw",
                 "fields": [
                    {
                        "column": "nation",
                        "time_format": null,
                        "column_index": 24,
                        "column_type": "string",
                        "column_comment": "国籍"
                    },
                    {
                        "column": "order_time",
                        "time_format": null,
                        "column_index": 23,
                        "column_type": "string",
                        "column_comment": "订票时间"
                    }]
             },
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
            console.log(index, row);
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
