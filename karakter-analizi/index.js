const readline = require('readline');
const fs = require('fs');

// Kullanıcı girişini almak için arayüz
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// Karakterlerin başlangıç puanları
const karakterPuanlari = {
    cakal: 0,
    poncik: 0,
    kopyaci: 0,
    gozuKara: 0
};

// Basit bir oyun stratejisi belirleme fonksiyonu
function stratejiKarakter(karakter, oncekiHamle) {
    switch (karakter) {
        case 'cakal': return 'h'; // Hile
        case 'poncik': return 'i'; // İş birliği
        case 'kopyaci': return oncekiHamle; // Kopyacı
        case 'gozuKara': return 'h'; // Hile
        default: return 'i';
    }
}

// İki karakter arasında bir tur oyun oynama fonksiyonu
function birTurOyna(karakter1, karakter2, oncekiHamle1, oncekiHamle2) {
    const hamle1 = stratejiKarakter(karakter1, oncekiHamle2);
    const hamle2 = stratejiKarakter(karakter2, oncekiHamle1);

    if (hamle1 === 'h' && hamle2 === 'h') {
        // İki taraf da hile yaparsa
        karakterPuanlari[karakter1] += 0;
        karakterPuanlari[karakter2] += 0;
    } else if (hamle1 === 'h' && hamle2 === 'i') {
        // Bir taraf hile yapıp diğer taraf iş birliği yaparsa
        karakterPuanlari[karakter1] += 3;
        karakterPuanlari[karakter2] -= 1;
    } else if (hamle1 === 'i' && hamle2 === 'h') {
        // Bir taraf iş birliği yapıp diğer taraf hile yaparsa
        karakterPuanlari[karakter1] -= 1;
        karakterPuanlari[karakter2] += 3;
    } else if (hamle1 === 'i' && hamle2 === 'i') {
        // İki taraf da iş birliği yaparsa
        karakterPuanlari[karakter1] += 2;
        karakterPuanlari[karakter2] += 2;
    }

    return [hamle1, hamle2]; // Hamleleri döndür
}

// Karakterler arasında tüm oyunları oynatma fonksiyonu
function tumOyunlariOyna(turlar) {
    const karakterler = Object.keys(karakterPuanlari);

    for (let i = 0; i < turlar; i++) {
        let oncekiHamleler = {}; // Önceki hamleleri saklamak için bir nesne
        for (let j = 0; j < karakterler.length; j++) {
            for (let k = j + 1; k < karakterler.length; k++) {
                const [hamle1, hamle2] = birTurOyna(karakterler[j], karakterler[k], oncekiHamleler[karakterler[j]], oncekiHamleler[karakterler[k]]);
                oncekiHamleler[karakterler[j]] = hamle1;
                oncekiHamleler[karakterler[k]] = hamle2;
            }
        }
    }
}

// Sonuçları sıralama ve yazdırma fonksiyonu
function puanlariSiralaVeYazdir() {
    const siraliKarakterler = Object.entries(karakterPuanlari).sort((a, b) => b[1] - a[1]);
    
    console.log('Karakterler puanlarına göre sıralı:');
    siraliKarakterler.forEach(([karakter, puan]) => {
        console.log(`${karakter.charAt(0).toUpperCase() + karakter.slice(1)}: ${puan} puan`);
    });
}

// Oyunu başlat
const turlar = 10; // Her karakter çifti arasında kaç tur oynanacak
tumOyunlariOyna(turlar);
puanlariSiralaVeYazdir();