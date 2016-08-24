/**
 * Node Js File to produce json files for the chart to be prepared by D3 Js (Part of Jaqva Script assignment)
 * @author     (Abhishek <abhishek.chatterjee@wipro.com>)
 * @type       {Function}
 */
const readline = require('readline');

const fs = require('fs');
var linecounter = 0;
var header =[];
var jsonData=[];
var jsonData2=[];
var jsonData3=[];
var isHeader=true;
var insidequotes=false;
var temprow="";
var obj={};
var birthArr={};
var deathArr={}
var femaleArr={};
var maleArr={};
var totalArr = {};
var maleflag = false;
var femaleflag = false;
var totalflag = false;
var birthflag =false;
var deathflag = false;
var country=["afghanistan","armenia","azerbaijan","bahrain","bangladesh","bhutan","brunei","cambodia","china","cyprus","georgia","india","indonesia","iran","iraq","israel","japan","jordan","kazakhstan","kuwait","kyrgyzstan","laos","lebanon","malaysia","maldives","mongolia","myanmar","nepal","north Korea","oman","pakistan","palestine","philippines","qatar","russia","saudi Arabia","singapore","south Korea","sri Lanka","syria","taiwan","tajikistan","thailand","timor Leste","turkey","turkmenistan","united arab emirates","uzbekistan","vietnam","yemen"];
for(var k=0;k<country.length;k++)
{
    obj[country[k]]=true;
}

const rl = readline.createInterface({
	input: fs.createReadStream('indicators.csv')
});

rl.on('line', function(line) {  
	console.log(linecounter++);  
	for (var i = 0; i <= line.length; i++) {
        if(line.charAt(i) == "\""){
            if(insidequotes){
                insidequotes = false;
            }else{
                insidequotes = true;
            }
        }        
        if ((line.charAt(i) == ",") && (insidequotes==true)){
            temprow=temprow+"$";
        }else{
            temprow=temprow+line.charAt(i);
        }
    } 

    line = temprow;
    //expectancy_plotter(line);
    //top_expectancy_plotter(line);
    indian_expectancy_plotter(line);

    temprow  = "";   
});

function expectancy_plotter(line) {

	var lineRecords= line.trim().split(',');   

    var temp=-1;
    var tempdata = {};
    var tempmale = {};

    if(country.indexOf(lineRecords[0].toLowerCase())>temp){

		if(lineRecords[3]=="SP.DYN.LE00.FE.IN"){		
			if((femaleArr[lineRecords[4]] == null)&&(maleArr[lineRecords[4]] == null)){
				tempdata["Year"]=lineRecords[4];
				tempdata["femaleRate"] = parseFloat(lineRecords[5])/55;
				tempdata["maleRate"] = 0.00;
				femaleArr[lineRecords[4]] = lineRecords[5]/55;
				maleArr[lineRecords[4]] = 0.00;
				jsonData.push(tempdata);
			}else{
				femaleArr[lineRecords[4]] =  parseFloat(femaleArr[lineRecords[4]]) + (parseFloat(lineRecords[5])/55);
				var tempJsonData = jsonData.slice();
				jsonData = [];
				for (var i = 0 ; i <= tempJsonData.length; i++) {
					if((tempJsonData[i]!=null)&&(tempJsonData[i].Year == lineRecords[4])){
						console.log("inside female");
						tempJsonData[i].femaleRate = femaleArr[lineRecords[4]];
						jsonData.push(tempJsonData[i]);
					}else if(tempJsonData[i]!=null){
						jsonData.push(tempJsonData[i]);
					}
				}
			}
			femaleflag=true;
		}else if(lineRecords[3]=="SP.DYN.LE00.MA.IN"){
			if((maleArr[lineRecords[4]] == null)&&(femaleArr[lineRecords[4]] == null)){
				tempdata["Year"]=lineRecords[4];
				tempdata["femaleRate"] = 0.00;
				tempdata["maleRate"] = parseFloat(lineRecords[5])/55;
				maleArr[lineRecords[4]] = lineRecords[5]/55;
				femaleArr[lineRecords[4]] = 0.00;
				jsonData.push(tempdata);
			}else{
				maleArr[lineRecords[4]] =  parseFloat(maleArr[lineRecords[4]]) + (parseFloat(lineRecords[5])/55);
				var tempJsonData = jsonData.slice();
				jsonData = [];
				for (var i = 0 ; i <= tempJsonData.length; i++) {
					if((tempJsonData[i]!=null)&&(tempJsonData[i].Year == lineRecords[4])){
						console.log("inside female");
						tempJsonData[i].maleRate = maleArr[lineRecords[4]];
						jsonData.push(tempJsonData[i]);
					}else if(tempJsonData[i]!=null){
						jsonData.push(tempJsonData[i]);
					}
				}
			}
			maleflag=true;
		}
    }
    
    if(femaleflag){
        fs.writeFileSync("data.json",JSON.stringify(jsonData),encoding="utf8");
    }else if(maleflag){
        fs.writeFileSync("data.json",JSON.stringify(jsonData),encoding="utf8");
    }    

    maleflag=false;
   	femaleflag=false;
}


function top_expectancy_plotter(line) {

	var lineRecords= line.trim().split(',');   

    var tempdata = {};

	if(lineRecords[3]=="SP.DYN.LE00.IN"){		
		if(totalArr[lineRecords[0]] == null){
			tempdata["country"]=lineRecords[0];
			tempdata["total"] = parseFloat(lineRecords[5]);
			totalArr[lineRecords[0]] = parseFloat(lineRecords[5]);
			jsonData2.push(tempdata);
		}else{
			totalArr[lineRecords[0]] =  parseFloat(totalArr[lineRecords[0]]) + (parseFloat(lineRecords[5]));
			var tempJsonData = jsonData2.slice();
			jsonData2 = [];
			for (var i = 0 ; i <= tempJsonData.length; i++) {
				if((tempJsonData[i]!=null)&&(tempJsonData[i].country == lineRecords[0])){
					tempJsonData[i].total = totalArr[lineRecords[0]];
					jsonData2.push(tempJsonData[i]);
				}else if(tempJsonData[i]!=null){
					jsonData2.push(tempJsonData[i]);
				}
			}
		}
		totalflag=true;
	}
   
	jsonData2.sort(function(a,b) {
    	return b.total - a.total ;
	});

	var sortedJsonData = [];

	for (var i = 0; i < 5; i++) {
		sortedJsonData[i] = jsonData2[i];
	}

    if(totalflag){
        fs.writeFileSync("data2.json",JSON.stringify(sortedJsonData),encoding="utf8");
    } 

   	totalflag=false;
}



function indian_expectancy_plotter(line) {

	var lineRecords= line.trim().split(',');   

    var tempdata = {};
    var tempmale = {};

    if(lineRecords[1] == "IND"){
    	console.log("hello");
		if(lineRecords[3]=="SP.DYN.CBRT.IN"){		
			if((birthArr[lineRecords[4]] == null)&&(deathArr[lineRecords[4]] == null)){
				tempdata["Year"]=lineRecords[4];
				tempdata["birthRate"] = parseFloat(lineRecords[5]);
				tempdata["deathRate"] = 0.00;
				birthArr[lineRecords[4]] = parseFloat(lineRecords[5]);
				deathArr[lineRecords[4]] = 0.00;
				jsonData3.push(tempdata);
			}else{
				//femaleArr[lineRecords[4]] =  parseFloat(femaleArr[lineRecords[4]]) + (parseFloat(lineRecords[5])/55);
				birthArr[lineRecords[4]] = parseFloat(lineRecords[5]);
				var tempJsonData = jsonData3.slice();
				jsonData3 = [];
				for (var i = 0 ; i <= tempJsonData.length; i++) {
					if((tempJsonData[i]!=null)&&(tempJsonData[i].Year == lineRecords[4])){
						console.log("inside female");
						tempJsonData[i].birthRate = birthArr[lineRecords[4]];
						jsonData3.push(tempJsonData[i]);
					}else if(tempJsonData[i]!=null){
						jsonData3.push(tempJsonData[i]);
					}
				}
			}
			birthflag=true;
		}else if(lineRecords[3]=="SP.DYN.CDRT.IN"){
			if((deathArr[lineRecords[4]] == null)&&(birthArr[lineRecords[4]] == null)){
				tempdata["Year"]=lineRecords[4];
				tempdata["birthRate"] = 0.00;
				tempdata["deathRate"] = parseFloat(lineRecords[5]);
				deathArr[lineRecords[4]] = parseFloat(lineRecords[5]);
				birthArr[lineRecords[4]] = 0.00;
				jsonData3.push(tempdata);
			}else{
				//maleArr[lineRecords[4]] =  parseFloat(maleArr[lineRecords[4]]) + (parseFloat(lineRecords[5])/55);
				deathArr[lineRecords[4]] = parseFloat(lineRecords[5]);
				var tempJsonData = jsonData3.slice();
				jsonData3 = [];
				for (var i = 0 ; i <= tempJsonData.length; i++) {
					if((tempJsonData[i]!=null)&&(tempJsonData[i].Year == lineRecords[4])){
						console.log("inside female");
						tempJsonData[i].deathRate = deathArr[lineRecords[4]];
						jsonData3.push(tempJsonData[i]);
					}else if(tempJsonData[i]!=null){
						jsonData3.push(tempJsonData[i]);
					}
				}
			}
			deathflag=true;
		}
    }
    
    if(birthflag){
        fs.writeFileSync("data3.json",JSON.stringify(jsonData3),encoding="utf8");
    }else if(deathflag){
        fs.writeFileSync("data3.json",JSON.stringify(jsonData3),encoding="utf8");
    }    

    isHeader=false;
    birthflag=false;
   	deathflag=false;
}
