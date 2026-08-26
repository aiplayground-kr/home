import type { GalleryItem } from "../event-gallery";
import { eventMediaByFolder } from "../generated/event-media";
import type { SeasonSpeaker } from "./season-event-components";

export const buildSessions = [
  { time: "13:00–13:20", title: "환영합니다", ref: "WELCOME", company: "Microsoft", speaker: "송주현 리더", description: "BUILD / localhost:SEOUL의 문을 여는 환영 인사" },
  { time: "13:20–14:00", title: "1인 기업가가 되기 위한 마지막 관문, Claw and Agent Harness", ref: "BRK243", company: "Microsoft MVP", speaker: "김훈동", description: "Foundry의 Claw Agent와 다중 에이전트 시스템", linkedin: "https://www.linkedin.com/in/hoondong-kim/" },
  { time: "14:00–14:40", title: "Copilot Cowork로 업무 자동화 뚝딱 해치우기", ref: "SPECIAL", company: "Microsoft MVP", speaker: "전대호", description: "왕초보도 시작할 수 있는 Copilot Cowork 업무 자동화", linkedin: "https://www.linkedin.com/in/canrobot/" },
  { time: "14:40–15:20", title: "개발자가 주목해야 할 Build 2026 요약", ref: "BRK206", company: "Microsoft MVP", speaker: "이보라", description: "Visual Studio와 GitHub Copilot의 디버깅·프로파일링·테스트 에이전트", linkedin: "https://www.linkedin.com/in/learner-bora/" },
  { time: "15:20–16:00", title: "비개발자가 GitHub Copilot으로 팀 전용 AI 비서를 만든 이야기", ref: "LTG402", company: "GM Technical Korea", speaker: "이영빈", description: "아이디어를 AI 네이티브 런타임의 프로덕션 준비 에이전트로 연결한 경험", linkedin: "https://www.linkedin.com/in/youngbinlee/" },
  { time: "16:00–16:20", title: "Bio Break", ref: "BREAK", company: "", speaker: "", description: "휴식과 네트워킹" },
  { time: "16:20–16:50", title: "App Builder Agent로 학습 가이드 제작기", ref: "SPECIAL", company: "Office Tutor", speaker: "윤미영(유니)", description: "Copilot과 Agent로 손쉽게 만드는 학습 가이드", linkedin: "https://www.linkedin.com/in/younni/" },
  { time: "16:50–17:50", title: "GitHub Copilot 3종 기능, 직접 해보기!", ref: "WORKSHOP", company: "Microsoft", speaker: "유승호", description: "Ask·Agent·Plan 기능으로 경험하는 AI 기반 개발 워크플로우", linkedin: "https://www.linkedin.com/in/hahahaysh/" },
];

export const buildSpeakers: SeasonSpeaker[] = [
  { name: "김훈동", role: "Microsoft AI MVP/RD · KT AX", topic: "1인 기업가가 되기 위한 마지막 관문, Claw and Agent Harness", image: "/events/season-2/build/archive/46.png", linkedin: "https://www.linkedin.com/in/hoondong-kim/" },
  { name: "전대호", role: "Microsoft MCT·MVP · 캔로봇", topic: "Copilot Cowork로 업무 자동화 뚝딱 해치우기", image: "/events/season-2/build/archive/45.png", linkedin: "https://www.linkedin.com/in/canrobot/" },
  { name: "이보라", role: "Microsoft MVP · 모던웹연구소", topic: "엔터프라이즈가 사랑하는 GitHub Copilot SDK와 확장 가능성", image: "/events/season-2/build/archive/47.png", linkedin: "https://www.linkedin.com/in/learner-bora/" },
  { name: "이영빈", role: "Innovation Strategy Lead · GMTCK", topic: "비개발자가 GitHub Copilot으로 팀 전용 AI 비서를 만든 이야기", image: "/events/season-2/build/archive/50.png", linkedin: "https://www.linkedin.com/in/youngbinlee/" },
  { name: "윤미영", role: "AI Trainer · Microsoft CSP 기획 PM", topic: "Microsoft Copilot Agent로 학습가이드 제작하기", image: "/events/season-2/build/archive/49.png", linkedin: "https://www.linkedin.com/in/younni/" },
  { name: "유승호", role: "MTT · Microsoft MCT", topic: "GitHub Copilot 3종 기능 직접 해보기", image: "/events/season-2/build/archive/48.png", linkedin: "https://www.linkedin.com/in/hahahaysh/" },
];

const buildGalleryMeta: Record<string, Omit<GalleryItem, "src">> = {
  "32.png": { alt: "Microsoft BUILD localhost Seoul AI놀이터 여름 밋업 공식 포스터", caption: "2026년 6월 14일, 한국마이크로소프트에서 열린 AI놀이터 여름 밋업", label: "OFFICIAL POSTER" },
  "33.png": { alt: "BUILD localhost Seoul AI놀이터 전체 커뮤니티 구성원 보드", caption: "행사를 함께 만든 AI놀이터 Crew", label: "COMMUNITY CREW" },
  "34.png": { alt: "BUILD localhost Seoul AI놀이터 연사 일곱 명 소개 보드", caption: "BUILD를 커뮤니티의 언어로 전한 연사 라인업", label: "SPEAKER BOARD" },
  "35.png": { alt: "BUILD localhost Seoul AI놀이터 행사 참가자 단체사진", caption: "발표와 실습을 마친 뒤 함께 남긴 단체사진", label: "GROUP PHOTO" },
  "36.png": { alt: "BUILD localhost Seoul AI놀이터 발표 현장 사진 모음", caption: "무대에서 BUILD를 쉽고 생생하게 풀어낸 연사들", label: "LIVE SPEAKERS" },
  "37.png": { alt: "BUILD localhost Seoul AI놀이터 등록 세션 네트워킹 현장 사진 모음", caption: "등록부터 세션과 네트워킹까지 이어진 행사 현장", label: "EVENT SCENES" },
  "38.png": { alt: "BUILD localhost Seoul AI놀이터 여름 밋업 Crew 소개 보드", caption: "AI놀이터 여름 밋업을 함께 준비한 Crew", label: "MEETUP CREW" },
  "39.png": { alt: "BUILD localhost Seoul AI놀이터 제주룸 발표와 실습 현장", caption: "제주룸을 가득 채운 참가자와 실습 현장", label: "FULL HOUSE" },
  "40.png": { alt: "BUILD localhost Seoul AI놀이터 전체 스피커 포스터", caption: "AI놀이터 여름 밋업의 전체 스피커", label: "SPEAKER LINEUP" },
  "41.png": { alt: "BUILD localhost Seoul AI놀이터 행사 일정과 세션 시간표", caption: "BUILD 여름 밋업 세션 시간표", label: "SESSION GUIDE" },
  "42.png": { alt: "BUILD localhost Seoul AI놀이터 스피커 소개 포스터", caption: "BUILD를 대신 읽고 쉽게 풀어준 사람들", label: "SPEAKER POSTER" },
  "45.png": { alt: "전대호 Copilot Cowork 업무 자동화 세션 소개", caption: "Copilot Cowork로 업무 자동화 뚝딱 해치우기", label: "SESSION · JEON DAEHO" },
  "46.png": { alt: "김훈동 Claw and Agent Harness 세션 소개", caption: "1인 기업가가 되기 위한 마지막 관문, Claw and Agent Harness", label: "SESSION · KIM HOONDONG" },
  "47.png": { alt: "이보라 GitHub Copilot SDK 세션 소개", caption: "엔터프라이즈가 사랑하는 GitHub Copilot SDK와 확장 가능성", label: "SESSION · LEE BORA" },
  "48.png": { alt: "유승호 GitHub Copilot 실습 세션 소개", caption: "GitHub Copilot 3종 기능 직접 해보기", label: "SESSION · YOU SUNGHO" },
  "49.png": { alt: "윤미영 Microsoft Copilot Agent 세션 소개", caption: "Microsoft Copilot Agent로 학습 가이드 제작하기", label: "SESSION · YOUN MIYOUNG" },
  "50.png": { alt: "이영빈 GitHub Copilot AI 비서 세션 소개", caption: "비개발자가 팀 전용 AI 비서를 만든 이야기", label: "SESSION · LEE YOUNGBIN" },
};

export const buildGallery: GalleryItem[] = eventMediaByFolder["season-2/build/archive"].map((src) => {
  const filename = src.slice(src.lastIndexOf("/") + 1);
  return { src, ...(buildGalleryMeta[filename] ?? { alt: `BUILD 행사 기록 ${filename}`, caption: `BUILD 행사 기록 ${filename}` }) };
});

export const snowflakeSessions = [
  { no: "01", time: "08:00–09:30", topic: "Copilot", speaker: "전대호", role: "Microsoft MVP", crew: ["주인화", "이종혁"], description: "Copilot 설명과 데모로 하루의 첫 플레이를 엽니다.", image: "/team/daeho-jeon.jpg", linkedin: "https://www.linkedin.com/in/canrobot/" },
  { no: "02", time: "09:30–11:00", topic: "Copilot Studio", speaker: "진미나", role: "Microsoft MVP", crew: ["윤미영", "염선영"], description: "Copilot Studio 기반 업무와 Agent 시나리오를 설명하고 시연합니다.", image: "/team/mina-jin.jpg", linkedin: "https://www.linkedin.com/in/mina-jin-91333493/" },
  { no: "03", time: "11:00–12:30", topic: "Power Platform / P.P", speaker: "이재석", role: "Microsoft MVP", crew: ["김성미"], description: "Power Platform을 활용한 자동화와 실제 업무 시나리오를 만납니다.", image: "/events/season-2/build/archive/33.png", imageCrop: { left: "-524px", top: "-92px" }, linkedin: "https://www.linkedin.com/in/leejaeseok/" },
  { no: "04", time: "13:30–15:00", topic: "Power Platform / P.P", speaker: "허석", role: "Microsoft MVP", crew: ["이미희", "박경덕"], description: "Power Platform 기반 자동화와 업무 적용 경험을 데모로 연결합니다.", image: "/team/huh-seok.jpg", linkedin: "https://www.linkedin.com/in/somissem/" },
  { no: "05", time: "15:00–16:30", topic: "GitHub Copilot", speaker: "이보라", role: "Microsoft MVP", crew: ["진선라(오후)", "김성미"], description: "개발자를 위한 AI Coding과 GitHub Copilot 경험을 공유합니다.", image: "/season1/feedback-bora-lee.jpg", linkedin: "https://www.linkedin.com/in/learner-bora/" },
  { no: "06", time: "16:30–18:00", topic: "Copilot + PC", speaker: "서동훈", role: "Microsoft", crew: ["문종호"], description: "Surface 기반 AI on Device 경험과 현장 데모를 콘텐츠로 만듭니다.", image: "/events/season-2/build/archive/33.png", imageCrop: { left: "-187px", top: "-419px" }, linkedin: "https://www.linkedin.com/in/daveseo/" },
];
