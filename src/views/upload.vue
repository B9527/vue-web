<<template>
<div id="upload_form" style="margin-top:5%;">
    <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item label="请选择文件类型：">
            <el-select v-model="formInline.value" placeholder="请选择" style="width:200px;">
                <el-option
                v-for="item in formInline.options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
                </el-option>
            </el-select>
        </el-form-item></br>
        <el-form-item  label="请 选 择 文 件：">
           <el-input type="file" name="file" style="width:200px">
                          </el-input>
        </el-form-item></br>
        <el-form-item  label=" 提   交： ">
           
              <el-button type="primary" style="width:200px"  @click.native.prevent="handleSubmit" :loading="logining" >上传</el-button>
        </el-form-item>            
    </el-form>
        
</div>
</template>


<script>
  export default {
    data() {
      return {
          formInline:{
            options:[
                {
                'label':'sql',
                'value':'sql'
                },
                {
                'label':'text',
                'value':'text'
                },
               
            ],
             value: '',
             file: "file"

            }
        }
       
    },
    methods: {
      handleSubmit(ev) {
        var _this = this;
        this.$refs.ruleForm2.validate((valid) => {
          if (valid) {
            //_this.$router.replace('/table');
            this.logining = true;
            //NProgress.start();
            var loginParams = { type: formInline.value, file: this.ruleForm2.checkPass };
            requestLogin(loginParams).then(data => {
              this.logining = false;
              //NProgress.done();
              let { msg, code, user } = data;
              if (code !== 200) {
                this.$message({
                  message: msg,
                  type: 'error'
                });
              } else {
                sessionStorage.setItem('user', JSON.stringify(user));
                this.$router.push({ path: '/' });
              }
            });
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      }

    }
  }
</script>