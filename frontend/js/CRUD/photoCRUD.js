import { click, dropHandle, updatePhoto } from "../photoUpload.js";

class PhotoData {
  constructor(isPhoto, path) {
    this.isPhoto = isPhoto;
    this.path = path;
  }
}

class photoCRUD {
  static photoData(name) {
    let isPhoto = true;
    let path = "../pictures/" + name;

    let photoData = new PhotoData(isPhoto, path);

    return photoData;
  }

  static readPhoto() {
    let photoData = JSON.parse(localStorage.getItem("photoData"));
    console.log(photoData);
    if (photoData) {
      if (document.getElementById("image-field")) {
        updatePhoto(photoData.path);
        document.getElementById("image-field").style.cursor = "auto";
        document.getElementById("save-photo-button").style.display = "none";
        document.getElementById("delete-photo-button").style.display = "flex";
        document
          .getElementById("image-field")
          .removeEventListener("click", click);
        document
          .getElementById("image-field")
          .removeEventListener("drop", dropHandle);
      }
      document.querySelector(".photo-container .profile-photo").src =
        photoData.path;
    } else {
      updatePhoto();
      document.querySelector(".photo-container .profile-photo").src =
        "../pictures/240_F_215844325_ttX9YiIIyeaR7Ne6EaLLjMAmy4GvPC69.jpg";
    }
  }

  static deletePhoto() {
    localStorage.removeItem("photoData");
  }

  static addPhoto(data) {
    localStorage.setItem("photoData", JSON.stringify(data));
  }
}

export default photoCRUD;