export default class NewsBar extends Component {

    render() {
        return (
            <Toolbar bottom blurType="dark" blurAmount={5}>
                <ToolbarMenu>
                    <MenuTrigger style={{ width: Layout.window.width / 2 }}>
                        <Text bright>{'Filter: ' + this.props.filterText}</Text>
                    </MenuTrigger>
                    <MenuOptions style={{ paddingBottom: 45 }}>
                        <MenuOption onSelect={() => Module.selectCategory("")}>
                            <Text style={styles.menuOption}>{"All"}</Text>
                        </MenuOption>
                        {Module.state.categories.map((cat, i) => {
                            return (
                                <MenuOption key={i} onSelect={() => Module.selectCategory(cat.id)}>
                                    <Text style={styles.menuOption}>{cat.name}</Text>
                                </MenuOption>
                            )
                        })}
                    </MenuOptions>
                </ToolbarMenu>
                <ToolbarSpacer/>
                <ToolbarTextButton bright title={'Authors'} onPress={() => Module.pages.open("authors")}></ToolbarTextButton>
            </Toolbar>
        )
    }

}

let styles = StyleSheet.create({
    menuOption: {
        padding: 15,
        paddingBottom: 5,
        color: Theme.toolbarTintColor
    }
})
