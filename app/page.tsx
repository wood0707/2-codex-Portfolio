"use client";

import { FormEvent, useEffect, useState } from "react";

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
  "SIAFF 제3회 AI 영화제 심사위원",
  "고양영상미디어 지역 커뮤니티 [APS] 대표",
];

const practicalTeachingExperiences = [
  "MBC아카데미컴퓨터학원",
  "(재)서울현대교육재단",
  "2025, 2026 희망리턴패키지 재기사업화 채움멘토",
  "(주)지아이에듀테크",
  "(주)카버코리아 디자인팀",
  "(주)삼덕공사 디자인팀 · 의전행사",
  "NCS 확인강사",
  "그린컴퓨터아트학원 · 3D MAX",
  "기관·학교·기업 대상 생성형 AI 활용 특강 다수 진행",
];

const programs = [
  ["PROGRAM 01", "AI 기반 업무 효율화", "문서 작성과 반복 업무를 간소화하고, AI 기반의 실무 프로세스를 구축하는 교육입니다."],
  ["PROGRAM 02", "AI 콘텐츠 기획 및 제작", "생각을 이미지와 콘텐츠로 구체화하는 제작 교육입니다."],
  ["PROGRAM 03", "AI 영상·숏폼 제작", "기획부터 이미지, 영상, 음성, 편집까지 완성하는 실습 교육입니다."],
  ["PROGRAM 04", "AI 광고·브랜드 마케팅", "브랜드 홍보에 필요한 광고 콘텐츠와 시각 결과물을 제작합니다."],
];

export default function Home() {
  const [sent, setSent] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [inquiryOpen, setInquiryOpen] = useState(false);
  const [heartBurst, setHeartBurst] = useState(0);

  useEffect(() => {
    const items = document.querySelectorAll<HTMLElement>(".aboutHeader, .aboutText, .aboutRoles li, .sectionHeader, .skillCard, .experienceGroup, .credentialBlock, .bookGrid article, .programCard, .workGrid article, .finalCtaInner");
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

  function submitInquiry(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSent(true);
  }

  return (
    <main>
      <nav className="nav">
        <a className="brand topBrand" href="#top" aria-label="처음으로">OH YOUNG JOO · 생성형 AI 활용 전문 강사</a>
        <button className="menuToggle" type="button" aria-label="메뉴 열기" aria-expanded={menuOpen} onClick={() => setMenuOpen(!menuOpen)}>
          <span /><span /><span />
        </button>
        <div className={`navLinks ${menuOpen ? "open" : ""}`}>
          <a href="#about" onClick={() => setMenuOpen(false)}>소개</a><a href="#skills" onClick={() => setMenuOpen(false)}>강의</a>
          <a href="#programs" onClick={() => setMenuOpen(false)}>커리큘럼</a><a href="#works" onClick={() => setMenuOpen(false)}>포트폴리오</a>
          <button className="navCta navInquiry" type="button" onClick={() => { setMenuOpen(false); setInquiryOpen(true); }}>문의하기</button>
        </div>
      </nav>

      <section className="hero" id="top">
        <div className="heroArt" aria-hidden="true" />
        <button className="heroHeartAction" type="button" aria-label="하트 효과 보기" title="하트를 눌러보세요" onClick={() => setHeartBurst((value) => value + 1)}>
          {heartBurst > 0 && <span className="heartBurst" key={heartBurst} aria-hidden="true">{Array.from({ length: 10 }, (_, index) => <i key={index}>♥</i>)}</span>}
        </button>
        <div className="heroCopy">
          <p className="eyebrow">GENERATIVE AI EDUCATOR · CONTENT DIRECTOR</p>
          <h1>
            <span className="coral">생각을 콘텐츠로,</span>
            <span className="heroMiddle">콘텐츠를 성과로 만드는</span>
            <span className="lavender">생성형 AI 교육 전문가</span>
          </h1>
          <p className="heroText">생성형 AI 콘텐츠 제작부터 퍼스널 브랜딩, 숏폼 영상, 업무 자동화와 바이브코딩까지. 기술을 나열하는 교육이 아닌, 현장에서 바로 활용하는 경험을 설계합니다.</p>
          <p className="heroName"><b>오 영 주</b><span>생성형 AI 활용 전문 강사</span></p>
          <div className="heroActions">
            <button className="primaryBtn" type="button" onClick={() => setInquiryOpen(true)}>강의 문의하기</button>
            <a className="textBtn" href="#programs">프로그램 보기 <span>→</span></a>
          </div>
        </div>
      </section>

      <section className="instructorIntro" id="about">
        <header className="aboutHeader">
          <p>ABOUT THE EDUCATOR</p>
          <h2>강사 소개</h2>
          <span>현장에서 바로 적용 가능한 생성형 AI 활용 교육을 설계합니다.</span>
        </header>
        <div className="aboutLayout">
          <div className="aboutText">
            <p>디자인 실무와 교육 현장에서 쌓은 경험을 바탕으로 생성형 AI를 콘텐츠 기획, 영상 제작, 업무 자동화와 바이브코딩까지 연결합니다.</p>
            <p><strong>학습자가 도구 사용법에 머무르지 않고 자신의 아이디어를 실제 결과물로 완성하도록 돕는 것</strong>을 교육의 중심에 두고, 학교·기업·개인의 목표에 맞는 실용적인 커리큘럼을 설계합니다.</p>
          </div>
          <ul className="aboutRoles">
            <li>함온 AI 협동조합 이사</li>
            <li>한국 AI 리터러시 강사 협회 이사</li>
            <li>디지털융합교육원 지도교수</li>
            <li>생성형 AI 콘텐츠 교육 전문가</li>
            <li>AI 영상·브랜딩·업무 자동화 강사</li>
          </ul>
        </div>
      </section>

      <section className="section skillsSection" id="skills">
        <header className="sectionHeader compact skillsHeader">
          <p>— Section 01 Core Competencies</p>
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
          <p>— Section 02 · Experience</p>
          <h2>주요 <em>경력</em></h2>
        </header>
        <div className="experienceWrap">
          <p className="sectionIntro experienceIntro">교육, 디자인, 생성형 AI를 연결해 현장 중심의 배움을 설계합니다.</p>
          <div className="experienceColumns">
            <article className="experienceGroup"><h3><span>01</span> 주요 활동 및 직책</h3><ol className="experienceList">{keyRoles.map((item, index) => <li key={item}><span>{String(index + 1).padStart(2, "0")}</span><strong>{item}</strong></li>)}</ol></article>
            <article className="experienceGroup"><h3><span>02</span> 실무 및 강의 경력</h3><ol className="experienceList">{practicalTeachingExperiences.map((item, index) => <li key={item}><span>{String(index + 1).padStart(2, "0")}</span><strong>{item}</strong></li>)}</ol></article>
          </div>
        </div>
      </section>

      <section className="section credentialsSection" id="credentials">
        <header className="sectionHeader compact">
          <p>— Section 03 · Credentials</p>
          <h2>수상 및 <em>자격증</em></h2>
          <p className="sectionIntro">교육 전문성과 콘텐츠 제작 역량을 증명하는 주요 활동과 기록입니다.</p>
        </header>
        <div className="credentials">
          <div className="credentialBlock">
          <p>AWARDS &amp; ACTIVITIES</p>
          <ul><li>인공지능 콘텐츠 강사 경진대회 &apos;대상&apos;</li><li>대한민국 AI 영상제 &apos;최우수상&apos;</li><li>SIAFF 제3회 AI 영화제 심사위원</li><li>고양영상미디어 지역 커뮤니티 [APS] 대표</li></ul>
          </div>
          <div className="credentialBlock lavenderBlock">
          <p>CERTIFICATIONS</p>
          <ul><li>생성형 AI 교육지도사<br />AI 리터러시 강사</li><li>KPC 그래픽기술자격 그래픽마스터</li><li>컴퓨터그래픽스운용기능사</li></ul>
          </div>
        </div>
      </section>

      <section className="section booksSection" id="books">
        <header className="sectionHeader compact"><p>— Section 04 · Books</p><h2>출간 <em>저서</em></h2><p className="sectionIntro">생성형 AI 활용 경험과 실무 노하우를 책으로 전합니다.</p></header>
        <div className="bookGrid">
          <article><div className="bookCover"><img src="/books/ai-automation.jpg" alt="한 권으로 끝내는 AI 자동화 책 표지" /></div><div className="bookInfo"><span>BOOK 01</span><h3>『한 권으로 끝내는 AI 자동화』</h3><p>공저 · 주간 베스트셀러 선정</p></div></article>
          <article><div className="bookCover"><img src="/books/ai-advertising.png" alt="AI 광고 제작의 모든 것 전자책 표지" /></div><div className="bookInfo"><span>BOOK 02</span><h3>『AI 광고 제작의 모든 것』</h3><p>전자책 공저</p></div></article>
        </div>
      </section>

      <section className="section programs" id="programs">
        <header className="sectionHeader compact"><p>— Section 05 · Programs</p><h2>핵심 프로그램 <em>구성</em></h2><p className="sectionIntro">학습자의 목표와 현장에 맞춰 네 가지 프로그램을 유연하게 구성합니다.</p></header>
        <div className="programGrid">
          {programs.map(([label, title, desc], index) => <article className={`programCard card${index + 1}`} key={label}><span>{label}</span><div className="programIcon">{["✦", "◌", "↗", "◎"][index]}</div><h3>{title}</h3><p>{desc}</p></article>)}
        </div>
      </section>

      <section className="section works" id="works">
        <header className="sectionHeader compact"><p>— Section 06 · Student Works</p><h2>수강생 <em>작품</em></h2><p className="sectionIntro">배운 것을 실제 결과물로 완성하는 프로젝트형 교육을 지향합니다.</p></header>
        <div className="workGrid">
          <article><div className="workVisual workA"><span>BRAND<br />WITH AI</span></div><p>수강생 A</p><h3>AI 활용 브랜딩 포트폴리오</h3></article>
          <article><div className="workVisual workB"><span>SHORT<br />FORM</span></div><p>수강생 B</p><h3>숏폼 마케팅 영상 시리즈</h3></article>
        </div>
      </section>

      <section className="finalCta" id="contact">
        <span className="ctaOrb ctaOrbLeft" aria-hidden="true" />
        <span className="ctaOrb ctaOrbRight" aria-hidden="true" />
        <div className="finalCtaInner">
          <h2><span>기술의 나열이 아닌</span><span><em>실무 워크플로우</em>를</span><span>지금 시작하세요</span></h2>
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
          <button type="submit">문의 보내기 <span>→</span></button>
          {sent && <p className="formMessage" role="status">문의가 접수되었습니다. 확인 후 연락드리겠습니다.</p>}
          </form>
        </section>
      </div>}

      <footer><a className="brand" href="#top">OH YOUNGJOO · AI</a><p>AI Content Educator · Content Director</p><small>© 2026 오영주. All rights reserved.</small></footer>
    </main>
  );
}
