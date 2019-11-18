//Budget Controller
var budgetController = (function(){
 
  //Some code 

})();

//UI Controller
var UIController = (function(){
    //Some Code Here
})();


//Global App Controller
var controller = (function(budgtCntrl, UICtrl){

    var ctrlAddItem = function(){
      console.log('function ctrlAddItem');
       //1-get the field input data

      //2-add this Item to BudgetController

      //3- Add This Item to UI

      //4-Caclcul the Budget

      //5-Display the Budget on the UI


    }

  //Some code
  document.querySelector('.add__btn').addEventListener('click',ctrlAddItem);

  document.addEventListener('keypress', function(event){

    if(event.keyCode === 13 || event.which === 13){
     // event.preventDefault();
     // console.log('Handlig Enter Prseed');
      ctrlAddItem();
    }

  });


})(budgetController,UIController);




















