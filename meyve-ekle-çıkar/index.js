const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

let fruits = ["Elma", "Muz", "Çilek", "Portakal"];

function meyveEkle() {
    rl.question('Eklemek için "e", çıkarmak için "ç", çıkmak için "q" harfine basın: ', (cevap) => {
        if (cevap.toLowerCase() === 'e') {
            rl.question('Başa eklemek için "b", sona eklemek için "s" harfine basın: ', (cevap) => {
                if (cevap.toLowerCase() === 'b') {
                    rl.question('Başa eklemek istediğiniz meyveyi girin: ', (input) => {
                        fruits.unshift(input);
                        console.log(fruits);
                        meyveEkle();
                    });
                } else if (cevap.toLowerCase() === 's') {
                    rl.question('Sona eklemek istediğiniz meyveyi girin: ', (input) => {
                        fruits.push(input);
                        console.log(fruits);
                        meyveEkle();
                    });
                } else {
                    console.log('Geçersiz tuş! "b" veya "s" harfine basın.');
                    meyveEkle();
                }
            });
        } else if (cevap.toLowerCase() === 'ç') {
            rl.question('Başından çıkarmak için "b", sonundan çıkarmak için "s" harfine basın: ', (cevap) => {
                if (cevap.toLowerCase() === 'b') {
                    fruits.shift();
                    console.log(fruits);
                    meyveEkle();
                } else if (cevap.toLowerCase() === 's') {
                    fruits.pop();
                    console.log(fruits);
                    meyveEkle();
                } else {
                    console.log('Geçersiz tuş! "b" veya "s" harfine basın.');
                    meyveEkle();
                }
            });
        } else if (cevap.toLowerCase() === 'q') {
            console.log('Çıkış yapılıyor');
            rl.close();
        } else {
            console.log('Geçersiz tuş! "e", "ç" veya "q" harfine basın.');
            meyveEkle();
        }
    });
}

meyveEkle(); // İlk çağrı




// sona öge eklemek : push

// başa öge eklemek : unshift

// sondaki ögeyi çıkarmak : pop

// baştaki ögeyi çıkarmak : shift