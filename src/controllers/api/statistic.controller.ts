import { OK } from '~/core/success.response'
import catchAsync from '~/helpers/catch.async'
import StatisticService from '~/services/statistic.service'

class StatictisController {
    getStatistic = catchAsync(async (req, res, next) => {
        const statistic = await StatisticService.getStatistic()
        OK(res, 'get statistic successfully', statistic)
    })
}

export default new StatictisController()
