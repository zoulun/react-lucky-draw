const THEMESTYLE = 'THEMESTYLE'

export const lucky = (state, action) => {
  switch (action.type) {
    case THEMESTYLE:
      return { ...state }
      break;
    default:
      return { ...state }
  }
}

export const setThemeStyle = (data) => {
  themeStyle(data)
}

function themeStyle(data) {
  return { themeStyle: data, type: THEMESTYLE }
}