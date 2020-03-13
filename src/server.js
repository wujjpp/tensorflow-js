/**
 * Created by Wu Jian Ping on - 2017/09/06.
 */

import express from 'express'
import compression from 'compression'
import path from 'path'
import helmet from 'helmet'
import fs from 'fs'
import config from '../tools/config'

const PORT = process.env.PORT || config.backendPort || 9000
const app = express()

app.use(helmet())
app.use(compression())

app.use(express.static(path.join(__dirname, 'public')))

// 这么干着先，回头优化
app.get('*', (req, res, next) => {
  fs.readFile(path.join(__dirname, 'public', 'index.html'), 'utf8', (err, content) => {
    if (err) {
      next(err)
    } else {
      res.send(content)
    }
  })
})

let logger = console
app.listen(PORT, function (err) {
  if (err) {
    throw err
  }
  logger.log(`Listening at http://localhost:${PORT}/`) // eslint-disable-line
})
