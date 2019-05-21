/* ==============================================================
                          state reselector
 ================================================================ */

import { createSelector } from 'reselect'

const getTokenList = state => {
  const selectedAccount = state.wallet.selectedAccount
  return state.wallet.accountMap[selectedAccount].tokenAssetsList
}

const getSelectToken = state => state.wallet.transfer.selectToken

const getSelectedToken = createSelector(
  [ getTokenList, getSelectToken ],
  (tokenList, selectToken) => {
    const [ tokenObj ] = tokenList.filter(({ tokenName }) => tokenName === selectToken)

    return tokenObj
  }
)

export const selectors = {
  getSelectedToken
}
