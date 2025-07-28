import { useTranslation as useI18nTranslation } from 'react-i18next'
import { useEffect } from 'react'
import { useIPC } from './useIPC'

export const useTranslation = () => {
  const { t, i18n } = useI18nTranslation()
  const { getConfiguration, changeLocale } = useIPC()

  const changeLanguage = async (language: string) => {
    i18n.changeLanguage(language)
    await changeLocale(language)
  }

  const currentLanguage = i18n.language

  // Initialize language from configuration on app start
  useEffect(() => {
    const initializeLanguage = async () => {
      try {
        const config = await getConfiguration()
        if (config.locale && config.locale !== i18n.language) {
          i18n.changeLanguage(config.locale)
        }
      } catch (err) {
        console.error('Failed to load configuration for language:', err)
      }
    }
    initializeLanguage()
  }, [getConfiguration, i18n])

  return {
    t,
    changeLanguage,
    currentLanguage,
    isReady: i18n.isInitialized,
  }
}
