import react, {Component, useState} from 'react';
import './style.scss'

class TabUnit extends Component{
    
    constructor(props, context){
        super(props, context);
        this.state = {
            tabs: []
        }
    }

    modify_tab(index){
        let result = [];
        
        const foo = (event, index) => {
            this.modify_tab(index);
            this.props.onChange(event, index);
        }

        result.push((<div class="TabCell BorderTab" onClick={event => foo(event, 1)}>1</div>));

        if(this.props.TabCount <= this.props.TabCollapse){
            for(let i = 2; i < this.props.TabCount; i++){
                if(i == index){
                    result.push((<div class="TabCell SelectedTab"><h3>{i}</h3></div>));
                }else{
                    result.push((<div class="TabCell RegularTab" onClick={(event) => foo(event, i)}><h3>{i}</h3></div>));
                }
            }
        }else{
            if(index < Math.ceil(this.props.TabCollapse / 2) + 2){
                for(let i = 2; i < this.props.TabCollapse; i++){
                    if(i == index){
                        result.push((<div class="TabCell SelectedTab"><h3>{i}</h3></div>));
                    }else{
                        result.push((<div class="TabCell RegularTab" onClick={(event) => foo(event, i)}><h3>{i}</h3></div>));
                    }
                }
                result.push((<div class="TabCell"><h3>...</h3></div>));
            }else{
                result.push((<div class="TabCell"><h3>...</h3></div>));

                if(index > this.props.TabCount - Math.floor(this.props.TabCollapse / 2)){
                    for(let i = index - Math.floor(this.props.TabCollapse / 2); i < this.props.TabCount; i++){
                        if(i == index){
                            result.push((<div class="TabCell SelectedTab"><h3>{i}</h3></div>));
                        }else{
                            result.push((<div class="TabCell RegularTab" onClick={(event) => foo(event, i)}><h3>{i}</h3></div>));
                        }
                    }
                }else{
                    for(let i = index - Math.floor(this.props.TabCollapse / 2); i < index + Math.ceil(this.props.TabCollapse / 2); i++){
                        if(i == index){
                            result.push((<div class="TabCell SelectedTab"><h3>{i}</h3></div>));
                        }else{
                            result.push((<div class="TabCell RegularTab" onClick={(event) => foo(event, i)}><h3>{i}</h3></div>));
                        }
                    }
                    result.push((<div class="TabCell"><h3>...</h3></div>));
                }
            }
        }

        result.push((<div class="TabCell BorderTab" onClick={event => foo(event, this.props.TabCount)}>{this.props.TabCount}</div>));

        this.setState({
            tabs: result
        })
    }

    render(){
        return (
            <div class="TabUnitDiv">
                {this.state.tabs}
            </div>
        )
    }

    componentDidMount(){
        this.modify_tab(0);
    }
}

export default TabUnit;