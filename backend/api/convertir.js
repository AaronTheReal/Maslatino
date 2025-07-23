import fs from 'fs';
import mongoose from 'mongoose';
import * as cheerio from 'cheerio';
import dotenv from 'dotenv';
import Noticia from '../models/Noticias.js';
import Category from '../models/Categorias.js';

dotenv.config();

// Función para convertir HTML a bloques de contenido
function htmlToBlocks(html) {
  const $ = cheerio.load(html);
  const blocks = [];

  $('body').children().each((_, el) => {
    const tag = el.tagName.toLowerCase();
    const $el = $(el);

    if (tag === 'p') {
      const link = $el.find('a').first();
      if (link.length && $el.children().length === 1) {
        blocks.push({
          type: 'link',
          href: link.attr('href'),
          textLink: link.text(),
          tag: 'p'
        });
      } else {
        blocks.push({
          type: 'text',
          text: $el.text(),
          tag: 'p'
        });
      }
    } else if (['h1', 'h2', 'h3', 'h4'].includes(tag)) {
      blocks.push({
        type: 'text',
        text: $el.text(),
        tag
      });
    } else if (tag === 'blockquote') {
      blocks.push({
        type: 'quote',
        quote: $el.text()
      });
    } else if (tag === 'ul' || tag === 'ol') {
      const items = [];
      $el.find('li').each((_, li) => {
        items.push($(li).text());
      });
      blocks.push({
        type: 'list',
        ordered: tag === 'ol',
        items
      });
    } else if (tag === 'hr') {
      blocks.push({
        type: 'text',
        text: '---',
        tag: 'p'
      });
    } else {
      blocks.push({
        type: 'text',
        text: $el.text(),
        tag: 'p'
      });
    }
  });

  return blocks;
}

async function run() {
  const rawData = JSON.parse(fs.readFileSync('../api/NoticiasCambiar.json', 'utf8'));

  await mongoose.connect('mongodb+srv://aaronguapo69:X3B7D2o5jPZMgMlm@cluster0.uxax8yp.mongodb.net/RealMedia', {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });

  // Crear mapa de nombre → ObjectId
  const categorias = await Category.find({});
  const categoryMap = {};
  for (const cat of categorias) {
    categoryMap[cat.name] = cat._id;
  }

  for (const noticia of rawData) {
    const categoryIds = (noticia.categories || [])
      .map(nombre => categoryMap[nombre])
      .filter(Boolean); // Elimina los que no existan

    const nueva = new Noticia({
      title: noticia.title,
      slug: noticia.slug,
      summary: noticia.summary,
      originalUrl: noticia.originalUrl,
      authorName: noticia.authorName || 'Redacción',
      categories: categoryIds.length ? categoryIds : [categoryMap['Mundo']], // fallback
      tags: noticia.tags || [],
      content: (noticia.content || []).map(block => {
          const copy = { ...block };
          delete copy._id; // 🔥 Evita el error de cast a ObjectId
          return copy;
        }),
      meta: noticia.meta,
      createdAt: new Date(noticia.createdAt?.$date || Date.now()),
      updatedAt: new Date(noticia.updatedAt?.$date || Date.now())
    });

    try {
      await nueva.save();
      console.log(`✅ Guardada: ${nueva.slug}`);
    } catch (err) {
      console.error(`❌ Error con ${nueva.slug}:`, err.message);
    }
  }

  await mongoose.disconnect();
}

run();








/*





import fs from 'fs';
import mongoose from 'mongoose';
import * as cheerio from 'cheerio'; // 👈 Así se importa en ESM
import dotenv from 'dotenv';
import Noticia from '../models/Noticias.js'; // Asegúrate de que esté bien el path
import axios from 'axios';
dotenv.config();

// Función para convertir HTML en bloques
function htmlToBlocks(html) {
  const $ = cheerio.load(html);
  const blocks = [];

  $('body').children().each((_, el) => {
    const tag = el.tagName.toLowerCase();
    const $el = $(el);

    if (tag === 'p') {
      const link = $el.find('a').first();
      if (link.length && $el.children().length === 1) {
        blocks.push({
          type: 'link',
          href: link.attr('href'),
          textLink: link.text(),
          tag: 'p'
        });
      } else {
        blocks.push({
          type: 'text',
          text: $el.text(),
          tag: 'p'
        });
      }

    } else if (['h1', 'h2', 'h3', 'h4'].includes(tag)) {
      blocks.push({
        type: 'text',
        text: $el.text(),
        tag
      });

    } else if (tag === 'blockquote') {
      blocks.push({
        type: 'quote',
        quote: $el.text()
      });

    } else if (tag === 'ul' || tag === 'ol') {
      const items = [];
      $el.find('li').each((_, li) => {
        items.push($(li).text());
      });
      blocks.push({
        type: 'list',
        ordered: tag === 'ol',
        items
      });

    } else if (tag === 'hr') {
      blocks.push({
        type: 'text',
        text: '---',
        tag: 'p'
      });

    } else {
      blocks.push({
        type: 'text',
        text: $el.text(),
        tag: 'p'
      });
    }
  });

  return blocks;
}

// Función principal
async function run() {
  const rawData = JSON.parse(fs.readFileSync('../api/NoticiasCambiar.json', 'utf8'));

  // 1. Cargar mapa de categorías por ID → nombre
  const catRes = await axios.get('https://maslatino.com/wp-json/wp/v2/categories?per_page=100');
  const categoryMap = {};
  for (const cat of catRes.data) {
    categoryMap[cat.id] = cat.name;
  }

  await mongoose.connect('mongodb+srv://aaronguapo69:X3B7D2o5jPZMgMlm@cluster0.uxax8yp.mongodb.net/RealMedia', {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });

  for (const wp of rawData) {
    // Convertir IDs de categorías a nombres válidos en tu esquema
    const categoryNames = (wp.categories || [])
      .map(id => categoryMap[id])
      .filter(name => ['Mundo', 'Arte', 'Política', 'Finanzas', 'Familia', 'Deportes', 'Salud'].includes(name));

    const noticia = new Noticia({
      title: wp.title.rendered,
      slug: wp.slug,
      summary: cheerio.load(wp.excerpt.rendered).text().trim(),
      originalUrl: wp.link,
      authorName: wp.yoast_head_json?.author || 'Sin autor',
      categories: categoryNames.length ? categoryNames : ['Mundo'], // fallback
      tags: wp.yoast_head_json?.keywords || [],
      content: htmlToBlocks(wp.content.rendered),
      meta: {
        description: wp.yoast_head_json?.description || '',
        image: wp.yoast_head_json?.og_image?.[0]?.url || ''
      },
      createdAt: new Date(wp.date),
      updatedAt: new Date(wp.modified)
    });

    try {
      await noticia.save();
      console.log(`✅ Guardada: ${noticia.slug}`);
    } catch (err) {
      console.error(`❌ Error con ${noticia.slug}:`, err.message);
    }
  }

  mongoose.disconnect();
}


run();
















import fs from 'fs';
import mongoose from 'mongoose';
import * as cheerio from 'cheerio'; // 👈 Así se importa en ESM
import dotenv from 'dotenv';
import Noticia from '../models/Noticias.js'; // Asegúrate de que esté bien el path

dotenv.config();

// Función para convertir HTML en bloques
function htmlToBlocks(html) {
  const $ = cheerio.load(html);
  const blocks = [];

  $('body').children().each((_, el) => {
    const tag = el.tagName.toLowerCase();
    const $el = $(el);

    if (tag === 'p') {
      const link = $el.find('a').first();
      if (link.length && $el.children().length === 1) {
        blocks.push({
          type: 'link',
          href: link.attr('href'),
          textLink: link.text(),
          tag: 'p'
        });
      } else {
        blocks.push({
          type: 'text',
          text: $el.text(),
          tag: 'p'
        });
      }

    } else if (['h1', 'h2', 'h3', 'h4'].includes(tag)) {
      blocks.push({
        type: 'text',
        text: $el.text(),
        tag
      });

    } else if (tag === 'blockquote') {
      blocks.push({
        type: 'quote',
        quote: $el.text()
      });

    } else if (tag === 'ul' || tag === 'ol') {
      const items = [];
      $el.find('li').each((_, li) => {
        items.push($(li).text());
      });
      blocks.push({
        type: 'list',
        ordered: tag === 'ol',
        items
      });

    } else if (tag === 'hr') {
      blocks.push({
        type: 'text',
        text: '---',
        tag: 'p'
      });

    } else {
      blocks.push({
        type: 'text',
        text: $el.text(),
        tag: 'p'
      });
    }
  });

  return blocks;
}

// Función principal
async function run() {
  const rawData = JSON.parse(fs.readFileSync('../api/NoticiasCambiar.json', 'utf8'));

  await mongoose.connect('mongodb+srv://aaronguapo69:X3B7D2o5jPZMgMlm@cluster0.uxax8yp.mongodb.net/RealMedia', {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });

  for (const wp of rawData) {
    const noticia = new Noticia({
      title: wp.title.rendered,
      slug: wp.slug,
      summary: cheerio.load(wp.excerpt.rendered).text().trim(),
      originalUrl: wp.link,
      authorName: wp.yoast_head_json?.author || 'Sin autor',
      categories: wp.yoast_head_json?.articleSection || ['Mundo'],
      tags: wp.yoast_head_json?.keywords || [],
      content: htmlToBlocks(wp.content.rendered),
      meta: {
        description: wp.yoast_head_json?.description || '',
        image: wp.yoast_head_json?.og_image?.[0]?.url || ''
      },
      createdAt: new Date(wp.date),
      updatedAt: new Date(wp.modified)
    });

    try {
      await noticia.save();
      console.log(`✅ Guardada: ${noticia.slug}`);
    } catch (err) {
      console.error(`Error con ${noticia.slug}:`, err.message);
    }
  }

  mongoose.disconnect();
}

run();

*/