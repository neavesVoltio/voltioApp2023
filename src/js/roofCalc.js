let commissions = document.getElementById('roofCommissions');
let roofPriceWAdders = document.getElementById('roofPriceWAdders');
let roofPrice = document.getElementById('roofPrice');
let roofQuote // B2
let squares = document.getElementById('roofSquares');
let months = document.getElementById('roofMonths');
let cashback = document.getElementById('roofCashback');

let totalAdders = document.getElementById('roofTotalAdders');
let roofAdders = document.getElementById('roofAdders');

let financing = document.getElementById('roofFinancing');

let monthlyPayment
let monthlyPaymentWAdders

let voltioPps

let dealerFee
let redline
let dealerFeeNoAdders
let dealerFeeWAdders

let epcPps
let addersPps
let dealerFeePps
let totalPps
let monthsAmount
let inputNumber



let financialArray = [
    ['(CA) Goodleap 5yr. 6.99%', 60, 6.99, 0.02019, 0.1125, 294.9759, 341.523450432277],
    ['(CA) Goodleap 5yr. 7.99%', 60, 7.99, 0.02069, 0.0925, 302.2809, 349.981188184438],
    ['(CA) Goodleap 5yr. 8.99%', 60, 8.99, 0.02119, 0.0775, 309.5859, 358.438925936599],
    ['(CA) Goodleap 5yr. 9.99%', 60, 9.99, 0.0217, 0.0575, 317.037, 367.065818443804],
    ['(CA) Goodleap 5yr. 10.99%', 60, 10.99, 0.02221, 0.0325, 324.4881, 375.692710951009],
    ['(CA) Goodleap 5yr. 11.99%', 60, 11.99, 0.02274, 0, 332.2314, 384.6579129683],
    ['(CA) Goodleap 7yr. 6.99%', 84, 6.99, 0.01532, 0.1275, 223.8252, 259.145084726225],
    ['(CA) Goodleap 7yr. 7.99%', 84, 7.99, 0.01583, 0.1075, 231.2763, 267.771977233429],
    ['(CA) Goodleap 7yr. 8.99%', 84, 8.99, 0.01634, 0.0825, 238.7274, 276.398869740634],
    ['(CA) Goodleap 7yr. 9.99%', 84, 9.99, 0.01687, 0.06, 246.4707, 285.364071757925],
    ['(CA) Goodleap 7yr. 10.99%', 84, 10.99, 0.01741, 0.0325, 254.3601, 294.498428530259],
    ['(CA) Goodleap 7yr. 11.99%', 84, 11.99, 0.01796, 0, 262.3956, 303.801940057637],
    ['(CA) Goodleap 10yr. 6.99%', 120, 6.99, 0.01174, 0.1475, 171.5214, 198.587682420749],
    ['(CA) Goodleap 10yr. 7.99%', 120, 7.99, 0.01227, 0.12, 179.2647, 207.55288443804],
    ['(CA) Goodleap 10yr. 8.99%', 120, 8.99, 0.01282, 0.09, 187.3002, 216.856395965418],
    ['(CA) Goodleap 10yr. 9.99%', 120, 9.99, 0.01338, 0.0625, 195.4818, 226.329062247839],
    ['(CA) Goodleap 10yr. 10.99%', 120, 10.99, 0.01396, 0.0325, 203.9556, 236.140038040346],
    ['(CA) Goodleap 10yr. 11.99%', 120, 11.99, 0.01455, 0, 212.5755, 246.120168587896],
    ['(CA) Goodleap 12yr. 6.99%', 144, 6.99, 0.01038, 0.1525, 151.6518, 175.58263573487],
    ['(CA) Goodleap 12yr. 7.99%', 144, 7.99, 0.01094, 0.1225, 159.8334, 185.055302017291],
    ['(CA) Goodleap 12yr. 8.99%', 144, 8.99, 0.0115, 0.0925, 168.015, 194.527968299712],
    ['(CA) Goodleap 12yr. 9.99%', 144, 9.99, 0.01209, 0.0625, 176.6349, 204.508098847262],
    ['(CA) Goodleap 12yr. 10.99%', 144, 10.99, 0.01269, 0.0325, 185.4009, 214.657384149856],
    ['(CA) Goodleap 12yr. 11.99%', 144, 11.99, 0.0133, 0, 194.313, 224.975824207493],
    ['(CA) Goodleap 15yr. 6.99%', 180, 6.99, 0.00906, 0.1625, 132.3666, 153.254208069164],
    ['(CA) Goodleap 15yr. 7.99%', 180, 7.99, 0.00964, 0.1275, 140.8404, 163.065183861671],
    ['(CA) Goodleap 15yr. 8.99%', 180, 8.99, 0.01024, 0.0975, 149.6064, 173.214469164265],
    ['(CA) Goodleap 15yr. 9.99%', 180, 9.99, 0.01085, 0.0675, 158.5185, 183.532909221902],
    ['(CA) Goodleap 15yr. 10.99%', 180, 10.99, 0.01149, 0.0325, 167.8689, 194.358813544669],
    ['(CA) Goodleap 15yr. 11.99%', 180, 11.99, 0.01214, 0, 177.3654, 205.353872622478],
    ['(CA) SVC FIN 60 PYMT', 60, 0, 0.0166665625, 0.1475, 243.498478125, 281.922829710014],
    ['(CA) SVC 12Yr. 2.99%', 144, 2.99, 0.008273, 0.22, 120.86853, 139.941728847262],
    ['(NV) Profund', 0, 0, 0, 0.02, 0, 0],
    ['(NV) Goodleap 5yr. 6.99%', 60, 6.99, 0.02019, 0.1175, 294.9759, 341.523450432277],
    ['(NV) Goodleap 5yr. 11.99%', 60, 11.99, 0.02274, 0, 332.2314, 384.6579129683],
    ['(NV) Goodleap 7yr. 6.99%', 84, 6.99, 0.01532, 0.1325, 223.8252, 259.145084726225],
    ['(NV) Goodleap 7yr. 11.99%', 84, 11.99, 0.01796, 0, 262.3956, 303.801940057637],
    ['(NV) Goodleap 10yr. 6.99%', 120, 6.99, 0.01174, 0.1525, 171.5214, 198.587682420749],
    ['(NV) Goodleap 10yr. 11.99%', 120, 11.99, 0.01455, 0, 212.5755, 246.120168587896],
    ['(NV) Goodleap 12yr. 6.99%', 144, 6.99, 0.01038, 0.1575, 151.6518, 175.58263573487],
    ['(NV) Goodleap 12yr. 11.99%', 144, 11.99, 0.0133, 0, 194.313, 224.975824207493],
    ['(NV) Goodleap 15yr. 6.99%', 180, 6.99, 0.00906, 0.1675, 132.3666, 153.254208069164],
    ['(NV) Goodleap 15yr. 11.99%', 180, 11.99, 0.01214, 0, 177.3654, 205.353872622478],
    ['CASH', 0, 0, 0, 0, 0, 0],
    
]

let areaArray = [
    ['San Jose', 6, 0, 0],
    ['Valley', 4.5, 4, 953.05],
    ['Las Vegas', 4.8, 6, 1492.57],
]

commissions.value = '$0.00'

function findFinancialDataByDescription(description) {
    for (const item of financialArray) {
        if (item[0] === description) {
            return item;
        }
    }
    return null;
}

function findFinancialDataByArea(description) {
    for (const item of areaArray) {
        if (item[0] === description) {
            return item;
        }
    }
    return null;
}

financing.addEventListener('change', function (e) {
    
    console.log(e.target.value);
    let financingValue = e.target.value
    let areaValue = document.getElementById('roofDesignArea').value;
    const financialData = findFinancialDataByDescription(financingValue);
    const areaData = findFinancialDataByArea(areaValue)
    
    if (financialData) {
        console.log('Financial data found:');
        console.log(financialData);
        let totalAddersValue = document.getElementById('roofTotalAdders').value
        monthlyPayment = financialData[5]
        monthlyPaymentWAdders = financialData[6]
        dealerFee = financialData[4]
        redline = areaData[1]
        let redlinePrice = (squares.value * redline) * 100
        monthsAmount = months.value * monthlyPayment
        epcPps = redlinePrice / squares.value
        totalAddersValue = parseFloat(cashback.value) + parseFloat(roofAdders.value) + parseFloat(monthsAmount)
        addersPps = totalAddersValue / squares.value
        roofPriceWAdders.value = (parseFloat(totalAddersValue/(1 - dealerFee)) + parseFloat(roofPrice.value)) // roofQuoteWAdders en excel
        console.log(roofPriceWAdders.value);
        totalAdders = totalAddersValue
        dealerFeeWAdders = dealerFee * roofPriceWAdders.value
        dealerFeePps = dealerFeeWAdders / squares.value
        totalPps = roofPriceWAdders.value / squares.value
        voltioPps = totalPps - epcPps - addersPps - dealerFeePps
        dealerFeeNoAdders 
        let expectedCms = squares.value * voltioPps
        let repCms = (expectedCms - 1000) * 0.5
        let voltioCms = (expectedCms * 0.5) + 500
        commissions.value = repCms.toFixed(2).toLocaleString('en-US', {
            style: 'currency',
            currency: 'USD'
        });
        console.log(
            'monthlyPayment ' + monthlyPayment, 
            'months.value ' + months.value,
            'totalAdders.value ' + totalAddersValue,
            'monthlyPaymentWAdders ' + monthlyPaymentWAdders, 
            'redline ' + redline,
            'dealerFee ' + dealerFee,
            'redlinePrice ' + redlinePrice, 
            'monthsAmount ' + monthsAmount, 
            'epcPps ' + epcPps,
            'addersPps ' + addersPps,
            'dealerFeeWAdders ' + dealerFeeWAdders,
            'dealerFeePps ' + dealerFeePps,
            'totalPps ' + totalPps,
            'voltioPps ' + voltioPps,
            'expectedCms ' + expectedCms,
            'repCms ' + repCms,
            'voltioCms ' + voltioCms,
            'inputNumber ' + inputNumber
            );
        } else {
            console.log('Financial data not found.');
    }
});


// Obtén el elemento del campo de entrada
const roofQuoteNumberInput = document.getElementById('roofQuoteNumber');

let targetElement = document.querySelectorAll('.currency-x');

targetElement.forEach(function(e) {
    e.addEventListener('blur', function (item) {
    inputNumber = item.target.value
    
    let formattedNumber = isNaN(inputNumber) ? inputNumber : Number(inputNumber).toLocaleString('en-US', {
        style: 'currency',
        currency: 'USD'
    });
    
    let itemId = document.getElementById(item.target.id).value
    document.getElementById(item.target.id).value = formattedNumber
    
    });
    
});


// Función para formatear el número como moneda
function formatAsCurrency(number) {
    // Utiliza el método toLocaleString para formatear el número en formato de moneda
    return Number(number).toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD'
    });
}