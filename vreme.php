<!DOCTYPE HTML>
<html>
  <script type="text/javascript">
  function showDate() {
    var d = new Date();
    var curr_date = d.getDate();
    var curr_month = d.getMonth() + 1; //months are zero based
    var curr_year = d.getFullYear();
    document.write(curr_date + "-" + curr_month + "-" + curr_year);
  }
</script>
	<script type="text/javascript" src="js/jquery.min.js"></script>
	<script type="text/javascript" src="js/openWeather.js"></script>
	 <div class="sidebar">
   <div class="weather-wrapper hide">
			  <img src="" class="weather-icon" alt="Weather Icon" />
			  <p><strong>Place</strong>
			  <span class="weather-place"></span></p>
			  <p><strong>Temperature</strong>
			  <span class="weather-temperature"></span> (<span class="weather-min-temperature"></span> - <span class="weather-max-temperature"></span>)</p>
			  <p><strong>Description</strong>
			  <span class="weather-description capitalize"></span></p>
			  <p><strong>Humidity</strong>
			  <span class="weather-humidity"></span></p>
			  <p><strong>Wind speed</strong>
			  <span class="weather-wind-speed"></span> <span class="weather-wind-dir"></span></p>
			  
			  <p><strong>Sunrise</strong>
			  <span class="weather-sunrise"></span></p>
			  <p><strong>Sunset</strong>
			  <span class="weather-sunset"></span></p>
		</div>
		<div class="forecast forecast_3 hide">
   <div class="forecast-1">
    <div class="forecast-day">
     <p class="forecast-day-1"></p>
     <p class="forecast-date-1"></p>
    </div>
    <div class="forecast-data-1">
     <img src="" class="forecast-icon-1" />
     <p class="forecast-temperature-1"></p>
     <p class="forecast-temperature-min-max"><span class="forecast-min-temperature-1"></span>-<span class="forecast-max-temperature-1"></span></p>
     <br class="clear" />
     <p class="forecast-description-1 tleft"></p>
    </div>
    <br class="clear" />
   </div>
   <div class="forecast-2">
    <div class="forecast-day">
     <p class="forecast-day-2"></p>
     <p class="forecast-date-2"></p>
    </div>
    <div class="forecast-data-2">
     <img src="" class="forecast-icon-2" />
     <p class="forecast-temperature-2"></p>
     <p class="forecast-temperature-min-max"><span class="forecast-min-temperature-2"></span>-<span class="forecast-max-temperature-2"></span></p>
     <br class="clear" />
     <p class="forecast-description-2 tleft"></p>
    </div>
    <br class="clear" />
   </div>
   <div class="forecast-3">
    <div class="forecast-day">
     <p class="forecast-day-3"></p>
     <p class="forecast-date-3"></p>
    </div>
    <div class="forecast-data-3">
     <img src="" class="forecast-icon-3" />
     <p class="forecast-temperature-3"></p>
     <p class="forecast-temperature-min-max"><span class="forecast-min-temperature-3"></span>-<span class="forecast-max-temperature-3"></span></p>
     <br class="clear" />
     <p class="forecast-description-3 tleft"></p>
    </div>
    <br class="clear" />
   </div>
  </div>
      </div>
 
 <script>
  $('.weather-temperature').openWeather({
 key: '637b7686bf4ee49316a9ca5bb79e8bb6',
 type: 'today',
 units: 'metric',
 lang: 'ro',
 city: 'Brasov,RO',
 targets : {
  icon: '.weather-icon',
  temperature: '.weather-temperature',
  minTemperature: '.weather-min-temperature',
  maxTemperature: '.weather-max-temperature',
  description: '.weather-description',
  windSpeed: '.weather-wind-speed',
  windDirection: '.weather-wind-dir',
  windDirectionDegrees: '.weather-wind-dir-arrow',
  humidity: '.weather-humidity',
  weekday : '.weather--day',
  date: '.weather-date',
  sunrise: '.weather-sunrise',
  sunset: '.weather-sunset',
  place: '.weather-place',
 },
 success: function() {
  $('.weather-wrapper').removeClass('hide').show();
 }
});
$('.forecast_3').openWeather({
key: '637b7686bf4ee49316a9ca5bb79e8bb6',
 type: 'forecast',
 units: 'metric',
 lang: 'ro',
 city: 'Brasov,RO',
 targets : {
  icon: '.forecast-icon',
  temperature: '.forecast-temperature',
  minTemperature: '.forecast-min-temperature',
  maxTemperature: '.forecast-max-temperature',
  description: '.forecast-description',
  windSpeed: '.forecast-wind-speed',
  windDirection: '.forecast-wind-dir',
  windDirectionDegrees: '.forecast-wind-dir-arrow',
  humidity: '.forecast-humidity',
  weekday : '.forecast--day',
  date: '.forecast-date',
  sunrise: '.forecast-sunrise',
  sunset: '.forecast-sunset',
  place: '.forecast-place',
 },
 success: function() {
  $('.forecast').removeClass('hide').show();
 }
});
 </script>