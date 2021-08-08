// stepper
const steps = document.querySelectorAll('.stepper-panel__step')
// 表單
const formParts = document.querySelectorAll('.form-panel__part')
// 按鈕Panel
const btnControlPanel = document.querySelector('.btn-control-panel')
const btnPrev = document.getElementById('btn-prev')
const btnNext = document.getElementById('btn-next')
// 購物籃Panel
const cartPanel = document.querySelector('.cart-panel')
// 運送方式表單
const deliveryContent = document.querySelector('.delivery-content')
// 購物籃品項數量
const productCountLabels = document.querySelectorAll('.product-count')
// 購物籃運費
const deliveryLabel = document.querySelector('.cart-panel__delivery__value')
// 小計
const totalLabel = document.querySelector('.cart-panel__total__value')

// 步驟紀錄
let step = 0
// 運費
let deliveryPrice = '免費'
let deliveryValue = 0
// 購物籃品項資料
let productNum = [1, 1]
let productPrice = [3999, 1299]
// 購物費用
let cartTotal = 0
// 總計
let total = cartTotal + deliveryValue

// 設定購物籃顯示
function setCartTotal() {
  cartTotal = 0
  productPrice.forEach((price, index) => {
    productCountLabels[index].innerHTML = productNum[index]
    cartTotal += price * productNum[index]
  })
  total = cartTotal + deliveryValue
  totalLabel.innerHTML = `$${total}`
}

// 按鈕點擊
function onBtnControlPanelClicked(event) {
  event.preventDefault()
  const target = event.target
  const nowStep = steps[step]
  if (target.matches('#btn-next') && step !== 2) {
    const nextStep = steps[step + 1]
    nowStep.classList.remove('active')
    nowStep.classList.add('checked')
    nextStep.classList.add('active')
    formParts[step].classList.toggle('d-none')
    formParts[step + 1].classList.toggle('d-none')
    step += 1
  } else if (target.matches('#btn-prev')) {
    const prevStep = steps[step - 1]
    nowStep.classList.remove('active')
    prevStep.classList.remove('checked')
    prevStep.classList.add('active')
    formParts[step].classList.toggle('d-none')
    formParts[step - 1].classList.toggle('d-none')
    step -= 1
  }
  setBtnDisabled()
}

function setBtnDisabled() {
  if (step === 0) {
    btnPrev.classList.add('disabled')
  } else {
    btnPrev.classList.remove('disabled')
  }

  if (step === 2) {
    btnNext.innerHTML = '確認下單'
  } else {
    btnNext.innerHTML = '下一步'
  }
}

// 運費選擇
function onDeliveryContentClicked(event) {
  const target = event.target
  if (target.matches('#delivery-standard') || target.matches('#delivery-dhl')) {
    deliveryPrice = target.dataset.price
    deliveryValue = Number(target.dataset.value)
    deliveryLabel.innerHTML = deliveryPrice
    setCartTotal()
  }
}

// 購物品項增減
function onCartPanelClicked(event) {
  const target = event.target
  const productIndex = target.dataset.index

  if (target.matches('#btn-minus')) {
    if (productNum[productIndex] > 0) {
      productNum[productIndex]--
    }
    setCartTotal();
  } else if (target.matches('#btn-add')) {
    productNum[productIndex]++
    setCartTotal();
  }
}

setCartTotal();

// 監聽
btnControlPanel.addEventListener('click', onBtnControlPanelClicked)
deliveryContent.addEventListener('click', onDeliveryContentClicked)
cartPanel.addEventListener('click', onCartPanelClicked)