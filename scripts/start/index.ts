import webpack from 'webpack'
import path from 'path'
import fs from 'fs'
import { formatWebpackMessages } from './util'
import got from 'got'

const PATH_ROOT = path.join(__dirname, '..', '..')
const PATH_DEPS = path.join(PATH_ROOT, 'deps')
const PATH_GRAKKIT = path.join(PATH_ROOT, 'server/plugins/grakkit')

const createConfig = require(path.join(PATH_ROOT, 'webpack.config.js'))
const isInteractive = process.stdout.isTTY

function clearConsole() {
  process.stdout.write(process.platform === 'win32' ? '\x1B[2J\x1B[0f' : '\x1B[2J\x1B[3J\x1B[H')
}

function copyDependencies() {
  const files = fs.readdirSync(PATH_DEPS).filter(f => f.includes(".jar"))

  files.forEach((file) => 
    fs.copyFileSync(path.join(PATH_DEPS, file), path.join(PATH_GRAKKIT, file))
  )
}

// fork from https://github.com/facebook/create-react-app/blob/main/packages/react-dev-utils/WebpackDevServerUtils.js#L104
async function main() {
  const config = createConfig({ dev: true })

  copyDependencies()

  let compiler: webpack.Compiler
  try {
    compiler = webpack(config)
  } catch (err) {
    console.log(err)

    process.exit(1)
  }

  if (isInteractive) {
    clearConsole()
  }

  compiler.hooks.invalid.tap('invalid', () => {
    if (isInteractive) {
      clearConsole()
    }
    console.log('Compiling...')
  })

  // "done" event fires when webpack has finished recompiling the bundle.
  // Whether or not you have warnings or errors, you will get this event.
  compiler.hooks.done.tap('done', async (stats) => {
    if (isInteractive) {
      clearConsole()
    }

    // We have switched off the default webpack output in WebpackDevServer
    // options so we are going to "massage" the warnings and errors and present
    // them in a readable focused way.
    // We only construct the warnings and errors for speed:
    // https://github.com/facebook/create-react-app/issues/4492#issuecomment-421959548
    const statsData = stats.toJson({
      all: false,
      warnings: true,
      errors: true,
    })

    const messages = formatWebpackMessages(statsData)

    console.log(messages)
    console.log('Compiled successfully')

    handleReload()
  })

  return compiler.watch({}, (stats) => {
    console.log(stats)
  })
}

async function handleReload() {
  try {
    const req = await got.get('http://localhost:4000/reload', { timeout: 1000 })
    console.log('Reload successful')

    return
  } catch (err) {
    console.log('Failed to connect...')
    return setTimeout(handleReload, 1000)
  }
}

main()
