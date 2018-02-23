export default class NewsPage extends Component {

    state = {
        articles: [],
        filterText: "",
        refreshing: true
    }

    moduleDidUpdate(moduleState) {
        this.setState({
            articles: moduleState.articles,
            filterText: moduleState.filterText,
            refreshing: moduleState.refreshing
        });
    }

    render() {

        let indicator = this.state.refreshing && (
            <View style={styles.updatingView}>
                <ActivityIndicator />
            </View>
        )

        const layout = Module.options.get('layout')
        let cells = this.state.articles.map((item, i) => {
            if (layout === 'simple-no-images') {
                return <ItemCell item={item} key={i} onPress={() => Module.pages.open("article", item)} />
            }
            else if (layout === 'tiled-images') {
                return <TileCell item={item} key={i} onPress={() => Module.pages.open("article", item)} />
            }
            else if (layout === 'custom') {
                return <CustomCell item={item} key={i} onPress={() => Module.pages.open("article", item)} />
            }
        });

        let content = this.state.articles.length > 0 && (
            <ScrollView style={styles.scroll}>
                {cells}
                <View style={{height:100}} />
            </ScrollView>
        )

        let status = this.state.articles.length == 0 && (
            <View style={styles.unavailableView}>
                <Text style={styles.unavailableText}>{Module.noResultMessage}</Text>
            </View>
        )

        return (
            <View style={styles.container}>
                {indicator}
                {content}
                {status}

                <NewsBar filterText={this.state.filterText}></NewsBar>
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
        justifyContent: "center"
    },
    unavailableText: {
        padding: 15,
        color: "#999",
        fontSize: 16
    }
})