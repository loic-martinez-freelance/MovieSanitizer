import { Settings, FolderOpen } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from '@/components/ui/dialog'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { useIPC } from '@/hooks/useIPC'
import { useTranslation } from '@/hooks/useTranslation'
import { useEffect, useState } from 'react'
import type { Configuration } from '@domain/ports/dtos/Configuration'

interface SettingsDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export const SettingsDialog = ({ open, onOpenChange }: SettingsDialogProps) => {
  const { t } = useTranslation()
  const ipc = useIPC()
  const [configuration, setConfiguration] = useState<Configuration | null>(null)
  const [libraryPath, setLibraryPath] = useState('')

  useEffect(() => {
    const loadConfiguration = async () => {
      const config = await ipc.getConfiguration()
      setConfiguration(config)
      setLibraryPath(config.libraryPath)
    }
    if (open) {
      loadConfiguration()
    }
  }, [open])

  const handleSave = async () => {
    if (configuration) {
      await ipc.saveConfiguration({ ...configuration, libraryPath })
      onOpenChange(false)
    }
  }

  const handleSelectFolder = async () => {
    const folder = await ipc.selectLibraryFolder()
    setLibraryPath(folder)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="sm">
          <Settings className="w-4 h-4 mr-2" />
          {t('settings.title')}
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto bg-card border-border">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Settings className="w-5 h-5" />
            {t('settings.title')}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base">
                <FolderOpen className="w-4 h-4" />
                {t('settings.folders')}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="movie-folder">
                  {t('settings.movieFolder')}
                </Label>
                <div className="flex gap-2">
                  <Input
                    id="movie-folder"
                    value={libraryPath}
                    onChange={(e) => setLibraryPath(e.target.value)}
                    className="bg-background border-input"
                  />
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleSelectFolder}
                  >
                    <FolderOpen className="w-4 h-4 mr-2" />
                    {t('settings.browse')}
                  </Button>
                </div>
                <p className="text-sm text-muted-foreground">
                  {t('settings.movieFolderDescription')}
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            {t('settings.cancel')}
          </Button>
          <Button onClick={handleSave}>{t('settings.save')}</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
