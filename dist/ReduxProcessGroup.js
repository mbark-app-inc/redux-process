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
                    type: this.getFormattedActionType(CustomReduxProcess.getProcessKey()),
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
                const possibleActionType = this.getFormattedActionType(ProcessClass.getProcessKey());
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
    getFormattedActionType(key) {
        return `@redux-process-group/${this.groupName.toLowerCase()}/${key.toLowerCase()}`;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUmVkdXhQcm9jZXNzR3JvdXAuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvUmVkdXhQcm9jZXNzR3JvdXAudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBVUE7Ozs7R0FJRztBQUNILE1BQWEsaUJBQWlCO0lBTTVCLFlBQ0UsU0FBaUIsRUFDakIsT0FBb0Q7UUFFcEQsSUFBSSxDQUFDLFNBQVMsR0FBRyxTQUFTLENBQUE7UUFDMUIsSUFBSSxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUE7SUFDeEIsQ0FBQztJQUVEOztPQUVHO0lBQ0gsZUFBZTtRQUNiLE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQyxZQUFZLENBQUE7SUFDbEMsQ0FBQztJQUVEOzs7T0FHRztJQUNILGVBQWUsQ0FBQyxFQUE2QjtRQUMzQyxJQUFJLENBQUMsWUFBWSxHQUFHLEVBQUUsQ0FBQTtJQUN4QixDQUFDO0lBRUQ7OztPQUdHO0lBQ0gsT0FBTyxDQUNMLGtCQUtDLEVBQ0QsT0FBb0IsSUFBSTtRQU94QixJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLGtCQUFrQixDQUFDLEVBQUU7WUFDeEQsTUFBTSxJQUFJLEtBQUssQ0FDYiw2R0FBNkcsQ0FDOUcsQ0FBQTtTQUNGO1FBRUQsT0FBTyxLQUFLLEVBQUUsUUFBYSxFQUFFLFFBQWEsRUFBRSxFQUFFO1lBQzVDLE1BQU0sS0FBSyxHQUFnQixRQUFRLEVBQUUsQ0FBQTtZQUNyQyxNQUFNLE1BQU0sR0FBRyxJQUFJLGtCQUFrQixDQUFDLElBQUksQ0FBQyxzQkFBc0IsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFBO1lBRXpFLElBQUksTUFBNEMsQ0FBQTtZQUNoRCxJQUFJO2dCQUNGLE1BQU0sR0FBRyxNQUFNLE1BQU0sQ0FBQyxhQUFhLENBQUMsSUFBSSxFQUFFLEtBQUssQ0FBQyxDQUFBO2dCQUNoRCxRQUFRLENBQUM7b0JBQ1AsSUFBSSxFQUFFLElBQUksQ0FBQyxzQkFBc0IsQ0FBQyxrQkFBa0IsQ0FBQyxhQUFhLEVBQUUsQ0FBQztvQkFDckUsT0FBTyxFQUFFLE1BQU07aUJBQ2hCLENBQUMsQ0FBQTtnQkFDRixPQUFPLE1BQU0sQ0FBQTthQUNkO1lBQUMsT0FBTyxDQUFDLEVBQUU7Z0JBQ1YsSUFBSSxJQUFJLENBQUMsWUFBWSxFQUFFO29CQUNyQixNQUFNLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQyxFQUFFLFFBQVEsRUFBRSxLQUFLLENBQUMsQ0FBQTtvQkFDM0MsT0FBTTtpQkFDUDtnQkFDRCxNQUFNLENBQUMsQ0FBQTthQUNSO1FBQ0gsQ0FBQyxDQUFBO0lBQ0gsQ0FBQztJQUVEOztPQUVHO0lBQ0gsVUFBVTtRQUNSLE9BQU8sQ0FBQyxLQUFVLEVBQUUsTUFBVyxFQUFFLEVBQUU7WUFDakMsSUFBSSxLQUFLLEtBQUssU0FBUyxFQUFFO2dCQUN2QixLQUFLLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxZQUFZLENBQUE7YUFDbEM7WUFFRCxLQUFLLE1BQU0sWUFBWSxJQUFJLElBQUksQ0FBQyxPQUFPLENBQUMsU0FBUyxFQUFFO2dCQUNqRCxNQUFNLGtCQUFrQixHQUFHLElBQUksQ0FBQyxzQkFBc0IsQ0FDcEQsWUFBWSxDQUFDLGFBQWEsRUFBRSxDQUM3QixDQUFBO2dCQUVELElBQUksTUFBTSxDQUFDLElBQUksS0FBSyxrQkFBa0IsRUFBRTtvQkFDdEMsTUFBTSxPQUFPLEdBQUcsSUFBSSxZQUFZLENBQUMsSUFBSSxDQUFDLHNCQUFzQixFQUFFLENBQUMsQ0FBQTtvQkFDL0QsT0FBTyxPQUFPLENBQUMsV0FBVyxDQUFDLE1BQU0sQ0FBQyxPQUFPLEVBQUUsS0FBSyxDQUFDLENBQUE7aUJBQ2xEO2FBQ0Y7WUFFRCxPQUFPLEtBQUssQ0FBQTtRQUNkLENBQUMsQ0FBQTtJQUNILENBQUM7SUFFRDs7O09BR0c7SUFDSCxzQkFBc0IsQ0FBQyxHQUFXO1FBQ2hDLE9BQU8sd0JBQXdCLElBQUksQ0FBQyxTQUFTLENBQUMsV0FBVyxFQUFFLElBQUksR0FBRyxDQUFDLFdBQVcsRUFBRSxFQUFFLENBQUE7SUFDcEYsQ0FBQztJQUVEOzs7T0FHRztJQUNILHNCQUFzQixDQUFDLENBQWU7UUFDcEMsT0FBTyxFQUFFLENBQUE7SUFDWCxDQUFDO0NBQ0Y7QUFsSEQsOENBa0hDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgVGh1bmtBY3Rpb24gfSBmcm9tICdyZWR1eC10aHVuaydcbmltcG9ydCB7IFJlZHVjZXIgfSBmcm9tICdyZWR1eCdcbmltcG9ydCB7IElSZWR1eFByb2Nlc3NDbGFzcyB9IGZyb20gJy4vaW50ZXJmYWNlcy9JUmVkdXhQcm9jZXNzJ1xuaW1wb3J0IHsgSVJlZHV4UHJvY2Vzc0dyb3VwIH0gZnJvbSAnLi9pbnRlcmZhY2VzL0lSZWR1eFByb2Nlc3NHcm91cCdcbmltcG9ydCB7IFJlZHV4UHJvY2Vzc0FjdGlvbiwgUmVkdXhQcm9jZXNzT3B0aW9ucyB9IGZyb20gJy4vdHlwZXMvUmVkdXhQcm9jZXNzJ1xuaW1wb3J0IHtcbiAgUmVkdXhQcm9jZXNzR3JvdXBPcHRpb25zLFxuICBFcnJvckhhbmRsZXJcbn0gZnJvbSAnLi90eXBlcy9SZWR1eFByb2Nlc3NHcm91cCdcblxuLyoqXG4gKiBbY29uc3RydWN0b3IgZGVzY3JpcHRpb25dXG4gKiBAcGFyYW0gZ3JvdXBOYW1lIHRoZSBuYW1lIHByZWZpeCBmb3IgdGhlIGdyb3VwIChlLmcgZ2xvYmFsc3RhdGUuYXV0aC48cHJvcHM+ID0+ICdhdXRoJylcbiAqIEBwYXJhbSBvcHRpb25zICAgb2JqZWN0IGNvbnRhaW5pbmcgdGhlIHByb2Nlc3NlcyBmb3IgdGhpcyBncm91cCBhbmQgYSBkZWZhdWx0IHN0YXRlXG4gKi9cbmV4cG9ydCBjbGFzcyBSZWR1eFByb2Nlc3NHcm91cDxQcm9jZXNzR3JvdXBTdGF0ZSwgR2xvYmFsU3RhdGU+XG4gIGltcGxlbWVudHMgSVJlZHV4UHJvY2Vzc0dyb3VwPFByb2Nlc3NHcm91cFN0YXRlLCBHbG9iYWxTdGF0ZT4ge1xuICBncm91cE5hbWU6IHN0cmluZ1xuICBvcHRpb25zOiBSZWR1eFByb2Nlc3NHcm91cE9wdGlvbnM8UHJvY2Vzc0dyb3VwU3RhdGU+XG4gIHByb3RlY3RlZCBlcnJvckhhbmRsZXI/OiBFcnJvckhhbmRsZXI8R2xvYmFsU3RhdGU+XG5cbiAgY29uc3RydWN0b3IoXG4gICAgZ3JvdXBOYW1lOiBzdHJpbmcsXG4gICAgb3B0aW9uczogUmVkdXhQcm9jZXNzR3JvdXBPcHRpb25zPFByb2Nlc3NHcm91cFN0YXRlPlxuICApIHtcbiAgICB0aGlzLmdyb3VwTmFtZSA9IGdyb3VwTmFtZVxuICAgIHRoaXMub3B0aW9ucyA9IG9wdGlvbnNcbiAgfVxuXG4gIC8qKlxuICAgKiBHZXQgdGhlIGRlZmF1bHQgc3RhdGVcbiAgICovXG4gIGdldERlZmF1bHRTdGF0ZSgpOiBQcm9jZXNzR3JvdXBTdGF0ZSB7XG4gICAgcmV0dXJuIHRoaXMub3B0aW9ucy5kZWZhdWx0U3RhdGVcbiAgfVxuXG4gIC8qKlxuICAgKiBTZXQgdGhlIGVycm9yIGhhbmRsZXIgZm9yIHRoaXMgc3BlY2lmaWMgZ3JvdXAgKGludGVybmFsKVxuICAgKiBAcGFyYW0gIGNiXG4gICAqL1xuICBzZXRFcnJvckhhbmRsZXIoY2I6IEVycm9ySGFuZGxlcjxHbG9iYWxTdGF0ZT4pIHtcbiAgICB0aGlzLmVycm9ySGFuZGxlciA9IGNiXG4gIH1cblxuICAvKipcbiAgICogRm9ybXMgYSBSZWR1eFByb2Nlc3MgYW5kIHBhc3NlZCBmb3JtIHZhbHVlcyBpbnRvIGEgcmVkdXggYWN0aW9uIHRvIGJlIGV4ZWN1dGVkIGJ5IGRpc3BhdGNoXG4gICAqIEBwYXJhbSAgUmVkdXhQcm9jZXNzIGEgcHJvY2VzcyB0aGF0IGlzIG93bmVkIGJ5IHRoaXMgZ3JvdXBcbiAgICovXG4gIGV4ZWN1dGU8Rm9ybSwgUGF5bG9hZFZhbHVlPihcbiAgICBDdXN0b21SZWR1eFByb2Nlc3M6IElSZWR1eFByb2Nlc3NDbGFzczxcbiAgICAgIEZvcm0sXG4gICAgICBQYXlsb2FkVmFsdWUsXG4gICAgICBQcm9jZXNzR3JvdXBTdGF0ZSxcbiAgICAgIEdsb2JhbFN0YXRlXG4gICAgPixcbiAgICBmb3JtOiBGb3JtIHwgbnVsbCA9IG51bGxcbiAgKTogVGh1bmtBY3Rpb248XG4gICAgUHJvbWlzZTxQYXlsb2FkVmFsdWUgfCB2b2lkPixcbiAgICBHbG9iYWxTdGF0ZSxcbiAgICB1bmtub3duLFxuICAgIFJlZHV4UHJvY2Vzc0FjdGlvbjxQYXlsb2FkVmFsdWU+XG4gID4ge1xuICAgIGlmICghdGhpcy5vcHRpb25zLnByb2Nlc3Nlcy5pbmNsdWRlcyhDdXN0b21SZWR1eFByb2Nlc3MpKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXG4gICAgICAgICdBdHRlbXB0aW5nIHRvIGV4ZWN1dGUgYW4gUmVkdXhQcm9jZXNzIHRoYXQgaXMgbm90IGEgcGFydCBvZiB0aGlzIFJlZHV4UHJvY2Vzc0dyb3VwLiBUaGlzIGFjdGlvbiBpcyBpbGxlZ2FsLidcbiAgICAgIClcbiAgICB9XG5cbiAgICByZXR1cm4gYXN5bmMgKGRpc3BhdGNoOiBhbnksIGdldFN0YXRlOiBhbnkpID0+IHtcbiAgICAgIGNvbnN0IHN0b3JlOiBHbG9iYWxTdGF0ZSA9IGdldFN0YXRlKClcbiAgICAgIGNvbnN0IGFjdGlvbiA9IG5ldyBDdXN0b21SZWR1eFByb2Nlc3ModGhpcy5nZXRSZWR1eFByb2Nlc3NPcHRpb25zKHN0b3JlKSlcblxuICAgICAgbGV0IHJlc3VsdDogUGF5bG9hZFZhbHVlIHwgUHJvbWlzZTxQYXlsb2FkVmFsdWU+XG4gICAgICB0cnkge1xuICAgICAgICByZXN1bHQgPSBhd2FpdCBhY3Rpb24ucGVyZm9ybUFjdGlvbihmb3JtLCBzdG9yZSlcbiAgICAgICAgZGlzcGF0Y2goe1xuICAgICAgICAgIHR5cGU6IHRoaXMuZ2V0Rm9ybWF0dGVkQWN0aW9uVHlwZShDdXN0b21SZWR1eFByb2Nlc3MuZ2V0UHJvY2Vzc0tleSgpKSxcbiAgICAgICAgICBwYXlsb2FkOiByZXN1bHRcbiAgICAgICAgfSlcbiAgICAgICAgcmV0dXJuIHJlc3VsdFxuICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICBpZiAodGhpcy5lcnJvckhhbmRsZXIpIHtcbiAgICAgICAgICBhd2FpdCB0aGlzLmVycm9ySGFuZGxlcihlLCBkaXNwYXRjaCwgc3RvcmUpXG4gICAgICAgICAgcmV0dXJuXG4gICAgICAgIH1cbiAgICAgICAgdGhyb3cgZVxuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm4gdGhlIGZ1bGwgcmVkdWNlciBmb3IgdGhpcyBncm91cC4gVGhpcyBpcyByZWdpc3RlZCB0byByZWR1eFxuICAgKi9cbiAgZ2V0UmVkdWNlcigpOiBSZWR1Y2VyPFByb2Nlc3NHcm91cFN0YXRlLCBSZWR1eFByb2Nlc3NBY3Rpb248YW55Pj4ge1xuICAgIHJldHVybiAoc3RhdGU6IGFueSwgYWN0aW9uOiBhbnkpID0+IHtcbiAgICAgIGlmIChzdGF0ZSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIHN0YXRlID0gdGhpcy5vcHRpb25zLmRlZmF1bHRTdGF0ZVxuICAgICAgfVxuXG4gICAgICBmb3IgKGNvbnN0IFByb2Nlc3NDbGFzcyBvZiB0aGlzLm9wdGlvbnMucHJvY2Vzc2VzKSB7XG4gICAgICAgIGNvbnN0IHBvc3NpYmxlQWN0aW9uVHlwZSA9IHRoaXMuZ2V0Rm9ybWF0dGVkQWN0aW9uVHlwZShcbiAgICAgICAgICBQcm9jZXNzQ2xhc3MuZ2V0UHJvY2Vzc0tleSgpXG4gICAgICAgIClcblxuICAgICAgICBpZiAoYWN0aW9uLnR5cGUgPT09IHBvc3NpYmxlQWN0aW9uVHlwZSkge1xuICAgICAgICAgIGNvbnN0IHByb2Nlc3MgPSBuZXcgUHJvY2Vzc0NsYXNzKHRoaXMuZ2V0UmVkdXhQcm9jZXNzT3B0aW9ucygpKVxuICAgICAgICAgIHJldHVybiBwcm9jZXNzLmdldE5ld1N0YXRlKGFjdGlvbi5wYXlsb2FkLCBzdGF0ZSlcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICByZXR1cm4gc3RhdGVcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogRm9ybSBhbiBhY3Rpb24gbmFtZSAoaW50ZXJuYWwpXG4gICAqIEBwYXJhbSAga2V5XG4gICAqL1xuICBnZXRGb3JtYXR0ZWRBY3Rpb25UeXBlKGtleTogc3RyaW5nKTogc3RyaW5nIHtcbiAgICByZXR1cm4gYEByZWR1eC1wcm9jZXNzLWdyb3VwLyR7dGhpcy5ncm91cE5hbWUudG9Mb3dlckNhc2UoKX0vJHtrZXkudG9Mb3dlckNhc2UoKX1gXG4gIH1cblxuICAvKipcbiAgICogR2V0IGRlZmF1bHQgb3B0aW9ucyBmb3IgYSBwcm9jZXNzIChjYW4gYmUgb3ZlcndyaXR0ZW4gaW4gc3ViY2xhc3MpXG4gICAqIEBwYXJhbSAgc3RvcmUgIGdsb2JhbCBzdGF0ZVxuICAgKi9cbiAgZ2V0UmVkdXhQcm9jZXNzT3B0aW9ucyhfPzogR2xvYmFsU3RhdGUpOiBSZWR1eFByb2Nlc3NPcHRpb25zIHtcbiAgICByZXR1cm4ge31cbiAgfVxufVxuIl19