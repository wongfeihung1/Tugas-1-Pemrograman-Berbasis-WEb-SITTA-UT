// ================================
// Fungsi buka & tutup modal
// ================================
function bukaModal(id) {
  document.getElementById(id).style.display = 'flex';
}

function tutupModal(id) {
  document.getElementById(id).style.display = 'none';
}

// ================================
// Kirim reset password
// ================================
function kirimReset() {
  var email = document.getElementById('inputResetEmail').value;
  if (!email) {
    alert('Masukkan email terlebih dahulu!');
    return;
  }
  tutupModal('modalLupaPass');
  alert('Instruksi reset password sudah dikirim ke ' + email);
}

// ================================
// Kirim daftar akun
// ================================
function kirimDaftar() {
  var nama  = document.getElementById('regNama').value;
  var email = document.getElementById('regEmail').value;
  var pass  = document.getElementById('regPass').value;
  if (!nama || !email || !pass) {
    alert('Semua field wajib diisi!');
    return;
  }
  tutupModal('modalDaftar');
  alert('Pendaftaran berhasil dikirim! Tunggu konfirmasi admin.');
}

// ================================
// Tombol Lupa Password & Daftar
// ================================
var btnLupa = document.getElementById('btnLupaPassword');
if (btnLupa) {
  btnLupa.addEventListener('click', function(e) {
    e.preventDefault();
    bukaModal('modalLupaPass');
  });
}

var btnDaftar = document.getElementById('btnDaftar');
if (btnDaftar) {
  btnDaftar.addEventListener('click', function(e) {
    e.preventDefault();
    bukaModal('modalDaftar');
  });
}

// ================================
// Validasi & proses login
// ================================
var formLogin = document.getElementById('formLogin');
if (formLogin) {
  formLogin.addEventListener('submit', function(e) {
    e.preventDefault();

    var email    = document.getElementById('inputEmail').value.trim();
    var password = document.getElementById('inputPassword').value;
    var errEmail = document.getElementById('errorEmail');
    var errPass  = document.getElementById('errorPassword');

    errEmail.textContent = '';
    errPass.textContent  = '';
    var valid = true;

    if (!email) {
      errEmail.textContent = 'Email tidak boleh kosong.';
      errEmail.style.color = 'red';
      errEmail.style.fontSize = '12px';
      valid = false;
    }
    if (!password) {
      errPass.textContent = 'Password tidak boleh kosong.';
      errPass.style.color = 'red';
      errPass.style.fontSize = '12px';
      valid = false;
    }
    if (!valid) return;

    var user = dataPengguna.find(function(u) {
      return u.email === email && u.password === password;
    });

    if (user) {
      sessionStorage.setItem('userLogin', JSON.stringify(user));
      window.location.href = 'dashboard.html';
    } else {
      bukaModal('modalGagal');
    }
  });
}

// ================================
// Filter / Pencarian Bahan Ajar
// ================================

var inputCari = document.getElementById('inputCari');
if (inputCari) {
  inputCari.addEventListener('input', function() {
    var keyword = this.value.toLowerCase();
    var filtered = dataBahanAjar.filter(function(item) {
      return item.namaBarang.toLowerCase().includes(keyword) ||
             item.kodeBarang.toLowerCase().includes(keyword);
    });
    renderTabel(filtered);
  });
}

// ================================
// Tutup dropdown saat klik di luar
// ================================
document.addEventListener('click', function(e) {
  var dropdown = document.getElementById('dropdownLaporan');
  var btnLaporan = document.getElementById('btnLaporan');
  if (dropdown && btnLaporan) {
    if (!btnLaporan.contains(e.target)) {
      dropdown.style.display = 'none';
    }
  }
});
