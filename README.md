# Perumahan Bumi Pasanggrahan

Website promosi perumahan (Next.js 16). Semua halaman di-prerender statis — ringan di server dan cepat di browser.

## Persiapan

```bash
npm install
npm run dev
```

Pastikan folder `public/` berisi aset (`images/`, `panorama/`, dll.) sebelum deploy.

## Deploy (pilih salah satu)

### Opsi A — Hostinger Node.js (disarankan untuk Anda)

Panduan lengkap: **[HOSTINGER.md](./HOSTINGER.md)**

Ringkasan di hPanel:

- Install: `npm ci`
- Build: `npm run build`
- Start: `npm run start -- -p $PORT`
- Node.js: **20**

### Opsi B — Vercel (paling mudah, RAM server ~0)

1. Push repo ke GitHub.
2. Import di [vercel.com](https://vercel.com) → framework **Next.js**.
3. Region: **Singapore (sin1)** — sudah diset di `vercel.json`.
4. Deploy. Tidak perlu konfigurasi tambahan.

### Opsi C — Hosting statis (Nginx / cPanel / Cloudflare Pages)

Tanpa proses Node di server — hanya file HTML/JS/CSS.

```bash
npm run build:static
```

Upload isi folder `out/` ke root website. Contoh Nginx:

```nginx
server {
    listen 80;
    server_name domain-anda.com;
    root /var/www/bumi-passanggrahan/out;
    index index.html;

    location / {
        try_files $uri $uri/ $uri.html /index.html;
    }
}
```

### Opsi D — VPS / Docker (Node standalone, ~256–512 MB RAM)

```bash
docker compose up -d --build
```

Aplikasi berjalan di port **3000**. Batas memori container: **512 MB** (lihat `docker-compose.yml`).

Build manual tanpa Docker:

```bash
npm run build
node .next/standalone/server.js
```

## Optimasi yang sudah diterapkan

- Halaman utama tanpa Three.js (tur 3D dimuat lazy di `/3d/360web`).
- Cache panjang untuk gambar panorama & aset statis.
- Gambar WebP/AVIF otomatis (kecuali build statis).
- Tur virtual: geometri & DPR lebih rendah di mobile.
- `/test` dinonaktifkan di production.

## Perintah

| Perintah | Keterangan |
|----------|------------|
| `npm run dev` | Development |
| `npm run build` | Build production (standalone) |
| `npm run build:static` | Build folder `out/` untuk hosting statis |
| `npm run start` | Jalankan server production |
| `npm run lint` | ESLint |
