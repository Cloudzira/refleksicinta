/* Isi jurnal per kondisi hati. Untuk menambah kondisi baru, salin satu blok dan ubah isinya.
   Format hari: [tema, renungan, langkah kecil, doa] (harus 7 hari) */
window.JURNAL_KONDISI = [
  { id: 'patah', nama: 'Patah Hati', ket: 'Kehilangan, ditinggalkan, atau cinta yang tak sampai.',
    intro: 'Patah hati bukan kelemahan. Itu tanda bahwa kamu pernah sungguh-sungguh menyayangi. Tujuh hari ini menemanimu merapikan rasa, pelan-pelan.',
    hari: [
      ['Menamai Rasa', 'Apa yang sebenarnya sedang kurasakan hari ini, tanpa menyalahkan siapa pun, termasuk diriku?', 'Tulis tiga kata yang paling jujur menggambarkan hatimu hari ini.', 'Ya Allah, ajari aku jujur pada hatiku sendiri.'],
      ['Menyerahkan', 'Apa yang kugenggam terlalu erat: harapan, ketakutan, atau seseorang?', 'Tulis satu hal yang ingin kamu serahkan kepada Allah hari ini.', 'Ya Allah, ini bukan lagi bebanku sendirian.'],
      ['Melepas', 'Adakah yang terus kuikuti, padahal lebih baik kudoakan saja?', 'Satu hari tanpa mengecek kabar atau media sosialnya. Gantilah dengan satu doa untuknya.', 'Ya Allah, jaga dia, dan jaga hatiku dari terus mengejar.'],
      ['Menjaga Diri', 'Apa yang akhir-akhir ini mendekatkanku kepada Allah, dan apa yang menjauhkan?', 'Pilih satu ibadah kecil dan lakukan hari ini, misalnya sholat sunnah dua rakaat atau membaca beberapa ayat Al-Qur’an.', 'Ya Allah, dekatkan aku kepada-Mu, apa pun yang terjadi pada hatiku.'],
      ['Mensyukuri yang Tinggal', 'Siapa yang tetap ada di sisiku, bahkan saat aku sedang tidak baik-baik saja?', 'Kirim pesan terima kasih kepada satu orang.', 'Ya Allah, terima kasih untuk yang Kau tinggalkan di sisiku.'],
      ['Memaafkan', 'Apa yang ingin kumaafkan: seseorang, keadaan, atau diriku sendiri?', 'Tulis surat yang tidak akan kamu kirim. Lalu simpan atau sobek, sesukamu.', 'Ya Allah, ringankan hatiku dari rasa yang tak lagi kubutuhkan.'],
      ['Pulang', 'Cinta seperti apa yang ingin kutuju, dan siapa diriku di dalamnya?', 'Tulis satu niat untuk hatimu ke depan.', 'Ya Allah, tuntun aku pulang kepada-Mu, bersama atau tanpa siapa pun.']
    ] },
  { id: 'sedih', nama: 'Kesedihan', ket: 'Hati terasa berat, murung, atau ingin menangis.',
    intro: 'Sedih tidak perlu buru-buru dihilangkan. Ia perlu didengar. Tujuh hari ini memberi ruang agar sedihmu boleh hadir, lalu perlahan reda.',
    hari: [
      ['Mengakui Sedih', 'Apa yang membuatku sedih, dan sudahkah aku mengizinkan diriku merasakannya?', 'Duduk tenang lima menit, tarik napas pelan, lalu sebutkan sedihmu dengan jujur.', 'Ya Allah, aku sedih, dan aku datang kepada-Mu apa adanya.'],
      ['Menumpahkan', 'Apa yang selama ini kutahan sendiri sampai terasa sesak?', 'Tulis atau ceritakan satu hal yang kamu pendam kepada orang yang kamu percaya.', 'Ya Allah, lapangkan dadaku dan kuatkan aku untuk bercerita.'],
      ['Merawat Tubuh', 'Bagaimana tidur, makan, dan gerak tubuhku akhir-akhir ini?', 'Minum air putih, makan sesuatu yang hangat, lalu berjalan kaki sebentar.', 'Ya Allah, kuatkan tubuh ini agar hatiku punya tempat berpijak.'],
      ['Mendekat', 'Saat sedih, ke mana aku biasanya lari, dan apakah itu menenangkanku?', 'Sholat dua rakaat dan sampaikan sedihmu dalam sujud.', 'Ya Allah, kepada-Mu kuadukan sedih dan gundahku.'],
      ['Melihat yang Masih Ada', 'Hal kecil apa yang masih bisa membuatku tersenyum?', 'Catat tiga hal kecil yang kamu syukuri hari ini.', 'Ya Allah, bukakan mataku pada nikmat yang masih tinggal.'],
      ['Berdamai', 'Apa yang sulit kuterima, dan apa yang sebenarnya bisa kuubah?', 'Pisahkan di kertas: yang bisa kuubah dan yang harus kuikhlaskan.', 'Ya Allah, beri aku tenang menerima dan tegar berikhtiar.'],
      ['Bangkit Pelan-pelan', 'Satu langkah kecil apa yang sanggup kulakukan esok hari?', 'Tulis satu rencana kecil untuk besok dan satu orang yang bisa kamu hubungi.', 'Ya Allah, tuntun langkah kecilku, aku percaya Engkau bersamaku.']
    ] },
  { id: 'kecewa', nama: 'Kekecewaan', ket: 'Harapan yang tidak terwujud atau dikecewakan seseorang.',
    intro: 'Kecewa muncul karena kamu pernah berharap, dan itu manusiawi. Tujuh hari ini membantumu mengurai harapan dan menemukan pelajaran di baliknya.',
    hari: [
      ['Menamai Kecewa', 'Apa yang kuharapkan, dan apa yang sebenarnya terjadi?', 'Tulis dua kalimat: “Aku berharap…” dan “Ternyata…”.', 'Ya Allah, aku kecewa, jaga hatiku agar tetap lurus.'],
      ['Mengurai Harapan', 'Harapan mana yang wajar, dan mana yang kugantungkan terlalu tinggi pada manusia?', 'Pilih satu harapan yang ingin kamu titipkan kepada Allah.', 'Ya Allah, kepada-Mu sebaik-baik tempat bergantung.'],
      ['Mencari Hikmah', 'Jika ini bukan akhir cerita, pelajaran apa yang mungkin sedang dititipkan?', 'Tulis satu kemungkinan hikmah, walau belum yakin.', 'Ya Allah, tunjukkan kebaikan di balik yang tak sesuai harapanku.'],
      ['Meredakan Marah', 'Adakah kesal yang masih tersimpan di dadaku?', 'Tulis semua kesalmu tanpa disaring, lalu tarik napas dalam tiga kali.', 'Ya Allah, redakan panas di hatiku.'],
      ['Memaafkan', 'Siapa atau apa yang ingin kumaafkan, termasuk diriku?', 'Ucapkan pelan satu kali: “Aku memilih melepaskan ini.”', 'Ya Allah, ringankan hatiku dari beban yang tak perlu kubawa.'],
      ['Menata Ulang', 'Bagian mana dari rencanaku yang masih bisa kuperjuangkan?', 'Tulis satu rencana cadangan yang lebih realistis.', 'Ya Allah, bimbing aku menata ulang langkah.'],
      ['Berharap Kembali', 'Harapan baru seperti apa yang pantas kuberi ruang, dengan hati yang lebih bijak?', 'Tulis satu harapan baru dan serahkan hasilnya kepada Allah.', 'Ya Allah, ajari aku berharap tanpa lupa bahwa Engkau yang menentukan.']
    ] },
  { id: 'takut', nama: 'Ketakutan & Cemas', ket: 'Khawatir berlebihan, takut gagal, atau gelisah tanpa sebab jelas.',
    intro: 'Rasa takut adalah alarm yang kadang berbunyi terlalu keras. Tujuh hari ini membantumu menenangkan napas, memilah fakta dari bayangan, dan melangkah kecil.',
    hari: [
      ['Menamai Takut', 'Apa yang sebenarnya kutakutkan, dan sejak kapan rasa ini ada?', 'Tulis satu ketakutan dalam satu kalimat pendek.', 'Ya Allah, aku takut, temani aku.'],
      ['Menenangkan Napas', 'Di bagian tubuh mana rasa takutku terasa?', 'Tarik napas empat hitungan, tahan sebentar, hembuskan enam hitungan. Ulangi lima kali.', 'Ya Allah, turunkan ketenangan ke dalam dadaku.'],
      ['Memeriksa Kenyataan', 'Mana yang sudah terjadi, dan mana yang baru kubayangkan?', 'Bagi kertas jadi dua kolom: “fakta” dan “bayangan”.', 'Ya Allah, jauhkan aku dari prasangka yang menyiksa.'],
      ['Bertawakal', 'Apa yang di luar kendaliku dan perlu kuserahkan?', 'Setelah berikhtiar satu hal, ucapkan “Hasbunallah wa ni’mal wakil”.', 'Ya Allah, cukuplah Engkau bagiku.'],
      ['Mengingat Keberanian', 'Kapan aku pernah takut, tetapi tetap berhasil melaluinya?', 'Tulis satu pengalaman saat kamu berhasil melewati rasa takut.', 'Ya Allah, terima kasih pernah menguatkanku, kuatkan lagi.'],
      ['Langkah Terkecil', 'Langkah paling kecil apa yang bisa kuambil menghadapi takutku?', 'Lakukan satu langkah yang hanya butuh lima menit.', 'Ya Allah, mudahkan langkah kecilku.'],
      ['Berjalan Bersama Takut', 'Bagaimana aku ingin hidup, meski takut sesekali masih datang?', 'Tulis satu kalimat penguat untuk dirimu saat takut datang lagi.', 'Ya Allah, jadikan takutku sebab aku makin dekat kepada-Mu.']
    ] },
  { id: 'introvert', nama: 'Introvert', ket: 'Mudah lelah di keramaian dan butuh waktu sendiri.',
    intro: 'Menjadi introvert bukan kekurangan. Kamu hanya mengisi tenaga dengan cara yang berbeda. Tujuh hari ini membantumu berdamai dengan diri dan menjaga batas dengan lembut.',
    hari: [
      ['Mengenali Diri', 'Apa yang mengisi tenagaku, dan apa yang menguras?', 'Tulis dua hal yang mengisi dan dua hal yang menguras tenagamu.', 'Ya Allah, ajari aku mengenali diriku seperti Engkau menciptakannya.'],
      ['Menghargai Sunyi', 'Kapan sunyi terasa menenangkan, dan kapan terasa mengasingkan?', 'Luangkan 15 menit sunyi tanpa gawai.', 'Ya Allah, jadikan sunyiku ruang untuk mengingat-Mu.'],
      ['Batas yang Sehat', 'Kapan aku perlu berkata “tidak” atau “nanti dulu” dengan lembut?', 'Siapkan satu kalimat sopan untuk menolak ajakan saat butuh sendiri.', 'Ya Allah, beri aku keberanian menjaga batas dengan santun.'],
      ['Kekuatan Diam', 'Kekuatan apa yang kumiliki sebagai pendengar dan pengamat?', 'Tulis satu momen saat sikap tenangmu membantu orang lain.', 'Ya Allah, aku bersyukur atas hati yang peka.'],
      ['Menjalin Pelan', 'Siapa satu orang yang membuatku nyaman untuk dekat?', 'Kirim pesan singkat atau ajakan ngobrol santai kepada orang itu.', 'Ya Allah, dekatkan aku dengan orang-orang yang menenangkan.'],
      ['Bersuara', 'Apa yang ingin kusampaikan, tetapi selama ini kusimpan?', 'Tulis satu pendapat atau perasaan, lalu bagikan jika terasa aman.', 'Ya Allah, mudahkan lisanku menyampaikan yang baik.'],
      ['Nyaman Menjadi Aku', 'Bagaimana aku ingin menjalani hidup sebagai diriku yang tenang?', 'Tulis satu kebiasaan yang ingin kamu jaga sebagai dirimu.', 'Ya Allah, terima kasih telah menciptakanku apa adanya.']
    ] },
  { id: 'pemalu', nama: 'Pemalu', ket: 'Sulit memulai, takut dinilai, atau canggung di depan orang.',
    intro: 'Rasa malu bisa menjaga, bisa pula menahan. Tujuh hari ini melatihmu berani sedikit demi sedikit, tanpa memaksa diri menjadi orang lain.',
    hari: [
      ['Menamai Malu', 'Dalam situasi apa malu paling sering muncul, dan apa yang kupikirkan saat itu?', 'Tulis satu situasi terakhir saat kamu merasa malu.', 'Ya Allah, lembutkan hatiku terhadap rasa maluku.'],
      ['Malu yang Baik', 'Mana malu yang menjagaku, dan mana malu yang menahan kebaikanku?', 'Tandai dua jenis malu itu di tulisanmu.', 'Ya Allah, jaga malu yang mulia dan lepaskan malu yang menghambat.'],
      ['Pikiran Orang Lain', 'Seberapa yakin aku bahwa orang lain memperhatikan kekuranganku?', 'Tulis satu pikiran “mereka pasti menilaiku”, lalu satu penjelasan lain yang lebih ramah.', 'Ya Allah, bebaskan aku dari takut pada penilaian manusia.'],
      ['Menerima Diri', 'Apa yang kusukai dari diriku, sekecil apa pun?', 'Tulis tiga hal baik tentang dirimu.', 'Ya Allah, ajari aku mensyukuri diriku.'],
      ['Menyapa', 'Siapa yang bisa kusapa hari ini dengan ringan?', 'Ucapkan satu salam atau senyum kepada orang yang kamu temui.', 'Ya Allah, mudahkan aku menebar salam.'],
      ['Berlatih Berani', 'Hal kecil apa yang ingin kulakukan, tetapi tertahan oleh malu?', 'Lakukan satu hal kecil itu, misalnya bertanya atau berpendapat satu kalimat.', 'Ya Allah, beri aku keberanian yang lembut.'],
      ['Maju Perlahan', 'Apa yang sudah bergeser dalam diriku minggu ini?', 'Rayakan satu keberanian kecilmu, lalu tulis tantangan kecil untuk pekan depan.', 'Ya Allah, kuatkan langkahku dan terimalah usahaku.']
    ] },
  { id: 'sepi', nama: 'Kesepian', ket: 'Merasa sendiri, tidak dimengerti, atau jauh dari orang lain.',
    intro: 'Sepi bisa terasa nyata walau di tengah banyak orang. Tujuh hari ini membantumu mengenali sepimu, lalu pelan-pelan membuka pintu untuk kehangatan.',
    hari: [
      ['Mengakui Sepi', 'Kapan sepi paling terasa, dan apa sebenarnya yang kurindukan?', 'Tulis satu kata untuk sepimu hari ini.', 'Ya Allah, aku sepi, dan Engkau tidak pernah jauh.'],
      ['Sendiri, Bukan Sepi', 'Apa bedanya sendirian dan kesepian bagiku?', 'Habiskan 20 menit sendirian dengan sesuatu yang kamu sukai.', 'Ya Allah, jadikan waktu sendiriku penuh ketenangan.'],
      ['Mengingat Kehangatan', 'Siapa yang pernah membuatku merasa diterima?', 'Tulis tiga nama yang pernah terasa hangat bagimu.', 'Ya Allah, terima kasih atas orang-orang yang pernah Kau hadirkan.'],
      ['Mendekat kepada Allah', 'Dalam doa seperti apa aku merasa paling ditemani?', 'Sholat sunnah, lalu ceritakan harimu kepada Allah.', 'Ya Allah, hadirkan ketenangan karena Engkau selalu dekat.'],
      ['Menghubungi', 'Siapa yang mungkin juga sedang ingin dihubungi?', 'Kirim kabar kepada satu teman atau keluarga.', 'Ya Allah, hangatkan hubunganku dengan sesama.'],
      ['Mencari Ruang', 'Kegiatan atau komunitas apa yang terasa cocok untukku?', 'Cari satu kegiatan, pengajian, atau komunitas yang ingin kamu datangi.', 'Ya Allah, pertemukan aku dengan majelis yang baik.'],
      ['Menghadirkan Hangat', 'Bagaimana aku bisa menjadi kehangatan bagi orang lain?', 'Lakukan satu kebaikan kecil untuk seseorang.', 'Ya Allah, jadikan aku sebab ketenangan bagi sesama.']
    ] },
  { id: 'marah', nama: 'Kemarahan', ket: 'Mudah tersulut, kesal berkepanjangan, atau dada terasa panas.',
    intro: 'Marah adalah rasa yang wajar, sering lahir dari hal yang kita pedulikan. Tujuh hari ini membantumu meredakan panas di dada, memahami sumbernya, dan memilih respons yang tidak kamu sesali.',
    hari: [
      ['Menamai Marah', 'Apa yang membuatku marah, dan apa yang sebenarnya terluka di balik marah ini?', 'Tulis satu kalimat tanpa disaring: “Aku marah karena…”.', 'Ya Allah, aku marah, tolong jaga lisan dan tanganku.'],
      ['Menjeda', 'Apa yang biasanya kulakukan saat marah memuncak, dan apakah aku menyesalinya sesudahnya?', 'Latih jeda: ucapkan “A’udzu billahi minasy syaithanir rajim”, lalu tarik napas dalam sebelum bicara atau membalas pesan.', 'Ya Allah, lindungi aku dari bisikan yang menyulut amarah.'],
      ['Mendinginkan Tubuh', 'Bagaimana tubuhku bereaksi saat marah: rahang, dada, atau genggaman tangan?', 'Berwudhu, atau ubah posisi: duduk jika sedang berdiri, berbaring jika sedang duduk.', 'Ya Allah, dinginkan dadaku dan lembutkan hatiku.'],
      ['Menemukan Akar', 'Adakah lelah, lapar, kecewa, atau rasa tidak dihargai yang menumpuk di bawah marahku?', 'Tulis dua hal yang sebenarnya kamu butuhkan saat ini, misalnya didengar, dihargai, atau istirahat.', 'Ya Allah, tunjukkan akar rasaku agar aku bisa mengobatinya.'],
      ['Bicara dengan Tenang', 'Apa yang ingin kusampaikan kepada orang yang membuatku marah, tanpa menyakiti?', 'Susun satu kalimat: “Aku merasa… karena… Aku berharap…”. Sampaikan jika sudah tenang, atau cukup simpan.', 'Ya Allah, anugerahkan aku kata-kata yang lembut dan jujur.'],
      ['Memaafkan', 'Apa yang kupegang dari kemarahan ini, dan apa harganya bagi ketenangan hatiku?', 'Pilih satu kesalahan kecil untuk dimaafkan, atau doakan kebaikan untuk orang itu.', 'Ya Allah, ampuni aku dan lapangkan hatiku untuk memaafkan.'],
      ['Menjadi Tenang', 'Aku ingin dikenal sebagai orang yang bagaimana saat sedang marah?', 'Tulis tiga langkah pribadimu saat amarah datang lagi.', 'Ya Allah, jadikan aku orang yang mampu menahan marah dan mudah memaafkan.']
    ] },
  { id: 'lelah', nama: 'Kelelahan', ket: 'Letih badan dan hati, kehabisan tenaga, atau tidak sempat istirahat.',
    intro: 'Lelah bukan tanda kamu lemah. Sering kali itu tanda kamu sudah lama memberi tanpa sempat diisi ulang. Tujuh hari ini mengajakmu berhenti sejenak, mengakui lelahmu, dan memulihkan tenaga pelan-pelan.',
    hari: [
      ['Mengakui Lelah', 'Lelah seperti apa yang kurasakan: tubuh, pikiran, atau hati?', 'Beri nilai 1 sampai 10 untuk lelahmu hari ini, lalu tulis tiga hal yang paling menguras tenaga.', 'Ya Allah, aku lelah, dan aku datang kepada-Mu.'],
      ['Memberi Hak Tubuh', 'Bagaimana tidur, makan, dan minumku akhir-akhir ini?', 'Tidur lebih awal malam ini, matikan layar 30 menit sebelumnya, dan minum air putih yang cukup.', 'Ya Allah, berkahi istirahatku dan pulihkan tubuhku.'],
      ['Meringankan Beban', 'Apa yang kupikul padahal bisa dikurangi, ditunda, atau dibagi?', 'Coret atau tunda satu tugas yang tidak mendesak hari ini.', 'Ya Allah, ringankan bebanku dan tunjukkan mana yang memang perlu kupikul.'],
      ['Istirahat Bersama Allah', 'Kapan terakhir kali ibadahku terasa menenangkan, bukan sekadar kewajiban yang terburu-buru?', 'Sholat tanpa tergesa-gesa, lalu duduk sebentar berdzikir dengan tenang.', 'Ya Allah, jadikan sholatku penyejuk dan tempat istirahat bagi jiwaku.'],
      ['Berkata Tidak', 'Permintaan siapa yang sulit kutolak, padahal tenagaku sedang habis?', 'Tolak dengan sopan, atau minta waktu, untuk satu permintaan.', 'Ya Allah, beri aku keberanian menjaga batas tanpa menyakiti.'],
      ['Mengisi Ulang', 'Apa yang biasanya memulihkanku: alam, sunyi, canda, atau kegiatan tangan?', 'Luangkan 30 menit untuk satu hal yang mengisi tenagamu, tanpa rasa bersalah.', 'Ya Allah, bukakan jalan kegembiraan yang halal dan menenangkan.'],
      ['Ritme yang Ramah', 'Seperti apa ritme hari yang ingin kujalani agar tidak terus kehabisan tenaga?', 'Tulis satu kebiasaan istirahat yang akan kamu jaga. Jika lelah terasa berkepanjangan, pertimbangkan memeriksakan diri ke tenaga kesehatan.', 'Ya Allah, bimbing aku hidup seimbang antara berusaha dan beristirahat.']
    ] },
  { id: 'rendahdiri', nama: 'Rendah Diri', ket: 'Merasa tidak cukup baik, sering membandingkan diri, atau ragu pada kemampuan sendiri.',
    intro: 'Suara yang berkata “aku tidak cukup” sering terdengar seperti kebenaran, padahal ia hanya suara. Tujuh hari ini membantumu mengenalinya, lalu belajar memandang dirimu dengan lebih adil dan lembut.',
    hari: [
      ['Mengenali Suara Batin', 'Kalimat apa yang paling sering kuucapkan tentang diriku sendiri?', 'Tulis tiga kalimat negatif yang sering muncul di kepalamu, apa adanya.', 'Ya Allah, bukakan mataku pada cara aku memandang diriku.'],
      ['Berhenti Membandingkan', 'Dengan siapa aku sering membandingkan diri, dan apa yang tidak terlihat dari hidup mereka?', 'Kurangi satu sumber perbandingan hari ini, misalnya berhenti menggulir media sosial selama satu jam.', 'Ya Allah, jauhkan aku dari iri dan lapangkan hatiku mensyukuri bagianku.'],
      ['Memeriksa Kebenaran', 'Apakah kalimat negatif itu fakta, atau penilaian yang terlalu keras?', 'Ambil satu kalimat negatif, lalu tulis bukti yang mendukung dan bukti yang menentangnya.', 'Ya Allah, jauhkan aku dari prasangka buruk, termasuk kepada diriku sendiri.'],
      ['Diciptakan dengan Maksud', 'Apa yang kuyakini tentang diriku sebagai makhluk yang Allah ciptakan dengan sebaik-baik bentuk?', 'Tulis tiga hal baik pada dirimu: sifat, kemampuan, atau kebiasaan.', 'Ya Allah, terima kasih telah menciptakanku dengan sebaik-baik bentuk.'],
      ['Berbicara Lembut', 'Bagaimana aku akan berbicara kepada sahabat yang merasakan hal yang sama denganku?', 'Pilih satu kalimat negatif, lalu ganti dengan kalimat yang akan kamu ucapkan kepada sahabatmu.', 'Ya Allah, lembutkan suara batinku kepada diriku sendiri.'],
      ['Menerima Pujian', 'Pujian apa yang pernah kutolak karena merasa tidak pantas?', 'Saat ada yang memuji, cukup jawab “terima kasih” tanpa membantahnya.', 'Ya Allah, ajari aku menerima kebaikan dengan rendah hati dan penuh syukur.'],
      ['Melangkah Meski Belum Sempurna', 'Apa satu hal yang kutunda karena merasa belum cukup layak?', 'Lakukan versi terkecil dari hal itu hari ini, lalu catat satu hal yang kamu pelajari.', 'Ya Allah, kuatkan langkahku, dan ingatkan aku bahwa nilaiku tidak ditentukan oleh penilaian manusia.']
    ] },
  { id: 'sesal', nama: 'Penyesalan', ket: 'Terbayang kesalahan masa lalu, atau menyalahkan diri atas keputusan yang sudah terjadi.',
    intro: 'Menyesal menandakan hati yang masih hidup. Tujuh hari ini menuntunmu dari menyalahkan diri menuju belajar dan memperbaiki, tanpa terjebak di masa lalu.',
    hari: [
      ['Menamai Sesal', 'Apa yang kusesali, dan apa yang sebenarnya terjadi saat itu?', 'Tulis singkat satu kejadian yang paling kusesali, tanpa menghakimi.', 'Ya Allah, aku menyesal, dan aku kembali kepada-Mu.'],
      ['Membedakan Rasa', 'Apakah aku menyesal karena ingin memperbaiki, atau sekadar menghukum diri?', 'Buat dua kolom: “Pelajaran” dan “Hukuman diri”, lalu isi masing-masing.', 'Ya Allah, jauhkan aku dari putus asa atas rahmat-Mu.'],
      ['Bertaubat', 'Adakah bagian dari sesalku yang perlu kuadukan dan kumohonkan ampun?', 'Sholat taubat dua rakaat, atau ucapkan istighfar dengan penuh kesadaran.', 'Ya Allah, ampunilah aku, Engkau Maha Pengampun lagi Maha Penyayang.'],
      ['Memperbaiki', 'Adakah yang masih bisa kuperbaiki, atau kepada siapa aku perlu meminta maaf?', 'Tulis satu langkah perbaikan yang nyata, lalu lakukan atau jadwalkan hari ini.', 'Ya Allah, mudahkan aku memperbaiki yang masih bisa diperbaiki.'],
      ['Menerima yang Tak Bisa Diubah', 'Apa dari masa lalu yang tidak bisa kuubah, dan bersediakah aku mengikhlaskannya?', 'Lengkapi satu kalimat: “Aku tidak bisa mengubah… tetapi aku bisa…”.', 'Ya Allah, beri aku ketenangan menerima ketetapan-Mu dan ketegaran menatap ke depan.'],
      ['Memaafkan Diri', 'Jika orang yang kusayangi melakukan hal yang sama, bagaimana aku memperlakukannya?', 'Ucapkan pelan kepada dirimu: “Aku manusia yang belajar, dan aku memilih memaafkan diriku.”', 'Ya Allah, lapangkan hatiku memaafkan diriku, sebagaimana Engkau Maha Pemaaf.'],
      ['Berjalan Bersama Pelajaran', 'Apa yang kupelajari, dan keputusan apa yang ingin kubuat berbeda ke depan?', 'Tulis satu komitmen kecil yang realistis.', 'Ya Allah, jadikan sesalku jalan menuju kebaikan.']
    ] },
  { id: 'duka', nama: 'Kehilangan & Duka', ket: 'Ditinggal orang tersayang, atau kehilangan sesuatu yang sangat berarti.',
    intro: 'Duka adalah cinta yang kehilangan tempat berlabuh. Tidak ada cara yang benar untuk berduka, dan tidak ada jadwal yang harus dikejar. Tujuh hari ini menemanimu pelan-pelan, sesuai kemampuanmu.',
    hari: [
      ['Mengakui Kehilangan', 'Apa yang hilang dariku, dan apa yang paling kurindukan?', 'Tulis nama atau hal yang hilang itu, dan satu kenangan yang ingin kamu ingat hari ini.', 'Ya Allah, aku kehilangan, dan aku datang kepada-Mu dengan hati yang berat.'],
      ['Mengizinkan Duka', 'Bagaimana duka hadir padaku: tangis, hampa, marah, atau mati rasa?', 'Izinkan dirimu menangis atau diam tanpa dikejar-kejar, lalu tulis apa yang muncul.', 'Ya Allah, kuatkan aku saat duka datang bergelombang.'],
      ['Mengucap Istirja’', 'Apa arti bagiku bahwa segala sesuatu milik Allah dan akan kembali kepada-Nya?', 'Ucapkan pelan “Inna lillahi wa inna ilaihi raji’un”, lalu tarik napas dan rasakan maknanya.', 'Ya Allah, berilah aku pahala atas musibah ini dan gantilah dengan yang lebih baik.'],
      ['Merawat Diri', 'Bagaimana tidur, makan, dan tubuhku selama masa duka ini?', 'Makan sesuatu yang bergizi dan beristirahat cukup. Duka sangat menguras tenaga.', 'Ya Allah, jaga tubuh dan hatiku di masa yang sulit ini.'],
      ['Mengirim Doa', 'Apa yang ingin kusampaikan kepadanya, atau tentang apa yang hilang itu?', 'Jika yang pergi orang tersayang, kirimkan doa atau sedekah untuknya. Jika bukan, tulis pesan perpisahan untuk apa yang hilang.', 'Ya Allah, kasihilah dia dan limpahkan kebaikan kepada kami yang ditinggalkan.'],
      ['Berbagi Duka', 'Kepada siapa aku boleh menyandarkan sedihku?', 'Ceritakan satu kenangan atau perasaanmu kepada orang yang kamu percaya.', 'Ya Allah, hadirkan orang-orang yang menenangkanku.'],
      ['Membawa Cinta ke Depan', 'Nilai apa dari yang kuhilang yang ingin terus kubawa dalam hidupku?', 'Tulis satu kebiasaan baik atau pesan darinya yang ingin kamu lanjutkan. Jika duka terasa kian berat, jangan ragu meminta bantuan orang terdekat atau tenaga profesional.', 'Ya Allah, kuatkan aku melanjutkan hidup dengan membawa kebaikannya.']
    ] },
  { id: 'bingung', nama: 'Kebingungan Arah', ket: 'Ragu memilih, tidak tahu harus ke mana, atau merasa hidup berjalan tanpa tujuan.',
    intro: 'Bingung belum tentu tersesat. Kadang itu tanda kamu sedang berada di persimpangan dan butuh waktu menimbang. Tujuh hari ini membantumu mendengar hati, menimbang pilihan, dan melangkah dengan tenang.',
    hari: [
      ['Menamai Bingung', 'Aku bingung tentang apa sebenarnya: pekerjaan, studi, hubungan, atau hidup secara umum?', 'Tulis satu pertanyaan besar yang paling ingin kamu jawab.', 'Ya Allah, aku bingung, tunjukkan jalan yang Engkau ridhai.'],
      ['Menenangkan Pikiran', 'Apakah aku sedang berpikir jernih, atau terbawa panik dan tekanan?', 'Tunda keputusan besar hari ini, lalu berjalan kaki 10 menit tanpa gawai.', 'Ya Allah, jernihkan pikiran dan lapangkan dadaku.'],
      ['Mengenali Nilai', 'Apa yang paling berharga bagiku: iman, keluarga, ilmu, manfaat bagi orang lain, atau yang lain?', 'Tulis tiga nilai terpentingmu dan urutkan.', 'Ya Allah, tunjukkan apa yang paling bernilai di sisi-Mu.'],
      ['Menimbang Pilihan', 'Pilihan apa yang ada di hadapanku, dan apa untung ruginya masing-masing?', 'Tulis dua atau tiga pilihan beserta untung ruginya, lalu mintalah pendapat satu orang yang bijak.', 'Ya Allah, bimbing aku memilih yang terbaik.'],
      ['Beristikharah', 'Sudahkah aku memohon petunjuk, dan siapkah aku menerima jawabannya?', 'Sholat istikharah dan baca doanya, lalu lanjutkan dengan ikhtiar dan musyawarah.', 'Ya Allah, pilihkan untukku yang terbaik dan ridhakan aku dengannya.'],
      ['Mencoba Langkah Kecil', 'Langkah kecil apa yang bisa kucoba untuk mengenal lebih jauh pilihanku?', 'Ambil satu langkah percobaan, misalnya bertanya kepada orang berpengalaman atau mencoba selama sehari.', 'Ya Allah, mudahkan langkah ikhtiarku.'],
      ['Melangkah dan Bertawakal', 'Jika aku tidak harus tahu seluruh jalan, apa satu langkah berikutnya?', 'Tulis satu keputusan atau langkah berikutnya, lalu serahkan hasilnya kepada Allah.', 'Ya Allah, aku melangkah dengan ikhtiar, kepada-Mu kuserahkan hasilnya.']
    ] }
];
