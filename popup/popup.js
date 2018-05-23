// Copyright zodiac403@gmx.de
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.


function handleInputEvent(event) {
    try {
        let value = document.getElementById("input").value;
        let inputDefinition = getInputDefinition(value);

        result = convert(inputDefinition.epoch);

        document.getElementById('result').className = "";
        document.getElementById('error').className = "hidden";
        document.getElementById('input-unit').innerHTML = inputDefinition.unit;
        document.getElementById('result-iso').innerHTML = result;
        document.getElementById('result-epoch').innerHTML = inputDefinition.epoch;
    } catch (error) {
        document.getElementById('result').className = "hidden";
        document.getElementById('error').className = "";
        document.getElementById('error-text').innerHTML = error;
    }
}

function getInputDefinition(value) {
    function createInputDefinition(milliseconds, unit, precision) {
        return {
            epoch: milliseconds,
            unit: unit,
            precision: precision
        };
    }

    let input = {};

    if (value.length === 19 && value.match(/[0-9]{19}/)) {
        input = createInputDefinition(Number(value) / 1000000, 'ns', 'epoch');
    } else if (value.length === 13 && value.match(/[0-9]{13}/)) {
        input = createInputDefinition(Number(value), 'ms', 'epoch');
    } else if (value.length === 10 && value.match(/[0-9]{10}/)) {
        input = createInputDefinition(Number(value) * 1000, 's', 'epoch');
    } else {
        throw Error('Unknown format: number with ' + value.length + ' digits.');
    }

    return input;
}

function convert(value) {
    let result;

    let date = new Date(Number(value));

    if (!date.getTime()) {
        throw Error('Cannot parse to Date.');        
    }

    result = date.toISOString();        
    return result;
}

document.addEventListener('input', handleInputEvent)
document.getElementById('input').focus();
