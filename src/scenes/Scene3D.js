import * as THREE from 'three';

class Scene3D {
  constructor(canvas) {
    this.canvas = canvas;
    this.scene = null;
    this.camera = null;
    this.lights = [];
    this.textures = [];
    this.colors = [];
    this.materials = [];
    this.geometries = [];
    this.meshes = [];

    this.textureLoader = new THREE.TextureLoader();
  }
  init() {}
  animate(time) {}
  destroy() {}

  addLight(light) {
    this.lights.push(light);
    return light;
  }
  addTexture(textureImage) {
    return this.textureLoader.load(textureImage, (texture) => {
      this.textures.push(textureImage);
      return texture;
    });
  }
  addColors(color) {
    this.colors.push(color);
    return color;
  }
  addMaterials(material) {
    this.materials.push(material);
    return material;
  }
  addGeometry(geometry) {
    this.geometries.push(geometry);
    return geometry;
  }
  addMeshes(mesh) {
    this.meshes.push(mesh);
    return mesh;
  }
}

export default Scene3D;