/*
Copyright 2023 Maxim Samoliuk

Permission is hereby granted, free of charge, to any person obtaining a copy of
this software and associated documentation files (the “Software”), to deal in
the Software without restriction, including without limitation the rights to
use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of
the Software, and to permit persons to whom the Software is furnished to do so,
subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED “AS IS”, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS
FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER
IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/

precision mediump float;
varying vec2 v_texcoord;
uniform sampler2D tex;

// WARNING: DISABLE DAMAGE TRACKING, TO ADD SCANLINES, FLICKER AND
// ANALOG NOISE OR ELSE - COMMENT OUT TIME VARIABLE AND EVERY OTHER
// THING THAT USES TIME
uniform mediump float time;

// ATTENTION!! IF YOU ENABLE FLICKER - MAKE SURE TO SET PROPER DISPLAY FRAMERATE
// AND RESOLUTION VARIABLES FOR YOUR DISPLAY IF FRAMERATE IS WRONG - SHADER
// MIGHT CHANGE BRIGHTNESS RANDOMLY !! - SEE FLICKER SECTION OF THIS CODE

// const float display_framerate = 30.0;
const float display_framerate = 60.0;
// const vec2 display_resolution = vec2(1128.0, 752.0);
const vec2 display_resolution = vec2(2256.0, 1504.0);

vec2 curve(vec2 uv) {
  uv = (uv - 0.5) * 2.0;
  uv *= 1.1;
  uv.x *= 1.0 + pow((abs(uv.y) / 8.0), 2.0);
  uv.y *= 1.0 + pow((abs(uv.x) / 8.0), 2.0);
  uv = (uv / 2.0) + 0.5;
  uv = uv * 0.92 + 0.04;
  return uv;
}

float rand(vec2 uv, float t) {
  return fract(sin(dot(uv, vec2(1225.6548, 321.8942))) * 4251.4865 + t);
}

void main() {
  vec2 uv = v_texcoord;
  // comment out to disable barrel distortion.
  // if cursor is misaligned - enable software cursor rendering
  // by setting envvar: run "export WLR_NO_HARDWARE_CURSORS=1"
  // before launching Hyprland
  uv = curve(uv);
  vec4 pixColor = texture2D(tex, uv);

  vec3 col = pixColor.rgb;

  // Chromatic aberration from CRT ray misalignment
  float analog_noise = fract(sin(time) * 43758.5453123 * uv.y) * 0.0006;
  col.r =
      texture2D(tex, vec2(analog_noise + uv.x + 0.0008, uv.y + 0.0)).x + 0.05;
  col.g = texture2D(tex, vec2(analog_noise + uv.x + 0.0008, uv.y + 0.0005)).y +
          0.05;
  col.b =
      texture2D(tex, vec2(analog_noise + uv.x - 0.0008, uv.y + 0.0)).z + 0.05;

  ///////////////////////////////////////////////////////////////////////////////////////////////

  // Contrast
  col = mix(col, col * smoothstep(0.0, 1.0, col), 1.);
  col = mix(col, col * smoothstep(0.0, 1.0, col), 0.5);
  /////////////

  // Grain
  float scale = 2.8;
  float amount = 0.15;
  vec2 offset = (rand(uv, time) - 0.9) * 1.8 * uv * scale;
  vec3 noise = texture2D(tex, uv + offset).rgb;
  col.rgb = mix(col.rgb, noise, amount);
  ////////////////////////////////
  col *= 12.8;
  /////

  ///////////////////////////////////////////////////////////////////////////////////////////////

  // BLOOM
  const float blur_directions =
      24.0;                       // default is 12.0 but 24.0+ will look bestest
  const float blur_quality = 4.0; // default is 3.0  but 4.0+  will look bestest
  const float blur_size = 12.0;   // radius in pixels
  const float blur_brightness = 6.5; // radius in pixels

  const vec2 blur_radius = blur_size / (display_resolution.xy * 0.5);

  // Blur calculations may be expensive: blur_directions * blur_quality amount
  // of iterations 12 * 3 = 36 iterations per pixel by default
  vec3 bloomColor = vec3(0.0);
  for (float d = 0.0; d < 6.283185307180;
       d += 6.283185307180 / blur_directions) {
    for (float i = 1.0 / blur_quality; i <= 1.0; i += 1.0 / blur_quality) {
      vec3 toAdd =
          texture2D(tex, uv + vec2(cos(d), sin(d)) * blur_radius * i).rgb;
      toAdd *= blur_brightness * vec3(1.5, 0.85, 0.40);
      bloomColor += toAdd;
    }
  }

  bloomColor /= blur_quality * blur_directions;

  col.rgb += bloomColor;
  ////////////////////////////////////////////////////////////////////////////////////////

  ///////////////////////////////////////////////////////////////////////////////////////////////

  // SCANLINES
  float scanvar = 0.1;
  float scanlines =
      clamp(scanvar + scanvar * sin(display_framerate * 1.95 * mod(-time, 8.0) +
                                    uv.y * display_resolution.y),
            0.0, 1.0);

  float s = pow(scanlines, 1.7);
  col = col * vec3(0.4 + 0.7 * s);
  ///////////////////////////////////////////////////////////////////////////////////////////////

  // FLICKER
  // WARNING: this is framerate dependent, and due to floating point precision,
  // it might misbehave over time just like real CRT!!
  float flickerAmount = 0.01; // attempt to recreate CRT flicker(yes, I'm
  // serious). If behaves badly - make it smaller, or comment out
  col *= 1.0 +
         flickerAmount * sin(display_framerate * 2.0 * time); // comment out to
  // disable
  ///////////////////////////////////////////////////////////////////////////////////////////////

  // blacken the display edges
  if (uv.x < 0.0 || uv.x > 1.0)
    col *= 0.0;
  if (uv.y < 0.0 || uv.y > 1.0)
    col *= 0.0;

  // PHOSPHOR COATING LINES
  float phosphor = 0.10;
  float rPhosphor = clamp(
      phosphor + phosphor * sin((uv.x) * display_resolution.x * 1.333333333),
      0.0, 1.0);
  float gPhosphor =
      clamp(phosphor + phosphor * sin((uv.x + 0.333333333) *
                                      display_resolution.x * 1.333333333),
            0.0, 1.0);
  float bPhosphor =
      clamp(phosphor + phosphor * sin((uv.x + 0.666666666) *
                                      display_resolution.x * 1.333333333),
            0.0, 1.0);

  col.r -= rPhosphor;
  col.g -= gPhosphor;
  col.b -= bPhosphor;

  // after adding blur + normal color, brightness was doubled
  col *= 0.5;
  ///////////////////////////////////////////////////////////////////////////////////////////////
  // VIGNETTE FROM CURVATURE
  const float vignetteStrenght = 200.;
  const float vignetteExtend = 0.5;

  vec2 uv_ = uv * (1.0 - uv.yx);
  // multiply with sth for intensity
  float vignette = uv_.x * uv_.y * vignetteStrenght;
  // change pow for modifying the extend of the  vignette
  vignette = clamp(pow(vignette, vignetteExtend), 0., 1.0);

  col *= vec3(vignette);
  ///////////////////////////////////////////////////////////////////////////////////////////////

  // CRUDE COLOR GAMUT REDUCTION
  // pixColor.rgb = col; // replace below lines with this to preserve colors
  // decrease color quality
  // by blending in other colors
  // across the spectrum
  pixColor.r = mix(col.r, mix(col.g, col.b, 0.9), 0.05);
  pixColor.g = mix(col.g, mix(col.r, col.b, 0.3), 0.05);
  pixColor.b = mix(col.b, mix(col.g, col.r, 0.8), 0.05);

  pixColor.rb *= vec2(1.04, 0.8); // crt phosphor  tinting

  gl_FragColor = pixColor;

  // gl_FragColor = vec4(col, 1.);
}
