export default function Toast(msg, duration){
    duration=isNaN(duration) ? 3000 : duration;
    let timer = null
    let animationTimer = null
    const d = 0.5;
    const toastNode = document.createElement('div');
    const toastDom = document.createElement('div')
    toastDom.innerHTML = msg;
    toastNode.style.cssText = `
        width: 100%;
        height: 100%;
        position: fixed;
        left: 0;
        top: 0;
        bottom: 0;
        right: 0;
        z-index: 999999;
        background:none;
    `
    toastDom.style.cssText=`
        max-width:60%;
        min-width: 150px;
        padding:5px 14px;
        min-height: 30px;
        color: rgb(255, 255, 255);
        text-align: center;
        border-radius: 6px;
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        z-index: 999999;
        background: rgba(0, 0, 0,.6);
        font-size: 16px;`;
    
    toastNode.appendChild(toastDom)
    document.body.appendChild(toastNode);
  
    timer = setTimeout(() => {
        toastNode.style.webkitTransition = '-webkit-transform ' + d + 's ease-in, opacity ' + d + 's ease-in';
        toastNode.style.opacity = '0';
        animationTimer = setTimeout(() => { document.body.removeChild(toastNode);clearTimeout(animationTimer) }, d * 1000);
        clearTimeout(timer)
    }, duration);
}
