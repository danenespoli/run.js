// Global task runner.
// Use with `run task-name args...`
const _ = require('lodash');
const chalk = require('chalk');
const fs = require('fs');

const TASKS_DEFAULT = {
    default: {
        description: `Runs when no arguments to ${chalk.blue('run')} are provided.`,
        fn: () => {
            console.log(chalk.bold('No default task specified.'));
        },
    },
}

const META_TASKS = {
    help: {
        fn: () => {
            console.log(chalk.bold('Currently no help docs exist.'));
        },
    },
    list: {
        fn: () => {
            for (const [name, task] of _.entries(TASKS)) {
                const paddedName = _.padEnd(name, 20, ' ');
                console.log(chalk.bold(paddedName), task.description || '');
            }
        }
    }
};

const performTask = (taskName, ...args) => {
    // Instantiate user tasks.
    const TASKS = TASKS_DEFAULT;

    let task;
    if (!taskName) {
        task = TASKS.default;
    } else if (taskName.startsWith('--')) {
        const taskNameWithoutDashes = taskName.slice(2);
        task = META_TASKS[taskNameWithoutDashes];
    } else {
        task = TASKS[taskName];
    }

    if (task) {
        const taskFn = task.fn;
        taskFn(...args);
    } else {
        const errorMsg = chalk.bold.red(`Task '${taskName}' not found.`);
        console.log(errorMsg);
    }
};

performTask(...process.argv.slice(2));
