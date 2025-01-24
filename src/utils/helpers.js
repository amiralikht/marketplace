const changeCurrency = (amount) => {
    const formattedAmount =  amount.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
    return formattedAmount;
}

export {changeCurrency}