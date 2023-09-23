import { useEffect, useState } from 'react';
import './style.scss'
import change_theme from '../../themes';

function TabUnit(props) {

    const [Tabs, SetTabs] = useState([])
    const [Changed, SetChanged] = useState(true)

    function modify_tab(index) {
        let result = [];

        const foo = (event, index) => {
            modify_tab(index);
            props.onChange(event, index);
        }

        if (index == 1) {
            result.push((<div class="TabCell BorderTab SelectedTab" onClick={event => foo(event, 1)}>1</div>));
        } else {
            result.push((<div class="TabCell BorderTab" onClick={event => foo(event, 1)}>1</div>));
        }

        if (props.TabCount <= props.TabCollapse) {
            for (let i = 2; i < props.TabCount; i++) {
                if (i == index) {
                    result.push((<div class="TabCell SelectedTab"><h3>{i}</h3></div>));
                } else {
                    result.push((<div class="TabCell RegularTab" onClick={(event) => foo(event, i)}><h3>{i}</h3></div>));
                }
            }
        } else {
            if (index < Math.floor(props.TabCollapse / 2) + 2) {
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
                    for (let i = props.TabCount - props.TabCollapse + 2; i < props.TabCount; i++) {
                        if (i == index) {
                            result.push((<div class="TabCell SelectedTab"><h3>{i}</h3></div>));
                        } else {
                            result.push((<div class="TabCell RegularTab" onClick={(event) => foo(event, i)}><h3>{i}</h3></div>));
                        }
                    }
                } else {
                    for (let i = index - Math.floor(props.TabCollapse / 2) + 3; i < index + Math.floor(props.TabCollapse / 2); i++) {
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

        if (index == props.TabCount) {
            if (index != 1) {
                result.push((<div class="TabCell BorderTab SelectedTab" onClick={event => foo(event, props.TabCount)}>{props.TabCount}</div>));
            }
        } else {
            result.push((<div class="TabCell BorderTab" onClick={event => foo(event, props.TabCount)}>{props.TabCount}</div>));
        }

        SetTabs(result)
        SetChanged(true)
    }

    if (Tabs.length == 0) {
        modify_tab(parseInt(props.Index))
    }

    useEffect(() => {
        let page_input = document.querySelector(".TabUnitDiv input")

        if (page_input.value == 0) {
            page_input.value = 1
        }

        page_input.onchange = () => {
            let index = page_input.value

            if (index <= 0) {
                index = 1
            }

            if (index > props.TabCount) {
                index = props.TabCount
            }
            page_input.value = index

            modify_tab(parseInt(index))
            props.onChange(0, parseInt(index));
        }
    }, [])

    return (
        <div class="TabUnitDiv">
            {Tabs}
            <label>Go to page: <input type="number" /></label>
        </div>
    )
}

export default TabUnit;