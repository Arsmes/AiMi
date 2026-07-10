const menuToggle = document.getElementById("menu-toggle");
const mobileNav = document.getElementById("mobile-nav");

if (menuToggle && mobileNav) {
  menuToggle.addEventListener("click", () => {
    menuToggle.classList.toggle("active");
    mobileNav.classList.toggle("active");
  });

  const navLinks = document.querySelectorAll("#mobile-nav a");
  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      menuToggle.classList.remove("active");
      mobileNav.classList.remove("active");
    });
  });
}

const tgForm = document.getElementById("tg-form");

if (tgForm) {
  tgForm.addEventListener("submit", function (e) {
    e.preventDefault();

    // const TELEGRAM_TOKEN = "8823267849:AAEqNGceTd9HHuABj8SZPBVhxe6DnZ6YTbs";
    // const TELEGRAM_CHAT_ID = "7607940927";
    // const API_URL = `https://api.telegram.org/bot${TELEGRAM_TOKEN}/sendMessage`;

    const userName = document.getElementById("user_name").value.trim();
    const userPhone = document.getElementById("user_phone").value.trim();
    const submitBtn = tgForm.querySelector(".btn-form");

    let message = `<b>🔥 Новая заявка с сайта AiMi!</b>\n\n`;
    message += `<b>👤 Имя клиента:</b> ${userName}\n`;
    message += `<b>💬 WhatsApp:</b> ${userPhone}\n`;

    const originalBtnText = submitBtn.innerText;
    submitBtn.innerText = "ОТПРАВЛЯЕМ...";
    submitBtn.disabled = true;

    fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        chat_id: TELEGRAM_CHAT_ID,
        parse_mode: "html",
        text: message,
      }),
    })
      .then((response) => {
        if (response.ok) {
          const successModal = document.getElementById("success-modal");
          if (successModal) {
            successModal.classList.add("is-open");
          }
          tgForm.reset();
        } else {
          alert(
            "Произошла ошибка при отправке. Пожалуйста, попробуйте еще раз.",
          );
        }
      })
      .catch((error) => {
        console.error("Ошибка:", error);
        alert("Не удалось связаться с сервером. Проверьте интернет.");
      })
      .finally(() => {
        submitBtn.innerText = originalBtnText;
        submitBtn.disabled = false;
      });
  });
}

const closeModalBtn = document.getElementById("close-modal-btn");
const successModal = document.getElementById("success-modal");

if (closeModalBtn && successModal) {
  closeModalBtn.addEventListener("click", () => {
    successModal.classList.remove("is-open");
  });

  successModal.addEventListener("click", (e) => {
    if (e.target === successModal) {
      successModal.classList.remove("is-open");
    }
  });
}
