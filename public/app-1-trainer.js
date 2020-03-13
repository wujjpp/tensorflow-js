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

function train({ samples, labels, inputShape, categoryCount, epochs }) {
  let x = tf.tensor(samples).reshape([samples.length, ...inputShape])
  let y = tf.tensor(labels)
  model = tf.sequential()

  model.add(tf.layers.conv2d({
    inputShape: inputShape,
    kernelSize: 5,
    filters: 8,
    strides: 1,
    activation: 'relu',
    kernelInitializer: 'varianceScaling'
  }))

  model.add(tf.layers.maxPooling2d({ poolSize: [2, 2], strides: [2, 2] }))

  model.add(tf.layers.conv2d({
    kernelSize: 5,
    filters: 16,
    strides: 1,
    activation: 'relu',
    kernelInitializer: 'varianceScaling'
  }))

  model.add(tf.layers.maxPooling2d({ poolSize: [2, 2], strides: [2, 2] }))

  model.add(tf.layers.flatten())

  model.add(tf.layers.dense({
    units: categoryCount,
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
    .then(() => {
      self.postMessage({
        event: 'onTrainEnd'
      })
    })
}

function predict({ sample, inputShape }) {
  let x = tf.tensor(sample).reshape(inputShape)
  let preds = model.predict(x)
  let itemIndex = preds.argMax([-1]).arraySync()[0]
  let percents = preds.arraySync()
  self.postMessage({
    event: 'onPredictEnd',
    payload: {
      matchIndex: itemIndex,
      percents: percents[0]
    }
  })
}
