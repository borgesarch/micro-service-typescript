import { ExternalService } from '@services/outside/externals/external-service'
import cron from 'node-cron'
import { container } from 'tsyringe'

export default (() => {
  cron.schedule('*/1 * * * *', async () => {
    const externalService = container.resolve<ExternalService>('IExternalService')
    console.table({
      date: new Date().toISOString(),
      schedule_name: 'job_mailing',
      status: externalService.calling(),
    })
  })
})()
