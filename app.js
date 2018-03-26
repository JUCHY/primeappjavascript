(function(angular) {
    'use strict';
  var myApp = angular.module('primeapp', []);
  //controller function
  myApp.controller('PrimeController', ['$scope', function($scope) {
                //finds and returns k and m needed for the miller rabin proability test
              function twokm(num, k) {
                var newnum = num-1;
                var numtoreturn = 0;
                var remvalue =  newnum%(exponent(2,k));
                var test = true;
                  while(test){
                    if (remvalue ===0){
                      k = k+1;
                      remvalue = newnum%(exponent(2,k));
                    }
                    else{
                      numtoreturn = newnum/(exponent(2,k-1));
                      test = false;
                    }
                    }
                return [k-1, numtoreturn];
                  }
  
              //Undergoes step 3 of the process. Returns true if probably prime, and false if not prime
              function modulo(somenum, bO, occ) {
                  if (occ>100){
                      return false;
                   }
                  if (occ ===0){
                      if (bO%somenum == 1 || bO%somenum == somenum -1){
                            return true;
                      }
                  else{
                      return modulo(somenum,exponent(bO,2),occ+1);
                  }
                  }
                  if ((bO)%somenum == somenum -1){
                            return true;
                  }
                  else if((bO)%somenum != 1){
                            return modulo(somenum,exponent(bO,2),occ+1);
                  }
                  else{
                            return false;
                  }
              }
              //custom exponent function
              function exponent(num, exp) {
                  var y = 1;
                  if (exp === 0){
                      return y;
                  }
                  if (exp%2 === 0){
                      y = exponent(num,exp/2);
                      return y*y;
                  }
                  else{
                      y = exponent(num, (exp-1)/2);
                      return num*y*y;
                  }
              }
              /*
               Prompts the user to enter a number if input does not include a number
              Returns not a prime if entered number is less than 1, or a decimal
              Performs the three step process if the given number is greater than two, and not a decimal         

              */
              function isPrime(somenum) {
                if(isNaN(somenum)){
                    return "Please Enter a Number";
                }
                var checknum = Number(somenum);
                if(checknum%1!==0){
                    return "This is a decimal, it is not prime";
                }
                if (checknum <= 1){
                    return "This number is not prime";
                }
                else if (checknum == 2){
                    return "This number is prime";
                }
                else if(checknum%2 === 0){
                    return "This number is not prime";
                }
                else{
                    checknum = bigInt(checknum)
                    var stuff = twokm(checknum,1);
                    var m = stuff[1]
                    var BO = bigInt(2).modPow(m, checknum)
                    if(modulo(checknum,BO, 0)){
                        return "This number is prime";
                    }
                    else{
                        return "This number is not prime";
                    }
                  }
  
                }
                $scope.isPrime = isPrime;
  }]);
  })(window.angular);
  