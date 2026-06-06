import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

export async function generateElegy(pastSelf: string, presentSelf: string) {
  const model = genAI.getGenerativeModel({ 
    model: 'gemini-flash-latest',
    generationConfig: { responseMimeType: "application/json" }
  });

  const prompt = `Kamu adalah seorang penyair kontemplatif yang menulis dalam Bahasa Indonesia.
  
Versi lama diri seseorang: ${pastSelf}
Versi sekarang diri mereka: ${presentSelf}

Buat dua bagian dan kembalikan HANYA dalam format JSON valid:
{
  "eulogy": "...",
  "mirror": "..."
}

eulogy: Elegi puitis 3-4 kalimat untuk versi lama mereka. Tone: perpisahan hangat dan penuh hormat — bukan penyesalan. Akui keberadaan versi itu sebagai sesuatu yang nyata dan berharga, lalu lepaskan dengan anggun. Bahasa puitis dan metaforis, terasa personal.

mirror: Refleksi prosa 3-4 kalimat yang menunjukkan gap antara dulu dan sekarang. Tone: bukan menghakimi, hanya mengamati dengan jujur dan tajam seperti cermin. Tunjukkan apa yang sesungguhnya tumbuh dari perpindahan itu. Tidak boleh generik.

Hanya kembalikan JSON. Tidak ada teks lain, tidak ada markdown backtick.`;

  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    
    // Safety fallback just in case the model wraps in markdown
    const cleanedText = text.replace(/```json/g, '').replace(/```/g, '').trim();
    
    const json = JSON.parse(cleanedText);
    return { eulogy: json.eulogy, mirror: json.mirror };
  } catch (error: any) {
    console.error("Gemini Error:", error);
    throw new Error('Gagal memproses respons AI: ' + (error?.message || 'Error tidak diketahui'));
  }
}
