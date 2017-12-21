<template>
    <div class="navbar navbar-default" id="navbar_id" style="display:block;">
    <ul class="nav nav-tabs" >
        <li :class="item.class_name" v-for="item in nav_list" :key="item.link">
            <a :href="item.link" class="nav-link">{{ item.name }}</a>
        </li>

    </ul>
</div>
</template>
<<script>
export default {
  data() {
      return {
          nav_list:[
              {"link":"#1", "name":"Reader", "class_name": "nav-item"},
              {"link":"#2", "name":"Writer", "class_name": "nav-item"},
              {"link":"#3", "name":"Transform", "class_name": "nav-item"},
              {"link":"#4", "name":"返回列表","class_name": "nav-item"},
          ]
      }
  }
}
</script>
<style scoped>

</style>



