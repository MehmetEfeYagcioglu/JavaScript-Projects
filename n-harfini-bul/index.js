const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

let harfler = [
    "a", "b", "e", "n",
    "f", "n", "j", "u",
    "e", "n", "i", "n",
    "n", "a", "v", "h",
];

// Harfleri yazdırma kodu
function harfYazdırma() {

    for (let i = 0; i < harfler.length; i += 4) { // en başta i'yi 0 olarak tanımladık ve yazdırdık sonra i'yi 4 arttırarak tüm harflerin yazıılmasını sağladık
        console.log(harfler.slice(i, i + 4).join('   '));// join komutu sayesinde yazdırmış olduğumuz harflerin arasına boşluk koyduk
    }
}

function harfBulma() {
    // Kullanıcıdan satır ve sütun bilgilerini alma
    rl.question('Lütfen satır numarasını girin:', (satirInput) => {
        rl.question('Lütfen sütun numarasını girin:', (sutunInput) => {
            // Satır ve sütun değerlerini tam sayıya dönüştürme
            let satir = parseInt(satirInput);
            let sutun = parseInt(sutunInput);

            // Satır ve sütun değerlerini 0 tabanlıya dönüştürme(0 tabanlıda elementler 0 sayısından başlar örnek: 0.element, 1.element 0 tabanlı kodlama dillerinde kullanılır)
            let satirIndeks = satir - 1;
            let sutunIndeks = sutun - 1;

            // Elemanın indeksini hesaplama
            let indeks = satirIndeks * 4 + sutunIndeks; // Tam terside olabilir, hangi harf çıktığını sayı şeklinde belirliyoruz
            // let indeks = sutunIndeks * 4 + satirIndeks;

            // Elemanı bulma ve yazdırma
            if (indeks >= 0 && indeks < harfler.length) { // harfler.length yerine 16 da yazılabilir, amaç sonuç 16 dan büyükse hata vermesini sağlamak
                console.log(`Satır ${satir} ve sütun ${sutun} deki harf: ${harfler[indeks]}`);// sayı şeklinde belirlediğimiz harfleri harf şeklinde yazdırıyoruz
                // Harfi kontrol etme fonksiyonunu burada çağırıyoruz
                harfKontrol(indeks);
            } else {
                console.log("Geçersiz satır veya sütun.");
                // Hatalı giriş durumunda yeniden giriş alıyoruz
                harfBulma();
            }
        });
    });
}

function harfKontrol(indeks) {
    if (harfler[indeks] === 'n') {
        console.log('Tebrikler n harfini buldun');
        rl.close();
    } else {
        console.log('n harfini bulamadın tekrar dene');
        harfYazdırma();
        harfBulma();
    }
}

harfYazdırma();
harfBulma();
// harf kontrol fonksiyonunu yazmamamızın sebebi harf kontrolü harf bulma komutunun içinde çalıştırmamız eğer burda çağırsaydık hata alacaktık