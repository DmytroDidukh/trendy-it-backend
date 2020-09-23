import axios from 'axios'
import dotenv from 'dotenv'

dotenv.config();

class NovaPoshtaService {
    async getNovaPoshtaRequest(properties, model, method){
        return await axios.post(
            process.env.NOVA_POSHTA_API_LINK,
            {
                modelName: model,
                calledMethod: method,
                methodProperties: properties,
                apiKey: process.env.NOVA_POSHTA_API_KEY
            }
        );
    }

    async getNovaPoshtaCities(city){
        const res = await this.getNovaPoshtaRequest({
            FindByString: city,
            Limit: 10
        }, 'Address', 'getCities')

        return res.data.data.map(city => {
            return {
                description: city.Description,
                ref: city.Ref,
                cityID: city.CityID
            }
        });
    }

    async getNovaPoshtaStreets(cityRef, street) {
        const res = await this.getNovaPoshtaRequest({
            CityRef: cityRef,
            FindByString: street,
            Limit: 10
        }, 'Address', 'getStreet')

        return res.data.data.map(street => {
            return {
                description: street.Description,
                ref: street.Ref,
                streetsTypeRef: street.StreetsTypeRef,
                streetsType: street.StreetsType,
                present: `${street.StreetsType} ${street.Description}`,
            }
        })
    }

    async getNovaPoshtaWarehouses(city, cityRef){
        const res = await this.getNovaPoshtaRequest({
            CityName: city,
            CityRef: cityRef
        }, 'AddressGeneral', 'getWarehouses')

        return res.data.data.map(warehouse => {
            return {
                description: warehouse.Description,
                shortAddress: warehouse.ShortAddress,
                number: warehouse.Number,
                placeMaxWeightAllowed:  warehouse.PlaceMaxWeightAllowed,
                totalMaxWeightAllowed: warehouse.TotalMaxWeightAllowed,
                phone: warehouse.Phone,
                ref: warehouse.Ref,
                schedule: {
                    monday: warehouse.Schedule.Monday,
                    tuesday: warehouse.Schedule.Tuesday,
                    wednesday: warehouse.Schedule.Wednesday,
                    thursday: warehouse.Schedule.Thursday,
                    friday: warehouse.Schedule.Friday,
                    saturday: warehouse.Schedule.Saturday,
                    sunday: warehouse.Schedule.Sunday,
                },
            }
        });
    }

    async getNovaPoshtaPrices(data) {
        const {
            citySender = 'db5c88f5-391c-11dd-90d9-001a92567626',
            cityRecipient,
            weight,
            serviceType = 'WarehouseDoors',
            cost,
            cargoType = 'Cargo',
            seatsAmount = 1,
        } = data
        // WarehouseWarehouse
        // WarehouseDoors
        const res = await this.getNovaPoshtaRequest({
            CitySender: citySender,
            CityRecipient: cityRecipient,
            Weight: weight,
            ServiceType: serviceType,
            Cost: cost,
            CargoType: cargoType,
            SeatsAmount: seatsAmount,
        }, 'InternetDocument', 'getDocumentPrice')

        return res.data.data.map(price => {
            return {
                assessedCost: price.AssessedCost,
                cost: price.Cost,
                costRedelivery: price.CostRedelivery,
                costPack: price.CostPack,
            }
        })
    }

    async createNovaPoshtaOrder(data) {
        const {
            citySender = 'db5c88f5-391c-11dd-90d9-001a92567626',
            weight,
            payerType = 'Sender',
            paymentMethod = 'Cash',
            serviceType = 'WarehouseWarehouse',
            cost,
            cargoType = 'Parcel',
            seatsAmount = 1,
            description,
            recipientCityName,
            recipientAddressName,
            recipientName = 'Тест Тест Тест',
            recipientType = 'PrivatePerson',
            recipientsPhone,
            recipientArea = '',
            recipientAreaRegions = '',
            recipientHouse = '',
            recipientFlat = '',
        } = data

        const sender = await this.getSenderCounterparty()

        const address = await this.getSenderAddress(citySender)

        const contactSender = await this.getSenderContact(sender.Ref)

        const res = await this.getNovaPoshtaRequest({
            NewAddress:'1',
            CitySender: citySender,
            Weight: weight,
            ServiceType: serviceType,
            Cost: cost,
            CargoType: cargoType,
            SeatsAmount: seatsAmount,
            Description: description,
            RecipientCityName: recipientCityName,
            RecipientAddressName: recipientAddressName,
            RecipientName: recipientName,
            RecipientType: recipientType,
            RecipientsPhone: recipientsPhone,
            PayerType: payerType,
            PaymentMethod: paymentMethod,
            RecipientArea: recipientArea,
            RecipientAreaRegions: recipientAreaRegions,
            RecipientHouse: recipientHouse,
            RecipientFlat: recipientFlat,
            Sender:sender.Ref,
            SenderAddress:address.Ref,
            ContactSender:contactSender.Ref,
            SendersPhone: contactSender.Phones,
        }, 'InternetDocument', 'save')

        const document = res.data.data[0]

        if(!document) {
            throw Error('ORDER_CREATION_FAILED')
        }

        return {
            ref: document.Ref,
            costOnSite: document.CostOnSite,
            intDocNumber: document.IntDocNumber,
            typeDocument: document.TypeDocument
        }
    }

    async getSenderCounterparty() {
        const res = await this.getNovaPoshtaRequest({
            CounterpartyProperty: 'Sender',
            Page: '1'
        }, 'Counterparty', 'getCounterparties')

        return res.data.data[0]
    }

    async getSenderAddress(cityRef) {
        const sender = await this.getSenderCounterparty()

        const street = await this.getNovaPoshtaStreets(cityRef, 'Литвиненка')

        const res = await this.getNovaPoshtaRequest({
            CounterpartyRef: sender.Ref,
            StreetRef: street[0].ref,
            BuildingNumber: '8',
            Flat: '1',
        }, 'Address', 'save')

        return res.data.data[0]
    }

    async getSenderContact(sender) {
        const res = await this.getNovaPoshtaRequest({
            Ref: sender,
            Page: '1'
        }, 'Counterparty', 'getCounterpartyContactPersons')

        return res.data.data[0]
    }
}

export default new NovaPoshtaService();
