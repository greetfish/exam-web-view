const path = require('path')
const debug = process.env.NODE_ENV !== 'production'

module.exports = {
    pages: {
      adminPage: {
        entry: 'src/pages/adminPage/main.js',
        template: 'public/admin.html',
        filename: 'admin.html',
        title: 'admin Page'
      },
      userPage: {
        entry: 'src/pages/userPage/main.js',
        template: 'public/index.html',
        filename: 'index.html',
        title: 'index page'
      }
    },
    publicPath: './', // 根域上下文目录
    outputDir: 'dist', // 构建输出目录
    assetsDir: 'assets', // 静态资源目录 (js, css, img, fonts)
    lintOnSave: true, // 是否开启eslint保存检测，有效值：ture | false | 'error'
    runtimeCompiler: true, // 运行时版本是否需要编译
    transpileDependencies: [], // 默认babel-loader忽略mode_modules，这里可增加例外的依赖包名
    productionSourceMap: true, // 是否在构建生产包时生成 sourceMap 文件，false将提高构建速度
    configureWebpack: config => { // webpack配置，值位对象时会合并配置，为方法时会改写配置
        if (debug) { // 开发环境配置
            config.devtool = 'cheap-module-eval-source-map'
        } else { // 生产环境配置
        }
         Object.assign(config, { // 开发生产共同配置，配置别名
            resolve: {
              alias: {
                '@': path.resolve(__dirname, './src'),
                '@c': path.resolve(__dirname, './src/components'),
                'vue$': 'vue/dist/vue.esm.js'
              }
            }
         })
    },
    chainWebpack: config => { // webpack链接API，用于生成和修改webapck配置，
        if (debug) {
            // 本地开发配置
        } else {
            // 生产开发配置
        }
    },
    parallel: require('os').cpus().length > 1, // 构建时开启多进程处理babel编译
    pluginOptions: { // 第三方插件配置
    },
    pwa: { // 单页插件相关配置 https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-pwa
    },
    devServer: {
        open: true,
        host: '127.0.0.1',
        port: 80,
        https: false,
        hotOnly: false,
        proxy: { // 配置跨域
          '/test': {
　　　　　　 //要访问的跨域的api的域名
            target: 'http://127.0.0.1:8080/test',
            ws: true,
            changOrigin: true,
            pathRewrite: {
              '^/test': ''
            }
          },
          '/api_getAllCourse': {
　　　　　　 //要访问的跨域的api的域名
            target: 'http://127.0.0.1:8080/api_getAllCourse',
            ws: true,
            changOrigin: true,
            pathRewrite: {
              '^/api_getAllCourse': ''
            }
          },
          '/api_newCourse': {
　　　　　　 //要访问的跨域的api的域名
            target: 'http://127.0.0.1:8080/api_newCourse',
            ws: true,
            changOrigin: true,
            pathRewrite: {
              '^/api_newCourse': ''
            }
          },
          '/api_uploadQuestionFile': {
　　　　　　 //要访问的跨域的api的域名
            target: 'http://127.0.0.1:8080/api_uploadQuestionFile',
            ws: true,
            changOrigin: true,
            pathRewrite: {
              '^/api_uploadQuestionFile': ''
            }
          },
          '/api_getCourseById': {
　　　　　　 //要访问的跨域的api的域名
            target: 'http://127.0.0.1:8080/api_getCourseById',
            ws: true,
            changOrigin: true,
            pathRewrite: {
              '^/api_getCourseById': ''
            }
          },
          '/api_newPaper': {
　　　　　　 //要访问的跨域的api的域名
            target: 'http://127.0.0.1:8080/api_newPaper',
            ws: true,
            changOrigin: true,
            pathRewrite: {
              '^/api_newPaper': ''
            }
          },
          '/api_getAllMemberGroup': {
　　　　　　 //要访问的跨域的api的域名
            target: 'http://127.0.0.1:8080/api_getAllMemberGroup',
            ws: true,
            changOrigin: true,
            pathRewrite: {
              '^/api_getAllMemberGroup': ''
            }
          },
          '/api_getAllMemberByMemberGroupId': {
　　　　　　 //要访问的跨域的api的域名
            target: 'http://127.0.0.1:8080/api_getAllMemberByMemberGroupId',
            ws: true,
            changOrigin: true,
            pathRewrite: {
              '^/api_getAllMemberByMemberGroupId': ''
            }
          },
          '/api_uploadMemberGroupFile': {
　　　　　　 //要访问的跨域的api的域名
            target: 'http://127.0.0.1:8080/api_uploadMemberGroupFile',
            ws: true,
            changOrigin: true,
            pathRewrite: {
              '^/api_uploadMemberGroupFile': ''
            }
          },
          '/api_memberDelete': {
　　　　　　 //要访问的跨域的api的域名
            target: 'http://127.0.0.1:8080/api_memberDelete',
            ws: true,
            changOrigin: true,
            pathRewrite: {
              '^/api_memberDelete': ''
            }
          },
          '/api_deleteCourse': {
　　　　　　 //要访问的跨域的api的域名
            target: 'http://127.0.0.1:8080/api_deleteCourse',
            ws: true,
            changOrigin: true,
            pathRewrite: {
              '^/api_deleteCourse': ''
            }
          },
          '/api_deleteQuestionByType': {
　　　　　　 //要访问的跨域的api的域名
            target: 'http://127.0.0.1:8080/api_deleteQuestionByType',
            ws: true,
            changOrigin: true,
            pathRewrite: {
              '^/api_deleteQuestionByType': ''
            }
          },
          '/api_setPaperToExam': {
　　　　　　 //要访问的跨域的api的域名
            target: 'http://127.0.0.1:8080/api_setPaperToExam',
            ws: true,
            changOrigin: true,
            pathRewrite: {
              '^/api_setPaperToExam': ''
            }
          },
          '/api_deletePaper': {
　　　　　　 //要访问的跨域的api的域名
            target: 'http://127.0.0.1:8080/api_deletePaper',
            ws: true,
            changOrigin: true,
            pathRewrite: {
              '^/api_deletePaper': ''
            }
          },
          '/api_getAllPaper': {
　　　　　　 //要访问的跨域的api的域名
            target: 'http://127.0.0.1:8080/api_getAllPaper',
            ws: true,
            changOrigin: true,
            pathRewrite: {
              '^/api_getAllPaper': ''
            }
          },
          '/api_getAllMemberPaper': {
　　　　　　 //要访问的跨域的api的域名
            target: 'http://127.0.0.1:8080/api_getAllMemberPaper',
            ws: true,
            changOrigin: true,
            pathRewrite: {
              '^/api_getAllMemberPaper': ''
            }
          },
          '/user_examLogin': {
　　　　　　 //考生登录
            target: 'http://127.0.0.1:8080/user_examLogin',
            ws: true,
            changOrigin: true,
            pathRewrite: {
              '^/user_examLogin': ''
            }
          },
          '/user_startExaming': {
　　　　　　 //考生开考（此时开始抽题）
            target: 'http://127.0.0.1:8080/user_startExaming',
            ws: true,
            changOrigin: true,
            pathRewrite: {
              '^/user_startExaming': ''
            }
          },
          '/user_saveAnswer': {
　　　　　　 //保存一题答案
            target: 'http://127.0.0.1:8080/user_saveAnswer',
            ws: true,
            changOrigin: true,
            pathRewrite: {
              '^/user_saveAnswer': ''
            }
          },
          '/user_endExaming': {
　　　　　　 //结束考核（并计算成绩）
            target: 'http://127.0.0.1:8080/user_endExaming',
            ws: true,
            changOrigin: true,
            pathRewrite: {
              '^/user_endExaming': ''
            }
          },
          '/user_rewriteLeftMinute': {
　　　　　　 //更改剩余分钟数
            target: 'http://127.0.0.1:8080/user_rewriteLeftMinute',
            ws: true,
            changOrigin: true,
            pathRewrite: {
              '^/user_rewriteLeftMinute': ''
            }
          },
          '/login': {
　　　　　　 //登录
            target: 'http://127.0.0.1:8080/login',
            ws: true,
            changOrigin: true,
            pathRewrite: {
              '^/login': ''
            }
          },
          '/logout': {
　　　　　　 //登出
            target: 'http://127.0.0.1:8080/logout',
            ws: true,
            changOrigin: true,
            pathRewrite: {
              '^/logout': ''
            }
          },
          '/api_endExamForMemberPaper': {
　　　　　　 //结束考核
            target: 'http://127.0.0.1:8080/api_endExamForMemberPaper',
            ws: true,
            changOrigin: true,
            pathRewrite: {
              '^/api_endExamForMemberPaper': ''
            }
          },
          '/api_removeMemberPaper': {
　　　　　　 //移除考生
            target: 'http://127.0.0.1:8080/api_removeMemberPaper',
            ws: true,
            changOrigin: true,
            pathRewrite: {
              '^/api_removeMemberPaper': ''
            }
          },
          '/api_redoExamForMemberPaper': {
　　　　　　 //允许重考
            target: 'http://127.0.0.1:8080/api_redoExamForMemberPaper',
            ws: true,
            changOrigin: true,
            pathRewrite: {
              '^/api_redoExamForMemberPaper': ''
            }
          },
          '/api_downloadMemberPaperList': {
　　　　　　 //下载考生信息列表
            target: 'http://127.0.0.1:8080/api_downloadMemberPaperList',
            ws: true,
            changOrigin: true,
            pathRewrite: {
              '^/api_downloadMemberPaperList': ''
            }
          },
          '/api_downloadScore': {
　　　　　　 //导出考核成绩
            target: 'http://127.0.0.1:8080/api_downloadScore',
            ws: true,
            changOrigin: true,
            pathRewrite: {
              '^/api_downloadScore': ''
            }
          },
          '/api_endExamForPaper': {
　　　　　　 //结束考核(整个考试)
            target: 'http://127.0.0.1:8080/api_endExamForPaper',
            ws: true,
            changOrigin: true,
            pathRewrite: {
              '^/api_endExamForPaper': ''
            }
          },
          '/api_documentPaper': {
　　　　　　 //归档试卷
            target: 'http://127.0.0.1:8080/api_documentPaper',
            ws: true,
            changOrigin: true,
            pathRewrite: {
              '^/api_documentPaper': ''
            }
          },
          '/user_getSystemName': {
　　　　　　 //获取系统名称
            target: 'http://127.0.0.1:8080/user_getSystemName',
            ws: true,
            changOrigin: true,
            pathRewrite: {
              '^/user_getSystemName': ''
            }
          },
          '/api_changeSystemName': {
　　　　　　 //更改系统名称
            target: 'http://127.0.0.1:8080/api_changeSystemName',
            ws: true,
            changOrigin: true,
            pathRewrite: {
              '^/api_changeSystemName': ''
            }
          },
          '/api_changePassword': {
　　　　　　 //更改登录密码
            target: 'http://127.0.0.1:8080/api_changePassword',
            ws: true,
            changOrigin: true,
            pathRewrite: {
              '^/api_changePassword': ''
            }
          },
          '/api_setNewScoreForQuestion': {
　　　　　　 //更改该题得分
            target: 'http://127.0.0.1:8080/api_setNewScoreForQuestion',
            ws: true,
            changOrigin: true,
            pathRewrite: {
              '^/api_setNewScoreForQuestion': ''
            }
          },
          '/api_deleteMemberGroup': {
　　　　　　 //更改该题得分
            target: 'http://127.0.0.1:8080/api_deleteMemberGroup',
            ws: true,
            changOrigin: true,
            pathRewrite: {
              '^/api_deleteMemberGroup': ''
            }
          }
        },
        before: app => { }
    }
}