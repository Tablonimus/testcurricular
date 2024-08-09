import axios from "axios";
import { ApiPaths } from "../../../Common/constants/api/api.constants";

class ThemeInterceptor {
  constructor() {
    this.COLORS_API = "https://theme-provider-api.vercel.app/api/colors";
    this.IMAGES_API = "https://theme-provider-api.vercel.app/api/images";
    this.images = null;
  }

  async searchColors() {
    // const colors = (await axios.get(`${this.COLORS_API}`)).data.data.items;
    const colors = (await axios.get(`${this.COLORS_API}`)).data;

    console.log(colors);
    

    return colors;
  }

  async searchImages() {
    let images = (await axios.get(`${this.IMAGES_API}`)).data;

    return images;
  }

  async setCSSVariables() {
    const colors = await this.searchColors();
    colors.forEach((color) =>
      document.body.style.setProperty(color.name, color.hex)
    );
  }

  async setImagesVariables() {
    const images = await this.searchImages();
    
    images.forEach(({ name, imageURL }) => {
      this.images = { ...this.images, [name]: imageURL };
    });

    return this.images;
  }

  async editColor(colorObject) {
    try {
      await axios.put(this.COLORS_API, colorObject);
    } catch (error) {
      alert("error al editar color");
    }
  }

  async editImage(imageObject) {
    try {
      await axios.put(this.IMAGES_API, imageObject);
    } catch (error) {
      alert("error al editar imagen");
    }
  }
}

export const theme = new ThemeInterceptor();
