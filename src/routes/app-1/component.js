/**
* Created by Wu Jian Ping on - 2019/08/06.
*/

import appCategory from './components/app-category'
import appTrain from './components/app-train'
import appFooter from './components/app-footer'
import _ from 'lodash'
import trainer from './trainer'
import webcam from './webcam'

export default {
  name: 'app',

  components: {
    [appCategory.name]: appCategory,
    [appTrain.name]: appTrain,
    [appFooter.name]: appFooter
  },

  data() {
    return {
      videoSettings: {
        width: 180,
        height: 135
      },
      categories: [],

      state: {
        // 0: prepare samples, 1: training, 2: predict
        stage: 0,
        loss: 0,
        acc: 0,
        epochs: 0,
        EPOCHS: 20,
        intervalId: null,
        isPredicting: false,
        itemName: ''
      }
    }
  },

  computed: {
    stateName() {
      if (this.state.stage === 0) {
        return ''
      } else {
        return `epochs: ${this.state.epochs}/${this.state.EPOCHS}, loss: ${this.state.loss}, acc: ${this.state.acc}`
      }
    }
  },

  mounted() {
    trainer.on('onEpochEnd', d => {
      this.state.epochs = d.epochs + 1
      this.state.acc = d.logs.acc
      this.state.loss = d.logs.loss
    })

    trainer.on('onTrainEnd', () => {
      this.state.stage = 2
    })

    trainer.on('onPredictEnd', d => {
      _.each(this.categories, (o, n) => {
        o.percent = d.percents[n]
      })
      this.state.itemName = this.categories[d.matchIndex].name
    })
    webcam.attach(this.$refs.video)
  },

  methods: {
    train() {
      this.state.stage = 1
      this.state.epochs = '0'
      this.state.loss = '0'
      this.state.acc = '0'

      let samples = []
      let labels = []

      _.each(this.categories, (o, n) => {
        let label = []
        for (var i = 0; i < this.categories.length; ++i) {
          label.push(i === n ? 1 : 0)
        }
        label = JSON.stringify(label)

        _.each(o.items, d => {
          samples.push(d.data)
          labels.push(JSON.parse(label))
        })
      })

      trainer.train({
        samples,
        labels,
        inputShape: [this.videoSettings.width, this.videoSettings.height, 4],
        categoryCount: this.categories.length,
        epochs: this.state.EPOCHS
      })
    },

    onAddSample({ category, imgData }) {
      let tmp = [...imgData.data]
      _.each(tmp, (o, n) => {
        tmp[n] = o / 255.0
      })

      category.items.push({
        url: imgData.url,
        data: tmp
      })
    },

    addNewCategory() {
      this.categories.push({
        name: `分类 - ${this.categories.length + 1}`,
        percent: 0,
        items: []
      })
    },

    onNameChanged({ category, name }) {
      category.name = name
    },

    onRemoveItem({ category, item }) {
      category.items = _.filter(category.items, o => o !== item)
    },

    predict() {
      if (this.state.isPredicting) {
        clearInterval(this.intervalId)
        _.each(this.categories, o => {
          o.percent = 0
        })
      } else {
        this.intervalId = setInterval(() => {
          let video = this.$refs.video
          let canvas = this.$refs.canvas
          let context = canvas.getContext('2d')

          context.drawImage(video, 0, 0, this.videoSettings.width, this.videoSettings.height)

          let data = [...context.getImageData(0, 0, this.videoSettings.width, this.videoSettings.height).data]

          let tmp = [...data]
          _.each(tmp, (o, n) => {
            tmp[n] = o / 255.0
          })

          trainer.predict({
            sample: tmp,
            inputShape: [1, this.videoSettings.width, this.videoSettings.height, 4]
          })
        }, 500)
      }

      this.state.isPredicting = !this.state.isPredicting
    }
  }
}
