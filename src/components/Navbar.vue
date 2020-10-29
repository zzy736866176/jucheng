<template>
    <div>
        <ul>
            <router-link tag="li" v-for="data in classifylist" :key="data.id" :to="`/show/showsLibrary/${data.category_id}`">
                <img :src="data.pic" alt="" style="width:1rem">
                <p>{{ data.name }}</p>
            </router-link>
        </ul>
    </div>
</template>
<script>
import http from '@/http/http'
export default {
  methods: {

  },
  data () {
    return {
      classifylist: []
    }
  },
  mounted () {
    http(`https://api.juooo.com/home/index/getClassifyHome?city_id=${localStorage.getItem('city_id')}&abbreviation=${localStorage.getItem('city_abb')}&version=6.0.5&referer=2`).then(res => {
      // console.log(res.data.data)
      this.classifylist = res.data.data.classify_list
    })
  }
}
</script>
<style scoped>
    ul{
        display: flex;
        width: 100%;
        text-align: center;
        height: 2rem;
        background-color: whitesmoke;
        padding-top: .4rem;
    }
    ul li{
        flex:1;
        /* border: .01rem black solid; */
    }
    ul li img{
      vertical-align: middle;
    }
    ul li p{
      text-align: center;
    }
</style>
