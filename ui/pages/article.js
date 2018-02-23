export default class ArticlePage extends Component {

    static pageOptions = {
        title: "Article"
    };

    constructor() {
        super();
        this.state = {
            item: null
        }
    }

    componentWillMount() {
        this.setState({ item: this.props.args });
    }

    render() {
        let { item } = this.state;
        return (
            <ScrollView style={styles.container}>
                <Image full banner source={{ uri: item.image }} />
                <Tile bright>
                    <Row spacing={15}>
                        <Cell>
                            <Tile left>
                                <Title upper bolder>{item.title}</Title>
                                <Status>{Module.timeSince(new Date(item.published)) + " ago by " + item.authorRef.name}</Status>
                            </Tile>
                        </Cell>
                        <Cell shrink>
                            <Tile right><Avatar small rounded source={{ uri: item.authorRef.avatar }} onPress={() => Module.pages.open("profile", item.authorRef)} activeOpacity={0.7} />
                            </Tile>
                        </Cell>
                    </Row>
                </Tile>
                <Divider line full height={1} />
                <Tile left padding={15}>
                    <Text style={styles.body}>
                        {item.content}
                    </Text>
                </Tile>
            </ScrollView>
        )
    }
}

let styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#f1f1f1"
    },
    body: {
        lineHeight: 27
    }
})
