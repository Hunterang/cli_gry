const axios = require('axios')

let repo = 'https://api.github.com/orgs/zxOrgDemo/repos'
let targBase = 'https://api.github.com/repos/zxOrgDemo'

axios.interceptors.response.use(res => {
    return res.data
})
 async function getRepoList() {
    return await axios.get(repo)
}  
async function getTargList(repo) {
    console.log(`${targBase}/${repo}/tags`)
    return await axios.get(`${targBase}/${repo}/tags`)
} 

module.exports = {
    getRepoList,
    getTargList
}