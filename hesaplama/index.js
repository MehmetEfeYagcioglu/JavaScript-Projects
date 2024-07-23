const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// Kullanıcıdan geçerli bir sayı girişi almak için kullanılır
function getNumberInput(prompt, callback) {
    rl.question(prompt, (input) => {
        if (input.toLowerCase() === 'q') {
            rl.close();
            return;
        }
        const number = parseFloat(input);  // Girdiyi ondalık sayıya dönüştürür
        if (isNaN(number)) {  // Girdinin geçerli bir sayı olup olmadığını kontrol eder
            console.log('Lütfen geçerli bir sayı girin.');
            getNumberInput(prompt, callback);  // Geçerli değilse tekrar sorar
        } else {
            callback(number);
        }
    });
}

// Kullanıcıdan geçerli bir işlem girişi almak için kullanılır
function getOperationInput(callback) {
    rl.question('Lütfen bir işlem seçin (+, -, *, /) veya çıkmak için q\'ya basın: ', (input) => {
        if (input.toLowerCase() === 'q') {
            rl.close();
            return;
        }
        const operation = input.trim();
        if (['+', '-', '*', '/'].includes(operation)) {  // Girdinin geçerli bir işlem olup olmadığını kontrol eder
            callback(operation);
        } else {
            console.log('Lütfen geçerli bir işlem seçin.');
            getOperationInput(callback);  // Geçerli değilse tekrar sorar
        }
    });
}

//Kullanıcıdan sayıları ve işlemi alır ve sonucu hesaplar
function hesapmakinesi() {
    getNumberInput('Lütfen bir sayı girin veya çıkmak için q\'ya basın: ', (num1) => {
        getNumberInput('Lütfen ikinci sayıyı girin veya çıkmak için q\'ya basın: ', (num2) => {
            getOperationInput((operation) => {

                let sonuc;
                if (operation === '+') {
                    sonuc = num1 + num2;
                } else if (operation === '-') {
                    sonuc = num1 - num2;
                } else if (operation === '*') {
                    sonuc = num1 * num2;
                } else if (operation === '/') {
                    if (num2 !== 0) {
                        sonuc = num1 / num2;
                    } else {
                        console.log('Bir sayıyı 0\'a bölemezsiniz.');
                        hesapmakinesi();
                        return;
                    }
                } else {
                    console.log('Lütfen geçerli bir işlem seçin');
                    hesapmakinesi();
                    return;
                }
                
                console.log(`Sonuç: ${sonuc}`);
                hesapmakinesi();
            });
        });
    });
}

hesapmakinesi();
