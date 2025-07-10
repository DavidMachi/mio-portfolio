// Shader animato con colore base #222 (onda sottile)
const vertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const fragmentShader = `
  uniform float uTime;
  uniform vec2 uResolution;
  varying vec2 vUv;
  void main() {
    float wave = 0.04 * sin(10.0 * vUv.x + uTime * 1.2) + 0.02 * cos(20.0 * vUv.x - uTime * 0.7);
    float y = vUv.y + wave;
    vec3 base = vec3(0.133, 0.133, 0.133); // #222
    float highlight = smoothstep(0.5, 0.7, y) * 0.08;
    vec3 color = base + vec3(highlight);
    gl_FragColor = vec4(color, 1.0);
  }
`;

function createShaderBG(canvas, width, height) {
  const renderer = new THREE.WebGLRenderer({ canvas, alpha: true });
  renderer.setSize(width, height, false);
  const scene = new THREE.Scene();
  const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
  const geometry = new THREE.PlaneGeometry(2, 2);
  const material = new THREE.ShaderMaterial({
    vertexShader,
    fragmentShader,
    uniforms: {
      uTime: { value: 0 },
      uResolution: { value: new THREE.Vector2(width, height) },
    },
  });
  const mesh = new THREE.Mesh(geometry, material);
  scene.add(mesh);
  function animate(t) {
    material.uniforms.uTime.value = t * 0.001;
    renderer.render(scene, camera);
    requestAnimationFrame(animate);
  }
  animate(0);
  return { renderer, material };
}

(function () {
  function setup() {
    // Bio
    const bio = document.getElementById("bio");
    let bioCanvas = document.getElementById("bio-shader-canvas");
    if (!bioCanvas) {
      bioCanvas = document.createElement("canvas");
      bioCanvas.id = "bio-shader-canvas";
      bio.appendChild(bioCanvas);
    }
    function resizeBio() {
      bioCanvas.width = bio.offsetWidth;
      bioCanvas.height = bio.offsetHeight;
      if (bioCanvas._shader) {
        bioCanvas._shader.renderer.setSize(
          bio.offsetWidth,
          bio.offsetHeight,
          false
        );
        bioCanvas._shader.material.uniforms.uResolution.value.set(
          bio.offsetWidth,
          bio.offsetHeight
        );
      }
    }
    bioCanvas._shader = createShaderBG(
      bioCanvas,
      bio.offsetWidth,
      bio.offsetHeight
    );
    window.addEventListener("resize", resizeBio);
    resizeBio();

    // SVG curve top
    const svg = document.querySelector(".svg-curve");
    let svgCanvas = document.getElementById("svg-curve-shader-canvas");
    if (!svgCanvas) {
      svgCanvas = document.createElement("canvas");
      svgCanvas.id = "svg-curve-shader-canvas";
      svg.parentNode.insertBefore(svgCanvas, svg);
    }
    function resizeSVG() {
      svgCanvas.width = svg.offsetWidth;
      svgCanvas.height = svg.offsetHeight;
      if (svgCanvas._shader) {
        svgCanvas._shader.renderer.setSize(
          svg.offsetWidth,
          svg.offsetHeight,
          false
        );
        svgCanvas._shader.material.uniforms.uResolution.value.set(
          svg.offsetWidth,
          svg.offsetHeight
        );
      }
    }
    svgCanvas._shader = createShaderBG(
      svgCanvas,
      svg.offsetWidth,
      svg.offsetHeight
    );
    window.addEventListener("resize", resizeSVG);
    resizeSVG();

    // SVG curve bottom
    const svgBottom = document.getElementById(
      "svg-curve-shader-canvas-bottom"
    )?.nextElementSibling;
    let svgCanvasBottom = document.getElementById(
      "svg-curve-shader-canvas-bottom"
    );
    if (svgCanvasBottom && svgBottom) {
      function resizeSVGBottom() {
        svgCanvasBottom.width = svgBottom.offsetWidth;
        svgCanvasBottom.height = svgBottom.offsetHeight;
        if (svgCanvasBottom._shader) {
          svgCanvasBottom._shader.renderer.setSize(
            svgBottom.offsetWidth,
            svgBottom.offsetHeight,
            false
          );
          svgCanvasBottom._shader.material.uniforms.uResolution.value.set(
            svgBottom.offsetWidth,
            svgBottom.offsetHeight
          );
        }
      }
      svgCanvasBottom._shader = createShaderBG(
        svgCanvasBottom,
        svgBottom.offsetWidth,
        svgBottom.offsetHeight
      );
      window.addEventListener("resize", resizeSVGBottom);
      resizeSVGBottom();
    }
  }
  if (window.THREE) {
    setup();
  } else {
    const script = document.createElement("script");
    script.src =
      "https://cdn.jsdelivr.net/npm/three@0.152.2/build/three.min.js";
    script.onload = setup;
    document.head.appendChild(script);
  }
})();
