const itemsHTMLCollection = document.getElementsByClassName('parallax-item');
const itemsArray = Array.from(itemsHTMLCollection);

const input = {
    mouseX: {
        start: 0,
        end: window.innerWidth,
        current: 0
    },
    mouseY: {
        start: 0,
        end: window.innerHeight,
        current: 0
    }
};

input.mouseX.range = input.mouseX.end - input.mouseX.start;
input.mouseY.range = input.mouseY.end - input.mouseY.start;

const output = {
    x: {
      start: -250,
      end: 250,
      current: 0
    },
    y: {
        start: -250,
        end: 250,
        current: 0
    },
    zIndex: {
        range: 10000
    },
    scale: {
        start: 1,
        end: 0.2
    },
    blur: {
        startingDepth: .1,
        range: 40
    }
}

output.x.range = output.x.end - output.x.start;
output.y.range = output.y.end - output.y.start;
output.scale.range = output.scale.end - output.scale.start;

const mouse = {
    x: 0,
    y: 0
}

const updateInputs = function () {
    //Mouse x fraction
    input.mouseX.current = mouse.x;
    input.mouseX.fraction = (input.mouseX.current - input.mouseX.start) / input.mouseX.range;

    //Mouse y fraction
    input.mouseY.current = mouse.y;
    input.mouseY.fraction = (input.mouseY.current - input.mouseY.start) / input.mouseX.range;
}

const updateOutputs = function () {
    //output x
    output.x.current = output.x.start + (output.x.range * input.mouseX.fraction);

    //output y
    output.y.current = output.y.start + (output.y.range * input.mouseY.fraction);
}


const updateEachItem = function () {
    itemsArray.forEach(function (item, k) {
        let depth = parseFloat(item.dataset.depth);
        const itemOutput = {
            x: output.x.current - output.x.current * depth,
            y: output.y.current - output.y.current * depth,
            zIndex: output.zIndex.range - output.zIndex.range * depth,
            scale: output.scale.start + (output.scale.range * depth),
            blur: (depth - output.blur.startingDepth) * output.blur.range
        }

        item.style.filter = 'blur(' + itemOutput.blur + ')';
        item.style.zIndex = itemOutput.zIndex.toString();
        item.style.transform = 'scale(' + itemOutput.scale+ ') translate(' + itemOutput.x + 'px, ' + itemOutput.y + 'px)';
    })
}

const handleMouseMovement = function (event) {
    mouse.x = event.clientX;
    mouse.y = event.clientY;

    updateInputs();
    updateOutputs();
    updateEachItem();


}

window.addEventListener('mousemove', handleMouseMovement);

function handleResize() {
    input.mouseX.end = window.innerWidth;
    input.mouseX.range = input.mouseX.end - input.mouseX.start;

    input.mouseY.end = window.innerHeight;
    input.mouseY.range = input.mouseY.end - input.mouseY.start;
}

window.addEventListener('resize', handleResize);