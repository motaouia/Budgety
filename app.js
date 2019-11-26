//Budget Controller
var budgetController = (function(){
 
  var Expense = function(id, description, value){

        this.id = id;
        this.description = description;
        this.value = value;
  };

  var Income = function(id, description, value){

      this.id = id;
      this.description = description;
      this.value = value;
  };

    var data = {
      allItems : {
          exp : [],
          inc : []
      },
      totals : {
          exp : 0,
          inc : 0
      },

    };

    return {
      //Function that allows Adding Item
      //we must now some information: type of Item(Income/expens),description,value
      addItem : function(type, des, val){
          var newItem, ID = 0;

          //Create new ID
          if(data.allItems[type].length == 0){
            ID = 0;
          }
          else {
          ID = data.allItems[type][data.allItems[type].length - 1].id + 1;
        }
          //Create new Item based on 'inc' or 'exp'
          if(type === "exp"){
            newItem = new Expense(ID, des, val);
          }
          else if(type === "inc"){
            newItem = new Income(ID, des, val);
          }

          //push the new Item to our data structure
          data.allItems[type].push(newItem);

          //return the new item element
          return newItem ;
       },
       // printTesting : function(){
         // console.log(data);
        //},
    };

})();


//UI Controller
var UIController = (function(){
  //A Private Obeject that contains the classes name of input field
  //I write it Like That to avoid to change in multiple pieces of my Page 
  //If they choice tochange the class names of the fileds
  //So we Change One Time Here
  var DOMInputClasses = {

      addTypeClass : '.add__type',
      addDesccriptionClass :'.add__description',
      addValueClass : '.add__value',
      addButtnClass : '.add__btn'

  }

    return {
       getInputPublic : function() {

        return{

      inputType : document.querySelector(DOMInputClasses.addTypeClass).value,

      inputDesc : document.querySelector(DOMInputClasses.addDesccriptionClass).value,

      inputValue : document.querySelector(DOMInputClasses.addValueClass).value

          };
        },

       getDOMInputClassesPublic : function(){
         return DOMInputClasses;
       }

    };
})();


//Global App Controller
var controller = (function(budgtCntrl, UICtrl){

    var setupEventListeners = function(){
      var DOMClasses = UICtrl.getDOMInputClassesPublic();

        //Event Handler of Button Add : we choice two approch
        //If the User click the Button  O r press the Button Enter

  document.querySelector(DOMClasses.addButtnClass).addEventListener('click',ctrlAddItem);

  document.addEventListener('keypress', function(event){

    if(event.keyCode === 13 || event.which === 13){
            // event.preventDefault();
           // console.log('Handlig Enter Prseed');
             ctrlAddItem();
          }
      });
    };

    var ctrlAddItem = function(){
      
      var input, newItem;

       //1-get the field input data
       inputObject = UICtrl.getInputPublic();

      //2-add this Item to BudgetController
       newItem = budgtCntrl.addItem(inputObject.inputType, inputObject.inputDesc, inputObject.inputValue);

      //3- Add This Item to UI

      //4-Caclcul the Budget

      //5-Display the Budget on the UI


    }

    return{

      init : function(){
        console.log("Application has Started ...");
        setupEventListeners();
      }

    };

})(budgetController,UIController);

controller.init();