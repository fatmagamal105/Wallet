class bud
{
    constructor()
    {
        this.budfrm = document.getElementById("budfrm");
        this.budinp = document.getElementById("budinp");
        this.budam = document.getElementById("budam");
        this.balam = document.getElementById("balam");
        this.expam = document.getElementById("expam");
        this.expfrm = document.getElementById("expfrm");
        this.expname = document.getElementById("expname");
        this.expinp = document.getElementById("expinp");
        this.list = document.getElementById("expList");
        this.itemList = [];
        this.itemID = 0;
    }
    submitBudgetForm()
    {
        document.getElementById("h").style.visibility = "visible";
        console.log("entered")
        let budg = this.budinp.value;
        this.budam.textContent = budg;
        this.showBal();
        this.budinp.value = "";
    }
    showBal()
    {
        let expense = this.totalExp();
        let total = parseInt(this.budam.textContent) - expense;
        this.balam.textContent = total;
    }
    totalExp()
    {
        let total = 0;
        if(this.itemList.length > 0){
            total = this.itemList.reduce(function(acc, curr){
              acc += curr.amount;
              return acc;
            }, 0)
          }
          this.expam.textContent = total;
            return total;
          /*if (total <= this.budinp.value )
          {
            this.expam.textContent = total;
            return total;
          }
          else throw "Wrong";*/
    }
    submitExpenseForm()
    {
        let expn = this.expname.value;
        let expin = this.expinp.value;
        let amount = parseInt(expin);
        this.expname.value = "";
        this.expinp.value = "";
        let expense = { id : this.itemID, name : expn, amount : amount }
        this.itemID++;
        this.itemList.push(expense);
        this.addExp(expense);
        this.showBal();
    }
    addExp(expense)
    {
        const div = document.createElement('div');
        div.classList.add('expense');
        div.innerHTML = `<div class="expense-item d-flex justify-content-between align-items-baseline">
        <h3 class="expense-title mb-0 text-uppercase list-item">- ${expense.name}</h3>
        <h4 class="expense-amount mb-0 list-item">$${expense.amount}</h4>

        <div class="expense-icons list-item">

        <a class="edit-icon mx-2" data-id="${expense.id}">
        <i class="fas fa-edit"></i>
        </a>
        <a class="delete-icon" data-id="${expense.id}">
        <i class="far fa-trash-alt"></i>
        </a>
        </div>
        </div`;
        this.list.appendChild(div);
    }
    editExpense(element){
        let id = parseInt(element.dataset.id);
        let parent = element.parentElement.parentElement.parentElement;
        this.list.removeChild(parent);
        let expense = this.itemList.filter(function(item){
          return item.id === id;
        })

        this.expname.value = expense[0].name;
        this.expinp.value = expense[0].amount;
        let tempList = this.itemList.filter(function(item){
          return item.id !== id;
        })
        this.itemList = tempList;
        this.showBal();
      }
    
      deleteExpense(element){
        let id = parseInt(element.dataset.id);
        let parent = element.parentElement.parentElement.parentElement;

        this.list.removeChild(parent);

        let tempList = this.itemList.filter(function(item){
          return item.id !== id;
        })
        this.itemList = tempList;
        this.showBal();
      }
}
function eventListeners()
    {
        const budfrm = document.getElementById("budfrm");
        const expfrm = document.getElementById("expfrm");
        const expList = document.getElementById("expList");

        const userbud = new bud();
        budfrm.addEventListener("submit",function(event){
            event.preventDefault();
            userbud.submitBudgetForm();
        });
        expfrm.addEventListener("submit",function(event){
            event.preventDefault();
            userbud.submitExpenseForm();
        })
        expList.addEventListener("click", function(event){
            if (event.target.parentElement.classList.contains('edit-icon')){
                userbud.editExpense(event.target.parentElement);
            }else if (event.target.parentElement.classList.contains('delete-icon')){
                userbud.deleteExpense(event.target.parentElement);
            }
          });
    }
    document.addEventListener('DOMContentLoaded', function(){
        eventListeners();
      });