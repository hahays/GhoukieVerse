import {FilmFilters} from "../../types/film";


export function buildQuery(filters: FilmFilters) {
    const q: Record<string, any> = {
        sortField: 'votes.imdb',
        sortType: '-1',
    };

    if (filters.year?.from || filters.year?.to) {
        q.year = `${filters.year.from || ''}-${filters.year.to || ''}`;
    }
    if (filters.genres?.length) {
        q['genres.name'] = filters.genres;
    }
    if (filters.rating) {
        q['rating.imdb'] = `${filters.rating.split('-')[0]}-10`;
    }
    if (filters.platform) {
        q['watchability.items.name'] = filters.platform;
    }
    if (filters.studio) {
        q['productionCompanies.id'] = filters.studio;
    }
    if (filters.age) {
        q.ageRating = filters.age;
    }
    if (filters.popularity) {
        switch (filters.popularity) {
            case 'high':
                q['fees.world'] = { $gte: 50_000_000 };
                break;
            case 'medium':
                q['fees.world'] = { $gte: 10_000_000, $lt: 50_000_000 };
                break;
            case 'low':
                q['fees.world'] = { $lt: 10_000_000 };
                break;
        }
    }
    if (filters.type) {
        q.type = filters.type;
    }
    if (filters.movieLength) {
        q.movieLength = filters.movieLength;
    }
    if (filters.countries?.length) {
        q['countries.name'] = filters.countries;
    }
    if (filters.award) {
        q['awards.name'] = filters.award;
    }
    if (filters.is3d) {
        q['technology.is3d'] = true;
    }
    if (filters.isImax) {
        q['technology.isImax'] = true;
    }
    if (filters.budget) {
        q['budget.value'] = `${filters.budget.from || ''}-${filters.budget.to || ''}`;
    }
    if (filters.language) {
        q['names.language'] = filters.language;
    }
    if (filters.date) {
        q.createdAt = getDateFilter(filters.date);
    }
    if (filters.feesWorld) {
        q['fees.world'] = filters.feesWorld;
    }

    return q;
}

function getDateFilter(dateType: 'month' | 'year' | 'old') {
    const now = new Date();
    switch (dateType) {
        case 'month':
            return `${new Date(now.setMonth(now.getMonth() - 1)).toISOString()}-${new Date().toISOString()}`;
        case 'year':
            return `${new Date(now.setFullYear(now.getFullYear() - 1)).toISOString()}-${new Date().toISOString()}`;
        case 'old':
            return `-${new Date(now.setFullYear(now.getFullYear() - 5)).toISOString()}`;
        default:
            return '';
    }
}