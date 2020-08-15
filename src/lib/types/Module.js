const path = require('path');
const fs = require('fs');
const log = require('../utils/logger');

module.exports = class Module {
    constructor(name, modulePath) {
        this.name = name
        this.modulePath = modulePath
        this.services = []
        this.cmds = []
        this.services = []
        this.findServices()
        this.findCmds()
    }

    init(bot) {
        log.debug(`${this.name} has been initialized`);
        this.services.forEach(service => service.init(bot))
    }

    findServices() {
        try {
            let searchPath = path.join(this.modulePath, "services")
            const srvArray = fs.readdirSync(searchPath).filter(srvFile => srvFile.slice(-3) == ".js")
            srvArray.forEach(folder => {
                let service = require(path.join(searchPath, folder))
                log.debug(`service: '${service.name}'`);
                this.services.push(service);
            })
        } catch (error) {
            log.warn("Can't find any services!")
        }
    }

    findCmds() {
        try {
            let searchPath = path.join(this.modulePath, "cmds")
            const cmdsArray = fs.readdirSync(searchPath).filter(cmdFile => cmdFile.slice(-3) == ".js")
            cmdsArray.forEach(folder => {
                let command = require(path.join(searchPath, folder))
                log.debug(`cmd: '${command.name}'`);
                this.cmds.push(command);
            })
        } catch (error) {
            log.warn("Can't find any cmds!")
        }
    }
}
