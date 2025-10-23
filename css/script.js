// Função para validar o formulário de cadastro (só executa na página de cadastro)
if (document.querySelector("form")) {
  const form = document.queryQuerySelector("form");
  form.addEventListener("submit", function(event) {
    event.preventDefault();
    // Código de validação do formulário (que já te passei)
  });
}

// Função para interatividade na página inicial (index.html)
if (document.querySelector(".hero")) {
  const heroSection = document.querySelector(".hero");
  heroSection.addEventListener("click", function() {
    alert("Bem-vindo à ONG Segunda Chance! Clique em 'Conheça nossos projetos' para saber mais.");
  });
}

// Função para interatividade na página de projetos (projetos.html)
if (document.querySelector("main h1") && window.location.pathname.includes("projetos.html")) {
  const projetosTitle = document.querySelector("main h1");
  projetosTitle.addEventListener("mouseover", function() {
    this.style.color = "#ff6600"; // Muda a cor do título ao passar o mouse
  });
  projetosTitle.addEventListener("mouseout", function() {
    this.style.color = "#2c3e50"; // Volta a cor original
  });
}
