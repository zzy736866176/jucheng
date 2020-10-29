<template>
  <div>
    <Topfixed></Topfixed>
    <ul>
      <li v-for="data in datalist" :key="data.schedular_id" @click="ticketTo(data.schedular_id)">
        <img :src="data.pic" alt />
        <div class="desc">
          <p style="font-size:.3rem;line-height:.6rem;font-weight:bold">
            {{ data.show_time_top }}
            <span style="color:#777">{{ data.show_time_bottom}}</span>
          </p>
          <p style="font-size:.3rem;font-weight:bold">{{ data.name }}</p>
          <p style="line-height:1rem;color:#666">
            <span>{{data.city_name}} |</span>
            {{ data.venue_name }}
          </p>
          <p style="color:orange;font-size:.3rem">
            ￥{{ data.min_price }}
            <span style="color:#777">起</span>
          </p>
        </div>
      </li>
    </ul>
  </div>
</template>
<script>
import http from '@/http/http'
import Topfixed from '@/components/Topfixed'
export default {
  components: {
    Topfixed
  },
  data () {
    return {
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
      `https://api.juooo.com/Show/Search/getShowList?category=${this.id}&city_id=${localStorage.getItem('city_id')}&page=1&keywords=&version=6.0.5&referer=2`
    ).then(res => {
      this.datalist = res.data.data.list
    })
  }
}
</script>
<style scoped>
ul {
  position: relative;
  top: 2rem;
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
