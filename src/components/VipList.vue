<template>
  <div>
    <nav>
      <div v-for="(data,index) in datalist1" :key="index">
        <h3>{{ data.name }}</h3>
        <p v-html="data.describe">{{ data.describe }}</p>
        <img :src="data.pic" alt style="width:.8rem" />
      </div>
    </nav>

    <footer>
      <div v-for="(data,index) in datalist2" :key="index">
        <h3>{{ data.name }}</h3>
        <p v-html="data.describe">{{ data.describe }}</p>
        <img :src="data.pic" alt style="width:.8rem" />
      </div>
    </footer>
  </div>
</template>
<script>
import http from '@/http/http'
export default {
  data () {
    return {
      datalist1: [],
      datalist2: []
    }
  },
  mounted () {
    http(
      `https://api.juooo.com/home/index/getClassifyHome?city_id=${localStorage.getItem('city_id')}&abbreviation=${localStorage.getItem('city_abb')}&version=6.0.5&referer=2`
    ).then(res => {
      this.datalist1 = res.data.data.operation_list.filter(
        (item, index) => index < 2
      )
      this.datalist2 = res.data.data.operation_list.filter(
        (item, index) => index >= 2
      )
    })
  }
}
</script>
<style scoped>
h3 {
  height: 0.4rem;
  line-height: 0.4rem;
}
div {
  background-color: #f5f5f5;
}
nav {
  width: 96%;
  height: 1.6rem;
  display: flex;
  text-align: center;
  margin: 0 auto;
  background-color: #f5f5f5;
}
nav div {
  flex: 1;
  background-color: white;
  box-shadow: 0 0.05333rem 0.4rem 0.02667rem rgba(35, 35, 35, 0.08);
  margin: 0.05rem;
  border-radius: 0.08rem;
}

footer {
  width: 96%;
  height: 1.6rem;
  display: flex;
  text-align: center;
  margin: 0 auto;
  background-color: #f5f5f5;
}
footer div {
  flex: 1;
  background-color: white;
  box-shadow: 0 0.05333rem 0.4rem 0.02667rem rgba(35, 35, 35, 0.08);
  margin: 0.05rem;
  border-radius: 0.08rem;
}
</style>
