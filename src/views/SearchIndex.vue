<template>
  <div>
    <div class="search">
        <input v-model="oninput" type="text" />
        <p style="line-height:1rem;font-size:.3rem;color:#666">取消</p>
    </div>

    <ul>
      <li v-for="(data,index) in datalist" :key="index" v-show="isRender">
        <img style="width:2.2rem" :src="data.pic" alt />
        <div class="desc">
          <p style="font-size:.3rem;line-height:.6rem;font-weight:bold">
            {{ data.show_time_top }}
            <span style="color:#777">{{ data.show_time_bottom}}</span>
          </p>
          <p style="font-size:.3rem;font-weight:bold" v-html="data.name"></p>
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
export default {
  data () {
    return {
      value: '',
      oninput: '',
      datalist: [],
      isRender: false
    }
  },
  watch: {
    oninput (val) {
      http(`https://api.juooo.com/Show/Search/getShowList?keywords=${val}&page=1&sort_type=1&version=6.0.5&referer=2`).then(res => {
        this.datalist = res.data.data.list
        if (res.data.data.result_type === 1) {
          this.isRender = true
        } else if (res.data.data.result_type === 2) {
          this.isRender = false
        }
        if (this.oninput === '') {
          this.datalist = []
        }
      })
    }
  }
}
</script>

<style scoped>
.search{
    display: flex;
}
input {
  display: inline-block;
  outline: none;
  border: 0.01rem solid gray;
  background-color: transparent;
  border-radius: 0.5rem;
  width: 6rem;
  margin: .2rem;
  height: 0.6rem;
  /* color: white; */
}

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
