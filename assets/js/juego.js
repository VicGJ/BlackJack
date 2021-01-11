let deck = [];
const types = ['C', 'D', 'H', 'S'];
const specials = ['A','J','Q','K'];

let playerPoints = 0,
    machinePoints = 0;
// Referencias del HTML
const btnHit   = document.querySelector('#btnHit');
const btnStop = document.querySelector('#btnStop');
const btnNew   = document.querySelector('#btnNew');

const divPlayerCards = document.querySelector('#player-cards');
const divMachineCards = document.querySelector('#machine-cards');

const pointsHTML = document.querySelectorAll('small');

const createDeck = () => {
    for(let i = 2; i<=10; i++)
    {
        for( let type of types)
        {
            deck.push(i+type);
        }
    }

    for(let type of types) {
        for(let special of specials) {
            deck.push(special+type);
        }
    }
    deck = _.shuffle(deck);
    return deck;
}

const hit = () => {
    if(deck.length === 0) {
        throw 'No more cards';
    }
    const card = deck.pop();
    return card;
}

const cardValue = (card) => {
    const value = card.substring(0, card.length-1);
    return (isNaN(value)) ?
            (value === 'A') ? 11 : 10
            : value * 1;
    /*console.log(value);
    let points = 0;
    if(isNaN(value)) {
        points = (value === 'A') ? 11 : 10;
    }
    else {
        points = value * 1;
    }*/
}

const machineLogic = ( minimumPoints ) => {

    do {
        const card = hit();

        machinePoints = machinePoints + cardValue( card );
        pointsHTML[1].innerText = machinePoints;
        
        // <img class="carta" src="assets/cartas/2C.png">
        const imgCard = document.createElement('img');
        imgCard.src = `assets/cards/${ card }.png`; //3H, JD
        imgCard.classList.add('carta');
        divMachineCards.append( imgCard );

        if( minimumPoints > 21 ) {
            break;
        }

    } while(  (machinePoints < minimumPoints)  && (minimumPoints <= 21 ) );

    setTimeout(() => {
        if( machinePoints === minimumPoints ) {
            alert('Nobody Wins :(');
        } else if ( minimumPoints > 21 ) {
            alert('Casino wins')
        } else if( machinePoints > 21 ) {
            alert('Player Wins');
        } else {
            alert('Casino Wins')
        }
    }, 100 );
}

// Eventos
btnHit.addEventListener('click', () => {

    const card = hit();
    
    playerPoints = playerPoints + cardValue( card );
    pointsHTML[0].innerText = playerPoints;
    
    // <img class="carta" src="assets/cartas/2C.png">
    const imgCard = document.createElement('img');
    imgCard.src = `assets/cards/${ card }.png`; //3H, JD
    imgCard.classList.add('carta');
    divPlayerCards.append( imgCard );

    if ( playerPoints > 21 ) {
        console.warn('You lose');
        btnHit.disabled   = true;
        btnStop.disabled = true;
        machineLogic( playerPoints );

    } else if ( playerPoints === 21 ) {
        console.warn('BLACKJACK');
        btnHit.disabled   = true;
        btnStop.disabled = true;
        machineLogic( playerPoints );
    }

});


btnStop.addEventListener('click', () => {
    btnHit.disabled   = true;
    btnStop.disabled = true;

    machineLogic( playerPoints );
});

btnNew.addEventListener('click', () => {

    console.clear();
    deck = [];
    deck = createDeck();

    playerPoints     = 0;
    machinePoints = 0;
    
    pointsHTML[0].innerText = 0;
    pointsHTML[1].innerText = 0;

    divMachineCards.innerHTML = '';
    divPlayerCards.innerHTML = '';

    btnHit.disabled   = false;
    btnStop.disabled = false;

});