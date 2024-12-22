const axios = require('axios');

class PfdoAPI {
    async getPrograms(page = 1) {
        try {
            const url = page === 1 
                ? "https://api.pfdo.ru/v2/main-page/search/es-programs?sort=&per-page=24&operator=31&expand=program_nok_rating,duration_string,kind"
                : `https://api.pfdo.ru/v2/main-page/search/es-programs?page=${page}&per-page=24&operator=31&expand=program_nok_rating,duration_string,kind`;
            const response = await axios.get(url);
            return response.data.data;
        } catch (error) {
            console.error("Failed to fetch programs:", error);
            throw error;
        }
    }

    async getProgram(id) {
        try {
            const url = `https://api.pfdo.ru/v2/public/programs/${id}?expand=address,program_image,registry,reestrs,direction,activity,is_open,available_groups,program_text,distance_technology,organization,images,interest,modules`;
            const response = await axios.get(url);
            return response.data.data;
        } catch (error) {
            console.error("Failed to fetch program:", error);
            throw error;
        }
    }

    async getReviews(id) {
        try {
            const url = `https://api.pfdo.ru/v3/program/program-certificate-score?fields=created_at,updated_at,review,score&search[program_id]=${id}&expand=certificate_initials`;
            const response = await axios.get(url);
            return response.data.data;
        } catch (error) {
            console.error("Failed to fetch review:", error);
            throw error;
        }
    }

    async searchInfo(params = {}) {
        try {
            const queryParams = new URLSearchParams();

            if (params.directionIds) {
                params.directionIds.forEach(id => queryParams.append('search[direction_id][]', id));
            }

            if (params.ages) {
                params.ages.forEach((age, key) => queryParams.append(`search[ages][${key}]`, age));
            }

            if (params.name) {
                queryParams.append('page', params.page);
            }

            if (params.name) {
                queryParams.append('search[name]', params.name);
            }

            if (params.form) {
                queryParams.append('search[form]', params.form);
            }

            if (params.average) {
                queryParams.append('search[average_score_min]', params.average);
                queryParams.append('search[average_score_max]', 5);
            }

            const url = `https://api.pfdo.ru/v2/main-page/search/es-programs?${queryParams.toString()}&sort=&per-page=24&operator=31&expand=program_nok_rating,duration_string,kind`;
            const response = await axios.get(url);
            return response.data.data;
        } catch (error) {
            console.error("Failed to search info:", params, error);
            throw error;
        }
    }

    getLinkSign(id) {
        return `https://65.pfdo.ru/app/groups/${id}`;
    }

    async getCards(params) {
        try {
            const fetchCards = await this.searchInfo(params);

            const cards = []
            fetchCards.map(card => {
                cards.push({
                    id: card.id,
                    name: card.short_name,
                    duration_string: card.duration_string,
                    age_min: card.age_min,
                    age_max: card.age_max,
                    organization_name: card.organization_name,
                    link: this.getLinkSign(card.id),
                })
            })
            return cards;
        } catch (error) {
            console.error("Failed to fetch cards:", params, error);
            throw error;
        }
    }
}

module.exports = new PfdoAPI();


module.exports = new PfdoAPI();
// const api = new PfdoAPI();
// (async () => {
//     try {
//         const result = await api.searchInfo({
//             directionIds: [2, 3], // Техническая и художественная
//             ages: [10, 12],      // Возраст 10 и 12 лет
//             name: "Знаю",        // Название программы содержит "Знаю"
//         });
//         console.log("Search info result:", result);
//     } catch (error) {
//         console.error(error);
//     }
// })();


// 2 - техническая
// 3 - художественная
// 4 - естественнонаучная
// 5 - социально-гуманитарная
// 6 - туристко-краеведческая
// 7 - физкультурно-спортивная

// 1 - Очная
// 2 - Очно-заочная
// 3 - Заочная

