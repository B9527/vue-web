<template>
  <div>
      <NavComponent></NavComponent>
      <div>
          <div class="col-lg-8" style="border:1px solid #DDDDDD;min-height:800px;margin-bottom: 100px;margin-left:10%">
                <form id="reader_table_id">
                    <div class="" style="text-align: center">
                        <h2>Reader Data</h2>
                    </div>
                    <div class="form-group row" style="">
                        <label for="input_database" class="col-sm-2 col-form-label">Database:</label>
                        <div class="col-sm-10">
                            <input name="database" class="form-control" id="input_database" v-model="reader.Database">
                        </div>
                        <label for="input_table" class="col-sm-2 col-form-label">Table:</label>
                        <div class="col-sm-10" style="margin_bottom:20px">
                            <input name="table" class="form-control" id="input_table" v-model="reader.Table">
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
                            <tbody id="reader_content" v-for="read_field in reader.read_fields" :key='read_field.order'> 
                                <tr >
                                    <td><el-input type="text" v-model="read_field.order" id="order_id" style="width: 40px"></el-input></td>
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
                                    <td><el-button type="danger">删除</el-button></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <br/>
                     <el-button type="primary">新增</el-button>
                     <el-button type="success">保存</el-button>
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
               console.log('ready');
            })
      },
        data() {
            return {
                "reader": {
                    "Table": "Car_AAA_Crim_driverviolations",
                    "read_fields": [
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
                        {
                            "type": "string",
                            "name": "dispose_classify",
                            "order": 15
                        },
                        {
                            "type": "string",
                            "name": "plate_type_code",
                            "order": 16
                        },
                        {
                            "type": "string",
                            "name": "plate_num",
                            "order": 17
                        },
                        {
                            "type": "string",
                            "name": "vehicle_owner",
                            "order": 18
                        },
                        {
                            "type": "string",
                            "name": "using_property",
                            "order": 19
                        },
                        {
                            "type": "string",
                            "name": "transport_way",
                            "order": 20
                        },
                        {
                            "type": "string",
                            "name": "illegal_time",
                            "order": 21
                        },
                        {
                            "type": "string",
                            "name": "illegal_place",
                            "order": 22
                        },
                        {
                            "type": "string",
                            "name": "illegal_adress",
                            "order": 23
                        },
                        {
                            "type": "string",
                            "name": "illegal_act",
                            "order": 24
                        },
                        {
                            "type": "string",
                            "name": "illegal_score",
                            "order": 25
                        },
                        {
                            "type": "string",
                            "name": "forfeit",
                            "order": 26
                        },
                        {
                            "type": "string",
                            "name": "measured_value",
                            "order": 27
                        },
                        {
                            "type": "string",
                            "name": "standard_value",
                            "order": 28
                        },
                        {
                            "type": "string",
                            "name": "overdue_fine",
                            "order": 29
                        },
                        {
                            "type": "string",
                            "name": "duty_police",
                            "order": 30
                        },
                        {
                            "type": "string",
                            "name": "pay_money_way",
                            "order": 31
                        },
                        {
                            "type": "string",
                            "name": "discover_organ",
                            "order": 32
                        },
                        {
                            "type": "string",
                            "name": "discover_organ_name",
                            "order": 33
                        },
                        {
                            "type": "string",
                            "name": "dispose_result",
                            "order": 34
                        },
                        {
                            "type": "string",
                            "name": "dispose_dept_name",
                            "order": 35
                        },
                        {
                            "type": "string",
                            "name": "punish_type",
                            "order": 36
                        },
                        {
                            "type": "string",
                            "name": "update_dispose_time",
                            "order": 37
                        },
                        {
                            "type": "string",
                            "name": "pay_money_flag",
                            "order": 38
                        },
                        {
                            "type": "string",
                            "name": "pay_money_date",
                            "order": 39
                        },
                        {
                            "type": "string",
                            "name": "origin_certificate_num",
                            "order": 40
                        },
                        {
                            "type": "string",
                            "name": "rejection_flag",
                            "order": 41
                        },
                        {
                            "type": "string",
                            "name": "record_type",
                            "order": 42
                        },
                        {
                            "type": "string",
                            "name": "entry_person",
                            "order": 43
                        },
                        {
                            "type": "string",
                            "name": "regist_time",
                            "order": 44
                        },
                        {
                            "type": "string",
                            "name": "operator1",
                            "order": 45
                        },
                        {
                            "type": "string",
                            "name": "operator2",
                            "order": 46
                        },
                        {
                            "type": "string",
                            "name": "incident_level",
                            "order": 47
                        },
                        {
                            "type": "string",
                            "name": "dispose_object_flag",
                            "order": 48
                        },
                        {
                            "type": "string",
                            "name": "forwarded_record_flag",
                            "order": 49
                        },
                        {
                            "type": "string",
                            "name": "source",
                            "order": 50
                        },
                        {
                            "type": "string",
                            "name": "write_model",
                            "order": 51
                        },
                        {
                            "type": "string",
                            "name": "leading-in_database_flag",
                            "order": 52
                        },
                        {
                            "type": "string",
                            "name": "remission_overdue_fine_flag",
                            "order": 53
                        },
                        {
                            "type": "string",
                            "name": "forwarded_flag",
                            "order": 54
                        },
                        {
                            "type": "string",
                            "name": "accept_office",
                            "order": 55
                        },
                        {
                            "type": "string",
                            "name": "occur_course",
                            "order": 56
                        },
                        {
                            "type": "string",
                            "name": "update_time",
                            "order": 57
                        },
                        {
                            "type": "string",
                            "name": "comments",
                            "order": 58
                        },
                        {
                            "type": "string",
                            "name": "business_check_digit",
                            "order": 59
                        },
                        {
                            "type": "string",
                            "name": "etl_id",
                            "order": 60
                        },
                        {
                            "type": "string",
                            "name": "etl_date",
                            "order": 61
                        },
                        {
                            "type": "string",
                            "name": "first_insert_police",
                            "order": 62
                        }
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

