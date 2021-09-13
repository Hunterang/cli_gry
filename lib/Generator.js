const { getRepoList, getTargList } = require('./http')
const path = require('path')
const inquirer = require('inquirer')
const ora = require('ora')
const util = require('util')
const downloadGitRepo = require('download-git-repo')
const chalk = require('chalk')

async function wrapLoading(fn, message, ...args) {
    const spinner = ora(message)
    spinner.start()
    try {
        const result = await fn(...args)
        spinner.succeed('fetching result succeed')
        return result

     } catch(err) {
        spinner.fail('requst failed ...')    
     }
}

class Generator {
    constructor(name, targeDir) {
        this.name = name
        this.targeDir = targeDir

        this.downloadGitRepo = util.promisify(downloadGitRepo);
    }

    async getRepo() {
        const repoList = await wrapLoading(getRepoList, 'waiting fech template')

        if(!repoList) {
            return
        }

        const repos = repoList.map(item =>  item.name)

        const { repo } = await inquirer.prompt({
            name: 'repo',
            type: 'list',
            choices: repos,
            message: 'Please choose a template to create project'
        })

        return repo
    }
    async downLoad(repo, tag) {
        const requestUrl = `zxOrgDemo/${repo}${ tag ? '#' + tag : ''}`
        await wrapLoading(
            this.downloadGitRepo,
            'template is loading, plz wait for a moment...',
             requestUrl,
             path.resolve(process.cwd(), this.targeDir) //下载路径
        )


    }
    async create() {
        const repo = await this.getRepo()

        const tag = await this.getTag(repo)

        // console.log('用户选择了，repo=' + repo + '，tag='+ tag)
        
        await this.downLoad(repo, tag)


        console.log(`\r\nSuccessfully created project ${chalk.cyan(this.name)}`)
        console.log(`\r\n  cd ${chalk.cyan(this.name)}`)
        console.log('  npm run dev\r\n')
    
        
    }
    async getTag(repo) {
        const tags = await wrapLoading(getTargList, 'wating tag list', repo)

        if(!tags) return 

        const tagList = tags.map(v => v.name) 
        
        const { tag } = await inquirer.prompt({
            name: 'tag',
            type: 'list',
            choices: tagList,
            message: 'Please choose a gat to create project'
        })

        return tag
    }
}
module.exports = Generator