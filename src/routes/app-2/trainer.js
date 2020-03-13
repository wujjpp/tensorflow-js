/**
* Created by Wu Jian Ping on - 2019/08/06.
*/

import { EventEmitter } from 'events'

class Trainer extends EventEmitter {
  constructor() {
    super()
    this._worker = new Worker('app-2-trainer.js')

    this._worker.onmessage = e => {
      switch (e.data.event) {
      case 'onEpochEnd':
        this.emit('onEpochEnd', e.data.payload)
        break
      case 'onTrainEnd':
        this.emit('onTrainEnd')
        break
      case 'onPredictEnd':
        this.emit('onPredictEnd', e.data.payload)
        break
      }
    }

    this._worker.onerror = err => {
      this.emit('onError', err)
    }
  }

  train({ samples, labels, epochs }) {
    this._worker.postMessage({
      event: 'onTrain',
      payload: {
        samples,
        labels,
        epochs
      }
    })
  }

  predict({ samples }) {
    this._worker.postMessage({
      event: 'onPredict',
      payload: {
        samples
      }
    })
  }
}

export default new Trainer()
