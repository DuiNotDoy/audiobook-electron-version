import { app, shell, BrowserWindow, ipcMain, protocol } from 'electron'
import { electronApp, optimizer, is } from '@electron-toolkit/utils'
import icon from '../../resources/icon.png?asset'
import { createMainPathIfNotExists } from './utils/createPath'
import { saveAudio, saveThumbnail } from './utils/mediaSave'
import { updateStory } from './utils/updateStory'
import { jsonifiedData } from './utils/jsonify'
import { join } from 'path'
import { randomUUID } from 'crypto'
import type { Story } from '../types/story'
import { dropStories } from './utils/dropStories'

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
            webSecurity: false
        }
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
        mainWindow.webContents.openDevTools()
    } else {
        mainWindow.loadFile(join(__dirname, '../renderer/index.html'))
    }
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {

    protocol.registerFileProtocol('file', (request, callback) => {
        const pathname = decodeURI(request.url.replace('file:///', ''));
        callback(pathname);
    });

    // Set app user model id for windows
    electronApp.setAppUserModelId('com.electron')

    // Default open or close DevTools by F12 in development
    // and ignore CommandOrControl + R in production.
    // see https://github.com/alex8088/electron-toolkit/tree/master/packages/utils
    app.on('browser-window-created', (_, window) => {
        optimizer.watchWindowShortcuts(window)
    })

    //create folder for saving data
    createMainPathIfNotExists()

    createWindow()

    app.on('activate', function() {
        // On macOS it's common to re-create a window in the app when the
        // dock icon is clicked and there are no other windows open.
        if (BrowserWindow.getAllWindows().length === 0) createWindow()
    })
})

ipcMain.on('data:request', (e, values) => {
    console.log({ e })

    switch (values.type) {
        case 'all':
            const stories = jsonifiedData().stories
            e.reply('request:response:all', { success: true, data: stories })
            break;
        case 'single':
            const story = {}
            e.reply('request:response:single', { success: true, data: story })
            break;
        default:
            e.reply('request:response', { success: false, data: null, type: 'error' })
            break;
    }
})

ipcMain.on('data:post', (e, values) => {
    console.log({ e })

    const mainData = jsonifiedData()
    console.log(values.data)

    switch (values.type) {
        case 'insert':
            const storyDuplicate = mainData.stories.find(story => story.title === values.data.title)

            // If storyDuplicate has a value, notify the frontend that the story already exists, else continue
            if (storyDuplicate) {
                e.reply('post:response', { success: false, data: mainData.stories })
                return
            }

            const audioPath = saveAudio(values.data.audioPath, values.data.title)
            const thumbnailPath = saveThumbnail(values.data.thumbnailPath, values.data.title)
            const newStory: Story = {
                id: randomUUID(),
                title: values.data.title,
                author: values.data.author,
                story: values.data.story,
                audioPath: audioPath,
                thumbnailPath: thumbnailPath,
                specialWords: values.data.specialWords
            }

            const updatedStories = updateStory(newStory, mainData.stories)

            // send updated data to frontend
            e.reply('post:response', { success: true, data: updatedStories })
            break
        case 'update':
            // code for updating data here...
            break
        case 'delete':
            // code for deleting data here...
            break
        case 'drop':
            dropStories()
            e.reply('post:response', { success: true, data: [] })
            break
        default:
            break
    }
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
    }
})

// In this file you can include the rest of your app"s specific main process
// code. You can also put them in separate files and require them here.


