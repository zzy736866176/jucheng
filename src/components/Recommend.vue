<template>
  <div>
    <h2 style="height:1.5rem;line-height:1.5rem;font-size:.4rem;text-indent:.3rem;position:relative;background-color:#f5f5f5">为你推荐</h2>
    <ul v-infinite-scroll="loadMore" infinite-scroll-disabled infinite-scroll-distance="10">
      <li v-for="(data,index) in datalist" :key="index" @click="ticketTo(data.sche_id)">
        <img :src="data.schePic" alt />
        <div class="desc">
          <p style="font-size:.3rem;line-height:.6rem;font-weight:bold">
            {{ data.show_time }}
          </p>
          <p style="font-size:.3rem;font-weight:bold">{{ data.show_name }}</p>
          <p style="line-height:1rem;color:#666">
            <span>{{data.c_name}} |</span>
            {{ data.v_name }}
          </p>
          <p style="color:orange;font-size:.3rem">
            ￥{{ data.low_price }}
            <span style="color:#777">起</span>
          </p>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import { InfiniteScroll } from 'mint-ui'
import Vue from 'vue'

import http from '@/http/http'
Vue.use(InfiniteScroll)
export default {
  data () {
    return {
      datalist: [],
      count: 0
    }
  },
  methods: {
    loadMore () {
      this.loading = true
      this.count++
      if (this.datalist.length > 110) {
        return
      }
      http(
        `https://api.juooo.com/home/index/getRecommendShow?cityAdd=&page=${this.count}&version=6.0.5&referer=2`
      ).then(res => {
        this.datalist = [
          ...this.datalist,
          ...res.data.data.recommend_show_list
        ]
      })
    },
    ticketTo (index) {
      this.$router.push(`/show/ticket/${index}`)
    }
  },
  mounted () {
    http(
      'https://api.juooo.com/home/index/getRecommendShow?cityAdd=&page=1&version=6.0.5&referer=2'
    ).then(res => {
      this.datalist = res.data.data.recommend_show_list
    })
  }
}
</script>

<style scoped>
img {
  width: 3rem;
}
.desc {
  margin-left: 0.3rem;
}
li {
  list-style: none;
  width: 94%;
  margin: 0 auto;
  display: flex;
  height: 3.2rem;
  margin-bottom: 0.6rem;
}
img {
  display: block;
  width: 2.4rem;
  border-radius: 0.1rem;
}
</style>
