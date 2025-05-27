interface CreditCardProps {
    role: string;
    name: string;
}

export function CreditCard({role, name}: CreditCardProps) {
    return (
        <div className="bg-ghoukie-gray p-3 rounded-lg">
            <h4 className="text-ghoukie-light-gray text-sm">{role}</h4>
            <p className="font-medium">{name}</p>
        </div>
    );
}