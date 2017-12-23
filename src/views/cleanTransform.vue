<template>
  <div>
      <NavComponent></NavComponent>
     <div class="col-lg-10" style="float: left;border:1px solid #DDDDDD;min-height:800px;margin-bottom: 100px;margin-left:10%">
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
                <tbody id="transform_table_content" v-for="(item, index) in transform" :key="item.order">
                <tr>
                    <td><el-input v-model="item.order" style="width:60px"></el-input>
                    </td>
                    <td><el-input v-model="item.path" ></el-input></td>
                    <td><el-input v-model="item.params"></el-input></td>
                    <td> <el-button type="danger" @click="TransDelete(index)">删除</el-button></td>
                </tr>
                </tbody>
            </table>
        </div>

        <br/>
         <el-button type="primary" @click="TransAdd">新增</el-button>
        <el-button type="success" @click="TransSave">保存</el-button>


    </form>
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
            TransDelete(index){
                this.transform.splice(index, 1);
            },
            TransAdd(){
                let add_item =  {"path": "", "params": "", "order": this.transform.length +1 }
                this.transform.push(add_item);
            },
            TransSave(){
                let return_obj = this.transform;
                console.log(JSON.stringify(return_obj));

            },
        },
        data() {
            return {
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
            }
    }
    }
</script>

<style scoped>

</style>

