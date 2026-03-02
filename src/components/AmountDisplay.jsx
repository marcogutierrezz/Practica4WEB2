export default function AmountDisplay({ label, amount }) {

    return (
        <p className="text-xl font-bold">
            {label}: <span className="text-blue-600">${amount}</span>
        </p>
    );
}