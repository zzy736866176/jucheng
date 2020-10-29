<template>
  <div>
    <mt-index-list>
      <div @click="all()" style="width:1.65rem;height:.5rem;border:.01rem solid black;margin-left:.3rem;line-height:.5rem;text-align:center;margin-top:.5rem" >全国</div>
      <div style="width:100%;overflow:hidden">
        <ul class="hot" style="clear:both;padding:.3rem">
          <li
            v-for="data in hotcitylist"
            :key="data.id"
            style="width:26%;;height:.6rem;border:.01rem solid black;float:left;margin-right:.3rem;text-align:center;line-height:.6rem"
            @click="address(data)"
          >{{ data.name }}</li>
        </ul>
      </div>

      <mt-index-section v-for="data in sortedcitylist" :index="data.id " :key="data.id">
        <mt-cell @click.native="address(item)" :title="item.name" v-for="(item,index) in data.list" :key="index" ></mt-cell>
      </mt-index-section>
    </mt-index-list>
  </div>
</template>

<script>
import { IndexList, IndexSection } from 'mint-ui'
import Vue from 'vue'

import http from '@/http/http'
Vue.component(IndexList.name, IndexList)
Vue.component(IndexSection.name, IndexSection)
export default {
  data () {
    return {
      hotcitylist: [],
      sortedcitylist: []
    }
  },
  mounted () {
    http(
      'https://api.juooo.com/city/city/getHotCityList?version=6.0.5&referer=2'
    ).then(res => {
      this.hotcitylist = res.data.data.hot_city_List
    })
    http(
      'https://api.juooo.com/city/city/getSortedCityList?version=6.0.5&referer=2'
    ).then(res => {
      this.sortedcitylist = res.data.data
    })
  },
  methods: {
    all () {
      localStorage.setItem('city_id', '0')
      localStorage.setItem('city_name', '全国')
      localStorage.setItem('city_abb', '')
      this.$router.back()
    },
    address (i) {
      localStorage.setItem('city_id', i.id)
      localStorage.setItem('city_name', i.name)
      localStorage.setItem('city_abb', i.Abbreviation)
      this.$router.back()
    }
  }
}
</script>
