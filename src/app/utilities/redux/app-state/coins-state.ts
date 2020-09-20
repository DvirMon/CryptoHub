import { CoinModel } from '../../models/coin.model';

export class CoinsAuthState {
 
  public coins: CoinModel[] = []
  public selectedCoins: string[] = []

  constructor() {
    const selectedCoins = JSON.parse(sessionStorage.getItem('selectedCoins'))

    if (selectedCoins && selectedCoins.length > 0) {
      this.selectedCoins = selectedCoins
    }
  }
}