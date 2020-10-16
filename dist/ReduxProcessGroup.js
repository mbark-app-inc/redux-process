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
            if (state === undefined) {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUmVkdXhQcm9jZXNzR3JvdXAuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvUmVkdXhQcm9jZXNzR3JvdXAudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBT0EsTUFBYSxpQkFBaUI7SUFLNUIsWUFDRSxTQUFpQixFQUNqQixPQUE2QztRQUU3QyxJQUFJLENBQUMsU0FBUyxHQUFHLFNBQVMsQ0FBQTtRQUMxQixJQUFJLENBQUMsT0FBTyxHQUFHLE9BQU8sQ0FBQTtJQUN4QixDQUFDO0lBRUQsZUFBZTtRQUNiLE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQyxZQUFZLENBQUE7SUFDbEMsQ0FBQztJQUVELE9BQU8sQ0FDTCxrQkFLQyxFQUNELE9BQW9CLElBQUk7UUFPeEIsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxrQkFBa0IsQ0FBQyxFQUFFO1lBQ3hELE1BQU0sSUFBSSxLQUFLLENBQ2IsNkdBQTZHLENBQzlHLENBQUE7U0FDRjtRQUVELE9BQU8sS0FBSyxFQUFFLFFBQVEsRUFBRSxRQUFRLEVBQUUsRUFBRTtZQUNsQyxNQUFNLEtBQUssR0FBRyxRQUFRLEVBQUUsQ0FBQTtZQUN4QixNQUFNLE1BQU0sR0FBRyxJQUFJLGtCQUFrQixDQUFDLElBQUksQ0FBQyxzQkFBc0IsRUFBRSxDQUFDLENBQUE7WUFFcEUsTUFBTSxNQUFNLEdBQUcsTUFBTSxNQUFNLENBQUMsYUFBYSxDQUFDLElBQUksRUFBRSxLQUFLLENBQUMsQ0FBQTtZQUV0RCxRQUFRLENBQUM7Z0JBQ1AsSUFBSSxFQUFFLElBQUksQ0FBQyxzQkFBc0IsQ0FBQyxrQkFBa0IsQ0FBQyxhQUFhLEVBQUUsQ0FBQztnQkFDckUsT0FBTyxFQUFFLE1BQU07YUFDaEIsQ0FBQyxDQUFBO1lBRUYsT0FBTyxNQUFNLENBQUE7UUFDZixDQUFDLENBQUE7SUFDSCxDQUFDO0lBRUQsVUFBVTtRQUNSLE9BQU8sQ0FBQyxLQUFLLEVBQUUsTUFBTSxFQUFFLEVBQUU7WUFDdkIsSUFBSSxLQUFLLEtBQUssU0FBUyxFQUFFO2dCQUN2QixLQUFLLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxZQUFZLENBQUE7YUFDbEM7WUFFRCxLQUFLLE1BQU0sWUFBWSxJQUFJLElBQUksQ0FBQyxPQUFPLENBQUMsU0FBUyxFQUFFO2dCQUNqRCxNQUFNLGtCQUFrQixHQUFHLElBQUksQ0FBQyxzQkFBc0IsQ0FDcEQsWUFBWSxDQUFDLGFBQWEsRUFBRSxDQUM3QixDQUFBO2dCQUVELElBQUksTUFBTSxDQUFDLElBQUksS0FBSyxrQkFBa0IsRUFBRTtvQkFDdEMsTUFBTSxPQUFPLEdBQUcsSUFBSSxZQUFZLENBQUMsSUFBSSxDQUFDLHNCQUFzQixFQUFFLENBQUMsQ0FBQTtvQkFDL0QsT0FBTyxPQUFPLENBQUMsV0FBVyxDQUFDLE1BQU0sQ0FBQyxPQUFPLEVBQUUsS0FBSyxDQUFDLENBQUE7aUJBQ2xEO2FBQ0Y7WUFFRCxPQUFPLEtBQUssQ0FBQTtRQUNkLENBQUMsQ0FBQTtJQUNILENBQUM7SUFFRCxzQkFBc0IsQ0FBQyxHQUFXO1FBQ2hDLE9BQU8sd0JBQXdCLElBQUksQ0FBQyxTQUFTLENBQUMsV0FBVyxFQUFFLElBQUksR0FBRyxDQUFDLFdBQVcsRUFBRSxFQUFFLENBQUE7SUFDcEYsQ0FBQztJQUVELHNCQUFzQjtRQUNwQixPQUFPLEVBQUUsQ0FBQTtJQUNYLENBQUM7Q0FDRjtBQWhGRCw4Q0FnRkMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBUaHVua0FjdGlvbiB9IGZyb20gJ3JlZHV4LXRodW5rJ1xuaW1wb3J0IHsgUmVkdWNlciB9IGZyb20gJ3JlZHV4J1xuaW1wb3J0IHsgSVJlZHV4UHJvY2Vzc0NsYXNzIH0gZnJvbSAnLi9pbnRlcmZhY2VzL0lSZWR1eFByb2Nlc3MnXG5pbXBvcnQgeyBJUmVkdXhQcm9jZXNzR3JvdXAgfSBmcm9tICcuL2ludGVyZmFjZXMvSVJlZHV4UHJvY2Vzc0dyb3VwJ1xuaW1wb3J0IHsgUmVkdXhQcm9jZXNzQWN0aW9uLCBSZWR1eFByb2Nlc3NPcHRpb25zIH0gZnJvbSAnLi90eXBlcy9SZWR1eFByb2Nlc3MnXG5pbXBvcnQgeyBSZWR1eFByb2Nlc3NHcm91cE9wdGlvbnMgfSBmcm9tICcuL3R5cGVzL1JlZHV4UHJvY2Vzc0dyb3VwJ1xuXG5leHBvcnQgY2xhc3MgUmVkdXhQcm9jZXNzR3JvdXA8R3JvdXBTdGF0ZSwgR2xvYmFsU3RhdGU+XG4gIGltcGxlbWVudHMgSVJlZHV4UHJvY2Vzc0dyb3VwPEdyb3VwU3RhdGUsIEdsb2JhbFN0YXRlPiB7XG4gIGdyb3VwTmFtZTogc3RyaW5nXG4gIG9wdGlvbnM6IFJlZHV4UHJvY2Vzc0dyb3VwT3B0aW9uczxHcm91cFN0YXRlPlxuXG4gIGNvbnN0cnVjdG9yKFxuICAgIGdyb3VwTmFtZTogc3RyaW5nLFxuICAgIG9wdGlvbnM6IFJlZHV4UHJvY2Vzc0dyb3VwT3B0aW9uczxHcm91cFN0YXRlPlxuICApIHtcbiAgICB0aGlzLmdyb3VwTmFtZSA9IGdyb3VwTmFtZVxuICAgIHRoaXMub3B0aW9ucyA9IG9wdGlvbnNcbiAgfVxuXG4gIGdldERlZmF1bHRTdGF0ZSgpOiBHcm91cFN0YXRlIHtcbiAgICByZXR1cm4gdGhpcy5vcHRpb25zLmRlZmF1bHRTdGF0ZVxuICB9XG5cbiAgZXhlY3V0ZTxGb3JtLCBQYXlsb2FkVmFsdWU+KFxuICAgIEN1c3RvbVJlZHV4UHJvY2VzczogSVJlZHV4UHJvY2Vzc0NsYXNzPFxuICAgICAgRm9ybSxcbiAgICAgIFBheWxvYWRWYWx1ZSxcbiAgICAgIEdyb3VwU3RhdGUsXG4gICAgICBHbG9iYWxTdGF0ZVxuICAgID4sXG4gICAgZm9ybTogRm9ybSB8IG51bGwgPSBudWxsXG4gICk6IFRodW5rQWN0aW9uPFxuICAgIFByb21pc2U8UGF5bG9hZFZhbHVlPixcbiAgICBHbG9iYWxTdGF0ZSxcbiAgICB1bmtub3duLFxuICAgIFJlZHV4UHJvY2Vzc0FjdGlvbjxQYXlsb2FkVmFsdWU+XG4gID4ge1xuICAgIGlmICghdGhpcy5vcHRpb25zLnByb2Nlc3Nlcy5pbmNsdWRlcyhDdXN0b21SZWR1eFByb2Nlc3MpKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXG4gICAgICAgICdBdHRlbXB0aW5nIHRvIGV4ZWN1dGUgYW4gUmVkdXhQcm9jZXNzIHRoYXQgaXMgbm90IGEgcGFydCBvZiB0aGlzIFJlZHV4UHJvY2Vzc0dyb3VwLiBUaGlzIGFjdGlvbiBpcyBpbGxlZ2FsLidcbiAgICAgIClcbiAgICB9XG5cbiAgICByZXR1cm4gYXN5bmMgKGRpc3BhdGNoLCBnZXRTdGF0ZSkgPT4ge1xuICAgICAgY29uc3Qgc3RvcmUgPSBnZXRTdGF0ZSgpXG4gICAgICBjb25zdCBhY3Rpb24gPSBuZXcgQ3VzdG9tUmVkdXhQcm9jZXNzKHRoaXMuZ2V0UmVkdXhQcm9jZXNzT3B0aW9ucygpKVxuXG4gICAgICBjb25zdCByZXN1bHQgPSBhd2FpdCBhY3Rpb24ucGVyZm9ybUFjdGlvbihmb3JtLCBzdG9yZSlcblxuICAgICAgZGlzcGF0Y2goe1xuICAgICAgICB0eXBlOiB0aGlzLmdldEZvcm1hdHRlZEFjdGlvblR5cGUoQ3VzdG9tUmVkdXhQcm9jZXNzLmdldFByb2Nlc3NLZXkoKSksXG4gICAgICAgIHBheWxvYWQ6IHJlc3VsdFxuICAgICAgfSlcblxuICAgICAgcmV0dXJuIHJlc3VsdFxuICAgIH1cbiAgfVxuXG4gIGdldFJlZHVjZXIoKTogUmVkdWNlcjxHcm91cFN0YXRlLCBSZWR1eFByb2Nlc3NBY3Rpb248YW55Pj4ge1xuICAgIHJldHVybiAoc3RhdGUsIGFjdGlvbikgPT4ge1xuICAgICAgaWYgKHN0YXRlID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgc3RhdGUgPSB0aGlzLm9wdGlvbnMuZGVmYXVsdFN0YXRlXG4gICAgICB9XG5cbiAgICAgIGZvciAoY29uc3QgUHJvY2Vzc0NsYXNzIG9mIHRoaXMub3B0aW9ucy5wcm9jZXNzZXMpIHtcbiAgICAgICAgY29uc3QgcG9zc2libGVBY3Rpb25UeXBlID0gdGhpcy5nZXRGb3JtYXR0ZWRBY3Rpb25UeXBlKFxuICAgICAgICAgIFByb2Nlc3NDbGFzcy5nZXRQcm9jZXNzS2V5KClcbiAgICAgICAgKVxuXG4gICAgICAgIGlmIChhY3Rpb24udHlwZSA9PT0gcG9zc2libGVBY3Rpb25UeXBlKSB7XG4gICAgICAgICAgY29uc3QgcHJvY2VzcyA9IG5ldyBQcm9jZXNzQ2xhc3ModGhpcy5nZXRSZWR1eFByb2Nlc3NPcHRpb25zKCkpXG4gICAgICAgICAgcmV0dXJuIHByb2Nlc3MuZ2V0TmV3U3RhdGUoYWN0aW9uLnBheWxvYWQsIHN0YXRlKVxuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBzdGF0ZVxuICAgIH1cbiAgfVxuXG4gIGdldEZvcm1hdHRlZEFjdGlvblR5cGUoa2V5OiBzdHJpbmcpOiBzdHJpbmcge1xuICAgIHJldHVybiBgQHJlZHV4LXByb2Nlc3MtZ3JvdXAvJHt0aGlzLmdyb3VwTmFtZS50b0xvd2VyQ2FzZSgpfS8ke2tleS50b0xvd2VyQ2FzZSgpfWBcbiAgfVxuXG4gIGdldFJlZHV4UHJvY2Vzc09wdGlvbnMoKTogUmVkdXhQcm9jZXNzT3B0aW9ucyB7XG4gICAgcmV0dXJuIHt9XG4gIH1cbn1cbiJdfQ==