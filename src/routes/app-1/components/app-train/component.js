/**
* Created by Wu Jian Ping on - 2019/08/06.
*/

export default {
  name: 'app-train',

  props: {
    state: {
      type: Object,
      default() {
        return {
          stage: 0,
          loss: 0,
          acc: 0,
          epochs: 0,
          EPOCHS: 0
        }
      }
    }
  },

  methods: {
    train() {
      this.$emit('start-train')
    }
  }
}
