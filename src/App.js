import React, { Component } from 'react';
import './App.css';
import NumberFormat from 'react-number-format';


class App extends Component {
    constructor(){
        super();
        this.state = {
            list:[],
            itemList: [{
                Name:'Hamburger',
                Price: 5.99
            },
                {
                    Name:'Cheese burger',
                    Price: 6.99
                },
                {
                    Name:'Texas burger',
                    Price: 7.49
                }
            ],
            mapping: Array(3).fill(null),
            quantity: Array(3).fill(0),
            total:0,
        }
    }

    add(item, index){
        var iArr = this.state.list.slice();
        var qtyArr = this.state.quantity.slice();
        var map = this.state.mapping.slice();
        var ttl = this.state.total;
        if(qtyArr[index] !== 0){
            qtyArr[index] += 1;
        }
        else{
            iArr.push(item);
            qtyArr[index] += 1;
            map[iArr.length-1]=index;
        }
            ttl = Number((ttl + item.Price).toFixed(2));
      //  console.log(qtyArr);

        console.log(ttl);
        this.setState({
            list:iArr,
            quantity: qtyArr,
            mapping: map,
            total:ttl,
        })
    }
    removeItem(ref,index){
        var iBrr = this.state.list.slice();
        var qtyArr = this.state.quantity.slice();
        var map = this.state.mapping.slice();
        var ttl = this.state.total;

        console.log(qtyArr[map[index]]);
        if(qtyArr[map[index]] === 1){
            qtyArr[map[index]] -= 1;
            iBrr.splice(index,1);
            map.splice(index,1);
        }

        else{
            qtyArr[map[index]] -= 1;
        }

        ttl = Number((ttl - ref.Price).toFixed(2));

        console.log(ttl);
        console.log(qtyArr);
        this.setState({
            list:iBrr,
            quantity:qtyArr,
            mapping: map,
            total:ttl,

        })
    }

    render() {
        return (
            <div className="container-fluid">
                <h1><em>Bedford Cafe & Restarunt</em></h1>
                <div className="row">
                    <div className="col-2">

                    </div>
                    <div className="col-4">
                        <h1>Order Menu</h1>
                    </div>
                    <div className="col-4">
                        <h1>Total Item</h1>
                    </div>
                    <div className="col-2">
                    </div>
                </div>
                <div className="row">
                    <div className="col-6">
                        <ul className="row list-group"> {this.state.itemList.map((item,index)=> (
                            <li className="list-group-item" key={index}>
                                <span className="col-8">{item.Name} </span>
                                <span className="col-2">${item.Price}</span>
                                <button className="col-2 btn btn-primary btn-sm" onClick={()=> this.add(item, index)}>Add </button>
                            </li>
                        ))}
                        </ul>
                        </div>
                <div className="col-6">
                    <Cart value={this.state.list} remove={(ref,index) => this.removeItem(ref,index)} qty={this.state.quantity} mapp={this.state.mapping}/>
                </div>
                </div>
                <div className="col-12">
                    <p className="text-right">
                        <b>Total: </b><NumberFormat value={this.state.total} displayType={'text'}
                                                    thousandSeparator={true} prefix={'$'} decimalScale={2}
                                                    fixedDecimalScale={true}/>
                    </p>
                </div>

</div>
        );
    }
}

class Cart extends Component {

    render() {
        var ref = this.props.value;
        var mapp = this.props.mapp;
        // var NumberFormat = require('react-number-format');

        return (
        <div className="container">
            <div className="container">
            <ul className="row list-group">
                    {ref.map((ref, index) => (
                        <li className="list-group-item" key={index}>
                            <span className="col-6 ">{ref.Name} </span>
                            <span className="col-4">
                            <ul className="row">
                                <span className="col-12 text-small text-small">${ref.Price} </span>
                                <span className="col-12 text-small text-primary">Qty:{this.props.qty[mapp[index]]} </span>
                            </ul>
                            </span>
                            <button className="col-2 btn btn-danger btn-sm"
                                                                      onClick={() => this.props.remove(ref, index)}>Remove</button>
                        </li>
                    ))}
                </ul>


            </div>

        </div>
        );
    }
}
export default App;