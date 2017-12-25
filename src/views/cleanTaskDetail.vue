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
                            <input name="database" class="form-control" id="input_database" v-model="reader.database">
                        </div>
                        <label for="input_table" class="col-sm-2 col-form-label">Table:</label>
                        <div class="col-sm-10">
                            <input name="table" class="form-control" id="input_table" v-model="reader.table">
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
                            <tbody id="reader_content" v-for="(read_field, index) in reader.fields" :key=''> 
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
                     <el-button type="primary" @click="ReaderAdd" style="margin-left:40%">新增</el-button>
                     <el-button type="success" @click="ReaderSave" style="margin-left:5%" >保存</el-button>
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
                        <el-button type="success" @click="MapDictSave" style="margin-left:40%">保存</el-button>

                </form>
            </div>
      </div>
  </div>
</template>
<script>
    import NavComponent from '@/components/nav_component';
    import { CleanDetailGet } from '../api/api';
    import { CleanDetailPost } from '../api/api';
    import { CleanMapPost } from '../api/api';
    export default {
          components: {
              NavComponent,
        },
        mounted: function(){
            this.loadData();
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
                    this.map_list = result.map_list;
                  }
                      });
            },
            ReaderDelete(index){
                this.reader.fields.splice(index, 1);  
            },
            ReaderAdd(){
                let add_item =  {"type": "", "name": "", "order": this.reader.fields.length +1 }
                this.reader.fields.push(add_item);
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
            MapKeyAdd(index){
                let add_item =  {"src_name": "", "index": index}
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
                let formData = new FormData();
                formData.append('map_list', JSON.stringify(return_obj));
                formData.append('id', this.$route.query.id)
                CleanMapPost(formData).then(data =>{
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
            }
        },
        data() {
            return {
                map_list: {
                    key_list: [],
                    val_list: [],
                },
                reader: {},
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
