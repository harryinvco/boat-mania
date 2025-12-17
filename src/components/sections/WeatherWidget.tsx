'use client'

import { useState, useEffect } from 'react'
import { Sun, Cloud, Wind, Droplets, Waves, Thermometer, TrendingUp, Clock } from 'lucide-react'
import { cn } from '@/lib/utils/cn'
import type { Locale } from '@/types'
import type { Dictionary } from '@/lib/i18n/getDictionary'

interface WeatherWidgetProps {
  locale: Locale
  dictionary: Dictionary
}

const mockWeatherData = {
  current: {
    temperature: 26,
    humidity: 65,
    windSpeed: 12,
    windDirection: 'SW',
    conditions: 'sunny',
  },
  marine: {
    waveHeight: 0.4,
    waterTemperature: 24,
  },
  forecast: [
    { day: 'Mon', temp: 27, icon: 'sunny' },
    { day: 'Tue', temp: 28, icon: 'sunny' },
    { day: 'Wed', temp: 26, icon: 'cloudy' },
    { day: 'Thu', temp: 25, icon: 'cloudy' },
    { day: 'Fri', temp: 27, icon: 'sunny' },
  ],
}

export default function WeatherWidget({ locale, dictionary }: WeatherWidgetProps) {
  const [isLoaded, setIsLoaded] = useState(false)
  const weather = mockWeatherData

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  const isGoodWeather = weather.current.windSpeed < 15 && weather.marine.waveHeight < 0.5

  return (
    <section className="py-24 bg-gradient-to-b from-white to-slate-50">
      <div className="container-custom">
        <div className="max-w-5xl mx-auto">
          {/* Main card */}
          <div className="relative rounded-[2rem] bg-white shadow-xl shadow-slate-200/50 overflow-hidden">
            {/* Top gradient accent */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-turquoise-400 via-ocean-500 to-turquoise-400" />

            <div className="p-8 md:p-12">
              {/* Header */}
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-10">
                <div>
                  <div className="flex items-center gap-2 text-slate-400 text-sm mb-2">
                    <Clock className="w-4 h-4" />
                    {locale === 'el' ? 'Ζωντανές Συνθήκες' : 'Live Conditions'}
                  </div>
                  <h2 className="text-3xl md:text-4xl font-bold text-slate-900">
                    {dictionary.weather.title}
                  </h2>
                </div>

                {/* Location badge */}
                <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-slate-100 text-slate-600">
                  <div className="w-2 h-2 rounded-full bg-turquoise-500 animate-pulse" />
                  <span className="font-medium">Larnaca, Cyprus</span>
                </div>
              </div>

              <div className="grid lg:grid-cols-3 gap-8">
                {/* Current temperature - Large display */}
                <div className="lg:col-span-1">
                  <div className="flex items-center gap-4">
                    <div className={cn(
                      'w-24 h-24 rounded-3xl flex items-center justify-center',
                      'bg-gradient-to-br from-sand-300 to-sand-500'
                    )}>
                      <Sun className="w-12 h-12 text-white" />
                    </div>
                    <div>
                      <p className="text-6xl font-bold text-slate-900">
                        {weather.current.temperature}°
                      </p>
                      <p className="text-slate-500">
                        {locale === 'el' ? 'Ηλιόλουστο' : 'Sunny'}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Conditions grid */}
                <div className="lg:col-span-2 grid grid-cols-2 md:grid-cols-4 gap-4">
                  {[
                    { icon: Wind, label: dictionary.weather.wind, value: `${weather.current.windSpeed} km/h`, color: 'from-ocean-400 to-ocean-600' },
                    { icon: Droplets, label: dictionary.weather.humidity, value: `${weather.current.humidity}%`, color: 'from-blue-400 to-blue-600' },
                    { icon: Waves, label: dictionary.weather.waveHeight, value: `${weather.marine.waveHeight}m`, color: 'from-turquoise-400 to-turquoise-600' },
                    { icon: Thermometer, label: dictionary.weather.waterTemp, value: `${weather.marine.waterTemperature}°`, color: 'from-cyan-400 to-cyan-600' },
                  ].map((item, i) => (
                    <div
                      key={i}
                      className="p-4 rounded-2xl bg-slate-50 hover:bg-slate-100 transition-colors"
                    >
                      <div className={cn(
                        'w-10 h-10 rounded-xl flex items-center justify-center mb-3',
                        'bg-gradient-to-br',
                        item.color
                      )}>
                        <item.icon className="w-5 h-5 text-white" />
                      </div>
                      <p className="text-sm text-slate-500">{item.label}</p>
                      <p className="text-lg font-bold text-slate-900">{item.value}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Recommendation banner */}
              <div className={cn(
                'mt-10 p-6 rounded-2xl flex items-center gap-4',
                isGoodWeather
                  ? 'bg-gradient-to-r from-turquoise-50 to-ocean-50'
                  : 'bg-gradient-to-r from-sand-50 to-coral-50'
              )}>
                <div className={cn(
                  'w-14 h-14 rounded-2xl flex items-center justify-center',
                  isGoodWeather
                    ? 'bg-turquoise-500'
                    : 'bg-sand-500'
                )}>
                  <TrendingUp className="w-7 h-7 text-white" />
                </div>
                <div className="flex-1">
                  <p className="font-bold text-slate-900 text-lg">
                    {dictionary.weather.bestTimeToBook}
                  </p>
                  <p className={cn(
                    'font-medium',
                    isGoodWeather ? 'text-turquoise-600' : 'text-sand-600'
                  )}>
                    {isGoodWeather
                      ? dictionary.weather.idealConditions
                      : dictionary.weather.fairConditions}
                  </p>
                </div>
              </div>

              {/* 5-day forecast */}
              <div className="mt-10 pt-8 border-t border-slate-100">
                <h3 className="text-sm font-medium text-slate-400 mb-6">
                  {locale === 'el' ? '5-ΗΜΕΡΗ ΠΡΟΓΝΩΣΗ' : '5-DAY FORECAST'}
                </h3>
                <div className="grid grid-cols-5 gap-3">
                  {weather.forecast.map((day, index) => (
                    <div
                      key={index}
                      className={cn(
                        'text-center p-4 rounded-2xl transition-colors',
                        index === 0 ? 'bg-turquoise-50' : 'hover:bg-slate-50'
                      )}
                    >
                      <p className="text-sm font-medium text-slate-500 mb-3">{day.day}</p>
                      {day.icon === 'sunny' ? (
                        <Sun className="w-8 h-8 mx-auto text-sand-500 mb-3" />
                      ) : (
                        <Cloud className="w-8 h-8 mx-auto text-slate-400 mb-3" />
                      )}
                      <p className="text-xl font-bold text-slate-900">{day.temp}°</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
