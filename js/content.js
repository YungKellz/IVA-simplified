// #region_start CLOCK
let intervalId
const addClock = () => {
  console.log('addClock')
  let overlay = document.querySelector('.easyIt-ext')
  if (!overlay) {
    overlay = document.createElement('div')
    overlay.setAttribute('class', 'easyIt-ext')
  }

  overlay.innerHTML = `
         <div class="easyIt-data"></div>
    `

  const style = document.createElement('style')
  style.textContent = `
       .easyIt-ext{
        position: fixed;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        display: flex;
        justify-content: center;
        align-items: flex-end;
        pointer-events: none;
        background: linear-gradient(0deg, rgba(0,0,0, 0.3) 0%, rgba(0,0,0,0) 100%);
        z-index: 1000;
       }

       .easyIt-data{
          font-size: 50px;
          pointer-events: none;
          color: #fff;
          padding: 50px;
       }
    `
  const body = document.querySelector('body')
  body.appendChild(overlay)
  body.appendChild(style)

  intervalId = setInterval(() => {
    const data = document.querySelector('.easyIt-data')
    if (data) {
      const d = new Date()
      const hours = `${d.getHours()}`
      const mins = `${d.getMinutes()}`
      const secs = `${d.getSeconds()}`

      data.textContent = `${hours.padStart(2, '0')}:${mins.padStart(2, '0')}:${secs.padStart(2, '0')}`
    }
  }, 1000)
}

const removeClock = () => {
  clearInterval(intervalId)
  const content = document.querySelector('.easyIt-ext')
  if (content) {
    content.parentNode.removeChild(content)
  }
}

chrome.storage.sync.get(['showClock'], (result) => {
  if (result.showClock) {
    addClock()
  }
});

chrome.storage.onChanged.addListener((changes, namespace) => {
  if (changes?.showClock) {
    if (changes.showClock.newValue) {
      addClock()
    } else {
      removeClock()
    }
  }
});
// #region_end CLOCK

// #region_start WIDE RIGHT PANEL
const style = document.createElement('style')
style.textContent = `
       app-conference-session [e2e-id="conference-tab__info"],
       app-conference-session [e2e-id="conference-tab__stats"],
       app-conference-session [e2e-id="toggle-browser-fullscreen"],
       app-conference-session [e2e-id="open-video-layout-popover"],
       app-conference-session [e2e-id="toggle-participants-list-btn"] {
          display: none;
       }
       
       app-presentation-info {
          padding: 0 0 0 10px !important;
          background: none !important;
          bottom: -51px !important;
          width: fit-content !important;
          z-index: 1;
       }
       app-presentation-info .presentation-owner {
          display: flex;
          flex-direction: column-reverse;
       },
       app-presentation-info .presentation-owner > small {
       }
       app-presentation-info .presentation-owner > .presentation-owner__name {
          padding: 2px 10px;
          border-radius: 11px;
          width: fit-content;
          background-color: #3a9da7;
          animation: livetranslationname 2s infinite ease-in-out;
       }
       app-presentation-info .presentation-owner > small {
          padding: 0 0 2px 4px !important;
       }
       
       .right-side-panel {
          min-width: 400px !important;
        }
       .right-side-panel .header-mather {
          display: flex !important;
          align-items: center;
       }
       .right-side-panel .toggle-section .upper-title {
          display: none;
       }
       .right-side-panel app-participants-list-common-header iva-icon-popover-action,
       .right-side-panel app-participants-list-common-header button {
          display: none;
       }
       .right-side-panel app-participants-list-common-header iva-accordion-menu-item iva-select {
          margin-left: 0 !important;
       }
       .right-side-panel .upper-title {
          line-height: 0 !important;
          align-self: auto !important;
          font-size: 16px !important;
          margin-top: 0 !important;
          margin-right: 8px !important;
          margin-left: 7px !important;
       }
       
       app-participant-list-participant .participant-container {
          position: relative;
          overflow: hidden;
          min-height: 45px;
          height: 45px;
       }
       app-participant-list-participant app-participant-icon {
          position: absolute;
          height: 100%;
          width: 100%;
          bottom: 0;
          left: 0;
       }
       app-participant-list-participant app-participant-icon .participant {
          height: 100%;
          width: 100%;
       }
       app-participant-list-participant app-participant-icon .participant-avatar {
          background-image: none !important;
          background-color: white;
       }
       app-participant-list-participant app-participant-icon .participant-avatar,
       app-participant-list-participant app-default-avatar {
          position: absolute;
          top: 50%;
          transform: translate(-75%, -50%);
          color: transparent;
          border-radius: 4px;
          opacity: 0.9;
       }
       app-participant-list-participant app-participant-icon:has(~ div app-participant-translation-control svg-icon.active) .participant-icon-border-container {
          opacity: 0.5;
       }
       app-participant-list-participant app-participant-icon .participant-icon-border-container {
          border: none;
          opacity: 0;
          padding: 0;
          width: 200% !important;
          height: 1000px !important;
          left: unset;
          right: 0;
          top: 50%;
          transition: all 0.3s;
          transform: translate(75px, -50%);
          box-shadow: inset 0 0 50px 5px rgb(9 212 182 / 0%);
          animation: iconbounce 8s infinite ease-in-out;
       }
       app-participant-list-participant app-participant-icon.active + .title {
          opacity: 1;
       }
       app-participant-list-participant .title {
          transition: all 0.3s;
          opacity: 0.6;
       }
       app-participant-list-participant app-participant-icon.active .participant-icon-border-container {
          box-shadow: inset 0 0 200px 80px rgb(9 212 182 / 36%);
          height: 400px !important;
          transform: translate(10px, -50%);
          opacity: 1;
       }
       app-participant-list-participant .role-badge,
       app-participant-list-participant app-participant-translation-control svg-icon:not(:first-child),
       app-participant-list-participant .participant-container iva-icon-popover-action {
          display: none;
       }
       @keyframes iconbounce {
          from {
            box-shadow: inset 0 0 200px 90px rgb(9 212 182 / 46%);
            animation-timing-function: ease-in-out;
          }
          20% {
            box-shadow: inset 10px 0 190px 130px rgb(8 210 212 / 53%);
            animation-timing-function: ease-in-out;
          }
          30% {
            box-shadow: inset 0 0 200px 90px rgb(9 212 182 / 47%);
            animation-timing-function: ease-in-out;
          }
          70% {
            box-shadow: inset 10px 0 185px 130px rgb(9 212 182 / 53%);
            animation-timing-function: ease-in-out;
          }
          to {
            box-shadow: inset 0 0 200px 90px rgb(9 212 182 / 46%);
            animation-timing-function: ease-in-out;
          }
       }
       @keyframes livetranslationname {
          from {
            background: #3a9da7;
          }
          50% {
            background: #61abb2;
          }
          to {
            background: #3a9da7;
          }
       }
    `
const body = document.querySelector('body')
body.appendChild(style)
// #region_end WIDE RIGHT PANEL

function createSoundHtml(){
  chrome.offscreen.createDocument({
    url: chrome.runtime.getURL('audio.html'),
    reasons: ['AUDIO_PLAYBACK'],
    justification: 'notification',
  });
}

setTimeout(() => {
  console.log('createSoundHtml');
  createSoundHtml();
}, 5000)

// #region_start PARTICIPANTS COUNT (сделать счетчик участников более ярким)
setInterval(() => {
  console.log('shit');

  const listHeader = document.querySelector('app-participants-list-common-header');
  if (listHeader) {
    console.log('listHeader');
    const upperTitleInWrongPosition = listHeader.querySelector('.toggle-section').querySelector('.upper-title');
    if (upperTitleInWrongPosition) {
      document.querySelector('app-participants-list-common-header').querySelector('.header-mather').appendChild(upperTitleInWrongPosition);
    }

  } else {
    const participantsBtn = document.querySelector('[e2e-id="toggle-participants-list-btn"]');
    if (participantsBtn) {
      console.log('participantsBtn')
      participantsBtn.click();
    }
  }
}, 200);

// style.textContent = `
//        .display-none {
//           display: none !important;
//         }
//     `
// // const body = document.querySelector('body')
// body.appendChild(style)
// #region_end PARTICIPANTS COUNT

