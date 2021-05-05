"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReduxProcessGroup = void 0;
/**
 * [constructor description]
 * @param groupName the name prefix for the group (e.g globalstate.auth.<props> => 'auth')
 * @param options   object containing the processes for this group and a default state
 */
var ReduxProcessGroup = /** @class */ (function () {
    function ReduxProcessGroup(groupName, options) {
        this.actionTypes = new Map();
        this.groupName = groupName;
        this.options = options;
    }
    /**
     * Get the default state
     */
    ReduxProcessGroup.prototype.getDefaultState = function () {
        return this.options.defaultState;
    };
    /**
     * Set the error handler for this specific group (internal)
     * @param  cb
     */
    ReduxProcessGroup.prototype.setErrorHandler = function (cb) {
        this.errorHandler = cb;
    };
    /**
     * Forms a ReduxProcess and passed form values into a redux action to be executed by dispatch
     * @param  ReduxProcess a process that is owned by this group
     */
    ReduxProcessGroup.prototype.execute = function (CustomReduxProcess, form) {
        var _this = this;
        if (form === void 0) { form = null; }
        if (!this.options.processes.includes(CustomReduxProcess)) {
            throw new Error('Attempting to execute an ReduxProcess that is not a part of this ReduxProcessGroup. This action is illegal.');
        }
        return function (dispatch, getState) { return __awaiter(_this, void 0, void 0, function () {
            var store, action, result, e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        store = getState();
                        action = new CustomReduxProcess(this.getReduxProcessOptions(store));
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 6]);
                        return [4 /*yield*/, action.performAction(form, store)];
                    case 2:
                        result = _a.sent();
                        dispatch({
                            type: this.getFormattedActionType(CustomReduxProcess),
                            payload: result
                        });
                        return [2 /*return*/, result];
                    case 3:
                        e_1 = _a.sent();
                        if (!this.errorHandler) return [3 /*break*/, 5];
                        return [4 /*yield*/, this.errorHandler(e_1, dispatch, store)];
                    case 4:
                        _a.sent();
                        return [2 /*return*/];
                    case 5: throw e_1;
                    case 6: return [2 /*return*/];
                }
            });
        }); };
    };
    /**
     * Return the full reducer for this group. This is registed to redux
     */
    ReduxProcessGroup.prototype.getReducer = function () {
        var _this = this;
        return function (state, action) {
            if (state === undefined) {
                state = _this.options.defaultState;
            }
            for (var _i = 0, _a = _this.options.processes; _i < _a.length; _i++) {
                var ProcessClass = _a[_i];
                var possibleActionType = _this.getFormattedActionType(ProcessClass);
                if (action.type === possibleActionType) {
                    var process = new ProcessClass(_this.getReduxProcessOptions());
                    return process.getNewState(action.payload, state);
                }
            }
            return state;
        };
    };
    /**
     * Form an action name (internal)
     * @param  key
     */
    ReduxProcessGroup.prototype.getFormattedActionType = function (CustomReduxProcess) {
        var value = this.actionTypes.get(CustomReduxProcess);
        if (value) {
            return value;
        }
        value = "@redux-process-group/" + this.groupName.toLowerCase() + "/" + CustomReduxProcess.getProcessKey();
        this.actionTypes.set(CustomReduxProcess, value);
        return value;
    };
    /**
     * Get default options for a process (can be overwritten in subclass)
     * @param  store  global state
     */
    ReduxProcessGroup.prototype.getReduxProcessOptions = function (_) {
        return {};
    };
    return ReduxProcessGroup;
}());
exports.ReduxProcessGroup = ReduxProcessGroup;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUmVkdXhQcm9jZXNzR3JvdXAuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvUmVkdXhQcm9jZXNzR3JvdXAudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBV0E7Ozs7R0FJRztBQUNIO0lBT0UsMkJBQ0UsU0FBaUIsRUFDakIsT0FBb0Q7UUFKNUMsZ0JBQVcsR0FBNEIsSUFBSSxHQUFHLEVBQUUsQ0FBQTtRQU14RCxJQUFJLENBQUMsU0FBUyxHQUFHLFNBQVMsQ0FBQTtRQUMxQixJQUFJLENBQUMsT0FBTyxHQUFHLE9BQU8sQ0FBQTtJQUN4QixDQUFDO0lBRUQ7O09BRUc7SUFDSCwyQ0FBZSxHQUFmO1FBQ0UsT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDLFlBQVksQ0FBQTtJQUNsQyxDQUFDO0lBRUQ7OztPQUdHO0lBQ0gsMkNBQWUsR0FBZixVQUFnQixFQUE2QjtRQUMzQyxJQUFJLENBQUMsWUFBWSxHQUFHLEVBQUUsQ0FBQTtJQUN4QixDQUFDO0lBRUQ7OztPQUdHO0lBQ0gsbUNBQU8sR0FBUCxVQUNFLGtCQUtDLEVBQ0QsSUFBd0I7UUFQMUIsaUJBd0NDO1FBakNDLHFCQUFBLEVBQUEsV0FBd0I7UUFPeEIsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxrQkFBa0IsQ0FBQyxFQUFFO1lBQ3hELE1BQU0sSUFBSSxLQUFLLENBQ2IsNkdBQTZHLENBQzlHLENBQUE7U0FDRjtRQUVELE9BQU8sVUFBTyxRQUFhLEVBQUUsUUFBYTs7Ozs7d0JBQ2xDLEtBQUssR0FBZ0IsUUFBUSxFQUFFLENBQUE7d0JBQy9CLE1BQU0sR0FBRyxJQUFJLGtCQUFrQixDQUFDLElBQUksQ0FBQyxzQkFBc0IsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFBOzs7O3dCQUk5RCxxQkFBTSxNQUFNLENBQUMsYUFBYSxDQUFDLElBQUksRUFBRSxLQUFLLENBQUMsRUFBQTs7d0JBQWhELE1BQU0sR0FBRyxTQUF1QyxDQUFBO3dCQUNoRCxRQUFRLENBQUM7NEJBQ1AsSUFBSSxFQUFFLElBQUksQ0FBQyxzQkFBc0IsQ0FBQyxrQkFBa0IsQ0FBQzs0QkFDckQsT0FBTyxFQUFFLE1BQU07eUJBQ2hCLENBQUMsQ0FBQTt3QkFDRixzQkFBTyxNQUFNLEVBQUE7Ozs2QkFFVCxJQUFJLENBQUMsWUFBWSxFQUFqQix3QkFBaUI7d0JBQ25CLHFCQUFNLElBQUksQ0FBQyxZQUFZLENBQUMsR0FBQyxFQUFFLFFBQVEsRUFBRSxLQUFLLENBQUMsRUFBQTs7d0JBQTNDLFNBQTJDLENBQUE7d0JBQzNDLHNCQUFNOzRCQUVSLE1BQU0sR0FBQyxDQUFBOzs7O2FBRVYsQ0FBQTtJQUNILENBQUM7SUFFRDs7T0FFRztJQUNILHNDQUFVLEdBQVY7UUFBQSxpQkFpQkM7UUFoQkMsT0FBTyxVQUFDLEtBQVUsRUFBRSxNQUFXO1lBQzdCLElBQUksS0FBSyxLQUFLLFNBQVMsRUFBRTtnQkFDdkIsS0FBSyxHQUFHLEtBQUksQ0FBQyxPQUFPLENBQUMsWUFBWSxDQUFBO2FBQ2xDO1lBRUQsS0FBMkIsVUFBc0IsRUFBdEIsS0FBQSxLQUFJLENBQUMsT0FBTyxDQUFDLFNBQVMsRUFBdEIsY0FBc0IsRUFBdEIsSUFBc0IsRUFBRTtnQkFBOUMsSUFBTSxZQUFZLFNBQUE7Z0JBQ3JCLElBQU0sa0JBQWtCLEdBQUcsS0FBSSxDQUFDLHNCQUFzQixDQUFDLFlBQVksQ0FBQyxDQUFBO2dCQUVwRSxJQUFJLE1BQU0sQ0FBQyxJQUFJLEtBQUssa0JBQWtCLEVBQUU7b0JBQ3RDLElBQU0sT0FBTyxHQUFHLElBQUksWUFBWSxDQUFDLEtBQUksQ0FBQyxzQkFBc0IsRUFBRSxDQUFDLENBQUE7b0JBQy9ELE9BQU8sT0FBTyxDQUFDLFdBQVcsQ0FBQyxNQUFNLENBQUMsT0FBTyxFQUFFLEtBQUssQ0FBQyxDQUFBO2lCQUNsRDthQUNGO1lBRUQsT0FBTyxLQUFLLENBQUE7UUFDZCxDQUFDLENBQUE7SUFDSCxDQUFDO0lBRUQ7OztPQUdHO0lBQ0gsa0RBQXNCLEdBQXRCLFVBQ0Usa0JBQTBEO1FBRTFELElBQUksS0FBSyxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsR0FBRyxDQUFDLGtCQUFrQixDQUFDLENBQUE7UUFDcEQsSUFBSSxLQUFLLEVBQUU7WUFDVCxPQUFPLEtBQUssQ0FBQTtTQUNiO1FBRUQsS0FBSyxHQUFHLDBCQUF3QixJQUFJLENBQUMsU0FBUyxDQUFDLFdBQVcsRUFBRSxTQUFJLGtCQUFrQixDQUFDLGFBQWEsRUFBSSxDQUFBO1FBQ3BHLElBQUksQ0FBQyxXQUFXLENBQUMsR0FBRyxDQUFDLGtCQUFrQixFQUFFLEtBQUssQ0FBQyxDQUFBO1FBRS9DLE9BQU8sS0FBSyxDQUFBO0lBQ2QsQ0FBQztJQUVEOzs7T0FHRztJQUNILGtEQUFzQixHQUF0QixVQUF1QixDQUFlO1FBQ3BDLE9BQU8sRUFBRSxDQUFBO0lBQ1gsQ0FBQztJQUNILHdCQUFDO0FBQUQsQ0FBQyxBQTNIRCxJQTJIQztBQTNIWSw4Q0FBaUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBUaHVua0FjdGlvbiB9IGZyb20gJ3JlZHV4LXRodW5rJ1xuaW1wb3J0IHsgUmVkdWNlciB9IGZyb20gJ3JlZHV4J1xuaW1wb3J0IHsgSVJlZHV4UHJvY2Vzc0NsYXNzIH0gZnJvbSAnLi9pbnRlcmZhY2VzL0lSZWR1eFByb2Nlc3MnXG5pbXBvcnQgeyBJUmVkdXhQcm9jZXNzR3JvdXAgfSBmcm9tICcuL2ludGVyZmFjZXMvSVJlZHV4UHJvY2Vzc0dyb3VwJ1xuaW1wb3J0IHsgUmVkdXhQcm9jZXNzQWN0aW9uLCBSZWR1eFByb2Nlc3NPcHRpb25zIH0gZnJvbSAnLi90eXBlcy9SZWR1eFByb2Nlc3MnXG5pbXBvcnQge1xuICBSZWR1eFByb2Nlc3NHcm91cE9wdGlvbnMsXG4gIEVycm9ySGFuZGxlcixcbiAgUmVkdXhQcm9jZXNzQWN0aW9uVHlwZXNcbn0gZnJvbSAnLi90eXBlcy9SZWR1eFByb2Nlc3NHcm91cCdcblxuLyoqXG4gKiBbY29uc3RydWN0b3IgZGVzY3JpcHRpb25dXG4gKiBAcGFyYW0gZ3JvdXBOYW1lIHRoZSBuYW1lIHByZWZpeCBmb3IgdGhlIGdyb3VwIChlLmcgZ2xvYmFsc3RhdGUuYXV0aC48cHJvcHM+ID0+ICdhdXRoJylcbiAqIEBwYXJhbSBvcHRpb25zICAgb2JqZWN0IGNvbnRhaW5pbmcgdGhlIHByb2Nlc3NlcyBmb3IgdGhpcyBncm91cCBhbmQgYSBkZWZhdWx0IHN0YXRlXG4gKi9cbmV4cG9ydCBjbGFzcyBSZWR1eFByb2Nlc3NHcm91cDxQcm9jZXNzR3JvdXBTdGF0ZSwgR2xvYmFsU3RhdGU+XG4gIGltcGxlbWVudHMgSVJlZHV4UHJvY2Vzc0dyb3VwPFByb2Nlc3NHcm91cFN0YXRlLCBHbG9iYWxTdGF0ZT4ge1xuICBncm91cE5hbWU6IHN0cmluZ1xuICBvcHRpb25zOiBSZWR1eFByb2Nlc3NHcm91cE9wdGlvbnM8UHJvY2Vzc0dyb3VwU3RhdGU+XG4gIHByb3RlY3RlZCBlcnJvckhhbmRsZXI/OiBFcnJvckhhbmRsZXI8R2xvYmFsU3RhdGU+XG4gIHByb3RlY3RlZCBhY3Rpb25UeXBlczogUmVkdXhQcm9jZXNzQWN0aW9uVHlwZXMgPSBuZXcgTWFwKClcblxuICBjb25zdHJ1Y3RvcihcbiAgICBncm91cE5hbWU6IHN0cmluZyxcbiAgICBvcHRpb25zOiBSZWR1eFByb2Nlc3NHcm91cE9wdGlvbnM8UHJvY2Vzc0dyb3VwU3RhdGU+XG4gICkge1xuICAgIHRoaXMuZ3JvdXBOYW1lID0gZ3JvdXBOYW1lXG4gICAgdGhpcy5vcHRpb25zID0gb3B0aW9uc1xuICB9XG5cbiAgLyoqXG4gICAqIEdldCB0aGUgZGVmYXVsdCBzdGF0ZVxuICAgKi9cbiAgZ2V0RGVmYXVsdFN0YXRlKCk6IFByb2Nlc3NHcm91cFN0YXRlIHtcbiAgICByZXR1cm4gdGhpcy5vcHRpb25zLmRlZmF1bHRTdGF0ZVxuICB9XG5cbiAgLyoqXG4gICAqIFNldCB0aGUgZXJyb3IgaGFuZGxlciBmb3IgdGhpcyBzcGVjaWZpYyBncm91cCAoaW50ZXJuYWwpXG4gICAqIEBwYXJhbSAgY2JcbiAgICovXG4gIHNldEVycm9ySGFuZGxlcihjYjogRXJyb3JIYW5kbGVyPEdsb2JhbFN0YXRlPikge1xuICAgIHRoaXMuZXJyb3JIYW5kbGVyID0gY2JcbiAgfVxuXG4gIC8qKlxuICAgKiBGb3JtcyBhIFJlZHV4UHJvY2VzcyBhbmQgcGFzc2VkIGZvcm0gdmFsdWVzIGludG8gYSByZWR1eCBhY3Rpb24gdG8gYmUgZXhlY3V0ZWQgYnkgZGlzcGF0Y2hcbiAgICogQHBhcmFtICBSZWR1eFByb2Nlc3MgYSBwcm9jZXNzIHRoYXQgaXMgb3duZWQgYnkgdGhpcyBncm91cFxuICAgKi9cbiAgZXhlY3V0ZTxGb3JtLCBQYXlsb2FkVmFsdWU+KFxuICAgIEN1c3RvbVJlZHV4UHJvY2VzczogSVJlZHV4UHJvY2Vzc0NsYXNzPFxuICAgICAgRm9ybSxcbiAgICAgIFBheWxvYWRWYWx1ZSxcbiAgICAgIFByb2Nlc3NHcm91cFN0YXRlLFxuICAgICAgR2xvYmFsU3RhdGVcbiAgICA+LFxuICAgIGZvcm06IEZvcm0gfCBudWxsID0gbnVsbFxuICApOiBUaHVua0FjdGlvbjxcbiAgICBQcm9taXNlPFBheWxvYWRWYWx1ZSB8IHZvaWQ+LFxuICAgIEdsb2JhbFN0YXRlLFxuICAgIHVua25vd24sXG4gICAgUmVkdXhQcm9jZXNzQWN0aW9uPFBheWxvYWRWYWx1ZT5cbiAgPiB7XG4gICAgaWYgKCF0aGlzLm9wdGlvbnMucHJvY2Vzc2VzLmluY2x1ZGVzKEN1c3RvbVJlZHV4UHJvY2VzcykpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihcbiAgICAgICAgJ0F0dGVtcHRpbmcgdG8gZXhlY3V0ZSBhbiBSZWR1eFByb2Nlc3MgdGhhdCBpcyBub3QgYSBwYXJ0IG9mIHRoaXMgUmVkdXhQcm9jZXNzR3JvdXAuIFRoaXMgYWN0aW9uIGlzIGlsbGVnYWwuJ1xuICAgICAgKVxuICAgIH1cblxuICAgIHJldHVybiBhc3luYyAoZGlzcGF0Y2g6IGFueSwgZ2V0U3RhdGU6IGFueSkgPT4ge1xuICAgICAgY29uc3Qgc3RvcmU6IEdsb2JhbFN0YXRlID0gZ2V0U3RhdGUoKVxuICAgICAgY29uc3QgYWN0aW9uID0gbmV3IEN1c3RvbVJlZHV4UHJvY2Vzcyh0aGlzLmdldFJlZHV4UHJvY2Vzc09wdGlvbnMoc3RvcmUpKVxuXG4gICAgICBsZXQgcmVzdWx0OiBQYXlsb2FkVmFsdWUgfCBQcm9taXNlPFBheWxvYWRWYWx1ZT5cbiAgICAgIHRyeSB7XG4gICAgICAgIHJlc3VsdCA9IGF3YWl0IGFjdGlvbi5wZXJmb3JtQWN0aW9uKGZvcm0sIHN0b3JlKVxuICAgICAgICBkaXNwYXRjaCh7XG4gICAgICAgICAgdHlwZTogdGhpcy5nZXRGb3JtYXR0ZWRBY3Rpb25UeXBlKEN1c3RvbVJlZHV4UHJvY2VzcyksXG4gICAgICAgICAgcGF5bG9hZDogcmVzdWx0XG4gICAgICAgIH0pXG4gICAgICAgIHJldHVybiByZXN1bHRcbiAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgaWYgKHRoaXMuZXJyb3JIYW5kbGVyKSB7XG4gICAgICAgICAgYXdhaXQgdGhpcy5lcnJvckhhbmRsZXIoZSwgZGlzcGF0Y2gsIHN0b3JlKVxuICAgICAgICAgIHJldHVyblxuICAgICAgICB9XG4gICAgICAgIHRocm93IGVcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJuIHRoZSBmdWxsIHJlZHVjZXIgZm9yIHRoaXMgZ3JvdXAuIFRoaXMgaXMgcmVnaXN0ZWQgdG8gcmVkdXhcbiAgICovXG4gIGdldFJlZHVjZXIoKTogUmVkdWNlcjxQcm9jZXNzR3JvdXBTdGF0ZSwgUmVkdXhQcm9jZXNzQWN0aW9uPGFueT4+IHtcbiAgICByZXR1cm4gKHN0YXRlOiBhbnksIGFjdGlvbjogYW55KSA9PiB7XG4gICAgICBpZiAoc3RhdGUgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICBzdGF0ZSA9IHRoaXMub3B0aW9ucy5kZWZhdWx0U3RhdGVcbiAgICAgIH1cblxuICAgICAgZm9yIChjb25zdCBQcm9jZXNzQ2xhc3Mgb2YgdGhpcy5vcHRpb25zLnByb2Nlc3Nlcykge1xuICAgICAgICBjb25zdCBwb3NzaWJsZUFjdGlvblR5cGUgPSB0aGlzLmdldEZvcm1hdHRlZEFjdGlvblR5cGUoUHJvY2Vzc0NsYXNzKVxuXG4gICAgICAgIGlmIChhY3Rpb24udHlwZSA9PT0gcG9zc2libGVBY3Rpb25UeXBlKSB7XG4gICAgICAgICAgY29uc3QgcHJvY2VzcyA9IG5ldyBQcm9jZXNzQ2xhc3ModGhpcy5nZXRSZWR1eFByb2Nlc3NPcHRpb25zKCkpXG4gICAgICAgICAgcmV0dXJuIHByb2Nlc3MuZ2V0TmV3U3RhdGUoYWN0aW9uLnBheWxvYWQsIHN0YXRlKVxuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBzdGF0ZVxuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBGb3JtIGFuIGFjdGlvbiBuYW1lIChpbnRlcm5hbClcbiAgICogQHBhcmFtICBrZXlcbiAgICovXG4gIGdldEZvcm1hdHRlZEFjdGlvblR5cGUoXG4gICAgQ3VzdG9tUmVkdXhQcm9jZXNzOiBJUmVkdXhQcm9jZXNzQ2xhc3M8YW55LCBhbnksIGFueSwgYW55PlxuICApOiBzdHJpbmcge1xuICAgIGxldCB2YWx1ZSA9IHRoaXMuYWN0aW9uVHlwZXMuZ2V0KEN1c3RvbVJlZHV4UHJvY2VzcylcbiAgICBpZiAodmFsdWUpIHtcbiAgICAgIHJldHVybiB2YWx1ZVxuICAgIH1cblxuICAgIHZhbHVlID0gYEByZWR1eC1wcm9jZXNzLWdyb3VwLyR7dGhpcy5ncm91cE5hbWUudG9Mb3dlckNhc2UoKX0vJHtDdXN0b21SZWR1eFByb2Nlc3MuZ2V0UHJvY2Vzc0tleSgpfWBcbiAgICB0aGlzLmFjdGlvblR5cGVzLnNldChDdXN0b21SZWR1eFByb2Nlc3MsIHZhbHVlKVxuXG4gICAgcmV0dXJuIHZhbHVlXG4gIH1cblxuICAvKipcbiAgICogR2V0IGRlZmF1bHQgb3B0aW9ucyBmb3IgYSBwcm9jZXNzIChjYW4gYmUgb3ZlcndyaXR0ZW4gaW4gc3ViY2xhc3MpXG4gICAqIEBwYXJhbSAgc3RvcmUgIGdsb2JhbCBzdGF0ZVxuICAgKi9cbiAgZ2V0UmVkdXhQcm9jZXNzT3B0aW9ucyhfPzogR2xvYmFsU3RhdGUpOiBSZWR1eFByb2Nlc3NPcHRpb25zIHtcbiAgICByZXR1cm4ge31cbiAgfVxufVxuIl19