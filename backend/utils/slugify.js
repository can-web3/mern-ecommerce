// src/utils/slugify.js
import slugify from 'slugify';

/**
 * Verilen metni URL dostu bir slug’a çevirir.
 * Varsayılan olarak:
 *  - Küçük harfe çevirir (lower: true)
 *  - Sadece [a–z0–9-] karakterlerini korur (strict: true)
 *  - Türkçe karakter dönüşümü uygular (locale: 'tr')
 *
 * @param {string} text — Slug’a dönüştürülecek başlık/metin
 * @returns {string} — Oluşturulan slug
 */
export function generateSlug(text) {
  return slugify(text, {
    lower: true,
    strict: true,
    locale: 'tr',
  });
}
