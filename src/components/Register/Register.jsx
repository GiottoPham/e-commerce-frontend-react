import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import InputOtp from '@onefifteen-z/react-input-otp'
import { Modal, Spinner } from 'react-bootstrap'
import instance from 'api/axios'
export default function Register() {
  const [disable, setDisable] = useState(false)
  const [showSpinner, setShowSpinner] = useState(false)
  const [show, setShow] = useState(false)
  const [show2, setShow2] = useState(false)
  const [errorOtp, setErrorOtp] = useState(false)
  const history = useHistory()
  const [otp, setOtp] = useState('')
  const [sendOTP, setSendOTP] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [userName, setUserName] = useState('')
  const [password, setPassword] = useState('')
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [userNameHidden, setUserNameHidden] = useState('hidden')
  const [passwordHidden, setPasswordHidden] = useState('hidden')
  const [emailHidden, setEmailHidden] = useState('hidden')
  const [nameHidden, setNameHidden] = useState('hidden')
  const [phoneHidden, setPhoneHidden] = useState('hidden')
  const errorCommon = 'This field must not empty'
  const userNameError2 = 'Your username has an incorrect format'
  const passwordError1 = 'Your password has an incorrect format'
  const emailError1 = 'Your email has an incorrect format'
  const phoneError1 = 'Your phone number must between 10 and 11 numbers'
  const [userNameError, setUserNameError] = useState(errorCommon)
  const [passwordError, setPasswordError] = useState(errorCommon)
  const [emailError, setEmailError] = useState(errorCommon)
  const [phoneError, setPhoneError] = useState(errorCommon)
  const [checked, setChecked] = useState(false)
  const nameError = errorCommon
  const onChangeUserName = ({ target }) => {
    const newUserName = target.value
    setUserName(newUserName)
    if (newUserName.length > 0) setUserNameHidden('hidden')
  }
  const onChangePassword = ({ target }) => {
    const newPassword = target.value
    setPassword(newPassword)
    if (newPassword.length > 0) setPasswordHidden('hidden')
  }
  const onChangeName = ({ target }) => {
    const newName = target.value
    setName(newName)
    if (newName.length > 0) setNameHidden('hidden')
  }
  const onChangeEmail = ({ target }) => {
    const newEmail = target.value
    setEmail(newEmail)
    if (newEmail.length > 0) setEmailHidden('hidden')
  }
  const onChangePhone = ({ target }) => {
    const newPhone = target.value
    setPhone(newPhone)
    if (newPhone.length > 0) setPhoneHidden('hidden')
  }
  const onBlurUserName = () => {
    const regexp = /^[a-zA-Z0-9]{5,16}$/
    const checkingResult = regexp.exec(userName)
    if (!checkingResult && userName.length > 0) setUserNameError(userNameError2)
    else setUserNameError(errorCommon)
    if (userName.length === 0 || !checkingResult) setUserNameHidden('')
    else setUserNameHidden('hidden')
  }
  const onBlurPassword = () => {
    const regexp = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,16}$/
    const checkingResult = regexp.exec(password)
    if (!checkingResult && password.length > 0) setPasswordError(passwordError1)
    else setPasswordError(errorCommon)
    if (password.length === 0 || !checkingResult) setPasswordHidden('')
    else setPasswordHidden('hidden')
  }
  const onBlurName = () => {
    if (name.length === 0) setNameHidden('')
    else setNameHidden('hidden')
  }
  const onBlurPhone = () => {
    if (phone.length > 0) setPhoneError(phoneError1)
    else setPhoneError(errorCommon)
    if (phone.length < 10 || phone.length > 11) setPhoneHidden('')
    else setPhoneHidden('hidden')
  }
  const onBlurEmail = () => {
    if (email.length > 1) setEmailError(emailError1)
    else setEmailError(errorCommon)
    if (email.length === 0 || email.indexOf('@') === -1) setEmailHidden('')
    else setEmailHidden('hidden')
  }
  const handleClickShowPassword = () => {
    setShowPassword(!showPassword)
  }
  const handleChangeOtp = otp => {
    setErrorOtp(false)
    setOtp(otp)
  }
  const resendOTP = () => {
    setShowSpinner(!showSpinner)
  }
  const handleClose = () => setShow(false)
  const handleClose2 = () => {
    setShow2(false)
    history.push('/login')
  }
  const handleShow = () => {
    setOtp('')
    setShow(true)
  }
  const createAccount = async () => {
    const regexp = /^[a-zA-Z0-9]{5,16}$/
    const checkingResult = regexp.exec(userName)
    const regexp2 = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,16}$/
    const checkingResult2 = regexp2.exec(password)
    let isTrueSubmit = true
    if (!userName || !checkingResult) {
      setUserNameHidden('')
      isTrueSubmit = false
    }
    if (!password || !checkingResult2) {
      setPasswordHidden('')
      isTrueSubmit = false
    }
    if (!name) {
      setNameHidden('')
      isTrueSubmit = false
    }
    if (!email || email.indexOf('@') === -1) {
      setEmailHidden('')
      isTrueSubmit = false
    }
    if (!phone || phone.length < 10 || phone.length > 11) {
      setPhoneHidden('')
      isTrueSubmit = false
    }
    if (isTrueSubmit) {
      const resp = await instance.get(`/getOTP/${phone}`)
      setSendOTP(resp.data.otp)
      handleShow()
    }
  }
  return (
    <>
      <section className="relative w-full h-full py-10 min-h-screen">
        <div
          className="absolute top-0 w-full h-full bg-blueGray-800 bg-no-repeat bg-contain"
          style={{
            backgroundImage: 'url(' + require('assets/images/bookWallpaper.jpg').default + ')'
          }}
        >
          <span id="blackOverlay" className="w-full h-full absolute opacity-50 bg-black"></span>
        </div>
        <Modal
          show={show}
          onHide={handleClose}
          aria-labelledby="contained-modal-title-vcenter"
          centered
          keyboard={false}
        >
          <Modal.Header
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center'
            }}
          >
            <Modal.Title>OTP verification</Modal.Title>
          </Modal.Header>
          <Modal.Body
            style={{
              display: 'flex',
              justifyContent: 'center'
            }}
          >
            <div className="px-3 py-3">
              <p className="text-center">Please fill the otp send to your phone here </p>
              <div className="md:px-10 py-4">
                <InputOtp
                  onChange={handleChangeOtp}
                  value={otp}
                  errorMessage={'Your otp code is wrong'}
                  error={errorOtp}
                />
              </div>
              <p className="text-center">{showSpinner && <Spinner animation="border" />}</p>
            </div>
          </Modal.Body>

          <Modal.Footer
            style={{
              display: 'flex',
              justifyContent: 'space-between'
            }}
          >
            <button
              className="bg-lightBlue-500 text-white active:bg-blueGray-600 text-xs font-bold uppercase px-4 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none lg:mr-1 lg:mb-0 ml-3 mb-3 ease-linear transition-all duration-150"
              onClick={() => {
                resendOTP()
              }}
            >
              Resend
            </button>
            <button
              className="bg-lightBlue-500 text-white active:bg-blueGray-600 text-xs font-bold uppercase px-4 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none lg:mr-1 lg:mb-0 ml-3 mb-3 ease-linear transition-all duration-150"
              disabled={disable}
              onClick={async () => {
                if (sendOTP === otp) {
                  setDisable(true)
                  const signUpInfo = {
                    fullName: name,
                    username: userName,
                    password: password,
                    contact: phone,
                    email: email
                  }
                  await instance.post('/register', signUpInfo)
                  setShow(false)
                  setShow2(true)
                } else {
                  setErrorOtp(true)
                }
              }}
            >
              Confirm
            </button>
          </Modal.Footer>
        </Modal>
        <Modal
          show={show2}
          onHide={handleClose2}
          backdrop="static"
          keyboard={false}
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <Modal.Body
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center'
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-16 text-center text-emerald-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <div className="text-center">
              <p>You have registered successfully!</p>
              <p> Please log in again with your new account</p>
            </div>
          </Modal.Body>
          <Modal.Footer
            style={{
              display: 'flex',
              justifyContent: 'center'
            }}
          >
            <button
              className="bg-lightBlue-500 text-white active:bg-blueGray-600 text-xs font-bold uppercase px-3 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none lg:mr-1 lg:mb-0 ml-3 mb-3 ease-linear transition-all duration-150"
              onClick={handleClose2}
            >
              Close
            </button>
          </Modal.Footer>
        </Modal>
        <div className="container mx-auto px-4 h-full">
          <div className="flex content-center items-center justify-center h-full">
            <div className="w-full lg:w-6/12 px-4">
              <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-100 border-0">
                <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
                  <div className="text-blueGray-500 text-center mb-3 mt-3 font-bold text-xl">
                    <small>SIGN UP</small>
                  </div>
                  <form>
                    <div className="relative w-full mb-3">
                      <label
                        className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                        htmlFor="grid-password"
                      >
                        User Name
                      </label>
                      <input
                        type="userName"
                        className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                        placeholder="User Name"
                        value={userName}
                        onChange={onChangeUserName}
                        onBlur={onBlurUserName}
                        spellCheck={false}
                      />
                      <div className="relative w-full pt-2">
                        <h1 className={'block text-blueGray-500 text-xs mb-2 '}>
                          5 to 16 characters in length, no special characters
                        </h1>
                        <h1 className={'block text-red-500 font-bold text-xs mb-2 ' + userNameHidden}>
                          {userNameError}
                        </h1>
                      </div>
                    </div>
                    <div className="relative w-full mb-3 pb-6 border-b-2">
                      <label
                        className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                        htmlFor="grid-password"
                      >
                        Password
                      </label>
                      <div className="relative">
                        <input
                          type={!showPassword ? 'password' : 'text'}
                          className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                          placeholder="Password"
                          value={password}
                          onChange={onChangePassword}
                          onBlur={onBlurPassword}
                        />
                        <div className="absolute right-0 top-0 pr-3 pt-3 text-blueGray-300">
                          {!showPassword ? (
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-5 w-5"
                              viewBox="0 0 20 20"
                              fill="currentColor"
                              onClick={handleClickShowPassword}
                            >
                              <path
                                fillRule="evenodd"
                                d="M3.707 2.293a1 1 0 00-1.414 1.414l14 14a1 1 0 001.414-1.414l-1.473-1.473A10.014 10.014 0 0019.542 10C18.268 5.943 14.478 3 10 3a9.958 9.958 0 00-4.512 1.074l-1.78-1.781zm4.261 4.26l1.514 1.515a2.003 2.003 0 012.45 2.45l1.514 1.514a4 4 0 00-5.478-5.478z"
                                clipRule="evenodd"
                              />
                              <path d="M12.454 16.697L9.75 13.992a4 4 0 01-3.742-3.741L2.335 6.578A9.98 9.98 0 00.458 10c1.274 4.057 5.065 7 9.542 7 .847 0 1.669-.105 2.454-.303z" />
                            </svg>
                          ) : (
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-5 w-5"
                              viewBox="0 0 20 20"
                              fill="currentColor"
                              onClick={handleClickShowPassword}
                            >
                              <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                              <path
                                fillRule="evenodd"
                                d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z"
                                clipRule="evenodd"
                              />
                            </svg>
                          )}
                        </div>
                      </div>
                      <div className="relative w-full mb-3 pt-2">
                        <h1 className={'block text-blueGray-500 text-xs mb-2 '}>8 to 16 character in length</h1>
                        <h1 className={'block text-blueGray-500 text-xs mb-2 '}>
                          At least one number, one upper case character and one lower case character
                        </h1>
                        <h1 className={'block text-red-500 font-bold text-xs mb-2 ' + passwordHidden}>
                          {passwordError}
                        </h1>
                      </div>
                    </div>

                    <div className="text-blueGray-500 text-center mb-3 font-bold">
                      <small>PERSONAL INFORMATION</small>
                    </div>
                    <div className="relative w-full mb-3">
                      <label
                        className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                        htmlFor="grid-password"
                      >
                        Full Name
                      </label>
                      <input
                        type="text"
                        className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                        placeholder="Full Name"
                        value={name}
                        onChange={onChangeName}
                        onBlur={onBlurName}
                        spellCheck={false}
                      />
                      <div className="relative w-full mb-3 pt-2">
                        <h1 className={'block text-red-500 font-bold text-xs mb-2 ' + nameHidden}>{nameError}</h1>
                      </div>
                    </div>
                    <div className="relative w-full mb-3">
                      <label
                        className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                        htmlFor="grid-password"
                      >
                        Email
                      </label>
                      <input
                        type="email"
                        className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                        placeholder="Email"
                        value={email}
                        onChange={onChangeEmail}
                        onBlur={onBlurEmail}
                        spellCheck={false}
                      />
                      <div className="relative w-full mb-3 pt-2">
                        <h1 className={'block text-red-500 font-bold text-xs mb-2 ' + emailHidden}>{emailError}</h1>
                      </div>
                    </div>
                    <div className="relative w-full mb-3">
                      <label
                        className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                        htmlFor="grid-password"
                      >
                        Phone Number
                      </label>
                      <input
                        type="number"
                        className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                        placeholder="Phone Number"
                        value={phone}
                        onChange={onChangePhone}
                        onBlur={onBlurPhone}
                      />
                      <div className="relative w-full mb-3 pt-2">
                        <h1 className={'block text-red-500 font-bold text-xs mb-2 ' + phoneHidden}>{phoneError}</h1>
                      </div>
                    </div>
                    <div>
                      <label className="inline-flex items-center cursor-pointer">
                        <input
                          id="customCheckLogin"
                          type="checkbox"
                          className="form-checkbox border-0 rounded text-blueGray-700 ml-1 w-5 h-5 ease-linear transition-all duration-150"
                          value={checked}
                          onChange={() => setChecked(!checked)}
                        />
                        <span className="ml-2 text-sm font-semibold text-blueGray-600">
                          I agree with the{' '}
                          <a href="#pablo" className="text-lightBlue-500" onClick={e => e.preventDefault()}>
                            Privacy Policy
                          </a>
                        </span>
                      </label>
                    </div>
                    <div className="text-center mt-6">
                      {!checked ? (
                        <button
                          className="bg-gray-400 text-white text-sm font-bold uppercase px-6 py-3 rounded shadow outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150"
                          type="button"
                        >
                          Create Account
                        </button>
                      ) : (
                        <button
                          onClick={createAccount}
                          className="bg-blueGray-800 text-white active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150"
                          type="button"
                        >
                          Create Account
                        </button>
                      )}
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
