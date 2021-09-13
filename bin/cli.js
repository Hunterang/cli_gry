#! /usr/bin/env node

const program = require('commander')
const chalk = require('chalk')
const figlet = require('figlet')

//配置启动命令
program.command('create <project-name>')
       .description('create a new project')
       .option('-f, --force', 'overWrite targe directory if it exist')
       .action((name, opt) => {
        require('../lib/create.js')(name, opt)
    })

program
       // 配置版本号信息
      .version(`v${require('../package.json').version}`)
      .usage('<command> [option]')

//配置 ui 命令
program
    .command('ui')
    .description('start add open roc-cli ui')
    .option('-p, --port <port>', 'Port Used the UI Server')
    .action((value, optins) => {

       
        console.log(value, optins)
    })
    
program.on('--help', () => {
    console.log('\r\n' + figlet.textSync('gurenyun',{
        font: 'Ghost',
        orizontalLayout: 'default',
        verticalLayout: 'default',
        width: 100,
        whitespaceBreak: true
    }))



    console.log(`\r\nRun ${chalk.cyan(`gry <command> --help`)} for detailed usage of given command\r\n`)
})    
program.parse(process.argv)