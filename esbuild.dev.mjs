import * as esbuild from 'esbuild'

let ctx = await esbuild.context({
  entryPoints: ['src/TodoListApp.tsx'],
  outdir: 'dist/assets',
  bundle: true,
  sourcemap: true,
})

let { host, port } = await ctx.serve({
  servedir: 'dist',
})
console.log(`Dev Server running at ${host}:${port}`)
