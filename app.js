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
      //we must Know some information: type of Item(Income/expens),description,value
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
          console.log(newItem);
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
      addButtnClass : '.add__btn',
      incomeContainer : '.income__list',
      expensesContainer : '.expenses__list'

  }

    return {
       getInputPublic : function() {

        return{

      inputType : document.querySelector(DOMInputClasses.addTypeClass).value,

      inputDesc : document.querySelector(DOMInputClasses.addDesccriptionClass).value,

      inputValue : document.querySelector(DOMInputClasses.addValueClass).value

          };
        },
        
        addListItem : function(obj, type) {
          var html, newHtml, element;

          //Create HTML String withe placeHolder

          if(type === 'inc'){

          element = DOMInputClasses.incomeContainer;
          html = '<div class="item clearfix" id="income-%id%">  <div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button> </div></div></div>';
            }
          else if(type === 'exp'){
          element = DOMInputClasses.expensesContainer;
          html = '<div class="item clearfix" id="expense-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__percentage">21%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
             }
          //Replace the placeHolder text with some actual data
             newHtml = html.replace("%id%",obj.id);

             newHtml = newHtml.replace("%description%", obj.description);

             newHtml = newHtml.replace("%value%",obj.value);

          //Insert the HTML into the DOM
            document.querySelector(element).insertAdjacentHTML('beforeend', newHtml);

        },

        clearFields : function(){
          var fields,filedsArr;

          fields = document.querySelectorAll(DOMInputClasses.addDesccriptionClass + ',' + DOMInputClasses.addValueClass);

           filedsArr = Array.prototype.slice.call(fields);
        
          filedsArr.forEach(function(current, index, array){
            current.value = ''; 
           });
           filedsArr[0].focus();
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
        //If the User click the Button  Or press the Button Enter

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
      UICtrl.addListItem(newItem, inputObject.inputType);
        //***Clear the fileds
        UICtrl.clearFields();
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