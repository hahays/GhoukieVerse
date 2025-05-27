import {MovieDetails} from "../../types/film";
import {CreditCard} from "../CreditCard/CreditCard";

export function TabContent({ activeTab, movie }: { activeTab: string; movie: MovieDetails }) {
    return (
        <div>
            {activeTab === 'info' && (
                <div>
                    <p className="mb-6">{movie.Plot}</p>
                    <div className="grid grid-cols-2 gap-4">
                        <CreditCard role="Режиссер" name={movie.Director} />
                        <CreditCard role="Сценарист" name={movie.Writer} />
                        <CreditCard role="Оператор" name="-" />
                        <CreditCard role="Композитор" name="-" />
                    </div>
                </div>
            )}
            {activeTab === 'cast' && <CastSection />}
            {activeTab === 'media' && <MediaSection />}
        </div>
    );
}