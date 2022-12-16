const { defineConfig } = require('@vue/cli-service');
const path = require('path');
const resolve = (dir) => path.join(__dirname, dir);

// element-plus的按需引入
const AutoImport = require('unplugin-auto-import/webpack');
const Components = require('unplugin-vue-components/webpack');
const { ElementPlusResolver } = require('unplugin-vue-components/resolvers');
const Icons = require('unplugin-icons/webpack');
const IconResolver = require('unplugin-icons/resolver');

module.exports = defineConfig({
  transpileDependencies: true,
  outputDir: './build',
  lintOnSave: false,
  devServer: {
    historyApiFallback: true, //配置在开发环境下的路由刷新后报404问题
    proxy: {
      //配置跨域代理
      '^/api': {
        target: '',
        pathRewrite: {
          '^/api': ''
        },
        changeOrigin: true
      }
    }
  },
  configureWebpack: {
    resolve: {
      alias: {
        views: '@/views',
        components: '@/components'
      }
    },
    plugins: [
      require('unplugin-element-plus/webpack')(),
      AutoImport({
        resolvers: [ElementPlusResolver(), IconResolver({ prefix: 'i' })]
      }),
      Components({
        resolvers: [
          ElementPlusResolver(),
          IconResolver({ enabledCollections: ['ep'] })
        ]
      }),
      Icons({ autoInstall: true })
    ]
  },
  chainWebpack(config) {
    // set svg-sprite-loader
    // first: 让其他svg loader不要对src/icons进行操作
    config.module
      .rule('svg')
      .exclude.add(resolve('src/assets/icons/svg'))
      .end();
    config.module
      .rule('icons')
      .test(/\.svg$/)
      .include.add(resolve('src/assets/icons/svg'))
      .end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({ symbolId: 'icon-[name]' })
      .end();
  }
});
