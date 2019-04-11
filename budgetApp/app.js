

// BUDGET CONTROLLER
let budgetController = (function() {
    
    let Expense = function(id , description, value) {
        this.id = id;
        this.description = description;
        this.value = value;
        this.percentage = -1;
    };

    Expense.prototype.calcPercentages = function(totalIncome) {
        if (totalIncome > 0) {
            this.percentage = Math.round((this.value / totalIncome) * 100);
        } else {
            this.percentage = -1;
        };
    };
   
    Expense.prototype.getPercentage = function() {
        return this.percentage;
    };

    let Income = function(id , description, value) {
        this.id = id;
        this.description = description;
        this.value = value;
    };
    
    function calculateTotal(type) {
        let sum = 0;
         data.allItems[type].forEach(cur => {
            sum += cur.value;
        });
        data.totals[type] = sum;
    };

    let data = {
        allItems: {
            expense: [],
            income: [],
        },
        totals: {
            expense: 0,
            income: 0,
        },
        budget: 0,
        percentage: -1,
    };

    return {
        addItem: function(type, des, val) {
            let newItem, Id, idLength;
            idLength = data.allItems[type].length;
            if (idLength > 0) {
                // Create new Id
                Id = data.allItems[type][idLength - 1].id + 1;
            } else {
                Id = 0;
            };
            // Create new Item based on 'expense' or 'Income'
            if (type === 'expense') {
                newItem = new Expense(Id, des, val);
            } else if (type === 'income') {
                newItem = new Income(Id, des, val);
            };
            // Push it in to our data structure;
            data.allItems[type].push(newItem);
            return newItem;
        },

        deleteItem: function(type, id) {
            let ids, index;
            ids = data.allItems[type].map(cur => {
                return cur.id;
            });
            index = ids.indexOf(id);
            if (index !== -1) {
                data.allItems[type].splice(index, 1);
            };
        },

        calcBudget: function() {
            // calculate total income and expenses
            calculateTotal('expense');
            calculateTotal('income');
            // calculate the budget: income - expenses
            data.budget = data.totals.income - data.totals.expense
            // calculate the percentage of income spent
            if (data.totals.income > 0) {
                data.percentage = Math.round((data.totals.expense / data.totals.income) * 100);
            } else {
                data.percentage = -1;
            }
        },

        calculatePercentage: function() {
            data.allItems.expense.forEach(cur => {
                cur.calcPercentages(data.totals.income);
            });
        },
        
        // calculatePercentage: function() {
        //     let expense = data.allItems.expense;
        //     let funcExpense = function(list, callback) {
        //         for (let i = 0; i < list.length; i++) {
        //             callback(list[i]);
        //         };
        //     };
        //     funcExpense(expense, cur => {
        //         cur.calcPercentages(data.totals.income);
        //     })
        // },
        
        getPercentages: function() {
            let allPerc = data.allItems.expense.map(cur => {
                return cur.getPercentage();
            });
            return allPerc;
        },   
               
        getBudget: function() {
            return {
                budget: data.budget,
                totalIncome: data.totals.income,
                totalExpense: data.totals.expense,
                percentage: data.percentage,
            };
        },

        testing: function() {
            return data;
        },

    };
    
})();

// UI CONTROLLER
let uiController = (function() {

    let DomStrings = {
        inputType: '.add__type',
        inputDescription: '.add__description',
        inputValue: '.add__value',
        inputBtn: '.add__btn',
        incomeContainer: '.income__list',
        expensesContainer: '.expenses__list', 
        budgetLabel: '.budget__value',
        incomeLabel: '.budget__income--value',
        expenseLabel: '.budget__expenses--value',
        percentageLabel: '.budget__expenses--percentage',
        container: '.container',
        expensesPercLabel: '.item__percentage',
        dateLabel: '.budget__title--month'
    };

    // let formatNumber = function(num, type) {
    //     let numSplit, int, dec;
    //     num = Math.abs(num);
    //     num = num.toFixed(2);
    //     numSplit = num.split('.');
    //     int = parseInt(numSplit[0]);
    //     // if (int.length > 3) {
    //     //     int = int.substr(0, int.length - 3) + ',' + int.substr(int.length - 3, 3);
    //     // };
    //     int = int.toLocaleString();
    //     dec = numSplit[1];
    //     return (type === 'expense' ? '-' : '+') + ' ' + int + '.' + dec;
    // };
    
    let formatNumber = function(num, type) {
        let int, dec, numSplit; 
        num = Math.abs(num);
        num = num.toFixed(2);
        numSplit = num.split('.');
        int = parseInt(numSplit[0]);
        int = int.toLocaleString();
        dec = numSplit[1];
        return (type === 'expense' ? '-' : '+') + ' ' + int + '.' + dec;
    };

    let nodeListForEach = function(list, callback) {
        for (let i = 0; i < list.length; i++) {
            callback(list[i], i)
        };
    };

    return {
        getInput: function() {
            return {
                type: document.querySelector(DomStrings.inputType).value,
                description: document.querySelector(DomStrings.inputDescription).value,
                value: parseFloat(document.querySelector(DomStrings.inputValue).value),
            };       
        },

        addListItem: function(obj, type) {
            let html, newHtml, element;
            if (type === 'income') {
                element = DomStrings.incomeContainer;
                html = '<div class="item clearfix" id="income-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value% </div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>'
            } else if (type === 'expense') {
                element = DomStrings.expensesContainer;
                html = '<div class="item clearfix" id="expense-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__percentage">21%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>'
            };
            newHtml = html.replace('%id%', obj.id);
            newHtml = newHtml.replace('%description%', obj.description);
            newHtml = newHtml.replace('%value%', formatNumber(obj.value, type));
            document.querySelector(element).insertAdjacentHTML('beforeend', newHtml);
        },

        deleteListItem: function(selectorId) {
            let element = document.getElementById(selectorId);
            element.parentNode.removeChild(element);
        },

        clearFields: function() {
            let fields = document.querySelectorAll(DomStrings.inputDescription + ', ' + DomStrings.inputValue);
            // let fieldsArr = Array.prototype.slice.call(fields);
            let fieldsArr = Array.from(fields);
            fieldsArr.forEach(cur => {
                cur.value = '';
            });
            fieldsArr[0].focus();
        },

        displayBudget: function(obj) {            
            let type;
            obj.budget > 0 ? type = 'income' : type = 'expense';
            document.querySelector(DomStrings.budgetLabel).textContent = formatNumber(obj.budget, type);
            document.querySelector(DomStrings.incomeLabel).textContent = formatNumber(obj.totalIncome, 'income');
            document.querySelector(DomStrings.expenseLabel).textContent = formatNumber(obj.totalExpense, 'expense');
            if (obj.percentage > 0) {
                document.querySelector(DomStrings.percentageLabel).textContent = obj.percentage + '%';
            } else {
                document.querySelector(DomStrings.percentageLabel).textContent = '---';
            };
        },
              
        displayPercentage: function(percentages) {
            let fields = document.querySelectorAll(DomStrings.expensesPercLabel);
            nodeListForEach(fields, (cur, index) => {
                if (percentages[index] > 0) {
                    cur.textContent = percentages[index] + '%';
                } else {
                    cur.textContent = percentages[index] + '--';
                };
            });
        },
      
        displayMonth: function() {
            let now, month, year, months;
            now = new Date();
            months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
            month = now.getMonth();
            year = now.getFullYear();
            document.querySelector(DomStrings.dateLabel).textContent = months[month] + ' ' + year;
        },

        //     displayPercentage: function(percentage) {
        //     let fields = document.querySelectorAll(DomStrings.expensesPercLabel);
        //     let list = Array.from(fields);
        //     list.forEach((cur, index) => {
        //         if (percentage[index] > 0) {
        //             cur.textContent = percentage[index] + '%';
        //         } else {
        //             cur.textcontent = percentage[index] + '---';
        //         };
        //     });
        // },

        changedType: function() {
            let fields = document.querySelectorAll(
                DomStrings.inputType + ',' +                
                DomStrings.inputDescription + ',' +                
                DomStrings.inputValue 
            );
            nodeListForEach(fields, cur => {
                cur.classList.toggle('red-focus');
            });
            document.querySelector(DomStrings.inputBtn).classList.toggle('red');
        },

        // changedType: function() {
        //     let fields = document.querySelectorAll(
        //         DomStrings.inputType + ',' +                
        //         DomStrings.inputDescription + ',' +                
        //         DomStrings.inputValue
        //     );
        //     let list = Array.from(fields);
        //     list.forEach(cur => {
        //         cur.classList.toggle('red-focus');
        //     });
        //     document.querySelector(DomStrings.inputBtn).classList.toggle('red');
    
        // },

        getDomStrings: function() {
            return DomStrings;
        },
    };
})();

// GLOBAL CONTROLLER
let controller= (function(budgetCtrl, uiCtrl) {

    let setupEventListeners = function() {
        let dom = uiCtrl.getDomStrings();
        document.querySelector(dom.inputBtn).addEventListener('click', ctrlAddItem);
        document.addEventListener('keypress', (e) => {
            if (e.keyCode === 13) {
                ctrlAddItem();
            };
        });    
        document.querySelector(dom.container).addEventListener('click', ctrlDeleteItem);
        document.querySelector(dom.inputType).addEventListener('change', uiCtrl.changedType);
    };

    let updateBudget = function() {
        // Calculate the budget
        budgetCtrl.calcBudget();
        // Return the budget
        let budget = budgetCtrl.getBudget();
        // Display the budget on the Ui
        uiCtrl.displayBudget(budget);
    };

    let updatePercentages = function() {
        //Calculate Percentages
        budgetCtrl.calculatePercentage();
        //Read percentages from the budget controller
        let percentages = budgetCtrl.getPercentages();
        //Update the UI with the new percentages
        uiCtrl.displayPercentage(percentages);
    };
    
    let ctrlAddItem = function() {
        // Get the field input data
        let input = uiCtrl.getInput();
        if (input.description !== '' && !isNaN(input.value) && input.value > 0) {
            // Add the item to the budget controller
            let newItem = budgetCtrl.addItem(input.type, input.description, input.value);
            // Add the Item to the Ui
            uiCtrl.addListItem(newItem, input.type);
            // Clear the fields
            uiCtrl.clearFields();
            // Calculate and update budget
            updateBudget();
            //Calculate and update percentages;
            updatePercentages();
        }; 
    };

    let ctrlDeleteItem = function(e) {        
        let itemId, splitId, type, Id;
        itemId = e.target.parentNode.parentNode.parentNode.parentNode.id;
        if (itemId) {
            splitId = itemId.split('-');
            type = splitId[0];
            Id = parseInt(splitId[1]);
             //Delete the item from the data stucture
            budgetCtrl.deleteItem(type, Id);
            //Delete the item form the ui
            uiCtrl.deleteListItem(itemId);
            //Update the budget
            updateBudget();
        };
    };

    return {
        init: function() {
            setupEventListeners();
            uiCtrl.displayMonth();
            uiCtrl.displayBudget({
                budget: 0,
                totalIncome: 0,
                totalExpense: 0,
                percentage: 0,
            });
        },
    };
   
})(budgetController, uiController);

controller.init();





