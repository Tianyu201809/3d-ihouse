import { LightFileUitls } from '../class/LightFileUtils'
export function generateLightJSON(mLightClass) {
  const lightUtils = new LightFileUitls()
  const lightJSON = lightUtils.generateLightJSON(mLightClass)
  return lightJSON
}