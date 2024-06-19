// Array para armazenar as vagas de estacionamento
let parkingSpots = [];

// Função para inicializar o sistema de estacionamento
function initializeParking(numSpots) {
  for (let i = 1; i <= numSpots; i++) {
    parkingSpots.push({
      id: i,
      occupied:  false,
      carNumber: '',
      startTime: null
    }); 
  }
  updateParkingLotUI();
}

// Função para atualizar a exibição das vagas de estacionamento
function updateParkingLotUI() {
  const parkingLot = document.getElementById('parking-lot');
  parkingLot.innerHTML = '';
  parkingSpots.forEach(spot => {
    const li = document.createElement('li');
    li.className = 'list-group-item';
    li.textContent = `Vaga ${spot.id} - ${spot.occupied ? 'Ocupada' : 'Livre'}`;
    parkingLot.appendChild(li);
  });
}

// Função para adicionar uma vaga de estacionamento                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 
document.getElementById('add-spot').addEventListener('click', function(event) {
  const newSpotId = parkingSpots.length + 1;
  parkingSpots.push({
    id: newSpotId,
    occupied: false,
    carNumber: '',
    startTime: null
  });
  updateParkingLotUI();
});

// Função para remover uma vaga de estacionamento
document.getElementById('remove-spot').addEventListener('click', function(event) {
  const lastSpot = parkingSpots[parkingSpots.length - 1];
  if (!lastSpot.occupied) {
    parkingSpots.pop();
    updateParkingLotUI();
  } else {
    alert('Não é possível remover uma vaga ocupada.');
  }
});

// Função para registrar a entrada de um carro
document.getElementById('parking-form').addEventListener('submit', function(event) {
  event.preventDefault();
  const carNumber = document.getElementById('car-number').value.trim();
  const freeSpot = parkingSpots.find(spot => !spot.occupied);
  if (freeSpot) {
    freeSpot.occupied = true;
    freeSpot.carNumber = carNumber;
    freeSpot.startTime = new Date();
    updateParkingLotUI();
  } else {
    alert('Não há vagas livres disponíveis.');
  }
});

// Função para retirar um carro do estacionamento
document.getElementById('exit-parking').addEventListener('click', function(event) {
  const carNumber = document.getElementById('car-number').value.trim();
  const occupiedSpot = parkingSpots.find(spot => spot.occupied && spot.carNumber === carNumber);
  if (occupiedSpot) {
    const endTime = new Date();
    const elapsedTime = Math.ceil((endTime - occupiedSpot.startTime) / (1000 * 60 * 60)); // Horas arredondadas para cima
    const amountDue = elapsedTime * 2; // R$ 2,00 por hora
    alert(`Tempo de permanência: ${elapsedTime} horas\nValor devido: R$ ${amountDue.toFixed(2)}`);
    
    // Liberar Vaga 

    
