"use client";

import { FormEvent, useState } from "react";

const skills = [
  ["01", "생성형 AI 콘텐츠", "생성형 AI 기반 콘텐츠 제작 교육 전문"],
  ["02", "퍼스널 브랜딩", "네임 & 로고 기획 제작"],
  ["03", "AI 영상 제작", "숏폼 콘텐츠 및 AI 영상 제작"],
  ["04", "프롬프트", "프롬프트 엔지니어링"],
  ["05", "업무 자동화", "업무 생산성 자동화"],
  ["06", "바이브코딩", "웹페이지, 랜딩페이지 등"],
];

const experiences = [
  "함온 AI 협동 조합 이사",
  "한국 AI 리터러시 강사 협회 이사",
  "디지털융합교육원 지도교수",
  "MBC아카데미컴퓨터학원",
  "(재)서울현대교육재단",
  "희망리턴패키지 재기사업화 채움멘토",
  "(주)지아이에듀테크",
  "(주)카버코리아 디자인팀",
  "(주)삼덕공사 디자인팀(의전행사)",
  "NCS 확인강사",
  "그린컴퓨터아트학원(3d max)",
  "기관·학교·기업 대상 생성형 AI 활용 특강 다수 진행",
];

const programs = [
  ["PROGRAM 01", "생성형 AI 기초", "프롬프트 엔지니어링 및 리터러시 입문"],
  ["PROGRAM 02", "콘텐츠 제작", "AI 기반 영상 제작 및 퍼스널 브랜딩"],
  ["PROGRAM 03", "업무 자동화", "생성형 AI 활용 업무 생산성 극대화"],
];

export default function Home() {
  const [sent, setSent] = useState(false);

  function submitInquiry(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSent(true);
  }

  return (
    <main>
      <nav className="nav">
        <a className="brand" href="#top" aria-label="처음으로">OH YOUNGJOO · AI</a>
        <div className="navLinks">
          <a href="#top">소개</a><a href="#skills">강의</a>
          <a href="#programs">커리큘럼</a><a href="#works">포트폴리오</a>
          <a className="navCta" href="#contact">문의하기</a>
        </div>
      </nav>

      <section className="hero" id="top">
        <div className="heroArt" aria-hidden="true" />
        <div className="heroCopy">
          <p className="eyebrow">GENERATIVE AI EDUCATOR · CONTENT DIRECTOR</p>
          <h1>
            <span className="coral">생각을 콘텐츠로,</span>
            <span>콘텐츠를 성과로 만드는</span>
            <span className="lavender">생성형 AI 교육 전문가</span>
          </h1>
          <p className="heroText">생성형 AI 콘텐츠 제작부터 퍼스널 브랜딩, 숏폼 영상, 업무 자동화와 바이브코딩까지. 기술을 나열하는 교육이 아닌, 현장에서 바로 활용하는 경험을 설계합니다.</p>
          <div className="heroActions">
            <a className="primaryBtn" href="#contact">강의 문의하기</a>
            <a className="textBtn" href="#programs">프로그램 보기 <span>→</span></a>
          </div>
        </div>
        <div className="heroBottom">
          <div><small>AI CONTENT EDUCATOR</small><strong>오영주</strong></div>
          <p>생성형 AI를 활용한<br />자립적 콘텐츠 제작 교육</p>
          <div className="miniTags"><span>콘텐츠 기획</span><span>업무 자동화</span><span>AI 영상</span><span>퍼스널 브랜딩</span></div>
        </div>
      </section>

      <section className="section skillsSection" id="skills">
        <header className="sectionHeader">
          <p>— Section 01 · Expertise</p>
          <h2>핵심 역량 및<br /><em>교육 분야</em></h2>
          <p className="sectionIntro">도구를 배우는 데서 멈추지 않고, 각자의 업무와 브랜드에 연결되는 실행 가능한 워크플로우를 만듭니다.</p>
        </header>
        <div className="skillGrid">
          {skills.map(([no, title, desc]) => (
            <article className="skillCard" key={no}><span>{no}</span><h3>{title}</h3><p>{desc}</p><i>↗</i></article>
          ))}
        </div>
      </section>

      <section className="section experienceSection" id="experience">
        <header className="sectionHeader compact">
          <p>— Section 02 · Experience</p>
          <h2>주요 <em>경력</em></h2>
        </header>
        <div className="experienceWrap">
          <p className="bigStatement">교육, 디자인, 생성형 AI를 연결해<br />현장 중심의 배움을 설계합니다.</p>
          <ol className="experienceList">
            {experiences.map((item, index) => <li key={item}><span>{String(index + 1).padStart(2, "0")}</span><strong>{item}</strong></li>)}
          </ol>
        </div>
      </section>

      <section className="section credentialsSection" id="credentials">
        <header className="sectionHeader compact">
          <p>— Section 03 · Credentials</p>
          <h2>수상, 활동 및 <em>자격</em></h2>
          <p className="sectionIntro">교육 전문성과 콘텐츠 제작 역량을 증명하는 주요 활동과 기록입니다.</p>
        </header>
        <div className="credentials">
          <div className="credentialBlock">
          <p>AWARDS & ACTIVITIES</p><h2>수상 및 활동</h2>
          <ul><li>인공지능 콘텐츠 강사 경진대회 &apos;대상&apos;</li><li>대한민국 AI 영상제 &apos;최우수상&apos;</li><li>SIAFF AI 영화제 제3회 심사위원</li><li>고양영상미디어 지역 커뮤니티 [APS] 대표</li></ul>
          </div>
          <div className="credentialBlock lavenderBlock">
          <p>CERTIFICATIONS</p><h2>자격</h2>
          <ul><li>생성형 AI 교육지도사 / AI 리터러시 강사</li><li>KPC 그래픽기술자격 그래픽마스터</li><li>컴퓨터그래픽스운용기능사</li></ul>
          </div>
          <div className="credentialBlock coralBlock">
          <p>BOOKS</p><h2>출간 저서</h2>
          <ul><li>『한 권으로 끝내는 AI 자동화』 공저<br /><small>주간 베스트셀러 선정</small></li><li>『AI 광고 제작의 모든 것』 전자책 공저</li></ul>
          </div>
        </div>
      </section>

      <section className="section programs" id="programs">
        <header className="sectionHeader compact"><p>— Section 04 · Programs</p><h2>핵심 프로그램 <em>구성</em></h2><p className="sectionIntro">학습자의 목표와 현장에 맞춰 세 가지 축을 유연하게 구성합니다.</p></header>
        <div className="programGrid">
          {programs.map(([label, title, desc], index) => <article className={`programCard card${index + 1}`} key={label}><span>{label}</span><div className="programIcon">{index === 0 ? "✦" : index === 1 ? "◌" : "↗"}</div><h3>{title}</h3><p>{desc}</p></article>)}
        </div>
      </section>

      <section className="section works" id="works">
        <header className="sectionHeader compact"><p>— Section 05 · Student Works</p><h2>수강생 <em>작품</em></h2><p className="sectionIntro">배운 것을 실제 결과물로 완성하는 프로젝트형 교육을 지향합니다.</p></header>
        <div className="workGrid">
          <article><div className="workVisual workA"><span>BRAND<br />WITH AI</span></div><p>수강생 A</p><h3>AI 활용 브랜딩 포트폴리오</h3></article>
          <article><div className="workVisual workB"><span>SHORT<br />FORM</span></div><p>수강생 B</p><h3>숏폼 마케팅 영상 시리즈</h3></article>
        </div>
      </section>

      <section className="contact" id="contact">
        <div className="contactLead">
          <p>— Contact</p>
          <h2>강의 문의</h2>
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

      <footer><a className="brand" href="#top">OH YOUNGJOO · AI</a><p>AI Content Educator · Content Director</p><small>© 2026 오영주. All rights reserved.</small></footer>
    </main>
  );
}
