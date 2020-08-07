module.exports = class Command {
    constructor(options) {
        this.name = options.name
        this.desc = options.desc
        this.triggers = options.triggers
        this.run = options.run
    }
}
