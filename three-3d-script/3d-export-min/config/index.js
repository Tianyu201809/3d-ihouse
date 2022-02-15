export const uploadUrl = `http://localhost:3000/upload/uploadFile`
export const houseUploadUrl = uploadUrl + '/house'
export const furnitureUploadUrl = uploadUrl + '/furniture'
export const actorsUploadUrl = uploadUrl + '/actors'
export const frameUploadUrl = uploadUrl + '/frame'
export const lightUploadUrl = uploadUrl + '/light'
export const renderId = window.sessionStorage.getItem('zqSchemeName') || window.localStorage.getItem('renderID') || ''
