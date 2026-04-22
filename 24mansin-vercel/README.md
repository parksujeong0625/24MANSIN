# 🔮 재미로보는 24만신

사주팔자 기반 이사운세 웹앱

## ✨ 주요 기능

- 📅 만세력 기반 사주팔자 계산
- 🏠 오행에 맞는 이사 방위 추천
- 🌆 성향에 맞는 도시/동네 추천
- 📖 만화 캐릭터 매칭
- ✅ 이사 체크리스트
- 📅 이사 길일 계산기
- 💰 Kakao Adfit 광고 수익화
- 🖼️ Unsplash API 도시 이미지

## 🚀 기술 스택

- **Frontend**: HTML, CSS, JavaScript (Vanilla)
- **Hosting**: Vercel
- **API**: Unsplash API (이미지), Kakao Adfit (광고)
- **PWA**: Service Worker, Manifest

## 📦 배포

Vercel로 자동 배포됩니다.

자세한 배포 가이드는 [VERCEL_배포_가이드.md](./VERCEL_배포_가이드.md)를 참고하세요.

## 🔧 개발

```bash
# 로컬에서 테스트 (Python 3)
python -m http.server 8000

# 브라우저에서 열기
http://localhost:8000
```

## 📝 환경 변수

`.env.local` 파일을 생성하고 다음 변수를 설정하세요:

```
UNSPLASH_ACCESS_KEY=your_unsplash_api_key
```

## 📄 라이선스

MIT License

## 👨‍💻 개발자

재미로 만든 프로젝트입니다 😊
