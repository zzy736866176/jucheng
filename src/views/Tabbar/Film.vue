<template>
  <div>
    film
    剧院
    <ul>
      <li v-for="data in datalist" :key="data.id">{{ data.name }}</li>
    </ul>
  </div>
</template>
<script>
import http from '@/http/http'
export default {
  data () {
    return {
      datalist: []
    }
  },
  mounted () {
    http(
      'https://api.juooo.com/theatre/index/getTheatreList?page=1&version=6.0.5&referer=2'
    ).then(res => {
      this.datalist = res.data.data.theatre_list
    })
  }
}
</script>

<style scoped>
li {
  box-shadow: 0 0.05333rem 0.4rem 0.02667rem rgba(35, 35, 35, 0.08);
  border-radius: 0.10667rem;
  border: 1px solid #ebebeb;
  margin-bottom: 0.4rem;
  padding: 0.54667rem 0.44rem 0.56rem;
}
</style>
