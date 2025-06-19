import { useEffect, useRef, useState } from "react";

interface Ripple {
  id: number;
  x: number;
  y: number;
  startTime: number;
  duration: number;
}

const RippleEffect = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const glRef = useRef<WebGLRenderingContext | null>(null);
  const programRef = useRef<WebGLProgram | null>(null);
  const ripplesRef = useRef<Ripple[]>([]);
  const animationIdRef = useRef<number>();
  const mouseRef = useRef({ x: 0, y: 0 });
  const [isSupported, setIsSupported] = useState(true);

  // Vertex shader source
  const vertexShaderSource = `
    attribute vec2 a_position;
    attribute vec2 a_texCoord;
    varying vec2 v_texCoord;

    void main() {
      gl_Position = vec4(a_position, 0.0, 1.0);
      v_texCoord = a_texCoord;
    }
  `;

  // Fragment shader source for ripple effect
  const fragmentShaderSource = `
    precision mediump float;
    varying vec2 v_texCoord;
    uniform vec2 u_resolution;
    uniform float u_time;
    uniform vec2 u_ripples[10];
    uniform float u_rippleTimes[10];
    uniform int u_rippleCount;

    // Iridescent color function
    vec3 getIridescentColor(float phase) {
      vec3 color1 = vec3(1.0, 0.8, 0.9); // Pink
      vec3 color2 = vec3(0.8, 0.9, 1.0); // Light blue
      vec3 color3 = vec3(1.0, 1.0, 0.8); // Light yellow
      vec3 color4 = vec3(0.9, 0.8, 1.0); // Light purple

      float t = fract(phase * 4.0);
      if (t < 0.25) {
        return mix(color1, color2, t * 4.0);
      } else if (t < 0.5) {
        return mix(color2, color3, (t - 0.25) * 4.0);
      } else if (t < 0.75) {
        return mix(color3, color4, (t - 0.5) * 4.0);
      } else {
        return mix(color4, color1, (t - 0.75) * 4.0);
      }
    }

    void main() {
      vec2 uv = v_texCoord;
      vec3 finalColor = vec3(0.0); // Start with transparent/black

      for (int i = 0; i < 10; i++) {
        if (i >= u_rippleCount) break;

        vec2 ripplePos = u_ripples[i] / u_resolution;
        float rippleTime = u_rippleTimes[i];

        if (rippleTime > 0.0) {
          float dist = distance(uv, ripplePos);
          float rippleRadius = rippleTime * 0.3; // Adjust expansion speed
          float rippleWidth = 0.02; // Width of the ripple edge

          // Create ripple wave
          float wave = abs(dist - rippleRadius);
          float rippleIntensity = smoothstep(rippleWidth, 0.0, wave) *
                                  (1.0 - smoothstep(0.8, 1.0, rippleTime));

          if (rippleIntensity > 0.0) {
            // Iridescent edge effect
            float phase = dist * 20.0 - rippleTime * 5.0;
            vec3 iridescentColor = getIridescentColor(phase);

            // Subtle distortion in the interior
            float distortionMask = smoothstep(rippleRadius - 0.05, rippleRadius, dist) *
                                   (1.0 - smoothstep(rippleRadius, rippleRadius + 0.05, dist));
            vec2 distortionOffset = normalize(uv - ripplePos) * sin(rippleTime * 6.28) * 0.002;

            // Apply iridescent edge
            finalColor = mix(finalColor, iridescentColor * 0.3 + baseColor,
                           rippleIntensity * 0.6);

            // Apply subtle background distortion
            if (dist < rippleRadius) {
              finalColor += vec3(0.02, 0.01, 0.03) * sin(dist * 50.0 - rippleTime * 10.0) *
                           (1.0 - rippleTime) * 0.5;
            }
          }
        }
      }

      // Calculate alpha based on ripple effects
      float alpha = 0.0;
      for (int i = 0; i < 10; i++) {
        if (i >= u_rippleCount) break;
        vec2 ripplePos = u_ripples[i] / u_resolution;
        float rippleTime = u_rippleTimes[i];
        if (rippleTime > 0.0) {
          float dist = distance(uv, ripplePos);
          float rippleRadius = rippleTime * 0.3;
          float rippleWidth = 0.02;
          float wave = abs(dist - rippleRadius);
          float rippleIntensity = smoothstep(rippleWidth, 0.0, wave) *
                                  (1.0 - smoothstep(0.8, 1.0, rippleTime));
          alpha += rippleIntensity * 0.6;
        }
      }

      gl_FragColor = vec4(finalColor, alpha);
    }
  `;

  const createShader = (
    gl: WebGLRenderingContext,
    type: number,
    source: string,
  ) => {
    const shader = gl.createShader(type);
    if (!shader) return null;

    gl.shaderSource(shader, source);
    gl.compileShader(shader);

    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
      console.error("Shader compilation error:", gl.getShaderInfoLog(shader));
      gl.deleteShader(shader);
      return null;
    }

    return shader;
  };

  const createProgram = (gl: WebGLRenderingContext) => {
    const vertexShader = createShader(gl, gl.VERTEX_SHADER, vertexShaderSource);
    const fragmentShader = createShader(
      gl,
      gl.FRAGMENT_SHADER,
      fragmentShaderSource,
    );

    if (!vertexShader || !fragmentShader) return null;

    const program = gl.createProgram();
    if (!program) return null;

    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);

    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.error("Program linking error:", gl.getProgramInfoLog(program));
      gl.deleteProgram(program);
      return null;
    }

    return program;
  };

  const initWebGL = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl =
      canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
    if (!gl) {
      setIsSupported(false);
      return;
    }

    glRef.current = gl as WebGLRenderingContext;
    const program = createProgram(gl as WebGLRenderingContext);
    if (!program) {
      setIsSupported(false);
      return;
    }

    programRef.current = program;

    // Set up geometry
    const positions = new Float32Array([
      -1, -1, 0, 0, 1, -1, 1, 0, -1, 1, 0, 1, 1, 1, 1, 1,
    ]);

    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, positions, gl.STATIC_DRAW);

    const positionLocation = gl.getAttribLocation(program, "a_position");
    const texCoordLocation = gl.getAttribLocation(program, "a_texCoord");

    gl.enableVertexAttribArray(positionLocation);
    gl.enableVertexAttribArray(texCoordLocation);

    gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 16, 0);
    gl.vertexAttribPointer(texCoordLocation, 2, gl.FLOAT, false, 16, 8);

    gl.useProgram(program);
  };

  const addRipple = (x: number, y: number) => {
    const newRipple: Ripple = {
      id: Date.now() + Math.random(),
      x,
      y,
      startTime: performance.now(),
      duration: 2500 + Math.random() * 500, // 2.5-3 seconds
    };

    ripplesRef.current.push(newRipple);

    // Limit to 10 concurrent ripples for performance
    if (ripplesRef.current.length > 10) {
      ripplesRef.current.shift();
    }
  };

  const render = () => {
    const gl = glRef.current;
    const program = programRef.current;
    const canvas = canvasRef.current;

    if (!gl || !program || !canvas) return;

    const currentTime = performance.now();

    // Remove expired ripples
    ripplesRef.current = ripplesRef.current.filter(
      (ripple) => currentTime - ripple.startTime < ripple.duration,
    );

    // Set canvas size
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    gl.viewport(0, 0, canvas.width, canvas.height);

    // Enable blending for transparency
    gl.enable(gl.BLEND);
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);

    // Clear canvas with transparent background
    gl.clearColor(0.0, 0.0, 0.0, 0.0); // Transparent
    gl.clear(gl.COLOR_BUFFER_BIT);

    // Set uniforms
    const resolutionLocation = gl.getUniformLocation(program, "u_resolution");
    const timeLocation = gl.getUniformLocation(program, "u_time");
    const ripplesLocation = gl.getUniformLocation(program, "u_ripples");
    const rippleTimesLocation = gl.getUniformLocation(program, "u_rippleTimes");
    const rippleCountLocation = gl.getUniformLocation(program, "u_rippleCount");

    gl.uniform2f(resolutionLocation, canvas.width, canvas.height);
    gl.uniform1f(timeLocation, currentTime * 0.001);

    // Prepare ripple data
    const rippleData = new Float32Array(20); // 10 ripples * 2 coordinates
    const rippleTimeData = new Float32Array(10);

    ripplesRef.current.forEach((ripple, index) => {
      if (index < 10) {
        rippleData[index * 2] = ripple.x;
        rippleData[index * 2 + 1] = canvas.height - ripple.y; // Flip Y coordinate
        rippleTimeData[index] =
          (currentTime - ripple.startTime) / ripple.duration;
      }
    });

    gl.uniform2fv(ripplesLocation, rippleData);
    gl.uniform1fv(rippleTimesLocation, rippleTimeData);
    gl.uniform1i(rippleCountLocation, Math.min(ripplesRef.current.length, 10));

    // Draw
    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);

    animationIdRef.current = requestAnimationFrame(render);
  };

  useEffect(() => {
    if (!isSupported) return;

    initWebGL();

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvasRef.current?.getBoundingClientRect();
      if (!rect) return;

      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      // Throttle ripple creation
      const distance = Math.sqrt(
        Math.pow(x - mouseRef.current.x, 2) +
          Math.pow(y - mouseRef.current.y, 2),
      );

      if (distance > 20) {
        // Create ripple every 20 pixels of movement
        addRipple(x, y);
        mouseRef.current = { x, y };
      }
    };

    const handleResize = () => {
      if (canvasRef.current) {
        canvasRef.current.width = window.innerWidth;
        canvasRef.current.height = window.innerHeight;
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("resize", handleResize);

    // Start render loop
    render();

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
      if (animationIdRef.current) {
        cancelAnimationFrame(animationIdRef.current);
      }
    };
  }, [isSupported]);

  if (!isSupported) {
    // CSS-based fallback with simple ripple animations
    const [cssRipples, setCssRipples] = useState<
      Array<{ id: number; x: number; y: number }>
    >([]);

    useEffect(() => {
      const handleMouseMove = (e: MouseEvent) => {
        const newRipple = {
          id: Date.now() + Math.random(),
          x: e.clientX,
          y: e.clientY,
        };

        setCssRipples((prev) => [...prev.slice(-4), newRipple]); // Keep only 5 ripples

        // Remove ripple after animation
        setTimeout(() => {
          setCssRipples((prev) => prev.filter((r) => r.id !== newRipple.id));
        }, 3000);
      };

      let throttleTimer: NodeJS.Timeout | null = null;
      const throttledMouseMove = (e: MouseEvent) => {
        if (throttleTimer) return;
        throttleTimer = setTimeout(() => {
          handleMouseMove(e);
          throttleTimer = null;
        }, 200);
      };

      window.addEventListener("mousemove", throttledMouseMove);
      return () => {
        window.removeEventListener("mousemove", throttledMouseMove);
        if (throttleTimer) clearTimeout(throttleTimer);
      };
    }, []);

    return (
      <div
        className="fixed inset-0 pointer-events-none overflow-hidden"
        style={{ zIndex: -1 }}
      >
        {cssRipples.map((ripple) => (
          <div
            key={ripple.id}
            className="absolute rounded-full border-2 border-pink-200/30 animate-ping"
            style={{
              left: ripple.x - 50,
              top: ripple.y - 50,
              width: 100,
              height: 100,
              animationDuration: "3s",
              background:
                "radial-gradient(circle, rgba(255,182,193,0.1) 0%, rgba(221,160,221,0.1) 50%, rgba(173,216,230,0.1) 100%)",
            }}
          />
        ))}
      </div>
    );
  }

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none"
      style={{ zIndex: -1 }}
      width={window.innerWidth}
      height={window.innerHeight}
    />
  );
};

export default RippleEffect;
