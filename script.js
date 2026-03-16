/* ================= CONFIG DATA ================= */
const DATA = {
    tamu: "Nama tamu",
    wanita: {
        panggil: "Dinda",
        lengkap: "Dinda YP",
        anak: "Putri Pertama",
        ortu: "Bapak Dinda & Ibu Dinda"
    },
    pria: {
        panggil: "Dewa",
        lengkap: "Dewa",
        anak: "Putra ke 3",
        ortu: "Bapak Raka & Ibu Raka"
    },
    jadwal: {
        tgl: "18 Oktober 2026",
        hari: "SABTU, 18 OKTOBER 2026",
        jam: "09:00 - s/d Selesai",
        lokasi:"The Trans Resort Bali",
        target: "2026-10-18T09:00:00"
    },
    story: {
        kenal: "03 SEPTEMBER 2025",
        nikah: "18 OKTOBER 2026"
    },
    lain: {
        dc: "Sky blue",
        rek: "1111 2222 3333 4444",
        bank: "Dinda" 
    }
};

/* ================= UTILITY FUNCTIONS ================= */

function setText(id, value) {
    const el = document.getElementById(id);
    if (el) el.innerText = value;
}

function startCountdown() {
    const targetDate = new Date(DATA.jadwal.target).getTime();
    const timer = setInterval(() => {
        const now = new Date().getTime();
        const gap = targetDate - now;
        if (gap < 0) {
            clearInterval(timer);
            return;
        }
        const d = Math.floor(gap / (1000 * 60 * 60 * 24));
        const h = Math.floor((gap % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const m = Math.floor((gap % (1000 * 60 * 60)) / (1000 * 60));
        const s = Math.floor((gap % (1000 * 60)) / 1000);
        setText("count-day", d);
        setText("count-hour", h);
        setText("count-minute", m);
        setText("count-second", s);
    }, 1000);
}

function updateTeks() {
const namaKop = `${DATA.pria.panggil} & ${DATA.wanita.panggil}`;    document.querySelectorAll(".names").forEach(el => { el.innerText = namaKop; });
    setText("txt-tamu", DATA.tamu);
    setText("home-tgl", DATA.jadwal.tgl);
    
    // Update nomor rekening jika element exists
    const noRekEl = document.getElementById("no-rek");
    if (noRekEl) noRekEl.innerText = DATA.lain.rek;
    
    // Update dress code jika element exists
    const dcEl = document.querySelector(".dc-colors");
    if (dcEl) dcEl.innerText = DATA.lain.dc;
}

function copyText() {
    const textToCopy = DATA.lain.rek;
    navigator.clipboard.writeText(textToCopy).then(() => {
        let notification = document.getElementById("copy-notification");
        if (!notification) {
            notification = document.createElement("div");
            notification.id = "copy-notification";
            document.body.appendChild(notification);
        }
        notification.innerText = "Nomor Rekening Berhasil Disalin";
        notification.className = "show";
        setTimeout(() => { 
            notification.className = notification.className.replace("show", ""); 
        }, 3000);
    }).catch(err => {
        console.log("Gagal menyalin: ", err);
    });
}

function tambahKeKalender() {
    const title = `Pernikahan ${DATA.wanita.panggil} & ${DATA.pria.panggil}`;
    const url = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(title)}&dates=20261018T020000Z/20261018T060000Z&details=Mohon doa restu&location=${encodeURIComponent(DATA.jadwal.lokasi)}`;
    window.open(url, '_blank');
}

/* ================= INITIALIZATION ================= */
document.addEventListener("DOMContentLoaded", () => {
    updateTeks();
    startCountdown();
});
const buttons = document.querySelectorAll(".btn-option");
    const attendanceInput = document.getElementById("attendance-val");

    buttons.forEach(btn => {
        // Bersihkan teks dari simbol apapun saat halaman dimuat
        btn.dataset.label = btn.innerText.trim().replace(/[✓✕?]/g, '').trim();

        btn.addEventListener("click", function() {
            buttons.forEach(b => {
                b.classList.remove("active", "hadir", "ragu", "tidak-hadir");
                b.innerHTML = b.dataset.label; 
            });

            const label = this.dataset.label; // Isinya: "Hadir", "Ragu", atau "Tidak Hadir"
            this.classList.add("active");

            if (label === "Hadir") {
                this.classList.add("hadir");
                this.innerHTML = "✓ " + label;
            } else if (label === "Ragu") {
                this.classList.add("ragu");
                this.innerHTML = "? " + label;
            } else if (label === "Tidak Hadir") {
                this.classList.add("tidak-hadir");
                this.innerHTML = "✕ " + label;
            }

            // PENTING: Kirim teks murni (label) saja ke Google Sheet agar tidak double ikon
            if (attendanceInput) attendanceInput.value = label; 
        });
    });
      
/* ================= CEK SCROLL UNTUK REVEAL ANIMATION ================= */
function cekScroll() {
    const elements = document.querySelectorAll('[class*="reveal"]');
    
    elements.forEach((el) => {
        const elementTop = el.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        if (elementTop < windowHeight * 0.85) {
            el.classList.add("active");
        }
    });
}

window.addEventListener("scroll", cekScroll);

/* ================= AUTO CINEMATIC INJECTOR (FULL MOTION) ================= */

document.addEventListener("DOMContentLoaded", () => {

    /* 1. JUDUL UTAMA (Dewa & Dinda) */
    document.querySelectorAll(".names, .names-latin-final").forEach(el => {
        el.setAttribute("data-cine", "up");
        el.setAttribute("data-motion", "float");
    });

    /* 2. GAMBAR ANIMASI ATAS (ORNAMEN) */
    document.querySelectorAll(".header-img, .cover-frame img").forEach(el => {
        el.setAttribute("data-cine", "fade");
        el.setAttribute("data-motion", "sway");
    });

    /* 3. TEKS PARAGRAF */
    let kiri = true;
    document.querySelectorAll("p, li, span").forEach(el => {
        el.setAttribute("data-cine", kiri ? "left" : "right");
        kiri = !kiri;
    });

    /* 4. TOMBOL - Kecuali tombol RSVP */
    document.querySelectorAll("button:not(.btn-option), a:not(.btn-option)").forEach(el => {
        el.setAttribute("data-cine", "up");
    });

    /* 5. FOTO MEMPELAI */
    document.querySelectorAll(".arch-frame img").forEach(el => {
        el.setAttribute("data-cine", "zoom");
    });

});

/* ================= CINEMATIC ENGINE ================= */

function cinematicRevealAll() {
    const trigger = window.innerHeight * 0.9;

    document.querySelectorAll("[data-cine]").forEach(el => {
        if (el.getBoundingClientRect().top < trigger) {
            el.classList.add("active");
        }
    });
}

window.addEventListener("scroll", cinematicRevealAll);
document.addEventListener("DOMContentLoaded", cinematicRevealAll);

/* ================= COVER MOTION (NO ZOOM, NO BLUR) ================= */

document.addEventListener("DOMContentLoaded", () => {
    const cover = document.getElementById("cover");
    if (!cover) return;

    cover.querySelectorAll(
        ".sub-title, .names, .home-desc, .home-date, button, a"
    ).forEach((el, i) => {
        el.style.opacity = "0";
        el.style.transform = "translateY(30px)";
        el.style.transition = `all 1.2s cubic-bezier(0.22,1,0.36,1) ${i * 0.1}s`;
    });

    const img = cover.querySelector("img");
    if (img) {
        img.style.opacity = "0";
        img.style.transform = "translateY(-20px)";
        img.style.transition = "all 1.4s ease";
    }

    cover.classList.add("ready");
    setTimeout(() => {
        cover.querySelectorAll("*").forEach(el => {
            el.style.opacity = "1";
            el.style.transform = "translateY(0)";
        });
    }, 200);
});

/* ================= AUTO SCROLL CINEMATIC ================= */

let autoScrollActive = false;
let autoScrollRAF;

function startAutoScroll() {

autoScrollActive = true;
const speed = 0.25;

function scrollstep() {

if (!autoScrollActive) return;

// scroll halaman seperti biasa
window.scrollBy(0, speed);

cekScroll();

autoScrollRAF = requestAnimationFrame(scrollstep);

}

autoScrollRAF = requestAnimationFrame(scrollstep);

}
/* ================= FUNGSI STOP & DETEKSI INTERAKSI ================= */

function stopAutoScroll() {
    autoScrollActive = false; 
    
    if (autoScrollRAF) {
        cancelAnimationFrame(autoScrollRAF);
    }
}

const interaksiEvents = ["wheel", "touchmove", "mousedown", "pointerdown"];

interaksiEvents.forEach(evt => {
    window.addEventListener(evt, () => {
        if (autoScrollActive) {
            userInteracted = true; 
            stopAutoScroll();
            console.log("Auto-scroll dihentikan karena interaksi tamu.");
        }
    }, { passive: true });
});

/* ===== MATIKAN TRANSISI HANYA UNTUK COUNTDOWN ===== */
document.addEventListener("DOMContentLoaded", () => {
    const countdown = document.querySelector(".home-countdown");
    if (!countdown) return;

    countdown.querySelectorAll("#count-day, #count-hour, #count-minute, #count-second").forEach(el => {
        el.removeAttribute("data-cine");
        el.removeAttribute("data-motion");
        el.classList.remove("active");
    });
});
/* ================= AMBIL NAMA TAMU DARI LINK ================= */

function getNamaTamu(){

const params = new URLSearchParams(window.location.search);
const nama = params.get("to");

if(nama){

const namaFix = decodeURIComponent(nama.replace(/\+/g," "));

const el = document.getElementById("txt-tamu");

if(el) el.innerText = namaFix;

}

}

document.addEventListener("DOMContentLoaded", getNamaTamu);
