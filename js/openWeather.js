;(function($) {
	$.fn.openWeather  = function(options) {
		if(!this.length) {
			return this;
		}
		// define default parameters
		var defaults = {
			type: 'today', // today or forecast
			units: 'metric', // metric or imperial
			lang: 'ro',
			customIcons: null,
			city: null,
			lat: null,
			lng: null,
			key: '',
			targets : {
				weekday: null,
				date : null,
				place: null,
				icon: null,
				temperature: null,
				minTemperature: null,
				maxTemperature: null,
				description: null,
				windSpeed: null,
				windDirection : null,
				windDirectionDegrees : null,
				humidity: null,
				sunrise: null,
				sunset: null
			},
			success: function() {},
			error: function(message) {}
		};

		// define settings namespace
		var settings = $.extend({}, defaults, options);
		// define element
		var element = $(this);
		var call = 'weather';

		var count = '';
		switch(settings.type) {
			case 'forecast':
				call = 'forecast';
				count = '&cnt=3';
				break;
			case 'today':
				call = 'weather';
				break;
		};
		if (settings.units != 'metric' && settings.units != 'imperial') {
			settings.units = 'metric';
		}
		// api URL
		var apiURL = 'https://api.openweathermap.org/data/2.5/' + call + '?APPID=' + settings.key + count;

		// if city isn't null
		if (settings.city != null) {
			// define API url using city (and remove any spaces in city)
			apiURL += '&q=' + settings.city;
		}
		else if (settings.lat != null && settings.lng != null) {
			// define API url using lat and lng
			apiURL += '&lat=' + settings.lat;
			apiURL += '&lng=' + settings.lng;
		}

		var getDayOfWeek = function(day) {
			var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
			return days[day];
		};

		var getMonth = function(month) {
			var months = [
				'January', 'February', 'March', 'April', 'May', 'June',
				'July', 'August', 'September', 'October', 'November', 'December'
			];
			return months[month];
		};

		var getTemperature = function(temperature) {
			if (settings.units == 'imperial') {
				return Math.round(((temperature - 273.15) * 1.8) + 32) + '°F';
			}
			else {
				return Math.round(temperature - 273.15) + '°C';
			}
		};

		var getIcon = function(icon) {
			var url = false;
			if (icon != null) {
				// if customIcons isn't null
				if (settings.customIcons != null) {
					var iconName = '';
					var timeOfDay = icon.indexOf('d') != -1 ? 'day' : 'night'; // name contains the letter 'd' = day, otherwise night
					switch(icon.slice(0, -1)) {
						case '01': // clear
							iconName = 'clear';
							break;
						case '02': // few clouds
							iconName = 'clouds';
							break;
						case '03': // scattered clouds
							iconName = 'clouds';
							break;
						case '04': // borken clouds
							iconName = 'clouds';
							break;
						case '09': // shower rain
							iconName = 'rain';
							break;
						case '10': // rain
							iconName = 'rain';
							break;
						case '11': // thunderstorm
							iconName = 'storm';
							break;
						case '13': // snow
							iconName = 'snow';
							break;
						case '50': // mist
							iconName = 'mist';
							break;
					}
					// define custom icon URL
					url = settings.customIcons + timeOfDay + '/' + iconName + '.png';
				}
				else {
					// define icon URL using default icon
					url = 'http://openweathermap.org/img/w/' + icon + '.png';
				}
			}
			return url;
		};

		// time function
		var getTime = function(unixTimestamp) {
			var time = '';
			var currentTime = new Date((unixTimestamp * 1000));
			if (window.hasOwnProperty('Intl') && typeof Intl === 'object' &&
					Intl.DateTimeFormat.supportedLocalesOf([settings.lang])) {
				var time_options = {
					hour : '2-digit',
					minute : '2-digit'
				};
				var formatter = new Intl.DateTimeFormat(settings.lang, time_options);
				time = formatter.format(currentTime);
			}
			else {
				var currentHours = currentTime.getHours();
				currentHours = (currentHours < 10 ? '0' : '') + currentHours;
				// Choose either 'AM' or 'PM' as appropriate
				// var timeOfDay = (currentHours < 12) ? 'AM' : 'PM';
				// Convert the hours component to 12-hour format if needed
				// currentHours = (currentHours > 12) ? currentHours - 12 : currentHours;
				// Convert an hours component of '0' to '12'
				// currentHours = (currentHours == 0) ? 12 : currentHours;
				var currentMinutes = currentTime.getMinutes();
				currentMinutes = (currentMinutes < 10 ? '0' : '') + currentMinutes;
				time = currentHours + ':' + currentMinutes;
			}
			return time;
		};

		var getDay = function(unixTimestamp) {
			var day = {
				weekday : '',
				date : '',
			};
			var currentTime = new Date((unixTimestamp * 1000));
			if (window.hasOwnProperty('Intl') && typeof Intl === 'object' &&
					Intl.DateTimeFormat.supportedLocalesOf([settings.lang])) {
				var weekday_options = {
					weekday: 'long'
				};
				var date_options = {
					day : '2-digit',
					month : 'short'
				};
				var formatter = new Intl.DateTimeFormat(settings.lang, weekday_options);
				day.weekday = formatter.format(currentTime);
				var formatter = new Intl.DateTimeFormat(settings.lang, date_options);
				day.date = formatter.format(currentTime);
			}
			else {
				day.weekday = getDayOfWeek(currentTime.getDay());
				var currentDay = currentTime.getDate();
				// Pad the day with leading zeros, if required
				currentDay = (currentDay < 10 ? '0' : '') + currentDay;
				var currentMonth = getMonth(currentTime.getMonth());
				day.date = currentDay + ' ' + currentMonth;
			}
			return day;
		};

		var getWindSpeed = function(speed) {
			var multiplier = 3.6; // (speed [m/s] / 1000 [m/km]) * 3600 [s/h]
			var units = 'km/h';
			if (settings.units == 'imperial') {
				multiplier = 2.23693629; // (speed [m/s] / 1609.334 [m/m]) * 3600 [s/h]
				units = 'mph';
			}
			return (speed * multiplier).toFixed(2) + units;
		};

		var getWindDirection = function(degrees) {
			var direction = '';
			if ((degrees >= 0 && degrees <= 11.25) || (degrees > 348.75 && degrees <= 360)) {
				direction = 'N';
			}
			else if (degrees > 11.25 && degrees <= 33.75) {
				direction = 'NNE';
			}
			else if (degrees > 33.75 && degrees <= 56.25) {
				direction = 'NE';
			}
			else if (degrees > 56.25 && degrees <= 78.75) {
				direction = 'ENE';
			}
			else if (degrees > 78.75 && degrees <= 101.25) {
				direction = 'E';
			}
			else if (degrees > 101.25 && degrees <= 123.75) {
				direction = 'ESE';
			}
			else if (degrees > 123.75 && degrees <= 146.25) {
				direction = 'SE';
			}
			else if (degrees > 146.25 && degrees <= 168.75) {
				direction = 'SSE';
			}
			else if (degrees > 168.75 && degrees <= 191.25) {
				direction = 'S';
			}
			else if (degrees > 191.25 && degrees <= 213.75) {
				direction = 'SSW';
			}
			else if (degrees > 213.75 && degrees <= 236.25) {
				direction = 'SW';
			}
			else if (degrees > 236.25 && degrees <= 258.75) {
				direction = 'WSW';
			}
			else if (degrees > 258.75 && degrees <= 281.25) {
				direction = 'W';
			}
			else if (degrees > 281.25 && degrees <= 303.75) {
				direction = 'WNW';
			}
			else if (degrees > 303.75 && degrees <= 326.25) {
				direction = 'NW';
			}
			else if (degrees > 326.25 && degrees <= 348.75) {
				direction = 'NNW';
			}
			return direction;
		};

		var setWeather = function(weather, suffix) {
			suffix = (typeof suffix !== 'undefined' ? suffix : '');
			$.each(settings.targets, function(target, targetElement) {
				if (targetElement != null && $(targetElement + suffix).length > 0 && weather.hasOwnProperty(target)) {
					if ($.inArray(target, ['icon', 'windDirectionDegrees']) == -1) {
						$(targetElement + suffix).text(weather[target]);
					}
					else if (target == 'icon') {
						// set iconTarget src attribute as iconURL
						if (weather[target]) {
							$(targetElement + suffix).attr('src', weather[target]);
						}
						else {
							$(targetElement + suffix).hide();
						}
					}
					else if (target == 'windDirectionDegrees') {
						$(targetElement + suffix)
							.css('-webkit-transform', 'rotate(' + weather[target] + 'deg)')
							.css('-ms-transform', 'rotate(' + weather[target] + 'deg)')
							.css('-moz-transform', 'rotate(' + weather[target] + 'deg)')
							.css('transform', 'rotate(' + weather[target] + 'deg)')
					}
				}
			});
		};

		var processWeather = function(data) {
			// forecast
			if (data.hasOwnProperty('list')) {
				var place = data.city.name + ', ' + data.city.country;
				$.each(data.list, function(index, weather) {
					// process weather data
					var day = getDay(weather.dt);
					var hour = getTime(weather.dt);
					var weather = {
						weekday : day.weekday, // api time is in unix epoch
						date : day.date + ' ' + hour,
						place : place,
						icon : settings.targets.icon != null ? getIcon(weather.weather[0].icon) : false,
						temperature : getTemperature(weather.main.temp),
						minTemperature : getTemperature(weather.main.temp_min),
						maxTemperature : getTemperature(weather.main.temp_max),
						description : weather.weather[0].description,
						windSpeed : getWindSpeed(parseFloat(weather.wind.speed)),
						windDirection : getWindDirection(parseFloat(weather.wind.deg)),
						windDirectionDegrees : parseInt(weather.wind.deg),
						humidity : weather.main.humidity + '%'
					};
					setWeather(weather, '-' + (index + 1));
				});
			}
			// today
			else {
				// process weather data
				var weather = {
					place : data.name + ', ' + data.sys.country,
					icon : settings.targets.icon != null ? getIcon(data.weather[0].icon) : false,
					temperature : getTemperature(data.main.temp),
					minTemperature : getTemperature(data.main.temp_min),
					maxTemperature : getTemperature(data.main.temp_max),
					description : data.weather[0].description,
					windSpeed : getWindSpeed(parseFloat(data.wind.speed)),
					windDirection : getWindDirection(parseFloat(data.wind.deg)),
					windDirectionDegrees : parseInt(data.wind.deg),
					humidity : data.main.humidity + '%',
					sunrise : getTime(data.sys.sunrise),
					sunset : getTime(data.sys.sunset)
				};
				setWeather(weather);
			}
		};

		if (element.data().hasOwnProperty(settings.type)) {
			processWeather(element.data(settings.type));
			settings.success.call(this);
		}
		else {
			$.ajax({
				type: 'GET',
				url: apiURL,
				dataType: 'jsonp',
				success: function(data) {
					if (data.hasOwnProperty('cod') && data.cod == '200') {
						element.data(settings.type, data);
						processWeather(data);
						settings.success.call(this);
					}
					else {
						settings.error.call(this, data.message);
					}
				},
				error: function(jqXHR, textStatus, errorThrown) {
					settings.error.call(this, textStatus);
				}
			});
		}
	}
})(jQuery);
