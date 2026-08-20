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
    date: "2026.08.26",
    time: "세부 시간 업데이트 예정",
    venue: "세부 장소 업데이트 예정",
    title: "Copilot으로 뭘 할까? 이번엔 홈페이지다",
    shortTitle: "Copilot 홈페이지 만들기",
    description: "AI와 대화하며 아이디어를 정리하고, 실제로 열어볼 수 있는 나만의 홈페이지까지 만들어보는 실습형 작은 놀이터입니다.",
    audience: "AI 초보자 및 AI를 활용한 홈페이지 생성에 관심 있는 누구나",
    capacity: "40명 내외",
    format: "따라 하며 완성하는 실습",
    duration: "2시간",
    topics: ["홈페이지 목적과 구성 정하기", "Copilot과 페이지 문구 만들기", "직접 열어보고 수정하는 반복 과정"],
    note: "세부 준비물과 참여 안내는 커뮤니티 공지를 통해 업데이트됩니다.",
    image: "/small-playground/03-copilot-homepage.jpg",
  },
  {
    slug: "4",
    number: "#04",
    status: "UPCOMING",
    date: "2026.09.12",
    time: "업데이트 예정",
    venue: "업데이트 예정",
    title: "나만의 에이전트 만들기",
    shortTitle: "나만의 에이전트 만들기",
    description: "허석 Microsoft MVP와 함께, 반복 업무와 나만의 아이디어를 실제로 도와주는 AI 에이전트로 설계하고 만들어보는 실습형 작은 놀이터입니다.",
    audience: "AI 에이전트를 처음 만들거나 내 업무에 맞게 활용해보고 싶은 사람",
    capacity: "업데이트 예정",
    format: "실습형 프로그램 예정",
    duration: "업데이트 예정",
    topics: ["에이전트가 도와줄 업무와 목표 정하기", "역할·지식·지시 사항을 연결해 나만의 에이전트 구성하기", "직접 대화하고 테스트하며 결과를 개선하기"],
    note: "허석 Microsoft MVP가 주관할 예정입니다. 최종 진행 정보와 준비물은 공식 공지에서 업데이트됩니다.",
  },
  {
    slug: "5",
    number: "#05",
    status: "UPCOMING",
    date: "2026.10.04",
    time: "업데이트 예정",
    venue: "업데이트 예정",
    title: "북토크: 언런 Un-Learn",
    shortTitle: "북토크 · Un-Learn",
    description: "AI 시대, 이미 배운 것을 잠시 내려놓을 때 시작되는 ‘진짜 성장’을 함께 질문하는 북토크입니다.",
    audience: "AI 시대의 성장과 커리어 전환을 고민하는 사람",
    capacity: "업데이트 예정",
    format: "저자 북토크와 대화",
    duration: "업데이트 예정",
    topics: ["익숙한 성공 방식을 다시 바라보기", "배운 것을 내려놓는 용기", "나만의 다음 성장 질문 만들기"],
    note: "GCF 김연지 작가와 함께하는 프로그램으로 기획되었습니다.",
  },
];

export function getSmallPlaygroundProgram(slug: string) {
  return smallPlaygroundPrograms.find((program) => program.slug === slug);
}
