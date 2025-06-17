import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI('AIzaSyCgT7p-5PI7q3yrGem08jh9wradbBUlWYg');

const parseMarkdown = (text) => {
  return text
    .replace(/\*\*\*(.*?)\*\*\*/g, '<strong><em>$1</em></strong>') // bold + italic
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') // bold
    .replace(/\*(.*?)\*/g, '<em>$1</em>'); // italic
};

// Fetch products from backend
const fetchProducts = async () => {
  try {
    const response = await fetch('http://localhost:5000/api/products');
    const data = await response.json();
    return Array.isArray(data) ? data : [];
  } catch (error) {
    console.error('Error fetching products:', error);
    return [];
  }
};

// Filter products based on user input
const filterRelevantProducts = (products, userInput) => {
  const input = userInput.toLowerCase();
  const keywords = input.split(' ');

  // Deteksi apakah user menyebut brand spesifik
  const mentionedBrand = ['nike', 'adidas', 'puma', 'converse', 'vans'].find(brand =>
    input.includes(brand)
  );

  return products
    .filter((product) => {
      const searchText = `${product.title} ${product.description} ${product.brand} ${product.category} ${product.colorway}`.toLowerCase();

      // Jika user sebut brand spesifik, cocokkan hanya brand itu
      if (mentionedBrand) {
        return (
          product.brand.toLowerCase() === mentionedBrand &&
          keywords.some((keyword) => searchText.includes(keyword))
        );
      }

      // Jika tidak, cari produk relevan umum
      return keywords.some((keyword) => searchText.includes(keyword));
    })
    .slice(0, 4); // batasi produk
};



// export 
export const getRecommendation = async (userInput) => {
  const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });

  try {
    // Fetch products from backend
    const allProducts = await fetchProducts();

    // Check if user is asking for recommendations
    const isProductRecommendation =
      /rekomendasi|suggest|recommend|sepatu|shoes|sneaker|Tas|Jam|produk|product|cari|find|looking for/i.test(
        userInput
      );

    let relevantProducts = [];
    if (isProductRecommendation && allProducts.length > 0) {
      relevantProducts = filterRelevantProducts(allProducts, userInput);
    }

    // Create context for AI
    const productContext =
      relevantProducts.length > 0
        ? `Available products: ${relevantProducts
            .map((p) => `${p.title} (${p.brand}, $${p.retailPrice})`)
            .join(', ')}`
        : '';

   const prompt = `gi
Kamu adalah asisten belanja AI untuk ReKicks, sebuah brand e-commerce global yang menjual sneakers, apparel, jaket, dan aksesoris.

${productContext ? `Berikut adalah data produk yang tersedia:\n${productContext}\n` : ''}

Jawablah pertanyaan pengguna dalam bahasa Indonesia atau bahasa Inggris, sesuai dengan bahasa yang digunakan oleh pengguna. Gunakan nada yang ramah dan profesional.

- Fokus hanya pada produk yang dijual oleh ReKicks, dan jangan membahas topik di luar itu.
- Jika relevan, berikan saran produk yang cocok untuk kebutuhan pengguna, lalu jelaskan alasan singkat mengapa produk tersebut sesuai.
- Jika pengguna bertanya siapa pemilik atau CEO ReKicks, jawab dengan **Afgan Irwansyah Hidayat** (di bold pesannya).
- Jika pengguna bertanya siapa Bapak Fairuz, jawab dengan **Anwar**.
- Jika pengguna bertanya siapa geng menakutkan, jawab dengan **Ngadi AllBase**.
- Jika pengguna bertanya siapa orang terjelek sedunia, jawab dengan **Ahmad Jidan Bashir**.

User: "${userInput}"

${relevantProducts.length > 0 
  ? 'Berikan rekomendasi produk berdasarkan data yang tersedia di atas. Jangan ulang nama produk lebih dari satu kali.' 
  : 'Jika tidak ada produk relevan, tetap beri jawaban sopan bahwa saat ini belum ada produk yang sesuai.'}
`;


    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = await response.text();

    return {
      text: parseMarkdown(text),
      products: relevantProducts,
    };
  } catch (error) {
    console.error('Error from Gemini:', error);
    return {
      text: 'Maaf, saya mengalami kesulitan untuk merespon saat ini.',
      products: [],
    };
  }
};
