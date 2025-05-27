export function TabNavigation({
                                  activeTab,
                                  setActiveTab
                              }: {
    activeTab: string;
    setActiveTab: (tab: string) => void
}) {
    return (
        <div className="flex border-b border-ghoukie-light-gray mb-6">
            {['info', 'cast', 'media'].map((tab) => (
                <button
                    key={tab}
                    className={`px-4 py-2 font-medium ${activeTab === tab ? 'border-b-2 border-ghoukie-green text-ghoukie-green' : 'text-ghoukie-light-gray'}`}
                    onClick={() => setActiveTab(tab)}
                >
                    {tab === 'info' && 'Инфо'}
                    {tab === 'cast' && 'Состав'}
                    {tab === 'media' && 'Медиа'}
                </button>
            ))}
        </div>
    );
}