export const setDomFontSize = () => {
    const width = document.documentElement.clientWidth || document.body.clientWidth
    const fontSize: any = (width <= 1200 ? 1200 : width) / 100 +'px'
    console.log("document===>", document.getElementsByTagName('html')[0])
    // .style["font-size"] = fontSize 
}
 
//防抖
// import debounce from 'loadsh/debounce'
// const setDomFontSizeDebounce = debounce(setDomFontSize, 500)
window.addEventListener('resize',setDomFontSize)