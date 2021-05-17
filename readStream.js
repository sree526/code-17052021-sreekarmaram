var data = require('./personsData.json'),
    Readable = require('stream').Readable,
    util = require('util');
var ReadStream = function() {
    Readable.call(this, {
        objectMode: true
    });

    this.data = data;
    this.curIndex = 0;
};

util.inherits(ReadStream, Readable);

function HealthRisk(bmi){
    if(bmi<18.4){
        return 'Malnutrition,UnderWeight'
    } else if(bmi>=18.5 && bmi <=24.9){
        return 'Low,Normal weight'
    } else if(bmi>=25 && bmi<=29.9){
        return 'Enhanced,Overweight'
    } else if(bmi>=30 && bmi<=34.9){
        return 'Medium,Moderately obese'
    } else if(bmi>=35 && bmi<=39.9){
        return 'High,Severely obese'
    } else return 'Very High,Very Moderately obese'
}

ReadStream.prototype._read = function() {
    if (this.curIndex === this.data.length) {
        return this.push(null);
    }
    if(this.curIndex === 0){
        this.push('[');
    }
    var data = this.data[this.curIndex++];
    let heightinMtrs = (data['HeightCm']/100);
    data['bmi']= parseFloat(data['WeightKg']/(heightinMtrs*heightinMtrs)).toFixed(1);
    let bmiDetails = HealthRisk(data['bmi']).split(',');
    data['healthRisk'] = bmiDetails[0]+'Risk';
    data['BMICategory'] = bmiDetails[1];
    this.curIndex === this.data.length? this.push(JSON.stringify(data, null, 4)+"]"): this.push(JSON.stringify(data, null, 4)+",")

};

module.exports = ReadStream;
