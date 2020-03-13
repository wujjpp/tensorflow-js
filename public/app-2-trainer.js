/**
* Created by Wu Jian Ping on - 2019/08/06.
*/

importScripts('tf.min.js')

let tf = self.tf
let model

self.addEventListener('message', function (e) {
  switch (e.data.event) {
  case 'onTrain':
    train(e.data.payload)
    break
  case 'onPredict':
    predict(e.data.payload)
    break
  }
}, false)

function train({ samples, labels, epochs }) {
  let x = tf.tensor(samples).reshape([samples.length, 2])
  let y = tf.tensor(labels)

  model = tf.sequential()

  model.add(tf.layers.dense({
    units: 128,
    inputShape: [2],
    kernelInitializer: 'varianceScaling',
    activation: 'softmax'
  }))

  model.add(tf.layers.dense({
    units: 2,
    kernelInitializer: 'varianceScaling',
    activation: 'softmax'
  }))

  model.summary()

  const optimizer = tf.train.adam()

  model.compile({
    optimizer: optimizer,
    loss: 'categoricalCrossentropy',
    metrics: ['accuracy']
  })

  model
    .fit(x, y, {
      epochs: epochs,
      shuffle: true,
      callbacks: [{
        onEpochEnd(epochs, logs) {
          self.postMessage({
            event: 'onEpochEnd',
            payload: {
              epochs: epochs,
              logs
            }
          })
        }
      }]
    })
}

function predict({ samples }) {
  let x = tf.tensor(samples).reshape([samples.length, 2])
  let preds = model.predict(x)
  let percents = preds.arraySync()
  self.postMessage({
    event: 'onPredictEnd',
    payload: {
      percents: percents
    }
  })
}
