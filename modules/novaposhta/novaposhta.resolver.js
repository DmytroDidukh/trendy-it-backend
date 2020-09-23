import novaPoshtaService from './novaposhta.service';

const novaPoshtaQuery = {
    getNovaPoshtaCities: async (parent, args) => await novaPoshtaService.getNovaPoshtaCities(args.city),

    getNovaPoshtaStreets: async (parent, args) => await novaPoshtaService.getNovaPoshtaStreets(args.cityRef, args.street),

    getNovaPoshtaWarehouses: async (parent, args) => await novaPoshtaService.getNovaPoshtaWarehouses(args.city),

    getNovaPoshtaPrices: async (parent, args) => await novaPoshtaService.getNovaPoshtaPrices(args.data),

    createNovaPoshtaOrder: async (parent, args) => {
        try {
            return await novaPoshtaService.createNovaPoshtaOrder(args.data)
        }catch (e) {
            return {
                statusCode: 400,
                message: e.message,
            };
        }
    }
};

const novaPoshtaMutation = {
};

export {novaPoshtaQuery, novaPoshtaMutation};
