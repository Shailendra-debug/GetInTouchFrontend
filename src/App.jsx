import HomePage from "./pages/HomePage.jsx";
import BrowsePage from "./pages/BrowsePage.jsx";
import ContactPage from "./pages/ContactPage.jsx";
import LegacyMarkupPage from "./pages/LegacyMarkupPage.jsx";

const pageByPath = {
  "index.html": <HomePage />,
  "notes.html": <BrowsePage kind="notes" />,
  "live-quiz.html": <BrowsePage kind="live" />,
  "practice-quiz.html": <BrowsePage kind="practice" />,
  "contact.html": <ContactPage />,
  "profile.html": <LegacyMarkupPage page="profile" />,
  "quiz.html": <LegacyMarkupPage page="quiz" />,
  "reset-password.html": <LegacyMarkupPage page="reset" />,
  "payment.html": <LegacyMarkupPage page="payment" />,
  "privacypolicy.html": <LegacyMarkupPage page="privacy" />,
  "termsandcondition.html": <LegacyMarkupPage page="terms" />,
};

export default function App() {
  const filename = window.location.pathname.split("/").filter(Boolean).pop()?.toLowerCase() || "index.html";
  return pageByPath[filename] || <HomePage />;
}
