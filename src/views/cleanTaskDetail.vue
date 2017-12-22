<template>

  <div>
      <NavComponent></NavComponent>
      <div>
          <div class="col-lg-4" style="float: left;border:1px solid #DDDDDD;min-height:800px;margin-bottom: 100px;">
                <form id="reader_table_id">
                    <div class="" style="text-align: center">
                        <h2>Source Data</h2>
                    </div>
                    <div class="form-group row">
                        <label for="input_database" class="col-sm-2 col-form-label">Database:</label>
                        <div class="col-sm-10">
                            <input name="database" class="form-control" id="input_database" v-model="reader.Database">
                        </div>
                        <label for="input_table" class="col-sm-2 col-form-label">Table:</label>
                        <div class="col-sm-10">
                            <input name="table" class="form-control" id="input_table" v-model="reader.Table">
                        </div>
                        <br/>
                        <table class="table table-striped" id="clean_config_reader_writer">
                            <thead class="thead">
                                <tr>
                                    <th>序列</th>
                                    <th>字段名</th>
                                    <th>类型</th>
                                    <th>option</th>
                                </tr>
                            </thead>
                            <tbody id="reader_content" v-for="read_field in reader.read_fields" :key=''> 
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
          <div class="col-lg-4" style="float: left;border:1px solid #DDDDDD;min-height:800px;margin-bottom: 100px;">
                <form id="writer_table_id">
                    <div class="" style="text-align: center"><h2>Map Dict</h2></div>
                        <div class="form-group row" >
                            <div style="width: 50%;float: left;margin-top: 75px;">
                                <table class="table table-striped" id="reader_map_list_key">
                                    <thead class="thead" >
                                        <tr>
                                            <th>Option</th>
                                            <th>KEY</th>
                                            </tr>
                                            </thead>
                                    <tbody id="map_content_key" class="map_content" v-for="map_ in map_list" :key="">
                                        <tr>
                                            <td><i class="material-icons" >add_box</i><i class="material-icons">remove_circle</i>
                                            </td>
                                            <td><el-input  v-model="map_.src_name" type="text" ></el-input></td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <div style="width: 50%; float: left; margin-top: 75px">
                                <table class="table table-striped" id="reader_map_list_val">
                                    <thead class="thead">
                                        <tr>
                                        <th>VALUE</th>
                                        <th>Option</th>
                                        </tr>
                                    </thead>
                                    <tbody id="map_val_content" class="map_content" v-for="map_ in map_list" :key=''>
                                        <tr>
                                            <td><el-input v-model="map_.dst_name" type="text" ></el-input></td>
                                            <td><i class="material-icons">add_box</i><i class="material-icons">remove_circle</i>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>

                        </div>
                        <input type="button" class="btn btn-secondary" id='writer_base_button' value="保存"/>

                </form>
            </div>
            <div class="col-lg-4" style="float: left;border:1px solid #DDDDDD;min-height:800px;margin-bottom: 100px;">
                 <form id="transform_table_id">
        <div class="" style="text-align: center"><h2>Transform</h2></div>
        <div class="form-group row" style="margin-top: 85px;">
            <table class="table table-striped" id="clean_config_transform_id">
                <thead class="thead">
                <tr>
                    <th>序列</th>
                    <th>路径</th>

                    <th>参数</th>
                    <th>option</th>

                </tr>
                </thead>
                <tbody id="transform_table_content" v-for="item in transform" :key="">
                <tr>
                    <td><el-input v-model="item.order"></el-input>
                    </td>
                    <td><el-input v-model="item.path" ></el-input></td>
                    <td><el-input v-model="item.params"></el-input></td>
                    <td> <el-button type="danger">删除</el-button></td>
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
        data() {
            return {
                "map_list": [
                    {
                        "src_name": "illegal_num",
                        "index": 1,
                        "dst_name": "illegal_num"
                    },
                    {
                        "src_name": "written_decision_type",
                        "index": 2,
                        "dst_name": "written_decision_type"
                    },
                    {
                        "src_name": "authenticate_report_num",
                        "index": 3,
                        "dst_name": "authenticate_report_num"
                    },
                    {
                        "src_name": "written_decision_parity_bit",
                        "index": 4,
                        "dst_name": "written_decision_parity_bit"
                    },
                    {
                        "src_name": "personnel_classify",
                        "index": 5,
                        "dst_name": "personnel_classify"
                    },
                    {
                        "src_name": "driver_license_number",
                        "index": 6,
                        "dst_name": "driver_license_number"
                    },
                    {
                        "src_name": "archive_num",
                        "index": 7,
                        "dst_name": "archive_num"
                    },
                    {
                        "src_name": "issue_authority",
                        "index": 8,
                        "dst_name": "issue_authority"
                    },
                    {
                        "src_name": "allow_drivering_type",
                        "index": 9,
                        "dst_name": "allow_drivering_type"
                    },
                    {
                        "src_name": "receiver",
                        "index": 10,
                        "dst_name": "receiver"
                    },
                    {
                        "src_name": "residence_district_code",
                        "index": 11,
                        "dst_name": "residence_district_code"
                    },
                    {
                        "src_name": "real_detailed_address",
                        "index": 12,
                        "dst_name": "real_detailed_address"
                    },
                    {
                        "src_name": "phone",
                        "index": 13,
                        "dst_name": "phone"
                    },
                    {
                        "src_name": "contact_way",
                        "index": 14,
                        "dst_name": "contact_way"
                    },
                    {
                        "src_name": "dispose_classify",
                        "index": 15,
                        "dst_name": "dispose_classify"
                    },
                    {
                        "src_name": "plate_type_code",
                        "index": 16,
                        "dst_name": "plate_type_code"
                    },
                    {
                        "src_name": "plate_num",
                        "index": 17,
                        "dst_name": "plate_num"
                    },
                    {
                        "src_name": "vehicle_owner",
                        "index": 18,
                        "dst_name": "vehicle_owner"
                    },
                    {
                        "src_name": "using_property",
                        "index": 19,
                        "dst_name": "using_property"
                    },
                    {
                        "src_name": "transport_way",
                        "index": 20,
                        "dst_name": "transport_way"
                    },
                    {
                        "src_name": "illegal_time",
                        "index": 21,
                        "dst_name": "illegal_time"
                    },
                    {
                        "src_name": "illegal_place",
                        "index": 22,
                        "dst_name": "illegal_place"
                    },
                    {
                        "src_name": "illegal_adress",
                        "index": 23,
                        "dst_name": "illegal_adress"
                    },
                    {
                        "src_name": "illegal_act",
                        "index": 24,
                        "dst_name": "illegal_act"
                    },
                    {
                        "src_name": "illegal_score",
                        "index": 25,
                        "dst_name": "illegal_score"
                    },
                    {
                        "src_name": "forfeit",
                        "index": 26,
                        "dst_name": "forfeit"
                    },
                    {
                        "src_name": "measured_value",
                        "index": 27,
                        "dst_name": "measured_value"
                    },
                    {
                        "src_name": "standard_value",
                        "index": 28,
                        "dst_name": "standard_value"
                    },
                    {
                        "src_name": "overdue_fine",
                        "index": 29,
                        "dst_name": "overdue_fine"
                    },
                    {
                        "src_name": "duty_police",
                        "index": 30,
                        "dst_name": "duty_police"
                    },
                    {
                        "src_name": "pay_money_way",
                        "index": 31,
                        "dst_name": "pay_money_way"
                    },
                    {
                        "src_name": "discover_organ",
                        "index": 32,
                        "dst_name": "discover_organ"
                    },
                    {
                        "src_name": "discover_organ_name",
                        "index": 33,
                        "dst_name": "discover_organ_name"
                    },
                    {
                        "src_name": "dispose_result",
                        "index": 34,
                        "dst_name": "dispose_result"
                    },
                    {
                        "src_name": "dispose_dept_name",
                        "index": 35,
                        "dst_name": "dispose_dept_name"
                    },
                    {
                        "src_name": "punish_type",
                        "index": 36,
                        "dst_name": "punish_type"
                    },
                    {
                        "src_name": "update_dispose_time",
                        "index": 37,
                        "dst_name": "update_dispose_time"
                    },
                    {
                        "src_name": "pay_money_flag",
                        "index": 38,
                        "dst_name": "pay_money_flag"
                    },
                    {
                        "src_name": "pay_money_date",
                        "index": 39,
                        "dst_name": "pay_money_date"
                    },
                    {
                        "src_name": "origin_certificate_num",
                        "index": 40,
                        "dst_name": "origin_certificate_num"
                    },
                    {
                        "src_name": "rejection_flag",
                        "index": 41,
                        "dst_name": "rejection_flag"
                    },
                    {
                        "src_name": "record_type",
                        "index": 42,
                        "dst_name": "record_type"
                    },
                    {
                        "src_name": "entry_person",
                        "index": 43,
                        "dst_name": "entry_person"
                    },
                    {
                        "src_name": "regist_time",
                        "index": 44,
                        "dst_name": "regist_time"
                    },
                    {
                        "src_name": "operator1",
                        "index": 45,
                        "dst_name": "operator1"
                    },
                    {
                        "src_name": "operator2",
                        "index": 46,
                        "dst_name": "operator2"
                    },
                    {
                        "src_name": "incident_level",
                        "index": 47,
                        "dst_name": "incident_level"
                    },
                    {
                        "src_name": "dispose_object_flag",
                        "index": 48,
                        "dst_name": "dispose_object_flag"
                    },
                    {
                        "src_name": "forwarded_record_flag",
                        "index": 49,
                        "dst_name": "forwarded_record_flag"
                    },
                    {
                        "src_name": "source",
                        "index": 50,
                        "dst_name": "source"
                    },
                    {
                        "src_name": "write_model",
                        "index": 51,
                        "dst_name": "write_model"
                    },
                    {
                        "src_name": "leading-in_database_flag",
                        "index": 52,
                        "dst_name": "leading-in_database_flag"
                    },
                    {
                        "src_name": "remission_overdue_fine_flag",
                        "index": 53,
                        "dst_name": "remission_overdue_fine_flag"
                    },
                    {
                        "src_name": "forwarded_flag",
                        "index": 54,
                        "dst_name": "forwarded_flag"
                    },
                    {
                        "src_name": "accept_office",
                        "index": 55,
                        "dst_name": "accept_office"
                    },
                    {
                        "src_name": "occur_course",
                        "index": 56,
                        "dst_name": "occur_course"
                    },
                    {
                        "src_name": "update_time",
                        "index": 57,
                        "dst_name": "update_time"
                    },
                    {
                        "src_name": "comments",
                        "index": 58,
                        "dst_name": "comments"
                    },
                    {
                        "src_name": "business_check_digit",
                        "index": 59,
                        "dst_name": "business_check_digit"
                    },
                    {
                        "src_name": "etl_id",
                        "index": 60,
                        "dst_name": "etl_id"
                    },
                    {
                        "src_name": "etl_date",
                        "index": 61,
                        "dst_name": "etl_date"
                    },
                    {
                        "src_name": "first_insert_police",
                        "index": 62,
                        "dst_name": "first_insert_police"
                    }
                ],
                "transform": [
                    {
                        "path": "data_transform.common.rename.FieldRenameTransformer",
                        "params": JSON.stringify({
                            "mapping_fields": {}
                        }),
                        "order": 1
                    },
                    {
                        "path": "data_transform.common.field.FieldStripTansformer",
                        "params": JSON.stringify({}),
                        "order": 2
                    },
                    {
                        "path": "data_transform.common.field.FieldConvertNull",
                        "params": JSON.stringify({
                            "null_value": "null"
                        }),
                        "order": 3
                    },
                    {
                        "path": "data_transform.common.field.DoubleTransformer",
                        "params": JSON.stringify({
                            "fields": [
                                "illegal_score",
                                "forfeit",
                                "measured_value",
                                "standard_value",
                                "overdue_fine",
                                "etl_id"
                            ]
                        }),
                        "order": 4
                    },
                    {
                        "path": "data_transform.common.field.DateTransformer",
                        "params": JSON.stringify({
                            "fields": [
                                {
                                    "name": "pay_money_date",
                                    "format": "%Y/%m/%d"
                                }
                            ]
                        }),
                        "order": 5
                    },
                    {
                        "path": "data_transform.common.field.TimestampTransformer",
                        "params": JSON.stringify({
                            "fields": [
                                {
                                    "name": "illegal_time",
                                    "format": "%Y/%m/%d %H:%M:%S"
                                },
                                {
                                    "name": "update_dispose_time",
                                    "format": "%Y/%m/%d %H:%M:%S"
                                },
                                {
                                    "name": "regist_time",
                                    "format": "%Y/%m/%d %H:%M:%S"
                                },
                                {
                                    "name": "update_time",
                                    "format": "%Y/%m/%d %H:%M:%S"
                                },
                                {
                                    "name": "etl_date",
                                    "format": "%Y/%m/%d %H:%M:%S"
                                }
                            ]
                        }),
                        "order": 6
                    }
                ],
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
                formInline:{
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
        },
        methods: {
            ChangeToString(object){
                console.log(1)
                return JSON.stringify(object);
            }
        }
    }
</script>
