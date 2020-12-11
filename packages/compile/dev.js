const Webpack = require('webpack')
const WebpackDevServer = require('webpack-dev-server')
const config = require('../../webpack.site.config.js')
const genImports = require('./codegen/generate-imports')
const chalk = require('chalk')
// 生成文件并启动 dev server


genImports()
const compiler = Webpack(config)
process.env.NODE_ENV = 'development'
const port = config.devServer.port
const local = `http://localhost:${port}/`;
// const network = `http://${address.ip()}:${port}/`;
console.log('\n  Site running at:\n');
console.log(`  ${chalk.bold('Local')}:    ${chalk.magenta(local)} `);
const server = new WebpackDevServer(compiler, config.devServer)
server.showStatus = function(){}
server.listen(port)