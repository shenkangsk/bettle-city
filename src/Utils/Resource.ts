type ResourceType = 'images' | 'sounds';

export default class Resource {
  private path: string;
  private resources: {
    images: {
      [key in string]: HTMLImageElement;
    };
  };

  constructor(path) {
    this.path = path;
    this.resources = {
      images: {},
    };
  }

  loadImage(name: string) {
    const img = new Image();

    img.src = `${this.path}/images/${name}`;

    this.resources.images[name] = img;
  }

  getImage(name: string) {
    return this.resources.images[name];
  }
}
