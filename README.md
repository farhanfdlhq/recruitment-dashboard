# Inovtek Recruitment Dashboard - Technical Test

Berikut adalah hasil pengerjaan Technical Test untuk posisi Fullstack Developer Junior di Inovtek Cipta Digital.

## 1. Link GitHub Repository
[https://github.com/farhanfdlhq/recruitment-dashboard](https://github.com/farhanfdlhq/recruitment-dashboard)

## 2. Link Live Demo (Vercel)
[https://recruitment-dashboard-test.vercel.app](https://recruitment-dashboard-test.vercel.app)

---

## 3. Penjelasan Singkat Teknologi dan Struktur Project yang Digunakan

Aplikasi ini dikembangkan dengan pendekatan **Single Page Application (SPA)** yang berfokus pada kecepatan, kebersihan kode (clean code), dan UI/UX bergaya modern SaaS yang responsif (Apple-inspired design).

### 🛠️ Teknologi Utama:
- **React 18**: Digunakan sebagai library utama untuk membangun antarmuka pengguna berbasis komponen.
- **Vite**: Digunakan sebagai *build tool* dan *bundler* modern karena performanya yang sangat cepat (HMR) dibandingkan Webpack/CRA standar.
- **React Router DOM v6**: Menangani navigasi antar halaman (Client-side routing) dan proteksi *route* menggunakan sistem *Dummy Auth*.
- **Vanilla CSS (Design Tokens)**: Styling murni tanpa framework tambahan (seperti Tailwind atau Bootstrap). Mengandalkan kapabilitas modern CSS (CSS Variables) di `global.css` untuk memastikan warna, tipografi, dan *spacing* tetap konsisten dan mudah di-maintain.
- **Lucide React**: Library ikon berbasis SVG modern yang bersih dan ringan, menggantikan penggunaan emoji agar aplikasi terlihat jauh lebih profesional.
- **localStorage API**: Digunakan untuk menyimpan state sederhana secara sementara sehingga perubahan data pada Job Management dan Candidate Pipeline (Kanban) dapat tersinkronisasi secara real-time antar halaman tanpa perlu backend nyata.

### 📁 Struktur Project:
Sistem file diatur sedemikian rupa untuk memisahkan *logic*, tampilan, dan sumber data:

```text
src/
├── components/      # UI komponen modular yang dapat digunakan ulang (Sidebar, Layout, Modal, StatCard)
├── data/            # Data dummy (JSON objects) untuk inisialisasi awal list Job dan Kandidat
├── hooks/           # Custom React hooks (seperti useAuth untuk simulasi login/logout)
├── pages/           # Komponen halaman utama (Login, Dashboard, Jobs, Pipeline)
└── styles/          # File CSS terpusat, memuat token desain (variables) dan reset browser dasar
```

### ✨ Fitur Unggulan UI/UX:
- **Glassmorphism & Micro-animations**: Tampilan login menggunakan efek *frosted glass* dan elemen interaktif di seluruh aplikasi merespon dengan animasi yang halus saat di-hover/klik.
- **Native HTML5 Drag & Drop**: Implementasi papan Kanban pada fitur Candidate Pipeline dibuat menggunakan API Drag & Drop bawaan HTML5 yang stabil tanpa memerlukan *third-party library* berat.
- **Responsive Layout**: Sidebar akan otomatis berubah menjadi sistem *hamburger menu* yang *smooth* ketika diakses melalui perangkat berlayar kecil (mobile).
- **Vercel Deployment Ready**: Telah dikonfigurasikan dengan `vercel.json` untuk mencegah issue `404 Not Found` ketika me-refresh halaman yang dikontrol oleh React Router.
