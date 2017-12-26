<template>
  <div>
      <NavComponent></NavComponent>
      <div>
          <div class="col-lg-8" style="border:1px solid #DDDDDD;margin-bottom: 100px;margin-left:10%">
                <form id="reader_table_id">
                    <div class="" style="text-align: center">
                        <h2>Success Writer Data</h2>
                    </div>
                    <div class="form-group row" style="">
                        <label for="input_database" class="col-sm-2 col-form-label">Database:</label>
                        <div class="col-sm-10">
                            <input name="database" class="form-control" id="input_database" v-model="writer.database">
                        </div>
                        <label for="input_table" class="col-sm-2 col-form-label">Table:</label>
                        <div class="col-sm-10" style="margin_bottom:20px">
                            <input name="table" class="form-control" id="input_table" v-model="writer.table">
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
                            <tbody id="reader_content" v-for="(writer_field, index) in writer.fields" :key='writer_field.order'> 
                                <tr >
                                    <td><p type="text" style="width: 60px">{{index + 1}}</p></td>
                                    <td><el-input  v-model="writer_field.name" type="text" ></el-input></td>
                                    <td><el-select v-model="writer_field.type" placeholder="请选择类型">
                                            <el-option
                                            v-for="item in formInline.options"
                                            :key="item.value"
                                            :label="item.label"
                                            :value="item.value">
                                            </el-option>
                                        </el-select>
                                    </td>
                                     <td><el-button type="danger" @click="WriterDelete(index)">删除</el-button></td>
                                </tr>
                            </tbody>
                        </table>
                        <el-button type="primary" @click="WriterAdd" style="margin-left:40%">新增</el-button>
                        <el-button type="success" @click="WriterSave" style="margin-left:5%">保存</el-button>
                    </div>
                    
                </form>
          </div>
      </div>
  </div>    
</template>

<script>
    import NavComponent from '@/components/nav_component';
    import { CleanDetailGet } from '../api/api';
    import { CleanDetailPost } from '../api/api';
    export default {
          components: {
              NavComponent,
        },
        mounted: function() {
            this.$nextTick(function () {
              this.LoadData();
            })
        },
        methods: {
            LoadData(){
                CleanDetailGet({params:{id: this.$route.query.id,}}).then(data => {
                  let { msg, code, result } = data;
                  if (code !== 200) {
                    this.$message({
                    message: msg,
                    type: 'error',
                    });
                  } else {
                    this.writer = result.writer;
                  }
                      });
            },
            WriterDelete(index){
               this.writer.fields.splice(index, 1);  
            },
            WriterSave(){
                let return_obj = this.writer;
                let formData = new FormData();
                formData.append('writer', JSON.stringify(return_obj));
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
            WriterAdd(){
                let add_item =  {"type": "", "name": "", "order": this.writer.fields.length +1 }
                this.writer.fields.push(add_item);
            }
        },
        data() {
            return {
                "writer": {
                },
                "formInline":{
                    options:[
                        {
                        'label':'int',
                        'value':'int'
                        },
                        {
                        'label':'bigint',
                        'value':'bigint'
                        },
                        {
                        'label':'double',
                        'value':'double'
                        },
                        {
                        'label':'date',
                        'value':'date'
                        },
                        {
                        'label':'timestamp',
                        'value':'timestamp'
                        },
                    
                    ],
                }    
            }
        }      
    }
</script>

<style scoped>

</style>

