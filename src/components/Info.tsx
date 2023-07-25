import React, { useEffect, useState } from "react"

const Info = () => {
  const [cc, setCc] = useState("")
  const [cv, setCv] = useState("")
  const [zip, setZip] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [progressWidth, setProgressWidth] = useState(0)

  const ccRef = React.useRef<HTMLInputElement>(null)
  const cvRef = React.useRef<HTMLInputElement>(null)
  const zipRef = React.useRef<HTMLInputElement>(null)

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCc(event.target.value)
  }

  const handleCvChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCv(event.target.value)
  }

  const handleZipChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setZip(event.target.value)
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (cc && cv && zip) {
      setIsLoading(true)
      // Simulate an API call or asynchronous operation
      setTimeout(() => {
        setIsLoading(false)
        setIsSubmitted(true)
      }, 4000)
    }
  }

  useEffect(() => {
    if (isLoading) {
      const timer = setInterval(() => {
        setProgressWidth((prevWidth) => prevWidth + 100 / 30)
      }, 100)
      return () => clearInterval(timer)
    }
  }, [isLoading])

  const handleCcKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      cvRef.current?.focus()
    }
  }

  const handleCvKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      zipRef.current?.focus()
    }
  }

  return (
    <div>
      {!isLoading && !isSubmitted && (
        <form onSubmit={handleSubmit} className="info-container">
          <div className="header-textCC">
            Is your credit card number in a hacker's database?
          </div>
          <div className="instructions-text">
            You can easily find out. All you need to do is enter your
            information here and we will scan thousands of hacker databases to
            see if any of them match yours.
          </div>

          <div className="credit-card-container">
            <span className="credit-card-text">Credit card number: </span>
            <input
              className="credit-card-input"
              type="text"
              value={cc}
              onChange={handleNameChange}
              onKeyDown={handleCcKeyDown}
              ref={ccRef}
            />
          </div>
          <div className="cv-container">
            <span className="cv-text">Expiration date: </span>
            <input
              className="cv-input"
              type="text"
              value={cv}
              onChange={handleCvChange}
              onKeyDown={handleCvKeyDown}
              ref={cvRef}
            />
          </div>
          <div className="zip-container">
            <div className="zip-text">Your zip: </div>
            <input
              className="zip-input"
              type="text"
              value={zip}
              onChange={handleZipChange}
              ref={zipRef}
            />
          </div>
          <br />
          <button className="submit-button" type="submit">
            SCAN DATABASE
          </button>
        </form>
      )}
      {isLoading && (
        <div className="loading-container">
          <h1>Scanning database....</h1>
          <div className="loading-bar">
            <div className="progress" style={{ width: `${progressWidth}%` }} />
          </div>
        </div>
      )}
      {isSubmitted && (
        <div className="submitted-container">
          <img className="svg" src="src\assets\tick.svg" alt="Success" />
          <div className="submitted">
            Your card number did not show up on the hacker's database
          </div>
        </div>
      )}
    </div>
  )
}

export default Info
