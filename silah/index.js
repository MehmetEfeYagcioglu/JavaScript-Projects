const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

let silah = 25;
let sarjor = 5;

console.log('Oyuna başladınız. Toplam 25 mermiye sahipsiniz.');

function atesEtme() {
    rl.question('Ateş etmek için "a", Şarjörü doldurmak için "r" tuşuna basın: ', (cevap) => {
        if (cevap.toLowerCase() === 'a') {
            if (sarjor > 0) {
                console.log('Bir mermi ateşlediniz.');
                sarjor--;
                console.log('Mermi sayısı: ' + silah);
                console.log('Şarjör sayısı: ' + sarjor);

                if (sarjor === 0 && silah > 0) {
                    console.log('Şarjördeki mermiler bitti. Otomatik reload yapılıyor.');
                    const eklenenMermi = Math.min(5 - sarjor, silah);
                    sarjor += eklenenMermi;
                    silah -= eklenenMermi;
                    console.log(`Şarjör dolduruldu. Silahtaki mermi sayısı: ${silah} Şarjördeki mermi sayısı: ${sarjor}`);
                }

                if (silah === 0 && sarjor === 0) {
                    console.log('Merminiz bitti.');
                    rl.close();
                } else {
                    atesEtme();
                }
            } else {
                console.log('Şarjör boş. Şarjör dolduruluyor.');
                const eklenenMermi = Math.min(5 - sarjor, silah);
                sarjor += eklenenMermi;
                silah -= eklenenMermi;
                console.log(`Şarjör dolduruldu. Silahtaki mermi sayısı: ${silah} Şarjördeki mermi sayısı: ${sarjor}`);
                if (eklenenMermi === 0) {
                    console.log('Merminiz bitti.');
                    rl.close();
                } else {
                    atesEtme();
                }
            }
        } else if (cevap.toLowerCase() === 'r') {
            if (sarjor < 5) {
                const eklenenMermi = Math.min(5 - sarjor, silah);
                sarjor += eklenenMermi;
                silah -= eklenenMermi;
                console.log(`Şarjör dolduruldu. Silahtaki mermi sayısı: ${silah} Şarjördeki mermi sayısı: ${sarjor}`);
            } else {
                console.log('Şarjör zaten dolu.');
            }
            atesEtme();
        } else {
            console.log('Geçersiz tuş. "a" veya "r" tuşlarına basın.');
            atesEtme();
        }
    });
}

atesEtme();
