import { loadEnvConfig } from '@next/env'
 
const projectDir = process.cwd()
export default loadEnvConfig(projectDir)
