document.addEventListener("DOMContentLoaded", function() {
    const elements = document.getElementsByClassName("card-items");
    let firstCard = null;
    let secondCard = null;
    let lockBoard = false; 

    function handleClick(event) {
        const clickedCard = event.currentTarget;

        
        if (lockBoard || clickedCard === firstCard || clickedCard.classList.contains("flipped") || clickedCard.classList.contains("matched")) {
            return;
        }

       
        clickedCard.classList.add("flipped");

        if (!firstCard) {
            firstCard = clickedCard;
        } else if (!secondCard) {
            secondCard = clickedCard;
            checkForMatch();
        }
    }

    function checkForMatch() {
        if (firstCard.innerText === secondCard.innerText) {
            firstCard.classList.add("matched");
            secondCard.classList.add("matched");
            resetBoard();
        } else {
            lockBoard = true;
            setTimeout(() => {
                firstCard.classList.remove("flipped");
                secondCard.classList.remove("flipped");
                resetBoard();
            }, 1000);
        }
    }

    function resetBoard() {
        [firstCard, secondCard, lockBoard] = [null, null, false];
    }

    
    (function shuffle() {
        const cardsArray = Array.from(elements);
        cardsArray.forEach(card => {
            let randomPos = Math.floor(Math.random() * cardsArray.length);
            card.style.order = randomPos;
        });
    })();

    for (let i = 0; i < elements.length; i++) {
        elements[i].addEventListener("click", handleClick);
    }
});


