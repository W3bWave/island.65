const axios = require('axios');

class PfdoAPI {
    async getPrograms(page) {
        try {
            const url = page === 1 
                ? "https://api.pfdo.ru/v2/main-page/search/es-programs?sort=&per-page=24&operator=31&expand=program_nok_rating,duration_string,kind"
                : `https://api.pfdo.ru/v2/main-page/search/es-programs?page=${page}&per-page=24&operator=31&expand=program_nok_rating,duration_string,kind`;
            const response = await axios.get(url);
            return response.data;
        } catch (error) {
            console.error("Failed to fetch programs:", error);
            throw error;
        }
        // // получение программ
        // - название - name
        // - id
    }

    async getProgram(id) {
        try {
            const url = `https://api.pfdo.ru/v2/public/programs/${id}?expand=address,program_image,registry,reestrs,direction,activity,is_open,available_groups,program_text,distance_technology,organization,images,interest,modules`;
            const response = await axios.get(url);
            return response.data;
        } catch (error) {
            console.error("Failed to fetch program:", error);
            throw error;
        }
        // - duration_string
        // - is_open - открыто
        // - контакты:
        //  - address.name
        //  - address.lat
        //  - address.lng
        //  - organization.name
        //  - age_max / 12
        //  - age_min / 12
    }

    async getReview(id) {
        try {
            const url = `https://api.pfdo.ru/v3/program/program-certificate-score?fields=created_at,updated_at,review,score&search[program_id]=${id}&expand=certificate_initials`;
            const response = await axios.get(url);
            return response.data;
        } catch (error) {
            console.error("Failed to fetch review:", error);
            throw error;
        }
        // - имя - certificate_initials
        // - создано - created_at
        // - score - оценка
    }

    async searchInfo(params) {
        try {
            const queryParams = new URLSearchParams();

            if (params.directionIds) {
                params.directionIds.forEach(id => queryParams.append('search[direction_id][]', id));
            }
            // 2 - техническая
            // 3 - художественная
            // 4 - естественнонаучная
            // 5 - социально-гуманитарная
            // 6 - туристко-краеведческая
            // 7 - физкультурно-спортивная

            if (params.ages) {
                params.ages.forEach((age, key) => queryParams.append(`search[ages][${key}]`, age));
            }

            if (params.name) {
                queryParams.append('search[name]', params.name);
            }

            if (params.form) {
                queryParams.append('search[form]', params.form);
            }
            // 1 - Очная
            // 2 - Очно-заочная
            // 3 - Заочная

            if (params.avarage) {
                queryParams.append('search[average_score_min]', params.avarage);
                queryParams.append('search[average_score_max]', 5);
            }

            

            const url = `https://api.pfdo.ru/v2/main-page/search/es-programs?${queryParams.toString()}&sort=&per-page=24&operator=31&expand=program_nok_rating,duration_string,kind`;
            const response = await axios.get(url);
            return response.data;
        } catch (error) {
            console.error("Failed to search info:", error);
            throw error;
        }
    }
}

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



