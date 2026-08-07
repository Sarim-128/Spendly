export const FormatCurrency = (amount: number): string => {
    const isNegative = amount < 0;
    const absAmount = Math.abs(amount);

    let formattedNumber = '';

    if (absAmount >= 1_000_000_000) {
        // Billions (e.g., 1.2B)
        formattedNumber = (absAmount / 1_000_000_000).toFixed(1).replace(/\.0$/, '') + 'B';
    } else if (absAmount >= 1_000_000) {
        // Millions (e.g., 1.5M or 10M)
        formattedNumber = (absAmount / 1_000_000).toFixed(1).replace(/\.0$/, '') + 'M';
    } else if (absAmount >= 1_000) {
        // Thousands (e.g., 10K, 250K)
        formattedNumber = (absAmount / 1_000).toFixed(1).replace(/\.0$/, '') + 'K';
    } else {
        // Under 1,000 (e.g., 550)
        formattedNumber = absAmount.toLocaleString('en-PK');
    }

    return `${isNegative ? '-' : ''}Rs. ${formattedNumber}`;
};