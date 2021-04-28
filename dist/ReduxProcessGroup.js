"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReduxProcessGroup = void 0;
/**
 * [constructor description]
 * @param groupName the name prefix for the group (e.g globalstate.auth.<props> => 'auth')
 * @param options   object containing the processes for this group and a default state
 */
class ReduxProcessGroup {
    constructor(groupName, options) {
        this.actionTypes = new Map();
        this.groupName = groupName;
        this.options = options;
    }
    /**
     * Get the default state
     */
    getDefaultState() {
        return this.options.defaultState;
    }
    /**
     * Set the error handler for this specific group (internal)
     * @param  cb
     */
    setErrorHandler(cb) {
        this.errorHandler = cb;
    }
    /**
     * Forms a ReduxProcess and passed form values into a redux action to be executed by dispatch
     * @param  ReduxProcess a process that is owned by this group
     */
    execute(CustomReduxProcess, form = null) {
        if (!this.options.processes.includes(CustomReduxProcess)) {
            throw new Error('Attempting to execute an ReduxProcess that is not a part of this ReduxProcessGroup. This action is illegal.');
        }
        return async (dispatch, getState) => {
            const store = getState();
            const action = new CustomReduxProcess(this.getReduxProcessOptions(store));
            let result;
            try {
                result = await action.performAction(form, store);
                dispatch({
                    type: this.getFormattedActionType(CustomReduxProcess),
                    payload: result
                });
                return result;
            }
            catch (e) {
                if (this.errorHandler) {
                    await this.errorHandler(e, dispatch, store);
                    return;
                }
                throw e;
            }
        };
    }
    /**
     * Return the full reducer for this group. This is registed to redux
     */
    getReducer() {
        return (state, action) => {
            if (state === undefined) {
                state = this.options.defaultState;
            }
            for (const ProcessClass of this.options.processes) {
                const possibleActionType = this.getFormattedActionType(ProcessClass);
                if (action.type === possibleActionType) {
                    const process = new ProcessClass(this.getReduxProcessOptions());
                    return process.getNewState(action.payload, state);
                }
            }
            return state;
        };
    }
    /**
     * Form an action name (internal)
     * @param  key
     */
    getFormattedActionType(CustomReduxProcess) {
        let value = this.actionTypes.get(CustomReduxProcess);
        if (value) {
            return value;
        }
        value = `@redux-process-group/${this.groupName.toLowerCase()}/${CustomReduxProcess.getProcessKey()}`;
        this.actionTypes.set(CustomReduxProcess, value);
        return value;
    }
    /**
     * Get default options for a process (can be overwritten in subclass)
     * @param  store  global state
     */
    getReduxProcessOptions(_) {
        return {};
    }
}
exports.ReduxProcessGroup = ReduxProcessGroup;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUmVkdXhQcm9jZXNzR3JvdXAuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvUmVkdXhQcm9jZXNzR3JvdXAudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBV0E7Ozs7R0FJRztBQUNILE1BQWEsaUJBQWlCO0lBTzVCLFlBQ0UsU0FBaUIsRUFDakIsT0FBb0Q7UUFKNUMsZ0JBQVcsR0FBNEIsSUFBSSxHQUFHLEVBQUUsQ0FBQTtRQU14RCxJQUFJLENBQUMsU0FBUyxHQUFHLFNBQVMsQ0FBQTtRQUMxQixJQUFJLENBQUMsT0FBTyxHQUFHLE9BQU8sQ0FBQTtJQUN4QixDQUFDO0lBRUQ7O09BRUc7SUFDSCxlQUFlO1FBQ2IsT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDLFlBQVksQ0FBQTtJQUNsQyxDQUFDO0lBRUQ7OztPQUdHO0lBQ0gsZUFBZSxDQUFDLEVBQTZCO1FBQzNDLElBQUksQ0FBQyxZQUFZLEdBQUcsRUFBRSxDQUFBO0lBQ3hCLENBQUM7SUFFRDs7O09BR0c7SUFDSCxPQUFPLENBQ0wsa0JBS0MsRUFDRCxPQUFvQixJQUFJO1FBT3hCLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsa0JBQWtCLENBQUMsRUFBRTtZQUN4RCxNQUFNLElBQUksS0FBSyxDQUNiLDZHQUE2RyxDQUM5RyxDQUFBO1NBQ0Y7UUFFRCxPQUFPLEtBQUssRUFBRSxRQUFhLEVBQUUsUUFBYSxFQUFFLEVBQUU7WUFDNUMsTUFBTSxLQUFLLEdBQWdCLFFBQVEsRUFBRSxDQUFBO1lBQ3JDLE1BQU0sTUFBTSxHQUFHLElBQUksa0JBQWtCLENBQUMsSUFBSSxDQUFDLHNCQUFzQixDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUE7WUFFekUsSUFBSSxNQUE0QyxDQUFBO1lBQ2hELElBQUk7Z0JBQ0YsTUFBTSxHQUFHLE1BQU0sTUFBTSxDQUFDLGFBQWEsQ0FBQyxJQUFJLEVBQUUsS0FBSyxDQUFDLENBQUE7Z0JBQ2hELFFBQVEsQ0FBQztvQkFDUCxJQUFJLEVBQUUsSUFBSSxDQUFDLHNCQUFzQixDQUFDLGtCQUFrQixDQUFDO29CQUNyRCxPQUFPLEVBQUUsTUFBTTtpQkFDaEIsQ0FBQyxDQUFBO2dCQUNGLE9BQU8sTUFBTSxDQUFBO2FBQ2Q7WUFBQyxPQUFPLENBQUMsRUFBRTtnQkFDVixJQUFJLElBQUksQ0FBQyxZQUFZLEVBQUU7b0JBQ3JCLE1BQU0sSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDLEVBQUUsUUFBUSxFQUFFLEtBQUssQ0FBQyxDQUFBO29CQUMzQyxPQUFNO2lCQUNQO2dCQUNELE1BQU0sQ0FBQyxDQUFBO2FBQ1I7UUFDSCxDQUFDLENBQUE7SUFDSCxDQUFDO0lBRUQ7O09BRUc7SUFDSCxVQUFVO1FBQ1IsT0FBTyxDQUFDLEtBQVUsRUFBRSxNQUFXLEVBQUUsRUFBRTtZQUNqQyxJQUFJLEtBQUssS0FBSyxTQUFTLEVBQUU7Z0JBQ3ZCLEtBQUssR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLFlBQVksQ0FBQTthQUNsQztZQUVELEtBQUssTUFBTSxZQUFZLElBQUksSUFBSSxDQUFDLE9BQU8sQ0FBQyxTQUFTLEVBQUU7Z0JBQ2pELE1BQU0sa0JBQWtCLEdBQUcsSUFBSSxDQUFDLHNCQUFzQixDQUFDLFlBQVksQ0FBQyxDQUFBO2dCQUVwRSxJQUFJLE1BQU0sQ0FBQyxJQUFJLEtBQUssa0JBQWtCLEVBQUU7b0JBQ3RDLE1BQU0sT0FBTyxHQUFHLElBQUksWUFBWSxDQUFDLElBQUksQ0FBQyxzQkFBc0IsRUFBRSxDQUFDLENBQUE7b0JBQy9ELE9BQU8sT0FBTyxDQUFDLFdBQVcsQ0FBQyxNQUFNLENBQUMsT0FBTyxFQUFFLEtBQUssQ0FBQyxDQUFBO2lCQUNsRDthQUNGO1lBRUQsT0FBTyxLQUFLLENBQUE7UUFDZCxDQUFDLENBQUE7SUFDSCxDQUFDO0lBRUQ7OztPQUdHO0lBQ0gsc0JBQXNCLENBQ3BCLGtCQUEwRDtRQUUxRCxJQUFJLEtBQUssR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLEdBQUcsQ0FBQyxrQkFBa0IsQ0FBQyxDQUFBO1FBQ3BELElBQUksS0FBSyxFQUFFO1lBQ1QsT0FBTyxLQUFLLENBQUE7U0FDYjtRQUVELEtBQUssR0FBRyx3QkFBd0IsSUFBSSxDQUFDLFNBQVMsQ0FBQyxXQUFXLEVBQUUsSUFBSSxrQkFBa0IsQ0FBQyxhQUFhLEVBQUUsRUFBRSxDQUFBO1FBQ3BHLElBQUksQ0FBQyxXQUFXLENBQUMsR0FBRyxDQUFDLGtCQUFrQixFQUFFLEtBQUssQ0FBQyxDQUFBO1FBRS9DLE9BQU8sS0FBSyxDQUFBO0lBQ2QsQ0FBQztJQUVEOzs7T0FHRztJQUNILHNCQUFzQixDQUFDLENBQWU7UUFDcEMsT0FBTyxFQUFFLENBQUE7SUFDWCxDQUFDO0NBQ0Y7QUEzSEQsOENBMkhDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgVGh1bmtBY3Rpb24gfSBmcm9tICdyZWR1eC10aHVuaydcbmltcG9ydCB7IFJlZHVjZXIgfSBmcm9tICdyZWR1eCdcbmltcG9ydCB7IElSZWR1eFByb2Nlc3NDbGFzcyB9IGZyb20gJy4vaW50ZXJmYWNlcy9JUmVkdXhQcm9jZXNzJ1xuaW1wb3J0IHsgSVJlZHV4UHJvY2Vzc0dyb3VwIH0gZnJvbSAnLi9pbnRlcmZhY2VzL0lSZWR1eFByb2Nlc3NHcm91cCdcbmltcG9ydCB7IFJlZHV4UHJvY2Vzc0FjdGlvbiwgUmVkdXhQcm9jZXNzT3B0aW9ucyB9IGZyb20gJy4vdHlwZXMvUmVkdXhQcm9jZXNzJ1xuaW1wb3J0IHtcbiAgUmVkdXhQcm9jZXNzR3JvdXBPcHRpb25zLFxuICBFcnJvckhhbmRsZXIsXG4gIFJlZHV4UHJvY2Vzc0FjdGlvblR5cGVzXG59IGZyb20gJy4vdHlwZXMvUmVkdXhQcm9jZXNzR3JvdXAnXG5cbi8qKlxuICogW2NvbnN0cnVjdG9yIGRlc2NyaXB0aW9uXVxuICogQHBhcmFtIGdyb3VwTmFtZSB0aGUgbmFtZSBwcmVmaXggZm9yIHRoZSBncm91cCAoZS5nIGdsb2JhbHN0YXRlLmF1dGguPHByb3BzPiA9PiAnYXV0aCcpXG4gKiBAcGFyYW0gb3B0aW9ucyAgIG9iamVjdCBjb250YWluaW5nIHRoZSBwcm9jZXNzZXMgZm9yIHRoaXMgZ3JvdXAgYW5kIGEgZGVmYXVsdCBzdGF0ZVxuICovXG5leHBvcnQgY2xhc3MgUmVkdXhQcm9jZXNzR3JvdXA8UHJvY2Vzc0dyb3VwU3RhdGUsIEdsb2JhbFN0YXRlPlxuICBpbXBsZW1lbnRzIElSZWR1eFByb2Nlc3NHcm91cDxQcm9jZXNzR3JvdXBTdGF0ZSwgR2xvYmFsU3RhdGU+IHtcbiAgZ3JvdXBOYW1lOiBzdHJpbmdcbiAgb3B0aW9uczogUmVkdXhQcm9jZXNzR3JvdXBPcHRpb25zPFByb2Nlc3NHcm91cFN0YXRlPlxuICBwcm90ZWN0ZWQgZXJyb3JIYW5kbGVyPzogRXJyb3JIYW5kbGVyPEdsb2JhbFN0YXRlPlxuICBwcm90ZWN0ZWQgYWN0aW9uVHlwZXM6IFJlZHV4UHJvY2Vzc0FjdGlvblR5cGVzID0gbmV3IE1hcCgpXG5cbiAgY29uc3RydWN0b3IoXG4gICAgZ3JvdXBOYW1lOiBzdHJpbmcsXG4gICAgb3B0aW9uczogUmVkdXhQcm9jZXNzR3JvdXBPcHRpb25zPFByb2Nlc3NHcm91cFN0YXRlPlxuICApIHtcbiAgICB0aGlzLmdyb3VwTmFtZSA9IGdyb3VwTmFtZVxuICAgIHRoaXMub3B0aW9ucyA9IG9wdGlvbnNcbiAgfVxuXG4gIC8qKlxuICAgKiBHZXQgdGhlIGRlZmF1bHQgc3RhdGVcbiAgICovXG4gIGdldERlZmF1bHRTdGF0ZSgpOiBQcm9jZXNzR3JvdXBTdGF0ZSB7XG4gICAgcmV0dXJuIHRoaXMub3B0aW9ucy5kZWZhdWx0U3RhdGVcbiAgfVxuXG4gIC8qKlxuICAgKiBTZXQgdGhlIGVycm9yIGhhbmRsZXIgZm9yIHRoaXMgc3BlY2lmaWMgZ3JvdXAgKGludGVybmFsKVxuICAgKiBAcGFyYW0gIGNiXG4gICAqL1xuICBzZXRFcnJvckhhbmRsZXIoY2I6IEVycm9ySGFuZGxlcjxHbG9iYWxTdGF0ZT4pIHtcbiAgICB0aGlzLmVycm9ySGFuZGxlciA9IGNiXG4gIH1cblxuICAvKipcbiAgICogRm9ybXMgYSBSZWR1eFByb2Nlc3MgYW5kIHBhc3NlZCBmb3JtIHZhbHVlcyBpbnRvIGEgcmVkdXggYWN0aW9uIHRvIGJlIGV4ZWN1dGVkIGJ5IGRpc3BhdGNoXG4gICAqIEBwYXJhbSAgUmVkdXhQcm9jZXNzIGEgcHJvY2VzcyB0aGF0IGlzIG93bmVkIGJ5IHRoaXMgZ3JvdXBcbiAgICovXG4gIGV4ZWN1dGU8Rm9ybSwgUGF5bG9hZFZhbHVlPihcbiAgICBDdXN0b21SZWR1eFByb2Nlc3M6IElSZWR1eFByb2Nlc3NDbGFzczxcbiAgICAgIEZvcm0sXG4gICAgICBQYXlsb2FkVmFsdWUsXG4gICAgICBQcm9jZXNzR3JvdXBTdGF0ZSxcbiAgICAgIEdsb2JhbFN0YXRlXG4gICAgPixcbiAgICBmb3JtOiBGb3JtIHwgbnVsbCA9IG51bGxcbiAgKTogVGh1bmtBY3Rpb248XG4gICAgUHJvbWlzZTxQYXlsb2FkVmFsdWUgfCB2b2lkPixcbiAgICBHbG9iYWxTdGF0ZSxcbiAgICB1bmtub3duLFxuICAgIFJlZHV4UHJvY2Vzc0FjdGlvbjxQYXlsb2FkVmFsdWU+XG4gID4ge1xuICAgIGlmICghdGhpcy5vcHRpb25zLnByb2Nlc3Nlcy5pbmNsdWRlcyhDdXN0b21SZWR1eFByb2Nlc3MpKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXG4gICAgICAgICdBdHRlbXB0aW5nIHRvIGV4ZWN1dGUgYW4gUmVkdXhQcm9jZXNzIHRoYXQgaXMgbm90IGEgcGFydCBvZiB0aGlzIFJlZHV4UHJvY2Vzc0dyb3VwLiBUaGlzIGFjdGlvbiBpcyBpbGxlZ2FsLidcbiAgICAgIClcbiAgICB9XG5cbiAgICByZXR1cm4gYXN5bmMgKGRpc3BhdGNoOiBhbnksIGdldFN0YXRlOiBhbnkpID0+IHtcbiAgICAgIGNvbnN0IHN0b3JlOiBHbG9iYWxTdGF0ZSA9IGdldFN0YXRlKClcbiAgICAgIGNvbnN0IGFjdGlvbiA9IG5ldyBDdXN0b21SZWR1eFByb2Nlc3ModGhpcy5nZXRSZWR1eFByb2Nlc3NPcHRpb25zKHN0b3JlKSlcblxuICAgICAgbGV0IHJlc3VsdDogUGF5bG9hZFZhbHVlIHwgUHJvbWlzZTxQYXlsb2FkVmFsdWU+XG4gICAgICB0cnkge1xuICAgICAgICByZXN1bHQgPSBhd2FpdCBhY3Rpb24ucGVyZm9ybUFjdGlvbihmb3JtLCBzdG9yZSlcbiAgICAgICAgZGlzcGF0Y2goe1xuICAgICAgICAgIHR5cGU6IHRoaXMuZ2V0Rm9ybWF0dGVkQWN0aW9uVHlwZShDdXN0b21SZWR1eFByb2Nlc3MpLFxuICAgICAgICAgIHBheWxvYWQ6IHJlc3VsdFxuICAgICAgICB9KVxuICAgICAgICByZXR1cm4gcmVzdWx0XG4gICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIGlmICh0aGlzLmVycm9ySGFuZGxlcikge1xuICAgICAgICAgIGF3YWl0IHRoaXMuZXJyb3JIYW5kbGVyKGUsIGRpc3BhdGNoLCBzdG9yZSlcbiAgICAgICAgICByZXR1cm5cbiAgICAgICAgfVxuICAgICAgICB0aHJvdyBlXG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybiB0aGUgZnVsbCByZWR1Y2VyIGZvciB0aGlzIGdyb3VwLiBUaGlzIGlzIHJlZ2lzdGVkIHRvIHJlZHV4XG4gICAqL1xuICBnZXRSZWR1Y2VyKCk6IFJlZHVjZXI8UHJvY2Vzc0dyb3VwU3RhdGUsIFJlZHV4UHJvY2Vzc0FjdGlvbjxhbnk+PiB7XG4gICAgcmV0dXJuIChzdGF0ZTogYW55LCBhY3Rpb246IGFueSkgPT4ge1xuICAgICAgaWYgKHN0YXRlID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgc3RhdGUgPSB0aGlzLm9wdGlvbnMuZGVmYXVsdFN0YXRlXG4gICAgICB9XG5cbiAgICAgIGZvciAoY29uc3QgUHJvY2Vzc0NsYXNzIG9mIHRoaXMub3B0aW9ucy5wcm9jZXNzZXMpIHtcbiAgICAgICAgY29uc3QgcG9zc2libGVBY3Rpb25UeXBlID0gdGhpcy5nZXRGb3JtYXR0ZWRBY3Rpb25UeXBlKFByb2Nlc3NDbGFzcylcblxuICAgICAgICBpZiAoYWN0aW9uLnR5cGUgPT09IHBvc3NpYmxlQWN0aW9uVHlwZSkge1xuICAgICAgICAgIGNvbnN0IHByb2Nlc3MgPSBuZXcgUHJvY2Vzc0NsYXNzKHRoaXMuZ2V0UmVkdXhQcm9jZXNzT3B0aW9ucygpKVxuICAgICAgICAgIHJldHVybiBwcm9jZXNzLmdldE5ld1N0YXRlKGFjdGlvbi5wYXlsb2FkLCBzdGF0ZSlcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICByZXR1cm4gc3RhdGVcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogRm9ybSBhbiBhY3Rpb24gbmFtZSAoaW50ZXJuYWwpXG4gICAqIEBwYXJhbSAga2V5XG4gICAqL1xuICBnZXRGb3JtYXR0ZWRBY3Rpb25UeXBlKFxuICAgIEN1c3RvbVJlZHV4UHJvY2VzczogSVJlZHV4UHJvY2Vzc0NsYXNzPGFueSwgYW55LCBhbnksIGFueT5cbiAgKTogc3RyaW5nIHtcbiAgICBsZXQgdmFsdWUgPSB0aGlzLmFjdGlvblR5cGVzLmdldChDdXN0b21SZWR1eFByb2Nlc3MpXG4gICAgaWYgKHZhbHVlKSB7XG4gICAgICByZXR1cm4gdmFsdWVcbiAgICB9XG5cbiAgICB2YWx1ZSA9IGBAcmVkdXgtcHJvY2Vzcy1ncm91cC8ke3RoaXMuZ3JvdXBOYW1lLnRvTG93ZXJDYXNlKCl9LyR7Q3VzdG9tUmVkdXhQcm9jZXNzLmdldFByb2Nlc3NLZXkoKX1gXG4gICAgdGhpcy5hY3Rpb25UeXBlcy5zZXQoQ3VzdG9tUmVkdXhQcm9jZXNzLCB2YWx1ZSlcblxuICAgIHJldHVybiB2YWx1ZVxuICB9XG5cbiAgLyoqXG4gICAqIEdldCBkZWZhdWx0IG9wdGlvbnMgZm9yIGEgcHJvY2VzcyAoY2FuIGJlIG92ZXJ3cml0dGVuIGluIHN1YmNsYXNzKVxuICAgKiBAcGFyYW0gIHN0b3JlICBnbG9iYWwgc3RhdGVcbiAgICovXG4gIGdldFJlZHV4UHJvY2Vzc09wdGlvbnMoXz86IEdsb2JhbFN0YXRlKTogUmVkdXhQcm9jZXNzT3B0aW9ucyB7XG4gICAgcmV0dXJuIHt9XG4gIH1cbn1cbiJdfQ==