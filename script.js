document.addEventListener("DOMContentLoaded", () => {
    const minuteDisplay = document.getElementById("minute");
    const secondDisplay = document.getElementById("second");
    const startButton = document.querySelector(".start");
    const buttons = document.querySelectorAll(".rem");
    const settingsButton = document.querySelector(".bir1");
    const settingsPanel = document.querySelector(".setting");
    const escButton = document.getElementById("esc");
    const okButton = document.getElementById("ok");
    const body = document.body;
    const colorInputs = document.querySelectorAll("input[name='color']");

    let time = 25 * 60;
    let timer;
    let isRunning = false;
    let currentColor = "#d94d4d";
    const startSound = new Audio("start.mp3");
    const endSound = new Audio("end.mp3");

    function updateDisplay() {
        let minutes = Math.floor(time / 60);
        let seconds = time % 60;
        minuteDisplay.textContent = minutes.toString().padStart(2, "0");
        secondDisplay.textContent = seconds.toString().padStart(2, "0");
    }

    function startTimer() {
        if (!isRunning) {
            isRunning = true;
            startButton.textContent = "STOP";
            startSound.play();

            timer = setInterval(() => {
                if (time > 0) {
                    time--;
                    updateDisplay();
                } else {
                    clearInterval(timer);
                    isRunning = false;
                    startButton.textContent = "START";
                    endSound.play(); 
                }
            }, 1000);
        } else {
            clearInterval(timer);
            isRunning = false;
            startButton.textContent = "START";
        }
    }



    function changeMode(mode) {
        clearInterval(timer);
        isRunning = false;
        startButton.textContent = "START";

        if (mode === "pomodoro") {
            time = 25 * 60;
            currentColor = "#ee0404";
        } else if (mode === "short") {
            time = 5 * 60;
            currentColor = "#8270a6";
        } else if (mode === "long") {
            time = 15 * 60;
            currentColor = "#706e6e";
        }




        body.style.transition = "background-color 1s ease";
        body.style.backgroundColor = currentColor;
        updateDisplay();
    }

    function applySettings() {
        let pomodoroTime = document.getElementById("pomodoro").value;
        let shortBreak = document.getElementById("short").value;
        let longBreak = document.getElementById("long").value;

        if (pomodoroTime) time = pomodoroTime * 60;
        if (shortBreak && buttons[1].classList.contains("active")) time = shortBreak * 60;
        if (longBreak && buttons[2].classList.contains("active")) time = longBreak * 60;

        colorInputs.forEach(input => {
            if (input.checked) {
                currentColor = input.getAttribute("data-color") === "red" ? "#d94d4d" :
                               input.getAttribute("data-color") === "blue" ? "#4d79d9" :
                               "#4dd98b";
            }
        });

        body.style.transition = "background-color 1s ease";
        body.style.backgroundColor = currentColor;
        updateDisplay();
        settingsPanel.classList.add("hidden");
    }

    startButton.addEventListener("click", startTimer);

    buttons.forEach((btn) => {
        btn.addEventListener("click", (e) => {
            if (e.target.id === "red") {
                changeMode("pomodoro");
            } else if (e.target.id === "blue") {
                changeMode("short");
            } else if (e.target.id === "green") {
                changeMode("long");
            }
        });
    });


    settingsButton.addEventListener("click", () => {
        settingsPanel.classList.toggle("hidden");
        startButton.classList.toggle('hidden');
    });
    

    escButton.addEventListener("click", () => {
        settingsPanel.classList.add("hidden");
        startButton.classList.remove('hidden');
    });

    okButton.addEventListener("click", () => {
        applySettings();
        startButton.classList.remove("hidden");
    });


    updateDisplay();
});