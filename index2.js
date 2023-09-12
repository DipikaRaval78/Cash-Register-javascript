var list = [
	{ name: 'One-hundred Dollars', val: 100},
	{ name: 'Twenty Dollars', val: 20},
	{ name: 'Ten Dollars', val: 10},
	{ name: 'Five Dollars', val: 5},
	{ name: 'Dollar', val: 1},
	{ name: 'Quarter', val: 0.25},
	{ name: 'Dime', val: 0.1},
	{ name: 'Nickel', val: 0.05},
	{ name: 'Penny', val: 0.01}
];



function checkCashRegister() {

     var price = document.getElementById("price").value;
    var cash = document.getElementById("cash").value;

    var old = console.log;
    var logger = document.getElementById('log');
    var cid = [];

    $("table#details tbody tr").each(function() {
        var arrayOfThisRow = [];
        var tableData = $(this).find('td');
        if (tableData.length > 0) {
          arrayOfThisRow["0"] = $(this).find("td:eq(1)").text();
          
              arrayOfThisRow["1"] = $(this).find("td:eq(0) input").val();
              
           
            cid.push(arrayOfThisRow);
        }
    });

    console.log(price, cash, cid)
  var output = {status: null, change: [[]]};
 var change = cash - price;
 var register = cid.reduce(function(acc, curr) {
    console.log(curr)

    acc.total += curr[1];
    acc[curr[0]] = curr[1];
    return acc;
   }, {total: 0});
   console.log(register,"register")

   if(register.total === change) {

   output.status = 'CLOSED';
   output.change = cid;
   return output;
   }
   if(register.total < change) {

   output.status = 'INSUFFICIENT_FUNDS';
   return output;
   }
   var change_arr = list.reduce(function(acc, curr) {

   var value = 0;
   console.log([curr.val])
   while(register[curr.name] > 0 && change >= curr.val) {


   change -= curr.val;
   register[curr.name] -= curr.val;
   value += curr.val;
   change = Math.round(change * 100) / 100;
   }
   if(value > 0) {
   acc.push([ curr.name, value ]);
   }
   return acc;
   }, []);

   console.log(change_arr,"kjkjkjkj")
   if(change_arr.length < 1 || change > 0) {
   output.status = 'INSUFFICIENT_FUNDS';
   return output;
   }

   output.status = 'OPEN';
   output.change = change_arr;

    console.log = function (message) {
        if (typeof message == 'object') {
            logger.innerHTML += (JSON && JSON.stringify ? JSON.stringify(message) : String(message)) + '<br />';
        } else {
            logger.innerHTML += message + '<br />';
        }
    }

console.log(output);
}
// console.log(checkCashRegister(19.5, 20, [["PENNY", 1.01], ["NICKEL", 2.05], ["DIME", 3.1], ["QUARTER", 4.25], ["ONE", 90], ["FIVE", 55], ["TEN", 20], ["TWENTY", 60], ["ONE HUNDRED", 100]]));