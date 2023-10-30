export default function todaysDateOnlyAsString()
{
    const today = new Date();
    return today.toISOString().split('T')[0];
}