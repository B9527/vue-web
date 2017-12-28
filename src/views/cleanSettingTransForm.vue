<template>
<div>
      
    <div>
        <div style="margin-bottom:50px;">
            <span style="float:left; margin-left:10%"> <el-button type="primary" round  @click="routerBack">上一步</el-button></span>
            <span style="margin-left:30%;"> <el-button type="success" round @click="routerNext">下一步</el-button></span>
        </div>
        <div class="col-lg-8" style="float: left;border:1px solid #DDDDDD;margin-bottom: 100px;margin-left:10%">
                <form id="transform_table_id">
                    <div class="form-group row" style="margin-top: 20px;">
                        <table class="table table-striped" id="clean_config_transform_id">
                            <caption style="text-align: center; caption-side : top"><h2>基本类型</h2></caption>
                            <thead class="thead">
                                <tr>
                                    <th>序列</th>
                                    <th>column_name</th>
                                    <th>column_type</th>
                                    <th>参数</th>
                                    <th>option</th>
                                </tr>
                            </thead>
                            <tbody id="transform_table_content" v-for="(item, index) in base_trans" :key="item.order">
                                <tr>
                                    <td><p style="width:60px">{{index +1 }}</p></td>
                                    <td><el-input v-model="item.column_name" ></el-input></td>
                                    <td><el-select v-model="item.column_type" placeholder="请选择类型">
                                            <el-option
                                            v-for="item in formInline.options"
                                            :key="item.value"
                                            :label="item.label"
                                            :value="item.value">
                                            </el-option>
                                        </el-select>
                                    </td>
                                    <td><el-input v-model="item.params"></el-input></td>
                                    <td> <el-button type="danger" @click="TransBaseDelete(index)">删除</el-button></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <el-button type="primary" @click="TransBaseAdd" style="margin-left:40%">新增</el-button>
                    <el-button type="success" @click="TransBaseSave" style="margin-left:5%">保存</el-button>
                </form>
        </div>
        <div class="col-lg-8" style="float: left;border:1px solid #DDDDDD;margin-bottom: 100px;margin-left:10%">
                <form id="transform_table_id">
                    <div class="form-group row" style="margin-top: 20px; text-ali">
                        <table class="table table-striped" id="clean_config_transform_id">
                            <caption style="text-align: center; caption-side : top"><h2>扩展类型</h2></caption>
                            <thead class="thead">
                                <tr>
                                    <th>序列</th>
                                    <th>column_name</th>
                                    <th>column_type</th>
                                    <th>参数</th>
                                    <th>option</th>
                                </tr>
                            </thead>
                            <tbody id="transform_table_content" v-for="(item, index) in extent_trans" :key="item.order">
                                <tr>
                                    <td><p style="width:60px">{{index +1 }}</p></td>
                                    <td><el-input v-model="item.column_name" ></el-input></td>
                                    <td><el-select v-model="item.column_type" placeholder="请选择类型">
                                            <el-option
                                            v-for="item in formInline.options"
                                            :key="item.value"
                                            :label="item.label"
                                            :value="item.value">
                                            </el-option>
                                        </el-select>
                                    </td>
                                    <td><el-input v-model="item.params"></el-input></td>
                                    <td> <el-button type="danger" @click="TransExtentDelete(index)">删除</el-button></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <el-button type="primary" @click="TransExtentAdd" style="margin-left:40%">新增</el-button>
                    <el-button type="success" @click="TransExtentSave" style="margin-left:5%">保存</el-button>
                </form>
        </div>
        <div class="col-lg-8" style="float: left;border:1px solid #DDDDDD;margin-bottom: 100px;margin-left:10%">
                <form id="transform_table_id">
                    <div class="form-group row" style="margin-top: 20px;">
                        <table class="table table-striped" id="clean_config_transform_id">
                            <caption style="text-align: center; caption-side : top"><h2>自定义</h2></caption>
                            <thead class="thead">
                                <tr>
                                    <th>序列</th>
                                    <th>路径</th>
                                    <th>参数</th>
                                    <th>option</th>
                                </tr>
                            </thead>
                            <tbody id="transform_table_content" v-for="(item, index) in custome_trans" :key="item.order">
                                <tr>
                                    <td><el-input v-model="item.index" style="width:60px"></el-input></td>
                                    <td><el-input v-model="item.path" ></el-input></td>
                                    <td><el-input v-model="item.params"></el-input></td>
                                    <td> <el-button type="danger" @click="TransDelete(index)">删除</el-button></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <el-button type="primary" @click="TransBaseAdd" style="margin-left:40%">新增</el-button>
                    <el-button type="success" @click="TransBaseSave" style="margin-left:5%">保存</el-button>
                </form>
        </div>
    </div>
</div>    
</template>

<script>
import { getCleanBase } from '../api/api';
import { postCleanBase } from '../api/api';
import { getCleanExtent } from '../api/api';
import { postCleanExtent } from '../api/api';
import { getCleanCustom } from '../api/api';
import{ postCleanCustom } from '../api/api';
    export default {
          components: {
              
        },
        mounted: function() {
            this.$nextTick(function () {
              this.loadBaseData();
              this.loadExtentData();
              this.loadCustomData();
            })
        },
        methods: {
            loadBaseData(){
                 getCleanBase({params:{id: this.$route.query.id,}}).then(data => {
                    let { msg, code, result } = data;
                    if (code !== 200) {
                        this.$message({
                        message: msg,
                        type: 'error',
                    });
                    } else {
                        this.base_trans = result.base_trans_data;
                  }
                });
            },
            loadExtentData(){
                getCleanExtent({params:{id: this.$route.query.id,}}).then(data => {
                    let { msg, code, result } = data;
                    if (code !== 200) {
                        this.$message({
                        message: msg,
                        type: 'error',
                    });
                    } else {
                        this.extent_trans = result.extent_trans_data;
                  }
                });
            },
            loadCustomData(){
                getCleanCustom({params:{id: this.$route.query.id,}}).then(data => {
                    let { msg, code, result } = data;
                    if (code !== 200) {
                        this.$message({
                        message: msg,
                        type: 'error',
                    });
                    } else {
                        this.custome_trans = result.custom_trans_data;
                  }
                });
            },
            routerBack(){
                this.$router.go(-1);
            },
            routerNext(){
                this.$router.push('/settingCleanSucWriter?id=' + this.$route.query.id );
            },
            TransBaseDelete(index){
                this.base_trans.splice(index, 1);
            },
            TransBaseAdd(){
                let add_item =  {"column_type": "", "params": "", "column_name": "" }
                this.base_trans.push(add_item);
            },
            indexMethod(index) {
                return index + 1;
            },
            TransBaseSave(){
                let formData = new FormData();
                formData.append('id', this.$route.query.id);
                formData.append('base_trans_data', JSON.stringify(this.base_trans))
                let request_params = formData
                postCleanBase(request_params).then(data => {
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
            TransExtentDelete(index){
                this.extent_trans.splice(index, 1);
            },
            TransExtentAdd(){
                let add_item =  {"column_type": "", "params": "", "column_name": "" }
                this.extent_trans.push(add_item);
            },
            TransExtentSave(){
                let formData = new FormData();
                formData.append('id', this.$route.query.id);
                formData.append('extent_trans_data', JSON.stringify(this.extent_trans));
                let request_params = formData;
                postCleanExtent(request_params).then(data => {
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
            TransExtentDelete(index){
                this.extent_trans.splice(index, 1);
            },
            TransExtentAdd(){
                let add_item =  {"column_type": "", "params": "", "column_name": "" }
                this.extent_trans.push(add_item);
            },
        },
        data() {
            return {
                "reader":{},
                "base_trans": [
                    {  
                        "column_type":"int",
                        "column_name":"id",
                        "params":"{\"name\":\"123\"}",
                    
                    }
                ],
                "extent_trans": [{
                    "column_type":"int",
                    "column_name":"id",
                    "params":"{\"name\":\"123\"}",
                }],
                "custome_trans": [{
                    "path": "asd",
                    "params":"{\"name\":\"123\"}",
                    "index":1
                }],
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
