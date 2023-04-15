import { useState } from 'react';
import './style.scss'

function TabUnit(props) {

    const [Tabs, SetTabs] = useState([])

    function modify_tab(index) {
        let result = [];

        const foo = (event, index) => {
            modify_tab(index);
            props.onChange(event, index);
        }

        result.push((<div class="TabCell BorderTab" onClick={event => foo(event, 1)}>1</div>));

        if (props.TabCount <= props.TabCollapse) {
            for (let i = 2; i < props.TabCount; i++) {
                if (i == index) {
                    result.push((<div class="TabCell SelectedTab"><h3>{i}</h3></div>));
                } else {
                    result.push((<div class="TabCell RegularTab" onClick={(event) => foo(event, i)}><h3>{i}</h3></div>));
                }
            }
        } else {
            if (index < Math.ceil(props.TabCollapse / 2) + 2) {
                for (let i = 2; i < props.TabCollapse; i++) {
                    if (i == index) {
                        result.push((<div class="TabCell SelectedTab"><h3>{i}</h3></div>));
                    } else {
                        result.push((<div class="TabCell RegularTab" onClick={(event) => foo(event, i)}><h3>{i}</h3></div>));
                    }
                }
                result.push((<div class="TabCell"><h3>...</h3></div>));
            } else {
                result.push((<div class="TabCell"><h3>...</h3></div>));

                if (index > props.TabCount - Math.floor(props.TabCollapse / 2)) {
                    for (let i = index - Math.floor(props.TabCollapse / 2); i < props.TabCount; i++) {
                        if (i == index) {
                            result.push((<div class="TabCell SelectedTab"><h3>{i}</h3></div>));
                        } else {
                            result.push((<div class="TabCell RegularTab" onClick={(event) => foo(event, i)}><h3>{i}</h3></div>));
                        }
                    }
                } else {
                    for (let i = index - Math.floor(props.TabCollapse / 2); i < index + Math.ceil(props.TabCollapse / 2); i++) {
                        if (i == index) {
                            result.push((<div class="TabCell SelectedTab"><h3>{i}</h3></div>));
                        } else {
                            result.push((<div class="TabCell RegularTab" onClick={(event) => foo(event, i)}><h3>{i}</h3></div>));
                        }
                    }
                    result.push((<div class="TabCell"><h3>...</h3></div>));
                }
            }
        }

        result.push((<div class="TabCell BorderTab" onClick={event => foo(event, props.TabCount)}>{props.TabCount}</div>));

        SetTabs(result)
    }

    if(Tabs.length == 0){
        modify_tab(0)
    }

    return (
        <div class="TabUnitDiv">
            {Tabs}
        </div>
    )
}

export default TabUnit;