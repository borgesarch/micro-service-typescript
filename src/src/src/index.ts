import 'reflect-metadata'
import '@infrastructure/cross-cutting/globalization/i18n'
import * as dotenv from 'dotenv'
import Ioc from '@infrastructure/ioc/ioc'
import jobs from '@infrastructure/cron-jobs'

dotenv.config()
const init = async () => {
  const ioc = new Ioc()
  await ioc.resolve()
  await jobs.forEach(
    async (job) => await import(job))
}

init().catch(console.log)

process.on('uncaughtException', (err) => {
  console.log(err)
})
