import SwellText from "../style/components/SwellText"
import Subheading from "../style/components/Subheading"
import WindSpeedText from "../style/components/WindSpeedText"
import WindDirectionText from "../style/components/WindDirectionText"
import StyledFontAwesomeIcon from "../style/components/StyledFontAwesomeIcon"
import WindConditionsContainer from "../style/components/WindConditionsContainer"
import { faLocationArrow } from "@fortawesome/free-solid-svg-icons"
import { faWind } from "@fortawesome/free-solid-svg-icons"

const DailyForecastComponent = props => {
  const { data } = props
  return (
    <>
      <Subheading>{data.day}</Subheading>
      <SwellText quality={data.quality.overall}>{data.waveHeight} ft</SwellText>
      <WindConditionsContainer>
        <WindSpeedText windSpeed={data.quality.windSpeed}>
          <StyledFontAwesomeIcon icon={faWind} />
          {data.windSpeed} mph
        </WindSpeedText>
        <WindDirectionText windDirection={data.quality.windDirection}>
          <StyledFontAwesomeIcon
            icon={faLocationArrow}
            transform={{
              rotate: data.windDirection - 45
            }}
          />
          {data.windRelativeDirection}
        </WindDirectionText>
      </WindConditionsContainer>
    </>
  )
}

export default DailyForecastComponent
