export function formatMoney(amount)
{
    if (amount === 0 || amount === null || amount === undefined) 
    {
        return "Not estimated";
    }
    return "Rs " + amount.toLocaleString("en-IN");
}