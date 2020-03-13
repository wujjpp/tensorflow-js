/**
* Created by Wu Jian Ping on - 2019/08/08.
*/

import _ from 'lodash'
import trainer from './trainer'

const COLORS = {
  red: 'rgba(255, 0, 0, 1)',
  blue: 'rgba(0, 0, 255, 1)'
}

const COLORS2 = {
  red: 'rgba(255, 0, 0, 1)',
  blue: 'rgba(0, 0, 255, 1)'
}

const maxSamples = 2000
const size = { width: 300, height: 300 }

let matrix = []

export default {
  name: 'app-2',

  data() {
    return {
      acc: 0,
      loss: 0,
      epochs: 0,
      totalEpochs: 5000,
      isStarting: false,

      lossChartData: {
        // animation: false,
        title: {
          text: '损失'
        },
        tooltip: {
          trigger: 'axis'
        },
        xAxis: {
          show: false,
          type: 'category',
          data: []
        },
        yAxis: {
          axisLabel: { show: true }
        },
        series: [{
          type: 'line',
          data: []
        }]
      },

      accChartData: {
        // animation: false,
        title: {
          text: '精度'
        },
        tooltip: {
          trigger: 'axis'
        },
        xAxis: {
          show: false,
          type: 'category',
          data: []
        },
        yAxis: {
          axisLabel: { show: true }
        },
        series: [{
          type: 'line',
          data: []
        }]
      }
    }
  },

  mounted() {
    this.canvas = this.$refs.canvas
    this.ctx = this.canvas.getContext('2d')

    this.canvas2 = this.$refs.canvas2
    this.ctx2 = this.canvas2.getContext('2d')

    matrix = []
    for (let i = 0; i < maxSamples; ++i) {
      matrix.push([_.random(0, size.width) / (size.width * 1.0), _.random(0, size.height) / (size.height * 1.0)])
    }

    trainer.on('onEpochEnd', d => {
      this.acc = d.logs.acc
      this.loss = d.logs.loss
      this.epochs = d.epochs

      // if (d.epochs > 100) {
      //   this.lossChartData.xAxis.data.shift()
      //   this.lossChartData.series[0].data.shift()

      //   this.accChartData.xAxis.data.shift()
      //   this.accChartData.series[0].data.shift()
      // }

      this.lossChartData.xAxis.data.push(d.epochs)
      this.lossChartData.series[0].data.push(d.logs.loss)

      this.accChartData.xAxis.data.push(d.epochs)
      this.accChartData.series[0].data.push(d.logs.acc)

      if (this.epochs < this.totalEpochs) {
        trainer.predict({ samples: matrix })
      }
    })

    trainer.on('onPredictEnd', ({ percents }) => {
      this.ctx2.clearRect(0, 0, size.width, size.height)
      _.each(matrix, (o, n) => {
        let color = percents[n][0] > percents[n][1] ? COLORS2.red : COLORS2.blue
        this.drawPoint(this.ctx2, o[0] * size.width, o[1] * size.height, 2, color)
      })
    })
  },

  methods: {
    init() {
      let samples = []
      let labels = []
      let colors = []
      let loss = 10

      this.samples = samples
      this.labels = labels
      this.colors = colors

      for (let i = 0; i < maxSamples; ++i) {
        let x = _.random(0, size.width)
        let y = _.random(0, size.height)

        if (x < size.width / 2 && y < size.height / 2) {
          samples.push([x + _.random(0, loss), y + _.random(0, loss)])
          labels.push([1, 0])
          colors.push(COLORS.red)
        }
        if (x > size.width / 2 && y > size.height / 2) {
          samples.push([x - _.random(0, loss), y - _.random(0, loss)])
          labels.push([1, 0])
          colors.push(COLORS.red)
        }

        if (x >= size.width / 2 && y <= size.height / 2) {
          samples.push([x - _.random(0, loss), y + _.random(0, loss)])
          labels.push([0, 1])
          colors.push(COLORS.blue)
        }

        if (x <= size.width / 2 && y >= size.height / 2) {
          samples.push([x + _.random(0, loss), y - _.random(0, loss)])
          labels.push([0, 1])
          colors.push(COLORS.blue)
        }
      }

      for (let i = 0; i < maxSamples; ++i) {
        this.drawPoint(this.ctx, samples[i][0], samples[i][1], 2, colors[i])
      }

      for (let i = 0; i < matrix.length; ++i) {
        this.drawPoint(this.ctx2, matrix[i][0] * size.width, matrix[i][1] * size.height, 2, _.random(0, 1) === 0 ? COLORS2.red : COLORS2.blue)
      }
    },

    drawPoint(ctx, x, y, r, color) {
      ctx.save()
      ctx.translate(x, y)
      ctx.beginPath()
      ctx.arc(0, 0, r, 0, 2 * Math.PI)
      ctx.fillStyle = color
      ctx.fill()
      ctx.restore()
    },

    train() {
      let samples = _.map(this.samples, o => {
        return [o[0] / (size.width * 1.0), o[1] / (size.height * 1.0)]
      })

      this.isStarting = true

      trainer.train({ samples: samples, labels: this.labels, epochs: 100000 })
    }
  }
}
