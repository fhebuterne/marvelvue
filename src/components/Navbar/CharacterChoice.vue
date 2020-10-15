<template>
  <div class="row CharacterSelection w-100 ml-0">
    <img :src="imageSource()" alt="Image du héros" class="CharacterImage ml-1 mt-1 mb-1 rounded float-left"/>
    <p class="text-center pt-2 ml-2" v-on:click="clickHandler">{{ name }}</p>
  </div>
</template>

<script>
export default {
  name: 'CharacterChoice',
  props: {
    name: null,
    imgPath: null,
    
  },
  data: function () {
    return {
      imgExt: '.jpg'
    }
  },
  methods:{
    imageSource: function() {
      return this.imgPath+this.imgExt
    },
    clickHandler() {
      this.$emit('click-character', this.name)
    }
  }
}
</script>

<style lang='scss'>
.CharacterImage {
  width: 100px;
  height: 100px;
}

.CharacterSelection {
  background-color: grey;
}
</style>
