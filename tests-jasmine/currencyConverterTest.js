import { converterFunc } from "../scripts/utils/currencyConverter.js";

describe ('test suite: currency formatter function testing', ()=>{
    it('converting cents value into dollar value', ()=>{
        expect(converterFunc(2095)).toEqual('20.95');
    })
})