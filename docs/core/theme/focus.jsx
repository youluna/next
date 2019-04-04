import { Demo, DemoGroup, initDemo } from '../../../src/demo-helper';
import Input from '../../../src/input';
import Nav from '../../../src/nav';
import '../../../src/demo-helper/style.js';
import '../../../src/input/style.js';
import '../../../src/nav/style.js';

import '../../../src/core/focus.scss';

const { Item, SubNav } = Nav;
class FocusDemo extends React.Component {

    render() {

        return (
            <div id="focus-demo-container">
                <div>请按Tab键以获得焦点</div>
                <br />
                <br />
                <Input placeholder="请输入" />
                <br />
                <br />
                <Nav direction={"hoz"} defaultSelectedKeys={'a'}>
                    <Item key="a">Item 1</Item>
                    <Item>Item 2</Item>
                    <SubNav label="Sub Nav">
                        <Item>Item 3</Item>
                        <Item>Item 4</Item>
                        <SubNav label="Sub Nav">
                            <Item>Item 5</Item>
                            <Item>Item 6</Item>
                        </SubNav>
                    </SubNav>
                    <Item icon="account">
                        <a href="http://www.taobao.com" target="_blank">Taobao</a>
                    </Item>
                </Nav>

                <script src="//unpkg.com/focus-visible@4.1.5/dist/focus-visible.min.js"></script>
            </div>
        );
    }
}

window.renderDemo = function () {
    ReactDOM.render(
        <Demo title="Focus">
            <DemoGroup label={false}>
                <FocusDemo />
            </DemoGroup>
        </Demo>, document.getElementById('container'));
};

renderDemo();

initDemo('focus');
