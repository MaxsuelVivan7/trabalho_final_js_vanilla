// Array para armazenar as vagas do estacionamento
let vagas = [];

// Função para inicializar o sistema com vagas
function inicializarVagas(numeroVagas) {
    vagas = [];
    for (let i = 1; i <= numeroVagas; i++) {
        vagas.push({
            id: i,
            ocupada: false,
            placa: null,
            horaEntrada: 
        });
    }
    atualizarEstadoVagas();
}   

// Função para atualizar visualmente o estado das vagas no HTML
function atualizarEstadoVagas() {
    const vagasContainer = document.getElementById('vagas-container');
    vagasContainer.innerHTML = '';
    vagas.forEach(vaga => { 
        const vagaDiv = document.createElement('div');
        vagaDiv.classList.add('vaga');
        if (vaga.ocupada) {
            vagaDiv.classList.add('ocupada');
            vagaDiv.textContent = `Vaga ${vaga.id} (Placa: ${vaga.placa})`;
        } else {
            vagaDiv.classList.add('livre');
            vagaDiv.textContent = `Vaga ${vaga.id} (Livre)`;
        }
        vagasContainer.appendChild(vagaDiv);
    });
}

// Função para adicionar uma nova vaga
function adicionarVaga() {
    const novaVagaId = vagas.length + 1;
    vagas.push({
        id: novaVagaId,
        ocupada: false,
        placa: null,
        horaEntrada: null
    });
    atualizarEstadoVagas();
}

// Função para remover uma vaga (apenas se estiver livre)
function removerVaga() {
    const vagaLivre = vagas.find(vaga => !vaga.ocupada);
    if (vagaLivre) {
        vagas = vagas.filter(vaga => vaga.id !== vagaLivre.id);
        atualizarEstadoVagas();
    } else {
        alert('Não é possível remover uma vaga ocupada.');
    }
}

// Função para registrar a entrada de um carro
function registrarEntrada() {
    const placa = document.getElementById('placa').value;
    const vagaLivre = vagas.find(vaga => !vaga.ocupada);
    if (vagaLivre) {
        vagaLivre.ocupada = true;
        vagaLivre.placa = placa;
        vagaLivre.horaEntrada = new Date();
        atualizarEstadoVagas();
        alert(`Carro com placa ${placa} estacionado na vaga ${vagaLivre.id}.`);
    } else {
        alert('Não há vagas disponíveis.');
    }
}

// Função para registrar a saída de um carro
function registrarSaida() {
    const placa = document.getElementById('placa').value;
    const vagaOcupada = vagas.find(vaga => vaga.ocupada && vaga.placa === placa);
    if (vagaOcupada) {
        const horaEntrada = vagaOcupada.horaEntrada;
        const horaSaida = new Date();
        const tempoEstacionado = Math.ceil((horaSaida - horaEntrada) / (1000 * 60 * 60)); // em horas
        const totalDevido = tempoEstacionado * 2; // R$ 2,00 por hora
        document.getElementById('tempo-permanencia').textContent = `Tempo de permanência: ${tempoEstacionado} horas`;
        document.getElementById('total-devido').textContent = `Total devido: R$ ${totalDevido},00`;
        
        vagaOcupada.ocupada = false;
        vagaOcupada.placa = null;
        vagaOcupada.horaEntrada = null;
        atualizarEstadoVagas();
    } else {
        alert(`Carro com placa ${placa} não encontrado no estacionamento.`);
    }
}

// Inicialização padrão com 5 vagas
inicializarVagas(5);
