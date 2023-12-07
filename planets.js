let windowId
let planet

const addWindow = () => {
    const numWindows = localStorage.getItem('numWindows')
    localStorage.setItem('numWindows', Number(numWindows) + 1)
}

const removeWindow = () => {
        const numWindows = localStorage.getItem('numWindows')
        if (numWindows > 0) {
            localStorage.setItem('numWindows', numWindows - 1)
        }
    
        localStorage.setItem('unmountedId', windowId)
        localStorage.removeItem(`window${windowId}Location`)
}

const getWindowId = () => {
    if (performance.navigation.type === 1) {
        windowId = localStorage.getItem('unmountedId')
    } else {
        windowId = localStorage.getItem('numWindows')
    }
    localStorage.removeItem('unmountedId')
}

const paintPlanet = () => {
    // const planet = document.querySelector('.planet')
    planet.style.background = 'radial-gradient(circle at 65% 15%, white 1px, aqua 3%, darkblue 60%, aqua 100%)'
}

const setLocation = () => {
    setInterval(() => {
        localStorage.setItem(
            `window${windowId}Location`, 
            JSON.stringify({ left: window.screenLeft + window.innerWidth / 2, top: window.screenTop + window.innerHeight / 2 }))
    }, 1)
    
}

const findOtherPlanets = () => {
    let thisPlanet
    let otherPlanet

    setInterval(() => {
        const numWindows = localStorage.getItem('numWindows')
        for (let i = 1; i <= numWindows; i++) {
            if (i === Number(windowId)) {
                thisPlanet = JSON.parse(localStorage.getItem(`window${i}Location`))
            } else {
                otherPlanet = JSON.parse(localStorage.getItem(`window${i}Location`))
            }
        }

        if (thisPlanet && otherPlanet) {
            const angle = Math.atan2(otherPlanet.top - thisPlanet.top, otherPlanet.left - thisPlanet.left) * 180 / Math.PI
            console.log(angle)
            planet.style.transform = `rotate(${angle + 90}deg)`
        }
    }, 1);
    

    
}

const init = () => {
    planet = document.querySelector('.planet')
    addWindow()
    getWindowId()
    paintPlanet()
    setLocation()
    findOtherPlanets()
}

window.onload = init
window.onbeforeunload = removeWindow
