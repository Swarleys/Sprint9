import { CardHour } from '../interfaces/interfaces';
import { defineStore } from "pinia";

export const useElectricityPrice = defineStore('electricityPrice', {
    state: () => ({
        electricityPrices: [] as CardHour[],
    }),

    actions: {
        async getElectricityPrices(): Promise<CardHour[]> {
            if (this.electricityPrices.length === 0) {
                const APIPRICE = `https://api.esios.ree.es/archives/70/download_json`;
                const myHeaders = new Headers({
                    'Accept': 'application/json; application/vnd.esios-api-v1+json',
                    'Content-Type': 'application/json',
                    'Host': 'api.esios.ree.es',
                    'Authorization': 'Token token="16388be3b19d1f03112ab963f5b0660f07abfe1d616859d5e8f032074b25093d"',
                    'Cookie': ''
                })
                const response = await fetch(APIPRICE, {
                    method: 'GET',
                    headers: myHeaders,
                });
                const json = await response.json();

                const createZone = (hour) => {
                    if (hour >= 0 && hour < 8) {
                        return 'Valle';
                    } else if ((hour >= 8 && hour < 10) || (hour >= 14 && hour < 18) || (hour >= 22 && hour < 24)) {
                        return 'Llano';
                    } else {
                        return 'Punta';
                    }
                };

                const filteredData = json.PVPC.map(({ Dia, Hora, PCB }) => {
                    const getFirstHour = Hora.split('-')[0];
                    return {
                        day: Dia,
                        hour: +getFirstHour,
                        formattedHour: `${getFirstHour}:00`,
                        price: (+PCB.split(',')[0] / 1000).toFixed(3),
                        zone: createZone(+getFirstHour)
                    };
                });

                const sortedByPrice = filteredData.sort(({ price: a }, { price: b }) => a - b);

                for (let [index, element] of sortedByPrice.entries()) {
                    if (index < 8) {
                        element.expensive = '€';
                        element.color = 'green';
                    } else if (index >= 8 && index < 16) {
                        element.expensive = '€€';
                        element.color = 'yellow';
                    } else {
                        element.expensive = '€€€';
                        element.color = 'red';
                    }
                }

                const sortedByHour: CardHour[] = sortedByPrice.sort(({ hour: a }, { hour: b }) => a - b);
                
                this.electricityPrices = sortedByHour;
                return sortedByHour;
            }

            return this.electricityPrices;
        }
    },
})
