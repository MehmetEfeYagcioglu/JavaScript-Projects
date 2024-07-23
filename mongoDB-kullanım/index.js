function kopyaci() {  
    let kullaniciAltin = 1;
    let yapayZekaAltin = 1;
    let turlar = 10;
    let ilkHamle = true;

    function birTurOynaKopyaci(tur) {
        if (tur > turlar) {
            console.log('Üçüncü oyun bitti! diğer oyuna geçiliyor');
            console.log(`Sonuçlar: Kullanıcı Altın: ${kullaniciAltin}, Yapay Zeka Altın: ${yapayZekaAltin}`);
            kazancKopyaci = kullaniciAltin;
            sinsi();
            return;
        }

        let kopyaciHamle = ilkHamle ? 'i' : kullaniciIlkHamle;
        


        rl.question('\nHile yapmak için = h, iş birliği için = i tuşuna basın: ', (cevap) => {
            let kullaniciHamle = cevap.toLowerCase();


            if (ilkHamle) {
                kullaniciIlkHamle = kullaniciHamle; // Kullanıcının ilk hamlesini kaydet
                ilkHamle = false;
            }

            if (kullaniciHamle !== 'h' && kullaniciHamle !== 'i') {
                console.log('Yanlış tuş! "h" veya "i" tuşlarından birine basın.');
                birTurOynaKopyaci(tur); // Tekrar aynı turu oyna
                return;
            }

            if (kullaniciHamle === 'h' && kopyaciHamle === 'h') {
                kullaniciAltin += 0;
                yapayZekaAltin += 0;
            } else if (kullaniciHamle === 'h' && kopyaciHamle === 'i') {
                kullaniciAltin += 3;
                yapayZekaAltin -= 1;
            } else if (kullaniciHamle === 'i' && kopyaciHamle === 'h') {
                kullaniciAltin -= 1;
                yapayZekaAltin += 3;
            } else if (kullaniciHamle === 'i' && kopyaciHamle === 'i') {
                kullaniciAltin += 2;
                yapayZekaAltin += 2;
            }

            console.log(`Tur ${tur}: Kullanıcı Altın: ${kullaniciAltin}, Yapay Zeka Altın: ${yapayZekaAltin}`);

            birTurOynaKopyaci(tur + 1);
        });
    }

    birTurOynaKopyaci(1);
}