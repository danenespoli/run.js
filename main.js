// Global task runner.
// Use with `run task-name args...`
const _ = require('lodash');
const chalk = require('chalk');
const fs = require('fs');

const TaskMap = require('./task-map');

const initializeUserTasks = (js) => {
    const runfileFn = require('./runfile');
    runfileFn(js);
}

const initializeMetaTasks = (js) => {
    js.meta('help', () => {
        console.log(chalk.bold('Currently no help docs exist.'));
    });
    js.meta('list', () => {
        const tasks = js.getTasks();
        for (const [name, description] of _.entries(tasks)) {
            const paddedName = _.padEnd(name, 20, ' ');
            console.log(chalk.bold(paddedName), description || '');
        }
    });
}

const performTask = (taskName, ...args) => {
    const js = new TaskMap();
    initializeUserTasks(js);
    initializeMetaTasks(js);

    js.run(taskName, args, () => {
        const errorMsg = chalk.bold.red(`Task '${taskName}' not found.`);
        console.log(errorMsg);
    });
};

performTask(...process.argv.slice(2));
