<template>
    <div class="navbar navbar-default" id="navbar_id" style="display:block;">
    <ul class="nav nav-tabs" >
        <li class="nav-item" v-for="item in nav_list" :key="item.link">
            <a @click="Golink(item.link)" :class="item.class_name">{{ item.name }}</a>
        </li>

    </ul>
</div>
</template>
<<script>
export default {
  data() {
      return {
          nav_list:[
              {"link":"/cleanReader", "name":"Reader", "class_name": "nav-link"},
              {"link":"/cleanWriter", "name":"SuccessWriter", "class_name": "nav-link"},
              {"link":"/cleanError", "name":"ErrorWriter", "class_name": "nav-link "},
              {"link":"/cleanTransform", "name":"Transform", "class_name": "nav-link"},
          ]
      }
  },
  	mounted: function() {
            this.$nextTick(function () {
                let route_path = this.$route.path;
                console.log(route_path);
                for (let i=0;i<this.nav_list.length;i++){
                   if(route_path === this.nav_list[i].link){
                       this.nav_list[i].class_name = "nav-link active";
                   }
                }
            })
      },
  methods: {
      Golink: function(link) {
         let id = this.$route.query.id
         let url_string = link + "?id=" + id 
         this.$router.push({ path: url_string });
      }
  }
}
</script>
<style scoped>

</style>



