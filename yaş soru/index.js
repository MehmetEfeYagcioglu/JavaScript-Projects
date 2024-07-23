const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

    const sabitMesaj = "Merhaba şamhal abi ";
    let kullaniciSayisi
    let ekMesaj = "";

rl.question('Lütfen yaşınızı girin: ', (input) => {
    kullaniciSayisi = parseInt(input);

    if (kullaniciSayisi >= 0 && kullaniciSayisi <= 18) {
        ekMesaj = "sana oyuncak aldim";
    } else if (kullaniciSayisi >= 18 && kullaniciSayisi < 25) {
        ekMesaj = "sana araba aldım";
    } else if (kullaniciSayisi >= 25 && kullaniciSayisi < 35) {
        ekMesaj = " sana ev aldım";
    } else if (kullaniciSayisi >= 35 && kullaniciSayisi < 45) {
        ekMesaj = "sana gemi aldım";
    } else if (kullaniciSayisi >= 45 && kullaniciSayisi < 55) {
        ekMesaj = "sana uçak aldım";
    } else if (kullaniciSayisi >= 55 && kullaniciSayisi < 65) {
        ekMesaj = "sana gezegen aldım";
    } else{
        ekMesaj = "sana bir şey almadım";
    }

    console.log(`${sabitMesaj}${ekMesaj}`);
    rl.close();
});