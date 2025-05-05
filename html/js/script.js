let currentMenu = "main"
let currentSubmenuId = null
let radialMenu, menuItems, submenuContainer

document.addEventListener("DOMContentLoaded", () => {
  radialMenu = document.getElementById("radial-menu")
  menuItems = document.querySelector(".menu-items")
  submenuContainer = document.querySelector(".submenu-container")
})

function getResourceName() {
  return "rs_radialmenu"
}

window.addEventListener("message", (event) => {
  const data = event.data

  if (data.type === "open") {
    openMenu(data.menu)
  } else if (data.type === "close") {
    closeMenu()
  }
})

function openMenu(menu) {
  if (!radialMenu) {
    radialMenu = document.getElementById("radial-menu")
    menuItems = document.querySelector(".menu-items")
    submenuContainer = document.querySelector(".submenu-container")
  }

  radialMenu.classList.remove("hidden")
  radialMenu.classList.add("scale-in")

  currentMenu = "main"
  currentSubmenuId = null
  submenuContainer.classList.add("hidden")

  menuItems.style.display = "block"

  renderMainMenu(menu)

  fetch(`https://${getResourceName()}/enableMouse`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({}),
  }).catch((error) => console.error("Error enabling mouse:", error))
}

function closeMenu() {
  if (!radialMenu) return

  radialMenu.classList.add("scale-out")

  setTimeout(() => {
    radialMenu.classList.add("hidden")
    radialMenu.classList.remove("scale-out")

    currentMenu = "main"
    currentSubmenuId = null
    submenuContainer.classList.add("hidden")
    menuItems.style.display = "block"
  }, 200)

  fetch(`https://${getResourceName()}/disableMouse`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({}),
  }).catch((error) => console.error("Error disabling mouse:", error))
}

function renderMainMenu(menu) {
  menuItems.innerHTML = ""

  const items = menu
  const itemCount = items.length
  const radius = 150

  items.forEach((item, index) => {
    const angle = (index / itemCount) * 2 * Math.PI
    const x = radius * Math.cos(angle)
    const y = radius * Math.sin(angle)

    const menuItem = document.createElement("div")
    menuItem.className = "menu-item"
    menuItem.style.transform = `translate(${x}px, ${y}px)`

    const iconElement = document.createElement("i")
    iconElement.className = item.icon
    if (item.iconClass) {
      iconElement.className += ` ${item.iconClass}`
    }
    if (item.iconAnimation) {
      iconElement.className += ` ${item.iconAnimation}`
    }

    const tooltipElement = document.createElement("div")
    tooltipElement.className = "menu-item-tooltip"
    tooltipElement.textContent = item.label

    if (angle > Math.PI / 4 && angle < (Math.PI * 3) / 4) {
      tooltipElement.style.bottom = "55px"
      tooltipElement.style.left = "50%"
      tooltipElement.style.transform = "translateX(-50%)"
    } else if (angle >= (Math.PI * 3) / 4 && angle < (Math.PI * 5) / 4) {
      tooltipElement.style.right = "55px"
      tooltipElement.style.top = "50%"
      tooltipElement.style.transform = "translateY(-50%)"
    } else if (angle >= (Math.PI * 5) / 4 && angle < (Math.PI * 7) / 4) {
      tooltipElement.style.top = "55px"
      tooltipElement.style.left = "50%"
      tooltipElement.style.transform = "translateX(-50%)"
    } else {
      tooltipElement.style.left = "55px"
      tooltipElement.style.top = "50%"
      tooltipElement.style.transform = "translateY(-50%)"
    }

    menuItem.appendChild(iconElement)
    menuItem.appendChild(tooltipElement)

    menuItem.addEventListener("click", () => {
      handleItemClick(item, menu)
    })

    menuItems.appendChild(menuItem)
  })
}

function renderSubmenu(submenuId, menu) {
  const parentItem = menu.find((item) => item.id === submenuId)
  if (!parentItem || !parentItem.submenu) return

  menuItems.style.display = "none"

  submenuContainer.innerHTML = ""

  const submenuItems = document.createElement("div")
  submenuItems.className = "submenu-items"

  const items = parentItem.submenu
  const itemCount = items.length
  const radius = 150

  items.forEach((item, index) => {
    const angle = (index / itemCount) * 2 * Math.PI
    const x = radius * Math.cos(angle)
    const y = radius * Math.sin(angle)

    const menuItem = document.createElement("div")
    menuItem.className = "menu-item"
    menuItem.style.transform = `translate(${x}px, ${y}px)`

    const iconElement = document.createElement("i")
    iconElement.className = item.icon
    if (item.iconClass) {
      iconElement.className += ` ${item.iconClass}`
    }
    if (item.iconAnimation) {
      iconElement.className += ` ${item.iconAnimation}`
    }

    const tooltipElement = document.createElement("div")
    tooltipElement.className = "menu-item-tooltip"
    tooltipElement.textContent = item.label

    if (angle > Math.PI / 4 && angle < (Math.PI * 3) / 4) {
      tooltipElement.style.bottom = "55px"
      tooltipElement.style.left = "50%"
      tooltipElement.style.transform = "translateX(-50%)"
    } else if (angle >= (Math.PI * 3) / 4 && angle < (Math.PI * 5) / 4) {
      tooltipElement.style.right = "55px"
      tooltipElement.style.top = "50%"
      tooltipElement.style.transform = "translateY(-50%)"
    } else if (angle >= (Math.PI * 5) / 4 && angle < (Math.PI * 7) / 4) {
      tooltipElement.style.top = "55px"
      tooltipElement.style.left = "50%"
      tooltipElement.style.transform = "translateX(-50%)"
    } else {
      tooltipElement.style.left = "55px"
      tooltipElement.style.top = "50%"
      tooltipElement.style.transform = "translateY(-50%)"
    }

    menuItem.appendChild(iconElement)
    menuItem.appendChild(tooltipElement)

    menuItem.addEventListener("click", () => {
      handleItemClick(item, menu)
    })

    submenuItems.appendChild(menuItem)
  })

  submenuContainer.appendChild(submenuItems)

  const title = document.createElement("div")
  title.className = "submenu-title"
  title.textContent = parentItem.label
  submenuContainer.appendChild(title)

  const backButton = document.createElement("div")
  backButton.className = "submenu-back"

  const backIcon = document.createElement("i")
  backIcon.className = "fa-solid fa-arrow-left"

  backButton.appendChild(backIcon)

  backButton.onclick = () => {
    goBackToMainMenu()
  }

  submenuContainer.appendChild(backButton)

  submenuContainer.classList.remove("hidden")
  submenuContainer.classList.add("fade-in")
}

function goBackToMainMenu() {
  submenuContainer.classList.add("fade-out")

  setTimeout(() => {
    submenuContainer.classList.add("hidden")
    submenuContainer.classList.remove("fade-out")
    currentMenu = "main"
    currentSubmenuId = null
    menuItems.style.display = "block"
  }, 200)
}

function handleItemClick(item, menu) {
  if (item.type === "submenu") {
    currentMenu = "submenu"
    currentSubmenuId = item.id
    renderSubmenu(item.id, menu)
  } else if (item.type === "event") {
    triggerEvent(item.event, item.data || {})
    closeMenu()
  } else if (item.type === "command") {
    executeCommand(item.command)
    closeMenu()
  }
}

function triggerEvent(eventName, data = {}) {
  fetch(`https://${getResourceName()}/triggerEvent`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      event: eventName,
      data: data,
    }),
  }).catch((error) => console.error("Error triggering event:", error))
}

function executeCommand(command) {
  fetch(`https://${getResourceName()}/executeCommand`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      command: command,
    }),
  }).catch((error) => console.error("Error executing command:", error))
}

document.addEventListener("keyup", (event) => {
  if (event.key === "Escape") {
    if (currentMenu === "submenu") {
      goBackToMainMenu()
    } else {
      closeMenu()
    }
  }
})

document.addEventListener("contextmenu", (event) => {
  event.preventDefault()
})
