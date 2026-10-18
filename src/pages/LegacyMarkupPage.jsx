import { useLayoutEffect } from "react";
import { SiteFooter } from "../components/SiteChrome.jsx";
import profileSource from "../content/profile.source.html?raw";
import quizSource from "../content/quiz.source.html?raw";
import resetPasswordSource from "../content/reset-password.source.html?raw";
import paymentSource from "../content/payment.source.html?raw";
import privacySource from "../content/PrivacyPolicy.source.html?raw";
import termsSource from "../content/TermsAndCondition.source.html?raw";

const sourceByPage = {
  profile: profileSource,
  quiz: quizSource,
  reset: resetPasswordSource,
  payment: paymentSource,
  privacy: privacySource,
  terms: termsSource,
};

function readSource(source) {
  const parsed = new DOMParser().parseFromString(source, "text/html");
  const styles = Array.from(parsed.head.querySelectorAll("style"), (style) => style.textContent || "");
  parsed.body.querySelectorAll("script").forEach((script) => script.remove());
  parsed.body.querySelector("#footer")?.remove();

  return {
    bodyClass: parsed.body.className || (page === "privacy" || page === "terms" ? "page-legal" : ""),
    styles,
    markup: parsed.body.innerHTML,
  };
}

function LegacyMarkupPage({ page }) {
  const pageContent = readSource(sourceByPage[page]);

  useLayoutEffect(() => {
    document.body.className = pageContent.bodyClass;
  }, [pageContent.bodyClass]);

  return (
    <>
      {pageContent.styles.map((style, index) => (
        <style key={index} dangerouslySetInnerHTML={{ __html: style }} />
      ))}
      <div dangerouslySetInnerHTML={{ __html: pageContent.markup }} />
      {page === "profile" && <SiteFooter />}
    </>
  );
}

export default LegacyMarkupPage;
