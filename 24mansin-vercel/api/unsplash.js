// Vercel 서버리스 함수 - Unsplash API 프록시
// API 키를 클라이언트에 노출하지 않고 안전하게 이미지 가져오기

export default async function handler(req, res) {
  // CORS 헤더 설정
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // OPTIONS 요청 처리 (CORS preflight)
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // GET 요청만 허용
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { query } = req.query;

    if (!query) {
      return res.status(400).json({ error: 'Query parameter is required' });
    }

    // 환경 변수에서 Unsplash API 키 가져오기
    const UNSPLASH_ACCESS_KEY = process.env.UNSPLASH_ACCESS_KEY;

    if (!UNSPLASH_ACCESS_KEY) {
      console.error('UNSPLASH_ACCESS_KEY is not set');
      // API 키가 없으면 폴백 이미지 반환
      return res.status(200).json({
        imageUrl: `https://source.unsplash.com/400x300/?${encodeURIComponent(query)},city`
      });
    }

    // Unsplash API 호출
    const response = await fetch(
      `https://api.unsplash.com/search/photos?query=${encodeURIComponent(query)}&per_page=1&orientation=landscape`,
      {
        headers: {
          'Authorization': `Client-ID ${UNSPLASH_ACCESS_KEY}`
        }
      }
    );

    if (!response.ok) {
      throw new Error(`Unsplash API error: ${response.status}`);
    }

    const data = await response.json();

    // 이미지 URL 반환
    if (data.results && data.results.length > 0) {
      return res.status(200).json({
        imageUrl: data.results[0].urls.small,
        photographer: data.results[0].user.name,
        photographerUrl: data.results[0].user.links.html
      });
    } else {
      // 검색 결과가 없으면 폴백 이미지
      return res.status(200).json({
        imageUrl: `https://source.unsplash.com/400x300/?${encodeURIComponent(query)},city`
      });
    }

  } catch (error) {
    console.error('Error fetching from Unsplash:', error);
    
    // 에러 발생 시 폴백 이미지 반환
    const { query } = req.query;
    return res.status(200).json({
      imageUrl: `https://source.unsplash.com/400x300/?${encodeURIComponent(query || 'city')},city`
    });
  }
}
