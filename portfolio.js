function openModal(projectUrl) {
  const modal = document.getElementById("modal");
  const iframe = document.getElementById("project-frame");
  iframe.src = projectUrl;
  modal.style.display = "flex"; // mostra la modale e centra il contenuto
}

function closeModal() {
  const modal = document.getElementById("modal");
  const iframe = document.getElementById("project-frame");
  modal.style.display = "none"; // nascondi la modale
  iframe.src = ""; // reset iframe
}

// const canvas = document.getElementById("shader-canvas");
// const gl = canvas.getContext("webgl");

// function resizeCanvas() {
//   canvas.width = canvas.clientWidth;
//   canvas.height = canvas.clientHeight;
//   gl.viewport(0, 0, canvas.width, canvas.height);
// }

// resizeCanvas();
// window.addEventListener("resize", resizeCanvas);

// const vsSource = document.getElementById("vertexShader").textContent;
// const fsSource = document.getElementById("fragmentShader").textContent;

// function compileShader(type, source) {
//   const shader = gl.createShader(type);
//   gl.shaderSource(shader, source);
//   gl.compileShader(shader);
//   if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
//     console.error(gl.getShaderInfoLog(shader));
//     gl.deleteShader(shader);
//     return null;
//   }
//   return shader;
// }

// const vertexShader = compileShader(gl.VERTEX_SHADER, vsSource);
// const fragmentShader = compileShader(gl.FRAGMENT_SHADER, fsSource);

// const program = gl.createProgram();
// gl.attachShader(program, vertexShader);
// gl.attachShader(program, fragmentShader);
// gl.linkProgram(program);

// if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
//   console.error(gl.getProgramInfoLog(program));
// }

// gl.useProgram(program);

// const vertices = new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]);

// const buffer = gl.createBuffer();
// gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
// gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);

// const position = gl.getAttribLocation(program, "a_position");
// gl.enableVertexAttribArray(position);
// gl.vertexAttribPointer(position, 2, gl.FLOAT, false, 0, 0);

// const uTime = gl.getUniformLocation(program, "u_time");
// const uResolution = gl.getUniformLocation(program, "u_resolution");

// function render(time) {
//   time *= 0.001;

//   resizeCanvas(); // Assicuriamoci dimensioni aggiornate
//   gl.viewport(0, 0, canvas.width, canvas.height);

//   gl.clear(gl.COLOR_BUFFER_BIT);
//   gl.uniform1f(uTime, time);
//   gl.uniform2f(uResolution, canvas.width, canvas.height);

//   gl.drawArrays(gl.TRIANGLES, 0, 6);
//   requestAnimationFrame(render);
// }

// requestAnimationFrame(render);

function animateOnScroll() {
  const animatedTexts = document.querySelectorAll(".text-animate");
  animatedTexts.forEach((el) => {
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight - 60) {
      el.classList.add("visible");
    }
  });
}

document.addEventListener("DOMContentLoaded", animateOnScroll);
window.addEventListener("scroll", animateOnScroll);
