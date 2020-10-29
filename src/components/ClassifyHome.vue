<template>
  <div>
    <ul>
      <li v-for="data in datalist" :key="data.cat_id">
        <div>
          <h2 style="height:1.5rem;line-height:1.5rem;font-size:.4rem">{{data.title}}</h2>
          <div style="height:3.2rem;clear:both;padding:.2rem;background:rgb(163, 154, 111);" @click="ticketTo(data.list[0].sche_id)">
            <img :src="data.list[0].pic" alt style="width:2.4rem;float:left;margin-right:.3rem" />
            <p style="font-size: .3rem;line-height:.6rem;margin-top:.5rem">
              {{data.list[0].date}}
              <span>{{data.list[0].week}}</span>
            </p>
            <p
              style="text-overflow: -o-ellipsis-lastline;
overflow: hidden;
text-overflow: ellipsis;
display: -webkit-box;
-webkit-line-clamp: 2;
-webkit-box-orient: vertical;
font-size:.34rem;font-weight:bold
"
            >{{data.list[0].schedular_name}}</p>
            <p style="line-height:.8rem">{{data.list[0].venue_name}}</p>
          </div>

          <Swiper
            class="container-layout"
            v-if="datalist.length"
            name="classify"
            :options="{
            loop: false,
            freeMode: true,
            slidesPerView: 3,
            spaceBetween: 8,
            centeredSlides: false,
            pagination: false
          }"
          >
            <div
              class="swiper-slide"
              v-for="(data,index) in data.list"
              :key="index"
              v-show="index > 0"
              style="margin:.2rem"
              @click="ticketTo(data.sche_id)"
            >
              <img :src="data.pic" alt style="width:2.4rem" />
              <h3
                style="font-size:.34rem;font-weight:bold;overflow:hidden;text-overflow:ellipsis;height:.5rem;line-height:.5rem;white-space: nowrap;width:2.2rem"
              >{{ data.schedular_name }}</h3>
              <p style="color:orange">
                {{data.low_price}}
                <span style="color:#888">&nbsp;&nbsp;起</span>
              </p>
            </div>
          </Swiper>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import http from '@/http/http'
import Swiper from '@/components/Swiper'
export default {
  components: {
    Swiper
  },
  data () {
    return {
      bgcolor: [
        'rgb(163, 154, 111)',
        'rgb(146, 123, 108)',
        'rgb(216, 190, 17)',
        'rgb(127, 170, 174)',
        'rgb(152, 93, 64)',
        'rgb(218, 168, 56)'
      ],
      datalist: []
    }
  },
  methods: {
    ticketTo (index) {
      this.$router.push(`/show/ticket/${index}`)
    }
  },
  mounted () {
    http(
      `https://api.juooo.com/home/index/getFloorShow?city_id=${localStorage.getItem('city_id')}&version=6.0.5&referer=2`
    ).then(res => {
      // this.datalist = res.data.data
      if (res.data.data.length > 0) {
        this.datalist = res.data.data.filter((item, index) => {
          return item.list.length > 4
        })
      }
    })
  }
}
</script>

<style scoped>
p {
  color: white;
}
</style>
