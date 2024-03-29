#!/usr/bin/env node
'use strict'
var log = _interopRequireWildcard(
  require('./node_modules/next/dist/build/output/log')
)
var _index = _interopRequireDefault(
  require('./node_modules/next/dist/compiled/arg/index.js')
)
var _constants = require('./node_modules/next/dist/lib/constants')
function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj }
}
function _getRequireWildcardCache() {
  if (typeof WeakMap !== 'function') return null
  var cache = new WeakMap()
  _getRequireWildcardCache = function () {
    return cache
  }
  return cache
}
function _interopRequireWildcard(obj) {
  if (obj && obj.__esModule) {
    return obj
  }
  if (obj === null || (typeof obj !== 'object' && typeof obj !== 'function')) {
    return { default: obj }
  }
  var cache = _getRequireWildcardCache()
  if (cache && cache.has(obj)) {
    return cache.get(obj)
  }
  var newObj = {}
  var hasPropertyDescriptor =
    Object.defineProperty && Object.getOwnPropertyDescriptor
  for (var key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      var desc = hasPropertyDescriptor
        ? Object.getOwnPropertyDescriptor(obj, key)
        : null
      if (desc && (desc.get || desc.set)) {
        Object.defineProperty(newObj, key, desc)
      } else {
        newObj[key] = obj[key]
      }
    }
  }
  newObj.default = obj
  if (cache) {
    cache.set(obj, newObj)
  }
  return newObj
}
;['react', 'react-dom'].forEach((dependency) => {
  try {
    // When 'npm link' is used it checks the clone location. Not the project.
    require.resolve(dependency)
  } catch (err) {
    // tslint:disable-next-line
    console.warn(
      `The module '${dependency}' was not found. Next.js requires that you include it in 'dependencies' of your 'package.json'. To add it, run 'npm install ${dependency}'`
    )
  }
})
const defaultCommand = 'start'
const commands = {
  build: async () =>
    await Promise.resolve()
      .then(() =>
        _interopRequireWildcard(
          require('./node_modules/next/dist/cli/next-build')
        )
      )
      .then((i) => i.nextBuild),
  start: async () =>
    await Promise.resolve()
      .then(() =>
        _interopRequireWildcard(
          require('./node_modules/next/dist/cli/next-start')
        )
      )
      .then((i) => i.nextStart),
  export: async () =>
    await Promise.resolve()
      .then(() =>
        _interopRequireWildcard(
          require('./node_modules/next/dist/cli/next-export')
        )
      )
      .then((i) => i.nextExport),
  dev: async () =>
    await Promise.resolve()
      .then(() =>
        _interopRequireWildcard(
          require('./node_modules/next/dist/cli/next-dev')
        )
      )
      .then((i) => i.nextDev),
  telemetry: async () =>
    await Promise.resolve()
      .then(() =>
        _interopRequireWildcard(
          require('./node_modules/next/dist/cli/next-telemetry')
        )
      )
      .then((i) => i.nextTelemetry),
}
const args = (0, _index.default)(
  {
    // Types
    '--version': Boolean,
    '--help': Boolean,
    '--inspect': Boolean, // Aliases
    '-v': '--version',
    '-h': '--help',
  },
  { permissive: true }
) // Version is inlined into the file using taskr build pipeline
if (args['--version']) {
  // tslint:disable-next-line
  console.log(`Next.js v${'9.5.2'}`)
  process.exit(0)
} // Check if we are running `next <subcommand>` or `next`
const foundCommand = Boolean(commands[args._[0]]) // Makes sure the `next <subcommand> --help` case is covered
// This help message is only showed for `next --help`
if (!foundCommand && args['--help']) {
  // tslint:disable-next-line
  console.log(`
    Usage
      $ next <command>

    Available commands
      ${Object.keys(commands).join(', ')}

    Options
      --version, -v   Version number
      --help, -h      Displays this message

    For more information run a command with the --help flag
      $ next build --help
  `)
  process.exit(0)
}
const command = foundCommand ? args._[0] : defaultCommand
const forwardedArgs = foundCommand ? args._.slice(1) : args._
if (args['--inspect'])
  throw new Error(
    `--inspect flag is deprecated. Use env variable NODE_OPTIONS instead: NODE_OPTIONS='--inspect' next ${command}`
  ) // Make sure the `next <subcommand> --help` case is covered
if (args['--help']) {
  forwardedArgs.push('--help')
}
const defaultEnv = command === 'dev' ? 'development' : 'production'
const standardEnv = ['production', 'development', 'test']
if (process.env.NODE_ENV && !standardEnv.includes(process.env.NODE_ENV)) {
  log.warn(_constants.NON_STANDARD_NODE_ENV)
}
process.env.NODE_ENV = process.env.NODE_ENV || defaultEnv // this needs to come after we set the correct NODE_ENV or
// else it might cause SSR to break
const React = require('react')
if (typeof React.Suspense === 'undefined') {
  throw new Error(
    `The version of React you are using is lower than the minimum required version needed for Next.js. Please upgrade "react" and "react-dom": "npm install react react-dom" https://err.sh/vercel/next.js/invalid-react-version`
  )
}
commands[command]().then((exec) => exec(forwardedArgs))
if (command === 'dev') {
  const {
    CONFIG_FILE,
  } = require('./node_modules/next/dist/next-server/lib/constants')
  const { watchFile } = require('fs')
  watchFile(`${process.cwd()}/${CONFIG_FILE}`, (cur, prev) => {
    if (cur.size > 0 || prev.size > 0) {
      // tslint:disable-next-line
      console.log(
        `\n> Found a change in ${CONFIG_FILE}. Restart the server to see the changes in effect.`
      )
    }
  })
}
//# sourceMappingURL=next.map
