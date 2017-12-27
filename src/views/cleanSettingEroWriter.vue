<template>
  <div>
      
      <div>
          <div style="margin-bottom:50px;">
          <span style="float:left; margin-left:10%"> <el-button type="primary" round  @click="routerBack">上一步</el-button></span>
          <span style="margin-left:30%;"> <el-button type="success" round  @click="SetComplete">完成</el-button></span>
          </div>
          <div class="col-lg-8" style="border:1px solid #DDDDDD;margin-bottom: 100px;margin-left:10%">
                <form id="reader_table_id">
                    <div class="" style="text-align: center; margin-bottom:50px">
                        <h2>Reader Data</h2>
                    </div>
                    <div class="form-group row" style="">
                        <label for="input_database" class="col-sm-2 col-form-label">Database:</label>
                        <div class="col-sm-10">
                            <input name="database" class="form-control" id="input_database" v-model="reader.database">
                        </div>
                        <label for="input_table" class="col-sm-2 col-form-label">Table:</label>
                        <div class="col-sm-10">
                            <input name="table" class="form-control" id="input_table" v-model="reader.table">
                        </div>
                        <table class="table table-striped" id="clean_config_reader_writer">
                            <thead class="thead">
                                <tr>
                                    <th>序列</th>
                                    <th>字段</th>
                                    <th>名称</th>
                                    <th>option</th>
                                </tr>
                            </thead>
                            <tbody id="reader_content" v-for="(read_field, index) in reader.fields" :key='read_field.order'> 
                                <tr >
                                    <td><p type="text" style="width: 60px">{{index + 1}}</p></td>
                                    <td><el-input  v-model="read_field.name" type="text" ></el-input></td>
                                     <td><el-input  v-model="read_field.comment" type="text" ></el-input></td>
                                    
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
  </div>    
</template>

<script>
    import { CleanDetailGet } from '../api/api';
    import { CleanDetailPost } from '../api/api';
    export default {
          components: {
              
        },
        mounted: function() {
            this.$nextTick(function () {
              this.loadData();
            })
        },
        methods: {
             loadData(){
                CleanDetailGet({params:{id: this.$route.query.id,}}).then(data => {
                  let { msg, code, result } = data;
                  if (code !== 200) {
                    this.$message({
                    message: msg,
                    type: 'error',
                    });
                  } else {
                    this.reader = result.reader;
                  }
                      });
            },
            ReaderDelete(index){
               this.reader.fields.splice(index, 1);  
            },
            ReaderSave(){
                let return_obj = this.reader;
                let formData = new FormData();
                formData.append('reader', JSON.stringify(return_obj));
                formData.append('id', this.$route.query.id)
                CleanDetailPost(formData).then(data =>{
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
            ReaderAdd(){
                let add_item =  {"type": "", "name": "", "order": this.reader.fields.length +1 }
                this.reader.fields.push(add_item);
            },
            routerBack(){
                this.$router.go(-1);
            },
            SetComplete(){
                this.$router.push('/cleanTaskList');
            }
        },
        data() {
            return {
                "reader": {
                
                },   
            }
        }      
    }
</script>

<style scoped>

</style>

