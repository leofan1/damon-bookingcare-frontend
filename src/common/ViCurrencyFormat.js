const ViCurrencyFormat = (inputData, sperate = '.') => {
    let valueVND = '';
    let j = 1;

    if (inputData && inputData.length > 0) {
        for (let i = inputData.length; i >= 1; i--) {
            if (j % 3 === 0 && i !== 1) {
                valueVND = sperate + inputData[i - 1] + valueVND;
            } else {
                valueVND = inputData[i - 1] + valueVND;
            }
            j = j + 1;
        }
    }
    return valueVND;
};

export default ViCurrencyFormat;
