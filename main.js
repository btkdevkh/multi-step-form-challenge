const dataSteps = document.querySelectorAll("[data-step]")
const stepsNums = document.querySelectorAll("[data-step-num]")
const gobackBtn = document.querySelector("[data-goback]")
const nextStepBtn = document.querySelector("[data-nextstep]")
const checkBtn = document.querySelector("[data-check-btn]")
const checkCircle = document.querySelector("[data-check-circle]")

// form
const formStepOne = document.querySelector("[data-form-step-one]")
const nameInput = document.querySelector("[data-name]")
const emailInput = document.querySelector("[data-email]")
const telInput = document.querySelector("[data-tel]")
const errorParas = document.querySelectorAll("[data-error]")
const listEl = document.querySelectorAll("[data-list]")

const pickAddYears = document.querySelectorAll("[data-pick-add-year]")
const pickAddMonths = document.querySelectorAll("[data-pick-add-month]")
const total = document.querySelector("[data-total]")

const onlineServiceInput = document.querySelector("[data-online-service]")
const largerStorageInput = document.querySelector("[data-larger-storage]")
const customizableInput = document.querySelector("[data-customizable]")

const plansYearly = document.querySelectorAll("[data-plan-yearly]")
const plansMonthly = document.querySelectorAll("[data-plan-monthly]")
const yearlyEl = document.querySelector("[data-yearly]")
const monthlyEl = document.querySelector("[data-monthly]")

const dataPickAddSummery = document.querySelector("[data-pick-add-summery]")
const planChoice = document.querySelector("[data-plan-choice]")
const planChoicePrice = document.querySelector("[data-plan-choice-price]")

const changeLinkBtn = document.querySelector("[data-change-link-btn]")

let index = 0
let yearlySelected = false

let arcade
let advanced
let pro

let onlineService
let largerStorage
let customizable

let totalPlanPrice

dataSteps.forEach((dataStep, idx) => {
  if (idx !== 0) {
    dataStep.classList.add("step-non-active")
    gobackBtn.classList.remove("active")
    return
  }
})

function removeOrAddActiveNum(isRemove = true) {
  if (isRemove) {
    stepsNums.forEach(num => {
      num.classList.remove("active")
    })
  } else {
    stepsNums.forEach(num => {
      num.classList.add("active")
    })
  }
}

function addActiveStep() {
  dataSteps.forEach((dataStep, idx) => {
    if (idx === index) {
      dataStep.classList.remove("step-non-active")
      dataStep.classList.add("step-active")
      gobackBtn.classList.add("active")

      if (index >= dataSteps.length - 1) return
      stepsNums[index].classList.add("active")
    } else {
      dataStep.classList.remove("step-active")
      dataStep.classList.add("step-non-active")
    }
  })
}

function next() {
  const strawberryred = getComputedStyle(
    document.documentElement
  ).getPropertyValue("--strawberryred")

  // data input
  const name = formStepOne.name.value
  const email = formStepOne.email.value
  const tel = formStepOne.tel.value

  if (!name) {
    nameInput.style.border = `2px solid ${strawberryred}`
    errorParas[0].style.display = "block"

    return
  }
  nameInput.style.border = ``
  errorParas[0].style.display = "none"

  if (!email) {
    emailInput.style.border = `2px solid ${strawberryred}`
    errorParas[1].style.display = "block"

    return
  }
  emailInput.style.border = ``
  errorParas[1].style.display = "none"

  if (!tel) {
    telInput.style.border = `2px solid ${strawberryred}`
    errorParas[2].style.display = "block"

    return
  }
  telInput.style.border = ``
  errorParas[2].style.display = "none"

  index++

  removeOrAddActiveNum()

  if (index === 3) {
    nextStepBtn.textContent = "confirm"
    nextStepBtn.style.backgroundColor = "hsl(243, 100%, 62%)"
    nextStepBtn.style.border = "none"
  } else {
    nextStepBtn.textContent = "Next Step"
    nextStepBtn.style.backgroundColor = ""
    nextStepBtn.style.border = ""
  }

  if (index >= dataSteps.length - 1) {
    nextStepBtn.style.display = "none"

    removeOrAddActiveNum(false)
  }

  if (index <= dataSteps.length - 1) {
    gobackBtn.style.visibility = "visible"
  }

  if (index >= 4) gobackBtn.style.visibility = "hidden"

  if (yearlySelected) {
    pickAddYears.forEach(y => (y.style.display = "block"))
    pickAddMonths.forEach(m => (m.style.display = "none"))

    onlineService = 10
    largerStorage = 20
    customizable = 20
  } else {
    pickAddYears.forEach(y => (y.style.display = "none"))
    pickAddMonths.forEach(m => (m.style.display = "block"))

    onlineService = 1
    largerStorage = 2
    customizable = 2
  }

  addActiveStep()

  if (listEl[0].classList.contains("active")) {
    yearlySelected ? (arcade = 90) : (arcade = 9)
  } else {
    arcade = undefined
  }
  if (listEl[1].classList.contains("active")) {
    yearlySelected ? (advanced = 120) : (advanced = 12)
  } else {
    advanced = undefined
  }
  if (listEl[2].classList.contains("active")) {
    yearlySelected ? (pro = 150) : (pro = 15)
  } else {
    pro = undefined
  }

  if (!onlineServiceInput.checked) {
    onlineService = 0
  }

  if (!largerStorageInput.checked) {
    largerStorage = 0
  }

  if (!customizableInput.checked) {
    customizable = 0
  }

  // console.log(arcade)
  // console.log(advanced)
  // console.log(pro)

  // console.log(onlineService)
  // console.log(largerStorage)
  // console.log(customizable)

  totalPlanPrice = arcade ?? advanced ?? pro

  finishSummeryView()
}

function finishSummeryView() {
  if (arcade != undefined) {
    planChoice.textContent = `Arcade ${
      !yearlySelected ? "(Monthly)" : "(Yearly)"
    }`
    planChoicePrice.textContent = `$${arcade}/${!yearlySelected ? "mo" : "yr"}`
  }
  if (advanced != undefined) {
    planChoice.textContent = `Advanced ${
      !yearlySelected ? "(Monthly)" : "(Yearly)"
    }`
    planChoicePrice.textContent = `$${advanced}/${
      !yearlySelected ? "mo" : "yr"
    }`
  }
  if (pro != undefined) {
    planChoice.textContent = `Pro ${!yearlySelected ? "(Monthly)" : "(Yearly)"}`
    planChoicePrice.textContent = `$${pro}/${!yearlySelected ? "mo" : "yr"}`
  }

  dataPickAddSummery.innerHTML = ""
  dataPickAddSummery.innerHTML += `
    <div>
      <div>
        <span class="gray-txt">Online service</span>
      </div>
      <span class="price-500">${
        onlineService === 0
          ? "No"
          : `$${onlineService}/${!yearlySelected ? "mo" : "yr"}`
      }</span>
    </div>
    <div>
      <div>
        <span class="gray-txt">Larger storage</span>
      </div>
      <span class="price-500">${
        largerStorage === 0
          ? "No"
          : `$${largerStorage}/${!yearlySelected ? "mo" : "yr"}`
      }</span>
    </div>
    <div>
      <div>
        <span class="gray-txt">Customizable Profile</span>
      </div>
      <span class="price-500">${
        customizable === 0
          ? "No"
          : `$${customizable}/${!yearlySelected ? "mo" : "yr"}`
      }</span>
    </div>
  `

  total.innerHTML = ""
  total.innerHTML += `
    <div>
      <span class="">Total ${
        yearlySelected ? "(per year)" : "(per month)"
      }</span>
    </div>
    <span class="total-price">+$${
      totalPlanPrice + onlineService + largerStorage + customizable
    }/${!yearlySelected ? "mo" : "yr"}</span>
  `
}

function back() {
  index--

  removeOrAddActiveNum()

  if (index < 3) {
    nextStepBtn.textContent = "Next Step"
    nextStepBtn.style.backgroundColor = ""
    nextStepBtn.style.border = ""
  } else {
    nextStepBtn.textContent = "confirm"
    nextStepBtn.style.backgroundColor = "hsl(243, 100%, 62%)"
    nextStepBtn.style.border = "none"
  }

  if (index <= 0) gobackBtn.style.visibility = "hidden"
  if (index < dataSteps.length) nextStepBtn.style.display = "block"

  addActiveStep()
}

function select(list) {
  listEl.forEach(l => {
    l.classList.remove("active")
  })

  if (!list.classList.contains("active")) {
    list.classList.add("active")
  } else {
    list.classList.remove("active")
  }

  if (yearlySelected) {
    if (list.children[0].classList.contains("arcade")) arcade = 90
    if (list.children[0].classList.contains("advanced")) advanced = 120
    if (list.children[0].classList.contains("pro")) pro = 150
  } else {
    if (list.children[0].classList.contains("arcade")) arcade = 9
    if (list.children[0].classList.contains("advanced")) advanced = 12
    if (list.children[0].classList.contains("pro")) pro = 15
  }
}

function check() {
  plansYearly.forEach(y => y.classList.toggle("active"))
  plansMonthly.forEach(m => m.classList.toggle("active"))
  checkCircle.classList.toggle("active")
  yearlyEl.classList.toggle("active")
  monthlyEl.classList.toggle("active")

  if (yearlyEl.classList.contains("active")) {
    yearlySelected = true
  } else {
    yearlySelected = false
  }

  if (yearlySelected) {
    arcade = 90
    advanced = 120
    pro = 150
  } else {
    arcade = 9
    advanced = 12
    pro = 15
  }
}

changeLinkBtn.addEventListener("click", () => {
  yearlySelected = !yearlySelected

  if (yearlySelected) {
    arcade = 90
    advanced = 120
    pro = 150

    onlineService = 10
    largerStorage = 20
    customizable = 20
  } else {
    arcade = 9
    advanced = 12
    pro = 15

    onlineService = 1
    largerStorage = 2
    customizable = 2
  }

  finishSummeryView()
})
nextStepBtn.addEventListener("click", next)
gobackBtn.addEventListener("click", back)
checkBtn.addEventListener("click", check)
listEl.forEach(li => li.addEventListener("click", () => select(li)))
onlineServiceInput.addEventListener("change", () => {
  if (!onlineServiceInput.checked) {
    onlineService = 0
    return
  }

  if (yearlySelected) {
    onlineService = 10
  } else {
    onlineService = 1
  }
})
largerStorageInput.addEventListener("change", () => {
  if (!largerStorageInput.checked) {
    largerStorage = 0
    return
  }

  if (yearlySelected) {
    largerStorage = 20
  } else {
    largerStorage = 2
  }
})
customizableInput.addEventListener("change", () => {
  if (!customizableInput.checked) {
    customizable = 0
    return
  }

  if (yearlySelected) {
    customizable = 20
  } else {
    customizable = 2
  }
})
