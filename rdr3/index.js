const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

console.log('Merhaba! Oyuna başlamak için "b" tuşuna basın. Çıkmak için "ctrl + c" tuşuna basabilirsiniz.');

readline.emitKeypressEvents(process.stdin);
process.stdin.setRawMode(true);

let gameStarted = false;
let gameState = 'initial'; // Oyun durumu takibi için değişken

rl.on('close', () => {
    console.log('\nOyun bitti');
    process.exit(0);
});

process.stdin.on('keypress', (str, key) => {
    if (!gameStarted && key.name === 'b') { 
        gameStarted = true;
        gameState = 'walking';
        console.log('\nOyun başladı! Yürümek için "w" tuşuna basın.');
    } else if (gameStarted) {
        if (gameState === 'walking' && key.name === 'w') {
            console.log('\nYürümeye başladınız.');
            console.log('Karşınıza bir silah ve bir muz çıktı, seçimini yapın (s = silah, m = muz)');
            gameState = 'choice';
        } else if (gameState === 'choice') {
            if (key.name === 's') {
                console.log('\nSilahı aldınız ve silah patladı, öldünüz.');
                rl.close();
            } else if (key.name === 'm') {
                console.log('\nMuzu aldınız, birden etrafınıza maymunlar toplanmaya başladı ve size bir taç verdiler. Artık maymunlar kralısınız! (New skill unlocked)');
                console.log('Karşınıza başka bir maymun türü çıktı (savaşmak için = s, barış için = b)');
                gameState = 'encounter';
            } else {
                console.log('\nGeçersiz tuş, lütfen doğru tuşa basın.');
            }
        } else if (gameState === 'encounter') {
            if (key.name === 'b') {
                console.log('\nTacını istediler ve vermediğiniz için sizi öldürdüler.');
                rl.close();
            } else if (key.name === 's') {
                console.log('\nÖleceksin sandın, dimi? Ölmedin.');
                console.log('Yolda yürürken kuyuya düştünüz (Tırmanmaya çalışmak için = t, Maymunlardan yardım almak için = m)');
                gameState = 'pit';
            } else {
                console.log('\nGeçersiz tuş, lütfen doğru tuşa basın.');
            }
        } else if (gameState === 'pit') {
            if (key.name === 'm') {
                console.log('\nMaymunları çağırdın ama maymun oldukları için yardım edemediler.');
                rl.close();
            } else if (key.name === 't') {
                console.log('\nMaymunlar kralı olduğunuz için üstün tırmanma yetenekleriniz var ve bunlardan yararlandınız.');
                console.log('Yoluna devam ederken bir adamla karşılaştınız (Yemek ver = y, Umursama = u)');
                gameState = 'food';
            } else {
                console.log('\nGeçersiz tuş, lütfen doğru tuşa basın.');
            }
        } else if (gameState === 'food') {
            if (key.name === 'u') {
                console.log('\nAdamı umursamadınız, bıçaklanarak öldünüz.');
                rl.close();
            } else if (key.name === 'y') {
                console.log('\nAdama muz verdiniz o da size gizemli bir hediye verdi.');
                console.log('Adama güvenip hediyeyi açacak mısınız? (Güven = g, Güvenme = e)');
                gameState = 'trust';
            } else {
                console.log('\nGeçersiz tuş, lütfen doğru tuşa basın.');
            }
        } else if (gameState === 'trust') {
            if (key.name === 'e') {
                console.log('\nMaymunların ihanetine uğradınız.');
                rl.close();
            } else if (key.name === 'g') {
                console.log('\nHediyenin içinde bir not buldunuz, okuyunca maymunların size ihanet edeceğini öğrendiniz ve ihaneti önlediniz.');
                console.log('\nMaymunlar imparatorluğu kurup yaşamınıza devam ettiniz...');
                process.exit(0);
            } else {
                console.log('\nGeçersiz tuş, lütfen doğru tuşa basın.');
            }
        } else {
            console.log('\nGeçersiz tuş, lütfen doğru tuşa basın.');
        }
    } else {
        console.log('\nOyun başlamadı. "b" tuşuna basarak oyuna başlayın.');
    }
});

process.stdin.on('close', () => {
    console.log('\nGiriş akışı kapandı.');
});

process.on('SIGINT', () => {
    console.log('\nCTRL + C tuş kombinasyonuna bastınız. Oyun bitti.');
    rl.close();
});
