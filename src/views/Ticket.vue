<template>
  <div v-if="staticlist">
    <nav>
      <header style="background-color: rgba(0,0,0,.1)">
        <h2 style="height:1rem;line-height:1rem;font-size:.36rem;text-align:center">演出详情</h2>
        <div class="content" style="width:94%;margin:0 auto;clear:both;height:3.6rem;">
          <img style="width:2.4rem;float:left" :src="sharetlist.share_pic" />
          <p
            style="font-size:.36rem;font-weight:bold;width:7.04rem;position:relative;left:.2rem;top:.1rem"
          >{{ sharetlist.share_title }}</p>
          <p
            style="font-size:.3rem;position:relative;top:.3rem;left:.2rem;font-weight:bold"
          >￥{{ staticlist.price_range }}</p>
        </div>
      </header>

      <div class="nav">
        <h2>演出介绍：</h2>
        <div v-html="staticlist.show_desc.desc"></div>
      </div>
    </nav>
    <div @click="bottomTo" style="height:1rem;line-height:1rem;font-size:.36rem;text-align:center">
      <h3 style="font-size:.4rem;text-align:left;text-indent:.3rem">温馨提醒</h3>
    </div>
    <mt-popup v-model="popupVisible" position="bottom" pop-transition='popup-fade'>
      <div style="width:6.7rem;height:7.2rem;background-color:white;padding:.8rem">
        <h2 style="height:1rem;line-height:1rem;font-size:.36rem;text-indent:.06rem">温馨提醒</h2>
          <ul>
            <li v-for="(i,index) in 4" :key="index">
              <h2 style="font-size:.3rem;font-weight:normal;height:.68rem;line-height:.68rem"> <span style="display: inline-block;width: .10667rem;height: .10667rem;background: #999;border-radius: 50%;"></span> {{ staticlist.show_notice.list[index].title }}</h2>
              <p style="color:#666">{{ staticlist.show_notice.list[index].desc }}</p>
            </li>
          </ul>
      </div>
    </mt-popup>
  </div>
</template>

<script>
import Vue from 'vue'
import http from '@/http/http'
import { Popup } from 'mint-ui'
Vue.component(Popup.name, Popup)
export default {
  data () {
    return {
      sharetlist: null,
      staticlist: null,
      popupVisible: false
    }
  },
  methods: {
    bottomTo () {
      this.popupVisible = true
    }
  },
  mounted () {
    http(
      `https://api.juooo.com/Schedule/Schedule/getScheduleInfo?schedular_id=${this.$route.params.id}&version=6.0.5&referer=2`
    ).then(res => {
      this.sharetlist = res.data.data.share_data
      this.staticlist = res.data.data.static_data
    })
  }
}
</script>

<style>
.nav {
  width: 94%;
  margin: 0 auto;
}
.nav h2 {
  font-size: 0.4rem;
}
.nav img {
  width: 100%;
}
.nav p {
  font-size: 0.32rem;
}
.nav strong {
  font-size: 0.32rem;
}
</style>
