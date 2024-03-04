const sliderValue = document.getElementById("slider-value");
const slider = document.getElementById("slider");
const btn = document.getElementById("btn");
const password = document.getElementById("password-generated");
const copy = document.getElementById("img-btn")
const strengthIndicator = document.getElementById("strength-meter-text");
const bar1 = document.getElementById("bar1");
const bar2 = document.getElementById("bar2");
const bar3 = document.getElementById("bar3");
const bar4 = document.getElementById("bar4");

//slidern skulle få färg
slider.oninput = () => {
    let value = slider.value;
    sliderValue.textContent = value;
    const percent = (value - slider.min) / (slider.max - slider.min) * 100; // få ut procenten av slidern, för att få färg
    const color = `linear-gradient(90deg, #A638F6 ${percent}%, #16111A ${percent}%)`;
    slider.style.background = color;
};

// Generera PWD
generatePassword = () => {
    const length = document.getElementById("slider").value;
    const includeUppercase = document.getElementById("uppercase-checkbox").checked;
    const includeLowercase = document.getElementById("lowercase-checkbox").checked;
    const includeNumbers = document.getElementById("number-checkbox").checked;
    const includeSymbols = document.getElementById("symbols-checkbox").checked;

    const lowercaseLetters = "abcdefghijklmnopqrstuvwxyz";
    const uppercaseLetters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const numbers = "123456789";
    const symbols = "!@#$%&()*";

    let charPool = "";
    if (includeUppercase) {
        charPool += uppercaseLetters;
    }
    if (includeLowercase) {
        charPool += lowercaseLetters;
    }
    if (includeNumbers) {
        charPool += numbers;
    }
    if (includeSymbols) {
        charPool += symbols;
    };

    let password = "";
    for (let i = 0; i < length; i++) {
        password += charPool.charAt(Math.floor(Math.random() * charPool.length));
    }

    const passwordGenerated = document.getElementById("password-generated");
    passwordGenerated.textContent = password;
    return passwordGenerated.textContent;
};


// copy ikon, kopiera de genererande PWD
copy.addEventListener("click", () => {
    event.preventDefault();
    navigator.clipboard.writeText(password.textContent);
    alert("Password copied");
});

// strength mätare, baserat på längd och antal checkboxar bockat.
const getPasswordStrength = (password) => {
    const lowercaseRegex = /^(?=.*[a-z])/;
    const uppercaseRegex = /^(?=.*[A-Z])/;
    const numberRegex = /^(?=.*\d)/;
    const symbolRegex = /^(?=.*[!@#$%&()*])/;

    let score = 0;
    if (lowercaseRegex.test(password)) {
        score++;
    }
    if (uppercaseRegex.test(password)) {
        score++;
    }
    if (numberRegex.test(password)) {
        score++;
    }
    if (symbolRegex.test(password)) {
        score++;
    }

    if (password.length < 8) {
        return "WEAK";
    } else if (score < 3) {
        return "MEDIUM";
    } else {
        return "STRONG";
    };
};

// Btn event, för att få ut PWD och visa styrkan
btn.addEventListener("click", () => {

    const password = generatePassword();
    const passwordGenerated = document.getElementById("password-generated");
    passwordGenerated.textContent = password;

    const passwordStrength = getPasswordStrength(password);
    const strengthIndicator = document.getElementById("strength-meter-text");
    strengthIndicator.textContent = passwordStrength;

    const bar1 = document.getElementById("bar1");
    const bar2 = document.getElementById("bar2");
    const bar3 = document.getElementById("bar3");
    const bar4 = document.getElementById("bar4");

    if (passwordStrength === "WEAK") {
        bar1.classList.add("colored");
        bar1.style.backgroundColor = "#FFA257";
        bar2.classList.remove("colored");
        bar2.style.backgroundColor = "";
        bar3.classList.remove("colored");
        bar3.style.backgroundColor = "";
        bar4.classList.remove("colored");
        bar4.style.backgroundColor = "";
    } else if (passwordStrength === "MEDIUM") {
        bar1.classList.add("colored");
        bar1.style.backgroundColor = "#FFA257";
        bar2.classList.add("colored");
        bar2.style.backgroundColor = "#FFA257";
        bar3.classList.add("colored");
        bar3.style.backgroundColor = "#FFA257";
        bar4.classList.remove("colored");
        bar4.style.backgroundColor = "";
    } else {
        bar1.classList.add("colored");
        bar1.style.backgroundColor = "#4ABEA0";
        bar2.classList.add("colored");
        bar2.style.backgroundColor = "#4ABEA0";
        bar3.classList.add("colored");
        bar3.style.backgroundColor = "#4ABEA0";
        bar4.classList.add("colored");
        bar4.style.backgroundColor = "#4ABEA0";
      }
});


