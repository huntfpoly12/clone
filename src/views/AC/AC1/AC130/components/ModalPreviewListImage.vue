<template>
  <a-modal :visible="isModalPreview" @cancel="cancel" :mask-closable="true" class="confirm-md preview-list-image"
    footer="" :width="1000">
    <a-carousel ref="carouselPreviewImage" arrows dots-class="slick-dots slick-thumb">
      <template #customPaging="props">
        <a>
          <img :src="getImgUrl(props.i)" />
        </a>
      </template>
      <div v-for="(item, index) in listImage.files" :key="item">
        <img :src="getImgUrl(index)" />
      </div>
    </a-carousel>
  </a-modal>
</template>

<script lang="ts">
import { defineComponent, ref, watch, nextTick } from 'vue'
export default defineComponent({
  props: {
    isModalPreview: {
      type: Boolean,
      default: false,
    },
    listImage: {
      type: Object,
      default: {
        index: 0,
        files: []
      }
    }
  },
  components: {
  },

  setup(props, { emit }) {
    const carouselPreviewImage: any = ref()
    const cancel = () => {
      emit("closePopup", false)
    };
    watch(()=> props.listImage, (value) => {
      nextTick(() => {
        carouselPreviewImage.value.goTo(value.index, true)
      })
    },{
      deep: true,
    })
    const getImgUrl = (i: number) => {
      return props.listImage.files[i]
    };
    return {
      cancel,
      getImgUrl,
      carouselPreviewImage
    }
  },
})
</script>

<style scoped>
/* For demo */
.ant-carousel :deep(.slick-dots) {
  position: relative;
  height: auto;
}
.ant-carousel :deep(.slick-slide img) {
  border: 5px solid #fff;
  display: block;
  margin: auto;
  max-width: 80%;
}
.ant-carousel :deep(.slick-arrow) {
  display: none !important;
}
.ant-carousel :deep(.slick-thumb) {
  bottom: 0px;
}
.ant-carousel :deep(.slick-thumb li) {
  width: 60px;
  height: 45px;
}
.ant-carousel :deep(.slick-thumb li img) {
  width: 100%;
  height: 100%;
  filter: grayscale(100%);
  display: block;
}
.ant-carousel :deep .slick-thumb li.slick-active img {
  filter: grayscale(0%);
}
</style>
