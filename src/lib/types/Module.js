const path = require('path');
const fs = require('fs');

module.exports = class Module {
    constructor(name) {
        this.name = name
        this.services = []
        this.cmds = []
    }

    init() {
        console.log(`${this.name} has been initialized`);
    }

    findCmds(searchPath) {
        searchPath = path.join(searchPath, "cmds")
        const cmdsArray = fs.readdirSync(searchPath).filter(cmdFile => cmdFile.slice(-3) == ".js")
        cmdsArray.forEach(folder => {
            let command = require(path.join(searchPath, folder))
            console.log(`cmd: '${command.name}'`);
            this.cmds.push(command);
        })
    }
}
