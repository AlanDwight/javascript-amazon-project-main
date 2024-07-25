import { converterFunc } from "../../scripts/utils/currencyConverter.js";

describe ('test suite: currency formatter function testing', ()=>{
    it('converting cents value into dollar value', ()=>{
        expect(converterFunc(2095)).toEqual('20.95');
    })
    it('works with zero', ()=>{
        expect(converterFunc(0)).toEqual('0.00');
    })
    it('rounding up or down', ()=>{
        expect(converterFunc(2000.5)).toEqual('20.01');
    })
})