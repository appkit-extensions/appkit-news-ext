export default class ProfilePage extends Component {

    static pageOptions = {
        title: "Profile"
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
        let articles = Module.findAuthorsArticles(item.id);

        let cells = articles.map((item, i) => {
            return <ProfileArticleCell item={item} key={i} onPress={() => Module.pages.open("article", item)} />
        });

        let bio = <Divider full line />;
        if (item.bio) {
            bio = (
                <Tile padding={15} style={styles.bio}>
                    <Caption>{item.bio}</Caption>
                </Tile>
            )
        }

        return (
            <ScrollView style={styles.container}>
                <Tile padding={20}>
                    <Avatar xlarge rounded source={{ uri: item.avatar.path }} onPress={() => { }} activeOpacity={0.7} />
                    <Divider />
                    <Text bold>{item.name}</Text>
                </Tile>

                {bio}
                <Divider />
                {cells}

            </ScrollView>
        )
    }
}

let styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff"
    },
    bio: {
        backgroundColor: "#f1f1f1"
    }
})
