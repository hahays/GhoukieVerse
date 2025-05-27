import {PlusIcon} from "lucide-react";

export function ActionButtons() {
    return (
        <div className="space-y-2">
            <button className="w-full bg-ghoukie-green text-black py-2 rounded-lg font-medium">
                Я смотрел
            </button>
            <button className="w-full bg-ghoukie-purple text-white py-2 rounded-lg font-medium">
                Буду смотреть
            </button>
            <button className="w-full border border-ghoukie-light-gray text-white py-2 rounded-lg font-medium flex items-center justify-center gap-2">
                <PlusIcon className="w-4 h-4" />
                Добавить в список
            </button>
        </div>
    );
}