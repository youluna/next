# withContext

- order: 9

通过 `Dialog.withContext(({ contextDialog }) => {} )`方法，封装 使用到函数式调用弹窗 的组件（例如业务组件或者当前App等），可以将 被封装组件 代码所在上下文的context注入到contextDialog中。

相比较`Dialog.alert()`获取到的是当前页面第一次被记录且未被卸载的context，contextDialog.alert()获取到的是 下例中`< AfterFix />` 所在代码环境的context。

`contextDialog`上可被调用的方法有`alert` `confirm` `show`，注意`contextDialog`只有`Dialog`的函数式调用方法，它不能像 `<Dialog />` 一样被使用。

:::lang=en-us
# withContext

- order: 9

Use `Dialog.withContext` to render Dialog imperatively. It is recommended over `Dialog.alert/confirm/show` because it get fusion config(.e.g prefix, locale) from context.

:::
---

````jsx
import { Button, Dialog, ConfigProvider } from '@alifd/next';

const BeforeFix = () => {
  return (
    <div>
      <Button
        onClick={() => {
          Dialog.confirm({
            title: "Dialog.confirm 命令式弹窗",
          });
        }}
      >
        使用 Dialog.confirm
      </Button>
    </div>
  );
};

const AfterFix = Dialog.withContext(({ contextDialog }) => {
  return (
    <div>
      <Button
        onClick={() => {
          contextDialog.confirm({
            title: "Dialog.withContext 命令式弹窗",
          });
        }}
      >
        使用 Dialog.withContext
      </Button>
    </div>
  );
});


class Demo extends React.Component {
    render() {
        return (
            <div>
                <ConfigProvider
                    locale={{
                        Dialog: {
                            close: "关闭（根组件文案）",
                            ok: "确认（根组件文案）",
                            cancel: "取消（根组件文案）",
                        },
                    }}
                >
                    <ConfigProvider
                        locale={{
                            Dialog: {
                            close: "关闭（局部文案）",
                            ok: "确认（局部文案）",
                            cancel: "取消（局部文案）",
                            },
                        }}
                        >
                        <div>
                            <BeforeFix />
                            <AfterFix />
                        </div>
                    </ConfigProvider>
                </ConfigProvider>
            </div>
        );
    }
}

ReactDOM.render(<Demo />, mountNode);
````
