# 📝 Advanced To-Do List Application

Aplikasi To-Do List canggih yang dibangun dengan HTML, CSS (Tailwind), dan JavaScript vanilla. Aplikasi ini menyediakan sistem manajemen tugas yang komprehensif dengan fitur-fitur modern dan antarmuka yang responsif.

## 🚀 Fitur Utama

### 📋 Manajemen Tugas
- ✅ **Tambah Tugas Baru** dengan deskripsi, tanggal deadline, dan prioritas
- 🗑️ **Hapus Tugas** individual atau semua tugas sekaligus
- ✏️ **Toggle Status** tugas (selesai/belum selesai)
- 📅 **Deteksi Overdue** otomatis berdasarkan tanggal deadline

### 🎯 Sistem Prioritas
- 🔴 **High Priority** - Untuk tugas yang sangat penting
- 🟡 **Medium Priority** - Untuk tugas dengan prioritas sedang (default)
- 🟢 **Low Priority** - Untuk tugas dengan prioritas rendah
- 📊 **Auto-Sorting** berdasarkan prioritas dalam setiap kategori

### 📊 Tiga Tampilan Terpisah
1. **🔵 To-Do Tasks** - Tugas yang belum selesai dan masih dalam deadline
2. **🔴 Overdue Tasks** - Tugas yang sudah melewati deadline (dengan visual khusus)
3. **🟢 Completed Tasks** - Tugas yang sudah selesai

### 👤 Profil Pengguna
- 📝 **Edit Nama** pengguna
- 🏷️ **Role**: Supervisor (tetap)
- 💾 **Penyimpanan Lokal** profil pengguna

### 💾 Penyimpanan Data
- 🔄 **localStorage** - Data tersimpan di browser
- 🚀 **Auto-save** - Setiap perubahan langsung tersimpan
- 📱 **Cross-session** - Data tetap ada setelah browser ditutup

## 🖥️ Teknologi yang Digunakan

- **HTML5** - Struktur aplikasi
- **CSS3 + Tailwind CSS** - Styling dan responsivitas
- **JavaScript ES6+** - Logika aplikasi
- **Font Awesome** - Icons
- **localStorage API** - Penyimpanan data

## 📱 Fitur Responsif

- 📱 **Mobile First Design**
- 💻 **Desktop Optimized**
- 🎨 **Clean UI/UX**
- ⚡ **Fast Loading**

## 🎨 Komponen UI

### 🎯 Priority Badges
- **High**: Badge merah dengan icon arrow-up
- **Medium**: Badge kuning dengan icon minus
- **Low**: Badge hijau dengan icon arrow-down

### 🚨 Status Indicators
- **OVERDUE**: Badge merah dengan animasi pulse
- **COMPLETED**: Badge hijau dengan checkmark
- **Needs attention**: Pesan khusus untuk overdue tasks

### 📊 Counters
- **Real-time counting** untuk setiap kategori
- **Total summary** di bagian bawah
- **Progress tracking** yang mudah dibaca

## 🔧 Instalasi dan Penggunaan

### Persyaratan
- Browser modern (Chrome, Firefox, Safari, Edge)
- Koneksi internet (untuk CDN Tailwind dan Font Awesome)

### Cara Menjalankan
1. Clone atau download repository ini
2. Buka file `index2.html` di browser
3. Mulai menggunakan aplikasi!

```bash
# Clone repository
git clone https://github.com/fahmi277/bootcamp-harisenin-mission4-basic.git

# Masuk ke direktori
cd bootcamp-harisenin-mission4-basic

# Buka di browser
# Klik dua kali pada index2.html atau
# Buka browser dan drag file index2.html ke browser
```

## 📖 Cara Menggunakan

### 1. Menambah Tugas Baru
1. Masukkan deskripsi tugas di field "Task Description"
2. Pilih tanggal deadline
3. Pilih prioritas (Low/Medium/High)
4. Klik tombol "Add" atau tekan Enter

### 2. Mengelola Tugas
- **✅ Selesaikan Tugas**: Klik checkbox di sebelah kiri tugas
- **🗑️ Hapus Tugas**: Klik tombol X di sebelah kanan tugas
- **🗑️ Hapus Semua**: Klik tombol "Delete All" di bagian bawah

### 3. Edit Profil
1. Klik tombol edit (pencil icon) di profil
2. Ubah nama sesuai keinginan
3. Klik "Save Changes"

## 🏗️ Struktur Kode

```
mission4/
├── index.html          # File HTML utama
├── script.js           # Logika JavaScript
├── readme.md          # Dokumentasi (file ini)

```

### 📂 Struktur HTML
- **Profile Section**: Informasi pengguna
- **Task Input Form**: Form untuk menambah tugas baru
- **Three Task Tables**: Tabel terpisah untuk To-Do, Overdue, dan Completed
- **Task Actions**: Kontrol untuk mengelola semua tugas
- **Profile Modal**: Modal untuk edit profil

### 🧠 Logika JavaScript
- **Task Management**: CRUD operations untuk tugas
- **Priority System**: Sorting dan filtering berdasarkan prioritas
- **Date Handling**: Deteksi overdue dan format tanggal
- **Local Storage**: Penyimpanan dan loading data
- **Profile Management**: Edit dan simpan profil pengguna

## 🎯 Fitur Lanjutan

### 📊 Smart Categorization
- **Automatic Sorting**: Tugas diurutkan berdasarkan prioritas
- **Dynamic Filtering**: Pemisahan otomatis berdasarkan status
- **Real-time Updates**: Counter dan tampilan update secara real-time

### 🎨 Enhanced UX
- **Confirmation Dialogs**: Konfirmasi sebelum menghapus
- **Empty States**: Pesan motivasi ketika tidak ada tugas
- **Visual Feedback**: Hover effects dan smooth transitions
- **Responsive Design**: Optimal di semua ukuran layar

### 🔒 Data Persistence
- **Browser Storage**: Data tersimpan di localStorage
- **Auto-backup**: Setiap perubahan langsung tersimpan
- **Data Recovery**: Data tetap ada setelah refresh/restart

## 🤝 Kontributor

- **Fahmi** - Developer & Supervisor
- Repository: [bootcamp-harisenin-mission4-basic](https://github.com/fahmi277/bootcamp-harisenin-mission4-basic)

## 📝 Lisensi

Proyek ini dibuat untuk keperluan pembelajaran dan portfolio.

## 🔄 Update Log

### Versi 1.0 (Current)
- ✅ Basic CRUD operations
- ✅ Three-table layout (To-Do, Overdue, Completed)
- ✅ Priority system dengan visual indicators
- ✅ Profile management
- ✅ Local storage integration
- ✅ Responsive design
- ✅ Overdue detection dan special styling

## 📞 Kontak

Jika ada pertanyaan atau saran, silakan hubungi melalui:
- GitHub: [@fahmi277](https://github.com/fahmi277)
- Repository Issues: [Create Issue](https://github.com/fahmi277/bootcamp-harisenin-mission4-basic/issues)

---

⭐ **Jika proyek ini membantu, jangan lupa berikan star di GitHub!** ⭐