export default class NewsPage extends Component {

    state = {
        articles: [],
        filterText: "",
        refreshing: false
    }

    moduleDidUpdate({articles, filterText, refreshing, err}) {
        if (err) {
            Util.showError(err.message || err)
        }

        if (!articles) {
            return
        }
        
        this.setState({
            articles,
            filterText,
            refreshing,
        });
    }

    render() {
        const { articles, refreshing, filterText } = this.state

        const layout = Module.options.get('layout')
        const cells = articles.map((item, i) => {
            if (layout === 'simple-no-images') {
                return <ItemCell item={item} key={i} onPress={() => Module.pages.open("article", item)} />
            }
            else if (layout === 'tiled-images') {
                return <TileCell item={item} key={i} onPress={() => Module.pages.open("article", item)} />
            }
            else if (layout === 'custom') {
                return <CustomCell item={item} key={i} onPress={() => Module.pages.open("article", item)} />
            }
        })

        const refresh = Module.canUpdateData ? (
            <RefreshControl refreshing={refreshing} onRefresh={() => Module.updateData()} />
        ) : null

        const content = articles.length > 0 && (
            <View style={{marginBottom:100}}>
                {cells}
            </View>
        )

        const status = !refreshing && articles.length == 0 && (
            <View style={styles.unavailableView}>
                <Text style={styles.unavailableText}>{Module.noResultMessage}</Text>
            </View>
        )

        return (
            <View style={styles.container}>
                <ScrollView style={styles.scroll} refreshControl={refresh}>
                    {content}
                    {status}
                </ScrollView>
                <NewsBar filterText={filterText}></NewsBar>
            </View>
        )
    }
}

let styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Module.options.get("background-color", "#ffffff")
    },
    scroll: {
        flex: 1
    },
    updatingView: {
        padding: 10
    },
    unavailableView: {
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        marginTop: Layout.window.height / 3
    },
    unavailableText: {
        padding: 15,
        color: "#999",
        fontSize: 16
    }
})