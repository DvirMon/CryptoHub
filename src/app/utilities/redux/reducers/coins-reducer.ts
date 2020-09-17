import { Action } from '../action';
import { ActionType } from '../action-type';
import { CoinsAuthState } from '../app-state/coins-state';

export const coinsReducer = (oldAppState = new CoinsAuthState(), action: Action): CoinsAuthState => {

  const newAppState: CoinsAuthState = oldAppState

  switch (action.type) {
    case ActionType.GetPageCoins:
      newAppState.coins = action.payload
      break
    case ActionType.Mobile:
      newAppState.coins = action.payload
      break
    case ActionType.UpdateLoader:
      newAppState.loader = true
      break
    case ActionType.AddPageCoins:
      newAppState.coins = newAppState.coins.concat(action.payload)
      break
    case ActionType.AddCoin:
      newAppState.selectedCoins.push(action.payload)
      sessionStorage.setItem("selectedCoins", JSON.stringify(newAppState.selectedCoins))
      break
    case ActionType.DeleteCoin:
      deleteLogic(newAppState.selectedCoins, action.payload)
      sessionStorage.setItem("selectedCoins", JSON.stringify(newAppState.selectedCoins))
      break
    case ActionType.DeleteAllCoins:
      newAppState.selectedCoins = []
      sessionStorage.clear()
      break
  }

  return newAppState

}

const deleteLogic = (selectedCoins: string[], id: string) => {
  const indexToDelete = selectedCoins.findIndex(coinId => coinId === id)
  if (indexToDelete >= 0) {
    selectedCoins.splice(indexToDelete, 1)
  }
}

