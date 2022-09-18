
// ** Initial State
const initialState = {
  authorize: {
    access_token: null,
    token_type: null,
    expires_in: null,
    scope: null
  },
  discord: {
    id: null,
    username: null,
    avatar: null,
    avatar_decoration: null,
    discriminator: null,
    public_flags: null,
    flags: null,
    banner: null,
    banner_color: null,
    accent_color: null,
    locale: null,
    mfa_enabled: null
  }
}

const reducer = (state = initialState, action: any) => {
  switch (action.type) {
    case 'SET_AUTHORIZE':
      return {
        ...state,
        authorize: action.authorize
      }
    case 'SET_DISCORD':
      return {
        ...state,
        discord: action.discord
      }
    default:
      return state
  }
}

export default reducer
