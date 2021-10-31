import instance from 'api/axios'
import { resetCart, selectCart } from 'features/cart/cartSlice'
import React, { useState } from 'react'
import { Modal } from 'react-bootstrap'
import { confirmAlert } from 'react-confirm-alert'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation } from 'react-router'
import './Cart.scss'
import CartItem from './CartItem'
import CartAddress from './CartAddress'
import { selectCurrentUser, setUser } from 'features/session/sessionSlice'
import { AiOutlineLoading3Quarters } from 'react-icons/ai'
export default function Cart() {
  const cartItems = useSelector(selectCart)
  const currentUser = useSelector(selectCurrentUser)
  const [cost, setCost] = useState(0)
  const [address, setAddress] = useState('')
  const [wardNo, setWardNo] = useState('')
  const [districtNo, setDistrictNo] = useState('')
  const location = useLocation()
  const success = location.search === '' ? false : true
  const dispatch = useDispatch()
  const arrayOfItem = cartItems => {
    const listItem = cartItems.map((item, idx) => {
      return <CartItem item={item.item} number={item.number} key={idx} />
    })
    return listItem
  }
  const [show, setShow] = useState(false)
  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)
  const [show2, setShow2] = useState(success)
  const handleClose2 = () => setShow2(false)
  const handleShow2 = () => setShow2(true)
  const [show3, setShow3] = useState(false)
  const handleShow3 = () => setShow3(true)
  const handleClose3 = () => setShow3(false)
  const [show4, setShow4] = useState(false)
  const handleShow4 = () => setShow4(true)
  const handleClose4 = () => setShow4(false)
  const [show5, setShow5] = useState(false)
  const handleShow5 = () => setShow5(true)
  const handleClose5 = () => setShow5(false)
  const [checked, setChecked] = useState('')
  const number = cartItems.length
  const numberAll = cartItems.reduce(function (acc, obj) {
    return acc + obj.number
  }, 0)
  const price = cartItems.reduce(function (acc, obj) {
    return acc + Number(obj.item.b_price) * obj.number
  }, 0)
  const handleCost = cost => setCost(cost)
  const handleAddress = address => setAddress(address)
  const saveWardDistrict = (ward, district) => {
    setWardNo(ward)
    setDistrictNo(district)
  }
  const deleteAllCart = () => {
    confirmAlert({
      customUI: ({ onClose }) => {
        return (
          <div className="bg-white shadow-lg rounded-lg text-center border-1">
            <div className="px-2">
              <div className="px-3 py-3">
                <p className="text-xl font-semibold">Remove all items</p>
                <p className="mx-10">Are you sure to remove all items from your cart?</p>
                <div className="flex flex-row justify-between px-10 py-2">
                  <button
                    className="bg-lightBlue-500 text-white active:bg-lightBlue-600 text-xs font-bold uppercase px-4 py-2 rounded shadow hover:shadow-lg outline-none focus:outline-none lg:mr-1 lg:mb-0 ml-3 mb-3 ease-linear transition-all duration-150"
                    onClick={onClose}
                  >
                    No
                  </button>
                  <button
                    className="bg-lightBlue-500 text-white active:bg-lightBlue-600 text-xs font-bold uppercase px-4 py-2 rounded shadow hover:shadow-lg outline-none focus:outline-none lg:mr-1 lg:mb-0 ml-3 mb-3 ease-linear transition-all duration-150"
                    onClick={() => {
                      dispatch(resetCart())
                      onClose()
                    }}
                  >
                    Yes, Remove it!
                  </button>
                </div>
              </div>
            </div>
          </div>
        )
      }
    })
  }
  return (
    <main>
      <div
        className="bg-blueGray-200 pt-20"
        style={{
          backgroundImage: 'url(' + require('../../assets/images/login-bg.jpg').default + ')'
        }}
      >
        <div className="container mx-auto px-10 py-10">
          <div className="flex flex-wrap justify-content-between">
            <div className="lg:pt-6 pt-6 w-full md:w-8/12 px-4 text-center shadow-lg rounded-lg bg-white mb-6">
              <h6 className="text-2xl font-bold border-b-2 py-1">Your Book Cart</h6>
              {cartItems.length === 0 ? (
                <div className="px-12 relative relative flex flex-row min-w-0 w-full border-b-2 py-2">
                  <div className="px-2 py-2 flex">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-60 w-60"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                      />
                    </svg>
                    <div className="px-12 py-2 flex flex-col break-words">
                      <h6 className="text-xl font-semibold">Your cart is now empty</h6>
                      <p className="text-blueGray-500">Please come back to homepage and choose your book</p>
                    </div>
                  </div>
                </div>
              ) : (
                arrayOfItem(cartItems)
              )}
            </div>
            <div className="cart__price cart__card">
              <h6 className="text-2xl font-bold text-center">Your Receipt</h6>
              <hr />
              <p className="cart__price-number">Different number of books: {number}</p>
              <p className="cart__price-allnumber">Total number of books: {numberAll}</p>
              <p className="cart__price-price">
                Price:{' '}
                {price.toLocaleString('it-IT', {
                  style: 'currency',
                  currency: 'VND'
                })}
              </p>
              <p className="cart__price-discount">
                <span className="bg-yellow-500 rounded-lg py-2 px-2 text-white">Voucher freeship</span>
              </p>
              <hr />
              <p className="cart__price-cost">
                Total:{' '}
                {(price > 0.0 ? price : 0.0).toLocaleString('it-IT', {
                  style: 'currency',
                  currency: 'VND'
                })}
              </p>
              <div className="cart__price-btn">
                <button
                  onClick={() => {
                    if (number > 0) deleteAllCart()
                  }}
                >
                  Delete cart
                </button>
                <button
                  onClick={() => {
                    if (number > 0) handleShow()
                  }}
                >
                  Payment
                </button>
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
                    <Modal.Title>Verify shipping address</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    <CartAddress
                      handleCost={handleCost}
                      handleClose={handleClose}
                      handleShow={handleShow3}
                      handleAddress={handleAddress}
                      saveWardDistrict={saveWardDistrict}
                    />
                  </Modal.Body>
                </Modal>
                <Modal
                  show={show3}
                  onHide={handleClose3}
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
                    <Modal.Title>Confirm receipt</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    <div className="px-2">
                      <div className="flex flex-col">
                        <p>
                          Shipping Address: <span className="font-bold">{address}</span>
                        </p>
                        <p>
                          Total price of books in your cart:{' '}
                          <span className="font-bold">
                            {price.toLocaleString('it-IT', {
                              style: 'currency',
                              currency: 'VND'
                            })}
                          </span>
                        </p>
                        <p>
                          Shipping price:{' '}
                          <span className="font-bold">
                            {cost.toLocaleString('it-IT', {
                              style: 'currency',
                              currency: 'VND'
                            })}
                          </span>
                        </p>
                        <p>
                          Your discount: <span className="font-bold">Freeship voucher</span>
                        </p>
                        <hr />
                        <p className="font-bold text-xl">
                          TOTAL:{' '}
                          {price.toLocaleString('it-IT', {
                            style: 'currency',
                            currency: 'VND'
                          })}
                        </p>
                      </div>
                      <div className="flex w-full justify-between">
                        <button
                          className="bg-lightBlue-500 text-white active:bg-blueGray-600 text-xs font-bold uppercase px-3 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none lg:mr-1 lg:mb-0 mb-3 ease-linear transition-all duration-150"
                          onClick={handleClose3}
                        >
                          Cancel
                        </button>
                        <button
                          className="bg-lightBlue-500 text-white active:bg-blueGray-600 text-xs font-bold uppercase px-3 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none lg:mb-0 mb-3 ease-linear transition-all duration-150"
                          onClick={() => {
                            handleShow4()
                            handleClose3()
                          }}
                        >
                          Confirm
                        </button>
                      </div>
                    </div>
                  </Modal.Body>
                </Modal>
                <Modal
                  show={show4}
                  onHide={handleClose4}
                  backdrop="static"
                  keyboard={false}
                  aria-labelledby="contained-modal-title-vcenter"
                  centered
                >
                  <Modal.Header
                    style={{
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center'
                    }}
                  >
                    <Modal.Title>Choose your payment method</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    <div className="flex flex-row mb-3 px-10 justify-between px-5">
                      <div className="flex items-center">
                        <input
                          id="cod"
                          type="radio"
                          className="form-checkbox border-0 rounded text-blueGray-700 ml-1 w-5 h-5 ease-linear transition-all duration-150"
                          value="cod"
                          name="method"
                          onChange={e => setChecked(e.target.value)}
                        />
                        <span className="ml-2 text-sm font-semibold text-blueGray-600">COD Payment</span>
                      </div>
                      <div className="flex items-center">
                        <input
                          id="momo"
                          type="radio"
                          className="form-checkbox border-0 rounded text-blueGray-700 ml-1 w-5 h-5 ease-linear transition-all duration-150"
                          value="momo"
                          name="method"
                          onChange={e => setChecked(e.target.value)}
                        />
                        <span className="ml-2 text-sm font-semibold text-blueGray-600">Momo payment</span>
                      </div>
                    </div>
                    <div className="flex w-full justify-between">
                      <button
                        className="bg-lightBlue-500 text-white active:bg-blueGray-600 text-xs font-bold uppercase px-3 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none lg:mr-1 lg:mb-0 ease-linear transition-all duration-150"
                        onClick={handleClose4}
                      >
                        Cancel
                      </button>
                      <button
                        className="bg-lightBlue-500 text-white active:bg-blueGray-600 text-xs font-bold uppercase px-3 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none lg:mb-0 ease-linear transition-all duration-150"
                        onClick={async () => {
                          handleClose4()
                          handleShow5()
                          const purchased = checked === 'momo' ? true : false
                          const payment_type = checked === 'momo' ? '1' : '2'
                          const item = cartItems.map(item => ({
                            itemId: item.item.b_id,
                            price: item.item.b_price,
                            quantity: item.number
                          }))
                          const ghnItem = cartItems.map(item => ({
                            itemName: item.item.b_nm,
                            itemId: item.item.b_id,
                            price: item.item.b_price,
                            quantity: item.number
                          }))
                          const ghnData = {
                            fullName: currentUser.fullName,
                            phone: currentUser.contact,
                            address: address,
                            ward_no: wardNo,
                            district_no: districtNo,
                            total: price,
                            item_list: ghnItem,
                            payment_type: payment_type
                          }
                          const respGHN = await instance.post('/ghn/createOrder', ghnData)
                          const data = {
                            list_item: item,
                            userId: currentUser.id,
                            purchased: purchased,
                            orderId: respGHN.data.data.order_code,
                            expected_time: respGHN.data.data.expected_delivery_time
                          }
                          await instance.post('/history/save', data)
                          const respShipping = await instance.get(`history/${currentUser.id}`)
                          dispatch(resetCart())
                          dispatch(setUser({ ...currentUser, history: respShipping.data.list_order }))
                          if (checked === 'momo') {
                            const pr = 1000
                            const pay = await instance.post(`/momo/payment/transaction/${pr}`)
                            dispatch(resetCart())
                            handleClose5()
                            window.open(pay.data.payUrl, '_self')
                          }
                          if (checked !== 'momo') {
                            handleClose5()
                            handleShow2()
                          }
                        }}
                      >
                        Confirm
                      </button>
                    </div>
                  </Modal.Body>
                </Modal>
                <Modal
                  show={show5}
                  onHide={handleClose5}
                  backdrop="static"
                  keyboard={false}
                  aria-labelledby="contained-modal-title-vcenter"
                  centered
                >
                  <Modal.Body>
                    <div className="flex items-center">
                      <AiOutlineLoading3Quarters className="mr-3 animate-spin text-3xl font-bold" />
                      <div className="text-center font-semibold mt-3 text-xl">
                        <p>Please wait, we are processing your order ...</p>
                      </div>
                    </div>
                  </Modal.Body>
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
                      <p>Successful payment, we will ship your order as soon as possible</p>
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
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
