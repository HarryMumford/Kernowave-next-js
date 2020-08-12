import DailyForecastComponent from "../../../../components/DailyForecast"
import { useRouter } from "next/router"

const DailyForecast = props => {
  const router = useRouter()
  const { day } = router.query
  return <>{day ? <DailyForecastComponent /> : <p>loading...</p>}</>
}

export default DailyForecast
