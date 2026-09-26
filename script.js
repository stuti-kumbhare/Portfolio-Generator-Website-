// ===================== ELEMENTS =====================
const nameInput = document.getElementById('nameInput');
const professionInput = document.getElementById('professionInput');
const bioInput = document.getElementById('bioInput');
const contactEmailInput = document.getElementById('contactEmailInput');
const photoInput = document.getElementById('photoInput');
const aboutPhotoInput = document.getElementById('aboutPhotoInput');
const bgImageInput = document.getElementById('bgImageInput');
const bgColorInput = document.getElementById('bgColorInput');
const themeSelect = document.getElementById('themeSelect');
const generateBtn = document.getElementById('generateBtn');
const downloadBtn = document.getElementById('downloadBtn');

// Skill Inputs
const addSkillBtn = document.getElementById('addSkillBtn');
const skillNameInput = document.getElementById('skillName');
const skillPercentInput = document.getElementById('skillPercent');
const skillCategorySelect = document.getElementById('skillCategory');
const codingSkillsElem = document.getElementById('codingSkills');
const professionalSkillsElem = document.getElementById('professionalSkills');
const skillsData = { coding: [], professional: [] }; // Data store for dynamic skills

// Education Inputs
const educationInputsWrapper = document.getElementById('educationInputsWrapper');
const addEduBtn = document.getElementById('addEduBtn');
const previewEducation = document.getElementById('education-list');

// Experience Inputs
const experienceInputsWrapper = document.getElementById('experienceInputsWrapper');
const addExpBtn = document.getElementById('addExpBtn');
const experienceListElem = document.getElementById('experience-list');

// Project Inputs
const projectInputsWrapper = document.getElementById('projectInputsWrapper');
const addProjectBtn = document.getElementById('addProjectBtn');
const previewProjects = document.getElementById('previewProjects');

// Certificates Inputs
const certificateInputsWrapper = document.getElementById('certificateInputsWrapper');
const addCertificateBtn = document.getElementById('addCertificateBtn');
const previewCertificates = document.getElementById('previewCertificates');
const placeholderCertificate = 'https://via.placeholder.com/260x140?text=Certificate+Image';

// Preview Elements
const previewName = document.getElementById('previewName');
const previewTitle = document.getElementById('previewTitle');
const previewBio = document.getElementById('previewBio');
const previewPhoto = document.getElementById('previewPhoto');
const aboutPhotoElem = document.getElementById('aboutPhoto');
const aboutTitle = document.getElementById('aboutTitle');
const aboutText = document.getElementById('aboutText');
// const previewContactEmail = document.getElementById('contactEmail'); // Removed as per previous fix, it's not a display element
const previewYear = document.getElementById('previewYear');
const body = document.body;
const sectionsToFade = document.querySelectorAll('.section-fade');

previewYear.textContent = new Date().getFullYear();
const placeholderPhoto = 'https://via.placeholder.com/320x320/ff4c60/ffffff?text=Profile+Photo';
const placeholderProject = 'https://via.placeholder.com/260x140?text=Project+Image';

// ===================== HELPERS =====================
function readFileAsDataURL(file) {
  return new Promise((res, rej) => {
    const reader = new FileReader();
    reader.onload = e => res(e.target.result);
    reader.onerror = e => rej(e);
    reader.readAsDataURL(file);
  });
}

function createSkillBar(skill) {
  const wrapper = document.createElement('div');
  wrapper.className = 'skill-bar';
  wrapper.innerHTML = `
    <div class="skill-title"><span>${skill.name}</span> <span class="skill-percent">${skill.percent}%</span></div>
    <div class="skill-container">
      <div class="skill-fill" style="width: 0%;"></div>
    </div>
  `;
  setTimeout(() => {
    wrapper.querySelector('.skill-fill').style.width = skill.percent + '%';
  }, 50);
  return wrapper;
}

function renderSkills() {
  codingSkillsElem.innerHTML = '';
  professionalSkillsElem.innerHTML = '';
  if (skillsData.coding.length === 0) codingSkillsElem.innerHTML = '<div class="skill-bar"><div class="skill-title" style="color:var(--muted)">No Coding Skills Added</div></div>';
  else skillsData.coding.forEach(skill => codingSkillsElem.appendChild(createSkillBar(skill)));

  if (skillsData.professional.length === 0) professionalSkillsElem.innerHTML = '<div class="skill-bar"><div class="skill-title" style="color:var(--muted)">No Professional Skills Added</div></div>';
  else skillsData.professional.forEach(skill => professionalSkillsElem.appendChild(createSkillBar(skill)));
}

// ===================== FADE ANIMATION =====================
const io = new IntersectionObserver(entries => {
  entries.forEach(en => {
    if (en.isIntersecting) {
      en.target.classList.add('visible');
      io.unobserve(en.target);
    }
  });
}, { threshold: 0.15 });
sectionsToFade.forEach(s => io.observe(s));

// ===================== EDUCATION =====================
function renderEducationTimelineFromInputs() {
  previewEducation.innerHTML = '';
  const rows = document.querySelectorAll('#educationInputsWrapper .edu-input-row');
  let hasEntries = false;

  rows.forEach(row => {
    const year = row.querySelector('.edu-year').value.trim();
    const title = row.querySelector('.edu-title').value.trim();
    const desc = row.querySelector('.edu-desc').value.trim();

    if (year || title || desc) {
      hasEntries = true;
      const card = document.createElement('div');
      card.className = 'edu-card';
      card.innerHTML = `
        <div class="edu-dot"></div>
        <div class="meta"><div class="year-pill">${year || 'Year'}</div></div>
        <div class="title">${title || 'Degree / Course'}</div>
        <div class="desc">${desc || 'Description'}</div>
      `;
      previewEducation.appendChild(card);
    }
  });

  if (!hasEntries) {
    const empty = document.createElement('div');
    empty.className = 'edu-card';
    empty.style.marginLeft = '20px';
    empty.textContent = 'No educational background added yet.';
    previewEducation.appendChild(empty);
  }
}

// ===================== EXPERIENCE =====================
function renderExperienceTimeline() {
  experienceListElem.innerHTML = '';
  const rows = document.querySelectorAll('#experienceInputsWrapper .exp-input-row');
  let hasEntries = false;

  rows.forEach(row => {
    const year = row.querySelector('.exp-year').value.trim();
    const title = row.querySelector('.exp-title').value.trim();
    const desc = row.querySelector('.exp-desc').value.trim();

    if (year || title || desc) {
      hasEntries = true;
      const card = document.createElement('div');
      card.className = 'exp-card';
      card.innerHTML = `
        <div class="exp-dot"></div>
        <div class="meta"><div class="year-pill">${year || 'Year'}</div></div>
        <div class="title">${title || 'Company / Role'}</div>
        <div class="desc">${desc || 'Description'}</div>
      `;
      experienceListElem.appendChild(card);
    }
  });

  if (!hasEntries) {
    const empty = document.createElement('div');
    empty.className = 'exp-card';
    empty.style.marginLeft = '20px';
    empty.textContent = 'No work experience added yet.';
    experienceListElem.appendChild(empty);
  }
}

// ===================== PROJECTS =====================
async function renderProjects() {
  previewProjects.innerHTML = '';
  const rows = document.querySelectorAll('#projectInputsWrapper .project-input-row');
  let hasEntries = false;

  for (const row of rows) {
    const title = row.querySelector('.project-title').value.trim();
    const desc = row.querySelector('.project-desc').value.trim();
    const link = row.querySelector('.project-link').value.trim();
    const fileInput = row.querySelector('.project-image');
    let imgSrc = placeholderProject;

    if (fileInput.files[0]) imgSrc = await readFileAsDataURL(fileInput.files[0]);

    if (title || desc || link || imgSrc !== placeholderProject) {
      hasEntries = true;
      const card = document.createElement('div');
      card.className = 'project-card';
      card.innerHTML = `
        <img src="${imgSrc}" alt="${title || 'Project'}">
        <div class="project-info">
          <div class="project-title">${title || 'Project Title'}</div>
          <div class="project-desc">${desc || 'Project Description'}</div>
          ${link ? `<div class="project-link"><a href="${link}" target="_blank">View Project &rarr;</a></div>` : ''}
        </div>`;
      previewProjects.appendChild(card);
    }
  }

  if (!hasEntries) {
    const emptyDiv = document.createElement('div');
    emptyDiv.className = 'card';
    emptyDiv.textContent = 'No projects added yet.';
    previewProjects.appendChild(emptyDiv);
  }
}

// ===================== CERTIFICATES =====================
addCertificateBtn.addEventListener('click', () => {
  const row = document.createElement('div');
  row.className = 'certificate-input-row';
  row.innerHTML = `
    <input type="text" class="cert-title" placeholder="Certificate Title">
    <input type="text" class="cert-org" placeholder="Issued By">
    <input type="text" class="cert-year" placeholder="Year">
    <input type="file" class="cert-image" accept="image/*">
    <button type="button" class="cert-remove-btn">✕</button>
  `;
  certificateInputsWrapper.appendChild(row);
  // FIX: Added updatePreview after removal
  row.querySelector('.cert-remove-btn').addEventListener('click', () => { row.remove(); renderCertificates(); });
});

async function renderCertificates() {
  previewCertificates.innerHTML = '';
  const rows = document.querySelectorAll('#certificateInputsWrapper .certificate-input-row');
  let hasEntries = false;

  for (const row of rows) {
    const title = row.querySelector('.cert-title').value.trim();
    const year = row.querySelector('.cert-year').value.trim();
    const org = row.querySelector('.cert-org').value.trim();
    const fileInput = row.querySelector('.cert-image');
    let imgSrc = placeholderCertificate;

    if (fileInput.files[0]) imgSrc = await readFileAsDataURL(fileInput.files[0]);

    if (title || year || org || imgSrc !== placeholderCertificate) {
      hasEntries = true;
      const card = document.createElement('div');
      card.className = 'certificate-card';
      card.innerHTML = `
        <img src="${imgSrc}" alt="${title || 'Certificate'}">
        <div class="certificate-info">
          <div class="certificate-title">${title || 'Certificate Title'}</div>
          <div class="certificate-year">${year || 'Year'} - ${org || 'Organization'}</div>
        </div>`;
      previewCertificates.appendChild(card);
    }
  }

  if (!hasEntries) {
    const empty = document.createElement('div');
    empty.className = 'card';
    empty.textContent = 'No certificates added yet.';
    previewCertificates.appendChild(empty);
  }
}

// ===================== UPDATE PREVIEW =====================
async function updatePreview() {
  const name = nameInput.value.trim() || 'Your Name';
  const title = professionInput.value.trim() || 'Web Designer';
  const bio = bioInput.value.trim() || 'A short description about you.';
  const email = contactEmailInput.value.trim() || 'example@example.com';

  // --- Update Basic Info ---
  previewName.textContent = name;
  previewTitle.textContent = title;
  previewBio.textContent = bio;
  aboutTitle.textContent = title;
  aboutText.textContent = bio;

  // --- Render Dynamic Content ---
  renderSkills();
  renderExperienceTimeline();
  renderEducationTimelineFromInputs();
  await renderProjects();
  await renderCertificates();

  // --- Handle Photos ---
  const photoFile = photoInput.files[0];
  const heroPhotoSrc = photoFile ? await readFileAsDataURL(photoFile) : placeholderPhoto;
  previewPhoto.src = heroPhotoSrc;

  const aboutFile = aboutPhotoInput.files[0];
  aboutPhotoElem.src = aboutFile ? await readFileAsDataURL(aboutFile) : heroPhotoSrc;

  // --- Handle Theme & Background ---
  const bgFile = bgImageInput.files[0];
  if (bgFile) {
    const bgData = await readFileAsDataURL(bgFile);
    body.style.backgroundImage = `url('${bgData}')`;
    body.style.backgroundSize = 'cover';
    body.style.backgroundPosition = 'center';
    body.style.backgroundAttachment = 'fixed';
    body.style.backgroundColor = '';
  } else {
    body.style.backgroundImage = '';
    body.style.backgroundAttachment = 'scroll';
  }

  // --- Theme Toggle ---
  if (themeSelect.value === 'light') {
    body.classList.add('light');
    if (!bgFile) body.style.backgroundColor = '#f4f4f4'; // Fallback light color
  }
  else {
    body.classList.remove('light');
    if (!bgFile) body.style.backgroundColor = bgColorInput.value || '#0f1720'; // Fallback dark color
  }

  // Rerun intersection observer after content change
  sectionsToFade.forEach(s => s.classList.remove('visible'));
  sectionsToFade.forEach(s => io.observe(s));
}

// ===================== DOWNLOAD FUNCTIONALITY =====================
async function downloadPortfolio() {
  await updatePreview();
  const panel = document.querySelector('.panel');
  const nav = document.querySelector('.navbar');

  const originalPanelDisplay = panel.style.display;
  const originalNavPosition = nav.style.position;
  const originalBodyPadding = body.style.padding;
  const originalBodyMargin = body.style.margin;

  panel.style.display = 'none';
  body.style.padding = '0';
  body.style.margin = '0';
  nav.style.position = 'static';

  const previewContent = document.getElementById('previewArea').outerHTML;

  const finalHtml = `
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${previewName.textContent}'s Portfolio</title>
<link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap" rel="stylesheet">
<link rel="stylesheet" href="style.css"> 
</head>
<body class="${body.className}">
  <header class="navbar" id="topNavbar">
    <div class="nav-left">
      <div class="logo">Logo</div>
    </div>
    <ul class="nav-right">
      <li><a href="#home" class="nav-link">Home</a></li>
      <li><a href="#about" class="nav-link">About</a></li>
      <li><a href="#education" class="nav-link">Education</a></li>
      <li><a href="#skills" class="nav-link">Skills</a></li>
      <li><a href="#experience" class="nav-link">Experience</a></li>
      <li><a href="#projects" class="nav-link">Projects</a></li>
      <li><a href="#certificatesSection" class="nav-link">Certificates</a></li>
      <li><a href="#contact" class="nav-link">Contact</a></li>
    </ul>
  </header>
${previewContent}
<script>
  document.querySelectorAll('.skill-fill').forEach(fill => {
    const width = fill.style.width;
    fill.style.width = '0%';
    setTimeout(() => { fill.style.width = width; }, 50);
  });
</script>
</body>
</html>`;

  const blob = new Blob([finalHtml], { type: 'text/html' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'portfolio.html';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);

  // Restore original styles
  panel.style.display = originalPanelDisplay;
  nav.style.position = originalNavPosition;
  body.style.padding = originalBodyPadding;
  body.style.margin = originalBodyMargin;
}

// ===================== DYNAMIC ROWS =====================
function createDynamicRow(wrapper, className, innerHTML, renderFunction) {
  const row = document.createElement('div');
  row.className = className;
  row.innerHTML = innerHTML;
  wrapper.appendChild(row);
  // FIX: Ensure updatePreview is called after removal
  row.querySelector('button').addEventListener('click', () => {
    row.remove();
    if (renderFunction) renderFunction();
    updatePreview(); // Call updatePreview on any row removal
  });
  return row;
}

const eduRowHTML = `
  <input type="text" class="edu-year" placeholder="Year (e.g., 2018-2022)">
  <input type="text" class="edu-title" placeholder="Degree / Course">
  <input type="text" class="edu-desc" placeholder="Description">
  <button type="button" class="edu-remove-btn">✕</button>
`;
addEduBtn.addEventListener('click', () => createDynamicRow(educationInputsWrapper, 'edu-input-row', eduRowHTML, renderEducationTimelineFromInputs));

const expRowHTML = `
  <input type="text" class="exp-year" placeholder="Year (e.g., 2020-2023)">
  <input type="text" class="exp-title" placeholder="Company / Role">
  <input type="text" class="exp-desc" placeholder="Description">
  <button type="button" class="exp-remove-btn">✕</button>
`;
addExpBtn.addEventListener('click', () => createDynamicRow(experienceInputsWrapper, 'exp-input-row', expRowHTML, renderExperienceTimeline));

const projectRowHTML = `
  <input type="text" class="project-title" placeholder="Project Title">
  <input type="text" class="project-desc" placeholder="Project Description">
  <input type="text" class="project-link" placeholder="Project Link (URL)">
  <input type="file" class="project-image" accept="image/*">
  <button type="button" class="project-remove-btn">✕</button>
`;
addProjectBtn.addEventListener('click', () => createDynamicRow(projectInputsWrapper, 'project-input-row', projectRowHTML, renderProjects));

addSkillBtn.addEventListener('click', () => {
  const name = skillNameInput.value.trim();
  const percent = parseInt(skillPercentInput.value.trim() || '0');
  const category = skillCategorySelect.value;
  if (!name || percent < 0 || percent > 100) return alert('Enter valid skill name and percent (0-100)');
  const skillObj = { name, percent };
  skillsData[category].push(skillObj);
  renderSkills();
  skillNameInput.value = '';
  skillPercentInput.value = '';
  updatePreview(); // Call updatePreview after adding skill
});

generateBtn.addEventListener('click', updatePreview);
downloadBtn.addEventListener('click', downloadPortfolio);

document.addEventListener('DOMContentLoaded', updatePreview);


// ===================== CONTACT FORM HANDLER =====================
document.addEventListener("DOMContentLoaded", () => {
  const contactForm = document.getElementById("contactForm");
  const successMessage = document.getElementById("successMessage");

  if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault();
      successMessage.style.display = "block";
      setTimeout(() => {
        successMessage.style.display = "none";
        contactForm.reset();
      }, 3000);
    });
  }
});

// FIX: Ensure initial remove buttons work by adding listeners for the existing HTML rows
document.querySelectorAll('#educationInputsWrapper .edu-remove-btn').forEach(btn => {
    btn.addEventListener('click', () => { btn.closest('.edu-input-row').remove(); renderEducationTimelineFromInputs(); updatePreview(); });
});
document.querySelectorAll('#experienceInputsWrapper .exp-remove-btn').forEach(btn => {
    btn.addEventListener('click', () => { btn.closest('.exp-input-row').remove(); renderExperienceTimeline(); updatePreview(); });
});
document.querySelectorAll('#projectInputsWrapper .project-remove-btn').forEach(btn => {
    btn.addEventListener('click', () => { btn.closest('.project-input-row').remove(); renderProjects(); updatePreview(); });
});
document.querySelectorAll('#certificateInputsWrapper .cert-remove-btn').forEach(btn => {
    btn.addEventListener('click', () => { btn.closest('.certificate-input-row').remove(); renderCertificates(); updatePreview(); });
});
  





// ===================== CONTACT FORM HANDLER =====================
document.addEventListener("DOMContentLoaded", () => {
  const contactForm = document.getElementById("contactForm");
  const successMessage = document.getElementById("successMessage");
  const errorMessage = document.getElementById("errorMessage"); // optional (agar aap HTML me add karna chahein)

  if (!contactForm) return;

  contactForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const formData = new FormData(contactForm);

    try {
      const response = await fetch("https://formspree.io/f/xwpwkdgn", {
        method: "POST",
        body: formData,
        headers: { Accept: "application/json" },
      });

      if (response.ok) {
        // Success message
        successMessage.style.display = "block";
        successMessage.textContent = "Message sent successfully!";
        setTimeout(() => {
          successMessage.style.display = "none";
          contactForm.reset();
        }, 3000);
      } else {
        throw new Error("Failed to send message");
      }
    } catch (error) {
      // Optional: error message
      if (errorMessage) {
        errorMessage.style.display = "block";
        errorMessage.textContent = "Something went wrong. Please try again.";
        setTimeout(() => (errorMessage.style.display = "none"), 3000);
      } else {
        alert("Something went wrong. Please try again.");
      }
    }
  });
});
