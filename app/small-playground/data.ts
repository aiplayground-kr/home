export type SmallPlaygroundProgram = {
  slug: string;
  number: string;
  status: string;
  date: string;
  time: string;
  venue: string;
  title: string;
  shortTitle: string;
  description: string;
  audience: string;
  capacity: string;
  format: string;
  duration: string;
  topics: string[];
  note: string;
  image?: string;
  externalUrl?: string;
};

export const smallPlaygroundPrograms: SmallPlaygroundProgram[] = [
  {
    slug: "1",
    number: "#01",
    status: "ARCHIVE",
    date: "2026.07.05",
    time: "10:00–12:30 · 브런치 선택",
    venue: "한국마이크로소프트 13층",
    title: "LinkedIn으로 소셜 브랜딩하기",
    shortTitle: "LinkedIn 소셜 브랜딩",
    description: "LinkedIn을 처음 시작하는 사람과 함께 기록·축적·연결이 개인과 조직의 브랜드로 이어지는 과정을 배운 첫 번째 작은 놀이터입니다.",
    audience: "LinkedIn을 처음 시작하거나 프로필과 콘텐츠 방향을 잡고 싶은 사람",
    capacity: "20명 기준 · 참여 인원에 따라 강의 또는 워크숍",
    format: "20명 이상 강의 · 20명 이하 워크숍",
    duration: "2시간 30분",
    topics: ["프로필의 첫인상 정리", "나만의 기록 주제 찾기", "관계와 콘텐츠를 꾸준히 연결하는 법"],
    note: "『된다! 링크드인 활용법』 변재일 저자와 함께 진행했습니다.",
    image: "/small-playground/01-linkedin-branding.jpg",
    externalUrl: "https://kr.linkedin.com/posts/sollar99_%EB%90%9C%EB%8B%A4-%EB%A7%81%ED%81%AC%EB%93%9C%EC%9D%B8-%ED%99%9C%EC%9A%A9%EB%B2%95-%EB%B3%80%EC%9E%AC%EC%9D%BC-%EB%8B%98%EC%9D%98-%EB%A7%81%ED%81%AC%EB%93%9C%EC%9D%B8%EC%97%90-%EB%8C%80%ED%95%9C-%EC%97%B4%EC%A0%95%EA%B0%95%EC%97%B0-%EA%B7%B8%EB%A6%AC%EA%B3%A0-activity-7480060156257423360-q_W_",
  },
  {
    slug: "2",
    number: "#02",
    status: "ARCHIVE",
    date: "2026.08.09",
    time: "세부 시간은 기록 업데이트 예정",
    venue: "세부 장소는 기록 업데이트 예정",
    title: "AI가 작곡하고, 내가 프로듀싱한다",
    shortTitle: "나만의 음악 만들기",
    description: "Copilot으로 가사를 쓰고 Suno AI로 음악을 완성하며, 생성형 AI를 부담 없이 창작 도구로 경험하는 초보자 실습입니다.",
    audience: "AI 음악 만들기를 처음 경험하는 초보자",
    capacity: "15명 내외",
    format: "개인 실습 중심 워크숍",
    duration: "1–2시간",
    topics: ["Copilot으로 가사 초안 만들기", "Suno AI로 장르와 분위기 설계", "나만의 음악 결과물 완성"],
    note: "진입 장벽을 낮춘 실습형 프로그램으로 기획되었습니다.",
    image: "/small-playground/02-ai-music.jpg",
    externalUrl: "https://www.linkedin.com/groups/14571141/?q=highlightedFeedForGroups&highlightedUpdateUrn=urn%3Ali%3Aactivity%3A7486230590480871425",
  },
  {
    slug: "3",
    number: "#03",
    status: "NEXT",
    date: "2026.09.01",
    time: "오후 7:30–9:30",
    venue: "Microsoft Korea 13층",
    title: "GitHub Copilot Dev Days: 나만의 홈페이지 만들기",
    shortTitle: "GitHub Copilot Dev Days",
    description: "GitHub Copilot과 함께 2시간 만에 아이디어를 실제로 열어볼 수 있는 나만의 홈페이지로 완성하는 실습형 Dev Days입니다.",
    audience: "AI 초보자 및 AI를 활용한 홈페이지 생성에 관심 있는 누구나",
    capacity: "40명 내외",
    format: "GitHub Copilot 실습형 Dev Days",
    duration: "2시간",
    topics: ["홈페이지 목적과 구성 정하기", "GitHub Copilot과 페이지 만들기", "직접 열어보고 수정하는 반복 과정"],
    note: "전대호 Microsoft MVP가 진행합니다. 상세 참여 안내는 커뮤니티 공지에서 확인할 수 있습니다.",
    image: "/small-playground/03-github-copilot-dev-days.png",
  },
  {
    slug: "4",
    number: "#04",
    status: "UPCOMING",
    date: "2026.09.12",
    time: "업데이트 예정",
    venue: "업데이트 예정",
    title: "GitHub Copilot으로 만들면서 배우는 GitHub",
    shortTitle: "만들면서 배우는 GitHub",
    description: "GitHub Copilot과 함께 직접 만들며 저장소, 스킬, 협업 흐름과 배포까지 하나의 결과물로 익히는 실습형 작은 놀이터입니다.",
    audience: "GitHub와 GitHub Copilot을 결과물을 만들며 익히고 싶은 사람",
    capacity: "업데이트 예정",
    format: "GitHub Copilot 실습",
    duration: "2–3시간 예정",
    topics: ["저장소와 브랜치로 작업 시작하기", "GitHub Copilot 스킬을 활용해 결과물 만들기", "GitHub Pages와 자동화로 직접 배포하기"],
    note: "세부 시간과 준비물은 공식 공지를 통해 업데이트됩니다.",
  },
  {
    slug: "5",
    number: "#05",
    status: "UPCOMING",
    date: "2026.10.04",
    time: "오전 10:00–12:00",
    venue: "업데이트 예정",
    title: "북토크: 언런 Un-Learn · 김연지",
    shortTitle: "북토크 · Un-Learn",
    description: "AI 시대, 이미 배운 것을 잠시 내려놓을 때 시작되는 ‘진짜 성장’을 함께 질문하는 북토크입니다.",
    audience: "AI 시대의 성장과 커리어 전환을 고민하는 사람",
    capacity: "업데이트 예정",
    format: "저자 북토크와 대화",
    duration: "2시간",
    topics: ["익숙한 성공 방식을 다시 바라보기", "배운 것을 내려놓는 용기", "나만의 다음 성장 질문 만들기"],
    note: "김연지 작가와 함께하는 일요일 오전 북토크입니다.",
  },
  {
    slug: "6",
    number: "#06",
    status: "UPCOMING",
    date: "2026.10.10",
    time: "오후 4:00–7:00",
    venue: "업데이트 예정",
    title: "Women Who Code × GitHub Copilot Dev Days",
    shortTitle: "Women Who Code DevDays",
    description: "Women Who Code가 주관하고 작은 놀이터가 연합하는 GitHub Copilot Dev Days입니다. 실습과 대화를 넘어 네트워킹에 더 많은 시간을 배정합니다.",
    audience: "미드–시니어 여성 엔지니어",
    capacity: "여성 엔지니어 30명 한정",
    format: "DevDays 실습 · 확장 네트워킹",
    duration: "3시간",
    topics: ["GitHub Copilot Dev Days 실습", "미드–시니어 엔지니어 경험 공유", "서로의 다음 연결을 만드는 네트워킹"],
    note: "이보라 Microsoft MVP·Women Who Code 리더와 함께 기획한 Alliance 프로그램입니다.",
  },
  {
    slug: "7",
    number: "#07",
    status: "UPCOMING",
    date: "2026.10 · 일정 협의 중",
    time: "업데이트 예정",
    venue: "업데이트 예정",
    title: "Copilot으로 디자인이 가능하다고?",
    shortTitle: "Copilot 디자인 스튜디오",
    description: "Copilot으로 아이디어를 시각화하고 이미지 생성과 편집, 영상 제작까지 직접 경험하는 크리에이티브 실습형 작은 놀이터입니다.",
    audience: "AI로 디자인·이미지·영상을 만들어보고 싶은 누구나",
    capacity: "업데이트 예정",
    format: "크리에이티브 실습",
    duration: "업데이트 예정",
    topics: ["프롬프트로 이미지 생성하기", "Copilot으로 이미지 편집하기", "아이디어를 짧은 영상으로 확장하기"],
    note: "10월 중 진행 예정이며, 정확한 일정과 진행자는 공식 공지를 통해 안내합니다.",
  },
];

export function getSmallPlaygroundProgram(slug: string) {
  return smallPlaygroundPrograms.find((program) => program.slug === slug);
}
