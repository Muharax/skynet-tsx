const imports = [];

for (let i = 1; i <= 54; i++) {
    imports.push(`import Card${i} from "../blackjack/img/card${i}.png";`);
}

// Wyświetl wygenerowane importy
console.log(imports.join('\n'));
