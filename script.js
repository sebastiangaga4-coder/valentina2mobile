const sunetBomba = new Audio('door-bell.mp3'); 
const muzicaLift = new Audio('lift.mp3'); 
const maneaFinal = new Audio('te-iubesc.m4a'); 

const envelope = document.getElementById("envelope-container");
const letter = document.getElementById("letter-container");
const noBtn = document.querySelector(".no-btn");
const yesBtn = document.querySelector(".btn[alt='Yes']");
const letterWindow = document.querySelector(".letter-window");

let explozieDeclansata = false;

// --- 1. FUNCȚIE EFECT INIMI ---
function creeazaInimi() {
    for (let i = 0; i < 50; i++) {
        setTimeout(() => {
            const heart = document.createElement('div');
            heart.className = 'falling-heart';
            heart.innerHTML = '❤️';
            heart.style.left = Math.random() * 100 + 'vw';
            heart.style.animationDuration = (Math.random() * 3 + 2) + 's';
            heart.style.opacity = Math.random();
            heart.style.fontSize = (Math.random() * 20 + 20) + 'px';
            document.body.appendChild(heart);
            
            setTimeout(() => heart.remove(), 5000);
        }, i * 100);
    }
}

// --- 2. LOGICĂ EXPLOZIE (TIMING SECUNDA 9) ---
sunetBomba.addEventListener("timeupdate", () => {
    if (sunetBomba.currentTime >= 9 && !explozieDeclansata && maneaFinal.paused) {
        explozieDeclansata = true;
        declanseazaDezastrul();
    }
});

function declanseazaDezastrul() {
    document.body.classList.add("shake-effect");

    setTimeout(() => {
        const flash = document.createElement('div');
        flash.className = "explosion-flash";
        document.body.appendChild(flash);

        const crack = document.createElement('div');
        crack.className = "cracked-screen";
        document.body.appendChild(crack);

        muzicaLift.pause();

        const gameOver = document.createElement('div');
        gameOver.id = "game-over-layer";
        gameOver.style = "background:black; color:red; height:100vh; width:100vw; position:fixed; top:0; left:0; display:flex; flex-direction:column; justify-content:center; align-items:center; font-family: 'Courier New', monospace; text-align:center; z-index:10000;";
        gameOver.innerHTML = `
            <h1 style="font-size: 3rem; margin-bottom: 10px;">💥 BOOM! 💥</h1>
            <p style="font-size: 1.5rem;"><br>Ai stat prea mult pe gânduri.</p>
            <button id="retry-btn" style="margin-top:20px; padding:15px 30px; background:red; color:white; border:none; cursor:pointer; font-weight:bold; font-size:1.2rem; border-radius:5px;">M-am răzgândit</button>
        `;
        document.body.appendChild(gameOver);

        setTimeout(() => flash.remove(), 500);
        document.body.classList.remove("shake-effect");

        document.getElementById("retry-btn").addEventListener("click", () => {
            gameOver.remove();
            crack.remove();
            explozieDeclansata = false;
            sunetBomba.currentTime = 0;
            sunetBomba.play();
            muzicaLift.play();
        });
    }, 500); 
}

// --- 3. LOGICĂ DESCHIDERE PLIC ---
envelope.addEventListener("click", () => {
    sunetBomba.play();
    setTimeout(() => {
        if (maneaFinal.paused && !explozieDeclansata) {
            muzicaLift.loop = true;
            muzicaLift.play();
        }
    }, 2000); 
    envelope.style.display = "none";
    letter.style.display = "flex";
    setTimeout(() => { letterWindow.classList.add("open"); }, 50);
});

// --- 4. FUGA BUTONULUI NU ---
noBtn.addEventListener("mouseover", () => {
    const moveX = Math.random() * 400 - 200;
    const moveY = Math.random() * 400 - 200;
    noBtn.style.transform = `translate(${moveX}px, ${moveY}px)`;
});

// --- 5. LOGICĂ SALVARE (BUTON DA) ---
yesBtn.addEventListener("click", () => {
    if (explozieDeclansata) return;

    creeazaInimi();
    sunetBomba.pause();
    explozieDeclansata = true; 
    muzicaLift.pause();
    
    // Pornim maneaua și animația de pulsare
    maneaFinal.play();
    letterWindow.classList.add("final");
    letterWindow.classList.add("pulse-animation");
    
    document.getElementById("letter-title").textContent = "Te iubeeesc! ❤️";
    document.getElementById("letter-cat").src = "cat_dance.gif"; 
    document.getElementById("letter-buttons").style.display = "none";
    document.getElementById("final-text").style.display = "block";
});

// --- 6. OPRIRE ANIMATIE CÂND SE TERMINĂ MUZICA ---
maneaFinal.addEventListener("ended", () => {
    letterWindow.classList.remove("pulse-animation");
});