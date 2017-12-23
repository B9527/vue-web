<template>

  <div>
      <NavComponent></NavComponent>
      <div>
          <div class="col-lg-6" style="float: left;border:1px solid #DDDDDD;min-height:800px;margin-bottom: 100px;">
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
                            <tbody id="reader_content" v-for="(read_field, index) in reader.read_fields" :key=''> 
                                <tr >
                                    <td><p type="index"  style="width: 60px">{{index+1}}</p</td>
                                    <td><el-input  v-model="read_field.name" type="text"></el-input></td>
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
                    </div>
                     <el-button type="primary" @click="ReaderAdd">新增</el-button>
                     <el-button type="success" @click="ReaderSave">保存</el-button>
                </form>
          </div>
          <div class="col-lg-6" style="float: left;border:1px solid #DDDDDD;min-height:800px;margin-bottom: 100px;">
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
                                    <tbody id="map_content_key" class="map_content" v-for="(map_, index) in map_list.key_list" :key="">
                                        <tr>
                                            <td><i class="material-icons" @click="MapKeyAdd(index)">add_box</i><i class="material-icons" @click="MapKeyDelete(index)">remove_circle</i>
                                            </td>
                                            <td><el-input  v-model="map_.src_name" type="text"></el-input></td>
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
                                    <tbody id="map_val_content" class="map_content" v-for="(map_, index) in map_list.val_list" :key=''>
                                        <tr>
                                            <td><el-input v-model="map_.dst_name" type="text" ></el-input></td>
                                            <td><i class="material-icons" @click="MapValAdd(index)">add_box</i><i class="material-icons" @click="MapValDelete">remove_circle</i>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <!-- <el-button type="primary">新增</el-button> -->
                        <el-button type="success" @click="MapDictSave">保存</el-button>

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
        mounted: function(){
            this.loadReader();
            this.loadMap();
        },
        methods: {
            loadReader(){
                alert("load reader!");
            },
            loadMap(){
                alert("load map!");
            },
            ReaderDelete(index){
                this.reader.read_fields.splice(index, 1);  
            },
            ReaderAdd(){
                let add_item =  {"type": "", "name": "", "order": this.reader.read_fields.length +1 }
                this.reader.read_fields.push(add_item);
            },
            ReaderSave(){
                let return_obj = {};
                return_obj.Table = this.reader.Table;
                return_obj.Database = this.reader.Database;
                return_obj.read_fields = this.reader.read_fields;
                console.log(JSON.stringify(return_obj));
            },
            MapKeyAdd(index){
                let add_item =  {"src_name": ""}
                this.map_list.key_list.splice(index, 0, add_item);
            },
            MapKeyDelete(index){
                this.map_list.key_list.splice(index, 1); 
            },
            MapValAdd(index){
                let add_item =  {"dst_name": ""}
                this.map_list.val_list.splice(index, 0, add_item);
            },
            MapValDelete(index){
                 this.map_list.val_list.splice(index, 1); 
            },
            MapDictSave(){
                let return_obj = this.map_list;
                console.log(JSON.stringify(return_obj));
            }
        },
        data() {
            return {
                map_list: {
                    key_list: [ {"src_name":"illegal_num"}, 
                                {"src_name":"written_decision_type"},
                                {"src_name":"authenticate_report_num"},
                                {"src_name":"written_decision_parity_bit"},
                                {"src_name":"personnel_classify"}
                                ],
                    val_list: [ {"dst_name":"illegal_num"}, 
                                {"dst_name":"written_decision_type"},
                                {"dst_name":"authenticate_report_num"},
                                {"dst_name":"written_decision_parity_bit"},
                                {"dst_name":"personnel_classify"}
                    ],
                },
                reader: {
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
    }
</script>
