const compiler = require('vue-template-compiler')
const { compileTemplate } = require('@vue/component-compiler-utils')

module.export = function compileTemplateBlock(source) {
  // const compilerOptions = Object.assign({
  //   outputSourceRange: true
  // }, options.compilerOptions, {
  //   scopeId: query.scoped ? `data-v-${id}` : null,
  //   comments: query.comments
  // })

  // for vue-component-compiler
  const finalOptions = {
    source,
    filename: this.resourcePath,
    compiler,
    // transformAssetUrls: options.transformAssetUrls || true,
    prettify: false
  }

  const compiled = compileTemplate(finalOptions)

  // tips
  if (compiled.tips && compiled.tips.length) {
    compiled.tips.forEach(tip => {
      // loaderContext.emitWarning(typeof tip === 'object' ? tip.msg : tip)
    })
  }

  // errors
  // if (compiled.errors && compiled.errors.length) {
  //   // 2.6 compiler outputs errors as objects with range
  //   if (compiler.generateCodeFrame && finalOptions.compilerOptions.outputSourceRange) {
  //     // TODO account for line offset in case template isn't placed at top
  //     // of the file
  //     loaderContext.emitError(
  //       '\n\n  Errors compiling template:\n\n' +
  //       compiled.errors.map(({ msg, start, end }) => {
  //         const frame = compiler.generateCodeFrame(source, start, end)
  //         return `  ${msg}\n\n${pad(frame)}`
  //       }).join('\n\n') +
  //       '\n'
  //     )
  //   } else {
  //     loaderContext.emitError(
  //       `\n  Error compiling template:\n${pad(compiled.source)}\n` +
  //         compiled.errors.map(e => `  - ${e}`).join('\n') +
  //         '\n'
  //     )
  //   }
  // }

  const { code } = compiled
  // finish with ESM exports
  return code + '\nexport { render, staticRenderFns }'
}

// function pad(source) {
//   return source
//     .split(/\r?\n/)
//     .map(line => `  ${line}`)
//     .join('\n')
// }
