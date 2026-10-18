document.addEventListener("DOMContentLoaded", function () {

    const contactForm = document.getElementById("contactForm");
    const confirmSendBtn = document.getElementById("confirmSendBtn");
    const messageInput = document.getElementById("message");
    const messageCount = document.getElementById("messageCount");
    const contactStatus = document.getElementById("contactStatus");

    const previewModalEl = document.getElementById("feedbackPreviewModal");
    const thankYouModalEl = document.getElementById("thankYouModal");

    const previewModal = new bootstrap.Modal(previewModalEl);
    const thankYouModal = new bootstrap.Modal(thankYouModalEl);

    messageInput.addEventListener("input", function () {
        messageCount.textContent = String(messageInput.value.length);
    });

    // ================= SHOW PREVIEW (instead of sending immediately) =================
    contactForm.addEventListener("submit", function (e) {

        e.preventDefault();
        contactStatus.textContent = "";

        const token = localStorage.getItem("token");

        if (!token) {
            alert("Please login first");
            window.location.href = "index.html";
            return;
        }

        const subject = document.getElementById("subject").value.trim();
        const message = document.getElementById("message").value.trim();

        if (!subject || !message) {
            contactStatus.textContent = "Please enter a subject and a message.";
            return;
        }

        document.getElementById("previewSubject").textContent = subject;
        document.getElementById("previewMessage").textContent = message;

        previewModal.show();
    });

    // ================= CONFIRM & SEND (actual submission) =================
    confirmSendBtn.addEventListener("click", async function () {

        const token = localStorage.getItem("token");

        if (!token) {
            alert("Please login first");
            window.location.href = "index.html";
            return;
        }

        const subject = document.getElementById("subject").value.trim();
        const message = document.getElementById("message").value.trim();

        if (!subject || !message) {
            contactStatus.textContent = "Please enter a subject and a message.";
            previewModal.hide();
            return;
        }

        confirmSendBtn.disabled = true;
        const originalBtnHTML = confirmSendBtn.innerHTML;
        confirmSendBtn.innerHTML = "Sending...";

        try {

            const response = await fetch(
                CONFIG.BASE_URL + "/api/contact",
                {
                    method: "POST",

                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": "Bearer " + token
                    },

                    body: JSON.stringify({
                        subject,
                        message
                    })
                }
            );

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || "Failed to send message");
            }

            previewModal.hide();
            contactForm.reset();
            messageCount.textContent = "0";
            thankYouModal.show();

        } catch (error) {

            console.error(error);
            contactStatus.textContent = error.message || "We couldn't send your message. Please try again.";
            previewModal.hide();

        } finally {

            confirmSendBtn.disabled = false;
            confirmSendBtn.innerHTML = originalBtnHTML;

        }

    });

});
