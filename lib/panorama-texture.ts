import * as THREE from "three";

/** Batas upload agar tetap tajam di desktop tanpa membebani GPU mobile. */
const MAX_UPLOAD_DIMENSION = 8192;

let cachedMaxTextureSize: number | null = null;

export function getWebGLMaxTextureSize(): number {
  if (cachedMaxTextureSize !== null) return cachedMaxTextureSize;
  if (typeof document === "undefined") return 8192;

  const canvas = document.createElement("canvas");
  const gl =
    canvas.getContext("webgl2") ?? canvas.getContext("webgl");
  if (!gl) {
    cachedMaxTextureSize = 4096;
    return cachedMaxTextureSize;
  }

  cachedMaxTextureSize = gl.getParameter(gl.MAX_TEXTURE_SIZE) as number;
  return cachedMaxTextureSize;
}

export function configurePanoramaTexture(
  texture: THREE.Texture,
  renderer?: THREE.WebGLRenderer
): void {
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.generateMipmaps = false;
  texture.minFilter = THREE.LinearFilter;
  texture.magFilter = THREE.LinearFilter;

  if (renderer) {
    texture.anisotropy = Math.min(
      renderer.capabilities.getMaxAnisotropy(),
      16
    );
  }

  texture.needsUpdate = true;
}

function resizeImageIfNeeded(
  image: HTMLImageElement,
  maxDimension: number
): HTMLImageElement | HTMLCanvasElement {
  const width = image.naturalWidth || image.width;
  const height = image.naturalHeight || image.height;
  const longest = Math.max(width, height);

  if (longest <= maxDimension) return image;

  const scale = maxDimension / longest;
  const targetWidth = Math.floor(width * scale);
  const targetHeight = Math.floor(height * scale);

  const canvas = document.createElement("canvas");
  canvas.width = targetWidth;
  canvas.height = targetHeight;

  const ctx = canvas.getContext("2d");
  if (!ctx) return image;

  ctx.imageSmoothingEnabled = true;
  ctx.imageSmoothingQuality = "high";
  ctx.drawImage(image, 0, 0, targetWidth, targetHeight);
  return canvas;
}

/**
 * Memuat panorama equirectangular dengan downscale berkualitas tinggi
 * sebelum upload ke GPU (menghindari downscale kasar WebGL di production/mobile).
 */
/** Loader Three.js agar kompatibel dengan `useLoader` dari R3F. */
export class PanoramaTextureLoader extends THREE.Loader<THREE.Texture> {
  load(
    url: string,
    onLoad?: (texture: THREE.Texture) => void,
    _onProgress?: (event: ProgressEvent<EventTarget>) => void,
    onError?: (err: unknown) => void
  ): THREE.Texture {
    const placeholder = new THREE.Texture();
    loadPanoramaTexture(url)
      .then((texture) => onLoad?.(texture))
      .catch((err) => onError?.(err));
    return placeholder;
  }
}

export function loadPanoramaTexture(url: string): Promise<THREE.Texture> {
  return new Promise((resolve, reject) => {
    const gpuMax = getWebGLMaxTextureSize();
    const targetMax = Math.min(gpuMax, MAX_UPLOAD_DIMENSION);

    const image = new Image();
    image.crossOrigin = "anonymous";

    image.onload = () => {
      try {
        const source = resizeImageIfNeeded(image, targetMax);
        const texture =
          source instanceof HTMLCanvasElement
            ? new THREE.CanvasTexture(source)
            : new THREE.Texture(source);

        configurePanoramaTexture(texture);
        resolve(texture);
      } catch (error) {
        reject(error);
      }
    };

    image.onerror = () =>
      reject(new Error(`Gagal memuat panorama: ${url}`));

    image.src = url;
  });
}
