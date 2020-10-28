export default (): void => {
  Array.prototype.forEach.call(
    document.querySelectorAll('[class*="js-debug-"]'),
    (el: HTMLElement) => {
      const className = Array.prototype.find.call(el.classList, (c) =>
        c.includes('js-debug'),
      )
      const utility = className.split('-')[className.split('-').length - 1]

      el.addEventListener('click', () => {
        if (!document.body.className.includes(`debug:${utility}`)) {
          document.body.classList.add(`debug:${utility}`)
          return
        }
        document.body.classList.remove(`debug:${utility}`)
      })
    },
  )
}
