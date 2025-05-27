function GooglePlayIcon() {
    return null;
}

function AppleTvIcon() {
    return null;
}

export function WhereToWatch() {
    const services = [
        { name: 'Google Play', icon: <GooglePlayIcon /> },
        { name: 'Apple TV', icon: <AppleTvIcon /> },
    ];

    return (
        <div className="bg-ghoukie-gray p-4 rounded-lg mb-4">
            <h3 className="font-bold mb-3">Где посмотреть</h3>
            <div className="space-y-3">
                {services.map((service) => (
                    <div key={service.name} className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            {service.icon}
                            <span>{service.name}</span>
                        </div>
                        <button className="text-ghoukie-green text-sm font-medium">
                            Перейти
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}