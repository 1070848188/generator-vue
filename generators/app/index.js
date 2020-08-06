const Generator = require('yeoman-generator');

module.exports = class extends Generator {
    prompting () { // 获取用户所需信息
        return this.prompt([
            {
                type: 'input',
                name: 'name',
                message: 'You project name?',
                default: this.appname
            }
        ]).then(answers => {
            this.answers = answers;
        })
    }

    writing () {
        // 总结所有所需模板
        const tempaltes = [
            '.browserslistrc',
            '.editorconfig',
            '.env.dev',
            '.env.pre',
            '.env.prod',
            '.env.test',
            '.eslintrc.js',
            '.gitignore',
            'babel.config.js',
            'package.json',
            'package-lock.json',
            'README.md',
            'vue.config.js',
            'public/favicon.ico',
            'public/index.html',
            'src/api/axios.js',
            'src/api/user.js',
            'src/assets/401_images/401.gif',
            'src/assets/404_images/404.png',
            'src/assets/404_images/404_cloud.png',
            'src/assets/css/common.scss',
            'src/assets/css/mixin.scss',
            'src/assets/css/reset.scss',
            'src/assets/css/var.scss',
            'src/components/HelloWorld.vue',
            'src/layout/index.vue',
            'src/router/index.js',
            'src/store/index.js',
            'src/store/modules/user.js',
            'src/utils/auth.js',
            'src/views/Home.vue',
            'src/views/login/auth-redirect.vue',
            'src/views/login/index.vue',
            'src/views/error-page/401.vue',
            'src/views/error-page/404.vue',
            'src/views/redirect/index.vue',
            'src/App.vue',
            'src/main.js',
            'src/permission.js',
        ];

        tempaltes.forEach(item => {
            this.fs.copyTpl(
                this.templatePath(item),
                this.destinationPath(item),
                this.answers
            )
        })
    }
}