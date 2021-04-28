import { ThunkAction } from 'redux-thunk'
import { Reducer } from 'redux'
import { IReduxProcessClass } from './interfaces/IReduxProcess'
import { IReduxProcessGroup } from './interfaces/IReduxProcessGroup'
import { ReduxProcessAction, ReduxProcessOptions } from './types/ReduxProcess'
import {
  ReduxProcessGroupOptions,
  ErrorHandler,
  ReduxProcessActionTypes
} from './types/ReduxProcessGroup'

/**
 * [constructor description]
 * @param groupName the name prefix for the group (e.g globalstate.auth.<props> => 'auth')
 * @param options   object containing the processes for this group and a default state
 */
export class ReduxProcessGroup<ProcessGroupState, GlobalState>
  implements IReduxProcessGroup<ProcessGroupState, GlobalState> {
  groupName: string
  options: ReduxProcessGroupOptions<ProcessGroupState>
  protected errorHandler?: ErrorHandler<GlobalState>
  protected actionTypes: ReduxProcessActionTypes = new Map()

  constructor(
    groupName: string,
    options: ReduxProcessGroupOptions<ProcessGroupState>
  ) {
    this.groupName = groupName
    this.options = options
  }

  /**
   * Get the default state
   */
  getDefaultState(): ProcessGroupState {
    return this.options.defaultState
  }

  /**
   * Set the error handler for this specific group (internal)
   * @param  cb
   */
  setErrorHandler(cb: ErrorHandler<GlobalState>) {
    this.errorHandler = cb
  }

  /**
   * Forms a ReduxProcess and passed form values into a redux action to be executed by dispatch
   * @param  ReduxProcess a process that is owned by this group
   */
  execute<Form, PayloadValue>(
    CustomReduxProcess: IReduxProcessClass<
      Form,
      PayloadValue,
      ProcessGroupState,
      GlobalState
    >,
    form: Form | null = null
  ): ThunkAction<
    Promise<PayloadValue | void>,
    GlobalState,
    unknown,
    ReduxProcessAction<PayloadValue>
  > {
    if (!this.options.processes.includes(CustomReduxProcess)) {
      throw new Error(
        'Attempting to execute an ReduxProcess that is not a part of this ReduxProcessGroup. This action is illegal.'
      )
    }

    return async (dispatch: any, getState: any) => {
      const store: GlobalState = getState()
      const action = new CustomReduxProcess(this.getReduxProcessOptions(store))

      let result: PayloadValue | Promise<PayloadValue>
      try {
        result = await action.performAction(form, store)
        dispatch({
          type: this.getFormattedActionType(CustomReduxProcess),
          payload: result
        })
        return result
      } catch (e) {
        if (this.errorHandler) {
          await this.errorHandler(e, dispatch, store)
          return
        }
        throw e
      }
    }
  }

  /**
   * Return the full reducer for this group. This is registed to redux
   */
  getReducer(): Reducer<ProcessGroupState, ReduxProcessAction<any>> {
    return (state: any, action: any) => {
      if (state === undefined) {
        state = this.options.defaultState
      }

      for (const ProcessClass of this.options.processes) {
        const possibleActionType = this.getFormattedActionType(ProcessClass)

        if (action.type === possibleActionType) {
          const process = new ProcessClass(this.getReduxProcessOptions())
          return process.getNewState(action.payload, state)
        }
      }

      return state
    }
  }

  /**
   * Form an action name (internal)
   * @param  key
   */
  getFormattedActionType(
    CustomReduxProcess: IReduxProcessClass<any, any, any, any>
  ): string {
    let value = this.actionTypes.get(CustomReduxProcess)
    if (value) {
      return value
    }

    value = `@redux-process-group/${this.groupName.toLowerCase()}/${CustomReduxProcess.getProcessKey()}`
    this.actionTypes.set(CustomReduxProcess, value)

    return value
  }

  /**
   * Get default options for a process (can be overwritten in subclass)
   * @param  store  global state
   */
  getReduxProcessOptions(_?: GlobalState): ReduxProcessOptions {
    return {}
  }
}
