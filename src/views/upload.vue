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
           <input type="file" name="file" style="width:200px" class="file" @change="getFile($event)"  />
                          
        </el-form-item></br>
        <el-form-item  label=" 提   交： ">
           
              <el-button type="primary" style="width:200px" @click="submitForm($event)">上传</el-button>
        </el-form-item>            
    </el-form>
        
</div>
</template>


<script>
  import { requestLogin } from '../api/api';
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
       getFile(event) {
            this.file = event.target.files[0];
            console.log(this.file);
          },
       submitForm(event) {
            event.preventDefault();
            let formData = new FormData();
            formData.append('type', this.formInline.value);
            formData.append('file', this.file);
            console.log(formData);
            var loginParams = formData
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
    }   }
  }
</script>

<style scoped>
.file {
    position: relative;
    display: inline-block;
    background: #D0EEFF;
    border: 1px solid #99D3F5;
    border-radius: 4px;
    padding: 4px 12px;
    overflow: hidden;
    color: #1E88C7;
    text-decoration: none;
    text-indent: 0;
    line-height: 20px;
}
.file input {
    position: absolute;
    font-size: 100px;
    right: 0;
    top: 0;
    opacity: 0;
}
.file:hover {
    background: #AADFFD;
    border-color: #78C3F3;
    color: #004974;
    text-decoration: none;
}
</style>
