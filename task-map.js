const chalk = require('chalk');

class TaskMap {
    constructor() {
        this._tasks = {};
        this._taskData = {};

        this.task('default', `Runs when no arguments to ${chalk.blue('run')} are provided.`, () => {
            console.log(chalk.bold('No default task specified.'));
        });
    }

    _addTaskObj(taskObj) {
        this._tasks[taskObj.name] = taskObj;
    }

    _addNonMetaTaskObj(taskObj) {
        this._addTaskObj(taskObj);
        this._taskData[taskObj.name] = taskObj.description;
    }

    task(name, description, fn) {
        const taskObj = {
            name,
            description,
            fn,
        };
        this._addNonMetaTaskObj(taskObj);
    }

    meta(name, fn) {
        const metaTaskObj = {
            name: `--${name}`,
            fn,
        };
        this._addTaskObj(metaTaskObj);
    }

    run(name, args, onTaskNotFoundFn) {
        if (!name) {
            name = 'default';
        }
        const task = this._tasks[name];
        if (!task) {
            onTaskNotFoundFn();
            return;
        }
        task.fn(...args);
    }

    getTasks() {
        return this._taskData;
    }
}

module.exports = TaskMap;
