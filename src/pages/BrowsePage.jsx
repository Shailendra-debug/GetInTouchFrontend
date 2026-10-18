import { AuthModals, SiteFooter, SiteHeader } from "../components/SiteChrome.jsx";

const pageCopy = {
  live: {
    title: "Live Quizzes",
    subtitle: "Select your course, paper and chapter — then join the live exam",
    wrapperClass: "card-section",
    containerId: "liveQuizContainer",
    containerClass: "quiz-container",
  },
  practice: {
    title: "Practice Quizzes",
    subtitle: "Select your course, paper and chapter — then start the quiz",
    wrapperClass: "quiz-wrapper",
    containerId: "quizContainer",
    containerClass: "quiz-container",
  },
  notes: {
    title: "Notes Section",
    subtitle: "Select your course and paper — then browse notes",
    wrapperClass: "notes-wrapper",
    containerId: "notesStageContainer",
    containerClass: "grid-container",
  },
};

function BrowsePage({ kind }) {
  const copy = pageCopy[kind];
  const headingClass = kind === "live" ? "hero" : kind === "notes" ? "notes-header" : "practice-header";

  return (
    <div>
      <SiteHeader />
      <section className={headingClass}>
        <h1>{copy.title}</h1>
        <h6>{copy.subtitle}</h6>
      </section>
      <main className={copy.wrapperClass}>
        <div className="browse-topbar">
          <div id="browseBreadcrumb" className="browse-breadcrumb" />
          <h2 id="stageHeading" className="stage-heading" />
        </div>
        <div id={copy.containerId} className={copy.containerClass} />
      </main>
      <SiteFooter />
      <AuthModals />
    </div>
  );
}

export default BrowsePage;
