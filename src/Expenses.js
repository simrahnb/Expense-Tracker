import React from "react";

class Expenses extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            expenseslist: [],
            value: "", //name of the expense
            price:  "",     //price of the expense
            id: "",         //unique id of the expense
            wallet:"",      //value of wallet
            editing: false,
            currentid: "", //id of current expense
            currentValue: "", //name of current expense 
            currentPrice: "", //price of current expense
        };

        this.onChange = this.onChange.bind(this); //binding this keyword
    }

    onChange = (e,field) => {
        this.setState({ [field]: e.target.value });
      };


    handleSubmit = (e) => {
        e.preventDefault();

        const walletV = this.state.wallet ; 
        const pr = this.state.price ; 
        const answer = walletV - pr ; 


        console.log('walletV:'+walletV)
      
        if (this.state.price <= this.state.wallet){

        this.setState({wallet: answer});

       const obj = {
        name: this.state.value,
        price: this.state.price,
        id: Math.random(),
        balance: answer,
       };

       if (this.state.name !== "" && this.state.price !== "") {
        console.log("Checking");
        this.setState({ expenseslist: this.state.expenseslist.concat(obj) });
        //console.log("this.state.value : "+this.state.value);
        //console.log("this.state.price : "+this.state.price);
        //console.log("this.state.wallet : "+this.state.wallet);
        this.setState({ value: "", price: ""}) //clearing expense detail
        this.setState({wallet: answer});
        //console.log("Wallet value after adding expense : "+this.state.wallet);
        //console.log("Wallet value after adding expense : "+answer);
        //console.log("this.state.value : "+this.state.value);
        //console.log("this.state.price : "+this.state.price);
      }
    }
    else {
        this.setState({ value: "", price: ""}) 
        alert('Your expenses are exceeding the wallet limit!')
    }
    }

    onDeleteExpense = (itemId) => {

        
        let obj = [...this.state.expenseslist].find(o => o.id === itemId);

        console.log("obj: "+obj.price)

        this.setState({
          expenseslist: [...this.state.expenseslist].filter((id) => id.id !== itemId),
        });

          const walletV = (this.state.wallet) * 1 ; //* 1 convert to number for addition
          const pr = (obj.price) * 1 ; 
          const answer = walletV + pr ; 

          console.log("pr"+pr);
          console.log("answer"+answer);
          this.setState({wallet: ""});
          this.setState({wallet: answer});
      };

      onEditExpense = (id, newValue, newPrice) => {

        
        this.state.expenseslist.map((expenseslist) => {
          if (expenseslist.id === id) {
            //console.log("wallet : "+this.state.wallet);
            //console.log("current Price: "+this.state.currentPrice);
            //console.log("new price: "+expenseslist.price);
            const up = (this.state.wallet * 1) - (this.state.currentPrice *1) + (expenseslist.price * 1);
            this.setState({wallet: ""});
            this.setState({wallet: up});
            expenseslist.name = newValue;
            expenseslist.price = newPrice;
          }
        });
      };

      onSubmitEditExpense = (e) => {
        e.preventDefault();
    
        this.onEditExpense(this.state.currentid, this.state.currentValue, this.state.currentPrice);
        this.setState({ editing: false });
      };

      onToggleEdit = (expenseslist) => {
        this.setState({ editing: true });
        this.setState({ currentid: expenseslist.id });
        this.setState({ currentValue: expenseslist.name });
        this.setState({ currentPrice: expenseslist.price}) ; 
      };

      onEditInputChange = (e) => {
        this.setState({ currentPrice : e.target.value});
        //console.log("current value "+ this.state.currentValue);
        //console.log("current price: "+ this.state.currentPrice);
      }; 
    

    render() {

        const mylist = this.state.expenseslist.map((expenseslist) => (
            <ol className="expense-item" key={expenseslist.id}>
              Expense name: {expenseslist.name} Expense Price: {expenseslist.price} 


             <button onClick={() => this.onToggleEdit(expenseslist)}>Edit</button>
             <button onClick={() => this.onDeleteExpense(expenseslist.id)}>Remove</button>
            </ol>
        )
        ) 

        return (  
           <div>

               <div className="wallet">
                 <h3>Wallet</h3>
                </div>
                <div className="wallet-form">
                <label>Add a wallet value</label>
                <input type="text" value={this.state.wallet} 
                onChange={(e)=>this.onChange(e,"wallet")} 
                />
                <button>Submit</button>
                </div>

                <div className="wallet">
                   <h3>Add an Expense</h3>
                </div>

            <div className="wallet-form">
            {this.state.editing === false ? (
            <form onSubmit={this.handleSubmit}> 
                <label>Add in Expense</label>
                <input
                  type="text"
                  value={this.state.value}
                  onChange={(e)=>this.onChange(e, "value")}
                />
                <label>Add Price of Expense</label>
                <input
                  type="text"
                  value={this.state.price}
                  onChange={(e)=>this.onChange(e,"price")}
                />
                <button onClick={this.handleSubmit}>Submit</button>
            </form>
            ) : (
                <form onSubmit={this.onSubmitEditExpense}>
                <input
                  placeholder="Edit your expense price"
                  type="text"
                  value={this.state.currentPrice}
                  onChange={(e)=>this.onEditInputChange(e)}
                />
                <button onClick={this.onSubmitEditExpense}>Update Item</button>
              </form>
            )}
            </div>

             <div className="wallet">
            <h3> Wallet value is ${this.state.wallet}</h3>
            </div>

            <div className="ExpensesList">
                {mylist}
            </div>
        </div>
        );

    }
}

export default Expenses;