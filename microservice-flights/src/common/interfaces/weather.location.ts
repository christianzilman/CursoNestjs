export interface IWeather {
    id:                     number;
    weather_state_name:     WeatherStateName;
    weather_state_abbr:     WeatherStateAbbr;
    wind_direction_compass: WindDirectionCompass;
    created:                Date;
    applicable_date:        Date;
    min_temp:               number;
    max_temp:               number;
    the_temp:               number;
    wind_speed:             number;
    wind_direction:         number;
    air_pressure:           number;
    humidity:               number;
    visibility:             number | null;
    predictability:         number;
}

export enum WeatherStateAbbr {
    C = "c",
    Hr = "hr",
    Lr = "lr",
    S = "s",
}

export enum WeatherStateName {
    Clear = "Clear",
    HeavyRain = "Heavy Rain",
    LightRain = "Light Rain",
    Showers = "Showers",
}

export enum WindDirectionCompass {
    Sw = "SW",
    W = "W",
    Wsw = "WSW",
}