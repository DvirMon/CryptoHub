import { Action } from '../action';
import { ActionType } from '../action-type';
import { ChartAppState } from '../app-state/chart.state'

export const chartsReducer = (oldAppState = new ChartAppState(), action: Action): ChartAppState => {

  const newAppState: ChartAppState = oldAppState

  switch (action.type) {
    case ActionType.GetChartDots:
      newAppState.chartDots = action.payload
      break
  }

  return newAppState

}
