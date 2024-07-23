const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function mükemmelSayıBul() {
    rl.question('Lütfen bir sayı girin: ', (input) => {
        const sayi = parseFloat(input);

        if (isNaN(sayi)) {
            console.log('Lütfen geçerli bir sayı girin.');
            mükemmelSayıBul();
        } else {
            const sonuc = sayi % 30;
            const kalan = sayi % 2;
            const kalan1 = sayi % 3;
            const kalan2 = sayi % 5;

            if (sonuc === 0) {
                console.log('Mükemmel sayıyı buldunuz');
            } else {
                console.log(`Girdiğiniz sayının sırayla 2, 3 ve 5'e bölümünden kalanlar: ${kalan}, ${kalan1}, ${kalan2} bu bir mükemmel sayı değil`);
            }

            devam();
        }
    });
}

function devam() {
    rl.question('Devam etmek için = e, çıkmak için = q tuşuna basın: ', (cevap) => {
        if (cevap.toLowerCase() === 'e') {
            mükemmelSayıBul(); 
        } else if (cevap.toLowerCase() === 'q') {
            rl.close();
        } else {
            console.log('Geçersiz giriş. Lütfen e veya q tuşuna basın.');
            devam();
        }
    });
}

mükemmelSayıBul();
