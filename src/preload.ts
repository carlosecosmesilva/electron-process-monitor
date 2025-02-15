import { contextBridge, ipcRenderer } from 'electron';

contextBridge.exposeInMainWorld('electronAPI', {
    getProcesses: () => ipcRenderer.invoke('get-processes'),
    killProcess: (pid: number) => ipcRenderer.send('kill-process', pid)
});
