import { createBreakpoint } from 'react-use'
import FontFaceObserver from 'fontfaceobserver'
import Head from 'next/head'
import React, { useEffect, useState } from 'react'
import cn from 'classnames'

import { TABLET_BP, MOBILE_BP } from '../../utils/consts'
import styles from './styles.module.scss'

const useBreakpoint = createBreakpoint({ TABLET: TABLET_BP, MOBILE: MOBILE_BP })

const removeAllChildren = (element) => {
  while (element.firstChild) {
    element.removeChild(element.firstChild)
  }
}

const loadFont = (font) => new FontFaceObserver(font).load()

const Configuration = ({ params, handleParamChange }) => {
  return (
    <div className={cn('p-5 fixed right-0 top-0 text-x1', styles.settings)}>
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
    </div>
  )
}

const Intro = () => {
  const breakpoint = useBreakpoint()
  const isMobile = breakpoint === 'MOBILE'

  const [state, setState] = useState({})
  const [isFontLoaded, setIsFontLoaded] = useState(false)
  const [isConfigOpen] = useState(false)
  const [params, setParams] = useState({
    uVolatility: 3,
    uSpeed: 0.5,
    uMaxCoeff: 0.2,
    uRadius: 0.25,
    uFollowMouse: 0.0,
  })

  const initBlotter = () => {
    const textString = isMobile
      ? 'SUM<br/>MA<br/>TECH<br/>NOLO<br/>GIAE' // 'SAT<br/>ANIC<br/>BLACK<br/>MA<br/>GICK'
      : 'SUMMA<br/>TECHNOLOGIAE'
    const textSettings = isMobile
      ? {
          size: 100,
          leading: 0.9,
          padding: 20,
        }
      : {
          size: 150,
          leading: 0.9,
          padding: 50,
        }
    const text = new window.Blotter.Text(textString, {
      family: 'Redaction20',
      fill: '#ffffff',
      textAlign: 'center',
      ...textSettings,
    })
    const material = new window.Blotter.LiquidDistortMaterial()
    material.uniforms.uSpeed.value = params.uSpeed
    material.uniforms.uVolatility.value = params.uVolatility
    material.uniforms.uMaxCoeff.value = params.uMaxCoeff
    material.uniforms.uRadius.value = params.uRadius
    material.uniforms.uFollowMouse.value = 1.0
    material.uniforms.uMouseX.value = -100.0
    material.uniforms.uMouseY.value = -100.0

    const blotter = new window.Blotter(material, {
      texts: text,
    })
    const elem = document.getElementById('text')
    const scope = blotter.forText(text)
    removeAllChildren(elem)
    scope.appendTo(elem)
    setState({
      blotter,
      material,
      scope,
      text,
    })
  }

  useEffect(() => {
    if (isFontLoaded) {
      initBlotter()
    }
  }, [isFontLoaded])

  useEffect(() => {
    if (!isFontLoaded) {
      loadFont('Redaction20').then(() => setIsFontLoaded(true))
    }
  }, [isFontLoaded, setIsFontLoaded])

  const handleMouseMove = (e) => {
    const rect = e.target.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    state.material.uniforms.uMouseX.value = x / rect.width
    state.material.uniforms.uMouseY.value = y / rect.height
  }

  const handleTouchMove = (e) => {
    const touch = e.touches[0]
    const rect = e.target.getBoundingClientRect()
    const x = touch.clientX - rect.left
    const y = touch.clientY - rect.top
    state.material.uniforms.uMouseX.value = x / rect.width
    state.material.uniforms.uMouseY.value = y / rect.height
  }

  const toggleBlotter = () => {
    const { scope } = state
    if (scope) {
      if (scope.playing) {
        scope.pause()
      } else {
        scope.play()
      }
    }
  }

  const startBlotter = () => {
    const { scope } = state
    if (scope) {
      scope.play()
    }
  }

  const stopBlotter = (e) => {
    const { scope, material } = state
    if (scope) {
      material.uniforms.uMouseX.value = -100.0
      material.uniforms.uMouseY.value = -100.0
      setTimeout(() => {
        scope.pause()
      }, 200)
    }
  }

  useEffect(() => {
    if (state.blotter) {
      // bl.start()
      return () => {
        state.blotter.stop()
      }
    }
  }, [state])

  const handleParamChange = (e) => {
    const { material } = state
    const name = e.target.name
    const value = e.target.valueAsNumber
    material.uniforms[name].value = value
    setParams({
      ...params,
      [name]: value,
    })
  }

  useEffect(() => {
    if (isFontLoaded && state) {
      if (state.blotter) {
        state.blotter.stop()
      }
      initBlotter()
    }
  }, [breakpoint])

  // const handleOrientation = ({ beta, gamma }) => {
  //   let x = (Math.max(Math.min(gamma * 5, 180), -180) + 90) / 180
  //   let y = (Math.max(Math.min(beta * 5, 180), -180) + 90) / 180
  //   x = (x + 0.5) / 2
  //   y = (y + 0.5) / 2
  //   state.material.uniforms.uMouseX.value = x
  //   state.material.uniforms.uMouseY.value = y
  // }
  //

  // const listenToOrientation = () => {
  //   window.DeviceMotionEvent.requestPermission().then(() => {
  //     window.addEventListener('deviceorientation', handleOrientation, true)
  //   })
  // }

  return (
    <div>
      <Head>
        <script src="/blotter.js" />
        <script src="/liquidDistortMaterial.js" />
      </Head>
      <div className="mt-2 sm:mt-10">
        <div
          className={cn(styles.introBox, 'flex justify-center')}
          id="text"
          onMouseMove={handleMouseMove}
          onTouchMove={handleTouchMove}
          onMouseEnter={startBlotter}
          onMouseLeave={stopBlotter}
          onClick={toggleBlotter}
        />
        {state.blotter && isConfigOpen && (
          <Configuration
            params={params}
            handleParamChange={handleParamChange}
          />
        )}
      </div>
    </div>
  )
}

export default Intro
