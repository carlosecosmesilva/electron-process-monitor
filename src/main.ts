import { app, BrowserWindow, ipcMain } from 'electron';
import { exec } from 'child_process';
import path from 'path';

let mainWindow: BrowserWindow | null = null;

app.whenReady().then(() => {
    mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js')
        }
    });
    mainWindow.loadFile('public/index.html');
});

ipcMain.handle('get-processes', async () => {
    return new Promise((resolve, reject) => {
        exec('tasklist', (error, stdout) => {
            if (error) return reject(error);
            resolve(stdout);
        });
    });
});

ipcMain.on('kill-process', (_event, pid) => {
    exec(`taskkill /PID ${pid} /F`, (error) => {
        if (error) console.error('Erro ao encerrar processo:', error);
    });
});
