let random = 'djfhsdk jfhakjghk jdsghjdkl saghadsg '
let random1 = 'fwrejfhe jwrgwjew ewjfkj ewkfjekf jkeg '
let random2 = 'aaa jfwe hgj elg kwe bhgn jk '
let random3 = 'ADLSA FKSD DSFHDSJ hfKD JS KDFJ Ads mvkn dfbj'
let result

result = random.length //karakter sayısını yazdırmak için kullanılıyor

result = random1.replace(" ", "").length; //ilk tırnak işareti içindeki ifadeyi ikinci tırnak içindeki ifadeye dönüşütürür
result = random1.split(" ").length; //tırnak içindeki ifadeden itibaren cümleleri böler
result = random2.startsWith("aaa");//yazdığımız cümler bu ifadeyle mi başlıyor onu test eder
if(random2.indexOf("aaa") > -1){ //yazdığımız cümlenin içinde bu harf yada harf grubu geçiyor mu test edilir

    console.log("çalıştı");
}else{
    console.log("çalışmadı");
}

random = random.replace(" ", "/");
random1 = random1.replace(" ", "-");
random2 = random2.replace(" ", "%");
random3 = random3.toLowerCase().replace(" ", "|");

const newRandom = (random + random1 + random2 + random3);

console.log(random);

console.log(result);