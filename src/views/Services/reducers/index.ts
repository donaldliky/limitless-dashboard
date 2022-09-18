
// ** Initial State
const initialState = {
  nfts: [],
  wallets: []
}

const reducer = (state = initialState, action: any) => {
  switch (action.type) {
    case 'SET_WALLET_INFO':
      return {
        ...state,
        nfts: action.nfts,
        wallets: action.wallets
      }
    default:
      return state
  }
}

export default reducer
