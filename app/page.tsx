"use client";

import { FormEvent, useEffect, useRef, useState } from "react";

const skills = [
  "생성형 AI 콘텐츠 제작 교육",
  "퍼스널 브랜딩 네임 · 로고 기획 및 제작",
  "숏폼 콘텐츠 · AI 영상 제작",
  "프롬프트 엔지니어링",
  "업무 생산성 자동화",
  "바이브코딩 · 웹페이지, 랜딩페이지 제작",
];

const keyRoles = [
  "함온 AI 협동 조합 이사",
  "한국 AI 리터러시 강사 협회 이사",
  "디지털융합교육원 지도교수",
  "제3회 SIAFF AI 영화제 심사위원",
  "고양영상미디어 지역 커뮤니티 [APS] 대표",
];

const practicalTeachingExperiences = [
  "MBC아카데미컴퓨터학원 · 훈련교사",
  "(재)서울현대교육재단 · IT 직무 교육",
  "2025년, 2026년 희망리턴패키지 재기사업화 채움멘토",
  "(주)지아이에듀테크 · 전임강사",
  "(주)카버코리아 디자인팀",
  "(주)삼덕공사 디자인팀 · 의전행사",
  "그린컴퓨터아트학원 · 3D MAX",
  "NCS 확인강사",
  "기관·학교·기업 대상 생성형 AI 활용 특강 다수 진행",
];

const programs = [
  ["PROGRAM 01", "AI 기반 업무 효율화", "구글 워크스페이스와 생성형 AI를 활용해 문서 작성과 반복 업무를 간소화하고, Gems 기반의 맞춤형 AI 비서와 챗봇을 구축하여 실무 프로세스의 효율을 높이는 교육입니다."],
  ["PROGRAM 02", "AI 콘텐츠 기획 및 제작", "생성형 AI를 활용해 아이디어를 발굴하고, 카드뉴스·포스터·이미지 콘텐츠 등 다양한 시각 콘텐츠로 구체화하는 실습 중심 교육입니다."],
  ["PROGRAM 03", "AI 영상·숏폼 제작", "스토리 구성부터 이미지 생성, 영상 제작, 음성·음악 활용, 편집까지 AI 영상과 숏폼 콘텐츠를 완성하는 실습 중심 교육입니다."],
  ["PROGRAM 04", "AI 광고·브랜드 마케팅", "브랜드 정체성과 타깃을 분석하고, 마케팅 전략을 바탕으로 광고 메시지와 홍보 콘텐츠를 기획·제작하는 실습 중심 교육입니다."],
];

const brandWorkTitles = ["펀빌 · 퍼스널 브랜딩", "그로우로그 · 퍼스널 브랜딩", "오라트 · 퍼스널 브랜딩", "하리어스 · 퍼스널 브랜딩", "아임 프로 · 퍼스널 브랜딩", "그로우로그 · 퍼스널 브랜딩", "태권도 브랜드 아이덴티티", "디자인 프리즘 브랜드 아이덴티티", "루니브 · 퍼스널 브랜딩", "오픈지 · 퍼스널 브랜딩", "로그 포뮬러 · 퍼스널 브랜딩", "퍼럭스 · 퍼스널 브랜딩"];
const visualWorkTitles = ["숏츠 스토리보드 01", "숏츠 스토리보드 02", "숏츠 씬 03", "숏츠 씬 04", "글로벌 필름 스카우트 보드게임 리디자인 01", "블루마블 보드게임 콘셉트 리디자인 02", "블루마블 보드게임 콘셉트 리디자인 03", "시네마 모굴 보드게임 리디자인 04"];

const studentWorks = [
  ...brandWorkTitles.map((title, index) => ({ src: `/student-works/brand-${String(index + 1).padStart(2, "0")}${[0, 4, 5, 6].includes(index) ? ".jpg" : ".png"}`, category: "IDENTITY DESIGN", title })),
  ...visualWorkTitles.map((title, index) => ({ src: `/student-works/visual-${String(index + 1).padStart(2, "0")}${index === 1 ? ".png" : ".jpg"}`, category: "AI VISUAL", title })),
];

const videoWorks = [
  {
    videoId: "_dT7t16rNvI",
    title: "AI 공익광고",
  },
  {
    videoId: "dFDLk6KUbqk",
    title: "남극 고대 괴물 미스터리",
  },
  {
    videoId: "NnirBh71wAc",
    title: "vStory 숏폼 영상",
  },
  {
    videoId: "9JSiSvuYJ4w",
    title: "K-뷰티 광고 · 공모전 출품작",
    landscape: true,
  },
  {
    videoId: "GKqY2yASrCo",
    title: "CU 편의점 광고 · 공모전 출품작",
    landscape: true,
  },
];

const reviews = [
  ["ChatGPT와 Vrew를 처음 배웠는데 이렇게 쉬울 줄 몰랐어요. 4주 후엔 완성도 높은 영상을 혼자 만들 수 있게 됐습니다.", "이○○님", "프리랜서 · 기초 과정 수강", "☺"],
  ["기술만 배우는 게 아니라 실제 업무에 바로 쓸 수 있는 워크플로우를 배울 수 있어서 좋았습니다. 추천합니다!", "박○○님", "스타트업 · 실무 과정 수강", "◆"],
  ["AI가 유행이긴 한데 실제로 어떻게 업무에 적용하는지 막막했어요. 오영주 강사님의 교육으로 완전히 이해하게 됐습니다.", "최○○님", "기업 · 고급 과정 수강", "✦"],
  ["막연했던 콘텐츠 아이디어를 이미지와 영상으로 직접 완성해 보니 자신감이 생겼습니다. 수업이 끝난 뒤에도 바로 활용할 수 있었어요.", "정○○님", "학교 · 콘텐츠 제작 과정 수강", "●"],
  ["반복해서 작성하던 문서와 자료 정리 과정을 AI로 간소화할 수 있었습니다. 실제 업무 시간이 확실히 줄었어요.", "김○○님", "기관 · 업무 효율화 과정 수강", "▲"],
  ["브랜드 방향부터 광고 이미지와 숏폼 영상까지 한 흐름으로 배울 수 있어서 좋았습니다. 결과물이 남는 실습이라 더욱 만족했습니다.", "윤○○님", "소상공인 · 브랜드 마케팅 과정 수강", "♥"],
];

export default function Home() {
  const [sent, setSent] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const [inquiryOpen, setInquiryOpen] = useState(false);
  const [heartBurst, setHeartBurst] = useState(0);
  const worksCarouselRef = useRef<HTMLDivElement>(null);
  const videoCarouselRef = useRef<HTMLDivElement>(null);
  const reviewsCarouselRef = useRef<HTMLDivElement>(null);
  const reviewIndexRef = useRef(0);
  const heartOrbitRef = useRef<HTMLDivElement>(null);

  const scrollReviews = (direction: 1 | -1) => {
    const carousel = reviewsCarouselRef.current;
    const card = carousel?.querySelector<HTMLElement>(".reviewCard");
    if (!carousel || !card) return;
    const styles = window.getComputedStyle(carousel);
    const gap = Number.parseFloat(styles.columnGap || styles.gap) || 16;
    const step = card.offsetWidth + gap;

    if (direction === 1) {
      const nextIndex = reviewIndexRef.current + 1;
      carousel.scrollTo({ left: nextIndex * step, behavior: "smooth" });
      if (nextIndex >= reviews.length) {
        reviewIndexRef.current = 0;
        window.setTimeout(() => carousel.scrollTo({ left: 0, behavior: "auto" }), 650);
      } else {
        reviewIndexRef.current = nextIndex;
      }
      return;
    }

    if (reviewIndexRef.current === 0) {
      carousel.scrollTo({ left: reviews.length * step, behavior: "auto" });
      reviewIndexRef.current = reviews.length;
    }
    reviewIndexRef.current -= 1;
    window.requestAnimationFrame(() => carousel.scrollTo({ left: reviewIndexRef.current * step, behavior: "smooth" }));
  };

  useEffect(() => {
    const timer = window.setTimeout(() => setHeartBurst((value) => value + 1), 300);
    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    const items = document.querySelectorAll<HTMLElement>(".aboutHeader, .aboutText, .sectionHeader:not(.staticHeader), .programs .sectionHeader, .skillCard, .experienceGroup, .credentialBlock, .bookGrid article, .programCard, .workGrid article, .reviewCard, .finalCtaInner");
    items.forEach((item, index) => {
      item.classList.add("revealItem");
      item.style.setProperty("--reveal-delay", `${(index % 4) * 80}ms`);
    });
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("isVisible");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -40px" });
    items.forEach((item) => observer.observe(item));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const carousel = reviewsCarouselRef.current;
    if (!carousel || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const timer = window.setInterval(() => scrollReviews(1), 3000);

    return () => {
      window.clearInterval(timer);
    };
  }, []);

  useEffect(() => {
    const orbit = heartOrbitRef.current;
    if (!orbit || heartBurst === 0) return;

    const { width, height } = orbit.getBoundingClientRect();
    const isMobileOrbit = window.matchMedia("(max-width: 560px)").matches;
    const fadeStart = isMobileOrbit ? .8 : .94;
    const particles = Array.from(orbit.querySelectorAll<HTMLElement>("i"));
    const rawPointOnCurve = (progress: number) => {
      const angle = progress * Math.PI * 2;
      const heartX = 16 * Math.sin(angle) ** 3;
      const heartY = 13 * Math.cos(angle) - 5 * Math.cos(2 * angle) - 2 * Math.cos(3 * angle) - Math.cos(4 * angle);
      const horizontalScale = heartX >= 0 ? .38 : .3;
      return {
        x: .43 + (heartX / 16) * horizontalScale,
        y: .22 - (heartY - 5) / 34,
      };
    };
    const pathSamples = Array.from({ length: 241 }, (_, index) => rawPointOnCurve(index / 240));
    const pathLengths = pathSamples.reduce<number[]>((lengths, point, index) => {
      if (index === 0) return [0];
      const previous = pathSamples[index - 1];
      lengths.push(lengths[index - 1] + Math.hypot((point.x - previous.x) * width, (point.y - previous.y) * height));
      return lengths;
    }, []);
    const totalPathLength = pathLengths[pathLengths.length - 1];
    const pointOnCurve = (progress: number) => {
      const targetLength = progress * totalPathLength;
      let sampleIndex = pathLengths.findIndex((length) => length >= targetLength);
      if (sampleIndex === -1) sampleIndex = pathSamples.length - 1;
      else if (sampleIndex < 1) sampleIndex = 1;
      const previousLength = pathLengths[sampleIndex - 1];
      const nextLength = pathLengths[sampleIndex];
      const ratio = nextLength === previousLength ? 0 : (targetLength - previousLength) / (nextLength - previousLength);
      const previous = pathSamples[sampleIndex - 1];
      const next = pathSamples[sampleIndex];
      return {
        x: (previous.x + (next.x - previous.x) * ratio) * width,
        y: (previous.y + (next.y - previous.y) * ratio) * height,
      };
    };
    const animations = particles.map((particle, particleIndex) => {
      const frames = Array.from({ length: 61 }, (_, frameIndex) => {
        const progress = frameIndex / 60;
        const pathProgress = Math.min(progress / .94, 1);
        const { x, y } = pointOnCurve(pathProgress);
        const fadeProgress = (1 - progress) / (1 - fadeStart);
        const opacity = progress < .05 ? progress / .05 : progress > fadeStart ? Math.max(0, fadeProgress) * .92 : .92;
        const scale = progress > fadeStart ? Math.max(.16, fadeProgress * .9) : .9;
        return {
          transform: `translate(${x}px, ${y}px) rotate(${progress * 180}deg) scale(${scale})`,
          opacity,
          filter: `blur(${progress > fadeStart ? (progress - fadeStart) * 18 : 0}px)`,
        };
      });
      return particle.animate(frames, {
        duration: 2600,
        delay: particleIndex * 85,
        easing: "linear",
        fill: "forwards",
      });
    });

    return () => animations.forEach((animation) => animation.cancel());
  }, [heartBurst]);

  async function submitInquiry(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    setSubmitting(true);
    setSent(false);
    setSubmitError("");

    try {
      const response = await fetch("/api/inquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(Object.fromEntries(data.entries())),
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || "문의 접수에 실패했습니다.");
      form.reset();
      setSent(true);
    } catch (error) {
      setSubmitError(error instanceof Error ? error.message : "문의 접수에 실패했습니다.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <main>
      <nav className="nav">
        <a className="brand topBrand" href="#top" aria-label="처음으로">AI WORKFLOW ARCHITECT</a>
        <button className="menuToggle" type="button" aria-label="메뉴 열기" aria-expanded={menuOpen} onClick={() => setMenuOpen(!menuOpen)}>
          <span /><span /><span />
        </button>
        <div className={`navLinks ${menuOpen ? "open" : ""}`}>
          <a href="#about" onClick={() => setMenuOpen(false)}>소개</a><a href="#skills" onClick={() => setMenuOpen(false)}>강의</a>
          <a href="#programs" onClick={() => setMenuOpen(false)}>커리큘럼</a><a href="#works" onClick={() => setMenuOpen(false)}>포트폴리오</a>
          <button className="navCta navInquiry" type="button" onClick={() => { setMenuOpen(false); setInquiryOpen(true); }}>문의하기</button>
        </div>
      </nav>

      <section className="hero" id="top" onClick={() => setHeartBurst((value) => value + 1)}>
        <div className="heroArt" aria-hidden="true" />
        <div className="heroHeartAction" aria-hidden="true">
          {heartBurst > 0 && <div className="heartOrbit" ref={heartOrbitRef} key={heartBurst}>{Array.from({ length: 19 }, (_, index) => <i key={index}>{index % 2 === 0 ? "♥" : "★"}</i>)}</div>}
        </div>
        <div className="heroCopy" id="about">
          <p className="eyebrow">AI 콘텐츠 교육 &amp; 워크플로우 아키텍트</p>
          <h1>
            <span className="coral">생각을 콘텐츠로,</span>
            <span className="heroMiddle">콘텐츠를 성과로 만드는</span>
            <span className="lavender">생성형 AI 교육 전문가</span>
          </h1>
          <div className="heroText heroLeadText"><p>생성형 AI 콘텐츠 제작부터 퍼스널 브랜딩, 숏폼 영상, 업무 효율화, 바이브코딩까지 폭넓은 실무 교육을 진행합니다.</p></div>
        </div>
        <div className="heroProfileBar" onClick={(event) => event.stopPropagation()}>
          <p className="heroRole">AI 콘텐츠 전문 강사 <span className="heroSeparator">·</span> <span className="heroPersonName heroPersonNameDesktop">오&nbsp;&nbsp;&nbsp;영&nbsp;&nbsp;&nbsp;주</span><span className="heroPersonName heroPersonNameMobile">오 영 주</span></p>
          <a className="heroKeywords" href="#skills" onClick={(event) => event.stopPropagation()}>콘텐츠 기획 <span>/</span> 업무 자동화 <span>/</span> AI 영상 <span>/</span> 퍼스널 브랜딩</a>
        </div>
      </section>

      <section className="section skillsSection" id="skills">
        <header className="sectionHeader compact skillsHeader">
          <p>Section 01 Competencies</p>
          <h2>핵심 역량 및 <em>교육 분야</em></h2>
        </header>
        <div className="skillGrid">
          {skills.map((skill) => (
            <article className="skillCard" key={skill}><span aria-hidden="true" /><h3>{skill}</h3></article>
          ))}
        </div>
      </section>

      <section className="section experienceSection" id="experience">
        <header className="sectionHeader compact">
          <p>Section 02 · Experience</p>
          <h2>주요 <em>경력</em></h2>
        </header>
        <div className="experienceWrap">
          <p className="sectionIntro experienceIntro">교육, 디자인, 생성형 AI를 연결해 현장 중심의 배움을 설계합니다.</p>
          <div className="experienceColumns">
            <article className="experienceGroup"><h3><span>01</span> 주요 활동 및 직책</h3><ol className="experienceList">{keyRoles.map((item, index) => <li key={item}><span>{String(index + 1).padStart(2, "0")}</span><strong>{item}</strong></li>)}</ol></article>
            <article className="experienceGroup"><h3><span>02</span> 실무 및 강의 경력</h3><ol className="experienceList">{practicalTeachingExperiences.map((item, index) => <li key={`${index}-${item}`}><span>{String(index + 1).padStart(2, "0")}</span><strong>{item.split("\n").map((line, lineIndex) => <span className="experienceLine" key={`${lineIndex}-${line}`}>{line}</span>)}</strong></li>)}</ol></article>
          </div>
        </div>
      </section>

      <section className="section credentialsSection" id="credentials">
        <header className="sectionHeader compact">
          <p>Section 03 · Credentials</p>
          <h2>수상 및 <em>자격증</em></h2>
          <p className="sectionIntro">교육 전문성과 콘텐츠 제작 역량을 증명하는 주요 활동과 기록입니다.</p>
        </header>
        <div className="credentials">
          <div className="credentialBlock">
          <p>AWARDS &amp; ACTIVITIES</p>
          <ul><li>인공지능 콘텐츠 강사 경진대회 &apos;대상&apos;</li><li>대한민국 AI 영상제 &apos;최우수상&apos;</li><li>제3회 SIAFF AI 영화제 심사위원</li><li>고양영상미디어 지역 커뮤니티 [APS] 대표</li></ul>
          </div>
          <div className="credentialBlock lavenderBlock">
          <p>CERTIFICATIONS</p>
          <ul><li>생성형 AI 교육지도사<br />AI 리터러시 강사</li><li>KPC 그래픽기술자격 그래픽마스터</li><li>컴퓨터그래픽스운용기능사</li></ul>
          </div>
        </div>
      </section>

      <section className="section programs" id="programs">
        <header className="sectionHeader compact staticHeader"><p>Section 04 · Programs</p><h2><span>핵심 프로그램</span> <em>구성</em></h2><p className="sectionIntro">학습자의 목표와 현장에 맞춰 네 가지 프로그램을 유연하게 구성합니다.</p></header>
        <div className="programGrid">
          {programs.map(([label, title, desc], index) => <article className={`programCard card${index + 1}`} key={label}><span>{label}</span><div className="programIcon">{["✦", "◌", "↗", "◎"][index]}</div><h3>{title}</h3><p>{desc}</p></article>)}
        </div>
      </section>

      <section className="section booksSection" id="books">
        <header className="sectionHeader compact"><p>Section 05 · Books</p><h2>출간 <em>저서</em></h2><p className="sectionIntro">생성형 AI 활용 경험과 실무 노하우를 책으로 전합니다.</p></header>
        <div className="bookGrid">
          <article><div className="bookCover"><img src="/books/ai-automation.jpg" alt="한 권으로 끝내는 AI 자동화 책 표지" /></div><div className="bookInfo"><span>BOOK 01</span><h3>『한 권으로 끝내는 AI 자동화』</h3><p>공저 · 주간 베스트셀러 선정</p></div></article>
          <article><div className="bookCover"><img src="/books/ai-advertising.png" alt="AI 광고 제작의 모든 것 전자책 표지" /></div><div className="bookInfo"><span>BOOK 02</span><h3>『AI 광고 제작의 모든 것』</h3><p>전자책 공저</p></div></article>
        </div>
      </section>

      <section className="section works" id="works">
        <header className="sectionHeader compact"><p>Section 06 · Participant Works</p><h2>참여자 <em>작품</em></h2><p className="sectionIntro">배운 것을 실제 결과물로 완성하는 프로젝트형 교육을 지향합니다.</p></header>
        <h3 className="worksSubheading">. AI 비주얼 · 아이덴티티 디자인</h3>
        <div className="worksCarouselWrap">
          <button className="worksArrow worksArrowPrev" type="button" aria-label="이전 작품 보기" onClick={() => worksCarouselRef.current?.scrollBy({ left: -390, behavior: "smooth" })}>〈</button>
          <div className="worksCarousel" ref={worksCarouselRef} aria-label="참여자 작품 자동 갤러리">
            <div className="worksTrack">
              {[...studentWorks, ...studentWorks].map((work, index) => <article className="workCard" key={`${work.src}-${index}`} aria-hidden={index >= studentWorks.length}>
                <div className="workImage"><img src={work.src} alt={index < studentWorks.length ? work.title : ""} loading="lazy" /></div>
                <p>{work.category}</p><h3>{work.title}</h3>
              </article>)}
            </div>
          </div>
          <button className="worksArrow worksArrowNext" type="button" aria-label="다음 작품 보기" onClick={() => worksCarouselRef.current?.scrollBy({ left: 390, behavior: "smooth" })}>〉</button>
        </div>
        <div className="videoWorks">
          <h3>. AI 커머셜 · 숏폼 영상</h3>
          <div className="videoCarouselWrap">
            <button className="worksArrow videoArrow worksArrowPrev" type="button" aria-label="이전 영상 보기" onClick={() => videoCarouselRef.current?.scrollBy({ left: -420, behavior: "smooth" })}>〈</button>
            <div className="videoWorksTrack" ref={videoCarouselRef}>
              {videoWorks.map((work, index) => <article className={`videoWorkCard ${work.landscape ? "isLandscape" : ""}`} key={work.videoId}>
                <iframe src={`https://www.youtube-nocookie.com/embed/${work.videoId}`} title={work.title} loading="lazy" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen />
                <p>AI VIDEO {String(index + 1).padStart(2, "0")}</p><h4>{work.title}</h4>
              </article>)}
            </div>
            <button className="worksArrow videoArrow worksArrowNext" type="button" aria-label="다음 영상 보기" onClick={() => videoCarouselRef.current?.scrollBy({ left: 420, behavior: "smooth" })}>〉</button>
          </div>
        </div>
      </section>

      <section className="section reviewsSection" id="reviews">
        <header className="sectionHeader compact"><p>Section 07 · Reviews</p><h2>수강 <em>후기</em></h2><p className="sectionIntro">교육 현장에서 직접 경험한 수강생들의 이야기를 전합니다.</p></header>
        <div className="reviewsCarouselWrap">
          <button className="reviewArrow reviewArrowPrev" type="button" aria-label="이전 수강 후기 보기" onClick={() => scrollReviews(-1)}>〈</button>
          <div className="reviewList" ref={reviewsCarouselRef} tabIndex={0} aria-label="수강 후기 목록, 좌우로 스크롤할 수 있습니다">
            {[...reviews, ...reviews].map(([quote, name, course, icon], index) => <article className="reviewCard" key={`${name}-${index}`} aria-hidden={index >= reviews.length}>
              <blockquote>“{quote}”</blockquote>
              <div className="reviewAuthor"><span aria-hidden="true">{icon}</span><p><span className="reviewNameRow"><strong>{name}</strong><span className="reviewStars" aria-label="별점 5점">★★★★★</span></span><small>{course}</small></p></div>
            </article>)}
          </div>
          <button className="reviewArrow reviewArrowNext" type="button" aria-label="다음 수강 후기 보기" onClick={() => scrollReviews(1)}>〉</button>
        </div>
      </section>

      <section className="finalCta" id="contact">
        <span className="ctaOrb ctaOrbLeft" aria-hidden="true" />
        <span className="ctaOrb ctaOrbRight" aria-hidden="true" />
        <div className="finalCtaInner">
          <h2>기술의 나열이 아닌 <em>실무 워크플로우</em>를 지금 시작하세요.</h2>
          <p>학교 · 기업 · 개인 모두 맞춤 커리큘럼으로 진행합니다</p>
          <div className="finalCtaActions">
            <button type="button" onClick={() => setInquiryOpen(true)}>강의 문의</button>
            <a href="#programs">커리큘럼 보기 <span>→</span></a>
          </div>
        </div>
      </section>

      {inquiryOpen && <div className="modalBackdrop" role="presentation" onMouseDown={() => setInquiryOpen(false)}>
        <section className="contact contactModal" role="dialog" aria-modal="true" aria-labelledby="inquiry-title" onMouseDown={(event) => event.stopPropagation()}>
          <button className="modalClose" type="button" aria-label="문의 창 닫기" onClick={() => setInquiryOpen(false)}>×</button>
          <div className="contactLead">
          <p>— Contact</p>
          <h2 id="inquiry-title">강의 문의</h2>
          <p>교육 목표에 맞게 커리큘럼을 구성해 드립니다. 24시간 내 연락드리겠습니다.</p>
          <div className="contactBenefits">
            <article><span>↯</span><div><strong>빠른 답변</strong><small>24시간 내 답변</small></div></article>
            <article><span>⌘</span><div><strong>맞춤 설계</strong><small>목표에 맞게 구성</small></div></article>
            <article><span>▥</span><div><strong>전국 출장</strong><small>학교·기업 방문 가능</small></div></article>
          </div>
        </div>
        <form onSubmit={submitInquiry} className="contactForm">
          <div className="formRow">
            <label>이름 *<input name="name" required placeholder="홍길동" /></label>
            <label>연락처 *<input name="phone" required placeholder="010-0000-0000" /></label>
          </div>
          <label>소속<input name="organization" placeholder="기업 · 기관 · 학교 · 개인" /></label>
          <label>관심 프로그램 *
            <select name="program" required defaultValue="">
              <option value="" disabled>선택해 주세요</option>
              <option>생성형 AI 기초</option><option>콘텐츠 제작</option><option>업무 자동화</option><option>맞춤 교육</option>
            </select>
          </label>
          <label>문의 내용<textarea name="message" required rows={5} placeholder="교육 목적, 인원, 희망 일정 등을 자유롭게 적어주세요" /></label>
          <button type="submit" disabled={submitting}>{submitting ? "전송 중..." : "문의 보내기"} {!submitting && <span>→</span>}</button>
          {sent && <p className="formMessage" role="status">문의가 접수되었습니다. 확인 후 연락드리겠습니다.</p>}
          {submitError && <p className="formMessage formError" role="alert">{submitError}</p>}
          </form>
        </section>
      </div>}

      <footer><a className="brand" href="#top">OH YOUNGJOO · AI</a><p>AI Content Educator · Content Director</p><small>© 2026 오영주. All rights reserved.</small></footer>
    </main>
  );
}
