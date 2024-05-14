let sections = document.querySelectorAll('section');
let navLinks = document.querySelectorAll('header nav a');

window.onscroll = () => {
    sections.forEach(sec => {
        let top = window.scrollY;
        let offset = sec.offsetTop - 150;
        let height = sec.offsetHeight;
        let id = sec.getAttribute('id');

        if(top >= offset && top < offset + height) {
            navLinks.forEach(links => {
                links.classList.remove('active');
                document.querySelector('header nav a[href*=' + id + ']').classList.add('active');
            });
        };
    });
};

var swiper = new Swiper(".portfolio-swiper", {
    slidesPerView: 3,
    spaceBetween: 30,
    navigation: {
    nextEl: ".btn-prev",
    prevEl: ".btn-next",
    },
    breakpoints: {
  // when window width is >= 320px
  320: {
    slidesPerView: 2,
    spaceBetween: 20
  },
  // when window width is >= 480px
  480: {
    slidesPerView: 3,
    spaceBetween: 30
  }
}
  });



document.addEventListener("DOMContentLoaded", function() {
  const popup = document.getElementById("popup");
  const portfolioDetail = document.getElementById("portfolioDetail");
  const closePopup = document.getElementById("closePopup");
  const popupImg = document.getElementById("popupImg");

  portfolioDetail.addEventListener("click", function(event) {
      event.preventDefault();
      // Set the src attribute of popupImg to the new image
      popupImg.src = "img/evoting.jpeg";
      // Display the popup
      popup.style.display = "block";
  });

  closePopup.addEventListener("click", function() {
      popup.style.display = "none";
  });

  window.addEventListener("click", function(event) {
      if (event.target == popup) {
          popup.style.display = "none";
      }
  });
});

document.addEventListener("DOMContentLoaded", function() {
  // Popup teks
  const textPopup = document.getElementById("textPopup");
  const newsDetail = document.getElementById("newsDetail");
  const closeTextPopup = document.getElementById("closeTextPopup");
  const popupText = document.getElementById("popupText");

  if (newsDetail) {
      newsDetail.addEventListener("click", function(event) {
          event.preventDefault();
          // Set the text content for the popup
          popupText.innerHTML = `
              <h2>Peluncuran Aplikasi E-Voting Berbasis Website</h2>
              <p>Dalam era digital yang semakin maju, proses pemungutan suara kini dapat dilakukan dengan lebih mudah dan efisien melalui aplikasi e-voting berbasis website. Kami dengan bangga memperkenalkan aplikasi e-voting yang dikembangkan menggunakan teknologi PHP dan MySQL, dirancang untuk memberikan solusi voting yang aman, cepat, dan akurat.</p>
              <h3>Fitur Utama Aplikasi E-Voting</h3>
              <ul>
                  <li><strong>Antarmuka Pengguna yang Ramah:</strong> Aplikasi ini dilengkapi dengan antarmuka yang intuitif dan mudah digunakan, sehingga pengguna dari berbagai kalangan dapat dengan mudah mengakses dan berpartisipasi dalam proses pemungutan suara.</li>
                  <li><strong>Keamanan Data:</strong> Mengutamakan keamanan data pengguna, aplikasi ini menggunakan enkripsi untuk memastikan setiap suara yang masuk tidak dapat dimanipulasi atau disalahgunakan.</li>
                  <li><strong>Pengelolaan Pengguna:</strong> Admin memiliki kontrol penuh untuk mengelola daftar pemilih, mengatur hak akses, serta memantau proses pemungutan suara secara real-time.</li>
                  <li><strong>Rekapitulasi Hasil Otomatis:</strong> Setelah proses voting selesai, hasil dapat segera dilihat dengan rekapitulasi yang otomatis dan transparan, meminimalisir kemungkinan kesalahan perhitungan.</li>
                  <li><strong>Integrasi dengan Database MySQL:</strong> Dengan dukungan database MySQL, aplikasi ini mampu menangani jumlah data yang besar dengan performa yang optimal.</li>
              </ul>
              <h3>Manfaat Menggunakan E-Voting</h3>
              <p>
                  - <strong>Efisiensi Waktu dan Biaya:</strong> Mengurangi kebutuhan akan kertas dan logistik fisik, serta mempercepat proses penghitungan suara.<br>
                  - <strong>Aksesibilitas:</strong> Pemilih dapat memberikan suara mereka dari mana saja selama mereka memiliki akses internet.<br>
                  - <strong>Transparansi dan Akurasi:</strong> Sistem ini dirancang untuk memberikan hasil yang akurat dan dapat diverifikasi oleh semua pihak terkait.
              </p>
              <h3>Teknologi di Balik Aplikasi</h3>
              <p>
                  Pengembangan aplikasi ini menggunakan bahasa pemrograman PHP untuk logika aplikasi dan MySQL sebagai sistem manajemen basis data. Kombinasi ini memungkinkan pembuatan aplikasi yang dinamis, responsif, dan dapat diandalkan. PHP, dengan kemampuannya dalam pemrosesan server-side, serta MySQL, yang dikenal dengan kinerjanya yang cepat dan stabil, menjadikan aplikasi ini solusi ideal untuk kebutuhan e-voting modern.
              </p>
              <p>
                  Dengan hadirnya aplikasi e-voting ini, kami berharap dapat memberikan kontribusi positif dalam proses demokrasi digital, memperkuat kepercayaan publik terhadap sistem pemungutan suara, dan memfasilitasi partisipasi yang lebih luas dari masyarakat.
              </p>
          `;
          // Display the popup
          textPopup.style.display = "block";
      });
  }

  if (closeTextPopup) {
      closeTextPopup.addEventListener("click", function() {
          textPopup.style.display = "none";
      });
  }

  window.addEventListener("click", function(event) {
      if (event.target == textPopup) {
          textPopup.style.display = "none";
      }
  });
});

  document.getElementById('contact-form').addEventListener('submit', function(event) {
    event.preventDefault();

    // Mengambil data dari form
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;

    // Mengirim email menggunakan EmailJS
    emailjs.send("service_op5i6vu", "template_s1topaa", {
      from_name: name,
      from_email: email,
      message: message
    })
    .then(function(response) {
       console.log('SUCCESS!', response.status, response.text);
       alert('Email Berhasil dikirim! Terimakasih telah menghubungi!');
    }, function(error) {
       console.log('FAILED...', error);
       alert('Email Gagal Dikirim:(');
    });

    // Reset form setelah submit
    document.getElementById('contact-form').reset();
  });