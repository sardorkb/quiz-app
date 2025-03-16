<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Question;

class QuestionSeeder extends Seeder
{
    public function run()
    {
        $questions = [
            [
                'text' => 'Yerdagi sudralib yuruvchilarning eng katta guruhi, kaltakesaklar necha turga ega?',
                'options' => ['3400', '4300 dan ortiq', '5500 dan ortiq'],
                'correct_option' => 2
            ],
            [
                'text' => 'Iguanalar qayerda yashaydi?',
                'options' => ['Arabiston sahrolarida', 'Madagaskarning tropik oʻrmonlarida', 'Qozogʻiston choʻllarida'],
                'correct_option' => 1
            ],
            [
                'text' => 'Nuqtalar oʻrnini toʻldiring! Barcha dengiz toshbaqalari tuxum qoʻyish uchun...',
                'options' => ['Qirgʻoqqa keladi', 'Dengizga tushadi', 'Toqqa chiqadi'],
                'correct_option' => 0
            ],
            [
                'text' => 'Urgʻochi toshbaqa nechtagacha tuxum qoʻyishi mumkin?',
                'options' => ['20-50', '30-40', '50-200'],
                'correct_option' => 2
            ],
            [
                'text' => 'Amfibiyalar bu-',
                'options' => ['Ham quruqlikda, ham suvda yashovchi jonzotlar', 'Faqat quruqlikda yashovchi jonzotlar', 'Faqat dengizda yashovchi jonzotlar'],
                'correct_option' => 0
            ],
            [
                'text' => 'Fantomli zaharli qurbaqa qayerda yashaydi?',
                'options' => ['Malayziyada', 'Kolumbiyada', 'Ekvadorda'],
                'correct_option' => 2
            ],
            [
                'text' => 'Yerdagi eng katta molyuskalar necha kg?',
                'options' => ['227 kg', '118 kg', '339 kg'],
                'correct_option' => 0
            ],
            [
                'text' => 'Fanga ma’lum boʻlgan molyuskalar turlari nechta?',
                'options' => ['10.000 dan ortiq', '50.000 dan ortiq', '30.000 ga yaqin'],
                'correct_option' => 1
            ],
            [
                'text' => 'Akulalar qachondan buyon mavjud?',
                'options' => ['2000 yildan beri', '2.000.000 yildan beri', '400.000.000 yildan buyon'],
                'correct_option' => 2
            ],
            [
                'text' => 'Hozirda nechta akula turi mavjud?',
                'options' => ['500 ga yaqin', '600 dan ziyod', '700 ga yaqin'],
                'correct_option' => 0
            ],
            [
                'text' => 'Baliqlarning uzunligi qancha?',
                'options' => ['10 sm.dan 7 metrgacha', '12 millimetrdan 16 metrgacha', '1 metrdan 3 metrgacha'],
                'correct_option' => 1
            ],
            [
                'text' => 'Baliqlarning turi qancha?',
                'options' => ['10.000 dan ortiq', '20.000 dan ortiq', '30.000 dan ortiq'],
                'correct_option' => 2
            ],
            [
                'text' => 'Ulkan oy kuyalarining qanotlari necha sm.gacha boʻlishi mumkin?',
                'options' => ['30 sm', '20 sm', '10 sm'],
                'correct_option' => 0
            ],
            [
                'text' => 'Shu kungacha hasharotlarning nechta turi aniqlangan?',
                'options' => ['10.000 dan ortiq', '100.000 dan ortiq', '1.000.000 dan ortiq'],
                'correct_option' => 2
            ],
            [
                'text' => 'Hali kashf qilinishi kerak boʻlgan hasharotlar turlari qancha?',
                'options' => ['10.000 lab', '100.000 lab', '1.000.000 lab'],
                'correct_option' => 2
            ],
            [
                'text' => 'Eng keng tarqalgan toʻrni qaysi turdagi oʻrgimchaklar oʻraydi?',
                'options' => ['Galaxy', 'Sidney', 'Orbit'],
                'correct_option' => 2
            ],
            [
                'text' => 'Eng qadimgi oʻrgimchak toʻri necha yillik qotgan toʻr hisoblanadi?',
                'options' => ['110.000.000 yillik', '1100 yillik', '110 yillik'],
                'correct_option' => 0
            ],
            [
                'text' => 'Dunyodagi eng qadimgi daraxt qayerda joylashgan?',
                'options' => ['Buyuk Britaniyada', 'Avstraliyada', 'Kaliforniyada'],
                'correct_option' => 2
            ],
            [
                'text' => 'Dunyodagi eng qadimgi daraxt turi qaysi?',
                'options' => ['Archa', 'Qaragʻay', 'Eman'],
                'correct_option' => 1
            ],
            [
                'text' => 'Dunyodagi eng qadimgi daraxt hozir necha yoshda?',
                'options' => ['4789', '4879', '4987'],
                'correct_option' => 0
            ],
            [
                'text' => 'Olimlarning fikrlariga koʻra Qirqquloqning eng qadimiy turlari yerda qanchadan buyon mavjud?',
                'options' => ['3500 yildan ortiq muddatdan beri', '35000 yildan ziyod vaqtdan beri', '350.000.000 yildan ortiq vaqtdan beri'],
                'correct_option' => 2
            ],
            [
                'text' => 'Yer yuzida oʻsimliklarning turi qancha?',
                'options' => ['400.000 ga yaqin', '4000.000 dan ziyod', '400.000.000 ga yaqin'],
                'correct_option' => 0
            ],
            [
                'text' => 'Dinozavrlar yerda taxminan qachon paydo boʻlgan?',
                'options' => ['2000.000 yil avval', '245.000.000 yil avval', '17.000.000 yil avval'],
                'correct_option' => 1
            ],
            [
                'text' => 'Oʻsimliklar bilan oziqlanadigan dinozavrlar yerda qancha muddat yashagan?',
                'options' => ['1000.000 yil', '14.000.000 yil', '140.000.000 yil'],
                'correct_option' => 2
            ],
            [
                'text' => 'Triceratopning shoxlari uzunligi qancha boʻlgan?',
                'options' => ['1 metr', '3 metr', '30 sm'],
                'correct_option' => 0
            ],
            [
                'text' => 'Argentinozaurlarning ogʻirligi qancha boʻlgan?',
                'options' => ['7 tonna', '700 kg', '70 tonna'],
                'correct_option' => 2
            ],
            [
                'text' => 'Argentinozaurlar fildan necha marta ogʻirroq boʻlgan?',
                'options' => ['5 marta', '15 marta', '25 marta'],
                'correct_option' => 1
            ],
            [
                'text' => 'Birinchi dvigatelli samolyot parvozi qachon amalga oshirilgan?',
                'options' => ['1903-yil', '1936-yil', '1941-yil'],
                'correct_option' => 0
            ],
            [
                'text' => 'Dunyodagi birinchi jangovar, radarda koʻrinmas samolyotning nomi nima?',
                'options' => ['Qoʻrqmas qirgʻiy', 'Tungi lochin', 'Koʻrshapalak'],
                'correct_option' => 1
            ],
            [
                'text' => 'Birinchi tijoriy reys qachon amalga oshirilgan?',
                'options' => ['1917-yilda', '1945-yilda', '1914-yilda'],
                'correct_option' => 2
            ],
            [
                'text' => 'Bugungi kunning eng yirik avialayneri Airbus A 380 necha nafargacha yoʻlovchini tashishi mumkin?',
                'options' => ['179 nafargacha', '587 nafargacha', '853 nafargacha'],
                'correct_option' => 2
            ],
            [
                'text' => 'Mototsikllar tarixi qachondan boshlangan?',
                'options' => ['19-asr oxiri', '20-asr boshi', '21-asr'],
                'correct_option' => 0
            ],
            [
                'text' => 'Birinchi skuterlar qayerda ishlab chiqarilgan?',
                'options' => ['AQSh da', 'Buyuk Britaniyada', 'Germaniyada'],
                'correct_option' => 0
            ],
            [
                'text' => 'Birinchi skuterlar nechanchi yili ishlab chiqarilgan?',
                'options' => ['1935-yil', '1936-yil', '1937-yil'],
                'correct_option' => 1
            ],
            [
                'text' => 'Birinchi boʻlib 400 metr masofani 9 soniyadan kam vaqtda bosib oʻtgan sport mototsikli boshqaruvchisi kim?',
                'options' => ['Charli Chaplin', 'Brayan Chapman', 'Ronald Reygan'],
                'correct_option' => 1
            ],
            [
                'text' => 'Birinchi boʻlib 400 metr masofani 9 soniyadan kam vaqtda bosib oʻtgan sport mototsikli nomi nima?',
                'options' => ['Qora mushuk', 'Oq it', 'Bahaybat sichqon'],
                'correct_option' => 2
            ],
            [
                'text' => 'Eng tezkor mototsikllar soatiga necha km tezlikda harakatlanadi?',
                'options' => ['350 km/soat', '450 km/soat', '560 km/soat'],
                'correct_option' => 2
            ],
            [
                'text' => 'Tezligi boʻyicha birinchi rekord oʻrnatgan poyezd nomi nima?',
                'options' => ['Stivenson raketasi', 'Silvester raketasi', 'Stallone raketasi'],
                'correct_option' => 0
            ],
            [
                'text' => 'Tezligi boʻyicha birinchi rekord oʻrnatgan Stivenson raketasi poyezdining tezligi qancha boʻlgan?',
                'options' => ['Soatiga 46 km', 'Soatiga 56 km', 'Soatiga 75 km'],
                'correct_option' => 0
            ],
            [
                'text' => 'Dunyodagi birinchi tezyurar poyezd liniyasi qayerda ochilgan?',
                'options' => ['AQSH da', 'Buyuk Britaniyada', 'Yaponiyada'],
                'correct_option' => 2
            ],
            [
                'text' => 'Yaponiyadagi birinchi tezyurar temir yoʻl liniyasi qachon ochilgan?',
                'options' => ['1945-yilda', '1960-yillarda', '1975-yillarda'],
                'correct_option' => 1
            ],
            [
                'text' => '1960-yilda Yaponiyada ochilgan birinchi tezyurar poyezd liniyasida harakatlangan poyezdning tezligi qancha edi?',
                'options' => ['210 km/soat', '220 km/soat', '230 km/soat'],
                'correct_option' => 0
            ],
            [
                'text' => 'Britaniyalik muhandis Richard Trevitik nechanchi yilda bugʻ dvigatelini vagonga ulashga harakat qildi?',
                'options' => ['1903-yil', '1936-yil', '1804-yil'],
                'correct_option' => 2
            ],
            [
                'text' => 'Nemis muhandisi Rudolf Dizel suyuq yoqilgʻida ishlaydigan dizel dvigatelini nechinchi yilda ixtiro qildi?',
                'options' => ['1892-yilda', '1982-yilda', '1829-yilda'],
                'correct_option' => 0
            ],
            [
                'text' => 'Birinchi ilk dizelli yoʻlovchi poyezdlari nima deb atalgan?',
                'options' => ['Xavsiz kema', 'Uchuvchi gamburger', 'Uchar jangchi'],
                'correct_option' => 1
            ],
            [
                'text' => 'Dunyodagi eng katta samosvallar necha metr?',
                'options' => ['10 metr', '9 metr', '8 metr'],
                'correct_option' => 2
            ],
            [
                'text' => 'Dunyodagi eng katta 8 metrli samosvallar necha tonna yukni koʻtarishi mumkin?',
                'options' => ['100 tonna', '500 tonna', '1000 tonna'],
                'correct_option' => 1
            ],
            [
                'text' => 'Eng katta gidravlik qazish mashinalarining ogʻirligi qancha?',
                'options' => ['980 tonna', '1500 tonna', '2000 tonna'],
                'correct_option' => 0
            ],
            [
                'text' => 'Bugungi kundagi traktorlar ixtirosi qachon boshlangan?',
                'options' => ['18-asr oxirida', '19-asr oxirida', '20-asr oxirida'],
                'correct_option' => 1
            ],
            [
                'text' => 'Ferma atrofidagi otlarning ishini bajarish vazifasini oʻtovchi birinchi traktorlar nechanchi yilda ixtiro qilingan?',
                'options' => ['1945-yilda', '1936-yilda', '1860-yilda'],
                'correct_option' => 2
            ],
            [
                'text' => 'Bugati Veyron 16.4 Super Sport soatiga necha kilometr tezlikka erishadi?',
                'options' => ['434 km/soat', '330 km/soat', '220 km/soat'],
                'correct_option' => 0
            ],
            [
                'text' => 'Birinchi avtomobillar qachon ixtiro qilingan?',
                'options' => ['130 yildan koʻproq vaqt oldin', '100 yildan koʻproq vaqt oldin', '90 yildan koʻproq vaqt oldin'],
                'correct_option' => 0
            ],
            [
                'text' => 'Manfiy raqamlar bu-',
                'options' => ['Oʻzgarmas raqamlar', 'Noldan pastga sanaluvchi noldan kamroq raqamlar', 'Noldan tepaga sanaluvchi, noldan yuqori raqamlar'],
                'correct_option' => 1
            ],
            [
                'text' => 'Birinchi mobil telefon qayerda ishlab chiqarilgan?',
                'options' => ['Janubiy Koreyada', 'Finlandiyada', 'AQSH da'],
                'correct_option' => 2
            ],
            [
                'text' => 'Birinchi mobil telefonni kim ixtiro qildi?',
                'options' => ['Jim Kyun', 'Martin Lyuter', 'Martin Kuper'],
                'correct_option' => 2
            ],

            [
                'text' => 'Elektron televizorning birinchi shaklini kim yaratgan?',
                'options' => ['Maykl Jordan', 'Filipp Farnsvort', 'Pavel Morozov'],
                'correct_option' => 1
            ],
            [
                'text' => 'Elektron televizorning birinchi shaklini yaratgan ixtirochi qayerlik boʻlgan?',
                'options' => ['Angliyalik', 'Rossiyalik', 'Amerikalik'],
                'correct_option' => 2
            ],
            [
                'text' => 'Amneziya nima?',
                'options' => [
                    'Bu jismoniy yoki hissiy jarohat (travma) tufayli xotirani yoʻqotishdir',
                    'Faqat raqamlarni yodda tutolmaslik',
                    'Faqat ismlarni esdan chiqarish'
                ],
                'correct_option' => 0
            ],
            [
                'text' => 'Fuziform qanday mushak turi hisoblanadi?',
                'options' => ['Doiraviy mushak', 'Tasmasimon mushak', 'Ikki boshli mushak'],
                'correct_option' => 2
            ],
            [
                'text' => 'Yuzda nechta muskul bor?',
                'options' => ['42 ta', '43 ta', '44 ta'],
                'correct_option' => 1
            ],
            [
                'text' => 'Kattalardagi skelet nechta suyakdan iborat?',
                'options' => ['106 ta', '206 ta', '306 ta'],
                'correct_option' => 1
            ],
            [
                'text' => 'Chaqaloqlar nechta suyak bilan tugʻiladi?',
                'options' => ['100 dan ortiq', '200 dan ortiq', '300 dan ortiq'],
                'correct_option' => 2
            ],
            [
                'text' => 'Bosh suyak necha xil suyakdan iborat?',
                'options' => ['22 xil', '23 xil', '24 xil'],
                'correct_option' => 0
            ],
            [
                'text' => 'Koʻzlarni nazorat qiluvchi mushaklar bir kunda necha marta harakat qiladi?',
                'options' => ['100.000 marta', '90.000 marta', '80.000 marta'],
                'correct_option' => 0
            ],
            [
                'text' => 'Bir choy qoshiq tuproq qancha bakteriya va zamburugʻdan iborat?',
                'options' => [
                    'Bir million bakteriya va 1200 zamburugʻdan',
                    'Oʻn million bakteriya va 12000 zamburugʻdan',
                    'Bir milliard bakteriya va 120.000 zamburugʻdan'
                ],
                'correct_option' => 2
            ],
            [
                'text' => 'Inson organizmining 96 foizi atigi 4 elementdan tashkil topgan bular nimalar?',
                'options' => [
                    'Atom, molekula, hujayra va suyak',
                    'Mushak, qon, suv va havo',
                    'Kislorod, uglerod, vodorod, azot'
                ],
                'correct_option' => 2
            ],
            [
                'text' => 'Rus olimi Dmitry Mendelev nechanchi yilda davriy jadvalni tuzgan?',
                'options' => ['1869-yilda', '1879-yilda', '1889-yilda'],
                'correct_option' => 0
            ],
            [
                'text' => 'Necha daqiqalik quyosh nuri butun dunyoni bir yillik energiya bilan ta’minlashga yetadi?',
                'options' => ['100 daqiqalik', '10 daqiqalik', '1 daqiqalik'],
                'correct_option' => 2
            ],
            [
                'text' => 'Atom nimalardan tashkil topgan?',
                'options' => ['Proton, kislorod, neytron', 'Proton, neytron, elektron', 'Proton, neytron, uglerod'],
                'correct_option' => 1
            ],
            [
                'text' => 'Chaqmoq elektr toki elanligini, unda musbat va manfiy zaryadlar borligini kim aniqlagan?',
                'options' => ['Maykl Faraday', 'Nikola Tesla', 'Benjamin Franklin'],
                'correct_option' => 2
            ],
            [
                'text' => 'Ovoz yozuvchi (Fonograf) va kino kamerasini ixtiro qilgan olim kim?',
                'options' => ['Tomas Edison', 'Nikola Tesla', 'Maykl Faraday'],
                'correct_option' => 0
            ],
            [
                'text' => 'Quyosh tizimidagi eng katta sayyora qaysi?',
                'options' => ['Mars', 'Neptun', 'Yupiter'],
                'correct_option' => 2
            ],
            [
                'text' => 'Yupiter hajmi boʻyicha yer sayyorasidan nechtasini oʻziga sigʻdira oladi?',
                'options' => ['100 ga yaqin', '1300 ga yaqin', '3100 ga yaqin'],
                'correct_option' => 1
            ],
            [
                'text' => 'Quyosh tizimidagi ikkinchi eng katta sayyora qaysi?',
                'options' => ['Merkuriy', 'Venera', 'Saturn'],
                'correct_option' => 2
            ],
            [
                'text' => 'Quyosh yerdan necha marotaba katta?',
                'options' => ['Katta emas', 'Yuz ming marta', 'Bir million marta'],
                'correct_option' => 2
            ],
            [
                'text' => 'Atmosferasi metanga boyligi sababli koʻk rangda tuslanib turadigan, "Ulkan muzlik" deb ham ataladigan sayyora qaysi?',
                'options' => ['Uran', 'Neptun', 'Mars'],
                'correct_option' => 0
            ],
            [
                'text' => 'Uran sayyorasi nimalardan iborat?',
                'options' => [
                    '80% azot, kislorod va vodoroddan',
                    '80% muzlatilgan metan, suv va ammiakdan',
                    '70% vodorod, geliy va kremniydan'
                ],
                'correct_option' => 1
            ],
            [
                'text' => 'Yer Quyosh atrofida qancha tezlikda aylanadi?',
                'options' => ['Soatiga 30 km tezlikda', 'Daqiqasiga 30 km tezlikda', 'Sekundiga 30 km tezlikda'],
                'correct_option' => 2
            ],
            [
                'text' => '1 yorug‘lik tezligi-',
                'options' => [
                    'Yorug‘lik tezligining 1 yil tinimsiz aylanish masofasiga teng, deyarli 1 milliard km masofaga barobar',
                    'Yorug‘lik tezligining 1 yil tinimsiz aylanish masofasiga teng, deyarli 1 trillion km masofaga barobardir',
                    'Yorug‘lik tezligining 1 yil tinimsiz aylanish masofasiga teng, deyarli 10 trillion km masofaga barobar'
                ],
                'correct_option' => 2
            ],
            [
                'text' => 'Olimlarning fikricha koinotning qancha qismi boʻshliqdan iborat?',
                'options' => ['99.99% qismi', '78 % qismi', '60 % qismi'],
                'correct_option' => 0
            ],
            [
                'text' => 'Yerdagi sudralib yuruvchilarning eng katta guruhi bu-',
                'options' => ['Ilonlar', 'Kaltakesaklar', 'Toshbaqalar'],
                'correct_option' => 1
            ],

            [
                'text' => 'Qaysi dengiz hayvonining erkagi, urug‘langan tuxumlarni tuxumdonida olib yuradi?',
                'options' => ['Qisqichbaqa', 'Dengiz oti', 'Dengiz toshbaqasi'],
                'correct_option' => 1
            ],
            [
                'text' => 'Quruqlik shilliqurtlarining uzunligi qancha?',
                'options' => ['40 s.m', '30 s.m', '20 s.m'],
                'correct_option' => 1
            ],
            [
                'text' => 'Quruqlik shilliqurtlari ogʻirligi qancha?',
                'options' => ['1.5 k.g gacha', '500 g.r gacha', '900 g.r gacha'],
                'correct_option' => 2
            ],
            [
                'text' => 'Hasharotlar necha yil oldin uchishni oʻrgangan birinchi hayvonlar hisoblanadi?',
                'options' => ['400 ming yil avval', '400 million yil avval', '4 million yil avval'],
                'correct_option' => 1
            ],
            [
                'text' => 'Oʻrgimchaklarning qancha turi mavjud?',
                'options' => ['2400 ga yaqin', '4200 ga yaqin', '1000 ga yaqin'],
                'correct_option' => 1
            ],
            [
                'text' => 'Televizor tasvirini uzatgan birinchi odamning ismi nima?',
                'options' => ['Jon Logie Baird', 'Artur Konan Doyl', 'Ser Alex Ferguson'],
                'correct_option' => 0
            ],
            [
                'text' => 'Televizor tasviri birinchi marta qachon uzatilgan?',
                'options' => ['1923-yil', '1936-yil', '1941-yil'],
                'correct_option' => 0
            ]
        ];

        foreach ($questions as $question) {
            Question::create([
                'text' => $question['text'],
                'options' => $question['options'],
                'correct_option' => $question['correct_option']
            ]);
        }
    }
}
