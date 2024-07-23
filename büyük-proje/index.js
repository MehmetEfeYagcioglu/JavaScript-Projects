const readline = require('readline');
const fs = require('fs');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function oyun() {
    let kazancCakal = 0;
    let kazancPoncik = 0;
    let kazancKopyaci = 0;
    let kazancSinsi = 0;
    let kazancGozuKara = 0;

    console.log('Bu oyunu 5 farklı yapay zekaya karşı oynayacaksınız. Her yapay zeka ile 10 tur oynayacaksınız. ');
    console.log('\nOyunun mantığı: İki taraf da oyunun başında 1 altına sahip.');
    console.log('\nEğer her iki taraf da altını makineye koyarsa ek olarak 2 altın alacaksınız, yani toplam 3 altınız olacak.');
    console.log('\nEğer siz altını koymazsanız, rakip altını koyarsa siz ek olarak 3 altın kazanırken rakip 1 altın kaybedecek. Aynı şekilde siz altın koyarsanız, rakip altın koymazsa siz 1 altın kaybederken rakip 3 altın kazanacak.');
    console.log('\nHer iki taraf da altın koymazsa herhangi bir alışveriş olmayacak.');
    console.log('\nLütfen oyunu yavaş yavaş oynayın\n');

    let isim, soyisim;

    rl.question('İsim: ', (İsimCevap) => {
        isim = İsimCevap.trim();
        rl.question('Soyisim: ', (SoyİsimCevap) => {
            soyisim = SoyİsimCevap.trim();
            oyunaBasla();
        });
    });

    function oyunaBasla() {
        rl.question('Oyunun mantığını anladıysanız "b" yazarak oyuna başlayabilirsiniz: ', (cevap) => {
            if (cevap.toLowerCase() === 'b') {
                bilgiler();
            } else {
                console.log('Yanlış tuş! Oyuna başlamak için "b" tuşuna basın.');
                oyunaBasla(); // Tekrar sor
            }
        });
    }

    function bilgiler() {
        fs.appendFile('oyun_sonucları.txt', `İsim: ${isim} Soyisim: ${soyisim}\n`, (err) => {
            if (err) throw err;
            console.log('Oyun sonucu dosyaya başarıyla kaydedildi.');
            cakal();
        });
    }

    function cakal() {
        let kullaniciAltin = 1;
        let yapayZekaAltin = 1;
        let turlar = 10;

        function birTurOynaCakal(tur) {
            if (tur > turlar) {
                console.log('İlk oyun bitti! diğer oyuna geçiliyor!');
                console.log(`Sonuçlar: Kullanıcı Altın: ${kullaniciAltin}, Yapay Zeka Altın: ${yapayZekaAltin}`);
                console.log('-----------------------------------------------------------------------------------------------------------------------------------------------------------------------');
                kazancCakal = kullaniciAltin;
                poncik();
                return;
            }

            let cakalHamle = 'h';

            rl.question('\nHile yapmak için = h, iş birliği için = i tuşuna basın: ', (cevap) => {
                let kullaniciHamle = cevap.toLowerCase();

                if (kullaniciHamle !== 'h' && kullaniciHamle !== 'i') {
                    console.log('Yanlış tuş! "h" veya "i" tuşlarından birine basın.');
                    birTurOynaCakal(tur); // Tekrar aynı turu oyna
                    return;
                }

                if (kullaniciHamle === 'h' && cakalHamle === 'h') {
                    kullaniciAltin += 0;
                    yapayZekaAltin += 0;
                } else if (kullaniciHamle === 'h' && cakalHamle === 'i') {
                    kullaniciAltin += 3;
                    yapayZekaAltin -= 1;
                } else if (kullaniciHamle === 'i' && cakalHamle === 'h') {
                    kullaniciAltin -= 1;
                    yapayZekaAltin += 3;
                } else if (kullaniciHamle === 'i' && cakalHamle === 'i') {
                    kullaniciAltin += 2;
                    yapayZekaAltin += 2;
                }

                console.log(`Tur ${tur}: Kullanıcı Altın: ${kullaniciAltin}, Yapay Zeka Altın: ${yapayZekaAltin}`);

                birTurOynaCakal(tur + 1);
            });
        }

        birTurOynaCakal(1);
    }

    function poncik() {
        let kullaniciAltin = 1;
        let yapayZekaAltin = 1;
        let turlar = 10;

        function birTurOynaPoncik(tur) {
            if (tur > turlar) {
                console.log('ikinci oyun bitti! diğer oyuna geçilıyor');
                console.log(`Sonuçlar: Kullanıcı Altın: ${kullaniciAltin}, Yapay Zeka Altın: ${yapayZekaAltin}`);
                console.log('-----------------------------------------------------------------------------------------------------------------------------------------------------------------------');
                kazancPoncik = kullaniciAltin;
                kopyaci();
                return;
            }

            let poncikHamle = 'i';

            rl.question('\nHile yapmak için = h, iş birliği için = i tuşuna basın: ', (cevap) => {
                let kullaniciHamle = cevap.toLowerCase();

                if (kullaniciHamle !== 'h' && kullaniciHamle !== 'i') {
                    console.log('Yanlış tuş! "h" veya "i" tuşlarından birine basın.');
                    birTurOynaPoncik(tur); // Tekrar aynı turu oyna
                    return;
                }

                if (kullaniciHamle === 'h' && poncikHamle === 'h') {
                    kullaniciAltin += 0;
                    yapayZekaAltin += 0;
                } else if (kullaniciHamle === 'h' && poncikHamle === 'i') {
                    kullaniciAltin += 3;
                    yapayZekaAltin -= 1;
                } else if (kullaniciHamle === 'i' && poncikHamle === 'h') {
                    kullaniciAltin -= 1;
                    yapayZekaAltin += 3;
                } else if (kullaniciHamle === 'i' && poncikHamle === 'i') {
                    kullaniciAltin += 2;
                    yapayZekaAltin += 2;
                }

                console.log(`Tur ${tur}: Kullanıcı Altın: ${kullaniciAltin}, Yapay Zeka Altın: ${yapayZekaAltin}`);

                birTurOynaPoncik(tur + 1);
            });
        }

        birTurOynaPoncik(1);
    }

    function kopyaci() {
        let kullaniciAltin = 1;
        let yapayZekaAltin = 1;
        const turlar = 10;
        let ilkHamle = true;
        let oncekiKullaniciHamle = 'i'; // İlk tur için iş birliği
    
        function birTurOynaKopyaci(tur) {
            if (tur > turlar) {
                console.log('Oyun bitti! Diğer oyuna geçiliyor.');
                console.log(`Sonuçlar: Kullanıcı Altın: ${kullaniciAltin}, Yapay Zeka Altın: ${yapayZekaAltin}`);
                console.log('-----------------------------------------------------------------------------------------------------------------------------------------------------------------------');
                kazancKopyaci = kullaniciAltin;
                sinsi(); // Bir sonraki oyun fonksiyonunu çağırmak için
                return;
            }
    
            let kopyaciHamle = ilkHamle ? 'i' : oncekiKullaniciHamle;
    
            rl.question('\nHile yapmak için = h, iş birliği için = i tuşuna basın: ', (cevap) => {
                let kullaniciHamle = cevap.toLowerCase();
    
                if (kullaniciHamle !== 'h' && kullaniciHamle !== 'i') {
                    console.log('Yanlış tuş! "h" veya "i" tuşlarından birine basın.');
                    birTurOynaKopyaci(tur); // Tekrar aynı turu oyna
                    return;
                }
    
                if (ilkHamle) {
                    ilkHamle = false;
                } else {
                    oncekiKullaniciHamle = kullaniciHamle;
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
    
    function sinsi() {
        let kullaniciAltin = 1;
        let yapayZekaAltin = 1;
        let turlar = 10;

        function birTurOynaSinsi(tur) {
            if (tur > turlar) {
                console.log('Dördüncü oyun bitti! diğer oyuna geçiliyor');
                console.log(`Sonuçlar: Kullanıcı Altın: ${kullaniciAltin}, Yapay Zeka Altın: ${yapayZekaAltin}`);
                console.log('-----------------------------------------------------------------------------------------------------------------------------------------------------------------------');
                kazancSinsi = kullaniciAltin;
                gozuKara();
                return;
            }


            rl.question('\nHile yapmak için = h, iş birliği için = i tuşuna basın: ', (cevap) => {
                let kullaniciHamle = cevap.toLowerCase();


                if (tur < 3) {
                    sinsiHamle = 'i';  // İlk iki tur iş birliği
                } else if (tur === 3) {
                    sinsiHamle = 'h';  // Üçüncü turda hile
                } else if (tur === 4) {
                    if (kullaniciHamle === 'i') {
                        sinsiHamle = 'h';  // Kullanıcı iş birliği yaparsa, yapay zeka hile yapar
                    } else if (kullaniciHamle === 'h') {
                        sinsiHamle = 'i';  // Kullanıcı hile yaparsa, yapay zeka iş birliği yapar
                    }
                }


                if (kullaniciHamle !== 'h' && kullaniciHamle !== 'i') {
                    console.log('Yanlış tuş! "h" veya "i" tuşlarından birine basın.');
                    birTurOynaSinsi(tur); // Tekrar aynı turu oyna
                    return;
                }

                if (kullaniciHamle === 'h' && sinsiHamle === 'h') {
                    kullaniciAltin += 0;
                    yapayZekaAltin += 0;
                } else if (kullaniciHamle === 'h' && sinsiHamle === 'i') {
                    kullaniciAltin += 3;
                    yapayZekaAltin -= 1;
                } else if (kullaniciHamle === 'i' && sinsiHamle === 'h') {
                    kullaniciAltin -= 1;
                    yapayZekaAltin += 3;
                } else if (kullaniciHamle === 'i' && sinsiHamle === 'i') {
                    kullaniciAltin += 2;
                    yapayZekaAltin += 2;
                }

                console.log(`Tur ${tur}: Kullanıcı Altın: ${kullaniciAltin}, Yapay Zeka Altın: ${yapayZekaAltin}`);

                birTurOynaSinsi(tur + 1);
            });
        }

        birTurOynaSinsi(1);
    }

    function gozuKara() {
        let kullaniciAltin = 1;
        let yapayZekaAltin = 1;
        let turlar = 10;
        let nextRoundHamle = '';  // Bir sonraki tur için saklanan hamle
        let gozuKaraHamle = 'i'


        function birTurOynaGozuKara(tur) {
            if (tur > turlar) {
                console.log('Oyun bitti!');
                console.log(`Sonuçlar: Kullanıcı Altın: ${kullaniciAltin}, Yapay Zeka Altın: ${yapayZekaAltin}`);
                kazancGozuKara = kullaniciAltin;
                writeToTextFile();
                return;
            }



            rl.question('\nHile yapmak için = h, iş birliği için = i tuşuna basın: ', (cevap) => {
                let kullaniciHamle = cevap.toLowerCase();

                if (kullaniciHamle === 'h') {
                    nextRoundHamle = 'h';  // Bir sonraki turda yapılacak hamle
                } else {
                    nextRoundHamle = 'i';  // Eğer kullanıcı 'i' yaparsa, bir sonraki turda yapay zekanın hamlesi 'i' olur
                }

                if (kullaniciHamle === 'h') {
                    nextRoundHamle = 'h';  // Bir sonraki turda yapılacak hamle
                } else {
                    nextRoundHamle = 'i';  // Eğer kullanıcı 'i' yaparsa, bir sonraki turda yapay zekanın hamlesi 'i' olur
                }

                if (kullaniciHamle === 'h' && gozuKaraHamle === 'h') {
                    kullaniciAltin += 0;
                    yapayZekaAltin += 0;
                } else if (kullaniciHamle === 'h' && gozuKaraHamle === 'i') {
                    kullaniciAltin += 3;
                    yapayZekaAltin -= 1;
                } else if (kullaniciHamle === 'i' && gozuKaraHamle === 'h') {
                    kullaniciAltin -= 1;
                    yapayZekaAltin += 3;
                } else if (kullaniciHamle === 'i' && gozuKaraHamle === 'i') {
                    kullaniciAltin += 2;
                    yapayZekaAltin += 2;
                }

                console.log(`Tur ${tur}: Kullanıcı Altın: ${kullaniciAltin}, Yapay Zeka Altın: ${yapayZekaAltin}`);

                gozuKaraHamle = nextRoundHamle;

                birTurOynaGozuKara(tur + 1);
            });
        }

        birTurOynaGozuKara(1);
    }

    function writeToTextFile() {
        fs.appendFile('oyun_sonucları.txt', `Çakal kazandığı altın: ${kazancCakal}\nPonçik kazandığı altın: ${kazancPoncik}\nKopyacı kazandığı altın: ${kazancKopyaci}\nSinsi kazandığı altın: ${kazancSinsi}\nGözü Kara kazandığı altın: ${kazancGozuKara}\n`, (err) => {
            if (err) throw err;
            console.log('Oyun sonucu dosyaya başarıyla kaydedildi.');

            let toplamKazanc = kazancCakal + kazancPoncik + kazancKopyaci + kazancSinsi + kazancGozuKara;
            console.log(`Toplam kazanılan altın: ${toplamKazanc}`);
            rl.close();
        });
    }

}

oyun();