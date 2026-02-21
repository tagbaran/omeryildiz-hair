# Ömer Yıldız - Saç Ekimi Operasyon Koordinasyonu

Bu proje, Ömer Yıldız için hazırlanmış premium, modern ve mobil uyumlu bir Next.js web sitesidir.

## 🛠️ Kurulum ve Çalıştırma

1. **Gerekli Paketleri Yükleyin:**
   ```bash
   npm install
   ```
   (Eğer `lucide-react`, `clsx`, `tailwind-merge` yüklü değilse otomatik yüklenecektir veya manuel yükleyiniz.)

2. **Geliştirme Sunucusunu Başlatın:**
   ```bash
   npm run dev
   ```
   Tarayıcınızda [http://localhost:3000](http://localhost:3000) adresine gidin.

3. **Production Build (Yayınlama Öncesi):**
   ```bash
   npm run build
   npm start
   ```

## ⚙️ Site Ayarları (Düzenlenebilir)

Site üzerindeki iletişim bilgileri, sloganlar ve hizmetler tek bir dosyadan yönetilebilir:
📍 `src/lib/siteConfig.ts`

Bu dosyayı açarak aşağıdaki bilgileri güncelleyebilirsiniz:
- `brandName`: Marka İsmi
- `whatsappNumber`: WhatsApp Numarası (Örn: 905xxxxxxxxx)
- `instagramUrl`: Instagram Linki
- `services`: Hizmet listesi

## 🎨 Tasarım ve Özelleştirme

- **Tailwind CSS**: `tailwind.config.ts` ve `src/app/globals.css` üzerinden renkler ve stiller düzenlenebilir.
- **Font**: Google Fonts üzerinden `Inter` kullanılmıştır. `src/app/layout.tsx` dosyasından değiştirilebilir.

## 📁 Dosya Yapısı

- `/src/app`: Sayfalar (Home, Services, Results, Contact, Privacy)
- `/src/components`: Tekrar kullanılabilir bileşenler (Navbar, Footer, Button, Card)
- `/src/lib`: Yardımcı fonksiyonlar ve konfigürasyon

## 🚀 Yayına Alma (Deploy)

Bu proje [Vercel](https://vercel.com) üzerinde kolayca yayınlanabilir.
1. Projeyi GitHub'a yükleyin.
2. Vercel'de yeni proje oluşturun ve repo'yu seçin.
3. Deploy butonuna basın.

---
**Önemli Not:** Bu web sitesi bilgilendirme amaçlıdır. Tıbbi tavsiye içermez.
