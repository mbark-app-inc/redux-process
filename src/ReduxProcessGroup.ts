import { ThunkAction } from 'redux-thunk'
import { Reducer } from 'redux'
import { IReduxProcessClass } from './interfaces/IReduxProcess'
import { IReduxProcessGroup } from './interfaces/IReduxProcessGroup'
import { ReduxProcessAction, ReduxProcessOptions } from './types/ReduxProcess'
import { ReduxProcessGroupOptions } from './types/ReduxProcessGroup'

export class ReduxProcessGroup<ProcessGroupState, GlobalState>
  implements IReduxProcessGroup<ProcessGroupState, GlobalState> {
  groupName: string
  options: ReduxProcessGroupOptions<ProcessGroupState>

  constructor(
    groupName: string,
    options: ReduxProcessGroupOptions<ProcessGroupState>
  ) {
    this.groupName = groupName
    this.options = options
  }

  getDefaultState(): ProcessGroupState {
    return this.options.defaultState
  }

  execute<Form, PayloadValue>(
    CustomReduxProcess: IReduxProcessClass<
      Form,
      PayloadValue,
      ProcessGroupState,
      GlobalState
    >,
    form: Form | null = null
  ): ThunkAction<
    Promise<PayloadValue>,
    GlobalState,
    unknown,
    ReduxProcessAction<PayloadValue>
  > {
    if (!this.options.processes.includes(CustomReduxProcess)) {
      throw new Error(
        'Attempting to execute an ReduxProcess that is not a part of this ReduxProcessGroup. This action is illegal.'
      )
    }

    return async (dispatch, getState) => {
      const store = getState()
      const action = new CustomReduxProcess(this.getReduxProcessOptions(store))

      const result = await action.performAction(form, store)

      dispatch({
        type: this.getFormattedActionType(CustomReduxProcess.getProcessKey()),
        payload: result
      })

      return result
    }
  }

  getReducer(): Reducer<ProcessGroupState, ReduxProcessAction<any>> {
    return (state, action) => {
      if (state === undefined) {
        state = this.options.defaultState
      }

      for (const ProcessClass of this.options.processes) {
        const possibleActionType = this.getFormattedActionType(
          ProcessClass.getProcessKey()
        )

        if (action.type === possibleActionType) {
          const process = new ProcessClass(this.getReduxProcessOptions())
          return process.getNewState(action.payload, state)
        }
      }

      return state
    }
  }

  getFormattedActionType(key: string): string {
    return `@redux-process-group/${this.groupName.toLowerCase()}/${key.toLowerCase()}`
  }

  getReduxProcessOptions(_?: GlobalState): ReduxProcessOptions {
    return {}
  }
}
