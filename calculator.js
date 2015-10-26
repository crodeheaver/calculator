/*global math*/

var specialButtons = {
    backspace: "<-",
    clear: "Clear"
}

var buttonList = ["^", specialButtons.clear, specialButtons.backspace,"%", "7", "8", "9","/", "4", "5", "6", "-", "1", "2", "3", "*", ".", "0", "=", "+"];

function create(tagName, props, eventprops, event) {
    var element = document.createElement(tagName);
    for (var prop in props)
        element[prop] = props[prop];

    if (event != null)
        element.addEventListener(eventprops.type, event, eventprops.capture);

    return element;
}

var calculator = create('div', {
    id: 'calc',
    className: 'calculator'
});

document.getElementsByTagName('body')[0].appendChild(calculator);

calculator.appendChild(create('div', {
    id: 'display'
}));

buttonList.forEach(function(button) {
    var value = button.valueOf();
    calculator.appendChild(create('button', {
        id: "button" + String.charCodeAt(value),
        className: 'button',
        textContent: value
    }, {
        type: 'click',
        capture: false
    }, function() {
        var display = document.querySelector("#display");
        if (value === specialButtons.clear)
            display.textContent = "";
        else if (value === "=")
            display.textContent = math.eval(display.textContent);
        else if (value === specialButtons.backspace)
            display.textContent = display.textContent.slice(0, display.textContent.length - 1);
        else
            display.textContent += value;
    }));
});

document.onkeypress = function(key) {
    var elem;
    if (key.keyCode === 13)
        elem = document.querySelector("#button61");
    else if (key.keyCode === 8)
        elem = document.querySelector("#button60");
    else
        elem = document.querySelector("#button" + key.charCode);

    if (elem != null)
        elem.click();
};
