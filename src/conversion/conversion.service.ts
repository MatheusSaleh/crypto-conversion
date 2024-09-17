import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { PrismaService } from 'src/prisma/prisma.service';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class ConversionService {
    private readonly coingeckoApiUrl = 'https://api.coingecko.com/api/v3';

    constructor(private readonly prisma: PrismaService, private usersService: UsersService){}

    async convertCurrency(userId: number, fromCoin: string, toCoin: string, amount: number){
        try{
            const { data } = await axios.get(
                `${this.coingeckoApiUrl}/simple/price`,
                {
                    params: {
                        ids: fromCoin,
                        vs_currencies: toCoin
                    },
                    headers: {
                        accept: 'application/json',
                        'x-cg-demo-api-key': 'CG-rTABXPsisBroqsqQyVdKusSn'
                    }
                },
            );
            const rate = data[fromCoin][toCoin];
            const result = amount * rate;

            await this.prisma.conversion.create({
                data: {
                    userId,
                    fromCoin,
                    toCoin,
                    amount,
                    result,
                },
            });

            return {result};
        } catch(error){
            throw new Error('Erro ao converter moedas');
        }
    }
}
