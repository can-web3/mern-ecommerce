export default function AuthReducer(state, action) {
  switch (action.type) {
    case "GET_AUTH":
      return { ...state, auth: action.auth }

    case "LOGOUT":
      return {
        ...state,
        auth: null
      }

    default:
      return state
  }
}
