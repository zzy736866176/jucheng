<template>
  <div class="top">
    <router-link to="/search/selectCity" tag="div" class="city"> {{city}} </router-link>
    <router-link to="/search/index" tag="p"></router-link>
  </div>
</template>

<style scoped>
.top {
  width: 100%;
  height: 0.8rem;
  position: fixed;
  background-color: transparent;
  z-index: 2;
  display: flex;
  color: white;
}
.city{
    width: 1.2rem;
    height: .5rem;
    text-align: center;
    border: .01rem solid gray;
    border-radius: .5rem;
    line-height: .5rem;
    font-size: .26rem;
    font-weight: bold;
    padding: .02rem
}
p {
  display: inline-block;
  outline: none;
  border: .01rem solid gray;
  background-color: transparent;
  border-radius: .5rem;
  width:4.2rem;
  height: .5rem;
  color: white;
}
</style>
<script>
export default {
  data () {
    return {
      city: localStorage.getItem('city_name')
    }
  }
}
</script>
