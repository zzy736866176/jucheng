<template>
    <div>
        <Topbar></Topbar>
        <Swiper v-if="piclist.length" name="banner" :options="{
            loop: true,
            freeMode: false,
            slidesPerView: 1,
            spaceBetween: 0,
            centeredSlides: false,
            pagination: true
          }">
          <div class="swiper-slide" v-for="pic in piclist" :key="pic.url">
            <img :src="pic.image_url" alt="">
          </div>
        </Swiper>
        <Navbar></Navbar>
        <VipList></VipList>

        <h2 style="height:1.5rem;line-height:1.5rem;font-size:.4rem;text-indent:.3rem;position:relative;background-color:#f5f5f5">热门演出<router-link tag="span" to="/show/showsLibrary" style="display:inline-block;position:absolute;right:0.2rem;font-weight:bold;color:#666;">〉</router-link></h2>
        <Swiper class="container-layout" v-if="hotlist.length" name="hotshow" :options="{
            loop: false,
            freeMode: true,
            slidesPerView: 3,
            spaceBetween: 8,
            centeredSlides: false,
            pagination: false
          }">
          <div class="swiper-slide" v-for="(hot,index) in hotlist" :key="hot.schedular_url" @click="ticketTo(hotidlist[index])">
            <img :src="hot.pic" alt="">
            <p style="font-size:.24rem;font-weight:bold;overflow:hidden;text-overflow:ellipsis;height:.5rem;line-height:.5rem;white-space: nowrap;width:1.5rem"> {{ hot.show_name }} </p>
          </div>
        </Swiper>
        <h2 style="height:1.5rem;line-height:1.5rem;font-size:.4rem;text-indent:.3rem;position:relative;background-color:#f5f5f5">巡回演出</h2>
        <Swiper v-if="tourlist.length" name="tourshow" :options="{
            loop: false,
            freeMode: false,
            slidesPerView: 1,
            spaceBetween: 30,
            centeredSlides: true,
            pagination: false
          }">
          <div class="swiper-slide" v-for="tour in tourlist" :key="tour.show_name">
            <img :src="tour.pic" alt="">
          </div>
        </Swiper>

        <ClassifyHome></ClassifyHome>
        <Recommend></Recommend>
    </div>
</template>

<script>
import Navbar from '@/components/Navbar'
import VipList from '@/components/VipList'
import Swiper from '@/components/Swiper'
import http from '@/http/http.js'
import Recommend from '@/components/Recommend'
import ClassifyHome from '@/components/ClassifyHome'
import Topbar from '@/components/Topbar'
export default {
  mounted () {
    http(`https://api.juooo.com/home/index/getClassifyHome?city_id=${localStorage.getItem('city_id')}&abbreviation=${localStorage.getItem('city_abb')}&version=6.0.5&referer=2`).then(res => {
      this.piclist = res.data.data.slide_list
    })
    http(`https://api.juooo.com/home/index/getHotsRecommendList?city_id=${localStorage.getItem('city_id')}&version=6.0.5&referer=2`).then(res => {
      this.hotlist = (res.data.data.hots_show_list).filter((item, index) => index < 10)
      for (let i = 0; i < this.hotlist.length; i++) {
        // console.log(this.hotlist[i].schedular_url.slice(27))
        this.hotidlist.push(this.hotlist[i].schedular_url.slice(27))
        // console.log(this.hotidlist)
      }
      // console.log(this.hotidlist)
      // console.log(this.hotlist[1].schedular_url)
    })

    http(`https://api.juooo.com/home/index/getTourRecommendList?city_id=${localStorage.getItem('city_id')}&version=6.0.5&referer=2`).then(res => {
      this.tourlist = (res.data.data.tour_show_list).filter((item, index) => index < 6)
    })
  },
  components: {
    Navbar,
    Swiper,
    VipList,
    Recommend,
    ClassifyHome,
    Topbar
  },
  data () {
    return {
      piclist: [],
      hotlist: [],
      hotidlist: [],
      tourlist: []
    }
  },
  methods: {
    ticketTo (id) {
      this.$router.push(`/show/ticket/${id}`)
    }
  }
}
</script>
<style scoped>
  .swiper-slide{
    width: 100%;
    height: 3.9rem
  }
  img{
    width: 100%;
    display: block;
  }
</style>
