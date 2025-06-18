
export class SyllabusBase {
    constructor({ name = "", description = "", image = "", color = "", tags = "",link="/" } = {}) {
      this.name = name;
      this.description = description;
      this.image = image;
      this.color = color;
      this.tags = tags;
      this.link = link ;
    }
  
    heroData() {
      return {
        name: this.name,
        description: this.description,
        image: this.image,
        color: this.color,
        tags: this.tags,
        link: this.link
      };
    }
  }
  