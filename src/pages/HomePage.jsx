import { useCallback, useEffect, useLayoutEffect, useState } from "react";
import { AuthModals, SiteFooter, SiteHeader } from "../components/SiteChrome.jsx";

const fallbackFeatures = [
  {
    title: "Interactive quizzes for every course",
    description: "Practice smarter with exam-focused quizzes for CCC, O Level, A Level and more. Build speed, accuracy and confidence before the real exam.",
    imageUrl: "/images/ad1.webp",
  },
  {
    title: "Complete study notes",
    description: "Find well-structured, easy-to-understand notes prepared around updated course syllabuses and focused on the topics you need to learn.",
    imageUrl: "/images/ad2.png",
  },
  {
    title: "Course and exam updates",
    description: "Keep up with exam dates, results, syllabus changes and important announcements related to your course.",
    imageUrl: "/images/ad3.jpg",
  },
];

async function readList(response) {
  const data = await response.json();
  return Array.isArray(data) ? data : data?.data || [];
}

function HomePage() {
  const [marquee, setMarquee] = useState(null);
  const [slides, setSlides] = useState([]);
  const [features, setFeatures] = useState(fallbackFeatures);
  const [quizzes, setQuizzes] = useState([]);

  const loadQuickQuizzes = useCallback(async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`${window.CONFIG.BASE_URL}/api/quizzes/active`, {
        headers: { Authorization: `Bearer ${token || ""}` },
      });
      if (!response.ok) throw new Error("Failed to load quizzes");
      const data = await readList(response);
      const now = Date.now();
      setQuizzes(data.filter((quiz) => {
        if (!quiz.active) return false;
        if (String(quiz.type).toLowerCase() === "practice") return true;
        return new Date(quiz.endTime).getTime() > now;
      }).slice(0, 6));
    } catch (error) {
      console.error("Quick quiz load error:", error);
    }
  }, []);

  useLayoutEffect(() => {
    window.loadQuickQuizzes = loadQuickQuizzes;
    return () => {
      if (window.loadQuickQuizzes === loadQuickQuizzes) delete window.loadQuickQuizzes;
    };
  }, [loadQuickQuizzes]);

  useEffect(() => {
    const base = window.CONFIG.BASE_URL;
    const loadHomeContent = async () => {
      const [marqueeResult, slidesResult, featuresResult] = await Promise.allSettled([
        fetch(`${base}/api/public/marquee/active`).then((response) => response.ok ? response.json() : null),
        fetch(`${base}/api/public/sliders/active`).then((response) => response.ok ? readList(response) : []),
        fetch(`${base}/api/public/features/active`).then((response) => response.ok ? readList(response) : []),
      ]);

      if (marqueeResult.status === "fulfilled") setMarquee(marqueeResult.value);
      if (slidesResult.status === "fulfilled") setSlides(slidesResult.value.filter((slide) => slide.active));
      if (featuresResult.status === "fulfilled" && featuresResult.value.length) {
        setFeatures([...featuresResult.value].sort((a, b) => (a.displayOrder ?? 0) - (b.displayOrder ?? 0)));
      }
    };

    loadHomeContent();
    loadQuickQuizzes();
  }, [loadQuickQuizzes]);

  const startQuiz = async (quizId) => {
    if (!localStorage.getItem("token")) {
      window.onLoginSuccess = () => startQuiz(quizId);
      window.openLogin?.();
      return;
    }

    try {
      const response = await fetch(`${window.CONFIG.BASE_URL}/api/quizzes/${quizId}/start`, {
        method: "POST",
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}`, "Content-Type": "application/json" },
      });
      const result = await response.json();
      if (!response.ok || result.success === false) {
        window.alert(result.message || "Unable to start quiz");
        return;
      }
      const quizData = result.data || result;
      sessionStorage.setItem("quizData", JSON.stringify(quizData));
      sessionStorage.setItem("attemptId", quizData.attemptId);
      window.location.href = "quiz.html";
    } catch (error) {
      console.error("Quick quiz start error:", error);
      window.alert("Error starting quiz");
    }
  };

  const updateItems = marquee?.active && marquee.text
    ? String(marquee.text).split("||").map((item) => {
      const [text, url] = item.split("|");
      return { text: text?.trim(), url: url?.trim() };
    }).filter((item) => item.text)
    : [{ text: "Welcome to our educational portal" }];

  return (
    <div className="container-fluid p-0">
      <SiteHeader />
      <div className="update-bar">
        <div className="lu">Latest Update</div>
        <div className="mar">
          <div className="marquee-wrapper">
            <div id="marqueeText" className="marquee-content">
              {updateItems.map((item, index) => (
                <span key={`${item.text}-${index}`} className="me-4">
                  {item.text}{item.url && <> &nbsp;<a href={item.url} target="_blank" rel="noreferrer">Open Link</a></>}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="slider">
        <div id="carouselExampleAutoplaying" className="carousel slide mt-2" data-bs-ride="carousel">
          <div className="carousel-inner" id="sliderContainer">
            {(slides.length ? slides : [{ imageUrl: "/images/o-level-banner.jpg", id: "fallback" }]).map((slide, index) => (
              <div className={`carousel-item${index === 0 ? " active" : ""}`} key={slide.id || slide.imageUrl || index}>
                <img src={slide.imageUrl} className="d-block w-100 slider-img" alt={slide.title || "GetInTouch24 learning resources"} />
              </div>
            ))}
          </div>
          <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleAutoplaying" data-bs-slide="prev" aria-label="Previous slide">
            <span className="carousel-control-prev-icon" /><span className="visually-hidden">Previous</span>
          </button>
          <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleAutoplaying" data-bs-slide="next" aria-label="Next slide">
            <span className="carousel-control-next-icon" /><span className="visually-hidden">Next</span>
          </button>
        </div>
      </div>

      <hr className="sep" />

      <section className="why-us">
        <h2 className="why-heading">Why choose our platform for learning?</h2>
        <div className="facility-section">
          <div className="row facility p-4" id="featuresContainer">
            {features.map((feature, index) => (
              <div className="col-12 col-lg-4" key={feature.id || feature.title || index}>
                <article className="card custom-card shadow">
                  <img src={feature.imageUrl || "/images/ad1.webp"} className="card-img-top custom-img" alt={feature.title || "Learning feature"} loading="lazy" />
                  <div className="card-body">
                    <h5>{feature.title}</h5>
                    <p className="card-text">{feature.description}</p>
                  </div>
                </article>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="quick-quizzes py-5">
        <div className="container">
          <h2 className="text-center fw-bold mb-4">Practice a quiz</h2>
          <div className="row g-4" id="quickQuizContainer">
            {quizzes.map((quiz) => (
              <div className="col-lg-4 col-md-6 col-12" key={quiz.id}>
                <article className="quiz-card h-100">
                  <span className="course-badge">{quiz.course?.name || "Course"}</span>
                  <h3>{quiz.title}</h3>
                  <p><strong>Questions:</strong> {quiz.totalQuestions}</p>
                  <p><strong>Total Marks:</strong> {quiz.totalMarks}</p>
                  <p><strong>Duration:</strong> {quiz.timeLimit} min</p>
                  <button className="start-btn" onClick={() => startQuiz(quiz.id)}>Start Practice</button>
                </article>
              </div>
            ))}
          </div>
        </div>
      </section>

      <SiteFooter />
      <AuthModals />
    </div>
  );
}

export default HomePage;
