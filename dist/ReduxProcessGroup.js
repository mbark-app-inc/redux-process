"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReduxProcessGroup = void 0;
class ReduxProcessGroup {
    constructor(groupName, options) {
        this.groupName = groupName;
        this.options = options;
    }
    getDefaultState() {
        return this.options.defaultState;
    }
    execute(CustomReduxProcess, form = null) {
        if (!this.options.processes.includes(CustomReduxProcess)) {
            throw new Error('Attempting to execute an ReduxProcess that is not a part of this ReduxProcessGroup. This action is illegal.');
        }
        return async (dispatch, getState) => {
            const store = getState();
            const action = new CustomReduxProcess(this.getReduxProcessOptions());
            const result = await action.performAction(form, store);
            dispatch({
                type: this.getFormattedActionType(CustomReduxProcess.getProcessKey()),
                payload: result
            });
            return result;
        };
    }
    getReducer() {
        return (state, action) => {
            if (!state) {
                state = this.options.defaultState;
            }
            for (const ProcessClass of this.options.processes) {
                const possibleActionType = this.getFormattedActionType(ProcessClass.getProcessKey());
                if (action.type === possibleActionType) {
                    const process = new ProcessClass(this.getReduxProcessOptions());
                    return process.getNewState(action.payload, state);
                }
            }
            return state;
        };
    }
    getFormattedActionType(key) {
        return `@redux-process-group/${this.groupName.toLowerCase()}/${key.toLowerCase()}`;
    }
    getReduxProcessOptions() {
        return {};
    }
}
exports.ReduxProcessGroup = ReduxProcessGroup;
//# sourceMappingURL=ReduxProcessGroup.js.map