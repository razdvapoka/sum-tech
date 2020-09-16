;(function (Blotter) {
  Blotter.LiquidDistortMaterial = function () {
    Blotter.Material.apply(this, arguments)
  }

  Blotter.LiquidDistortMaterial.prototype = Object.create(
    Blotter.Material.prototype
  )

  Blotter._extendWithGettersSetters(
    Blotter.LiquidDistortMaterial.prototype,
    (function () {
      function _mainImageSrc() {
        var mainImageSrc = [
          Blotter.Assets.Shaders.Noise3D,
          `
          void mainImage (out vec4 mainImage, in vec2 fragCoord)
          {
              vec2 uv = fragCoord.xy / uResolution.xy;
              float z = uSeed + uGlobalTime * uSpeed;
              vec2 center = vec2(0.5, 0.5);
              float coeff = uMaxCoeff * (1.0 - (min(distance(uv, uFollowMouse > 0.0 ? vec2(uMouseX, uMouseY) : center), uRadius) / uRadius));
              uv += snoise(vec3(uv, z)) * coeff * uVolatility;
              mainImage = textTexture(uv);
          }
          `,
        ].join('\n')

        return mainImageSrc
      }

      return {
        constructor: Blotter.LiquidDistortMaterial,

        init: function () {
          this.mainImage = _mainImageSrc()
          this.uniforms = {
            uMaxCoeff: { type: '1f', value: 0.2 },
            uRadius: { type: '1f', value: 0.25 },
            uSpeed: { type: '1f', value: 1.0 },
            uVolatility: { type: '1f', value: 0.15 },
            uSeed: { type: '1f', value: 0.1 },
            uMouseX: { type: '1f', value: 0.0 },
            uMouseY: { type: '1f', value: 0.0 },
            uFollowMouse: { type: '1f', value: 0.0 },
          }
        },
      }
    })()
  )
})(this.Blotter)
