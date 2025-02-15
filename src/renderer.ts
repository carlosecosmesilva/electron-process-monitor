interface Window {
    electronAPI: {
        getProcesses: () => Promise<string>;
        killProcess: (pid: number) => void;
    };
}

async function loadProcesses() {
    const processList = document.getElementById('processList');
    if (!processList) {
        console.error('processList element not found');
        return;
    }
    processList.innerHTML = '<li>Carregando...</li>';

    try {
        const processes = await window.electronAPI.getProcesses();
        processList.innerHTML = processes.split('\n').map(proc => {
            const parts = proc.trim().split(/\s+/);
            const pid = parts[1];
            return `<li>${proc} <button onclick="killProcess(${pid})">Encerrar</button></li>`;
        }).join('');
    } catch (error) {
        processList.innerHTML = `<li>Erro ao carregar processos</li>`;
    }
}

function killProcess(pid: number) {
    window.electronAPI.killProcess(pid);
    alert(`Processo ${pid} encerrado!`);
    loadProcesses();
}
