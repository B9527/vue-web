<template>
  <div>
      <NavComponent></NavComponent>
      <div>
          <div class="col-lg-8" style="border:1px solid #DDDDDD;margin-bottom: 100px;margin-left:10%">
                <form id="reader_table_id">
                    <div class="" style="text-align: center">
                        <h2>Writer Data</h2>
                    </div>
                    <div class="form-group row" style="">
                        <label for="input_database" class="col-sm-2 col-form-label">Database:</label>
                        <div class="col-sm-10">
                            <input name="database" class="form-control" id="input_database" v-model="writer.Database">
                        </div>
                        <label for="input_table" class="col-sm-2 col-form-label">Table:</label>
                        <div class="col-sm-10" style="margin_bottom:20px">
                            <input name="table" class="form-control" id="input_table" v-model="writer.Table">
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
                            <tbody id="reader_content" v-for="(writer_field, index) in writer.writer_fields" :key='writer_field.order'> 
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
                    </div>
                    <el-button type="primary" @click="WriterAdd">新增</el-button>
                    <el-button type="success" @click="WriterSave">保存</el-button>
                </form>
          </div>
      </div>
  </div>    
</template>

<script>
import NavComponent from '@/components/nav_component'
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
                alert("loaddata");
            },
            WriterDelete(index){
               this.writer.writer_fields.splice(index, 1);  
            },
            WriterSave(){
                let return_obj = {};
                return_obj.Table = this.writer.Table;
                return_obj.Database = this.writer.Database;
                return_obj.read_fields = this.writer.writer_fields;
                console.log(JSON.stringify(return_obj));
            },
            WriterAdd(){
                let add_item =  {"type": "", "name": "", "order": this.writer.writer_fields.length +1 }
                this.writer.writer_fields.push(add_item);
            }
        },
        data() {
            return {
                "writer": {
                    "Table": "Car_AAA_Crim_driverviolations",
                    "writer_fields": [
                        {
                            "type": "string",
                            "name": "illegal_num",
                            "order": 1
                        },
                        {
                            "type": "string",
                            "name": "written_decision_type",
                            "order": 2
                        },
                        {
                            "type": "string",
                            "name": "authenticate_report_num",
                            "order": 3
                        },
                        {
                            "type": "string",
                            "name": "written_decision_parity_bit",
                            "order": 4
                        },
                        {
                            "type": "string",
                            "name": "personnel_classify",
                            "order": 5
                        },
                        {
                            "type": "string",
                            "name": "driver_license_number",
                            "order": 6
                        },
                        {
                            "type": "string",
                            "name": "archive_num",
                            "order": 7
                        },
                        {
                            "type": "string",
                            "name": "issue_authority",
                            "order": 8
                        },
                        {
                            "type": "string",
                            "name": "allow_drivering_type",
                            "order": 9
                        },
                        {
                            "type": "string",
                            "name": "receiver",
                            "order": 10
                        },
                        {
                            "type": "string",
                            "name": "residence_district_code",
                            "order": 11
                        },
                        {
                            "type": "string",
                            "name": "real_detailed_address",
                            "order": 12
                        },
                        {
                            "type": "string",
                            "name": "phone",
                            "order": 13
                        },
                        {
                            "type": "string",
                            "name": "contact_way",
                            "order": 14
                        },
                    ],
                    "Database": "raw"
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

