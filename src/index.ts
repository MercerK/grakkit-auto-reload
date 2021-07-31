import core from '@grakkit/stdlib-paper'
import { app } from './reload'

if (process.env.NODE_ENV === 'development') {
  app.listen(4000)

  app.get('/reload', (req, res) => {
    res.send('done')

    reload()
  })

  console.log('Development Mode')
} else {
  console.log('Production Mode')
}

function reload() {
  if (process.env.NODE_ENV === 'development') {
    app.stop()
  }

  core.reload()
  console.log('Grakkit: Reloaded')
}