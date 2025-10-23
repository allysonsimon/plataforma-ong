// ====================================
// VALIDAÇÃO DO FORMULÁRIO DE CADASTRO
// ====================================
if (document.querySelector("#formCadastro")) {
  const form = document.querySelector("#formCadastro");
  
  form.addEventListener("submit", function(event) {
    event.preventDefault();
    
    // Validação de campos
    const nome = document.querySelector("#nome").value.trim();
    const email = document.querySelector("#email").value.trim();
    const telefone = document.querySelector("#telefone").value.trim();
    const cpf = document.querySelector("#cpf").value.trim();
    const area = document.querySelector("#area").value;
    const motivacao = document.querySelector("#motivacao").value.trim();
    const termos = document.querySelector("#termos").checked;
    
    // Verificar se pelo menos um dia foi selecionado
    const disponibilidade = document.querySelectorAll("input[name='disponibilidade']:checked");
    
    // Verificar se um período foi selecionado
    const periodo = document.querySelector("input[name='periodo']:checked");
    
    // Validações específicas
    if (nome.length < 3) {
      alert("Por favor, digite seu nome completo.");
      return;
    }
    
    if (!validarEmail(email)) {
      alert("Por favor, digite um e-mail válido.");
      return;
    }
    
    if (!validarTelefone(telefone)) {
      alert("Por favor, digite um telefone válido no formato (00) 00000-0000.");
      return;
    }
    
    if (!validarCPF(cpf)) {
      alert("Por favor, digite um CPF válido.");
      return;
    }
    
    if (area === "") {
      alert("Por favor, selecione uma área de interesse.");
      return;
    }
    
    if (disponibilidade.length === 0) {
      alert("Por favor, selecione pelo menos um dia de disponibilidade.");
      return;
    }
    
    if (!periodo) {
      alert("Por favor, selecione um período preferencial.");
      return;
    }
    
    if (motivacao.length < 10) {
      alert("Por favor, conte-nos um pouco mais sobre sua motivação (mínimo 10 caracteres).");
      return;
    }
    
    if (!termos) {
      alert("Você precisa aceitar os termos e condições para continuar.");
      return;
    }
    
    // Se passou em todas as validações
    alert("Cadastro realizado com sucesso! Entraremos em contato em breve.");
    form.reset();
  });
  
  // Máscaras para os campos
  document.querySelector("#telefone").addEventListener("input", function(e) {
    let valor = e.target.value.replace(/\D/g, "");
    if (valor.length <= 11) {
      valor = valor.replace(/^(\d{2})(\d{5})(\d{4}).*/, "($1) $2-$3");
    }
    e.target.value = valor;
  });
  
  document.querySelector("#cpf").addEventListener("input", function(e) {
    let valor = e.target.value.replace(/\D/g, "");
    if (valor.length <= 11) {
      valor = valor.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
    }
    e.target.value = valor;
  });
  
  document.querySelector("#cep").addEventListener("input", function(e) {
    let valor = e.target.value.replace(/\D/g, "");
    if (valor.length <= 8) {
      valor = valor.replace(/(\d{5})(\d{3})/, "$1-$2");
    }
    e.target.value = valor;
  });
}

// Funções auxiliares de validação
function validarEmail(email) {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}

function validarTelefone(telefone) {
  const regex = /\(\d{2}\)\s\d{5}-\d{4}/;
  return regex.test(telefone);
}

function validarCPF(cpf) {
  cpf = cpf.replace(/\D/g, "");
  if (cpf.length !== 11) return false;
  
  // Verifica se todos os dígitos são iguais
  if (/^(\d)\1+$/.test(cpf)) return false;
  
  // Validação dos dígitos verificadores
  let soma = 0;
  let resto;
  
  for (let i = 1; i <= 9; i++) {
    soma += parseInt(cpf.substring(i - 1, i)) * (11 - i);
  }
  
  resto = (soma * 10) % 11;
  if (resto === 10 || resto === 11) resto = 0;
  if (resto !== parseInt(cpf.substring(9, 10))) return false;
  
  soma = 0;
  for (let i = 1; i <= 10; i++) {
    soma += parseInt(cpf.substring(i - 1, i)) * (12 - i);
  }
  
  resto = (soma * 10) % 11;
  if (resto === 10 || resto === 11) resto = 0;
  if (resto !== parseInt(cpf.substring(10, 11))) return false;
  
  return true;
}

// ====================================
// INTERAÇÕES DA PÁGINA INICIAL (index.html)
// ====================================
if (document.querySelector(".hero")) {
  const heroSection = document.querySelector(".hero");
  const btnHero = document.querySelector(".hero .btn");
  
  // Animação suave ao rolar para seções
  const links = document.querySelectorAll("a[href^='#']");
  links.forEach(link => {
    link.addEventListener("click", function(e) {
      e.preventDefault();
      const targetId = this.getAttribute("href").substring(1);
      const targetSection = document.getElementById(targetId);
      if (targetSection) {
        targetSection.scrollIntoView({ behavior: "smooth" });
      }
    });
  });
  
  // Contador de impacto animado
  const impactoItems = document.querySelectorAll(".impacto li");
  if (impactoItems.length > 0) {
    const observerOptions = {
      threshold: 0.5
    };
    
    const observer = new IntersectionObserver(function(entries) {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = "0";
          entry.target.style.transform = "translateY(20px)";
          
          setTimeout(() => {
            entry.target.style.transition = "all 0.6s ease";
            entry.target.style.opacity = "1";
            entry.target.style.transform = "translateY(0)";
          }, 100);
        }
      });
    }, observerOptions);
    
    impactoItems.forEach(item => observer.observe(item));
  }
  
  // Destaque nos links de relatórios
  const relatoriosLinks = document.querySelectorAll(".transparencia a");
  relatoriosLinks.forEach(link => {
    link.addEventListener("mouseenter", function() {
      this.style.color = "#ff6600";
      this.style.fontWeight = "bold";
    });
    
    link.addEventListener("mouseleave", function() {
      this.style.color = "";
      this.style.fontWeight = "";
    });
  });
}

// ====================================
// INTERAÇÕES DA PÁGINA DE PROJETOS (projetos.html)
// ====================================
if (document.querySelector("main h1") && window.location.pathname.includes("projetos.html")) {
  const projetosTitle = document.querySelector("main h1");
  
  // Efeito hover no título
  projetosTitle.addEventListener("mouseover", function() {
    this.style.color = "#ff6600";
    this.style.transition = "color 0.3s ease";
  });
  
  projetosTitle.addEventListener("mouseout", function() {
    this.style.color = "#2c3e50";
  });
  
  // Animação nos botões de doação
  const botoesDoacao = document.querySelectorAll("section .btn");
  botoesDoacao.forEach(botao => {
    botao.addEventListener("mouseenter", function() {
      this.style.transform = "scale(1.05)";
      this.style.transition = "transform 0.3s ease";
    });
    
    botao.addEventListener("mouseleave", function() {
      this.style.transform = "scale(1)";
    });
  });
  
  // Confirmação ao clicar em doar
  const linksDoacao = document.querySelectorAll("a[href*='pagseguro'], a[href*='paypal']");
  linksDoacao.forEach(link => {
    link.addEventListener("click", function(e) {
      const confirmacao = confirm("Você será redirecionado para a plataforma de doação. Deseja continuar?");
      if (!confirmacao) {
        e.preventDefault();
      }
    });
  });
  
  // Imagem com efeito de zoom
  const imagens = document.querySelectorAll("section img");
  imagens.forEach(img => {
    img.style.transition = "transform 0.3s ease";
    
    img.addEventListener("mouseenter", function() {
      this.style.transform = "scale(1.03)";
      this.style.cursor = "pointer";
    });
    
    img.addEventListener("mouseleave", function() {
      this.style.transform = "scale(1)";
    });
  });
}

// ====================================
// INTERAÇÕES GLOBAIS (todas as páginas)
// ====================================

// Destaque do menu ativo
const currentPage = window.location.pathname.split("/").pop();
const menuLinks = document.querySelectorAll("nav a");

menuLinks.forEach(link => {
  if (link.getAttribute("href") === currentPage) {
    link.style.borderBottom = "3px solid #ff6600";
    link.style.paddingBottom = "5px";
  }
  
  // Efeito hover nos links do menu
  link.addEventListener("mouseenter", function() {
    if (this.getAttribute("href") !== currentPage) {
      this.style.color = "#ff6600";
    }
  });
  
  link.addEventListener("mouseleave", function() {
    if (this.getAttribute("href") !== currentPage) {
      this.style.color = "white";
    }
  });
});

// Scroll suave para o topo
window.addEventListener("scroll", function() {
  if (window.scrollY > 300) {
    if (!document.querySelector("#btnTopo")) {
      const btnTopo = document.createElement("button");
      btnTopo.id = "btnTopo";
      btnTopo.innerHTML = "↑";
      btnTopo.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        background-color: #ff6600;
        color: white;
        border: none;
        border-radius: 50%;
        width: 50px;
        height: 50px;
        font-size: 24px;
        cursor: pointer;
        box-shadow: 0 4px 8px rgba(0,0,0,0.3);
        z-index: 1000;
        transition: all 0.3s ease;
      `;
      
      btnTopo.addEventListener("mouseenter", function() {
        this.style.backgroundColor = "#cc5200";
        this.style.transform = "scale(1.1)";
      });
      
      btnTopo.addEventListener("mouseleave", function() {
        this.style.backgroundColor = "#ff6600";
        this.style.transform = "scale(1)";
      });
      
      btnTopo.addEventListener("click", function() {
        window.scrollTo({ top: 0, behavior: "smooth" });
      });
      
      document.body.appendChild(btnTopo);
    }
  } else {
    const btnTopo = document.querySelector("#btnTopo");
    if (btnTopo) {
      btnTopo.remove();
    }
  }
});

// Mensagem de boas-vindas (apenas na primeira visita)
if (!sessionStorage.getItem("visitou")) {
  setTimeout(() => {
    if (window.location.pathname.includes("index.html") || window.location.pathname === "/") {
      console.log("Bem-vindo à ONG Segunda Chance! 🐾");
      sessionStorage.setItem("visitou", "true");
    }
  }, 1000);
}

// Animação no footer
const footer = document.querySelector("footer");
if (footer) {
  footer.addEventListener("mouseenter", function() {
    this.style.backgroundColor = "#1a252f";
    this.style.transition = "background-color 0.3s ease";
  });
  
  footer.addEventListener("mouseleave", function() {
    this.style.backgroundColor = "";
  });
}