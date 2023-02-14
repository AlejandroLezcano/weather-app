const defaultConfig = {
    open: true,
    debug: true,
    animatable: true,
}
export default function draggble($element, config = defaultConfig){
if(!($element instanceof HTMLElement)){
    return console.warn(`Elemento invalido se esperaba un HTML y no llego`)
}

let isOpen = config.open
let isDragging = false

const elementRect = $element.getBoundingClientRect()
const ELEMENT_BLOCK_SIZE = elementRect.height

const $marker = $element.querySelector('[data-marker]')
const MARKER_BLOCK_SIZE = $marker.getBoundingClientRect().height

const VISIBLE_Y_POSITION = 0
const HIDDEN_Y_POSITION = ELEMENT_BLOCK_SIZE - MARKER_BLOCK_SIZE
let widgetPosition = VISIBLE_Y_POSITION

isOpen ? open() : close()

let startY = 0

$marker.addEventListener('click', handleClick)
$marker.addEventListener('pointerdown', handlePointerDown) // oprime el dedo
$marker.addEventListener('pointerup', handlePointerUp) // levanta el dedo
$marker.addEventListener('pointerout', handlePointerOut) // sale de la pantalla el dedo
$marker.addEventListener('pointercancel', handlePointerCancel) // se cancela el evento por ir a otra apli
$marker.addEventListener('pointermove', handlePointerMove) // arrastra y mueve para abrir y cerrar

if(config.animatable){
    setAnimations()
}

function setAnimations(){
    $element.style.transition = 'margin-bottom .3s'
}

function bounce(){
    if(widgetPosition < ELEMENT_BLOCK_SIZE / 2){
        return open()
    }
    return close()
}

function handlePointerUp(){
    logger('Pointer Up')
    dragEnd()
}

function handlePointerOut(){
    logger('Pointer Out')
    dragEnd()
}

function handlePointerCancel(){
    logger('Pointer Cancel')
    dragEnd()
}

function handlePointerDown(event){
    logger('Pointer Down')
    startDrag(event)
}

function handlePointerMove(event){
    logger('Pointer Move')
    drag(event)
}

function pageY(event){
    return event.pageY || event.touches[0].pageY
}

function startDrag(event){
    isDragging = true
    startY = pageY(event)
}

function handleClick(event){
    logger('CLICK')
    toggle()
}

function dragEnd(){
    isDragging = false
    bounce()
}

function toggle(){
    if(!isDragging){
        if (!isOpen){
            return open()
        }
        return close()
    }
    
}

function logger(message){
    if(config.debug){
        console.info(message)
    }
}

function open(){
    logger('Abrir Widget')
    isOpen = true
    widgetPosition = VISIBLE_Y_POSITION
    setWidgetPosition(widgetPosition)
}

function close(){
    logger('Cerrar Widget')
    isOpen = false
    widgetPosition = HIDDEN_Y_POSITION
    setWidgetPosition(widgetPosition)
}

function setWidgetPosition(value){
    $element.style.marginBottom = `-${value}px`
}

function drag(event){
    const cursorY = pageY(event)
    const movementY = cursorY - startY
    widgetPosition = widgetPosition + movementY
    startY = cursorY
    if(widgetPosition > HIDDEN_Y_POSITION){
        return false
    }
    setWidgetPosition(widgetPosition)
}

}