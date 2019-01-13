const THEME_STYLE = 'THEME_STYLE';  //  主题风格
const IMPORT_SHEET_DATA = 'IMPORT_SHEET_DATA';  //  导入的数据
const LUCKY_DRAW_DATA = 'LUCKY_DRAW_NAME';  //  创建的抽奖数据
const PRIZE_LIST = 'PRIZE_LIST';  //  中奖列表
const SHEET_HEAD_NAME_INDEX = 'SHEET_HEAD_NAME_INDEX';  //  姓名索引
const EXPORT_PRIZE_DATA = 'EXPORT_PRIZE_DATA';  //  导出中奖名单数据
const CLEAR_CURRENT_PRIZE_DATA = 'CLEAR_CURRENT_PRIZE_DATA';  //  清空当前抽奖数据

const initState = {
  themeStyle: {},
  importSheetData: [],
  luckyDrawData: {},
  prizeList: [],
  sheetNameIndex: 0,
  exportPrizetData: []
}

export const lucky = (state = initState, action) => {
  switch (action.type) {
    case THEME_STYLE:
      return { ...state, ...action.themeStyle }
      break;
    case IMPORT_SHEET_DATA:
      return { ...state, importSheetData: action.importSheetData }
      break;
    case LUCKY_DRAW_DATA:
      return { ...state, luckyDrawData: action.luckyDrawData }
      break;
    case PRIZE_LIST:
      return { ...state, prizeList: [...action.prizeList] }
      break;
    case SHEET_HEAD_NAME_INDEX:
      return { ...state, ...action.sheetNameIndex }
      break;
    case EXPORT_PRIZE_DATA:
      return { ...state, exportPrizetData: action.exportPrizetData }
      break;
    case CLEAR_CURRENT_PRIZE_DATA:
      return { ...state, exportPrizetData: [] }
      break;
    default:
      return { ...state }
  }
}

export const setThemeStyle = (data) => {
  return { themeStyle: data, type: THEME_STYLE }
}

export const saveImportSheetData = (data = []) => {
  return { importSheetData: data, type: IMPORT_SHEET_DATA }
}

export const createLuckyDrawData = (data) => {
  return { luckyDrawData: data, type: LUCKY_DRAW_DATA }
}

export const setPrizeList = (data) => {
  return { prizeList: data, type: PRIZE_LIST }
}

export const setSheetHeadNameIndex = (index) => {
  return { sheetNameIndex: index, type: SHEET_HEAD_NAME_INDEX }
}

export const saveExportPrizetData = (data = []) => {
  return { exportPrizetData: data, type: EXPORT_PRIZE_DATA }
}

export const clearCurrentPrizeData = () => {
  return { type: CLEAR_CURRENT_PRIZE_DATA }
}
