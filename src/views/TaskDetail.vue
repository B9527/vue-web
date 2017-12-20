<template>
<div >
   <div v-for="site in records" :key="site.staus">
	   <caption style="width:200px" >步骤:{{ site.step }}</caption>
	   <table class="table table-bordered" v-bind:id="site.status">
		   <thead>
				<tr>
					<th>代码</th>
					<th>信息</th>
				</tr>
            </thead>
		<tbody>
			<tr>
				<td>执行步骤</td>
				<td>{{ site.step }}</td>
			</tr>
			<tr>
				<td>cmd</td>
				<td>{{ site.command }}</td>
			</tr>
			<tr>
					<td>执行状态</td>
				<td>{{ site.status }}</td>

			</tr>
			<tr>
					<td>开始时间</td>
				<td>{{ site.start_time}}</td>

			</tr>
			<tr>
					<td>结束时间</td>
				<td>{{ site.finish_time}}</td>

			</tr>
			<tr>
				<td>log</td>
				<td><pre style="word-wrap: break-word; white-space: pre-wrap; white-space: -moz-pre-wrap" >{{site.log}}</pre></td>

			</tr>
		</tbody>
		</table>
	
	</div>
 </div> 
</template>

<script>
  import { getTaskRecord } from '../api/api'
  export default {
    data() {
      return {
        records: [
		]
      }
	},
	mounted: function() {
		this.$nextTick(function () {
			let date = new Date()
			console.log(date);
			getTaskRecord({"id":this.$route.query.id}).then(data => {
							//NProgress.done();
				let { msg, code, result } = data;
				if (code !== 200) {
				this.$message({
				message: msg,
				type: 'error',
				});
				} else {
				console.log(new Date())
				this.records = result.task_record;
				console.log(JSON.stringify(this.records))
				}
			});
		})
	},
  }
</script>

<<style scoped>
#success {
    background: #f0f9eb;
  }  
#fail {
	background: #FEF0F0;
}  
</style>
