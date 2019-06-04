
const budgetController = function() {
    
    class Expense {
        constructor(id, description, value) {
            this.id = id,
            this.description = description,
            this.value = value,
            this.percentage = -1
        }
        calcPercentage(totalIncome) {
            if (totalIncome > 0) {
                this.percentage = Math.round((this.value / totalIncome) * 100);
            } else {
                this.percentage = -1;
            }
        }
        getPercentage() {
            return this.percentage;
        }   
    };

    class Income {
        constructor(id, description, value) {
            this.id = id,
            this.description = description,
            this.value = value;
        };
    };

    const data = {
        allItems: {
            expense: [],
            income: [],
        },
        totals: {
            expense: 0,
            income: 0,
        },
        budget: 0,
        percentage: -1
    };

    function calcBudget(type) {
        let sum = 0;
        data.allItems[type].forEach(cur => {
            sum += cur.value;
        });
        data.totals[type] = sum;
    };

    return {
        addItem: function(type, des, val) {
            let newItem, id, idLength;
            idLength = data.allItems[type].length;
            if (idLength > 0) {
                id = data.allItems[type][idLength -1].id + 1;
            } else {
                id = 0;
            }
            if (type === 'expense') {
                newItem = new Expense(id, des, val);
            } else if (type === 'income'){
                newItem = new Income(id, des, val);
            };
            data.allItems[type].push(newItem);
            return newItem;
        },

        calculateBudget: function() {
            calcBudget('income');
            calcBudget('expense');

            data.budget = data.totals.income - data.totals.expense;

            if (data.totals.income > 0) {
                data.percentage = Math.round((data.totals.expense / data.totals.income) * 100);
            } else {
                data.percentage = -1;
            }
        },

        deleteItem: function(type, id) {
            let ids = data.allItems[type].map(cur => {
                return cur.id;
            });
            let index = ids.indexOf(id);
            if (index !== -1) {
                data.allItems[type].splice(index, 1);
            };
        },

        calculatePercentage: function() {
            data.allItems.expense.map(cur => {
                cur.calcPercentage(data.totals.income);
            })
        },

        getPercetages: function() {
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
            }
        },

        testing: function() {
            return data;
        },
    };

}();

const uiController = function() {

    const DomStrings = {
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
        dateLabel: '.budget__title--month',
    };

    function formatNumber(num, type) {
        num = Math.abs(num);
        num = num.toFixed(2);
        const numSplit = num.split('.');
        let int = parseInt(numSplit[0]);
        int = int.toLocaleString();
        let dec = numSplit[1];

        return (type === '' ? '' : type === 'income' ? '+' : '-') + ' ' + int + '.' + dec;
    }

    return {
        getInput: function() {
            return {
                type: document.querySelector(DomStrings.inputType).value,
                description: document.querySelector(DomStrings.inputDescription).value,
                value: parseInt(document.querySelector(DomStrings.inputValue).value),
            }
        },

        displayItem: function(obj, type) {
            let html, element, newHtml;
            if (type === 'income') {
                element = DomStrings.incomeContainer;
                html = '<div class="item clearfix" id="income-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>'
            } else if (type === 'expense') {
                element = DomStrings.expensesContainer;
                html = '<div class="item clearfix" id="expense-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__percentage">21%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>'
            };

            newHtml = html.replace('%id%', obj.id);
            newHtml = newHtml.replace('%description%', obj.description);
            newHtml = newHtml.replace('%value%', formatNumber(obj.value, type));

            document.querySelector(element).insertAdjacentHTML('beforeend', newHtml);
        },
        
        displayBudget: function(obj) {
            let type;
            obj.budget === 0 ? type = '' : obj.budget > 0 ? type = 'income' : type = 'expense';
            document.querySelector(DomStrings.budgetLabel).textContent = formatNumber(obj.budget, type);
            document.querySelector(DomStrings.incomeLabel).textContent = formatNumber(obj.totalIncome, 'income');
            document.querySelector(DomStrings.expenseLabel).textContent = formatNumber(obj.totalExpense, 'expense');

            if (obj.percentage > 0) {
                document.querySelector(DomStrings.percentageLabel).textContent = obj.percentage + '%';
            } else {
                document.querySelector(DomStrings.percentageLabel).textContent = '---';
            }
        },

        displayPercentage: function(percentage) {
            let fields = document.querySelectorAll(DomStrings.expensesPercLabel);
            const nodeListForEach = function(list, callback) {
                for(let i = 0; i < list.length; i++) {
                    callback(list[i], i);
                };
            };

            nodeListForEach(fields, (cur, index) => {
                if (percentage[index] !== -1) {
                    cur.textContent = `${percentage[index]} %`;
                } else {
                    cur.textContent = '---';
                }
            })
        },

        deleteListItem: function(propertyObj) {
            let item = document.getElementById(propertyObj);
            item.parentNode.removeChild(item);
        },

        clearFields: function() {
            const fields = document.querySelectorAll(`${DomStrings.inputDescription}, ${DomStrings.inputValue}`);
            const fieldsArr = Array.from(fields);
            fieldsArr.forEach(cur => {
                cur.value = '';
            })
            fieldsArr[0].focus();
        },

        changedType: function() {
            let inputs = document.querySelectorAll(
                `
                ${DomStrings.inputDescription}, 
                ${DomStrings.inputValue},
                ${DomStrings.inputBtn},
                ${DomStrings.inputType}
                `
            );
            inputs.forEach(cur => {
                cur.classList.toggle('red-focus');
            });
            document.querySelector(DomStrings.inputBtn).classList.toggle('red');
        },

        displayMonth: function() {
            let date = new Date();
            let months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
            let month = date.getMonth();
            let year = date.getFullYear();

            document.querySelector(DomStrings.dateLabel).textContent = `${months[month]} ${year}`;
        },

        getDomStrings: function() {
            return DomStrings;
        },

    }
}();

const controller = function(budgetCtrl, uiCtrl) {

    const dom = uiController.getDomStrings();

    function getEventListeners() {
        document.querySelector(dom.inputBtn).addEventListener('click', ctrlAddItem);
        document.addEventListener('keypress', (e) => {
            if (e.keyCode === 13) {
                ctrlAddItem();
            };
        });
        document.querySelector(dom.container).addEventListener('click', ctrlDeleteItem)
        document.querySelector(dom.inputType).addEventListener('change', uiCtrl.changedType);
    };

    function ctrlAddItem() {
        const input = uiCtrl.getInput();
        if (input.description !== '', !isNaN(input.value), input.value > 0) {
            let budget = budgetCtrl.addItem(input.type, input.description, input.value);
            uiCtrl.displayItem(budget, input.type);
            uiCtrl.clearFields();
            updateBudget();
            updatePercentages();
        };
    };

    function updatePercentages() {
        budgetCtrl.calculatePercentage();
        let percentage = budgetCtrl.getPercetages();
        uiCtrl.displayPercentage(percentage);
    }

    function ctrlDeleteItem(e) {
        const newItem = e.target.parentNode.parentNode.parentNode.parentNode.id;
        if (newItem) {
            let splitItem = newItem.split('-');
            let type = splitItem[0];
            let id = parseInt(splitItem[1]);
    
            budgetCtrl.deleteItem(type, id);
            uiCtrl.deleteListItem(newItem);
            updateBudget();
            updatePercentages();
        };
    };

    function updateBudget() {
        budgetCtrl.calculateBudget();
        let budget = budgetCtrl.getBudget();
        uiCtrl.displayBudget(budget);
    }

    return {
        init: function() {
            getEventListeners();
            uiCtrl.displayMonth();
            uiCtrl.displayBudget({
                budget: 0,
                totalIncome: 0,
                totalExpense: 0,
                percentage: -1,
            })
        }
    };

}(budgetController, uiController);

controller.init();



























