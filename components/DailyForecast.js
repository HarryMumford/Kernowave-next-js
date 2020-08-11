import DailyForecastContainer from "../style/components/DailyForecastContainer"
import SwellText from "../style/components/SwellText"
import Subheading from "../style/components/Subheading"
import WindSpeedText from "../style/components/WindSpeedText"
import WindDirectionText from "../style/components/WindDirectionText"
import StyledFontAwesomeIcon from "../style/components/StyledFontAwesomeIcon"
import WindConditionsContainer from "../style/components/WindConditionsContainer"
import { faLocationArrow } from "@fortawesome/free-solid-svg-icons"
import { faWind } from "@fortawesome/free-solid-svg-icons"

const DailyForecastComponent = React.forwardRef(
  ({ dailyForecast, onClick, href }, ref) => {
    return (
      <DailyForecastContainer href={href} onClick={onClick} ref={ref}>
        <Subheading>{dailyForecast.day}</Subheading>
        <SwellText quality={dailyForecast.quality.overall}>
          {dailyForecast.waveHeight} ft
        </SwellText>
        <WindConditionsContainer>
          <WindSpeedText windSpeed={dailyForecast.quality.windSpeed}>
            <StyledFontAwesomeIcon icon={faWind} />
            {dailyForecast.windSpeed} mph
          </WindSpeedText>
          <WindDirectionText
            windDirection={dailyForecast.quality.windDirection}
          >
            <StyledFontAwesomeIcon
              icon={faLocationArrow}
              transform={{
                rotate: dailyForecast.windDirection - 45
              }}
            />
            {dailyForecast.windRelativeDirection}
          </WindDirectionText>
        </WindConditionsContainer>
      </DailyForecastContainer>
    )
  }
)

export default DailyForecastComponent
