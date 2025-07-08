import 'dotenv/config'
import { app, shell, BrowserWindow, screen } from 'electron'
import { join } from 'path'
import { electronApp, optimizer, is } from '@electron-toolkit/utils'
import icon from '../../resources/icon.png?asset'
import { IPCRouterAdapter } from '@adapters/in/ComAdapter/IPCRouterAdapter'
import { ElectronConfigurationAdapter } from '@adapters/out/configurationAdapter/ElectronConfigurationAdapter'
import { FSAdapter } from '@adapters/out/fileSystemAdapter/FSAdapter'
import { NFOAdapter } from '@adapters/out/metadataAdapter/NFOAdapter'
import { TMDBAdapter } from '@adapters/out/movieDBAdapter/TMDBAdapter'
import { GetMovieMetadataUseCase } from '@domain/useCases/movies/GetMovieMetadataUseCase'
import { InitializeNewLibraryUseCase } from '@domain/useCases/movies/InitializeNewLibraryUseCase'
import { ListMoviesByTitleOnDBUseCase } from '@domain/useCases/movies/ListMoviesByTitleOnDBUseCase'
import { ListNewMoviesUseCase } from '@domain/useCases/movies/ListNewMoviesUseCase'
import { FirstInitializationUseCase } from '@domain/useCases/settings/FirstInitializationUseCase'
import { GetConfigurationUseCase } from '@domain/useCases/settings/GetConfigurationUseCase'
import { SaveConfigurationUseCase } from '@domain/useCases/settings/SaveConfigurationUseCase'
import { SelectLibraryFolderUseCase } from '@domain/useCases/settings/SelectLibraryFolderUseCase'
import { GetMovieImageUseCase } from '@domain/useCases/movies/GetMovieImageUseCase'
import { CleanLocalMovieWithSelectedMovieUseCase } from '@domain/useCases/movies/CleanLocalMovieWithSelectedMovieUseCase'
import { HTTPAdapter } from '@adapters/out/httpAdapter/HTTPAdapter'

function initializeApp() {
  const configurationAdapter = new ElectronConfigurationAdapter()
  const fileSystemAdapter = new FSAdapter()
  const metadataAdapter = new NFOAdapter()
  const movieDBAdapter = new TMDBAdapter(process.env.DB_TOKEN ?? '')
  const httpAdapter = new HTTPAdapter()

  const getConfigurationUseCase = new GetConfigurationUseCase(
    configurationAdapter
  )
  const getMovieMetadataUseCase = new GetMovieMetadataUseCase(
    configurationAdapter,
    fileSystemAdapter,
    metadataAdapter
  )
  const getMovieImageUseCase = new GetMovieImageUseCase(
    configurationAdapter,
    fileSystemAdapter
  )
  const selectLibraryFolderUseCase = new SelectLibraryFolderUseCase()
  const listNewMoviesUseCase = new ListNewMoviesUseCase(
    fileSystemAdapter,
    configurationAdapter
  )
  const initializeNewLibraryUseCase = new InitializeNewLibraryUseCase(
    getMovieMetadataUseCase,
    listNewMoviesUseCase,
    configurationAdapter
  )
  const firstInitializationUseCase = new FirstInitializationUseCase(
    configurationAdapter,
    initializeNewLibraryUseCase
  )
  const saveConfigurationUseCase = new SaveConfigurationUseCase(
    configurationAdapter,
    initializeNewLibraryUseCase
  )
  const listMoviesByTitleOnDBUseCase = new ListMoviesByTitleOnDBUseCase(
    movieDBAdapter
  )
  const cleanLocalMovieWithSelectedMovieUseCase =
    new CleanLocalMovieWithSelectedMovieUseCase(
      movieDBAdapter,
      fileSystemAdapter,
      metadataAdapter,
      configurationAdapter,
      httpAdapter
    )

  firstInitializationUseCase.execute()

  const comAdapter = new IPCRouterAdapter()
  comAdapter.startPingRouter()
  comAdapter.startSaveConfiguration(saveConfigurationUseCase)
  comAdapter.startGetConfiguration(getConfigurationUseCase)
  comAdapter.startSelectLibraryFolder(selectLibraryFolderUseCase)
  comAdapter.startGetMovieMetadata(getMovieMetadataUseCase)
  comAdapter.startGetMovieImage(getMovieImageUseCase)
  comAdapter.startGetRelatedMoviesFromDB(listMoviesByTitleOnDBUseCase)
  comAdapter.startCleanLocalMovie(cleanLocalMovieWithSelectedMovieUseCase)
}

function createWindow(): void {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 900,
    height: 670,
    show: false,
    autoHideMenuBar: true,
    ...(process.platform === 'linux' ? { icon } : {}),
    webPreferences: {
      preload: join(__dirname, '../preload/index.js'),
      sandbox: false,
    },
  })

  mainWindow.on('ready-to-show', () => {
    mainWindow.show()
  })

  mainWindow.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url)
    return { action: 'deny' }
  })

  // HMR for renderer base on electron-vite cli.
  // Load the remote URL for development or the local html file for production.
  if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
    mainWindow.loadURL(process.env['ELECTRON_RENDERER_URL'])

    const displays = screen.getAllDisplays()
    const externalDisplay = displays.find(
      (display) => display.bounds.x !== 0 || display.bounds.y !== 0
    )
    if (externalDisplay) {
      mainWindow.setPosition(externalDisplay.bounds.x, externalDisplay.bounds.y)
      mainWindow.center()
    }
  } else {
    mainWindow.loadFile(join(__dirname, '../renderer/index.html'))
  }
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  // Set app user model id for windows
  electronApp.setAppUserModelId('com.electron')

  // Default open or close DevTools by F12 in development
  // and ignore CommandOrControl + R in production.
  // see https://github.com/alex8088/electron-toolkit/tree/master/packages/utils
  app.on('browser-window-created', (_, window) => {
    optimizer.watchWindowShortcuts(window)
  })

  initializeApp()
  createWindow()

  app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
