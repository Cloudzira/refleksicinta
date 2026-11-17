(function () {
  'use strict';

  /* ==========================================================
     1. ISI JURNAL (ubah teks di sini kalau mau mengedit isi)
     ========================================================== */
  var KOND = (window.JURNAL_KONDISI || []).map(function (k) {
    return { id: k.id, nama: k.nama, ket: k.ket, intro: k.intro, days: k.hari.map(function (h) { return { tema: h[0], q: h[1], step: h[2], doa: h[3] }; }) };
  });
  var STARTER = ['Mulailah dengan satu kalimat: “Hari ini aku merasa…”', 'Tidak perlu rapi. Tulis apa pun yang terlintas…', 'Pelan-pelan saja. Satu kalimat pun sudah cukup…', 'Ceritakan seperti kepada sahabat yang paling kamu percaya…', 'Apa yang ingin kamu katakan hari ini? Tulis saja…', 'Kamu aman di sini. Tulis apa adanya…', 'Apa yang ingin kamu sampaikan kepada dirimu hari ini?'];
  function chosen() { for (var i = 0; i < KOND.length; i++) if (KOND[i].id === S.kondisi) return KOND[i]; return null; }
  function cond() { return chosen() || KOND[0]; }
  function days() { return cond().days; }
  var deferredPrompt = null;
  var IOS = /iphone|ipad|ipod/i.test(navigator.userAgent), STANDALONE = (window.matchMedia && matchMedia('(display-mode: standalone)').matches) || navigator.standalone;
  var N = 23; /* jumlah halaman: 0 = Pilih Kondisi Hati ... 22 = Simpan & Lanjutkan */

  /* ==========================================================
     2. PENYIMPANAN (di browser perangkat ini saja)
     ========================================================== */
  var KEY = 'jurnal-refleksi-cinta-v1';
  var S = {};
  try { S = JSON.parse(localStorage.getItem(KEY)) || {}; } catch (e) { S = {}; }
  if (!S.kondisi) { for (var q0 = 1; q0 <= 7; q0++) if (S['d' + q0 + '_text'] && S['d' + q0 + '_text'].trim()) { S.kondisi = 'patah'; break; } }
  var saveTimer, savedTimer;
  function saveNow() { try { localStorage.setItem(KEY, JSON.stringify(S)); } catch (e) {} }
  function save() {
    clearTimeout(saveTimer);
    saveTimer = setTimeout(function () {
      saveNow(); updateProg();
      if (isOpen && !busy) {
        posEl.textContent = 'Tersimpan ✓';
        clearTimeout(savedTimer); savedTimer = setTimeout(updateUI, 1400);
      }
    }, 350);
  }
  window.addEventListener('beforeunload', saveNow);
  document.addEventListener('visibilitychange', function () { if (document.hidden) saveNow(); });

  /* ==========================================================
     3. ALAT BANTU
     ========================================================== */
  function $(s) { return document.querySelector(s); }
  function esc(s) {
    return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }
  function wait(ms) { return new Promise(function (r) { setTimeout(r, ms); }); }
  function pad(n) { return (n < 10 ? '0' : '') + n; }

  /* ---------- Tanggal: disimpan sebagai YYYY-MM-DD, ditampilkan tgl/bln/thn ---------- */
  var MONTHS = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'];
  var MON3 = ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Agu', 'Sep', 'Okt', 'Nov', 'Des'];
  var WDAYS = ['Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab', 'Min'];
  var CAL = '<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3.5" y="5" width="17" height="15.5" rx="3"/><path d="M3.5 10h17M8 3v4M16 3v4"/></svg>';
  function fmtDate(iso) {
    var m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(iso || '');
    return m ? m[3] + '/' + m[2] + '/' + m[1] : '';
  }
  function parseDMY(t) {
    var m = /^(\d{2})\/(\d{2})\/(\d{4})$/.exec(t || '');
    if (!m) return '';
    var d = +m[1], mo = +m[2], y = +m[3];
    if (y < 1900 || y > 2100 || mo < 1 || mo > 12 || d < 1) return '';
    var dt = new Date(y, mo - 1, d);
    if (dt.getFullYear() !== y || dt.getMonth() !== mo - 1 || dt.getDate() !== d) return '';
    return y + '-' + pad(mo) + '-' + pad(d);
  }
  function isoOf(y, m, d) { return y + '-' + pad(m + 1) + '-' + pad(d); }
  function todayIso() { var t = new Date(); return isoOf(t.getFullYear(), t.getMonth(), t.getDate()); }
  var REDUCED = window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;
  var FLIP = REDUCED ? 10 : 900, COVER = REDUCED ? 10 : 1150;

  function dayWritten(n) { return !!(S['d' + n + '_text'] && S['d' + n + '_text'].trim()); }
  function daysDone() { var c = 0; for (var n = 1; n <= 7; n++) if (dayWritten(n)) c++; return c; }

  function ta(key, ph, mode, short) {
    var v = S[key] || '';
    if (mode === 'print') return '<div class="ta-print' + (short ? ' short' : '') + '">' + (esc(v) || '&nbsp;') + '</div>';
    return '<textarea class="lined' + (short ? ' short' : '') + '" data-k="' + key + '" aria-label="' + esc(ph) +
           '" placeholder="' + esc(ph) + '" spellcheck="false">' + esc(v) + '</textarea>';
  }
  function dateField(label, key, mode) {
    var shown = fmtDate(S[key]);
    var inner = mode === 'print'
      ? '<div class="line-input">' + (esc(shown) || '&nbsp;') + '</div>'
      : '<div class="dp-wrap"><input class="line-input dp-in" type="text" inputmode="numeric" autocomplete="off" maxlength="10" placeholder="tgl/bln/thn" data-dk="' + key +
        '" value="' + esc(shown) + '" aria-label="' + esc(label) + ' (tgl/bln/thn)">' +
        '<button type="button" class="dp-ico" data-dp="' + key + '" aria-label="Pilih tanggal ' + esc(label) + '">' + CAL + '</button></div>';
    return '<div class="field"><label>' + label + '</label>' + inner + '</div>';
  }
  function field(label, key, type, mode) {
    if (type === 'date') return dateField(label, key, mode);
    var v = S[key] || '';
    var inner = mode === 'print'
      ? '<div class="line-input">' + (esc(v) || '&nbsp;') + '</div>'
      : '<input class="line-input" type="' + type + '" data-k="' + key + '" value="' + esc(v) + '" aria-label="' + esc(label) + '">';
    return '<div class="field"><label>' + label + '</label>' + inner + '</div>';
  }
  function mood(key, mode) {
    var cur = +S[key] || 0, b = '';
    for (var n = 1; n <= 5; n++) {
      b += '<button type="button" data-mood="' + n + '" data-k="' + key + '" class="' + (cur === n ? 'on' : '') +
           '" aria-label="Hatiku ' + n + ' dari 5">' + n + '</button>';
    }
    return '<div class="mood"><span>ringan</span>' + b + '<span>berat</span></div>';
  }
  function step(key, text) {
    return '<label class="step"><input type="checkbox" data-k="' + key + '"' + (S[key] ? ' checked' : '') +
           '><span class="box"></span><span>' + esc(text) + '</span></label>';
  }
  var HEART = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 21s-7.5-4.6-9.6-9.2C.9 8.4 3 5 6.4 5c2 0 3.7 1.1 5.6 3.1C13.9 6.1 15.6 5 17.6 5 21 5 23.1 8.4 21.6 11.8 19.5 16.4 12 21 12 21z"/></svg>';

  /* ==========================================================
     4. ISI SETIAP HALAMAN
     ========================================================== */
  function body(i, mode) {
    var h = '';
    if (i === -1) {
      h += '<div style="margin:auto 0;display:flex;flex-direction:column;gap:16px;align-items:center;text-align:center">' +
        '<div class="eyebrow">Jurnal ini milik</div>' +
        (mode === 'print'
          ? '<div class="line-input owner-in">' + (esc(S.name || '') || '&nbsp;') + '</div>'
          : '<input class="line-input owner-in" type="text" maxlength="60" autocomplete="name" data-k="name" value="' + esc(S.name || '') + '" placeholder="Tulis namamu…" aria-label="Jurnal ini milik">') +
        '<div class="divider"></div>' +
        (mode === 'print' ? '' : '<p class="small">Geser ke kiri atau ketuk › untuk mulai. Namamu juga tampil di halaman “Catatan penting”.</p>') + '</div>';
    } else if (i === 0) {
      var cur = chosen();
      h += '<div class="eyebrow">Mulai dari sini</div><h2 class="h1">Apa yang sedang hatimu rasakan?</h2><div class="divider"></div>';
      h += '<p class="p sm">Pilih satu yang paling dekat dengan keadaanmu hari ini. Tidak perlu sempurna, dan kamu boleh menggantinya kapan saja. Renungan tujuh harinya akan menyesuaikan.</p>';
      if (mode === 'print') h += '<div class="lab">Kondisi hatiku</div><p class="q">' + esc(cur ? cur.nama : '-') + '</p>';
      else {
        h += '<div class="chips">';
        KOND.forEach(function (k) { h += '<button type="button" class="chip' + (cur && cur.id === k.id ? ' on' : '') + '" data-kond="' + k.id + '" aria-pressed="' + (cur && cur.id === k.id ? 'true' : 'false') + '">' + esc(k.nama) + '</button>'; });
        h += '</div>';
        h += cur ? '<p class="small" style="text-align:center">' + esc(cur.ket) + '</p>' : '<p class="small" style="text-align:center">Belum ada yang dipilih. Ketuk satu yang paling mewakili hatimu.</p>';
      }
    } else if (i === 1) {
      var c1 = chosen();
      if (!c1) {
        h += '<div class="eyebrow">Kondisi hatimu</div><h2 class="h1">Belum memilih</h2><div class="divider"></div>';
        h += '<div class="note"><p class="p">Kembali ke halaman sebelumnya untuk memilih kondisi hatimu, supaya renungannya sesuai denganmu.</p></div>';
        if (mode !== 'print') h += '<div class="chips"><button type="button" class="chip" data-goto="0">Pilih kondisi hati</button></div>';
      } else {
        h += '<div class="eyebrow">Kondisi hatimu</div><h2 class="h1">' + esc(c1.nama) + '</h2><div class="divider"></div>';
        h += '<div class="note"><p class="p">' + esc(c1.intro) + '</p></div>';
        h += '<div class="lab">Tujuh hari yang menanti</div><ol class="steps">';
        c1.days.forEach(function (d, k) { h += '<li><b>' + (k + 1) + '</b><span>' + esc(d.tema) + '</span></li>'; });
        h += '</ol>';
        if (mode !== 'print') h += '<p class="small">Ingin mengganti kondisi? <button type="button" class="chip" data-goto="0">Ubah pilihan</button></p>';
      }
    } else if (i === 2) {
      h += '<div class="eyebrow">Sebelum mulai</div><h2 class="h1">Cara memakainya</h2><div class="divider"></div>';
      h += '<ol class="steps">' +
        '<li><b>1</b><span>Sediakan 10–15 menit setiap hari, di waktu yang paling tenang bagimu. Kalau sedang sibuk, lima menit pun berarti.</span></li>' +
        '<li><b>2</b><span>Baca renungan pelan-pelan, lalu tulis apa adanya. Tidak ada jawaban yang benar atau salah, dan tidak ada yang menilaimu.</span></li>' +
        '<li><b>3</b><span>Lakukan satu langkah kecil, lalu bacakan doa pendeknya dengan hatimu sendiri.</span></li>' +
        '<li><b>4</b><span>Jujur lebih penting daripada indah. Boleh melewatkan satu hari, lanjutkan esok tanpa merasa bersalah.</span></li></ol>';
      h += '<div class="lab">Tentang doa-doa di jurnal ini</div>' +
        '<p class="p">Doa pendek di setiap halaman adalah doa pribadi yang disusun dengan bahasa sederhana, bukan doa dari riwayat tertentu. Kamu boleh mengubahnya dengan kata-katamu sendiri, dan menambahkan doa yang kamu hafal.</p>';
    } else if (i === 3) {
      h += '<div class="eyebrow">Catatan penting</div><h2 class="h1">Sebelum menulis</h2><div class="divider"></div>';
      h += '<div class="note"><p class="p">Jurnal ini adalah ruang untuk berefleksi, bukan pengganti konseling profesional maupun nasihat dari ulama. Jika hatimu terasa terlalu berat, atau muncul keinginan menyakiti diri, segera bicarakan dengan orang yang kamu percaya atau temui tenaga profesional.</p></div>';
      h += field('Jurnal ini milik', 'name', 'text', mode);
      h += '<div class="row2">' + field('Mulai', 'start', 'date', mode) + field('Selesai', 'end', 'date', mode) + '</div>';
      h += '<p class="small">Tulisanmu tersimpan di browser perangkat ini saja dan tidak dikirim ke mana pun. Unduh cadangannya di halaman terakhir agar tidak hilang saat data browser dibersihkan.</p>';
    } else if (i === 4) {
      h += '<div class="eyebrow">Niatku</div><h2 class="h1">Mengapa aku di sini</h2><div class="divider"></div>';
      h += '<div class="lab">Niatku mengikuti jurnal ini</div><div class="lined-wrap">' + ta('niat', 'Mengapa aku ingin merapikan hatiku? Tulis dengan kata-katamu sendiri…', mode) + '</div>';
      if (mode !== 'print') {
        h += '<div class="lab">Daftar isi</div><div class="chips">';
        for (var n = 1; n <= 7; n++) h += '<button type="button" class="chip' + (dayWritten(n) ? ' done' : '') + '" data-goto="' + (2 * n + 3) + '">Hari ' + n + '</button>';
        h += '<button type="button" class="chip" data-goto="19">Refleksi akhir</button></div>';
      }
    } else if (i >= 5 && i <= 18) {
      var n2 = Math.floor((i - 5) / 2) + 1, d = days()[n2 - 1];
      if (i % 2 === 1) { /* halaman kiri: renungan */
        h += '<div class="eyebrow">Hari ' + n2 + ' dari 7</div><h2 class="h1">' + esc(d.tema) + '</h2><div class="divider"></div>';
        h += '<div class="lab" style="text-align:center">Renungan</div><p class="q">' + esc(d.q) + '</p>';
        h += '<div class="lab">Langkah kecil hari ini</div>' + step('d' + n2 + '_step', d.step);
        h += '<div class="doa"><div class="lab">Doa pendek</div><p class="q">' + esc(d.doa) + '</p></div>';
      } else { /* halaman kanan: menulis */
        h += '<div class="eyebrow">Hari ' + n2 + ' · ' + esc(d.tema) + '</div>';
        h += '<div class="lab">Tuliskan perasaanmu</div><div class="lined-wrap">' + ta('d' + n2 + '_text', STARTER[n2 - 1], mode) + '</div>';
        h += '<div class="lab">Hatiku hari ini</div>' + mood('d' + n2 + '_mood', mode);
      }
    } else if (i === 19) {
      h += '<div class="eyebrow">Refleksi akhir</div><h2 class="h1">Setelah 7 hari</h2><div class="divider"></div>';
      h += '<div class="lab">Apa yang berubah dalam hatiku?</div><div class="lined-wrap">' + ta('f1', 'Ceritakan perubahan sekecil apa pun yang kamu rasakan…', mode) + '</div>';
      h += '<div class="lab">Satu hal yang kupelajari tentang diriku</div><div class="lined-wrap">' + ta('f2', 'Satu hal tentang dirimu yang baru kamu sadari…', mode) + '</div>';
    } else if (i === 20) {
      h += '<div class="eyebrow">Refleksi akhir</div><h2 class="h1">Melangkah</h2><div class="divider"></div>';
      h += '<div class="lab">Niat untuk hatiku ke depan</div><div class="lined-wrap">' + ta('f3', 'Seperti apa aku ingin merawat hatiku ke depan…', mode) + '</div>';
      h += '<div class="lab">Doa penutupku</div><div class="lined-wrap">' + ta('f4', 'Tulis doamu dengan kata-katamu sendiri…', mode) + '</div>';
    } else if (i === 21) {
      h += '<div style="margin:auto 0;display:flex;flex-direction:column;gap:16px;align-items:center;text-align:center">' +
        '<h2 class="h1">Terima kasih<br>sudah jujur pada hatimu</h2><div class="divider"></div>' +
        '<p class="q" style="color:var(--soft)">Tidak semua yang kamu tulis harus selesai. Cukup bahwa kamu berani menuliskannya. Hati yang mau berhenti sejenak untuk jujur, sudah sedang pulang.</p>' +
        '<p class="small">Kamu sudah menulis di ' + daysDone() + ' dari 7 hari.</p></div>';
    } else {
      h += '<div class="eyebrow">Simpan &amp; lanjutkan</div><h2 class="h1">Tulisanmu milikmu</h2><div class="divider"></div>';
      h += '<p class="p sm">Tersimpan otomatis di browser ini. Simpan cadangan .json agar bisa dipulihkan kapan saja, termasuk di perangkat lain.</p>';
      h += '<div class="actions no-print">' +
        '<button class="btn primary" type="button" data-act="export-json">Simpan cadangan (.json)</button>' +
        '<div class="agrid">' +
        '<button class="btn" type="button" data-act="import">Pulihkan cadangan</button>' +
        '<button class="btn" type="button" data-act="export">Unduh teks (.txt)</button>' +
        '<button class="btn" type="button" data-act="print">Cetak / simpan PDF</button>' +
        '<button class="btn" type="button" data-act="install"' + (deferredPrompt ? '' : ' hidden') + '>Pasang di perangkat</button></div>' +
        '<button class="btn danger" type="button" data-act="reset">Hapus semua tulisan</button></div>';
      if (IOS && !STANDALONE) h += '<p class="small no-print" style="text-align:center">Di iPhone atau iPad: ketuk Bagikan, lalu “Tambah ke Layar Utama”.</p>';
      h += '<div class="outro"><p>Ingin ditemani bertumbuh? Temukan apps islami di <a class="link" href="https://kurniapedia.my.id/" target="_blank" rel="noopener">kurniapedia.my.id</a></p>' +
        '<p>Refleksi harian lainnya ada di Threads: kurniapedia</p></div>';
      h += '<div class="crafted">Crafted with ' + HEART + ' by <a href="https://kurniapedia.my.id/" target="_blank" rel="noopener">Kurniapedia</a> 2026</div>';
    }
    return h;
  }
  /* Halaman yang isinya harus muat tanpa scroll: ukuran diperkecil otomatis kalau layar pendek */
  var FIT = {}, FITP = { 0: 1, 1: 1, 3: 1, 22: 1 }, TIGHT = { 22: 1 };
  function fitU(i) {
    if (!FITP[i] && (single || i < 0)) return null; /* mode dua halaman (lanskap): semua halaman dibuat muat tanpa scroll */
    if (i in FIT) return FIT[i];
    var u0 = parseFloat(document.documentElement.style.getPropertyValue('--u')) || 1;
    var box = document.createElement('div');
    box.className = 'fitprobe';
    box.innerHTML = wrap(i, 'r', 'probe');
    document.body.appendChild(box);
    var page = box.firstChild, pin = page.querySelector('.pin'), u = u0;
    page.style.setProperty('--u', u);
    while (pin.scrollHeight > pin.clientHeight + 1 && u > 0.5) {
      u = Math.round((u - 0.03) * 1000) / 1000;
      page.style.setProperty('--u', u);
    }
    box.remove();
    FIT[i] = u < u0 - 0.0005 ? u : null;
    return FIT[i];
  }
  function wrap(i, side, mode) {
    var cls = 'page ' + (side === 'l' ? 'l' : 'r') + (mode === 'print' ? ' print' : '') + (i === -1 ? ' ownerp' : '');
    var fu = (mode === 'print' || mode === 'probe') ? null : fitU(i);
    return '<section class="' + cls + '" data-p="' + i + '"' + (fu ? ' style="--u:' + fu + '"' : '') + '>' +
      '<svg class="brush ' + (side === 'l' ? 'bl' : 'tr') + '" aria-hidden="true"><use href="#brushTR"/></svg>' +
      '<div class="pin' + (TIGHT[i] ? ' tight' : '') + '">' + body(i, mode) + '</div>' +
      '<div class="pfoot">kurniapedia' + (i >= 0 ? ' · ' + (i + 1) : '') + '</div></section>';
  }

  /* ==========================================================
     5. TAMPILAN & NAVIGASI BUKU
     ========================================================== */
  var book = $('#book'), cover = $('#cover'), slotL = $('#slotL'), slotR = $('#slotR');
  var leaf = $('#leaf'), leafF = $('#leafF'), leafB = $('#leafB');
  var cta = $('#cta'), nav = $('#nav'), posEl = $('#pos'), toc = $('#toc');
  var btnPrev = $('#btnPrev'), btnNext = $('#btnNext');
  var PHONE = Math.min(screen.width || 9999, screen.height || 9999) < 600;
  var single = false, isOpen = false, busy = false, curPage = 0;

  function layout() {
    var vv = window.visualViewport, de = document.documentElement;
    var W = Math.min(window.innerWidth, de.clientWidth || window.innerWidth), H = window.innerHeight;
    single = W < 820 || PHONE;
    var land = W > H, availH = H - 170, pw, ph, u;
    if (single) { pw = Math.min(W - 24, 470); ph = Math.min(availH, 780); u = Math.max(0.78, Math.min(1.2, pw / 380)); }
    else if (land) { /* lanskap (tablet/laptop): pakai lebar semaksimal mungkin, huruf lebih besar */
      availH = H - 152; ph = Math.min(availH, 1200); pw = Math.min(Math.floor((W - 40) / 2), 900);
      u = Math.max(0.9, Math.min(1.9, pw / 380, ph / 470));
    } else { ph = Math.min(availH, 780); pw = Math.min(Math.floor(ph * 0.74), Math.floor((W - 48) / 2)); u = Math.max(0.78, Math.min(1.2, pw / 380)); }
    var r = document.documentElement.style;
    r.setProperty('--pw', pw + 'px'); r.setProperty('--ph', ph + 'px');
    r.setProperty('--cols', single ? 1 : 2); r.setProperty('--u', u.toFixed(3));
    book.classList.toggle('single', single);
    FIT = {};
  }
  function spreadOf(p) { return p === 0 ? 0 : Math.ceil(p / 2); }
  function norm(p) { p = Math.max(single ? -1 : 0, Math.min(N - 1, p)); if (single) return p; var s = spreadOf(p); return s === 0 ? 0 : 2 * s - 1; }
  function nextPage() { if (single) return curPage + 1; var s = spreadOf(curPage) + 1; return 2 * s - 1; }
  function prevPage() { if (single) return curPage - 1; var s = spreadOf(curPage) - 1; return s <= 0 ? 0 : 2 * s - 1; }

  function render() {
    if (single) { slotL.innerHTML = ''; slotR.innerHTML = wrap(curPage, 'r'); }
    else {
      var s = spreadOf(curPage);
      slotL.innerHTML = s === 0 ? '' : wrap(2 * s - 1, 'l');
      slotL.classList.toggle('empty', s === 0);
      slotR.innerHTML = wrap(2 * s, 'r');
    }
    updateUI();
  }
  function updateUI() {
    var lastP = N - 1; updateProg();
    if (single) posEl.textContent = (curPage + 2) + ' / ' + (N + 1);
    else { var s = spreadOf(curPage); posEl.textContent = s === 0 ? 'Halaman 1' : 'Halaman ' + (2 * s) + '–' + (2 * s + 1); }
    btnPrev.disabled = curPage <= (single ? -1 : 0);
    btnNext.disabled = single ? curPage >= lastP : spreadOf(curPage) >= spreadOf(lastP);
  }
  function updateCoverBack() { var o = $('#owner'); if (document.activeElement !== o) o.value = S.name || ''; }

  function runLeaf(from, to, fade, mode) {
    return new Promise(function (res) {
      var d = FLIP;
      leaf.style.transition = 'none';
      leaf.style.opacity = (fade && mode === 'in') ? 0 : 1;
      leaf.style.transform = 'rotateY(' + from + 'deg)';
      leaf.style.display = 'block';
      void leaf.offsetWidth;
      var tr = 'transform ' + d + 'ms cubic-bezier(.45,.05,.2,1)';
      if (fade) {
        tr += mode === 'out' ? ', opacity ' + (d * 0.35) + 'ms linear ' + (d * 0.65) + 'ms' : ', opacity ' + (d * 0.35) + 'ms linear';
        leaf.style.opacity = mode === 'out' ? 0 : 1;
      }
      leaf.style.transition = tr;
      leaf.style.transform = 'rotateY(' + to + 'deg)';
      setTimeout(res, d + 40);
    });
  }
  async function doFlip(dir, np) {
    if (single) {
      leafB.innerHTML = '<div class="page blank"></div>';
      if (dir > 0) { slotR.innerHTML = wrap(np, 'r'); leafF.innerHTML = wrap(curPage, 'r'); await runLeaf(0, -180, true, 'out'); }
      else { leafF.innerHTML = wrap(np, 'r'); await runLeaf(-180, 0, true, 'in'); slotR.innerHTML = wrap(np, 'r'); }
    } else {
      var so = spreadOf(curPage), sn = spreadOf(np);
      if (dir > 0) {
        slotR.innerHTML = wrap(2 * sn, 'r');
        leafF.innerHTML = wrap(2 * so, 'r');
        leafB.innerHTML = wrap(2 * sn - 1, 'l');
        await runLeaf(0, -180);
        slotL.innerHTML = wrap(2 * sn - 1, 'l'); slotL.classList.remove('empty');
      } else {
        slotL.innerHTML = sn === 0 ? '' : wrap(2 * sn - 1, 'l'); slotL.classList.toggle('empty', sn === 0);
        leafF.innerHTML = wrap(2 * sn, 'r');
        leafB.innerHTML = wrap(2 * so - 1, 'l');
        await runLeaf(-180, 0);
        slotR.innerHTML = wrap(2 * sn, 'r');
      }
    }
    leaf.style.display = 'none';
  }
  async function goTo(p) {
    if (busy || !isOpen) return;
    var np = norm(p);
    if (np === curPage) return;
    busy = true; toc.hidden = true;
    await doFlip(np > curPage ? 1 : -1, np);
    curPage = np; S._pos = curPage; saveNow(); updateUI();
    busy = false;
  }

  async function openBook(target) {
    if (isOpen || busy) return;
    busy = true; toc.hidden = true; lockPortrait();
    book.classList.remove('closed'); cover.classList.add('open'); cta.hidden = true;
    await wait(COVER);
    cover.style.zIndex = 1; cover.setAttribute('aria-label', 'Sampul jurnal (terbuka)');
    isOpen = true; book.classList.add('opened'); nav.hidden = false; busy = false; updateUI();
    if (target && target > 0) goTo(target);
  }
  async function closeBook() {
    if (!isOpen || busy) return;
    busy = true; toc.hidden = true;
    curPage = single ? -1 : 0; render();
    book.classList.remove('opened'); cover.style.zIndex = 6; book.classList.add('closed'); cover.classList.remove('open'); nav.hidden = true;
    await wait(COVER);
    cover.setAttribute('aria-label', 'Buka jurnal');
    cta.hidden = false; isOpen = false; busy = false; refreshResume(); updateProg();
  }
  function refreshResume() {
    var b = $('#btnResume');
    b.hidden = !(S._pos && S._pos > 0);
  }

  /* ---------- Daftar isi ---------- */
  function buildToc() {
    var items = [['Kondisi hati', 0], ['Cara memakai', 2], ['Catatan & niat', 3]];
    if (single) items.unshift(['Jurnal ini milik', -1]);
    for (var n = 1; n <= 7; n++) items.push(['Hari ' + n + ' · ' + days()[n - 1].tema, 2 * n + 3, dayWritten(n)]);
    items.push(['Refleksi akhir', 19], ['Terima kasih', 21], ['Simpan & lanjutkan', 22]);
    toc.innerHTML = items.map(function (it) {
      return '<button type="button" data-goto="' + it[1] + '">' + esc(it[0]) + (it[2] ? '<small>• sudah ditulis</small>' : '') + '</button>';
    }).join('');
  }

  /* ==========================================================
     6. UNDUH, CETAK, HAPUS
     ========================================================== */
  function exportText() {
    var t = 'JURNAL REFLEKSI HATI · 7 HARI MERAPIKAN HATI\n';
    t += 'Kondisi hati: ' + (chosen() ? chosen().nama : '-') + '\n';
    t += 'Milik: ' + (S.name || '-') + '\nMulai: ' + (fmtDate(S.start) || '-') + '   Selesai: ' + (fmtDate(S.end) || '-') + '\n';
    t += '\nNIATKU:\n' + (S.niat || '(belum ditulis)') + '\n';
    days().forEach(function (d, i) {
      var n = i + 1;
      t += '\n\n=== HARI ' + n + ': ' + d.tema.toUpperCase() + ' ===\nRenungan: ' + d.q +
           '\n\nTulisanku:\n' + (S['d' + n + '_text'] || '(belum ditulis)') +
           '\n\nLangkah kecil (' + d.step + '): ' + (S['d' + n + '_step'] ? 'sudah' : 'belum') +
           '\nHatiku hari ini: ' + (S['d' + n + '_mood'] ? S['d' + n + '_mood'] + ' dari 5 (1 ringan, 5 berat)' : '-') +
           '\nDoa: ' + d.doa;
    });
    t += '\n\n=== REFLEKSI AKHIR ===\nApa yang berubah dalam hatiku?\n' + (S.f1 || '-') +
         '\n\nSatu hal yang kupelajari tentang diriku:\n' + (S.f2 || '-') +
         '\n\nNiat untuk hatiku ke depan:\n' + (S.f3 || '-') + '\n\nDoa penutupku:\n' + (S.f4 || '-') +
         '\n\n—\nkurniapedia.my.id\n';
    var blob = new Blob([t], { type: 'text/plain;charset=utf-8' });
    var a = document.createElement('a');
    a.href = URL.createObjectURL(blob); a.download = 'jurnal-refleksi-hati.txt';
    document.body.appendChild(a); a.click(); a.remove();
    setTimeout(function () { URL.revokeObjectURL(a.href); }, 2000);
  }
  function buildPrint() {
    var root = $('#printRoot'), h = '';
    var cf = $('#cover .front');
    h += '<section class="pp"><div class="cover pcv"><div class="face front">' + (cf ? cf.innerHTML : '') + '</div></div></section>';
    for (var i = -1; i < N; i++) h += '<section class="pp">' + wrap(i, 'r', 'print') + '</section>';
    root.innerHTML = h;
  }
  function printAll() {
    buildPrint();
    setTimeout(function () { window.print(); }, 250);
  }
  function resetAll() {
    ask({ icon: 'trash', danger: true, title: 'Hapus semua tulisan?', msg: 'Semua tulisanmu di jurnal ini akan dihapus dan tidak bisa dikembalikan. Simpan cadangan dulu jika kamu masih ingin menyimpannya.', yes: 'Ya, hapus', no: 'Batal' },
      function () { S = {}; saveNow(); updateCoverBack(); render(); refreshResume(); });
  }

  /* ==========================================================
     7. EVENT (klik, ketik, geser, keyboard)
     ========================================================== */
  document.addEventListener('input', function (e) {
    var t = e.target;
    if (t && t.dataset && t.dataset.dk) { onDateInput(t); return; }
    if (t && t.dataset && t.dataset.k && (t.tagName === 'TEXTAREA' || t.tagName === 'INPUT') && t.type !== 'checkbox') {
      S[t.dataset.k] = t.value; save();
      if (t.dataset.k === 'name') updateCoverBack();
    }
  });
  document.addEventListener('focusout', function (e) {
    var t = e.target;
    if (t && t.dataset && t.dataset.dk && t.value && !parseDMY(t.value)) {
      t.classList.add('bad'); toast('Isi dengan format tgl/bln/thn, contoh 13/11/2026');
    }
  });
  document.addEventListener('change', function (e) {
    var t = e.target;
    if (t && t.type === 'checkbox' && t.dataset.k) { S[t.dataset.k] = t.checked; save(); }
  });
  document.addEventListener('click', function (e) {
    var el = e.target.closest ? e.target.closest('[data-kond],[data-mood],[data-goto],[data-act],[data-dp]') : null;
    if (!el) { if (!e.target.closest || !e.target.closest('.toc,#btnToc')) toc.hidden = true; return; }
    if (el.dataset.kond) {
      var nid = el.dataset.kond, old = chosen();
      if (old && old.id === nid) { goTo(1); return; }
      var any = false; for (var q = 1; q <= 7; q++) if (dayWritten(q)) any = true;
      var pick = function () {
        S.kondisi = nid; saveNow(); FIT = {}; render(); updateProg();
        setTimeout(function () { goTo(1); }, 450);
      };
      if (any) ask({ icon: 'swap', title: 'Ganti kondisi hati?', msg: 'Renungan tujuh harinya akan berubah mengikuti kondisi yang baru. Tulisanmu tetap tersimpan, tetapi mungkin tidak lagi sesuai dengan pertanyaan yang baru.', yes: 'Ya, ganti', no: 'Tetap di sini' }, pick);
      else pick();
    } else if (el.dataset.mood) {
      var k = el.dataset.k, n = +el.dataset.mood;
      S[k] = (+S[k] === n) ? 0 : n; save();
      var group = el.parentNode.querySelectorAll('button');
      for (var i = 0; i < group.length; i++) group[i].classList.toggle('on', +group[i].dataset.mood === +S[k]);
    } else if (el.dataset.dp) {
      openDP(el.dataset.dp, el);
    } else if (el.dataset.goto) {
      goTo(+el.dataset.goto);
    } else if (el.dataset.act === 'export') exportText();
    else if (el.dataset.act === 'export-json') exportJSON();
    else if (el.dataset.act === 'import') $('#fileIn').click();
    else if (el.dataset.act === 'install') { if (deferredPrompt) { deferredPrompt.prompt(); el.hidden = true; deferredPrompt = null; } }
    else if (el.dataset.act === 'print') printAll();
    else if (el.dataset.act === 'reset') resetAll();
  });

  cover.addEventListener('click', function (e) { if (e.target && e.target.tagName === 'INPUT') return; openBook(0); });
  cover.addEventListener('keydown', function (e) { if (e.target && e.target.tagName === 'INPUT') return; if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openBook(0); } });
  $('#btnOpen').addEventListener('click', function () { openBook(0); });
  $('#btnResume').addEventListener('click', function () { openBook(S._pos || 0); });
  $('#btnClose').addEventListener('click', closeBook);
  btnPrev.addEventListener('click', function () { goTo(prevPage()); });
  btnNext.addEventListener('click', function () { goTo(nextPage()); });
  $('#btnToc').addEventListener('click', function (e) { e.stopPropagation(); buildToc(); toc.hidden = !toc.hidden; });

  document.addEventListener('keydown', function (e) {
    if (dp) { if (e.key === 'Escape') closeDP(); return; }
    var tag = (document.activeElement && document.activeElement.tagName) || '';
    if (tag === 'TEXTAREA' || tag === 'INPUT') return;
    if (e.key === 'ArrowRight') goTo(nextPage());
    else if (e.key === 'ArrowLeft') goTo(prevPage());
  });
  var tx = 0, ty = 0, tTarget = null;
  document.addEventListener('touchstart', function (e) { tx = e.touches[0].clientX; ty = e.touches[0].clientY; tTarget = e.target; }, { passive: true });
  document.addEventListener('touchend', function (e) {
    if (!isOpen || !tTarget || dp) return;
    var tag = tTarget.tagName;
    if (tag === 'TEXTAREA' || tag === 'INPUT') return;
    var dx = e.changedTouches[0].clientX - tx, dy = e.changedTouches[0].clientY - ty;
    if (Math.abs(dx) > 70 && Math.abs(dy) < 45) { if (dx < 0) goTo(nextPage()); else goTo(prevPage()); }
  }, { passive: true });

  /* Saat keyboard HP muncul, ukuran layar berubah. Halaman tidak boleh digambar ulang
     selagi kolom tulis aktif, kalau tidak keyboard langsung menutup lagi. */
  var rz, lastW = window.innerWidth, pendingResize = false;
  function typingNow() {
    var a = document.activeElement, t = a && a.tagName;
    return t === 'TEXTAREA' || (t === 'INPUT' && a.type !== 'checkbox');
  }
  function refit() {
    var sec = slotR.querySelector('.page'); if (!sec) return;
    var fu = fitU(curPage);
    if (fu) sec.style.setProperty('--u', fu); else sec.style.removeProperty('--u');
  }
  function applyResize() {
    var W = window.innerWidth, was = single;
    layout();
    curPage = isOpen ? norm(curPage) : (single ? -1 : 0);
    if (busy) return;
    if (W !== lastW || single !== was) { lastW = W; render(); } else refit();
  }
  window.addEventListener('resize', function () {
    clearTimeout(rz);
    rz = setTimeout(function () {
      if (typingNow()) { pendingResize = true; return; }
      applyResize(); checkOrient();
    }, 120);
  });
  document.addEventListener('focusout', function () {
    setTimeout(function () {
      if (pendingResize && !typingNow()) { pendingResize = false; applyResize(); }
      checkOrient();
    }, 250);
  });
  document.addEventListener('focusin', function (e) {
    var t = e.target;
    if (t && (t.tagName === 'TEXTAREA' || (t.tagName === 'INPUT' && t.type !== 'checkbox')) && t.scrollIntoView) {
      setTimeout(function () { try { t.scrollIntoView({ block: 'nearest', behavior: 'smooth' }); } catch (x) {} }, 350);
    }
  });

  /* HP: hanya potret. Tablet: potret dan lanskap. */
  function isLand() {
    var o = screen.orientation;
    if (o && o.type) return o.type.indexOf('landscape') === 0;
    return !!(window.matchMedia && matchMedia('(orientation: landscape)').matches);
  }
  function checkOrient() { document.documentElement.classList.toggle('rot', PHONE && isLand() && !typingNow()); }
  function lockPortrait() {
    try { if (PHONE && screen.orientation && screen.orientation.lock) screen.orientation.lock('portrait').catch(function () {}); } catch (e) {}
  }

  /* Layar penuh */
  var btnFull = $('#btnFull');
  function fsNow() { return document.fullscreenElement || document.webkitFullscreenElement; }
  function fsCan() { return !!(document.fullscreenEnabled || document.webkitFullscreenEnabled); }
  function fsSync() {
    if (!btnFull) return;
    var on = !!fsNow();
    btnFull.classList.toggle('on', on); btnFull.setAttribute('aria-pressed', on ? 'true' : 'false');
    btnFull.setAttribute('aria-label', on ? 'Keluar dari layar penuh' : 'Layar penuh');
    if (!on) { try { if (PHONE && screen.orientation && screen.orientation.unlock) screen.orientation.unlock(); } catch (e) {} }
  }
  function onFs() { fsSync(); setTimeout(function () { applyResize(); checkOrient(); lockPortrait(); }, 250); }
  if (btnFull) {
    if (!fsCan() && STANDALONE) { btnFull.hidden = true; if (btnFull.nextElementSibling) btnFull.nextElementSibling.hidden = true; }
    btnFull.addEventListener('click', function () {
      if (!fsCan()) { toast(IOS ? 'Di iPhone: ketuk Bagikan, lalu “Tambah ke Layar Utama” untuk tampilan layar penuh.' : 'Browser ini belum mendukung layar penuh.'); return; }
      if (fsNow()) { (document.exitFullscreen || document.webkitExitFullscreen).call(document); return; }
      var d = document.documentElement, rq = d.requestFullscreen || d.webkitRequestFullscreen, pr;
      try { pr = rq.call(d); } catch (e) { toast('Layar penuh tidak bisa dibuka di sini.'); return; }
      if (pr && pr.then) pr.then(lockPortrait, function () { toast('Layar penuh tidak bisa dibuka di sini.'); }); else lockPortrait();
    });
    document.addEventListener('fullscreenchange', onFs);
    document.addEventListener('webkitfullscreenchange', onFs);
    fsSync();
  }
  window.addEventListener('orientationchange', function () { setTimeout(checkOrient, 200); });
  if (screen.orientation && screen.orientation.addEventListener) screen.orientation.addEventListener('change', function () { setTimeout(checkOrient, 100); });

  /* ==========================================================
     8. MULAI
     ========================================================== */

  /* ==========================================================
     7a. KALENDER BERTEMA (tgl/bln/thn)
     ========================================================== */
  var dpm = null, dp = null, dpOpener = null;
  function onDateInput(el) {
    var raw = el.value, pos = el.selectionStart == null ? raw.length : el.selectionStart;
    var before = raw.slice(0, pos).replace(/\D/g, '').length;
    var d = raw.replace(/\D/g, '').slice(0, 8);
    var out = d.slice(0, 2) + (d.length > 2 ? '/' + d.slice(2, 4) : '') + (d.length > 4 ? '/' + d.slice(4) : '');
    el.value = out;
    if (pos < raw.length) { /* sunting di tengah: kembalikan posisi kursor */
      var np = 0, c = 0;
      while (np < out.length && c < before) { if (/\d/.test(out.charAt(np))) c++; np++; }
      try { el.setSelectionRange(np, np); } catch (x) {}
    }
    el.classList.remove('bad');
    S[el.dataset.dk] = parseDMY(out); save();
  }
  function buildDP() {
    if (dpm) return;
    dpm = document.createElement('div');
    dpm.className = 'dpm'; dpm.hidden = true;
    dpm.setAttribute('role', 'dialog'); dpm.setAttribute('aria-modal', 'true'); dpm.setAttribute('aria-label', 'Pilih tanggal');
    dpm.innerHTML = '<div class="dpc"><svg class="brush tr" aria-hidden="true"><use href="#brushTR"/></svg>' +
      '<div class="dp-head"><button type="button" class="dp-nav" data-dpn="-1" aria-label="Sebelumnya">‹</button>' +
      '<button type="button" class="dp-title" data-dpt aria-label="Ganti bulan atau tahun"></button>' +
      '<button type="button" class="dp-nav" data-dpn="1" aria-label="Berikutnya">›</button></div>' +
      '<div class="dp-body"></div>' +
      '<div class="dp-foot"><button type="button" data-dpa="today">Hari ini</button><button type="button" data-dpa="clear">Hapus</button><button type="button" data-dpa="close">Tutup</button></div></div>';
    document.body.appendChild(dpm);
    dpm.addEventListener('click', function (e) {
      if (e.target === dpm) return closeDP();
      var b = e.target.closest ? e.target.closest('button') : null; if (!b || !dp) return;
      var ds = b.dataset;
      if (ds.dpd != null) pickDate(ds.dpd);
      else if (ds.dpmo != null) { dp.m = +ds.dpmo; dp.view = 'day'; paintDP(); }
      else if (ds.dpy != null) { dp.y = +ds.dpy; dp.view = 'month'; paintDP(); }
      else if (ds.dpn != null) {
        var n = +ds.dpn;
        if (dp.view === 'day') { dp.m += n; if (dp.m < 0) { dp.m = 11; dp.y--; } else if (dp.m > 11) { dp.m = 0; dp.y++; } }
        else if (dp.view === 'month') dp.y += n;
        else dp.yb += 12 * n;
        paintDP();
      }
      else if (ds.dpt != null) {
        if (dp.view === 'day') dp.view = 'month';
        else if (dp.view === 'month') { dp.view = 'year'; dp.yb = dp.y - 4; }
        else dp.view = 'day';
        paintDP();
      }
      else if (ds.dpa === 'today') pickDate(todayIso());
      else if (ds.dpa === 'clear') pickDate('');
      else if (ds.dpa === 'close') closeDP();
    });
  }
  function paintDP() {
    var head = dpm.querySelector('[data-dpt]'), bodyEl = dpm.querySelector('.dp-body');
    var sel = S[dp.key] || '', today = todayIso(), h = '', i;
    if (dp.view === 'day') {
      head.textContent = MONTHS[dp.m] + ' ' + dp.y;
      h += '<div class="dp-wd">' + WDAYS.map(function (w) { return '<span>' + w + '</span>'; }).join('') + '</div><div class="dp-grid">';
      var off = (new Date(dp.y, dp.m, 1).getDay() + 6) % 7, n = new Date(dp.y, dp.m + 1, 0).getDate();
      for (i = 0; i < off; i++) h += '<span></span>';
      for (i = 1; i <= n; i++) {
        var iso = isoOf(dp.y, dp.m, i);
        h += '<button type="button" class="dp-d' + (iso === sel ? ' sel' : '') + (iso === today ? ' today' : '') + '" data-dpd="' + iso +
             '" aria-label="' + i + ' ' + MONTHS[dp.m] + ' ' + dp.y + '"' + (iso === sel ? ' aria-pressed="true"' : '') + '>' + i + '</button>';
      }
      h += '</div>';
    } else if (dp.view === 'month') {
      head.textContent = dp.y;
      var sm = sel ? sel.split('-') : [];
      h += '<div class="dp-grid3">';
      for (i = 0; i < 12; i++) h += '<button type="button" class="dp-c' + (+sm[0] === dp.y && +sm[1] === i + 1 ? ' sel' : '') + '" data-dpmo="' + i + '">' + MON3[i] + '</button>';
      h += '</div>';
    } else {
      head.textContent = dp.yb + ' – ' + (dp.yb + 11);
      var sy = sel ? +sel.split('-')[0] : 0, ty = new Date().getFullYear();
      h += '<div class="dp-grid3">';
      for (i = dp.yb; i < dp.yb + 12; i++) h += '<button type="button" class="dp-c' + (i === sy ? ' sel' : '') + (i === ty ? ' today' : '') + '" data-dpy="' + i + '">' + i + '</button>';
      h += '</div>';
    }
    bodyEl.innerHTML = h;
  }
  function openDP(key, opener) {
    buildDP();
    var base = S[key] || (key === 'end' && S.start) || todayIso(), p = base.split('-');
    dp = { key: key, y: +p[0], m: +p[1] - 1, view: 'day', yb: 0 }; dpOpener = opener || null;
    paintDP(); dpm.hidden = false;
    var f = dpm.querySelector('.dp-d.sel') || dpm.querySelector('.dp-d.today') || dpm.querySelector('.dp-d');
    if (f) f.focus();
  }
  function closeDP() {
    if (!dpm) return;
    dpm.hidden = true; dp = null;
    if (dpOpener && document.body.contains(dpOpener)) dpOpener.focus();
    dpOpener = null;
  }
  function pickDate(iso) {
    var key = dp.key; S[key] = iso;
    Array.prototype.forEach.call(document.querySelectorAll('[data-dk="' + key + '"]'), function (el) { el.value = fmtDate(iso); el.classList.remove('bad'); });
    save(); closeDP();
  }

  /* ==========================================================
     7b. TEMA (perempuan / laki-laki x terang / gelap)
     ========================================================== */
  var THEME_KEY = 'jurnal-theme', root = document.documentElement;
  var META = { 'her-light': '#efe0d8', 'her-dark': '#1b1415', 'him-light': '#e1eaeb', 'him-dark': '#11181c' };
  var TH = (function () { var c = root.getAttribute('data-theme').split('-'); return { g: c[0], m: c[1] }; })();
  function paintTheme() {
    var id = TH.g + '-' + TH.m;
    root.setAttribute('data-theme', id);
    var mt = document.querySelector('meta[name="theme-color"]'); if (mt) mt.setAttribute('content', META[id]);
    $('#btnGender').setAttribute('aria-label', TH.g === 'her' ? 'Ganti ke tema biru' : 'Ganti ke tema merah muda');
    $('#btnMode').setAttribute('aria-label', TH.m === 'dark' ? 'Ganti ke mode terang' : 'Ganti ke mode gelap');
  }
  function setTheme(patch) {
    for (var k in patch) TH[k] = patch[k];
    if (document.startViewTransition && !REDUCED) document.startViewTransition(paintTheme); else paintTheme();
    try { localStorage.setItem(THEME_KEY, JSON.stringify(TH)); } catch (e) {}
  }
  $('#themeSwitch').addEventListener('click', function (e) {
    var b = e.target.closest('button'); if (!b) return;
    if (b.id === 'btnGender') setTheme({ g: TH.g === 'her' ? 'him' : 'her' });
    else if (b.id === 'btnMode') setTheme({ m: TH.m === 'dark' ? 'light' : 'dark' });
  });
  /* Cetak / PDF memakai tema yang sedang dipilih, dari sampul sampai halaman terakhir */
  window.addEventListener('beforeprint', buildPrint);
  window.addEventListener('afterprint', function () { $('#printRoot').innerHTML = ''; });
  paintTheme();

  /* ==========================================================
     7c. PROGRES, CADANGAN JSON, NOTIFIKASI, PASANG APP
     ========================================================== */
  var toastEl = $('#toast'), toastT;

  /* Dialog konfirmasi bertema (pengganti confirm bawaan browser) */
  var DLG_ICO = {
    swap: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 8h13M13 4l4 4-4 4M20 16H7M11 12l-4 4 4 4"/></svg>',
    trash: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 7h16M9 7V4h6v3M6.5 7l1 13h9l1-13M10 11v6M14 11v6"/></svg>',
    restore: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 12a8 8 0 1 0 2.6-5.9M4 4v4.5h4.5M12 8v4.5l3 1.8"/></svg>'
  };
  function ask(o, onOk) {
    var prev = document.activeElement, box = document.createElement('div');
    box.className = 'dlg';
    box.innerHTML = '<div class="dlg-card" role="alertdialog" aria-modal="true" aria-labelledby="dlgT" aria-describedby="dlgM">' +
      '<svg class="brush tr" aria-hidden="true"><use href="#brushTR"/></svg>' +
      '<div class="dlg-in"><div class="dlg-ico">' + (DLG_ICO[o.icon] || DLG_ICO.swap) + '</div>' +
      '<h3 class="dlg-t" id="dlgT">' + esc(o.title) + '</h3><p class="dlg-m" id="dlgM">' + esc(o.msg) + '</p>' +
      '<div class="dlg-a"><button type="button" class="btn dlg-no">' + esc(o.no || 'Batal') + '</button>' +
      '<button type="button" class="btn ' + (o.danger ? 'danger' : 'primary') + ' dlg-yes">' + esc(o.yes || 'Lanjutkan') + '</button></div></div></div>';
    document.body.appendChild(box);
    var yes = box.querySelector('.dlg-yes'), no = box.querySelector('.dlg-no'), done = false;
    function close(ok) {
      if (done) return; done = true;
      box.classList.remove('on');
      setTimeout(function () { box.remove(); try { if (prev && prev.focus) prev.focus({ preventScroll: true }); } catch (e) {} if (ok && onOk) onOk(); }, 200);
    }
    yes.addEventListener('click', function () { close(true); });
    no.addEventListener('click', function () { close(false); });
    box.addEventListener('mousedown', function (e) { if (e.target === box) close(false); });
    box.addEventListener('keydown', function (e) {
      e.stopPropagation();
      if (e.key === 'Escape') { e.preventDefault(); close(false); }
      else if (e.key === 'Tab') { e.preventDefault(); (document.activeElement === no ? yes : no).focus(); }
    });
    requestAnimationFrame(function () { box.classList.add('on'); no.focus({ preventScroll: true }); });
  }
  function toast(m) { toastEl.textContent = m; toastEl.classList.add('on'); clearTimeout(toastT); toastT = setTimeout(function () { toastEl.classList.remove('on'); }, 2600); }
  function updateProg() {
    var p = $('#prog'); p.hidden = !isOpen; if (!isOpen) return;
    var h = '';
    for (var n = 1; n <= 7; n++) h += '<button type="button" class="seg' + (dayWritten(n) ? ' on' : '') + '" data-goto="' + (2 * n + 3) + '" aria-label="Hari ' + n + (dayWritten(n) ? ', sudah ditulis' : '') + '"></button>';
    $('#progSegs').innerHTML = h; $('#progTxt').textContent = daysDone() + ' dari 7 hari ditulis';
  }
  var OKKEY = /^(kondisi|name|start|end|niat|f[1-4]|d[1-7]_(text|step|mood)|_pos)$/;
  function exportJSON() {
    var blob = new Blob([JSON.stringify({ app: 'jurnal-refleksi-hati', version: 1, exportedAt: new Date().toISOString(), data: S }, null, 2)], { type: 'application/json' });
    var a = document.createElement('a'); a.href = URL.createObjectURL(blob); a.download = 'jurnal-refleksi-hati-cadangan.json';
    document.body.appendChild(a); a.click(); a.remove(); setTimeout(function () { URL.revokeObjectURL(a.href); }, 2000);
    toast('Cadangan tersimpan');
  }
  $('#fileIn').addEventListener('change', function (e) {
    var f = e.target.files[0]; e.target.value = ''; if (!f) return;
    var r = new FileReader();
    r.onload = function () {
      try {
        var o = JSON.parse(r.result);
        if (!o || (o.app !== 'jurnal-refleksi-hati' && o.app !== 'jurnal-refleksi-cinta') || typeof o.data !== 'object') throw 0;
        var d = {};
        for (var k in o.data) if (OKKEY.test(k)) { var v = o.data[k]; if ((k === 'start' || k === 'end') && !(typeof v === 'string' && (v === '' || fmtDate(v)))) continue; if (k === 'kondisi' && !KOND.some(function (x) { return x.id === v; })) continue; if (typeof v === 'string') d[k] = v.slice(0, 20000); else if (typeof v === 'number' || typeof v === 'boolean') d[k] = v; }
        ask({ icon: 'restore', title: 'Pulihkan cadangan?', msg: 'Tulisan yang ada sekarang akan diganti dengan isi cadangan ini.', yes: 'Ya, pulihkan', no: 'Batal' },
          function () { S = d; saveNow(); updateCoverBack(); render(); refreshResume(); toast('Cadangan dipulihkan'); });
      } catch (x) { toast('Berkas cadangan tidak dikenali'); }
    };
    r.readAsText(f);
  });
  window.addEventListener('beforeinstallprompt', function (e) {
    e.preventDefault(); deferredPrompt = e;
    Array.prototype.forEach.call(document.querySelectorAll('[data-act="install"]'), function (b) { b.hidden = false; });
  });
  window.addEventListener('appinstalled', function () { deferredPrompt = null; toast('Aplikasi terpasang'); });
  if ('serviceWorker' in navigator && /^https?:/.test(location.protocol)) window.addEventListener('load', function () { navigator.serviceWorker.register('sw.js').catch(function () {}); });

  layout(); curPage = single ? -1 : 0; render(); updateCoverBack(); refreshResume();
  checkOrient(); lockPortrait();
  window.addEventListener('load', function () { if (!typingNow()) applyResize(); });
  [100, 400, 900, 1800].forEach(function (t) { setTimeout(function () { if (!busy && !typingNow()) applyResize(); }, t); });
  if (window.visualViewport) window.visualViewport.addEventListener('resize', function () { clearTimeout(rz); rz = setTimeout(function () { if (!busy && !typingNow()) { applyResize(); checkOrient(); } }, 150); });
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(function () {
    var a = document.activeElement, tg = a && a.tagName;
    if (busy || dp || tg === 'TEXTAREA' || tg === 'INPUT') return;
    FIT = {}; render();
  });
  requestAnimationFrame(function () { document.body.classList.add('loaded'); });
})();
