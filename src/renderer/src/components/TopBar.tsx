import { RefreshCw, Film } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useState } from 'react'
import { SettingsDialog } from './SettingsDialog'
import { useTranslation } from '@/hooks/useTranslation'

interface TopBarProps {
  onRefresh?: () => void
}

export const TopBar = ({ onRefresh }: TopBarProps) => {
  const { t } = useTranslation()
  const [settingsOpen, setSettingsOpen] = useState(false)

  return (
    <div className="flex items-center justify-between px-6 py-3 bg-card border-b border-border">
      <div className="flex items-center gap-2">
        <Film className="w-5 h-5" />
        <h1 className="text-lg font-semibold">{t('app.title')}</h1>
      </div>
      <div className="flex gap-2">
        <Button variant="ghost" size="sm" onClick={onRefresh}>
          <RefreshCw className="w-4 h-4 mr-2" />
          {t('topBar.refresh')}
        </Button>
        <SettingsDialog open={settingsOpen} onOpenChange={setSettingsOpen} />
      </div>
    </div>
  )
}
