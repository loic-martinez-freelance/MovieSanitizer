import { Settings, RefreshCw, Film, FolderOpen } from 'lucide-react'
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
import { Checkbox } from '@/components/ui/checkbox'
import { useState } from 'react'

interface TopBarProps {
  onRefresh?: () => void
}

export const TopBar = ({ onRefresh }: TopBarProps) => {
  const [settingsOpen, setSettingsOpen] = useState(false)

  return (
    <div className="flex items-center justify-between px-6 py-3 bg-card border-b border-border">
      <div className="flex items-center gap-2">
        <Film className="w-5 h-5" />
        <h1 className="text-lg font-semibold">Movie Manager</h1>
      </div>
      <div className="flex gap-2">
        <Button variant="ghost" size="sm" onClick={onRefresh}>
          <RefreshCw className="w-4 h-4 mr-2" />
          Actualiser
        </Button>
        <Dialog open={settingsOpen} onOpenChange={setSettingsOpen}>
          <DialogTrigger asChild>
            <Button variant="ghost" size="sm">
              <Settings className="w-4 h-4 mr-2" />
              Paramètres
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto bg-card border-border">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <Settings className="w-5 h-5" />
                Paramètres
              </DialogTitle>
            </DialogHeader>

            <div className="space-y-6">
              <Card className="bg-card border-border">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-base">
                    <FolderOpen className="w-4 h-4" />
                    Dossiers
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="movie-folder">
                      Dossier principal des films
                    </Label>
                    <div className="flex gap-2">
                      <Input
                        id="movie-folder"
                        defaultValue="/Users/john/Movies"
                        className="bg-background border-input"
                      />
                      <Button variant="outline" size="sm">
                        <FolderOpen className="w-4 h-4 mr-2" />
                        Parcourir
                      </Button>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Dossier contenant votre collection de films
                    </p>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Checkbox id="subfolders" defaultChecked />
                    <Label htmlFor="subfolders">
                      Inclure les sous-dossiers
                    </Label>
                  </div>
                </CardContent>
              </Card>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setSettingsOpen(false)}>
                Annuler
              </Button>
              <Button onClick={() => setSettingsOpen(false)}>
                Enregistrer
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  )
}
