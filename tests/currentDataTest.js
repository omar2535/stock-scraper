var expect = require('chai').expect ;
var assert = require('assert');
var getCurrentData = require('../scripts/current-data');
var sinon = require('sinon');
var chai = require('chai');
chai.use(require('sinon-chai'));

describe('stockScraper()', function(){
    
    var spy = sinon.spy(console, 'log');

    it('should log all current statistical data',function(){
        var data = getCurrentData('BCE.TO');
        expect(console.log).to.have.been.callCount(3);   
        spy.restore();     
    });
});