### START
```bash
 - npm install -g
```


### COMMAND
```bash
- gry create <name>
```

## Disctiption

```html
    <p>
        cli脚手架工具主要的插件
    </p>
    <ul>
        <li> inquirer 主要指令，指导客户选择的工具 </li>
        <li> command 主要指令，一些输入性辅助命令 类似 gry create <name> 等等</li>
        <li> chalk 颜色工具</li>
        <li> ora loading加载工具</li>
        <li> download-git-repo git模板下载工具</li>
        <li> figlet Logo 打印工具</li>
        <li> axio 请求数据</li>
    </ul>

```

## 代码分析

```javascript
#! /usr/bin/env node //全局安装必须，让系统可以找到path种的目录，node路径

```

 - commander 的介绍
 
```javascript
const program = require('commander')
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
    
program.parse(process.argv)
```

 - figlet 的介绍 打印LOGO
  
```javascript

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
```

 - inquirer 可以看作 I/O 输入输入，不同输入不同输出（包括输入文字，键盘操作等等）
```javascript
const inquirer = require('inquirer')
//此工具可以返回promise函数，所以可以使用await接受函数值
inquirer.prompt([
                {
                    name: 'action',
                    type: 'list',
                    message: 'target directory already exists Pick an ation:',
                    choices: [
                        {
                            name: 'OverWrite',
                            value: 'overwrite'
                        },{
                            name: 'cancel',
                            value: false
                        }
                    ]
                }
            ]).action(action => console.log(action))
```