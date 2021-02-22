import mainPageUI from "./mainPageUI.js";
import appUI from "./appUI.js";
import modalUI from "./modalUI.js";
import { router, navigateTo } from "./router.js";
import experienceCRUD from "./CRUD/experienceCRUD.js";
import educationCRUD from "./CRUD/educationCRUD.js";
import certificationCRUD from "./CRUD/certificationCRUD.js";
import langSkillCRUD from "./CRUD/languageSkillsCRUD.js";
import completeCvCRUD from "./CRUD/completeCvCRUD.js";
import validation from "./validation.js";

("use strict");

appUI.setTemplate();

let templateButtons = document.getElementsByClassName("mp template-button");
let colorDots = document.getElementsByClassName("mp color-dot");
let selectButtons = document.getElementsByClassName("select-button");
let appTemplateButtons = document.getElementsByClassName("ap template-button");
let appColorDots = document.getElementsByClassName("ap color-dot");

// texarea auto expand

document.addEventListener(
  "input",
  (e) => {
    if (e.target.tagName.toLowerCase() !== "textarea") return;
    modalUI.autoExpandTextarea(e.target);
  },
  false
);

//daisable enddate input after checking still working

let checkbox = document.getElementsByClassName("checkbox");
for (let i = 0; checkbox.length > i; i++) {
  checkbox[i].addEventListener("change", (e) => {
    let checkType = e.target.id.slice(0, 3);
    let input = document.getElementById(checkType + "end-input");
    if (e.target.checked) {
      input.setAttribute("disabled", "");
      input.style.color = "#a3a3a3";
    } else {
      input.removeAttribute("disabled");
      input.style.color = "#000";
    }
  });
}

for (var i = 0; templateButtons.length > i; i++) {
  templateButtons[i].addEventListener("click", (e) => {
    let templateType = e.target.id;
    let color = e.target.parentNode.dataset.color;
    if (!templateType) {
      templateType = e.target.parentNode.id;
    }
    if (!color) {
      color = e.target.parentNode.parentNode.dataset.color;
    }

    var template = templateType + color;

    for (var i = 0; templateButtons.length > i; i++) {
      templateButtons[i].className = "mp template-button";
    }
    mainPageUI.setTemplate(template, templateType);
  });
}

for (var i = 0; colorDots.length > i; i++) {
  colorDots[i].addEventListener("click", (e) => {
    let template = e.target.id;
    if (!template) {
      template = e.target.parentNode.id;
    }
    mainPageUI.setTemplateColor(template);
    let datasetEl = e.target.parentNode.parentNode;
    if (!datasetEl) {
      datasetEl = e.target.parentNode.parentNode.parentNode;
    }

    datasetEl.dataset.color = template.charAt(template.length - 1);
  });
}

for (var i = 0; selectButtons.length > i; i++) {
  selectButtons[i].addEventListener("click", (e) => {
    for (var i = 0; selectButtons.length > i; i++) {
      selectButtons[i].className = "select-button";
    }
    e.target.parentNode.classList.add("currents");
  });
}

for (var i = 0; appTemplateButtons.length > i; i++) {
  appTemplateButtons[i].addEventListener("click", (e) => {
    let template = e.target.id;
    appUI.changeTemplate(template, appTemplateButtons);
  });
}

for (var i = 0; appColorDots.length > i; i++) {
  appColorDots[i].addEventListener("click", (e) => {
    let id = e.target.id;
    appUI.changeColor(id);
  });
}

// MODAL SUBMIT liteners
let experienceForm = document.getElementById("experience-form");
if (experienceForm) {
  experienceForm.addEventListener("submit", (e) => {
    e.preventDefault();
    let newData;
    let editId = document.getElementById("experience-form").dataset.id;
    if (editId !== "") {
      newData = experienceCRUD.experienceData(editId);
    } else {
      newData = experienceCRUD.experienceData();
    }
    let valid = validation.validateData(newData);
    if (valid) {
      let validDate = validation.dateValidation(newData);
      if (validDate) {
        experienceCRUD.addExperience(newData);
        modalUI.clearInputs("experience");
        modalUI.closeModal(e.target);
      }
    }
  });
}
let educationForm = document.getElementById("education-form");
if (educationForm) {
  educationForm.addEventListener("submit", (e) => {
    e.preventDefault();
    let newData;
    let editId = document.getElementById("education-form").dataset.id;
    if (editId != "") {
      newData = educationCRUD.educationData(editId);
    } else {
      newData = educationCRUD.educationData();
    }
    let valid = validation.validateData(newData);
    if (valid) {
      let validDate = validation.dateValidation(newData);
      if (validDate) {
        educationCRUD.addEducation(newData);
        modalUI.clearInputs("education");
        modalUI.closeModal(e.target);
      }
    }
  });
}

let certificationForm = document.getElementById("certification-form");
if (certificationForm) {
  certificationForm.addEventListener("submit", (e) => {
    e.preventDefault();
    let newData;
    let editId = document.getElementById("certification-form").dataset.id;
    if (editId != "") {
      newData = certificationCRUD.certificationData(editId);
    } else {
      newData = certificationCRUD.certificationData();
    }
    let valid = validation.validateData(newData);
    if (valid) {
      let validDate = validation.dateValidation(newData);
      if (validDate) {
        certificationCRUD.addCertification(newData);
        modalUI.clearInputs("certification");
        modalUI.closeModal(e.target);
      }
    }
  });
}

let deleteCvButton = document.getElementById("delete-cv-button");
if (deleteCvButton) {
  deleteCvButton.addEventListener("click", (e) => {
    completeCvCRUD.deleteCv(e.target.dataset.id);
    modalUI.closeModal(e.target);
    completeCvCRUD.readCv();
  });
}

let currentPage = window.location.href.substring(
  window.location.href.lastIndexOf("/") + 1
);

if (currentPage !== "") {
  window.addEventListener("popstate", router);
}

let newButton = document.getElementById("new-button");
if (newButton) {
  newButton.addEventListener("click", () => {
    localStorage.removeItem("basicData");
    localStorage.removeItem("residenceData");
    localStorage.removeItem("contactData");
    localStorage.removeItem("experienceData");
    localStorage.removeItem("educationData");
    localStorage.removeItem("languagesData");
    localStorage.removeItem("skillsData");
    localStorage.removeItem("certificationData");
  });
}

document.addEventListener("DOMContentLoaded", () => {
  document.body.addEventListener("click", (e) => {
    console.log(e.target);
    if (e.target.matches("[data-link]")) {
      e.preventDefault();
      navigateTo(e.target.href);
    } else if (e.target.parentNode.matches("[data-link]")) {
      e.preventDefault();
      if (e.target.matches("[data-valid]")) {
        let valid = validation.validateBasicPage();
        if (valid) {
          navigateTo(e.target.parentNode.href);
        }
      } else {
        navigateTo(e.target.parentNode.href);
      }
    } else if (e.target.parentNode.parentNode.matches("[data-link]")) {
      e.preventDefault();
      if (e.target.parentNode.matches("[data-valid]")) {
        let valid = validation.validateBasicPage();
        if (valid) {
          navigateTo(e.target.parentNode.parentNode.href);
        }
      } else {
        navigateTo(e.target.parentNode.parentNode.href);
      }
    } else if (e.target.matches("[data-expdelete]")) {
      experienceCRUD.deleteExperience(e.target.parentNode.dataset.id);
      experienceCRUD.readExperience();
    } else if (e.target.matches("[data-expedit]")) {
      let jobToEdit = experienceCRUD.updateExperience(
        e.target.parentNode.dataset.id
      );
      modalUI.openModal(e.target);
      modalUI.editExperienceInputs(
        jobToEdit.id,
        jobToEdit.position,
        jobToEdit.company,
        jobToEdit.location,
        jobToEdit.expstart,
        jobToEdit.expend,
        jobToEdit.stillWorking,
        jobToEdit.expdescription
      );
    } else if (e.target.matches("[data-edudelete]")) {
      educationCRUD.deleteEducation(e.target.parentNode.dataset.id);
      educationCRUD.readEducation();
    } else if (e.target.matches("[data-eduedit]")) {
      let eduToEdit = educationCRUD.updateEducation(
        e.target.parentNode.dataset.id
      );
      modalUI.openModal(e.target);
      modalUI.editEducationInputs(
        eduToEdit.id,
        eduToEdit.edulevel,
        eduToEdit.school,
        eduToEdit.specialization,
        eduToEdit.edustart,
        eduToEdit.eduend,
        eduToEdit.stillLearning,
        eduToEdit.edudescription
      );
    } else if (e.target.matches("[data-cerdelete]")) {
      certificationCRUD.deleteCertification(e.target.parentNode.dataset.id);
      certificationCRUD.readCertification();
    } else if (e.target.matches("[data-ceredit]")) {
      let cerToEdit = certificationCRUD.updateCertification(
        e.target.parentNode.dataset.id
      );
      modalUI.openModal(e.target);
      modalUI.editCertificationInputs(
        cerToEdit.id,
        cerToEdit.certname,
        cerToEdit.organizer,
        cerToEdit.certdate,
        cerToEdit.cerdescription
      );
    } else if (e.target.matches("[data-landelete]")) {
      langSkillCRUD.deleteLanguage(e.target.parentNode.dataset.id);
    } else if (e.target.matches("[data-skidelete]")) {
      langSkillCRUD.deleteSkill(e.target.parentNode.dataset.id);
    } else if (e.target.matches("[data-cvdelete]")) {
      modalUI.openModal(e.target);
      document.getElementById("delete-cv-button").dataset.id =
        e.target.dataset.id;
    }
  });
  let currentPage = window.location.href.substring(
    window.location.href.lastIndexOf("/") + 1
  );
  if (currentPage !== "") {
    router();
  }
});
