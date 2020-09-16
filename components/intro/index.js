import React, { useEffect, useState } from 'react'
import Head from 'next/head'
import FontFaceObserver from 'fontfaceobserver'
import styles from './styles.module.scss'
import cn from 'classnames'

const removeAllChildren = (element) => {
  while (element.firstChild) {
    element.removeChild(element.firstChild)
  }
}

const loadFont = (font) => new FontFaceObserver(font).load()

const Intro = () => {
  const [isFontLoaded, setIsFontLoaded] = useState(false)
  const [bl, setBl] = useState(null)
  const [blTextLine1, setBlTextLine1] = useState('BLACK')
  const [blTextLine2, setBlTextLine2] = useState('MAGIC')
  const [blText, setBlText] = useState(null)
  const [mat, setMat] = useState(null)
  const [params, setParams] = useState({
    uVolatility: 3,
    uSpeed: 0.5,
    uMaxCoeff: 0.2,
    uRadius: 0.25,
    uFollowMouse: 0.0,
  })

  useEffect(() => {
    if (isFontLoaded && !mat) {
      const text = new window.Blotter.Text(
        `${blTextLine1}<br/>${blTextLine2}`,
        {
          family: 'Redaction20',
          size: 240,
          leading: 1,
          fill: '#ffffff',
          padding: 50,
          textAlign: 'center',
        }
      )
      const material = new window.Blotter.LiquidDistortMaterial()
      material.uniforms.uSpeed.value = params.uSpeed
      material.uniforms.uVolatility.value = params.uVolatility
      material.uniforms.uMaxCoeff.value = params.uMaxCoeff
      material.uniforms.uRadius.value = params.uRadius
      material.uniforms.uFollowMouse.value = 0.0

      const blotter = new window.Blotter(material, {
        texts: text,
      })
      const elem = document.getElementById('text')
      const scope = blotter.forText(text)
      removeAllChildren(elem)
      scope.appendTo(elem)
      setMat(material)
      setBl(blotter)
      setBlText(text)

      const toggle = () => {
        if (blotter._renderer._currentAnimationLoop) {
          blotter.stop()
        } else {
          blotter.start()
        }
      }
      elem.addEventListener('click', toggle)
    }
  }, [isFontLoaded, mat, setMat])

  useEffect(() => {
    if (!isFontLoaded) {
      loadFont('Redaction20').then(() => setIsFontLoaded(true))
    }
  }, [isFontLoaded, setIsFontLoaded])

  const handleMouseMove = (e) => {
    const rect = e.target.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    mat.uniforms.uMouseX.value = x / rect.width
    mat.uniforms.uMouseY.value = y / rect.height
  }

  useEffect(() => {
    if (mat) {
      const elem = document.getElementById('text')
      elem.addEventListener('mousemove', handleMouseMove)
    }
  }, [mat, handleMouseMove])

  const handleParamChange = (e) => {
    const name = e.target.name
    const value = e.target.valueAsNumber
    mat.uniforms[name].value = value
    setParams({
      ...params,
      [name]: value,
    })
  }

  return (
    <div>
      <Head>
        <script src="/blotter.min.js" />
        <script src="/liquidDistortMaterial.js" />
      </Head>
      <div>
        <div id="text" />
        {mat && (
          <div
            className={cn('p-5 fixed right-0 top-0 text-x1', styles.settings)}
          >
            <div className="flex justify-between">
              <label className="mr-4">explosiveness</label>
              <input
                name="uVolatility"
                type="number"
                step={0.1}
                value={params.uVolatility}
                onChange={handleParamChange}
              />
            </div>
            <div className="mt-3 flex justify-between">
              <label className="mr-4">speed</label>
              <input
                name="uSpeed"
                type="number"
                step={0.1}
                value={params.uSpeed}
                onChange={handleParamChange}
              />
            </div>
            <div className="mt-3 flex justify-between">
              <label className="mr-4">max coeff</label>
              <input
                name="uMaxCoeff"
                type="number"
                step={0.01}
                value={params.uMaxCoeff}
                onChange={handleParamChange}
              />
            </div>
            <div className="mt-3 flex justify-between">
              <label className="mr-4">radius</label>
              <input
                name="uRadius"
                type="number"
                step={0.01}
                value={params.uRadius}
                onChange={handleParamChange}
              />
            </div>
            <div className="mt-3 flex justify-between">
              <label className="mr-4">follow mouse</label>
              <input
                name="uFollowMouse"
                type="number"
                min={0}
                max={1}
                step={1}
                value={params.uFollowMouse}
                onChange={handleParamChange}
              />
            </div>
            <div className="mt-3 flex justify-between">
              <label className="mr-4">first line</label>
              <input
                name="firstLine"
                type="text"
                value={blTextLine1}
                onChange={(e) => {
                  const newLine = e.target.value
                  blText.value = `${newLine}<br/>${blTextLine2}`
                  bl.needsUpdate = true
                  setBlTextLine1(newLine)
                }}
              />
            </div>
            <div className="mt-3 flex justify-between">
              <label className="mr-4">second line</label>
              <input
                name="secondLine"
                type="text"
                value={blTextLine2}
                onChange={(e) => {
                  const newLine = e.target.value
                  blText.value = `${blTextLine1}<br/>${newLine}`
                  bl.needsUpdate = true
                  setBlTextLine2(newLine)
                }}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Intro
