export default (): void => {
  if (document.querySelector('.js-debug')) {
    const debugButton = document.querySelector('.js-debug')
    debugButton?.addEventListener('click', () => {
      if (debugButton.className.includes('c-button--primary')) {
        debugButton.classList.remove('c-button--primary')
        debugButton.classList.add('c-button--danger')
        document.body.classList.add('debug:baseline')
      } else {
        debugButton.classList.add('c-button--primary')
        debugButton.classList.remove('c-button--danger')
        document.body.classList.remove('debug:baseline')
      }
    })
  }
}
