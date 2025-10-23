// ====================================
// MENU HAMBÚRGUER MOBILE
// ====================================
document.addEventListener('DOMContentLoaded', function() {
  // Criar botão hambúrguer se não existir
  const header = document.querySelector('header');
  const nav = document.querySelector('nav');
  
  if (!document.querySelector('.menu-toggle')) {
    const menuToggle = document.createElement('button');
    menuToggle.className = 'menu-toggle';
    menuToggle.setAttribute('aria-label', 'Toggle menu');
    menuToggle.innerHTML = '<span></span><span></span><span></span>';
    
    // Inserir antes do nav
    header.insertBefore(menuToggle, nav);
    
    // Evento de clique
    menuToggle.addEventListener('click', function() {
      this.classList.toggle('active');
      nav.classList.toggle('active');
    });
  }
  
  // Fechar menu ao clicar em um link (mobile)
  const navLinks = document.querySelectorAll('nav a');
  navLinks.forEach(link => {
    link.addEventListener('click', function() {
      const menuToggle = document.querySelector('.menu-toggle');
      const nav = document.querySelector('nav');
      if (menuToggle && menuToggle.classList.contains('active')) {
        menuToggle.classList.remove('active');
        nav.classList.remove('active');
      }
    });
  });
});

// ====================================
// VALIDAÇÃO DO FORMULÁRIO DE CADASTRO
// ====================================
if (document.querySelector("#formCadastro")) {
  const form = document.querySelector("#formCadastro");
  
  // Validação em tempo real
  const inputs = form.querySelectorAll('input[required], textarea[required], select[required]');
  inputs.forEach(input => {
    input.addEventListener('blur', function() {
      validateField(this);
    });
    
    input.addEventListener('input', function() {
      if (this.classList.contains('invalid')) {
        validateField(this);
      }
    });
  });
  
  form.addEventListener("submit", function(event) {
    event.preventDefault();
    
    let isValid = true;
    
    // Validar todos os campos
    inputs.forEach(input => {
      if (!validateField(input)) {
        isValid = false;
      }
    });
    
    // Verificar disponibilidade
    const disponibilidade = document.querySelectorAll("input[name='disponibilidade']:checked");
    if (disponibilidade.length === 0) {
      showAlert("Por favor, selecione pelo menos um dia de disponibilidade.", "error");
      isValid = false;
    }
    
    // Verificar período
    const periodo = document.querySelector("input[name='periodo']:checked");
    if (!periodo) {
      showAlert("Por favor, selecione um período preferencial.", "error");
      isValid = false;
    }
    
    // Verificar termos
    const termos = document.querySelector("#termos");
    if (termos && !termos.checked) {
      showAlert("Você precisa aceitar os termos e condições.", "error");
      isValid = false;
    }
    
    if (isValid) {
      showAlert("Cadastro realizado com sucesso! Entraremos em contato em breve.", "success");
      setTimeout(() => {
        form.reset();
        // Remover classes de validação
        inputs.forEach(input => {
          input.classList.remove('valid', 'invalid');
        });
      }, 2000);
    }
  });
  
  // Máscaras para os campos
  const telefoneInput = document.querySelector("#telefone");
  if (telefoneInput) {
    telefoneInput.addEventListener("input", function(e) {
      let valor = e.target.value.replace(/\D/g, "");
      if (valor.length <= 11) {
        valor = valor.replace(/^(\d{2})(\d{5})(\d{4}).*/, "($1) $2-$3");
      }
      e.target.value = valor;
    });
  }
  
  const cpfInput = document.querySelector("#cpf");
  if (cpfInput) {
    cpfInput.addEventListener("input", function(e) {
      let valor = e.target.value.replace(/\D/g, "");
      if (valor.length <= 11) {
        valor = valor.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
      }
      e.target.value = valor;
    });
  }
  
  const cepInput = document.querySelector("#cep");
  if (cepInput) {
    cepInput.addEventListener("input", function(e) {
      let valor = e.target.value.replace(/\D/g, "");
      if (valor.length <= 8) {
        valor = valor.replace(/(\d{5})(\d{3})/, "$1-$2");
      }
      e.target.value = valor;
    });
  }
}

// Função de validação de campo
function validateField(field) {
  const value = field.value.trim();
  let isValid = true;
  let errorMsg = "";
  
  // Remover mensagem de erro anterior
  const existingError = field.parentElement.querySelector('.error-message');
  if (existingError) {
    existingError.remove();
  }
  
  if (field.hasAttribute('required') && value === "") {
    isValid = false;
    errorMsg = "Este campo é obrigatório.";
  } else if (field.type === "email" && !validarEmail(value)) {
    isValid = false;
    errorMsg = "Por favor, digite um e-mail válido.";
  } else if (field.id === "telefone" && !validarTelefone(value)) {
    isValid = false;
    errorMsg = "Telefone inválido. Use o formato (00) 00000-0000.";
  } else if (field.id === "cpf" && !validarCPF(value)) {
    isValid = false;
    errorMsg = "CPF inválido.";
  } else if (field.id === "nome" && value.length < 3) {
    isValid = false;
    errorMsg = "Nome deve ter pelo menos 3 caracteres.";
  } else if (field.tagName === "TEXTAREA" && value.length < 10) {
    isValid = false;
    errorMsg = "Por favor, forneça mais detalhes (mínimo 10 caracteres).";
  }
  
  if (isValid) {
    field.classList.remove('invalid');
    field.classList.add('valid');
  } else {
    field.classList.remove('valid');
    field.classList.add('invalid');
    
    // Adicionar mensagem de erro
    const errorElement = document.createElement('span');
    errorElement.className = 'error-message';
    errorElement.textContent = errorMsg;
    field.parentElement.appendChild(errorElement);
  }
  
  return isValid;
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
  
  if (/^(\d)\1+$/.test(cpf)) return false;
  
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

// Sistema de alertas
function showAlert(message, type = "info") {
  // Remover alerta anterior se existir
  const existingAlert = document.querySelector('.alert');
  if (existingAlert) {
    existingAlert.remove();
  }
  
  const alert = document.createElement('div');
  alert.className = `alert alert-${type}`;
  alert.innerHTML = `
    <strong>${type === 'success' ? '✓' : type === 'error' ? '✗' : 'ℹ'}</strong>
    <span>${message}</span>
  `;
  
  const form = document.querySelector('form');
  if (form) {
    form.insertBefore(alert, form.firstChild);
    
    // Remover após 5 segundos
    setTimeout(() => {
      alert.style.opacity = '0';
      alert.style.transition = 'opacity 0.3s ease';
      setTimeout(() => alert.remove(), 300);
    }, 5000);
  }
}

// ====================================
// INTERAÇÕES DA PÁGINA INICIAL
// ====================================
if (document.querySelector(".hero")) {
  // Animação suave ao rolar
  const sections = document.querySelectorAll("section");
  
  const observer = new IntersectionObserver((entries) => {
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
  }, { threshold: 0.1 });
  
  sections.forEach(section => observer.observe(section));
  
  // Contador animado para números de impacto
  const impactoItems = document.querySelectorAll(".impacto li");
  impactoItems.forEach(item => {
    const text = item.textContent;
    const match = text.match(/\+?(\d+\.?\d*)/);
    
    if (match) {
      const targetNumber = parseFloat(match[1].replace('.', ''));
      const prefix = text.split(match[0])[0];
      const suffix = text.split(match[0])[1];
      
      const observerCounter = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            animateCounter(item, 0, targetNumber, 2000, prefix, suffix);
            observerCounter.unobserve(entry.target);
          }
        });
      }, { threshold: 0.5 });
      
      observerCounter.observe(item);
    }
  });
}

function animateCounter(element, start, end, duration, prefix = "", suffix = "") {
  const startTime = performance.now();
  
  function update(currentTime) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    
    const current = Math.floor(start + (end - start) * progress);
    const formattedNumber = current >= 1000 ? current.toLocaleString('pt-BR') : current;
    element.textContent = `${prefix}+${formattedNumber}${suffix}`;
    
    if (progress < 1) {
      requestAnimationFrame(update);
    }
  }
  
  requestAnimationFrame(update);
}

// ====================================
// INTERAÇÕES DA PÁGINA DE PROJETOS
// ====================================
if (window.location.pathname.includes("projetos.html")) {
  const projetosTitle = document.querySelector("main h1");
  
  if (projetosTitle) {
    projetosTitle.addEventListener("mouseover", function() {
      this.style.color = "var(--primary-main)";
      this.style.transition = "color 0.3s ease";
    });
    
    projetosTitle.addEventListener("mouseout", function() {
      this.style.color = "var(--secondary-main)";
    });
  }
  
  // Confirmação ao clicar em doar
  const linksDoacao = document.querySelectorAll("a[href*='pagseguro'], a[href*='paypal']");
  linksDoacao.forEach(link => {
    link.addEventListener("click", function(e) {
      e.preventDefault();
      
      // Criar modal de confirmação
      const modal = document.createElement('div');
      modal.className = 'modal active';
      modal.innerHTML = `
        <div class="modal-content">
          <h2>Confirmar Doação</h2>
          <p>Você será redirecionado para a plataforma de doação. Deseja continuar?</p>
          <div style="display: flex; gap: 10px; justify-content: flex-end; margin-top: 20px;">
            <button class="btn btn-secondary" onclick="this.closest('.modal').remove()">Cancelar</button>
            <button class="btn btn-primary" onclick="window.open('${this.href}', '_blank'); this.closest('.modal').remove();">Continuar</button>
          </div>
        </div>
      `;
      document.body.appendChild(modal);
      
      // Fechar modal ao clicar fora
      modal.addEventListener('click', function(e) {
        if (e.target === modal) {
          modal.remove();
        }
      });
    });
  });
  
  // Animação nas imagens
  const imagens = document.querySelectorAll("section img");
  imagens.forEach(img => {
    img.addEventListener("mouseenter", function() {
      this.style.transform = "scale(1.03)";
      this.style.transition = "transform 0.3s ease";
    });
    
    img.addEventListener("mouseleave", function() {
      this.style.transform = "scale(1)";
    });
  });
}

// ====================================
// INTERAÇÕES GLOBAIS
// ====================================

// Destaque do menu ativo
const currentPage = window.location.pathname.split("/").pop();
const menuLinks = document.querySelectorAll("nav a");

menuLinks.forEach(link => {
  if (link.getAttribute("href") === currentPage) {
    link.style.borderBottom = "3px solid var(--primary-main)";
    link.style.paddingBottom = "5px";
  }
});

// Botão voltar ao topo
let btnTopo = null;

window.addEventListener("scroll", function() {
  if (window.scrollY > 300) {
    if (!btnTopo) {
      btnTopo = document.createElement("button");
      btnTopo.id = "btnTopo";
      btnTopo.innerHTML = "↑";
      btnTopo.setAttribute('aria-label', 'Voltar ao topo');
      btnTopo.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        background-color: var(--primary-main);
        color: var(--neutral-white);
        border: none;
        border-radius: 50%;
        width: 50px;
        height: 50px;
        font-size: 24px;
        cursor: pointer;
        box-shadow: var(--shadow-lg);
        z-index: 1000;
        transition: all var(--transition-base);
      `;
      
      btnTopo.addEventListener("mouseenter", function() {
        this.style.backgroundColor = "var(--primary-dark)";
        this.style.transform = "scale(1.1)";
      });
      
      btnTopo.addEventListener("mouseleave", function() {
        this.style.backgroundColor = "var(--primary-main)";
        this.style.transform = "scale(1)";
      });
      
      btnTopo.addEventListener("click", function() {
        window.scrollTo({ top: 0, behavior: "smooth" });
      });
      
      document.body.appendChild(btnTopo);
    }
  } else {
    if (btnTopo) {
      btnTopo.remove();
      btnTopo = null;
    }
  }
});

// Smooth scroll para links internos
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

// Animação no footer
const footer = document.querySelector("footer");
if (footer) {
  footer.addEventListener("mouseenter", function() {
    this.style.backgroundColor = "var(--secondary-dark)";
    this.style.transition = "background-color var(--transition-base)";
  });
  
  footer.addEventListener("mouseleave", function() {
    this.style.backgroundColor = "var(--secondary-main)";
  });
}

// Lazy loading para imagens
if ('IntersectionObserver' in window) {
  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.style.opacity = '0';
        img.style.transition = 'opacity 0.5s ease';
        setTimeout(() => {
          img.style.opacity = '1';
        }, 100);
        observer.unobserve(img);
      }
    });
  });
  
  document.querySelectorAll('img').forEach(img => imageObserver.observe(img));
}

// Log de boas-vindas
console.log('%c🐾 Bem-vindo à ONG Segunda Chance! 🐾', 'color: #ff6600; font-size: 20px; font-weight: bold;');
console.log('%cObrigado por visitar nosso site!', 'color: #2c3e50; font-size: 14px;');