const path = require('path')
const fs = require('fs-extra')
const inquirer = require('inquirer')

const Generator = require('./Generator')

module.exports = async function (name, options){
    

    const cwd = process.cwd()

    const targeAir = path.join(cwd,name)

    if(fs.existsSync(targeAir)) {
        if(options.force) {
            await fs.remove(targeAir)
        } else {
            let { action } = await inquirer.prompt([
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
            ])


            if(!action) {
                console.log('canceled')
            } else if ( action === 'overwrite') {
                console.log(`\r\nRemoving...`)
                await fs.remove(targeAir)
            }
        }
    } 

    const generator = new Generator(name, targeAir)
    generator.create()
}