
/* ==========================================
   AFTER THE LAST ROUND
   PIXEL ART WEBSITE - SCRIPT.JS
========================================== */


/* SCREEN NAVIGATION */

const screens = document.querySelectorAll(".screen");

function ShowScreen(screenId) {

    screens.forEach(function(screen) {
        screen.classList.remove("active");
    });

    const selectedScreen = document.getElementById(screenId);

    if (!selectedScreen) return;

    selectedScreen.classList.add("active");

    if (screenId === "gameScreen") {
        DrawGamePreview();
    }

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

}


/* MENU BUTTONS */

document.querySelectorAll("[data-screen]").forEach(function(button) {

    button.addEventListener("click", function() {

        const destination = button.dataset.screen;

        ShowScreen(destination);

    });

});


/* KEYBOARD NAVIGATION */

document.addEventListener("keydown", function(event) {

    if (event.key === "Escape") {
        ShowScreen("mainMenu");
    }

});


/* GAME PREVIEW */

function DrawGamePreview() {

    const canvas = document.getElementById("gameCanvas");

    if (!canvas) return;

    const ctx = canvas.getContext("2d");

    const width = canvas.width;
    const height = canvas.height;


    // Background

    ctx.fillStyle = "#1A043C";
    ctx.fillRect(0, 0, width, height);


    // Night sky

    ctx.fillStyle = "#241044";
    ctx.fillRect(0, 0, width, 300);


    // Stars

    const stars = [
        [80, 60],
        [180, 110],
        [290, 45],
        [400, 90],
        [520, 55],
        [650, 115],
        [730, 45],
        [100, 180],
        [600, 200]
    ];

    ctx.fillStyle = "#E5D2FF";

    stars.forEach(function(star) {
        ctx.fillRect(star[0], star[1], 3, 3);
    });


    // Moon

    ctx.fillStyle = "#DCC5FF";
    ctx.fillRect(610, 45, 70, 70);

    ctx.fillStyle = "#B99ADF";
    ctx.fillRect(625, 60, 12, 12);
    ctx.fillRect(655, 85, 10, 10);


    // Distant mountains

    ctx.fillStyle = "#35105D";

    ctx.beginPath();

    ctx.moveTo(0, 280);
    ctx.lineTo(120, 190);
    ctx.lineTo(230, 280);
    ctx.lineTo(370, 175);
    ctx.lineTo(520, 280);
    ctx.lineTo(680, 200);
    ctx.lineTo(800, 280);

    ctx.closePath();
    ctx.fill();


    // Ground

    ctx.fillStyle = "#491078";
    ctx.fillRect(0, 300, width, 100);


    // Ground highlights

    ctx.fillStyle = "#6926A0";
    ctx.fillRect(0, 300, width, 8);


    // Pixel ground details

    ctx.fillStyle = "#B98AFF";

    for (let i = 0; i < 16; i++) {

        ctx.fillRect(
            i * 55,
            325 + (i % 3) * 12,
            5,
            5
        );

    }


    // Preview message

    ctx.fillStyle = "#F3E8FF";
    ctx.font = "bold 24px Georgia";
    ctx.textAlign = "center";

    ctx.fillText(
        "YOUR STORY BEGINS SOON...",
        width / 2,
        255
    );


    ctx.fillStyle = "#C9B4E8";
    ctx.font = "12px Georgia";

    ctx.fillText(
        "GAME CURRENTLY IN DEVELOPMENT",
        width / 2,
        375
    );

}


/* SETTINGS */

const masterVolume = document.getElementById("masterVolume");
const musicVolume = document.getElementById("musicVolume");
const sfxVolume = document.getElementById("sfxVolume");
const brightness = document.getElementById("brightness");
const muteAudio = document.getElementById("muteAudio");


/* UPDATE SETTINGS DISPLAY */

function UpdateSettingsDisplay() {

    document.getElementById("masterValue").textContent =
        masterVolume.value + "%";

    document.getElementById("musicValue").textContent =
        musicVolume.value + "%";

    document.getElementById("sfxValue").textContent =
        sfxVolume.value + "%";

    document.getElementById("brightnessValue").textContent =
        brightness.value + "%";

}


/* SAVE SETTINGS */

function SaveSettings() {

    const settings = {

        master: masterVolume.value,
        music: musicVolume.value,
        sfx: sfxVolume.value,
        brightness: brightness.value,
        muted: muteAudio.checked

    };

    try {

        localStorage.setItem(
            "gameSettings",
            JSON.stringify(settings)
        );

    } catch (error) {

        console.warn("Unable to save settings.", error);

    }

}


/* LOAD SETTINGS */

function LoadSettings() {

    let savedSettings = null;

    try {

        savedSettings = localStorage.getItem("gameSettings");

    } catch (error) {

        console.warn("Unable to load settings.", error);

    }


    if (savedSettings) {

        try {

            const settings = JSON.parse(savedSettings);

            masterVolume.value = settings.master ?? 100;
            musicVolume.value = settings.music ?? 70;
            sfxVolume.value = settings.sfx ?? 80;
            brightness.value = settings.brightness ?? 100;
            muteAudio.checked = settings.muted ?? false;

        } catch (error) {

            console.warn("Settings data was invalid.", error);

        }

    }

    UpdateSettingsDisplay();
    UpdateBrightness();

}


/* BACKGROUND BRIGHTNESS */

function UpdateBrightness() {

    const value = Number(brightness.value);

    const overlay = 0.65 - ((value - 50) / 100) * 0.5;

    document.body.style.setProperty(
        "--background-overlay",
        overlay
    );

}


/* RESET SETTINGS */

function ResetSettings() {

    masterVolume.value = 100;
    musicVolume.value = 70;
    sfxVolume.value = 80;
    brightness.value = 100;
    muteAudio.checked = false;

    UpdateSettingsDisplay();
    UpdateBrightness();
    SaveSettings();

}


/* SETTINGS EVENTS */

[
    masterVolume,
    musicVolume,
    sfxVolume
].forEach(function(control) {

    control.addEventListener("input", function() {

        UpdateSettingsDisplay();
        SaveSettings();

    });

});


brightness.addEventListener("input", function() {

    UpdateSettingsDisplay();
    UpdateBrightness();
    SaveSettings();

});


muteAudio.addEventListener("change", function() {

    SaveSettings();

});


document.getElementById("resetSettings")
    .addEventListener("click", ResetSettings);


/* INITIALIZE WEBSITE */

LoadSettings();
DrawGamePreview();
