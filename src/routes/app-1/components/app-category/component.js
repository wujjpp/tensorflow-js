/**
* Created by Wu Jian Ping on - 2019/08/06.
*/

import webcam from '../../webcam'

export default {
  name: 'app-category',

  props: {
    videoSettings: {
      type: Object,
      default() {
        return {
          width: 120,
          height: 90
        }
      }
    },

    category: {
      type: Object,
      default() {
        return {
          name: '未分类',
          items: []
        }
      }
    }
  },

  data() {
    return {
      intervalId: null,
      isCapturing: false,
      isPreview: true,
      isShowAll: true,
      categoryName: '',
      isEditing: false
    }
  },

  mounted() {
    this.categoryName = this.category.name
    $(() => {
      webcam.attach(this.$refs.video)
    })
  },

  methods: {
    snap() {
      let canvas = this.$refs.canvas
      let context = canvas.getContext('2d')
      context.drawImage(this.$refs.video, 0, 0, this.videoSettings.width, this.videoSettings.height)
      let data = context.getImageData(0, 0, this.videoSettings.width, this.videoSettings.height).data
      let imgData = {
        url: canvas.toDataURL('image/png'),
        data
      }
      this.$emit('add-sample', { category: this.category, imgData })
    },

    toggleShowAll() {
      this.isShowAll = !this.isShowAll
    },

    toggleCapture() {
      if (this.isCapturing) {
        clearInterval(this.intervalId)
        this.intervalId = null
        this.isPreview = true
      } else {
        this.intervalId = setInterval(() => {
          this.snap()
        }, 300)
      }
      this.isCapturing = !this.isCapturing
    },

    togglePreview() {
      this.isPreview = !this.isPreview
    },

    setEdit() {
      this.isEditing = true
      this.$refs.input.select()
      this.$refs.input.focus()
    },

    completedEdit() {
      this.isEditing = false
      this.$emit('name-changed', { category: this.category, name: this.categoryName })
    },

    remove(item) {
      this.$emit('remove-item', { category: this.category, item })
    }
  }
}
