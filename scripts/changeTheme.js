const root = document.documentElement;
const mainColorInput = document.querySelector(".main-color");
const accentColorInput = document.querySelector(".accent-color");
const subAccentColorInput = document.querySelector(".sub-accent-color");
const backgroundColorInput = document.querySelector(".background-color");
const fileInput = document.querySelector(".file-input");
const changeThemeButton = document.querySelector(".change-theme-add");
const resetThemeButton = document.querySelector(".change-theme-reset");

// 1st: main, 2nd: accent, 3rd: sub accent, 4th: background
colors = JSON.parse(localStorage.getItem("colors")) || ["rgb(255, 255, 255)", "rgb(37, 37, 37)", "rgb(57, 57, 57)", "rgb(251, 242, 242)"];

root.style.setProperty("--main-color", colors[0]);
root.style.setProperty("--accent-color", colors[1]);
root.style.setProperty("--sub-accent-color", colors[2]);
root.style.setProperty("--background-color", colors[3]);

function isValidHex(hex) {
    const hexRegex = /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/;
    return hexRegex.test(hex);
}

resetThemeButton.addEventListener("click", () => {
    colors = ["rgb(255, 255, 255)", "rgb(37, 37, 37)", "rgb(57, 57, 57)", "rgb(251, 242, 242)"];

    localStorage.setItem("colors", JSON.stringify(colors));

    root.style.setProperty("--main-color", colors[0]);
    root.style.setProperty("--accent-color", colors[1]);
    root.style.setProperty("--sub-accent-color", colors[2]);
    root.style.setProperty("--background-color", colors[3]);
})

changeThemeButton.addEventListener("click", () => {
    const mainColor = mainColorInput.value.replace(/\s+/g, '');
    const accentColor = accentColorInput.value.replace(/\s+/g, '');
    const backgroundColor = backgroundColorInput.value.replace(/\s+/g, '');
    const subAccentColor = subAccentColorInput.value.replace(/\s+/g, '');

    const values = [mainColor, accentColor, subAccentColor, backgroundColor];

    for (const value of values) {
        if (value == "" ) {
            return;
        };

        if (isValidHex(value) == true) {
            continue;
        };

        return;
    };

    root.style.setProperty("--main-color", mainColor);
    root.style.setProperty("--accent-color", accentColor);
    root.style.setProperty("--sub-accent-color", subAccentColor);
    root.style.setProperty("--background-color", backgroundColor);

    localStorage.setItem("colors", JSON.stringify(values));
});